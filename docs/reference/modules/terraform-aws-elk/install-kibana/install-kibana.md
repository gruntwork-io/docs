---
title: "Kibana Install Script"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="ELK AWS Module" version="0.11.1" />

# Kibana Install Script

<a href="https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/install-kibana" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-elk/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

This folder contains a script for installing [Kibana](https://www.elastic.co/products/kibana).

This script has been tested on the following operating systems:

*   Amazon Linux 2
*   Ubuntu

## Quick start

The easiest way to use this module is with the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install \
  --module-name "install-kibana" \
  --repo "https://github.com/gruntwork-io/terraform-aws-elk" \
  --tag "v0.0.1"
```

We recommend running this module as part of a [Packer](https://www.packer.io/) template to create an [Amazon Machine
Image (AMI)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html)
You can then deploy the AMI using the [kibana-cluster module](https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/kibana-cluster) (see the
`TODO` and `TODO` examples for fully-working sample code).


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/install-kibana/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/install-kibana/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-elk/tree/master/modules/install-kibana/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "a93820f6d175cd03831801694dcf56ea"
}
##DOCS-SOURCER-END -->
