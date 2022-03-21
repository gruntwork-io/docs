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

<VersionBadge version="0.85.0" lastModifiedVersion="0.85.0"/>

# Amazon ECS Cluster


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/ecs-cluster" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=services%2Fecs-cluster" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

## Overview

This service contains [Terraform](https://www.terraform.io) code to deploy a production-grade ECS cluster on
[AWS](https://aws.amazon.com) using [Elastic Container Service (ECS)](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html).

This service launches an ECS cluster on top of an Auto Scaling Group that you manage. If you wish to launch an ECS
cluster on top of Fargate that is completely managed by AWS, refer to the
[ecs-fargate-cluster module](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/ecs-fargate-cluster). Refer to the section
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

*   [modules](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.
*   [examples](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples): This folder contains working examples of how to use the submodules.
*   [test](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/test): Automated tests for the modules and examples.

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
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

## Manage

For information on how to configure cluster autoscaling, see
[How do you configure cluster autoscaling?](https://github.com/gruntwork-io/terraform-aws-ecs/tree/master/modules/ecs-cluster#how-do-you-configure-cluster-autoscaling)

For information on how to manage your ECS cluster, see the documentation in the
[terraform-aws-ecs](https://github.com/gruntwork-io/terraform-aws-ecs) repo.

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<a name="cluster_instance_ami" className="snap-top"></a>

* [**`cluster_instance_ami`**](#cluster_instance_ami) &mdash; The AMI to run on each instance in the ECS cluster. You can build the AMI using the Packer template ecs-node-al2.json. One of [`cluster_instance_ami`](#cluster_instance_ami) or [`cluster_instance_ami_filters`](#cluster_instance_ami_filters) is required.

<a name="cluster_instance_ami_filters" className="snap-top"></a>

* [**`cluster_instance_ami_filters`**](#cluster_instance_ami_filters) &mdash; Properties on the AMI that can be used to lookup a prebuilt AMI for use with ECS workers. You can build the AMI using the Packer template ecs-node-al2.json. Only used if [`cluster_instance_ami`](#cluster_instance_ami) is null. One of [`cluster_instance_ami`](#cluster_instance_ami) or [`cluster_instance_ami_filters`](#cluster_instance_ami_filters) is required. Set to null if [`cluster_instance_ami`](#cluster_instance_ami) is set.

<a name="cluster_instance_type" className="snap-top"></a>

* [**`cluster_instance_type`**](#cluster_instance_type) &mdash; The type of instances to run in the ECS cluster (e.g. t2.medium)

<a name="cluster_max_size" className="snap-top"></a>

* [**`cluster_max_size`**](#cluster_max_size) &mdash; The maxiumum number of instances to run in the ECS cluster

<a name="cluster_min_size" className="snap-top"></a>

* [**`cluster_min_size`**](#cluster_min_size) &mdash; The minimum number of instances to run in the ECS cluster

<a name="cluster_name" className="snap-top"></a>

* [**`cluster_name`**](#cluster_name) &mdash; The name of the ECS cluster

<a name="vpc_id" className="snap-top"></a>

* [**`vpc_id`**](#vpc_id) &mdash; The ID of the VPC in which the ECS cluster should be launched

<a name="vpc_subnet_ids" className="snap-top"></a>

* [**`vpc_subnet_ids`**](#vpc_subnet_ids) &mdash; The IDs of the subnets in which to deploy the ECS cluster instances

### Optional

<a name="alarms_sns_topic_arn" className="snap-top"></a>

* [**`alarms_sns_topic_arn`**](#alarms_sns_topic_arn) &mdash; The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications

<a name="allow_ssh_from_cidr_blocks" className="snap-top"></a>

* [**`allow_ssh_from_cidr_blocks`**](#allow_ssh_from_cidr_blocks) &mdash; The IP address ranges in CIDR format from which to allow incoming SSH requests to the ECS instances.

<a name="allow_ssh_from_security_group_ids" className="snap-top"></a>

* [**`allow_ssh_from_security_group_ids`**](#allow_ssh_from_security_group_ids) &mdash; The IDs of security groups from which to allow incoming SSH requests to the ECS instances.

<a name="autoscaling_termination_protection" className="snap-top"></a>

* [**`autoscaling_termination_protection`**](#autoscaling_termination_protection) &mdash; Protect EC2 instances running ECS tasks from being terminated due to scale in (spot instances do not support lifecycle modifications). Note that the behavior of termination protection differs between clusters with capacity providers and clusters without. When capacity providers is turned on and this flag is true, only instances that have 0 ECS tasks running will be scaled in, regardless of [`capacity_provider_target`](#capacity_provider_target). If capacity providers is turned off and this flag is true, this will prevent ANY instances from being scaled in.

<a name="capacity_provider_enabled" className="snap-top"></a>

* [**`capacity_provider_enabled`**](#capacity_provider_enabled) &mdash; Enable a capacity provider to autoscale the EC2 ASG created for this ECS cluster.

<a name="capacity_provider_max_scale_step" className="snap-top"></a>

* [**`capacity_provider_max_scale_step`**](#capacity_provider_max_scale_step) &mdash; Maximum step adjustment size to the ASG's desired instance count. A number between 1 and 10000.

<a name="capacity_provider_min_scale_step" className="snap-top"></a>

* [**`capacity_provider_min_scale_step`**](#capacity_provider_min_scale_step) &mdash; Minimum step adjustment size to the ASG's desired instance count. A number between 1 and 10000.

<a name="capacity_provider_target" className="snap-top"></a>

* [**`capacity_provider_target`**](#capacity_provider_target) &mdash; Target cluster utilization for the ASG capacity provider; a number from 1 to 100. This number influences when scale out happens, and when instances should be scaled in. For example, a setting of 90 means that new instances will be provisioned when all instances are at 90% utilization, while instances that are only 10% utilized (CPU and Memory usage from tasks = 10%) will be scaled in.

<a name="cloud_init_parts" className="snap-top"></a>

* [**`cloud_init_parts`**](#cloud_init_parts) &mdash; Cloud init scripts to run on the ECS cluster instances during boot. See the part blocks in [`https://www.terraform.io/docs/providers/template/d/cloudinit_config`](#https://www.terraform.io/docs/providers/template/d/cloudinit_config).html for syntax

<a name="cloudwatch_log_group_kms_key_id" className="snap-top"></a>

* [**`cloudwatch_log_group_kms_key_id`**](#cloudwatch_log_group_kms_key_id) &mdash; The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for encrypting log data.

<a name="cloudwatch_log_group_name" className="snap-top"></a>

* [**`cloudwatch_log_group_name`**](#cloudwatch_log_group_name) &mdash; The name of the log group to create in CloudWatch. Defaults to [``var.cluster_name`](#`var.cluster_name)-logs`.

<a name="cloudwatch_log_group_retention_in_days" className="snap-top"></a>

* [**`cloudwatch_log_group_retention_in_days`**](#cloudwatch_log_group_retention_in_days) &mdash; The number of days to retain log events in the log group. Refer to [`https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days`](#https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days) for all the valid values. When null, the log events are retained forever.

<a name="cloudwatch_log_group_tags" className="snap-top"></a>

* [**`cloudwatch_log_group_tags`**](#cloudwatch_log_group_tags) &mdash; Tags to apply on the CloudWatch Log Group, encoded as a map where the keys are tag keys and values are tag values.

<a name="cluster_access_from_sgs" className="snap-top"></a>

* [**`cluster_access_from_sgs`**](#cluster_access_from_sgs) &mdash; Specify a list of Security Groups that will have access to the ECS cluster. Only used if [`enable_cluster_access_ports`](#enable_cluster_access_ports) is set to true

<a name="cluster_instance_associate_public_ip_address" className="snap-top"></a>

* [**`cluster_instance_associate_public_ip_address`**](#cluster_instance_associate_public_ip_address) &mdash; Whether to associate a public IP address with an instance in a VPC

<a name="cluster_instance_keypair_name" className="snap-top"></a>

* [**`cluster_instance_keypair_name`**](#cluster_instance_keypair_name) &mdash; The name of the Key Pair that can be used to SSH to each instance in the ECS cluster

<a name="default_user" className="snap-top"></a>

* [**`default_user`**](#default_user) &mdash; The default OS user for the ECS worker AMI. For AWS Amazon Linux AMIs, which is what the Packer template in ecs-node-al2.json uses, the default OS user is 'ec2-user'.

<a name="disallowed_availability_zones" className="snap-top"></a>

* [**`disallowed_availability_zones`**](#disallowed_availability_zones) &mdash; A list of availability zones in the region that should be skipped when deploying ECS. You can use this to avoid availability zones that may not be able to provision the resources (e.g instance type does not exist). If empty, allows all availability zones.

<a name="enable_cloudwatch_log_aggregation" className="snap-top"></a>

* [**`enable_cloudwatch_log_aggregation`**](#enable_cloudwatch_log_aggregation) &mdash; Set to true to enable Cloudwatch log aggregation for the ECS cluster

<a name="enable_cloudwatch_metrics" className="snap-top"></a>

* [**`enable_cloudwatch_metrics`**](#enable_cloudwatch_metrics) &mdash; Set to true to enable Cloudwatch metrics collection for the ECS cluster

<a name="enable_cluster_access_ports" className="snap-top"></a>

* [**`enable_cluster_access_ports`**](#enable_cluster_access_ports) &mdash; Specify a list of ECS Cluster ports which should be accessible from the security groups given in [`cluster_access_from_sgs`](#cluster_access_from_sgs)

<a name="enable_ecs_cloudwatch_alarms" className="snap-top"></a>

* [**`enable_ecs_cloudwatch_alarms`**](#enable_ecs_cloudwatch_alarms) &mdash; Set to true to enable several basic Cloudwatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using [`alarms_sns_topic_arn`](#alarms_sns_topic_arn)

<a name="enable_fail2ban" className="snap-top"></a>

* [**`enable_fail2ban`**](#enable_fail2ban) &mdash; Enable fail2ban to block brute force log in attempts. Defaults to true

<a name="enable_ip_lockdown" className="snap-top"></a>

* [**`enable_ip_lockdown`**](#enable_ip_lockdown) &mdash; Enable ip-lockdown to block access to the instance metadata. Defaults to true

<a name="enable_ssh_grunt" className="snap-top"></a>

* [**`enable_ssh_grunt`**](#enable_ssh_grunt) &mdash; Set to true to add IAM permissions for ssh-grunt (https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ssh-grunt), which will allow you to manage SSH access via IAM groups.

<a name="external_account_ssh_grunt_role_arn" className="snap-top"></a>

* [**`external_account_ssh_grunt_role_arn`**](#external_account_ssh_grunt_role_arn) &mdash; Since our IAM users are defined in a separate AWS account, this variable is used to specify the ARN of an IAM role that allows ssh-grunt to retrieve IAM group and public SSH key info from that account.

<a name="high_cpu_utilization_evaluation_periods" className="snap-top"></a>

* [**`high_cpu_utilization_evaluation_periods`**](#high_cpu_utilization_evaluation_periods) &mdash; The number of periods over which data is compared to the specified threshold

<a name="high_cpu_utilization_period" className="snap-top"></a>

* [**`high_cpu_utilization_period`**](#high_cpu_utilization_period) &mdash; The period, in seconds, over which to measure the CPU utilization percentage. Only used if [`enable_ecs_cloudwatch_alarms`](#enable_ecs_cloudwatch_alarms) is set to true

<a name="high_cpu_utilization_statistic" className="snap-top"></a>

* [**`high_cpu_utilization_statistic`**](#high_cpu_utilization_statistic) &mdash; The statistic to apply to the alarm's high CPU metric. Either of the following is supported: SampleCount, Average, Sum, Minimum, Maximum

<a name="high_cpu_utilization_threshold" className="snap-top"></a>

* [**`high_cpu_utilization_threshold`**](#high_cpu_utilization_threshold) &mdash; Trigger an alarm if the ECS Cluster has a CPU utilization percentage above this threshold. Only used if [`enable_ecs_cloudwatch_alarms`](#enable_ecs_cloudwatch_alarms) is set to true

<a name="high_disk_utilization_period" className="snap-top"></a>

* [**`high_disk_utilization_period`**](#high_disk_utilization_period) &mdash; The period, in seconds, over which to measure the disk utilization percentage. Only used if [`enable_ecs_cloudwatch_alarms`](#enable_ecs_cloudwatch_alarms) is set to true

<a name="high_disk_utilization_threshold" className="snap-top"></a>

* [**`high_disk_utilization_threshold`**](#high_disk_utilization_threshold) &mdash; Trigger an alarm if the EC2 instances in the ECS Cluster have a disk utilization percentage above this threshold. Only used if [`enable_ecs_cloudwatch_alarms`](#enable_ecs_cloudwatch_alarms) is set to true

<a name="high_memory_utilization_evaluation_periods" className="snap-top"></a>

* [**`high_memory_utilization_evaluation_periods`**](#high_memory_utilization_evaluation_periods) &mdash; The number of periods over which data is compared to the specified threshold

<a name="high_memory_utilization_period" className="snap-top"></a>

* [**`high_memory_utilization_period`**](#high_memory_utilization_period) &mdash; The period, in seconds, over which to measure the memory utilization percentage. Only used if [`enable_ecs_cloudwatch_alarms`](#enable_ecs_cloudwatch_alarms) is set to true

<a name="high_memory_utilization_statistic" className="snap-top"></a>

* [**`high_memory_utilization_statistic`**](#high_memory_utilization_statistic) &mdash; The statistic to apply to the alarm's high CPU metric. Either of the following is supported: SampleCount, Average, Sum, Minimum, Maximum

<a name="high_memory_utilization_threshold" className="snap-top"></a>

* [**`high_memory_utilization_threshold`**](#high_memory_utilization_threshold) &mdash; Trigger an alarm if the ECS Cluster has a memory utilization percentage above this threshold. Only used if [`enable_ecs_cloudwatch_alarms`](#enable_ecs_cloudwatch_alarms) is set to true

<a name="internal_alb_sg_ids" className="snap-top"></a>

* [**`internal_alb_sg_ids`**](#internal_alb_sg_ids) &mdash; The Security Group ID for the internal ALB

<a name="multi_az_capacity_provider" className="snap-top"></a>

* [**`multi_az_capacity_provider`**](#multi_az_capacity_provider) &mdash; Enable a multi-az capacity provider to autoscale the EC2 ASGs created for this ECS cluster, only if [`capacity_provider_enabled`](#capacity_provider_enabled) = true

<a name="public_alb_sg_ids" className="snap-top"></a>

* [**`public_alb_sg_ids`**](#public_alb_sg_ids) &mdash; The Security Group ID for the public ALB

<a name="should_create_cloudwatch_log_group" className="snap-top"></a>

* [**`should_create_cloudwatch_log_group`**](#should_create_cloudwatch_log_group) &mdash; When true, precreate the CloudWatch Log Group to use for log aggregation from the EC2 instances. This is useful if you wish to customize the CloudWatch Log Group with various settings such as retention periods and KMS encryption. When false, the CloudWatch agent will automatically create a basic log group to use.

<a name="ssh_grunt_iam_group" className="snap-top"></a>

* [**`ssh_grunt_iam_group`**](#ssh_grunt_iam_group) &mdash; If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the nodes in this ECS cluster. This value is only used if [`enable_ssh_grunt`](#enable_ssh_grunt)=true.

<a name="ssh_grunt_iam_group_sudo" className="snap-top"></a>

* [**`ssh_grunt_iam_group_sudo`**](#ssh_grunt_iam_group_sudo) &mdash; If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the nodes in this ECS cluster with sudo permissions. This value is only used if [`enable_ssh_grunt`](#enable_ssh_grunt)=true.

<a name="tenancy" className="snap-top"></a>

* [**`tenancy`**](#tenancy) &mdash; The tenancy of this server. Must be one of: default, dedicated, or host.

<a name="use_managed_iam_policies" className="snap-top"></a>

* [**`use_managed_iam_policies`**](#use_managed_iam_policies) &mdash; When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards.

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="all_metric_widgets" className="snap-top"></a>

* [**`all_metric_widgets`**](#all_metric_widgets) &mdash; A list of all the CloudWatch Dashboard metric widgets available in this module.

<a name="ecs_cluster_arn" className="snap-top"></a>

* [**`ecs_cluster_arn`**](#ecs_cluster_arn) &mdash; The ID of the ECS cluster

<a name="ecs_cluster_asg_name" className="snap-top"></a>

* [**`ecs_cluster_asg_name`**](#ecs_cluster_asg_name) &mdash; The name of the ECS cluster's autoscaling group (ASG)

<a name="ecs_cluster_asg_names" className="snap-top"></a>

* [**`ecs_cluster_asg_names`**](#ecs_cluster_asg_names) &mdash; For configurations with multiple ASGs, this contains a list of ASG names.

<a name="ecs_cluster_capacity_provider_names" className="snap-top"></a>

* [**`ecs_cluster_capacity_provider_names`**](#ecs_cluster_capacity_provider_names) &mdash; For configurations with multiple capacity providers, this contains a list of all capacity provider names.

<a name="ecs_cluster_launch_configuration_id" className="snap-top"></a>

* [**`ecs_cluster_launch_configuration_id`**](#ecs_cluster_launch_configuration_id) &mdash; The ID of the launch configuration used by the ECS cluster's auto scaling group (ASG)

<a name="ecs_cluster_name" className="snap-top"></a>

* [**`ecs_cluster_name`**](#ecs_cluster_name) &mdash; The name of the ECS cluster

<a name="ecs_cluster_vpc_id" className="snap-top"></a>

* [**`ecs_cluster_vpc_id`**](#ecs_cluster_vpc_id) &mdash; The ID of the VPC into which the ECS cluster is launched

<a name="ecs_cluster_vpc_subnet_ids" className="snap-top"></a>

* [**`ecs_cluster_vpc_subnet_ids`**](#ecs_cluster_vpc_subnet_ids) &mdash; The VPC subnet IDs into which the ECS cluster can launch resources into

<a name="ecs_instance_iam_role_arn" className="snap-top"></a>

* [**`ecs_instance_iam_role_arn`**](#ecs_instance_iam_role_arn) &mdash; The ARN of the IAM role applied to ECS instances

<a name="ecs_instance_iam_role_id" className="snap-top"></a>

* [**`ecs_instance_iam_role_id`**](#ecs_instance_iam_role_id) &mdash; The ID of the IAM role applied to ECS instances

<a name="ecs_instance_iam_role_name" className="snap-top"></a>

* [**`ecs_instance_iam_role_name`**](#ecs_instance_iam_role_name) &mdash; The name of the IAM role applied to ECS instances

<a name="ecs_instance_security_group_id" className="snap-top"></a>

* [**`ecs_instance_security_group_id`**](#ecs_instance_security_group_id) &mdash; The ID of the security group applied to ECS instances

<a name="metric_widget_ecs_cluster_cpu_usage" className="snap-top"></a>

* [**`metric_widget_ecs_cluster_cpu_usage`**](#metric_widget_ecs_cluster_cpu_usage) &mdash; The CloudWatch Dashboard metric widget for the ECS cluster workers' CPU utilization metric.

<a name="metric_widget_ecs_cluster_memory_usage" className="snap-top"></a>

* [**`metric_widget_ecs_cluster_memory_usage`**](#metric_widget_ecs_cluster_memory_usage) &mdash; The CloudWatch Dashboard metric widget for the ECS cluster workers' Memory utilization metric.

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"ad5644b19bdade5d75af8d8de1dfc8ba"}
##DOCS-SOURCER-END -->
