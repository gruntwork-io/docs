---
# Display h2 to h5 headings
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Pipelines Install via GitHub App

The [Gruntwork.io GitHub App](https://github.com/apps/gruntwork-io) is a [GitHub App](https://docs.github.com/en/apps/overview)  introduced to help reduce the burden of integrating Gruntwork products to GitHub resources. The app is designed to be lightweight and flexible, providing a simple way to get started with Gruntwork products.

## Overview

There are three major components to keep in mind when working with the Gruntwork.io GitHub App:

1. **Gruntwork.io GitHub App**: The Gruntwork.io GitHub App itself, which is installed in your GitHub organization.
2. **GitHub App Service**: The backend service that interacts with the GitHub API on behalf of the Gruntwork.io GitHub App. Outside of this page, the backend service and the GitHub App are often referred to interchangeably.
3. **Clients**: Clients that interact with the GitHub App Service to perform operations on GitHub resources.

### Gruntwork.io GitHub App

The Gruntwork.io GitHub App is the principal that Gruntwork products will utilize to interact with GitHub resources. The app can either be installed on a per-repository basis or on an entire organization.

#### Required Permissions

As of 2024/09/10, the Gruntwork.io GitHub App requests the following permissions:
- **Read access to Actions**: Allows the app to read GitHub Actions artifacts.
- **Write access to Administration**: Allows the app to create new repositories, and add teams as collaborators to repositories.
- **Write access to Contents**: Allows the app to read and write repository contents.
- **Write access to Issues**: Allows the app to create and edit issues.
- **Write access to Pull Requests**: Allows the app to create and edit pull requests.
- **Write access to Workflows**: Allows the app to create and edit GitHub Actions workflow files.

<details>
  <summary>Why does Gruntwork.io need these permissions?</summary>

  Gruntwork.io requests all of these permissions because it requires them for different operations. Unfortunately, the way GitHub apps work prevents us from requesting permissions on a more granular basis. Know that the GitHub App Service will scope down its permissions whenever possible to the minimum required for the operation at hand.

  The level of granularity available to customers when configuring the GitHub App installation is to either install the app on a per-repository basis or on an entire organization. Our recommendation is to install the app on the organization as a whole, as this will allow Gruntwork.io to do all it's meant to do. You should use your best judgement when deciding on this, however. If you are unsure, reach out to Gruntwork Support for guidance.

  <h3>Read access to Actions</h3>

  Gruntwork.io needs read access to `Actions` in order to read GitHub Actions workflow logs.

  These permissions are used when generating the dynamic Pull Request comment created when a run completes indicating the exact location in workflow run logs users need to focus their attention.

  <h3>Write access to Administration</h3>

  Gruntwork.io needs write access to `Administration` to create repositories.

  These permissions are used during the initial bootstrapping process when customers opt-in to additional repositories being created outside of the main `infrastructure-live-root` repository.

  This is especially important for DevOps Foundations Enterprise customers, as those customers benefit from the ability to have `infrastructure-live-root` repositories create new repositories and add designated GitHub teams as collaborators via Infrastructure as Code (IaC). This is a critical feature for Enterprise customers who want to be able to scale their infrastructure management across multiple teams with delegated responsibility for segments of their IaC Estate.

  <h3>Write access to Contents</h3>

  Gruntwork.io needs write access to `Contents` in order to propose changes to repository contents.

  Pipelines engages in code generation when vending new AWS accounts in Gruntwork Account Factory, and Gruntwork.io needs to be able to generate and commit Terragrunt configuration files to the repository to provision the resources that will be present in the new account.

  <h3>Write access to Issues</h3>

  Gruntwork.io needs write access to `Issues` in order to create issues for users when it detects a problem with infrastructure.

  This is a mechanism that Pipelines uses to signal to users that they need to take manual action to resolve an issue.

  <h3>Write access to Pull Requests</h3>

  Gruntwork.io needs write access to `Pull Requests` in order to create pull requests.

  This is done both to propose changes in response to an explicit workflow like initiating an Account Factory vend, and to propose changes in response to detected drift detection for Enterprise customers.

  <h3>Write access to Workflows</h3>

  Gruntwork.io needs write access to `Workflows` in order to create GitHub Actions workflow files when vending GitHub repositories.

  This is necessary for Enterprise account vending, as Enterprise customers have the option of vending new repositories as part of Gruntwork Account Factory vending, and the GitHub API would not allow creation of new repositories with `.github/workflows` files without these permissions.

  <h3>Write access to Members</h3>

  Gruntwork.io needs write access to `Members` in order to adjust the repositories that a given GitHub team has access to.

  When vending delegated repositories for Enterprise customers, Gruntwork.io needs to be able to add designated GitHub teams as a collaborators to new repositories being vended.

</details>

### Clients

The GitHub App Service is used by two major clients:

1. **Gruntwork Developer Portal**

   This is the entrypoint all Gruntwork customers use to interact Gruntwork products.

   The GitHub App Service is used here for administration of access to relevant GitHub resources by the Gruntwork.io GitHub App. Customers can follow the installation flow in the [Gruntwork Developer Portal](https://app.gruntwork.io) to install the Gruntwork.io GitHub App in their GitHub organization, link the GitHub app installation to their Gruntwork organization profile and configure it.

2. **Gruntwork Pipelines**

   The main client for the Gruntwork.io App, and where most of the value is derived. Pipelines uses the GitHub App Service to acquire the relevant access for interacting with GitHub resources on behalf of the user. Access control rules are enforced here to ensure that only the level of access required, and explicitly specified in the Gruntwork Developer Portal can be used by Pipelines to interact with GitHub resources on behalf of the user.

   For example, while the Gruntwork.io GitHub App does have permissions to create new repositories, Pipelines will only do so if a workflow originating from a configured `infrastructure-live-root` repository requests it.

## Availability

The availability of the Gruntwork.io GitHub App is something Gruntwork will endeavor to maximize. Core to the design of the app is that day-to-day operations do not depend on the availability of the app, however.

Any downtime of Gruntwork services will not impact the ability of your team to manage infrastructure using Gruntwork products.

#### App Only Features

The following features of the Gruntwork.io GitHub App will be unavailable during downtime:

- **GitHub App Linking**: In order to link a Gruntwork.io GitHub App installation to the [Gruntwork Developer Portal](https://app.gruntwork.io), the service backing the GitHub app must be available and operating correctly.
- **Gruntwork Pipelines Comments**: While Pipelines will allow for IaC updates in a degraded state without the availability of the GitHub App, comments are a feature that rely on the availability of the app for the best experience.
- **Gruntwork Pipelines Drift Detection**: Drift detection requires the availability of the GitHub App to function correctly.

#### Fallback

In order to ensure that the availability of the Gruntwork.io GitHub App is not something that can impair the ability of users to drive infrastructure updates, the legacy mechanism of authenticating with GitHub using [Machine users](./viamachineusers.md) is still supported.

Configuring the `PIPELINES_READ_TOKEN`, `INFRA_ROOT_WRITE_TOKEN` and `ORG_REPO_ADMIN_TOKEN` where necessary (following the documentation linked above) will result in Pipelines using the legacy mechanism to authenticate with GitHub, rather than the Gruntwork.io GitHub App.

Using these fallback tokens will ensure that Pipelines can continue to perform operations like:

- Plan on Pull Request open.
- Apply on Pull Request merge.
- Destroy on Pull Request merge.

Note that this will be a degraded experience, as the Gruntwork.io GitHub App provides a more feature-rich experience.

## Initial Install

To install the Gruntwork.io GitHub App in your organization follow these steps.

1. Follow the instructions in the [Gruntwork Developer Portal's Account Settings](https://app.gruntwork.io/account?scroll_to=github-app) **if you are a designated administrator**.

1. Choose the GitHub Organization you want to install the App in.

    ![Choose GitHub Organization](/img/devops-foundations/github-app/choose-organization.png)

1. Install in the GitHub Organization.

    ![Install in GitHub Organization](/img/devops-foundations/github-app/install-in-organization.png)

1. You will be redirected back to your Gruntwork Developer Portal's Account page. If the App was installed and linked with your Organization in the Developer Portal, you will get a success message like below.

    ![GitHub App installed and linked](/img/devops-foundations/github-app/app-installed-and-linked.png)

## Configuration

<h3>Infrastructure Live Root Repositories</h3>

DevOps Foundations treats certain repositories as especially privileged in order to perform critical operations like vending new AWS accounts and creating new repositories. These repositories are called "infrastructure live root repositories" and you can configure them in the [GitHub Account section](https://app.gruntwork.io/account?scroll_to=github-app) for your organization in the Gruntwork developer portal **if you are a designated administrator**.

![Root Repository Configuration](/img/devops-foundations/github-app/root-repo-config.png)

The Gruntwork.io GitHub App will cross reference this list when attempting to perform these privileged operations. If the repository is not listed here, the Gruntwork.io GitHub App will not be able to perform these operations on your behalf.

Keeping this list up to date is critical to ensure the Gruntwork.io GitHub App can perform its duties in and only in the repositories you trust as the "root" of your infrastructure management.

For more information, see the [relevant architecture documentation](/2.0/docs/pipelines/architecture/#infrastructure-live-root).

## Frequently Asked Questions

#### How do I find my Gruntwork.io GitHub App installation ID?

You can find the installation ID of the Gruntwork.io GitHub App in the URL of the installation page.

![GitHub App Installation ID](/img/devops-foundations/github-app/get-installation-id.png)
