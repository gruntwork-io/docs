---
type: "service"
name: "S3 Bucket"
description: "Deploy an S3 bucket for data storage, with support for access logging, versioning and replication."
category: "data-store"
cloud: "aws"
tags: ["s3","data","storage"]
license: "gruntwork"
built-with: "terraform"
title: "S3 Bucket"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.104.14" lastModifiedVersion="0.104.2"/>

# S3 Bucket

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/data-stores/s3-bucket" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=data-stores%2Fs3-bucket" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>

## Overview

This service contains code to deploy an [S3 bucket](https://aws.amazon.com/s3/) on AWS.

![S3 bucket architecture](/img/reference/services/data-storage/s3-bucket-architecture.png)

## Features

*   Deploy a private, secure S3 bucket
*   Configure access logging to another S3 bucket
*   Configure object versioning
*   Configure cross-region replication

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

*   [Gruntwork private-s3-bucket module](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/private-s3-bucket): The underlying module that implements the private S3 bucket functionality.

*   [S3 Documentation](https://docs.aws.amazon.com/AmazonS3/latest/gsg/GetStartedWithS3.html): Amazon’s docs for S3 that
    cover core concepts such as creating, accessing, copying and deleting buckets.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

*   [How to enable MFA Delete?](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/private-s3-bucket#how-do-you-enable-mfa-delete): step-by-step guide on enabling MFA delete for your S3 buckets.


## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S S3-BUCKET MODULE
# ------------------------------------------------------------------------------------------------------

module "s_3_bucket" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/s3-bucket?ref=v0.104.14"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # What to name the S3 bucket. Note that S3 bucket names must be globally
  # unique across all AWS users!
  primary_bucket = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The S3 bucket where access logs for this bucket should be stored. Set to
  # null to disable access logging.
  access_logging_bucket = null

  # The lifecycle rules for the access logs bucket. See var.lifecycle_rules for
  # details.
  access_logging_bucket_lifecycle_rules = {}

  # Configure who will be the default owner of objects uploaded to the access
  # logs S3 bucket: must be one of BucketOwnerPreferred (the bucket owner owns
  # objects), ObjectWriter (the writer of each object owns that object). Note
  # that this setting only takes effect if the object is uploaded with the
  # bucket-owner-full-control canned ACL. See
  # https://docs.aws.amazon.com/AmazonS3/latest/dev/about-object-ownership.html
  # for more info.
  access_logging_bucket_ownership = "ObjectWriter"

  # The IAM policy to apply to the S3 bucket used to store access logs. You can
  # use this to grant read/write access. This should be a map, where each key is
  # a unique statement ID (SID), and each value is an object that contains the
  # parameters defined in the comment above.
  access_logging_bucket_policy_statements = {}

  # A prefix (i.e., folder path) to use for all access logs stored in
  # access_logging_bucket. Only used if access_logging_bucket is specified.
  access_logging_prefix = null

  # The canned ACL to apply. See comment above for the list of possible ACLs. If
  # not `null` bucket_ownership cannot be BucketOwnerEnforced
  acl = null

  # Optional whether or not to use Amazon S3 Bucket Keys for SSE-KMS.
  bucket_key_enabled = false

  # Optional KMS key to use for encrypting data in the S3 bucket. If null, data
  # in S3 will be encrypted using the default aws/s3 key. If provided, the key
  # policy of the provided key must allow whoever is writing to this bucket to
  # use that key.
  bucket_kms_key_arn = null

  # Configure who will be the default owner of objects uploaded to this S3
  # bucket: must be one of BucketOwnerPreferred (the bucket owner owns objects),
  # ObjectWriter (the writer of each object owns that object). Note that this
  # setting only takes effect if the object is uploaded with the
  # bucket-owner-full-control canned ACL. See
  # https://docs.aws.amazon.com/AmazonS3/latest/dev/about-object-ownership.html
  # for more info.
  bucket_ownership = "ObjectWriter"

  # The IAM policy to apply to this S3 bucket. You can use this to grant
  # read/write access. This should be a map, where each key is a unique
  # statement ID (SID), and each value is an object that contains the parameters
  # defined in the comment above.
  bucket_policy_statements = {}

  # The server-side encryption algorithm to use on the bucket. Valid values are
  # AES256 and aws:kms. To disable server-side encryption, set var.enable_sse to
  # false.
  bucket_sse_algorithm = "aws:kms"

  # CORS rules to set on this S3 bucket
  cors_rules = []

  # Set to true to enable server-side encryption for this bucket. You can
  # control the algorithm using var.sse_algorithm.
  enable_sse = true

  # Set to true to enable versioning for this bucket. If enabled, instead of
  # overriding objects, the S3 bucket will always create a new version of each
  # object, so all the old values are retained.
  enable_versioning = true

  # If set to true, when you run 'terraform destroy', delete all objects from
  # the logs bucket so that the bucket can be destroyed without error. Warning:
  # these objects are not recoverable so only use this if you're absolutely sure
  # you want to permanently delete everything!
  force_destroy_logs = false

  # If set to true, when you run 'terraform destroy', delete all objects from
  # the primary bucket so that the bucket can be destroyed without error.
  # Warning: these objects are not recoverable so only use this if you're
  # absolutely sure you want to permanently delete everything!
  force_destroy_primary = false

  # If set to true, when you run 'terraform destroy', delete all objects from
  # the replica bucket so that the bucket can be destroyed without error.
  # Warning: these objects are not recoverable so only use this if you're
  # absolutely sure you want to permanently delete everything!
  force_destroy_replica = false

  # The lifecycle rules for this S3 bucket. These can be used to change storage
  # types or delete objects based on customizable rules. This should be a map,
  # where each key is a unique ID for the lifecycle rule, and each value is an
  # object that contains the parameters defined in the comment above.
  lifecycle_rules = {}

  # Enable MFA delete for either 'Change the versioning state of your bucket' or
  # 'Permanently delete an object version'. This cannot be used to toggle this
  # setting but is available to allow managed buckets to reflect the state in
  # AWS. Only used if enable_versioning is true. For instructions on how to
  # enable MFA Delete, check out the README from the
  # terraform-aws-security/private-s3-bucket module.
  mfa_delete = false

  # The number of days that you want to specify for the default retention period
  # for Object Locking. Only one of object_lock_days or object_lock_years can be
  # configured. Only used if object_lock_enabled and
  # object_lock_default_retention_enabled are true.
  object_lock_days = null

  # Set to true to configure a default retention period for object locks when
  # Object Locking is enabled. When disabled, objects will not be protected with
  # locking by default unless explicitly configured at object creation time.
  # Only used if object_lock_enabled is true.
  object_lock_default_retention_enabled = true

  # Set to true to enable Object Locking. This prevents objects from being
  # deleted for a customizable period of time. Note that this MUST be configured
  # at bucket creation time - you cannot update an existing bucket to enable
  # object locking unless you go through AWS support. Additionally, this is not
  # reversible - once a bucket is created with object lock enabled, you cannot
  # disable object locking even with this setting. Note that enabling object
  # locking will automatically enable bucket versioning.
  object_lock_enabled = false

  # The default Object Lock retention mode you want to apply to new objects
  # placed in this bucket. Valid values are GOVERNANCE and COMPLIANCE. Only used
  # if object_lock_enabled and object_lock_default_retention_enabled are true.
  object_lock_mode = null

  # The number of years that you want to specify for the default retention
  # period for Object Locking. Only one of object_lock_days or object_lock_years
  # can be configured. Only used if object_lock_enabled and
  # object_lock_default_retention_enabled are true.
  object_lock_years = null

  # The S3 bucket that will be the replica of this bucket. Set to null to
  # disable replication.
  replica_bucket = null

  # The canned ACL to apply. See comment above for the list of possible ACLs. If
  # not `null` bucket_ownership cannot be BucketOwnerEnforced
  replica_bucket_acl = null

  # If set to true, replica bucket will be expected to already exist.
  replica_bucket_already_exists = false

  # Optional whether or not to use Amazon S3 Bucket Keys for SSE-KMS for the
  # replica bucket.
  replica_bucket_key_enabled = false

  # The lifecycle rules for the replica bucket. See var.lifecycle_rules for
  # details.
  replica_bucket_lifecycle_rules = {}

  # Configure who will be the default owner of objects uploaded to the replica
  # S3 bucket: must be one of BucketOwnerPreferred (the bucket owner owns
  # objects), ObjectWriter (the writer of each object owns that object). Note
  # that this setting only takes effect if the object is uploaded with the
  # bucket-owner-full-control canned ACL. See
  # https://docs.aws.amazon.com/AmazonS3/latest/dev/about-object-ownership.html
  # for more info.
  replica_bucket_ownership = "ObjectWriter"

  # The IAM policy to apply to the replica S3 bucket. You can use this to grant
  # read/write access. This should be a map, where each key is a unique
  # statement ID (SID), and each value is an object that contains the parameters
  # defined in the comment above.
  replica_bucket_policy_statements = {}

  # Set to true to enable server-side encryption for the replica bucket. You can
  # control the algorithm using var.replica_sse_algorithm.
  replica_enable_sse = true

  # The AWS region for the replica bucket.
  replica_region = null

  # The server-side encryption algorithm to use on the replica bucket. Valid
  # values are AES256 and aws:kms. To disable server-side encryption, set
  # var.replica_enable_sse to false.
  replica_sse_algorithm = "aws:kms"

  # The ARN of the IAM role for Amazon S3 to assume when replicating objects.
  # Only used if replication_bucket is specified.
  replication_role = null

  # The rules for managing replication. Only used if replication_bucket is
  # specified. This should be a map, where the key is a unique ID for each
  # replication rule and the value is an object of the form explained in a
  # comment above.
  replication_rules = {}

  # A map of tags to apply to the S3 Bucket. These tags will also be applied to
  # the access logging and replica buckets (if any). The key is the tag name and
  # the value is the tag value.
  tags = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S S3-BUCKET MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/s3-bucket?ref=v0.104.14"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # What to name the S3 bucket. Note that S3 bucket names must be globally
  # unique across all AWS users!
  primary_bucket = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The S3 bucket where access logs for this bucket should be stored. Set to
  # null to disable access logging.
  access_logging_bucket = null

  # The lifecycle rules for the access logs bucket. See var.lifecycle_rules for
  # details.
  access_logging_bucket_lifecycle_rules = {}

  # Configure who will be the default owner of objects uploaded to the access
  # logs S3 bucket: must be one of BucketOwnerPreferred (the bucket owner owns
  # objects), ObjectWriter (the writer of each object owns that object). Note
  # that this setting only takes effect if the object is uploaded with the
  # bucket-owner-full-control canned ACL. See
  # https://docs.aws.amazon.com/AmazonS3/latest/dev/about-object-ownership.html
  # for more info.
  access_logging_bucket_ownership = "ObjectWriter"

  # The IAM policy to apply to the S3 bucket used to store access logs. You can
  # use this to grant read/write access. This should be a map, where each key is
  # a unique statement ID (SID), and each value is an object that contains the
  # parameters defined in the comment above.
  access_logging_bucket_policy_statements = {}

  # A prefix (i.e., folder path) to use for all access logs stored in
  # access_logging_bucket. Only used if access_logging_bucket is specified.
  access_logging_prefix = null

  # The canned ACL to apply. See comment above for the list of possible ACLs. If
  # not `null` bucket_ownership cannot be BucketOwnerEnforced
  acl = null

  # Optional whether or not to use Amazon S3 Bucket Keys for SSE-KMS.
  bucket_key_enabled = false

  # Optional KMS key to use for encrypting data in the S3 bucket. If null, data
  # in S3 will be encrypted using the default aws/s3 key. If provided, the key
  # policy of the provided key must allow whoever is writing to this bucket to
  # use that key.
  bucket_kms_key_arn = null

  # Configure who will be the default owner of objects uploaded to this S3
  # bucket: must be one of BucketOwnerPreferred (the bucket owner owns objects),
  # ObjectWriter (the writer of each object owns that object). Note that this
  # setting only takes effect if the object is uploaded with the
  # bucket-owner-full-control canned ACL. See
  # https://docs.aws.amazon.com/AmazonS3/latest/dev/about-object-ownership.html
  # for more info.
  bucket_ownership = "ObjectWriter"

  # The IAM policy to apply to this S3 bucket. You can use this to grant
  # read/write access. This should be a map, where each key is a unique
  # statement ID (SID), and each value is an object that contains the parameters
  # defined in the comment above.
  bucket_policy_statements = {}

  # The server-side encryption algorithm to use on the bucket. Valid values are
  # AES256 and aws:kms. To disable server-side encryption, set var.enable_sse to
  # false.
  bucket_sse_algorithm = "aws:kms"

  # CORS rules to set on this S3 bucket
  cors_rules = []

  # Set to true to enable server-side encryption for this bucket. You can
  # control the algorithm using var.sse_algorithm.
  enable_sse = true

  # Set to true to enable versioning for this bucket. If enabled, instead of
  # overriding objects, the S3 bucket will always create a new version of each
  # object, so all the old values are retained.
  enable_versioning = true

  # If set to true, when you run 'terraform destroy', delete all objects from
  # the logs bucket so that the bucket can be destroyed without error. Warning:
  # these objects are not recoverable so only use this if you're absolutely sure
  # you want to permanently delete everything!
  force_destroy_logs = false

  # If set to true, when you run 'terraform destroy', delete all objects from
  # the primary bucket so that the bucket can be destroyed without error.
  # Warning: these objects are not recoverable so only use this if you're
  # absolutely sure you want to permanently delete everything!
  force_destroy_primary = false

  # If set to true, when you run 'terraform destroy', delete all objects from
  # the replica bucket so that the bucket can be destroyed without error.
  # Warning: these objects are not recoverable so only use this if you're
  # absolutely sure you want to permanently delete everything!
  force_destroy_replica = false

  # The lifecycle rules for this S3 bucket. These can be used to change storage
  # types or delete objects based on customizable rules. This should be a map,
  # where each key is a unique ID for the lifecycle rule, and each value is an
  # object that contains the parameters defined in the comment above.
  lifecycle_rules = {}

  # Enable MFA delete for either 'Change the versioning state of your bucket' or
  # 'Permanently delete an object version'. This cannot be used to toggle this
  # setting but is available to allow managed buckets to reflect the state in
  # AWS. Only used if enable_versioning is true. For instructions on how to
  # enable MFA Delete, check out the README from the
  # terraform-aws-security/private-s3-bucket module.
  mfa_delete = false

  # The number of days that you want to specify for the default retention period
  # for Object Locking. Only one of object_lock_days or object_lock_years can be
  # configured. Only used if object_lock_enabled and
  # object_lock_default_retention_enabled are true.
  object_lock_days = null

  # Set to true to configure a default retention period for object locks when
  # Object Locking is enabled. When disabled, objects will not be protected with
  # locking by default unless explicitly configured at object creation time.
  # Only used if object_lock_enabled is true.
  object_lock_default_retention_enabled = true

  # Set to true to enable Object Locking. This prevents objects from being
  # deleted for a customizable period of time. Note that this MUST be configured
  # at bucket creation time - you cannot update an existing bucket to enable
  # object locking unless you go through AWS support. Additionally, this is not
  # reversible - once a bucket is created with object lock enabled, you cannot
  # disable object locking even with this setting. Note that enabling object
  # locking will automatically enable bucket versioning.
  object_lock_enabled = false

  # The default Object Lock retention mode you want to apply to new objects
  # placed in this bucket. Valid values are GOVERNANCE and COMPLIANCE. Only used
  # if object_lock_enabled and object_lock_default_retention_enabled are true.
  object_lock_mode = null

  # The number of years that you want to specify for the default retention
  # period for Object Locking. Only one of object_lock_days or object_lock_years
  # can be configured. Only used if object_lock_enabled and
  # object_lock_default_retention_enabled are true.
  object_lock_years = null

  # The S3 bucket that will be the replica of this bucket. Set to null to
  # disable replication.
  replica_bucket = null

  # The canned ACL to apply. See comment above for the list of possible ACLs. If
  # not `null` bucket_ownership cannot be BucketOwnerEnforced
  replica_bucket_acl = null

  # If set to true, replica bucket will be expected to already exist.
  replica_bucket_already_exists = false

  # Optional whether or not to use Amazon S3 Bucket Keys for SSE-KMS for the
  # replica bucket.
  replica_bucket_key_enabled = false

  # The lifecycle rules for the replica bucket. See var.lifecycle_rules for
  # details.
  replica_bucket_lifecycle_rules = {}

  # Configure who will be the default owner of objects uploaded to the replica
  # S3 bucket: must be one of BucketOwnerPreferred (the bucket owner owns
  # objects), ObjectWriter (the writer of each object owns that object). Note
  # that this setting only takes effect if the object is uploaded with the
  # bucket-owner-full-control canned ACL. See
  # https://docs.aws.amazon.com/AmazonS3/latest/dev/about-object-ownership.html
  # for more info.
  replica_bucket_ownership = "ObjectWriter"

  # The IAM policy to apply to the replica S3 bucket. You can use this to grant
  # read/write access. This should be a map, where each key is a unique
  # statement ID (SID), and each value is an object that contains the parameters
  # defined in the comment above.
  replica_bucket_policy_statements = {}

  # Set to true to enable server-side encryption for the replica bucket. You can
  # control the algorithm using var.replica_sse_algorithm.
  replica_enable_sse = true

  # The AWS region for the replica bucket.
  replica_region = null

  # The server-side encryption algorithm to use on the replica bucket. Valid
  # values are AES256 and aws:kms. To disable server-side encryption, set
  # var.replica_enable_sse to false.
  replica_sse_algorithm = "aws:kms"

  # The ARN of the IAM role for Amazon S3 to assume when replicating objects.
  # Only used if replication_bucket is specified.
  replication_role = null

  # The rules for managing replication. Only used if replication_bucket is
  # specified. This should be a map, where the key is a unique ID for each
  # replication rule and the value is an object of the form explained in a
  # comment above.
  replication_rules = {}

  # A map of tags to apply to the S3 Bucket. These tags will also be applied to
  # the access logging and replica buckets (if any). The key is the tag name and
  # the value is the tag value.
  tags = {}

}


```

</TabItem>
</Tabs>



## Reference


<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="primary_bucket" requirement="required" type="string">
<HclListItemDescription>

What to name the S3 bucket. Note that S3 bucket names must be globally unique across all AWS users!

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="access_logging_bucket" requirement="optional" type="string">
<HclListItemDescription>

The S3 bucket where access logs for this bucket should be stored. Set to null to disable access logging.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="access_logging_bucket_lifecycle_rules" requirement="optional" type="any">
<HclListItemDescription>

The lifecycle rules for the access logs bucket. See <a href="#lifecycle_rules"><code>lifecycle_rules</code></a> for details.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="access_logging_bucket_ownership" requirement="optional" type="string">
<HclListItemDescription>

Configure who will be the default owner of objects uploaded to the access logs S3 bucket: must be one of BucketOwnerPreferred (the bucket owner owns objects), ObjectWriter (the writer of each object owns that object). Note that this setting only takes effect if the object is uploaded with the bucket-owner-full-control canned ACL. See https://docs.aws.amazon.com/AmazonS3/latest/dev/about-object-ownership.html for more info.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ObjectWriter&quot;"/>
</HclListItem>

<HclListItem name="access_logging_bucket_policy_statements" requirement="optional" type="any">
<HclListItemDescription>

The IAM policy to apply to the S3 bucket used to store access logs. You can use this to grant read/write access. This should be a map, where each key is a unique statement ID (SID), and each value is an object that contains the parameters defined in the comment above.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   {
      AllIamUsersReadAccess = {
        effect     = "Allow"
        actions    = ["s3:GetObject"]
        principals = {
          AWS = ["arn:aws:iam::111111111111:user/ann", "arn:aws:iam::111111111111:user/bob"]
        }
      }
   }

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Ideally, this would be a map(object({...})), but the Terraform object type constraint doesn't support optional
   parameters, whereas IAM policy statements have many optional params. And we can't even use map(any), as the
   Terraform map type constraint requires all values to have the same type ("shape"), but as each object in the map
   may specify different optional params, this won't work either. So, sadly, we are forced to fall back to "any."

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="access_logging_prefix" requirement="optional" type="string">
<HclListItemDescription>

A prefix (i.e., folder path) to use for all access logs stored in access_logging_bucket. Only used if access_logging_bucket is specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="acl" requirement="optional" type="string">
<HclListItemDescription>

The canned ACL to apply. See comment above for the list of possible ACLs. If not `null` bucket_ownership cannot be BucketOwnerEnforced

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="bucket_key_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Optional whether or not to use Amazon S3 Bucket Keys for SSE-KMS.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="bucket_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

Optional KMS key to use for encrypting data in the S3 bucket. If null, data in S3 will be encrypted using the default aws/s3 key. If provided, the key policy of the provided key must allow whoever is writing to this bucket to use that key.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="bucket_ownership" requirement="optional" type="string">
<HclListItemDescription>

Configure who will be the default owner of objects uploaded to this S3 bucket: must be one of BucketOwnerPreferred (the bucket owner owns objects), ObjectWriter (the writer of each object owns that object). Note that this setting only takes effect if the object is uploaded with the bucket-owner-full-control canned ACL. See https://docs.aws.amazon.com/AmazonS3/latest/dev/about-object-ownership.html for more info.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ObjectWriter&quot;"/>
</HclListItem>

<HclListItem name="bucket_policy_statements" requirement="optional" type="any">
<HclListItemDescription>

The IAM policy to apply to this S3 bucket. You can use this to grant read/write access. This should be a map, where each key is a unique statement ID (SID), and each value is an object that contains the parameters defined in the comment above.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   {
      AllIamUsersReadAccess = {
        effect     = "Allow"
        actions    = ["s3:GetObject"]
        principals = {
          AWS = ["arn:aws:iam::111111111111:user/ann", "arn:aws:iam::111111111111:user/bob"]
        }
      }
   }

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Ideally, this would be a map(object({...})), but the Terraform object type constraint doesn't support optional
   parameters, whereas IAM policy statements have many optional params. And we can't even use map(any), as the
   Terraform map type constraint requires all values to have the same type ("shape"), but as each object in the map
   may specify different optional params, this won't work either. So, sadly, we are forced to fall back to "any."

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="bucket_sse_algorithm" requirement="optional" type="string">
<HclListItemDescription>

The server-side encryption algorithm to use on the bucket. Valid values are AES256 and aws:kms. To disable server-side encryption, set <a href="#enable_sse"><code>enable_sse</code></a> to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;aws:kms&quot;"/>
</HclListItem>

<HclListItem name="cors_rules" requirement="optional" type="any">
<HclListItemDescription>

CORS rules to set on this S3 bucket

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   [
     {
       allowed_origins = ["*"]
       allowed_methods = ["GET", "HEAD"]
       allowed_headers = ["x-amz-*"]
       expose_headers  = ["Etag"]
       max_age_seconds = 3000
     }
   ]

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   The objects that can define the following properties:
  
   - allowed_origins list(string)      (required): The origins that you want to allow cross-domain requests from.
   - allowed_methods list(string)      (required): From the set of GET, PUT, POST, DELETE, HEAD
   - allowed_headers list(string)      (optional): The AllowedHeader element specifies which headers are allowed in a preflight request through the Access-Control-Request-Headers header.
   - expose_headers  list(string)      (optional): Each ExposeHeader element identifies a header in the response that you want customers to be able to access from their applications.
   - max_age_seconds number            (optional): The MaxAgeSeconds element specifies the time in seconds that your browser can cache the response for a preflight request as identified by the resource, the HTTP method, and the origin.

```
</details>

<details>


```hcl

   Ideally, this would be a list(object({...})), but the Terraform object type constraint doesn't support optional
   parameters, whereas replication rules have many optional params. And we can't even use list(any), as the Terraform
   list type constraint requires all values to have the same type ("shape"), but as each object in the list may specify
   different optional params, this won't work either. So, sadly, we are forced to fall back to "any."

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="enable_sse" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable server-side encryption for this bucket. You can control the algorithm using <a href="#sse_algorithm"><code>sse_algorithm</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_versioning" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable versioning for this bucket. If enabled, instead of overriding objects, the S3 bucket will always create a new version of each object, so all the old values are retained.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="force_destroy_logs" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, when you run 'terraform destroy', delete all objects from the logs bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="force_destroy_primary" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, when you run 'terraform destroy', delete all objects from the primary bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="force_destroy_replica" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, when you run 'terraform destroy', delete all objects from the replica bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="lifecycle_rules" requirement="optional" type="any">
<HclListItemDescription>

The lifecycle rules for this S3 bucket. These can be used to change storage types or delete objects based on customizable rules. This should be a map, where each key is a unique ID for the lifecycle rule, and each value is an object that contains the parameters defined in the comment above.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Ideally, this would be a map(object({...})), but the Terraform object type constraint doesn't support optional
   parameters, whereas lifecycle rules have many optional params. And we can't even use map(any), as the Terraform
   map type constraint requires all values to have the same type ("shape"), but as each object in the map may specify
   different optional params, this won't work either. So, sadly, we are forced to fall back to "any."

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="mfa_delete" requirement="optional" type="bool">
<HclListItemDescription>

Enable MFA delete for either 'Change the versioning state of your bucket' or 'Permanently delete an object version'. This cannot be used to toggle this setting but is available to allow managed buckets to reflect the state in AWS. Only used if enable_versioning is true. For instructions on how to enable MFA Delete, check out the README from the terraform-aws-security/private-s3-bucket module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="object_lock_days" requirement="optional" type="number">
<HclListItemDescription>

The number of days that you want to specify for the default retention period for Object Locking. Only one of object_lock_days or object_lock_years can be configured. Only used if object_lock_enabled and object_lock_default_retention_enabled are true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="object_lock_default_retention_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to configure a default retention period for object locks when Object Locking is enabled. When disabled, objects will not be protected with locking by default unless explicitly configured at object creation time. Only used if object_lock_enabled is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="object_lock_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable Object Locking. This prevents objects from being deleted for a customizable period of time. Note that this MUST be configured at bucket creation time - you cannot update an existing bucket to enable object locking unless you go through AWS support. Additionally, this is not reversible - once a bucket is created with object lock enabled, you cannot disable object locking even with this setting. Note that enabling object locking will automatically enable bucket versioning.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="object_lock_mode" requirement="optional" type="string">
<HclListItemDescription>

The default Object Lock retention mode you want to apply to new objects placed in this bucket. Valid values are GOVERNANCE and COMPLIANCE. Only used if object_lock_enabled and object_lock_default_retention_enabled are true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="object_lock_years" requirement="optional" type="number">
<HclListItemDescription>

The number of years that you want to specify for the default retention period for Object Locking. Only one of object_lock_days or object_lock_years can be configured. Only used if object_lock_enabled and object_lock_default_retention_enabled are true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="replica_bucket" requirement="optional" type="string">
<HclListItemDescription>

The S3 bucket that will be the replica of this bucket. Set to null to disable replication.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="replica_bucket_acl" requirement="optional" type="string">
<HclListItemDescription>

The canned ACL to apply. See comment above for the list of possible ACLs. If not `null` bucket_ownership cannot be BucketOwnerEnforced

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="replica_bucket_already_exists" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, replica bucket will be expected to already exist.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="replica_bucket_key_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Optional whether or not to use Amazon S3 Bucket Keys for SSE-KMS for the replica bucket.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="replica_bucket_lifecycle_rules" requirement="optional" type="any">
<HclListItemDescription>

The lifecycle rules for the replica bucket. See <a href="#lifecycle_rules"><code>lifecycle_rules</code></a> for details.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="replica_bucket_ownership" requirement="optional" type="string">
<HclListItemDescription>

Configure who will be the default owner of objects uploaded to the replica S3 bucket: must be one of BucketOwnerPreferred (the bucket owner owns objects), ObjectWriter (the writer of each object owns that object). Note that this setting only takes effect if the object is uploaded with the bucket-owner-full-control canned ACL. See https://docs.aws.amazon.com/AmazonS3/latest/dev/about-object-ownership.html for more info.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ObjectWriter&quot;"/>
</HclListItem>

<HclListItem name="replica_bucket_policy_statements" requirement="optional" type="any">
<HclListItemDescription>

The IAM policy to apply to the replica S3 bucket. You can use this to grant read/write access. This should be a map, where each key is a unique statement ID (SID), and each value is an object that contains the parameters defined in the comment above.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   {
      AllIamUsersReadAccess = {
        effect     = "Allow"
        actions    = ["s3:GetObject"]
        principals = {
          AWS = ["arn:aws:iam::111111111111:user/ann", "arn:aws:iam::111111111111:user/bob"]
        }
      }
   }

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Ideally, this would be a map(object({...})), but the Terraform object type constraint doesn't support optional
   parameters, whereas IAM policy statements have many optional params. And we can't even use map(any), as the
   Terraform map type constraint requires all values to have the same type ("shape"), but as each object in the map
   may specify different optional params, this won't work either. So, sadly, we are forced to fall back to "any."

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="replica_enable_sse" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable server-side encryption for the replica bucket. You can control the algorithm using <a href="#replica_sse_algorithm"><code>replica_sse_algorithm</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="replica_region" requirement="optional" type="string">
<HclListItemDescription>

The AWS region for the replica bucket.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="replica_sse_algorithm" requirement="optional" type="string">
<HclListItemDescription>

The server-side encryption algorithm to use on the replica bucket. Valid values are AES256 and aws:kms. To disable server-side encryption, set <a href="#replica_enable_sse"><code>replica_enable_sse</code></a> to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;aws:kms&quot;"/>
</HclListItem>

<HclListItem name="replication_role" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the IAM role for Amazon S3 to assume when replicating objects. Only used if replication_bucket is specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="replication_rules" requirement="optional" type="any">
<HclListItemDescription>

The rules for managing replication. Only used if replication_bucket is specified. This should be a map, where the key is a unique ID for each replication rule and the value is an object of the form explained in a comment above.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   {
     ExampleConfig = {
       prefix                    = "config/"
       status                    = "Enabled"
       destination_bucket        = "arn:aws:s3:::my-destination-bucket"
       destination_storage_class = "STANDARD"
     }
   }

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Ideally, this would be a list(object({...})), but the Terraform object type constraint doesn't support optional
   parameters, whereas replication rules have many optional params. And we can't even use list(any), as the Terraform
   list type constraint requires all values to have the same type ("shape"), but as each object in the list may specify
   different optional params, this won't work either. So, sadly, we are forced to fall back to "any."

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the S3 Bucket. These tags will also be applied to the access logging and replica buckets (if any). The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="access_logging_bucket_name">
<HclListItemDescription>

The name of the access logging S3 bucket.

</HclListItemDescription>
</HclListItem>

<HclListItem name="hosted_zone_id">
<HclListItemDescription>

The Route 53 Hosted Zone ID for this bucket's region.

</HclListItemDescription>
</HclListItem>

<HclListItem name="primary_bucket_arn">
<HclListItemDescription>

The ARN of the S3 bucket.

</HclListItemDescription>
</HclListItem>

<HclListItem name="primary_bucket_domain_name">
<HclListItemDescription>

The bucket domain name. Will be of format bucketname.s3.amazonaws.com.

</HclListItemDescription>
</HclListItem>

<HclListItem name="primary_bucket_name">
<HclListItemDescription>

The name of the primary S3 bucket.

</HclListItemDescription>
</HclListItem>

<HclListItem name="primary_bucket_regional_domain_name">
<HclListItemDescription>

The bucket region-specific domain name. The bucket domain name including the region name, please refer here for format. Note: The AWS CloudFront allows specifying S3 region-specific endpoint when creating S3 origin, it will prevent redirect issues from CloudFront to S3 Origin URL.

</HclListItemDescription>
</HclListItem>

<HclListItem name="replica_bucket_name">
<HclListItemDescription>

The name of the replica S3 bucket.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/data-stores/s3-bucket/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/data-stores/s3-bucket/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/data-stores/s3-bucket/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "4ce305ab000ac8ab675f16bd0ffb92e7"
}
##DOCS-SOURCER-END -->
