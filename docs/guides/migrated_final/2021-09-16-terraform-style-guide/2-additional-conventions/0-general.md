# General

## 2 space indentations

Block contents should be indented with 2 spaces.

## 120 column limit

We follow a 120 column line-length limit, except for description strings in `variable` and `output` blocks, where single
line strings are preferred.

## Block Labels, Variables, and Outputs should be snake case

The label for blocks should be in snake case. E.g. `example_instance` , not `ExampleInstance` or `example-instance`.

Labels are the strings that follow block names. For example, in the following, `aws_instance` and `example_instance`
are labels for the `resource` block.

```hcl
resource "aws_instance" "example_instance" {
  # Omitted for brevity
}
```

This includes variables and outputs as well:

```hcl
variable "vpc_id" {}
output "instance_name" {}
```

## Module folder conventions

Each module repo should have the following 3 folders:

- `modules`: Terraform modules that are designed to be consumed by users. The intention is that users should pull the
  modules in the `modules` folder in their terraform code using `module` blocks.

- `examples`: Folder that contains top level Terraform modules that provide an example of how to use the modules in the
  `modules` folder. The `examples` folder often has subfolders `for-learning-and-testing` and `for-production` that contain
  corresponding example code. See [Testing: Terratest](#testing) for more info on how these examples should be organized.

- `test`: Terratest Go files for testing the code in the repo. See [Testing: Terratest](#testing) for specific conventions around Terratest.

Additionally, each module in `modules` should be organized with the following files:

- `variables.tf`: All `variable` blocks should go in here and they specify the inputs.

- `outputs.tf`: All `output` blocks should go in here and they specify the outputs.

- `main.tf`: All other logic should be added here.

- `dependencies.tf` (optional): Any external references that are pulled in by a `data` source block should go in here.
  This allows consumers of the module to quickly scan for what resources need to already exist to deploy the module.

Any nonstandard file structure should be called out in the README (e.g., if `main.tf` is split up into multiple smaller
terraform files).

## `variables.tf` conventions

Each variable block should always define a `description` and `type`, even if it is of the `string` type (the default), in that order. E.g.:

```hcl
variable "example" {
  description = "This is an example"
  type        = string
  default     = "example"  # NOTE: this is optional
}
```

#### Complex types

Prefer concrete objects ([object type](https://www.terraform.io/docs/configuration/types.html#structural-types)) over
free form maps. However, for particularly large objects it is useful to support optional attributes. This is currently
[not supported in terraform](https://github.com/hashicorp/terraform/issues/22449), so workaround by using `any` type.

When using `any` type, always use comments to describe the supported attributes.
[Example](https://github.com/gruntwork-io/module-security/blob/da69690/modules/kms-master-key/variables.tf#L10).

## `outputs.tf` conventions

Each output block should always define a `description`, before the `value`:

```hcl
output "greeting" {
  description = "This is a greeting for everyone."
  value       = "hello world!"
}
```

## `main.tf` conventions

`main.tf` should (loosely) be organized by sections that correspond to components. There is no standard on grouping, but
as a rule of thumb each section should be focused on a specific component of the module. For example, an ECS service
module may consist of the following sections:

- The ECS service resource, and any locals logic for setting up the attributes of the resource.

- The ECS task definition resource, and any locals and template logic for setting up the attributes of the resource
  (e.g. the container definition).

- Any resources related to configuring ELBs to forward traffic to the ECS service (e.g., listeners and target groups).

- Any resources related to configuring IAM permissions for the ECS service.

- Any resources related to configuring network access (e.g., security group rules) for the ECS service.

There is no standard on ordering the sections, but as a rule of thumb the following sections should be placed first, in order:

- Version constraints for the module

- Provider blocks, if needed.

- The main component of the module (e.g., the `aws_ecs_service` resource for the ECS service module).

- All other sections.

- Any `data` blocks (at the bottom).

## Conditionals

Use `()` to break up conditionals across multiple lines.

Examples:

```hcl
locals {
  elb_id = (
    var.elb_already_exists
    ? var.elb_id
    : module.elb.elb_id
  )

  excluded_child_account_ids = (
    var.config_create_account_rules
    ? []
    : [
      for account_name, account in module.organization.child_accounts
      : account.id if lookup(lookup(var.child_accounts, account_name, {}), "enable_config_rules", false) == false
    ]
  )
}
```



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"113ccb06706c45ccf21ddafa2d0a551e"}
##DOCS-SOURCER-END -->
