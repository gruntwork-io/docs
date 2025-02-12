---
title: "AWS Config"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.75.8" lastModifiedVersion="0.75.7"/>

# AWS Config

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.8/modules/aws-config" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.7" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module configures [AWS Config](https://aws.amazon.com/config/), a service that allows you to assess, audit, and evaluate the configurations of your AWS resources. You can use AWS Config to ensure that AWS resources are configured in a manner that is in compliance with your company policies or regulatory requirements.

![AWS Config Architecture](/img/reference/modules/terraform-aws-security/aws-config/aws-config-architecture.png)

## Features

*   Record snapshots of how your AWS resources are configured.

*   Create an S3 bucket to store AWS Config logs from multiple AWS accounts and regions.

*   Create a delivery channel to send notifications to an existing SNS topic, which can be used to alert you when configurations change.

*   Aggregate the output of AWS Config in multiple accounts to a single pane of glass.

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://docs.gruntwork.io/library/overview/)!

### Core concepts

*   [What is AWS Config?](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.8/modules/aws-config/core-concepts.md#what-is-aws-config)

*   [What are Config Rules?](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.8/modules/aws-config/core-concepts.md#what-are-config-rules)

*   [What resources does this module create?](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.8/modules/aws-config/core-concepts.md#what-resources-does-this-module-create)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.8/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.

*   [examples](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.8/examples): This folder contains working examples of how to use the submodules.

*   [test](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.8/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/aws-config](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.8/examples/aws-config): The `examples/aws-config` folder contains sample code optimized for learning, experimenting, and testing (but not production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   ***Coming soon***. We have not yet added this module to the [Acme example Reference Architecture](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme).

## Manage

### Day-to-day operations

*   [What does a configuration item look like, and how do I view it?](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.8/modules/aws-config/core-concepts.md#what-does-a-configuration-item-look-like-and-how-do-i-view-it)

*   [How does Config work with multiple AWS accounts and multiple regions?](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.8/modules/aws-config-multi-region/core-concepts.md#how-does-config-work-with-multiple-aws-accounts-and-multiple-regions)

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S AWS-CONFIG MODULE
# ------------------------------------------------------------------------------------------------------

module "aws_config" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/aws-config?ref=v0.75.8"

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

  # Set to true to send the AWS Config data to another account (e.g., a logs
  # account) for aggregation purposes. You must set the ID of that other account
  # via the central_account_id variable. This redundant variable has to exist
  # because Terraform does not allow computed data in count and for_each
  # parameters and var.central_account_id may be computed if its the ID of a
  # newly-created AWS account.
  aggregate_config_data_in_external_account = false

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role.
  aws_config_iam_role_permissions_boundary = null

  # For multi-account deployments, set this to the account ID of the central
  # account in which the S3 bucket and SNS topic exist. Only used if
  # aggregate_config_data_in_external_account is true.
  central_account_id = null

  # A name for the configuration recorder and delivery channel. If not provided,
  # the name is set to 'default'.
  config_name = null

  # Set to true to create config aggregator, typically in the global recorder
  # region of the security/central account. The variable is needed due to
  # Terraform limitations, creating the aggregator conditionally based on AWS
  # region might fail as 'aws_region' datasource might be deferred if the module
  # has 'depend_on' on other resources.
  create_config_aggregator = false

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

  # Optional KMS key to use for encrypting S3 objects on the AWS Config delivery
  # channel for an externally managed S3 bucket. This must belong to the same
  # region as the destination S3 bucket. If null, AWS Config will default to
  # encrypting the delivered data with AES-256 encryption. Only used if
  # var.should_create_s3_bucket is false - otherwise, var.kms_key_arn is used.
  delivery_channel_kms_key_arn = null

  # The frequency with which AWS Config delivers configuration snapshots. When
  # null, defaults to the maximum execution frequency of each rule. Valid
  # values: One_Hour | Three_Hours | Six_Hours | Twelve_Hours | TwentyFour_Hours
  delivery_frequency = null

  # When true, enable the AWS Config Configuration Aggregator on all regions
  # regardless of what is passed into var.opt_in_regions.
  enable_all_regions_for_config_aggregator = false

  # Enables S3 server access logging which sends detailed records for the
  # requests that are made to the bucket. Defaults to false.
  enable_s3_server_access_logging = false

  # If set to true, when you run 'terraform destroy', delete all objects from
  # the bucket so that the bucket can be destroyed without error. Warning: these
  # objects are not recoverable so only use this if you're absolutely sure you
  # want to permanently delete everything!
  force_destroy = false

  # The region in which to create the global recorder for configuration of
  # global resources such as IAM users, groups, roles, and policies.
  global_recorder_region = "us-east-1"

  # The name of an IAM role for Config service to assume. Must be unique within
  # the AWS account.
  iam_role_name = "AWS_ConfigRole"

  # Optional KMS key to use for encrypting S3 objects AND the SNS topic. This is
  # a backward compatible interface for configuring a single KMS key for both S3
  # objects and the SNS topic. When null, falls back to using
  # var.s3_bucket_kms_key_arn S3 buckets and var.sns_topic_kms_key_arn for SNS
  # topics.
  kms_key_arn = null

  # For multi-account deployments, provide a list of AWS account IDs that should
  # have permissions to write to the S3 bucket and publish to the SNS topic. Use
  # this in conjunction with var.should_create_s3_bucket and var.sns_topic_name.
  # If this is a child account, leave this list empty.
  linked_accounts = []

  # After this number of days, log files should be transitioned from S3 to
  # Glacier. Enter 0 to never archive log data.
  num_days_after_which_archive_log_data = 365

  # After this number of days, log files should be deleted from S3. If null,
  # never delete.
  num_days_after_which_delete_log_data = 730

  # Enables config aggregation in only the provided regions. If this list is
  # empty, config aggregation will be enabled in all regions.
  opt_in_regions = []

  # Map of recording group configurations.
  #
  # See the official AWS provider documentation for futher context
  #   https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/config_configuration_recorder#recording_group-configuration-block
  #
  # Each configuration can have the following parameters:
  #
  # all_supported bool (required):
  #   Whether to records configuration changes for every supported type of regional resource.
  #
  # include_global_resource_types bool (required):
  #   Whether to records configuration changes for every supported type of global resource.
  #
  # resource_types list(string) (required):
  #   List of resource types to record configuration changes for.
  #   Requires that all_supported is false and a recording_strategy of "INCLUSION_BY_RESOURCE_TYPES"
  #
  # recording_strategy object({}) (required):
  #   use_only list(string):
  #     The recording stratgy to use which can be one of:
  #     - "ALL_SUPPORTED_RESOURCE_TYPES"
  #     - "EXCLUSION_BY_RESOURCE_TYPES"
  #     - "INCLUSION_BY_RESOURCE_TYPES"
  #
  # exclusion_by_resource_types object({}) (optional):
  #   resource_types list(string):
  #     A list of resource types to exclude from recording.
  #     Requires that all_supported is false and a recording_strategy of "EXCLUSION_BY_RESOURCE_TYPES"
  #
  recording_groups = {"default_group":{"all_supported":true,"include_global_resource_types":true,"recording_strategy":{"use_only":"ALL_SUPPORTED_RESOURCE_TYPES"},"resource_types":[]}}

  # The mode for AWS Config to record configuration changes. 
  #
  # recording_frequency:
  # The frequency with which AWS Config records configuration changes (service defaults to CONTINUOUS).
  # - CONTINUOUS
  # - DAILY
  #
  # You can also override the recording frequency for specific resource types.
  # recording_mode_override:
  #   description:
  #     A description for the override.
  #   recording_frequency:
  #     The frequency with which AWS Config records configuration changes for the specified resource types.
  #     - CONTINUOUS
  #     - DAILY
  #   resource_types:
  #     A list of resource types for which AWS Config records configuration changes. For example, AWS::EC2::Instance.
  #     
  # See the following for more information:
  # https://docs.aws.amazon.com/config/latest/developerguide/stop-start-recorder.html
  #
  # /*
  # recording_mode = {
  #   recording_frequency = "DAILY"
  #   recording_mode_override = {
  #     description         = "Override for specific resource types"
  #     recording_frequency = "CONTINUOUS"
  #     resource_types      = ["AWS::EC2::Instance"]
  #   }
  # }
  # */
  #
  recording_mode = null

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

  # Optional KMS key to use for encrypting S3 objects on the AWS Config bucket,
  # when the S3 bucket is created within this module
  # (var.should_create_s3_bucket is true). For encrypting S3 objects on delivery
  # for an externally managed S3 bucket, refer to the
  # var.delivery_channel_kms_key_arn input variable. If null, data in S3 will be
  # encrypted using the default aws/s3 key. If provided, the key policy of the
  # provided key must permit the IAM role used by AWS Config. See
  # https://docs.aws.amazon.com/sns/latest/dg/sns-key-management.html.
  s3_bucket_kms_key_arn = null

  # Enable MFA delete for either 'Change the versioning state of your bucket' or
  # 'Permanently delete an object version'. This setting only applies to the
  # bucket used to storage AWS Config data. This cannot be used to toggle this
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

  # If set to true, attach an IAM policy, to the AWS Config IAM role that allows
  # the role to publish messages to the SNS topic defined by either
  # `sns_topic_name` or `sns_topic_arn`. Set to false if an SNS topic is not
  # used.
  should_attach_sns_policy = true

  # If set to true, create an IAM role for AWS Config. Customize the name of the
  # role by setting iam_role_name. If set to false, the name passed in
  # iam_role_name must already exist.
  should_create_iam_role = true

  # If set to true, create an S3 bucket for delivering Config objectts. Defaults
  # to true.
  should_create_s3_bucket = true

  # The ARN of an existing SNS topic. Can be in the same account or another
  # account. To create a new topic, set sns_topic_name. One of var.sns_topic_arn
  # or var.sns_topic_name are required. This module does not support creating
  # AWS Config without an SNS topic.
  sns_topic_arn = null

  # The ID of an AWS-managed(default) or customer-managed customer master key
  # (CMK) to use for encrypting the Amazon SNS topic (var.sns_topic_name is
  # non-null). Specify null explicitly to disable encryption of SNS topic.
  sns_topic_kms_key_arn = "alias/aws/sns"

  # If set, creates an SNS topic to which Config notifications will be
  # delivered. To provide an existing topic, set sns_topic_arn. One of
  # var.sns_topic_arn or var.sns_topic_name are required. One of
  # var.sns_topic_arn or var.sns_topic_name are required. This module does not
  # support creating AWS Config without an SNS topic.
  sns_topic_name = null

  # A map of tags to apply to the S3 Bucket. The key is the tag name and the
  # value is the tag value.
  tags = {}

  # Toggle if the recording_group should be setup using the
  # var.global_recorder_region (true) or if the recording_group will be setup
  # for each entry in var.recording_groups (false). Defaults to true.
  use_global_record_region = true

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
# DEPLOY GRUNTWORK'S AWS-CONFIG MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/aws-config?ref=v0.75.8"
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

  # Set to true to send the AWS Config data to another account (e.g., a logs
  # account) for aggregation purposes. You must set the ID of that other account
  # via the central_account_id variable. This redundant variable has to exist
  # because Terraform does not allow computed data in count and for_each
  # parameters and var.central_account_id may be computed if its the ID of a
  # newly-created AWS account.
  aggregate_config_data_in_external_account = false

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role.
  aws_config_iam_role_permissions_boundary = null

  # For multi-account deployments, set this to the account ID of the central
  # account in which the S3 bucket and SNS topic exist. Only used if
  # aggregate_config_data_in_external_account is true.
  central_account_id = null

  # A name for the configuration recorder and delivery channel. If not provided,
  # the name is set to 'default'.
  config_name = null

  # Set to true to create config aggregator, typically in the global recorder
  # region of the security/central account. The variable is needed due to
  # Terraform limitations, creating the aggregator conditionally based on AWS
  # region might fail as 'aws_region' datasource might be deferred if the module
  # has 'depend_on' on other resources.
  create_config_aggregator = false

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

  # Optional KMS key to use for encrypting S3 objects on the AWS Config delivery
  # channel for an externally managed S3 bucket. This must belong to the same
  # region as the destination S3 bucket. If null, AWS Config will default to
  # encrypting the delivered data with AES-256 encryption. Only used if
  # var.should_create_s3_bucket is false - otherwise, var.kms_key_arn is used.
  delivery_channel_kms_key_arn = null

  # The frequency with which AWS Config delivers configuration snapshots. When
  # null, defaults to the maximum execution frequency of each rule. Valid
  # values: One_Hour | Three_Hours | Six_Hours | Twelve_Hours | TwentyFour_Hours
  delivery_frequency = null

  # When true, enable the AWS Config Configuration Aggregator on all regions
  # regardless of what is passed into var.opt_in_regions.
  enable_all_regions_for_config_aggregator = false

  # Enables S3 server access logging which sends detailed records for the
  # requests that are made to the bucket. Defaults to false.
  enable_s3_server_access_logging = false

  # If set to true, when you run 'terraform destroy', delete all objects from
  # the bucket so that the bucket can be destroyed without error. Warning: these
  # objects are not recoverable so only use this if you're absolutely sure you
  # want to permanently delete everything!
  force_destroy = false

  # The region in which to create the global recorder for configuration of
  # global resources such as IAM users, groups, roles, and policies.
  global_recorder_region = "us-east-1"

  # The name of an IAM role for Config service to assume. Must be unique within
  # the AWS account.
  iam_role_name = "AWS_ConfigRole"

  # Optional KMS key to use for encrypting S3 objects AND the SNS topic. This is
  # a backward compatible interface for configuring a single KMS key for both S3
  # objects and the SNS topic. When null, falls back to using
  # var.s3_bucket_kms_key_arn S3 buckets and var.sns_topic_kms_key_arn for SNS
  # topics.
  kms_key_arn = null

  # For multi-account deployments, provide a list of AWS account IDs that should
  # have permissions to write to the S3 bucket and publish to the SNS topic. Use
  # this in conjunction with var.should_create_s3_bucket and var.sns_topic_name.
  # If this is a child account, leave this list empty.
  linked_accounts = []

  # After this number of days, log files should be transitioned from S3 to
  # Glacier. Enter 0 to never archive log data.
  num_days_after_which_archive_log_data = 365

  # After this number of days, log files should be deleted from S3. If null,
  # never delete.
  num_days_after_which_delete_log_data = 730

  # Enables config aggregation in only the provided regions. If this list is
  # empty, config aggregation will be enabled in all regions.
  opt_in_regions = []

  # Map of recording group configurations.
  #
  # See the official AWS provider documentation for futher context
  #   https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/config_configuration_recorder#recording_group-configuration-block
  #
  # Each configuration can have the following parameters:
  #
  # all_supported bool (required):
  #   Whether to records configuration changes for every supported type of regional resource.
  #
  # include_global_resource_types bool (required):
  #   Whether to records configuration changes for every supported type of global resource.
  #
  # resource_types list(string) (required):
  #   List of resource types to record configuration changes for.
  #   Requires that all_supported is false and a recording_strategy of "INCLUSION_BY_RESOURCE_TYPES"
  #
  # recording_strategy object({}) (required):
  #   use_only list(string):
  #     The recording stratgy to use which can be one of:
  #     - "ALL_SUPPORTED_RESOURCE_TYPES"
  #     - "EXCLUSION_BY_RESOURCE_TYPES"
  #     - "INCLUSION_BY_RESOURCE_TYPES"
  #
  # exclusion_by_resource_types object({}) (optional):
  #   resource_types list(string):
  #     A list of resource types to exclude from recording.
  #     Requires that all_supported is false and a recording_strategy of "EXCLUSION_BY_RESOURCE_TYPES"
  #
  recording_groups = {"default_group":{"all_supported":true,"include_global_resource_types":true,"recording_strategy":{"use_only":"ALL_SUPPORTED_RESOURCE_TYPES"},"resource_types":[]}}

  # The mode for AWS Config to record configuration changes. 
  #
  # recording_frequency:
  # The frequency with which AWS Config records configuration changes (service defaults to CONTINUOUS).
  # - CONTINUOUS
  # - DAILY
  #
  # You can also override the recording frequency for specific resource types.
  # recording_mode_override:
  #   description:
  #     A description for the override.
  #   recording_frequency:
  #     The frequency with which AWS Config records configuration changes for the specified resource types.
  #     - CONTINUOUS
  #     - DAILY
  #   resource_types:
  #     A list of resource types for which AWS Config records configuration changes. For example, AWS::EC2::Instance.
  #     
  # See the following for more information:
  # https://docs.aws.amazon.com/config/latest/developerguide/stop-start-recorder.html
  #
  # /*
  # recording_mode = {
  #   recording_frequency = "DAILY"
  #   recording_mode_override = {
  #     description         = "Override for specific resource types"
  #     recording_frequency = "CONTINUOUS"
  #     resource_types      = ["AWS::EC2::Instance"]
  #   }
  # }
  # */
  #
  recording_mode = null

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

  # Optional KMS key to use for encrypting S3 objects on the AWS Config bucket,
  # when the S3 bucket is created within this module
  # (var.should_create_s3_bucket is true). For encrypting S3 objects on delivery
  # for an externally managed S3 bucket, refer to the
  # var.delivery_channel_kms_key_arn input variable. If null, data in S3 will be
  # encrypted using the default aws/s3 key. If provided, the key policy of the
  # provided key must permit the IAM role used by AWS Config. See
  # https://docs.aws.amazon.com/sns/latest/dg/sns-key-management.html.
  s3_bucket_kms_key_arn = null

  # Enable MFA delete for either 'Change the versioning state of your bucket' or
  # 'Permanently delete an object version'. This setting only applies to the
  # bucket used to storage AWS Config data. This cannot be used to toggle this
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

  # If set to true, attach an IAM policy, to the AWS Config IAM role that allows
  # the role to publish messages to the SNS topic defined by either
  # `sns_topic_name` or `sns_topic_arn`. Set to false if an SNS topic is not
  # used.
  should_attach_sns_policy = true

  # If set to true, create an IAM role for AWS Config. Customize the name of the
  # role by setting iam_role_name. If set to false, the name passed in
  # iam_role_name must already exist.
  should_create_iam_role = true

  # If set to true, create an S3 bucket for delivering Config objectts. Defaults
  # to true.
  should_create_s3_bucket = true

  # The ARN of an existing SNS topic. Can be in the same account or another
  # account. To create a new topic, set sns_topic_name. One of var.sns_topic_arn
  # or var.sns_topic_name are required. This module does not support creating
  # AWS Config without an SNS topic.
  sns_topic_arn = null

  # The ID of an AWS-managed(default) or customer-managed customer master key
  # (CMK) to use for encrypting the Amazon SNS topic (var.sns_topic_name is
  # non-null). Specify null explicitly to disable encryption of SNS topic.
  sns_topic_kms_key_arn = "alias/aws/sns"

  # If set, creates an SNS topic to which Config notifications will be
  # delivered. To provide an existing topic, set sns_topic_arn. One of
  # var.sns_topic_arn or var.sns_topic_name are required. One of
  # var.sns_topic_arn or var.sns_topic_name are required. This module does not
  # support creating AWS Config without an SNS topic.
  sns_topic_name = null

  # A map of tags to apply to the S3 Bucket. The key is the tag name and the
  # value is the tag value.
  tags = {}

  # Toggle if the recording_group should be setup using the
  # var.global_recorder_region (true) or if the recording_group will be setup
  # for each entry in var.recording_groups (false). Defaults to true.
  use_global_record_region = true

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

<HclListItem name="aggregate_config_data_in_external_account" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to send the AWS Config data to another account (e.g., a logs account) for aggregation purposes. You must set the ID of that other account via the central_account_id variable. This redundant variable has to exist because Terraform does not allow computed data in count and for_each parameters and <a href="#central_account_id"><code>central_account_id</code></a> may be computed if its the ID of a newly-created AWS account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="aws_config_iam_role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="central_account_id" requirement="optional" type="string">
<HclListItemDescription>

For multi-account deployments, set this to the account ID of the central account in which the S3 bucket and SNS topic exist. Only used if aggregate_config_data_in_external_account is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="config_name" requirement="optional" type="string">
<HclListItemDescription>

A name for the configuration recorder and delivery channel. If not provided, the name is set to 'default'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="create_config_aggregator" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to create config aggregator, typically in the global recorder region of the security/central account. The variable is needed due to Terraform limitations, creating the aggregator conditionally based on AWS region might fail as 'aws_region' datasource might be deferred if the module has 'depend_on' on other resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
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

<HclListItem name="delivery_channel_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

Optional KMS key to use for encrypting S3 objects on the AWS Config delivery channel for an externally managed S3 bucket. This must belong to the same region as the destination S3 bucket. If null, AWS Config will default to encrypting the delivered data with AES-256 encryption. Only used if <a href="#should_create_s3_bucket"><code>should_create_s3_bucket</code></a> is false - otherwise, <a href="#kms_key_arn"><code>kms_key_arn</code></a> is used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="delivery_frequency" requirement="optional" type="string">
<HclListItemDescription>

The frequency with which AWS Config delivers configuration snapshots. When null, defaults to the maximum execution frequency of each rule. Valid values: One_Hour | Three_Hours | Six_Hours | Twelve_Hours | TwentyFour_Hours

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="enable_all_regions_for_config_aggregator" requirement="optional" type="bool">
<HclListItemDescription>

When true, enable the AWS Config Configuration Aggregator on all regions regardless of what is passed into <a href="#opt_in_regions"><code>opt_in_regions</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
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

<HclListItem name="global_recorder_region" requirement="optional" type="string">
<HclListItemDescription>

The region in which to create the global recorder for configuration of global resources such as IAM users, groups, roles, and policies.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;us-east-1&quot;"/>
</HclListItem>

<HclListItem name="iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

The name of an IAM role for Config service to assume. Must be unique within the AWS account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;AWS_ConfigRole&quot;"/>
</HclListItem>

<HclListItem name="kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

Optional KMS key to use for encrypting S3 objects AND the SNS topic. This is a backward compatible interface for configuring a single KMS key for both S3 objects and the SNS topic. When null, falls back to using <a href="#s3_bucket_kms_key_arn"><code>s3_bucket_kms_key_arn</code></a> S3 buckets and <a href="#sns_topic_kms_key_arn"><code>sns_topic_kms_key_arn</code></a> for SNS topics.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="linked_accounts" requirement="optional" type="list(string)">
<HclListItemDescription>

For multi-account deployments, provide a list of AWS account IDs that should have permissions to write to the S3 bucket and publish to the SNS topic. Use this in conjunction with <a href="#should_create_s3_bucket"><code>should_create_s3_bucket</code></a> and <a href="#sns_topic_name"><code>sns_topic_name</code></a>. If this is a child account, leave this list empty.

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

<HclListItem name="opt_in_regions" requirement="optional" type="list(string)">
<HclListItemDescription>

Enables config aggregation in only the provided regions. If this list is empty, config aggregation will be enabled in all regions.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="recording_groups" requirement="optional" type="map(object(…))">
<HclListItemDescription>

Map of recording group configurations.

See the official AWS provider documentation for futher context
  https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/config_configuration_recorder#recording_group-configuration-block

Each configuration can have the following parameters:

all_supported bool (required):
  Whether to records configuration changes for every supported type of regional resource.

include_global_resource_types bool (required):
  Whether to records configuration changes for every supported type of global resource.

resource_types list(string) (required):
  List of resource types to record configuration changes for.
  Requires that all_supported is false and a recording_strategy of 'INCLUSION_BY_RESOURCE_TYPES'

recording_strategy object(&#123;&#125;) (required):
  use_only list(string):
    The recording stratgy to use which can be one of:
    - 'ALL_SUPPORTED_RESOURCE_TYPES'
    - 'EXCLUSION_BY_RESOURCE_TYPES'
    - 'INCLUSION_BY_RESOURCE_TYPES'

exclusion_by_resource_types object(&#123;&#125;) (optional):
  resource_types list(string):
    A list of resource types to exclude from recording.
    Requires that all_supported is false and a recording_strategy of 'EXCLUSION_BY_RESOURCE_TYPES'


</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    all_supported                 = bool
    include_global_resource_types = bool
    resource_types                = list(string)
    recording_strategy = object({
      use_only = string
    })
    exclusion_by_resource_types = optional(object({
      resource_types = list(string)
    }))
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
{
  default_group = {
    all_supported = true,
    include_global_resource_types = true,
    recording_strategy = {
      use_only = "ALL_SUPPORTED_RESOURCE_TYPES"
    },
    resource_types = []
  }
}
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="recording_mode" requirement="optional" type="object(…)">
<HclListItemDescription>

The mode for AWS Config to record configuration changes. 

recording_frequency:
The frequency with which AWS Config records configuration changes (service defaults to CONTINUOUS).
- CONTINUOUS
- DAILY

You can also override the recording frequency for specific resource types.
recording_mode_override:
  description:
    A description for the override.
  recording_frequency:
    The frequency with which AWS Config records configuration changes for the specified resource types.
    - CONTINUOUS
    - DAILY
  resource_types:
    A list of resource types for which AWS Config records configuration changes. For example, AWS::EC2::Instance.
    
See the following for more information:
https://docs.aws.amazon.com/config/latest/developerguide/stop-start-recorder.html

```
recording_mode = &#123;
  recording_frequency = 'DAILY'
  recording_mode_override = &#123;
    description         = 'Override for specific resource types'
    recording_frequency = 'CONTINUOUS'
    resource_types      = ['AWS::EC2::Instance']
  &#125;
&#125;
```


</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    recording_frequency = string
    recording_mode_override = optional(object({
      description         = string
      recording_frequency = string
      resource_types      = list(string)
    }))
  })
```

</HclListItemTypeDetails>
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

<HclListItem name="s3_bucket_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

Optional KMS key to use for encrypting S3 objects on the AWS Config bucket, when the S3 bucket is created within this module (<a href="#should_create_s3_bucket"><code>should_create_s3_bucket</code></a> is true). For encrypting S3 objects on delivery for an externally managed S3 bucket, refer to the <a href="#delivery_channel_kms_key_arn"><code>delivery_channel_kms_key_arn</code></a> input variable. If null, data in S3 will be encrypted using the default aws/s3 key. If provided, the key policy of the provided key must permit the IAM role used by AWS Config. See https://docs.aws.amazon.com/sns/latest/dg/sns-key-management.html.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="s3_mfa_delete" requirement="optional" type="bool">
<HclListItemDescription>

Enable MFA delete for either 'Change the versioning state of your bucket' or 'Permanently delete an object version'. This setting only applies to the bucket used to storage AWS Config data. This cannot be used to toggle this setting but is available to allow managed buckets to reflect the state in AWS. For instructions on how to enable MFA Delete, check out the README from the private-s3-bucket module. CIS v1.4 requires this variable to be true. If you do not wish to be CIS-compliant, you can set it to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="s3_object_prefix" requirement="optional" type="string">
<HclListItemDescription>

A prefix to use when storing Config objects in S3. This will be the beginning of the path in the S3 object. For example: &lt;s3 bucket name>:/&lt;prefix>/AWSLogs/&lt;account ID>/Config/*. If this variable is null (the default), the path will not include any prefix: e.g., it'll be &lt;s3 bucket name>:/AWSLogs/&lt;account ID>/Config/*.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="should_attach_sns_policy" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, attach an IAM policy, to the AWS Config IAM role that allows the role to publish messages to the SNS topic defined by either `sns_topic_name` or `sns_topic_arn`. Set to false if an SNS topic is not used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="should_create_iam_role" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, create an IAM role for AWS Config. Customize the name of the role by setting iam_role_name. If set to false, the name passed in iam_role_name must already exist.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="should_create_s3_bucket" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, create an S3 bucket for delivering Config objectts. Defaults to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="sns_topic_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of an existing SNS topic. Can be in the same account or another account. To create a new topic, set sns_topic_name. One of <a href="#sns_topic_arn"><code>sns_topic_arn</code></a> or <a href="#sns_topic_name"><code>sns_topic_name</code></a> are required. This module does not support creating AWS Config without an SNS topic.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="sns_topic_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

The ID of an AWS-managed(default) or customer-managed customer master key (CMK) to use for encrypting the Amazon SNS topic (<a href="#sns_topic_name"><code>sns_topic_name</code></a> is non-null). Specify null explicitly to disable encryption of SNS topic.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;alias/aws/sns&quot;"/>
</HclListItem>

<HclListItem name="sns_topic_name" requirement="optional" type="string">
<HclListItemDescription>

If set, creates an SNS topic to which Config notifications will be delivered. To provide an existing topic, set sns_topic_arn. One of <a href="#sns_topic_arn"><code>sns_topic_arn</code></a> or <a href="#sns_topic_name"><code>sns_topic_name</code></a> are required. One of <a href="#sns_topic_arn"><code>sns_topic_arn</code></a> or <a href="#sns_topic_name"><code>sns_topic_name</code></a> are required. This module does not support creating AWS Config without an SNS topic.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the S3 Bucket. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="use_global_record_region" requirement="optional" type="bool">
<HclListItemDescription>

Toggle if the recording_group should be setup using the <a href="#global_recorder_region"><code>global_recorder_region</code></a> (true) or if the recording_group will be setup for each entry in <a href="#recording_groups"><code>recording_groups</code></a> (false). Defaults to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="use_managed_iam_policies" requirement="optional" type="bool">
<HclListItemDescription>

When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="config_recorder_name">
<HclListItemDescription>

The name of the configuration recorder.

</HclListItemDescription>
</HclListItem>

<HclListItem name="iam_role_arn">
<HclListItemDescription>

The ARN of the IAM role used by the config recorder.

</HclListItemDescription>
</HclListItem>

<HclListItem name="iam_role_name">
<HclListItemDescription>

The name of the IAM role used by the config recorder.

</HclListItemDescription>
</HclListItem>

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

<HclListItem name="sns_topic_arn">
<HclListItemDescription>

The ARN of the SNS topic to which Config delivers notifications.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.8/modules/aws-config/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.8/modules/aws-config/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.8/modules/aws-config/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "67906454e18de170e6de04aea4a021af"
}
##DOCS-SOURCER-END -->
