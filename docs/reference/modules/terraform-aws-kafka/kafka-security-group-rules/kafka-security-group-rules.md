---
title: "Kafka Security Group Rules"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Kafka" version="0.11.0" />

# Kafka Security Group Rules

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/kafka-security-group-rules" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

This module creates the Security Group rules that allow traffic in and out of a server running a Kafka broker.

This module is used by the [kafka-cluster module](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/kafka-cluster), so you typically won't have to use
it directly. However, we keep this module separate in case you decide to run Kafka on top of a different type of
cluster (e.g., co-located with [ZooKeeper](https://github.com/gruntwork-io/terraform-aws-zookeeper)), in which case you can
include this module to handle the Security Group details for you.

## Sample Usage

<ModuleUsage>

```hcl title="main.tf"

# ---------------------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S KAFKA-SECURITY-GROUP-RULES MODULE
# ---------------------------------------------------------------------------------------------------------------------

module "kafka_security_group_rules" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-kafka.git//modules/kafka-security-group-rules?ref=v0.11.0"

  # ---------------------------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ---------------------------------------------------------------------------------------------------------------------

  # A list of CIDR-formatted IP address ranges that will be allowed to connect to
  # var.client_port
  allowed_inbound_cidr_blocks = <INPUT REQUIRED>

  # A list of security group IDs that will be allowed to connect to var.client_port
  allowed_inbound_security_group_ids = <INPUT REQUIRED>

  # The number of security group IDs in var.allowed_inbound_security_group_ids. We
  # should be able to compute this automatically, but due to a Terraform limitation,
  # we can't:
  # https://github.com/hashicorp/terraform/issues/14677#issuecomment-302772685
  num_allowed_inbound_security_group_ids = <INPUT REQUIRED>

  # The ID of the security group to which we should add the Kafka security group
  # rules
  security_group_id = <INPUT REQUIRED>

  # ---------------------------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ---------------------------------------------------------------------------------------------------------------------

  # The port clients use to connect to Kafka brokers
  broker_port = 9092

  # The port Kafka brokers use to connect to each other.
  broker_port_internal = 9093

}

```

</ModuleUsage>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/kafka-security-group-rules/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/kafka-security-group-rules/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/kafka-security-group-rules/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "3a4394a0ac88ee33ce627454e3aa21c5"
}
##DOCS-SOURCER-END -->
