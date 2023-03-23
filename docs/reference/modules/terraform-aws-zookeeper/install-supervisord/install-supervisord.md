---
title: "Install Supervisord"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="ZooKeeper" version="0.12.0" lastModifiedVersion="0.11.0"/>

# Install Supervisord

<a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/install-supervisord" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.11.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This folder contains a script for installing the [Supervisord](http://supervisord.org/), a process supervisor that can
run on most \*nix operating systems.

This script has been tested on the following operating systems:

*   Amazon Linux
*   Ubuntu

There is a good chance it will work on Debian, CentOS, and RHEL as well, but our automated testing for this
module does not cover these other distros at the moment.

## Quick start

The easiest way to use this module is with the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install \
  --module-name "install-supervisord" \
  --repo "https://github.com/gruntwork-io/terraform-aws-zookeeper" \
  --tag "v0.0.4"
```

We recommend running this module as part of a [Packer](https://www.packer.io/) template to create an [Amazon Machine
Image (AMI)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html) (see the [zookeeper-ami
example](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/examples/zookeeper-ami) for a fully-working sample code).


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/install-supervisord/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/install-supervisord/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/install-supervisord/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "07824b27040e40cef7d822b153de2382"
}
##DOCS-SOURCER-END -->
