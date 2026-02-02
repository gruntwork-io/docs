---
title: "AWS Helpers"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="CI Modules" version="1.2.0" lastModifiedVersion="0.50.11"/>

# AWS Helpers

<a href="https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.2.0/modules/aws-helpers" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.11" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module contains helper scripts that automate common AWS tasks:

*   `publish-ami`: This script copies the given AMI to the specified AWS regions and makes it public.

## Installing the helpers

You can install the helpers using the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install --module-name "aws-helpers" --repo "https://github.com/gruntwork-io/terraform-aws-ci" --tag "v0.0.1"
```

We recommend running this command in the `dependencies` section of `circle.yml`:

```yaml
dependencies:
  override:
    # Install the Gruntwork Installer
    - curl -Ls https://raw.githubusercontent.com/gruntwork-io/gruntwork-installer/main/bootstrap-gruntwork-installer.sh | bash /dev/stdin --version v0.0.16

    # Use the Gruntwork Installer to install the gruntwork-module-circleci-helpers module
    - gruntwork-install --module-name "aws-helpers" --repo "https://github.com/gruntwork-io/terraform-aws-ci" --tag "v0.0.1"
```

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.2.0/modules/aws-helpers/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.2.0/modules/aws-helpers/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.2.0/modules/aws-helpers/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "e5e088801d5c9718b166dc1654b57801"
}
##DOCS-SOURCER-END -->
