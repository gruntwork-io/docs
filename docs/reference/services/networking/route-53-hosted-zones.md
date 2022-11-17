---
type: "service"
name: "Route 53 Hosted Zones"
description: "Manage DNS entries using https"
category: "networking"
cloud: "aws"
tags: ["route53","dns","networking"]
license: "gruntwork"
built-with: "terraform"
title: "Route 53 Hosted Zones"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.97.0" lastModifiedVersion="0.96.1"/>

# Route 53 Hosted Zones


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.97.0/modules/networking/route53" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=networking%2Froute53" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

## Overview

This service contains code to deploy [Route 53 Hosted Zones](https://aws.amazon.com/route53/) and
[AWS Cloud Map Namespaces](https://aws.amazon.com/cloud-map/) on AWS.

![Route 53 architecture](/img/reference/services/networking/route53-architecture.png)

## Features

*   Manage DNS entries using AWS Route 53 or AWS Cloud Map
*   Optionally order and automatically verify ACM wildcard certificates for public zones
*   Automatic health checks to route traffic only to healthy endpoints
*   Automatic integration with other AWS services, such as ELBs

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

*   [Should you use AWS Route 53 or CloudMap for your DNS entries?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.97.0/modules/networking/route53/core-concepts.md#should-i-use-route53-or-cloud-map)
*   [AWS Cloud Map Documentation](https://docs.aws.amazon.com/cloud-map/latest/dg/what-is-cloud-map.html): Amazon’s docs
    for AWS Cloud Map that cover core concepts and configuration.
*   [Route 53 Documentation](https://docs.aws.amazon.com/route53/): Amazon’s docs for Route 53 that cover core concepts
    and configuration.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.97.0/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.97.0/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Optional

<HclListItem name="private_zones" requirement="optional" type="map(object(…))">
<HclListItemDescription>

A map of private Route 53 Hosted Zones. In this map, the key should be the domain name. See examples below.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    # An optional, arbitrary comment to attach to the private Hosted Zone
    comment = string
    # The list of VPCs to associate with the private Hosted Zone. You must provide at least one VPC in this list.
    vpcs = list(object({
      # The ID of the VPC.
      id = string
      # The region of the VPC. If null, defaults to the region configured on the provider.
      region = string
    }))
    # A mapping of tags to assign to the private Hosted Zone
    tags = map(string)
    # Whether to destroy all records (possibly managed ouside of Terraform) in the zone when destroying the zone
    force_destroy = bool
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="public_zones" requirement="optional" type="any">
<HclListItemDescription>

A map of public Route 53 Hosted Zones. In this map, the key should be the domain name. See examples below.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="service_discovery_private_namespaces" requirement="optional" type="map(object(…))">
<HclListItemDescription>

A map of domain names to configurations for setting up a new private namespace in AWS Cloud Map.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    # The ID of the VPC where the private hosted zone is restricted to.
    vpc_id = string

    # A user friendly description for the namespace
    description = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="service_discovery_public_namespaces" requirement="optional" type="any">
<HclListItemDescription>

A map of domain names to configurations for setting up a new public namespace in AWS Cloud Map. Note that the domain name must be registered with Route 53.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="acm_tls_certificates">
<HclListItemDescription>

A list of ARNs of the wildcard and service discovery certificates that were provisioned along with the Route 53 zone.

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_domain_names">
<HclListItemDescription>

The names of the internal-only Route 53 Hosted Zones

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_zones_ids">
<HclListItemDescription>

The IDs of the internal-only Route 53 Hosted Zones

</HclListItemDescription>
</HclListItem>

<HclListItem name="private_zones_name_servers">
<HclListItemDescription>

The name servers associated with the internal-only Route 53 Hosted Zones

</HclListItemDescription>
</HclListItem>

<HclListItem name="public_domain_names">
<HclListItemDescription>

The names of the public Route 53 Hosted Zones

</HclListItemDescription>
</HclListItem>

<HclListItem name="public_hosted_zone_map">
<HclListItemDescription>

A map of domains to their zone IDs. IDs are user inputs, when supplied, and otherwise resource IDs

</HclListItemDescription>
</HclListItem>

<HclListItem name="public_hosted_zones_ids">
<HclListItemDescription>

The IDs of the public Route 53 Hosted Zones

</HclListItemDescription>
</HclListItem>

<HclListItem name="public_hosted_zones_name_servers">
<HclListItemDescription>

The name servers associated with the public Route 53 Hosted Zones

</HclListItemDescription>
</HclListItem>

<HclListItem name="service_discovery_private_namespaces">
<HclListItemDescription>

A map of domains to resource arns and hosted zones of the created Service Discovery Private Namespaces.

</HclListItemDescription>
</HclListItem>

<HclListItem name="service_discovery_public_namespaces">
<HclListItemDescription>

A map of domains to resource arns and hosted zones of the created Service Discovery Public Namespaces.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.97.0/modules%2Fnetworking%2Froute53%2FREADME.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.97.0/modules%2Fnetworking%2Froute53%2Fvariables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.97.0/modules%2Fnetworking%2Froute53%2Foutputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "c2b9d88b8f03e4755806eac08346cd20"
}
##DOCS-SOURCER-END -->
