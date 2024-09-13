---
title: "Run PEX as Resource"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Terraform Utility Modules" version="0.10.5" lastModifiedVersion="0.9.6"/>

# Run PEX as Resource

<a href="https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.10.5/modules/run-pex-as-resource" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.9.6" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module runs the provided PEX binary in a portable manner that works with multiple platforms and python versions, in
the context of a [local-exec provisioner](https://www.terraform.io/docs/provisioners/local-exec.html) in Terraform.

This module uses [`prepare-pex-environment`](https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.10.5/modules/prepare-pex-environment) under the hood. See [What is
PEX?](https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.10.5/modules/prepare-pex-environment/README.md#what-is-pex) for more details on what is a PEX file and how to construct one
for use with this module.

## Data Source vs Resource

Terraform provides two escape hatches where a first-class Terraform provider is not more appropriate. The escape hatches
allow you to call out to arbitrary binaries available on the operator machine. These are:

*   [External Data Source](https://www.terraform.io/docs/providers/external/data_source.html), where you can run the
    binary as a data source.
*   [local-exec Provisioners](https://www.terraform.io/docs/provisioners/local-exec.html), where you can run the binary to
    provision a resource.

This module uses the Provisioner approach (you can see the [run-pex-as-data-source module](https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.10.5/modules/run-pex-as-data-source)
for running it as a data source). Which approach to use depends on your needs:

*   Data sources are calculated every time a terraform state needs to be refreshed. This includes all `plan` and `apply`
    calls, even if the data source isn't explicitly changed.
*   Data sources are useful if the logic can be used to determine if a resource needs to be changed.
*   Data sources can output values that can be used in other parts of the Terraform code. You cannot do this with the
    provisioner approach.
*   There are limitations with Data Sources and dependencies. See [this terraform issue
    comment](https://github.com/hashicorp/terraform/issues/10603#issuecomment-265777128) for example.
*   Provisioners with a `null_resource` implements the standard resource life cycle (create, destroy, etc).
*   Provisioners with a `null_resource` have explicit controls on when to trigger.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S RUN-PEX-AS-RESOURCE MODULE
# ------------------------------------------------------------------------------------------------------

module "run_pex_as_resource" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-utilities.git//modules/run-pex-as-resource?ref=v0.10.5"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Parts of the path (folders and file names) to the python package directory
  # housing the pex file.
  pex_module_path_parts = <list(string)>

  # Parts of the path (folders and files names) to the PEX executable for python
  # as a list of strings.
  python_pex_path_parts = <list(string)>

  # Main function of the script, encoded as SCRIPT_MODULE:FUNCTION. So for
  # example, if the main function of the script is in a file named
  # `entrypoint.py` which houses the function `main`, then this should be
  # `entrypoint:main`.
  script_main_function = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The arguments to pass to the command as a string
  command_args = ""

  # If you set this variable to false, this module will not run the PEX script.
  # This is used as a workaround because Terraform does not allow you to use the
  # 'count' parameter on modules. By using this parameter, you can optionally
  # enable the null_resource within this module.
  enabled = true

  # Additional environment variables to set for the command.
  env = {}

  # If you set this variable to true, this module will pass in the json encoded
  # triggers that were used when the resource was created. If the script expects
  # option args, use var.previous_trigger_option to set which option to pass the
  # triggers json as.
  pass_in_previous_triggers = false

  # Pass in the json encoded trigger with this string as the option to passing
  # into the command. E.g, setting this to `--triggers` will pass in the option
  # `--triggers TRIGGERS_JSON`.
  previous_trigger_option = ""

  # A map of arbitrary strings that, when changed, will force the null resource
  # to be replaced, re-running any associated provisioners.
  triggers = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S RUN-PEX-AS-RESOURCE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-utilities.git//modules/run-pex-as-resource?ref=v0.10.5"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Parts of the path (folders and file names) to the python package directory
  # housing the pex file.
  pex_module_path_parts = <list(string)>

  # Parts of the path (folders and files names) to the PEX executable for python
  # as a list of strings.
  python_pex_path_parts = <list(string)>

  # Main function of the script, encoded as SCRIPT_MODULE:FUNCTION. So for
  # example, if the main function of the script is in a file named
  # `entrypoint.py` which houses the function `main`, then this should be
  # `entrypoint:main`.
  script_main_function = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The arguments to pass to the command as a string
  command_args = ""

  # If you set this variable to false, this module will not run the PEX script.
  # This is used as a workaround because Terraform does not allow you to use the
  # 'count' parameter on modules. By using this parameter, you can optionally
  # enable the null_resource within this module.
  enabled = true

  # Additional environment variables to set for the command.
  env = {}

  # If you set this variable to true, this module will pass in the json encoded
  # triggers that were used when the resource was created. If the script expects
  # option args, use var.previous_trigger_option to set which option to pass the
  # triggers json as.
  pass_in_previous_triggers = false

  # Pass in the json encoded trigger with this string as the option to passing
  # into the command. E.g, setting this to `--triggers` will pass in the option
  # `--triggers TRIGGERS_JSON`.
  previous_trigger_option = ""

  # A map of arbitrary strings that, when changed, will force the null resource
  # to be replaced, re-running any associated provisioners.
  triggers = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="pex_module_path_parts" requirement="required" type="list(string)">
<HclListItemDescription>

Parts of the path (folders and file names) to the python package directory housing the pex file.

</HclListItemDescription>
</HclListItem>

<HclListItem name="python_pex_path_parts" requirement="required" type="list(string)">
<HclListItemDescription>

Parts of the path (folders and files names) to the PEX executable for python as a list of strings.

</HclListItemDescription>
</HclListItem>

<HclListItem name="script_main_function" requirement="required" type="string">
<HclListItemDescription>

Main function of the script, encoded as SCRIPT_MODULE:FUNCTION. So for example, if the main function of the script is in a file named `entrypoint.py` which houses the function `main`, then this should be `entrypoint:main`.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="command_args" requirement="optional" type="string">
<HclListItemDescription>

The arguments to pass to the command as a string

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   We don't use null here because this is interpolated into the python script.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="enabled" requirement="optional" type="bool">
<HclListItemDescription>

If you set this variable to false, this module will not run the PEX script. This is used as a workaround because Terraform does not allow you to use the 'count' parameter on modules. By using this parameter, you can optionally enable the null_resource within this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="env" requirement="optional" type="map(string)">
<HclListItemDescription>

Additional environment variables to set for the command.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="pass_in_previous_triggers" requirement="optional" type="bool">
<HclListItemDescription>

If you set this variable to true, this module will pass in the json encoded triggers that were used when the resource was created. If the script expects option args, use <a href="#previous_trigger_option"><code>previous_trigger_option</code></a> to set which option to pass the triggers json as.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="previous_trigger_option" requirement="optional" type="string">
<HclListItemDescription>

Pass in the json encoded trigger with this string as the option to passing into the command. E.g, setting this to `--triggers` will pass in the option `--triggers TRIGGERS_JSON`.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="triggers" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of arbitrary strings that, when changed, will force the null resource to be replaced, re-running any associated provisioners.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="pex_done">
<HclListItemDescription>

This output is populated when the pex script successfully runs to completion. As such, it can be used to register hooks for terraform resources to depend on the pex execution.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.10.5/modules/run-pex-as-resource/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.10.5/modules/run-pex-as-resource/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.10.5/modules/run-pex-as-resource/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "bd7e60890c4e471c741528e3dfe07681"
}
##DOCS-SOURCER-END -->
