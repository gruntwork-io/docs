---
type: "service"
name: "Public Static Website"
description: "Deploy your static content and static websites on S3, using a CloudFront CDN. Supports bucket versioning, redirects, and access logging."
category: "static-website"
cloud: "aws"
tags: ["cloudfront","s3","website","static-website"]
license: "gruntwork"
built-with: "terraform"
title: "Public Static Website"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.104.14" lastModifiedVersion="0.101.0"/>

# Public Static Website

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/public-static-website" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=services%2Fpublic-static-website" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>

## Overview

This service creates a public static website using [S3](https://docs.aws.amazon.com/s3/index.html) and
[CloudFront](https://docs.aws.amazon.com/cloudfront/index.html) on [AWS](https://aws.amazon.com). The website can
contain static HTML, CSS, JS, and images.

![Static S3 Website](/img/reference/services/app-orchestration/s3-architecture.png)

## Features

*   Offload storage and serving of static content (HTML, CSS, JS, images) to a public S3 bucket configured as a website.
*   Create additional buckets to store your website access logs, and your CloudFront access logs.
*   Deploy a CloudFront Distribution in front of the public S3 bucket for your website domain.
*   Optionally:

    *   Create a Route 53 entry in IPV4 and IPV6 formats to route requests to your domain name to the public S3 bucket,
    *   And associate an existing TLS certificate issued by Amazon’s Certificate Manager (ACM) for your domain.

## Learn

Serving static content from S3 rather than from your own app server can significantly reduce the load on your server,
allowing it to focus on serving dynamic data. This saves money and makes your website run faster. For even bigger
improvements in performance, deploy a CloudFront Content Distribution Network (CDN) in front of the S3 bucket.

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

### Core concepts

This module deploys a public website, so the S3 bucket and objects with it are readable by the public. It also is
hosted in a Public Hosted Zone in Route 53. You may provide a `hosted_zone_id` in [variables](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/public-static-website/variables.tf),
or you may provide the `base_domain_name` associated with your Public Hosted Zone in Route 53, optionally along with
any tags that must match that zone in `base_domain_name_tags`. If you do the latter, this module will find the hosted
zone id for you.

For more info on why you would use S3 to store static content, why you may want a CDN in front of it, how to access the
website, and how to configure SSL, check out the documentation for the
[s3-static-website](https://github.com/gruntwork-io/terraform-aws-static-assets/tree/master/modules/s3-static-website)
and [s3-cloudfront](https://github.com/gruntwork-io/terraform-aws-static-assets/tree/master/modules/s3-cloudfront)
modules.

*   [Quick Start](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/public-static-website/core-concepts.md#quick-start)
*   [How to test the website](https://github.com/gruntwork-io/terraform-aws-static-assets/blob/master/modules/s3-static-website/core-concepts.md#how-to-test-the-website)
*   [How to configure HTTPS (SSL) or a CDN?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/public-static-website/core-concepts.md#how-to-configure-https-ssl-or-a-cdn)
*   [How to handle www + root domains](https://github.com/gruntwork-io/terraform-aws-static-assets/blob/master/modules/s3-static-website/core-concepts.md#how-do-i-handle-www—root-domains)
*   [How do I configure Cross Origin Resource Sharing (CORS)?](https://github.com/gruntwork-io/terraform-aws-static-assets/blob/master/modules/s3-static-website/core-concepts.md#how-do-i-configure-cross-origin-resource-sharing-cors)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.
*   [examples](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples): This folder contains working examples of how to use the submodules.
*   [test](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-learning-and-testing/services/public-static-website/example-website):
    The `examples/for-production` folder contains sample code optimized for direct usage in production. This is code from
    the [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.


## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S PUBLIC-STATIC-WEBSITE MODULE
# ------------------------------------------------------------------------------------------------------

module "public_static_website" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/public-static-website?ref=v0.104.14"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The domain name for which an ACM cert has been issued (e.g. *.foo.com). Only
  # used if var.create_route53_entry is true. Set to blank otherwise.
  acm_certificate_domain_name = <string>

  # The name of the website and the S3 bucket to create (e.g. static.foo.com).
  website_domain_name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The domain name associated with a hosted zone in Route 53. Usually the base
  # domain name of var.website_domain_name (e.g. foo.com). This is used to find
  # the hosted zone that will be used for the CloudFront distribution. If
  # var.create_route53_entry is true, one of var.base_domain_name or
  # var.hosted_zone_id must be provided.
  base_domain_name = null

  # The tags associated with var.base_domain_name. If there are multiple hosted
  # zones for the same var.base_domain_name, this will help filter the hosted
  # zones so that the correct hosted zone is found.
  base_domain_name_tags = {}

  # A configuration for CORS on the S3 bucket. Default value comes from AWS. Can
  # override for custom CORS by passing the object structure define in the
  # documentation
  # https://www.terraform.io/docs/providers/aws/r/s3_bucket.html#using-cors.
  cors_rule = []

  # If set to true, create a DNS A Record in Route 53. If
  # var.create_route53_entry is true, one of var.base_domain_name or
  # var.hosted_zone_id must be provided.
  create_route53_entry = true

  # A map of custom tags to apply to the S3 bucket containing the website and
  # the CloudFront distribution created for it. The key is the tag name and the
  # value is the tag value.
  custom_tags = {}

  # A list of existing CloudFront functions to associate with the default cached
  # behavior. CloudFront functions are lightweight alternatives to Lambda for
  # high-scale, latency sensitive CDN customizations.
  default_function_associations = []

  # A list of existing Lambda@Edge functions to associate with CloudFront.
  # Lambda version must be a published version and cannot be `$LATEST` (See
  # https://www.terraform.io/docs/providers/aws/r/cloudfront_distribution.html#lambda_function_association
  # for available options).
  default_lambda_associations = []

  # The default amount of time, in seconds, that an object is in a CloudFront
  # cache before CloudFront forwards another request in the absence of an
  # 'Cache-Control max-age' or 'Expires' header.
  default_ttl = 30

  # Option to disable cloudfront log delivery to s3. This is required in regions
  # where cloudfront cannot deliver logs to s3, see
  # https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html#access-logs-choosing-s3-bucket
  disable_cloudfront_logging = false

  # If set to true, a CloudFront function to implement default directory index
  # (looking up index.html in an S3 directory when path ends in /) is deployed.
  # Only relevant when var.restrict_bucket_access_to_cloudfront is set to true.
  enable_default_directory_index_function = false

  # Set to true to enable versioning. This means the bucket will retain all old
  # versions of all files. This is useful for backup purposes (e.g. you can
  # rollback to an older version), but it may mean your bucket uses more
  # storage.
  enable_versioning = true

  # The path to the error document in the S3 bucket (e.g. error.html).
  error_document = "error.html"

  # The error responses you want CloudFront to return to the viewer.
  error_responses = {"404":{"error_caching_min_ttl":0,"response_code":404,"response_page_path":"404.html"},"500":{"error_caching_min_ttl":0,"response_code":500,"response_page_path":"500.html"}}

  # If set to true, this will force the deletion of the website, redirect, and
  # access log S3 buckets when you run terraform destroy, even if there is still
  # content in those buckets. This is only meant for testing and should not be
  # used in production.
  force_destroy = false

  # The headers you want CloudFront to forward to the origin. Set to * to
  # forward all headers.
  forward_headers = []

  # The ISO 3166-1-alpha-2 codes for which you want CloudFront either to
  # distribute your content (if var.geo_restriction_type is whitelist) or not
  # distribute your content (if var.geo_restriction_type is blacklist).
  geo_locations_list = []

  # The method that you want to use to restrict distribution of your content by
  # country: none, whitelist, or blacklist.
  geo_restriction_type = "none"

  # The ID of the Route 53 Hosted Zone in which to create the DNS A Records
  # specified in var.website_domain_name. If var.create_route53_entry is true,
  # one of var.base_domain_name or var.hosted_zone_id must be provided.
  hosted_zone_id = null

  # The path to the index document in the S3 bucket (e.g. index.html).
  index_document = "index.html"

  # The maximum amount of time, in seconds, that an object is in a CloudFront
  # cache before CloudFront forwards another request to your origin to determine
  # whether the object has been updated. Only effective in the presence of
  # 'Cache-Control max-age', 'Cache-Control s-maxage', and 'Expires' headers.
  max_ttl = 60

  # The minimum amount of time that you want objects to stay in CloudFront
  # caches before CloudFront queries your origin to see whether the object has
  # been updated.
  min_ttl = 0

  # The minimum version of the SSL protocol that you want CloudFront to use for
  # HTTPS connections. Refer to
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_distribution#minimum_protocol_version
  # for possible values.
  minimum_protocol_version = "TLSv1"

  # If set to true, the S3 bucket will only be accessible via CloudFront, and
  # not directly. NOTE: this is only known to work if the S3 Bucket is in
  # us-east-1.
  restrict_bucket_access_to_cloudfront = false

  # A map describing the routing_rule for the aws_s3_website_configuration
  # resource. Describes redirect behavior and conditions when redirects are
  # applied. Conflicts with routing_rules. Use routing_rules if rules contain
  # empty String values.
  routing_rule = {}

  # A json string array containing routing rules for the
  # aws_s3_website_configuration resource. Describes redirect behavior and
  # conditions when redirects are applied. Conflicts with routing_rule. Use this
  # when routing rules contain empty String values.
  routing_rules = null

  # By default, the s3 bucket hosting the website is named after the domain
  # name. Use this configuration to override it with this value instead.
  s3_bucket_override_bucket_name = null

  # The policy directives and their values that CloudFront includes as values
  # for the Content-Security-Policy HTTP response header. When null, the header
  # is omitted.
  security_header_content_security_policy = "default-src 'self'; base-uri 'self'; block-all-mixed-content; font-src 'self' https: data:; form-action 'self'; frame-ancestors 'self'; img-src 'self' data:; object-src 'none'; script-src 'self'; script-src-attr 'none'; style-src 'self' https: 'unsafe-inline'; upgrade-insecure-requests"

  # Determines whether CloudFront includes the X-Content-Type-Options HTTP
  # response header with its value set to nosniff.
  security_header_enable_nosniff_content_type_options = true

  # Determines whether CloudFront includes the X-Frame-Options HTTP response
  # header and the header’s value. When null, the header is omitted.
  security_header_frame_option = "SAMEORIGIN"

  # Determines whether CloudFront includes the Strict-Transport-Security HTTP
  # response header and the header’s value. When null, the header is omitted.
  security_header_hsts = {"include_subdomains":true,"max_age":15552000,"preload":false}

  # Determines whether CloudFront includes the Referrer-Policy HTTP response
  # header and the header’s value. When null, the header is omitted.
  security_header_referrer_policy = "no-referrer"

  # Determine whether CloudFront includes the X-Xss-Protection HTTP response
  # header and the header’s value. When null, the header is omitted.
  security_header_xss_protection = {"mode_block":false,"protection":false,"report_uri":null}

  # In older AWS accounts, you must set this variable to true to use the ARN of
  # the CloudFront log delivery AWS account in the access log bucket policy. In
  # newer AWS accounts, you must set this variable to false to use the
  # CanonicalUser ID of the CloudFront log delivery account. If you pick the
  # wrong value, you'll get a perpetual diff on the IAM policy. See
  # https://github.com/terraform-providers/terraform-provider-aws/issues/10158
  # for context.
  use_cloudfront_arn_for_bucket_policy = false

  # Use this element to specify the protocol that users can use to access the
  # files in the origin specified by TargetOriginId when a request matches the
  # path pattern in PathPattern. One of allow-all, https-only, or
  # redirect-to-https.
  viewer_protocol_policy = "allow-all"

  # If you're using AWS WAF to filter CloudFront requests, the Id of the AWS WAF
  # web ACL that is associated with the distribution. Refer to
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_distribution#web_acl_id
  # for more details.
  web_acl_id = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S PUBLIC-STATIC-WEBSITE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/public-static-website?ref=v0.104.14"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The domain name for which an ACM cert has been issued (e.g. *.foo.com). Only
  # used if var.create_route53_entry is true. Set to blank otherwise.
  acm_certificate_domain_name = <string>

  # The name of the website and the S3 bucket to create (e.g. static.foo.com).
  website_domain_name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The domain name associated with a hosted zone in Route 53. Usually the base
  # domain name of var.website_domain_name (e.g. foo.com). This is used to find
  # the hosted zone that will be used for the CloudFront distribution. If
  # var.create_route53_entry is true, one of var.base_domain_name or
  # var.hosted_zone_id must be provided.
  base_domain_name = null

  # The tags associated with var.base_domain_name. If there are multiple hosted
  # zones for the same var.base_domain_name, this will help filter the hosted
  # zones so that the correct hosted zone is found.
  base_domain_name_tags = {}

  # A configuration for CORS on the S3 bucket. Default value comes from AWS. Can
  # override for custom CORS by passing the object structure define in the
  # documentation
  # https://www.terraform.io/docs/providers/aws/r/s3_bucket.html#using-cors.
  cors_rule = []

  # If set to true, create a DNS A Record in Route 53. If
  # var.create_route53_entry is true, one of var.base_domain_name or
  # var.hosted_zone_id must be provided.
  create_route53_entry = true

  # A map of custom tags to apply to the S3 bucket containing the website and
  # the CloudFront distribution created for it. The key is the tag name and the
  # value is the tag value.
  custom_tags = {}

  # A list of existing CloudFront functions to associate with the default cached
  # behavior. CloudFront functions are lightweight alternatives to Lambda for
  # high-scale, latency sensitive CDN customizations.
  default_function_associations = []

  # A list of existing Lambda@Edge functions to associate with CloudFront.
  # Lambda version must be a published version and cannot be `$LATEST` (See
  # https://www.terraform.io/docs/providers/aws/r/cloudfront_distribution.html#lambda_function_association
  # for available options).
  default_lambda_associations = []

  # The default amount of time, in seconds, that an object is in a CloudFront
  # cache before CloudFront forwards another request in the absence of an
  # 'Cache-Control max-age' or 'Expires' header.
  default_ttl = 30

  # Option to disable cloudfront log delivery to s3. This is required in regions
  # where cloudfront cannot deliver logs to s3, see
  # https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html#access-logs-choosing-s3-bucket
  disable_cloudfront_logging = false

  # If set to true, a CloudFront function to implement default directory index
  # (looking up index.html in an S3 directory when path ends in /) is deployed.
  # Only relevant when var.restrict_bucket_access_to_cloudfront is set to true.
  enable_default_directory_index_function = false

  # Set to true to enable versioning. This means the bucket will retain all old
  # versions of all files. This is useful for backup purposes (e.g. you can
  # rollback to an older version), but it may mean your bucket uses more
  # storage.
  enable_versioning = true

  # The path to the error document in the S3 bucket (e.g. error.html).
  error_document = "error.html"

  # The error responses you want CloudFront to return to the viewer.
  error_responses = {"404":{"error_caching_min_ttl":0,"response_code":404,"response_page_path":"404.html"},"500":{"error_caching_min_ttl":0,"response_code":500,"response_page_path":"500.html"}}

  # If set to true, this will force the deletion of the website, redirect, and
  # access log S3 buckets when you run terraform destroy, even if there is still
  # content in those buckets. This is only meant for testing and should not be
  # used in production.
  force_destroy = false

  # The headers you want CloudFront to forward to the origin. Set to * to
  # forward all headers.
  forward_headers = []

  # The ISO 3166-1-alpha-2 codes for which you want CloudFront either to
  # distribute your content (if var.geo_restriction_type is whitelist) or not
  # distribute your content (if var.geo_restriction_type is blacklist).
  geo_locations_list = []

  # The method that you want to use to restrict distribution of your content by
  # country: none, whitelist, or blacklist.
  geo_restriction_type = "none"

  # The ID of the Route 53 Hosted Zone in which to create the DNS A Records
  # specified in var.website_domain_name. If var.create_route53_entry is true,
  # one of var.base_domain_name or var.hosted_zone_id must be provided.
  hosted_zone_id = null

  # The path to the index document in the S3 bucket (e.g. index.html).
  index_document = "index.html"

  # The maximum amount of time, in seconds, that an object is in a CloudFront
  # cache before CloudFront forwards another request to your origin to determine
  # whether the object has been updated. Only effective in the presence of
  # 'Cache-Control max-age', 'Cache-Control s-maxage', and 'Expires' headers.
  max_ttl = 60

  # The minimum amount of time that you want objects to stay in CloudFront
  # caches before CloudFront queries your origin to see whether the object has
  # been updated.
  min_ttl = 0

  # The minimum version of the SSL protocol that you want CloudFront to use for
  # HTTPS connections. Refer to
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_distribution#minimum_protocol_version
  # for possible values.
  minimum_protocol_version = "TLSv1"

  # If set to true, the S3 bucket will only be accessible via CloudFront, and
  # not directly. NOTE: this is only known to work if the S3 Bucket is in
  # us-east-1.
  restrict_bucket_access_to_cloudfront = false

  # A map describing the routing_rule for the aws_s3_website_configuration
  # resource. Describes redirect behavior and conditions when redirects are
  # applied. Conflicts with routing_rules. Use routing_rules if rules contain
  # empty String values.
  routing_rule = {}

  # A json string array containing routing rules for the
  # aws_s3_website_configuration resource. Describes redirect behavior and
  # conditions when redirects are applied. Conflicts with routing_rule. Use this
  # when routing rules contain empty String values.
  routing_rules = null

  # By default, the s3 bucket hosting the website is named after the domain
  # name. Use this configuration to override it with this value instead.
  s3_bucket_override_bucket_name = null

  # The policy directives and their values that CloudFront includes as values
  # for the Content-Security-Policy HTTP response header. When null, the header
  # is omitted.
  security_header_content_security_policy = "default-src 'self'; base-uri 'self'; block-all-mixed-content; font-src 'self' https: data:; form-action 'self'; frame-ancestors 'self'; img-src 'self' data:; object-src 'none'; script-src 'self'; script-src-attr 'none'; style-src 'self' https: 'unsafe-inline'; upgrade-insecure-requests"

  # Determines whether CloudFront includes the X-Content-Type-Options HTTP
  # response header with its value set to nosniff.
  security_header_enable_nosniff_content_type_options = true

  # Determines whether CloudFront includes the X-Frame-Options HTTP response
  # header and the header’s value. When null, the header is omitted.
  security_header_frame_option = "SAMEORIGIN"

  # Determines whether CloudFront includes the Strict-Transport-Security HTTP
  # response header and the header’s value. When null, the header is omitted.
  security_header_hsts = {"include_subdomains":true,"max_age":15552000,"preload":false}

  # Determines whether CloudFront includes the Referrer-Policy HTTP response
  # header and the header’s value. When null, the header is omitted.
  security_header_referrer_policy = "no-referrer"

  # Determine whether CloudFront includes the X-Xss-Protection HTTP response
  # header and the header’s value. When null, the header is omitted.
  security_header_xss_protection = {"mode_block":false,"protection":false,"report_uri":null}

  # In older AWS accounts, you must set this variable to true to use the ARN of
  # the CloudFront log delivery AWS account in the access log bucket policy. In
  # newer AWS accounts, you must set this variable to false to use the
  # CanonicalUser ID of the CloudFront log delivery account. If you pick the
  # wrong value, you'll get a perpetual diff on the IAM policy. See
  # https://github.com/terraform-providers/terraform-provider-aws/issues/10158
  # for context.
  use_cloudfront_arn_for_bucket_policy = false

  # Use this element to specify the protocol that users can use to access the
  # files in the origin specified by TargetOriginId when a request matches the
  # path pattern in PathPattern. One of allow-all, https-only, or
  # redirect-to-https.
  viewer_protocol_policy = "allow-all"

  # If you're using AWS WAF to filter CloudFront requests, the Id of the AWS WAF
  # web ACL that is associated with the distribution. Refer to
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_distribution#web_acl_id
  # for more details.
  web_acl_id = null

}


```

</TabItem>
</Tabs>



## Reference


<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="acm_certificate_domain_name" requirement="required" type="string">
<HclListItemDescription>

The domain name for which an ACM cert has been issued (e.g. *.foo.com). Only used if <a href="#create_route53_entry"><code>create_route53_entry</code></a> is true. Set to blank otherwise.

</HclListItemDescription>
</HclListItem>

<HclListItem name="website_domain_name" requirement="required" type="string">
<HclListItemDescription>

The name of the website and the S3 bucket to create (e.g. static.foo.com).

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="base_domain_name" requirement="optional" type="string">
<HclListItemDescription>

The domain name associated with a hosted zone in Route 53. Usually the base domain name of <a href="#website_domain_name"><code>website_domain_name</code></a> (e.g. foo.com). This is used to find the hosted zone that will be used for the CloudFront distribution. If <a href="#create_route53_entry"><code>create_route53_entry</code></a> is true, one of <a href="#base_domain_name"><code>base_domain_name</code></a> or <a href="#hosted_zone_id"><code>hosted_zone_id</code></a> must be provided.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="base_domain_name_tags" requirement="optional" type="map(any)">
<HclListItemDescription>

The tags associated with <a href="#base_domain_name"><code>base_domain_name</code></a>. If there are multiple hosted zones for the same <a href="#base_domain_name"><code>base_domain_name</code></a>, this will help filter the hosted zones so that the correct hosted zone is found.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
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

If set to true, create a DNS A Record in Route 53. If <a href="#create_route53_entry"><code>create_route53_entry</code></a> is true, one of <a href="#base_domain_name"><code>base_domain_name</code></a> or <a href="#hosted_zone_id"><code>hosted_zone_id</code></a> must be provided.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the S3 bucket containing the website and the CloudFront distribution created for it. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="default_function_associations" requirement="optional" type="list(object(…))">
<HclListItemDescription>

A list of existing CloudFront functions to associate with the default cached behavior. CloudFront functions are lightweight alternatives to Lambda for high-scale, latency sensitive CDN customizations.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    event_type   = string
    function_arn = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="default_lambda_associations" requirement="optional" type="list(object(…))">
<HclListItemDescription>

A list of existing Lambda@Edge functions to associate with CloudFront. Lambda version must be a published version and cannot be `$LATEST` (See https://www.terraform.io/docs/providers/aws/r/cloudfront_distribution.html#lambda_function_association for available options).

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    event_type   = string
    lambda_arn   = string
    include_body = bool
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="default_ttl" requirement="optional" type="number">
<HclListItemDescription>

The default amount of time, in seconds, that an object is in a CloudFront cache before CloudFront forwards another request in the absence of an 'Cache-Control max-age' or 'Expires' header.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="disable_cloudfront_logging" requirement="optional" type="bool">
<HclListItemDescription>

Option to disable cloudfront log delivery to s3. This is required in regions where cloudfront cannot deliver logs to s3, see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html#access-logs-choosing-s3-bucket

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_default_directory_index_function" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, a CloudFront function to implement default directory index (looking up index.html in an S3 directory when path ends in /) is deployed. Only relevant when <a href="#restrict_bucket_access_to_cloudfront"><code>restrict_bucket_access_to_cloudfront</code></a> is set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
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

<HclListItem name="error_responses" requirement="optional" type="map(object(…))">
<HclListItemDescription>

The error responses you want CloudFront to return to the viewer.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    response_code         = number
    response_page_path    = string
    error_caching_min_ttl = number
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
{
  404 = {
    error_caching_min_ttl = 0,
    response_code = 404,
    response_page_path = "404.html"
  },
  500 = {
    error_caching_min_ttl = 0,
    response_code = 500,
    response_page_path = "500.html"
  }
}
```

</HclListItemDefaultValue>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = {
     404 = {
       response_code         = 404
       response_page_path    = "404.html"
       error_caching_min_ttl = 0
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="force_destroy" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, this will force the deletion of the website, redirect, and access log S3 buckets when you run terraform destroy, even if there is still content in those buckets. This is only meant for testing and should not be used in production.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="forward_headers" requirement="optional" type="list(string)">
<HclListItemDescription>

The headers you want CloudFront to forward to the origin. Set to * to forward all headers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="geo_locations_list" requirement="optional" type="list(string)">
<HclListItemDescription>

The ISO 3166-1-alpha-2 codes for which you want CloudFront either to distribute your content (if <a href="#geo_restriction_type"><code>geo_restriction_type</code></a> is whitelist) or not distribute your content (if <a href="#geo_restriction_type"><code>geo_restriction_type</code></a> is blacklist).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="geo_restriction_type" requirement="optional" type="string">
<HclListItemDescription>

The method that you want to use to restrict distribution of your content by country: none, whitelist, or blacklist.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;none&quot;"/>
</HclListItem>

<HclListItem name="hosted_zone_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the Route 53 Hosted Zone in which to create the DNS A Records specified in <a href="#website_domain_name"><code>website_domain_name</code></a>. If <a href="#create_route53_entry"><code>create_route53_entry</code></a> is true, one of <a href="#base_domain_name"><code>base_domain_name</code></a> or <a href="#hosted_zone_id"><code>hosted_zone_id</code></a> must be provided.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="index_document" requirement="optional" type="string">
<HclListItemDescription>

The path to the index document in the S3 bucket (e.g. index.html).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;index.html&quot;"/>
</HclListItem>

<HclListItem name="max_ttl" requirement="optional" type="number">
<HclListItemDescription>

The maximum amount of time, in seconds, that an object is in a CloudFront cache before CloudFront forwards another request to your origin to determine whether the object has been updated. Only effective in the presence of 'Cache-Control max-age', 'Cache-Control s-maxage', and 'Expires' headers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="min_ttl" requirement="optional" type="number">
<HclListItemDescription>

The minimum amount of time that you want objects to stay in CloudFront caches before CloudFront queries your origin to see whether the object has been updated.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="minimum_protocol_version" requirement="optional" type="string">
<HclListItemDescription>

The minimum version of the SSL protocol that you want CloudFront to use for HTTPS connections. Refer to https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_distribution#minimum_protocol_version for possible values.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;TLSv1&quot;"/>
</HclListItem>

<HclListItem name="restrict_bucket_access_to_cloudfront" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, the S3 bucket will only be accessible via CloudFront, and not directly. NOTE: this is only known to work if the S3 Bucket is in us-east-1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="routing_rule" requirement="optional" type="any">
<HclListItemDescription>

A map describing the routing_rule for the aws_s3_website_configuration resource. Describes redirect behavior and conditions when redirects are applied. Conflicts with routing_rules. Use routing_rules if rules contain empty String values.

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

A json string array containing routing rules for the aws_s3_website_configuration resource. Describes redirect behavior and conditions when redirects are applied. Conflicts with routing_rule. Use this when routing rules contain empty String values.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="s3_bucket_override_bucket_name" requirement="optional" type="string">
<HclListItemDescription>

By default, the s3 bucket hosting the website is named after the domain name. Use this configuration to override it with this value instead.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="security_header_content_security_policy" requirement="optional" type="string">
<HclListItemDescription>

The policy directives and their values that CloudFront includes as values for the Content-Security-Policy HTTP response header. When null, the header is omitted.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;default-src &apos;self&apos;; base-uri &apos;self&apos;; block-all-mixed-content; font-src &apos;self&apos; https: data:; form-action &apos;self&apos;; frame-ancestors &apos;self&apos;; img-src &apos;self&apos; data:; object-src &apos;none&apos;; script-src &apos;self&apos;; script-src-attr &apos;none&apos;; style-src &apos;self&apos; https: &apos;unsafe-inline&apos;; upgrade-insecure-requests&quot;"/>
</HclListItem>

<HclListItem name="security_header_enable_nosniff_content_type_options" requirement="optional" type="bool">
<HclListItemDescription>

Determines whether CloudFront includes the X-Content-Type-Options HTTP response header with its value set to nosniff.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="security_header_frame_option" requirement="optional" type="string">
<HclListItemDescription>

Determines whether CloudFront includes the X-Frame-Options HTTP response header and the header’s value. When null, the header is omitted.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;SAMEORIGIN&quot;"/>
</HclListItem>

<HclListItem name="security_header_hsts" requirement="optional" type="object(…)">
<HclListItemDescription>

Determines whether CloudFront includes the Strict-Transport-Security HTTP response header and the header’s value. When null, the header is omitted.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # The number of seconds browsers should remember to prefer HTTPS.
    max_age = number
    # Whether to include subdomains in the policy.
    include_subdomains = bool
    # Whether to add the HSTS policy to browsers.
    preload = bool
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
{
  include_subdomains = true,
  max_age = 15552000,
  preload = false
}
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="security_header_referrer_policy" requirement="optional" type="string">
<HclListItemDescription>

Determines whether CloudFront includes the Referrer-Policy HTTP response header and the header’s value. When null, the header is omitted.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;no-referrer&quot;"/>
</HclListItem>

<HclListItem name="security_header_xss_protection" requirement="optional" type="object(…)">
<HclListItemDescription>

Determine whether CloudFront includes the X-Xss-Protection HTTP response header and the header’s value. When null, the header is omitted.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # A Boolean value that determines whether CloudFront includes the mode=block directive in the X-XSS-Protection header.
    mode_block = bool
    # A Boolean value that determines the value of the X-Xss-Protection HTTP response header (true = 1, false = 0).
    protection = bool
    # A reporting URI, which CloudFront uses as the value of the report directive in the X-XSS-Protection header. You cannot specify a report_uri when mode_block is true.
    report_uri = string
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
{
  mode_block = false,
  protection = false,
  report_uri = null
}
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="use_cloudfront_arn_for_bucket_policy" requirement="optional" type="bool">
<HclListItemDescription>

In older AWS accounts, you must set this variable to true to use the ARN of the CloudFront log delivery AWS account in the access log bucket policy. In newer AWS accounts, you must set this variable to false to use the CanonicalUser ID of the CloudFront log delivery account. If you pick the wrong value, you'll get a perpetual diff on the IAM policy. See https://github.com/terraform-providers/terraform-provider-aws/issues/10158 for context.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="viewer_protocol_policy" requirement="optional" type="string">
<HclListItemDescription>

Use this element to specify the protocol that users can use to access the files in the origin specified by TargetOriginId when a request matches the path pattern in PathPattern. One of allow-all, https-only, or redirect-to-https.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;allow-all&quot;"/>
</HclListItem>

<HclListItem name="web_acl_id" requirement="optional" type="string">
<HclListItemDescription>

If you're using AWS WAF to filter CloudFront requests, the Id of the AWS WAF web ACL that is associated with the distribution. Refer to https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_distribution#web_acl_id for more details.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="cloudfront_access_logs_bucket_arn">
<HclListItemDescription>

The ARN of the created S3 bucket associated with the website's CloudFront access logs.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloudfront_domain_names">
<HclListItemDescription>

The domain names created for the CloudFront Distribution. Should be the same as the input <a href="#website_domain_name"><code>website_domain_name</code></a>.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloudfront_id">
<HclListItemDescription>

The CloudFront ID of the created CloudFront Distribution.

</HclListItemDescription>
</HclListItem>

<HclListItem name="website_access_logs_bucket_arn">
<HclListItemDescription>

The ARN of the created S3 bucket associated with the website access logs.

</HclListItemDescription>
</HclListItem>

<HclListItem name="website_s3_bucket_arn">
<HclListItemDescription>

The ARN of the created S3 bucket associated with the website.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/public-static-website/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/public-static-website/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/public-static-website/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "899b8b21ba263605523d0e65f43776e5"
}
##DOCS-SOURCER-END -->
