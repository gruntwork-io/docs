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
import HclListItem from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.85.0" lastModifiedVersion="0.84.0"/>

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

<br/>

### Required

<HclListItem name="aws_region" requirement="required" description="The AWS region in which all resources will be created" type="string"/>

<HclListItem name="cidr_block" requirement="required" description="The IP address range of the VPC in CIDR notation. A prefix of /18 is recommended. Do not use a prefix higher than /27. Examples include '10.100.0.0/18', '10.200.0.0/18', etc." type="string"/>

<HclListItem name="num_nat_gateways" requirement="required" description="The number of NAT Gateways to launch for this VPC. For production VPCs, a NAT Gateway should be placed in each Availability Zone (so likely 3 total), whereas for non-prod VPCs, just one Availability Zone (and hence 1 NAT Gateway) will suffice." type="number"/>

<HclListItem name="vpc_name" requirement="required" description="Name of the VPC. Examples include 'prod', 'dev', 'mgmt', etc." type="string"/>


<br/>


### Optional

<HclListItem name="allow_private_persistence_internet_access" requirement="optional" description="Should the private persistence subnet be allowed outbound access to the internet?" type="bool" defaultValue="false"/>

<HclListItem name="apply_default_nacl_rules" requirement="optional" description="If true, will apply the default NACL rules in <a href=#default_nacl_ingress_rules><code>default_nacl_ingress_rules</code></a> and <a href=#default_nacl_egress_rules><code>default_nacl_egress_rules</code></a> on the default NACL of the VPC. Note that every VPC must have a default NACL - when this is false, the original default NACL rules managed by AWS will be used." type="bool" defaultValue="false"/>

<HclListItem name="associate_default_nacl_to_subnets" requirement="optional" description="If true, will associate the default NACL to the public, private, and persistence subnets created by this module. Only used if <a href=#apply_default_nacl_rules><code>apply_default_nacl_rules</code></a> is true. Note that this does not guarantee that the subnets are associated with the default NACL. Subnets can only be associated with a single NACL. The default NACL association will be dropped if the subnets are associated with a custom NACL later." type="bool" defaultValue="true"/>

<HclListItem name="availability_zone_exclude_names" requirement="optional" description="Specific Availability Zones in which subnets SHOULD NOT be created. Useful for when features / support is missing from a given AZ." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="create_dns_forwarder" requirement="optional" description="Whether or not to create DNS forwarders from the Mgmt VPC to the App VPC to resolve private Route 53 endpoints. This is most useful when you want to keep your EKS Kubernetes API endpoint private to the VPC, but want to access it from the Mgmt VPC (where your VPN/Bastion servers are)." type="bool" defaultValue="false"/>

<HclListItem name="create_flow_logs" requirement="optional" description="If you set this variable to false, this module will not create VPC Flow Logs resources. This is used as a workaround because Terraform does not allow you to use the 'count' parameter on modules. By using this parameter, you can optionally create or not create the resources within this module." type="bool" defaultValue="true"/>

<HclListItem name="create_igw" requirement="optional" description="Whether the VPC will create an Internet Gateway. There are use cases when the VPC is desired to not be routable from the internet, and hence, they should not have an Internet Gateway. For example, when it is desired that public subnets exist but they are not directly public facing, since they can be routed from other VPC hosting the IGW." type="bool" defaultValue="true"/>

<HclListItem name="create_network_acls" requirement="optional" description="If set to false, this module will NOT create Network ACLs. This is useful if you don't want to use Network ACLs or you want to provide your own Network ACLs outside of this module." type="bool" defaultValue="true"/>

<HclListItem name="create_peering_connection" requirement="optional" description="Whether or not to create a peering connection to another VPC." type="bool" defaultValue="false"/>

<HclListItem name="create_private_app_subnet_nacls" requirement="optional" description="If set to false, this module will NOT create the NACLs for the private app subnet tier." type="bool" defaultValue="true"/>

<HclListItem name="create_private_app_subnets" requirement="optional" description="If set to false, this module will NOT create the private app subnet tier." type="bool" defaultValue="true"/>

<HclListItem name="create_private_persistence_subnet_nacls" requirement="optional" description="If set to false, this module will NOT create the NACLs for the private persistence subnet tier." type="bool" defaultValue="true"/>

<HclListItem name="create_private_persistence_subnets" requirement="optional" description="If set to false, this module will NOT create the private persistence subnet tier." type="bool" defaultValue="true"/>

<HclListItem name="create_public_subnet_nacls" requirement="optional" description="If set to false, this module will NOT create the NACLs for the public subnet tier. This is useful for VPCs that only need private subnets." type="bool" defaultValue="true"/>

<HclListItem name="create_public_subnets" requirement="optional" description="If set to false, this module will NOT create the public subnet tier. This is useful for VPCs that only need private subnets. Note that setting this to false also means the module will NOT create an Internet Gateway or the NAT gateways, so if you want any public Internet access in the VPC (even outbound access—e.g., to run apt get), you'll need to provide it yourself via some other mechanism (e.g., via VPC peering, a Transit Gateway, Direct Connect, etc)." type="bool" defaultValue="true"/>

<HclListItem name="create_vpc_endpoints" requirement="optional" description="Create VPC endpoints for S3 and DynamoDB." type="bool" defaultValue="true"/>

<HclListItem name="custom_tags" requirement="optional" description="A map of tags to apply to the VPC, Subnets, Route Tables, Internet Gateway, default security group, and default NACLs. The key is the tag name and the value is the tag value. Note that the tag 'Name' is automatically added by this module but may be optionally overwritten by this variable." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="default_nacl_egress_rules" requirement="optional" description="The egress rules to apply to the default NACL in the VPC. This is the security group that is used by any subnet that doesn't have its own NACL attached. The value for this variable must be a map where the keys are a unique name for each rule and the values are objects with the same fields as the egress block in the <a href=#aws_default_network_acl><code>aws_default_network_acl</code></a> resource: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/<a href=#default_network_acl><code>default_network_acl</code></a>." type="any" defaultValue="{'AllowAll':{'action':'allow','cidr_block':'0.0.0.0/0','from_port':0,'protocol':'-1','rule_no':100,'to_port':0}}"/>

<HclListItem name="default_nacl_ingress_rules" requirement="optional" description="The ingress rules to apply to the default NACL in the VPC. This is the NACL that is used by any subnet that doesn't have its own NACL attached. The value for this variable must be a map where the keys are a unique name for each rule and the values are objects with the same fields as the ingress block in the <a href=#aws_default_network_acl><code>aws_default_network_acl</code></a> resource: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/<a href=#default_network_acl><code>default_network_acl</code></a>." type="any" defaultValue="{'AllowAll':{'action':'allow','cidr_block':'0.0.0.0/0','from_port':0,'protocol':'-1','rule_no':100,'to_port':0}}"/>

<HclListItem name="default_security_group_egress_rules" requirement="optional" description="The egress rules to apply to the default security group in the VPC. This is the security group that is used by any resource that doesn't have its own security group attached. The value for this variable must be a map where the keys are a unique name for each rule and the values are objects with the same fields as the egress block in the <a href=#aws_default_security_group><code>aws_default_security_group</code></a> resource: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/<a href=#default_security_group><code>default_security_group</code></a>#egress-block." type="any" defaultValue="{'AllowAllOutbound':{'cidr_blocks':['0.0.0.0/0'],'from_port':0,'ipv6_cidr_blocks':['::/0'],'protocol':'-1','to_port':0}}"/>

<HclListItem name="default_security_group_ingress_rules" requirement="optional" description="The ingress rules to apply to the default security group in the VPC. This is the security group that is used by any resource that doesn't have its own security group attached. The value for this variable must be a map where the keys are a unique name for each rule and the values are objects with the same fields as the ingress block in the <a href=#aws_default_security_group><code>aws_default_security_group</code></a> resource: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/<a href=#default_security_group><code>default_security_group</code></a>#ingress-block." type="any" defaultValue="{'AllowAllFromSelf':{'from_port':0,'protocol':'-1','self':true,'to_port':0}}"/>

<HclListItem name="destination_vpc_resolver_name" requirement="optional" description="Name to set for the destination VPC resolver (inbound from origin VPC to destination VPC). If null (default), defaults to '<a href=#DESTINATION_VPC_NAME><code>DESTINATION_VPC_NAME</code></a>-from-<a href=#ORIGIN_VPC_NAME><code>ORIGIN_VPC_NAME</code></a>-in'." type="string" defaultValue="null"/>

<HclListItem name="eks_cluster_names" requirement="optional" description="The names of EKS clusters that will be deployed into the VPC, if <a href=#tag_for_use_with_eks><code>tag_for_use_with_eks</code></a> is true." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="enable_default_security_group" requirement="optional" description="If set to false, the default security groups will NOT be created." type="bool" defaultValue="true"/>

<HclListItem name="flow_log_cloudwatch_iam_role_name" requirement="optional" description="The name to use for the flow log IAM role. This can be useful if you provision the VPC without admin privileges which needs setting IAM:PassRole on deployment role. When null, a default name based on the VPC name will be chosen." type="string" defaultValue="null"/>

<HclListItem name="flow_log_cloudwatch_log_group_name" requirement="optional" description="The name to use for the CloudWatch Log group used for storing flow log. When null, a default name based on the VPC name will be chosen." type="string" defaultValue="null"/>

<HclListItem name="flow_logs_traffic_type" requirement="optional" description="The type of traffic to capture in the VPC flow log. Valid values include ACCEPT, REJECT, or ALL. Defaults to REJECT. Only used if <a href=#create_flow_logs><code>create_flow_logs</code></a> is true." type="string" defaultValue="REJECT"/>

<HclListItem name="iam_role_permissions_boundary" requirement="optional" description="The ARN of the policy that is used to set the permissions boundary for the IAM role." type="string" defaultValue="null"/>

<HclListItem name="kms_key_arn" requirement="optional" description="The ARN of a KMS key to use for encrypting VPC the flow log. A new KMS key will be created if this is not supplied." type="string" defaultValue="null"/>

<HclListItem name="kms_key_deletion_window_in_days" requirement="optional" description="The number of days to retain this KMS Key (a Customer Master Key) after it has been marked for deletion. Setting to null defaults to the provider default, which is the maximum possible value (30 days)." type="number" defaultValue="null"/>

<HclListItem name="kms_key_user_iam_arns" requirement="optional" description="VPC Flow Logs will be encrypted with a KMS Key (a Customer Master Key). The IAM Users specified in this list will have access to this key." type="list" typeDetails="list(string)" defaultValue="null"/>

<HclListItem name="nat_gateway_custom_tags" requirement="optional" description="A map of tags to apply to the NAT gateways, on top of the <a href=#custom_tags><code>custom_tags</code></a>. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as <a href=#custom_tags><code>custom_tags</code></a> in case of conflict." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="num_availability_zones" requirement="optional" description="How many AWS Availability Zones (AZs) to use. One subnet of each type (public, private app) will be created in each AZ. Note that this must be less than or equal to the total number of AZs in a region. A value of null means all AZs should be used. For example, if you specify 3 in a region with 5 AZs, subnets will be created in just 3 AZs instead of all 5. Defaults to all AZs in a region." type="number" defaultValue="null"/>

<HclListItem name="origin_vpc_cidr_block" requirement="optional" description="The CIDR block of the origin VPC." type="string" defaultValue="null"/>

<HclListItem name="origin_vpc_id" requirement="optional" description="The ID of the origin VPC to use when creating peering connections and DNS forwarding." type="string" defaultValue="null"/>

<HclListItem name="origin_vpc_name" requirement="optional" description="The name of the origin VPC to use when creating peering connections and DNS forwarding." type="string" defaultValue="null"/>

<HclListItem name="origin_vpc_public_subnet_ids" requirement="optional" description="The public subnets in the origin VPC to use when creating route53 resolvers. These are public subnets due to network ACLs restrictions. Although the forwarder is addressable publicly, access is blocked by security groups." type="list" typeDetails="list(string)" defaultValue="null"/>

<HclListItem name="origin_vpc_resolver_name" requirement="optional" description="Name to set for the origin VPC resolver (outbound from origin VPC to destination VPC). If null (default), defaults to '<a href=#ORIGIN_VPC_NAME><code>ORIGIN_VPC_NAME</code></a>-to-<a href=#DESTINATION_VPC_NAME><code>DESTINATION_VPC_NAME</code></a>-out'." type="string" defaultValue="null"/>

<HclListItem name="origin_vpc_route_table_ids" requirement="optional" description="A list of route tables from the origin VPC that should have routes to this app VPC." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="persistence_propagating_vgws" requirement="optional" description="A list of Virtual Private Gateways that will propagate routes to persistence subnets. All routes from VPN connections that use Virtual Private Gateways listed here will appear in route tables of persistence subnets. If left empty, no routes will be propagated." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="persistence_subnet_bits" requirement="optional" description="Takes the CIDR prefix and adds these many bits to it for calculating subnet ranges.  MAKE SURE if you change this you also change the CIDR spacing or you may hit errors.  See cidrsubnet interpolation in terraform config for more information." type="number" defaultValue="5"/>

<HclListItem name="persistence_subnet_spacing" requirement="optional" description="The amount of spacing between the private persistence subnets. Default: 2 times the value of <a href=#private_subnet_spacing><code>private_subnet_spacing</code></a>." type="number" defaultValue="null"/>

<HclListItem name="private_app_allow_inbound_ports_from_cidr" requirement="optional" description="A map of unique names to client IP CIDR block and inbound ports that should be exposed in the private app subnet tier nACLs. This is useful when exposing your service on a privileged port with an NLB, where the address isn't translated." type="map" typeDetails="map(
    object({
      # The CIDR block of the client IP addresses for the service. Traffic will only be exposed to IP sources of this
      # CIDR block.
      client_cidr_block = string
      # A rule number indicating priority. A lower number has precedence. Note that the default rules created by this
      # module start with 100.
      rule_number = number
      # Network protocol (tcp, udp, icmp, or all) to expose.
      protocol = string
      # Range of ports to expose.
      from_port = number
      to_port   = number
      # ICMP types to expose
      # Required if specifying ICMP for the protocol
      icmp_type = number
      icmp_code = number
    })
  )" defaultValue="{}"/>

<HclListItem name="private_app_allow_outbound_ports_to_destination_cidr" requirement="optional" description="A map of unique names to destination IP CIDR block and outbound ports that should be allowed in the private app subnet tier nACLs. This is useful when allowing your VPC specific outbound communication to defined CIDR blocks(known networks)" type="map" typeDetails="map(
    object({
      # The destination CIDR block used for leaving VPC traffic. Traffic will be allowed only from VPC to destination CIDR block.
      client_cidr_block = string
      # A rule number indicating priority. A lower number has precedence. Note that the default rules created by this
      # module start with 100.
      rule_number = number
      # Network protocol (tcp, udp, icmp, or all) to expose.
      protocol = string
      # Range of ports to expose.
      from_port = number
      to_port   = number
      # ICMP types to expose
      # Required if specifying ICMP for the protocol
      icmp_type = number
      icmp_code = number
    })
  )" defaultValue="{}"/>

<HclListItem name="private_app_subnet_cidr_blocks" requirement="optional" description="A map listing the specific CIDR blocks desired for each private-app subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of Availability Zones. If left blank, we will compute a reasonable CIDR block for each subnet." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="private_app_subnet_custom_tags" requirement="optional" description="A map of tags to apply to the private-app Subnet, on top of the <a href=#custom_tags><code>custom_tags</code></a>. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as <a href=#custom_tags><code>custom_tags</code></a> in case of conflict." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="private_persistence_subnet_cidr_blocks" requirement="optional" description="A map listing the specific CIDR blocks desired for each private-persistence subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of Availability Zones. If left blank, we will compute a reasonable CIDR block for each subnet." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="private_persistence_subnet_custom_tags" requirement="optional" description="A map of tags to apply to the private-persistence Subnet, on top of the <a href=#custom_tags><code>custom_tags</code></a>. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as <a href=#custom_tags><code>custom_tags</code></a> in case of conflict." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="private_propagating_vgws" requirement="optional" description="A list of Virtual Private Gateways that will propagate routes to private subnets. All routes from VPN connections that use Virtual Private Gateways listed here will appear in route tables of private subnets. If left empty, no routes will be propagated." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="private_subnet_bits" requirement="optional" description="Takes the CIDR prefix and adds these many bits to it for calculating subnet ranges.  MAKE SURE if you change this you also change the CIDR spacing or you may hit errors.  See cidrsubnet interpolation in terraform config for more information." type="number" defaultValue="5"/>

<HclListItem name="private_subnet_spacing" requirement="optional" description="The amount of spacing between private app subnets. Defaults to <a href=#subnet_spacing><code>subnet_spacing</code></a> in vpc-app module if not set." type="number" defaultValue="null"/>

<HclListItem name="public_propagating_vgws" requirement="optional" description="A list of Virtual Private Gateways that will propagate routes to public subnets. All routes from VPN connections that use Virtual Private Gateways listed here will appear in route tables of public subnets. If left empty, no routes will be propagated." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="public_subnet_bits" requirement="optional" description="Takes the CIDR prefix and adds these many bits to it for calculating subnet ranges.  MAKE SURE if you change this you also change the CIDR spacing or you may hit errors.  See cidrsubnet interpolation in terraform config for more information." type="number" defaultValue="5"/>

<HclListItem name="public_subnet_cidr_blocks" requirement="optional" description="A map listing the specific CIDR blocks desired for each public subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of Availability Zones. If left blank, we will compute a reasonable CIDR block for each subnet." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="public_subnet_custom_tags" requirement="optional" description="A map of tags to apply to the public Subnet, on top of the <a href=#custom_tags><code>custom_tags</code></a>. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as <a href=#custom_tags><code>custom_tags</code></a> in case of conflict." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="security_group_tags" requirement="optional" description="A map of tags to apply to the default Security Group, on top of the <a href=#custom_tags><code>custom_tags</code></a>. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as <a href=#custom_tags><code>custom_tags</code></a> in case of conflict." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="subnet_spacing" requirement="optional" description="The amount of spacing between the different subnet types" type="number" defaultValue="10"/>

<HclListItem name="tag_for_use_with_eks" requirement="optional" description="The VPC resources need special tags for discoverability by Kubernetes to use with certain features, like deploying ALBs." type="bool" defaultValue="false"/>

<HclListItem name="tenancy" requirement="optional" description="The allowed tenancy of instances launched into the selected VPC. Must be one of: default, dedicated, or host." type="string" defaultValue="default"/>

<HclListItem name="use_managed_iam_policies" requirement="optional" description="When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards." type="bool" defaultValue="true"/>

<HclListItem name="vpc_custom_tags" requirement="optional" description="A map of tags to apply just to the VPC itself, but not any of the other resources. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as <a href=#custom_tags><code>custom_tags</code></a> in case of conflict." type="map" typeDetails="map(string)" defaultValue="{}"/>

</TabItem>
<TabItem value="outputs" label="Outputs">

<br/>

<HclListItem name="availability_zones" requirement="required" description="The availability zones of the VPC"/>

<HclListItem name="default_security_group_id" requirement="required" description="The ID of the default security group of this VPC."/>

<HclListItem name="dynamodb_vpc_endpoint_id" requirement="required"/>

<HclListItem name="nat_gateway_public_ip_count" requirement="required" description="Count of public IPs from the NAT Gateway"/>

<HclListItem name="nat_gateway_public_ips" requirement="required" description="A list of public IPs from the NAT Gateway"/>

<HclListItem name="num_availability_zones" requirement="required" description="The number of availability zones of the VPC"/>

<HclListItem name="private_app_subnet_cidr_blocks" requirement="required" description="The private IP address range of the VPC in CIDR notation."/>

<HclListItem name="private_app_subnet_ids" requirement="required" description="A list of IDs of the private app subnets in the VPC"/>

<HclListItem name="private_app_subnet_route_table_ids" requirement="required" description="A list of IDs of the private app subnet routing table."/>

<HclListItem name="private_app_subnets" requirement="required" description="A map of all private-app subnets, with the subnet name as key, and all `aws-subnet` properties as the value."/>

<HclListItem name="private_app_subnets_network_acl_id" requirement="required" description="The ID of the private subnet's ACL"/>

<HclListItem name="private_persistence_route_table_ids" requirement="required" description="A list of IDs of the private persistence subnet routing table."/>

<HclListItem name="private_persistence_subnet_cidr_blocks" requirement="required" description="The private IP address range of the VPC Persistence tier in CIDR notation."/>

<HclListItem name="private_persistence_subnet_ids" requirement="required" description="The IDs of the private persistence tier subnets of the VPC."/>

<HclListItem name="private_persistence_subnets" requirement="required" description="A map of all private-persistence subnets, with the subnet name as key, and all `aws-subnet` properties as the value."/>

<HclListItem name="private_persistence_subnets_network_acl_id" requirement="required" description="The ID of the private persistence subnet's ACL"/>

<HclListItem name="public_subnet_cidr_blocks" requirement="required" description="The public IP address range of the VPC in CIDR notation."/>

<HclListItem name="public_subnet_ids" requirement="required" description="A list of IDs of the public subnets of the VPC."/>

<HclListItem name="public_subnet_route_table_id" requirement="required" description="The ID of the public routing table."/>

<HclListItem name="public_subnets" requirement="required" description="A map of all public subnets, with the subnet name as key, and all `aws-subnet` properties as the value."/>

<HclListItem name="public_subnets_network_acl_id" requirement="required" description="The ID of the public subnet's ACL"/>

<HclListItem name="s3_vpc_endpoint_id" requirement="required"/>

<HclListItem name="vpc_cidr_block" requirement="required" description="The IP address range of the VPC in CIDR notation."/>

<HclListItem name="vpc_id" requirement="required" description="The ID of the VPC."/>

<HclListItem name="vpc_name" requirement="required" description="The name configured for VPC."/>

<HclListItem name="vpc_ready" requirement="required" description="Indicates whether or not the VPC has finished creating"/>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"6f17fab58689b7275aeb2dd0723abd77"}
##DOCS-SOURCER-END -->
