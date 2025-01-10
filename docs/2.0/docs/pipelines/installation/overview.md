# Pipelines Installation Overview

Pipelines integrates multiple technologies to deliver a comprehensive CI/CD solution. This guide outlines the available installation methods and their respective use cases.

## Installation as part of DevOps Foundations

Customers using DevOps Foundations benefit from a guided setup process that includes the complete installation of Gruntwork Pipelines. This process is facilitated by a Gruntwork solutions engineer and includes the following steps:

1. Creating a new `infrastructure-live-root` repository from the [`infrastructure-live-root-template`](https://github.com/gruntwork-io/infrastructure-live-root-template) template.
2. Installing the [Gruntwork.io GitHub App](https://github.com/apps/gruntwork-io) on the `infrastructure-live-root` repository or across the entire organization. For detailed instructions, refer to [this guide](/2.0/docs/pipelines/installation/viagithubapp).
3. Running the `Infrastructure Live Root Bootstrap` workflow to customize the generated repository for infrastructure deployment.

By completing these steps, you will have a GitHub repository configured to deploy infrastructure changes in a GitOps fashion, requiring no additional manual intervention.

## Installation via manual setup

For users not leveraging DevOps Foundations or needing Gruntwork Pipelines for a standalone repository with existing Terragrunt configurations, Gruntwork Pipelines can be installed as an independent GitHub Actions workflow.

To learn more about this process, consult the documentation for [Adding Pipelines to an Existing Repository](/2.0/docs/pipelines/installation/addingexistingrepo).

