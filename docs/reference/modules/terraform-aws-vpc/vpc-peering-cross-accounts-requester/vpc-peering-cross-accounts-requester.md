---
title: "vpc-peering-cross-accounts-requester"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="VPC Modules" version="0.28.3" lastModifiedVersion="0.27.0"/>

# vpc-peering-cross-accounts-requester

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.3/modules/vpc-peering-cross-accounts-requester" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.27.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module manages the requester's side of the VPC Peering Connection between two differents accounts that you control.

## Requirements

| Name | Version |
|------|---------|
| <a name="requirement_terraform"></a> [terraform](#requirement_terraform) | &gt;= 1.0.0 |

## Providers

| Name | Version |
|------|---------|
| <a name="provider_aws"></a> [aws](#provider_aws) | n/a |

## Modules

No modules.

## Resources

| Name | Type |
|------|------|
| [aws_route.this](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route) | resource |
| [aws_vpc_peering_connection.this](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpc_peering_connection) | resource |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_accepter_owner_id"></a> [accepter_owner_id](#input_accepter_owner_id) | The account ID of the accepter VPC. | `string` | n/a | yes |
| <a name="input_accepter_region"></a> [accepter_region](#input_accepter_region) | The region of the accepter VPC. | `string` | n/a | yes |
| <a name="input_accepter_vpc_cidr"></a> [accepter_vpc_cidr](#input_accepter_vpc_cidr) | The VPC CIDR of the accepter VPC. | `string` | n/a | yes |
| <a name="input_accepter_vpc_id"></a> [accepter_vpc_id](#input_accepter_vpc_id) | The ID of the accepter VPC. | `string` | n/a | yes |
| <a name="input_route_tables"></a> [route_tables](#input_route_tables) | List of route tables to add routes to. | `list(string)` | n/a | yes |
| <a name="input_tags"></a> [tags](#input_tags) | A map of tags to assign to resources. | `map(string)` | `{}` | no |
| <a name="input_vpc_id"></a> [vpc_id](#input_vpc_id) | The VPC ID. | `string` | n/a | yes |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_vpc_peering_connection_id"></a> [vpc_peering_connection_id](#output_vpc_peering_connection_id) | Peering connection ID. |

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-PEERING-CROSS-ACCOUNTS-REQUESTER MODULE
# ------------------------------------------------------------------------------------------------------

module "vpc_peering_cross_accounts_requester" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-peering-cross-accounts-requester?ref=v0.28.3"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The account ID of the accepter VPC.
  accepter_owner_id = <string>

  # The region of the accepter VPC.
  accepter_region = <string>

  # The VPC CIDR of the accepter VPC.
  accepter_vpc_cidr = <string>

  # The ID of the accepter VPC.
  accepter_vpc_id = <string>

  # List of route tables to add routes to.
  route_tables = <list(string)>

  # The VPC ID.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Allow a local VPC to resolve public DNS hostnames to private IP addresses
  # when queried from instances in the peer VPC.
  allow_remote_vpc_dns_resolution = false

  # How long to wait for a route to be created before considering the operation
  # failed.
  route_creation_timeout = "2m"

  # How long to wait for a route to be deleted before considering the operation
  # failed.
  route_deletion_timeout = "5m"

  # A map of tags to assign to resources.
  tags = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-PEERING-CROSS-ACCOUNTS-REQUESTER MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-peering-cross-accounts-requester?ref=v0.28.3"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The account ID of the accepter VPC.
  accepter_owner_id = <string>

  # The region of the accepter VPC.
  accepter_region = <string>

  # The VPC CIDR of the accepter VPC.
  accepter_vpc_cidr = <string>

  # The ID of the accepter VPC.
  accepter_vpc_id = <string>

  # List of route tables to add routes to.
  route_tables = <list(string)>

  # The VPC ID.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Allow a local VPC to resolve public DNS hostnames to private IP addresses
  # when queried from instances in the peer VPC.
  allow_remote_vpc_dns_resolution = false

  # How long to wait for a route to be created before considering the operation
  # failed.
  route_creation_timeout = "2m"

  # How long to wait for a route to be deleted before considering the operation
  # failed.
  route_deletion_timeout = "5m"

  # A map of tags to assign to resources.
  tags = {}

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="accepter_owner_id" requirement="required" type="string">
<HclListItemDescription>

The account ID of the accepter VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="accepter_region" requirement="required" type="string">
<HclListItemDescription>

The region of the accepter VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="accepter_vpc_cidr" requirement="required" type="string">
<HclListItemDescription>

The VPC CIDR of the accepter VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="accepter_vpc_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the accepter VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="route_tables" requirement="required" type="list(string)">
<HclListItemDescription>

List of route tables to add routes to.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The VPC ID.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="allow_remote_vpc_dns_resolution" requirement="optional" type="bool">
<HclListItemDescription>

Allow a local VPC to resolve public DNS hostnames to private IP addresses when queried from instances in the peer VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="route_creation_timeout" requirement="optional" type="string">
<HclListItemDescription>

How long to wait for a route to be created before considering the operation failed.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;2m&quot;"/>
</HclListItem>

<HclListItem name="route_deletion_timeout" requirement="optional" type="string">
<HclListItemDescription>

How long to wait for a route to be deleted before considering the operation failed.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;5m&quot;"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to assign to resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="vpc_peering_connection_id">
<HclListItemDescription>

Peering connection ID.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.3/modules/vpc-peering-cross-accounts-requester/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.3/modules/vpc-peering-cross-accounts-requester/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.3/modules/vpc-peering-cross-accounts-requester/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "9d1dbb36c2746a7033f0030239ad062a"
}
##DOCS-SOURCER-END -->
