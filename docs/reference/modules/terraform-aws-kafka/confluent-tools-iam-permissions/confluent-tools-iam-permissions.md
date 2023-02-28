---
title: "Confluent Tools IAM Permissions"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/confluent-tools-iam-permissions" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Confluent Tools IAM Permissions

This module attaches the IAM permissions required by any of the Confluent tools (Schema Registry, REST Proxy, Kafka
Connect) to an IAM role. These are primarily permissions used to discover the existing cluster and other clusters, such
as the Kafka brokers cluster.

This module is used by the [confluent-tools-cluster module](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/confluent-tools-cluster), so you typically won't
have to use it directly. However, we keep this module separate in case you decide to run any or all of the Confluent tools
on top of a different type of cluster (e.g., co-located with [ZooKeeper](https://github.com/gruntwork-io/terraform-aws-zookeeper)),
in which case you can include this module to handle the IAM permission details for you.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/modules/confluent-tools-iam-permissions/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/modules/confluent-tools-iam-permissions/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/modules/confluent-tools-iam-permissions/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "a1357458d04f7f84c387b25f9632f0f0"
}
##DOCS-SOURCER-END -->
