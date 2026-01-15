---
title: "Require Executable Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Terraform Utility Modules" version="0.10.8" lastModifiedVersion="0.10.7"/>

# Require Executable Module

<a href="https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.10.8/modules/require-executable" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.10.7" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This is a module that can be used to ensure particular executables is available in the `PATH`. This module will search
the OS `PATH` for the provided named executables and validate that it exists, as well as making sure the OS user running
terraform has permissions to run the named executable.

This module will exit with an error if any executable in the list does not exist, printing an error message indicating
which executables were missing.

This module uses Python under the hood, so Python must be installed and available on the OS.

## Example code

See the [require-executable example](https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.10.8/examples/require-executable) for working sample code.

## Conditional check

Sometimes you might want to guard the check for a required executable on a condition (e.g only check if an executable
exists if a particular input flag is set). However, Terraform currently [does not support conditional module
blocks](https://github.com/hashicorp/terraform/issues/953).

For this reason, this module will accept and noop on empty strings as a workaround. For example, suppose you want to
check if `go` is installed based on the condition `validate_go`. You can achieve this with the following terraform code:

```hcl
module "require_executables" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-utilities.git//modules/require-executable?ref=v1.0.8"
  required_executables = ["${var.validate_go ? "go" : ""}"]
}
```

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S REQUIRE-EXECUTABLE MODULE
# ------------------------------------------------------------------------------------------------------

module "require_executable" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-utilities.git//modules/require-executable?ref=v0.10.8"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of named executables that should exist on the OS PATH.
  required_executables = <list(string)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Error message to show if the required executable is not found. This is
  # printed for each executable that was not found. The module will make the
  # following substitutions in the string: `__EXECUTABLE_NAME__` will become the
  # name of the executable that was not found.
  error_message = "Not found: __EXECUTABLE_NAME__"

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S REQUIRE-EXECUTABLE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-utilities.git//modules/require-executable?ref=v0.10.8"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of named executables that should exist on the OS PATH.
  required_executables = <list(string)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Error message to show if the required executable is not found. This is
  # printed for each executable that was not found. The module will make the
  # following substitutions in the string: `__EXECUTABLE_NAME__` will become the
  # name of the executable that was not found.
  error_message = "Not found: __EXECUTABLE_NAME__"

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="required_executables" requirement="required" type="list(string)">
<HclListItemDescription>

A list of named executables that should exist on the OS PATH.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="error_message" requirement="optional" type="string">
<HclListItemDescription>

Error message to show if the required executable is not found. This is printed for each executable that was not found. The module will make the following substitutions in the string: `__EXECUTABLE_NAME__` will become the name of the executable that was not found.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;Not found: __EXECUTABLE_NAME__&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="executables">
<HclListItemDescription>

A map of the executables to the resolved path where they reside.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.10.8/modules/require-executable/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.10.8/modules/require-executable/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.10.8/modules/require-executable/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "aa285e967bc9e3f91f85ebb44704bf25"
}
##DOCS-SOURCER-END -->
