---
title: "Organization Backup Policies Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Data Storage Modules" version="0.46.1" lastModifiedVersion="0.45.0"/>

# Organization Backup Policies Module

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.46.1/modules/org-backup-policy" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.45.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module creates
the [AWS Organizations Backup Policies](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_backup.html).
You associate your each plan on the backup policies with a [Backup vault](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.46.1/modules/backup-vault).

## What are Backup Policies ?

Backup policies give you granular control over backing up your resources at whatever level your organization requires.
It allows attaching a backup policy to any of the elements in your organization's structure, such as the root,
organizational units (OUs), and individual accounts. Organization applies inheritance rules to combine the policies in
the organization's root, any parent OUs, or attached to the account. This results in an effective backup policy for each
account. This effective policy instructs AWS Backup how to automatically back up your AWS resources.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ORG-BACKUP-POLICY MODULE
# ------------------------------------------------------------------------------------------------------

module "org_backup_policy" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/org-backup-policy?ref=v0.46.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the backup policy
  name = <string>

  # Backup policies definition. For more detailed information, see
  # https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_backup_syntax.html#backup-policy-syntax-reference.
  plans = <map(object(
    rules = map(object(
      schedule_expression = object(
        assign = string
      )
      target_backup_vault_name = object(
        assign = string
      )
      start_backup_window_minutes = optional(object(
        assign = string
      ))
      complete_backup_window_minutes = optional(object(
        assign = string
      ))
      enable_continuous_backup = optional(bool)

      lifecycle = optional(object(
        move_to_cold_storage_after_days = object(
          assign = string
        )
        delete_after_days = object(
          assign = string
        )
      ))

      copy_actions = optional(map(object(
        target_backup_vault_arn = optional(object(
          assign = string
        ))
        lifecycle = optional(object(
          move_to_cold_storage_after_days = object(
            assign = string
          )
          delete_after_days = object(
            assign = string
          )
        ))
      )))

      recovery_point_tags = optional(map(object(
        tag_key = object(
          assign = string
        )
        tag_value = object(
          assign = string
        )
      )))
    ))
    selections = object(
      tags = map(object(
        iam_role_arn = optional(object(
          assign = string
        ))

        tag_key = object(
          assign = string
        )
        tag_value = object(
          assign = optional(list(string))
          append = optional(list(string))
          remove = optional(list(string))
        )
      ))
    )
    regions = object(
      assign = optional(list(string))
      append = optional(list(string))
      remove = optional(list(string))
    )
    advanced_backup_settings = optional(map(any))
    backup_plan_tags = optional(map(object(
      tag_key = object(
        assign = string
      )
      tag_value = object(
        assign = string
      )
    )))
  ))>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Default service role used in any selection tag if not specified
  backup_service_role_name = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ORG-BACKUP-POLICY MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/org-backup-policy?ref=v0.46.1"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the backup policy
  name = <string>

  # Backup policies definition. For more detailed information, see
  # https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_backup_syntax.html#backup-policy-syntax-reference.
  plans = <map(object(
    rules = map(object(
      schedule_expression = object(
        assign = string
      )
      target_backup_vault_name = object(
        assign = string
      )
      start_backup_window_minutes = optional(object(
        assign = string
      ))
      complete_backup_window_minutes = optional(object(
        assign = string
      ))
      enable_continuous_backup = optional(bool)

      lifecycle = optional(object(
        move_to_cold_storage_after_days = object(
          assign = string
        )
        delete_after_days = object(
          assign = string
        )
      ))

      copy_actions = optional(map(object(
        target_backup_vault_arn = optional(object(
          assign = string
        ))
        lifecycle = optional(object(
          move_to_cold_storage_after_days = object(
            assign = string
          )
          delete_after_days = object(
            assign = string
          )
        ))
      )))

      recovery_point_tags = optional(map(object(
        tag_key = object(
          assign = string
        )
        tag_value = object(
          assign = string
        )
      )))
    ))
    selections = object(
      tags = map(object(
        iam_role_arn = optional(object(
          assign = string
        ))

        tag_key = object(
          assign = string
        )
        tag_value = object(
          assign = optional(list(string))
          append = optional(list(string))
          remove = optional(list(string))
        )
      ))
    )
    regions = object(
      assign = optional(list(string))
      append = optional(list(string))
      remove = optional(list(string))
    )
    advanced_backup_settings = optional(map(any))
    backup_plan_tags = optional(map(object(
      tag_key = object(
        assign = string
      )
      tag_value = object(
        assign = string
      )
    )))
  ))>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Default service role used in any selection tag if not specified
  backup_service_role_name = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name of the backup policy

</HclListItemDescription>
</HclListItem>

<HclListItem name="plans" requirement="required" type="map(object(…))">
<HclListItemDescription>

Backup policies definition. For more detailed information, see https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_backup_syntax.html#backup-policy-syntax-reference.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    # The rules policy key maps to the Rules key in an AWS Backup plan.
    # You can have one or more rules under the rules key.
    # Each rule becomes a scheduled task to perform a backup of the selected resources.
    rules = map(object({

      # Specifies the start time of the backup defined with CRON expression.
      # The general format of the CRON string is: "cron( )". Each is a number or wildcard.
      # For example, cron(0 5 ? * 1,3,5 *)
      # This policy key maps to the `ScheduleExpression` key in an AWS Backup plan.
      schedule_expression = object({
        assign = string
      })

      # Specifies the name of the backup vault in which to store the backup.
      # You create the value by using AWS Backup.
      # This policy key maps to the `TargetBackupVaultName` key in an AWS Backup plan.
      target_backup_vault_name = object({
        assign = string
      })

      # Specifies the number of minutes to wait before canceling a job that does not start successfully.
      # This policy key maps to the `StartWindowMinutes` key in an AWS Backup plan.
      start_backup_window_minutes = optional(object({
        assign = string
      }))

      # Specifies the number of minutes after a backup job successfully starts before it must complete or it is canceled by AWS Backup.
      # This policy key maps to the `CompletionWindowMinutes` key in an AWS Backup plan.
      complete_backup_window_minutes = optional(object({
        assign = string
      }))

      # Specifies whether AWS Backup creates continuous backups
      # This policy key maps to the `EnableContinuousBackup` key in an AWS Backup plan.
      enable_continuous_backup = optional(bool)


      # Specifies when AWS Backup transitions this backup to cold storage and when it expires.
      # This policy key maps to the `Lifecycle` key in an AWS Backup plan.
      lifecycle = optional(object({

        # Specifies the number of days after the backup occurs before AWS Backup moves the recovery point to cold storage.
        # This policy key maps to the `MoveToColdStorageAfterDays` key in an AWS Backup plan
        move_to_cold_storage_after_days = object({
          assign = string
        })

        # Specifies the number of days after the backup occurs before AWS Backup deletes the recovery point.
        # This policy key maps to the `DeleteAfterDays` key in an AWS Backup plan.
        delete_after_days = object({
          assign = string
        })
      }))


      # Specifies that AWS Backup should copy the backup to one or more additional locations.
      # This policy key maps to the `CopyActions` key in an AWS Backup plan.
      copy_actions = optional(map(object({

        # Specifies the vault in which AWS Backup stores an additional copy of the backup.
        # This policy key maps to the `DestinationBackupVaultArn` key in an AWS Backup plan.
        target_backup_vault_arn = optional(object({
          assign = string
        }))

        # Specifies when AWS Backup transitions this copy of a backup to cold storage and when it expires.
        # This policy key maps to the `Lifecycle` key under the `CopyAction` key in an AWS Backup plan.
        lifecycle = optional(object({

          # Specifies the number of days after the backup occurs before AWS Backup moves the recovery point to cold storage.
          # This policy key maps to the `MoveToColdStorageAfterDays` key in an AWS Backup plan.
          move_to_cold_storage_after_days = object({
            assign = string
          })

          # Specifies the number of days after the backup occurs before AWS Backup deletes the recovery point.
          # This policy key maps to the `DeleteAfterDays` key in an AWS Backup plan.
          delete_after_days = object({
            assign = string
          })
        }))
      })))


      # Specifies tags that AWS Backup attaches to each backup that it creates from this plan.
      # This policy key maps to the `RecoveryPointTags` key in an AWS Backup plan.
      recovery_point_tags = optional(map(object({

        # Specifies the tag key name to attach to the backup plan
        tag_key = object({
          assign = string
        })

        #  Specifies the value that is attached to the backup plan and associated with the tag_key
        tag_value = object({
          assign = string
        })
      })))
    }))

    # The selections policy key specifies the resources that are backed up by the plan rules in this policy.
    # The resources are specified by a query for matching tag key names and values
    selections = object({
      tags = map(object({
        # Specifies the IAM role that has permission to access the resources identified by the tag query in the AWS Regions specified by the regions key
        # AWS Backup uses this role to query for and discover the resources and to perform the backup.
        # If not specified, it will use the default one created inside this module.
        iam_role_arn = optional(object({
          assign = string
        }))


        # Specifies the tag key name to search for
        tag_key = object({
          assign = string
        })
        # Specifies the value that must be associated with a key name that matches tag_key.
        # AWS Backup includes the resource in the backup only if both the tag_key and tag_value match
        tag_value = object({
          assign = optional(list(string))
          append = optional(list(string))
          remove = optional(list(string))
        })
      }))
    })

    # The regions policy key specifies which AWS Regions that AWS Backup looks in
    # to find the resources that match the conditions in the selections key.
    regions = object({
      assign = optional(list(string))
      append = optional(list(string))
      remove = optional(list(string))
    })

    # Specifies settings for specific backup scenarios. This key contains one or more settings
    # At this time, the only advanced backup setting that is supported enables Microsoft Volume Shadow Copy Service (VSS) backups for Windows or SQL Server running on an Amazon EC2 instance.
    # The key name must be the "ec2" resource type, and the value specifies that "windows_vss" support is either enabled or disabled for backups performed on those Amazon EC2 instances
    advanced_backup_settings = optional(map(any))

    # Specifies tags that are attached to the backup plan itself.
    # This does not impact the tags specified in any rules or selections.
    backup_plan_tags = optional(map(object({
      # Specifies the tag key name to attach to the backup plan.
      tag_key = object({
        assign = string
      })

      # Specifies the value that is attached to the backup plan and associated with the tag_key.
      tag_value = object({
        assign = string
      })
    })))
  }))
```

</HclListItemTypeDetails>
<HclGeneralListItem title="More Details">
<details>


```hcl

       Specifies the start time of the backup defined with CRON expression.
       The general format of the CRON string is: "cron( )". Each is a number or wildcard.
       For example, cron(0 5 ? * 1,3,5 *)
       This policy key maps to the `ScheduleExpression` key in an AWS Backup plan.

```
</details>

<details>


```hcl

       Specifies the name of the backup vault in which to store the backup.
       You create the value by using AWS Backup.
       This policy key maps to the `TargetBackupVaultName` key in an AWS Backup plan.

```
</details>

<details>


```hcl

       Specifies the number of minutes to wait before canceling a job that does not start successfully.
       This policy key maps to the `StartWindowMinutes` key in an AWS Backup plan.

```
</details>

<details>


```hcl

       Specifies the number of minutes after a backup job successfully starts before it must complete or it is canceled by AWS Backup.
       This policy key maps to the `CompletionWindowMinutes` key in an AWS Backup plan.

```
</details>

<details>


```hcl

       Specifies whether AWS Backup creates continuous backups
       This policy key maps to the `EnableContinuousBackup` key in an AWS Backup plan.

```
</details>

<details>


```hcl


       Specifies when AWS Backup transitions this backup to cold storage and when it expires.
       This policy key maps to the `Lifecycle` key in an AWS Backup plan.

```
</details>

<details>


```hcl

         Specifies the number of days after the backup occurs before AWS Backup moves the recovery point to cold storage.
         This policy key maps to the `MoveToColdStorageAfterDays` key in an AWS Backup plan

```
</details>

<details>


```hcl

         Specifies the number of days after the backup occurs before AWS Backup deletes the recovery point.
         This policy key maps to the `DeleteAfterDays` key in an AWS Backup plan.

```
</details>

<details>


```hcl


       Specifies that AWS Backup should copy the backup to one or more additional locations.
       This policy key maps to the `CopyActions` key in an AWS Backup plan.

```
</details>

<details>


```hcl

         Specifies the vault in which AWS Backup stores an additional copy of the backup.
         This policy key maps to the `DestinationBackupVaultArn` key in an AWS Backup plan.

```
</details>

<details>


```hcl

         Specifies when AWS Backup transitions this copy of a backup to cold storage and when it expires.
         This policy key maps to the `Lifecycle` key under the `CopyAction` key in an AWS Backup plan.

```
</details>

<details>


```hcl

           Specifies the number of days after the backup occurs before AWS Backup moves the recovery point to cold storage.
           This policy key maps to the `MoveToColdStorageAfterDays` key in an AWS Backup plan.

```
</details>

<details>


```hcl

           Specifies the number of days after the backup occurs before AWS Backup deletes the recovery point.
           This policy key maps to the `DeleteAfterDays` key in an AWS Backup plan.

```
</details>

<details>


```hcl


       Specifies tags that AWS Backup attaches to each backup that it creates from this plan.
       This policy key maps to the `RecoveryPointTags` key in an AWS Backup plan.

```
</details>

<details>


```hcl

         Specifies the tag key name to attach to the backup plan

```
</details>

<details>


```hcl

          Specifies the value that is attached to the backup plan and associated with the tag_key

```
</details>

<details>


```hcl

     The selections policy key specifies the resources that are backed up by the plan rules in this policy.
     The resources are specified by a query for matching tag key names and values

```
</details>

<details>


```hcl


         Specifies the tag key name to search for

```
</details>

<details>


```hcl

     The regions policy key specifies which AWS Regions that AWS Backup looks in
     to find the resources that match the conditions in the selections key.

```
</details>

<details>


```hcl

     Specifies settings for specific backup scenarios. This key contains one or more settings
     At this time, the only advanced backup setting that is supported enables Microsoft Volume Shadow Copy Service (VSS) backups for Windows or SQL Server running on an Amazon EC2 instance.
     The key name must be the "ec2" resource type, and the value specifies that "windows_vss" support is either enabled or disabled for backups performed on those Amazon EC2 instances

```
</details>

<details>


```hcl

     Specifies tags that are attached to the backup plan itself.
     This does not impact the tags specified in any rules or selections.

```
</details>

<details>


```hcl

       Specifies the value that is attached to the backup plan and associated with the tag_key.

```
</details>

</HclGeneralListItem>
</HclListItem>

### Optional

<HclListItem name="backup_service_role_name" requirement="optional" type="string">
<HclListItemDescription>

Default service role used in any selection tag if not specified

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="backup_policy_arn">
<HclListItemDescription>

ARN of the backup policies

</HclListItemDescription>
</HclListItem>

<HclListItem name="backup_policy_id">
<HclListItemDescription>

ID of the backup policies

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.46.1/modules/org-backup-policy/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.46.1/modules/org-backup-policy/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.46.1/modules/org-backup-policy/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "e7ef3e9c503b375ed3ea2e5f25d1c48a"
}
##DOCS-SOURCER-END -->
