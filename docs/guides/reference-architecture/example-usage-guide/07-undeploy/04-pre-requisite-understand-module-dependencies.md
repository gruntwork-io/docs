# Pre-requisite: understand module dependencies

At this point the CI / CD pipeline (Gruntwork Pipelines) only **supports destroying modules that have no downstream dependencies.** You can destroy
multiple modules but only if all of them have no dependencies, and also only if none of them are dependent on each other.

## Undeploying a module with many dependencies

For example, most modules depend on the `vpc` module, fetching information about the VPC using [Terragrunt `dependency`
blocks](https://terragrunt.gruntwork.io/docs/reference/config-blocks-and-attributes/#dependency) or
[aws_vpc](https://www.terraform.io/docs/providers/aws/d/vpc.html) data source. If you undeploy your `vpc`
*before* the modules that depend on it, then any command you try to run on those other modules will fail, as their
data sources will no longer be able to fetch the VPC info!

Therefore, you should only destroy a module if you're sure no other module depends on it! Terraform does not provide
an easy way to track these sorts of dependencies. We have configured the modules here using Terragrunt [`dependency`](https://terragrunt.gruntwork.io/docs/reference/config-blocks-and-attributes/#dependency) blocks, so use those to find dependencies between modules.

You can check the module dependency tree with `graph-dependencies` and GraphViz:

        aws-vault exec <account_profile> -- terragrunt graph-dependencies | dot -Tpng > dep-graph.png
        open dep-graph.png


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"9157fe8a4406021c41bd8b94cb73d04b"}
##DOCS-SOURCER-END -->
