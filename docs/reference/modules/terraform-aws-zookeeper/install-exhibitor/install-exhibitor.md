---
title: "Install Exhibitor"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem} from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules%2Finstall-exhibitor" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Install Exhibitor

This folder contains a script for installing [Exhibitor](https://github.com/soabase/exhibitor/), a supervisor system
for ZooKeeper that provides a number of features, including starting the ZooKeeper process, restarting the process if
it fails, performing periodic cleanup of ZooKeeper's log directory, and offering a GUI for viewing ZooKeeper nodes

This script has been tested on the following operating systems:

*   Amazon Linux
*   Ubuntu

There is a good chance it will work on Debian, CentOS, and RHEL as well, but our automated testing for this
module does not cover these other distros at the moment.

## Quick start

The easiest way to use this module is with the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install \
  --module-name "install-exhibitor" \
  --repo "https://github.com/gruntwork-io/terraform-aws-zookeeper" \
  --tag "v0.0.4"
```

We recommend running this module, along with [install-zookeeper](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/install-zookeeper), as part of a
[Packer](https://www.packer.io/) template to create an [Amazon Machine Image
(AMI)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html) (see the [zookeeper-ami
example](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/examples/zookeeper-ami) for a fully-working sample code). You can then deploy the AMI using the
[zookeeper-cluster module](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/zookeeper-cluster) (see the [zookeeper-cluster
example](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/examples/zookeeper-cluster) for fully-working sample code).

## Command line Arguments

The `install-exhibitor` module accepts the following arguments, all optional:

*   `--version`: The version of Exhibitor to install.
*   `--install-dir`: The directory where to install Exhibitor. Default: `/opt/exhibitor`.
*   `--user`: The user who will be set as the owner of `--install-dir`. Default: `zookeeper`.

If you're using `gruntwork-install` to run this module, you can pass these arguments using `--module-param` arguments.
Example:

```bash
gruntwork-install \
  --module-name "install-exhibitor" \
  --repo "https://github.com/gruntwork-io/terraform-aws-zookeeper" \
  --tag "v0.0.4" \
  --module-param "version=1.5.6"
```


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "716555a2ba864f581cce1d2c9ede72ad"
}
##DOCS-SOURCER-END -->
