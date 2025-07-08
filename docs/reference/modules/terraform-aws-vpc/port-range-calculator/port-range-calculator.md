---
title: "Port Calculator Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="VPC Modules" version="0.28.6" lastModifiedVersion="0.22.3"/>

# Port Calculator Module

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.6/modules/port-range-calculator" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.22.3" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

> **NOTE:**
>
> This module is an intermediate module used by network-acl-inbound and network-acl-outbound modules. This is not
> intended to be used directly.

This Terraform Module includes port computations that make it easier to implement NACL rules that
explicitly omit specific ports. This is useful for adhering to various compliance standards that explicitly deny
inclusion of NACL rules that allow unrestricted access to certain ports, regardless of the priority of the rule.

For example, if the input specifies to exclude the ports 22 and 3389, the output will be a list of port ranges that exclude
just those ports:

```
[
  [0, 21],
  [23, 3388],
  [3390, 65535],
]
```

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S PORT-RANGE-CALCULATOR MODULE
# ------------------------------------------------------------------------------------------------------

module "port_range_calculator" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/port-range-calculator?ref=v0.28.6"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of ports to exclude from the range.
  exclude_ports = <list(number)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The starting range of the port range that is returned.
  from_port = 0

  # The ending range of the port range that is returned.
  to_port = 65535

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S PORT-RANGE-CALCULATOR MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/port-range-calculator?ref=v0.28.6"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of ports to exclude from the range.
  exclude_ports = <list(number)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The starting range of the port range that is returned.
  from_port = 0

  # The ending range of the port range that is returned.
  to_port = 65535

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="exclude_ports" requirement="required" type="list(number)">
<HclListItemDescription>

List of ports to exclude from the range.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="from_port" requirement="optional" type="number">
<HclListItemDescription>

The starting range of the port range that is returned.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="to_port" requirement="optional" type="number">
<HclListItemDescription>

The ending range of the port range that is returned.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="65535"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="allowed_port_ranges_list">
<HclListItemDescription>

List of port ranges that when combined, exclude the ports in the exclude_ports list. This is null if all ports are allowed.

</HclListItemDescription>
</HclListItem>

<HclListItem name="allowed_port_ranges_map">
<HclListItemDescription>

Map of port ranges to the ranges to allow. This is provided as a convenience output for use with resource for_each.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.6/modules/port-range-calculator/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.6/modules/port-range-calculator/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.6/modules/port-range-calculator/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "c126f2973620b586a1623127d308e79b"
}
##DOCS-SOURCER-END -->
