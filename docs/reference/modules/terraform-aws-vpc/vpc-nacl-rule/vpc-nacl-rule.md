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

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/vpc-nacl-rule" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases?q=vpc-nacl-rule" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

```hcl
terraform {
  required_version = "~>1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.26"
    }
  }
}

module "vpc" {
  source = "../../modules/vpc"

  vpc_settings               = { cidr_block = "10.0.0.0/16" }
  internet_gateways_settings = { enable_internet_gateway = true }
  nacl_settings = ["sampleNACL1", "sampleNACL2"]
}

module "subnets" {
  source = "../../modules/vpc-subnet"

  vpc_id = module.vpc.vpc.id
  subnets_settings = {
    publicAZ1 = {
      cidr_block        = "10.0.0.0/20",
    }
  }
  routing_tables_settings = {
    "public"     = { associate_with = ["publicAZ1"] }
  }

  network_acls_association_settings = {
    publicAZ1 = module.vpc.nacls["sampleNACL1"].id
  }
}

module "vpc-nacl-rule" {
  source = "../../modules/vpc-nacl-rule"
  network_acl_id = module.vpc.nacls["sampleNACL1"].id
  nacl_rule_settings = {
    "allow-ssh" = {
      egress      = false
      rule_number = 100
      protocol    = "tcp"
      rule_action = "allow"
      cidr_block  = "10.0.0.0/16"
      from_port   = 22
      to_port     = 22
    }
    "allow-ssh-egress" = {
      egress      = true
      rule_number = 100
      protocol    = "tcp"
      rule_action = "allow"
      cidr_block  = "10.0.0.0/16"
      from_port   = 22
      to_port     = 22
    }
  }
}

```

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-NACL-RULE MODULE
# ------------------------------------------------------------------------------------------------------

module "vpc_nacl_rule" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-nacl-rule?ref=v0.28.10"

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # NACL Settings. Please refer to variable definition for details.
  nacl_rule_settings = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S VPC-NACL-RULE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-vpc.git//modules/vpc-nacl-rule?ref=v0.28.10"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # NACL Settings. Please refer to variable definition for details.
  nacl_rule_settings = {}

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Optional

<HclListItem name="nacl_rule_settings" requirement="optional" type="map(object(…))">
<HclListItemDescription>

NACL Settings. Please refer to variable definition for details.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    # Basic settings:
    # - region: AWS region to deploy VPC. Defaults to provider region
    region = optional(string)

    # NACL ID to create rule in
    network_acl_id = optional(string)

    # Rule configuration:
    # - egress: Egress rule (traffic leaving subnet). Defaults to false
    # - rule_number: Rule number for ordering (lower = higher priority). Same number allowed if one egress/one ingress
    # - rule_action: Action for matching traffic. Options: allow | deny
    # - protocol: Protocol to match. Use -1 for all protocols
    egress      = optional(bool)
    rule_number = optional(number)
    rule_action = optional(string)
    protocol    = optional(string)

    # Port range:
    # - from_port / to_port: Port range to match
    from_port = optional(number)
    to_port   = optional(number)

    # CIDR blocks:
    # - cidr_block / ipv6_cidr_block: IPv4/IPv6 CIDR to match (must be valid network mask)
    cidr_block      = optional(string)
    ipv6_cidr_block = optional(string)

    # ICMP configuration:
    # - icmp_type / icmp_code: ICMP type/code to match
    #   See: https://www.iana.org/assignments/icmp-parameters/icmp-parameters.xhtml
    icmp_type = optional(number)
    icmp_code = optional(number)
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Map key: Rule identifier (Terraform resource name only, e.g., "allow_http", "allow_ssh")
   Map value: NACL rule configuration
   Reference: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/network_acl

```
</details>

<details>


```hcl

     NACL ID to create rule in

```
</details>

<details>


```hcl

     Rule configuration:
     - egress: Egress rule (traffic leaving subnet). Defaults to false
     - rule_number: Rule number for ordering (lower = higher priority). Same number allowed if one egress/one ingress
     - rule_action: Action for matching traffic. Options: allow | deny
     - protocol: Protocol to match. Use -1 for all protocols

```
</details>

<details>


```hcl

     Port range:
     - from_port / to_port: Port range to match

```
</details>

<details>


```hcl

     CIDR blocks:
     - cidr_block / ipv6_cidr_block: IPv4/IPv6 CIDR to match (must be valid network mask)

```
</details>

<details>


```hcl

     ICMP configuration:
     - icmp_type / icmp_code: ICMP type/code to match
       See: https://www.iana.org/assignments/icmp-parameters/icmp-parameters.xhtml

```
</details>

</HclGeneralListItem>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="aws_network_acls">
<HclListItemDescription>

Map of all NACL rules created by this module

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/vpc-nacl-rule/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/vpc-nacl-rule/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/v0.28.10/modules/vpc-nacl-rule/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "5a76c9f728986d072d0b8658d4828bd7"
}
##DOCS-SOURCER-END -->
