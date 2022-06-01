---
type: "service"
name: "Elastic Load Balancer (ELB)"
description: "Deploy the Application Load Balancer (ALB) for load balancing HTTP and HTTPS, with support for routing rules and WebSockets."
category: "networking"
cloud: "aws"
tags: ["alb","elb","load-balancer"]
license: "gruntwork"
built-with: "terraform"
title: "Application Load Balancer"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.88.2" lastModifiedVersion="0.87.0"/>

# Application Load Balancer


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.88.2/modules/networking/alb" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=networking%2Falb" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

## Overview

This service contains code to deploy [Application Load Balancer](https://aws.amazon.com/elasticloadbalancing/) on AWS.

![ALB architecture](/img/reference/services/networking/alb-architecture.png)

## Features

*   Deploy public or internal Application Load Balancers
*   Configure DNS in Route 53
*   Configure TLS in AWS Certificate Manager (ACM)
*   Send access logs into S3
*   Manage access with security groups or CIDR blocks

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

*   [Gruntwork Documentation on ALBs](https://github.com/gruntwork-io/terraform-aws-load-balancer/tree/master/modules/alb#background):
    Background information from Gruntwork about ALBs including what it is, differences from other ELB flavors, and when
    you should use ALBs.

*   [ALB Documentation](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html):
    Amazon’s docs for ALB that cover core concepts such as listeners, target groups, autoscaling, TLS and migrations.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.88.2/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.88.2/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="alb_name" requirement="required" type="string">
<HclListItemDescription>

The name of the ALB.

</HclListItemDescription>
</HclListItem>

<HclListItem name="is_internal_alb" requirement="required" type="bool">
<HclListItemDescription>

If the ALB should only accept traffic from within the VPC, set this to true. If it should accept traffic from the public Internet, set it to false.

</HclListItemDescription>
</HclListItem>

<HclListItem name="num_days_after_which_archive_log_data" requirement="required" type="number">
<HclListItemDescription>

After this number of days, log files should be transitioned from S3 to Glacier. Enter 0 to never archive log data.

</HclListItemDescription>
</HclListItem>

<HclListItem name="num_days_after_which_delete_log_data" requirement="required" type="number">
<HclListItemDescription>

After this number of days, log files should be deleted from S3. Enter 0 to never delete log data.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

ID of the VPC where the ALB will be deployed

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

The ids of the subnets that the ALB can use to source its IP

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="access_logs_s3_bucket_name" requirement="optional" type="string">
<HclListItemDescription>

The name to use for the S3 bucket where the ALB access logs will be stored. If you set this to null, a name will be generated automatically based on <a href="#alb_name"><code>alb_name</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="acm_cert_statuses" requirement="optional" type="list(string)">
<HclListItemDescription>

When looking up the ACM certs passed in via https_listener_ports_and_acm_ssl_certs, only match certs with the given statuses. Valid values are PENDING_VALIDATION, ISSUED, INACTIVE, EXPIRED, VALIDATION_TIMED_OUT, REVOKED and FAILED.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[
  &quot;ISSUED&quot;
]"/>
</HclListItem>

<HclListItem name="acm_cert_types" requirement="optional" type="list(string)">
<HclListItemDescription>

When looking up the ACM certs passed in via https_listener_ports_and_acm_ssl_certs, only match certs of the given types. Valid values are AMAZON_ISSUED and IMPORTED.

</HclListItemDescription>
<HclListItemDefaultValue>

```hcl
[
  "AMAZON_ISSUED",
  "IMPORTED"
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="allow_all_outbound" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable all outbound traffic on this ALB. If set to false, the ALB will allow no outbound traffic by default. This will make the ALB unusuable, so some other code must then update the ALB Security Group to enable outbound access!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="allow_inbound_from_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

The CIDR-formatted IP Address range from which this ALB will allow incoming requests. If <a href="#is_internal_alb"><code>is_internal_alb</code></a> is false, use the default value. If <a href="#is_internal_alb"><code>is_internal_alb</code></a> is true, consider setting this to the VPC's CIDR Block, or something even more restrictive.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_inbound_from_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The list of IDs of security groups that should have access to the ALB

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="create_route53_entry" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to create a Route 53 DNS A record for this ALB?

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the ALB and its Security Group. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="default_action_body" requirement="optional" type="string">
<HclListItemDescription>

If a request to the load balancer does not match any of your listener rules, the default action will return a fixed response with this body.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="default_action_content_type" requirement="optional" type="string">
<HclListItemDescription>

If a request to the load balancer does not match any of your listener rules, the default action will return a fixed response with this content type.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;text/plain&quot;"/>
</HclListItem>

<HclListItem name="default_action_status_code" requirement="optional" type="number">
<HclListItemDescription>

If a request to the load balancer does not match any of your listener rules, the default action will return a fixed response with this status code.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="404"/>
</HclListItem>

<HclListItem name="domain_names" requirement="optional" type="list(string)">
<HclListItemDescription>

The list of domain names for the DNS A record to add for the ALB (e.g. alb.foo.com). Only used if <a href="#create_route53_entry"><code>create_route53_entry</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="drop_invalid_header_fields" requirement="optional" type="bool">
<HclListItemDescription>

If true, the ALB will drop invalid headers. Elastic Load Balancing requires that message header names contain only alphanumeric characters and hyphens.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_deletion_protection" requirement="optional" type="bool">
<HclListItemDescription>

Enable deletion protection on the ALB instance. If this is enabled, the load balancer cannot be deleted prior to disabling

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="force_destroy" requirement="optional" type="bool">
<HclListItemDescription>

A boolean that indicates whether the access logs bucket should be destroyed, even if there are files in it, when you run Terraform destroy. Unless you are using this bucket only for test purposes, you'll want to leave this variable set to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="hosted_zone_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the hosted zone for the DNS A record to add for the ALB. Only used if <a href="#create_route53_entry"><code>create_route53_entry</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="http_listener_ports" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of ports for which an HTTP Listener should be created on the ALB. Tip: When you define Listener Rules for these Listeners, be sure that, for each Listener, at least one Listener Rule  uses the '*' path to ensure that every possible request path for that Listener is handled by a Listener Rule. Otherwise some requests won't route to any Target Group.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="https_listener_ports_and_acm_ssl_certs" requirement="optional" type="list(object(…))">
<HclListItemDescription>

A list of the ports for which an HTTPS Listener should be created on the ALB. Each item in the list should be a map with the keys 'port', the port number to listen on, and 'tls_domain_name', the domain name of an SSL/TLS certificate issued by the Amazon Certificate Manager (ACM) to associate with the Listener to be created. If your certificate isn't issued by ACM, specify <a href="#https_listener_ports_and_ssl_certs"><code>https_listener_ports_and_ssl_certs</code></a> instead. Tip: When you define Listener Rules for these Listeners, be sure that, for each Listener, at least one Listener Rule  uses the '*' path to ensure that every possible request path for that Listener is handled by a Listener Rule. Otherwise some requests won't route to any Target Group.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    port            = number
    tls_domain_name = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="https_listener_ports_and_ssl_certs" requirement="optional" type="list(object(…))">
<HclListItemDescription>

A list of the ports for which an HTTPS Listener should be created on the ALB. Each item in the list should be a map with the keys 'port', the port number to listen on, and 'tls_arn', the Amazon Resource Name (ARN) of the SSL/TLS certificate to associate with the Listener to be created. If your certificate is issued by the Amazon Certificate Manager (ACM), specify <a href="#https_listener_ports_and_acm_ssl_certs"><code>https_listener_ports_and_acm_ssl_certs</code></a> instead. Tip: When you define Listener Rules for these Listeners, be sure that, for each Listener, at least one Listener Rule  uses the '*' path to ensure that every possible request path for that Listener is handled by a Listener Rule. Otherwise some requests won't route to any Target Group.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    port    = number
    tls_arn = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="idle_timeout" requirement="optional" type="number">
<HclListItemDescription>

The time in seconds that the client TCP connection to the ALB is allowed to be idle before the ALB closes the TCP connection.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="should_create_access_logs_bucket" requirement="optional" type="bool">
<HclListItemDescription>

If true, create a new S3 bucket for access logs with the name in <a href="#access_logs_s3_bucket_name"><code>access_logs_s3_bucket_name</code></a>. If false, assume the S3 bucket for access logs with the name in  <a href="#access_logs_s3_bucket_name"><code>access_logs_s3_bucket_name</code></a> already exists, and don't create a new one. Note that if you set this to false, it's up to you to ensure that the S3 bucket has a bucket policy that grants Elastic Load Balancing permission to write the access logs to your bucket.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="ssl_policy" requirement="optional" type="string">
<HclListItemDescription>

The AWS predefined TLS/SSL policy for the ALB. A List of policies can be found here: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html#describe-ssl-policies. AWS recommends ELBSecurityPolicy-2016-08 policy for general use but this policy includes TLSv1.0 which is rapidly being phased out. ELBSecurityPolicy-TLS-1-1-2017-01 is the next policy up that doesn't include TLSv1.0.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ELBSecurityPolicy-2016-08&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="alb_access_logs_bucket">
<HclListItemDescription>

The name of the S3 bucket containing the ALB access logs

</HclListItemDescription>
</HclListItem>

<HclListItem name="alb_arn">
<HclListItemDescription>

The ARN of the ALB resource.

</HclListItemDescription>
</HclListItem>

<HclListItem name="alb_dns_names">
<HclListItemDescription>

The list of DNS records for the ALB as specified in the input.

</HclListItemDescription>
</HclListItem>

<HclListItem name="alb_hosted_zone_id">
<HclListItemDescription>

The AWS-managed zone ID for the ALB's DNS record.

</HclListItemDescription>
</HclListItem>

<HclListItem name="alb_name">
<HclListItemDescription>

A human friendly name for the ALB.

</HclListItemDescription>
</HclListItem>

<HclListItem name="alb_security_group_id">
<HclListItemDescription>

The ID of the security group associated with the ALB.

</HclListItemDescription>
</HclListItem>

<HclListItem name="http_listener_arns">
<HclListItemDescription>

The map of HTTP listener ports to ARNs. There will be one listener per entry in <a href="#http_listener_ports"><code>http_listener_ports</code></a>.

</HclListItemDescription>
</HclListItem>

<HclListItem name="https_listener_acm_cert_arns">
<HclListItemDescription>

The map of HTTPS listener ports to ARNs. There will be one listener per entry in <a href="#https_listener_ports_and_acm_ssl_certs"><code>https_listener_ports_and_acm_ssl_certs</code></a>.

</HclListItemDescription>
</HclListItem>

<HclListItem name="https_listener_non_acm_cert_arns">
<HclListItemDescription>

The map of HTTPS listener ports to ARNs. There will be one listener per entry in <a href="#https_listener_ports_and_ssl_certs"><code>https_listener_ports_and_ssl_certs</code></a>.

</HclListItemDescription>
</HclListItem>

<HclListItem name="listener_arns">
<HclListItemDescription>

The map of listener ports to ARNs. This will include all listeners both HTTP and HTTPS.

</HclListItemDescription>
</HclListItem>

<HclListItem name="original_alb_dns_name">
<HclListItemDescription>

The AWS-managed DNS name assigned to the ALB.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.88.2/modules%2Fnetworking%2Falb%2FREADME.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.88.2/modules%2Fnetworking%2Falb%2Fvariables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.88.2/modules%2Fnetworking%2Falb%2Foutputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "42bfff61d6279058a5bdeee1419cd590"
}
##DOCS-SOURCER-END -->
