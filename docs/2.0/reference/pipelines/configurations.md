# Pipelines Configurations

:::note
Pipelines configurations are currently undergoing a transition from YAML configurations to new HCL [Configurations as Code](./configurations-as-code.md). These new configurations will offer a richer configuration experience, but are not yet required for use. YAML configurations will continue to work as expected for the time being.

YAML configurations are read by Pipelines when HCL configurations are not present, and the Pipelines binary falls back to interpretting YAML configurations as if they were defined in the HCL configuration system in this scenario.

This means that if you have a `.gruntwork/config.yml` file in your repository, you can continue to use it as you have been, and Pipelines will continue to work as expected.

If you do introduce any HCL configurations into your `.gruntwork` directory or introduce a `gruntwork.hcl` file into a directory, Pipelines will begin to use the HCL configuration system instead of the YAML configuration system.
:::

Pipelines behavior is primarily configured via a yaml file at `.gruntwork/config.yml` in your repository. Pipelines also reads [.mise.toml](https://docs.gruntwork.io/pipelines/upgrading/upgrading-from-infrastructure-pipelines#adding-misetoml) at the root of the repository to determine what version of OpenTofu/Terraform and Terragrunt to use.

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
