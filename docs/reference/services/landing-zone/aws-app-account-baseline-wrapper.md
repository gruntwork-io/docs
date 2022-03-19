---
type: "service"
name: "AWS App Account baseline wrapper"
description: "A security baseline for AWS Landing Zone for configuring app accounts (dev, stage, prod, and other similar child accounts), including setting up AWS Config, AWS CloudTrail, Amazon Guard Duty, IAM users, IAM groups, IAM password policy, and more."
category: "landing-zone"
cloud: "aws"
tags: ["aws-landing-zone","logging","security"]
license: "gruntwork"
built-with: "terraform"
title: "Account Baseline for app accounts"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import HclListItem from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.85.0" lastModifiedVersion="0.85.0"/>

# Account Baseline for app accounts


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/landingzone/account-baseline-app" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=landingzone%2Faccount-baseline-app" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

## Overview

A security baseline for AWS Landing Zone for configuring the app accounts (dev, stage, prod, and other similar child
accounts), including setting up AWS Config, AWS CloudTrail, Amazon Guard Duty, IAM users, IAM groups, IAM password
policy, and more.

## Features

Get a secure baseline for the app accounts of your AWS Organization that includes:

*   [aws-config-multi-region](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/aws-config-multi-region)
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

*   Learn more about each individual module, click the link in the [Features](#features) section.
*   [How to configure a production-grade AWS account structure](https://docs.gruntwork.io/guides/build-it-yourself/landing-zone/)
*   [How to use multi-region services](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/landingzone/account-baseline-root/core-concepts.md#how-to-use-multi-region-services)

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

<HclListItem name="config_opt_in_regions" requirement="required" description="Creates resources in the specified regions. The best practice is to enable AWS Config in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions." type="list" typeDetails="list(string)"/>

<HclListItem name="ebs_opt_in_regions" requirement="required" description="Creates resources in the specified regions. The best practice is to enable EBS Encryption in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions. The value provided for <a href=#global_recorder_region><code>global_recorder_region</code></a> must be in this list." type="list" typeDetails="list(string)"/>

<HclListItem name="guardduty_opt_in_regions" requirement="required" description="Creates resources in the specified regions. The best practice is to enable GuardDuty in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions. The value provided for <a href=#global_recorder_region><code>global_recorder_region</code></a> must be in this list." type="list" typeDetails="list(string)"/>

<HclListItem name="iam_access_analyzer_opt_in_regions" requirement="required" description="Creates resources in the specified regions. The best practice is to enable IAM Access Analyzer in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions. The value provided for <a href=#global_recorder_region><code>global_recorder_region</code></a> must be in this list." type="list" typeDetails="list(string)"/>

<HclListItem name="kms_cmk_opt_in_regions" requirement="required" description="Creates resources in the specified regions. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions. The value provided for <a href=#global_recorder_region><code>global_recorder_region</code></a> must be in this list." type="list" typeDetails="list(string)"/>

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

<HclListItem name="cloudtrail_external_aws_account_ids_with_write_access" requirement="optional" description="Provide a list of AWS account IDs that will be allowed to send CloudTrail logs to this account. This is only required if you are aggregating CloudTrail logs in this account (e.g., this is the logs account) from other accounts." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="cloudtrail_force_destroy" requirement="optional" description="If set to true, when you run 'terraform destroy', delete all objects from the bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!" type="bool" defaultValue="false"/>

<HclListItem name="cloudtrail_kms_key_administrator_iam_arns" requirement="optional" description="All CloudTrail Logs will be encrypted with a KMS CMK (Customer Master Key) that governs access to write API calls older than 7 days and all read API calls. If you are aggregating CloudTrail logs and creating the CMK in this account (e.g., if this is the logs account), you MUST specify at least one IAM user (or other IAM ARN) that will be given administrator permissions for CMK, including the ability to change who can access this CMK and the extended log data it protects. If you are aggregating CloudTrail logs in another AWS account and the CMK already exists (e.g., if this is the stage or prod account), set this parameter to an empty list." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="cloudtrail_kms_key_arn" requirement="optional" description="All CloudTrail Logs will be encrypted with a KMS CMK (Customer Master Key) that governs access to write API calls older than 7 days and all read API calls. If that CMK already exists (e.g., if this is the stage or prod account and you want to use a CMK that already exists in the logs account), set this to the ARN of that CMK. Otherwise (e.g., if this is the logs account), set this to null, and a new CMK will be created." type="string" defaultValue="null"/>

<HclListItem name="cloudtrail_kms_key_arn_is_alias" requirement="optional" description="If the <a href=#kms_key_arn><code>kms_key_arn</code></a> provided is an alias or alias ARN, then this must be set to true so that the module will exchange the alias for a CMK ARN. Setting this to true and using aliases requires <a href=#cloudtrail_allow_kms_describe_key_to_external_aws_accounts><code>cloudtrail_allow_kms_describe_key_to_external_aws_accounts</code></a> to also be true for multi-account scenarios." type="bool" defaultValue="false"/>

<HclListItem name="cloudtrail_kms_key_user_iam_arns" requirement="optional" description="All CloudTrail Logs will be encrypted with a KMS CMK (Customer Master Key) that governs access to write API calls older than 7 days and all read API calls. If you are aggregating CloudTrail logs and creating the CMK in this account (e.g., this is the logs account), you MUST specify at least one IAM user (or other IAM ARN) that will be given user access to this CMK, which will allow this user to read CloudTrail Logs. If you are aggregating CloudTrail logs in another AWS account and the CMK already exists, set this parameter to an empty list (e.g., if this is the stage or prod account)." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="cloudtrail_num_days_after_which_archive_log_data" requirement="optional" description="After this number of days, log files should be transitioned from S3 to Glacier. Enter 0 to never archive log data." type="number" defaultValue="30"/>

<HclListItem name="cloudtrail_num_days_after_which_delete_log_data" requirement="optional" description="After this number of days, log files should be deleted from S3. Enter 0 to never delete log data." type="number" defaultValue="365"/>

<HclListItem name="cloudtrail_num_days_to_retain_cloudwatch_logs" requirement="optional" description="After this number of days, logs stored in CloudWatch will be deleted. Possible values are: 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1827, 3653, and 0 (default). When set to 0, logs will be retained indefinitely." type="number" defaultValue="0"/>

<HclListItem name="cloudtrail_s3_bucket_already_exists" requirement="optional" description="Set to false to create an S3 bucket of name <a href=#cloudtrail_s3_bucket_name><code>cloudtrail_s3_bucket_name</code></a> in this account for storing CloudTrail logs (e.g., if this is the logs account). Set to true to assume the bucket specified in <a href=#cloudtrail_s3_bucket_name><code>cloudtrail_s3_bucket_name</code></a> already exists in another AWS account (e.g., if this is the stage or prod account and <a href=#cloudtrail_s3_bucket_name><code>cloudtrail_s3_bucket_name</code></a> is the name of a bucket in the logs account)." type="bool" defaultValue="true"/>

<HclListItem name="cloudtrail_s3_bucket_name" requirement="optional" description="The name of the S3 Bucket where CloudTrail logs will be stored. This could be a bucket in this AWS account (e.g., if this is the logs account) or the name of a bucket in another AWS account where logs should be sent (e.g., if this is the stage or prod account and you're specifying the name of a bucket in the logs account)." type="string" defaultValue="null"/>

<HclListItem name="cloudtrail_s3_mfa_delete" requirement="optional" description="Enable MFA delete for either 'Change the versioning state of your bucket' or 'Permanently delete an object version'. This setting only applies to the bucket used to storage Cloudtrail data. This cannot be used to toggle this setting but is available to allow managed buckets to reflect the state in AWS. For instructions on how to enable MFA Delete, check out the README from the terraform-aws-security/private-s3-bucket module." type="bool" defaultValue="false"/>

<HclListItem name="cloudtrail_tags" requirement="optional" description="Tags to apply to the CloudTrail resources." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="config_aggregate_config_data_in_external_account" requirement="optional" description="Set to true to send the AWS Config data to another account (e.g., a logs account) for aggregation purposes. You must set the ID of that other account via the <a href=#config_central_account_id><code>config_central_account_id</code></a> variable. This redundant variable has to exist because Terraform does not allow computed data in count and <a href=#for_each><code>for_each</code></a> parameters and <a href=#config_central_account_id><code>config_central_account_id</code></a> may be computed if its the ID of a newly-created AWS account." type="bool" defaultValue="false"/>

<HclListItem name="config_central_account_id" requirement="optional" description="If the S3 bucket and SNS topics used for AWS Config live in a different AWS account, set this variable to the ID of that account (e.g., if this is the stage or prod account, set this to the ID of the logs account). If the S3 bucket and SNS topics live in this account (e.g., this is the logs account), set this variable to null. Only used if <a href=#config_aggregate_config_data_in_external_account><code>config_aggregate_config_data_in_external_account</code></a> is true." type="string" defaultValue="null"/>

<HclListItem name="config_create_account_rules" requirement="optional" description="Set to true to create AWS Config rules directly in this account. Set false to not create any Config rules in this account (i.e., if you created the rules at the organization level already). We recommend setting this to true to use account-level rules because org-level rules create a chicken-and-egg problem with creating new accounts." type="bool" defaultValue="true"/>

<HclListItem name="config_delivery_channel_kms_key_arn" requirement="optional" description="Optional KMS key to use for encrypting S3 objects on the AWS Config delivery channel for an externally managed S3 bucket. This must belong to the same region as the destination S3 bucket. If null, AWS Config will default to encrypting the delivered data with AES-256 encryption. Only used if <a href=#should_create_s3_bucket><code>should_create_s3_bucket</code></a> is false - otherwise, <a href=#config_s3_bucket_kms_key_arn><code>config_s3_bucket_kms_key_arn</code></a> is used." type="string" defaultValue="null"/>

<HclListItem name="config_delivery_channel_kms_key_by_name" requirement="optional" description="Same as <a href=#config_delivery_channel_kms_key_arn><code>config_delivery_channel_kms_key_arn</code></a>, except the value is a name of a KMS key configured with <a href=#kms_customer_master_keys><code>kms_customer_master_keys</code></a>. The module created KMS key for the delivery region (indexed by the name) will be used. Note that if both <a href=#config_delivery_channel_kms_key_arn><code>config_delivery_channel_kms_key_arn</code></a> and <a href=#config_delivery_channel_kms_key_by_name><code>config_delivery_channel_kms_key_by_name</code></a> are configured, the key in <a href=#config_delivery_channel_kms_key_arn><code>config_delivery_channel_kms_key_arn</code></a> will always be used." type="object" typeDetails="object({
    name   = string
    region = string
  })" defaultValue="null"/>

<HclListItem name="config_force_destroy" requirement="optional" description="If set to true, when you run 'terraform destroy', delete all objects from the bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!" type="bool" defaultValue="false"/>

<HclListItem name="config_linked_accounts" requirement="optional" description="Provide a list of AWS account IDs that will be allowed to send AWS Config data to this account. This is only required if you are aggregating config data in this account (e.g., this is the logs account) from other accounts." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="config_num_days_after_which_archive_log_data" requirement="optional" description="After this number of days, log files should be transitioned from S3 to Glacier. Enter 0 to never archive log data." type="number" defaultValue="365"/>

<HclListItem name="config_num_days_after_which_delete_log_data" requirement="optional" description="After this number of days, log files should be deleted from S3. Enter 0 to never delete log data." type="number" defaultValue="730"/>

<HclListItem name="config_s3_bucket_kms_key_arn" requirement="optional" description="Optional KMS key to use for encrypting S3 objects on the AWS Config bucket, when the S3 bucket is created within this module (<a href=#config_should_create_s3_bucket><code>config_should_create_s3_bucket</code></a> is true). For encrypting S3 objects on delivery for an externally managed S3 bucket, refer to the <a href=#config_delivery_channel_kms_key_arn><code>config_delivery_channel_kms_key_arn</code></a> input variable. If null, data in S3 will be encrypted using the default aws/s3 key. If provided, the key policy of the provided key must permit the IAM role used by AWS Config. See https://docs.aws.amazon.com/sns/latest/dg/sns-key-management.html. Note that the KMS key must reside in the global recorder region (as configured by <a href=#aws_region><code>aws_region</code></a>)." type="string" defaultValue="null"/>

<HclListItem name="config_s3_bucket_kms_key_by_name" requirement="optional" description="Same as <a href=#config_s3_bucket_kms_key_arn><code>config_s3_bucket_kms_key_arn</code></a>, except the value is a name of a KMS key configured with <a href=#kms_customer_master_keys><code>kms_customer_master_keys</code></a>. The module created KMS key for the global recorder region (indexed by the name) will be used. Note that if both <a href=#config_s3_bucket_kms_key_arn><code>config_s3_bucket_kms_key_arn</code></a> and <a href=#config_s3_bucket_kms_key_by_name><code>config_s3_bucket_kms_key_by_name</code></a> are configured, the key in <a href=#config_s3_bucket_kms_key_arn><code>config_s3_bucket_kms_key_arn</code></a> will always be used." type="string" defaultValue="null"/>

<HclListItem name="config_s3_bucket_name" requirement="optional" description="The name of the S3 Bucket where Config items will be stored. Can be in the same account or in another account." type="string" defaultValue="null"/>

<HclListItem name="config_s3_mfa_delete" requirement="optional" description="Enable MFA delete for either 'Change the versioning state of your bucket' or 'Permanently delete an object version'. This setting only applies to the bucket used to storage AWS Config data. This cannot be used to toggle this setting but is available to allow managed buckets to reflect the state in AWS. For instructions on how to enable MFA Delete, check out the README from the terraform-aws-security/private-s3-bucket module." type="bool" defaultValue="false"/>

<HclListItem name="config_should_create_s3_bucket" requirement="optional" description="Set to true to create an S3 bucket of name <a href=#config_s3_bucket_name><code>config_s3_bucket_name</code></a> in this account for storing AWS Config data (e.g., if this is the logs account). Set to false to assume the bucket specified in <a href=#config_s3_bucket_name><code>config_s3_bucket_name</code></a> already exists in another AWS account (e.g., if this is the stage or prod account and <a href=#config_s3_bucket_name><code>config_s3_bucket_name</code></a> is the name of a bucket in the logs account)." type="bool" defaultValue="false"/>

<HclListItem name="config_should_create_sns_topic" requirement="optional" description="set to true to create an sns topic in this account for sending aws config notifications (e.g., if this is the logs account). set to false to assume the topic specified in <a href=#config_sns_topic_name><code>config_sns_topic_name</code></a> already exists in another aws account (e.g., if this is the stage or prod account and <a href=#config_sns_topic_name><code>config_sns_topic_name</code></a> is the name of an sns topic in the logs account)." type="bool" defaultValue="false"/>

<HclListItem name="config_sns_topic_kms_key_by_name_region_map" requirement="optional" description="Same as <a href=#config_sns_topic_kms_key_region_map><code>config_sns_topic_kms_key_region_map</code></a>, except the value is a name of a KMS key configured with <a href=#kms_customer_master_keys><code>kms_customer_master_keys</code></a>. The module created KMS key for each region (indexed by the name) will be used. Note that if an entry exists for a region in both <a href=#config_sns_topic_kms_key_region_map><code>config_sns_topic_kms_key_region_map</code></a> and <a href=#config_sns_topic_kms_key_by_name_region_map><code>config_sns_topic_kms_key_by_name_region_map</code></a>, then the key in <a href=#config_sns_topic_kms_key_region_map><code>config_sns_topic_kms_key_region_map</code></a> will always be used." type="map" typeDetails="map(string)" defaultValue="null"/>

<HclListItem name="config_sns_topic_kms_key_region_map" requirement="optional" description="Optional KMS key to use for each region for configuring default encryption for the SNS topic (encoded as a map from region - e.g. us-east-1 - to ARN of KMS key). If null or the region key is missing, encryption will not be configured for the SNS topic in that region." type="map" typeDetails="map(string)" defaultValue="null"/>

<HclListItem name="config_sns_topic_name" requirement="optional" description="the name of the sns topic in where aws config notifications will be sent. can be in the same account or in another account." type="string" defaultValue="ConfigTopic"/>

<HclListItem name="config_tags" requirement="optional" description="A map of tags to apply to the S3 Bucket. The key is the tag name and the value is the tag value." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="configrules_maximum_execution_frequency" requirement="optional" description="The maximum frequency with which AWS Config runs evaluations for the ´PERIODIC´ rules. See https://www.terraform.io/docs/providers/aws/r/<a href=#config_organization_managed_rule><code>config_organization_managed_rule</code></a>.html#<a href=#maximum_execution_frequency><code>maximum_execution_frequency</code></a>" type="string" defaultValue="TwentyFour_Hours"/>

<HclListItem name="custom_cloudtrail_trail_name" requirement="optional" description="A custom name to use for the Cloudtrail Trail. If null, defaults to the <a href=#name_prefix><code>name_prefix</code></a> input variable." type="string" defaultValue="null"/>

<HclListItem name="dev_permitted_services" requirement="optional" description="A list of AWS services for which the developers from the accounts in <a href=#allow_dev_access_from_other_account_arns><code>allow_dev_access_from_other_account_arns</code></a> will receive full permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to grant developers access only to EC2 and Amazon Machine Learning, use the value ['ec2','machinelearning']. Do NOT add iam to the list of services, or that will grant Developers de facto admin access." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="ebs_enable_encryption" requirement="optional" description="If set to true (default), all new EBS volumes will have encryption enabled by default" type="bool" defaultValue="true"/>

<HclListItem name="ebs_kms_key_name" requirement="optional" description="The name of the KMS CMK to use by default for encrypting EBS volumes, if <a href=#enable_encryption><code>enable_encryption</code></a> and <a href=#use_existing_kms_keys><code>use_existing_kms_keys</code></a> are enabled. The name must match the name given the <a href=#kms_customer_master_keys><code>kms_customer_master_keys</code></a> variable." type="string" defaultValue=""/>

<HclListItem name="ebs_use_existing_kms_keys" requirement="optional" description="If set to true, the KMS Customer Managed Keys (CMK) with the name in <a href=#ebs_kms_key_name><code>ebs_kms_key_name</code></a> will be set as the default for EBS encryption. When false (default), the AWS-managed aws/ebs key will be used." type="bool" defaultValue="false"/>

<HclListItem name="enable_cloudtrail" requirement="optional" description="Set to true (default) to enable CloudTrail in this app account. Set to false to disable CloudTrail (note: all other CloudTrail variables will be ignored). Note that if you have enabled organization trail in the root (parent) account, you should set this to false; the organization trail will enable CloudTrail on child accounts by default." type="bool" defaultValue="true"/>

<HclListItem name="enable_config" requirement="optional" description="Set to true to enable AWS Config in this app account. Set to false to disable AWS Config (note: all other AWS config variables will be ignored)." type="bool" defaultValue="true"/>

<HclListItem name="enable_encrypted_volumes" requirement="optional" description="Checks whether the EBS volumes that are in an attached state are encrypted." type="bool" defaultValue="true"/>

<HclListItem name="enable_github_actions_access" requirement="optional" description="When true, create an Open ID Connect Provider that GitHub actions can use to assume IAM roles in the account. Refer to https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services for more information." type="bool" defaultValue="false"/>

<HclListItem name="enable_iam_access_analyzer" requirement="optional" description="A feature flag to enable or disable this module." type="bool" defaultValue="false"/>

<HclListItem name="enable_iam_cross_account_roles" requirement="optional" description="A feature flag to enable or disable this module." type="bool" defaultValue="true"/>

<HclListItem name="enable_iam_password_policy" requirement="optional" description="Checks whether the account password policy for IAM users meets the specified requirements." type="bool" defaultValue="true"/>

<HclListItem name="enable_iam_user_password_policy" requirement="optional" description="Set to true (default) to enable the IAM User Password Policies in this app account. Set to false to disable the policies. (Note: all other IAM User Password Policy variables will be ignored)." type="bool" defaultValue="true"/>

<HclListItem name="enable_insecure_sg_rules" requirement="optional" description="Checks whether the security group with 0.0.0.0/0 of any Amazon Virtual Private Cloud (Amazon VPC) allows only specific inbound TCP or UDP traffic." type="bool" defaultValue="true"/>

<HclListItem name="enable_rds_storage_encrypted" requirement="optional" description="Checks whether storage encryption is enabled for your RDS DB instances." type="bool" defaultValue="true"/>

<HclListItem name="enable_root_account_mfa" requirement="optional" description="Checks whether users of your AWS account require a multi-factor authentication (MFA) device to sign in with root credentials." type="bool" defaultValue="true"/>

<HclListItem name="enable_s3_bucket_public_read_prohibited" requirement="optional" description="Checks that your Amazon S3 buckets do not allow public read access." type="bool" defaultValue="true"/>

<HclListItem name="enable_s3_bucket_public_write_prohibited" requirement="optional" description="Checks that your Amazon S3 buckets do not allow public write access." type="bool" defaultValue="true"/>

<HclListItem name="encrypted_volumes_kms_id" requirement="optional" description="ID or ARN of the KMS key that is used to encrypt the volume. Used for configuring the encrypted volumes config rule." type="string" defaultValue="null"/>

<HclListItem name="github_actions_openid_connect_provider_thumbprint_list" requirement="optional" description="When set, use the statically provided hardcoded list of thumbprints rather than looking it up dynamically. This is useful if you want to trade reliability of the OpenID Connect Provider across certificate renewals with a static list that is obtained using a trustworthy mechanism, to mitigate potential damage from a domain hijacking attack on GitHub domains." type="list" typeDetails="list(string)" defaultValue="null"/>

<HclListItem name="guardduty_cloudwatch_event_rule_name" requirement="optional" description="Name of the Cloudwatch event rules." type="string" defaultValue="guardduty-finding-events"/>

<HclListItem name="guardduty_finding_publishing_frequency" requirement="optional" description="Specifies the frequency of notifications sent for subsequent finding occurrences. If the detector is a GuardDuty member account, the value is determined by the GuardDuty master account and cannot be modified, otherwise defaults to <a href=#SIX_HOURS><code>SIX_HOURS</code></a>. For standalone and GuardDuty master accounts, it must be configured in Terraform to enable drift detection. Valid values for standalone and master accounts: <a href=#FIFTEEN_MINUTES><code>FIFTEEN_MINUTES</code></a>, <a href=#ONE_HOUR><code>ONE_HOUR</code></a>, <a href=#SIX_HOURS><code>SIX_HOURS</code></a>." type="string" defaultValue="null"/>

<HclListItem name="guardduty_findings_sns_topic_name" requirement="optional" description="Specifies a name for the created SNS topics where findings are published. <a href=#publish_findings_to_sns><code>publish_findings_to_sns</code></a> must be set to true." type="string" defaultValue="guardduty-findings"/>

<HclListItem name="guardduty_publish_findings_to_sns" requirement="optional" description="Send GuardDuty findings to SNS topics specified by <a href=#findings_sns_topic_name><code>findings_sns_topic_name</code></a>." type="bool" defaultValue="false"/>

<HclListItem name="iam_access_analyzer_name" requirement="optional" description="The name of the IAM Access Analyzer module" type="string" defaultValue="baseline_app-iam_access_analyzer"/>

<HclListItem name="iam_access_analyzer_type" requirement="optional" description="If set to ORGANIZATION, the analyzer will be scanning the current organization and any policies that refer to linked resources such as S3, IAM, Lambda and SQS policies." type="string" defaultValue="ORGANIZATION"/>

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

<HclListItem name="kms_cmk_global_tags" requirement="optional" description="A map of tags to apply to all KMS Keys to be created. In this map variable, the key is the tag name and the value is the tag value." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="kms_customer_master_keys" requirement="optional" description="You can use this variable to create account-level KMS Customer Master Keys (CMKs) for encrypting and decrypting data. This variable should be a map where the keys are the names of the CMK and the values are an object that defines the configuration for that CMK. See the comment below for the configuration options you can set for each key." type="any" defaultValue="{}"/>

<HclListItem name="kms_grant_regions" requirement="optional" description="The map of names of KMS grants to the region where the key resides in. There should be a one to one mapping between entries in this map and the entries of the <a href=#kms_grants><code>kms_grants</code></a> map. This is used to workaround a terraform limitation where the <a href=#for_each><code>for_each</code></a> value can not depend on resources." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="kms_grants" requirement="optional" description="Create the specified KMS grants to allow entities to use the KMS key without modifying the KMS policy or IAM. This is necessary to allow AWS services (e.g. ASG) to use CMKs encrypt and decrypt resources. The input is a map of grant name to grant properties. The name must be unique per account." type="map" typeDetails="map(object({
    # ARN of the KMS CMK that the grant applies to. Note that the region is introspected based on the ARN.
    kms_cmk_arn = string
    # The principal that is given permission to perform the operations that the grant permits. This must be in ARN
    # format. For example, the grantee principal for ASG is:
    # arn:aws:iam::111122223333:role/aws-service-role/autoscaling.amazonaws.com/AWSServiceRoleForAutoScaling
    grantee_principal = string
    # A list of operations that the grant permits. The permitted values are:
    # Decrypt, Encrypt, GenerateDataKey, GenerateDataKeyWithoutPlaintext, ReEncryptFrom, ReEncryptTo, CreateGrant,
    # RetireGrant, DescribeKey
    granted_operations = list(string)
  }))" defaultValue="{}"/>

<HclListItem name="max_session_duration_human_users" requirement="optional" description="The maximum allowable session duration, in seconds, for the credentials you get when assuming the IAM roles created by this module. This variable applies to all IAM roles created by this module that are intended for people to use, such as allow-read-only-access-from-other-accounts. For IAM roles that are intended for machine users, such as allow-auto-deploy-from-other-accounts, see <a href=#max_session_duration_machine_users><code>max_session_duration_machine_users</code></a>." type="number" defaultValue="43200"/>

<HclListItem name="max_session_duration_machine_users" requirement="optional" description="The maximum allowable session duration, in seconds, for the credentials you get when assuming the IAM roles created by this module. This variable  applies to all IAM roles created by this module that are intended for machine users, such as allow-auto-deploy-from-other-accounts. For IAM roles that are intended for human users, such as allow-read-only-access-from-other-accounts, see <a href=#max_session_duration_human_users><code>max_session_duration_human_users</code></a>." type="number" defaultValue="3600"/>

<HclListItem name="rds_storage_encrypted_kms_id" requirement="optional" description="KMS key ID or ARN used to encrypt the storage. Used for configuring the RDS storage encryption config rule." type="string" defaultValue="null"/>

<HclListItem name="service_linked_roles" requirement="optional" description="Create service-linked roles for this set of services. You should pass in the URLs of the services, but without the protocol (e.g., http://) in front: e.g., use elasticbeanstalk.amazonaws.com for Elastic Beanstalk or es.amazonaws.com for Amazon Elasticsearch. Service-linked roles are predefined by the service, can typically only be assumed by that service, and include all the permissions that the service requires to call other AWS services on your behalf. You can typically only create one such role per AWS account, which is why this parameter exists in the account baseline. See https://docs.aws.amazon.com/IAM/latest/UserGuide/<a href=#reference_aws><code>reference_aws</code></a>-services-that-work-with-iam.html for the list of services that support service-linked roles." type="set" defaultValue="[]"/>

<HclListItem name="should_require_mfa" requirement="optional" description="Should we require that all IAM Users use Multi-Factor Authentication for both AWS API calls and the AWS Web Console? (true or false)" type="bool" defaultValue="true"/>

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

<HclListItem name="cloudtrail_cloudwatch_group_arn" requirement="required" description="The ARN of the cloudwatch log group."/>

<HclListItem name="cloudtrail_cloudwatch_group_name" requirement="required" description="The name of the cloudwatch log group."/>

<HclListItem name="cloudtrail_iam_role_arn" requirement="required" description="The ARN of the IAM role used by the cloudwatch log group."/>

<HclListItem name="cloudtrail_iam_role_name" requirement="required" description="The name of the IAM role used by the cloudwatch log group."/>

<HclListItem name="cloudtrail_kms_key_alias_name" requirement="required" description="The alias of the KMS key used by the S3 bucket to encrypt cloudtrail logs."/>

<HclListItem name="cloudtrail_kms_key_arn" requirement="required" description="The ARN of the KMS key used by the S3 bucket to encrypt cloudtrail logs."/>

<HclListItem name="cloudtrail_s3_access_logging_bucket_name" requirement="required" description="The name of the S3 bucket where server access logs are delivered."/>

<HclListItem name="cloudtrail_s3_bucket_name" requirement="required" description="The name of the S3 bucket where cloudtrail logs are delivered."/>

<HclListItem name="cloudtrail_trail_arn" requirement="required" description="The ARN of the cloudtrail trail."/>

<HclListItem name="config_iam_role_arns" requirement="required" description="The ARNs of the IAM role used by the config recorder."/>

<HclListItem name="config_recorder_names" requirement="required" description="The names of the configuration recorder."/>

<HclListItem name="config_s3_bucket_names" requirement="required" description="The names of the S3 bucket used by AWS Config to store configuration items."/>

<HclListItem name="config_sns_topic_arns" requirement="required" description="The ARNs of the SNS Topic used by the config notifications."/>

<HclListItem name="github_actions_iam_openid_connect_provider_arn" requirement="required" description="ARN of the OpenID Connect Provider that can be used to attach AWS IAM Roles to GitHub Actions."/>

<HclListItem name="github_actions_iam_openid_connect_provider_url" requirement="required" description="URL of the OpenID Connect Provider that can be used to attach AWS IAM Roles to GitHub Actions."/>

<HclListItem name="guardduty_cloudwatch_event_rule_arns" requirement="required" description="The ARNs of the cloudwatch event rules used to publish findings to sns if <a href=#publish_findings_to_sns><code>publish_findings_to_sns</code></a> is set to true."/>

<HclListItem name="guardduty_cloudwatch_event_target_arns" requirement="required" description="The ARNs of the cloudwatch event targets used to publish findings to sns if <a href=#publish_findings_to_sns><code>publish_findings_to_sns</code></a> is set to true."/>

<HclListItem name="guardduty_detector_ids" requirement="required" description="The IDs of the GuardDuty detectors."/>

<HclListItem name="guardduty_findings_sns_topic_arns" requirement="required" description="The ARNs of the SNS topics where findings are published if <a href=#publish_findings_to_sns><code>publish_findings_to_sns</code></a> is set to true."/>

<HclListItem name="guardduty_findings_sns_topic_names" requirement="required" description="The names of the SNS topic where findings are published if <a href=#publish_findings_to_sns><code>publish_findings_to_sns</code></a> is set to true."/>

<HclListItem name="invalid_cmk_inputs" requirement="required" description="Map of CMKs from the input <a href=#customer_master_keys><code>customer_master_keys</code></a> that had an invalid region, and thus were not created. The structure of the map is the same as the input. This will only include KMS key inputs that were not created because the region attribute was invalid (either not a valid region identifier, the region is not enabled on the account, or the region is not included in the <a href=#opt_in_regions><code>opt_in_regions</code></a> input)."/>

<HclListItem name="kms_key_aliases" requirement="required" description="A map from region to aliases of the KMS CMKs that were created. The value will also be a map mapping the keys from the <a href=#customer_master_keys><code>customer_master_keys</code></a> input variable to the corresponding alias."/>

<HclListItem name="kms_key_arns" requirement="required" description="A map from region to ARNs of the KMS CMKs that were created. The value will also be a map mapping the keys from the <a href=#kms_customer_master_keys><code>kms_customer_master_keys</code></a> input variable to the corresponding ARN."/>

<HclListItem name="kms_key_ids" requirement="required" description="A map from region to IDs of the KMS CMKs that were created. The value will also be a map mapping the keys from the <a href=#kms_customer_master_keys><code>kms_customer_master_keys</code></a> input variable to the corresponding ID."/>

<HclListItem name="service_linked_role_arns" requirement="required" description="A map of ARNs of the service linked roles created from <a href=#service_linked_roles><code>service_linked_roles</code></a>."/>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"a0a83fedb21ff4f44abfca316385f437"}
##DOCS-SOURCER-END -->
