---
title: "Kafka IAM Permissions"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Kafka" version="0.11.0" />

# Kafka IAM Permissions

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/kafka-iam-permissions" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

This module attaches the IAM permissions required by Kafka to an IAM role. These are primarily permissions used by the
Kafka brokers to discover each other and bootstrap the cluster.

This module is used by the [kafka-cluster module](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/kafka-cluster), so you typically won't have to use
it directly. However, we keep this module separate in case you decide to run Kafka on top of a different type of
cluster (e.g., co-located with [ZooKeeper](https://github.com/gruntwork-io/terraform-aws-zookeeper)), in which case you can
include this module to handle the IAM permission details for you.

## Sample Usage

<ModuleUsage>

```hcl title="main.tf"

# ---------------------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S KAFKA-IAM-PERMISSIONS MODULE
# ---------------------------------------------------------------------------------------------------------------------

module "kafka-iam-permissions" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-kafka.git//modules/kafka-iam-permissions?ref=v0.11.0"

  # ---------------------------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ---------------------------------------------------------------------------------------------------------------------

  # The ID of the IAM Role used by the nodes in the Kafka cluster
  kafka_aws_iam_role_id = <INPUT REQUIRED>

}

```

</ModuleUsage>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/kafka-iam-permissions/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/kafka-iam-permissions/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/kafka-iam-permissions/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "8f6579d7ee7c246678a5a7dafc579f42"
}
##DOCS-SOURCER-END -->
