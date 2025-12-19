# Pipelines Installation Overview

Pipelines integrates multiple technologies to deliver a comprehensive CI/CD solution. This guide outlines the available installation methods and their respective use cases.

## Installation as part of Account Factory

Customers using Account Factory benefit from a guided setup process that includes the complete installation of Gruntwork Pipelines. This process is facilitated by a Gruntwork solutions engineer and includes the following steps:

1. Creating a new `infrastructure-live-root` repository from the [`infrastructure-live-root-template`](https://github.com/gruntwork-io/infrastructure-live-root-template) template.
2. (On GitHub) Installing the [Gruntwork.io GitHub App](https://github.com/apps/gruntwork-io) on the `infrastructure-live-root` repository or across the entire organization. For detailed instructions, refer to [this guide](/docs/terragrunt-scale/pipelines/installation/viagithubapp).
3. Running the `Infrastructure Live Root Bootstrap` workflow to customize the generated repository for infrastructure deployment.

Completing these steps results in a repository fully configured for automated infrastructure deployments using GitOps workflows.

## Standalone Installation

For users not leveraging Account Factory or needing Gruntwork Pipelines for a standalone repository with existing Terragrunt configurations, Gruntwork Pipelines can be installed as an independent GitHub Actions Workflow or GitLab CI Pipeline.

To learn more about this process, consult the documentation for [Adding Pipelines to a New Repository](/docs/terragrunt-scale/pipelines/installation/addingnewrepo) or [Adding Pipelines to an Existing Repository](/docs/terragrunt-scale/pipelines/installation/addingexistingrepo).

## Platform differences

Gruntwork Pipelines supports both GitHub Actions and GitLab CI/CD. The installation process differs depending on your platform choice:

### GitHub Actions

For GitHub Actions, you have two authentication options:

1. [GitHub App Authentication](/docs/terragrunt-scale/pipelines/installation/viagithubapp) (Recommended)
2. [Machine User Authentication](/docs/terragrunt-scale/pipelines/installation/viamachineusers)

### GitLab CI/CD

For GitLab CI/CD:

1. [Machine User Authentication](/docs/terragrunt-scale/pipelines/installation/viamachineusers) is the only supported method
2. Contact [Gruntwork support](/docs/support) to authorize your GitLab groups
