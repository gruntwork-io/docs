---
title: "Control Tower Landing Zone"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Control Tower" version="1.4.0" lastModifiedVersion="0.8.7"/>

# Control Tower Landing Zone

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.4.0/modules/landingzone/control-tower-landing-zone" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.8.7" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

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

AWS releases updates to the Control Tower Landing Zone on a regular basis.
To upgrade Landing Zone to the latest version, you can simply update the `landing_zone_version` input variable to the desired version.

Check the [Configuration update management in AWS Control Tower](https://docs.aws.amazon.com/controltower/latest/userguide/configuration-updates.html) documentation for more information.

## How to enable `Region deny control`

The `Region deny control` can't be enabled via the API/IaC. To enable it you need to follow the steps below:

1.  Open the AWS Control Tower console at https://console.aws.amazon.com/controltower/
2.  In the navigation pane, choose **Settings**.
3.  In the **Region deny control** section, choose **Edit**.
4.  Select the **Enable region deny control** check box.
5.  Choose **Save**.

## How to import existing Landing Zones

If you are setting up the Landing Zone on a new installation no module is required.
This section is for importing existing Landing Zones into infrastructure as code.

The goal of this section is to import the existing Landing Zone into Terraform so that it can be managed as code with no changes to the existing Landing Zone.

To achieve this you can use one of the following import methods:

*   \[RECOMANDED] Using the `import` blocks available in [OpenTofu][tofu-import-block] and [Terraform][terraform-import-block]
    ```hcl
    import {
      to = module.<resource_type>.<resource_name>
      id = "<resource_id>"
    }
    ```
*   Import resources using the CLI `import` command available in [OpenTofu][tofu-import-cli] and [Terraform][terraform-import-cli]
    ```shell
    tofu import "module.<resource_type>.<resource_name>" "<resource_id>"
    ```

Regardless of the method you choose, you will need find the resources that need to be imported using the AWS Console or the AWS CLI.

In the following table you can find examples for all the resources that need to be imported:

| Resource Target                                                  | How to find the Resource ID                                                                                       |
|------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| `module.<module_name>.aws_organizations_account.log_archive`     | `aws organizations list-accounts --query "Accounts[?Name=='Logs'].Id"`                                            |
| `module.<module_name>.aws_organizations_account.audit`           | `aws organizations list-accounts --query "Accounts[?Name=='Security'].Id"`                                        |
| `module.<module_name>.aws_iam_role.controltower_admin`           | In this case the ID is static `AWSControlTowerAdmin`                                                              |
| `module.<module_name>.aws_iam_role.controltower_execution`       |  In this case the ID is static `AWSControlTowerExecution` (depending on the version this one may not exist)       |
| `module.<module_name>.aws_iam_policy.controltower_admin_policy`  | `aws iam list-policies --no-paginate --query "Policies[?PolicyName=='AWSControlTowerAdminPolicy'].Arn"`           |
| `module.<module_name>.aws_iam_role.cloudtrail`                   |  In this case the ID is static `AWSControlTowerCloudTrailRole`                                                    |
| `module.<module_name>.aws_iam_policy.cloudtrail_policy`          | `aws iam list-policies --no-paginate --query "Policies[?PolicyName=='AWSControlTowerCloudTrailRolePolicy'].Arn"`  |
| `module.<module_name>.aws_iam_role.stackset`                     |  In this case the ID is static `AWSControlTowerStackSetRole`                                                      |
| `module.<module_name>.aws_iam_policy.stackset_policy`            | `aws iam list-policies --no-paginate --query "Policies[?PolicyName=='AWSControlTowerStackSetRolePolicy'].Arn"`    |
| `module.<module_name>.aws_iam_role.config_aggregator`            |  In this case the ID is static `AWSControlTowerConfigAggregatorRoleForOrganizations`                              |
| `module.<module_name>.aws_kms_key.controltower`                  | `aws kms list-aliases --no-paginate --query "Aliases[?AliasName=='alias/control_tower_key'].TargetKeyId"`         |
| `module.<module_name>.aws_kms_alias.controltower`                | In this case the ID is static `alias/control_tower_key`                                                           |
| `module.<module_name>.aws_controltower_landing_zone.zone`        | `aws controltower list-landing-zones --no-paginate`                                                               |

After you have found the resource IDs you can import the resources. The CLI commands assume a default configuration, if you have a different configuration you will need to adjust the commands accordingly.

The resources `aws_iam_role_policy_attachment` are safe to be re-created.
We also recommend using the variable `existing_key_arn` to use the KSM key. Especially if you have a dedicated policy attached to the key.

The goal of the import is to have a plan with no operations to be performed. If you see any operations to be performed, you should stop and investigate the issue before applying the plan.

[tofu-import-cli]: https://opentofu.org/docs/cli/import/

[tofu-import-block]: https://opentofu.org/docs/language/import/#syntax

[terraform-import-cli]: https://developer.hashicorp.com/terraform/cli/v1.5.x/commands/import

[terraform-import-block]: https://developer.hashicorp.com/terraform/language/v1.5.x/import

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CONTROL-TOWER-LANDING-ZONE MODULE
# ------------------------------------------------------------------------------------------------------

module "control_tower_landing_zone" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-landing-zone?ref=v1.4.0"

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
  access_logging_bucket_retention_days = 3650

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

  # The ARN of an existing KMS key to use for AWS Control Tower.
  existing_key_arn = ""

  # The name of the foundational organizational unit to create in AWS Control
  # Tower.
  foundational_organizational_unit_name = "Security"

  # A list of AWS regions to govern with AWS Control Tower. The region where you
  # deploy the landing zone MUST always be included in this list.
  governed_regions = ["us-east-1","us-west-2"]

  # A list of IAM users or roles that should be granted administrative access to
  # the KMS key.
  kms_key_admins = []

  # The alias to use for the KMS key used by AWS Control Tower.
  kms_key_alias_name = "control_tower_key"

  # A list of IAM users or roles that should be granted user access to the KMS
  # key.
  kms_key_users = []

  # The version of the AWS Control Tower landing zone to deploy.
  landing_zone_version = "3.3"

  # The number of days to retain log objects in the centralized logging bucket.
  logging_bucket_retention_days = 365

  # Whether to provision the production organizational unit.
  provision_prod_ou = false

  # If you want to overwrite the auto discovery of the root OU, you can provide
  # the ID here.
  root_ou_id = ""

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
  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-landing-zone?ref=v1.4.0"
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
  access_logging_bucket_retention_days = 3650

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

  # The ARN of an existing KMS key to use for AWS Control Tower.
  existing_key_arn = ""

  # The name of the foundational organizational unit to create in AWS Control
  # Tower.
  foundational_organizational_unit_name = "Security"

  # A list of AWS regions to govern with AWS Control Tower. The region where you
  # deploy the landing zone MUST always be included in this list.
  governed_regions = ["us-east-1","us-west-2"]

  # A list of IAM users or roles that should be granted administrative access to
  # the KMS key.
  kms_key_admins = []

  # The alias to use for the KMS key used by AWS Control Tower.
  kms_key_alias_name = "control_tower_key"

  # A list of IAM users or roles that should be granted user access to the KMS
  # key.
  kms_key_users = []

  # The version of the AWS Control Tower landing zone to deploy.
  landing_zone_version = "3.3"

  # The number of days to retain log objects in the centralized logging bucket.
  logging_bucket_retention_days = 365

  # Whether to provision the production organizational unit.
  provision_prod_ou = false

  # If you want to overwrite the auto discovery of the root OU, you can provide
  # the ID here.
  root_ou_id = ""

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
<HclListItemDefaultValue defaultValue="3650"/>
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

<HclListItem name="existing_key_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of an existing KMS key to use for AWS Control Tower.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
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

<HclListItem name="kms_key_admins" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM users or roles that should be granted administrative access to the KMS key.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="kms_key_alias_name" requirement="optional" type="string">
<HclListItemDescription>

The alias to use for the KMS key used by AWS Control Tower.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;control_tower_key&quot;"/>
</HclListItem>

<HclListItem name="kms_key_users" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM users or roles that should be granted user access to the KMS key.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
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
<HclListItemDefaultValue defaultValue="365"/>
</HclListItem>

<HclListItem name="provision_prod_ou" requirement="optional" type="bool">
<HclListItemDescription>

Whether to provision the production organizational unit.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="root_ou_id" requirement="optional" type="string">
<HclListItemDescription>

If you want to overwrite the auto discovery of the root OU, you can provide the ID here.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
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
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.4.0/modules/control-tower-landing-zone/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.4.0/modules/control-tower-landing-zone/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.4.0/modules/control-tower-landing-zone/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "d9f67125d40109c1fd984db9cabecc3b"
}
##DOCS-SOURCER-END -->
