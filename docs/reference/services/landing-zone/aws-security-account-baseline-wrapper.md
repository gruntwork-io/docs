import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# AWS Security Account baseline wrapper

A security baseline for AWS Landing Zone for configuring the security account (the one where all your IAM users and IAM groups are defined), including setting up AWS Config, AWS CloudTrail, Amazon Guard Duty, IAM users, IAM groups, IAM password policy, and more.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/landingzone/account-baseline-security" className="link-button">View on GitHub</a>

### Reference

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

* [**`allow_logs_access_from_other_account_arns`**](#allow_logs_access_from_other_account_arns) &mdash; A list of IAM ARNs from other AWS accounts that will be allowed access to the logs in CloudTrail, AWS Config, and CloudWatch for this account. Will also be given permissions to decrypt with the KMS CMK that is used to encrypt CloudTrail logs.

<a name="allow_read_only_access_from_other_account_arns" className="snap-top"></a>

* [**`allow_read_only_access_from_other_account_arns`**](#allow_read_only_access_from_other_account_arns) &mdash; A list of IAM ARNs from other AWS accounts that will be allowed read-only access to this account.

<a name="allow_ssh_grunt_access_from_other_account_arns" className="snap-top"></a>

* [**`allow_ssh_grunt_access_from_other_account_arns`**](#allow_ssh_grunt_access_from_other_account_arns) &mdash; A list of IAM ARNs from other AWS accounts that will be allowed read access to IAM groups and publish SSH keys. This is used for ssh-grunt.

<a name="allow_support_access_from_other_account_arns" className="snap-top"></a>

* [**`allow_support_access_from_other_account_arns`**](#allow_support_access_from_other_account_arns) &mdash; A list of IAM ARNs from other AWS accounts that will be allowed support access (AWSSupportAccess) to this account.

<a name="auto_deploy_permissions" className="snap-top"></a>

* [**`auto_deploy_permissions`**](#auto_deploy_permissions) &mdash; A list of IAM permissions (e.g. ec2:*) that will be added to an IAM Group for doing automated deployments. NOTE: If [`should_create_iam_group_auto_deploy`](#should_create_iam_group_auto_deploy) is true, the list must have at least one element (e.g. '*').

<a name="aws_account_id" className="snap-top"></a>

* [**`aws_account_id`**](#aws_account_id) &mdash; The AWS Account ID the template should be operated on. This avoids misconfiguration errors caused by environment variables.

<a name="aws_region" className="snap-top"></a>

* [**`aws_region`**](#aws_region) &mdash; The AWS Region to use as the global config recorder and seed region for GuardDuty.

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

<a name="cloudtrail_external_aws_account_ids_with_write_access" className="snap-top"></a>

* [**`cloudtrail_external_aws_account_ids_with_write_access`**](#cloudtrail_external_aws_account_ids_with_write_access) &mdash; A list of external AWS accounts that should be given write access for CloudTrail logs to this S3 bucket. This is useful when aggregating CloudTrail logs for multiple AWS accounts in one common S3 bucket.

<a name="cloudtrail_force_destroy" className="snap-top"></a>

* [**`cloudtrail_force_destroy`**](#cloudtrail_force_destroy) &mdash; If set to true, when you run 'terraform destroy', delete all objects from the bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!

<a name="cloudtrail_kms_key_administrator_iam_arns" className="snap-top"></a>

* [**`cloudtrail_kms_key_administrator_iam_arns`**](#cloudtrail_kms_key_administrator_iam_arns) &mdash; All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key) that governs access to write API calls older than 7 days and all read API calls. The IAM Users specified in this list will have rights to change who can access this extended log data.

<a name="cloudtrail_kms_key_arn" className="snap-top"></a>

* [**`cloudtrail_kms_key_arn`**](#cloudtrail_kms_key_arn) &mdash; All CloudTrail Logs will be encrypted with a KMS CMK (Customer Master Key) that governs access to write API calls older than 7 days and all read API calls. If that CMK already exists, set this to the ARN of that CMK. Otherwise, set this to null, and a new CMK will be created. We recommend setting this to the ARN of a CMK that already exists in a separate logs account.

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

<a name="cloudtrail_s3_bucket_already_exists" className="snap-top"></a>

* [**`cloudtrail_s3_bucket_already_exists`**](#cloudtrail_s3_bucket_already_exists) &mdash; Set to false to create an S3 bucket of name [`cloudtrail_s3_bucket_name`](#cloudtrail_s3_bucket_name) in this account for storing CloudTrail logs. Set to true to assume the bucket specified in [`cloudtrail_s3_bucket_name`](#cloudtrail_s3_bucket_name) already exists in another AWS account. We recommend setting this to true and setting [`cloudtrail_s3_bucket_name`](#cloudtrail_s3_bucket_name) to the name of a bucket that already exists in a separate logs account.

<a name="cloudtrail_s3_bucket_name" className="snap-top"></a>

* [**`cloudtrail_s3_bucket_name`**](#cloudtrail_s3_bucket_name) &mdash; The name of the S3 Bucket where CloudTrail logs will be stored. If value is `null`, defaults to [``var.name_prefix`](#`var.name_prefix)`-cloudtrail

<a name="cloudtrail_s3_mfa_delete" className="snap-top"></a>

* [**`cloudtrail_s3_mfa_delete`**](#cloudtrail_s3_mfa_delete) &mdash; Enable MFA delete for either 'Change the versioning state of your bucket' or 'Permanently delete an object version'. This setting only applies to the bucket used to storage Cloudtrail data. This cannot be used to toggle this setting but is available to allow managed buckets to reflect the state in AWS. For instructions on how to enable MFA Delete, check out the README from the terraform-aws-security/private-s3-bucket module.

<a name="cloudtrail_tags" className="snap-top"></a>

* [**`cloudtrail_tags`**](#cloudtrail_tags) &mdash; Tags to apply to the CloudTrail resources.

<a name="config_aggregate_config_data_in_external_account" className="snap-top"></a>

* [**`config_aggregate_config_data_in_external_account`**](#config_aggregate_config_data_in_external_account) &mdash; Set to true to send the AWS Config data to another account (e.g., a logs account) for aggregation purposes. You must set the ID of that other account via the [`config_central_account_id`](#config_central_account_id) variable. This redundant variable has to exist because Terraform does not allow computed data in count and [`for_each`](#for_each) parameters and [`config_central_account_id`](#config_central_account_id) may be computed if its the ID of a newly-created AWS account.

<a name="config_central_account_id" className="snap-top"></a>

* [**`config_central_account_id`**](#config_central_account_id) &mdash; If the S3 bucket and SNS topics used for AWS Config live in a different AWS account, set this variable to the ID of that account. If the S3 bucket and SNS topics live in this account, set this variable to null. We recommend setting this to the ID of a separate logs account. Only used if [`config_aggregate_config_data_in_external_account`](#config_aggregate_config_data_in_external_account) is true.

<a name="config_create_account_rules" className="snap-top"></a>

* [**`config_create_account_rules`**](#config_create_account_rules) &mdash; Set to true to create AWS Config rules directly in this account. Set false to not create any Config rules in this account (i.e., if you created the rules at the organization level already). We recommend setting this to true to use account-level rules because org-level rules create a chicken-and-egg problem with creating new accounts.

<a name="config_force_destroy" className="snap-top"></a>

* [**`config_force_destroy`**](#config_force_destroy) &mdash; If set to true, when you run 'terraform destroy', delete all objects from the bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!

<a name="config_linked_accounts" className="snap-top"></a>

* [**`config_linked_accounts`**](#config_linked_accounts) &mdash; Provide a list of AWS account IDs that will send Config data to this account. This is useful if your aggregating config data in this account for other accounts.

<a name="config_num_days_after_which_archive_log_data" className="snap-top"></a>

* [**`config_num_days_after_which_archive_log_data`**](#config_num_days_after_which_archive_log_data) &mdash; After this number of days, log files should be transitioned from S3 to Glacier. Enter 0 to never archive log data.

<a name="config_num_days_after_which_delete_log_data" className="snap-top"></a>

* [**`config_num_days_after_which_delete_log_data`**](#config_num_days_after_which_delete_log_data) &mdash; After this number of days, log files should be deleted from S3. Enter 0 to never delete log data.

<a name="config_opt_in_regions" className="snap-top"></a>

* [**`config_opt_in_regions`**](#config_opt_in_regions) &mdash; Creates resources in the specified regions. The best practice is to enable AWS Config in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions.

<a name="config_s3_bucket_name" className="snap-top"></a>

* [**`config_s3_bucket_name`**](#config_s3_bucket_name) &mdash; The name of the S3 Bucket where CloudTrail logs will be stored. This could be a bucket in this AWS account or the name of a bucket in another AWS account where logs should be sent. We recommend setting this to the name of a bucket in a separate logs account.

<a name="config_s3_mfa_delete" className="snap-top"></a>

* [**`config_s3_mfa_delete`**](#config_s3_mfa_delete) &mdash; Enable MFA delete for either 'Change the versioning state of your bucket' or 'Permanently delete an object version'. This setting only applies to the bucket used to storage AWS Config data. This cannot be used to toggle this setting but is available to allow managed buckets to reflect the state in AWS. For instructions on how to enable MFA Delete, check out the README from the terraform-aws-security/private-s3-bucket module.

<a name="config_should_create_s3_bucket" className="snap-top"></a>

* [**`config_should_create_s3_bucket`**](#config_should_create_s3_bucket) &mdash; Set to true to create an S3 bucket of name [`config_s3_bucket_name`](#config_s3_bucket_name) in this account for storing AWS Config data. Set to false to assume the bucket specified in [`config_s3_bucket_name`](#config_s3_bucket_name) already exists in another AWS account. We recommend setting this to false and setting [`config_s3_bucket_name`](#config_s3_bucket_name) to the name off an S3 bucket that already exists in a separate logs account.

<a name="config_should_create_sns_topic" className="snap-top"></a>

* [**`config_should_create_sns_topic`**](#config_should_create_sns_topic) &mdash; Set to true to create an SNS topic in this account for sending AWS Config notifications (e.g., if this is the logs account). Set to false to assume the topic specified in [`config_sns_topic_name`](#config_sns_topic_name) already exists in another AWS account (e.g., if this is the stage or prod account and [`config_sns_topic_name`](#config_sns_topic_name) is the name of an SNS topic in the logs account).

<a name="config_sns_topic_name" className="snap-top"></a>

* [**`config_sns_topic_name`**](#config_sns_topic_name) &mdash; The name of the SNS Topic in where AWS Config notifications will be sent. Can be in the same account or in another account.

<a name="config_tags" className="snap-top"></a>

* [**`config_tags`**](#config_tags) &mdash; A map of tags to apply to the S3 Bucket. The key is the tag name and the value is the tag value.

<a name="configrules_maximum_execution_frequency" className="snap-top"></a>

* [**`configrules_maximum_execution_frequency`**](#configrules_maximum_execution_frequency) &mdash; The maximum frequency with which AWS Config runs evaluations for the ´PERIODIC´ rules. See [`https://www.terraform.io/docs/providers/aws/r/config_organization_managed_rule.html#maximum_execution_frequency`](#https://www.terraform.io/docs/providers/aws/r/config_organization_managed_rule.html#maximum_execution_frequency)

<a name="cross_account_access_all_group_name" className="snap-top"></a>

* [**`cross_account_access_all_group_name`**](#cross_account_access_all_group_name) &mdash; The name of the IAM group that will grant access to all external AWS accounts in [`iam_groups_for_cross_account_access`](#iam_groups_for_cross_account_access).

<a name="dev_permitted_services" className="snap-top"></a>

* [**`dev_permitted_services`**](#dev_permitted_services) &mdash; A list of AWS services for which the developers from the accounts in [`allow_dev_access_from_other_account_arns`](#allow_dev_access_from_other_account_arns) will receive full permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to grant developers access only to EC2 and Amazon Machine Learning, use the value ["ec2","machinelearning"]. Do NOT add iam to the list of services, or that will grant Developers de facto admin access.

<a name="ebs_enable_encryption" className="snap-top"></a>

* [**`ebs_enable_encryption`**](#ebs_enable_encryption) &mdash; If set to true (default), all new EBS volumes will have encryption enabled by default

<a name="ebs_kms_key_name" className="snap-top"></a>

* [**`ebs_kms_key_name`**](#ebs_kms_key_name) &mdash; The name of the KMS CMK to use by default for encrypting EBS volumes, if [`ebs_enable_encryption`](#ebs_enable_encryption) and [`ebs_use_existing_kms_keys`](#ebs_use_existing_kms_keys) are enabled. The name must match a name given the [`kms_customer_master_keys`](#kms_customer_master_keys) variable.

<a name="ebs_opt_in_regions" className="snap-top"></a>

* [**`ebs_opt_in_regions`**](#ebs_opt_in_regions) &mdash; Creates resources in the specified regions. The best practice is to enable EBS Encryption in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions. The value provided for [`global_recorder_region`](#global_recorder_region) must be in this list.

<a name="ebs_use_existing_kms_keys" className="snap-top"></a>

* [**`ebs_use_existing_kms_keys`**](#ebs_use_existing_kms_keys) &mdash; If set to true, the KMS Customer Managed Keys (CMK) with the name in [`ebs_kms_key_name`](#ebs_kms_key_name) will be set as the default for EBS encryption. When false (default), the AWS-managed aws/ebs key will be used.

<a name="enable_cloudtrail" className="snap-top"></a>

* [**`enable_cloudtrail`**](#enable_cloudtrail) &mdash; Set to true (default) to enable CloudTrail in the security account. Set to false to disable CloudTrail (note: all other CloudTrail variables will be ignored). Note that if you have enabled organization trail in the root (parent) account, you should set this to false; the organization trail will enable CloudTrail on child accounts by default.

<a name="enable_config" className="snap-top"></a>

* [**`enable_config`**](#enable_config) &mdash; Set to true to enable AWS Config in the security account. Set to false to disable AWS Config (note: all other AWS config variables will be ignored).

<a name="enable_encrypted_volumes" className="snap-top"></a>

* [**`enable_encrypted_volumes`**](#enable_encrypted_volumes) &mdash; Checks whether the EBS volumes that are in an attached state are encrypted.

<a name="enable_github_actions_access" className="snap-top"></a>

* [**`enable_github_actions_access`**](#enable_github_actions_access) &mdash; When true, create an Open ID Connect Provider that GitHub actions can use to assume IAM roles in the account. Refer to https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services for more information.

<a name="enable_iam_access_analyzer" className="snap-top"></a>

* [**`enable_iam_access_analyzer`**](#enable_iam_access_analyzer) &mdash; A feature flag to enable or disable this module.

<a name="enable_iam_cross_account_roles" className="snap-top"></a>

* [**`enable_iam_cross_account_roles`**](#enable_iam_cross_account_roles) &mdash; A feature flag to enable or disable the Cross Account Iam Roles module.

<a name="enable_iam_groups" className="snap-top"></a>

* [**`enable_iam_groups`**](#enable_iam_groups) &mdash; A feature flag to enable or disable the IAM Groups module.

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

<a name="github_actions_openid_connect_provider_thumbprint_list" className="snap-top"></a>

* [**`github_actions_openid_connect_provider_thumbprint_list`**](#github_actions_openid_connect_provider_thumbprint_list) &mdash; When set, use the statically provided hardcoded list of thumbprints rather than looking it up dynamically. This is useful if you want to trade reliability of the OpenID Connect Provider across certificate renewals with a static list that is obtained using a trustworthy mechanism, to mitigate potential damage from a domain hijacking attack on GitHub domains.

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

* [**`iam_access_analyzer_type`**](#iam_access_analyzer_type) &mdash; If set to ACCOUNT, the analyzer will only be scanning the current AWS account it's in. If set to ORGANIZATION - will scan the organization AWS account and the child accounts.

<a name="iam_group_developers_permitted_services" className="snap-top"></a>

* [**`iam_group_developers_permitted_services`**](#iam_group_developers_permitted_services) &mdash; A list of AWS services for which the developers IAM Group will receive full permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to grant developers access only to EC2 and Amazon Machine Learning, use the value ["ec2","machinelearning"]. Do NOT add iam to the list of services, or that will grant Developers de facto admin access. If you need to grant iam privileges, just grant the user Full Access.

<a name="iam_group_name_auto_deploy" className="snap-top"></a>

* [**`iam_group_name_auto_deploy`**](#iam_group_name_auto_deploy) &mdash; The name of the IAM Group that allows automated deployment by graning the permissions specified in [`auto_deploy_permissions`](#auto_deploy_permissions).

<a name="iam_group_name_billing" className="snap-top"></a>

* [**`iam_group_name_billing`**](#iam_group_name_billing) &mdash; The name to be used for the IAM Group that grants read/write access to all billing features in AWS.

<a name="iam_group_name_developers" className="snap-top"></a>

* [**`iam_group_name_developers`**](#iam_group_name_developers) &mdash; The name to be used for the IAM Group that grants IAM Users a reasonable set of permissions for developers.

<a name="iam_group_name_full_access" className="snap-top"></a>

* [**`iam_group_name_full_access`**](#iam_group_name_full_access) &mdash; The name to be used for the IAM Group that grants full access to all AWS resources.

<a name="iam_group_name_houston_cli" className="snap-top"></a>

* [**`iam_group_name_houston_cli`**](#iam_group_name_houston_cli) &mdash; The name of the IAM Group that allows access to houston CLI.

<a name="iam_group_name_iam_admin" className="snap-top"></a>

* [**`iam_group_name_iam_admin`**](#iam_group_name_iam_admin) &mdash; The name to be used for the IAM Group that grants IAM administrative access. Effectively grants administrator access.

<a name="iam_group_name_iam_user_self_mgmt" className="snap-top"></a>

* [**`iam_group_name_iam_user_self_mgmt`**](#iam_group_name_iam_user_self_mgmt) &mdash; The name to be used for the IAM Group that grants IAM Users the permissions to manage their own IAM User account.

<a name="iam_group_name_logs" className="snap-top"></a>

* [**`iam_group_name_logs`**](#iam_group_name_logs) &mdash; The name to be used for the IAM Group that grants read access to CloudTrail, AWS Config, and CloudWatch in AWS.

<a name="iam_group_name_read_only" className="snap-top"></a>

* [**`iam_group_name_read_only`**](#iam_group_name_read_only) &mdash; The name to be used for the IAM Group that grants read-only access to all AWS resources.

<a name="iam_group_name_support" className="snap-top"></a>

* [**`iam_group_name_support`**](#iam_group_name_support) &mdash; The name of the IAM Group that allows access to AWS Support.

<a name="iam_group_name_use_existing_iam_roles" className="snap-top"></a>

* [**`iam_group_name_use_existing_iam_roles`**](#iam_group_name_use_existing_iam_roles) &mdash; The name to be used for the IAM Group that grants IAM Users the permissions to use existing IAM Roles when launching AWS Resources. This does NOT grant the permission to create new IAM Roles.

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

<a name="iam_policy_iam_user_self_mgmt" className="snap-top"></a>

* [**`iam_policy_iam_user_self_mgmt`**](#iam_policy_iam_user_self_mgmt) &mdash; The name to be used for the IAM Policy that grants IAM Users the permissions to manage their own IAM User account.

<a name="iam_role_tags" className="snap-top"></a>

* [**`iam_role_tags`**](#iam_role_tags) &mdash; The tags to apply to all the IAM role resources.

<a name="insecure_sg_rules_authorized_tcp_ports" className="snap-top"></a>

* [**`insecure_sg_rules_authorized_tcp_ports`**](#insecure_sg_rules_authorized_tcp_ports) &mdash; Comma-separated list of TCP ports authorized to be open to 0.0.0.0/0. Ranges are defined by a dash; for example, '443,1020-1025'.

<a name="insecure_sg_rules_authorized_udp_ports" className="snap-top"></a>

* [**`insecure_sg_rules_authorized_udp_ports`**](#insecure_sg_rules_authorized_udp_ports) &mdash; Comma-separated list of UDP ports authorized to be open to 0.0.0.0/0. Ranges are defined by a dash; for example, '500,1020-1025'.

<a name="kms_cmk_global_tags" className="snap-top"></a>

* [**`kms_cmk_global_tags`**](#kms_cmk_global_tags) &mdash; A map of tags to apply to all KMS Keys to be created. In this map variable, the key is the tag name and the value is the tag value.

<a name="kms_cmk_opt_in_regions" className="snap-top"></a>

* [**`kms_cmk_opt_in_regions`**](#kms_cmk_opt_in_regions) &mdash; Creates resources in the specified regions. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions. The value provided for [`global_recorder_region`](#global_recorder_region) must be in this list.

<a name="kms_customer_master_keys" className="snap-top"></a>

* [**`kms_customer_master_keys`**](#kms_customer_master_keys) &mdash; You can use this variable to create account-level KMS Customer Master Keys (CMKs) for encrypting and decrypting data. This variable should be a map where the keys are the names of the CMK and the values are an object that defines the configuration for that CMK. See the comment below for the configuration options you can set for each key.

<a name="kms_grant_regions" className="snap-top"></a>

* [**`kms_grant_regions`**](#kms_grant_regions) &mdash; The map of names of KMS grants to the region where the key resides in. There should be a one to one mapping between entries in this map and the entries of the [`kms_grants`](#kms_grants) map. This is used to workaround a terraform limitation where the [`for_each`](#for_each) value can not depend on resources.

<a name="kms_grants" className="snap-top"></a>

* [**`kms_grants`**](#kms_grants) &mdash; Create the specified KMS grants to allow entities to use the KMS key without modifying the KMS policy or IAM. This is necessary to allow AWS services (e.g. ASG) to use CMKs encrypt and decrypt resources. The input is a map of grant name to grant properties. The name must be unique per account.

<a name="max_session_duration_human_users" className="snap-top"></a>

* [**`max_session_duration_human_users`**](#max_session_duration_human_users) &mdash; The maximum allowable session duration, in seconds, for the credentials you get when assuming the IAM roles created by this module. This variable applies to all IAM roles created by this module that are intended for people to use, such as allow-read-only-access-from-other-accounts. For IAM roles that are intended for machine users, such as allow-auto-deploy-from-other-accounts, see [`max_session_duration_machine_users`](#max_session_duration_machine_users).

<a name="max_session_duration_machine_users" className="snap-top"></a>

* [**`max_session_duration_machine_users`**](#max_session_duration_machine_users) &mdash; The maximum allowable session duration, in seconds, for the credentials you get when assuming the IAM roles created by this module. This variable  applies to all IAM roles created by this module that are intended for machine users, such as allow-auto-deploy-from-other-accounts. For IAM roles that are intended for human users, such as allow-read-only-access-from-other-accounts, see [`max_session_duration_human_users`](#max_session_duration_human_users).

<a name="name_prefix" className="snap-top"></a>

* [**`name_prefix`**](#name_prefix) &mdash; The name used to prefix AWS Config and Cloudtrail resources, including the S3 bucket names and SNS topics used for each.

<a name="password_reset_required" className="snap-top"></a>

* [**`password_reset_required`**](#password_reset_required) &mdash; Force the user to reset their password on initial login. Only used for users with [`create_login_profile`](#create_login_profile) set to true.

<a name="rds_storage_encrypted_kms_id" className="snap-top"></a>

* [**`rds_storage_encrypted_kms_id`**](#rds_storage_encrypted_kms_id) &mdash; KMS key ID or ARN used to encrypt the storage. Used for configuring the RDS storage encryption config rule.

<a name="service_linked_roles" className="snap-top"></a>

* [**`service_linked_roles`**](#service_linked_roles) &mdash; Create service-linked roles for this set of services. You should pass in the URLs of the services, but without the protocol (e.g., http://) in front: e.g., use elasticbeanstalk.amazonaws.com for Elastic Beanstalk or es.amazonaws.com for Amazon Elasticsearch. Service-linked roles are predefined by the service, can typically only be assumed by that service, and include all the permissions that the service requires to call other AWS services on your behalf. You can typically only create one such role per AWS account, which is why this parameter exists in the account baseline. See [`https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_aws`](#https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_aws)-services-that-work-with-iam.html for the list of services that support service-linked roles.

<a name="should_create_iam_group_auto_deploy" className="snap-top"></a>

* [**`should_create_iam_group_auto_deploy`**](#should_create_iam_group_auto_deploy) &mdash; Should we create the IAM Group for auto-deploy? Allows automated deployment by granting the permissions specified in [`auto_deploy_permissions`](#auto_deploy_permissions). (true or false)

<a name="should_create_iam_group_billing" className="snap-top"></a>

* [**`should_create_iam_group_billing`**](#should_create_iam_group_billing) &mdash; Should we create the IAM Group for billing? Allows read-write access to billing features only. (true or false)

<a name="should_create_iam_group_cross_account_access_all" className="snap-top"></a>

* [**`should_create_iam_group_cross_account_access_all`**](#should_create_iam_group_cross_account_access_all) &mdash; Should we create the IAM Group for access to all external AWS accounts? 

<a name="should_create_iam_group_developers" className="snap-top"></a>

* [**`should_create_iam_group_developers`**](#should_create_iam_group_developers) &mdash; Should we create the IAM Group for developers? The permissions of that group are specified via [`iam_group_developers_permitted_services`](#iam_group_developers_permitted_services). (true or false)

<a name="should_create_iam_group_full_access" className="snap-top"></a>

* [**`should_create_iam_group_full_access`**](#should_create_iam_group_full_access) &mdash; Should we create the IAM Group for full access? Allows full access to all AWS resources. (true or false)

<a name="should_create_iam_group_houston_cli_users" className="snap-top"></a>

* [**`should_create_iam_group_houston_cli_users`**](#should_create_iam_group_houston_cli_users) &mdash; Should we create the IAM Group for houston CLI users? Allows users to use the houston CLI for managing and deploying services.

<a name="should_create_iam_group_iam_admin" className="snap-top"></a>

* [**`should_create_iam_group_iam_admin`**](#should_create_iam_group_iam_admin) &mdash; Should we create the IAM Group for IAM administrator access? Allows users to manage all IAM entities, effectively granting administrator access. (true or false)

<a name="should_create_iam_group_logs" className="snap-top"></a>

* [**`should_create_iam_group_logs`**](#should_create_iam_group_logs) &mdash; Should we create the IAM Group for logs? Allows read access to CloudTrail, AWS Config, and CloudWatch. If [`cloudtrail_kms_key_arn`](#cloudtrail_kms_key_arn) is set, will also give decrypt access to a KMS CMK. (true or false)

<a name="should_create_iam_group_read_only" className="snap-top"></a>

* [**`should_create_iam_group_read_only`**](#should_create_iam_group_read_only) &mdash; Should we create the IAM Group for read-only? Allows read-only access to all AWS resources. (true or false)

<a name="should_create_iam_group_support" className="snap-top"></a>

* [**`should_create_iam_group_support`**](#should_create_iam_group_support) &mdash; Should we create the IAM Group for support? Allows support access (AWSupportAccess). (true or false)

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

<a name="cloudtrail_s3_access_logging_bucket_name" className="snap-top"></a>

* [**`cloudtrail_s3_access_logging_bucket_name`**](#cloudtrail_s3_access_logging_bucket_name) &mdash; The name of the S3 bucket where server access logs are delivered.

<a name="cloudtrail_s3_bucket_name" className="snap-top"></a>

* [**`cloudtrail_s3_bucket_name`**](#cloudtrail_s3_bucket_name) &mdash; The name of the S3 bucket where cloudtrail logs are delivered.

<a name="cloudtrail_trail_arn" className="snap-top"></a>

* [**`cloudtrail_trail_arn`**](#cloudtrail_trail_arn) &mdash; The ARN of the cloudtrail trail.

<a name="config_iam_role_arns" className="snap-top"></a>

* [**`config_iam_role_arns`**](#config_iam_role_arns) &mdash; The ARNs of the IAM role used by the config recorder.

<a name="config_recorder_names" className="snap-top"></a>

* [**`config_recorder_names`**](#config_recorder_names) &mdash; The names of the configuration recorder.

<a name="config_s3_bucket_names" className="snap-top"></a>

* [**`config_s3_bucket_names`**](#config_s3_bucket_names) &mdash; The names of the S3 bucket used by AWS Config to store configuration items.

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

<a name="github_actions_iam_openid_connect_provider_arn" className="snap-top"></a>

* [**`github_actions_iam_openid_connect_provider_arn`**](#github_actions_iam_openid_connect_provider_arn) &mdash; ARN of the OpenID Connect Provider that can be used to attach AWS IAM Roles to GitHub Actions.

<a name="github_actions_iam_openid_connect_provider_url" className="snap-top"></a>

* [**`github_actions_iam_openid_connect_provider_url`**](#github_actions_iam_openid_connect_provider_url) &mdash; URL of the OpenID Connect Provider that can be used to attach AWS IAM Roles to GitHub Actions.

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

<a name="invalid_cmk_inputs" className="snap-top"></a>

* [**`invalid_cmk_inputs`**](#invalid_cmk_inputs) &mdash; Map of CMKs from the input [`customer_master_keys`](#customer_master_keys) that had an invalid region, and thus were not created. The structure of the map is the same as the input. This will only include KMS key inputs that were not created because the region attribute was invalid (either not a valid region identifier, the region is not enabled on the account, or the region is not included in the [`opt_in_regions`](#opt_in_regions) input).

<a name="kms_key_aliases" className="snap-top"></a>

* [**`kms_key_aliases`**](#kms_key_aliases) &mdash; A map from region to aliases of the KMS CMKs that were created. The value will also be a map mapping the keys from the [`customer_master_keys`](#customer_master_keys) input variable to the corresponding alias.

<a name="kms_key_arns" className="snap-top"></a>

* [**`kms_key_arns`**](#kms_key_arns) &mdash; A map from region to ARNs of the KMS CMKs that were created. The value will also be a map mapping the keys from the [`kms_customer_master_keys`](#kms_customer_master_keys) input variable to the corresponding ARN.

<a name="kms_key_ids" className="snap-top"></a>

* [**`kms_key_ids`**](#kms_key_ids) &mdash; A map from region to IDs of the KMS CMKs that were created. The value will also be a map mapping the keys from the [`kms_customer_master_keys`](#kms_customer_master_keys) input variable to the corresponding ID.

<a name="logs_iam_group_arn" className="snap-top"></a>

* [**`logs_iam_group_arn`**](#logs_iam_group_arn) &mdash; 

<a name="logs_iam_group_name" className="snap-top"></a>

* [**`logs_iam_group_name`**](#logs_iam_group_name) &mdash; 

<a name="read_only_iam_group_arn" className="snap-top"></a>

* [**`read_only_iam_group_arn`**](#read_only_iam_group_arn) &mdash; 

<a name="read_only_iam_group_name" className="snap-top"></a>

* [**`read_only_iam_group_name`**](#read_only_iam_group_name) &mdash; 

<a name="require_mfa_policy" className="snap-top"></a>

* [**`require_mfa_policy`**](#require_mfa_policy) &mdash; 

<a name="service_linked_role_arns" className="snap-top"></a>

* [**`service_linked_role_arns`**](#service_linked_role_arns) &mdash; A map of ARNs of the service linked roles created from [`service_linked_roles`](#service_linked_roles).

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

* [**`user_access_keys`**](#user_access_keys) &mdash; A map of usernames to that user's access keys (a map with keys [`access_key_id`](#access_key_id) and [`secret_access_key`](#secret_access_key)), with the [`secret_access_key`](#secret_access_key) encrypted with that user's PGP key (only shows up for users with [`create_access_keys`](#create_access_keys) = true). You can decrypt the [`secret_access_key`](#secret_access_key) on the CLI: echo [`&lt;secret_access_key`](#&lt;secret_access_key)> | base64 --decode | keybase pgp decrypt

<a name="user_arns" className="snap-top"></a>

* [**`user_arns`**](#user_arns) &mdash; A map of usernames to the ARN for that IAM user.

<a name="user_passwords" className="snap-top"></a>

* [**`user_passwords`**](#user_passwords) &mdash; A map of usernames to that user's AWS Web Console password, encrypted with that user's PGP key (only shows up for users with [`create_login_profile`](#create_login_profile) = true). You can decrypt the password on the CLI: echo &lt;password> | base64 --decode | keybase pgp decrypt

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"fbb4dae8b3ad39b53338a272baabf6bb"}
##DOCS-SOURCER-END -->
