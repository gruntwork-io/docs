---
title: "Confluent Tools Security Group Rules"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Kafka" version="0.11.0" lastModifiedVersion="0.6.0"/>

# Confluent Tools Security Group Rules

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/confluent-tools-security-group-rules" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.6.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module creates the Security Group rules that allow traffic in and out of a server running one or more of the Confluent
tools (Schema Registry, REST Proxy, or Kafka Connect).

This module is used by the [confluent-tools-cluster module](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/confluent-tools-cluster), so you typically won't
have to use it directly. However, we keep this module separate in case you decide to run one or more of the Confluent
tools on top of a different type of cluster (e.g., co-located with [ZooKeeper](https://github.com/gruntwork-io/terraform-aws-zookeeper)
or [Kafka](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/kafka-cluster), in which case you can include this module to handle the Security Group details for you.

## Sample Usage

<ModuleUsage>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CONFLUENT-TOOLS-SECURITY-GROUP-RULES MODULE
# ------------------------------------------------------------------------------------------------------

module "confluent_tools_security_group_rules" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-kafka.git//modules/confluent-tools-security-group-rules?ref=v0.11.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of CIDR-formatted IP address ranges that will be allowed to connect to
  # var.ports
  allowed_inbound_cidr_blocks = <INPUT REQUIRED>

  # A list of security group IDs that will be allowed to connect to var.ports
  allowed_inbound_security_group_ids = <INPUT REQUIRED>

  # The ID of the Security Group associated with the ELB that fronts the Confluent
  # Tools cluster.
  confluent_tools_elb_security_group_id = <INPUT REQUIRED>

  # The number of security group IDs in var.allowed_inbound_security_group_ids. We
  # should be able to compute this automatically, but due to a Terraform limitation,
  # we can't:
  # https://github.com/hashicorp/terraform/issues/14677#issuecomment-302772685
  num_allowed_inbound_security_group_ids = <INPUT REQUIRED>

  # The ID of the security group to which we should add the security group rules
  security_group_id = <INPUT REQUIRED>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The port number on which health-checker
  # (https://github.com/gruntwork-io/health-checker) is accepting inbound HTTP
  # connections. Specify null to disable this Security Group Rule.
  health_checker_listener_port = 5500

  # The port numbers that will be open on the server cluster from the given
  # var.allowed_inbound_cidr_blocks or var.allowed_inbound_security_group_ids.
  # Expects a list of maps, where each map has the keys 'port' and 'description',
  # which correspond to the port to be opened and the description to be added to the
  # Security Group Rule, respectively.
  ports = [{"description":"Confluent Schema Registry","port":8081},{"description":"Confluent REST Proxy","port":8082},{"description":"Kafka Connect worker","port":8083}]

}

```

</ModuleUsage>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/confluent-tools-security-group-rules/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/confluent-tools-security-group-rules/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/confluent-tools-security-group-rules/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "f7a7f03647028f29df5d8acbc7c42fcb"
}
##DOCS-SOURCER-END -->
