---
title: "VPC-App Terraform Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="VPC Modules" version="0.28.7" lastModifiedVersion="0.28.3"/>

# VPC-App Terraform Module

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.7/modules/vpc-app" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.3" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module launches a single VPC meant to house applications. By contrast, DevOps-related services such as
Jenkins or InfluxDB should be in a "mgmt" VPC. (See the [vpc-mgmt](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.7/modules/vpc-mgmt) module.)

## Background

### What's a VPC?

A [VPC](https://aws.amazon.com/vpc/) or Virtual Private Cloud is a logically isolated section of your AWS cloud. Each
VPC defines a virtual network within which you run your AWS resources, as well as rules for what can go in and out of
that network. This includes subnets, route tables that tell those subnets how to route inbound and outbound traffic,
security groups, access controls lists for the network (NACLs), and any other network components such as VPN connections.

### Subnet Tiers

This VPC defines four "tiers" of subnets:

*   **Public Subnets**: Resources in these subnets are directly addressable from the internet. Only public-facing
    resources (typically just load balancers) should be put here.
*   **Private/App Subnets**: Resources in these subnets are NOT directly addressable from the internet but they can make
    outbound connections to the internet through a NAT Gateway. You can connect to the resources in this subnet only from
    resources within the VPC, so you should put your app servers here and allow the load balancers in the Public Subnet
    to route traffic to them.
*   **Private/Persistence Subnets**: Resources in these subnets are not directly addressable from the internet. You can
    connect to the resources in this subnet only from within the VPC, so you should put your databases, cache servers,
    and other stateful resources here and allow your apps to talk to them.
*   **Transit Subnets**: These subnets are disabled by default. Resources in these subnets are are not directly addressable from the internet. This subnet is
    dedicated for the transit of network traffic. It should be utilized as the attachment point for transit gateways,
    network appliances, VPN connections, and Direct Connect connections.

### VPC Architecture

The four-tier VPC is inspired by the VPC Architecture described by Ben Whaley in his blog post [A Reference
VPC Architecture](https://www.whaletech.co/2014/10/02/reference-vpc-architecture.html). That blog post proposed the
following VPC structure:

![VPC Diagram](/img/reference/modules/terraform-aws-vpc/vpc-app/vpc_app_topology.png)

To summarize:

*   Each environment (prod, stage, etc.) is represented by a separate VPC.
*   Each VPC has four "tiers" of subnets to allow AWS resources to be publicly addressable, addressable only from the
    public tier, or only from the private/app tier.
*   In a given subnet tier, there are usually three subnets, one for each Availability Zone.
*   Therefore, if we created a single VPC in the `us-west-2` region, which has Availability Zones `us-west-2a`,`us-west-2b`,
    and `us-west-2c`, each subnet tier would have three subnets (one per Availability Zone) for a total of twelve subnets in all.
*   The only way to reach this VPC is from the public internet via a publicly exposed service, a service such as SSM, a transit
    gateway, VPC peering, or a VPN connection.
*   Philosophically, everything in a VPC should be isolated from all resources in any other VPC. In particular, we want
    to ensure that our stage environment is completely independent from prod. This architecture helps to reinforce that.

Throughout our diagrams and examples we recommend a /16 CIDR range for VPCs. The reason for this is that a /16 makes
CIDR math quite straightforward. If using the 10.0.0.0/8 [RFC1918](http://www.faqs.org/rfcs/rfc1918.html) address space,
this allows for 256 VPCs (10.0.0.0/16-10.255.255.255/16) with 65,534 IP addresses per VPC. This should be sufficient for
nearly all use-cases, and is consistent with many examples and existing documentation found elsewhere.

### Gotchas

*   If the `num_availability_zones` variable in the mgmt VPC and the `num_availability_zones` variable in the app VPC don't match, there are problems with the routes that are created between the two VPCs as part of setting up VPC Peering. If your use case requires different numbers of Availability Zones for each of these VPCs, please let us know and we'll investigate further!

### Other VPC Core Concepts

Learn about [Other VPC Core Concepts](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.7/modules//_docs/vpc-core-concepts.md) like subnets, NAT Gateways, and VPC Endpoints.

## IPv6

### IPv6 Design

![IPv6 Topology](/img/reference/modules/terraform-aws-vpc/vpc-app/_dual_stack_vpc.png)

For more IPv6 information, please see the following documentation from AWS - [IPv6 on AWS](https://docs.aws.amazon.com/whitepapers/latest/ipv6-on-aws/IPv6-on-AWS.html)

### Simple IPv6 Assigned from AWS Example

The following example assigns your VPC a CIDR block from AWS and assigns an IPv6 CIDR block to each public subnet.

```hcl
module "vpc_app_ipv6_example" {
  source                           = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-app?ref=v0.26.0"

  assign_generated_ipv6_cidr_block = true
  aws_region                       = var.aws_region
  cidr_block                       = "10.0.0.0/16"
  enable_ipv6                      = true
  num_nat_gateways                 = 3
  vpc_name                         = var.vpc_name
}
```

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-APP MODULE
# ------------------------------------------------------------------------------------------------------

module "vpc_app" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-app?ref=v0.28.7"

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

  # Should the inspection subnet be allowed outbound access to the internet?
  allow_inspection_internet_access = false

  # Should the private app subnet be allowed outbound access to the internet?
  allow_private_app_internet_access = true

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

  # List of excluded Availability Zone names.
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

  # If set to true, this module will create a default route table route to the
  # Internet Gateway. If set to false, this module will NOT create a default
  # route table route to the Internet Gateway. This is useful if you have
  # subnets which utilize the default route table. Defaults to true.
  create_default_route_table_route = true

  # If the VPC will create an Internet Gateway. There are use cases when the VPC
  # is desired to not be routable from the internet, and hence, they should not
  # have an Internet Gateway. For example, when it is desired that public
  # subnets exist but they are not directly public facing, since they can be
  # routed from other VPC hosting the IGW.
  create_igw = true

  # If set to false, this module will NOT create the inspection subnets.
  create_inspection_subnets = false

  # Flag that controls attachment of secondary EIP to NAT gateway.
  create_nat_secondary_eip = false

  # If set to false, this module will NOT create the private app subnet tier.
  create_private_app_subnets = true

  # If set to false, this module will NOT create the private persistence subnet
  # tier.
  create_private_persistence_subnets = true

  # If set to false, this module will NOT create the public subnet tier. This is
  # useful for VPCs that only need private subnets. Note that setting this to
  # false also means the module will NOT create an Internet Gateway or the NAT
  # gateways, so if you want any public Internet access in the VPC (even
  # outbound access—e.g., to run apt get), you'll need to provide it yourself
  # via some other mechanism (e.g., via VPC peering, a Transit Gateway, Direct
  # Connect, etc). Defaults to true.
  create_public_subnets = true

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
  default_nacl_egress_rules = {"AllowAllIPv4":{"action":"allow","cidr_block":"0.0.0.0/0","from_port":0,"protocol":"-1","rule_no":100,"to_port":0},"AllowAllIPv6":{"action":"allow","from_port":0,"ipv6_cidr_block":"::/0","protocol":"-1","rule_no":101,"to_port":0}}

  # The ingress rules to apply to the default NACL in the VPC. This is the NACL
  # that is used by any subnet that doesn't have its own NACL attached. The
  # value for this variable must be a map where the keys are a unique name for
  # each rule and the values are objects with the same fields as the ingress
  # block in the aws_default_network_acl resource:
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_network_acl.
  default_nacl_ingress_rules = {"AllowAllIPv4":{"action":"allow","cidr_block":"0.0.0.0/0","from_port":0,"protocol":"-1","rule_no":100,"to_port":0},"AllowAllIPv6":{"action":"allow","from_port":0,"ipv6_cidr_block":"::/0","protocol":"-1","rule_no":101,"to_port":0}}

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

  # The DHCP Options Set ID to associate with the VPC. After specifying this
  # attribute, removing it will delete the DHCP option assignment, leaving the
  # VPC without any DHCP option set, rather than reverting to the one set by
  # default.
  dhcp_options_id = null

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

  # The amount of spacing between the different subnet types when all subnets
  # are present, such as the transit subnets.
  global_subnet_spacing = 6

  # A list of Virtual Private Gateways that will propagate routes to inspection
  # subnets. All routes from VPN connections that use Virtual Private Gateways
  # listed here will appear in route tables of persistence subnets. If left
  # empty, no routes will be propagated.
  inspection_propagating_vgws = []

  # A map of tags to apply to the inspection route tables(s), on top of the
  # custom_tags. The key is the tag name and the value is the tag value. Note
  # that tags defined here will override tags defined as custom_tags in case of
  # conflict.
  inspection_route_table_custom_tags = {}

  # Takes the CIDR prefix and adds these many bits to it for calculating subnet
  # ranges. MAKE SURE if you change this you also change the CIDR spacing or you
  # may hit errors. See cidrsubnet interpolation in terraform config for more
  # information.
  inspection_subnet_bits = 5

  # A map listing the specific CIDR blocks desired for each private-persistence
  # subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the
  # number of Availability Zones. If left blank, we will compute a reasonable
  # CIDR block for each subnet.
  inspection_subnet_cidr_blocks = {}

  # A map of tags to apply to the inspection subnets, on top of the custom_tags.
  # The key is the tag name and the value is the tag value. Note that tags
  # defined here will override tags defined as custom_tags in case of conflict.
  inspection_subnet_custom_tags = {}

  # The name of the inspection subnet tier. This is used to tag the subnet and
  # its resources.
  inspection_subnet_name = "inspection"

  # The amount of spacing between the inspection subnets.
  inspection_subnet_spacing = null

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
  # (public, private app, private persistence) will be created in each AZ. All
  # AZs will be used if you provide a value that is more than the number of AZs
  # in a region. A value of null means all AZs should be used. For example, if
  # you specify 3 in a region with 5 AZs, subnets will be created in just 3 AZs
  # instead of all 5. On the other hand, if you specify 6 in the same region,
  # all 5 AZs will be used with no duplicates (same as setting this to 5).
  num_availability_zones = null

  # If set to true, create one route table shared amongst all the public
  # subnets; if set to false, create a separate route table per public subnet.
  # Historically, we created one route table for all the public subnets, as they
  # all routed through the Internet Gateway anyway, but in certain use cases
  # (e.g., for use with Network Firewall), you may want to have separate route
  # tables for each public subnet.
  one_route_table_public_subnets = true

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

  # The amount of spacing between the private persistence subnets.
  persistence_subnet_spacing = null

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

  # The amount of spacing between private app subnets.
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
# DEPLOY GRUNTWORK'S VPC-APP MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-app?ref=v0.28.7"
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

  # Should the inspection subnet be allowed outbound access to the internet?
  allow_inspection_internet_access = false

  # Should the private app subnet be allowed outbound access to the internet?
  allow_private_app_internet_access = true

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

  # List of excluded Availability Zone names.
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

  # If set to true, this module will create a default route table route to the
  # Internet Gateway. If set to false, this module will NOT create a default
  # route table route to the Internet Gateway. This is useful if you have
  # subnets which utilize the default route table. Defaults to true.
  create_default_route_table_route = true

  # If the VPC will create an Internet Gateway. There are use cases when the VPC
  # is desired to not be routable from the internet, and hence, they should not
  # have an Internet Gateway. For example, when it is desired that public
  # subnets exist but they are not directly public facing, since they can be
  # routed from other VPC hosting the IGW.
  create_igw = true

  # If set to false, this module will NOT create the inspection subnets.
  create_inspection_subnets = false

  # Flag that controls attachment of secondary EIP to NAT gateway.
  create_nat_secondary_eip = false

  # If set to false, this module will NOT create the private app subnet tier.
  create_private_app_subnets = true

  # If set to false, this module will NOT create the private persistence subnet
  # tier.
  create_private_persistence_subnets = true

  # If set to false, this module will NOT create the public subnet tier. This is
  # useful for VPCs that only need private subnets. Note that setting this to
  # false also means the module will NOT create an Internet Gateway or the NAT
  # gateways, so if you want any public Internet access in the VPC (even
  # outbound access—e.g., to run apt get), you'll need to provide it yourself
  # via some other mechanism (e.g., via VPC peering, a Transit Gateway, Direct
  # Connect, etc). Defaults to true.
  create_public_subnets = true

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
  default_nacl_egress_rules = {"AllowAllIPv4":{"action":"allow","cidr_block":"0.0.0.0/0","from_port":0,"protocol":"-1","rule_no":100,"to_port":0},"AllowAllIPv6":{"action":"allow","from_port":0,"ipv6_cidr_block":"::/0","protocol":"-1","rule_no":101,"to_port":0}}

  # The ingress rules to apply to the default NACL in the VPC. This is the NACL
  # that is used by any subnet that doesn't have its own NACL attached. The
  # value for this variable must be a map where the keys are a unique name for
  # each rule and the values are objects with the same fields as the ingress
  # block in the aws_default_network_acl resource:
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_network_acl.
  default_nacl_ingress_rules = {"AllowAllIPv4":{"action":"allow","cidr_block":"0.0.0.0/0","from_port":0,"protocol":"-1","rule_no":100,"to_port":0},"AllowAllIPv6":{"action":"allow","from_port":0,"ipv6_cidr_block":"::/0","protocol":"-1","rule_no":101,"to_port":0}}

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

  # The DHCP Options Set ID to associate with the VPC. After specifying this
  # attribute, removing it will delete the DHCP option assignment, leaving the
  # VPC without any DHCP option set, rather than reverting to the one set by
  # default.
  dhcp_options_id = null

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

  # The amount of spacing between the different subnet types when all subnets
  # are present, such as the transit subnets.
  global_subnet_spacing = 6

  # A list of Virtual Private Gateways that will propagate routes to inspection
  # subnets. All routes from VPN connections that use Virtual Private Gateways
  # listed here will appear in route tables of persistence subnets. If left
  # empty, no routes will be propagated.
  inspection_propagating_vgws = []

  # A map of tags to apply to the inspection route tables(s), on top of the
  # custom_tags. The key is the tag name and the value is the tag value. Note
  # that tags defined here will override tags defined as custom_tags in case of
  # conflict.
  inspection_route_table_custom_tags = {}

  # Takes the CIDR prefix and adds these many bits to it for calculating subnet
  # ranges. MAKE SURE if you change this you also change the CIDR spacing or you
  # may hit errors. See cidrsubnet interpolation in terraform config for more
  # information.
  inspection_subnet_bits = 5

  # A map listing the specific CIDR blocks desired for each private-persistence
  # subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the
  # number of Availability Zones. If left blank, we will compute a reasonable
  # CIDR block for each subnet.
  inspection_subnet_cidr_blocks = {}

  # A map of tags to apply to the inspection subnets, on top of the custom_tags.
  # The key is the tag name and the value is the tag value. Note that tags
  # defined here will override tags defined as custom_tags in case of conflict.
  inspection_subnet_custom_tags = {}

  # The name of the inspection subnet tier. This is used to tag the subnet and
  # its resources.
  inspection_subnet_name = "inspection"

  # The amount of spacing between the inspection subnets.
  inspection_subnet_spacing = null

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
  # (public, private app, private persistence) will be created in each AZ. All
  # AZs will be used if you provide a value that is more than the number of AZs
  # in a region. A value of null means all AZs should be used. For example, if
  # you specify 3 in a region with 5 AZs, subnets will be created in just 3 AZs
  # instead of all 5. On the other hand, if you specify 6 in the same region,
  # all 5 AZs will be used with no duplicates (same as setting this to 5).
  num_availability_zones = null

  # If set to true, create one route table shared amongst all the public
  # subnets; if set to false, create a separate route table per public subnet.
  # Historically, we created one route table for all the public subnets, as they
  # all routed through the Internet Gateway anyway, but in certain use cases
  # (e.g., for use with Network Firewall), you may want to have separate route
  # tables for each public subnet.
  one_route_table_public_subnets = true

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

  # The amount of spacing between the private persistence subnets.
  persistence_subnet_spacing = null

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

  # The amount of spacing between private app subnets.
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

<HclListItem name="allow_inspection_internet_access" requirement="optional" type="bool">
<HclListItemDescription>

Should the inspection subnet be allowed outbound access to the internet?

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="allow_private_app_internet_access" requirement="optional" type="bool">
<HclListItemDescription>

Should the private app subnet be allowed outbound access to the internet?

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

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

<HclListItem name="create_default_route_table_route" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, this module will create a default route table route to the Internet Gateway. If set to false, this module will NOT create a default route table route to the Internet Gateway. This is useful if you have subnets which utilize the default route table. Defaults to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_igw" requirement="optional" type="bool">
<HclListItemDescription>

If the VPC will create an Internet Gateway. There are use cases when the VPC is desired to not be routable from the internet, and hence, they should not have an Internet Gateway. For example, when it is desired that public subnets exist but they are not directly public facing, since they can be routed from other VPC hosting the IGW.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_inspection_subnets" requirement="optional" type="bool">
<HclListItemDescription>

If set to false, this module will NOT create the inspection subnets.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="create_nat_secondary_eip" requirement="optional" type="bool">
<HclListItemDescription>

Flag that controls attachment of secondary EIP to NAT gateway.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
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

If set to false, this module will NOT create the public subnet tier. This is useful for VPCs that only need private subnets. Note that setting this to false also means the module will NOT create an Internet Gateway or the NAT gateways, so if you want any public Internet access in the VPC (even outbound access—e.g., to run apt get), you'll need to provide it yourself via some other mechanism (e.g., via VPC peering, a Transit Gateway, Direct Connect, etc). Defaults to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
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
  AllowAllIPv4 = {
    action = "allow",
    cidr_block = "0.0.0.0/0",
    from_port = 0,
    protocol = "-1",
    rule_no = 100,
    to_port = 0
  },
  AllowAllIPv6 = {
    action = "allow",
    from_port = 0,
    ipv6_cidr_block = "::/0",
    protocol = "-1",
    rule_no = 101,
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
  AllowAllIPv4 = {
    action = "allow",
    cidr_block = "0.0.0.0/0",
    from_port = 0,
    protocol = "-1",
    rule_no = 100,
    to_port = 0
  },
  AllowAllIPv6 = {
    action = "allow",
    from_port = 0,
    ipv6_cidr_block = "::/0",
    protocol = "-1",
    rule_no = 101,
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

<HclListItem name="dhcp_options_id" requirement="optional" type="string">
<HclListItemDescription>

The DHCP Options Set ID to associate with the VPC. After specifying this attribute, removing it will delete the DHCP option assignment, leaving the VPC without any DHCP option set, rather than reverting to the one set by default.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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

<HclListItem name="global_subnet_spacing" requirement="optional" type="number">
<HclListItemDescription>

The amount of spacing between the different subnet types when all subnets are present, such as the transit subnets.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="6"/>
</HclListItem>

<HclListItem name="inspection_propagating_vgws" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of Virtual Private Gateways that will propagate routes to inspection subnets. All routes from VPN connections that use Virtual Private Gateways listed here will appear in route tables of persistence subnets. If left empty, no routes will be propagated.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="inspection_route_table_custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the inspection route tables(s), on top of the custom_tags. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="inspection_subnet_bits" requirement="optional" type="number">
<HclListItemDescription>

Takes the CIDR prefix and adds these many bits to it for calculating subnet ranges. MAKE SURE if you change this you also change the CIDR spacing or you may hit errors. See cidrsubnet interpolation in terraform config for more information.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="5"/>
</HclListItem>

<HclListItem name="inspection_subnet_cidr_blocks" requirement="optional" type="map(string)">
<HclListItemDescription>

A map listing the specific CIDR blocks desired for each private-persistence subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of Availability Zones. If left blank, we will compute a reasonable CIDR block for each subnet.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="inspection_subnet_custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the inspection subnets, on top of the custom_tags. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="inspection_subnet_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the inspection subnet tier. This is used to tag the subnet and its resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;inspection&quot;"/>
</HclListItem>

<HclListItem name="inspection_subnet_spacing" requirement="optional" type="number">
<HclListItemDescription>

The amount of spacing between the inspection subnets.

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

The amount of spacing between the private persistence subnets.

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

<HclListItem name="default_route_table_id">
</HclListItem>

<HclListItem name="default_security_group_id">
</HclListItem>

<HclListItem name="dynamodb_vpc_endpoint_id">
</HclListItem>

<HclListItem name="inspection_route_table_ids">
</HclListItem>

<HclListItem name="inspection_subnet_arns">
</HclListItem>

<HclListItem name="inspection_subnet_cidr_blocks">
</HclListItem>

<HclListItem name="inspection_subnet_ids">
</HclListItem>

<HclListItem name="inspection_subnet_route_table_ids">
</HclListItem>

<HclListItem name="inspection_subnets">
<HclListItemDescription>

A map of all inspection subnets, with the subnet ID as the key, and all `aws-subnet` properties as the value.

</HclListItemDescription>
</HclListItem>

<HclListItem name="internet_gateway_id">
</HclListItem>

<HclListItem name="ipv6_cidr_block">
<HclListItemDescription>

The IPv6 CIDR block associated with the VPC.

</HclListItemDescription>
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

A map of all private-app subnets, with the subnet ID as the key, and all `aws-subnet` properties as the value.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_nat_gateway_ids">
</HclListItem>

<HclListItem name="private_persistence_route_table_ids">
</HclListItem>

<HclListItem name="private_persistence_subnet_arn">
<HclListItemDescription>

DEPRECATED. Use `private_persistence_subnet_arns` instead.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_persistence_subnet_arns">
</HclListItem>

<HclListItem name="private_persistence_subnet_cidr_blocks">
</HclListItem>

<HclListItem name="private_persistence_subnet_ids">
</HclListItem>

<HclListItem name="private_persistence_subnet_route_table_ids">
</HclListItem>

<HclListItem name="private_persistence_subnets">
<HclListItemDescription>

A map of all private-persistence subnets, with the subnet ID as the key, and all `aws-subnet` properties as the value.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_subnet_route_table_ids">
</HclListItem>

<HclListItem name="public_subnet_arns">
</HclListItem>

<HclListItem name="public_subnet_cidr_blocks">
</HclListItem>

<HclListItem name="public_subnet_ids">
</HclListItem>

<HclListItem name="public_subnet_ipv6_cidr_blocks">
</HclListItem>

<HclListItem name="public_subnet_route_table_id">
</HclListItem>

<HclListItem name="public_subnet_route_table_ids">
</HclListItem>

<HclListItem name="public_subnets">
<HclListItemDescription>

A map of all public subnets, with the subnet ID as the key, and all `aws-subnet` properties as the value.

</HclListItemDescription>
</HclListItem>

<HclListItem name="route_tables_for_network_firewall">
<HclListItemDescription>

A map of subnet IDs to routing tables IDs used for routing establishment purposes.

</HclListItemDescription>
</HclListItem>

<HclListItem name="s3_vpc_endpoint_id">
</HclListItem>

<HclListItem name="secondary_cidr_block_ids">
<HclListItemDescription>

Map of the secondary CIDR block associations with the VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="subnets_attr_for_network_firewall">
<HclListItemDescription>

A map of subnet IDs to various attributes used for routing establishment purposes.

</HclListItemDescription>
</HclListItem>

<HclListItem name="transit_subnet_arns">
</HclListItem>

<HclListItem name="transit_subnet_cidr_blocks">
</HclListItem>

<HclListItem name="transit_subnet_ids">
</HclListItem>

<HclListItem name="transit_subnet_route_table_ids">
</HclListItem>

<HclListItem name="transit_subnets">
<HclListItemDescription>

A map of all transit subnets, with the subnet ID as the key, and all `aws-subnet` properties as the value.

</HclListItemDescription>
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
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.7/modules/vpc-app/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.7/modules/vpc-app/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.7/modules/vpc-app/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "261b83dc4d62641b0a01e0415c374a7b"
}
##DOCS-SOURCER-END -->
