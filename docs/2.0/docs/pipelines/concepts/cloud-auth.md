# Authenticating to the Cloud

## Authenticating to AWS Accounts

Pipelines can intelligently figure out which AWS account to authenticate to based on the infrastructure changes proposed in your Pull Request.

### How Pipelines authenticates to AWS

To perform the actions that Pipelines detects, each AWS account needs to assume an AWS IAM Role using [OIDC](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services). To explain OIDC at a high level, AWS considers GitHub an "identity provider," trusts GitHub's request for a temporary IAM Role, and then issues AWS credentials that are valid for the duration of a GitHub Action workflow.

Every time you create a new AWS account, you need to update the AWS OIDC configuration to create an IAM role for this account and allow it to be assumed by GitHub. When you use [Gruntwork Account Factory](../../accountfactory/architecture/index.md), this role is automatically created when [adding a new AWS account](/2.0/docs/accountfactory/guides/vend-aws-account).

### How Pipelines knows what AWS account to authenticate to

Pipelines assumes that each top level directory in your `infrastructure-live` repository maps to a single AWS account, excluding the directory used for [module defaults](../../library/concepts/module-defaults.md). Each account-mapped directory must have an entry in the `/accounts.yml` file with a key matching the directory name and containing key/value pairs for the AWS account ID and the account's root user email address.

For example, the following entry in `accounts.yml` would be mapped to a directory called `my-cool-account` in your `infrastructure-live` repository.

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

This section contains some advanced topics pertaining to Pipelines, how it differentiates between types of changes, and how it handles planning and applying changes.

From the perspective of the end user, you will still only need one step in your CI job. Pipelines knows how to do the rest.

:::

Pipelines can handle two main types of infrastructure-change events:

1. Adding/changing/deleting Terragrunt files
2. Creating new AWS accounts

For the first type of infrastructure change (add/change/delete Terragrunt files) Pipelines authenticates to the specific AWS account where the affected resources live. For the second type of change (creating new AWS accounts), Pipelines uses the Gruntwork Landing Zone Management Account.

#### Gruntwork Landing Zone Management Account

Gruntwork Landing Zone is built on top of AWS Control Tower, and AWS Control Tower requires that you create new AWS accounts using the [Control Tower Management AWS Account](https://docs.aws.amazon.com/controltower/latest/userguide/how-control-tower-works.html#what-is-mgmt).

When new AWS account requests are approved and the AWS account is created, Pipelines will create a Pull Request that contains an account baseline. Since Pipelines does not yet have access to the AWS account, the baseline will be applied by authenticating to the Management Account.

When applying the baseline and provisioning the Pipelines role in the new child account, Pipelines will first assume the management account Pipelines role, then will assume an automatically provisioned role in the child account (this process is known as [role chaining](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_terms-and-concepts.html)). Once Pipelines has temporary credentials in the new account, it will run a plan or apply to provision the requested resources. After the initial baseline and Pipelines role has been applied in the child account, all subsequent events for that account will be handled by the Pipelines role directly in the child account.

:::note

The AWS IAM Role for the management account must have permissions to provision new AWS Accounts (via AWS Control Tower) and assume a role in all child accounts.

:::

#### Child Accounts

Each child account (e.g., `dev`, `stage`, `prod,` etc.) contains an AWS IAM role that Pipelines can assume from GitHub Actions using OIDC. This role is automatically provisioned as a part of the [account baseline process](/2.0/docs/accountfactory/guides/vend-aws-account). Once this role is in place in the child account, users may submit Pull Requests to add/modify/delete resources in the child account.

When a Pull Request is created or synchronized, or a push to the `main` branch occurs, Pipelines will detect the changes, map them to the new account, assume the role in the child account, then run a `terragrunt plan` or `terragrunt apply` job (plan for PRs, apply for pushes to main).
