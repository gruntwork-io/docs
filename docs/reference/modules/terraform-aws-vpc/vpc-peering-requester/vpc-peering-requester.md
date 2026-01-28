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

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/vpc-peering-requester" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases?q=vpc-peering-requester" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

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

provider "aws" {}
provider "aws" {
  alias   = "acc_b"
  profile = "gw-wasteland"
  region  = "eu-central-1"
}

module "vpc_a" {
  source       = "../../modules/vpc"
  vpc_settings = { cidr_block = "10.0.0.0/16" }
}
module "vpc_a2" {
  source       = "../../modules/vpc"
  vpc_settings = { cidr_block = "10.1.0.0/16" }
}
module "vpc_b" {
  source       = "../../modules/vpc"
  providers    = { aws = aws.acc_b }
  vpc_settings = { cidr_block = "10.2.0.0/16" }
}


module "vpc_peering_requester" {
  source         = "../../modules/vpc-peering-requester"
  vpc_id         = module.vpc_a.vpc.id
  peer_vpc_id    = module.vpc_b.vpc.id
  peer_owner_id  = module.vpc_b.vpc.account_id
  peer_region    = module.vpc_b.vpc.region.id
}
module "vpc_peering_accepter" {
    source                  = "../../modules/vpc-peering-accepter"
    providers               = { aws = aws.acc_b }
    vpc_peering_connection_id = module.vpc_peering_requester.aws_vpc_peering_connection.id
}

module "vpc_peering_options_requester" {
    source                  = "../../modules/vpc-peering-options"

    vpc_peering_connection_id = module.vpc_peering_accepter.aws_vpc_peering_connection_accepter.id
  allow_remote_vpc_dns_resolution_for_requester = true
}
module "vpc_peering_options_accepter" {
    source                  = "../../modules/vpc-peering-options"
    depends_on = [module.vpc_peering_accepter]
    providers               = { aws = aws.acc_b }

    vpc_peering_connection_id = module.vpc_peering_accepter.aws_vpc_peering_connection_accepter.id
  allow_remote_vpc_dns_resolution_for_accepter = true
}
```

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-PEERING-REQUESTER MODULE
# ------------------------------------------------------------------------------------------------------

module "vpc_peering_requester" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-peering-requester?ref=v0.28.10"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Target VPC ID for peering connection
  peer_vpc_id = <string>

  # Requester VPC ID
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # AWS account ID of target peer VPC. Leave blank for same-account peering.
  peer_owner_id = null

  # Region of target peer VPC. Leave blank for same-region peering.
  peer_region = null

  # Tags to assign to all resources
  tags = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-PEERING-REQUESTER MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-peering-requester?ref=v0.28.10"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Target VPC ID for peering connection
  peer_vpc_id = <string>

  # Requester VPC ID
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # AWS account ID of target peer VPC. Leave blank for same-account peering.
  peer_owner_id = null

  # Region of target peer VPC. Leave blank for same-region peering.
  peer_region = null

  # Tags to assign to all resources
  tags = {}

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="peer_vpc_id" requirement="required" type="string">
<HclListItemDescription>

Target VPC ID for peering connection

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

Requester VPC ID

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="peer_owner_id" requirement="optional" type="string">
<HclListItemDescription>

AWS account ID of target peer VPC. Leave blank for same-account peering.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="peer_region" requirement="optional" type="string">
<HclListItemDescription>

Region of target peer VPC. Leave blank for same-region peering.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags to assign to all resources

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="aws_vpc_peering_connection">
<HclListItemDescription>

VPC peering connection resource with all attributes including connection ID and status

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/vpc-peering-requester/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/vpc-peering-requester/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/vpc-peering-requester/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "c11967bcedccfe7cdfa689a88fdd6fdf"
}
##DOCS-SOURCER-END -->
