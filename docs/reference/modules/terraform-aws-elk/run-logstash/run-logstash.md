---
title: "Run Logstash Script"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules%2Frun-logstash" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-elk/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Run Logstash Script

This folder contains a script for configuring and running [Logstash](https://www.elastic.co/products/logstash) on an [AWS](https://aws.amazon.com/) EC2 instance. This script has been tested on the following operating systems:

*   Ubuntu 18.04
*   Ubuntu 20.04
*   CentOS 7
*   Amazon Linux 2

## Quick start

This module depends on [bash-commons](https://github.com/gruntwork-io/bash-commons), so you must install that project
first as documented in its README.

The easiest way to use this module is with the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install \
  --module-name "run-logstash" \
  --repo "https://github.com/gruntwork-io/terraform-aws-elk" \
  --tag "<VERSION>"
```

Checkout the [releases](https://github.com/gruntwork-io/terraform-aws-elk/releases) to find the latest version.

We recommend using the `run-logstash` command as part of [User Data](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html#user-data-shell-scripts), so that it executes when the EC2 Instance is first booting.

See the [ELK multi-cluster](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/examples/elk-multi-cluster/README.md) for fully working sample code.

## Command line Arguments

Run `run-logstash --help` to see all available arguments.

```
Usage: run-logstash [options]

This script can be used to configure and run Logstash. This script has been tested with Ubuntu 20.04 + 18.04, CentOS 7 and Amazon Linux 2.

Options:

  --config-file                         The path to a YAML config file for Logstash. Default: /etc/logstash/logstash.yml.
  --auto-fill KEY=VALUE                 Search the Logstash config file for KEY and replace it with VALUE. May be repeated.
  --auto-fill-jvm KEY=VALUE   Search the Logstash JVM config file for KEY and replace it with VALUE. May be repeated.
  --auto-fill-pipeline KEY=VALUE        Search the Logstash pipeline config file for KEY and replace it with VALUE. May be repeated."
  --help                                Show this help text and exit.

Example:

  run-logstash --auto-fill '<__PATH__>=/var/lib/logstash' --auto-fill-pipeline '<__PORT__>=5044' --auto-fill-jvm '<__XMS__>=4g'
```


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "a56e993305ddba636cc18f43d120a0dd"
}
##DOCS-SOURCER-END -->
