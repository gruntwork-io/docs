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
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.104.14" lastModifiedVersion="0.96.1"/>

# Auto Scaling Group

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/asg-service" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=services%2Fasg-service" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>

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
    Amazon’s docs for ASG that cover core concepts such as launch templates and auto scaling groups.
*   [User Data](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/asg-service/core-concepts.md)

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.


## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ASG-SERVICE MODULE
# ------------------------------------------------------------------------------------------------------

module "asg_service" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/asg-service?ref=v0.104.14"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the AMI to run on each instance in the ASG. The AMI needs to have
  # `ec2-baseline` installed, since by default it will run `start_ec2_baseline`
  # on the User Data.
  ami = <string>

  # Properties on the AMI that can be used to lookup a prebuilt AMI for use with
  # the Bastion Host. You can build the AMI using the Packer template
  # bastion-host.json. Only used if var.ami is null. One of var.ami or
  # var.ami_filters is required. Set to null if passing the ami ID directly.
  ami_filters = <object(
    owners = list(string)
    filters = list(object(
      name   = string
      values = list(string)
    ))
  )>

  # The type of instance to run in the ASG (e.g. t3.medium)
  instance_type = <string>

  # The maximum number of EC2 Instances to run in this ASG
  max_size = <number>

  # Wait for this number of EC2 Instances to show up healthy in the load
  # balancer on creation.
  min_elb_capacity = <number>

  # The minimum number of EC2 Instances to run in this ASG
  min_size = <number>

  # The name for the ASG and all other resources created by these templates.
  name = <string>

  # The list of IDs of the subnets in which to deploy ASG. The list must only
  # contain subnets in var.vpc_id.
  subnet_ids = <list(string)>

  # The ID of the VPC in which to deploy the Auto Scaling Group
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of SNS topic ARNs to notify when the health check changes to ALARM,
  # OK, or INSUFFICIENT_DATA state. Note: these SNS topics MUST be in us-east-1!
  # This is because Route 53 only sends CloudWatch metrics to us-east-1, so we
  # must create the alarm in that region, and therefore, can only notify SNS
  # topics in that region.
  alarm_sns_topic_arns_us_east_1 = []

  # The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and
  # disk space usage) should send notifications. Also used for the alarms if the
  # Jenkins backup job fails.
  alarms_sns_topic_arn = []

  # The CIDR blocks from which to allow access to the ports in var.server_ports
  allow_inbound_from_cidr_blocks = []

  # The security group IDs from which to allow access to the ports in
  # var.server_ports
  allow_inbound_from_security_group_ids = []

  # The CIDR blocks from which to allow SSH access
  allow_ssh_from_cidr_blocks = []

  # The security group IDs from which to allow SSH access
  allow_ssh_security_group_ids = []

  # Cloud init scripts to run on the ASG instances during boot. See the part
  # blocks in
  # https://www.terraform.io/docs/providers/template/d/cloudinit_config.html for
  # syntax
  cloud_init_parts = {}

  # The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for
  # encrypting log data.
  cloudwatch_log_group_kms_key_id = null

  # The number of days to retain log events in the log group. Refer to
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days
  # for all the valid values. When null, the log events are retained forever.
  cloudwatch_log_group_retention_in_days = null

  # Tags to apply on the CloudWatch Log Group, encoded as a map where the keys
  # are tag keys and values are tag values.
  cloudwatch_log_group_tags = null

  # Set to true to create a DNS A record in Route 53 for this service.
  create_route53_entry = false

  # A list of custom tags to apply to the EC2 Instances in this ASG. Each item
  # in this list should be a map with the parameters key, value, and
  # propagate_at_launch.
  custom_tags = []

  # The ARN of the Target Group to which to route traffic.
  default_forward_target_group_arns = []

  # The default OS user for the service AMI. For example, for AWS Ubuntu AMIs,
  # the default OS user is 'ubuntu'.
  default_user = "ubuntu"

  # The desired number of EC2 Instances to run in the ASG initially. Note that
  # auto scaling policies may change this value. If you're using auto scaling
  # policies to dynamically resize the cluster, you should actually leave this
  # value as null.
  desired_capacity = null

  # The domain name to register in var.hosted_zone_id (e.g. foo.example.com).
  # Only used if var.create_route53_entry is true.
  domain_name = null

  # Set to true to enable several basic CloudWatch alarms around CPU usage,
  # memory usage, and disk space usage. If set to true, make sure to specify SNS
  # topics to send notifications to using var.alarms_sns_topic_arn.
  enable_cloudwatch_alarms = true

  # Set to true to add AIM permissions to send logs to CloudWatch. This is
  # useful in combination with
  # https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/cloudwatch-log-aggregation-scripts
  # to do log aggregation in CloudWatch.
  enable_cloudwatch_log_aggregation = true

  # Set to true to add IAM permissions to send custom metrics to CloudWatch.
  # This is useful in combination with
  # https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent
  # to get memory and disk metrics in CloudWatch for your Auto Scaling Group
  enable_cloudwatch_metrics = true

  # Enable fail2ban to block brute force log in attempts. Defaults to true
  enable_fail2ban = true

  # Enable ip-lockdown to block access to the instance metadata. Defaults to
  # true
  enable_ip_lockdown = true

  # If set to true, use Route 53 to perform health checks on var.domain_name.
  enable_route53_health_check = false

  # A list of metrics the ASG should enable for monitoring all instances in a
  # group. The allowed values are GroupMinSize, GroupMaxSize,
  # GroupDesiredCapacity, GroupInServiceInstances, GroupPendingInstances,
  # GroupStandbyInstances, GroupTerminatingInstances, GroupTotalInstances.
  enabled_metrics = []

  # Since our IAM users are defined in a separate AWS account, this variable is
  # used to specify the ARN of an IAM role that allows ssh-grunt to retrieve IAM
  # group and public SSH key info from that account.
  external_account_ssh_grunt_role_arn = ""

  # Listener rules for a fixed-response action. See comments below for
  # information about the parameters.
  fixed_response_listener_rules = {}

  # Listener rules for a forward action that distributes requests among one or
  # more target groups. By default, sends traffic to the target groups created
  # for the ports in var.server_ports. See comments below for information about
  # the parameters.
  forward_listener_rules = {}

  # Time, in seconds, after an EC2 Instance comes into service before checking
  # health.
  health_check_grace_period = 300

  # The period, in seconds, over which to measure the CPU utilization percentage
  # for the ASG.
  high_asg_cpu_utilization_period = 60

  # Trigger an alarm if the ASG has an average cluster CPU utilization
  # percentage above this threshold.
  high_asg_cpu_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_asg_cpu_utilization_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the root disk utilization
  # percentage for the ASG.
  high_asg_disk_utilization_period = 60

  # Trigger an alarm if the ASG has an average cluster root disk utilization
  # percentage above this threshold.
  high_asg_disk_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_asg_disk_utilization_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the Memory utilization
  # percentage for the ASG.
  high_asg_memory_utilization_period = 60

  # Trigger an alarm if the ASG has an average cluster Memory utilization
  # percentage above this threshold.
  high_asg_memory_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_asg_memory_utilization_treat_missing_data = "missing"

  # The ID of the Route 53 Hosted Zone in which to create a DNS A record for the
  # Auto Scaling Group. Optional if create_route53_entry = false.
  hosted_zone_id = null

  # An object defining the policy to attach to `iam_role_name` if the IAM role
  # is going to be created. Accepts a map of objects, where the map keys are
  # sids for IAM policy statements, and the object fields are the resources,
  # actions, and the effect ("Allow" or "Deny") of the statement. Ignored if
  # `iam_role_arn` is provided. Leave as null if you do not wish to use IAM role
  # with Service Accounts.
  iam_policy = null

  # The name of a Key Pair that can be used to SSH to the EC2 Instances in the
  # ASG. Set to null if you don't want to enable Key Pair auth.
  key_pair_name = null

  # The ID of the Route 53 Hosted Zone in which to create a DNS A record for the
  # Auto Scaling Group. Optional if create_route53_entry = false.
  lb_hosted_zone_id = null

  # A map of all the listeners on the load balancer. The keys should be the port
  # numbers and the values should be the ARN of the listener for that port.
  listener_arns = {}

  # The ports the ALB listens on for requests
  listener_ports = []

  # A list of Elastic Load Balancer (ELB) names to associate with this ASG. If
  # you're using the Application Load Balancer (ALB), see var.target_group_arns.
  load_balancers = []

  # List of users on the ASG EC2 instances that should be permitted access to
  # the EC2 metadata.
  metadata_users = []

  # The DNS name that was assigned by AWS to the load balancer upon creation
  original_lb_dns_name = null

  # Listener rules for a redirect action. See comments below for information
  # about the parameters.
  redirect_listener_rules = {}

  # The optional external_id to be used in the us-east-1 provider block defined
  # in the route53-health-check-alarms module.  This module configures its own
  # AWS provider to ensure resources are created in us-east-1.
  route53_health_check_provider_external_id = null

  # The optional AWS profile to be used in the us-east-1 provider block defined
  # in the route53-health-check-alarms module.  This module configures its own
  # AWS provider to ensure resources are created in us-east-1.
  route53_health_check_provider_profile = null

  # The optional role_arn to be used in the us-east-1 provider block defined in
  # the route53-health-check-alarms module.  This module configures its own AWS
  # provider to ensure resources are created in us-east-1.
  route53_health_check_provider_role_arn = null

  # The optional session_name to be used in the us-east-1 provider block defined
  # in the route53-health-check-alarms module.  This module configures its own
  # AWS provider to ensure resources are created in us-east-1.
  route53_health_check_provider_session_name = null

  # The optional path to a credentials file used in the us-east-1 provider block
  # defined in the route53-health-check-alarms module.  This module configures
  # its own AWS provider to ensure resources are created in us-east-1.
  route53_health_check_provider_shared_credentials_file = null

  # A list of ARNs of Secrets Manager secrets that the task should have
  # permissions to read. The IAM role for the task will be granted
  # `secretsmanager:GetSecretValue` for each secret in the list. The ARN can be
  # either the complete ARN, including the randomly generated suffix, or the ARN
  # without the suffix. If the latter, the module will look up the full ARN
  # automatically. This is helpful in cases where you don't yet know the
  # randomly generated suffix because the rest of the ARN is a predictable
  # value.
  secrets_access = []

  # The ports the EC2 instances listen on for requests. A Target Group will be
  # created for each port and any rules specified in var.forward_rules will
  # forward traffic to these Target Groups.
  server_ports = {}

  # When true, precreate the CloudWatch Log Group to use for log aggregation
  # from the EC2 instances. This is useful if you wish to customize the
  # CloudWatch Log Group with various settings such as retention periods and KMS
  # encryption. When false, the CloudWatch agent will automatically create a
  # basic log group to use.
  should_create_cloudwatch_log_group = true

  # If you are using ssh-grunt, this is the name of the IAM group from which
  # users will be allowed to SSH to the instances. To omit this variable, set it
  # to an empty string (do NOT use null, or Terraform will complain).
  ssh_grunt_iam_group = "ssh-grunt-sudo-users"

  # If you are using ssh-grunt, this is the name of the IAM group from which
  # users will be allowed to SSH to the instances with sudo permissions. To omit
  # this variable, set it to an empty string (do NOT use null, or Terraform will
  # complain).
  ssh_grunt_iam_group_sudo = "ssh-grunt-sudo-users"

  # The port at which SSH will be allowed from var.allow_ssh_from_cidr_blocks
  # and var.allow_ssh_security_group_ids
  ssh_port = 22

  # The key for the tag that will be used to associate a unique identifier with
  # this ASG. This identifier will persist between redeploys of the ASG, even
  # though the underlying ASG is being deleted and replaced with a different
  # one.
  tag_asg_id_key = "AsgId"

  # A list of policies to decide how the instances in the auto scale group
  # should be terminated. The allowed values are OldestInstance, NewestInstance,
  # OldestLaunchConfiguration, ClosestToNextInstanceHour, Default.
  termination_policies = []

  # Whether or not ELB or ALB health checks should be enabled. If set to true,
  # the load_balancers or target_groups_arns variable should be set depending on
  # the load balancer type you are using. Useful for testing connectivity before
  # health check endpoints are available.
  use_elb_health_checks = true

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

  # A maximum duration that Terraform should wait for the EC2 Instances to be
  # healthy before timing out.
  wait_for_capacity_timeout = "10m"

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ASG-SERVICE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/asg-service?ref=v0.104.14"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the AMI to run on each instance in the ASG. The AMI needs to have
  # `ec2-baseline` installed, since by default it will run `start_ec2_baseline`
  # on the User Data.
  ami = <string>

  # Properties on the AMI that can be used to lookup a prebuilt AMI for use with
  # the Bastion Host. You can build the AMI using the Packer template
  # bastion-host.json. Only used if var.ami is null. One of var.ami or
  # var.ami_filters is required. Set to null if passing the ami ID directly.
  ami_filters = <object(
    owners = list(string)
    filters = list(object(
      name   = string
      values = list(string)
    ))
  )>

  # The type of instance to run in the ASG (e.g. t3.medium)
  instance_type = <string>

  # The maximum number of EC2 Instances to run in this ASG
  max_size = <number>

  # Wait for this number of EC2 Instances to show up healthy in the load
  # balancer on creation.
  min_elb_capacity = <number>

  # The minimum number of EC2 Instances to run in this ASG
  min_size = <number>

  # The name for the ASG and all other resources created by these templates.
  name = <string>

  # The list of IDs of the subnets in which to deploy ASG. The list must only
  # contain subnets in var.vpc_id.
  subnet_ids = <list(string)>

  # The ID of the VPC in which to deploy the Auto Scaling Group
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of SNS topic ARNs to notify when the health check changes to ALARM,
  # OK, or INSUFFICIENT_DATA state. Note: these SNS topics MUST be in us-east-1!
  # This is because Route 53 only sends CloudWatch metrics to us-east-1, so we
  # must create the alarm in that region, and therefore, can only notify SNS
  # topics in that region.
  alarm_sns_topic_arns_us_east_1 = []

  # The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and
  # disk space usage) should send notifications. Also used for the alarms if the
  # Jenkins backup job fails.
  alarms_sns_topic_arn = []

  # The CIDR blocks from which to allow access to the ports in var.server_ports
  allow_inbound_from_cidr_blocks = []

  # The security group IDs from which to allow access to the ports in
  # var.server_ports
  allow_inbound_from_security_group_ids = []

  # The CIDR blocks from which to allow SSH access
  allow_ssh_from_cidr_blocks = []

  # The security group IDs from which to allow SSH access
  allow_ssh_security_group_ids = []

  # Cloud init scripts to run on the ASG instances during boot. See the part
  # blocks in
  # https://www.terraform.io/docs/providers/template/d/cloudinit_config.html for
  # syntax
  cloud_init_parts = {}

  # The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for
  # encrypting log data.
  cloudwatch_log_group_kms_key_id = null

  # The number of days to retain log events in the log group. Refer to
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days
  # for all the valid values. When null, the log events are retained forever.
  cloudwatch_log_group_retention_in_days = null

  # Tags to apply on the CloudWatch Log Group, encoded as a map where the keys
  # are tag keys and values are tag values.
  cloudwatch_log_group_tags = null

  # Set to true to create a DNS A record in Route 53 for this service.
  create_route53_entry = false

  # A list of custom tags to apply to the EC2 Instances in this ASG. Each item
  # in this list should be a map with the parameters key, value, and
  # propagate_at_launch.
  custom_tags = []

  # The ARN of the Target Group to which to route traffic.
  default_forward_target_group_arns = []

  # The default OS user for the service AMI. For example, for AWS Ubuntu AMIs,
  # the default OS user is 'ubuntu'.
  default_user = "ubuntu"

  # The desired number of EC2 Instances to run in the ASG initially. Note that
  # auto scaling policies may change this value. If you're using auto scaling
  # policies to dynamically resize the cluster, you should actually leave this
  # value as null.
  desired_capacity = null

  # The domain name to register in var.hosted_zone_id (e.g. foo.example.com).
  # Only used if var.create_route53_entry is true.
  domain_name = null

  # Set to true to enable several basic CloudWatch alarms around CPU usage,
  # memory usage, and disk space usage. If set to true, make sure to specify SNS
  # topics to send notifications to using var.alarms_sns_topic_arn.
  enable_cloudwatch_alarms = true

  # Set to true to add AIM permissions to send logs to CloudWatch. This is
  # useful in combination with
  # https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/cloudwatch-log-aggregation-scripts
  # to do log aggregation in CloudWatch.
  enable_cloudwatch_log_aggregation = true

  # Set to true to add IAM permissions to send custom metrics to CloudWatch.
  # This is useful in combination with
  # https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent
  # to get memory and disk metrics in CloudWatch for your Auto Scaling Group
  enable_cloudwatch_metrics = true

  # Enable fail2ban to block brute force log in attempts. Defaults to true
  enable_fail2ban = true

  # Enable ip-lockdown to block access to the instance metadata. Defaults to
  # true
  enable_ip_lockdown = true

  # If set to true, use Route 53 to perform health checks on var.domain_name.
  enable_route53_health_check = false

  # A list of metrics the ASG should enable for monitoring all instances in a
  # group. The allowed values are GroupMinSize, GroupMaxSize,
  # GroupDesiredCapacity, GroupInServiceInstances, GroupPendingInstances,
  # GroupStandbyInstances, GroupTerminatingInstances, GroupTotalInstances.
  enabled_metrics = []

  # Since our IAM users are defined in a separate AWS account, this variable is
  # used to specify the ARN of an IAM role that allows ssh-grunt to retrieve IAM
  # group and public SSH key info from that account.
  external_account_ssh_grunt_role_arn = ""

  # Listener rules for a fixed-response action. See comments below for
  # information about the parameters.
  fixed_response_listener_rules = {}

  # Listener rules for a forward action that distributes requests among one or
  # more target groups. By default, sends traffic to the target groups created
  # for the ports in var.server_ports. See comments below for information about
  # the parameters.
  forward_listener_rules = {}

  # Time, in seconds, after an EC2 Instance comes into service before checking
  # health.
  health_check_grace_period = 300

  # The period, in seconds, over which to measure the CPU utilization percentage
  # for the ASG.
  high_asg_cpu_utilization_period = 60

  # Trigger an alarm if the ASG has an average cluster CPU utilization
  # percentage above this threshold.
  high_asg_cpu_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_asg_cpu_utilization_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the root disk utilization
  # percentage for the ASG.
  high_asg_disk_utilization_period = 60

  # Trigger an alarm if the ASG has an average cluster root disk utilization
  # percentage above this threshold.
  high_asg_disk_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_asg_disk_utilization_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the Memory utilization
  # percentage for the ASG.
  high_asg_memory_utilization_period = 60

  # Trigger an alarm if the ASG has an average cluster Memory utilization
  # percentage above this threshold.
  high_asg_memory_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_asg_memory_utilization_treat_missing_data = "missing"

  # The ID of the Route 53 Hosted Zone in which to create a DNS A record for the
  # Auto Scaling Group. Optional if create_route53_entry = false.
  hosted_zone_id = null

  # An object defining the policy to attach to `iam_role_name` if the IAM role
  # is going to be created. Accepts a map of objects, where the map keys are
  # sids for IAM policy statements, and the object fields are the resources,
  # actions, and the effect ("Allow" or "Deny") of the statement. Ignored if
  # `iam_role_arn` is provided. Leave as null if you do not wish to use IAM role
  # with Service Accounts.
  iam_policy = null

  # The name of a Key Pair that can be used to SSH to the EC2 Instances in the
  # ASG. Set to null if you don't want to enable Key Pair auth.
  key_pair_name = null

  # The ID of the Route 53 Hosted Zone in which to create a DNS A record for the
  # Auto Scaling Group. Optional if create_route53_entry = false.
  lb_hosted_zone_id = null

  # A map of all the listeners on the load balancer. The keys should be the port
  # numbers and the values should be the ARN of the listener for that port.
  listener_arns = {}

  # The ports the ALB listens on for requests
  listener_ports = []

  # A list of Elastic Load Balancer (ELB) names to associate with this ASG. If
  # you're using the Application Load Balancer (ALB), see var.target_group_arns.
  load_balancers = []

  # List of users on the ASG EC2 instances that should be permitted access to
  # the EC2 metadata.
  metadata_users = []

  # The DNS name that was assigned by AWS to the load balancer upon creation
  original_lb_dns_name = null

  # Listener rules for a redirect action. See comments below for information
  # about the parameters.
  redirect_listener_rules = {}

  # The optional external_id to be used in the us-east-1 provider block defined
  # in the route53-health-check-alarms module.  This module configures its own
  # AWS provider to ensure resources are created in us-east-1.
  route53_health_check_provider_external_id = null

  # The optional AWS profile to be used in the us-east-1 provider block defined
  # in the route53-health-check-alarms module.  This module configures its own
  # AWS provider to ensure resources are created in us-east-1.
  route53_health_check_provider_profile = null

  # The optional role_arn to be used in the us-east-1 provider block defined in
  # the route53-health-check-alarms module.  This module configures its own AWS
  # provider to ensure resources are created in us-east-1.
  route53_health_check_provider_role_arn = null

  # The optional session_name to be used in the us-east-1 provider block defined
  # in the route53-health-check-alarms module.  This module configures its own
  # AWS provider to ensure resources are created in us-east-1.
  route53_health_check_provider_session_name = null

  # The optional path to a credentials file used in the us-east-1 provider block
  # defined in the route53-health-check-alarms module.  This module configures
  # its own AWS provider to ensure resources are created in us-east-1.
  route53_health_check_provider_shared_credentials_file = null

  # A list of ARNs of Secrets Manager secrets that the task should have
  # permissions to read. The IAM role for the task will be granted
  # `secretsmanager:GetSecretValue` for each secret in the list. The ARN can be
  # either the complete ARN, including the randomly generated suffix, or the ARN
  # without the suffix. If the latter, the module will look up the full ARN
  # automatically. This is helpful in cases where you don't yet know the
  # randomly generated suffix because the rest of the ARN is a predictable
  # value.
  secrets_access = []

  # The ports the EC2 instances listen on for requests. A Target Group will be
  # created for each port and any rules specified in var.forward_rules will
  # forward traffic to these Target Groups.
  server_ports = {}

  # When true, precreate the CloudWatch Log Group to use for log aggregation
  # from the EC2 instances. This is useful if you wish to customize the
  # CloudWatch Log Group with various settings such as retention periods and KMS
  # encryption. When false, the CloudWatch agent will automatically create a
  # basic log group to use.
  should_create_cloudwatch_log_group = true

  # If you are using ssh-grunt, this is the name of the IAM group from which
  # users will be allowed to SSH to the instances. To omit this variable, set it
  # to an empty string (do NOT use null, or Terraform will complain).
  ssh_grunt_iam_group = "ssh-grunt-sudo-users"

  # If you are using ssh-grunt, this is the name of the IAM group from which
  # users will be allowed to SSH to the instances with sudo permissions. To omit
  # this variable, set it to an empty string (do NOT use null, or Terraform will
  # complain).
  ssh_grunt_iam_group_sudo = "ssh-grunt-sudo-users"

  # The port at which SSH will be allowed from var.allow_ssh_from_cidr_blocks
  # and var.allow_ssh_security_group_ids
  ssh_port = 22

  # The key for the tag that will be used to associate a unique identifier with
  # this ASG. This identifier will persist between redeploys of the ASG, even
  # though the underlying ASG is being deleted and replaced with a different
  # one.
  tag_asg_id_key = "AsgId"

  # A list of policies to decide how the instances in the auto scale group
  # should be terminated. The allowed values are OldestInstance, NewestInstance,
  # OldestLaunchConfiguration, ClosestToNextInstanceHour, Default.
  termination_policies = []

  # Whether or not ELB or ALB health checks should be enabled. If set to true,
  # the load_balancers or target_groups_arns variable should be set depending on
  # the load balancer type you are using. Useful for testing connectivity before
  # health check endpoints are available.
  use_elb_health_checks = true

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

  # A maximum duration that Terraform should wait for the EC2 Instances to be
  # healthy before timing out.
  wait_for_capacity_timeout = "10m"

}


```

</TabItem>
</Tabs>



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
<HclGeneralListItem title="More Details">
<details>


```hcl

     Name/Value pairs to filter the AMI off of. There are several valid keys, for a full reference, check out the
     documentation for describe-images in the AWS CLI reference
     (https://docs.aws.amazon.com/cli/latest/reference/ec2/describe-images.html).

```
</details>

</HclGeneralListItem>
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
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = [
     {
       key = "foo"
       value = "bar"
       propagate_at_launch = true
     },
     {
       key = "baz"
       value = "blah"
       propagate_at_launch = true
     }
   ]

```
</details>

</HclGeneralListItem>
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
<HclGeneralListItem title="More Details">
<details>


```hcl

   Each entry in the map supports the following attributes:
   REQUIRED:
   - arn    [string]: The ARN of the target group.
   OPTIONAL:
   - weight [number]: The weight. The range is 0 to 999. Only applies if len(target_group_arns) > 1.

```
</details>

</HclGeneralListItem>
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
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   enabled_metrics = [
      "GroupDesiredCapacity",
      "GroupInServiceInstances",
      "GroupMaxSize",
      "GroupMinSize",
      "GroupPendingInstances",
      "GroupStandbyInstances",
      "GroupTerminatingInstances",
      "GroupTotalInstances"
    ]

```
</details>

</HclGeneralListItem>
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
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
    {
      "health-path" = {
        priority     = 130
  
        content_type = "text/plain"
        message_body = "HEALTHY"
        status_code  = "200"
  
      Conditions:
      You need to provide *at least ONE* per set of rules. It should contain one of the following:
        host_headers         = ["foo.com", "www.foo.com"]
        path_patterns        = ["/health"]
        source_ips           = ["127.0.0.1"]
        http_request_methods = ["GET"]
        query_strings = [
          {
            key   = "foo"   Key is optional, this can be ommited.
            value = "bar"
          }, {
            value = "hello"
          }
        ]
      }
    }

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Each entry in the map supports the following attributes:
  
   REQUIRED
   - content_type [string]: The content type. Valid values are `text/plain`, `text/css`, `text/html`, `application/javascript`
                            and `application/json`.
  
   OPTIONAL (defaults to value of corresponding module input):
   - priority      [number]       : A value between 1 and 50000. Leaving it unset will automatically set the rule with the next
                                   available priority after currently existing highest rule. This value must be unique for each
                                   listener.
   - listener_arns [list(string)]: A list of listener ARNs to override `var.listener_arns`
   - message_body  [string]      : The message body.
   - status_code   [string]      : The HTTP response code. Valid values are `2XX`, `4XX`, or `5XX`.
  
   Wildcard characters:
   * - matches 0 or more characters
   ? - matches exactly 1 character
   To search for a literal '*' or '?' character in a query string, escape the character with a backslash (\).
  
   Conditions (need to specify at least one):
   - path_patterns        [list(string)]     : A list of paths to match (note that "/foo" is different than "/foo/").
                                              Comparison is case sensitive. Wildcard characters supported: * and ?.
                                              It is compared to the path of the URL, not it's query string. To compare
                                              against query string, use the `query_strings` condition.
   - host_headers         [list(string)]     : A list of host header patterns to match. Comparison is case insensitive.
                                              Wildcard characters supported: * and ?.
   - source_ips           [list(string)]     : A list of IP CIDR notations to match. You can use both IPv4 and IPv6
                                              addresses. Wildcards are not supported. Condition is not satisfied by the
                                              addresses in the `X-Forwarded-For` header, use `http_headers` condition instead.
   - query_strings        [list(map(string))]: Query string pairs or values to match. Comparison is case insensitive.
                                              Wildcard characters supported: * and ?. Only one pair needs to match for
                                              the condition to be satisfied.
   - http_request_methods [list(string)]     : A list of HTTP request methods or verbs to match. Only allowed characters are
                                              A-Z, hyphen (-) and underscore (_). Comparison is case sensitive. Wildcards
                                              are not supported. AWS recommends that GET and HEAD requests are routed in the
                                              same way because the response to a HEAD request may be cached.

```
</details>

</HclGeneralListItem>
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
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
    {
      "foo" = {
        priority = 120
  
        host_headers         = ["www.foo.com", "*.foo.com"]
        path_patterns        = ["/foo/*"]
        source_ips           = ["127.0.0.1/32"]
        http_request_methods = ["GET"]
        query_strings = [
          {
             key   = "foo"   Key is optional, this can be ommited.
            value = "bar"
          }, {
            value = "hello"
          }
       ]
     }
   }

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Each entry in the map supports the following attributes:
  
   OPTIONAL (defaults to value of corresponding module input):
   - priority          [number]                    : A value between 1 and 50000. Leaving it unset will automatically set
                                                    the rule with the next available priority after currently existing highest
                                                     rule. This value must be unique for each listener.
   - listener_arns     [list(string)]              : A list of listener ARNs to override `var.listener_arns`
   - stickiness        [map(object[Stickiness])]   : Target group stickiness for the rule. Only applies if more than one
                                                    target_group_arn is defined.

```
</details>

<details>


```hcl

   Wildcard characters:
   * - matches 0 or more characters
   ? - matches exactly 1 character
   To search for a literal '*' or '?' character in a query string, escape the character with a backslash (\).

```
</details>

<details>


```hcl

   Conditions (need to specify at least one):
   - path_patterns        [list(string)]     : A list of paths to match (note that "/foo" is different than "/foo/").
                                              Comparison is case sensitive. Wildcard characters supported: * and ?.
                                              It is compared to the path of the URL, not it's query string. To compare
                                              against query string, use the `query_strings` condition.
   - host_headers         [list(string)]     : A list of host header patterns to match. Comparison is case insensitive.
                                              Wildcard characters supported: * and ?.
   - source_ips           [list(string)]     : A list of IP CIDR notations to match. You can use both IPv4 and IPv6
                                              addresses. Wildcards are not supported. Condition is not satisfied by the
                                              addresses in the `X-Forwarded-For` header, use `http_headers` condition instead.
   - query_strings        [list(map(string))]: Query string pairs or values to match. Comparison is case insensitive.
                                              Wildcard characters supported: * and ?. Only one pair needs to match for
                                              the condition to be satisfied.
   - http_request_methods [list(string)]     : A list of HTTP request methods or verbs to match. Only allowed characters are
                                              A-Z, hyphen (-) and underscore (_). Comparison is case sensitive. Wildcards
                                              are not supported. AWS recommends that GET and HEAD requests are routed in the
                                              same way because the response to a HEAD request may be cached.

```
</details>

</HclGeneralListItem>
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
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   iam_policy = {
     S3Access = {
       actions = ["s3:*"]
       resources = ["arn:aws:s3:::mybucket"]
       effect = "Allow"
     },
     SecretsManagerAccess = {
       actions = ["secretsmanager:GetSecretValue"],
       resources = ["arn:aws:secretsmanager:us-east-1:0123456789012:secret:mysecert"]
       effect = "Allow"
     }
   }

```
</details>

</HclGeneralListItem>
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
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
    {
      "old-website" = {
        priority = 120
        port     = 443
        protocol = "HTTPS"
  
        status_code = "HTTP_301"
        host  = "gruntwork.in"
        path  = "/signup"
        query = "foo"
  
      Conditions:
        host_headers         = ["foo.com", "www.foo.com"]
        path_patterns        = ["/health"]
        source_ips           = ["127.0.0.1"]
        http_request_methods = ["GET"]
        query_strings = [
          {
            key   = "foo"   Key is optional, this can be ommited.
            value = "bar"
          }, {
            value = "hello"
          }
        ]
      }
    }

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Each entry in the map supports the following attributes:
  
   OPTIONAL (defaults to value of corresponding module input):
   - priority       [number]: A value between 1 and 50000. Leaving it unset will automatically set the rule with the next
                           available priority after currently existing highest rule. This value must be unique for each
                           listener.
   - listener_arns [list(string)]: A list of listener ARNs to override `var.listener_arns`
   - status_code   [string]: The HTTP redirect code. The redirect is either permanent `HTTP_301` or temporary `HTTP_302`.
  
   The URI consists of the following components: `protocol://hostname:port/path?query`. You must modify at least one of
   the following components to avoid a redirect loop: protocol, hostname, port, or path. Any components that you do not
   modify retain their original values.
   - host        [string]: The hostname. The hostname can contain {host}.
   - path        [string]: The absolute path, starting with the leading "/". The path can contain `host`, `path`, and `port`.
   - port        [string]: The port. Specify a value from 1 to 65525.
   - protocol    [string]: The protocol. Valid values are `HTTP` and `HTTPS`. You cannot redirect HTTPS to HTTP.
   - query       [string]: The query params. Do not include the leading "?".
  
   Wildcard characters:
   * - matches 0 or more characters
   ? - matches exactly 1 character
   To search for a literal '*' or '?' character in a query string, escape the character with a backslash (\).
  
   Conditions (need to specify at least one):
   - path_patterns        [list(string)]     : A list of paths to match (note that "/foo" is different than "/foo/").
                                              Comparison is case sensitive. Wildcard characters supported: * and ?.
                                              It is compared to the path of the URL, not it's query string. To compare
                                              against query string, use the `query_strings` condition.
   - host_headers         [list(string)]     : A list of host header patterns to match. Comparison is case insensitive.
                                              Wildcard characters supported: * and ?.
   - source_ips           [list(string)]     : A list of IP CIDR notations to match. You can use both IPv4 and IPv6
                                              addresses. Wildcards are not supported. Condition is not satisfied by the
                                              addresses in the `X-Forwarded-For` header, use `http_headers` condition instead.
   - query_strings        [list(map(string))]: Query string pairs or values to match. Comparison is case insensitive.
                                              Wildcard characters supported: * and ?. Only one pair needs to match for
                                              the condition to be satisfied.
   - http_request_methods [list(string)]     : A list of HTTP request methods or verbs to match. Only allowed characters are
                                              A-Z, hyphen (-) and underscore (_). Comparison is case sensitive. Wildcards
                                              are not supported. AWS recommends that GET and HEAD requests are routed in the
                                              same way because the response to a HEAD request may be cached.

```
</details>

</HclGeneralListItem>
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
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   server_ports = {
     "default-http" = {
       server_port            = "8080"
       protocol               = "HTTP"
       health_check_path      = "/health"
       r53_health_check_path  = "/health"
       enable_lb_health_check = false
     }
   }

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Each entry in the map supports the following attributes:
  
   REQUIRED:
   - server_port        number      : The port of the endpoint to be checked (e.g. 80).
  
   OPTIONAL (defaults to value of corresponding module input):
   - target_group_name                   string      : A unique name to use for the corresponding target group. If
                                                       omitted, defaults to "SERVICE_NAME-ENTRY_KEY" where SERVICE_NAME
                                                       corresponds to var.name and ENTRY_KEY corresponds to the map key
                                                       for this server port entry.
   - tags                                map(string) : A map of tags to apply to the metric alarm. The key is the tag
                                                       name and the value is the tag value.
   - protocol                            string      : The protocol to use for health checks. See:
                                                       https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_groupprotocol
   - health_check_path                   string      : The path that the health check should use for requests (e.g. /health or /status).
   - r53_health_check_path               string      : The path that you want Amazon Route 53 to request when
                                                         performing health checks (e.g. /status). Defaults to "/".
   - r53_health_check_type               string      : The protocol to use when performing health checks. Valid
                                                       values are HTTP, HTTPS, HTTP_STR_MATCH, HTTPS_STR_MATCH,
                                                       TCP, CALCULATED and CLOUDWATCH_METRIC. Defaults to HTTP.
   - r53_health_check_failure_threshold  number      : The number of consecutive health checks that must pass
                                                       or fail for the health check to declare your site up or
                                                       down. Defaults to 2.
   - r53_health_check_request_interval   number      : The number of seconds between health checks. Defaults to 30.
  
   - enable_lb_health_check  bool   : Set to false if you want to disable Target Group health's check.
                                      Defaults to true.
   - lb_healthy_threshold    number : The number of consecutive health checks *successes* required before
                                      considering an unhealthy target healthy. Defaults to 3.
   - lb_unhealthy_threshold  number : The number of consecutive health check *failures* required before
                                      considering the target unhealthy. Defaults to 3.
   - lb_request_interval     number : The approximate amount of time, in seconds, between health checks
                                      of an individual target. Defaults to 30.
   - lb_timeout              number : The amount of time, in seconds, during which no response means a
                                      failed health check. Defaults to 10.

```
</details>

</HclGeneralListItem>
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

<HclListItem name="launch_template_id">
<HclListItemDescription>

The ID of the launch template used for the ASG.

</HclListItemDescription>
</HclListItem>

<HclListItem name="launch_template_name">
<HclListItemDescription>

The name of the launch template used for the ASG.

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
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/asg-service/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/asg-service/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/asg-service/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "0fbd99dafde7f297fc60c226d6b10654"
}
##DOCS-SOURCER-END -->
