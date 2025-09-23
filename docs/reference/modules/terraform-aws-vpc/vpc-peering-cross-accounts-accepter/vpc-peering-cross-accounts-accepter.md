---
title: "vpc-peering-cross-accounts-accepter"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="VPC Modules" version="0.28.7" lastModifiedVersion="0.27.0"/>

# vpc-peering-cross-accounts-accepter

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.7/modules/vpc-peering-cross-accounts-accepter" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.27.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module manages the accepter's side of the VPC Peering Connection between two differents accounts that you control.

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
| [aws_vpc_peering_connection_accepter.this](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpc_peering_connection_accepter) | resource |
| [aws_vpc_peering_connection_options.this](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpc_peering_connection_options) | resource |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_dns_resolution"></a> [dns_resolution](#input_dns_resolution) | Allow a local VPC to resolve public DNS hostnames to private IP addresses when queried from instances in the peer VPC. | `bool` | `false` | no |
| <a name="input_link_to_local_classic"></a> [link_to_local_classic](#input_link_to_local_classic) | Allow a local linked EC2-Classic instance to communicate with instances in a peer VPC. | `bool` | `false` | no |
| <a name="input_link_to_remote_classic"></a> [link_to_remote_classic](#input_link_to_remote_classic) | Allow a local VPC to communicate with a linked EC2-Classic instance in a peer VPC. | `bool` | `false` | no |
| <a name="input_requester_vpc_cidr"></a> [requester_vpc_cidr](#input_requester_vpc_cidr) | The VPC CIDR of the requester VPC. | `string` | n/a | yes |
| <a name="input_route_creation_timeout"></a> [route_creation_timeout](#input_route_creation_timeout) | The timeout for the creation of the Route Tables. It defines how long to wait for a route table to be created before considering the operation failed. Ref: https://www.terraform.io/language/resources/syntax#operation-timeouts | `string` | `"5m"` | no |
| <a name="input_route_deletion_timeout"></a> [route_deletion_timeout](#input_route_deletion_timeout) | The timeout for the deletion of the Route Tables. It defines how long to wait for a route table to be deleted before considering the operation failed. Ref: https://www.terraform.io/language/resources/syntax#operation-timeouts | `string` | `"5m"` | no |
| <a name="input_route_tables"></a> [route_tables](#input_route_tables) | List of route tables to add routes to. | `list(string)` | n/a | yes |
| <a name="input_route_update_timeout"></a> [route_update_timeout](#input_route_update_timeout) | The timeout for the update of the Route Tables. It defines how long to wait for a route table to be updated before considering the operation failed. Ref: https://www.terraform.io/language/resources/syntax#operation-timeouts | `string` | `"2m"` | no |
| <a name="input_tags"></a> [tags](#input_tags) | A map of tags to assign to created resources. | `map(string)` | `{}` | no |
| <a name="input_vpc_peering_connection_id"></a> [vpc_peering_connection_id](#input_vpc_peering_connection_id) | The VPC Peering Connection ID to manage. | `string` | n/a | yes |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_vpc_peering_accept_status"></a> [vpc_peering_accept_status](#output_vpc_peering_accept_status) | The status of the VPC Peering Connection request. |
| <a name="output_vpc_peering_connection_id"></a> [vpc_peering_connection_id](#output_vpc_peering_connection_id) | Peering connection ID. |

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-PEERING-CROSS-ACCOUNTS-ACCEPTER MODULE
# ------------------------------------------------------------------------------------------------------

module "vpc_peering_cross_accounts_accepter" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-peering-cross-accounts-accepter?ref=v0.28.7"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The VPC CIDR of the requester VPC.
  requester_vpc_cidr = <string>

  # List of route tables to add routes to.
  route_tables = <list(string)>

  # The VPC Peering Connection ID to manage.
  vpc_peering_connection_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Allow a local VPC to resolve public DNS hostnames to private IP addresses
  # when queried from instances in the peer VPC.
  dns_resolution = false

  # The timeout for the creation of the Route Tables. It defines how long to
  # wait for a route table to be created before considering the operation
  # failed. Ref:
  # https://www.terraform.io/language/resources/syntax#operation-timeouts
  route_creation_timeout = "5m"

  # The timeout for the deletion of the Route Tables. It defines how long to
  # wait for a route table to be deleted before considering the operation
  # failed. Ref:
  # https://www.terraform.io/language/resources/syntax#operation-timeouts
  route_deletion_timeout = "5m"

  # The timeout for the update of the Route Tables. It defines how long to wait
  # for a route table to be updated before considering the operation failed.
  # Ref: https://www.terraform.io/language/resources/syntax#operation-timeouts
  route_update_timeout = "2m"

  # A map of tags to assign to created resources.
  tags = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-PEERING-CROSS-ACCOUNTS-ACCEPTER MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-peering-cross-accounts-accepter?ref=v0.28.7"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The VPC CIDR of the requester VPC.
  requester_vpc_cidr = <string>

  # List of route tables to add routes to.
  route_tables = <list(string)>

  # The VPC Peering Connection ID to manage.
  vpc_peering_connection_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Allow a local VPC to resolve public DNS hostnames to private IP addresses
  # when queried from instances in the peer VPC.
  dns_resolution = false

  # The timeout for the creation of the Route Tables. It defines how long to
  # wait for a route table to be created before considering the operation
  # failed. Ref:
  # https://www.terraform.io/language/resources/syntax#operation-timeouts
  route_creation_timeout = "5m"

  # The timeout for the deletion of the Route Tables. It defines how long to
  # wait for a route table to be deleted before considering the operation
  # failed. Ref:
  # https://www.terraform.io/language/resources/syntax#operation-timeouts
  route_deletion_timeout = "5m"

  # The timeout for the update of the Route Tables. It defines how long to wait
  # for a route table to be updated before considering the operation failed.
  # Ref: https://www.terraform.io/language/resources/syntax#operation-timeouts
  route_update_timeout = "2m"

  # A map of tags to assign to created resources.
  tags = {}

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="requester_vpc_cidr" requirement="required" type="string">
<HclListItemDescription>

The VPC CIDR of the requester VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="route_tables" requirement="required" type="list(string)">
<HclListItemDescription>

List of route tables to add routes to.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_peering_connection_id" requirement="required" type="string">
<HclListItemDescription>

The VPC Peering Connection ID to manage.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="dns_resolution" requirement="optional" type="bool">
<HclListItemDescription>

Allow a local VPC to resolve public DNS hostnames to private IP addresses when queried from instances in the peer VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="route_creation_timeout" requirement="optional" type="string">
<HclListItemDescription>

The timeout for the creation of the Route Tables. It defines how long to wait for a route table to be created before considering the operation failed. Ref: https://www.terraform.io/language/resources/syntax#operation-timeouts

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;5m&quot;"/>
</HclListItem>

<HclListItem name="route_deletion_timeout" requirement="optional" type="string">
<HclListItemDescription>

The timeout for the deletion of the Route Tables. It defines how long to wait for a route table to be deleted before considering the operation failed. Ref: https://www.terraform.io/language/resources/syntax#operation-timeouts

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;5m&quot;"/>
</HclListItem>

<HclListItem name="route_update_timeout" requirement="optional" type="string">
<HclListItemDescription>

The timeout for the update of the Route Tables. It defines how long to wait for a route table to be updated before considering the operation failed. Ref: https://www.terraform.io/language/resources/syntax#operation-timeouts

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;2m&quot;"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to assign to created resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="vpc_peering_accept_status">
<HclListItemDescription>

The status of the VPC Peering Connection request.

</HclListItemDescription>
</HclListItem>

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
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.7/modules/vpc-peering-cross-accounts-accepter/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.7/modules/vpc-peering-cross-accounts-accepter/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.7/modules/vpc-peering-cross-accounts-accepter/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "4341c00a011ec6f2ba30568ce3d42330"
}
##DOCS-SOURCER-END -->
