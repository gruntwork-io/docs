---
title: "Redis Copy Snapshot Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Cache Modules" version="1.0.2" lastModifiedVersion="0.22.8"/>

# Redis Copy Snapshot Module

<a href="https://github.com/gruntwork-io/terraform-aws-cache/tree/v1.0.2/modules/redis_copy_snapshot" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.22.8" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module copies an existing Redis snapshot to an external s3 bucket.
You can find more information
from [Exporting a backup](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/backups-exporting.html) page.

## When do I use this

Exporting a backup can be helpful if you need to launch a cluster in another AWS Region. You can export your data in one
AWS Region, copy the .rdb file to the new AWS Region, and then use that .rdb file to seed the new cluster instead of
waiting for the new cluster to populate through use. For information about seeding a new cluster, see [Seeding a new
cluster with an externally created backup](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/backups-seeding-redis.html).
Another reason you might want to export your cluster's data is to use the .rdb file for offline processing.

## How it Works

It deploys a lambda function that uses `boto3::elasticache::copy_snapshot` to export the Redis snapshot to a S3 bucket.
Refer to \[copy_snapshot documentation for more
information: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/elasticache/client/copy_snapshot.html

## How to Create a Snapshot

You can manually create a backup following the
instruction: [Making manual backups](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/backups-manual.html).

## Permission Required

The caller of the module needs to have the appropriate permission on the s3 bucket and the elastic cache cluster. The
detailed permission requirement is explained in detail
here: [Exporting a backup](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/backups-exporting.html) page.
You can also refer to [redis_copy_snapshot](https://github.com/gruntwork-io/terraform-aws-cache/tree/v1.0.2/examples/redis_copy_snapshot) module as an example.

## Encryption Limitation

It seems like you can only export the snapshot encrypted with default AWS managed KMS key (`aws/elasticache`). If you
try to export a snapshot encrypted with CMK (Customer Managed Key), you will get an error like this:

> Error exporting snapshot: An error occurred (InvalidParameterCombination) when calling the CopySnapshot operation: AWS
> Key Management Service Customer Managed CMK cannot be used for encrypting exported snapshots in S3. Please encrypt the
> exported snapshot file in S3 if necessary.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S REDIS_COPY_SNAPSHOT MODULE
# ------------------------------------------------------------------------------------------------------

module "redis_copy_snapshot" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-cache.git//modules/redis_copy_snapshot?ref=v1.0.2"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ARN of an existing snapshot from which to make a copy.
  source_snapshot_arn = <string>

  # The name of an existing snapshot from which to make a copy.
  source_snapshot_name = <string>

  # The ARN of the s3 bucket to export the snapshot to.
  target_s3_bucket_arn = <string>

  # The name of the s3 bucket to export the snapshot to.
  target_s3_bucket_name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A name for the exported snapshot copy. ElastiCache does not permit
  # overwriting a snapshot, therefore this name must be unique within its
  # context - ElastiCache or an Amazon S3 bucket if exporting. Defaults to the
  # same name as the `source_snapshot_name`.
  target_snapshot_name = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S REDIS_COPY_SNAPSHOT MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-cache.git//modules/redis_copy_snapshot?ref=v1.0.2"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ARN of an existing snapshot from which to make a copy.
  source_snapshot_arn = <string>

  # The name of an existing snapshot from which to make a copy.
  source_snapshot_name = <string>

  # The ARN of the s3 bucket to export the snapshot to.
  target_s3_bucket_arn = <string>

  # The name of the s3 bucket to export the snapshot to.
  target_s3_bucket_name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A name for the exported snapshot copy. ElastiCache does not permit
  # overwriting a snapshot, therefore this name must be unique within its
  # context - ElastiCache or an Amazon S3 bucket if exporting. Defaults to the
  # same name as the `source_snapshot_name`.
  target_snapshot_name = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="source_snapshot_arn" requirement="required" type="string">
<HclListItemDescription>

The ARN of an existing snapshot from which to make a copy.

</HclListItemDescription>
</HclListItem>

<HclListItem name="source_snapshot_name" requirement="required" type="string">
<HclListItemDescription>

The name of an existing snapshot from which to make a copy.

</HclListItemDescription>
</HclListItem>

<HclListItem name="target_s3_bucket_arn" requirement="required" type="string">
<HclListItemDescription>

The ARN of the s3 bucket to export the snapshot to.

</HclListItemDescription>
</HclListItem>

<HclListItem name="target_s3_bucket_name" requirement="required" type="string">
<HclListItemDescription>

The name of the s3 bucket to export the snapshot to.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="target_snapshot_name" requirement="optional" type="string">
<HclListItemDescription>

A name for the exported snapshot copy. ElastiCache does not permit overwriting a snapshot, therefore this name must be unique within its context - ElastiCache or an Amazon S3 bucket if exporting. Defaults to the same name as the `source_snapshot_name`.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="lambda_arn">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-cache/tree/v1.0.2/modules/redis_copy_snapshot/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-cache/tree/v1.0.2/modules/redis_copy_snapshot/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-cache/tree/v1.0.2/modules/redis_copy_snapshot/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "77c2d123ec8197b162aa420139cd5074"
}
##DOCS-SOURCER-END -->
