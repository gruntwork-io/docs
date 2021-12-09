import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Elastic Load Balancer (ELB)

Deploy the Application Load Balancer (ALB) for load balancing HTTP and HTTPS, with support for routing rules and WebSockets.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/networking/alb" className="link-button">View on GitHub</a>

### Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<a name="access_logs_s3_bucket_name" className="snap-top"></a>

* [**`access_logs_s3_bucket_name`**](#access_logs_s3_bucket_name) &mdash; The name to use for the S3 bucket where the ALB access logs will be stored. If you set this to null, a name will be generated automatically based on [`alb_name`](#alb_name).

<a name="acm_cert_statuses" className="snap-top"></a>

* [**`acm_cert_statuses`**](#acm_cert_statuses) &mdash; When looking up the ACM certs passed in via [`https_listener_ports_and_acm_ssl_certs`](#https_listener_ports_and_acm_ssl_certs), only match certs with the given statuses. Valid values are [`PENDING_VALIDATION`](#PENDING_VALIDATION), ISSUED, INACTIVE, EXPIRED, [`VALIDATION_TIMED_OUT`](#VALIDATION_TIMED_OUT), REVOKED and FAILED.

<a name="acm_cert_types" className="snap-top"></a>

* [**`acm_cert_types`**](#acm_cert_types) &mdash; When looking up the ACM certs passed in via [`https_listener_ports_and_acm_ssl_certs`](#https_listener_ports_and_acm_ssl_certs), only match certs of the given types. Valid values are [`AMAZON_ISSUED`](#AMAZON_ISSUED) and IMPORTED.

<a name="alb_name" className="snap-top"></a>

* [**`alb_name`**](#alb_name) &mdash; The name of the ALB.

<a name="allow_all_outbound" className="snap-top"></a>

* [**`allow_all_outbound`**](#allow_all_outbound) &mdash; Set to true to enable all outbound traffic on this ALB. If set to false, the ALB will allow no outbound traffic by default. This will make the ALB unusuable, so some other code must then update the ALB Security Group to enable outbound access!

<a name="allow_inbound_from_cidr_blocks" className="snap-top"></a>

* [**`allow_inbound_from_cidr_blocks`**](#allow_inbound_from_cidr_blocks) &mdash; The CIDR-formatted IP Address range from which this ALB will allow incoming requests. If [`is_internal_alb`](#is_internal_alb) is false, use the default value. If [`is_internal_alb`](#is_internal_alb) is true, consider setting this to the VPC's CIDR Block, or something even more restrictive.

<a name="allow_inbound_from_security_group_ids" className="snap-top"></a>

* [**`allow_inbound_from_security_group_ids`**](#allow_inbound_from_security_group_ids) &mdash; The list of IDs of security groups that should have access to the ALB

<a name="create_route53_entry" className="snap-top"></a>

* [**`create_route53_entry`**](#create_route53_entry) &mdash; Set to true to create a Route 53 DNS A record for this ALB?

<a name="custom_tags" className="snap-top"></a>

* [**`custom_tags`**](#custom_tags) &mdash; A map of custom tags to apply to the ALB and its Security Group. The key is the tag name and the value is the tag value.

<a name="default_action_body" className="snap-top"></a>

* [**`default_action_body`**](#default_action_body) &mdash; If a request to the load balancer does not match any of your listener rules, the default action will return a fixed response with this body.

<a name="default_action_content_type" className="snap-top"></a>

* [**`default_action_content_type`**](#default_action_content_type) &mdash; If a request to the load balancer does not match any of your listener rules, the default action will return a fixed response with this content type.

<a name="default_action_status_code" className="snap-top"></a>

* [**`default_action_status_code`**](#default_action_status_code) &mdash; If a request to the load balancer does not match any of your listener rules, the default action will return a fixed response with this status code.

<a name="domain_names" className="snap-top"></a>

* [**`domain_names`**](#domain_names) &mdash; The list of domain names for the DNS A record to add for the ALB (e.g. alb.foo.com). Only used if [`create_route53_entry`](#create_route53_entry) is true.

<a name="drop_invalid_header_fields" className="snap-top"></a>

* [**`drop_invalid_header_fields`**](#drop_invalid_header_fields) &mdash; If true, the ALB will drop invalid headers. Elastic Load Balancing requires that message header names contain only alphanumeric characters and hyphens.

<a name="enable_deletion_protection" className="snap-top"></a>

* [**`enable_deletion_protection`**](#enable_deletion_protection) &mdash; Enable deletion protection on the ALB instance. If this is enabled, the load balancer cannot be deleted prior to disabling

<a name="force_destroy" className="snap-top"></a>

* [**`force_destroy`**](#force_destroy) &mdash; A boolean that indicates whether the access logs bucket should be destroyed, even if there are files in it, when you run Terraform destroy. Unless you are using this bucket only for test purposes, you'll want to leave this variable set to false.

<a name="hosted_zone_id" className="snap-top"></a>

* [**`hosted_zone_id`**](#hosted_zone_id) &mdash; The ID of the hosted zone for the DNS A record to add for the ALB. Only used if [`create_route53_entry`](#create_route53_entry) is true.

<a name="http_listener_ports" className="snap-top"></a>

* [**`http_listener_ports`**](#http_listener_ports) &mdash; A list of ports for which an HTTP Listener should be created on the ALB. Tip: When you define Listener Rules for these Listeners, be sure that, for each Listener, at least one Listener Rule  uses the '*' path to ensure that every possible request path for that Listener is handled by a Listener Rule. Otherwise some requests won't route to any Target Group.

<a name="https_listener_ports_and_acm_ssl_certs" className="snap-top"></a>

* [**`https_listener_ports_and_acm_ssl_certs`**](#https_listener_ports_and_acm_ssl_certs) &mdash; A list of the ports for which an HTTPS Listener should be created on the ALB. Each item in the list should be a map with the keys 'port', the port number to listen on, and [`'tls_domain_name`](#'tls_domain_name)', the domain name of an SSL/TLS certificate issued by the Amazon Certificate Manager (ACM) to associate with the Listener to be created. If your certificate isn't issued by ACM, specify [`https_listener_ports_and_ssl_certs`](#https_listener_ports_and_ssl_certs) instead. Tip: When you define Listener Rules for these Listeners, be sure that, for each Listener, at least one Listener Rule  uses the '*' path to ensure that every possible request path for that Listener is handled by a Listener Rule. Otherwise some requests won't route to any Target Group.

<a name="https_listener_ports_and_ssl_certs" className="snap-top"></a>

* [**`https_listener_ports_and_ssl_certs`**](#https_listener_ports_and_ssl_certs) &mdash; A list of the ports for which an HTTPS Listener should be created on the ALB. Each item in the list should be a map with the keys 'port', the port number to listen on, and [`'tls_arn`](#'tls_arn)', the Amazon Resource Name (ARN) of the SSL/TLS certificate to associate with the Listener to be created. If your certificate is issued by the Amazon Certificate Manager (ACM), specify [`https_listener_ports_and_acm_ssl_certs`](#https_listener_ports_and_acm_ssl_certs) instead. Tip: When you define Listener Rules for these Listeners, be sure that, for each Listener, at least one Listener Rule  uses the '*' path to ensure that every possible request path for that Listener is handled by a Listener Rule. Otherwise some requests won't route to any Target Group.

<a name="idle_timeout" className="snap-top"></a>

* [**`idle_timeout`**](#idle_timeout) &mdash; The time in seconds that the client TCP connection to the ALB is allowed to be idle before the ALB closes the TCP connection.

<a name="is_internal_alb" className="snap-top"></a>

* [**`is_internal_alb`**](#is_internal_alb) &mdash; If the ALB should only accept traffic from within the VPC, set this to true. If it should accept traffic from the public Internet, set it to false.

<a name="num_days_after_which_archive_log_data" className="snap-top"></a>

* [**`num_days_after_which_archive_log_data`**](#num_days_after_which_archive_log_data) &mdash; After this number of days, log files should be transitioned from S3 to Glacier. Enter 0 to never archive log data.

<a name="num_days_after_which_delete_log_data" className="snap-top"></a>

* [**`num_days_after_which_delete_log_data`**](#num_days_after_which_delete_log_data) &mdash; After this number of days, log files should be deleted from S3. Enter 0 to never delete log data.

<a name="should_create_access_logs_bucket" className="snap-top"></a>

* [**`should_create_access_logs_bucket`**](#should_create_access_logs_bucket) &mdash; If true, create a new S3 bucket for access logs with the name in [`access_logs_s3_bucket_name`](#access_logs_s3_bucket_name). If false, assume the S3 bucket for access logs with the name in  [`access_logs_s3_bucket_name`](#access_logs_s3_bucket_name) already exists, and don't create a new one. Note that if you set this to false, it's up to you to ensure that the S3 bucket has a bucket policy that grants Elastic Load Balancing permission to write the access logs to your bucket.

<a name="ssl_policy" className="snap-top"></a>

* [**`ssl_policy`**](#ssl_policy) &mdash; The AWS predefined TLS/SSL policy for the ALB. A List of policies can be found here: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html#describe-ssl-policies. AWS recommends ELBSecurityPolicy-2016-08 policy for general use but this policy includes TLSv1.0 which is rapidly being phased out. ELBSecurityPolicy-TLS-1-1-2017-01 is the next policy up that doesn't include TLSv1.0.

<a name="vpc_id" className="snap-top"></a>

* [**`vpc_id`**](#vpc_id) &mdash; ID of the VPC where the ALB will be deployed

<a name="vpc_subnet_ids" className="snap-top"></a>

* [**`vpc_subnet_ids`**](#vpc_subnet_ids) &mdash; The ids of the subnets that the ALB can use to source its IP

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="alb_access_logs_bucket" className="snap-top"></a>

* [**`alb_access_logs_bucket`**](#alb_access_logs_bucket) &mdash; The name of the S3 bucket containing the ALB access logs

<a name="alb_arn" className="snap-top"></a>

* [**`alb_arn`**](#alb_arn) &mdash; The ARN of the ALB resource.

<a name="alb_dns_names" className="snap-top"></a>

* [**`alb_dns_names`**](#alb_dns_names) &mdash; The list of DNS records for the ALB as specified in the input.

<a name="alb_hosted_zone_id" className="snap-top"></a>

* [**`alb_hosted_zone_id`**](#alb_hosted_zone_id) &mdash; The AWS-managed zone ID for the ALB's DNS record.

<a name="alb_name" className="snap-top"></a>

* [**`alb_name`**](#alb_name) &mdash; A human friendly name for the ALB.

<a name="alb_security_group_id" className="snap-top"></a>

* [**`alb_security_group_id`**](#alb_security_group_id) &mdash; The ID of the security group associated with the ALB.

<a name="http_listener_arns" className="snap-top"></a>

* [**`http_listener_arns`**](#http_listener_arns) &mdash; The map of HTTP listener ports to ARNs. There will be one listener per entry in [`http_listener_ports`](#http_listener_ports).

<a name="https_listener_acm_cert_arns" className="snap-top"></a>

* [**`https_listener_acm_cert_arns`**](#https_listener_acm_cert_arns) &mdash; The map of HTTPS listener ports to ARNs. There will be one listener per entry in [`https_listener_ports_and_acm_ssl_certs`](#https_listener_ports_and_acm_ssl_certs).

<a name="https_listener_non_acm_cert_arns" className="snap-top"></a>

* [**`https_listener_non_acm_cert_arns`**](#https_listener_non_acm_cert_arns) &mdash; The map of HTTPS listener ports to ARNs. There will be one listener per entry in [`https_listener_ports_and_ssl_certs`](#https_listener_ports_and_ssl_certs).

<a name="listener_arns" className="snap-top"></a>

* [**`listener_arns`**](#listener_arns) &mdash; The map of listener ports to ARNs. This will include all listeners both HTTP and HTTPS.

<a name="original_alb_dns_name" className="snap-top"></a>

* [**`original_alb_dns_name`**](#original_alb_dns_name) &mdash; The AWS-managed DNS name assigned to the ALB.

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"629812da57377f4c07a34bcec15e0264"}
##DOCS-SOURCER-END -->
