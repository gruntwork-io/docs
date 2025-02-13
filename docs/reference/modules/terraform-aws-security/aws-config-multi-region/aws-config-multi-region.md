---
title: "AWS Config Multi Region Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.75.8" lastModifiedVersion="0.75.7"/>

# AWS Config Multi Region Module

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.8/modules/aws-config-multi-region" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.7" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module wraps the [aws-config core module](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.8/modules/aws-config/README.md) to configure [AWS Config](https://aws.amazon.com/config/) in all enabled regions for the AWS Account, and optionally can aggregate AWS Config across multiple accounts.

![multi account multi region aws config](/img/reference/modules/terraform-aws-security/aws-config-multi-region/multi-account-multi-region-aws-config.png)

## Features

*   Enable AWS Config in all regions

*   Store config items in an encrypted S3 bucket for persistence

*   Configure config items to be automatically archive and delete after a certain time period

*   Designate and configure a global recorder region

*   Create an aggregated view of all regions

*   Consolidate AWS Config from multiple AWS accounts to the S3 bucket and SNS topics in a central account

*   Configure a set of default AWS managed config rules

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/)!

### Core concepts

*   Learn more about AWS Config in the [aws-config core module](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.8/modules/aws-config/README.adoc).

*   [How to use a multi-region module](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.8/codegen/core-concepts.md#how-to-use-a-multi-region-module)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.8/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.

*   [codegen](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.8/codegen): Code generation utilities that help generate modules in this repo.

*   [examples](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.8/examples): This folder contains working examples of how to use the submodules.

*   [test](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.8/test): Automated tests for the modules and examples.

## Deploy

*   [How to configure a production-grade AWS account structure](https://gruntwork.io/guides/foundations/how-to-configure-production-grade-aws-account-structure/)

*   [How does Config work with multiple AWS accounts and multiple regions?](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.8/modules/aws-config-multi-region/core-concepts.md#how-does-config-work-with-multiple-aws-accounts-and-multiple-regions)

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S AWS-CONFIG-MULTI-REGION MODULE
# ------------------------------------------------------------------------------------------------------

module "aws_config_multi_region" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/aws-config-multi-region?ref=v0.75.8"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS Account ID the template should be operated on. This avoids
  # misconfiguration errors caused by environment variables.
  aws_account_id = <string>

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

  # Map of additional managed rules to add on top of the defaults. The key is
  # the name of the rule (e.g. ´acm-certificate-expiration-check´) and the value
  # is an object specifying the rule details
  additional_config_rules = {}

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

  # List of AWS account identifiers to exclude from the rules. Only used if
  # create_account_rules is false.
  config_rule_excluded_accounts = []

  # The maximum frequency with which AWS Config runs evaluations for the
  # ´PERIODIC´ rules. See
  # https://www.terraform.io/docs/providers/aws/r/config_organization_managed_rule.html#maximum_execution_frequency
  config_rule_maximum_execution_frequency = "TwentyFour_Hours"

  # Set to true to create the config rules at the account level or false to
  # create them at the organization level. When you create rules at the
  # organization level, you must run this module in the root account, and the
  # rules will apply to EVERY account in the organization. This allows you to
  # manage the rules centrally, which is convenient, but also has a dependency /
  # ordering issue, as org level config rules require every child account to
  # have an AWS Config Recorder already set up, which is very inconvenient (when
  # adding a new account, you first have to leave the rules disabled for it,
  # then create the account, apply a baseline to it that creates a Config
  # Recorder, and then go back to the root and enable the rules). When creating
  # rules at the account level, you have to create and manage the rules in each
  # account separately, which is inconvenient (but only slightly, since it's all
  # managed as code), but there are no dependency or ordering issues.
  create_account_rules = true

  # Set to false to have this module skip creating resources. This weird
  # parameter exists solely because Terraform does not support conditional
  # modules. Therefore, this is a hack to allow you to conditionally decide if
  # the resources should be created or not.
  create_resources = true

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

  # When true, enable the global AWS Config Configuration Aggregator on all
  # regions regardless of what is passed into var.opt_in_regions.
  enable_all_regions_for_config_aggregator = false

  # Set to true to create a set of default config rules in each enabled region.
  enable_config_rules = true

  # Checks whether the EBS volumes that are in an attached state are encrypted.
  enable_encrypted_volumes_rule = true

  # Checks whether the account password policy for IAM users meets the specified
  # requirements.
  enable_iam_password_policy_rule = true

  # Checks whether your IAM users have passwords or active access keys that have
  # not been used within the specified number of days.
  enable_iam_user_unused_credentials_check = true

  # Checks whether the security group with 0.0.0.0/0 of any Amazon Virtual
  # Private Cloud (Amazon VPC) allows only specific inbound TCP or UDP traffic.
  enable_insecure_sg_rules = true

  # Checks whether storage encryption is enabled for your RDS DB instances.
  enable_rds_storage_encrypted_rule = true

  # Checks whether users of your AWS account require a multi-factor
  # authentication (MFA) device to sign in with root credentials.
  enable_root_account_mfa_rule = true

  # Checks that your Amazon S3 buckets do not allow public read access.
  enable_s3_bucket_public_read_prohibited_rule = true

  # Checks that your Amazon S3 buckets do not allow public write access.
  enable_s3_bucket_public_write_prohibited_rule = true

  # Enables S3 server access logging which sends detailed records for the
  # requests that are made to the bucket. Defaults to false.
  enable_s3_server_access_logging = false

  # ID or ARN of the KMS key that is used to encrypt the volume. Used for
  # configuring the encrypted volumes config rule.
  encrypted_volumes_kms_id = null

  # If set to true, when you run 'terraform destroy', delete all objects from
  # the bucket so that the bucket can be destroyed without error. Warning: these
  # objects are not recoverable so only use this if you're absolutely sure you
  # want to permanently delete everything!
  force_destroy = false

  # The AWS Region to use as the global recorder.
  global_recorder_region = "us-east-1"

  # Number of days before password expiration.
  iam_password_policy_rule_max_password_age = 30

  # Password minimum length.
  iam_password_policy_rule_minimum_password_length = 16

  # Number of passwords before allowing reuse.
  iam_password_policy_rule_password_reuse_prevention = 5

  # Require at least one lowercase character in password.
  iam_password_policy_rule_require_lowercase_characters = true

  # Require at least one number in password.
  iam_password_policy_rule_require_numbers = true

  # Require at least one symbol in password.
  iam_password_policy_rule_require_symbols = true

  # Require at least one uppercase character in password.
  iam_password_policy_rule_require_uppercase_characters = true

  # The name of an IAM role for Config service to assume. Must be unique within
  # the AWS account.
  iam_role_name = "AWS_ConfigRole"

  # Maximum number of days a credential can be not used.
  iam_user_max_credential_usage_age = 90

  # Comma-separated list of TCP ports authorized to be open to 0.0.0.0/0. Ranges
  # are defined by a dash; for example, '443,1020-1025'.
  insecure_sg_rules_authorized_tcp_ports = null

  # Comma-separated list of UDP ports authorized to be open to 0.0.0.0/0. Ranges
  # are defined by a dash; for example, '500,1020-1025'.
  insecure_sg_rules_authorized_udp_ports = null

  # Optional KMS key to use for each region for configuring default encryption
  # for the S3 bucket and SNS topic (encoded as a map from region - e.g.
  # us-east-1 - to ARN of KMS key). This is a backward compatible interface for
  # configuring a single KMS key for both S3 objects and the SNS topic. When
  # null, falls back to using var.s3_bucket_kms_key_arn and
  # var.sns_topic_kms_key_region_map
  kms_key_arn = null

  # For multi-account deployments, in the central account, provide a list of AWS
  # account IDs that should have permissions to write to the S3 bucket and
  # publish to the SNS topic. Use this in conjunction with
  # should_create_s3_bucket and sns_topic_name. If this is a child account,
  # leave this list empty.
  linked_accounts = []

  # After this number of days, log files should be transitioned from S3 to
  # Glacier. Enter 0 to never archive log data.
  num_days_after_which_archive_log_data = 365

  # After this number of days, log files should be deleted from S3. Enter 0 to
  # never delete log data.
  num_days_after_which_delete_log_data = 730

  # KMS key ID or ARN used to encrypt the storage. Used for configuring the RDS
  # storage encryption config rule.
  rds_storage_encrypted_kms_id = null

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
  # recording_frequency:
  # The frequency with which AWS Config records configuration changes (service defaults to CONTINUOUS).
  # - CONTINUOUS
  # - DAILY
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
  # https://docs.aws.amazon.com/sns/latest/dg/sns-key-management.html. Note that
  # the key should be in the same region as the global recorder region (where
  # the S3 bucket will be created).
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

  # Set this to true to create an S3 bucket in the same region where the global
  # recorder is configured. For multi-account deployments, set this to true for
  # the central account that should host the S3 bucket and SNS topics, and false
  # for all other accounts.
  should_create_s3_bucket = true

  # If true, create an SNS topic for Config notifications.
  should_create_sns_topic = true

  # Optional KMS key to use for each region for configuring default encryption
  # for the SNS topic (encoded as a map from region - e.g. us-east-1 - to ARN of
  # KMS key). If null or the region key is missing, encryption will not be
  # configured for the SNS topic in that region.
  sns_topic_kms_key_region_map = null

  # The name of the SNS topic to use for Config notifications.
  sns_topic_name = "ConfigTopic"

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
# DEPLOY GRUNTWORK'S AWS-CONFIG-MULTI-REGION MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/aws-config-multi-region?ref=v0.75.8"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS Account ID the template should be operated on. This avoids
  # misconfiguration errors caused by environment variables.
  aws_account_id = <string>

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

  # Map of additional managed rules to add on top of the defaults. The key is
  # the name of the rule (e.g. ´acm-certificate-expiration-check´) and the value
  # is an object specifying the rule details
  additional_config_rules = {}

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

  # List of AWS account identifiers to exclude from the rules. Only used if
  # create_account_rules is false.
  config_rule_excluded_accounts = []

  # The maximum frequency with which AWS Config runs evaluations for the
  # ´PERIODIC´ rules. See
  # https://www.terraform.io/docs/providers/aws/r/config_organization_managed_rule.html#maximum_execution_frequency
  config_rule_maximum_execution_frequency = "TwentyFour_Hours"

  # Set to true to create the config rules at the account level or false to
  # create them at the organization level. When you create rules at the
  # organization level, you must run this module in the root account, and the
  # rules will apply to EVERY account in the organization. This allows you to
  # manage the rules centrally, which is convenient, but also has a dependency /
  # ordering issue, as org level config rules require every child account to
  # have an AWS Config Recorder already set up, which is very inconvenient (when
  # adding a new account, you first have to leave the rules disabled for it,
  # then create the account, apply a baseline to it that creates a Config
  # Recorder, and then go back to the root and enable the rules). When creating
  # rules at the account level, you have to create and manage the rules in each
  # account separately, which is inconvenient (but only slightly, since it's all
  # managed as code), but there are no dependency or ordering issues.
  create_account_rules = true

  # Set to false to have this module skip creating resources. This weird
  # parameter exists solely because Terraform does not support conditional
  # modules. Therefore, this is a hack to allow you to conditionally decide if
  # the resources should be created or not.
  create_resources = true

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

  # When true, enable the global AWS Config Configuration Aggregator on all
  # regions regardless of what is passed into var.opt_in_regions.
  enable_all_regions_for_config_aggregator = false

  # Set to true to create a set of default config rules in each enabled region.
  enable_config_rules = true

  # Checks whether the EBS volumes that are in an attached state are encrypted.
  enable_encrypted_volumes_rule = true

  # Checks whether the account password policy for IAM users meets the specified
  # requirements.
  enable_iam_password_policy_rule = true

  # Checks whether your IAM users have passwords or active access keys that have
  # not been used within the specified number of days.
  enable_iam_user_unused_credentials_check = true

  # Checks whether the security group with 0.0.0.0/0 of any Amazon Virtual
  # Private Cloud (Amazon VPC) allows only specific inbound TCP or UDP traffic.
  enable_insecure_sg_rules = true

  # Checks whether storage encryption is enabled for your RDS DB instances.
  enable_rds_storage_encrypted_rule = true

  # Checks whether users of your AWS account require a multi-factor
  # authentication (MFA) device to sign in with root credentials.
  enable_root_account_mfa_rule = true

  # Checks that your Amazon S3 buckets do not allow public read access.
  enable_s3_bucket_public_read_prohibited_rule = true

  # Checks that your Amazon S3 buckets do not allow public write access.
  enable_s3_bucket_public_write_prohibited_rule = true

  # Enables S3 server access logging which sends detailed records for the
  # requests that are made to the bucket. Defaults to false.
  enable_s3_server_access_logging = false

  # ID or ARN of the KMS key that is used to encrypt the volume. Used for
  # configuring the encrypted volumes config rule.
  encrypted_volumes_kms_id = null

  # If set to true, when you run 'terraform destroy', delete all objects from
  # the bucket so that the bucket can be destroyed without error. Warning: these
  # objects are not recoverable so only use this if you're absolutely sure you
  # want to permanently delete everything!
  force_destroy = false

  # The AWS Region to use as the global recorder.
  global_recorder_region = "us-east-1"

  # Number of days before password expiration.
  iam_password_policy_rule_max_password_age = 30

  # Password minimum length.
  iam_password_policy_rule_minimum_password_length = 16

  # Number of passwords before allowing reuse.
  iam_password_policy_rule_password_reuse_prevention = 5

  # Require at least one lowercase character in password.
  iam_password_policy_rule_require_lowercase_characters = true

  # Require at least one number in password.
  iam_password_policy_rule_require_numbers = true

  # Require at least one symbol in password.
  iam_password_policy_rule_require_symbols = true

  # Require at least one uppercase character in password.
  iam_password_policy_rule_require_uppercase_characters = true

  # The name of an IAM role for Config service to assume. Must be unique within
  # the AWS account.
  iam_role_name = "AWS_ConfigRole"

  # Maximum number of days a credential can be not used.
  iam_user_max_credential_usage_age = 90

  # Comma-separated list of TCP ports authorized to be open to 0.0.0.0/0. Ranges
  # are defined by a dash; for example, '443,1020-1025'.
  insecure_sg_rules_authorized_tcp_ports = null

  # Comma-separated list of UDP ports authorized to be open to 0.0.0.0/0. Ranges
  # are defined by a dash; for example, '500,1020-1025'.
  insecure_sg_rules_authorized_udp_ports = null

  # Optional KMS key to use for each region for configuring default encryption
  # for the S3 bucket and SNS topic (encoded as a map from region - e.g.
  # us-east-1 - to ARN of KMS key). This is a backward compatible interface for
  # configuring a single KMS key for both S3 objects and the SNS topic. When
  # null, falls back to using var.s3_bucket_kms_key_arn and
  # var.sns_topic_kms_key_region_map
  kms_key_arn = null

  # For multi-account deployments, in the central account, provide a list of AWS
  # account IDs that should have permissions to write to the S3 bucket and
  # publish to the SNS topic. Use this in conjunction with
  # should_create_s3_bucket and sns_topic_name. If this is a child account,
  # leave this list empty.
  linked_accounts = []

  # After this number of days, log files should be transitioned from S3 to
  # Glacier. Enter 0 to never archive log data.
  num_days_after_which_archive_log_data = 365

  # After this number of days, log files should be deleted from S3. Enter 0 to
  # never delete log data.
  num_days_after_which_delete_log_data = 730

  # KMS key ID or ARN used to encrypt the storage. Used for configuring the RDS
  # storage encryption config rule.
  rds_storage_encrypted_kms_id = null

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
  # recording_frequency:
  # The frequency with which AWS Config records configuration changes (service defaults to CONTINUOUS).
  # - CONTINUOUS
  # - DAILY
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
  # https://docs.aws.amazon.com/sns/latest/dg/sns-key-management.html. Note that
  # the key should be in the same region as the global recorder region (where
  # the S3 bucket will be created).
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

  # Set this to true to create an S3 bucket in the same region where the global
  # recorder is configured. For multi-account deployments, set this to true for
  # the central account that should host the S3 bucket and SNS topics, and false
  # for all other accounts.
  should_create_s3_bucket = true

  # If true, create an SNS topic for Config notifications.
  should_create_sns_topic = true

  # Optional KMS key to use for each region for configuring default encryption
  # for the SNS topic (encoded as a map from region - e.g. us-east-1 - to ARN of
  # KMS key). If null or the region key is missing, encryption will not be
  # configured for the SNS topic in that region.
  sns_topic_kms_key_region_map = null

  # The name of the SNS topic to use for Config notifications.
  sns_topic_name = "ConfigTopic"

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

<HclListItem name="aws_account_id" requirement="required" type="string">
<HclListItemDescription>

The AWS Account ID the template should be operated on. This avoids misconfiguration errors caused by environment variables.

</HclListItemDescription>
</HclListItem>

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

<HclListItem name="additional_config_rules" requirement="optional" type="map(object(…))">
<HclListItemDescription>

Map of additional managed rules to add on top of the defaults. The key is the name of the rule (e.g. ´acm-certificate-expiration-check´) and the value is an object specifying the rule details

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    # Description of the rule
    description = string
    # Identifier of an available AWS Config Managed Rule to call.
    identifier = string
    # Trigger type of the rule, must be one of ´CONFIG_CHANGE´ or ´PERIODIC´.
    trigger_type = string
    # A map of input parameters for the rule. If you don't have parameters, pass in an empty map ´{}´.
    input_parameters = map(string)
    # Whether or not this applies to global (non-regional) resources like IAM roles. When true, these rules are only
    # applied in the global config recorder region.
    applies_to_global_resources = bool
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   additional_config_rules = {
     acm-certificate-expiration-check = {
       description                 = "Checks whether ACM Certificates in your account are marked for expiration within the specified number of days.",
       identifier                  = "ACM_CERTIFICATE_EXPIRATION_CHECK",
       trigger_type                = "PERIODIC",
       input_parameters            = { "daysToExpiration": "14"},
       applies_to_global_resources = false
     }
   }

```
</details>

</HclGeneralListItem>
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

<HclListItem name="config_rule_excluded_accounts" requirement="optional" type="list(string)">
<HclListItemDescription>

List of AWS account identifiers to exclude from the rules. Only used if create_account_rules is false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="config_rule_maximum_execution_frequency" requirement="optional" type="string">
<HclListItemDescription>

The maximum frequency with which AWS Config runs evaluations for the ´PERIODIC´ rules. See https://www.terraform.io/docs/providers/aws/r/config_organization_managed_rule.html#maximum_execution_frequency

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;TwentyFour_Hours&quot;"/>
</HclListItem>

<HclListItem name="create_account_rules" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to create the config rules at the account level or false to create them at the organization level. When you create rules at the organization level, you must run this module in the root account, and the rules will apply to EVERY account in the organization. This allows you to manage the rules centrally, which is convenient, but also has a dependency / ordering issue, as org level config rules require every child account to have an AWS Config Recorder already set up, which is very inconvenient (when adding a new account, you first have to leave the rules disabled for it, then create the account, apply a baseline to it that creates a Config Recorder, and then go back to the root and enable the rules). When creating rules at the account level, you have to create and manage the rules in each account separately, which is inconvenient (but only slightly, since it's all managed as code), but there are no dependency or ordering issues.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to have this module skip creating resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if the resources should be created or not.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
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

When true, enable the global AWS Config Configuration Aggregator on all regions regardless of what is passed into <a href="#opt_in_regions"><code>opt_in_regions</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_config_rules" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to create a set of default config rules in each enabled region.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_encrypted_volumes_rule" requirement="optional" type="bool">
<HclListItemDescription>

Checks whether the EBS volumes that are in an attached state are encrypted.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_iam_password_policy_rule" requirement="optional" type="bool">
<HclListItemDescription>

Checks whether the account password policy for IAM users meets the specified requirements.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_iam_user_unused_credentials_check" requirement="optional" type="bool">
<HclListItemDescription>

Checks whether your IAM users have passwords or active access keys that have not been used within the specified number of days.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_insecure_sg_rules" requirement="optional" type="bool">
<HclListItemDescription>

Checks whether the security group with 0.0.0.0/0 of any Amazon Virtual Private Cloud (Amazon VPC) allows only specific inbound TCP or UDP traffic.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_rds_storage_encrypted_rule" requirement="optional" type="bool">
<HclListItemDescription>

Checks whether storage encryption is enabled for your RDS DB instances.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_root_account_mfa_rule" requirement="optional" type="bool">
<HclListItemDescription>

Checks whether users of your AWS account require a multi-factor authentication (MFA) device to sign in with root credentials.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_s3_bucket_public_read_prohibited_rule" requirement="optional" type="bool">
<HclListItemDescription>

Checks that your Amazon S3 buckets do not allow public read access.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_s3_bucket_public_write_prohibited_rule" requirement="optional" type="bool">
<HclListItemDescription>

Checks that your Amazon S3 buckets do not allow public write access.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_s3_server_access_logging" requirement="optional" type="bool">
<HclListItemDescription>

Enables S3 server access logging which sends detailed records for the requests that are made to the bucket. Defaults to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="encrypted_volumes_kms_id" requirement="optional" type="string">
<HclListItemDescription>

ID or ARN of the KMS key that is used to encrypt the volume. Used for configuring the encrypted volumes config rule.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="force_destroy" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, when you run 'terraform destroy', delete all objects from the bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="global_recorder_region" requirement="optional" type="string">
<HclListItemDescription>

The AWS Region to use as the global recorder.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;us-east-1&quot;"/>
</HclListItem>

<HclListItem name="iam_password_policy_rule_max_password_age" requirement="optional" type="number">
<HclListItemDescription>

Number of days before password expiration.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="iam_password_policy_rule_minimum_password_length" requirement="optional" type="number">
<HclListItemDescription>

Password minimum length.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="16"/>
</HclListItem>

<HclListItem name="iam_password_policy_rule_password_reuse_prevention" requirement="optional" type="number">
<HclListItemDescription>

Number of passwords before allowing reuse.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="5"/>
</HclListItem>

<HclListItem name="iam_password_policy_rule_require_lowercase_characters" requirement="optional" type="bool">
<HclListItemDescription>

Require at least one lowercase character in password.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="iam_password_policy_rule_require_numbers" requirement="optional" type="bool">
<HclListItemDescription>

Require at least one number in password.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="iam_password_policy_rule_require_symbols" requirement="optional" type="bool">
<HclListItemDescription>

Require at least one symbol in password.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="iam_password_policy_rule_require_uppercase_characters" requirement="optional" type="bool">
<HclListItemDescription>

Require at least one uppercase character in password.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

The name of an IAM role for Config service to assume. Must be unique within the AWS account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;AWS_ConfigRole&quot;"/>
</HclListItem>

<HclListItem name="iam_user_max_credential_usage_age" requirement="optional" type="number">
<HclListItemDescription>

Maximum number of days a credential can be not used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="90"/>
</HclListItem>

<HclListItem name="insecure_sg_rules_authorized_tcp_ports" requirement="optional" type="string">
<HclListItemDescription>

Comma-separated list of TCP ports authorized to be open to 0.0.0.0/0. Ranges are defined by a dash; for example, '443,1020-1025'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="insecure_sg_rules_authorized_udp_ports" requirement="optional" type="string">
<HclListItemDescription>

Comma-separated list of UDP ports authorized to be open to 0.0.0.0/0. Ranges are defined by a dash; for example, '500,1020-1025'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="kms_key_arn" requirement="optional" type="map(string)">
<HclListItemDescription>

Optional KMS key to use for each region for configuring default encryption for the S3 bucket and SNS topic (encoded as a map from region - e.g. us-east-1 - to ARN of KMS key). This is a backward compatible interface for configuring a single KMS key for both S3 objects and the SNS topic. When null, falls back to using <a href="#s3_bucket_kms_key_arn"><code>s3_bucket_kms_key_arn</code></a> and <a href="#sns_topic_kms_key_region_map"><code>sns_topic_kms_key_region_map</code></a>

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="linked_accounts" requirement="optional" type="list(string)">
<HclListItemDescription>

For multi-account deployments, in the central account, provide a list of AWS account IDs that should have permissions to write to the S3 bucket and publish to the SNS topic. Use this in conjunction with should_create_s3_bucket and sns_topic_name. If this is a child account, leave this list empty.

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

After this number of days, log files should be deleted from S3. Enter 0 to never delete log data.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="730"/>
</HclListItem>

<HclListItem name="rds_storage_encrypted_kms_id" requirement="optional" type="string">
<HclListItemDescription>

KMS key ID or ARN used to encrypt the storage. Used for configuring the RDS storage encryption config rule.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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

Optional KMS key to use for encrypting S3 objects on the AWS Config bucket, when the S3 bucket is created within this module (<a href="#should_create_s3_bucket"><code>should_create_s3_bucket</code></a> is true). For encrypting S3 objects on delivery for an externally managed S3 bucket, refer to the <a href="#delivery_channel_kms_key_arn"><code>delivery_channel_kms_key_arn</code></a> input variable. If null, data in S3 will be encrypted using the default aws/s3 key. If provided, the key policy of the provided key must permit the IAM role used by AWS Config. See https://docs.aws.amazon.com/sns/latest/dg/sns-key-management.html. Note that the key should be in the same region as the global recorder region (where the S3 bucket will be created).

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

<HclListItem name="should_create_s3_bucket" requirement="optional" type="bool">
<HclListItemDescription>

Set this to true to create an S3 bucket in the same region where the global recorder is configured. For multi-account deployments, set this to true for the central account that should host the S3 bucket and SNS topics, and false for all other accounts.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="should_create_sns_topic" requirement="optional" type="bool">
<HclListItemDescription>

If true, create an SNS topic for Config notifications.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="sns_topic_kms_key_region_map" requirement="optional" type="map(string)">
<HclListItemDescription>

Optional KMS key to use for each region for configuring default encryption for the SNS topic (encoded as a map from region - e.g. us-east-1 - to ARN of KMS key). If null or the region key is missing, encryption will not be configured for the SNS topic in that region.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="sns_topic_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the SNS topic to use for Config notifications.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ConfigTopic&quot;"/>
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

<HclListItem name="config_iam_role_arns">
<HclListItemDescription>

The ARNs of the IAM role used by the config recorder.

</HclListItemDescription>
</HclListItem>

<HclListItem name="config_recorder_names">
<HclListItemDescription>

The names of the configuration recorder.

</HclListItemDescription>
</HclListItem>

<HclListItem name="config_s3_bucket_names">
<HclListItemDescription>

The names of the S3 bucket used by AWS Config to store configuration items.

</HclListItemDescription>
</HclListItem>

<HclListItem name="config_sns_topic_arns">
<HclListItemDescription>

The ARNs of the SNS Topic used by the config notifications.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.8/modules/aws-config-multi-region/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.8/modules/aws-config-multi-region/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.8/modules/aws-config-multi-region/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "b875ba6e5790200df0efa78b056b3b82"
}
##DOCS-SOURCER-END -->
