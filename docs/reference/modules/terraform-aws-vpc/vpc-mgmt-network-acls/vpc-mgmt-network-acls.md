---
title: "[DEPRECATED] VPC-Mgmt Network ACLs Terraform Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="VPC Modules" version="0.28.4" lastModifiedVersion="0.27.0"/>

# \[DEPRECATED] VPC-Mgmt Network ACLs Terraform Module

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.4/modules/vpc-mgmt-network-acls" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.27.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

**The `vpc-mgmt` module is now deprecated**. The main difference between `vpc-mgmt` and `vpc-app` was that `vpc-app`
had three tiers of subnets (public, private-app, private-persistence) and `vpc-mgmt` had two (public, private). As of
`v0.12.1`, `vpc-app` allows you to disable any of the subnet tiers using the `create_public_subnets`,
`create_private_app_subnets`, and `create_private_persistence_subnets` input variables, respectively, so it can now
support 1, 2, or 3 tiers of subnets, as needed. Therefore, we recommend using `vpc-app` for all your VPCs in the
future. If you're already using `vpc-mgmt`, we will continue to maintain it for a little while longer, but please be
aware that, in a future release, once we feel the new functionality in `vpc-app` is fully baked, we will remove
`vpc-mgmt` entirely.

This Terraform Module adds a default set of [Network
ACLs](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_ACLs.html) to a VPC created using the
[vpc-mgmt](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.4/modules/vpc-mgmt) module. The ACLs enforce the following security settings  (based on [A Reference VPC
Architecture](https://www.whaletech.co/2014/10/02/reference-vpc-architecture.html)):

*   **Public subnet**: Allow all requests.
*   **Private subnet**: Allow all requests to/from the public subnets. Allow all outbound TCP requests plus return traffic
    from any IP for those TCP requests on [ephemeral
    ports](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_ACLs.html#VPC_ACLs_Ephemeral_Ports).

## What's a VPC?

A [VPC](https://aws.amazon.com/vpc/) or Virtual Private Cloud is a logically isolated section of your AWS cloud. Each
VPC defines a virtual network within which you run your AWS resources, as well as rules for what can go in and out of
that network. This includes subnets, route tables that tell those subnets how to route inbound and outbound traffic,
security groups, access controls lists for the network (NACLs), and any other network components such as VPN connections.

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
# DEPLOY GRUNTWORK'S VPC-MGMT-NETWORK-ACLS MODULE
# ------------------------------------------------------------------------------------------------------

module "vpc_mgmt_network_acls" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-mgmt-network-acls?ref=v0.28.4"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The number of each type of subnet (public, private) created in this VPC.
  # Typically, this is equal to the number of availability zones in the current
  # region.
  num_subnets = <number>

  # A list of CIDR blocks used by the private subnets in the VPC
  private_subnet_cidr_blocks = <list(string)>

  # A list of IDs of the private subnets in the VPC
  private_subnet_ids = <list(string)>

  # A list of CIDR blocks used by the public subnets in the VPC
  public_subnet_cidr_blocks = <list(string)>

  # A list of IDs of the public subnets in the VPC
  public_subnet_ids = <list(string)>

  # The id of the VPC
  vpc_id = <string>

  # The name of the VPC (e.g. mgmt)
  vpc_name = <string>

  # Use this variable to ensure the Network ACL does not get created until the
  # VPC is ready. This can help to work around a Terraform or AWS issue where
  # trying to create certain resources, such as Network ACLs, before the VPC's
  # Gateway and NATs are ready, leads to a huge variety of eventual consistency
  # bugs. You should typically point this variable at the vpc_ready output from
  # the Gruntwork VPCs.
  vpc_ready = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # If you set this variable to false, this module will not create any
  # resources. This is used as a workaround because Terraform does not allow you
  # to use the 'count' parameter on modules. By using this parameter, you can
  # optionally create or not create the resources within this module.
  create_resources = true

  # A map of tags to apply to the Network ACLs created by this module. The key
  # is the tag name and the value is the tag value. Note that the tag 'Name' is
  # automatically added by this module but may be optionally overwritten by this
  # variable.
  custom_tags = {}

  # The list of ports to exclude from the inbound allow all rules. This is
  # useful for adhering to certain compliance standards like CIS that explicitly
  # deny any allow rule for administrative ports.
  exclude_ports_from_inbound_all = []

  # The number to use for the first rule that is created by this module. All
  # rules in this module will be inserted after this number. This is useful to
  # provide additional head room for your NACL rules that should take precedence
  # over the initial rule.
  initial_nacl_rule_number = 100

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-MGMT-NETWORK-ACLS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-mgmt-network-acls?ref=v0.28.4"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The number of each type of subnet (public, private) created in this VPC.
  # Typically, this is equal to the number of availability zones in the current
  # region.
  num_subnets = <number>

  # A list of CIDR blocks used by the private subnets in the VPC
  private_subnet_cidr_blocks = <list(string)>

  # A list of IDs of the private subnets in the VPC
  private_subnet_ids = <list(string)>

  # A list of CIDR blocks used by the public subnets in the VPC
  public_subnet_cidr_blocks = <list(string)>

  # A list of IDs of the public subnets in the VPC
  public_subnet_ids = <list(string)>

  # The id of the VPC
  vpc_id = <string>

  # The name of the VPC (e.g. mgmt)
  vpc_name = <string>

  # Use this variable to ensure the Network ACL does not get created until the
  # VPC is ready. This can help to work around a Terraform or AWS issue where
  # trying to create certain resources, such as Network ACLs, before the VPC's
  # Gateway and NATs are ready, leads to a huge variety of eventual consistency
  # bugs. You should typically point this variable at the vpc_ready output from
  # the Gruntwork VPCs.
  vpc_ready = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # If you set this variable to false, this module will not create any
  # resources. This is used as a workaround because Terraform does not allow you
  # to use the 'count' parameter on modules. By using this parameter, you can
  # optionally create or not create the resources within this module.
  create_resources = true

  # A map of tags to apply to the Network ACLs created by this module. The key
  # is the tag name and the value is the tag value. Note that the tag 'Name' is
  # automatically added by this module but may be optionally overwritten by this
  # variable.
  custom_tags = {}

  # The list of ports to exclude from the inbound allow all rules. This is
  # useful for adhering to certain compliance standards like CIS that explicitly
  # deny any allow rule for administrative ports.
  exclude_ports_from_inbound_all = []

  # The number to use for the first rule that is created by this module. All
  # rules in this module will be inserted after this number. This is useful to
  # provide additional head room for your NACL rules that should take precedence
  # over the initial rule.
  initial_nacl_rule_number = 100

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="num_subnets" requirement="required" type="number">
<HclListItemDescription>

The number of each type of subnet (public, private) created in this VPC. Typically, this is equal to the number of availability zones in the current region.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_subnet_cidr_blocks" requirement="required" type="list(string)">
<HclListItemDescription>

A list of CIDR blocks used by the private subnets in the VPC

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

A list of IDs of the private subnets in the VPC

</HclListItemDescription>
</HclListItem>

<HclListItem name="public_subnet_cidr_blocks" requirement="required" type="list(string)">
<HclListItemDescription>

A list of CIDR blocks used by the public subnets in the VPC

</HclListItemDescription>
</HclListItem>

<HclListItem name="public_subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

A list of IDs of the public subnets in the VPC

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The id of the VPC

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_name" requirement="required" type="string">
<HclListItemDescription>

The name of the VPC (e.g. mgmt)

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_ready" requirement="required" type="string">
<HclListItemDescription>

Use this variable to ensure the Network ACL does not get created until the VPC is ready. This can help to work around a Terraform or AWS issue where trying to create certain resources, such as Network ACLs, before the VPC's Gateway and NATs are ready, leads to a huge variety of eventual consistency bugs. You should typically point this variable at the vpc_ready output from the Gruntwork VPCs.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

If you set this variable to false, this module will not create any resources. This is used as a workaround because Terraform does not allow you to use the 'count' parameter on modules. By using this parameter, you can optionally create or not create the resources within this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the Network ACLs created by this module. The key is the tag name and the value is the tag value. Note that the tag 'Name' is automatically added by this module but may be optionally overwritten by this variable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="exclude_ports_from_inbound_all" requirement="optional" type="list(number)">
<HclListItemDescription>

The list of ports to exclude from the inbound allow all rules. This is useful for adhering to certain compliance standards like CIS that explicitly deny any allow rule for administrative ports.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="initial_nacl_rule_number" requirement="optional" type="number">
<HclListItemDescription>

The number to use for the first rule that is created by this module. All rules in this module will be inserted after this number. This is useful to provide additional head room for your NACL rules that should take precedence over the initial rule.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="100"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="private_subnets_network_acl_id">
</HclListItem>

<HclListItem name="public_subnets_network_acl_id">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.4/modules/vpc-mgmt-network-acls/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.4/modules/vpc-mgmt-network-acls/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.4/modules/vpc-mgmt-network-acls/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "3986a964086aca5b57f58f675f9211c5"
}
##DOCS-SOURCER-END -->
