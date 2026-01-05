---
title: "Route Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="VPC Modules" version="0.28.9" lastModifiedVersion="0.28.9"/>

# Route Module

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.9/modules/route" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.9" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform module creates a route resource. A route is a rule that specifies where network traffic is directed. This is often utilized in more advanced network topology configurations. A route in AWS is commonly utilized to send traffic to a transit gateway, a local gateway, a VPN gateway, or a EC2 instance. Some common use cases of when an organization might leverage one or more routes:

*   To route traffic to a transit gateway for multiple AWS accounts
*   To route traffic to a Direct Connect circuit via a transit gateway
*   To route traffic to a SDWAN appliance
*   To route traffic to a firewall appliance
*   To route traffic over a VPN tunnel

> \[!IMPORTANT]
> This module may require additional modules or configuration. Other modules, such as the `transit-gateway-route` module, may be required to complete the route configuration. This module is intended to be used as a building block for more complex network topologies.

## Usage

For usage examples, check out the [examples folder](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.9/examples/route/).

## What is a route?

A route is a path to a specific destination. A route table contains a set of rules, called routes, that are used to determine where network traffic is directed. Each subnet in your VPC must be associated with a route table; the table controls the routing for the subnet. A route table can also contain routes to other route tables.

Routes can be either dynamic or static. Dynamic routes are learned by the route table from a routing protocol. Static routes are manually added to a route table. The route table then uses the most specific route that matches the traffic to determine how to route the traffic. Where possible, it's best to utilize dynamic routes. However, static routes are often used to route traffic between different types of environments.

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
| [aws_route.this](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route) | resource |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_carrier_gateway_id"></a> [carrier_gateway_id](#input_carrier_gateway_id) | The ID of the carrier gateway used for the destination match. Traffic will be routed to this ID. If this is set, no other destination ID or ARN can be set. | `string` | `null` | no |
| <a name="input_core_network_arn"></a> [core_network_arn](#input_core_network_arn) | The ARN of the core network used for the destination match. Traffic will be routed to this ID. If this is set, no other destination ID or ARN can be set. | `string` | `null` | no |
| <a name="input_destination_cidr_block"></a> [destination_cidr_block](#input_destination_cidr_block) | The IPv4 CIDR address block used for the destination match. Routing decisions are based on the most specific match. | `string` | `null` | no |
| <a name="input_destination_ipv6_cidr_block"></a> [destination_ipv6\_cidr_block](#input_destination_ipv6\_cidr_block) | The IPv6 CIDR address block used for the destination match. Routing decisions are based on the most specific match. | `string` | `null` | no |
| <a name="input_destination_prefix_list_id"></a> [destination_prefix_list_id](#input_destination_prefix_list_id) | The ID of a prefix list used for the destination match. | `string` | `null` | no |
| <a name="input_egress_only_gateway_id"></a> [egress_only_gateway_id](#input_egress_only_gateway_id) | The ID of the egress-only internet gateway used for the destination match. Traffic will be routed to this ID. If this is set, no other destination ID or ARN can be set. | `string` | `null` | no |
| <a name="input_gateway_id"></a> [gateway_id](#input_gateway_id) | The ID of the internet gateway or virtual private gateway used for the destination match. Traffic will be routed to this ID. If this is set, no other destination ID or ARN can be set. | `string` | `null` | no |
| <a name="input_local_gateway_id"></a> [local_gateway_id](#input_local_gateway_id) | The ID of the Outpust local gateway used for the destination match. Traffic will be routed to this ID. If this is set, no other destination ID or ARN can be set. | `string` | `null` | no |
| <a name="input_nat_gateway_id"></a> [nat_gateway_id](#input_nat_gateway_id) | The ID of the NAT gateway used for the destination match. Traffic will be routed to this ID. If this is set, no other destination ID or ARN can be set. | `string` | `null` | no |
| <a name="input_network_interface_id"></a> [network_interface_id](#input_network_interface_id) | The ID of the EC2 network interface used for the destination match. Traffic will be routed to this ID. If this is set, no other destination ID or ARN can be set. | `string` | `null` | no |
| <a name="input_route_table_ids"></a> [route_table_ids](#input_route_table_ids) | List of route table IDs to associate with the route | `list(any)` | n/a | yes |
| <a name="input_transit_gateway_id"></a> [transit_gateway_id](#input_transit_gateway_id) | The ID of the transit gateway used for the destination match. Traffic will be routed to this ID. If this is set, no other destination ID or ARN can be set. | `string` | `null` | no |
| <a name="input_vpc_endpoint_id"></a> [vpc_endpoint_id](#input_vpc_endpoint_id) | The ID of the VPC endpoint used for the destination match. Traffic will be routed to this ID. If this is set, no other destination ID or ARN can be set. | `string` | `null` | no |
| <a name="input_vpc_peering_connection_id"></a> [vpc_peering_connection_id](#input_vpc_peering_connection_id) | The ID of the VPC peering connection used for the destination match. Traffic will be routed to this ID. If this is set, no other destination ID or ARN can be set. | `string` | `null` | no |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_ids"></a> [ids](#output_ids) | A map of IDs of the route resources. |
| <a name="output_states"></a> [states](#output_states) | A map of states of the route resources. |

<!-- END_TF_DOCS -->

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ROUTE MODULE
# ------------------------------------------------------------------------------------------------------

module "route" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/route?ref=v0.28.9"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of route table IDs to associate with the route
  route_table_ids = <list(any)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the carrier gateway used for the destination match. Traffic will
  # be routed to this ID. If this is set, no other destination ID or ARN can be
  # set.
  carrier_gateway_id = null

  # The ARN of the core network used for the destination match. Traffic will be
  # routed to this ID. If this is set, no other destination ID or ARN can be
  # set.
  core_network_arn = null

  # The IPv4 CIDR address block used for the destination match. Routing
  # decisions are based on the most specific match.
  destination_cidr_block = null

  # The IPv6 CIDR address block used for the destination match. Routing
  # decisions are based on the most specific match.
  destination_ipv6_cidr_block = null

  # The ID of a prefix list used for the destination match.
  destination_prefix_list_id = null

  # The ID of the egress-only internet gateway used for the destination match.
  # Traffic will be routed to this ID. If this is set, no other destination ID
  # or ARN can be set.
  egress_only_gateway_id = null

  # The ID of the internet gateway or virtual private gateway used for the
  # destination match. Traffic will be routed to this ID. If this is set, no
  # other destination ID or ARN can be set.
  gateway_id = null

  # The ID of the Outpust local gateway used for the destination match. Traffic
  # will be routed to this ID. If this is set, no other destination ID or ARN
  # can be set.
  local_gateway_id = null

  # The ID of the NAT gateway used for the destination match. Traffic will be
  # routed to this ID. If this is set, no other destination ID or ARN can be
  # set.
  nat_gateway_id = null

  # The ID of the EC2 network interface used for the destination match. Traffic
  # will be routed to this ID. If this is set, no other destination ID or ARN
  # can be set.
  network_interface_id = null

  # The ID of the transit gateway used for the destination match. Traffic will
  # be routed to this ID. If this is set, no other destination ID or ARN can be
  # set.
  transit_gateway_id = null

  # The ID of the VPC endpoint used for the destination match. Traffic will be
  # routed to this ID. If this is set, no other destination ID or ARN can be
  # set. 
  vpc_endpoint_id = null

  # The ID of the VPC peering connection used for the destination match. Traffic
  # will be routed to this ID. If this is set, no other destination ID or ARN
  # can be set. 
  vpc_peering_connection_id = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ROUTE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/route?ref=v0.28.9"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of route table IDs to associate with the route
  route_table_ids = <list(any)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the carrier gateway used for the destination match. Traffic will
  # be routed to this ID. If this is set, no other destination ID or ARN can be
  # set.
  carrier_gateway_id = null

  # The ARN of the core network used for the destination match. Traffic will be
  # routed to this ID. If this is set, no other destination ID or ARN can be
  # set.
  core_network_arn = null

  # The IPv4 CIDR address block used for the destination match. Routing
  # decisions are based on the most specific match.
  destination_cidr_block = null

  # The IPv6 CIDR address block used for the destination match. Routing
  # decisions are based on the most specific match.
  destination_ipv6_cidr_block = null

  # The ID of a prefix list used for the destination match.
  destination_prefix_list_id = null

  # The ID of the egress-only internet gateway used for the destination match.
  # Traffic will be routed to this ID. If this is set, no other destination ID
  # or ARN can be set.
  egress_only_gateway_id = null

  # The ID of the internet gateway or virtual private gateway used for the
  # destination match. Traffic will be routed to this ID. If this is set, no
  # other destination ID or ARN can be set.
  gateway_id = null

  # The ID of the Outpust local gateway used for the destination match. Traffic
  # will be routed to this ID. If this is set, no other destination ID or ARN
  # can be set.
  local_gateway_id = null

  # The ID of the NAT gateway used for the destination match. Traffic will be
  # routed to this ID. If this is set, no other destination ID or ARN can be
  # set.
  nat_gateway_id = null

  # The ID of the EC2 network interface used for the destination match. Traffic
  # will be routed to this ID. If this is set, no other destination ID or ARN
  # can be set.
  network_interface_id = null

  # The ID of the transit gateway used for the destination match. Traffic will
  # be routed to this ID. If this is set, no other destination ID or ARN can be
  # set.
  transit_gateway_id = null

  # The ID of the VPC endpoint used for the destination match. Traffic will be
  # routed to this ID. If this is set, no other destination ID or ARN can be
  # set. 
  vpc_endpoint_id = null

  # The ID of the VPC peering connection used for the destination match. Traffic
  # will be routed to this ID. If this is set, no other destination ID or ARN
  # can be set. 
  vpc_peering_connection_id = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="route_table_ids" requirement="required" type="list(any)">
<HclListItemDescription>

List of route table IDs to associate with the route

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
</HclListItem>

### Optional

<HclListItem name="carrier_gateway_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the carrier gateway used for the destination match. Traffic will be routed to this ID. If this is set, no other destination ID or ARN can be set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="core_network_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the core network used for the destination match. Traffic will be routed to this ID. If this is set, no other destination ID or ARN can be set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="destination_cidr_block" requirement="optional" type="string">
<HclListItemDescription>

The IPv4 CIDR address block used for the destination match. Routing decisions are based on the most specific match.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="destination_ipv6_cidr_block" requirement="optional" type="string">
<HclListItemDescription>

The IPv6 CIDR address block used for the destination match. Routing decisions are based on the most specific match.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="destination_prefix_list_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of a prefix list used for the destination match.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="egress_only_gateway_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the egress-only internet gateway used for the destination match. Traffic will be routed to this ID. If this is set, no other destination ID or ARN can be set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="gateway_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the internet gateway or virtual private gateway used for the destination match. Traffic will be routed to this ID. If this is set, no other destination ID or ARN can be set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="local_gateway_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the Outpust local gateway used for the destination match. Traffic will be routed to this ID. If this is set, no other destination ID or ARN can be set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="nat_gateway_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the NAT gateway used for the destination match. Traffic will be routed to this ID. If this is set, no other destination ID or ARN can be set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="network_interface_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the EC2 network interface used for the destination match. Traffic will be routed to this ID. If this is set, no other destination ID or ARN can be set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="transit_gateway_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the transit gateway used for the destination match. Traffic will be routed to this ID. If this is set, no other destination ID or ARN can be set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="vpc_endpoint_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the VPC endpoint used for the destination match. Traffic will be routed to this ID. If this is set, no other destination ID or ARN can be set. 

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="vpc_peering_connection_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the VPC peering connection used for the destination match. Traffic will be routed to this ID. If this is set, no other destination ID or ARN can be set. 

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="ids">
<HclListItemDescription>

A map of IDs of the route resources.

</HclListItemDescription>
</HclListItem>

<HclListItem name="states">
<HclListItemDescription>

A map of states of the route resources.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.9/modules/route/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.9/modules/route/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.9/modules/route/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "b6efd537101207a75210d18f509931b2"
}
##DOCS-SOURCER-END -->
