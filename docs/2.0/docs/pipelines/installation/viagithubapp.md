# Pipelines Install via GitHub App
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

### Infrastructure Live Root Repositories

DevOps Foundations treats certain repositories as especially privileged in order to perform critical operations like vending new AWS accounts and creating new repositories. These repositories are called "infrastructure live root repositories" and you can configure them in the [GitHub Account section](https://app.gruntwork.io/account?scroll_to=github-app) for your organization in the Gruntwork developer portal **if you are a designated administrator**.

![Root Repository Configuration](/img/devops-foundations/github-app/root-repo-config.png)

The Gruntwork.io GitHub App will cross reference this list when attempting to perform these privileged operations. If the repository is not listed here, the Gruntwork.io GitHub App will not be able to perform these operations on your behalf.

Keeping this list up to date is critical to ensure the Gruntwork.io GitHub App can perform its duties in and only in the repositories you trust as the "root" of your infrastructure management.

For more information, see the [relevant architecture documentation](../iac-foundations/architecture.md#infrastructure-live-root).
