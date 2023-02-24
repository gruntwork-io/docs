---
title: "Install Confluent Tools"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules%2Finstall-confluent-tools" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Install Confluent Tools

This folder contains a script for installing tools provided by [Confluent](https://www.confluent.io/). You can use the
script to install any [Confluent Package](https://docs.confluent.io/current/installation/available_packages.html#available-packages), but it was originally
motivated by the need to install [REST Proxy](https://docs.confluent.io/current/kafka-rest/docs/index.html) and [Schema
Registry](https://docs.confluent.io/current/schema-registry/docs/operations.html), in particular. The script can be used
to install both open source and enterprise Confluent tools.

This script has been tested on the following operating systems:

*   Amazon Linux
*   Ubuntu

There is a good chance it will work on Debian, CentOS, and RHEL as well, but our automated testing for this
module does not cover these other distros at the moment.

## Quick start

The easiest way to use this module is with the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install \
  --module-name "install-confluent-tools" \
  --repo "https://github.com/gruntwork-io/terraform-aws-kafka" \
  --tag "vX.Y.Z" \
  --module-param "tool=confluent-schema-registry"
```

Note that you can specify `--module-param "tool=xxx:` multiple times, once for each [Confluent Package](https://docs.confluent.io/current/installation/available_packages.html#available-packages) you'd like to install. The
help text of `install-confluent-tools` lists the most common packages users will install.

We recommend running this module as part of a [Packer](https://www.packer.io/) template to create an \[Amazon Machine
Image (AMI)(https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html). You can then deploy the AMI using any of the
`run-xxx` modules we've written to support Confluent:

*   [run-kafka-connect](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-kafka-connect)
*   [run-kafka-rest](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-kafka-rest)
*   [run-schema-registry](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/run-schema-registry)

## Command line Arguments

The `install-confluent-tools` module accepts the following arguments:

**Required Arguments:**

*   `--tool`: The name of the Confluent apt or yum package you wish to install. May be specified multiple times.

**Optional Arguments:**

*   `--confluent-version`: The version of the Confluent platform from which to install the tools.
*   `--confluent-public-key-path`: The path to the Confluent Public Key used to sign all apt and yum packages.

If you're using `gruntwork-install` to run this module, you can pass these arguments using `--module-param` arguments.
Example:

```bash
gruntwork-install \
  --module-name "install-confluent-tools" \
  --repo "https://github.com/gruntwork-io/terraform-aws-kafka" \
  --tag "v0.2.0" \
  --module-param "tool=confluent-schema-registry" \
  --module-param "tool=confluent-kafka-rest"
```


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "01e0d7d9f3442469bacf33bd61f79754"
}
##DOCS-SOURCER-END -->
