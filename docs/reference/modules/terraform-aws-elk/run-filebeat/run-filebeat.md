---
title: "Filebeat Run Script"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/run-filebeat" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-elk/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Filebeat Run Script

This folder contains a script for configuring and running [Filebeat](https://www.elastic.co/products/beats/filebeat) on an [AWS](https://aws.amazon.com/) EC2 instance. This script has been tested on the following operating systems:

*   Ubuntu 18.04
*   Ubuntu 20.04
*   CentOS 7
*   Amazon Linux 2

## Quick start

This script assumes that you already have Filebeat installed. If you don't, we recommend using the [install-filebeat module](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/install-filebeat). As part of the installation process, we recommend that you create a [Filebeat YAML config file](https://www.elastic.co/guide/en/beats/filebeat/current/configuring-howto-filebeat.html) and install it using the `--config-file` option of the `install-filebeat` script.

You may want some of the configs, such as the IPs of the Logstash/Elasticsearch servers, to be filled in dynamically, when the server is booting up. You can do this using the `run-filebeat` script! Simply leave placeholders in your Filebeat config file like this (see the [filebeat-ami folder](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/examples/elk-amis/filebeat/config) for a full example):

```yaml
filebeat.prospectors:
- type: log
  enabled: true
  paths:
    - <__PATH__> # /var/log/source.log

#----------------------------- File output --------------------------------
# This is purely for testing purposes, real world usage will most likely send logs to Logstash or Elasticsearch
output.file:
  path: "/var/log"
  filename: destination.log

```

Now you can fill in those placeholders and start Filebeat by executing the `run-filebeat` script as follows:

```bash
run-filebeat --auto-fill "<__PATH__>=/path/to/source.log"
```

This will:

1.  Replace all instances of the text `<__PATH__>` in the Filebeat config file with the path to the log file that Filebeat will read from
2.  Start Filebeat on the local node.

We recommend using the `run-filebeat` command as part of [User Data](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html#user-data-shell-scripts), so that it executes when the EC2 Instance is first booting.

See the [examples folder](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/examples/elk-single-cluster) for fully working sample code.

## Command line Arguments

Run `run-filebeat --help` to see all available arguments.

```
Usage: run-filebeat [options]

This script can be used to configure and run Filebeat. This script has been tested with Ubuntu 20.04 + 18.04, CentOS 7 and Amazon Linux 2.

Options:

  --config-file				      The path to a YAML config file for Filebeat. Default: /etc/filebeat/filebeat.yml.
  --skip-auto-discovery			Specifies whether this script should skip checking for Logstash nodes. Default: false.
  --auto-fill KEY=VALUE			Search the Filebeat config file for KEY and replace it with VALUE. May be repeated.
  --help				            Show this help text and exit.

Required arguments only if auto discovery is enabled

  --tag					The tag key and value on the instances.
  --port				The port on which the Logstash nodes listen for beats connections. Default: 5044
  --aws-region				The AWS region where the ASG is deployed. Default: us-east-1
  --use-public-ips			Sets whether to get the public or private IPs from the ASG. Default: true
  --schedule				A cron expression specifying the schedule this script will run with. Default: */5 * * * *


Example:

  run-filebeat --auto-fill '<__PATH__>=/var/log/*.log'
```

## Auto Discovery

The `run-filebeat` script automatically discovers Logstash nodes by using the [auto-discovery](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/auto-discovery) module. You can disable this feature by setting the `--skip-auto-discovery` to `true` which is useful if you have your own in-house auto discovery mechanism.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/modules/run-filebeat/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/modules/run-filebeat/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/modules/run-filebeat/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "bf9dd2c80ccc37d4b9b85afde44bccb2"
}
##DOCS-SOURCER-END -->
