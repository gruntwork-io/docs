---
title: "List Remove Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Terraform Utility Modules" version="0.9.0" />

# List Remove Module

<a href="https://github.com/gruntwork-io/terraform-aws-utilities/tree/main/modules/list-remove" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

This is a module that can be used to remove items in a given list from another list. This functionality is not yet
available as an interpolation function.

For example, suppose you have a list of availability zones (`["us-east-1a", "us-east-1b", "us-east-1c", "us-east-1d",
"us-east-1e"]`) and you want to remove specific zones that don't support the features you need (`["us-east-1b",
"us-east-1c"]`). You can use this module:

```hcl
module "list_remove" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-utilities.git//modules/list-remove?ref=v0.0.8"

  original_list = ["us-east-1a", "us-east-1b", "us-east-1c", "us-east-1d", "us-east-1e"]
  items_to_remove = ["us-east-1b", "us-east-1c"]
}

output "output_list" {
  value = "${module.list_remove.output_list}"
}
```

The output `new_list` should be the list `["us-east-1a", "us-east-1d", "us-east-1e"]`.

**NOTE**: This will dedup the input list due to the way it is implemented. This module will not work if you are expecting duplicate items to remain.

## Example code

See the [list-remove example](https://github.com/gruntwork-io/terraform-aws-utilities/tree/main/examples/list-remove) for working sample code.

## Sample Usage

<ModuleUsage>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S LIST-REMOVE MODULE
# ------------------------------------------------------------------------------------------------------

module "list_remove" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-utilities.git//modules/list-remove?ref=v0.9.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The list of items that you want to remove from the original list.
  items_to_remove = <INPUT REQUIRED>

  # The list of items where you want to remove items from.
  original_list = <INPUT REQUIRED>

}

```

</ModuleUsage>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="items_to_remove" requirement="required" type="list(any)">
<HclListItemDescription>

The list of items that you want to remove from the original list.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
</HclListItem>

<HclListItem name="original_list" requirement="required" type="list(any)">
<HclListItemDescription>

The list of items where you want to remove items from.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="output_list">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-utilities/tree/main/modules/list-remove/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-utilities/tree/main/modules/list-remove/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-utilities/tree/main/modules/list-remove/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "e69e701658af9b35bf132d58f1dae182"
}
##DOCS-SOURCER-END -->
