---
title: "Transit Gateway Peering Attachment Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="VPC Modules" version="0.28.11" lastModifiedVersion="0.28.9"/>

# Transit Gateway Peering Attachment Module

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.11/modules/transit-gateway-peering-attachment" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.9" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module creates transit gateway peering resources for the `requester` side of the connection to another transit gateway. The transit gateway can be in this account or in another account. Transit gateway peering is a one-to-one relationship between two transit gateways. If you need to peer multiple transit gateways, you will need to create multiple transit gateway peering attachments.

See [VPC Core Concepts](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.11/modules//_docs/vpc-core-concepts.md) for more information on the core networking components and topologies.

## What is a Transit Gateway Peering Attachment?

A transit gateway peering attachment is a way to connect two transit gateways to each other. Much like the VPC attachment, this can be thought of as a network cable. By attaching them, you 'plug' the two transit gateways together. This allows you to route traffic between the two transit gateways. Unlike VPC attachments, peering attachments have two components to the attachment a `requester` and an `accepter`. This is important because each attachment must be accepted prior to the attachment being completed. This is a security measure to ensure a malicious attachment from a random account does not gain network access to your environment.

## Usage

For usage examples, check out the [examples folder](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.11/examples/transit-gateway-peering-attachment/).

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
| [aws_ec2\_transit_gateway_peering_attachment.this](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ec2\_transit_gateway_peering_attachment) | resource |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_custom_tags"></a> [custom_tags](#input_custom_tags) | A map of tags to apply to all resources when applicable. The key is the tag name and the value is the tag value. Note that the tag 'Name' is automatically added by this module but may be optionally overwritten by this variable. | `map(string)` | `{}` | no |
| <a name="input_name"></a> [name](#input_name) | The name of the transit gateway peering attachment. If not set, a default name will be used. | `string` | `null` | no |
| <a name="input_peer_account_id"></a> [peer_account_id](#input_peer_account_id) | The AWS account ID of the peer transit gateway. This is only required when the peer transit gateway is owned by a different AWS account. Defaults to the current account ID. | `string` | `null` | no |
| <a name="input_peer_region"></a> [peer_region](#input_peer_region) | The AWS region where the peer transit gateway resides. | `string` | n/a | yes |
| <a name="input_peer_transit_gateway_id"></a> [peer_transit_gateway_id](#input_peer_transit_gateway_id) | The ID of the peer transit gateway. | `string` | n/a | yes |
| <a name="input_transit_gateway_id"></a> [transit_gateway_id](#input_transit_gateway_id) | The ID of the transit gateway. This should be your transit gateway. | `string` | n/a | yes |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_id"></a> [id](#output_id) | Transit Gateway Peering Attachment identifier |

<!-- END_TF_DOCS -->

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S TRANSIT-GATEWAY-PEERING-ATTACHMENT MODULE
# ------------------------------------------------------------------------------------------------------

module "transit_gateway_peering_attachment" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/transit-gateway-peering-attachment?ref=v0.28.11"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS region where the peer transit gateway resides.
  peer_region = <string>

  # The ID of the peer transit gateway.
  peer_transit_gateway_id = <string>

  # The ID of the transit gateway. This should be your transit gateway.
  transit_gateway_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A map of tags to apply to all resources when applicable. The key is the tag
  # name and the value is the tag value. Note that the tag 'Name' is
  # automatically added by this module but may be optionally overwritten by this
  # variable.
  custom_tags = {}

  # The name of the transit gateway peering attachment. If not set, a default
  # name will be used.
  name = null

  # The AWS account ID of the peer transit gateway. This is only required when
  # the peer transit gateway is owned by a different AWS account. Defaults to
  # the current account ID.
  peer_account_id = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S TRANSIT-GATEWAY-PEERING-ATTACHMENT MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/transit-gateway-peering-attachment?ref=v0.28.11"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS region where the peer transit gateway resides.
  peer_region = <string>

  # The ID of the peer transit gateway.
  peer_transit_gateway_id = <string>

  # The ID of the transit gateway. This should be your transit gateway.
  transit_gateway_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A map of tags to apply to all resources when applicable. The key is the tag
  # name and the value is the tag value. Note that the tag 'Name' is
  # automatically added by this module but may be optionally overwritten by this
  # variable.
  custom_tags = {}

  # The name of the transit gateway peering attachment. If not set, a default
  # name will be used.
  name = null

  # The AWS account ID of the peer transit gateway. This is only required when
  # the peer transit gateway is owned by a different AWS account. Defaults to
  # the current account ID.
  peer_account_id = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="peer_region" requirement="required" type="string">
<HclListItemDescription>

The AWS region where the peer transit gateway resides.

</HclListItemDescription>
</HclListItem>

<HclListItem name="peer_transit_gateway_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the peer transit gateway.

</HclListItemDescription>
</HclListItem>

<HclListItem name="transit_gateway_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the transit gateway. This should be your transit gateway.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to all resources when applicable. The key is the tag name and the value is the tag value. Note that the tag 'Name' is automatically added by this module but may be optionally overwritten by this variable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="name" requirement="optional" type="string">
<HclListItemDescription>

The name of the transit gateway peering attachment. If not set, a default name will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="peer_account_id" requirement="optional" type="string">
<HclListItemDescription>

The AWS account ID of the peer transit gateway. This is only required when the peer transit gateway is owned by a different AWS account. Defaults to the current account ID.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="id">
<HclListItemDescription>

Transit Gateway Peering Attachment identifier

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.11/modules/transit-gateway-peering-attachment/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.11/modules/transit-gateway-peering-attachment/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.11/modules/transit-gateway-peering-attachment/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "51db7c732aea67b89f8ebda7853cedc2"
}
##DOCS-SOURCER-END -->
