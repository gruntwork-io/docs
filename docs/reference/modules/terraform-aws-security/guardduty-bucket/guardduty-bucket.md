---
title: "GuardDuty Bucket"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.75.17" lastModifiedVersion="0.71.5"/>

# GuardDuty Bucket

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.17/modules/guardduty-bucket" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.71.5" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module creates an S3 bucket for storing GuardDuty findings and optionally a KMS Customer Master Key (CMK) for encrypting that
data, including all the appropriate lifecycle, encryption, and permission settings for GuardDuty.

It is particularly useful when configuring cross account access, for example when it is desirable to [export findings](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_exportfindings.html) from multiple accounts and regions to a central location such as the security account.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S GUARDDUTY-BUCKET MODULE
# ------------------------------------------------------------------------------------------------------

module "guardduty_bucket" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/guardduty-bucket?ref=v0.75.17"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the S3 Bucket where GuardDuty findings will be stored.
  s3_bucket_name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Additional IAM policies to apply to this S3 bucket. You can use this to
  # grant read/write access. This should be a map, where each key is a unique
  # statement ID (SID), and each value is an object that contains the parameters
  # defined in the comment above.
  additional_bucket_policy_statements = {}

  # If true, an IAM Policy that grants access to the key will be honored. If
  # false, only the ARNs listed in var.kms_key_user_iam_arns will have access to
  # the key and any IAM Policy grants will be ignored. (true or false)
  allow_kms_access_with_iam = true

  # The AWS regions that are allowed to write to the GuardDuty findings S3
  # bucket. This is needed to configure the bucket and CMK policy to allow
  # writes from manually-enabled regions. See
  # https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_exportfindings.html#guardduty_exportfindings-s3-policies
  allowed_regions = []

  # Prefix directory to create in the bucket. Must contain a trailing '/'. If
  # you use a prefix for S3 findings publishing, you must pre-create the prefix
  # in the findings bucket. See
  # https://github.com/hashicorp/terraform-provider-aws/issues/16750.
  bucket_prefix = null

  # Whether or not to enable automatic annual rotation of the KMS key. Defaults
  # to true.
  enable_key_rotation = true

  # A list of external AWS accounts that should be given write access for
  # GuardDuty findings to this S3 bucket. This is useful when aggregating
  # findings for multiple AWS accounts in one common S3 bucket.
  external_aws_account_ids_with_write_access = []

  # If set to true, when you run 'terraform destroy', delete all objects from
  # the bucket so that the bucket can be destroyed without error. Warning: these
  # objects are not recoverable so only use this if you're absolutely sure you
  # want to permanently delete everything!
  force_destroy = false

  # All GuardDuty findings will be encrypted with a KMS Key (a Customer Master
  # Key). The IAM Users specified in this list will have rights to change who
  # can access the data.
  kms_key_administrator_iam_arns = []

  # Override KMS key alias. Defaults to var.s3_bucket_name.
  kms_key_alias = null

  # If set to true, that means the KMS key you're using already exists, and does
  # not need to be created.
  kms_key_already_exists = false

  # All GuardDuty findings will be encrypted with a KMS CMK (Customer Master
  # Key). If that CMK already exists (e.g., if this is the stage or prod account
  # and you want to use a CMK that already exists in the security account), set
  # this to the ARN of that CMK. Otherwise (e.g., if this is the security
  # account), set this to null, and a new CMK will be created.
  kms_key_arn = null

  # The number of days to keep the created KMS Key (a Customer Master Key)
  # around after it has been marked for deletion.
  kms_key_deletion_window_in_days = 15

  # Additional service principals beyond GuardDuty that should have access to
  # the KMS key used to encrypt the logs.
  kms_key_service_principals = []

  # All GuardDuty findings will be encrypted with a KMS Key (a Customer Master
  # Key). The IAM Users specified in this list will have read-only access to the
  # data.
  kms_key_user_iam_arns = []

  # After this number of days, findings should be transitioned from S3 to
  # Glacier. Enter 0 to never archive findings.
  num_days_after_which_archive_findings_data = 30

  # After this number of days, log files should be deleted from S3. Enter 0 to
  # never delete log data.
  num_days_after_which_delete_findings_data = null

  # Enable MFA delete for either 'Change the versioning state of your bucket' or
  # 'Permanently delete an object version'. This setting only applies to the
  # bucket used to storage GuardDuty findings. This cannot be used to toggle
  # this setting but is available to allow managed buckets to reflect the state
  # in AWS. For instructions on how to enable MFA Delete, check out the README
  # from the terraform-aws-security/private-s3-bucket module.
  s3_mfa_delete = false

  # Tags to apply to the GuardDuty findings resources (S3 bucket and CMK).
  tags = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S GUARDDUTY-BUCKET MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/guardduty-bucket?ref=v0.75.17"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the S3 Bucket where GuardDuty findings will be stored.
  s3_bucket_name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Additional IAM policies to apply to this S3 bucket. You can use this to
  # grant read/write access. This should be a map, where each key is a unique
  # statement ID (SID), and each value is an object that contains the parameters
  # defined in the comment above.
  additional_bucket_policy_statements = {}

  # If true, an IAM Policy that grants access to the key will be honored. If
  # false, only the ARNs listed in var.kms_key_user_iam_arns will have access to
  # the key and any IAM Policy grants will be ignored. (true or false)
  allow_kms_access_with_iam = true

  # The AWS regions that are allowed to write to the GuardDuty findings S3
  # bucket. This is needed to configure the bucket and CMK policy to allow
  # writes from manually-enabled regions. See
  # https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_exportfindings.html#guardduty_exportfindings-s3-policies
  allowed_regions = []

  # Prefix directory to create in the bucket. Must contain a trailing '/'. If
  # you use a prefix for S3 findings publishing, you must pre-create the prefix
  # in the findings bucket. See
  # https://github.com/hashicorp/terraform-provider-aws/issues/16750.
  bucket_prefix = null

  # Whether or not to enable automatic annual rotation of the KMS key. Defaults
  # to true.
  enable_key_rotation = true

  # A list of external AWS accounts that should be given write access for
  # GuardDuty findings to this S3 bucket. This is useful when aggregating
  # findings for multiple AWS accounts in one common S3 bucket.
  external_aws_account_ids_with_write_access = []

  # If set to true, when you run 'terraform destroy', delete all objects from
  # the bucket so that the bucket can be destroyed without error. Warning: these
  # objects are not recoverable so only use this if you're absolutely sure you
  # want to permanently delete everything!
  force_destroy = false

  # All GuardDuty findings will be encrypted with a KMS Key (a Customer Master
  # Key). The IAM Users specified in this list will have rights to change who
  # can access the data.
  kms_key_administrator_iam_arns = []

  # Override KMS key alias. Defaults to var.s3_bucket_name.
  kms_key_alias = null

  # If set to true, that means the KMS key you're using already exists, and does
  # not need to be created.
  kms_key_already_exists = false

  # All GuardDuty findings will be encrypted with a KMS CMK (Customer Master
  # Key). If that CMK already exists (e.g., if this is the stage or prod account
  # and you want to use a CMK that already exists in the security account), set
  # this to the ARN of that CMK. Otherwise (e.g., if this is the security
  # account), set this to null, and a new CMK will be created.
  kms_key_arn = null

  # The number of days to keep the created KMS Key (a Customer Master Key)
  # around after it has been marked for deletion.
  kms_key_deletion_window_in_days = 15

  # Additional service principals beyond GuardDuty that should have access to
  # the KMS key used to encrypt the logs.
  kms_key_service_principals = []

  # All GuardDuty findings will be encrypted with a KMS Key (a Customer Master
  # Key). The IAM Users specified in this list will have read-only access to the
  # data.
  kms_key_user_iam_arns = []

  # After this number of days, findings should be transitioned from S3 to
  # Glacier. Enter 0 to never archive findings.
  num_days_after_which_archive_findings_data = 30

  # After this number of days, log files should be deleted from S3. Enter 0 to
  # never delete log data.
  num_days_after_which_delete_findings_data = null

  # Enable MFA delete for either 'Change the versioning state of your bucket' or
  # 'Permanently delete an object version'. This setting only applies to the
  # bucket used to storage GuardDuty findings. This cannot be used to toggle
  # this setting but is available to allow managed buckets to reflect the state
  # in AWS. For instructions on how to enable MFA Delete, check out the README
  # from the terraform-aws-security/private-s3-bucket module.
  s3_mfa_delete = false

  # Tags to apply to the GuardDuty findings resources (S3 bucket and CMK).
  tags = {}

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="s3_bucket_name" requirement="required" type="string">
<HclListItemDescription>

The name of the S3 Bucket where GuardDuty findings will be stored.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="additional_bucket_policy_statements" requirement="optional" type="any">
<HclListItemDescription>

Additional IAM policies to apply to this S3 bucket. You can use this to grant read/write access. This should be a map, where each key is a unique statement ID (SID), and each value is an object that contains the parameters defined in the comment above.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   {
      AllIamUsersReadAccess = {
        effect     = "Allow"
        actions    = ["s3:GetObject"]
        principals = {
          AWS = ["arn:aws:iam::111111111111:user/ann", "arn:aws:iam::111111111111:user/bob"]
        }
        condition = {
          SourceVPCCheck = {
            test = "StringEquals"
            variable = "aws:SourceVpc"
            values = ["vpc-abcd123"]
          }
        }
      }
   }

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Ideally, this would be a map(object({...})), but the Terraform object type constraint doesn't support optional
   parameters, whereas IAM policy statements have many optional params. And we can't even use map(any), as the
   Terraform map type constraint requires all values to have the same type ("shape"), but as each object in the map
   may specify different optional params, this won't work either. So, sadly, we are forced to fall back to "any."

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="allow_kms_access_with_iam" requirement="optional" type="bool">
<HclListItemDescription>

If true, an IAM Policy that grants access to the key will be honored. If false, only the ARNs listed in <a href="#kms_key_user_iam_arns"><code>kms_key_user_iam_arns</code></a> will have access to the key and any IAM Policy grants will be ignored. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="allowed_regions" requirement="optional" type="list(string)">
<HclListItemDescription>

The AWS regions that are allowed to write to the GuardDuty findings S3 bucket. This is needed to configure the bucket and CMK policy to allow writes from manually-enabled regions. See https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_exportfindings.html#guardduty_exportfindings-s3-policies

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="bucket_prefix" requirement="optional" type="string">
<HclListItemDescription>

Prefix directory to create in the bucket. Must contain a trailing '/'. If you use a prefix for S3 findings publishing, you must pre-create the prefix in the findings bucket. See https://github.com/hashicorp/terraform-provider-aws/issues/16750.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="enable_key_rotation" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to enable automatic annual rotation of the KMS key. Defaults to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="external_aws_account_ids_with_write_access" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of external AWS accounts that should be given write access for GuardDuty findings to this S3 bucket. This is useful when aggregating findings for multiple AWS accounts in one common S3 bucket.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="force_destroy" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, when you run 'terraform destroy', delete all objects from the bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="kms_key_administrator_iam_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

All GuardDuty findings will be encrypted with a KMS Key (a Customer Master Key). The IAM Users specified in this list will have rights to change who can access the data.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="kms_key_alias" requirement="optional" type="string">
<HclListItemDescription>

Override KMS key alias. Defaults to <a href="#s3_bucket_name"><code>s3_bucket_name</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="kms_key_already_exists" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, that means the KMS key you're using already exists, and does not need to be created.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

All GuardDuty findings will be encrypted with a KMS CMK (Customer Master Key). If that CMK already exists (e.g., if this is the stage or prod account and you want to use a CMK that already exists in the security account), set this to the ARN of that CMK. Otherwise (e.g., if this is the security account), set this to null, and a new CMK will be created.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="kms_key_deletion_window_in_days" requirement="optional" type="number">
<HclListItemDescription>

The number of days to keep the created KMS Key (a Customer Master Key) around after it has been marked for deletion.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="15"/>
</HclListItem>

<HclListItem name="kms_key_service_principals" requirement="optional" type="list(object(…))">
<HclListItemDescription>

Additional service principals beyond GuardDuty that should have access to the KMS key used to encrypt the logs.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    # The name of the service principal (e.g.: s3.amazonaws.com).
    name = string

    # The list of actions that the given service principal is allowed to perform (e.g. ["kms:DescribeKey",
    # "kms:GenerateDataKey"]).
    actions = list(string)

    # List of additional service principals. Useful when, for example, granting
    # access to opt-in region service endpoints (e.g. guardduty.us-east-1.amazonaws.com).
    additional_principals = list(string)

    # List of conditions to apply to the permissions for the service principal. Use this to apply conditions on the
    # permissions for accessing the KMS key (e.g., only allow access for certain encryption contexts).
    conditions = list(object({
      # Name of the IAM condition operator to evaluate.
      test = string

      # Name of a Context Variable to apply the condition to. Context variables may either be standard AWS variables
      # starting with aws: or service-specific variables prefixed with the service name.
      variable = string

      # Values to evaluate the condition against. If multiple values are provided, the condition matches if at least one
      # of them applies. That is, AWS evaluates multiple values as though using an "OR" boolean operation.
      values = list(string)
    }))
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

     The list of actions that the given service principal is allowed to perform (e.g. ["kms:DescribeKey",
     "kms:GenerateDataKey"]).

```
</details>

<details>


```hcl

     List of additional service principals. Useful when, for example, granting
     access to opt-in region service endpoints (e.g. guardduty.us-east-1.amazonaws.com).

```
</details>

<details>


```hcl

     List of conditions to apply to the permissions for the service principal. Use this to apply conditions on the
     permissions for accessing the KMS key (e.g., only allow access for certain encryption contexts).

```
</details>

<details>


```hcl

       Name of a Context Variable to apply the condition to. Context variables may either be standard AWS variables
       starting with aws: or service-specific variables prefixed with the service name.

```
</details>

<details>


```hcl

       Values to evaluate the condition against. If multiple values are provided, the condition matches if at least one
       of them applies. That is, AWS evaluates multiple values as though using an "OR" boolean operation.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="kms_key_user_iam_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

All GuardDuty findings will be encrypted with a KMS Key (a Customer Master Key). The IAM Users specified in this list will have read-only access to the data.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="num_days_after_which_archive_findings_data" requirement="optional" type="number">
<HclListItemDescription>

After this number of days, findings should be transitioned from S3 to Glacier. Enter 0 to never archive findings.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="num_days_after_which_delete_findings_data" requirement="optional" type="number">
<HclListItemDescription>

After this number of days, log files should be deleted from S3. Enter 0 to never delete log data.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="s3_mfa_delete" requirement="optional" type="bool">
<HclListItemDescription>

Enable MFA delete for either 'Change the versioning state of your bucket' or 'Permanently delete an object version'. This setting only applies to the bucket used to storage GuardDuty findings. This cannot be used to toggle this setting but is available to allow managed buckets to reflect the state in AWS. For instructions on how to enable MFA Delete, check out the README from the terraform-aws-security/private-s3-bucket module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags to apply to the GuardDuty findings resources (S3 bucket and CMK).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="kms_key_alias_name">
<HclListItemDescription>

The alias of the KMS key used by the S3 bucket to encrypt GuardDuty findings.

</HclListItemDescription>
</HclListItem>

<HclListItem name="kms_key_arn">
<HclListItemDescription>

The ARN of the KMS key used by the S3 bucket to encrypt GuardDuty findings.

</HclListItemDescription>
</HclListItem>

<HclListItem name="s3_bucket_arn">
<HclListItemDescription>

The ARN of the S3 bucket where GuardDuty findings are delivered.

</HclListItemDescription>
</HclListItem>

<HclListItem name="s3_bucket_name">
<HclListItemDescription>

The name of the S3 bucket where GuardDuty findings are delivered.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.17/modules/guardduty-bucket/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.17/modules/guardduty-bucket/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.17/modules/guardduty-bucket/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "ac3b5a3ecd2cbe24488c99bf2605e208"
}
##DOCS-SOURCER-END -->
