# Primer on HCL Terminology

HCL is an extensible configuration language developed by HashiCorp. See [this](https://github.com/hashicorp/hcl/blob/main/hclsyntax/spec.md) for the full specification.

Example:
```hcl
environment "an_environment" {
  filter {
    paths = ["an-environment/*"]
  }
}
```

The main terminology you need to know to understand the documentation below includes:

### Blocks

A block is a collection of nested configurations that are defined within curly braces `{}`, immediately after the identifier of the block.

A `filter` block is nested in the `environment` block in the example above.

Blocks come in three variants: `bare`, `labeled` or `fully qualified`.
<ul>
<li>The filter block in the above example is `bare` - it has no additional qualification or labelling beyond the name `filter.</li>

<li>The environment block is a `labeled` block, and its label is `an_environment`.</li>

<li>Most terraform you've seen uses `fully qualified` blocks that have both a type and a label. For example, `resource "aws_instance" "my_instance" { ... }` - in this case the type is `aws_instance` and the label is `my_instance`.</li>

</ul>
### Attributes

An attribute is a key-value pair separated by an `=` that is defined within a block.

The `paths` attribute is defined within the `filter` block in the example above.

### Labels

A label is one or more strings that are used to qualify a block.

The `an_environment` label is used to qualify the `environment` block in the example above.