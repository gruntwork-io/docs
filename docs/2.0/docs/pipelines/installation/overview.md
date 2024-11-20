# Pipelines Installation Overview

Given that Pipelines is a collection of multiple different technologies working in concert to deliver a comprehensive CI/CD solution, there are a number of different ways to achieve installation of Pipelines.

This will cover the different ways to install Pipelines, and how they can be used to achieve different goals.

## Installation as part of DevOps Foundations

Customers that have setup DevOps Foundations have a white glove setup process that automatically results in the full installation of Pipelines as a side effect of the setup process.

A Gruntwork solutions engineer will walk you through the process of:

1. Creating a new `infrastructure-live-root` repository from the [`infrastructure-live-root-template`](https://github.com/gruntwork-io/infrastructure-live-root-template) template.
2. Installation of the [Gruntwork.io GitHub App](https://github.com/apps/gruntwork-io) on the `infrastructure-live-root` repository, or on the organization as a whole. For more information on this, click [here](/2.0/docs/pipelines/installation/viagithubapp).
3. Running the associated `Infrastructure Live Root Bootstrap` workflow to customize the generated repository so that it can be used to deploy infrastructure.

The outcome of following these steps is that you will have a GitHub repository that will deploy infrastructure changes in a GitOps manner without any further manual intervention.

## Installation via manual setup

If you are not using DevOps Foundations, or need Pipelines for a standalone repository that already has Terragrunt configurations, you can still install Pipelines directly as a standalone GitHub Actions workflow.

To learn how to do this, navigate to the dedicated documentation for [Adding Pipelines to an Existing Repository](/2.0/docs/pipelines/installation/addingexistingrepo).

