# Update to Terraform 12

This guide walks you through the steps you should take when upgrading your Reference Architecture deployment to Terraform 0.12.x and Terragrunt 0.19.x.

## Core Concepts

Terraform 0.12 (referred to as TF12) was released in May, 2019, and it included a few major changes:

1. A shift from HCL to HCL2 as the main syntax. This included support for first-class expressions (i.e., using variables
   and functions without having to wrap everything in `${...}`).
1. Some official providers have changed their syntax. For example, the `terraform_remote_state` data source now requires
   an `outputs` attribute to index into the outputs exported by the state.
1. More strict rules around what can go in a `.tfvars` file. In particular, any variable defined in a `.tfvars` file
   that does not match a corresponding `variable` definition in your `.tf` files produces an error.
1. Math behave differently. In particular, many functions that previously returned ints now return floats.
1. Bools behave differently, where they are no longer auto type casted to ints.

To be compatible with Terraform 0.12 changes, Terragrunt 0.19 (referred to as TG19) was released. Before version 0.19.0,
Terragrunt had you define its configuration in a `terragrunt = { ... }` variable in a `terraform.tfvars` file, but due
to item (1) this no longer works with Terraform 0.12 and newer.

To support this:

1. Terragrunt now defines and uses its own configuration file format: `terragrunt.hcl`. As a result of this, all the
   attributes and blocks that used to be defined under the `terragrunt` input in the `terraform.tfvars` file is now
   defined at the top level.
1. The `terragrunt.hcl` file:
   - Uses HCL2 syntax.
   - Is now more strict about the difference between blocks and attributes.
   - Supports all Terraform built-in functions in its config file.
   - Defines inputs to modules are using a new attribute (`inputs`).

This means that both the modules and the live config need to be updated in order to support TF12.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"18301a838452f27f0c74540894001124"}
##DOCS-SOURCER-END -->
