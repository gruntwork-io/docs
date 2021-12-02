import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Elastic Load Balancer (ELB)

Deploy the Application Load Balancer (ALB) for load balancing HTTP and HTTPS, with support for routing rules and WebSockets.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/networking/alb" class="link-button">View on GitHub</a>

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
        <td>access_logs_s3_bucket_name</td>
        <td>The name to use for the S3 bucket where the ALB access logs will be stored. If you set this to null, a name will be generated automatically based on var.alb_name.</td>
    </tr><tr>
        <td>acm_cert_statuses</td>
        <td>When looking up the ACM certs passed in via https_listener_ports_and_acm_ssl_certs, only match certs with the given statuses. Valid values are PENDING_VALIDATION, ISSUED, INACTIVE, EXPIRED, VALIDATION_TIMED_OUT, REVOKED and FAILED.</td>
    </tr><tr>
        <td>acm_cert_types</td>
        <td>When looking up the ACM certs passed in via https_listener_ports_and_acm_ssl_certs, only match certs of the given types. Valid values are AMAZON_ISSUED and IMPORTED.</td>
    </tr><tr>
        <td>alb_name</td>
        <td>The name of the ALB.</td>
    </tr><tr>
        <td>allow_all_outbound</td>
        <td>Set to true to enable all outbound traffic on this ALB. If set to false, the ALB will allow no outbound traffic by default. This will make the ALB unusuable, so some other code must then update the ALB Security Group to enable outbound access!</td>
    </tr><tr>
        <td>allow_inbound_from_cidr_blocks</td>
        <td>The CIDR-formatted IP Address range from which this ALB will allow incoming requests. If var.is_internal_alb is false, use the default value. If var.is_internal_alb is true, consider setting this to the VPC's CIDR Block, or something even more restrictive.</td>
    </tr><tr>
        <td>allow_inbound_from_security_group_ids</td>
        <td>The list of IDs of security groups that should have access to the ALB</td>
    </tr><tr>
        <td>create_route53_entry</td>
        <td>Set to true to create a Route 53 DNS A record for this ALB?</td>
    </tr><tr>
        <td>custom_tags</td>
        <td>A map of custom tags to apply to the ALB and its Security Group. The key is the tag name and the value is the tag value.</td>
    </tr><tr>
        <td>default_action_body</td>
        <td>If a request to the load balancer does not match any of your listener rules, the default action will return a fixed response with this body.</td>
    </tr><tr>
        <td>default_action_content_type</td>
        <td>If a request to the load balancer does not match any of your listener rules, the default action will return a fixed response with this content type.</td>
    </tr><tr>
        <td>default_action_status_code</td>
        <td>If a request to the load balancer does not match any of your listener rules, the default action will return a fixed response with this status code.</td>
    </tr><tr>
        <td>domain_names</td>
        <td>The list of domain names for the DNS A record to add for the ALB (e.g. alb.foo.com). Only used if var.create_route53_entry is true.</td>
    </tr><tr>
        <td>drop_invalid_header_fields</td>
        <td>If true, the ALB will drop invalid headers. Elastic Load Balancing requires that message header names contain only alphanumeric characters and hyphens.</td>
    </tr><tr>
        <td>enable_deletion_protection</td>
        <td>Enable deletion protection on the ALB instance. If this is enabled, the load balancer cannot be deleted prior to disabling</td>
    </tr><tr>
        <td>force_destroy</td>
        <td>A boolean that indicates whether the access logs bucket should be destroyed, even if there are files in it, when you run Terraform destroy. Unless you are using this bucket only for test purposes, you'll want to leave this variable set to false.</td>
    </tr><tr>
        <td>hosted_zone_id</td>
        <td>The ID of the hosted zone for the DNS A record to add for the ALB. Only used if var.create_route53_entry is true.</td>
    </tr><tr>
        <td>http_listener_ports</td>
        <td>A list of ports for which an HTTP Listener should be created on the ALB. Tip: When you define Listener Rules for these Listeners, be sure that, for each Listener, at least one Listener Rule  uses the '*' path to ensure that every possible request path for that Listener is handled by a Listener Rule. Otherwise some requests won't route to any Target Group.</td>
    </tr><tr>
        <td>https_listener_ports_and_acm_ssl_certs</td>
        <td>A list of the ports for which an HTTPS Listener should be created on the ALB. Each item in the list should be a map with the keys 'port', the port number to listen on, and 'tls_domain_name', the domain name of an SSL/TLS certificate issued by the Amazon Certificate Manager (ACM) to associate with the Listener to be created. If your certificate isn't issued by ACM, specify var.https_listener_ports_and_ssl_certs instead. Tip: When you define Listener Rules for these Listeners, be sure that, for each Listener, at least one Listener Rule  uses the '*' path to ensure that every possible request path for that Listener is handled by a Listener Rule. Otherwise some requests won't route to any Target Group.</td>
    </tr><tr>
        <td>https_listener_ports_and_ssl_certs</td>
        <td>A list of the ports for which an HTTPS Listener should be created on the ALB. Each item in the list should be a map with the keys 'port', the port number to listen on, and 'tls_arn', the Amazon Resource Name (ARN) of the SSL/TLS certificate to associate with the Listener to be created. If your certificate is issued by the Amazon Certificate Manager (ACM), specify var.https_listener_ports_and_acm_ssl_certs instead. Tip: When you define Listener Rules for these Listeners, be sure that, for each Listener, at least one Listener Rule  uses the '*' path to ensure that every possible request path for that Listener is handled by a Listener Rule. Otherwise some requests won't route to any Target Group.</td>
    </tr><tr>
        <td>idle_timeout</td>
        <td>The time in seconds that the client TCP connection to the ALB is allowed to be idle before the ALB closes the TCP connection.</td>
    </tr><tr>
        <td>is_internal_alb</td>
        <td>If the ALB should only accept traffic from within the VPC, set this to true. If it should accept traffic from the public Internet, set it to false.</td>
    </tr><tr>
        <td>num_days_after_which_archive_log_data</td>
        <td>After this number of days, log files should be transitioned from S3 to Glacier. Enter 0 to never archive log data.</td>
    </tr><tr>
        <td>num_days_after_which_delete_log_data</td>
        <td>After this number of days, log files should be deleted from S3. Enter 0 to never delete log data.</td>
    </tr><tr>
        <td>should_create_access_logs_bucket</td>
        <td>If true, create a new S3 bucket for access logs with the name in var.access_logs_s3_bucket_name. If false, assume the S3 bucket for access logs with the name in  var.access_logs_s3_bucket_name already exists, and don't create a new one. Note that if you set this to false, it's up to you to ensure that the S3 bucket has a bucket policy that grants Elastic Load Balancing permission to write the access logs to your bucket.</td>
    </tr><tr>
        <td>ssl_policy</td>
        <td>The AWS predefined TLS/SSL policy for the ALB. A List of policies can be found here: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html#describe-ssl-policies. AWS recommends ELBSecurityPolicy-2016-08 policy for general use but this policy includes TLSv1.0 which is rapidly being phased out. ELBSecurityPolicy-TLS-1-1-2017-01 is the next policy up that doesn't include TLSv1.0.</td>
    </tr><tr>
        <td>vpc_id</td>
        <td>ID of the VPC where the ALB will be deployed</td>
    </tr><tr>
        <td>vpc_subnet_ids</td>
        <td>The ids of the subnets that the ALB can use to source its IP</td>
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
        <td>alb_access_logs_bucket</td>
        <td>The name of the S3 bucket containing the ALB access logs</td>
    </tr><tr>
        <td>alb_arn</td>
        <td>The ARN of the ALB resource.</td>
    </tr><tr>
        <td>alb_dns_names</td>
        <td>The list of DNS records for the ALB as specified in the input.</td>
    </tr><tr>
        <td>alb_hosted_zone_id</td>
        <td>The AWS-managed zone ID for the ALB's DNS record.</td>
    </tr><tr>
        <td>alb_name</td>
        <td>A human friendly name for the ALB.</td>
    </tr><tr>
        <td>alb_security_group_id</td>
        <td>The ID of the security group associated with the ALB.</td>
    </tr><tr>
        <td>http_listener_arns</td>
        <td>The map of HTTP listener ports to ARNs. There will be one listener per entry in var.http_listener_ports.</td>
    </tr><tr>
        <td>https_listener_acm_cert_arns</td>
        <td>The map of HTTPS listener ports to ARNs. There will be one listener per entry in var.https_listener_ports_and_acm_ssl_certs.</td>
    </tr><tr>
        <td>https_listener_non_acm_cert_arns</td>
        <td>The map of HTTPS listener ports to ARNs. There will be one listener per entry in var.https_listener_ports_and_ssl_certs.</td>
    </tr><tr>
        <td>listener_arns</td>
        <td>The map of listener ports to ARNs. This will include all listeners both HTTP and HTTPS.</td>
    </tr><tr>
        <td>original_alb_dns_name</td>
        <td>The AWS-managed DNS name assigned to the ALB.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"c4028b35901a572360a3023e476a26a4"}
##DOCS-SOURCER-END -->
