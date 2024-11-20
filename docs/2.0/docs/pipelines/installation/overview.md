# Pipelines Installation Overview

Given that Pipelines is multiple different technologies working in concert to deliver a comprehensive CI/CD solution, there are a number of different ways to achieve installation of Pipelines.

This will cover the different ways to install Pipelines, and how they can be used to achieve different goals.

## Installation as part of DevOps Foundations

Customers that have setup DevOps Foundations have a white glove setup process that automatically results in the full installation of Pipelines as a side effect of the setup process.

A Gruntwork solutions engineer will walk you through the process of:

1. Creating a new `infrastructure-live-root` repository from the [`infrastructure-live-root-template`](https://github.com/gruntwork-io/infrastructure-live-root-template) template.
2. Installation of the [Gruntwork.io GitHub App](https://github.com/apps/gruntwork-io) on the `infrastructure-live-root` repository, or on the organization as a whole. For more information on this, click [here](/docs/pipelines/installation/viagithubapp).
3. Running the associated `Infrastructure Live Root Bootstrap` workflow to customize the generated repository so that it can be used to deploy infrastructure.

The outcome of following these steps is that you will have a GitHub repository that will continuously deploy infrastructure changes in a GitOps manner without any further manual intervention.

## Installation via manual setup

If you are not using DevOps Foundations, or need Pipelines for a standalone repository that already has Terragrunt configurations, you can still install Pipelines directly as a standalone GitHub Actions workflow.

To learn how to do this, navigate to the dedicated documentation for [Adding Pipelines to an Existing Repository](/2.0/docs/pipelines/installation/addingexistingrepo).

## Local Installation

Most customers have no need to install Pipelines locally. The product has been designed to be installed in CI/CD workflows, and has a lot of functionality that is only relevant in that context.

As a Gruntwork customer, however, you do have the ability to install Pipelines locally if you wish. This can be useful for troubleshooting unexpected behavior in your CI/CD workflows, or for validating your understanding of Pipelines behavior with shorter feedback loops.

To install Pipelines locally, navigate to the [latest GitHub release on the `pipelines-cli` repository](https://github.com/gruntwork-io/pipelines-cli/releases/latest) and download the appropriate binary for your operating system.

For example, to install Pipelines on an M series Mac (take note of that, as the binary is released in ARM and x86 variants for every major operating system) using the [GitHub CLI](https://cli.github.com/), you could do the following:

```bash
gh release download -R gruntwork-io/pipelines-cli -p 'pipelines_darwin_amd64'
```

:::tip
To see the full list of available assets, you can also run the following:

```bash
gh release view -R gruntwork-io/pipelines-cli --json assets -q '.assets[].name'
```
:::

Once you have downloaded the binary, you can install it by moving it to a directory in your `PATH`:

```bash
mv pipelines_darwin_amd64 /usr/local/bin/pipelines
chmod +x /usr/local/bin/pipelines
```

Follow the guidance in the [README.md](https://github.com/gruntwork-io/pipelines-cli) for more information on how to use the `pipelines` CLI locally.

