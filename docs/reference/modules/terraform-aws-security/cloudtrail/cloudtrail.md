---
title: "AWS CloudTrail"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.75.17" lastModifiedVersion="0.75.7"/>

# AWS CloudTrail

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.17/modules/cloudtrail" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.7" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module configures [AWS CloudTrail](https://aws.amazon.com/cloudtrail/), a service for logging every API call made against your AWS account.

![AWS CloudTrail Architecture](/img/reference/modules/terraform-aws-security/cloudtrail/aws-cloudtrail-architecture.png)

## Features

*   Enable CloudTrail in your AWS account.

*   Create an S3 bucket to store all CloudTrail events.

*   Create a KMS master key to encrypt all CloudTrail events.

*   Configure how long to retain CloudTrail log data and how to guarantee CloudTrail log integrity.

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://docs.gruntwork.io/library/overview/)!

### Core concepts

*   [What is CloudTrail?](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.17/modules/cloudtrail/core-concepts.md#what-is-cloudtrail)

*   [Why use CloudTrail?](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.17/modules/cloudtrail/core-concepts.md#why-use-cloudtrail)

*   [What is a CloudTrail Trail?](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.17/modules/cloudtrail/core-concepts.md#what-is-a-cloudtrail-trail)

*   [What’s the difference between CloudTrail and AWS Config?](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.17/modules/cloudtrail/core-concepts.md#whats-the-difference-between-cloudtrail-and-aws-config)

*   [CloudTrail Threat Model](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.17/modules/cloudtrail/core-concepts.md#cloudtrail-threat-model)

*   [What resources does this module create?](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.17/modules/cloudtrail/core-concepts.md#resources-created)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.17/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.

*   [examples](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.17/examples): This folder contains working examples of how to use the submodules.

*   [test](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.17/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/cloudtrail](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.17/examples/cloudtrail): The `examples/cloudtrail` folder contains sample code optimized for learning, experimenting, and testing (but not production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [How to configure a production-grade AWS account structure](https://docs.gruntwork.io/guides/build-it-yourself/landing-zone): This guide will walk you through the process of configuring a production-grade AWS account structure, including how to manage multiple environments, users, permissions, audit logging via CloudTrail, and more.

*   [cloudtrail module in the example Reference Architecture](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/main/examples/for-production/infrastructure-live/security/\_global/account-baseline): Production-ready example code from the Reference Architecture.

*   [cloudtrail library module](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/cloudtrail): Module code from the Gruntwork AWS Infrastructure as Code library for CloudTrail.

## Manage

### Day-to-day operations

*   [Where are CloudTrail logs stored?](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.17/modules/cloudtrail/core-concepts.md#where-are-cloudtrail-logs-stored)

*   [What kind of data do CloudTrail log entries contain?](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.17/modules/cloudtrail/core-concepts.md#what-kind-of-data-do-cloudtrail-log-entries-contain)

*   [What’s the best way to view CloudTrail Log Data?](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.17/modules/cloudtrail/core-concepts.md#whats-the-best-way-to-view-cloudtrail-log-data)

### Major changes

*   [Can you get alerted when certain API events occur?](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.17/modules/cloudtrail/core-concepts.md#can-you-get-alerted-when-certain-api-events-occur)

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CLOUDTRAIL MODULE
# ------------------------------------------------------------------------------------------------------

module "cloudtrail" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/cloudtrail?ref=v0.75.17"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # If true, an IAM Policy that grants access to CloudTrail will be honored. If
  # false, only the ARNs listed in var.kms_key_user_iam_arns will have access to
  # CloudTrail and any IAM Policy grants will be ignored. (true or false)
  allow_cloudtrail_access_with_iam = <bool>

  # The name of the S3 Bucket where CloudTrail logs will be stored.
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

  # Additional IAM policies to apply to the Cloudtrail S3 bucket. You can use
  # this to grant read/write access beyond what is provided to Cloudtrail. This
  # should be a map, where each key is a unique statement ID (SID), and each
  # value is an object that contains the parameters defined in the comment
  # below.
  additional_bucket_policy_statements = null

  # Map of advanced event selector name to list of field selectors to apply for that event selector. Advanced event selectors allow for more fine grained data logging of events.
  #
  # Note that you can not configure basic data logging (var.data_logging_enabled) if advanced event logging is enabled.
  #
  # Refer to the AWS docs on data event selection for more details on the difference between basic data logging and advanced data logging.
  #
  advanced_event_selectors = {}

  # Whether or not to allow kms:DescribeKey to external AWS accounts with write
  # access to the bucket. This is useful during deployment so that you don't
  # have to pass around the KMS key ARN.
  allow_kms_describe_key_to_external_aws_accounts = false

  # Optional whether or not to use Amazon S3 Bucket Keys for SSE-KMS.
  bucket_key_enabled = false

  # If defined, uses this value as the name of the CloudTrail IAM role. If not
  # defined, and cloudwatch_logs_group_name is defined, uses that name for the
  # role. If cloudwatch_logs_group_name is not defined, this resource is not
  # created.
  cloudtrail_iam_role_name = null

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role.
  cloudtrail_iam_role_permissions_boundary = null

  # The name to assign to the CloudTrail 'trail' that will be used to track all
  # API calls in your AWS account.
  cloudtrail_trail_name = "full-account"

  # If defined, creates a CloudWatch Logs group with the specified name and
  # configures the trail to publish logs to the group. If undefined, cloudwatch
  # logs group is not created.
  cloudwatch_logs_group_name = null

  # Set to false to have this module skip creating resources. This weird
  # parameter exists solely because Terraform does not support conditional
  # modules. Therefore, this is a hack to allow you to conditionally decide if
  # the resources in this module should be created or not.
  create_resources = true

  # If true, logging of data events will be enabled.
  data_logging_enabled = false

  # Specify if you want your event selector to include management events for
  # your trail.
  data_logging_include_management_events = true

  # Specify if you want your trail to log read-only events, write-only events,
  # or all. Possible values are: ReadOnly, WriteOnly, All.
  data_logging_read_write_type = "All"

  # Data resources for which to log data events. This should be a map, where
  # each key is a data resource type, and each value is a list of data resource
  # values. Possible values for data resource types are: AWS::S3::Object,
  # AWS::Lambda::Function and AWS::DynamoDB::Table. See the 'data_resource'
  # block within the 'event_selector' block of the 'aws_cloudtrail' resource for
  # context:
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudtrail#data_resource.
  data_logging_resources = {}

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # Enables logging for the trail. Setting this to false will pause logging.
  # (true or false)
  enable_cloudtrail = true

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

  # Type of insights to log on a trail. Valid values are: ApiCallRateInsight and
  # ApiErrorRateInsight.
  insight_selector = []

  # Specifies whether CloudTrail will log only API calls in the current region
  # or in all regions. (true or false)
  is_multi_region_trail = true

  # Specifies whether the trail is an AWS Organizations trail. Organization
  # trails log events for the root account and all member accounts. Can only be
  # created in the organization root account. (true or false)
  is_organization_trail = false

  # All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key)
  # that governs access to write API calls older than 7 days and all read API
  # calls. The IAM Users specified in this list will have rights to change who
  # can access this extended log data. This is optional if
  # allow_cloudtrail_access_with_iam is true, otherwise it is required.
  kms_key_administrator_iam_arns = []

  # If set to true, that means the KMS key you're using already exists, and does
  # not need to be created.
  kms_key_already_exists = false

  # If you wish to specify a custom KMS key, then specify the key arn using this
  # variable. This is especially useful when using CloudTrail with multiple AWS
  # accounts, so the logs are all encrypted using the same key.
  kms_key_arn = null

  # If the kms_key_arn provided is an alias or alias ARN, then this must be set
  # to true so that the module will exchange the alias for a CMK ARN. Setting
  # this to true and using aliases requires
  # var.allow_kms_describe_key_to_external_aws_accounts to also be true for
  # multi-account scenarios.
  kms_key_arn_is_alias = false

  # The number of days to keep this KMS Key (a Customer Master Key) around after
  # it has been marked for deletion.
  kms_key_deletion_window_in_days = 15

  # Additional service principals beyond CloudTrail that should have access to
  # the KMS key used to encrypt the logs. This is useful for granting access to
  # the logs for the purposes of constructing metric filters.
  kms_key_service_principals = []

  # All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key)
  # that governs access to write API calls older than 7 days and all read API
  # calls. The IAM Users specified in this list will have read-only access to
  # this extended log data.
  kms_key_user_iam_arns = []

  # After this number of days, log files should be transitioned from S3 to
  # Glacier. Enter 0 to never archive log data.
  num_days_after_which_archive_log_data = 30

  # After this number of days, log files should be deleted from S3. If null,
  # never delete.
  num_days_after_which_delete_log_data = null

  # After this number of days, logs stored in CloudWatch will be deleted.
  # Possible values are: 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400,
  # 545, 731, 1827, 3653, and 0 (default). When set to 0, logs will be retained
  # indefinitely.
  num_days_to_retain_cloudwatch_logs = 0

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

  # If set to true, that means the S3 bucket you're using already exists, and
  # does not need to be created. This is especially useful when using CloudTrail
  # with multiple AWS accounts, with a common S3 bucket shared by all of them.
  s3_bucket_already_exists = false

  # Enable MFA delete for either 'Change the versioning state of your bucket' or
  # 'Permanently delete an object version'. This setting only applies to the
  # bucket used to storage Cloudtrail data. This cannot be used to toggle this
  # setting but is available to allow managed buckets to reflect the state in
  # AWS. For instructions on how to enable MFA Delete, check out the README from
  # the private-s3-bucket module. CIS v1.4 requires this variable to be true. If
  # you do not wish to be CIS-compliant, you can set it to false.
  s3_mfa_delete = false

  # SNS topic for S3 log delivery notifications.
  sns_delivery_topic = null

  # A map of tags to apply to the S3 Bucket, CloudTrail KMS Key, and CloudTrail
  # itself. The key is the tag name and the value is the tag value.
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
# DEPLOY GRUNTWORK'S CLOUDTRAIL MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/cloudtrail?ref=v0.75.17"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # If true, an IAM Policy that grants access to CloudTrail will be honored. If
  # false, only the ARNs listed in var.kms_key_user_iam_arns will have access to
  # CloudTrail and any IAM Policy grants will be ignored. (true or false)
  allow_cloudtrail_access_with_iam = <bool>

  # The name of the S3 Bucket where CloudTrail logs will be stored.
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

  # Additional IAM policies to apply to the Cloudtrail S3 bucket. You can use
  # this to grant read/write access beyond what is provided to Cloudtrail. This
  # should be a map, where each key is a unique statement ID (SID), and each
  # value is an object that contains the parameters defined in the comment
  # below.
  additional_bucket_policy_statements = null

  # Map of advanced event selector name to list of field selectors to apply for that event selector. Advanced event selectors allow for more fine grained data logging of events.
  #
  # Note that you can not configure basic data logging (var.data_logging_enabled) if advanced event logging is enabled.
  #
  # Refer to the AWS docs on data event selection for more details on the difference between basic data logging and advanced data logging.
  #
  advanced_event_selectors = {}

  # Whether or not to allow kms:DescribeKey to external AWS accounts with write
  # access to the bucket. This is useful during deployment so that you don't
  # have to pass around the KMS key ARN.
  allow_kms_describe_key_to_external_aws_accounts = false

  # Optional whether or not to use Amazon S3 Bucket Keys for SSE-KMS.
  bucket_key_enabled = false

  # If defined, uses this value as the name of the CloudTrail IAM role. If not
  # defined, and cloudwatch_logs_group_name is defined, uses that name for the
  # role. If cloudwatch_logs_group_name is not defined, this resource is not
  # created.
  cloudtrail_iam_role_name = null

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role.
  cloudtrail_iam_role_permissions_boundary = null

  # The name to assign to the CloudTrail 'trail' that will be used to track all
  # API calls in your AWS account.
  cloudtrail_trail_name = "full-account"

  # If defined, creates a CloudWatch Logs group with the specified name and
  # configures the trail to publish logs to the group. If undefined, cloudwatch
  # logs group is not created.
  cloudwatch_logs_group_name = null

  # Set to false to have this module skip creating resources. This weird
  # parameter exists solely because Terraform does not support conditional
  # modules. Therefore, this is a hack to allow you to conditionally decide if
  # the resources in this module should be created or not.
  create_resources = true

  # If true, logging of data events will be enabled.
  data_logging_enabled = false

  # Specify if you want your event selector to include management events for
  # your trail.
  data_logging_include_management_events = true

  # Specify if you want your trail to log read-only events, write-only events,
  # or all. Possible values are: ReadOnly, WriteOnly, All.
  data_logging_read_write_type = "All"

  # Data resources for which to log data events. This should be a map, where
  # each key is a data resource type, and each value is a list of data resource
  # values. Possible values for data resource types are: AWS::S3::Object,
  # AWS::Lambda::Function and AWS::DynamoDB::Table. See the 'data_resource'
  # block within the 'event_selector' block of the 'aws_cloudtrail' resource for
  # context:
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudtrail#data_resource.
  data_logging_resources = {}

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # Enables logging for the trail. Setting this to false will pause logging.
  # (true or false)
  enable_cloudtrail = true

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

  # Type of insights to log on a trail. Valid values are: ApiCallRateInsight and
  # ApiErrorRateInsight.
  insight_selector = []

  # Specifies whether CloudTrail will log only API calls in the current region
  # or in all regions. (true or false)
  is_multi_region_trail = true

  # Specifies whether the trail is an AWS Organizations trail. Organization
  # trails log events for the root account and all member accounts. Can only be
  # created in the organization root account. (true or false)
  is_organization_trail = false

  # All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key)
  # that governs access to write API calls older than 7 days and all read API
  # calls. The IAM Users specified in this list will have rights to change who
  # can access this extended log data. This is optional if
  # allow_cloudtrail_access_with_iam is true, otherwise it is required.
  kms_key_administrator_iam_arns = []

  # If set to true, that means the KMS key you're using already exists, and does
  # not need to be created.
  kms_key_already_exists = false

  # If you wish to specify a custom KMS key, then specify the key arn using this
  # variable. This is especially useful when using CloudTrail with multiple AWS
  # accounts, so the logs are all encrypted using the same key.
  kms_key_arn = null

  # If the kms_key_arn provided is an alias or alias ARN, then this must be set
  # to true so that the module will exchange the alias for a CMK ARN. Setting
  # this to true and using aliases requires
  # var.allow_kms_describe_key_to_external_aws_accounts to also be true for
  # multi-account scenarios.
  kms_key_arn_is_alias = false

  # The number of days to keep this KMS Key (a Customer Master Key) around after
  # it has been marked for deletion.
  kms_key_deletion_window_in_days = 15

  # Additional service principals beyond CloudTrail that should have access to
  # the KMS key used to encrypt the logs. This is useful for granting access to
  # the logs for the purposes of constructing metric filters.
  kms_key_service_principals = []

  # All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key)
  # that governs access to write API calls older than 7 days and all read API
  # calls. The IAM Users specified in this list will have read-only access to
  # this extended log data.
  kms_key_user_iam_arns = []

  # After this number of days, log files should be transitioned from S3 to
  # Glacier. Enter 0 to never archive log data.
  num_days_after_which_archive_log_data = 30

  # After this number of days, log files should be deleted from S3. If null,
  # never delete.
  num_days_after_which_delete_log_data = null

  # After this number of days, logs stored in CloudWatch will be deleted.
  # Possible values are: 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400,
  # 545, 731, 1827, 3653, and 0 (default). When set to 0, logs will be retained
  # indefinitely.
  num_days_to_retain_cloudwatch_logs = 0

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

  # If set to true, that means the S3 bucket you're using already exists, and
  # does not need to be created. This is especially useful when using CloudTrail
  # with multiple AWS accounts, with a common S3 bucket shared by all of them.
  s3_bucket_already_exists = false

  # Enable MFA delete for either 'Change the versioning state of your bucket' or
  # 'Permanently delete an object version'. This setting only applies to the
  # bucket used to storage Cloudtrail data. This cannot be used to toggle this
  # setting but is available to allow managed buckets to reflect the state in
  # AWS. For instructions on how to enable MFA Delete, check out the README from
  # the private-s3-bucket module. CIS v1.4 requires this variable to be true. If
  # you do not wish to be CIS-compliant, you can set it to false.
  s3_mfa_delete = false

  # SNS topic for S3 log delivery notifications.
  sns_delivery_topic = null

  # A map of tags to apply to the S3 Bucket, CloudTrail KMS Key, and CloudTrail
  # itself. The key is the tag name and the value is the tag value.
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

<HclListItem name="allow_cloudtrail_access_with_iam" requirement="required" type="bool">
<HclListItemDescription>

If true, an IAM Policy that grants access to CloudTrail will be honored. If false, only the ARNs listed in <a href="#kms_key_user_iam_arns"><code>kms_key_user_iam_arns</code></a> will have access to CloudTrail and any IAM Policy grants will be ignored. (true or false)

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

<HclListItem name="additional_bucket_policy_statements" requirement="optional" type="any">
<HclListItemDescription>

Additional IAM policies to apply to the Cloudtrail S3 bucket. You can use this to grant read/write access beyond what is provided to Cloudtrail. This should be a map, where each key is a unique statement ID (SID), and each value is an object that contains the parameters defined in the comment below.

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

<HclListItem name="advanced_event_selectors" requirement="optional" type="any">
<HclListItemDescription>

Map of advanced event selector name to list of field selectors to apply for that event selector. Advanced event selectors allow for more fine grained data logging of events.

Note that you can not configure basic data logging (<a href="#data_logging_enabled"><code>data_logging_enabled</code></a>) if advanced event logging is enabled.

Refer to the AWS docs on data event selection for more details on the difference between basic data logging and advanced data logging.


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

   Ideally, we will use a more strict type here but since we want to support required and optional values, and since
   Terraform's type system only supports maps that have the same type for all values, we have to use the less useful
   `any` type.

```
</details>

<details>


```hcl

   Each entry in the map is a list of field selector objects, each of which supports the following attributes:
   
   REQUIRED
   - field             string        : Specifies a field in an event record on which to filter events to be logged. You
                                       can specify only the following values: readOnly, eventSource, eventName,
                                       eventCategory, resources.type, resources.ARN.
   OPTIONAL (one of the following must be set)
   - equals            list(string)  : A list of values that includes events that match the exact value of the event
                                       record field specified as the value of field. This is the only valid operator
                                       that you can use with the readOnly, eventCategory, and resources.type fields.
   - not_equals        list(string)  : A list of values that excludes events that match the exact value of the event
                                       record field specified as the value of field.
   - starts_with       list(string)  : A list of values that includes events that match the first few characters of the
                                       event record field specified as the value of field.
   - not_starts_with   list(string)  : A list of values that excludes events that match the first few characters of the
                                       event record field specified as the value of field.
   - ends_with         list(string)  : A list of values that includes events that match the last few characters of the
                                       event record field specified as the value of field.
   - not_ends_with     list(string)  : A list of values that excludes events that match the last few characters of the
                                       event record field specified as the value of field.
  
   EXAMPLE:
   advanced_event_selectors = {
     LogDeleteEvents = [
       {
         field  = "eventCategory"
         equals = ["Data"]
       },
       {
         field       = "eventName"
         starts_with = ["Delete"]
       },
       {
         field  = "resources.type"
         equals = ["AWS::S3::Object"]
       },
     ]
   }

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

<HclListItem name="cloudtrail_iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

If defined, uses this value as the name of the CloudTrail IAM role. If not defined, and cloudwatch_logs_group_name is defined, uses that name for the role. If cloudwatch_logs_group_name is not defined, this resource is not created.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudtrail_iam_role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudtrail_trail_name" requirement="optional" type="string">
<HclListItemDescription>

The name to assign to the CloudTrail 'trail' that will be used to track all API calls in your AWS account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;full-account&quot;"/>
</HclListItem>

<HclListItem name="cloudwatch_logs_group_name" requirement="optional" type="string">
<HclListItemDescription>

If defined, creates a CloudWatch Logs group with the specified name and configures the trail to publish logs to the group. If undefined, cloudwatch logs group is not created.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to have this module skip creating resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if the resources in this module should be created or not.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="data_logging_enabled" requirement="optional" type="bool">
<HclListItemDescription>

If true, logging of data events will be enabled.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="data_logging_include_management_events" requirement="optional" type="bool">
<HclListItemDescription>

Specify if you want your event selector to include management events for your trail.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="data_logging_read_write_type" requirement="optional" type="string">
<HclListItemDescription>

Specify if you want your trail to log read-only events, write-only events, or all. Possible values are: ReadOnly, WriteOnly, All.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;All&quot;"/>
</HclListItem>

<HclListItem name="data_logging_resources" requirement="optional" type="map(list(…))">
<HclListItemDescription>

Data resources for which to log data events. This should be a map, where each key is a data resource type, and each value is a list of data resource values. Possible values for data resource types are: AWS::S3::Object, AWS::Lambda::Function and AWS::DynamoDB::Table. See the 'data_resource' block within the 'event_selector' block of the 'aws_cloudtrail' resource for context: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudtrail#data_resource.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(list(string))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="dependencies" requirement="optional" type="list(string)">
<HclListItemDescription>

Create a dependency between the resources in this module to the interpolated values in this list (and thus the source resources). In other words, the resources in this module will now depend on the resources backing the values in this list such that those resources need to be created before the resources in this module, and the resources in this module need to be destroyed before the resources in the list.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="enable_cloudtrail" requirement="optional" type="bool">
<HclListItemDescription>

Enables logging for the trail. Setting this to false will pause logging. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
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

<HclListItem name="insight_selector" requirement="optional" type="list(string)">
<HclListItemDescription>

Type of insights to log on a trail. Valid values are: ApiCallRateInsight and ApiErrorRateInsight.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="is_multi_region_trail" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether CloudTrail will log only API calls in the current region or in all regions. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="is_organization_trail" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether the trail is an AWS Organizations trail. Organization trails log events for the root account and all member accounts. Can only be created in the organization root account. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="kms_key_administrator_iam_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key) that governs access to write API calls older than 7 days and all read API calls. The IAM Users specified in this list will have rights to change who can access this extended log data. This is optional if allow_cloudtrail_access_with_iam is true, otherwise it is required.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
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

<HclListItem name="kms_key_arn_is_alias" requirement="optional" type="bool">
<HclListItemDescription>

If the kms_key_arn provided is an alias or alias ARN, then this must be set to true so that the module will exchange the alias for a CMK ARN. Setting this to true and using aliases requires <a href="#allow_kms_describe_key_to_external_aws_accounts"><code>allow_kms_describe_key_to_external_aws_accounts</code></a> to also be true for multi-account scenarios.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
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

<HclListItem name="kms_key_user_iam_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key) that governs access to write API calls older than 7 days and all read API calls. The IAM Users specified in this list will have read-only access to this extended log data.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
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

<HclListItem name="num_days_to_retain_cloudwatch_logs" requirement="optional" type="number">
<HclListItemDescription>

After this number of days, logs stored in CloudWatch will be deleted. Possible values are: 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1827, 3653, and 0 (default). When set to 0, logs will be retained indefinitely.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
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

<HclListItem name="s3_bucket_already_exists" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, that means the S3 bucket you're using already exists, and does not need to be created. This is especially useful when using CloudTrail with multiple AWS accounts, with a common S3 bucket shared by all of them.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="s3_mfa_delete" requirement="optional" type="bool">
<HclListItemDescription>

Enable MFA delete for either 'Change the versioning state of your bucket' or 'Permanently delete an object version'. This setting only applies to the bucket used to storage Cloudtrail data. This cannot be used to toggle this setting but is available to allow managed buckets to reflect the state in AWS. For instructions on how to enable MFA Delete, check out the README from the private-s3-bucket module. CIS v1.4 requires this variable to be true. If you do not wish to be CIS-compliant, you can set it to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="sns_delivery_topic" requirement="optional" type="string">
<HclListItemDescription>

SNS topic for S3 log delivery notifications.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the S3 Bucket, CloudTrail KMS Key, and CloudTrail itself. The key is the tag name and the value is the tag value.

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

<HclListItem name="cloudtrail_iam_role_arn">
<HclListItemDescription>

The ARN of the IAM role used by the cloudwatch log group.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloudtrail_iam_role_name">
<HclListItemDescription>

The name of the IAM role used by the cloudwatch log group.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloudwatch_group_arn">
<HclListItemDescription>

The ARN of the cloudwatch log group.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloudwatch_group_name">
<HclListItemDescription>

The name of the cloudwatch log group.

</HclListItemDescription>
</HclListItem>

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

The ARN of the S3 bucket where server access logs are delivered.

</HclListItemDescription>
</HclListItem>

<HclListItem name="s3_access_logging_bucket_name">
<HclListItemDescription>

The name of the S3 bucket where server access logs are delivered.

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

<HclListItem name="trail_arn">
<HclListItemDescription>

The ARN of the cloudtrail trail.

</HclListItemDescription>
</HclListItem>

<HclListItem name="trail_name">
<HclListItemDescription>

The name of the cloudtrail trail.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.17/modules/cloudtrail/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.17/modules/cloudtrail/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.17/modules/cloudtrail/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "d0e8acbd2427bc1826c788ec7582cef3"
}
##DOCS-SOURCER-END -->
