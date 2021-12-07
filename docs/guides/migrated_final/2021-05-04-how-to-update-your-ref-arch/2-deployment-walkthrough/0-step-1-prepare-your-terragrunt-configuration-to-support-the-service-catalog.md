## Step 1: Prepare your Terragrunt configuration to support the Service Catalog

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

    Explanation

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

          locals {
            # TODO: A unique name prefix to set for all infrastructure resources created in your accounts.
            name_prefix = ""
            # TODO: the default AWS region to use. This should be the same as where the terraform state S3 bucket is
            # currently provisioned.
            default_region = ""
          }

    - In each account folder (e.g., `infrastructure-live/dev` or `infrastructure-live/shared`), add a file named
      `account.hcl` with the following contents:

          locals {
            # TODO: Update with the actual information for each account
            # The user friendly name of the AWS account. Usually matches the folder name.
            account_name = ""
            # The 12 digit ID number for your AWS account.
            account_id = ""
          }

    - (optional) If you wish to replace your yaml variable files with HCL, in each region folder (e.g.,
      `infrastructure-live/dev/us-east-2`), add a file named `region.hcl` with the following contents:

          locals {
            # TODO: enter the region to use for all resources in this subfolder.
            aws_region = ""
          }

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



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"3afcfc0fff1d32e339b09a06bda29528"}
##DOCS-SOURCER-END -->
