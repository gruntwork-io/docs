import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Public Static Website

Deploy your static content and static websites on S3, using a CloudFront CDN. Supports bucket versioning, redirects, and access logging.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/public-static-website" class="link-button">View on GitHub</a>

<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <table>
        <thead>
            <tr>
                <td>Variable name</td>
                <td>Description</td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td>acm_certificate_domain_name</td>
        <td>The domain name for which an ACM cert has been issued (e.g. *.foo.com). Only used if var.create_route53_entry is true. Set to blank otherwise.</td>
    </tr><tr>
        <td>base_domain_name</td>
        <td>The domain name associated with a hosted zone in Route 53. Usually the base domain name of var.website_domain_name (e.g. foo.com). This is used to find the hosted zone that will be used for the CloudFront distribution. If var.create_route53_entry is true, one of base_domain_name or var.hosted_zone_id must be provided.</td>
    </tr><tr>
        <td>base_domain_name_tags</td>
        <td>The tags associated with var.base_domain_name. If there are multiple hosted zones for the same base_domain_name, this will help filter the hosted zones so that the correct hosted zone is found.</td>
    </tr><tr>
        <td>create_route53_entry</td>
        <td>If set to true, create a DNS A Record in Route 53. If var.create_route53_entry is true, one of base_domain_name or var.hosted_zone_id must be provided.</td>
    </tr><tr>
        <td>custom_tags</td>
        <td>A map of custom tags to apply to the S3 bucket containing the website and the CloudFront distribution created for it. The key is the tag name and the value is the tag value.</td>
    </tr><tr>
        <td>default_ttl</td>
        <td>The default amount of time, in seconds, that an object is in a CloudFront cache before CloudFront forwards another request in the absence of an 'Cache-Control max-age' or 'Expires' header.</td>
    </tr><tr>
        <td>error_document</td>
        <td>The path to the error document in the S3 bucket (e.g. error.html).</td>
    </tr><tr>
        <td>force_destroy</td>
        <td>If set to true, this will force the delete of the website, redirect, and access log S3 buckets when you run terraform destroy, even if there is still content in those buckets. This is only meant for testing and should not be used in production.</td>
    </tr><tr>
        <td>geo_locations_list</td>
        <td>The ISO 3166-1-alpha-2 codes for which you want CloudFront either to distribute your content (if var.geo_restriction_type is whitelist) or not distribute your content (if var.geo_restriction_type is blacklist).</td>
    </tr><tr>
        <td>geo_restriction_type</td>
        <td>The method that you want to use to restrict distribution of your content by country: none, whitelist, or blacklist.</td>
    </tr><tr>
        <td>hosted_zone_id</td>
        <td>The ID of the Route 53 Hosted Zone in which to create the DNS A Records specified in var.website_domain_name. If var.create_route53_entry is true, one of base_domain_name or var.hosted_zone_id must be provided.</td>
    </tr><tr>
        <td>index_document</td>
        <td>The path to the index document in the S3 bucket (e.g. index.html).</td>
    </tr><tr>
        <td>max_ttl</td>
        <td>The maximum amount of time, in seconds, that an object is in a CloudFront cache before CloudFront forwards another request to your origin to determine whether the object has been updated. Only effective in the presence of 'Cache-Control max-age', 'Cache-Control s-maxage', and 'Expires' headers.</td>
    </tr><tr>
        <td>min_ttl</td>
        <td>The minimum amount of time that you want objects to stay in CloudFront caches before CloudFront queries your origin to see whether the object has been updated.</td>
    </tr><tr>
        <td>routing_rules</td>
        <td>A json array containing routing rules describing redirect behavior and when redirects are applied. For routing rule syntax, see: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-websiteconfiguration-routingrules.html. This will only be used if var.should_redirect_all_requests is false</td>
    </tr><tr>
        <td>viewer_protocol_policy</td>
        <td>Use this element to specify the protocol that users can use to access the files in the origin specified by TargetOriginId when a request matches the path pattern in PathPattern. One of allow-all, https-only, or redirect-to-https.</td>
    </tr><tr>
        <td>website_domain_name</td>
        <td>The name of the website and the S3 bucket to create (e.g. static.foo.com).</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <table>
        <thead>
            <tr>
                <td>Variable name</td>
                <td>Description</td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td>cloudfront_access_logs_bucket_arn</td>
        <td>The ARN of the created S3 bucket associated with the website's CloudFront access logs.</td>
    </tr><tr>
        <td>cloudfront_domain_names</td>
        <td>The domain names created for the CloudFront Distribution. Should be the same as the input var.website_domain_name.</td>
    </tr><tr>
        <td>cloudfront_id</td>
        <td>The CloudFront ID of the created CloudFront Distribution.</td>
    </tr><tr>
        <td>website_access_logs_bucket_arn</td>
        <td>The ARN of the created S3 bucket associated with the website access logs.</td>
    </tr><tr>
        <td>website_s3_bucket_arn</td>
        <td>The ARN of the created S3 bucket associated with the website.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"eb2b238bb82a2a79e9fecff900462ddd"}
##DOCS-SOURCER-END -->
