---
title: "AWS KMS Customer Master Keys (CMK)"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.75.3" lastModifiedVersion="0.74.0"/>

# AWS KMS Customer Master Keys (CMK)

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.3/modules/kms-master-key-multi-region" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.74.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This repo contains a Module for creating and managing [AWS KMS Customer Master Keys](https://aws.amazon.com/kms/) that you can use for encrypting and decrypting data.

## Features

*   Create CMKs for multiple regions

*   Fine grained access control with IAM

*   Cross account CMK access

*   Automatic rotation of keys

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/)!

### Core concepts

*   [What is KMS?](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.3/modules/kms-master-key/README.md#what-is-kms)

*   [What is the difference between creating one key in all regions and creating a single all-region key?](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.3/modules/kms-master-key-multi-region/core-concepts.md#what-is-the-difference-between-creating-one-key-in-all-regions-and-creating-a-single-all-region-key)

*   [What is a Customer Master Key?](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.3/modules/kms-master-key/README.md#what-is-a-customer-master-key)

*   [KMS documentation](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html): Amazon’s docs for KMS that cover core concepts such as various key types, how to encrypt and decrypt, deletion of keys, and automatic key rotation.

*   [How to use a multi-region module](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.3/codegen/core-concepts.md#how-to-use-a-multi-region-module)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.3/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.

*   [examples](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.3/examples): This folder contains working examples of how to use the submodules.

*   [test](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.3/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this out for experimenting and learning, check out the following resources:

*   [examples folder](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.3/examples): The `examples` folder contains sample code optimized for learning, experimenting, and testing (but not production usage).

## Manage

*   [Differences between CMK Administrators vs. CMK Users](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.3/modules/kms-master-key/README.md#cmk-administrators-vs-cmk-users)

*   [Differences between managing access control with KMS key policies vs. IAM policies](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.3/modules/kms-master-key/README.md#managing-a-keys-permissions-with-the-key-policy-vs-iam-policies)

*   [What is the difference between KMS Grants and Key Policies?](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.3/modules/kms-grant-multi-region/core-concepts.md#what-is-the-difference-between-kms-grants-and-key-policies)

*   [How do I use KMS Grants to share encrypted AMIs across accounts?](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.3/modules/kms-grant-multi-region/core-concepts.md#how-do-i-use-kms-grants-to-share-encrypted-amis-across-accounts)

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S KMS-MASTER-KEY-MULTI-REGION MODULE
# ------------------------------------------------------------------------------------------------------

module "kms_master_key_multi_region" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/kms-master-key-multi-region?ref=v0.75.3"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS Account ID the template should be operated on. This avoids
  # misconfiguration errors caused by environment variables.
  aws_account_id = <string>

  # You can use this variable to create account-level KMS Customer Master Keys
  # (CMKs) for encrypting and decrypting data. This variable should be a map
  # where the keys are the names of the CMK and the values are an object that
  # defines the configuration for that CMK. See the comment below for the
  # configuration options you can set for each key.
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
  # Applies to all keys, unless overridden on a specific key in the
  # customer_master_keys map.
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
# DEPLOY GRUNTWORK'S KMS-MASTER-KEY-MULTI-REGION MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/kms-master-key-multi-region?ref=v0.75.3"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS Account ID the template should be operated on. This avoids
  # misconfiguration errors caused by environment variables.
  aws_account_id = <string>

  # You can use this variable to create account-level KMS Customer Master Keys
  # (CMKs) for encrypting and decrypting data. This variable should be a map
  # where the keys are the names of the CMK and the values are an object that
  # defines the configuration for that CMK. See the comment below for the
  # configuration options you can set for each key.
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
  # Applies to all keys, unless overridden on a specific key in the
  # customer_master_keys map.
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

<HclListItem name="aws_account_id" requirement="required" type="string">
<HclListItemDescription>

The AWS Account ID the template should be operated on. This avoids misconfiguration errors caused by environment variables.

</HclListItemDescription>
</HclListItem>

<HclListItem name="customer_master_keys" requirement="required" type="any">
<HclListItemDescription>

You can use this variable to create account-level KMS Customer Master Keys (CMKs) for encrypting and decrypting data. This variable should be a map where the keys are the names of the CMK and the values are an object that defines the configuration for that CMK. See the comment below for the configuration options you can set for each key.

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
   - region                                  string                : The region (e.g., us-west-2) where the key should be created. If null or
                                                                     omitted, the key will be created in all enabled regions. Any keys
                                                                     targeting an opted out region or invalid region string will show up in the
                                                                     invalid_cmk_inputs output.
   - replica_regions                         list(string)          : The regions (e.g., us-west-2) where the key should be replicated using the
                                                                     multi-region KMS key feature of AWS
                                                                     (https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html).
                                                                     When the special region "*" is included (e.g., replica_regions = ["*"]),
                                                                     the key will be replicated in all enabled regions. This is different from
                                                                     creating the key in every region using region = null - when creating
                                                                     the key in every region, a new different key is provisioned for each region.
                                                                     With replica_regions, the same key is replicated in every region such that
                                                                     it can decrypt the same encrypted data in each region.
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
   Structure of CMKUser object:
   - name          list(string)             : The list of names of the AWS principal (e.g.: arn:aws:iam::0000000000:user/dev).
   - conditions    list(object[Condition])  : (Optional) List of conditions to apply to the permissions for the CMK User
                                              Use this to apply conditions on the permissions for accessing the KMS key
                                              (e.g., only allow access for certain encryption contexts).
                                              The condition object accepts the same fields as the condition
                                              block on the IAM policy document (See
                                              https://www.terraform.io/docs/providers/aws/d/iam_policy_document.htmlcondition).
   Example:
   customer_master_keys = {
     cmk-stage = {
       region                                = "us-west-1"
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
       region                                = "us-east-1"
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

The default value to use for deletion_window_in_days (the number of days to keep this KMS Master Key around after it has been marked for deletion). Applies to all keys, unless overridden on a specific key in the customer_master_keys map.

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

<HclListItem name="invalid_cmk_inputs">
<HclListItemDescription>

Map of CMKs from the input <a href="#customer_master_keys"><code>customer_master_keys</code></a> that had an invalid region, and thus were not created. The structure of the map is the same as the input. This will only include KMS key inputs that were not created because the region attribute was invalid (either not a valid region identifier, the region is not enabled on the account, or the region is not included in the <a href="#opt_in_regions"><code>opt_in_regions</code></a> input).

</HclListItemDescription>
</HclListItem>

<HclListItem name="key_aliases">
<HclListItemDescription>

A map from region to aliases of the KMS CMKs (both primary and replica) that were created. The value will also be a map of the keys from the <a href="#customer_master_keys"><code>customer_master_keys</code></a> input variable to the corresponding aliases.

</HclListItemDescription>
</HclListItem>

<HclListItem name="key_arns">
<HclListItemDescription>

A map from region to ARNs of the KMS CMKs (both primary and replica) that were created. The value will also be a map of the keys from the <a href="#customer_master_keys"><code>customer_master_keys</code></a> input variable to the corresponding ARNs.

</HclListItemDescription>
</HclListItem>

<HclListItem name="key_ids">
<HclListItemDescription>

A map from region to IDs of the KMS CMKs (both primary and replica) that were created. The value will also be a map of the keys from the <a href="#customer_master_keys"><code>customer_master_keys</code></a> input variable to the corresponding IDs.

</HclListItemDescription>
</HclListItem>

<HclListItem name="primary_key_aliases">
<HclListItemDescription>

A map from region to aliases of the primary KMS CMKs that were created. The value will also be a map of the keys from the <a href="#customer_master_keys"><code>customer_master_keys</code></a> input variable to the corresponding aliases.

</HclListItemDescription>
</HclListItem>

<HclListItem name="primary_key_arns">
<HclListItemDescription>

A map from region to ARNs of the primary KMS CMKs that were created. The value will also be a map of the keys from the <a href="#customer_master_keys"><code>customer_master_keys</code></a> input variable to the corresponding ARNs.

</HclListItemDescription>
</HclListItem>

<HclListItem name="primary_key_ids">
<HclListItemDescription>

A map from region to IDs of the primary KMS CMKs that were created. The value will also be a map of the keys from the <a href="#customer_master_keys"><code>customer_master_keys</code></a> input variable to the corresponding IDs.

</HclListItemDescription>
</HclListItem>

<HclListItem name="replica_key_aliases">
<HclListItemDescription>

A map from region to aliases of the replica KMS CMKs that were created. The value will also be a map of the keys from the <a href="#customer_master_keys"><code>customer_master_keys</code></a> input variable to the corresponding aliases.

</HclListItemDescription>
</HclListItem>

<HclListItem name="replica_key_arns">
<HclListItemDescription>

A map from region to ARNs of the replica KMS CMKs that were created. The value will also be a map of the keys from the <a href="#customer_master_keys"><code>customer_master_keys</code></a> input variable to the corresponding ARNs.

</HclListItemDescription>
</HclListItem>

<HclListItem name="replica_key_ids">
<HclListItemDescription>

A map from region to IDs of the replica KMS CMKs that were created. The value will also be a map of the keys from the <a href="#customer_master_keys"><code>customer_master_keys</code></a> input variable to the corresponding IDs.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.3/modules/kms-master-key-multi-region/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.3/modules/kms-master-key-multi-region/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.3/modules/kms-master-key-multi-region/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "b224d6e4a9b0b7723fbf29d327890920"
}
##DOCS-SOURCER-END -->
