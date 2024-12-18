---
title: "VPC-Peering Terraform Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="VPC Modules" version="0.28.0" lastModifiedVersion="0.27.0"/>

# VPC-Peering Terraform Module

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.0/modules/vpc-peering" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.27.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module creates [VPC Peering
Connections](http://docs.aws.amazon.com/AmazonVPC/latest/PeeringGuide/Welcome.html) between VPCs. Normally, VPCs are
completely isolated from each other, but sometimes, you want to allow traffic to flow between them, such as allowing
DevOps tools running in a Mgmt VPC (see [vpc-mgmt](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.0/modules/vpc-mgmt)) to talk to apps running in a Stage or Prod VPC (see
[vpc-app](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.0/modules/vpc-app)). This module can create peering connections and route table entries that make this sort of
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

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-peering?ref=v0.28.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the AWS account that should own the peering connection.
  aws_account_id = <string>

  # The CIDR block (e.g. 10.0.200.0/24) associated with the destination VPC.
  destination_vpc_cidr_block = <string>

  # The ID of the VPC which is the destination of the VPC peering connection.
  destination_vpc_id = <string>

  # The name of the VPC which is the destination of the VPC peering connection.
  destination_vpc_name = <string>

  # A list of IDs of route tables in the destination VPC that should have routes
  # added pointing to origin VPC.
  destination_vpc_route_table_ids = <list(string)>

  # The number of route table ids in var.destination_vpc_route_table_ids. This
  # should be computable, but due to a but due to a Terraform limitation, we
  # can't:
  # https://github.com/hashicorp/terraform/issues/14677#issuecomment-302772685
  num_destination_vpc_route_tables = <number>

  # The number of route table ids in var.origin_vpc_route_table_ids. This should
  # be computable, but due to a but due to a Terraform limitation, we can't:
  # https://github.com/hashicorp/terraform/issues/14677#issuecomment-302772685
  num_origin_vpc_route_tables = <number>

  # The CIDR block (e.g. 10.0.100.0/24) associated with the origin VPC.
  origin_vpc_cidr_block = <string>

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

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-PEERING MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-peering?ref=v0.28.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the AWS account that should own the peering connection.
  aws_account_id = <string>

  # The CIDR block (e.g. 10.0.200.0/24) associated with the destination VPC.
  destination_vpc_cidr_block = <string>

  # The ID of the VPC which is the destination of the VPC peering connection.
  destination_vpc_id = <string>

  # The name of the VPC which is the destination of the VPC peering connection.
  destination_vpc_name = <string>

  # A list of IDs of route tables in the destination VPC that should have routes
  # added pointing to origin VPC.
  destination_vpc_route_table_ids = <list(string)>

  # The number of route table ids in var.destination_vpc_route_table_ids. This
  # should be computable, but due to a but due to a Terraform limitation, we
  # can't:
  # https://github.com/hashicorp/terraform/issues/14677#issuecomment-302772685
  num_destination_vpc_route_tables = <number>

  # The number of route table ids in var.origin_vpc_route_table_ids. This should
  # be computable, but due to a but due to a Terraform limitation, we can't:
  # https://github.com/hashicorp/terraform/issues/14677#issuecomment-302772685
  num_origin_vpc_route_tables = <number>

  # The CIDR block (e.g. 10.0.100.0/24) associated with the origin VPC.
  origin_vpc_cidr_block = <string>

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

}


```

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.0/modules/vpc-peering/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.0/modules/vpc-peering/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.0/modules/vpc-peering/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "862e8c4aaccba3bd7e367f01f34a8ca3"
}
##DOCS-SOURCER-END -->
