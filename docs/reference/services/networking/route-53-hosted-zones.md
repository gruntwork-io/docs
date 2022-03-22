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

<VersionBadge version="0.85.0" lastModifiedVersion="0.83.0"/>

# Route 53 Hosted Zones


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/eak12913-patch-1/modules/networking/route53" className="link-button">View Source</a>

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

*   [Should you use AWS Route 53 or CloudMap for your DNS entries?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/eak12913-patch-1/modules/networking/route53/core-concepts.md#should-i-use-route53-or-cloud-map)
*   [AWS Cloud Map Documentation](https://docs.aws.amazon.com/cloud-map/latest/dg/what-is-cloud-map.html): Amazon’s docs
    for AWS Cloud Map that cover core concepts and configuration.
*   [Route 53 Documentation](https://docs.aws.amazon.com/route53/): Amazon’s docs for Route 53 that cover core concepts
    and configuration.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/eak12913-patch-1/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/eak12913-patch-1/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<a name="private_zones" className="snap-top"></a>

* [**`private_zones`**](#private_zones) &mdash; A map of private Route 53 Hosted Zones. In this map, the key should be the domain name. See examples below.

<a name="public_zones" className="snap-top"></a>

* [**`public_zones`**](#public_zones) &mdash; A map of public Route 53 Hosted Zones. In this map, the key should be the domain name. See examples below.

<a name="service_discovery_private_namespaces" className="snap-top"></a>

* [**`service_discovery_private_namespaces`**](#service_discovery_private_namespaces) &mdash; A map of domain names to configurations for setting up a new private namespace in AWS Cloud Map.

<a name="service_discovery_public_namespaces" className="snap-top"></a>

* [**`service_discovery_public_namespaces`**](#service_discovery_public_namespaces) &mdash; A map of domain names to configurations for setting up a new public namespace in AWS Cloud Map. Note that the domain name must be registered with Route 53.

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="acm_tls_certificates" className="snap-top"></a>

* [**`acm_tls_certificates`**](#acm_tls_certificates) &mdash; A list of ARNs of the wildcard and service discovery certificates that were provisioned along with the Route 53 zone.

<a name="private_domain_names" className="snap-top"></a>

* [**`private_domain_names`**](#private_domain_names) &mdash; The names of the internal-only Route 53 Hosted Zones

<a name="private_zones_ids" className="snap-top"></a>

* [**`private_zones_ids`**](#private_zones_ids) &mdash; The IDs of the internal-only Route 53 Hosted Zones

<a name="private_zones_name_servers" className="snap-top"></a>

* [**`private_zones_name_servers`**](#private_zones_name_servers) &mdash; The name servers associated with the internal-only Route 53 Hosted Zones

<a name="public_domain_names" className="snap-top"></a>

* [**`public_domain_names`**](#public_domain_names) &mdash; The names of the public Route 53 Hosted Zones

<a name="public_hosted_zone_map" className="snap-top"></a>

* [**`public_hosted_zone_map`**](#public_hosted_zone_map) &mdash; A map of domains to their zone IDs. IDs are user inputs, when supplied, and otherwise resource IDs

<a name="public_hosted_zones_ids" className="snap-top"></a>

* [**`public_hosted_zones_ids`**](#public_hosted_zones_ids) &mdash; The IDs of the public Route 53 Hosted Zones

<a name="public_hosted_zones_name_servers" className="snap-top"></a>

* [**`public_hosted_zones_name_servers`**](#public_hosted_zones_name_servers) &mdash; The name servers associated with the public Route 53 Hosted Zones

<a name="service_discovery_private_namespaces" className="snap-top"></a>

* [**`service_discovery_private_namespaces`**](#service_discovery_private_namespaces) &mdash; A map of domains to resource arns and hosted zones of the created Service Discovery Private Namespaces.

<a name="service_discovery_public_namespaces" className="snap-top"></a>

* [**`service_discovery_public_namespaces`**](#service_discovery_public_namespaces) &mdash; A map of domains to resource arns and hosted zones of the created Service Discovery Public Namespaces.

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"e82c93d3c7831a58ab34122a23578caa"}
##DOCS-SOURCER-END -->
