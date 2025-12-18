# Pipelines Configuration

import PipelinesAuthPartial from '../reference/language_auth_partial.mdx'
import PipelinesLanguageTransitionPartial from '../reference/language_transition_partial.mdx'

<PipelinesLanguageTransitionPartial />
<PipelinesAuthPartial />

## OpenTofu & Terraform

You can specify whether to invoke OpenTofu or Terraform with Pipelines by configuring the [tf-binary](/docs/terragrunt-scale/pipelines/reference/configurations#tf-binary) setting. Define the versions of Terragrunt and OpenTofu/Terraform used by Pipelines in the [mise.toml](/docs/terragrunt-scale/pipelines/reference/configurations#example-mise-configuration) file within your repository.
