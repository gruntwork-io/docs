---
title: "Control Tower Multi-Account Factory"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="terraform-aws-control-tower" version="0.0.22" />

# Control Tower Multi-Account Factory

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.0.22/modules/landingzone/control-tower-multi-account-factory" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases?q=control-tower-multi-account-factory" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This is a Terraform module that will trigger the creation of multiple new AWS accounts by using Control Tower. Under
the hood, this module uses the [control-tower-account-factory](https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.0.22/modules/control-tower-account-factory) module.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CONTROL-TOWER-MULTI-ACCOUNT-FACTORY MODULE
# ------------------------------------------------------------------------------------------------------

module "control_tower_multi_account_factory" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-multi-account-factory?ref=v0.0.22"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The absolute path to the folder to look for new account request files. Each
  # file should be named account-<NAME>.yml, where NAME is the name of an
  # account to create. Within the YAML file, you must define the following
  # fields: account_email (Account email, must be globally unique across all AWS
  # Accounts), sso_user_first_name (The first name of the user who will be
  # granted admin access to this new account through AWS SSO),
  # sso_user_last_name (The last name of the user who will be granted admin
  # access to this new account through AWS SSO), sso_user_email (The email
  # address of the user who will be granted admin access to this new account
  # through AWS SSO), organizational_unit_name (The name of the organizational
  # unit or OU in which this account should be created—must be one of the OUs
  # enrolled in Control Tower).
  account_requests_folder = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # If specified, this is assumed to be the absolute file path of a YAML file
  # where the details of the new accounts created by this module will be written
  # (if the file already exists, the module will merge its data into the file).
  # The expected format of this YAML file is that the keys are the account names
  # and the values are objects with the following keys: id (the account ID),
  # email (the root user email address for the account).
  accounts_yaml_path = null

  # The ID of the AWS Control Tower Account Factory provisioning artifact in AWS
  # Service Catalog to use. On initial creation, we are able to look this up
  # automatically by name, but due to a Terraform or AWS bug
  # (https://github.com/hashicorp/terraform-provider-aws/issues/24362), the
  # lookup fails if you try to modify the account creation details (e.g., you
  # try to modify the SSO user details after the account has been created). In
  # those cases, you have to look up the ID manually by going to the Product
  # List in the AWS Service Catalog console
  # (https://console.aws.amazon.com/servicecatalog/home#admin-products),
  # clicking the 'AWS Control Tower Account Factory' product, and grabbing the
  # ID of the latest product version from the Product Versions table at the
  # bottom.
  provisioning_artifact_id = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CONTROL-TOWER-MULTI-ACCOUNT-FACTORY MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-multi-account-factory?ref=v0.0.22"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The absolute path to the folder to look for new account request files. Each
  # file should be named account-<NAME>.yml, where NAME is the name of an
  # account to create. Within the YAML file, you must define the following
  # fields: account_email (Account email, must be globally unique across all AWS
  # Accounts), sso_user_first_name (The first name of the user who will be
  # granted admin access to this new account through AWS SSO),
  # sso_user_last_name (The last name of the user who will be granted admin
  # access to this new account through AWS SSO), sso_user_email (The email
  # address of the user who will be granted admin access to this new account
  # through AWS SSO), organizational_unit_name (The name of the organizational
  # unit or OU in which this account should be created—must be one of the OUs
  # enrolled in Control Tower).
  account_requests_folder = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # If specified, this is assumed to be the absolute file path of a YAML file
  # where the details of the new accounts created by this module will be written
  # (if the file already exists, the module will merge its data into the file).
  # The expected format of this YAML file is that the keys are the account names
  # and the values are objects with the following keys: id (the account ID),
  # email (the root user email address for the account).
  accounts_yaml_path = null

  # The ID of the AWS Control Tower Account Factory provisioning artifact in AWS
  # Service Catalog to use. On initial creation, we are able to look this up
  # automatically by name, but due to a Terraform or AWS bug
  # (https://github.com/hashicorp/terraform-provider-aws/issues/24362), the
  # lookup fails if you try to modify the account creation details (e.g., you
  # try to modify the SSO user details after the account has been created). In
  # those cases, you have to look up the ID manually by going to the Product
  # List in the AWS Service Catalog console
  # (https://console.aws.amazon.com/servicecatalog/home#admin-products),
  # clicking the 'AWS Control Tower Account Factory' product, and grabbing the
  # ID of the latest product version from the Product Versions table at the
  # bottom.
  provisioning_artifact_id = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="account_requests_folder" requirement="required" type="string">
<HclListItemDescription>

The absolute path to the folder to look for new account request files. Each file should be named account-&lt;NAME>.yml, where NAME is the name of an account to create. Within the YAML file, you must define the following fields: account_email (Account email, must be globally unique across all AWS Accounts), sso_user_first_name (The first name of the user who will be granted admin access to this new account through AWS SSO), sso_user_last_name (The last name of the user who will be granted admin access to this new account through AWS SSO), sso_user_email (The email address of the user who will be granted admin access to this new account through AWS SSO), organizational_unit_name (The name of the organizational unit or OU in which this account should be created—must be one of the OUs enrolled in Control Tower).

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="accounts_yaml_path" requirement="optional" type="string">
<HclListItemDescription>

If specified, this is assumed to be the absolute file path of a YAML file where the details of the new accounts created by this module will be written (if the file already exists, the module will merge its data into the file). The expected format of this YAML file is that the keys are the account names and the values are objects with the following keys: id (the account ID), email (the root user email address for the account).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="provisioning_artifact_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the AWS Control Tower Account Factory provisioning artifact in AWS Service Catalog to use. On initial creation, we are able to look this up automatically by name, but due to a Terraform or AWS bug (https://github.com/hashicorp/terraform-provider-aws/issues/24362), the lookup fails if you try to modify the account creation details (e.g., you try to modify the SSO user details after the account has been created). In those cases, you have to look up the ID manually by going to the Product List in the AWS Service Catalog console (https://console.aws.amazon.com/servicecatalog/home#admin-products), clicking the 'AWS Control Tower Account Factory' product, and grabbing the ID of the latest product version from the Product Versions table at the bottom.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="accounts">
<HclListItemDescription>

The data from all the AWS accounts created.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.0.22/modules/control-tower-multi-account-factory/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.0.22/modules/control-tower-multi-account-factory/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.0.22/modules/control-tower-multi-account-factory/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "10ae66939d925256357b67918eeed6b9"
}
##DOCS-SOURCER-END -->
