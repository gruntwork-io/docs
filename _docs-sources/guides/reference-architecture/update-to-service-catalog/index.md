# How to update your Reference Architecture to use the Gruntwork Service Catalog

This guide walks you through how to update v1.0 of the [Gruntwork Reference
Architecture](https://gruntwork.io/reference-architecture/), which uses a private `infrastructure-modules` repo, to v2.0, which uses the
[Gruntwork
Service Catalog](https://blog.gruntwork.io/introducing-the-gruntwork-module-service-and-architecture-catalogs-eb3a21b99f70). The Gruntwork Service Catalog is a set of dozens of highly configurable, battle-tested,
production-grade _services_ that you can deploy off-the-shelf without writing any code. Many modules offered in the
`infrastructure-modules` repository of the Gruntwork Reference Architecture are fully replaced with the Service Catalog,
eliminating the need to maintain snapshots of the Services in your own repository.

:::note

Dedicated guide for updating Landing Zone and Gruntwork Pipelines haven't been written yet. Until then, please consult [this guide on adopting the Landing Zone](https://gruntwork.io/guides/foundations/how-to-configure-production-grade-aws-account-structure/) and the [Gruntwork Pipelines deployment guide](https://gruntwork.io/guides/automations/how-to-configure-a-production-grade-ci-cd-setup-for-apps-and-infrastructure-code/).

:::

## Core Concepts

On August 26th, 2020, we announced the initial release of
[the Service
Catalog](https://blog.gruntwork.io/introducing-the-gruntwork-module-service-and-architecture-catalogs-eb3a21b99f70) in a private, invite-only alpha program. Since then we have expanded the catalog to be generally available,
with all Gruntwork subscribers getting access to the services of the catalog. A _service_ includes everything you need
in production, including the Terraform code for provisioning, Packer templates or Dockerfiles for configuration
management, built-in monitoring (metrics, logging, alerting), built-in security features (SSH access, secrets
management, server hardening, encryption in transit and at rest), and so on. This allows you to deploy infrastructure
without writing any code.

Prior to the release of the Service Catalog, the Gruntwork Reference Architecture included a customized set of services
in the form of a private `infrastructure-modules` repository for each customer. These services required continuous
maintenance from the end users to keep up to date with each change, including updating module references when new
versions were released.

Now with the Service Catalog, there is no longer a need to maintain a separate service module for every component you use.
Instead, you can rely on the battle tested, Gruntwork maintained service module in the Service Catalog!

If you haven’t made any modifications to a service since receiving the Reference Architecture, we recommend updating
your `infrastructure-live` configuration to use the service modules from the Service Catalog instead of using and
maintaining your copy in `infrastructure-modules`. Using the Service Catalog directly has several advantages:

- Keep up to date with module releases with a single version bump in your Terragrunt live configuration, as opposed to
  updating each module block reference.

- Update to a new, backward incompatible Terraform version with a single version bump as well. No need to track backward
  incompatible syntactical changes in Terraform!

- Rely on Gruntwork to provide feature updates and bug fixes to the services.

Though the Service Catalog fully replaces the services defined in your `infrastructure-modules` repository, there are
some differences that require you to make modifications to Terragrunt configurations in your `infrastructure-live`
repository before you can start using the Service Catalog.

## Deployment Walkthrough

Your goal in this walkthrough is to replace references to `infrastructure-modules` with `terraform-aws-service-catalog`,
within your `infrastructure-live` repo. You will follow a two-step process:

1. Prepare your Terragrunt `infrastructure-live` configuration to support the Service Catalog
2. Update each Terragrunt live configuration to use the Service Catalog

This guide assumes a minimum Terragrunt version of
[0.28.18](https://github.com/gruntwork-io/terragrunt/releases/tag/v0.28.18). If you are using an older Terragrunt version,
be sure to update to at least this version first.

You can also watch [a video walkthrough of a single module update.](https://www.youtube.com/watch?v=EHPKifjviR8)

### Step 1: Prepare your Terragrunt configuration to support the Service Catalog

The Terraform modules in the Service Catalog are missing some required blocks for Terraform to operate (e.g., the
`provider` and `terraform` state backend blocks). This is by design, to allow the modules to be flexibly used in
different contexts (unlike the `infrastructure-modules` modules which are only intended to be used in the Terragrunt
context). As such, you need to inject these required blocks to use advanced features of Terragrunt. Here we define a new
root `terragrunt.hcl` configuration that includes these directives so that we can continue to use the original,
non-Service Catalog based live configuration.

For reference, you can download the [refarch-folder-structure](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/releases/tag/v0.0.1-20210527)
zip file which contains all the following files in their respective locations in the folder structure. You can copy
these files into your own `infrastructure-live` repository.

1.  Create a new file `terragrunt_service_catalog.hcl` at the root of the `infrastructure-live` repository. We name this
    differently from the existing `terragrunt.hcl` so that the modules that haven’t migrated yet won’t be affected.

2.  Insert the following contents:

    ```hcl
    # ---------------------------------------------------------------------------------------------------------------------
    # TERRAGRUNT CONFIGURATION
    # ---------------------------------------------------------------------------------------------------------------------

    locals {
      common_vars  = read_terragrunt_config(find_in_parent_folders("common.hcl"))
      account_vars = read_terragrunt_config(find_in_parent_folders("account.hcl"))

      # Optional: Update to use HCL instead of YAML
      region_vars  = yamldecode(file(find_in_parent_folders("region.yaml")))

      name_prefix    = local.common_vars.locals.name_prefix
      account_name   = local.account_vars.locals.account_name
      account_id     = local.account_vars.locals.account_id
      default_region = local.common_vars.locals.default_region
      aws_region     = local.region_vars["aws_region"]
    }

    # ----------------------------------------------------------------------------------------------------------------
    # GENERATED PROVIDER BLOCK
    # ----------------------------------------------------------------------------------------------------------------

    generate "provider" {
        path      = "provider.tf"
        if_exists = "overwrite_terragrunt"
        contents  = <<EOF
    provider "aws" {
        region = "${local.aws_region}"
        version = ">= 3.13.0"
        # Only these AWS Account IDs may be operated on by this template
        allowed_account_ids = ["${local.account_id}"]
    }
    EOF
    }

    # ----------------------------------------------------------------------------------------------------------------
    # GENERATED REMOTE STATE BLOCK
    # ----------------------------------------------------------------------------------------------------------------

    # Configure Terragrunt to automatically store tfstate files in an S3 bucket
    remote_state {
        backend = "s3"
        config = {
        encrypt        = true
        bucket         = "${local.name_prefix}-${local.account_name}-terraform-state"
        region         = local.default_region
        dynamodb_table = "terraform-locks"
        # To ensure that the state paths are the same as before, we drop the account folder (the first path element)
        # which is now included in the relative path.
        key            = trimprefix("${path_relative_to_include()}/terraform.tfstate", "${local.account_name}/")
        }
        generate = {
        path      = "backend.tf"
        if_exists = "overwrite_terragrunt"
        }
    }

    # ---------------------------------------------------------------------------------------------------------------------
    # GLOBAL PARAMETERS
    # These variables apply to all configurations in this subfolder. These are automatically merged into the child
    # `terragrunt.hcl` config via the include block.
    # ---------------------------------------------------------------------------------------------------------------------

    inputs = {
        # Many modules require these two inputs, so we set them globally here to keep all the child terragrunt.hcl files more
        # DRY
        aws_account_id = local.account_id
        aws_region     = local.aws_region
    }
    ```

    #### Explanation

    In the non-Service Catalog flavor of the Reference Architecture, we had a root configuration for each account to ensure
    that we can create a different state bucket for each account. While this isn’t necessary for the Service Catalog, we
    switch to a single root `terragrunt.hcl` config here (which is possible due to the advanced functions that are available
    in newer Terragrunt versions) because there are more common blocks that are necessary, and we want to keep these
    blocks DRY.

    To support the new requirements of the Service Catalog, we also introduce two code generation configuration:

    - `generate "provider"`: Uses the terragrunt
      [code
      generation](https://terragrunt.gruntwork.io/docs/features/keep-your-terraform-code-dry/#dry-common-terraform-code-with-terragrunt-generate-blocks) feature to inject the provider block into the module prior to invoking terraform.

    - `generate` attribute of the `remote_state` block: Similar to the provider block generation, this attribute injects the
      `terraform.backend` configuration.

    Finally, we introduce a `locals` block to define references that can be reused throughout the configuration. Note that
    for new commonly used variables, we use `read_terragrunt_config` instead of `yamldecode(file())` to allow for use of
    terragrunt functions in the config.

    Note that the suggested config continues to use the `region.yaml` data file to simplify the migration process. You can
    optionally update this file to `hcl` for consistency.

3.  Create new data files for the root config (these are the files that are read in in the `locals` blocks):

    - In the root of the `infrastructure-live` repository, add a `common.hcl` file with the following contents:

    ```hcl
    locals {
      # TODO: A unique name prefix to set for all infrastructure resources created in your accounts.
      name_prefix = ""
      # TODO: the default AWS region to use. This should be the same as where the terraform state S3 bucket is
      # currently provisioned.
      default_region = ""
    }
    ```

    - In each account folder (e.g., `infrastructure-live/dev` or `infrastructure-live/shared`), add a file named
      `account.hcl` with the following contents:

    ```hcl
    locals {
      # TODO: Update with the actual information for each account
      # The user friendly name of the AWS account. Usually matches the folder name.
      account_name = ""
      # The 12 digit ID number for your AWS account.
      account_id = ""
    }
    ```

    - (optional) If you wish to replace your yaml variable files with HCL, in each region folder (e.g.,
      `infrastructure-live/dev/us-east-2`), add a file named `region.hcl` with the following contents:

    ```hcl
    locals {
      # TODO: enter the region to use for all resources in this subfolder.
      aws_region = ""
    }
    ```

    Note that you will want to have a `region.hcl` file for the `_global` folder as well. In this case, set the `aws_region`
    to `us-east-1`.

4.  Create migration helper scripts (these are used by the Gruntwork Service Catalog Terraform state migration bash
    scripts):

    1.  Create a new directory `_scripts` at the root of the `infrastructure-live` repository.

    2.  Create a new file `migration_helpers.sh` in the newly created `_scripts` folder and paste in the following contents:

        ```bash
        #!/usr/bin/env bash
        # Helper functions for implementing state migrations for updating terraform modules to newer versions.

        function log {
          >&2 echo -e "$@"
        }

        # find_state_address uses the provided query string to identify the full resource address to use in the state file.
        function find_state_address {
          local -r query="$1"

          log "Identifying real state address of $query"
          terragrunt state list \
            | grep -E "$query" || true
        }

        # strip_bash_color will strip out bash color/bold escape sequences.
        function strip_bash_color {
          local -r input="$1"
          # Based on this stack overflow post: https://stackoverflow.com/questions/6534556/how-to-remove-and-all-of-the-escape-sequences-in-a-file-using-linux-shell-sc.
          # None of the sed calls worked to completely strip of the escape sequences by itself, but the following combination worked.
          echo "$input" | cat -v | sed 's/\^\[\[[10]m//g'
        }

        # Check that the given binary is available on the PATH. If it's not, exit with an error.
        function assert_is_installed {
          local -r name="$1"
          local -r help_url="$2"

          if ! command -v "$name" > /dev/null; then
            log "ERROR: The command '$name' is required by this script but is not installed or in the system's PATH. Visit $help_url for instructions on how to install."
            exit 1
          fi
        }

        # Make sure that the hcledit utility is installed and available on the system.
        function assert_hcledit_is_installed {
          assert_is_installed 'hcledit' 'https://github.com/minamijoyo/hcledit#install'
        }

        # Make sure that the jq utility is installed and available on the system.
        function assert_jq_is_installed {
          assert_is_installed 'jq' 'https://stedolan.github.io/jq/download/'
        }

        # Move resources in a literal terraform state move. Unlike a simple terragrunt state mv call, this does error checking
        # to make sure the given state actually exists.
        function move_state {
          local -r original_addr="$1"
          local -r new_addr="$2"

          if [[ "$original_addr" == "$new_addr" ]]; then
            echo "Nothing to change. Skipping state migration."
            return
          fi

          if ! terragrunt state show "$original_addr" >/dev/null 2>&1; then
            echo "Original address $original_addr not found in state file. Nothing to change. Skipping state migration."
            return
          fi

          echo "Migrating state:"
          echo
          echo "    $original_addr =>"
          echo "      $new_addr"
          echo
          terragrunt state mv "$original_addr" "$new_addr"
        }

        # Move resources in terraform state using fuzzy matches.
        function fuzzy_move_state {
          local -r original_addr_query="$1"
          local -r new_addr="$2"
          local -r friendly_name="$3"

          log "Checking if $friendly_name needs to be migrated"

          local original_addr
          original_addr="$(find_state_address "$original_addr_query")"

          if [[ -z "$original_addr" ]] || [[ "$original_addr" == "$new_addr" ]]; then
            echo "Nothing to change. Skipping state migration."
          else
            echo "Migrating state:"
            echo
            echo "    $original_addr =>"
            echo "      $new_addr"
            echo
            terragrunt state mv "$original_addr" "$new_addr"
          fi
        }

        # The following routine extracts a resource attribute.
        function extract_attribute {
          local -r address="$1"
          local -r resource_basename="$2"
          local -r attribute="$3"

          local state
          state="$(terragrunt state show "$address")"
          local state_nocolor
          state_nocolor="$(strip_bash_color "$state")"

          echo "$state_nocolor" \
            | hcledit attribute get "$resource_basename"."$attribute" \
            | jq -r '.'
        }

        # Move resources in terraform state using an import call instead of state mv. This is useful when moving resources
        # across aliased resources (e.g., aws_alb => aws_lb).
        function fuzzy_import_move_state {
          local -r original_addr_query="$1"
          local -r new_addr="$2"
          local -r resource_basename="$3"
          local -r friendly_name="$4"

          log "Checking if $friendly_name needs to be migrated."
          local original_addr
          original_addr="$(find_state_address "$original_addr_query")"
          if [[ -z "$original_addr" ]]; then
            log "$friendly_name is already migrated. Skipping import."
            return
          fi

          log "$friendly_name needs to be migrated"

          log "Identifying $friendly_name ID to import into new resource."
          local resource_id
          resource_id="$(extract_attribute $original_addr $resource_basename "id")"

          if [[ -z "$resource_id" ]]; then
            log "ERROR: could not identify $friendly_name ID to import."
            exit 1
          fi

          log "Importing $friendly_name to new resource:"
          log
          log "    ID:           $resource_id"
          log "    ResourceAddr: $new_addr"
          terragrunt import "$new_addr" "$resource_id"

          log "Removing old $friendly_name state."
          terragrunt state rm "$original_addr"
        }

        # This function migrates the original list into a new map at the original address.
        # First it moves each item in the list into a new map.
        # Then it moves the new map back to the original address.
        # The keys of the new map correspond to the value of the attribute that is passed into `attribute`.
        # We look up this value in the function.
        function move_state_list_to_map {
          local -r original_addr="$1"
          local -r attribute="$2"

          # Move the list to a temporary map
          local map_addr
          map_addr="$1_tmp"

          # Pull the full list of addresses in the original_addr (aws_ecr_repository.repos[0], aws_ecr_repository.repos[1], etc)
          local list_addresses
          list_addresses="$(find_state_address "$original_addr")"
          for addr in $list_addresses
          do
            # Extract the attribute that will be the new key in the map.
            local key
            key="$(extract_attribute "$addr" "resource.$original_addr" "$attribute")"
            echo "Migrating state:"
            echo
            echo "    $addr =>"
            echo "      $map_addr[$key]"
            echo
            # Move the resource to the new temporary map address.
            terragrunt state mv "$addr" "$map_addr[\"$key\"]"
          done

          # Move the temporary map back to the original address, now as a map
          terragrunt state mv "$map_addr" "$original_addr"
        }

        # This function migrates a list to a new list with a different name.
        function fuzzy_move_list {
          local -r original_list="$1"
          local -r new_list="$2"
          local -r friendly_name="$3"

          log "Checking if $friendly_name needs to be migrated"

          if [[ -z "$original_list" ]] || [[ "$original_list" == "$new_list" ]]; then
            echo "Nothing to change. Skipping state migration."
          else
            local original_addrs
            original_addrs="$(find_state_address "$original_list")"
            for addr in $original_addrs
            do
              local new_addr
              new_addr="$(
                echo "$addr" \
                  | sed "s/$original_list/$new_list/"
              )"
              echo "Migrating state:"
              echo
              echo "    $addr =>"
              echo "      $new_addr"
              echo
              terragrunt state mv "$addr" "$new_addr"
            done
          fi
        }
        ```

### Step 2: Update each Terragrunt live configuration to use the Service Catalog

At this point, you are ready to update each live configuration! It’s important to take a bottom-up approach for migrating
the live configurations. That is, update live configurations that don’t have any downstream dependencies first, then
work your way up the dependency graph.

This ensures that:

- Each update is self contained. Changing the live configuration of leaf services will not affect other live
  configurations, allowing you to continue to make changes to un-migrated live configurations.

- The migration is low risk. The leaf nodes in the Terragrunt infrastructure graph tend to be lower risk services.
  That is, the closer you are to the root of the graph, the higher the number of things that depend on that infrastructure,
  which gives that service a larger surface area. E.g., VPC has many downstream dependencies, which means that messing it
  up can cause lots of other services to fail.

However, this does mean that you will need to update previously migrated services if the upstream services
has a change. For example, Service Catalog services sometimes have output name changes, which means that you will need
to update the references in the downstream services when you update the service.

To handle this, you can identify all the downstream services that are affected by running `terragrunt validate-all` to
identify these broken links each time a service is updated, and fix them in the same PR.

Don’t worry — we’re going to walk you through every step right now. At a high-level, here’s what you’ll do:

1.  Choose a service.
1.  Refer to the dedicated guide for that service.
1.  Backup the state file.
1.  Modify the `terragrunt.hcl` live configuration for it, following the guide.
1.  Validate the backend configuration with `terragrunt state list`.
1.  Validate the inputs with `terragrunt validate-inputs`.
1.  Run the state migration script, if any.
1.  Sanity check the changes with `terragrunt plan`.
1.  Roll out with `terragrunt apply`.

Some of the services, such as EKS and ASG, have slightly different steps to the above list, so please pay attention to that.

Now for the full-fledged instructions to upgrade a single service:

1.  Check the service’s downstream dependencies. Use the `graph-dependencies` command to create
    a visual representation. The arrow points from the leaf to the root, toward the dependency. Thus in the graph,
    the top nodes are leaf nodes and the bottom, root nodes.

    - `terragrunt graph-dependencies | dot -Tpng > graph.png`
    - If you get an error that `dot` is not available, install [graphviz](https://www.graphviz.org/download/), which
      installs the `dot` utility.

      ![Here is an example of a dependency tree for the `dev` account using Reference Architecture v1.](/img/guides/reference-architecture/update-to-service-catalog/ref-arch-v2-dep-tree.png)

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
      `terraform-aws-service-catalog` repo. When updating the source, make sure to set the ref to target `v0.35.5`, unless otherwise noted down below in [Appendix: Dedicated service migration guides](#appendix-dedicated-service-migration-guides).

    Explanation

    This migration guide targets `v0.35.5` of the Service Catalog, unless otherwise noted down below in [Appendix: Dedicated service migration guides](#appendix-dedicated-service-migration-guides). Newer versions may require additional state migrations
    that are not covered by the automated scripts. If you wish to update further, first update to `v0.35.5` and then read
    the migration guides in the release notes of the Service Catalog to bump beyond that version.

    - Find the [dedicated service migration guide](#appendix-dedicated-service-migration-guides) for the service.
    - Using that guide, update the inputs to adapt to the Service Catalog Terraform module.
    - You can use `terragrunt validate-inputs` as a sanity check.
    - Remove the `dependencies` block, if any.
    - Use `dependency` blocks. Use [the dedicated service migration guide](#appendix-dedicated-service-migration-guides) as a reference for what dependency blocks are needed.
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
        [dedicated service migration guide](#appendix-dedicated-service-migration-guides) for the script to run.

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

## Appendix: Dedicated service migration guides

These dedicated guides are meant to be used in tandem with the main detailed guide above. They are stored in the
`infrastructure-live-multi-account-acme` repository, which is now archived because it was used to share examples
of Reference Architecture 1.0. You can still interact with the archived repo, and use it to help you upgrade your
existing Reference Architecture.

:::info Exceptions to Service Catalog Versions

The following modules require a different version of the Service Catalog than `v0.35.5` to migrate properly:

- `route53-public`: `v0.32.0`

:::

- [ALB Service Migration Guide](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/blob/v0.0.1-20210527/_docs/_ref_arch_v1_to_v2_migration_guides/alb.adoc)
- [ASG Service Migration Guide](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/blob/v0.0.1-20210527/_docs/_ref_arch_v1_to_v2_migration_guides/asg.adoc)
- [Aurora Service Migration Guide](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/blob/v0.0.1-20210527/_docs/_ref_arch_v1_to_v2_migration_guides/aurora.adoc)
- [CloudTrail Service Migration Guide](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/blob/v0.0.1-20210527/_docs/_ref_arch_v1_to_v2_migration_guides/cloudtrail.adoc)
- [cloudwatch-dashboard Service Migration Guide](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/blob/v0.0.1-20210527/_docs/_ref_arch_v1_to_v2_migration_guides/cloudwatch-dashboard.adoc)
- [ecr-repos Service Migration Guide](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/blob/v0.0.1-20210527/_docs/_ref_arch_v1_to_v2_migration_guides/ecr-repos.adoc)
- [ecs-cluster Service Migration Guide](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/blob/v0.0.1-20210527/_docs/_ref_arch_v1_to_v2_migration_guides/ecs-cluster.adoc)
- [ecs-service-with-alb Service Migration Guide](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/blob/v0.0.1-20210527/_docs/_ref_arch_v1_to_v2_migration_guides/ecs-service-with-alb.adoc)
- [EKS Service Migration Guide](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/blob/v0.0.1-20210527/_docs/_ref_arch_v1_to_v2_migration_guides/eks.adoc)
- [iam-cross-account Service Migration Guide](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/blob/v0.0.1-20210527/_docs/_ref_arch_v1_to_v2_migration_guides/iam-cross-account.adoc)
- [iam-groups Service Migration Guide](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/blob/v0.0.1-20210527/_docs/_ref_arch_v1_to_v2_migration_guides/iam-groups.adoc)
- [iam-user-password-policy Service Migration Guide](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/blob/v0.0.1-20210527/_docs/_ref_arch_v1_to_v2_migration_guides/iam-user-password-policy.adoc)
- [Jenkins Service Migration Guide](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/blob/v0.0.1-20210527/_docs/_ref_arch_v1_to_v2_migration_guides/jenkins.adoc)
- [kms-master-key Service Migration Guide](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/blob/v0.0.1-20210527/_docs/_ref_arch_v1_to_v2_migration_guides/kms-master-key.adoc)
- [Memcached Service Migration Guide](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/blob/v0.0.1-20210527/_docs/_ref_arch_v1_to_v2_migration_guides/memcached.adoc)
- [OpenVPN Server Service Migration Guide](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/blob/v0.0.1-20210527/_docs/_ref_arch_v1_to_v2_migration_guides/openvpn-server.adoc)
- [RDS Service migration Guide](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/blob/v0.0.1-20210527/_docs/_ref_arch_v1_to_v2_migration_guides/rds.adoc)
- [Redis Service Migration Guide](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/blob/v0.0.1-20210527/_docs/_ref_arch_v1_to_v2_migration_guides/redis.adoc)
- [Route 53 (private) Migration Guide](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/blob/v0.0.1-20210527/_docs/_ref_arch_v1_to_v2_migration_guides/route53-private.adoc)
- [Route 53 (public) Migration Guide](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/blob/v0.0.1-20210527/_docs/_ref_arch_v1_to_v2_migration_guides/route53-public.adoc)
- [sns-topics Service Migration Guide](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/blob/v0.0.1-20210527/_docs/_ref_arch_v1_to_v2_migration_guides/sns-topics.adoc)
- [VPC (app) Migration Guide](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/blob/v0.0.1-20210527/_docs/_ref_arch_v1_to_v2_migration_guides/vpc-app.adoc)
- [VPC (mgmt) Migration Guide](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/blob/v0.0.1-20210527/_docs/_ref_arch_v1_to_v2_migration_guides/vpc-mgmt.adoc)
