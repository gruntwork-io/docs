# Using Patcher Promotion Workflows
As of July 2024, Gruntwork officially supports Patcher Promotion Workflows using GitHub Actions. Support for other CI systems will be introduced in future releases.  

**Related content**:  
* [Concepts - Patcher Workflows](/2.0/docs/patcher/concepts/promotion-workflows)  
* [Architecture - Overview](/2.0/docs/patcher/architecture)  

## Prerequisites
### Infrastructure as Code  
To use Patcher Promotion Workflows, your codebase must implement infrastructure as code using Terraform, OpenTofu, and/or Terragrunt.  

### Environments as folder structures  
To support multiple environments (such as `dev`, `stage`, and `prod`), your codebase must represent these environments with a consistent folder structure that can be grouped using glob pattern matching. For example:
```sh
ls
dev-account1  dev-account2  prod-account1  prod-account2  stage-account1  stage-account2
```

Then you would define your environments as `dev-*`, `stage-*`, and `prod-*`.  

## Implementation & setup example  

The Patcher Promotion Workflow process consists of a series of GitHub Actions workflow files, where each environment is represented as an individual workflow. The process begins with the lowest environment (typically `dev`). It scans the entire `dev` environment for dependencies that require updates and generates one pull request per dependency. Each pull request updates the dependency specifically in the `dev` environment.  

Once a pull request is approved and merged, it triggers pull requests for the subsequent environment using `repository dispatch` events. This process continues sequentially until the final environment (`prod`) is updated. At that point, no further pull requests are generated, and all environments are fully updated.  

To get started quickly, copy and customize the example files below to match your environment names. In this example, the promotion workflow moves updates sequentially across `dev`, `stage`, and finally `prod`.  

### Setting up the initial dev promotion step  

The initial GitHub Actions workflow file, `update-dev.yml` in this example, highlights the following key components:  

* **Job Triggers**:  
    * The job is configured to run on a schedule, pull request targets, workflow dispatch, and repository dispatch events.  
        * A **schedule** is optional but recommended for regular updates.  
        * **Workflow dispatch** is a recommended testing mechanism.  
        * The **pull request target** is required to trigger certain dependent jobs.  

* **`trigger-next-env` Job**:  
    * This job runs **only** when a pull request is merged. It sends a repository dispatch event (`dev_updates_merged`) to trigger the next environment’s workflow.  
    * It includes metadata, specifically a `dependency` (derived from the Git branch name), to inform the subsequent job which dependency to process.  

* **`patcher-report` Job**:  
    * This job runs `patcher report` to generate a list of updates for a specific environment, using the `include_dirs` argument to target that environment.  
    * It uses a secret, `PIPELINES_READ_TOKEN`, which must have access to your Gruntwork account to download the Patcher binary. For details on setting up machine user tokens, see [here](/2.0/docs/pipelines/installation/viamachineusers).  

* **`update-env` Job**:  
    * This job processes the `spec` output from the `patcher report` command, saves it to a file, and then runs `patcher update`.  
    * The `patcher update` command reads the `spec` file, checks out the repository code, commits the changes, and pushes a pull request.  
    * For the pull request workflow to function correctly, the `pull_request_branch` must follow the format `$PREFIX$DEPENDENCYID`. The `trigger-next-env` job strips out the prefix

<!-- spell-checker: disable -->
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
<!-- spell-checker: enable -->
### Setting up the stage step  

The `update-stage.yml` workflow file is nearly identical to `update-dev.yml`.  

The key differences are:  
* The `repository_dispatch` event type is now `dev_updates_merged`.  
* The `include_dirs` argument targets the `stage` environment instead of `dev`.  
* The `PR_BRANCH_PREFIX` and `pull_request_title` reference the `stage` environment instead of `dev`.  

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

The `update-prod.yml` workflow file is nearly identical to `update-stage.yml`.  

The key differences are:  
* The `repository_dispatch` event type is now `stage_updates_merged`.  
* The `include_dirs` argument targets the `prod` environment instead of `stage`.  
* The `PR_BRANCH_PREFIX` and `pull_request_title` reference the `prod` environment instead of `stage`.  
* Since this is the final environment in the chain, the `trigger-next-env` job is no longer needed.  


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
