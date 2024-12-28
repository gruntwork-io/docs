---
# Display h2 to h5 headings
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Pipelines Install via GitHub App

The [Gruntwork.io GitHub App](https://github.com/apps/gruntwork-io) is a [GitHub App](https://docs.github.com/en/apps/overview)  designed to simplify integration with GitHub resources. It provides a lightweight and flexible mechanism to streamline workflows with Gruntwork products.

## Overview

The Gruntwork.io GitHub App operates with three key components:

1. **Gruntwork.io GitHub App**: The app installed in your GitHub organization, serving as the interface for managing resources.
2. **GitHub App Service**: The backend service that interacts with the GitHub API on behalf of the app. It facilitates operations and manages permissions.
3. **Clients**: Tools or workflows that leverage the GitHub App Service to interact with GitHub resources.

### Gruntwork.io GitHub App

The app serves as the principal mechanism through which Gruntwork products manage GitHub resources. It can be installed for specific repositories or for an entire organization, depending on user needs.

#### Required permissions

As of 2024/09/10, the app requires the following permissions:

- **Read access to Actions**: To retrieve GitHub Actions artifacts.
- **Write access to Administration**: To create repositories and manage collaborators.
- **Write access to Contents**: To read and modify repository contents.
- **Write access to Issues**: To create and manage issues.
- **Write access to Pull Requests**: To create and modify pull requests.
- **Write access to Workflows**: To create and modify pull requests.

<details>
  <summary>Why are these permissions necessary?</summary>

  Gruntwork.io requires these permissions to execute specific operations. While GitHub apps cannot request more granular permissions, the GitHub App Service scopes permissions to the minimum needed for each task.

**Installation Recommendations:**

  * Non-enterprise customers: Install the app for `infrastructure-live-root` and optionally for `infrastructure-live-access-control` and `infrastructure-catalog`if they are in use.
  * Enterprise customers: Grant organization-wide access to enable seamless management of new repositories via Account Factory.

The reasoning for requiring entire-organization access for enterprise customers is that if you are using Account Factory to create delegated repositories then Account Factory will be creating, and then immediately modifying, new repositories in automated flows, which means it needs access to new repos as soon as they are created which is only possible with entire organization permission.

  For further clarification, contact Gruntwork Support.

### Permission Details

**Actions:** Enables reading GitHub Actions workflow logs to generate pull request comments with log details.

**Administration:** Supports repository creation, critical for initial setup and enterprise repository management.

**Contents:** Facilitates proposing and committing changes, such as generating configuration files for new accounts.

**Issues:** Allows creation of issues to notify users of manual action required for resolving infrastructure issues.

**Pull Requests:** Enables creating pull requests for workflows like Account Factory or drift detection.

**Workflows:** Necessary for creating .github/workflows files during enterprise account vending.

**Members:** Adjusts repository access for GitHub teams when managing delegated repositories.

</details>

### Clients

Two primary clients utilize the GitHub App Service:

1. **Gruntwork Developer Portal** The portal allows customers to install and configure the app, linking it to their Gruntwork organization for streamlined access management.

2. **Gruntwork Pipelines** Pipelines use the app to interact with GitHub resources. Access control rules ensure that Pipelines only perform operations explicitly authorized through the Developer Portal.

## Availability

Gruntwork prioritizes the availability of the app. However, day-to-day operations are designed to function independently of app availability.

#### Features impacted by downtime

Certain features depend on the app's availability:

- **GitHub App Linking**: Requires a functional backend to link the app with the [Developer Portal](https://app.gruntwork.io).
- **Pipelines Comments**: Commenting on pull requests is unavailable during downtime.
- **Drift Detection**: This functionality relies on the app to operate correctly.

#### Fallback mechanism

If the app is unavailable, Pipelines can authenticate using [Machine users](/2.0/docs/pipelines/installation/viamachineusers.md). Configuring the `PIPELINES_READ_TOKEN`, `INFRA_ROOT_WRITE_TOKEN` and `ORG_REPO_ADMIN_TOKEN`ensures Pipelines can continue critical functions, such as:

- Planning changes on pull request creation.
- Applying changes on pull request merge.
- Destroying resources on pull request merge.

The fallback ensures continuity but lacks advanced features offered by the app.

## Initial installation

To install the Gruntwork.io GitHub App in your organization:

1. Follow the instructions in the [Gruntwork Developer Portal's Account Settings](https://app.gruntwork.io/account?scroll_to=github-app) as an administrator.
2. Select the GitHub organization for app installation. ![Choose GitHub Organization](/img/devops-foundations/github-app/choose-organization.png)
3. Complete the installation in the GitHub organization.
4. Verify the installation in the Developer Portal. A success message confirms the app is linked to your organization. ![GitHub App installed and linked](/img/devops-foundations/github-app/app-installed-and-linked.png)

## Configuration

<h3>Infrastructure Live Root Repositories</h3>

Certain repositories, termed "infrastructure live root repositories," are treated as privileged for critical operations. These can be configured in the [GitHub Account section](https://app.gruntwork.io/account?scroll_to=github-app) of the Developer Portal.

![Root Repository Configuration](/img/devops-foundations/github-app/root-repo-config.png)

Maintaining this list ensures the app performs privileged operations only on trusted repositories. Refer to the [architecture documentation](/2.0/docs/pipelines/architecture/#infrastructure-live-root) for details.

## Frequently Asked Questions

#### How do I find my Gruntwork.io GitHub App installation ID?

You can find the installation ID of the Gruntwork.io GitHub App in the URL of the installation page.

![GitHub App Installation ID](/img/devops-foundations/github-app/get-installation-id.png)




9
