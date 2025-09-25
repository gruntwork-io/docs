# Controls

Gruntwork Account Factory employs a defense-in-depth approach to secure workflows across both GitHub and GitLab platforms. This document outlines the controls Account Factory uses to ensure that only infrastructure written in code and approved by a reviewer can be deployed to your AWS accounts.

Account Factory relies on Pipelines to drive infrastructure changes via GitOps workflows, so make sure to read the [Pipelines security controls](/2.0/docs/pipelines/architecture/security-controls) for more details on how Pipelines secures workflows.

Account Factory relies on Pipelines to drive infrastructure changes via GitOps workflows, so make sure to read the [Pipelines security controls](/2.0/docs/pipelines/architecture/security-controls) for more details on how Pipelines secures workflows.

## Least privilege principle

Account Factory adheres to the principle of least privilege, configuring the AWS IAM roles vended as part of Account Factory onboarding to grant only the necessary permissions for infrastructure actions relevant for Account Factory to operate correctly, and to only trust the `infrastructure-live-root` repository for role assumption.

By default, the only repository/group required to interact with infrastructure using Pipelines in Account Factory is the `infrastructure-live-root` repository/group. This contains the Infrastructure as Code for `management`, `logs`, `security`, and `shared` accounts. Access should be limited to a small, trusted group responsible for defining critical infrastructure, similar to the role of the `root` user in Unix systems.

The roles used by the `infrastructure-live-root` repository are divided by responsibility:

- Plan roles: Every account is provisioned with an AWS IAM role that `infrastructure-live-root` is trusted to assume from any branch that has read-only permissions to the resources in that account.
- Apply roles: Every account is provisioned with an AWS IAM role that `infrastructure-live-root` is trusted to assume on the deploy branch (e.g. `main`) with read-write permissions to the resources in that account.

## Platform-Specific Access Controls

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

<Tabs groupId="platform">
<TabItem value="github" label="GitHub" default>

- The AWS IAM role assumed via OIDC when pull requests are opened or updated has a trust policy that restricts access to the repository itself and provides read-only permissions
- The AWS IAM role assumed via OIDC when pull requests are merged into the `main` branch has a trust policy limiting access to the repository's `main` branch and granting write permissions
- Branch protection rules can be configured to require reviews and status checks
- GitHub App or machine user authentication options available

</TabItem>
<TabItem value="gitlab" label="GitLab">

- The AWS IAM role assumed via OIDC when merge requests are opened or updated has a trust policy that restricts access to the group itself and provides read-only permissions
- The AWS IAM role assumed via OIDC when merge requests are merged into the `main` branch has a trust policy limiting access to the group's `main` branch and granting write permissions
- Protected branches can be configured to require approvals and pipeline success
- Machine user authentication required with group-level access configuration

</TabItem>
</Tabs>

## Infrastructure access control

An optional `infrastructure-live-access-control` repository/group can manage access control for infrastructure provisioned in AWS accounts. Using this is a best practice for centralized and auditable access management.

- Access to the `main` branch should be restricted to a small, trusted group managing infrastructure access
- The same least privilege principles apply: roles assumed for pull/merge requests have read-only permissions, while roles for merged changes have write permissions

Unlike the infrastructure-live-root repository, this repository focuses on managing access control rather than defining infrastructure. You might grant write access to a broader group for managing access while maintaining tight control over the main branch. Encourage collaboration between platform teams and application engineers to review and refine access control continuously.

## CI/CD Token Strategy

<Tabs groupId="platform">
<TabItem value="github" label="GitHub" default>

There are two ways GitHub users can configure Source Control Management (SCM) authentication for Account Factory:

- The [Gruntwork.io GitHub App](https://github.com/apps/gruntwork-io)
- [GitHub Machine Users](/2.0/docs/pipelines/installation/viamachineusers)

In general, we recommend using the Gruntwork.io GitHub App when possible, as it provides a more feature-rich, reliable and secure experience.

Reasons you might need to set up Machine Users include:

- Your organization does not allow installation of third-party GitHub apps.
- You are using Self-hosted GitHub Enterprise, and cannot use third-party GitHub apps due to your server settings.
- You are using a different SCM platform (e.g. GitLab).
- You want a fallback mechanism in case the Gruntwork.io GitHub App is temporarily unavailable.

### GitHub App Installation Strategy (Recommended)

No long-lived tokens are stored when using the Gruntwork.io GitHub App. Instead, short-lived tokens are generated at runtime on-demand using the Gruntwork.io GitHub App for authentication with GitHub.

### Machine Users Installation Strategy

Requires the following tokens be created:

- `PIPELINES_READ_TOKEN`: Classic PAT with read access to required repositories
- `INFRA_ROOT_WRITE_TOKEN`: Fine-grained PAT with read/write access to infrastructure repositories
- `ORG_REPO_ADMIN_TOKEN`: Fine-grained PAT with admin access for repository management

See [Setup via Machine Users](/2.0/docs/pipelines/installation/viamachineusers.md) for more details.

</TabItem>
<TabItem value="gitlab" label="GitLab">

Requires the following tokens be created:

- `PIPELINES_GITLAB_TOKEN`: A GitLab access token with `api` scope
- `PIPELINES_GITLAB_READ_TOKEN`: A GitLab access token with `read_repository` scope

See [Setup via Machine Users](/2.0/docs/pipelines/installation/viamachineusers) for more details.

Pipelines will also require access to Gruntwork's GitHub repositories, however those tokens are generated at runtime via the Gruntwork Management Portal.

</TabItem>
</Tabs>

## AWS credentials

Pipelines requires IAM roles configured with trust policies to use OpenID Connect (OIDC) with your CI/CD platform. This eliminates the need for long-lived AWS credentials stored as secrets.

### OpenID Connect Configuration

Pipelines provisions an OpenID Connect identity provider in AWS IAM for each account, setting GitHub/GitLab as the provider and restricting the audience to AWS STS and your GitHub/GitLab organization. The Pipelines IAM role's trust policy ensures:

- Only a single repository in your GitHub/GitLab organization can assume the role for plans.
- Only a single branch can assume the role for applies/destroys.

For more details, see the [official AWS documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html). Below is an example of a trust policy used by Pipelines.

<Tabs groupId="platform">
<TabItem value="github" label="GitHub" default>

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

### Roles provisioned by Account Factory

Pipelines automatically provisions specific roles in AWS accounts to support required infrastructure operations. These roles follow the naming pattern `<repository-allowed-to-use-the-role>-pipelines-<permissions>`.

For example:

- The `root-pipelines-plan` role is used by Pipelines to plan changes in the `infrastructure-live-root` repository.

These roles are designed to operate in a single repository and include a trust policy that only permits GitHub Actions workflows triggered by that repository to assume the role. Each role is provisioned in pairs:

- `plan` roles, with read-only permissions, are used to execute Terragrunt plans for open pull requests.
- `apply` roles, with read/write permissions, are used to apply or destroy infrastructure changes for merged pull requests or direct pushes to the deploy branch (commonly `main`).

This separation ensures that controls like [branch protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) and [CODEOWNERS files](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) can effectively govern infrastructure changes.

#### `root-pipelines-plan`

A read-only plan role for the `infrastructure-live-root` repository.

- This role is one of the first created when setting up Account Factory. It is provisioned manually by the customer during the platform setup process.
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
