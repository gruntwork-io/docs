# Controls

Pipelines employs a defense-in-depth approach to secure workflows. This document outlines the controls Pipelines uses to ensure that only infrastructure written in code and approved by a reviewer can be deployed to your AWS accounts.

## Least privilege principle

Pipelines adheres to the principle of least privilege, granting only the necessary permissions for infrastructure actions.

By default, the only repository required to interact with infrastructure using Pipelines in DevOps Foundations is the `infrastructure-live-root` repository. This repository contains infrastructure code for management, logs, security, and shared accounts. Access to this repository should be limited to a small, trusted group responsible for defining critical infrastructure, similar to the role of the `root` user in Unix systems.

- The [AWS IAM role assumed via OIDC](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services) when pull requests are opened or updated in this repository has a trust policy that restricts access to the repository itself and provides read-only permissions. This ensures infrastructure updates are reviewed before implementation.
- The AWS IAM role assumed via OIDC when pull requests are merged into the `main` branch has a trust policy limiting access to the repository’s `main` branch and granting write permissions. This allows changes to be applied to your AWS infrastructure. To prevent unauthorized changes, ensure that only trusted individuals have write access to the `main` branch and implement appropriate branch protections.

## Infrastructure access control

An optional `infrastructure-live-access-control` repository can manage access control for infrastructure provisioned in AWS accounts. Using this repository is a best practice for centralized and auditable access management.

- Access to the `main` branch of the `infrastructure-live-access-control` repository should be restricted to a small, trusted group managing infrastructure access.
- The same least privilege principles apply: roles assumed by Pipelines for pull requests have read-only permissions, while roles for merged pull requests have write permissions.

Unlike the `infrastructure-live-root` repository, this repository focuses on managing access control rather than defining infrastructure. You might grant write access to a broader group for managing access while maintaining tight control over the `main` branch. Encourage collaboration between platform teams and application engineers to review and refine access control continuously.

## Token strategy

Gruntwork Pipelines (when set up via Machine Users rather than the GitHub App) uses GitHub Personal Access Tokens (PATs) to enable cross-repository access. Each token is scoped with minimal permissions required for its purpose.

### Required tokens
- `PIPELINES_READ_TOKEN`: A [classic PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#personal-access-tokens-classic) with read access to `infrastructure-live`, `infrastructure-modules`, Gruntwork IaC Library modules, and the Pipelines CLI.
- `INFRA_ROOT_WRITE_TOKEN`: A [fine-grained PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) with read/write access to `infrastructure-live-root`. Used to create pull requests and add pull request comments.
- `ORG_REPO_ADMIN_TOKEN`: A fine-grained PAT with admin access to repositories in your GitHub organization. Used for DevOps Foundations setup, including bootstrapping repositories and, for Enterprise customers, creating repositories for delegated infrastructure management.

Refer to [creating a personal access token classic](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic) and [creating a fine-grained personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token) for setup instructions.

## AWS credentials

Pipelines requires IAM roles configured with trust policies to use OpenID Connect (OIDC) with GitHub Actions. This eliminates the need for long-lived AWS credentials stored as secrets. During execution, Pipelines exchanges a GitHub OIDC token for temporary AWS credentials generated with AWS STS, scoped to the necessary permissions for the operation.

While temporary, these credentials should still be treated as sensitive. The Pipelines role in the `infrastructure-live-root` repository typically has administrative permissions for deploying resources. Use the `infrastructure-live-access-control` repository to grant more limited permissions for specific cases.

### OpenID Connect

Pipelines provisions an OpenID Connect identity provider in AWS IAM for each account, setting GitHub as the provider and restricting the audience to AWS STS and your GitHub organization. The Pipelines IAM role's trust policy ensures:
- Only a single repository in your GitHub organization can assume the role for plans.
- Only a single branch can assume the role for applies/destroys.

For more details, see the [official AWS documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html). Below is an example of a trust policy used by Pipelines.

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

Refer to [Configuring OpenId Connect in Amazon Web Services](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services) for additional details.

### Roles provisioned by DevOps Foundations

Pipelines automatically provisions specific roles in AWS accounts to support required infrastructure operations. These roles follow the naming pattern `<repository-allowed-to-use-the-role>-pipelines-<permissions>`.

For example:
- The `root-pipelines-plan` role is used by Pipelines to plan changes in the `infrastructure-live-root` repository.

These roles are designed to operate in a single repository and include a trust policy that only permits GitHub Actions workflows triggered by that repository to assume the role. Each role is provisioned in pairs:
- `plan` roles, with read-only permissions, are used to execute Terragrunt plans for open pull requests.
- `apply` roles, with read/write permissions, are used to apply or destroy infrastructure changes for merged pull requests or direct pushes to the deploy branch (commonly `main`).

This separation ensures that controls like [branch protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) and [CODEOWNERS files](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) can effectively govern infrastructure changes.

#### `root-pipelines-plan`

A read-only plan role for the `infrastructure-live-root` repository. 
- This role is among the first created when setting up DevOps Foundations.
- It exists in all accounts and handles tasks necessary for setting up AWS accounts.
- These roles are highly permissive among read-only roles as they manage foundational AWS account setups.

#### `root-pipelines-apply`

A read/write apply role for the `infrastructure-live-root` repository.
- Like the plan role, this is one of the initial roles created during setup.
- It is broadly permissive to support foundational account setups and bootstrapping.

#### `access-control-pipelines-plan`

A read-only plan role for the `infrastructure-live-access-control` repository.
- These roles are provisioned for new accounts but are not included in core accounts such as `management`, `logs`, `security`, or `shared`.
- They manage IAM roles and policies for vended accounts, facilitating infrastructure access control.

#### `access-control-pipelines-apply`

A read/write apply role for the `infrastructure-live-access-control` repository.
- Similar to the plan role, these roles are provisioned for vended accounts but excluded from core accounts.
- They have permissions to manage IAM roles and policies for the accounts where they are provisioned.

#### `delegated-pipelines-plan`

A read-only plan role for delegated repositories.
- These roles are pre-configured to have minimal permissions, primarily for managing OpenTofu/Terraform state.
- Pull requests opened during provisioning include documentation for adding additional permissions if necessary.
- Users should ensure that only the necessary _read-only_ permissions are granted for the specific delegated repository.

#### `delegated-pipelines-apply`

A read/write apply role for delegated repositories.
- Similar to the plan role, these roles are pre-configured with minimal permissions and are intended for managing OpenTofu/Terraform state.
- Pull requests include guidance for adding appropriate permissions.
- Users must ensure that the role has only the necessary _read/write_ permissions required for the delegated repository.

:::note
The `delegated-pipelines-plan` and `delegated-pipelines-apply` roles are automatically provisioned for new delegated accounts. Enterprise customers will see pull requests created in the `infrastructure-live-access-control` repository to vend these roles with proper configurations.
:::
