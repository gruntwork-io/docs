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

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/transit-gateway-attachment-peering-requestor" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases?q=transit-gateway-attachment-peering-requestor" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

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
# DEPLOY GRUNTWORK'S TRANSIT-GATEWAY-ATTACHMENT-PEERING-REQUESTOR MODULE
# ------------------------------------------------------------------------------------------------------

module "transit_gateway_attachment_peering_requestor" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/transit-gateway-attachment-peering-requestor?ref=v0.28.10"

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Tags to assign to all resources
  tags = {}

  # Transit Gateway Peering Attachment Settings. Please refer to variable
  # definition for details.
  transit_gateway_peering_attachment_settings = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S TRANSIT-GATEWAY-ATTACHMENT-PEERING-REQUESTOR MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/transit-gateway-attachment-peering-requestor?ref=v0.28.10"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Tags to assign to all resources
  tags = {}

  # Transit Gateway Peering Attachment Settings. Please refer to variable
  # definition for details.
  transit_gateway_peering_attachment_settings = {}

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Optional

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags to assign to all resources

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="transit_gateway_peering_attachment_settings" requirement="optional" type="object(…)">
<HclListItemDescription>

Transit Gateway Peering Attachment Settings. Please refer to variable definition for details.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # Transit Gateway peering configuration:
    # - transit_gateway_id: Source TGW ID
    # - peer_transit_gateway_id: Destination TGW ID for peering
    # - peer_account_id: AWS account ID owning peer TGW
    # - peer_region: Region of peer TGW
    # - options.dynamic_routing: Enable dynamic routing. Options: enable | disable
    transit_gateway_id      = optional(string)
    peer_transit_gateway_id = optional(string)
    peer_account_id         = optional(string)
    peer_region             = optional(string)
    options = optional(object({
      dynamic_routing = optional(string)
    }))
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Map key: Transit Gateway Peering Attachment name
   Map value: Peering attachment configuration

```
</details>

</HclGeneralListItem>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="transit_gateway_peering_requester">
<HclListItemDescription>

The EC2 Transit Gateway Peering Attachment Requester.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/transit-gateway-attachment-peering-requestor/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/transit-gateway-attachment-peering-requestor/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/transit-gateway-attachment-peering-requestor/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "19b827a2810c7b0c1666872bd05ae526"
}
##DOCS-SOURCER-END -->
