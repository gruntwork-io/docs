# Undeploying your Reference Architecture

Terraform makes it fairly easy to delete resources using the `destroy` command. This is very useful in testing and
pre-prod environments, but can also be dangerous in production environments.

:::danger

Be especially careful when running `destroy` in any production environment so you don't accidentally end up deleting
something you'll very much regret (e.g., a production database).

If you delete resources, **there is no undo**

:::

## Prerequisites

### Understand `force_destroy` on S3 buckets

By default, if your Terraform code includes an S3 bucket, when you run `terraform destroy`, if that bucket contains
any content, Terraform will _not_ delete the bucket and instead will give you an error like this:

```yaml
bucketNotEmpty: The bucket you tried to delete is not empty. You must delete all versions in the bucket.
```

This is a safety mechanism to ensure that you don't accidentally delete your data.

If you are absolutely sure you want to delete the contents of an S3 bucket (remember, there's no undo!), all the
services that use S3 buckets expose a `force_destroy` setting that you can set to `true` in your `terragrunt.hcl`
files to tell that service to delete the contents of the bucket when you run `destroy`. Here's a partial list of
services that expose this variable:

:::note

You may not have all of these in your Reference Architecture

:::

- `networking/alb`
- `mgmt/openvpn-server`
- `landingzone/account-baseline-app`
- `services/k8s-service`

### Understand module dependencies

Gruntwork Pipelines (the CI/CD pipeline deployed with your Reference Architecture) only **supports destroying modules
that have no downstream dependencies.**

You can destroy multiple modules only if:

- All of them have no dependencies.
- None of them are dependent on each other.

#### Undeploying a module with many dependencies

As an example, most modules depend on the `vpc` module, for fetching information about the VPC using [Terragrunt `dependency`
blocks](https://terragrunt.gruntwork.io/docs/reference/config-blocks-and-attributes/#dependency) or
[aws_vpc](https://www.terraform.io/docs/providers/aws/d/vpc.html) data source. If you undeploy your `vpc`
_before_ the modules that depend on it, then any command you try to run on those other modules will fail, as their
data sources will no longer be able to fetch the VPC info!

Therefore, you should only destroy a module if you're sure no other module depends on it! Terraform does not provide
an easy way to track these sorts of dependencies. We have configured the modules here using Terragrunt [`dependency`](https://terragrunt.gruntwork.io/docs/reference/config-blocks-and-attributes/#dependency) blocks, so use those to find dependencies between modules.

You can check the module dependency tree with `graph-dependencies` and GraphViz:

```bash
aws-vault exec <account_profile> -- terragrunt graph-dependencies | dot -Tpng > dep-graph.png
open dep-graph.png
```

## Undeploying a module with no dependencies using Gruntwork Pipelines

To destroy a module with no downstream dependencies, such as `route53-private` in the `dev` environment:

1.  Update the `force_destroy` variable in `dev/us-west-2/dev/networking/route53-private/terragrunt.hcl`.
    [See force_destroy section](#pre-requisite-force_destroy-on-s3-buckets).

    ```json
    force_destroy = true
    ```

1.  Open a pull request for that change and verify the plan in CI. You should see a trivial change to update the
    module.
1.  Go through the typical git workflow to get the change merged into the main branch.
1.  As CI runs on the main branch, watch for the job to be held for approval. Approve the job, and wait for the
    `deployment` step to complete so that the module is fully updated with the new variable.
1.  Remove the module folder from the repo. For example:

    ```bash
    rm -rf dev/us-west-2/dev/networking/route53-private
    ```

1.  Open a pull request for that change and verify the plan in CI.
    - Make sure the `plan -destroy` output looks accurate.
    - If you are deleting multiple modules (e.g., in `dev`, `stage`, and `prod`) you should see multiple plan
      outputs -- one per folder deleted. You'll need to scroll through the plan output to see all of them, as
      it runs `plan -destroy` for each folder individually.
1.  Go through the typical git workflow to get the change merged into the main branch.
1.  As CI runs on the main branch, watch for the job to be held for approval. Approve the job, and wait for the
    `deployment` step to complete so that the module is fully _deleted_.
1.  [Remove the Terraform state](#removing-the-terraform-state).
1.  Repeat this process for upstream dependencies you may now want to destroy, always starting from the
    modules that have no existing downstream dependencies.

### Manually undeploying a single module

You can also bypass the CI/CD pipeline and run destroy locally. For example:

```bash
cd stage/us-west-2/stage/services/sample-app-frontend
terragrunt destroy
```

## Manually undeploying multiple modules or an entire environment

_If you are absolutely sure you want to run destroy on multiple modules or an entire environment_, you can use the `destroy-all` command. For example, to undeploy the entire staging environment, you'd run:

:::danger

This operation cannot be undone!

:::

```bash
cd stage
terragrunt destroy-all
```

Terragrunt will then run `terragrunt destroy` in each subfolder of the current working directory, processing them in
reverse order based on the dependencies you define in the `terragrunt.hcl` files.

To avoid interactive prompts from Terragrunt (use very carefully!!), add the `--terragrunt-non-interactive` flag:

```bash
cd stage
terragrunt destroy-all --terragrunt-non-interactive
```

To undeploy everything except a couple specific sub-folders, add the `--terragrunt-exclude-dir` flag. For example, to
run `destroy` in each subfolder of the `stage` environment except MySQL and Redis, you'd run:

```
cd stage
terragrunt destroy-all \
    --terragrunt-exclude-dir stage/us-east-1/stage/data-stores/mysql \
    --terragrunt-exclude-dir stage/us-east-1/stage/data-stores/redis
```

## Removing the Terraform state

**NOTE: Deleting state means that you lose the ability to manage your current Terraform resources! Be sure to only
delete once you have confirmed all resources are destroyed.**

Once all the resources for an environment have been destroyed, you can remove the state objects managed by `terragrunt`.
The reference architecture manages state for each environment in an S3 bucket in each environment's AWS account.
Additionally, to prevent concurrent access to the state, it also utilizes a DynamoDB table to manage locks.

To delete the state objects, login to the console and look for the S3 bucket in the environment you wish to undeploy. It
should begin with your company's name and end with `terraform-state`. Also look for a DynamoDB
table named `terraform-locks`. You can safely remove both **once you have confirmed all the resources have been
destroyed successfully**.

## Useful tips

- **Destroy resources in groups instead of all at once.**

  - There are [known instabilities](#known-errors) with destroying many modules at once. In addition, Terragrunt is
    designed to process the modules in a graph, and will not continue on if there is an error. This means that you
    could run into situations where Terragrunt has destroyed a module, but returns an error due to Terraform bugs that
    prevent you from cleanly calling destroy twice.
  - To address these instabilities, it is recommended to destroy the resources in groups. For example, you can start
    by destroying all the services first (e.g., `stage/REGION/stage/services`), then the data stores (e.g.,
    `stage/REGION/stage/data-stores`), and finally the networking resources (e.g., `stage/REGION/stage/networking`).
  - When identifying groups to destroy, use [terragrunt
    graph-dependencies](https://terragrunt.gruntwork.io/docs/reference/cli-options/#graph-dependencies) to view the
    dependency graph so that you destroy the modules in the right order.

- **Empty + Delete S3 buckets using the web console (when destroying whole environments).**
  - As mentioned in [Pre-requisite: force_destroy on S3 buckets](#pre-requisite-force_destroy-on-s3-buckets), it is
    recommended to set `force_destroy = true` prior to running destroy so that Terraform can destroy the S3 buckets.
    However, this can be cumbersome if you are destroying whole environments, as it can be difficult to flip the bit in
    every single module.
  - Instead, oftentimes it is faster and more convenient to first empty and then delete the buckets using the AWS web console prior to
    invoking `destroy` with `terragrunt`.
  - **IMPORTANT**: You should only do this if you are intending on destroying an entire environment. Otherwise, it is
    too easy to accidentally delete the wrong S3 bucket.

## Known Terraform errors

If your `destroy` fails with:

```
variable "xxx" is nil, but no error was reported
```

Terraform has a couple bugs ([18197](https://github.com/hashicorp/terraform/issues/18197) and
[17862](https://github.com/hashicorp/terraform/issues/17862)) that may give this error when you run
`destroy`.

This usually happens when the module already had `destroy` called on it previously and you re-run `destroy`. In this
case, your best bet is to skip over that module with the `--terragrunt-exclude-dir` (more details: [here](https://terragrunt.gruntwork.io/docs/reference/cli-options/#terragrunt-exclude-dir)).
