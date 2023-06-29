---
type: "service"
name: "AWS Root Account baseline wrapper"
description: "A security baseline for AWS Landing Zone for configuring the root account (AKA master account) of an AWS Organization, including setting up child accounts, AWS Config, AWS CloudTrail, Amazon Guard Duty, IAM users, IAM groups, IAM password policy, and more."
category: "landing-zone"
cloud: "aws"
tags: ["aws-landing-zone","logging","security"]
license: "gruntwork"
built-with: "terraform"
title: "Account Baseline for root account"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.104.14" lastModifiedVersion="0.102.1"/>

# Account Baseline for root account

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/landingzone/account-baseline-root" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=landingzone%2Faccount-baseline-root" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>

## Overview

A security baseline for AWS Landing Zone for configuring the root account (AKA master account) of an AWS Organization, including setting up
child accounts, AWS Config, AWS CloudTrail, Amazon Guard Duty, IAM users, IAM groups, IAM password policy, and more.

## Features

Get a secure baseline for the root account of your AWS Organization that includes:

*   [aws-config-multi-region](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/aws-config-multi-region)
*   [aws-organizations](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/aws-organizations)
*   [aws-organizations-config-rules](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/aws-organizations-config-rules)
*   [cloudtrail](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/cloudtrail)
*   [cross-account-iam-roles](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/cross-account-iam-roles)
*   [guardduty-multi-region](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/guardduty-multi-region)
*   [iam-groups](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/iam-groups)
*   [iam-users](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/iam-users)
*   [iam-user-password-policy](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/iam-user-password-policy)

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

### Core concepts

*   Learn more about each individual module, click the link in the [Features](#features) section
*   [How to configure a production-grade AWS account structure](https://docs.gruntwork.io/guides/build-it-yourself/landing-zone/)
*   [How to create child accounts](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/core-concepts.md#creating-child-accounts)
*   [How to aggregate AWS Config and CloudTrail data in a logs account](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/core-concepts.md#aggregating-aws-config-and-cloudtrail-data-in-a-logs-account)
*   [Why does this module use account-level AWS Config Rules?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/core-concepts.md#why-does-this-module-use-account-level-aws-config-rules)
*   [How to use multi-region services](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/core-concepts.md#how-to-use-multi-region-services)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.
*   [examples](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples): This folder contains working examples of how to use the submodules.
*   [test](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing/landingzone folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-learning-and-testing/landingzone): The
    `examples/for-learning-and-testing/landingzone` folder contains standalone sample code optimized for learning,
    experimenting, and testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/), and it shows you how we build an
    end-to-end integrated tech stack on top of the Gruntwork Service Catalog.

*   [How to configure a production-grade AWS account structure](https://docs.gruntwork.io/guides/build-it-yourself/landing-zone/)


## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ACCOUNT-BASELINE-ROOT MODULE
# ------------------------------------------------------------------------------------------------------

module "account_baseline_root" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/account-baseline-root?ref=v0.104.14"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS Account ID the template should be operated on. This avoids
  # misconfiguration errors caused by environment variables.
  aws_account_id = <string>

  # The AWS Region to use as the global config recorder and seed region for
  # GuardDuty.
  aws_region = <string>

  # Map of child accounts to create. The map key is the name of the account and
  # the value is an object containing account configuration variables. See the
  # comments below for what keys and values this object should contain.
  child_accounts = <any>

  # Creates resources in the specified regions. The best practice is to enable
  # AWS Config in all enabled regions in your AWS account. This variable must
  # NOT be set to null or empty. Otherwise, we won't know which regions to use
  # and authenticate to, and may use some not enabled in your AWS account (e.g.,
  # GovCloud, China, etc). To get the list of regions enabled in your AWS
  # account, you can use the AWS CLI: aws ec2 describe-regions.
  config_opt_in_regions = <list(string)>

  # Creates resources in the specified regions. The best practice is to enable
  # EBS Encryption in all enabled regions in your AWS account. This variable
  # must NOT be set to null or empty. Otherwise, we won't know which regions to
  # use and authenticate to, and may use some not enabled in your AWS account
  # (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS
  # account, you can use the AWS CLI: aws ec2 describe-regions. The value
  # provided for global_recorder_region must be in this list.
  ebs_opt_in_regions = <list(string)>

  # Creates resources in the specified regions. The best practice is to enable
  # GuardDuty in all enabled regions in your AWS account. This variable must NOT
  # be set to null or empty. Otherwise, we won't know which regions to use and
  # authenticate to, and may use some not enabled in your AWS account (e.g.,
  # GovCloud, China, etc). To get the list of regions enabled in your AWS
  # account, you can use the AWS CLI: aws ec2 describe-regions. The value
  # provided for global_recorder_region must be in this list.
  guardduty_opt_in_regions = <list(string)>

  # Creates resources in the specified regions. The best practice is to enable
  # IAM Access Analyzer in all enabled regions in your AWS account. This
  # variable must NOT be set to null or empty. Otherwise, we won't know which
  # regions to use and authenticate to, and may use some not enabled in your AWS
  # account (e.g., GovCloud, China, etc). To get the list of regions enabled in
  # your AWS account, you can use the AWS CLI: aws ec2 describe-regions. The
  # value provided for global_recorder_region must be in this list.
  iam_access_analyzer_opt_in_regions = <list(string)>

  # The name used to prefix AWS Config and Cloudtrail resources, including the
  # S3 bucket names and SNS topics used for each.
  name_prefix = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Map of additional managed rules to add. The key is the name of the rule
  # (e.g. ´acm-certificate-expiration-check´) and the value is an object
  # specifying the rule details
  additional_config_rules = {}

  # Map of github repositories to the list of branches that are allowed to
  # assume the IAM role. The repository should be encoded as org/repo-name
  # (e.g., gruntwork-io/terrraform-aws-ci). Allows GitHub Actions to assume the
  # auto deploy IAM role using an OpenID Connect Provider for the given
  # repositories. Refer to the docs for github-actions-iam-role for more
  # information. Note that this is mutually exclusive with
  # var.allow_auto_deploy_from_other_account_arns. Only used if
  # var.enable_github_actions_access is true. 
  allow_auto_deploy_from_github_actions_for_sources = {}

  # A list of IAM ARNs from other AWS accounts that will be allowed to assume
  # the auto deploy IAM role that has the permissions in
  # var.auto_deploy_permissions.
  allow_auto_deploy_from_other_account_arns = []

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role
  allow_auto_deploy_iam_role_permissions_boundary = null

  # A list of IAM ARNs from other AWS accounts that will be allowed full (read
  # and write) access to the billing info for this account.
  allow_billing_access_from_other_account_arns = []

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role
  allow_billing_access_iam_role_permissions_boundary = null

  # If true, an IAM Policy that grants access to CloudTrail will be honored. If
  # false, only the ARNs listed in var.kms_key_user_iam_arns will have access to
  # CloudTrail and any IAM Policy grants will be ignored. (true or false)
  allow_cloudtrail_access_with_iam = true

  # A list of IAM ARNs from other AWS accounts that will be allowed full (read
  # and write) access to the services in this account specified in
  # var.dev_permitted_services.
  allow_dev_access_from_other_account_arns = []

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role
  allow_dev_access_iam_role_permissions_boundary = null

  # A list of IAM ARNs from other AWS accounts that will be allowed full (read
  # and write) access to this account.
  allow_full_access_from_other_account_arns = []

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role
  allow_full_access_iam_role_permissions_boundary = null

  # A list of IAM ARNs from other AWS accounts that will be allowed read access
  # to the logs in CloudTrail, AWS Config, and CloudWatch for this account. If
  # var.cloudtrail_kms_key_arn is specified, will also be given permissions to
  # decrypt with the KMS CMK that is used to encrypt CloudTrail logs.
  allow_logs_access_from_other_account_arns = []

  # A list of IAM ARNs from other AWS accounts that will be allowed read-only
  # access to this account.
  allow_read_only_access_from_other_account_arns = []

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role
  allow_read_only_access_iam_role_permissions_boundary = null

  # A list of IAM ARNs from other AWS accounts that will be allowed read access
  # to IAM groups and publish SSH keys. This is used for ssh-grunt.
  allow_ssh_grunt_access_from_other_account_arns = []

  # A list of IAM ARNs from other AWS accounts that will be allowed access to
  # AWS support for this account.
  allow_support_access_from_other_account_arns = []

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role
  allow_support_access_iam_role_permissions_boundary = null

  # A list of IAM permissions (e.g. ec2:*) that will be added to an IAM Group
  # for doing automated deployments. NOTE: If
  # var.should_create_iam_group_auto_deploy is true, the list must have at least
  # one element (e.g. '*').
  auto_deploy_permissions = []

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role
  aws_config_iam_role_permissions_boundary = null

  # Additional IAM policies to apply to cloudtrail S3 bucket. You can use this
  # to grant read/write access beyond what is provided to Cloudtrail. This
  # should be a map, where each key is a unique statement ID (SID), and each
  # value is an object that contains the parameters defined in the comment
  # below.
  cloudtrail_additional_bucket_policy_statements = null

  # Map of advanced event selector name to list of field selectors to apply for
  # that event selector. Advanced event selectors allow for more fine grained
  # data logging of events.

Note that you can not configure basic data logging
  # (var.cloudtrail_data_logging_enabled) if advanced event logging is
  # enabled.

Refer to the AWS docs on data event selection for more details on
  # the difference between basic data logging and advanced data logging.
  cloudtrail_advanced_event_selectors = {}

  # Whether or not to allow kms:DescribeKey to external AWS accounts with write
  # access to the CloudTrail bucket. This is useful during deployment so that
  # you don't have to pass around the KMS key ARN.
  cloudtrail_allow_kms_describe_key_to_external_aws_accounts = false

  # Specify the name of the CloudWatch Logs group to publish the CloudTrail logs
  # to. This log group exists in the current account. Set this value to `null`
  # to avoid publishing the trail logs to the logs group. The recommended
  # configuration for CloudTrail is (a) for each child account to aggregate its
  # logs in an S3 bucket in a single central account, such as a logs account and
  # (b) to also store 14 days work of logs in CloudWatch in the child account
  # itself for local debugging.
  cloudtrail_cloudwatch_logs_group_name = "cloudtrail-logs"

  # If true, logging of data events will be enabled.
  cloudtrail_data_logging_enabled = false

  # Specify if you want your event selector to include management events for
  # your trail.
  cloudtrail_data_logging_include_management_events = true

  # Specify if you want your trail to log read-only events, write-only events,
  # or all. Possible values are: ReadOnly, WriteOnly, All.
  cloudtrail_data_logging_read_write_type = "All"

  # Data resources for which to log data events. This should be a map, where
  # each key is a data resource type, and each value is a list of data resource
  # values. Possible values for data resource types are: AWS::S3::Object,
  # AWS::Lambda::Function and AWS::DynamoDB::Table. See the 'data_resource'
  # block within the 'event_selector' block of the 'aws_cloudtrail' resource for
  # context:
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudtrail#data_resource.
  cloudtrail_data_logging_resources = {}

  # Whether or not to enable automatic annual rotation of the KMS key. Defaults
  # to true.
  cloudtrail_enable_key_rotation = true

  # If set to true, when you run 'terraform destroy', delete all objects from
  # the bucket so that the bucket can be destroyed without error. Warning: these
  # objects are not recoverable so only use this if you're absolutely sure you
  # want to permanently delete everything!
  cloudtrail_force_destroy = false

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role
  cloudtrail_iam_role_permissions_boundary = null

  # Specifies whether the trail is an AWS Organizations trail. Organization
  # trails log events for the root account and all member accounts. Can only be
  # created in the organization root account. (true or false)
  cloudtrail_is_organization_trail = false

  # All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key)
  # that governs access to write API calls older than 7 days and all read API
  # calls. The IAM Users specified in this list will have rights to change who
  # can access this extended log data. Note that if you specify a logs account
  # (by setting is_logs_account = true on one of the accounts in
  # var.child_accounts), the KMS CMK will be created in that account, and the
  # root of that account will automatically be made an admin of the CMK.
  cloudtrail_kms_key_administrator_iam_arns = []

  # All CloudTrail Logs will be encrypted with a KMS CMK (Customer Master Key)
  # that governs access to write API calls older than 7 days and all read API
  # calls. If that CMK already exists, set this to the ARN of that CMK.
  # Otherwise, set this to null, and a new CMK will be created. If you set
  # is_logs_account to true on one of the accounts in var.child_accounts, the
  # KMS CMK will be created in that account (this is the recommended approach!).
  cloudtrail_kms_key_arn = null

  # If the kms_key_arn provided is an alias or alias ARN, then this must be set
  # to true so that the module will exchange the alias for a CMK ARN. Setting
  # this to true and using aliases requires
  # var.cloudtrail_allow_kms_describe_key_to_external_aws_accounts to also be
  # true for multi-account scenarios.
  cloudtrail_kms_key_arn_is_alias = false

  # Additional service principals beyond CloudTrail that should have access to
  # the KMS key used to encrypt the logs. This is useful for granting access to
  # the logs for the purposes of constructing metric filters.
  cloudtrail_kms_key_service_principals = []

  # All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key)
  # that governs access to write API calls older than 7 days and all read API
  # calls. The IAM Users specified in this list will have read-only access to
  # this extended log data.
  cloudtrail_kms_key_user_iam_arns = []

  # After this number of days, log files should be transitioned from S3 to
  # Glacier. Enter 0 to never archive log data.
  cloudtrail_num_days_after_which_archive_log_data = 30

  # After this number of days, log files should be deleted from S3. Enter 0 to
  # never delete log data.
  cloudtrail_num_days_after_which_delete_log_data = 365

  # After this number of days, logs stored in CloudWatch will be deleted.
  # Possible values are: 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400,
  # 545, 731, 1827, 3653, and 0 (default). When set to 0, logs will be retained
  # indefinitely.
  cloudtrail_num_days_to_retain_cloudwatch_logs = 0

  # The ID of the organization. Required only if an organization wide CloudTrail
  # is being setup and `create_organization` is set to false. The organization
  # ID is required to ensure that the entire organization is whitelisted in the
  # CloudTrail bucket write policy.
  cloudtrail_organization_id = null

  # The name of the S3 Bucket where CloudTrail logs will be stored. This could
  # be a bucket in this AWS account or the name of a bucket in another AWS
  # account where CloudTrail logs should be sent. If you set is_logs_account on
  # one of the accounts in var.child_accounts, the S3 bucket will be created in
  # that account (this is the recommended approach!).
  cloudtrail_s3_bucket_name = null

  # Enable MFA delete for either 'Change the versioning state of your bucket' or
  # 'Permanently delete an object version'. This setting only applies to the
  # bucket used to storage Cloudtrail data. This cannot be used to toggle this
  # setting but is available to allow managed buckets to reflect the state in
  # AWS.  For instructions on how to enable MFA Delete, check out the README
  # from the terraform-aws-security/private-s3-bucket module.
  cloudtrail_s3_mfa_delete = false

  # If true, create an S3 bucket of name var.cloudtrail_s3_bucket_name for
  # CloudTrail logs, either in the logs account—the account in
  # var.child_accounts that has is_logs_account set to true (this is the
  # recommended approach!)—or in this account if none of the child accounts are
  # marked as a logs account. If false, assume var.cloudtrail_s3_bucket_name is
  # an S3 bucket that already exists. We recommend setting this to true and
  # setting is_logs_account to true on one of the accounts in var.child_accounts
  # to use that account as a logs account where you aggregate all your
  # CloudTrail data. In case you want to disable the CloudTrail module and the
  # S3 bucket, you need to set both var.enable_cloudtrail and
  # cloudtrail_should_create_s3_bucket to false.
  cloudtrail_should_create_s3_bucket = true

  # Tags to apply to the CloudTrail resources.
  cloudtrail_tags = {}

  # Set to true to send the AWS Config data to another account (e.g., a logs
  # account) for aggregation purposes. You must set the ID of that other account
  # via the config_central_account_id variable. Note that if one of the accounts
  # in var.child_accounts has is_logs_account set to true (this is the approach
  # we recommended!), this variable will be assumed to be true, so you don't
  # have to pass any value for it.  This redundant variable has to exist because
  # Terraform does not allow computed data in count and for_each parameters and
  # var.config_central_account_id may be computed if its the ID of a
  # newly-created AWS account.
  config_aggregate_config_data_in_external_account = false

  # If the S3 bucket and SNS topics used for AWS Config live in a different AWS
  # account, set this variable to the ID of that account. If the S3 bucket and
  # SNS topics live in this account, set this variable to an empty string. Note
  # that if one of the accounts in var.child_accounts has is_logs_account set to
  # true (this is the approach we recommended!), that account's ID will be used
  # automatically, and you can leave this variable null.
  config_central_account_id = ""

  # Set to true to create account-level AWS Config rules directly in this
  # account. Set false to create org-level rules that apply to this account and
  # all child accounts. We recommend setting this to true to use account-level
  # rules because org-level rules create a chicken-and-egg problem with creating
  # new accounts (see this module's README for details).
  config_create_account_rules = true

  # Optional KMS key to use for encrypting S3 objects on the AWS Config delivery
  # channel for an externally managed S3 bucket. This must belong to the same
  # region as the destination S3 bucket. If null, AWS Config will default to
  # encrypting the delivered data with AES-256 encryption. Only used if
  # var.should_create_s3_bucket is false - otherwise,
  # var.config_s3_bucket_kms_key_arn is used.
  config_delivery_channel_kms_key_arn = null

  # If set to true, when you run 'terraform destroy', delete all objects from
  # the bucket so that the bucket can be destroyed without error. Warning: these
  # objects are not recoverable so only use this if you're absolutely sure you
  # want to permanently delete everything!
  config_force_destroy = false

  # After this number of days, log files should be transitioned from S3 to
  # Glacier. Enter 0 to never archive log data.
  config_num_days_after_which_archive_log_data = 365

  # After this number of days, log files should be deleted from S3. Enter 0 to
  # never delete log data.
  config_num_days_after_which_delete_log_data = 730

  # Optional KMS key (in logs account) to use for encrypting S3 objects on the
  # AWS Config bucket, when the S3 bucket is created within this module
  # (var.config_should_create_s3_bucket is true). For encrypting S3 objects on
  # delivery for an externally managed S3 bucket, refer to the
  # var.config_delivery_channel_kms_key_arn input variable. If null, data in S3
  # will be encrypted using the default aws/s3 key. If provided, the key policy
  # of the provided key must permit the IAM role used by AWS Config. See
  # https://docs.aws.amazon.com/sns/latest/dg/sns-key-management.html. Note that
  # the KMS key must reside in the global recorder region (as configured by
  # var.aws_region).
  config_s3_bucket_kms_key_arn = null

  # The name of the S3 Bucket where Config items will be stored. This could be a
  # bucket in this AWS account or the name of a bucket in another AWS account
  # where Config items should be sent. If you set is_logs_account to true on one
  # of the accounts in var.child_accounts, the S3 bucket will be created in that
  # account (this is the recommended approach!).
  config_s3_bucket_name = null

  # Enable MFA delete for either 'Change the versioning state of your bucket' or
  # 'Permanently delete an object version'. This setting only applies to the
  # bucket used to storage AWS Config data. This cannot be used to toggle this
  # setting but is available to allow managed buckets to reflect the state in
  # AWS. For instructions on how to enable MFA Delete, check out the README from
  # the terraform-aws-security/private-s3-bucket module.
  config_s3_mfa_delete = false

  # If true, create an S3 bucket of name var.config_s3_bucket_name for AWS
  # Config data, either in the logs account—the account in var.child_accounts
  # that has is_logs_account set to true (this is the recommended approach!)—or
  # in this account if none of the child accounts are marked as a logs account.
  # If false, assume var.config_s3_bucket_name is an S3 bucket that already
  # exists. We recommend setting this to true and setting is_logs_account to
  # true on one of the accounts in var.child_accounts to use that account as a
  # logs account where you aggregate all your AWS Config data. In case you want
  # to disable the AWS Config module and the S3 bucket, you need to set both
  # var.enable_config and config_should_create_s3_bucket to false.
  config_should_create_s3_bucket = true

  # Set to true to create an SNS topic in this account for sending AWS Config
  # notifications. Set to false to assume the topic specified in
  # var.config_sns_topic_name already exists in another AWS account (e.g the
  # logs account).
  config_should_create_sns_topic = false

  # Optional KMS key to use for each region for configuring default encryption
  # for the SNS topic (encoded as a map from region - e.g. us-east-1 - to ARN of
  # KMS key). If null or the region key is missing, encryption will not be
  # configured for the SNS topic in that region.
  config_sns_topic_kms_key_region_map = null

  # The name of the SNS Topic in where AWS Config notifications will be sent.
  # Can be in the same account or in another account.
  config_sns_topic_name = "ConfigTopic"

  # A map of tags to apply to the S3 Bucket. The key is the tag name and the
  # value is the tag value.
  config_tags = {}

  # List of AWS account identifiers to exclude from org-level Config rules. Only
  # used if var.config_create_account_rules is false (not recommended).
  configrules_excluded_accounts = []

  # The maximum frequency with which AWS Config runs evaluations for the
  # ´PERIODIC´ rules. See
  # https://www.terraform.io/docs/providers/aws/r/config_organization_managed_rule.html#maximum_execution_frequency
  configrules_maximum_execution_frequency = "TwentyFour_Hours"

  # Set to true to create/configure AWS Organizations for the first time in this
  # account. If you already configured AWS Organizations in your account, set
  # this to false; alternatively, you could set it to true and run 'terraform
  # import' to import you existing Organization.
  create_organization = true

  # The name of the IAM group that will grant access to all external AWS
  # accounts in var.iam_groups_for_cross_account_access.
  cross_account_access_all_group_name = "_all-accounts"

  # A list of AWS services for which the developers from the accounts in
  # var.allow_dev_access_from_other_account_arns will receive full permissions.
  # See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to
  # grant developers access only to EC2 and Amazon Machine Learning, use the
  # value ["ec2","machinelearning"]. Do NOT add iam to the list of services, or
  # that will grant Developers de facto admin access.
  dev_permitted_services = []

  # If set to true (default), all new EBS volumes will have encryption enabled
  # by default
  ebs_enable_encryption = true

  # Optional map of region names to KMS keys to use for EBS volume encryption
  # when var.ebs_use_existing_kms_keys is enabled.
  ebs_kms_key_arns = {}

  # If set to true, the KMS Customer Managed Keys (CMK) specified in
  # var.ebs_kms_key_arns will be set as the default for EBS encryption. When
  # false (default), the AWS-managed aws/ebs key will be used.
  ebs_use_existing_kms_keys = false

  # Set to true to enable CloudTrail in the root account. Set to false to
  # disable CloudTrail (note: all other CloudTrail variables will be ignored).
  # In case you want to disable the CloudTrail module and the S3 bucket, you
  # need to set both var.enable_cloudtrail and
  # cloudtrail_should_create_s3_bucket to false.
  enable_cloudtrail = true

  # Enables S3 server access logging which sends detailed records for the
  # requests that are made to the bucket. Defaults to false.
  enable_cloudtrail_s3_server_access_logging = false

  # Set to true to enable AWS Config in the root account. Set to false to
  # disable AWS Config (note: all other AWS config variables will be ignored).
  # In case you want to disable the CloudTrail module and the S3 bucket, you
  # need to set both var.enable_cloudtrail and
  # cloudtrail_should_create_s3_bucket to false.
  enable_config = true

  # Checks whether the EBS volumes that are in an attached state are encrypted.
  enable_encrypted_volumes = true

  # When true, create an Open ID Connect Provider that GitHub actions can use to
  # assume IAM roles in the account. Refer to
  # https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services
  # for more information.
  enable_github_actions_access = false

  # A feature flag to enable or disable this module.
  enable_iam_access_analyzer = false

  # A feature flag to enable or disable this module.
  enable_iam_cross_account_roles = true

  # A feature flag to enable or disable this module.
  enable_iam_groups = true

  # Checks whether the account password policy for IAM users meets the specified
  # requirements.
  enable_iam_password_policy = true

  # Checks whether the security group with 0.0.0.0/0 of any Amazon Virtual
  # Private Cloud (Amazon VPC) allows only specific inbound TCP or UDP traffic.
  enable_insecure_sg_rules = true

  # Checks whether storage encryption is enabled for your RDS DB instances.
  enable_rds_storage_encrypted = true

  # Checks whether users of your AWS account require a multi-factor
  # authentication (MFA) device to sign in with root credentials.
  enable_root_account_mfa = true

  # Checks that your Amazon S3 buckets do not allow public read access.
  enable_s3_bucket_public_read_prohibited = true

  # Checks that your Amazon S3 buckets do not allow public write access.
  enable_s3_bucket_public_write_prohibited = true

  # ID or ARN of the KMS key that is used to encrypt the volume. Used for
  # configuring the encrypted volumes config rule.
  encrypted_volumes_kms_id = null

  # When destroying this user, destroy even if it has non-Terraform-managed IAM
  # access keys, login profile, or MFA devices. Without force_destroy a user
  # with non-Terraform-managed access keys and login profile will fail to be
  # destroyed.
  force_destroy_users = false

  # When set, use the statically provided hardcoded list of thumbprints rather
  # than looking it up dynamically. This is useful if you want to trade
  # reliability of the OpenID Connect Provider across certificate renewals with
  # a static list that is obtained using a trustworthy mechanism, to mitigate
  # potential damage from a domain hijacking attack on GitHub domains.
  github_actions_openid_connect_provider_thumbprint_list = null

  # Name of the Cloudwatch event rules.
  guardduty_cloudwatch_event_rule_name = "guardduty-finding-events"

  # Specifies the frequency of notifications sent for subsequent finding
  # occurrences. If the detector is a GuardDuty member account, the value is
  # determined by the GuardDuty master account and cannot be modified, otherwise
  # defaults to SIX_HOURS. For standalone and GuardDuty master accounts, it must
  # be configured in Terraform to enable drift detection. Valid values for
  # standalone and master accounts: FIFTEEN_MINUTES, ONE_HOUR, SIX_HOURS.
  guardduty_finding_publishing_frequency = null

  # Specifies a name for the created SNS topics where findings are published.
  # publish_findings_to_sns must be set to true.
  guardduty_findings_sns_topic_name = "guardduty-findings"

  # Send GuardDuty findings to SNS topics specified by findings_sns_topic_name.
  guardduty_publish_findings_to_sns = false

  # The name of the IAM Access Analyzer module
  iam_access_analyzer_name = "baseline_root-iam_access_analyzer"

  # If set to ORGANIZATION, the analyzer will be scanning the current
  # organization and any policies that refer to linked resources such as S3,
  # IAM, Lambda and SQS policies.
  iam_access_analyzer_type = "ORGANIZATION"

  # A list of AWS services for which the developers IAM Group will receive full
  # permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For
  # example, to grant developers access only to EC2 and Amazon Machine Learning,
  # use the value ["ec2","machinelearning"]. Do NOT add iam to the list of
  # services, or that will grant Developers de facto admin access. If you need
  # to grant iam privileges, just grant the user Full Access.
  iam_group_developers_permitted_services = []

  # The list of names to be used for the IAM Group that enables its members to
  # SSH as a sudo user into any server configured with the ssh-grunt Gruntwork
  # module. Pass in multiple to configure multiple different IAM groups to
  # control different groupings of access at the server level. Pass in empty
  # list to disable creation of the IAM groups.
  iam_group_names_ssh_grunt_sudo_users = []

  # The name to be used for the IAM Group that enables its members to SSH as a
  # non-sudo user into any server configured with the ssh-grunt Gruntwork
  # module. Pass in multiple to configure multiple different IAM groups to
  # control different groupings of access at the server level. Pass in empty
  # list to disable creation of the IAM groups.
  iam_group_names_ssh_grunt_users = []

  # This variable is used to create groups that allow IAM users to assume roles
  # in your other AWS accounts. It should be a list of objects, where each
  # object has the fields 'group_name', which will be used as the name of the
  # IAM group, and 'iam_role_arns', which is a list of ARNs of IAM Roles that
  # you can assume when part of that group. For each entry in the list of
  # objects, we will create an IAM group that allows users to assume the given
  # IAM role(s) in the other AWS account. This allows you to define all your IAM
  # users in one account (e.g. the users account) and to grant them access to
  # certain IAM roles in other accounts (e.g. the stage, prod, audit accounts).
  iam_groups_for_cross_account_access = []

  # Allow users to change their own password.
  iam_password_policy_allow_users_to_change_password = true

  # Password expiration requires administrator reset.
  iam_password_policy_hard_expiry = true

  # Number of days before password expiration.
  iam_password_policy_max_password_age = 30

  # Password minimum length.
  iam_password_policy_minimum_password_length = 16

  # Number of passwords before allowing reuse.
  iam_password_policy_password_reuse_prevention = 5

  # Require at least one lowercase character in password.
  iam_password_policy_require_lowercase_characters = true

  # Require at least one number in password.
  iam_password_policy_require_numbers = true

  # Require at least one symbol in password.
  iam_password_policy_require_symbols = true

  # Require at least one uppercase character in password.
  iam_password_policy_require_uppercase_characters = true

  # The tags to apply to all the IAM role resources.
  iam_role_tags = {}

  # Comma-separated list of TCP ports authorized to be open to 0.0.0.0/0. Ranges
  # are defined by a dash; for example, '443,1020-1025'.
  insecure_sg_rules_authorized_tcp_ports = "443"

  # Comma-separated list of UDP ports authorized to be open to 0.0.0.0/0. Ranges
  # are defined by a dash; for example, '500,1020-1025'.
  insecure_sg_rules_authorized_udp_ports = null

  # Specifies whether CloudTrail will log only API calls in the current region
  # or in all regions. (true or false)
  is_multi_region_trail = true

  # List of AWS service principal names for which you want to enable integration
  # with your organization. Must have `organizations_feature_set` set to ALL.
  # See
  # https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services.html
  organizations_aws_service_access_principals = ["cloudtrail.amazonaws.com","config-multiaccountsetup.amazonaws.com","config.amazonaws.com","access-analyzer.amazonaws.com"]

  # If set to ALLOW, the new account enables IAM users to access account billing
  # information if they have the required permissions. If set to DENY, then only
  # the root user of the new account can access account billing information.
  organizations_default_iam_user_access_to_billing = "ALLOW"

  # The name of an IAM role that Organizations automatically preconfigures in
  # the new member account. This role trusts the master account, allowing users
  # in the master account to assume the role, as permitted by the master account
  # administrator.
  organizations_default_role_name = "OrganizationAccountAccessRole"

  # Default tags to add to accounts. Will be appended to ´child_account.*.tags´
  organizations_default_tags = {}

  # List of Organizations policy types to enable in the Organization Root. See
  # https://docs.aws.amazon.com/organizations/latest/APIReference/API_EnablePolicyType.html
  organizations_enabled_policy_types = ["SERVICE_CONTROL_POLICY"]

  # Specify `ALL` or `CONSOLIDATED_BILLING`.
  organizations_feature_set = "ALL"

  # Force the user to reset their password on initial login. Only used for users
  # with create_login_profile set to true.
  password_reset_required = true

  # KMS key ID or ARN used to encrypt the storage. Used for configuring the RDS
  # storage encryption config rule.
  rds_storage_encrypted_kms_id = null

  # Should we create the IAM Group for auto-deploy? Allows automated deployment
  # by granting the permissions specified in var.auto_deploy_permissions. (true
  # or false)
  should_create_iam_group_auto_deploy = false

  # Should we create the IAM Group for billing? Allows read-write access to
  # billing features only. (true or false)
  should_create_iam_group_billing = true

  # Should we create the IAM Group for developers? The permissions of that group
  # are specified via var.iam_group_developers_permitted_services. (true or
  # false)
  should_create_iam_group_developers = false

  # Should we create the IAM Group for full access? Allows full access to all
  # AWS resources. (true or false)
  should_create_iam_group_full_access = true

  # Should we create the IAM Group for logs? Allows read access to logs in
  # CloudTrail, AWS Config, and CloudWatch. If var.cloudtrail_kms_key_arn is
  # specified, will also be given permissions to decrypt with the KMS CMK that
  # is used to encrypt CloudTrail logs. (true or false)
  should_create_iam_group_logs = false

  # Should we create the IAM Group for read-only? Allows read-only access to all
  # AWS resources. (true or false)
  should_create_iam_group_read_only = false

  # Should we create the IAM Group for support? Allows access to AWS support.
  # (true or false)
  should_create_iam_group_support = true

  # Should we create the IAM Group for use-existing-iam-roles? Allow launching
  # AWS resources with existing IAM Roles, but no ability to create new IAM
  # Roles. (true or false)
  should_create_iam_group_use_existing_iam_roles = false

  # Should we create the IAM Group for user self-management? Allows users to
  # manage their own IAM user accounts, but not other IAM users. (true or false)
  should_create_iam_group_user_self_mgmt = false

  # Should we require that all IAM Users use Multi-Factor Authentication for
  # both AWS API calls and the AWS Web Console? (true or false)
  should_require_mfa = true

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

  # A map of users to create. The keys are the user names and the values are an
  # object with the optional keys 'groups' (a list of IAM groups to add the user
  # to), 'tags' (a map of tags to apply to the user), 'pgp_key' (either a
  # base-64 encoded PGP public key, or a keybase username in the form
  # keybase:username, used to encrypt the user's credentials; required if
  # create_login_profile or create_access_keys is true), 'create_login_profile'
  # (if set to true, create a password to login to the AWS Web Console),
  # 'create_access_keys' (if set to true, create access keys for the user),
  # 'path' (the path), and 'permissions_boundary' (the ARN of the policy that is
  # used to set the permissions boundary for the user).
  users = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ACCOUNT-BASELINE-ROOT MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/account-baseline-root?ref=v0.104.14"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS Account ID the template should be operated on. This avoids
  # misconfiguration errors caused by environment variables.
  aws_account_id = <string>

  # The AWS Region to use as the global config recorder and seed region for
  # GuardDuty.
  aws_region = <string>

  # Map of child accounts to create. The map key is the name of the account and
  # the value is an object containing account configuration variables. See the
  # comments below for what keys and values this object should contain.
  child_accounts = <any>

  # Creates resources in the specified regions. The best practice is to enable
  # AWS Config in all enabled regions in your AWS account. This variable must
  # NOT be set to null or empty. Otherwise, we won't know which regions to use
  # and authenticate to, and may use some not enabled in your AWS account (e.g.,
  # GovCloud, China, etc). To get the list of regions enabled in your AWS
  # account, you can use the AWS CLI: aws ec2 describe-regions.
  config_opt_in_regions = <list(string)>

  # Creates resources in the specified regions. The best practice is to enable
  # EBS Encryption in all enabled regions in your AWS account. This variable
  # must NOT be set to null or empty. Otherwise, we won't know which regions to
  # use and authenticate to, and may use some not enabled in your AWS account
  # (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS
  # account, you can use the AWS CLI: aws ec2 describe-regions. The value
  # provided for global_recorder_region must be in this list.
  ebs_opt_in_regions = <list(string)>

  # Creates resources in the specified regions. The best practice is to enable
  # GuardDuty in all enabled regions in your AWS account. This variable must NOT
  # be set to null or empty. Otherwise, we won't know which regions to use and
  # authenticate to, and may use some not enabled in your AWS account (e.g.,
  # GovCloud, China, etc). To get the list of regions enabled in your AWS
  # account, you can use the AWS CLI: aws ec2 describe-regions. The value
  # provided for global_recorder_region must be in this list.
  guardduty_opt_in_regions = <list(string)>

  # Creates resources in the specified regions. The best practice is to enable
  # IAM Access Analyzer in all enabled regions in your AWS account. This
  # variable must NOT be set to null or empty. Otherwise, we won't know which
  # regions to use and authenticate to, and may use some not enabled in your AWS
  # account (e.g., GovCloud, China, etc). To get the list of regions enabled in
  # your AWS account, you can use the AWS CLI: aws ec2 describe-regions. The
  # value provided for global_recorder_region must be in this list.
  iam_access_analyzer_opt_in_regions = <list(string)>

  # The name used to prefix AWS Config and Cloudtrail resources, including the
  # S3 bucket names and SNS topics used for each.
  name_prefix = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Map of additional managed rules to add. The key is the name of the rule
  # (e.g. ´acm-certificate-expiration-check´) and the value is an object
  # specifying the rule details
  additional_config_rules = {}

  # Map of github repositories to the list of branches that are allowed to
  # assume the IAM role. The repository should be encoded as org/repo-name
  # (e.g., gruntwork-io/terrraform-aws-ci). Allows GitHub Actions to assume the
  # auto deploy IAM role using an OpenID Connect Provider for the given
  # repositories. Refer to the docs for github-actions-iam-role for more
  # information. Note that this is mutually exclusive with
  # var.allow_auto_deploy_from_other_account_arns. Only used if
  # var.enable_github_actions_access is true. 
  allow_auto_deploy_from_github_actions_for_sources = {}

  # A list of IAM ARNs from other AWS accounts that will be allowed to assume
  # the auto deploy IAM role that has the permissions in
  # var.auto_deploy_permissions.
  allow_auto_deploy_from_other_account_arns = []

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role
  allow_auto_deploy_iam_role_permissions_boundary = null

  # A list of IAM ARNs from other AWS accounts that will be allowed full (read
  # and write) access to the billing info for this account.
  allow_billing_access_from_other_account_arns = []

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role
  allow_billing_access_iam_role_permissions_boundary = null

  # If true, an IAM Policy that grants access to CloudTrail will be honored. If
  # false, only the ARNs listed in var.kms_key_user_iam_arns will have access to
  # CloudTrail and any IAM Policy grants will be ignored. (true or false)
  allow_cloudtrail_access_with_iam = true

  # A list of IAM ARNs from other AWS accounts that will be allowed full (read
  # and write) access to the services in this account specified in
  # var.dev_permitted_services.
  allow_dev_access_from_other_account_arns = []

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role
  allow_dev_access_iam_role_permissions_boundary = null

  # A list of IAM ARNs from other AWS accounts that will be allowed full (read
  # and write) access to this account.
  allow_full_access_from_other_account_arns = []

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role
  allow_full_access_iam_role_permissions_boundary = null

  # A list of IAM ARNs from other AWS accounts that will be allowed read access
  # to the logs in CloudTrail, AWS Config, and CloudWatch for this account. If
  # var.cloudtrail_kms_key_arn is specified, will also be given permissions to
  # decrypt with the KMS CMK that is used to encrypt CloudTrail logs.
  allow_logs_access_from_other_account_arns = []

  # A list of IAM ARNs from other AWS accounts that will be allowed read-only
  # access to this account.
  allow_read_only_access_from_other_account_arns = []

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role
  allow_read_only_access_iam_role_permissions_boundary = null

  # A list of IAM ARNs from other AWS accounts that will be allowed read access
  # to IAM groups and publish SSH keys. This is used for ssh-grunt.
  allow_ssh_grunt_access_from_other_account_arns = []

  # A list of IAM ARNs from other AWS accounts that will be allowed access to
  # AWS support for this account.
  allow_support_access_from_other_account_arns = []

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role
  allow_support_access_iam_role_permissions_boundary = null

  # A list of IAM permissions (e.g. ec2:*) that will be added to an IAM Group
  # for doing automated deployments. NOTE: If
  # var.should_create_iam_group_auto_deploy is true, the list must have at least
  # one element (e.g. '*').
  auto_deploy_permissions = []

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role
  aws_config_iam_role_permissions_boundary = null

  # Additional IAM policies to apply to cloudtrail S3 bucket. You can use this
  # to grant read/write access beyond what is provided to Cloudtrail. This
  # should be a map, where each key is a unique statement ID (SID), and each
  # value is an object that contains the parameters defined in the comment
  # below.
  cloudtrail_additional_bucket_policy_statements = null

  # Map of advanced event selector name to list of field selectors to apply for
  # that event selector. Advanced event selectors allow for more fine grained
  # data logging of events.

Note that you can not configure basic data logging
  # (var.cloudtrail_data_logging_enabled) if advanced event logging is
  # enabled.

Refer to the AWS docs on data event selection for more details on
  # the difference between basic data logging and advanced data logging.
  cloudtrail_advanced_event_selectors = {}

  # Whether or not to allow kms:DescribeKey to external AWS accounts with write
  # access to the CloudTrail bucket. This is useful during deployment so that
  # you don't have to pass around the KMS key ARN.
  cloudtrail_allow_kms_describe_key_to_external_aws_accounts = false

  # Specify the name of the CloudWatch Logs group to publish the CloudTrail logs
  # to. This log group exists in the current account. Set this value to `null`
  # to avoid publishing the trail logs to the logs group. The recommended
  # configuration for CloudTrail is (a) for each child account to aggregate its
  # logs in an S3 bucket in a single central account, such as a logs account and
  # (b) to also store 14 days work of logs in CloudWatch in the child account
  # itself for local debugging.
  cloudtrail_cloudwatch_logs_group_name = "cloudtrail-logs"

  # If true, logging of data events will be enabled.
  cloudtrail_data_logging_enabled = false

  # Specify if you want your event selector to include management events for
  # your trail.
  cloudtrail_data_logging_include_management_events = true

  # Specify if you want your trail to log read-only events, write-only events,
  # or all. Possible values are: ReadOnly, WriteOnly, All.
  cloudtrail_data_logging_read_write_type = "All"

  # Data resources for which to log data events. This should be a map, where
  # each key is a data resource type, and each value is a list of data resource
  # values. Possible values for data resource types are: AWS::S3::Object,
  # AWS::Lambda::Function and AWS::DynamoDB::Table. See the 'data_resource'
  # block within the 'event_selector' block of the 'aws_cloudtrail' resource for
  # context:
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudtrail#data_resource.
  cloudtrail_data_logging_resources = {}

  # Whether or not to enable automatic annual rotation of the KMS key. Defaults
  # to true.
  cloudtrail_enable_key_rotation = true

  # If set to true, when you run 'terraform destroy', delete all objects from
  # the bucket so that the bucket can be destroyed without error. Warning: these
  # objects are not recoverable so only use this if you're absolutely sure you
  # want to permanently delete everything!
  cloudtrail_force_destroy = false

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role
  cloudtrail_iam_role_permissions_boundary = null

  # Specifies whether the trail is an AWS Organizations trail. Organization
  # trails log events for the root account and all member accounts. Can only be
  # created in the organization root account. (true or false)
  cloudtrail_is_organization_trail = false

  # All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key)
  # that governs access to write API calls older than 7 days and all read API
  # calls. The IAM Users specified in this list will have rights to change who
  # can access this extended log data. Note that if you specify a logs account
  # (by setting is_logs_account = true on one of the accounts in
  # var.child_accounts), the KMS CMK will be created in that account, and the
  # root of that account will automatically be made an admin of the CMK.
  cloudtrail_kms_key_administrator_iam_arns = []

  # All CloudTrail Logs will be encrypted with a KMS CMK (Customer Master Key)
  # that governs access to write API calls older than 7 days and all read API
  # calls. If that CMK already exists, set this to the ARN of that CMK.
  # Otherwise, set this to null, and a new CMK will be created. If you set
  # is_logs_account to true on one of the accounts in var.child_accounts, the
  # KMS CMK will be created in that account (this is the recommended approach!).
  cloudtrail_kms_key_arn = null

  # If the kms_key_arn provided is an alias or alias ARN, then this must be set
  # to true so that the module will exchange the alias for a CMK ARN. Setting
  # this to true and using aliases requires
  # var.cloudtrail_allow_kms_describe_key_to_external_aws_accounts to also be
  # true for multi-account scenarios.
  cloudtrail_kms_key_arn_is_alias = false

  # Additional service principals beyond CloudTrail that should have access to
  # the KMS key used to encrypt the logs. This is useful for granting access to
  # the logs for the purposes of constructing metric filters.
  cloudtrail_kms_key_service_principals = []

  # All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key)
  # that governs access to write API calls older than 7 days and all read API
  # calls. The IAM Users specified in this list will have read-only access to
  # this extended log data.
  cloudtrail_kms_key_user_iam_arns = []

  # After this number of days, log files should be transitioned from S3 to
  # Glacier. Enter 0 to never archive log data.
  cloudtrail_num_days_after_which_archive_log_data = 30

  # After this number of days, log files should be deleted from S3. Enter 0 to
  # never delete log data.
  cloudtrail_num_days_after_which_delete_log_data = 365

  # After this number of days, logs stored in CloudWatch will be deleted.
  # Possible values are: 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400,
  # 545, 731, 1827, 3653, and 0 (default). When set to 0, logs will be retained
  # indefinitely.
  cloudtrail_num_days_to_retain_cloudwatch_logs = 0

  # The ID of the organization. Required only if an organization wide CloudTrail
  # is being setup and `create_organization` is set to false. The organization
  # ID is required to ensure that the entire organization is whitelisted in the
  # CloudTrail bucket write policy.
  cloudtrail_organization_id = null

  # The name of the S3 Bucket where CloudTrail logs will be stored. This could
  # be a bucket in this AWS account or the name of a bucket in another AWS
  # account where CloudTrail logs should be sent. If you set is_logs_account on
  # one of the accounts in var.child_accounts, the S3 bucket will be created in
  # that account (this is the recommended approach!).
  cloudtrail_s3_bucket_name = null

  # Enable MFA delete for either 'Change the versioning state of your bucket' or
  # 'Permanently delete an object version'. This setting only applies to the
  # bucket used to storage Cloudtrail data. This cannot be used to toggle this
  # setting but is available to allow managed buckets to reflect the state in
  # AWS.  For instructions on how to enable MFA Delete, check out the README
  # from the terraform-aws-security/private-s3-bucket module.
  cloudtrail_s3_mfa_delete = false

  # If true, create an S3 bucket of name var.cloudtrail_s3_bucket_name for
  # CloudTrail logs, either in the logs account—the account in
  # var.child_accounts that has is_logs_account set to true (this is the
  # recommended approach!)—or in this account if none of the child accounts are
  # marked as a logs account. If false, assume var.cloudtrail_s3_bucket_name is
  # an S3 bucket that already exists. We recommend setting this to true and
  # setting is_logs_account to true on one of the accounts in var.child_accounts
  # to use that account as a logs account where you aggregate all your
  # CloudTrail data. In case you want to disable the CloudTrail module and the
  # S3 bucket, you need to set both var.enable_cloudtrail and
  # cloudtrail_should_create_s3_bucket to false.
  cloudtrail_should_create_s3_bucket = true

  # Tags to apply to the CloudTrail resources.
  cloudtrail_tags = {}

  # Set to true to send the AWS Config data to another account (e.g., a logs
  # account) for aggregation purposes. You must set the ID of that other account
  # via the config_central_account_id variable. Note that if one of the accounts
  # in var.child_accounts has is_logs_account set to true (this is the approach
  # we recommended!), this variable will be assumed to be true, so you don't
  # have to pass any value for it.  This redundant variable has to exist because
  # Terraform does not allow computed data in count and for_each parameters and
  # var.config_central_account_id may be computed if its the ID of a
  # newly-created AWS account.
  config_aggregate_config_data_in_external_account = false

  # If the S3 bucket and SNS topics used for AWS Config live in a different AWS
  # account, set this variable to the ID of that account. If the S3 bucket and
  # SNS topics live in this account, set this variable to an empty string. Note
  # that if one of the accounts in var.child_accounts has is_logs_account set to
  # true (this is the approach we recommended!), that account's ID will be used
  # automatically, and you can leave this variable null.
  config_central_account_id = ""

  # Set to true to create account-level AWS Config rules directly in this
  # account. Set false to create org-level rules that apply to this account and
  # all child accounts. We recommend setting this to true to use account-level
  # rules because org-level rules create a chicken-and-egg problem with creating
  # new accounts (see this module's README for details).
  config_create_account_rules = true

  # Optional KMS key to use for encrypting S3 objects on the AWS Config delivery
  # channel for an externally managed S3 bucket. This must belong to the same
  # region as the destination S3 bucket. If null, AWS Config will default to
  # encrypting the delivered data with AES-256 encryption. Only used if
  # var.should_create_s3_bucket is false - otherwise,
  # var.config_s3_bucket_kms_key_arn is used.
  config_delivery_channel_kms_key_arn = null

  # If set to true, when you run 'terraform destroy', delete all objects from
  # the bucket so that the bucket can be destroyed without error. Warning: these
  # objects are not recoverable so only use this if you're absolutely sure you
  # want to permanently delete everything!
  config_force_destroy = false

  # After this number of days, log files should be transitioned from S3 to
  # Glacier. Enter 0 to never archive log data.
  config_num_days_after_which_archive_log_data = 365

  # After this number of days, log files should be deleted from S3. Enter 0 to
  # never delete log data.
  config_num_days_after_which_delete_log_data = 730

  # Optional KMS key (in logs account) to use for encrypting S3 objects on the
  # AWS Config bucket, when the S3 bucket is created within this module
  # (var.config_should_create_s3_bucket is true). For encrypting S3 objects on
  # delivery for an externally managed S3 bucket, refer to the
  # var.config_delivery_channel_kms_key_arn input variable. If null, data in S3
  # will be encrypted using the default aws/s3 key. If provided, the key policy
  # of the provided key must permit the IAM role used by AWS Config. See
  # https://docs.aws.amazon.com/sns/latest/dg/sns-key-management.html. Note that
  # the KMS key must reside in the global recorder region (as configured by
  # var.aws_region).
  config_s3_bucket_kms_key_arn = null

  # The name of the S3 Bucket where Config items will be stored. This could be a
  # bucket in this AWS account or the name of a bucket in another AWS account
  # where Config items should be sent. If you set is_logs_account to true on one
  # of the accounts in var.child_accounts, the S3 bucket will be created in that
  # account (this is the recommended approach!).
  config_s3_bucket_name = null

  # Enable MFA delete for either 'Change the versioning state of your bucket' or
  # 'Permanently delete an object version'. This setting only applies to the
  # bucket used to storage AWS Config data. This cannot be used to toggle this
  # setting but is available to allow managed buckets to reflect the state in
  # AWS. For instructions on how to enable MFA Delete, check out the README from
  # the terraform-aws-security/private-s3-bucket module.
  config_s3_mfa_delete = false

  # If true, create an S3 bucket of name var.config_s3_bucket_name for AWS
  # Config data, either in the logs account—the account in var.child_accounts
  # that has is_logs_account set to true (this is the recommended approach!)—or
  # in this account if none of the child accounts are marked as a logs account.
  # If false, assume var.config_s3_bucket_name is an S3 bucket that already
  # exists. We recommend setting this to true and setting is_logs_account to
  # true on one of the accounts in var.child_accounts to use that account as a
  # logs account where you aggregate all your AWS Config data. In case you want
  # to disable the AWS Config module and the S3 bucket, you need to set both
  # var.enable_config and config_should_create_s3_bucket to false.
  config_should_create_s3_bucket = true

  # Set to true to create an SNS topic in this account for sending AWS Config
  # notifications. Set to false to assume the topic specified in
  # var.config_sns_topic_name already exists in another AWS account (e.g the
  # logs account).
  config_should_create_sns_topic = false

  # Optional KMS key to use for each region for configuring default encryption
  # for the SNS topic (encoded as a map from region - e.g. us-east-1 - to ARN of
  # KMS key). If null or the region key is missing, encryption will not be
  # configured for the SNS topic in that region.
  config_sns_topic_kms_key_region_map = null

  # The name of the SNS Topic in where AWS Config notifications will be sent.
  # Can be in the same account or in another account.
  config_sns_topic_name = "ConfigTopic"

  # A map of tags to apply to the S3 Bucket. The key is the tag name and the
  # value is the tag value.
  config_tags = {}

  # List of AWS account identifiers to exclude from org-level Config rules. Only
  # used if var.config_create_account_rules is false (not recommended).
  configrules_excluded_accounts = []

  # The maximum frequency with which AWS Config runs evaluations for the
  # ´PERIODIC´ rules. See
  # https://www.terraform.io/docs/providers/aws/r/config_organization_managed_rule.html#maximum_execution_frequency
  configrules_maximum_execution_frequency = "TwentyFour_Hours"

  # Set to true to create/configure AWS Organizations for the first time in this
  # account. If you already configured AWS Organizations in your account, set
  # this to false; alternatively, you could set it to true and run 'terraform
  # import' to import you existing Organization.
  create_organization = true

  # The name of the IAM group that will grant access to all external AWS
  # accounts in var.iam_groups_for_cross_account_access.
  cross_account_access_all_group_name = "_all-accounts"

  # A list of AWS services for which the developers from the accounts in
  # var.allow_dev_access_from_other_account_arns will receive full permissions.
  # See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to
  # grant developers access only to EC2 and Amazon Machine Learning, use the
  # value ["ec2","machinelearning"]. Do NOT add iam to the list of services, or
  # that will grant Developers de facto admin access.
  dev_permitted_services = []

  # If set to true (default), all new EBS volumes will have encryption enabled
  # by default
  ebs_enable_encryption = true

  # Optional map of region names to KMS keys to use for EBS volume encryption
  # when var.ebs_use_existing_kms_keys is enabled.
  ebs_kms_key_arns = {}

  # If set to true, the KMS Customer Managed Keys (CMK) specified in
  # var.ebs_kms_key_arns will be set as the default for EBS encryption. When
  # false (default), the AWS-managed aws/ebs key will be used.
  ebs_use_existing_kms_keys = false

  # Set to true to enable CloudTrail in the root account. Set to false to
  # disable CloudTrail (note: all other CloudTrail variables will be ignored).
  # In case you want to disable the CloudTrail module and the S3 bucket, you
  # need to set both var.enable_cloudtrail and
  # cloudtrail_should_create_s3_bucket to false.
  enable_cloudtrail = true

  # Enables S3 server access logging which sends detailed records for the
  # requests that are made to the bucket. Defaults to false.
  enable_cloudtrail_s3_server_access_logging = false

  # Set to true to enable AWS Config in the root account. Set to false to
  # disable AWS Config (note: all other AWS config variables will be ignored).
  # In case you want to disable the CloudTrail module and the S3 bucket, you
  # need to set both var.enable_cloudtrail and
  # cloudtrail_should_create_s3_bucket to false.
  enable_config = true

  # Checks whether the EBS volumes that are in an attached state are encrypted.
  enable_encrypted_volumes = true

  # When true, create an Open ID Connect Provider that GitHub actions can use to
  # assume IAM roles in the account. Refer to
  # https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services
  # for more information.
  enable_github_actions_access = false

  # A feature flag to enable or disable this module.
  enable_iam_access_analyzer = false

  # A feature flag to enable or disable this module.
  enable_iam_cross_account_roles = true

  # A feature flag to enable or disable this module.
  enable_iam_groups = true

  # Checks whether the account password policy for IAM users meets the specified
  # requirements.
  enable_iam_password_policy = true

  # Checks whether the security group with 0.0.0.0/0 of any Amazon Virtual
  # Private Cloud (Amazon VPC) allows only specific inbound TCP or UDP traffic.
  enable_insecure_sg_rules = true

  # Checks whether storage encryption is enabled for your RDS DB instances.
  enable_rds_storage_encrypted = true

  # Checks whether users of your AWS account require a multi-factor
  # authentication (MFA) device to sign in with root credentials.
  enable_root_account_mfa = true

  # Checks that your Amazon S3 buckets do not allow public read access.
  enable_s3_bucket_public_read_prohibited = true

  # Checks that your Amazon S3 buckets do not allow public write access.
  enable_s3_bucket_public_write_prohibited = true

  # ID or ARN of the KMS key that is used to encrypt the volume. Used for
  # configuring the encrypted volumes config rule.
  encrypted_volumes_kms_id = null

  # When destroying this user, destroy even if it has non-Terraform-managed IAM
  # access keys, login profile, or MFA devices. Without force_destroy a user
  # with non-Terraform-managed access keys and login profile will fail to be
  # destroyed.
  force_destroy_users = false

  # When set, use the statically provided hardcoded list of thumbprints rather
  # than looking it up dynamically. This is useful if you want to trade
  # reliability of the OpenID Connect Provider across certificate renewals with
  # a static list that is obtained using a trustworthy mechanism, to mitigate
  # potential damage from a domain hijacking attack on GitHub domains.
  github_actions_openid_connect_provider_thumbprint_list = null

  # Name of the Cloudwatch event rules.
  guardduty_cloudwatch_event_rule_name = "guardduty-finding-events"

  # Specifies the frequency of notifications sent for subsequent finding
  # occurrences. If the detector is a GuardDuty member account, the value is
  # determined by the GuardDuty master account and cannot be modified, otherwise
  # defaults to SIX_HOURS. For standalone and GuardDuty master accounts, it must
  # be configured in Terraform to enable drift detection. Valid values for
  # standalone and master accounts: FIFTEEN_MINUTES, ONE_HOUR, SIX_HOURS.
  guardduty_finding_publishing_frequency = null

  # Specifies a name for the created SNS topics where findings are published.
  # publish_findings_to_sns must be set to true.
  guardduty_findings_sns_topic_name = "guardduty-findings"

  # Send GuardDuty findings to SNS topics specified by findings_sns_topic_name.
  guardduty_publish_findings_to_sns = false

  # The name of the IAM Access Analyzer module
  iam_access_analyzer_name = "baseline_root-iam_access_analyzer"

  # If set to ORGANIZATION, the analyzer will be scanning the current
  # organization and any policies that refer to linked resources such as S3,
  # IAM, Lambda and SQS policies.
  iam_access_analyzer_type = "ORGANIZATION"

  # A list of AWS services for which the developers IAM Group will receive full
  # permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For
  # example, to grant developers access only to EC2 and Amazon Machine Learning,
  # use the value ["ec2","machinelearning"]. Do NOT add iam to the list of
  # services, or that will grant Developers de facto admin access. If you need
  # to grant iam privileges, just grant the user Full Access.
  iam_group_developers_permitted_services = []

  # The list of names to be used for the IAM Group that enables its members to
  # SSH as a sudo user into any server configured with the ssh-grunt Gruntwork
  # module. Pass in multiple to configure multiple different IAM groups to
  # control different groupings of access at the server level. Pass in empty
  # list to disable creation of the IAM groups.
  iam_group_names_ssh_grunt_sudo_users = []

  # The name to be used for the IAM Group that enables its members to SSH as a
  # non-sudo user into any server configured with the ssh-grunt Gruntwork
  # module. Pass in multiple to configure multiple different IAM groups to
  # control different groupings of access at the server level. Pass in empty
  # list to disable creation of the IAM groups.
  iam_group_names_ssh_grunt_users = []

  # This variable is used to create groups that allow IAM users to assume roles
  # in your other AWS accounts. It should be a list of objects, where each
  # object has the fields 'group_name', which will be used as the name of the
  # IAM group, and 'iam_role_arns', which is a list of ARNs of IAM Roles that
  # you can assume when part of that group. For each entry in the list of
  # objects, we will create an IAM group that allows users to assume the given
  # IAM role(s) in the other AWS account. This allows you to define all your IAM
  # users in one account (e.g. the users account) and to grant them access to
  # certain IAM roles in other accounts (e.g. the stage, prod, audit accounts).
  iam_groups_for_cross_account_access = []

  # Allow users to change their own password.
  iam_password_policy_allow_users_to_change_password = true

  # Password expiration requires administrator reset.
  iam_password_policy_hard_expiry = true

  # Number of days before password expiration.
  iam_password_policy_max_password_age = 30

  # Password minimum length.
  iam_password_policy_minimum_password_length = 16

  # Number of passwords before allowing reuse.
  iam_password_policy_password_reuse_prevention = 5

  # Require at least one lowercase character in password.
  iam_password_policy_require_lowercase_characters = true

  # Require at least one number in password.
  iam_password_policy_require_numbers = true

  # Require at least one symbol in password.
  iam_password_policy_require_symbols = true

  # Require at least one uppercase character in password.
  iam_password_policy_require_uppercase_characters = true

  # The tags to apply to all the IAM role resources.
  iam_role_tags = {}

  # Comma-separated list of TCP ports authorized to be open to 0.0.0.0/0. Ranges
  # are defined by a dash; for example, '443,1020-1025'.
  insecure_sg_rules_authorized_tcp_ports = "443"

  # Comma-separated list of UDP ports authorized to be open to 0.0.0.0/0. Ranges
  # are defined by a dash; for example, '500,1020-1025'.
  insecure_sg_rules_authorized_udp_ports = null

  # Specifies whether CloudTrail will log only API calls in the current region
  # or in all regions. (true or false)
  is_multi_region_trail = true

  # List of AWS service principal names for which you want to enable integration
  # with your organization. Must have `organizations_feature_set` set to ALL.
  # See
  # https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services.html
  organizations_aws_service_access_principals = ["cloudtrail.amazonaws.com","config-multiaccountsetup.amazonaws.com","config.amazonaws.com","access-analyzer.amazonaws.com"]

  # If set to ALLOW, the new account enables IAM users to access account billing
  # information if they have the required permissions. If set to DENY, then only
  # the root user of the new account can access account billing information.
  organizations_default_iam_user_access_to_billing = "ALLOW"

  # The name of an IAM role that Organizations automatically preconfigures in
  # the new member account. This role trusts the master account, allowing users
  # in the master account to assume the role, as permitted by the master account
  # administrator.
  organizations_default_role_name = "OrganizationAccountAccessRole"

  # Default tags to add to accounts. Will be appended to ´child_account.*.tags´
  organizations_default_tags = {}

  # List of Organizations policy types to enable in the Organization Root. See
  # https://docs.aws.amazon.com/organizations/latest/APIReference/API_EnablePolicyType.html
  organizations_enabled_policy_types = ["SERVICE_CONTROL_POLICY"]

  # Specify `ALL` or `CONSOLIDATED_BILLING`.
  organizations_feature_set = "ALL"

  # Force the user to reset their password on initial login. Only used for users
  # with create_login_profile set to true.
  password_reset_required = true

  # KMS key ID or ARN used to encrypt the storage. Used for configuring the RDS
  # storage encryption config rule.
  rds_storage_encrypted_kms_id = null

  # Should we create the IAM Group for auto-deploy? Allows automated deployment
  # by granting the permissions specified in var.auto_deploy_permissions. (true
  # or false)
  should_create_iam_group_auto_deploy = false

  # Should we create the IAM Group for billing? Allows read-write access to
  # billing features only. (true or false)
  should_create_iam_group_billing = true

  # Should we create the IAM Group for developers? The permissions of that group
  # are specified via var.iam_group_developers_permitted_services. (true or
  # false)
  should_create_iam_group_developers = false

  # Should we create the IAM Group for full access? Allows full access to all
  # AWS resources. (true or false)
  should_create_iam_group_full_access = true

  # Should we create the IAM Group for logs? Allows read access to logs in
  # CloudTrail, AWS Config, and CloudWatch. If var.cloudtrail_kms_key_arn is
  # specified, will also be given permissions to decrypt with the KMS CMK that
  # is used to encrypt CloudTrail logs. (true or false)
  should_create_iam_group_logs = false

  # Should we create the IAM Group for read-only? Allows read-only access to all
  # AWS resources. (true or false)
  should_create_iam_group_read_only = false

  # Should we create the IAM Group for support? Allows access to AWS support.
  # (true or false)
  should_create_iam_group_support = true

  # Should we create the IAM Group for use-existing-iam-roles? Allow launching
  # AWS resources with existing IAM Roles, but no ability to create new IAM
  # Roles. (true or false)
  should_create_iam_group_use_existing_iam_roles = false

  # Should we create the IAM Group for user self-management? Allows users to
  # manage their own IAM user accounts, but not other IAM users. (true or false)
  should_create_iam_group_user_self_mgmt = false

  # Should we require that all IAM Users use Multi-Factor Authentication for
  # both AWS API calls and the AWS Web Console? (true or false)
  should_require_mfa = true

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

  # A map of users to create. The keys are the user names and the values are an
  # object with the optional keys 'groups' (a list of IAM groups to add the user
  # to), 'tags' (a map of tags to apply to the user), 'pgp_key' (either a
  # base-64 encoded PGP public key, or a keybase username in the form
  # keybase:username, used to encrypt the user's credentials; required if
  # create_login_profile or create_access_keys is true), 'create_login_profile'
  # (if set to true, create a password to login to the AWS Web Console),
  # 'create_access_keys' (if set to true, create access keys for the user),
  # 'path' (the path), and 'permissions_boundary' (the ARN of the policy that is
  # used to set the permissions boundary for the user).
  users = {}

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

<HclListItem name="aws_region" requirement="required" type="string">
<HclListItemDescription>

The AWS Region to use as the global config recorder and seed region for GuardDuty.

</HclListItemDescription>
</HclListItem>

<HclListItem name="child_accounts" requirement="required" type="any">
<HclListItemDescription>

Map of child accounts to create. The map key is the name of the account and the value is an object containing account configuration variables. See the comments below for what keys and values this object should contain.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Ideally, this would be a map of (string, object), but object does not support optional properties, and we want
   users to be able to specify, say, tags for some accounts, but not for others. We can't use a map(any) either, as that
   would require the values to all have the same type, and due to optional parameters, that wouldn't work either. So,
   we have to lamely fall back to any.

```
</details>

<details>


```hcl

   Expected value for the `child_accounts` is a map of child accounts. The map key is the name of the account and
   the value is another map with one required key (email) and several optional keys:
  
   - email (required):
     Email address for the account.
  
   - is_logs_account:
     Set to `true` to mark this account as the "logs" account, which is the one to use to aggregate AWS Config and
     CloudTrail data. This module will create an S3 bucket for AWS Config and an S3 bucket and KMS CMK for CloudTrail
     in this child account, configure the root account to send all its AWS Config and CloudTrail data there, and return
     the names of the buckets and ARN of the KMS CMK as output variables. When you apply account baselines to the
     other child accounts (e.g., using the account-baseline-app or account-baseline-security modules), you'll want to
     configure those accounts to send AWS Config and CloudTrail data to the same S3 buckets and use the same KMS CMK.
     If is_logs_account is not set on any child account (not recommended!), then either you must disable AWS Config
     and CloudTrail (via the enable_config and enable_cloudtrail variables) or configure this module to use S3 buckets
     and a KMS CMK that ALREADY exist!
  
   - parent_id:
     Parent Organizational Unit ID or Root ID for the account
     Defaults to the Organization default Root ID.
  
   - role_name:
     The name of an IAM role that Organizations automatically preconfigures in the new member account. This role trusts
     the master account, allowing users in the master account to assume the role, as permitted by the master account
     administrator. The role has administrator permissions in the new member account. Note that the Organizations API
     provides no method for reading this information after account creation.
     If no value is present and no ´default_role_name´ is provided, AWS automatically assigns a value.
  
   - iam_user_access_to_billing:
     If set to ´ALLOW´, the new account enables IAM users to access account billing information if they have the required
     permissions. If set to ´DENY´, then only the root user of the new account can access account billing information.
     Defaults to ´default_iam_user_access_to_billing´.
  
  
   - enable_config_rules:
     Set to `true` to enable org-level AWS Config Rules for this child account. This is only used if
     var.config_create_account_rules is false (which is NOT recommened) to force org-level rules. If you do go with
     org-level rules, you can only set enable_config_rules to true after deploying a Config Recorder in the child
     account. That means you have to: (1) initially set enable_config_rules to false, (2) run 'apply' in this root
     module to create the child account, (3) go to the child account and create a config recorder in it, e.g., by
     running 'apply' on a security baseline in that account, (4) come back to this root module and set
     enable_config_rules to true, (5) run 'apply' again. This is a brittle, error-prone, multi-step process, which is
     why we recommend using account-level rules (the default) and avoiding it entirely!
  
   - tags:
     Key-value mapping of resource tags.
  
  
   Example:
  
   child_accounts = {
     logs = {
       email                       = "root-accounts+logs@acme.com"
       is_logs_account             = true
     }
     security = {
       email                       = "root-accounts+security@acme.com"
       role_name                   = "OrganizationAccountAccessRole"
       iam_user_access_to_billing  = "DENY"
       tags = {
         Tag-Key = "tag-value"
       }
     }
     shared-services = {
       email                       = "root-accounts+shared-services@acme.com"
     }
     dev = {
       email                       = "root-accounts+dev@acme.com"
     }
     stage = {
       email                       = "root-accounts+stage@acme.com"
     }
     prod = {
       email                       = "root-accounts+prod@acme.com"
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="config_opt_in_regions" requirement="required" type="list(string)">
<HclListItemDescription>

Creates resources in the specified regions. The best practice is to enable AWS Config in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ebs_opt_in_regions" requirement="required" type="list(string)">
<HclListItemDescription>

Creates resources in the specified regions. The best practice is to enable EBS Encryption in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions. The value provided for global_recorder_region must be in this list.

</HclListItemDescription>
</HclListItem>

<HclListItem name="guardduty_opt_in_regions" requirement="required" type="list(string)">
<HclListItemDescription>

Creates resources in the specified regions. The best practice is to enable GuardDuty in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions. The value provided for global_recorder_region must be in this list.

</HclListItemDescription>
</HclListItem>

<HclListItem name="iam_access_analyzer_opt_in_regions" requirement="required" type="list(string)">
<HclListItemDescription>

Creates resources in the specified regions. The best practice is to enable IAM Access Analyzer in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions. The value provided for global_recorder_region must be in this list.

</HclListItemDescription>
</HclListItem>

<HclListItem name="name_prefix" requirement="required" type="string">
<HclListItemDescription>

The name used to prefix AWS Config and Cloudtrail resources, including the S3 bucket names and SNS topics used for each.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="additional_config_rules" requirement="optional" type="map(object(…))">
<HclListItemDescription>

Map of additional managed rules to add. The key is the name of the rule (e.g. ´acm-certificate-expiration-check´) and the value is an object specifying the rule details

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    # Description of the rule
    description : string
    # Identifier of an available AWS Config Managed Rule to call.
    identifier : string
    # Trigger type of the rule, must be one of ´CONFIG_CHANGE´ or ´PERIODIC´.
    trigger_type : string
    # A map of input parameters for the rule. If you don't have parameters, pass in an empty map ´{}´.
    input_parameters : map(string)
    # Whether or not this applies to global (non-regional) resources like IAM roles. When true, these rules are disabled
    # if var.enable_global_resource_rules is false.
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

<HclListItem name="allow_auto_deploy_from_github_actions_for_sources" requirement="optional" type="map(list(…))">
<HclListItemDescription>

Map of github repositories to the list of branches that are allowed to assume the IAM role. The repository should be encoded as org/repo-name (e.g., gruntwork-io/terrraform-aws-ci). Allows GitHub Actions to assume the auto deploy IAM role using an OpenID Connect Provider for the given repositories. Refer to the docs for github-actions-iam-role for more information. Note that this is mutually exclusive with <a href="#allow_auto_deploy_from_other_account_arns"><code>allow_auto_deploy_from_other_account_arns</code></a>. Only used if <a href="#enable_github_actions_access"><code>enable_github_actions_access</code></a> is true. 

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(list(string))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="allow_auto_deploy_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed to assume the auto deploy IAM role that has the permissions in <a href="#auto_deploy_permissions"><code>auto_deploy_permissions</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_auto_deploy_iam_role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="allow_billing_access_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed full (read and write) access to the billing info for this account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_billing_access_iam_role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="allow_cloudtrail_access_with_iam" requirement="optional" type="bool">
<HclListItemDescription>

If true, an IAM Policy that grants access to CloudTrail will be honored. If false, only the ARNs listed in <a href="#kms_key_user_iam_arns"><code>kms_key_user_iam_arns</code></a> will have access to CloudTrail and any IAM Policy grants will be ignored. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="allow_dev_access_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed full (read and write) access to the services in this account specified in <a href="#dev_permitted_services"><code>dev_permitted_services</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_dev_access_iam_role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="allow_full_access_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed full (read and write) access to this account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_full_access_iam_role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="allow_logs_access_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed read access to the logs in CloudTrail, AWS Config, and CloudWatch for this account. If <a href="#cloudtrail_kms_key_arn"><code>cloudtrail_kms_key_arn</code></a> is specified, will also be given permissions to decrypt with the KMS CMK that is used to encrypt CloudTrail logs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_read_only_access_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed read-only access to this account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_read_only_access_iam_role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="allow_ssh_grunt_access_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed read access to IAM groups and publish SSH keys. This is used for ssh-grunt.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_support_access_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed access to AWS support for this account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_support_access_iam_role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="auto_deploy_permissions" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM permissions (e.g. ec2:*) that will be added to an IAM Group for doing automated deployments. NOTE: If <a href="#should_create_iam_group_auto_deploy"><code>should_create_iam_group_auto_deploy</code></a> is true, the list must have at least one element (e.g. '*').

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="aws_config_iam_role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudtrail_additional_bucket_policy_statements" requirement="optional" type="any">
<HclListItemDescription>

Additional IAM policies to apply to cloudtrail S3 bucket. You can use this to grant read/write access beyond what is provided to Cloudtrail. This should be a map, where each key is a unique statement ID (SID), and each value is an object that contains the parameters defined in the comment below.

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

<HclListItem name="cloudtrail_advanced_event_selectors" requirement="optional" type="any">
<HclListItemDescription>

Map of advanced event selector name to list of field selectors to apply for that event selector. Advanced event selectors allow for more fine grained data logging of events.

Note that you can not configure basic data logging (<a href="#cloudtrail_data_logging_enabled"><code>cloudtrail_data_logging_enabled</code></a>) if advanced event logging is enabled.

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
   cloudtrail_advanced_event_selectors = {
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

<HclListItem name="cloudtrail_allow_kms_describe_key_to_external_aws_accounts" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to allow kms:DescribeKey to external AWS accounts with write access to the CloudTrail bucket. This is useful during deployment so that you don't have to pass around the KMS key ARN.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="cloudtrail_cloudwatch_logs_group_name" requirement="optional" type="string">
<HclListItemDescription>

Specify the name of the CloudWatch Logs group to publish the CloudTrail logs to. This log group exists in the current account. Set this value to `null` to avoid publishing the trail logs to the logs group. The recommended configuration for CloudTrail is (a) for each child account to aggregate its logs in an S3 bucket in a single central account, such as a logs account and (b) to also store 14 days work of logs in CloudWatch in the child account itself for local debugging.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;cloudtrail-logs&quot;"/>
</HclListItem>

<HclListItem name="cloudtrail_data_logging_enabled" requirement="optional" type="bool">
<HclListItemDescription>

If true, logging of data events will be enabled.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="cloudtrail_data_logging_include_management_events" requirement="optional" type="bool">
<HclListItemDescription>

Specify if you want your event selector to include management events for your trail.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="cloudtrail_data_logging_read_write_type" requirement="optional" type="string">
<HclListItemDescription>

Specify if you want your trail to log read-only events, write-only events, or all. Possible values are: ReadOnly, WriteOnly, All.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;All&quot;"/>
</HclListItem>

<HclListItem name="cloudtrail_data_logging_resources" requirement="optional" type="map(list(…))">
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

<HclListItem name="cloudtrail_enable_key_rotation" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to enable automatic annual rotation of the KMS key. Defaults to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="cloudtrail_force_destroy" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, when you run 'terraform destroy', delete all objects from the bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="cloudtrail_iam_role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudtrail_is_organization_trail" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether the trail is an AWS Organizations trail. Organization trails log events for the root account and all member accounts. Can only be created in the organization root account. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="cloudtrail_kms_key_administrator_iam_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key) that governs access to write API calls older than 7 days and all read API calls. The IAM Users specified in this list will have rights to change who can access this extended log data. Note that if you specify a logs account (by setting is_logs_account = true on one of the accounts in <a href="#child_accounts"><code>child_accounts</code></a>), the KMS CMK will be created in that account, and the root of that account will automatically be made an admin of the CMK.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cloudtrail_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

All CloudTrail Logs will be encrypted with a KMS CMK (Customer Master Key) that governs access to write API calls older than 7 days and all read API calls. If that CMK already exists, set this to the ARN of that CMK. Otherwise, set this to null, and a new CMK will be created. If you set is_logs_account to true on one of the accounts in <a href="#child_accounts"><code>child_accounts</code></a>, the KMS CMK will be created in that account (this is the recommended approach!).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudtrail_kms_key_arn_is_alias" requirement="optional" type="bool">
<HclListItemDescription>

If the kms_key_arn provided is an alias or alias ARN, then this must be set to true so that the module will exchange the alias for a CMK ARN. Setting this to true and using aliases requires <a href="#cloudtrail_allow_kms_describe_key_to_external_aws_accounts"><code>cloudtrail_allow_kms_describe_key_to_external_aws_accounts</code></a> to also be true for multi-account scenarios.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="cloudtrail_kms_key_service_principals" requirement="optional" type="list(object(…))">
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

<HclListItem name="cloudtrail_kms_key_user_iam_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key) that governs access to write API calls older than 7 days and all read API calls. The IAM Users specified in this list will have read-only access to this extended log data.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cloudtrail_num_days_after_which_archive_log_data" requirement="optional" type="number">
<HclListItemDescription>

After this number of days, log files should be transitioned from S3 to Glacier. Enter 0 to never archive log data.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="cloudtrail_num_days_after_which_delete_log_data" requirement="optional" type="number">
<HclListItemDescription>

After this number of days, log files should be deleted from S3. Enter 0 to never delete log data.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="365"/>
</HclListItem>

<HclListItem name="cloudtrail_num_days_to_retain_cloudwatch_logs" requirement="optional" type="number">
<HclListItemDescription>

After this number of days, logs stored in CloudWatch will be deleted. Possible values are: 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1827, 3653, and 0 (default). When set to 0, logs will be retained indefinitely.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="cloudtrail_organization_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the organization. Required only if an organization wide CloudTrail is being setup and `create_organization` is set to false. The organization ID is required to ensure that the entire organization is whitelisted in the CloudTrail bucket write policy.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudtrail_s3_bucket_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the S3 Bucket where CloudTrail logs will be stored. This could be a bucket in this AWS account or the name of a bucket in another AWS account where CloudTrail logs should be sent. If you set is_logs_account on one of the accounts in <a href="#child_accounts"><code>child_accounts</code></a>, the S3 bucket will be created in that account (this is the recommended approach!).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudtrail_s3_mfa_delete" requirement="optional" type="bool">
<HclListItemDescription>

Enable MFA delete for either 'Change the versioning state of your bucket' or 'Permanently delete an object version'. This setting only applies to the bucket used to storage Cloudtrail data. This cannot be used to toggle this setting but is available to allow managed buckets to reflect the state in AWS.  For instructions on how to enable MFA Delete, check out the README from the terraform-aws-security/private-s3-bucket module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="cloudtrail_should_create_s3_bucket" requirement="optional" type="bool">
<HclListItemDescription>

If true, create an S3 bucket of name <a href="#cloudtrail_s3_bucket_name"><code>cloudtrail_s3_bucket_name</code></a> for CloudTrail logs, either in the logs account—the account in <a href="#child_accounts"><code>child_accounts</code></a> that has is_logs_account set to true (this is the recommended approach!)—or in this account if none of the child accounts are marked as a logs account. If false, assume <a href="#cloudtrail_s3_bucket_name"><code>cloudtrail_s3_bucket_name</code></a> is an S3 bucket that already exists. We recommend setting this to true and setting is_logs_account to true on one of the accounts in <a href="#child_accounts"><code>child_accounts</code></a> to use that account as a logs account where you aggregate all your CloudTrail data. In case you want to disable the CloudTrail module and the S3 bucket, you need to set both <a href="#enable_cloudtrail"><code>enable_cloudtrail</code></a> and cloudtrail_should_create_s3_bucket to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="cloudtrail_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags to apply to the CloudTrail resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="config_aggregate_config_data_in_external_account" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to send the AWS Config data to another account (e.g., a logs account) for aggregation purposes. You must set the ID of that other account via the config_central_account_id variable. Note that if one of the accounts in <a href="#child_accounts"><code>child_accounts</code></a> has is_logs_account set to true (this is the approach we recommended!), this variable will be assumed to be true, so you don't have to pass any value for it.  This redundant variable has to exist because Terraform does not allow computed data in count and for_each parameters and <a href="#config_central_account_id"><code>config_central_account_id</code></a> may be computed if its the ID of a newly-created AWS account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="config_central_account_id" requirement="optional" type="string">
<HclListItemDescription>

If the S3 bucket and SNS topics used for AWS Config live in a different AWS account, set this variable to the ID of that account. If the S3 bucket and SNS topics live in this account, set this variable to an empty string. Note that if one of the accounts in <a href="#child_accounts"><code>child_accounts</code></a> has is_logs_account set to true (this is the approach we recommended!), that account's ID will be used automatically, and you can leave this variable null.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="config_create_account_rules" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to create account-level AWS Config rules directly in this account. Set false to create org-level rules that apply to this account and all child accounts. We recommend setting this to true to use account-level rules because org-level rules create a chicken-and-egg problem with creating new accounts (see this module's README for details).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="config_delivery_channel_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

Optional KMS key to use for encrypting S3 objects on the AWS Config delivery channel for an externally managed S3 bucket. This must belong to the same region as the destination S3 bucket. If null, AWS Config will default to encrypting the delivered data with AES-256 encryption. Only used if <a href="#should_create_s3_bucket"><code>should_create_s3_bucket</code></a> is false - otherwise, <a href="#config_s3_bucket_kms_key_arn"><code>config_s3_bucket_kms_key_arn</code></a> is used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="config_force_destroy" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, when you run 'terraform destroy', delete all objects from the bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="config_num_days_after_which_archive_log_data" requirement="optional" type="number">
<HclListItemDescription>

After this number of days, log files should be transitioned from S3 to Glacier. Enter 0 to never archive log data.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="365"/>
</HclListItem>

<HclListItem name="config_num_days_after_which_delete_log_data" requirement="optional" type="number">
<HclListItemDescription>

After this number of days, log files should be deleted from S3. Enter 0 to never delete log data.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="730"/>
</HclListItem>

<HclListItem name="config_s3_bucket_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

Optional KMS key (in logs account) to use for encrypting S3 objects on the AWS Config bucket, when the S3 bucket is created within this module (<a href="#config_should_create_s3_bucket"><code>config_should_create_s3_bucket</code></a> is true). For encrypting S3 objects on delivery for an externally managed S3 bucket, refer to the <a href="#config_delivery_channel_kms_key_arn"><code>config_delivery_channel_kms_key_arn</code></a> input variable. If null, data in S3 will be encrypted using the default aws/s3 key. If provided, the key policy of the provided key must permit the IAM role used by AWS Config. See https://docs.aws.amazon.com/sns/latest/dg/sns-key-management.html. Note that the KMS key must reside in the global recorder region (as configured by <a href="#aws_region"><code>aws_region</code></a>).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="config_s3_bucket_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the S3 Bucket where Config items will be stored. This could be a bucket in this AWS account or the name of a bucket in another AWS account where Config items should be sent. If you set is_logs_account to true on one of the accounts in <a href="#child_accounts"><code>child_accounts</code></a>, the S3 bucket will be created in that account (this is the recommended approach!).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="config_s3_mfa_delete" requirement="optional" type="bool">
<HclListItemDescription>

Enable MFA delete for either 'Change the versioning state of your bucket' or 'Permanently delete an object version'. This setting only applies to the bucket used to storage AWS Config data. This cannot be used to toggle this setting but is available to allow managed buckets to reflect the state in AWS. For instructions on how to enable MFA Delete, check out the README from the terraform-aws-security/private-s3-bucket module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="config_should_create_s3_bucket" requirement="optional" type="bool">
<HclListItemDescription>

If true, create an S3 bucket of name <a href="#config_s3_bucket_name"><code>config_s3_bucket_name</code></a> for AWS Config data, either in the logs account—the account in <a href="#child_accounts"><code>child_accounts</code></a> that has is_logs_account set to true (this is the recommended approach!)—or in this account if none of the child accounts are marked as a logs account. If false, assume <a href="#config_s3_bucket_name"><code>config_s3_bucket_name</code></a> is an S3 bucket that already exists. We recommend setting this to true and setting is_logs_account to true on one of the accounts in <a href="#child_accounts"><code>child_accounts</code></a> to use that account as a logs account where you aggregate all your AWS Config data. In case you want to disable the AWS Config module and the S3 bucket, you need to set both <a href="#enable_config"><code>enable_config</code></a> and config_should_create_s3_bucket to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="config_should_create_sns_topic" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to create an SNS topic in this account for sending AWS Config notifications. Set to false to assume the topic specified in <a href="#config_sns_topic_name"><code>config_sns_topic_name</code></a> already exists in another AWS account (e.g the logs account).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="config_sns_topic_kms_key_region_map" requirement="optional" type="map(string)">
<HclListItemDescription>

Optional KMS key to use for each region for configuring default encryption for the SNS topic (encoded as a map from region - e.g. us-east-1 - to ARN of KMS key). If null or the region key is missing, encryption will not be configured for the SNS topic in that region.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="config_sns_topic_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the SNS Topic in where AWS Config notifications will be sent. Can be in the same account or in another account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ConfigTopic&quot;"/>
</HclListItem>

<HclListItem name="config_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the S3 Bucket. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="configrules_excluded_accounts" requirement="optional" type="list(string)">
<HclListItemDescription>

List of AWS account identifiers to exclude from org-level Config rules. Only used if <a href="#config_create_account_rules"><code>config_create_account_rules</code></a> is false (not recommended).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="configrules_maximum_execution_frequency" requirement="optional" type="string">
<HclListItemDescription>

The maximum frequency with which AWS Config runs evaluations for the ´PERIODIC´ rules. See https://www.terraform.io/docs/providers/aws/r/config_organization_managed_rule.html#maximum_execution_frequency

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;TwentyFour_Hours&quot;"/>
</HclListItem>

<HclListItem name="create_organization" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to create/configure AWS Organizations for the first time in this account. If you already configured AWS Organizations in your account, set this to false; alternatively, you could set it to true and run 'terraform import' to import you existing Organization.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="cross_account_access_all_group_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the IAM group that will grant access to all external AWS accounts in <a href="#iam_groups_for_cross_account_access"><code>iam_groups_for_cross_account_access</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;_all-accounts&quot;"/>
</HclListItem>

<HclListItem name="dev_permitted_services" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of AWS services for which the developers from the accounts in <a href="#allow_dev_access_from_other_account_arns"><code>allow_dev_access_from_other_account_arns</code></a> will receive full permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to grant developers access only to EC2 and Amazon Machine Learning, use the value ['ec2','machinelearning']. Do NOT add iam to the list of services, or that will grant Developers de facto admin access.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ebs_enable_encryption" requirement="optional" type="bool">
<HclListItemDescription>

If set to true (default), all new EBS volumes will have encryption enabled by default

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="ebs_kms_key_arns" requirement="optional" type="map(string)">
<HclListItemDescription>

Optional map of region names to KMS keys to use for EBS volume encryption when <a href="#ebs_use_existing_kms_keys"><code>ebs_use_existing_kms_keys</code></a> is enabled.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="ebs_use_existing_kms_keys" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, the KMS Customer Managed Keys (CMK) specified in <a href="#ebs_kms_key_arns"><code>ebs_kms_key_arns</code></a> will be set as the default for EBS encryption. When false (default), the AWS-managed aws/ebs key will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_cloudtrail" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable CloudTrail in the root account. Set to false to disable CloudTrail (note: all other CloudTrail variables will be ignored). In case you want to disable the CloudTrail module and the S3 bucket, you need to set both <a href="#enable_cloudtrail"><code>enable_cloudtrail</code></a> and cloudtrail_should_create_s3_bucket to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_cloudtrail_s3_server_access_logging" requirement="optional" type="bool">
<HclListItemDescription>

Enables S3 server access logging which sends detailed records for the requests that are made to the bucket. Defaults to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_config" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable AWS Config in the root account. Set to false to disable AWS Config (note: all other AWS config variables will be ignored). In case you want to disable the CloudTrail module and the S3 bucket, you need to set both <a href="#enable_cloudtrail"><code>enable_cloudtrail</code></a> and cloudtrail_should_create_s3_bucket to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_encrypted_volumes" requirement="optional" type="bool">
<HclListItemDescription>

Checks whether the EBS volumes that are in an attached state are encrypted.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_github_actions_access" requirement="optional" type="bool">
<HclListItemDescription>

When true, create an Open ID Connect Provider that GitHub actions can use to assume IAM roles in the account. Refer to https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services for more information.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_iam_access_analyzer" requirement="optional" type="bool">
<HclListItemDescription>

A feature flag to enable or disable this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_iam_cross_account_roles" requirement="optional" type="bool">
<HclListItemDescription>

A feature flag to enable or disable this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_iam_groups" requirement="optional" type="bool">
<HclListItemDescription>

A feature flag to enable or disable this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_iam_password_policy" requirement="optional" type="bool">
<HclListItemDescription>

Checks whether the account password policy for IAM users meets the specified requirements.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_insecure_sg_rules" requirement="optional" type="bool">
<HclListItemDescription>

Checks whether the security group with 0.0.0.0/0 of any Amazon Virtual Private Cloud (Amazon VPC) allows only specific inbound TCP or UDP traffic.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_rds_storage_encrypted" requirement="optional" type="bool">
<HclListItemDescription>

Checks whether storage encryption is enabled for your RDS DB instances.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_root_account_mfa" requirement="optional" type="bool">
<HclListItemDescription>

Checks whether users of your AWS account require a multi-factor authentication (MFA) device to sign in with root credentials.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_s3_bucket_public_read_prohibited" requirement="optional" type="bool">
<HclListItemDescription>

Checks that your Amazon S3 buckets do not allow public read access.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_s3_bucket_public_write_prohibited" requirement="optional" type="bool">
<HclListItemDescription>

Checks that your Amazon S3 buckets do not allow public write access.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="encrypted_volumes_kms_id" requirement="optional" type="string">
<HclListItemDescription>

ID or ARN of the KMS key that is used to encrypt the volume. Used for configuring the encrypted volumes config rule.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="force_destroy_users" requirement="optional" type="bool">
<HclListItemDescription>

When destroying this user, destroy even if it has non-Terraform-managed IAM access keys, login profile, or MFA devices. Without force_destroy a user with non-Terraform-managed access keys and login profile will fail to be destroyed.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="github_actions_openid_connect_provider_thumbprint_list" requirement="optional" type="list(string)">
<HclListItemDescription>

When set, use the statically provided hardcoded list of thumbprints rather than looking it up dynamically. This is useful if you want to trade reliability of the OpenID Connect Provider across certificate renewals with a static list that is obtained using a trustworthy mechanism, to mitigate potential damage from a domain hijacking attack on GitHub domains.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="guardduty_cloudwatch_event_rule_name" requirement="optional" type="string">
<HclListItemDescription>

Name of the Cloudwatch event rules.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;guardduty-finding-events&quot;"/>
</HclListItem>

<HclListItem name="guardduty_finding_publishing_frequency" requirement="optional" type="string">
<HclListItemDescription>

Specifies the frequency of notifications sent for subsequent finding occurrences. If the detector is a GuardDuty member account, the value is determined by the GuardDuty master account and cannot be modified, otherwise defaults to SIX_HOURS. For standalone and GuardDuty master accounts, it must be configured in Terraform to enable drift detection. Valid values for standalone and master accounts: FIFTEEN_MINUTES, ONE_HOUR, SIX_HOURS.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="guardduty_findings_sns_topic_name" requirement="optional" type="string">
<HclListItemDescription>

Specifies a name for the created SNS topics where findings are published. publish_findings_to_sns must be set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;guardduty-findings&quot;"/>
</HclListItem>

<HclListItem name="guardduty_publish_findings_to_sns" requirement="optional" type="bool">
<HclListItemDescription>

Send GuardDuty findings to SNS topics specified by findings_sns_topic_name.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="iam_access_analyzer_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the IAM Access Analyzer module

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;baseline_root-iam_access_analyzer&quot;"/>
</HclListItem>

<HclListItem name="iam_access_analyzer_type" requirement="optional" type="string">
<HclListItemDescription>

If set to ORGANIZATION, the analyzer will be scanning the current organization and any policies that refer to linked resources such as S3, IAM, Lambda and SQS policies.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ORGANIZATION&quot;"/>
</HclListItem>

<HclListItem name="iam_group_developers_permitted_services" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of AWS services for which the developers IAM Group will receive full permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to grant developers access only to EC2 and Amazon Machine Learning, use the value ['ec2','machinelearning']. Do NOT add iam to the list of services, or that will grant Developers de facto admin access. If you need to grant iam privileges, just grant the user Full Access.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="iam_group_names_ssh_grunt_sudo_users" requirement="optional" type="list(string)">
<HclListItemDescription>

The list of names to be used for the IAM Group that enables its members to SSH as a sudo user into any server configured with the ssh-grunt Gruntwork module. Pass in multiple to configure multiple different IAM groups to control different groupings of access at the server level. Pass in empty list to disable creation of the IAM groups.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="iam_group_names_ssh_grunt_users" requirement="optional" type="list(string)">
<HclListItemDescription>

The name to be used for the IAM Group that enables its members to SSH as a non-sudo user into any server configured with the ssh-grunt Gruntwork module. Pass in multiple to configure multiple different IAM groups to control different groupings of access at the server level. Pass in empty list to disable creation of the IAM groups.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="iam_groups_for_cross_account_access" requirement="optional" type="list(object(…))">
<HclListItemDescription>

This variable is used to create groups that allow IAM users to assume roles in your other AWS accounts. It should be a list of objects, where each object has the fields 'group_name', which will be used as the name of the IAM group, and 'iam_role_arns', which is a list of ARNs of IAM Roles that you can assume when part of that group. For each entry in the list of objects, we will create an IAM group that allows users to assume the given IAM role(s) in the other AWS account. This allows you to define all your IAM users in one account (e.g. the users account) and to grant them access to certain IAM roles in other accounts (e.g. the stage, prod, audit accounts).

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    group_name    = string
    iam_role_arns = list(string)
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = [
     {
       group_name   = "stage-full-access"
       iam_role_arns = ["arn:aws:iam::123445678910:role/mgmt-full-access"]
     },
     {
       group_name   = "prod-read-only-access"
       iam_role_arns = [
         "arn:aws:iam::9876543210:role/prod-read-only-ec2-access",
         "arn:aws:iam::9876543210:role/prod-read-only-rds-access"
       ]
     }
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="iam_password_policy_allow_users_to_change_password" requirement="optional" type="bool">
<HclListItemDescription>

Allow users to change their own password.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="iam_password_policy_hard_expiry" requirement="optional" type="bool">
<HclListItemDescription>

Password expiration requires administrator reset.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="iam_password_policy_max_password_age" requirement="optional" type="number">
<HclListItemDescription>

Number of days before password expiration.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="iam_password_policy_minimum_password_length" requirement="optional" type="number">
<HclListItemDescription>

Password minimum length.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="16"/>
</HclListItem>

<HclListItem name="iam_password_policy_password_reuse_prevention" requirement="optional" type="number">
<HclListItemDescription>

Number of passwords before allowing reuse.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="5"/>
</HclListItem>

<HclListItem name="iam_password_policy_require_lowercase_characters" requirement="optional" type="bool">
<HclListItemDescription>

Require at least one lowercase character in password.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="iam_password_policy_require_numbers" requirement="optional" type="bool">
<HclListItemDescription>

Require at least one number in password.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="iam_password_policy_require_symbols" requirement="optional" type="bool">
<HclListItemDescription>

Require at least one symbol in password.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="iam_password_policy_require_uppercase_characters" requirement="optional" type="bool">
<HclListItemDescription>

Require at least one uppercase character in password.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="iam_role_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

The tags to apply to all the IAM role resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="insecure_sg_rules_authorized_tcp_ports" requirement="optional" type="string">
<HclListItemDescription>

Comma-separated list of TCP ports authorized to be open to 0.0.0.0/0. Ranges are defined by a dash; for example, '443,1020-1025'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;443&quot;"/>
</HclListItem>

<HclListItem name="insecure_sg_rules_authorized_udp_ports" requirement="optional" type="string">
<HclListItemDescription>

Comma-separated list of UDP ports authorized to be open to 0.0.0.0/0. Ranges are defined by a dash; for example, '500,1020-1025'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="is_multi_region_trail" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether CloudTrail will log only API calls in the current region or in all regions. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="organizations_aws_service_access_principals" requirement="optional" type="list(string)">
<HclListItemDescription>

List of AWS service principal names for which you want to enable integration with your organization. Must have `organizations_feature_set` set to ALL. See https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services.html

</HclListItemDescription>
<HclListItemDefaultValue>

```hcl
[
  "cloudtrail.amazonaws.com",
  "config-multiaccountsetup.amazonaws.com",
  "config.amazonaws.com",
  "access-analyzer.amazonaws.com"
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="organizations_default_iam_user_access_to_billing" requirement="optional" type="string">
<HclListItemDescription>

If set to ALLOW, the new account enables IAM users to access account billing information if they have the required permissions. If set to DENY, then only the root user of the new account can access account billing information.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ALLOW&quot;"/>
</HclListItem>

<HclListItem name="organizations_default_role_name" requirement="optional" type="string">
<HclListItemDescription>

The name of an IAM role that Organizations automatically preconfigures in the new member account. This role trusts the master account, allowing users in the master account to assume the role, as permitted by the master account administrator.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;OrganizationAccountAccessRole&quot;"/>
</HclListItem>

<HclListItem name="organizations_default_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Default tags to add to accounts. Will be appended to ´child_account.*.tags´

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="organizations_enabled_policy_types" requirement="optional" type="list(string)">
<HclListItemDescription>

List of Organizations policy types to enable in the Organization Root. See https://docs.aws.amazon.com/organizations/latest/APIReference/API_EnablePolicyType.html

</HclListItemDescription>
<HclListItemDefaultValue>

```hcl
[
  "SERVICE_CONTROL_POLICY"
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="organizations_feature_set" requirement="optional" type="string">
<HclListItemDescription>

Specify `ALL` or `CONSOLIDATED_BILLING`.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ALL&quot;"/>
</HclListItem>

<HclListItem name="password_reset_required" requirement="optional" type="bool">
<HclListItemDescription>

Force the user to reset their password on initial login. Only used for users with create_login_profile set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="rds_storage_encrypted_kms_id" requirement="optional" type="string">
<HclListItemDescription>

KMS key ID or ARN used to encrypt the storage. Used for configuring the RDS storage encryption config rule.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="should_create_iam_group_auto_deploy" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for auto-deploy? Allows automated deployment by granting the permissions specified in <a href="#auto_deploy_permissions"><code>auto_deploy_permissions</code></a>. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="should_create_iam_group_billing" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for billing? Allows read-write access to billing features only. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="should_create_iam_group_developers" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for developers? The permissions of that group are specified via <a href="#iam_group_developers_permitted_services"><code>iam_group_developers_permitted_services</code></a>. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="should_create_iam_group_full_access" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for full access? Allows full access to all AWS resources. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="should_create_iam_group_logs" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for logs? Allows read access to logs in CloudTrail, AWS Config, and CloudWatch. If <a href="#cloudtrail_kms_key_arn"><code>cloudtrail_kms_key_arn</code></a> is specified, will also be given permissions to decrypt with the KMS CMK that is used to encrypt CloudTrail logs. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="should_create_iam_group_read_only" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for read-only? Allows read-only access to all AWS resources. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="should_create_iam_group_support" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for support? Allows access to AWS support. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="should_create_iam_group_use_existing_iam_roles" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for use-existing-iam-roles? Allow launching AWS resources with existing IAM Roles, but no ability to create new IAM Roles. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="should_create_iam_group_user_self_mgmt" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for user self-management? Allows users to manage their own IAM user accounts, but not other IAM users. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="should_require_mfa" requirement="optional" type="bool">
<HclListItemDescription>

Should we require that all IAM Users use Multi-Factor Authentication for both AWS API calls and the AWS Web Console? (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="use_managed_iam_policies" requirement="optional" type="bool">
<HclListItemDescription>

When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="users" requirement="optional" type="any">
<HclListItemDescription>

A map of users to create. The keys are the user names and the values are an object with the optional keys 'groups' (a list of IAM groups to add the user to), 'tags' (a map of tags to apply to the user), 'pgp_key' (either a base-64 encoded PGP public key, or a keybase username in the form keybase:username, used to encrypt the user's credentials; required if create_login_profile or create_access_keys is true), 'create_login_profile' (if set to true, create a password to login to the AWS Web Console), 'create_access_keys' (if set to true, create access keys for the user), 'path' (the path), and 'permissions_boundary' (the ARN of the policy that is used to set the permissions boundary for the user).

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
   default = {
     alice = {
       groups = ["user-self-mgmt", "developers", "ssh-sudo-users"]
     }
  
     bob = {
       path   = "/"
       groups = ["user-self-mgmt", "ops", "admins"]
       tags   = {
         foo = "bar"
       }
     }
  
     carol = {
       groups               = ["user-self-mgmt", "developers", "ssh-users"]
       pgp_key              = "keybase:carol_on_keybase"
       create_login_profile = true
       create_access_keys   = true
     }
   }

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Ideally, this would be a map of (string, object), but object does not support optional properties, and we want
   users to be able to specify, say, tags for some users, but not for others. We can't use a map(any) either, as that
   would require the values to all have the same type, and due to optional parameters, that wouldn't work either. So,
   we have to lamely fall back to any.

```
</details>

</HclGeneralListItem>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="allow_auto_deploy_access_from_other_accounts_iam_role_arn">
</HclListItem>

<HclListItem name="allow_auto_deploy_access_from_other_accounts_iam_role_id">
</HclListItem>

<HclListItem name="allow_billing_access_from_other_accounts_iam_role_arn">
</HclListItem>

<HclListItem name="allow_billing_access_from_other_accounts_iam_role_id">
</HclListItem>

<HclListItem name="allow_billing_access_sign_in_url">
</HclListItem>

<HclListItem name="allow_dev_access_from_other_accounts_iam_role_arn">
</HclListItem>

<HclListItem name="allow_dev_access_from_other_accounts_iam_role_id">
</HclListItem>

<HclListItem name="allow_dev_access_sign_in_url">
</HclListItem>

<HclListItem name="allow_full_access_from_other_accounts_iam_role_arn">
</HclListItem>

<HclListItem name="allow_full_access_from_other_accounts_iam_role_id">
</HclListItem>

<HclListItem name="allow_full_access_sign_in_url">
</HclListItem>

<HclListItem name="allow_iam_admin_access_from_other_accounts_iam_role_arn">
</HclListItem>

<HclListItem name="allow_iam_admin_access_from_other_accounts_iam_role_id">
</HclListItem>

<HclListItem name="allow_iam_admin_access_sign_in_url">
</HclListItem>

<HclListItem name="allow_logs_access_from_other_accounts_iam_role_arn">
</HclListItem>

<HclListItem name="allow_logs_access_from_other_accounts_iam_role_id">
</HclListItem>

<HclListItem name="allow_logs_access_sign_in_url">
</HclListItem>

<HclListItem name="allow_read_only_access_from_other_accounts_iam_role_arn">
</HclListItem>

<HclListItem name="allow_read_only_access_from_other_accounts_iam_role_id">
</HclListItem>

<HclListItem name="allow_read_only_access_sign_in_url">
</HclListItem>

<HclListItem name="allow_ssh_grunt_access_from_other_accounts_iam_role_arn">
</HclListItem>

<HclListItem name="allow_ssh_grunt_access_from_other_accounts_iam_role_id">
</HclListItem>

<HclListItem name="allow_ssh_grunt_access_sign_in_url">
</HclListItem>

<HclListItem name="allow_support_access_from_other_accounts_iam_role_arn">
</HclListItem>

<HclListItem name="allow_support_access_from_other_accounts_iam_role_id">
</HclListItem>

<HclListItem name="allow_support_access_sign_in_url">
</HclListItem>

<HclListItem name="aws_ebs_encryption_by_default_enabled">
<HclListItemDescription>

A map from region to a boolean indicating whether or not EBS encryption is enabled by default for each region.

</HclListItemDescription>
</HclListItem>

<HclListItem name="aws_ebs_encryption_default_kms_key">
<HclListItemDescription>

A map from region to the ARN of the KMS key used for default EBS encryption for each region.

</HclListItemDescription>
</HclListItem>

<HclListItem name="billing_iam_group_arn">
</HclListItem>

<HclListItem name="billing_iam_group_name">
</HclListItem>

<HclListItem name="child_accounts">
<HclListItemDescription>

A map of all accounts created by this module (NOT including the root account). The keys are the names of the accounts and the values are the attributes for the account as defined in the aws_organizations_account resource.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloudtrail_cloudwatch_group_arn">
<HclListItemDescription>

The ARN of the cloudwatch log group.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloudtrail_cloudwatch_group_name">
<HclListItemDescription>

The name of the cloudwatch log group.

</HclListItemDescription>
</HclListItem>

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

<HclListItem name="cloudtrail_kms_key_alias_name">
<HclListItemDescription>

The alias of the KMS key used by the S3 bucket to encrypt cloudtrail logs.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloudtrail_kms_key_arn">
<HclListItemDescription>

The ARN of the KMS key used by the S3 bucket to encrypt cloudtrail logs.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloudtrail_kms_key_arn_with_dependency">
<HclListItemDescription>

The ARN of the KMS key used by the S3 bucket to encrypt cloudtrail logs.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloudtrail_s3_access_logging_bucket_arn">
<HclListItemDescription>

The ARN of the S3 bucket where access logs for the CloudTrail S3 bucket are delivered.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloudtrail_s3_access_logging_bucket_name">
<HclListItemDescription>

The name of the S3 bucket where access logs for the CloudTrail S3 bucket are delivered.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloudtrail_s3_bucket_arn">
<HclListItemDescription>

The ARN of the S3 bucket where cloudtrail logs are delivered.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloudtrail_s3_bucket_name">
<HclListItemDescription>

The name of the S3 bucket where cloudtrail logs are delivered.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloudtrail_s3_bucket_name_with_dependency">
<HclListItemDescription>

The name of the S3 bucket where cloudtrail logs are delivered. Sources from 'data'.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloudtrail_trail_arn">
<HclListItemDescription>

The ARN of the cloudtrail trail.

</HclListItemDescription>
</HclListItem>

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

<HclListItem name="config_s3_bucket_arn">
<HclListItemDescription>

The ARN of the S3 bucket used by AWS Config to store configuration items.

</HclListItemDescription>
</HclListItem>

<HclListItem name="config_s3_bucket_name">
<HclListItemDescription>

The name of the S3 bucket used by AWS Config to store configuration items.

</HclListItemDescription>
</HclListItem>

<HclListItem name="config_s3_bucket_name_with_dependency">
<HclListItemDescription>

The name of the S3 bucket used by AWS Config to store configuration items, sources from 'data'.

</HclListItemDescription>
</HclListItem>

<HclListItem name="config_sns_topic_arns">
<HclListItemDescription>

The ARNs of the SNS Topic used by the config notifications.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cross_account_access_all_group_arn">
</HclListItem>

<HclListItem name="cross_account_access_all_group_name">
</HclListItem>

<HclListItem name="cross_account_access_group_arns">
</HclListItem>

<HclListItem name="cross_account_access_group_names">
</HclListItem>

<HclListItem name="developers_iam_group_arn">
</HclListItem>

<HclListItem name="developers_iam_group_name">
</HclListItem>

<HclListItem name="full_access_iam_group_arn">
</HclListItem>

<HclListItem name="full_access_iam_group_name">
</HclListItem>

<HclListItem name="guardduty_cloudwatch_event_rule_arns">
<HclListItemDescription>

The ARNs of the cloudwatch event rules used to publish findings to sns if <a href="#publish_findings_to_sns"><code>publish_findings_to_sns</code></a> is set to true.

</HclListItemDescription>
</HclListItem>

<HclListItem name="guardduty_cloudwatch_event_target_arns">
<HclListItemDescription>

The ARNs of the cloudwatch event targets used to publish findings to sns if <a href="#publish_findings_to_sns"><code>publish_findings_to_sns</code></a> is set to true.

</HclListItemDescription>
</HclListItem>

<HclListItem name="guardduty_detector_ids">
<HclListItemDescription>

The IDs of the GuardDuty detectors.

</HclListItemDescription>
</HclListItem>

<HclListItem name="guardduty_findings_sns_topic_arns">
<HclListItemDescription>

The ARNs of the SNS topics where findings are published if <a href="#publish_findings_to_sns"><code>publish_findings_to_sns</code></a> is set to true.

</HclListItemDescription>
</HclListItem>

<HclListItem name="guardduty_findings_sns_topic_names">
<HclListItemDescription>

The names of the SNS topic where findings are published if <a href="#publish_findings_to_sns"><code>publish_findings_to_sns</code></a> is set to true.

</HclListItemDescription>
</HclListItem>

<HclListItem name="iam_admin_iam_group_arn">
</HclListItem>

<HclListItem name="iam_admin_iam_group_name">
</HclListItem>

<HclListItem name="iam_admin_iam_policy_arn">
</HclListItem>

<HclListItem name="iam_self_mgmt_iam_group_arn">
</HclListItem>

<HclListItem name="iam_self_mgmt_iam_group_name">
</HclListItem>

<HclListItem name="iam_self_mgmt_iam_policy_arn">
</HclListItem>

<HclListItem name="logs_iam_group_arn">
</HclListItem>

<HclListItem name="logs_iam_group_name">
</HclListItem>

<HclListItem name="master_account_arn">
<HclListItemDescription>

ARN of the master account.

</HclListItemDescription>
</HclListItem>

<HclListItem name="master_account_email">
<HclListItemDescription>

Email address of the master account.

</HclListItemDescription>
</HclListItem>

<HclListItem name="master_account_id">
<HclListItemDescription>

Identifier of the master account.

</HclListItemDescription>
</HclListItem>

<HclListItem name="organization_arn">
<HclListItemDescription>

ARN of the organization.

</HclListItemDescription>
</HclListItem>

<HclListItem name="organization_id">
<HclListItemDescription>

Identifier of the organization.

</HclListItemDescription>
</HclListItem>

<HclListItem name="organization_root_id">
<HclListItemDescription>

Identifier of the root of this organization.

</HclListItemDescription>
</HclListItem>

<HclListItem name="read_only_iam_group_arn">
</HclListItem>

<HclListItem name="read_only_iam_group_name">
</HclListItem>

<HclListItem name="require_mfa_policy">
</HclListItem>

<HclListItem name="ssh_grunt_sudo_users_group_arns">
</HclListItem>

<HclListItem name="ssh_grunt_sudo_users_group_names">
</HclListItem>

<HclListItem name="ssh_grunt_users_group_arns">
</HclListItem>

<HclListItem name="ssh_grunt_users_group_names">
</HclListItem>

<HclListItem name="support_iam_group_arn">
</HclListItem>

<HclListItem name="support_iam_group_name">
</HclListItem>

<HclListItem name="use_existing_iam_roles_iam_group_arn">
</HclListItem>

<HclListItem name="use_existing_iam_roles_iam_group_name">
</HclListItem>

<HclListItem name="user_access_keys">
<HclListItemDescription>

A map of user name to that user's access keys (a map with keys access_key_id and secret_access_key), with the secret_access_key encrypted with that user's PGP key (only shows up for users with create_access_keys = true). You can decrypt the secret_access_key on the CLI: echo &lt;secret_access_key> | base64 --decode | keybase pgp decrypt

</HclListItemDescription>
</HclListItem>

<HclListItem name="user_arns">
<HclListItemDescription>

A map of user name to the ARN for that IAM user.

</HclListItemDescription>
</HclListItem>

<HclListItem name="user_passwords">
<HclListItemDescription>

A map of user name to that user's AWS Web Console password, encrypted with that user's PGP key (only shows up for users with create_login_profile = true). You can decrypt the password on the CLI: echo &lt;password> | base64 --decode | keybase pgp decrypt

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/landingzone/account-baseline-root/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/landingzone/account-baseline-root/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/landingzone/account-baseline-root/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "21a0956cfb64de1de4dfd152e5713171"
}
##DOCS-SOURCER-END -->
