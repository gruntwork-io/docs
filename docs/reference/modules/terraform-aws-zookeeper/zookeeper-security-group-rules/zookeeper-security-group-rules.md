---
title: "ZooKeeper Security Group Rules"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="ZooKeeper" version="0.12.0" />

# ZooKeeper Security Group Rules

<a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/zookeeper-security-group-rules" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

This module creates the Security Group rules that allow traffic in and out of a server running ZooKeeper and Exhibitor.

This module is used by the [zookeeper-cluster module](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/zookeeper-cluster), so you typically won't have to use
it directly. However, we keep this module separate in case you decide to run ZooKeeper on top of a different type of
cluster (e.g., co-located with [Kafka](https://github.com/gruntwork-io/terraform-aws-kafka)), in which case you can include
this module to handle the Security Group details for you.

## Sample Usage

<ModuleUsage>

```hcl title="main.tf"

# ---------------------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ZOOKEEPER-SECURITY-GROUP-RULES MODULE
# ---------------------------------------------------------------------------------------------------------------------

module "zookeeper-security-group-rules" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-zookeeper.git//modules/zookeeper-security-group-rules?ref=v0.12.0"

  # ---------------------------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ---------------------------------------------------------------------------------------------------------------------

  # A list of CIDR-formatted IP address ranges that will be allowed to connect to
  # var.client_port
  allowed_client_port_inbound_cidr_blocks = <INPUT REQUIRED>

  # A list of security group IDs that will be allowed to connect to var.client_port
  allowed_client_port_inbound_security_group_ids = <INPUT REQUIRED>

  # A list of CIDR-formatted IP address ranges that will be allowed to connect to
  # var.exhibitor_port
  allowed_exhibitor_port_inbound_cidr_blocks = <INPUT REQUIRED>

  # A list of security group IDs that will be allowed to connect to
  # var.exhibitor_port
  allowed_exhibitor_port_inbound_security_group_ids = <INPUT REQUIRED>

  # A list of CIDR-formatted IP address ranges that will be allowed to connect to
  # var.health_check_port
  allowed_health_check_port_inbound_cidr_blocks = <INPUT REQUIRED>

  # A list of security group IDs that will be allowed to connect to
  # var.health_check_port
  allowed_health_check_port_inbound_security_group_ids = <INPUT REQUIRED>

  # The number of security group IDs in
  # var.allowed_client_port_inbound_security_group_ids. We should be able to compute
  # this automatically, but due to a Terraform limitation, we can't:
  # https://github.com/hashicorp/terraform/issues/14677#issuecomment-302772685
  num_allowed_client_port_inbound_security_group_ids = <INPUT REQUIRED>

  # The number of security group IDs in
  # var.allowed_exhibitor_port_inbound_security_group_ids. We should be able to
  # compute this automatically, but due to a Terraform limitation, we can't:
  # https://github.com/hashicorp/terraform/issues/14677#issuecomment-302772685
  num_allowed_exhibitor_port_inbound_security_group_ids = <INPUT REQUIRED>

  # The number of security group IDs in
  # var.allowed_health_check_port_inbound_security_group_ids. We should be able to
  # compute this automatically, but due to a Terraform limitation, we can't:
  # https://github.com/hashicorp/terraform/issues/14677#issuecomment-302772685
  num_allowed_health_check_port_inbound_security_group_ids = <INPUT REQUIRED>

  # The ID of the security group to which we should add the ZooKeeper security group
  # rules
  security_group_id = <INPUT REQUIRED>

  # ---------------------------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ---------------------------------------------------------------------------------------------------------------------

  # The port clients use to connect to ZooKeeper
  client_port = 2181

  # The port ZooKeeper nodes use to connect to other ZooKeeper nodes
  connect_port = 2888

  # The port ZooKeeper nodes use to connect to other ZooKeeper nodes during leader
  # elections
  elections_port = 3888

  # The port Exhibitor uses for its Control Panel UI
  exhibitor_port = 8080

  # The port ELB uses to check node health
  health_check_port = 5000

}

```

</ModuleUsage>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/zookeeper-security-group-rules/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/zookeeper-security-group-rules/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/zookeeper-security-group-rules/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "32cf11a24bd755318e64fe02e63b0bde"
}
##DOCS-SOURCER-END -->
