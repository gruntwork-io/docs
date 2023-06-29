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
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.104.14" lastModifiedVersion="0.102.5"/>

# Route 53 Hosted Zones

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/networking/route53" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=networking%2Froute53" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>

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

*   [Should you use AWS Route 53 or CloudMap for your DNS entries?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/networking/route53/core-concepts.md#should-i-use-route53-or-cloud-map)
*   [AWS Cloud Map Documentation](https://docs.aws.amazon.com/cloud-map/latest/dg/what-is-cloud-map.html): Amazon’s docs
    for AWS Cloud Map that cover core concepts and configuration.
*   [Route 53 Documentation](https://docs.aws.amazon.com/route53/): Amazon’s docs for Route 53 that cover core concepts
    and configuration.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.


## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ROUTE53 MODULE
# ------------------------------------------------------------------------------------------------------

module "route_53" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/route53?ref=v0.104.14"

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A map of private Route 53 Hosted Zones. In this map, the key should be the
  # domain name. See examples below.
  private_zones = {}

  # A map of public Route 53 Hosted Zones. In this map, the key should be the
  # domain name. See examples below.
  public_zones = {}

  # A map of domain names to configurations for setting up a new private
  # namespace in AWS Cloud Map.
  service_discovery_private_namespaces = {}

  # A map of domain names to configurations for setting up a new public
  # namespace in AWS Cloud Map. Note that the domain name must be registered
  # with Route 53.
  service_discovery_public_namespaces = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ROUTE53 MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/route53?ref=v0.104.14"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A map of private Route 53 Hosted Zones. In this map, the key should be the
  # domain name. See examples below.
  private_zones = {}

  # A map of public Route 53 Hosted Zones. In this map, the key should be the
  # domain name. See examples below.
  public_zones = {}

  # A map of domain names to configurations for setting up a new private
  # namespace in AWS Cloud Map.
  service_discovery_private_namespaces = {}

  # A map of domain names to configurations for setting up a new public
  # namespace in AWS Cloud Map. Note that the domain name must be registered
  # with Route 53.
  service_discovery_public_namespaces = {}

}


```

</TabItem>
</Tabs>



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
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   private_zones = {
       "backend.com" = {
           comment = "Use for arbitrary comments"
           vpcs = [{
             id = "19233983937"
             region = null
           }]
           tags = {
               CanDelete = true
           }
           force_destroy = true
       }
       "database.com" = {
           comment = "This is prod - don't delete!"
           vpcs = [{
             id = "129734967447"
             region = null
           }]
           tags = {
               Application = "redis"
               Team = "apps"
           }
           force_destroy = false
       }
   }

```
</details>

</HclGeneralListItem>
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
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl

   Example: Request a certificate protecting only the apex domain
  
   public_zones = {
       "example.com" = {
           comment = "You can add arbitrary text here"
           tags = {
               Foo = "bar"
           }
           force_destroy = true
           subject_alternative_names = []
           created_outside_terraform = true
           create_verification_record = true
           verify_certificate        = true
           base_domain_name_tags = {
               original = true
           }
           apex_records = [
             {
               type    = "MX"
               ttl     = 3600
               records = [
                 "1 mx.example.com.",
                 "5 mx1.example.com.",
                 "10 mx2.example.com.",
               ]
             },
             {
               type    = "SPF"
               ttl     = 3600
               records = [
                 "v=spf1 include:_spf.example.com ~all"
               ]
             },
             {
               type    = "TXT"
               ttl     = 3600
               records = [
                 "v=spf1 include:_spf.example.com ~all"
               ]
             }
           ]
           subdomains = {
             txt-test = {
               type    = "TXT"
               ttl     = 3600
               records = ["hello-world"]
             }
             txt-test-mx = {
               fqdn    = "txt-test.example.com"
               type    = "SPF"
               ttl     = 3600
               records = ["hello-world"]
             }
             txt-test-docs = {
               fqdn  = "docs.example.com"
               type  = "A"
               alias = {
                 name                   = aws_elb.main.dns_name
                 zone_id                = aws_elb.main.zone_id
                 evaluate_target_health = true
               }
             }
           }
       }
   }
  
   Example: Request a wildcard certificate that does NOT protect the apex domain:
  
   public_zones = {
       "*.example.com = {
             comment = ""
             tags = {}
             force_destroy = true
             subject_alternative_names = []
             base_domain_name_tags = {}
             create_verification_record = true
             verify_certificate         = true
       }
   }
  
   Example: Request a wildcard certificate that covers BOTH the apex and first-level subdomains
  
   public_zones = {
       "example.com" = {
           comment = ""
           tags = {}
           force_destroy = false
           subject_alternative_names = ["*.example.com"]
           base_domain_name_tags = {}
           create_verification_record = true
           verify_certificate         = true
       }
   }

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Allow empty maps to be passed by default - since we sometimes define only public zones or only private zones in a given module call

```
</details>

</HclGeneralListItem>
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
<HclGeneralListItem title="More Details">
<details>


```hcl

     A user friendly description for the namespace

```
</details>

<details>


```hcl

   Default to empty map so that private namespaces are only created when requested.

```
</details>

</HclGeneralListItem>
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
<HclGeneralListItem title="More Details">
<details>


```hcl

   Whether or not to create a Route 53 DNS record for use in validating the issued certificate. You may want to set this to false if you are not using Route 53 as your DNS provider.
    create_verification_record = bool
  
   Whether or not to attempt to verify the issued certificate via DNS entries automatically created via Route 53 records. You may want to set this to false on your certificate inputs if you are not using Route 53 as your DNS provider.
    verify_certificate = bool
  
   Whether or not to create ACM TLS certificates for the domain. When true, Route53 certificates will automatically be
   created for the root domain. Defaults to true.
    provision_certificates = bool

```
</details>

<details>


```hcl

   Default to empty map so that public namespaces are only created when requested.

```
</details>

</HclGeneralListItem>
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
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/networking/route53/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/networking/route53/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/networking/route53/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "9565e5d054da175627aa93838a4ecfce"
}
##DOCS-SOURCER-END -->
