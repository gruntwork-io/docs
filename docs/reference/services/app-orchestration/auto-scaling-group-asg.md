---
type: "service"
name: "Auto Scaling Group (ASG)"
description: "Deploy an AMI across an Auto Scaling Group (ASG), with support for zero-downtime, rolling deployment, load balancing, health checks, service discovery, and auto scaling."
category: "services"
cloud: "aws"
tags: ["asg","ec2"]
license: "gruntwork"
built-with: "terraform"
title: "Auto Scaling Group"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import HclListItem from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.85.0" lastModifiedVersion="0.85.0"/>

# Auto Scaling Group


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/asg-service" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=services%2Fasg-service" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

## Overview

This service contains code to deploy [Auto Scaling Groups](https://aws.amazon.com/ec2/autoscaling/) on AWS.

![ASG architecture](/img/reference/services/app-orchestration/asg-architecture.png)

## Features

*   Load balancer (ELB) integration
*   Listener Rules
*   Health checks
*   Zero-downtime rolling deployment
*   Route53 record

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

Under the hood, this is all implemented using Terraform modules from the Gruntwork
[terraform-aws-asg](https://github.com/gruntwork-io/terraform-aws-asg) repo. If you are a subscriber and don’t have
access to this repo, email <support@gruntwork.io>.

*   [ASG Documentation](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html):
    Amazon’s docs for ASG that cover core concepts such as launch templates, launch configuration and auto scaling groups.
*   [User Data](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/asg-service/core-concepts.md)

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<br/>

### Required

<HclListItem name="ami" requirement="required" description="The ID of the AMI to run on each instance in the ASG. The AMI needs to have `ec2-baseline` installed, since by default it will run `<a href=#start_ec2_baseline><code>start_ec2_baseline</code></a>` on the User Data." type="string"/>

<HclListItem name="ami_filters" requirement="required" description="Properties on the AMI that can be used to lookup a prebuilt AMI for use with the Bastion Host. You can build the AMI using the Packer template bastion-host.json. Only used if var.ami is null. One of var.ami or <a href=#ami_filters><code>ami_filters</code></a> is required. Set to null if passing the ami ID directly." type="object" typeDetails="object({
    # List of owners to limit the search. Set to null if you do not wish to limit the search by AMI owners.
    owners = list(string)
    # Name/Value pairs to filter the AMI off of. There are several valid keys, for a full reference, check out the
    # documentation for describe-images in the AWS CLI reference
    # (https://docs.aws.amazon.com/cli/latest/reference/ec2/describe-images.html).
    filters = list(object({
      name   = string
      values = list(string)
    }))
  })"/>

<HclListItem name="instance_type" requirement="required" description="The type of instance to run in the ASG (e.g. t3.medium)" type="string"/>

<HclListItem name="max_size" requirement="required" description="The maximum number of EC2 Instances to run in this ASG" type="number"/>

<HclListItem name="min_elb_capacity" requirement="required" description="Wait for this number of EC2 Instances to show up healthy in the load balancer on creation." type="number"/>

<HclListItem name="min_size" requirement="required" description="The minimum number of EC2 Instances to run in this ASG" type="number"/>

<HclListItem name="name" requirement="required" description="The name for the ASG and all other resources created by these templates." type="string"/>

<HclListItem name="subnet_ids" requirement="required" description="The list of IDs of the subnets in which to deploy ASG. The list must only contain subnets in <a href=#vpc_id><code>vpc_id</code></a>." type="list" typeDetails="list(string)"/>

<HclListItem name="vpc_id" requirement="required" description="The ID of the VPC in which to deploy the Auto Scaling Group" type="string"/>


<br/>


### Optional

<HclListItem name="alarm_sns_topic_arns_us_east_1" requirement="optional" description="A list of SNS topic ARNs to notify when the health check changes to ALARM, OK, or <a href=#INSUFFICIENT_DATA><code>INSUFFICIENT_DATA</code></a> state. Note: these SNS topics MUST be in us-east-1! This is because Route 53 only sends CloudWatch metrics to us-east-1, so we must create the alarm in that region, and therefore, can only notify SNS topics in that region." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="alarms_sns_topic_arn" requirement="optional" description="The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications. Also used for the alarms if the Jenkins backup job fails." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="allow_inbound_from_cidr_blocks" requirement="optional" description="The CIDR blocks from which to allow access to the ports in <a href=#server_ports><code>server_ports</code></a>" type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="allow_inbound_from_security_group_ids" requirement="optional" description="The security group IDs from which to allow access to the ports in <a href=#server_ports><code>server_ports</code></a>" type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="allow_ssh_from_cidr_blocks" requirement="optional" description="The CIDR blocks from which to allow SSH access" type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="allow_ssh_security_group_ids" requirement="optional" description="The security group IDs from which to allow SSH access" type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="cloud_init_parts" requirement="optional" description="Cloud init scripts to run on the ASG instances during boot. See the part blocks in https://www.terraform.io/docs/providers/template/d/<a href=#cloudinit_config><code>cloudinit_config</code></a>.html for syntax" type="map" typeDetails="map(object({
    filename     = string
    content_type = string
    content      = string
  }))" defaultValue="{}"/>

<HclListItem name="cloudwatch_log_group_kms_key_id" requirement="optional" description="The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for encrypting log data." type="string" defaultValue="null"/>

<HclListItem name="cloudwatch_log_group_retention_in_days" requirement="optional" description="The number of days to retain log events in the log group. Refer to https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/<a href=#cloudwatch_log_group><code>cloudwatch_log_group</code></a>#<a href=#retention_in_days><code>retention_in_days</code></a> for all the valid values. When null, the log events are retained forever." type="number" defaultValue="null"/>

<HclListItem name="cloudwatch_log_group_tags" requirement="optional" description="Tags to apply on the CloudWatch Log Group, encoded as a map where the keys are tag keys and values are tag values." type="map" typeDetails="map(string)" defaultValue="null"/>

<HclListItem name="create_route53_entry" requirement="optional" description="Set to true to create a DNS A record in Route 53 for this service." type="bool" defaultValue="false"/>

<HclListItem name="custom_tags" requirement="optional" description="A list of custom tags to apply to the EC2 Instances in this ASG. Each item in this list should be a map with the parameters key, value, and <a href=#propagate_at_launch><code>propagate_at_launch</code></a>." type="list" typeDetails="list(object({
    key                 = string
    value               = string
    propagate_at_launch = bool
  }))" defaultValue="[]"/>

<HclListItem name="default_forward_target_group_arns" requirement="optional" description="The ARN of the Target Group to which to route traffic." type="list" typeDetails="list(any)" defaultValue="[]"/>

<HclListItem name="default_user" requirement="optional" description="The default OS user for the service AMI. For example, for AWS Ubuntu AMIs, the default OS user is 'ubuntu'." type="string" defaultValue="ubuntu"/>

<HclListItem name="desired_capacity" requirement="optional" description="The desired number of EC2 Instances to run in the ASG initially. Note that auto scaling policies may change this value. If you're using auto scaling policies to dynamically resize the cluster, you should actually leave this value as null." type="number" defaultValue="null"/>

<HclListItem name="domain_name" requirement="optional" description="The domain name to register in <a href=#hosted_zone_id><code>hosted_zone_id</code></a> (e.g. foo.example.com). Only used if <a href=#create_route53_entry><code>create_route53_entry</code></a> is true." type="string" defaultValue="null"/>

<HclListItem name="enable_cloudwatch_alarms" requirement="optional" description="Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using <a href=#alarms_sns_topic_arn><code>alarms_sns_topic_arn</code></a>." type="bool" defaultValue="true"/>

<HclListItem name="enable_cloudwatch_log_aggregation" requirement="optional" description="Set to true to add AIM permissions to send logs to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/cloudwatch-log-aggregation-scripts to do log aggregation in CloudWatch." type="bool" defaultValue="true"/>

<HclListItem name="enable_cloudwatch_metrics" requirement="optional" description="Set to true to add IAM permissions to send custom metrics to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent to get memory and disk metrics in CloudWatch for your Auto Scaling Group" type="bool" defaultValue="true"/>

<HclListItem name="enable_fail2ban" requirement="optional" description="Enable fail2ban to block brute force log in attempts. Defaults to true" type="bool" defaultValue="true"/>

<HclListItem name="enable_ip_lockdown" requirement="optional" description="Enable ip-lockdown to block access to the instance metadata. Defaults to true" type="bool" defaultValue="true"/>

<HclListItem name="enable_route53_health_check" requirement="optional" description="If set to true, use Route 53 to perform health checks on <a href=#domain_name><code>domain_name</code></a>." type="bool" defaultValue="false"/>

<HclListItem name="enabled_metrics" requirement="optional" description="A list of metrics the ASG should enable for monitoring all instances in a group. The allowed values are GroupMinSize, GroupMaxSize, GroupDesiredCapacity, GroupInServiceInstances, GroupPendingInstances, GroupStandbyInstances, GroupTerminatingInstances, GroupTotalInstances." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="external_account_ssh_grunt_role_arn" requirement="optional" description="Since our IAM users are defined in a separate AWS account, this variable is used to specify the ARN of an IAM role that allows ssh-grunt to retrieve IAM group and public SSH key info from that account." type="string" defaultValue=""/>

<HclListItem name="fixed_response_listener_rules" requirement="optional" description="Listener rules for a fixed-response action. See comments below for information about the parameters." type="map" typeDetails="map(any)" defaultValue="{}"/>

<HclListItem name="forward_listener_rules" requirement="optional" description="Listener rules for a forward action that distributes requests among one or more target groups. By default, sends traffic to the target groups created for the ports in <a href=#server_ports><code>server_ports</code></a>. See comments below for information about the parameters." type="any" defaultValue="{}"/>

<HclListItem name="health_check_grace_period" requirement="optional" description="Time, in seconds, after an EC2 Instance comes into service before checking health." type="number" defaultValue="300"/>

<HclListItem name="hosted_zone_id" requirement="optional" description="The ID of the Route 53 Hosted Zone in which to create a DNS A record for the Auto Scaling Group. Optional if <a href=#create_route53_entry><code>create_route53_entry</code></a> = false." type="string" defaultValue="null"/>

<HclListItem name="iam_policy" requirement="optional" description="An object defining the policy to attach to `<a href=#iam_role_name><code>iam_role_name</code></a>` if the IAM role is going to be created. Accepts a map of objects, where the map keys are sids for IAM policy statements, and the object fields are the resources, actions, and the effect ('Allow' or 'Deny') of the statement. Ignored if `<a href=#iam_role_arn><code>iam_role_arn</code></a>` is provided. Leave as null if you do not wish to use IAM role with Service Accounts." type="map" typeDetails="map(object({
    resources = list(string)
    actions   = list(string)
    effect    = string
  }))" defaultValue="null"/>

<HclListItem name="key_pair_name" requirement="optional" description="The name of a Key Pair that can be used to SSH to the EC2 Instances in the ASG. Set to null if you don't want to enable Key Pair auth." type="string" defaultValue="null"/>

<HclListItem name="lb_hosted_zone_id" requirement="optional" description="The ID of the Route 53 Hosted Zone in which to create a DNS A record for the Auto Scaling Group. Optional if <a href=#create_route53_entry><code>create_route53_entry</code></a> = false." type="string" defaultValue="null"/>

<HclListItem name="listener_arns" requirement="optional" description="A map of all the listeners on the load balancer. The keys should be the port numbers and the values should be the ARN of the listener for that port." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="listener_ports" requirement="optional" description="The ports the ALB listens on for requests" type="list" typeDetails="list(number)" defaultValue="[]"/>

<HclListItem name="load_balancers" requirement="optional" description="A list of Elastic Load Balancer (ELB) names to associate with this ASG. If you're using the Application Load Balancer (ALB), see <a href=#target_group_arns><code>target_group_arns</code></a>." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="metadata_users" requirement="optional" description="List of users on the ASG EC2 instances that should be permitted access to the EC2 metadata." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="original_lb_dns_name" requirement="optional" description="The DNS name that was assigned by AWS to the load balancer upon creation" type="string" defaultValue="null"/>

<HclListItem name="redirect_listener_rules" requirement="optional" description="Listener rules for a redirect action. See comments below for information about the parameters." type="map" typeDetails="map(any)" defaultValue="{}"/>

<HclListItem name="route53_health_check_provider_external_id" requirement="optional" description="The optional <a href=#external_id><code>external_id</code></a> to be used in the us-east-1 provider block defined in the route53-health-check-alarms module.  This module configures its own AWS provider to ensure resources are created in us-east-1." type="string" defaultValue="null"/>

<HclListItem name="route53_health_check_provider_profile" requirement="optional" description="The optional AWS profile to be used in the us-east-1 provider block defined in the route53-health-check-alarms module.  This module configures its own AWS provider to ensure resources are created in us-east-1." type="string" defaultValue="null"/>

<HclListItem name="route53_health_check_provider_role_arn" requirement="optional" description="The optional <a href=#role_arn><code>role_arn</code></a> to be used in the us-east-1 provider block defined in the route53-health-check-alarms module.  This module configures its own AWS provider to ensure resources are created in us-east-1." type="string" defaultValue="null"/>

<HclListItem name="route53_health_check_provider_session_name" requirement="optional" description="The optional <a href=#session_name><code>session_name</code></a> to be used in the us-east-1 provider block defined in the route53-health-check-alarms module.  This module configures its own AWS provider to ensure resources are created in us-east-1." type="string" defaultValue="null"/>

<HclListItem name="route53_health_check_provider_shared_credentials_file" requirement="optional" description="The optional path to a credentials file used in the us-east-1 provider block defined in the route53-health-check-alarms module.  This module configures its own AWS provider to ensure resources are created in us-east-1." type="string" defaultValue="null"/>

<HclListItem name="secrets_access" requirement="optional" description="A list of ARNs of Secrets Manager secrets that the task should have permissions to read. The IAM role for the task will be granted `secretsmanager:GetSecretValue` for each secret in the list. The ARN can be either the complete ARN, including the randomly generated suffix, or the ARN without the suffix. If the latter, the module will look up the full ARN automatically. This is helpful in cases where you don't yet know the randomly generated suffix because the rest of the ARN is a predictable value." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="server_ports" requirement="optional" description="The ports the EC2 instances listen on for requests. A Target Group will be created for each port and any rules specified in <a href=#forward_rules><code>forward_rules</code></a> will forward traffic to these Target Groups." type="any" defaultValue="{}"/>

<HclListItem name="should_create_cloudwatch_log_group" requirement="optional" description="When true, precreate the CloudWatch Log Group to use for log aggregation from the EC2 instances. This is useful if you wish to customize the CloudWatch Log Group with various settings such as retention periods and KMS encryption. When false, the CloudWatch agent will automatically create a basic log group to use." type="bool" defaultValue="true"/>

<HclListItem name="ssh_grunt_iam_group" requirement="optional" description="If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the instances. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain)." type="string" defaultValue="ssh-grunt-sudo-users"/>

<HclListItem name="ssh_grunt_iam_group_sudo" requirement="optional" description="If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the instances with sudo permissions. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain)." type="string" defaultValue="ssh-grunt-sudo-users"/>

<HclListItem name="ssh_port" requirement="optional" description="The port at which SSH will be allowed from <a href=#allow_ssh_from_cidr_blocks><code>allow_ssh_from_cidr_blocks</code></a> and <a href=#allow_ssh_security_group_ids><code>allow_ssh_security_group_ids</code></a>" type="string" defaultValue="22"/>

<HclListItem name="tag_asg_id_key" requirement="optional" description="The key for the tag that will be used to associate a unique identifier with this ASG. This identifier will persist between redeploys of the ASG, even though the underlying ASG is being deleted and replaced with a different one." type="string" defaultValue="AsgId"/>

<HclListItem name="termination_policies" requirement="optional" description="A list of policies to decide how the instances in the auto scale group should be terminated. The allowed values are OldestInstance, NewestInstance, OldestLaunchConfiguration, ClosestToNextInstanceHour, Default." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="use_elb_health_checks" requirement="optional" description="Whether or not ELB or ALB health checks should be enabled. If set to true, the <a href=#load_balancers><code>load_balancers</code></a> or <a href=#target_groups_arns><code>target_groups_arns</code></a> variable should be set depending on the load balancer type you are using. Useful for testing connectivity before health check endpoints are available." type="bool" defaultValue="true"/>

<HclListItem name="use_managed_iam_policies" requirement="optional" description="When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards." type="bool" defaultValue="true"/>

<HclListItem name="wait_for_capacity_timeout" requirement="optional" description="A maximum duration that Terraform should wait for the EC2 Instances to be healthy before timing out." type="string" defaultValue="10m"/>

</TabItem>
<TabItem value="outputs" label="Outputs">

<br/>

<HclListItem name="asg_name" requirement="required" description="The name of the auto scaling group."/>

<HclListItem name="asg_unique_id" requirement="required" description="A unique ID common to all ASGs used for <a href=#get_desired_capacity><code>get_desired_capacity</code></a> on new deploys."/>

<HclListItem name="fully_qualified_domain_name" requirement="required" description="The Fully Qualified Domain Name built using the zone domain and name."/>

<HclListItem name="launch_configuration_id" requirement="required" description="The ID of the launch configuration used for the ASG."/>

<HclListItem name="launch_configuration_name" requirement="required" description="The name of the launch configuration used for the ASG."/>

<HclListItem name="lb_listener_rule_fixed_response_arns" requirement="required" description="The ARNs of the rules of type fixed-response. The key is the same key of the rule from the `<a href=#fixed_response_rules><code>fixed_response_rules</code></a>` variable."/>

<HclListItem name="lb_listener_rule_forward_arns" requirement="required" description="The ARNs of the rules of type forward. The key is the same key of the rule from the `<a href=#forward_rules><code>forward_rules</code></a>` variable."/>

<HclListItem name="lb_listener_rule_redirect_arns" requirement="required" description="The ARNs of the rules of type redirect. The key is the same key of the rule from the `<a href=#redirect_rules><code>redirect_rules</code></a>` variable."/>

<HclListItem name="security_group_id" requirement="required" description="The ID of the Security Group that belongs to the ASG."/>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"1c52a7c3b98dd433b47dd1fa6559b07d"}
##DOCS-SOURCER-END -->
