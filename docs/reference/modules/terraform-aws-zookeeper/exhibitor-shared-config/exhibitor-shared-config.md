---
title: "Exhibitor Shared Config"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="ZooKeeper" version="0.12.0" />

# Exhibitor Shared Config

<a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/exhibitor-shared-config" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

This module creates an S3 bucket and IAM permissions that can be used by
[Exhibitor](https://github.com/soabase/exhibitor/) to store [shared ZooKeeper
configuration](https://github.com/soabase/exhibitor/wiki/Shared-Configuration). By storing the config in S3, the
Exhibitor process on each ZooKeeper server can detect and roll out config changes.

This module is used by the [zookeeper-cluster module](https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/zookeeper-cluster), so you typically won't have to use
it directly. However, we keep this module separate in case you decide to ZooKeeper on top of a different type of
cluster (e.g., co-located with [Kafka](https://github.com/gruntwork-io/terraform-aws-kafka)), in which case you can include
this module to handle the S3 bucket details for you.

## Sample Usage

<ModuleUsage>

```hcl title="main.tf"

# ---------------------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EXHIBITOR-SHARED-CONFIG MODULE
# ---------------------------------------------------------------------------------------------------------------------

module "exhibitor-shared-config" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-zookeeper.git//modules/exhibitor-shared-config?ref=v0.12.0"

  # ---------------------------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ---------------------------------------------------------------------------------------------------------------------

  # The name to use for the S3 bucket that will store shared ZooKeeper config
  s3_bucket_name = <INPUT REQUIRED>

  # The ID of the IAM Role used by the nodes in the ZooKeeper cluster
  zookeeper_aws_iam_role_id = <INPUT REQUIRED>

  # ---------------------------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ---------------------------------------------------------------------------------------------------------------------

  # If you set this to true, when you run terraform destroy, this tells Terraform to
  # delete all the objects in the S3 bucket used for shared config storage. You
  # should NOT set this to true in production! This property is only here so
  # automated tests can clean up after themselves.
  force_destroy_shared_config_s3_bucket = false

  # The Amazon Resource Name (ARN) of the KMS Key that will be used to
  # encrypt/decrypt config files in the S3 bucket. The default value of null will
  # use the managed aws/s3 key.
  s3_bucket_kms_key_arn = null

}

```

</ModuleUsage>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="s3_bucket_name" requirement="required" type="string">
<HclListItemDescription>

The name to use for the S3 bucket that will store shared ZooKeeper config

</HclListItemDescription>
</HclListItem>

<HclListItem name="zookeeper_aws_iam_role_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the IAM Role used by the nodes in the ZooKeeper cluster

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="force_destroy_shared_config_s3_bucket" requirement="optional" type="bool">
<HclListItemDescription>

If you set this to true, when you run terraform destroy, this tells Terraform to delete all the objects in the S3 bucket used for shared config storage. You should NOT set this to true in production! This property is only here so automated tests can clean up after themselves.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="s3_bucket_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

The Amazon Resource Name (ARN) of the KMS Key that will be used to encrypt/decrypt config files in the S3 bucket. The default value of null will use the managed aws/s3 key.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="s3_bucket_arn">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/exhibitor-shared-config/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/exhibitor-shared-config/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-zookeeper/tree/main/modules/exhibitor-shared-config/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "3c80f26ee5db4cbf92899a0594932ecb"
}
##DOCS-SOURCER-END -->
