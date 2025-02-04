# Running Plan/Apply with Pipelines

Pipelines automatically detects infrastructure changes in your committed IaC and runs Terragrunt Plan or Apply actions on your units. Infrastructure changes in pull request commits targeting [Deploy Branch](/2.0/reference/pipelines/configurations-as-code/api#deploy_branch_name) (e.g., `main` or `master`) will trigger Terragrunt **Plan**. Changes in commits directly on the [Deploy Branch](/2.0/reference/pipelines/configurations-as-code/api#deploy_branch_name) will trigger Terragrunt **Apply**.

The preferred workflow when working with Pipelines involves creating a new Pull Request with the desired changes, then reviewing the Terragrunt Plan output to ensure the infrastructure changes align with expectations. It is advisable to enforce [Branch Protection](/2.0/docs/pipelines/installation/branch-protection/#recommended-settings), particularly the [Require branches to be up to date](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches#require-status-checks-before-merging) status check. This ensures the PR cannot be merged if the Plan is outdated.

## Running plan

To trigger a **Plan**, create an infrastructure change, such as adding or modifying a `terragrunt.hcl` unit, on a new branch. Then, open a new Pull Request to merge this branch into your Deploy Branch. After merging, Pipelines will comment on the pull request with the Apply output.

![Screenshot of Plan Comment](/img/pipelines/guides/plan-comment.png)

## Running apply

To initiate an **Apply**, merge your changes into the Deploy Branch. Any commits, including merge commits on the Deploy Branch, will trigger an Apply if infrastructure changes are detected.

Pipelines will add a comment to the merged Pull Request containing the Apply output.

## Skipping Pipelines plan/apply

In certain scenarios, it may be necessary to skip Pipelines for specific commits. To do this, include one of the [workflow skip messages](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/skipping-workflow-runs), such as `[no ci]`, in the commit message.

Alternatively, adjust the `paths-ignore` filter in `.github/workflows/pipelines.yml` to prevent specific directories from triggering Pipelines.

For example, to exclude a directory named `local-testing`, update the workflow configuration as follows:

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
## Destroying infrastructure

To destroy infrastructure, create a commit that removes the relevant Terragrunt unit. Pipelines will detect the deletion and trigger Terragrunt to execute a `plan -destroy` on Pull Requests or a `destroy` on the Deploy Branch. Pipelines automatically retrieves the previous committed version of the infrastructure, enabling Terragrunt to run in the directory that has been deleted.

