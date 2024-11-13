# Using Patcher Promotion Workflows
:::info

As of this writing in July 2024 Gruntwork only officially supports Patcher Promotion Workflows using GitHub Actions. Other CI systems will come in future releases.

:::

# Introduction

Before you promote an infrastructure change to production its natural to want to validate that change in a lower environment. We call this general process of moving changes between environments a promotion workflow.

Patcher was built with promotion workflows in mind, and this document aims to outline how to integrate that flow with GitHub Actions. Specifically, Patcher is able to detect an infrastructure change and then facilitate incorporating that change across environments (e.g. dev, stage, prod). The idea is to create a series of pull requests for your code that each include the relevant changes for a particular environment which can then be reviewed and tested. Once approved the act of merging a given pull request with "dispatch" a patcher workflow which will generate an analogous pull request on the next environment in the chain. This continues until the end of the chain at which point the final pull request is merged and no further dispatching occurs.

Patcher was built specifically for infrastructure as code and has a first-class understanding of versioning in Terraform/OpenTofu/Terragrunt. As a result, even if your infrastructure has differences between environments, Patcher is still able to identify out of date modules and apply updates in a sane way through a promotion workflow.

(Coming soon a sequence diagram here demonstrating the promotion workflow process)

:::info
This document outlines setting up a Patcher promotion workflow using the [environment-only](/2.0/docs/patcher/concepts/grouping#environment-only-consolidation) update grouping strategy. The GitHub Actions code herein could be tweaked to achieve the other strategies.
:::

# Patcher Promotion Workflow Architecture

## Environments

Patcher allows teams to define environments as a grouping of folders using glob patterns. Patcher commands (on the CLI and in GitHub Actions) accept commands to match those folders, such as the argument to `patcher-action` -- `include_dirs: "{*prod*}/**"` which would match all folders with "prod" in the name. A given environment can include 1 or many (without limit) folders. Patcher will scan the entire group of folders at once for potential updates and changes.

There is no limit on how many environments you can have, or other limit on the naming structure for those environments.

In the future it is planned to model environments using a configuration based system (to be shared with Gruntwork Pipelines) which will allow for even more flexibility in your folder structure.

## Dependencies

A `dependency` in Patcher workflows is a reference to code that is versioned and in use by your codebase, generally a Terraform or Tofu module that exists in a git repo using a specific git tag for versioning. For example, if you are using `gruntwork-io/terraform-aws-messaging.git//modules/sqs?ref=v0.8.0` as a terraform source module, then your dependency would be `gruntwork-io/terraform-aws-messaging/sqs`.

Patcher generally models promotion workflows around the idea of grouping changes together per-dependency. Patcher would then identify all usages of `gruntwork-io/terraform-aws-messaging/sqs` within a given environment and create a single pull request to update to the next appropriate version.

# Prerequisites

## Infrastructure As Code
In order to leverage Patcher Promotion Workflows your codebase must be using infrastructure specified as code using Terraform, OpenTofu and/or Terragrunt.

## Environments as Folder Structures

In order to support multiple environments (such as dev, stage and prod) your code must represent those environments with a consistent folder structure that can be grouped via glob pattern matching, e.g.:
```sh
ls
dev-account1  dev-account2  prod-account1  prod-account2  stage-account1  stage-account2
```

Then you would define your dev environments as `dev-*`, stage as `stage-*` and prod as `prod-*` and so fourth.


# Implementation & Setup Example

The Patcher Promotion Workflow process consists of a series of GitHub Actions workflow files.  Each environment is modeled as an individual workflow.  The process begins with the lowest stage (usually something like `dev`) which scans the entire `dev` environment for all dependencies which may require updates.  It will then generate one pull request per dependency that updates that dependency exclusively in the `dev` environment.  As each of those pull requests is approved and merged, they then general new pull requests for the subsequent stage (triggered via `repository dispatch` events).  This process continues until the last stage at which point no further PRs are opened and all stages have been updated.

The easiest way to get started is likely by copying and tweaking the example files below.  For the purposes of this example we'll set up a promotion workflow that promotes through `dev`, `stage` and finally `prod`, though of course feel free to tweak these to match the environment patterns you use.

## Setting up the initial dev promotion step

The initial GitHub Actions Workflow file, which for this example lets call `update-dev.yml`, contains several key points:

* We set up the job to run on a schedule, to be a pull request target, a workflow dispatch and a repository dispatch.
    * The schedule is of course optional but recommended
    * The workflow dispatch is a recommended testing mechanism
    * The pull request target is required to trigger certain jobs
* The `trigger-next-env` Job
    * This job is run only on pull request merge, and it sends a dispatch to the next stage. Specifically it fires an event called `dev_updates_merged` which the next job will listen for.
    * This job also includes metadata, specifically a `dependency` (which is derived from the git branch name), to indicate to the subsequent job which dependency to run for.
* The `patcher-report` Job
    * This job runs patcher report to generate a list of updates for a specific environment (defined based on the `include_dirs` argument)
    * Note this job uses a secret, `PIPELINES_READ_TOKEN`, which needs to have access to your Gruntwork account to access the Patcher binary.  See more on machine user tokens [here](/2.0/docs/pipelines/installation/viamachineusers).
* The `update-env` Job
    * This job takes the spec output from the report, puts it into a file, then calls patcher update.
    * Patcher update reads the spec file, checks out the code, makes a commit and then pushes a pull request
    * Note it is critically important for the correct functioning of the pull request workflow that the `pull_request_branch` be defined as `$PREFIX$DEPENDENCYID`. We strip out the prefix to identify the dependency ID in the `trigger-next-env` Job.

```yml
name: Update Dev Dependencies
on:
  workflow_dispatch:
  repository_dispatch:
    types: [new_module_release]
  schedule:
    # 04:15 UTC on Mondays
    - cron: "15 4 * * 1"
  pull_request_target:
    types:
      - closed
    branches:
      - main

permissions:
  contents: write

env:
  ENV_FOLDER_NAME: dev
  PR_BRANCH_PREFIX: patcherv2-dev-updates-

jobs:
  trigger-next-env:
    if: github.event.pull_request.merged == true && contains(github.event.pull_request.labels.*.name, 'updates-dev')
    runs-on: ubuntu-latest
    steps:
      - shell: bash
        id: dependency
        env:
          PR_BRANCH_PREFIX: ${{ env.PR_BRANCH_PREFIX }}
          BRANCH: ${{ github.head_ref }}
        run: |
          dep=${BRANCH#"$PR_BRANCH_PREFIX"}
          echo "dependency=$dep" >> "$GITHUB_OUTPUT"

      - uses: peter-evans/repository-dispatch@v2
        with:
          token: ${{ github.token }}
          repository: ${{ github.repository }}
          event-type: dev_updates_merged
          client-payload: '{"ref": "${{ github.ref }}", "sha": "${{ github.sha }}", "branch": "${{ github.head_ref }}", "dependency": "${{ steps.dependency.outputs.dependency }}"}'

  patcher-report:
    if: github.event_name == 'repository_dispatch' || github.event_name == 'schedule' || github.event_name == 'workflow_dispatch'
    runs-on: ubuntu-latest
    outputs:
      spec: ${{ steps.get-spec.outputs.spec }}
    steps:
      - uses: actions/checkout@v3
      - uses: gruntwork-io/patcher-action@v2
        id: get-spec
        with:
          patcher_command: report
          github_token: ${{ secrets.PIPELINES_READ_TOKEN }}
          include_dirs: "{*dev*}/**"
          working_dir: ./
          spec_file: patcher-spec.json

  update-env:
    needs: [patcher-report]
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        dependency: ${{ fromJson(needs.patcher-report.outputs.spec).Dependencies }}
    steps:
      - uses: actions/checkout@v3

      - name: Create the spec file
        shell: bash
        run: |
          echo '${{ needs.patcher-report.outputs.spec }}' > patcher-spec.json

      - uses: gruntwork-io/patcher-action@main
        with:
          patcher_command: update
          github_token: ${{ secrets.PIPELINES_READ_TOKEN }}
          working_dir: ${{ env.ENV_FOLDER_NAME }}
          dependency: ${{ matrix.dependency.ID }}
          spec_file: patcher-spec.json
          pull_request_title: "[Patcher] [dev] Update ${{ matrix.dependency.ID }}"
          pull_request_branch: "${{ env.PR_BRANCH_PREFIX }}${{ matrix.dependency.ID }}"
```

## Setting up the stage step

This workflow file, `update-stage.yml` is nearly identical to `update-dev.yml`.

The main differences are
* The `repository_dispatch` event type is now `dev_updates_merged`
* The `include_dirs` now targets the `stage` environment instead of `dev`
* The `PR_BRANCH_PREFIX` and `pull_request_title` reference the `stage` env instead of `dev`

```yml
name: Update Stage Dependencies

on:
  workflow_dispatch:
  repository_dispatch:
    types: [dev_updates_merged]
  pull_request_target:
    types:
      - closed
    branches:
      - main

permissions:
  contents: write

env:
  PR_BRANCH_PREFIX: patcher-stage-updates-

jobs:
  trigger-next-env:
    if: github.event.pull_request.merged == true && contains(github.event.pull_request.labels.*.name, 'updates-stage')
    runs-on: ubuntu-latest
    steps:
      - shell: bash
        id: dependency
        env:
          PR_BRANCH_PREFIX: ${{ env.PR_BRANCH_PREFIX }}
          BRANCH: ${{ github.head_ref }}
        run: |
          dep=${BRANCH#"$PR_BRANCH_PREFIX"}
          echo "dependency=$dep" >> "$GITHUB_OUTPUT"

      - uses: peter-evans/repository-dispatch@main
        with:
          token: ${{ github.token }}
          repository: ${{ github.repository }}
          event-type: stage_updates_merged
          client-payload: '{"ref": "${{ github.ref }}", "sha": "${{ github.sha }}", "branch": "${{ github.head_ref }}", "dependency": "${{ steps.dependency.outputs.dependency }}"}'

  patcher-report:
    if: github.event_name == 'repository_dispatch' || github.event_name == 'schedule' || github.event_name == 'workflow_dispatch'
    runs-on: ubuntu-latest
    outputs:
      spec: ${{ steps.run-report.outputs.spec }}
    steps:
      - uses: actions/checkout@v4
      - uses: gruntwork-io/patcher-action@main
        id: run-report
        with:
          github_token: ${{ secrets.PIPELINES_READ_TOKEN }}
          patcher_command: report
          working_dir: ./
          spec_file: patcher-spec.json
          include_dirs: "{*stage*}/**"

  update-env:
    needs: [patcher-report]
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      max-parallel: 2
      matrix:
        dependency: ${{ github.event.client_payload.dependency && fromJson(format('[{{"ID"{0} "{1}"}}]', ':', github.event.client_payload.dependency)) || fromJson(needs.patcher-report.outputs.spec).Dependencies }}
    steps:
      - uses: actions/checkout@v3
      - name: Create the spec file
        shell: bash
        run: |
          echo '${{ needs.patcher-report.outputs.spec }}' > patcher-spec.json

      - uses: gruntwork-io/patcher-action@main
        with:
          github_token: ${{ secrets.PIPELINES_READ_TOKEN }}
          dependency: ${{ matrix.dependency.ID }}
          patcher_command: update
          spec_file: patcher-spec.json
          pull_request_title: "[Patcher] [stage] Update ${{ matrix.dependency.ID }}"
          pull_request_branch: "${{ env.PR_BRANCH_PREFIX }}${{ matrix.dependency.ID }}"
```

## Setting up the prod stage

This workflow file, `update-prod.yml` is nearly identical to `update-stage.yml`.

The main differences are
* The `repository_dispatch` event type is now `stage_updates_merged`
* The `include_dirs` now targets the `prod` environment instead of `stage`
* The `PR_BRANCH_PREFIX` and `pull_request_title` reference the `prod` env instead of `stage`
* Since this is the last environment in the chain, we no longer need a `trigger-next-env` job.


```yml
name: Update Prod Dependencies

on:
  workflow_dispatch:
  repository_dispatch:
    types: [stage_updates_merged]

permissions:
  contents: write

env:
  PR_BRANCH_PREFIX: patcher-prod-updates-

jobs:
  patcher-report:
    if: github.event_name == 'repository_dispatch' || github.event_name == 'schedule' || github.event_name == 'workflow_dispatch'
    runs-on: ubuntu-latest
    outputs:
      spec: ${{ steps.run-report.outputs.spec }}
    steps:
      - uses: actions/checkout@v4
      - uses: gruntwork-io/patcher-action@main
        id: run-report
        with:
          github_token: ${{ secrets.PIPELINES_READ_TOKEN }}
          patcher_command: report
          working_dir: ./
          dependency: ${{ github.event.client_payload.dependency }}
          spec_file: patcher-spec.json
          include_dirs: "{*prod*}/**"

  update-env:
    needs: [patcher-report]
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      max-parallel: 2
      matrix:
        dependency: ${{ github.event.client_payload.dependency && fromJson(format('[{{"ID"{0} "{1}"}}]', ':', github.event.client_payload.dependency)) || fromJson(needs.patcher-report.outputs.spec).Dependencies }}
    steps:
      - uses: actions/checkout@v3
      - name: Create the spec file
        shell: bash
        run: |
          echo '${{ needs.patcher-report.outputs.spec }}' > patcher-spec.json

      - uses: gruntwork-io/patcher-action@main
        with:
          github_token: ${{ secrets.PIPELINES_READ_TOKEN }}
          dependency: ${{ matrix.dependency.ID }}
          patcher_command: update
          spec_file: patcher-spec.json
          pull_request_title: "[Patcher] [prod] Update ${{ matrix.dependency.ID }}"
          pull_request_branch: "${{ env.PR_BRANCH_PREFIX }}${{ matrix.dependency.ID }}"
```