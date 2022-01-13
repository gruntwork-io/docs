---
sidebar_label: DRYer Configuration (optional)
---

# Even DRYer configuration

:::note

This step outlines optional optimizations.

:::

This guide takes a conservative approach to refactoring the Terragrunt configurations. However, there are additional
Terragrunt features that can be leveraged to further DRY your configuration. Note that these features requires a bit
more planning and thinking than a step by step tutorial can offer, and thus we cannot provide a step by step tutorial
as we offered above. Instead, we will describe the feature that Terragrunt offers with an example, and you can use that
as a guide to identify further blocks and attributes that can be moved to the common component configuration.

- [Deep merge](#deep-merge)

- [Expose ](#expose-include)

## Deep merge

Terragrunt supports deep merging included configuration files. By default Terragrunt shallow merges the included
configuration, which means that keys that overlap are replaced instead of recursively merged. An included configuration
can be deep merged into the current configuration when the `merge_strategy` attribute is set to `"deep"`. During a
`deep` merge, the following happens:

- For simple types (e.g., `string` and `number`), the child overrides the parent.

- For lists, the two attribute lists are combined together in concatenation.

- For maps, the two maps are combined together recursively. That is, if the map keys overlap, then a deep merge is
  performed on the map value.

- For blocks, if the label is the same, the two blocks are combined together recursively. Otherwise, the blocks are
  appended like a list. This is similar to maps, with block labels treated as keys.

This allows you to define common settings for a complex input variable in the common component configuration, and have
the child only inject or override a subset of the attributes.

For example, the
[k8s-service](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/k8s-service)
Service Catalog Terraform module takes in the container image in the format:

```hcl
type = object({
  # Repository of the docker image (e.g. gruntwork/frontend-service)
  repository = string
  # The tag of the docker image to deploy.
  tag = string
  # The image pull policy. Can be one of IfNotPresent, Always, or Never.
  pull_policy = string
})
```

It is typical for only the `tag` attribute to be different across environments. In the guide, you would have to repeat
this configuration across the environments, but with deep merge, you can promote the `repository` and `pull_policy`
attributes to the common component configuration:

```hcl title="common component configuration"
inputs = {
  container_image = {
    repository  = "gruntwork/aws-sample-app"
    pull_policy = "IfNotPresent"
  }
}
```

```hcl title="dev configuration"
include "parent" {
  path           = "/path/to/parent/configuration"
  merge_strategy = "deep"
}

inputs = {
  container_image = {
    tag = "v0.0.4"
  }
}
```

```hcl title="stage configuration"
include "parent" {
  path           = "/path/to/parent/configuration"
  merge_strategy = "deep"
}

inputs = {
  container_image = {
    tag = "v0.0.3"
  }
}
```

In this way, you can leverage deep merge to refactor complex nested inputs in your Terragrunt configuration to further
DRY up the config.

## Expose `include`

Terragrunt offers the ability to reference values defined in parent configurations through exposed includes. This
feature is enabled when the `expose = true` attribute is set on the `include` block. Exposed `include` blocks allow the
child configuration to reference values that are defined in the parent configuration. These values are available with
the reference `include.LABEL`.

This is most useful to reference `locals` that are defined in the common component configuration to reuse them in the
child.

For example, if you wanted to test a new version of the module only in dev:

```hcl title=common component configuration
locals {
  source_base_url = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/networking/vpc"
}

terraform {
  source = "${local.source_base_url}?ref=v0.65.0"
}
```

```hcl title=dev configuration
include "parent" {
  path   = "/path/to/parent/configuration"
  expose = true
}

terraform {
  source = "${include.parent.locals.source_base_url}?ref=v0.66.0"
}
```

Note that the availability of values is subject to the
[configuration parsing
order](https://terragrunt.gruntwork.io/docs/getting-started/configuration/#configuration-parsing-order) of Terragrunt.
This means that you won’t be able to reference later stage values in early stage blocks, like accessing parent `inputs`
in a child configuration’s `locals` block, or referencing a parent `dependency` output in a child configuration’s
`locals`.

You can work around some of this limitation by packing values in the parent configuration’s `inputs`. Terragrunt passes
inputs to Terraform in a way that Terraform ignores input values that do not correspond to an existing variable in the
module.

For example, let’s say you want to expose a reference variable in the parent configuration that uses `dependency`
blocks so that you can access it in the child configuration. To do this, you can create a private input value in the
parent configuration that references the `dependency`, e.g.:

```hcl title=common component configuration
dependency "vpc" {
  config_path = "../vpc"
}

inputs = {
  # This input variable is for convenience only and is not defined in the underlying Terraform module.
  # We use _ to mark it as "private" and decrease the likelihood of accidentally using a defined variable here.
  _vpc_id = dependency.vpc.outputs.vpc_id
}
```

You can then access the `_vpc_id` input variable in the child configuration by using an exposed `include` block (under
the reference, `include.PARENT.inputs._vpc_id`), like so:

```hcl title=dev configuration
include "parent" {
  path   = "/path/to/parent/configuration"
  expose = true
}

inputs = {
  network_configuration = {
    vpc_id = include.parent.inputs._vpc_id
  }
}
```

Note that since the `dependency` reference is in the `inputs` attribute, you can only reference it in the child
configuration’s `inputs` attribute. You cannot configure a `locals` block in the child that accesses the parent
`inputs` attribute.

However, in this way, you can bind references in the parent configuration that are then exposed in the child for use in
the `inputs` attribute even if it references `dependency` blocks.
