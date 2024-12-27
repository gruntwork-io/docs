# Authenticating to the Cloud

## Authenticating to AWS accounts

Pipelines automatically determines which AWS account to authenticate to based on the infrastructure changes proposed in your pull request.

### How Pipelines authenticates to AWS

To execute the actions detected by Pipelines, each AWS account must assume an AWS IAM Role using [OIDC](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services). At a high level, OIDC works as follows: AWS recognizes GitHub as an "identity provider," trusts GitHub’s request to assume a temporary IAM Role, and then issues AWS credentials valid for the duration of the GitHub Actions workflow.

Whenever you create a new AWS account, you must update the AWS OIDC configuration to include an IAM Role for the account and permit it to be assumed by GitHub. When using the [Gruntwork Account Factory](/2.0/docs/accountfactory/architecture), this role is created automatically during the process of [adding a new AWS account](/2.0/docs/accountfactory/guides/vend-aws-account).

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

Each child account (e.g., `dev`, `stage`, `prod`, etc.) contains an AWS IAM role that Pipelines can assume from GitHub Actions using OIDC. This role is automatically provisioned during the [account baseline process](/2.0/docs/accountfactory/guides/vend-aws-account). Once the role is established in the child account, users can submit Pull Requests to add, modify, or delete resources in that account.

When a Pull Request is created or synchronized, or when changes are pushed to the `main` branch, Pipelines detects the changes, maps them to the appropriate account, assumes the role in the child account, and executes a `terragrunt plan` (for Pull Requests) or `terragrunt apply` (for pushes to `main`).
