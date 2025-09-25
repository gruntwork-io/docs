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

Anyone with the ability to edit code in the `main` branch of your repositories inherently has the authority to make corresponding changes in your infrastructure resources. For this reason, it is important to follow the [Repository Access](/2.0/docs/pipelines/installation/viamachineusers#repository-access) guidelines to ensure appropriate access control.
