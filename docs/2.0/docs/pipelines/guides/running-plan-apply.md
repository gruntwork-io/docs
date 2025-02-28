# Running Plan/Apply with Pipelines

Pipelines automatically detects infrastructure changes in your committed IaC and runs Terragrunt Plan or Apply actions on your units. Infrastructure changes in pull/merge request commits targeting [Deploy Branch](/2.0/reference/pipelines/configurations-as-code/api#deploy_branch_name) (e.g., `main` or `master`) will trigger Terragrunt **Plan**. Changes in commits directly on the [Deploy Branch](/2.0/reference/pipelines/configurations-as-code/api#deploy_branch_name) will trigger Terragrunt **Apply**.

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

<Tabs>
<TabItem value="github" label="GitHub" default>

The preferred workflow when working with Pipelines involves creating a new Pull Request with the desired changes, then reviewing the Terragrunt Plan output to ensure the infrastructure changes align with expectations. It is advisable to enforce [Branch Protection](/2.0/docs/pipelines/installation/branch-protection/#recommended-settings), particularly the [Require branches to be up to date](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches#require-status-checks-before-merging) status check. This ensures the PR cannot be merged if the Plan is outdated.

</TabItem>
<TabItem value="gitlab" label="GitLab">

The preferred workflow when working with Pipelines involves creating a new Merge Request with the desired changes, then reviewing the Terragrunt Plan output to ensure the infrastructure changes align with expectations. It is advisable to enforce [Protected Branches](https://docs.gitlab.com/ee/user/project/protected_branches.html), particularly the [Pipeline must succeed](https://docs.gitlab.com/user/project/merge_requests/status_checks/#view-the-status-checks-on-a-project) requirement. This ensures the MR cannot be merged if the Plan is outdated or fails.

</TabItem>
</Tabs>

## Running plan

To trigger a **Plan**, create an infrastructure change, such as adding or modifying a `terragrunt.hcl` unit, on a new branch. Then, open a new Merge/Pull Request to merge this branch into your Deploy Branch. After merging, Pipelines will comment on the pull request with the Apply output.

![Screenshot of Plan Comment](/img/pipelines/guides/plan-comment.png)

## Running apply

To initiate an **Apply**, merge your changes into the Deploy Branch. Any commits, including merge commits on the Deploy Branch, will trigger an Apply if infrastructure changes are detected.

Pipelines will add a comment to the merged Merge/Pull Request containing the apply output.

## Skipping Pipelines plan/apply

<Tabs>
<TabItem value="github" label="GitHub" default>

In certain scenarios, it may be necessary to skip Pipelines for specific commits. To do this, include one of the [workflow skip messages](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/skipping-workflow-runs), such as `[no ci]`, in the commit message.

Alternatively, adjust the `paths-ignore` filter in `.github/workflows/pipelines.yml` to prevent specific directories from triggering Pipelines.

For example, to exclude a directory named `local-testing`, update the workflow configuration as follows:

```yaml title=".github/workflows/pipelines.yml"
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

</TabItem>
<TabItem value="gitlab" label="GitLab">

In certain scenarios, it may be necessary to skip Pipelines for specific commits. To do this, include `[skip ci]` or `[ci skip]` in the commit message.

Alternatively, adjust the `workflow:rules` in your `.gitlab-ci.yml` to prevent specific directories from triggering Pipelines.

For example, to exclude a directory named `local-testing`, update the pipeline configuration as follows:

```yaml title=".gitlab-ci.yml"
workflow:
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
      changes:
        - "**/*"
        - "!local-testing/**/*"
      when: always
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'
      changes:
        - "**/*"
        - "!local-testing/**/*"
      when: always
```

</TabItem>
</Tabs>

## Destroying infrastructure

To destroy infrastructure, create a commit that removes the relevant Terragrunt unit. Pipelines will detect the deletion and trigger Terragrunt to execute a `plan -destroy` on pull/merge requests or a `destroy` on the Deploy Branch. Pipelines automatically retrieves the previous committed version of the infrastructure, enabling Terragrunt to run in the directory that has been deleted.
