# Pipelines Actions

When a user opens a Pull Request, Pipelines runs a set of operations in response to the proposed [infrastructure changes](../overview/#infrastructure-change). We call these operations _pipelines actions_. Gruntwork Pipelines supports the following pipelines actions:

## Terragrunt plan

When a pull request is created, Pipelines will automatically execute `terragrunt plan` on every infrastructure-change. A pull request comment with the status (success or failure) and a link to the logs will be added when the action completes.

## Terragrunt apply/destroy

When a pull request is merged, Pipelines will automatically execute either `terragrunt apply` or `terragrunt destroy` on every infrastructure change, depending on the type of infrastructure change. For example, if the pull request deletes a `terragrunt.hcl` file, Pipelines will run `terragrunt destroy`.

## Other Actions

If you'd like to request a new Pipelines action, please email us at feedback@gruntwork.io.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "7fa59a2184effe0171e04ffcbff3ae87"
}
##DOCS-SOURCER-END -->
