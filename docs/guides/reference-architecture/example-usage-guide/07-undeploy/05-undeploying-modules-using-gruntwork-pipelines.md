# Undeploying modules using Gruntwork Pipelines

To destroy a module with no downstream dependencies, such as `route53-private` in the `dev` environment:

1.  Update the `force_destroy` variable in `dev/us-west-2/dev/networking/route53-private/terragrunt.hcl`.
    ([See the `force_destroy` section](03-pre-requisite-force-destroy-on-s3-buckets.md).)

        force_destroy = true

1.  Open a pull request for that change and verify the plan in CI. You should see a trivial change to update the
    module.
1.  Go through the typical git workflow to get the change merged into the main branch.
1.  As CI runs on the main branch, watch for the job to be held for approval. Approve the job, and wait for the
    `deployment` step to complete so that the module is fully updated with the new variable.
1.  Remove the module folder from the repo. For example:

        rm -rf dev/us-west-2/dev/networking/route53-private

1.  Open a pull request for that change and verify the plan in CI.
    - Make sure the `plan -destroy` output looks accurate.
    - If you are deleting multiple modules (e.g., in `dev`, `stage`, and `prod`) you should see multiple plan
      outputs -- one per folder deleted. You'll need to scroll through the plan output to see all of them, as
      it runs `plan -destroy` for each folder individually.
1.  Go through the typical git workflow to get the change merged into the main branch.
1.  As CI runs on the main branch, watch for the job to be held for approval. Approve the job, and wait for the
    `deployment` step to complete so that the module is fully _deleted_.
1.  [Remove the terraform state](08-removing-the-terraform-state.md).

:::note

Repeat this process for upstream dependencies you may now want to destroy, always starting from the
modules that have no existing downstream dependencies.

:::


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "8b72dc69092ed45097995a27428b543d"
}
##DOCS-SOURCER-END -->
