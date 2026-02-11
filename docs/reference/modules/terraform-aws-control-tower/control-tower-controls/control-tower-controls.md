---
title: "Control Tower Controls"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Control Tower" version="1.4.1" lastModifiedVersion="0.7.6"/>

# Control Tower Controls

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.4.1/modules/landingzone/control-tower-controls" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.7.6" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This is a Terraform module for managing [AWS Control Tower controls](https://docs.aws.amazon.com/controltower/latest/controlreference/controls.html).

AWS Control Tower controls apply to an entire organizational unit (OU), and the control affects every AWS account within the OU. Therefore, when users perform any action in any account in your landing zone, the action is subject to the controls that govern the OU.

For a full list of preventive, detective and proactive controls, see the [AWS Control Tower controls library](https://docs.aws.amazon.com/controltower/latest/userguide/controls-reference.html).

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CONTROL-TOWER-CONTROLS MODULE
# ------------------------------------------------------------------------------------------------------

module "control_tower_controls" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-controls?ref=v1.4.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Configuration of AWS Control Tower Guardrails
  controls = <list(object(
    control_names           = list(string)
    organizational_unit_ids = list(string)
  ))>

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
# DEPLOY GRUNTWORK'S CONTROL-TOWER-CONTROLS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-controls?ref=v1.4.1"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Configuration of AWS Control Tower Guardrails
  controls = <list(object(
    control_names           = list(string)
    organizational_unit_ids = list(string)
  ))>

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

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.4.1/modules/control-tower-controls/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.4.1/modules/control-tower-controls/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.4.1/modules/control-tower-controls/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "3ecd05af7a4a7c15e4b9fc383b8ec398"
}
##DOCS-SOURCER-END -->
