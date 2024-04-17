---
title: "Control Tower Account Tagger"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Control Tower" version="0.7.2" />

# Control Tower Account Tagger

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.7.2/modules/landingzone/control-tower-account-tagger" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases?q=control-tower-account-tagger" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This is a Terraform module that append Tags to AWS accounts created by AWS Control Tower.

To avoid taking control over the AWS Control Tower accounts using an `import` block,
this module uses the AWS Organizations API to append tags to the accounts.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CONTROL-TOWER-ACCOUNT-TAGGER MODULE
# ------------------------------------------------------------------------------------------------------

module "control_tower_account_tagger" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-account-tagger?ref=v0.7.2"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS Account ID we want to tag
  account_id = <number>

  # Tags we want to apply on the AWS Account.
  account_tags = <map(any)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Always refresh the tags on the account. Because they are managed outside
  # terraform state any manual changes will not be picked up. This will force a
  # refresh on every apply.
  always_refresh = false

  # The method used to apply the tags. APPEND will add the tags to the account
  # overwitting only conflicting keys, EXCLUSIVE_OVERWRITE will remove all tags
  # and apply the new ones.
  tagging_behavior = "APPEND"

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CONTROL-TOWER-ACCOUNT-TAGGER MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-account-tagger?ref=v0.7.2"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS Account ID we want to tag
  account_id = <number>

  # Tags we want to apply on the AWS Account.
  account_tags = <map(any)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Always refresh the tags on the account. Because they are managed outside
  # terraform state any manual changes will not be picked up. This will force a
  # refresh on every apply.
  always_refresh = false

  # The method used to apply the tags. APPEND will add the tags to the account
  # overwitting only conflicting keys, EXCLUSIVE_OVERWRITE will remove all tags
  # and apply the new ones.
  tagging_behavior = "APPEND"

}


```

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.7.2/modules/control-tower-account-tagger/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.7.2/modules/control-tower-account-tagger/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.7.2/modules/control-tower-account-tagger/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "fb0a1acc05742c60d148aee2f30d370e"
}
##DOCS-SOURCER-END -->
