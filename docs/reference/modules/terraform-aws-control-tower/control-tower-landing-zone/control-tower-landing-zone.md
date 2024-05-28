---
title: "Control Tower Landing Zone"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Control Tower" version="0.7.5" />

# Control Tower Landing Zone

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.7.5/modules/landingzone/control-tower-landing-zone" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases?q=control-tower-landing-zone" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This is a Terraform module that deploys the AWS Control Tower Landing Zone in the
management account.

## Usage

```hcl
module "control_tower_landing_zone" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower//modules/landingzone/control-tower-landing-zone?ref=v0.7.6"

  email_address_account_log_archiver = "log-archiver-email@example.com"
  email_address_account_audit        = "audit-email@example.com"
}
```

## How to upgrade the landing zone

AWS relaease updates to the Control Tower landing zone on a regular basis.
To upgrade the landing zone to the latest version, you can simply update the `landing_zone_version` input variable to the desired version.

Check the [Configuration update management in AWS Control Tower](https://docs.aws.amazon.com/controltower/latest/userguide/configuration-updates.html) documentation for more information.

## How to import exiting landing zones

TBD

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CONTROL-TOWER-LANDING-ZONE MODULE
# ------------------------------------------------------------------------------------------------------

module "control_tower_landing_zone" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-landing-zone?ref=v0.7.5"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The email address to use for the account to use for audit.
  email_address_account_audit = <string>

  # The email address to use for the account to use for centralized logging.
  email_address_account_log_archiver = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The number of days to retain log objects in the centralized access logging
  # bucket.
  access_logging_bucket_retention_days = 60

  # The name of the account to use for audit.
  account_name_audit = "Security"

  # The name of the account to use for centralized logging.
  account_name_log_archiver = "Logs"

  # The name of an additional organizational unit to create in AWS Control
  # Tower.
  additional_organizational_unit_name = "Pre-prod"

  # The amount of time allowed for the create operation to take before being
  # considered to have failed.
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts
  create_operation_timeout = "60m"

  # The amount of time allowed for the delete operation to take before being
  # considered to have failed.
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts
  delete_operation_timeout = "60m"

  # Whether to enable access management in AWS Control Tower.
  enable_access_management = true

  # The name of the foundational organizational unit to create in AWS Control
  # Tower.
  foundational_organizational_unit_name = "Security"

  # A list of AWS regions to govern with AWS Control Tower. The region where you
  # deploy the landing zone MUST always be included in this list.
  governed_regions = ["us-east-1","us-west-2"]

  # The alias to use for the KMS key used by AWS Control Tower.
  ksm_key_alias_name = "control_tower_key"

  # The version of the AWS Control Tower landing zone to deploy.
  landing_zone_version = "3.3"

  # The number of days to retain log objects in the centralized logging bucket.
  logging_bucket_retention_days = 60

  # A map of tags to apply to the AWS Control Tower landing zone.
  tags = {}

  # The amount of time allowed for the update operation to take before being
  # considered to have failed.
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts
  update_operation_timeout = "60m"

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CONTROL-TOWER-LANDING-ZONE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-landing-zone?ref=v0.7.5"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The email address to use for the account to use for audit.
  email_address_account_audit = <string>

  # The email address to use for the account to use for centralized logging.
  email_address_account_log_archiver = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The number of days to retain log objects in the centralized access logging
  # bucket.
  access_logging_bucket_retention_days = 60

  # The name of the account to use for audit.
  account_name_audit = "Security"

  # The name of the account to use for centralized logging.
  account_name_log_archiver = "Logs"

  # The name of an additional organizational unit to create in AWS Control
  # Tower.
  additional_organizational_unit_name = "Pre-prod"

  # The amount of time allowed for the create operation to take before being
  # considered to have failed.
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts
  create_operation_timeout = "60m"

  # The amount of time allowed for the delete operation to take before being
  # considered to have failed.
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts
  delete_operation_timeout = "60m"

  # Whether to enable access management in AWS Control Tower.
  enable_access_management = true

  # The name of the foundational organizational unit to create in AWS Control
  # Tower.
  foundational_organizational_unit_name = "Security"

  # A list of AWS regions to govern with AWS Control Tower. The region where you
  # deploy the landing zone MUST always be included in this list.
  governed_regions = ["us-east-1","us-west-2"]

  # The alias to use for the KMS key used by AWS Control Tower.
  ksm_key_alias_name = "control_tower_key"

  # The version of the AWS Control Tower landing zone to deploy.
  landing_zone_version = "3.3"

  # The number of days to retain log objects in the centralized logging bucket.
  logging_bucket_retention_days = 60

  # A map of tags to apply to the AWS Control Tower landing zone.
  tags = {}

  # The amount of time allowed for the update operation to take before being
  # considered to have failed.
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts
  update_operation_timeout = "60m"

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="email_address_account_audit" requirement="required" type="string">
<HclListItemDescription>

The email address to use for the account to use for audit.

</HclListItemDescription>
</HclListItem>

<HclListItem name="email_address_account_log_archiver" requirement="required" type="string">
<HclListItemDescription>

The email address to use for the account to use for centralized logging.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="access_logging_bucket_retention_days" requirement="optional" type="number">
<HclListItemDescription>

The number of days to retain log objects in the centralized access logging bucket.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="account_name_audit" requirement="optional" type="string">
<HclListItemDescription>

The name of the account to use for audit.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;Security&quot;"/>
</HclListItem>

<HclListItem name="account_name_log_archiver" requirement="optional" type="string">
<HclListItemDescription>

The name of the account to use for centralized logging.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;Logs&quot;"/>
</HclListItem>

<HclListItem name="additional_organizational_unit_name" requirement="optional" type="string">
<HclListItemDescription>

The name of an additional organizational unit to create in AWS Control Tower.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;Pre-prod&quot;"/>
</HclListItem>

<HclListItem name="create_operation_timeout" requirement="optional" type="string">
<HclListItemDescription>

The amount of time allowed for the create operation to take before being considered to have failed. https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;60m&quot;"/>
</HclListItem>

<HclListItem name="delete_operation_timeout" requirement="optional" type="string">
<HclListItemDescription>

The amount of time allowed for the delete operation to take before being considered to have failed. https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;60m&quot;"/>
</HclListItem>

<HclListItem name="enable_access_management" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable access management in AWS Control Tower.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="foundational_organizational_unit_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the foundational organizational unit to create in AWS Control Tower.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;Security&quot;"/>
</HclListItem>

<HclListItem name="governed_regions" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of AWS regions to govern with AWS Control Tower. The region where you deploy the landing zone MUST always be included in this list.

</HclListItemDescription>
<HclListItemDefaultValue>

```hcl
[
  "us-east-1",
  "us-west-2"
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="ksm_key_alias_name" requirement="optional" type="string">
<HclListItemDescription>

The alias to use for the KMS key used by AWS Control Tower.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;control_tower_key&quot;"/>
</HclListItem>

<HclListItem name="landing_zone_version" requirement="optional" type="string">
<HclListItemDescription>

The version of the AWS Control Tower landing zone to deploy.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;3.3&quot;"/>
</HclListItem>

<HclListItem name="logging_bucket_retention_days" requirement="optional" type="number">
<HclListItemDescription>

The number of days to retain log objects in the centralized logging bucket.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the AWS Control Tower landing zone.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="update_operation_timeout" requirement="optional" type="string">
<HclListItemDescription>

The amount of time allowed for the update operation to take before being considered to have failed. https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;60m&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="audit_account_id">
</HclListItem>

<HclListItem name="landing_zone_arn">
</HclListItem>

<HclListItem name="log_archive_account_id">
</HclListItem>

<HclListItem name="manifest">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.7.5/modules/control-tower-landing-zone/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.7.5/modules/control-tower-landing-zone/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.7.5/modules/control-tower-landing-zone/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "f8e0cc664124454f1034ebf72656af89"
}
##DOCS-SOURCER-END -->
