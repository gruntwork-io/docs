---
title: "VPC-Peering Terraform Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="VPC Modules" version="0.28.13" lastModifiedVersion="0.28.12"/>

# VPC-Peering Terraform Module

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.13/modules/vpc-peering" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.12" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module creates [VPC Peering
Connections](http://docs.aws.amazon.com/AmazonVPC/latest/PeeringGuide/Welcome.html) between VPCs. Normally, VPCs are
completely isolated from each other, but sometimes, you want to allow traffic to flow between them, such as allowing
DevOps tools running in a Mgmt VPC (see [vpc-mgmt](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.13/modules/vpc-mgmt)) to talk to apps running in a Stage or Prod VPC (see
[vpc-app](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.13/modules/vpc-app)). This module can create peering connections and route table entries that make this sort of
cross-VPC communication possible.

## What's a VPC?

A [VPC](https://aws.amazon.com/vpc/) or Virtual Private Cloud is a logically isolated section of your AWS cloud. Each
VPC defines a virtual network within which you run your AWS resources, as well as rules for what can go in and out of
that network. This includes subnets, route tables that tell those subnets how to route inbound and outbound traffic,
security groups, access controls lists for the network (NACLs), and any other network components such as VPN connections.

## Why bother with peering and not just put everything in one VPC?

We intentionally keep VPCs as isolated as we can to reduce the chances that a problem in one VPC will affect the other
VPCs. For example, our standard VPC deployment gives you an isolated staging VPC where you can test changes without
having to worry that they might affect production. Similarly, if an attacker breaks into the staging VPC, they cannot
easily access your production data without breaking through yet another layer of security. These multiple layers are
known as "defense-in-depth."

The point of VPC peering is to allow limited, controlled cross-VPC communication. In particular, you may want to set
up peering to allow a user logged into a management VPC to carry out maintenance tasks in the staging and production
VPCs. However, VPC peering relationships are not "transitive": even though the management VPC can access both staging
and production, someone in staging *cannot* access production.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-PEERING MODULE
# ------------------------------------------------------------------------------------------------------

module "vpc_peering" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-peering?ref=v0.28.13"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the AWS account that should own the peering connection.
  aws_account_id = <string>

  # The ID of the VPC which is the destination of the VPC peering connection.
  destination_vpc_id = <string>

  # The name of the VPC which is the destination of the VPC peering connection.
  destination_vpc_name = <string>

  # A list of IDs of route tables in the destination VPC that should have routes
  # added pointing to origin VPC.
  destination_vpc_route_table_ids = <list(string)>

  # The ID of the VPC which is the origin of the VPC peering connection.
  origin_vpc_id = <string>

  # The name of the VPC which is the origin of the VPC peering connection.
  origin_vpc_name = <string>

  # A list of IDs of route tables in the origin VPC that should have routes
  # added pointing to destination VPC.
  origin_vpc_route_table_ids = <list(string)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A boolean parameter to enable or disable DNS resolution on both accepter and
  # requester side of the connection peering. 
  allow_remote_vpc_dns_resolution = false

  # A boolean parameter to auto-accept the VPC peering connection.
  auto_accept = true

  # Set to false to have this module create no resources. This weird parameter
  # exists solely because Terraform does not support conditional modules.
  # Therefore, this is a hack to allow you to conditionally decide if the VPC
  # Peering function and other resources should be created or not.
  create_resources = true

  # A map of tags to apply to the VPC Peering Connection. The key is the tag
  # name and the value is the tag value. Note that the tag 'Name' is
  # automatically added by this module but may be optionally overwritten by this
  # variable.
  custom_tags = {}

  # DEPRECATED: Use destination_vpc_cidr_blocks instead. The CIDR block
  # associated with the destination VPC.
  destination_vpc_cidr_block = null

  # A list of CIDR blocks associated with the destination VPC. When a VPC has
  # multiple CIDR blocks, all of them should be listed here so that routes are
  # created for each. If not set, falls back to destination_vpc_cidr_block.
  destination_vpc_cidr_blocks = []

  # DEPRECATED: No longer needed as the count is computed automatically. Kept
  # for backwards compatibility.
  num_destination_vpc_route_tables = null

  # DEPRECATED: No longer needed as the count is computed automatically. Kept
  # for backwards compatibility.
  num_origin_vpc_route_tables = null

  # DEPRECATED: Use origin_vpc_cidr_blocks instead. The CIDR block associated
  # with the origin VPC.
  origin_vpc_cidr_block = null

  # A list of CIDR blocks associated with the origin VPC. When a VPC has
  # multiple CIDR blocks, all of them should be listed here so that routes are
  # created for each. If not set, falls back to origin_vpc_cidr_block.
  origin_vpc_cidr_blocks = []

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-PEERING MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-peering?ref=v0.28.13"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the AWS account that should own the peering connection.
  aws_account_id = <string>

  # The ID of the VPC which is the destination of the VPC peering connection.
  destination_vpc_id = <string>

  # The name of the VPC which is the destination of the VPC peering connection.
  destination_vpc_name = <string>

  # A list of IDs of route tables in the destination VPC that should have routes
  # added pointing to origin VPC.
  destination_vpc_route_table_ids = <list(string)>

  # The ID of the VPC which is the origin of the VPC peering connection.
  origin_vpc_id = <string>

  # The name of the VPC which is the origin of the VPC peering connection.
  origin_vpc_name = <string>

  # A list of IDs of route tables in the origin VPC that should have routes
  # added pointing to destination VPC.
  origin_vpc_route_table_ids = <list(string)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A boolean parameter to enable or disable DNS resolution on both accepter and
  # requester side of the connection peering. 
  allow_remote_vpc_dns_resolution = false

  # A boolean parameter to auto-accept the VPC peering connection.
  auto_accept = true

  # Set to false to have this module create no resources. This weird parameter
  # exists solely because Terraform does not support conditional modules.
  # Therefore, this is a hack to allow you to conditionally decide if the VPC
  # Peering function and other resources should be created or not.
  create_resources = true

  # A map of tags to apply to the VPC Peering Connection. The key is the tag
  # name and the value is the tag value. Note that the tag 'Name' is
  # automatically added by this module but may be optionally overwritten by this
  # variable.
  custom_tags = {}

  # DEPRECATED: Use destination_vpc_cidr_blocks instead. The CIDR block
  # associated with the destination VPC.
  destination_vpc_cidr_block = null

  # A list of CIDR blocks associated with the destination VPC. When a VPC has
  # multiple CIDR blocks, all of them should be listed here so that routes are
  # created for each. If not set, falls back to destination_vpc_cidr_block.
  destination_vpc_cidr_blocks = []

  # DEPRECATED: No longer needed as the count is computed automatically. Kept
  # for backwards compatibility.
  num_destination_vpc_route_tables = null

  # DEPRECATED: No longer needed as the count is computed automatically. Kept
  # for backwards compatibility.
  num_origin_vpc_route_tables = null

  # DEPRECATED: Use origin_vpc_cidr_blocks instead. The CIDR block associated
  # with the origin VPC.
  origin_vpc_cidr_block = null

  # A list of CIDR blocks associated with the origin VPC. When a VPC has
  # multiple CIDR blocks, all of them should be listed here so that routes are
  # created for each. If not set, falls back to origin_vpc_cidr_block.
  origin_vpc_cidr_blocks = []

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="aws_account_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the AWS account that should own the peering connection.

</HclListItemDescription>
</HclListItem>

<HclListItem name="destination_vpc_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the VPC which is the destination of the VPC peering connection.

</HclListItemDescription>
</HclListItem>

<HclListItem name="destination_vpc_name" requirement="required" type="string">
<HclListItemDescription>

The name of the VPC which is the destination of the VPC peering connection.

</HclListItemDescription>
</HclListItem>

<HclListItem name="destination_vpc_route_table_ids" requirement="required" type="list(string)">
<HclListItemDescription>

A list of IDs of route tables in the destination VPC that should have routes added pointing to origin VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="origin_vpc_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the VPC which is the origin of the VPC peering connection.

</HclListItemDescription>
</HclListItem>

<HclListItem name="origin_vpc_name" requirement="required" type="string">
<HclListItemDescription>

The name of the VPC which is the origin of the VPC peering connection.

</HclListItemDescription>
</HclListItem>

<HclListItem name="origin_vpc_route_table_ids" requirement="required" type="list(string)">
<HclListItemDescription>

A list of IDs of route tables in the origin VPC that should have routes added pointing to destination VPC.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="allow_remote_vpc_dns_resolution" requirement="optional" type="bool">
<HclListItemDescription>

A boolean parameter to enable or disable DNS resolution on both accepter and requester side of the connection peering. 

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="auto_accept" requirement="optional" type="bool">
<HclListItemDescription>

A boolean parameter to auto-accept the VPC peering connection.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to have this module create no resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if the VPC Peering function and other resources should be created or not.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the VPC Peering Connection. The key is the tag name and the value is the tag value. Note that the tag 'Name' is automatically added by this module but may be optionally overwritten by this variable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="destination_vpc_cidr_block" requirement="optional" type="string">
<HclListItemDescription>

DEPRECATED: Use destination_vpc_cidr_blocks instead. The CIDR block associated with the destination VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="destination_vpc_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of CIDR blocks associated with the destination VPC. When a VPC has multiple CIDR blocks, all of them should be listed here so that routes are created for each. If not set, falls back to destination_vpc_cidr_block.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="num_destination_vpc_route_tables" requirement="optional" type="number">
<HclListItemDescription>

DEPRECATED: No longer needed as the count is computed automatically. Kept for backwards compatibility.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="num_origin_vpc_route_tables" requirement="optional" type="number">
<HclListItemDescription>

DEPRECATED: No longer needed as the count is computed automatically. Kept for backwards compatibility.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="origin_vpc_cidr_block" requirement="optional" type="string">
<HclListItemDescription>

DEPRECATED: Use origin_vpc_cidr_blocks instead. The CIDR block associated with the origin VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="origin_vpc_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of CIDR blocks associated with the origin VPC. When a VPC has multiple CIDR blocks, all of them should be listed here so that routes are created for each. If not set, falls back to origin_vpc_cidr_block.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="peering_connection">
<HclListItemDescription>

VPC Peering connection object

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.13/modules/vpc-peering/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.13/modules/vpc-peering/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.13/modules/vpc-peering/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "ab47eb1167d5db1a6c1f47c350d99f4b"
}
##DOCS-SOURCER-END -->
