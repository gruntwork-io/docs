---
title: "S3 Static Website"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Static Assets Modules" version="1.0.0" lastModifiedVersion="0.20.5"/>

# S3 Static Website

<a href="https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v1.0.0/modules/s3-static-website" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.20.5" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module creates an AWS S3 bucket that can be used to host a static website. That is, the website can contain static HTML, CSS, JS, and images.

![Static S3 Website](/img/reference/modules/terraform-aws-static-assets/s3-static-website/s3-architecture.png)

## Features

*   Offload storage and serving of static content (HTML, CSS, JS, images) to an S3 bucket configured as a website.

*   Specify custom routing rules for the website.

*   Optionally configure a custom domain name for the website.

*   Optionally deploy a CDN in front of S3 using the [s3-cloudfront module](https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v1.0.0/modules/s3-cloudfront).

## Learn

The reason to serve static content from S3 rather than from your own app server is that it can significantly reduce the load on your server, allowing it to solely focus on serving dynamic data. This will save you money and make your website run faster. For even bigger improvements in performance, consider deploying a CloudFront Content Distribution Network (CDN) in front of the S3 bucket using the s3-cloudfront module.

### Core concepts

*   [Quick Start](https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v1.0.0/modules/s3-static-website/core-concepts.md#quick-start)

*   [How to test the website](https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v1.0.0/modules/s3-static-website/core-concepts.md#how-to-test-the-website)

*   [How to configure HTTPS (SSL) or a CDN?](https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v1.0.0/modules/s3-static-website/core-concepts.md#how-to-configure-http)

*   [How to handle www + root domains](https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v1.0.0/modules/s3-static-website/core-concepts.md#how-to-handle)

*   [How do I configure Cross Origin Resource Sharing (CORS)?](https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v1.0.0/modules/s3-static-website/core-concepts.md#how-do-i-configure-cross-origin-resource-sharing-cors)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v1.0.0/modules): The main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.

*   [examples](https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v1.0.0/examples): This folder contains working examples of how to use the submodules.

*   [test](https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v1.0.0/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [Examples folder](https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v1.0.0/examples): The `examples` folder contains sample code optimized for learning, experimenting, and testing (but not production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [Example for static website](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/tree/5fcefff/services/static-website): Production-ready sample code.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S S3-STATIC-WEBSITE MODULE
# ------------------------------------------------------------------------------------------------------

module "s_3_static_website" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-static-assets.git//modules/s3-static-website?ref=v1.0.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the website and the S3 bucket to create (e.g. static.foo.com).
  website_domain_name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The folder in the access logs bucket where logs should be written.
  access_log_prefix = null

  # Set to true to enable versioning for the access logs S3 bucket. If enabled,
  # instead of overriding objects, the S3 bucket will always create a new
  # version of each object, so all the old values are retained.
  access_logs_enable_versioning = false

  # How many days to keep access logs around for before deleting them.
  access_logs_expiration_time_in_days = 30

  # Optional KMS key to use for encrypting data in the access logs S3 bucket. If
  # null, data in the access logs S3 bucket will be encrypted using the default
  # aws/s3 key. If provided, the key policy of the provided key must allow
  # whoever is writing to this bucket to use that key.
  access_logs_kms_key_arn = null

  # The server-side encryption algorithm to use on data in the access logs S3
  # bucket. Valid values are AES256 and aws:kms.
  access_logs_sse_algorithm = "aws:kms"

  # Whether the bucket should have a random string appended to the name (by
  # default a random string is not appended)
  add_random_id_name_suffix = false

  # The domain name associated with a hosted zone in Route 53. Usually the base
  # domain name of one of the var.website_domain_name (e.g. foo.com). This is
  # used to find the hosted zone that will be used for the CloudFront
  # distribution.
  base_domain_name = null

  # The tags associated with var.base_domain_name. If there are multiple hosted
  # zones for the same base_domain_name, this will help filter the hosted zones
  # so that the correct hosted zone is found.
  base_domain_name_tags = {}

  # The IAM ARN of the CloudFront origin access identity. Only used if
  # var.restrict_access_to_cloudfront is true. In older AWS accounts, you must
  # use this in place of
  # var.cloudfront_origin_access_identity_s3_canonical_user_id. Otherwise, you
  # will end up with a perpetual diff on the IAM policy. See
  # https://github.com/terraform-providers/terraform-provider-aws/issues/10158
  # for context.
  cloudfront_origin_access_identity_iam_arn = null

  # The ID of the s3 Canonical User for Cloudfront Origin Identity. Only used if
  # var.restrict_access_to_cloudfront is true. See:
  # https://docs.aws.amazon.com/AmazonS3/latest/dev/example-bucket-policies.html#example-bucket-policies-use-case-6.
  # If you are getting a perpetual diff, set
  # var.cloudfront_origin_access_identity_iam_arn.
  cloudfront_origin_access_identity_s3_canonical_user_id = null

  # A configuration for CORS on the S3 bucket. Default value comes from AWS. Can
  # override for custom CORS by passing the object structure define in the
  # documentation
  # https://www.terraform.io/docs/providers/aws/r/s3_bucket.html#using-cors.
  cors_rule = []

  # If set to true, create a DNS A Record in Route 53 with the domain name in
  # var.website_domain_name. If you're using CloudFront, you should configure
  # the domain name in the CloudFront module and not in this module.
  create_route53_entry = false

  # A map of custom tags to apply to the S3 bucket. The key is the tag name and
  # the value is the tag value.
  custom_tags = {}

  # Set to true to enable versioning. This means the bucket will retain all old
  # versions of all files. This is useful for backup purposes (e.g. you can
  # rollback to an older version), but it may mean your bucket uses more
  # storage.
  enable_versioning = true

  # The path to the error document in the S3 bucket (e.g. error.html).
  error_document = "error.html"

  # If set to true, this will force the delete of the access logs S3 bucket when
  # you run terraform destroy, even if there is still content in it. This is
  # only meant for testing and should not be used in production.
  force_destroy_access_logs_bucket = false

  # If set to true, this will force the delete of the redirect S3 bucket when
  # you run terraform destroy, even if there is still content in it. This is
  # only meant for testing and should not be used in production.
  force_destroy_redirect = false

  # If set to true, this will force the delete of the website S3 bucket when you
  # run terraform destroy, even if there is still content in it. This is only
  # meant for testing and should not be used in production.
  force_destroy_website = false

  # The ID of the Route 53 Hosted Zone in which to create the DNS A Record
  # specified in var.website_domain_name. Only used if var.create_route53_entry
  # is true.
  hosted_zone_id = null

  # The path to the index document in the S3 bucket (e.g. index.html).
  index_document = "index.html"

  # The lifecycle rules for this S3 bucket. These can be used to change storage
  # types or delete objects based on customizable rules. This should be a map,
  # where each key is a unique ID for the lifecycle rule, and each value is an
  # object that contains the parameters defined in the comment above.
  lifecycle_rules = {}

  # Whether the Route 53 Hosted Zone associated with var.base_domain_name is
  # private.
  private_zone = false

  # A string of the URL to redirect all requests to. Only used if
  # var.should_redirect_all_requests is true.
  redirect_all_requests_to = null

  # If set to true, the S3 bucket will only be accessible via CloudFront, and
  # not directly. You must specify var.cloudfront_origin_access_identity_iam_arn
  # if you set this variable to true.
  restrict_access_to_cloudfront = false

  # A map describing the routing_rule for the aws_s3_website_configuration
  # resource. Describes redirect behavior and conditions when redirects are
  # applied. Conflicts with redirect_all_requests_to and routing_rules. Use
  # routing_rules if rules contain empty String values.
  routing_rule = {}

  # A json string array containing routing rules for the
  # aws_s3_website_configuration resource. Describes redirect behavior and
  # conditions when redirects are applied. Conflicts with routing_rule and
  # redirect_all_requests_to. Use this when routing rules contain empty String
  # values.
  routing_rules = null

  # The S3 bucket object ownership. Valid values are BucketOwnerPreferred,
  # ObjectWriter or BucketOwnerEnforced.
  # https://docs.aws.amazon.com/AmazonS3/latest/userguide/about-object-ownership.html
  s3_bucket_object_ownership = "ObjectWriter"

  # By default, the s3 buckets are named after the domain name. Use this
  # configuration to override it with this value instead.
  s3_bucket_override_bucket_name = null

  # List of IAM policy documents, in stringified JSON format, that are merged
  # into the S3 bucket policy.
  s3_bucket_override_policy_documents = null

  # A configuration for server side encryption (SSE) on the S3 bucket. Defaults
  # to AES256. The list should contain the object structure defined in the
  # documentation
  # https://www.terraform.io/docs/providers/aws/r/s3_bucket.html#enable-default-server-side-encryption.
  # To opt out of encryption set the variable to an empty list [].
  server_side_encryption_configuration = [{"rule":[{"apply_server_side_encryption_by_default":[{"kms_master_key_id":"","sse_algorithm":"AES256"}]}]}]

  # If set to true, this implies that this S3 bucket is only for redirecting all
  # requests to another domain name specified in var.redirect_all_requests_to.
  # This is useful to setup a bucket to redirect, for example, foo.com to
  # www.foo.com. Conflicts with routing_rule.
  should_redirect_all_requests = false

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S S3-STATIC-WEBSITE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-static-assets.git//modules/s3-static-website?ref=v1.0.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the website and the S3 bucket to create (e.g. static.foo.com).
  website_domain_name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The folder in the access logs bucket where logs should be written.
  access_log_prefix = null

  # Set to true to enable versioning for the access logs S3 bucket. If enabled,
  # instead of overriding objects, the S3 bucket will always create a new
  # version of each object, so all the old values are retained.
  access_logs_enable_versioning = false

  # How many days to keep access logs around for before deleting them.
  access_logs_expiration_time_in_days = 30

  # Optional KMS key to use for encrypting data in the access logs S3 bucket. If
  # null, data in the access logs S3 bucket will be encrypted using the default
  # aws/s3 key. If provided, the key policy of the provided key must allow
  # whoever is writing to this bucket to use that key.
  access_logs_kms_key_arn = null

  # The server-side encryption algorithm to use on data in the access logs S3
  # bucket. Valid values are AES256 and aws:kms.
  access_logs_sse_algorithm = "aws:kms"

  # Whether the bucket should have a random string appended to the name (by
  # default a random string is not appended)
  add_random_id_name_suffix = false

  # The domain name associated with a hosted zone in Route 53. Usually the base
  # domain name of one of the var.website_domain_name (e.g. foo.com). This is
  # used to find the hosted zone that will be used for the CloudFront
  # distribution.
  base_domain_name = null

  # The tags associated with var.base_domain_name. If there are multiple hosted
  # zones for the same base_domain_name, this will help filter the hosted zones
  # so that the correct hosted zone is found.
  base_domain_name_tags = {}

  # The IAM ARN of the CloudFront origin access identity. Only used if
  # var.restrict_access_to_cloudfront is true. In older AWS accounts, you must
  # use this in place of
  # var.cloudfront_origin_access_identity_s3_canonical_user_id. Otherwise, you
  # will end up with a perpetual diff on the IAM policy. See
  # https://github.com/terraform-providers/terraform-provider-aws/issues/10158
  # for context.
  cloudfront_origin_access_identity_iam_arn = null

  # The ID of the s3 Canonical User for Cloudfront Origin Identity. Only used if
  # var.restrict_access_to_cloudfront is true. See:
  # https://docs.aws.amazon.com/AmazonS3/latest/dev/example-bucket-policies.html#example-bucket-policies-use-case-6.
  # If you are getting a perpetual diff, set
  # var.cloudfront_origin_access_identity_iam_arn.
  cloudfront_origin_access_identity_s3_canonical_user_id = null

  # A configuration for CORS on the S3 bucket. Default value comes from AWS. Can
  # override for custom CORS by passing the object structure define in the
  # documentation
  # https://www.terraform.io/docs/providers/aws/r/s3_bucket.html#using-cors.
  cors_rule = []

  # If set to true, create a DNS A Record in Route 53 with the domain name in
  # var.website_domain_name. If you're using CloudFront, you should configure
  # the domain name in the CloudFront module and not in this module.
  create_route53_entry = false

  # A map of custom tags to apply to the S3 bucket. The key is the tag name and
  # the value is the tag value.
  custom_tags = {}

  # Set to true to enable versioning. This means the bucket will retain all old
  # versions of all files. This is useful for backup purposes (e.g. you can
  # rollback to an older version), but it may mean your bucket uses more
  # storage.
  enable_versioning = true

  # The path to the error document in the S3 bucket (e.g. error.html).
  error_document = "error.html"

  # If set to true, this will force the delete of the access logs S3 bucket when
  # you run terraform destroy, even if there is still content in it. This is
  # only meant for testing and should not be used in production.
  force_destroy_access_logs_bucket = false

  # If set to true, this will force the delete of the redirect S3 bucket when
  # you run terraform destroy, even if there is still content in it. This is
  # only meant for testing and should not be used in production.
  force_destroy_redirect = false

  # If set to true, this will force the delete of the website S3 bucket when you
  # run terraform destroy, even if there is still content in it. This is only
  # meant for testing and should not be used in production.
  force_destroy_website = false

  # The ID of the Route 53 Hosted Zone in which to create the DNS A Record
  # specified in var.website_domain_name. Only used if var.create_route53_entry
  # is true.
  hosted_zone_id = null

  # The path to the index document in the S3 bucket (e.g. index.html).
  index_document = "index.html"

  # The lifecycle rules for this S3 bucket. These can be used to change storage
  # types or delete objects based on customizable rules. This should be a map,
  # where each key is a unique ID for the lifecycle rule, and each value is an
  # object that contains the parameters defined in the comment above.
  lifecycle_rules = {}

  # Whether the Route 53 Hosted Zone associated with var.base_domain_name is
  # private.
  private_zone = false

  # A string of the URL to redirect all requests to. Only used if
  # var.should_redirect_all_requests is true.
  redirect_all_requests_to = null

  # If set to true, the S3 bucket will only be accessible via CloudFront, and
  # not directly. You must specify var.cloudfront_origin_access_identity_iam_arn
  # if you set this variable to true.
  restrict_access_to_cloudfront = false

  # A map describing the routing_rule for the aws_s3_website_configuration
  # resource. Describes redirect behavior and conditions when redirects are
  # applied. Conflicts with redirect_all_requests_to and routing_rules. Use
  # routing_rules if rules contain empty String values.
  routing_rule = {}

  # A json string array containing routing rules for the
  # aws_s3_website_configuration resource. Describes redirect behavior and
  # conditions when redirects are applied. Conflicts with routing_rule and
  # redirect_all_requests_to. Use this when routing rules contain empty String
  # values.
  routing_rules = null

  # The S3 bucket object ownership. Valid values are BucketOwnerPreferred,
  # ObjectWriter or BucketOwnerEnforced.
  # https://docs.aws.amazon.com/AmazonS3/latest/userguide/about-object-ownership.html
  s3_bucket_object_ownership = "ObjectWriter"

  # By default, the s3 buckets are named after the domain name. Use this
  # configuration to override it with this value instead.
  s3_bucket_override_bucket_name = null

  # List of IAM policy documents, in stringified JSON format, that are merged
  # into the S3 bucket policy.
  s3_bucket_override_policy_documents = null

  # A configuration for server side encryption (SSE) on the S3 bucket. Defaults
  # to AES256. The list should contain the object structure defined in the
  # documentation
  # https://www.terraform.io/docs/providers/aws/r/s3_bucket.html#enable-default-server-side-encryption.
  # To opt out of encryption set the variable to an empty list [].
  server_side_encryption_configuration = [{"rule":[{"apply_server_side_encryption_by_default":[{"kms_master_key_id":"","sse_algorithm":"AES256"}]}]}]

  # If set to true, this implies that this S3 bucket is only for redirecting all
  # requests to another domain name specified in var.redirect_all_requests_to.
  # This is useful to setup a bucket to redirect, for example, foo.com to
  # www.foo.com. Conflicts with routing_rule.
  should_redirect_all_requests = false

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="website_domain_name" requirement="required" type="string">
<HclListItemDescription>

The name of the website and the S3 bucket to create (e.g. static.foo.com).

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="access_log_prefix" requirement="optional" type="string">
<HclListItemDescription>

The folder in the access logs bucket where logs should be written.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="access_logs_enable_versioning" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable versioning for the access logs S3 bucket. If enabled, instead of overriding objects, the S3 bucket will always create a new version of each object, so all the old values are retained.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="access_logs_expiration_time_in_days" requirement="optional" type="number">
<HclListItemDescription>

How many days to keep access logs around for before deleting them.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="access_logs_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

Optional KMS key to use for encrypting data in the access logs S3 bucket. If null, data in the access logs S3 bucket will be encrypted using the default aws/s3 key. If provided, the key policy of the provided key must allow whoever is writing to this bucket to use that key.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="access_logs_sse_algorithm" requirement="optional" type="string">
<HclListItemDescription>

The server-side encryption algorithm to use on data in the access logs S3 bucket. Valid values are AES256 and aws:kms.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;aws:kms&quot;"/>
</HclListItem>

<HclListItem name="add_random_id_name_suffix" requirement="optional" type="bool">
<HclListItemDescription>

Whether the bucket should have a random string appended to the name (by default a random string is not appended)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="base_domain_name" requirement="optional" type="string">
<HclListItemDescription>

The domain name associated with a hosted zone in Route 53. Usually the base domain name of one of the <a href="#website_domain_name"><code>website_domain_name</code></a> (e.g. foo.com). This is used to find the hosted zone that will be used for the CloudFront distribution.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="base_domain_name_tags" requirement="optional" type="map(any)">
<HclListItemDescription>

The tags associated with <a href="#base_domain_name"><code>base_domain_name</code></a>. If there are multiple hosted zones for the same base_domain_name, this will help filter the hosted zones so that the correct hosted zone is found.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="cloudfront_origin_access_identity_iam_arn" requirement="optional" type="string">
<HclListItemDescription>

The IAM ARN of the CloudFront origin access identity. Only used if <a href="#restrict_access_to_cloudfront"><code>restrict_access_to_cloudfront</code></a> is true. In older AWS accounts, you must use this in place of <a href="#cloudfront_origin_access_identity_s3_canonical_user_id"><code>cloudfront_origin_access_identity_s3_canonical_user_id</code></a>. Otherwise, you will end up with a perpetual diff on the IAM policy. See https://github.com/terraform-providers/terraform-provider-aws/issues/10158 for context.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudfront_origin_access_identity_s3_canonical_user_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the s3 Canonical User for Cloudfront Origin Identity. Only used if <a href="#restrict_access_to_cloudfront"><code>restrict_access_to_cloudfront</code></a> is true. See: https://docs.aws.amazon.com/AmazonS3/latest/dev/example-bucket-policies.html#example-bucket-policies-use-case-6. If you are getting a perpetual diff, set <a href="#cloudfront_origin_access_identity_iam_arn"><code>cloudfront_origin_access_identity_iam_arn</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cors_rule" requirement="optional" type="any">
<HclListItemDescription>

A configuration for CORS on the S3 bucket. Default value comes from AWS. Can override for custom CORS by passing the object structure define in the documentation https://www.terraform.io/docs/providers/aws/r/s3_bucket.html#using-cors.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="create_route53_entry" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, create a DNS A Record in Route 53 with the domain name in <a href="#website_domain_name"><code>website_domain_name</code></a>. If you're using CloudFront, you should configure the domain name in the CloudFront module and not in this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the S3 bucket. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="enable_versioning" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable versioning. This means the bucket will retain all old versions of all files. This is useful for backup purposes (e.g. you can rollback to an older version), but it may mean your bucket uses more storage.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="error_document" requirement="optional" type="string">
<HclListItemDescription>

The path to the error document in the S3 bucket (e.g. error.html).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;error.html&quot;"/>
</HclListItem>

<HclListItem name="force_destroy_access_logs_bucket" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, this will force the delete of the access logs S3 bucket when you run terraform destroy, even if there is still content in it. This is only meant for testing and should not be used in production.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="force_destroy_redirect" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, this will force the delete of the redirect S3 bucket when you run terraform destroy, even if there is still content in it. This is only meant for testing and should not be used in production.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="force_destroy_website" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, this will force the delete of the website S3 bucket when you run terraform destroy, even if there is still content in it. This is only meant for testing and should not be used in production.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="hosted_zone_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the Route 53 Hosted Zone in which to create the DNS A Record specified in <a href="#website_domain_name"><code>website_domain_name</code></a>. Only used if <a href="#create_route53_entry"><code>create_route53_entry</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="index_document" requirement="optional" type="string">
<HclListItemDescription>

The path to the index document in the S3 bucket (e.g. index.html).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;index.html&quot;"/>
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

<HclListItem name="private_zone" requirement="optional" type="bool">
<HclListItemDescription>

Whether the Route 53 Hosted Zone associated with <a href="#base_domain_name"><code>base_domain_name</code></a> is private.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="redirect_all_requests_to" requirement="optional" type="string">
<HclListItemDescription>

A string of the URL to redirect all requests to. Only used if <a href="#should_redirect_all_requests"><code>should_redirect_all_requests</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="restrict_access_to_cloudfront" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, the S3 bucket will only be accessible via CloudFront, and not directly. You must specify <a href="#cloudfront_origin_access_identity_iam_arn"><code>cloudfront_origin_access_identity_iam_arn</code></a> if you set this variable to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="routing_rule" requirement="optional" type="any">
<HclListItemDescription>

A map describing the routing_rule for the aws_s3_website_configuration resource. Describes redirect behavior and conditions when redirects are applied. Conflicts with redirect_all_requests_to and routing_rules. Use routing_rules if rules contain empty String values.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="routing_rules" requirement="optional" type="string">
<HclListItemDescription>

A json string array containing routing rules for the aws_s3_website_configuration resource. Describes redirect behavior and conditions when redirects are applied. Conflicts with routing_rule and redirect_all_requests_to. Use this when routing rules contain empty String values.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="s3_bucket_object_ownership" requirement="optional" type="string">
<HclListItemDescription>

The S3 bucket object ownership. Valid values are BucketOwnerPreferred, ObjectWriter or BucketOwnerEnforced. https://docs.aws.amazon.com/AmazonS3/latest/userguide/about-object-ownership.html

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ObjectWriter&quot;"/>
</HclListItem>

<HclListItem name="s3_bucket_override_bucket_name" requirement="optional" type="string">
<HclListItemDescription>

By default, the s3 buckets are named after the domain name. Use this configuration to override it with this value instead.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="s3_bucket_override_policy_documents" requirement="optional" type="list(string)">
<HclListItemDescription>

List of IAM policy documents, in stringified JSON format, that are merged into the S3 bucket policy.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="server_side_encryption_configuration" requirement="optional" type="list(any)">
<HclListItemDescription>

A configuration for server side encryption (SSE) on the S3 bucket. Defaults to AES256. The list should contain the object structure defined in the documentation https://www.terraform.io/docs/providers/aws/r/s3_bucket.html#enable-default-server-side-encryption. To opt out of encryption set the variable to an empty list [].

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
[
  {
    rule = [
      {
        apply_server_side_encryption_by_default = [
          {
            kms_master_key_id = "",
            sse_algorithm = "AES256"
          }
        ]
      }
    ]
  }
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="should_redirect_all_requests" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, this implies that this S3 bucket is only for redirecting all requests to another domain name specified in <a href="#redirect_all_requests_to"><code>redirect_all_requests_to</code></a>. This is useful to setup a bucket to redirect, for example, foo.com to www.foo.com. Conflicts with routing_rule.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="access_logs_bucket_arn">
</HclListItem>

<HclListItem name="redirect_bucket_is_fully_configured">
<HclListItemDescription>

A value that can be used to chain resources to depend on the redirect bucket being fully configured with all the configuration resources created. The value is always true, as the bucket would be fully configured when Terraform is able to render this.

</HclListItemDescription>
</HclListItem>

<HclListItem name="website_bucket_arn">
</HclListItem>

<HclListItem name="website_bucket_endpoint">
</HclListItem>

<HclListItem name="website_bucket_endpoint_path_style">
</HclListItem>

<HclListItem name="website_bucket_is_fully_configured">
<HclListItemDescription>

A value that can be used to chain resources to depend on the website bucket being fully configured with all the configuration resources created. The value is always true, as the bucket would be fully configured when Terraform is able to render this.

</HclListItemDescription>
</HclListItem>

<HclListItem name="website_bucket_name">
</HclListItem>

<HclListItem name="website_domain_name">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v1.0.0/modules/s3-static-website/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v1.0.0/modules/s3-static-website/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v1.0.0/modules/s3-static-website/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "0b684509a8ec90249d0b5a2550be0a0b"
}
##DOCS-SOURCER-END -->
