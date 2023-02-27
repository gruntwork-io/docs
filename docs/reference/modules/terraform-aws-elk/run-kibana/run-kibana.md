---
title: "Run Kibana Script"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/run-kibana" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-elk/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Run Kibana Script

This folder contains a script for configuring and running [Kibana](https://www.elastic.co/products/kibana)

This script has been tested on the following operating systems:

*   Ubuntu 18.04
*   Ubuntu 20.04
*   Amazon Linux 2
*   CentOS 7

## Quick start

This module depends on [bash-commons](https://github.com/gruntwork-io/bash-commons), so you must install that project
first as documented in its README.

The easiest way to use this module is with the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install \
  --module-name "run-kibana" \
  --repo "https://github.com/gruntwork-io/terraform-aws-elk" \
  --tag "<VERSION>"
```

Checkout the [releases](https://github.com/gruntwork-io/terraform-aws-elk/releases) to find the latest version.

## Command line Arguments

Run `run-kibana --help` to see all available arguments.

```
  Usage: run-kibana [OPTIONS]"
  
  This script can be used to configure and run Kibana."
  
  Optional arguments:"
  
    --auto-fill KEY=VALUE\t\t\tSearch the Kibana config file for KEY and replace it with VALUE. May be repeated."
  
  Example:
  
    install.sh \
      --auto-fill "<__CLUSTER_NAME__>=the-cluster-name"
```

## How it works

The `run-kibana` script:

*   Replace `<__KEY_NAME__>` with `VALUE` that you specify as part of your `--auto-fill` arguments in the Elasticsearch config file located in: `/etc/elasticsearch/elasticsearch.yml`

## Refernce

*   [Kibana config file reference](https://www.elastic.co/guide/en/kibana/current/settings.html)


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/modules/run-kibana/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/modules/run-kibana/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/modules/run-kibana/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "272d885b2d64f41f962e17996e838e88"
}
##DOCS-SOURCER-END -->
