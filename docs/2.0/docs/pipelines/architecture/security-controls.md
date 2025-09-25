# Controls

Gruntwork Pipelines employs a defense-in-depth approach to secure workflows across both GitHub and GitLab platforms. This document outlines the controls Pipelines uses to ensure that only infrastructure written in code and approved by a reviewer can be deployed to your cloud environments (e.g. AWS accounts).

## Least privilege principle

Pipelines adheres to the principle of least privilege, granting only the necessary permissions for infrastructure actions using the context of a pull request or push to the deploy branch to determine the environment(s) to authenticate to, and how to authenticate to them.

## Platform-Specific Access Controls

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

<Tabs groupId="platform">
<TabItem value="github" label="GitHub" default>

- The credentials assumed via OIDC (e.g. STS Tokens for AWS IAM Roles) when pull requests are opened or updated are intended to have trust policies that restrict access to the repository itself and provides read-only permissions.
- The credentials assumed via OIDC when pull requests are merged into the deploy branch (e.g. `main`) are intended to have trust policies that limiting access to the repository's deploy branch and granting write permissions.
- Branch protection rules can be configured to require reviews and status checks
- GitHub App or machine user authentication options available

</TabItem>
<TabItem value="gitlab" label="GitLab">

- The credentials assumed via OIDC (e.g. STS Tokens for AWS IAM Roles) when merge requests are opened or updated are intended to have trust policies that restrict access to the group itself and provides read-only permissions.
- The credentials assumed via OIDC when merge requests are merged into the deploy branch (e.g. `main`) are intended to have trust policies that limiting access to the group's deploy branch and granting write permissions.
- Protected branches can be configured to require approvals and pipeline success
- Machine user authentication required with group-level access configuration

</TabItem>
</Tabs>

## Token Strategy

<Tabs groupId="platform">
<TabItem value="github" label="GitHub" default>

### GitHub App Installation Strategy (Recommended)

No long-lived tokens are required when using the GitHub App.

### Machine Users Installation Strategy

Requires that the following tokens are created:

- `PIPELINES_READ_TOKEN`: Classic PAT with read access to required repositories
- `INFRA_ROOT_WRITE_TOKEN`: Fine-grained PAT with read/write access to infrastructure repositories
- `ORG_REPO_ADMIN_TOKEN`: Fine-grained PAT with admin access for repository management

See [Setup via Machine Users](/2.0/docs/pipelines/installation/viamachineusers.md) for more details.

</TabItem>
<TabItem value="gitlab" label="GitLab">

Requires that the following tokens are created:

- `PIPELINES_GITLAB_TOKEN`: A GitLab access token with `api` scope
- `PIPELINES_GITLAB_READ_TOKEN`: A GitLab access token with `read_repository` scope

See [Setup via Machine Users](/2.0/docs/pipelines/installation/viamachineusers) for more details.

Pipelines will also require access to Gruntwork's GitHub repositories, however those tokens are generated at runtime via the Gruntwork Management Portal.

</TabItem>
</Tabs>

## Cloud Authentication

Pipelines supports multiple different authentication methods for different cloud providers, and will use the appropriate method based on the context of the pull request or push to the deploy branch.

To learn more about how Pipelines authenticates to the cloud, read the [Cloud Authentication](/2.0/docs/pipelines/concepts/cloud-auth/index.md) documentation.

## Trust boundaries

A critical aspect of Pipelines' architecture is understanding its trust model. Since Pipelines runs within a CI/CD system, it has privileged access to your infrastructure resources (e.g. AWS accounts, VPCs, EC2 instances, etc.).

<<<<<<< HEAD
Anyone with the ability to edit code in the `main` branch of your repositories inherently has the authority to make corresponding changes in your infrastructure resources. For this reason, it is important to follow the [Repository Access](/2.0/docs/pipelines/installation/viamachineusers#repository-access) guidelines to ensure appropriate access control.
=======
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
                "StringLike": {
                    "token.actions.githubusercontent.com:sub": "repo:acme/infrastructure-live-root:ref:*"
                }
            }
        }
    ]
}
```

</TabItem>

<TabItem value="gitlab" label="GitLab">

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "",
            "Effect": "Allow",
            "Principal": {
                "Federated": "arn:aws:iam::0123456789012:oidc-provider/gitlab.com"
            },
            "Action": "sts:AssumeRoleWithWebIdentity",
            "Condition": {
                "StringLike": {
                    "gitlab.com:sub": "project_path:acme/projectprefix*:*"
                }
            }
        }
    ]
}


```

</TabItem>
</Tabs>


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
- This role is one of the first created when setting up DevOps Foundations. It is provisioned manually by the customer during the platform setup process.
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

A read-only plan role for delegated repositories, used by Pipelines Enterprise customers.

- These roles are pre-configured to have minimal permissions, primarily for managing OpenTofu/Terraform state.
- A pull request will be opened in `infrastructure-live-access-control` during provisioning include documentation for adding additional permissions if necessary.
- Users should ensure that only the necessary _read-only_ permissions are granted for the specific delegated repository.


:::note

These roles have almost no permissions by default. They are pre-configured by default to only have access to OpenTofu/Terraform state, and the pull requests that are opened to provision them include documentation on how to add additional permissions as appropriate.

It is up to the user provisioning these roles to ensure that this role has only the necessary _read-only_ permissions required to manage infrastructure changes relevant to the delegated repository.

:::

#### `delegated-pipelines-apply`

A read/write apply role for delegated repositories.
- Similar to the plan role, these roles are pre-configured with minimal permissions and are intended for managing OpenTofu/Terraform state.
- A pull request will be opened in `infrastructure-live-access-control` during provisioning include documentation for adding additional permissions if necessary.
- Users must ensure that the role has only the necessary _read/write_ permissions required for the delegated repository.

:::note
The `delegated-pipelines-plan` and `delegated-pipelines-apply` roles are automatically provisioned for new delegated accounts. Enterprise customers will see pull requests created in the `infrastructure-live-access-control` repository to vend these roles with proper configurations.
:::

## Trust boundaries

A critical aspect of Pipelines' architecture is understanding its trust model. Since Pipelines runs within a CI/CD system, it has privileged access to your infrastructure resources (e.g. AWS accounts, VPCs, EC2 instances, etc.).

Anyone with the ability to edit code in the `main` branch of your repositories inherently has the authority to make corresponding changes in your infrastructure resources. For this reason, it is important to follow the [Repository Access](/2.0/docs/pipelines/installation/viamachineusers#repository-access) guidelines to ensure appropriate access control.

:::tip

Each AWS IAM role provisioned through setup of [Gruntwork Account Factory](https://docs.gruntwork.io/account-factory/overview) is configured to trust a single repository (and, for apply roles, a single branch). If a role's permissions become overly broad, consider creating a new role with more granular permissions tailored to the specific use case. Use the `infrastructure-live-access-control` repository to define and manage these roles.

:::
>>>>>>> 9d212600 (fix: Reworked components page into execution flow page)
