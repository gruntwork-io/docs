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

<VersionBadge version="0.80.2" lastModifiedVersion="0.78.0"/>

# S3 Bucket


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/data-stores/s3-bucket" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=data-stores%2Fs3-bucket" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

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

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

*   [How to enable MFA Delete?](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/private-s3-bucket#how-do-you-enable-mfa-delete): step-by-step guide on enabling MFA delete for your S3 buckets.

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<a name="access_logging_bucket" className="snap-top"></a>

* [**`access_logging_bucket`**](#access_logging_bucket) &mdash; The S3 bucket where access logs for this bucket should be stored. Set to null to disable access logging.

<a name="access_logging_bucket_lifecycle_rules" className="snap-top"></a>

* [**`access_logging_bucket_lifecycle_rules`**](#access_logging_bucket_lifecycle_rules) &mdash; The lifecycle rules for the access logs bucket. See [`lifecycle_rules`](#lifecycle_rules) for details.

<a name="access_logging_bucket_ownership" className="snap-top"></a>

* [**`access_logging_bucket_ownership`**](#access_logging_bucket_ownership) &mdash; Configure who will be the default owner of objects uploaded to the access logs S3 bucket: must be one of BucketOwnerPreferred (the bucket owner owns objects), ObjectWriter (the writer of each object owns that object), or null (don't configure this feature). Note that this setting only takes effect if the object is uploaded with the bucket-owner-full-control canned ACL. See https://docs.aws.amazon.com/AmazonS3/latest/dev/about-object-ownership.html for more info.

<a name="access_logging_bucket_policy_statements" className="snap-top"></a>

* [**`access_logging_bucket_policy_statements`**](#access_logging_bucket_policy_statements) &mdash; The IAM policy to apply to the S3 bucket used to store access logs. You can use this to grant read/write access. This should be a map, where each key is a unique statement ID (SID), and each value is an object that contains the parameters defined in the comment above.

<a name="access_logging_prefix" className="snap-top"></a>

* [**`access_logging_prefix`**](#access_logging_prefix) &mdash; A prefix (i.e., folder path) to use for all access logs stored in [`access_logging_bucket`](#access_logging_bucket). Only used if [`access_logging_bucket`](#access_logging_bucket) is specified.

<a name="bucket_kms_key_arn" className="snap-top"></a>

* [**`bucket_kms_key_arn`**](#bucket_kms_key_arn) &mdash; Optional KMS key to use for encrypting data in the S3 bucket. If null, data in S3 will be encrypted using the default aws/s3 key. If provided, the key policy of the provided key must allow whoever is writing to this bucket to use that key.

<a name="bucket_ownership" className="snap-top"></a>

* [**`bucket_ownership`**](#bucket_ownership) &mdash; Configure who will be the default owner of objects uploaded to this S3 bucket: must be one of BucketOwnerPreferred (the bucket owner owns objects), ObjectWriter (the writer of each object owns that object), or null (don't configure this feature). Note that this setting only takes effect if the object is uploaded with the bucket-owner-full-control canned ACL. See https://docs.aws.amazon.com/AmazonS3/latest/dev/about-object-ownership.html for more info.

<a name="bucket_policy_statements" className="snap-top"></a>

* [**`bucket_policy_statements`**](#bucket_policy_statements) &mdash; The IAM policy to apply to this S3 bucket. You can use this to grant read/write access. This should be a map, where each key is a unique statement ID (SID), and each value is an object that contains the parameters defined in the comment above.

<a name="bucket_sse_algorithm" className="snap-top"></a>

* [**`bucket_sse_algorithm`**](#bucket_sse_algorithm) &mdash; The server-side encryption algorithm to use on the bucket. Valid values are AES256 and aws:kms. To disable server-side encryption, set [`enable_sse`](#enable_sse) to false.

<a name="cors_rules" className="snap-top"></a>

* [**`cors_rules`**](#cors_rules) &mdash; CORS rules to set on this S3 bucket

<a name="enable_sse" className="snap-top"></a>

* [**`enable_sse`**](#enable_sse) &mdash; Set to true to enable server-side encryption for this bucket. You can control the algorithm using [`sse_algorithm`](#sse_algorithm).

<a name="enable_versioning" className="snap-top"></a>

* [**`enable_versioning`**](#enable_versioning) &mdash; Set to true to enable versioning for this bucket. If enabled, instead of overriding objects, the S3 bucket will always create a new version of each object, so all the old values are retained.

<a name="force_destroy_logs" className="snap-top"></a>

* [**`force_destroy_logs`**](#force_destroy_logs) &mdash; If set to true, when you run 'terraform destroy', delete all objects from the logs bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!

<a name="force_destroy_primary" className="snap-top"></a>

* [**`force_destroy_primary`**](#force_destroy_primary) &mdash; If set to true, when you run 'terraform destroy', delete all objects from the primary bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!

<a name="force_destroy_replica" className="snap-top"></a>

* [**`force_destroy_replica`**](#force_destroy_replica) &mdash; If set to true, when you run 'terraform destroy', delete all objects from the replica bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!

<a name="lifecycle_rules" className="snap-top"></a>

* [**`lifecycle_rules`**](#lifecycle_rules) &mdash; The lifecycle rules for this S3 bucket. These can be used to change storage types or delete objects based on customizable rules. This should be a map, where each key is a unique ID for the lifecycle rule, and each value is an object that contains the parameters defined in the comment above.

<a name="mfa_delete" className="snap-top"></a>

* [**`mfa_delete`**](#mfa_delete) &mdash; Enable MFA delete for either 'Change the versioning state of your bucket' or 'Permanently delete an object version'. This cannot be used to toggle this setting but is available to allow managed buckets to reflect the state in AWS. Only used if [`enable_versioning`](#enable_versioning) is true. For instructions on how to enable MFA Delete, check out the README from the terraform-aws-security/private-s3-bucket module.

<a name="primary_bucket" className="snap-top"></a>

* [**`primary_bucket`**](#primary_bucket) &mdash; What to name the S3 bucket. Note that S3 bucket names must be globally unique across all AWS users!

<a name="replica_bucket" className="snap-top"></a>

* [**`replica_bucket`**](#replica_bucket) &mdash; The S3 bucket that will be the replica of this bucket. Set to null to disable replication.

<a name="replica_bucket_already_exists" className="snap-top"></a>

* [**`replica_bucket_already_exists`**](#replica_bucket_already_exists) &mdash; If set to true, replica bucket will be expected to already exist.

<a name="replica_bucket_lifecycle_rules" className="snap-top"></a>

* [**`replica_bucket_lifecycle_rules`**](#replica_bucket_lifecycle_rules) &mdash; The lifecycle rules for the replica bucket. See [`lifecycle_rules`](#lifecycle_rules) for details.

<a name="replica_bucket_ownership" className="snap-top"></a>

* [**`replica_bucket_ownership`**](#replica_bucket_ownership) &mdash; Configure who will be the default owner of objects uploaded to the replica S3 bucket: must be one of BucketOwnerPreferred (the bucket owner owns objects), ObjectWriter (the writer of each object owns that object), or null (don't configure this feature). Note that this setting only takes effect if the object is uploaded with the bucket-owner-full-control canned ACL. See https://docs.aws.amazon.com/AmazonS3/latest/dev/about-object-ownership.html for more info.

<a name="replica_bucket_policy_statements" className="snap-top"></a>

* [**`replica_bucket_policy_statements`**](#replica_bucket_policy_statements) &mdash; The IAM policy to apply to the replica S3 bucket. You can use this to grant read/write access. This should be a map, where each key is a unique statement ID (SID), and each value is an object that contains the parameters defined in the comment above.

<a name="replica_enable_sse" className="snap-top"></a>

* [**`replica_enable_sse`**](#replica_enable_sse) &mdash; Set to true to enable server-side encryption for the replica bucket. You can control the algorithm using [`replica_sse_algorithm`](#replica_sse_algorithm).

<a name="replica_region" className="snap-top"></a>

* [**`replica_region`**](#replica_region) &mdash; The AWS region for the replica bucket.

<a name="replica_sse_algorithm" className="snap-top"></a>

* [**`replica_sse_algorithm`**](#replica_sse_algorithm) &mdash; The server-side encryption algorithm to use on the replica bucket. Valid values are AES256 and aws:kms. To disable server-side encryption, set [`replica_enable_sse`](#replica_enable_sse) to false.

<a name="replication_role" className="snap-top"></a>

* [**`replication_role`**](#replication_role) &mdash; The ARN of the IAM role for Amazon S3 to assume when replicating objects. Only used if [`replication_bucket`](#replication_bucket) is specified.

<a name="replication_rules" className="snap-top"></a>

* [**`replication_rules`**](#replication_rules) &mdash; The rules for managing replication. Only used if [`replication_bucket`](#replication_bucket) is specified. This should be a map, where the key is a unique ID for each replication rule and the value is an object of the form explained in a comment above.

<a name="tags" className="snap-top"></a>

* [**`tags`**](#tags) &mdash; A map of tags to apply to the S3 Bucket. These tags will also be applied to the access logging and replica buckets (if any). The key is the tag name and the value is the tag value.

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="access_logging_bucket_name" className="snap-top"></a>

* [**`access_logging_bucket_name`**](#access_logging_bucket_name) &mdash; The name of the access logging S3 bucket.

<a name="hosted_zone_id" className="snap-top"></a>

* [**`hosted_zone_id`**](#hosted_zone_id) &mdash; The Route 53 Hosted Zone ID for this bucket's region.

<a name="primary_bucket_arn" className="snap-top"></a>

* [**`primary_bucket_arn`**](#primary_bucket_arn) &mdash; The ARN of the S3 bucket.

<a name="primary_bucket_domain_name" className="snap-top"></a>

* [**`primary_bucket_domain_name`**](#primary_bucket_domain_name) &mdash; The bucket domain name. Will be of format bucketname.s3.amazonaws.com.

<a name="primary_bucket_name" className="snap-top"></a>

* [**`primary_bucket_name`**](#primary_bucket_name) &mdash; The name of the primary S3 bucket.

<a name="primary_bucket_regional_domain_name" className="snap-top"></a>

* [**`primary_bucket_regional_domain_name`**](#primary_bucket_regional_domain_name) &mdash; The bucket region-specific domain name. The bucket domain name including the region name, please refer here for format. Note: The AWS CloudFront allows specifying S3 region-specific endpoint when creating S3 origin, it will prevent redirect issues from CloudFront to S3 Origin URL.

<a name="replica_bucket_name" className="snap-top"></a>

* [**`replica_bucket_name`**](#replica_bucket_name) &mdash; The name of the replica S3 bucket.

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"cdf5919537781084c5c9d05096c7e23d"}
##DOCS-SOURCER-END -->
