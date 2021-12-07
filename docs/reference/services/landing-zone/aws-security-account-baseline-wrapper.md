import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# AWS Security Account baseline wrapper

A security baseline for AWS Landing Zone for configuring the security account (the one where all your IAM users and IAM groups are defined), including setting up AWS Config, AWS CloudTrail, Amazon Guard Duty, IAM users, IAM groups, IAM password policy, and more.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/landingzone/account-baseline-security" className="link-button">View on GitHub</a>

### Reference

<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <ul>
      
    <li>
      <p>
        <a name="additional_config_rules" href="#additional_config_rules" className="snap-top">
          <code>additional_config_rules</code>
        </a> - Map of additional managed rules to add. The key is the name of the rule (e.g. ´acm-certificate-expiration-check´) and the value is an object specifying the rule details
      </p>
    </li>
    <li>
      <p>
        <a name="allow_auto_deploy_from_other_account_arns" href="#allow_auto_deploy_from_other_account_arns" className="snap-top">
          <code>allow_auto_deploy_from_other_account_arns</code>
        </a> - A list of IAM ARNs from other AWS accounts that will be allowed to assume the auto deploy IAM role that has the permissions in var.auto_deploy_permissions.
      </p>
    </li>
    <li>
      <p>
        <a name="allow_billing_access_from_other_account_arns" href="#allow_billing_access_from_other_account_arns" className="snap-top">
          <code>allow_billing_access_from_other_account_arns</code>
        </a> - A list of IAM ARNs from other AWS accounts that will be allowed full (read and write) access to the billing info for this account.
      </p>
    </li>
    <li>
      <p>
        <a name="allow_cloudtrail_access_with_iam" href="#allow_cloudtrail_access_with_iam" className="snap-top">
          <code>allow_cloudtrail_access_with_iam</code>
        </a> - If true, an IAM Policy that grants access to CloudTrail will be honored. If false, only the ARNs listed in var.kms_key_user_iam_arns will have access to CloudTrail and any IAM Policy grants will be ignored. (true or false)
      </p>
    </li>
    <li>
      <p>
        <a name="allow_dev_access_from_other_account_arns" href="#allow_dev_access_from_other_account_arns" className="snap-top">
          <code>allow_dev_access_from_other_account_arns</code>
        </a> - A list of IAM ARNs from other AWS accounts that will be allowed full (read and write) access to the services in this account specified in var.dev_permitted_services.
      </p>
    </li>
    <li>
      <p>
        <a name="allow_full_access_from_other_account_arns" href="#allow_full_access_from_other_account_arns" className="snap-top">
          <code>allow_full_access_from_other_account_arns</code>
        </a> - A list of IAM ARNs from other AWS accounts that will be allowed full (read and write) access to this account.
      </p>
    </li>
    <li>
      <p>
        <a name="allow_logs_access_from_other_account_arns" href="#allow_logs_access_from_other_account_arns" className="snap-top">
          <code>allow_logs_access_from_other_account_arns</code>
        </a> - A list of IAM ARNs from other AWS accounts that will be allowed access to the logs in CloudTrail, AWS Config, and CloudWatch for this account. Will also be given permissions to decrypt with the KMS CMK that is used to encrypt CloudTrail logs.
      </p>
    </li>
    <li>
      <p>
        <a name="allow_read_only_access_from_other_account_arns" href="#allow_read_only_access_from_other_account_arns" className="snap-top">
          <code>allow_read_only_access_from_other_account_arns</code>
        </a> - A list of IAM ARNs from other AWS accounts that will be allowed read-only access to this account.
      </p>
    </li>
    <li>
      <p>
        <a name="allow_ssh_grunt_access_from_other_account_arns" href="#allow_ssh_grunt_access_from_other_account_arns" className="snap-top">
          <code>allow_ssh_grunt_access_from_other_account_arns</code>
        </a> - A list of IAM ARNs from other AWS accounts that will be allowed read access to IAM groups and publish SSH keys. This is used for ssh-grunt.
      </p>
    </li>
    <li>
      <p>
        <a name="allow_support_access_from_other_account_arns" href="#allow_support_access_from_other_account_arns" className="snap-top">
          <code>allow_support_access_from_other_account_arns</code>
        </a> - A list of IAM ARNs from other AWS accounts that will be allowed support access (AWSSupportAccess) to this account.
      </p>
    </li>
    <li>
      <p>
        <a name="auto_deploy_permissions" href="#auto_deploy_permissions" className="snap-top">
          <code>auto_deploy_permissions</code>
        </a> - A list of IAM permissions (e.g. ec2:*) that will be added to an IAM Group for doing automated deployments. NOTE: If var.should_create_iam_group_auto_deploy is true, the list must have at least one element (e.g. '*').
      </p>
    </li>
    <li>
      <p>
        <a name="aws_account_id" href="#aws_account_id" className="snap-top">
          <code>aws_account_id</code>
        </a> - The AWS Account ID the template should be operated on. This avoids misconfiguration errors caused by environment variables.
      </p>
    </li>
    <li>
      <p>
        <a name="aws_region" href="#aws_region" className="snap-top">
          <code>aws_region</code>
        </a> - The AWS Region to use as the global config recorder and seed region for GuardDuty.
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_allow_kms_describe_key_to_external_aws_accounts" href="#cloudtrail_allow_kms_describe_key_to_external_aws_accounts" className="snap-top">
          <code>cloudtrail_allow_kms_describe_key_to_external_aws_accounts</code>
        </a> - Whether or not to allow kms:DescribeKey to external AWS accounts with write access to the CloudTrail bucket. This is useful during deployment so that you don't have to pass around the KMS key ARN.
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_cloudwatch_logs_group_name" href="#cloudtrail_cloudwatch_logs_group_name" className="snap-top">
          <code>cloudtrail_cloudwatch_logs_group_name</code>
        </a> - Specify the name of the CloudWatch Logs group to publish the CloudTrail logs to. This log group exists in the current account. Set this value to `null` to avoid publishing the trail logs to the logs group. The recommended configuration for CloudTrail is (a) for each child account to aggregate its logs in an S3 bucket in a single central account, such as a logs account and (b) to also store 14 days work of logs in CloudWatch in the child account itself for local debugging.
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_data_logging_enabled" href="#cloudtrail_data_logging_enabled" className="snap-top">
          <code>cloudtrail_data_logging_enabled</code>
        </a> - If true, logging of data events will be enabled.
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_data_logging_include_management_events" href="#cloudtrail_data_logging_include_management_events" className="snap-top">
          <code>cloudtrail_data_logging_include_management_events</code>
        </a> - Specify if you want your event selector to include management events for your trail.
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_data_logging_read_write_type" href="#cloudtrail_data_logging_read_write_type" className="snap-top">
          <code>cloudtrail_data_logging_read_write_type</code>
        </a> - Specify if you want your trail to log read-only events, write-only events, or all. Possible values are: ReadOnly, WriteOnly, All.
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_data_logging_resources" href="#cloudtrail_data_logging_resources" className="snap-top">
          <code>cloudtrail_data_logging_resources</code>
        </a> - Data resources for which to log data events. This should be a map, where each key is a data resource type, and each value is a list of data resource values. Possible values for data resource types are: AWS::S3::Object, AWS::Lambda::Function and AWS::DynamoDB::Table. See the 'data_resource' block within the 'event_selector' block of the 'aws_cloudtrail' resource for context: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudtrail#data_resource.
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_external_aws_account_ids_with_write_access" href="#cloudtrail_external_aws_account_ids_with_write_access" className="snap-top">
          <code>cloudtrail_external_aws_account_ids_with_write_access</code>
        </a> - A list of external AWS accounts that should be given write access for CloudTrail logs to this S3 bucket. This is useful when aggregating CloudTrail logs for multiple AWS accounts in one common S3 bucket.
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_force_destroy" href="#cloudtrail_force_destroy" className="snap-top">
          <code>cloudtrail_force_destroy</code>
        </a> - If set to true, when you run 'terraform destroy', delete all objects from the bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_kms_key_administrator_iam_arns" href="#cloudtrail_kms_key_administrator_iam_arns" className="snap-top">
          <code>cloudtrail_kms_key_administrator_iam_arns</code>
        </a> - All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key) that governs access to write API calls older than 7 days and all read API calls. The IAM Users specified in this list will have rights to change who can access this extended log data.
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_kms_key_arn" href="#cloudtrail_kms_key_arn" className="snap-top">
          <code>cloudtrail_kms_key_arn</code>
        </a> - All CloudTrail Logs will be encrypted with a KMS CMK (Customer Master Key) that governs access to write API calls older than 7 days and all read API calls. If that CMK already exists, set this to the ARN of that CMK. Otherwise, set this to null, and a new CMK will be created. We recommend setting this to the ARN of a CMK that already exists in a separate logs account.
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_kms_key_arn_is_alias" href="#cloudtrail_kms_key_arn_is_alias" className="snap-top">
          <code>cloudtrail_kms_key_arn_is_alias</code>
        </a> - If the kms_key_arn provided is an alias or alias ARN, then this must be set to true so that the module will exchange the alias for a CMK ARN. Setting this to true and using aliases requires var.cloudtrail_allow_kms_describe_key_to_external_aws_accounts to also be true for multi-account scenarios.
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_kms_key_user_iam_arns" href="#cloudtrail_kms_key_user_iam_arns" className="snap-top">
          <code>cloudtrail_kms_key_user_iam_arns</code>
        </a> - All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key) that governs access to write API calls older than 7 days and all read API calls. The IAM Users specified in this list will have read-only access to this extended log data.
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_num_days_after_which_archive_log_data" href="#cloudtrail_num_days_after_which_archive_log_data" className="snap-top">
          <code>cloudtrail_num_days_after_which_archive_log_data</code>
        </a> - After this number of days, log files should be transitioned from S3 to Glacier. Enter 0 to never archive log data.
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_num_days_after_which_delete_log_data" href="#cloudtrail_num_days_after_which_delete_log_data" className="snap-top">
          <code>cloudtrail_num_days_after_which_delete_log_data</code>
        </a> - After this number of days, log files should be deleted from S3. Enter 0 to never delete log data.
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_num_days_to_retain_cloudwatch_logs" href="#cloudtrail_num_days_to_retain_cloudwatch_logs" className="snap-top">
          <code>cloudtrail_num_days_to_retain_cloudwatch_logs</code>
        </a> - After this number of days, logs stored in CloudWatch will be deleted. Possible values are: 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1827, 3653, and 0 (default). When set to 0, logs will be retained indefinitely.
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_s3_bucket_already_exists" href="#cloudtrail_s3_bucket_already_exists" className="snap-top">
          <code>cloudtrail_s3_bucket_already_exists</code>
        </a> - Set to false to create an S3 bucket of name var.cloudtrail_s3_bucket_name in this account for storing CloudTrail logs. Set to true to assume the bucket specified in var.cloudtrail_s3_bucket_name already exists in another AWS account. We recommend setting this to true and setting var.cloudtrail_s3_bucket_name to the name of a bucket that already exists in a separate logs account.
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_s3_bucket_name" href="#cloudtrail_s3_bucket_name" className="snap-top">
          <code>cloudtrail_s3_bucket_name</code>
        </a> - The name of the S3 Bucket where CloudTrail logs will be stored. If value is `null`, defaults to `var.name_prefix`-cloudtrail
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_s3_mfa_delete" href="#cloudtrail_s3_mfa_delete" className="snap-top">
          <code>cloudtrail_s3_mfa_delete</code>
        </a> - Enable MFA delete for either 'Change the versioning state of your bucket' or 'Permanently delete an object version'. This setting only applies to the bucket used to storage Cloudtrail data. This cannot be used to toggle this setting but is available to allow managed buckets to reflect the state in AWS. For instructions on how to enable MFA Delete, check out the README from the terraform-aws-security/private-s3-bucket module.
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_tags" href="#cloudtrail_tags" className="snap-top">
          <code>cloudtrail_tags</code>
        </a> - Tags to apply to the CloudTrail resources.
      </p>
    </li>
    <li>
      <p>
        <a name="config_aggregate_config_data_in_external_account" href="#config_aggregate_config_data_in_external_account" className="snap-top">
          <code>config_aggregate_config_data_in_external_account</code>
        </a> - Set to true to send the AWS Config data to another account (e.g., a logs account) for aggregation purposes. You must set the ID of that other account via the config_central_account_id variable. This redundant variable has to exist because Terraform does not allow computed data in count and for_each parameters and var.config_central_account_id may be computed if its the ID of a newly-created AWS account.
      </p>
    </li>
    <li>
      <p>
        <a name="config_central_account_id" href="#config_central_account_id" className="snap-top">
          <code>config_central_account_id</code>
        </a> - If the S3 bucket and SNS topics used for AWS Config live in a different AWS account, set this variable to the ID of that account. If the S3 bucket and SNS topics live in this account, set this variable to null. We recommend setting this to the ID of a separate logs account. Only used if var.config_aggregate_config_data_in_external_account is true.
      </p>
    </li>
    <li>
      <p>
        <a name="config_create_account_rules" href="#config_create_account_rules" className="snap-top">
          <code>config_create_account_rules</code>
        </a> - Set to true to create AWS Config rules directly in this account. Set false to not create any Config rules in this account (i.e., if you created the rules at the organization level already). We recommend setting this to true to use account-level rules because org-level rules create a chicken-and-egg problem with creating new accounts.
      </p>
    </li>
    <li>
      <p>
        <a name="config_force_destroy" href="#config_force_destroy" className="snap-top">
          <code>config_force_destroy</code>
        </a> - If set to true, when you run 'terraform destroy', delete all objects from the bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!
      </p>
    </li>
    <li>
      <p>
        <a name="config_linked_accounts" href="#config_linked_accounts" className="snap-top">
          <code>config_linked_accounts</code>
        </a> - Provide a list of AWS account IDs that will send Config data to this account. This is useful if your aggregating config data in this account for other accounts.
      </p>
    </li>
    <li>
      <p>
        <a name="config_num_days_after_which_archive_log_data" href="#config_num_days_after_which_archive_log_data" className="snap-top">
          <code>config_num_days_after_which_archive_log_data</code>
        </a> - After this number of days, log files should be transitioned from S3 to Glacier. Enter 0 to never archive log data.
      </p>
    </li>
    <li>
      <p>
        <a name="config_num_days_after_which_delete_log_data" href="#config_num_days_after_which_delete_log_data" className="snap-top">
          <code>config_num_days_after_which_delete_log_data</code>
        </a> - After this number of days, log files should be deleted from S3. Enter 0 to never delete log data.
      </p>
    </li>
    <li>
      <p>
        <a name="config_opt_in_regions" href="#config_opt_in_regions" className="snap-top">
          <code>config_opt_in_regions</code>
        </a> - Creates resources in the specified regions. The best practice is to enable AWS Config in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions.
      </p>
    </li>
    <li>
      <p>
        <a name="config_s3_bucket_name" href="#config_s3_bucket_name" className="snap-top">
          <code>config_s3_bucket_name</code>
        </a> - The name of the S3 Bucket where CloudTrail logs will be stored. This could be a bucket in this AWS account or the name of a bucket in another AWS account where logs should be sent. We recommend setting this to the name of a bucket in a separate logs account.
      </p>
    </li>
    <li>
      <p>
        <a name="config_s3_mfa_delete" href="#config_s3_mfa_delete" className="snap-top">
          <code>config_s3_mfa_delete</code>
        </a> - Enable MFA delete for either 'Change the versioning state of your bucket' or 'Permanently delete an object version'. This setting only applies to the bucket used to storage AWS Config data. This cannot be used to toggle this setting but is available to allow managed buckets to reflect the state in AWS. For instructions on how to enable MFA Delete, check out the README from the terraform-aws-security/private-s3-bucket module.
      </p>
    </li>
    <li>
      <p>
        <a name="config_should_create_s3_bucket" href="#config_should_create_s3_bucket" className="snap-top">
          <code>config_should_create_s3_bucket</code>
        </a> - Set to true to create an S3 bucket of name var.config_s3_bucket_name in this account for storing AWS Config data. Set to false to assume the bucket specified in var.config_s3_bucket_name already exists in another AWS account. We recommend setting this to false and setting var.config_s3_bucket_name to the name off an S3 bucket that already exists in a separate logs account.
      </p>
    </li>
    <li>
      <p>
        <a name="config_should_create_sns_topic" href="#config_should_create_sns_topic" className="snap-top">
          <code>config_should_create_sns_topic</code>
        </a> - Set to true to create an SNS topic in this account for sending AWS Config notifications (e.g., if this is the logs account). Set to false to assume the topic specified in var.config_sns_topic_name already exists in another AWS account (e.g., if this is the stage or prod account and var.config_sns_topic_name is the name of an SNS topic in the logs account).
      </p>
    </li>
    <li>
      <p>
        <a name="config_sns_topic_name" href="#config_sns_topic_name" className="snap-top">
          <code>config_sns_topic_name</code>
        </a> - The name of the SNS Topic in where AWS Config notifications will be sent. Can be in the same account or in another account.
      </p>
    </li>
    <li>
      <p>
        <a name="config_tags" href="#config_tags" className="snap-top">
          <code>config_tags</code>
        </a> - A map of tags to apply to the S3 Bucket. The key is the tag name and the value is the tag value.
      </p>
    </li>
    <li>
      <p>
        <a name="configrules_maximum_execution_frequency" href="#configrules_maximum_execution_frequency" className="snap-top">
          <code>configrules_maximum_execution_frequency</code>
        </a> - The maximum frequency with which AWS Config runs evaluations for the ´PERIODIC´ rules. See https://www.terraform.io/docs/providers/aws/r/config_organization_managed_rule.html#maximum_execution_frequency
      </p>
    </li>
    <li>
      <p>
        <a name="cross_account_access_all_group_name" href="#cross_account_access_all_group_name" className="snap-top">
          <code>cross_account_access_all_group_name</code>
        </a> - The name of the IAM group that will grant access to all external AWS accounts in var.iam_groups_for_cross_account_access.
      </p>
    </li>
    <li>
      <p>
        <a name="dev_permitted_services" href="#dev_permitted_services" className="snap-top">
          <code>dev_permitted_services</code>
        </a> - A list of AWS services for which the developers from the accounts in var.allow_dev_access_from_other_account_arns will receive full permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to grant developers access only to EC2 and Amazon Machine Learning, use the value ["ec2","machinelearning"]. Do NOT add iam to the list of services, or that will grant Developers de facto admin access.
      </p>
    </li>
    <li>
      <p>
        <a name="ebs_enable_encryption" href="#ebs_enable_encryption" className="snap-top">
          <code>ebs_enable_encryption</code>
        </a> - If set to true (default), all new EBS volumes will have encryption enabled by default
      </p>
    </li>
    <li>
      <p>
        <a name="ebs_kms_key_name" href="#ebs_kms_key_name" className="snap-top">
          <code>ebs_kms_key_name</code>
        </a> - The name of the KMS CMK to use by default for encrypting EBS volumes, if var.ebs_enable_encryption and var.ebs_use_existing_kms_keys are enabled. The name must match a name given the var.kms_customer_master_keys variable.
      </p>
    </li>
    <li>
      <p>
        <a name="ebs_opt_in_regions" href="#ebs_opt_in_regions" className="snap-top">
          <code>ebs_opt_in_regions</code>
        </a> - Creates resources in the specified regions. The best practice is to enable EBS Encryption in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions. The value provided for global_recorder_region must be in this list.
      </p>
    </li>
    <li>
      <p>
        <a name="ebs_use_existing_kms_keys" href="#ebs_use_existing_kms_keys" className="snap-top">
          <code>ebs_use_existing_kms_keys</code>
        </a> - If set to true, the KMS Customer Managed Keys (CMK) with the name in var.ebs_kms_key_name will be set as the default for EBS encryption. When false (default), the AWS-managed aws/ebs key will be used.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_cloudtrail" href="#enable_cloudtrail" className="snap-top">
          <code>enable_cloudtrail</code>
        </a> - Set to true (default) to enable CloudTrail in the security account. Set to false to disable CloudTrail (note: all other CloudTrail variables will be ignored). Note that if you have enabled organization trail in the root (parent) account, you should set this to false; the organization trail will enable CloudTrail on child accounts by default.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_config" href="#enable_config" className="snap-top">
          <code>enable_config</code>
        </a> - Set to true to enable AWS Config in the security account. Set to false to disable AWS Config (note: all other AWS config variables will be ignored).
      </p>
    </li>
    <li>
      <p>
        <a name="enable_encrypted_volumes" href="#enable_encrypted_volumes" className="snap-top">
          <code>enable_encrypted_volumes</code>
        </a> - Checks whether the EBS volumes that are in an attached state are encrypted.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_iam_access_analyzer" href="#enable_iam_access_analyzer" className="snap-top">
          <code>enable_iam_access_analyzer</code>
        </a> - A feature flag to enable or disable this module.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_iam_cross_account_roles" href="#enable_iam_cross_account_roles" className="snap-top">
          <code>enable_iam_cross_account_roles</code>
        </a> - A feature flag to enable or disable the Cross Account Iam Roles module.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_iam_groups" href="#enable_iam_groups" className="snap-top">
          <code>enable_iam_groups</code>
        </a> - A feature flag to enable or disable the IAM Groups module.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_iam_password_policy" href="#enable_iam_password_policy" className="snap-top">
          <code>enable_iam_password_policy</code>
        </a> - Checks whether the account password policy for IAM users meets the specified requirements.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_insecure_sg_rules" href="#enable_insecure_sg_rules" className="snap-top">
          <code>enable_insecure_sg_rules</code>
        </a> - Checks whether the security group with 0.0.0.0/0 of any Amazon Virtual Private Cloud (Amazon VPC) allows only specific inbound TCP or UDP traffic.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_rds_storage_encrypted" href="#enable_rds_storage_encrypted" className="snap-top">
          <code>enable_rds_storage_encrypted</code>
        </a> - Checks whether storage encryption is enabled for your RDS DB instances.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_root_account_mfa" href="#enable_root_account_mfa" className="snap-top">
          <code>enable_root_account_mfa</code>
        </a> - Checks whether users of your AWS account require a multi-factor authentication (MFA) device to sign in with root credentials.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_s3_bucket_public_read_prohibited" href="#enable_s3_bucket_public_read_prohibited" className="snap-top">
          <code>enable_s3_bucket_public_read_prohibited</code>
        </a> - Checks that your Amazon S3 buckets do not allow public read access.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_s3_bucket_public_write_prohibited" href="#enable_s3_bucket_public_write_prohibited" className="snap-top">
          <code>enable_s3_bucket_public_write_prohibited</code>
        </a> - Checks that your Amazon S3 buckets do not allow public write access.
      </p>
    </li>
    <li>
      <p>
        <a name="encrypted_volumes_kms_id" href="#encrypted_volumes_kms_id" className="snap-top">
          <code>encrypted_volumes_kms_id</code>
        </a> - ID or ARN of the KMS key that is used to encrypt the volume. Used for configuring the encrypted volumes config rule.
      </p>
    </li>
    <li>
      <p>
        <a name="force_destroy_users" href="#force_destroy_users" className="snap-top">
          <code>force_destroy_users</code>
        </a> - When destroying this user, destroy even if it has non-Terraform-managed IAM access keys, login profile, or MFA devices. Without force_destroy a user with non-Terraform-managed access keys and login profile will fail to be destroyed.
      </p>
    </li>
    <li>
      <p>
        <a name="guardduty_cloudwatch_event_rule_name" href="#guardduty_cloudwatch_event_rule_name" className="snap-top">
          <code>guardduty_cloudwatch_event_rule_name</code>
        </a> - Name of the Cloudwatch event rules.
      </p>
    </li>
    <li>
      <p>
        <a name="guardduty_finding_publishing_frequency" href="#guardduty_finding_publishing_frequency" className="snap-top">
          <code>guardduty_finding_publishing_frequency</code>
        </a> - Specifies the frequency of notifications sent for subsequent finding occurrences. If the detector is a GuardDuty member account, the value is determined by the GuardDuty master account and cannot be modified, otherwise defaults to SIX_HOURS. For standalone and GuardDuty master accounts, it must be configured in Terraform to enable drift detection. Valid values for standalone and master accounts: FIFTEEN_MINUTES, ONE_HOUR, SIX_HOURS.
      </p>
    </li>
    <li>
      <p>
        <a name="guardduty_findings_sns_topic_name" href="#guardduty_findings_sns_topic_name" className="snap-top">
          <code>guardduty_findings_sns_topic_name</code>
        </a> - Specifies a name for the created SNS topics where findings are published. publish_findings_to_sns must be set to true.
      </p>
    </li>
    <li>
      <p>
        <a name="guardduty_opt_in_regions" href="#guardduty_opt_in_regions" className="snap-top">
          <code>guardduty_opt_in_regions</code>
        </a> - Creates resources in the specified regions. The best practice is to enable GuardDuty in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions. The value provided for global_recorder_region must be in this list.
      </p>
    </li>
    <li>
      <p>
        <a name="guardduty_publish_findings_to_sns" href="#guardduty_publish_findings_to_sns" className="snap-top">
          <code>guardduty_publish_findings_to_sns</code>
        </a> - Send GuardDuty findings to SNS topics specified by findings_sns_topic_name.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_access_analyzer_name" href="#iam_access_analyzer_name" className="snap-top">
          <code>iam_access_analyzer_name</code>
        </a> - The name of the IAM Access Analyzer module
      </p>
    </li>
    <li>
      <p>
        <a name="iam_access_analyzer_opt_in_regions" href="#iam_access_analyzer_opt_in_regions" className="snap-top">
          <code>iam_access_analyzer_opt_in_regions</code>
        </a> - Creates resources in the specified regions. The best practice is to enable IAM Access Analyzer in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions. The value provided for global_recorder_region must be in this list.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_access_analyzer_type" href="#iam_access_analyzer_type" className="snap-top">
          <code>iam_access_analyzer_type</code>
        </a> - If set to ACCOUNT, the analyzer will only be scanning the current AWS account it's in. If set to ORGANIZATION - will scan the organization AWS account and the child accounts.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_group_developers_permitted_services" href="#iam_group_developers_permitted_services" className="snap-top">
          <code>iam_group_developers_permitted_services</code>
        </a> - A list of AWS services for which the developers IAM Group will receive full permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to grant developers access only to EC2 and Amazon Machine Learning, use the value ["ec2","machinelearning"]. Do NOT add iam to the list of services, or that will grant Developers de facto admin access. If you need to grant iam privileges, just grant the user Full Access.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_group_name_auto_deploy" href="#iam_group_name_auto_deploy" className="snap-top">
          <code>iam_group_name_auto_deploy</code>
        </a> - The name of the IAM Group that allows automated deployment by graning the permissions specified in var.auto_deploy_permissions.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_group_name_billing" href="#iam_group_name_billing" className="snap-top">
          <code>iam_group_name_billing</code>
        </a> - The name to be used for the IAM Group that grants read/write access to all billing features in AWS.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_group_name_developers" href="#iam_group_name_developers" className="snap-top">
          <code>iam_group_name_developers</code>
        </a> - The name to be used for the IAM Group that grants IAM Users a reasonable set of permissions for developers.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_group_name_full_access" href="#iam_group_name_full_access" className="snap-top">
          <code>iam_group_name_full_access</code>
        </a> - The name to be used for the IAM Group that grants full access to all AWS resources.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_group_name_houston_cli" href="#iam_group_name_houston_cli" className="snap-top">
          <code>iam_group_name_houston_cli</code>
        </a> - The name of the IAM Group that allows access to houston CLI.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_group_name_iam_admin" href="#iam_group_name_iam_admin" className="snap-top">
          <code>iam_group_name_iam_admin</code>
        </a> - The name to be used for the IAM Group that grants IAM administrative access. Effectively grants administrator access.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_group_name_iam_user_self_mgmt" href="#iam_group_name_iam_user_self_mgmt" className="snap-top">
          <code>iam_group_name_iam_user_self_mgmt</code>
        </a> - The name to be used for the IAM Group that grants IAM Users the permissions to manage their own IAM User account.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_group_name_logs" href="#iam_group_name_logs" className="snap-top">
          <code>iam_group_name_logs</code>
        </a> - The name to be used for the IAM Group that grants read access to CloudTrail, AWS Config, and CloudWatch in AWS.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_group_name_read_only" href="#iam_group_name_read_only" className="snap-top">
          <code>iam_group_name_read_only</code>
        </a> - The name to be used for the IAM Group that grants read-only access to all AWS resources.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_group_name_support" href="#iam_group_name_support" className="snap-top">
          <code>iam_group_name_support</code>
        </a> - The name of the IAM Group that allows access to AWS Support.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_group_name_use_existing_iam_roles" href="#iam_group_name_use_existing_iam_roles" className="snap-top">
          <code>iam_group_name_use_existing_iam_roles</code>
        </a> - The name to be used for the IAM Group that grants IAM Users the permissions to use existing IAM Roles when launching AWS Resources. This does NOT grant the permission to create new IAM Roles.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_group_names_ssh_grunt_sudo_users" href="#iam_group_names_ssh_grunt_sudo_users" className="snap-top">
          <code>iam_group_names_ssh_grunt_sudo_users</code>
        </a> - The list of names to be used for the IAM Group that enables its members to SSH as a sudo user into any server configured with the ssh-grunt Gruntwork module. Pass in multiple to configure multiple different IAM groups to control different groupings of access at the server level. Pass in empty list to disable creation of the IAM groups.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_group_names_ssh_grunt_users" href="#iam_group_names_ssh_grunt_users" className="snap-top">
          <code>iam_group_names_ssh_grunt_users</code>
        </a> - The name to be used for the IAM Group that enables its members to SSH as a non-sudo user into any server configured with the ssh-grunt Gruntwork module. Pass in multiple to configure multiple different IAM groups to control different groupings of access at the server level. Pass in empty list to disable creation of the IAM groups.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_groups_for_cross_account_access" href="#iam_groups_for_cross_account_access" className="snap-top">
          <code>iam_groups_for_cross_account_access</code>
        </a> - This variable is used to create groups that allow IAM users to assume roles in your other AWS accounts. It should be a list of objects, where each object has the fields 'group_name', which will be used as the name of the IAM group, and 'iam_role_arns', which is a list of ARNs of IAM Roles that you can assume when part of that group. For each entry in the list of objects, we will create an IAM group that allows users to assume the given IAM role(s) in the other AWS account. This allows you to define all your IAM users in one account (e.g. the users account) and to grant them access to certain IAM roles in other accounts (e.g. the stage, prod, audit accounts).
      </p>
    </li>
    <li>
      <p>
        <a name="iam_password_policy_allow_users_to_change_password" href="#iam_password_policy_allow_users_to_change_password" className="snap-top">
          <code>iam_password_policy_allow_users_to_change_password</code>
        </a> - Allow users to change their own password.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_password_policy_hard_expiry" href="#iam_password_policy_hard_expiry" className="snap-top">
          <code>iam_password_policy_hard_expiry</code>
        </a> - Password expiration requires administrator reset.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_password_policy_max_password_age" href="#iam_password_policy_max_password_age" className="snap-top">
          <code>iam_password_policy_max_password_age</code>
        </a> - Number of days before password expiration.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_password_policy_minimum_password_length" href="#iam_password_policy_minimum_password_length" className="snap-top">
          <code>iam_password_policy_minimum_password_length</code>
        </a> - Password minimum length.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_password_policy_password_reuse_prevention" href="#iam_password_policy_password_reuse_prevention" className="snap-top">
          <code>iam_password_policy_password_reuse_prevention</code>
        </a> - Number of passwords before allowing reuse.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_password_policy_require_lowercase_characters" href="#iam_password_policy_require_lowercase_characters" className="snap-top">
          <code>iam_password_policy_require_lowercase_characters</code>
        </a> - Require at least one lowercase character in password.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_password_policy_require_numbers" href="#iam_password_policy_require_numbers" className="snap-top">
          <code>iam_password_policy_require_numbers</code>
        </a> - Require at least one number in password.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_password_policy_require_symbols" href="#iam_password_policy_require_symbols" className="snap-top">
          <code>iam_password_policy_require_symbols</code>
        </a> - Require at least one symbol in password.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_password_policy_require_uppercase_characters" href="#iam_password_policy_require_uppercase_characters" className="snap-top">
          <code>iam_password_policy_require_uppercase_characters</code>
        </a> - Require at least one uppercase character in password.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_policy_iam_user_self_mgmt" href="#iam_policy_iam_user_self_mgmt" className="snap-top">
          <code>iam_policy_iam_user_self_mgmt</code>
        </a> - The name to be used for the IAM Policy that grants IAM Users the permissions to manage their own IAM User account.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_role_tags" href="#iam_role_tags" className="snap-top">
          <code>iam_role_tags</code>
        </a> - The tags to apply to all the IAM role resources.
      </p>
    </li>
    <li>
      <p>
        <a name="insecure_sg_rules_authorized_tcp_ports" href="#insecure_sg_rules_authorized_tcp_ports" className="snap-top">
          <code>insecure_sg_rules_authorized_tcp_ports</code>
        </a> - Comma-separated list of TCP ports authorized to be open to 0.0.0.0/0. Ranges are defined by a dash; for example, '443,1020-1025'.
      </p>
    </li>
    <li>
      <p>
        <a name="insecure_sg_rules_authorized_udp_ports" href="#insecure_sg_rules_authorized_udp_ports" className="snap-top">
          <code>insecure_sg_rules_authorized_udp_ports</code>
        </a> - Comma-separated list of UDP ports authorized to be open to 0.0.0.0/0. Ranges are defined by a dash; for example, '500,1020-1025'.
      </p>
    </li>
    <li>
      <p>
        <a name="kms_cmk_global_tags" href="#kms_cmk_global_tags" className="snap-top">
          <code>kms_cmk_global_tags</code>
        </a> - A map of tags to apply to all KMS Keys to be created. In this map variable, the key is the tag name and the value is the tag value.
      </p>
    </li>
    <li>
      <p>
        <a name="kms_cmk_opt_in_regions" href="#kms_cmk_opt_in_regions" className="snap-top">
          <code>kms_cmk_opt_in_regions</code>
        </a> - Creates resources in the specified regions. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions. The value provided for global_recorder_region must be in this list.
      </p>
    </li>
    <li>
      <p>
        <a name="kms_customer_master_keys" href="#kms_customer_master_keys" className="snap-top">
          <code>kms_customer_master_keys</code>
        </a> - You can use this variable to create account-level KMS Customer Master Keys (CMKs) for encrypting and decrypting data. This variable should be a map where the keys are the names of the CMK and the values are an object that defines the configuration for that CMK. See the comment below for the configuration options you can set for each key.
      </p>
    </li>
    <li>
      <p>
        <a name="kms_grant_regions" href="#kms_grant_regions" className="snap-top">
          <code>kms_grant_regions</code>
        </a> - The map of names of KMS grants to the region where the key resides in. There should be a one to one mapping between entries in this map and the entries of the kms_grants map. This is used to workaround a terraform limitation where the for_each value can not depend on resources.
      </p>
    </li>
    <li>
      <p>
        <a name="kms_grants" href="#kms_grants" className="snap-top">
          <code>kms_grants</code>
        </a> - Create the specified KMS grants to allow entities to use the KMS key without modifying the KMS policy or IAM. This is necessary to allow AWS services (e.g. ASG) to use CMKs encrypt and decrypt resources. The input is a map of grant name to grant properties. The name must be unique per account.
      </p>
    </li>
    <li>
      <p>
        <a name="max_session_duration_human_users" href="#max_session_duration_human_users" className="snap-top">
          <code>max_session_duration_human_users</code>
        </a> - The maximum allowable session duration, in seconds, for the credentials you get when assuming the IAM roles created by this module. This variable applies to all IAM roles created by this module that are intended for people to use, such as allow-read-only-access-from-other-accounts. For IAM roles that are intended for machine users, such as allow-auto-deploy-from-other-accounts, see var.max_session_duration_machine_users.
      </p>
    </li>
    <li>
      <p>
        <a name="max_session_duration_machine_users" href="#max_session_duration_machine_users" className="snap-top">
          <code>max_session_duration_machine_users</code>
        </a> - The maximum allowable session duration, in seconds, for the credentials you get when assuming the IAM roles created by this module. This variable  applies to all IAM roles created by this module that are intended for machine users, such as allow-auto-deploy-from-other-accounts. For IAM roles that are intended for human users, such as allow-read-only-access-from-other-accounts, see var.max_session_duration_human_users.
      </p>
    </li>
    <li>
      <p>
        <a name="name_prefix" href="#name_prefix" className="snap-top">
          <code>name_prefix</code>
        </a> - The name used to prefix AWS Config and Cloudtrail resources, including the S3 bucket names and SNS topics used for each.
      </p>
    </li>
    <li>
      <p>
        <a name="password_reset_required" href="#password_reset_required" className="snap-top">
          <code>password_reset_required</code>
        </a> - Force the user to reset their password on initial login. Only used for users with create_login_profile set to true.
      </p>
    </li>
    <li>
      <p>
        <a name="rds_storage_encrypted_kms_id" href="#rds_storage_encrypted_kms_id" className="snap-top">
          <code>rds_storage_encrypted_kms_id</code>
        </a> - KMS key ID or ARN used to encrypt the storage. Used for configuring the RDS storage encryption config rule.
      </p>
    </li>
    <li>
      <p>
        <a name="service_linked_roles" href="#service_linked_roles" className="snap-top">
          <code>service_linked_roles</code>
        </a> - Create service-linked roles for this set of services. You should pass in the URLs of the services, but without the protocol (e.g., http://) in front: e.g., use elasticbeanstalk.amazonaws.com for Elastic Beanstalk or es.amazonaws.com for Amazon Elasticsearch. Service-linked roles are predefined by the service, can typically only be assumed by that service, and include all the permissions that the service requires to call other AWS services on your behalf. You can typically only create one such role per AWS account, which is why this parameter exists in the account baseline. See https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_aws-services-that-work-with-iam.html for the list of services that support service-linked roles.
      </p>
    </li>
    <li>
      <p>
        <a name="should_create_iam_group_auto_deploy" href="#should_create_iam_group_auto_deploy" className="snap-top">
          <code>should_create_iam_group_auto_deploy</code>
        </a> - Should we create the IAM Group for auto-deploy? Allows automated deployment by granting the permissions specified in var.auto_deploy_permissions. (true or false)
      </p>
    </li>
    <li>
      <p>
        <a name="should_create_iam_group_billing" href="#should_create_iam_group_billing" className="snap-top">
          <code>should_create_iam_group_billing</code>
        </a> - Should we create the IAM Group for billing? Allows read-write access to billing features only. (true or false)
      </p>
    </li>
    <li>
      <p>
        <a name="should_create_iam_group_cross_account_access_all" href="#should_create_iam_group_cross_account_access_all" className="snap-top">
          <code>should_create_iam_group_cross_account_access_all</code>
        </a> - Should we create the IAM Group for access to all external AWS accounts? 
      </p>
    </li>
    <li>
      <p>
        <a name="should_create_iam_group_developers" href="#should_create_iam_group_developers" className="snap-top">
          <code>should_create_iam_group_developers</code>
        </a> - Should we create the IAM Group for developers? The permissions of that group are specified via var.iam_group_developers_permitted_services. (true or false)
      </p>
    </li>
    <li>
      <p>
        <a name="should_create_iam_group_full_access" href="#should_create_iam_group_full_access" className="snap-top">
          <code>should_create_iam_group_full_access</code>
        </a> - Should we create the IAM Group for full access? Allows full access to all AWS resources. (true or false)
      </p>
    </li>
    <li>
      <p>
        <a name="should_create_iam_group_houston_cli_users" href="#should_create_iam_group_houston_cli_users" className="snap-top">
          <code>should_create_iam_group_houston_cli_users</code>
        </a> - Should we create the IAM Group for houston CLI users? Allows users to use the houston CLI for managing and deploying services.
      </p>
    </li>
    <li>
      <p>
        <a name="should_create_iam_group_iam_admin" href="#should_create_iam_group_iam_admin" className="snap-top">
          <code>should_create_iam_group_iam_admin</code>
        </a> - Should we create the IAM Group for IAM administrator access? Allows users to manage all IAM entities, effectively granting administrator access. (true or false)
      </p>
    </li>
    <li>
      <p>
        <a name="should_create_iam_group_logs" href="#should_create_iam_group_logs" className="snap-top">
          <code>should_create_iam_group_logs</code>
        </a> - Should we create the IAM Group for logs? Allows read access to CloudTrail, AWS Config, and CloudWatch. If var.cloudtrail_kms_key_arn is set, will also give decrypt access to a KMS CMK. (true or false)
      </p>
    </li>
    <li>
      <p>
        <a name="should_create_iam_group_read_only" href="#should_create_iam_group_read_only" className="snap-top">
          <code>should_create_iam_group_read_only</code>
        </a> - Should we create the IAM Group for read-only? Allows read-only access to all AWS resources. (true or false)
      </p>
    </li>
    <li>
      <p>
        <a name="should_create_iam_group_support" href="#should_create_iam_group_support" className="snap-top">
          <code>should_create_iam_group_support</code>
        </a> - Should we create the IAM Group for support? Allows support access (AWSupportAccess). (true or false)
      </p>
    </li>
    <li>
      <p>
        <a name="should_create_iam_group_use_existing_iam_roles" href="#should_create_iam_group_use_existing_iam_roles" className="snap-top">
          <code>should_create_iam_group_use_existing_iam_roles</code>
        </a> - Should we create the IAM Group for use-existing-iam-roles? Allow launching AWS resources with existing IAM Roles, but no ability to create new IAM Roles. (true or false)
      </p>
    </li>
    <li>
      <p>
        <a name="should_create_iam_group_user_self_mgmt" href="#should_create_iam_group_user_self_mgmt" className="snap-top">
          <code>should_create_iam_group_user_self_mgmt</code>
        </a> - Should we create the IAM Group for user self-management? Allows users to manage their own IAM user accounts, but not other IAM users. (true or false)
      </p>
    </li>
    <li>
      <p>
        <a name="should_require_mfa" href="#should_require_mfa" className="snap-top">
          <code>should_require_mfa</code>
        </a> - Should we require that all IAM Users use Multi-Factor Authentication for both AWS API calls and the AWS Web Console? (true or false)
      </p>
    </li>
    <li>
      <p>
        <a name="users" href="#users" className="snap-top">
          <code>users</code>
        </a> - A map of users to create. The keys are the user names and the values are an object with the optional keys 'groups' (a list of IAM groups to add the user to), 'tags' (a map of tags to apply to the user), 'pgp_key' (either a base-64 encoded PGP public key, or a keybase username in the form keybase:username, used to encrypt the user's credentials; required if create_login_profile or create_access_keys is true), 'create_login_profile' (if set to true, create a password to login to the AWS Web Console), 'create_access_keys' (if set to true, create access keys for the user), 'path' (the path), and 'permissions_boundary' (the ARN of the policy that is used to set the permissions boundary for the user).
      </p>
    </li>
    </ul>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <ul>
      
    <li>
      <p>
        <a name="allow_auto_deploy_access_from_other_accounts_iam_role_arn" href="#allow_auto_deploy_access_from_other_accounts_iam_role_arn" className="snap-top">
          <code>allow_auto_deploy_access_from_other_accounts_iam_role_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_auto_deploy_access_from_other_accounts_iam_role_id" href="#allow_auto_deploy_access_from_other_accounts_iam_role_id" className="snap-top">
          <code>allow_auto_deploy_access_from_other_accounts_iam_role_id</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_billing_access_from_other_accounts_iam_role_arn" href="#allow_billing_access_from_other_accounts_iam_role_arn" className="snap-top">
          <code>allow_billing_access_from_other_accounts_iam_role_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_billing_access_from_other_accounts_iam_role_id" href="#allow_billing_access_from_other_accounts_iam_role_id" className="snap-top">
          <code>allow_billing_access_from_other_accounts_iam_role_id</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_billing_access_sign_in_url" href="#allow_billing_access_sign_in_url" className="snap-top">
          <code>allow_billing_access_sign_in_url</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_dev_access_from_other_accounts_iam_role_arn" href="#allow_dev_access_from_other_accounts_iam_role_arn" className="snap-top">
          <code>allow_dev_access_from_other_accounts_iam_role_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_dev_access_from_other_accounts_iam_role_id" href="#allow_dev_access_from_other_accounts_iam_role_id" className="snap-top">
          <code>allow_dev_access_from_other_accounts_iam_role_id</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_dev_access_sign_in_url" href="#allow_dev_access_sign_in_url" className="snap-top">
          <code>allow_dev_access_sign_in_url</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_full_access_from_other_accounts_iam_role_arn" href="#allow_full_access_from_other_accounts_iam_role_arn" className="snap-top">
          <code>allow_full_access_from_other_accounts_iam_role_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_full_access_from_other_accounts_iam_role_id" href="#allow_full_access_from_other_accounts_iam_role_id" className="snap-top">
          <code>allow_full_access_from_other_accounts_iam_role_id</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_full_access_sign_in_url" href="#allow_full_access_sign_in_url" className="snap-top">
          <code>allow_full_access_sign_in_url</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_houston_cli_access_from_other_accounts_iam_role_arn" href="#allow_houston_cli_access_from_other_accounts_iam_role_arn" className="snap-top">
          <code>allow_houston_cli_access_from_other_accounts_iam_role_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_houston_cli_access_from_other_accounts_iam_role_id" href="#allow_houston_cli_access_from_other_accounts_iam_role_id" className="snap-top">
          <code>allow_houston_cli_access_from_other_accounts_iam_role_id</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_iam_admin_access_from_other_accounts_iam_role_arn" href="#allow_iam_admin_access_from_other_accounts_iam_role_arn" className="snap-top">
          <code>allow_iam_admin_access_from_other_accounts_iam_role_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_iam_admin_access_from_other_accounts_iam_role_id" href="#allow_iam_admin_access_from_other_accounts_iam_role_id" className="snap-top">
          <code>allow_iam_admin_access_from_other_accounts_iam_role_id</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_iam_admin_access_sign_in_url" href="#allow_iam_admin_access_sign_in_url" className="snap-top">
          <code>allow_iam_admin_access_sign_in_url</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_logs_access_from_other_accounts_iam_role_arn" href="#allow_logs_access_from_other_accounts_iam_role_arn" className="snap-top">
          <code>allow_logs_access_from_other_accounts_iam_role_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_logs_access_from_other_accounts_iam_role_id" href="#allow_logs_access_from_other_accounts_iam_role_id" className="snap-top">
          <code>allow_logs_access_from_other_accounts_iam_role_id</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_logs_access_sign_in_url" href="#allow_logs_access_sign_in_url" className="snap-top">
          <code>allow_logs_access_sign_in_url</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_read_only_access_from_other_accounts_iam_role_arn" href="#allow_read_only_access_from_other_accounts_iam_role_arn" className="snap-top">
          <code>allow_read_only_access_from_other_accounts_iam_role_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_read_only_access_from_other_accounts_iam_role_id" href="#allow_read_only_access_from_other_accounts_iam_role_id" className="snap-top">
          <code>allow_read_only_access_from_other_accounts_iam_role_id</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_read_only_access_sign_in_url" href="#allow_read_only_access_sign_in_url" className="snap-top">
          <code>allow_read_only_access_sign_in_url</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_ssh_grunt_access_from_other_accounts_iam_role_arn" href="#allow_ssh_grunt_access_from_other_accounts_iam_role_arn" className="snap-top">
          <code>allow_ssh_grunt_access_from_other_accounts_iam_role_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_ssh_grunt_access_from_other_accounts_iam_role_id" href="#allow_ssh_grunt_access_from_other_accounts_iam_role_id" className="snap-top">
          <code>allow_ssh_grunt_access_from_other_accounts_iam_role_id</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_ssh_grunt_access_sign_in_url" href="#allow_ssh_grunt_access_sign_in_url" className="snap-top">
          <code>allow_ssh_grunt_access_sign_in_url</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_ssh_grunt_houston_access_from_other_accounts_iam_role_arn" href="#allow_ssh_grunt_houston_access_from_other_accounts_iam_role_arn" className="snap-top">
          <code>allow_ssh_grunt_houston_access_from_other_accounts_iam_role_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_ssh_grunt_houston_access_from_other_accounts_iam_role_id" href="#allow_ssh_grunt_houston_access_from_other_accounts_iam_role_id" className="snap-top">
          <code>allow_ssh_grunt_houston_access_from_other_accounts_iam_role_id</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_ssh_grunt_houston_access_sign_in_url" href="#allow_ssh_grunt_houston_access_sign_in_url" className="snap-top">
          <code>allow_ssh_grunt_houston_access_sign_in_url</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_support_access_from_other_accounts_iam_role_arn" href="#allow_support_access_from_other_accounts_iam_role_arn" className="snap-top">
          <code>allow_support_access_from_other_accounts_iam_role_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_support_access_from_other_accounts_iam_role_id" href="#allow_support_access_from_other_accounts_iam_role_id" className="snap-top">
          <code>allow_support_access_from_other_accounts_iam_role_id</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="allow_support_access_sign_in_url" href="#allow_support_access_sign_in_url" className="snap-top">
          <code>allow_support_access_sign_in_url</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="aws_ebs_encryption_by_default_enabled" href="#aws_ebs_encryption_by_default_enabled" className="snap-top">
          <code>aws_ebs_encryption_by_default_enabled</code>
        </a> - A map from region to a boolean indicating whether or not EBS encryption is enabled by default for each region.
      </p>
    </li>
    <li>
      <p>
        <a name="aws_ebs_encryption_default_kms_key" href="#aws_ebs_encryption_default_kms_key" className="snap-top">
          <code>aws_ebs_encryption_default_kms_key</code>
        </a> - A map from region to the ARN of the KMS key used for default EBS encryption for each region.
      </p>
    </li>
    <li>
      <p>
        <a name="billing_iam_group_arn" href="#billing_iam_group_arn" className="snap-top">
          <code>billing_iam_group_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="billing_iam_group_name" href="#billing_iam_group_name" className="snap-top">
          <code>billing_iam_group_name</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_cloudwatch_group_arn" href="#cloudtrail_cloudwatch_group_arn" className="snap-top">
          <code>cloudtrail_cloudwatch_group_arn</code>
        </a> - The ARN of the cloudwatch log group.
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_cloudwatch_group_name" href="#cloudtrail_cloudwatch_group_name" className="snap-top">
          <code>cloudtrail_cloudwatch_group_name</code>
        </a> - The name of the cloudwatch log group.
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_iam_role_arn" href="#cloudtrail_iam_role_arn" className="snap-top">
          <code>cloudtrail_iam_role_arn</code>
        </a> - The ARN of the IAM role used by the cloudwatch log group.
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_iam_role_name" href="#cloudtrail_iam_role_name" className="snap-top">
          <code>cloudtrail_iam_role_name</code>
        </a> - The name of the IAM role used by the cloudwatch log group.
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_kms_key_alias_name" href="#cloudtrail_kms_key_alias_name" className="snap-top">
          <code>cloudtrail_kms_key_alias_name</code>
        </a> - The alias of the KMS key used by the S3 bucket to encrypt cloudtrail logs.
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_kms_key_arn" href="#cloudtrail_kms_key_arn" className="snap-top">
          <code>cloudtrail_kms_key_arn</code>
        </a> - The ARN of the KMS key used by the S3 bucket to encrypt cloudtrail logs.
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_s3_access_logging_bucket_name" href="#cloudtrail_s3_access_logging_bucket_name" className="snap-top">
          <code>cloudtrail_s3_access_logging_bucket_name</code>
        </a> - The name of the S3 bucket where server access logs are delivered.
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_s3_bucket_name" href="#cloudtrail_s3_bucket_name" className="snap-top">
          <code>cloudtrail_s3_bucket_name</code>
        </a> - The name of the S3 bucket where cloudtrail logs are delivered.
      </p>
    </li>
    <li>
      <p>
        <a name="cloudtrail_trail_arn" href="#cloudtrail_trail_arn" className="snap-top">
          <code>cloudtrail_trail_arn</code>
        </a> - The ARN of the cloudtrail trail.
      </p>
    </li>
    <li>
      <p>
        <a name="config_iam_role_arns" href="#config_iam_role_arns" className="snap-top">
          <code>config_iam_role_arns</code>
        </a> - The ARNs of the IAM role used by the config recorder.
      </p>
    </li>
    <li>
      <p>
        <a name="config_recorder_names" href="#config_recorder_names" className="snap-top">
          <code>config_recorder_names</code>
        </a> - The names of the configuration recorder.
      </p>
    </li>
    <li>
      <p>
        <a name="config_s3_bucket_names" href="#config_s3_bucket_names" className="snap-top">
          <code>config_s3_bucket_names</code>
        </a> - The names of the S3 bucket used by AWS Config to store configuration items.
      </p>
    </li>
    <li>
      <p>
        <a name="config_sns_topic_arns" href="#config_sns_topic_arns" className="snap-top">
          <code>config_sns_topic_arns</code>
        </a> - The ARNs of the SNS Topic used by the config notifications.
      </p>
    </li>
    <li>
      <p>
        <a name="cross_account_access_all_group_arn" href="#cross_account_access_all_group_arn" className="snap-top">
          <code>cross_account_access_all_group_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="cross_account_access_all_group_name" href="#cross_account_access_all_group_name" className="snap-top">
          <code>cross_account_access_all_group_name</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="cross_account_access_group_arns" href="#cross_account_access_group_arns" className="snap-top">
          <code>cross_account_access_group_arns</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="cross_account_access_group_names" href="#cross_account_access_group_names" className="snap-top">
          <code>cross_account_access_group_names</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="developers_iam_group_arn" href="#developers_iam_group_arn" className="snap-top">
          <code>developers_iam_group_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="developers_iam_group_name" href="#developers_iam_group_name" className="snap-top">
          <code>developers_iam_group_name</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="full_access_iam_group_arn" href="#full_access_iam_group_arn" className="snap-top">
          <code>full_access_iam_group_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="full_access_iam_group_name" href="#full_access_iam_group_name" className="snap-top">
          <code>full_access_iam_group_name</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="guardduty_cloudwatch_event_rule_arns" href="#guardduty_cloudwatch_event_rule_arns" className="snap-top">
          <code>guardduty_cloudwatch_event_rule_arns</code>
        </a> - The ARNs of the cloudwatch event rules used to publish findings to sns if var.publish_findings_to_sns is set to true.
      </p>
    </li>
    <li>
      <p>
        <a name="guardduty_cloudwatch_event_target_arns" href="#guardduty_cloudwatch_event_target_arns" className="snap-top">
          <code>guardduty_cloudwatch_event_target_arns</code>
        </a> - The ARNs of the cloudwatch event targets used to publish findings to sns if var.publish_findings_to_sns is set to true.
      </p>
    </li>
    <li>
      <p>
        <a name="guardduty_detector_ids" href="#guardduty_detector_ids" className="snap-top">
          <code>guardduty_detector_ids</code>
        </a> - The IDs of the GuardDuty detectors.
      </p>
    </li>
    <li>
      <p>
        <a name="guardduty_findings_sns_topic_arns" href="#guardduty_findings_sns_topic_arns" className="snap-top">
          <code>guardduty_findings_sns_topic_arns</code>
        </a> - The ARNs of the SNS topics where findings are published if var.publish_findings_to_sns is set to true.
      </p>
    </li>
    <li>
      <p>
        <a name="guardduty_findings_sns_topic_names" href="#guardduty_findings_sns_topic_names" className="snap-top">
          <code>guardduty_findings_sns_topic_names</code>
        </a> - The names of the SNS topic where findings are published if var.publish_findings_to_sns is set to true.
      </p>
    </li>
    <li>
      <p>
        <a name="houston_cli_users_iam_group_arn" href="#houston_cli_users_iam_group_arn" className="snap-top">
          <code>houston_cli_users_iam_group_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="houston_cli_users_iam_group_name" href="#houston_cli_users_iam_group_name" className="snap-top">
          <code>houston_cli_users_iam_group_name</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="iam_admin_iam_group_arn" href="#iam_admin_iam_group_arn" className="snap-top">
          <code>iam_admin_iam_group_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="iam_admin_iam_group_name" href="#iam_admin_iam_group_name" className="snap-top">
          <code>iam_admin_iam_group_name</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="iam_admin_iam_policy_arn" href="#iam_admin_iam_policy_arn" className="snap-top">
          <code>iam_admin_iam_policy_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="iam_self_mgmt_iam_group_arn" href="#iam_self_mgmt_iam_group_arn" className="snap-top">
          <code>iam_self_mgmt_iam_group_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="iam_self_mgmt_iam_group_name" href="#iam_self_mgmt_iam_group_name" className="snap-top">
          <code>iam_self_mgmt_iam_group_name</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="iam_self_mgmt_iam_policy_arn" href="#iam_self_mgmt_iam_policy_arn" className="snap-top">
          <code>iam_self_mgmt_iam_policy_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="invalid_cmk_inputs" href="#invalid_cmk_inputs" className="snap-top">
          <code>invalid_cmk_inputs</code>
        </a> - Map of CMKs from the input var.customer_master_keys that had an invalid region, and thus were not created. The structure of the map is the same as the input. This will only include KMS key inputs that were not created because the region attribute was invalid (either not a valid region identifier, the region is not enabled on the account, or the region is not included in the var.opt_in_regions input).
      </p>
    </li>
    <li>
      <p>
        <a name="kms_key_aliases" href="#kms_key_aliases" className="snap-top">
          <code>kms_key_aliases</code>
        </a> - A map from region to aliases of the KMS CMKs that were created. The value will also be a map mapping the keys from the var.customer_master_keys input variable to the corresponding alias.
      </p>
    </li>
    <li>
      <p>
        <a name="kms_key_arns" href="#kms_key_arns" className="snap-top">
          <code>kms_key_arns</code>
        </a> - A map from region to ARNs of the KMS CMKs that were created. The value will also be a map mapping the keys from the var.kms_customer_master_keys input variable to the corresponding ARN.
      </p>
    </li>
    <li>
      <p>
        <a name="kms_key_ids" href="#kms_key_ids" className="snap-top">
          <code>kms_key_ids</code>
        </a> - A map from region to IDs of the KMS CMKs that were created. The value will also be a map mapping the keys from the var.kms_customer_master_keys input variable to the corresponding ID.
      </p>
    </li>
    <li>
      <p>
        <a name="logs_iam_group_arn" href="#logs_iam_group_arn" className="snap-top">
          <code>logs_iam_group_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="logs_iam_group_name" href="#logs_iam_group_name" className="snap-top">
          <code>logs_iam_group_name</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="read_only_iam_group_arn" href="#read_only_iam_group_arn" className="snap-top">
          <code>read_only_iam_group_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="read_only_iam_group_name" href="#read_only_iam_group_name" className="snap-top">
          <code>read_only_iam_group_name</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="require_mfa_policy" href="#require_mfa_policy" className="snap-top">
          <code>require_mfa_policy</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="service_linked_role_arns" href="#service_linked_role_arns" className="snap-top">
          <code>service_linked_role_arns</code>
        </a> - A map of ARNs of the service linked roles created from var.service_linked_roles.
      </p>
    </li>
    <li>
      <p>
        <a name="ssh_grunt_sudo_users_group_arns" href="#ssh_grunt_sudo_users_group_arns" className="snap-top">
          <code>ssh_grunt_sudo_users_group_arns</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="ssh_grunt_sudo_users_group_names" href="#ssh_grunt_sudo_users_group_names" className="snap-top">
          <code>ssh_grunt_sudo_users_group_names</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="ssh_grunt_users_group_arns" href="#ssh_grunt_users_group_arns" className="snap-top">
          <code>ssh_grunt_users_group_arns</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="ssh_grunt_users_group_names" href="#ssh_grunt_users_group_names" className="snap-top">
          <code>ssh_grunt_users_group_names</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="support_iam_group_arn" href="#support_iam_group_arn" className="snap-top">
          <code>support_iam_group_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="support_iam_group_name" href="#support_iam_group_name" className="snap-top">
          <code>support_iam_group_name</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="use_existing_iam_roles_iam_group_arn" href="#use_existing_iam_roles_iam_group_arn" className="snap-top">
          <code>use_existing_iam_roles_iam_group_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="use_existing_iam_roles_iam_group_name" href="#use_existing_iam_roles_iam_group_name" className="snap-top">
          <code>use_existing_iam_roles_iam_group_name</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="user_access_keys" href="#user_access_keys" className="snap-top">
          <code>user_access_keys</code>
        </a> - A map of usernames to that user's access keys (a map with keys access_key_id and secret_access_key), with the secret_access_key encrypted with that user's PGP key (only shows up for users with create_access_keys = true). You can decrypt the secret_access_key on the CLI: echo &lt;secret_access_key> | base64 --decode | keybase pgp decrypt
      </p>
    </li>
    <li>
      <p>
        <a name="user_arns" href="#user_arns" className="snap-top">
          <code>user_arns</code>
        </a> - A map of usernames to the ARN for that IAM user.
      </p>
    </li>
    <li>
      <p>
        <a name="user_passwords" href="#user_passwords" className="snap-top">
          <code>user_passwords</code>
        </a> - A map of usernames to that user's AWS Web Console password, encrypted with that user's PGP key (only shows up for users with create_login_profile = true). You can decrypt the password on the CLI: echo &lt;password> | base64 --decode | keybase pgp decrypt
      </p>
    </li>
    </ul>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"cc5231e73ec21f0a0e4f6e76fdcb7f57"}
##DOCS-SOURCER-END -->
