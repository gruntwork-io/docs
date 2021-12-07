import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Elastic Load Balancer (ELB)

Deploy the Application Load Balancer (ALB) for load balancing HTTP and HTTPS, with support for routing rules and WebSockets.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/networking/alb" className="link-button">View on GitHub</a>

### Reference

<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <ul>
      
    <li>
      <p>
        <a name="access_logs_s3_bucket_name" href="#access_logs_s3_bucket_name" className="snap-top">
          <code>access_logs_s3_bucket_name</code>
        </a> - The name to use for the S3 bucket where the ALB access logs will be stored. If you set this to null, a name will be generated automatically based on var.alb_name.
      </p>
    </li>
    <li>
      <p>
        <a name="acm_cert_statuses" href="#acm_cert_statuses" className="snap-top">
          <code>acm_cert_statuses</code>
        </a> - When looking up the ACM certs passed in via https_listener_ports_and_acm_ssl_certs, only match certs with the given statuses. Valid values are PENDING_VALIDATION, ISSUED, INACTIVE, EXPIRED, VALIDATION_TIMED_OUT, REVOKED and FAILED.
      </p>
    </li>
    <li>
      <p>
        <a name="acm_cert_types" href="#acm_cert_types" className="snap-top">
          <code>acm_cert_types</code>
        </a> - When looking up the ACM certs passed in via https_listener_ports_and_acm_ssl_certs, only match certs of the given types. Valid values are AMAZON_ISSUED and IMPORTED.
      </p>
    </li>
    <li>
      <p>
        <a name="alb_name" href="#alb_name" className="snap-top">
          <code>alb_name</code>
        </a> - The name of the ALB.
      </p>
    </li>
    <li>
      <p>
        <a name="allow_all_outbound" href="#allow_all_outbound" className="snap-top">
          <code>allow_all_outbound</code>
        </a> - Set to true to enable all outbound traffic on this ALB. If set to false, the ALB will allow no outbound traffic by default. This will make the ALB unusuable, so some other code must then update the ALB Security Group to enable outbound access!
      </p>
    </li>
    <li>
      <p>
        <a name="allow_inbound_from_cidr_blocks" href="#allow_inbound_from_cidr_blocks" className="snap-top">
          <code>allow_inbound_from_cidr_blocks</code>
        </a> - The CIDR-formatted IP Address range from which this ALB will allow incoming requests. If var.is_internal_alb is false, use the default value. If var.is_internal_alb is true, consider setting this to the VPC's CIDR Block, or something even more restrictive.
      </p>
    </li>
    <li>
      <p>
        <a name="allow_inbound_from_security_group_ids" href="#allow_inbound_from_security_group_ids" className="snap-top">
          <code>allow_inbound_from_security_group_ids</code>
        </a> - The list of IDs of security groups that should have access to the ALB
      </p>
    </li>
    <li>
      <p>
        <a name="create_route53_entry" href="#create_route53_entry" className="snap-top">
          <code>create_route53_entry</code>
        </a> - Set to true to create a Route 53 DNS A record for this ALB?
      </p>
    </li>
    <li>
      <p>
        <a name="custom_tags" href="#custom_tags" className="snap-top">
          <code>custom_tags</code>
        </a> - A map of custom tags to apply to the ALB and its Security Group. The key is the tag name and the value is the tag value.
      </p>
    </li>
    <li>
      <p>
        <a name="default_action_body" href="#default_action_body" className="snap-top">
          <code>default_action_body</code>
        </a> - If a request to the load balancer does not match any of your listener rules, the default action will return a fixed response with this body.
      </p>
    </li>
    <li>
      <p>
        <a name="default_action_content_type" href="#default_action_content_type" className="snap-top">
          <code>default_action_content_type</code>
        </a> - If a request to the load balancer does not match any of your listener rules, the default action will return a fixed response with this content type.
      </p>
    </li>
    <li>
      <p>
        <a name="default_action_status_code" href="#default_action_status_code" className="snap-top">
          <code>default_action_status_code</code>
        </a> - If a request to the load balancer does not match any of your listener rules, the default action will return a fixed response with this status code.
      </p>
    </li>
    <li>
      <p>
        <a name="domain_names" href="#domain_names" className="snap-top">
          <code>domain_names</code>
        </a> - The list of domain names for the DNS A record to add for the ALB (e.g. alb.foo.com). Only used if var.create_route53_entry is true.
      </p>
    </li>
    <li>
      <p>
        <a name="drop_invalid_header_fields" href="#drop_invalid_header_fields" className="snap-top">
          <code>drop_invalid_header_fields</code>
        </a> - If true, the ALB will drop invalid headers. Elastic Load Balancing requires that message header names contain only alphanumeric characters and hyphens.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_deletion_protection" href="#enable_deletion_protection" className="snap-top">
          <code>enable_deletion_protection</code>
        </a> - Enable deletion protection on the ALB instance. If this is enabled, the load balancer cannot be deleted prior to disabling
      </p>
    </li>
    <li>
      <p>
        <a name="force_destroy" href="#force_destroy" className="snap-top">
          <code>force_destroy</code>
        </a> - A boolean that indicates whether the access logs bucket should be destroyed, even if there are files in it, when you run Terraform destroy. Unless you are using this bucket only for test purposes, you'll want to leave this variable set to false.
      </p>
    </li>
    <li>
      <p>
        <a name="hosted_zone_id" href="#hosted_zone_id" className="snap-top">
          <code>hosted_zone_id</code>
        </a> - The ID of the hosted zone for the DNS A record to add for the ALB. Only used if var.create_route53_entry is true.
      </p>
    </li>
    <li>
      <p>
        <a name="http_listener_ports" href="#http_listener_ports" className="snap-top">
          <code>http_listener_ports</code>
        </a> - A list of ports for which an HTTP Listener should be created on the ALB. Tip: When you define Listener Rules for these Listeners, be sure that, for each Listener, at least one Listener Rule  uses the '*' path to ensure that every possible request path for that Listener is handled by a Listener Rule. Otherwise some requests won't route to any Target Group.
      </p>
    </li>
    <li>
      <p>
        <a name="https_listener_ports_and_acm_ssl_certs" href="#https_listener_ports_and_acm_ssl_certs" className="snap-top">
          <code>https_listener_ports_and_acm_ssl_certs</code>
        </a> - A list of the ports for which an HTTPS Listener should be created on the ALB. Each item in the list should be a map with the keys 'port', the port number to listen on, and 'tls_domain_name', the domain name of an SSL/TLS certificate issued by the Amazon Certificate Manager (ACM) to associate with the Listener to be created. If your certificate isn't issued by ACM, specify var.https_listener_ports_and_ssl_certs instead. Tip: When you define Listener Rules for these Listeners, be sure that, for each Listener, at least one Listener Rule  uses the '*' path to ensure that every possible request path for that Listener is handled by a Listener Rule. Otherwise some requests won't route to any Target Group.
      </p>
    </li>
    <li>
      <p>
        <a name="https_listener_ports_and_ssl_certs" href="#https_listener_ports_and_ssl_certs" className="snap-top">
          <code>https_listener_ports_and_ssl_certs</code>
        </a> - A list of the ports for which an HTTPS Listener should be created on the ALB. Each item in the list should be a map with the keys 'port', the port number to listen on, and 'tls_arn', the Amazon Resource Name (ARN) of the SSL/TLS certificate to associate with the Listener to be created. If your certificate is issued by the Amazon Certificate Manager (ACM), specify var.https_listener_ports_and_acm_ssl_certs instead. Tip: When you define Listener Rules for these Listeners, be sure that, for each Listener, at least one Listener Rule  uses the '*' path to ensure that every possible request path for that Listener is handled by a Listener Rule. Otherwise some requests won't route to any Target Group.
      </p>
    </li>
    <li>
      <p>
        <a name="idle_timeout" href="#idle_timeout" className="snap-top">
          <code>idle_timeout</code>
        </a> - The time in seconds that the client TCP connection to the ALB is allowed to be idle before the ALB closes the TCP connection.
      </p>
    </li>
    <li>
      <p>
        <a name="is_internal_alb" href="#is_internal_alb" className="snap-top">
          <code>is_internal_alb</code>
        </a> - If the ALB should only accept traffic from within the VPC, set this to true. If it should accept traffic from the public Internet, set it to false.
      </p>
    </li>
    <li>
      <p>
        <a name="num_days_after_which_archive_log_data" href="#num_days_after_which_archive_log_data" className="snap-top">
          <code>num_days_after_which_archive_log_data</code>
        </a> - After this number of days, log files should be transitioned from S3 to Glacier. Enter 0 to never archive log data.
      </p>
    </li>
    <li>
      <p>
        <a name="num_days_after_which_delete_log_data" href="#num_days_after_which_delete_log_data" className="snap-top">
          <code>num_days_after_which_delete_log_data</code>
        </a> - After this number of days, log files should be deleted from S3. Enter 0 to never delete log data.
      </p>
    </li>
    <li>
      <p>
        <a name="should_create_access_logs_bucket" href="#should_create_access_logs_bucket" className="snap-top">
          <code>should_create_access_logs_bucket</code>
        </a> - If true, create a new S3 bucket for access logs with the name in var.access_logs_s3_bucket_name. If false, assume the S3 bucket for access logs with the name in  var.access_logs_s3_bucket_name already exists, and don't create a new one. Note that if you set this to false, it's up to you to ensure that the S3 bucket has a bucket policy that grants Elastic Load Balancing permission to write the access logs to your bucket.
      </p>
    </li>
    <li>
      <p>
        <a name="ssl_policy" href="#ssl_policy" className="snap-top">
          <code>ssl_policy</code>
        </a> - The AWS predefined TLS/SSL policy for the ALB. A List of policies can be found here: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html#describe-ssl-policies. AWS recommends ELBSecurityPolicy-2016-08 policy for general use but this policy includes TLSv1.0 which is rapidly being phased out. ELBSecurityPolicy-TLS-1-1-2017-01 is the next policy up that doesn't include TLSv1.0.
      </p>
    </li>
    <li>
      <p>
        <a name="vpc_id" href="#vpc_id" className="snap-top">
          <code>vpc_id</code>
        </a> - ID of the VPC where the ALB will be deployed
      </p>
    </li>
    <li>
      <p>
        <a name="vpc_subnet_ids" href="#vpc_subnet_ids" className="snap-top">
          <code>vpc_subnet_ids</code>
        </a> - The ids of the subnets that the ALB can use to source its IP
      </p>
    </li>
    </ul>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <ul>
      
    <li>
      <p>
        <a name="alb_access_logs_bucket" href="#alb_access_logs_bucket" className="snap-top">
          <code>alb_access_logs_bucket</code>
        </a> - The name of the S3 bucket containing the ALB access logs
      </p>
    </li>
    <li>
      <p>
        <a name="alb_arn" href="#alb_arn" className="snap-top">
          <code>alb_arn</code>
        </a> - The ARN of the ALB resource.
      </p>
    </li>
    <li>
      <p>
        <a name="alb_dns_names" href="#alb_dns_names" className="snap-top">
          <code>alb_dns_names</code>
        </a> - The list of DNS records for the ALB as specified in the input.
      </p>
    </li>
    <li>
      <p>
        <a name="alb_hosted_zone_id" href="#alb_hosted_zone_id" className="snap-top">
          <code>alb_hosted_zone_id</code>
        </a> - The AWS-managed zone ID for the ALB's DNS record.
      </p>
    </li>
    <li>
      <p>
        <a name="alb_name" href="#alb_name" className="snap-top">
          <code>alb_name</code>
        </a> - A human friendly name for the ALB.
      </p>
    </li>
    <li>
      <p>
        <a name="alb_security_group_id" href="#alb_security_group_id" className="snap-top">
          <code>alb_security_group_id</code>
        </a> - The ID of the security group associated with the ALB.
      </p>
    </li>
    <li>
      <p>
        <a name="http_listener_arns" href="#http_listener_arns" className="snap-top">
          <code>http_listener_arns</code>
        </a> - The map of HTTP listener ports to ARNs. There will be one listener per entry in var.http_listener_ports.
      </p>
    </li>
    <li>
      <p>
        <a name="https_listener_acm_cert_arns" href="#https_listener_acm_cert_arns" className="snap-top">
          <code>https_listener_acm_cert_arns</code>
        </a> - The map of HTTPS listener ports to ARNs. There will be one listener per entry in var.https_listener_ports_and_acm_ssl_certs.
      </p>
    </li>
    <li>
      <p>
        <a name="https_listener_non_acm_cert_arns" href="#https_listener_non_acm_cert_arns" className="snap-top">
          <code>https_listener_non_acm_cert_arns</code>
        </a> - The map of HTTPS listener ports to ARNs. There will be one listener per entry in var.https_listener_ports_and_ssl_certs.
      </p>
    </li>
    <li>
      <p>
        <a name="listener_arns" href="#listener_arns" className="snap-top">
          <code>listener_arns</code>
        </a> - The map of listener ports to ARNs. This will include all listeners both HTTP and HTTPS.
      </p>
    </li>
    <li>
      <p>
        <a name="original_alb_dns_name" href="#original_alb_dns_name" className="snap-top">
          <code>original_alb_dns_name</code>
        </a> - The AWS-managed DNS name assigned to the ALB.
      </p>
    </li>
    </ul>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"24652655c7e150c5a931b0daa8c7cfec"}
##DOCS-SOURCER-END -->
