---
type: "service"
name: "Virtual Private Cloud (VPC)"
description: "Deploy a VPC on AWS."
category: "networking"
cloud: "aws"
tags: ["vpc","ec2"]
license: "gruntwork"
built-with: "terraform"
title: "VPC"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';

<VersionBadge version="0.78.1" lastModifiedVersion="0.75.0"/>

# VPC


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/networking/vpc" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=networking%2Fvpc" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

## Overview

This service contains code to deploy a [Virtual Private Cloud (VPC)](https://aws.amazon.com/vpc) on AWS that can be used
for either production or non-production workloads.

![VPC architecture](/img/reference/services/networking/vpc-subnets-diagram.png)

## Features

*   The VPC itself.
*   Subnets, which are isolated subdivisions within the VPC. There are 3 "tiers" of subnets: public, private app, and
    private persistence.
*   Route tables, which provide routing rules for the subnets.
*   Internet Gateways to route traffic to the public Internet from public subnets.
*   NATs to route traffic to the public Internet from private subnets.
*   Optionally, VPC peering to a management VPC
*   Optionally, DNS forwarding for a management VPC
*   Optionally, tags for an EKS cluster

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

Under the hood, this is all implemented using Terraform modules from the Gruntwork
[terraform-aws-vpc](https://github.com/gruntwork-io/terraform-aws-vpc) repo. If you don’t have access to this repo,
email <support@gruntwork.io>.

### Core concepts

To understand core concepts like what’s a VPC, how subnets are configured, how network ACLs work, and more, see the
documentation in the [terraform-aws-vpc](https://github.com/gruntwork-io/terraform-aws-vpc) repo.

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules): The main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.
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
*   [How to deploy a production-grade VPC on AWS](https://docs.gruntwork.io/guides/build-it-yourself/vpc/)
*   [How to configure a production-grade CI/CD workflow for application and infrastructure code](https://docs.gruntwork.io/guides/build-it-yourself/pipelines/):
    step-by-step guide on how to configure CI / CD for your apps and infrastructure.

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<a name="allow_private_persistence_internet_access" className="snap-top"></a>

* [**`allow_private_persistence_internet_access`**](#allow_private_persistence_internet_access) &mdash; Should the private persistence subnet be allowed outbound access to the internet?

<a name="apply_default_nacl_rules" className="snap-top"></a>

* [**`apply_default_nacl_rules`**](#apply_default_nacl_rules) &mdash; If true, will apply the default NACL rules in [`default_nacl_ingress_rules`](#default_nacl_ingress_rules) and [`default_nacl_egress_rules`](#default_nacl_egress_rules) on the default NACL of the VPC. Note that every VPC must have a default NACL - when this is false, the original default NACL rules managed by AWS will be used.

<a name="associate_default_nacl_to_subnets" className="snap-top"></a>

* [**`associate_default_nacl_to_subnets`**](#associate_default_nacl_to_subnets) &mdash; If true, will associate the default NACL to the public, private, and persistence subnets created by this module. Only used if [`apply_default_nacl_rules`](#apply_default_nacl_rules) is true. Note that this does not guarantee that the subnets are associated with the default NACL. Subnets can only be associated with a single NACL. The default NACL association will be dropped if the subnets are associated with a custom NACL later.

<a name="availability_zone_exclude_names" className="snap-top"></a>

* [**`availability_zone_exclude_names`**](#availability_zone_exclude_names) &mdash; Specific Availability Zones in which subnets SHOULD NOT be created. Useful for when features / support is missing from a given AZ.

<a name="aws_region" className="snap-top"></a>

* [**`aws_region`**](#aws_region) &mdash; The AWS region in which all resources will be created

<a name="cidr_block" className="snap-top"></a>

* [**`cidr_block`**](#cidr_block) &mdash; The IP address range of the VPC in CIDR notation. A prefix of /18 is recommended. Do not use a prefix higher than /27. Examples include '10.100.0.0/18', '10.200.0.0/18', etc.

<a name="create_dns_forwarder" className="snap-top"></a>

* [**`create_dns_forwarder`**](#create_dns_forwarder) &mdash; Whether or not to create DNS forwarders from the Mgmt VPC to the App VPC to resolve private Route 53 endpoints. This is most useful when you want to keep your EKS Kubernetes API endpoint private to the VPC, but want to access it from the Mgmt VPC (where your VPN/Bastion servers are).

<a name="create_flow_logs" className="snap-top"></a>

* [**`create_flow_logs`**](#create_flow_logs) &mdash; If you set this variable to false, this module will not create VPC Flow Logs resources. This is used as a workaround because Terraform does not allow you to use the 'count' parameter on modules. By using this parameter, you can optionally create or not create the resources within this module.

<a name="create_igw" className="snap-top"></a>

* [**`create_igw`**](#create_igw) &mdash; Whether the VPC will create an Internet Gateway. There are use cases when the VPC is desired to not be routable from the internet, and hence, they should not have an Internet Gateway. For example, when it is desired that public subnets exist but they are not directly public facing, since they can be routed from other VPC hosting the IGW.

<a name="create_network_acls" className="snap-top"></a>

* [**`create_network_acls`**](#create_network_acls) &mdash; If set to false, this module will NOT create Network ACLs. This is useful if you don't want to use Network ACLs or you want to provide your own Network ACLs outside of this module.

<a name="create_peering_connection" className="snap-top"></a>

* [**`create_peering_connection`**](#create_peering_connection) &mdash; Whether or not to create a peering connection to another VPC.

<a name="create_private_app_subnet_nacls" className="snap-top"></a>

* [**`create_private_app_subnet_nacls`**](#create_private_app_subnet_nacls) &mdash; If set to false, this module will NOT create the NACLs for the private app subnet tier.

<a name="create_private_app_subnets" className="snap-top"></a>

* [**`create_private_app_subnets`**](#create_private_app_subnets) &mdash; If set to false, this module will NOT create the private app subnet tier.

<a name="create_private_persistence_subnet_nacls" className="snap-top"></a>

* [**`create_private_persistence_subnet_nacls`**](#create_private_persistence_subnet_nacls) &mdash; If set to false, this module will NOT create the NACLs for the private persistence subnet tier.

<a name="create_private_persistence_subnets" className="snap-top"></a>

* [**`create_private_persistence_subnets`**](#create_private_persistence_subnets) &mdash; If set to false, this module will NOT create the private persistence subnet tier.

<a name="create_public_subnet_nacls" className="snap-top"></a>

* [**`create_public_subnet_nacls`**](#create_public_subnet_nacls) &mdash; If set to false, this module will NOT create the NACLs for the public subnet tier. This is useful for VPCs that only need private subnets.

<a name="create_public_subnets" className="snap-top"></a>

* [**`create_public_subnets`**](#create_public_subnets) &mdash; If set to false, this module will NOT create the public subnet tier. This is useful for VPCs that only need private subnets. Note that setting this to false also means the module will NOT create an Internet Gateway or the NAT gateways, so if you want any public Internet access in the VPC (even outbound access—e.g., to run apt get), you'll need to provide it yourself via some other mechanism (e.g., via VPC peering, a Transit Gateway, Direct Connect, etc).

<a name="create_vpc_endpoints" className="snap-top"></a>

* [**`create_vpc_endpoints`**](#create_vpc_endpoints) &mdash; Create VPC endpoints for S3 and DynamoDB.

<a name="custom_tags" className="snap-top"></a>

* [**`custom_tags`**](#custom_tags) &mdash; A map of tags to apply to the VPC, Subnets, Route Tables, Internet Gateway, default security group, and default NACLs. The key is the tag name and the value is the tag value. Note that the tag 'Name' is automatically added by this module but may be optionally overwritten by this variable.

<a name="default_nacl_egress_rules" className="snap-top"></a>

* [**`default_nacl_egress_rules`**](#default_nacl_egress_rules) &mdash; The egress rules to apply to the default NACL in the VPC. This is the security group that is used by any subnet that doesn't have its own NACL attached. The value for this variable must be a map where the keys are a unique name for each rule and the values are objects with the same fields as the egress block in the [`aws_default_network_acl`](#aws_default_network_acl) resource: [`https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_network_acl`](#https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_network_acl).

<a name="default_nacl_ingress_rules" className="snap-top"></a>

* [**`default_nacl_ingress_rules`**](#default_nacl_ingress_rules) &mdash; The ingress rules to apply to the default NACL in the VPC. This is the NACL that is used by any subnet that doesn't have its own NACL attached. The value for this variable must be a map where the keys are a unique name for each rule and the values are objects with the same fields as the ingress block in the [`aws_default_network_acl`](#aws_default_network_acl) resource: [`https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_network_acl`](#https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_network_acl).

<a name="default_security_group_egress_rules" className="snap-top"></a>

* [**`default_security_group_egress_rules`**](#default_security_group_egress_rules) &mdash; The egress rules to apply to the default security group in the VPC. This is the security group that is used by any resource that doesn't have its own security group attached. The value for this variable must be a map where the keys are a unique name for each rule and the values are objects with the same fields as the egress block in the [`aws_default_security_group`](#aws_default_security_group) resource: [`https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_security_group`](#https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_security_group)#egress-block.

<a name="default_security_group_ingress_rules" className="snap-top"></a>

* [**`default_security_group_ingress_rules`**](#default_security_group_ingress_rules) &mdash; The ingress rules to apply to the default security group in the VPC. This is the security group that is used by any resource that doesn't have its own security group attached. The value for this variable must be a map where the keys are a unique name for each rule and the values are objects with the same fields as the ingress block in the [`aws_default_security_group`](#aws_default_security_group) resource: [`https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_security_group`](#https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_security_group)#ingress-block.

<a name="destination_vpc_resolver_name" className="snap-top"></a>

* [**`destination_vpc_resolver_name`**](#destination_vpc_resolver_name) &mdash; Name to set for the destination VPC resolver (inbound from origin VPC to destination VPC). If null (default), defaults to [`'DESTINATION_VPC_NAME-from-ORIGIN_VPC_NAME`](#'DESTINATION_VPC_NAME-from-ORIGIN_VPC_NAME)-in'.

<a name="eks_cluster_names" className="snap-top"></a>

* [**`eks_cluster_names`**](#eks_cluster_names) &mdash; The names of EKS clusters that will be deployed into the VPC, if [`tag_for_use_with_eks`](#tag_for_use_with_eks) is true.

<a name="enable_default_security_group" className="snap-top"></a>

* [**`enable_default_security_group`**](#enable_default_security_group) &mdash; If set to false, the default security groups will NOT be created.

<a name="flow_log_cloudwatch_iam_role_name" className="snap-top"></a>

* [**`flow_log_cloudwatch_iam_role_name`**](#flow_log_cloudwatch_iam_role_name) &mdash; The name to use for the flow log IAM role. This can be useful if you provision the VPC without admin privileges which needs setting IAM:PassRole on deployment role. When null, a default name based on the VPC name will be chosen.

<a name="flow_log_cloudwatch_log_group_name" className="snap-top"></a>

* [**`flow_log_cloudwatch_log_group_name`**](#flow_log_cloudwatch_log_group_name) &mdash; The name to use for the CloudWatch Log group used for storing flow log. When null, a default name based on the VPC name will be chosen.

<a name="flow_logs_traffic_type" className="snap-top"></a>

* [**`flow_logs_traffic_type`**](#flow_logs_traffic_type) &mdash; The type of traffic to capture in the VPC flow log. Valid values include ACCEPT, REJECT, or ALL. Defaults to REJECT. Only used if [`create_flow_logs`](#create_flow_logs) is true.

<a name="kms_key_arn" className="snap-top"></a>

* [**`kms_key_arn`**](#kms_key_arn) &mdash; The ARN of a KMS key to use for encrypting VPC the flow log. A new KMS key will be created if this is not supplied.

<a name="kms_key_deletion_window_in_days" className="snap-top"></a>

* [**`kms_key_deletion_window_in_days`**](#kms_key_deletion_window_in_days) &mdash; The number of days to retain this KMS Key (a Customer Master Key) after it has been marked for deletion. Setting to null defaults to the provider default, which is the maximum possible value (30 days).

<a name="kms_key_user_iam_arns" className="snap-top"></a>

* [**`kms_key_user_iam_arns`**](#kms_key_user_iam_arns) &mdash; VPC Flow Logs will be encrypted with a KMS Key (a Customer Master Key). The IAM Users specified in this list will have access to this key.

<a name="nat_gateway_custom_tags" className="snap-top"></a>

* [**`nat_gateway_custom_tags`**](#nat_gateway_custom_tags) &mdash; A map of tags to apply to the NAT gateways, on top of the [`custom_tags`](#custom_tags). The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as [`custom_tags`](#custom_tags) in case of conflict.

<a name="num_availability_zones" className="snap-top"></a>

* [**`num_availability_zones`**](#num_availability_zones) &mdash; How many AWS Availability Zones (AZs) to use. One subnet of each type (public, private app) will be created in each AZ. Note that this must be less than or equal to the total number of AZs in a region. A value of null means all AZs should be used. For example, if you specify 3 in a region with 5 AZs, subnets will be created in just 3 AZs instead of all 5. Defaults to all AZs in a region.

<a name="num_nat_gateways" className="snap-top"></a>

* [**`num_nat_gateways`**](#num_nat_gateways) &mdash; The number of NAT Gateways to launch for this VPC. For production VPCs, a NAT Gateway should be placed in each Availability Zone (so likely 3 total), whereas for non-prod VPCs, just one Availability Zone (and hence 1 NAT Gateway) will suffice.

<a name="origin_vpc_cidr_block" className="snap-top"></a>

* [**`origin_vpc_cidr_block`**](#origin_vpc_cidr_block) &mdash; The CIDR block of the origin VPC.

<a name="origin_vpc_id" className="snap-top"></a>

* [**`origin_vpc_id`**](#origin_vpc_id) &mdash; The ID of the origin VPC to use when creating peering connections and DNS forwarding.

<a name="origin_vpc_name" className="snap-top"></a>

* [**`origin_vpc_name`**](#origin_vpc_name) &mdash; The name of the origin VPC to use when creating peering connections and DNS forwarding.

<a name="origin_vpc_public_subnet_ids" className="snap-top"></a>

* [**`origin_vpc_public_subnet_ids`**](#origin_vpc_public_subnet_ids) &mdash; The public subnets in the origin VPC to use when creating route53 resolvers. These are public subnets due to network ACLs restrictions. Although the forwarder is addressable publicly, access is blocked by security groups.

<a name="origin_vpc_resolver_name" className="snap-top"></a>

* [**`origin_vpc_resolver_name`**](#origin_vpc_resolver_name) &mdash; Name to set for the origin VPC resolver (outbound from origin VPC to destination VPC). If null (default), defaults to [`'ORIGIN_VPC_NAME-to-DESTINATION_VPC_NAME`](#'ORIGIN_VPC_NAME-to-DESTINATION_VPC_NAME)-out'.

<a name="origin_vpc_route_table_ids" className="snap-top"></a>

* [**`origin_vpc_route_table_ids`**](#origin_vpc_route_table_ids) &mdash; A list of route tables from the origin VPC that should have routes to this app VPC.

<a name="persistence_propagating_vgws" className="snap-top"></a>

* [**`persistence_propagating_vgws`**](#persistence_propagating_vgws) &mdash; A list of Virtual Private Gateways that will propagate routes to persistence subnets. All routes from VPN connections that use Virtual Private Gateways listed here will appear in route tables of persistence subnets. If left empty, no routes will be propagated.

<a name="persistence_subnet_bits" className="snap-top"></a>

* [**`persistence_subnet_bits`**](#persistence_subnet_bits) &mdash; Takes the CIDR prefix and adds these many bits to it for calculating subnet ranges.  MAKE SURE if you change this you also change the CIDR spacing or you may hit errors.  See cidrsubnet interpolation in terraform config for more information.

<a name="persistence_subnet_spacing" className="snap-top"></a>

* [**`persistence_subnet_spacing`**](#persistence_subnet_spacing) &mdash; The amount of spacing between the private persistence subnets. Default: 2 times the value of [`private_subnet_spacing`](#private_subnet_spacing).

<a name="private_app_allow_inbound_ports_from_cidr" className="snap-top"></a>

* [**`private_app_allow_inbound_ports_from_cidr`**](#private_app_allow_inbound_ports_from_cidr) &mdash; A map of unique names to client IP CIDR block and inbound ports that should be exposed in the private app subnet tier nACLs. This is useful when exposing your service on a privileged port with an NLB, where the address isn't translated.

<a name="private_app_allow_outbound_ports_to_destination_cidr" className="snap-top"></a>

* [**`private_app_allow_outbound_ports_to_destination_cidr`**](#private_app_allow_outbound_ports_to_destination_cidr) &mdash; A map of unique names to destination IP CIDR block and outbound ports that should be allowed in the private app subnet tier nACLs. This is useful when allowing your VPC specific outbound communication to defined CIDR blocks(known networks)

<a name="private_app_subnet_cidr_blocks" className="snap-top"></a>

* [**`private_app_subnet_cidr_blocks`**](#private_app_subnet_cidr_blocks) &mdash; A map listing the specific CIDR blocks desired for each private-app subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of Availability Zones. If left blank, we will compute a reasonable CIDR block for each subnet.

<a name="private_app_subnet_custom_tags" className="snap-top"></a>

* [**`private_app_subnet_custom_tags`**](#private_app_subnet_custom_tags) &mdash; A map of tags to apply to the private-app Subnet, on top of the [`custom_tags`](#custom_tags). The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as [`custom_tags`](#custom_tags) in case of conflict.

<a name="private_persistence_subnet_cidr_blocks" className="snap-top"></a>

* [**`private_persistence_subnet_cidr_blocks`**](#private_persistence_subnet_cidr_blocks) &mdash; A map listing the specific CIDR blocks desired for each private-persistence subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of Availability Zones. If left blank, we will compute a reasonable CIDR block for each subnet.

<a name="private_persistence_subnet_custom_tags" className="snap-top"></a>

* [**`private_persistence_subnet_custom_tags`**](#private_persistence_subnet_custom_tags) &mdash; A map of tags to apply to the private-persistence Subnet, on top of the [`custom_tags`](#custom_tags). The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as [`custom_tags`](#custom_tags) in case of conflict.

<a name="private_propagating_vgws" className="snap-top"></a>

* [**`private_propagating_vgws`**](#private_propagating_vgws) &mdash; A list of Virtual Private Gateways that will propagate routes to private subnets. All routes from VPN connections that use Virtual Private Gateways listed here will appear in route tables of private subnets. If left empty, no routes will be propagated.

<a name="private_subnet_bits" className="snap-top"></a>

* [**`private_subnet_bits`**](#private_subnet_bits) &mdash; Takes the CIDR prefix and adds these many bits to it for calculating subnet ranges.  MAKE SURE if you change this you also change the CIDR spacing or you may hit errors.  See cidrsubnet interpolation in terraform config for more information.

<a name="private_subnet_spacing" className="snap-top"></a>

* [**`private_subnet_spacing`**](#private_subnet_spacing) &mdash; The amount of spacing between private app subnets. Defaults to [`subnet_spacing`](#subnet_spacing) in vpc-app module if not set.

<a name="public_propagating_vgws" className="snap-top"></a>

* [**`public_propagating_vgws`**](#public_propagating_vgws) &mdash; A list of Virtual Private Gateways that will propagate routes to public subnets. All routes from VPN connections that use Virtual Private Gateways listed here will appear in route tables of public subnets. If left empty, no routes will be propagated.

<a name="public_subnet_bits" className="snap-top"></a>

* [**`public_subnet_bits`**](#public_subnet_bits) &mdash; Takes the CIDR prefix and adds these many bits to it for calculating subnet ranges.  MAKE SURE if you change this you also change the CIDR spacing or you may hit errors.  See cidrsubnet interpolation in terraform config for more information.

<a name="public_subnet_cidr_blocks" className="snap-top"></a>

* [**`public_subnet_cidr_blocks`**](#public_subnet_cidr_blocks) &mdash; A map listing the specific CIDR blocks desired for each public subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of Availability Zones. If left blank, we will compute a reasonable CIDR block for each subnet.

<a name="public_subnet_custom_tags" className="snap-top"></a>

* [**`public_subnet_custom_tags`**](#public_subnet_custom_tags) &mdash; A map of tags to apply to the public Subnet, on top of the [`custom_tags`](#custom_tags). The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as [`custom_tags`](#custom_tags) in case of conflict.

<a name="security_group_tags" className="snap-top"></a>

* [**`security_group_tags`**](#security_group_tags) &mdash; A map of tags to apply to the default Security Group, on top of the [`custom_tags`](#custom_tags). The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as [`custom_tags`](#custom_tags) in case of conflict.

<a name="subnet_spacing" className="snap-top"></a>

* [**`subnet_spacing`**](#subnet_spacing) &mdash; The amount of spacing between the different subnet types

<a name="tag_for_use_with_eks" className="snap-top"></a>

* [**`tag_for_use_with_eks`**](#tag_for_use_with_eks) &mdash; The VPC resources need special tags for discoverability by Kubernetes to use with certain features, like deploying ALBs.

<a name="tenancy" className="snap-top"></a>

* [**`tenancy`**](#tenancy) &mdash; The allowed tenancy of instances launched into the selected VPC. Must be one of: default, dedicated, or host.

<a name="vpc_custom_tags" className="snap-top"></a>

* [**`vpc_custom_tags`**](#vpc_custom_tags) &mdash; A map of tags to apply just to the VPC itself, but not any of the other resources. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as [`custom_tags`](#custom_tags) in case of conflict.

<a name="vpc_name" className="snap-top"></a>

* [**`vpc_name`**](#vpc_name) &mdash; Name of the VPC. Examples include 'prod', 'dev', 'mgmt', etc.

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="availability_zones" className="snap-top"></a>

* [**`availability_zones`**](#availability_zones) &mdash; The availability zones of the VPC

<a name="default_security_group_id" className="snap-top"></a>

* [**`default_security_group_id`**](#default_security_group_id) &mdash; The ID of the default security group of this VPC.

<a name="dynamodb_vpc_endpoint_id" className="snap-top"></a>

* [**`dynamodb_vpc_endpoint_id`**](#dynamodb_vpc_endpoint_id) &mdash; 

<a name="nat_gateway_public_ip_count" className="snap-top"></a>

* [**`nat_gateway_public_ip_count`**](#nat_gateway_public_ip_count) &mdash; Count of public IPs from the NAT Gateway

<a name="nat_gateway_public_ips" className="snap-top"></a>

* [**`nat_gateway_public_ips`**](#nat_gateway_public_ips) &mdash; A list of public IPs from the NAT Gateway

<a name="num_availability_zones" className="snap-top"></a>

* [**`num_availability_zones`**](#num_availability_zones) &mdash; The number of availability zones of the VPC

<a name="private_app_subnet_cidr_blocks" className="snap-top"></a>

* [**`private_app_subnet_cidr_blocks`**](#private_app_subnet_cidr_blocks) &mdash; The private IP address range of the VPC in CIDR notation.

<a name="private_app_subnet_ids" className="snap-top"></a>

* [**`private_app_subnet_ids`**](#private_app_subnet_ids) &mdash; A list of IDs of the private app subnets in the VPC

<a name="private_app_subnet_route_table_ids" className="snap-top"></a>

* [**`private_app_subnet_route_table_ids`**](#private_app_subnet_route_table_ids) &mdash; A list of IDs of the private app subnet routing table.

<a name="private_app_subnets" className="snap-top"></a>

* [**`private_app_subnets`**](#private_app_subnets) &mdash; A map of all private-app subnets, with the subnet name as key, and all `aws-subnet` properties as the value.

<a name="private_app_subnets_network_acl_id" className="snap-top"></a>

* [**`private_app_subnets_network_acl_id`**](#private_app_subnets_network_acl_id) &mdash; The ID of the private subnet's ACL

<a name="private_persistence_route_table_ids" className="snap-top"></a>

* [**`private_persistence_route_table_ids`**](#private_persistence_route_table_ids) &mdash; A list of IDs of the private persistence subnet routing table.

<a name="private_persistence_subnet_cidr_blocks" className="snap-top"></a>

* [**`private_persistence_subnet_cidr_blocks`**](#private_persistence_subnet_cidr_blocks) &mdash; The private IP address range of the VPC Persistence tier in CIDR notation.

<a name="private_persistence_subnet_ids" className="snap-top"></a>

* [**`private_persistence_subnet_ids`**](#private_persistence_subnet_ids) &mdash; The IDs of the private persistence tier subnets of the VPC.

<a name="private_persistence_subnets" className="snap-top"></a>

* [**`private_persistence_subnets`**](#private_persistence_subnets) &mdash; A map of all private-persistence subnets, with the subnet name as key, and all `aws-subnet` properties as the value.

<a name="private_persistence_subnets_network_acl_id" className="snap-top"></a>

* [**`private_persistence_subnets_network_acl_id`**](#private_persistence_subnets_network_acl_id) &mdash; The ID of the private persistence subnet's ACL

<a name="public_subnet_cidr_blocks" className="snap-top"></a>

* [**`public_subnet_cidr_blocks`**](#public_subnet_cidr_blocks) &mdash; The public IP address range of the VPC in CIDR notation.

<a name="public_subnet_ids" className="snap-top"></a>

* [**`public_subnet_ids`**](#public_subnet_ids) &mdash; A list of IDs of the public subnets of the VPC.

<a name="public_subnet_route_table_id" className="snap-top"></a>

* [**`public_subnet_route_table_id`**](#public_subnet_route_table_id) &mdash; The ID of the public routing table.

<a name="public_subnets" className="snap-top"></a>

* [**`public_subnets`**](#public_subnets) &mdash; A map of all public subnets, with the subnet name as key, and all `aws-subnet` properties as the value.

<a name="public_subnets_network_acl_id" className="snap-top"></a>

* [**`public_subnets_network_acl_id`**](#public_subnets_network_acl_id) &mdash; The ID of the public subnet's ACL

<a name="s3_vpc_endpoint_id" className="snap-top"></a>

* [**`s3_vpc_endpoint_id`**](#s3_vpc_endpoint_id) &mdash; 

<a name="vpc_cidr_block" className="snap-top"></a>

* [**`vpc_cidr_block`**](#vpc_cidr_block) &mdash; The IP address range of the VPC in CIDR notation.

<a name="vpc_id" className="snap-top"></a>

* [**`vpc_id`**](#vpc_id) &mdash; The ID of the VPC.

<a name="vpc_name" className="snap-top"></a>

* [**`vpc_name`**](#vpc_name) &mdash; The name configured for VPC.

<a name="vpc_ready" className="snap-top"></a>

* [**`vpc_ready`**](#vpc_ready) &mdash; Indicates whether or not the VPC has finished creating

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"f2dc09e50e5f332defd605adb15267e5"}
##DOCS-SOURCER-END -->
