import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# AWS Root Account baseline wrapper

A security baseline for AWS Landing Zone for configuring the root account (AKA master account) of an AWS Organization, including setting up child accounts, AWS Config, AWS CloudTrail, Amazon Guard Duty, IAM users, IAM groups, IAM password policy, and more.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/landingzone/account-baseline-root" className="link-button">View on GitHub</a>

### Reference 

<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <table>
        <thead>
            <tr>
                <td><b>Variable name</b></td>
                <td><b>Description</b></td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td><a name="additional_config_rules" href="#additional_config_rules" className="snap-top"><code>additional_config_rules</code></a></td>
        <td>Map of additional managed rules to add. The key is the name of the rule (e.g. ´acm-certificate-expiration-check´) and the value is an object specifying the rule details</td>
    </tr><tr>
        <td><a name="allow_auto_deploy_from_other_account_arns" href="#allow_auto_deploy_from_other_account_arns" className="snap-top"><code>allow_auto_deploy_from_other_account_arns</code></a></td>
        <td>A list of IAM ARNs from other AWS accounts that will be allowed to assume the auto deploy IAM role that has the permissions in var.auto_deploy_permissions.</td>
    </tr><tr>
        <td><a name="allow_billing_access_from_other_account_arns" href="#allow_billing_access_from_other_account_arns" className="snap-top"><code>allow_billing_access_from_other_account_arns</code></a></td>
        <td>A list of IAM ARNs from other AWS accounts that will be allowed full (read and write) access to the billing info for this account.</td>
    </tr><tr>
        <td><a name="allow_cloudtrail_access_with_iam" href="#allow_cloudtrail_access_with_iam" className="snap-top"><code>allow_cloudtrail_access_with_iam</code></a></td>
        <td>If true, an IAM Policy that grants access to CloudTrail will be honored. If false, only the ARNs listed in var.kms_key_user_iam_arns will have access to CloudTrail and any IAM Policy grants will be ignored. (true or false)</td>
    </tr><tr>
        <td><a name="allow_dev_access_from_other_account_arns" href="#allow_dev_access_from_other_account_arns" className="snap-top"><code>allow_dev_access_from_other_account_arns</code></a></td>
        <td>A list of IAM ARNs from other AWS accounts that will be allowed full (read and write) access to the services in this account specified in var.dev_permitted_services.</td>
    </tr><tr>
        <td><a name="allow_full_access_from_other_account_arns" href="#allow_full_access_from_other_account_arns" className="snap-top"><code>allow_full_access_from_other_account_arns</code></a></td>
        <td>A list of IAM ARNs from other AWS accounts that will be allowed full (read and write) access to this account.</td>
    </tr><tr>
        <td><a name="allow_logs_access_from_other_account_arns" href="#allow_logs_access_from_other_account_arns" className="snap-top"><code>allow_logs_access_from_other_account_arns</code></a></td>
        <td>A list of IAM ARNs from other AWS accounts that will be allowed read access to the logs in CloudTrail, AWS Config, and CloudWatch for this account. If var.cloudtrail_kms_key_arn is specified, will also be given permissions to decrypt with the KMS CMK that is used to encrypt CloudTrail logs.</td>
    </tr><tr>
        <td><a name="allow_read_only_access_from_other_account_arns" href="#allow_read_only_access_from_other_account_arns" className="snap-top"><code>allow_read_only_access_from_other_account_arns</code></a></td>
        <td>A list of IAM ARNs from other AWS accounts that will be allowed read-only access to this account.</td>
    </tr><tr>
        <td><a name="allow_ssh_grunt_access_from_other_account_arns" href="#allow_ssh_grunt_access_from_other_account_arns" className="snap-top"><code>allow_ssh_grunt_access_from_other_account_arns</code></a></td>
        <td>A list of IAM ARNs from other AWS accounts that will be allowed read access to IAM groups and publish SSH keys. This is used for ssh-grunt.</td>
    </tr><tr>
        <td><a name="allow_support_access_from_other_account_arns" href="#allow_support_access_from_other_account_arns" className="snap-top"><code>allow_support_access_from_other_account_arns</code></a></td>
        <td>A list of IAM ARNs from other AWS accounts that will be allowed access to AWS support for this account.</td>
    </tr><tr>
        <td><a name="auto_deploy_permissions" href="#auto_deploy_permissions" className="snap-top"><code>auto_deploy_permissions</code></a></td>
        <td>A list of IAM permissions (e.g. ec2:*) that will be added to an IAM Group for doing automated deployments. NOTE: If var.should_create_iam_group_auto_deploy is true, the list must have at least one element (e.g. '*').</td>
    </tr><tr>
        <td><a name="aws_account_id" href="#aws_account_id" className="snap-top"><code>aws_account_id</code></a></td>
        <td>The AWS Account ID the template should be operated on. This avoids misconfiguration errors caused by environment variables.</td>
    </tr><tr>
        <td><a name="aws_region" href="#aws_region" className="snap-top"><code>aws_region</code></a></td>
        <td>The AWS Region to use as the global config recorder and seed region for GuardDuty.</td>
    </tr><tr>
        <td><a name="child_accounts" href="#child_accounts" className="snap-top"><code>child_accounts</code></a></td>
        <td>Map of child accounts to create. The map key is the name of the account and the value is an object containing account configuration variables. See the comments below for what keys and values this object should contain.</td>
    </tr><tr>
        <td><a name="cloudtrail_allow_kms_describe_key_to_external_aws_accounts" href="#cloudtrail_allow_kms_describe_key_to_external_aws_accounts" className="snap-top"><code>cloudtrail_allow_kms_describe_key_to_external_aws_accounts</code></a></td>
        <td>Whether or not to allow kms:DescribeKey to external AWS accounts with write access to the CloudTrail bucket. This is useful during deployment so that you don't have to pass around the KMS key ARN.</td>
    </tr><tr>
        <td><a name="cloudtrail_cloudwatch_logs_group_name" href="#cloudtrail_cloudwatch_logs_group_name" className="snap-top"><code>cloudtrail_cloudwatch_logs_group_name</code></a></td>
        <td>Specify the name of the CloudWatch Logs group to publish the CloudTrail logs to. This log group exists in the current account. Set this value to `null` to avoid publishing the trail logs to the logs group. The recommended configuration for CloudTrail is (a) for each child account to aggregate its logs in an S3 bucket in a single central account, such as a logs account and (b) to also store 14 days work of logs in CloudWatch in the child account itself for local debugging.</td>
    </tr><tr>
        <td><a name="cloudtrail_data_logging_enabled" href="#cloudtrail_data_logging_enabled" className="snap-top"><code>cloudtrail_data_logging_enabled</code></a></td>
        <td>If true, logging of data events will be enabled.</td>
    </tr><tr>
        <td><a name="cloudtrail_data_logging_include_management_events" href="#cloudtrail_data_logging_include_management_events" className="snap-top"><code>cloudtrail_data_logging_include_management_events</code></a></td>
        <td>Specify if you want your event selector to include management events for your trail.</td>
    </tr><tr>
        <td><a name="cloudtrail_data_logging_read_write_type" href="#cloudtrail_data_logging_read_write_type" className="snap-top"><code>cloudtrail_data_logging_read_write_type</code></a></td>
        <td>Specify if you want your trail to log read-only events, write-only events, or all. Possible values are: ReadOnly, WriteOnly, All.</td>
    </tr><tr>
        <td><a name="cloudtrail_data_logging_resources" href="#cloudtrail_data_logging_resources" className="snap-top"><code>cloudtrail_data_logging_resources</code></a></td>
        <td>Data resources for which to log data events. This should be a map, where each key is a data resource type, and each value is a list of data resource values. Possible values for data resource types are: AWS::S3::Object, AWS::Lambda::Function and AWS::DynamoDB::Table. See the 'data_resource' block within the 'event_selector' block of the 'aws_cloudtrail' resource for context: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudtrail#data_resource.</td>
    </tr><tr>
        <td><a name="cloudtrail_enable_key_rotation" href="#cloudtrail_enable_key_rotation" className="snap-top"><code>cloudtrail_enable_key_rotation</code></a></td>
        <td>Whether or not to enable automatic annual rotation of the KMS key. Defaults to true.</td>
    </tr><tr>
        <td><a name="cloudtrail_force_destroy" href="#cloudtrail_force_destroy" className="snap-top"><code>cloudtrail_force_destroy</code></a></td>
        <td>If set to true, when you run 'terraform destroy', delete all objects from the bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!</td>
    </tr><tr>
        <td><a name="cloudtrail_is_organization_trail" href="#cloudtrail_is_organization_trail" className="snap-top"><code>cloudtrail_is_organization_trail</code></a></td>
        <td>Specifies whether the trail is an AWS Organizations trail. Organization trails log events for the root account and all member accounts. Can only be created in the organization root account. (true or false)</td>
    </tr><tr>
        <td><a name="cloudtrail_kms_key_administrator_iam_arns" href="#cloudtrail_kms_key_administrator_iam_arns" className="snap-top"><code>cloudtrail_kms_key_administrator_iam_arns</code></a></td>
        <td>All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key) that governs access to write API calls older than 7 days and all read API calls. The IAM Users specified in this list will have rights to change who can access this extended log data. Note that if you specify a logs account (by setting is_logs_account = true on one of the accounts in var.child_accounts), the KMS CMK will be created in that account, and the root of that account will automatically be made an admin of the CMK.</td>
    </tr><tr>
        <td><a name="cloudtrail_kms_key_arn" href="#cloudtrail_kms_key_arn" className="snap-top"><code>cloudtrail_kms_key_arn</code></a></td>
        <td>All CloudTrail Logs will be encrypted with a KMS CMK (Customer Master Key) that governs access to write API calls older than 7 days and all read API calls. If that CMK already exists, set this to the ARN of that CMK. Otherwise, set this to null, and a new CMK will be created. If you set is_logs_account to true on one of the accounts in var.child_accounts, the KMS CMK will be created in that account (this is the recommended approach!).</td>
    </tr><tr>
        <td><a name="cloudtrail_kms_key_arn_is_alias" href="#cloudtrail_kms_key_arn_is_alias" className="snap-top"><code>cloudtrail_kms_key_arn_is_alias</code></a></td>
        <td>If the kms_key_arn provided is an alias or alias ARN, then this must be set to true so that the module will exchange the alias for a CMK ARN. Setting this to true and using aliases requires var.cloudtrail_allow_kms_describe_key_to_external_aws_accounts to also be true for multi-account scenarios.</td>
    </tr><tr>
        <td><a name="cloudtrail_kms_key_user_iam_arns" href="#cloudtrail_kms_key_user_iam_arns" className="snap-top"><code>cloudtrail_kms_key_user_iam_arns</code></a></td>
        <td>All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key) that governs access to write API calls older than 7 days and all read API calls. The IAM Users specified in this list will have read-only access to this extended log data.</td>
    </tr><tr>
        <td><a name="cloudtrail_num_days_after_which_archive_log_data" href="#cloudtrail_num_days_after_which_archive_log_data" className="snap-top"><code>cloudtrail_num_days_after_which_archive_log_data</code></a></td>
        <td>After this number of days, log files should be transitioned from S3 to Glacier. Enter 0 to never archive log data.</td>
    </tr><tr>
        <td><a name="cloudtrail_num_days_after_which_delete_log_data" href="#cloudtrail_num_days_after_which_delete_log_data" className="snap-top"><code>cloudtrail_num_days_after_which_delete_log_data</code></a></td>
        <td>After this number of days, log files should be deleted from S3. Enter 0 to never delete log data.</td>
    </tr><tr>
        <td><a name="cloudtrail_num_days_to_retain_cloudwatch_logs" href="#cloudtrail_num_days_to_retain_cloudwatch_logs" className="snap-top"><code>cloudtrail_num_days_to_retain_cloudwatch_logs</code></a></td>
        <td>After this number of days, logs stored in CloudWatch will be deleted. Possible values are: 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1827, 3653, and 0 (default). When set to 0, logs will be retained indefinitely.</td>
    </tr><tr>
        <td><a name="cloudtrail_organization_id" href="#cloudtrail_organization_id" className="snap-top"><code>cloudtrail_organization_id</code></a></td>
        <td>The ID of the organization. Required only if an organization wide CloudTrail is being setup and `create_organization` is set to false. The organization ID is required to ensure that the entire organization is whitelisted in the CloudTrail bucket write policy.</td>
    </tr><tr>
        <td><a name="cloudtrail_s3_bucket_name" href="#cloudtrail_s3_bucket_name" className="snap-top"><code>cloudtrail_s3_bucket_name</code></a></td>
        <td>The name of the S3 Bucket where CloudTrail logs will be stored. This could be a bucket in this AWS account or the name of a bucket in another AWS account where CloudTrail logs should be sent. If you set is_logs_account on one of the accounts in var.child_accounts, the S3 bucket will be created in that account (this is the recommended approach!).</td>
    </tr><tr>
        <td><a name="cloudtrail_s3_mfa_delete" href="#cloudtrail_s3_mfa_delete" className="snap-top"><code>cloudtrail_s3_mfa_delete</code></a></td>
        <td>Enable MFA delete for either 'Change the versioning state of your bucket' or 'Permanently delete an object version'. This setting only applies to the bucket used to storage Cloudtrail data. This cannot be used to toggle this setting but is available to allow managed buckets to reflect the state in AWS.  For instructions on how to enable MFA Delete, check out the README from the terraform-aws-security/private-s3-bucket module.</td>
    </tr><tr>
        <td><a name="cloudtrail_should_create_s3_bucket" href="#cloudtrail_should_create_s3_bucket" className="snap-top"><code>cloudtrail_should_create_s3_bucket</code></a></td>
        <td>If true, create an S3 bucket of name var.cloudtrail_s3_bucket_name for CloudTrail logs, either in the logs account—the account in var.child_accounts that has is_logs_account set to true (this is the recommended approach!)—or in this account if none of the child accounts are marked as a logs account. If false, assume var.cloudtrail_s3_bucket_name is an S3 bucket that already exists. We recommend setting this to true and setting is_logs_account to true on one of the accounts in var.child_accounts to use that account as a logs account where you aggregate all your CloudTrail data. In case you want to disable the CloudTrail module and the S3 bucket, you need to set both var.enable_cloudtrail and cloudtrail_should_create_s3_bucket to false.</td>
    </tr><tr>
        <td><a name="cloudtrail_tags" href="#cloudtrail_tags" className="snap-top"><code>cloudtrail_tags</code></a></td>
        <td>Tags to apply to the CloudTrail resources.</td>
    </tr><tr>
        <td><a name="config_aggregate_config_data_in_external_account" href="#config_aggregate_config_data_in_external_account" className="snap-top"><code>config_aggregate_config_data_in_external_account</code></a></td>
        <td>Set to true to send the AWS Config data to another account (e.g., a logs account) for aggregation purposes. You must set the ID of that other account via the config_central_account_id variable. Note that if one of the accounts in var.child_accounts has is_logs_account set to true (this is the approach we recommended!), this variable will be assumed to be true, so you don't have to pass any value for it.  This redundant variable has to exist because Terraform does not allow computed data in count and for_each parameters and var.config_central_account_id may be computed if its the ID of a newly-created AWS account.</td>
    </tr><tr>
        <td><a name="config_central_account_id" href="#config_central_account_id" className="snap-top"><code>config_central_account_id</code></a></td>
        <td>If the S3 bucket and SNS topics used for AWS Config live in a different AWS account, set this variable to the ID of that account. If the S3 bucket and SNS topics live in this account, set this variable to an empty string. Note that if one of the accounts in var.child_accounts has is_logs_account set to true (this is the approach we recommended!), that account's ID will be used automatically, and you can leave this variable null.</td>
    </tr><tr>
        <td><a name="config_create_account_rules" href="#config_create_account_rules" className="snap-top"><code>config_create_account_rules</code></a></td>
        <td>Set to true to create account-level AWS Config rules directly in this account. Set false to create org-level rules that apply to this account and all child accounts. We recommend setting this to true to use account-level rules because org-level rules create a chicken-and-egg problem with creating new accounts (see this module's README for details).</td>
    </tr><tr>
        <td><a name="config_force_destroy" href="#config_force_destroy" className="snap-top"><code>config_force_destroy</code></a></td>
        <td>If set to true, when you run 'terraform destroy', delete all objects from the bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!</td>
    </tr><tr>
        <td><a name="config_num_days_after_which_archive_log_data" href="#config_num_days_after_which_archive_log_data" className="snap-top"><code>config_num_days_after_which_archive_log_data</code></a></td>
        <td>After this number of days, log files should be transitioned from S3 to Glacier. Enter 0 to never archive log data.</td>
    </tr><tr>
        <td><a name="config_num_days_after_which_delete_log_data" href="#config_num_days_after_which_delete_log_data" className="snap-top"><code>config_num_days_after_which_delete_log_data</code></a></td>
        <td>After this number of days, log files should be deleted from S3. Enter 0 to never delete log data.</td>
    </tr><tr>
        <td><a name="config_opt_in_regions" href="#config_opt_in_regions" className="snap-top"><code>config_opt_in_regions</code></a></td>
        <td>Creates resources in the specified regions. The best practice is to enable AWS Config in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions.</td>
    </tr><tr>
        <td><a name="config_s3_bucket_name" href="#config_s3_bucket_name" className="snap-top"><code>config_s3_bucket_name</code></a></td>
        <td>The name of the S3 Bucket where Config items will be stored. This could be a bucket in this AWS account or the name of a bucket in another AWS account where Config items should be sent. If you set is_logs_account to true on one of the accounts in var.child_accounts, the S3 bucket will be created in that account (this is the recommended approach!).</td>
    </tr><tr>
        <td><a name="config_s3_mfa_delete" href="#config_s3_mfa_delete" className="snap-top"><code>config_s3_mfa_delete</code></a></td>
        <td>Enable MFA delete for either 'Change the versioning state of your bucket' or 'Permanently delete an object version'. This setting only applies to the bucket used to storage AWS Config data. This cannot be used to toggle this setting but is available to allow managed buckets to reflect the state in AWS. For instructions on how to enable MFA Delete, check out the README from the terraform-aws-security/private-s3-bucket module.</td>
    </tr><tr>
        <td><a name="config_should_create_s3_bucket" href="#config_should_create_s3_bucket" className="snap-top"><code>config_should_create_s3_bucket</code></a></td>
        <td>If true, create an S3 bucket of name var.config_s3_bucket_name for AWS Config data, either in the logs account—the account in var.child_accounts that has is_logs_account set to true (this is the recommended approach!)—or in this account if none of the child accounts are marked as a logs account. If false, assume var.config_s3_bucket_name is an S3 bucket that already exists. We recommend setting this to true and setting is_logs_account to true on one of the accounts in var.child_accounts to use that account as a logs account where you aggregate all your AWS Config data. In case you want to disable the AWS Config module and the S3 bucket, you need to set both var.enable_config and config_should_create_s3_bucket to false.</td>
    </tr><tr>
        <td><a name="config_should_create_sns_topic" href="#config_should_create_sns_topic" className="snap-top"><code>config_should_create_sns_topic</code></a></td>
        <td>Set to true to create an SNS topic in this account for sending AWS Config notifications. Set to false to assume the topic specified in var.config_sns_topic_name already exists in another AWS account (e.g the logs account).</td>
    </tr><tr>
        <td><a name="config_sns_topic_name" href="#config_sns_topic_name" className="snap-top"><code>config_sns_topic_name</code></a></td>
        <td>The name of the SNS Topic in where AWS Config notifications will be sent. Can be in the same account or in another account.</td>
    </tr><tr>
        <td><a name="config_tags" href="#config_tags" className="snap-top"><code>config_tags</code></a></td>
        <td>A map of tags to apply to the S3 Bucket. The key is the tag name and the value is the tag value.</td>
    </tr><tr>
        <td><a name="configrules_excluded_accounts" href="#configrules_excluded_accounts" className="snap-top"><code>configrules_excluded_accounts</code></a></td>
        <td>List of AWS account identifiers to exclude from org-level Config rules. Only used if var.config_create_account_rules is false (not recommended).</td>
    </tr><tr>
        <td><a name="configrules_maximum_execution_frequency" href="#configrules_maximum_execution_frequency" className="snap-top"><code>configrules_maximum_execution_frequency</code></a></td>
        <td>The maximum frequency with which AWS Config runs evaluations for the ´PERIODIC´ rules. See https://www.terraform.io/docs/providers/aws/r/config_organization_managed_rule.html#maximum_execution_frequency</td>
    </tr><tr>
        <td><a name="create_organization" href="#create_organization" className="snap-top"><code>create_organization</code></a></td>
        <td>Set to true to create/configure AWS Organizations for the first time in this account. If you already configured AWS Organizations in your account, set this to false; alternatively, you could set it to true and run 'terraform import' to import you existing Organization.</td>
    </tr><tr>
        <td><a name="cross_account_access_all_group_name" href="#cross_account_access_all_group_name" className="snap-top"><code>cross_account_access_all_group_name</code></a></td>
        <td>The name of the IAM group that will grant access to all external AWS accounts in var.iam_groups_for_cross_account_access.</td>
    </tr><tr>
        <td><a name="dev_permitted_services" href="#dev_permitted_services" className="snap-top"><code>dev_permitted_services</code></a></td>
        <td>A list of AWS services for which the developers from the accounts in var.allow_dev_access_from_other_account_arns will receive full permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to grant developers access only to EC2 and Amazon Machine Learning, use the value ["ec2","machinelearning"]. Do NOT add iam to the list of services, or that will grant Developers de facto admin access.</td>
    </tr><tr>
        <td><a name="ebs_enable_encryption" href="#ebs_enable_encryption" className="snap-top"><code>ebs_enable_encryption</code></a></td>
        <td>If set to true (default), all new EBS volumes will have encryption enabled by default</td>
    </tr><tr>
        <td><a name="ebs_kms_key_arns" href="#ebs_kms_key_arns" className="snap-top"><code>ebs_kms_key_arns</code></a></td>
        <td>Optional map of region names to KMS keys to use for EBS volume encryption when var.ebs_use_existing_kms_keys is enabled.</td>
    </tr><tr>
        <td><a name="ebs_opt_in_regions" href="#ebs_opt_in_regions" className="snap-top"><code>ebs_opt_in_regions</code></a></td>
        <td>Creates resources in the specified regions. The best practice is to enable EBS Encryption in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions. The value provided for global_recorder_region must be in this list.</td>
    </tr><tr>
        <td><a name="ebs_use_existing_kms_keys" href="#ebs_use_existing_kms_keys" className="snap-top"><code>ebs_use_existing_kms_keys</code></a></td>
        <td>If set to true, the KMS Customer Managed Keys (CMK) specified in var.ebs_kms_key_arns will be set as the default for EBS encryption. When false (default), the AWS-managed aws/ebs key will be used.</td>
    </tr><tr>
        <td><a name="enable_cloudtrail" href="#enable_cloudtrail" className="snap-top"><code>enable_cloudtrail</code></a></td>
        <td>Set to true to enable CloudTrail in the root account. Set to false to disable CloudTrail (note: all other CloudTrail variables will be ignored). In case you want to disable the CloudTrail module and the S3 bucket, you need to set both var.enable_cloudtrail and cloudtrail_should_create_s3_bucket to false.</td>
    </tr><tr>
        <td><a name="enable_cloudtrail_s3_server_access_logging" href="#enable_cloudtrail_s3_server_access_logging" className="snap-top"><code>enable_cloudtrail_s3_server_access_logging</code></a></td>
        <td>Enables S3 server access logging which sends detailed records for the requests that are made to the bucket. Defaults to false.</td>
    </tr><tr>
        <td><a name="enable_config" href="#enable_config" className="snap-top"><code>enable_config</code></a></td>
        <td>Set to true to enable AWS Config in the root account. Set to false to disable AWS Config (note: all other AWS config variables will be ignored). In case you want to disable the CloudTrail module and the S3 bucket, you need to set both var.enable_cloudtrail and cloudtrail_should_create_s3_bucket to false.</td>
    </tr><tr>
        <td><a name="enable_encrypted_volumes" href="#enable_encrypted_volumes" className="snap-top"><code>enable_encrypted_volumes</code></a></td>
        <td>Checks whether the EBS volumes that are in an attached state are encrypted.</td>
    </tr><tr>
        <td><a name="enable_iam_access_analyzer" href="#enable_iam_access_analyzer" className="snap-top"><code>enable_iam_access_analyzer</code></a></td>
        <td>A feature flag to enable or disable this module.</td>
    </tr><tr>
        <td><a name="enable_iam_cross_account_roles" href="#enable_iam_cross_account_roles" className="snap-top"><code>enable_iam_cross_account_roles</code></a></td>
        <td>A feature flag to enable or disable this module.</td>
    </tr><tr>
        <td><a name="enable_iam_groups" href="#enable_iam_groups" className="snap-top"><code>enable_iam_groups</code></a></td>
        <td>A feature flag to enable or disable this module.</td>
    </tr><tr>
        <td><a name="enable_iam_password_policy" href="#enable_iam_password_policy" className="snap-top"><code>enable_iam_password_policy</code></a></td>
        <td>Checks whether the account password policy for IAM users meets the specified requirements.</td>
    </tr><tr>
        <td><a name="enable_insecure_sg_rules" href="#enable_insecure_sg_rules" className="snap-top"><code>enable_insecure_sg_rules</code></a></td>
        <td>Checks whether the security group with 0.0.0.0/0 of any Amazon Virtual Private Cloud (Amazon VPC) allows only specific inbound TCP or UDP traffic.</td>
    </tr><tr>
        <td><a name="enable_rds_storage_encrypted" href="#enable_rds_storage_encrypted" className="snap-top"><code>enable_rds_storage_encrypted</code></a></td>
        <td>Checks whether storage encryption is enabled for your RDS DB instances.</td>
    </tr><tr>
        <td><a name="enable_root_account_mfa" href="#enable_root_account_mfa" className="snap-top"><code>enable_root_account_mfa</code></a></td>
        <td>Checks whether users of your AWS account require a multi-factor authentication (MFA) device to sign in with root credentials.</td>
    </tr><tr>
        <td><a name="enable_s3_bucket_public_read_prohibited" href="#enable_s3_bucket_public_read_prohibited" className="snap-top"><code>enable_s3_bucket_public_read_prohibited</code></a></td>
        <td>Checks that your Amazon S3 buckets do not allow public read access.</td>
    </tr><tr>
        <td><a name="enable_s3_bucket_public_write_prohibited" href="#enable_s3_bucket_public_write_prohibited" className="snap-top"><code>enable_s3_bucket_public_write_prohibited</code></a></td>
        <td>Checks that your Amazon S3 buckets do not allow public write access.</td>
    </tr><tr>
        <td><a name="encrypted_volumes_kms_id" href="#encrypted_volumes_kms_id" className="snap-top"><code>encrypted_volumes_kms_id</code></a></td>
        <td>ID or ARN of the KMS key that is used to encrypt the volume. Used for configuring the encrypted volumes config rule.</td>
    </tr><tr>
        <td><a name="force_destroy_users" href="#force_destroy_users" className="snap-top"><code>force_destroy_users</code></a></td>
        <td>When destroying this user, destroy even if it has non-Terraform-managed IAM access keys, login profile, or MFA devices. Without force_destroy a user with non-Terraform-managed access keys and login profile will fail to be destroyed.</td>
    </tr><tr>
        <td><a name="guardduty_cloudwatch_event_rule_name" href="#guardduty_cloudwatch_event_rule_name" className="snap-top"><code>guardduty_cloudwatch_event_rule_name</code></a></td>
        <td>Name of the Cloudwatch event rules.</td>
    </tr><tr>
        <td><a name="guardduty_finding_publishing_frequency" href="#guardduty_finding_publishing_frequency" className="snap-top"><code>guardduty_finding_publishing_frequency</code></a></td>
        <td>Specifies the frequency of notifications sent for subsequent finding occurrences. If the detector is a GuardDuty member account, the value is determined by the GuardDuty master account and cannot be modified, otherwise defaults to SIX_HOURS. For standalone and GuardDuty master accounts, it must be configured in Terraform to enable drift detection. Valid values for standalone and master accounts: FIFTEEN_MINUTES, ONE_HOUR, SIX_HOURS.</td>
    </tr><tr>
        <td><a name="guardduty_findings_sns_topic_name" href="#guardduty_findings_sns_topic_name" className="snap-top"><code>guardduty_findings_sns_topic_name</code></a></td>
        <td>Specifies a name for the created SNS topics where findings are published. publish_findings_to_sns must be set to true.</td>
    </tr><tr>
        <td><a name="guardduty_opt_in_regions" href="#guardduty_opt_in_regions" className="snap-top"><code>guardduty_opt_in_regions</code></a></td>
        <td>Creates resources in the specified regions. The best practice is to enable GuardDuty in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions. The value provided for global_recorder_region must be in this list.</td>
    </tr><tr>
        <td><a name="guardduty_publish_findings_to_sns" href="#guardduty_publish_findings_to_sns" className="snap-top"><code>guardduty_publish_findings_to_sns</code></a></td>
        <td>Send GuardDuty findings to SNS topics specified by findings_sns_topic_name.</td>
    </tr><tr>
        <td><a name="iam_access_analyzer_name" href="#iam_access_analyzer_name" className="snap-top"><code>iam_access_analyzer_name</code></a></td>
        <td>The name of the IAM Access Analyzer module</td>
    </tr><tr>
        <td><a name="iam_access_analyzer_opt_in_regions" href="#iam_access_analyzer_opt_in_regions" className="snap-top"><code>iam_access_analyzer_opt_in_regions</code></a></td>
        <td>Creates resources in the specified regions. The best practice is to enable IAM Access Analyzer in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions. The value provided for global_recorder_region must be in this list.</td>
    </tr><tr>
        <td><a name="iam_access_analyzer_type" href="#iam_access_analyzer_type" className="snap-top"><code>iam_access_analyzer_type</code></a></td>
        <td>If set to ORGANIZATION, the analyzer will be scanning the current organization and any policies that refer to linked resources such as S3, IAM, Lambda and SQS policies.</td>
    </tr><tr>
        <td><a name="iam_group_developers_permitted_services" href="#iam_group_developers_permitted_services" className="snap-top"><code>iam_group_developers_permitted_services</code></a></td>
        <td>A list of AWS services for which the developers IAM Group will receive full permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to grant developers access only to EC2 and Amazon Machine Learning, use the value ["ec2","machinelearning"]. Do NOT add iam to the list of services, or that will grant Developers de facto admin access. If you need to grant iam privileges, just grant the user Full Access.</td>
    </tr><tr>
        <td><a name="iam_groups_for_cross_account_access" href="#iam_groups_for_cross_account_access" className="snap-top"><code>iam_groups_for_cross_account_access</code></a></td>
        <td>This variable is used to create groups that allow IAM users to assume roles in your other AWS accounts. It should be a list of objects, where each object has the fields 'group_name', which will be used as the name of the IAM group, and 'iam_role_arns', which is a list of ARNs of IAM Roles that you can assume when part of that group. For each entry in the list of objects, we will create an IAM group that allows users to assume the given IAM role(s) in the other AWS account. This allows you to define all your IAM users in one account (e.g. the users account) and to grant them access to certain IAM roles in other accounts (e.g. the stage, prod, audit accounts).</td>
    </tr><tr>
        <td><a name="iam_password_policy_allow_users_to_change_password" href="#iam_password_policy_allow_users_to_change_password" className="snap-top"><code>iam_password_policy_allow_users_to_change_password</code></a></td>
        <td>Allow users to change their own password.</td>
    </tr><tr>
        <td><a name="iam_password_policy_hard_expiry" href="#iam_password_policy_hard_expiry" className="snap-top"><code>iam_password_policy_hard_expiry</code></a></td>
        <td>Password expiration requires administrator reset.</td>
    </tr><tr>
        <td><a name="iam_password_policy_max_password_age" href="#iam_password_policy_max_password_age" className="snap-top"><code>iam_password_policy_max_password_age</code></a></td>
        <td>Number of days before password expiration.</td>
    </tr><tr>
        <td><a name="iam_password_policy_minimum_password_length" href="#iam_password_policy_minimum_password_length" className="snap-top"><code>iam_password_policy_minimum_password_length</code></a></td>
        <td>Password minimum length.</td>
    </tr><tr>
        <td><a name="iam_password_policy_password_reuse_prevention" href="#iam_password_policy_password_reuse_prevention" className="snap-top"><code>iam_password_policy_password_reuse_prevention</code></a></td>
        <td>Number of passwords before allowing reuse.</td>
    </tr><tr>
        <td><a name="iam_password_policy_require_lowercase_characters" href="#iam_password_policy_require_lowercase_characters" className="snap-top"><code>iam_password_policy_require_lowercase_characters</code></a></td>
        <td>Require at least one lowercase character in password.</td>
    </tr><tr>
        <td><a name="iam_password_policy_require_numbers" href="#iam_password_policy_require_numbers" className="snap-top"><code>iam_password_policy_require_numbers</code></a></td>
        <td>Require at least one number in password.</td>
    </tr><tr>
        <td><a name="iam_password_policy_require_symbols" href="#iam_password_policy_require_symbols" className="snap-top"><code>iam_password_policy_require_symbols</code></a></td>
        <td>Require at least one symbol in password.</td>
    </tr><tr>
        <td><a name="iam_password_policy_require_uppercase_characters" href="#iam_password_policy_require_uppercase_characters" className="snap-top"><code>iam_password_policy_require_uppercase_characters</code></a></td>
        <td>Require at least one uppercase character in password.</td>
    </tr><tr>
        <td><a name="iam_role_tags" href="#iam_role_tags" className="snap-top"><code>iam_role_tags</code></a></td>
        <td>The tags to apply to all the IAM role resources.</td>
    </tr><tr>
        <td><a name="insecure_sg_rules_authorized_tcp_ports" href="#insecure_sg_rules_authorized_tcp_ports" className="snap-top"><code>insecure_sg_rules_authorized_tcp_ports</code></a></td>
        <td>Comma-separated list of TCP ports authorized to be open to 0.0.0.0/0. Ranges are defined by a dash; for example, '443,1020-1025'.</td>
    </tr><tr>
        <td><a name="insecure_sg_rules_authorized_udp_ports" href="#insecure_sg_rules_authorized_udp_ports" className="snap-top"><code>insecure_sg_rules_authorized_udp_ports</code></a></td>
        <td>Comma-separated list of UDP ports authorized to be open to 0.0.0.0/0. Ranges are defined by a dash; for example, '500,1020-1025'.</td>
    </tr><tr>
        <td><a name="is_multi_region_trail" href="#is_multi_region_trail" className="snap-top"><code>is_multi_region_trail</code></a></td>
        <td>Specifies whether CloudTrail will log only API calls in the current region or in all regions. (true or false)</td>
    </tr><tr>
        <td><a name="name_prefix" href="#name_prefix" className="snap-top"><code>name_prefix</code></a></td>
        <td>The name used to prefix AWS Config and Cloudtrail resources, including the S3 bucket names and SNS topics used for each.</td>
    </tr><tr>
        <td><a name="organizations_aws_service_access_principals" href="#organizations_aws_service_access_principals" className="snap-top"><code>organizations_aws_service_access_principals</code></a></td>
        <td>List of AWS service principal names for which you want to enable integration with your organization. Must have `organizations_feature_set` set to ALL. See https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services.html</td>
    </tr><tr>
        <td><a name="organizations_default_iam_user_access_to_billing" href="#organizations_default_iam_user_access_to_billing" className="snap-top"><code>organizations_default_iam_user_access_to_billing</code></a></td>
        <td>If set to ALLOW, the new account enables IAM users to access account billing information if they have the required permissions. If set to DENY, then only the root user of the new account can access account billing information.</td>
    </tr><tr>
        <td><a name="organizations_default_role_name" href="#organizations_default_role_name" className="snap-top"><code>organizations_default_role_name</code></a></td>
        <td>The name of an IAM role that Organizations automatically preconfigures in the new member account. This role trusts the master account, allowing users in the master account to assume the role, as permitted by the master account administrator.</td>
    </tr><tr>
        <td><a name="organizations_default_tags" href="#organizations_default_tags" className="snap-top"><code>organizations_default_tags</code></a></td>
        <td>Default tags to add to accounts. Will be appended to ´child_account.*.tags´</td>
    </tr><tr>
        <td><a name="organizations_enabled_policy_types" href="#organizations_enabled_policy_types" className="snap-top"><code>organizations_enabled_policy_types</code></a></td>
        <td>List of Organizations policy types to enable in the Organization Root. See https://docs.aws.amazon.com/organizations/latest/APIReference/API_EnablePolicyType.html</td>
    </tr><tr>
        <td><a name="organizations_feature_set" href="#organizations_feature_set" className="snap-top"><code>organizations_feature_set</code></a></td>
        <td>Specify `ALL` or `CONSOLIDATED_BILLING`.</td>
    </tr><tr>
        <td><a name="password_reset_required" href="#password_reset_required" className="snap-top"><code>password_reset_required</code></a></td>
        <td>Force the user to reset their password on initial login. Only used for users with create_login_profile set to true.</td>
    </tr><tr>
        <td><a name="rds_storage_encrypted_kms_id" href="#rds_storage_encrypted_kms_id" className="snap-top"><code>rds_storage_encrypted_kms_id</code></a></td>
        <td>KMS key ID or ARN used to encrypt the storage. Used for configuring the RDS storage encryption config rule.</td>
    </tr><tr>
        <td><a name="should_create_iam_group_auto_deploy" href="#should_create_iam_group_auto_deploy" className="snap-top"><code>should_create_iam_group_auto_deploy</code></a></td>
        <td>Should we create the IAM Group for auto-deploy? Allows automated deployment by granting the permissions specified in var.auto_deploy_permissions. (true or false)</td>
    </tr><tr>
        <td><a name="should_create_iam_group_billing" href="#should_create_iam_group_billing" className="snap-top"><code>should_create_iam_group_billing</code></a></td>
        <td>Should we create the IAM Group for billing? Allows read-write access to billing features only. (true or false)</td>
    </tr><tr>
        <td><a name="should_create_iam_group_developers" href="#should_create_iam_group_developers" className="snap-top"><code>should_create_iam_group_developers</code></a></td>
        <td>Should we create the IAM Group for developers? The permissions of that group are specified via var.iam_group_developers_permitted_services. (true or false)</td>
    </tr><tr>
        <td><a name="should_create_iam_group_full_access" href="#should_create_iam_group_full_access" className="snap-top"><code>should_create_iam_group_full_access</code></a></td>
        <td>Should we create the IAM Group for full access? Allows full access to all AWS resources. (true or false)</td>
    </tr><tr>
        <td><a name="should_create_iam_group_houston_cli_users" href="#should_create_iam_group_houston_cli_users" className="snap-top"><code>should_create_iam_group_houston_cli_users</code></a></td>
        <td>Should we create the IAM Group for houston CLI users? Allows users to use the houston CLI for managing and deploying services.</td>
    </tr><tr>
        <td><a name="should_create_iam_group_logs" href="#should_create_iam_group_logs" className="snap-top"><code>should_create_iam_group_logs</code></a></td>
        <td>Should we create the IAM Group for logs? Allows read access to logs in CloudTrail, AWS Config, and CloudWatch. If var.cloudtrail_kms_key_arn is specified, will also be given permissions to decrypt with the KMS CMK that is used to encrypt CloudTrail logs. (true or false)</td>
    </tr><tr>
        <td><a name="should_create_iam_group_read_only" href="#should_create_iam_group_read_only" className="snap-top"><code>should_create_iam_group_read_only</code></a></td>
        <td>Should we create the IAM Group for read-only? Allows read-only access to all AWS resources. (true or false)</td>
    </tr><tr>
        <td><a name="should_create_iam_group_support" href="#should_create_iam_group_support" className="snap-top"><code>should_create_iam_group_support</code></a></td>
        <td>Should we create the IAM Group for support? Allows access to AWS support. (true or false)</td>
    </tr><tr>
        <td><a name="should_create_iam_group_use_existing_iam_roles" href="#should_create_iam_group_use_existing_iam_roles" className="snap-top"><code>should_create_iam_group_use_existing_iam_roles</code></a></td>
        <td>Should we create the IAM Group for use-existing-iam-roles? Allow launching AWS resources with existing IAM Roles, but no ability to create new IAM Roles. (true or false)</td>
    </tr><tr>
        <td><a name="should_create_iam_group_user_self_mgmt" href="#should_create_iam_group_user_self_mgmt" className="snap-top"><code>should_create_iam_group_user_self_mgmt</code></a></td>
        <td>Should we create the IAM Group for user self-management? Allows users to manage their own IAM user accounts, but not other IAM users. (true or false)</td>
    </tr><tr>
        <td><a name="should_require_mfa" href="#should_require_mfa" className="snap-top"><code>should_require_mfa</code></a></td>
        <td>Should we require that all IAM Users use Multi-Factor Authentication for both AWS API calls and the AWS Web Console? (true or false)</td>
    </tr><tr>
        <td><a name="users" href="#users" className="snap-top"><code>users</code></a></td>
        <td>A map of users to create. The keys are the user names and the values are an object with the optional keys 'groups' (a list of IAM groups to add the user to), 'tags' (a map of tags to apply to the user), 'pgp_key' (either a base-64 encoded PGP public key, or a keybase username in the form keybase:username, used to encrypt the user's credentials; required if create_login_profile or create_access_keys is true), 'create_login_profile' (if set to true, create a password to login to the AWS Web Console), 'create_access_keys' (if set to true, create access keys for the user), 'path' (the path), and 'permissions_boundary' (the ARN of the policy that is used to set the permissions boundary for the user).</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <table>
        <thead>
            <tr>
              <td><b>Variable name</b></td>
              <td><b>Description</b></td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td><a name="allow_auto_deploy_access_from_other_accounts_iam_role_arn" href="#allow_auto_deploy_access_from_other_accounts_iam_role_arn" className="snap-top"><code>allow_auto_deploy_access_from_other_accounts_iam_role_arn</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_auto_deploy_access_from_other_accounts_iam_role_id" href="#allow_auto_deploy_access_from_other_accounts_iam_role_id" className="snap-top"><code>allow_auto_deploy_access_from_other_accounts_iam_role_id</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_billing_access_from_other_accounts_iam_role_arn" href="#allow_billing_access_from_other_accounts_iam_role_arn" className="snap-top"><code>allow_billing_access_from_other_accounts_iam_role_arn</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_billing_access_from_other_accounts_iam_role_id" href="#allow_billing_access_from_other_accounts_iam_role_id" className="snap-top"><code>allow_billing_access_from_other_accounts_iam_role_id</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_billing_access_sign_in_url" href="#allow_billing_access_sign_in_url" className="snap-top"><code>allow_billing_access_sign_in_url</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_dev_access_from_other_accounts_iam_role_arn" href="#allow_dev_access_from_other_accounts_iam_role_arn" className="snap-top"><code>allow_dev_access_from_other_accounts_iam_role_arn</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_dev_access_from_other_accounts_iam_role_id" href="#allow_dev_access_from_other_accounts_iam_role_id" className="snap-top"><code>allow_dev_access_from_other_accounts_iam_role_id</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_dev_access_sign_in_url" href="#allow_dev_access_sign_in_url" className="snap-top"><code>allow_dev_access_sign_in_url</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_full_access_from_other_accounts_iam_role_arn" href="#allow_full_access_from_other_accounts_iam_role_arn" className="snap-top"><code>allow_full_access_from_other_accounts_iam_role_arn</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_full_access_from_other_accounts_iam_role_id" href="#allow_full_access_from_other_accounts_iam_role_id" className="snap-top"><code>allow_full_access_from_other_accounts_iam_role_id</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_full_access_sign_in_url" href="#allow_full_access_sign_in_url" className="snap-top"><code>allow_full_access_sign_in_url</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_houston_cli_access_from_other_accounts_iam_role_arn" href="#allow_houston_cli_access_from_other_accounts_iam_role_arn" className="snap-top"><code>allow_houston_cli_access_from_other_accounts_iam_role_arn</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_houston_cli_access_from_other_accounts_iam_role_id" href="#allow_houston_cli_access_from_other_accounts_iam_role_id" className="snap-top"><code>allow_houston_cli_access_from_other_accounts_iam_role_id</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_iam_admin_access_from_other_accounts_iam_role_arn" href="#allow_iam_admin_access_from_other_accounts_iam_role_arn" className="snap-top"><code>allow_iam_admin_access_from_other_accounts_iam_role_arn</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_iam_admin_access_from_other_accounts_iam_role_id" href="#allow_iam_admin_access_from_other_accounts_iam_role_id" className="snap-top"><code>allow_iam_admin_access_from_other_accounts_iam_role_id</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_iam_admin_access_sign_in_url" href="#allow_iam_admin_access_sign_in_url" className="snap-top"><code>allow_iam_admin_access_sign_in_url</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_logs_access_from_other_accounts_iam_role_arn" href="#allow_logs_access_from_other_accounts_iam_role_arn" className="snap-top"><code>allow_logs_access_from_other_accounts_iam_role_arn</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_logs_access_from_other_accounts_iam_role_id" href="#allow_logs_access_from_other_accounts_iam_role_id" className="snap-top"><code>allow_logs_access_from_other_accounts_iam_role_id</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_logs_access_sign_in_url" href="#allow_logs_access_sign_in_url" className="snap-top"><code>allow_logs_access_sign_in_url</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_read_only_access_from_other_accounts_iam_role_arn" href="#allow_read_only_access_from_other_accounts_iam_role_arn" className="snap-top"><code>allow_read_only_access_from_other_accounts_iam_role_arn</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_read_only_access_from_other_accounts_iam_role_id" href="#allow_read_only_access_from_other_accounts_iam_role_id" className="snap-top"><code>allow_read_only_access_from_other_accounts_iam_role_id</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_read_only_access_sign_in_url" href="#allow_read_only_access_sign_in_url" className="snap-top"><code>allow_read_only_access_sign_in_url</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_ssh_grunt_access_from_other_accounts_iam_role_arn" href="#allow_ssh_grunt_access_from_other_accounts_iam_role_arn" className="snap-top"><code>allow_ssh_grunt_access_from_other_accounts_iam_role_arn</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_ssh_grunt_access_from_other_accounts_iam_role_id" href="#allow_ssh_grunt_access_from_other_accounts_iam_role_id" className="snap-top"><code>allow_ssh_grunt_access_from_other_accounts_iam_role_id</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_ssh_grunt_access_sign_in_url" href="#allow_ssh_grunt_access_sign_in_url" className="snap-top"><code>allow_ssh_grunt_access_sign_in_url</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_ssh_grunt_houston_access_from_other_accounts_iam_role_arn" href="#allow_ssh_grunt_houston_access_from_other_accounts_iam_role_arn" className="snap-top"><code>allow_ssh_grunt_houston_access_from_other_accounts_iam_role_arn</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_ssh_grunt_houston_access_from_other_accounts_iam_role_id" href="#allow_ssh_grunt_houston_access_from_other_accounts_iam_role_id" className="snap-top"><code>allow_ssh_grunt_houston_access_from_other_accounts_iam_role_id</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_ssh_grunt_houston_access_sign_in_url" href="#allow_ssh_grunt_houston_access_sign_in_url" className="snap-top"><code>allow_ssh_grunt_houston_access_sign_in_url</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_support_access_from_other_accounts_iam_role_arn" href="#allow_support_access_from_other_accounts_iam_role_arn" className="snap-top"><code>allow_support_access_from_other_accounts_iam_role_arn</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_support_access_from_other_accounts_iam_role_id" href="#allow_support_access_from_other_accounts_iam_role_id" className="snap-top"><code>allow_support_access_from_other_accounts_iam_role_id</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="allow_support_access_sign_in_url" href="#allow_support_access_sign_in_url" className="snap-top"><code>allow_support_access_sign_in_url</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="aws_ebs_encryption_by_default_enabled" href="#aws_ebs_encryption_by_default_enabled" className="snap-top"><code>aws_ebs_encryption_by_default_enabled</code></a></td>
        <td>A map from region to a boolean indicating whether or not EBS encryption is enabled by default for each region.</td>
    </tr><tr>
        <td><a name="aws_ebs_encryption_default_kms_key" href="#aws_ebs_encryption_default_kms_key" className="snap-top"><code>aws_ebs_encryption_default_kms_key</code></a></td>
        <td>A map from region to the ARN of the KMS key used for default EBS encryption for each region.</td>
    </tr><tr>
        <td><a name="billing_iam_group_arn" href="#billing_iam_group_arn" className="snap-top"><code>billing_iam_group_arn</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="billing_iam_group_name" href="#billing_iam_group_name" className="snap-top"><code>billing_iam_group_name</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="child_accounts" href="#child_accounts" className="snap-top"><code>child_accounts</code></a></td>
        <td>A map of all accounts created by this module (NOT including the root account). The keys are the names of the accounts and the values are the attributes for the account as defined in the aws_organizations_account resource.</td>
    </tr><tr>
        <td><a name="cloudtrail_cloudwatch_group_arn" href="#cloudtrail_cloudwatch_group_arn" className="snap-top"><code>cloudtrail_cloudwatch_group_arn</code></a></td>
        <td>The ARN of the cloudwatch log group.</td>
    </tr><tr>
        <td><a name="cloudtrail_cloudwatch_group_name" href="#cloudtrail_cloudwatch_group_name" className="snap-top"><code>cloudtrail_cloudwatch_group_name</code></a></td>
        <td>The name of the cloudwatch log group.</td>
    </tr><tr>
        <td><a name="cloudtrail_iam_role_arn" href="#cloudtrail_iam_role_arn" className="snap-top"><code>cloudtrail_iam_role_arn</code></a></td>
        <td>The ARN of the IAM role used by the cloudwatch log group.</td>
    </tr><tr>
        <td><a name="cloudtrail_iam_role_name" href="#cloudtrail_iam_role_name" className="snap-top"><code>cloudtrail_iam_role_name</code></a></td>
        <td>The name of the IAM role used by the cloudwatch log group.</td>
    </tr><tr>
        <td><a name="cloudtrail_kms_key_alias_name" href="#cloudtrail_kms_key_alias_name" className="snap-top"><code>cloudtrail_kms_key_alias_name</code></a></td>
        <td>The alias of the KMS key used by the S3 bucket to encrypt cloudtrail logs.</td>
    </tr><tr>
        <td><a name="cloudtrail_kms_key_arn" href="#cloudtrail_kms_key_arn" className="snap-top"><code>cloudtrail_kms_key_arn</code></a></td>
        <td>The ARN of the KMS key used by the S3 bucket to encrypt cloudtrail logs.</td>
    </tr><tr>
        <td><a name="cloudtrail_kms_key_arn_with_dependency" href="#cloudtrail_kms_key_arn_with_dependency" className="snap-top"><code>cloudtrail_kms_key_arn_with_dependency</code></a></td>
        <td>The ARN of the KMS key used by the S3 bucket to encrypt cloudtrail logs.</td>
    </tr><tr>
        <td><a name="cloudtrail_s3_access_logging_bucket_arn" href="#cloudtrail_s3_access_logging_bucket_arn" className="snap-top"><code>cloudtrail_s3_access_logging_bucket_arn</code></a></td>
        <td>The ARN of the S3 bucket where access logs for the CloudTrail S3 bucket are delivered.</td>
    </tr><tr>
        <td><a name="cloudtrail_s3_access_logging_bucket_name" href="#cloudtrail_s3_access_logging_bucket_name" className="snap-top"><code>cloudtrail_s3_access_logging_bucket_name</code></a></td>
        <td>The name of the S3 bucket where access logs for the CloudTrail S3 bucket are delivered.</td>
    </tr><tr>
        <td><a name="cloudtrail_s3_bucket_arn" href="#cloudtrail_s3_bucket_arn" className="snap-top"><code>cloudtrail_s3_bucket_arn</code></a></td>
        <td>The ARN of the S3 bucket where cloudtrail logs are delivered.</td>
    </tr><tr>
        <td><a name="cloudtrail_s3_bucket_name" href="#cloudtrail_s3_bucket_name" className="snap-top"><code>cloudtrail_s3_bucket_name</code></a></td>
        <td>The name of the S3 bucket where cloudtrail logs are delivered.</td>
    </tr><tr>
        <td><a name="cloudtrail_s3_bucket_name_with_dependency" href="#cloudtrail_s3_bucket_name_with_dependency" className="snap-top"><code>cloudtrail_s3_bucket_name_with_dependency</code></a></td>
        <td>The name of the S3 bucket where cloudtrail logs are delivered. Sources from 'data'.</td>
    </tr><tr>
        <td><a name="cloudtrail_trail_arn" href="#cloudtrail_trail_arn" className="snap-top"><code>cloudtrail_trail_arn</code></a></td>
        <td>The ARN of the cloudtrail trail.</td>
    </tr><tr>
        <td><a name="config_iam_role_arns" href="#config_iam_role_arns" className="snap-top"><code>config_iam_role_arns</code></a></td>
        <td>The ARNs of the IAM role used by the config recorder.</td>
    </tr><tr>
        <td><a name="config_recorder_names" href="#config_recorder_names" className="snap-top"><code>config_recorder_names</code></a></td>
        <td>The names of the configuration recorder.</td>
    </tr><tr>
        <td><a name="config_s3_bucket_arn" href="#config_s3_bucket_arn" className="snap-top"><code>config_s3_bucket_arn</code></a></td>
        <td>The ARN of the S3 bucket used by AWS Config to store configuration items.</td>
    </tr><tr>
        <td><a name="config_s3_bucket_name" href="#config_s3_bucket_name" className="snap-top"><code>config_s3_bucket_name</code></a></td>
        <td>The name of the S3 bucket used by AWS Config to store configuration items.</td>
    </tr><tr>
        <td><a name="config_s3_bucket_name_with_dependency" href="#config_s3_bucket_name_with_dependency" className="snap-top"><code>config_s3_bucket_name_with_dependency</code></a></td>
        <td>The name of the S3 bucket used by AWS Config to store configuration items, sources from 'data'.</td>
    </tr><tr>
        <td><a name="config_sns_topic_arns" href="#config_sns_topic_arns" className="snap-top"><code>config_sns_topic_arns</code></a></td>
        <td>The ARNs of the SNS Topic used by the config notifications.</td>
    </tr><tr>
        <td><a name="cross_account_access_all_group_arn" href="#cross_account_access_all_group_arn" className="snap-top"><code>cross_account_access_all_group_arn</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="cross_account_access_all_group_name" href="#cross_account_access_all_group_name" className="snap-top"><code>cross_account_access_all_group_name</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="cross_account_access_group_arns" href="#cross_account_access_group_arns" className="snap-top"><code>cross_account_access_group_arns</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="cross_account_access_group_names" href="#cross_account_access_group_names" className="snap-top"><code>cross_account_access_group_names</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="developers_iam_group_arn" href="#developers_iam_group_arn" className="snap-top"><code>developers_iam_group_arn</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="developers_iam_group_name" href="#developers_iam_group_name" className="snap-top"><code>developers_iam_group_name</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="full_access_iam_group_arn" href="#full_access_iam_group_arn" className="snap-top"><code>full_access_iam_group_arn</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="full_access_iam_group_name" href="#full_access_iam_group_name" className="snap-top"><code>full_access_iam_group_name</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="guardduty_cloudwatch_event_rule_arns" href="#guardduty_cloudwatch_event_rule_arns" className="snap-top"><code>guardduty_cloudwatch_event_rule_arns</code></a></td>
        <td>The ARNs of the cloudwatch event rules used to publish findings to sns if var.publish_findings_to_sns is set to true.</td>
    </tr><tr>
        <td><a name="guardduty_cloudwatch_event_target_arns" href="#guardduty_cloudwatch_event_target_arns" className="snap-top"><code>guardduty_cloudwatch_event_target_arns</code></a></td>
        <td>The ARNs of the cloudwatch event targets used to publish findings to sns if var.publish_findings_to_sns is set to true.</td>
    </tr><tr>
        <td><a name="guardduty_detector_ids" href="#guardduty_detector_ids" className="snap-top"><code>guardduty_detector_ids</code></a></td>
        <td>The IDs of the GuardDuty detectors.</td>
    </tr><tr>
        <td><a name="guardduty_findings_sns_topic_arns" href="#guardduty_findings_sns_topic_arns" className="snap-top"><code>guardduty_findings_sns_topic_arns</code></a></td>
        <td>The ARNs of the SNS topics where findings are published if var.publish_findings_to_sns is set to true.</td>
    </tr><tr>
        <td><a name="guardduty_findings_sns_topic_names" href="#guardduty_findings_sns_topic_names" className="snap-top"><code>guardduty_findings_sns_topic_names</code></a></td>
        <td>The names of the SNS topic where findings are published if var.publish_findings_to_sns is set to true.</td>
    </tr><tr>
        <td><a name="houston_cli_users_iam_group_arn" href="#houston_cli_users_iam_group_arn" className="snap-top"><code>houston_cli_users_iam_group_arn</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="houston_cli_users_iam_group_name" href="#houston_cli_users_iam_group_name" className="snap-top"><code>houston_cli_users_iam_group_name</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="iam_admin_iam_group_arn" href="#iam_admin_iam_group_arn" className="snap-top"><code>iam_admin_iam_group_arn</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="iam_admin_iam_group_name" href="#iam_admin_iam_group_name" className="snap-top"><code>iam_admin_iam_group_name</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="iam_admin_iam_policy_arn" href="#iam_admin_iam_policy_arn" className="snap-top"><code>iam_admin_iam_policy_arn</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="iam_self_mgmt_iam_group_arn" href="#iam_self_mgmt_iam_group_arn" className="snap-top"><code>iam_self_mgmt_iam_group_arn</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="iam_self_mgmt_iam_group_name" href="#iam_self_mgmt_iam_group_name" className="snap-top"><code>iam_self_mgmt_iam_group_name</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="iam_self_mgmt_iam_policy_arn" href="#iam_self_mgmt_iam_policy_arn" className="snap-top"><code>iam_self_mgmt_iam_policy_arn</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="logs_iam_group_arn" href="#logs_iam_group_arn" className="snap-top"><code>logs_iam_group_arn</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="logs_iam_group_name" href="#logs_iam_group_name" className="snap-top"><code>logs_iam_group_name</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="master_account_arn" href="#master_account_arn" className="snap-top"><code>master_account_arn</code></a></td>
        <td>ARN of the master account.</td>
    </tr><tr>
        <td><a name="master_account_email" href="#master_account_email" className="snap-top"><code>master_account_email</code></a></td>
        <td>Email address of the master account.</td>
    </tr><tr>
        <td><a name="master_account_id" href="#master_account_id" className="snap-top"><code>master_account_id</code></a></td>
        <td>Identifier of the master account.</td>
    </tr><tr>
        <td><a name="organization_arn" href="#organization_arn" className="snap-top"><code>organization_arn</code></a></td>
        <td>ARN of the organization.</td>
    </tr><tr>
        <td><a name="organization_id" href="#organization_id" className="snap-top"><code>organization_id</code></a></td>
        <td>Identifier of the organization.</td>
    </tr><tr>
        <td><a name="organization_root_id" href="#organization_root_id" className="snap-top"><code>organization_root_id</code></a></td>
        <td>Identifier of the root of this organization.</td>
    </tr><tr>
        <td><a name="read_only_iam_group_arn" href="#read_only_iam_group_arn" className="snap-top"><code>read_only_iam_group_arn</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="read_only_iam_group_name" href="#read_only_iam_group_name" className="snap-top"><code>read_only_iam_group_name</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="require_mfa_policy" href="#require_mfa_policy" className="snap-top"><code>require_mfa_policy</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="ssh_grunt_sudo_users_group_arns" href="#ssh_grunt_sudo_users_group_arns" className="snap-top"><code>ssh_grunt_sudo_users_group_arns</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="ssh_grunt_sudo_users_group_names" href="#ssh_grunt_sudo_users_group_names" className="snap-top"><code>ssh_grunt_sudo_users_group_names</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="ssh_grunt_users_group_arns" href="#ssh_grunt_users_group_arns" className="snap-top"><code>ssh_grunt_users_group_arns</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="ssh_grunt_users_group_names" href="#ssh_grunt_users_group_names" className="snap-top"><code>ssh_grunt_users_group_names</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="support_iam_group_arn" href="#support_iam_group_arn" className="snap-top"><code>support_iam_group_arn</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="support_iam_group_name" href="#support_iam_group_name" className="snap-top"><code>support_iam_group_name</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="use_existing_iam_roles_iam_group_arn" href="#use_existing_iam_roles_iam_group_arn" className="snap-top"><code>use_existing_iam_roles_iam_group_arn</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="use_existing_iam_roles_iam_group_name" href="#use_existing_iam_roles_iam_group_name" className="snap-top"><code>use_existing_iam_roles_iam_group_name</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="user_access_keys" href="#user_access_keys" className="snap-top"><code>user_access_keys</code></a></td>
        <td>A map of user name to that user's access keys (a map with keys access_key_id and secret_access_key), with the secret_access_key encrypted with that user's PGP key (only shows up for users with create_access_keys = true). You can decrypt the secret_access_key on the CLI: echo &lt;secret_access_key> | base64 --decode | keybase pgp decrypt</td>
    </tr><tr>
        <td><a name="user_arns" href="#user_arns" className="snap-top"><code>user_arns</code></a></td>
        <td>A map of user name to the ARN for that IAM user.</td>
    </tr><tr>
        <td><a name="user_passwords" href="#user_passwords" className="snap-top"><code>user_passwords</code></a></td>
        <td>A map of user name to that user's AWS Web Console password, encrypted with that user's PGP key (only shows up for users with create_login_profile = true). You can decrypt the password on the CLI: echo &lt;password> | base64 --decode | keybase pgp decrypt</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"abfb5045352bfe59019bd71cdbda82db"}
##DOCS-SOURCER-END -->
