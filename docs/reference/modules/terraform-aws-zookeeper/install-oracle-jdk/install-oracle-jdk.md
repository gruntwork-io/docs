---
title: "Install Oracle JDK"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules%2Finstall-oracle-jdk" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Install Oracle JDK

This folder contains a script for installing the [Oracle
JDK](http://www.oracle.com/technetwork/java/javase/overview/index.html). The main reason to use the Oracle JDK instead
of [OpenJDK](http://openjdk.java.net/) is that Oracle provides commercial support for the Oracle JDK. The Oracle JDK
may also offer better performance and certain libraries not available in the OpenJDK, though the differences between
the two JDKs have [gotten smaller over the last few years](https://stackoverflow.com/q/17360011/483528).

This script has been tested on the following operating systems:

*   Amazon Linux
*   Ubuntu

There is a good chance it will work on Debian, CentOS, and RHEL as well, but our automated testing for this module does
not cover these other distros at the moment.

## Quick start

The easiest way to use this module is with the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install \
  --module-name "install-oracle-jdk" \
  --repo "https://github.com/gruntwork-io/terraform-aws-zookeeper" \
  --tag "v0.2.0"
```

We recommend running this module as part of a [Packer](https://www.packer.io/) template to create an [Amazon Machine
Image (AMI)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html) (see the [zookeeper-ami
example](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/examples/zookeeper-ami) for a fully-working sample code).

## Command line Arguments

The `install-oracle-jdk` module accepts the following arguments, all optional:

*   `--download-url`: The URL to download the JDK RPM installer from the Oracle website.
*   `--checksum`: The sha256 checksum from the Oracle website for the file at `--download-url`.

Note that this script will automatically detect whether you are running an `apt`-based system like Debian/Ubuntu, or a
`yum`-based system like RHEL, CentOS, or Amazon Linux.

If you're using `gruntwork-install` to run this module, you can pass these arguments using `--module-param` arguments.
Example:

```bash
gruntwork-install \
  --module-name "install-oracle-jdk" \
  --repo "https://github.com/gruntwork-io/terraform-aws-zookeeper" \
  --tag "v0.2.0" \
  --module-param "download-url=http://download.oracle.com/otn-pub/java/jdk/8u162-b12/0da788060d494f5095bf8624735fa2f1/jdk-8u162-linux-x64.tar.gz" \
  --module-param "checksum=68ec82d47fd9c2b8eb84225b6db398a72008285fafc98631b1ff8d2229680257"
```


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "80ab0cf4b8fa89511ea76fbf556574f7"
}
##DOCS-SOURCER-END -->
