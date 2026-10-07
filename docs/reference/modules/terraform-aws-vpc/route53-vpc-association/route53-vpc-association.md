---
title: "Sample Usage"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="OpenTofu/Terraform Modules for AWS Networking & Content Delivery" version="0.28.10" />

# Sample Usage

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/route53-vpc-association" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases?q=route53-vpc-association" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

```hcl
terraform {
  required_version = "1.5.7"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.26"
    }
  }
}

provider "aws" {
  alias   = "acc_a"
  profile = "gw-phoenix"
}
provider "aws" {
  alias   = "acc_b"
  profile = "gw-wasteland"
}

module "vpc_a" {
  source = "../../modules/vpc"
  vpc_settings               = { cidr_block = "10.0.0.0/16" }
}
module "vpc_b" {
  source = "../../modules/vpc"
  providers = {aws = aws.acc_b}
  vpc_settings               = { cidr_block = "10.1.0.0/16" }
}
module "vpc_c" {
  source = "../../modules/vpc"
  vpc_settings               = { cidr_block = "10.2.0.0/16" }
}

module "phz" {
  source = "../../modules/route53"
  hosted_zone_settings = {
    name = "example.com"
    force_destroy = true
    vpc_to_associate_with = {vpc_id = module.vpc_a.vpc.id}
  }
}

module "vpc_auth" {
  source = "../../modules/route53-vpc-association-authorization"
  zone_id = module.phz.hosted_zone.id

  vpc_authorization_settings = {
    vpc_b = {vpc_id = module.vpc_b.vpc.id, vpc_region = module.vpc_b.vpc.region.id}
  }
}


module "zone_assoc_ext_acc" {
  source = "../../modules/route53-vpc-association"

  providers = {aws = aws.acc_b}
  depends_on = [module.vpc_auth]

  zone_id = module.phz.hosted_zone.id
  zone_association_settings = {
    vpc_b = {
      vpc_id = module.vpc_b.vpc.id,
      vpc_region = module.vpc_b.vpc.region.id
    }
  }
}
module "zone_assoc" {
  source = "../../modules/route53-vpc-association"

  zone_id = module.phz.hosted_zone.id
  zone_association_settings = {
    vpc_c = {vpc_id = module.vpc_c.vpc.id, vpc_region = module.vpc_c.vpc.region.id}
  }
}
```

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ROUTE53-VPC-ASSOCIATION MODULE
# ------------------------------------------------------------------------------------------------------

module "route_53_vpc_association" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/route53-vpc-association?ref=v0.28.10"

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # VPC Association Authorization settings. Please refer to variable definition
  # for details.
  vpc_association_settings = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ROUTE53-VPC-ASSOCIATION MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/route53-vpc-association?ref=v0.28.10"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # VPC Association Authorization settings. Please refer to variable definition
  # for details.
  vpc_association_settings = {}

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Optional

<HclListItem name="vpc_association_settings" requirement="optional" type="map(object(…))">
<HclListItemDescription>

VPC Association Authorization settings. Please refer to variable definition for details.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    # VPC association:
    # - zone_id: Hosted Zone ID to associate with. Example: Z3P5QSUBK4POTI0
    # - vpc_id: VPC ID to associate. Example: vpc-04a30883b0b95f8cd
    # - vpc_region: VPC region. Example: us-east-1
    zone_id    = optional(string)
    vpc_id     = optional(string)
    vpc_region = optional(string)
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="zone_associations">
<HclListItemDescription>

Map of Route53 zone association configurations

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/route53-vpc-association/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/route53-vpc-association/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/route53-vpc-association/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "e951c188e16f46c70a9632354c8786cf"
}
##DOCS-SOURCER-END -->
