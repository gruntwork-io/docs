# Pipelines Actions

:::info Recent Upgrade
This documentation relates to the latest version of Gruntwork Pipelines that most customers have not yet adopted.

If you are using the older version of Gruntwork Pipelines that includes the `infrastructure-pipelines` repository, click [here](../../infrastructure-pipelines/overview/deprecation.md) to learn more about the deprecation of that version.
:::

When a user opens a pull request, Pipelines runs a set of operations in response to the proposed [infrastructure changes](../overview/#infrastructure-change). We call these operations _pipelines actions_. Gruntwork Pipelines supports the following pipelines actions:

## Terragrunt plan

When a pull request is created, Pipelines will automatically execute `terragrunt plan` on every infrastructure-change in parallel. A pull request comment with the status (in-progress, success or failure) and a link to the logs will be added when the action completes.

## Terragrunt apply/destroy

When a pull request is merged, Pipelines will automatically execute either `terragrunt apply` or `terragrunt destroy` on every infrastructure change, depending on the type of infrastructure change. For example, if the pull request deletes a `terragrunt.hcl` file, Pipelines will run `terragrunt destroy`.

## Other Actions

If you'd like to request a new Pipelines action, please email us at <feedback@gruntwork.io>.
