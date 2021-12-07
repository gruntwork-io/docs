# Step 2: Update each Terragrunt live configuration to use the Service Catalog

At this point, you are ready to update each live configuration! It’s important to take a bottom-up approach for migrating
the live configurations. That is, update live configurations that don’t have any downstream dependencies first, then
work your way up the dependency graph.

This ensures that:

- Each update is self contained. Changing the live configuration of leaf services will not affect other live
  configurations, allowing you to continue to make changes to unmigrated live configurations.

- The migration is low risk. The leaf nodes in the Terragrunt infrastructure graph tend to be lower risk services.
  That is, the closer you are to the root of the graph, the higher the number of things that depend on that infrastructure,
  which gives that service a larger surface area. E.g., VPC has many downstream dependencies, which means that messing it
  up can cause lots of other services to fail.

However, this does mean that you will need to update previously migrated services if the upstream services
has a change. For example, Service Catalog services sometimes have output name changes, which means that you will need
to update the references in the downstream services when you update the service.

To handle this, you can identify all the downstream services that are affected by running `terragrunt validate-all` to
identify these broken links each time a service is updated, and fix them in the same PR.

Don’t worry — we’re going to walk you through every step right now. At a high-level, here’s what you’ll do:

1.  Choose a service.

2.  Refer to the dedicated guide for that service.

3.  Backup the state file.

4.  Modify the `terragrunt.hcl` live configuration for it, following the guide.

5.  Validate the backend configuration with `terragrunt state list`.

6.  Validate the inputs with `terragrunt validate-inputs`.

7.  Run the state migration script, if any.

8.  Sanity check the changes with `terragrunt plan`.

9.  Roll out with `terragrunt apply`.

Some of the services, such as EKS and ASG, have slightly different steps to the above list, so please pay attention to that.

Now for the full-fledged instructions to upgrade a single service:

1.  Check the service’s downstream dependencies. Use the `graph-dependencies` command to create
    a visual representation. The arrow points from the leaf to the root, toward the dependency. Thus in the graph,
    the top nodes are leaf nodes and the bottom, root nodes.

    - `terragrunt graph-dependencies | dot -Tpng > graph.png`

    - If you get an error that `dot` is not available, install [graphviz](https://www.graphviz.org/download/), which
      installs the `dot` utility.

    - Here is an example of a dependency tree for the `dev` account using Reference Architecture v1.
      ![Dependency Graph](/assets/img/guides/ref-arch-v2-upgrade/ref-arch-v2-dep-tree.png)

2.  Ensure the module is updated to the same version used in Reference Architecture version
    [20201125](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1-20201125).

    - If you’re running a newer version, continue.

    - If you are running an older version, follow the migration guides referenced in
      [the Reference Architecture
      releases](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases) to update to the latest version. This is important because the Service Catalog module references use newer
      versions from the Module Catalog than what is shipped with v1.0 of the Reference Architecture. Once you’ve upgraded to
      [20201125](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1-20201125),
      you can automate any state manipulations that are required to update a service using the provided guides and scripts.

3.  **Make a backup of the state file** using the following command: `terragrunt state pull > backup.tfstate`
    You can use this to rollback the state to before you attempted the migration with the
    following command: `terragrunt state push "$(pwd)/backup.tfstate"`.

    - NOTE: Make sure to use the Terraform version that is required for your module, as specified in the
      [required_version](https://www.terraform.io/docs/language/settings/index.html#specifying-a-required-terraform-version)
      configuration of the module.

4.  Modify the `terragrunt.hcl` file to be compatible with the Service Catalog:

    - Change the `include` path to `find_in_parent_folders("terragrunt_service_catalog.hcl")`. This ensures that you use the
      Service Catalog compatible root config you created in the previous step.

    - Change the `terraform.source` attribute to point to the corresponding Terraform module in the
      `terraform-aws-service-catalog` repo. When updating the source, make sure to set the ref to target `v0.35.5`, unless otherwise noted down below in [Appendix: Dedicated service migration guides](#service_migration_guides).

    Explanation

    This migration guide targets `v0.35.5` of the Service Catalog, unless otherwise noted down below in [Appendix: Dedicated service migration guides](#service_migration_guides). Newer versions may require additional state migrations
    that are not covered by the automated scripts. If you wish to update further, first update to `v0.35.5` and then read
    the migration guides in the release notes of the Service Catalog to bump beyond that version.

    - Find the [dedicated service migration guide](#service_migration_guides) for the service.

    - Using that guide, update the inputs to adapt to the Service Catalog Terraform module.

    - You can use `terragrunt validate-inputs` as a sanity check.

    - Remove the `dependencies` block, if any.

    - Use `dependency` blocks. Use [the dedicated service migration guide](#service_migration_guides) as a reference for what dependency blocks are needed.

    - Add new required inputs, using `dependency` references as needed.

    - Remove or rename unused variables.

    - Ensure you include inputs for backward compatibility mentioned in the dedicated guide!

5.  Run `terragrunt state list` to sanity check the state backend configuration. Watch for the following:

    - You should NOT get any prompts from Terragrunt to create a new S3 state bucket. If you get the prompt, this means that
      either you are authenticating to the wrong account, or that the bucket name was misconfigured in the root
      `terragrunt_service_catalog.hcl` file.

    - You should see resources listed in the state. If the command returns nothing, that means you are not properly linked
      to the old state file. Double check the `key` attribute of the `remote_state` block in the root
      `terragrunt_service_catalog.hcl` config.

6.  Once you verify the state backend configuration is valid, perform the state migration operations:

    1.  **Run the provided migration script** for the service. Not all services have a migration script. Refer to the
        [dedicated service migration guide](#service_migration_guides) for the script to run.

    2.  **Sanity check the migration operation** by running `terragrunt plan`. If the guide states that the upgrade is fully
        backward compatible, then you should only see backward compatible changes (only `~` or `+` operations, not `-`
        operations). Otherwise, expect some destroys.

        - NOTE: If you run into any errors related to code verification during provider plugin initialization, you will need to
          update to the latest terraform patch version that contains the latest terraform GPG key to sign the providers. When
          updating the terraform version, you also need to run `terragrunt init` to reinitialize the providers. The
          following lists the minimum patch version that includes the latest GPG key:

          - [0.11.15](https://github.com/hashicorp/terraform/releases/tag/v0.11.15)

          - [0.12.31](https://github.com/hashicorp/terraform/releases/tag/v0.12.31)

          - [0.13.7](https://github.com/hashicorp/terraform/releases/tag/v0.13.7)

          - [0.14.11](https://github.com/hashicorp/terraform/releases/tag/v0.14.11)

          - [0.15.1](https://github.com/hashicorp/terraform/releases/tag/v0.15.1)

7.  Once you’re satisfied with the plan, roll out the changes using `terragrunt apply`.

8.  If the service has downstream dependencies, run `terragrunt validate-all` from the ACCOUNT directory to identify any
    outputs that have changed. Fix the output references on the `dependency` block for each error.



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"5b2ebbe85dae9b997221ecbb7cefa06b"}
##DOCS-SOURCER-END -->
