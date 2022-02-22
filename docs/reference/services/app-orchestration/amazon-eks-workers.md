---
type: "service"
name: "Amazon EKS Workers"
description: "Deploy EC2 instances as Kubernetes workers for Amazon Elastic Kubernetes Service (EKS)."
category: "docker-orchestration"
cloud: "aws"
tags: ["docker","orchestration","kubernetes","containers"]
license: "gruntwork"
built-with: "terraform, bash, python, go"
title: "Amazon EKS Workers"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';

<VersionBadge version="0.78.1"/>

# Amazon EKS Workers


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/eks-workers" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=services/eks-workers" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Filtered Release Notes</a>

## Overview

This service contains [Terraform](https://www.terraform.io) and [Packer](https://www.packer.io) code to deploy a
production-grade EC2 server cluster as workers for
[Elastic Kubernetes Service (EKS)](https://docs.aws.amazon.com/eks/latest/userguide/clusters.html) on
[AWS](https://aws.amazon.com).

![EKS architecture](/img/reference/services/app-orchestration/eks-architecture.png)

## Features

*   Deploy self-managed worker nodes in an Auto Scaling Group
*   Deploy managed workers nodes in a Managed Node Group
*   Zero-downtime, rolling deployment for updating worker nodes
*   Auto scaling and auto healing
*   For Nodes:

    *   Server-hardening with fail2ban, ip-lockdown, auto-update, and more
    *   Manage SSH access via IAM groups via ssh-grunt
    *   CloudWatch log aggregation
    *   CloudWatch metrics and alerts

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

Under the hood, this is all implemented using Terraform modules from the Gruntwork
[terraform-aws-eks](https://github.com/gruntwork-io/terraform-aws-eks) repo. If you are a subscriber and don’t have
access to this repo, email <support@gruntwork.io>.

### Core concepts

To understand core concepts like what is Kubernetes, the different worker types, how to authenticate to Kubernetes, and
more, see the documentation in the [terraform-aws-eks](https://github.com/gruntwork-io/terraform-aws-eks) repo.

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

*   [How to deploy a production-grade Kubernetes cluster on AWS](https://docs.gruntwork.io/guides/build-it-yourself/kubernetes-cluster/deployment-walkthrough/pre-requisites):
    A step-by-step guide for deploying a production-grade EKS cluster on AWS using the code in this repo.

## Manage

For information on registering the worker IAM role to the EKS control plane, refer to the
[IAM Roles and Kubernetes API Access](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/eks-workers/core-concepts.md#iam-roles-and-kubernetes-api-access) section of the documentation.

For information on how to perform a blue-green deployment of the worker pools, refer to the
[How do I perform a blue green release to roll out new versions of the module](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/eks-workers/core-concepts.md#how-do-i-perform-a-blue-green-release-to-roll-out-new-versions-of-the-module)
section of the documentation.

For information on how to manage your EKS cluster, including how to deploy Pods on Fargate, how to associate IAM roles
to Pod, how to upgrade your EKS cluster, and more, see the documentation in the
[terraform-aws-eks](https://github.com/gruntwork-io/terraform-aws-eks) repo.

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<a name="additional_security_groups_for_workers" className="snap-top"></a>

* [**`additional_security_groups_for_workers`**](#additional_security_groups_for_workers) &mdash; A list of additional security group IDs to be attached on worker groups.

<a name="alarms_sns_topic_arn" className="snap-top"></a>

* [**`alarms_sns_topic_arn`**](#alarms_sns_topic_arn) &mdash; The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications.

<a name="allow_inbound_ssh_from_cidr_blocks" className="snap-top"></a>

* [**`allow_inbound_ssh_from_cidr_blocks`**](#allow_inbound_ssh_from_cidr_blocks) &mdash; The list of CIDR blocks to allow inbound SSH access to the worker groups.

<a name="allow_inbound_ssh_from_security_groups" className="snap-top"></a>

* [**`allow_inbound_ssh_from_security_groups`**](#allow_inbound_ssh_from_security_groups) &mdash; The list of security group IDs to allow inbound SSH access to the worker groups.

<a name="asg_custom_iam_role_name" className="snap-top"></a>

* [**`asg_custom_iam_role_name`**](#asg_custom_iam_role_name) &mdash; Custom name for the IAM role for the Self-managed workers. When null, a default name based on [`worker_name_prefix`](#worker_name_prefix) will be used. One of [`asg_custom_iam_role_name`](#asg_custom_iam_role_name) and [`asg_iam_role_arn`](#asg_iam_role_arn) is required (must be non-null) if [`asg_iam_role_already_exists`](#asg_iam_role_already_exists) is true.

<a name="asg_default_instance_root_volume_encryption" className="snap-top"></a>

* [**`asg_default_instance_root_volume_encryption`**](#asg_default_instance_root_volume_encryption) &mdash; Default value for the [`asg_instance_root_volume_encryption`](#asg_instance_root_volume_encryption) field of [`autoscaling_group_configurations`](#autoscaling_group_configurations). Any map entry that does not specify [`asg_instance_root_volume_encryption`](#asg_instance_root_volume_encryption) will use this value.

<a name="asg_default_instance_root_volume_size" className="snap-top"></a>

* [**`asg_default_instance_root_volume_size`**](#asg_default_instance_root_volume_size) &mdash; Default value for the [`asg_instance_root_volume_size`](#asg_instance_root_volume_size) field of [`autoscaling_group_configurations`](#autoscaling_group_configurations). Any map entry that does not specify [`asg_instance_root_volume_size`](#asg_instance_root_volume_size) will use this value.

<a name="asg_default_instance_root_volume_type" className="snap-top"></a>

* [**`asg_default_instance_root_volume_type`**](#asg_default_instance_root_volume_type) &mdash; Default value for the [`asg_instance_root_volume_type`](#asg_instance_root_volume_type) field of [`autoscaling_group_configurations`](#autoscaling_group_configurations). Any map entry that does not specify [`asg_instance_root_volume_type`](#asg_instance_root_volume_type) will use this value.

<a name="asg_default_instance_type" className="snap-top"></a>

* [**`asg_default_instance_type`**](#asg_default_instance_type) &mdash; Default value for the [`asg_instance_type`](#asg_instance_type) field of [`autoscaling_group_configurations`](#autoscaling_group_configurations). Any map entry that does not specify [`asg_instance_type`](#asg_instance_type) will use this value.

<a name="asg_default_max_size" className="snap-top"></a>

* [**`asg_default_max_size`**](#asg_default_max_size) &mdash; Default value for the [`max_size`](#max_size) field of [`autoscaling_group_configurations`](#autoscaling_group_configurations). Any map entry that does not specify [`max_size`](#max_size) will use this value.

<a name="asg_default_min_size" className="snap-top"></a>

* [**`asg_default_min_size`**](#asg_default_min_size) &mdash; Default value for the [`min_size`](#min_size) field of [`autoscaling_group_configurations`](#autoscaling_group_configurations). Any map entry that does not specify [`min_size`](#min_size) will use this value.

<a name="asg_default_multi_instance_overrides" className="snap-top"></a>

* [**`asg_default_multi_instance_overrides`**](#asg_default_multi_instance_overrides) &mdash; Default value for the [`multi_instance_overrides`](#multi_instance_overrides) field of [`autoscaling_group_configurations`](#autoscaling_group_configurations). Any map entry that does not specify [`multi_instance_overrides`](#multi_instance_overrides) will use this value.

<a name="asg_default_on_demand_allocation_strategy" className="snap-top"></a>

* [**`asg_default_on_demand_allocation_strategy`**](#asg_default_on_demand_allocation_strategy) &mdash; Default value for the [`on_demand_allocation_strategy`](#on_demand_allocation_strategy) field of [`autoscaling_group_configurations`](#autoscaling_group_configurations). Any map entry that does not specify [`on_demand_allocation_strategy`](#on_demand_allocation_strategy) will use this value.

<a name="asg_default_on_demand_base_capacity" className="snap-top"></a>

* [**`asg_default_on_demand_base_capacity`**](#asg_default_on_demand_base_capacity) &mdash; Default value for the [`on_demand_base_capacity`](#on_demand_base_capacity) field of [`autoscaling_group_configurations`](#autoscaling_group_configurations). Any map entry that does not specify [`on_demand_base_capacity`](#on_demand_base_capacity) will use this value.

<a name="asg_default_on_demand_percentage_above_base_capacity" className="snap-top"></a>

* [**`asg_default_on_demand_percentage_above_base_capacity`**](#asg_default_on_demand_percentage_above_base_capacity) &mdash; Default value for the [`on_demand_percentage_above_base_capacity`](#on_demand_percentage_above_base_capacity) field of [`autoscaling_group_configurations`](#autoscaling_group_configurations). Any map entry that does not specify [`on_demand_percentage_above_base_capacity`](#on_demand_percentage_above_base_capacity) will use this value.

<a name="asg_default_spot_allocation_strategy" className="snap-top"></a>

* [**`asg_default_spot_allocation_strategy`**](#asg_default_spot_allocation_strategy) &mdash; Default value for the [`spot_allocation_strategy`](#spot_allocation_strategy) field of [`autoscaling_group_configurations`](#autoscaling_group_configurations). Any map entry that does not specify [`spot_allocation_strategy`](#spot_allocation_strategy) will use this value.

<a name="asg_default_spot_instance_pools" className="snap-top"></a>

* [**`asg_default_spot_instance_pools`**](#asg_default_spot_instance_pools) &mdash; Default value for the [`spot_instance_pools`](#spot_instance_pools) field of [`autoscaling_group_configurations`](#autoscaling_group_configurations). Any map entry that does not specify [`spot_instance_pools`](#spot_instance_pools) will use this value.

<a name="asg_default_spot_max_price" className="snap-top"></a>

* [**`asg_default_spot_max_price`**](#asg_default_spot_max_price) &mdash; Default value for the [`spot_max_price`](#spot_max_price) field of [`autoscaling_group_configurations`](#autoscaling_group_configurations). Any map entry that does not specify [`spot_max_price`](#spot_max_price) will use this value. Set to empty string (default) to mean on-demand price.

<a name="asg_default_tags" className="snap-top"></a>

* [**`asg_default_tags`**](#asg_default_tags) &mdash; Default value for the tags field of [`autoscaling_group_configurations`](#autoscaling_group_configurations). Any map entry that does not specify tags will use this value.

<a name="asg_default_use_multi_instances_policy" className="snap-top"></a>

* [**`asg_default_use_multi_instances_policy`**](#asg_default_use_multi_instances_policy) &mdash; Default value for the [`use_multi_instances_policy`](#use_multi_instances_policy) field of [`autoscaling_group_configurations`](#autoscaling_group_configurations). Any map entry that does not specify [`use_multi_instances_policy`](#use_multi_instances_policy) will use this value.

<a name="asg_iam_instance_profile_name" className="snap-top"></a>

* [**`asg_iam_instance_profile_name`**](#asg_iam_instance_profile_name) &mdash; Custom name for the IAM instance profile for the Self-managed workers. When null, the IAM role name will be used. If [`asg_use_resource_name_prefix`](#asg_use_resource_name_prefix) is true, this will be used as a name prefix.

<a name="asg_iam_role_already_exists" className="snap-top"></a>

* [**`asg_iam_role_already_exists`**](#asg_iam_role_already_exists) &mdash; Whether or not the IAM role used for the Self-managed workers already exists. When false, this module will create a new IAM role.

<a name="asg_iam_role_arn" className="snap-top"></a>

* [**`asg_iam_role_arn`**](#asg_iam_role_arn) &mdash; ARN of the IAM role to use if [`iam_role_already_exists`](#iam_role_already_exists) = true. When null, uses [`asg_custom_iam_role_name`](#asg_custom_iam_role_name) to lookup the ARN. One of [`asg_custom_iam_role_name`](#asg_custom_iam_role_name) and [`asg_iam_role_arn`](#asg_iam_role_arn) is required (must be non-null) if [`asg_iam_role_already_exists`](#asg_iam_role_already_exists) is true.

<a name="asg_security_group_tags" className="snap-top"></a>

* [**`asg_security_group_tags`**](#asg_security_group_tags) &mdash; A map of tags to apply to the Security Group of the ASG for the self managed worker pool. The key is the tag name and the value is the tag value.

<a name="asg_use_resource_name_prefix" className="snap-top"></a>

* [**`asg_use_resource_name_prefix`**](#asg_use_resource_name_prefix) &mdash; When true, all the relevant resources for self managed workers will be set to use the [`name_prefix`](#name_prefix) attribute so that unique names are generated for them. This allows those resources to support recreation through [`create_before_destroy`](#create_before_destroy) lifecycle rules. Set to false if you were using any version before 0.65.0 and wish to avoid recreating the entire worker pool on your cluster.

<a name="autoscaling_group_configurations" className="snap-top"></a>

* [**`autoscaling_group_configurations`**](#autoscaling_group_configurations) &mdash; Configure one or more self-managed Auto Scaling Groups (ASGs) to manage the EC2 instances in this cluster. Set to empty object ({}) if you do not wish to configure self-managed ASGs.

<a name="autoscaling_group_include_autoscaler_discovery_tags" className="snap-top"></a>

* [**`autoscaling_group_include_autoscaler_discovery_tags`**](#autoscaling_group_include_autoscaler_discovery_tags) &mdash; Adds additional tags to each ASG that allow a cluster autoscaler to auto-discover them. Only used for self-managed workers.

<a name="aws_auth_merger_namespace" className="snap-top"></a>

* [**`aws_auth_merger_namespace`**](#aws_auth_merger_namespace) &mdash; Namespace where the AWS Auth Merger is deployed. If configured, the worker IAM role will be mapped to the Kubernetes RBAC group for Nodes using a ConfigMap in the auth merger namespace.

<a name="cloud_init_parts" className="snap-top"></a>

* [**`cloud_init_parts`**](#cloud_init_parts) &mdash; Cloud init scripts to run on the EKS worker nodes when it is booting. See the part blocks in [`https://www.terraform.io/docs/providers/template/d/cloudinit_config`](#https://www.terraform.io/docs/providers/template/d/cloudinit_config).html for syntax. To override the default boot script installed as part of the module, use the key `default`.

<a name="cluster_instance_ami" className="snap-top"></a>

* [**`cluster_instance_ami`**](#cluster_instance_ami) &mdash; The AMI to run on each instance in the EKS cluster. You can build the AMI using the Packer template eks-node-al2.json. One of [`cluster_instance_ami`](#cluster_instance_ami) or [`cluster_instance_ami_filters`](#cluster_instance_ami_filters) is required. Only used if [`cluster_instance_ami_filters`](#cluster_instance_ami_filters) is null. Set to null if [`cluster_instance_ami_filters`](#cluster_instance_ami_filters) is set.

<a name="cluster_instance_ami_filters" className="snap-top"></a>

* [**`cluster_instance_ami_filters`**](#cluster_instance_ami_filters) &mdash; Properties on the AMI that can be used to lookup a prebuilt AMI for use with self managed workers. You can build the AMI using the Packer template eks-node-al2.json. One of [`cluster_instance_ami`](#cluster_instance_ami) or [`cluster_instance_ami_filters`](#cluster_instance_ami_filters) is required. If both are defined, [`cluster_instance_ami_filters`](#cluster_instance_ami_filters) will be used. Set to null if [`cluster_instance_ami`](#cluster_instance_ami) is set.

<a name="cluster_instance_associate_public_ip_address" className="snap-top"></a>

* [**`cluster_instance_associate_public_ip_address`**](#cluster_instance_associate_public_ip_address) &mdash; Whether or not to associate a public IP address to the instances of the self managed ASGs. Will only work if the instances are launched in a public subnet.

<a name="cluster_instance_keypair_name" className="snap-top"></a>

* [**`cluster_instance_keypair_name`**](#cluster_instance_keypair_name) &mdash; The name of the Key Pair that can be used to SSH to each instance in the EKS cluster.

<a name="custom_egress_security_group_rules" className="snap-top"></a>

* [**`custom_egress_security_group_rules`**](#custom_egress_security_group_rules) &mdash; A map of unique identifiers to egress security group rules to attach to the worker groups.

<a name="custom_ingress_security_group_rules" className="snap-top"></a>

* [**`custom_ingress_security_group_rules`**](#custom_ingress_security_group_rules) &mdash; A map of unique identifiers to ingress security group rules to attach to the worker groups.

<a name="dashboard_cpu_usage_widget_parameters" className="snap-top"></a>

* [**`dashboard_cpu_usage_widget_parameters`**](#dashboard_cpu_usage_widget_parameters) &mdash; Parameters for the worker cpu usage widget to output for use in a CloudWatch dashboard.

<a name="dashboard_disk_usage_widget_parameters" className="snap-top"></a>

* [**`dashboard_disk_usage_widget_parameters`**](#dashboard_disk_usage_widget_parameters) &mdash; Parameters for the worker disk usage widget to output for use in a CloudWatch dashboard.

<a name="dashboard_memory_usage_widget_parameters" className="snap-top"></a>

* [**`dashboard_memory_usage_widget_parameters`**](#dashboard_memory_usage_widget_parameters) &mdash; Parameters for the worker memory usage widget to output for use in a CloudWatch dashboard.

<a name="eks_cluster_name" className="snap-top"></a>

* [**`eks_cluster_name`**](#eks_cluster_name) &mdash; The name of the EKS cluster. The cluster must exist/already be deployed.

<a name="enable_cloudwatch_alarms" className="snap-top"></a>

* [**`enable_cloudwatch_alarms`**](#enable_cloudwatch_alarms) &mdash; Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using [`alarms_sns_topic_arn`](#alarms_sns_topic_arn).

<a name="enable_cloudwatch_metrics" className="snap-top"></a>

* [**`enable_cloudwatch_metrics`**](#enable_cloudwatch_metrics) &mdash; Set to true to add IAM permissions to send custom metrics to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent to get memory and disk metrics in CloudWatch for your Bastion host.

<a name="enable_fail2ban" className="snap-top"></a>

* [**`enable_fail2ban`**](#enable_fail2ban) &mdash; Enable fail2ban to block brute force log in attempts. Defaults to true.

<a name="external_account_ssh_grunt_role_arn" className="snap-top"></a>

* [**`external_account_ssh_grunt_role_arn`**](#external_account_ssh_grunt_role_arn) &mdash; If you are using ssh-grunt and your IAM users / groups are defined in a separate AWS account, you can use this variable to specify the ARN of an IAM role that ssh-grunt can assume to retrieve IAM group and public SSH key info from that account. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).

<a name="managed_node_group_configurations" className="snap-top"></a>

* [**`managed_node_group_configurations`**](#managed_node_group_configurations) &mdash; Configure one or more Node Groups to manage the EC2 instances in this cluster. Set to empty object ({}) if you do not wish to configure managed node groups.

<a name="managed_node_group_custom_iam_role_name" className="snap-top"></a>

* [**`managed_node_group_custom_iam_role_name`**](#managed_node_group_custom_iam_role_name) &mdash; Custom name for the IAM role for the Managed Node Groups. When null, a default name based on [`worker_name_prefix`](#worker_name_prefix) will be used. One of [`managed_node_group_custom_iam_role_name`](#managed_node_group_custom_iam_role_name) and [`managed_node_group_iam_role_arn`](#managed_node_group_iam_role_arn) is required (must be non-null) if [`managed_node_group_iam_role_already_exists`](#managed_node_group_iam_role_already_exists) is true.

<a name="managed_node_group_iam_role_already_exists" className="snap-top"></a>

* [**`managed_node_group_iam_role_already_exists`**](#managed_node_group_iam_role_already_exists) &mdash; Whether or not the IAM role used for the Managed Node Group workers already exists. When false, this module will create a new IAM role.

<a name="managed_node_group_iam_role_arn" className="snap-top"></a>

* [**`managed_node_group_iam_role_arn`**](#managed_node_group_iam_role_arn) &mdash; ARN of the IAM role to use if [`iam_role_already_exists`](#iam_role_already_exists) = true. When null, uses [`managed_node_group_custom_iam_role_name`](#managed_node_group_custom_iam_role_name) to lookup the ARN. One of [`managed_node_group_custom_iam_role_name`](#managed_node_group_custom_iam_role_name) and [`managed_node_group_iam_role_arn`](#managed_node_group_iam_role_arn) is required (must be non-null) if [`managed_node_group_iam_role_already_exists`](#managed_node_group_iam_role_already_exists) is true.

<a name="node_group_default_capacity_type" className="snap-top"></a>

* [**`node_group_default_capacity_type`**](#node_group_default_capacity_type) &mdash; Default value for [`capacity_type`](#capacity_type) field of [`managed_node_group_configurations`](#managed_node_group_configurations).

<a name="node_group_default_desired_size" className="snap-top"></a>

* [**`node_group_default_desired_size`**](#node_group_default_desired_size) &mdash; Default value for [`desired_size`](#desired_size) field of [`managed_node_group_configurations`](#managed_node_group_configurations).

<a name="node_group_default_instance_root_volume_encryption" className="snap-top"></a>

* [**`node_group_default_instance_root_volume_encryption`**](#node_group_default_instance_root_volume_encryption) &mdash; Default value for the [`instance_root_volume_encryption`](#instance_root_volume_encryption) field of [`managed_node_group_configurations`](#managed_node_group_configurations).

<a name="node_group_default_instance_root_volume_size" className="snap-top"></a>

* [**`node_group_default_instance_root_volume_size`**](#node_group_default_instance_root_volume_size) &mdash; Default value for the [`instance_root_volume_size`](#instance_root_volume_size) field of [`managed_node_group_configurations`](#managed_node_group_configurations).

<a name="node_group_default_instance_root_volume_type" className="snap-top"></a>

* [**`node_group_default_instance_root_volume_type`**](#node_group_default_instance_root_volume_type) &mdash; Default value for the [`instance_root_volume_type`](#instance_root_volume_type) field of [`managed_node_group_configurations`](#managed_node_group_configurations).

<a name="node_group_default_instance_types" className="snap-top"></a>

* [**`node_group_default_instance_types`**](#node_group_default_instance_types) &mdash; Default value for [`instance_types`](#instance_types) field of [`managed_node_group_configurations`](#managed_node_group_configurations).

<a name="node_group_default_labels" className="snap-top"></a>

* [**`node_group_default_labels`**](#node_group_default_labels) &mdash; Default value for labels field of [`managed_node_group_configurations`](#managed_node_group_configurations). Unlike [`common_labels`](#common_labels) which will always be merged in, these labels are only used if the labels field is omitted from the configuration.

<a name="node_group_default_max_size" className="snap-top"></a>

* [**`node_group_default_max_size`**](#node_group_default_max_size) &mdash; Default value for [`max_size`](#max_size) field of [`managed_node_group_configurations`](#managed_node_group_configurations).

<a name="node_group_default_min_size" className="snap-top"></a>

* [**`node_group_default_min_size`**](#node_group_default_min_size) &mdash; Default value for [`min_size`](#min_size) field of [`managed_node_group_configurations`](#managed_node_group_configurations).

<a name="node_group_default_subnet_ids" className="snap-top"></a>

* [**`node_group_default_subnet_ids`**](#node_group_default_subnet_ids) &mdash; Default value for [`subnet_ids`](#subnet_ids) field of [`managed_node_group_configurations`](#managed_node_group_configurations).

<a name="node_group_default_tags" className="snap-top"></a>

* [**`node_group_default_tags`**](#node_group_default_tags) &mdash; Default value for tags field of [`managed_node_group_configurations`](#managed_node_group_configurations). Unlike [`common_tags`](#common_tags) which will always be merged in, these tags are only used if the tags field is omitted from the configuration.

<a name="node_group_launch_template_instance_type" className="snap-top"></a>

* [**`node_group_launch_template_instance_type`**](#node_group_launch_template_instance_type) &mdash; The instance type to configure in the launch template. This value will be used when the [`instance_types`](#instance_types) field is set to null (NOT omitted, in which case [`node_group_default_instance_types`](#node_group_default_instance_types) will be used).

<a name="node_group_names" className="snap-top"></a>

* [**`node_group_names`**](#node_group_names) &mdash; The names of the node groups. When null, this value is automatically calculated from the [`managed_node_group_configurations`](#managed_node_group_configurations) map. This variable must be set if any of the values of the [`managed_node_group_configurations`](#managed_node_group_configurations) map depends on a resource that is not available at plan time to work around terraform limitations with [`for_each`](#for_each).

<a name="node_group_security_group_tags" className="snap-top"></a>

* [**`node_group_security_group_tags`**](#node_group_security_group_tags) &mdash; A map of tags to apply to the Security Group of the ASG for the managed node group pool. The key is the tag name and the value is the tag value.

<a name="ssh_grunt_iam_group" className="snap-top"></a>

* [**`ssh_grunt_iam_group`**](#ssh_grunt_iam_group) &mdash; If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the EKS workers. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).

<a name="ssh_grunt_iam_group_sudo" className="snap-top"></a>

* [**`ssh_grunt_iam_group_sudo`**](#ssh_grunt_iam_group_sudo) &mdash; If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the EKS workers with sudo permissions. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).

<a name="tenancy" className="snap-top"></a>

* [**`tenancy`**](#tenancy) &mdash; The tenancy of the servers in the self-managed worker ASG. Must be one of: default, dedicated, or host.

<a name="use_exec_plugin_for_auth" className="snap-top"></a>

* [**`use_exec_plugin_for_auth`**](#use_exec_plugin_for_auth) &mdash; If this variable is set to true, then use an exec-based plugin to authenticate and fetch tokens for EKS. This is useful because EKS clusters use short-lived authentication tokens that can expire in the middle of an 'apply' or 'destroy', and since the native Kubernetes provider in Terraform doesn't have a way to fetch up-to-date tokens, we recommend using an exec-based provider as a workaround. Use the [`use_kubergrunt_to_fetch_token`](#use_kubergrunt_to_fetch_token) input variable to control whether kubergrunt or aws is used to fetch tokens.

<a name="use_kubergrunt_to_fetch_token" className="snap-top"></a>

* [**`use_kubergrunt_to_fetch_token`**](#use_kubergrunt_to_fetch_token) &mdash; EKS clusters use short-lived authentication tokens that can expire in the middle of an 'apply' or 'destroy'. To avoid this issue, we use an exec-based plugin to fetch an up-to-date token. If this variable is set to true, we'll use kubergrunt to fetch the token (in which case, kubergrunt must be installed and on PATH); if this variable is set to false, we'll use the aws CLI to fetch the token (in which case, aws must be installed and on PATH). Note this functionality is only enabled if [`use_exec_plugin_for_auth`](#use_exec_plugin_for_auth) is set to true.

<a name="use_prefix_mode_to_calculate_max_pods" className="snap-top"></a>

* [**`use_prefix_mode_to_calculate_max_pods`**](#use_prefix_mode_to_calculate_max_pods) &mdash; When true, assumes prefix delegation mode is in use for the AWS VPC CNI component of the EKS cluster when computing max pods allowed on the node. In prefix delegation mode, each ENI will be allocated 16 IP addresses (/28) instead of 1, allowing you to pack more Pods per node.

<a name="worker_k8s_role_mapping_name" className="snap-top"></a>

* [**`worker_k8s_role_mapping_name`**](#worker_k8s_role_mapping_name) &mdash; Name of the IAM role to Kubernetes RBAC group mapping ConfigMap. Only used if [`aws_auth_merger_namespace`](#aws_auth_merger_namespace) is not null.

<a name="worker_name_prefix" className="snap-top"></a>

* [**`worker_name_prefix`**](#worker_name_prefix) &mdash; Prefix EKS worker resource names with this string. When you have multiple worker groups for the cluster, you can use this to namespace the resources. Defaults to empty string so that resource names are not excessively long by default.

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="managed_node_group_arns" className="snap-top"></a>

* [**`managed_node_group_arns`**](#managed_node_group_arns) &mdash; Map of Node Group names to ARNs of the created EKS Node Groups.

<a name="managed_node_group_worker_iam_role_arn" className="snap-top"></a>

* [**`managed_node_group_worker_iam_role_arn`**](#managed_node_group_worker_iam_role_arn) &mdash; The ARN of the IAM role associated with the Managed Node Group EKS workers.

<a name="managed_node_group_worker_iam_role_name" className="snap-top"></a>

* [**`managed_node_group_worker_iam_role_name`**](#managed_node_group_worker_iam_role_name) &mdash; The name of the IAM role associated with the Managed Node Group EKS workers.

<a name="managed_node_group_worker_security_group_ids" className="snap-top"></a>

* [**`managed_node_group_worker_security_group_ids`**](#managed_node_group_worker_security_group_ids) &mdash; Map of Node Group names to Auto Scaling Group security group IDs. Empty if [`cluster_instance_keypair_name`](#cluster_instance_keypair_name) is not set.

<a name="managed_node_group_worker_shared_security_group_id" className="snap-top"></a>

* [**`managed_node_group_worker_shared_security_group_id`**](#managed_node_group_worker_shared_security_group_id) &mdash; The ID of the common AWS Security Group associated with all the managed EKS workers.

<a name="metric_widget_managed_node_group_worker_cpu_usage" className="snap-top"></a>

* [**`metric_widget_managed_node_group_worker_cpu_usage`**](#metric_widget_managed_node_group_worker_cpu_usage) &mdash; A CloudWatch Dashboard widget that graphs CPU usage (percentage) of the Managed Node Group EKS workers.

<a name="metric_widget_managed_node_group_worker_disk_usage" className="snap-top"></a>

* [**`metric_widget_managed_node_group_worker_disk_usage`**](#metric_widget_managed_node_group_worker_disk_usage) &mdash; A CloudWatch Dashboard widget that graphs disk usage (percentage) of the Managed Node Group EKS workers.

<a name="metric_widget_managed_node_group_worker_memory_usage" className="snap-top"></a>

* [**`metric_widget_managed_node_group_worker_memory_usage`**](#metric_widget_managed_node_group_worker_memory_usage) &mdash; A CloudWatch Dashboard widget that graphs memory usage (percentage) of the Managed Node Group EKS workers.

<a name="metric_widget_self_managed_worker_cpu_usage" className="snap-top"></a>

* [**`metric_widget_self_managed_worker_cpu_usage`**](#metric_widget_self_managed_worker_cpu_usage) &mdash; A CloudWatch Dashboard widget that graphs CPU usage (percentage) of the self-managed EKS workers.

<a name="metric_widget_self_managed_worker_disk_usage" className="snap-top"></a>

* [**`metric_widget_self_managed_worker_disk_usage`**](#metric_widget_self_managed_worker_disk_usage) &mdash; A CloudWatch Dashboard widget that graphs disk usage (percentage) of the self-managed EKS workers.

<a name="metric_widget_self_managed_worker_memory_usage" className="snap-top"></a>

* [**`metric_widget_self_managed_worker_memory_usage`**](#metric_widget_self_managed_worker_memory_usage) &mdash; A CloudWatch Dashboard widget that graphs memory usage (percentage) of the self-managed EKS workers.

<a name="self_managed_worker_iam_role_arn" className="snap-top"></a>

* [**`self_managed_worker_iam_role_arn`**](#self_managed_worker_iam_role_arn) &mdash; The ARN of the IAM role associated with the self-managed EKS workers.

<a name="self_managed_worker_iam_role_name" className="snap-top"></a>

* [**`self_managed_worker_iam_role_name`**](#self_managed_worker_iam_role_name) &mdash; The name of the IAM role associated with the self-managed EKS workers.

<a name="self_managed_worker_security_group_id" className="snap-top"></a>

* [**`self_managed_worker_security_group_id`**](#self_managed_worker_security_group_id) &mdash; The ID of the AWS Security Group associated with the self-managed EKS workers.

<a name="worker_asg_names" className="snap-top"></a>

* [**`worker_asg_names`**](#worker_asg_names) &mdash; The list of names of the ASGs that were deployed to act as EKS workers.

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"55d40bb829f7c86ee33aa6fab9eef89d"}
##DOCS-SOURCER-END -->
