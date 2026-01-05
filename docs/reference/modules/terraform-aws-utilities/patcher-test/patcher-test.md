---
title: "Operating System Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Terraform Utility Modules" version="0.10.7" lastModifiedVersion="0.10.4"/>

# Operating System Module

<a href="https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.10.7/modules/patcher-test" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.10.4" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This is a module that can be used to figure out what operating system is being used to run Terraform. This may be used
to modify Terraform's behavior depending on the OS, such as modifying the way you format file paths on Linux vs
Windows (see also the [join-path module](https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.10.7/modules/join-path)).

This module uses Python under the hood so, the Python must be installed on the OS.

## Example code

See the [operating-system example](https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.10.7/examples/operating-system) for working sample code.

## Usage

Simply use the module in your Terraform code, replacing `<VERSION>` with the latest version from the [releases
page](https://github.com/gruntwork-io/terraform-aws-utilities/releases):

```hcl
module "os" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-utilities.git//modules/operating-system?ref=<VERSION>"
}
```

*   You can now get the name of the operating system from the `name` output, which will be set to either `Linux`,
    `Darwin`, or `Windows`

*   You can also get the path separator for the current OS—backslash for Windows, forward slash everywhere else—from the
    `path_separator` output.

```hcl
operating_system_name = "${module.os.name}"
path_separator        = "${module.os.path_separator}"
```

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S PATCHER-TEST MODULE
# ------------------------------------------------------------------------------------------------------

module "patcher_test" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-utilities.git//modules/patcher-test?ref=v0.10.7"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Sample input for the module
  sampleinput = <string>

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S PATCHER-TEST MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-utilities.git//modules/patcher-test?ref=v0.10.7"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Sample input for the module
  sampleinput = <string>

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="sampleinput" requirement="required" type="string">
<HclListItemDescription>

Sample input for the module

</HclListItemDescription>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="name">
</HclListItem>

<HclListItem name="path_separator">
</HclListItem>

<HclListItem name="sampleinput">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.10.7/modules/patcher-test/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.10.7/modules/patcher-test/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.10.7/modules/patcher-test/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "4edaaeeb76dab50f2d786b2e33a0fcb5"
}
##DOCS-SOURCER-END -->
