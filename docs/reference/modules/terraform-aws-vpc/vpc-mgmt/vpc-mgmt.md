---
title: "[DEPRECATED] VPC-Mgmt Terraform Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="VPC Modules" version="0.28.3" lastModifiedVersion="0.27.0"/>

# \[DEPRECATED] VPC-Mgmt Terraform Module

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.3/modules/vpc-mgmt" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.27.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

**The `vpc-mgmt` module is now deprecated**. The main difference between `vpc-mgmt` and `vpc-app` was that `vpc-app`
had three tiers of subnets (public, private-app, private-persistence) and `vpc-mgmt` had two (public, private). As of
`v0.12.1`, `vpc-app` allows you to disable any of the subnet tiers using the `create_public_subnets`,
`create_private_app_subnets`, and `create_private_persistence_subnets` input variables, respectively, so it can now
support 1, 2, or 3 tiers of subnets, as needed. Therefore, we recommend using `vpc-app` for all your VPCs in the
future. If you're already using `vpc-mgmt`, we will continue to maintain it for a little while longer, but please be
aware that, in a future release, once we feel the new functionality in `vpc-app` is fully baked, we will remove
`vpc-mgmt` entirely.

This Terraform Module launches a single VPC meant to house DevOps and other management services. By contrast, the apps
that power your business should run in an "app" VPC. (See the [vpc-app](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.3/modules/vpc-app) module.)

## What's a VPC?

A [VPC](https://aws.amazon.com/vpc/) or Virtual Private Cloud is a logically isolated section of your AWS cloud. Each
VPC defines a virtual network within which you run your AWS resources, as well as rules for what can go in and out of
that network. This includes subnets, route tables that tell those subnets how to route inbound and outbound traffic,
security groups, access controls lists for the network (NACLs), and any other network components such as VPN connections.

## Two Subnet Tiers

This VPC defines two "tiers" of subnets:

*   **Public Subnets**: Resources in these subnets are directly addressable from the Internet. Only public-facing
    resources (typically just load balancers and the bastion host) should be put here.
*   **Private/App Subnets**: Resources in these subnets are NOT directly addressable from the Internet but they can make
    outbound connections to the Internet through a NAT Gateway. You can connect to the resources in this subnet only from
    resources within the VPC, so you should put your app servers here and allow the load balancers in the Public Subnet
    to route traffic to them.

## VPC Architecture

The use of a Management VPC is inspired by the VPC Architecture described by Ben Whaley in his blog post [A Reference
VPC Architecture](https://www.whaletech.co/2014/10/02/reference-vpc-architecture.html). That blog post proposed the
following VPC structure:

![VPC Diagram](https://i.imgur.com/KC0OKZL.png)

To summarize:

*   The only way operators can access our private network is through a mgmt VPC.
*   The mgmt VPC uses [VPC Peering](#vpc-peering) so that, once in the mgmt VPC, you can access any other environment, but
    once in any other environment, you can only access the mgmt VPC (e.g. you cannot access prod from stage).
*   We put "environment-agnostic" or management-level resources in the mgmt VPC such as Jenkins, a metrics store, an LDAP
    server, etc.

## VPC Peering

Learn more about VPC Peering in the [vpc-peering](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.3/modules/vpc-peering) module.

## SSH Access via the Bastion Host

To SSH into any of your EC2 Instances in a private subnet, we recommend launching a single "Bastion Host" to use as
an SSH jump host. For more info, see the [Bastion Host
examples](https://github.com/gruntwork-io/terraform-aws-server/tree/main/examples/bastion-host).

## Gotchas

*   If the `num_availability_zones` variable in the mgmt VPC and the `num_availability_zones` variable in the app VPC don't match, there are problems with the routes that are created between the two VPCs as part of setting up VPC Peering. If your use case requires different numbers of Availability Zones for each of these VPCs, please let us know and we'll investigate further!

## Other VPC Core Concepts

Learn about [Other VPC Core Concepts](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.3/modules//_docs/vpc-core-concepts.md) like subnets, NAT Gateways, and VPC Endpoints.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-MGMT MODULE
# ------------------------------------------------------------------------------------------------------

module "vpc_mgmt" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-mgmt?ref=v0.28.3"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The IP address range of the VPC in CIDR notation. A prefix of /16 is
  # recommended. Do not use a prefix higher than /27. Examples include
  # '10.100.0.0/16', '10.200.0.0/16', etc.
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

  # If true, will apply the default NACL rules in var.default_nacl_ingress_rules
  # and var.default_nacl_egress_rules on the default NACL of the VPC. Note that
  # every VPC must have a default NACL - when this is false, the original
  # default NACL rules managed by AWS will be used.
  apply_default_nacl_rules = false

  # If true, will associate the default NACL to the public and private subnets
  # created by this module. Only used if var.apply_default_nacl_rules is true.
  # Note that this does not guarantee that the subnets are associated with the
  # default NACL. Subnets can only be associated with a single NACL. The default
  # NACL association will be dropped if the subnets are associated with a custom
  # NACL later.
  associate_default_nacl_to_subnets = true

  # List of excluded Availability Zone IDs.
  availability_zone_exclude_ids = []

  # List of excluded Availability Zone names.
  availability_zone_exclude_names = []

  # Allows to filter list of Availability Zones based on their current state.
  # Can be either "available", "information", "impaired" or "unavailable". By
  # default the list includes a complete set of Availability Zones to which the
  # underlying AWS account has access, regardless of their state.
  availability_zone_state = null

  # DEPRECATED. The AWS Region where this VPC will exist. This variable is no
  # longer used and only kept around for backwards compatibility. We now
  # automatically fetch the region using a data source.
  aws_region = ""

  # If you set this variable to false, this module will not create any
  # resources. This is used as a workaround because Terraform does not allow you
  # to use the 'count' parameter on modules. By using this parameter, you can
  # optionally create or not create the resources within this module.
  create_resources = true

  # A map of tags to apply to the VPC, Subnets, Route Tables, and Internet
  # Gateway. The key is the tag name and the value is the tag value. Note that
  # the tag 'Name' is automatically added by this module but may be optionally
  # overwritten by this variable.
  custom_tags = {}

  # A map of tags to apply to the default Network ACL, on top of the
  # custom_tags. The key is the tag name and the value is the tag value. Note
  # that tags defined here will override tags defined as custom_tags in case of
  # conflict.
  default_nacl_custom_tags = {}

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

  # A map of tags to apply to the default Route Table, on top of the
  # custom_tags. The key is the tag name and the value is the tag value. Note
  # that tags defined here will override tags defined as custom_tags in case of
  # conflict.
  default_route_table_custom_tags = {}

  # A map of tags to apply to the default Security Group, on top of the
  # custom_tags. The key is the tag name and the value is the tag value. Note
  # that tags defined here will override tags defined as custom_tags in case of
  # conflict.
  default_security_group_custom_tags = {}

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

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  dynamodb_endpoint_policy = null

  # If set to false, the default security groups will NOT be created. This
  # variable is a workaround to a terraform limitation where overriding
  # var.default_security_group_ingress_rules = {} and
  # var.default_security_group_egress_rules = {} does not remove the rules. More
  # information at:
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_security_group#removing-aws_default_security_group-from-your-configuration
  enable_default_security_group = false

  # A map of tags to apply to the NAT gateways, on top of the custom_tags. The
  # key is the tag name and the value is the tag value. Note that tags defined
  # here will override tags defined as custom_tags in case of conflict.
  nat_gateway_custom_tags = {}

  # How many AWS Availability Zones (AZs) to use. One subnet of each type
  # (public, private) will be created in each AZ. All AZs will be used if you
  # provide a value that is more than the number of AZs in a region. A value of
  # null means all AZs should be used. For example, if you specify 3 in a region
  # with 5 AZs, subnets will be created in just 3 AZs instead of all 5. On the
  # other hand, if you specify 6 in the same region, all 5 AZs will be used with
  # no duplicates (same as setting this to 5).
  num_availability_zones = null

  # A list of Virtual Gateways that will propagate routes to private subnets.
  # All routes from VPN connections that use Virtual Gateways listed here will
  # appear in route tables of private subnets. If left empty, no routes will be
  # propagated.
  private_propagating_vgws = []

  # Takes the CIDR prefix and adds these many bits to it for calculating subnet
  # ranges.  MAKE SURE if you change this you also change the CIDR spacing or
  # you may hit errors.  See cidrsubnet interpolation in terraform config for
  # more information.
  private_subnet_bits = 5

  # A map listing the specific CIDR blocks desired for each private subnet. The
  # key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of
  # Availability Zones. If left blank, we will compute a reasonable CIDR block
  # for each subnet.
  private_subnet_cidr_blocks = {}

  # A map of tags to apply to the private Subnet, on top of the custom_tags. The
  # key is the tag name and the value is the tag value. Note that tags defined
  # here will override tags defined as custom_tags in case of conflict.
  private_subnet_custom_tags = {}

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

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  s3_endpoint_policy = null

  # The amount of spacing between the different subnet types
  subnet_spacing = 10

  # The allowed tenancy of instances launched into the selected VPC. Must be one
  # of: default, dedicated, or host.
  tenancy = "default"

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
# DEPLOY GRUNTWORK'S VPC-MGMT MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-mgmt?ref=v0.28.3"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The IP address range of the VPC in CIDR notation. A prefix of /16 is
  # recommended. Do not use a prefix higher than /27. Examples include
  # '10.100.0.0/16', '10.200.0.0/16', etc.
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

  # If true, will apply the default NACL rules in var.default_nacl_ingress_rules
  # and var.default_nacl_egress_rules on the default NACL of the VPC. Note that
  # every VPC must have a default NACL - when this is false, the original
  # default NACL rules managed by AWS will be used.
  apply_default_nacl_rules = false

  # If true, will associate the default NACL to the public and private subnets
  # created by this module. Only used if var.apply_default_nacl_rules is true.
  # Note that this does not guarantee that the subnets are associated with the
  # default NACL. Subnets can only be associated with a single NACL. The default
  # NACL association will be dropped if the subnets are associated with a custom
  # NACL later.
  associate_default_nacl_to_subnets = true

  # List of excluded Availability Zone IDs.
  availability_zone_exclude_ids = []

  # List of excluded Availability Zone names.
  availability_zone_exclude_names = []

  # Allows to filter list of Availability Zones based on their current state.
  # Can be either "available", "information", "impaired" or "unavailable". By
  # default the list includes a complete set of Availability Zones to which the
  # underlying AWS account has access, regardless of their state.
  availability_zone_state = null

  # DEPRECATED. The AWS Region where this VPC will exist. This variable is no
  # longer used and only kept around for backwards compatibility. We now
  # automatically fetch the region using a data source.
  aws_region = ""

  # If you set this variable to false, this module will not create any
  # resources. This is used as a workaround because Terraform does not allow you
  # to use the 'count' parameter on modules. By using this parameter, you can
  # optionally create or not create the resources within this module.
  create_resources = true

  # A map of tags to apply to the VPC, Subnets, Route Tables, and Internet
  # Gateway. The key is the tag name and the value is the tag value. Note that
  # the tag 'Name' is automatically added by this module but may be optionally
  # overwritten by this variable.
  custom_tags = {}

  # A map of tags to apply to the default Network ACL, on top of the
  # custom_tags. The key is the tag name and the value is the tag value. Note
  # that tags defined here will override tags defined as custom_tags in case of
  # conflict.
  default_nacl_custom_tags = {}

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

  # A map of tags to apply to the default Route Table, on top of the
  # custom_tags. The key is the tag name and the value is the tag value. Note
  # that tags defined here will override tags defined as custom_tags in case of
  # conflict.
  default_route_table_custom_tags = {}

  # A map of tags to apply to the default Security Group, on top of the
  # custom_tags. The key is the tag name and the value is the tag value. Note
  # that tags defined here will override tags defined as custom_tags in case of
  # conflict.
  default_security_group_custom_tags = {}

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

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  dynamodb_endpoint_policy = null

  # If set to false, the default security groups will NOT be created. This
  # variable is a workaround to a terraform limitation where overriding
  # var.default_security_group_ingress_rules = {} and
  # var.default_security_group_egress_rules = {} does not remove the rules. More
  # information at:
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_security_group#removing-aws_default_security_group-from-your-configuration
  enable_default_security_group = false

  # A map of tags to apply to the NAT gateways, on top of the custom_tags. The
  # key is the tag name and the value is the tag value. Note that tags defined
  # here will override tags defined as custom_tags in case of conflict.
  nat_gateway_custom_tags = {}

  # How many AWS Availability Zones (AZs) to use. One subnet of each type
  # (public, private) will be created in each AZ. All AZs will be used if you
  # provide a value that is more than the number of AZs in a region. A value of
  # null means all AZs should be used. For example, if you specify 3 in a region
  # with 5 AZs, subnets will be created in just 3 AZs instead of all 5. On the
  # other hand, if you specify 6 in the same region, all 5 AZs will be used with
  # no duplicates (same as setting this to 5).
  num_availability_zones = null

  # A list of Virtual Gateways that will propagate routes to private subnets.
  # All routes from VPN connections that use Virtual Gateways listed here will
  # appear in route tables of private subnets. If left empty, no routes will be
  # propagated.
  private_propagating_vgws = []

  # Takes the CIDR prefix and adds these many bits to it for calculating subnet
  # ranges.  MAKE SURE if you change this you also change the CIDR spacing or
  # you may hit errors.  See cidrsubnet interpolation in terraform config for
  # more information.
  private_subnet_bits = 5

  # A map listing the specific CIDR blocks desired for each private subnet. The
  # key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of
  # Availability Zones. If left blank, we will compute a reasonable CIDR block
  # for each subnet.
  private_subnet_cidr_blocks = {}

  # A map of tags to apply to the private Subnet, on top of the custom_tags. The
  # key is the tag name and the value is the tag value. Note that tags defined
  # here will override tags defined as custom_tags in case of conflict.
  private_subnet_custom_tags = {}

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

  # IAM policy to restrict what resources can call this endpoint. For example,
  # you can add an IAM policy that allows EC2 instances to talk to this endpoint
  # but no other types of resources. If not specified, all resources will be
  # allowed to call this endpoint.
  s3_endpoint_policy = null

  # The amount of spacing between the different subnet types
  subnet_spacing = 10

  # The allowed tenancy of instances launched into the selected VPC. Must be one
  # of: default, dedicated, or host.
  tenancy = "default"

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

The IP address range of the VPC in CIDR notation. A prefix of /16 is recommended. Do not use a prefix higher than /27. Examples include '10.100.0.0/16', '10.200.0.0/16', etc.

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

<HclListItem name="apply_default_nacl_rules" requirement="optional" type="bool">
<HclListItemDescription>

If true, will apply the default NACL rules in <a href="#default_nacl_ingress_rules"><code>default_nacl_ingress_rules</code></a> and <a href="#default_nacl_egress_rules"><code>default_nacl_egress_rules</code></a> on the default NACL of the VPC. Note that every VPC must have a default NACL - when this is false, the original default NACL rules managed by AWS will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="associate_default_nacl_to_subnets" requirement="optional" type="bool">
<HclListItemDescription>

If true, will associate the default NACL to the public and private subnets created by this module. Only used if <a href="#apply_default_nacl_rules"><code>apply_default_nacl_rules</code></a> is true. Note that this does not guarantee that the subnets are associated with the default NACL. Subnets can only be associated with a single NACL. The default NACL association will be dropped if the subnets are associated with a custom NACL later.

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

List of excluded Availability Zone names.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
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

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

If you set this variable to false, this module will not create any resources. This is used as a workaround because Terraform does not allow you to use the 'count' parameter on modules. By using this parameter, you can optionally create or not create the resources within this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the VPC, Subnets, Route Tables, and Internet Gateway. The key is the tag name and the value is the tag value. Note that the tag 'Name' is automatically added by this module but may be optionally overwritten by this variable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="default_nacl_custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the default Network ACL, on top of the custom_tags. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.

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

<HclListItem name="default_route_table_custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the default Route Table, on top of the custom_tags. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="default_security_group_custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the default Security Group, on top of the custom_tags. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
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

<HclListItem name="dynamodb_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="enable_default_security_group" requirement="optional" type="bool">
<HclListItemDescription>

If set to false, the default security groups will NOT be created. This variable is a workaround to a terraform limitation where overriding <a href="#default_security_group_ingress_rules"><code>default_security_group_ingress_rules</code></a> = &#123;&#125; and <a href="#default_security_group_egress_rules"><code>default_security_group_egress_rules</code></a> = &#123;&#125; does not remove the rules. More information at: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_security_group#removing-aws_default_security_group-from-your-configuration

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

How many AWS Availability Zones (AZs) to use. One subnet of each type (public, private) will be created in each AZ. All AZs will be used if you provide a value that is more than the number of AZs in a region. A value of null means all AZs should be used. For example, if you specify 3 in a region with 5 AZs, subnets will be created in just 3 AZs instead of all 5. On the other hand, if you specify 6 in the same region, all 5 AZs will be used with no duplicates (same as setting this to 5).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="private_propagating_vgws" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of Virtual Gateways that will propagate routes to private subnets. All routes from VPN connections that use Virtual Gateways listed here will appear in route tables of private subnets. If left empty, no routes will be propagated.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="private_subnet_bits" requirement="optional" type="number">
<HclListItemDescription>

Takes the CIDR prefix and adds these many bits to it for calculating subnet ranges.  MAKE SURE if you change this you also change the CIDR spacing or you may hit errors.  See cidrsubnet interpolation in terraform config for more information.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="5"/>
</HclListItem>

<HclListItem name="private_subnet_cidr_blocks" requirement="optional" type="map(string)">
<HclListItemDescription>

A map listing the specific CIDR blocks desired for each private subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of Availability Zones. If left blank, we will compute a reasonable CIDR block for each subnet.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="private_subnet_custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the private Subnet, on top of the custom_tags. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.

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

<HclListItem name="s3_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="subnet_spacing" requirement="optional" type="number">
<HclListItemDescription>

The amount of spacing between the different subnet types

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="10"/>
</HclListItem>

<HclListItem name="tenancy" requirement="optional" type="string">
<HclListItemDescription>

The allowed tenancy of instances launched into the selected VPC. Must be one of: default, dedicated, or host.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;default&quot;"/>
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

A list of availability zone names used by the VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="nat_gateway_public_ips">
<HclListItemDescription>

The public IP addresses (EIPs) of the NAT gateways for the VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="num_availability_zones">
<HclListItemDescription>

The number of availability zones used by the VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_subnet_arns">
<HclListItemDescription>

The ARNs of the VPC's private subnets.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_subnet_cidr_blocks">
<HclListItemDescription>

The CIDR blocks for the private subnets of the VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_subnet_ids">
<HclListItemDescription>

The IDs of the VPC's private subnets.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_subnet_route_table_ids">
<HclListItemDescription>

The ID of the VPC's private subnet route tables.

</HclListItemDescription>
</HclListItem>

<HclListItem name="public_subnet_arns">
<HclListItemDescription>

The ARNs of the VPC's public subnets.

</HclListItemDescription>
</HclListItem>

<HclListItem name="public_subnet_cidr_blocks">
<HclListItemDescription>

The CIDR blocks for the public subnets of the VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="public_subnet_ids">
<HclListItemDescription>

The IDs of the VPC's public subnets.

</HclListItemDescription>
</HclListItem>

<HclListItem name="public_subnet_route_table_id">
<HclListItemDescription>

The ID of the VPC's public subnet route table.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_cidr_block">
<HclListItemDescription>

The CIDR block of the VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id">
<HclListItemDescription>

The ID of the mgmt VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_name">
<HclListItemDescription>

The name of the mgmt VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_ready">
<HclListItemDescription>

A null_resource that indicates that the VPC is ready, including all of its resources such the gateway, NAT, etc. Use this to avoid eventual consistency issues in resources that depend upon the VPC, such as network ACLs.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.3/modules/vpc-mgmt/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.3/modules/vpc-mgmt/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.3/modules/vpc-mgmt/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "a7df04621f0cd78049efe407cd0874ca"
}
##DOCS-SOURCER-END -->
