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
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.85.2" lastModifiedVersion="0.83.0"/>

# Public Static Website


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/patcher%2Fhashicorp-terraform-1.x/modules/services/public-static-website" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=services%2Fpublic-static-website" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

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
hosted in a Public Hosted Zone in Route 53. You may provide a `hosted_zone_id` in [variables](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/patcher%2Fhashicorp-terraform-1.x/modules/services/public-static-website/variables.tf),
or you may provide the `base_domain_name` associated with your Public Hosted Zone in Route 53, optionally along with
any tags that must match that zone in `base_domain_name_tags`. If you do the latter, this module will find the hosted
zone id for you.

For more info on why you would use S3 to store static content, why you may want a CDN in front of it, how to access the
website, and how to configure SSL, check out the documentation for the
[s3-static-website](https://github.com/gruntwork-io/terraform-aws-static-assets/tree/master/modules/s3-static-website)
and [s3-cloudfront](https://github.com/gruntwork-io/terraform-aws-static-assets/tree/master/modules/s3-cloudfront)
modules.

*   [Quick Start](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/patcher%2Fhashicorp-terraform-1.x/modules/services/public-static-website/core-concepts.md#quick-start)
*   [How to test the website](https://github.com/gruntwork-io/terraform-aws-static-assets/blob/master/modules/s3-static-website/core-concepts.md#how-to-test-the-website)
*   [How to configure HTTPS (SSL) or a CDN?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/patcher%2Fhashicorp-terraform-1.x/modules/services/public-static-website/core-concepts.md#how-to-configure-https-ssl-or-a-cdn)
*   [How to handle www + root domains](https://github.com/gruntwork-io/terraform-aws-static-assets/blob/master/modules/s3-static-website/core-concepts.md#how-do-i-handle-www—root-domains)
*   [How do I configure Cross Origin Resource Sharing (CORS)?](https://github.com/gruntwork-io/terraform-aws-static-assets/blob/master/modules/s3-static-website/core-concepts.md#how-do-i-configure-cross-origin-resource-sharing-cors)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/patcher%2Fhashicorp-terraform-1.x/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.
*   [examples](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/patcher%2Fhashicorp-terraform-1.x/examples): This folder contains working examples of how to use the submodules.
*   [test](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/patcher%2Fhashicorp-terraform-1.x/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/patcher%2Fhashicorp-terraform-1.x/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/patcher%2Fhashicorp-terraform-1.x/examples/for-learning-and-testing/services/public-static-website/example-website):
    The `examples/for-production` folder contains sample code optimized for direct usage in production. This is code from
    the [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

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

The domain name associated with a hosted zone in Route 53. Usually the base domain name of <a href="#website_domain_name"><code>website_domain_name</code></a> (e.g. foo.com). This is used to find the hosted zone that will be used for the CloudFront distribution. If <a href="#create_route53_entry"><code>create_route53_entry</code></a> is true, one of base_domain_name or <a href="#hosted_zone_id"><code>hosted_zone_id</code></a> must be provided.

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

<HclListItem name="create_route53_entry" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, create a DNS A Record in Route 53. If <a href="#create_route53_entry"><code>create_route53_entry</code></a> is true, one of base_domain_name or <a href="#hosted_zone_id"><code>hosted_zone_id</code></a> must be provided.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the S3 bucket containing the website and the CloudFront distribution created for it. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="default_ttl" requirement="optional" type="number">
<HclListItemDescription>

The default amount of time, in seconds, that an object is in a CloudFront cache before CloudFront forwards another request in the absence of an 'Cache-Control max-age' or 'Expires' header.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="error_document" requirement="optional" type="string">
<HclListItemDescription>

The path to the error document in the S3 bucket (e.g. error.html).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;error.html&quot;"/>
</HclListItem>

<HclListItem name="force_destroy" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, this will force the delete of the website, redirect, and access log S3 buckets when you run terraform destroy, even if there is still content in those buckets. This is only meant for testing and should not be used in production.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
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

The ID of the Route 53 Hosted Zone in which to create the DNS A Records specified in <a href="#website_domain_name"><code>website_domain_name</code></a>. If <a href="#create_route53_entry"><code>create_route53_entry</code></a> is true, one of base_domain_name or <a href="#hosted_zone_id"><code>hosted_zone_id</code></a> must be provided.

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

<HclListItem name="routing_rules" requirement="optional" type="string">
<HclListItemDescription>

A json array containing routing rules describing redirect behavior and when redirects are applied. For routing rule syntax, see: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-websiteconfiguration-routingrules.html. This will only be used if <a href="#should_redirect_all_requests"><code>should_redirect_all_requests</code></a> is false

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="viewer_protocol_policy" requirement="optional" type="string">
<HclListItemDescription>

Use this element to specify the protocol that users can use to access the files in the origin specified by TargetOriginId when a request matches the path pattern in PathPattern. One of allow-all, https-only, or redirect-to-https.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;allow-all&quot;"/>
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
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/patcher%2Fhashicorp-terraform-1.x/modules%2Fservices%2Fpublic-static-website%2FREADME.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/patcher%2Fhashicorp-terraform-1.x/modules%2Fservices%2Fpublic-static-website%2Fvariables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/patcher%2Fhashicorp-terraform-1.x/modules%2Fservices%2Fpublic-static-website%2Foutputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "f2dfccb559c55de55e3797d75228dd81"
}
##DOCS-SOURCER-END -->
