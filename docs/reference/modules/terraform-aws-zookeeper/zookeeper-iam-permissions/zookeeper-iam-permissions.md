---
title: "ZooKeeper IAM Permissions"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="ZooKeeper" version="0.12.0" lastModifiedVersion="0.12.0"/>

# ZooKeeper IAM Permissions

<a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/zookeeper-iam-permissions" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.12.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module attaches the IAM permissions required by ZooKeeper and Exhibitor to an IAM role. These are primarily
permissions used by the ZooKeeper nodes to discover each other and bootstrap the cluster.

This module is used by the [zookeeper-cluster module](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/zookeeper-cluster), so you typically won't have to use
it directly. However, we keep this module separate in case you decide to run ZooKeeper on top of a different type of
cluster (e.g., co-located with [Kafka](https://github.com/gruntwork-io/terraform-aws-kafka)), in which case you can include
this module to handle the IAM permission details for you.

## Sample Usage

<ModuleUsage>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ZOOKEEPER-IAM-PERMISSIONS MODULE
# ------------------------------------------------------------------------------------------------------

module "zookeeper_iam_permissions" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-zookeeper.git//modules/zookeeper-iam-permissions?ref=v0.12.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the IAM Role used by the nodes in the ZooKeeper cluster
  zookeeper_aws_iam_role_id = <INPUT REQUIRED>

}

```

</ModuleUsage>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/zookeeper-iam-permissions/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/zookeeper-iam-permissions/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/zookeeper-iam-permissions/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "c52fef14c22bf73b8695db6ae0593ef1"
}
##DOCS-SOURCER-END -->
