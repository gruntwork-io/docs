---
title: "Logstash Install Script"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="ELK AWS Module" version="0.11.1" lastModifiedVersion="0.11.1"/>

# Logstash Install Script

<a href="https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/install-logstash" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.11.1" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

Logstash is an open source data collection engine with real-time pipelining capabilities. Logstash can dynamically unify data from disparate sources and normalize the data into destinations of your choice. This folder contains a script for installing [Logstash](https://www.elastic.co/products/logstash).

This script has been tested on the following operating systems:

*   Ubuntu 18.04
*   Ubuntu 20.04
*   CentOS 7
*   Amazon Linux 2

## Quick start

The easiest way to use this module is with the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install \
  --module-name "install-logstash" \
  --repo "https://github.com/gruntwork-io/terraform-aws-elk" \
  --tag "v0.0.1" # change to latest release version
```

We recommend running this module as part of a [Packer](https://www.packer.io/) template to create an [Amazon Machine Image (AMI)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html) (see [packer-template](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/examples/elk-amis/logstash/logstash.json) for fully-working sample code).


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/install-logstash/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/install-logstash/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/install-logstash/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "7f394f8a7c140c55dcaad65f5b7deee7"
}
##DOCS-SOURCER-END -->
