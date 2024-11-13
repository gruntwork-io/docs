---
# Display h2 to h4 headings
toc_min_heading_level: 2
toc_max_heading_level: 4
---

import { HclListItem, HclListItemExample, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '/src/components/HclListItem.tsx';

# Pipelines Configurations

:::note
Pipelines configurations are currently undergoing a transition from YAML configurations to new HCL [Configurations as Code](./configurations-as-code.md). These new configurations will offer a richer configuration experience, but are not yet required for use. YAML configurations will continue to work as expected for the time being.

YAML configurations are read by Pipelines when HCL configurations are not present, and the Pipelines binary falls back to interpretting YAML configurations as if they were defined in the HCL configuration system in this scenario.

This means that if you have a `.gruntwork/config.yml` file in your repository, you can continue to use it as you have been, and Pipelines will continue to work as expected.

If you do introduce any HCL configurations into your `.gruntwork` directory or introduce a `gruntwork.hcl` file into a directory, Pipelines will begin to use the HCL configuration system instead of the YAML configuration system.
:::

Pipelines behavior is primarily configured via a yaml file at `.gruntwork/config.yml` in your repository. Pipelines also reads [.mise.toml](/docs/2.0/docs/pipelines/previous-versions/upgrading-from-infrastructure-pipelines.md#adding-misetoml) at the root of the repository to determine what version of OpenTofu/Terraform and Terragrunt to use.

#### Example Mise Configuration
`./.mise.toml`
```
[tools]
opentofu = "1.7.2"
terragrunt = "0.67.16"
awscli = "latest"
```

## Pipelines Configuration Options


Configurations for `./.gruntwork/config.yml`:

### `pipelines` Options

The below options are all nested under the `pipelines` key in the `config.yml` file.

#### consolidate-added-or-changed

<HclListItem name="consolidate-added-or-changed" requirement="optional" type="boolean">
<HclListItemDescription>
When set to true enables consolidating added and changed units such that dependencies are respected.
</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
<HclListItemExample>

```yaml
pipelines:
  consolidate-added-or-changed: false
```

</HclListItemExample>
</HclListItem>

#### consolidate-deleted

<HclListItem name="consolidate-deleted" requirement="optional" type="boolean">
<HclListItemDescription>
When set to true enables consolidating deleted units such that dependencies are respected.
This is disabled by default as it may result in unexpected deletions.
</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
<HclListItemExample>

```yaml
pipelines:
  consolidate-deleted: true
```

</HclListItemExample>
</HclListItem>

#### deploy-branch-name

<HclListItem name="deploy-branch-name" requirement="required" type="string">
<HclListItemDescription>
The branch in this repository where IaC changes will be applied. Typically this is the default branch.
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  deploy-branch-name: main
```

</HclListItemExample>
</HclListItem>

#### enable-terragrunt-provider-cache

<HclListItem name="enable-terragrunt-provider-cache" requirement="optional" type="boolean">
<HclListItemDescription>
Enables the <span class="external-link"><a href="https://terragrunt.gruntwork.io/docs/features/provider-cache/">Terragrunt Provider Cache</a></span> for plans and applies.
</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
<HclListItemExample>

```yaml
pipelines:
  enable-terragrunt-provider-cache: true
```

</HclListItemExample>
</HclListItem>

#### env

<HclListItem name="env" requirement="optional" type="sequence(mapping)">
<HclListItemDescription>
(Optional) additional env vars to set for pipelines executions, e.g. TF_VAR or TERRAGRUNT_ values to customize the Terragrunt/Terraform/Opentofu run.
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  env:
    - name: TERRAGRUNT_PARALLELISM
      value: 10
    - name: CUSTOM_ENVVAR
      value: somedata"
```

</HclListItemExample>
</HclListItem>

#### is-access-control-repo

<HclListItem name="is-access-control-repo" requirement="optional" type="boolean">
<HclListItemDescription>
Only set to true for infrastructure-live-access-control
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  is-access-control-repo: true
```

</HclListItemExample>
</HclListItem>

#### is-delegated-repo

<HclListItem name="is-delegated-repo" requirement="optional" type="boolean">
<HclListItemDescription>
Only set to true for infrastructure-live-access-control and enterprise delegated (vended) repositories from account factory
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  is-delegated-repo: true
```

</HclListItemExample>
</HclListItem>

#### session-duration

<HclListItem name="session-duration" requirement="optional" type="number">
<HclListItemDescription>
Duration in seconds for each session terragunt assumes in AWS during plans and applies.
</HclListItemDescription>
<HclListItemDefaultValue defaultValue="3600"/>
<HclListItemExample>

```yaml
pipelines:
  session-duration: 3600
```

</HclListItemExample>
</HclListItem>

#### tf-binary

<HclListItem name="tf-binary" requirement="optional" type="string">
<HclListItemDescription>
The IaC runtime binary, valid options are opentofu or terraform.
</HclListItemDescription>
<HclListItemDefaultValue defaultValue="opentofu"/>
<HclListItemExample>

```yaml
pipelines:
  tf-binary: opentofu
```

</HclListItemExample>
</HclListItem>

## Deprecated Configuration Options

#### cli-version

<HclListItem name="cli-version" requirement="deprecated" type="string">
<HclListItemDescription>
Pipelines CLI version - no longer used as this is determined by the pipelines workflow version
</HclListItemDescription>
</HclListItem>

#### repo-allow-list

<HclListItem name="repo-allow-list" requirement="required(deprecated)" type="array[string]">
<HclListItemDescription>
No longer used but still required and should be set to the example. Will be fully removed in a later version of pipelines.
</HclListItemDescription>
<HclListItemExample>

```yaml
repo-allow-list:
  - "."
```

</HclListItemExample>
</HclListItem>

#### terraform-version

<HclListItem name="terraform-version" requirement="deprecated" type="string">
<HclListItemDescription>
Terraform version to use for plans and applies. Will be used if mise configuration is not present, but should removed in favor of [mise configuration](#example-mise-configuration).
</HclListItemDescription>
</HclListItem>

#### terragrunt-version

<HclListItem name="terragrunt-version" requirement="deprecated" type="string">
<HclListItemDescription>
Terragrunt version to use for plans and applies. Will be used if mise configuration is not present, but should removed in favor of [mise configuration](#example-mise-configuration).
</HclListItemDescription>
</HclListItem>

#### tofu-version

<HclListItem name="tofu-version" requirement="deprecated" type="string">
<HclListItemDescription>
OpenTofu version to use for plans and applies. Will be used if mise configuration is not present, but should removed in favor of [mise configuration](#example-mise-configuration).
</HclListItemDescription>
</HclListItem>
