# Running Drift Detection

## Detecting Drift

Pipelines Drift Detection can be executed manually or on a scheduled basis.

:::note
It is recommended to start with manual runs, focusing on individual directories of your IaC. This approach allows you to resolve drift incrementally before enabling scheduled Drift Detection for the entire repository.
:::

### Running manually

You can manually initiate Pipelines Drift Detection by navigating to the Actions tab in your GitHub repository, selecting "Pipelines Drift Detection" from the left-hand menu, and then clicking "Run Workflow."

By default, the workflow evaluates all units in your repository and generates a pull request on the `drift-detection` branch. To limit drift detection to specific units, specify a path filter. For instance, to target only the `management` directory, use the filter `./management/*` (note the leading `./`).

![Manual Dispatch](/img/pipelines/maintain/drift-detection-manual-dispatch.png)

### Running on a schedule

To enable scheduled runs:

1. Uncomment the `schedule` block in `.github/workflows/pipelines-drift-detection.yml` that contains `- cron: '15 12 * * 1'`.
2. Adjust the cron schedule to reflect your preferred frequency. The default configuration runs at 12:15 UTC every Monday. Use [crontab syntax](https://crontab.guru/#15_12_*_*_1) to customize the timing.
3. Each Drift Detection run creates a pull request in your repository. If an existing Drift Detection pull request remains unmerged, it will be updated or replaced.

:::caution
Running Drift Detection too frequently can consume a significant number of GitHub Action minutes. Begin with a lower frequency and adjust as needed based on your usage patterns.
:::

## Resolving Drift

Drift can be addressed by either applying the current IaC configuration from your repository or modifying the modules to match the infrastructure state in the cloud.

### Merging the pull request

Merging the pull request triggers a `terragrunt apply` on the modules identified as having drift.

### Updating units

Alternatively, modify the drifted modules to align them with the desired state and commit the changes to the drift-detection branch. Each change triggers a new `terragrunt plan` for the affected units, which you can review to ensure the drift is resolved.

When the pull request is merged, Pipelines will execute `terragrunt apply` on all drifted or modified units. If a unit no longer exhibits drift, the apply operation will result in no changes being made to the infrastructure.

