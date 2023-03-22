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
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.102.2" lastModifiedVersion="0.100.0"/>

# Amazon EKS


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.102.2/modules/services/eks-cluster" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=services%2Feks-cluster" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

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

*   [modules](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.102.2/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.
*   [examples](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.102.2/examples): This folder contains working examples of how to use the submodules.
*   [test](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.102.2/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.102.2/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.102.2/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

*   [How to deploy a production-grade Kubernetes cluster on AWS](https://docs.gruntwork.io/guides/build-it-yourself/kubernetes-cluster/deployment-walkthrough/pre-requisites):
    A step-by-step guide for deploying a production-grade EKS cluster on AWS using the code in this repo.

## Manage

For information on how to manage your EKS cluster, including how to deploy Pods on Fargate, how to associate IAM roles
to Pod, how to upgrade your EKS cluster, and more, see the documentation in the
[terraform-aws-eks](https://github.com/gruntwork-io/terraform-aws-eks) repo.

To add and manage additional worker groups, refer to the [eks-workers module](/reference/services/app-orchestration/amazon-eks-workers).

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="allow_inbound_api_access_from_cidr_blocks" requirement="required" type="list(string)">
<HclListItemDescription>

The list of CIDR blocks to allow inbound access to the Kubernetes API.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_name" requirement="required" type="string">
<HclListItemDescription>

The name of the EKS cluster

</HclListItemDescription>
</HclListItem>

<HclListItem name="control_plane_vpc_subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

List of IDs of the subnets that can be used for the EKS Control Plane.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

ID of the VPC where the EKS resources will be deployed.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="additional_security_groups_for_control_plane" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of additional security group IDs to attach to the control plane.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="additional_security_groups_for_workers" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of additional security group IDs to attach to the worker nodes.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="alarms_sns_topic_arn" requirement="optional" type="list(string)">
<HclListItemDescription>

The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_inbound_ssh_from_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

The list of CIDR blocks to allow inbound SSH access to the worker groups.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_inbound_ssh_from_security_groups" requirement="optional" type="list(string)">
<HclListItemDescription>

The list of security group IDs to allow inbound SSH access to the worker groups.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_private_api_access_from_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

The list of CIDR blocks to allow inbound access to the private Kubernetes API endpoint (e.g. the endpoint within the VPC, not the public endpoint).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_private_api_access_from_security_groups" requirement="optional" type="list(string)">
<HclListItemDescription>

The list of security groups to allow inbound access to the private Kubernetes API endpoint (e.g. the endpoint within the VPC, not the public endpoint).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="asg_default_enable_detailed_monitoring" requirement="optional" type="bool">
<HclListItemDescription>

Default value for enable_detailed_monitoring field of autoscaling_group_configurations.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="asg_default_http_put_response_hop_limit" requirement="optional" type="number">
<HclListItemDescription>

Default value for the http_put_response_hop_limit field of autoscaling_group_configurations.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="asg_default_instance_root_volume_encryption" requirement="optional" type="bool">
<HclListItemDescription>

Default value for the asg_instance_root_volume_encryption field of autoscaling_group_configurations. Any map entry that does not specify asg_instance_root_volume_encryption will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="asg_default_instance_root_volume_iops" requirement="optional" type="number">
<HclListItemDescription>

Default value for the asg_instance_root_volume_iops field of autoscaling_group_configurations. Any map entry that does not specify asg_instance_root_volume_iops will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="asg_default_instance_root_volume_size" requirement="optional" type="number">
<HclListItemDescription>

Default value for the asg_instance_root_volume_size field of autoscaling_group_configurations. Any map entry that does not specify asg_instance_root_volume_size will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="40"/>
</HclListItem>

<HclListItem name="asg_default_instance_root_volume_throughput" requirement="optional" type="number">
<HclListItemDescription>

Default value for the asg_instance_root_volume_throughput field of autoscaling_group_configurations. Any map entry that does not specify asg_instance_root_volume_throughput will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="asg_default_instance_root_volume_type" requirement="optional" type="string">
<HclListItemDescription>

Default value for the asg_instance_root_volume_type field of autoscaling_group_configurations. Any map entry that does not specify asg_instance_root_volume_type will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;standard&quot;"/>
</HclListItem>

<HclListItem name="asg_default_instance_type" requirement="optional" type="string">
<HclListItemDescription>

Default value for the asg_instance_type field of autoscaling_group_configurations. Any map entry that does not specify asg_instance_type will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;t3.medium&quot;"/>
</HclListItem>

<HclListItem name="asg_default_max_pods_allowed" requirement="optional" type="number">
<HclListItemDescription>

Default value for the max_pods_allowed field of autoscaling_group_configurations. Any map entry that does not specify max_pods_allowed will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="asg_default_max_size" requirement="optional" type="number">
<HclListItemDescription>

Default value for the max_size field of autoscaling_group_configurations. Any map entry that does not specify max_size will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="2"/>
</HclListItem>

<HclListItem name="asg_default_min_size" requirement="optional" type="number">
<HclListItemDescription>

Default value for the min_size field of autoscaling_group_configurations. Any map entry that does not specify min_size will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="asg_default_multi_instance_overrides" requirement="optional" type="any">
<HclListItemDescription>

Default value for the multi_instance_overrides field of autoscaling_group_configurations. Any map entry that does not specify multi_instance_overrides will use this value.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="asg_default_on_demand_allocation_strategy" requirement="optional" type="string">
<HclListItemDescription>

Default value for the on_demand_allocation_strategy field of autoscaling_group_configurations. Any map entry that does not specify on_demand_allocation_strategy will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="asg_default_on_demand_base_capacity" requirement="optional" type="number">
<HclListItemDescription>

Default value for the on_demand_base_capacity field of autoscaling_group_configurations. Any map entry that does not specify on_demand_base_capacity will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="asg_default_on_demand_percentage_above_base_capacity" requirement="optional" type="number">
<HclListItemDescription>

Default value for the on_demand_percentage_above_base_capacity field of autoscaling_group_configurations. Any map entry that does not specify on_demand_percentage_above_base_capacity will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="asg_default_spot_allocation_strategy" requirement="optional" type="string">
<HclListItemDescription>

Default value for the spot_allocation_strategy field of autoscaling_group_configurations. Any map entry that does not specify spot_allocation_strategy will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="asg_default_spot_instance_pools" requirement="optional" type="number">
<HclListItemDescription>

Default value for the spot_instance_pools field of autoscaling_group_configurations. Any map entry that does not specify spot_instance_pools will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="asg_default_spot_max_price" requirement="optional" type="string">
<HclListItemDescription>

Default value for the spot_max_price field of autoscaling_group_configurations. Any map entry that does not specify spot_max_price will use this value. Set to empty string (default) to mean on-demand price.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="asg_default_tags" requirement="optional" type="list(object(…))">
<HclListItemDescription>

Default value for the tags field of autoscaling_group_configurations. Any map entry that does not specify tags will use this value.

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

<HclListItem name="asg_default_use_multi_instances_policy" requirement="optional" type="bool">
<HclListItemDescription>

Default value for the use_multi_instances_policy field of autoscaling_group_configurations. Any map entry that does not specify use_multi_instances_policy will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="asg_iam_instance_profile_name" requirement="optional" type="string">
<HclListItemDescription>

Custom name for the IAM instance profile for the Self-managed workers. When null, the IAM role name will be used. If <a href="#asg_use_resource_name_prefix"><code>asg_use_resource_name_prefix</code></a> is true, this will be used as a name prefix.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="asg_iam_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

ARN of a permission boundary to apply on the IAM role created for the self managed workers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="asg_security_group_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the Security Group of the ASG for the self managed worker pool. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="asg_use_resource_name_prefix" requirement="optional" type="bool">
<HclListItemDescription>

When true, all the relevant resources for self managed workers will be set to use the name_prefix attribute so that unique names are generated for them. This allows those resources to support recreation through create_before_destroy lifecycle rules. Set to false if you were using any version before 0.65.0 and wish to avoid recreating the entire worker pool on your cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="autoscaling_group_configurations" requirement="optional" type="any">
<HclListItemDescription>

Configure one or more Auto Scaling Groups (ASGs) to manage the EC2 instances in this cluster. If any of the values are not provided, the specified default variable will be used to lookup a default value.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="autoscaling_group_include_autoscaler_discovery_tags" requirement="optional" type="bool">
<HclListItemDescription>

Adds additional tags to each ASG that allow a cluster autoscaler to auto-discover them.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="aws_auth_merger_default_configmap_name" requirement="optional" type="string">
<HclListItemDescription>

Name of the default aws-auth ConfigMap to use. This will be the name of the ConfigMap that gets created by this module in the aws-auth-merger namespace to seed the initial aws-auth ConfigMap.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;main-aws-auth&quot;"/>
</HclListItem>

<HclListItem name="aws_auth_merger_image" requirement="optional" type="object(…)">
<HclListItemDescription>

Location of the container image to use for the aws-auth-merger app. You can use the Dockerfile provided in terraform-aws-eks to construct an image. See https://github.com/gruntwork-io/terraform-aws-eks/blob/master/modules/eks-aws-auth-merger/core-concepts.md#how-do-i-use-the-aws-auth-merger for more info.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # Container image repository where the aws-auth-merger app container image lives
    repo = string
    # Tag of the aws-auth-merger container to deploy
    tag = string
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="aws_auth_merger_namespace" requirement="optional" type="string">
<HclListItemDescription>

Namespace to deploy the aws-auth-merger into. The app will watch for ConfigMaps in this Namespace to merge into the aws-auth ConfigMap.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;aws-auth-merger&quot;"/>
</HclListItem>

<HclListItem name="cloud_init_parts" requirement="optional" type="map(object(…))">
<HclListItemDescription>

Cloud init scripts to run on the EKS worker nodes when it is booting. See the part blocks in https://www.terraform.io/docs/providers/template/d/cloudinit_config.html for syntax. To override the default boot script installed as part of the module, use the key `default`.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    # A filename to report in the header for the part. Should be unique across all cloud-init parts.
    filename = string

    # A MIME-style content type to report in the header for the part. For example, use "text/x-shellscript" for a shell
    # script.
    content_type = string

    # The contents of the boot script to be called. This should be the full text of the script as a raw string.
    content = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="cluster_iam_role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

ARN of permissions boundary to apply to the cluster IAM role - the IAM role created for the EKS cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_instance_ami" requirement="optional" type="string">
<HclListItemDescription>

The AMI to run on each instance in the EKS cluster. You can build the AMI using the Packer template eks-node-al2.json. One of <a href="#cluster_instance_ami"><code>cluster_instance_ami</code></a> or <a href="#cluster_instance_ami_filters"><code>cluster_instance_ami_filters</code></a> is required. Only used if <a href="#cluster_instance_ami_filters"><code>cluster_instance_ami_filters</code></a> is null. Set to null if cluster_instance_ami_filters is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_instance_ami_filters" requirement="optional" type="object(…)">
<HclListItemDescription>

Properties on the AMI that can be used to lookup a prebuilt AMI for use with self managed workers. You can build the AMI using the Packer template eks-node-al2.json. One of <a href="#cluster_instance_ami"><code>cluster_instance_ami</code></a> or <a href="#cluster_instance_ami_filters"><code>cluster_instance_ami_filters</code></a> is required. If both are defined, <a href="#cluster_instance_ami_filters"><code>cluster_instance_ami_filters</code></a> will be used. Set to null if cluster_instance_ami is set.

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
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_instance_associate_public_ip_address" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to associate a public IP address to the instances of the self managed ASGs. Will only work if the instances are launched in a public subnet.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="cluster_instance_keypair_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the Key Pair that can be used to SSH to each instance in the EKS cluster

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="control_plane_cloudwatch_log_group_kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for encrypting log data in the CloudWatch log group for EKS control plane logs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="control_plane_cloudwatch_log_group_retention_in_days" requirement="optional" type="number">
<HclListItemDescription>

The number of days to retain log events in the CloudWatch log group for EKS control plane logs. Refer to https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days for all the valid values. When null, the log events are retained forever.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="control_plane_cloudwatch_log_group_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags to apply on the CloudWatch Log Group for EKS control plane logs, encoded as a map where the keys are tag keys and values are tag values.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="control_plane_disallowed_availability_zones" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of availability zones in the region that we CANNOT use to deploy the EKS control plane. You can use this to avoid availability zones that may not be able to provision the resources (e.g ran out of capacity). If empty, will allow all availability zones.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[
  &quot;us-east-1e&quot;
]"/>
</HclListItem>

<HclListItem name="create_default_fargate_iam_role" requirement="optional" type="bool">
<HclListItemDescription>

When true, IAM role will be created and attached to Fargate control plane services.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="custom_default_fargate_iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

The name to use for the default Fargate execution IAM role that is created when create_default_fargate_iam_role is true. When null, defaults to CLUSTER_NAME-fargate-role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_worker_egress_security_group_rules" requirement="optional" type="map(object(…))">
<HclListItemDescription>

A map of unique identifiers to egress security group rules to attach to the worker groups.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    # The network ports and protocol (tcp, udp, all) for which the security group rule applies to.
    from_port = number
    to_port   = number
    protocol  = string

    # The target of the traffic. Only one of the following can be defined; the others must be configured to null.
    target_security_group_id = string       # The ID of the security group to which the traffic goes to.
    cidr_blocks              = list(string) # The list of IP CIDR blocks to which the traffic goes to.
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="custom_worker_ingress_security_group_rules" requirement="optional" type="map(object(…))">
<HclListItemDescription>

A map of unique identifiers to ingress security group rules to attach to the worker groups.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    # The network ports and protocol (tcp, udp, all) for which the security group rule applies to.
    from_port = number
    to_port   = number
    protocol  = string

    # The source of the traffic. Only one of the following can be defined; the others must be configured to null.
    source_security_group_id = string       # The ID of the security group from which the traffic originates from.
    cidr_blocks              = list(string) # The list of IP CIDR blocks from which the traffic originates from.
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="dashboard_cpu_usage_widget_parameters" requirement="optional" type="object(…)">
<HclListItemDescription>

Parameters for the worker cpu usage widget to output for use in a CloudWatch dashboard.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # The period in seconds for metrics to sample across.
    period = number

    # The width and height of the widget in grid units in a 24 column grid. E.g., a value of 12 will take up half the
    # space.
    width  = number
    height = number
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
{
  height = 6,
  period = 60,
  width = 8
}
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="dashboard_disk_usage_widget_parameters" requirement="optional" type="object(…)">
<HclListItemDescription>

Parameters for the worker disk usage widget to output for use in a CloudWatch dashboard.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # The period in seconds for metrics to sample across.
    period = number

    # The width and height of the widget in grid units in a 24 column grid. E.g., a value of 12 will take up half the
    # space.
    width  = number
    height = number
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
{
  height = 6,
  period = 60,
  width = 8
}
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="dashboard_memory_usage_widget_parameters" requirement="optional" type="object(…)">
<HclListItemDescription>

Parameters for the worker memory usage widget to output for use in a CloudWatch dashboard.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # The period in seconds for metrics to sample across.
    period = number

    # The width and height of the widget in grid units in a 24 column grid. E.g., a value of 12 will take up half the
    # space.
    width  = number
    height = number
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
{
  height = 6,
  period = 60,
  width = 8
}
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="eks_addons" requirement="optional" type="any">
<HclListItemDescription>

Map of EKS add-ons, where key is name of the add-on and value is a map of add-on properties.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="eks_cluster_security_group_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the Security Group for the EKS Cluster Control Plane. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="eks_cluster_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the EKS Cluster Control Plane. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="enable_aws_auth_merger" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, installs the aws-auth-merger to manage the aws-auth configuration. When true, requires setting the <a href="#aws_auth_merger_image"><code>aws_auth_merger_image</code></a> variable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_aws_auth_merger_fargate" requirement="optional" type="bool">
<HclListItemDescription>

When true, deploy the aws-auth-merger into Fargate. It is recommended to run the aws-auth-merger on Fargate to avoid chicken and egg issues between the aws-auth-merger and having an authenticated worker pool.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_alarms" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using <a href="#alarms_sns_topic_arn"><code>alarms_sns_topic_arn</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_metrics" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to add IAM permissions to send custom metrics to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent to get memory and disk metrics in CloudWatch for your Bastion host.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_eks_addons" requirement="optional" type="bool">
<HclListItemDescription>

When set to true, the module configures EKS add-ons (https://docs.aws.amazon.com/eks/latest/userguide/eks-add-ons.html) specified with `eks_addons`. VPC CNI configurations with `use_vpc_cni_customize_script` isn't fully supported with addons, as the automated add-on lifecycles could potentially undo the configuration changes.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_fail2ban" requirement="optional" type="bool">
<HclListItemDescription>

Enable fail2ban to block brute force log in attempts. Defaults to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_worker_cloudwatch_log_aggregation" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to send worker system logs to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/cloudwatch-log-aggregation-scripts to do log aggregation in CloudWatch. Note that this is only recommended for aggregating system level logs from the server instances. Container logs should be managed through fluent-bit deployed with eks-core-services.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enabled_control_plane_log_types" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of the desired control plane logging to enable. See https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html for the list of available logs.

</HclListItemDescription>
<HclListItemDefaultValue>

```hcl
[
  "api",
  "audit",
  "authenticator"
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="endpoint_public_access" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to enable public API endpoints which allow access to the Kubernetes API from outside of the VPC. Note that private access within the VPC is always enabled.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="external_account_ssh_grunt_role_arn" requirement="optional" type="string">
<HclListItemDescription>

If you are using ssh-grunt and your IAM users / groups are defined in a separate AWS account, you can use this variable to specify the ARN of an IAM role that ssh-grunt can assume to retrieve IAM group and public SSH key info from that account. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="fargate_profile_executor_iam_role_arns_for_k8s_role_mapping" requirement="optional" type="list(string)">
<HclListItemDescription>

List of ARNs of AWS IAM roles corresponding to Fargate Profiles that should be mapped as Kubernetes Nodes.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="fargate_worker_disallowed_availability_zones" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of availability zones in the region that we CANNOT use to deploy the EKS Fargate workers. You can use this to avoid availability zones that may not be able to provision the resources (e.g ran out of capacity). If empty, will allow all availability zones.

</HclListItemDescription>
<HclListItemDefaultValue>

```hcl
[
  "us-east-1d",
  "us-east-1e",
  "ca-central-1d"
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="high_worker_cpu_utilization_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the CPU utilization percentage for the ASG.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="high_worker_cpu_utilization_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the ASG has an average cluster CPU utilization percentage above this threshold.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="90"/>
</HclListItem>

<HclListItem name="high_worker_cpu_utilization_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="high_worker_disk_utilization_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the root disk utilization percentage for the ASG.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="high_worker_disk_utilization_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the ASG has an average cluster root disk utilization percentage above this threshold.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="90"/>
</HclListItem>

<HclListItem name="high_worker_disk_utilization_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="high_worker_memory_utilization_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the Memory utilization percentage for the ASG.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="high_worker_memory_utilization_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the ASG has an average cluster Memory utilization percentage above this threshold.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="90"/>
</HclListItem>

<HclListItem name="high_worker_memory_utilization_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="iam_role_to_rbac_group_mapping" requirement="optional" type="map(list(…))">
<HclListItemDescription>

Mapping of IAM role ARNs to Kubernetes RBAC groups that grant permissions to the user.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(list(string))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="iam_user_to_rbac_group_mapping" requirement="optional" type="map(list(…))">
<HclListItemDescription>

Mapping of IAM user ARNs to Kubernetes RBAC groups that grant permissions to the user.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(list(string))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="kubergrunt_download_url" requirement="optional" type="string">
<HclListItemDescription>

The URL from which to download Kubergrunt if it's not installed already. Use to specify a version of kubergrunt that is compatible with your specified kubernetes version. Ex. 'https://github.com/gruntwork-io/kubergrunt/releases/download/v0.10.0/kubergrunt'

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;https://github.com/gruntwork-io/kubergrunt/releases/download/v0.10.0/kubergrunt&quot;"/>
</HclListItem>

<HclListItem name="kubernetes_version" requirement="optional" type="string">
<HclListItemDescription>

Version of Kubernetes to use. Refer to EKS docs for list of available versions (https://docs.aws.amazon.com/eks/latest/userguide/platform-versions.html).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;1.24&quot;"/>
</HclListItem>

<HclListItem name="managed_node_group_configurations" requirement="optional" type="any">
<HclListItemDescription>

Configure one or more Node Groups to manage the EC2 instances in this cluster. Set to empty object ({}) if you do not wish to configure managed node groups.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="node_group_default_capacity_type" requirement="optional" type="string">
<HclListItemDescription>

Default value for capacity_type field of managed_node_group_configurations.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ON_DEMAND&quot;"/>
</HclListItem>

<HclListItem name="node_group_default_desired_size" requirement="optional" type="number">
<HclListItemDescription>

Default value for desired_size field of managed_node_group_configurations.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="node_group_default_enable_detailed_monitoring" requirement="optional" type="bool">
<HclListItemDescription>

Default value for enable_detailed_monitoring field of managed_node_group_configurations.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="node_group_default_http_put_response_hop_limit" requirement="optional" type="number">
<HclListItemDescription>

Default value for http_put_response_hop_limit field of managed_node_group_configurations. Any map entry that does not specify http_put_response_hop_limit will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="node_group_default_instance_root_volume_encryption" requirement="optional" type="bool">
<HclListItemDescription>

Default value for the instance_root_volume_encryption field of managed_node_group_configurations.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="node_group_default_instance_root_volume_size" requirement="optional" type="number">
<HclListItemDescription>

Default value for the instance_root_volume_size field of managed_node_group_configurations.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="40"/>
</HclListItem>

<HclListItem name="node_group_default_instance_root_volume_type" requirement="optional" type="string">
<HclListItemDescription>

Default value for the instance_root_volume_type field of managed_node_group_configurations.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;gp3&quot;"/>
</HclListItem>

<HclListItem name="node_group_default_instance_types" requirement="optional" type="list(string)">
<HclListItemDescription>

Default value for instance_types field of managed_node_group_configurations.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="node_group_default_labels" requirement="optional" type="map(string)">
<HclListItemDescription>

Default value for labels field of managed_node_group_configurations. Unlike common_labels which will always be merged in, these labels are only used if the labels field is omitted from the configuration.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="node_group_default_max_pods_allowed" requirement="optional" type="number">
<HclListItemDescription>

Default value for the max_pods_allowed field of managed_node_group_configurations. Any map entry that does not specify max_pods_allowed will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="node_group_default_max_size" requirement="optional" type="number">
<HclListItemDescription>

Default value for max_size field of managed_node_group_configurations.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="node_group_default_min_size" requirement="optional" type="number">
<HclListItemDescription>

Default value for min_size field of managed_node_group_configurations.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="node_group_default_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

Default value for subnet_ids field of managed_node_group_configurations.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="node_group_default_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Default value for tags field of managed_node_group_configurations. Unlike common_tags which will always be merged in, these tags are only used if the tags field is omitted from the configuration.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="node_group_default_taints" requirement="optional" type="list(map(…))">
<HclListItemDescription>

Default value for taint field of node_group_configurations. These taints are only used if the taint field is omitted from the configuration.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(map(string))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="node_group_iam_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

ARN of a permission boundary to apply on the IAM role created for the managed node groups.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="node_group_launch_template_instance_type" requirement="optional" type="string">
<HclListItemDescription>

The instance type to configure in the launch template. This value will be used when the instance_types field is set to null (NOT omitted, in which case <a href="#node_group_default_instance_types"><code>node_group_default_instance_types</code></a> will be used).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="node_group_mirror_tags_to_asg" requirement="optional" type="bool">
<HclListItemDescription>

Tags assigned to a node group are mirrored to the underlaying autoscaling group by default. If you want to disable this behaviour, set this flag to false. Note that this assumes that there is a one-to-one mappping between ASGs and Node Groups. If there is more than one ASG mapped to the Node Group, then this will only apply the tags on the first one. Due to a limitation in Terraform for_each where it can not depend on dynamic data, it is currently not possible in the module to map the tags to all ASGs. If you wish to apply the tags to all underlying ASGs, then it is recommended to call the aws_autoscaling_group_tag resource in a separate terraform state file outside of this module, or use a two-stage apply process.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="node_group_security_group_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the Security Group of the ASG for the managed node group pool. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="num_control_plane_vpc_subnet_ids" requirement="optional" type="number">
<HclListItemDescription>

Number of subnets provided in the <a href="#control_plane_vpc_subnet_ids"><code>control_plane_vpc_subnet_ids</code></a> variable. When null (default), this is computed dynamically from the list. This is used to workaround terraform limitations where resource count and for_each can not depend on dynamic resources (e.g., if you are creating the subnets and the EKS cluster in the same module).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="num_worker_vpc_subnet_ids" requirement="optional" type="number">
<HclListItemDescription>

Number of subnets provided in the <a href="#worker_vpc_subnet_ids"><code>worker_vpc_subnet_ids</code></a> variable. When null (default), this is computed dynamically from the list. This is used to workaround terraform limitations where resource count and for_each can not depend on dynamic resources (e.g., if you are creating the subnets and the EKS cluster in the same module).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="schedule_control_plane_services_on_fargate" requirement="optional" type="bool">
<HclListItemDescription>

When true, configures control plane services to run on Fargate so that the cluster can run without worker nodes. If true, requires kubergrunt to be available on the system, and create_default_fargate_iam_role be set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="secret_envelope_encryption_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

ARN for KMS Key to use for envelope encryption of Kubernetes Secrets. By default Secrets in EKS are encrypted at rest at the EBS layer in the managed etcd cluster using shared AWS managed keys. Setting this variable will configure Kubernetes to use envelope encryption to encrypt Secrets using this KMS key on top of the EBS layer encryption.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="should_create_control_plane_cloudwatch_log_group" requirement="optional" type="bool">
<HclListItemDescription>

When true, precreate the CloudWatch Log Group to use for EKS control plane logging. This is useful if you wish to customize the CloudWatch Log Group with various settings such as retention periods and KMS encryption. When false, EKS will automatically create a basic log group to use. Note that logs are only streamed to this group if <a href="#enabled_cluster_log_types"><code>enabled_cluster_log_types</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="ssh_grunt_iam_group" requirement="optional" type="string">
<HclListItemDescription>

If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the EKS workers. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ssh-grunt-users&quot;"/>
</HclListItem>

<HclListItem name="ssh_grunt_iam_group_sudo" requirement="optional" type="string">
<HclListItemDescription>

If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the EKS workers with sudo permissions. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ssh-grunt-sudo-users&quot;"/>
</HclListItem>

<HclListItem name="tenancy" requirement="optional" type="string">
<HclListItemDescription>

The tenancy of this server. Must be one of: default, dedicated, or host.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;default&quot;"/>
</HclListItem>

<HclListItem name="use_exec_plugin_for_auth" requirement="optional" type="bool">
<HclListItemDescription>

If this variable is set to true, then use an exec-based plugin to authenticate and fetch tokens for EKS. This is useful because EKS clusters use short-lived authentication tokens that can expire in the middle of an 'apply' or 'destroy', and since the native Kubernetes provider in Terraform doesn't have a way to fetch up-to-date tokens, we recommend using an exec-based provider as a workaround. Use the use_kubergrunt_to_fetch_token input variable to control whether kubergrunt or aws is used to fetch tokens.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="use_imdsv1" requirement="optional" type="bool">
<HclListItemDescription>

Set this variable to true to enable the use of Instance Metadata Service Version 1 in this module's aws_launch_template. Note that while IMDsv2 is preferred due to its special security hardening, we allow this in order to support the use case of AMIs built outside of these modules that depend on IMDSv1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="use_kubergrunt_sync_components" requirement="optional" type="bool">
<HclListItemDescription>

When set to true, this will enable kubergrunt based component syncing. This step ensures that the core EKS components that are installed are upgraded to a matching version everytime the cluster's Kubernetes version is updated.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="use_kubergrunt_to_fetch_token" requirement="optional" type="bool">
<HclListItemDescription>

EKS clusters use short-lived authentication tokens that can expire in the middle of an 'apply' or 'destroy'. To avoid this issue, we use an exec-based plugin to fetch an up-to-date token. If this variable is set to true, we'll use kubergrunt to fetch the token (in which case, kubergrunt must be installed and on PATH); if this variable is set to false, we'll use the aws CLI to fetch the token (in which case, aws must be installed and on PATH). Note this functionality is only enabled if use_exec_plugin_for_auth is set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="use_kubergrunt_verification" requirement="optional" type="bool">
<HclListItemDescription>

When set to true, this will enable kubergrunt verification to wait for the Kubernetes API server to come up before completing. If false, reverts to a 30 second timed wait instead.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="use_managed_iam_policies" requirement="optional" type="bool">
<HclListItemDescription>

When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="use_vpc_cni_customize_script" requirement="optional" type="bool">
<HclListItemDescription>

When set to true, this will enable management of the aws-vpc-cni configuration options using kubergrunt running as a local-exec provisioner. If you set this to false, the vpc_cni_* variables will be ignored.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="vpc_cni_enable_prefix_delegation" requirement="optional" type="bool">
<HclListItemDescription>

When true, enable prefix delegation mode for the AWS VPC CNI component of the EKS cluster. In prefix delegation mode, each ENI will be allocated 16 IP addresses (/28) instead of 1, allowing you to pack more Pods per node. Note that by default, AWS VPC CNI will always preallocate 1 full prefix - this means that you can potentially take up 32 IP addresses from the VPC network space even if you only have 1 Pod on the node. You can tweak this behavior by configuring the <a href="#vpc_cni_warm_ip_target"><code>vpc_cni_warm_ip_target</code></a> input variable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="vpc_cni_minimum_ip_target" requirement="optional" type="number">
<HclListItemDescription>

The minimum number of IP addresses (free and used) each node should start with. When null, defaults to the aws-vpc-cni application setting (currently 16 as of version 1.9.0). For example, if this is set to 25, every node will allocate 2 prefixes (32 IP addresses). On the other hand, if this was set to the default value, then each node will allocate only 1 prefix (16 IP addresses).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="vpc_cni_warm_ip_target" requirement="optional" type="number">
<HclListItemDescription>

The number of free IP addresses each node should maintain. When null, defaults to the aws-vpc-cni application setting (currently 16 as of version 1.9.0). In prefix delegation mode, determines whether the node will preallocate another full prefix. For example, if this is set to 5 and a node is currently has 9 Pods scheduled, then the node will NOT preallocate a new prefix block of 16 IP addresses. On the other hand, if this was set to the default value, then the node will allocate a new block when the first pod is scheduled.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="worker_cloudwatch_log_group_kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for encrypting worker system log data. Only used if <a href="#enable_worker_cloudwatch_log_aggregation"><code>enable_worker_cloudwatch_log_aggregation</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="worker_cloudwatch_log_group_name" requirement="optional" type="string">
<HclListItemDescription>

Name of the CloudWatch Log Group where worker system logs are reported to. Only used if <a href="#enable_worker_cloudwatch_log_aggregation"><code>enable_worker_cloudwatch_log_aggregation</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="worker_cloudwatch_log_group_retention_in_days" requirement="optional" type="number">
<HclListItemDescription>

The number of days to retain log events in the worker system logs log group. Refer to https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days for all the valid values. When null, the log events are retained forever. Only used if <a href="#enable_worker_cloudwatch_log_aggregation"><code>enable_worker_cloudwatch_log_aggregation</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="worker_cloudwatch_log_group_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags to apply on the worker system logs CloudWatch Log Group, encoded as a map where the keys are tag keys and values are tag values. Only used if <a href="#enable_worker_cloudwatch_log_aggregation"><code>enable_worker_cloudwatch_log_aggregation</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="worker_iam_role_arns_for_k8s_role_mapping" requirement="optional" type="list(string)">
<HclListItemDescription>

List of ARNs of AWS IAM roles corresponding to EC2 instances that should be mapped as Kubernetes Nodes.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="worker_name_prefix" requirement="optional" type="string">
<HclListItemDescription>

Prefix EKS worker resource names with this string. When you have multiple worker groups for the cluster, you can use this to namespace the resources. Defaults to empty string so that resource names are not excessively long by default.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="worker_vpc_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of the subnets into which the EKS Cluster's administrative pods will be launched. These should usually be all private subnets and include one in each AWS Availability Zone. Required when <a href="#schedule_control_plane_services_on_fargate"><code>schedule_control_plane_services_on_fargate</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="aws_auth_merger_namespace">
<HclListItemDescription>

The namespace name for the aws-auth-merger add on, if created.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_cluster_arn">
<HclListItemDescription>

The ARN of the EKS cluster that was deployed.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_cluster_name">
<HclListItemDescription>

The name of the EKS cluster that was deployed.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_default_fargate_execution_role_arn">
<HclListItemDescription>

A basic IAM Role ARN that has the minimal permissions to pull images from ECR that can be used for most Pods as Fargate Execution Role that do not need to interact with AWS.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_iam_role_for_service_accounts_config">
<HclListItemDescription>

Configuration for using the IAM role with Service Accounts feature to provide permissions to the applications. This outputs a map with two properties: `openid_connect_provider_arn` and `openid_connect_provider_url`. The `openid_connect_provider_arn` is the ARN of the OpenID Connect Provider for EKS to retrieve IAM credentials, while `openid_connect_provider_url` is the URL.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_kubeconfig">
<HclListItemDescription>

Minimal configuration for kubectl to authenticate with the created EKS cluster.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_worker_asg_names">
<HclListItemDescription>

The list of names of the ASGs that were deployed to act as EKS workers.

</HclListItemDescription>
</HclListItem>

<HclListItem name="managed_node_group_worker_iam_role_arn">
<HclListItemDescription>

The ARN of the IAM role associated with the Managed Node Group EKS workers.

</HclListItemDescription>
</HclListItem>

<HclListItem name="managed_node_group_worker_iam_role_name">
<HclListItemDescription>

The name of the IAM role associated with the Managed Node Group EKS workers.

</HclListItemDescription>
</HclListItem>

<HclListItem name="managed_node_group_worker_shared_security_group_id">
<HclListItemDescription>

The ID of the common AWS Security Group associated with all the managed EKS workers.

</HclListItemDescription>
</HclListItem>

<HclListItem name="metric_widget_worker_cpu_usage">
<HclListItemDescription>

A CloudWatch Dashboard widget that graphs CPU usage (percentage) of the EKS workers (self-managed and managed node groups).

</HclListItemDescription>
</HclListItem>

<HclListItem name="metric_widget_worker_disk_usage">
<HclListItemDescription>

A CloudWatch Dashboard widget that graphs disk usage (percentage) of the EKS workers (self-managed and managed node groups).

</HclListItemDescription>
</HclListItem>

<HclListItem name="metric_widget_worker_memory_usage">
<HclListItemDescription>

A CloudWatch Dashboard widget that graphs memory usage (percentage) of the EKS workers (self-managed and managed node groups).

</HclListItemDescription>
</HclListItem>

<HclListItem name="self_managed_worker_iam_role_arn">
<HclListItemDescription>

The ARN of the IAM role associated with the self-managed EKS workers.

</HclListItemDescription>
</HclListItem>

<HclListItem name="self_managed_worker_iam_role_name">
<HclListItemDescription>

The name of the IAM role associated with the self-managed EKS workers.

</HclListItemDescription>
</HclListItem>

<HclListItem name="self_managed_worker_security_group_id">
<HclListItemDescription>

The ID of the AWS Security Group associated with the self-managed EKS workers.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.102.2/modules%2Fservices%2Feks-cluster%2FREADME.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.102.2/modules%2Fservices%2Feks-cluster%2Fvariables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.102.2/modules%2Fservices%2Feks-cluster%2Foutputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "088bbf735421388a08fa298e01769eb5"
}
##DOCS-SOURCER-END -->
