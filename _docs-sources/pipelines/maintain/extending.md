# Extending Your Pipeline

:::info Recent Upgrade
This documentation relates to the latest version of Gruntwork Pipelines released in May 2024.

If you are using the older version of Gruntwork Pipelines that includes the `infrastructure-pipelines` repository, click [here](../../infrastructure-pipelines/overview/deprecation.md) to learn more about the deprecation of that version.
:::

Gruntwork Pipelines is designed to be extensible. This means that you can add your own customizations to the GitHub Actions Workflows, and the underlying custom GitHub Actions to suit your organization's needs. This document will guide you through the process of extending your pipeline.

## Extend the GitHub Actions Workflow

The GitHub Actions Workflow that Pipelines uses is a public [Reusable Workflow](https://docs.github.com/en/actions/using-workflows/reusing-workflows). This allows your `infrastructure-live` repositories to reference a specific pinned version of it in your `.github/workflows/pipelines.yml` file without having to host any of the code yourself.

If you would like to extend this workflow to introduce custom logic that is specific to your organization, you can [fork the repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo).

Common reasons that you might decide to do this include:

- You wish to add additional steps to the workflow that are specific to your organization.
- You wish to utilize a forked action used in an existing steps in the workflow to suit your organization's needs (more on that below).

:::caution
This will result in a public fork of Gruntwork's `pipelines-workflows` in your GitHub organization. If you have concerns about this, you will need to create a manual private fork of the repository. Reach out to <support@gruntwork.io> if you need assistance with this.

Do not include any sensitive information in your forked repository, especially if hosted publicly.
:::

## Extending the GitHub Actions

In addition to extending the top-level workflow, you can also extend the underlying custom GitHub Actions that the workflow uses. This allows you to customize the behavior of individual Actions to suit your organization's needs.

:::note
In order to customize the behavior of an Action, you will need to fork the repository that contains the Action, which might be another GitHub Action, or a Workflow.
:::

## How to Extend the Pipelines Workflow

As of right now, we have yet to have customers who have had a need to extend the Pipelines Workflow to suit their organization's needs.

We, at Gruntwork, want to make sure we're addressing real business use-cases with our documentation, so if you have a need to extend the Pipelines Workflow and are not comfortable with doing so following the documentation above, please reach out to us at <support@gruntwork.io>.

If you are comfortable with us sharing your story, we would like to document your experience here so that other customers can have a real life use-case to refer to.
