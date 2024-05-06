# Upgrading from `infrastructure-pipelines`

This migration guide is intended for those running the previous version of Gruntwork Pipelines, referred to as `infrastructure-pipelines`, who want to upgrade to the latest version of Gruntwork Pipelines. We will refer to the latest version of Gruntwork Pipelines simply as "Pipelines" in the rest of this document.

## What's New

To get an idea of what makes the most recent version of Pipelines different from the previous version, we recommend reading the [deprecation notice](../../infrastructure-pipelines/overview/deprecation.md). This notice provides a high-level overview of the changes and improvements made in the latest version of Pipelines.

## Prerequisites

Before you begin the migration process, ensure that you have the following prerequisites in place:

- [mise](https://mise.jdx.dev/) installed.

## Step 1: Setup your `.mise.toml`

In order to synchronize the versions of tools that you use locally with the versions of tools that Pipelines uses, Pipelines now leverages the open source tool, [mise](https://mise.jdx.dev/). Mise allows you to specify the versions of tools you use in a `.mise.toml` file, which Pipelines will use to ensure that the versions of tools you use locally match the versions of tools that Pipelines uses.

To get started, create a `.mise.toml` file in the root of your repository with the following contents:

```toml
[tools]
opentofu = "1.7.0"
terragrunt = "0.58.1"
```

:::info
If you have not made the switch over to OpenTofu yet, you can simply set your current version of Terraform in the `.mise.toml` file.
:::

Run the following in order to install the dependencies locally:

```bash
mise install
```

You and your colleagues will now be using this file to synchronize the versions of tools you use locally, and the versions of tools that Pipelines uses.

## Step 2: Update your Pipelines Configuration
