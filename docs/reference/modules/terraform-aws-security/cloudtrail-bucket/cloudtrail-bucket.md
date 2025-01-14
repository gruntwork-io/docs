---
title: "CloudTrail Bucket"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.75.3" lastModifiedVersion="0.69.2"/>

# CloudTrail Bucket

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.3/modules/cloudtrail-bucket" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.69.2" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module creates an S3 bucket for storing CloudTrail data and a KMS Customer Master Key (CMK) for encrypting that
data, including all the appropriate lifecycle, encryption, and permission settings for CloudTrail.

This module is used under the hood in the [cloudtrail](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.3/modules/cloudtrail)
and [account-baseline-root](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.3/modules/account-baseline-root) modules.

It can also be used directly when configuring cross account access, for example when it is desirable to [have the central Cloudtrail S3 bucket exist outside of the management account.](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.3/modules/cloudtrail/core-concepts.md#multi-account-cloudtrail-setup-storing-the-cloudtrail-bucket-in-an-account-other-than-the-management-account)

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CLOUDTRAIL-BUCKET MODULE
# ------------------------------------------------------------------------------------------------------

module "cloudtrail_bucket" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/cloudtrail-bucket?ref=v0.75.3"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # If true, an IAM Policy that grants access to CloudTrail will be honored. If
  # false, only the ARNs listed in var.kms_key_user_iam_arns will have access to
  # CloudTrail and any IAM Policy grants will be ignored. (true or false)
  allow_cloudtrail_access_with_iam = <bool>

  # All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key)
  # that governs access to write API calls older than 7 days and all read API
  # calls. The IAM Users specified in this list will have rights to change who
  # can access this extended log data.
  kms_key_administrator_iam_arns = <list(string)>

  # All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key)
  # that governs access to write API calls older than 7 days and all read API
  # calls. The IAM Users specified in this list will have read-only access to
  # this extended log data.
  kms_key_user_iam_arns = <list(string)>

  # The name of the S3 Bucket where CloudTrail logs will be stored.
  s3_bucket_name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # When access logging is enabled, set this to the name of a preexisting S3
  # bucket where access logs should flow to. If null, this module will create a
  # separate bucket to store s3 logs.
  access_logging_bucket = null

  # A prefix (i.e., folder path) to use for all access logs stored in
  # access_logging_bucket. Only used if access_logging_enabled is true.
  access_logging_prefix = null

  # Additional IAM policies to apply to this S3 bucket. You can use this to
  # grant read/write access beyond what is provided to Cloudtrail. This should
  # be a map, where each key is a unique statement ID (SID), and each value is
  # an object that contains the parameters defined in the comment below.
  additional_bucket_policy_statements = null

  # Whether or not to allow kms:DescribeKey to external AWS accounts with write
  # access to the bucket. This is useful during deployment so that you don't
  # have to pass around the KMS key ARN.
  allow_kms_describe_key_to_external_aws_accounts = false

  # Optional whether or not to use Amazon S3 Bucket Keys for SSE-KMS.
  bucket_key_enabled = false

  # The name to assign to the CloudTrail 'trail' that will be used to track all
  # API calls in your AWS account.
  cloudtrail_trail_name = "full-account"

  # Set to false to have this module skip creating resources. This weird
  # parameter exists solely because Terraform does not support conditional
  # modules. Therefore, this is a hack to allow you to conditionally decide if
  # the resources in this module should be created or not.
  create_resources = true

  # The ID of the current AWS account. Normally, we can fetch this automatically
  # using the aws_caller_identity data source, but due to Terraform limitations,
  # in some rare situations, this data source returns the wrong ID, so this
  # parameter needs to be passed manually. Most users can leave this value
  # unset. See
  # https://github.com/gruntwork-io/terraform-aws-security/pull/308#issuecomment-676561441
  # for context.
  current_account_id = null

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # Whether or not to enable automatic annual rotation of the KMS key. Defaults
  # to true.
  enable_key_rotation = true

  # Enables S3 server access logging which sends detailed records for the
  # requests that are made to the bucket. Defaults to false.
  enable_s3_server_access_logging = false

  # A list of external AWS accounts that should be given write access for
  # CloudTrail logs to this S3 bucket. This is useful when aggregating
  # CloudTrail logs for multiple AWS accounts in one common S3 bucket.
  external_aws_account_ids_with_write_access = []

  # If set to true, when you run 'terraform destroy', delete all objects from
  # the bucket so that the bucket can be destroyed without error. Warning: these
  # objects are not recoverable so only use this if you're absolutely sure you
  # want to permanently delete everything!
  force_destroy = false

  # If set to true, that means the KMS key you're using already exists, and does
  # not need to be created.
  kms_key_already_exists = false

  # If you wish to specify a custom KMS key, then specify the key arn using this
  # variable. This is especially useful when using CloudTrail with multiple AWS
  # accounts, so the logs are all encrypted using the same key.
  kms_key_arn = null

  # The number of days to keep this KMS Key (a Customer Master Key) around after
  # it has been marked for deletion.
  kms_key_deletion_window_in_days = 15

  # Additional service principals beyond CloudTrail that should have access to
  # the KMS key used to encrypt the logs. This is useful for granting access to
  # the logs for the purposes of constructing metric filters.
  kms_key_service_principals = []

  # Enable MFA delete for either 'Change the versioning state of your bucket' or
  # 'Permanently delete an object version'. This cannot be used to toggle this
  # setting but is available to allow managed buckets to reflect the state in
  # AWS. For instructions on how to enable MFA Delete, check out the README from
  # the private-s3-bucket module. CIS v1.4 requires this variable to be true. If
  # you do not wish to be CIS-compliant, you can set it to false.
  mfa_delete = false

  # After this number of days, log files should be transitioned from S3 to
  # Glacier. Enter 0 to never archive log data.
  num_days_after_which_archive_log_data = 30

  # After this number of days, log files should be deleted from S3. If null,
  # never delete.
  num_days_after_which_delete_log_data = null

  # The ID of the organization. Required only if an organization wide CloudTrail
  # is being setup. In such a case, this ensures that the entire organization is
  # whitelisted in the CloudTrail bucket write policy.
  organization_id = null

  # Set to true to enable replication for this bucket. You can set the role to
  # use for replication using the replication_role parameter and the rules for
  # replication using the replication_rules parameter.
  replication_enabled = false

  # The ARN of the IAM role for Amazon S3 to assume when replicating objects.
  # Only used if replication_enabled is set to true.
  replication_role = null

  # The rules for managing replication. Only used if replication_enabled is set
  # to true. This should be a map, where the key is a unique ID for each
  # replication rule and the value is an object of the form explained in a
  # comment above.
  replication_rules = {}

  # A map of tags to apply to the S3 Bucket, CloudTrail KMS Key, and CloudTrail
  # itself. The key is the tag name and the value is the tag value.
  tags = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CLOUDTRAIL-BUCKET MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/cloudtrail-bucket?ref=v0.75.3"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # If true, an IAM Policy that grants access to CloudTrail will be honored. If
  # false, only the ARNs listed in var.kms_key_user_iam_arns will have access to
  # CloudTrail and any IAM Policy grants will be ignored. (true or false)
  allow_cloudtrail_access_with_iam = <bool>

  # All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key)
  # that governs access to write API calls older than 7 days and all read API
  # calls. The IAM Users specified in this list will have rights to change who
  # can access this extended log data.
  kms_key_administrator_iam_arns = <list(string)>

  # All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key)
  # that governs access to write API calls older than 7 days and all read API
  # calls. The IAM Users specified in this list will have read-only access to
  # this extended log data.
  kms_key_user_iam_arns = <list(string)>

  # The name of the S3 Bucket where CloudTrail logs will be stored.
  s3_bucket_name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # When access logging is enabled, set this to the name of a preexisting S3
  # bucket where access logs should flow to. If null, this module will create a
  # separate bucket to store s3 logs.
  access_logging_bucket = null

  # A prefix (i.e., folder path) to use for all access logs stored in
  # access_logging_bucket. Only used if access_logging_enabled is true.
  access_logging_prefix = null

  # Additional IAM policies to apply to this S3 bucket. You can use this to
  # grant read/write access beyond what is provided to Cloudtrail. This should
  # be a map, where each key is a unique statement ID (SID), and each value is
  # an object that contains the parameters defined in the comment below.
  additional_bucket_policy_statements = null

  # Whether or not to allow kms:DescribeKey to external AWS accounts with write
  # access to the bucket. This is useful during deployment so that you don't
  # have to pass around the KMS key ARN.
  allow_kms_describe_key_to_external_aws_accounts = false

  # Optional whether or not to use Amazon S3 Bucket Keys for SSE-KMS.
  bucket_key_enabled = false

  # The name to assign to the CloudTrail 'trail' that will be used to track all
  # API calls in your AWS account.
  cloudtrail_trail_name = "full-account"

  # Set to false to have this module skip creating resources. This weird
  # parameter exists solely because Terraform does not support conditional
  # modules. Therefore, this is a hack to allow you to conditionally decide if
  # the resources in this module should be created or not.
  create_resources = true

  # The ID of the current AWS account. Normally, we can fetch this automatically
  # using the aws_caller_identity data source, but due to Terraform limitations,
  # in some rare situations, this data source returns the wrong ID, so this
  # parameter needs to be passed manually. Most users can leave this value
  # unset. See
  # https://github.com/gruntwork-io/terraform-aws-security/pull/308#issuecomment-676561441
  # for context.
  current_account_id = null

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # Whether or not to enable automatic annual rotation of the KMS key. Defaults
  # to true.
  enable_key_rotation = true

  # Enables S3 server access logging which sends detailed records for the
  # requests that are made to the bucket. Defaults to false.
  enable_s3_server_access_logging = false

  # A list of external AWS accounts that should be given write access for
  # CloudTrail logs to this S3 bucket. This is useful when aggregating
  # CloudTrail logs for multiple AWS accounts in one common S3 bucket.
  external_aws_account_ids_with_write_access = []

  # If set to true, when you run 'terraform destroy', delete all objects from
  # the bucket so that the bucket can be destroyed without error. Warning: these
  # objects are not recoverable so only use this if you're absolutely sure you
  # want to permanently delete everything!
  force_destroy = false

  # If set to true, that means the KMS key you're using already exists, and does
  # not need to be created.
  kms_key_already_exists = false

  # If you wish to specify a custom KMS key, then specify the key arn using this
  # variable. This is especially useful when using CloudTrail with multiple AWS
  # accounts, so the logs are all encrypted using the same key.
  kms_key_arn = null

  # The number of days to keep this KMS Key (a Customer Master Key) around after
  # it has been marked for deletion.
  kms_key_deletion_window_in_days = 15

  # Additional service principals beyond CloudTrail that should have access to
  # the KMS key used to encrypt the logs. This is useful for granting access to
  # the logs for the purposes of constructing metric filters.
  kms_key_service_principals = []

  # Enable MFA delete for either 'Change the versioning state of your bucket' or
  # 'Permanently delete an object version'. This cannot be used to toggle this
  # setting but is available to allow managed buckets to reflect the state in
  # AWS. For instructions on how to enable MFA Delete, check out the README from
  # the private-s3-bucket module. CIS v1.4 requires this variable to be true. If
  # you do not wish to be CIS-compliant, you can set it to false.
  mfa_delete = false

  # After this number of days, log files should be transitioned from S3 to
  # Glacier. Enter 0 to never archive log data.
  num_days_after_which_archive_log_data = 30

  # After this number of days, log files should be deleted from S3. If null,
  # never delete.
  num_days_after_which_delete_log_data = null

  # The ID of the organization. Required only if an organization wide CloudTrail
  # is being setup. In such a case, this ensures that the entire organization is
  # whitelisted in the CloudTrail bucket write policy.
  organization_id = null

  # Set to true to enable replication for this bucket. You can set the role to
  # use for replication using the replication_role parameter and the rules for
  # replication using the replication_rules parameter.
  replication_enabled = false

  # The ARN of the IAM role for Amazon S3 to assume when replicating objects.
  # Only used if replication_enabled is set to true.
  replication_role = null

  # The rules for managing replication. Only used if replication_enabled is set
  # to true. This should be a map, where the key is a unique ID for each
  # replication rule and the value is an object of the form explained in a
  # comment above.
  replication_rules = {}

  # A map of tags to apply to the S3 Bucket, CloudTrail KMS Key, and CloudTrail
  # itself. The key is the tag name and the value is the tag value.
  tags = {}

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="allow_cloudtrail_access_with_iam" requirement="required" type="bool">
<HclListItemDescription>

If true, an IAM Policy that grants access to CloudTrail will be honored. If false, only the ARNs listed in <a href="#kms_key_user_iam_arns"><code>kms_key_user_iam_arns</code></a> will have access to CloudTrail and any IAM Policy grants will be ignored. (true or false)

</HclListItemDescription>
</HclListItem>

<HclListItem name="kms_key_administrator_iam_arns" requirement="required" type="list(string)">
<HclListItemDescription>

All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key) that governs access to write API calls older than 7 days and all read API calls. The IAM Users specified in this list will have rights to change who can access this extended log data.

</HclListItemDescription>
<HclGeneralListItem title="More Details">
<details>


```hcl

   example = ["arn:aws:iam::<aws-account-id>:user/<iam-user-name>"]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="kms_key_user_iam_arns" requirement="required" type="list(string)">
<HclListItemDescription>

All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key) that governs access to write API calls older than 7 days and all read API calls. The IAM Users specified in this list will have read-only access to this extended log data.

</HclListItemDescription>
</HclListItem>

<HclListItem name="s3_bucket_name" requirement="required" type="string">
<HclListItemDescription>

The name of the S3 Bucket where CloudTrail logs will be stored.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="access_logging_bucket" requirement="optional" type="string">
<HclListItemDescription>

When access logging is enabled, set this to the name of a preexisting S3 bucket where access logs should flow to. If null, this module will create a separate bucket to store s3 logs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="access_logging_prefix" requirement="optional" type="string">
<HclListItemDescription>

A prefix (i.e., folder path) to use for all access logs stored in access_logging_bucket. Only used if access_logging_enabled is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="additional_bucket_policy_statements" requirement="optional" type="any">
<HclListItemDescription>

Additional IAM policies to apply to this S3 bucket. You can use this to grant read/write access beyond what is provided to Cloudtrail. This should be a map, where each key is a unique statement ID (SID), and each value is an object that contains the parameters defined in the comment below.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
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

   See the 'statement' block in the aws_iam_policy_document data
   source for context: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/iam_policy_document
  
   - effect                                      string            (optional): Either "Allow" or "Deny", to specify whether this statement allows or denies the given actions.
   - actions                                     list(string)      (optional): A list of actions that this statement either allows or denies. For example, ["s3:GetObject", "s3:PutObject"].
   - not_actions                                 list(string)      (optional): A list of actions that this statement does NOT apply to. Used to apply a policy statement to all actions except those listed.
   - principals                                  map(list(string)) (optional): The principals to which this statement applies. The keys are the principal type ("AWS", "Service", or "Federated") and the value is a list of identifiers.
   - not_principals                              map(list(string)) (optional): The principals to which this statement does NOT apply. The keys are the principal type ("AWS", "Service", or "Federated") and the value is a list of identifiers.
   - keys                                        list(string)      (optional): A list of keys within the bucket to which this policy applies. For example, ["", "/*"] would apply to (a) the bucket itself and (b) all keys within the bucket. The default is [""].
   - condition                                   map(object)       (optional): A nested configuration block (described below) that defines a further, possibly-service-specific condition that constrains whether this statement applies.
  
   condition is a map from a unique ID for the condition to an object that can define the following properties:
  
   - test                                        string            (required): The name of the IAM condition operator to evaluate.
   - variable                                    string            (required): The name of a Context Variable to apply the condition to. Context variables may either be standard AWS variables starting with aws:, or service-specific variables prefixed with the service name.
   - values                                      list(string)      (required):  The values to evaluate the condition against. If multiple values are provided, the condition matches if at least one of them applies. (That is, the tests are combined with the "OR" boolean operation.)

```
</details>

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

<HclListItem name="allow_kms_describe_key_to_external_aws_accounts" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to allow kms:DescribeKey to external AWS accounts with write access to the bucket. This is useful during deployment so that you don't have to pass around the KMS key ARN.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="bucket_key_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Optional whether or not to use Amazon S3 Bucket Keys for SSE-KMS.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="cloudtrail_trail_name" requirement="optional" type="string">
<HclListItemDescription>

The name to assign to the CloudTrail 'trail' that will be used to track all API calls in your AWS account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;full-account&quot;"/>
</HclListItem>

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to have this module skip creating resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if the resources in this module should be created or not.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="current_account_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the current AWS account. Normally, we can fetch this automatically using the aws_caller_identity data source, but due to Terraform limitations, in some rare situations, this data source returns the wrong ID, so this parameter needs to be passed manually. Most users can leave this value unset. See https://github.com/gruntwork-io/terraform-aws-security/pull/308#issuecomment-676561441 for context.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="dependencies" requirement="optional" type="list(string)">
<HclListItemDescription>

Create a dependency between the resources in this module to the interpolated values in this list (and thus the source resources). In other words, the resources in this module will now depend on the resources backing the values in this list such that those resources need to be created before the resources in this module, and the resources in this module need to be destroyed before the resources in the list.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="enable_key_rotation" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to enable automatic annual rotation of the KMS key. Defaults to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_s3_server_access_logging" requirement="optional" type="bool">
<HclListItemDescription>

Enables S3 server access logging which sends detailed records for the requests that are made to the bucket. Defaults to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="external_aws_account_ids_with_write_access" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of external AWS accounts that should be given write access for CloudTrail logs to this S3 bucket. This is useful when aggregating CloudTrail logs for multiple AWS accounts in one common S3 bucket.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="force_destroy" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, when you run 'terraform destroy', delete all objects from the bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="kms_key_already_exists" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, that means the KMS key you're using already exists, and does not need to be created.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

If you wish to specify a custom KMS key, then specify the key arn using this variable. This is especially useful when using CloudTrail with multiple AWS accounts, so the logs are all encrypted using the same key.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="kms_key_deletion_window_in_days" requirement="optional" type="number">
<HclListItemDescription>

The number of days to keep this KMS Key (a Customer Master Key) around after it has been marked for deletion.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="15"/>
</HclListItem>

<HclListItem name="kms_key_service_principals" requirement="optional" type="list(object(…))">
<HclListItemDescription>

Additional service principals beyond CloudTrail that should have access to the KMS key used to encrypt the logs. This is useful for granting access to the logs for the purposes of constructing metric filters.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    # The name of the service principal (e.g.: s3.amazonaws.com).
    name = string

    # The list of actions that the given service principal is allowed to perform (e.g. ["kms:DescribeKey",
    # "kms:GenerateDataKey"]).
    actions = list(string)

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

<HclListItem name="mfa_delete" requirement="optional" type="bool">
<HclListItemDescription>

Enable MFA delete for either 'Change the versioning state of your bucket' or 'Permanently delete an object version'. This cannot be used to toggle this setting but is available to allow managed buckets to reflect the state in AWS. For instructions on how to enable MFA Delete, check out the README from the private-s3-bucket module. CIS v1.4 requires this variable to be true. If you do not wish to be CIS-compliant, you can set it to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="num_days_after_which_archive_log_data" requirement="optional" type="number">
<HclListItemDescription>

After this number of days, log files should be transitioned from S3 to Glacier. Enter 0 to never archive log data.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="num_days_after_which_delete_log_data" requirement="optional" type="number">
<HclListItemDescription>

After this number of days, log files should be deleted from S3. If null, never delete.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="organization_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the organization. Required only if an organization wide CloudTrail is being setup. In such a case, this ensures that the entire organization is whitelisted in the CloudTrail bucket write policy.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="replication_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable replication for this bucket. You can set the role to use for replication using the replication_role parameter and the rules for replication using the replication_rules parameter.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="replication_role" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the IAM role for Amazon S3 to assume when replicating objects. Only used if replication_enabled is set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="replication_rules" requirement="optional" type="any">
<HclListItemDescription>

The rules for managing replication. Only used if replication_enabled is set to true. This should be a map, where the key is a unique ID for each replication rule and the value is an object of the form explained in a comment above.

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
     ExampleConfig = {
       prefix                    = "config/"
       status                    = "Enabled"
       destination_bucket        = "arn:aws:s3:::my-destination-bucket"
       destination_storage_class = "STANDARD"
     }
   }

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Ideally, this would be a list(object({...})), but the Terraform object type constraint doesn't support optional
   parameters, whereas replication rules have many optional params. And we can't even use list(any), as the Terraform
   list type constraint requires all values to have the same type ("shape"), but as each object in the list may specify
   different optional params, this won't work either. So, sadly, we are forced to fall back to "any."

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the S3 Bucket, CloudTrail KMS Key, and CloudTrail itself. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="kms_key_alias_name">
<HclListItemDescription>

The alias of the KMS key used by the S3 bucket to encrypt cloudtrail logs.

</HclListItemDescription>
</HclListItem>

<HclListItem name="kms_key_arn">
<HclListItemDescription>

The ARN of the KMS key used by the S3 bucket to encrypt cloudtrail logs.

</HclListItemDescription>
</HclListItem>

<HclListItem name="s3_access_logging_bucket_arn">
<HclListItemDescription>

The ARN of the S3 bucket where access logs for the CloudTrail S3 bucket are delivered.

</HclListItemDescription>
</HclListItem>

<HclListItem name="s3_access_logging_bucket_name">
<HclListItemDescription>

The name of the S3 bucket where access logs for the CloudTrail S3 bucket are delivered.

</HclListItemDescription>
</HclListItem>

<HclListItem name="s3_bucket_arn">
<HclListItemDescription>

The ARN of the S3 bucket where cloudtrail logs are delivered.

</HclListItemDescription>
</HclListItem>

<HclListItem name="s3_bucket_name">
<HclListItemDescription>

The name of the S3 bucket where cloudtrail logs are delivered.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.3/modules/cloudtrail-bucket/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.3/modules/cloudtrail-bucket/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.3/modules/cloudtrail-bucket/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "df09af2f4c1525ff7aa17cfdd6e93012"
}
##DOCS-SOURCER-END -->
