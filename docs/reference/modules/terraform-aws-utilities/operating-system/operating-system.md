---
title: "Operating System Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Terraform Utility Modules" version="0.9.2" lastModifiedVersion="0.8.0"/>

# Operating System Module

<a href="https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.9.2/modules/operating-system" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.8.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This is a module that can be used to figure out what operating system is being used to run Terraform. This may be used
to modify Terraform's behavior depending on the OS, such as modifying the way you format file paths on Linux vs
Windows (see also the [join-path module](https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.9.2/modules/join-path)).

This module uses Python under the hood so, the Python must be installed on the OS.

## Example code

See the [operating-system example](https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.9.2/examples/operating-system) for working sample code.

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


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.9.2/modules/operating-system/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.9.2/modules/operating-system/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-utilities/tree/v0.9.2/modules/operating-system/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "29c869a7703bea9818aa479e2483094c"
}
##DOCS-SOURCER-END -->
