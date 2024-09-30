# Pipelines Actions

When a user opens a pull request, Pipelines runs a set of operations as a Github Action Workflow in response to the proposed [infrastructure changes](../overview/#infrastructure-change). We call these operations _pipelines actions_. Gruntwork Pipelines supports the following pipelines actions:

## Terragrunt plan

When a pull request is created, Pipelines will automatically execute `terragrunt plan` on every infrastructure-change in parallel. A pull request comment with the status (in-progress, success or failure) and a link to the logs will be added when the action completes.

## Terragrunt apply/destroy

When a pull request is merged, Pipelines will automatically execute either `terragrunt apply` or `terragrunt destroy` on every infrastructure change, depending on the type of infrastructure change. For example, if the pull request deletes a `terragrunt.hcl` file, Pipelines will run `terragrunt destroy`.

## Skipping Runs

Sometimes you find it necessary to make a change without going through the full pipelines process. This can be accomplished using GitHub's built in method for skipping workflow runs [by adding [skip ci] to your commit message](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/skipping-workflow-runs).

## Other Actions

If you'd like to request a new Pipelines action, please email us at [feedback@gruntwork.io](mailto:feedback@gruntwork.io).


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "6dfd5542e8e8cbe86eff0053b6d85a01"
}
##DOCS-SOURCER-END -->
