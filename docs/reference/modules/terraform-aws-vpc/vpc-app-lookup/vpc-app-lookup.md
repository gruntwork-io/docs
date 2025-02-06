---
title: "VPC-App Lookup Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="VPC Modules" version="0.28.2" lastModifiedVersion="0.26.21"/>

# VPC-App Lookup Module

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.2/modules/vpc-app-lookup" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.26.21" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This folder contains a Terraform module which can use data sources to fetch all the data about a VPC created by the
[`vpc-app` module](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.2/modules/vpc-app), including the VPC ID, subnet IDs, route table IDs, NAT Gateway IDs, and so on.
Normally, you can look up this data using either a `dependency` block in Terragrunt or a `terraform_remote_state` data
source in Terraform, but in some cases, the team that needs the VPC data does not have access to the code or Terraform
state for the VPC module, perhaps because networking is managed by a separate team, maybe in a separate repo.
Therefore, this `vpc-app-lookup` module allows you to fetch all the info you need without having to have access to the
code or Terraform state.

This module attempts to match the output variables API of `vpc-app` exactly.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-APP-LOOKUP MODULE
# ------------------------------------------------------------------------------------------------------

module "vpc_app_lookup" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-app-lookup?ref=v0.28.2"

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The CIDR block of the VPC you're looking for
  cidr_block = null

  # Whether the VPC you're looking for is the Default VPC or not
  default = null

  # The DHCP Options ID fo the VPC you're looking for
  dhcp_options_id = null

  # Additional filters to use to find the VPC. The key is a unique name for the
  # filter (for use with for_each). The value is an object where the names and
  # values are those of supported filters from the underlying API:
  # https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeVpcs.html.
  filters = null

  # The ID of the VPC you're looking for
  id = null

  # If you enabled the default route table and wish to look it up, set this to
  # true.
  lookup_default_route_table = false

  # If you enabled the default security group and wish to look it up, set this
  # to true.
  lookup_default_security_group = false

  # If you enabled the Internet Gateway and wish to look it up, set this to
  # true.
  lookup_internet_gateway = false

  # If you enabled the VPC endpoints and wish to look them up, set this to true.
  lookup_vpc_endpoints = false

  # The name of the private persistence subnet tier. This is used to identify
  # the subnet and its resources.
  private_persistence_subnet_name = "private-persistence"

  # The name of the private subnet tier. This is used to identify the subnet and
  # its resources.
  private_subnet_name = "private-app"

  # The name of the public subnet tier. This is used to identify the subnet and
  # its resources.
  public_subnet_name = "public"

  # The state of the VPC you're looking for. Can either be 'pending' or
  # 'available'.
  state = null

  # The tags of the VPC you're looking for. Only VPCs that have the exact
  # key/value pairs you specify will be matched.
  tags = null

  # The name of the transit subnet tier. This is used to identify the subnet and
  # its resources.
  transit_subnet_name = "transit"

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-APP-LOOKUP MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-app-lookup?ref=v0.28.2"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The CIDR block of the VPC you're looking for
  cidr_block = null

  # Whether the VPC you're looking for is the Default VPC or not
  default = null

  # The DHCP Options ID fo the VPC you're looking for
  dhcp_options_id = null

  # Additional filters to use to find the VPC. The key is a unique name for the
  # filter (for use with for_each). The value is an object where the names and
  # values are those of supported filters from the underlying API:
  # https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeVpcs.html.
  filters = null

  # The ID of the VPC you're looking for
  id = null

  # If you enabled the default route table and wish to look it up, set this to
  # true.
  lookup_default_route_table = false

  # If you enabled the default security group and wish to look it up, set this
  # to true.
  lookup_default_security_group = false

  # If you enabled the Internet Gateway and wish to look it up, set this to
  # true.
  lookup_internet_gateway = false

  # If you enabled the VPC endpoints and wish to look them up, set this to true.
  lookup_vpc_endpoints = false

  # The name of the private persistence subnet tier. This is used to identify
  # the subnet and its resources.
  private_persistence_subnet_name = "private-persistence"

  # The name of the private subnet tier. This is used to identify the subnet and
  # its resources.
  private_subnet_name = "private-app"

  # The name of the public subnet tier. This is used to identify the subnet and
  # its resources.
  public_subnet_name = "public"

  # The state of the VPC you're looking for. Can either be 'pending' or
  # 'available'.
  state = null

  # The tags of the VPC you're looking for. Only VPCs that have the exact
  # key/value pairs you specify will be matched.
  tags = null

  # The name of the transit subnet tier. This is used to identify the subnet and
  # its resources.
  transit_subnet_name = "transit"

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Optional

<HclListItem name="cidr_block" requirement="optional" type="string">
<HclListItemDescription>

The CIDR block of the VPC you're looking for

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="default" requirement="optional" type="bool">
<HclListItemDescription>

Whether the VPC you're looking for is the Default VPC or not

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="dhcp_options_id" requirement="optional" type="string">
<HclListItemDescription>

The DHCP Options ID fo the VPC you're looking for

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="filters" requirement="optional" type="map(object(…))">
<HclListItemDescription>

Additional filters to use to find the VPC. The key is a unique name for the filter (for use with for_each). The value is an object where the names and values are those of supported filters from the underlying API: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeVpcs.html.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    name   = string
    values = list(string)
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the VPC you're looking for

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="lookup_default_route_table" requirement="optional" type="bool">
<HclListItemDescription>

If you enabled the default route table and wish to look it up, set this to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="lookup_default_security_group" requirement="optional" type="bool">
<HclListItemDescription>

If you enabled the default security group and wish to look it up, set this to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="lookup_internet_gateway" requirement="optional" type="bool">
<HclListItemDescription>

If you enabled the Internet Gateway and wish to look it up, set this to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="lookup_vpc_endpoints" requirement="optional" type="bool">
<HclListItemDescription>

If you enabled the VPC endpoints and wish to look them up, set this to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="private_persistence_subnet_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the private persistence subnet tier. This is used to identify the subnet and its resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;private-persistence&quot;"/>
</HclListItem>

<HclListItem name="private_subnet_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the private subnet tier. This is used to identify the subnet and its resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;private-app&quot;"/>
</HclListItem>

<HclListItem name="public_subnet_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the public subnet tier. This is used to identify the subnet and its resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;public&quot;"/>
</HclListItem>

<HclListItem name="state" requirement="optional" type="string">
<HclListItemDescription>

The state of the VPC you're looking for. Can either be 'pending' or 'available'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

The tags of the VPC you're looking for. Only VPCs that have the exact key/value pairs you specify will be matched.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="transit_subnet_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the transit subnet tier. This is used to identify the subnet and its resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;transit&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="availability_zones">
</HclListItem>

<HclListItem name="default_route_table_id">
</HclListItem>

<HclListItem name="default_security_group_id">
<HclListItemDescription>

The ID of the default security group of this VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="dynamodb_vpc_endpoint_id">
</HclListItem>

<HclListItem name="internet_gateway_id">
</HclListItem>

<HclListItem name="ipv6_cidr_block">
<HclListItemDescription>

The IPv6 CIDR block associated with the VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="nat_gateway_ids">
</HclListItem>

<HclListItem name="nat_gateway_public_ips">
</HclListItem>

<HclListItem name="num_availability_zones">
</HclListItem>

<HclListItem name="private_app_subnet_arns">
<HclListItemDescription>

A list of ARNs of the private app subnets in the VPC

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_app_subnet_cidr_blocks">
<HclListItemDescription>

The private IP address range of the VPC in CIDR notation.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_app_subnet_ids">
<HclListItemDescription>

A list of IDs of the private app subnets in the VPC

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_app_subnet_route_table_ids">
<HclListItemDescription>

A list of IDs of the private app subnet routing table.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_app_subnets">
<HclListItemDescription>

A map of all private-app subnets, with the subnet ID as key, and all `aws-subnet` properties as the value.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_nat_gateway_ids">
</HclListItem>

<HclListItem name="private_persistence_route_table_ids">
<HclListItemDescription>

A list of IDs of the private persistence subnet routing table.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_persistence_subnet_arn">
<HclListItemDescription>

DEPRECATED. Use `private_persistence_subnet_arns` instead.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_persistence_subnet_arns">
<HclListItemDescription>

The ARNs of the private persistence tier subnets of the VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_persistence_subnet_cidr_blocks">
<HclListItemDescription>

The private IP address range of the VPC Persistence tier in CIDR notation.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_persistence_subnet_ids">
<HclListItemDescription>

The IDs of the private persistence tier subnets of the VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_persistence_subnet_route_table_ids">
<HclListItemDescription>

A list of IDs of the private persistence subnet routing table.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_persistence_subnets">
<HclListItemDescription>

A map of all private-persistence subnets, with the subnet ID as key, and all `aws-subnet` properties as the value.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_subnet_route_table_ids">
<HclListItemDescription>

A list of IDs of the private app subnet routing table.

</HclListItemDescription>
</HclListItem>

<HclListItem name="public_subnet_arns">
<HclListItemDescription>

A list of ARNs of the public subnets of the VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="public_subnet_cidr_blocks">
<HclListItemDescription>

The public IP address range of the VPC in CIDR notation.

</HclListItemDescription>
</HclListItem>

<HclListItem name="public_subnet_ids">
<HclListItemDescription>

A list of IDs of the public subnets of the VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="public_subnet_ipv6_cidr_blocks">
</HclListItem>

<HclListItem name="public_subnet_route_table_id">
<HclListItemDescription>

The ID of the public routing table.

</HclListItemDescription>
</HclListItem>

<HclListItem name="public_subnet_route_table_ids">
<HclListItemDescription>

A list of IDs of the public routing tables.

</HclListItemDescription>
</HclListItem>

<HclListItem name="public_subnets">
<HclListItemDescription>

A map of all public subnets, with the subnet ID as key, and all `aws-subnet` properties as the value.

</HclListItemDescription>
</HclListItem>

<HclListItem name="s3_vpc_endpoint_id">
</HclListItem>

<HclListItem name="transit_subnet_arns">
<HclListItemDescription>

The ARNs of the transit tier subnets of the VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="transit_subnet_cidr_blocks">
<HclListItemDescription>

The private IP address range of the VPC transit tier in CIDR notation.

</HclListItemDescription>
</HclListItem>

<HclListItem name="transit_subnet_ids">
<HclListItemDescription>

The IDs of the transit tier subnets of the VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="transit_subnet_route_table_ids">
<HclListItemDescription>

A list of IDs of the transit subnet routing table.

</HclListItemDescription>
</HclListItem>

<HclListItem name="transit_subnets">
<HclListItemDescription>

A map of all transit subnets, with the subnet ID as key, and all `aws-subnet` properties as the value.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_cidr_block">
<HclListItemDescription>

The IP address range of the VPC in CIDR notation.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id">
<HclListItemDescription>

The ID of the VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_name">
<HclListItemDescription>

The name configured for VPC.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.2/modules/vpc-app-lookup/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.2/modules/vpc-app-lookup/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.2/modules/vpc-app-lookup/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "6e9263aa06d0acee2650345769071cbe"
}
##DOCS-SOURCER-END -->
