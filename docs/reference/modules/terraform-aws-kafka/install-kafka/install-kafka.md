---
title: "Install Kafka"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Kafka" version="0.11.0" lastModifiedVersion="0.5.3"/>

# Install Kafka

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/install-kafka" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.5.3" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This folder contains a script for installing [Apache Kafka](https://kafka.apache.org/).

This script has been tested on the following operating systems:

*   Amazon Linux
*   Ubuntu

There is a good chance it will work on Debian, CentOS, and RHEL as well, but our automated testing for this
module does not cover these other distros at the moment.

## Quick start

The easiest way to use this module is with the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install \
  --module-name "install-kafka" \
  --repo "https://github.com/gruntwork-io/terraform-aws-kafka" \
  --tag "v0.0.4"
```

We recommend running this module as part of a [Packer](https://www.packer.io/) template to create an [Amazon Machine
Image (AMI)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html) (see [kafka-ami](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/kafka-ami)
and [kafka-zookeeper-ami](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/kafka-zookeeper-confluent-oss-ami) for fully-working sample code). You can then deploy the AMI
using the [kafka-cluster module](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/kafka-cluster) (see the
[kafka-zookeeper-standalone-clusters](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/kafka-zookeeper-standalone-clusters) and
[kafka-zookeeper-confluent-oss-colocated-cluster](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/examples/kafka-zookeeper-confluent-oss-colocated-cluster) examples for fully-working sample
code).

## Command line Arguments

The `install-kafka` module accepts the following arguments, all optional:

*   `--kafka-version`: The version of Kafka to install.
*   `--scala-version`: The version of Scala that `--kafka-version` is compiled with.
*   `--install-dir`: The directory where Kafka should be installed. Default: `/opt/kafka`.
*   `--user`: The OS user who should own `--install-dir`. Default: `kafka`.
*   `--key-store-path`: The path to a Key Store to use for SSL. Default: (none). See the
    [generate-key-stores](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/generate-key-stores) for how to generate a Key Store.
*   `--trust-store-path`: The path to a Trust Store to use for SSL. Default: (none).  See the
    [generate-key-stores](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/generate-key-stores) for how to generate a Key Store.

If you're using `gruntwork-install` to run this module, you can pass these arguments using `--module-param` arguments.
Example:

```bash
gruntwork-install \
  --module-name "install-kafka" \
  --repo "https://github.com/gruntwork-io/terraform-aws-kafka" \
  --tag "v0.0.4" \
  --module-param "version=0.11.0.0"
```


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/install-kafka/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/install-kafka/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/install-kafka/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "4cd01354a8f63d9dc4f01c0dd3451772"
}
##DOCS-SOURCER-END -->
