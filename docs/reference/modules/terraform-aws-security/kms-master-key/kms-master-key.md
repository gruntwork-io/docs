---
title: "KMS Master Key Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.74.2" lastModifiedVersion="0.74.0"/>

# KMS Master Key Module

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v0.74.2/modules/kms-master-key" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.74.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module creates a new [Customer Master
Key (CMK)](http://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#master_keys) in [Amazon's Key Management
Service (KMS)](https://aws.amazon.com/kms/) as well as a [Key
Policy](http://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#key_permissions) that controls who has
access to the CMK.

A CMK is a key managed by AWS that you never see (and can therefore never compromise). You use use a CMK via the AWS API
to encrypt and decrypt small amounts of data and to generate [Data Keys](http://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#data-keys)
that can be used to encrypt and decrypt larger amounts of data.

Using the AWS API with KMS can be clumsy. For a more streamlined experience, try [gruntkms](https://github.com/gruntwork-io/gruntkms).

## Background

### What is KMS?

[Amazon's Key Management Service (KMS)](https://aws.amazon.com/kms/) is a managed service that makes it easy for you to
create and control the encryption keys used to encrypt your data, and uses Hardware Security Modules (HSMs) to protect
the security of your keys.

### What is a Customer Master Key?

A Customer Master Key (CMK) is a secret key that KMS stores and manages for you. You can use the CMK to encrypt small
amounts of data using the AWS APIs or a tool like [gruntkms](https://github.com/gruntwork-io/gruntkms). It is a "master"
key in the sense that you can also use a CMK to generate a "Data Key" that you can use in your own encryption algorithms
to encrypt and decrypt large amounts of data.

When you use a Data Key, you typically store it, encrypted via the CMK, in version control or co-located with your data
itself, and decrypt it via the AWS API or gruntkms whenever you need to use it to decrypt or encrypt data.

Amazon never grants you access to the CMK itself, only to operations that use the key.

### Managing a Key's Permissions with the Key Policy vs. IAM Policies

When you want to grant a permission on most AWS resources, you attach an [IAM Policy](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_examples.html)
to an IAM User, IAM Group, or IAM Role. This works well for most resources, but when it comes to CMK's, it means that any
admin-level IAM User has full access to all CMK's.

But maybe this isn't what you want. For example, suppose your DevOps team has admin-level access to your AWS account, but
they still shouldn't have access to a `prod` CMK used to encrypt production data. Fortunately, AWS gives us a solution
for such situations: the CMK Key Policy.

By default, only the permissions granted in a CMK Key Policy are honored. For example, the CMK Key Policy might
grant IAM User `jane.doe` the `kms:encrypt` and `kms:decrypt` permissions. But if `john.doe` has an IAM Policy that grants
him those same permissions on the CMK, that IAM Policy will actually have no effect.

If you do want to honor IAM Policies for a particular CMK, you can include a setting in the CMK Key Policy that
grants this permission to IAM. In this case, `jane.doe` will retain her rights granted from the CMK Key Policy, but now
`john.doe` will have access, too.

In general, we recommend using only the CMK Key Policy if possible. This has the benefit of explicitly declaring who has
access to the CMK, versus allowing any possible number of IAM Policy configurations to determine access. But the biggest
downside is that it's now possible to lock yourself out of the CMK, so if you're not confident about your ability to
manage the CMK, you may wish to use IAM policies. In addition, IAM is a central place for managing all permissions, whereas
using just the CMK Key Policy means you now need to update the Key Policy any time the perissions change, which may be
more onerous.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S KMS-MASTER-KEY MODULE
# ------------------------------------------------------------------------------------------------------

module "kms_master_key" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/kms-master-key?ref=v0.74.2"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Map of CMK names to spec for managing each key. Each entry in the map
  # corresponds to a key that will be created by this template.
  customer_master_keys = <any>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The default value to use for spec (specifies whether the key contains a
  # symmetric key or an asymmetric key pair and the encryption algorithms or
  # signing algorithms that the key supports). Applies to all keys, unless
  # overridden in the customer_master_keys map. Valid values: SYMMETRIC_DEFAULT,
  # RSA_2048, RSA_3072, RSA_4096, ECC_NIST_P256, ECC_NIST_P384, ECC_NIST_P521,
  # or ECC_SECG_P256K1.
  default_customer_master_key_spec = null

  # The default value to use for deletion_window_in_days (the number of days to
  # keep this KMS Master Key around after it has been marked for deletion).
  # Applies to all keys, unless overridden in the customer_master_keys map.
  default_deletion_window_in_days = 30

  # The default value to use for enable_key_rotation (whether or not to enable
  # automatic annual rotation of the KMS key). Applies to all keys, unless
  # overridden in the customer_master_keys map.
  default_enable_key_rotation = true

  # The default value to use for multi_region (whether to enable multi-region
  # replication for the KMS key). Applies to all keys, unless overridden in the
  # customer_master_keys map.
  default_multi_region = false

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # A map of tags to apply to all KMS Keys to be created. In this map variable,
  # the key is the tag name and the value  is the tag value.
  global_tags = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S KMS-MASTER-KEY MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/kms-master-key?ref=v0.74.2"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Map of CMK names to spec for managing each key. Each entry in the map
  # corresponds to a key that will be created by this template.
  customer_master_keys = <any>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The default value to use for spec (specifies whether the key contains a
  # symmetric key or an asymmetric key pair and the encryption algorithms or
  # signing algorithms that the key supports). Applies to all keys, unless
  # overridden in the customer_master_keys map. Valid values: SYMMETRIC_DEFAULT,
  # RSA_2048, RSA_3072, RSA_4096, ECC_NIST_P256, ECC_NIST_P384, ECC_NIST_P521,
  # or ECC_SECG_P256K1.
  default_customer_master_key_spec = null

  # The default value to use for deletion_window_in_days (the number of days to
  # keep this KMS Master Key around after it has been marked for deletion).
  # Applies to all keys, unless overridden in the customer_master_keys map.
  default_deletion_window_in_days = 30

  # The default value to use for enable_key_rotation (whether or not to enable
  # automatic annual rotation of the KMS key). Applies to all keys, unless
  # overridden in the customer_master_keys map.
  default_enable_key_rotation = true

  # The default value to use for multi_region (whether to enable multi-region
  # replication for the KMS key). Applies to all keys, unless overridden in the
  # customer_master_keys map.
  default_multi_region = false

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # A map of tags to apply to all KMS Keys to be created. In this map variable,
  # the key is the tag name and the value  is the tag value.
  global_tags = {}

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="customer_master_keys" requirement="required" type="any">
<HclListItemDescription>

Map of CMK names to spec for managing each key. Each entry in the map corresponds to a key that will be created by this template.

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
   - enable_key_rotation                     bool                  : Whether to enable automatic annual rotation of the KMS key.
   - multi_region                            bool                  : Whether to enable multi-region replication for the KMS key.
   - spec                                    string                : Specifies whether the key contains a symmetric key or an asymmetric key
                                                                     pair and the encryption algorithms or signing algorithms that the key
                                                                     supports. Valid values: SYMMETRIC_DEFAULT, RSA_2048, RSA_3072, RSA_4096,
                                                                     ECC_NIST_P256, ECC_NIST_P384, ECC_NIST_P521, or ECC_SECG_P256K1.
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
   - additional_principals   list(string)   : List of additional service principals. Useful when, for example, granting
                                              access to opt-in region service endpoints (e.g. guardduty.us-east-1.amazonaws.com).
  
   Structure of CMKUser object:
   - name          list(string)             : The list of names of the AWS principal (e.g.: arn:aws:iam::0000000000:user/dev).
   - conditions    list(object[Condition])  : (Optional) List of conditions to apply to the permissions for the CMK User
                                              Use this to apply conditions on the permissions for accessing the KMS key
                                              (e.g., only allow access for certain encryption contexts).
                                              The condition object accepts the same fields as the condition
                                              block on the IAM policy document (See
                                              https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/iam_policy_documentcondition).
   Example:
   customer_master_keys = {
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

<HclListItem name="default_customer_master_key_spec" requirement="optional" type="string">
<HclListItemDescription>

The default value to use for spec (specifies whether the key contains a symmetric key or an asymmetric key pair and the encryption algorithms or signing algorithms that the key supports). Applies to all keys, unless overridden in the customer_master_keys map. Valid values: SYMMETRIC_DEFAULT, RSA_2048, RSA_3072, RSA_4096, ECC_NIST_P256, ECC_NIST_P384, ECC_NIST_P521, or ECC_SECG_P256K1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

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

<HclListItem name="default_multi_region" requirement="optional" type="bool">
<HclListItemDescription>

The default value to use for multi_region (whether to enable multi-region replication for the KMS key). Applies to all keys, unless overridden in the customer_master_keys map.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="dependencies" requirement="optional" type="list(string)">
<HclListItemDescription>

Create a dependency between the resources in this module to the interpolated values in this list (and thus the source resources). In other words, the resources in this module will now depend on the resources backing the values in this list such that those resources need to be created before the resources in this module, and the resources in this module need to be destroyed before the resources in the list.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="global_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to all KMS Keys to be created. In this map variable, the key is the tag name and the value  is the tag value.

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
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.74.2/modules/kms-master-key/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.74.2/modules/kms-master-key/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.74.2/modules/kms-master-key/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "2889af69ac176fd513270967fbdf2339"
}
##DOCS-SOURCER-END -->
