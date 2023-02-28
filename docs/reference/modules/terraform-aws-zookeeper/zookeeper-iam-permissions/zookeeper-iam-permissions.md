---
title: "ZooKeeper IAM Permissions"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/zookeeper-iam-permissions" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# ZooKeeper IAM Permissions

This module attaches the IAM permissions required by ZooKeeper and Exhibitor to an IAM role. These are primarily
permissions used by the ZooKeeper nodes to discover each other and bootstrap the cluster.

This module is used by the [zookeeper-cluster module](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/zookeeper-cluster), so you typically won't have to use
it directly. However, we keep this module separate in case you decide to run ZooKeeper on top of a different type of
cluster (e.g., co-located with [Kafka](https://github.com/gruntwork-io/terraform-aws-kafka)), in which case you can include
this module to handle the IAM permission details for you.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/modules/zookeeper-iam-permissions/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/modules/zookeeper-iam-permissions/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/modules/zookeeper-iam-permissions/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "8c9a7326639c3f1561d5b2ad7d7e78b3"
}
##DOCS-SOURCER-END -->
