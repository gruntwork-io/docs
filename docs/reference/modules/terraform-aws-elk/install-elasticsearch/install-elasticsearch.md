---
title: "Elasticsearch Install Script"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules%2Finstall-elasticsearch" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-elk/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Elasticsearch Install Script

This script can be used to install Elasticsearch as well as Elasticsearch plugins.

This script has been tested on the following operating systems:

*   Ubuntu 18.04
*   Ubuntu 20.04
*   Amazon Linux 2
*   CentOS 7

There is a good chance it will work on other flavors of Debian, CentOS, and RHEL as well.

## Quick start

This module depends on [bash-commons](https://github.com/gruntwork-io/bash-commons), so you must install that project
first as documented in its README.

The easiest way to use this module is with the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install \
  --module-name "install-elasticsearch" \
  --repo "https://github.com/gruntwork-io/terraform-aws-elk" \
  --tag "<VERSION>"
```

Checkout the [releases](https://github.com/gruntwork-io/terraform-aws-elk/releases) to find the latest version.

We recommend running the `install-elasticsearch` script as part of a [Packer](https://www.packer.io/) template to
create an Elasticsearch [Amazon Machine Image (AMI)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html) (see
the [elasticsearch-ami example](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/examples/elk-amis/elasticsearch) for fully-working sample code). You can then deploy the AMI across an Auto Scaling Group using the [elasticsearch-cluster module](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/elasticsearch-cluster) (see the
[examples folder](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/examples) for fully-working sample code).

## Command line Arguments

Run `install-elasticsearch --help` to see all available arguments.

| Param                 | Description                                                                                                                              | Default                       |   |   |
|-----------------------|------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------|---|---|
| `--version`           | The version of Elasticsearch to install                                                                                                  | 6.8.21                        |   |   |
| `--config-file`       | Optional path to a templated Elasticsearcg config file (elasticsearch.yml).                                                              | /tmp/config/elasticsearch.yml |   |   |
| `--jvm-config-file`   | Optional path to a templated JVM config file (jvm.options)                                                                               | /tmp/config/jvm.options       |   |   |
| `--plugin`            | Optional name of Elasticsearch plugin to install. Can also specify absolute path like: "file:///tmp/plugin-X.Y.Z.zip". May be repeated |                               |   |   |
| `--plugin-config-dir` | Optional path to folder containing any extra plugin config files.  All files from this folder will be moved to: /etc/elasticsearch       |                               |   |   |

## How it works

The `install-elasticsearch` script:

*   Installs Elasticsearch using the package manager for your OS (eg: apt or yum)

*   Optionally installs any plugins specified with the `--plugin` parameter.

*   **TODO:** ()The script doesn't actually do this yet!) Optimizes the system configuration for maximum Elasticsearch performance per [official recommendations](https://www.elastic.co/guide/en/elasticsearch/reference/6.8/system-config.html).


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/modules%2Finstall-elasticsearch%2Freadme.md",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/modules%2Finstall-elasticsearch%2Fvariables.tf",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/modules%2Finstall-elasticsearch%2Foutputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "aff7b0f6e07f25e66021b846187d777a"
}
##DOCS-SOURCER-END -->
