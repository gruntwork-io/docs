---
title: "VPC DNS Forwarder Terraform Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="VPC Modules" version="0.28.10" lastModifiedVersion="0.28.9"/>

# VPC DNS Forwarder Terraform Module

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/vpc-dns-forwarder" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.28.9" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module creates [Route 53
Resolvers](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-getting-started.html) between VPCs so that
DNS queries for specific domains in a VPC can be forwarded to another VPC over a peered network. This is useful when you
would like to resolve Route 53 private hosted zones, which are typically not available over a peered network.

For example, EKS supports private API endpoints, which restricts access to the Kubernetes API to be within the VPC.
However, the hostname for the internal endpoint is only resolvable from within the housing VPC because they are defined
by a private hosted zone under the hood. This breaks our model of having a management VPC that acts as the entrypoint
into the network. EKS clusters will typically be launched into the application VPC, which means the private endpoints
are only addressable in the application VPC. However, operators need access to the endpoint to manage the cluster, but
they only have access to VPN into the management VPC, which has a peering connection to the application VPC. To allow
operators to properly resolve the hostname, they will need to be able to resolve it from within the management VPC. This
can be done by creating a Route 53 Resolver that forwards DNS queries for the EKS endpoint originating in the management
VPC to the application VPC's DNS resolver.

**NOTE**: In order for Route 53 Resolvers to work, the peering connection must allow remote VPC DNS resolution on both
accepter and requester side of the connection peering.

## What is a Route 53 Resolver?

A Route 53 Resolver is a DNS server that answers DNS queries for VPC domain names that are internal to the VPC, such as
VPC endpoints and private hosted zones. Normally such DNS queries are limited to those originating from the housing VPC,
and therefore are not typically resolved for peering VPCs. Route 53 Resolvers allow you to link the DNS resolvers
between multiple VPCs by forwarding specific domain DNS requests to other VPCs' DNS resolvers so that you can resolve
private endpoints internal to the target VPC.

## How do you specify the hostnames that use the forwarder?

By default, no DNS query will be routed through the Route 53 Resolvers created by this module. You need to create
forwarding rules that specify which specific domains should be resolved through the Route 53 Resolvers created by this
module. You can use the [vpc-dns-forwarder-rules module](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/vpc-dns-forwarder-rules) to construct the forwarding rules.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-DNS-FORWARDER MODULE
# ------------------------------------------------------------------------------------------------------

module "vpc_dns_forwarder" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-dns-forwarder?ref=v0.28.10"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the VPC which is the destination of the DNS resolver queries.
  destination_vpc_id = <string>

  # The name of the VPC which is the origin of the DNS resolver queries.
  destination_vpc_name = <string>

  # The ID of the subnet to use for allocating the primary IP address of the DNS
  # resolver in the destination VPC. This is the IP address that can be used as
  # a DNS server endpoint for resolving hostnames in the destination VPC.
  destination_vpc_route53_resolver_primary_subnet_id = <string>

  # The ID of the subnet to use for allocating the secondary IP address of the
  # DNS resolver in the destination VPC. This is the IP address that can be used
  # as a DNS server endpoint for resolving hostnames in the destination VPC.
  destination_vpc_route53_resolver_secondary_subnet_id = <string>

  # The ID of the VPC which is the origin of the DNS resolver queries.
  origin_vpc_id = <string>

  # The name of the VPC which is the origin of the DNS resolver queries.
  origin_vpc_name = <string>

  # The ID of the subnet to use for allocating the primary IP address of the DNS
  # resolver in the origin VPC. This is the IP that the destination VPC resolver
  # will see.
  origin_vpc_route53_resolver_primary_subnet_id = <string>

  # The ID of the subnet to use for allocating the secondary IP address of the
  # DNS resolver in the origin VPC.
  origin_vpc_route53_resolver_secondary_subnet_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Set to false to have this module create no resources. This weird parameter
  # exists solely because Terraform does not support conditional modules.
  # Therefore, this is a hack to allow you to conditionally decide if the Route
  # 53 Resolvers should be created or not.
  create_resources = true

  # A map of custom tags to apply to any resources created which accept them.
  # The key is the tag name and the value is the tag value.
  custom_tags = {}

  # Name to set for the destination VPC resolver (inbound from origin VPC to
  # destination VPC). If null (default), defaults to
  # 'DESTINATION_VPC_NAME-from-ORIGIN_VPC_NAME-in'.
  destination_vpc_resolver_name = null

  # Name to set for the origin VPC resolver (outbound from origin VPC to
  # destination VPC). If null (default), defaults to
  # 'ORIGIN_VPC_NAME-to-DESTINATION_VPC_NAME-out'.
  origin_vpc_resolver_name = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-DNS-FORWARDER MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-dns-forwarder?ref=v0.28.10"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the VPC which is the destination of the DNS resolver queries.
  destination_vpc_id = <string>

  # The name of the VPC which is the origin of the DNS resolver queries.
  destination_vpc_name = <string>

  # The ID of the subnet to use for allocating the primary IP address of the DNS
  # resolver in the destination VPC. This is the IP address that can be used as
  # a DNS server endpoint for resolving hostnames in the destination VPC.
  destination_vpc_route53_resolver_primary_subnet_id = <string>

  # The ID of the subnet to use for allocating the secondary IP address of the
  # DNS resolver in the destination VPC. This is the IP address that can be used
  # as a DNS server endpoint for resolving hostnames in the destination VPC.
  destination_vpc_route53_resolver_secondary_subnet_id = <string>

  # The ID of the VPC which is the origin of the DNS resolver queries.
  origin_vpc_id = <string>

  # The name of the VPC which is the origin of the DNS resolver queries.
  origin_vpc_name = <string>

  # The ID of the subnet to use for allocating the primary IP address of the DNS
  # resolver in the origin VPC. This is the IP that the destination VPC resolver
  # will see.
  origin_vpc_route53_resolver_primary_subnet_id = <string>

  # The ID of the subnet to use for allocating the secondary IP address of the
  # DNS resolver in the origin VPC.
  origin_vpc_route53_resolver_secondary_subnet_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Set to false to have this module create no resources. This weird parameter
  # exists solely because Terraform does not support conditional modules.
  # Therefore, this is a hack to allow you to conditionally decide if the Route
  # 53 Resolvers should be created or not.
  create_resources = true

  # A map of custom tags to apply to any resources created which accept them.
  # The key is the tag name and the value is the tag value.
  custom_tags = {}

  # Name to set for the destination VPC resolver (inbound from origin VPC to
  # destination VPC). If null (default), defaults to
  # 'DESTINATION_VPC_NAME-from-ORIGIN_VPC_NAME-in'.
  destination_vpc_resolver_name = null

  # Name to set for the origin VPC resolver (outbound from origin VPC to
  # destination VPC). If null (default), defaults to
  # 'ORIGIN_VPC_NAME-to-DESTINATION_VPC_NAME-out'.
  origin_vpc_resolver_name = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="destination_vpc_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the VPC which is the destination of the DNS resolver queries.

</HclListItemDescription>
</HclListItem>

<HclListItem name="destination_vpc_name" requirement="required" type="string">
<HclListItemDescription>

The name of the VPC which is the origin of the DNS resolver queries.

</HclListItemDescription>
</HclListItem>

<HclListItem name="destination_vpc_route53_resolver_primary_subnet_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the subnet to use for allocating the primary IP address of the DNS resolver in the destination VPC. This is the IP address that can be used as a DNS server endpoint for resolving hostnames in the destination VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="destination_vpc_route53_resolver_secondary_subnet_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the subnet to use for allocating the secondary IP address of the DNS resolver in the destination VPC. This is the IP address that can be used as a DNS server endpoint for resolving hostnames in the destination VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="origin_vpc_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the VPC which is the origin of the DNS resolver queries.

</HclListItemDescription>
</HclListItem>

<HclListItem name="origin_vpc_name" requirement="required" type="string">
<HclListItemDescription>

The name of the VPC which is the origin of the DNS resolver queries.

</HclListItemDescription>
</HclListItem>

<HclListItem name="origin_vpc_route53_resolver_primary_subnet_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the subnet to use for allocating the primary IP address of the DNS resolver in the origin VPC. This is the IP that the destination VPC resolver will see.

</HclListItemDescription>
</HclListItem>

<HclListItem name="origin_vpc_route53_resolver_secondary_subnet_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the subnet to use for allocating the secondary IP address of the DNS resolver in the origin VPC.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to have this module create no resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if the Route 53 Resolvers should be created or not.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to any resources created which accept them. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="destination_vpc_resolver_name" requirement="optional" type="string">
<HclListItemDescription>

Name to set for the destination VPC resolver (inbound from origin VPC to destination VPC). If null (default), defaults to 'DESTINATION_VPC_NAME-from-ORIGIN_VPC_NAME-in'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="origin_vpc_resolver_name" requirement="optional" type="string">
<HclListItemDescription>

Name to set for the origin VPC resolver (outbound from origin VPC to destination VPC). If null (default), defaults to 'ORIGIN_VPC_NAME-to-DESTINATION_VPC_NAME-out'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="destination_vpc_route53_resolver_endpoint_id">
<HclListItemDescription>

The ID of the inbound Route 53 Resolver endpoint in the destination VPC

</HclListItemDescription>
</HclListItem>

<HclListItem name="destination_vpc_route53_resolver_primary_ip">
<HclListItemDescription>

The primary IP address of the DNS resolver in the destination VPC. This is the IP address that can be used as a DNS server endpoint for resolving hostnames in the destination VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="destination_vpc_route53_resolver_secondary_ip">
<HclListItemDescription>

The secondary IP address of the DNS resolver in the destination VPC. This is the IP address that can be used as a DNS server endpoint for resolving hostnames in the destination VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="origin_vpc_route53_resolver_endpoint_id">
<HclListItemDescription>

The ID of the outbound Route 53 Resolver endpoint in the origin VPC

</HclListItemDescription>
</HclListItem>

<HclListItem name="origin_vpc_route53_resolver_primary_ip">
<HclListItemDescription>

The primary IP address of the Route 53 Resolver in the origin VPC. This is the IP that the destination VPC resolver will see.

</HclListItemDescription>
</HclListItem>

<HclListItem name="origin_vpc_route53_resolver_secondary_ip">
<HclListItemDescription>

The secondary IP address of the DNS resolver in the origin VPC. This is the IP that the destination VPC resolver will see.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/vpc-dns-forwarder/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/vpc-dns-forwarder/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/vpc-dns-forwarder/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "73c6d106ee373a6d540d3397b1af65db"
}
##DOCS-SOURCER-END -->
