---
title: "Join Path Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-utilities/tree/main/modules%2Fjoin-path" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Join Path Module

This is a module that can be used to join a list of given path parts (that is, file and folder names) into a single
path with the appropriate path separator (backslash or forward slash) for the current operating system. This is useful
for ensuring the paths you build will work properly on Windows, Linux, and OS X.

This module uses Python under the hood so, the Python must be installed on the OS.

## Example code

See the [join-path example](https://github.com/gruntwork-io/terraform-aws-utilities/tree/main/examples/join-path) for working sample code.

## Usage

Simply use the module in your Terraform code, replacing `<VERSION>` with the latest version from the [releases
page](https://github.com/gruntwork-io/terraform-aws-utilities/releases), and specifying the path parts using the
`path_parts` input:

```hcl
module "path" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-utilities.git//modules/join-path?ref=<VERSION>"
  
  path_parts = ["foo", "bar", "baz.txt"]
}
```

You can now get the joined path using the `path` output:

```hcl
# Will be set to "foo/bar/baz.txt" on Linux and OS X, "foo\bar\baz.txt" on Windows
joined_path = "${module.path.path}" 
```




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="path_parts" requirement="required" type="list(string)">
<HclListItemDescription>

A list of folder and file names to combine into a path, using the proper path separator for the current OS.

</HclListItemDescription>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl

   Example:
   path_parts = ["foo", "bar", "baz.txt"] => outputs "foo/bar/baz.txt" on Linux

```
</details>

</HclGeneralListItem>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="path">
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
  "hash": "42fdd85ec856aa19743780946a890fcd"
}
##DOCS-SOURCER-END -->
