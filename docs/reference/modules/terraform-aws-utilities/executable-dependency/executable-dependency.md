---
title: "Executable Dependency"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Terraform Utility Modules" version="0.10.6" lastModifiedVersion="0.10.5"/>

# Executable Dependency

<a href="https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.10.6/modules/executable-dependency" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.10.5" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This is a module that can be used to check if an executable is already installed, and if it's not, download it from a
URL. This is useful if your Terraform code has an external dependency and you want that dependency to be auto installed
if it's not installed already: e.g., [terraform-aws-eks](https://github.com/gruntwork-io/terraform-aws-eks) expects the
[kubergrunt](https://github.com/gruntwork-io/kubergrunt) binary to be installed, and `executable-dependency` allows
`terraform-aws-eks` to automatically download `kubergrunt` if it's not already available.

**NOTE**: This module requires that Python 3 is installed on your system.

## Example code

See the [executable-dependency example](https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.10.6/examples/executable-dependency) for working sample code.

## Usage

Use the module in your Terraform code, replacing `<VERSION>` with the latest version from the [releases
page](https://github.com/gruntwork-io/terraform-aws-utilities/releases):

```hcl
module "path" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-utilities.git//modules/executable-dependency?ref=<VERSION>"
  
  executable     = "kubergrunt"
  download_url   = "https://github.com/gruntwork-io/kubergrunt/releases/download/v0.5.13/kubergrunt"
  append_os_arch = true
}
```

The arguments to pass are:

*   `executable`: The executable to look for on the system `PATH` and in `install_dir`. If not found, this executable
    will be downloaded from `download_url`.

*   `download_url`: The URL to download the executable from if `executable` is not found on the system `PATH` or
    `install_dir`.

*   `append_os_arch`: If set to true, append the operating system and architecture to the URL. E.g., Append `linux_amd64`
    if this code is being run on a 64 bit Linux OS. This is useful to download the proper binary (specifically, a binary
    using the Go naming conventions) for the current operating system and CPU.

*   `install_dir`: The folder to copy the executable to after downloading it from `download_url`. If set to `null` (the
    default), the executable will be copied to a folder in the system temp directory. The folder will be named based on
    an md5 hash of `download_url`, so for each `download_url`, the executable will only have to be downloaded once.

This module has a single output, `executable_path`, which is the path you should use to run the executable. The value
will either be the path of the executable on the system `PATH` or a path in `install_dir`.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EXECUTABLE-DEPENDENCY MODULE
# ------------------------------------------------------------------------------------------------------

module "executable_dependency" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-utilities.git//modules/executable-dependency?ref=v0.10.6"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The URL to download the executable from if var.executable is not found on
  # the system PATH or in var.install_dir.
  download_url = <string>

  # The executable to look for on the system PATH and in var.install_dir. If not
  # found, this executable will be downloaded from var.download_url.
  executable = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # If set to true, append the operating system and architecture to the URL.
  # E.g., Append linux_amd64 if this code is being run on a 64 bit Linux OS.
  append_os_arch = true

  # Set to false to have disable this module, so it does not try to download the
  # executable, and always returns its path unchanged. This weird parameter
  # exists solely because Terraform does not support conditional modules.
  # Therefore, this is a hack to allow you to conditionally decide if this
  # module should run or not.
  enabled = true

  # The folder to copy the executable to after downloading it from
  # var.download_url. If set to null (the default), the executable will be
  # copied to a folder in the system temp directory. The folder will be named
  # based on an md5 hash of var.download_url, so for each var.download_url, the
  # executable will only have to be downloaded once.
  install_dir = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EXECUTABLE-DEPENDENCY MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-utilities.git//modules/executable-dependency?ref=v0.10.6"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The URL to download the executable from if var.executable is not found on
  # the system PATH or in var.install_dir.
  download_url = <string>

  # The executable to look for on the system PATH and in var.install_dir. If not
  # found, this executable will be downloaded from var.download_url.
  executable = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # If set to true, append the operating system and architecture to the URL.
  # E.g., Append linux_amd64 if this code is being run on a 64 bit Linux OS.
  append_os_arch = true

  # Set to false to have disable this module, so it does not try to download the
  # executable, and always returns its path unchanged. This weird parameter
  # exists solely because Terraform does not support conditional modules.
  # Therefore, this is a hack to allow you to conditionally decide if this
  # module should run or not.
  enabled = true

  # The folder to copy the executable to after downloading it from
  # var.download_url. If set to null (the default), the executable will be
  # copied to a folder in the system temp directory. The folder will be named
  # based on an md5 hash of var.download_url, so for each var.download_url, the
  # executable will only have to be downloaded once.
  install_dir = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="download_url" requirement="required" type="string">
<HclListItemDescription>

The URL to download the executable from if <a href="#executable"><code>executable</code></a> is not found on the system PATH or in <a href="#install_dir"><code>install_dir</code></a>.

</HclListItemDescription>
</HclListItem>

<HclListItem name="executable" requirement="required" type="string">
<HclListItemDescription>

The executable to look for on the system PATH and in <a href="#install_dir"><code>install_dir</code></a>. If not found, this executable will be downloaded from <a href="#download_url"><code>download_url</code></a>.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="append_os_arch" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, append the operating system and architecture to the URL. E.g., Append linux_amd64 if this code is being run on a 64 bit Linux OS.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to have disable this module, so it does not try to download the executable, and always returns its path unchanged. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if this module should run or not.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="install_dir" requirement="optional" type="string">
<HclListItemDescription>

The folder to copy the executable to after downloading it from <a href="#download_url"><code>download_url</code></a>. If set to null (the default), the executable will be copied to a folder in the system temp directory. The folder will be named based on an md5 hash of <a href="#download_url"><code>download_url</code></a>, so for each <a href="#download_url"><code>download_url</code></a>, the executable will only have to be downloaded once.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="executable_path">
<HclListItemDescription>

The path to use to run the executable. Will either be the path of the executable on the system PATH or a path in <a href="#install_dir"><code>install_dir</code></a>.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.10.6/modules/executable-dependency/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.10.6/modules/executable-dependency/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.10.6/modules/executable-dependency/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "777d54322d9919cfc12f8d7285a0d236"
}
##DOCS-SOURCER-END -->
