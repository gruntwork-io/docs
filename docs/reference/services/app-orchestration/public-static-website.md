import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Public Static Website

Deploy your static content and static websites on S3, using a CloudFront CDN. Supports bucket versioning, redirects, and access logging.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/public-static-website" className="link-button">View on GitHub</a>

### Reference 

<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <table>
        <thead>
            <tr>
                <td><b>Variable name</b></td>
                <td><b>Description</b></td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td><a name="acm_certificate_domain_name" href="#acm_certificate_domain_name" className="snap-top"><code>acm_certificate_domain_name</code></a></td>
        <td>The domain name for which an ACM cert has been issued (e.g. *.foo.com). Only used if var.create_route53_entry is true. Set to blank otherwise.</td>
    </tr><tr>
        <td><a name="base_domain_name" href="#base_domain_name" className="snap-top"><code>base_domain_name</code></a></td>
        <td>The domain name associated with a hosted zone in Route 53. Usually the base domain name of var.website_domain_name (e.g. foo.com). This is used to find the hosted zone that will be used for the CloudFront distribution. If var.create_route53_entry is true, one of base_domain_name or var.hosted_zone_id must be provided.</td>
    </tr><tr>
        <td><a name="base_domain_name_tags" href="#base_domain_name_tags" className="snap-top"><code>base_domain_name_tags</code></a></td>
        <td>The tags associated with var.base_domain_name. If there are multiple hosted zones for the same base_domain_name, this will help filter the hosted zones so that the correct hosted zone is found.</td>
    </tr><tr>
        <td><a name="create_route53_entry" href="#create_route53_entry" className="snap-top"><code>create_route53_entry</code></a></td>
        <td>If set to true, create a DNS A Record in Route 53. If var.create_route53_entry is true, one of base_domain_name or var.hosted_zone_id must be provided.</td>
    </tr><tr>
        <td><a name="custom_tags" href="#custom_tags" className="snap-top"><code>custom_tags</code></a></td>
        <td>A map of custom tags to apply to the S3 bucket containing the website and the CloudFront distribution created for it. The key is the tag name and the value is the tag value.</td>
    </tr><tr>
        <td><a name="default_ttl" href="#default_ttl" className="snap-top"><code>default_ttl</code></a></td>
        <td>The default amount of time, in seconds, that an object is in a CloudFront cache before CloudFront forwards another request in the absence of an 'Cache-Control max-age' or 'Expires' header.</td>
    </tr><tr>
        <td><a name="error_document" href="#error_document" className="snap-top"><code>error_document</code></a></td>
        <td>The path to the error document in the S3 bucket (e.g. error.html).</td>
    </tr><tr>
        <td><a name="force_destroy" href="#force_destroy" className="snap-top"><code>force_destroy</code></a></td>
        <td>If set to true, this will force the delete of the website, redirect, and access log S3 buckets when you run terraform destroy, even if there is still content in those buckets. This is only meant for testing and should not be used in production.</td>
    </tr><tr>
        <td><a name="geo_locations_list" href="#geo_locations_list" className="snap-top"><code>geo_locations_list</code></a></td>
        <td>The ISO 3166-1-alpha-2 codes for which you want CloudFront either to distribute your content (if var.geo_restriction_type is whitelist) or not distribute your content (if var.geo_restriction_type is blacklist).</td>
    </tr><tr>
        <td><a name="geo_restriction_type" href="#geo_restriction_type" className="snap-top"><code>geo_restriction_type</code></a></td>
        <td>The method that you want to use to restrict distribution of your content by country: none, whitelist, or blacklist.</td>
    </tr><tr>
        <td><a name="hosted_zone_id" href="#hosted_zone_id" className="snap-top"><code>hosted_zone_id</code></a></td>
        <td>The ID of the Route 53 Hosted Zone in which to create the DNS A Records specified in var.website_domain_name. If var.create_route53_entry is true, one of base_domain_name or var.hosted_zone_id must be provided.</td>
    </tr><tr>
        <td><a name="index_document" href="#index_document" className="snap-top"><code>index_document</code></a></td>
        <td>The path to the index document in the S3 bucket (e.g. index.html).</td>
    </tr><tr>
        <td><a name="max_ttl" href="#max_ttl" className="snap-top"><code>max_ttl</code></a></td>
        <td>The maximum amount of time, in seconds, that an object is in a CloudFront cache before CloudFront forwards another request to your origin to determine whether the object has been updated. Only effective in the presence of 'Cache-Control max-age', 'Cache-Control s-maxage', and 'Expires' headers.</td>
    </tr><tr>
        <td><a name="min_ttl" href="#min_ttl" className="snap-top"><code>min_ttl</code></a></td>
        <td>The minimum amount of time that you want objects to stay in CloudFront caches before CloudFront queries your origin to see whether the object has been updated.</td>
    </tr><tr>
        <td><a name="routing_rules" href="#routing_rules" className="snap-top"><code>routing_rules</code></a></td>
        <td>A json array containing routing rules describing redirect behavior and when redirects are applied. For routing rule syntax, see: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-websiteconfiguration-routingrules.html. This will only be used if var.should_redirect_all_requests is false</td>
    </tr><tr>
        <td><a name="viewer_protocol_policy" href="#viewer_protocol_policy" className="snap-top"><code>viewer_protocol_policy</code></a></td>
        <td>Use this element to specify the protocol that users can use to access the files in the origin specified by TargetOriginId when a request matches the path pattern in PathPattern. One of allow-all, https-only, or redirect-to-https.</td>
    </tr><tr>
        <td><a name="website_domain_name" href="#website_domain_name" className="snap-top"><code>website_domain_name</code></a></td>
        <td>The name of the website and the S3 bucket to create (e.g. static.foo.com).</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <table>
        <thead>
            <tr>
              <td><b>Variable name</b></td>
              <td><b>Description</b></td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td><a name="cloudfront_access_logs_bucket_arn" href="#cloudfront_access_logs_bucket_arn" className="snap-top"><code>cloudfront_access_logs_bucket_arn</code></a></td>
        <td>The ARN of the created S3 bucket associated with the website's CloudFront access logs.</td>
    </tr><tr>
        <td><a name="cloudfront_domain_names" href="#cloudfront_domain_names" className="snap-top"><code>cloudfront_domain_names</code></a></td>
        <td>The domain names created for the CloudFront Distribution. Should be the same as the input var.website_domain_name.</td>
    </tr><tr>
        <td><a name="cloudfront_id" href="#cloudfront_id" className="snap-top"><code>cloudfront_id</code></a></td>
        <td>The CloudFront ID of the created CloudFront Distribution.</td>
    </tr><tr>
        <td><a name="website_access_logs_bucket_arn" href="#website_access_logs_bucket_arn" className="snap-top"><code>website_access_logs_bucket_arn</code></a></td>
        <td>The ARN of the created S3 bucket associated with the website access logs.</td>
    </tr><tr>
        <td><a name="website_s3_bucket_arn" href="#website_s3_bucket_arn" className="snap-top"><code>website_s3_bucket_arn</code></a></td>
        <td>The ARN of the created S3 bucket associated with the website.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"a4f758211de019751b65203784c66cf8"}
##DOCS-SOURCER-END -->
