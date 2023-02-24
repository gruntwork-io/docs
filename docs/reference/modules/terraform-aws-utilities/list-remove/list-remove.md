---
title: "List Remove Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-utilities/tree/main/modules%2Flist-remove" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# List Remove Module

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
    "https://github.com/gruntwork-io/terraform-aws-utilities/tree/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-utilities/tree/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-utilities/tree/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "49f371dbe136f095b373f7f6e134aa7a"
}
##DOCS-SOURCER-END -->
