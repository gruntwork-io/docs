---
type: "service"
name: "Amazon ECS Cluster"
description: "Deploy an Amazon ECS Cluster."
category: "docker-orchestration"
cloud: "aws"
tags: ["docker","orchestration","ecs","containers"]
license: "gruntwork"
built-with: "terraform, bash, python, go"
title: "Amazon ECS Cluster"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.104.14" lastModifiedVersion="0.95.1"/>

# Amazon ECS Cluster

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/ecs-cluster" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=services%2Fecs-cluster" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>

## Overview

This service contains [Terraform](https://www.terraform.io) code to deploy a production-grade ECS cluster on
[AWS](https://aws.amazon.com) using [Elastic Container Service (ECS)](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html).

This service launches an ECS cluster on top of an Auto Scaling Group that you manage. If you wish to launch an ECS
cluster on top of Fargate that is completely managed by AWS, refer to the
[ecs-fargate-cluster module](/reference/services/app-orchestration/amazon-ecs-fargate-cluster). Refer to the section
[EC2 vs Fargate Launch Types](https://github.com/gruntwork-io/terraform-aws-ecs/blob/master/core-concepts.md#ec2-vs-fargate-launch-types)
for more information on the differences between the two flavors.

![ECS architecture](/img/reference/services/app-orchestration/ecs-architecture.png)

## Features

This Terraform Module launches an [EC2 Container Service Cluster](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_clusters.html) that you can use to run Docker containers. The cluster consists of a configurable number of instances in an Auto Scaling
Group (ASG). Each instance:

*   Runs the [ECS Container Agent](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_agent.html) so it can communicate with the ECS scheduler.

*   Authenticates with a Docker repo so it can download private images. The Docker repo auth details should be encrypted
    using [Amazon Key Management Service (KMS)](https://aws.amazon.com/kms/) and passed in as input variables. The
    instances, when booting up, will use [gruntkms](https://github.com/gruntwork-io/gruntkms) to decrypt the data
    in-memory. Note that the IAM role for these instances, which uses `var.cluster_name` as its name, must be granted
    access to the
    [Customer Master Key (CMK)](http://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#master_keys)
    used to encrypt the data.

*   Runs the
    [CloudWatch Logs Agent](http://docs.aws.amazon.com/AmazonCloudWatch/latest/DeveloperGuide/QuickStartEC2Instance.html)
    to send all logs in syslog to
    [CloudWatch Logs](http://docs.aws.amazon.com/AmazonCloudWatch/latest/DeveloperGuide/WhatIsCloudWatchLogs.html). This
    is configured using the
    [cloudwatch-agent](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent).

*   Emits custom metrics that are not available by default in CloudWatch, including memory and disk usage. This is
    configured using the [cloudwatch-agent
    module](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent).

*   Runs the [syslog module](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/syslog)
    to automatically rotate and rate limit syslog so that your instances don’t run out of disk space from large volumes.

*   Runs the [ssh-grunt module](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ssh-grunt) so
    that developers can upload their public SSH keys to IAM and use those SSH keys, along with their IAM user names, to
    SSH to the ECS Nodes.

*   Runs the [auto-update module](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/auto-update)
    so that the ECS nodes install security updates automatically.

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

Under the hood, this is all implemented using Terraform modules from the Gruntwork
[terraform-aws-ecs](https://github.com/gruntwork-io/terraform-aws-ecs) repo. If you are a subscriber and don’t have
access to this repo, email <support@gruntwork.io>.

### Core concepts

To understand core concepts like what is ECS, and the different cluster types, see the documentation in the
[terraform-aws-ecs](https://github.com/gruntwork-io/terraform-aws-ecs) repo.

To use ECS, you first deploy one or more EC2 Instances into a "cluster". The ECS scheduler can then deploy Docker
containers across any of the instances in this cluster. Each instance needs to have the
[Amazon ECS Agent](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_agent.html) installed so it can
communicate with ECS and register itself as part of the right cluster.

For more info on ECS clusters, including how to run Docker containers in a cluster, how to add additional security
group rules, how to handle IAM policies, and more, check out the
[ecs-cluster documentation](https://github.com/gruntwork-io/terraform-aws-ecs/tree/master/modules/ecs-cluster) in the
[terraform-aws-ecs repo](https://github.com/gruntwork-io/terraform-aws-ecs).

For info on finding your Docker container logs and custom metrics in CloudWatch, check out the
[cloudwatch-agent documentation](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent).

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.
*   [examples](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples): This folder contains working examples of how to use the submodules.
*   [test](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/test): Automated tests for the modules and examples.

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
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

## Manage

For information on how to configure cluster autoscaling, see
[How do you configure cluster autoscaling?](https://github.com/gruntwork-io/terraform-aws-ecs/tree/master/modules/ecs-cluster#how-do-you-configure-cluster-autoscaling)

For information on how to manage your ECS cluster, see the documentation in the
[terraform-aws-ecs](https://github.com/gruntwork-io/terraform-aws-ecs) repo.


## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ECS-CLUSTER MODULE
# ------------------------------------------------------------------------------------------------------

module "ecs_cluster" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/ecs-cluster?ref=v0.104.14"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AMI to run on each instance in the ECS cluster. You can build the AMI
  # using the Packer template ecs-node-al2.json. One of var.cluster_instance_ami
  # or var.cluster_instance_ami_filters is required.
  cluster_instance_ami = <string>

  # Properties on the AMI that can be used to lookup a prebuilt AMI for use with
  # ECS workers. You can build the AMI using the Packer template
  # ecs-node-al2.json. Only used if var.cluster_instance_ami is null. One of
  # var.cluster_instance_ami or var.cluster_instance_ami_filters is required.
  # Set to null if cluster_instance_ami is set.
  cluster_instance_ami_filters = <object(
    owners = list(string)
    filters = list(object(
      name   = string
      values = list(string)
    ))
  )>

  # The type of instances to run in the ECS cluster (e.g. t2.medium)
  cluster_instance_type = <string>

  # The maxiumum number of instances to run in the ECS cluster
  cluster_max_size = <number>

  # The minimum number of instances to run in the ECS cluster
  cluster_min_size = <number>

  # The name of the ECS cluster
  cluster_name = <string>

  # The ID of the VPC in which the ECS cluster should be launched
  vpc_id = <string>

  # The IDs of the subnets in which to deploy the ECS cluster instances
  vpc_subnet_ids = <list(string)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and
  # disk space usage) should send notifications
  alarms_sns_topic_arn = []

  # The IP address ranges in CIDR format from which to allow incoming SSH
  # requests to the ECS instances.
  allow_ssh_from_cidr_blocks = []

  # The IDs of security groups from which to allow incoming SSH requests to the
  # ECS instances.
  allow_ssh_from_security_group_ids = []

  # Protect EC2 instances running ECS tasks from being terminated due to scale
  # in (spot instances do not support lifecycle modifications). Note that the
  # behavior of termination protection differs between clusters with capacity
  # providers and clusters without. When capacity providers is turned on and
  # this flag is true, only instances that have 0 ECS tasks running will be
  # scaled in, regardless of capacity_provider_target. If capacity providers is
  # turned off and this flag is true, this will prevent ANY instances from being
  # scaled in.
  autoscaling_termination_protection = false

  # Enable a capacity provider to autoscale the EC2 ASG created for this ECS
  # cluster.
  capacity_provider_enabled = false

  # Maximum step adjustment size to the ASG's desired instance count. A number
  # between 1 and 10000.
  capacity_provider_max_scale_step = null

  # Minimum step adjustment size to the ASG's desired instance count. A number
  # between 1 and 10000.
  capacity_provider_min_scale_step = null

  # Target cluster utilization for the ASG capacity provider; a number from 1 to
  # 100. This number influences when scale out happens, and when instances
  # should be scaled in. For example, a setting of 90 means that new instances
  # will be provisioned when all instances are at 90% utilization, while
  # instances that are only 10% utilized (CPU and Memory usage from tasks = 10%)
  # will be scaled in.
  capacity_provider_target = null

  # Cloud init scripts to run on the ECS cluster instances during boot. See the
  # part blocks in
  # https://www.terraform.io/docs/providers/template/d/cloudinit_config.html for
  # syntax
  cloud_init_parts = {}

  # The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for
  # encrypting log data.
  cloudwatch_log_group_kms_key_id = null

  # The name of the log group to create in CloudWatch. Defaults to
  # `var.cluster_name-logs`.
  cloudwatch_log_group_name = ""

  # The number of days to retain log events in the log group. Refer to
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days
  # for all the valid values. When null, the log events are retained forever.
  cloudwatch_log_group_retention_in_days = null

  # Tags to apply on the CloudWatch Log Group, encoded as a map where the keys
  # are tag keys and values are tag values.
  cloudwatch_log_group_tags = null

  # Specify a list of Security Groups that will have access to the ECS cluster.
  # Only used if var.enable_cluster_access_ports is set to true
  cluster_access_from_sgs = []

  # Whether to associate a public IP address with an instance in a VPC
  cluster_instance_associate_public_ip_address = false

  # The name of the Key Pair that can be used to SSH to each instance in the ECS
  # cluster
  cluster_instance_keypair_name = null

  # A list of custom tags to apply to the EC2 Instances in this ASG. Each item
  # in this list should be a map with the parameters key, value, and
  # propagate_at_launch.
  custom_tags_ec2_instances = []

  # Custom tags to apply to the ECS cluster
  custom_tags_ecs_cluster = {}

  # A map of custom tags to apply to the Security Group for this ECS Cluster.
  # The key is the tag name and the value is the tag value.
  custom_tags_security_group = {}

  # The default OS user for the ECS worker AMI. For AWS Amazon Linux AMIs, which
  # is what the Packer template in ecs-node-al2.json uses, the default OS user
  # is 'ec2-user'.
  default_user = "ec2-user"

  # A list of availability zones in the region that should be skipped when
  # deploying ECS. You can use this to avoid availability zones that may not be
  # able to provision the resources (e.g instance type does not exist). If
  # empty, allows all availability zones.
  disallowed_availability_zones = []

  # Set to true to enable Cloudwatch log aggregation for the ECS cluster
  enable_cloudwatch_log_aggregation = true

  # Set to true to enable Cloudwatch metrics collection for the ECS cluster
  enable_cloudwatch_metrics = true

  # Specify a list of ECS Cluster ports which should be accessible from the
  # security groups given in cluster_access_from_sgs
  enable_cluster_access_ports = []

  # Set to true to enable several basic Cloudwatch alarms around CPU usage,
  # memory usage, and disk space usage. If set to true, make sure to specify SNS
  # topics to send notifications to using var.alarms_sns_topic_arn
  enable_ecs_cloudwatch_alarms = true

  # Enable fail2ban to block brute force log in attempts. Defaults to true
  enable_fail2ban = true

  # Set this variable to true to enable the Instance Metadata Service (IMDS)
  # endpoint, which is used to fetch information such as user-data scripts,
  # instance IP address and region, etc. Set this variable to false if you do
  # not want the IMDS endpoint enabled for instances launched into the Auto
  # Scaling Group for the workers.
  enable_imds = true

  # Enable ip-lockdown to block access to the instance metadata. Defaults to
  # true
  enable_ip_lockdown = true

  # Set to true to add IAM permissions for ssh-grunt
  # (https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ssh-grunt),
  # which will allow you to manage SSH access via IAM groups.
  enable_ssh_grunt = true

  # Since our IAM users are defined in a separate AWS account, this variable is
  # used to specify the ARN of an IAM role that allows ssh-grunt to retrieve IAM
  # group and public SSH key info from that account.
  external_account_ssh_grunt_role_arn = ""

  # The number of periods over which data is compared to the specified threshold
  high_cpu_utilization_evaluation_periods = 2

  # The period, in seconds, over which to measure the CPU utilization
  # percentage. Only used if var.enable_ecs_cloudwatch_alarms is set to true
  high_cpu_utilization_period = 300

  # The statistic to apply to the alarm's high CPU metric. Either of the
  # following is supported: SampleCount, Average, Sum, Minimum, Maximum
  high_cpu_utilization_statistic = "Average"

  # Trigger an alarm if the ECS Cluster has a CPU utilization percentage above
  # this threshold. Only used if var.enable_ecs_cloudwatch_alarms is set to true
  high_cpu_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Must
  # be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_cpu_utilization_treat_missing_data = "missing"

  # The number of periods over which data is compared to the specified threshold
  high_memory_utilization_evaluation_periods = 2

  # The period, in seconds, over which to measure the memory utilization
  # percentage. Only used if var.enable_ecs_cloudwatch_alarms is set to true
  high_memory_utilization_period = 300

  # The statistic to apply to the alarm's high CPU metric. Either of the
  # following is supported: SampleCount, Average, Sum, Minimum, Maximum
  high_memory_utilization_statistic = "Average"

  # Trigger an alarm if the ECS Cluster has a memory utilization percentage
  # above this threshold. Only used if var.enable_ecs_cloudwatch_alarms is set
  # to true
  high_memory_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Must
  # be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_memory_utilization_treat_missing_data = "missing"

  # The desired HTTP PUT response hop limit for instance metadata requests for
  # the workers.
  http_put_response_hop_limit = null

  # The Security Group ID for the internal ALB
  internal_alb_sg_ids = []

  # Enable a multi-az capacity provider to autoscale the EC2 ASGs created for
  # this ECS cluster, only if capacity_provider_enabled = true
  multi_az_capacity_provider = false

  # The Security Group ID for the public ALB
  public_alb_sg_ids = []

  # When true, precreate the CloudWatch Log Group to use for log aggregation
  # from the EC2 instances. This is useful if you wish to customize the
  # CloudWatch Log Group with various settings such as retention periods and KMS
  # encryption. When false, the CloudWatch agent will automatically create a
  # basic log group to use.
  should_create_cloudwatch_log_group = true

  # If you are using ssh-grunt, this is the name of the IAM group from which
  # users will be allowed to SSH to the nodes in this ECS cluster. This value is
  # only used if enable_ssh_grunt=true.
  ssh_grunt_iam_group = "ssh-grunt-users"

  # If you are using ssh-grunt, this is the name of the IAM group from which
  # users will be allowed to SSH to the nodes in this ECS cluster with sudo
  # permissions. This value is only used if enable_ssh_grunt=true.
  ssh_grunt_iam_group_sudo = "ssh-grunt-sudo-users"

  # The tenancy of this server. Must be one of: default, dedicated, or host.
  tenancy = "default"

  # Set this variable to true to enable the use of Instance Metadata Service
  # Version 1 in this module's aws_launch_template. Note that while IMDsv2 is
  # preferred due to its special security hardening, we allow this in order to
  # support the use case of AMIs built outside of these modules that depend on
  # IMDSv1.
  use_imdsv1 = true

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ECS-CLUSTER MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/ecs-cluster?ref=v0.104.14"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AMI to run on each instance in the ECS cluster. You can build the AMI
  # using the Packer template ecs-node-al2.json. One of var.cluster_instance_ami
  # or var.cluster_instance_ami_filters is required.
  cluster_instance_ami = <string>

  # Properties on the AMI that can be used to lookup a prebuilt AMI for use with
  # ECS workers. You can build the AMI using the Packer template
  # ecs-node-al2.json. Only used if var.cluster_instance_ami is null. One of
  # var.cluster_instance_ami or var.cluster_instance_ami_filters is required.
  # Set to null if cluster_instance_ami is set.
  cluster_instance_ami_filters = <object(
    owners = list(string)
    filters = list(object(
      name   = string
      values = list(string)
    ))
  )>

  # The type of instances to run in the ECS cluster (e.g. t2.medium)
  cluster_instance_type = <string>

  # The maxiumum number of instances to run in the ECS cluster
  cluster_max_size = <number>

  # The minimum number of instances to run in the ECS cluster
  cluster_min_size = <number>

  # The name of the ECS cluster
  cluster_name = <string>

  # The ID of the VPC in which the ECS cluster should be launched
  vpc_id = <string>

  # The IDs of the subnets in which to deploy the ECS cluster instances
  vpc_subnet_ids = <list(string)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and
  # disk space usage) should send notifications
  alarms_sns_topic_arn = []

  # The IP address ranges in CIDR format from which to allow incoming SSH
  # requests to the ECS instances.
  allow_ssh_from_cidr_blocks = []

  # The IDs of security groups from which to allow incoming SSH requests to the
  # ECS instances.
  allow_ssh_from_security_group_ids = []

  # Protect EC2 instances running ECS tasks from being terminated due to scale
  # in (spot instances do not support lifecycle modifications). Note that the
  # behavior of termination protection differs between clusters with capacity
  # providers and clusters without. When capacity providers is turned on and
  # this flag is true, only instances that have 0 ECS tasks running will be
  # scaled in, regardless of capacity_provider_target. If capacity providers is
  # turned off and this flag is true, this will prevent ANY instances from being
  # scaled in.
  autoscaling_termination_protection = false

  # Enable a capacity provider to autoscale the EC2 ASG created for this ECS
  # cluster.
  capacity_provider_enabled = false

  # Maximum step adjustment size to the ASG's desired instance count. A number
  # between 1 and 10000.
  capacity_provider_max_scale_step = null

  # Minimum step adjustment size to the ASG's desired instance count. A number
  # between 1 and 10000.
  capacity_provider_min_scale_step = null

  # Target cluster utilization for the ASG capacity provider; a number from 1 to
  # 100. This number influences when scale out happens, and when instances
  # should be scaled in. For example, a setting of 90 means that new instances
  # will be provisioned when all instances are at 90% utilization, while
  # instances that are only 10% utilized (CPU and Memory usage from tasks = 10%)
  # will be scaled in.
  capacity_provider_target = null

  # Cloud init scripts to run on the ECS cluster instances during boot. See the
  # part blocks in
  # https://www.terraform.io/docs/providers/template/d/cloudinit_config.html for
  # syntax
  cloud_init_parts = {}

  # The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for
  # encrypting log data.
  cloudwatch_log_group_kms_key_id = null

  # The name of the log group to create in CloudWatch. Defaults to
  # `var.cluster_name-logs`.
  cloudwatch_log_group_name = ""

  # The number of days to retain log events in the log group. Refer to
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days
  # for all the valid values. When null, the log events are retained forever.
  cloudwatch_log_group_retention_in_days = null

  # Tags to apply on the CloudWatch Log Group, encoded as a map where the keys
  # are tag keys and values are tag values.
  cloudwatch_log_group_tags = null

  # Specify a list of Security Groups that will have access to the ECS cluster.
  # Only used if var.enable_cluster_access_ports is set to true
  cluster_access_from_sgs = []

  # Whether to associate a public IP address with an instance in a VPC
  cluster_instance_associate_public_ip_address = false

  # The name of the Key Pair that can be used to SSH to each instance in the ECS
  # cluster
  cluster_instance_keypair_name = null

  # A list of custom tags to apply to the EC2 Instances in this ASG. Each item
  # in this list should be a map with the parameters key, value, and
  # propagate_at_launch.
  custom_tags_ec2_instances = []

  # Custom tags to apply to the ECS cluster
  custom_tags_ecs_cluster = {}

  # A map of custom tags to apply to the Security Group for this ECS Cluster.
  # The key is the tag name and the value is the tag value.
  custom_tags_security_group = {}

  # The default OS user for the ECS worker AMI. For AWS Amazon Linux AMIs, which
  # is what the Packer template in ecs-node-al2.json uses, the default OS user
  # is 'ec2-user'.
  default_user = "ec2-user"

  # A list of availability zones in the region that should be skipped when
  # deploying ECS. You can use this to avoid availability zones that may not be
  # able to provision the resources (e.g instance type does not exist). If
  # empty, allows all availability zones.
  disallowed_availability_zones = []

  # Set to true to enable Cloudwatch log aggregation for the ECS cluster
  enable_cloudwatch_log_aggregation = true

  # Set to true to enable Cloudwatch metrics collection for the ECS cluster
  enable_cloudwatch_metrics = true

  # Specify a list of ECS Cluster ports which should be accessible from the
  # security groups given in cluster_access_from_sgs
  enable_cluster_access_ports = []

  # Set to true to enable several basic Cloudwatch alarms around CPU usage,
  # memory usage, and disk space usage. If set to true, make sure to specify SNS
  # topics to send notifications to using var.alarms_sns_topic_arn
  enable_ecs_cloudwatch_alarms = true

  # Enable fail2ban to block brute force log in attempts. Defaults to true
  enable_fail2ban = true

  # Set this variable to true to enable the Instance Metadata Service (IMDS)
  # endpoint, which is used to fetch information such as user-data scripts,
  # instance IP address and region, etc. Set this variable to false if you do
  # not want the IMDS endpoint enabled for instances launched into the Auto
  # Scaling Group for the workers.
  enable_imds = true

  # Enable ip-lockdown to block access to the instance metadata. Defaults to
  # true
  enable_ip_lockdown = true

  # Set to true to add IAM permissions for ssh-grunt
  # (https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ssh-grunt),
  # which will allow you to manage SSH access via IAM groups.
  enable_ssh_grunt = true

  # Since our IAM users are defined in a separate AWS account, this variable is
  # used to specify the ARN of an IAM role that allows ssh-grunt to retrieve IAM
  # group and public SSH key info from that account.
  external_account_ssh_grunt_role_arn = ""

  # The number of periods over which data is compared to the specified threshold
  high_cpu_utilization_evaluation_periods = 2

  # The period, in seconds, over which to measure the CPU utilization
  # percentage. Only used if var.enable_ecs_cloudwatch_alarms is set to true
  high_cpu_utilization_period = 300

  # The statistic to apply to the alarm's high CPU metric. Either of the
  # following is supported: SampleCount, Average, Sum, Minimum, Maximum
  high_cpu_utilization_statistic = "Average"

  # Trigger an alarm if the ECS Cluster has a CPU utilization percentage above
  # this threshold. Only used if var.enable_ecs_cloudwatch_alarms is set to true
  high_cpu_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Must
  # be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_cpu_utilization_treat_missing_data = "missing"

  # The number of periods over which data is compared to the specified threshold
  high_memory_utilization_evaluation_periods = 2

  # The period, in seconds, over which to measure the memory utilization
  # percentage. Only used if var.enable_ecs_cloudwatch_alarms is set to true
  high_memory_utilization_period = 300

  # The statistic to apply to the alarm's high CPU metric. Either of the
  # following is supported: SampleCount, Average, Sum, Minimum, Maximum
  high_memory_utilization_statistic = "Average"

  # Trigger an alarm if the ECS Cluster has a memory utilization percentage
  # above this threshold. Only used if var.enable_ecs_cloudwatch_alarms is set
  # to true
  high_memory_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Must
  # be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_memory_utilization_treat_missing_data = "missing"

  # The desired HTTP PUT response hop limit for instance metadata requests for
  # the workers.
  http_put_response_hop_limit = null

  # The Security Group ID for the internal ALB
  internal_alb_sg_ids = []

  # Enable a multi-az capacity provider to autoscale the EC2 ASGs created for
  # this ECS cluster, only if capacity_provider_enabled = true
  multi_az_capacity_provider = false

  # The Security Group ID for the public ALB
  public_alb_sg_ids = []

  # When true, precreate the CloudWatch Log Group to use for log aggregation
  # from the EC2 instances. This is useful if you wish to customize the
  # CloudWatch Log Group with various settings such as retention periods and KMS
  # encryption. When false, the CloudWatch agent will automatically create a
  # basic log group to use.
  should_create_cloudwatch_log_group = true

  # If you are using ssh-grunt, this is the name of the IAM group from which
  # users will be allowed to SSH to the nodes in this ECS cluster. This value is
  # only used if enable_ssh_grunt=true.
  ssh_grunt_iam_group = "ssh-grunt-users"

  # If you are using ssh-grunt, this is the name of the IAM group from which
  # users will be allowed to SSH to the nodes in this ECS cluster with sudo
  # permissions. This value is only used if enable_ssh_grunt=true.
  ssh_grunt_iam_group_sudo = "ssh-grunt-sudo-users"

  # The tenancy of this server. Must be one of: default, dedicated, or host.
  tenancy = "default"

  # Set this variable to true to enable the use of Instance Metadata Service
  # Version 1 in this module's aws_launch_template. Note that while IMDsv2 is
  # preferred due to its special security hardening, we allow this in order to
  # support the use case of AMIs built outside of these modules that depend on
  # IMDSv1.
  use_imdsv1 = true

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

}


```

</TabItem>
</Tabs>



## Reference


<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="cluster_instance_ami" requirement="required" type="string">
<HclListItemDescription>

The AMI to run on each instance in the ECS cluster. You can build the AMI using the Packer template ecs-node-al2.json. One of <a href="#cluster_instance_ami"><code>cluster_instance_ami</code></a> or <a href="#cluster_instance_ami_filters"><code>cluster_instance_ami_filters</code></a> is required.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_instance_ami_filters" requirement="required" type="object(…)">
<HclListItemDescription>

Properties on the AMI that can be used to lookup a prebuilt AMI for use with ECS workers. You can build the AMI using the Packer template ecs-node-al2.json. Only used if <a href="#cluster_instance_ami"><code>cluster_instance_ami</code></a> is null. One of <a href="#cluster_instance_ami"><code>cluster_instance_ami</code></a> or <a href="#cluster_instance_ami_filters"><code>cluster_instance_ami_filters</code></a> is required. Set to null if cluster_instance_ami is set.

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

<HclListItem name="cluster_instance_type" requirement="required" type="string">
<HclListItemDescription>

The type of instances to run in the ECS cluster (e.g. t2.medium)

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_max_size" requirement="required" type="number">
<HclListItemDescription>

The maxiumum number of instances to run in the ECS cluster

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_min_size" requirement="required" type="number">
<HclListItemDescription>

The minimum number of instances to run in the ECS cluster

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_name" requirement="required" type="string">
<HclListItemDescription>

The name of the ECS cluster

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the VPC in which the ECS cluster should be launched

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

The IDs of the subnets in which to deploy the ECS cluster instances

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="alarms_sns_topic_arn" requirement="optional" type="list(string)">
<HclListItemDescription>

The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_ssh_from_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

The IP address ranges in CIDR format from which to allow incoming SSH requests to the ECS instances.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_ssh_from_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of security groups from which to allow incoming SSH requests to the ECS instances.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="autoscaling_termination_protection" requirement="optional" type="bool">
<HclListItemDescription>

Protect EC2 instances running ECS tasks from being terminated due to scale in (spot instances do not support lifecycle modifications). Note that the behavior of termination protection differs between clusters with capacity providers and clusters without. When capacity providers is turned on and this flag is true, only instances that have 0 ECS tasks running will be scaled in, regardless of capacity_provider_target. If capacity providers is turned off and this flag is true, this will prevent ANY instances from being scaled in.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="capacity_provider_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Enable a capacity provider to autoscale the EC2 ASG created for this ECS cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="capacity_provider_max_scale_step" requirement="optional" type="number">
<HclListItemDescription>

Maximum step adjustment size to the ASG's desired instance count. A number between 1 and 10000.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="capacity_provider_min_scale_step" requirement="optional" type="number">
<HclListItemDescription>

Minimum step adjustment size to the ASG's desired instance count. A number between 1 and 10000.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="capacity_provider_target" requirement="optional" type="number">
<HclListItemDescription>

Target cluster utilization for the ASG capacity provider; a number from 1 to 100. This number influences when scale out happens, and when instances should be scaled in. For example, a setting of 90 means that new instances will be provisioned when all instances are at 90% utilization, while instances that are only 10% utilized (CPU and Memory usage from tasks = 10%) will be scaled in.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloud_init_parts" requirement="optional" type="map(object(…))">
<HclListItemDescription>

Cloud init scripts to run on the ECS cluster instances during boot. See the part blocks in https://www.terraform.io/docs/providers/template/d/cloudinit_config.html for syntax

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

<HclListItem name="cloudwatch_log_group_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the log group to create in CloudWatch. Defaults to `<a href="#cluster_name"><code>cluster_name</code></a>-logs`.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
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

<HclListItem name="cluster_access_from_sgs" requirement="optional" type="list(any)">
<HclListItemDescription>

Specify a list of Security Groups that will have access to the ECS cluster. Only used if <a href="#enable_cluster_access_ports"><code>enable_cluster_access_ports</code></a> is set to true

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cluster_instance_associate_public_ip_address" requirement="optional" type="bool">
<HclListItemDescription>

Whether to associate a public IP address with an instance in a VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="cluster_instance_keypair_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the Key Pair that can be used to SSH to each instance in the ECS cluster

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_tags_ec2_instances" requirement="optional" type="list">
<HclListItemDescription>

A list of custom tags to apply to the EC2 Instances in this ASG. Each item in this list should be a map with the parameters key, value, and propagate_at_launch.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="custom_tags_ecs_cluster" requirement="optional" type="map(string)">
<HclListItemDescription>

Custom tags to apply to the ECS cluster

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="custom_tags_security_group" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the Security Group for this ECS Cluster. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="default_user" requirement="optional" type="string">
<HclListItemDescription>

The default OS user for the ECS worker AMI. For AWS Amazon Linux AMIs, which is what the Packer template in ecs-node-al2.json uses, the default OS user is 'ec2-user'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ec2-user&quot;"/>
</HclListItem>

<HclListItem name="disallowed_availability_zones" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of availability zones in the region that should be skipped when deploying ECS. You can use this to avoid availability zones that may not be able to provision the resources (e.g instance type does not exist). If empty, allows all availability zones.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_log_aggregation" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable Cloudwatch log aggregation for the ECS cluster

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_metrics" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable Cloudwatch metrics collection for the ECS cluster

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_cluster_access_ports" requirement="optional" type="list(any)">
<HclListItemDescription>

Specify a list of ECS Cluster ports which should be accessible from the security groups given in cluster_access_from_sgs

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="enable_ecs_cloudwatch_alarms" requirement="optional">
<HclListItemDescription>

Set to true to enable several basic Cloudwatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using <a href="#alarms_sns_topic_arn"><code>alarms_sns_topic_arn</code></a>

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_fail2ban" requirement="optional" type="bool">
<HclListItemDescription>

Enable fail2ban to block brute force log in attempts. Defaults to true

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_imds" requirement="optional" type="bool">
<HclListItemDescription>

Set this variable to true to enable the Instance Metadata Service (IMDS) endpoint, which is used to fetch information such as user-data scripts, instance IP address and region, etc. Set this variable to false if you do not want the IMDS endpoint enabled for instances launched into the Auto Scaling Group for the workers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_ip_lockdown" requirement="optional" type="bool">
<HclListItemDescription>

Enable ip-lockdown to block access to the instance metadata. Defaults to true

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_ssh_grunt" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to add IAM permissions for ssh-grunt (https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ssh-grunt), which will allow you to manage SSH access via IAM groups.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="external_account_ssh_grunt_role_arn" requirement="optional" type="string">
<HclListItemDescription>

Since our IAM users are defined in a separate AWS account, this variable is used to specify the ARN of an IAM role that allows ssh-grunt to retrieve IAM group and public SSH key info from that account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="high_cpu_utilization_evaluation_periods" requirement="optional" type="number">
<HclListItemDescription>

The number of periods over which data is compared to the specified threshold

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="2"/>
</HclListItem>

<HclListItem name="high_cpu_utilization_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the CPU utilization percentage. Only used if <a href="#enable_ecs_cloudwatch_alarms"><code>enable_ecs_cloudwatch_alarms</code></a> is set to true

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="high_cpu_utilization_statistic" requirement="optional" type="string">
<HclListItemDescription>

The statistic to apply to the alarm's high CPU metric. Either of the following is supported: SampleCount, Average, Sum, Minimum, Maximum

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;Average&quot;"/>
</HclListItem>

<HclListItem name="high_cpu_utilization_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the ECS Cluster has a CPU utilization percentage above this threshold. Only used if <a href="#enable_ecs_cloudwatch_alarms"><code>enable_ecs_cloudwatch_alarms</code></a> is set to true

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="90"/>
</HclListItem>

<HclListItem name="high_cpu_utilization_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="high_memory_utilization_evaluation_periods" requirement="optional" type="number">
<HclListItemDescription>

The number of periods over which data is compared to the specified threshold

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="2"/>
</HclListItem>

<HclListItem name="high_memory_utilization_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the memory utilization percentage. Only used if <a href="#enable_ecs_cloudwatch_alarms"><code>enable_ecs_cloudwatch_alarms</code></a> is set to true

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="high_memory_utilization_statistic" requirement="optional" type="string">
<HclListItemDescription>

The statistic to apply to the alarm's high CPU metric. Either of the following is supported: SampleCount, Average, Sum, Minimum, Maximum

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;Average&quot;"/>
</HclListItem>

<HclListItem name="high_memory_utilization_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the ECS Cluster has a memory utilization percentage above this threshold. Only used if <a href="#enable_ecs_cloudwatch_alarms"><code>enable_ecs_cloudwatch_alarms</code></a> is set to true

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="90"/>
</HclListItem>

<HclListItem name="high_memory_utilization_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="http_put_response_hop_limit" requirement="optional" type="number">
<HclListItemDescription>

The desired HTTP PUT response hop limit for instance metadata requests for the workers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="internal_alb_sg_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The Security Group ID for the internal ALB

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="multi_az_capacity_provider" requirement="optional" type="bool">
<HclListItemDescription>

Enable a multi-az capacity provider to autoscale the EC2 ASGs created for this ECS cluster, only if capacity_provider_enabled = true

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="public_alb_sg_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The Security Group ID for the public ALB

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="should_create_cloudwatch_log_group" requirement="optional" type="bool">
<HclListItemDescription>

When true, precreate the CloudWatch Log Group to use for log aggregation from the EC2 instances. This is useful if you wish to customize the CloudWatch Log Group with various settings such as retention periods and KMS encryption. When false, the CloudWatch agent will automatically create a basic log group to use.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="ssh_grunt_iam_group" requirement="optional" type="string">
<HclListItemDescription>

If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the nodes in this ECS cluster. This value is only used if enable_ssh_grunt=true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ssh-grunt-users&quot;"/>
</HclListItem>

<HclListItem name="ssh_grunt_iam_group_sudo" requirement="optional" type="string">
<HclListItemDescription>

If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the nodes in this ECS cluster with sudo permissions. This value is only used if enable_ssh_grunt=true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ssh-grunt-sudo-users&quot;"/>
</HclListItem>

<HclListItem name="tenancy" requirement="optional" type="string">
<HclListItemDescription>

The tenancy of this server. Must be one of: default, dedicated, or host.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;default&quot;"/>
</HclListItem>

<HclListItem name="use_imdsv1" requirement="optional" type="bool">
<HclListItemDescription>

Set this variable to true to enable the use of Instance Metadata Service Version 1 in this module's aws_launch_template. Note that while IMDsv2 is preferred due to its special security hardening, we allow this in order to support the use case of AMIs built outside of these modules that depend on IMDSv1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="use_managed_iam_policies" requirement="optional" type="bool">
<HclListItemDescription>

When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="all_metric_widgets">
<HclListItemDescription>

A list of all the CloudWatch Dashboard metric widgets available in this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecs_cluster_arn">
<HclListItemDescription>

The ID of the ECS cluster

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecs_cluster_asg_name">
<HclListItemDescription>

The name of the ECS cluster's autoscaling group (ASG)

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecs_cluster_asg_names">
<HclListItemDescription>

For configurations with multiple ASGs, this contains a list of ASG names.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecs_cluster_capacity_provider_names">
<HclListItemDescription>

For configurations with multiple capacity providers, this contains a list of all capacity provider names.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecs_cluster_launch_template_id">
<HclListItemDescription>

The ID of the launch template used by the ECS cluster's auto scaling group (ASG)

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecs_cluster_name">
<HclListItemDescription>

The name of the ECS cluster

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecs_cluster_vpc_id">
<HclListItemDescription>

The ID of the VPC into which the ECS cluster is launched

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecs_cluster_vpc_subnet_ids">
<HclListItemDescription>

The VPC subnet IDs into which the ECS cluster can launch resources into

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecs_instance_iam_role_arn">
<HclListItemDescription>

The ARN of the IAM role applied to ECS instances

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecs_instance_iam_role_id">
<HclListItemDescription>

The ID of the IAM role applied to ECS instances

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecs_instance_iam_role_name">
<HclListItemDescription>

The name of the IAM role applied to ECS instances

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecs_instance_security_group_id">
<HclListItemDescription>

The ID of the security group applied to ECS instances

</HclListItemDescription>
</HclListItem>

<HclListItem name="metric_widget_ecs_cluster_cpu_usage">
<HclListItemDescription>

The CloudWatch Dashboard metric widget for the ECS cluster workers' CPU utilization metric.

</HclListItemDescription>
</HclListItem>

<HclListItem name="metric_widget_ecs_cluster_memory_usage">
<HclListItemDescription>

The CloudWatch Dashboard metric widget for the ECS cluster workers' Memory utilization metric.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/ecs-cluster/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/ecs-cluster/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/ecs-cluster/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "5005a15bc003afb7ba736a8eb9bee8b7"
}
##DOCS-SOURCER-END -->
