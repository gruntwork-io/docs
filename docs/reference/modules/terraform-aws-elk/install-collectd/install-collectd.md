---
title: "CollectD Install Script"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="ELK AWS Module" version="0.11.1" lastModifiedVersion="0.10.0"/>

# CollectD Install Script

<a href="https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/install-collectd" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.10.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

CollectD is a daemon which collects system and application performance metrics periodically and provides mechanisms to store the values in a variety of ways. This folder contains a script for installing [CollectD](https://collectd.org/).

This script has been tested on the following operating systems:

*   Ubuntu 18.04
*   Ubuntu 20.04
*   CentOS 7
*   Amazon Linux 2

## Quick start

The easiest way to use this module is with the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install \
  --module-name "install-collectd" \
  --repo "https://github.com/gruntwork-io/terraform-aws-elk" \
  --tag "v0.0.1"
```

We recommend running this module as part of a [Packer](https://www.packer.io/) template to create an [Amazon Machine Image (AMI)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html).


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/install-collectd/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/install-collectd/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/install-collectd/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "1e44d8cbfe1fc94adff0a6b939aef010"
}
##DOCS-SOURCER-END -->
