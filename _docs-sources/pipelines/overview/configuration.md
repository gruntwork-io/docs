# Pipelines Configuration


:::warning This page is under active development and is a work in progress, June 2024
:::

Pipelines behavior is primarily configured via a yaml file at `.gruntwork/config.yml` in your repository. Pipelines also reads `.mise.toml` at the root of the repository to determine what version of OpenTofu/Terraform and Terragrunt to use. (TODO: Link to our background on mise, why we use it)

A sample `config.yml` with a full set of options is below.

```
pipelines:
  # Branch that IAC is deployed from
  deploy-branch-name: main
  # Version of the https://github.com/gruntwork-io/terraform-aws-security modules used in templates
  module-security-version: v0.68.3
  # Version of the https://github.com/gruntwork-io/terraform-aws-control-tower modules used in templates
  control-tower-modules-version: v0.4.2
  # Version of the https://github.com/gruntwork-io/terraform-aws-architecture-catalog modules used in templates
  arch-catalog-version: v2.2.5
  # (Optional) Override the repository in use for the architecture catalog
  arch-catalog-repo-name: gruntwork-io/terraform-aws-architecture-catalog
  # (Optional) Override the base path within the architecture catalog
  arch-catalog-base-path: ./terraform-aws-architecture-catalog
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


  ###########################################################################
  # Configuration options below are ONLY for Pipelines Enterprise customers
  ###########################################################################

  # Only set to true for delegated (vended) repositories from account factory
  is-delegated-repo: false
  # Only set to true for infrastructure-live-access-control
  is-access-control-repo: false

  account-vending:
    sdlc:
    # Map of account identifiers to account vending configurations.
    # A valid account vending configuration includes:
    # - account-identifiers: List of account identifiers that will be created (required).
    # - catalog-repositories: List of repositories used by Terragrunt catalog (optional).
    # - github-collaborators: List of GitHub teams and their permissions (optional).
      account-identifiers:
        # Alphanumeric account identifiers only. On account requests, an account
        # will be created for each specified identifier & the account name will
        # include the identifier. e.g. "<ACCOUNT-FAMILY>-dev"
        - dev
        - stage
        - prod
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
