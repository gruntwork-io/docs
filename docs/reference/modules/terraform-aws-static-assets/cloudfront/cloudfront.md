---
title: "CloudFront Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Static Assets Modules" version="0.19.1" lastModifiedVersion="0.19.0"/>

# CloudFront Module

<a href="https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v0.19.1/modules/cloudfront" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.19.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module deploys an [AWS CloudFront](https://aws.amazon.com/cloudfront/) distribution to serve content from S3 or custom origins. CloudFront is a Content Delivery Network (CDN) that caches your content at edge locations around the world to reduce latency and improve performance for your users.

## Quick Start

*   See the [cloudfront-custom-origin](https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v0.19.1/examples/cloudfront-custom-origin) example for working sample code.
*   Check out [vars.tf](https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v0.19.1/modules/cloudfront/vars.tf) for all parameters you can set for this module.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CLOUDFRONT MODULE
# ------------------------------------------------------------------------------------------------------

module "cloudfront" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-static-assets.git//modules/cloudfront?ref=v0.19.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Default cache behavior for this distribution (maximum one). See variable
  # definition for details.
  default_cache_behavior = <object(
    target_origin_id = string
    allowed_methods = optional(list(string), ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"])
    cached_methods = optional(list(string), ["GET", "HEAD"])
    viewer_protocol_policy = optional(string, "redirect-to-https")
    compress = optional(bool)
    default_ttl = optional(number)
    max_ttl = optional(number)
    min_ttl = optional(number)
    smooth_streaming = optional(bool)
    trusted_key_groups = optional(list(string))
    trusted_signers = optional(list(string))
    cache_policy = optional(object(
      min_ttl = number
      max_ttl = optional(number)
      default_ttl = optional(number)
      parameters_in_cache_key_and_forwarded_to_origin = optional(object(
        enable_accept_encoding_brotli = optional(bool)
        enable_accept_encoding_gzip   = optional(bool)
        cookies_config = object(
          cookie_behavior = string
          cookies = optional(list(string))
        )
        headers_config = object(
          header_behavior = string
          headers = optional(list(string))
        )
        query_strings_config = object(
          query_string_behavior = string
          query_strings = optional(list(string))
        )
      ))
    ))
    existing_cache_policy_id = optional(string)
    field_level_encryption = optional(object(
      content_type_profile_config = object(
        forward_when_content_type_is_unknown = bool
      )
      query_arg_profile_config = object(
        forward_when_query_arg_profile_is_unknown = bool
      )
    ))
    origin_request_policy = optional(object(
      cookies_config = object(
        cookie_behavior = string
        cookies = optional(list(string))
      )
      headers_config = object(
        header_behavior = string
        headers = optional(list(string))
      )
      query_strings_config = object(
        query_string_behavior = string
        query_strings = optional(list(string))
      )
    ))
    existing_origin_request_policy_id = optional(string)
    realtime_log_config = optional(object(
      sampling_rate = number
      fields = list(string)
      kinesis_stream_arn = string
    ))
    response_headers_policy = optional(object(
      cors_config = optional(object(
        access_control_allow_credentials = bool
        origin_override = bool
        access_control_allow_headers = list(string)
        access_control_allow_methods = list(string)
        access_control_allow_origins = list(string)
        access_control_expose_headers = optional(list(string))
        access_control_max_age_sec = optional(number)
      ))
      custom_headers_config = optional(object(
        header = string
        override = bool
        value = string
      ))
      remove_headers_config = optional(object(
        header = string
      ))
      security_headers_config = optional(object(
        content_security_policy = optional(object(
          content_security_policy = string
          override = bool
        ))
        content_type_options = optional(object(
          override = bool
        ))
        frame_options = optional(object(
          frame_option = string
          override = bool
        ))
        referrer_policy = optional(object(
          referrer_policy = string
          override = bool
        ))
        strict_transport_security = optional(object(
          access_control_max_age_sec = string
          override = bool
          include_subdomains = optional(bool)
          preload = optional(string)
        ))
        xss_protection = optional(object(
          protection = bool
          override = bool
          mode_block = optional(bool)
          report_uri = optional(string)
        ))
      ))
      server_timing_headers_config = optional(object(
        enabled = bool
        sampling_rate = number
      ))
    ))
    existing_response_headers_policy_id = optional(string)
    lambda_function_association = optional(object(
      viewer-request  = optional(object( lambda_arn = string, include_body = optional(bool) ))
      origin-request  = optional(object( lambda_arn = string, include_body = optional(bool) ))
      viewer-response = optional(object( lambda_arn = string, include_body = optional(bool) ))
      origin-response = optional(object( lambda_arn = string, include_body = optional(bool) ))
    ), )
    function_association = optional(object(
      viewer-request  = optional(object( function_arn = string ))
      viewer-response = optional(object( function_arn = string ))
    ), )
  )>

  # When you use the CloudFront console to create or update a distribution, you
  # provide information about one or more locations, known as origins, where you
  # store the original versions of your web content. See variable definition for
  # details.
  origins = <map(object(
    domain_name = string
    connection_attempts = optional(number)
    connection_timeout = optional(number)
    origin_path = optional(string)
    s3_origin_config = optional(object(
      is_origin_access_identity_enabled = bool
    ))
    custom_origin_config = optional(object(
      http_port = optional(number, 80)
      https_port = optional(number, 443)
      origin_protocol_policy = string
      origin_ssl_protocols = optional(list(string), ["TLSv1.2"])
      origin_keepalive_timeout = optional(number)
      origin_read_timeout = optional(number)
    ))
    origin_access_control = optional(object(
      origin_access_control_origin_type = string
      signing_behavior = string
    ))
    custom_headers = optional(list(object(
      name  = string
      value = string
    )), [])
    origin_shield = optional(object(
      enabled = bool
      origin_shield_region = optional(string)
    ))
  ))>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The custom domain name to use instead of the default cloudfront.net domain
  # name (e.g. static.foo.com). Only used if var.create_route53_entries is true.
  # Names MUST NOT contain trailing `.`
  aliases = null

  # Any comments you want to include about the distribution.
  comment = null

  # continuous deployment policy. This argument should only be set on a
  # production distribution. See the aws_cloudfront_continuous_deployment_policy
  # resource for additional details.
  continuous_deployment_policy = {"is_continuous_deployment_policy_enabled":false}

  # One or more custom error response elements.
  custom_error_response = []

  # A map of custom tags to apply to the S3 bucket and Cloudfront Distribution.
  # The key is the tag name and the value is the tag value.
  custom_tags = {}

  # The object that you want CloudFront to return (for example, index.html) when
  # an end user requests the root URL.
  default_root_object = null

  # Whether the distribution is enabled to accept end user requests for content.
  enabled = true

  # The restriction configuration for this distribution (geo_restrictions)
  geo_restriction = [{"locations":[],"restriction_type":"none"}]

  # The maximum HTTP version to support on the distribution. Allowed values are
  # http1.1, http2, http2and3 and http3.
  http_version = "http2"

  # Whether the IPv6 is enabled for the distribution.
  is_ipv6_enabled = false

  # When you enable additional metrics for a distribution, CloudFront sends up
  # to 8 metrics to CloudWatch in the US East (N. Virginia) Region. This rate is
  # charged only once per month, per metric (up to 8 metrics per distribution).
  is_monitoring_subscription_enabled = false

  # The logging configuration that controls how logs are written to your
  # distribution (maximum one).
  logging_config = {"is_logging_enabled":false}

  # Ordered list of cache behaviors resource for this distribution. List from
  # top to bottom in order of precedence. The topmost cache behavior will have
  # precedence 0.
  ordered_cache_behavior = {}

  # One or more origin_group for this distribution (multiples allowed).
  origin_groups = {}

  # The price class for this distribution. One of PriceClass_All,
  # PriceClass_200, PriceClass_100. Higher price classes support more edge
  # locations, but cost more. See:
  # https://aws.amazon.com/cloudfront/pricing/#price-classes.
  price_class = "PriceClass_100"

  # Disables the distribution instead of deleting it when destroying the
  # resource through Terraform. If this is set, the distribution needs to be
  # deleted manually afterwards.
  retain_on_delete = false

  # Whether the distribution is a staging distribution.
  # https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/continuous-deployment-workflow.html
  staging = false

  # The SSL configuration for this distribution. Please see variable definition
  # for detailed fields description.
  viewer_certificate = {"cloudfront_default_certificate":true,"minimum_protocol_version":"TLSv1.2_2021","ssl_support_method":"sni-only"}

  # If enabled, the resource will wait for the distribution status to change
  # from InProgress to Deployed. Setting this to false will skip the process.
  wait_for_deployment = true

  # Unique identifier that specifies the AWS WAF web ACL, if any, to associate
  # with this distribution. See variable declaration for details
  web_acl_id = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CLOUDFRONT MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-static-assets.git//modules/cloudfront?ref=v0.19.1"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Default cache behavior for this distribution (maximum one). See variable
  # definition for details.
  default_cache_behavior = <object(
    target_origin_id = string
    allowed_methods = optional(list(string), ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"])
    cached_methods = optional(list(string), ["GET", "HEAD"])
    viewer_protocol_policy = optional(string, "redirect-to-https")
    compress = optional(bool)
    default_ttl = optional(number)
    max_ttl = optional(number)
    min_ttl = optional(number)
    smooth_streaming = optional(bool)
    trusted_key_groups = optional(list(string))
    trusted_signers = optional(list(string))
    cache_policy = optional(object(
      min_ttl = number
      max_ttl = optional(number)
      default_ttl = optional(number)
      parameters_in_cache_key_and_forwarded_to_origin = optional(object(
        enable_accept_encoding_brotli = optional(bool)
        enable_accept_encoding_gzip   = optional(bool)
        cookies_config = object(
          cookie_behavior = string
          cookies = optional(list(string))
        )
        headers_config = object(
          header_behavior = string
          headers = optional(list(string))
        )
        query_strings_config = object(
          query_string_behavior = string
          query_strings = optional(list(string))
        )
      ))
    ))
    existing_cache_policy_id = optional(string)
    field_level_encryption = optional(object(
      content_type_profile_config = object(
        forward_when_content_type_is_unknown = bool
      )
      query_arg_profile_config = object(
        forward_when_query_arg_profile_is_unknown = bool
      )
    ))
    origin_request_policy = optional(object(
      cookies_config = object(
        cookie_behavior = string
        cookies = optional(list(string))
      )
      headers_config = object(
        header_behavior = string
        headers = optional(list(string))
      )
      query_strings_config = object(
        query_string_behavior = string
        query_strings = optional(list(string))
      )
    ))
    existing_origin_request_policy_id = optional(string)
    realtime_log_config = optional(object(
      sampling_rate = number
      fields = list(string)
      kinesis_stream_arn = string
    ))
    response_headers_policy = optional(object(
      cors_config = optional(object(
        access_control_allow_credentials = bool
        origin_override = bool
        access_control_allow_headers = list(string)
        access_control_allow_methods = list(string)
        access_control_allow_origins = list(string)
        access_control_expose_headers = optional(list(string))
        access_control_max_age_sec = optional(number)
      ))
      custom_headers_config = optional(object(
        header = string
        override = bool
        value = string
      ))
      remove_headers_config = optional(object(
        header = string
      ))
      security_headers_config = optional(object(
        content_security_policy = optional(object(
          content_security_policy = string
          override = bool
        ))
        content_type_options = optional(object(
          override = bool
        ))
        frame_options = optional(object(
          frame_option = string
          override = bool
        ))
        referrer_policy = optional(object(
          referrer_policy = string
          override = bool
        ))
        strict_transport_security = optional(object(
          access_control_max_age_sec = string
          override = bool
          include_subdomains = optional(bool)
          preload = optional(string)
        ))
        xss_protection = optional(object(
          protection = bool
          override = bool
          mode_block = optional(bool)
          report_uri = optional(string)
        ))
      ))
      server_timing_headers_config = optional(object(
        enabled = bool
        sampling_rate = number
      ))
    ))
    existing_response_headers_policy_id = optional(string)
    lambda_function_association = optional(object(
      viewer-request  = optional(object( lambda_arn = string, include_body = optional(bool) ))
      origin-request  = optional(object( lambda_arn = string, include_body = optional(bool) ))
      viewer-response = optional(object( lambda_arn = string, include_body = optional(bool) ))
      origin-response = optional(object( lambda_arn = string, include_body = optional(bool) ))
    ), )
    function_association = optional(object(
      viewer-request  = optional(object( function_arn = string ))
      viewer-response = optional(object( function_arn = string ))
    ), )
  )>

  # When you use the CloudFront console to create or update a distribution, you
  # provide information about one or more locations, known as origins, where you
  # store the original versions of your web content. See variable definition for
  # details.
  origins = <map(object(
    domain_name = string
    connection_attempts = optional(number)
    connection_timeout = optional(number)
    origin_path = optional(string)
    s3_origin_config = optional(object(
      is_origin_access_identity_enabled = bool
    ))
    custom_origin_config = optional(object(
      http_port = optional(number, 80)
      https_port = optional(number, 443)
      origin_protocol_policy = string
      origin_ssl_protocols = optional(list(string), ["TLSv1.2"])
      origin_keepalive_timeout = optional(number)
      origin_read_timeout = optional(number)
    ))
    origin_access_control = optional(object(
      origin_access_control_origin_type = string
      signing_behavior = string
    ))
    custom_headers = optional(list(object(
      name  = string
      value = string
    )), [])
    origin_shield = optional(object(
      enabled = bool
      origin_shield_region = optional(string)
    ))
  ))>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The custom domain name to use instead of the default cloudfront.net domain
  # name (e.g. static.foo.com). Only used if var.create_route53_entries is true.
  # Names MUST NOT contain trailing `.`
  aliases = null

  # Any comments you want to include about the distribution.
  comment = null

  # continuous deployment policy. This argument should only be set on a
  # production distribution. See the aws_cloudfront_continuous_deployment_policy
  # resource for additional details.
  continuous_deployment_policy = {"is_continuous_deployment_policy_enabled":false}

  # One or more custom error response elements.
  custom_error_response = []

  # A map of custom tags to apply to the S3 bucket and Cloudfront Distribution.
  # The key is the tag name and the value is the tag value.
  custom_tags = {}

  # The object that you want CloudFront to return (for example, index.html) when
  # an end user requests the root URL.
  default_root_object = null

  # Whether the distribution is enabled to accept end user requests for content.
  enabled = true

  # The restriction configuration for this distribution (geo_restrictions)
  geo_restriction = [{"locations":[],"restriction_type":"none"}]

  # The maximum HTTP version to support on the distribution. Allowed values are
  # http1.1, http2, http2and3 and http3.
  http_version = "http2"

  # Whether the IPv6 is enabled for the distribution.
  is_ipv6_enabled = false

  # When you enable additional metrics for a distribution, CloudFront sends up
  # to 8 metrics to CloudWatch in the US East (N. Virginia) Region. This rate is
  # charged only once per month, per metric (up to 8 metrics per distribution).
  is_monitoring_subscription_enabled = false

  # The logging configuration that controls how logs are written to your
  # distribution (maximum one).
  logging_config = {"is_logging_enabled":false}

  # Ordered list of cache behaviors resource for this distribution. List from
  # top to bottom in order of precedence. The topmost cache behavior will have
  # precedence 0.
  ordered_cache_behavior = {}

  # One or more origin_group for this distribution (multiples allowed).
  origin_groups = {}

  # The price class for this distribution. One of PriceClass_All,
  # PriceClass_200, PriceClass_100. Higher price classes support more edge
  # locations, but cost more. See:
  # https://aws.amazon.com/cloudfront/pricing/#price-classes.
  price_class = "PriceClass_100"

  # Disables the distribution instead of deleting it when destroying the
  # resource through Terraform. If this is set, the distribution needs to be
  # deleted manually afterwards.
  retain_on_delete = false

  # Whether the distribution is a staging distribution.
  # https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/continuous-deployment-workflow.html
  staging = false

  # The SSL configuration for this distribution. Please see variable definition
  # for detailed fields description.
  viewer_certificate = {"cloudfront_default_certificate":true,"minimum_protocol_version":"TLSv1.2_2021","ssl_support_method":"sni-only"}

  # If enabled, the resource will wait for the distribution status to change
  # from InProgress to Deployed. Setting this to false will skip the process.
  wait_for_deployment = true

  # Unique identifier that specifies the AWS WAF web ACL, if any, to associate
  # with this distribution. See variable declaration for details
  web_acl_id = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="default_cache_behavior" requirement="required" type="object(…)">
<HclListItemDescription>

Default cache behavior for this distribution (maximum one). See variable definition for details.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # ID of existing origin (one of keys in origins)
    target_origin_id = string

    # Controls which HTTP methods CloudFront processes and forwards to your Amazon S3 bucket or your custom origin.
    allowed_methods = optional(list(string), ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"])

    # Specify whether you want CloudFront to cache the response from your origin when a viewer submits an OPTIONS request.
    # CloudFront always caches the response to GET and HEAD requests.
    cached_methods = optional(list(string), ["GET", "HEAD"])

    # Choose the protocol policy that you want viewers to use to access your content in CloudFront edge locations:
    # HTTP and HTTPS: Viewers can use both protocols.
    # Redirect HTTP to HTTPS: Viewers can use both protocols, but HTTP requests are automatically redirected to HTTPS requests.
    # HTTPS Only: Viewers can only access your content if they're using HTTPS.
    # One of allow-all, https-only, or redirect-to-https.
    viewer_protocol_policy = optional(string, "redirect-to-https")

    # Set this flag to true if you want CloudFront to automatically compress files of certain types when viewers support compressed content.
    # When CloudFront compresses your content, downloads are faster because the files are smaller, and your web pages render faster for your users.
    # For more information, see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/ServingCompressedFiles.html.
    compress = optional(bool)

    # Specify the default amount of time, in seconds, that you want objects to stay in CloudFront caches before CloudFront forwards another request to your origin
    # to determine whether the object has been updated. The value that you specify for Default TTL applies only when your origin does not add HTTP headers
    # such as Cache-Control max-age, Cache-Control s-maxage, or Expires to objects.
    # For more information, see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html.
    default_ttl = optional(number)

    # Specify the maximum amount of time, in seconds, that you want objects to stay in CloudFront caches before CloudFront queries your origin
    # to see whether the object has been updated. The value that you specify for Maximum TTL applies only when your origin adds HTTP headers such as
    # Cache-Control max-age, Cache-Control s-maxage, or Expires to objects.
    max_ttl = optional(number)

    # Specify the minimum amount of time, in seconds, that you want objects to stay in the CloudFront cache before CloudFront sends another request
    # to the origin to determine whether the object has been updated.
    min_ttl = optional(number)

    # Set to TRUE if you want to distribute media files in the Microsoft Smooth Streaming format and you do not have an IIS server.
    # Seto to FALSE if you have a Microsoft IIS server that you want to use as an origin to distribute media files in
    # the Microsoft Smooth Streaming format, or if you are not distributing Smooth Streaming media files.
    smooth_streaming = optional(bool)

    # List of nested attributes for active trusted key groups, if the distribution is set up to serve private content with signed URLs.
    trusted_key_groups = optional(list(string))

    # This setting applies only when you choose Yes for Restrict Viewer Access (Use Signed URLs or Signed Cookies.
    #  List of AWS account IDs (or self) that you want to allow to create signed URLs for private content.
    trusted_signers = optional(list(string))

    # You can use a cache policy to improve your cache hit ratio by controlling the values (URL query strings, HTTP headers, and cookies)
    # that are included in the cache key. It is possible to provide an existing cache policy ID directly. If both cache_policy and
    # existing_cache_policy_id are provided, then existing_cache_policy_id takes priority.
    cache_policy = optional(object({
      # The minimum amount of time, in seconds, that you want objects to stay in the CloudFront cache
      # before CloudFront checks with the origin to see if the object has been updated.
      min_ttl = number

      # The maximum amount of time, in seconds, that objects stay in the CloudFront cache before CloudFront
      # checks with the origin to see if the object has been updated.
      # CloudFront uses this setting only when the origin sends Cache-Control or Expires headers with the object.
      max_ttl = optional(number)

      # The default amount of time, in seconds, that you want objects to stay in the CloudFront cache
      # before CloudFront checks with the origin to see if the object has been updated.
      # CloudFront uses this setting's value as the object's TTL only when the origin does not send Cache-Control or Expires headers with the object.
      default_ttl = optional(number)

      parameters_in_cache_key_and_forwarded_to_origin = optional(object({
        # These settings enable CloudFront to request and cache objects that are compressed in the Gzip or Brotli compression formats, when the viewer supports it.
        # These settings also allow CloudFront compression to work. Viewers indicate their support for these compression formats with the Accept-Encoding HTTP header.
        enable_accept_encoding_brotli = optional(bool)
        enable_accept_encoding_gzip   = optional(bool)

        # Whether any cookies in viewer requests are included in the cache key and automatically included in requests that CloudFront sends to the origin.
        cookies_config = object({
          # Whether any cookies in viewer requests are included in the cache key and automatically included in requests that CloudFront sends to the origin.
          # Valid values for cookie_behavior are none, whitelist, allExcept, and all.
          cookie_behavior = string

          # List that contains a list of cookie names.
          cookies = optional(list(string))
        })

        # Whether any HTTP headers are included in the cache key and automatically included in requests that CloudFront sends to the origin.
        headers_config = object({
          # Whether any HTTP headers are included in the cache key and automatically included in requests that CloudFront sends to the origin.
          # Valid values for header_behavior are none and whitelist.
          header_behavior = string

          # List that contains a list of headers names.
          headers = optional(list(string))
        })

        # Whether any URL query strings in viewer requests are included in the cache key. It also automatically includes these query strings in requests that CloudFront sends to the origin.
        query_strings_config = object({
          # Whether URL query strings in viewer requests are included in the cache key and automatically included in requests that CloudFront sends to the origin.
          # Valid values for query_string_behavior are none, whitelist, allExcept, and all.
          query_string_behavior = string

          # List that contains a list of query string names.
          query_strings = optional(list(string))
        })
      }))
    }))
    existing_cache_policy_id = optional(string)

    # Defines Configuration for a CloudFront Field-level Encryption Config resource.
    field_level_encryption = optional(object({
      # Content Type Profile Config specifies when to forward content if a content type isn't recognized and
      # profiles to use as by default in a request if a query argument doesn't specify a profile to use.
      content_type_profile_config = object({
        # Specifies what to do when an unknown content type is provided for the profile.
        # If true, content is forwarded without being encrypted when the content type is unknown.
        # If false (the default), an error is returned when the content type is unknown.
        forward_when_content_type_is_unknown = bool
      })

      # Query Arg Profile Config that specifies when to forward content if a profile isn't found and the profile that can be provided as a query argument in a request.
      query_arg_profile_config = object({
        # Flag to set if you want a request to be forwarded to the origin even if the profile specified by the field-level encryption query argument, fle-profile, is unknown.
        forward_when_query_arg_profile_is_unknown = bool
      })
    }))

    # Defines a CloudFront origin request policy.
    origin_request_policy = optional(object({
      # Object that determines whether any cookies in viewer requests (and if so, which cookies) are included in the origin request key and
      # automatically included in requests that CloudFront sends to the origin.
      cookies_config = object({
        # Determines whether any cookies in viewer requests are included in the origin request key and automatically included in requests that CloudFront sends to the origin.
        # Valid values are none, whitelist, all, allExcept.
        cookie_behavior = string

        # Object that contains a list of cookie names.
        cookies = optional(list(string))
      })
      # Object that determines whether any HTTP headers (and if so, which headers) are included in the origin request key and
      # automatically included in requests that CloudFront sends to the origin.
      headers_config = object({
        #  Determines whether any HTTP headers are included in the origin request key and automatically included in requests that CloudFront sends to the origin.
        #  Valid values are none, whitelist, allViewer, allViewerAndWhitelistCloudFront, allExcept.
        header_behavior = string

        # Object that contains a list of headers names.
        headers = optional(list(string))
      })
      # Object that determines whether any URL query strings in viewer requests (and if so, which query strings) are included in the origin request key and
      # automatically included in requests that CloudFront sends to the origin.
      query_strings_config = object({
        # Determines whether any URL query strings in viewer requests are included in the origin request key and automatically included in requests that CloudFront sends to the origin.
        # Valid values are none, whitelist, all, allExcept.
        query_string_behavior = string

        # Object that contains a list of query string names.
        query_strings = optional(list(string))
      })
    }))
    existing_origin_request_policy_id = optional(string)

    # Defines a CloudFront real-time log configuration resource..
    realtime_log_config = optional(object({
      # The sampling rate for this real-time log configuration.
      # The sampling rate determines the percentage of viewer requests that are represented in the real-time log data.
      # An integer between 1 and 100, inclusive.
      sampling_rate = number

      # The fields that are included in each real-time log record.
      # See https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/real-time-logs.html#understand-real-time-log-config-fields
      # for for supported values.
      fields = list(string)

      # The ARN of the Kinesis data stream.
      kinesis_stream_arn = string
    }))

    # Defines a CloudFront response headers policy resource. It is possible to provide an existing policy ID directly.
    # If both response_headers_policy and existing_response_headers_policy_id are provided, then
    # existing_response_headers_policy_id takes priority.
    response_headers_policy = optional(object({
      # A configuration for a set of HTTP response headers that are used for Cross-Origin Resource Sharing (CORS).
      cors_config = optional(object({
        # A Boolean value that CloudFront uses as the value for the Access-Control-Allow-Credentials HTTP response header.
        access_control_allow_credentials = bool

        # A Boolean value that determines how CloudFront behaves for the HTTP response header.
        origin_override = bool

        #  Object that contains an attribute items that contains a list of HTTP header names that CloudFront includes as values for the Access-Control-Allow-Headers HTTP response header.
        access_control_allow_headers = list(string)

        # Object that contains an attribute items that contains a list of HTTP methods that CloudFront includes as values for the Access-Control-Allow-Methods HTTP response header.
        # Valid values: GET | POST | OPTIONS | PUT | DELETE | HEAD | ALL
        access_control_allow_methods = list(string)

        # Object that contains an attribute items that contains a list of origins that CloudFront can use as the value for the Access-Control-Allow-Origin HTTP response header.
        access_control_allow_origins = list(string)

        # Object that contains an attribute items that contains a list of HTTP headers that CloudFront includes as values for the Access-Control-Expose-Headers HTTP response header.
        access_control_expose_headers = optional(list(string))

        # A number that CloudFront uses as the value for the Access-Control-Max-Age HTTP response header.
        access_control_max_age_sec = optional(number)
      }))

      # Object that contains an attribute items that contains a list of custom headers.
      custom_headers_config = optional(object({
        # The HTTP response header name.
        header = string

        # Whether CloudFront overrides a response header with the same name received from the origin with the header specifies here.
        override = bool

        # The value for the HTTP response header.
        value = string
      }))

      # A configuration for a set of HTTP headers to remove from the HTTP response. Object that contains an attribute items that contains a list of headers.
      remove_headers_config = optional(object({
        # The HTTP header name.
        header = string
      }))

      # A configuration for a set of security-related HTTP response headers.
      security_headers_config = optional(object({
        # The policy directives and their values that CloudFront includes as values for the Content-Security-Policy HTTP response header.
        content_security_policy = optional(object({
          # The policy directives and their values that CloudFront includes as values for the Content-Security-Policy HTTP response header.
          content_security_policy = string

          # Whether CloudFront overrides the Content-Security-Policy HTTP response header received from the origin with the one specified in this response headers policy.
          override = bool
        }))

        # Determines whether CloudFront includes the X-Content-Type-Options HTTP response header with its value set to nosniff
        content_type_options = optional(object({
          override = bool
        }))

        # Determines whether CloudFront includes the X-Frame-Options HTTP response header and the header’s value.
        frame_options = optional(object({
          # The value of the X-Frame-Options HTTP response header.
          # Valid values: DENY | SAMEORIGIN
          frame_option = string

          #  Whether CloudFront overrides the X-Frame-Options HTTP response header received from the origin with the one specified in this response headers policy.
          override = bool
        }))

        # Determines whether CloudFront includes the Referrer-Policy HTTP response header and the header’s value.
        referrer_policy = optional(object({
          # The value of the Referrer-Policy HTTP response header.
          # Valid Values: no-referrer | no-referrer-when-downgrade | origin | origin-when-cross-origin | same-origin | strict-origin | strict-origin-when-cross-origin | unsafe-url
          referrer_policy = string

          # Whether CloudFront overrides the Referrer-Policy HTTP response header received from the origin with the one specified in this response headers policy.
          override = bool
        }))

        # Determines whether CloudFront includes the Strict-Transport-Security HTTP response header and the header’s value.
        strict_transport_security = optional(object({
          # A number that CloudFront uses as the value for the max-age directive in the Strict-Transport-Security HTTP response header.
          access_control_max_age_sec = string

          # Whether CloudFront overrides the Strict-Transport-Security HTTP response header received from the origin with the one specified in this response headers policy.
          override = bool

          # Whether CloudFront includes the includeSubDomains directive in the Strict-Transport-Security HTTP response header.
          include_subdomains = optional(bool)

          # Whether CloudFront includes the preload directive in the Strict-Transport-Security HTTP response header.
          preload = optional(string)
        }))

        # Determine whether CloudFront includes the X-XSS-Protection HTTP response header and the header’s value.
        xss_protection = optional(object({
          # A Boolean value that determines the value of the X-XSS-Protection HTTP response header.
          # When this setting is true, the value of the X-XSS-Protection header is 1.
          # When this setting is false, the value of the X-XSS-Protection header is 0.
          protection = bool

          # Whether CloudFront overrides the X-XSS-Protection HTTP response header received from the origin with the one specified in this response headers policy.
          override = bool

          # Whether CloudFront includes the mode=block directive in the X-XSS-Protection header.
          mode_block = optional(bool)

          # A reporting URI, which CloudFront uses as the value of the report directive in the X-XSS-Protection header.
          # You cannot specify a report_uri when mode_block is true.
          report_uri = optional(string)
        }))
      }))

      # A configuration for enabling the Server-Timing header in HTTP responses sent from CloudFront.
      server_timing_headers_config = optional(object({
        #  A Whether CloudFront adds the Server-Timing header to HTTP responses that it sends in response to requests that
        #  match a cache behavior that's associated with this response headers policy.
        enabled = bool

        # A number 0–100 (inclusive) that specifies the percentage of responses that you want CloudFront to add the Server-Timing header to.
        # Valid range: Minimum value of 0.0. Maximum value of 100.0.
        sampling_rate = number
      }))
    }))
    existing_response_headers_policy_id = optional(string)

    # A config block that triggers a lambda function with specific actions.
    lambda_function_association = optional(object({
      # Defines a CloudFront Lambda function association for a specific event type.
      # lambda_arn -- ARN of the Lambda function.
      # include_body -- When set to true it exposes the request body to the lambda function. Defaults to false. Valid values: true, false.
      viewer-request  = optional(object({ lambda_arn = string, include_body = optional(bool) }))
      origin-request  = optional(object({ lambda_arn = string, include_body = optional(bool) }))
      viewer-response = optional(object({ lambda_arn = string, include_body = optional(bool) }))
      origin-response = optional(object({ lambda_arn = string, include_body = optional(bool) }))
    }), {})

    # A config block that triggers a cloudfront function with specific actions.
    function_association = optional(object({
      # Defines Cloudfront function for  specific actions.
      # function_arn -- ARN of the CloudFront function
      viewer-request  = optional(object({ function_arn = string }))
      viewer-response = optional(object({ function_arn = string }))
    }), {})
  })
```

</HclListItemTypeDetails>
<HclGeneralListItem title="More Details">
<details>


```hcl

     Controls which HTTP methods CloudFront processes and forwards to your Amazon S3 bucket or your custom origin.

```
</details>

<details>


```hcl

     Specify whether you want CloudFront to cache the response from your origin when a viewer submits an OPTIONS request.
     CloudFront always caches the response to GET and HEAD requests.

```
</details>

<details>


```hcl

     Choose the protocol policy that you want viewers to use to access your content in CloudFront edge locations:
     HTTP and HTTPS: Viewers can use both protocols.
     Redirect HTTP to HTTPS: Viewers can use both protocols, but HTTP requests are automatically redirected to HTTPS requests.
     HTTPS Only: Viewers can only access your content if they're using HTTPS.
     One of allow-all, https-only, or redirect-to-https.

```
</details>

<details>


```hcl

     Set this flag to true if you want CloudFront to automatically compress files of certain types when viewers support compressed content.
     When CloudFront compresses your content, downloads are faster because the files are smaller, and your web pages render faster for your users.
     For more information, see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/ServingCompressedFiles.html.

```
</details>

<details>


```hcl

     Specify the default amount of time, in seconds, that you want objects to stay in CloudFront caches before CloudFront forwards another request to your origin
     to determine whether the object has been updated. The value that you specify for Default TTL applies only when your origin does not add HTTP headers
     such as Cache-Control max-age, Cache-Control s-maxage, or Expires to objects.
     For more information, see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html.

```
</details>

<details>


```hcl

     Specify the maximum amount of time, in seconds, that you want objects to stay in CloudFront caches before CloudFront queries your origin
     to see whether the object has been updated. The value that you specify for Maximum TTL applies only when your origin adds HTTP headers such as
     Cache-Control max-age, Cache-Control s-maxage, or Expires to objects.

```
</details>

<details>


```hcl

     Specify the minimum amount of time, in seconds, that you want objects to stay in the CloudFront cache before CloudFront sends another request
     to the origin to determine whether the object has been updated.

```
</details>

<details>


```hcl

     Set to TRUE if you want to distribute media files in the Microsoft Smooth Streaming format and you do not have an IIS server.
     Seto to FALSE if you have a Microsoft IIS server that you want to use as an origin to distribute media files in
     the Microsoft Smooth Streaming format, or if you are not distributing Smooth Streaming media files.

```
</details>

<details>


```hcl

     List of nested attributes for active trusted key groups, if the distribution is set up to serve private content with signed URLs.

```
</details>

<details>


```hcl

     This setting applies only when you choose Yes for Restrict Viewer Access (Use Signed URLs or Signed Cookies.
      List of AWS account IDs (or self) that you want to allow to create signed URLs for private content.

```
</details>

<details>


```hcl

     You can use a cache policy to improve your cache hit ratio by controlling the values (URL query strings, HTTP headers, and cookies)
     that are included in the cache key. It is possible to provide an existing cache policy ID directly. If both cache_policy and
     existing_cache_policy_id are provided, then existing_cache_policy_id takes priority.

```
</details>

<details>


```hcl

       The maximum amount of time, in seconds, that objects stay in the CloudFront cache before CloudFront
       checks with the origin to see if the object has been updated.
       CloudFront uses this setting only when the origin sends Cache-Control or Expires headers with the object.

```
</details>

<details>


```hcl

       The default amount of time, in seconds, that you want objects to stay in the CloudFront cache
       before CloudFront checks with the origin to see if the object has been updated.
       CloudFront uses this setting's value as the object's TTL only when the origin does not send Cache-Control or Expires headers with the object.

```
</details>

<details>


```hcl

         Whether any cookies in viewer requests are included in the cache key and automatically included in requests that CloudFront sends to the origin.

```
</details>

<details>


```hcl

           List that contains a list of cookie names.

```
</details>

<details>


```hcl

         Whether any HTTP headers are included in the cache key and automatically included in requests that CloudFront sends to the origin.

```
</details>

<details>


```hcl

           List that contains a list of headers names.

```
</details>

<details>


```hcl

         Whether any URL query strings in viewer requests are included in the cache key. It also automatically includes these query strings in requests that CloudFront sends to the origin.

```
</details>

<details>


```hcl

           List that contains a list of query string names.

```
</details>

<details>


```hcl

     Defines Configuration for a CloudFront Field-level Encryption Config resource.

```
</details>

<details>


```hcl

       Query Arg Profile Config that specifies when to forward content if a profile isn't found and the profile that can be provided as a query argument in a request.

```
</details>

<details>


```hcl

     Defines a CloudFront origin request policy.

```
</details>

<details>


```hcl

         Object that contains a list of cookie names.

```
</details>

<details>


```hcl

         Object that contains a list of headers names.

```
</details>

<details>


```hcl

         Object that contains a list of query string names.

```
</details>

<details>


```hcl

     Defines a CloudFront real-time log configuration resource..

```
</details>

<details>


```hcl

       The fields that are included in each real-time log record.
       See https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/real-time-logs.htmlunderstand-real-time-log-config-fields
       for for supported values.

```
</details>

<details>


```hcl

       The ARN of the Kinesis data stream.

```
</details>

<details>


```hcl

     Defines a CloudFront response headers policy resource. It is possible to provide an existing policy ID directly.
     If both response_headers_policy and existing_response_headers_policy_id are provided, then
     existing_response_headers_policy_id takes priority.

```
</details>

<details>


```hcl

         A Boolean value that determines how CloudFront behaves for the HTTP response header.

```
</details>

<details>


```hcl

          Object that contains an attribute items that contains a list of HTTP header names that CloudFront includes as values for the Access-Control-Allow-Headers HTTP response header.

```
</details>

<details>


```hcl

         Object that contains an attribute items that contains a list of HTTP methods that CloudFront includes as values for the Access-Control-Allow-Methods HTTP response header.
         Valid values: GET | POST | OPTIONS | PUT | DELETE | HEAD | ALL

```
</details>

<details>


```hcl

         Object that contains an attribute items that contains a list of origins that CloudFront can use as the value for the Access-Control-Allow-Origin HTTP response header.

```
</details>

<details>


```hcl

         Object that contains an attribute items that contains a list of HTTP headers that CloudFront includes as values for the Access-Control-Expose-Headers HTTP response header.

```
</details>

<details>


```hcl

         A number that CloudFront uses as the value for the Access-Control-Max-Age HTTP response header.

```
</details>

<details>


```hcl

       Object that contains an attribute items that contains a list of custom headers.

```
</details>

<details>


```hcl

         Whether CloudFront overrides a response header with the same name received from the origin with the header specifies here.

```
</details>

<details>


```hcl

         The value for the HTTP response header.

```
</details>

<details>


```hcl

       A configuration for a set of HTTP headers to remove from the HTTP response. Object that contains an attribute items that contains a list of headers.

```
</details>

<details>


```hcl

       A configuration for a set of security-related HTTP response headers.

```
</details>

<details>


```hcl

           Whether CloudFront overrides the Content-Security-Policy HTTP response header received from the origin with the one specified in this response headers policy.

```
</details>

<details>


```hcl

         Determines whether CloudFront includes the X-Content-Type-Options HTTP response header with its value set to nosniff

```
</details>

<details>


```hcl

         Determines whether CloudFront includes the X-Frame-Options HTTP response header and the header’s value.

```
</details>

<details>


```hcl

            Whether CloudFront overrides the X-Frame-Options HTTP response header received from the origin with the one specified in this response headers policy.

```
</details>

<details>


```hcl

         Determines whether CloudFront includes the Referrer-Policy HTTP response header and the header’s value.

```
</details>

<details>


```hcl

           Whether CloudFront overrides the Referrer-Policy HTTP response header received from the origin with the one specified in this response headers policy.

```
</details>

<details>


```hcl

         Determines whether CloudFront includes the Strict-Transport-Security HTTP response header and the header’s value.

```
</details>

<details>


```hcl

           Whether CloudFront overrides the Strict-Transport-Security HTTP response header received from the origin with the one specified in this response headers policy.

```
</details>

<details>


```hcl

           Whether CloudFront includes the includeSubDomains directive in the Strict-Transport-Security HTTP response header.

```
</details>

<details>


```hcl

           Whether CloudFront includes the preload directive in the Strict-Transport-Security HTTP response header.

```
</details>

<details>


```hcl

         Determine whether CloudFront includes the X-XSS-Protection HTTP response header and the header’s value.

```
</details>

<details>


```hcl

           Whether CloudFront overrides the X-XSS-Protection HTTP response header received from the origin with the one specified in this response headers policy.

```
</details>

<details>


```hcl

           Whether CloudFront includes the mode=block directive in the X-XSS-Protection header.

```
</details>

<details>


```hcl

           A reporting URI, which CloudFront uses as the value of the report directive in the X-XSS-Protection header.
           You cannot specify a report_uri when mode_block is true.

```
</details>

<details>


```hcl

       A configuration for enabling the Server-Timing header in HTTP responses sent from CloudFront.

```
</details>

<details>


```hcl

         A number 0–100 (inclusive) that specifies the percentage of responses that you want CloudFront to add the Server-Timing header to.
         Valid range: Minimum value of 0.0. Maximum value of 100.0.

```
</details>

<details>


```hcl

     A config block that triggers a lambda function with specific actions.

```
</details>

<details>


```hcl

     A config block that triggers a cloudfront function with specific actions.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="origins" requirement="required" type="map(object(…))">
<HclListItemDescription>

When you use the CloudFront console to create or update a distribution, you provide information about one or more locations, known as origins, where you store the original versions of your web content. See variable definition for details.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    # The origin domain is the DNS domain name of the resource where CloudFront will get objects for your origin, such as an Amazon S3 bucket or HTTP server.
    # For example:
    # Amazon S3 bucket – amzn-s3-demo-bucket.s3.us-west-2.amazonaws.com
    # Amazon S3 bucket configured as a website – amzn-s3-demo-bucket.s3-website.us-west-2.amazonaws.com
    # MediaStore container – examplemediastore.data.mediastore.us-west-1.amazonaws.com
    # MediaPackage endpoint – examplemediapackage.mediapackage.us-west-1.amazonaws.com
    # Amazon EC2 instance – ec2-203-0-113-25.compute-1.amazonaws.com
    # Elastic Load Balancing load balancer – example-load-balancer-1234567890.us-west-2.elb.amazonaws.com
    # Your own web server – www.example.com
    domain_name = string

    # You can set the number of times that CloudFront attempts to connect to the origin.
    # You can specify 1, 2, or 3 as the number of attempts.
    # the default number (if you don’t specify otherwise) is 3.
    connection_attempts = optional(number)

    # The connection timeout is the number of seconds that CloudFront waits when trying to establish a connection to the origin.
    # You can specify a number of seconds between 1 and 10 (inclusive).
    # The default timeout (if you don’t specify otherwise) is 10 seconds.
    connection_timeout = optional(number)

    # If you want CloudFront to request your content from a directory in your origin, enter the directory path, beginning with a slash (/).
    # CloudFront appends the directory path to the value of Origin domain, for example, cf-origin.example.com/production/images.
    # Do not add a slash (/) at the end of the path.
    # For example, suppose you’ve specified the following values for your distribution:
    # - Origin domain – An Amazon S3 bucket named amzn-s3-demo-bucket
    # - Origin path – /production
    # - Alternate domain names (CNAME) – example.com
    # When a user enters example.com/index.html in a browser, CloudFront sends a request to Amazon S3 for amzn-s3-demo-bucket/production/index.html.
    # When a user enters example.com/acme/index.html in a browser, CloudFront sends a request to Amazon S3 for amzn-s3-demo-bucket/production/acme/index.html.
    origin_path = optional(string)

    s3_origin_config = optional(object({
      # Set this flag to true to enable Origin access control settings (recommended) and
      # restrict access to an Amazon S3 bucket origin to only specific CloudFront distributions.
      is_origin_access_identity_enabled = bool
    }))
    custom_origin_config = optional(object({
      # You can specify the HTTP port on which the custom origin listens.
      # Valid values include ports 80, 443, and 1024 to 65535. The default value is port 80.
      http_port = optional(number, 80)

      # You can specify the HTTPS port on which the custom origin listens.
      # Valid values include ports 80, 443, and 1024 to 65535. The default value is port 443.
      https_port = optional(number, 443)

      # The protocol policy that you want CloudFront to use when fetching objects from your origin.
      # - HTTP only: CloudFront uses only HTTP to access the origin.
      # - HTTPS only: CloudFront uses only HTTPS to access the origin.
      # - Match viewer: CloudFront communicates with your origin using HTTP or HTTPS, depending on the protocol of the viewer request.
      #   CloudFront caches the object only once even if viewers make requests using both HTTP and HTTPS protocols.
      # One of http-only, https-only, or match-viewer.
      origin_protocol_policy = string

      # Choose the minimum TLS/SSL protocol that CloudFront can use when it establishes an HTTPS connection to your origin.
      # Lower TLS protocols are less secure, so we recommend that you choose the latest TLS protocol that your origin supports.
      # Valid values include protocols SSLv3, TLSv1, TLSv1.1, TLSv1.2
      origin_ssl_protocols = optional(list(string), ["TLSv1.2"])

      # The keep-alive timeout is how long (in seconds) CloudFront tries to maintain a connection to your custom origin after it gets the last packet of a response.
      # Maintaining a persistent connection saves the time that is required to re-establish the TCP connection and perform another TLS handshake for subsequent requests.
      # Increasing the keep-alive timeout helps improve the request-per-connection metric for distributions.
      # AWS enforces an upper limit of 60. But you can request an increase. Defaults to 5.
      origin_keepalive_timeout = optional(number)

      # The origin response timeout, also known as the origin read timeout or origin request timeout, applies to both of the following values:
      # - How long (in seconds) CloudFront waits for a response after forwarding a request to the origin.
      # - How long (in seconds) CloudFront waits after receiving a packet of a response from the origin and before receiving the next packet.
      # By default, AWS enforces an upper limit of 60. But you can request an increase. Defaults to 30.
      origin_read_timeout = optional(number)
    }))
    origin_access_control = optional(object({
      # The type of origin that this Origin Access Control is for.
      # Valid values are lambda, mediapackagev2, mediastore, and s3.
      origin_access_control_origin_type = string

      # Specifies which requests CloudFront signs. Specify always for the most common use case.
      # Allowed values: always, never, and no-override.
      signing_behavior = string
    }))
    custom_headers = optional(list(object({
      # If you want CloudFront to add custom headers whenever it sends a request to your origin, specify the header name and its value.
      # For more information, see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/add-origin-custom-headers.html.
      name  = string
      value = string
    })), [])
    origin_shield = optional(object({
      # Set this flag to true to enable CloudFront Origin Shield.
      # CloudFront Origin Shield is an additional layer in the CloudFront caching infrastructure that
      # helps to minimize your origin’s load, improve its availability, and reduce its operating costs.
      enabled = bool

      # AWS Region for Origin Shield. To specify a region, use the region code, not the region name.
      # For example, specify the US East (Ohio) region as us-east-2.
      origin_shield_region = optional(string)
    }))
  }))
```

</HclListItemTypeDetails>
<HclGeneralListItem title="More Details">
<details>


```hcl

     You can set the number of times that CloudFront attempts to connect to the origin.
     You can specify 1, 2, or 3 as the number of attempts.
     the default number (if you don’t specify otherwise) is 3.

```
</details>

<details>


```hcl

     The connection timeout is the number of seconds that CloudFront waits when trying to establish a connection to the origin.
     You can specify a number of seconds between 1 and 10 (inclusive).
     The default timeout (if you don’t specify otherwise) is 10 seconds.

```
</details>

<details>


```hcl

     If you want CloudFront to request your content from a directory in your origin, enter the directory path, beginning with a slash (/).
     CloudFront appends the directory path to the value of Origin domain, for example, cf-origin.example.com/production/images.
     Do not add a slash (/) at the end of the path.
     For example, suppose you’ve specified the following values for your distribution:
     - Origin domain – An Amazon S3 bucket named amzn-s3-demo-bucket
     - Origin path – /production
     - Alternate domain names (CNAME) – example.com
     When a user enters example.com/index.html in a browser, CloudFront sends a request to Amazon S3 for amzn-s3-demo-bucket/production/index.html.
     When a user enters example.com/acme/index.html in a browser, CloudFront sends a request to Amazon S3 for amzn-s3-demo-bucket/production/acme/index.html.

```
</details>

<details>


```hcl

       You can specify the HTTPS port on which the custom origin listens.
       Valid values include ports 80, 443, and 1024 to 65535. The default value is port 443.

```
</details>

<details>


```hcl

       The protocol policy that you want CloudFront to use when fetching objects from your origin.
       - HTTP only: CloudFront uses only HTTP to access the origin.
       - HTTPS only: CloudFront uses only HTTPS to access the origin.
       - Match viewer: CloudFront communicates with your origin using HTTP or HTTPS, depending on the protocol of the viewer request.
         CloudFront caches the object only once even if viewers make requests using both HTTP and HTTPS protocols.
       One of http-only, https-only, or match-viewer.

```
</details>

<details>


```hcl

       Choose the minimum TLS/SSL protocol that CloudFront can use when it establishes an HTTPS connection to your origin.
       Lower TLS protocols are less secure, so we recommend that you choose the latest TLS protocol that your origin supports.
       Valid values include protocols SSLv3, TLSv1, TLSv1.1, TLSv1.2

```
</details>

<details>


```hcl

       The keep-alive timeout is how long (in seconds) CloudFront tries to maintain a connection to your custom origin after it gets the last packet of a response.
       Maintaining a persistent connection saves the time that is required to re-establish the TCP connection and perform another TLS handshake for subsequent requests.
       Increasing the keep-alive timeout helps improve the request-per-connection metric for distributions.
       AWS enforces an upper limit of 60. But you can request an increase. Defaults to 5.

```
</details>

<details>


```hcl

       The origin response timeout, also known as the origin read timeout or origin request timeout, applies to both of the following values:
       - How long (in seconds) CloudFront waits for a response after forwarding a request to the origin.
       - How long (in seconds) CloudFront waits after receiving a packet of a response from the origin and before receiving the next packet.
       By default, AWS enforces an upper limit of 60. But you can request an increase. Defaults to 30.

```
</details>

<details>


```hcl

       Specifies which requests CloudFront signs. Specify always for the most common use case.
       Allowed values: always, never, and no-override.

```
</details>

<details>


```hcl

       AWS Region for Origin Shield. To specify a region, use the region code, not the region name.
       For example, specify the US East (Ohio) region as us-east-2.

```
</details>

</HclGeneralListItem>
</HclListItem>

### Optional

<HclListItem name="aliases" requirement="optional" type="list(string)">
<HclListItemDescription>

The custom domain name to use instead of the default cloudfront.net domain name (e.g. static.foo.com). Only used if <a href="#create_route53_entries"><code>create_route53_entries</code></a> is true. Names MUST NOT contain trailing `.`

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="comment" requirement="optional" type="string">
<HclListItemDescription>

Any comments you want to include about the distribution.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="continuous_deployment_policy" requirement="optional" type="object(…)">
<HclListItemDescription>

continuous deployment policy. This argument should only be set on a production distribution. See the aws_cloudfront_continuous_deployment_policy resource for additional details.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # Flag to enable continuous deployment policy.
    is_continuous_deployment_policy_enabled = bool

    # CloudFront domain name of the staging distribution.
    staging_distribution_dns_names = optional(object({
      # A list of CloudFront domain names for the staging distribution.
      items = list(string)

      # Number of CloudFront domain names in the staging distribution.
      quantity = number
    }))

    # Parameters for routing production traffic from primary to staging distributions.
    traffic_config = optional(object({
      # Type of traffic configuration. Valid values are SingleWeight and SingleHeader.
      type = string

      # Determines which HTTP requests are sent to the staging distribution.
      single_header_config = optional(object({
        # Request header name to send to the staging distribution. The header must contain the prefix aws-cf-cd-.
        header = string

        # Request header value.
        value = string
      }))

      # Contains the percentage of traffic to send to the staging distribution.
      single_weight_config = optional(object({
        # The percentage of traffic to send to a staging distribution, expressed as a decimal number between 0 and .15.
        weight = number

        # Session stickiness provides the ability to define multiple requests from a single viewer as a single session.
        # This prevents the potentially inconsistent experience of sending some of a given user's requests to the staging distribution,
        # while others are sent to the primary distribution. Define the session duration using TTL values.
        session_stickiness_config = optional(object({
          # The amount of time in seconds after which sessions will cease if no requests are received.
          # Valid values are 300 – 3600 (5–60 minutes). The value must be less than or equal to maximum_ttl.
          idle_ttl = number

          # The maximum amount of time in seconds to consider requests from the viewer as being part of the same session.
          # Valid values are 300 – 3600 (5–60 minutes). The value must be greater than or equal to idle_ttl.
          maximum_ttl = number
        }))
      }))
    }))
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
{
  is_continuous_deployment_policy_enabled = false
}
```

</HclListItemDefaultValue>
<HclGeneralListItem title="More Details">
<details>


```hcl

     CloudFront domain name of the staging distribution.

```
</details>

<details>


```hcl

       Number of CloudFront domain names in the staging distribution.

```
</details>

<details>


```hcl

     Parameters for routing production traffic from primary to staging distributions.

```
</details>

<details>


```hcl

       Determines which HTTP requests are sent to the staging distribution.

```
</details>

<details>


```hcl

         Request header value.

```
</details>

<details>


```hcl

       Contains the percentage of traffic to send to the staging distribution.

```
</details>

<details>


```hcl

         Session stickiness provides the ability to define multiple requests from a single viewer as a single session.
         This prevents the potentially inconsistent experience of sending some of a given user's requests to the staging distribution,
         while others are sent to the primary distribution. Define the session duration using TTL values.

```
</details>

<details>


```hcl

           The maximum amount of time in seconds to consider requests from the viewer as being part of the same session.
           Valid values are 300 – 3600 (5–60 minutes). The value must be greater than or equal to idle_ttl.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="custom_error_response" requirement="optional" type="list(object(…))">
<HclListItemDescription>

One or more custom error response elements.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    # Flag that enables custom error responses for this distribution.
    is_custom_error_response_enabled = bool

    # 4xx or 5xx HTTP status code that you want to customize.
    error_code = optional(number)

    # Minimum amount of time you want HTTP error codes to stay in CloudFront caches
    # before CloudFront queries your origin to see whether the object has been updated.
    error_caching_min_ttl = optional(number)

    # HTTP status code that you want CloudFront to return with the custom error page to the viewer.
    response_code = optional(number)

    # Path of the custom error page (for example, /custom_404.html).
    response_page_path = optional(string)
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

     4xx or 5xx HTTP status code that you want to customize.

```
</details>

<details>


```hcl

     Minimum amount of time you want HTTP error codes to stay in CloudFront caches
     before CloudFront queries your origin to see whether the object has been updated.

```
</details>

<details>


```hcl

     HTTP status code that you want CloudFront to return with the custom error page to the viewer.

```
</details>

<details>


```hcl

     Path of the custom error page (for example, /custom_404.html).

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the S3 bucket and Cloudfront Distribution. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="default_root_object" requirement="optional" type="string">
<HclListItemDescription>

The object that you want CloudFront to return (for example, index.html) when an end user requests the root URL.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether the distribution is enabled to accept end user requests for content.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="geo_restriction" requirement="optional" type="list(object(…))">
<HclListItemDescription>

The restriction configuration for this distribution (geo_restrictions)

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    # Method that you want to use to restrict distribution of your content by country: none, whitelist, or blacklist.
    restriction_type = string

    # ISO 3166-1-alpha-2 codes for which you want CloudFront either to distribute your content (whitelist) or
    # not distribute your content (blacklist). If the type is specified as none an empty array can be used.
    locations = list(string)
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
[
  {
    locations = [],
    restriction_type = "none"
  }
]
```

</HclListItemDefaultValue>
<HclGeneralListItem title="More Details">
<details>


```hcl

     ISO 3166-1-alpha-2 codes for which you want CloudFront either to distribute your content (whitelist) or
     not distribute your content (blacklist). If the type is specified as none an empty array can be used.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="http_version" requirement="optional" type="string">
<HclListItemDescription>

The maximum HTTP version to support on the distribution. Allowed values are http1.1, http2, http2and3 and http3.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;http2&quot;"/>
</HclListItem>

<HclListItem name="is_ipv6_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether the IPv6 is enabled for the distribution.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="is_monitoring_subscription_enabled" requirement="optional" type="bool">
<HclListItemDescription>

When you enable additional metrics for a distribution, CloudFront sends up to 8 metrics to CloudWatch in the US East (N. Virginia) Region. This rate is charged only once per month, per metric (up to 8 metrics per distribution).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="logging_config" requirement="optional" type="object(…)">
<HclListItemDescription>

The logging configuration that controls how logs are written to your distribution (maximum one).

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({

    # Flag to enable logging.
    is_logging_enabled = bool

    # Amazon S3 bucket to store the access logs in, for example, myawslogbucket.s3.amazonaws.com.
    bucket = optional(string)

    # Prefix to the access log filenames for this distribution, for example, myprefix/.
    prefix = optional(string)

    # Whether to include cookies in access logs (default: false).
    include_cookies = optional(bool)
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
{
  is_logging_enabled = false
}
```

</HclListItemDefaultValue>
<HclGeneralListItem title="More Details">
<details>


```hcl

     Flag to enable logging.

```
</details>

<details>


```hcl

     Amazon S3 bucket to store the access logs in, for example, myawslogbucket.s3.amazonaws.com.

```
</details>

<details>


```hcl

     Prefix to the access log filenames for this distribution, for example, myprefix/.

```
</details>

<details>


```hcl

     Whether to include cookies in access logs (default: false).

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="ordered_cache_behavior" requirement="optional" type="map(object(…))">
<HclListItemDescription>

Ordered list of cache behaviors resource for this distribution. List from top to bottom in order of precedence. The topmost cache behavior will have precedence 0.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    # Pattern (for example, images/*.jpg) that specifies which requests you want this cache behavior to apply to.
    # It is present only in ordered_cache_behavior and not in default_cache_behavior.
    path_pattern = optional(string)

    # For attributes description please refer to default_cache_behavior variable.
    target_origin_id       = optional(string)
    allowed_methods        = optional(list(string), ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"])
    cached_methods         = optional(list(string), ["GET", "HEAD"])
    viewer_protocol_policy = optional(string, "redirect-to-https")

    compress           = optional(bool)
    default_ttl        = optional(number)
    max_ttl            = optional(number)
    min_ttl            = optional(number)
    smooth_streaming   = optional(bool)
    trusted_key_groups = optional(list(string))
    trusted_signers    = optional(list(string))

    cache_policy = optional(object({
      min_ttl     = number
      max_ttl     = optional(number)
      default_ttl = optional(number)
      parameters_in_cache_key_and_forwarded_to_origin = object({
        enable_accept_encoding_brotli = optional(bool)
        enable_accept_encoding_gzip   = optional(bool)
        cookies_config = object({
          cookie_behavior = string
          cookies         = optional(list(string))
        })
        headers_config = object({
          header_behavior = string
          headers         = optional(list(string))
        })
        query_strings_config = object({
          query_string_behavior = string
          query_strings         = optional(list(string))
        })
      })
    }))
    origin_request_policy = optional(object({
      cookies_config = object({
        cookie_behavior = string
        cookies         = optional(list(string))
      })
      headers_config = object({
        header_behavior = string
        headers         = optional(list(string))
      })
      query_strings_config = object({
        query_string_behavior = string
        query_strings         = optional(list(string))
      })
    }))
    response_headers_policy = optional(object({
      cors_config = optional(object({
        access_control_allow_credentials = bool
        origin_override                  = bool
        access_control_allow_headers     = list(string)
        access_control_allow_methods     = list(string)
        access_control_allow_origins     = list(string)
        access_control_expose_headers    = optional(list(string))
        access_control_max_age_sec       = optional(number)
      }))
      custom_headers_config = optional(object({
        header   = string
        override = bool
        value    = string
      }))
      remove_headers_config = optional(object({
        header = string
      }))
      security_headers_config = optional(object({
        content_security_policy = optional(object({
          content_security_policy = string
          override                = bool
        }))
        content_type_options = optional(object({
          override = bool
        }))
        frame_options = optional(object({
          frame_option = string
          override     = bool
        }))
        referrer_policy = optional(object({
          referrer_policy = string
          override        = bool
        }))
        strict_transport_security = optional(object({
          access_control_max_age_sec = string
          override                   = bool
          include_subdomains         = optional(bool)
          preload                    = optional(string)
        }))
        xss_protection = optional(object({
          protection = bool
          override   = bool
          mode_block = optional(bool)
          report_uri = optional(string)
        }))
      }))
      server_timing_headers_config = optional(object({
        enabled       = bool
        sampling_rate = number
      }))
    }))

    existing_cache_policy_id            = optional(string)
    existing_origin_request_policy_id   = optional(string)
    existing_response_headers_policy_id = optional(string)

    field_level_encryption = optional(object({
      content_type_profile_config = object({
        forward_when_content_type_is_unknown = bool
        content_type                         = string
        format                               = string
      })
      query_arg_profile_config = object({
        forward_when_query_arg_profile_is_unknown = bool
      })
    }))
    realtime_log_config = optional(object({
      sampling_rate      = number
      fields             = list(string)
      kinesis_stream_arn = string
    }))

    lambda_function_association = optional(object({
      viewer-request  = optional(object({ lambda_arn = string, include_body = optional(bool) }))
      origin-request  = optional(object({ lambda_arn = string, include_body = optional(bool) }))
      viewer-response = optional(object({ lambda_arn = string, include_body = optional(bool) }))
      origin-response = optional(object({ lambda_arn = string, include_body = optional(bool) }))
    }), {})
    function_association = optional(object({
      viewer-request  = optional(object({ function_arn = string }))
      viewer-response = optional(object({ function_arn = string }))
    }), {})
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

     For attributes description please refer to default_cache_behavior variable.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="origin_groups" requirement="optional" type="map(object(…))">
<HclListItemDescription>

One or more origin_group for this distribution (multiples allowed).

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    # Unique identifier for the origin.
    origin_id = optional(string)

    # List of HTTP status codes for the origin group.
    failover_criteria_status_codes = optional(list(number))

    # Unique identifier of the member origin.
    member_origin_ids = list(string)
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

     List of HTTP status codes for the origin group.

```
</details>

<details>


```hcl

     Unique identifier of the member origin.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="price_class" requirement="optional" type="string">
<HclListItemDescription>

The price class for this distribution. One of PriceClass_All, PriceClass_200, PriceClass_100. Higher price classes support more edge locations, but cost more. See: https://aws.amazon.com/cloudfront/pricing/#price-classes.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;PriceClass_100&quot;"/>
</HclListItem>

<HclListItem name="retain_on_delete" requirement="optional" type="bool">
<HclListItemDescription>

Disables the distribution instead of deleting it when destroying the resource through Terraform. If this is set, the distribution needs to be deleted manually afterwards.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="staging" requirement="optional" type="bool">
<HclListItemDescription>

Whether the distribution is a staging distribution. https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/continuous-deployment-workflow.html

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="viewer_certificate" requirement="optional" type="object(…)">
<HclListItemDescription>

The SSL configuration for this distribution. Please see variable definition for detailed fields description.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({

    # ARN of the AWS Certificate Manager certificate that you wish to use with this distribution.
    # The ACM certificate must be in US-EAST-1.
    # Specify this, cloudfront_default_certificate, or iam_certificate_id.
    acm_certificate_arn = optional(string)

    # true if you want viewers to use HTTPS to request your objects and
    # you're using the CloudFront domain name for your distribution.
    # Specify this, acm_certificate_arn, or iam_certificate_id.
    cloudfront_default_certificate = optional(bool)

    # IAM certificate identifier of the custom viewer certificate for this distribution
    # if you are using a custom domain.
    # Specify this, acm_certificate_arn, or cloudfront_default_certificate.
    iam_certificate_id = optional(string)

    # Minimum version of the SSL protocol that you want CloudFront to use for HTTPS connections.
    # Can only be set if cloudfront_default_certificate = false.
    # Some examples include: TLSv1.2_2019 and TLSv1.2_2021. Default: TLSv1.
    # NOTE:
    # - If you are using a custom certificate (specified with acm_certificate_arn or iam_certificate_id),
    # and have specified sni-only in ssl_support_method, TLSv1 or later must be specified.
    # - If you have specified vip in ssl_support_method, only SSLv3 or TLSv1 can be specified.
    # - If you have specified cloudfront_default_certificate, TLSv1 must be specified.
    minimum_protocol_version = optional(string)

    # How you want CloudFront to serve HTTPS requests. One of vip, sni-only, or static-ip.
    # Required if you specify acm_certificate_arn or iam_certificate_id.
    # NOTE:
    # vip causes CloudFront to use a dedicated IP address and may incur extra charges.
    ssl_support_method = optional(string)
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
{
  cloudfront_default_certificate = true,
  minimum_protocol_version = "TLSv1.2_2021",
  ssl_support_method = "sni-only"
}
```

</HclListItemDefaultValue>
<HclGeneralListItem title="More Details">
<details>


```hcl

     ARN of the AWS Certificate Manager certificate that you wish to use with this distribution.
     The ACM certificate must be in US-EAST-1.
     Specify this, cloudfront_default_certificate, or iam_certificate_id.

```
</details>

<details>


```hcl

     true if you want viewers to use HTTPS to request your objects and
     you're using the CloudFront domain name for your distribution.
     Specify this, acm_certificate_arn, or iam_certificate_id.

```
</details>

<details>


```hcl

     IAM certificate identifier of the custom viewer certificate for this distribution
     if you are using a custom domain.
     Specify this, acm_certificate_arn, or cloudfront_default_certificate.

```
</details>

<details>


```hcl

     Minimum version of the SSL protocol that you want CloudFront to use for HTTPS connections.
     Can only be set if cloudfront_default_certificate = false.
     Some examples include: TLSv1.2_2019 and TLSv1.2_2021. Default: TLSv1.
     NOTE:
     - If you are using a custom certificate (specified with acm_certificate_arn or iam_certificate_id),
     and have specified sni-only in ssl_support_method, TLSv1 or later must be specified.
     - If you have specified vip in ssl_support_method, only SSLv3 or TLSv1 can be specified.
     - If you have specified cloudfront_default_certificate, TLSv1 must be specified.

```
</details>

<details>


```hcl

     How you want CloudFront to serve HTTPS requests. One of vip, sni-only, or static-ip.
     Required if you specify acm_certificate_arn or iam_certificate_id.
     NOTE:
     vip causes CloudFront to use a dedicated IP address and may incur extra charges.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="wait_for_deployment" requirement="optional" type="bool">
<HclListItemDescription>

If enabled, the resource will wait for the distribution status to change from InProgress to Deployed. Setting this to false will skip the process.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="web_acl_id" requirement="optional" type="string">
<HclListItemDescription>

Unique identifier that specifies the AWS WAF web ACL, if any, to associate with this distribution. See variable declaration for details

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="cloudfront_distribution_domain_name">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v0.19.1/modules/cloudfront/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v0.19.1/modules/cloudfront/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-static-assets/tree/v0.19.1/modules/cloudfront/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "47734ab6c8528e363a196d94aea51b52"
}
##DOCS-SOURCER-END -->
