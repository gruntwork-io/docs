import { HclListItem, HclListItemExample, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '/src/components/HclListItem.tsx';

# Pipelines Configurations

:::note
Pipelines configurations are currently undergoing a transition from YAML configurations to new HCL [Configurations as Code](./configurations-as-code.md). These new configurations will offer a richer configuration experience, but are not yet required for use. YAML configurations will continue to work as expected for the time being.

YAML configurations are read by Pipelines when HCL configurations are not present, and the Pipelines binary falls back to interpretting YAML configurations as if they were defined in the HCL configuration system in this scenario.

This means that if you have a `.gruntwork/config.yml` file in your repository, you can continue to use it as you have been, and Pipelines will continue to work as expected.

If you do introduce any HCL configurations into your `.gruntwork` directory or introduce a `gruntwork.hcl` file into a directory, Pipelines will begin to use the HCL configuration system instead of the YAML configuration system.
:::

Pipelines behavior is primarily configured via a yaml file at `.gruntwork/config.yml` in your repository. Pipelines also reads [.mise.toml](https://docs.gruntwork.io/pipelines/upgrading/upgrading-from-infrastructure-pipelines#adding-misetoml) at the root of the repository to determine what version of OpenTofu/Terraform and Terragrunt to use.

### Example Mise Configuration
`./.mise.toml`
```
[tools]
opentofu = "1.7.2"
terragrunt = "0.67.16"
awscli = "latest"
```

# Pipelines Configuration Options

`./.gruntwork/config.yml`

## Standard Options

### access-control-repo-name

<HclListItem name="access-control-repo-name" requirement="required" type="string">
<HclListItemDescription>
Name of the infrastructure-live-access-control repository
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  access-control-repo-name: infrastructure-live-access-control
```

</HclListItemExample>
</HclListItem>

### account-baseline-disable-vpc-inputs

<HclListItem name="account-baseline-disable-vpc-inputs" requirement="optional" type="boolean">
<HclListItemDescription>
Defaults to `false`
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  account-baseline-disable-vpc-inputs: true
```

</HclListItemExample>
</HclListItem>

### account-baseline-vpc-module-url

<HclListItem name="account-baseline-vpc-module-url" requirement="optional" type="string">
<HclListItemDescription>
URL of the account baseline VPC module used by account factory
Defaults to `git@github.com:gruntwork-io/terraform-aws-cis-service-catalog.git//modules/networking/vpc`
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  account-baseline-vpc-module-url: git@github.com:gruntwork-io/terraform-aws-cis-service-catalog.git//modules/networking/vpc
```

</HclListItemExample>
</HclListItem>

### account-baseline-vpc-module-version

<HclListItem name="account-baseline-vpc-module-version" requirement="optional" type="string">
<HclListItemDescription>
Version of the account-baseline-vpc-module
Defaults to `v0.48.1`
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  account-baseline-vpc-module-version: v0.48.1
```

</HclListItemExample>
</HclListItem>

### arch-catalog-base-path

<HclListItem name="arch-catalog-base-path" requirement="optional" type="string">
<HclListItemDescription>
Defaults to `./terraform-aws-architecture-catalog`
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  arch-catalog-base-path: ./terraform-aws-architecture-catalog
```

</HclListItemExample>
</HclListItem>

### arch-catalog-repo-url

<HclListItem name="arch-catalog-repo-url" requirement="required" type="string">
<HclListItemDescription>
URL of the architecture catalog repo used in templates
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  arch-catalog-repo-url: git@github.com:gruntwork-io/terraform-aws-architecture-catalog
```

</HclListItemExample>
</HclListItem>

### arch-catalog-version

<HclListItem name="arch-catalog-version" requirement="required" type="string">
<HclListItemDescription>
Version of the arch-catalog-repo modules used in templates.
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  arch-catalog-version: v2.11.1
```

</HclListItemExample>
</HclListItem>

### aws-security-repo-url

<HclListItem name="aws-security-repo-url" requirement="optional" type="string">
<HclListItemDescription>
URL of the terraform-aws-security repo.
Defaults to `git@github.com:gruntwork-io/terraform-aws-security.git`
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  aws-security-repo-url: git@github.com:gruntwork-io/terraform-aws-security.git
```

</HclListItemExample>
</HclListItem>

### aws-utilities-repo-url

<HclListItem name="aws-utilities-repo-url" requirement="optional" type="string">
<HclListItemDescription>
URL of the terraform-aws-utilities repo
Defaults to `git@github.com:gruntwork-io/terraform-aws-utilities.git`
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  aws-utilities-repo-url: git@github.com:gruntwork-io/terraform-aws-utilities.git
```

</HclListItemExample>
</HclListItem>

### cis-service-catalog-repo-url

<HclListItem name="cis-service-catalog-repo-url" requirement="optional" type="string">
<HclListItemDescription>
URL of the terraform-aws-cis-service-catalog repo
Defaults to `git@github.com:gruntwork-io/terraform-aws-cis-service-catalog.git`
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  cis-service-catalog-repo-url: git@github.com:gruntwork-io/terraform-aws-cis-service-catalog.git
```

</HclListItemExample>
</HclListItem>

### consolidate-added-or-changed

<HclListItem name="consolidate-added-or-changed" requirement="optional" type="boolean">
<HclListItemDescription>
When set to true enables consolidating added and changed units such that dependencies are respected.
Defaults to `true`
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  consolidate-added-or-changed: false
```

</HclListItemExample>
</HclListItem>

### consolidate-deleted

<HclListItem name="consolidate-deleted" requirement="optional" type="boolean">
<HclListItemDescription>
When set to true enables consolidating deleted units such that dependencies are respected.
This is disabled by default as it may result in unexpected deletions.
Defaults to `false`
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  consolidate-deleted: true
```

</HclListItemExample>
</HclListItem>

### control-tower-modules-version

<HclListItem name="control-tower-modules-version" requirement="required" type="string">
<HclListItemDescription>
Version of the control-tower-repo modules used in templates
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  control-tower-modules-version: v0.7.5
```

</HclListItemExample>
</HclListItem>

### control-tower-repo-url

<HclListItem name="control-tower-repo-url" requirement="optional" type="string">
<HclListItemDescription>
URL of the terraform-aws-control-tower repo
Defaults to `git@github.com:gruntwork-io/terraform-aws-control-tower.git`
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  control-tower-repo-url: git@github.com:gruntwork-io/terraform-aws-control-tower.git
```

</HclListItemExample>
</HclListItem>

### default-aws-region

<HclListItem name="default-aws-region" requirement="required" type="string">
<HclListItemDescription>
Default AWS region for infrastructure managed in this repository
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  default-aws-region: us-east-1
```

</HclListItemExample>
</HclListItem>

### deploy-branch-name

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

### enable-terragrunt-provider-cache

<HclListItem name="enable-terragrunt-provider-cache" requirement="optional" type="boolean">
<HclListItemDescription>
Enables the <span class="external-link"><a href="https://terragrunt.gruntwork.io/docs/features/provider-cache/">Terragrunt Provider Cache</a></span> for plans and applies.
Defaults to `false`
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  enable-terragrunt-provider-cache: true
```

</HclListItemExample>
</HclListItem>

### env

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

### github-org

<HclListItem name="github-org" requirement="required" type="string">
<HclListItemDescription>
GitHub Organization this repository belongs to
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  github-org: acmecorp
```

</HclListItemExample>
</HclListItem>

### is-access-control-repo

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

### is-delegated-repo

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

### infra-modules-repo-name

<HclListItem name="infra-modules-repo-name" requirement="required" type="string">
<HclListItemDescription>
Name of the infrastructure-modules repository
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  infra-modules-repo-name: infrastructure-modules
```

</HclListItemExample>
</HclListItem>

### infra-modules-release-version

<HclListItem name="infra-modules-release-version" requirement="required" type="string">
<HclListItemDescription>
Version of the infrastructure-modules modules used in templates
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  infra-modules-release-version: v0.1.0
```

</HclListItemExample>
</HclListItem>

### logs-account-name

<HclListItem name="logs-account-name" requirement="optional" type="string">
<HclListItemDescription>
Override the folder for the logs account
Defaults to `logs`
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  logs-account-name: logs
```

</HclListItemExample>
</HclListItem>

### management-account-name

<HclListItem name="management-account-name" requirement="optional" type="string">
<HclListItemDescription>
Override the folder for the management account
Defaults to `management`
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  management-account-name: management
```

</HclListItemExample>
</HclListItem>

### module-security-version

<HclListItem name="module-security-version" requirement="required" type="string">
<HclListItemDescription>
Version of the aws-security-repo modules used in templates.
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  module-security-version: v0.73.2
```

</HclListItemExample>
</HclListItem>

### security-account-name

<HclListItem name="security-account-name" requirement="optional" type="string">
<HclListItemDescription>
Override the folder for the security account
Defaults to `security`
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  security-account-name: security
```

</HclListItemExample>
</HclListItem>

### session-duration

<HclListItem name="session-duration" requirement="optional" type="number">
<HclListItemDescription>
Duration in seconds for each session terragunt assumes in AWS during plans and applies.
Defaults to `3600`
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  session-duration: 3600
```

</HclListItemExample>
</HclListItem>

### shared-account-name

<HclListItem name="shared-account-name" requirement="optional" type="string">
<HclListItemDescription>
Override the folder for the shared account
Defaults to `shared`
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  shared-account-name: shared
```

</HclListItemExample>
</HclListItem>

### single-account-baseline-template-path

<HclListItem name="single-account-baseline-template-path" requirement="optional" type="string">
<HclListItemDescription>
Defaults to `/templates/single-account-baseline`
</HclListItemDescription>
</HclListItem>

### tf-binary

<HclListItem name="tf-binary" requirement="optional" type="string">
<HclListItemDescription>
The IaC runtime binary, valid options are opentofu or terraform. Will default to opentofu if not set.
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  tf-binary: opentofu
```

</HclListItemExample>
</HclListItem>

## Enterprise Options

### catalog-tags-location

<HclListItem name="catalog-tags-location" requirement="optional" type="string">
<HclListItemDescription>
The full path to a tags.yml file for centrally managed tags, e.g. acme/repo/contents/path/to/tags.yml
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  catalog-tags-location: acmecorp/infrastructure-modules/contents/common_tags.yml
```

</HclListItemExample>
</HclListItem>

### pipelines-read-token-name

<HclListItem name="pipelines-read-token-name" requirement="optional" type="string">
<HclListItemDescription>
The name of the PIPELINES_READ_TOKEN secret to use in delegated repositories
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  pipelines-read-token-name: PIPELINES_READ_TOKEN
```

</HclListItemExample>
</HclListItem>

### pipelines-workflow-location

<HclListItem name="pipelines-workflow-location" requirement="optional" type="string">
<HclListItemDescription>
The location of the pipelines workflow to use for delegated repositories
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  pipelines-workflow-location: gruntwork-io/pipelines-workflows/.github/workflows/pipelines.yml@v3
```

</HclListItemExample>
</HclListItem>


# Deprecated Configuration Options

### arch-catalog-repo-name

<HclListItem name="arch-catalog-repo-name" requirement="deprecated" type="string">
<HclListItemDescription>
Name of the architecture catalog - will be used if [arch-catalog-repo-url](#arch-catalog-repo-url) is not present but should be removed in favor of `arch-catalog-repo-url`.
</HclListItemDescription>
</HclListItem>

### cli-version

<HclListItem name="cli-version" requirement="deprecated" type="string">
<HclListItemDescription>
Pipelines CLI version - no longer used as this is determined by the pipelines workflow version
</HclListItemDescription>
</HclListItem>

### infra-modules-version

<HclListItem name="infra-modules-version" requirement="deprecated" type="string">
<HclListItemDescription>
Version of infrastructure-modules - will be used if [infra-modules-release-version](#infra-modules-release-version) is not present but should be removed in favor of `infra-modules-release-version`.
</HclListItemDescription>
</HclListItem>

### repo-allow-list

<HclListItem name="repo-allow-list" requirement="required(deprecated)" type="string">
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

### terraform-version

<HclListItem name="terraform-version" requirement="deprecated" type="string">
<HclListItemDescription>
Terraform version to use for plans and applies. Will be used if mise configuration is not present, but should removed in favor of [mise configuration](#example-mise-configuration).
</HclListItemDescription>
</HclListItem>

### terragrunt-version

<HclListItem name="terragrunt-version" requirement="deprecated" type="string">
<HclListItemDescription>
Terragrunt version to use for plans and applies. Will be used if mise configuration is not present, but should removed in favor of [mise configuration](#example-mise-configuration).
</HclListItemDescription>
</HclListItem>

### tofu-version

<HclListItem name="tofu-version" requirement="deprecated" type="string">
<HclListItemDescription>
Tofu version to use for plans and applies. Will be used if mise configuration is not present, but should removed in favor of [mise configuration](#example-mise-configuration).
</HclListItemDescription>
</HclListItem>
