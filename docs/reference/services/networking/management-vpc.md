---
type: "service"
name: "Management VPC"
description: "Deploy a VPC on AWS for administrative and management functions."
category: "networking"
cloud: "aws"
tags: ["vpc","ec2"]
license: "gruntwork"
built-with: "terraform"
title: "Management VPC"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';

<VersionBadge version="0.80.2" lastModifiedVersion="0.73.1"/>

# Management VPC


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/networking/vpc-mgmt" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=networking%2Fvpc-mgmt" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

## Overview

This service contains code to deploy a [Virtual Private Cloud (VPC)](https://aws.amazon.com/vpc/) on AWS that can be
used for administrative and management purposes, such as CI/CD services. The primary difference between this and the
[application VPC](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/networking/vpc) is this one has two subnet tiers (public and private) while the application VPC has three
(public, private, and persistence). In this management VPC, we assume that there are no data stores that need to be
separated in to a dedicated persistence tier.

![VPC architecture](/img/reference/services/networking/vpc-architecture.png)

## Features

*   The VPC itself.
*   Subnets, which are isolated subdivisions within the VPC. There are 2 "tiers" of subnets, public and private, spanning
    multiple availability zones.
*   Route tables, which provide routing rules for the subnets.
*   Internet Gateways to route traffic to the public Internet from public subnets.
*   NATs to route traffic to the public Internet from private subnets.

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

Under the hood, this is all implemented using Terraform modules from the Gruntwork
[terraform-aws-vpc](https://github.com/gruntwork-io/terraform-aws-vpc) repo. If you are a subscriber and don’t have
access to this repo, email <support@gruntwork.io>.

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
    optimized or direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.
*   [How to deploy a production-grade VPC on AWS](https://docs.gruntwork.io/guides/build-it-yourself/vpc/)
*   [How to configure a production-grade CI/CD workflow for application and infrastructure code](https://docs.gruntwork.io/guides/build-it-yourself/pipelines/):
    step-by-step guide on how to configure CI / CD for your apps and infrastructure.

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<a name="apply_default_nacl_rules" className="snap-top"></a>

* [**`apply_default_nacl_rules`**](#apply_default_nacl_rules) &mdash; If true, will apply the default NACL rules in [`default_nacl_ingress_rules`](#default_nacl_ingress_rules) and [`default_nacl_egress_rules`](#default_nacl_egress_rules) on the default NACL of the VPC. Note that every VPC must have a default NACL - when this is false, the original default NACL rules managed by AWS will be used.

<a name="associate_default_nacl_to_subnets" className="snap-top"></a>

* [**`associate_default_nacl_to_subnets`**](#associate_default_nacl_to_subnets) &mdash; If true, will associate the default NACL to the public, private, and persistence subnets created by this module. Only used if [`apply_default_nacl_rules`](#apply_default_nacl_rules) is true. Note that this does not guarantee that the subnets are associated with the default NACL. Subnets can only be associated with a single NACL. The default NACL association will be dropped if the subnets are associated with a custom NACL later.

<a name="availability_zone_exclude_ids" className="snap-top"></a>

* [**`availability_zone_exclude_ids`**](#availability_zone_exclude_ids) &mdash; List of excluded Availability Zone IDs.

<a name="availability_zone_exclude_names" className="snap-top"></a>

* [**`availability_zone_exclude_names`**](#availability_zone_exclude_names) &mdash; List of excluded Availability Zone names.

<a name="availability_zone_state" className="snap-top"></a>

* [**`availability_zone_state`**](#availability_zone_state) &mdash; Allows to filter list of Availability Zones based on their current state. Can be either "available", "information", "impaired" or "unavailable". By default the list includes a complete set of Availability Zones to which the underlying AWS account has access, regardless of their state.

<a name="aws_region" className="snap-top"></a>

* [**`aws_region`**](#aws_region) &mdash; The AWS region to deploy into

<a name="cidr_block" className="snap-top"></a>

* [**`cidr_block`**](#cidr_block) &mdash; The IP address range of the VPC in CIDR notation. A prefix of /16 is recommended. Do not use a prefix higher than /27. Examples include '10.100.0.0/16', '10.200.0.0/16', etc.

<a name="create_flow_logs" className="snap-top"></a>

* [**`create_flow_logs`**](#create_flow_logs) &mdash; If you set this variable to false, this module will not create VPC Flow Logs resources. This is used as a workaround because Terraform does not allow you to use the 'count' parameter on modules. By using this parameter, you can optionally create or not create the resources within this module.

<a name="create_network_acls" className="snap-top"></a>

* [**`create_network_acls`**](#create_network_acls) &mdash; If set to false, this module will NOT create Network ACLs. This is useful if you don't want to use Network ACLs or you want to provide your own Network ACLs outside of this module.

<a name="custom_tags" className="snap-top"></a>

* [**`custom_tags`**](#custom_tags) &mdash; A map of tags to apply to the VPC, Subnets, Route Tables, and Internet Gateway. The key is the tag name and the value is the tag value. Note that the tag 'Name' is automatically added by this module but may be optionally overwritten by this variable.

<a name="custom_tags_vpc_only" className="snap-top"></a>

* [**`custom_tags_vpc_only`**](#custom_tags_vpc_only) &mdash; A map of tags to apply just to the VPC itself, but not any of the other resources. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as [`custom_tags`](#custom_tags) in case of conflict.

<a name="default_nacl_egress_rules" className="snap-top"></a>

* [**`default_nacl_egress_rules`**](#default_nacl_egress_rules) &mdash; The egress rules to apply to the default NACL in the VPC. This is the security group that is used by any subnet that doesn't have its own NACL attached. The value for this variable must be a map where the keys are a unique name for each rule and the values are objects with the same fields as the egress block in the [`aws_default_network_acl`](#aws_default_network_acl) resource: [`https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_network_acl`](#https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_network_acl).

<a name="default_nacl_ingress_rules" className="snap-top"></a>

* [**`default_nacl_ingress_rules`**](#default_nacl_ingress_rules) &mdash; The ingress rules to apply to the default NACL in the VPC. This is the NACL that is used by any subnet that doesn't have its own NACL attached. The value for this variable must be a map where the keys are a unique name for each rule and the values are objects with the same fields as the ingress block in the [`aws_default_network_acl`](#aws_default_network_acl) resource: [`https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_network_acl`](#https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_network_acl).

<a name="default_security_group_egress_rules" className="snap-top"></a>

* [**`default_security_group_egress_rules`**](#default_security_group_egress_rules) &mdash; The egress rules to apply to the default security group in the VPC. This is the security group that is used by any resource that doesn't have its own security group attached. The value for this variable must be a map where the keys are a unique name for each rule and the values are objects with the same fields as the egress block in the [`aws_default_security_group`](#aws_default_security_group) resource: [`https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_security_group`](#https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_security_group)#egress-block.

<a name="default_security_group_ingress_rules" className="snap-top"></a>

* [**`default_security_group_ingress_rules`**](#default_security_group_ingress_rules) &mdash; The ingress rules to apply to the default security group in the VPC. This is the security group that is used by any resource that doesn't have its own security group attached. The value for this variable must be a map where the keys are a unique name for each rule and the values are objects with the same fields as the ingress block in the [`aws_default_security_group`](#aws_default_security_group) resource: [`https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_security_group`](#https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_security_group)#ingress-block.

<a name="enable_default_security_group" className="snap-top"></a>

* [**`enable_default_security_group`**](#enable_default_security_group) &mdash; If set to false, the default security groups will NOT be created.

<a name="kms_key_arn" className="snap-top"></a>

* [**`kms_key_arn`**](#kms_key_arn) &mdash; The ARN of a KMS key to use for encrypting VPC the flow log. A new KMS key will be created if this is not supplied.

<a name="kms_key_deletion_window_in_days" className="snap-top"></a>

* [**`kms_key_deletion_window_in_days`**](#kms_key_deletion_window_in_days) &mdash; The number of days to retain this KMS Key (a Customer Master Key) after it has been marked for deletion. Setting to null defaults to the provider default, which is the maximum possible value (30 days).

<a name="kms_key_user_iam_arns" className="snap-top"></a>

* [**`kms_key_user_iam_arns`**](#kms_key_user_iam_arns) &mdash; VPC Flow Logs will be encrypted with a KMS Key (a Customer Master Key). The IAM Users specified in this list will have access to this key.

<a name="nat_gateway_custom_tags" className="snap-top"></a>

* [**`nat_gateway_custom_tags`**](#nat_gateway_custom_tags) &mdash; A map of tags to apply to the NAT gateways, on top of the [`custom_tags`](#custom_tags). The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as [`custom_tags`](#custom_tags) in case of conflict.

<a name="num_availability_zones" className="snap-top"></a>

* [**`num_availability_zones`**](#num_availability_zones) &mdash; How many AWS Availability Zones (AZs) to use. One subnet of each type (public, private app) will be created in each AZ. Note that this must be less than or equal to the total number of AZs in a region. A value of null means all AZs should be used. For example, if you specify 3 in a region with 5 AZs, subnets will be created in just 3 AZs instead of all 5. Defaults to 3.

<a name="num_nat_gateways" className="snap-top"></a>

* [**`num_nat_gateways`**](#num_nat_gateways) &mdash; The number of NAT Gateways to launch for this VPC. The management VPC defaults to 1 NAT Gateway to save on cost, but to increase redundancy, you can adjust this to add additional NAT Gateways.

<a name="private_subnet_bits" className="snap-top"></a>

* [**`private_subnet_bits`**](#private_subnet_bits) &mdash; Takes the CIDR prefix and adds these many bits to it for calculating subnet ranges.  MAKE SURE if you change this you also change the CIDR spacing or you may hit errors.  See cidrsubnet interpolation in terraform config for more information.

<a name="private_subnet_cidr_blocks" className="snap-top"></a>

* [**`private_subnet_cidr_blocks`**](#private_subnet_cidr_blocks) &mdash; A map listing the specific CIDR blocks desired for each private subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of Availability Zones. If left blank, we will compute a reasonable CIDR block for each subnet.

<a name="private_subnet_custom_tags" className="snap-top"></a>

* [**`private_subnet_custom_tags`**](#private_subnet_custom_tags) &mdash; A map of tags to apply to the private Subnet, on top of the [`custom_tags`](#custom_tags). The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as [`custom_tags`](#custom_tags) in case of conflict.

<a name="public_subnet_bits" className="snap-top"></a>

* [**`public_subnet_bits`**](#public_subnet_bits) &mdash; Takes the CIDR prefix and adds these many bits to it for calculating subnet ranges.  MAKE SURE if you change this you also change the CIDR spacing or you may hit errors.  See cidrsubnet interpolation in terraform config for more information.

<a name="public_subnet_cidr_blocks" className="snap-top"></a>

* [**`public_subnet_cidr_blocks`**](#public_subnet_cidr_blocks) &mdash; A map listing the specific CIDR blocks desired for each public subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of Availability Zones. If left blank, we will compute a reasonable CIDR block for each subnet.

<a name="public_subnet_custom_tags" className="snap-top"></a>

* [**`public_subnet_custom_tags`**](#public_subnet_custom_tags) &mdash; A map of tags to apply to the public Subnet, on top of the [`custom_tags`](#custom_tags). The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as [`custom_tags`](#custom_tags) in case of conflict.

<a name="subnet_spacing" className="snap-top"></a>

* [**`subnet_spacing`**](#subnet_spacing) &mdash; The amount of spacing between the different subnet types

<a name="vpc_name" className="snap-top"></a>

* [**`vpc_name`**](#vpc_name) &mdash; The name of the VPC. Defaults to mgmt.

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="nat_gateway_public_ips" className="snap-top"></a>

* [**`nat_gateway_public_ips`**](#nat_gateway_public_ips) &mdash; The public IP address(es) of the NAT gateway(s) of the mgmt VPC.

<a name="num_availability_zones" className="snap-top"></a>

* [**`num_availability_zones`**](#num_availability_zones) &mdash; The number of availability zones used by the mgmt VPC.

<a name="private_subnet_arns" className="snap-top"></a>

* [**`private_subnet_arns`**](#private_subnet_arns) &mdash; The private subnet ARNs of the mgmt VPC.

<a name="private_subnet_cidr_blocks" className="snap-top"></a>

* [**`private_subnet_cidr_blocks`**](#private_subnet_cidr_blocks) &mdash; The private subnet CIDR blocks of the mgmt VPC.

<a name="private_subnet_ids" className="snap-top"></a>

* [**`private_subnet_ids`**](#private_subnet_ids) &mdash; The private subnet IDs of the mgmt VPC.

<a name="private_subnet_route_table_ids" className="snap-top"></a>

* [**`private_subnet_route_table_ids`**](#private_subnet_route_table_ids) &mdash; The ID of the private subnet route table of the mgmt VPC.

<a name="public_subnet_arns" className="snap-top"></a>

* [**`public_subnet_arns`**](#public_subnet_arns) &mdash; The public subnet ARNs of the mgmt VPC.

<a name="public_subnet_cidr_blocks" className="snap-top"></a>

* [**`public_subnet_cidr_blocks`**](#public_subnet_cidr_blocks) &mdash; The public subnet CIDR blocks of the mgmt VPC.

<a name="public_subnet_ids" className="snap-top"></a>

* [**`public_subnet_ids`**](#public_subnet_ids) &mdash; The public subnet IDs of the mgmt VPC.

<a name="public_subnet_route_table_id" className="snap-top"></a>

* [**`public_subnet_route_table_id`**](#public_subnet_route_table_id) &mdash; The ID of the public subnet route table of the mgmt VPC.

<a name="vpc_cidr_block" className="snap-top"></a>

* [**`vpc_cidr_block`**](#vpc_cidr_block) &mdash; The CIDR block of the mgmt VPC.

<a name="vpc_id" className="snap-top"></a>

* [**`vpc_id`**](#vpc_id) &mdash; The ID of the mgmt VPC.

<a name="vpc_name" className="snap-top"></a>

* [**`vpc_name`**](#vpc_name) &mdash; The name of the mgmt VPC.

<a name="vpc_ready" className="snap-top"></a>

* [**`vpc_ready`**](#vpc_ready) &mdash; Indicates whether or not the VPC has finished creating

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"12cd15033ccfe633f8da127b8b6e5c33"}
##DOCS-SOURCER-END -->
