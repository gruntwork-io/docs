# Using Patcher Promotion Workflows

This guide covers setting up promotion workflows to move updates across multiple environments (dev → stage → prod). You should use this guide only after you have Patcher set up for [ongoing updates](/2.0/docs/patcher/guides/ongoing-updates).

## What are promotion workflows?

Rolling out updates to infrastructure-as-code is already painful. But it becomes doubly so when you need to roll out changes across many environments (e.g. from dev to stage to prod). In that case, you must choose between two unsatisfying options:

1. Update many environments at once and hope that prod doesn't break
2. Incrementally roll out your updates (e.g. open a pull request updating dev, then stage, then prod), but manually re-create effectively the same pull request many times.

In short, you can choose between confidence and efficiency, but historically you can't get both.

With promotion workflows, we aim to bridge that gap. You open a pull request that updates OpenTofu/Terraform/Terragrunt code only in your initial rollout environment (e.g. dev). Once you merge that pull request, Patcher promotion workflows automatically trigger the next environment’s workflow (e.g. stage), which opens a pull request with the same dependency updates for that environment. The process continues until you reach prod.

This way, you incrementally roll out changes with one PR per environment, and the pull requests for each subsequent environment are created automatically.

### Limitations

Promotion workflows trigger the next environment based on a merged PR that has the correct label (e.g. `updates-dev`). If you merge a PR after editing it (e.g. by dropping some dependency updates), the next environment’s run will still report and update based on what’s currently outdated in that environment—it does not replay your exact edits. You can always adjust the downstream PRs manually if needed.

## Prerequisites

### Supported CI systems

Gruntwork officially supports Patcher promotion workflows using **GitHub Actions** and the [patcher-action](https://github.com/gruntwork-io/patcher-action) workflow (v5).

### Secrets or OIDC

The workflow needs permission to download Patcher from Gruntwork and to push branches and open pull requests in your repo. You can use either:

- **OIDC** (recommended): If your repository is linked in Gruntwork Pipelines, the workflow uses the pipelines-credentials action to obtain short-lived tokens. No long-lived secrets are required in that case.
- **Secrets as fallback**: If OIDC is not available, set these repository secrets:
  - `PIPELINES_READ_TOKEN` — used to download Patcher and read Gruntwork modules and your repos. See [setting up machine user tokens](/2.0/docs/pipelines/installation/viamachineusers).
  - `PR_CREATE_TOKEN` — used to push branches and create pull requests in your infrastructure repo.

### Organizing environments as folder structures

To support multiple environments (such as `dev`, `stage`, and `prod`), your codebase must represent these environments with a consistent folder structure that can be targeted using glob pattern matching.

For example, if your environments were organized like this:

```sh
$ ll
dev-account1
dev-account2
prod-account1
prod-account2
stage-account1
stage-account2
```

You would use `include_dirs` such as `"{*dev*}/**"`, `"{*stage*}/**"`, and `"{*prod*}/**"` in each workflow.

### Labeling PRs for promotion

Promotion is triggered when a **merged** pull request has a label that matches the environment (e.g. `updates-dev`, `updates-stage`). You need a way to apply these labels based on which paths the PR changes. The examples below use GitHub’s [labeler](https://github.com/actions/labeler) plus a config file so that PRs touching `dev/**` get `updates-dev`, and so on. Setup is described in [Setting up the labeler](#setting-up-the-labeler).

## Implementation & setup example

The promotion workflow uses the **patcher-action** workflow (`gruntwork-io/patcher-action/.github/workflows/patcher.yml@v5`). That workflow runs in a single job: it checks out your repo, runs `patcher report` (scoped by `include_dirs`), then runs `patcher update` and opens **one pull request per environment** with all dependency updates for that environment.

Each environment (dev, stage, prod) has its own workflow file that:

1. Calls the workflow with the right `include_dirs` for that environment.
2. Listens for the appropriate trigger: schedule, manual run, or a `repository_dispatch` event from the previous environment.
3. (Dev and stage only) When a PR with the matching label is **merged**, sends a `repository_dispatch` to trigger the next environment’s workflow.

Copy and customize the example files below to match your environment names and paths. The promotion flow moves updates sequentially: dev → stage → prod.

### Setting up the labeler

So that merged PRs trigger the next environment, they must have the right label (`updates-dev`, `updates-stage`, etc.). Add a workflow that labels PRs by changed paths, and a config file that maps paths to labels.

Create **`.github/labeler.yml`** (adjust paths to match your repo):

```yaml
# Label PRs by which environment paths they change
updates-dev:
  - dev/**/*
  - dev2/**/*
updates-stage:
  - stage/**/*
updates-prod:
  - prod/**/*
```

Add a **Labeler** workflow (e.g. `.github/workflows/label.yml`):

```yaml
name: Labeler
on: [pull_request_target]

jobs:
  label:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: actions/labeler@v4
        with:
          repo-token: "${{ secrets.GITHUB_TOKEN }}"
          sync-labels: true
```

### Setting up the initial dev promotion step

The **dev** workflow runs Patcher for the dev environment and, when a labeled PR is merged, triggers the stage workflow.

- **Triggers**: `workflow_dispatch`, `repository_dispatch` (e.g. `new_module_release`), optional **schedule**, and `pull_request_target` (closed) so the merge can trigger the next env.
- **`trigger-next-env` job**: Runs only when a PR is merged and has the label `updates-dev`. Sends a `repository_dispatch` event `dev_updates_merged` to trigger the stage workflow.
- **`patcher` job**: Calls the workflow with `include_dirs: "{*dev*}/**"` so report and update run only for dev. The workflow opens a single PR with all dev dependency updates.

<!-- spell-checker: disable -->
```yaml
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
  id-token: write
  contents: write

jobs:
  trigger-next-env:
    if: github.event.pull_request.merged == true && contains(github.event.pull_request.labels.*.name, 'updates-dev')
    runs-on: ubuntu-latest
    steps:
      - uses: peter-evans/repository-dispatch@v3
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          repository: ${{ github.repository }}
          event-type: dev_updates_merged
          client-payload: '{"ref": "${{ github.ref }}", "sha": "${{ github.sha }}", "branch": "${{ github.head_ref }}" }'

  patcher:
    if: github.event_name == 'repository_dispatch' || github.event_name == 'schedule' || github.event_name == 'workflow_dispatch'
    uses: gruntwork-io/patcher-action/.github/workflows/patcher.yml@v5
    with:
      working_dir: ./
      include_dirs: "{*dev*}/**"
    secrets:
      PIPELINES_READ_TOKEN: ${{ secrets.PIPELINES_READ_TOKEN }}
      PR_CREATE_TOKEN: ${{ secrets.PR_CREATE_TOKEN }}
```
<!-- spell-checker: enable -->

### Setting up the stage step

The **stage** workflow is triggered when dev’s updates are merged (`dev_updates_merged`) and, when a stage PR with the right label is merged, triggers prod.

- **Triggers**: `workflow_dispatch`, `repository_dispatch` with `dev_updates_merged`, and `pull_request_target` (closed).
- **`trigger-next-env` job**: When a merged PR has the label `updates-stage`, sends `stage_updates_merged` to trigger the prod workflow.
- **`patcher` job**: Same as dev but with `include_dirs: "{*stage*}/**"`.

```yaml
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
  id-token: write
  contents: write

jobs:
  trigger-next-env:
    if: github.event.pull_request.merged == true && contains(github.event.pull_request.labels.*.name, 'updates-stage')
    runs-on: ubuntu-latest
    steps:
      - uses: peter-evans/repository-dispatch@v3
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          repository: ${{ github.repository }}
          event-type: stage_updates_merged
          client-payload: '{"ref": "${{ github.ref }}", "sha": "${{ github.sha }}", "branch": "${{ github.head_ref }}" }'

  patcher:
    if: github.event_name == 'repository_dispatch' || github.event_name == 'schedule' || github.event_name == 'workflow_dispatch'
    uses: gruntwork-io/patcher-action/.github/workflows/patcher.yml@v5
    with:
      working_dir: ./
      include_dirs: "{*stage*}/**"
    secrets:
      PIPELINES_READ_TOKEN: ${{ secrets.PIPELINES_READ_TOKEN }}
      PR_CREATE_TOKEN: ${{ secrets.PR_CREATE_TOKEN }}
```

### Setting up the prod step

The **prod** workflow is the last in the chain. It has no `trigger-next-env` job and no `pull_request_target`; it only runs when triggered by `stage_updates_merged` or manually.

- **Triggers**: `workflow_dispatch` and `repository_dispatch` with `stage_updates_merged`.
- **`patcher` job**: Same pattern with `include_dirs: "{*prod*}/**"`.

```yaml
name: Update Prod Dependencies

on:
  workflow_dispatch:
  repository_dispatch:
    types: [stage_updates_merged]

permissions:
  id-token: write
  contents: write

jobs:
  patcher:
    uses: gruntwork-io/patcher-action/.github/workflows/patcher.yml@v5
    with:
      working_dir: ./
      include_dirs: "{*prod*}/**"
    secrets:
      PIPELINES_READ_TOKEN: ${{ secrets.PIPELINES_READ_TOKEN }}
      PR_CREATE_TOKEN: ${{ secrets.PR_CREATE_TOKEN }}
```

## Related content

* [Concepts - Patcher Workflows](/2.0/docs/patcher/concepts/promotion-workflows)
* [Architecture - Overview](/2.0/docs/patcher/architecture)
