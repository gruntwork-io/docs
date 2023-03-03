---
title: "VPC-App Terraform Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="VPC Modules" version="0.22.4" />

# VPC-App Terraform Module

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/main/modules/vpc-app" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

This Terraform Module launches a single VPC meant to house applications. By contrast, DevOps-related services such as
Jenkins or InfluxDB should be in a "mgmt" VPC. (See the [vpc-mgmt](https://github.com/gruntwork-io/terraform-aws-vpc/tree/main/modules/vpc-mgmt) module.)

## What's a VPC?

A [VPC](https://aws.amazon.com/vpc/) or Virtual Private Cloud is a logically isolated section of your AWS cloud. Each
VPC defines a virtual network within which you run your AWS resources, as well as rules for what can go in and out of
that network. This includes subnets, route tables that tell those subnets how to route inbound and outbound traffic,
security groups, access controls lists for the network (NACLs), and any other network components such as VPN connections.

## Three Subnet Tiers

This VPC defines three "tiers" of subnets:

*   **Public Subnets**: Resources in these subnets are directly addressable from the Internet. Only public-facing
    resources (typically just load balancers) should be put here.
*   **Private/App Subnets**: Resources in these subnets are NOT directly addressable from the Internet but they can make
    outbound connections to the Internet through a NAT Gateway. You can connect to the resources in this subnet only from
    resources within the VPC, so you should put your app servers here and allow the load balancers in the Public Subnet
    to route traffic to them.
*   **Private/Persistence Subnets**: Resources in these subnets are neither directly addressable from the Internet nor
    able to make outbound Internet connections. You can connect to the resources in this subnet only from within the VPC,
    so you should put your databases, cache servers, and other stateful resources here and allow your apps to talk to
    them.

## VPC Architecture

The three-tier VPC is inspired by the VPC Architecture described by Ben Whaley in his blog post [A Reference
VPC Architecture](https://www.whaletech.co/2014/10/02/reference-vpc-architecture.html). That blog post proposed the
following VPC structure:

![VPC Diagram](/img/reference/modules/terraform-aws-vpc/vpc-app/vpc_app_architecture.png)

To summarize:

*   Each environment (prod, stage, etc.) is represented by a separate VPC.
*   Each VPC has three "tiers" of subnets to allow AWS resources to be publicly addressable, addressable only from the
    public tier, or only from the private/app tier.
*   In a given subnet tier, there are usually three or four actual subnets, one for each Availability Zone.
*   Therefore, if we created a single VPC in the `us-west-2` region, which has Availability Zones `us-west-2a`,`us-west-2b`,
    and `us-west-2c`, each subnet tier would have three subnets (one per Availability Zone) for a total of 9 subnets in all.
*   The only way to reach this VPC is from the public Internet via a publicly exposed sevice, or via the [mgmt VPC](https://github.com/gruntwork-io/terraform-aws-vpc/tree/main/modules/vpc-mgmt),
    which uses [VPC Peering](https://github.com/gruntwork-io/terraform-aws-vpc/tree/main/modules/vpc-peering) to make this VPC accessible from the mgmt VPC.
*   Philosophically, everything in a VPC should be isolated from all resources in any other VPC. In particular, we want
    to ensure that our stage environment is completely independent from prod. This architecture helps to reinforce that.

Throughout our diagrams and examples we recommend a /16 CIDR range for VPCs. The reason for this is that a /16 makes
CIDR math quite straightforward. If using the 10.0.0.0/8 [RFC1918](http://www.faqs.org/rfcs/rfc1918.html) address space,
this allows for 256 VPCs (10.0.0.0/16-10.255.255.255/16) with 65,534 IP addresses per VPC. This should be sufficient for
nearly all use-cases, and is consistent with many examples and existing documentation found elsewhere.

## Gotchas

*   If the `num_availability_zones` variable in the mgmt VPC and the `num_availability_zones` variable in the app VPC don't match, there are problems with the routes that are created between the two VPCs as part of setting up VPC Peering. If your use case requires different numbers of Availability Zones for each of these VPCs, please let us know and we'll investigate further!

## Other VPC Core Concepts

Learn about [Other VPC Core Concepts](https://github.com/gruntwork-io/terraform-aws-vpc/tree/main/modules//_docs/vpc-core-concepts.md) like subnets, NAT Gateways, and VPC Endpoints.

## Sample Usage

<ModuleUsage>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-APP MODULE
# ------------------------------------------------------------------------------------------------------

module "vpc_app" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-app?ref=v0.22.4"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The IP address range of the VPC in CIDR notation. A prefix of /16 is
  # recommended. Do not use a prefix higher than /27. Examples include
  # '10.100.0.0/16', '10.200.0.0/16', etc.
  cidr_block = <INPUT REQUIRED>

  # The number of NAT Gateways to launch for this VPC. For production VPCs, a NAT
  # Gateway should be placed in each Availability Zone (so likely 3 total), whereas
  # for non-prod VPCs, just one Availability Zone (and hence 1 NAT Gateway) will
  # suffice.
  num_nat_gateways = <INPUT REQUIRED>

  # Name of the VPC. Examples include 'prod', 'dev', 'mgmt', etc.
  vpc_name = <INPUT REQUIRED>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Should the private persistence subnet be allowed outbound access to the
  # internet?
  allow_private_persistence_internet_access = false

  # If true, will apply the default NACL rules in var.default_nacl_ingress_rules and
  # var.default_nacl_egress_rules on the default NACL of the VPC. Note that every
  # VPC must have a default NACL - when this is false, the original default NACL
  # rules managed by AWS will be used.
  apply_default_nacl_rules = false

  # If true, will associate the default NACL to the public, private, and persistence
  # subnets created by this module. Only used if var.apply_default_nacl_rules is
  # true. Note that this does not guarantee that the subnets are associated with the
  # default NACL. Subnets can only be associated with a single NACL. The default
  # NACL association will be dropped if the subnets are associated with a custom
  # NACL later.
  associate_default_nacl_to_subnets = true

  # List of excluded Availability Zone IDs.
  availability_zone_exclude_ids = []

  # List of excluded Availability Zone names.
  availability_zone_exclude_names = []

  # List of specific Availability Zone IDs to use. If null (default), all
  # availability zones in the configured AWS region will be used.
  availability_zone_ids = null

  # Allows to filter list of Availability Zones based on their current state. Can be
  # either "available", "information", "impaired" or "unavailable". By default the
  # list includes a complete set of Availability Zones to which the underlying AWS
  # account has access, regardless of their state.
  availability_zone_state = null

  # DEPRECATED. The AWS Region where this VPC will exist. This variable is no longer
  # used and only kept around for backwards compatibility. We now automatically
  # fetch the region using a data source.
  aws_region = ""

  # If the VPC will create an Internet Gateway. There are use cases when the VPC is
  # desired to not be routable from the internet, and hence, they should not have an
  # Internet Gateway. For example, when it is desired that public subnets exist but
  # they are not directly public facing, since they can be routed from other VPC
  # hosting the IGW.
  create_igw = true

  # If set to false, this module will NOT create the private app subnet tier.
  create_private_app_subnets = true

  # If set to false, this module will NOT create the private persistence subnet
  # tier.
  create_private_persistence_subnets = true

  # If set to false, this module will NOT create the public subnet tier. This is
  # useful for VPCs that only need private subnets. Note that setting this to false
  # also means the module will NOT create an Internet Gateway or the NAT gateways,
  # so if you want any public Internet access in the VPC (even outbound access—e.g.,
  # to run apt get), you'll need to provide it yourself via some other mechanism
  # (e.g., via VPC peering, a Transit Gateway, Direct Connect, etc).
  create_public_subnets = true

  # Create VPC endpoints for S3 and DynamoDB.
  create_vpc_endpoints = true

  # The list of EIPs (allocation ids) to use for the NAT gateways. Their number has
  # to match the one given in 'num_nat_gateways'. Must be set if
  # var.use_custom_nat_eips us true.
  custom_nat_eips = []

  # A map of tags to apply to the VPC, Subnets, Route Tables, Internet Gateway,
  # default security group, and default NACLs. The key is the tag name and the value
  # is the tag value. Note that the tag 'Name' is automatically added by this module
  # but may be optionally overwritten by this variable.
  custom_tags = {}

  # The egress rules to apply to the default NACL in the VPC. This is the security
  # group that is used by any subnet that doesn't have its own NACL attached. The
  # value for this variable must be a map where the keys are a unique name for each
  # rule and the values are objects with the same fields as the egress block in the
  # aws_default_network_acl resource:
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/defa
  # lt_network_acl.
  default_nacl_egress_rules = {"AllowAll":{"action":"allow","cidr_block":"0.0.0.0/0","from_port":0,"protocol":"-1","rule_no":100,"to_port":0}}

  # The ingress rules to apply to the default NACL in the VPC. This is the NACL that
  # is used by any subnet that doesn't have its own NACL attached. The value for
  # this variable must be a map where the keys are a unique name for each rule and
  # the values are objects with the same fields as the ingress block in the
  # aws_default_network_acl resource:
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/defa
  # lt_network_acl.
  default_nacl_ingress_rules = {"AllowAll":{"action":"allow","cidr_block":"0.0.0.0/0","from_port":0,"protocol":"-1","rule_no":100,"to_port":0}}

  # The egress rules to apply to the default security group in the VPC. This is the
  # security group that is used by any resource that doesn't have its own security
  # group attached. The value for this variable must be a map where the keys are a
  # unique name for each rule and the values are objects with the same fields as the
  # egress block in the aws_default_security_group resource:
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/defa
  # lt_security_group#egress-block.
  default_security_group_egress_rules = {"AllowAllOutbound":{"cidr_blocks":["0.0.0.0/0"],"from_port":0,"ipv6_cidr_blocks":["::/0"],"protocol":"-1","to_port":0}}

  # The ingress rules to apply to the default security group in the VPC. This is the
  # security group that is used by any resource that doesn't have its own security
  # group attached. The value for this variable must be a map where the keys are a
  # unique name for each rule and the values are objects with the same fields as the
  # ingress block in the aws_default_security_group resource:
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/defa
  # lt_security_group#ingress-block.
  default_security_group_ingress_rules = {"AllowAllFromSelf":{"from_port":0,"protocol":"-1","self":true,"to_port":0}}

  # IAM policy to restrict what resources can call this endpoint. For example, you
  # can add an IAM policy that allows EC2 instances to talk to this endpoint but no
  # other types of resources. If not specified, all resources will be allowed to
  # call this endpoint.
  dynamodb_endpoint_policy = null

  # If set to false, the default security groups will NOT be created. This variable
  # is a workaround to a terraform limitation where overriding
  # var.default_security_group_ingress_rules = {} and
  # var.default_security_group_egress_rules = {} does not remove the rules. More
  # information at:
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/defa
  # lt_security_group#removing-aws_default_security_group-from-your-configuration
  enable_default_security_group = true

  # Specify true to indicate that instances launched into the public subnet should
  # be assigned a public IP address (versus a private IP address)
  map_public_ip_on_launch = false

  # A map of tags to apply to the NAT gateways, on top of the custom_tags. The key
  # is the tag name and the value is the tag value. Note that tags defined here will
  # override tags defined as custom_tags in case of conflict.
  nat_gateway_custom_tags = {}

  # How many AWS Availability Zones (AZs) to use. One subnet of each type (public,
  # private app, private persistence) will be created in each AZ. All AZs will be
  # used if you provide a value that is more than the number of AZs in a region. A
  # value of null means all AZs should be used. For example, if you specify 3 in a
  # region with 5 AZs, subnets will be created in just 3 AZs instead of all 5. On
  # the other hand, if you specify 6 in the same region, all 5 AZs will be used with
  # no duplicates (same as setting this to 5).
  num_availability_zones = null

  # If set to true, create one route table shared amongst all the public subnets; if
  # set to false, create a separate route table per public subnet. Historically, we
  # created one route table for all the public subnets, as they all routed through
  # the Internet Gateway anyway, but in certain use cases (e.g., for use with
  # Network Firewall), you may want to have separate route tables for each public
  # subnet.
  one_route_table_public_subnets = true

  # A list of Virtual Private Gateways that will propagate routes to persistence
  # subnets. All routes from VPN connections that use Virtual Private Gateways
  # listed here will appear in route tables of persistence subnets. If left empty,
  # no routes will be propagated.
  persistence_propagating_vgws = []

  # Takes the CIDR prefix and adds these many bits to it for calculating subnet
  # ranges.  MAKE SURE if you change this you also change the CIDR spacing or you
  # may hit errors.  See cidrsubnet interpolation in terraform config for more
  # information.
  persistence_subnet_bits = 5

  # The amount of spacing between the private persistence subnets. Default: 2 times
  # the value of private_subnet_spacing.
  persistence_subnet_spacing = null

  # A map of tags to apply to the private-app route table(s), on top of the
  # custom_tags. The key is the tag name and the value is the tag value. Note that
  # tags defined here will override tags defined as custom_tags in case of conflict.
  private_app_route_table_custom_tags = {}

  # A map listing the specific CIDR blocks desired for each private-app subnet. The
  # key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of
  # Availability Zones. If left blank, we will compute a reasonable CIDR block for
  # each subnet.
  private_app_subnet_cidr_blocks = {}

  # A map of tags to apply to the private-app Subnet, on top of the custom_tags. The
  # key is the tag name and the value is the tag value. Note that tags defined here
  # will override tags defined as custom_tags in case of conflict.
  private_app_subnet_custom_tags = {}

  # A map of tags to apply to the private-persistence route tables(s), on top of the
  # custom_tags. The key is the tag name and the value is the tag value. Note that
  # tags defined here will override tags defined as custom_tags in case of conflict.
  private_persistence_route_table_custom_tags = {}

  # A map listing the specific CIDR blocks desired for each private-persistence
  # subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number
  # of Availability Zones. If left blank, we will compute a reasonable CIDR block
  # for each subnet.
  private_persistence_subnet_cidr_blocks = {}

  # A map of tags to apply to the private-persistence Subnet, on top of the
  # custom_tags. The key is the tag name and the value is the tag value. Note that
  # tags defined here will override tags defined as custom_tags in case of conflict.
  private_persistence_subnet_custom_tags = {}

  # A list of Virtual Private Gateways that will propagate routes to private
  # subnets. All routes from VPN connections that use Virtual Private Gateways
  # listed here will appear in route tables of private subnets. If left empty, no
  # routes will be propagated.
  private_propagating_vgws = []

  # Takes the CIDR prefix and adds these many bits to it for calculating subnet
  # ranges.  MAKE SURE if you change this you also change the CIDR spacing or you
  # may hit errors.  See cidrsubnet interpolation in terraform config for more
  # information.
  private_subnet_bits = 5

  # The amount of spacing between private app subnets.
  private_subnet_spacing = null

  # A list of Virtual Private Gateways that will propagate routes to public subnets.
  # All routes from VPN connections that use Virtual Private Gateways listed here
  # will appear in route tables of public subnets. If left empty, no routes will be
  # propagated.
  public_propagating_vgws = []

  # A map of tags to apply to the public route table(s), on top of the custom_tags.
  # The key is the tag name and the value is the tag value. Note that tags defined
  # here will override tags defined as custom_tags in case of conflict.
  public_route_table_custom_tags = {}

  # Takes the CIDR prefix and adds these many bits to it for calculating subnet
  # ranges.  MAKE SURE if you change this you also change the CIDR spacing or you
  # may hit errors.  See cidrsubnet interpolation in terraform config for more
  # information.
  public_subnet_bits = 5

  # A map listing the specific CIDR blocks desired for each public subnet. The key
  # must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of Availability
  # Zones. If left blank, we will compute a reasonable CIDR block for each subnet.
  public_subnet_cidr_blocks = {}

  # A map of tags to apply to the public Subnet, on top of the custom_tags. The key
  # is the tag name and the value is the tag value. Note that tags defined here will
  # override tags defined as custom_tags in case of conflict.
  public_subnet_custom_tags = {}

  # The timeout for the creation of the Route Tables. It defines how long to wait
  # for a route table to be created before considering the operation failed. Ref:
  # https://www.terraform.io/language/resources/syntax#operation-timeouts
  route_table_creation_timeout = "5m"

  # The timeout for the deletion of the Route Tables. It defines how long to wait
  # for a route table to be deleted before considering the operation failed. Ref:
  # https://www.terraform.io/language/resources/syntax#operation-timeouts
  route_table_deletion_timeout = "5m"

  # The timeout for the update of the Route Tables. It defines how long to wait for
  # a route table to be updated before considering the operation failed. Ref:
  # https://www.terraform.io/language/resources/syntax#operation-timeouts
  route_table_update_timeout = "2m"

  # IAM policy to restrict what resources can call this endpoint. For example, you
  # can add an IAM policy that allows EC2 instances to talk to this endpoint but no
  # other types of resources. If not specified, all resources will be allowed to
  # call this endpoint.
  s3_endpoint_policy = null

  # A map of tags to apply to the default Security Group, on top of the custom_tags.
  # The key is the tag name and the value is the tag value. Note that tags defined
  # here will override tags defined as custom_tags in case of conflict.
  security_group_tags = {}

  # The amount of spacing between the different subnet types
  subnet_spacing = 10

  # The allowed tenancy of instances launched into the selected VPC. Must be one of:
  # default, dedicated, or host.
  tenancy = "default"

  # Set to true to use existing EIPs, passed in via var.custom_nat_eips, for the NAT
  # gateway(s), instead of creating new ones.
  use_custom_nat_eips = false

  # A map of tags to apply just to the VPC itself, but not any of the other
  # resources. The key is the tag name and the value is the tag value. Note that
  # tags defined here will override tags defined as custom_tags in case of conflict.
  vpc_custom_tags = {}

}

```

</ModuleUsage>




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

<HclListItem name="create_igw" requirement="optional" type="bool">
<HclListItemDescription>

If the VPC will create an Internet Gateway. There are use cases when the VPC is desired to not be routable from the internet, and hence, they should not have an Internet Gateway. For example, when it is desired that public subnets exist but they are not directly public facing, since they can be routed from other VPC hosting the IGW.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_private_app_subnets" requirement="optional" type="bool">
<HclListItemDescription>

If set to false, this module will NOT create the private app subnet tier.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_private_persistence_subnets" requirement="optional" type="bool">
<HclListItemDescription>

If set to false, this module will NOT create the private persistence subnet tier.

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

<HclListItem name="dynamodb_endpoint_policy" requirement="optional" type="string">
<HclListItemDescription>

IAM policy to restrict what resources can call this endpoint. For example, you can add an IAM policy that allows EC2 instances to talk to this endpoint but no other types of resources. If not specified, all resources will be allowed to call this endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="enable_default_security_group" requirement="optional" type="bool">
<HclListItemDescription>

If set to false, the default security groups will NOT be created. This variable is a workaround to a terraform limitation where overriding <a href="#default_security_group_ingress_rules"><code>default_security_group_ingress_rules</code></a> = {} and <a href="#default_security_group_egress_rules"><code>default_security_group_egress_rules</code></a> = {} does not remove the rules. More information at: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_security_group#removing-aws_default_security_group-from-your-configuration

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
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

How many AWS Availability Zones (AZs) to use. One subnet of each type (public, private app, private persistence) will be created in each AZ. All AZs will be used if you provide a value that is more than the number of AZs in a region. A value of null means all AZs should be used. For example, if you specify 3 in a region with 5 AZs, subnets will be created in just 3 AZs instead of all 5. On the other hand, if you specify 6 in the same region, all 5 AZs will be used with no duplicates (same as setting this to 5).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="one_route_table_public_subnets" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, create one route table shared amongst all the public subnets; if set to false, create a separate route table per public subnet. Historically, we created one route table for all the public subnets, as they all routed through the Internet Gateway anyway, but in certain use cases (e.g., for use with Network Firewall), you may want to have separate route tables for each public subnet.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
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

The amount of spacing between private app subnets.

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

<HclListItem name="tenancy" requirement="optional" type="string">
<HclListItemDescription>

The allowed tenancy of instances launched into the selected VPC. Must be one of: default, dedicated, or host.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;default&quot;"/>
</HclListItem>

<HclListItem name="use_custom_nat_eips" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to use existing EIPs, passed in via <a href="#custom_nat_eips"><code>custom_nat_eips</code></a>, for the NAT gateway(s), instead of creating new ones.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
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
</HclListItem>

<HclListItem name="default_security_group_id">
</HclListItem>

<HclListItem name="dynamodb_vpc_endpoint_id">
</HclListItem>

<HclListItem name="nat_gateway_ids">
</HclListItem>

<HclListItem name="nat_gateway_public_ips">
</HclListItem>

<HclListItem name="num_availability_zones">
</HclListItem>

<HclListItem name="private_app_subnet_arns">
</HclListItem>

<HclListItem name="private_app_subnet_cidr_blocks">
</HclListItem>

<HclListItem name="private_app_subnet_ids">
</HclListItem>

<HclListItem name="private_app_subnet_route_table_ids">
</HclListItem>

<HclListItem name="private_app_subnets">
<HclListItemDescription>

A map of all private-app subnets, with the subnet name as the key, and all `aws-subnet` properties as the value.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_persistence_route_table_ids">
</HclListItem>

<HclListItem name="private_persistence_subnet_arn">
</HclListItem>

<HclListItem name="private_persistence_subnet_cidr_blocks">
</HclListItem>

<HclListItem name="private_persistence_subnet_ids">
</HclListItem>

<HclListItem name="private_persistence_subnet_route_table_ids">
</HclListItem>

<HclListItem name="private_persistence_subnets">
<HclListItemDescription>

A map of all private-persistence subnets, with the subnet name as the key, and all `aws-subnet` properties as the value.

</HclListItemDescription>
</HclListItem>

<HclListItem name="public_subnet_arns">
</HclListItem>

<HclListItem name="public_subnet_cidr_blocks">
</HclListItem>

<HclListItem name="public_subnet_ids">
</HclListItem>

<HclListItem name="public_subnet_route_table_id">
</HclListItem>

<HclListItem name="public_subnet_route_table_ids">
</HclListItem>

<HclListItem name="public_subnets">
<HclListItemDescription>

A map of all public subnets, with the subnet name as the key, and all `aws-subnet` properties as the value.

</HclListItemDescription>
</HclListItem>

<HclListItem name="s3_vpc_endpoint_id">
</HclListItem>

<HclListItem name="vpc_cidr_block">
</HclListItem>

<HclListItem name="vpc_id">
</HclListItem>

<HclListItem name="vpc_name">
</HclListItem>

<HclListItem name="vpc_ready">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/main/modules/vpc-app/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/main/modules/vpc-app/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/main/modules/vpc-app/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "997d68eca8312fa5691c24b9ae700704"
}
##DOCS-SOURCER-END -->
