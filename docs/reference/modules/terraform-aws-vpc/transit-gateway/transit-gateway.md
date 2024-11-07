---
title: "Transit Gateway Terraform Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="VPC Modules" version="0.26.26" lastModifiedVersion="0.26.18"/>

# Transit Gateway Terraform Module

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.26.26/modules/transit-gateway" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.18" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform module creates a transit gateway resource. A transit gateway is an effective method of connecting multiple VPCs, Direct Connects, VPNs, and other networks. Transit gateways are also a good way to connect VPCs to shared services, such as NAT gateways, firewalls, and other security appliances. By using a transit gateway, the number of connections to and from VPCs can be reduced, which reduces the number of routes that need to be managed.

See [VPC Core Concepts](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.26.26/modules//_docs/vpc-core-concepts.md) for more information on the core networking components and topologies.

## Usage

For usage examples, check out the [examples folder](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.26.26/examples/transit-gateway/).

## What's a Transit Gateway?

A [Transit Gateway](https://aws.amazon.com/transit-gateway/) acts as a **Regional** virtual router for traffic flowing between your Virtual Private Clouds (VPCs) and on-premises networks. Transit Gateway simplifies how customers interconnect their networks to scale their AWS workloads. Transit Gateway reduces the number of connections needed to connect many VPCs, AWS accounts, and on-premises networks. Transit Gateway can also be used to isolate workloads by attaching VPCs and on-premises networks to different route tables which can send traffic to security appliances, such as virtual firewalls.

## Transit Gateway vs VPC peering

Transit Gateway solves the complexity involved with creating and managing multiple VPC peering connections at scale. Transit Gateway's should be utilized whenever connectivity is required with more than two VPCs. Transit Gateway's allow for far more flexibility in future networking decisions and are much easier to manage.

### VPC Peering

![VPCs Peering](https://docs.aws.amazon.com/vpc/latest/peering/images/many-vpcs-peered-diagram.png)

Credits [many-vpcs-full-access](https://docs.aws.amazon.com/vpc/latest/peering/peering-configurations-full-access.html#many-vpcs-full-access)

### Transit Gateway

A network without AWS Transit Gateway will often look like
![AWS topology diagram showing multiple VPC peers](https://d1.awsstatic.com/product-marketing/transit-gateway/tgw-before.7f287b3bf00bbc4fbdeadef3c8d5910374aec963.png)

However, with AWS Transit Gateway it will be more like

![AWS topology diagram showing a centralized transit gateway acting as the router](https://d1.awsstatic.com/product-marketing/transit-gateway/tgw-after.d85d3e2cb67fd2ed1a3be645d443e9f5910409fd.png)

Credits [Transit Gateway](https://aws.amazon.com/transit-gateway)

## How To

What follows are the steps required to configure Transit Gateway resources within your environment(s).

### Create a Network Between Same Region/Same Account

*   Create the Transit Gateway
*   Attach your VPCs to your Transit Gateway
*   Add routes between the Transit Gateway and your VPCs

### Create a Network Between Different Regions or Different Accounts

*   Create the Transit Gateway in the first region/account
*   Create the Transit Gateway in the second region/account
*   Create a Transit Gateway Peering Connection between the two Transit Gateways
    *   The peering option can be implemented using this module along with [transit-gateway-peering-attachment](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.26.26/modules/transit-gateway-peering-attachment/) & [transit-gateway-peering-attachment-accepter](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.26.26/modules/transit-gateway-peering-attachment-accepter/) modules. See [VPC Core Concepts](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.26.26/modules//_docs/vpc-core-concepts.md) for more information on the core networking components and topologies.
*   Attach your VPCs to your Transit Gateway
*   Add routes between the Transit Gateways and your VPCs

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
| [aws_ec2\_transit_gateway.this](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ec2\_transit_gateway) | resource |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_amazon_side_asn"></a> [amazon_side_asn](#input_amazon_side_asn) | Private Autonomous System Number (ASN) for the Amazon side of a BGP session. The range is 64512 to 65534 for 16-bit ASNs and 4200000000 to 4294967294 for 32-bit ASNs. The default is 64512. | `number` | `64512` | no |
| <a name="input_custom_tags"></a> [custom_tags](#input_custom_tags) | (Optional) A map of tags to apply to all resources when applicable. The key is the tag name and the value is the tag value. Note that the tag 'Name' is automatically added by this module but may be optionally overwritten by this variable. | `map(string)` | `{}` | no |
| <a name="input_description"></a> [description](#input_description) | Description of the EC2 Transit Gateway | `string` | `null` | no |
| <a name="input_enable_auto_accept_shared_attachments"></a> [enable_auto_accept_shared_attachments](#input_enable_auto_accept_shared_attachments) | Whether resource attachment requests are automatically accepted. Default is false. | `bool` | `false` | no |
| <a name="input_enable_default_route_table_association"></a> [enable_default_route_table_association](#input_enable_default_route_table_association) | Whether resource attachments are automatically associated with the default route table. Default is true. | `bool` | `true` | no |
| <a name="input_enable_default_route_table_propagation"></a> [enable_default_route_table_propagation](#input_enable_default_route_table_propagation) | Whether transit gateway attachments automatically propagate routes to the default route table. Default is true. | `bool` | `true` | no |
| <a name="input_enable_dns_support"></a> [enable_dns_support](#input_enable_dns_support) | Whether DNS support is enabled on the transit gateway. Default to true. | `bool` | `true` | no |
| <a name="input_enable_multicast_support"></a> [enable_multicast_support](#input_enable_multicast_support) | Whether multicast is enabled on the transit gateway. Default is false. | `bool` | `false` | no |
| <a name="input_enable_vpn_ecmp_support"></a> [enable_vpn_ecmp_support](#input_enable_vpn_ecmp_support) | Whether VPN Equal Cost Multipath Protocol support is enabled on the transit gateway. Default is true. | `bool` | `true` | no |
| <a name="input_name"></a> [name](#input_name) | The name of the Transit Gateway | `string` | n/a | yes |
| <a name="input_transit_gateway_cidr_blocks"></a> [transit_gateway_cidr_blocks](#input_transit_gateway_cidr_blocks) | List of IPv4 or IPv6 CIDR blocks to use for the transit gateway. Must be a size /24 CIDR block or larger for IPv4, or a size /64 CIDR block or larger for IPv6. | `list(string)` | `null` | no |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_default_route_table_id"></a> [default_route_table_id](#output_default_route_table_id) | Transit Gateway default route table identifier. |
| <a name="output_id"></a> [id](#output_id) | Transit Gateway identifier. |

<!-- END_TF_DOCS -->

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S TRANSIT-GATEWAY MODULE
# ------------------------------------------------------------------------------------------------------

module "transit_gateway" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/transit-gateway?ref=v0.26.26"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the Transit Gateway
  name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Private Autonomous System Number (ASN) for the Amazon side of a BGP session.
  # The range is 64512 to 65534 for 16-bit ASNs and 4200000000 to 4294967294 for
  # 32-bit ASNs. The default is 64512.
  amazon_side_asn = 64512

  # (Optional) A map of tags to apply to all resources when applicable. The key
  # is the tag name and the value is the tag value. Note that the tag 'Name' is
  # automatically added by this module but may be optionally overwritten by this
  # variable.
  custom_tags = {}

  # Description of the EC2 Transit Gateway
  description = null

  # Whether resource attachment requests are automatically accepted. Default is
  # false.
  enable_auto_accept_shared_attachments = false

  # Whether resource attachments are automatically associated with the default
  # route table. Default is true.
  enable_default_route_table_association = true

  # Whether transit gateway attachments automatically propagate routes to the
  # default route table. Default is true.
  enable_default_route_table_propagation = true

  # Whether DNS support is enabled on the transit gateway. Default to true.
  enable_dns_support = true

  # Whether multicast is enabled on the transit gateway. Default is false.
  enable_multicast_support = false

  # Whether VPN Equal Cost Multipath Protocol support is enabled on the transit
  # gateway. Default is true.
  enable_vpn_ecmp_support = true

  # List of IPv4 or IPv6 CIDR blocks to use for the transit gateway. Must be a
  # size /24 CIDR block or larger for IPv4, or a size /64 CIDR block or larger
  # for IPv6.
  transit_gateway_cidr_blocks = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S TRANSIT-GATEWAY MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/transit-gateway?ref=v0.26.26"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the Transit Gateway
  name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Private Autonomous System Number (ASN) for the Amazon side of a BGP session.
  # The range is 64512 to 65534 for 16-bit ASNs and 4200000000 to 4294967294 for
  # 32-bit ASNs. The default is 64512.
  amazon_side_asn = 64512

  # (Optional) A map of tags to apply to all resources when applicable. The key
  # is the tag name and the value is the tag value. Note that the tag 'Name' is
  # automatically added by this module but may be optionally overwritten by this
  # variable.
  custom_tags = {}

  # Description of the EC2 Transit Gateway
  description = null

  # Whether resource attachment requests are automatically accepted. Default is
  # false.
  enable_auto_accept_shared_attachments = false

  # Whether resource attachments are automatically associated with the default
  # route table. Default is true.
  enable_default_route_table_association = true

  # Whether transit gateway attachments automatically propagate routes to the
  # default route table. Default is true.
  enable_default_route_table_propagation = true

  # Whether DNS support is enabled on the transit gateway. Default to true.
  enable_dns_support = true

  # Whether multicast is enabled on the transit gateway. Default is false.
  enable_multicast_support = false

  # Whether VPN Equal Cost Multipath Protocol support is enabled on the transit
  # gateway. Default is true.
  enable_vpn_ecmp_support = true

  # List of IPv4 or IPv6 CIDR blocks to use for the transit gateway. Must be a
  # size /24 CIDR block or larger for IPv4, or a size /64 CIDR block or larger
  # for IPv6.
  transit_gateway_cidr_blocks = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name of the Transit Gateway

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="amazon_side_asn" requirement="optional" type="number">
<HclListItemDescription>

Private Autonomous System Number (ASN) for the Amazon side of a BGP session. The range is 64512 to 65534 for 16-bit ASNs and 4200000000 to 4294967294 for 32-bit ASNs. The default is 64512.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="64512"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

(Optional) A map of tags to apply to all resources when applicable. The key is the tag name and the value is the tag value. Note that the tag 'Name' is automatically added by this module but may be optionally overwritten by this variable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="description" requirement="optional" type="string">
<HclListItemDescription>

Description of the EC2 Transit Gateway

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="enable_auto_accept_shared_attachments" requirement="optional" type="bool">
<HclListItemDescription>

Whether resource attachment requests are automatically accepted. Default is false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_default_route_table_association" requirement="optional" type="bool">
<HclListItemDescription>

Whether resource attachments are automatically associated with the default route table. Default is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_default_route_table_propagation" requirement="optional" type="bool">
<HclListItemDescription>

Whether transit gateway attachments automatically propagate routes to the default route table. Default is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_dns_support" requirement="optional" type="bool">
<HclListItemDescription>

Whether DNS support is enabled on the transit gateway. Default to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_multicast_support" requirement="optional" type="bool">
<HclListItemDescription>

Whether multicast is enabled on the transit gateway. Default is false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_vpn_ecmp_support" requirement="optional" type="bool">
<HclListItemDescription>

Whether VPN Equal Cost Multipath Protocol support is enabled on the transit gateway. Default is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="transit_gateway_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

List of IPv4 or IPv6 CIDR blocks to use for the transit gateway. Must be a size /24 CIDR block or larger for IPv4, or a size /64 CIDR block or larger for IPv6.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="arn">
<HclListItemDescription>

Transit Gateway identifier.

</HclListItemDescription>
</HclListItem>

<HclListItem name="default_route_table_id">
<HclListItemDescription>

Transit Gateway default route table identifier.

</HclListItemDescription>
</HclListItem>

<HclListItem name="id">
<HclListItemDescription>

Transit Gateway identifier.

</HclListItemDescription>
</HclListItem>

<HclListItem name="owner_id">
<HclListItemDescription>

AWS account that owns the Transit Gateway

</HclListItemDescription>
</HclListItem>

<HclListItem name="propagation_default_route_table_id">
<HclListItemDescription>

Identifier of the Transit Gateway's default propagation route table.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.26.26/modules/transit-gateway/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.26.26/modules/transit-gateway/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.26.26/modules/transit-gateway/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "c8870e393cd0ede1e5795f3d01b1f1ff"
}
##DOCS-SOURCER-END -->
