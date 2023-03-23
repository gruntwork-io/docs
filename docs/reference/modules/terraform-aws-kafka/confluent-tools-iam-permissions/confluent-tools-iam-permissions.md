---
title: "Confluent Tools IAM Permissions"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Kafka" version="0.11.0" lastModifiedVersion="0.6.0"/>

# Confluent Tools IAM Permissions

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/confluent-tools-iam-permissions" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.6.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module attaches the IAM permissions required by any of the Confluent tools (Schema Registry, REST Proxy, Kafka
Connect) to an IAM role. These are primarily permissions used to discover the existing cluster and other clusters, such
as the Kafka brokers cluster.

This module is used by the [confluent-tools-cluster module](https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/confluent-tools-cluster), so you typically won't
have to use it directly. However, we keep this module separate in case you decide to run any or all of the Confluent tools
on top of a different type of cluster (e.g., co-located with [ZooKeeper](https://github.com/gruntwork-io/terraform-aws-zookeeper)),
in which case you can include this module to handle the IAM permission details for you.

## Sample Usage

<ModuleUsage>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CONFLUENT-TOOLS-IAM-PERMISSIONS MODULE
# ------------------------------------------------------------------------------------------------------

module "confluent_tools_iam_permissions" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-kafka.git//modules/confluent-tools-iam-permissions?ref=v0.11.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the IAM Role used by the nodes in the Confluent tools cluster.
  aws_iam_role_id = <INPUT REQUIRED>

}

```

</ModuleUsage>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/confluent-tools-iam-permissions/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/confluent-tools-iam-permissions/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules/confluent-tools-iam-permissions/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "2a80d12f250ccce718b1aa75d28c8d14"
}
##DOCS-SOURCER-END -->
