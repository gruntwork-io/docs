# Authenticating to the Cloud

## Authenticating to AWS accounts

Pipelines automatically determines which AWS account to authenticate to based on the infrastructure changes proposed in your pull request.

### How Pipelines authenticates to AWS

To execute the actions detected by Pipelines, each AWS account must assume an AWS IAM Role using Open ID Connect (OIDC). At a high level, OIDC works as follows: AWS recognizes GitHub or GitLab as an "identity provider," trusts GitHub’s or GitLab’s request to assume a temporary IAM Role, and then issues AWS credentials valid for the duration of the GitHub Actions or GitLab CI workflow.

When creating a new AWS account, it is necessary to update the AWS OIDC configuration to include an IAM role that GitHub or GitLab can assume. When using the [Gruntwork Account Factory](/2.0/docs/accountfactory/architecture), this update is performed automatically during the process of [adding a new AWS account](/2.0/docs/accountfactory/guides/vend-aws-account).

### How Pipelines knows what AWS account to authenticate to

Pipelines assumes that each top-level directory in your `infrastructure-live` repository corresponds to a single AWS account, excluding the directory reserved for [module defaults](/2.0/docs/library/concepts/module-defaults). Each account-mapped directory must have an entry in the `accounts.yml` file. The entry should include a key matching the directory name and key/value pairs for the AWS account ID and the root user email address of the account.

For instance, the following `accounts.yml` entry maps to a directory named `my-cool-account` in your `infrastructure-live` repository:

```yml title=accounts.yml
"my-cool-account":
  "email": "my-root-account-email@example.com"
  "id": "123456789012"
```

```bash title="Infrastructure Live"
.
├── accounts.yml
├── _module_defaults
│   └── services
│       └── my-app.hcl
├── my-cool-account
│   └── us-east-1
│       └── dev
│           └── database
│               └── terragrunt.hcl
```

### AWS account authentication when creating new AWS accounts

:::note

This section covers advanced topics related to Pipelines, how it differentiates between types of changes, and how it manages planning and applying changes.

For end users, only a single step is required in the CI job. Pipelines handles all additional processes automatically.

:::

Pipelines manages two main types of infrastructure-change events:

1. Adding, changing, or deleting Terragrunt files.
2. Creating new AWS accounts.

For the first type (add/change/delete Terragrunt files), Pipelines authenticates directly to the AWS account containing the affected resources. For the second type (creating new AWS accounts), Pipelines uses the Management Account.

#### Management account

Gruntwork's Account Factory is built on AWS Control Tower, which requires that new AWS accounts be created through the [Control Tower Management AWS Account](https://docs.aws.amazon.com/controltower/latest/userguide/how-control-tower-works.html#what-is-mgmt).

When a new AWS account request is approved and the account is created, Pipelines generates a Pull Request containing the account baseline. Since Pipelines does not initially have access to the new AWS account, it authenticates through the Management Account to apply the baseline.

During baseline application and provisioning of the Pipelines role in the new child account, Pipelines first assumes the management account's Pipelines role. It then assumes an automatically provisioned role in the child account (a process known as [role chaining](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_terms-and-concepts.html)). Once Pipelines has temporary credentials in the new account, it executes a plan or apply to provision the requested resources. After the initial baseline and Pipelines role are applied, all subsequent events for that account are managed directly through the Pipelines role in the child account.

:::note

The AWS IAM Role in the Management Account must have permissions to provision new AWS accounts (via AWS Control Tower) and assume roles in all child accounts.

:::

#### Child accounts

Each child account (e.g., `dev`, `stage`, `prod`, etc.) contains an AWS IAM role that Pipelines can assume from GitHub Actions or GitLab CI using OIDC. This role is automatically provisioned during the [account baseline process](/2.0/docs/accountfactory/guides/vend-aws-account). Once the role is established in the child account, users can submit pull requests/merge requests to add, modify, or delete resources in that account.

When a pull request/merge request is created or synchronized, or when changes are pushed to the `main` branch, Pipelines detects the changes, maps them to the appropriate account, assumes the role in the child account, and executes a `terragrunt plan` (for pull requests/merge requests) or `terragrunt apply` (for pushes to `main`).

### Fundamentals of OIDC for Publicly Available and Private CI/CD platforms

### JWT Token Issuers
A JWT token is a base64-encoded JSON object that contains three parts: a header, a payload, and a signature. The header typically contains metadata about the token, such as the algorithm used to sign it. The payload contains the claims or assertions made by the issuer, such as the subject (user), audience (intended recipient), and expiration time. The signature is used to verify that the token was issued by a trusted authority and has not been tampered with.

Critically, the issuer is a URL that is both specified inside the token, and is used by consumers of the token to fetch the public key used to validate the signature of that same token. Assuming the public key is fetched via HTTPS, there is a valid trust chain that the token was in fact issued by the expected issuer and you have typical cryptographic guarantees it wasn't substituted or tampered with.

Typically the issuer is the hostname of the CI/CD platform, such as `https://gitlab.com`, and thus oidc configuration (and public keys) can be fetched from the publicly available route, `https://gitlab.com/.well-known/openid-configuration` etc.

If, however, your CI/CD platform is hosted privately, you will need to host the public key and OIDC configuration in a publicly accessible location, such as an S3 bucket, and update the issuer in your CI/CD configuration to point to that location.  The diagrams below illustrate both approaches - fetching the keys directly from your CI/CD platform via a public route, or fetching the keys from a public S3 bucket.


#### Publicly Available CI/CD Platforms
```mermaid
sequenceDiagram
  participant SCM as SCM (GitLab/GitHub etc.)
  participant SCMPublicRoute as SCM Hostname e.g. gitlab.com
  participant AWSIdP as AWS IdP & STS

  SCM->>SCM: Generate a public/private key pair
  SCM->>SCM: Generate a JWT and sign with the private key
  SCM->AWSIdP: Send JWT to AWS requesting a role
  AWSIdP->>SCMPublicRoute: Fetch public key via HTTPS <br>(which validates that the SCM is who it says it is)
  SCMPublicRoute->>AWSIdP: Return the public key
  AWSIdP->>AWSIdP: Validate signature on JWT using public key to validate that it was generated by the Issuer
  AWSIdP->>AWSIdP: Inspect JWT Content and ensure it passes trust policies
  AWSIdP->>SCM: Return temporary tokens for the role requested

```

#### Non-Publicly Available CI/CD Platforms

This diagram follows the [recommended approach](https://docs.gitlab.com/ci/cloud_services/aws/#configure-a-non-public-gitlab-instance) from GitLab for private CI/CD platform instances.  The guidance is to host the public key in a publicly accessible S3 bucket and update the issuer in the CI/CD configuration.

A common alternative approach to re-hosting the public key and OIDC configuration is to update the application firewalls to specifically allow requests to the `.well-known/openid-configuration` endpoint and the JWKS endpoint from the AWS IdP.

```mermaid
sequenceDiagram
  participant SCM as SCM (GitLab/GitHub etc.)
  participant SCMPublicRoute as Public S3 Bucket (e.g. acme-public.s3.com)
  participant AWSIdP as AWS IdP & STS


  SCM->>SCM: Generate a public/private key pair
  SCM->>SCMPublicRoute: Publish public key to S3
  SCM->>AwsIdP: Update provider URL in AWS IdP to S3 bucket public URL
  SCM->>SCM: Update issuer to hostname of S3 bucket public URL
  SCM->>SCM: Generate a JWT with updated issuer and sign with the private key
  SCM->>AWSIdP: Send JWT to AWS requesting a role
  AWSIdP->>SCMPublicRoute: Fetch public key via HTTPS <br>(HTTPS is important as it validates that the host is in fact the issuer)
  SCMPublicRoute->>AWSIdP: Return the public key
  AWSIdP->>AWSIdP: Validate signature on JWT using public key to validate that it was generated by the Issuer
  AWSIdP->>AWSIdP: Inspect JWT Content and ensure it passes trust policies
  AWSIdP->>SCM: Return temporary tokens for the role requested

```
