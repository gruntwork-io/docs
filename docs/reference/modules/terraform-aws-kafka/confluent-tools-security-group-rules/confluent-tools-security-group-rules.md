---
title: "Confluent Tools Security Group Rules"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules%2Fconfluent-tools-security-group-rules" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Confluent Tools Security Group Rules

This module creates the Security Group rules that allow traffic in and out of a server running one or more of the Confluent
tools (Schema Registry, REST Proxy, or Kafka Connect).

This module is used by the [confluent-tools-cluster module](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/confluent-tools-cluster), so you typically won't
have to use it directly. However, we keep this module separate in case you decide to run one or more of the Confluent
tools on top of a different type of cluster (e.g., co-located with [ZooKeeper](https://github.com/gruntwork-io/terraform-aws-zookeeper)
or [Kafka](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/kafka-cluster), in which case you can include this module to handle the Security Group details for you.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/modules%2Fconfluent-tools-security-group-rules%2Freadme.md",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/modules%2Fconfluent-tools-security-group-rules%2Fvariables.tf",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/modules%2Fconfluent-tools-security-group-rules%2Foutputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "b0c82b9494f25b4e913d46b7ddc0b586"
}
##DOCS-SOURCER-END -->
