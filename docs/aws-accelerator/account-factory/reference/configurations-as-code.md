# Pipelines Account Factory Configurations as Code

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"
import {
  HclListItem,
  HclListItemExample,
  HclListItemDescription,
  HclListItemTypeDetails,
  HclListItemDefaultValue,
  HclGeneralListItem,
} from "/src/components/HclListItem.tsx"

Pipelines Account Factory uses configurations written in [HashiCorp Configuration Language (HCL)](https://github.com/hashicorp/hcl) to enable dynamic behavior. These configurations determine how Account Factory will provision and configure new AWS accounts using Gruntwork Pipelines.

To process configurations, Pipelines parses all `.hcl` files within a `.gruntwork` directory or a single file named `gruntwork.hcl`. Typically, global configurations relevant to the entire repository are placed in the `.gruntwork` directory at the root hence the file is typically named `account-factory.hcl` and placed in the `.gruntwork` directory at the root of the repository.

:::info

We recommend reviewing our [concepts page](/docs/terragrunt-scale/pipelines/concepts/hcl-config-language) on the HCL language to ensure familiarity with its features.
:::

## Basic configuration

Below is an example of a minimal configuration required for AccountFactory:

```hcl
# .gruntwork/account-factory.hcl
account_factory {
  control_tower_module_version                  = "va.b.c"
  security_module_version                       = "va.b.c"
  architecture_catalog_module_version           = "va.b.c"
  infrastructure_catalog_module_version         = "va.b.c"
  access_control_repository_name                = "your-access-control-repository-name"
  infrastructure_catalog_module_repository_name = "your-infrastructure-catalog-module-repository-name"
}
```

## Block Reference

For a more comprehensive walkthrough of how blocks work please see the Pipelines Configurations as Code [concepts](/docs/terragrunt-scale/pipelines/reference/configurations-as-code).

### `account_factory` block

<HclListItem name="account_factory" requirement="required" type="block">
<HclListItemDescription>
Account Factory blocks are used to define configurations that are applicable for provisioning and configuring new AWS accounts.
<br />
See detailed attributes configuration options [below](#account_factory-block-attributes).
</HclListItemDescription>
<HclListItemExample>

```hcl
# .gruntwork/account-factory.hcl
account_factory {
  control_tower_module_version                  = "va.b.c"
  security_module_version                       = "va.b.c"
  architecture_catalog_module_version           = "va.b.c"
  infrastructure_catalog_module_version         = "va.b.c"
  access_control_repository_name                = "your-access-control-repository-name"
  infrastructure_catalog_module_repository_name = "your-infrastructure-catalog-module-repository-name"
}
```

</HclListItemExample>
</HclListItem>

### `account_vending` block

<HclListItem name="account_vending" requirement="optional" type="labeled-block">
  <HclListItemDescription>

    Account Vending blocks are available for Gruntwork Enterprise customers, nested within [account_factory](#account_factory-block) blocks, to define how additional features such as multi-environment account provisioning and delegated repositories are enabled.
    Each account-vending configuration block is a template for vending accounts as desired.
    <br />
    The labels such as "sdlc" or "sandbox" serve as the name of the account-vending configuration block and are the default Gruntwork Provided labels for the account-vending configuration block. Enterprise customers may define their own configuration blocks or modify the Gruntwork Provided blocks but should contact [support@gruntwork.io](mailto:support@gruntwork.io) if they intend to [use the Gruntwork Developer Portal to generate new account requests](/docs/aws-accelerator/account-factory/guides/vend-aws-account).
    <br />

    Account Vending blocks are used to define configurations that are applicable to a single account vending within a repository. See more [below](#account-vending-block-attributes).

  </HclListItemDescription>
  <HclListItemExample>

    ```hcl
    # .gruntwork/account-factory.hcl
    account_factory {
      account_vending "sdlc" {
        account_identifiers  = ["dev", "stage", "prod"]
        catalog_repositories = ["path/to/catalog-repositories"]
      }

      account_vending "sandbox" {
        account_identifiers  = ["sandbox"]
        catalog_repositories = ["path/to/catalog-repositories"]
      }
    }
    ```

    In this example, when an account request of type `sdlc` is requested, an account will be created for each of the identifiers; `dev`, `stage`, and `prod` as the suffixes for the new accounts being created. Also, if a "Delegate Management of Account(s)?" option is chosen during account request, the catalog repositories `path/to/catalog-repositories` will be added to the new accounts.

    Similarly, when an account request of type `sandbox` is requested, the account will be created for the identifier `sandbox` as the suffix for the new account being created. Also, if a "Delegate Management of Account(s)?" option is chosen during account request, the catalog repositories `path/to/catalog-repositories` will be added to the new account.

  </HclListItemExample>
</HclListItem>

### `ci_collaborator` block

<HclListItem name="ci_collaborator" requirement="optional" type="labeled-block">
  <HclListItemDescription>
    A block, nested within an [account_vending](#account_vending-block) block, that adds a GitHub/GitLab team and their permissions to a dedicated infrastructure-live repository if the "Delegate Management of Account(s)?" option is chosen during account request. See detailed attributes configuration options [below](#ci-collaborator-block-attributes).
  </HclListItemDescription>

  <HclListItemExample>

    ```hcl
    account_factory {
      account_vending "sdlc" {
        account_identifiers  = ["dev", "stage", "prod"]
        catalog_repositories = ["path/to/catalog-repositories"]

        ci_collaborator "a-team" {
          team: "apple-team"
          permission: "maintainer"
        }

        ci_collaborator "b-team" {
          team: "banana-team"
          permission: "read"
        }
      }
    }
    ```

     In this example, the `a-team` will be added as a maintainer and the `b-team` will be added as a read only collaborator to a dedicated infrastructure-live repository if the "Delegate Management of Account(s)?" option is chosen during account request of type `sdlc`.
  </HclListItemExample>
</HclListItem>

## Account Factory Block Attributes

### access_control_template_path

<HclListItem name="access_control_template_path" requirement="optional" type="string">
  <HclListItemDescription>

    Path to the access-control-accounts template, in the architecture-catalog repository, to use when provisioning new accounts.

  </HclListItemDescription>
</HclListItem>

### access_control_repository_name

<HclListItem name="access_control_repository_name" requirement="required" type="string">
  <HclListItemDescription>

    The name of your infrastructure-live-access-control repository

  </HclListItemDescription>
</HclListItem>

### architecture_catalog_module_version

<HclListItem name="architecture_catalog_module_version" requirement="required" type="string">
  <HclListItemDescription>

    The version of the architecture catalog module to use when provisioning new accounts.

  </HclListItemDescription>
</HclListItem>

### architecture_catalog_repo_url

<HclListItem name="architecture_catalog_repo_url" requirement="optional" type="string">
  <HclListItemDescription>

    The URL of the architecture catalog repository to use when provisioning new accounts.

  </HclListItemDescription>
</HclListItem>

### aws_security_repo_url

<HclListItem name="aws_security_repo_url" requirement="optional" type="string">
  <HclListItemDescription>

    The URL of the aws-security module repository to use when provisioning new accounts.

  </HclListItemDescription>
</HclListItem>

### aws_utilities_repo_url

<HclListItem name="aws_utilities_repo_url" requirement="optional" type="string">
  <HclListItemDescription>

    The URL of the aws-utilities module repository to use when provisioning new accounts.

  </HclListItemDescription>
</HclListItem>

### catalog_tags_location

<HclListItem name="catalog_tags_location" requirement="optional" type="string">
  <HclListItemDescription>

    The path to the catalog tags file to use when provisioning new accounts.

  </HclListItemDescription>
</HclListItem>

### cis_service_catalog_repo_url

<HclListItem name="cis_service_catalog_repo_url" requirement="optional" type="string">
  <HclListItemDescription>

    The URL of the cis-service-catalog module repository to use when provisioning new accounts.

  </HclListItemDescription>
</HclListItem>

### control_tower_module_version

<HclListItem name="control_tower_module_version" requirement="required" type="string">
  <HclListItemDescription>

    The version of the aws-control-tower module to use when provisioning new accounts.

  </HclListItemDescription>
</HclListItem>

### control_tower_repo_url

<HclListItem name="control_tower_repo_url" requirement="optional" type="string">
  <HclListItemDescription>

    The URL of the aws-control-tower repository to use when provisioning new accounts.

  </HclListItemDescription>
</HclListItem>

### delegated_repository_template_path

<HclListItem name="delegated_repository_template_path" requirement="optional" type="string">
  <HclListItemDescription>

    The path to the devops-foundations-infrastructure-live-delegated template, in the architecture-catalog repository, to use when provisioning new accounts.

  </HclListItemDescription>
</HclListItem>

### disable_vpc_inputs

<HclListItem name="disable_vpc_inputs" requirement="optional" type="boolean">
  <HclListItemDescription>

    If set to true, the terragrunt.hcl generated for the VPC in new delegated accounts will not pass any inputs to the VPC module. This is useful for customers with custom VPC configurations: e.g., IPAM, transit subnets, private NAT, etc. All of this custom config can go into vpc-app.hcl in _envcommon directly in the customer's infra-live repo.

  </HclListItemDescription>
  <HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

### infrastructure_catalog_module_repository_name

<HclListItem name="infrastructure_catalog_module_repository_name" requirement="required" type="string">
  <HclListItemDescription>

    The name of your infrastructure-catalog module repository.

  </HclListItemDescription>
</HclListItem>

### infrastructure_catalog_module_version

<HclListItem name="infrastructure_catalog_module_version" requirement="required" type="string">
  <HclListItemDescription>

    The version of your infrastructure-catalog module repository.

  </HclListItemDescription>
</HclListItem>

### logs_account_name

<HclListItem name="logs_account_name" requirement="optional" type="string">
  <HclListItemDescription>

    The name of your logs account if different from the default of `logs`.

  </HclListItemDescription>
</HclListItem>

### management_account_name

<HclListItem name="management_account_name" requirement="optional" type="string">
  <HclListItemDescription>

    The name of your management account if different from the default of `management`.

  </HclListItemDescription>
</HclListItem>

### pipelines_read_token_name

<HclListItem name="pipelines_read_token_name" requirement="optional" type="string">
  <HclListItemDescription>

    (GitHub only) The name of your pipelines read token if different from the default of `PIPELINES_READ_TOKEN`.

  </HclListItemDescription>
</HclListItem>

### pipelines_workflow_location

<HclListItem name="pipelines_workflow_location" requirement="optional" type="string">
  <HclListItemDescription>

    (GitHub only) The location of your pipelines workflow if different from the default of `gruntwork-io/pipelines-workflows/.github/workflows/pipelines.yml@X`.

  </HclListItemDescription>
</HclListItem>

### security_account_name

<HclListItem name="security_account_name" requirement="optional" type="string">
  <HclListItemDescription>

    The name of your security account if different from the default of `security`.

  </HclListItemDescription>
</HclListItem>

### security_module_version

<HclListItem name="security_module_version" requirement="required" type="string">
  <HclListItemDescription>

    The version of aws-security module repository to use when provisioning new accounts.

  </HclListItemDescription>
</HclListItem>

### shared_account_name

<HclListItem name="shared_account_name" requirement="optional" type="string">
  <HclListItemDescription>

    The name of your shared account if different from the default of `shared`.

  </HclListItemDescription>
</HclListItem>

### single_account_baseline_template_path

<HclListItem name="single_account_baseline_template_path" requirement="optional" type="string">
  <HclListItemDescription>

    The path to the single-account-baseline template, in the architecture-catalog repository, to use when provisioning new accounts.

  </HclListItemDescription>
</HclListItem>

### vpc_module_url

<HclListItem name="vpc_module_url" requirement="optional" type="string">
  <HclListItemDescription>

    The URL of the vpc module to use when provisioning new accounts.

  </HclListItemDescription>
</HclListItem>

### vpc_module_version

<HclListItem name="vpc_module_version" requirement="optional" type="string">
  <HclListItemDescription>

    The version of the vpc module to use when provisioning new accounts.

  </HclListItemDescription>
</HclListItem>


## Account Vending Block Attributes

### account_identifiers

<HclListItem name="account_identifiers" requirement="required" type="list(string)">
<HclListItemDescription>

A list of account identifiers. When vending accounts with this Account Vending configuration, a new account will be created for each identifier.

</HclListItemDescription>
</HclListItem>

### catalog_repositories

<HclListItem name="catalog_repositories" requirement="optional" type="list(string)">
  <HclListItemDescription>
    A list of repositories that contain infrastructure modules that can be easily leveraged as a catalog by delegated repositories vended during account provisioning.
  </HclListItemDescription>
</HclListItem>


## CI Collaborator Block Attributes

### team

<HclListItem name="team" requirement="required" type="string">
  <HclListItemDescription>
    The name of the GitHub team or GitLab group to add to a delegated infrastructure-live repository.
  </HclListItemDescription>
</HclListItem>

### permission

<HclListItem name="permission" requirement="required" type="string">
  <HclListItemDescription>
    The permission to add to the GitHub team or GitLab group. See respective documentation for [GitHub](ttps://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization#permissions-for-each-role)/[GitLab](https://docs.gitlab.com/user/permissions/).
  </HclListItemDescription>
</HclListItem>
