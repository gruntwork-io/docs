---
title: "Control Tower Account Tagger"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Control Tower" version="0.8.2" lastModifiedVersion="0.8.1"/>

# Control Tower Account Tagger

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.8.2/modules/landingzone/control-tower-account-tagger" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.8.1" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This is a Terraform module that append Tags to AWS accounts created by AWS Control Tower.

To avoid taking control over the AWS Control Tower accounts using an `import` block,
this module uses the AWS Organizations API to append tags to the accounts.

## Usage

```hcl
module "control_tower_account_tagger" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower//modules/landingzone/control-tower-account-tagger?ref=v0.7.3"
  account_id = "123456789012"
  account_tags = {
      "team": "my-team",
      "cost-center": "1234"
  }
```

### Special considerations

Because the module appends tags to the AWS Account and does not store the tags in the Terraform state
it will not detect drifts in the tags. This means that if you change the tags in the AWS Account
they will not be reverted to the tags defined in the Terraform code. To avoid this, you can use the
`always_refresh` variable to force the module to refresh the tags in the AWS Account every time the
Terraform code is applied.

This module assume that the account is managed by AWS Control Tower and has two behaviors for applying tags:

*   `APPEND` - Append the tags to the account. If the tag already exists, it will be overwritten.
    If other tags exists in the account, they will be preserved.
*   `EXCLUSIVE_OVERWRITE` - Overwrite all tags from the account with the tags defined in the Terraform code.
    Any other tags on the account will be removed.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CONTROL-TOWER-ACCOUNT-TAGGER MODULE
# ------------------------------------------------------------------------------------------------------

module "control_tower_account_tagger" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-account-tagger?ref=v0.8.2"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS Account ID we want to tag
  account_id = <string>

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
  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-account-tagger?ref=v0.8.2"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS Account ID we want to tag
  account_id = <string>

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
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.8.2/modules/control-tower-account-tagger/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.8.2/modules/control-tower-account-tagger/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.8.2/modules/control-tower-account-tagger/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "b8c801562e41dd097165688b7185e053"
}
##DOCS-SOURCER-END -->
