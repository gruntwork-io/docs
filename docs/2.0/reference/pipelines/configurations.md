import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConfigOptionItem from "/src/components/ConfigOptionItem"
import { HclListItem, HclListItemExample, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '/src/components/HclListItem.tsx';

# Pipelines Configurations

:::note
Pipelines configurations are currently undergoing a transition from YAML configurations to new HCL [Configurations as Code](./configurations-as-code.md). These new configurations will offer a richer configuration experience, but are not yet required for use. YAML configurations will continue to work as expected for the time being.

YAML configurations are read by Pipelines when HCL configurations are not present, and the Pipelines binary falls back to interpretting YAML configurations as if they were defined in the HCL configuration system in this scenario.

This means that if you have a `.gruntwork/config.yml` file in your repository, you can continue to use it as you have been, and Pipelines will continue to work as expected.

If you do introduce any HCL configurations into your `.gruntwork` directory or introduce a `gruntwork.hcl` file into a directory, Pipelines will begin to use the HCL configuration system instead of the YAML configuration system.
:::

Pipelines behavior is primarily configured via a yaml file at `.gruntwork/config.yml` in your repository. Pipelines also reads [.mise.toml](https://docs.gruntwork.io/pipelines/upgrading/upgrading-from-infrastructure-pipelines#adding-misetoml) at the root of the repository to determine what version of OpenTofu/Terraform and Terragrunt to use.

# Pipelines Configuration Options

<Tabs groupId="subscription">
<TabItem value="Standard" label="Standard" default>
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

### account-baseline-vpc-module-url

<HclListItem name="account-baseline-vpc-module-url" requirement="required" type="string">
<HclListItemDescription>
URL of the account baseline VPC module used by account factory
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  account-baseline-vpc-module-url: git@github.com:gruntwork-io/terraform-aws-cis-service-catalog.git//modules/networking/vpc
```

</HclListItemExample>
</HclListItem>

### account-baseline-vpc-module-version

<HclListItem name="account-baseline-vpc-module-version" requirement="required" type="string">
<HclListItemDescription>
Version of the account-baseline-vpc-module
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  account-baseline-vpc-module-version: v0.48.1
```

</HclListItemExample>
</HclListItem>

### arch-catalog-repo-url

<HclListItem name="arch-catalog-repo-url" requirement="required" type="string">
<HclListItemDescription>
Name of the architecture catalog repo (including github org e.g. acme/terraform-aws-architecture-catalog).
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

<HclListItem name="aws-security-repo-url" requirement="required" type="string">
<HclListItemDescription>
URL of the terraform-aws-security repo.
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  aws-security-repo-url: git@github.com:gruntwork-io/terraform-aws-security.git
```

</HclListItemExample>
</HclListItem>

### aws-utilities-repo-url

<HclListItem name="aws-utilities-repo-url" requirement="required" type="string">
<HclListItemDescription>
URL of the terraform-aws-utilities repo
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  aws-utilities-repo-url: git@github.com:gruntwork-io/terraform-aws-utilities.git
```

</HclListItemExample>
</HclListItem>

### cis-service-catalog-repo-url

<HclListItem name="cis-service-catalog-repo-url" requirement="required" type="string">
<HclListItemDescription>
URL of the terraform-aws-cis-service-catalog repo
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  cis-service-catalog-repo-url: git@github.com:gruntwork-io/terraform-aws-cis-service-catalog.git
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

<HclListItem name="control-tower-repo-url" requirement="required" type="string">
<HclListItemDescription>
URL of the terraform-aws-control-tower repo
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

### tf-binary

<HclListItem name="tf-binary" requirement="required" type="string">
<HclListItemDescription>
The IaC runtime binary, valid options are opentofu or terraform
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  tf-binary: opentofu
```

</HclListItemExample>
</HclListItem>

</TabItem>

<TabItem value="Enterprise" label="Enterprise">
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

</TabItem>
</Tabs>

# Deprecated Configuration Options

### cli-version

<HclListItem name="cli-version" requirement="deprecated" type="string">
<HclListItemDescription>
Pipelines CLI version - no longer used as this is determined by the piplines workflow version
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

A sample `config.yml` with a full set of options is below.

```
pipelines:
  # Branch that IaC is deployed from
  deploy-branch-name: main

  # URL of the terraform-aws-security repo
  aws-security-repo-url: git@github.com:gruntwork-io/terraform-aws-security.git
  # Version of the https://github.com/gruntwork-io/terraform-aws-security modules used in templates
  module-security-version: v0.68.3

  # URL of the terraform-aws-control-tower repo
  control-tower-repo-url: git@github.com:gruntwork-io/terraform-aws-control-tower.git
  # Version of the https://github.com/gruntwork-io/terraform-aws-control-tower modules used in templates
  control-tower-modules-version: v0.4.2

  # URL of the terraform-aws-cis-service-catalog repo
  cis-service-catalog-repo-url: git@github.com:gruntwork-io/terraform-aws-cis-service-catalog.git

  # URL of the terraform-aws-utilities repo
  aws-utilities-repo-url: git@github.com:gruntwork-io/terraform-aws-utilities.git

  # Name of the architecture catalog repo (including github org e.g. acme/terraform-aws-architecture-catalog).
  arch-catalog-repo-url: git@github.com:gruntwork-io/terraform-aws-architecture-catalog

  # Version of the https://github.com/gruntwork-io/terraform-aws-architecture-catalog modules used in templates
  arch-catalog-version: v2.2.5

  # (Optional) Override the path within the architecture catalog where to find the template for boilerplating new account baselines
  single-account-baseline-template-path: /templates/single-account-baseline

  # Default AWS region for infrastructure managed in this repository
  default-aws-region: us-east-1
  # GitHub Organization this repository belongs to
  github-org: gruntwork-io-demo
  # Name of the infrastructure-live-access-control repository
  access-control-repo-name: infrastructure-live-access-control
  # Name of the infrastructure-modules repository
  infra-modules-repo-name: infrastructure-modules
  # Version of the https://github.com/gruntwork-io-demo/infrastructure-modules modules used in templates
  infra-modules-release-version: v0.1.0
  # The IaC runtime binary, valid options are opentofu or terraform
  tf-binary: opentofu
  # (Optional) override the folder for the security account, default is 'security'
  security-account-name: security
  # (Optional) override the folder for the shared account, default is 'shared'
  shared-account-name: shared
  # (Optional) override the folder for the logs account, default is 'logs'
  logs-account-name: logs
  # (Optional) override the folder for the management account, default is 'management'
  management-account-name: management

  # (Optional) enable experimental Terragrunt Provider Cache behavior
  # See https://terragrunt.gruntwork.io/docs/features/provider-cache/ for more information
  enable-terragrunt-provider-cache: false

  # (Optional) override default session duration for assumed roles in seconds
  # Added in https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.26.0
  session-duration: 3600

  # (Optional) enable added or changed job consolidation.
  # Is enabled by default.
  # Added in https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.27.0
  consolidate-added-or-changed: true

  # (Optional) enable deleted job consolidation.
  # Is disabled by default.
  # The reason this is disabled by default is that it is generally safer to
  # avoid using `run-all` when deleting resources, as it can lead to accidental
  # deletion of more resources than intended.
  # Added in https://github.com/gruntwork-io/pipelines-cli/releases/tag/v0.27.0
  consolidate-deleted: false

  # (Optional) additional env vars to set for pipelines executions, e.g. TF_VAR
  # or TERRAGRUNT_ values to customize the Terragrunt/Terraform/Opentofu run.
  env:
    - name: TERRAGRUNT_PARALLELISM
      value: 10
    - name: CUSTOM_ENVVAR
      value: somedata

  ###########################################################################
  # Configuration options below are ONLY for Pipelines Enterprise customers
  ###########################################################################

  # (Optional) The full path to a tags.yaml file for centrally managed tags, e.g. acme/repo/contents/path/to/tags.yaml
  catalog-tags-location: gruntwork-io-demo/infrastructure-modules/contents/common_tags.yaml

  # (Optional) The location of the pipelines workflow to use for delegated repositories
  pipelines-workflow-location: gruntwork-io/pipelines-workflows/.github/workflows/pipelines.yml@v2

  # (Optional) The name of the PIPELINES_READ_TOKEN secret to use in delegated repositories
  pipelines-read-token-name: PIPELINES_READ_TOKEN

  # Only set to true for delegated (vended) repositories from account factory
  is-delegated-repo: false
  # Only set to true for infrastructure-live-access-control
  is-access-control-repo: false

  account-vending:
    sdlc:
    # Map of account identifiers to account vending configurations.
    # A valid account vending configuration includes:
      # account-identifiers: List of account identifiers that will be created (required).
      account-identifiers:
        # Alphanumeric account identifiers only. On account requests, an account
        # will be created for each specified identifier & the account name will
        # include the identifier. e.g. "<ACCOUNT-FAMILY>-dev"
        - dev
        - stage
        - prod
      # catalog-repositories: List of repositories used by Terragrunt catalog (optional).
      catalog-repositories:
        # List of repositories that contain infrastructure modules that can be easily leveraged as a catalog by delegated repositories vended by the infrastructure-root repository.
        # For more information, see https://terragrunt.gruntwork.io/docs/features/catalog/
        - "{{ .RepoBaseUrl }}/{{ .InfraModulesRepoName }}"
      # github-collaborators:
      # List of GitHub teams and their permissions automatically added to delegated repositories vended by the infrastructure-root repository.
      # Valid permissions are: pull, triage, push, maintain and admin (in addition to custom roles if any exist)
      # See https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization#permissions-for-each-role
      # for more information on GitHub repository roles.
      #   - team: 'team-name'
      #     permission: pull
    sandbox:
      account-identifiers:
        - sandbox
      catalog-repositories:
        - "{{ .RepoBaseUrl }}/{{ .InfraModulesRepoName }}"
```
