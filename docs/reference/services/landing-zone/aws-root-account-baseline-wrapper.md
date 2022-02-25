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

<VersionBadge version="0.80.2" lastModifiedVersion="0.78.0"/>

# Account Baseline for root account


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/landingzone/account-baseline-root" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=landingzone%2Faccount-baseline-root" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

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
*   [How to create child accounts](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/core-concepts.md#creating-child-accounts)
*   [How to aggregate AWS Config and CloudTrail data in a logs account](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/core-concepts.md#aggregating-aws-config-and-cloudtrail-data-in-a-logs-account)
*   [Why does this module use account-level AWS Config Rules?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/core-concepts.md#why-does-this-module-use-account-level-aws-config-rules)
*   [How to use multi-region services](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/core-concepts.md#how-to-use-multi-region-services)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.
*   [examples](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples): This folder contains working examples of how to use the submodules.
*   [test](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing/landingzone folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-learning-and-testing/landingzone): The
    `examples/for-learning-and-testing/landingzone` folder contains standalone sample code optimized for learning,
    experimenting, and testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/), and it shows you how we build an
    end-to-end integrated tech stack on top of the Gruntwork Service Catalog.

*   [How to configure a production-grade AWS account structure](https://docs.gruntwork.io/guides/build-it-yourself/landing-zone/)

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<a name="additional_config_rules" className="snap-top"></a>

* [**`additional_config_rules`**](#additional_config_rules) &mdash; Map of additional managed rules to add. The key is the name of the rule (e.g. ´acm-certificate-expiration-check´) and the value is an object specifying the rule details

<a name="allow_auto_deploy_from_other_account_arns" className="snap-top"></a>

* [**`allow_auto_deploy_from_other_account_arns`**](#allow_auto_deploy_from_other_account_arns) &mdash; A list of IAM ARNs from other AWS accounts that will be allowed to assume the auto deploy IAM role that has the permissions in [`auto_deploy_permissions`](#auto_deploy_permissions).

<a name="allow_billing_access_from_other_account_arns" className="snap-top"></a>

* [**`allow_billing_access_from_other_account_arns`**](#allow_billing_access_from_other_account_arns) &mdash; A list of IAM ARNs from other AWS accounts that will be allowed full (read and write) access to the billing info for this account.

<a name="allow_cloudtrail_access_with_iam" className="snap-top"></a>

* [**`allow_cloudtrail_access_with_iam`**](#allow_cloudtrail_access_with_iam) &mdash; If true, an IAM Policy that grants access to CloudTrail will be honored. If false, only the ARNs listed in [`kms_key_user_iam_arns`](#kms_key_user_iam_arns) will have access to CloudTrail and any IAM Policy grants will be ignored. (true or false)

<a name="allow_dev_access_from_other_account_arns" className="snap-top"></a>

* [**`allow_dev_access_from_other_account_arns`**](#allow_dev_access_from_other_account_arns) &mdash; A list of IAM ARNs from other AWS accounts that will be allowed full (read and write) access to the services in this account specified in [`dev_permitted_services`](#dev_permitted_services).

<a name="allow_full_access_from_other_account_arns" className="snap-top"></a>

* [**`allow_full_access_from_other_account_arns`**](#allow_full_access_from_other_account_arns) &mdash; A list of IAM ARNs from other AWS accounts that will be allowed full (read and write) access to this account.

<a name="allow_logs_access_from_other_account_arns" className="snap-top"></a>

* [**`allow_logs_access_from_other_account_arns`**](#allow_logs_access_from_other_account_arns) &mdash; A list of IAM ARNs from other AWS accounts that will be allowed read access to the logs in CloudTrail, AWS Config, and CloudWatch for this account. If [`cloudtrail_kms_key_arn`](#cloudtrail_kms_key_arn) is specified, will also be given permissions to decrypt with the KMS CMK that is used to encrypt CloudTrail logs.

<a name="allow_read_only_access_from_other_account_arns" className="snap-top"></a>

* [**`allow_read_only_access_from_other_account_arns`**](#allow_read_only_access_from_other_account_arns) &mdash; A list of IAM ARNs from other AWS accounts that will be allowed read-only access to this account.

<a name="allow_ssh_grunt_access_from_other_account_arns" className="snap-top"></a>

* [**`allow_ssh_grunt_access_from_other_account_arns`**](#allow_ssh_grunt_access_from_other_account_arns) &mdash; A list of IAM ARNs from other AWS accounts that will be allowed read access to IAM groups and publish SSH keys. This is used for ssh-grunt.

<a name="allow_support_access_from_other_account_arns" className="snap-top"></a>

* [**`allow_support_access_from_other_account_arns`**](#allow_support_access_from_other_account_arns) &mdash; A list of IAM ARNs from other AWS accounts that will be allowed access to AWS support for this account.

<a name="auto_deploy_permissions" className="snap-top"></a>

* [**`auto_deploy_permissions`**](#auto_deploy_permissions) &mdash; A list of IAM permissions (e.g. ec2:*) that will be added to an IAM Group for doing automated deployments. NOTE: If [`should_create_iam_group_auto_deploy`](#should_create_iam_group_auto_deploy) is true, the list must have at least one element (e.g. '*').

<a name="aws_account_id" className="snap-top"></a>

* [**`aws_account_id`**](#aws_account_id) &mdash; The AWS Account ID the template should be operated on. This avoids misconfiguration errors caused by environment variables.

<a name="aws_region" className="snap-top"></a>

* [**`aws_region`**](#aws_region) &mdash; The AWS Region to use as the global config recorder and seed region for GuardDuty.

<a name="child_accounts" className="snap-top"></a>

* [**`child_accounts`**](#child_accounts) &mdash; Map of child accounts to create. The map key is the name of the account and the value is an object containing account configuration variables. See the comments below for what keys and values this object should contain.

<a name="cloudtrail_allow_kms_describe_key_to_external_aws_accounts" className="snap-top"></a>

* [**`cloudtrail_allow_kms_describe_key_to_external_aws_accounts`**](#cloudtrail_allow_kms_describe_key_to_external_aws_accounts) &mdash; Whether or not to allow kms:DescribeKey to external AWS accounts with write access to the CloudTrail bucket. This is useful during deployment so that you don't have to pass around the KMS key ARN.

<a name="cloudtrail_cloudwatch_logs_group_name" className="snap-top"></a>

* [**`cloudtrail_cloudwatch_logs_group_name`**](#cloudtrail_cloudwatch_logs_group_name) &mdash; Specify the name of the CloudWatch Logs group to publish the CloudTrail logs to. This log group exists in the current account. Set this value to `null` to avoid publishing the trail logs to the logs group. The recommended configuration for CloudTrail is (a) for each child account to aggregate its logs in an S3 bucket in a single central account, such as a logs account and (b) to also store 14 days work of logs in CloudWatch in the child account itself for local debugging.

<a name="cloudtrail_data_logging_enabled" className="snap-top"></a>

* [**`cloudtrail_data_logging_enabled`**](#cloudtrail_data_logging_enabled) &mdash; If true, logging of data events will be enabled.

<a name="cloudtrail_data_logging_include_management_events" className="snap-top"></a>

* [**`cloudtrail_data_logging_include_management_events`**](#cloudtrail_data_logging_include_management_events) &mdash; Specify if you want your event selector to include management events for your trail.

<a name="cloudtrail_data_logging_read_write_type" className="snap-top"></a>

* [**`cloudtrail_data_logging_read_write_type`**](#cloudtrail_data_logging_read_write_type) &mdash; Specify if you want your trail to log read-only events, write-only events, or all. Possible values are: ReadOnly, WriteOnly, All.

<a name="cloudtrail_data_logging_resources" className="snap-top"></a>

* [**`cloudtrail_data_logging_resources`**](#cloudtrail_data_logging_resources) &mdash; Data resources for which to log data events. This should be a map, where each key is a data resource type, and each value is a list of data resource values. Possible values for data resource types are: AWS::S3::Object, AWS::Lambda::Function and AWS::DynamoDB::Table. See the [`'data_resource`](#'data_resource)' block within the [`'event_selector`](#'event_selector)' block of the [`'aws_cloudtrail`](#'aws_cloudtrail)' resource for context: [`https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudtrail#data_resource`](#https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudtrail#data_resource).

<a name="cloudtrail_enable_key_rotation" className="snap-top"></a>

* [**`cloudtrail_enable_key_rotation`**](#cloudtrail_enable_key_rotation) &mdash; Whether or not to enable automatic annual rotation of the KMS key. Defaults to true.

<a name="cloudtrail_force_destroy" className="snap-top"></a>

* [**`cloudtrail_force_destroy`**](#cloudtrail_force_destroy) &mdash; If set to true, when you run 'terraform destroy', delete all objects from the bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!

<a name="cloudtrail_is_organization_trail" className="snap-top"></a>

* [**`cloudtrail_is_organization_trail`**](#cloudtrail_is_organization_trail) &mdash; Specifies whether the trail is an AWS Organizations trail. Organization trails log events for the root account and all member accounts. Can only be created in the organization root account. (true or false)

<a name="cloudtrail_kms_key_administrator_iam_arns" className="snap-top"></a>

* [**`cloudtrail_kms_key_administrator_iam_arns`**](#cloudtrail_kms_key_administrator_iam_arns) &mdash; All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key) that governs access to write API calls older than 7 days and all read API calls. The IAM Users specified in this list will have rights to change who can access this extended log data. Note that if you specify a logs account (by setting [`is_logs_account`](#is_logs_account) = true on one of the accounts in [`child_accounts`](#child_accounts)), the KMS CMK will be created in that account, and the root of that account will automatically be made an admin of the CMK.

<a name="cloudtrail_kms_key_arn" className="snap-top"></a>

* [**`cloudtrail_kms_key_arn`**](#cloudtrail_kms_key_arn) &mdash; All CloudTrail Logs will be encrypted with a KMS CMK (Customer Master Key) that governs access to write API calls older than 7 days and all read API calls. If that CMK already exists, set this to the ARN of that CMK. Otherwise, set this to null, and a new CMK will be created. If you set [`is_logs_account`](#is_logs_account) to true on one of the accounts in [`child_accounts`](#child_accounts), the KMS CMK will be created in that account (this is the recommended approach!).

<a name="cloudtrail_kms_key_arn_is_alias" className="snap-top"></a>

* [**`cloudtrail_kms_key_arn_is_alias`**](#cloudtrail_kms_key_arn_is_alias) &mdash; If the [`kms_key_arn`](#kms_key_arn) provided is an alias or alias ARN, then this must be set to true so that the module will exchange the alias for a CMK ARN. Setting this to true and using aliases requires [`cloudtrail_allow_kms_describe_key_to_external_aws_accounts`](#cloudtrail_allow_kms_describe_key_to_external_aws_accounts) to also be true for multi-account scenarios.

<a name="cloudtrail_kms_key_user_iam_arns" className="snap-top"></a>

* [**`cloudtrail_kms_key_user_iam_arns`**](#cloudtrail_kms_key_user_iam_arns) &mdash; All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key) that governs access to write API calls older than 7 days and all read API calls. The IAM Users specified in this list will have read-only access to this extended log data.

<a name="cloudtrail_num_days_after_which_archive_log_data" className="snap-top"></a>

* [**`cloudtrail_num_days_after_which_archive_log_data`**](#cloudtrail_num_days_after_which_archive_log_data) &mdash; After this number of days, log files should be transitioned from S3 to Glacier. Enter 0 to never archive log data.

<a name="cloudtrail_num_days_after_which_delete_log_data" className="snap-top"></a>

* [**`cloudtrail_num_days_after_which_delete_log_data`**](#cloudtrail_num_days_after_which_delete_log_data) &mdash; After this number of days, log files should be deleted from S3. Enter 0 to never delete log data.

<a name="cloudtrail_num_days_to_retain_cloudwatch_logs" className="snap-top"></a>

* [**`cloudtrail_num_days_to_retain_cloudwatch_logs`**](#cloudtrail_num_days_to_retain_cloudwatch_logs) &mdash; After this number of days, logs stored in CloudWatch will be deleted. Possible values are: 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1827, 3653, and 0 (default). When set to 0, logs will be retained indefinitely.

<a name="cloudtrail_organization_id" className="snap-top"></a>

* [**`cloudtrail_organization_id`**](#cloudtrail_organization_id) &mdash; The ID of the organization. Required only if an organization wide CloudTrail is being setup and [``create_organization`](#`create_organization)` is set to false. The organization ID is required to ensure that the entire organization is whitelisted in the CloudTrail bucket write policy.

<a name="cloudtrail_s3_bucket_name" className="snap-top"></a>

* [**`cloudtrail_s3_bucket_name`**](#cloudtrail_s3_bucket_name) &mdash; The name of the S3 Bucket where CloudTrail logs will be stored. This could be a bucket in this AWS account or the name of a bucket in another AWS account where CloudTrail logs should be sent. If you set [`is_logs_account`](#is_logs_account) on one of the accounts in [`child_accounts`](#child_accounts), the S3 bucket will be created in that account (this is the recommended approach!).

<a name="cloudtrail_s3_mfa_delete" className="snap-top"></a>

* [**`cloudtrail_s3_mfa_delete`**](#cloudtrail_s3_mfa_delete) &mdash; Enable MFA delete for either 'Change the versioning state of your bucket' or 'Permanently delete an object version'. This setting only applies to the bucket used to storage Cloudtrail data. This cannot be used to toggle this setting but is available to allow managed buckets to reflect the state in AWS.  For instructions on how to enable MFA Delete, check out the README from the terraform-aws-security/private-s3-bucket module.

<a name="cloudtrail_should_create_s3_bucket" className="snap-top"></a>

* [**`cloudtrail_should_create_s3_bucket`**](#cloudtrail_should_create_s3_bucket) &mdash; If true, create an S3 bucket of name [`cloudtrail_s3_bucket_name`](#cloudtrail_s3_bucket_name) for CloudTrail logs, either in the logs account—the account in [`child_accounts`](#child_accounts) that has [`is_logs_account`](#is_logs_account) set to true (this is the recommended approach!)—or in this account if none of the child accounts are marked as a logs account. If false, assume [`cloudtrail_s3_bucket_name`](#cloudtrail_s3_bucket_name) is an S3 bucket that already exists. We recommend setting this to true and setting [`is_logs_account`](#is_logs_account) to true on one of the accounts in [`child_accounts`](#child_accounts) to use that account as a logs account where you aggregate all your CloudTrail data. In case you want to disable the CloudTrail module and the S3 bucket, you need to set both [`enable_cloudtrail`](#enable_cloudtrail) and [`cloudtrail_should_create_s3_bucket`](#cloudtrail_should_create_s3_bucket) to false.

<a name="cloudtrail_tags" className="snap-top"></a>

* [**`cloudtrail_tags`**](#cloudtrail_tags) &mdash; Tags to apply to the CloudTrail resources.

<a name="config_aggregate_config_data_in_external_account" className="snap-top"></a>

* [**`config_aggregate_config_data_in_external_account`**](#config_aggregate_config_data_in_external_account) &mdash; Set to true to send the AWS Config data to another account (e.g., a logs account) for aggregation purposes. You must set the ID of that other account via the [`config_central_account_id`](#config_central_account_id) variable. Note that if one of the accounts in [`child_accounts`](#child_accounts) has [`is_logs_account`](#is_logs_account) set to true (this is the approach we recommended!), this variable will be assumed to be true, so you don't have to pass any value for it.  This redundant variable has to exist because Terraform does not allow computed data in count and [`for_each`](#for_each) parameters and [`config_central_account_id`](#config_central_account_id) may be computed if its the ID of a newly-created AWS account.

<a name="config_central_account_id" className="snap-top"></a>

* [**`config_central_account_id`**](#config_central_account_id) &mdash; If the S3 bucket and SNS topics used for AWS Config live in a different AWS account, set this variable to the ID of that account. If the S3 bucket and SNS topics live in this account, set this variable to an empty string. Note that if one of the accounts in [`child_accounts`](#child_accounts) has [`is_logs_account`](#is_logs_account) set to true (this is the approach we recommended!), that account's ID will be used automatically, and you can leave this variable null.

<a name="config_create_account_rules" className="snap-top"></a>

* [**`config_create_account_rules`**](#config_create_account_rules) &mdash; Set to true to create account-level AWS Config rules directly in this account. Set false to create org-level rules that apply to this account and all child accounts. We recommend setting this to true to use account-level rules because org-level rules create a chicken-and-egg problem with creating new accounts (see this module's README for details).

<a name="config_delivery_channel_kms_key_arn" className="snap-top"></a>

* [**`config_delivery_channel_kms_key_arn`**](#config_delivery_channel_kms_key_arn) &mdash; Optional KMS key to use for encrypting S3 objects on the AWS Config delivery channel for an externally managed S3 bucket. This must belong to the same region as the destination S3 bucket. If null, AWS Config will default to encrypting the delivered data with AES-256 encryption. Only used if [`should_create_s3_bucket`](#should_create_s3_bucket) is false - otherwise, [`config_s3_bucket_kms_key_arn`](#config_s3_bucket_kms_key_arn) is used.

<a name="config_force_destroy" className="snap-top"></a>

* [**`config_force_destroy`**](#config_force_destroy) &mdash; If set to true, when you run 'terraform destroy', delete all objects from the bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!

<a name="config_num_days_after_which_archive_log_data" className="snap-top"></a>

* [**`config_num_days_after_which_archive_log_data`**](#config_num_days_after_which_archive_log_data) &mdash; After this number of days, log files should be transitioned from S3 to Glacier. Enter 0 to never archive log data.

<a name="config_num_days_after_which_delete_log_data" className="snap-top"></a>

* [**`config_num_days_after_which_delete_log_data`**](#config_num_days_after_which_delete_log_data) &mdash; After this number of days, log files should be deleted from S3. Enter 0 to never delete log data.

<a name="config_opt_in_regions" className="snap-top"></a>

* [**`config_opt_in_regions`**](#config_opt_in_regions) &mdash; Creates resources in the specified regions. The best practice is to enable AWS Config in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions.

<a name="config_s3_bucket_kms_key_arn" className="snap-top"></a>

* [**`config_s3_bucket_kms_key_arn`**](#config_s3_bucket_kms_key_arn) &mdash; Optional KMS key (in logs account) to use for encrypting S3 objects on the AWS Config bucket, when the S3 bucket is created within this module [`(var.config_should_create_s3_bucket`](#(var.config_should_create_s3_bucket) is true). For encrypting S3 objects on delivery for an externally managed S3 bucket, refer to the [`config_delivery_channel_kms_key_arn`](#config_delivery_channel_kms_key_arn) input variable. If null, data in S3 will be encrypted using the default aws/s3 key. If provided, the key policy of the provided key must permit the IAM role used by AWS Config. See https://docs.aws.amazon.com/sns/latest/dg/sns-key-management.html. Note that the KMS key must reside in the global recorder region (as configured by [`aws_region`](#aws_region)).

<a name="config_s3_bucket_name" className="snap-top"></a>

* [**`config_s3_bucket_name`**](#config_s3_bucket_name) &mdash; The name of the S3 Bucket where Config items will be stored. This could be a bucket in this AWS account or the name of a bucket in another AWS account where Config items should be sent. If you set [`is_logs_account`](#is_logs_account) to true on one of the accounts in [`child_accounts`](#child_accounts), the S3 bucket will be created in that account (this is the recommended approach!).

<a name="config_s3_mfa_delete" className="snap-top"></a>

* [**`config_s3_mfa_delete`**](#config_s3_mfa_delete) &mdash; Enable MFA delete for either 'Change the versioning state of your bucket' or 'Permanently delete an object version'. This setting only applies to the bucket used to storage AWS Config data. This cannot be used to toggle this setting but is available to allow managed buckets to reflect the state in AWS. For instructions on how to enable MFA Delete, check out the README from the terraform-aws-security/private-s3-bucket module.

<a name="config_should_create_s3_bucket" className="snap-top"></a>

* [**`config_should_create_s3_bucket`**](#config_should_create_s3_bucket) &mdash; If true, create an S3 bucket of name [`config_s3_bucket_name`](#config_s3_bucket_name) for AWS Config data, either in the logs account—the account in [`child_accounts`](#child_accounts) that has [`is_logs_account`](#is_logs_account) set to true (this is the recommended approach!)—or in this account if none of the child accounts are marked as a logs account. If false, assume [`config_s3_bucket_name`](#config_s3_bucket_name) is an S3 bucket that already exists. We recommend setting this to true and setting [`is_logs_account`](#is_logs_account) to true on one of the accounts in [`child_accounts`](#child_accounts) to use that account as a logs account where you aggregate all your AWS Config data. In case you want to disable the AWS Config module and the S3 bucket, you need to set both [`enable_config`](#enable_config) and [`config_should_create_s3_bucket`](#config_should_create_s3_bucket) to false.

<a name="config_should_create_sns_topic" className="snap-top"></a>

* [**`config_should_create_sns_topic`**](#config_should_create_sns_topic) &mdash; Set to true to create an SNS topic in this account for sending AWS Config notifications. Set to false to assume the topic specified in [`config_sns_topic_name`](#config_sns_topic_name) already exists in another AWS account (e.g the logs account).

<a name="config_sns_topic_kms_key_region_map" className="snap-top"></a>

* [**`config_sns_topic_kms_key_region_map`**](#config_sns_topic_kms_key_region_map) &mdash; Optional KMS key to use for each region for configuring default encryption for the SNS topic (encoded as a map from region - e.g. us-east-1 - to ARN of KMS key). If null or the region key is missing, encryption will not be configured for the SNS topic in that region.

<a name="config_sns_topic_name" className="snap-top"></a>

* [**`config_sns_topic_name`**](#config_sns_topic_name) &mdash; The name of the SNS Topic in where AWS Config notifications will be sent. Can be in the same account or in another account.

<a name="config_tags" className="snap-top"></a>

* [**`config_tags`**](#config_tags) &mdash; A map of tags to apply to the S3 Bucket. The key is the tag name and the value is the tag value.

<a name="configrules_excluded_accounts" className="snap-top"></a>

* [**`configrules_excluded_accounts`**](#configrules_excluded_accounts) &mdash; List of AWS account identifiers to exclude from org-level Config rules. Only used if [`config_create_account_rules`](#config_create_account_rules) is false (not recommended).

<a name="configrules_maximum_execution_frequency" className="snap-top"></a>

* [**`configrules_maximum_execution_frequency`**](#configrules_maximum_execution_frequency) &mdash; The maximum frequency with which AWS Config runs evaluations for the ´PERIODIC´ rules. See [`https://www.terraform.io/docs/providers/aws/r/config_organization_managed_rule.html#maximum_execution_frequency`](#https://www.terraform.io/docs/providers/aws/r/config_organization_managed_rule.html#maximum_execution_frequency)

<a name="create_organization" className="snap-top"></a>

* [**`create_organization`**](#create_organization) &mdash; Set to true to create/configure AWS Organizations for the first time in this account. If you already configured AWS Organizations in your account, set this to false; alternatively, you could set it to true and run 'terraform import' to import you existing Organization.

<a name="cross_account_access_all_group_name" className="snap-top"></a>

* [**`cross_account_access_all_group_name`**](#cross_account_access_all_group_name) &mdash; The name of the IAM group that will grant access to all external AWS accounts in [`iam_groups_for_cross_account_access`](#iam_groups_for_cross_account_access).

<a name="dev_permitted_services" className="snap-top"></a>

* [**`dev_permitted_services`**](#dev_permitted_services) &mdash; A list of AWS services for which the developers from the accounts in [`allow_dev_access_from_other_account_arns`](#allow_dev_access_from_other_account_arns) will receive full permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to grant developers access only to EC2 and Amazon Machine Learning, use the value ["ec2","machinelearning"]. Do NOT add iam to the list of services, or that will grant Developers de facto admin access.

<a name="ebs_enable_encryption" className="snap-top"></a>

* [**`ebs_enable_encryption`**](#ebs_enable_encryption) &mdash; If set to true (default), all new EBS volumes will have encryption enabled by default

<a name="ebs_kms_key_arns" className="snap-top"></a>

* [**`ebs_kms_key_arns`**](#ebs_kms_key_arns) &mdash; Optional map of region names to KMS keys to use for EBS volume encryption when [`ebs_use_existing_kms_keys`](#ebs_use_existing_kms_keys) is enabled.

<a name="ebs_opt_in_regions" className="snap-top"></a>

* [**`ebs_opt_in_regions`**](#ebs_opt_in_regions) &mdash; Creates resources in the specified regions. The best practice is to enable EBS Encryption in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions. The value provided for [`global_recorder_region`](#global_recorder_region) must be in this list.

<a name="ebs_use_existing_kms_keys" className="snap-top"></a>

* [**`ebs_use_existing_kms_keys`**](#ebs_use_existing_kms_keys) &mdash; If set to true, the KMS Customer Managed Keys (CMK) specified in [`ebs_kms_key_arns`](#ebs_kms_key_arns) will be set as the default for EBS encryption. When false (default), the AWS-managed aws/ebs key will be used.

<a name="enable_cloudtrail" className="snap-top"></a>

* [**`enable_cloudtrail`**](#enable_cloudtrail) &mdash; Set to true to enable CloudTrail in the root account. Set to false to disable CloudTrail (note: all other CloudTrail variables will be ignored). In case you want to disable the CloudTrail module and the S3 bucket, you need to set both [`enable_cloudtrail`](#enable_cloudtrail) and [`cloudtrail_should_create_s3_bucket`](#cloudtrail_should_create_s3_bucket) to false.

<a name="enable_cloudtrail_s3_server_access_logging" className="snap-top"></a>

* [**`enable_cloudtrail_s3_server_access_logging`**](#enable_cloudtrail_s3_server_access_logging) &mdash; Enables S3 server access logging which sends detailed records for the requests that are made to the bucket. Defaults to false.

<a name="enable_config" className="snap-top"></a>

* [**`enable_config`**](#enable_config) &mdash; Set to true to enable AWS Config in the root account. Set to false to disable AWS Config (note: all other AWS config variables will be ignored). In case you want to disable the CloudTrail module and the S3 bucket, you need to set both [`enable_cloudtrail`](#enable_cloudtrail) and [`cloudtrail_should_create_s3_bucket`](#cloudtrail_should_create_s3_bucket) to false.

<a name="enable_encrypted_volumes" className="snap-top"></a>

* [**`enable_encrypted_volumes`**](#enable_encrypted_volumes) &mdash; Checks whether the EBS volumes that are in an attached state are encrypted.

<a name="enable_iam_access_analyzer" className="snap-top"></a>

* [**`enable_iam_access_analyzer`**](#enable_iam_access_analyzer) &mdash; A feature flag to enable or disable this module.

<a name="enable_iam_cross_account_roles" className="snap-top"></a>

* [**`enable_iam_cross_account_roles`**](#enable_iam_cross_account_roles) &mdash; A feature flag to enable or disable this module.

<a name="enable_iam_groups" className="snap-top"></a>

* [**`enable_iam_groups`**](#enable_iam_groups) &mdash; A feature flag to enable or disable this module.

<a name="enable_iam_password_policy" className="snap-top"></a>

* [**`enable_iam_password_policy`**](#enable_iam_password_policy) &mdash; Checks whether the account password policy for IAM users meets the specified requirements.

<a name="enable_insecure_sg_rules" className="snap-top"></a>

* [**`enable_insecure_sg_rules`**](#enable_insecure_sg_rules) &mdash; Checks whether the security group with 0.0.0.0/0 of any Amazon Virtual Private Cloud (Amazon VPC) allows only specific inbound TCP or UDP traffic.

<a name="enable_rds_storage_encrypted" className="snap-top"></a>

* [**`enable_rds_storage_encrypted`**](#enable_rds_storage_encrypted) &mdash; Checks whether storage encryption is enabled for your RDS DB instances.

<a name="enable_root_account_mfa" className="snap-top"></a>

* [**`enable_root_account_mfa`**](#enable_root_account_mfa) &mdash; Checks whether users of your AWS account require a multi-factor authentication (MFA) device to sign in with root credentials.

<a name="enable_s3_bucket_public_read_prohibited" className="snap-top"></a>

* [**`enable_s3_bucket_public_read_prohibited`**](#enable_s3_bucket_public_read_prohibited) &mdash; Checks that your Amazon S3 buckets do not allow public read access.

<a name="enable_s3_bucket_public_write_prohibited" className="snap-top"></a>

* [**`enable_s3_bucket_public_write_prohibited`**](#enable_s3_bucket_public_write_prohibited) &mdash; Checks that your Amazon S3 buckets do not allow public write access.

<a name="encrypted_volumes_kms_id" className="snap-top"></a>

* [**`encrypted_volumes_kms_id`**](#encrypted_volumes_kms_id) &mdash; ID or ARN of the KMS key that is used to encrypt the volume. Used for configuring the encrypted volumes config rule.

<a name="force_destroy_users" className="snap-top"></a>

* [**`force_destroy_users`**](#force_destroy_users) &mdash; When destroying this user, destroy even if it has non-Terraform-managed IAM access keys, login profile, or MFA devices. Without [`force_destroy`](#force_destroy) a user with non-Terraform-managed access keys and login profile will fail to be destroyed.

<a name="guardduty_cloudwatch_event_rule_name" className="snap-top"></a>

* [**`guardduty_cloudwatch_event_rule_name`**](#guardduty_cloudwatch_event_rule_name) &mdash; Name of the Cloudwatch event rules.

<a name="guardduty_finding_publishing_frequency" className="snap-top"></a>

* [**`guardduty_finding_publishing_frequency`**](#guardduty_finding_publishing_frequency) &mdash; Specifies the frequency of notifications sent for subsequent finding occurrences. If the detector is a GuardDuty member account, the value is determined by the GuardDuty master account and cannot be modified, otherwise defaults to [`SIX_HOURS`](#SIX_HOURS). For standalone and GuardDuty master accounts, it must be configured in Terraform to enable drift detection. Valid values for standalone and master accounts: [`FIFTEEN_MINUTES`](#FIFTEEN_MINUTES), [`ONE_HOUR`](#ONE_HOUR), [`SIX_HOURS`](#SIX_HOURS).

<a name="guardduty_findings_sns_topic_name" className="snap-top"></a>

* [**`guardduty_findings_sns_topic_name`**](#guardduty_findings_sns_topic_name) &mdash; Specifies a name for the created SNS topics where findings are published. [`publish_findings_to_sns`](#publish_findings_to_sns) must be set to true.

<a name="guardduty_opt_in_regions" className="snap-top"></a>

* [**`guardduty_opt_in_regions`**](#guardduty_opt_in_regions) &mdash; Creates resources in the specified regions. The best practice is to enable GuardDuty in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions. The value provided for [`global_recorder_region`](#global_recorder_region) must be in this list.

<a name="guardduty_publish_findings_to_sns" className="snap-top"></a>

* [**`guardduty_publish_findings_to_sns`**](#guardduty_publish_findings_to_sns) &mdash; Send GuardDuty findings to SNS topics specified by [`findings_sns_topic_name`](#findings_sns_topic_name).

<a name="iam_access_analyzer_name" className="snap-top"></a>

* [**`iam_access_analyzer_name`**](#iam_access_analyzer_name) &mdash; The name of the IAM Access Analyzer module

<a name="iam_access_analyzer_opt_in_regions" className="snap-top"></a>

* [**`iam_access_analyzer_opt_in_regions`**](#iam_access_analyzer_opt_in_regions) &mdash; Creates resources in the specified regions. The best practice is to enable IAM Access Analyzer in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions. The value provided for [`global_recorder_region`](#global_recorder_region) must be in this list.

<a name="iam_access_analyzer_type" className="snap-top"></a>

* [**`iam_access_analyzer_type`**](#iam_access_analyzer_type) &mdash; If set to ORGANIZATION, the analyzer will be scanning the current organization and any policies that refer to linked resources such as S3, IAM, Lambda and SQS policies.

<a name="iam_group_developers_permitted_services" className="snap-top"></a>

* [**`iam_group_developers_permitted_services`**](#iam_group_developers_permitted_services) &mdash; A list of AWS services for which the developers IAM Group will receive full permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to grant developers access only to EC2 and Amazon Machine Learning, use the value ["ec2","machinelearning"]. Do NOT add iam to the list of services, or that will grant Developers de facto admin access. If you need to grant iam privileges, just grant the user Full Access.

<a name="iam_group_names_ssh_grunt_sudo_users" className="snap-top"></a>

* [**`iam_group_names_ssh_grunt_sudo_users`**](#iam_group_names_ssh_grunt_sudo_users) &mdash; The list of names to be used for the IAM Group that enables its members to SSH as a sudo user into any server configured with the ssh-grunt Gruntwork module. Pass in multiple to configure multiple different IAM groups to control different groupings of access at the server level. Pass in empty list to disable creation of the IAM groups.

<a name="iam_group_names_ssh_grunt_users" className="snap-top"></a>

* [**`iam_group_names_ssh_grunt_users`**](#iam_group_names_ssh_grunt_users) &mdash; The name to be used for the IAM Group that enables its members to SSH as a non-sudo user into any server configured with the ssh-grunt Gruntwork module. Pass in multiple to configure multiple different IAM groups to control different groupings of access at the server level. Pass in empty list to disable creation of the IAM groups.

<a name="iam_groups_for_cross_account_access" className="snap-top"></a>

* [**`iam_groups_for_cross_account_access`**](#iam_groups_for_cross_account_access) &mdash; This variable is used to create groups that allow IAM users to assume roles in your other AWS accounts. It should be a list of objects, where each object has the fields [`'group_name`](#'group_name)', which will be used as the name of the IAM group, and [`'iam_role_arns`](#'iam_role_arns)', which is a list of ARNs of IAM Roles that you can assume when part of that group. For each entry in the list of objects, we will create an IAM group that allows users to assume the given IAM role(s) in the other AWS account. This allows you to define all your IAM users in one account (e.g. the users account) and to grant them access to certain IAM roles in other accounts (e.g. the stage, prod, audit accounts).

<a name="iam_password_policy_allow_users_to_change_password" className="snap-top"></a>

* [**`iam_password_policy_allow_users_to_change_password`**](#iam_password_policy_allow_users_to_change_password) &mdash; Allow users to change their own password.

<a name="iam_password_policy_hard_expiry" className="snap-top"></a>

* [**`iam_password_policy_hard_expiry`**](#iam_password_policy_hard_expiry) &mdash; Password expiration requires administrator reset.

<a name="iam_password_policy_max_password_age" className="snap-top"></a>

* [**`iam_password_policy_max_password_age`**](#iam_password_policy_max_password_age) &mdash; Number of days before password expiration.

<a name="iam_password_policy_minimum_password_length" className="snap-top"></a>

* [**`iam_password_policy_minimum_password_length`**](#iam_password_policy_minimum_password_length) &mdash; Password minimum length.

<a name="iam_password_policy_password_reuse_prevention" className="snap-top"></a>

* [**`iam_password_policy_password_reuse_prevention`**](#iam_password_policy_password_reuse_prevention) &mdash; Number of passwords before allowing reuse.

<a name="iam_password_policy_require_lowercase_characters" className="snap-top"></a>

* [**`iam_password_policy_require_lowercase_characters`**](#iam_password_policy_require_lowercase_characters) &mdash; Require at least one lowercase character in password.

<a name="iam_password_policy_require_numbers" className="snap-top"></a>

* [**`iam_password_policy_require_numbers`**](#iam_password_policy_require_numbers) &mdash; Require at least one number in password.

<a name="iam_password_policy_require_symbols" className="snap-top"></a>

* [**`iam_password_policy_require_symbols`**](#iam_password_policy_require_symbols) &mdash; Require at least one symbol in password.

<a name="iam_password_policy_require_uppercase_characters" className="snap-top"></a>

* [**`iam_password_policy_require_uppercase_characters`**](#iam_password_policy_require_uppercase_characters) &mdash; Require at least one uppercase character in password.

<a name="iam_role_tags" className="snap-top"></a>

* [**`iam_role_tags`**](#iam_role_tags) &mdash; The tags to apply to all the IAM role resources.

<a name="insecure_sg_rules_authorized_tcp_ports" className="snap-top"></a>

* [**`insecure_sg_rules_authorized_tcp_ports`**](#insecure_sg_rules_authorized_tcp_ports) &mdash; Comma-separated list of TCP ports authorized to be open to 0.0.0.0/0. Ranges are defined by a dash; for example, '443,1020-1025'.

<a name="insecure_sg_rules_authorized_udp_ports" className="snap-top"></a>

* [**`insecure_sg_rules_authorized_udp_ports`**](#insecure_sg_rules_authorized_udp_ports) &mdash; Comma-separated list of UDP ports authorized to be open to 0.0.0.0/0. Ranges are defined by a dash; for example, '500,1020-1025'.

<a name="is_multi_region_trail" className="snap-top"></a>

* [**`is_multi_region_trail`**](#is_multi_region_trail) &mdash; Specifies whether CloudTrail will log only API calls in the current region or in all regions. (true or false)

<a name="name_prefix" className="snap-top"></a>

* [**`name_prefix`**](#name_prefix) &mdash; The name used to prefix AWS Config and Cloudtrail resources, including the S3 bucket names and SNS topics used for each.

<a name="organizations_aws_service_access_principals" className="snap-top"></a>

* [**`organizations_aws_service_access_principals`**](#organizations_aws_service_access_principals) &mdash; List of AWS service principal names for which you want to enable integration with your organization. Must have [``organizations_feature_set`](#`organizations_feature_set)` set to ALL. See [`https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services`](#https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services).html

<a name="organizations_default_iam_user_access_to_billing" className="snap-top"></a>

* [**`organizations_default_iam_user_access_to_billing`**](#organizations_default_iam_user_access_to_billing) &mdash; If set to ALLOW, the new account enables IAM users to access account billing information if they have the required permissions. If set to DENY, then only the root user of the new account can access account billing information.

<a name="organizations_default_role_name" className="snap-top"></a>

* [**`organizations_default_role_name`**](#organizations_default_role_name) &mdash; The name of an IAM role that Organizations automatically preconfigures in the new member account. This role trusts the master account, allowing users in the master account to assume the role, as permitted by the master account administrator.

<a name="organizations_default_tags" className="snap-top"></a>

* [**`organizations_default_tags`**](#organizations_default_tags) &mdash; Default tags to add to accounts. Will be appended to [`´child_account`](#´child_account).*.tags´

<a name="organizations_enabled_policy_types" className="snap-top"></a>

* [**`organizations_enabled_policy_types`**](#organizations_enabled_policy_types) &mdash; List of Organizations policy types to enable in the Organization Root. See [`https://docs.aws.amazon.com/organizations/latest/APIReference/API_EnablePolicyType`](#https://docs.aws.amazon.com/organizations/latest/APIReference/API_EnablePolicyType).html

<a name="organizations_feature_set" className="snap-top"></a>

* [**`organizations_feature_set`**](#organizations_feature_set) &mdash; Specify `ALL` or [``CONSOLIDATED_BILLING`](#`CONSOLIDATED_BILLING)`.

<a name="password_reset_required" className="snap-top"></a>

* [**`password_reset_required`**](#password_reset_required) &mdash; Force the user to reset their password on initial login. Only used for users with [`create_login_profile`](#create_login_profile) set to true.

<a name="rds_storage_encrypted_kms_id" className="snap-top"></a>

* [**`rds_storage_encrypted_kms_id`**](#rds_storage_encrypted_kms_id) &mdash; KMS key ID or ARN used to encrypt the storage. Used for configuring the RDS storage encryption config rule.

<a name="should_create_iam_group_auto_deploy" className="snap-top"></a>

* [**`should_create_iam_group_auto_deploy`**](#should_create_iam_group_auto_deploy) &mdash; Should we create the IAM Group for auto-deploy? Allows automated deployment by granting the permissions specified in [`auto_deploy_permissions`](#auto_deploy_permissions). (true or false)

<a name="should_create_iam_group_billing" className="snap-top"></a>

* [**`should_create_iam_group_billing`**](#should_create_iam_group_billing) &mdash; Should we create the IAM Group for billing? Allows read-write access to billing features only. (true or false)

<a name="should_create_iam_group_developers" className="snap-top"></a>

* [**`should_create_iam_group_developers`**](#should_create_iam_group_developers) &mdash; Should we create the IAM Group for developers? The permissions of that group are specified via [`iam_group_developers_permitted_services`](#iam_group_developers_permitted_services). (true or false)

<a name="should_create_iam_group_full_access" className="snap-top"></a>

* [**`should_create_iam_group_full_access`**](#should_create_iam_group_full_access) &mdash; Should we create the IAM Group for full access? Allows full access to all AWS resources. (true or false)

<a name="should_create_iam_group_houston_cli_users" className="snap-top"></a>

* [**`should_create_iam_group_houston_cli_users`**](#should_create_iam_group_houston_cli_users) &mdash; Should we create the IAM Group for houston CLI users? Allows users to use the houston CLI for managing and deploying services.

<a name="should_create_iam_group_logs" className="snap-top"></a>

* [**`should_create_iam_group_logs`**](#should_create_iam_group_logs) &mdash; Should we create the IAM Group for logs? Allows read access to logs in CloudTrail, AWS Config, and CloudWatch. If [`cloudtrail_kms_key_arn`](#cloudtrail_kms_key_arn) is specified, will also be given permissions to decrypt with the KMS CMK that is used to encrypt CloudTrail logs. (true or false)

<a name="should_create_iam_group_read_only" className="snap-top"></a>

* [**`should_create_iam_group_read_only`**](#should_create_iam_group_read_only) &mdash; Should we create the IAM Group for read-only? Allows read-only access to all AWS resources. (true or false)

<a name="should_create_iam_group_support" className="snap-top"></a>

* [**`should_create_iam_group_support`**](#should_create_iam_group_support) &mdash; Should we create the IAM Group for support? Allows access to AWS support. (true or false)

<a name="should_create_iam_group_use_existing_iam_roles" className="snap-top"></a>

* [**`should_create_iam_group_use_existing_iam_roles`**](#should_create_iam_group_use_existing_iam_roles) &mdash; Should we create the IAM Group for use-existing-iam-roles? Allow launching AWS resources with existing IAM Roles, but no ability to create new IAM Roles. (true or false)

<a name="should_create_iam_group_user_self_mgmt" className="snap-top"></a>

* [**`should_create_iam_group_user_self_mgmt`**](#should_create_iam_group_user_self_mgmt) &mdash; Should we create the IAM Group for user self-management? Allows users to manage their own IAM user accounts, but not other IAM users. (true or false)

<a name="should_require_mfa" className="snap-top"></a>

* [**`should_require_mfa`**](#should_require_mfa) &mdash; Should we require that all IAM Users use Multi-Factor Authentication for both AWS API calls and the AWS Web Console? (true or false)

<a name="users" className="snap-top"></a>

* [**`users`**](#users) &mdash; A map of users to create. The keys are the user names and the values are an object with the optional keys 'groups' (a list of IAM groups to add the user to), 'tags' (a map of tags to apply to the user), [`'pgp_key`](#'pgp_key)' (either a base-64 encoded PGP public key, or a keybase username in the form keybase:username, used to encrypt the user's credentials; required if [`create_login_profile`](#create_login_profile) or [`create_access_keys`](#create_access_keys) is true), [`'create_login_profile`](#'create_login_profile)' (if set to true, create a password to login to the AWS Web Console), [`'create_access_keys`](#'create_access_keys)' (if set to true, create access keys for the user), 'path' (the path), and [`'permissions_boundary`](#'permissions_boundary)' (the ARN of the policy that is used to set the permissions boundary for the user).

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="allow_auto_deploy_access_from_other_accounts_iam_role_arn" className="snap-top"></a>

* [**`allow_auto_deploy_access_from_other_accounts_iam_role_arn`**](#allow_auto_deploy_access_from_other_accounts_iam_role_arn) &mdash; 

<a name="allow_auto_deploy_access_from_other_accounts_iam_role_id" className="snap-top"></a>

* [**`allow_auto_deploy_access_from_other_accounts_iam_role_id`**](#allow_auto_deploy_access_from_other_accounts_iam_role_id) &mdash; 

<a name="allow_billing_access_from_other_accounts_iam_role_arn" className="snap-top"></a>

* [**`allow_billing_access_from_other_accounts_iam_role_arn`**](#allow_billing_access_from_other_accounts_iam_role_arn) &mdash; 

<a name="allow_billing_access_from_other_accounts_iam_role_id" className="snap-top"></a>

* [**`allow_billing_access_from_other_accounts_iam_role_id`**](#allow_billing_access_from_other_accounts_iam_role_id) &mdash; 

<a name="allow_billing_access_sign_in_url" className="snap-top"></a>

* [**`allow_billing_access_sign_in_url`**](#allow_billing_access_sign_in_url) &mdash; 

<a name="allow_dev_access_from_other_accounts_iam_role_arn" className="snap-top"></a>

* [**`allow_dev_access_from_other_accounts_iam_role_arn`**](#allow_dev_access_from_other_accounts_iam_role_arn) &mdash; 

<a name="allow_dev_access_from_other_accounts_iam_role_id" className="snap-top"></a>

* [**`allow_dev_access_from_other_accounts_iam_role_id`**](#allow_dev_access_from_other_accounts_iam_role_id) &mdash; 

<a name="allow_dev_access_sign_in_url" className="snap-top"></a>

* [**`allow_dev_access_sign_in_url`**](#allow_dev_access_sign_in_url) &mdash; 

<a name="allow_full_access_from_other_accounts_iam_role_arn" className="snap-top"></a>

* [**`allow_full_access_from_other_accounts_iam_role_arn`**](#allow_full_access_from_other_accounts_iam_role_arn) &mdash; 

<a name="allow_full_access_from_other_accounts_iam_role_id" className="snap-top"></a>

* [**`allow_full_access_from_other_accounts_iam_role_id`**](#allow_full_access_from_other_accounts_iam_role_id) &mdash; 

<a name="allow_full_access_sign_in_url" className="snap-top"></a>

* [**`allow_full_access_sign_in_url`**](#allow_full_access_sign_in_url) &mdash; 

<a name="allow_houston_cli_access_from_other_accounts_iam_role_arn" className="snap-top"></a>

* [**`allow_houston_cli_access_from_other_accounts_iam_role_arn`**](#allow_houston_cli_access_from_other_accounts_iam_role_arn) &mdash; 

<a name="allow_houston_cli_access_from_other_accounts_iam_role_id" className="snap-top"></a>

* [**`allow_houston_cli_access_from_other_accounts_iam_role_id`**](#allow_houston_cli_access_from_other_accounts_iam_role_id) &mdash; 

<a name="allow_iam_admin_access_from_other_accounts_iam_role_arn" className="snap-top"></a>

* [**`allow_iam_admin_access_from_other_accounts_iam_role_arn`**](#allow_iam_admin_access_from_other_accounts_iam_role_arn) &mdash; 

<a name="allow_iam_admin_access_from_other_accounts_iam_role_id" className="snap-top"></a>

* [**`allow_iam_admin_access_from_other_accounts_iam_role_id`**](#allow_iam_admin_access_from_other_accounts_iam_role_id) &mdash; 

<a name="allow_iam_admin_access_sign_in_url" className="snap-top"></a>

* [**`allow_iam_admin_access_sign_in_url`**](#allow_iam_admin_access_sign_in_url) &mdash; 

<a name="allow_logs_access_from_other_accounts_iam_role_arn" className="snap-top"></a>

* [**`allow_logs_access_from_other_accounts_iam_role_arn`**](#allow_logs_access_from_other_accounts_iam_role_arn) &mdash; 

<a name="allow_logs_access_from_other_accounts_iam_role_id" className="snap-top"></a>

* [**`allow_logs_access_from_other_accounts_iam_role_id`**](#allow_logs_access_from_other_accounts_iam_role_id) &mdash; 

<a name="allow_logs_access_sign_in_url" className="snap-top"></a>

* [**`allow_logs_access_sign_in_url`**](#allow_logs_access_sign_in_url) &mdash; 

<a name="allow_read_only_access_from_other_accounts_iam_role_arn" className="snap-top"></a>

* [**`allow_read_only_access_from_other_accounts_iam_role_arn`**](#allow_read_only_access_from_other_accounts_iam_role_arn) &mdash; 

<a name="allow_read_only_access_from_other_accounts_iam_role_id" className="snap-top"></a>

* [**`allow_read_only_access_from_other_accounts_iam_role_id`**](#allow_read_only_access_from_other_accounts_iam_role_id) &mdash; 

<a name="allow_read_only_access_sign_in_url" className="snap-top"></a>

* [**`allow_read_only_access_sign_in_url`**](#allow_read_only_access_sign_in_url) &mdash; 

<a name="allow_ssh_grunt_access_from_other_accounts_iam_role_arn" className="snap-top"></a>

* [**`allow_ssh_grunt_access_from_other_accounts_iam_role_arn`**](#allow_ssh_grunt_access_from_other_accounts_iam_role_arn) &mdash; 

<a name="allow_ssh_grunt_access_from_other_accounts_iam_role_id" className="snap-top"></a>

* [**`allow_ssh_grunt_access_from_other_accounts_iam_role_id`**](#allow_ssh_grunt_access_from_other_accounts_iam_role_id) &mdash; 

<a name="allow_ssh_grunt_access_sign_in_url" className="snap-top"></a>

* [**`allow_ssh_grunt_access_sign_in_url`**](#allow_ssh_grunt_access_sign_in_url) &mdash; 

<a name="allow_ssh_grunt_houston_access_from_other_accounts_iam_role_arn" className="snap-top"></a>

* [**`allow_ssh_grunt_houston_access_from_other_accounts_iam_role_arn`**](#allow_ssh_grunt_houston_access_from_other_accounts_iam_role_arn) &mdash; 

<a name="allow_ssh_grunt_houston_access_from_other_accounts_iam_role_id" className="snap-top"></a>

* [**`allow_ssh_grunt_houston_access_from_other_accounts_iam_role_id`**](#allow_ssh_grunt_houston_access_from_other_accounts_iam_role_id) &mdash; 

<a name="allow_ssh_grunt_houston_access_sign_in_url" className="snap-top"></a>

* [**`allow_ssh_grunt_houston_access_sign_in_url`**](#allow_ssh_grunt_houston_access_sign_in_url) &mdash; 

<a name="allow_support_access_from_other_accounts_iam_role_arn" className="snap-top"></a>

* [**`allow_support_access_from_other_accounts_iam_role_arn`**](#allow_support_access_from_other_accounts_iam_role_arn) &mdash; 

<a name="allow_support_access_from_other_accounts_iam_role_id" className="snap-top"></a>

* [**`allow_support_access_from_other_accounts_iam_role_id`**](#allow_support_access_from_other_accounts_iam_role_id) &mdash; 

<a name="allow_support_access_sign_in_url" className="snap-top"></a>

* [**`allow_support_access_sign_in_url`**](#allow_support_access_sign_in_url) &mdash; 

<a name="aws_ebs_encryption_by_default_enabled" className="snap-top"></a>

* [**`aws_ebs_encryption_by_default_enabled`**](#aws_ebs_encryption_by_default_enabled) &mdash; A map from region to a boolean indicating whether or not EBS encryption is enabled by default for each region.

<a name="aws_ebs_encryption_default_kms_key" className="snap-top"></a>

* [**`aws_ebs_encryption_default_kms_key`**](#aws_ebs_encryption_default_kms_key) &mdash; A map from region to the ARN of the KMS key used for default EBS encryption for each region.

<a name="billing_iam_group_arn" className="snap-top"></a>

* [**`billing_iam_group_arn`**](#billing_iam_group_arn) &mdash; 

<a name="billing_iam_group_name" className="snap-top"></a>

* [**`billing_iam_group_name`**](#billing_iam_group_name) &mdash; 

<a name="child_accounts" className="snap-top"></a>

* [**`child_accounts`**](#child_accounts) &mdash; A map of all accounts created by this module (NOT including the root account). The keys are the names of the accounts and the values are the attributes for the account as defined in the [`aws_organizations_account`](#aws_organizations_account) resource.

<a name="cloudtrail_cloudwatch_group_arn" className="snap-top"></a>

* [**`cloudtrail_cloudwatch_group_arn`**](#cloudtrail_cloudwatch_group_arn) &mdash; The ARN of the cloudwatch log group.

<a name="cloudtrail_cloudwatch_group_name" className="snap-top"></a>

* [**`cloudtrail_cloudwatch_group_name`**](#cloudtrail_cloudwatch_group_name) &mdash; The name of the cloudwatch log group.

<a name="cloudtrail_iam_role_arn" className="snap-top"></a>

* [**`cloudtrail_iam_role_arn`**](#cloudtrail_iam_role_arn) &mdash; The ARN of the IAM role used by the cloudwatch log group.

<a name="cloudtrail_iam_role_name" className="snap-top"></a>

* [**`cloudtrail_iam_role_name`**](#cloudtrail_iam_role_name) &mdash; The name of the IAM role used by the cloudwatch log group.

<a name="cloudtrail_kms_key_alias_name" className="snap-top"></a>

* [**`cloudtrail_kms_key_alias_name`**](#cloudtrail_kms_key_alias_name) &mdash; The alias of the KMS key used by the S3 bucket to encrypt cloudtrail logs.

<a name="cloudtrail_kms_key_arn" className="snap-top"></a>

* [**`cloudtrail_kms_key_arn`**](#cloudtrail_kms_key_arn) &mdash; The ARN of the KMS key used by the S3 bucket to encrypt cloudtrail logs.

<a name="cloudtrail_kms_key_arn_with_dependency" className="snap-top"></a>

* [**`cloudtrail_kms_key_arn_with_dependency`**](#cloudtrail_kms_key_arn_with_dependency) &mdash; The ARN of the KMS key used by the S3 bucket to encrypt cloudtrail logs.

<a name="cloudtrail_s3_access_logging_bucket_arn" className="snap-top"></a>

* [**`cloudtrail_s3_access_logging_bucket_arn`**](#cloudtrail_s3_access_logging_bucket_arn) &mdash; The ARN of the S3 bucket where access logs for the CloudTrail S3 bucket are delivered.

<a name="cloudtrail_s3_access_logging_bucket_name" className="snap-top"></a>

* [**`cloudtrail_s3_access_logging_bucket_name`**](#cloudtrail_s3_access_logging_bucket_name) &mdash; The name of the S3 bucket where access logs for the CloudTrail S3 bucket are delivered.

<a name="cloudtrail_s3_bucket_arn" className="snap-top"></a>

* [**`cloudtrail_s3_bucket_arn`**](#cloudtrail_s3_bucket_arn) &mdash; The ARN of the S3 bucket where cloudtrail logs are delivered.

<a name="cloudtrail_s3_bucket_name" className="snap-top"></a>

* [**`cloudtrail_s3_bucket_name`**](#cloudtrail_s3_bucket_name) &mdash; The name of the S3 bucket where cloudtrail logs are delivered.

<a name="cloudtrail_s3_bucket_name_with_dependency" className="snap-top"></a>

* [**`cloudtrail_s3_bucket_name_with_dependency`**](#cloudtrail_s3_bucket_name_with_dependency) &mdash; The name of the S3 bucket where cloudtrail logs are delivered. Sources from 'data'.

<a name="cloudtrail_trail_arn" className="snap-top"></a>

* [**`cloudtrail_trail_arn`**](#cloudtrail_trail_arn) &mdash; The ARN of the cloudtrail trail.

<a name="config_iam_role_arns" className="snap-top"></a>

* [**`config_iam_role_arns`**](#config_iam_role_arns) &mdash; The ARNs of the IAM role used by the config recorder.

<a name="config_recorder_names" className="snap-top"></a>

* [**`config_recorder_names`**](#config_recorder_names) &mdash; The names of the configuration recorder.

<a name="config_s3_bucket_arn" className="snap-top"></a>

* [**`config_s3_bucket_arn`**](#config_s3_bucket_arn) &mdash; The ARN of the S3 bucket used by AWS Config to store configuration items.

<a name="config_s3_bucket_name" className="snap-top"></a>

* [**`config_s3_bucket_name`**](#config_s3_bucket_name) &mdash; The name of the S3 bucket used by AWS Config to store configuration items.

<a name="config_s3_bucket_name_with_dependency" className="snap-top"></a>

* [**`config_s3_bucket_name_with_dependency`**](#config_s3_bucket_name_with_dependency) &mdash; The name of the S3 bucket used by AWS Config to store configuration items, sources from 'data'.

<a name="config_sns_topic_arns" className="snap-top"></a>

* [**`config_sns_topic_arns`**](#config_sns_topic_arns) &mdash; The ARNs of the SNS Topic used by the config notifications.

<a name="cross_account_access_all_group_arn" className="snap-top"></a>

* [**`cross_account_access_all_group_arn`**](#cross_account_access_all_group_arn) &mdash; 

<a name="cross_account_access_all_group_name" className="snap-top"></a>

* [**`cross_account_access_all_group_name`**](#cross_account_access_all_group_name) &mdash; 

<a name="cross_account_access_group_arns" className="snap-top"></a>

* [**`cross_account_access_group_arns`**](#cross_account_access_group_arns) &mdash; 

<a name="cross_account_access_group_names" className="snap-top"></a>

* [**`cross_account_access_group_names`**](#cross_account_access_group_names) &mdash; 

<a name="developers_iam_group_arn" className="snap-top"></a>

* [**`developers_iam_group_arn`**](#developers_iam_group_arn) &mdash; 

<a name="developers_iam_group_name" className="snap-top"></a>

* [**`developers_iam_group_name`**](#developers_iam_group_name) &mdash; 

<a name="full_access_iam_group_arn" className="snap-top"></a>

* [**`full_access_iam_group_arn`**](#full_access_iam_group_arn) &mdash; 

<a name="full_access_iam_group_name" className="snap-top"></a>

* [**`full_access_iam_group_name`**](#full_access_iam_group_name) &mdash; 

<a name="guardduty_cloudwatch_event_rule_arns" className="snap-top"></a>

* [**`guardduty_cloudwatch_event_rule_arns`**](#guardduty_cloudwatch_event_rule_arns) &mdash; The ARNs of the cloudwatch event rules used to publish findings to sns if [`publish_findings_to_sns`](#publish_findings_to_sns) is set to true.

<a name="guardduty_cloudwatch_event_target_arns" className="snap-top"></a>

* [**`guardduty_cloudwatch_event_target_arns`**](#guardduty_cloudwatch_event_target_arns) &mdash; The ARNs of the cloudwatch event targets used to publish findings to sns if [`publish_findings_to_sns`](#publish_findings_to_sns) is set to true.

<a name="guardduty_detector_ids" className="snap-top"></a>

* [**`guardduty_detector_ids`**](#guardduty_detector_ids) &mdash; The IDs of the GuardDuty detectors.

<a name="guardduty_findings_sns_topic_arns" className="snap-top"></a>

* [**`guardduty_findings_sns_topic_arns`**](#guardduty_findings_sns_topic_arns) &mdash; The ARNs of the SNS topics where findings are published if [`publish_findings_to_sns`](#publish_findings_to_sns) is set to true.

<a name="guardduty_findings_sns_topic_names" className="snap-top"></a>

* [**`guardduty_findings_sns_topic_names`**](#guardduty_findings_sns_topic_names) &mdash; The names of the SNS topic where findings are published if [`publish_findings_to_sns`](#publish_findings_to_sns) is set to true.

<a name="houston_cli_users_iam_group_arn" className="snap-top"></a>

* [**`houston_cli_users_iam_group_arn`**](#houston_cli_users_iam_group_arn) &mdash; 

<a name="houston_cli_users_iam_group_name" className="snap-top"></a>

* [**`houston_cli_users_iam_group_name`**](#houston_cli_users_iam_group_name) &mdash; 

<a name="iam_admin_iam_group_arn" className="snap-top"></a>

* [**`iam_admin_iam_group_arn`**](#iam_admin_iam_group_arn) &mdash; 

<a name="iam_admin_iam_group_name" className="snap-top"></a>

* [**`iam_admin_iam_group_name`**](#iam_admin_iam_group_name) &mdash; 

<a name="iam_admin_iam_policy_arn" className="snap-top"></a>

* [**`iam_admin_iam_policy_arn`**](#iam_admin_iam_policy_arn) &mdash; 

<a name="iam_self_mgmt_iam_group_arn" className="snap-top"></a>

* [**`iam_self_mgmt_iam_group_arn`**](#iam_self_mgmt_iam_group_arn) &mdash; 

<a name="iam_self_mgmt_iam_group_name" className="snap-top"></a>

* [**`iam_self_mgmt_iam_group_name`**](#iam_self_mgmt_iam_group_name) &mdash; 

<a name="iam_self_mgmt_iam_policy_arn" className="snap-top"></a>

* [**`iam_self_mgmt_iam_policy_arn`**](#iam_self_mgmt_iam_policy_arn) &mdash; 

<a name="logs_iam_group_arn" className="snap-top"></a>

* [**`logs_iam_group_arn`**](#logs_iam_group_arn) &mdash; 

<a name="logs_iam_group_name" className="snap-top"></a>

* [**`logs_iam_group_name`**](#logs_iam_group_name) &mdash; 

<a name="master_account_arn" className="snap-top"></a>

* [**`master_account_arn`**](#master_account_arn) &mdash; ARN of the master account.

<a name="master_account_email" className="snap-top"></a>

* [**`master_account_email`**](#master_account_email) &mdash; Email address of the master account.

<a name="master_account_id" className="snap-top"></a>

* [**`master_account_id`**](#master_account_id) &mdash; Identifier of the master account.

<a name="organization_arn" className="snap-top"></a>

* [**`organization_arn`**](#organization_arn) &mdash; ARN of the organization.

<a name="organization_id" className="snap-top"></a>

* [**`organization_id`**](#organization_id) &mdash; Identifier of the organization.

<a name="organization_root_id" className="snap-top"></a>

* [**`organization_root_id`**](#organization_root_id) &mdash; Identifier of the root of this organization.

<a name="read_only_iam_group_arn" className="snap-top"></a>

* [**`read_only_iam_group_arn`**](#read_only_iam_group_arn) &mdash; 

<a name="read_only_iam_group_name" className="snap-top"></a>

* [**`read_only_iam_group_name`**](#read_only_iam_group_name) &mdash; 

<a name="require_mfa_policy" className="snap-top"></a>

* [**`require_mfa_policy`**](#require_mfa_policy) &mdash; 

<a name="ssh_grunt_sudo_users_group_arns" className="snap-top"></a>

* [**`ssh_grunt_sudo_users_group_arns`**](#ssh_grunt_sudo_users_group_arns) &mdash; 

<a name="ssh_grunt_sudo_users_group_names" className="snap-top"></a>

* [**`ssh_grunt_sudo_users_group_names`**](#ssh_grunt_sudo_users_group_names) &mdash; 

<a name="ssh_grunt_users_group_arns" className="snap-top"></a>

* [**`ssh_grunt_users_group_arns`**](#ssh_grunt_users_group_arns) &mdash; 

<a name="ssh_grunt_users_group_names" className="snap-top"></a>

* [**`ssh_grunt_users_group_names`**](#ssh_grunt_users_group_names) &mdash; 

<a name="support_iam_group_arn" className="snap-top"></a>

* [**`support_iam_group_arn`**](#support_iam_group_arn) &mdash; 

<a name="support_iam_group_name" className="snap-top"></a>

* [**`support_iam_group_name`**](#support_iam_group_name) &mdash; 

<a name="use_existing_iam_roles_iam_group_arn" className="snap-top"></a>

* [**`use_existing_iam_roles_iam_group_arn`**](#use_existing_iam_roles_iam_group_arn) &mdash; 

<a name="use_existing_iam_roles_iam_group_name" className="snap-top"></a>

* [**`use_existing_iam_roles_iam_group_name`**](#use_existing_iam_roles_iam_group_name) &mdash; 

<a name="user_access_keys" className="snap-top"></a>

* [**`user_access_keys`**](#user_access_keys) &mdash; A map of user name to that user's access keys (a map with keys [`access_key_id`](#access_key_id) and [`secret_access_key`](#secret_access_key)), with the [`secret_access_key`](#secret_access_key) encrypted with that user's PGP key (only shows up for users with [`create_access_keys`](#create_access_keys) = true). You can decrypt the [`secret_access_key`](#secret_access_key) on the CLI: echo [`&lt;secret_access_key`](#&lt;secret_access_key)> | base64 --decode | keybase pgp decrypt

<a name="user_arns" className="snap-top"></a>

* [**`user_arns`**](#user_arns) &mdash; A map of user name to the ARN for that IAM user.

<a name="user_passwords" className="snap-top"></a>

* [**`user_passwords`**](#user_passwords) &mdash; A map of user name to that user's AWS Web Console password, encrypted with that user's PGP key (only shows up for users with [`create_login_profile`](#create_login_profile) = true). You can decrypt the password on the CLI: echo &lt;password> | base64 --decode | keybase pgp decrypt

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"87f61edde8456f489cb566f2d68da30a"}
##DOCS-SOURCER-END -->
