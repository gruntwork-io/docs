# Pipelines Drift Detection

:::note
Pipelines Drift Detection is only available to Devops Foundations Enterprise customers.
:::

## What is Pipelines Drift Detection

Infrastructure Drift occurs when the applied terragrunt cloud configuration differs from the commited Infrastructure as Code (IaC).

Pipelines Drift Detection helps to mitigate Drift in your repositories by running `terragrunt plan` on infrastructure units. If the plan detects any units have drifted from their applied configuration Pipelines will open a Drift Detected Pull Request tracking this drift in your repository.

When the Drift Detected Pull Request is merged, Pipelines will run `terragrunt apply` on all units where drift was detected to ensure resources once again match what is specified in code.

## Detecting Drift

Pipelines Drift Detection can be run on a manually or on a schedule.

:::note
We recommend starting manually and running Drift Detection against each directory of your IaC before enabling scheduled Drift Detection on your entire repository. This allows you to fix any existing drift on a smaller set of units at a time.
:::

### Running manually

Pipelines Drift Detection can be run manually by navigating to Actions in your GitHub repository, selecting Pipelines Drift Detection from the left hand menu, and then selecting Run Workflow.

By default the workflow will run on all units in your repository, and create a pull request on the branch `drift-detection`. You can specify a path filter to restrict Drift Detection to a subset of your units and customize the branch name. For example to to run Drift Detection only on IaC in the `management` directory, the filter should be `./management/*`. Note the leading `./`.

![Manual Dispatch](/img/pipelines/maintain/drift-detection-manual-dispatch.png)

### Running on a schedule

To enable running on a schedule:

1. Uncomment the schedule block containing `- cron: '15 12 * * 1'` in `.github/workflows/pipelines-drift-detection.yml`.
1. Update the cron schedule to suit your desired frequency. The default schedule runs at 12:15UTC Monday. You can increase or decrease the frequency that the schedule runs using [crontab syntax](https://crontab.guru/#15_12_*_*_1).
1. Each time Drift Detection runs and detects drift it will open a Pull Request in your repository. If there is an existing Drift Detection Pull Request that has not been merged it will be replaced.

:::caution
Running Pipelines Drift Detection too frequently can easily eat through your GitHub Action minutes. We recommend starting with a low frequency and increasing only when you are comfortable with the usage.
:::

## Resolving Drift

Drift can be resolved by either applying the commited IaC from your repository, or modifying modules until they reflect the infrastructure state in the cloud.

### Merging The Pull Request

Merging the Pull Request will trigger a `terragrunt apply` on the drifted modules.

### Updating Units

You can make modifications to modules that have drifted and commit those changes to the Drift Detection branch. Each change to a terragrunt unit change will re-trigger `terragrunt plan` in those units on the Pull Request, and you can inspect the plan to ensure that the unit no longer has drift.

When the Pull Request is merged, Pipelines will run `terragrunt apply` on all the units that had drift detected **or** were modified in the Pull Request. If the unit no longer has drift the apply will be a no-op and no infrastructure changes will be made.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "4d68b9a93861cfbe5b1cdd55901d6035"
}
##DOCS-SOURCER-END -->
