---
title: "Run Health Checker"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="ZooKeeper" version="0.12.0" lastModifiedVersion="0.11.1"/>

# Run Health Checker

<a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/run-health-checker" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.11.1" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This folder contains:

1.  [run-health-checker](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/run-health-checker/bin/run-health-checker): A Bash script for installing, configuring, and running [health-checker](https://github.com/gruntwork-io/health-checker).
2.  [check-zookeeper](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/run-health-checker/bin/check-zookeeper): A Bash script for checking health of the ZooKeeper node.
3.  [install.sh](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/run-health-checker/install.sh): A Bash script that installs the `run-health-checker` script.

Typically, you would run the `install.sh` script in a [Packer](https://www.packer.io/) template so that you create an Amazon
Machine Image (AMI) that comes pre-installed with `run-health-checker`. Then, by calling `run-health-checker` in [User Data](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html), your server will configure and start health-checker
on boot.

## `run-health-checker`

This script assumes that the following are already installed:

1.  Supervisord: see the [install-supervisord module](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/install-supervisord).

The `run-health-checker` script will use Supervisord to start health-checker.

This script has been tested on the following operating systems:

*   Amazon Linux
*   Ubuntu

There is a good chance it will work on Debian, CentOS, and RHEL as well, but our automated testing for this
module does not cover these other distros at the moment.

## `check-zookeeper`

This script assumes that the following are already installed:

1.  `nc`: Used to issue `srvr` command to ZooKeeper.

This script has been tested on the following operating systems:

*   Amazon Linux
*   Ubuntu

There is a good chance it will work on Debian, CentOS, and RHEL as well, but our automated testing for this
module does not cover these other distros at the moment.

## Quick start

The easiest way to install the run-health-checker script is with the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install \
  --module-name "run-health-checker" \
  --repo "https://github.com/gruntwork-io/terraform-aws-zookeeper" \
  --tag "v0.4.11"
```

This will download and install health-checker itself, as well as the `run-health-checker` and  `check-zookeeper` scripts. Later, when you run the
`run-health-checker` script, you'll configure health-checker to run as a service.

We recommend running this module as part of a [Packer](https://www.packer.io/) template to create an [Amazon Machine Image
(AMI)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html) (see the [zookeeper-ami
example](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/examples/zookeeper-ami) for a fully-working example).

## Install command line arguments

When you run `gruntwork-install` to install `run-health-checker`, `gruntwork-install` downloads the appropriate version
of the [run-health-checker module](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/run-health-checker) from GitHub and runs the `install.sh` script in the folder.
The `install.sh` script accepts the following arguments, all optional:

*   `--install-dir`: The directory where the `run-health-checker` files should be installed. Default: `/opt/health-checker`.
*   `--user`: The user who will be set as the owner of `--install-dir`. Default: `health_checker`.
*   `--version`: The version of health-checker to install. May be specified as a [Tag Constraint Expression](https://github.com/gruntwork-io/fetch#tag-constraint-expressions)

If you're using `gruntwork-install` to run this module, you can pass these arguments using `--module-param` arguments.
Example:

```bash
gruntwork-install \
  --module-name "run-health-checker" \
  --repo "https://github.com/gruntwork-io/terraform-aws-zookeeper" \
  --tag "v0.4.11" \
  --module-param "install-dir=/opt/health-checker"
```

## run-health-checker command line arguments

When you run the `run-health-checker` script itself, you must provide the following arguments:

*   `--tcp-port`: The port number on which a TCP connection will be attempted by health-checker. Specify one or more times.

For example, to configure health-checker to run as a service using Supervisord that listens on its default port of 5000
for inbound HTTP requests and which uses all inbound requests to trigger an attempt to open a TCP connection to port
8000 and run a custom health check script with a timeout of 5 seconds, you can use:

```bash
run-health-checker \
  --tcp-port 8080 \
  --script "/opt/health-checker/check-zookeeper --zkport 2181" \
  --script-timeout 5
```

To see the other arguments that `run-health-checker` accepts, run `run-health-checker` with the `--help` flag or view
the source code.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/run-health-checker/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/run-health-checker/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/run-health-checker/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "a51d27c508c07984c94cf29a2da2c5e2"
}
##DOCS-SOURCER-END -->
