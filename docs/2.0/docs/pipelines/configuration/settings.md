# Pipelines Configuration

import PipelinesAuthPartial from '/docs/2.0/reference/pipelines/language_auth_partial.mdx'
import PipelinesLanguageTransitionPartial from '/docs/2.0/reference/pipelines/language_transition_partial.mdx'

<PipelinesLanguageTransitionPartial />
<PipelinesAuthPartial />

## OpenTofu & Terraform

You can specify whether to invoke OpenTofu or Terraform with Pipelines by configuring the [tf-binary](/2.0/reference/pipelines/configurations#tf-binary) setting. Define the versions of Terragrunt and OpenTofu/Terraform used by Pipelines in the [mise.toml](/2.0/reference/pipelines/configurations#example-mise-configuration) file within your repository.
