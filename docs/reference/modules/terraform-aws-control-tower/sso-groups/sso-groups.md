---
title: "SSO Groups"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Control Tower" version="0.8.7" />

# SSO Groups

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.8.7/modules/aws-sso/sso-groups" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases?q=sso-groups" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module is only necessary when using Identity Providers that do not support group synchronization
with AWS. Currently, Google is the only Identity Provider we are aware of that requires this module.

Example Usage:

```hcl
#terragrunt.hcl

#Depend on any permission sets managed using terraform
dependency "full_access" {
  config_path = "../sso-permission-sets/full-access"
}

include {
  path = find_in_parent_folders()
}

locals {
  source_base_url = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git///modules/aws-sso/sso-groups"
  common_vars     = read_terragrunt_config(find_in_parent_folders("common.hcl"))
  account_ids     = local.common_vars.locals.account_ids

  #Create one or more groups
  admin_group = [
    "grunty@gruntwork.io",
    #...
  ]
}

inputs = {
  #Map the groups to any permission sets they should belong to
  group_to_accounts_and_permissions = {
    "GW Ops Admins Prod" = {
      users               = local.admin_group
      account_id          = local.account_ids.prod
      permission_set_arn  = dependency.full_access.outputs.arn
      permission_set_name = dependency.full_access.outputs.name
    },
    #...
  }
}

```

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S SSO-GROUPS MODULE
# ------------------------------------------------------------------------------------------------------

module "sso_groups" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/aws-sso/sso-groups?ref=v0.8.7"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  group_to_accounts_and_permissions = <map(object(
    users = list(string)
    account_id = string
    permission_set_arn  = string
    permission_set_name = string
  ))>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # ID of the SSO Admin Identity Store where all the users and groups are
  # stored. This information will be dynamically looked up when set to null.
  sso_admin_identity_store_id = null

  # ARN of the SSO Admin instance where the Permission Set should be
  # provisioned. This instance will be dynamically looked up when set to null.
  sso_admin_instance_arn = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S SSO-GROUPS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/aws-sso/sso-groups?ref=v0.8.7"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  group_to_accounts_and_permissions = <map(object(
    users = list(string)
    account_id = string
    permission_set_arn  = string
    permission_set_name = string
  ))>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # ID of the SSO Admin Identity Store where all the users and groups are
  # stored. This information will be dynamically looked up when set to null.
  sso_admin_identity_store_id = null

  # ARN of the SSO Admin instance where the Permission Set should be
  # provisioned. This instance will be dynamically looked up when set to null.
  sso_admin_instance_arn = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="group_to_accounts_and_permissions" requirement="required" type="map(object(…))">
<HclListItemTypeDetails>

```hcl
map(object({
    # This is a list of user emails
    users = list(string)
    # Account ID
    account_id = string
    # This will be the arn of the Permission set
    permission_set_arn  = string
    permission_set_name = string
  }))
```

</HclListItemTypeDetails>
</HclListItem>

### Optional

<HclListItem name="sso_admin_identity_store_id" requirement="optional" type="string">
<HclListItemDescription>

ID of the SSO Admin Identity Store where all the users and groups are stored. This information will be dynamically looked up when set to null.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="sso_admin_instance_arn" requirement="optional" type="string">
<HclListItemDescription>

ARN of the SSO Admin instance where the Permission Set should be provisioned. This instance will be dynamically looked up when set to null.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="group_to_accounts_and_permissions">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.8.7/modules/sso-groups/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.8.7/modules/sso-groups/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.8.7/modules/sso-groups/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "398c85d859abad06e0e5c2876024d7cb"
}
##DOCS-SOURCER-END -->
