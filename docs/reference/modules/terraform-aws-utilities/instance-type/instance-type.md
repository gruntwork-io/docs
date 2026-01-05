---
title: "Instance Type"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Terraform Utility Modules" version="0.10.7" lastModifiedVersion="0.9.6"/>

# Instance Type

<a href="https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.10.7/modules/instance-type" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.9.6" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This is a module that can be used to look up a list of EC2 instance types and determine which of them is available in
all Availability Zones (AZs) in the current AWS Region. This is useful because certain instance types, such as
`t2.micro` are not available in some of the newer AZs, while `t3.micro` is not available in some of the older AZs, and
if you have code that needs to run on a "small" instance across all AZs in many different regions, you can use this
module to automatically figure out which instance type you should use.

## Example code

See the [instance-type example](https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.10.7/examples/instance-type) for working sample code.

## Usage

Use the module in your Terraform code, replacing `<VERSION>` with the latest version from the [releases
page](https://github.com/gruntwork-io/terraform-aws-utilities/releases):

```hcl
module "path" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-utilities.git//modules/instance-type?ref=<VERSION>"
  
  instance_types = ["t2.micro", "t3.micro"]
}
```

The arguments to pass are:

*   `instance_types`: A list of instance types to look up in the current AWS region. We recommend putting them in order
    of preference, as the recommended_instance_type output variable will contain the first instance type from this list
    that is available in all AZs.

When you run `apply`, the `recommended_instance_type` output variable will contain the recommended instance type to
use. This will be the first instance type from your `instance_types` input that is available in all AZs in the current
region. If no instance type is available in all AZs, you'll get an error.

For example, as of July, 2020, if you run `apply` on the code above in `eu-west-1`, the `recommended_instance_type`
will be `t2.micro`, as that's available in all AZs in `eu-west-1`. However, if you run the same code in
`ap-northeast-2`, the `recommended_instance_type` will be `t3.micro`, as `t2.micro` is only available in 2 of the 4 AZs.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S INSTANCE-TYPE MODULE
# ------------------------------------------------------------------------------------------------------

module "instance_type" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-utilities.git//modules/instance-type?ref=v0.10.7"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of instance types to look up in the current AWS region. We recommend
  # putting them in order of preference, as the recommended_instance_type output
  # variable will contain the first instance type from this list that is
  # available in all AZs.
  instance_types = <list(string)>

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S INSTANCE-TYPE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-utilities.git//modules/instance-type?ref=v0.10.7"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of instance types to look up in the current AWS region. We recommend
  # putting them in order of preference, as the recommended_instance_type output
  # variable will contain the first instance type from this list that is
  # available in all AZs.
  instance_types = <list(string)>

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="instance_types" requirement="required" type="list(string)">
<HclListItemDescription>

A list of instance types to look up in the current AWS region. We recommend putting them in order of preference, as the recommended_instance_type output variable will contain the first instance type from this list that is available in all AZs.

</HclListItemDescription>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="instance_type_map">
<HclListItemDescription>

A map where the keys are the instance types in <a href="#instance_types"><code>instance_types</code></a> and the values are true or false, depending on whether every AZ in the current region contains this instance type.

</HclListItemDescription>
</HclListItem>

<HclListItem name="recommended_instance_type">
<HclListItemDescription>

The recommended instance type to use in this AWS region. This will be the first instance type in <a href="#instance_types"><code>instance_types</code></a> which is available in all AZs in this region.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.10.7/modules/instance-type/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.10.7/modules/instance-type/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.10.7/modules/instance-type/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "84d59ee31d6f17ab4b56faa6f5e17087"
}
##DOCS-SOURCER-END -->
