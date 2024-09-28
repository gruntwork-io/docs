---
title: "VPC Peering For External VPCs Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="VPC Modules" version="0.26.25" lastModifiedVersion="0.26.8"/>

# VPC Peering For External VPCs Module

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.26.25/modules/vpc-peering-external" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.8" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module creates route table entries for a [VPC Peering
Connection](http://docs.aws.amazon.com/AmazonVPC/latest/PeeringGuide/Welcome.html) between one of your internal VPCs (e.g.
Stage or Prod) and an external VPC managed by a 3rd party (e.g. a SaaS provider). For example, [QBox](https://qbox.io/)
is a SaaS provider that runs an Elasticsearch cluster for you in their own VPC and sends you a VPC Peering Connection
request to give you access to that VPC. This module can be used to set up the necessary routes so your VPC can talk to
the external VPC. Since VPC Peering is bidirectional, once you accept the connection, their VPC will also be able to
talk to your VPC, so this module also creates a default set of [Network
ACLs](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_ACLs.html) that lock down access as follows:

*   Allow outgoing connections from the private app subnets of your VPC to the 3rd party VPC only on specified ports.
*   Deny all other outgoing connections to the 3rd party VPC.
*   Allow incoming connections from the 3rd party VPC to [ephemeral
    ports](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_ACLs.html) in the private app subnet of your VPC.
    Network ACLs are stateless, so connections are required to to allow "return traffic" (that is, responses to your
    outgoing requests).
*   Deny all other incoming connections from the 3rd party VPC.

Rule #3 above is the risky one, as it allows the 3rd party VPC to make requests to your private app subnets on a wide
variety of ports. Unfortunately, there is no way to lock this down further with Network ACLs. To ensure this doesn't
cause security problems, you need to:

1.  Only allow VPC peering connections from trusted 3rd parties. Do your homework and research them thoroughly. Of
    course, it's possible the 3rd party has a bug or gets hacked, in which case you fall back to the next rule.
2.  Ensure every single resource in your private app subnets has a security group that only allows incoming connections
    from resources you trust (e.g. specific security groups or CIDR blocks). *Never* allow incoming connections from
    "anywhere" (0.0.0.0/0) in a security group, as "anywhere" will now include the 3rd party VPC.

## What's a VPC?

A [VPC](https://aws.amazon.com/vpc/) or Virtual Private Cloud is a logically isolated section of your AWS cloud. Each
VPC defines a virtual network within which you run your AWS resources, as well as rules for what can go in and out of
that network. This includes subnets, route tables that tell those subnets how to route inbound and outbound traffic,
security groups, access controls lists for the network (NACLs), and any other network components such as VPN connections.

## What's a Peering Connection?

A [VPC Peering Connection](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/vpc-peering.html) is a networking
connection between two VPCs that enables you to route traffic between them using private IP addresses. Instances in
either VPC can communicate with each other as if they are within the same network. You can create a VPC peering
connection between your own VPCs, or with a VPC in another AWS account within a single region.

## How do you work with Peering Connections from 3rd parties?

To set up a Peering Connection to a 3rd party VPC, the typical flow is:

1.  You get in touch with the party (e.g. sign up on their website) and provide them the details of your VPC.
2.  The 3rd party sends you a VPC Peering Connection Request.
3.  You accept this Connection Request manually in the VPC console. This creates a Peering Connection.
4.  Run this module to setup the Routing Rules and Network ACLs for the Peering Connection.

## What's a Network ACL?

[Network ACLs](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_ACLs.html) provide an extra layer of network
security, similar to a [security group](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html).
Whereas a security group controls what inbound and outbound traffic is allowed for a specific resource (e.g. a single
EC2 instance), a network ACL controls what inbound and outbound traffic is allowed for an entire subnet.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-PEERING-EXTERNAL MODULE
# ------------------------------------------------------------------------------------------------------

module "vpc_peering_external" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-peering-external?ref=v0.26.25"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of IDs of all Network ACLs in your VPC. This is used to add a global
  # DENY rule that prevents inbound traffic from the external VPC, other than
  # anything explicitly allowed.
  all_network_acl_ids = <list(string)>

  # The starting rule number for adding the global DENY egress rules to the
  # Network ACLs in var.all_network_acl_ids. This should be a high number
  # (always higher than var.egress_starting_rule_number) to ensure rules that
  # explicitly allow outbound connections to the external VPC take precedence.
  egress_high_starting_rule_number = <number>

  # The starting rule number for adding egress rules to the Network ACLs in
  # var.network_acl_ids_with_external_vpc_access. This is used to ensure we
  # don't add rules to those ACLs with numbers that conflict with existing
  # rules.
  egress_starting_rule_number = <number>

  # The IP address range of the external VPC in CIDR notation (e.g. 10.0.2.0/16)
  external_vpc_cidr_block = <string>

  # The starting rule number for adding the global DENY ingress rules to the
  # Network ACLs in var.all_network_acl_ids. This should be a high number
  # (always higher than var.ingress_starting_rule_number) to ensure rules that
  # explicitly allow inbound connections from the external VPC take precedence.
  ingress_high_starting_rule_number = <number>

  # The starting rule number for adding ingress rules to the Network ACLs in
  # var.network_acl_ids_with_external_vpc_access. This is used to ensure we
  # don't add rules to those ACLs with numbers that conflict with existing
  # rules.
  ingress_starting_rule_number = <number>

  # A list of route table IDs for the internal VPC that you wish to be able to
  # talk to the external VPC
  internal_vpc_route_table_ids = <list(string)>

  # A list of IDs of Network ACLs that should have permissions added to them to
  # allow access to the external VPC. We assume you already have Network ACLs on
  # your subnets and that you pass in the IDs here. We cannot create the Network
  # ACLs for you, as each subnet can only be associated with one Network ACL and
  # there is no way to know in Terraform if yours already has one.
  network_acl_ids_with_external_vpc_access = <list(string)>

  # The number of IDs in var.all_network_acl_ids. We should be able to compute
  # this automatically, but due to a Terraform limitation, we can't:
  # https://github.com/hashicorp/terraform/issues/14677#issuecomment-302772685
  num_all_network_acl_ids = <number>

  # The number of route table IDs in var.internal_vpc_route_table_ids. We should
  # be able to compute this automatically, but due to a Terraform limitation, we
  # can't:
  # https://github.com/hashicorp/terraform/issues/14677#issuecomment-302772685
  num_internal_vpc_route_tables = <INPUT REQUIRED>

  # The number of IDs in var.network_acl_ids_with_external_vpc_access. We should
  # be able to compute this automatically, but due to a Terraform limitation, we
  # can't:
  # https://github.com/hashicorp/terraform/issues/14677#issuecomment-302772685
  num_network_acl_ids_with_external_vpc_access = <number>

  # Allow communication between the internal and external VPC on ports between
  # var.outbound_from_port and var.outbound_to_port.
  outbound_from_port = <number>

  # Allow communication between the internal and external VPC on ports between
  # var.outbound_from_port and var.outbound_to_port.
  outbound_to_port = <number>

  # The protocol to allow in communication between the internal and external VPC
  # (e.g. tcp)
  protocol = <string>

  # The ID of the VPC Peering Connection between the internal VPC and the
  # external VPC. Typically, the 3rd party who owns the external VPC will send
  # you a VPC Peering Connection request that you must manually accept in the
  # AWS console. Once you accept it, you'll be able to see the ID.
  vpc_peering_connection_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Set this to false if you do not wish to create a blanket `deny` ACL that
  # will help to avoid problems with overly permissive rules. Defaults to true.
  enable_blanket_deny = true

  # Return traffic will be allowed on all ports between var.ephemeral_from_port
  # and var.ephemeral_to_port, inclusive, from var.external_vpc_cidr_block
  ephemeral_from_port = 1024

  # Return traffic will be allowed on all ports between var.ephemeral_from_port
  # and var.ephemeral_to_port, inclusive, from var.external_vpc_cidr_block
  ephemeral_to_port = 65535

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-PEERING-EXTERNAL MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-peering-external?ref=v0.26.25"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of IDs of all Network ACLs in your VPC. This is used to add a global
  # DENY rule that prevents inbound traffic from the external VPC, other than
  # anything explicitly allowed.
  all_network_acl_ids = <list(string)>

  # The starting rule number for adding the global DENY egress rules to the
  # Network ACLs in var.all_network_acl_ids. This should be a high number
  # (always higher than var.egress_starting_rule_number) to ensure rules that
  # explicitly allow outbound connections to the external VPC take precedence.
  egress_high_starting_rule_number = <number>

  # The starting rule number for adding egress rules to the Network ACLs in
  # var.network_acl_ids_with_external_vpc_access. This is used to ensure we
  # don't add rules to those ACLs with numbers that conflict with existing
  # rules.
  egress_starting_rule_number = <number>

  # The IP address range of the external VPC in CIDR notation (e.g. 10.0.2.0/16)
  external_vpc_cidr_block = <string>

  # The starting rule number for adding the global DENY ingress rules to the
  # Network ACLs in var.all_network_acl_ids. This should be a high number
  # (always higher than var.ingress_starting_rule_number) to ensure rules that
  # explicitly allow inbound connections from the external VPC take precedence.
  ingress_high_starting_rule_number = <number>

  # The starting rule number for adding ingress rules to the Network ACLs in
  # var.network_acl_ids_with_external_vpc_access. This is used to ensure we
  # don't add rules to those ACLs with numbers that conflict with existing
  # rules.
  ingress_starting_rule_number = <number>

  # A list of route table IDs for the internal VPC that you wish to be able to
  # talk to the external VPC
  internal_vpc_route_table_ids = <list(string)>

  # A list of IDs of Network ACLs that should have permissions added to them to
  # allow access to the external VPC. We assume you already have Network ACLs on
  # your subnets and that you pass in the IDs here. We cannot create the Network
  # ACLs for you, as each subnet can only be associated with one Network ACL and
  # there is no way to know in Terraform if yours already has one.
  network_acl_ids_with_external_vpc_access = <list(string)>

  # The number of IDs in var.all_network_acl_ids. We should be able to compute
  # this automatically, but due to a Terraform limitation, we can't:
  # https://github.com/hashicorp/terraform/issues/14677#issuecomment-302772685
  num_all_network_acl_ids = <number>

  # The number of route table IDs in var.internal_vpc_route_table_ids. We should
  # be able to compute this automatically, but due to a Terraform limitation, we
  # can't:
  # https://github.com/hashicorp/terraform/issues/14677#issuecomment-302772685
  num_internal_vpc_route_tables = <INPUT REQUIRED>

  # The number of IDs in var.network_acl_ids_with_external_vpc_access. We should
  # be able to compute this automatically, but due to a Terraform limitation, we
  # can't:
  # https://github.com/hashicorp/terraform/issues/14677#issuecomment-302772685
  num_network_acl_ids_with_external_vpc_access = <number>

  # Allow communication between the internal and external VPC on ports between
  # var.outbound_from_port and var.outbound_to_port.
  outbound_from_port = <number>

  # Allow communication between the internal and external VPC on ports between
  # var.outbound_from_port and var.outbound_to_port.
  outbound_to_port = <number>

  # The protocol to allow in communication between the internal and external VPC
  # (e.g. tcp)
  protocol = <string>

  # The ID of the VPC Peering Connection between the internal VPC and the
  # external VPC. Typically, the 3rd party who owns the external VPC will send
  # you a VPC Peering Connection request that you must manually accept in the
  # AWS console. Once you accept it, you'll be able to see the ID.
  vpc_peering_connection_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Set this to false if you do not wish to create a blanket `deny` ACL that
  # will help to avoid problems with overly permissive rules. Defaults to true.
  enable_blanket_deny = true

  # Return traffic will be allowed on all ports between var.ephemeral_from_port
  # and var.ephemeral_to_port, inclusive, from var.external_vpc_cidr_block
  ephemeral_from_port = 1024

  # Return traffic will be allowed on all ports between var.ephemeral_from_port
  # and var.ephemeral_to_port, inclusive, from var.external_vpc_cidr_block
  ephemeral_to_port = 65535

}


```

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.26.25/modules/vpc-peering-external/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.26.25/modules/vpc-peering-external/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.26.25/modules/vpc-peering-external/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "e1e4c0c14a4ae3a3e8168e7189c674b1"
}
##DOCS-SOURCER-END -->
