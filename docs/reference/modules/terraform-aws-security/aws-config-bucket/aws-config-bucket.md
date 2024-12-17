---
title: "AWS Config Bucket"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.75.0" lastModifiedVersion="0.69.2"/>

# AWS Config Bucket

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.0/modules/aws-config-bucket" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.69.2" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module creates an S3 bucket for storing AWS Config data, including all the appropriate lifecycle, encryption, and
permission settings for AWS Config.

This module is not meant to be used directly. Instead, it's used under the hood in the [aws-config](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.0/modules/aws-config)
and [account-baseline-root](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.0/modules/account-baseline-root) modules. Please see those modules for more information.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S AWS-CONFIG-BUCKET MODULE
# ------------------------------------------------------------------------------------------------------

module "aws_config_bucket" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/aws-config-bucket?ref=v0.75.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the S3 Bucket where Config items will be stored. Can be in the
  # same account or in another account.
  s3_bucket_name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The S3 bucket where access logs for this bucket should be stored. Only used
  # if access_logging_enabled is true.
  access_logging_bucket = null

  # A prefix (i.e., folder path) to use for all access logs stored in
  # access_logging_bucket. Only used if access_logging_enabled is true.
  access_logging_prefix = null

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

  # Enables S3 server access logging which sends detailed records for the
  # requests that are made to the bucket. Defaults to false.
  enable_s3_server_access_logging = false

  # If set to true, when you run 'terraform destroy', delete all objects from
  # the bucket so that the bucket can be destroyed without error. Warning: these
  # objects are not recoverable so only use this if you're absolutely sure you
  # want to permanently delete everything!
  force_destroy = false

  # Optional KMS key to use for encrypting S3 objects and the SNS topic. If
  # null, data in S3 will be encrypted using the default aws/s3 key, and SNS
  # topics will not be encrypted. If provided, the key policy of the provided
  # key must permit the IAM role used by AWS Config. See
  # https://docs.aws.amazon.com/sns/latest/dg/sns-key-management.html.
  kms_key_arn = null

  # For multi-account deployments, provide a list of AWS account IDs that should
  # have permissions to write to the S3 bucket and publish to the SNS topic. Use
  # this in conjunction with should_create_s3_bucket sns_topic_name. If this is
  # a child account, leave this list empty.
  linked_accounts = []

  # After this number of days, log files should be transitioned from S3 to
  # Glacier. Enter 0 to never archive log data.
  num_days_after_which_archive_log_data = 365

  # After this number of days, log files should be deleted from S3. If null,
  # never delete.
  num_days_after_which_delete_log_data = 730

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

  # Enable MFA delete for either 'Change the versioning state of your bucket' or
  # 'Permanently delete an object version'. This cannot be used to toggle this
  # setting but is available to allow managed buckets to reflect the state in
  # AWS. For instructions on how to enable MFA Delete, check out the README from
  # the private-s3-bucket module. CIS v1.4 requires this variable to be true. If
  # you do not wish to be CIS-compliant, you can set it to false.
  s3_mfa_delete = false

  # A prefix to use when storing Config objects in S3. This will be the
  # beginning of the path in the S3 object. For example: <s3 bucket
  # name>:/<prefix>/AWSLogs/<account ID>/Config/*. If this variable is null (the
  # default), the path will not include any prefix: e.g., it'll be <s3 bucket
  # name>:/AWSLogs/<account ID>/Config/*.
  s3_object_prefix = null

  # A map of tags to apply to the S3 Bucket. The key is the tag name and the
  # value is the tag value.
  tags = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S AWS-CONFIG-BUCKET MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/aws-config-bucket?ref=v0.75.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the S3 Bucket where Config items will be stored. Can be in the
  # same account or in another account.
  s3_bucket_name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The S3 bucket where access logs for this bucket should be stored. Only used
  # if access_logging_enabled is true.
  access_logging_bucket = null

  # A prefix (i.e., folder path) to use for all access logs stored in
  # access_logging_bucket. Only used if access_logging_enabled is true.
  access_logging_prefix = null

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

  # Enables S3 server access logging which sends detailed records for the
  # requests that are made to the bucket. Defaults to false.
  enable_s3_server_access_logging = false

  # If set to true, when you run 'terraform destroy', delete all objects from
  # the bucket so that the bucket can be destroyed without error. Warning: these
  # objects are not recoverable so only use this if you're absolutely sure you
  # want to permanently delete everything!
  force_destroy = false

  # Optional KMS key to use for encrypting S3 objects and the SNS topic. If
  # null, data in S3 will be encrypted using the default aws/s3 key, and SNS
  # topics will not be encrypted. If provided, the key policy of the provided
  # key must permit the IAM role used by AWS Config. See
  # https://docs.aws.amazon.com/sns/latest/dg/sns-key-management.html.
  kms_key_arn = null

  # For multi-account deployments, provide a list of AWS account IDs that should
  # have permissions to write to the S3 bucket and publish to the SNS topic. Use
  # this in conjunction with should_create_s3_bucket sns_topic_name. If this is
  # a child account, leave this list empty.
  linked_accounts = []

  # After this number of days, log files should be transitioned from S3 to
  # Glacier. Enter 0 to never archive log data.
  num_days_after_which_archive_log_data = 365

  # After this number of days, log files should be deleted from S3. If null,
  # never delete.
  num_days_after_which_delete_log_data = 730

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

  # Enable MFA delete for either 'Change the versioning state of your bucket' or
  # 'Permanently delete an object version'. This cannot be used to toggle this
  # setting but is available to allow managed buckets to reflect the state in
  # AWS. For instructions on how to enable MFA Delete, check out the README from
  # the private-s3-bucket module. CIS v1.4 requires this variable to be true. If
  # you do not wish to be CIS-compliant, you can set it to false.
  s3_mfa_delete = false

  # A prefix to use when storing Config objects in S3. This will be the
  # beginning of the path in the S3 object. For example: <s3 bucket
  # name>:/<prefix>/AWSLogs/<account ID>/Config/*. If this variable is null (the
  # default), the path will not include any prefix: e.g., it'll be <s3 bucket
  # name>:/AWSLogs/<account ID>/Config/*.
  s3_object_prefix = null

  # A map of tags to apply to the S3 Bucket. The key is the tag name and the
  # value is the tag value.
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

The name of the S3 Bucket where Config items will be stored. Can be in the same account or in another account.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="access_logging_bucket" requirement="optional" type="string">
<HclListItemDescription>

The S3 bucket where access logs for this bucket should be stored. Only used if access_logging_enabled is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="access_logging_prefix" requirement="optional" type="string">
<HclListItemDescription>

A prefix (i.e., folder path) to use for all access logs stored in access_logging_bucket. Only used if access_logging_enabled is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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

<HclListItem name="enable_s3_server_access_logging" requirement="optional" type="bool">
<HclListItemDescription>

Enables S3 server access logging which sends detailed records for the requests that are made to the bucket. Defaults to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="force_destroy" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, when you run 'terraform destroy', delete all objects from the bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

Optional KMS key to use for encrypting S3 objects and the SNS topic. If null, data in S3 will be encrypted using the default aws/s3 key, and SNS topics will not be encrypted. If provided, the key policy of the provided key must permit the IAM role used by AWS Config. See https://docs.aws.amazon.com/sns/latest/dg/sns-key-management.html.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="linked_accounts" requirement="optional" type="list(string)">
<HclListItemDescription>

For multi-account deployments, provide a list of AWS account IDs that should have permissions to write to the S3 bucket and publish to the SNS topic. Use this in conjunction with should_create_s3_bucket sns_topic_name. If this is a child account, leave this list empty.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="num_days_after_which_archive_log_data" requirement="optional" type="number">
<HclListItemDescription>

After this number of days, log files should be transitioned from S3 to Glacier. Enter 0 to never archive log data.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="365"/>
</HclListItem>

<HclListItem name="num_days_after_which_delete_log_data" requirement="optional" type="number">
<HclListItemDescription>

After this number of days, log files should be deleted from S3. If null, never delete.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="730"/>
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

<HclListItem name="s3_mfa_delete" requirement="optional" type="bool">
<HclListItemDescription>

Enable MFA delete for either 'Change the versioning state of your bucket' or 'Permanently delete an object version'. This cannot be used to toggle this setting but is available to allow managed buckets to reflect the state in AWS. For instructions on how to enable MFA Delete, check out the README from the private-s3-bucket module. CIS v1.4 requires this variable to be true. If you do not wish to be CIS-compliant, you can set it to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="s3_object_prefix" requirement="optional" type="string">
<HclListItemDescription>

A prefix to use when storing Config objects in S3. This will be the beginning of the path in the S3 object. For example: &lt;s3 bucket name>:/&lt;prefix>/AWSLogs/&lt;account ID>/Config/*. If this variable is null (the default), the path will not include any prefix: e.g., it'll be &lt;s3 bucket name>:/AWSLogs/&lt;account ID>/Config/*.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the S3 Bucket. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="s3_bucket_arn">
<HclListItemDescription>

The ARN of the S3 bucket used by AWS Config to store configuration items.

</HclListItemDescription>
</HclListItem>

<HclListItem name="s3_bucket_name">
<HclListItemDescription>

The name of the S3 bucket used by AWS Config to store configuration items.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.0/modules/aws-config-bucket/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.0/modules/aws-config-bucket/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.0/modules/aws-config-bucket/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "9530cdb0449b62394e3ffecc385dc921"
}
##DOCS-SOURCER-END -->
