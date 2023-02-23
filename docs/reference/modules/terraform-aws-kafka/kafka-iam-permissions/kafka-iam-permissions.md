---
title: "Kafka IAM Permissions"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem} from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules%2Fkafka-iam-permissions" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Kafka IAM Permissions

This module attaches the IAM permissions required by Kafka to an IAM role. These are primarily permissions used by the
Kafka brokers to discover each other and bootstrap the cluster.

This module is used by the [kafka-cluster module](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/kafka-cluster), so you typically won't have to use
it directly. However, we keep this module separate in case you decide to run Kafka on top of a different type of
cluster (e.g., co-located with [ZooKeeper](https://github.com/gruntwork-io/terraform-aws-zookeeper)), in which case you can
include this module to handle the IAM permission details for you.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "7db5779dd8ec38c81745583fa5e4c56e"
}
##DOCS-SOURCER-END -->
