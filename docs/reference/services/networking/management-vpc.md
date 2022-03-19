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
import HclListItem from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.85.0" lastModifiedVersion="0.83.0"/>

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

<br/>

### Required

<HclListItem name="aws_region" requirement="required" description="The AWS region to deploy into" type="string"/>

<HclListItem name="cidr_block" requirement="required" description="The IP address range of the VPC in CIDR notation. A prefix of /16 is recommended. Do not use a prefix higher than /27. Examples include '10.100.0.0/16', '10.200.0.0/16', etc." type="string"/>

<HclListItem name="num_nat_gateways" requirement="required" description="The number of NAT Gateways to launch for this VPC. The management VPC defaults to 1 NAT Gateway to save on cost, but to increase redundancy, you can adjust this to add additional NAT Gateways." type="number"/>

<HclListItem name="vpc_name" requirement="required" description="The name of the VPC. Defaults to mgmt." type="string"/>


<br/>


### Optional

<HclListItem name="apply_default_nacl_rules" requirement="optional" description="If true, will apply the default NACL rules in <a href=#default_nacl_ingress_rules><code>default_nacl_ingress_rules</code></a> and <a href=#default_nacl_egress_rules><code>default_nacl_egress_rules</code></a> on the default NACL of the VPC. Note that every VPC must have a default NACL - when this is false, the original default NACL rules managed by AWS will be used." type="bool" defaultValue="false"/>

<HclListItem name="associate_default_nacl_to_subnets" requirement="optional" description="If true, will associate the default NACL to the public, private, and persistence subnets created by this module. Only used if <a href=#apply_default_nacl_rules><code>apply_default_nacl_rules</code></a> is true. Note that this does not guarantee that the subnets are associated with the default NACL. Subnets can only be associated with a single NACL. The default NACL association will be dropped if the subnets are associated with a custom NACL later." type="bool" defaultValue="true"/>

<HclListItem name="availability_zone_exclude_ids" requirement="optional" description="List of excluded Availability Zone IDs." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="availability_zone_exclude_names" requirement="optional" description="List of excluded Availability Zone names." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="availability_zone_state" requirement="optional" description="Allows to filter list of Availability Zones based on their current state. Can be either 'available', 'information', 'impaired' or 'unavailable'. By default the list includes a complete set of Availability Zones to which the underlying AWS account has access, regardless of their state." type="string" defaultValue="null"/>

<HclListItem name="create_flow_logs" requirement="optional" description="If you set this variable to false, this module will not create VPC Flow Logs resources. This is used as a workaround because Terraform does not allow you to use the 'count' parameter on modules. By using this parameter, you can optionally create or not create the resources within this module." type="bool" defaultValue="true"/>

<HclListItem name="create_network_acls" requirement="optional" description="If set to false, this module will NOT create Network ACLs. This is useful if you don't want to use Network ACLs or you want to provide your own Network ACLs outside of this module." type="bool" defaultValue="true"/>

<HclListItem name="custom_tags" requirement="optional" description="A map of tags to apply to the VPC, Subnets, Route Tables, and Internet Gateway. The key is the tag name and the value is the tag value. Note that the tag 'Name' is automatically added by this module but may be optionally overwritten by this variable." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="custom_tags_vpc_only" requirement="optional" description="A map of tags to apply just to the VPC itself, but not any of the other resources. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as <a href=#custom_tags><code>custom_tags</code></a> in case of conflict." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="default_nacl_egress_rules" requirement="optional" description="The egress rules to apply to the default NACL in the VPC. This is the security group that is used by any subnet that doesn't have its own NACL attached. The value for this variable must be a map where the keys are a unique name for each rule and the values are objects with the same fields as the egress block in the <a href=#aws_default_network_acl><code>aws_default_network_acl</code></a> resource: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/<a href=#default_network_acl><code>default_network_acl</code></a>." type="any" defaultValue="{'AllowAll':{'action':'allow','cidr_block':'0.0.0.0/0','from_port':0,'protocol':'-1','rule_no':100,'to_port':0}}"/>

<HclListItem name="default_nacl_ingress_rules" requirement="optional" description="The ingress rules to apply to the default NACL in the VPC. This is the NACL that is used by any subnet that doesn't have its own NACL attached. The value for this variable must be a map where the keys are a unique name for each rule and the values are objects with the same fields as the ingress block in the <a href=#aws_default_network_acl><code>aws_default_network_acl</code></a> resource: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/<a href=#default_network_acl><code>default_network_acl</code></a>." type="any" defaultValue="{'AllowAll':{'action':'allow','cidr_block':'0.0.0.0/0','from_port':0,'protocol':'-1','rule_no':100,'to_port':0}}"/>

<HclListItem name="default_security_group_egress_rules" requirement="optional" description="The egress rules to apply to the default security group in the VPC. This is the security group that is used by any resource that doesn't have its own security group attached. The value for this variable must be a map where the keys are a unique name for each rule and the values are objects with the same fields as the egress block in the <a href=#aws_default_security_group><code>aws_default_security_group</code></a> resource: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/<a href=#default_security_group><code>default_security_group</code></a>#egress-block." type="any" defaultValue="{'AllowAllOutbound':{'cidr_blocks':['0.0.0.0/0'],'from_port':0,'ipv6_cidr_blocks':['::/0'],'protocol':'-1','to_port':0}}"/>

<HclListItem name="default_security_group_ingress_rules" requirement="optional" description="The ingress rules to apply to the default security group in the VPC. This is the security group that is used by any resource that doesn't have its own security group attached. The value for this variable must be a map where the keys are a unique name for each rule and the values are objects with the same fields as the ingress block in the <a href=#aws_default_security_group><code>aws_default_security_group</code></a> resource: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/<a href=#default_security_group><code>default_security_group</code></a>#ingress-block." type="any" defaultValue="{'AllowAllFromSelf':{'from_port':0,'protocol':'-1','self':true,'to_port':0}}"/>

<HclListItem name="enable_default_security_group" requirement="optional" description="If set to false, the default security groups will NOT be created." type="bool" defaultValue="false"/>

<HclListItem name="iam_role_permissions_boundary" requirement="optional" description="The ARN of the policy that is used to set the permissions boundary for the IAM role." type="string" defaultValue="null"/>

<HclListItem name="kms_key_arn" requirement="optional" description="The ARN of a KMS key to use for encrypting VPC the flow log. A new KMS key will be created if this is not supplied." type="string" defaultValue="null"/>

<HclListItem name="kms_key_deletion_window_in_days" requirement="optional" description="The number of days to retain this KMS Key (a Customer Master Key) after it has been marked for deletion. Setting to null defaults to the provider default, which is the maximum possible value (30 days)." type="number" defaultValue="null"/>

<HclListItem name="kms_key_user_iam_arns" requirement="optional" description="VPC Flow Logs will be encrypted with a KMS Key (a Customer Master Key). The IAM Users specified in this list will have access to this key." type="list" typeDetails="list(string)" defaultValue="null"/>

<HclListItem name="nat_gateway_custom_tags" requirement="optional" description="A map of tags to apply to the NAT gateways, on top of the <a href=#custom_tags><code>custom_tags</code></a>. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as <a href=#custom_tags><code>custom_tags</code></a> in case of conflict." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="num_availability_zones" requirement="optional" description="How many AWS Availability Zones (AZs) to use. One subnet of each type (public, private app) will be created in each AZ. Note that this must be less than or equal to the total number of AZs in a region. A value of null means all AZs should be used. For example, if you specify 3 in a region with 5 AZs, subnets will be created in just 3 AZs instead of all 5. Defaults to 3." type="number" defaultValue="null"/>

<HclListItem name="private_subnet_bits" requirement="optional" description="Takes the CIDR prefix and adds these many bits to it for calculating subnet ranges.  MAKE SURE if you change this you also change the CIDR spacing or you may hit errors.  See cidrsubnet interpolation in terraform config for more information." type="number" defaultValue="4"/>

<HclListItem name="private_subnet_cidr_blocks" requirement="optional" description="A map listing the specific CIDR blocks desired for each private subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of Availability Zones. If left blank, we will compute a reasonable CIDR block for each subnet." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="private_subnet_custom_tags" requirement="optional" description="A map of tags to apply to the private Subnet, on top of the <a href=#custom_tags><code>custom_tags</code></a>. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as <a href=#custom_tags><code>custom_tags</code></a> in case of conflict." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="public_subnet_bits" requirement="optional" description="Takes the CIDR prefix and adds these many bits to it for calculating subnet ranges.  MAKE SURE if you change this you also change the CIDR spacing or you may hit errors.  See cidrsubnet interpolation in terraform config for more information." type="number" defaultValue="4"/>

<HclListItem name="public_subnet_cidr_blocks" requirement="optional" description="A map listing the specific CIDR blocks desired for each public subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of Availability Zones. If left blank, we will compute a reasonable CIDR block for each subnet." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="public_subnet_custom_tags" requirement="optional" description="A map of tags to apply to the public Subnet, on top of the <a href=#custom_tags><code>custom_tags</code></a>. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as <a href=#custom_tags><code>custom_tags</code></a> in case of conflict." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="subnet_spacing" requirement="optional" description="The amount of spacing between the different subnet types" type="number" defaultValue="8"/>

<HclListItem name="use_managed_iam_policies" requirement="optional" description="When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards." type="bool" defaultValue="true"/>

</TabItem>
<TabItem value="outputs" label="Outputs">

<br/>

<HclListItem name="nat_gateway_public_ips" requirement="required" description="The public IP address(es) of the NAT gateway(s) of the mgmt VPC."/>

<HclListItem name="num_availability_zones" requirement="required" description="The number of availability zones used by the mgmt VPC."/>

<HclListItem name="private_subnet_arns" requirement="required" description="The private subnet ARNs of the mgmt VPC."/>

<HclListItem name="private_subnet_cidr_blocks" requirement="required" description="The private subnet CIDR blocks of the mgmt VPC."/>

<HclListItem name="private_subnet_ids" requirement="required" description="The private subnet IDs of the mgmt VPC."/>

<HclListItem name="private_subnet_route_table_ids" requirement="required" description="The ID of the private subnet route table of the mgmt VPC."/>

<HclListItem name="public_subnet_arns" requirement="required" description="The public subnet ARNs of the mgmt VPC."/>

<HclListItem name="public_subnet_cidr_blocks" requirement="required" description="The public subnet CIDR blocks of the mgmt VPC."/>

<HclListItem name="public_subnet_ids" requirement="required" description="The public subnet IDs of the mgmt VPC."/>

<HclListItem name="public_subnet_route_table_id" requirement="required" description="The ID of the public subnet route table of the mgmt VPC."/>

<HclListItem name="vpc_cidr_block" requirement="required" description="The CIDR block of the mgmt VPC."/>

<HclListItem name="vpc_id" requirement="required" description="The ID of the mgmt VPC."/>

<HclListItem name="vpc_name" requirement="required" description="The name of the mgmt VPC."/>

<HclListItem name="vpc_ready" requirement="required" description="Indicates whether or not the VPC has finished creating"/>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"45b224d055352db62cd031aeacad04fa"}
##DOCS-SOURCER-END -->
