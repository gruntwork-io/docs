# Running Plan/Apply with Pipelines

Pipelines automatically detects infrastructure changes in your committed IaC and runs Terragrunt Plan or Apply actions on your units. Infrastructure changes in pull/merge request commits targeting [Deploy Branch](/2.0/reference/pipelines/configurations-as-code/api#deploy_branch_name) (e.g., `main` or `master`) will trigger Terragrunt **Plan**. Changes in commits directly on the [Deploy Branch](/2.0/reference/pipelines/configurations-as-code/api#deploy_branch_name) will trigger Terragrunt **Apply**.

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

<Tabs groupId="platform">
<TabItem value="github" label="GitHub" default>

The preferred workflow when working with Pipelines involves creating a new Pull Request with the desired changes, then reviewing the Terragrunt Plan output to ensure the infrastructure changes align with expectations. It is advisable to enforce [Branch Protection](/2.0/docs/pipelines/installation/branch-protection/#recommended-settings), particularly the [Require branches to be up to date](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches#require-status-checks-before-merging) status check. This ensures the PR cannot be merged if the Plan is outdated.

</TabItem>
<TabItem value="gitlab" label="GitLab">

The preferred workflow when working with Pipelines involves creating a new Merge Request with the desired changes, then reviewing the Terragrunt Plan output to ensure the infrastructure changes align with expectations. It is advisable to enforce [Protected Branches](https://docs.gitlab.com/ee/user/project/protected_branches.html), particularly the [Pipeline must succeed](https://docs.gitlab.com/user/project/merge_requests/status_checks/#view-the-status-checks-on-a-project) requirement. This ensures the MR cannot be merged if the Plan is outdated or fails.

</TabItem>
</Tabs>

## Running plan

To trigger a **Plan**, create an infrastructure change, such as adding or modifying a `terragrunt.hcl` unit, on a new branch. Then, open a new merge request/pull request to merge this branch into your Deploy Branch. After merging, Pipelines will comment on the pull request with the Apply output.

![Screenshot of Plan Comment](/img/pipelines/guides/plan-comment.png)

## Running apply

To initiate an **Apply**, merge your changes into the Deploy Branch. Any commits, including merge commits on the Deploy Branch, will trigger an Apply if infrastructure changes are detected.

Pipelines will add a comment to the merged merge request/pull request containing the apply output.

If you would rather have Pipelines run only plans on pull/merge requests and have Apply handled elsewhere, see [Running in plan-only mode](#running-in-plan-only-mode).

## Running in plan-only mode

Some teams want Pipelines to comment plans on pull/merge requests but **not** run Apply when those PRs/MRs merge. Common reasons:

- You are migrating onto Pipelines from an existing Apply workflow and want to adopt plan first, switching Apply over later.
- You want to review infrastructure changes through the Pipelines comment UX before you are ready to provision real cloud resources.

Plan-only mode can be configured at two granularities: across the entire repository, or on individual Terragrunt units.

### Disabling apply for the entire repository

<Tabs groupId="platform">
<TabItem value="github" label="GitHub" default>

To disable Apply repository-wide, remove the `push:` trigger block from `.github/workflows/pipelines.yml`. Plans continue to run on pull requests because the `pull_request:` trigger is unaffected; merges to the Deploy Branch no longer start a workflow, so no Apply runs.

Before:

```yaml title=".github/workflows/pipelines.yml"
name: Pipelines
on:
  push:
    branches:
      - main
  pull_request:
    types:
      - opened
      - synchronize
      - reopened
```

After (the `push:` block is removed):

```yaml title=".github/workflows/pipelines.yml"
name: Pipelines
on:
  pull_request:
    types:
      - opened
      - synchronize
      - reopened
```

:::note
When you are ready to let Pipelines run Apply, restore the `push:` block (using the same `branches` and `paths-ignore` values you had before).
:::

</TabItem>
<TabItem value="gitlab" label="GitLab">

To disable Apply repository-wide, remove the `$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH` rule from the `workflow.rules` block in `.gitlab-ci.yml`. Plans continue to run on merge requests because the `$CI_PIPELINE_SOURCE == "merge_request_event"` rule is unaffected; commits on the default branch no longer match any rule, so no pipeline (and no Apply) runs.

Before:

```yaml title=".gitlab-ci.yml"
workflow:
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
      when: always
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'
      when: always
```

After (the default-branch rule is removed):

```yaml title=".gitlab-ci.yml"
workflow:
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
      when: always
```

:::note
When you are ready to let Pipelines run Apply, restore the `$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH` rule.
:::

</TabItem>
</Tabs>

### Disabling apply for individual units

To run Plan for a unit but skip Apply for that same unit, add a Terragrunt [`exclude` block](https://terragrunt.gruntwork.io/docs/reference/config-blocks-and-attributes/#exclude) to the unit's `terragrunt.hcl`:

```hcl title="terragrunt.hcl"
exclude {
  if      = true
  no_run  = true
  actions = ["apply"]
}
```

All three fields are required for this to behave as plan-only:

- **`if = true`** -- the exclude condition is unconditionally true. You can substitute a dynamic expression here if you want the exclusion to depend on the environment, branch, or any other Terragrunt-visible input.
- **`actions = ["apply"]`** -- restricts the exclusion to the `apply` action only, so `plan` still runs normally on this unit.
- **`no_run = true`** -- causes Terragrunt to skip execution of the matched action.

#### Dependency considerations

When excluding Apply for a unit, be aware of how Terragrunt handles its dependency graph:

1. If unit B depends on unit A and Apply is excluded for unit A, an Apply of unit B will use unit A's last-known outputs rather than re-applying it. Make sure those outputs reflect the state you expect.
2. Use `terragrunt dag graph` to visualize your dependency tree before excluding units.

### Re-enabling apply

To turn Apply back on:

- **Repository-wide:** restore the `push:` block in `.github/workflows/pipelines.yml` (GitHub) or the `$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH` rule in `.gitlab-ci.yml` (GitLab).
- **Per unit:** delete the `exclude` block from the unit's `terragrunt.hcl`.

## Skipping Pipelines plan/apply

<Tabs groupId="platform">
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
