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
import HclListItem from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.85.0" lastModifiedVersion="0.85.0"/>

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

<br/>

### Required

<HclListItem name="aws_account_id" requirement="required" description="The AWS Account ID the template should be operated on. This avoids misconfiguration errors caused by environment variables." type="string"/>

<HclListItem name="aws_region" requirement="required" description="The AWS Region to use as the global config recorder and seed region for GuardDuty." type="string"/>

<HclListItem name="child_accounts" requirement="required" description="Map of child accounts to create. The map key is the name of the account and the value is an object containing account configuration variables. See the comments below for what keys and values this object should contain." type="any"/>

<HclListItem name="config_opt_in_regions" requirement="required" description="Creates resources in the specified regions. The best practice is to enable AWS Config in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions." type="list" typeDetails="list(string)"/>

<HclListItem name="ebs_opt_in_regions" requirement="required" description="Creates resources in the specified regions. The best practice is to enable EBS Encryption in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions. The value provided for <a href=#global_recorder_region><code>global_recorder_region</code></a> must be in this list." type="list" typeDetails="list(string)"/>

<HclListItem name="guardduty_opt_in_regions" requirement="required" description="Creates resources in the specified regions. The best practice is to enable GuardDuty in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions. The value provided for <a href=#global_recorder_region><code>global_recorder_region</code></a> must be in this list." type="list" typeDetails="list(string)"/>

<HclListItem name="iam_access_analyzer_opt_in_regions" requirement="required" description="Creates resources in the specified regions. The best practice is to enable IAM Access Analyzer in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions. The value provided for <a href=#global_recorder_region><code>global_recorder_region</code></a> must be in this list." type="list" typeDetails="list(string)"/>

<HclListItem name="name_prefix" requirement="required" description="The name used to prefix AWS Config and Cloudtrail resources, including the S3 bucket names and SNS topics used for each." type="string"/>


<br/>


### Optional

<HclListItem name="additional_config_rules" requirement="optional" description="Map of additional managed rules to add. The key is the name of the rule (e.g. ´acm-certificate-expiration-check´) and the value is an object specifying the rule details" type="map" typeDetails="map(object({
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
  }))" defaultValue="{}"/>

<HclListItem name="allow_auto_deploy_from_github_actions_for_sources" requirement="optional" description="Map of github repositories to the list of branches that are allowed to assume the IAM role. The repository should be encoded as org/repo-name (e.g., gruntwork-io/terrraform-aws-ci). Allows GitHub Actions to assume the auto deploy IAM role using an OpenID Connect Provider for the given repositories. Refer to the docs for github-actions-iam-role for more information. Note that this is mutually exclusive with <a href=#allow_auto_deploy_from_other_account_arns><code>allow_auto_deploy_from_other_account_arns</code></a>. Only used if <a href=#enable_github_actions_access><code>enable_github_actions_access</code></a> is true. " type="map" typeDetails="map(list(string))" defaultValue="{}"/>

<HclListItem name="allow_auto_deploy_from_other_account_arns" requirement="optional" description="A list of IAM ARNs from other AWS accounts that will be allowed to assume the auto deploy IAM role that has the permissions in <a href=#auto_deploy_permissions><code>auto_deploy_permissions</code></a>." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="allow_billing_access_from_other_account_arns" requirement="optional" description="A list of IAM ARNs from other AWS accounts that will be allowed full (read and write) access to the billing info for this account." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="allow_cloudtrail_access_with_iam" requirement="optional" description="If true, an IAM Policy that grants access to CloudTrail will be honored. If false, only the ARNs listed in <a href=#kms_key_user_iam_arns><code>kms_key_user_iam_arns</code></a> will have access to CloudTrail and any IAM Policy grants will be ignored. (true or false)" type="bool" defaultValue="true"/>

<HclListItem name="allow_dev_access_from_other_account_arns" requirement="optional" description="A list of IAM ARNs from other AWS accounts that will be allowed full (read and write) access to the services in this account specified in <a href=#dev_permitted_services><code>dev_permitted_services</code></a>." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="allow_full_access_from_other_account_arns" requirement="optional" description="A list of IAM ARNs from other AWS accounts that will be allowed full (read and write) access to this account." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="allow_logs_access_from_other_account_arns" requirement="optional" description="A list of IAM ARNs from other AWS accounts that will be allowed read access to the logs in CloudTrail, AWS Config, and CloudWatch for this account. If <a href=#cloudtrail_kms_key_arn><code>cloudtrail_kms_key_arn</code></a> is specified, will also be given permissions to decrypt with the KMS CMK that is used to encrypt CloudTrail logs." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="allow_read_only_access_from_other_account_arns" requirement="optional" description="A list of IAM ARNs from other AWS accounts that will be allowed read-only access to this account." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="allow_ssh_grunt_access_from_other_account_arns" requirement="optional" description="A list of IAM ARNs from other AWS accounts that will be allowed read access to IAM groups and publish SSH keys. This is used for ssh-grunt." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="allow_support_access_from_other_account_arns" requirement="optional" description="A list of IAM ARNs from other AWS accounts that will be allowed access to AWS support for this account." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="auto_deploy_permissions" requirement="optional" description="A list of IAM permissions (e.g. ec2:*) that will be added to an IAM Group for doing automated deployments. NOTE: If <a href=#should_create_iam_group_auto_deploy><code>should_create_iam_group_auto_deploy</code></a> is true, the list must have at least one element (e.g. '*')." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="cloudtrail_allow_kms_describe_key_to_external_aws_accounts" requirement="optional" description="Whether or not to allow kms:DescribeKey to external AWS accounts with write access to the CloudTrail bucket. This is useful during deployment so that you don't have to pass around the KMS key ARN." type="bool" defaultValue="false"/>

<HclListItem name="cloudtrail_cloudwatch_logs_group_name" requirement="optional" description="Specify the name of the CloudWatch Logs group to publish the CloudTrail logs to. This log group exists in the current account. Set this value to `null` to avoid publishing the trail logs to the logs group. The recommended configuration for CloudTrail is (a) for each child account to aggregate its logs in an S3 bucket in a single central account, such as a logs account and (b) to also store 14 days work of logs in CloudWatch in the child account itself for local debugging." type="string" defaultValue="cloudtrail-logs"/>

<HclListItem name="cloudtrail_data_logging_enabled" requirement="optional" description="If true, logging of data events will be enabled." type="bool" defaultValue="false"/>

<HclListItem name="cloudtrail_data_logging_include_management_events" requirement="optional" description="Specify if you want your event selector to include management events for your trail." type="bool" defaultValue="true"/>

<HclListItem name="cloudtrail_data_logging_read_write_type" requirement="optional" description="Specify if you want your trail to log read-only events, write-only events, or all. Possible values are: ReadOnly, WriteOnly, All." type="string" defaultValue="All"/>

<HclListItem name="cloudtrail_data_logging_resources" requirement="optional" description="Data resources for which to log data events. This should be a map, where each key is a data resource type, and each value is a list of data resource values. Possible values for data resource types are: AWS::S3::Object, AWS::Lambda::Function and AWS::DynamoDB::Table. See the '<a href=#data_resource><code>data_resource</code></a>' block within the '<a href=#event_selector><code>event_selector</code></a>' block of the '<a href=#aws_cloudtrail><code>aws_cloudtrail</code></a>' resource for context: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudtrail#<a href=#data_resource><code>data_resource</code></a>." type="map" typeDetails="map(list(string))" defaultValue="{}"/>

<HclListItem name="cloudtrail_enable_key_rotation" requirement="optional" description="Whether or not to enable automatic annual rotation of the KMS key. Defaults to true." type="bool" defaultValue="true"/>

<HclListItem name="cloudtrail_force_destroy" requirement="optional" description="If set to true, when you run 'terraform destroy', delete all objects from the bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!" type="bool" defaultValue="false"/>

<HclListItem name="cloudtrail_is_organization_trail" requirement="optional" description="Specifies whether the trail is an AWS Organizations trail. Organization trails log events for the root account and all member accounts. Can only be created in the organization root account. (true or false)" type="bool" defaultValue="false"/>

<HclListItem name="cloudtrail_kms_key_administrator_iam_arns" requirement="optional" description="All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key) that governs access to write API calls older than 7 days and all read API calls. The IAM Users specified in this list will have rights to change who can access this extended log data. Note that if you specify a logs account (by setting <a href=#is_logs_account><code>is_logs_account</code></a> = true on one of the accounts in <a href=#child_accounts><code>child_accounts</code></a>), the KMS CMK will be created in that account, and the root of that account will automatically be made an admin of the CMK." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="cloudtrail_kms_key_arn" requirement="optional" description="All CloudTrail Logs will be encrypted with a KMS CMK (Customer Master Key) that governs access to write API calls older than 7 days and all read API calls. If that CMK already exists, set this to the ARN of that CMK. Otherwise, set this to null, and a new CMK will be created. If you set <a href=#is_logs_account><code>is_logs_account</code></a> to true on one of the accounts in <a href=#child_accounts><code>child_accounts</code></a>, the KMS CMK will be created in that account (this is the recommended approach!)." type="string" defaultValue="null"/>

<HclListItem name="cloudtrail_kms_key_arn_is_alias" requirement="optional" description="If the <a href=#kms_key_arn><code>kms_key_arn</code></a> provided is an alias or alias ARN, then this must be set to true so that the module will exchange the alias for a CMK ARN. Setting this to true and using aliases requires <a href=#cloudtrail_allow_kms_describe_key_to_external_aws_accounts><code>cloudtrail_allow_kms_describe_key_to_external_aws_accounts</code></a> to also be true for multi-account scenarios." type="bool" defaultValue="false"/>

<HclListItem name="cloudtrail_kms_key_user_iam_arns" requirement="optional" description="All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key) that governs access to write API calls older than 7 days and all read API calls. The IAM Users specified in this list will have read-only access to this extended log data." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="cloudtrail_num_days_after_which_archive_log_data" requirement="optional" description="After this number of days, log files should be transitioned from S3 to Glacier. Enter 0 to never archive log data." type="number" defaultValue="30"/>

<HclListItem name="cloudtrail_num_days_after_which_delete_log_data" requirement="optional" description="After this number of days, log files should be deleted from S3. Enter 0 to never delete log data." type="number" defaultValue="365"/>

<HclListItem name="cloudtrail_num_days_to_retain_cloudwatch_logs" requirement="optional" description="After this number of days, logs stored in CloudWatch will be deleted. Possible values are: 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1827, 3653, and 0 (default). When set to 0, logs will be retained indefinitely." type="number" defaultValue="0"/>

<HclListItem name="cloudtrail_organization_id" requirement="optional" description="The ID of the organization. Required only if an organization wide CloudTrail is being setup and `<a href=#create_organization><code>create_organization</code></a>` is set to false. The organization ID is required to ensure that the entire organization is whitelisted in the CloudTrail bucket write policy." type="string" defaultValue="null"/>

<HclListItem name="cloudtrail_s3_bucket_name" requirement="optional" description="The name of the S3 Bucket where CloudTrail logs will be stored. This could be a bucket in this AWS account or the name of a bucket in another AWS account where CloudTrail logs should be sent. If you set <a href=#is_logs_account><code>is_logs_account</code></a> on one of the accounts in <a href=#child_accounts><code>child_accounts</code></a>, the S3 bucket will be created in that account (this is the recommended approach!)." type="string" defaultValue="null"/>

<HclListItem name="cloudtrail_s3_mfa_delete" requirement="optional" description="Enable MFA delete for either 'Change the versioning state of your bucket' or 'Permanently delete an object version'. This setting only applies to the bucket used to storage Cloudtrail data. This cannot be used to toggle this setting but is available to allow managed buckets to reflect the state in AWS.  For instructions on how to enable MFA Delete, check out the README from the terraform-aws-security/private-s3-bucket module." type="bool" defaultValue="false"/>

<HclListItem name="cloudtrail_should_create_s3_bucket" requirement="optional" description="If true, create an S3 bucket of name <a href=#cloudtrail_s3_bucket_name><code>cloudtrail_s3_bucket_name</code></a> for CloudTrail logs, either in the logs account—the account in <a href=#child_accounts><code>child_accounts</code></a> that has <a href=#is_logs_account><code>is_logs_account</code></a> set to true (this is the recommended approach!)—or in this account if none of the child accounts are marked as a logs account. If false, assume <a href=#cloudtrail_s3_bucket_name><code>cloudtrail_s3_bucket_name</code></a> is an S3 bucket that already exists. We recommend setting this to true and setting <a href=#is_logs_account><code>is_logs_account</code></a> to true on one of the accounts in <a href=#child_accounts><code>child_accounts</code></a> to use that account as a logs account where you aggregate all your CloudTrail data. In case you want to disable the CloudTrail module and the S3 bucket, you need to set both <a href=#enable_cloudtrail><code>enable_cloudtrail</code></a> and <a href=#cloudtrail_should_create_s3_bucket><code>cloudtrail_should_create_s3_bucket</code></a> to false." type="bool" defaultValue="true"/>

<HclListItem name="cloudtrail_tags" requirement="optional" description="Tags to apply to the CloudTrail resources." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="config_aggregate_config_data_in_external_account" requirement="optional" description="Set to true to send the AWS Config data to another account (e.g., a logs account) for aggregation purposes. You must set the ID of that other account via the <a href=#config_central_account_id><code>config_central_account_id</code></a> variable. Note that if one of the accounts in <a href=#child_accounts><code>child_accounts</code></a> has <a href=#is_logs_account><code>is_logs_account</code></a> set to true (this is the approach we recommended!), this variable will be assumed to be true, so you don't have to pass any value for it.  This redundant variable has to exist because Terraform does not allow computed data in count and <a href=#for_each><code>for_each</code></a> parameters and <a href=#config_central_account_id><code>config_central_account_id</code></a> may be computed if its the ID of a newly-created AWS account." type="bool" defaultValue="false"/>

<HclListItem name="config_central_account_id" requirement="optional" description="If the S3 bucket and SNS topics used for AWS Config live in a different AWS account, set this variable to the ID of that account. If the S3 bucket and SNS topics live in this account, set this variable to an empty string. Note that if one of the accounts in <a href=#child_accounts><code>child_accounts</code></a> has <a href=#is_logs_account><code>is_logs_account</code></a> set to true (this is the approach we recommended!), that account's ID will be used automatically, and you can leave this variable null." type="string" defaultValue=""/>

<HclListItem name="config_create_account_rules" requirement="optional" description="Set to true to create account-level AWS Config rules directly in this account. Set false to create org-level rules that apply to this account and all child accounts. We recommend setting this to true to use account-level rules because org-level rules create a chicken-and-egg problem with creating new accounts (see this module's README for details)." type="bool" defaultValue="true"/>

<HclListItem name="config_delivery_channel_kms_key_arn" requirement="optional" description="Optional KMS key to use for encrypting S3 objects on the AWS Config delivery channel for an externally managed S3 bucket. This must belong to the same region as the destination S3 bucket. If null, AWS Config will default to encrypting the delivered data with AES-256 encryption. Only used if <a href=#should_create_s3_bucket><code>should_create_s3_bucket</code></a> is false - otherwise, <a href=#config_s3_bucket_kms_key_arn><code>config_s3_bucket_kms_key_arn</code></a> is used." type="string" defaultValue="null"/>

<HclListItem name="config_force_destroy" requirement="optional" description="If set to true, when you run 'terraform destroy', delete all objects from the bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!" type="bool" defaultValue="false"/>

<HclListItem name="config_num_days_after_which_archive_log_data" requirement="optional" description="After this number of days, log files should be transitioned from S3 to Glacier. Enter 0 to never archive log data." type="number" defaultValue="365"/>

<HclListItem name="config_num_days_after_which_delete_log_data" requirement="optional" description="After this number of days, log files should be deleted from S3. Enter 0 to never delete log data." type="number" defaultValue="730"/>

<HclListItem name="config_s3_bucket_kms_key_arn" requirement="optional" description="Optional KMS key (in logs account) to use for encrypting S3 objects on the AWS Config bucket, when the S3 bucket is created within this module (<a href=#config_should_create_s3_bucket><code>config_should_create_s3_bucket</code></a> is true). For encrypting S3 objects on delivery for an externally managed S3 bucket, refer to the <a href=#config_delivery_channel_kms_key_arn><code>config_delivery_channel_kms_key_arn</code></a> input variable. If null, data in S3 will be encrypted using the default aws/s3 key. If provided, the key policy of the provided key must permit the IAM role used by AWS Config. See https://docs.aws.amazon.com/sns/latest/dg/sns-key-management.html. Note that the KMS key must reside in the global recorder region (as configured by <a href=#aws_region><code>aws_region</code></a>)." type="string" defaultValue="null"/>

<HclListItem name="config_s3_bucket_name" requirement="optional" description="The name of the S3 Bucket where Config items will be stored. This could be a bucket in this AWS account or the name of a bucket in another AWS account where Config items should be sent. If you set <a href=#is_logs_account><code>is_logs_account</code></a> to true on one of the accounts in <a href=#child_accounts><code>child_accounts</code></a>, the S3 bucket will be created in that account (this is the recommended approach!)." type="string" defaultValue="null"/>

<HclListItem name="config_s3_mfa_delete" requirement="optional" description="Enable MFA delete for either 'Change the versioning state of your bucket' or 'Permanently delete an object version'. This setting only applies to the bucket used to storage AWS Config data. This cannot be used to toggle this setting but is available to allow managed buckets to reflect the state in AWS. For instructions on how to enable MFA Delete, check out the README from the terraform-aws-security/private-s3-bucket module." type="bool" defaultValue="false"/>

<HclListItem name="config_should_create_s3_bucket" requirement="optional" description="If true, create an S3 bucket of name <a href=#config_s3_bucket_name><code>config_s3_bucket_name</code></a> for AWS Config data, either in the logs account—the account in <a href=#child_accounts><code>child_accounts</code></a> that has <a href=#is_logs_account><code>is_logs_account</code></a> set to true (this is the recommended approach!)—or in this account if none of the child accounts are marked as a logs account. If false, assume <a href=#config_s3_bucket_name><code>config_s3_bucket_name</code></a> is an S3 bucket that already exists. We recommend setting this to true and setting <a href=#is_logs_account><code>is_logs_account</code></a> to true on one of the accounts in <a href=#child_accounts><code>child_accounts</code></a> to use that account as a logs account where you aggregate all your AWS Config data. In case you want to disable the AWS Config module and the S3 bucket, you need to set both <a href=#enable_config><code>enable_config</code></a> and <a href=#config_should_create_s3_bucket><code>config_should_create_s3_bucket</code></a> to false." type="bool" defaultValue="true"/>

<HclListItem name="config_should_create_sns_topic" requirement="optional" description="Set to true to create an SNS topic in this account for sending AWS Config notifications. Set to false to assume the topic specified in <a href=#config_sns_topic_name><code>config_sns_topic_name</code></a> already exists in another AWS account (e.g the logs account)." type="bool" defaultValue="false"/>

<HclListItem name="config_sns_topic_kms_key_region_map" requirement="optional" description="Optional KMS key to use for each region for configuring default encryption for the SNS topic (encoded as a map from region - e.g. us-east-1 - to ARN of KMS key). If null or the region key is missing, encryption will not be configured for the SNS topic in that region." type="map" typeDetails="map(string)" defaultValue="null"/>

<HclListItem name="config_sns_topic_name" requirement="optional" description="The name of the SNS Topic in where AWS Config notifications will be sent. Can be in the same account or in another account." type="string" defaultValue="ConfigTopic"/>

<HclListItem name="config_tags" requirement="optional" description="A map of tags to apply to the S3 Bucket. The key is the tag name and the value is the tag value." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="configrules_excluded_accounts" requirement="optional" description="List of AWS account identifiers to exclude from org-level Config rules. Only used if <a href=#config_create_account_rules><code>config_create_account_rules</code></a> is false (not recommended)." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="configrules_maximum_execution_frequency" requirement="optional" description="The maximum frequency with which AWS Config runs evaluations for the ´PERIODIC´ rules. See https://www.terraform.io/docs/providers/aws/r/<a href=#config_organization_managed_rule><code>config_organization_managed_rule</code></a>.html#<a href=#maximum_execution_frequency><code>maximum_execution_frequency</code></a>" type="string" defaultValue="TwentyFour_Hours"/>

<HclListItem name="create_organization" requirement="optional" description="Set to true to create/configure AWS Organizations for the first time in this account. If you already configured AWS Organizations in your account, set this to false; alternatively, you could set it to true and run 'terraform import' to import you existing Organization." type="bool" defaultValue="true"/>

<HclListItem name="cross_account_access_all_group_name" requirement="optional" description="The name of the IAM group that will grant access to all external AWS accounts in <a href=#iam_groups_for_cross_account_access><code>iam_groups_for_cross_account_access</code></a>." type="string" defaultValue="_all-accounts"/>

<HclListItem name="dev_permitted_services" requirement="optional" description="A list of AWS services for which the developers from the accounts in <a href=#allow_dev_access_from_other_account_arns><code>allow_dev_access_from_other_account_arns</code></a> will receive full permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to grant developers access only to EC2 and Amazon Machine Learning, use the value ['ec2','machinelearning']. Do NOT add iam to the list of services, or that will grant Developers de facto admin access." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="ebs_enable_encryption" requirement="optional" description="If set to true (default), all new EBS volumes will have encryption enabled by default" type="bool" defaultValue="true"/>

<HclListItem name="ebs_kms_key_arns" requirement="optional" description="Optional map of region names to KMS keys to use for EBS volume encryption when <a href=#ebs_use_existing_kms_keys><code>ebs_use_existing_kms_keys</code></a> is enabled." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="ebs_use_existing_kms_keys" requirement="optional" description="If set to true, the KMS Customer Managed Keys (CMK) specified in <a href=#ebs_kms_key_arns><code>ebs_kms_key_arns</code></a> will be set as the default for EBS encryption. When false (default), the AWS-managed aws/ebs key will be used." type="bool" defaultValue="false"/>

<HclListItem name="enable_cloudtrail" requirement="optional" description="Set to true to enable CloudTrail in the root account. Set to false to disable CloudTrail (note: all other CloudTrail variables will be ignored). In case you want to disable the CloudTrail module and the S3 bucket, you need to set both <a href=#enable_cloudtrail><code>enable_cloudtrail</code></a> and <a href=#cloudtrail_should_create_s3_bucket><code>cloudtrail_should_create_s3_bucket</code></a> to false." type="bool" defaultValue="true"/>

<HclListItem name="enable_cloudtrail_s3_server_access_logging" requirement="optional" description="Enables S3 server access logging which sends detailed records for the requests that are made to the bucket. Defaults to false." type="bool" defaultValue="false"/>

<HclListItem name="enable_config" requirement="optional" description="Set to true to enable AWS Config in the root account. Set to false to disable AWS Config (note: all other AWS config variables will be ignored). In case you want to disable the CloudTrail module and the S3 bucket, you need to set both <a href=#enable_cloudtrail><code>enable_cloudtrail</code></a> and <a href=#cloudtrail_should_create_s3_bucket><code>cloudtrail_should_create_s3_bucket</code></a> to false." type="bool" defaultValue="true"/>

<HclListItem name="enable_encrypted_volumes" requirement="optional" description="Checks whether the EBS volumes that are in an attached state are encrypted." type="bool" defaultValue="true"/>

<HclListItem name="enable_github_actions_access" requirement="optional" description="When true, create an Open ID Connect Provider that GitHub actions can use to assume IAM roles in the account. Refer to https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services for more information." type="bool" defaultValue="false"/>

<HclListItem name="enable_iam_access_analyzer" requirement="optional" description="A feature flag to enable or disable this module." type="bool" defaultValue="false"/>

<HclListItem name="enable_iam_cross_account_roles" requirement="optional" description="A feature flag to enable or disable this module." type="bool" defaultValue="true"/>

<HclListItem name="enable_iam_groups" requirement="optional" description="A feature flag to enable or disable this module." type="bool" defaultValue="true"/>

<HclListItem name="enable_iam_password_policy" requirement="optional" description="Checks whether the account password policy for IAM users meets the specified requirements." type="bool" defaultValue="true"/>

<HclListItem name="enable_insecure_sg_rules" requirement="optional" description="Checks whether the security group with 0.0.0.0/0 of any Amazon Virtual Private Cloud (Amazon VPC) allows only specific inbound TCP or UDP traffic." type="bool" defaultValue="true"/>

<HclListItem name="enable_rds_storage_encrypted" requirement="optional" description="Checks whether storage encryption is enabled for your RDS DB instances." type="bool" defaultValue="true"/>

<HclListItem name="enable_root_account_mfa" requirement="optional" description="Checks whether users of your AWS account require a multi-factor authentication (MFA) device to sign in with root credentials." type="bool" defaultValue="true"/>

<HclListItem name="enable_s3_bucket_public_read_prohibited" requirement="optional" description="Checks that your Amazon S3 buckets do not allow public read access." type="bool" defaultValue="true"/>

<HclListItem name="enable_s3_bucket_public_write_prohibited" requirement="optional" description="Checks that your Amazon S3 buckets do not allow public write access." type="bool" defaultValue="true"/>

<HclListItem name="encrypted_volumes_kms_id" requirement="optional" description="ID or ARN of the KMS key that is used to encrypt the volume. Used for configuring the encrypted volumes config rule." type="string" defaultValue="null"/>

<HclListItem name="force_destroy_users" requirement="optional" description="When destroying this user, destroy even if it has non-Terraform-managed IAM access keys, login profile, or MFA devices. Without <a href=#force_destroy><code>force_destroy</code></a> a user with non-Terraform-managed access keys and login profile will fail to be destroyed." type="bool" defaultValue="false"/>

<HclListItem name="github_actions_openid_connect_provider_thumbprint_list" requirement="optional" description="When set, use the statically provided hardcoded list of thumbprints rather than looking it up dynamically. This is useful if you want to trade reliability of the OpenID Connect Provider across certificate renewals with a static list that is obtained using a trustworthy mechanism, to mitigate potential damage from a domain hijacking attack on GitHub domains." type="list" typeDetails="list(string)" defaultValue="null"/>

<HclListItem name="guardduty_cloudwatch_event_rule_name" requirement="optional" description="Name of the Cloudwatch event rules." type="string" defaultValue="guardduty-finding-events"/>

<HclListItem name="guardduty_finding_publishing_frequency" requirement="optional" description="Specifies the frequency of notifications sent for subsequent finding occurrences. If the detector is a GuardDuty member account, the value is determined by the GuardDuty master account and cannot be modified, otherwise defaults to <a href=#SIX_HOURS><code>SIX_HOURS</code></a>. For standalone and GuardDuty master accounts, it must be configured in Terraform to enable drift detection. Valid values for standalone and master accounts: <a href=#FIFTEEN_MINUTES><code>FIFTEEN_MINUTES</code></a>, <a href=#ONE_HOUR><code>ONE_HOUR</code></a>, <a href=#SIX_HOURS><code>SIX_HOURS</code></a>." type="string" defaultValue="null"/>

<HclListItem name="guardduty_findings_sns_topic_name" requirement="optional" description="Specifies a name for the created SNS topics where findings are published. <a href=#publish_findings_to_sns><code>publish_findings_to_sns</code></a> must be set to true." type="string" defaultValue="guardduty-findings"/>

<HclListItem name="guardduty_publish_findings_to_sns" requirement="optional" description="Send GuardDuty findings to SNS topics specified by <a href=#findings_sns_topic_name><code>findings_sns_topic_name</code></a>." type="bool" defaultValue="false"/>

<HclListItem name="iam_access_analyzer_name" requirement="optional" description="The name of the IAM Access Analyzer module" type="string" defaultValue="baseline_root-iam_access_analyzer"/>

<HclListItem name="iam_access_analyzer_type" requirement="optional" description="If set to ORGANIZATION, the analyzer will be scanning the current organization and any policies that refer to linked resources such as S3, IAM, Lambda and SQS policies." type="string" defaultValue="ORGANIZATION"/>

<HclListItem name="iam_group_developers_permitted_services" requirement="optional" description="A list of AWS services for which the developers IAM Group will receive full permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to grant developers access only to EC2 and Amazon Machine Learning, use the value ['ec2','machinelearning']. Do NOT add iam to the list of services, or that will grant Developers de facto admin access. If you need to grant iam privileges, just grant the user Full Access." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="iam_group_names_ssh_grunt_sudo_users" requirement="optional" description="The list of names to be used for the IAM Group that enables its members to SSH as a sudo user into any server configured with the ssh-grunt Gruntwork module. Pass in multiple to configure multiple different IAM groups to control different groupings of access at the server level. Pass in empty list to disable creation of the IAM groups." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="iam_group_names_ssh_grunt_users" requirement="optional" description="The name to be used for the IAM Group that enables its members to SSH as a non-sudo user into any server configured with the ssh-grunt Gruntwork module. Pass in multiple to configure multiple different IAM groups to control different groupings of access at the server level. Pass in empty list to disable creation of the IAM groups." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="iam_groups_for_cross_account_access" requirement="optional" description="This variable is used to create groups that allow IAM users to assume roles in your other AWS accounts. It should be a list of objects, where each object has the fields '<a href=#group_name><code>group_name</code></a>', which will be used as the name of the IAM group, and '<a href=#iam_role_arns><code>iam_role_arns</code></a>', which is a list of ARNs of IAM Roles that you can assume when part of that group. For each entry in the list of objects, we will create an IAM group that allows users to assume the given IAM role(s) in the other AWS account. This allows you to define all your IAM users in one account (e.g. the users account) and to grant them access to certain IAM roles in other accounts (e.g. the stage, prod, audit accounts)." type="list" typeDetails="list(object({
    group_name    = string
    iam_role_arns = list(string)
  }))" defaultValue="[]"/>

<HclListItem name="iam_password_policy_allow_users_to_change_password" requirement="optional" description="Allow users to change their own password." type="bool" defaultValue="true"/>

<HclListItem name="iam_password_policy_hard_expiry" requirement="optional" description="Password expiration requires administrator reset." type="bool" defaultValue="true"/>

<HclListItem name="iam_password_policy_max_password_age" requirement="optional" description="Number of days before password expiration." type="number" defaultValue="30"/>

<HclListItem name="iam_password_policy_minimum_password_length" requirement="optional" description="Password minimum length." type="number" defaultValue="16"/>

<HclListItem name="iam_password_policy_password_reuse_prevention" requirement="optional" description="Number of passwords before allowing reuse." type="number" defaultValue="5"/>

<HclListItem name="iam_password_policy_require_lowercase_characters" requirement="optional" description="Require at least one lowercase character in password." type="bool" defaultValue="true"/>

<HclListItem name="iam_password_policy_require_numbers" requirement="optional" description="Require at least one number in password." type="bool" defaultValue="true"/>

<HclListItem name="iam_password_policy_require_symbols" requirement="optional" description="Require at least one symbol in password." type="bool" defaultValue="true"/>

<HclListItem name="iam_password_policy_require_uppercase_characters" requirement="optional" description="Require at least one uppercase character in password." type="bool" defaultValue="true"/>

<HclListItem name="iam_role_tags" requirement="optional" description="The tags to apply to all the IAM role resources." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="insecure_sg_rules_authorized_tcp_ports" requirement="optional" description="Comma-separated list of TCP ports authorized to be open to 0.0.0.0/0. Ranges are defined by a dash; for example, '443,1020-1025'." type="string" defaultValue="443"/>

<HclListItem name="insecure_sg_rules_authorized_udp_ports" requirement="optional" description="Comma-separated list of UDP ports authorized to be open to 0.0.0.0/0. Ranges are defined by a dash; for example, '500,1020-1025'." type="string" defaultValue="null"/>

<HclListItem name="is_multi_region_trail" requirement="optional" description="Specifies whether CloudTrail will log only API calls in the current region or in all regions. (true or false)" type="bool" defaultValue="true"/>

<HclListItem name="organizations_aws_service_access_principals" requirement="optional" description="List of AWS service principal names for which you want to enable integration with your organization. Must have `<a href=#organizations_feature_set><code>organizations_feature_set</code></a>` set to ALL. See https://docs.aws.amazon.com/organizations/latest/userguide/<a href=#orgs_integrate_services><code>orgs_integrate_services</code></a>.html" type="list" typeDetails="list(string)" defaultValue="['cloudtrail.amazonaws.com','config-multiaccountsetup.amazonaws.com','config.amazonaws.com','access-analyzer.amazonaws.com']"/>

<HclListItem name="organizations_default_iam_user_access_to_billing" requirement="optional" description="If set to ALLOW, the new account enables IAM users to access account billing information if they have the required permissions. If set to DENY, then only the root user of the new account can access account billing information." type="string" defaultValue="ALLOW"/>

<HclListItem name="organizations_default_role_name" requirement="optional" description="The name of an IAM role that Organizations automatically preconfigures in the new member account. This role trusts the master account, allowing users in the master account to assume the role, as permitted by the master account administrator." type="string" defaultValue="OrganizationAccountAccessRole"/>

<HclListItem name="organizations_default_tags" requirement="optional" description="Default tags to add to accounts. Will be appended to ´<a href=#child_account><code>child_account</code></a>.*.tags´" type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="organizations_enabled_policy_types" requirement="optional" description="List of Organizations policy types to enable in the Organization Root. See https://docs.aws.amazon.com/organizations/latest/APIReference/<a href=#API_EnablePolicyType><code>API_EnablePolicyType</code></a>.html" type="list" typeDetails="list(string)" defaultValue="['SERVICE_CONTROL_POLICY']"/>

<HclListItem name="organizations_feature_set" requirement="optional" description="Specify `ALL` or `<a href=#CONSOLIDATED_BILLING><code>CONSOLIDATED_BILLING</code></a>`." type="string" defaultValue="ALL"/>

<HclListItem name="password_reset_required" requirement="optional" description="Force the user to reset their password on initial login. Only used for users with <a href=#create_login_profile><code>create_login_profile</code></a> set to true." type="bool" defaultValue="true"/>

<HclListItem name="rds_storage_encrypted_kms_id" requirement="optional" description="KMS key ID or ARN used to encrypt the storage. Used for configuring the RDS storage encryption config rule." type="string" defaultValue="null"/>

<HclListItem name="should_create_iam_group_auto_deploy" requirement="optional" description="Should we create the IAM Group for auto-deploy? Allows automated deployment by granting the permissions specified in <a href=#auto_deploy_permissions><code>auto_deploy_permissions</code></a>. (true or false)" type="bool" defaultValue="false"/>

<HclListItem name="should_create_iam_group_billing" requirement="optional" description="Should we create the IAM Group for billing? Allows read-write access to billing features only. (true or false)" type="bool" defaultValue="true"/>

<HclListItem name="should_create_iam_group_developers" requirement="optional" description="Should we create the IAM Group for developers? The permissions of that group are specified via <a href=#iam_group_developers_permitted_services><code>iam_group_developers_permitted_services</code></a>. (true or false)" type="bool" defaultValue="false"/>

<HclListItem name="should_create_iam_group_full_access" requirement="optional" description="Should we create the IAM Group for full access? Allows full access to all AWS resources. (true or false)" type="bool" defaultValue="true"/>

<HclListItem name="should_create_iam_group_houston_cli_users" requirement="optional" description="Should we create the IAM Group for houston CLI users? Allows users to use the houston CLI for managing and deploying services." type="bool" defaultValue="false"/>

<HclListItem name="should_create_iam_group_logs" requirement="optional" description="Should we create the IAM Group for logs? Allows read access to logs in CloudTrail, AWS Config, and CloudWatch. If <a href=#cloudtrail_kms_key_arn><code>cloudtrail_kms_key_arn</code></a> is specified, will also be given permissions to decrypt with the KMS CMK that is used to encrypt CloudTrail logs. (true or false)" type="bool" defaultValue="false"/>

<HclListItem name="should_create_iam_group_read_only" requirement="optional" description="Should we create the IAM Group for read-only? Allows read-only access to all AWS resources. (true or false)" type="bool" defaultValue="false"/>

<HclListItem name="should_create_iam_group_support" requirement="optional" description="Should we create the IAM Group for support? Allows access to AWS support. (true or false)" type="bool" defaultValue="true"/>

<HclListItem name="should_create_iam_group_use_existing_iam_roles" requirement="optional" description="Should we create the IAM Group for use-existing-iam-roles? Allow launching AWS resources with existing IAM Roles, but no ability to create new IAM Roles. (true or false)" type="bool" defaultValue="false"/>

<HclListItem name="should_create_iam_group_user_self_mgmt" requirement="optional" description="Should we create the IAM Group for user self-management? Allows users to manage their own IAM user accounts, but not other IAM users. (true or false)" type="bool" defaultValue="false"/>

<HclListItem name="should_require_mfa" requirement="optional" description="Should we require that all IAM Users use Multi-Factor Authentication for both AWS API calls and the AWS Web Console? (true or false)" type="bool" defaultValue="true"/>

<HclListItem name="users" requirement="optional" description="A map of users to create. The keys are the user names and the values are an object with the optional keys 'groups' (a list of IAM groups to add the user to), 'tags' (a map of tags to apply to the user), '<a href=#pgp_key><code>pgp_key</code></a>' (either a base-64 encoded PGP public key, or a keybase username in the form keybase:username, used to encrypt the user's credentials; required if <a href=#create_login_profile><code>create_login_profile</code></a> or <a href=#create_access_keys><code>create_access_keys</code></a> is true), '<a href=#create_login_profile><code>create_login_profile</code></a>' (if set to true, create a password to login to the AWS Web Console), '<a href=#create_access_keys><code>create_access_keys</code></a>' (if set to true, create access keys for the user), 'path' (the path), and '<a href=#permissions_boundary><code>permissions_boundary</code></a>' (the ARN of the policy that is used to set the permissions boundary for the user)." type="any" defaultValue="{}"/>

</TabItem>
<TabItem value="outputs" label="Outputs">

<br/>

<HclListItem name="allow_auto_deploy_access_from_other_accounts_iam_role_arn" requirement="required"/>

<HclListItem name="allow_auto_deploy_access_from_other_accounts_iam_role_id" requirement="required"/>

<HclListItem name="allow_billing_access_from_other_accounts_iam_role_arn" requirement="required"/>

<HclListItem name="allow_billing_access_from_other_accounts_iam_role_id" requirement="required"/>

<HclListItem name="allow_billing_access_sign_in_url" requirement="required"/>

<HclListItem name="allow_dev_access_from_other_accounts_iam_role_arn" requirement="required"/>

<HclListItem name="allow_dev_access_from_other_accounts_iam_role_id" requirement="required"/>

<HclListItem name="allow_dev_access_sign_in_url" requirement="required"/>

<HclListItem name="allow_full_access_from_other_accounts_iam_role_arn" requirement="required"/>

<HclListItem name="allow_full_access_from_other_accounts_iam_role_id" requirement="required"/>

<HclListItem name="allow_full_access_sign_in_url" requirement="required"/>

<HclListItem name="allow_houston_cli_access_from_other_accounts_iam_role_arn" requirement="required"/>

<HclListItem name="allow_houston_cli_access_from_other_accounts_iam_role_id" requirement="required"/>

<HclListItem name="allow_iam_admin_access_from_other_accounts_iam_role_arn" requirement="required"/>

<HclListItem name="allow_iam_admin_access_from_other_accounts_iam_role_id" requirement="required"/>

<HclListItem name="allow_iam_admin_access_sign_in_url" requirement="required"/>

<HclListItem name="allow_logs_access_from_other_accounts_iam_role_arn" requirement="required"/>

<HclListItem name="allow_logs_access_from_other_accounts_iam_role_id" requirement="required"/>

<HclListItem name="allow_logs_access_sign_in_url" requirement="required"/>

<HclListItem name="allow_read_only_access_from_other_accounts_iam_role_arn" requirement="required"/>

<HclListItem name="allow_read_only_access_from_other_accounts_iam_role_id" requirement="required"/>

<HclListItem name="allow_read_only_access_sign_in_url" requirement="required"/>

<HclListItem name="allow_ssh_grunt_access_from_other_accounts_iam_role_arn" requirement="required"/>

<HclListItem name="allow_ssh_grunt_access_from_other_accounts_iam_role_id" requirement="required"/>

<HclListItem name="allow_ssh_grunt_access_sign_in_url" requirement="required"/>

<HclListItem name="allow_ssh_grunt_houston_access_from_other_accounts_iam_role_arn" requirement="required"/>

<HclListItem name="allow_ssh_grunt_houston_access_from_other_accounts_iam_role_id" requirement="required"/>

<HclListItem name="allow_ssh_grunt_houston_access_sign_in_url" requirement="required"/>

<HclListItem name="allow_support_access_from_other_accounts_iam_role_arn" requirement="required"/>

<HclListItem name="allow_support_access_from_other_accounts_iam_role_id" requirement="required"/>

<HclListItem name="allow_support_access_sign_in_url" requirement="required"/>

<HclListItem name="aws_ebs_encryption_by_default_enabled" requirement="required" description="A map from region to a boolean indicating whether or not EBS encryption is enabled by default for each region."/>

<HclListItem name="aws_ebs_encryption_default_kms_key" requirement="required" description="A map from region to the ARN of the KMS key used for default EBS encryption for each region."/>

<HclListItem name="billing_iam_group_arn" requirement="required"/>

<HclListItem name="billing_iam_group_name" requirement="required"/>

<HclListItem name="child_accounts" requirement="required" description="A map of all accounts created by this module (NOT including the root account). The keys are the names of the accounts and the values are the attributes for the account as defined in the <a href=#aws_organizations_account><code>aws_organizations_account</code></a> resource."/>

<HclListItem name="cloudtrail_cloudwatch_group_arn" requirement="required" description="The ARN of the cloudwatch log group."/>

<HclListItem name="cloudtrail_cloudwatch_group_name" requirement="required" description="The name of the cloudwatch log group."/>

<HclListItem name="cloudtrail_iam_role_arn" requirement="required" description="The ARN of the IAM role used by the cloudwatch log group."/>

<HclListItem name="cloudtrail_iam_role_name" requirement="required" description="The name of the IAM role used by the cloudwatch log group."/>

<HclListItem name="cloudtrail_kms_key_alias_name" requirement="required" description="The alias of the KMS key used by the S3 bucket to encrypt cloudtrail logs."/>

<HclListItem name="cloudtrail_kms_key_arn" requirement="required" description="The ARN of the KMS key used by the S3 bucket to encrypt cloudtrail logs."/>

<HclListItem name="cloudtrail_kms_key_arn_with_dependency" requirement="required" description="The ARN of the KMS key used by the S3 bucket to encrypt cloudtrail logs."/>

<HclListItem name="cloudtrail_s3_access_logging_bucket_arn" requirement="required" description="The ARN of the S3 bucket where access logs for the CloudTrail S3 bucket are delivered."/>

<HclListItem name="cloudtrail_s3_access_logging_bucket_name" requirement="required" description="The name of the S3 bucket where access logs for the CloudTrail S3 bucket are delivered."/>

<HclListItem name="cloudtrail_s3_bucket_arn" requirement="required" description="The ARN of the S3 bucket where cloudtrail logs are delivered."/>

<HclListItem name="cloudtrail_s3_bucket_name" requirement="required" description="The name of the S3 bucket where cloudtrail logs are delivered."/>

<HclListItem name="cloudtrail_s3_bucket_name_with_dependency" requirement="required" description="The name of the S3 bucket where cloudtrail logs are delivered. Sources from 'data'."/>

<HclListItem name="cloudtrail_trail_arn" requirement="required" description="The ARN of the cloudtrail trail."/>

<HclListItem name="config_iam_role_arns" requirement="required" description="The ARNs of the IAM role used by the config recorder."/>

<HclListItem name="config_recorder_names" requirement="required" description="The names of the configuration recorder."/>

<HclListItem name="config_s3_bucket_arn" requirement="required" description="The ARN of the S3 bucket used by AWS Config to store configuration items."/>

<HclListItem name="config_s3_bucket_name" requirement="required" description="The name of the S3 bucket used by AWS Config to store configuration items."/>

<HclListItem name="config_s3_bucket_name_with_dependency" requirement="required" description="The name of the S3 bucket used by AWS Config to store configuration items, sources from 'data'."/>

<HclListItem name="config_sns_topic_arns" requirement="required" description="The ARNs of the SNS Topic used by the config notifications."/>

<HclListItem name="cross_account_access_all_group_arn" requirement="required"/>

<HclListItem name="cross_account_access_all_group_name" requirement="required"/>

<HclListItem name="cross_account_access_group_arns" requirement="required"/>

<HclListItem name="cross_account_access_group_names" requirement="required"/>

<HclListItem name="developers_iam_group_arn" requirement="required"/>

<HclListItem name="developers_iam_group_name" requirement="required"/>

<HclListItem name="full_access_iam_group_arn" requirement="required"/>

<HclListItem name="full_access_iam_group_name" requirement="required"/>

<HclListItem name="guardduty_cloudwatch_event_rule_arns" requirement="required" description="The ARNs of the cloudwatch event rules used to publish findings to sns if <a href=#publish_findings_to_sns><code>publish_findings_to_sns</code></a> is set to true."/>

<HclListItem name="guardduty_cloudwatch_event_target_arns" requirement="required" description="The ARNs of the cloudwatch event targets used to publish findings to sns if <a href=#publish_findings_to_sns><code>publish_findings_to_sns</code></a> is set to true."/>

<HclListItem name="guardduty_detector_ids" requirement="required" description="The IDs of the GuardDuty detectors."/>

<HclListItem name="guardduty_findings_sns_topic_arns" requirement="required" description="The ARNs of the SNS topics where findings are published if <a href=#publish_findings_to_sns><code>publish_findings_to_sns</code></a> is set to true."/>

<HclListItem name="guardduty_findings_sns_topic_names" requirement="required" description="The names of the SNS topic where findings are published if <a href=#publish_findings_to_sns><code>publish_findings_to_sns</code></a> is set to true."/>

<HclListItem name="houston_cli_users_iam_group_arn" requirement="required"/>

<HclListItem name="houston_cli_users_iam_group_name" requirement="required"/>

<HclListItem name="iam_admin_iam_group_arn" requirement="required"/>

<HclListItem name="iam_admin_iam_group_name" requirement="required"/>

<HclListItem name="iam_admin_iam_policy_arn" requirement="required"/>

<HclListItem name="iam_self_mgmt_iam_group_arn" requirement="required"/>

<HclListItem name="iam_self_mgmt_iam_group_name" requirement="required"/>

<HclListItem name="iam_self_mgmt_iam_policy_arn" requirement="required"/>

<HclListItem name="logs_iam_group_arn" requirement="required"/>

<HclListItem name="logs_iam_group_name" requirement="required"/>

<HclListItem name="master_account_arn" requirement="required" description="ARN of the master account."/>

<HclListItem name="master_account_email" requirement="required" description="Email address of the master account."/>

<HclListItem name="master_account_id" requirement="required" description="Identifier of the master account."/>

<HclListItem name="organization_arn" requirement="required" description="ARN of the organization."/>

<HclListItem name="organization_id" requirement="required" description="Identifier of the organization."/>

<HclListItem name="organization_root_id" requirement="required" description="Identifier of the root of this organization."/>

<HclListItem name="read_only_iam_group_arn" requirement="required"/>

<HclListItem name="read_only_iam_group_name" requirement="required"/>

<HclListItem name="require_mfa_policy" requirement="required"/>

<HclListItem name="ssh_grunt_sudo_users_group_arns" requirement="required"/>

<HclListItem name="ssh_grunt_sudo_users_group_names" requirement="required"/>

<HclListItem name="ssh_grunt_users_group_arns" requirement="required"/>

<HclListItem name="ssh_grunt_users_group_names" requirement="required"/>

<HclListItem name="support_iam_group_arn" requirement="required"/>

<HclListItem name="support_iam_group_name" requirement="required"/>

<HclListItem name="use_existing_iam_roles_iam_group_arn" requirement="required"/>

<HclListItem name="use_existing_iam_roles_iam_group_name" requirement="required"/>

<HclListItem name="user_access_keys" requirement="required" description="A map of user name to that user's access keys (a map with keys <a href=#access_key_id><code>access_key_id</code></a> and <a href=#secret_access_key><code>secret_access_key</code></a>), with the <a href=#secret_access_key><code>secret_access_key</code></a> encrypted with that user's PGP key (only shows up for users with <a href=#create_access_keys><code>create_access_keys</code></a> = true). You can decrypt the <a href=#secret_access_key><code>secret_access_key</code></a> on the CLI: echo <<a href=#secret_access_key><code>secret_access_key</code></a>> | base64 --decode | keybase pgp decrypt"/>

<HclListItem name="user_arns" requirement="required" description="A map of user name to the ARN for that IAM user."/>

<HclListItem name="user_passwords" requirement="required" description="A map of user name to that user's AWS Web Console password, encrypted with that user's PGP key (only shows up for users with <a href=#create_login_profile><code>create_login_profile</code></a> = true). You can decrypt the password on the CLI: echo <password> | base64 --decode | keybase pgp decrypt"/>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"9777a04fc3902883c2a063ab11496eb4"}
##DOCS-SOURCER-END -->
