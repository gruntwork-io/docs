# Controls

Pipelines takes a defense in depth approach to securing workflows. This document provides an overview of the controls that Pipelines employs to ensure that only infrastructure that has been written in code and approved by a reviewer can be deployed in your AWS accounts.

## Least privilege principle

Pipelines leverages the principle of least privilege to ensure that only the necessary permissions are used when performing infrastructure actions.

By default, the only repository needed to interact with infrastructure using Pipelines as part of DevOps Foundations is the `infrastructure-live-root` repository. This repository contains the infrastructure code that controls your management, logs, security and shared accounts. Access to this repository should be limited to a small group of trusted individuals who are responsible for defining critical infrastructure for your organization (think of the `root` user in Unix systems).

The [AWS IAM role assumed via OIDC](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services) by Pipelines when pull requests are opened or updated in this repository has a trust policy that limits access to the repository itself, and only has read permissions. This means that interaction with AWS resources when opening or updating pull requests is limited to reading the current state of infrastructure in AWS. This is important for ensuring that all updates to infrastructure are properly reviewed.

The AWS IAM role assumed via OIDC by Pipelines when pull requests are merged to the `main` branch has a trust policy that limits access to the repository itself on the `main` branch, and has write permissions. This is what allows merged pull requests to make changes to your AWS infrastructure. As a consequence, you should ensure that only trusted individuals have write access to the `main` branch of the `infrastructure-live-root` repository, and that sufficient protections are in place to prevent unauthorized changes to that branch.

## Infrastructure Access Control

In addition to the `infrastructure-live-root` repository, an optional dedicated repository for access control (the `infrastructure-live-access-control` repository) can be used to manage access to infrastructure provisioned in your AWS accounts as part of DevOps Foundations. Using this repository is a recommended best practice, as it allows you to manage access to your infrastructure in a centralized and auditable way.

The same principles of least privilege apply to the `infrastructure-live-access-control` repository. Access to the `main` branch of this repository should be limited to a small group of trusted individuals who are responsible for managing access to your infrastructure. Similar restrictions exist for the two roles assumed by Pipelines when interacting with this repository, with read permissions for pull requests and write permissions for merged pull requests.

One key difference between the `infrastructure-live-root` and `infrastructure-live-access-control` repositories is that the `infrastructure-live-access-control` repository is used to manage access to your infrastructure, rather than defining the infrastructure itself. This might mean that you want to grant write access to the repository to a broader set of individuals who are responsible for managing access to your infrastructure, while retaining the same restrictions on the `main` branch.

This encourages a dialogue between the individuals responsible for defining critical infrastructure that keeps your AWS accounts functional and secure, and the individuals responsible for deploying workloads to those accounts. Consider encouraging a culture of collaboration between these groups to ensure that access control is continuously reviewed, refined and restricted to the minimum necessary permissions for workloads to be deployed.

## Token strategy

Gruntwork Pipelines (when setup via Machine Users and not the GitHub App) uses a series of GitHub Personal Access Tokens (PAT) to allow cross-repository code and workflow access. This approach ensures that each token has the minimal required permissions to perform its tasks. The full list of tokens and required permissions are listed below.

- `PIPELINES_READ_TOKEN` - A [classic PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#personal-access-tokens-classic) with repository read access to your `infrastructure-live` and `infrastructure-modules` repositories, as well as Gruntwork IaC Library modules and the Pipelines CLI.
- `INFRA_ROOT_WRITE_TOKEN` - A [fine-grained PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) that has read and write access to your `infrastructure-live-root` repository. This token is used in Pipelines to create pull requests after code generation and add pull request comments.
- `ORG_REPO_ADMIN_TOKEN` - A fine-grained PAT that can update all repositories in your GitHub organization. It is used by Pipelines to do the following:
  - Bootstrap repositories during DevOps Foundations setup. If you are a DevOps Foundations Teams customer, you can delete this token once it is no longer needed.
  - Enterprise only: This token is also used by Pipelines to create new repositories for delegated management of infrastructure, and to create pull requests that baseline those repositories.

Steps to create a PAT can be found in the official documentation. Refer to [creating a personal access token classic](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic) and [creating a fine-grained personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token), respectively.

To learn more about GitHub PATs, refer to their documentation on [managing personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

## AWS Credentials

Pipelines requires the use of IAM Roles configured with a trust policy to allow GitHub Actions to use OpenId Connect (OIDC) with to run actions in your AWS accounts. This prevents the requirement of creating long-lived AWS credentials and storing them as secrets in GitHub Actions. At execution time, Pipelines exchanges the GitHub OIDC token for short-lived AWS credentials generated using AWS STS to run actions in your AWS accounts that only have requisite permissions for the operations they need to perform.

These credentials, although temporary, should still be treated as secrets. The Pipelines role in the `infrastructure-live-root` has administrative permissions to many AWS resources to allow you to deploy many resources without needing to update the policy.

Leverage the `infrastructure-live-access-control` repository to grant limited access to select infrastructure from other repositories.

### OpenID Connect

Pipelines provisions an OpenId Connect identity provider in AWS IAM in every account, setting up GitHub as the provider and setting the audience to AWS STS and your GitHub organization. To learn more about provisioning OpenId Connect providers in AWS, refer to the [official documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html).

The Pipelines IAM role uses a trust policy to limit access to assume the role to a single repository in your GitHub Organization for plans, and an additional restriction requiring that a single branch can access the role used for applies/destroys. The OpenID Connect provider is set as the principal, and a condition is added to the limit access to the relevant repository in your GitHub organization. An example of the trust policy can be found below.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "",
            "Effect": "Allow",
            "Principal": {
                "Federated": "arn:aws:iam::0123456789012:oidc-provider/token.actions.githubusercontent.com"
            },
            "Action": "sts:AssumeRoleWithWebIdentity",
            "Condition": {
                "StringEquals": {
                    "token.actions.githubusercontent.com:sub": "repo:acme/infrastructure-live-root:ref:refs/heads/main"
                }
            }
        }
    ]
}
```

Refer to [Configuring OpenId Connect in Amazon Web Services](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services) to learn more.

### Roles Provisioned By DevOps Foundations

Pipelines will automatically look for certain roles in AWS accounts to assume when executing certain actions. These are roles that are provisioned as part of DevOps Foundations to ensure that Pipelines can perform necessary infrastructure operations.

These roles follow the naming convention `<repository-allowed-to-use-the-role>-pipelines-<permissions>`.

e.g. The `root-pipelines-plan` role is assumed by Pipelines to plan changes in the `infrastructure-live-root` repository.

All of the roles provisioned by DevOps Foundations are meant to be assumed by Pipelines for operation in a single repository, and have a trust policy that only allows GitHub Actions workflows triggered by that repository to assume the role.

In addition, these roles are always provisioned in pairs, a `plan` role and an `apply` role.

- `plan` roles are used to plan changes to infrastructure. They have read-only permissions to AWS resources, and are used to execute Terragrunt plans for open Pull Requests. They are allowed to be assumed by workflows started by any branch in the repository that trusts them.
- `apply` roles are used to apply changes to infrastructure. They have read/write permissions to AWS resources, and are used to execute Terragrunt apply and destroy actions for merged Pull Requests and direct pushes to the deploy branch (usually `main`). They are only allowed to be assumed by workflows started by changes to the deploy branch in the repository that trusts them.

Breaking these permissions up into two roles ensures that controls like [branch protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) and [CODEOWNERS files](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) can be used to ensure that only appropriately privileged parties can drive changes to your infrastructure.

The explicit enumeration of these roles are as follows:

#### `root-pipelines-plan`

The read-only plan role for the `infrastructure-live-root` repository.

These are the first roles created when setting up DevOps Foundations, and exist in every account. The initial set of these are provisioned manually by the customer setting up DevOps Foundations, and is how all of the other roles get bootstrapped.

These roles are generally the most permissive of the (read-only) roles created by DevOps Foundations, as they are used to handle everything involved in setting up an AWS account for use by other resources.

#### `root-pipelines-apply`

The read/write apply role for the `infrastructure-live-root` repository.

These are the first roles created when setting up DevOps Foundations, and exist in every account. The initial set of these are provisioned manually by the customer setting up DevOps Foundations, and is how all of the other roles get bootstrapped.

These roles are generally the most permissive of the roles created by DevOps Foundations, as they are used to handle everything involved in setting up an AWS account for use by other resources.

#### `access-control-pipelines-plan`

The read-only plan role for the `infrastructure-live-access-control` repository.

These are created as part of vending any new account, and are intentionally absent from the _core_ AWS accounts:

- `management`
- `logs`
- `security`
- `shared`

These roles are used by the `infrastructure-live-access-control` repository to grant external repositories access to infrastructure in vended accounts, and thus are not needed in the core accounts by default.

These roles have (read-only) permissions to manage IAM roles and policies within the accounts they are provisioned in.

#### `access-control-pipelines-apply`

The read/write apply role for the `infrastructure-live-access-control` repository.

These are created as part of vending any new account, and are intentionally absent from the _core_ AWS accounts:

- `management`
- `logs`
- `security`
- `shared`

These roles are used by the `infrastructure-live-access-control` repository to grant external repositories access to infrastructure in vended accounts, and thus are not needed in the core accounts by default.

These roles have permissions to manage IAM roles and policies within the accounts they are provisioned in.

#### `delegated-pipelines-plan`

The read-only plan role for delegated repositories.

The `infrastructure-live-access-control` repository is vended ready to provision these roles with the configuration baked in.

Enterprise customers will see pull requests opened automatically in the `infrastructure-live-access-control` repository to vend these roles for every new account vended as a delegated account. Given that delegated accounts have their own repositories that are separate from the main `infrastructure-live-root` and `infrastructure-live-access-control` repositories, these roles are used to ensure that the delegated repositories have adequate access to the infrastructure they need to manage.

:::note

These roles have almost no permissions by default. They are pre-configured by default to only have access to OpenTofu/Terraform state, and the pull requests that are opened to provision them include documentation on how to add additional permissions as appropriate.

It is up to the user provisioning these roles to ensure that this role has only the necessary _read-only_ permissions required to manage infrastructure changes relevant to the delegated repository.

:::

#### `delegated-pipelines-apply`

The read/write apply role for delegated repositories.

The `infrastructure-live-access-control` repository is vended ready to provision these roles with the configuration baked in.

Enterprise customers will see pull requests opened automatically in the `infrastructure-live-access-control` repository to vend these roles for every new account vended as a delegated account. Given that delegated accounts have their own repositories that are separate from the main `infrastructure-live-root` and `infrastructure-live-access-control` repositories, these roles are used to ensure that the delegated repositories have adequate access to the infrastructure they need to manage.

:::note

These roles have almost no permissions by default. They are pre-configured by default to only have access to OpenTofu/Terraform state, and the pull requests that are opened to provision them include documentation on how to add additional permissions as appropriate.

It is up to the user provisioning these roles to ensure that this role has only the necessary _read/write_ permissions required to manage infrastructure changes relevant to the delegated repository.

:::
