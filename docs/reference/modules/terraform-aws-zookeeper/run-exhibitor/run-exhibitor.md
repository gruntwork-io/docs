---
title: "Run Exhibitor Script"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="ZooKeeper" version="0.12.0" />

# Run Exhibitor Script

<a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/run-exhibitor" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

This folder contains a script for running [Exhibitor](https://github.com/soabase/exhibitor/). Typically, you would run
this script while your server is booting to start Exhibitor. This script assumes that the following are already
installed:

1.  Exhibitor: see the [install-exhibitor module](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/install-exhibitor).
2.  ZooKeeper: see the [install-zookeeper module](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/install-zookeeper).
3.  Supervisord: see the [install-supervisord module](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/install-supervisord).
4.  [AWS CLI](https://aws.amazon.com/cli/).
5.  [jq](https://stedolan.github.io/jq/).

The `run-exhibitor` script will generate an Exhibitor configuration (see [Exhibitor config docs](#exhibitor-config)
below for details) and then use Supervisord to start Exhibitor.

This script has been tested on the following operating systems:

*   Amazon Linux
*   Ubuntu

There is a good chance it will work on Debian, CentOS, and RHEL as well, but our automated testing for this
module does not cover these other distros at the moment.

## Quick start

The easiest way to install the run-exhibitor script is with the [Gruntwork
Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install \
  --module-name "run-exhibitor" \
  --repo "https://github.com/gruntwork-io/terraform-aws-zookeeper" \
  --tag "v0.0.4"
```

We recommend running this module, as well as [install-exhibitor](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/install-exhibitor), as part of a
[Packer](https://www.packer.io/) template to create an [Amazon Machine Image
(AMI)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html) (see the [zookeeper-ami
example](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/examples/zookeeper-ami) for a fully-working sample code).

## Install command line arguments

When installing the `run-exhibitor` script, you can pass in the following arguments, all optional:

*   `--install-dir`: The directory where the `run-exhibitor` script should be installed. Default: `/opt/exhibitor`.
*   `--user`: The user who will be set as the owner of `--install-dir`. Default: `zookeeper`.

If you're using `gruntwork-install` to run this module, you can pass these arguments using `--module-param` arguments.
Example:

```bash
gruntwork-install \
  --module-name "run-exhibitor" \
  --repo "https://github.com/gruntwork-io/terraform-aws-zookeeper" \
  --tag "v0.0.4" \
  --module-param "install-dir=/opt/exhibitor"
```

## run-exhibitor command line arguments

When you run the `run-exhibitor`, it has three required arguments:

*   `--shared-config-s3-bucket`: The name of the S3 bucket where shared config for ZooKeeper servers is stored.
*   `--shared-config-s3-key`: The path in the S3 bucket where shared config for ZooKeeper servers is stored (e.g. `zoo.cfg`).
*   `--shared-config-s3-region`: The AWS region where the shared config S3 bucket lives (e.g. `us-east-1`).

The script also accepts a number of optional parameters to customize both Exhibitor and ZooKeeper behavior. Run the
script with the `--help` flag to see all available options. See the [Exhibitor config docs](#exhibitor-config) below
for the highlights.

## Exhibitor config

The `run-exhibitor` script generates an [Exhibitor configuration
file](https://github.com/soabase/exhibitor/wiki/Configuration-UI) that specifies all the settings for how to run
Exhibitor and ZooKeeper.

Here are the key items to pay attention to:

*   [Server IPs and IDs](#server-ips-and-ids)
*   [JVM memory settings](#jvm-memory-settings)
*   [Transaction logs](#transaction-logs)
*   [Application logs](#application-logs)

### Server IPs and IDs

Every ZooKeeper server needs an IP address and a unique ID. By default, the `run-exhibitor` script will use ENIs as the
IP addresses (check out the [Static IPs and ENIs documentation](#static-ips-and-enis) for why we use ENIs) and the
`ServerGroupIndex` tag of each server as its ID.

Here's what the `run-exhibitor` script does:

1.  Use the AWS CLI to look up the value of the `ServerGroupName` tag on the current server. This tag is set by the
    [server-group module](https://github.com/gruntwork-io/terraform-aws-asg/tree/main/modules/server-group), which is what
    powers the [zookeeper-cluster module](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/zookeeper-cluster). Every server in a single ZooKeeper cluster
    should have this same tag.

2.  Use the AWS CLI to look up all ENIs with that same `ServerGroupName`. The `server-group` module tags each ENI it
    creates for a single server group with the same value. The private IP addresses of these ENIs are used as the
    IPs of the ZooKeeper servers.

3.  Each ENI and server pair also has a unique `ServerGroupIndex` tag added by the `server-group` module. This index
    is used as the unique ID for each server.

You can override this behavior by specifying custom `--zookeeper-servers-spec` and `--hostname` arguments.

### JVM memory settings

By default, we configure ZooKeeper to run with `1000m` of memory. You can override this with the `  --zookeeper-memory `
argument to `run-exhibitor`. If you wish to override all JVM settings for ZooKeeper, you can use the
`--zookeeper-java-env` argument.

### Transaction logs

By default, the `run-exhibitor` script will configure ZooKeeper to store transaction logs in
`/opt/zookeeper/transaction-logs`. We strongly recommend mounting a separate EBS Volume at this path, as every write
to ZooKeeper gets immediately persisted to disk for durability, and you get much better performance if there is no
contention for the hard drive from other processes.

You can override the transaction logs path via the `--zookeeper-transaction-log-dir` argument.

### Application logs

By default, all Exhibitor application logs are stored in `/opt/zookeeper/logs`. You can override this with the
`--exhibitor-logs-dir` argument. The ZooKeeper logs are also stored in `/opt/zookeeper/logs/`, as configured in
[zookeeper-log4j.properties](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/install-exhibitor/zookeeper-log4j.properties). You can override ZooKeeper's
logging behavior by specifying the path to a custom `log4j.properties` file using the `--zookeeper-log4j-properties`
argument.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/run-exhibitor/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/run-exhibitor/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/run-exhibitor/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "6b0d115b9da2cc9f9794d2f43149528a"
}
##DOCS-SOURCER-END -->
