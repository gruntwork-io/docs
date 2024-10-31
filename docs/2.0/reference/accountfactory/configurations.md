import { HclListItem, HclListItemExample, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '/src/components/HclListItem.tsx';

# Account Factory Configurations

Account factory configurations are located under the `pipelines` key in `./.gruntwork/config.yml`

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

## Enterprise Options

### account-vending

<HclListItem name="account-vending" requirement="required" type="sequence(mapping)">
<HclListItemDescription>
A sequence of account types mapped to their configurations [see below](#account-type-configuration).
Valid types are `sandbox` and `sdlc`.
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  account-vending:
    sandbox:
      account-identifiers:
        - sandbox
    sdlc:
      account-identifiers:
        - dev
        - stage
        - prod
```

</HclListItemExample>
</HclListItem>

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

## Account Type Configuration

### account-identifiers

<HclListItem name="account-identifiers" requirement="required" type="sequence(string)">
<HclListItemDescription>
Sequence of account identifiers.
**Alphanumeric account identifiers only.** On account requests, an account will be created for each specified identifier & the account name will include the identifier. e.g. "&lt;ACCOUNT-FAMILY&gt;-dev"
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  account-vending:
    sdlc:
      account-identifiers:
        - dev
        - stage
        - prod
```

</HclListItemExample>
</HclListItem>

### catalog-repositories

<HclListItem name="catalog-repositories" requirement="optional" type="sequence(string)">
<HclListItemDescription>
Sequence of repositories that contain infrastructure modules that can be easily leveraged as a catalog by delegated repositories vended by the infrastructure-root repository.
For more information, see <span class="external-link"><a href="https://terragrunt.gruntwork.io/docs/features/catalog/">Terragrunt Catalog</a></span>
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  account-vending:
    sdlc:
      catalog-repositories:
        - "github.com/acmecorp/infrastructure-modules//."
```

</HclListItemExample>
</HclListItem>

### github-collaborators

<HclListItem name="github-collaborators" requirement="optional" type="sequence(mapping)">
<HclListItemDescription>
Sequence of GitHub teams and their permissions automatically added to delegated repositories vended by the infrastructure-root repository.
Valid permissions are: pull, triage, push, maintain and admin (in addition to custom roles if any exist)
See <span class="external-link"><a href="https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization#permissions-for-each-role">GitHub Repository Roles</a></span>
</HclListItemDescription>
<HclListItemExample>

```yaml
pipelines:
  account-vending:
    sandbox:
      github-collaborators:
        - team: 'team-name'
          permission: pull
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

### infra-modules-version

<HclListItem name="infra-modules-version" requirement="deprecated" type="string">
<HclListItemDescription>
Version of infrastructure-modules - will be used if [infra-modules-release-version](#infra-modules-release-version) is not present but should be removed in favor of `infra-modules-release-version`.
</HclListItemDescription>
</HclListItem>
