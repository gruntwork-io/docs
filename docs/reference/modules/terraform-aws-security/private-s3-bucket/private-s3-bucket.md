---
title: "Private S3 Bucket"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.75.2" lastModifiedVersion="0.74.6"/>

# Private S3 Bucket

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.2/modules/private-s3-bucket" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.74.6" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module can be used to create and manage an [Amazon S3](https://aws.amazon.com/s3/) bucket that enforces
best practices for private access:

*   No public access: all public access is completely blocked.
*   Encryption at rest: server-side encryption is enabled, optionally with a custom KMS key.
*   Encryption in transit: the bucket can only be accessed over TLS.

## How do you enable MFA Delete?

Enabling MFA Delete in your bucket adds another layer of security by requiring MFA in any request to delete a version or change the versioning state of the bucket.

The attribute `mfa_delete` is only used by Terraform to [reflect the current state of the bucket](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3\_bucket#mfa_delete). It is not possible to create a bucket if the `mfa_delete` is `true`, because it needs to be activated [using AWS CLI or the API](https://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiFactorAuthenticationDelete.html).

To make this change [**you need to use the root user of the account**](https://docs.aws.amazon.com/general/latest/gr/root-vs-iam.html#aws_tasks-that-require-root) that owns the bucket, and MFA needs to be enabled.

**Note:** We do not recommend you have active access keys for the root user, so remember to delete them after you finish this.

In order to enable MFA Delete, you need to:

1.  [Create access keys for the root user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_add-key)
2.  [Configure MFA for the root user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_mfa)
3.  Create a bucket with `mfa_delete=false`.
4.  Using the root user, call the AWS CLI to enable MFA Delete. If you are using `aws-vault`, it is necessary to [use the `--no-session` flag](https://github.com/99designs/aws-vault/blob/7d912c9/USAGE.md#using---no-session).
    ```
    aws s3api put-bucket-versioning --region <REGION> \
    --bucket <BUCKET NAME> \
    --versioning-configuration Status=Enabled,MFADelete=Enabled \
    --mfa "arn:aws:iam::<ACCOUNT ID>:mfa/root-account-mfa-device <MFA CODE>"
    ```
5.  Set `mfa_delete=true` in your Terraform code
6.  Remove any Lifecycle Rule that the bucket might contain (for the `aws-config-bucket` and `cloudtrail-bucket` modules, enabling `mfa_delete` will already disable the lifecycle rules).
7.  Run `terraform apply`.
8.  If there are no left S3 buckets to enable MFA Delete, delete the access keys for the root user, but NOT the MFA.

**Note:** If you are using `aws-vault` to authenticate your requests, you need to use the `--no-session` flag.

### Using mfa-delete.sh

If you want to enable MFA Delete to *all* your buckets at once, you can use the script at `mfa-delete-script/mfa-delete.sh`. You need to use the access keys for the root user and the root MFA code.

Usage:

```
aws-vault exec --no-session <PROFILE> -- ./mfa-delete.sh --account-id <ACCOUNT ID>
```

Example:

```
aws-vault exec --no-session root-prod -- ./mfa-delete.sh --account-id 226486542153
```

### Known Issues

*   `An error occurred (InvalidRequest) when calling the PutBucketVersioning operation: DevPay and Mfa are mutually exclusive authorization methods`: If you receive this error when running any of the commands/scripts above then you might not be authenticated as the root user or MFA may not be enabled correctly. If you are using `aws-vault` to authenticate your requests, you need to use the `--no-session` flag.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S PRIVATE-S3-BUCKET MODULE
# ------------------------------------------------------------------------------------------------------

module "private_s_3_bucket" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/private-s3-bucket?ref=v0.75.2"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The canned ACL to apply. This can be 'null' if you don't want to use ACLs.
  # See comment above for the list of possible ACLs. If not `null`
  # bucket_ownership cannot be BucketOwnerEnforced
  acl = <string>

  # What to name the S3 bucket. Note that S3 bucket names must be globally
  # unique across all AWS users!
  name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Sets the accelerate configuration of an existing bucket. Can be Enabled or
  # Suspended.
  acceleration_status = null

  # The S3 bucket where access logs for this bucket should be stored. Only used
  # if access_logging_enabled is true.
  access_logging_bucket = null

  # Set to true to enable access logging for this bucket. You can set the name
  # of the bucket where access logs should be stored using the
  # access_logging_bucket parameter.
  access_logging_enabled = false

  # A prefix (i.e., folder path) to use for all access logs stored in
  # access_logging_bucket. Only used if access_logging_enabled is true.
  access_logging_prefix = null

  # Optional whether or not to use Amazon S3 Bucket Keys for SSE-KMS.
  bucket_key_enabled = false

  # Configure who will be the default owner of objects uploaded to this S3
  # bucket: must be one of BucketOwnerPreferred (the bucket owner owns objects),
  # ObjectWriter (the writer of each object owns that object),
  # BucketOwnerEnforced [Recommended] (the bucket owner automatically owns and
  # has full control over every object in the bucket), or null (don't configure
  # this feature). Note that BucketOwnerEnforced disables ACLs, and ObjectWriter
  # only takes effect if the object is uploaded with the
  # bucket-owner-full-control canned ACL. See
  # https://docs.aws.amazon.com/AmazonS3/latest/dev/about-object-ownership.html
  # for more info.
  bucket_ownership = "BucketOwnerEnforced"

  # Provides an IAM policy in JSON format to apply to S3 bucket. See more:
  # https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies.html
  bucket_policy_from_file = null

  # The IAM policy to apply to this S3 bucket. You can use this to grant
  # read/write access. This should be a map, where each key is a unique
  # statement ID (SID), and each value is an object that contains the parameters
  # defined in the comment above.
  bucket_policy_statements = {}

  # CORS rules to set on this S3 bucket
  cors_rules = []

  # When true, provision an IAM role that allows various source buckets to
  # replicate to this bucket. Note that this setting should be used if you
  # intend to use this bucket as a replication destination, NOT replication
  # source. For configuring replication from the bucket, refer to the
  # var.replication_enabled input variable.
  create_replication_iam_role_to_bucket = false

  # Set to false to have this module skip creating resources. This weird
  # parameter exists solely because Terraform does not support conditional
  # modules. Therefore, this is a hack to allow you to conditionally decide if
  # the resources in this module should be created or not.
  create_resources = true

  # The name to use for the IAM role for replication access to this bucket. When
  # null, a generic name using the bucket name will be used. Only used if
  # var.create_replication_iam_role_to_bucket is true.
  custom_iam_role_name_for_replication_role = null

  # Set to true to enable server-side encryption for this bucket. You can
  # control the algorithm using var.sse_algorithm.
  enable_sse = true

  # Set to true to enable versioning for this bucket. If enabled, instead of
  # overriding objects, the S3 bucket will always create a new version of each
  # object, so all the old values are retained.
  enable_versioning = true

  # If set to true, when you run 'terraform destroy', delete all objects from
  # the bucket so that the bucket can be destroyed without error. Warning: these
  # objects are not recoverable so only use this if you're absolutely sure you
  # want to permanently delete everything!
  force_destroy = false

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role
  iam_role_permissions_boundary = null

  # Set flag to have terraform ignore changes to the S3 bucket policy (if these
  # are being maniplulated outside of terraform)
  ignore_s3_bucket_policy_changes = false

  # Optional KMS key to use for encrypting data in the S3 bucket. If null, data
  # in S3 will be encrypted using the default aws/s3 key. If provided, the key
  # policy of the provided key must allow whoever is writing to this bucket to
  # use that key.
  kms_key_arn = null

  # The lifecycle rules for this S3 bucket. These can be used to change storage
  # types or delete objects based on customizable rules. This should be a map,
  # where each key is a unique ID for the lifecycle rule, and each value is an
  # object that contains the parameters defined in the comment above.
  lifecycle_rules = {}

  # Enable MFA delete for either 'Change the versioning state of your bucket' or
  # 'Permanently delete an object version'. This cannot be used to toggle this
  # setting but is available to allow managed buckets to reflect the state in
  # AWS. Only used if enable_versioning is true. CIS v1.4 requires this variable
  # to be true. If you do not wish to be CIS-compliant, you can set it to false.
  mfa_delete = false

  # The number of days that you want to specify for the default retention period
  # for Object Locking. Only one of object_lock_days or object_lock_years can be
  # configured. Only used if object_lock_enabled and
  # object_lock_default_retention_enabled are true.
  object_lock_days = null

  # Set to true to configure a default retention period for object locks when
  # Object Locking is enabled. When disabled, objects will not be protected with
  # locking by default unless explicitly configured at object creation time.
  # Only used if object_lock_enabled is true.
  object_lock_default_retention_enabled = true

  # Set to true to enable Object Locking. This prevents objects from being
  # deleted for a customizable period of time. Note that this MUST be configured
  # at bucket creation time - you cannot update an existing bucket to enable
  # object locking unless you go through AWS support. Additionally, this is not
  # reversible - once a bucket is created with object lock enabled, you cannot
  # disable object locking even with this setting. Note that enabling object
  # locking will automatically enable bucket versioning.
  object_lock_enabled = false

  # The default Object Lock retention mode you want to apply to new objects
  # placed in this bucket. Valid values are GOVERNANCE and COMPLIANCE. Only used
  # if object_lock_enabled and object_lock_default_retention_enabled are true.
  object_lock_mode = null

  # The number of years that you want to specify for the default retention
  # period for Object Locking. Only one of object_lock_days or object_lock_years
  # can be configured. Only used if object_lock_enabled and
  # object_lock_default_retention_enabled are true.
  object_lock_years = null

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

  # List of buckets that should be allowed to replicate to this bucket. Only
  # used if var.create_replication_iam_role_to_bucket is true.
  replication_source_buckets = []

  # Specifies who should bear the cost of Amazon S3 data transfer. Can be either
  # BucketOwner or Requester. By default, the owner of the S3 bucket would incur
  # the costs of any data transfer.
  request_payer = null

  # The server-side encryption algorithm to use. Valid values are AES256 and
  # aws:kms. To disable server-side encryption, set var.enable_sse to false.
  sse_algorithm = "aws:kms"

  # A map of tags to apply to the S3 Bucket. The key is the tag name and the
  # value is the tag value.
  tags = {}

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S PRIVATE-S3-BUCKET MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/private-s3-bucket?ref=v0.75.2"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The canned ACL to apply. This can be 'null' if you don't want to use ACLs.
  # See comment above for the list of possible ACLs. If not `null`
  # bucket_ownership cannot be BucketOwnerEnforced
  acl = <string>

  # What to name the S3 bucket. Note that S3 bucket names must be globally
  # unique across all AWS users!
  name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Sets the accelerate configuration of an existing bucket. Can be Enabled or
  # Suspended.
  acceleration_status = null

  # The S3 bucket where access logs for this bucket should be stored. Only used
  # if access_logging_enabled is true.
  access_logging_bucket = null

  # Set to true to enable access logging for this bucket. You can set the name
  # of the bucket where access logs should be stored using the
  # access_logging_bucket parameter.
  access_logging_enabled = false

  # A prefix (i.e., folder path) to use for all access logs stored in
  # access_logging_bucket. Only used if access_logging_enabled is true.
  access_logging_prefix = null

  # Optional whether or not to use Amazon S3 Bucket Keys for SSE-KMS.
  bucket_key_enabled = false

  # Configure who will be the default owner of objects uploaded to this S3
  # bucket: must be one of BucketOwnerPreferred (the bucket owner owns objects),
  # ObjectWriter (the writer of each object owns that object),
  # BucketOwnerEnforced [Recommended] (the bucket owner automatically owns and
  # has full control over every object in the bucket), or null (don't configure
  # this feature). Note that BucketOwnerEnforced disables ACLs, and ObjectWriter
  # only takes effect if the object is uploaded with the
  # bucket-owner-full-control canned ACL. See
  # https://docs.aws.amazon.com/AmazonS3/latest/dev/about-object-ownership.html
  # for more info.
  bucket_ownership = "BucketOwnerEnforced"

  # Provides an IAM policy in JSON format to apply to S3 bucket. See more:
  # https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies.html
  bucket_policy_from_file = null

  # The IAM policy to apply to this S3 bucket. You can use this to grant
  # read/write access. This should be a map, where each key is a unique
  # statement ID (SID), and each value is an object that contains the parameters
  # defined in the comment above.
  bucket_policy_statements = {}

  # CORS rules to set on this S3 bucket
  cors_rules = []

  # When true, provision an IAM role that allows various source buckets to
  # replicate to this bucket. Note that this setting should be used if you
  # intend to use this bucket as a replication destination, NOT replication
  # source. For configuring replication from the bucket, refer to the
  # var.replication_enabled input variable.
  create_replication_iam_role_to_bucket = false

  # Set to false to have this module skip creating resources. This weird
  # parameter exists solely because Terraform does not support conditional
  # modules. Therefore, this is a hack to allow you to conditionally decide if
  # the resources in this module should be created or not.
  create_resources = true

  # The name to use for the IAM role for replication access to this bucket. When
  # null, a generic name using the bucket name will be used. Only used if
  # var.create_replication_iam_role_to_bucket is true.
  custom_iam_role_name_for_replication_role = null

  # Set to true to enable server-side encryption for this bucket. You can
  # control the algorithm using var.sse_algorithm.
  enable_sse = true

  # Set to true to enable versioning for this bucket. If enabled, instead of
  # overriding objects, the S3 bucket will always create a new version of each
  # object, so all the old values are retained.
  enable_versioning = true

  # If set to true, when you run 'terraform destroy', delete all objects from
  # the bucket so that the bucket can be destroyed without error. Warning: these
  # objects are not recoverable so only use this if you're absolutely sure you
  # want to permanently delete everything!
  force_destroy = false

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role
  iam_role_permissions_boundary = null

  # Set flag to have terraform ignore changes to the S3 bucket policy (if these
  # are being maniplulated outside of terraform)
  ignore_s3_bucket_policy_changes = false

  # Optional KMS key to use for encrypting data in the S3 bucket. If null, data
  # in S3 will be encrypted using the default aws/s3 key. If provided, the key
  # policy of the provided key must allow whoever is writing to this bucket to
  # use that key.
  kms_key_arn = null

  # The lifecycle rules for this S3 bucket. These can be used to change storage
  # types or delete objects based on customizable rules. This should be a map,
  # where each key is a unique ID for the lifecycle rule, and each value is an
  # object that contains the parameters defined in the comment above.
  lifecycle_rules = {}

  # Enable MFA delete for either 'Change the versioning state of your bucket' or
  # 'Permanently delete an object version'. This cannot be used to toggle this
  # setting but is available to allow managed buckets to reflect the state in
  # AWS. Only used if enable_versioning is true. CIS v1.4 requires this variable
  # to be true. If you do not wish to be CIS-compliant, you can set it to false.
  mfa_delete = false

  # The number of days that you want to specify for the default retention period
  # for Object Locking. Only one of object_lock_days or object_lock_years can be
  # configured. Only used if object_lock_enabled and
  # object_lock_default_retention_enabled are true.
  object_lock_days = null

  # Set to true to configure a default retention period for object locks when
  # Object Locking is enabled. When disabled, objects will not be protected with
  # locking by default unless explicitly configured at object creation time.
  # Only used if object_lock_enabled is true.
  object_lock_default_retention_enabled = true

  # Set to true to enable Object Locking. This prevents objects from being
  # deleted for a customizable period of time. Note that this MUST be configured
  # at bucket creation time - you cannot update an existing bucket to enable
  # object locking unless you go through AWS support. Additionally, this is not
  # reversible - once a bucket is created with object lock enabled, you cannot
  # disable object locking even with this setting. Note that enabling object
  # locking will automatically enable bucket versioning.
  object_lock_enabled = false

  # The default Object Lock retention mode you want to apply to new objects
  # placed in this bucket. Valid values are GOVERNANCE and COMPLIANCE. Only used
  # if object_lock_enabled and object_lock_default_retention_enabled are true.
  object_lock_mode = null

  # The number of years that you want to specify for the default retention
  # period for Object Locking. Only one of object_lock_days or object_lock_years
  # can be configured. Only used if object_lock_enabled and
  # object_lock_default_retention_enabled are true.
  object_lock_years = null

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

  # List of buckets that should be allowed to replicate to this bucket. Only
  # used if var.create_replication_iam_role_to_bucket is true.
  replication_source_buckets = []

  # Specifies who should bear the cost of Amazon S3 data transfer. Can be either
  # BucketOwner or Requester. By default, the owner of the S3 bucket would incur
  # the costs of any data transfer.
  request_payer = null

  # The server-side encryption algorithm to use. Valid values are AES256 and
  # aws:kms. To disable server-side encryption, set var.enable_sse to false.
  sse_algorithm = "aws:kms"

  # A map of tags to apply to the S3 Bucket. The key is the tag name and the
  # value is the tag value.
  tags = {}

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="acl" requirement="required" type="string">
<HclListItemDescription>

The canned ACL to apply. This can be 'null' if you don't want to use ACLs. See comment above for the list of possible ACLs. If not `null` bucket_ownership cannot be BucketOwnerEnforced

</HclListItemDescription>
</HclListItem>

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

What to name the S3 bucket. Note that S3 bucket names must be globally unique across all AWS users!

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="acceleration_status" requirement="optional" type="string">
<HclListItemDescription>

Sets the accelerate configuration of an existing bucket. Can be Enabled or Suspended.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="access_logging_bucket" requirement="optional" type="string">
<HclListItemDescription>

The S3 bucket where access logs for this bucket should be stored. Only used if access_logging_enabled is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="access_logging_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable access logging for this bucket. You can set the name of the bucket where access logs should be stored using the access_logging_bucket parameter.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="access_logging_prefix" requirement="optional" type="string">
<HclListItemDescription>

A prefix (i.e., folder path) to use for all access logs stored in access_logging_bucket. Only used if access_logging_enabled is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="bucket_key_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Optional whether or not to use Amazon S3 Bucket Keys for SSE-KMS.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="bucket_ownership" requirement="optional" type="string">
<HclListItemDescription>

Configure who will be the default owner of objects uploaded to this S3 bucket: must be one of BucketOwnerPreferred (the bucket owner owns objects), ObjectWriter (the writer of each object owns that object), BucketOwnerEnforced [Recommended] (the bucket owner automatically owns and has full control over every object in the bucket), or null (don't configure this feature). Note that BucketOwnerEnforced disables ACLs, and ObjectWriter only takes effect if the object is uploaded with the bucket-owner-full-control canned ACL. See https://docs.aws.amazon.com/AmazonS3/latest/dev/about-object-ownership.html for more info.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;BucketOwnerEnforced&quot;"/>
</HclListItem>

<HclListItem name="bucket_policy_from_file" requirement="optional" type="object(…)">
<HclListItemDescription>

Provides an IAM policy in JSON format to apply to S3 bucket. See more: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies.html

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # Path to file
    file_path = string

    # Variables to substitute in the policy file
    vars = map(string)
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

     Variables to substitute in the policy file

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="bucket_policy_statements" requirement="optional" type="any">
<HclListItemDescription>

The IAM policy to apply to this S3 bucket. You can use this to grant read/write access. This should be a map, where each key is a unique statement ID (SID), and each value is an object that contains the parameters defined in the comment above.

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

<HclListItem name="cors_rules" requirement="optional" type="any">
<HclListItemDescription>

CORS rules to set on this S3 bucket

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   [
     {
       allowed_origins = ["*"]
       allowed_methods = ["GET", "HEAD"]
       allowed_headers = ["x-amz-*"]
       expose_headers  = ["Etag"]
       max_age_seconds = 3000
     }
   ]

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   The objects that can define the following properties:
  
   - allowed_origins list(string)      (required): The origins that you want to allow cross-domain requests from.
   - allowed_methods list(string)      (required): From the set of GET, PUT, POST, DELETE, HEAD
   - allowed_headers list(string)      (optional): The AllowedHeader element specifies which headers are allowed in a preflight request through the Access-Control-Request-Headers header.
   - expose_headers  list(string)      (optional): Each ExposeHeader element identifies a header in the response that you want customers to be able to access from their applications.
   - max_age_seconds number            (optional): The MaxAgeSeconds element specifies the time in seconds that your browser can cache the response for a preflight request as identified by the resource, the HTTP method, and the origin.

```
</details>

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

<HclListItem name="create_replication_iam_role_to_bucket" requirement="optional" type="bool">
<HclListItemDescription>

When true, provision an IAM role that allows various source buckets to replicate to this bucket. Note that this setting should be used if you intend to use this bucket as a replication destination, NOT replication source. For configuring replication from the bucket, refer to the <a href="#replication_enabled"><code>replication_enabled</code></a> input variable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to have this module skip creating resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if the resources in this module should be created or not.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="custom_iam_role_name_for_replication_role" requirement="optional" type="string">
<HclListItemDescription>

The name to use for the IAM role for replication access to this bucket. When null, a generic name using the bucket name will be used. Only used if <a href="#create_replication_iam_role_to_bucket"><code>create_replication_iam_role_to_bucket</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="enable_sse" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable server-side encryption for this bucket. You can control the algorithm using <a href="#sse_algorithm"><code>sse_algorithm</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_versioning" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable versioning for this bucket. If enabled, instead of overriding objects, the S3 bucket will always create a new version of each object, so all the old values are retained.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="force_destroy" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, when you run 'terraform destroy', delete all objects from the bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="iam_role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ignore_s3_bucket_policy_changes" requirement="optional" type="bool">
<HclListItemDescription>

Set flag to have terraform ignore changes to the S3 bucket policy (if these are being maniplulated outside of terraform)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

Optional KMS key to use for encrypting data in the S3 bucket. If null, data in S3 will be encrypted using the default aws/s3 key. If provided, the key policy of the provided key must allow whoever is writing to this bucket to use that key.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="lifecycle_rules" requirement="optional" type="any">
<HclListItemDescription>

The lifecycle rules for this S3 bucket. These can be used to change storage types or delete objects based on customizable rules. This should be a map, where each key is a unique ID for the lifecycle rule, and each value is an object that contains the parameters defined in the comment above.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Ideally, this would be a map(object({...})), but the Terraform object type constraint doesn't support optional
   parameters, whereas lifecycle rules have many optional params. And we can't even use map(any), as the Terraform
   map type constraint requires all values to have the same type ("shape"), but as each object in the map may specify
   different optional params, this won't work either. So, sadly, we are forced to fall back to "any."

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="mfa_delete" requirement="optional" type="bool">
<HclListItemDescription>

Enable MFA delete for either 'Change the versioning state of your bucket' or 'Permanently delete an object version'. This cannot be used to toggle this setting but is available to allow managed buckets to reflect the state in AWS. Only used if enable_versioning is true. CIS v1.4 requires this variable to be true. If you do not wish to be CIS-compliant, you can set it to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="object_lock_days" requirement="optional" type="number">
<HclListItemDescription>

The number of days that you want to specify for the default retention period for Object Locking. Only one of object_lock_days or object_lock_years can be configured. Only used if object_lock_enabled and object_lock_default_retention_enabled are true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="object_lock_default_retention_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to configure a default retention period for object locks when Object Locking is enabled. When disabled, objects will not be protected with locking by default unless explicitly configured at object creation time. Only used if object_lock_enabled is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="object_lock_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable Object Locking. This prevents objects from being deleted for a customizable period of time. Note that this MUST be configured at bucket creation time - you cannot update an existing bucket to enable object locking unless you go through AWS support. Additionally, this is not reversible - once a bucket is created with object lock enabled, you cannot disable object locking even with this setting. Note that enabling object locking will automatically enable bucket versioning.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="object_lock_mode" requirement="optional" type="string">
<HclListItemDescription>

The default Object Lock retention mode you want to apply to new objects placed in this bucket. Valid values are GOVERNANCE and COMPLIANCE. Only used if object_lock_enabled and object_lock_default_retention_enabled are true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="object_lock_years" requirement="optional" type="number">
<HclListItemDescription>

The number of years that you want to specify for the default retention period for Object Locking. Only one of object_lock_days or object_lock_years can be configured. Only used if object_lock_enabled and object_lock_default_retention_enabled are true.

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

<HclListItem name="replication_source_buckets" requirement="optional" type="list(string)">
<HclListItemDescription>

List of buckets that should be allowed to replicate to this bucket. Only used if <a href="#create_replication_iam_role_to_bucket"><code>create_replication_iam_role_to_bucket</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="request_payer" requirement="optional" type="string">
<HclListItemDescription>

Specifies who should bear the cost of Amazon S3 data transfer. Can be either BucketOwner or Requester. By default, the owner of the S3 bucket would incur the costs of any data transfer.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="sse_algorithm" requirement="optional" type="string">
<HclListItemDescription>

The server-side encryption algorithm to use. Valid values are AES256 and aws:kms. To disable server-side encryption, set <a href="#enable_sse"><code>enable_sse</code></a> to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;aws:kms&quot;"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the S3 Bucket. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="use_managed_iam_policies" requirement="optional" type="bool">
<HclListItemDescription>

When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="arn">
<HclListItemDescription>

The ARN of the S3 bucket.

</HclListItemDescription>
</HclListItem>

<HclListItem name="bucket_domain_name">
<HclListItemDescription>

The bucket domain name. Will be of format bucketname.s3.amazonaws.com.

</HclListItemDescription>
</HclListItem>

<HclListItem name="bucket_is_fully_configured">
<HclListItemDescription>

A value that can be used to chain resources to depend on the bucket being fully configured with all the configuration resources created. The value is always true, as the bucket would be fully configured when Terraform is able to render this.

</HclListItemDescription>
</HclListItem>

<HclListItem name="bucket_regional_domain_name">
<HclListItemDescription>

The bucket region-specific domain name. The bucket domain name including the region name, please refer here for format. Note: The AWS CloudFront allows specifying S3 region-specific endpoint when creating S3 origin, it will prevent redirect issues from CloudFront to S3 Origin URL.

</HclListItemDescription>
</HclListItem>

<HclListItem name="hosted_zone_id">
<HclListItemDescription>

The Route 53 Hosted Zone ID for this bucket's region.

</HclListItemDescription>
</HclListItem>

<HclListItem name="name">
<HclListItemDescription>

The name of the S3 bucket.

</HclListItemDescription>
</HclListItem>

<HclListItem name="replication_iam_role_arn">
<HclListItemDescription>

The ARN of an IAM role that can be used to configure replication from various source buckets.

</HclListItemDescription>
</HclListItem>

<HclListItem name="replication_iam_role_name">
<HclListItemDescription>

The name of an IAM role that can be used to configure replication from various source buckets.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.2/modules/private-s3-bucket/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.2/modules/private-s3-bucket/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.2/modules/private-s3-bucket/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "90e0e14a88c0694c37a3ae42f77a6cd3"
}
##DOCS-SOURCER-END -->
