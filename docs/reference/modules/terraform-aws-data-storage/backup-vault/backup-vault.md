---
title: "Backup Vault Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Data Storage Modules" version="0.41.0" lastModifiedVersion="0.41.0"/>

# Backup Vault Module

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.41.0/modules/backup-vault" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.41.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module launches a [Backup Vault](https://docs.aws.amazon.com/aws-backup/latest/devguide/vaults.html) that you can use to store, organize and, optionally, preserve your AWS Backup recovery points against deletion.

## What is a Backup Vault?

A backup vault is a container for securing and organizing your Backup artifacts, such as EC2 AMIs, RDS Database recovery points, EBS volumes, et cetera. You can specify an AWS KMS key ID that will be used to encrypt resources in this vault that support encryption. Learn more in [the official AWS Backup encryption guide](https://docs.aws.amazon.com/aws-backup/latest/devguide/encryption.html).

Note that, once you have enabled AWS Backup support in a given region for your account, there will always be a default vault named `"Default"` (note the casing). You cannot delete the default backup vault.

You can opt to either associate Backup plans and selections with your default vault, or any custom vaults you create.

## What is a Backup Vault Lock?

Locks are an optional means of adding an additional layer of protection for your recovery points stored in a Backup Vault. If you opt to lock a vault, you will secure its recovery points against delete operations and any updates that would otherwise alter their retention period. This means you can use locks to enforce retention periods, prevent early or accidental deletions by privileged users, and generally meet any compliance and data protection requirements you may have.

See [the official AWS Backup Vault Lock guide](https://docs.aws.amazon.com/aws-backup/latest/devguide/vault-lock.html) for more information.

## How do you lock a vault?

To add a Vault lock when configuring a new vault with this module, set the `locked` attribute to true like so:

```hcl
module "backup_vault" {

  vaults = {
    locked-vault = {
      locked              = true
      changeable_for_days = 5
      min_retention_days  = 30
      max_retention_days  = 120
    }
  }
}
```

## How do you create a logically air-gapped vault?

AWS Backup supports logically air-gapped vaults that provide additional protection against ransomware and malicious actors. Air-gapped vaults can only receive recovery points from copy jobs and enforce strict retention policies. To create an air-gapped vault, set the `air_gapped` attribute to true:

```hcl
module "backup_vault" {

  vaults = {
    "air-gapped-vault" = {
      air_gapped         = true
      min_retention_days = 30
      max_retention_days = 120
    }
  }
}
```

Note: Air-gapped vaults cannot be locked using the vault lock feature and can only receive recovery points through copy actions from other vaults.

## How do you enable vault notifications?

Backup vaults can publish notifications to an SNS topic. This is useful when you want to monitor for any problems with your backup workflows. To enable notifications for a vault when configuring a new vault with this module, set the `enable_notifications` attribute to true like so:

```hcl
module "backup_vault" {

  ...

  vaults = {
    "vault-with-notifications-enabled" = {
        enable_notifications = true
        # If you wish to specify which AWS Backup events to listen to, you can pass them like so
        # If you do not pass events_to_listen_for, then all AWS Backup events will be listened for!
        events_to_listen_for = ["BACKUP_JOB_STARTED", "BACKUP_JOB_COMPLETED"]
    }
  }
}

```

## WARNING - It is important to understand that misuse of locks could lead to high AWS spend

For example, the following common conditions could all be true when you are developing against or testing AWS Backup. If:

1.  You create a lock for a vault
2.  the vault has a plan selecting many resources, for example, via widely used tags such as `Snapshot: true`
3.  Your account has many resources with matching tags
4.  Your lock takes effect, because you did not delete it during the 3 day cool-down period

then you will end up with many potentially large recovery points that you cannot delete and must pay for the storage of. **Use extreme caution when testing, developing or studying!**

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S BACKUP-VAULT MODULE
# ------------------------------------------------------------------------------------------------------

module "backup_vault" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/backup-vault?ref=v0.41.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  vaults = <any>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The cooling-off-period during which you can still delete the lock placed on
  # your vault. The AWS default is 3 days. After this period expires, YOUR LOCK
  # CANNOT BE DELETED
  default_changeable_for_days = 7

  # The ceiling of retention days that can be configured via a backup plan for
  # the given vault
  default_max_retention_days = 365

  # The minimum number of retention days that can be configured via a backup
  # plan for the given vault
  default_min_retention_days = 7

  # The ID of an AWS-managed customer master key (CMK) for Amazon SNS or a
  # custom CMK
  sns_topic_encryption_kms_key_id = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S BACKUP-VAULT MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/backup-vault?ref=v0.41.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  vaults = <any>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The cooling-off-period during which you can still delete the lock placed on
  # your vault. The AWS default is 3 days. After this period expires, YOUR LOCK
  # CANNOT BE DELETED
  default_changeable_for_days = 7

  # The ceiling of retention days that can be configured via a backup plan for
  # the given vault
  default_max_retention_days = 365

  # The minimum number of retention days that can be configured via a backup
  # plan for the given vault
  default_min_retention_days = 7

  # The ID of an AWS-managed customer master key (CMK) for Amazon SNS or a
  # custom CMK
  sns_topic_encryption_kms_key_id = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="vaults" requirement="required" type="any">
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
</HclListItem>

### Optional

<HclListItem name="default_changeable_for_days" requirement="optional" type="number">
<HclListItemDescription>

The cooling-off-period during which you can still delete the lock placed on your vault. The AWS default is 3 days. After this period expires, YOUR LOCK CANNOT BE DELETED

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="7"/>
</HclListItem>

<HclListItem name="default_max_retention_days" requirement="optional" type="number">
<HclListItemDescription>

The ceiling of retention days that can be configured via a backup plan for the given vault

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="365"/>
</HclListItem>

<HclListItem name="default_min_retention_days" requirement="optional" type="number">
<HclListItemDescription>

The minimum number of retention days that can be configured via a backup plan for the given vault

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="7"/>
</HclListItem>

<HclListItem name="sns_topic_encryption_kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of an AWS-managed customer master key (CMK) for Amazon SNS or a custom CMK

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="count_of_vault_locks">
<HclListItemDescription>

A sanity check count of the number of aws_backup_vault_lock_configurations that were applied to vaults

</HclListItemDescription>
</HclListItem>

<HclListItem name="count_of_vault_notifications">
<HclListItemDescription>

A sanity check count of the number of SNS topics that were created to support Backup vault notifications

</HclListItemDescription>
</HclListItem>

<HclListItem name="vault_arns">
<HclListItemDescription>

The ARNs of the Backup vaults

</HclListItemDescription>
</HclListItem>

<HclListItem name="vault_names">
<HclListItemDescription>

The names of the Backup vaults

</HclListItemDescription>
</HclListItem>

<HclListItem name="vault_recovery_points">
<HclListItemDescription>

The count of recovery points stored in each vault

</HclListItemDescription>
</HclListItem>

<HclListItem name="vault_sns_topic_arns">
<HclListItemDescription>

A list of the ARNs for any SNS topics that may have been created to support Backup vault notifications

</HclListItemDescription>
</HclListItem>

<HclListItem name="vault_tags_all">
<HclListItemDescription>

A map of tags assigned to the vault resources, including those inherited from the provider's default_tags block

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.41.0/modules/backup-vault/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.41.0/modules/backup-vault/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.41.0/modules/backup-vault/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "a3f058d02fab45591e078eef3eba4873"
}
##DOCS-SOURCER-END -->
