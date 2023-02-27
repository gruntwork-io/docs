---
title: "Kafka Security Group Rules"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules%2Fkafka-security-group-rules" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Kafka Security Group Rules

This module creates the Security Group rules that allow traffic in and out of a server running a Kafka broker.

This module is used by the [kafka-cluster module](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/kafka-cluster), so you typically won't have to use
it directly. However, we keep this module separate in case you decide to run Kafka on top of a different type of
cluster (e.g., co-located with [ZooKeeper](https://github.com/gruntwork-io/terraform-aws-zookeeper)), in which case you can
include this module to handle the Security Group details for you.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/modules%2Fkafka-security-group-rules%2Freadme.md",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/modules%2Fkafka-security-group-rules%2Fvariables.tf",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/modules%2Fkafka-security-group-rules%2Foutputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "a33bafad99009a19d8b26a2febbd31ca"
}
##DOCS-SOURCER-END -->
