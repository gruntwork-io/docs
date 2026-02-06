---
title: "Transit Gateway Attachment Terraform Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="VPC Modules" version="0.28.11" lastModifiedVersion="0.28.9"/>

# Transit Gateway Attachment Terraform Module

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.11/modules/transit-gateway-attachment" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.9" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module creates a transit gateway attachment resource. A transit gateway attachment, attaches the transit gateway to a VPC. This module can be used to attach a transit gateway to multiple VPCs. Attaching a transit gateway to one or more VPCs creates a HUB and spoke routing topology, allowing traffic from one VPC to reach other VPCs or from a VPC to reach on-premises networks.

The module accepts a map of VPCs for attachment to the transit gateway. See the examples below for the structure of the map.

See [VPC Core Concepts](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.11/modules//_docs/vpc-core-concepts.md) for more information on the core networking components and topologies.

## What is a Transit Gateway Attachment?

A transit gateway attachment is a way to connect a transit gateway (virtual router) to a VPC. You can think of a VPC attachment just like a cat5e or cat6 network cable. By attaching the transit gateway, you're connecting the cable between the virtual router and a VPC. By attaching the transit gateway and then either configuring a route or enabling route propagation, you can route traffic between VPCs.

## Usage

For usage examples, check out the [examples folder](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.11/examples/transit-gateway-attachment/).

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
| [aws_ec2\_transit_gateway_vpc_attachment.this](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ec2\_transit_gateway_vpc_attachment) | resource |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_custom_tags"></a> [custom_tags](#input_custom_tags) | A map of tags to apply to all resources when applicable. The key is the tag name and the value is the tag value. Note that the tag 'Name' is automatically added by this module but may be optionally overwritten by this variable. | `map(string)` | `{}` | no |
| <a name="input_enable_appliance_mode_support"></a> [enable_appliance_mode_support](#input_enable_appliance_mode_support) | Whether Appliance Mode support is enabled. If enabled, a traffic flow between a source and destination uses the same Availability Zone for the VPC attachment for the lifetime of that flow. The default is false. | `bool` | `false` | no |
| <a name="input_enable_dns_support"></a> [enable_dns_support](#input_enable_dns_support) | Whether DNS resolution is enabled for this VPC attachment. The default is false. | `bool` | `false` | no |
| <a name="input_enable_ipv6_support"></a> [enable_ipv6\_support](#input_enable_ipv6\_support) | Whether IPv6 support is enabled. If enabled, a private IPv6 address from the Amazon pool of IPv6 addresses is assigned to the Elastic Network Interface (ENI) for a VPC attachment. The default is false. | `bool` | `false` | no |
| <a name="input_enable_transit_gateway_default_route_table_association"></a> [enable_transit_gateway_default_route_table_association](#input_enable_transit_gateway_default_route_table_association) | Whether the VPC attachment should be associated with the Transit Gateway association default route table. The default is true. | `bool` | `true` | no |
| <a name="input_enable_transit_gateway_default_route_table_propagation"></a> [enable_transit_gateway_default_route_table_propagation](#input_enable_transit_gateway_default_route_table_propagation) | Whether the VPC attachment should propagate routes with the Transit Gateway propagation default route table. The default is true. | `bool` | `true` | no |
| <a name="input_transit_gateway_id"></a> [transit_gateway_id](#input_transit_gateway_id) | EC2 Transit Gateway identifier | `string` | n/a | yes |
| <a name="input_vpcs"></a> [vpcs](#input_vpcs) | A map of vpcs with their name and the subnet ids that the transit gateway will attach to. The subnet IDs configured here are the attachment point for the transit gateway. I.E. The transit gateway will have an IP on these subnets. | `map(object({<br>    vpc_id     = string<br>    vpc_name   = string<br>    subnet_ids = list(string)<br>  }))` | n/a | yes |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_id"></a> [id](#output_id) | EC2 Transit Gateway Attachment identifier. |

<!-- END_TF_DOCS -->

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S TRANSIT-GATEWAY-ATTACHMENT MODULE
# ------------------------------------------------------------------------------------------------------

module "transit_gateway_attachment" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/transit-gateway-attachment?ref=v0.28.11"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # EC2 Transit Gateway identifier
  transit_gateway_id = <string>

  # A map of vpcs with their name and the subnet ids that the transit gateway
  # will attach to with optional creation of routing tables. See variable
  # definition for details
  vpcs = <map(object(
    vpc_id     = string
    vpc_name   = string
    subnet_ids = list(string)
    appliance_mode_support = optional(string, "disable")
    route_table = optional(string)
  ))>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A map of tags to apply to all resources when applicable. The key is the tag
  # name and the value is the tag value. Note that the tag 'Name' is
  # automatically added by this module but may be optionally overwritten by this
  # variable.
  custom_tags = {}

  # Whether Appliance Mode support is enabled. If enabled, a traffic flow
  # between a source and destination uses the same Availability Zone for the VPC
  # attachment for the lifetime of that flow. The default is false.
  enable_appliance_mode_support = false

  # Whether DNS resolution is enabled for this VPC attachment. The default is
  # false.
  enable_dns_support = false

  # Whether IPv6 support is enabled. If enabled, a private IPv6 address from the
  # Amazon pool of IPv6 addresses is assigned to the Elastic Network Interface
  # (ENI) for a VPC attachment. The default is false.
  enable_ipv6_support = false

  # Whether the VPC attachment should propagate routes with the Transit Gateway
  # propagation non-default route tables. The default is false.
  enable_tgw_route_propagation = false

  # Whether the VPC attachment should be associated with the Transit Gateway
  # association default route table. The default is true.
  enable_transit_gateway_default_route_table_association = true

  # Whether the VPC attachment should propagate routes with the Transit Gateway
  # propagation default route table. The default is true.
  enable_transit_gateway_default_route_table_propagation = true

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S TRANSIT-GATEWAY-ATTACHMENT MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/transit-gateway-attachment?ref=v0.28.11"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # EC2 Transit Gateway identifier
  transit_gateway_id = <string>

  # A map of vpcs with their name and the subnet ids that the transit gateway
  # will attach to with optional creation of routing tables. See variable
  # definition for details
  vpcs = <map(object(
    vpc_id     = string
    vpc_name   = string
    subnet_ids = list(string)
    appliance_mode_support = optional(string, "disable")
    route_table = optional(string)
  ))>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A map of tags to apply to all resources when applicable. The key is the tag
  # name and the value is the tag value. Note that the tag 'Name' is
  # automatically added by this module but may be optionally overwritten by this
  # variable.
  custom_tags = {}

  # Whether Appliance Mode support is enabled. If enabled, a traffic flow
  # between a source and destination uses the same Availability Zone for the VPC
  # attachment for the lifetime of that flow. The default is false.
  enable_appliance_mode_support = false

  # Whether DNS resolution is enabled for this VPC attachment. The default is
  # false.
  enable_dns_support = false

  # Whether IPv6 support is enabled. If enabled, a private IPv6 address from the
  # Amazon pool of IPv6 addresses is assigned to the Elastic Network Interface
  # (ENI) for a VPC attachment. The default is false.
  enable_ipv6_support = false

  # Whether the VPC attachment should propagate routes with the Transit Gateway
  # propagation non-default route tables. The default is false.
  enable_tgw_route_propagation = false

  # Whether the VPC attachment should be associated with the Transit Gateway
  # association default route table. The default is true.
  enable_transit_gateway_default_route_table_association = true

  # Whether the VPC attachment should propagate routes with the Transit Gateway
  # propagation default route table. The default is true.
  enable_transit_gateway_default_route_table_propagation = true

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="transit_gateway_id" requirement="required" type="string">
<HclListItemDescription>

EC2 Transit Gateway identifier

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpcs" requirement="required" type="map(object(…))">
<HclListItemDescription>

A map of vpcs with their name and the subnet ids that the transit gateway will attach to with optional creation of routing tables. See variable definition for details

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    vpc_id     = string
    vpc_name   = string
    subnet_ids = list(string)

    # Whether Appliance Mode support is enabled.  If enabled, a traffic flow between a source and destination
    # uses the same Availability Zone for the VPC attachment for the lifetime of that flow.
    # Valid values: enable, disable. Default value: disable.
    appliance_mode_support = optional(string, "disable")

    # Creates and associates a route table with the transit gateway attachment. Default value: null
    route_table = optional(string)

  }))
```

</HclListItemTypeDetails>
<HclGeneralListItem title="More Details">
<details>


```hcl

     Whether Appliance Mode support is enabled.  If enabled, a traffic flow between a source and destination
     uses the same Availability Zone for the VPC attachment for the lifetime of that flow.
     Valid values: enable, disable. Default value: disable.

```
</details>

<details>


```hcl

     Creates and associates a route table with the transit gateway attachment. Default value: null

```
</details>

</HclGeneralListItem>
</HclListItem>

### Optional

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to all resources when applicable. The key is the tag name and the value is the tag value. Note that the tag 'Name' is automatically added by this module but may be optionally overwritten by this variable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="enable_appliance_mode_support" requirement="optional" type="bool">
<HclListItemDescription>

Whether Appliance Mode support is enabled. If enabled, a traffic flow between a source and destination uses the same Availability Zone for the VPC attachment for the lifetime of that flow. The default is false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_dns_support" requirement="optional" type="bool">
<HclListItemDescription>

Whether DNS resolution is enabled for this VPC attachment. The default is false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_ipv6_support" requirement="optional" type="bool">
<HclListItemDescription>

Whether IPv6 support is enabled. If enabled, a private IPv6 address from the Amazon pool of IPv6 addresses is assigned to the Elastic Network Interface (ENI) for a VPC attachment. The default is false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_tgw_route_propagation" requirement="optional" type="bool">
<HclListItemDescription>

Whether the VPC attachment should propagate routes with the Transit Gateway propagation non-default route tables. The default is false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_transit_gateway_default_route_table_association" requirement="optional" type="bool">
<HclListItemDescription>

Whether the VPC attachment should be associated with the Transit Gateway association default route table. The default is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_transit_gateway_default_route_table_propagation" requirement="optional" type="bool">
<HclListItemDescription>

Whether the VPC attachment should propagate routes with the Transit Gateway propagation default route table. The default is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="id">
<HclListItemDescription>

EC2 Transit Gateway Attachment identifier.

</HclListItemDescription>
</HclListItem>

<HclListItem name="tgw_route_tables">
<HclListItemDescription>

The IDs of the Transit Gateway Route Tables.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.11/modules/transit-gateway-attachment/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.11/modules/transit-gateway-attachment/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.11/modules/transit-gateway-attachment/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "0b686aa20e2cd935045f6819d8148f35"
}
##DOCS-SOURCER-END -->
