---
title: "S3 CloudFront Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Static Assets Modules" version="0.20.0" lastModifiedVersion="0.18.5"/>

# S3 CloudFront Module

<a href="https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v0.20.0/modules/s3-cloudfront" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.18.5" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module deploys a [CloudFront](https://aws.amazon.com/cloudfront/) distribution as a Content Distribution Network
(CDN) in front of an [S3 bucket](https://aws.amazon.com/s3/). This reduces latency for your users, by caching your
static content in servers around the world. It also allows you to use SSL with the static content in an S3 bucket.

See the [s3-static-website module](https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v0.20.0/modules/s3-static-website) for how to deploy static content in an S3 bucket.

## Quick Start

*   See the [cloudfront-s3-public](https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v0.20.0/examples/cloudfront-s3-public) and
    [cloudfront-s3-private](https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v0.20.0/examples/cloudfront-s3-private) examples for working sample code.
*   Check out [vars.tf](https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v0.20.0/modules/s3-cloudfront/vars.tf) for all parameters you can set for this module.

## Public vs private S3 buckets

This module can work with two types of S3 buckets:

*   **Public S3 bucket**: You can use this module to deploy CloudFront in front of an S3 bucket that has been configured
    as a [website](http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html). This configuration allows you to
    configure [custom routing
    rules](http://docs.aws.amazon.com/AmazonS3/latest/dev/HowDoIWebsiteConfiguration.html#configure-bucket-as-website-routing-rule-syntax),
    [custom error documents](http://docs.aws.amazon.com/AmazonS3/latest/dev/CustomErrorDocSupport.html) and other useful
    features for running a static website. The disadvantage is that you have to [make your S3 bucket publicly
    accessible](http://docs.aws.amazon.com/AmazonS3/latest/dev/HostingWebsiteOnS3Setup.html#step2-add-bucket-policy-make-content-public),
    which means users who know the URL could access the bucket directly, bypassing CloudFront. Despite this minor
    limitation, we recommend this option for most users, as it provides the best experience for running a website on S3.
    To use this option, set the `s3_bucket_is_public_website` parameter to `true` and set the `bucket_website_endpoint`
    parameter to the publicly-accessible endpoint for your S3 website.

*   **Private S3 bucket**: You can use this module to deploy CloudFront in front of a standard, private S3 bucket. The
    advantage of this is that users can only access the contents of the S3 bucket by going via CloudFront (they can't
    access the S3 bucket directly). The disadvantage is that you cannot use any of the S3 website features, such as
    routing rules and custom error pages. This option is recommended if you have to keep the contents of the S3 bucket
    secure (see also [Serving Private Content through
    CloudFront](http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html)). To use this
    option, set the `s3_bucket_is_public_website` parameter to `false` and make sure to configure the IAM permissions
    for your S3 bucket to allow access from the CloudFront distributions Origin Access Identity, which is accessible
    via the `cloudfront_origin_access_identity_iam_arn` output variable.

**NOTE**: For some reason, the Private S3 bucket option currently ONLY works in `us-east1`. In all other regions, you
get 403: Access Denied errors. We are still investigating why, but for the time being, deploy your entire static
website in `us-east-1` and things will work fine.

## How do I test my website?

This module outputs the domain name of your website using the `cloudfront_domain_name` output variable.

By default, the domain name will be of the form:

```
<ID>.cloudfront.net
```

Where `ID` is a unique ID generated for your CloudFront distribution. For example:

```
d111111abcdef8.cloudfront.net
```

If you set `var.create_route53_entry` to true, then this module will create a DNS A record in [Route
53](https://aws.amazon.com/route53/) for your CloudFront distribution with the domain name in
`var.domain_name`, and you will be able to use that custom domain name to access your bucket instead of the
`amazonaws.com` domain.

## How do I configure HTTPS (SSL)?

If you are using the default `.cloudfront.net` domain name, then you can use it with HTTPS with no extra changes:

```
https://<ID>.cloudfront.net
```

If you are using a custom domain name, to use HTTPS, you need to specify the ARN of either an [AWS Certificate Manager
(ACM)](https://aws.amazon.com/certificate-manager/) certificate via the `acm_certificate_arn` parameter or a
custom [certificate in IAM](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_server-certs.html) via the
`iam_certificate_id` parameter. We recommend using ACM certs as they are free, very quick to set up, and best of all,
AWS automatically renews them for you.

**NOTE**: If you set either `acm_certificate_arn` or `iam_certificate_id` you must set `use_cloudfront_default_certificate`
to `false`.

## Origin Group Support

This module can also create a CloudFront distribution that uses an Origin Group to serve content. The primary purpose of this is to have secondary bucket(s), which serve as a failover bucket in the event your primary bucket and/or its contents are not accessible.

### How To Configure

To use the Origin Group feature, you will need to provide values for the following variables:

*   failover_buckets
*   failover_bucket_website_endpoints (if making a public site)

## Limitations

To create a CloudFront distribution with Terraform, you use the [aws_cloudfront_distribution
resource](https://www.terraform.io/docs/providers/aws/r/cloudfront_distribution.html#viewer-certificate-arguments).
Unfortunately, this resource primarily consists of "inline blocks", which do not work well in Terraform modules, as
there is no way to create them dynamically based on the module's inputs.

As a results, the CloudFront distribution in this module is limited to a fixed set of settings that should work for
most use cases, but is not particularly flexible. In particular, the limitations are as follows:

*   Only one origin—an S3 bucket—is supported
    ([origin](https://www.terraform.io/docs/providers/aws/r/cloudfront_distribution.html#origin-arguments) is an inline
    block). You specify the bucket to use via the `bucket_name` parameter.

*   Only one set of geo restrictions is supported
    ([geo_restrictions](https://www.terraform.io/docs/providers/aws/r/cloudfront_distribution.html#restrictions-arguments)
    is an inline block). You can optionally specify the restrictions via the `geo_restriction_type` and
    `geo_locations_list` parameters.

*   Only one default cache behavior is supported
    ([cache behaviors](https://www.terraform.io/docs/providers/aws/r/cloudfront_distribution.html#cache-behavior-arguments)
    is an inline block). You can control the default cache settings using a number of parameters, including
    `cached_methods`, `default_ttl`, `min_ttl`, `max_ttl`, and many others (see [vars.tf](https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v0.20.0/modules/s3-cloudfront/vars.tf) for the full list).

*   Only two error responses are supported
    ([error responses](https://www.terraform.io/docs/providers/aws/r/cloudfront_distribution.html#custom-error-response-arguments)
    is an inline block). You can specify the 404 and 500 response paths using the `error_document_404` and
    `error_document_500` parameters, respectively.

*   You can not specify specify query string parameters to cache
    ([query_string_cache_keys](https://www.terraform.io/docs/providers/aws/r/cloudfront_distribution.html#query_string_cache_keys)
    is an inline block nested in an inline block).

*   [custom_header](https://www.terraform.io/docs/providers/aws/r/cloudfront_distribution.html#custom_header) is not
    yet supported as it consists of inline blocks in an inline block.

*   If configuring an Origin Group, due to an AWS limitation, only "GET", "HEAD", and "OPTIONS" methods are allowed for caching

If you absolutely need some of these features, the only solution available for now is to copy and paste this module
into your own codebase, using it as a guide, and adding the tweaks you need.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S S3-CLOUDFRONT MODULE
# ------------------------------------------------------------------------------------------------------

module "s_3_cloudfront" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-static-assets.git//modules/s3-cloudfront?ref=v0.20.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the S3 bucket.
  bucket_name = <string>

  # The default amount of time, in seconds, that an object is in a CloudFront
  # cache before CloudFront forwards another request in the absence of an
  # 'Cache-Control max-age' or 'Expires' header.
  default_ttl = <number>

  # The path that you want CloudFront to query on the origin server when an end
  # user requests the root URL (e.g. index.html).
  index_document = <string>

  # The maximum amount of time, in seconds, that an object is in a CloudFront
  # cache before CloudFront forwards another request to your origin to determine
  # whether the object has been updated. Only effective in the presence of
  # 'Cache-Control max-age', 'Cache-Control s-maxage', and 'Expires' headers.
  max_ttl = <number>

  # The minimum amount of time that you want objects to stay in CloudFront
  # caches before CloudFront queries your origin to see whether the object has
  # been updated.
  min_ttl = <number>

  # Set to true if your S3 bucket is configured as a website and publicly
  # accessible. Set to false if it's a regular S3 bucket and only privately
  # accessible to CloudFront. If it's a public website, you can use all the S3
  # website features (e.g. routing, error pages), but users can bypass
  # CloudFront and talk to S3 directly. If it's a private S3 bucket, users can
  # only reach it via CloudFront, but you don't get all the website features.
  s3_bucket_is_public_website = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The folder in the access logs bucket where logs should be written.
  access_log_prefix = null

  # The suffix for the access logs bucket where logs should be written.
  access_logs_bucket_suffix = "cloudfront-logs"

  # Set to true to enable versioning for the access logs S3 bucket. If enabled,
  # instead of overriding objects, the S3 bucket will always create a new
  # version of each object, so all the old values are retained.
  access_logs_enable_versioning = false

  # How many days to keep access logs around for before deleting them.
  access_logs_expiration_time_in_days = 30

  # The ARN of the AWS Certificate Manager certificate that you wish to use with
  # this distribution. The ACM certificate must be in us-east-1. You must set
  # exactly one of var.use_cloudfront_default_certificate,
  # var.acm_certificate_arn, or var.iam_certificate_id.
  acm_certificate_arn = ""

  # A Map with the bucket name as key and the additional information about
  # region and v4_auth as values.
  additional_bucket_information = {}

  # Controls which HTTP methods CloudFront will forward to the S3 bucket.
  allowed_methods = ["DELETE","GET","HEAD","OPTIONS","PATCH","POST","PUT"]

  # Controls which HTTP methods CloudFront will forward to Origin Group.
  # Currently only allows GET,HEAD, and OPTIONS
  allowed_origin_group_methods = ["GET","HEAD","OPTIONS"]

  # The domain name associated with a hosted zone in Route 53. Usually the base
  # domain name of one of the var.domain_names (e.g. foo.com). This is used to
  # find the hosted zone that will be used for the CloudFront distribution.
  base_domain_name = null

  # The tags associated with var.base_domain_name. If there are multiple hosted
  # zones for the same base_domain_name, this will help filter the hosted zones
  # so that the correct hosted zone is found.
  base_domain_name_tags = {}

  # The origin protocol policy to apply to the S3 bucket origin. Must be one of
  # http-only, https-only, and match-viewer.
  bucket_origin_config_protocol_policy = "http-only"

  # The SSL/TLS protocols that you want CloudFront to use when communicating
  # with the S3 bucket over HTTPS. A list of one or more of SSLv3, TLSv1,
  # TLSv1.1, and TLSv1.2.
  bucket_origin_config_ssl_protocols = ["TLSv1.2"]

  # Set a custom origin_id to be used. If not set, the default bucket_name will
  # be used. Defaults to null (not set).
  bucket_origin_id = null

  # Set a custom target_origin_id to be used. If not set, the default
  # bucket_name will be used. Defaults to null (not set).
  bucket_target_origin_id = null

  # The website endpoint for this S3 bucket. This value should be of the format
  # <BUCKET_NAME>.s3-website-<AWS_REGION>.amazonaws.com. Only used if
  # var.s3_bucket_is_public_website is true.
  bucket_website_endpoint = null

  # CloudFront will cache the responses for these methods.
  cached_methods = ["GET","HEAD"]

  # Whether you want CloudFront to automatically compress content for web
  # requests that include 'Accept-Encoding: gzip' in the request header.
  compress = true

  # If set to true, create a DNS A Record in Route 53 with each domain name in
  # var.domain_names.
  create_route53_entries = false

  # A map of custom tags to apply to the S3 bucket and Cloudfront Distribution.
  # The key is the tag name and the value is the tag value.
  custom_tags = {}

  # Unique identifier of the cache policy that is attached to the default cache
  # behavior. If this var is enabled, forwarded_values will not be set.
  default_cache_policy_id = null

  # A list of existing CloudFront functions to associate with the default cached
  # behavior. CloudFront functions are lightweight alternatives to Lambda for
  # high-scale, latency sensitive CDN customizations
  default_function_associations = []

  # A list of existing Lambda@Edge functions to associate with the default
  # cached behavior. Lambda version must be a published version and cannot be
  # `$LATEST` (See
  # https://www.terraform.io/docs/providers/aws/r/cloudfront_distribution.html#lambda_function_association
  # for available options).
  default_lambda_associations = []

  # Unique identifier of the origin request policy that is attached to the
  # behavior. This variable can be passed only if a default_cache_policy_id is
  # specified as well.
  default_origin_request_policy_id = null

  # Option to disable cloudfront log delivery to s3.  This is required in
  # regions where cloudfront cannot deliver logs to s3, see
  # https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html#access-logs-choosing-s3-bucket
  disable_logging = false

  # The custom domain name to use instead of the default cloudfront.net domain
  # name (e.g. static.foo.com). Only used if var.create_route53_entries is true.
  domain_names = []

  # Whether the distribution is enabled to accept end user requests for content.
  enabled = true

  # The error responses you want CloudFront to return to the viewer.
  error_responses = null

  # The name of an existing logging bucket to use instead of creating.
  existing_s3_log_bucket_name = null

  # The website endpoints for each failover S3 bucket. This value of each should
  # be of the format <BUCKET_NAME>.s3-website-<AWS_REGION>.amazonaws.com. Only
  # used if var.s3_bucket_is_public_website is true, and if you are providing a
  # failover S3 bucket to be used in a CloudFront Origin Group configuration.
  failover_bucket_website_endpoints = []

  # The list of the names of the failover S3 buckets. Provide if you wish to
  # configure a CloudFront distribution with an Origin Group.
  failover_buckets = []

  # List of HTTP status codes to configure the Origin Group to fail over on.
  # Provide if you wish to not failover on all provided 4xx and 5xx status
  # codes.
  failover_status_codes = [500,502,503,504,404,403]

  # If set to true, this will force the delete of the access logs S3 bucket when
  # you run terraform destroy, even if there is still content in it. This is
  # only meant for testing and should not be used in production.
  force_destroy_access_logs_bucket = false

  # Specifies whether you want CloudFront to forward cookies to the origin that
  # is associated with this cache behavior. You can specify all, none or
  # whitelist. If whitelist, you must define var.whitelisted_cookie_names.
  forward_cookies = "none"

  # The headers you want CloudFront to forward to the origin. Set to * to
  # forward all headers.
  forward_headers = []

  # Indicates whether you want CloudFront to forward query strings to the
  # origin. If set to true, CloudFront will cache all query string parameters.
  forward_query_string = true

  # The ISO 3166-1-alpha-2 codes for which you want CloudFront either to
  # distribute your content (if var.geo_restriction_type is whitelist) or not
  # distribute your content (if var.geo_restriction_type is blacklist).
  geo_locations_list = []

  # The method that you want to use to restrict distribution of your content by
  # country: none, whitelist, or blacklist.
  geo_restriction_type = "none"

  # The ID of the Route 53 Hosted Zone in which to create the DNS A Records
  # specified in var.domain_names. Only used if var.create_route53_entries is
  # true.
  hosted_zone_id = null

  # The maximum HTTP version to support on the distribution. Allowed values are
  # http1.1 and http2.
  http_version = "http2"

  # The IAM certificate identifier of the custom viewer certificate for this
  # distribution if you are using a custom domain. You must set exactly one of
  # var.use_cloudfront_default_certificate, var.acm_certificate_arn, or
  # var.iam_certificate_id.
  iam_certificate_id = ""

  # Specifies whether you want CloudFront to include cookies in access logs.
  include_cookies_in_logs = false

  # Whether the IPv6 is enabled for the distribution.
  is_ipv6_enabled = true

  # The minimum version of the SSL protocol that you want CloudFront to use for
  # HTTPS connections. One of SSLv3 or TLSv1. Default: SSLv3. NOTE: If you are
  # using a custom certificate (specified with acm_certificate_arn or
  # iam_certificate_id), and have specified sni-only in ssl_support_method,
  # TLSv1 must be specified.
  minimum_protocol_version = "TLSv1"

  # An ordered list of cache behaviors resource for this distribution. List from
  # top to bottom in order of precedence. The topmost cache behavior will have
  # precedence 0.
  ordered_cache_behaviors = []

  # The price class for this distribution. One of PriceClass_All,
  # PriceClass_200, PriceClass_100. Higher price classes support more edge
  # locations, but cost more. See:
  # https://aws.amazon.com/cloudfront/pricing/#price-classes.
  price_class = "PriceClass_100"

  # Whether the Route 53 Hosted Zone associated with var.base_domain_name is
  # private.
  private_zone = false

  # ID of response headers policy to apply to this CloudFront distribution.
  response_headers_policy_id = null

  # If set, CloudFront will request all content from the specified folder,
  # rather than the root of the S3 bucket.
  s3_bucket_base_path = null

  # Specifies how you want CloudFront to serve HTTPS requests. One of vip or
  # sni-only. Required if you specify acm_certificate_arn or iam_certificate_id.
  # NOTE: vip causes CloudFront to use a dedicated IP address and may incur
  # extra charges.
  ssl_support_method = "sni-only"

  # The list of key group IDs that CloudFront can use to validate signed URLs or
  # signed cookies. Only used if trusted_signers is empty.
  trusted_key_groups = []

  # The list of AWS account IDs that you want to allow to create signed URLs for
  # private content.
  trusted_signers = []

  # In older AWS accounts, you must set this variable to true to use the ARN of
  # the CloudFront log delivery AWS account in the access log bucket policy. In
  # newer AWS accounts, you must set this variable to false to use the
  # CanonicalUser ID of the CloudFront log delivery account. If you pick the
  # wrong value, you'll get a perpetual diff on the IAM policy. See
  # https://github.com/terraform-providers/terraform-provider-aws/issues/10158
  # for context.
  use_cloudfront_arn_for_bucket_policy = false

  # Set to true if you want viewers to use HTTPS to request your objects and
  # you're using the CloudFront domain name for your distribution. You must set
  # exactly one of var.use_cloudfront_default_certificate,
  # var.acm_certificate_arn, or var.iam_certificate_id.
  use_cloudfront_default_certificate = true

  # Enable the use of CloudFront OAC. Enabling the use of OAC will disable
  # Origin Access Identity (OAI)
  use_cloudfront_origin_access_control = false

  # Use this element to specify the protocol that users can use to access the
  # files in the origin specified by TargetOriginId when a request matches the
  # path pattern in PathPattern. One of allow-all, https-only, or
  # redirect-to-https.
  viewer_protocol_policy = "allow-all"

  # If enabled, the resource will wait for the distribution status to change
  # from InProgress to Deployed, which can take quite a long time in
  # Cloudfront's case. Setting this to false will skip the process.
  wait_for_deployment = true

  # If you're using AWS WAF to filter CloudFront requests, the Id of the AWS WAF
  # web ACL that is associated with the distribution.
  web_acl_id = null

  # If you have specified whitelist in var.forward_cookies, the whitelisted
  # cookies that you want CloudFront to forward to your origin.
  whitelisted_cookie_names = []

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S S3-CLOUDFRONT MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-static-assets.git//modules/s3-cloudfront?ref=v0.20.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the S3 bucket.
  bucket_name = <string>

  # The default amount of time, in seconds, that an object is in a CloudFront
  # cache before CloudFront forwards another request in the absence of an
  # 'Cache-Control max-age' or 'Expires' header.
  default_ttl = <number>

  # The path that you want CloudFront to query on the origin server when an end
  # user requests the root URL (e.g. index.html).
  index_document = <string>

  # The maximum amount of time, in seconds, that an object is in a CloudFront
  # cache before CloudFront forwards another request to your origin to determine
  # whether the object has been updated. Only effective in the presence of
  # 'Cache-Control max-age', 'Cache-Control s-maxage', and 'Expires' headers.
  max_ttl = <number>

  # The minimum amount of time that you want objects to stay in CloudFront
  # caches before CloudFront queries your origin to see whether the object has
  # been updated.
  min_ttl = <number>

  # Set to true if your S3 bucket is configured as a website and publicly
  # accessible. Set to false if it's a regular S3 bucket and only privately
  # accessible to CloudFront. If it's a public website, you can use all the S3
  # website features (e.g. routing, error pages), but users can bypass
  # CloudFront and talk to S3 directly. If it's a private S3 bucket, users can
  # only reach it via CloudFront, but you don't get all the website features.
  s3_bucket_is_public_website = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The folder in the access logs bucket where logs should be written.
  access_log_prefix = null

  # The suffix for the access logs bucket where logs should be written.
  access_logs_bucket_suffix = "cloudfront-logs"

  # Set to true to enable versioning for the access logs S3 bucket. If enabled,
  # instead of overriding objects, the S3 bucket will always create a new
  # version of each object, so all the old values are retained.
  access_logs_enable_versioning = false

  # How many days to keep access logs around for before deleting them.
  access_logs_expiration_time_in_days = 30

  # The ARN of the AWS Certificate Manager certificate that you wish to use with
  # this distribution. The ACM certificate must be in us-east-1. You must set
  # exactly one of var.use_cloudfront_default_certificate,
  # var.acm_certificate_arn, or var.iam_certificate_id.
  acm_certificate_arn = ""

  # A Map with the bucket name as key and the additional information about
  # region and v4_auth as values.
  additional_bucket_information = {}

  # Controls which HTTP methods CloudFront will forward to the S3 bucket.
  allowed_methods = ["DELETE","GET","HEAD","OPTIONS","PATCH","POST","PUT"]

  # Controls which HTTP methods CloudFront will forward to Origin Group.
  # Currently only allows GET,HEAD, and OPTIONS
  allowed_origin_group_methods = ["GET","HEAD","OPTIONS"]

  # The domain name associated with a hosted zone in Route 53. Usually the base
  # domain name of one of the var.domain_names (e.g. foo.com). This is used to
  # find the hosted zone that will be used for the CloudFront distribution.
  base_domain_name = null

  # The tags associated with var.base_domain_name. If there are multiple hosted
  # zones for the same base_domain_name, this will help filter the hosted zones
  # so that the correct hosted zone is found.
  base_domain_name_tags = {}

  # The origin protocol policy to apply to the S3 bucket origin. Must be one of
  # http-only, https-only, and match-viewer.
  bucket_origin_config_protocol_policy = "http-only"

  # The SSL/TLS protocols that you want CloudFront to use when communicating
  # with the S3 bucket over HTTPS. A list of one or more of SSLv3, TLSv1,
  # TLSv1.1, and TLSv1.2.
  bucket_origin_config_ssl_protocols = ["TLSv1.2"]

  # Set a custom origin_id to be used. If not set, the default bucket_name will
  # be used. Defaults to null (not set).
  bucket_origin_id = null

  # Set a custom target_origin_id to be used. If not set, the default
  # bucket_name will be used. Defaults to null (not set).
  bucket_target_origin_id = null

  # The website endpoint for this S3 bucket. This value should be of the format
  # <BUCKET_NAME>.s3-website-<AWS_REGION>.amazonaws.com. Only used if
  # var.s3_bucket_is_public_website is true.
  bucket_website_endpoint = null

  # CloudFront will cache the responses for these methods.
  cached_methods = ["GET","HEAD"]

  # Whether you want CloudFront to automatically compress content for web
  # requests that include 'Accept-Encoding: gzip' in the request header.
  compress = true

  # If set to true, create a DNS A Record in Route 53 with each domain name in
  # var.domain_names.
  create_route53_entries = false

  # A map of custom tags to apply to the S3 bucket and Cloudfront Distribution.
  # The key is the tag name and the value is the tag value.
  custom_tags = {}

  # Unique identifier of the cache policy that is attached to the default cache
  # behavior. If this var is enabled, forwarded_values will not be set.
  default_cache_policy_id = null

  # A list of existing CloudFront functions to associate with the default cached
  # behavior. CloudFront functions are lightweight alternatives to Lambda for
  # high-scale, latency sensitive CDN customizations
  default_function_associations = []

  # A list of existing Lambda@Edge functions to associate with the default
  # cached behavior. Lambda version must be a published version and cannot be
  # `$LATEST` (See
  # https://www.terraform.io/docs/providers/aws/r/cloudfront_distribution.html#lambda_function_association
  # for available options).
  default_lambda_associations = []

  # Unique identifier of the origin request policy that is attached to the
  # behavior. This variable can be passed only if a default_cache_policy_id is
  # specified as well.
  default_origin_request_policy_id = null

  # Option to disable cloudfront log delivery to s3.  This is required in
  # regions where cloudfront cannot deliver logs to s3, see
  # https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html#access-logs-choosing-s3-bucket
  disable_logging = false

  # The custom domain name to use instead of the default cloudfront.net domain
  # name (e.g. static.foo.com). Only used if var.create_route53_entries is true.
  domain_names = []

  # Whether the distribution is enabled to accept end user requests for content.
  enabled = true

  # The error responses you want CloudFront to return to the viewer.
  error_responses = null

  # The name of an existing logging bucket to use instead of creating.
  existing_s3_log_bucket_name = null

  # The website endpoints for each failover S3 bucket. This value of each should
  # be of the format <BUCKET_NAME>.s3-website-<AWS_REGION>.amazonaws.com. Only
  # used if var.s3_bucket_is_public_website is true, and if you are providing a
  # failover S3 bucket to be used in a CloudFront Origin Group configuration.
  failover_bucket_website_endpoints = []

  # The list of the names of the failover S3 buckets. Provide if you wish to
  # configure a CloudFront distribution with an Origin Group.
  failover_buckets = []

  # List of HTTP status codes to configure the Origin Group to fail over on.
  # Provide if you wish to not failover on all provided 4xx and 5xx status
  # codes.
  failover_status_codes = [500,502,503,504,404,403]

  # If set to true, this will force the delete of the access logs S3 bucket when
  # you run terraform destroy, even if there is still content in it. This is
  # only meant for testing and should not be used in production.
  force_destroy_access_logs_bucket = false

  # Specifies whether you want CloudFront to forward cookies to the origin that
  # is associated with this cache behavior. You can specify all, none or
  # whitelist. If whitelist, you must define var.whitelisted_cookie_names.
  forward_cookies = "none"

  # The headers you want CloudFront to forward to the origin. Set to * to
  # forward all headers.
  forward_headers = []

  # Indicates whether you want CloudFront to forward query strings to the
  # origin. If set to true, CloudFront will cache all query string parameters.
  forward_query_string = true

  # The ISO 3166-1-alpha-2 codes for which you want CloudFront either to
  # distribute your content (if var.geo_restriction_type is whitelist) or not
  # distribute your content (if var.geo_restriction_type is blacklist).
  geo_locations_list = []

  # The method that you want to use to restrict distribution of your content by
  # country: none, whitelist, or blacklist.
  geo_restriction_type = "none"

  # The ID of the Route 53 Hosted Zone in which to create the DNS A Records
  # specified in var.domain_names. Only used if var.create_route53_entries is
  # true.
  hosted_zone_id = null

  # The maximum HTTP version to support on the distribution. Allowed values are
  # http1.1 and http2.
  http_version = "http2"

  # The IAM certificate identifier of the custom viewer certificate for this
  # distribution if you are using a custom domain. You must set exactly one of
  # var.use_cloudfront_default_certificate, var.acm_certificate_arn, or
  # var.iam_certificate_id.
  iam_certificate_id = ""

  # Specifies whether you want CloudFront to include cookies in access logs.
  include_cookies_in_logs = false

  # Whether the IPv6 is enabled for the distribution.
  is_ipv6_enabled = true

  # The minimum version of the SSL protocol that you want CloudFront to use for
  # HTTPS connections. One of SSLv3 or TLSv1. Default: SSLv3. NOTE: If you are
  # using a custom certificate (specified with acm_certificate_arn or
  # iam_certificate_id), and have specified sni-only in ssl_support_method,
  # TLSv1 must be specified.
  minimum_protocol_version = "TLSv1"

  # An ordered list of cache behaviors resource for this distribution. List from
  # top to bottom in order of precedence. The topmost cache behavior will have
  # precedence 0.
  ordered_cache_behaviors = []

  # The price class for this distribution. One of PriceClass_All,
  # PriceClass_200, PriceClass_100. Higher price classes support more edge
  # locations, but cost more. See:
  # https://aws.amazon.com/cloudfront/pricing/#price-classes.
  price_class = "PriceClass_100"

  # Whether the Route 53 Hosted Zone associated with var.base_domain_name is
  # private.
  private_zone = false

  # ID of response headers policy to apply to this CloudFront distribution.
  response_headers_policy_id = null

  # If set, CloudFront will request all content from the specified folder,
  # rather than the root of the S3 bucket.
  s3_bucket_base_path = null

  # Specifies how you want CloudFront to serve HTTPS requests. One of vip or
  # sni-only. Required if you specify acm_certificate_arn or iam_certificate_id.
  # NOTE: vip causes CloudFront to use a dedicated IP address and may incur
  # extra charges.
  ssl_support_method = "sni-only"

  # The list of key group IDs that CloudFront can use to validate signed URLs or
  # signed cookies. Only used if trusted_signers is empty.
  trusted_key_groups = []

  # The list of AWS account IDs that you want to allow to create signed URLs for
  # private content.
  trusted_signers = []

  # In older AWS accounts, you must set this variable to true to use the ARN of
  # the CloudFront log delivery AWS account in the access log bucket policy. In
  # newer AWS accounts, you must set this variable to false to use the
  # CanonicalUser ID of the CloudFront log delivery account. If you pick the
  # wrong value, you'll get a perpetual diff on the IAM policy. See
  # https://github.com/terraform-providers/terraform-provider-aws/issues/10158
  # for context.
  use_cloudfront_arn_for_bucket_policy = false

  # Set to true if you want viewers to use HTTPS to request your objects and
  # you're using the CloudFront domain name for your distribution. You must set
  # exactly one of var.use_cloudfront_default_certificate,
  # var.acm_certificate_arn, or var.iam_certificate_id.
  use_cloudfront_default_certificate = true

  # Enable the use of CloudFront OAC. Enabling the use of OAC will disable
  # Origin Access Identity (OAI)
  use_cloudfront_origin_access_control = false

  # Use this element to specify the protocol that users can use to access the
  # files in the origin specified by TargetOriginId when a request matches the
  # path pattern in PathPattern. One of allow-all, https-only, or
  # redirect-to-https.
  viewer_protocol_policy = "allow-all"

  # If enabled, the resource will wait for the distribution status to change
  # from InProgress to Deployed, which can take quite a long time in
  # Cloudfront's case. Setting this to false will skip the process.
  wait_for_deployment = true

  # If you're using AWS WAF to filter CloudFront requests, the Id of the AWS WAF
  # web ACL that is associated with the distribution.
  web_acl_id = null

  # If you have specified whitelist in var.forward_cookies, the whitelisted
  # cookies that you want CloudFront to forward to your origin.
  whitelisted_cookie_names = []

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="bucket_name" requirement="required" type="string">
<HclListItemDescription>

The name of the S3 bucket.

</HclListItemDescription>
</HclListItem>

<HclListItem name="default_ttl" requirement="required" type="number">
<HclListItemDescription>

The default amount of time, in seconds, that an object is in a CloudFront cache before CloudFront forwards another request in the absence of an 'Cache-Control max-age' or 'Expires' header.

</HclListItemDescription>
</HclListItem>

<HclListItem name="index_document" requirement="required" type="string">
<HclListItemDescription>

The path that you want CloudFront to query on the origin server when an end user requests the root URL (e.g. index.html).

</HclListItemDescription>
</HclListItem>

<HclListItem name="max_ttl" requirement="required" type="number">
<HclListItemDescription>

The maximum amount of time, in seconds, that an object is in a CloudFront cache before CloudFront forwards another request to your origin to determine whether the object has been updated. Only effective in the presence of 'Cache-Control max-age', 'Cache-Control s-maxage', and 'Expires' headers.

</HclListItemDescription>
</HclListItem>

<HclListItem name="min_ttl" requirement="required" type="number">
<HclListItemDescription>

The minimum amount of time that you want objects to stay in CloudFront caches before CloudFront queries your origin to see whether the object has been updated.

</HclListItemDescription>
</HclListItem>

<HclListItem name="s3_bucket_is_public_website" requirement="required" type="string">
<HclListItemDescription>

Set to true if your S3 bucket is configured as a website and publicly accessible. Set to false if it's a regular S3 bucket and only privately accessible to CloudFront. If it's a public website, you can use all the S3 website features (e.g. routing, error pages), but users can bypass CloudFront and talk to S3 directly. If it's a private S3 bucket, users can only reach it via CloudFront, but you don't get all the website features.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="access_log_prefix" requirement="optional" type="string">
<HclListItemDescription>

The folder in the access logs bucket where logs should be written.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="access_logs_bucket_suffix" requirement="optional" type="string">
<HclListItemDescription>

The suffix for the access logs bucket where logs should be written.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;cloudfront-logs&quot;"/>
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

<HclListItem name="acm_certificate_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the AWS Certificate Manager certificate that you wish to use with this distribution. The ACM certificate must be in us-east-1. You must set exactly one of <a href="#use_cloudfront_default_certificate"><code>use_cloudfront_default_certificate</code></a>, <a href="#acm_certificate_arn"><code>acm_certificate_arn</code></a>, or <a href="#iam_certificate_id"><code>iam_certificate_id</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="additional_bucket_information" requirement="optional" type="map(object(…))">
<HclListItemDescription>

A Map with the bucket name as key and the additional information about region and v4_auth as values.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    region  = string
    v4_auth = bool
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   {
     bucket-name = {
       region  = "eu-central-1"
       v4_auth = true
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="allowed_methods" requirement="optional" type="list(string)">
<HclListItemDescription>

Controls which HTTP methods CloudFront will forward to the S3 bucket.

</HclListItemDescription>
<HclListItemDefaultValue>

```hcl
[
  "DELETE",
  "GET",
  "HEAD",
  "OPTIONS",
  "PATCH",
  "POST",
  "PUT"
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="allowed_origin_group_methods" requirement="optional" type="list(string)">
<HclListItemDescription>

Controls which HTTP methods CloudFront will forward to Origin Group. Currently only allows GET,HEAD, and OPTIONS

</HclListItemDescription>
<HclListItemDefaultValue>

```hcl
[
  "GET",
  "HEAD",
  "OPTIONS"
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="base_domain_name" requirement="optional" type="string">
<HclListItemDescription>

The domain name associated with a hosted zone in Route 53. Usually the base domain name of one of the <a href="#domain_names"><code>domain_names</code></a> (e.g. foo.com). This is used to find the hosted zone that will be used for the CloudFront distribution.

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

<HclListItem name="bucket_origin_config_protocol_policy" requirement="optional" type="string">
<HclListItemDescription>

The origin protocol policy to apply to the S3 bucket origin. Must be one of http-only, https-only, and match-viewer.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;http-only&quot;"/>
</HclListItem>

<HclListItem name="bucket_origin_config_ssl_protocols" requirement="optional" type="list(string)">
<HclListItemDescription>

The SSL/TLS protocols that you want CloudFront to use when communicating with the S3 bucket over HTTPS. A list of one or more of SSLv3, TLSv1, TLSv1.1, and TLSv1.2.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[
  &quot;TLSv1.2&quot;
]"/>
</HclListItem>

<HclListItem name="bucket_origin_id" requirement="optional" type="string">
<HclListItemDescription>

Set a custom origin_id to be used. If not set, the default bucket_name will be used. Defaults to null (not set).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="bucket_target_origin_id" requirement="optional" type="string">
<HclListItemDescription>

Set a custom target_origin_id to be used. If not set, the default bucket_name will be used. Defaults to null (not set).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="bucket_website_endpoint" requirement="optional" type="string">
<HclListItemDescription>

The website endpoint for this S3 bucket. This value should be of the format &lt;BUCKET_NAME>.s3-website-&lt;AWS_REGION>.amazonaws.com. Only used if <a href="#s3_bucket_is_public_website"><code>s3_bucket_is_public_website</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cached_methods" requirement="optional" type="list(string)">
<HclListItemDescription>

CloudFront will cache the responses for these methods.

</HclListItemDescription>
<HclListItemDefaultValue>

```hcl
[
  "GET",
  "HEAD"
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="compress" requirement="optional" type="bool">
<HclListItemDescription>

Whether you want CloudFront to automatically compress content for web requests that include 'Accept-Encoding: gzip' in the request header.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_route53_entries" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, create a DNS A Record in Route 53 with each domain name in <a href="#domain_names"><code>domain_names</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the S3 bucket and Cloudfront Distribution. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="default_cache_policy_id" requirement="optional" type="string">
<HclListItemDescription>

Unique identifier of the cache policy that is attached to the default cache behavior. If this var is enabled, forwarded_values will not be set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="default_function_associations" requirement="optional" type="list(object(…))">
<HclListItemDescription>

A list of existing CloudFront functions to associate with the default cached behavior. CloudFront functions are lightweight alternatives to Lambda for high-scale, latency sensitive CDN customizations

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

A list of existing Lambda@Edge functions to associate with the default cached behavior. Lambda version must be a published version and cannot be `$LATEST` (See https://www.terraform.io/docs/providers/aws/r/cloudfront_distribution.html#lambda_function_association for available options).

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

<HclListItem name="default_origin_request_policy_id" requirement="optional" type="string">
<HclListItemDescription>

Unique identifier of the origin request policy that is attached to the behavior. This variable can be passed only if a default_cache_policy_id is specified as well.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="disable_logging" requirement="optional" type="bool">
<HclListItemDescription>

Option to disable cloudfront log delivery to s3.  This is required in regions where cloudfront cannot deliver logs to s3, see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html#access-logs-choosing-s3-bucket

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="domain_names" requirement="optional" type="list(string)">
<HclListItemDescription>

The custom domain name to use instead of the default cloudfront.net domain name (e.g. static.foo.com). Only used if <a href="#create_route53_entries"><code>create_route53_entries</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether the distribution is enabled to accept end user requests for content.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="error_responses" requirement="optional" type="map">
<HclListItemDescription>

The error responses you want CloudFront to return to the viewer.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="existing_s3_log_bucket_name" requirement="optional" type="string">
<HclListItemDescription>

The name of an existing logging bucket to use instead of creating.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="failover_bucket_website_endpoints" requirement="optional" type="list(string)">
<HclListItemDescription>

The website endpoints for each failover S3 bucket. This value of each should be of the format &lt;BUCKET_NAME>.s3-website-&lt;AWS_REGION>.amazonaws.com. Only used if <a href="#s3_bucket_is_public_website"><code>s3_bucket_is_public_website</code></a> is true, and if you are providing a failover S3 bucket to be used in a CloudFront Origin Group configuration.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="failover_buckets" requirement="optional" type="list(string)">
<HclListItemDescription>

The list of the names of the failover S3 buckets. Provide if you wish to configure a CloudFront distribution with an Origin Group.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="failover_status_codes" requirement="optional" type="list(number)">
<HclListItemDescription>

List of HTTP status codes to configure the Origin Group to fail over on. Provide if you wish to not failover on all provided 4xx and 5xx status codes.

</HclListItemDescription>
<HclListItemDefaultValue>

```hcl
[
  500,
  502,
  503,
  504,
  404,
  403
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="force_destroy_access_logs_bucket" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, this will force the delete of the access logs S3 bucket when you run terraform destroy, even if there is still content in it. This is only meant for testing and should not be used in production.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="forward_cookies" requirement="optional" type="string">
<HclListItemDescription>

Specifies whether you want CloudFront to forward cookies to the origin that is associated with this cache behavior. You can specify all, none or whitelist. If whitelist, you must define <a href="#whitelisted_cookie_names"><code>whitelisted_cookie_names</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;none&quot;"/>
</HclListItem>

<HclListItem name="forward_headers" requirement="optional" type="list(string)">
<HclListItemDescription>

The headers you want CloudFront to forward to the origin. Set to * to forward all headers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="forward_query_string" requirement="optional" type="bool">
<HclListItemDescription>

Indicates whether you want CloudFront to forward query strings to the origin. If set to true, CloudFront will cache all query string parameters.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
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

The ID of the Route 53 Hosted Zone in which to create the DNS A Records specified in <a href="#domain_names"><code>domain_names</code></a>. Only used if <a href="#create_route53_entries"><code>create_route53_entries</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="http_version" requirement="optional" type="string">
<HclListItemDescription>

The maximum HTTP version to support on the distribution. Allowed values are http1.1 and http2.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;http2&quot;"/>
</HclListItem>

<HclListItem name="iam_certificate_id" requirement="optional" type="string">
<HclListItemDescription>

The IAM certificate identifier of the custom viewer certificate for this distribution if you are using a custom domain. You must set exactly one of <a href="#use_cloudfront_default_certificate"><code>use_cloudfront_default_certificate</code></a>, <a href="#acm_certificate_arn"><code>acm_certificate_arn</code></a>, or <a href="#iam_certificate_id"><code>iam_certificate_id</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="include_cookies_in_logs" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether you want CloudFront to include cookies in access logs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="is_ipv6_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether the IPv6 is enabled for the distribution.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="minimum_protocol_version" requirement="optional" type="string">
<HclListItemDescription>

The minimum version of the SSL protocol that you want CloudFront to use for HTTPS connections. One of SSLv3 or TLSv1. Default: SSLv3. NOTE: If you are using a custom certificate (specified with acm_certificate_arn or iam_certificate_id), and have specified sni-only in ssl_support_method, TLSv1 must be specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;TLSv1&quot;"/>
</HclListItem>

<HclListItem name="ordered_cache_behaviors" requirement="optional" type="list(any)">
<HclListItemDescription>

An ordered list of cache behaviors resource for this distribution. List from top to bottom in order of precedence. The topmost cache behavior will have precedence 0.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="price_class" requirement="optional" type="string">
<HclListItemDescription>

The price class for this distribution. One of PriceClass_All, PriceClass_200, PriceClass_100. Higher price classes support more edge locations, but cost more. See: https://aws.amazon.com/cloudfront/pricing/#price-classes.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;PriceClass_100&quot;"/>
</HclListItem>

<HclListItem name="private_zone" requirement="optional" type="bool">
<HclListItemDescription>

Whether the Route 53 Hosted Zone associated with <a href="#base_domain_name"><code>base_domain_name</code></a> is private.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="response_headers_policy_id" requirement="optional" type="string">
<HclListItemDescription>

ID of response headers policy to apply to this CloudFront distribution.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="s3_bucket_base_path" requirement="optional" type="string">
<HclListItemDescription>

If set, CloudFront will request all content from the specified folder, rather than the root of the S3 bucket.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ssl_support_method" requirement="optional" type="string">
<HclListItemDescription>

Specifies how you want CloudFront to serve HTTPS requests. One of vip or sni-only. Required if you specify acm_certificate_arn or iam_certificate_id. NOTE: vip causes CloudFront to use a dedicated IP address and may incur extra charges.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;sni-only&quot;"/>
</HclListItem>

<HclListItem name="trusted_key_groups" requirement="optional" type="list(string)">
<HclListItemDescription>

The list of key group IDs that CloudFront can use to validate signed URLs or signed cookies. Only used if trusted_signers is empty.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="trusted_signers" requirement="optional" type="list(string)">
<HclListItemDescription>

The list of AWS account IDs that you want to allow to create signed URLs for private content.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="use_cloudfront_arn_for_bucket_policy" requirement="optional" type="bool">
<HclListItemDescription>

In older AWS accounts, you must set this variable to true to use the ARN of the CloudFront log delivery AWS account in the access log bucket policy. In newer AWS accounts, you must set this variable to false to use the CanonicalUser ID of the CloudFront log delivery account. If you pick the wrong value, you'll get a perpetual diff on the IAM policy. See https://github.com/terraform-providers/terraform-provider-aws/issues/10158 for context.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="use_cloudfront_default_certificate" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want viewers to use HTTPS to request your objects and you're using the CloudFront domain name for your distribution. You must set exactly one of <a href="#use_cloudfront_default_certificate"><code>use_cloudfront_default_certificate</code></a>, <a href="#acm_certificate_arn"><code>acm_certificate_arn</code></a>, or <a href="#iam_certificate_id"><code>iam_certificate_id</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="use_cloudfront_origin_access_control" requirement="optional" type="bool">
<HclListItemDescription>

Enable the use of CloudFront OAC. Enabling the use of OAC will disable Origin Access Identity (OAI)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="viewer_protocol_policy" requirement="optional" type="string">
<HclListItemDescription>

Use this element to specify the protocol that users can use to access the files in the origin specified by TargetOriginId when a request matches the path pattern in PathPattern. One of allow-all, https-only, or redirect-to-https.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;allow-all&quot;"/>
</HclListItem>

<HclListItem name="wait_for_deployment" requirement="optional" type="bool">
<HclListItemDescription>

If enabled, the resource will wait for the distribution status to change from InProgress to Deployed, which can take quite a long time in Cloudfront's case. Setting this to false will skip the process.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="web_acl_id" requirement="optional" type="string">
<HclListItemDescription>

If you're using AWS WAF to filter CloudFront requests, the Id of the AWS WAF web ACL that is associated with the distribution.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="whitelisted_cookie_names" requirement="optional" type="list(string)">
<HclListItemDescription>

If you have specified whitelist in <a href="#forward_cookies"><code>forward_cookies</code></a>, the whitelisted cookies that you want CloudFront to forward to your origin.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="access_logs_bucket_arn">
</HclListItem>

<HclListItem name="cloudfront_distribution_arn">
</HclListItem>

<HclListItem name="cloudfront_distribution_domain_name">
</HclListItem>

<HclListItem name="cloudfront_domain_names">
</HclListItem>

<HclListItem name="cloudfront_id">
</HclListItem>

<HclListItem name="cloudfront_origin_access_control_id">
</HclListItem>

<HclListItem name="cloudfront_origin_access_identity_iam_arn">
</HclListItem>

<HclListItem name="cloudfront_origin_access_identity_s3_canonical_user_id">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v0.20.0/modules/s3-cloudfront/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v0.20.0/modules/s3-cloudfront/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v0.20.0/modules/s3-cloudfront/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "69275bd4b88de58dd5e807fb0763abe9"
}
##DOCS-SOURCER-END -->
