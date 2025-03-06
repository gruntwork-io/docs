---
title: "KMS Customer Managed Key Multi-Region Replication module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.75.11" lastModifiedVersion="0.75.1"/>

# KMS Customer Managed Key Multi-Region Replication module

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.11/modules/kms-cmk-replica" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.1" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module replicates an existing [KMS Customer Managed
Key](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#customer-cmk) to another region using
[the multi-region replication feature of
KMS](https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html).

This module is intended to be used in conjunction with the [kms-master-key module](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.11/modules/kms-master-key) to replicate a KMS
key managed with that module to other regions. Note that the KMS key must be marked as multi-region in order to support
multi-region replication.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S KMS-CMK-REPLICA MODULE
# ------------------------------------------------------------------------------------------------------

module "kms_cmk_replica" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/kms-cmk-replica?ref=v0.75.11"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Map of CMK names to the primary CMK that the replica key is replicating. The
  # primary key must already exist, and must be marked as multi_region = true.
  # Each entry in var.cmk_replicas must have a corresponding entry here.
  cmk_replica_primary_key_arns = <map(string)>

  # Map of CMK names to spec for managing each key. Each entry in the map
  # corresponds to a key that will be created by this template. Each entry in
  # this map must have a corresponding entry in
  # var.cmk_replica_primary_key_arns.
  cmk_replicas = <any>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The default value to use for deletion_window_in_days (the number of days to
  # keep this KMS Master Key around after it has been marked for deletion).
  # Applies to all keys, unless overridden in the customer_master_keys map.
  default_deletion_window_in_days = 30

  # The default value to use for enable_key_rotation (whether or not to enable
  # automatic annual rotation of the KMS key). Applies to all keys, unless
  # overridden in the customer_master_keys map.
  default_enable_key_rotation = true

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # A map of tags to apply to all KMS Keys to be created. In this map variable,
  # the key is the tag name and the value is the tag value.
  global_tags = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S KMS-CMK-REPLICA MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/kms-cmk-replica?ref=v0.75.11"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Map of CMK names to the primary CMK that the replica key is replicating. The
  # primary key must already exist, and must be marked as multi_region = true.
  # Each entry in var.cmk_replicas must have a corresponding entry here.
  cmk_replica_primary_key_arns = <map(string)>

  # Map of CMK names to spec for managing each key. Each entry in the map
  # corresponds to a key that will be created by this template. Each entry in
  # this map must have a corresponding entry in
  # var.cmk_replica_primary_key_arns.
  cmk_replicas = <any>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The default value to use for deletion_window_in_days (the number of days to
  # keep this KMS Master Key around after it has been marked for deletion).
  # Applies to all keys, unless overridden in the customer_master_keys map.
  default_deletion_window_in_days = 30

  # The default value to use for enable_key_rotation (whether or not to enable
  # automatic annual rotation of the KMS key). Applies to all keys, unless
  # overridden in the customer_master_keys map.
  default_enable_key_rotation = true

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # A map of tags to apply to all KMS Keys to be created. In this map variable,
  # the key is the tag name and the value is the tag value.
  global_tags = {}

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="cmk_replica_primary_key_arns" requirement="required" type="map(string)">
<HclListItemDescription>

Map of CMK names to the primary CMK that the replica key is replicating. The primary key must already exist, and must be marked as multi_region = true. Each entry in <a href="#cmk_replicas"><code>cmk_replicas</code></a> must have a corresponding entry here.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cmk_replicas" requirement="required" type="any">
<HclListItemDescription>

Map of CMK names to spec for managing each key. Each entry in the map corresponds to a key that will be created by this template. Each entry in this map must have a corresponding entry in <a href="#cmk_replica_primary_key_arns"><code>cmk_replica_primary_key_arns</code></a>.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Each entry in the map supports the following attributes:
  
   OPTIONAL (defaults to value of corresponding module input):
   - cmk_administrator_iam_arns              list(string)          : A list of IAM ARNs for users who should be given
                                                                     administrator access to this CMK (e.g.
                                                                     arn:aws:iam::<aws-account-id>:user/<iam-user-arn>).
   - cmk_user_iam_arns                       list(object[CMKUser]) : A list of IAM ARNs for users who should be given
                                                                     permissions to use this CMK (e.g.
                                                                     arn:aws:iam::<aws-account-id>:user/<iam-user-arn>).
   - cmk_read_only_user_iam_arns             list(object[CMKUser]) : A list of IAM ARNs for users who should be given
                                                                     read-only (decrypt-only) permissions to use this CMK (e.g.
                                                                     arn:aws:iam::<aws-account-id>:user/<iam-user-arn>).
   - cmk_describe_only_user_iam_arns         list(object[CMKUser]) : A list of IAM ARNs for users who should be given
                                                                     describe-only (kms:DescribeKey) permissions to use this CMK (e.g.
                                                                     arn:aws:iam::<aws-account-id>:user/<iam-user-arn>). This is
                                                                     useful for deploying services that depend on the
                                                                     key (e.g., Cloudtrail) in other accounts, to trade
                                                                     key aliases for CMK ARNs.
   - cmk_external_user_iam_arns              list(string)          : A list of IAM ARNs for users from external AWS accounts
                                                                     who should be given permissions to use this CMK (e.g.
                                                                     arn:aws:iam::<aws-account-id>:root).
   - allow_manage_key_permissions_with_iam   bool                  : If true, both the CMK's Key Policy and IAM Policies
                                                                     (permissions) can be used to grant permissions on the CMK.
                                                                     If false, only the CMK's Key Policy can be used to grant
                                                                     permissions on the CMK. False is more secure (and
                                                                     generally preferred), but true is more flexible and
                                                                     convenient.
   - deletion_window_in_days                 number                : The number of days to keep this KMS Master Key around after it has been
                                                                     marked for deletion.
   - tags                                    map(string)           : A map of tags to apply to the KMS Key to be created. In this map
                                                                     variable, the key is the tag name and the value  is the tag value. Note
                                                                     that this map is merged with var.global_tags, and can be used to override
                                                                     tags specified in that variable.
   - enable_key_rotation                     bool                  : Whether or not to enable automatic annual rotation of the KMS key.
   - cmk_service_principals                  list(object[ServicePrincipal]) : A list of Service Principals that should be given
                                                                              permissions to use this CMK (e.g. s3.amazonaws.com). See
                                                                              below for the structure of the object that should be passed
                                                                              in.
  
   Structure of ServicePrincipal object:
   - name          string                   : The name of the service principal (e.g.: s3.amazonaws.com).
   - actions       list(string)             : The list of actions that the given service principal is allowed to
                                              perform (e.g. ["kms:DescribeKey", "kms:GenerateDataKey"]).
   - conditions    list(object[Condition])  : (Optional) List of conditions to apply to the permissions for the service
                                              principal. Use this to apply conditions on the permissions for
                                              accessing the KMS key (e.g., only allow access for certain encryption
                                              contexts). The condition object accepts the same fields as the condition
                                              block on the IAM policy document (See
                                              https://www.terraform.io/docs/providers/aws/d/iam_policy_document.htmlcondition).
   Structure of CMKUser object:
   - name          list(string)             : The list of names of the AWS principal (e.g.: arn:aws:iam::0000000000:user/dev).
   - conditions    list(object[Condition])  : (Optional) List of conditions to apply to the permissions for the CMK User
                                              Use this to apply conditions on the permissions for accessing the KMS key
                                              (e.g., only allow access for certain encryption contexts).
                                              The condition object accepts the same fields as the condition
                                              block on the IAM policy document (See
                                              https://www.terraform.io/docs/providers/aws/d/iam_policy_document.htmlcondition).
   Example:
   cmk_replicas = {
     cmk-stage = {
       cmk_administrator_iam_arns            = ["arn:aws:iam::0000000000:user/admin"]
       cmk_user_iam_arns                     = [
         {
           name = ["arn:aws:iam::0000000000:user/dev"]
           conditions = []
         }
       ]
       cmk_read_only_user_iam_arns           = [
         {
           name = ["arn:aws:iam::0000000000:user/qa"]
           conditions = []
         }
       ]
       cmk_describe_only_user_iam_arns       = [
         {
           name = ["arn:aws:iam::0000000000:user/qa"]
           conditions = []
         }
       ]
       cmk_external_user_iam_arns            = ["arn:aws:iam::1111111111:user/root"]
       cmk_service_principals                = [
         {
           name       = "s3.amazonaws.com"
           actions    = ["kms:Encrypt"]
           conditions = []
         }
       ]
     }
     cmk-prod = {
       cmk_administrator_iam_arns            = ["arn:aws:iam::0000000000:user/admin"]
       cmk_user_iam_arns                     = [
         {
           name = ["arn:aws:iam::0000000000:user/prod"]
           conditions = []
         }
       ]
       allow_manage_key_permissions_with_iam = true
        Override the default value for all keys configured with var.default_deletion_window_in_days
       deletion_window_in_days = 7
  
        Set extra tags on the CMK for prod
       tags = {
         Environment = "prod"
       }
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

### Optional

<HclListItem name="default_deletion_window_in_days" requirement="optional" type="number">
<HclListItemDescription>

The default value to use for deletion_window_in_days (the number of days to keep this KMS Master Key around after it has been marked for deletion). Applies to all keys, unless overridden in the customer_master_keys map.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="default_enable_key_rotation" requirement="optional" type="bool">
<HclListItemDescription>

The default value to use for enable_key_rotation (whether or not to enable automatic annual rotation of the KMS key). Applies to all keys, unless overridden in the customer_master_keys map.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="dependencies" requirement="optional" type="list(string)">
<HclListItemDescription>

Create a dependency between the resources in this module to the interpolated values in this list (and thus the source resources). In other words, the resources in this module will now depend on the resources backing the values in this list such that those resources need to be created before the resources in this module, and the resources in this module need to be destroyed before the resources in the list.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="global_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to all KMS Keys to be created. In this map variable, the key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="key_alias">
<HclListItemDescription>

A map of CMK name to CMK alias.

</HclListItemDescription>
</HclListItem>

<HclListItem name="key_arn">
<HclListItemDescription>

A map of CMK name to CMK ARN.

</HclListItemDescription>
</HclListItem>

<HclListItem name="key_id">
<HclListItemDescription>

A map of CMK name to CMK ID.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.11/modules/kms-cmk-replica/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.11/modules/kms-cmk-replica/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.11/modules/kms-cmk-replica/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "c795c9a88701aeae9c97fb0bb050e3c7"
}
##DOCS-SOURCER-END -->
