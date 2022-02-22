---
type: "service"
name: "Amazon EKS"
description: "Deploy Kubernetes on top of Amazon Elastic Kubernetes Service (EKS)."
category: "docker-orchestration"
cloud: "aws"
tags: ["docker","orchestration","kubernetes","containers"]
license: "gruntwork"
built-with: "terraform, bash, python, go"
title: "Amazon EKS"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';

<VersionBadge version="0.78.1"/>

# Amazon EKS


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/eks-cluster" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=services/eks-cluster" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Filtered Release Notes</a>

## Overview

This service contains [Terraform](https://www.terraform.io) and [Packer](https://www.packer.io) code to deploy a
production-grade Kubernetes cluster on [AWS](https://aws.amazon.com) using
[Elastic Kubernetes Service (EKS)](https://docs.aws.amazon.com/eks/latest/userguide/clusters.html).

![EKS architecture](/img/reference/services/app-orchestration/eks-architecture.png)

## Features

*   Deploy a fully-managed control plane
*   Deploy worker nodes in an Auto Scaling Group
*   Deploy Pods using Fargate instead of managing worker nodes
*   Zero-downtime, rolling deployment for updating worker nodes
*   IAM to RBAC mapping
*   Auto scaling and auto healing
*   For Self Managed and Managed Node Group Workers:
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

For information on how to manage your EKS cluster, including how to deploy Pods on Fargate, how to associate IAM roles
to Pod, how to upgrade your EKS cluster, and more, see the documentation in the
[terraform-aws-eks](https://github.com/gruntwork-io/terraform-aws-eks) repo.

To add and manage additional worker groups, refer to the [eks-workers module](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/eks-workers).

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<a name="additional_security_groups_for_control_plane" className="snap-top"></a>

* [**`additional_security_groups_for_control_plane`**](#additional_security_groups_for_control_plane) &mdash; A list of additional security group IDs to attach to the control plane.

<a name="additional_security_groups_for_workers" className="snap-top"></a>

* [**`additional_security_groups_for_workers`**](#additional_security_groups_for_workers) &mdash; A list of additional security group IDs to attach to the worker nodes.

<a name="alarms_sns_topic_arn" className="snap-top"></a>

* [**`alarms_sns_topic_arn`**](#alarms_sns_topic_arn) &mdash; The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications.

<a name="allow_inbound_api_access_from_cidr_blocks" className="snap-top"></a>

* [**`allow_inbound_api_access_from_cidr_blocks`**](#allow_inbound_api_access_from_cidr_blocks) &mdash; The list of CIDR blocks to allow inbound access to the Kubernetes API.

<a name="allow_inbound_ssh_from_cidr_blocks" className="snap-top"></a>

* [**`allow_inbound_ssh_from_cidr_blocks`**](#allow_inbound_ssh_from_cidr_blocks) &mdash; The list of CIDR blocks to allow inbound SSH access to the worker groups.

<a name="allow_inbound_ssh_from_security_groups" className="snap-top"></a>

* [**`allow_inbound_ssh_from_security_groups`**](#allow_inbound_ssh_from_security_groups) &mdash; The list of security group IDs to allow inbound SSH access to the worker groups.

<a name="allow_private_api_access_from_cidr_blocks" className="snap-top"></a>

* [**`allow_private_api_access_from_cidr_blocks`**](#allow_private_api_access_from_cidr_blocks) &mdash; The list of CIDR blocks to allow inbound access to the private Kubernetes API endpoint (e.g. the endpoint within the VPC, not the public endpoint).

<a name="allow_private_api_access_from_security_groups" className="snap-top"></a>

* [**`allow_private_api_access_from_security_groups`**](#allow_private_api_access_from_security_groups) &mdash; The list of security groups to allow inbound access to the private Kubernetes API endpoint (e.g. the endpoint within the VPC, not the public endpoint).

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

<a name="asg_iam_permissions_boundary" className="snap-top"></a>

* [**`asg_iam_permissions_boundary`**](#asg_iam_permissions_boundary) &mdash; ARN of a permission boundary to apply on the IAM role created for the self managed workers.

<a name="asg_security_group_tags" className="snap-top"></a>

* [**`asg_security_group_tags`**](#asg_security_group_tags) &mdash; A map of tags to apply to the Security Group of the ASG for the self managed worker pool. The key is the tag name and the value is the tag value.

<a name="asg_use_resource_name_prefix" className="snap-top"></a>

* [**`asg_use_resource_name_prefix`**](#asg_use_resource_name_prefix) &mdash; When true, all the relevant resources for self managed workers will be set to use the [`name_prefix`](#name_prefix) attribute so that unique names are generated for them. This allows those resources to support recreation through [`create_before_destroy`](#create_before_destroy) lifecycle rules. Set to false if you were using any version before 0.65.0 and wish to avoid recreating the entire worker pool on your cluster.

<a name="autoscaling_group_configurations" className="snap-top"></a>

* [**`autoscaling_group_configurations`**](#autoscaling_group_configurations) &mdash; Configure one or more Auto Scaling Groups (ASGs) to manage the EC2 instances in this cluster. If any of the values are not provided, the specified default variable will be used to lookup a default value.

<a name="autoscaling_group_include_autoscaler_discovery_tags" className="snap-top"></a>

* [**`autoscaling_group_include_autoscaler_discovery_tags`**](#autoscaling_group_include_autoscaler_discovery_tags) &mdash; Adds additional tags to each ASG that allow a cluster autoscaler to auto-discover them.

<a name="aws_auth_merger_default_configmap_name" className="snap-top"></a>

* [**`aws_auth_merger_default_configmap_name`**](#aws_auth_merger_default_configmap_name) &mdash; Name of the default aws-auth ConfigMap to use. This will be the name of the ConfigMap that gets created by this module in the aws-auth-merger namespace to seed the initial aws-auth ConfigMap.

<a name="aws_auth_merger_image" className="snap-top"></a>

* [**`aws_auth_merger_image`**](#aws_auth_merger_image) &mdash; Location of the container image to use for the aws-auth-merger app. You can use the Dockerfile provided in terraform-aws-eks to construct an image. See https://github.com/gruntwork-io/terraform-aws-eks/blob/master/modules/eks-aws-auth-merger/core-concepts.md#how-do-i-use-the-aws-auth-merger for more info.

<a name="aws_auth_merger_namespace" className="snap-top"></a>

* [**`aws_auth_merger_namespace`**](#aws_auth_merger_namespace) &mdash; Namespace to deploy the aws-auth-merger into. The app will watch for ConfigMaps in this Namespace to merge into the aws-auth ConfigMap.

<a name="cloud_init_parts" className="snap-top"></a>

* [**`cloud_init_parts`**](#cloud_init_parts) &mdash; Cloud init scripts to run on the EKS worker nodes when it is booting. See the part blocks in [`https://www.terraform.io/docs/providers/template/d/cloudinit_config`](#https://www.terraform.io/docs/providers/template/d/cloudinit_config).html for syntax. To override the default boot script installed as part of the module, use the key `default`.

<a name="cluster_iam_role_permissions_boundary" className="snap-top"></a>

* [**`cluster_iam_role_permissions_boundary`**](#cluster_iam_role_permissions_boundary) &mdash; ARN of permissions boundary to apply to the cluster IAM role - the IAM role created for the EKS cluster.

<a name="cluster_instance_ami" className="snap-top"></a>

* [**`cluster_instance_ami`**](#cluster_instance_ami) &mdash; The AMI to run on each instance in the EKS cluster. You can build the AMI using the Packer template eks-node-al2.json. One of [`cluster_instance_ami`](#cluster_instance_ami) or [`cluster_instance_ami_filters`](#cluster_instance_ami_filters) is required. Only used if [`cluster_instance_ami_filters`](#cluster_instance_ami_filters) is null. Set to null if [`cluster_instance_ami_filters`](#cluster_instance_ami_filters) is set.

<a name="cluster_instance_ami_filters" className="snap-top"></a>

* [**`cluster_instance_ami_filters`**](#cluster_instance_ami_filters) &mdash; Properties on the AMI that can be used to lookup a prebuilt AMI for use with self managed workers. You can build the AMI using the Packer template eks-node-al2.json. One of [`cluster_instance_ami`](#cluster_instance_ami) or [`cluster_instance_ami_filters`](#cluster_instance_ami_filters) is required. If both are defined, [`cluster_instance_ami_filters`](#cluster_instance_ami_filters) will be used. Set to null if [`cluster_instance_ami`](#cluster_instance_ami) is set.

<a name="cluster_instance_associate_public_ip_address" className="snap-top"></a>

* [**`cluster_instance_associate_public_ip_address`**](#cluster_instance_associate_public_ip_address) &mdash; Whether or not to associate a public IP address to the instances of the self managed ASGs. Will only work if the instances are launched in a public subnet.

<a name="cluster_instance_keypair_name" className="snap-top"></a>

* [**`cluster_instance_keypair_name`**](#cluster_instance_keypair_name) &mdash; The name of the Key Pair that can be used to SSH to each instance in the EKS cluster

<a name="cluster_name" className="snap-top"></a>

* [**`cluster_name`**](#cluster_name) &mdash; The name of the EKS cluster

<a name="control_plane_cloudwatch_log_group_kms_key_id" className="snap-top"></a>

* [**`control_plane_cloudwatch_log_group_kms_key_id`**](#control_plane_cloudwatch_log_group_kms_key_id) &mdash; The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for encrypting log data in the CloudWatch log group for EKS control plane logs.

<a name="control_plane_cloudwatch_log_group_retention_in_days" className="snap-top"></a>

* [**`control_plane_cloudwatch_log_group_retention_in_days`**](#control_plane_cloudwatch_log_group_retention_in_days) &mdash; The number of days to retain log events in the CloudWatch log group for EKS control plane logs. Refer to [`https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days`](#https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days) for all the valid values. When null, the log events are retained forever.

<a name="control_plane_cloudwatch_log_group_tags" className="snap-top"></a>

* [**`control_plane_cloudwatch_log_group_tags`**](#control_plane_cloudwatch_log_group_tags) &mdash; Tags to apply on the CloudWatch Log Group for EKS control plane logs, encoded as a map where the keys are tag keys and values are tag values.

<a name="control_plane_disallowed_availability_zones" className="snap-top"></a>

* [**`control_plane_disallowed_availability_zones`**](#control_plane_disallowed_availability_zones) &mdash; A list of availability zones in the region that we CANNOT use to deploy the EKS control plane. You can use this to avoid availability zones that may not be able to provision the resources (e.g ran out of capacity). If empty, will allow all availability zones.

<a name="control_plane_vpc_subnet_ids" className="snap-top"></a>

* [**`control_plane_vpc_subnet_ids`**](#control_plane_vpc_subnet_ids) &mdash; List of IDs of the subnets that can be used for the EKS Control Plane.

<a name="create_default_fargate_iam_role" className="snap-top"></a>

* [**`create_default_fargate_iam_role`**](#create_default_fargate_iam_role) &mdash; When true, IAM role will be created and attached to Fargate control plane services.

<a name="custom_default_fargate_iam_role_name" className="snap-top"></a>

* [**`custom_default_fargate_iam_role_name`**](#custom_default_fargate_iam_role_name) &mdash; The name to use for the default Fargate execution IAM role that is created when [`create_default_fargate_iam_role`](#create_default_fargate_iam_role) is true. When null, defaults to [`CLUSTER_NAME`](#CLUSTER_NAME)-fargate-role.

<a name="custom_worker_egress_security_group_rules" className="snap-top"></a>

* [**`custom_worker_egress_security_group_rules`**](#custom_worker_egress_security_group_rules) &mdash; A map of unique identifiers to egress security group rules to attach to the worker groups.

<a name="custom_worker_ingress_security_group_rules" className="snap-top"></a>

* [**`custom_worker_ingress_security_group_rules`**](#custom_worker_ingress_security_group_rules) &mdash; A map of unique identifiers to ingress security group rules to attach to the worker groups.

<a name="dashboard_cpu_usage_widget_parameters" className="snap-top"></a>

* [**`dashboard_cpu_usage_widget_parameters`**](#dashboard_cpu_usage_widget_parameters) &mdash; Parameters for the worker cpu usage widget to output for use in a CloudWatch dashboard.

<a name="dashboard_disk_usage_widget_parameters" className="snap-top"></a>

* [**`dashboard_disk_usage_widget_parameters`**](#dashboard_disk_usage_widget_parameters) &mdash; Parameters for the worker disk usage widget to output for use in a CloudWatch dashboard.

<a name="dashboard_memory_usage_widget_parameters" className="snap-top"></a>

* [**`dashboard_memory_usage_widget_parameters`**](#dashboard_memory_usage_widget_parameters) &mdash; Parameters for the worker memory usage widget to output for use in a CloudWatch dashboard.

<a name="eks_cluster_security_group_tags" className="snap-top"></a>

* [**`eks_cluster_security_group_tags`**](#eks_cluster_security_group_tags) &mdash; A map of custom tags to apply to the Security Group for the EKS Cluster Control Plane. The key is the tag name and the value is the tag value.

<a name="eks_cluster_tags" className="snap-top"></a>

* [**`eks_cluster_tags`**](#eks_cluster_tags) &mdash; A map of custom tags to apply to the EKS Cluster Control Plane. The key is the tag name and the value is the tag value.

<a name="enable_aws_auth_merger" className="snap-top"></a>

* [**`enable_aws_auth_merger`**](#enable_aws_auth_merger) &mdash; If set to true, installs the aws-auth-merger to manage the aws-auth configuration. When true, requires setting the [`aws_auth_merger_image`](#aws_auth_merger_image) variable.

<a name="enable_aws_auth_merger_fargate" className="snap-top"></a>

* [**`enable_aws_auth_merger_fargate`**](#enable_aws_auth_merger_fargate) &mdash; When true, deploy the aws-auth-merger into Fargate. It is recommended to run the aws-auth-merger on Fargate to avoid chicken and egg issues between the aws-auth-merger and having an authenticated worker pool.

<a name="enable_cloudwatch_alarms" className="snap-top"></a>

* [**`enable_cloudwatch_alarms`**](#enable_cloudwatch_alarms) &mdash; Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using [`alarms_sns_topic_arn`](#alarms_sns_topic_arn).

<a name="enable_cloudwatch_metrics" className="snap-top"></a>

* [**`enable_cloudwatch_metrics`**](#enable_cloudwatch_metrics) &mdash; Set to true to add IAM permissions to send custom metrics to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent to get memory and disk metrics in CloudWatch for your Bastion host.

<a name="enable_fail2ban" className="snap-top"></a>

* [**`enable_fail2ban`**](#enable_fail2ban) &mdash; Enable fail2ban to block brute force log in attempts. Defaults to true.

<a name="enabled_control_plane_log_types" className="snap-top"></a>

* [**`enabled_control_plane_log_types`**](#enabled_control_plane_log_types) &mdash; A list of the desired control plane logging to enable. See https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html for the list of available logs.

<a name="endpoint_public_access" className="snap-top"></a>

* [**`endpoint_public_access`**](#endpoint_public_access) &mdash; Whether or not to enable public API endpoints which allow access to the Kubernetes API from outside of the VPC. Note that private access within the VPC is always enabled.

<a name="external_account_ssh_grunt_role_arn" className="snap-top"></a>

* [**`external_account_ssh_grunt_role_arn`**](#external_account_ssh_grunt_role_arn) &mdash; If you are using ssh-grunt and your IAM users / groups are defined in a separate AWS account, you can use this variable to specify the ARN of an IAM role that ssh-grunt can assume to retrieve IAM group and public SSH key info from that account. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).

<a name="fargate_profile_executor_iam_role_arns_for_k8s_role_mapping" className="snap-top"></a>

* [**`fargate_profile_executor_iam_role_arns_for_k8s_role_mapping`**](#fargate_profile_executor_iam_role_arns_for_k8s_role_mapping) &mdash; List of ARNs of AWS IAM roles corresponding to Fargate Profiles that should be mapped as Kubernetes Nodes.

<a name="fargate_worker_disallowed_availability_zones" className="snap-top"></a>

* [**`fargate_worker_disallowed_availability_zones`**](#fargate_worker_disallowed_availability_zones) &mdash; A list of availability zones in the region that we CANNOT use to deploy the EKS Fargate workers. You can use this to avoid availability zones that may not be able to provision the resources (e.g ran out of capacity). If empty, will allow all availability zones.

<a name="iam_role_to_rbac_group_mapping" className="snap-top"></a>

* [**`iam_role_to_rbac_group_mapping`**](#iam_role_to_rbac_group_mapping) &mdash; Mapping of IAM role ARNs to Kubernetes RBAC groups that grant permissions to the user.

<a name="iam_user_to_rbac_group_mapping" className="snap-top"></a>

* [**`iam_user_to_rbac_group_mapping`**](#iam_user_to_rbac_group_mapping) &mdash; Mapping of IAM user ARNs to Kubernetes RBAC groups that grant permissions to the user.

<a name="kubernetes_version" className="snap-top"></a>

* [**`kubernetes_version`**](#kubernetes_version) &mdash; Version of Kubernetes to use. Refer to EKS docs for list of available versions (https://docs.aws.amazon.com/eks/latest/userguide/platform-versions.html).

<a name="managed_node_group_configurations" className="snap-top"></a>

* [**`managed_node_group_configurations`**](#managed_node_group_configurations) &mdash; Configure one or more Node Groups to manage the EC2 instances in this cluster. Set to empty object ({}) if you do not wish to configure managed node groups.

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

<a name="node_group_iam_permissions_boundary" className="snap-top"></a>

* [**`node_group_iam_permissions_boundary`**](#node_group_iam_permissions_boundary) &mdash; ARN of a permission boundary to apply on the IAM role created for the managed node groups.

<a name="node_group_launch_template_instance_type" className="snap-top"></a>

* [**`node_group_launch_template_instance_type`**](#node_group_launch_template_instance_type) &mdash; The instance type to configure in the launch template. This value will be used when the [`instance_types`](#instance_types) field is set to null (NOT omitted, in which case [`node_group_default_instance_types`](#node_group_default_instance_types) will be used).

<a name="node_group_security_group_tags" className="snap-top"></a>

* [**`node_group_security_group_tags`**](#node_group_security_group_tags) &mdash; A map of tags to apply to the Security Group of the ASG for the managed node group pool. The key is the tag name and the value is the tag value.

<a name="num_control_plane_vpc_subnet_ids" className="snap-top"></a>

* [**`num_control_plane_vpc_subnet_ids`**](#num_control_plane_vpc_subnet_ids) &mdash; Number of subnets provided in the [`control_plane_vpc_subnet_ids`](#control_plane_vpc_subnet_ids) variable. When null (default), this is computed dynamically from the list. This is used to workaround terraform limitations where resource count and [`for_each`](#for_each) can not depend on dynamic resources (e.g., if you are creating the subnets and the EKS cluster in the same module).

<a name="num_worker_vpc_subnet_ids" className="snap-top"></a>

* [**`num_worker_vpc_subnet_ids`**](#num_worker_vpc_subnet_ids) &mdash; Number of subnets provided in the [`worker_vpc_subnet_ids`](#worker_vpc_subnet_ids) variable. When null (default), this is computed dynamically from the list. This is used to workaround terraform limitations where resource count and [`for_each`](#for_each) can not depend on dynamic resources (e.g., if you are creating the subnets and the EKS cluster in the same module).

<a name="schedule_control_plane_services_on_fargate" className="snap-top"></a>

* [**`schedule_control_plane_services_on_fargate`**](#schedule_control_plane_services_on_fargate) &mdash; When true, configures control plane services to run on Fargate so that the cluster can run without worker nodes. If true, requires kubergrunt to be available on the system, and [`create_default_fargate_iam_role`](#create_default_fargate_iam_role) be set to true.

<a name="secret_envelope_encryption_kms_key_arn" className="snap-top"></a>

* [**`secret_envelope_encryption_kms_key_arn`**](#secret_envelope_encryption_kms_key_arn) &mdash; ARN for KMS Key to use for envelope encryption of Kubernetes Secrets. By default Secrets in EKS are encrypted at rest at the EBS layer in the managed etcd cluster using shared AWS managed keys. Setting this variable will configure Kubernetes to use envelope encryption to encrypt Secrets using this KMS key on top of the EBS layer encryption.

<a name="should_create_control_plane_cloudwatch_log_group" className="snap-top"></a>

* [**`should_create_control_plane_cloudwatch_log_group`**](#should_create_control_plane_cloudwatch_log_group) &mdash; When true, precreate the CloudWatch Log Group to use for EKS control plane logging. This is useful if you wish to customize the CloudWatch Log Group with various settings such as retention periods and KMS encryption. When false, EKS will automatically create a basic log group to use. Note that logs are only streamed to this group if [`enabled_cluster_log_types`](#enabled_cluster_log_types) is true.

<a name="ssh_grunt_iam_group" className="snap-top"></a>

* [**`ssh_grunt_iam_group`**](#ssh_grunt_iam_group) &mdash; If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the EKS workers. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).

<a name="ssh_grunt_iam_group_sudo" className="snap-top"></a>

* [**`ssh_grunt_iam_group_sudo`**](#ssh_grunt_iam_group_sudo) &mdash; If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the EKS workers with sudo permissions. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).

<a name="tenancy" className="snap-top"></a>

* [**`tenancy`**](#tenancy) &mdash; The tenancy of this server. Must be one of: default, dedicated, or host.

<a name="use_exec_plugin_for_auth" className="snap-top"></a>

* [**`use_exec_plugin_for_auth`**](#use_exec_plugin_for_auth) &mdash; If this variable is set to true, then use an exec-based plugin to authenticate and fetch tokens for EKS. This is useful because EKS clusters use short-lived authentication tokens that can expire in the middle of an 'apply' or 'destroy', and since the native Kubernetes provider in Terraform doesn't have a way to fetch up-to-date tokens, we recommend using an exec-based provider as a workaround. Use the [`use_kubergrunt_to_fetch_token`](#use_kubergrunt_to_fetch_token) input variable to control whether kubergrunt or aws is used to fetch tokens.

<a name="use_kubergrunt_sync_components" className="snap-top"></a>

* [**`use_kubergrunt_sync_components`**](#use_kubergrunt_sync_components) &mdash; When set to true, this will enable kubergrunt based component syncing. This step ensures that the core EKS components that are installed are upgraded to a matching version everytime the cluster's Kubernetes version is updated.

<a name="use_kubergrunt_to_fetch_token" className="snap-top"></a>

* [**`use_kubergrunt_to_fetch_token`**](#use_kubergrunt_to_fetch_token) &mdash; EKS clusters use short-lived authentication tokens that can expire in the middle of an 'apply' or 'destroy'. To avoid this issue, we use an exec-based plugin to fetch an up-to-date token. If this variable is set to true, we'll use kubergrunt to fetch the token (in which case, kubergrunt must be installed and on PATH); if this variable is set to false, we'll use the aws CLI to fetch the token (in which case, aws must be installed and on PATH). Note this functionality is only enabled if [`use_exec_plugin_for_auth`](#use_exec_plugin_for_auth) is set to true.

<a name="use_kubergrunt_verification" className="snap-top"></a>

* [**`use_kubergrunt_verification`**](#use_kubergrunt_verification) &mdash; When set to true, this will enable kubergrunt verification to wait for the Kubernetes API server to come up before completing. If false, reverts to a 30 second timed wait instead.

<a name="use_vpc_cni_customize_script" className="snap-top"></a>

* [**`use_vpc_cni_customize_script`**](#use_vpc_cni_customize_script) &mdash; When set to true, this will enable management of the aws-vpc-cni configuration options using kubergrunt running as a local-exec provisioner. If you set this to false, the [`vpc_cni_`](#vpc_cni_)* variables will be ignored.

<a name="vpc_cni_enable_prefix_delegation" className="snap-top"></a>

* [**`vpc_cni_enable_prefix_delegation`**](#vpc_cni_enable_prefix_delegation) &mdash; When true, enable prefix delegation mode for the AWS VPC CNI component of the EKS cluster. In prefix delegation mode, each ENI will be allocated 16 IP addresses (/28) instead of 1, allowing you to pack more Pods per node. Note that by default, AWS VPC CNI will always preallocate 1 full prefix - this means that you can potentially take up 32 IP addresses from the VPC network space even if you only have 1 Pod on the node. You can tweak this behavior by configuring the [`vpc_cni_warm_ip_target`](#vpc_cni_warm_ip_target) input variable.

<a name="vpc_cni_minimum_ip_target" className="snap-top"></a>

* [**`vpc_cni_minimum_ip_target`**](#vpc_cni_minimum_ip_target) &mdash; The minimum number of IP addresses (free and used) each node should start with. When null, defaults to the aws-vpc-cni application setting (currently 16 as of version 1.9.0). For example, if this is set to 25, every node will allocate 2 prefixes (32 IP addresses). On the other hand, if this was set to the default value, then each node will allocate only 1 prefix (16 IP addresses).

<a name="vpc_cni_warm_ip_target" className="snap-top"></a>

* [**`vpc_cni_warm_ip_target`**](#vpc_cni_warm_ip_target) &mdash; The number of free IP addresses each node should maintain. When null, defaults to the aws-vpc-cni application setting (currently 16 as of version 1.9.0). In prefix delegation mode, determines whether the node will preallocate another full prefix. For example, if this is set to 5 and a node is currently has 9 Pods scheduled, then the node will NOT preallocate a new prefix block of 16 IP addresses. On the other hand, if this was set to the default value, then the node will allocate a new block when the first pod is scheduled.

<a name="vpc_id" className="snap-top"></a>

* [**`vpc_id`**](#vpc_id) &mdash; ID of the VPC where the EKS resources will be deployed.

<a name="worker_iam_role_arns_for_k8s_role_mapping" className="snap-top"></a>

* [**`worker_iam_role_arns_for_k8s_role_mapping`**](#worker_iam_role_arns_for_k8s_role_mapping) &mdash; List of ARNs of AWS IAM roles corresponding to EC2 instances that should be mapped as Kubernetes Nodes.

<a name="worker_name_prefix" className="snap-top"></a>

* [**`worker_name_prefix`**](#worker_name_prefix) &mdash; Prefix EKS worker resource names with this string. When you have multiple worker groups for the cluster, you can use this to namespace the resources. Defaults to empty string so that resource names are not excessively long by default.

<a name="worker_vpc_subnet_ids" className="snap-top"></a>

* [**`worker_vpc_subnet_ids`**](#worker_vpc_subnet_ids) &mdash; A list of the subnets into which the EKS Cluster's administrative pods will be launched. These should usually be all private subnets and include one in each AWS Availability Zone. Required when [`schedule_control_plane_services_on_fargate`](#schedule_control_plane_services_on_fargate) is true.

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="aws_auth_merger_namespace" className="snap-top"></a>

* [**`aws_auth_merger_namespace`**](#aws_auth_merger_namespace) &mdash; The namespace name for the aws-auth-merger add on, if created.

<a name="eks_cluster_arn" className="snap-top"></a>

* [**`eks_cluster_arn`**](#eks_cluster_arn) &mdash; The ARN of the EKS cluster that was deployed.

<a name="eks_cluster_name" className="snap-top"></a>

* [**`eks_cluster_name`**](#eks_cluster_name) &mdash; The name of the EKS cluster that was deployed.

<a name="eks_default_fargate_execution_role_arn" className="snap-top"></a>

* [**`eks_default_fargate_execution_role_arn`**](#eks_default_fargate_execution_role_arn) &mdash; A basic IAM Role ARN that has the minimal permissions to pull images from ECR that can be used for most Pods as Fargate Execution Role that do not need to interact with AWS.

<a name="eks_iam_role_for_service_accounts_config" className="snap-top"></a>

* [**`eks_iam_role_for_service_accounts_config`**](#eks_iam_role_for_service_accounts_config) &mdash; Configuration for using the IAM role with Service Accounts feature to provide permissions to the applications. This outputs a map with two properties: [``openid_connect_provider_arn`](#`openid_connect_provider_arn)` and [``openid_connect_provider_url`](#`openid_connect_provider_url)`. The [``openid_connect_provider_arn`](#`openid_connect_provider_arn)` is the ARN of the OpenID Connect Provider for EKS to retrieve IAM credentials, while [``openid_connect_provider_url`](#`openid_connect_provider_url)` is the URL.

<a name="eks_kubeconfig" className="snap-top"></a>

* [**`eks_kubeconfig`**](#eks_kubeconfig) &mdash; Minimal configuration for kubectl to authenticate with the created EKS cluster.

<a name="eks_worker_asg_names" className="snap-top"></a>

* [**`eks_worker_asg_names`**](#eks_worker_asg_names) &mdash; The list of names of the ASGs that were deployed to act as EKS workers.

<a name="managed_node_group_worker_iam_role_arn" className="snap-top"></a>

* [**`managed_node_group_worker_iam_role_arn`**](#managed_node_group_worker_iam_role_arn) &mdash; The ARN of the IAM role associated with the Managed Node Group EKS workers.

<a name="managed_node_group_worker_iam_role_name" className="snap-top"></a>

* [**`managed_node_group_worker_iam_role_name`**](#managed_node_group_worker_iam_role_name) &mdash; The name of the IAM role associated with the Managed Node Group EKS workers.

<a name="managed_node_group_worker_shared_security_group_id" className="snap-top"></a>

* [**`managed_node_group_worker_shared_security_group_id`**](#managed_node_group_worker_shared_security_group_id) &mdash; The ID of the common AWS Security Group associated with all the managed EKS workers.

<a name="metric_widget_worker_cpu_usage" className="snap-top"></a>

* [**`metric_widget_worker_cpu_usage`**](#metric_widget_worker_cpu_usage) &mdash; A CloudWatch Dashboard widget that graphs CPU usage (percentage) of the EKS workers (self-managed and managed node groups).

<a name="metric_widget_worker_disk_usage" className="snap-top"></a>

* [**`metric_widget_worker_disk_usage`**](#metric_widget_worker_disk_usage) &mdash; A CloudWatch Dashboard widget that graphs disk usage (percentage) of the EKS workers (self-managed and managed node groups).

<a name="metric_widget_worker_memory_usage" className="snap-top"></a>

* [**`metric_widget_worker_memory_usage`**](#metric_widget_worker_memory_usage) &mdash; A CloudWatch Dashboard widget that graphs memory usage (percentage) of the EKS workers (self-managed and managed node groups).

<a name="self_managed_worker_iam_role_arn" className="snap-top"></a>

* [**`self_managed_worker_iam_role_arn`**](#self_managed_worker_iam_role_arn) &mdash; The ARN of the IAM role associated with the self-managed EKS workers.

<a name="self_managed_worker_iam_role_name" className="snap-top"></a>

* [**`self_managed_worker_iam_role_name`**](#self_managed_worker_iam_role_name) &mdash; The name of the IAM role associated with the self-managed EKS workers.

<a name="self_managed_worker_security_group_id" className="snap-top"></a>

* [**`self_managed_worker_security_group_id`**](#self_managed_worker_security_group_id) &mdash; The ID of the AWS Security Group associated with the self-managed EKS workers.

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"ba8cab569c745c035f118df557a52df9"}
##DOCS-SOURCER-END -->
