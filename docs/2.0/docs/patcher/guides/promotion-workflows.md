# Using Patcher Promotion Workflows
:::info
As of July 2024 Gruntwork officially supports Patcher Promotion Workflows using GitHub Actions. Other CI systems will come in future releases.
:::

:::info
Related Content:
* [Concepts - Patcher Workflows](../concepts/promotion-workflows.md)
* [Architecture - Overview](../architecture/index.md)
:::

## Prerequisites

### Infrastructure As Code
To leverage Patcher Promotion Workflows, your codebase must use infrastructure as code with Terraform, OpenTofu and/or Terragrunt.

### Environments as Folder Structures

To support multiple environments (such as dev, stage and prod), your code must represent those environments with a consistent folder structure that can be grouped via glob pattern matching, e.g.:
```sh
ls
dev-account1  dev-account2  prod-account1  prod-account2  stage-account1  stage-account2
```

Then you would define your environments as `dev-*`, stage as `stage-*` and prod as `prod-*`.


## Implementation & Setup Example

The Patcher Promotion Workflow process consists of a series of GitHub Actions workflow files.  Each environment is modeled as an individual workflow.  The process begins with the lowest environment (usually something like `dev`). It scans the entire `dev` environment for all dependencies which may require updates.  It then generates one pull request per dependency. That PR updates that dependency in just the `dev` environment.  

As each of those pull requests is approved and merged, that approval triggers new pull requests for the subsequent environment (triggered via `repository dispatch` events).  This process continues until the last environment at which point no further PRs are opened and all environments have been updated.

For a quick start, copy and tweak the example files below to match your environment names.  Here, we set up a promotion workflow across `dev`, `stage` and finally `prod`.

### Setting up the initial dev promotion step

The initial GitHub Actions Workflow file, in this example `update-dev.yml`, contains several key points:

* We set up the job to run on a schedule, to be a pull request target, a workflow dispatch and a repository dispatch.
    * The schedule is optional but recommended
    * The workflow dispatch is a recommended testing mechanism
    * The pull request target is required to trigger certain jobs
* The `trigger-next-env` Job
    * This job is run only on pull request merge, and it sends a dispatch to the next stage. It fires an event called `dev_updates_merged`, which the next job will listen for.
    * It also includes metadata, specifically a `dependency` (which is derived from the git branch name), to inform the subsequent job which dependency to run for.
* The `patcher-report` Job
    * This job runs patcher report to generate a list of updates for a specific environment (defined based on the `include_dirs` argument)
    * Note this job uses a secret, `PIPELINES_READ_TOKEN`, which needs access to your Gruntwork account to access the Patcher binary.  See more on machine user tokens [here](/2.0/docs/pipelines/installation/viamachineusers).
* The `update-env` Job
    * This job takes the spec output from the report, puts it into a file, then calls patcher update.
    * Patcher update reads the spec file, checks out the code, makes a commit and then pushes a pull request
    * It is critically important for the pull request workflow that the `pull_request_branch` be defined as `$PREFIX$DEPENDENCYID`. We strip out the prefix to identify the dependency ID in the `trigger-next-env` Job.

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

### Setting up the stage step

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

### Setting up the prod stage

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