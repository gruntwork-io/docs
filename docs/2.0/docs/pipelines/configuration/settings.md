# Pipelines Configuration

[Full Pipelines Configuration Reference](/docs/2.0/reference/pipelines/configurations.md)

import PipelinesConfig from '/docs/2.0/reference/pipelines/language_auth_partial.mdx'

<PipelinesConfig />


## Terraform & OpenTofu

You can customize whether to invoke Terraform or OpenTofu in your Pipeline via the [tf-binary](/2.0/reference/pipelines/configurations#tf-binary) configuration. The version of the `tf-binary` and Terragrunt are configured via [mise.toml](/2.0/reference/pipelines/configurations#example-mise-configuration) inside your repository