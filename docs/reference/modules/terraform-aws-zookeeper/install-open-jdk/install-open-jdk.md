---
title: "Install Open JDK"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules%2Finstall-open-jdk" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Install Open JDK

This folder contains a script for installing the [OpenJDK](http://openjdk.java.net/). The differences between
the Oracle's JDK and OpenJDK have [gotten smaller over the last few years](https://stackoverflow.com/q/17360011/483528).

In the past, the Oracle JDK used to be the best option, as OpenJDK was missing many features, had worse performance,
and didn't offer commercial support. However, in recent years, the differences between the JDKs in terms of features and
performance have become negligible and Oracle no longer allows you to use their JDK for free . Therefore, most teams are
now better off going with OpenJDK, which you can install using this module. Note that if you need commercial support for
the JDK, you may wish to use Azul or AdoptOpenJdk instead.

## OS Version Compatibility

Not all versions of OpenJDK are available in the respective package repositories for each supported operating system.
The following Operating System and JDK versions are known to be available as of September, 2019:

**Amazon Linux**: 6, 7, 8

**CentOS**: 6, 7, 8, 11

**Ubuntu 16.04**: 6, 7, 8

**Ubuntu 18.04**: 8, 11

There is a good chance this will work with other operating systems (e.g Debian and RHEL) and JDK version combinations,
but our automated testing for this module does not cover these other distros at the moment.

## Quick start

The easiest way to use this module is with the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install \
  --module-name "install-open-jdk" \
  --repo "https://github.com/gruntwork-io/terraform-aws-zookeeper" \
  --tag "[LATEST_AVAILABLE_RELEASE]"
```

We recommend running this module as part of a [Packer](https://www.packer.io/) template to create an [Amazon Machine
Image (AMI)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html) (see the [zookeeper-ami
example](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/examples/zookeeper-ami) for a fully-working sample code).

## Command line Arguments

The `install-open-jdk` module accepts the following arguments, all optional:

*   `--version`: The version of OpenJDK that you want installed. Currently we support only 6, 7 and 8. The default is 8.

Note that this script will automatically detect whether you are running an `apt`-based system like Debian/Ubuntu, or a
`yum`-based system like RHEL, CentOS, or Amazon Linux.

If you're using `gruntwork-install` to run this module, you can pass these arguments using `--module-param` arguments.
Example:

```bash
gruntwork-install \
  --module-name "install-open-jdk" \
  --repo "https://github.com/gruntwork-io/terraform-aws-zookeeper" \
  --tag "v0.2.0" \
  --module-param "version=7" 
```


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "5a5c9fd8efd12f987f4a043512d73e47"
}
##DOCS-SOURCER-END -->
