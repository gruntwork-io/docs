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
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.118.17" lastModifiedVersion="0.115.4"/>

# VPC

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.118.17/modules/networking/vpc" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=networking%2Fvpc" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>

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
email [support@gruntwork.io](mailto:support@gruntwork.io).

### Core concepts

To understand core concepts like what’s a VPC, how subnets are configured, how network ACLs work, and more, see the
documentation in the [terraform-aws-vpc](https://github.com/gruntwork-io/terraform-aws-vpc) repo.

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.118.17/modules): The main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.
*   [examples](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.118.17/examples): This folder contains working examples of how to use the submodules.
*   [test](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.118.17/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.118.17/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.118.17/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.
*   [How to deploy a production-grade VPC on AWS](https://docs.gruntwork.io/guides/build-it-yourself/vpc/)
*   [How to configure a production-grade CI/CD workflow for application and infrastructure code](https://docs.gruntwork.io/guides/build-it-yourself/pipelines/):
    step-by-step guide on how to configure CI / CD for your apps and infrastructure.


## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC MODULE
# ------------------------------------------------------------------------------------------------------

module "vpc" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/networking/vpc?ref=v0.118.17"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The IP address range of the VPC in CIDR notation. A prefix of /18 is
  # recommended. Do not use a prefix higher than /27. Examples include
  # '10.100.0.0/18', '10.200.0.0/18', etc.
  cidr_block = <string>

  # The number of NAT Gateways to launch for this VPC. For production VPCs, a
  # NAT Gateway should be placed in each Availability Zone (so likely 3 total),
  # whereas for non-prod VPCs, just one Availability Zone (and hence 1 NAT
  # Gateway) will suffice.
  num_nat_gateways = <number>

  # Name of the VPC. Examples include 'prod', 'dev', 'mgmt', etc.
  vpc_name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Should the private persistence subnet be allowed outbound access to the
  # internet?
  allow_private_persistence_internet_access = false

  # Should the transit subnet be allowed outbound access to the internet?
  allow_transit_internet_access = false

  # If true, will apply the default NACL rules in var.default_nacl_ingress_rules
  # and var.default_nacl_egress_rules on the default NACL of the VPC. Note that
  # every VPC must have a default NACL - when this is false, the original
  # default NACL rules managed by AWS will be used.
  apply_default_nacl_rules = false

  # (Optional) Requests an Amazon-provided IPv6 CIDR block with a /56 prefix
  # length for the VPC. You cannot specify the range of IP addresses, or the
  # size of the CIDR block. Conflicts with ipv6_ipam_pool_id
  assign_generated_ipv6_cidr_block = null

  # (Optional) Specify true to indicate that network interfaces created in the
  # specified subnet should be assigned an IPv6 address. Default is false
  assign_ipv6_address_on_creation = false

  # If true, will associate the default NACL to the public, private, and
  # persistence subnets created by this module. Only used if
  # var.apply_default_nacl_rules is true. Note that this does not guarantee that
  # the subnets are associated with the default NACL. Subnets can only be
  # associated with a single NACL. The default NACL association will be dropped
  # if the subnets are associated with a custom NACL later.
  associate_default_nacl_to_subnets = true

  # List of excluded Availability Zone IDs.
  availability_zone_exclude_ids = []

  # Specific Availability Zones in which subnets SHOULD NOT be created. Useful
  # for when features / support is missing from a given AZ.
  availability_zone_exclude_names = []

  # List of specific Availability Zone IDs to use. If null (default), all
  # availability zones in the configured AWS region will be used.
  availability_zone_ids = null

  # Allows to filter list of Availability Zones based on their current state.
  # Can be either "available", "information", "impaired" or "unavailable". By
  # default the list includes a complete set of Availability Zones to which the
  # underlying AWS account has access, regardless of their state.
  availability_zone_state = null

  # DEPRECATED. The AWS Region where this VPC will exist. This variable is no
  # longer used and only kept around for backwards compatibility. We now
  # automatically fetch the region using a data source.
  aws_region = ""

  # The base number to append to initial nacl rule number for the first transit
  # rule in private and persistence rules created. All transit rules will be
  # inserted after this number. This base number provides a safeguard to ensure
  # that the transit rules do not overwrite any existing NACL rules in private
  # and persistence subnets.
  base_transit_nacl_rule_number = 1000

  # A map of tags to apply to the Blackhole ENI. The key is the tag name and the
  # value is the tag value. Note that the tag 'Name' is automatically added by
  # this module but may be optionally overwritten by this variable.
  blackhole_network_interface_custom_tags = {}

  # The description of the Blackhole ENI.
  blackhole_network_interface_description = "Blackhole ENI - DO NOT ATTACH TO INSTANCES"

  # The host number in the IP address of the Blackhole ENI. You would only use
  # this if you want the blackhole ENI to always have the same host number
  # within your subnet's CIDR range: e.g., it's always x.x.x.4. For IPv4, this
  # is the fourth octet in the IP address. For IPv6, this is the sixth hextet in
  # the IP address.
  blackhole_network_interface_host_num = null

  # The name of the Blackhole ENI.
  blackhole_network_interface_name = "Blackhole ENI - DO NOT ATTACH TO INSTANCES"

  # A map of objects defining which blackhole routes to create. The key should
  # be the name of a subnet tier: one of public, private-app,
  # private-persistence, or transit. The value should be an object that
  # specifies the CIDR blocks or the names of other subnet tiers (from the same
  # list of public, private-app, private-persistence, transit) to blackhole.
  blackhole_routes = {}

  # If set to true, this module will create a default route table route to the
  # Internet Gateway. If set to false, this module will NOT create a default
  # route table route to the Internet Gateway. This is useful if you have
  # subnets which utilize the default route table. Defaults to true.
  create_default_route_table_route = true

  # Whether or not to create DNS forwarders from the Mgmt VPC to the App VPC to
  # resolve private Route 53 endpoints. This is most useful when you want to
  # keep your EKS Kubernetes API endpoint private to the VPC, but want to access
  # it from the Mgmt VPC (where your VPN/Bastion servers are).
  create_dns_forwarder = false

  # If you set this variable to false, this module will not create VPC Flow Logs
  # resources. This is used as a workaround because Terraform does not allow you
  # to use the 'count' parameter on modules. By using this parameter, you can
  # optionally create or not create the resources within this module.
  create_flow_logs = true

  # Whether the VPC will create an Internet Gateway. There are use cases when
  # the VPC is desired to not be routable from the internet, and hence, they
  # should not have an Internet Gateway. For example, when it is desired that
  # public subnets exist but they are not directly public facing, since they can
  # be routed from other VPC hosting the IGW.
  create_igw = true

  # If set to false, this module will NOT create Network ACLs. This is useful if
  # you don't want to use Network ACLs or you want to provide your own Network
  # ACLs outside of this module.
  create_network_acls = true

  # Whether or not to create a peering connection to another VPC.
  create_peering_connection = false

  # If set to false, this module will NOT create the NACLs for the private app
  # subnet tier.
  create_private_app_subnet_nacls = true

  # If set to false, this module will NOT create the private app subnet tier.
  create_private_app_subnets = true

  # If set to false, this module will NOT create the NACLs for the private
  # persistence subnet tier.
  create_private_persistence_subnet_nacls = true

  # If set to false, this module will NOT create the private persistence subnet
  # tier.
  create_private_persistence_subnets = true

  # If set to false, this module will NOT create the NACLs for the public subnet
  # tier. This is useful for VPCs that only need private subnets.
  create_public_subnet_nacls = true

  # If set to false, this module will NOT create the public subnet tier. This is
  # useful for VPCs that only need private subnets. Note that setting this to
  # false also means the module will NOT create an Internet Gateway or the NAT
  # gateways, so if you want any public Internet access in the VPC (even
  # outbound access—e.g., to run apt get), you'll need to provide it yourself
  # via some other mechanism (e.g., via VPC peering, a Transit Gateway, Direct
  # Connect, etc).
  create_public_subnets = true

  # If set to false, this module will NOT create the NACLs for the transit
  # subnet tier.
  create_transit_subnet_nacls = false

  # If set to false, this module will NOT create the transit subnet tier.
  create_transit_subnets = false

  # Create VPC endpoints for S3 and DynamoDB.
  create_vpc_endpoints = true

  # The list of EIPs (allocation ids) to use for the NAT gateways. Their number
  # has to match the one given in 'num_nat_gateways'. Must be set if
  # var.use_custom_nat_eips us true.
  custom_nat_eips = []

  # A map of tags to apply to the VPC, Subnets, Route Tables, Internet Gateway,
  # default security group, and default NACLs. The key is the tag name and the
  # value is the tag value. Note that the tag 'Name' is automatically added by
  # this module but may be optionally overwritten by this variable.
  custom_tags = {}

  # The egress rules to apply to the default NACL in the VPC. This is the
  # security group that is used by any subnet that doesn't have its own NACL
  # attached. The value for this variable must be a map where the keys are a
  # unique name for each rule and the values are objects with the same fields as
  # the egress block in the aws_default_network_acl resource:
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_network_acl.
  default_nacl_egress_rules = {"AllowAll":{"action":"allow","cidr_block":"0.0.0.0/0","from_port":0,"protocol":"-1","rule_no":100,"to_port":0}}

  # The ingress rules to apply to the default NACL in the VPC. This is the NACL
  # that is used by any subnet that doesn't have its own NACL attached. The
  # value for this variable must be a map where the keys are a unique name for
  # each rule and the values are objects with the same fields as the ingress
  # block in the aws_default_network_acl resource:
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_network_acl.
  default_nacl_ingress_rules = {"AllowAll":{"action":"allow","cidr_block":"0.0.0.0/0","from_port":0,"protocol":"-1","rule_no":100,"to_port":0}}

  # The egress rules to apply to the default security group in the VPC. This is
  # the security group that is used by any resource that doesn't have its own
  # security group attached. The value for this variable must be a map where the
  # keys are a unique name for each rule and the values are objects with the
  # same fields as the egress block in the aws_default_security_group resource:
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_security_group#egress-block.
  default_security_group_egress_rules = {"AllowAllOutbound":{"cidr_blocks":["0.0.0.0/0"],"from_port":0,"ipv6_cidr_blocks":["::/0"],"protocol":"-1","to_port":0}}

  # The ingress rules to apply to the default security group in the VPC. This is
  # the security group that is used by any resource that doesn't have its own
  # security group attached. The value for this variable must be a map where the
  # keys are a unique name for each rule and the values are objects with the
  # same fields as the ingress block in the aws_default_security_group resource:
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_security_group#ingress-block.
  default_security_group_ingress_rules = {"AllowAllFromSelf":{"from_port":0,"protocol":"-1","self":true,"to_port":0}}

  # Name to set for the destination VPC resolver (inbound from origin VPC to
  # destination VPC). If null (default), defaults to
  # 'DESTINATION_VPC_NAME-from-ORIGIN_VPC_NAME-in'.
  destination_vpc_resolver_name = null

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  dynamodb_endpoint_policy = null

  # The names of EKS clusters that will be deployed into the VPC, if
  # var.tag_for_use_with_eks is true.
  eks_cluster_names = []

  # If set to false, the default security groups will NOT be created.
  enable_default_security_group = true

  # (Optional) A boolean flag to enable/disable DNS hostnames in the VPC.
  # Defaults true.
  enable_dns_hostnames = true

  # (Optional) A boolean flag to enable/disable DNS support in the VPC. Defaults
  # true.
  enable_dns_support = true

  # (Optional) Enables IPv6 resources for the VPC. Defaults to false.
  enable_ipv6 = false

  # (Optional) A boolean flag to enable/disable network address usage metrics in
  # the VPC. Defaults false.
  enable_network_address_usage_metrics = false

  # (Optional) A boolean flag to enable/disable a private NAT gateway. If this
  # is set to true, it will disable public NAT gateways. Private NAT gateways
  # are deployed into transit subnets and require setting
  # 'var.create_transit_subnets = true'. Defaults false.
  enable_private_nat = false

  # Additional IAM policies to apply to the S3 bucket to store flow logs. You
  # can use this to grant read/write access beyond what is provided to the VPC.
  # This should be a map, where each key is a unique statement ID (SID), and
  # each value is an object that contains the parameters defined in the comment
  # below.
  flow_log_additional_s3_bucket_policy_statements = null

  # The name to use for the flow log IAM role. This can be useful if you
  # provision the VPC without admin privileges which needs setting IAM:PassRole
  # on deployment role. When null, a default name based on the VPC name will be
  # chosen.
  flow_log_cloudwatch_iam_role_name = null

  # The name to use for the CloudWatch Log group used for storing flow log. When
  # null, a default name based on the VPC name will be chosen.
  flow_log_cloudwatch_log_group_name = null

  # Specifies the number of days you want to retain log events. Possible values
  # are: 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1096,
  # 1827, 2192, 2557, 2922, 3288, 3653, and 0. If you select 0, the events in
  # the log group are always retained and never expire.
  flow_log_cloudwatch_log_group_retention_in_days = 0

  # A map of options to apply to the destination. Valid keys are file_format,
  # hive_compatible_partitions, and per_hour_partition.
  flow_log_destination_options = null

  # The destination for the flow log. Valid values are cloud-watch-logs or s3.
  # Defaults to cloud-watch-logs.
  flow_log_destination_type = "cloud-watch-logs"

  # Boolean to determine whether to use a custom S3 bucket for the flow log
  # destination. If set to true, you must specify the flow_log_s3_bucket_arn
  # variable. Defaults to false.
  flow_log_enable_custom_s3_destination = false

  # Boolean to determine whether flow logs should be deleted if the S3 bucket is
  # removed by terraform. Defaults to false.
  flow_log_force_destroy_bucket = false

  # The maximum interval of time during which a flow of packets is captured and
  # aggregated into a flow log record. Valid values: 60 seconds (1 minute) or
  # 600 seconds (10 minutes).
  flow_log_max_aggregation_interval = 600

  # The existing S3 bucket arn to use for the flow log destination. If this is
  # not set, a new S3 bucket will be created. Defaults to null.
  flow_log_s3_bucket_arn = null

  # The name to use for the S3 bucket created along with the VPC flow log
  # resources.
  flow_log_s3_bucket_name = null

  # For s3 log destinations, the number of days after which to expire
  # (permanently delete) flow logs. Defaults to 365.
  flow_log_s3_expiration_transition = 365

  # For s3 log destinations, the number of days after which to transition the
  # flow log objects to glacier. Defaults to 180.
  flow_log_s3_glacier_transition = 180

  # For s3 log destinations, the number of days after which to transition the
  # flow log objects to infrequent access. Defaults to 30.
  flow_log_s3_infrequent_access_transition = 30

  # If log_destination_type is s3, optionally specify a subfolder for flow log
  # delivery.
  flow_log_s3_subfolder = ""

  # The type of traffic to capture in the VPC flow log. Valid values include
  # ACCEPT, REJECT, or ALL. Defaults to REJECT. Only used if create_flow_logs is
  # true.
  flow_logs_traffic_type = "REJECT"

  # The amount of spacing between the different subnet types when all subnets
  # are present, such as the transit subnets.
  global_subnet_spacing = 6

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role.
  iam_role_permissions_boundary = null

  # Filters to select the IPv4 IPAM pool to use for allocated this VPCs
  ipv4_ipam_pool_filters = null

  # The ID of an IPv4 IPAM pool you want to use for allocating this VPC's CIDR.
  ipv4_ipam_pool_id = null

  # (Optional) The length of the IPv4 CIDR netmask. Requires utilizing an
  # ipv4_ipam_pool_id. Defaults to null.
  ipv4_netmask_length = null

  # (Optional) IPv6 CIDR block to request from an IPAM Pool. Can be set
  # explicitly or derived from IPAM using ipv6_netmask_length. If not provided,
  # no IPv6 CIDR block will be allocated.
  ipv6_cidr_block = null

  # (Optional) By default when an IPv6 CIDR is assigned to a VPC a default
  # ipv6_cidr_block_network_border_group will be set to the region of the VPC.
  # This can be changed to restrict advertisement of public addresses to
  # specific Network Border Groups such as LocalZones.
  ipv6_cidr_block_network_border_group = null

  # Filters to select the IPv6 IPAM pool to use for allocated this VPCs
  ipv6_ipam_pool_filters = null

  # (Optional) IPAM Pool ID for a IPv6 pool. Conflicts with
  # assign_generated_ipv6_cidr_block.
  ipv6_ipam_pool_id = null

  # (Optional) Netmask length to request from IPAM Pool. Conflicts with
  # ipv6_cidr_block. This can be omitted if IPAM pool as a
  # allocation_default_netmask_length set. Valid values: 56.
  ipv6_netmask_length = null

  # (Optional) The number of additional bits to use in the VPC IPv6 CIDR block.
  # The end result must be between a /56 netmask and /64 netmask. These bits are
  # added to the VPC CIDR block bits. Example: /56 + 8 bits = /64 Defaults to 8
  # bits for a /64.
  ipv6_subnet_bits = 8

  # The ARN of a KMS key to use for encrypting VPC the flow log. A new KMS key
  # will be created if this is not supplied.
  kms_key_arn = null

  # The number of days to retain this KMS Key (a Customer Master Key) after it
  # has been marked for deletion. Setting to null defaults to the provider
  # default, which is the maximum possible value (30 days).
  kms_key_deletion_window_in_days = null

  # VPC Flow Logs will be encrypted with a KMS Key (a Customer Master Key). The
  # IAM Users specified in this list will have access to this key.
  kms_key_user_iam_arns = null

  # Specify true to indicate that instances launched into the public subnet
  # should be assigned a public IP address (versus a private IP address)
  map_public_ip_on_launch = false

  # A map of tags to apply to the NAT gateways, on top of the custom_tags. The
  # key is the tag name and the value is the tag value. Note that tags defined
  # here will override tags defined as custom_tags in case of conflict.
  nat_gateway_custom_tags = {}

  # The host number in the IP address of the NAT Gateway. You would only use
  # this if you want the NAT Gateway to always have the same host number within
  # your subnet's CIDR range: e.g., it's always x.x.x.4. For IPv4, this is the
  # fourth octet in the IP address.
  nat_private_ip_host_num = null

  # (Optional) The number of secondary private IP addresses to assign to each
  # NAT gateway. These IP addresses are used for source NAT (SNAT) for the
  # instances in the private subnets. Defaults to 0.
  nat_secondary_private_ip_address_count = 0

  # How many AWS Availability Zones (AZs) to use. One subnet of each type
  # (public, private app) will be created in each AZ. Note that this must be
  # less than or equal to the total number of AZs in a region. A value of null
  # means all AZs should be used. For example, if you specify 3 in a region with
  # 5 AZs, subnets will be created in just 3 AZs instead of all 5. Defaults to
  # all AZs in a region.
  num_availability_zones = null

  # If set to true, create one route table shared amongst all the public
  # subnets; if set to false, create a separate route table per public subnet.
  # Historically, we created one route table for all the public subnets, as they
  # all routed through the Internet Gateway anyway, but in certain use cases
  # (e.g., for use with Network Firewall), you may want to have separate route
  # tables for each public subnet.
  one_route_table_public_subnets = true

  # The CIDR block of the origin VPC.
  origin_vpc_cidr_block = null

  # The ID of the origin VPC to use when creating peering connections and DNS
  # forwarding.
  origin_vpc_id = null

  # The name of the origin VPC to use when creating peering connections and DNS
  # forwarding.
  origin_vpc_name = null

  # The public subnets in the origin VPC to use when creating route53 resolvers.
  # These are public subnets due to network ACLs restrictions. Although the
  # forwarder is addressable publicly, access is blocked by security groups.
  origin_vpc_public_subnet_ids = null

  # Name to set for the origin VPC resolver (outbound from origin VPC to
  # destination VPC). If null (default), defaults to
  # 'ORIGIN_VPC_NAME-to-DESTINATION_VPC_NAME-out'.
  origin_vpc_resolver_name = null

  # A list of route tables from the origin VPC that should have routes to this
  # app VPC.
  origin_vpc_route_table_ids = []

  # A list of Virtual Private Gateways that will propagate routes to persistence
  # subnets. All routes from VPN connections that use Virtual Private Gateways
  # listed here will appear in route tables of persistence subnets. If left
  # empty, no routes will be propagated.
  persistence_propagating_vgws = []

  # Takes the CIDR prefix and adds these many bits to it for calculating subnet
  # ranges.  MAKE SURE if you change this you also change the CIDR spacing or
  # you may hit errors.  See cidrsubnet interpolation in terraform config for
  # more information.
  persistence_subnet_bits = 5

  # The amount of spacing between the private persistence subnets. Default: 2
  # times the value of private_subnet_spacing.
  persistence_subnet_spacing = null

  # Set to false to prevent the private app subnet from allowing traffic from
  # the transit subnet. Only used if create_transit_subnet_nacls is set to true.
  private_app_allow_inbound_from_transit_network = true

  # A map of unique names to client IP CIDR block and inbound ports that should
  # be exposed in the private app subnet tier nACLs. This is useful when
  # exposing your service on a privileged port with an NLB, where the address
  # isn't translated.
  private_app_allow_inbound_ports_from_cidr = {}

  # A map of unique names to destination IP CIDR block and outbound ports that
  # should be allowed in the private app subnet tier nACLs. This is useful when
  # allowing your VPC specific outbound communication to defined CIDR
  # blocks(known networks)
  private_app_allow_outbound_ports_to_destination_cidr = {}

  # A map of tags to apply to the private-app route table(s), on top of the
  # custom_tags. The key is the tag name and the value is the tag value. Note
  # that tags defined here will override tags defined as custom_tags in case of
  # conflict.
  private_app_route_table_custom_tags = {}

  # A map listing the specific CIDR blocks desired for each private-app subnet.
  # The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of
  # Availability Zones. If left blank, we will compute a reasonable CIDR block
  # for each subnet.
  private_app_subnet_cidr_blocks = {}

  # A map of tags to apply to the private-app Subnet, on top of the custom_tags.
  # The key is the tag name and the value is the tag value. Note that tags
  # defined here will override tags defined as custom_tags in case of conflict.
  private_app_subnet_custom_tags = {}

  # Set to false to prevent the private persistence subnet from allowing traffic
  # from the transit subnet. Only used if create_transit_subnet_nacls is set to
  # true.
  private_persistence_allow_inbound_from_transit_network = true

  # A map of tags to apply to the private-persistence route tables(s), on top of
  # the custom_tags. The key is the tag name and the value is the tag value.
  # Note that tags defined here will override tags defined as custom_tags in
  # case of conflict.
  private_persistence_route_table_custom_tags = {}

  # A map listing the specific CIDR blocks desired for each private-persistence
  # subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the
  # number of Availability Zones. If left blank, we will compute a reasonable
  # CIDR block for each subnet.
  private_persistence_subnet_cidr_blocks = {}

  # A map of tags to apply to the private-persistence Subnet, on top of the
  # custom_tags. The key is the tag name and the value is the tag value. Note
  # that tags defined here will override tags defined as custom_tags in case of
  # conflict.
  private_persistence_subnet_custom_tags = {}

  # The name of the private persistence subnet tier. This is used to tag the
  # subnet and its resources.
  private_persistence_subnet_name = "private-persistence"

  # A list of Virtual Private Gateways that will propagate routes to private
  # subnets. All routes from VPN connections that use Virtual Private Gateways
  # listed here will appear in route tables of private subnets. If left empty,
  # no routes will be propagated.
  private_propagating_vgws = []

  # Takes the CIDR prefix and adds these many bits to it for calculating subnet
  # ranges.  MAKE SURE if you change this you also change the CIDR spacing or
  # you may hit errors.  See cidrsubnet interpolation in terraform config for
  # more information.
  private_subnet_bits = 5

  # The name of the private subnet tier. This is used to tag the subnet and its
  # resources.
  private_subnet_name = "private-app"

  # The amount of spacing between private app subnets. Defaults to
  # subnet_spacing in vpc-app module if not set.
  private_subnet_spacing = null

  # A list of Virtual Private Gateways that will propagate routes to public
  # subnets. All routes from VPN connections that use Virtual Private Gateways
  # listed here will appear in route tables of public subnets. If left empty, no
  # routes will be propagated.
  public_propagating_vgws = []

  # A map of tags to apply to the public route table(s), on top of the
  # custom_tags. The key is the tag name and the value is the tag value. Note
  # that tags defined here will override tags defined as custom_tags in case of
  # conflict.
  public_route_table_custom_tags = {}

  # Takes the CIDR prefix and adds these many bits to it for calculating subnet
  # ranges.  MAKE SURE if you change this you also change the CIDR spacing or
  # you may hit errors.  See cidrsubnet interpolation in terraform config for
  # more information.
  public_subnet_bits = 5

  # A map listing the specific CIDR blocks desired for each public subnet. The
  # key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of
  # Availability Zones. If left blank, we will compute a reasonable CIDR block
  # for each subnet.
  public_subnet_cidr_blocks = {}

  # A map of tags to apply to the public Subnet, on top of the custom_tags. The
  # key is the tag name and the value is the tag value. Note that tags defined
  # here will override tags defined as custom_tags in case of conflict.
  public_subnet_custom_tags = {}

  # (Optional) A map listing the specific IPv6 CIDR blocks desired for each
  # public subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is
  # the number of Availability Zones. If left blank, we will compute a
  # reasonable CIDR block for each subnet.
  public_subnet_ipv6_cidr_blocks = {}

  # The name of the public subnet tier. This is used to tag the subnet and its
  # resources.
  public_subnet_name = "public"

  # The timeout for the creation of the Route Tables. It defines how long to
  # wait for a route table to be created before considering the operation
  # failed. Ref:
  # https://www.terraform.io/language/resources/syntax#operation-timeouts
  route_table_creation_timeout = "5m"

  # The timeout for the deletion of the Route Tables. It defines how long to
  # wait for a route table to be deleted before considering the operation
  # failed. Ref:
  # https://www.terraform.io/language/resources/syntax#operation-timeouts
  route_table_deletion_timeout = "5m"

  # The timeout for the update of the Route Tables. It defines how long to wait
  # for a route table to be updated before considering the operation failed.
  # Ref: https://www.terraform.io/language/resources/syntax#operation-timeouts
  route_table_update_timeout = "2m"

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  s3_endpoint_policy = null

  # A list of secondary CIDR blocks to associate with the VPC.
  secondary_cidr_blocks = []

  # A map of tags to apply to the default Security Group, on top of the
  # custom_tags. The key is the tag name and the value is the tag value. Note
  # that tags defined here will override tags defined as custom_tags in case of
  # conflict.
  security_group_tags = {}

  # The amount of spacing between the different subnet types
  subnet_spacing = 10

  # The VPC resources need special tags for discoverability by Kubernetes to use
  # with certain features, like deploying ALBs.
  tag_for_use_with_eks = false

  # The allowed tenancy of instances launched into the selected VPC. Must be one
  # of: default, dedicated, or host.
  tenancy = "default"

  # A list of Virtual Private Gateways that will propagate routes to transit
  # subnets. All routes from VPN connections that use Virtual Private Gateways
  # listed here will appear in route tables of transit subnets. If left empty,
  # no routes will be propagated.
  transit_propagating_vgws = []

  # A map of tags to apply to the transit route table(s), on top of the
  # custom_tags. The key is the tag name and the value is the tag value. Note
  # that tags defined here will override tags defined as custom_tags in case of
  # conflict.
  transit_route_table_custom_tags = {}

  # Takes the CIDR prefix and adds these many bits to it for calculating subnet
  # ranges.  MAKE SURE if you change this you also change the CIDR spacing or
  # you may hit errors.  See cidrsubnet interpolation in terraform config for
  # more information.
  transit_subnet_bits = 5

  # A map listing the specific CIDR blocks desired for each transit subnet. The
  # key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of
  # Availability Zones. If left blank, we will compute a reasonable CIDR block
  # for each subnet.
  transit_subnet_cidr_blocks = {}

  # A map of tags to apply to the transit Subnet, on top of the custom_tags. The
  # key is the tag name and the value is the tag value. Note that tags defined
  # here will override tags defined as custom_tags in case of conflict.
  transit_subnet_custom_tags = {}

  # The name of the transit subnet tier. This is used to tag the subnet and its
  # resources.
  transit_subnet_name = "transit"

  # The amount of spacing between the transit subnets.
  transit_subnet_spacing = null

  # Set to true to use existing EIPs, passed in via var.custom_nat_eips, for the
  # NAT gateway(s), instead of creating new ones.
  use_custom_nat_eips = false

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

  # A map of tags to apply just to the VPC itself, but not any of the other
  # resources. The key is the tag name and the value is the tag value. Note that
  # tags defined here will override tags defined as custom_tags in case of
  # conflict.
  vpc_custom_tags = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/networking/vpc?ref=v0.118.17"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The IP address range of the VPC in CIDR notation. A prefix of /18 is
  # recommended. Do not use a prefix higher than /27. Examples include
  # '10.100.0.0/18', '10.200.0.0/18', etc.
  cidr_block = <string>

  # The number of NAT Gateways to launch for this VPC. For production VPCs, a
  # NAT Gateway should be placed in each Availability Zone (so likely 3 total),
  # whereas for non-prod VPCs, just one Availability Zone (and hence 1 NAT
  # Gateway) will suffice.
  num_nat_gateways = <number>

  # Name of the VPC. Examples include 'prod', 'dev', 'mgmt', etc.
  vpc_name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Should the private persistence subnet be allowed outbound access to the
  # internet?
  allow_private_persistence_internet_access = false

  # Should the transit subnet be allowed outbound access to the internet?
  allow_transit_internet_access = false

  # If true, will apply the default NACL rules in var.default_nacl_ingress_rules
  # and var.default_nacl_egress_rules on the default NACL of the VPC. Note that
  # every VPC must have a default NACL - when this is false, the original
  # default NACL rules managed by AWS will be used.
  apply_default_nacl_rules = false

  # (Optional) Requests an Amazon-provided IPv6 CIDR block with a /56 prefix
  # length for the VPC. You cannot specify the range of IP addresses, or the
  # size of the CIDR block. Conflicts with ipv6_ipam_pool_id
  assign_generated_ipv6_cidr_block = null

  # (Optional) Specify true to indicate that network interfaces created in the
  # specified subnet should be assigned an IPv6 address. Default is false
  assign_ipv6_address_on_creation = false

  # If true, will associate the default NACL to the public, private, and
  # persistence subnets created by this module. Only used if
  # var.apply_default_nacl_rules is true. Note that this does not guarantee that
  # the subnets are associated with the default NACL. Subnets can only be
  # associated with a single NACL. The default NACL association will be dropped
  # if the subnets are associated with a custom NACL later.
  associate_default_nacl_to_subnets = true

  # List of excluded Availability Zone IDs.
  availability_zone_exclude_ids = []

  # Specific Availability Zones in which subnets SHOULD NOT be created. Useful
  # for when features / support is missing from a given AZ.
  availability_zone_exclude_names = []

  # List of specific Availability Zone IDs to use. If null (default), all
  # availability zones in the configured AWS region will be used.
  availability_zone_ids = null

  # Allows to filter list of Availability Zones based on their current state.
  # Can be either "available", "information", "impaired" or "unavailable". By
  # default the list includes a complete set of Availability Zones to which the
  # underlying AWS account has access, regardless of their state.
  availability_zone_state = null

  # DEPRECATED. The AWS Region where this VPC will exist. This variable is no
  # longer used and only kept around for backwards compatibility. We now
  # automatically fetch the region using a data source.
  aws_region = ""

  # The base number to append to initial nacl rule number for the first transit
  # rule in private and persistence rules created. All transit rules will be
  # inserted after this number. This base number provides a safeguard to ensure
  # that the transit rules do not overwrite any existing NACL rules in private
  # and persistence subnets.
  base_transit_nacl_rule_number = 1000

  # A map of tags to apply to the Blackhole ENI. The key is the tag name and the
  # value is the tag value. Note that the tag 'Name' is automatically added by
  # this module but may be optionally overwritten by this variable.
  blackhole_network_interface_custom_tags = {}

  # The description of the Blackhole ENI.
  blackhole_network_interface_description = "Blackhole ENI - DO NOT ATTACH TO INSTANCES"

  # The host number in the IP address of the Blackhole ENI. You would only use
  # this if you want the blackhole ENI to always have the same host number
  # within your subnet's CIDR range: e.g., it's always x.x.x.4. For IPv4, this
  # is the fourth octet in the IP address. For IPv6, this is the sixth hextet in
  # the IP address.
  blackhole_network_interface_host_num = null

  # The name of the Blackhole ENI.
  blackhole_network_interface_name = "Blackhole ENI - DO NOT ATTACH TO INSTANCES"

  # A map of objects defining which blackhole routes to create. The key should
  # be the name of a subnet tier: one of public, private-app,
  # private-persistence, or transit. The value should be an object that
  # specifies the CIDR blocks or the names of other subnet tiers (from the same
  # list of public, private-app, private-persistence, transit) to blackhole.
  blackhole_routes = {}

  # If set to true, this module will create a default route table route to the
  # Internet Gateway. If set to false, this module will NOT create a default
  # route table route to the Internet Gateway. This is useful if you have
  # subnets which utilize the default route table. Defaults to true.
  create_default_route_table_route = true

  # Whether or not to create DNS forwarders from the Mgmt VPC to the App VPC to
  # resolve private Route 53 endpoints. This is most useful when you want to
  # keep your EKS Kubernetes API endpoint private to the VPC, but want to access
  # it from the Mgmt VPC (where your VPN/Bastion servers are).
  create_dns_forwarder = false

  # If you set this variable to false, this module will not create VPC Flow Logs
  # resources. This is used as a workaround because Terraform does not allow you
  # to use the 'count' parameter on modules. By using this parameter, you can
  # optionally create or not create the resources within this module.
  create_flow_logs = true

  # Whether the VPC will create an Internet Gateway. There are use cases when
  # the VPC is desired to not be routable from the internet, and hence, they
  # should not have an Internet Gateway. For example, when it is desired that
  # public subnets exist but they are not directly public facing, since they can
  # be routed from other VPC hosting the IGW.
  create_igw = true

  # If set to false, this module will NOT create Network ACLs. This is useful if
  # you don't want to use Network ACLs or you want to provide your own Network
  # ACLs outside of this module.
  create_network_acls = true

  # Whether or not to create a peering connection to another VPC.
  create_peering_connection = false

  # If set to false, this module will NOT create the NACLs for the private app
  # subnet tier.
  create_private_app_subnet_nacls = true

  # If set to false, this module will NOT create the private app subnet tier.
  create_private_app_subnets = true

  # If set to false, this module will NOT create the NACLs for the private
  # persistence subnet tier.
  create_private_persistence_subnet_nacls = true

  # If set to false, this module will NOT create the private persistence subnet
  # tier.
  create_private_persistence_subnets = true

  # If set to false, this module will NOT create the NACLs for the public subnet
  # tier. This is useful for VPCs that only need private subnets.
  create_public_subnet_nacls = true

  # If set to false, this module will NOT create the public subnet tier. This is
  # useful for VPCs that only need private subnets. Note that setting this to
  # false also means the module will NOT create an Internet Gateway or the NAT
  # gateways, so if you want any public Internet access in the VPC (even
  # outbound access—e.g., to run apt get), you'll need to provide it yourself
  # via some other mechanism (e.g., via VPC peering, a Transit Gateway, Direct
  # Connect, etc).
  create_public_subnets = true

  # If set to false, this module will NOT create the NACLs for the transit
  # subnet tier.
  create_transit_subnet_nacls = false

  # If set to false, this module will NOT create the transit subnet tier.
  create_transit_subnets = false

  # Create VPC endpoints for S3 and DynamoDB.
  create_vpc_endpoints = true

  # The list of EIPs (allocation ids) to use for the NAT gateways. Their number
  # has to match the one given in 'num_nat_gateways'. Must be set if
  # var.use_custom_nat_eips us true.
  custom_nat_eips = []

  # A map of tags to apply to the VPC, Subnets, Route Tables, Internet Gateway,
  # default security group, and default NACLs. The key is the tag name and the
  # value is the tag value. Note that the tag 'Name' is automatically added by
  # this module but may be optionally overwritten by this variable.
  custom_tags = {}

  # The egress rules to apply to the default NACL in the VPC. This is the
  # security group that is used by any subnet that doesn't have its own NACL
  # attached. The value for this variable must be a map where the keys are a
  # unique name for each rule and the values are objects with the same fields as
  # the egress block in the aws_default_network_acl resource:
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_network_acl.
  default_nacl_egress_rules = {"AllowAll":{"action":"allow","cidr_block":"0.0.0.0/0","from_port":0,"protocol":"-1","rule_no":100,"to_port":0}}

  # The ingress rules to apply to the default NACL in the VPC. This is the NACL
  # that is used by any subnet that doesn't have its own NACL attached. The
  # value for this variable must be a map where the keys are a unique name for
  # each rule and the values are objects with the same fields as the ingress
  # block in the aws_default_network_acl resource:
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_network_acl.
  default_nacl_ingress_rules = {"AllowAll":{"action":"allow","cidr_block":"0.0.0.0/0","from_port":0,"protocol":"-1","rule_no":100,"to_port":0}}

  # The egress rules to apply to the default security group in the VPC. This is
  # the security group that is used by any resource that doesn't have its own
  # security group attached. The value for this variable must be a map where the
  # keys are a unique name for each rule and the values are objects with the
  # same fields as the egress block in the aws_default_security_group resource:
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_security_group#egress-block.
  default_security_group_egress_rules = {"AllowAllOutbound":{"cidr_blocks":["0.0.0.0/0"],"from_port":0,"ipv6_cidr_blocks":["::/0"],"protocol":"-1","to_port":0}}

  # The ingress rules to apply to the default security group in the VPC. This is
  # the security group that is used by any resource that doesn't have its own
  # security group attached. The value for this variable must be a map where the
  # keys are a unique name for each rule and the values are objects with the
  # same fields as the ingress block in the aws_default_security_group resource:
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_security_group#ingress-block.
  default_security_group_ingress_rules = {"AllowAllFromSelf":{"from_port":0,"protocol":"-1","self":true,"to_port":0}}

  # Name to set for the destination VPC resolver (inbound from origin VPC to
  # destination VPC). If null (default), defaults to
  # 'DESTINATION_VPC_NAME-from-ORIGIN_VPC_NAME-in'.
  destination_vpc_resolver_name = null

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  dynamodb_endpoint_policy = null

  # The names of EKS clusters that will be deployed into the VPC, if
  # var.tag_for_use_with_eks is true.
  eks_cluster_names = []

  # If set to false, the default security groups will NOT be created.
  enable_default_security_group = true

  # (Optional) A boolean flag to enable/disable DNS hostnames in the VPC.
  # Defaults true.
  enable_dns_hostnames = true

  # (Optional) A boolean flag to enable/disable DNS support in the VPC. Defaults
  # true.
  enable_dns_support = true

  # (Optional) Enables IPv6 resources for the VPC. Defaults to false.
  enable_ipv6 = false

  # (Optional) A boolean flag to enable/disable network address usage metrics in
  # the VPC. Defaults false.
  enable_network_address_usage_metrics = false

  # (Optional) A boolean flag to enable/disable a private NAT gateway. If this
  # is set to true, it will disable public NAT gateways. Private NAT gateways
  # are deployed into transit subnets and require setting
  # 'var.create_transit_subnets = true'. Defaults false.
  enable_private_nat = false

  # Additional IAM policies to apply to the S3 bucket to store flow logs. You
  # can use this to grant read/write access beyond what is provided to the VPC.
  # This should be a map, where each key is a unique statement ID (SID), and
  # each value is an object that contains the parameters defined in the comment
  # below.
  flow_log_additional_s3_bucket_policy_statements = null

  # The name to use for the flow log IAM role. This can be useful if you
  # provision the VPC without admin privileges which needs setting IAM:PassRole
  # on deployment role. When null, a default name based on the VPC name will be
  # chosen.
  flow_log_cloudwatch_iam_role_name = null

  # The name to use for the CloudWatch Log group used for storing flow log. When
  # null, a default name based on the VPC name will be chosen.
  flow_log_cloudwatch_log_group_name = null

  # Specifies the number of days you want to retain log events. Possible values
  # are: 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1096,
  # 1827, 2192, 2557, 2922, 3288, 3653, and 0. If you select 0, the events in
  # the log group are always retained and never expire.
  flow_log_cloudwatch_log_group_retention_in_days = 0

  # A map of options to apply to the destination. Valid keys are file_format,
  # hive_compatible_partitions, and per_hour_partition.
  flow_log_destination_options = null

  # The destination for the flow log. Valid values are cloud-watch-logs or s3.
  # Defaults to cloud-watch-logs.
  flow_log_destination_type = "cloud-watch-logs"

  # Boolean to determine whether to use a custom S3 bucket for the flow log
  # destination. If set to true, you must specify the flow_log_s3_bucket_arn
  # variable. Defaults to false.
  flow_log_enable_custom_s3_destination = false

  # Boolean to determine whether flow logs should be deleted if the S3 bucket is
  # removed by terraform. Defaults to false.
  flow_log_force_destroy_bucket = false

  # The maximum interval of time during which a flow of packets is captured and
  # aggregated into a flow log record. Valid values: 60 seconds (1 minute) or
  # 600 seconds (10 minutes).
  flow_log_max_aggregation_interval = 600

  # The existing S3 bucket arn to use for the flow log destination. If this is
  # not set, a new S3 bucket will be created. Defaults to null.
  flow_log_s3_bucket_arn = null

  # The name to use for the S3 bucket created along with the VPC flow log
  # resources.
  flow_log_s3_bucket_name = null

  # For s3 log destinations, the number of days after which to expire
  # (permanently delete) flow logs. Defaults to 365.
  flow_log_s3_expiration_transition = 365

  # For s3 log destinations, the number of days after which to transition the
  # flow log objects to glacier. Defaults to 180.
  flow_log_s3_glacier_transition = 180

  # For s3 log destinations, the number of days after which to transition the
  # flow log objects to infrequent access. Defaults to 30.
  flow_log_s3_infrequent_access_transition = 30

  # If log_destination_type is s3, optionally specify a subfolder for flow log
  # delivery.
  flow_log_s3_subfolder = ""

  # The type of traffic to capture in the VPC flow log. Valid values include
  # ACCEPT, REJECT, or ALL. Defaults to REJECT. Only used if create_flow_logs is
  # true.
  flow_logs_traffic_type = "REJECT"

  # The amount of spacing between the different subnet types when all subnets
  # are present, such as the transit subnets.
  global_subnet_spacing = 6

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role.
  iam_role_permissions_boundary = null

  # Filters to select the IPv4 IPAM pool to use for allocated this VPCs
  ipv4_ipam_pool_filters = null

  # The ID of an IPv4 IPAM pool you want to use for allocating this VPC's CIDR.
  ipv4_ipam_pool_id = null

  # (Optional) The length of the IPv4 CIDR netmask. Requires utilizing an
  # ipv4_ipam_pool_id. Defaults to null.
  ipv4_netmask_length = null

  # (Optional) IPv6 CIDR block to request from an IPAM Pool. Can be set
  # explicitly or derived from IPAM using ipv6_netmask_length. If not provided,
  # no IPv6 CIDR block will be allocated.
  ipv6_cidr_block = null

  # (Optional) By default when an IPv6 CIDR is assigned to a VPC a default
  # ipv6_cidr_block_network_border_group will be set to the region of the VPC.
  # This can be changed to restrict advertisement of public addresses to
  # specific Network Border Groups such as LocalZones.
  ipv6_cidr_block_network_border_group = null

  # Filters to select the IPv6 IPAM pool to use for allocated this VPCs
  ipv6_ipam_pool_filters = null

  # (Optional) IPAM Pool ID for a IPv6 pool. Conflicts with
  # assign_generated_ipv6_cidr_block.
  ipv6_ipam_pool_id = null

  # (Optional) Netmask length to request from IPAM Pool. Conflicts with
  # ipv6_cidr_block. This can be omitted if IPAM pool as a
  # allocation_default_netmask_length set. Valid values: 56.
  ipv6_netmask_length = null

  # (Optional) The number of additional bits to use in the VPC IPv6 CIDR block.
  # The end result must be between a /56 netmask and /64 netmask. These bits are
  # added to the VPC CIDR block bits. Example: /56 + 8 bits = /64 Defaults to 8
  # bits for a /64.
  ipv6_subnet_bits = 8

  # The ARN of a KMS key to use for encrypting VPC the flow log. A new KMS key
  # will be created if this is not supplied.
  kms_key_arn = null

  # The number of days to retain this KMS Key (a Customer Master Key) after it
  # has been marked for deletion. Setting to null defaults to the provider
  # default, which is the maximum possible value (30 days).
  kms_key_deletion_window_in_days = null

  # VPC Flow Logs will be encrypted with a KMS Key (a Customer Master Key). The
  # IAM Users specified in this list will have access to this key.
  kms_key_user_iam_arns = null

  # Specify true to indicate that instances launched into the public subnet
  # should be assigned a public IP address (versus a private IP address)
  map_public_ip_on_launch = false

  # A map of tags to apply to the NAT gateways, on top of the custom_tags. The
  # key is the tag name and the value is the tag value. Note that tags defined
  # here will override tags defined as custom_tags in case of conflict.
  nat_gateway_custom_tags = {}

  # The host number in the IP address of the NAT Gateway. You would only use
  # this if you want the NAT Gateway to always have the same host number within
  # your subnet's CIDR range: e.g., it's always x.x.x.4. For IPv4, this is the
  # fourth octet in the IP address.
  nat_private_ip_host_num = null

  # (Optional) The number of secondary private IP addresses to assign to each
  # NAT gateway. These IP addresses are used for source NAT (SNAT) for the
  # instances in the private subnets. Defaults to 0.
  nat_secondary_private_ip_address_count = 0

  # How many AWS Availability Zones (AZs) to use. One subnet of each type
  # (public, private app) will be created in each AZ. Note that this must be
  # less than or equal to the total number of AZs in a region. A value of null
  # means all AZs should be used. For example, if you specify 3 in a region with
  # 5 AZs, subnets will be created in just 3 AZs instead of all 5. Defaults to
  # all AZs in a region.
  num_availability_zones = null

  # If set to true, create one route table shared amongst all the public
  # subnets; if set to false, create a separate route table per public subnet.
  # Historically, we created one route table for all the public subnets, as they
  # all routed through the Internet Gateway anyway, but in certain use cases
  # (e.g., for use with Network Firewall), you may want to have separate route
  # tables for each public subnet.
  one_route_table_public_subnets = true

  # The CIDR block of the origin VPC.
  origin_vpc_cidr_block = null

  # The ID of the origin VPC to use when creating peering connections and DNS
  # forwarding.
  origin_vpc_id = null

  # The name of the origin VPC to use when creating peering connections and DNS
  # forwarding.
  origin_vpc_name = null

  # The public subnets in the origin VPC to use when creating route53 resolvers.
  # These are public subnets due to network ACLs restrictions. Although the
  # forwarder is addressable publicly, access is blocked by security groups.
  origin_vpc_public_subnet_ids = null

  # Name to set for the origin VPC resolver (outbound from origin VPC to
  # destination VPC). If null (default), defaults to
  # 'ORIGIN_VPC_NAME-to-DESTINATION_VPC_NAME-out'.
  origin_vpc_resolver_name = null

  # A list of route tables from the origin VPC that should have routes to this
  # app VPC.
  origin_vpc_route_table_ids = []

  # A list of Virtual Private Gateways that will propagate routes to persistence
  # subnets. All routes from VPN connections that use Virtual Private Gateways
  # listed here will appear in route tables of persistence subnets. If left
  # empty, no routes will be propagated.
  persistence_propagating_vgws = []

  # Takes the CIDR prefix and adds these many bits to it for calculating subnet
  # ranges.  MAKE SURE if you change this you also change the CIDR spacing or
  # you may hit errors.  See cidrsubnet interpolation in terraform config for
  # more information.
  persistence_subnet_bits = 5

  # The amount of spacing between the private persistence subnets. Default: 2
  # times the value of private_subnet_spacing.
  persistence_subnet_spacing = null

  # Set to false to prevent the private app subnet from allowing traffic from
  # the transit subnet. Only used if create_transit_subnet_nacls is set to true.
  private_app_allow_inbound_from_transit_network = true

  # A map of unique names to client IP CIDR block and inbound ports that should
  # be exposed in the private app subnet tier nACLs. This is useful when
  # exposing your service on a privileged port with an NLB, where the address
  # isn't translated.
  private_app_allow_inbound_ports_from_cidr = {}

  # A map of unique names to destination IP CIDR block and outbound ports that
  # should be allowed in the private app subnet tier nACLs. This is useful when
  # allowing your VPC specific outbound communication to defined CIDR
  # blocks(known networks)
  private_app_allow_outbound_ports_to_destination_cidr = {}

  # A map of tags to apply to the private-app route table(s), on top of the
  # custom_tags. The key is the tag name and the value is the tag value. Note
  # that tags defined here will override tags defined as custom_tags in case of
  # conflict.
  private_app_route_table_custom_tags = {}

  # A map listing the specific CIDR blocks desired for each private-app subnet.
  # The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of
  # Availability Zones. If left blank, we will compute a reasonable CIDR block
  # for each subnet.
  private_app_subnet_cidr_blocks = {}

  # A map of tags to apply to the private-app Subnet, on top of the custom_tags.
  # The key is the tag name and the value is the tag value. Note that tags
  # defined here will override tags defined as custom_tags in case of conflict.
  private_app_subnet_custom_tags = {}

  # Set to false to prevent the private persistence subnet from allowing traffic
  # from the transit subnet. Only used if create_transit_subnet_nacls is set to
  # true.
  private_persistence_allow_inbound_from_transit_network = true

  # A map of tags to apply to the private-persistence route tables(s), on top of
  # the custom_tags. The key is the tag name and the value is the tag value.
  # Note that tags defined here will override tags defined as custom_tags in
  # case of conflict.
  private_persistence_route_table_custom_tags = {}

  # A map listing the specific CIDR blocks desired for each private-persistence
  # subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the
  # number of Availability Zones. If left blank, we will compute a reasonable
  # CIDR block for each subnet.
  private_persistence_subnet_cidr_blocks = {}

  # A map of tags to apply to the private-persistence Subnet, on top of the
  # custom_tags. The key is the tag name and the value is the tag value. Note
  # that tags defined here will override tags defined as custom_tags in case of
  # conflict.
  private_persistence_subnet_custom_tags = {}

  # The name of the private persistence subnet tier. This is used to tag the
  # subnet and its resources.
  private_persistence_subnet_name = "private-persistence"

  # A list of Virtual Private Gateways that will propagate routes to private
  # subnets. All routes from VPN connections that use Virtual Private Gateways
  # listed here will appear in route tables of private subnets. If left empty,
  # no routes will be propagated.
  private_propagating_vgws = []

  # Takes the CIDR prefix and adds these many bits to it for calculating subnet
  # ranges.  MAKE SURE if you change this you also change the CIDR spacing or
  # you may hit errors.  See cidrsubnet interpolation in terraform config for
  # more information.
  private_subnet_bits = 5

  # The name of the private subnet tier. This is used to tag the subnet and its
  # resources.
  private_subnet_name = "private-app"

  # The amount of spacing between private app subnets. Defaults to
  # subnet_spacing in vpc-app module if not set.
  private_subnet_spacing = null

  # A list of Virtual Private Gateways that will propagate routes to public
  # subnets. All routes from VPN connections that use Virtual Private Gateways
  # listed here will appear in route tables of public subnets. If left empty, no
  # routes will be propagated.
  public_propagating_vgws = []

  # A map of tags to apply to the public route table(s), on top of the
  # custom_tags. The key is the tag name and the value is the tag value. Note
  # that tags defined here will override tags defined as custom_tags in case of
  # conflict.
  public_route_table_custom_tags = {}

  # Takes the CIDR prefix and adds these many bits to it for calculating subnet
  # ranges.  MAKE SURE if you change this you also change the CIDR spacing or
  # you may hit errors.  See cidrsubnet interpolation in terraform config for
  # more information.
  public_subnet_bits = 5

  # A map listing the specific CIDR blocks desired for each public subnet. The
  # key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of
  # Availability Zones. If left blank, we will compute a reasonable CIDR block
  # for each subnet.
  public_subnet_cidr_blocks = {}

  # A map of tags to apply to the public Subnet, on top of the custom_tags. The
  # key is the tag name and the value is the tag value. Note that tags defined
  # here will override tags defined as custom_tags in case of conflict.
  public_subnet_custom_tags = {}

  # (Optional) A map listing the specific IPv6 CIDR blocks desired for each
  # public subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is
  # the number of Availability Zones. If left blank, we will compute a
  # reasonable CIDR block for each subnet.
  public_subnet_ipv6_cidr_blocks = {}

  # The name of the public subnet tier. This is used to tag the subnet and its
  # resources.
  public_subnet_name = "public"

  # The timeout for the creation of the Route Tables. It defines how long to
  # wait for a route table to be created before considering the operation
  # failed. Ref:
  # https://www.terraform.io/language/resources/syntax#operation-timeouts
  route_table_creation_timeout = "5m"

  # The timeout for the deletion of the Route Tables. It defines how long to
  # wait for a route table to be deleted before considering the operation
  # failed. Ref:
  # https://www.terraform.io/language/resources/syntax#operation-timeouts
  route_table_deletion_timeout = "5m"

  # The timeout for the update of the Route Tables. It defines how long to wait
  # for a route table to be updated before considering the operation failed.
  # Ref: https://www.terraform.io/language/resources/syntax#operation-timeouts
  route_table_update_timeout = "2m"

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  s3_endpoint_policy = null

  # A list of secondary CIDR blocks to associate with the VPC.
  secondary_cidr_blocks = []

  # A map of tags to apply to the default Security Group, on top of the
  # custom_tags. The key is the tag name and the value is the tag value. Note
  # that tags defined here will override tags defined as custom_tags in case of
  # conflict.
  security_group_tags = {}

  # The amount of spacing between the different subnet types
  subnet_spacing = 10

  # The VPC resources need special tags for discoverability by Kubernetes to use
  # with certain features, like deploying ALBs.
  tag_for_use_with_eks = false

  # The allowed tenancy of instances launched into the selected VPC. Must be one
  # of: default, dedicated, or host.
  tenancy = "default"

  # A list of Virtual Private Gateways that will propagate routes to transit
  # subnets. All routes from VPN connections that use Virtual Private Gateways
  # listed here will appear in route tables of transit subnets. If left empty,
  # no routes will be propagated.
  transit_propagating_vgws = []

  # A map of tags to apply to the transit route table(s), on top of the
  # custom_tags. The key is the tag name and the value is the tag value. Note
  # that tags defined here will override tags defined as custom_tags in case of
  # conflict.
  transit_route_table_custom_tags = {}

  # Takes the CIDR prefix and adds these many bits to it for calculating subnet
  # ranges.  MAKE SURE if you change this you also change the CIDR spacing or
  # you may hit errors.  See cidrsubnet interpolation in terraform config for
  # more information.
  transit_subnet_bits = 5

  # A map listing the specific CIDR blocks desired for each transit subnet. The
  # key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of
  # Availability Zones. If left blank, we will compute a reasonable CIDR block
  # for each subnet.
  transit_subnet_cidr_blocks = {}

  # A map of tags to apply to the transit Subnet, on top of the custom_tags. The
  # key is the tag name and the value is the tag value. Note that tags defined
  # here will override tags defined as custom_tags in case of conflict.
  transit_subnet_custom_tags = {}

  # The name of the transit subnet tier. This is used to tag the subnet and its
  # resources.
  transit_subnet_name = "transit"

  # The amount of spacing between the transit subnets.
  transit_subnet_spacing = null

  # Set to true to use existing EIPs, passed in via var.custom_nat_eips, for the
  # NAT gateway(s), instead of creating new ones.
  use_custom_nat_eips = false

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

  # A map of tags to apply just to the VPC itself, but not any of the other
  # resources. The key is the tag name and the value is the tag value. Note that
  # tags defined here will override tags defined as custom_tags in case of
  # conflict.
  vpc_custom_tags = {}

}


```

</TabItem>
</Tabs>



## Reference


<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="cidr_block" requirement="required" type="string">
<HclListItemDescription>

The IP address range of the VPC in CIDR notation. A prefix of /18 is recommended. Do not use a prefix higher than /27. Examples include '10.100.0.0/18', '10.200.0.0/18', etc.

</HclListItemDescription>
</HclListItem>

<HclListItem name="num_nat_gateways" requirement="required" type="number">
<HclListItemDescription>

The number of NAT Gateways to launch for this VPC. For production VPCs, a NAT Gateway should be placed in each Availability Zone (so likely 3 total), whereas for non-prod VPCs, just one Availability Zone (and hence 1 NAT Gateway) will suffice.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_name" requirement="required" type="string">
<HclListItemDescription>

Name of the VPC. Examples include 'prod', 'dev', 'mgmt', etc.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="allow_private_persistence_internet_access" requirement="optional" type="bool">
<HclListItemDescription>

Should the private persistence subnet be allowed outbound access to the internet?

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="allow_transit_internet_access" requirement="optional" type="bool">
<HclListItemDescription>

Should the transit subnet be allowed outbound access to the internet?

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="apply_default_nacl_rules" requirement="optional" type="bool">
<HclListItemDescription>

If true, will apply the default NACL rules in <a href="#default_nacl_ingress_rules"><code>default_nacl_ingress_rules</code></a> and <a href="#default_nacl_egress_rules"><code>default_nacl_egress_rules</code></a> on the default NACL of the VPC. Note that every VPC must have a default NACL - when this is false, the original default NACL rules managed by AWS will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="assign_generated_ipv6_cidr_block" requirement="optional" type="bool">
<HclListItemDescription>

(Optional) Requests an Amazon-provided IPv6 CIDR block with a /56 prefix length for the VPC. You cannot specify the range of IP addresses, or the size of the CIDR block. Conflicts with ipv6_ipam_pool_id

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="assign_ipv6_address_on_creation" requirement="optional" type="bool">
<HclListItemDescription>

(Optional) Specify true to indicate that network interfaces created in the specified subnet should be assigned an IPv6 address. Default is false

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="associate_default_nacl_to_subnets" requirement="optional" type="bool">
<HclListItemDescription>

If true, will associate the default NACL to the public, private, and persistence subnets created by this module. Only used if <a href="#apply_default_nacl_rules"><code>apply_default_nacl_rules</code></a> is true. Note that this does not guarantee that the subnets are associated with the default NACL. Subnets can only be associated with a single NACL. The default NACL association will be dropped if the subnets are associated with a custom NACL later.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="availability_zone_exclude_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

List of excluded Availability Zone IDs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="availability_zone_exclude_names" requirement="optional" type="list(string)">
<HclListItemDescription>

Specific Availability Zones in which subnets SHOULD NOT be created. Useful for when features / support is missing from a given AZ.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="availability_zone_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

List of specific Availability Zone IDs to use. If null (default), all availability zones in the configured AWS region will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="availability_zone_state" requirement="optional" type="string">
<HclListItemDescription>

Allows to filter list of Availability Zones based on their current state. Can be either 'available', 'information', 'impaired' or 'unavailable'. By default the list includes a complete set of Availability Zones to which the underlying AWS account has access, regardless of their state.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="aws_region" requirement="optional" type="string">
<HclListItemDescription>

DEPRECATED. The AWS Region where this VPC will exist. This variable is no longer used and only kept around for backwards compatibility. We now automatically fetch the region using a data source.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="base_transit_nacl_rule_number" requirement="optional" type="number">
<HclListItemDescription>

The base number to append to initial nacl rule number for the first transit rule in private and persistence rules created. All transit rules will be inserted after this number. This base number provides a safeguard to ensure that the transit rules do not overwrite any existing NACL rules in private and persistence subnets.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1000"/>
</HclListItem>

<HclListItem name="blackhole_network_interface_custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the Blackhole ENI. The key is the tag name and the value is the tag value. Note that the tag 'Name' is automatically added by this module but may be optionally overwritten by this variable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="blackhole_network_interface_description" requirement="optional" type="string">
<HclListItemDescription>

The description of the Blackhole ENI.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;Blackhole ENI - DO NOT ATTACH TO INSTANCES&quot;"/>
</HclListItem>

<HclListItem name="blackhole_network_interface_host_num" requirement="optional" type="number">
<HclListItemDescription>

The host number in the IP address of the Blackhole ENI. You would only use this if you want the blackhole ENI to always have the same host number within your subnet's CIDR range: e.g., it's always x.x.x.4. For IPv4, this is the fourth octet in the IP address. For IPv6, this is the sixth hextet in the IP address.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="blackhole_network_interface_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the Blackhole ENI.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;Blackhole ENI - DO NOT ATTACH TO INSTANCES&quot;"/>
</HclListItem>

<HclListItem name="blackhole_routes" requirement="optional" type="map(object(…))">
<HclListItemDescription>

A map of objects defining which blackhole routes to create. The key should be the name of a subnet tier: one of public, private-app, private-persistence, or transit. The value should be an object that specifies the CIDR blocks or the names of other subnet tiers (from the same list of public, private-app, private-persistence, transit) to blackhole.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    destination_cidr_blocks  = list(string)
    destination_subnet_names = list(string)
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="create_default_route_table_route" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, this module will create a default route table route to the Internet Gateway. If set to false, this module will NOT create a default route table route to the Internet Gateway. This is useful if you have subnets which utilize the default route table. Defaults to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_dns_forwarder" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to create DNS forwarders from the Mgmt VPC to the App VPC to resolve private Route 53 endpoints. This is most useful when you want to keep your EKS Kubernetes API endpoint private to the VPC, but want to access it from the Mgmt VPC (where your VPN/Bastion servers are).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="create_flow_logs" requirement="optional" type="bool">
<HclListItemDescription>

If you set this variable to false, this module will not create VPC Flow Logs resources. This is used as a workaround because Terraform does not allow you to use the 'count' parameter on modules. By using this parameter, you can optionally create or not create the resources within this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_igw" requirement="optional" type="bool">
<HclListItemDescription>

Whether the VPC will create an Internet Gateway. There are use cases when the VPC is desired to not be routable from the internet, and hence, they should not have an Internet Gateway. For example, when it is desired that public subnets exist but they are not directly public facing, since they can be routed from other VPC hosting the IGW.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_network_acls" requirement="optional" type="bool">
<HclListItemDescription>

If set to false, this module will NOT create Network ACLs. This is useful if you don't want to use Network ACLs or you want to provide your own Network ACLs outside of this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_peering_connection" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to create a peering connection to another VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="create_private_app_subnet_nacls" requirement="optional" type="bool">
<HclListItemDescription>

If set to false, this module will NOT create the NACLs for the private app subnet tier.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_private_app_subnets" requirement="optional" type="bool">
<HclListItemDescription>

If set to false, this module will NOT create the private app subnet tier.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_private_persistence_subnet_nacls" requirement="optional" type="bool">
<HclListItemDescription>

If set to false, this module will NOT create the NACLs for the private persistence subnet tier.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_private_persistence_subnets" requirement="optional" type="bool">
<HclListItemDescription>

If set to false, this module will NOT create the private persistence subnet tier.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_public_subnet_nacls" requirement="optional" type="bool">
<HclListItemDescription>

If set to false, this module will NOT create the NACLs for the public subnet tier. This is useful for VPCs that only need private subnets.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_public_subnets" requirement="optional" type="bool">
<HclListItemDescription>

If set to false, this module will NOT create the public subnet tier. This is useful for VPCs that only need private subnets. Note that setting this to false also means the module will NOT create an Internet Gateway or the NAT gateways, so if you want any public Internet access in the VPC (even outbound access—e.g., to run apt get), you'll need to provide it yourself via some other mechanism (e.g., via VPC peering, a Transit Gateway, Direct Connect, etc).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_transit_subnet_nacls" requirement="optional" type="bool">
<HclListItemDescription>

If set to false, this module will NOT create the NACLs for the transit subnet tier.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="create_transit_subnets" requirement="optional" type="bool">
<HclListItemDescription>

If set to false, this module will NOT create the transit subnet tier.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="create_vpc_endpoints" requirement="optional" type="bool">
<HclListItemDescription>

Create VPC endpoints for S3 and DynamoDB.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="custom_nat_eips" requirement="optional" type="list(string)">
<HclListItemDescription>

The list of EIPs (allocation ids) to use for the NAT gateways. Their number has to match the one given in 'num_nat_gateways'. Must be set if <a href="#use_custom_nat_eips"><code>use_custom_nat_eips</code></a> us true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the VPC, Subnets, Route Tables, Internet Gateway, default security group, and default NACLs. The key is the tag name and the value is the tag value. Note that the tag 'Name' is automatically added by this module but may be optionally overwritten by this variable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="default_nacl_egress_rules" requirement="optional" type="any">
<HclListItemDescription>

The egress rules to apply to the default NACL in the VPC. This is the security group that is used by any subnet that doesn't have its own NACL attached. The value for this variable must be a map where the keys are a unique name for each rule and the values are objects with the same fields as the egress block in the aws_default_network_acl resource: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_network_acl.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
{
  AllowAll = {
    action = "allow",
    cidr_block = "0.0.0.0/0",
    from_port = 0,
    protocol = "-1",
    rule_no = 100,
    to_port = 0
  }
}
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="default_nacl_ingress_rules" requirement="optional" type="any">
<HclListItemDescription>

The ingress rules to apply to the default NACL in the VPC. This is the NACL that is used by any subnet that doesn't have its own NACL attached. The value for this variable must be a map where the keys are a unique name for each rule and the values are objects with the same fields as the ingress block in the aws_default_network_acl resource: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_network_acl.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
{
  AllowAll = {
    action = "allow",
    cidr_block = "0.0.0.0/0",
    from_port = 0,
    protocol = "-1",
    rule_no = 100,
    to_port = 0
  }
}
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="default_security_group_egress_rules" requirement="optional" type="any">
<HclListItemDescription>

The egress rules to apply to the default security group in the VPC. This is the security group that is used by any resource that doesn't have its own security group attached. The value for this variable must be a map where the keys are a unique name for each rule and the values are objects with the same fields as the egress block in the aws_default_security_group resource: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_security_group#egress-block.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
{
  AllowAllOutbound = {
    cidr_blocks = [
      "0.0.0.0/0"
    ],
    from_port = 0,
    ipv6_cidr_blocks = [
      "::/0"
    ],
    protocol = "-1",
    to_port = 0
  }
}
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="default_security_group_ingress_rules" requirement="optional" type="any">
<HclListItemDescription>

The ingress rules to apply to the default security group in the VPC. This is the security group that is used by any resource that doesn't have its own security group attached. The value for this variable must be a map where the keys are a unique name for each rule and the values are objects with the same fields as the ingress block in the aws_default_security_group resource: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_security_group#ingress-block.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
{
  AllowAllFromSelf = {
    from_port = 0,
    protocol = "-1",
    self = true,
    to_port = 0
  }
}
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="destination_vpc_resolver_name" requirement="optional" type="string">
<HclListItemDescription>

Name to set for the destination VPC resolver (inbound from origin VPC to destination VPC). If null (default), defaults to 'DESTINATION_VPC_NAME-from-ORIGIN_VPC_NAME-in'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="dynamodb_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="eks_cluster_names" requirement="optional" type="list(string)">
<HclListItemDescription>

The names of EKS clusters that will be deployed into the VPC, if <a href="#tag_for_use_with_eks"><code>tag_for_use_with_eks</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="enable_default_security_group" requirement="optional" type="bool">
<HclListItemDescription>

If set to false, the default security groups will NOT be created.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_dns_hostnames" requirement="optional" type="bool">
<HclListItemDescription>

(Optional) A boolean flag to enable/disable DNS hostnames in the VPC. Defaults true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_dns_support" requirement="optional" type="bool">
<HclListItemDescription>

(Optional) A boolean flag to enable/disable DNS support in the VPC. Defaults true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_ipv6" requirement="optional" type="bool">
<HclListItemDescription>

(Optional) Enables IPv6 resources for the VPC. Defaults to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_network_address_usage_metrics" requirement="optional" type="bool">
<HclListItemDescription>

(Optional) A boolean flag to enable/disable network address usage metrics in the VPC. Defaults false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_private_nat" requirement="optional" type="bool">
<HclListItemDescription>

(Optional) A boolean flag to enable/disable a private NAT gateway. If this is set to true, it will disable public NAT gateways. Private NAT gateways are deployed into transit subnets and require setting '<a href="#create_transit_subnets"><code>create_transit_subnets</code></a> = true'. Defaults false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="flow_log_additional_s3_bucket_policy_statements" requirement="optional" type="any">
<HclListItemDescription>

Additional IAM policies to apply to the S3 bucket to store flow logs. You can use this to grant read/write access beyond what is provided to the VPC. This should be a map, where each key is a unique statement ID (SID), and each value is an object that contains the parameters defined in the comment below.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   {
      AllIamUsersReadAccess = {
        effect     = "Allow"
        actions    = ["s3:GetObject"]
        principals = {
          AWS = ["arn:aws:iam::111111111111:user/ann", "arn:aws:iam::111111111111:user/bob"]
        }
        condition = {
          SourceVPCCheck = {
            test = "StringEquals"
            variable = "aws:SourceVpc"
            values = ["vpc-abcd123"]
          }
        }
      }
   }

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   See the 'statement' block in the aws_iam_policy_document data
   source for context: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/iam_policy_document
  
   - effect           string            (optional): Either "Allow" or "Deny", to specify whether this statement allows
                                                    or denies the given actions.
   - actions          list(string)      (optional): A list of actions that this statement either allows or denies. For
                                                    example, ["s3:GetObject", "s3:PutObject"].
   - not_actions      list(string)      (optional): A list of actions that this statement does NOT apply to. Used to
                                                    apply a policy statement to all actions except those listed.
   - principals       map(list(string)) (optional): The principals to which this statement applies. The keys are the
                                                    principal type ("AWS", "Service", or "Federated") and the value is
                                                    a list of identifiers.
   - not_principals   map(list(string)) (optional): The principals to which this statement does NOT apply. The keys are
                                                    the principal type ("AWS", "Service", or "Federated") and the value
                                                    is a list of identifiers.
   - keys             list(string)      (optional): A list of keys within the bucket to which this policy applies. For
                                                    example, ["", "/*"] would apply to (a) the bucket itself and (b)
                                                   all keys within the bucket. The default is [""].
   - condition        map(object)       (optional): A nested configuration block (described below) that defines a
                                                    further, possibly-service-specific condition that constrains
                                                    whether this statement applies.
  
   condition is a map ndition to an object that can define the following properties:
  
   - test             string            (required): The name of the IAM condition operator to evaluate.
   - variable         string            (required): The name of a Context Variable to apply the condition to. Context
                                                    variables may either be standard AWS variables starting with aws:,
                                                    or service-specific variables prefixed with the service name.
   - values           list(string)      (required): The values to evaluate the condition against. If multiple values
                                                    are provided, the condition matches if at least one of them
                                                    applies. (That is, the tests are combined with the "OR" boolean
                                                    operation.)

```
</details>

<details>


```hcl

   Ideally, this would be a map(object({...})), but the Terraform object type constraint doesn't support optional
   parameters, whereas IAM policy statements have many optional params. And we can't even use map(any), as the
   Terraform map type constraint requires all values to have the same type ("shape"), but as each object in the map
   may specify different optional params, this won't work either. So, sadly, we are forced to fall back to "any."

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="flow_log_cloudwatch_iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

The name to use for the flow log IAM role. This can be useful if you provision the VPC without admin privileges which needs setting IAM:PassRole on deployment role. When null, a default name based on the VPC name will be chosen.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="flow_log_cloudwatch_log_group_name" requirement="optional" type="string">
<HclListItemDescription>

The name to use for the CloudWatch Log group used for storing flow log. When null, a default name based on the VPC name will be chosen.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="flow_log_cloudwatch_log_group_retention_in_days" requirement="optional" type="number">
<HclListItemDescription>

Specifies the number of days you want to retain log events. Possible values are: 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1096, 1827, 2192, 2557, 2922, 3288, 3653, and 0. If you select 0, the events in the log group are always retained and never expire.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="flow_log_destination_options" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of options to apply to the destination. Valid keys are file_format, hive_compatible_partitions, and per_hour_partition.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="flow_log_destination_type" requirement="optional" type="string">
<HclListItemDescription>

The destination for the flow log. Valid values are cloud-watch-logs or s3. Defaults to cloud-watch-logs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;cloud-watch-logs&quot;"/>
</HclListItem>

<HclListItem name="flow_log_enable_custom_s3_destination" requirement="optional" type="bool">
<HclListItemDescription>

Boolean to determine whether to use a custom S3 bucket for the flow log destination. If set to true, you must specify the flow_log_s3_bucket_arn variable. Defaults to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="flow_log_force_destroy_bucket" requirement="optional" type="bool">
<HclListItemDescription>

Boolean to determine whether flow logs should be deleted if the S3 bucket is removed by terraform. Defaults to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="flow_log_max_aggregation_interval" requirement="optional" type="number">
<HclListItemDescription>

The maximum interval of time during which a flow of packets is captured and aggregated into a flow log record. Valid values: 60 seconds (1 minute) or 600 seconds (10 minutes).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="600"/>
</HclListItem>

<HclListItem name="flow_log_s3_bucket_arn" requirement="optional" type="string">
<HclListItemDescription>

The existing S3 bucket arn to use for the flow log destination. If this is not set, a new S3 bucket will be created. Defaults to null.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="flow_log_s3_bucket_name" requirement="optional" type="string">
<HclListItemDescription>

The name to use for the S3 bucket created along with the VPC flow log resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="flow_log_s3_expiration_transition" requirement="optional" type="number">
<HclListItemDescription>

For s3 log destinations, the number of days after which to expire (permanently delete) flow logs. Defaults to 365.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="365"/>
</HclListItem>

<HclListItem name="flow_log_s3_glacier_transition" requirement="optional" type="number">
<HclListItemDescription>

For s3 log destinations, the number of days after which to transition the flow log objects to glacier. Defaults to 180.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="180"/>
</HclListItem>

<HclListItem name="flow_log_s3_infrequent_access_transition" requirement="optional" type="number">
<HclListItemDescription>

For s3 log destinations, the number of days after which to transition the flow log objects to infrequent access. Defaults to 30.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="flow_log_s3_subfolder" requirement="optional" type="string">
<HclListItemDescription>

If log_destination_type is s3, optionally specify a subfolder for flow log delivery.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="flow_logs_traffic_type" requirement="optional" type="string">
<HclListItemDescription>

The type of traffic to capture in the VPC flow log. Valid values include ACCEPT, REJECT, or ALL. Defaults to REJECT. Only used if create_flow_logs is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;REJECT&quot;"/>
</HclListItem>

<HclListItem name="global_subnet_spacing" requirement="optional" type="number">
<HclListItemDescription>

The amount of spacing between the different subnet types when all subnets are present, such as the transit subnets.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="6"/>
</HclListItem>

<HclListItem name="iam_role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ipv4_ipam_pool_filters" requirement="optional" type="list(object(…))">
<HclListItemDescription>

Filters to select the IPv4 IPAM pool to use for allocated this VPCs

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    name   = string
    values = list(string)
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ipv4_ipam_pool_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of an IPv4 IPAM pool you want to use for allocating this VPC's CIDR.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ipv4_netmask_length" requirement="optional" type="number">
<HclListItemDescription>

(Optional) The length of the IPv4 CIDR netmask. Requires utilizing an ipv4_ipam_pool_id. Defaults to null.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ipv6_cidr_block" requirement="optional" type="string">
<HclListItemDescription>

(Optional) IPv6 CIDR block to request from an IPAM Pool. Can be set explicitly or derived from IPAM using ipv6_netmask_length. If not provided, no IPv6 CIDR block will be allocated.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ipv6_cidr_block_network_border_group" requirement="optional" type="string">
<HclListItemDescription>

(Optional) By default when an IPv6 CIDR is assigned to a VPC a default ipv6_cidr_block_network_border_group will be set to the region of the VPC. This can be changed to restrict advertisement of public addresses to specific Network Border Groups such as LocalZones.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ipv6_ipam_pool_filters" requirement="optional" type="list(object(…))">
<HclListItemDescription>

Filters to select the IPv6 IPAM pool to use for allocated this VPCs

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    name   = string
    values = list(string)
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ipv6_ipam_pool_id" requirement="optional" type="string">
<HclListItemDescription>

(Optional) IPAM Pool ID for a IPv6 pool. Conflicts with assign_generated_ipv6_cidr_block.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ipv6_netmask_length" requirement="optional" type="number">
<HclListItemDescription>

(Optional) Netmask length to request from IPAM Pool. Conflicts with ipv6_cidr_block. This can be omitted if IPAM pool as a allocation_default_netmask_length set. Valid values: 56.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ipv6_subnet_bits" requirement="optional" type="number">
<HclListItemDescription>

(Optional) The number of additional bits to use in the VPC IPv6 CIDR block. The end result must be between a /56 netmask and /64 netmask. These bits are added to the VPC CIDR block bits. Example: /56 + 8 bits = /64 Defaults to 8 bits for a /64.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="8"/>
</HclListItem>

<HclListItem name="kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of a KMS key to use for encrypting VPC the flow log. A new KMS key will be created if this is not supplied.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="kms_key_deletion_window_in_days" requirement="optional" type="number">
<HclListItemDescription>

The number of days to retain this KMS Key (a Customer Master Key) after it has been marked for deletion. Setting to null defaults to the provider default, which is the maximum possible value (30 days).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="kms_key_user_iam_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

VPC Flow Logs will be encrypted with a KMS Key (a Customer Master Key). The IAM Users specified in this list will have access to this key.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="map_public_ip_on_launch" requirement="optional" type="bool">
<HclListItemDescription>

Specify true to indicate that instances launched into the public subnet should be assigned a public IP address (versus a private IP address)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="nat_gateway_custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the NAT gateways, on top of the custom_tags. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="nat_private_ip_host_num" requirement="optional" type="number">
<HclListItemDescription>

The host number in the IP address of the NAT Gateway. You would only use this if you want the NAT Gateway to always have the same host number within your subnet's CIDR range: e.g., it's always x.x.x.4. For IPv4, this is the fourth octet in the IP address.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="nat_secondary_private_ip_address_count" requirement="optional" type="number">
<HclListItemDescription>

(Optional) The number of secondary private IP addresses to assign to each NAT gateway. These IP addresses are used for source NAT (SNAT) for the instances in the private subnets. Defaults to 0.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="num_availability_zones" requirement="optional" type="number">
<HclListItemDescription>

How many AWS Availability Zones (AZs) to use. One subnet of each type (public, private app) will be created in each AZ. Note that this must be less than or equal to the total number of AZs in a region. A value of null means all AZs should be used. For example, if you specify 3 in a region with 5 AZs, subnets will be created in just 3 AZs instead of all 5. Defaults to all AZs in a region.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="one_route_table_public_subnets" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, create one route table shared amongst all the public subnets; if set to false, create a separate route table per public subnet. Historically, we created one route table for all the public subnets, as they all routed through the Internet Gateway anyway, but in certain use cases (e.g., for use with Network Firewall), you may want to have separate route tables for each public subnet.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="origin_vpc_cidr_block" requirement="optional" type="string">
<HclListItemDescription>

The CIDR block of the origin VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="origin_vpc_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the origin VPC to use when creating peering connections and DNS forwarding.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="origin_vpc_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the origin VPC to use when creating peering connections and DNS forwarding.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="origin_vpc_public_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The public subnets in the origin VPC to use when creating route53 resolvers. These are public subnets due to network ACLs restrictions. Although the forwarder is addressable publicly, access is blocked by security groups.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="origin_vpc_resolver_name" requirement="optional" type="string">
<HclListItemDescription>

Name to set for the origin VPC resolver (outbound from origin VPC to destination VPC). If null (default), defaults to 'ORIGIN_VPC_NAME-to-DESTINATION_VPC_NAME-out'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="origin_vpc_route_table_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of route tables from the origin VPC that should have routes to this app VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="persistence_propagating_vgws" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of Virtual Private Gateways that will propagate routes to persistence subnets. All routes from VPN connections that use Virtual Private Gateways listed here will appear in route tables of persistence subnets. If left empty, no routes will be propagated.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="persistence_subnet_bits" requirement="optional" type="number">
<HclListItemDescription>

Takes the CIDR prefix and adds these many bits to it for calculating subnet ranges.  MAKE SURE if you change this you also change the CIDR spacing or you may hit errors.  See cidrsubnet interpolation in terraform config for more information.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="5"/>
</HclListItem>

<HclListItem name="persistence_subnet_spacing" requirement="optional" type="number">
<HclListItemDescription>

The amount of spacing between the private persistence subnets. Default: 2 times the value of private_subnet_spacing.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="private_app_allow_inbound_from_transit_network" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to prevent the private app subnet from allowing traffic from the transit subnet. Only used if create_transit_subnet_nacls is set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="private_app_allow_inbound_ports_from_cidr" requirement="optional" type="map">
<HclListItemDescription>

A map of unique names to client IP CIDR block and inbound ports that should be exposed in the private app subnet tier nACLs. This is useful when exposing your service on a privileged port with an NLB, where the address isn't translated.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

       A rule number indicating priority. A lower number has precedence. Note that the default rules created by this
       module start with 100.

```
</details>

<details>


```hcl

       Network protocol (tcp, udp, icmp, or all) to expose.

```
</details>

<details>


```hcl

       Range of ports to expose.

```
</details>

<details>


```hcl

       ICMP types to expose
       Required if specifying ICMP for the protocol

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="private_app_allow_outbound_ports_to_destination_cidr" requirement="optional" type="map">
<HclListItemDescription>

A map of unique names to destination IP CIDR block and outbound ports that should be allowed in the private app subnet tier nACLs. This is useful when allowing your VPC specific outbound communication to defined CIDR blocks(known networks)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

       A rule number indicating priority. A lower number has precedence. Note that the default rules created by this
       module start with 100.

```
</details>

<details>


```hcl

       Network protocol (tcp, udp, icmp, or all) to expose.

```
</details>

<details>


```hcl

       Range of ports to expose.

```
</details>

<details>


```hcl

       ICMP types to expose
       Required if specifying ICMP for the protocol

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="private_app_route_table_custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the private-app route table(s), on top of the custom_tags. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="private_app_subnet_cidr_blocks" requirement="optional" type="map(string)">
<HclListItemDescription>

A map listing the specific CIDR blocks desired for each private-app subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of Availability Zones. If left blank, we will compute a reasonable CIDR block for each subnet.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="private_app_subnet_custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the private-app Subnet, on top of the custom_tags. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="private_persistence_allow_inbound_from_transit_network" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to prevent the private persistence subnet from allowing traffic from the transit subnet. Only used if create_transit_subnet_nacls is set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="private_persistence_route_table_custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the private-persistence route tables(s), on top of the custom_tags. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="private_persistence_subnet_cidr_blocks" requirement="optional" type="map(string)">
<HclListItemDescription>

A map listing the specific CIDR blocks desired for each private-persistence subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of Availability Zones. If left blank, we will compute a reasonable CIDR block for each subnet.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="private_persistence_subnet_custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the private-persistence Subnet, on top of the custom_tags. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="private_persistence_subnet_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the private persistence subnet tier. This is used to tag the subnet and its resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;private-persistence&quot;"/>
</HclListItem>

<HclListItem name="private_propagating_vgws" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of Virtual Private Gateways that will propagate routes to private subnets. All routes from VPN connections that use Virtual Private Gateways listed here will appear in route tables of private subnets. If left empty, no routes will be propagated.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="private_subnet_bits" requirement="optional" type="number">
<HclListItemDescription>

Takes the CIDR prefix and adds these many bits to it for calculating subnet ranges.  MAKE SURE if you change this you also change the CIDR spacing or you may hit errors.  See cidrsubnet interpolation in terraform config for more information.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="5"/>
</HclListItem>

<HclListItem name="private_subnet_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the private subnet tier. This is used to tag the subnet and its resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;private-app&quot;"/>
</HclListItem>

<HclListItem name="private_subnet_spacing" requirement="optional" type="number">
<HclListItemDescription>

The amount of spacing between private app subnets. Defaults to subnet_spacing in vpc-app module if not set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="public_propagating_vgws" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of Virtual Private Gateways that will propagate routes to public subnets. All routes from VPN connections that use Virtual Private Gateways listed here will appear in route tables of public subnets. If left empty, no routes will be propagated.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="public_route_table_custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the public route table(s), on top of the custom_tags. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="public_subnet_bits" requirement="optional" type="number">
<HclListItemDescription>

Takes the CIDR prefix and adds these many bits to it for calculating subnet ranges.  MAKE SURE if you change this you also change the CIDR spacing or you may hit errors.  See cidrsubnet interpolation in terraform config for more information.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="5"/>
</HclListItem>

<HclListItem name="public_subnet_cidr_blocks" requirement="optional" type="map(string)">
<HclListItemDescription>

A map listing the specific CIDR blocks desired for each public subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of Availability Zones. If left blank, we will compute a reasonable CIDR block for each subnet.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="public_subnet_custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the public Subnet, on top of the custom_tags. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="public_subnet_ipv6_cidr_blocks" requirement="optional" type="map(string)">
<HclListItemDescription>

(Optional) A map listing the specific IPv6 CIDR blocks desired for each public subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of Availability Zones. If left blank, we will compute a reasonable CIDR block for each subnet.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="public_subnet_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the public subnet tier. This is used to tag the subnet and its resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;public&quot;"/>
</HclListItem>

<HclListItem name="route_table_creation_timeout" requirement="optional" type="string">
<HclListItemDescription>

The timeout for the creation of the Route Tables. It defines how long to wait for a route table to be created before considering the operation failed. Ref: https://www.terraform.io/language/resources/syntax#operation-timeouts

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;5m&quot;"/>
</HclListItem>

<HclListItem name="route_table_deletion_timeout" requirement="optional" type="string">
<HclListItemDescription>

The timeout for the deletion of the Route Tables. It defines how long to wait for a route table to be deleted before considering the operation failed. Ref: https://www.terraform.io/language/resources/syntax#operation-timeouts

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;5m&quot;"/>
</HclListItem>

<HclListItem name="route_table_update_timeout" requirement="optional" type="string">
<HclListItemDescription>

The timeout for the update of the Route Tables. It defines how long to wait for a route table to be updated before considering the operation failed. Ref: https://www.terraform.io/language/resources/syntax#operation-timeouts

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;2m&quot;"/>
</HclListItem>

<HclListItem name="s3_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="secondary_cidr_blocks" requirement="optional" type="set(string)">
<HclListItemDescription>

A list of secondary CIDR blocks to associate with the VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="security_group_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the default Security Group, on top of the custom_tags. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="subnet_spacing" requirement="optional" type="number">
<HclListItemDescription>

The amount of spacing between the different subnet types

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="10"/>
</HclListItem>

<HclListItem name="tag_for_use_with_eks" requirement="optional" type="bool">
<HclListItemDescription>

The VPC resources need special tags for discoverability by Kubernetes to use with certain features, like deploying ALBs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="tenancy" requirement="optional" type="string">
<HclListItemDescription>

The allowed tenancy of instances launched into the selected VPC. Must be one of: default, dedicated, or host.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;default&quot;"/>
</HclListItem>

<HclListItem name="transit_propagating_vgws" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of Virtual Private Gateways that will propagate routes to transit subnets. All routes from VPN connections that use Virtual Private Gateways listed here will appear in route tables of transit subnets. If left empty, no routes will be propagated.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="transit_route_table_custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the transit route table(s), on top of the custom_tags. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="transit_subnet_bits" requirement="optional" type="number">
<HclListItemDescription>

Takes the CIDR prefix and adds these many bits to it for calculating subnet ranges.  MAKE SURE if you change this you also change the CIDR spacing or you may hit errors.  See cidrsubnet interpolation in terraform config for more information.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="5"/>
</HclListItem>

<HclListItem name="transit_subnet_cidr_blocks" requirement="optional" type="map(string)">
<HclListItemDescription>

A map listing the specific CIDR blocks desired for each transit subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of Availability Zones. If left blank, we will compute a reasonable CIDR block for each subnet.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="transit_subnet_custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the transit Subnet, on top of the custom_tags. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="transit_subnet_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the transit subnet tier. This is used to tag the subnet and its resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;transit&quot;"/>
</HclListItem>

<HclListItem name="transit_subnet_spacing" requirement="optional" type="number">
<HclListItemDescription>

The amount of spacing between the transit subnets.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="use_custom_nat_eips" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to use existing EIPs, passed in via <a href="#custom_nat_eips"><code>custom_nat_eips</code></a>, for the NAT gateway(s), instead of creating new ones.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="use_managed_iam_policies" requirement="optional" type="bool">
<HclListItemDescription>

When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="vpc_custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply just to the VPC itself, but not any of the other resources. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="availability_zones">
<HclListItemDescription>

The availability zones of the VPC

</HclListItemDescription>
</HclListItem>

<HclListItem name="blackhole_route_eni_id">
<HclListItemDescription>

The ID of the ENI used as a 'blackhole' destination for routing. Only available if <a href="#create_blackhole_route"><code>create_blackhole_route</code></a> is set to true.

</HclListItemDescription>
</HclListItem>

<HclListItem name="default_route_table_id">
<HclListItemDescription>

The ID of the default routing table.

</HclListItemDescription>
</HclListItem>

<HclListItem name="default_security_group_id">
<HclListItemDescription>

The ID of the default security group of this VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="dynamodb_vpc_endpoint_id">
<HclListItemDescription>

ID of the DynamoDB VPC endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="internet_gateway_id">
<HclListItemDescription>

ID of the Internet Gateway.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ipv6_cidr_block">
<HclListItemDescription>

The IPv6 CIDR block associated with the VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="nat_gateway_ids">
<HclListItemDescription>

ID of the NAT Gateways

</HclListItemDescription>
</HclListItem>

<HclListItem name="nat_gateway_public_ip_count">
<HclListItemDescription>

Count of public IPs from the NAT Gateway

</HclListItemDescription>
</HclListItem>

<HclListItem name="nat_gateway_public_ips">
<HclListItemDescription>

A list of public IPs from the NAT Gateway

</HclListItemDescription>
</HclListItem>

<HclListItem name="num_availability_zones">
<HclListItemDescription>

The number of availability zones of the VPC

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_app_subnet_arns">
<HclListItemDescription>

List of private app subnet ARNs.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_app_subnet_cidr_blocks">
<HclListItemDescription>

The private IP address range of the VPC in CIDR notation.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_app_subnet_ids">
<HclListItemDescription>

A list of IDs of the private app subnets in the VPC

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_app_subnet_route_table_ids">
<HclListItemDescription>

A list of IDs of the private app subnet routing table.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_app_subnets">
<HclListItemDescription>

A map of all private-app subnets, with the subnet name as key, and all `aws-subnet` properties as the value.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_app_subnets_network_acl_id">
<HclListItemDescription>

The ID of the private subnet's ACL

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_nat_gateway_ids">
<HclListItemDescription>

ID of the private NAT Gateways

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_persistence_route_table_ids">
<HclListItemDescription>

A list of IDs of the private persistence subnet routing table.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_persistence_subnet_arns">
<HclListItemDescription>

List of private persistence subnet ARNs.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_persistence_subnet_cidr_blocks">
<HclListItemDescription>

The private IP address range of the VPC Persistence tier in CIDR notation.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_persistence_subnet_ids">
<HclListItemDescription>

The IDs of the private persistence tier subnets of the VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_persistence_subnet_route_table_ids">
<HclListItemDescription>

A list of IDs of the private persistence subnet routing table.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_persistence_subnets">
<HclListItemDescription>

A map of all private-persistence subnets, with the subnet name as key, and all `aws-subnet` properties as the value.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_persistence_subnets_network_acl_id">
<HclListItemDescription>

The ID of the private persistence subnet's ACL

</HclListItemDescription>
</HclListItem>

<HclListItem name="public_subnet_arns">
<HclListItemDescription>

List of public subnet ARNs.

</HclListItemDescription>
</HclListItem>

<HclListItem name="public_subnet_cidr_blocks">
<HclListItemDescription>

The public IP address range of the VPC in CIDR notation.

</HclListItemDescription>
</HclListItem>

<HclListItem name="public_subnet_ids">
<HclListItemDescription>

A list of IDs of the public subnets of the VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="public_subnet_ipv6_cidr_blocks">
<HclListItemDescription>

The public IPv6 CIDR block associated with the VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="public_subnet_route_table_id">
<HclListItemDescription>

The ID of the public routing table.

</HclListItemDescription>
</HclListItem>

<HclListItem name="public_subnets">
<HclListItemDescription>

A map of all public subnets, with the subnet name as key, and all `aws-subnet` properties as the value.

</HclListItemDescription>
</HclListItem>

<HclListItem name="public_subnets_network_acl_id">
<HclListItemDescription>

The ID of the public subnet's ACL

</HclListItemDescription>
</HclListItem>

<HclListItem name="s3_vpc_endpoint_id">
<HclListItemDescription>

ID of the S3 VPC endpoint.

</HclListItemDescription>
</HclListItem>

<HclListItem name="secondary_cidr_block_ids">
<HclListItemDescription>

Map of the secondary CIDR block associations with the VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="transit_subnet_arns">
<HclListItemDescription>

List of transit subnet ARNs.

</HclListItemDescription>
</HclListItem>

<HclListItem name="transit_subnet_cidr_blocks">
<HclListItemDescription>

The transit IP address range of the VPC transit subnet tier in CIDR notation.

</HclListItemDescription>
</HclListItem>

<HclListItem name="transit_subnet_ids">
<HclListItemDescription>

The IDs of the transit subnets of the VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="transit_subnet_route_table_ids">
<HclListItemDescription>

A list of IDs of the transit subnet routing table.

</HclListItemDescription>
</HclListItem>

<HclListItem name="transit_subnets">
<HclListItemDescription>

A map of all transit subnets, with the subnet ID as the key, and all `aws-subnet` properties as the value.

</HclListItemDescription>
</HclListItem>

<HclListItem name="transit_subnets_network_acl_id">
<HclListItemDescription>

The ID of the transit subnet's ACL

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_cidr_block">
<HclListItemDescription>

The IP address range of the VPC in CIDR notation.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id">
<HclListItemDescription>

The ID of the VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_name">
<HclListItemDescription>

The name configured for VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_ready">
<HclListItemDescription>

Indicates whether or not the VPC has finished creating

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.118.17/modules/networking/vpc/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.118.17/modules/networking/vpc/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.118.17/modules/networking/vpc/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "8c21c4a757956da282ff19143b03fc69"
}
##DOCS-SOURCER-END -->
