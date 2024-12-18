---
title: "Application Load Balancer (ALB) Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Load Balancer Modules" version="0.30.0" lastModifiedVersion="0.30.0"/>

# Application Load Balancer (ALB) Module

<a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/tree/v0.30.0/modules/alb" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.30.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module creates an [Application Load Balancer](http://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html)
that you can use as a load balancer for any [ALB Target Group](http://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html).
In practice, a Target Group is usually an [ECS Service](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html)
or an [Auto Scaling Group](http://docs.aws.amazon.com/autoscaling/latest/userguide/WhatIsAutoScaling.html).

See the [Background](#background) section below for more information on the ALB.

## ALB Terminology

Amazon has its own vocabulary for the ALB that can be confusing. Here's a helpful guide:

*   **Listener:** Represents a port open on the ALB that receives incoming traffic (e.g., port 80 for HTTP, 443 for
    HTTPs).

*   **Target Group:** Represents one or more servers that are listening for requests. You can configure what port(s)
    those servers listen on and how to perform health checks on the servers.

*   **Listener Rules:** Represents a mapping between Listeners and Target Groups. For each of your Listeners, you can
    specify which paths and/or domain names should be routed to which Target Groups. For example, you could configure
    path `/foo` to go to the Target Group `foo` and `/bar` to go to `bar`; or, you could configure `foo.my-domain.com` to
    go to `foo` and `bar.my-domain.com` to go to `bar`; or any combination/permutation of these rules.

## Background

### What's the difference between an ALB and ELB?

The ELB, now known as the [Classic Load Balancer](http://docs.aws.amazon.com/elasticloadbalancing/latest/classic/introduction.html),
is a [Layer 4](https://en.wikipedia.org/wiki/Transport_layer) load balancer, which means that the ELB will accept both
HTTP traffic *and* TCP traffic. By asking the ELB to simply forward TCP traffic, Amazon users gained the benefit of a
high-availability load balancer with the flexibility of handling any kind of TCP traffic they wanted on their backend
instances.

But over time, it became clear that many customers were running HTTP microservices that needed more "opinionated" functionality
like built-in support for WebSockets, built-in support for HTTP/2, and routing to different backend services depending
on the particular URL requested in the HTTP request. Because these requests are all HTTP-specific, the "flexible" Layer 4
ELB could not be updated to handle these use cases.

In addition, when Amazon released the EC2 Container Service for easily running a Docker cluster, they needed some way
to allow a load balancer to route requests to containers that just launched somewhere in the cluster. The ELB was originally
designed in a pre-container world and was able to route only to a *single* port across many different EC2 Instances.

This imposed an awkward restriction on the ECS Cluster where you had to run each ECS Task (Docker container) so that it
listened on the same host port. This, in turn, meant you couldn't run two instances of the same Docker container on the
same host, which was one of the main benefits of Docker in the first place.

The ALB was meant to solve both of these problems:

1.  Offer HTTP-specific functionality (known as "Layer 7" functionality)
2.  Allow Docker containers to launch on a dynamic port

#### ALB Functionality

The ALB gives us the following HTTP-specific functionality compared to the ELB:

*   Route requests via HTTP or HTTPS
*   Native support for WebSockets
*   Native support for HTTP/2
*   Path-based routing
*   Hostname-based routing
*   Ability to route to a [Target](http://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-register-targets.html),
    which incorporates both an endpoint and a port and therefore allows different instances of an ECS Service to receive
    traffic on different ports.
*   Better metrics
*   Support for sticky sessions using load-balancer-generated cookies

For a visual explanation of the ALB's features, check out [A Talk on the New AWS Application Load Balancer, Updates to
ECS, and Kinesis Analytics](https://blog.gruntwork.io/a-talk-on-the-new-aws-application-load-balancer-updates-to-ecs-and-kinesis-analytics-abb599cb3cb8#.qww1to10q).

#### ELB Functionality

The Classic Load Balancer, or ELB, gives us the following unique functionality compared to the ALB:

*   Route requests via HTTP, HTTPS or TCP
*   Support for sticky sessions using application-generated cookies

### When should I use an ALB vs. ELB?

Based on the above analysis, you should generally prefer the ALB when selecting a load balancer for an HTTP-based service.
There are, of course, still times when the ELB makes sense:

*   If your service listens on a non-HTTP protocol, such as ZeroMQ.
*   If you wish to terminate a TLS connection at your service, instead of at the load balancer, only the ELB will support
    this. That is, an ALB will accept TLS connections, but it will then open a *second* HTTP or HTTPS connection to your
    backend service. If you want end-to-end encryption, only the ELB can forward the TCP request directly to your backend
    service so that the backend service terminates the TLS connection.
*   If you need the power of Nginx, or HAProxy, but don't want to bother setting these up as a High Availability cluster.

Finally, the ALB uses a different pricing model than the ELB. Here's an excerpt from the [Blog Post that introduced the
ALB](https://aws.amazon.com/blogs/aws/new-aws-application-load-balancer/):

> When you use an Application Load Balancer, you will be billed by the hour and for the use of Load Balancer Capacity Units,
> also known as LCU’s. An LCU measures the number of new connections per second, the number of active connections, and
> data transfer. We measure on all three dimensions, but bill based on the highest one. One LCU is enough to support either:
>
> *   25 connections/second with a 2 KB certificate, 3,000 active connections, and 2.22 Mbps of data transfer or
> *   5 connections/second with a 4 KB certificate, 3,000 active connections, and 2.22 Mbps of data transfer.

> Billing for LCU usage is fractional, and is charged at $0.008 per LCU per hour. Based on our calculations, we believe
> that virtually all of our customers can obtain a net reduction in their load balancer costs by switching from a Classic
> Load Balancer to an Application Load Balancer.

You may note that if you have 1,000,000 idle WebSocket connections (an "active connection"), this would cost ALB users
$1,920/month! Whereas with the original ELB, your costs will not scale with the number of idle WebSocket connections
(credit to [this Hacker News thread](https://news.ycombinator.com/item?id=12269453) for the observation).

Given all the benefits of the ALB, even if you plan to get to massive scale eventually, you may as well start with the
ALB. You can always re-assess at any time.

## Using the ALB with ECS

### When should I use this module with Amazon ECS?

With the ELB, now known as a [Classic Load Balancer](http://docs.aws.amazon.com/elasticloadbalancing/latest/classic/introduction.html),
each ECS Service was fronted by a unique ELB. As a result, each ECS Service module eventually created its own ELB. This
gave us good isolation and made it easy to give each ECS Service a unique DNS name on the same port (e.g. api.acme.com and
stats.acme.com, both on port 443). But it also led to low utilization among all the ELBs, little resource sharing, and
consequently higher costs.

With the ALB, a single ALB is shared among multiple ECS Services. For that reason, after you've created an ALB using this
module, you may wish to create an ECS Cluster using the [ecs-cluster](https://github.com/gruntwork-io/terraform-aws-ecs/tree/main/modules/ecs-cluster) module, where you'll pass in the Security
Group ID of the newly created ALB to permit the ALB to forward traffic to the ECS Cluster.

With an ECS Cluster and ALB in place, you can now use the \[ecs-service-with-alb]
(https://github.com/gruntwork-io/terraform-aws-ecs/tree/main/modules/ecs-service-with-alb) module to create a new ECS Service
that contains an ALB Target Group you can configure to receive traffic from an ALB. To do that, you need to add one
or more [aws_alb_listener_rule](https://www.terraform.io/docs/providers/aws/r/alb_listener_rule.html) resources to
map which of the ALB listeners should send their traffic to the ECS service's Target Group.

### How should I use the ALB with multiple microservices?

To use the ALB with multiple services, you each service should create
[aws_alb_listener_rule](https://www.terraform.io/docs/providers/aws/r/alb_listener_rule.html) resources to specify
which paths or domain names should be routed to that service. For working sample code, check out the
[docker-service-with-alb example](https://github.com/gruntwork-io/terraform-aws-ecs/tree/main/examples/docker-service-with-alb).

## Gotcha's

### Make sure your Listeners handle all possible request paths

An [ALB Listener](http://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-listeners.html)
represents an open port on your ALB, waiting to receive requests and route them to a [Target
Group](http://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html).

Suppose you want to have this ALB Listener route requests for `/foo` to ServiceFoo and requests for `/bar` to ServiceBar.
You'd accomplish this creating two [ALB Listener
Rules](http://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-update-rules.html) as follows:

*   Route `/foo` traffic to Target Group ServiceFoo
*   Route `/bar` traffic to Target Group ServiceBar

So far so good. But what if the Listener receives a request for `/hello`? Since no Listener Rule handles that path, the
ALB will handle it with its `default_action`. The `default_action` in this module is to return a fixed response, which
by default is a blank 404 page.

There are two ways for you to override this behavior:

*   You can override the default fixed response via the `default_action_content_type`, `default_action_body`, and
    `default_action_status_code` parameters.
*   You can add an ALB Listener Rule that catches ALL requests (i.e., `*`) and have that rule forward to a custom Target
    Group so your own apps can respond in any way you wish.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ALB MODULE
# ------------------------------------------------------------------------------------------------------

module "alb" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-load-balancer.git//modules/alb?ref=v0.30.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the ALB. Do not include the environment name since this module
  # will automatically append it to the value of this variable.
  alb_name = <string>

  # If the ALB should only accept traffic from within the VPC, set this to true.
  # If it should accept traffic from the public Internet, set it to false.
  is_internal_alb = <bool>

  # The AWS predefined TLS/SSL policy for the ALB. A List of policies can be
  # found here:
  # https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html#describe-ssl-policies.
  # AWS recommends ELBSecurityPolicy-2016-08 policy for general use but this
  # policy includes TLSv1.0 which is rapidly being phased out.
  # ELBSecurityPolicy-TLS-1-1-2017-01 is the next policy up that doesn't include
  # TLSv1.0.
  ssl_policy = <string>

  # A list of the subnets into which the ALB will place its underlying nodes.
  # Include one subnet per Availabability Zone. If the ALB is public-facing,
  # these should be public subnets. Otherwise, they should be private subnets.
  vpc_subnet_ids = <list(string)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # When looking up the ACM certs passed in via
  # https_listener_ports_and_acm_ssl_certs, only match certs with the given
  # statuses. Valid values are PENDING_VALIDATION, ISSUED, INACTIVE, EXPIRED,
  # VALIDATION_TIMED_OUT, REVOKED and FAILED.
  acm_cert_statuses = ["ISSUED"]

  # When looking up the ACM certs passed in via
  # https_listener_ports_and_acm_ssl_certs, only match certs of the given types.
  # Valid values are AMAZON_ISSUED and IMPORTED.
  acm_cert_types = ["AMAZON_ISSUED","IMPORTED"]

  # Add additional security groups to the ALB
  additional_security_group_ids = []

  # List of additional SSL certs (non-ACM and ACM) to bind to the given listener
  # port. Note that this must not overlap with the certificates defined in
  # var.https_listener_ports_and_ssl_certs and
  # var.https_listener_ports_and_acm_ssl_certs. The keys are the listener ports.
  additional_ssl_certs_for_ports = {}

  # The S3 Bucket name where ALB logs should be stored. If left empty, no ALB
  # logs will be captured. Tip: It's easiest to create the S3 Bucket using the
  # Gruntwork Module
  # https://github.com/gruntwork-io/terraform-aws-monitoring/tree/main/modules/logs/load-balancer-access-logs.
  alb_access_logs_s3_bucket_name = null

  # Set to true to enable all outbound traffic on this ALB. If set to false, the
  # ALB will allow no outbound traffic by default. This will make the ALB
  # unusuable, so some other code must then update the ALB Security Group to
  # enable outbound access!
  allow_all_outbound = true

  # The CIDR-formatted IP Address ranges from which this ALB will allow incoming
  # requests. If var.is_internal_alb is false, use the default value. If
  # var.is_internal_alb is true, consider setting this to the VPC's CIDR Block,
  # or something even more restrictive.
  allow_inbound_from_cidr_blocks = ["0.0.0.0/0"]

  # The IDs of security groups from which this ALB will allow incoming requests.
  # . If you update this variable, make sure to update
  # var.allow_inbound_from_security_group_ids_num too!
  allow_inbound_from_security_group_ids = []

  # The number of elements in var.allow_inbound_from_security_group_ids. We
  # should be able to compute this automatically, but due to a Terraform
  # limitation, if there are any dynamic resources in
  # var.allow_inbound_from_security_group_ids, then we won't be able to:
  # https://github.com/hashicorp/terraform/pull/11482
  allow_inbound_from_security_group_ids_num = 0

  # Prefix to use for access logs to create a sub-folder in S3 Bucket name where
  # ALB logs should be stored. Only used if
  # var.enable_custom_alb_access_logs_s3_prefix is true.
  custom_alb_access_logs_s3_prefix = null

  # A map of custom tags to apply to the ALB and its Security Group. The key is
  # the tag name and the value is the tag value.
  custom_tags = {}

  # Define the default action if a request to the load balancer does not match
  # any of your listener rules.
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_listener#default_action
  default_action = {"fixed-response":{"content_type":"text/plain","message_body":null,"status_code":404}}

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # Determines how the load balancer handles requests that might pose a security
  # risk to an application due to HTTP desync. Valid values are monitor,
  # defensive (default), strictest.
  desync_mitigation_mode = "defensive"

  # If true, the ALB will drop invalid headers. Elastic Load Balancing requires
  # that message header names contain only alphanumeric characters and hyphens.
  drop_invalid_header_fields = false

  # Set to true to enable the ALB to log all requests. Ideally, this variable
  # wouldn't be necessary, but because Terraform can't interpolate dynamic
  # variables in counts, we must explicitly include this. Enter true or false.
  enable_alb_access_logs = false

  # Set to true to use the value of alb_access_logs_s3_prefix for access logs
  # prefix. If false, the alb_name will be used. This is useful if you wish to
  # disable the S3 prefix. Only used if var.enable_alb_access_logs is true.
  enable_custom_alb_access_logs_s3_prefix = false

  # If true, deletion of the ALB will be disabled via the AWS API. This will
  # prevent Terraform from deleting the load balancer.
  enable_deletion_protection = false

  # Indicates whether HTTP/2 is enabled in application load balancers. Defaults
  # to true.
  enable_http2 = true

  # Indicates whether to allow a WAF-enabled load balancer to route requests to
  # targets if it is unable to forward the request to AWS WAF.
  enable_waf_fail_open = false

  # Indicates whether the X-Forwarded-For header should preserve the source port
  # that the client used to connect to the load balancer in application load
  # balancers. Defaults to true.
  enable_xff_client_port = true

  # Define the default action for HTTP listeners. Use this to override the
  # default_action variable for HTTP listeners. This is particularly useful if
  # you for example want to redirect all HTTP traffic to HTTPS.
  http_default_action = {}

  # A list of ports for which an HTTP Listener should be created on the ALB.
  # Tip: When you define Listener Rules for these Listeners, be sure that, for
  # each Listener, at least one Listener Rule uses the '*' path to ensure that
  # every possible request path for that Listener is handled by a Listener Rule.
  # Otherwise some requests won't route to any Target Group.
  http_listener_ports = []

  # A list of the ports for which an HTTPS Listener should be created on the
  # ALB. Each item in the list should be a map with the keys 'port', the port
  # number to listen on, and 'tls_domain_name', the domain name of an SSL/TLS
  # certificate issued by the Amazon Certificate Manager (ACM) to associate with
  # the Listener to be created. If your certificate isn't issued by ACM, specify
  # var.https_listener_ports_and_ssl_certs instead. Tip: When you define
  # Listener Rules for these Listeners, be sure that, for each Listener, at
  # least one Listener Rule  uses the '*' path to ensure that every possible
  # request path for that Listener is handled by a Listener Rule. Otherwise some
  # requests won't route to any Target Group.
  https_listener_ports_and_acm_ssl_certs = []

  # The number of elements in var.https_listener_ports_and_acm_ssl_certs. We
  # should be able to compute this automatically, but due to a Terraform
  # limitation, if there are any dynamic resources in
  # var.https_listener_ports_and_acm_ssl_certs, then we won't be able to:
  # https://github.com/hashicorp/terraform/pull/11482
  https_listener_ports_and_acm_ssl_certs_num = 0

  # A list of the ports for which an HTTPS Listener should be created on the
  # ALB. Each item in the list should be a map with the keys 'port', the port
  # number to listen on, and 'tls_arn', the Amazon Resource Name (ARN) of the
  # SSL/TLS certificate to associate with the Listener to be created. If your
  # certificate is issued by the Amazon Certificate Manager (ACM), specify
  # var.https_listener_ports_and_acm_ssl_certs instead. Tip: When you define
  # Listener Rules for these Listeners, be sure that, for each Listener, at
  # least one Listener Rule  uses the '*' path to ensure that every possible
  # request path for that Listener is handled by a Listener Rule. Otherwise some
  # requests won't route to any Target Group.
  https_listener_ports_and_ssl_certs = []

  # The number of elements in var.https_listener_ports_and_ssl_certs. We should
  # be able to compute this automatically, but due to a Terraform limitation, if
  # there are any dynamic resources in var.https_listener_ports_and_ssl_certs,
  # then we won't be able to: https://github.com/hashicorp/terraform/pull/11482
  https_listener_ports_and_ssl_certs_num = 0

  # The time in seconds that the client TCP connection to the ALB is allowed to
  # be idle before the ALB closes the TCP connection.  
  idle_timeout = 60

  # The type of IP addresses used by the subnets for your load balancer. The
  # possible values are ipv4 and dualstack.
  ip_address_type = null

  # DEPRECATED. The VPC ID in which this ALB will be placed.
  vpc_id = ""

  #  (Optional) Determines how the load balancer modifies the X-Forwarded-For
  # header in the HTTP request before sending the request to the target. The
  # possible values are append, preserve, and remove. Only valid for Load
  # Balancers of type application. The default is append.
  xff_header_processing_mode = "append"

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ALB MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-load-balancer.git//modules/alb?ref=v0.30.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the ALB. Do not include the environment name since this module
  # will automatically append it to the value of this variable.
  alb_name = <string>

  # If the ALB should only accept traffic from within the VPC, set this to true.
  # If it should accept traffic from the public Internet, set it to false.
  is_internal_alb = <bool>

  # The AWS predefined TLS/SSL policy for the ALB. A List of policies can be
  # found here:
  # https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html#describe-ssl-policies.
  # AWS recommends ELBSecurityPolicy-2016-08 policy for general use but this
  # policy includes TLSv1.0 which is rapidly being phased out.
  # ELBSecurityPolicy-TLS-1-1-2017-01 is the next policy up that doesn't include
  # TLSv1.0.
  ssl_policy = <string>

  # A list of the subnets into which the ALB will place its underlying nodes.
  # Include one subnet per Availabability Zone. If the ALB is public-facing,
  # these should be public subnets. Otherwise, they should be private subnets.
  vpc_subnet_ids = <list(string)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # When looking up the ACM certs passed in via
  # https_listener_ports_and_acm_ssl_certs, only match certs with the given
  # statuses. Valid values are PENDING_VALIDATION, ISSUED, INACTIVE, EXPIRED,
  # VALIDATION_TIMED_OUT, REVOKED and FAILED.
  acm_cert_statuses = ["ISSUED"]

  # When looking up the ACM certs passed in via
  # https_listener_ports_and_acm_ssl_certs, only match certs of the given types.
  # Valid values are AMAZON_ISSUED and IMPORTED.
  acm_cert_types = ["AMAZON_ISSUED","IMPORTED"]

  # Add additional security groups to the ALB
  additional_security_group_ids = []

  # List of additional SSL certs (non-ACM and ACM) to bind to the given listener
  # port. Note that this must not overlap with the certificates defined in
  # var.https_listener_ports_and_ssl_certs and
  # var.https_listener_ports_and_acm_ssl_certs. The keys are the listener ports.
  additional_ssl_certs_for_ports = {}

  # The S3 Bucket name where ALB logs should be stored. If left empty, no ALB
  # logs will be captured. Tip: It's easiest to create the S3 Bucket using the
  # Gruntwork Module
  # https://github.com/gruntwork-io/terraform-aws-monitoring/tree/main/modules/logs/load-balancer-access-logs.
  alb_access_logs_s3_bucket_name = null

  # Set to true to enable all outbound traffic on this ALB. If set to false, the
  # ALB will allow no outbound traffic by default. This will make the ALB
  # unusuable, so some other code must then update the ALB Security Group to
  # enable outbound access!
  allow_all_outbound = true

  # The CIDR-formatted IP Address ranges from which this ALB will allow incoming
  # requests. If var.is_internal_alb is false, use the default value. If
  # var.is_internal_alb is true, consider setting this to the VPC's CIDR Block,
  # or something even more restrictive.
  allow_inbound_from_cidr_blocks = ["0.0.0.0/0"]

  # The IDs of security groups from which this ALB will allow incoming requests.
  # . If you update this variable, make sure to update
  # var.allow_inbound_from_security_group_ids_num too!
  allow_inbound_from_security_group_ids = []

  # The number of elements in var.allow_inbound_from_security_group_ids. We
  # should be able to compute this automatically, but due to a Terraform
  # limitation, if there are any dynamic resources in
  # var.allow_inbound_from_security_group_ids, then we won't be able to:
  # https://github.com/hashicorp/terraform/pull/11482
  allow_inbound_from_security_group_ids_num = 0

  # Prefix to use for access logs to create a sub-folder in S3 Bucket name where
  # ALB logs should be stored. Only used if
  # var.enable_custom_alb_access_logs_s3_prefix is true.
  custom_alb_access_logs_s3_prefix = null

  # A map of custom tags to apply to the ALB and its Security Group. The key is
  # the tag name and the value is the tag value.
  custom_tags = {}

  # Define the default action if a request to the load balancer does not match
  # any of your listener rules.
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_listener#default_action
  default_action = {"fixed-response":{"content_type":"text/plain","message_body":null,"status_code":404}}

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # Determines how the load balancer handles requests that might pose a security
  # risk to an application due to HTTP desync. Valid values are monitor,
  # defensive (default), strictest.
  desync_mitigation_mode = "defensive"

  # If true, the ALB will drop invalid headers. Elastic Load Balancing requires
  # that message header names contain only alphanumeric characters and hyphens.
  drop_invalid_header_fields = false

  # Set to true to enable the ALB to log all requests. Ideally, this variable
  # wouldn't be necessary, but because Terraform can't interpolate dynamic
  # variables in counts, we must explicitly include this. Enter true or false.
  enable_alb_access_logs = false

  # Set to true to use the value of alb_access_logs_s3_prefix for access logs
  # prefix. If false, the alb_name will be used. This is useful if you wish to
  # disable the S3 prefix. Only used if var.enable_alb_access_logs is true.
  enable_custom_alb_access_logs_s3_prefix = false

  # If true, deletion of the ALB will be disabled via the AWS API. This will
  # prevent Terraform from deleting the load balancer.
  enable_deletion_protection = false

  # Indicates whether HTTP/2 is enabled in application load balancers. Defaults
  # to true.
  enable_http2 = true

  # Indicates whether to allow a WAF-enabled load balancer to route requests to
  # targets if it is unable to forward the request to AWS WAF.
  enable_waf_fail_open = false

  # Indicates whether the X-Forwarded-For header should preserve the source port
  # that the client used to connect to the load balancer in application load
  # balancers. Defaults to true.
  enable_xff_client_port = true

  # Define the default action for HTTP listeners. Use this to override the
  # default_action variable for HTTP listeners. This is particularly useful if
  # you for example want to redirect all HTTP traffic to HTTPS.
  http_default_action = {}

  # A list of ports for which an HTTP Listener should be created on the ALB.
  # Tip: When you define Listener Rules for these Listeners, be sure that, for
  # each Listener, at least one Listener Rule uses the '*' path to ensure that
  # every possible request path for that Listener is handled by a Listener Rule.
  # Otherwise some requests won't route to any Target Group.
  http_listener_ports = []

  # A list of the ports for which an HTTPS Listener should be created on the
  # ALB. Each item in the list should be a map with the keys 'port', the port
  # number to listen on, and 'tls_domain_name', the domain name of an SSL/TLS
  # certificate issued by the Amazon Certificate Manager (ACM) to associate with
  # the Listener to be created. If your certificate isn't issued by ACM, specify
  # var.https_listener_ports_and_ssl_certs instead. Tip: When you define
  # Listener Rules for these Listeners, be sure that, for each Listener, at
  # least one Listener Rule  uses the '*' path to ensure that every possible
  # request path for that Listener is handled by a Listener Rule. Otherwise some
  # requests won't route to any Target Group.
  https_listener_ports_and_acm_ssl_certs = []

  # The number of elements in var.https_listener_ports_and_acm_ssl_certs. We
  # should be able to compute this automatically, but due to a Terraform
  # limitation, if there are any dynamic resources in
  # var.https_listener_ports_and_acm_ssl_certs, then we won't be able to:
  # https://github.com/hashicorp/terraform/pull/11482
  https_listener_ports_and_acm_ssl_certs_num = 0

  # A list of the ports for which an HTTPS Listener should be created on the
  # ALB. Each item in the list should be a map with the keys 'port', the port
  # number to listen on, and 'tls_arn', the Amazon Resource Name (ARN) of the
  # SSL/TLS certificate to associate with the Listener to be created. If your
  # certificate is issued by the Amazon Certificate Manager (ACM), specify
  # var.https_listener_ports_and_acm_ssl_certs instead. Tip: When you define
  # Listener Rules for these Listeners, be sure that, for each Listener, at
  # least one Listener Rule  uses the '*' path to ensure that every possible
  # request path for that Listener is handled by a Listener Rule. Otherwise some
  # requests won't route to any Target Group.
  https_listener_ports_and_ssl_certs = []

  # The number of elements in var.https_listener_ports_and_ssl_certs. We should
  # be able to compute this automatically, but due to a Terraform limitation, if
  # there are any dynamic resources in var.https_listener_ports_and_ssl_certs,
  # then we won't be able to: https://github.com/hashicorp/terraform/pull/11482
  https_listener_ports_and_ssl_certs_num = 0

  # The time in seconds that the client TCP connection to the ALB is allowed to
  # be idle before the ALB closes the TCP connection.  
  idle_timeout = 60

  # The type of IP addresses used by the subnets for your load balancer. The
  # possible values are ipv4 and dualstack.
  ip_address_type = null

  # DEPRECATED. The VPC ID in which this ALB will be placed.
  vpc_id = ""

  #  (Optional) Determines how the load balancer modifies the X-Forwarded-For
  # header in the HTTP request before sending the request to the target. The
  # possible values are append, preserve, and remove. Only valid for Load
  # Balancers of type application. The default is append.
  xff_header_processing_mode = "append"

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="alb_name" requirement="required" type="string">
<HclListItemDescription>

The name of the ALB. Do not include the environment name since this module will automatically append it to the value of this variable.

</HclListItemDescription>
</HclListItem>

<HclListItem name="is_internal_alb" requirement="required" type="bool">
<HclListItemDescription>

If the ALB should only accept traffic from within the VPC, set this to true. If it should accept traffic from the public Internet, set it to false.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ssl_policy" requirement="required" type="string">
<HclListItemDescription>

The AWS predefined TLS/SSL policy for the ALB. A List of policies can be found here: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html#describe-ssl-policies. AWS recommends ELBSecurityPolicy-2016-08 policy for general use but this policy includes TLSv1.0 which is rapidly being phased out. ELBSecurityPolicy-TLS-1-1-2017-01 is the next policy up that doesn't include TLSv1.0.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

A list of the subnets into which the ALB will place its underlying nodes. Include one subnet per Availabability Zone. If the ALB is public-facing, these should be public subnets. Otherwise, they should be private subnets.

</HclListItemDescription>
</HclListItem>

### Optional

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

<HclListItem name="additional_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

Add additional security groups to the ALB

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="additional_ssl_certs_for_ports" requirement="optional" type="map(list(…))">
<HclListItemDescription>

List of additional SSL certs (non-ACM and ACM) to bind to the given listener port. Note that this must not overlap with the certificates defined in <a href="#https_listener_ports_and_ssl_certs"><code>https_listener_ports_and_ssl_certs</code></a> and <a href="#https_listener_ports_and_acm_ssl_certs"><code>https_listener_ports_and_acm_ssl_certs</code></a>. The keys are the listener ports.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(list(object({
    # Exactly one of the following must be set, with the other set to null.
    # The domain name to use when looking up the ACM cert to associate.
    tls_domain_name = string
    # The ARN of the TLS cert to associate with the listener.
    tls_arn = string
  })))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="alb_access_logs_s3_bucket_name" requirement="optional" type="string">
<HclListItemDescription>

The S3 Bucket name where ALB logs should be stored. If left empty, no ALB logs will be captured. Tip: It's easiest to create the S3 Bucket using the Gruntwork Module https://github.com/gruntwork-io/terraform-aws-monitoring/tree/main/modules/logs/load-balancer-access-logs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="allow_all_outbound" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable all outbound traffic on this ALB. If set to false, the ALB will allow no outbound traffic by default. This will make the ALB unusuable, so some other code must then update the ALB Security Group to enable outbound access!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="allow_inbound_from_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

The CIDR-formatted IP Address ranges from which this ALB will allow incoming requests. If <a href="#is_internal_alb"><code>is_internal_alb</code></a> is false, use the default value. If <a href="#is_internal_alb"><code>is_internal_alb</code></a> is true, consider setting this to the VPC's CIDR Block, or something even more restrictive.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[
  &quot;0.0.0.0/0&quot;
]"/>
</HclListItem>

<HclListItem name="allow_inbound_from_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of security groups from which this ALB will allow incoming requests. . If you update this variable, make sure to update <a href="#allow_inbound_from_security_group_ids_num"><code>allow_inbound_from_security_group_ids_num</code></a> too!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_inbound_from_security_group_ids_num" requirement="optional" type="number">
<HclListItemDescription>

The number of elements in <a href="#allow_inbound_from_security_group_ids"><code>allow_inbound_from_security_group_ids</code></a>. We should be able to compute this automatically, but due to a Terraform limitation, if there are any dynamic resources in <a href="#allow_inbound_from_security_group_ids"><code>allow_inbound_from_security_group_ids</code></a>, then we won't be able to: https://github.com/hashicorp/terraform/pull/11482

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="custom_alb_access_logs_s3_prefix" requirement="optional" type="string">
<HclListItemDescription>

Prefix to use for access logs to create a sub-folder in S3 Bucket name where ALB logs should be stored. Only used if <a href="#enable_custom_alb_access_logs_s3_prefix"><code>enable_custom_alb_access_logs_s3_prefix</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the ALB and its Security Group. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="default_action" requirement="optional" type="object(…)">
<HclListItemDescription>

Define the default action if a request to the load balancer does not match any of your listener rules. https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_listener#default_action

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    forward = optional(object({
      target_groups = list(object({
        arn    = string
        weight = optional(number)
      }))
      stickiness = optional(object({
        duration = optional(number)
        enabled  = optional(bool)
      }))
    }))
    redirect = optional(object({
      host        = optional(string)
      path        = optional(string)
      port        = optional(string)
      protocol    = optional(string)
      query       = optional(string)
      status_code = string
    }))
    fixed-response = optional(object({
      content_type = string
      message_body = optional(string)
      status_code  = number
    }))
    authenticate-cognito = optional(object({
      user_pool_arn       = string
      user_pool_client_id = string
      user_pool_domain    = string
    }))
    authenticate-oidc = optional(object({
      authorization_endpoint = string
      client_id              = string
      client_secret          = string
      issuer                 = string
      token_endpoint         = string
      user_info_endpoint     = string
    }))
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
{
  fixed-response = {
    content_type = "text/plain",
    message_body = null,
    status_code = 404
  }
}
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="dependencies" requirement="optional" type="list(string)">
<HclListItemDescription>

Create a dependency between the resources in this module to the interpolated values in this list (and thus the source resources). In other words, the resources in this module will now depend on the resources backing the values in this list such that those resources need to be created before the resources in this module, and the resources in this module need to be destroyed before the resources in the list.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="desync_mitigation_mode" requirement="optional" type="string">
<HclListItemDescription>

Determines how the load balancer handles requests that might pose a security risk to an application due to HTTP desync. Valid values are monitor, defensive (default), strictest.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;defensive&quot;"/>
</HclListItem>

<HclListItem name="drop_invalid_header_fields" requirement="optional" type="bool">
<HclListItemDescription>

If true, the ALB will drop invalid headers. Elastic Load Balancing requires that message header names contain only alphanumeric characters and hyphens.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_alb_access_logs" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable the ALB to log all requests. Ideally, this variable wouldn't be necessary, but because Terraform can't interpolate dynamic variables in counts, we must explicitly include this. Enter true or false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_custom_alb_access_logs_s3_prefix" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to use the value of alb_access_logs_s3_prefix for access logs prefix. If false, the alb_name will be used. This is useful if you wish to disable the S3 prefix. Only used if <a href="#enable_alb_access_logs"><code>enable_alb_access_logs</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_deletion_protection" requirement="optional" type="bool">
<HclListItemDescription>

If true, deletion of the ALB will be disabled via the AWS API. This will prevent Terraform from deleting the load balancer.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_http2" requirement="optional" type="bool">
<HclListItemDescription>

Indicates whether HTTP/2 is enabled in application load balancers. Defaults to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_waf_fail_open" requirement="optional" type="bool">
<HclListItemDescription>

Indicates whether to allow a WAF-enabled load balancer to route requests to targets if it is unable to forward the request to AWS WAF.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_xff_client_port" requirement="optional" type="bool">
<HclListItemDescription>

Indicates whether the X-Forwarded-For header should preserve the source port that the client used to connect to the load balancer in application load balancers. Defaults to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="http_default_action" requirement="optional" type="object(…)">
<HclListItemDescription>

Define the default action for HTTP listeners. Use this to override the default_action variable for HTTP listeners. This is particularly useful if you for example want to redirect all HTTP traffic to HTTPS.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    forward = optional(object({
      target_groups = list(object({
        arn    = string
        weight = optional(number)
      }))
      stickiness = optional(object({
        duration = optional(number)
        enabled  = optional(bool)
      }))
    }))
    redirect = optional(object({
      host        = optional(string)
      path        = optional(string)
      port        = optional(string)
      protocol    = optional(string)
      query       = optional(string)
      status_code = string
    }))
    fixed-response = optional(object({
      content_type = string
      message_body = optional(string)
      status_code  = number
    }))
    authenticate-cognito = optional(object({
      user_pool_arn       = string
      user_pool_client_id = string
      user_pool_domain    = string
    }))
    authenticate-oidc = optional(object({
      authorization_endpoint = string
      client_id              = string
      client_secret          = string
      issuer                 = string
      token_endpoint         = string
      user_info_endpoint     = string
    }))
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Example (redirect all HTTP traffic to HTTPS):
   default = {
    redirect = {
      protocol    = "HTTPS"
      port        = "443"
      status_code = "HTTP_301"
    }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="http_listener_ports" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of ports for which an HTTP Listener should be created on the ALB. Tip: When you define Listener Rules for these Listeners, be sure that, for each Listener, at least one Listener Rule uses the '*' path to ensure that every possible request path for that Listener is handled by a Listener Rule. Otherwise some requests won't route to any Target Group.

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
    default_action = optional(object({
      forward = optional(object({
        target_groups = list(object({
          arn    = string
          weight = optional(number)
        }))
        stickiness = optional(object({
          duration = optional(number)
          enabled  = optional(bool)
        }))
      }))
      redirect = optional(object({
        host        = optional(string)
        path        = optional(string)
        port        = optional(string)
        protocol    = optional(string)
        query       = optional(string)
        status_code = string
      }))
      fixed-response = optional(object({
        content_type = string
        message_body = optional(string)
        status_code  = number
      }))
      authenticate-cognito = optional(object({
        user_pool_arn       = string
        user_pool_client_id = string
        user_pool_domain    = string
      }))
      authenticate-oidc = optional(object({
        authorization_endpoint = string
        client_id              = string
        client_secret          = string
        issuer                 = string
        token_endpoint         = string
        user_info_endpoint     = string
      }))
    }))
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = [
     {
       port = 443
       tls_domain_name = "foo.your-company.com"
     }
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="https_listener_ports_and_acm_ssl_certs_num" requirement="optional" type="number">
<HclListItemDescription>

The number of elements in <a href="#https_listener_ports_and_acm_ssl_certs"><code>https_listener_ports_and_acm_ssl_certs</code></a>. We should be able to compute this automatically, but due to a Terraform limitation, if there are any dynamic resources in <a href="#https_listener_ports_and_acm_ssl_certs"><code>https_listener_ports_and_acm_ssl_certs</code></a>, then we won't be able to: https://github.com/hashicorp/terraform/pull/11482

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
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
    default_action = optional(object({
      forward = optional(object({
        target_groups = list(object({
          arn    = string
          weight = optional(number)
        }))
        stickiness = optional(object({
          duration = optional(number)
          enabled  = optional(bool)
        }))
      }))
      redirect = optional(object({
        host        = optional(string)
        path        = optional(string)
        port        = optional(string)
        protocol    = optional(string)
        query       = optional(string)
        status_code = string
      }))
      fixed-response = optional(object({
        content_type = string
        message_body = optional(string)
        status_code  = number
      }))
      authenticate-cognito = optional(object({
        user_pool_arn       = string
        user_pool_client_id = string
        user_pool_domain    = string
      }))
      authenticate-oidc = optional(object({
        authorization_endpoint = string
        client_id              = string
        client_secret          = string
        issuer                 = string
        token_endpoint         = string
        user_info_endpoint     = string
      }))
    }))
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = [
     {
       port = 443
       tls_arn = "arn:aws:iam::123456789012:server-certificate/ProdServerCert"
     }
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="https_listener_ports_and_ssl_certs_num" requirement="optional" type="number">
<HclListItemDescription>

The number of elements in <a href="#https_listener_ports_and_ssl_certs"><code>https_listener_ports_and_ssl_certs</code></a>. We should be able to compute this automatically, but due to a Terraform limitation, if there are any dynamic resources in <a href="#https_listener_ports_and_ssl_certs"><code>https_listener_ports_and_ssl_certs</code></a>, then we won't be able to: https://github.com/hashicorp/terraform/pull/11482

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="idle_timeout" requirement="optional" type="number">
<HclListItemDescription>

The time in seconds that the client TCP connection to the ALB is allowed to be idle before the ALB closes the TCP connection.  

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="ip_address_type" requirement="optional" type="string">
<HclListItemDescription>

The type of IP addresses used by the subnets for your load balancer. The possible values are ipv4 and dualstack.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="vpc_id" requirement="optional" type="string">
<HclListItemDescription>

DEPRECATED. The VPC ID in which this ALB will be placed.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="xff_header_processing_mode" requirement="optional" type="string">
<HclListItemDescription>

 (Optional) Determines how the load balancer modifies the X-Forwarded-For header in the HTTP request before sending the request to the target. The possible values are append, preserve, and remove. Only valid for Load Balancers of type application. The default is append.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;append&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="alb_arn">
<HclListItemDescription>

The AWS ARN of the ALB that has been deployed using this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="alb_arn_suffix">
<HclListItemDescription>

The AWS ARN Suffix of the ALB that has been deployed using this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="alb_dns_name">
<HclListItemDescription>

The DNS name that can be used to reach the ALB that has been deployed using this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="alb_hosted_zone_id">
<HclListItemDescription>

The Route 53 Hosted Zone ID that manages the DNS record for the ALB that has been deployed using this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="alb_name">
<HclListItemDescription>

The name of the ALB that has been deployed using this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="alb_security_group_id">
<HclListItemDescription>

The AWS ID of the security group for the ALB that has been deployed using this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="http_listener_arns">
<HclListItemDescription>

A map from port to the AWS ARNs of the HTTP listener for the ALB that has been deployed using this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="https_listener_acm_cert_arns">
<HclListItemDescription>

A map from port to the AWS ARNs of the HTTPS listener that uses ACM SSL certificates for the ALB that has been deployed using this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="https_listener_non_acm_cert_arns">
<HclListItemDescription>

A map from port to the AWS ARNs of the HTTPS listener that uses non-ACM SSL certificates for the ALB that has been deployed using this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="listener_arns">
<HclListItemDescription>

A map from port to the AWS ARNs of the listeners for the ALB that has been deployed using this module.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-load-balancer/tree/v0.30.0/modules/alb/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-load-balancer/tree/v0.30.0/modules/alb/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-load-balancer/tree/v0.30.0/modules/alb/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "50ae6231e41628d137320f64c6e917d3"
}
##DOCS-SOURCER-END -->
