---
title: "VPC DNS Forwarder Rules Terraform Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="VPC Modules" version="0.28.4" lastModifiedVersion="0.27.0"/>

# VPC DNS Forwarder Rules Terraform Module

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.4/modules/vpc-dns-forwarder-rules" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.27.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module creates [Route 53 Resolver Forwarding
Rules](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-rules-managing.html) for a VPC that will
utilize Route 53 Resolver Endpoints created with the [vpc-dns-forwarder module](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.4/modules/vpc-dns-forwarder). These forwarding
rules, combined with Route 53 Resolvers, allow DNS queries for specific domains to be resolved by peered VPCs.

## How do you specify the hostnames that use the forwarder?

By default, no DNS query will be routed through the Route 53 Resolvers created by the [vpc-dns-forwarder
module](https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.4/modules/vpc-dns-forwarder). You need to create forwarding rules that specify which specific domains should be
resolved through the Route 53 Resolvers so that they are resolved over the peering connection. You can use this module
to construct the forwarding rules.

For example, suppose you had a Route 53 private hosted zone whose domain (we will assume this is `test.local`) is only
available in the peered VPC. The following module calls will construct the forwarder rules so that DNS queries
for the domain in the peering VPC will be routed through the resolvers to be resolved in the peered VPC:

```hcl
module "dns_mgmt_to_app" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-dns-forwarder?ref=v0.5.7"

  # Arguments omitted for brevity
}

module "dns_forwarder_rule" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-dns-forwarder-rules?ref=v0.5.7"

  vpc_id                                        = "${module.mgmt_vpc.vpc_id}"
  origin_vpc_route53_resolver_endpoint_id       = "${module.dns_mgmt_to_app.origin_vpc_route53_resolver_endpoint_id}"
  destination_vpc_route53_resolver_primary_ip   = "${module.dns_mgmt_to_app.destination_vpc_route53_resolver_primary_ip}"
  destination_vpc_route53_resolver_secondary_ip = "${module.dns_mgmt_to_app.destination_vpc_route53_resolver_secondary_ip}"

  num_endpoints_to_resolve = 1
  endpoints_to_resolve     = ["test.local"]
}
```

This will create a forwarding rule such that any DNS query for `test.local` originating in the `mgmt_vpc` will be routed
through the created resolvers and resolved in the `app_vpc`.

**NOTE**: The forwarder endpoints use a domain suffix based match. For example, if you specify the endpoint `local` in the
forwarder rule, it will match any domain that ends with `.local` (note the dot), but does not match a domain like `test.alblocal`.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-DNS-FORWARDER-RULES MODULE
# ------------------------------------------------------------------------------------------------------

module "vpc_dns_forwarder_rules" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-dns-forwarder-rules?ref=v0.28.4"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The primary ip address of the inbound Route 53 Resolver that should be used
  # to resolve the endpoints.
  destination_vpc_route53_resolver_primary_ip = <string>

  # The secondary ip address of the inbound Route 53 Resolver that should be
  # used to resolve the endpoints.
  destination_vpc_route53_resolver_secondary_ip = <string>

  # The endpoints that should be resolved by forwarding to the destination VPC
  # DNS resolver. Only these endpoints will be forwarded, while the rest will be
  # resolved as normal.
  endpoints_to_resolve = <list(string)>

  # The number of endpoints in var.endpoints_to_resolve. This should be
  # computable, but due to a Terraform limitation, we can't:
  # https://github.com/hashicorp/terraform/issues/14677#issuecomment-302772685
  num_endpoints_to_resolve = <number>

  # The ID of the outbound Route 53 Resolver that resides in the VPC where the
  # queries originate from.
  origin_vpc_route53_resolver_endpoint_id = <string>

  # The ID of the VPC which is the origin of the DNS resolver queries.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A map of custom tags to apply to any resources created which accept them.
  # The key is the tag name and the value is the tag value.
  custom_tags = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-DNS-FORWARDER-RULES MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-dns-forwarder-rules?ref=v0.28.4"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The primary ip address of the inbound Route 53 Resolver that should be used
  # to resolve the endpoints.
  destination_vpc_route53_resolver_primary_ip = <string>

  # The secondary ip address of the inbound Route 53 Resolver that should be
  # used to resolve the endpoints.
  destination_vpc_route53_resolver_secondary_ip = <string>

  # The endpoints that should be resolved by forwarding to the destination VPC
  # DNS resolver. Only these endpoints will be forwarded, while the rest will be
  # resolved as normal.
  endpoints_to_resolve = <list(string)>

  # The number of endpoints in var.endpoints_to_resolve. This should be
  # computable, but due to a Terraform limitation, we can't:
  # https://github.com/hashicorp/terraform/issues/14677#issuecomment-302772685
  num_endpoints_to_resolve = <number>

  # The ID of the outbound Route 53 Resolver that resides in the VPC where the
  # queries originate from.
  origin_vpc_route53_resolver_endpoint_id = <string>

  # The ID of the VPC which is the origin of the DNS resolver queries.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A map of custom tags to apply to any resources created which accept them.
  # The key is the tag name and the value is the tag value.
  custom_tags = {}

}


```

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.4/modules/vpc-dns-forwarder-rules/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.4/modules/vpc-dns-forwarder-rules/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.4/modules/vpc-dns-forwarder-rules/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "2b41f750343aca2b41df06284dc12f2a"
}
##DOCS-SOURCER-END -->
