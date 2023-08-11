# Pipelines for Account Factory

[Gruntwork Pipelines](../../pipelines/overview/) is a framework for deploying Infrastructure as Code changes and managing requests for and creation of AWS accounts, with first class support for [Terragrunt](https://terragrunt.gruntwork.io/). Pipelines enables you to use your preferred CI tool to detect changes to Infrastructure as Code Infrastructure Units (IUs — individual modules containing `terragrunt.hcl` files) and securely run `terragrunt plan` and `terragrunt apply` jobs on each IU.

Pipelines runs as a step in your CI tool, determining the types of changes that were made (e.g., adding, changing, or deleting a module) and the action to take based on whether your change was made in a Pull Request (PR) or in a commit to your main branch (e.g., the PR has been merged). As an example, creating a pull request with changes that add a new IU containing an AWS RDS instance in your `dev` account would detect the new module and run a `terragrunt plan` in the directory containing the IU.

:::note Supported CI systems

GitHub Actions is currently the only CI system supported by Gruntwork Pipelines. Support for additional CI systems will be added in the future — let us know your preferred tool. In the meantime, our legacy version of Gruntwork Pipelines remains available and can be configured for the CI system of your choice.

:::

## Components of Pipelines

Pipelines is a single binary that runs as a step in your CI tool. To perform the actions that Pipelines detects, each account will need an AWS IAM Role that allows GitHub Actions to assume it using OIDC. This role is automatically provisioned in new accounts that are provisioned when [adding an account](../accounts/add-account.md) using the Account Factory.

Pipelines assumes that each top level directory in your `infrastructure-live` repository maps to a single AWS account, excluding the `_envcommon` directory. Each account mapped directory must have an entry in `accounts.yml` with a key matching the directory name and containing key/value pairs for the account ID and the e-mail for the root user of the account.

For example, the following entry in `accounts.yml` would be mapped to a directory called `my-cool-account` in your `infrastructure-live` repository.

```yml title=accounts.yml
"my-cool-account":
  "email": "my-root-account-email@example.com"
  "id": "123456789012"
```

```bash title="Infrastructure Live"
.
├── accounts.yml
├── _envcommon
│   └── services
│       └── my-app.hcl
├── my-cool-account
│   └── us-east-1
│       └── dev
│           └── database
│               └── terragrunt.hcl
```

## Account Specific Pipelines

:::note

This section contains some advanced topics pertaining to Pipelines, how it differentiates between types of changes, and how it handles planning and applying changes.

From the perspective of the end user, you will still only need one step in your CI job. Pipelines knows how to do the rest.

:::

Pipelines can handle two main types of events — additions, changes, or deletions of Terragrunt files, and creating new AWS accounts. With the exception of account creation, adding, changing, or deleting Terragrunt files (aka Infrastructure Units) is handled by the pipeline for each specific account. Provisioning new accounts and applying baselines in them is handled exclusively by the management account.

### Management Account

Provisioning AWS accounts must be handled by your Management AWS Account (e.g., your AWS Control Tower management account). When account requests are approved and the account is created, Pipelines will create a PR that contains an account baseline. Since Pipelines doesn’t have access to the account yet, the baseline will be applied using the Management Account Pipeline.

When applying the baseline and provisioning the Pipelines role in the new child account, Pipelines will first assume the management account Pipelines role, then will assume an automatically provisioned role in the child account (this process is known as [role chaining](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_terms-and-concepts.html)). Once Pipelines has temporary credentials in the new account, it will run a plan or apply to provision the requested resources. After the initial baseline and Pipelines role has been applied in the child account, all subsequent events for that account will be handled by the Pipelines role directly in the child account.

:::note

The AWS IAM Role for the management account must have permissions to provision new AWS Accounts (via AWS Control Tower) and assume a role in all child accounts.

:::

### Child Accounts

Each child account (e.g., `dev`, `stage`, `prod,` etc.) contains an AWS IAM role that Pipelines can assume from GitHub Actions using OIDC. This role is automatically provisioned as a part of the [account baseline process](../accounts/add-account#4-review-and-merge-the-account-baseline-pr). Once this role is in place in the child account, users may submit pull requests with new Infrastructure Units in the child account.

When a Pull Request is created or synchronized, or a push to main occurs, Pipelines will detect the changes, map them to the new account, assume the role in the child account, then run a `terragrunt plan` or `terragrunt apply` job (plan for PRs, apply for pushes to main).
