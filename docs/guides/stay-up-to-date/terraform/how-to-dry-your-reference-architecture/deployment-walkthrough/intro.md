# Update Approach

:::danger Prerequisite: Update Terragrunt to a compatible version

This guide assumes you are using Terragrunt version
[v0.35.0](https://github.com/gruntwork-io/terragrunt/releases/tag/v0.35.0) or newer, so that all bug fixes for multiple
include blocks are patched. Please upgrade to a compatible version prior to moving on in the guide.

:::

In this guide, we will walk through how you can leverage the multiple includes feature to consolidate common configuration
files for each component. The steps in this guide are intended to be generic so that they can apply to any component in
the Reference Architecture. This allows you to incrementally roll out your changes instead of updating all components at
once.

You can checkout the latest
[for-production
example](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production) of the Service Catalog to see what the DRY Reference Architecture looks like, and what we are aiming for. In
particular, the DRY version breaks down the common configuration into two tiers:

- **Root `terragrunt.hcl`**: Configurations common to all accounts and environments, such as the
  remote state and provider configuration.

- **One or more envcommon configurations**: Configurations common to the component across environments.
  Typically, this configuration will also contain all the `dependency` definitions. These configurations are all stored
  in the `_envcommon` folder.

Each live child configuration for the components merges these configurations together to get the final setup using
`include` blocks. For example, the child app VPC configuration ends up with the following `include` blocks,
combining both the `root` and `envcommon` includes:

```hcl
include "root" {
  path = find_in_parent_folders()
}

include "envcommon" {
  path = "${dirname(find_in_parent_folders())}/_envcommon/networking/vpc-app.hcl"
}
```


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"05542d29c57c912a1c745fa10f80a326"}
##DOCS-SOURCER-END -->
