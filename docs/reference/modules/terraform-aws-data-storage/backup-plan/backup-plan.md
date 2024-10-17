---
title: "Backup Plan Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Data Storage Modules" version="0.39.0" lastModifiedVersion="0.38.1"/>

# Backup Plan Module

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.39.0/modules/backup-plan" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.38.1" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module creates the following AWS Backup resources:

1.  Backup plans - specifying **how and when** to back things up
2.  Resource selections - specifying **which resources** to back up

You associate your plans with a [Backup vault](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.39.0/modules/backup-vault).

## What is a Backup Plan?

A backup plan is a policy expression that defines when and how you want to back up your AWS resources. You can assign resources to backup plans, and AWS Backup will automatically back up those resources according to the backup plan. You can define multiple plans with different resources if you have workloads with different backup requirements.

For example, you can create a plan that backs up all resources (e.g., EC2 instances, RDS instances, etc) with a specific tag once every hour. Meanwhile, you might want to create a second
plan that backs up only your DynamoDB tables, selected by explicitly passing their ARNs that is only backed up once per day. Creating multiple plans and vaults allows you to define your
own backup workflow in whichever way makes the most sense for your use case.

Learn more at [the official AWS documentation for Backup plans](https://docs.aws.amazon.com/aws-backup/latest/devguide/about-backup-plans.html).

## What is a Backup selection?

A Backup selection specifies which AWS resources you want AWS Backup to target when your backup plan is run. You can either specify your target resources via tag, or by explicitly passing their ARNs.

## How do you select resources to backup via tag?

To select all EC2 instances, and DynamoDB tables, and EBS volumes, etc, that have the tag `Snapshot:true`, use a `selection_tag` when configuring this module:

```hcl
module "backup_plan" {

  ...

  plans = {
    "tag-based-backup-plan" = {
        rule = {
          target_vault_name = element(module.backup_vault.vault_names, 0),
          schedule = "cron(47 0/1 * * ? *)"
        }
        selection = {
          selection_tag = {
            type = "STRINGEQUALS"
            "key" = "Snapshot"
            "value" = true
          }
        }
    }
  }
}
```

## How do you select resources to backup via ARN?

To select specific AWS resources by ARN, use the `resources` attribute when configuring this module:

```hcl
module "backup_plan" {

  ...

  plans = {
    "tag-based-backup-plan" = {
        rule = {
          target_vault_name = element(module.backup_vault.vault_names, 0),
          schedule = "cron(47 0/1 * * ? *)"
        }
        resources = [
          "arn:aws:ec2:us-east-1:111111111111:instance/i-0fe68bg5e936782fr",
          "arn:aws:ec2:us-east-1:111111111111:instance/i-0be38tg7e937782a3"
        ]
    }
  }
}
```

## How do you troubleshoot Backup jobs?

See [Troubleshooting AWS Backup](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.39.0/core-concepts.md#troubleshooting-aws-backup) in the core-concepts guide.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S BACKUP-PLAN MODULE
# ------------------------------------------------------------------------------------------------------

module "backup_plan" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/backup-plan?ref=v0.39.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  plans = <any>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name to use for the backup service role that is created and attached to
  # backup plans.
  backup_service_role_name = "backup-service-role"

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S BACKUP-PLAN MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/backup-plan?ref=v0.39.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  plans = <any>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name to use for the backup service role that is created and attached to
  # backup plans.
  backup_service_role_name = "backup-service-role"

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="plans" requirement="required" type="any">
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
</HclListItem>

### Optional

<HclListItem name="backup_service_role_name" requirement="optional" type="string">
<HclListItemDescription>

The name to use for the backup service role that is created and attached to backup plans.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;backup-service-role&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="backup_plan_arns">
<HclListItemDescription>

A list of the ARNs for any Backup plans configured

</HclListItemDescription>
</HclListItem>

<HclListItem name="backup_plan_ids">
<HclListItemDescription>

A list of IDs for any Backup plans configured

</HclListItemDescription>
</HclListItem>

<HclListItem name="backup_plan_tags_all">
<HclListItemDescription>

A list of maps of tags assigned to the plans, including those inherited from the provider default_tags block

</HclListItemDescription>
</HclListItem>

<HclListItem name="backup_selection_ids">
<HclListItemDescription>

A list of IDs for any Backup selections configured

</HclListItemDescription>
</HclListItem>

<HclListItem name="backup_service_role_arn">
<HclListItemDescription>

The ARN of the IAM service role used by Backup plans

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.39.0/modules/backup-plan/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.39.0/modules/backup-plan/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.39.0/modules/backup-plan/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "a86821d64c63f6c8032971ff6d5e75c8"
}
##DOCS-SOURCER-END -->
