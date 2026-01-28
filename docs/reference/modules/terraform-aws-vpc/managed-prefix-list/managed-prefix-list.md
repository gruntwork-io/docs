---
title: "Sample Usage"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="OpenTofu/Terraform Modules for AWS Networking & Content Delivery" version="0.28.10" />

# Sample Usage

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/managed-prefix-list" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases?q=managed-prefix-list" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

```hcl
module "vpc" {
  source = "../../modules/managed-prefix-list"

  managed_prefix_lists_settings = {
    "example-mpl" = {
      entries = {
        "entry-1" = { cidr = "10.0.0.0/16", description = "Example entry 1" }
        "entry-2" = { cidr = "10.1.0.0/16", description = "Example entry 2" }
      }
    }
  }
}
```

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S MANAGED-PREFIX-LIST MODULE
# ------------------------------------------------------------------------------------------------------

module "managed_prefix_list" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/managed-prefix-list?ref=v0.28.10"

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Managed Prefix Lists Settings. Please refer to variable definition for
  # details.
  managed_prefix_lists_settings = {}

  # Tags to assign to all resources
  tags = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S MANAGED-PREFIX-LIST MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/managed-prefix-list?ref=v0.28.10"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Managed Prefix Lists Settings. Please refer to variable definition for
  # details.
  managed_prefix_lists_settings = {}

  # Tags to assign to all resources
  tags = {}

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Optional

<HclListItem name="managed_prefix_lists_settings" requirement="optional" type="map(object(…))">
<HclListItemDescription>

Managed Prefix Lists Settings. Please refer to variable definition for details.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    # Prefix list configuration:
    # - max_entries: Maximum entries for prefix list
    #   NOTE: When referenced in resources, counts as same number of rules
    #   (e.g., SG with prefix list of max 20 = 20 SG rules)
    # - address_family: Address family. Options: IPv4 | IPv6. Defaults to IPv4
    # - tags: Custom tags
    max_entries    = optional(number)
    address_family = optional(string, "IPv4")
    tags           = optional(map(string))

    # Prefix list entries (map key: entry identifier for Terraform state only, e.g. "entry_1", "entry_2"):
    # - cidr: CIDR block (must match address family)
    # - description: Entry description
    entries = optional(map(object({
      cidr        = string
      description = optional(string)
    })))
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

     Prefix list entries (map key: entry identifier for Terraform state only, e.g. "entry_1", "entry_2"):
     - cidr: CIDR block (must match address family)
     - description: Entry description

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags to assign to all resources

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="managed_prefix_lists">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/managed-prefix-list/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/managed-prefix-list/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/managed-prefix-list/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "975a41dfa63f50f7c94e0cadc16d1ab7"
}
##DOCS-SOURCER-END -->
