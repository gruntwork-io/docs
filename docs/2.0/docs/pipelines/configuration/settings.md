# Pipelines Configuration

[Full Pipelines Configuration Reference](/docs/2.0/reference/pipelines/configurations.md)

import PipelinesConfig from '/docs/2.0/reference/pipelines/language_auth_partial.mdx'

<PipelinesConfig />

## Terraform & OpenTofu

You can specify whether to invoke Terraform or OpenTofu in your Pipeline by configuring the [tf-binary](/2.0/reference/pipelines/configurations#tf-binary) setting. Define the versions of `tf-binary` and Terragrunt in the [mise.toml](/2.0/reference/pipelines/configurations#example-mise-configuration) file within your repository.
