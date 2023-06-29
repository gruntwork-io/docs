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

<VersionBadge version="0.104.14" lastModifiedVersion="0.104.5"/>

# VPC

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/networking/vpc" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

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
email <support@gruntwork.io>.

### Core concepts

To understand core concepts like what’s a VPC, how subnets are configured, how network ACLs work, and more, see the
documentation in the [terraform-aws-vpc](https://github.com/gruntwork-io/terraform-aws-vpc) repo.

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules): The main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.
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

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/vpc?ref=v0.104.14"

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

  # If true, will apply the default NACL rules in var.default_nacl_ingress_rules
  # and var.default_nacl_egress_rules on the default NACL of the VPC. Note that
  # every VPC must have a default NACL - when this is false, the original
  # default NACL rules managed by AWS will be used.
  apply_default_nacl_rules = false

  # If true, will associate the default NACL to the public, private, and
  # persistence subnets created by this module. Only used if
  # var.apply_default_nacl_rules is true. Note that this does not guarantee that
  # the subnets are associated with the default NACL. Subnets can only be
  # associated with a single NACL. The default NACL association will be dropped
  # if the subnets are associated with a custom NACL later.
  associate_default_nacl_to_subnets = true

  # Specific Availability Zones in which subnets SHOULD NOT be created. Useful
  # for when features / support is missing from a given AZ.
  availability_zone_exclude_names = []

  # DEPRECATED. The AWS Region where this VPC will exist. This variable is no
  # longer used and only kept around for backwards compatibility. We now
  # automatically fetch the region using a data source.
  aws_region = ""

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

  # Create VPC endpoints for S3 and DynamoDB.
  create_vpc_endpoints = true

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

  # The names of EKS clusters that will be deployed into the VPC, if
  # var.tag_for_use_with_eks is true.
  eks_cluster_names = []

  # If set to false, the default security groups will NOT be created.
  enable_default_security_group = true

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

  # The destination for the flow log. Valid values are cloud-watch-logs or s3.
  # Defaults to cloud-watch-logs.
  flow_log_destination_type = "cloud-watch-logs"

  # Boolean to determine whether flow logs should be deleted if the S3 bucket is
  # removed by terraform. Defaults to false.
  flow_log_force_destroy_bucket = false

  # The name to use for the VPC flow logs S3 bucket.
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

  # if log_destination_type is s3, optionally specify a subfolder for flow log
  # delivery.
  flow_log_s3_subfolder = ""

  # The type of traffic to capture in the VPC flow log. Valid values include
  # ACCEPT, REJECT, or ALL. Defaults to REJECT. Only used if create_flow_logs is
  # true.
  flow_logs_traffic_type = "REJECT"

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role.
  iam_role_permissions_boundary = null

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

  # How many AWS Availability Zones (AZs) to use. One subnet of each type
  # (public, private app) will be created in each AZ. Note that this must be
  # less than or equal to the total number of AZs in a region. A value of null
  # means all AZs should be used. For example, if you specify 3 in a region with
  # 5 AZs, subnets will be created in just 3 AZs instead of all 5. Defaults to
  # all AZs in a region.
  num_availability_zones = null

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
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/vpc?ref=v0.104.14"
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

  # If true, will apply the default NACL rules in var.default_nacl_ingress_rules
  # and var.default_nacl_egress_rules on the default NACL of the VPC. Note that
  # every VPC must have a default NACL - when this is false, the original
  # default NACL rules managed by AWS will be used.
  apply_default_nacl_rules = false

  # If true, will associate the default NACL to the public, private, and
  # persistence subnets created by this module. Only used if
  # var.apply_default_nacl_rules is true. Note that this does not guarantee that
  # the subnets are associated with the default NACL. Subnets can only be
  # associated with a single NACL. The default NACL association will be dropped
  # if the subnets are associated with a custom NACL later.
  associate_default_nacl_to_subnets = true

  # Specific Availability Zones in which subnets SHOULD NOT be created. Useful
  # for when features / support is missing from a given AZ.
  availability_zone_exclude_names = []

  # DEPRECATED. The AWS Region where this VPC will exist. This variable is no
  # longer used and only kept around for backwards compatibility. We now
  # automatically fetch the region using a data source.
  aws_region = ""

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

  # Create VPC endpoints for S3 and DynamoDB.
  create_vpc_endpoints = true

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

  # The names of EKS clusters that will be deployed into the VPC, if
  # var.tag_for_use_with_eks is true.
  eks_cluster_names = []

  # If set to false, the default security groups will NOT be created.
  enable_default_security_group = true

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

  # The destination for the flow log. Valid values are cloud-watch-logs or s3.
  # Defaults to cloud-watch-logs.
  flow_log_destination_type = "cloud-watch-logs"

  # Boolean to determine whether flow logs should be deleted if the S3 bucket is
  # removed by terraform. Defaults to false.
  flow_log_force_destroy_bucket = false

  # The name to use for the VPC flow logs S3 bucket.
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

  # if log_destination_type is s3, optionally specify a subfolder for flow log
  # delivery.
  flow_log_s3_subfolder = ""

  # The type of traffic to capture in the VPC flow log. Valid values include
  # ACCEPT, REJECT, or ALL. Defaults to REJECT. Only used if create_flow_logs is
  # true.
  flow_logs_traffic_type = "REJECT"

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role.
  iam_role_permissions_boundary = null

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

  # How many AWS Availability Zones (AZs) to use. One subnet of each type
  # (public, private app) will be created in each AZ. Note that this must be
  # less than or equal to the total number of AZs in a region. A value of null
  # means all AZs should be used. For example, if you specify 3 in a region with
  # 5 AZs, subnets will be created in just 3 AZs instead of all 5. Defaults to
  # all AZs in a region.
  num_availability_zones = null

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

<HclListItem name="apply_default_nacl_rules" requirement="optional" type="bool">
<HclListItemDescription>

If true, will apply the default NACL rules in <a href="#default_nacl_ingress_rules"><code>default_nacl_ingress_rules</code></a> and <a href="#default_nacl_egress_rules"><code>default_nacl_egress_rules</code></a> on the default NACL of the VPC. Note that every VPC must have a default NACL - when this is false, the original default NACL rules managed by AWS will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="associate_default_nacl_to_subnets" requirement="optional" type="bool">
<HclListItemDescription>

If true, will associate the default NACL to the public, private, and persistence subnets created by this module. Only used if <a href="#apply_default_nacl_rules"><code>apply_default_nacl_rules</code></a> is true. Note that this does not guarantee that the subnets are associated with the default NACL. Subnets can only be associated with a single NACL. The default NACL association will be dropped if the subnets are associated with a custom NACL later.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="availability_zone_exclude_names" requirement="optional" type="list(string)">
<HclListItemDescription>

Specific Availability Zones in which subnets SHOULD NOT be created. Useful for when features / support is missing from a given AZ.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="aws_region" requirement="optional" type="string">
<HclListItemDescription>

DEPRECATED. The AWS Region where this VPC will exist. This variable is no longer used and only kept around for backwards compatibility. We now automatically fetch the region using a data source.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
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

<HclListItem name="create_vpc_endpoints" requirement="optional" type="bool">
<HclListItemDescription>

Create VPC endpoints for S3 and DynamoDB.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
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

<HclListItem name="flow_log_destination_type" requirement="optional" type="string">
<HclListItemDescription>

The destination for the flow log. Valid values are cloud-watch-logs or s3. Defaults to cloud-watch-logs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;cloud-watch-logs&quot;"/>
</HclListItem>

<HclListItem name="flow_log_force_destroy_bucket" requirement="optional" type="bool">
<HclListItemDescription>

Boolean to determine whether flow logs should be deleted if the S3 bucket is removed by terraform. Defaults to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="flow_log_s3_bucket_name" requirement="optional" type="string">
<HclListItemDescription>

The name to use for the VPC flow logs S3 bucket.

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

if log_destination_type is s3, optionally specify a subfolder for flow log delivery.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="flow_logs_traffic_type" requirement="optional" type="string">
<HclListItemDescription>

The type of traffic to capture in the VPC flow log. Valid values include ACCEPT, REJECT, or ALL. Defaults to REJECT. Only used if create_flow_logs is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;REJECT&quot;"/>
</HclListItem>

<HclListItem name="iam_role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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

<HclListItem name="num_availability_zones" requirement="optional" type="number">
<HclListItemDescription>

How many AWS Availability Zones (AZs) to use. One subnet of each type (public, private app) will be created in each AZ. Note that this must be less than or equal to the total number of AZs in a region. A value of null means all AZs should be used. For example, if you specify 3 in a region with 5 AZs, subnets will be created in just 3 AZs instead of all 5. Defaults to all AZs in a region.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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

<HclListItem name="default_security_group_id">
<HclListItemDescription>

The ID of the default security group of this VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="dynamodb_vpc_endpoint_id">
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

<HclListItem name="private_persistence_route_table_ids">
<HclListItemDescription>

A list of IDs of the private persistence subnet routing table.

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
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/networking/vpc/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/networking/vpc/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/networking/vpc/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "f167d7bed879e083105430008a1e99e3"
}
##DOCS-SOURCER-END -->
