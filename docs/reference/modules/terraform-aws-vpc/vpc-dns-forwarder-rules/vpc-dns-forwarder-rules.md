---
title: "VPC DNS Forwarder Rules Terraform Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem} from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/main/modules%2Fvpc-dns-forwarder-rules" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# VPC DNS Forwarder Rules Terraform Module

This Terraform Module creates [Route 53 Resolver Forwarding
Rules](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-rules-managing.html) for a VPC that will
utilize Route 53 Resolver Endpoints created with the [vpc-dns-forwarder module](https://github.com/gruntwork-io/terraform-aws-vpc/tree/vpc-dns-forwarder). These forwarding
rules, combined with Route 53 Resolvers, allow DNS queries for specific domains to be resolved by peered VPCs.

## How do you specify the hostnames that use the forwarder?

By default, no DNS query will be routed through the Route 53 Resolvers created by the [vpc-dns-forwarder
module](https://github.com/gruntwork-io/terraform-aws-vpc/tree/vpc-dns-forwarder). You need to create forwarding rules that specify which specific domains should be
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


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "cd47cd5d40b3406cf4e8c9021a03db32"
}
##DOCS-SOURCER-END -->
