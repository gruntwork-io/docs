# Pipelines Actions

When a user opens a Pull Request, Pipelines runs some set of "actions" in response to the proposed [infrastracture changes](../core-concepts/#infrastructure-change). We call these _pipelines actions_. Gruntwork Pipelines supports the following pipelines actions:

## Terragrunt plan

When the pull request is created, Pipelines will automatically execute `terragrunt plan` on every infrastructure-change. The output will be written to a Pull Request comment.

## Terragrunt apply/destroy

When the pull request is merged, Pipelines will automatically execute either `terragrunt apply` or `terragrunt destroy` on every infrastructure change, depending on the type of infrastructure change. For example, if the pull request deletes a `terragrunt.hcl` file, Pipelines will run `terragrunt destroy`.

## Coming soon

The above actions are just the start, and we look forward to adding support for a number of other pipelines actions in the future, including:

- Cost estimation of OpenTF plans
- OPA policy checks
- Running customer-defined actions

If you'd like to request a pipelines action, please email us at feedback@gruntwork.io.
