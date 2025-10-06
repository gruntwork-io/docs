---
title: "Organizational Units Data Source"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Control Tower" version="1.0.3" lastModifiedVersion="0.7.6"/>

# Organizational Units Data Source

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.0.3/modules/landingzone/organizational-units" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.7.6" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform module provides a data source for Organizational Units. If the input variable `discover_ous_recursively` is set to `true`, this module will look for the specified organizational unit (OU) recursively under the root of the organization. If set to `false`, it will only look for the OU directly under the root.

The output `ous` returns a list of organizational units, which have the following attributes:

```hcl
[
  {
    arn  = "arn:aws:organizations::123456789012:ou/o-i1qwerty/ou-hr12-2qwerty"
    id   = "ou-hr12-2qwerty"
    name = "Acme"
  }
]
```

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ORGANIZATIONAL-UNITS MODULE
# ------------------------------------------------------------------------------------------------------

module "organizational_units" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/organizational-units?ref=v1.0.3"

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # If set to true, this module will look for the specified organizational unit
  # (OU) recursively under the root of the organization. If set to false, it
  # will only look for the OU directly under the root.
  discover_ous_recursively = false

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ORGANIZATIONAL-UNITS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/organizational-units?ref=v1.0.3"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # If set to true, this module will look for the specified organizational unit
  # (OU) recursively under the root of the organization. If set to false, it
  # will only look for the OU directly under the root.
  discover_ous_recursively = false

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Optional

<HclListItem name="discover_ous_recursively" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, this module will look for the specified organizational unit (OU) recursively under the root of the organization. If set to false, it will only look for the OU directly under the root.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="ous">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.0.3/modules/organizational-units/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.0.3/modules/organizational-units/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.0.3/modules/organizational-units/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "c711e7c1b6febf0d9a57a15d8cbada83"
}
##DOCS-SOURCER-END -->
