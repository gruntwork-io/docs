---
title: "Transit Gateway Route Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="VPC Modules" version="0.28.0" lastModifiedVersion="0.27.0"/>

# Transit Gateway Route Module

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.0/modules/transit-gateway-route" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.27.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module creates a route for each CIDR block in a list `cidr_blocks` to a transit gateway route table. The route can be directed to any attachment within the transit gateway or can be configured as a blackhole route. A blackhole route is useful to drop traffic to a given CIDR block, or can be utilized to flush downstream route tables of ephemeral routes.

See [VPC Core Concepts](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.0/modules//_docs/vpc-core-concepts.md) for more information on the core networking components and topologies.

> \[!IMPORTANT]
> This module may require additional modules or configuration. Other modules, such as the `route` module, may be required to complete the route configuration. This module is intended to be used as a building block for more complex network topologies.

## What is a Transit Gateway Route?

A transit gateway route is a way to route traffic between VPCs, peers, VPNs, and other transit gateway attachments. You can think of a transit gateway route just like a route on a router. By creating a route, you're telling the transit gateway how to route traffic to a given CIDR block. By creating a route and then attaching the transit gateway to a VPC, you can route traffic between VPCs. Where possible, we recommend utilizing dynamic routing either by way of propagation or BGP. This simplifies the management of routes and ensures that routes are automatically updated when attachments are added or removed.

## Usage

For usage examples, check out the [examples folder](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.0/examples/transit-gateway-route/).

<!-- BEGIN_TF_DOCS -->

## Requirements

| Name | Version |
|------|---------|
| <a name="requirement_terraform"></a> [terraform](#requirement_terraform) | &gt;= 1.0.0 |
| <a name="requirement_aws"></a> [aws](#requirement_aws) | &gt;= 4.5.0 |

## Providers

| Name | Version |
|------|---------|
| <a name="provider_aws"></a> [aws](#provider_aws) | &gt;= 4.5.0 |

## Modules

No modules.

## Resources

| Name | Type |
|------|------|
| [aws_ec2\_transit_gateway_route.this](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ec2\_transit_gateway_route) | resource |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_cidr_blocks"></a> [cidr_blocks](#input_cidr_blocks) | A list of IPv4 or IPv6 CIDR blocks used for destination matches. Routing decisions are based on the most specific match. | `list(string)` | n/a | yes |
| <a name="input_enable_blackhole"></a> [enable_blackhole](#input_enable_blackhole) | Indicates whether to drop traffic that matches this route (blackhole). Cannot use with 'transit_gateway_attachment_id' Defaults to false. | `bool` | `false` | no |
| <a name="input_transit_gateway_attachment_id"></a> [transit_gateway_attachment_id](#input_transit_gateway_attachment_id) | Identifier of Transit Gateway Attachment (required for propagation). Cannot use with 'enable_blackhole'. Default is null. | `string` | `null` | no |
| <a name="input_transit_gateway_route_table_id"></a> [transit_gateway_route_table_id](#input_transit_gateway_route_table_id) | Identifier of Transit Gateway Route Table | `string` | n/a | yes |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_id"></a> [id](#output_id) | Map of ids of the transit gateway routes. |

<!-- END_TF_DOCS -->

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S TRANSIT-GATEWAY-ROUTE MODULE
# ------------------------------------------------------------------------------------------------------

module "transit_gateway_route" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/transit-gateway-route?ref=v0.28.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of IPv4 or IPv6 CIDR blocks used for destination matches. Routing
  # decisions are based on the most specific match.
  cidr_blocks = <list(string)>

  # Identifier of Transit Gateway Route Table
  transit_gateway_route_table_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Indicates whether to drop traffic that matches this route (blackhole).
  # Cannot use with 'transit_gateway_attachment_id' Defaults to false.
  enable_blackhole = false

  # Identifier of Transit Gateway Attachment (required for propagation). Cannot
  # use with 'enable_blackhole'. Default is null.
  transit_gateway_attachment_id = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S TRANSIT-GATEWAY-ROUTE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/transit-gateway-route?ref=v0.28.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of IPv4 or IPv6 CIDR blocks used for destination matches. Routing
  # decisions are based on the most specific match.
  cidr_blocks = <list(string)>

  # Identifier of Transit Gateway Route Table
  transit_gateway_route_table_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Indicates whether to drop traffic that matches this route (blackhole).
  # Cannot use with 'transit_gateway_attachment_id' Defaults to false.
  enable_blackhole = false

  # Identifier of Transit Gateway Attachment (required for propagation). Cannot
  # use with 'enable_blackhole'. Default is null.
  transit_gateway_attachment_id = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="cidr_blocks" requirement="required" type="list(string)">
<HclListItemDescription>

A list of IPv4 or IPv6 CIDR blocks used for destination matches. Routing decisions are based on the most specific match.

</HclListItemDescription>
</HclListItem>

<HclListItem name="transit_gateway_route_table_id" requirement="required" type="string">
<HclListItemDescription>

Identifier of Transit Gateway Route Table

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="enable_blackhole" requirement="optional" type="bool">
<HclListItemDescription>

Indicates whether to drop traffic that matches this route (blackhole). Cannot use with 'transit_gateway_attachment_id' Defaults to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="transit_gateway_attachment_id" requirement="optional" type="string">
<HclListItemDescription>

Identifier of Transit Gateway Attachment (required for propagation). Cannot use with 'enable_blackhole'. Default is null.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="id">
<HclListItemDescription>

Map of ids of the transit gateway routes.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.0/modules/transit-gateway-route/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.0/modules/transit-gateway-route/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.0/modules/transit-gateway-route/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "7a7d5f9e283b78b519b706b867c18748"
}
##DOCS-SOURCER-END -->
