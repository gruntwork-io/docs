# Using module defaults in an infrastructure unit

## Infrastructure units

An infrastructure unit is the Gruntwork term for the deployment of an infrastructure as code module in a single environment. For example, deploying the [`vpc-app`](../../../reference/modules/terraform-aws-vpc/vpc-app/) module in your development AWS account is a single infrastructure unit.

In this section, we’ll walk through the approach we employ at Gruntwork for leveraging defaults modules as infrastructure units. When you purchase a DevOps Foundation, the generated repository containing your infrastructure as code is automatically laid out to use this approach.

## The Terraform block

Gruntwork recommends that infrastructure unit definitions contain a `terraform` block, in addition the the `terraform` block in the underlying module defaults module. This allows users to change module versions granularly across environments, rather than changing a global value and updating all of your environments at once.

To ensure that we’re using the same module as the module defaults module, we can reference the `source_base_url` value from the defaults module `include` block (which we’ll learn more about in the next section), then specify the release version after `ref`. In the example below, we reference the `base_source_url` from our defaults module, then override the version to `v0.47.0`.

```hcl title=/dev/us-east-1/dev/networking/vpc/terragrunt.hcl
terraform {
  source = "${include.Module Defaults.locals.source_base_url}?ref=v0.104.19"
}
```

## Including the Module Defaults module

Including a defaults module requires using an [`include`](https://terragrunt.gruntwork.io/docs/features/keep-your-terragrunt-architecture-dry/#using-exposed-includes-to-override-common-configurations) block. This allows you to use or override any default values and reference locals in the defaults module.

For example, this `include` block references a defaults module in `_module_defaults/networking/vpc-app.hcl`. We need to set `expose = true` in the block to allow referencing the `locals` block in the Module Defaults module.

```hcl title=/dev/us-east-1/dev/networking/vpc/terragrunt.hcl
include "Module Defaults" {
  path = "${dirname(find_in_parent_folders())}/_module_defaults/networking/vpc-app.hcl"
  # We want to reference the variables from the included config in this configuration, so we expose it.
  expose = true
}
```

Note that we’re using the built-in terragrunt function [`find_in_parent_folders()`](https://terragrunt.gruntwork.io/docs/reference/built-in-functions/#find_in_parent_folders) to find the root directory of the repository, then specifying the path to the Module Defaults module from there.

## Specifying Dependencies

[Dependencies](https://terragrunt.gruntwork.io/docs/reference/config-blocks-and-attributes/#dependency) are a Terragrunt concept that allow you to specify that certain other infrastructure units must be applied before this one. Dependencies can be leveraged regardless of the source of the underlying module. This means that an infrastructure unit that uses a defaults module can reference dependencies the same way as an infrastructure unit that does not.

For example, say you needed to add a dependency block that specified a KMS key that is defined in the parent directory of the vpc, must exist before we can apply our example infrastructure unit.

```hcl title=/dev/us-east-1/dev/networking/kms/terragrunt.hcl
dependency "kms" {
    config_path = "../kms"
}
```

## Using Locals

Like Dependencies, [Locals](https://terragrunt.gruntwork.io/docs/features/locals/) are a Terragrunt concept that allow you to bind a name to an expression. Locals are a useful tool when leveraging the module defaults pattern to set environment specific values, like CIDR blocks, resource name prefixes, and more.

Continuing our vpc-app example, we could specify the CIDR block in a local.

```hcl title=/dev/us-east-1/dev/networking/vpc/terragrunt.hcl
locals {
  cidr_block = "10.0.0.0/16"
}
```

## Overriding Inputs

Inputs allow you to pass in values to the underlying module specified in the `include` block. This is where the module defaults pattern shows it convenience and helps to keep your code clean and DRY.

Inputs specified in an input block are passed into the `include` block and override default values set in the underlying module. This allows you, a module consumer, to reduce the amount of code you need to use to leverage a module.

Continuing our VPC app module example, say there were 20 required input variables to the Terraform module, but across all of your environments, there were only two input variables that needed to be set.

Without module defaults, each time a consumer wanted to leverage your module, they’d need to specify all 20 input variables, increasing the likelihood of getting a value wrong.

With module defaults, you can specify reasonable defaults for all values, then module consumers can override the two environment specific input variables. Not only does this reduce the amount of code consumers have to enter, it encourages code re-use, and reduces the likelihood of a user inputting the incorrect value for an input variable. For example, you may have an organization wide standard that a VPC always have at least three private and public subnets. With module defaults you can specify the three private and public subnets in your defaults module, then allow the user to override the CIDR block input variable per environment.

Finishing out the vpc-app example, we override the CIDR block for an environment specific VPC by specifying the `cidr_block` input variable in the `inputs` block and provide the value we specified in the `locals` block.

```hcl title=/dev/us-east-1/dev/networking/vpc/terragrunt.hcl
inputs = {
  cidr_block = local.cidr_block
}
```


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "6ac7ae9850a1d6c9a5f32308ab0b81d3"
}
##DOCS-SOURCER-END -->
