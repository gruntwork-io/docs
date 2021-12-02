import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# AWS Security Account baseline wrapper

A security baseline for AWS Landing Zone for configuring the security account (the one where all your IAM users and IAM groups are defined), including setting up AWS Config, AWS CloudTrail, Amazon Guard Duty, IAM users, IAM groups, IAM password policy, and more.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/landingzone/account-baseline-security" class="link-button">View on GitHub</a>

### Reference 
              
<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <table>
        <thead>
            <tr>
                <td>Variable name</td>
                <td>Description</td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td>additional_config_rules</td>
        <td>Map of additional managed rules to add. The key is the name of the rule (e.g. ´acm-certificate-expiration-check´) and the value is an object specifying the rule details</td>
    </tr><tr>
        <td>allow_auto_deploy_from_other_account_arns</td>
        <td>A list of IAM ARNs from other AWS accounts that will be allowed to assume the auto deploy IAM role that has the permissions in var.auto_deploy_permissions.</td>
    </tr><tr>
        <td>allow_billing_access_from_other_account_arns</td>
        <td>A list of IAM ARNs from other AWS accounts that will be allowed full (read and write) access to the billing info for this account.</td>
    </tr><tr>
        <td>allow_cloudtrail_access_with_iam</td>
        <td>If true, an IAM Policy that grants access to CloudTrail will be honored. If false, only the ARNs listed in var.kms_key_user_iam_arns will have access to CloudTrail and any IAM Policy grants will be ignored. (true or false)</td>
    </tr><tr>
        <td>allow_dev_access_from_other_account_arns</td>
        <td>A list of IAM ARNs from other AWS accounts that will be allowed full (read and write) access to the services in this account specified in var.dev_permitted_services.</td>
    </tr><tr>
        <td>allow_full_access_from_other_account_arns</td>
        <td>A list of IAM ARNs from other AWS accounts that will be allowed full (read and write) access to this account.</td>
    </tr><tr>
        <td>allow_logs_access_from_other_account_arns</td>
        <td>A list of IAM ARNs from other AWS accounts that will be allowed access to the logs in CloudTrail, AWS Config, and CloudWatch for this account. Will also be given permissions to decrypt with the KMS CMK that is used to encrypt CloudTrail logs.</td>
    </tr><tr>
        <td>allow_read_only_access_from_other_account_arns</td>
        <td>A list of IAM ARNs from other AWS accounts that will be allowed read-only access to this account.</td>
    </tr><tr>
        <td>allow_ssh_grunt_access_from_other_account_arns</td>
        <td>A list of IAM ARNs from other AWS accounts that will be allowed read access to IAM groups and publish SSH keys. This is used for ssh-grunt.</td>
    </tr><tr>
        <td>allow_support_access_from_other_account_arns</td>
        <td>A list of IAM ARNs from other AWS accounts that will be allowed support access (AWSSupportAccess) to this account.</td>
    </tr><tr>
        <td>auto_deploy_permissions</td>
        <td>A list of IAM permissions (e.g. ec2:*) that will be added to an IAM Group for doing automated deployments. NOTE: If var.should_create_iam_group_auto_deploy is true, the list must have at least one element (e.g. '*').</td>
    </tr><tr>
        <td>aws_account_id</td>
        <td>The AWS Account ID the template should be operated on. This avoids misconfiguration errors caused by environment variables.</td>
    </tr><tr>
        <td>aws_region</td>
        <td>The AWS Region to use as the global config recorder and seed region for GuardDuty.</td>
    </tr><tr>
        <td>cloudtrail_allow_kms_describe_key_to_external_aws_accounts</td>
        <td>Whether or not to allow kms:DescribeKey to external AWS accounts with write access to the CloudTrail bucket. This is useful during deployment so that you don't have to pass around the KMS key ARN.</td>
    </tr><tr>
        <td>cloudtrail_cloudwatch_logs_group_name</td>
        <td>Specify the name of the CloudWatch Logs group to publish the CloudTrail logs to. This log group exists in the current account. Set this value to `null` to avoid publishing the trail logs to the logs group. The recommended configuration for CloudTrail is (a) for each child account to aggregate its logs in an S3 bucket in a single central account, such as a logs account and (b) to also store 14 days work of logs in CloudWatch in the child account itself for local debugging.</td>
    </tr><tr>
        <td>cloudtrail_data_logging_enabled</td>
        <td>If true, logging of data events will be enabled.</td>
    </tr><tr>
        <td>cloudtrail_data_logging_include_management_events</td>
        <td>Specify if you want your event selector to include management events for your trail.</td>
    </tr><tr>
        <td>cloudtrail_data_logging_read_write_type</td>
        <td>Specify if you want your trail to log read-only events, write-only events, or all. Possible values are: ReadOnly, WriteOnly, All.</td>
    </tr><tr>
        <td>cloudtrail_data_logging_resources</td>
        <td>Data resources for which to log data events. This should be a map, where each key is a data resource type, and each value is a list of data resource values. Possible values for data resource types are: AWS::S3::Object, AWS::Lambda::Function and AWS::DynamoDB::Table. See the 'data_resource' block within the 'event_selector' block of the 'aws_cloudtrail' resource for context: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudtrail#data_resource.</td>
    </tr><tr>
        <td>cloudtrail_external_aws_account_ids_with_write_access</td>
        <td>A list of external AWS accounts that should be given write access for CloudTrail logs to this S3 bucket. This is useful when aggregating CloudTrail logs for multiple AWS accounts in one common S3 bucket.</td>
    </tr><tr>
        <td>cloudtrail_force_destroy</td>
        <td>If set to true, when you run 'terraform destroy', delete all objects from the bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!</td>
    </tr><tr>
        <td>cloudtrail_kms_key_administrator_iam_arns</td>
        <td>All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key) that governs access to write API calls older than 7 days and all read API calls. The IAM Users specified in this list will have rights to change who can access this extended log data.</td>
    </tr><tr>
        <td>cloudtrail_kms_key_arn</td>
        <td>All CloudTrail Logs will be encrypted with a KMS CMK (Customer Master Key) that governs access to write API calls older than 7 days and all read API calls. If that CMK already exists, set this to the ARN of that CMK. Otherwise, set this to null, and a new CMK will be created. We recommend setting this to the ARN of a CMK that already exists in a separate logs account.</td>
    </tr><tr>
        <td>cloudtrail_kms_key_arn_is_alias</td>
        <td>If the kms_key_arn provided is an alias or alias ARN, then this must be set to true so that the module will exchange the alias for a CMK ARN. Setting this to true and using aliases requires var.cloudtrail_allow_kms_describe_key_to_external_aws_accounts to also be true for multi-account scenarios.</td>
    </tr><tr>
        <td>cloudtrail_kms_key_user_iam_arns</td>
        <td>All CloudTrail Logs will be encrypted with a KMS Key (a Customer Master Key) that governs access to write API calls older than 7 days and all read API calls. The IAM Users specified in this list will have read-only access to this extended log data.</td>
    </tr><tr>
        <td>cloudtrail_num_days_after_which_archive_log_data</td>
        <td>After this number of days, log files should be transitioned from S3 to Glacier. Enter 0 to never archive log data.</td>
    </tr><tr>
        <td>cloudtrail_num_days_after_which_delete_log_data</td>
        <td>After this number of days, log files should be deleted from S3. Enter 0 to never delete log data.</td>
    </tr><tr>
        <td>cloudtrail_num_days_to_retain_cloudwatch_logs</td>
        <td>After this number of days, logs stored in CloudWatch will be deleted. Possible values are: 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1827, 3653, and 0 (default). When set to 0, logs will be retained indefinitely.</td>
    </tr><tr>
        <td>cloudtrail_s3_bucket_already_exists</td>
        <td>Set to false to create an S3 bucket of name var.cloudtrail_s3_bucket_name in this account for storing CloudTrail logs. Set to true to assume the bucket specified in var.cloudtrail_s3_bucket_name already exists in another AWS account. We recommend setting this to true and setting var.cloudtrail_s3_bucket_name to the name of a bucket that already exists in a separate logs account.</td>
    </tr><tr>
        <td>cloudtrail_s3_bucket_name</td>
        <td>The name of the S3 Bucket where CloudTrail logs will be stored. If value is `null`, defaults to `var.name_prefix`-cloudtrail</td>
    </tr><tr>
        <td>cloudtrail_s3_mfa_delete</td>
        <td>Enable MFA delete for either 'Change the versioning state of your bucket' or 'Permanently delete an object version'. This setting only applies to the bucket used to storage Cloudtrail data. This cannot be used to toggle this setting but is available to allow managed buckets to reflect the state in AWS. For instructions on how to enable MFA Delete, check out the README from the terraform-aws-security/private-s3-bucket module.</td>
    </tr><tr>
        <td>cloudtrail_tags</td>
        <td>Tags to apply to the CloudTrail resources.</td>
    </tr><tr>
        <td>config_aggregate_config_data_in_external_account</td>
        <td>Set to true to send the AWS Config data to another account (e.g., a logs account) for aggregation purposes. You must set the ID of that other account via the config_central_account_id variable. This redundant variable has to exist because Terraform does not allow computed data in count and for_each parameters and var.config_central_account_id may be computed if its the ID of a newly-created AWS account.</td>
    </tr><tr>
        <td>config_central_account_id</td>
        <td>If the S3 bucket and SNS topics used for AWS Config live in a different AWS account, set this variable to the ID of that account. If the S3 bucket and SNS topics live in this account, set this variable to null. We recommend setting this to the ID of a separate logs account. Only used if var.config_aggregate_config_data_in_external_account is true.</td>
    </tr><tr>
        <td>config_create_account_rules</td>
        <td>Set to true to create AWS Config rules directly in this account. Set false to not create any Config rules in this account (i.e., if you created the rules at the organization level already). We recommend setting this to true to use account-level rules because org-level rules create a chicken-and-egg problem with creating new accounts.</td>
    </tr><tr>
        <td>config_force_destroy</td>
        <td>If set to true, when you run 'terraform destroy', delete all objects from the bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!</td>
    </tr><tr>
        <td>config_linked_accounts</td>
        <td>Provide a list of AWS account IDs that will send Config data to this account. This is useful if your aggregating config data in this account for other accounts.</td>
    </tr><tr>
        <td>config_num_days_after_which_archive_log_data</td>
        <td>After this number of days, log files should be transitioned from S3 to Glacier. Enter 0 to never archive log data.</td>
    </tr><tr>
        <td>config_num_days_after_which_delete_log_data</td>
        <td>After this number of days, log files should be deleted from S3. Enter 0 to never delete log data.</td>
    </tr><tr>
        <td>config_opt_in_regions</td>
        <td>Creates resources in the specified regions. The best practice is to enable AWS Config in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions.</td>
    </tr><tr>
        <td>config_s3_bucket_name</td>
        <td>The name of the S3 Bucket where CloudTrail logs will be stored. This could be a bucket in this AWS account or the name of a bucket in another AWS account where logs should be sent. We recommend setting this to the name of a bucket in a separate logs account.</td>
    </tr><tr>
        <td>config_s3_mfa_delete</td>
        <td>Enable MFA delete for either 'Change the versioning state of your bucket' or 'Permanently delete an object version'. This setting only applies to the bucket used to storage AWS Config data. This cannot be used to toggle this setting but is available to allow managed buckets to reflect the state in AWS. For instructions on how to enable MFA Delete, check out the README from the terraform-aws-security/private-s3-bucket module.</td>
    </tr><tr>
        <td>config_should_create_s3_bucket</td>
        <td>Set to true to create an S3 bucket of name var.config_s3_bucket_name in this account for storing AWS Config data. Set to false to assume the bucket specified in var.config_s3_bucket_name already exists in another AWS account. We recommend setting this to false and setting var.config_s3_bucket_name to the name off an S3 bucket that already exists in a separate logs account.</td>
    </tr><tr>
        <td>config_should_create_sns_topic</td>
        <td>Set to true to create an SNS topic in this account for sending AWS Config notifications (e.g., if this is the logs account). Set to false to assume the topic specified in var.config_sns_topic_name already exists in another AWS account (e.g., if this is the stage or prod account and var.config_sns_topic_name is the name of an SNS topic in the logs account).</td>
    </tr><tr>
        <td>config_sns_topic_name</td>
        <td>The name of the SNS Topic in where AWS Config notifications will be sent. Can be in the same account or in another account.</td>
    </tr><tr>
        <td>config_tags</td>
        <td>A map of tags to apply to the S3 Bucket. The key is the tag name and the value is the tag value.</td>
    </tr><tr>
        <td>configrules_maximum_execution_frequency</td>
        <td>The maximum frequency with which AWS Config runs evaluations for the ´PERIODIC´ rules. See https://www.terraform.io/docs/providers/aws/r/config_organization_managed_rule.html#maximum_execution_frequency</td>
    </tr><tr>
        <td>cross_account_access_all_group_name</td>
        <td>The name of the IAM group that will grant access to all external AWS accounts in var.iam_groups_for_cross_account_access.</td>
    </tr><tr>
        <td>dev_permitted_services</td>
        <td>A list of AWS services for which the developers from the accounts in var.allow_dev_access_from_other_account_arns will receive full permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to grant developers access only to EC2 and Amazon Machine Learning, use the value ["ec2","machinelearning"]. Do NOT add iam to the list of services, or that will grant Developers de facto admin access.</td>
    </tr><tr>
        <td>ebs_enable_encryption</td>
        <td>If set to true (default), all new EBS volumes will have encryption enabled by default</td>
    </tr><tr>
        <td>ebs_kms_key_name</td>
        <td>The name of the KMS CMK to use by default for encrypting EBS volumes, if var.ebs_enable_encryption and var.ebs_use_existing_kms_keys are enabled. The name must match a name given the var.kms_customer_master_keys variable.</td>
    </tr><tr>
        <td>ebs_opt_in_regions</td>
        <td>Creates resources in the specified regions. The best practice is to enable EBS Encryption in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions. The value provided for global_recorder_region must be in this list.</td>
    </tr><tr>
        <td>ebs_use_existing_kms_keys</td>
        <td>If set to true, the KMS Customer Managed Keys (CMK) with the name in var.ebs_kms_key_name will be set as the default for EBS encryption. When false (default), the AWS-managed aws/ebs key will be used.</td>
    </tr><tr>
        <td>enable_cloudtrail</td>
        <td>Set to true (default) to enable CloudTrail in the security account. Set to false to disable CloudTrail (note: all other CloudTrail variables will be ignored). Note that if you have enabled organization trail in the root (parent) account, you should set this to false; the organization trail will enable CloudTrail on child accounts by default.</td>
    </tr><tr>
        <td>enable_config</td>
        <td>Set to true to enable AWS Config in the security account. Set to false to disable AWS Config (note: all other AWS config variables will be ignored).</td>
    </tr><tr>
        <td>enable_encrypted_volumes</td>
        <td>Checks whether the EBS volumes that are in an attached state are encrypted.</td>
    </tr><tr>
        <td>enable_iam_access_analyzer</td>
        <td>A feature flag to enable or disable this module.</td>
    </tr><tr>
        <td>enable_iam_cross_account_roles</td>
        <td>A feature flag to enable or disable the Cross Account Iam Roles module.</td>
    </tr><tr>
        <td>enable_iam_groups</td>
        <td>A feature flag to enable or disable the IAM Groups module.</td>
    </tr><tr>
        <td>enable_iam_password_policy</td>
        <td>Checks whether the account password policy for IAM users meets the specified requirements.</td>
    </tr><tr>
        <td>enable_insecure_sg_rules</td>
        <td>Checks whether the security group with 0.0.0.0/0 of any Amazon Virtual Private Cloud (Amazon VPC) allows only specific inbound TCP or UDP traffic.</td>
    </tr><tr>
        <td>enable_rds_storage_encrypted</td>
        <td>Checks whether storage encryption is enabled for your RDS DB instances.</td>
    </tr><tr>
        <td>enable_root_account_mfa</td>
        <td>Checks whether users of your AWS account require a multi-factor authentication (MFA) device to sign in with root credentials.</td>
    </tr><tr>
        <td>enable_s3_bucket_public_read_prohibited</td>
        <td>Checks that your Amazon S3 buckets do not allow public read access.</td>
    </tr><tr>
        <td>enable_s3_bucket_public_write_prohibited</td>
        <td>Checks that your Amazon S3 buckets do not allow public write access.</td>
    </tr><tr>
        <td>encrypted_volumes_kms_id</td>
        <td>ID or ARN of the KMS key that is used to encrypt the volume. Used for configuring the encrypted volumes config rule.</td>
    </tr><tr>
        <td>force_destroy_users</td>
        <td>When destroying this user, destroy even if it has non-Terraform-managed IAM access keys, login profile, or MFA devices. Without force_destroy a user with non-Terraform-managed access keys and login profile will fail to be destroyed.</td>
    </tr><tr>
        <td>guardduty_cloudwatch_event_rule_name</td>
        <td>Name of the Cloudwatch event rules.</td>
    </tr><tr>
        <td>guardduty_finding_publishing_frequency</td>
        <td>Specifies the frequency of notifications sent for subsequent finding occurrences. If the detector is a GuardDuty member account, the value is determined by the GuardDuty master account and cannot be modified, otherwise defaults to SIX_HOURS. For standalone and GuardDuty master accounts, it must be configured in Terraform to enable drift detection. Valid values for standalone and master accounts: FIFTEEN_MINUTES, ONE_HOUR, SIX_HOURS.</td>
    </tr><tr>
        <td>guardduty_findings_sns_topic_name</td>
        <td>Specifies a name for the created SNS topics where findings are published. publish_findings_to_sns must be set to true.</td>
    </tr><tr>
        <td>guardduty_opt_in_regions</td>
        <td>Creates resources in the specified regions. The best practice is to enable GuardDuty in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions. The value provided for global_recorder_region must be in this list.</td>
    </tr><tr>
        <td>guardduty_publish_findings_to_sns</td>
        <td>Send GuardDuty findings to SNS topics specified by findings_sns_topic_name.</td>
    </tr><tr>
        <td>iam_access_analyzer_name</td>
        <td>The name of the IAM Access Analyzer module</td>
    </tr><tr>
        <td>iam_access_analyzer_opt_in_regions</td>
        <td>Creates resources in the specified regions. The best practice is to enable IAM Access Analyzer in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions. The value provided for global_recorder_region must be in this list.</td>
    </tr><tr>
        <td>iam_access_analyzer_type</td>
        <td>If set to ACCOUNT, the analyzer will only be scanning the current AWS account it's in. If set to ORGANIZATION - will scan the organization AWS account and the child accounts.</td>
    </tr><tr>
        <td>iam_group_developers_permitted_services</td>
        <td>A list of AWS services for which the developers IAM Group will receive full permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to grant developers access only to EC2 and Amazon Machine Learning, use the value ["ec2","machinelearning"]. Do NOT add iam to the list of services, or that will grant Developers de facto admin access. If you need to grant iam privileges, just grant the user Full Access.</td>
    </tr><tr>
        <td>iam_group_name_auto_deploy</td>
        <td>The name of the IAM Group that allows automated deployment by graning the permissions specified in var.auto_deploy_permissions.</td>
    </tr><tr>
        <td>iam_group_name_billing</td>
        <td>The name to be used for the IAM Group that grants read/write access to all billing features in AWS.</td>
    </tr><tr>
        <td>iam_group_name_developers</td>
        <td>The name to be used for the IAM Group that grants IAM Users a reasonable set of permissions for developers.</td>
    </tr><tr>
        <td>iam_group_name_full_access</td>
        <td>The name to be used for the IAM Group that grants full access to all AWS resources.</td>
    </tr><tr>
        <td>iam_group_name_houston_cli</td>
        <td>The name of the IAM Group that allows access to houston CLI.</td>
    </tr><tr>
        <td>iam_group_name_iam_admin</td>
        <td>The name to be used for the IAM Group that grants IAM administrative access. Effectively grants administrator access.</td>
    </tr><tr>
        <td>iam_group_name_iam_user_self_mgmt</td>
        <td>The name to be used for the IAM Group that grants IAM Users the permissions to manage their own IAM User account.</td>
    </tr><tr>
        <td>iam_group_name_logs</td>
        <td>The name to be used for the IAM Group that grants read access to CloudTrail, AWS Config, and CloudWatch in AWS.</td>
    </tr><tr>
        <td>iam_group_name_read_only</td>
        <td>The name to be used for the IAM Group that grants read-only access to all AWS resources.</td>
    </tr><tr>
        <td>iam_group_name_support</td>
        <td>The name of the IAM Group that allows access to AWS Support.</td>
    </tr><tr>
        <td>iam_group_name_use_existing_iam_roles</td>
        <td>The name to be used for the IAM Group that grants IAM Users the permissions to use existing IAM Roles when launching AWS Resources. This does NOT grant the permission to create new IAM Roles.</td>
    </tr><tr>
        <td>iam_group_names_ssh_grunt_sudo_users</td>
        <td>The list of names to be used for the IAM Group that enables its members to SSH as a sudo user into any server configured with the ssh-grunt Gruntwork module. Pass in multiple to configure multiple different IAM groups to control different groupings of access at the server level. Pass in empty list to disable creation of the IAM groups.</td>
    </tr><tr>
        <td>iam_group_names_ssh_grunt_users</td>
        <td>The name to be used for the IAM Group that enables its members to SSH as a non-sudo user into any server configured with the ssh-grunt Gruntwork module. Pass in multiple to configure multiple different IAM groups to control different groupings of access at the server level. Pass in empty list to disable creation of the IAM groups.</td>
    </tr><tr>
        <td>iam_groups_for_cross_account_access</td>
        <td>This variable is used to create groups that allow IAM users to assume roles in your other AWS accounts. It should be a list of objects, where each object has the fields 'group_name', which will be used as the name of the IAM group, and 'iam_role_arns', which is a list of ARNs of IAM Roles that you can assume when part of that group. For each entry in the list of objects, we will create an IAM group that allows users to assume the given IAM role(s) in the other AWS account. This allows you to define all your IAM users in one account (e.g. the users account) and to grant them access to certain IAM roles in other accounts (e.g. the stage, prod, audit accounts).</td>
    </tr><tr>
        <td>iam_password_policy_allow_users_to_change_password</td>
        <td>Allow users to change their own password.</td>
    </tr><tr>
        <td>iam_password_policy_hard_expiry</td>
        <td>Password expiration requires administrator reset.</td>
    </tr><tr>
        <td>iam_password_policy_max_password_age</td>
        <td>Number of days before password expiration.</td>
    </tr><tr>
        <td>iam_password_policy_minimum_password_length</td>
        <td>Password minimum length.</td>
    </tr><tr>
        <td>iam_password_policy_password_reuse_prevention</td>
        <td>Number of passwords before allowing reuse.</td>
    </tr><tr>
        <td>iam_password_policy_require_lowercase_characters</td>
        <td>Require at least one lowercase character in password.</td>
    </tr><tr>
        <td>iam_password_policy_require_numbers</td>
        <td>Require at least one number in password.</td>
    </tr><tr>
        <td>iam_password_policy_require_symbols</td>
        <td>Require at least one symbol in password.</td>
    </tr><tr>
        <td>iam_password_policy_require_uppercase_characters</td>
        <td>Require at least one uppercase character in password.</td>
    </tr><tr>
        <td>iam_policy_iam_user_self_mgmt</td>
        <td>The name to be used for the IAM Policy that grants IAM Users the permissions to manage their own IAM User account.</td>
    </tr><tr>
        <td>iam_role_tags</td>
        <td>The tags to apply to all the IAM role resources.</td>
    </tr><tr>
        <td>insecure_sg_rules_authorized_tcp_ports</td>
        <td>Comma-separated list of TCP ports authorized to be open to 0.0.0.0/0. Ranges are defined by a dash; for example, '443,1020-1025'.</td>
    </tr><tr>
        <td>insecure_sg_rules_authorized_udp_ports</td>
        <td>Comma-separated list of UDP ports authorized to be open to 0.0.0.0/0. Ranges are defined by a dash; for example, '500,1020-1025'.</td>
    </tr><tr>
        <td>kms_cmk_global_tags</td>
        <td>A map of tags to apply to all KMS Keys to be created. In this map variable, the key is the tag name and the value is the tag value.</td>
    </tr><tr>
        <td>kms_cmk_opt_in_regions</td>
        <td>Creates resources in the specified regions. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions. The value provided for global_recorder_region must be in this list.</td>
    </tr><tr>
        <td>kms_customer_master_keys</td>
        <td>You can use this variable to create account-level KMS Customer Master Keys (CMKs) for encrypting and decrypting data. This variable should be a map where the keys are the names of the CMK and the values are an object that defines the configuration for that CMK. See the comment below for the configuration options you can set for each key.</td>
    </tr><tr>
        <td>kms_grant_regions</td>
        <td>The map of names of KMS grants to the region where the key resides in. There should be a one to one mapping between entries in this map and the entries of the kms_grants map. This is used to workaround a terraform limitation where the for_each value can not depend on resources.</td>
    </tr><tr>
        <td>kms_grants</td>
        <td>Create the specified KMS grants to allow entities to use the KMS key without modifying the KMS policy or IAM. This is necessary to allow AWS services (e.g. ASG) to use CMKs encrypt and decrypt resources. The input is a map of grant name to grant properties. The name must be unique per account.</td>
    </tr><tr>
        <td>max_session_duration_human_users</td>
        <td>The maximum allowable session duration, in seconds, for the credentials you get when assuming the IAM roles created by this module. This variable applies to all IAM roles created by this module that are intended for people to use, such as allow-read-only-access-from-other-accounts. For IAM roles that are intended for machine users, such as allow-auto-deploy-from-other-accounts, see var.max_session_duration_machine_users.</td>
    </tr><tr>
        <td>max_session_duration_machine_users</td>
        <td>The maximum allowable session duration, in seconds, for the credentials you get when assuming the IAM roles created by this module. This variable  applies to all IAM roles created by this module that are intended for machine users, such as allow-auto-deploy-from-other-accounts. For IAM roles that are intended for human users, such as allow-read-only-access-from-other-accounts, see var.max_session_duration_human_users.</td>
    </tr><tr>
        <td>name_prefix</td>
        <td>The name used to prefix AWS Config and Cloudtrail resources, including the S3 bucket names and SNS topics used for each.</td>
    </tr><tr>
        <td>password_reset_required</td>
        <td>Force the user to reset their password on initial login. Only used for users with create_login_profile set to true.</td>
    </tr><tr>
        <td>rds_storage_encrypted_kms_id</td>
        <td>KMS key ID or ARN used to encrypt the storage. Used for configuring the RDS storage encryption config rule.</td>
    </tr><tr>
        <td>service_linked_roles</td>
        <td>Create service-linked roles for this set of services. You should pass in the URLs of the services, but without the protocol (e.g., http://) in front: e.g., use elasticbeanstalk.amazonaws.com for Elastic Beanstalk or es.amazonaws.com for Amazon Elasticsearch. Service-linked roles are predefined by the service, can typically only be assumed by that service, and include all the permissions that the service requires to call other AWS services on your behalf. You can typically only create one such role per AWS account, which is why this parameter exists in the account baseline. See https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_aws-services-that-work-with-iam.html for the list of services that support service-linked roles.</td>
    </tr><tr>
        <td>should_create_iam_group_auto_deploy</td>
        <td>Should we create the IAM Group for auto-deploy? Allows automated deployment by granting the permissions specified in var.auto_deploy_permissions. (true or false)</td>
    </tr><tr>
        <td>should_create_iam_group_billing</td>
        <td>Should we create the IAM Group for billing? Allows read-write access to billing features only. (true or false)</td>
    </tr><tr>
        <td>should_create_iam_group_cross_account_access_all</td>
        <td>Should we create the IAM Group for access to all external AWS accounts? </td>
    </tr><tr>
        <td>should_create_iam_group_developers</td>
        <td>Should we create the IAM Group for developers? The permissions of that group are specified via var.iam_group_developers_permitted_services. (true or false)</td>
    </tr><tr>
        <td>should_create_iam_group_full_access</td>
        <td>Should we create the IAM Group for full access? Allows full access to all AWS resources. (true or false)</td>
    </tr><tr>
        <td>should_create_iam_group_houston_cli_users</td>
        <td>Should we create the IAM Group for houston CLI users? Allows users to use the houston CLI for managing and deploying services.</td>
    </tr><tr>
        <td>should_create_iam_group_iam_admin</td>
        <td>Should we create the IAM Group for IAM administrator access? Allows users to manage all IAM entities, effectively granting administrator access. (true or false)</td>
    </tr><tr>
        <td>should_create_iam_group_logs</td>
        <td>Should we create the IAM Group for logs? Allows read access to CloudTrail, AWS Config, and CloudWatch. If var.cloudtrail_kms_key_arn is set, will also give decrypt access to a KMS CMK. (true or false)</td>
    </tr><tr>
        <td>should_create_iam_group_read_only</td>
        <td>Should we create the IAM Group for read-only? Allows read-only access to all AWS resources. (true or false)</td>
    </tr><tr>
        <td>should_create_iam_group_support</td>
        <td>Should we create the IAM Group for support? Allows support access (AWSupportAccess). (true or false)</td>
    </tr><tr>
        <td>should_create_iam_group_use_existing_iam_roles</td>
        <td>Should we create the IAM Group for use-existing-iam-roles? Allow launching AWS resources with existing IAM Roles, but no ability to create new IAM Roles. (true or false)</td>
    </tr><tr>
        <td>should_create_iam_group_user_self_mgmt</td>
        <td>Should we create the IAM Group for user self-management? Allows users to manage their own IAM user accounts, but not other IAM users. (true or false)</td>
    </tr><tr>
        <td>should_require_mfa</td>
        <td>Should we require that all IAM Users use Multi-Factor Authentication for both AWS API calls and the AWS Web Console? (true or false)</td>
    </tr><tr>
        <td>users</td>
        <td>A map of users to create. The keys are the user names and the values are an object with the optional keys 'groups' (a list of IAM groups to add the user to), 'tags' (a map of tags to apply to the user), 'pgp_key' (either a base-64 encoded PGP public key, or a keybase username in the form keybase:username, used to encrypt the user's credentials; required if create_login_profile or create_access_keys is true), 'create_login_profile' (if set to true, create a password to login to the AWS Web Console), 'create_access_keys' (if set to true, create access keys for the user), 'path' (the path), and 'permissions_boundary' (the ARN of the policy that is used to set the permissions boundary for the user).</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <table>
        <thead>
            <tr>
                <td>Variable name</td>
                <td>Description</td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td>allow_auto_deploy_access_from_other_accounts_iam_role_arn</td>
        <td></td>
    </tr><tr>
        <td>allow_auto_deploy_access_from_other_accounts_iam_role_id</td>
        <td></td>
    </tr><tr>
        <td>allow_billing_access_from_other_accounts_iam_role_arn</td>
        <td></td>
    </tr><tr>
        <td>allow_billing_access_from_other_accounts_iam_role_id</td>
        <td></td>
    </tr><tr>
        <td>allow_billing_access_sign_in_url</td>
        <td></td>
    </tr><tr>
        <td>allow_dev_access_from_other_accounts_iam_role_arn</td>
        <td></td>
    </tr><tr>
        <td>allow_dev_access_from_other_accounts_iam_role_id</td>
        <td></td>
    </tr><tr>
        <td>allow_dev_access_sign_in_url</td>
        <td></td>
    </tr><tr>
        <td>allow_full_access_from_other_accounts_iam_role_arn</td>
        <td></td>
    </tr><tr>
        <td>allow_full_access_from_other_accounts_iam_role_id</td>
        <td></td>
    </tr><tr>
        <td>allow_full_access_sign_in_url</td>
        <td></td>
    </tr><tr>
        <td>allow_houston_cli_access_from_other_accounts_iam_role_arn</td>
        <td></td>
    </tr><tr>
        <td>allow_houston_cli_access_from_other_accounts_iam_role_id</td>
        <td></td>
    </tr><tr>
        <td>allow_iam_admin_access_from_other_accounts_iam_role_arn</td>
        <td></td>
    </tr><tr>
        <td>allow_iam_admin_access_from_other_accounts_iam_role_id</td>
        <td></td>
    </tr><tr>
        <td>allow_iam_admin_access_sign_in_url</td>
        <td></td>
    </tr><tr>
        <td>allow_logs_access_from_other_accounts_iam_role_arn</td>
        <td></td>
    </tr><tr>
        <td>allow_logs_access_from_other_accounts_iam_role_id</td>
        <td></td>
    </tr><tr>
        <td>allow_logs_access_sign_in_url</td>
        <td></td>
    </tr><tr>
        <td>allow_read_only_access_from_other_accounts_iam_role_arn</td>
        <td></td>
    </tr><tr>
        <td>allow_read_only_access_from_other_accounts_iam_role_id</td>
        <td></td>
    </tr><tr>
        <td>allow_read_only_access_sign_in_url</td>
        <td></td>
    </tr><tr>
        <td>allow_ssh_grunt_access_from_other_accounts_iam_role_arn</td>
        <td></td>
    </tr><tr>
        <td>allow_ssh_grunt_access_from_other_accounts_iam_role_id</td>
        <td></td>
    </tr><tr>
        <td>allow_ssh_grunt_access_sign_in_url</td>
        <td></td>
    </tr><tr>
        <td>allow_ssh_grunt_houston_access_from_other_accounts_iam_role_arn</td>
        <td></td>
    </tr><tr>
        <td>allow_ssh_grunt_houston_access_from_other_accounts_iam_role_id</td>
        <td></td>
    </tr><tr>
        <td>allow_ssh_grunt_houston_access_sign_in_url</td>
        <td></td>
    </tr><tr>
        <td>allow_support_access_from_other_accounts_iam_role_arn</td>
        <td></td>
    </tr><tr>
        <td>allow_support_access_from_other_accounts_iam_role_id</td>
        <td></td>
    </tr><tr>
        <td>allow_support_access_sign_in_url</td>
        <td></td>
    </tr><tr>
        <td>aws_ebs_encryption_by_default_enabled</td>
        <td>A map from region to a boolean indicating whether or not EBS encryption is enabled by default for each region.</td>
    </tr><tr>
        <td>aws_ebs_encryption_default_kms_key</td>
        <td>A map from region to the ARN of the KMS key used for default EBS encryption for each region.</td>
    </tr><tr>
        <td>billing_iam_group_arn</td>
        <td></td>
    </tr><tr>
        <td>billing_iam_group_name</td>
        <td></td>
    </tr><tr>
        <td>cloudtrail_cloudwatch_group_arn</td>
        <td>The ARN of the cloudwatch log group.</td>
    </tr><tr>
        <td>cloudtrail_cloudwatch_group_name</td>
        <td>The name of the cloudwatch log group.</td>
    </tr><tr>
        <td>cloudtrail_iam_role_arn</td>
        <td>The ARN of the IAM role used by the cloudwatch log group.</td>
    </tr><tr>
        <td>cloudtrail_iam_role_name</td>
        <td>The name of the IAM role used by the cloudwatch log group.</td>
    </tr><tr>
        <td>cloudtrail_kms_key_alias_name</td>
        <td>The alias of the KMS key used by the S3 bucket to encrypt cloudtrail logs.</td>
    </tr><tr>
        <td>cloudtrail_kms_key_arn</td>
        <td>The ARN of the KMS key used by the S3 bucket to encrypt cloudtrail logs.</td>
    </tr><tr>
        <td>cloudtrail_s3_access_logging_bucket_name</td>
        <td>The name of the S3 bucket where server access logs are delivered.</td>
    </tr><tr>
        <td>cloudtrail_s3_bucket_name</td>
        <td>The name of the S3 bucket where cloudtrail logs are delivered.</td>
    </tr><tr>
        <td>cloudtrail_trail_arn</td>
        <td>The ARN of the cloudtrail trail.</td>
    </tr><tr>
        <td>config_iam_role_arns</td>
        <td>The ARNs of the IAM role used by the config recorder.</td>
    </tr><tr>
        <td>config_recorder_names</td>
        <td>The names of the configuration recorder.</td>
    </tr><tr>
        <td>config_s3_bucket_names</td>
        <td>The names of the S3 bucket used by AWS Config to store configuration items.</td>
    </tr><tr>
        <td>config_sns_topic_arns</td>
        <td>The ARNs of the SNS Topic used by the config notifications.</td>
    </tr><tr>
        <td>cross_account_access_all_group_arn</td>
        <td></td>
    </tr><tr>
        <td>cross_account_access_all_group_name</td>
        <td></td>
    </tr><tr>
        <td>cross_account_access_group_arns</td>
        <td></td>
    </tr><tr>
        <td>cross_account_access_group_names</td>
        <td></td>
    </tr><tr>
        <td>developers_iam_group_arn</td>
        <td></td>
    </tr><tr>
        <td>developers_iam_group_name</td>
        <td></td>
    </tr><tr>
        <td>full_access_iam_group_arn</td>
        <td></td>
    </tr><tr>
        <td>full_access_iam_group_name</td>
        <td></td>
    </tr><tr>
        <td>guardduty_cloudwatch_event_rule_arns</td>
        <td>The ARNs of the cloudwatch event rules used to publish findings to sns if var.publish_findings_to_sns is set to true.</td>
    </tr><tr>
        <td>guardduty_cloudwatch_event_target_arns</td>
        <td>The ARNs of the cloudwatch event targets used to publish findings to sns if var.publish_findings_to_sns is set to true.</td>
    </tr><tr>
        <td>guardduty_detector_ids</td>
        <td>The IDs of the GuardDuty detectors.</td>
    </tr><tr>
        <td>guardduty_findings_sns_topic_arns</td>
        <td>The ARNs of the SNS topics where findings are published if var.publish_findings_to_sns is set to true.</td>
    </tr><tr>
        <td>guardduty_findings_sns_topic_names</td>
        <td>The names of the SNS topic where findings are published if var.publish_findings_to_sns is set to true.</td>
    </tr><tr>
        <td>houston_cli_users_iam_group_arn</td>
        <td></td>
    </tr><tr>
        <td>houston_cli_users_iam_group_name</td>
        <td></td>
    </tr><tr>
        <td>iam_admin_iam_group_arn</td>
        <td></td>
    </tr><tr>
        <td>iam_admin_iam_group_name</td>
        <td></td>
    </tr><tr>
        <td>iam_admin_iam_policy_arn</td>
        <td></td>
    </tr><tr>
        <td>iam_self_mgmt_iam_group_arn</td>
        <td></td>
    </tr><tr>
        <td>iam_self_mgmt_iam_group_name</td>
        <td></td>
    </tr><tr>
        <td>iam_self_mgmt_iam_policy_arn</td>
        <td></td>
    </tr><tr>
        <td>invalid_cmk_inputs</td>
        <td>Map of CMKs from the input var.customer_master_keys that had an invalid region, and thus were not created. The structure of the map is the same as the input. This will only include KMS key inputs that were not created because the region attribute was invalid (either not a valid region identifier, the region is not enabled on the account, or the region is not included in the var.opt_in_regions input).</td>
    </tr><tr>
        <td>kms_key_aliases</td>
        <td>A map from region to aliases of the KMS CMKs that were created. The value will also be a map mapping the keys from the var.customer_master_keys input variable to the corresponding alias.</td>
    </tr><tr>
        <td>kms_key_arns</td>
        <td>A map from region to ARNs of the KMS CMKs that were created. The value will also be a map mapping the keys from the var.kms_customer_master_keys input variable to the corresponding ARN.</td>
    </tr><tr>
        <td>kms_key_ids</td>
        <td>A map from region to IDs of the KMS CMKs that were created. The value will also be a map mapping the keys from the var.kms_customer_master_keys input variable to the corresponding ID.</td>
    </tr><tr>
        <td>logs_iam_group_arn</td>
        <td></td>
    </tr><tr>
        <td>logs_iam_group_name</td>
        <td></td>
    </tr><tr>
        <td>read_only_iam_group_arn</td>
        <td></td>
    </tr><tr>
        <td>read_only_iam_group_name</td>
        <td></td>
    </tr><tr>
        <td>require_mfa_policy</td>
        <td></td>
    </tr><tr>
        <td>service_linked_role_arns</td>
        <td>A map of ARNs of the service linked roles created from var.service_linked_roles.</td>
    </tr><tr>
        <td>ssh_grunt_sudo_users_group_arns</td>
        <td></td>
    </tr><tr>
        <td>ssh_grunt_sudo_users_group_names</td>
        <td></td>
    </tr><tr>
        <td>ssh_grunt_users_group_arns</td>
        <td></td>
    </tr><tr>
        <td>ssh_grunt_users_group_names</td>
        <td></td>
    </tr><tr>
        <td>support_iam_group_arn</td>
        <td></td>
    </tr><tr>
        <td>support_iam_group_name</td>
        <td></td>
    </tr><tr>
        <td>use_existing_iam_roles_iam_group_arn</td>
        <td></td>
    </tr><tr>
        <td>use_existing_iam_roles_iam_group_name</td>
        <td></td>
    </tr><tr>
        <td>user_access_keys</td>
        <td>A map of usernames to that user's access keys (a map with keys access_key_id and secret_access_key), with the secret_access_key encrypted with that user's PGP key (only shows up for users with create_access_keys = true). You can decrypt the secret_access_key on the CLI: echo &lt;secret_access_key> | base64 --decode | keybase pgp decrypt</td>
    </tr><tr>
        <td>user_arns</td>
        <td>A map of usernames to the ARN for that IAM user.</td>
    </tr><tr>
        <td>user_passwords</td>
        <td>A map of usernames to that user's AWS Web Console password, encrypted with that user's PGP key (only shows up for users with create_login_profile = true). You can decrypt the password on the CLI: echo &lt;password> | base64 --decode | keybase pgp decrypt</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"f2fb39c236ab24fac152993bbe16e8c0"}
##DOCS-SOURCER-END -->
