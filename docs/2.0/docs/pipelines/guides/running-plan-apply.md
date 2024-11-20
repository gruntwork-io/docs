# Running Plan/Apply with Pipelines

When changes are made to your committed IaC, Pipelines detects these infrastructure changes and runs Terragrunt Plan/Apply on your units. Changes that occur in commits that are included in Pull Requests targetting your [Deploy Branch](/2.0/reference/pipelines/configurations-as-code/api#deploy_branch_name) (e.g. `main` or `master`) will trigger Terragrunt **Plan**. Changes in commits _on_ your [Deploy Branch](/2.0/reference/pipelines/configurations-as-code/api#deploy_branch_name) will trigger a Terragrunt **Apply**.

The recommended workflow when working with Pipelines is to create a new Pull Request with the desired changes, then review the output of Terragrunt Plan to confirm that the resulting infrastructure changes are expected. We recommend enforcing [Branch Protection](/2.0/docs/pipelines/installation/branch-protection/#recommended-settings) and especially the [Require branches to be up to date](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches#require-status-checks-before-merging) status check on your repository as this will restrict the PR from being merged if the Plan may be out of date.

## Running Plan

To trigger a **Plan**, create an infrastructure change such as adding or modify a `terragrunt.hcl` unit on a new branch, then open a new Pull Request to merge this branch into your Deploy Branch. Once the Pull Request is open Pipelines will add a comment to the PR including the output of the Plan.

![Screenshot of Plan Comment](/img/pipelines/guides/plan-comment.png)

## Running Apply

To run an **Apply**, merge your changes into the Deploy Branch. All commits including Merge commits on the Deploy Branch will trigger an apply if infrastructure changes are detected.

Pipelines will add a comment to the (merged) Pull Request with the output of the Apply.

## Skipping Pipelines Plan/Apply

You may occasionally need to skip Pipelines on particular commits. This can be done by adding one of the [workflow skip messages](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/skipping-workflow-runs) such as `[no ci]` into your commit message.

You can also modify the `paths-ignore` filter in `.github/workflows/pipelines.yml` within your repository to exclude an entire directory from triggering Pipelines.

For example, to exclude a directory with the name `local-testing` you would modify the workflow
```hcl title=".github/workflows/pipelines.yml"
on:
  push:
    branches:
      - main
    paths-ignore:
      # Workflow does not run only if ALL filepaths match the pattern. See https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#example-excluding-paths
      - ".github/**"
      - "local-testing/**"
  pull_request:
    types:
      - opened
      - synchronize
      - reopened
    paths-ignore:
      - "local-testing/**"
```
