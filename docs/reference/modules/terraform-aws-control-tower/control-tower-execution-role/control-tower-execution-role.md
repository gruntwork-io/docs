---
title: "Control Tower Execution Role"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Control Tower" version="1.1.0" />

# Control Tower Execution Role

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.1.0/modules/landingzone/control-tower-execution-role" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases?q=control-tower-execution-role" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

Creates an IAM Role that allows Control Tower to manage the AWS account in which you deploy this role. If you create
an AWS account using Control Tower, Control Tower will create this IAM role itself, but if you are importing an existing
account into Control Tower, you have to create this IAM role yourself, which is where this module comes in handy.

https://docs.aws.amazon.com/controltower/latest/userguide/enroll-account.html

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CONTROL-TOWER-EXECUTION-ROLE MODULE
# ------------------------------------------------------------------------------------------------------

module "control_tower_execution_role" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-execution-role?ref=v1.1.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the your management (root) AWS account where Control Tower is
  # enabled. This is the AWS account that will get access to the IAM role
  # created by this module.
  control_tower_management_account_id = <string>

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CONTROL-TOWER-EXECUTION-ROLE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-execution-role?ref=v1.1.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the your management (root) AWS account where Control Tower is
  # enabled. This is the AWS account that will get access to the IAM role
  # created by this module.
  control_tower_management_account_id = <string>

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="control_tower_management_account_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the your management (root) AWS account where Control Tower is enabled. This is the AWS account that will get access to the IAM role created by this module.

</HclListItemDescription>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="control_tower_execution_role_arn">
<HclListItemDescription>

The ARN of the Control Tower Execution Role

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.1.0/modules/control-tower-execution-role/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.1.0/modules/control-tower-execution-role/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.1.0/modules/control-tower-execution-role/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "ea98d6468576ab2170e681ae5f812056"
}
##DOCS-SOURCER-END -->
