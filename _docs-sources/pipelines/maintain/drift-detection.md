# Pipelines Drift Detection

:::note
Pipelines Drift Detection is only available to Pipelines Enterprise customers.
:::

## What Is Pipelines Drift Detection

Infrastructure Drift occurs when the applied terragrunt cloud configuration differs from the commited Infrastructure as Code (IaC).

Pipelines Drift Detection help to mitigate Drift in your repositories by running `terragrunt plan` on infrastructure units. If the plan detects any units have drifted from their applied configuration Pipelines will open a Drift Detected Pull Request tracking this drift in your repository.

When the Drift Detected Pull Request is merged, Pipelines will run `terragrunt apply` on all units where drift was detected.

## Installing Pipelines Drift Detection

Pipelines Drift Detection is automatically vended in new Enterprise repositories.

To add Drift Detection to an existing repository:

1. Create a new file at `.github/workflows/pipelines-drift-detection.yml`
1. Paste in the applicable workflow from below
1. For delegated repositories - ensure that **Allow GitHub Actions to create and approve pull requests** is checked in the repository settings.

![Allow Actions To Create Pull Requests](/img/pipelines/maintain/drift_detection_allow_pr_create.png)

<details><summary>Infra Live Root / Access Control</summary>

```yaml
name: Pipelines Drift Detection
run-name: "[GWP]: Pipelines Drift Detection"
on:
  schedule:
    # Uncomment to enable scheduled Drift Detection
    # - cron: '0 0 * * 1-5'
  workflow_dispatch:

permissions:
  actions: read
  id-token: write
  contents: write
  pull-requests: read

jobs:
  GruntworkPipelines:
    uses: gruntwork-io/pipelines-workflows/.github/workflows/pipelines-drift-detection.yml@v2
    secrets:
      PIPELINES_READ_TOKEN: ${{ secrets.PIPELINES_READ_TOKEN }}
      PR_CREATE_TOKEN: ${{ secrets.INFRA_ROOT_WRITE_TOKEN }}
```

</details>

<details><summary>Delegated Repositories</summary>

```yaml
name: Pipelines Drift Detection
run-name: "[GWP]: Pipelines Drift Detection"
on:
  schedule:
    # Uncomment to enable scheduled Drift Detection
    # - cron: '0 0 * * 1-5'
  workflow_dispatch:

permissions:
  actions: read
  id-token: write
  contents: write
  pull-requests: write

jobs:
  GruntworkPipelines:
    uses: gruntwork-io/pipelines-workflows/.github/workflows/pipelines-drift-detection.yml@v2
    secrets:
      PIPELINES_READ_TOKEN: ${{ secrets.PIPELINES_READ_TOKEN }}
      PR_CREATE_TOKEN: ${{ env.GITHUB_TOKEN }}
```

</details>

## Detecting Drift

Pipelines Drift Detection can be run on a schedule or manually.

### Running on a schedule

To enable running on a schedule, uncomment the line `- cron: '0 0 * * 1-5'` in `.github/workflows/pipelines-drift-detection.yml`. The default schedule runs at 00:00UTC Monday through Friday. You can increase or decrease the frequency that the schedule runs using [crontab syntax](https://crontab.guru/#0_0_*_*_1-5).

Each time Drift Detection runs and detects drift it will open a Pull Request in your repository. If there is an existing Drift Detection Pull Request that has not been merged it will be replaced.

:::note
Running Pipelines Drift Detection too frequently can easily eat through your GitHub Action minutes. We recommend starting with a low frequency and increasing only when you are comfortable with the usage.
:::

### Running manually

Pipelines Drift Detection can be run manually by navigating to Actions in your GitHub repository, selecting Pipelines Drift Detection from the left hand menu, and then selecting Run Workflow.

## Resolving Drift

Drift can be resolved by either applying the commited IaC from your repository, or modifying modules until they reflect the infrastructure state in the cloud.

### Merging The Pull Request

Merging the Pull Request will trigger a `terragrunt apply` on the drifted modules. In most cases this will resolve the drift.

### Updating Units

You can make modifications to modules that have drifted and commit those changes to the Drift Detection branch. Each change will re-trigger `terragrunt plan` on the Pull Request, and you can inspect the plan to ensure that the unit is no longer drifting.

When the Pull Request is merged, Pipelines will run `terragrunt apply` on all the units that had drift detected **or** were modified in the Pull Request. If the unit is no longer drifting the apply will be a no-op.
