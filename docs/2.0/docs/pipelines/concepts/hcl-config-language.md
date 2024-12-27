# Primer on HCL Terminology

HCL is an extensible configuration language created by HashiCorp. For the full specification, see [this document](https://github.com/hashicorp/hcl/blob/main/hclsyntax/spec.md).


Example:
```hcl
environment "an_environment" {
  filter {
    paths = ["an-environment/*"]
  }
}
```

The key terminology to understand the documentation below includes:

### Blocks

A block is a collection of nested configurations defined within curly braces `{}`, immediately following the block's identifier.

For example, a `filter` block is nested within the `environment` block in the example above.

Blocks can be one of three types: `bare`, `labeled`, or `fully qualified`.

- The `filter` block in the example is a `bare` block, as it lacks additional qualification or labeling beyond its name, `filter`.

- The `environment` block is a `labeled` block, with `an_environment` as its label.

- Most Terraform configurations use `fully qualified` blocks, which include both a type and a label. For instance, `resource "aws_instance" "my_instance" { ... }` has a type of `aws_instance` and a label of `my_instance`.


### Attributes

An attribute is a key-value pair separated by `=` and defined within a block.

For example, the `paths` attribute is defined within the `filter` block in the example above.


### Labels

A label is one or more strings used to qualify a block.

For example, the `an_environment` label qualifies the `environment` block in the example above.

