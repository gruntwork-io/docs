import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Public Static Website

Deploy your static content and static websites on S3, using a CloudFront CDN. Supports bucket versioning, redirects, and access logging.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/public-static-website" className="link-button">View on GitHub</a>

### Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<a name="acm_certificate_domain_name" className="snap-top"></a>

* [**`acm_certificate_domain_name`**](#acm_certificate_domain_name) &mdash; The domain name for which an ACM cert has been issued (e.g. *.foo.com). Only used if [`create_route53_entry`](#create_route53_entry) is true. Set to blank otherwise.

<a name="base_domain_name" className="snap-top"></a>

* [**`base_domain_name`**](#base_domain_name) &mdash; The domain name associated with a hosted zone in Route 53. Usually the base domain name of [`website_domain_name`](#website_domain_name) (e.g. foo.com). This is used to find the hosted zone that will be used for the CloudFront distribution. If [`create_route53_entry`](#create_route53_entry) is true, one of [`base_domain_name`](#base_domain_name) or [`hosted_zone_id`](#hosted_zone_id) must be provided.

<a name="base_domain_name_tags" className="snap-top"></a>

* [**`base_domain_name_tags`**](#base_domain_name_tags) &mdash; The tags associated with [`base_domain_name`](#base_domain_name). If there are multiple hosted zones for the same [`base_domain_name`](#base_domain_name), this will help filter the hosted zones so that the correct hosted zone is found.

<a name="create_route53_entry" className="snap-top"></a>

* [**`create_route53_entry`**](#create_route53_entry) &mdash; If set to true, create a DNS A Record in Route 53. If [`create_route53_entry`](#create_route53_entry) is true, one of [`base_domain_name`](#base_domain_name) or [`hosted_zone_id`](#hosted_zone_id) must be provided.

<a name="custom_tags" className="snap-top"></a>

* [**`custom_tags`**](#custom_tags) &mdash; A map of custom tags to apply to the S3 bucket containing the website and the CloudFront distribution created for it. The key is the tag name and the value is the tag value.

<a name="default_ttl" className="snap-top"></a>

* [**`default_ttl`**](#default_ttl) &mdash; The default amount of time, in seconds, that an object is in a CloudFront cache before CloudFront forwards another request in the absence of an 'Cache-Control max-age' or 'Expires' header.

<a name="error_document" className="snap-top"></a>

* [**`error_document`**](#error_document) &mdash; The path to the error document in the S3 bucket (e.g. error.html).

<a name="force_destroy" className="snap-top"></a>

* [**`force_destroy`**](#force_destroy) &mdash; If set to true, this will force the delete of the website, redirect, and access log S3 buckets when you run terraform destroy, even if there is still content in those buckets. This is only meant for testing and should not be used in production.

<a name="geo_locations_list" className="snap-top"></a>

* [**`geo_locations_list`**](#geo_locations_list) &mdash; The ISO 3166-1-alpha-2 codes for which you want CloudFront either to distribute your content (if [`geo_restriction_type`](#geo_restriction_type) is whitelist) or not distribute your content (if [`geo_restriction_type`](#geo_restriction_type) is blacklist).

<a name="geo_restriction_type" className="snap-top"></a>

* [**`geo_restriction_type`**](#geo_restriction_type) &mdash; The method that you want to use to restrict distribution of your content by country: none, whitelist, or blacklist.

<a name="hosted_zone_id" className="snap-top"></a>

* [**`hosted_zone_id`**](#hosted_zone_id) &mdash; The ID of the Route 53 Hosted Zone in which to create the DNS A Records specified in [`website_domain_name`](#website_domain_name). If [`create_route53_entry`](#create_route53_entry) is true, one of [`base_domain_name`](#base_domain_name) or [`hosted_zone_id`](#hosted_zone_id) must be provided.

<a name="index_document" className="snap-top"></a>

* [**`index_document`**](#index_document) &mdash; The path to the index document in the S3 bucket (e.g. index.html).

<a name="max_ttl" className="snap-top"></a>

* [**`max_ttl`**](#max_ttl) &mdash; The maximum amount of time, in seconds, that an object is in a CloudFront cache before CloudFront forwards another request to your origin to determine whether the object has been updated. Only effective in the presence of 'Cache-Control max-age', 'Cache-Control s-maxage', and 'Expires' headers.

<a name="min_ttl" className="snap-top"></a>

* [**`min_ttl`**](#min_ttl) &mdash; The minimum amount of time that you want objects to stay in CloudFront caches before CloudFront queries your origin to see whether the object has been updated.

<a name="routing_rules" className="snap-top"></a>

* [**`routing_rules`**](#routing_rules) &mdash; A json array containing routing rules describing redirect behavior and when redirects are applied. For routing rule syntax, see: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-websiteconfiguration-routingrules.html. This will only be used if [`should_redirect_all_requests`](#should_redirect_all_requests) is false

<a name="viewer_protocol_policy" className="snap-top"></a>

* [**`viewer_protocol_policy`**](#viewer_protocol_policy) &mdash; Use this element to specify the protocol that users can use to access the files in the origin specified by TargetOriginId when a request matches the path pattern in PathPattern. One of allow-all, https-only, or redirect-to-https.

<a name="website_domain_name" className="snap-top"></a>

* [**`website_domain_name`**](#website_domain_name) &mdash; The name of the website and the S3 bucket to create (e.g. static.foo.com).

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="cloudfront_access_logs_bucket_arn" className="snap-top"></a>

* [**`cloudfront_access_logs_bucket_arn`**](#cloudfront_access_logs_bucket_arn) &mdash; The ARN of the created S3 bucket associated with the website's CloudFront access logs.

<a name="cloudfront_domain_names" className="snap-top"></a>

* [**`cloudfront_domain_names`**](#cloudfront_domain_names) &mdash; The domain names created for the CloudFront Distribution. Should be the same as the input [`website_domain_name`](#website_domain_name).

<a name="cloudfront_id" className="snap-top"></a>

* [**`cloudfront_id`**](#cloudfront_id) &mdash; The CloudFront ID of the created CloudFront Distribution.

<a name="website_access_logs_bucket_arn" className="snap-top"></a>

* [**`website_access_logs_bucket_arn`**](#website_access_logs_bucket_arn) &mdash; The ARN of the created S3 bucket associated with the website access logs.

<a name="website_s3_bucket_arn" className="snap-top"></a>

* [**`website_s3_bucket_arn`**](#website_s3_bucket_arn) &mdash; The ARN of the created S3 bucket associated with the website.

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"03605e66ac78a1f3e74c36667456f8b0"}
##DOCS-SOURCER-END -->
