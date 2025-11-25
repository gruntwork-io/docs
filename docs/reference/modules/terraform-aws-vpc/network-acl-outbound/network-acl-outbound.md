---
title: "Network ACL Outbound Terraform Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="VPC Modules" version="0.28.9" lastModifiedVersion="0.28.9"/>

# Network ACL Outbound Terraform Module

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.9/modules/network-acl-outbound" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.9" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module launches is a simple helper for adding outbound rules to a [Network
ACL](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_ACLs.html). Network ACLs can be a bit tricky to work with
because they are stateless, which means that opening an outbound port is often not enough; you also need to open
[ephemeral inbound ports](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_ACLs.html#VPC_ACLs_Ephemeral_Ports)
which the remote services can use to respond. This can be very easy to forget, so this module adds not only the
outbound to an ACL, but also the ephemeral inbound ports for return traffic.

See the [network-acl-inbound](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.9/modules/network-acl-inbound) module for the analogous version of this module, but for opening
inbound ports.

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
# DEPLOY GRUNTWORK'S NETWORK-ACL-OUTBOUND MODULE
# ------------------------------------------------------------------------------------------------------

module "network_acl_outbound" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/network-acl-outbound?ref=v0.28.9"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The number to use for the egress rule that will be added. Each egress rule
  # in an network ACL must have a unique rule number.
  egress_rule_number = <number>

  # The starting number to use for ingress rules that are added. Each ingress
  # rule in an network ACL must have a unique rule number.
  ingress_rule_number = <number>

  # The id of the network ACL to which the new rules should be attached
  network_acl_id = <string>

  # The number of CIDR blocks in var.outbound_cidr_blocks. We should be able to
  # compute this automatically, but due to a Terraform limitation, we can't:
  # https://github.com/hashicorp/terraform/issues/14677#issuecomment-302772685
  num_outbound_cidr_blocks = <number>

  # A list of CIDR blocks to which outbound connections should be allowed at
  # var.outbound_ports
  outbound_cidr_blocks = <list(string)>

  # Allow all outbound traffic on ports between var.outbound_from_port and
  # var.outbound_to_port, inclusive
  outbound_from_port = <number>

  # Allow all outbound traffic on ports between var.outbound_from_port and
  # var.outbound_to_port, inclusive
  outbound_to_port = <number>

  # The protocol (e.g. TCP). If you set this value to -1 or 'all', any protocol
  # and any port is allowed (so the from_port and to_port settings are
  # ignored!).
  protocol = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # If you set this variable to false, this module will not create any
  # resources. This is used as a workaround because Terraform does not allow you
  # to use the 'count' parameter on modules. By using this parameter, you can
  # optionally create or not create the resources within this module.
  create_resources = true

  # Return traffic will be allowed on all ports between var.ephemeral_from_port
  # and var.ephemeral_to_port, inclusive, from var.outbound_cidr_blocks
  ephemeral_from_port = 1024

  # Return traffic will be allowed on all ports between var.ephemeral_from_port
  # and var.ephemeral_to_port, inclusive, from var.outbound_cidr_blocks
  ephemeral_to_port = 65535

  # The list of ports to exclude from the inbound return traffic rules. This is
  # useful for adhering to certain compliance standards like CIS that explicitly
  # deny any allow rule for administrative ports. This can not be set if
  # protocol is icmp.
  exclude_ephemeral_ports = []

  # The ICMP code. Required if specifying ICMP for the protocol. Note: If the
  # value of icmp_type is -1 , the icmp_code must also be set to -1 (wildcard
  # ICMP code).
  icmp_code = null

  # The ICMP type. Required if specifying icmp for the protocol. When type set
  # to -1 this results in a wildcard ICMP type
  icmp_type = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S NETWORK-ACL-OUTBOUND MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/network-acl-outbound?ref=v0.28.9"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The number to use for the egress rule that will be added. Each egress rule
  # in an network ACL must have a unique rule number.
  egress_rule_number = <number>

  # The starting number to use for ingress rules that are added. Each ingress
  # rule in an network ACL must have a unique rule number.
  ingress_rule_number = <number>

  # The id of the network ACL to which the new rules should be attached
  network_acl_id = <string>

  # The number of CIDR blocks in var.outbound_cidr_blocks. We should be able to
  # compute this automatically, but due to a Terraform limitation, we can't:
  # https://github.com/hashicorp/terraform/issues/14677#issuecomment-302772685
  num_outbound_cidr_blocks = <number>

  # A list of CIDR blocks to which outbound connections should be allowed at
  # var.outbound_ports
  outbound_cidr_blocks = <list(string)>

  # Allow all outbound traffic on ports between var.outbound_from_port and
  # var.outbound_to_port, inclusive
  outbound_from_port = <number>

  # Allow all outbound traffic on ports between var.outbound_from_port and
  # var.outbound_to_port, inclusive
  outbound_to_port = <number>

  # The protocol (e.g. TCP). If you set this value to -1 or 'all', any protocol
  # and any port is allowed (so the from_port and to_port settings are
  # ignored!).
  protocol = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # If you set this variable to false, this module will not create any
  # resources. This is used as a workaround because Terraform does not allow you
  # to use the 'count' parameter on modules. By using this parameter, you can
  # optionally create or not create the resources within this module.
  create_resources = true

  # Return traffic will be allowed on all ports between var.ephemeral_from_port
  # and var.ephemeral_to_port, inclusive, from var.outbound_cidr_blocks
  ephemeral_from_port = 1024

  # Return traffic will be allowed on all ports between var.ephemeral_from_port
  # and var.ephemeral_to_port, inclusive, from var.outbound_cidr_blocks
  ephemeral_to_port = 65535

  # The list of ports to exclude from the inbound return traffic rules. This is
  # useful for adhering to certain compliance standards like CIS that explicitly
  # deny any allow rule for administrative ports. This can not be set if
  # protocol is icmp.
  exclude_ephemeral_ports = []

  # The ICMP code. Required if specifying ICMP for the protocol. Note: If the
  # value of icmp_type is -1 , the icmp_code must also be set to -1 (wildcard
  # ICMP code).
  icmp_code = null

  # The ICMP type. Required if specifying icmp for the protocol. When type set
  # to -1 this results in a wildcard ICMP type
  icmp_type = null

}


```

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.9/modules/network-acl-outbound/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.9/modules/network-acl-outbound/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.9/modules/network-acl-outbound/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "30be6c96c837f27b1121446bd716a5aa"
}
##DOCS-SOURCER-END -->
