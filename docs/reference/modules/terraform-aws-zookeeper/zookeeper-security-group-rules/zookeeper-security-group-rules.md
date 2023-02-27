---
title: "ZooKeeper Security Group Rules"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/zookeeper-security-group-rules" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# ZooKeeper Security Group Rules

This module creates the Security Group rules that allow traffic in and out of a server running ZooKeeper and Exhibitor.

This module is used by the [zookeeper-cluster module](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/zookeeper-cluster), so you typically won't have to use
it directly. However, we keep this module separate in case you decide to run ZooKeeper on top of a different type of
cluster (e.g., co-located with [Kafka](https://github.com/gruntwork-io/terraform-aws-kafka)), in which case you can include
this module to handle the Security Group details for you.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/modules/zookeeper-security-group-rules/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/modules/zookeeper-security-group-rules/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/modules/zookeeper-security-group-rules/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "cf0ba33922b7f53f2807dc1ba2a37de2"
}
##DOCS-SOURCER-END -->
