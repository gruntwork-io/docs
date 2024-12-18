---
title: "Network ACL Inbound Terraform Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="VPC Modules" version="0.28.1" lastModifiedVersion="0.27.0"/>

# Network ACL Inbound Terraform Module

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.1/modules/network-acl-inbound" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.27.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module launches is a simple helper for adding inbound rules to a [Network
ACL](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_ACLs.html). Network ACLs can be a bit tricky to work
with because they are stateless, which means that opening an inbound port is often not enough; you also need to open
[ephemeral outbound ports](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_ACLs.html#VPC_ACLs_Ephemeral_Ports)
which your services use to respond. This can be very easy to forget, so this module adds not only the inbound ports to
an ACL, but also the ephemeral outbound ports for return traffic.

See the [network-acl-outbound](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.1/modules/network-acl-outbound) module for the analogous version of this module, but for opening
outbound ports.

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
# DEPLOY GRUNTWORK'S NETWORK-ACL-INBOUND MODULE
# ------------------------------------------------------------------------------------------------------

module "network_acl_inbound" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/network-acl-inbound?ref=v0.28.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The number to use for the egress rule that will be added. Each egress rule
  # in a network ACL must have a unique rule number.
  egress_rule_number = <number>

  # A list of CIDR blocks from which inbound connections should be allowed to
  # var.inbound_ports
  inbound_cidr_blocks = <list(string)>

  # Allow all inbound traffic on ports between var.inbound_from_port and
  # var.inbound_to_port, inclusive
  inbound_from_port = <number>

  # Allow all inbound traffic on ports between var.inbound_from_port and
  # var.inbound_to_port, inclusive
  inbound_to_port = <number>

  # The starting number to use for ingress rules that are added. Each ingress
  # rule in a network ACL must have a unique rule number.
  ingress_rule_number = <number>

  # The id of the network ACL to which the new rules should be attached
  network_acl_id = <string>

  # The number of CIDR blocks in var.inbound_cidr_blocks. We should be able to
  # compute this automatically, but due to a Terraform limitation, we can't:
  # https://github.com/hashicorp/terraform/issues/14677#issuecomment-302772685
  num_inbound_cidr_blocks = <number>

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
  # and var.ephemeral_to_port, inclusive, from var.inbound_cidr_blocks
  ephemeral_from_port = 1024

  # Return traffic will be allowed on all ports between var.ephemeral_from_port
  # and var.ephemeral_to_port, inclusive, from var.inbound_cidr_blocks
  ephemeral_to_port = 65535

  # The list of ports to exclude from the inbound rules. This is useful for
  # adhering to certain compliance standards like CIS that explicitly deny any
  # allow rule for administrative ports. This can not be set if protocol is
  # icmp.
  exclude_ports = []

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
# DEPLOY GRUNTWORK'S NETWORK-ACL-INBOUND MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/network-acl-inbound?ref=v0.28.1"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The number to use for the egress rule that will be added. Each egress rule
  # in a network ACL must have a unique rule number.
  egress_rule_number = <number>

  # A list of CIDR blocks from which inbound connections should be allowed to
  # var.inbound_ports
  inbound_cidr_blocks = <list(string)>

  # Allow all inbound traffic on ports between var.inbound_from_port and
  # var.inbound_to_port, inclusive
  inbound_from_port = <number>

  # Allow all inbound traffic on ports between var.inbound_from_port and
  # var.inbound_to_port, inclusive
  inbound_to_port = <number>

  # The starting number to use for ingress rules that are added. Each ingress
  # rule in a network ACL must have a unique rule number.
  ingress_rule_number = <number>

  # The id of the network ACL to which the new rules should be attached
  network_acl_id = <string>

  # The number of CIDR blocks in var.inbound_cidr_blocks. We should be able to
  # compute this automatically, but due to a Terraform limitation, we can't:
  # https://github.com/hashicorp/terraform/issues/14677#issuecomment-302772685
  num_inbound_cidr_blocks = <number>

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
  # and var.ephemeral_to_port, inclusive, from var.inbound_cidr_blocks
  ephemeral_from_port = 1024

  # Return traffic will be allowed on all ports between var.ephemeral_from_port
  # and var.ephemeral_to_port, inclusive, from var.inbound_cidr_blocks
  ephemeral_to_port = 65535

  # The list of ports to exclude from the inbound rules. This is useful for
  # adhering to certain compliance standards like CIS that explicitly deny any
  # allow rule for administrative ports. This can not be set if protocol is
  # icmp.
  exclude_ports = []

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
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.1/modules/network-acl-inbound/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.1/modules/network-acl-inbound/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.1/modules/network-acl-inbound/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "46cec207d12a735400d711e636d4cb6e"
}
##DOCS-SOURCER-END -->
