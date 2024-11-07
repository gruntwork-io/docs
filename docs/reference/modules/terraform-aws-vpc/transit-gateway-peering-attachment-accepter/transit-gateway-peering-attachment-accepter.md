---
title: "Transit Gateway Peering Attachment Accepter Accepter Terraform Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="VPC Modules" version="0.26.27" lastModifiedVersion="0.26.8"/>

# Transit Gateway Peering Attachment Accepter Accepter Terraform Module

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.26.27/modules/transit-gateway-peering-attachment-accepter" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.8" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module creates Transit Gateway peering resources for the `accepter` side of the connection. This allows for connectivity between multiple regions or multiple AWS accounts. Transit Gateway peering is a one-to-one relationship between two transit gateways. If you need to peer multiple transit gateways, you will need to create multiple transit gateway peering attachments.

See [VPC Core Concepts](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.26.27/modules//_docs/vpc-core-concepts.md) for more information on the core networking components and topologies.

## What is a Transit Gateway Peering Attachment Accepter?

A transit gateway peering attachment accepter is a way to connect two transit gateways to each other. Much like the VPC attachment, this can be thought of as a network cable. By attaching them, you 'plug' the two transit gateways together. This allows you to route traffic between the two transit gateways. Unlike VPC attachments, peering attachments have two components to the attachment a `requester` and an `accepter`. This is important because each attachment must be accepted prior to the attachment being completed. This is a security measure to ensure a malicious attachment from a random account does not gain network access to your environment. The `accepter` is the side of the peering attachment that accepts the request from the `requester`.

For usage examples, check out the [examples folder](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.26.27/examples/transit-gateway-peering-attachment).

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
| [aws_ec2\_transit_gateway_peering_attachment_accepter.this](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ec2\_transit_gateway_peering_attachment_accepter) | resource |
| [aws_ec2\_transit_gateway_peering_attachment.this](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/ec2\_transit_gateway_peering_attachment) | data source |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_custom_tags"></a> [custom_tags](#input_custom_tags) | A map of tags to apply to all resources when applicable. The key is the tag name and the value is the tag value. Note that the tag 'Name' is automatically added by this module but may be optionally overwritten by this variable. | `map(string)` | `{}` | no |
| <a name="input_name"></a> [name](#input_name) | The name of the transit gateway peering attachment. If not set, a default name will be used. | `string` | `null` | no |
| <a name="input_transit_gateway_attachment_id"></a> [transit_gateway_attachment_id](#input_transit_gateway_attachment_id) | The transit gateway peering attachment ID to accept. If none is set, the module will attempt to look this up. | `string` | `null` | no |
| <a name="input_transit_gateway_id"></a> [transit_gateway_id](#input_transit_gateway_id) | Transit gateway ID of which to accept the peering attachments from. This will be the accepter side transit gateway (your side) of the peering attachment | `string` | n/a | yes |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_ids"></a> [ids](#output_ids) | The transit gateway peering attachment identifier. |
| <a name="output_peer_account_ids"></a> [peer_account_ids](#output_peer_account_ids) | The identifers for the peer account. |
| <a name="output_peer_transit_gateway_ids"></a> [peer_transit_gateway_ids](#output_peer_transit_gateway_ids) | The identifier of the peer transit gateway. |
| <a name="output_transit_gateway_ids"></a> [transit_gateway_ids](#output_transit_gateway_ids) | The identifer of the transit gateway for the accepter resources. |

<!-- END_TF_DOCS -->

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S TRANSIT-GATEWAY-PEERING-ATTACHMENT-ACCEPTER MODULE
# ------------------------------------------------------------------------------------------------------

module "transit_gateway_peering_attachment_accepter" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/transit-gateway-peering-attachment-accepter?ref=v0.26.27"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Transit gateway ID of which to accept the peering attachments from. This
  # will be the accepter side transit gateway (your side) of the peering
  # attachment
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

  # The transit gateway peering attachment ID to accept. If none is set, the
  # module will attempt to look this up.
  transit_gateway_attachment_id = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S TRANSIT-GATEWAY-PEERING-ATTACHMENT-ACCEPTER MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/transit-gateway-peering-attachment-accepter?ref=v0.26.27"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Transit gateway ID of which to accept the peering attachments from. This
  # will be the accepter side transit gateway (your side) of the peering
  # attachment
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

  # The transit gateway peering attachment ID to accept. If none is set, the
  # module will attempt to look this up.
  transit_gateway_attachment_id = null

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

Transit gateway ID of which to accept the peering attachments from. This will be the accepter side transit gateway (your side) of the peering attachment

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

<HclListItem name="transit_gateway_attachment_id" requirement="optional" type="string">
<HclListItemDescription>

The transit gateway peering attachment ID to accept. If none is set, the module will attempt to look this up.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="ids">
<HclListItemDescription>

The transit gateway peering attachment identifier.

</HclListItemDescription>
</HclListItem>

<HclListItem name="peer_account_ids">
<HclListItemDescription>

The identifers for the peer account.

</HclListItemDescription>
</HclListItem>

<HclListItem name="peer_transit_gateway_ids">
<HclListItemDescription>

The identifier of the peer transit gateway.

</HclListItemDescription>
</HclListItem>

<HclListItem name="transit_gateway_ids">
<HclListItemDescription>

The identifer of the transit gateway for the accepter resources.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.26.27/modules/transit-gateway-peering-attachment-accepter/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.26.27/modules/transit-gateway-peering-attachment-accepter/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.26.27/modules/transit-gateway-peering-attachment-accepter/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "17dada9168ad68fdca270858bd08653b"
}
##DOCS-SOURCER-END -->
