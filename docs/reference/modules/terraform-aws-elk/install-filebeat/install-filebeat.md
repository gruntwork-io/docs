---
title: "Filebeat Install Script"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="ELK AWS Module" version="0.11.1" />

# Filebeat Install Script

<a href="https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/install-filebeat" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-elk/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

Filebeat monitors log directories or specific log files, tails the files, and forwards them either to Elasticsearch or to Logstash for indexing. This folder contains a script for installing [Filebeat](https://www.elastic.co/products/beats/filebeat).

This script has been tested on the following operating systems:

*   Ubuntu 18.04
*   Ubuntu 20.04
*   CentOS 7
*   Amazon Linux 2

## Quick start

The easiest way to use this module is with the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install \
  --module-name "install-filebeat" \
  --repo "https://github.com/gruntwork-io/terraform-aws-elk" \
  --tag "v0.0.1"
```

We recommend running this module as part of a [Packer](https://www.packer.io/) template to create an [Amazon Machine Image (AMI)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html).


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/install-filebeat/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/install-filebeat/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/install-filebeat/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "625ec7e747781317a88c214128919ff3"
}
##DOCS-SOURCER-END -->
