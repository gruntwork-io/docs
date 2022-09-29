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
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.96.2" lastModifiedVersion="0.96.1"/>

# Auto Scaling Group


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.96.2/modules/services/asg-service" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

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
*   [User Data](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.96.2/modules/services/asg-service/core-concepts.md)

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.96.2/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.96.2/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="ami" requirement="required" type="string">
<HclListItemDescription>

The ID of the AMI to run on each instance in the ASG. The AMI needs to have `ec2-baseline` installed, since by default it will run `start_ec2_baseline` on the User Data.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ami_filters" requirement="required" type="object(…)">
<HclListItemDescription>

Properties on the AMI that can be used to lookup a prebuilt AMI for use with the Bastion Host. You can build the AMI using the Packer template bastion-host.json. Only used if <a href="#ami"><code>ami</code></a> is null. One of <a href="#ami"><code>ami</code></a> or <a href="#ami_filters"><code>ami_filters</code></a> is required. Set to null if passing the ami ID directly.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # List of owners to limit the search. Set to null if you do not wish to limit the search by AMI owners.
    owners = list(string)

    # Name/Value pairs to filter the AMI off of. There are several valid keys, for a full reference, check out the
    # documentation for describe-images in the AWS CLI reference
    # (https://docs.aws.amazon.com/cli/latest/reference/ec2/describe-images.html).
    filters = list(object({
      name   = string
      values = list(string)
    }))
  })
```

</HclListItemTypeDetails>
</HclListItem>

<HclListItem name="instance_type" requirement="required" type="string">
<HclListItemDescription>

The type of instance to run in the ASG (e.g. t3.medium)

</HclListItemDescription>
</HclListItem>

<HclListItem name="max_size" requirement="required" type="number">
<HclListItemDescription>

The maximum number of EC2 Instances to run in this ASG

</HclListItemDescription>
</HclListItem>

<HclListItem name="min_elb_capacity" requirement="required" type="number">
<HclListItemDescription>

Wait for this number of EC2 Instances to show up healthy in the load balancer on creation.

</HclListItemDescription>
</HclListItem>

<HclListItem name="min_size" requirement="required" type="number">
<HclListItemDescription>

The minimum number of EC2 Instances to run in this ASG

</HclListItemDescription>
</HclListItem>

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name for the ASG and all other resources created by these templates.

</HclListItemDescription>
</HclListItem>

<HclListItem name="subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

The list of IDs of the subnets in which to deploy ASG. The list must only contain subnets in <a href="#vpc_id"><code>vpc_id</code></a>.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the VPC in which to deploy the Auto Scaling Group

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="alarm_sns_topic_arns_us_east_1" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of SNS topic ARNs to notify when the health check changes to ALARM, OK, or INSUFFICIENT_DATA state. Note: these SNS topics MUST be in us-east-1! This is because Route 53 only sends CloudWatch metrics to us-east-1, so we must create the alarm in that region, and therefore, can only notify SNS topics in that region.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="alarms_sns_topic_arn" requirement="optional" type="list(string)">
<HclListItemDescription>

The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications. Also used for the alarms if the Jenkins backup job fails.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_inbound_from_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

The CIDR blocks from which to allow access to the ports in <a href="#server_ports"><code>server_ports</code></a>

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_inbound_from_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The security group IDs from which to allow access to the ports in <a href="#server_ports"><code>server_ports</code></a>

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_ssh_from_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

The CIDR blocks from which to allow SSH access

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_ssh_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The security group IDs from which to allow SSH access

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cloud_init_parts" requirement="optional" type="map(object(…))">
<HclListItemDescription>

Cloud init scripts to run on the ASG instances during boot. See the part blocks in https://www.terraform.io/docs/providers/template/d/cloudinit_config.html for syntax

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    filename     = string
    content_type = string
    content      = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for encrypting log data.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_retention_in_days" requirement="optional" type="number">
<HclListItemDescription>

The number of days to retain log events in the log group. Refer to https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days for all the valid values. When null, the log events are retained forever.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags to apply on the CloudWatch Log Group, encoded as a map where the keys are tag keys and values are tag values.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="create_route53_entry" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to create a DNS A record in Route 53 for this service.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="list(object(…))">
<HclListItemDescription>

A list of custom tags to apply to the EC2 Instances in this ASG. Each item in this list should be a map with the parameters key, value, and propagate_at_launch.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    key                 = string
    value               = string
    propagate_at_launch = bool
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="default_forward_target_group_arns" requirement="optional" type="list(any)">
<HclListItemDescription>

The ARN of the Target Group to which to route traffic.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="default_user" requirement="optional" type="string">
<HclListItemDescription>

The default OS user for the service AMI. For example, for AWS Ubuntu AMIs, the default OS user is 'ubuntu'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ubuntu&quot;"/>
</HclListItem>

<HclListItem name="desired_capacity" requirement="optional" type="number">
<HclListItemDescription>

The desired number of EC2 Instances to run in the ASG initially. Note that auto scaling policies may change this value. If you're using auto scaling policies to dynamically resize the cluster, you should actually leave this value as null.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="domain_name" requirement="optional" type="string">
<HclListItemDescription>

The domain name to register in <a href="#hosted_zone_id"><code>hosted_zone_id</code></a> (e.g. foo.example.com). Only used if <a href="#create_route53_entry"><code>create_route53_entry</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_alarms" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using <a href="#alarms_sns_topic_arn"><code>alarms_sns_topic_arn</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_log_aggregation" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to add AIM permissions to send logs to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/cloudwatch-log-aggregation-scripts to do log aggregation in CloudWatch.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_metrics" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to add IAM permissions to send custom metrics to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent to get memory and disk metrics in CloudWatch for your Auto Scaling Group

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_fail2ban" requirement="optional" type="bool">
<HclListItemDescription>

Enable fail2ban to block brute force log in attempts. Defaults to true

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_ip_lockdown" requirement="optional" type="bool">
<HclListItemDescription>

Enable ip-lockdown to block access to the instance metadata. Defaults to true

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_route53_health_check" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, use Route 53 to perform health checks on <a href="#domain_name"><code>domain_name</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enabled_metrics" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of metrics the ASG should enable for monitoring all instances in a group. The allowed values are GroupMinSize, GroupMaxSize, GroupDesiredCapacity, GroupInServiceInstances, GroupPendingInstances, GroupStandbyInstances, GroupTerminatingInstances, GroupTotalInstances.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="external_account_ssh_grunt_role_arn" requirement="optional" type="string">
<HclListItemDescription>

Since our IAM users are defined in a separate AWS account, this variable is used to specify the ARN of an IAM role that allows ssh-grunt to retrieve IAM group and public SSH key info from that account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="fixed_response_listener_rules" requirement="optional" type="map(any)">
<HclListItemDescription>

Listener rules for a fixed-response action. See comments below for information about the parameters.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="forward_listener_rules" requirement="optional" type="any">
<HclListItemDescription>

Listener rules for a forward action that distributes requests among one or more target groups. By default, sends traffic to the target groups created for the ports in <a href="#server_ports"><code>server_ports</code></a>. See comments below for information about the parameters.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="health_check_grace_period" requirement="optional" type="number">
<HclListItemDescription>

Time, in seconds, after an EC2 Instance comes into service before checking health.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="high_asg_cpu_utilization_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the CPU utilization percentage for the ASG.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="high_asg_cpu_utilization_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the ASG has an average cluster CPU utilization percentage above this threshold.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="90"/>
</HclListItem>

<HclListItem name="high_asg_cpu_utilization_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="high_asg_disk_utilization_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the root disk utilization percentage for the ASG.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="high_asg_disk_utilization_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the ASG has an average cluster root disk utilization percentage above this threshold.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="90"/>
</HclListItem>

<HclListItem name="high_asg_disk_utilization_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="high_asg_memory_utilization_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the Memory utilization percentage for the ASG.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="high_asg_memory_utilization_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the ASG has an average cluster Memory utilization percentage above this threshold.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="90"/>
</HclListItem>

<HclListItem name="high_asg_memory_utilization_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="hosted_zone_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the Route 53 Hosted Zone in which to create a DNS A record for the Auto Scaling Group. Optional if create_route53_entry = false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="iam_policy" requirement="optional" type="map(object(…))">
<HclListItemDescription>

An object defining the policy to attach to `iam_role_name` if the IAM role is going to be created. Accepts a map of objects, where the map keys are sids for IAM policy statements, and the object fields are the resources, actions, and the effect ('Allow' or 'Deny') of the statement. Ignored if `iam_role_arn` is provided. Leave as null if you do not wish to use IAM role with Service Accounts.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    resources = list(string)
    actions   = list(string)
    effect    = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="key_pair_name" requirement="optional" type="string">
<HclListItemDescription>

The name of a Key Pair that can be used to SSH to the EC2 Instances in the ASG. Set to null if you don't want to enable Key Pair auth.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="lb_hosted_zone_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the Route 53 Hosted Zone in which to create a DNS A record for the Auto Scaling Group. Optional if create_route53_entry = false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="listener_arns" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of all the listeners on the load balancer. The keys should be the port numbers and the values should be the ARN of the listener for that port.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="listener_ports" requirement="optional" type="list(number)">
<HclListItemDescription>

The ports the ALB listens on for requests

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="load_balancers" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of Elastic Load Balancer (ELB) names to associate with this ASG. If you're using the Application Load Balancer (ALB), see <a href="#target_group_arns"><code>target_group_arns</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="metadata_users" requirement="optional" type="list(string)">
<HclListItemDescription>

List of users on the ASG EC2 instances that should be permitted access to the EC2 metadata.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="original_lb_dns_name" requirement="optional" type="string">
<HclListItemDescription>

The DNS name that was assigned by AWS to the load balancer upon creation

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="redirect_listener_rules" requirement="optional" type="map(any)">
<HclListItemDescription>

Listener rules for a redirect action. See comments below for information about the parameters.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="route53_health_check_provider_external_id" requirement="optional" type="string">
<HclListItemDescription>

The optional external_id to be used in the us-east-1 provider block defined in the route53-health-check-alarms module.  This module configures its own AWS provider to ensure resources are created in us-east-1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="route53_health_check_provider_profile" requirement="optional" type="string">
<HclListItemDescription>

The optional AWS profile to be used in the us-east-1 provider block defined in the route53-health-check-alarms module.  This module configures its own AWS provider to ensure resources are created in us-east-1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="route53_health_check_provider_role_arn" requirement="optional" type="string">
<HclListItemDescription>

The optional role_arn to be used in the us-east-1 provider block defined in the route53-health-check-alarms module.  This module configures its own AWS provider to ensure resources are created in us-east-1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="route53_health_check_provider_session_name" requirement="optional" type="string">
<HclListItemDescription>

The optional session_name to be used in the us-east-1 provider block defined in the route53-health-check-alarms module.  This module configures its own AWS provider to ensure resources are created in us-east-1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="route53_health_check_provider_shared_credentials_file" requirement="optional" type="string">
<HclListItemDescription>

The optional path to a credentials file used in the us-east-1 provider block defined in the route53-health-check-alarms module.  This module configures its own AWS provider to ensure resources are created in us-east-1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="secrets_access" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of ARNs of Secrets Manager secrets that the task should have permissions to read. The IAM role for the task will be granted `secretsmanager:GetSecretValue` for each secret in the list. The ARN can be either the complete ARN, including the randomly generated suffix, or the ARN without the suffix. If the latter, the module will look up the full ARN automatically. This is helpful in cases where you don't yet know the randomly generated suffix because the rest of the ARN is a predictable value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="server_ports" requirement="optional" type="any">
<HclListItemDescription>

The ports the EC2 instances listen on for requests. A Target Group will be created for each port and any rules specified in <a href="#forward_rules"><code>forward_rules</code></a> will forward traffic to these Target Groups.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="should_create_cloudwatch_log_group" requirement="optional" type="bool">
<HclListItemDescription>

When true, precreate the CloudWatch Log Group to use for log aggregation from the EC2 instances. This is useful if you wish to customize the CloudWatch Log Group with various settings such as retention periods and KMS encryption. When false, the CloudWatch agent will automatically create a basic log group to use.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="ssh_grunt_iam_group" requirement="optional" type="string">
<HclListItemDescription>

If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the instances. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ssh-grunt-sudo-users&quot;"/>
</HclListItem>

<HclListItem name="ssh_grunt_iam_group_sudo" requirement="optional" type="string">
<HclListItemDescription>

If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the instances with sudo permissions. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ssh-grunt-sudo-users&quot;"/>
</HclListItem>

<HclListItem name="ssh_port" requirement="optional" type="string">
<HclListItemDescription>

The port at which SSH will be allowed from <a href="#allow_ssh_from_cidr_blocks"><code>allow_ssh_from_cidr_blocks</code></a> and <a href="#allow_ssh_security_group_ids"><code>allow_ssh_security_group_ids</code></a>

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="22"/>
</HclListItem>

<HclListItem name="tag_asg_id_key" requirement="optional" type="string">
<HclListItemDescription>

The key for the tag that will be used to associate a unique identifier with this ASG. This identifier will persist between redeploys of the ASG, even though the underlying ASG is being deleted and replaced with a different one.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;AsgId&quot;"/>
</HclListItem>

<HclListItem name="termination_policies" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of policies to decide how the instances in the auto scale group should be terminated. The allowed values are OldestInstance, NewestInstance, OldestLaunchConfiguration, ClosestToNextInstanceHour, Default.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="use_elb_health_checks" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not ELB or ALB health checks should be enabled. If set to true, the load_balancers or target_groups_arns variable should be set depending on the load balancer type you are using. Useful for testing connectivity before health check endpoints are available.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="use_managed_iam_policies" requirement="optional" type="bool">
<HclListItemDescription>

When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="wait_for_capacity_timeout" requirement="optional" type="string">
<HclListItemDescription>

A maximum duration that Terraform should wait for the EC2 Instances to be healthy before timing out.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;10m&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="asg_name">
<HclListItemDescription>

The name of the auto scaling group.

</HclListItemDescription>
</HclListItem>

<HclListItem name="asg_unique_id">
<HclListItemDescription>

A unique ID common to all ASGs used for get_desired_capacity on new deploys.

</HclListItemDescription>
</HclListItem>

<HclListItem name="fully_qualified_domain_name">
<HclListItemDescription>

The Fully Qualified Domain Name built using the zone domain and name.

</HclListItemDescription>
</HclListItem>

<HclListItem name="launch_configuration_id">
<HclListItemDescription>

The ID of the launch configuration used for the ASG.

</HclListItemDescription>
</HclListItem>

<HclListItem name="launch_configuration_name">
<HclListItemDescription>

The name of the launch configuration used for the ASG.

</HclListItemDescription>
</HclListItem>

<HclListItem name="lb_listener_rule_fixed_response_arns">
<HclListItemDescription>

The ARNs of the rules of type fixed-response. The key is the same key of the rule from the `fixed_response_rules` variable.

</HclListItemDescription>
</HclListItem>

<HclListItem name="lb_listener_rule_forward_arns">
<HclListItemDescription>

The ARNs of the rules of type forward. The key is the same key of the rule from the `forward_rules` variable.

</HclListItemDescription>
</HclListItem>

<HclListItem name="lb_listener_rule_redirect_arns">
<HclListItemDescription>

The ARNs of the rules of type redirect. The key is the same key of the rule from the `redirect_rules` variable.

</HclListItemDescription>
</HclListItem>

<HclListItem name="security_group_id">
<HclListItemDescription>

The ID of the Security Group that belongs to the ASG.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.96.2/modules%2Fservices%2Fasg-service%2FREADME.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.96.2/modules%2Fservices%2Fasg-service%2Fvariables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.96.2/modules%2Fservices%2Fasg-service%2Foutputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "dc44c003de1ff99a118ebf6084007e0c"
}
##DOCS-SOURCER-END -->
