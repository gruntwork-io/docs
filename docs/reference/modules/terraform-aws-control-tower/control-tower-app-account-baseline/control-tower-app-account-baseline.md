---
title: "Account Baseline App with Control Tower Integration"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Control Tower" version="1.1.0" lastModifiedVersion="0.8.7"/>

# Account Baseline App with Control Tower Integration

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.1.0/modules/landingzone/control-tower-app-account-baseline" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.8.7" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

A CIS compliant security baseline for AWS Landing Zone for configuring the app and logs accounts (dev, stage, prod, and
other similar child accounts), as part of a Control Tower integration. This module fills in features NOT supported by
Control Tower, including setting up Amazon Guard Duty, Macie, IAM roles, IAM password policy, and more.

## Interactions with `AWS-GR_CONFIG_CHANGE_PROHIBITED`

If you are receiving errors that you do not have permissions to edit AWS Config rules while making modifications while consuming this module, you might need to assume the `AWSControlTowerExecution` role to bypass the SCP restriction, as the control has an exception for the `AWSControlTowerExecution` role, which is assumed when baselining AWS accounts.

Once you assume the `AWSControlTowerExecution` role, you should be able to complete the update to this module, and future updates aren't likely to be blocked by the SCP (unless you make different changes to AWS Config). If you are still having issues, please reach out to Gruntwork support.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CONTROL-TOWER-APP-ACCOUNT-BASELINE MODULE
# ------------------------------------------------------------------------------------------------------

module "control_tower_app_account_baseline" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-app-account-baseline?ref=v1.1.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS Account ID the template should be operated on. This avoids
  # misconfiguration errors caused by environment variables.
  aws_account_id = <string>

  # The AWS Region to use as the global config recorder.
  aws_region = <string>

  # Creates resources in the specified regions. The best practice is to enable
  # EBS Encryption in all enabled regions in your AWS account. This variable
  # must NOT be set to null or empty. Otherwise, we won't know which regions to
  # use and authenticate to, and may use some not enabled in your AWS account
  # (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS
  # account, you can use the AWS CLI: aws ec2 describe-regions.
  ebs_opt_in_regions = <list(string)>

  # Creates resources in the specified regions. The best practice is to enable
  # GuardDuty in all enabled regions in your AWS account. This variable must NOT
  # be set to null or empty. Otherwise, we won't know which regions to use and
  # authenticate to, and may use some not enabled in your AWS account (e.g.,
  # GovCloud, China, etc). To get the list of regions enabled in your AWS
  # account, you can use the AWS CLI: aws ec2 describe-regions.
  guardduty_opt_in_regions = <list(string)>

  # Creates resources in the specified regions. The best practice is to enable
  # IAM Access Analyzer in all enabled regions in your AWS account. This
  # variable must NOT be set to null or empty. Otherwise, we won't know which
  # regions to use and authenticate to, and may use some not enabled in your AWS
  # account (e.g., GovCloud, China, etc). To get the list of regions enabled in
  # your AWS account, you can use the AWS CLI: aws ec2 describe-regions.
  iam_access_analyzer_opt_in_regions = <list(string)>

  # Creates resources in the specified regions. This variable must NOT be set to
  # null or empty. Otherwise, we won't know which regions to use and
  # authenticate to, and may use some not enabled in your AWS account (e.g.,
  # GovCloud, China, etc). To get the list of regions enabled in your AWS
  # account, you can use the AWS CLI: aws ec2 describe-regions.
  kms_cmk_opt_in_regions = <list(string)>

  # Creates resources in the specified regions. The best practice is to enable
  # Amazon Macie in all enabled regions in your AWS account. This variable must
  # NOT be set to null or empty. Otherwise, we won't know which regions to use
  # and authenticate to, and may use some not enabled in your AWS account (e.g.,
  # GovCloud, China, etc). To get the list of regions enabled in your AWS
  # account, you can use the AWS CLI: aws ec2 describe-regions.
  macie_opt_in_regions = <list(string)>

  # The name used to prefix AWS Config and Cloudtrail resources, including the
  # S3 bucket names and SNS topics used for each.
  name_prefix = <string>

  # Creates resources in the specified regions. The best practice is to enable
  # AWS Security Hub in all enabled regions in your AWS account. This variable
  # must NOT be set to null or empty. Otherwise, we won't know which regions to
  # use and authenticate to, and may use some not enabled in your AWS account
  # (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS
  # account, you can use the AWS CLI: aws ec2 describe-regions.
  security_hub_opt_in_regions = <list(string)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of IAM ARNs from other AWS accounts that will be allowed to assume
  # the auto deploy IAM role that has the permissions in
  # var.auto_deploy_permissions.
  allow_auto_deploy_from_other_account_arns = []

  # A list of IAM ARNs from other AWS accounts that will be allowed full (read
  # and write) access to the billing info for this account.
  allow_billing_access_from_other_account_arns = []

  # A list of IAM ARNs from other AWS accounts that will be allowed full (read
  # and write) access to the services in this account specified in
  # var.dev_permitted_services.
  allow_dev_access_from_other_account_arns = []

  # A list of IAM ARNs from other AWS accounts that will be allowed full (read
  # and write) access to this account.
  allow_full_access_from_other_account_arns = []

  # A list of IAM ARNs from other AWS accounts that will be allowed read access
  # to the logs in CloudTrail, AWS Config, and CloudWatch in this account.
  allow_logs_access_from_other_account_arns = []

  # A list of IAM ARNs from other AWS accounts that will be allowed read-only
  # access to this account.
  allow_read_only_access_from_other_account_arns = []

  # A list of IAM ARNs from other AWS accounts that will be allowed read access
  # to IAM groups and publish SSH keys. This is used for ssh-grunt.
  allow_ssh_grunt_access_from_other_account_arns = []

  # A list of IAM ARNs from other AWS accounts that will be allowed access to
  # AWS support for this account.
  allow_support_access_from_other_account_arns = []

  # A list of IAM permissions (e.g. ec2:*) that will be added to an IAM Group
  # for doing automated deployments. NOTE: If
  # var.should_create_iam_group_auto_deploy is true, the list must have at least
  # one element (e.g. '*').
  auto_deploy_permissions = []

  # Namespace all Lambda resources created by this module with this name.
  cleanup_expired_certs_lambda_namespace = "cleanup-expired-iam-certs"

  # If set true, just before the Lambda function finishes running, it will
  # report a custom metric to CloudWatch, as specified by
  # var.report_cloudwatch_metric_namespace and
  # var.report_cloudwatch_metric_name. You can set an alarm on this metric to
  # detect if the Lambda job deleted any certificates. Note: you must also set
  # var.report_cloudwatch_metric_namespace and var.report_cloudwatch_metric_name
  # if this variable is set to true.
  cleanup_expired_certs_report_cloudwatch_metric = true

  # The name to use for the custom CloudWatch metric. Only used if
  # var.report_cloudwatch_metric is set to true.
  cleanup_expired_certs_report_cloudwatch_metric_name = "cleanup-expired-iam-certs-count"

  # The namespace to use for the custom CloudWatch metric. Only used if
  # var.report_cloudwatch_metric is set to true.
  cleanup_expired_certs_report_cloudwatch_metric_namespace = "custom/cis"

  # An expression that defines how often to run the Lambda function to clean up
  # expired IAM certs. For example, cron(0 20 * * ? *) or rate(5 minutes).
  cleanup_expired_certs_schedule_expression = "rate(1 hour)"

  # Set to false to create an S3 bucket of name var.cloudtrail_s3_bucket_name in
  # this account for storing CloudTrail logs (e.g., if this is the logs
  # account). Set to true to assume the bucket specified in
  # var.cloudtrail_s3_bucket_name already exists in another AWS account (e.g.,
  # if this is the stage or prod account and var.cloudtrail_s3_bucket_name is
  # the name of a bucket in the logs account).
  cloudtrail_s3_bucket_already_exists = true

  # Set to true to create an S3 bucket of name var.config_s3_bucket_name in this
  # account for storing AWS Config data (e.g., if this is the logs account). Set
  # to false to assume the bucket specified in var.config_s3_bucket_name already
  # exists in another AWS account (e.g., if this is the stage or prod account
  # and var.config_s3_bucket_name is the name of a bucket in the logs account).
  config_should_create_s3_bucket = false

  # The ID of the your management (root) AWS account where Control Tower is
  # enabled. Only used if create_control_tower_execution_role is set to true.
  control_tower_management_account_id = null

  # Set to true to create the Control Tower Execution IAM role. This role gives
  # Control Tower permissions to manage this account. If you create an account
  # using Control Tower, it will create this role automatically, but if you are
  # enrolling an existing account in Control Tower, you MUST set this variable
  # to true to create this IAM role. If set to true, you MUST also set the
  # control_tower_management_account_id input variable.
  create_control_tower_execution_role = false

  # Set to true to create an S3 bucket of name macie_bucket_name for storing
  # sensitive data discovery results. Set to false to assume the bucket already
  # exists. NOTE: Whether you choose to create the bucket yourself, or have it
  # automatically created by Terraform, you will need to manually configure this
  # bucket to store sensitive data discovery results in AWS Console.
  create_macie_bucket = false

  # A map of tags to apply to the IAM roles.
  cross_account_iam_role_tags = {}

  # A list of AWS services for which the developers from the accounts in
  # var.allow_dev_access_from_other_account_arns will receive full permissions.
  # See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to
  # grant developers access only to EC2 and Amazon Machine Learning, use the
  # value ["ec2","machinelearning"]. Do NOT add iam to the list of services, or
  # that will grant Developers de facto admin access.
  dev_permitted_services = []

  # The name of the KMS CMK to use by default for encrypting EBS volumes, if
  # var.enable_encryption and var.use_existing_kms_keys are enabled. The name
  # must match the name given the var.kms_customer_master_keys variable.
  ebs_kms_key_name = ""

  # If set to true, the KMS Customer Managed Keys (CMK) with the name in
  # var.ebs_kms_key_name will be set as the default for EBS encryption. When
  # false (default), the AWS-managed aws/ebs key will be used.
  ebs_use_existing_kms_keys = false

  # When true, enable the Encrypted Volumes check in AWS Config. This check
  # identifies EBS volumes that are not encrypted. This check is useful for
  # identifying and encrypting EBS volumes, which can help reduce the risk of
  # unauthorized access to your AWS resources.
  enable_encrypted_volumes = false

  # When true, create an Open ID Connect Provider that GitHub actions can use to
  # assume IAM roles in the account. Refer to
  # https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services
  # for more information.
  enable_github_actions_access = false

  # When true, enable the IAM Password Policy check in AWS Config. This check
  # identifies IAM users whose password policy does not meet the specified
  # requirements. This check is useful for identifying and enforcing a password
  # policy for IAM users, which can help reduce the risk of unauthorized access
  # to your AWS resources.
  enable_iam_password_policy = false

  # When true, enable the IAM User Unused Credentials check in AWS Config. This
  # check identifies IAM users who have not used their credentials for a
  # specified number of days. This check is useful for identifying and removing
  # unused IAM users, which can help reduce the risk of unauthorized access to
  # your AWS resources. Note that this is required for the
  # `revoke_unused_iam_credentials` module, which is provisioned here and is the
  # only reason this is set to true. The current recommended way to handle
  # propagating Config rules in AWS is to use Control Tower Controls.
  enable_iam_user_unused_credentials_check = true

  # When true, enable the Insecure Security Group Rules check in AWS Config.
  # This check identifies security groups that allow unrestricted inbound
  # traffic. This check is useful for identifying and removing insecure security
  # group rules, which can help reduce the risk of unauthorized access to your
  # AWS resources.
  enable_insecure_sg_rules = false

  # When true, enable the RDS Storage Encrypted check in AWS Config. This check
  # identifies RDS instances that are not encrypted. This check is useful for
  # identifying and encrypting RDS instances, which can help reduce the risk of
  # unauthorized access to your AWS resources.
  enable_rds_storage_encrypted = false

  # When true, enable the Root Account MFA check in AWS Config. This check
  # identifies the AWS account root user that does not have multi-factor
  # authentication (MFA) enabled. This check is useful for identifying and
  # enabling MFA for the root account, which can help reduce the risk of
  # unauthorized access to your AWS resources.
  enable_root_account_mfa = false

  # When true, enable the S3 Bucket Public Read Prohibited check in AWS Config.
  # This check identifies S3 buckets that allow public read access. This check
  # is useful for identifying and removing public read access from S3 buckets,
  # which can help reduce the risk of unauthorized access to your AWS resources.
  enable_s3_bucket_public_read_prohibited = false

  # When true, enable the S3 Bucket Public Write Prohibited check in AWS Config.
  # This check identifies S3 buckets that allow public write access. This check
  # is useful for identifying and removing public write access from S3 buckets,
  # which can help reduce the risk of unauthorized access to your AWS resources.
  enable_s3_bucket_public_write_prohibited = false

  # Set to false to disable Security Hub in the account.
  enable_security_hub = true

  # If set to true, when you run 'terraform destroy', delete all objects from
  # all S3 buckets and any IAM users created by this module so that everything
  # can be destroyed without error. Warning: these objects are not recoverable
  # so only use this if you're absolutely sure you want to permanently delete
  # everything! This is mostly useful when testing.
  force_destroy = false

  # If set to true, when you run 'terraform destroy', delete all objects from
  # the bucket macie_bucket_name so that the bucket can be destroyed without
  # error. Warning: these objects are not recoverable so only use this if you're
  # absolutely sure you want to permanently delete everything!
  force_destroy_macie_bucket = false

  # When set, use the statically provided hardcoded list of thumbprints rather
  # than looking it up dynamically. This is useful if you want to trade
  # relibaility of the OpenID Connect Provider across certificate renewals with
  # a static list that is obtained using a trustworthy mechanism to mitigate
  # potential damage from a domain hijacking attack on GitHub domains.
  github_actions_openid_connect_provider_thumbprint_list = null

  # Whether to accept an invite from the master account if the detector is not
  # created automatically
  guardduty_accept_invite = false

  # The AWS account ID of the GuardDuty delegated admin/master account
  guardduty_admin_account_id = null

  # Name of the Cloudwatch event rules.
  guardduty_cloudwatch_event_rule_name = "guardduty-finding-events"

  # Map of detector features to enable, where the key is the name of the feature
  # the value is the feature configuration. When AWS Organizations delegated
  # admin account is used, use var.organization_configuration_features in the
  # deledated admin account instead. See
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/guardduty_detector_feature
  guardduty_detector_features = {}

  # Specifies the frequency of notifications sent for subsequent finding
  # occurrences. If the detector is a GuardDuty member account, the value is
  # determined by the GuardDuty master account and cannot be modified, otherwise
  # defaults to SIX_HOURS. For standalone and GuardDuty master accounts, it must
  # be configured in Terraform to enable drift detection. Valid values for
  # standalone and master accounts: FIFTEEN_MINUTES, ONE_HOUR, SIX_HOURS.
  guardduty_finding_publishing_frequency = null

  # If true, an IAM Policy that grants access to the key will be honored. If
  # false, only the ARNs listed in var.kms_key_user_iam_arns will have access to
  # the key and any IAM Policy grants will be ignored. (true or false)
  guardduty_findings_allow_kms_access_with_iam = true

  # The AWS regions that are allowed to write to the GuardDuty findings S3
  # bucket. This is needed to configure the bucket and CMK policy to allow
  # writes from manually-enabled regions. See
  # https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_exportfindings.html#guardduty_exportfindings-s3-policies
  guardduty_findings_allowed_regions = []

  # Whether or not to enable automatic annual rotation of the KMS key. Defaults
  # to true.
  guardduty_findings_enable_key_rotation = true

  # A list of external AWS accounts that should be given write access for
  # GuardDuty findings to this S3 bucket. This is useful when aggregating
  # findings for multiple AWS accounts in one common S3 bucket.
  guardduty_findings_external_aws_account_ids_with_write_access = []

  # If set to true, when you run 'terraform destroy', delete all objects from
  # the bucket so that the bucket can be destroyed without error. Warning: these
  # objects are not recoverable so only use this if you're absolutely sure you
  # want to permanently delete everything!
  guardduty_findings_force_destroy = false

  # All GuardDuty findings will be encrypted with a KMS Key (a Customer Master
  # Key). The IAM Users specified in this list will have rights to change who
  # can access the data.
  guardduty_findings_kms_key_administrator_iam_arns = []

  # If set to true, that means the KMS key you're using already exists, and does
  # not need to be created.
  guardduty_findings_kms_key_already_exists = false

  # The ARN of the KMS key used to encrypt GuardDuty findings. GuardDuty
  # enforces findings to be encrypted. Only used if
  # guardduty_publish_findings_to_s3 is true.
  guardduty_findings_kms_key_arn = null

  # Additional service principals beyond GuardDuty that should have access to
  # the KMS key used to encrypt the logs.
  guardduty_findings_kms_key_service_principals = []

  # All GuardDuty findings will be encrypted with a KMS Key (a Customer Master
  # Key). The IAM Users specified in this list will have read-only access to the
  # data.
  guardduty_findings_kms_key_user_iam_arns = []

  # After this number of days, findings should be transitioned from S3 to
  # Glacier. Enter 0 to never archive findings.
  guardduty_findings_num_days_after_which_archive_findings_data = 30

  # After this number of days, log files should be deleted from S3. Enter 0 to
  # never delete log data.
  guardduty_findings_num_days_after_which_delete_findings_data = 365

  # Additional IAM policies to apply to this S3 bucket. You can use this to
  # grant read/write access. This should be a map, where each key is a unique
  # statement ID (SID), and each value is an object that contains the parameters
  # defined in the comment above.
  guardduty_findings_s3_bucket_additional_policy_statements = {}

  # The S3 bucket ARN to which the findings get exported.
  guardduty_findings_s3_bucket_arn = null

  # The name of the S3 Bucket where GuardDuty findings will be stored.
  guardduty_findings_s3_bucket_name = null

  # Optional prefix directory to create in the bucket. Must contain a trailing
  # '/'. If you use a prefix for S3 findings publishing, you must pre-create the
  # prefix in the findings bucket. See
  # https://github.com/hashicorp/terraform-provider-aws/issues/16750.
  guardduty_findings_s3_bucket_prefix = null

  # Enable MFA delete for either 'Change the versioning state of your bucket' or
  # 'Permanently delete an object version'. This setting only applies to the
  # bucket used to storage GuardDuty findings. This cannot be used to toggle
  # this setting but is available to allow managed buckets to reflect the state
  # in AWS. For instructions on how to enable MFA Delete, check out the README
  # from the terraform-aws-security/private-s3-bucket module.
  guardduty_findings_s3_mfa_delete = false

  # The bucket prefix without trailing '/' under which the findings get
  # exported. The prefix is optional and will be
  # AWSLogs/[Account-ID]/GuardDuty/[Region]/ if not provided.
  guardduty_findings_s3_prefix = null

  # Whether to create a bucket for GuardDuty findings. If set to true, you must
  # provide the var.guardduty_findings_s3_bucket_name.
  guardduty_findings_should_create_bucket = false

  # Specifies a name for the created SNS topics where findings are published.
  # publish_findings_to_sns must be set to true.
  guardduty_findings_sns_topic_name = "guardduty-findings"

  # Tags to apply to the GuardDuty findings resources (S3 bucket and CMK).
  guardduty_findings_tags = {}

  # Publish GuardDuty findings to an S3 bucket.
  guardduty_publish_findings_to_s3 = false

  # Send GuardDuty findings to SNS topics specified by findings_sns_topic_name.
  guardduty_publish_findings_to_sns = false

  # The name of the IAM Access Analyzer module
  iam_access_analyzer_name = "baseline_app-iam_access_analyzer"

  # Password expiration requires administrator reset.
  iam_password_policy_hard_expiry = true

  # The number of days that an user password is valid. Enter 0 for no
  # expiration.
  iam_password_policy_max_password_age = 0

  # Password minimum length. To be compliant with CIS recommendation 1.8, the
  # minimum password length is 14.
  iam_password_policy_minimum_password_length = 14

  # Whether to require lowercase characters for user passwords (true or false).
  iam_password_policy_require_lowercase_characters = true

  # Whether to require numbers for user passwords (true or false).
  iam_password_policy_require_numbers = true

  # Whether to require symbols for user passwords (true or false).
  iam_password_policy_require_symbols = true

  # Whether to require uppercase characters for user passwords (true or false).
  iam_password_policy_require_uppercase_characters = true

  # Include this value as a prefix in the name of every IAM role created by this
  # module. This is useful to prepend, for example, '<account-name>-' to every
  # IAM role name: e.g., allow-full-access-from-other-accounts becomes
  # stage-allow-full-access-from-other-accounts.
  iam_role_name_prefix = ""

  # A map of tags to apply to all KMS Keys to be created. In this map variable,
  # the key is the tag name and the value is the tag value.
  kms_cmk_global_tags = {}

  # You can use this variable to create account-level KMS Customer Master Keys
  # (CMKs) for encrypting and decrypting data. This variable should be a map
  # where the keys are the names of the CMK and the values are an object that
  # defines the configuration for that CMK. See the comment below for the
  # configuration options you can set for each key.
  kms_customer_master_keys = {}

  # The map of names of KMS grants to the region where the key resides in. There
  # should be a one to one mapping between entries in this map and the entries
  # of the kms_grants map. This is used to workaround a terraform limitation
  # where the for_each value can not depend on resources.
  kms_grant_regions = {}

  # Create the specified KMS grants to allow entities to use the KMS key without
  # modifying the KMS policy or IAM. This is necessary to allow AWS services
  # (e.g. ASG) to use CMKs encrypt and decrypt resources. The input is a map of
  # grant name to grant properties. The name must be unique per account.
  kms_grants = {}

  # Specifies the status for the account. To enable Amazon Macie and start all
  # Macie activities for the account, set this value to ENABLED. Valid values
  # are ENABLED or PAUSED.
  macie_account_status = "ENABLED"

  # AWS Account to join this account's Amazon Macie to. Must have already
  # received an invite from this account.
  macie_administrator_account_id = ""

  # The name of the S3 bucket for storing sensitive data discovery results. Only
  # used if create_macie_bucket is true. If omitted, Terraform will assign a
  # random, unique name.
  macie_bucket_name = null

  # S3 buckets that Macie should analyze. This should be a map, where each key
  # is a region, and each value is a list of buckets in that region that should
  # be analyzed. Unfortunately, due to the limitations in the Terraform AWS
  # provider, there is no way to automatically select all buckets in a region,
  # therefore an explicit list of buckets to analyze must be maintained in this
  # variable. For more information, see
  # https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/blob/master/modules/security/macie/core-concepts.md#buckets-to-analyze.
  macie_buckets_to_analyze = {}

  # A map from region to ID (ARN, alias ARN, AWS ID) of a customer managed KMS
  # Key to use for encrypting Macie log data. Only used if
  # var.macie_create_logs_kms_key is set to false.
  macie_cloudwatch_log_group_kms_key_id = null

  # The number of days to retain log events in the log group for Macie. Refer to
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days
  # for all the valid values. When null, the log events are retained forever.
  macie_cloudwatch_log_group_retention_in_days = null

  # Tags to apply on the Macie CloudWatch Log Group, encoded as a map where the
  # keys are tag keys and values are tag values.
  macie_cloudwatch_log_group_tags = null

  # Set to true to create a KMS key to encrypt sensitive data discovery results.
  # NOTE: Whether you choose to create the key yourself, or have it
  # automatically created by Terraform, you will need to manually configure this
  # key to encrypt sensitive data discovery results in AWS Console.
  macie_create_discovery_results_kms_key = false

  # Set to true to create a KMS key to encrypt Macie log entries. If false, log
  # entries will not be encrypted unless a key is provided with
  # var.macie_cloudwatch_log_group_kms_key_id.
  macie_create_logs_kms_key = false

  # The number of days to keep around the KMS Customer managed Key for
  # encrypting sensitive discovery results after it has been marked for
  # deletion.
  macie_discovery_results_kms_key_deletion_window_in_days = 30

  # The name of the KMS key to encrypt sensitive data discovery results.
  # Required if create_kms_key is set to true, otherwise ignored.
  macie_discovery_results_kms_key_name = null

  # A list of IAM user ARNs with access to the KMS key above. Required if
  # create_kms_key is set to true, otherwise ignored.
  macie_discovery_results_kms_key_users = null

  # Map of AWS Accounts to add as members to this account's Amazon Macie
  # configuration. The keys in this map should each be a unique value (e.g., the
  # account name) and the values should be objects that contain the account ID
  # and Email.
  macie_external_member_accounts = {}

  # Specifies how often to publish updates to policy findings for the account.
  # Valid values are FIFTEEN_MINUTES, ONE_HOUR or SIX_HOURS.
  macie_finding_publishing_frequency = "FIFTEEN_MINUTES"

  # A custom name for the job. If omitted, Terraform will assign a random,
  # unique name.
  macie_job_name = null

  # The number of days to keep the KMS Customer managed Key for Macie Los around
  # after it has been marked for deletion.
  macie_logs_kms_key_deletion_window_in_days = 30

  # The name of the KMS key to encrypt Macie logs. Required if
  # macie_create_logs_kms_key is set to true, otherwise ignored.
  macie_logs_kms_key_name = null

  # The primary region where the kms key for encrypting Macie logs should be
  # created. When set, the KMS key will be created in this region and then
  # replicated to all opted in regions. On the other hand, when null, a
  # different KMS key will be created in all opted in regions.
  macie_logs_kms_key_primary_region = null

  # A list of IAM user ARNs with access to the KMS key above. Required if
  # macie_create_logs_kms_key is set to true, otherwise ignored.
  macie_logs_kms_key_users = null

  # When true, precreate the CloudWatch Log Group to use for the Macie Data
  # Discovery job. This is useful if you wish to customize the CloudWatch Log
  # Group with various settings such as retention periods and KMS encryption.
  # When false, AWS Macie will automatically create a basic log group to use.
  macie_should_create_cloudwatch_log_group = true

  # The maximum allowable session duration, in seconds, for the credentials you
  # get when assuming the IAM roles created by this module. This variable
  # applies to all IAM roles created by this module that are intended for people
  # to use, such as allow-read-only-access-from-other-accounts. For IAM roles
  # that are intended for machine users, such as
  # allow-auto-deploy-from-other-accounts, see
  # var.max_session_duration_machine_users.
  max_session_duration_human_users = 43200

  # The maximum allowable session duration, in seconds, for the credentials you
  # get when assuming the IAM roles created by this module. This variable 
  # applies to all IAM roles created by this module that are intended for
  # machine users, such as allow-auto-deploy-from-other-accounts. For IAM roles
  # that are intended for human users, such as
  # allow-read-only-access-from-other-accounts, see
  # var.max_session_duration_human_users.
  max_session_duration_machine_users = 3600

  # The amount of reserved concurrent executions for this lambda function or -1
  # if unreserved. Note that this defaults to 1 to ensure that we only have one
  # instance of this process running at a time. Since the process depends on
  # querying expired IAM certificates, it can lead to errors if more than one of
  # these are running at a time.
  reserved_concurrent_executions = 1

  # The AWS region (e.g., us-east-1) where all the findings will be aggregated.
  # If null, no region will be designated as an aggregate region and findings
  # will only be visible to the region where it was reported. NOTE: this can
  # only be implemented on the SecurityHub administrator account.
  security_hub_aggregate_region = null

  # AWS Account to join this account's Security Hub to. Must have already
  # received an invite from the another account. If SecurityHub is being
  # centralized in the current AWS account, use
  # var.security_hub_external_member_accounts instead.
  security_hub_associate_to_admin_account_id = ""

  # When true, enable the CIS benchmark v1.4 ruleset for automatic checks in
  # SecurityHub. Set this to false if you are using Steampipe instead.
  security_hub_enable_cis_1_4_check = true

  # When true, enable the CIS benchmark v1.2 ruleset for automatic checks in
  # SecurityHub. If you also want to disable the CIS benchmark v1.4 check, then
  # var.security_hub_enable_cis_1_4_check should also be set to false. Set this
  # to false if you are using Steampipe instead.
  security_hub_enable_cis_check = true

  # Map of AWS Accounts to add as members to this account's SecurityHub
  # configuration. The keys in this map should each be a unique value (e.g., the
  # account name) and the values should be objects that contain the account ID
  # and Email to contact about security issues in the account. This variable is
  # used when Security Hub is being centralized in the current AWS account (e.g.
  # a logs account). If it's centralized elsewhere,
  # var.security_hub_associate_to_admin_account_id should be used instead.
  security_hub_external_member_accounts = {}

  # Adjust the logging level of the script to sync SecurityHub member accounts.
  # Valid values: debug, info, warn, error
  security_hub_loglevel = "info"

  # List of product integration IDs to enable on SecurityHub. Refer to
  # https://www.terraform.io/docs/providers/aws/r/securityhub_product_subscription.html#argument-reference
  # for valid values.
  security_hub_product_integrations = []

  # Create service-linked roles for this set of services. You should pass in the
  # URLs of the services, but without the protocol (e.g., http://) in front:
  # e.g., use elasticbeanstalk.amazonaws.com for Elastic Beanstalk or
  # es.amazonaws.com for Amazon Elasticsearch. Service-linked roles are
  # predefined by the service, can typically only be assumed by that service,
  # and include all the permissions that the service requires to call other AWS
  # services on your behalf. You can typically only create one such role per AWS
  # account, which is why this parameter exists in the account baseline. See
  # https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_aws-services-that-work-with-iam.html
  # for the list of services that support service-linked roles.
  service_linked_roles = []

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
# DEPLOY GRUNTWORK'S CONTROL-TOWER-APP-ACCOUNT-BASELINE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-app-account-baseline?ref=v1.1.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS Account ID the template should be operated on. This avoids
  # misconfiguration errors caused by environment variables.
  aws_account_id = <string>

  # The AWS Region to use as the global config recorder.
  aws_region = <string>

  # Creates resources in the specified regions. The best practice is to enable
  # EBS Encryption in all enabled regions in your AWS account. This variable
  # must NOT be set to null or empty. Otherwise, we won't know which regions to
  # use and authenticate to, and may use some not enabled in your AWS account
  # (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS
  # account, you can use the AWS CLI: aws ec2 describe-regions.
  ebs_opt_in_regions = <list(string)>

  # Creates resources in the specified regions. The best practice is to enable
  # GuardDuty in all enabled regions in your AWS account. This variable must NOT
  # be set to null or empty. Otherwise, we won't know which regions to use and
  # authenticate to, and may use some not enabled in your AWS account (e.g.,
  # GovCloud, China, etc). To get the list of regions enabled in your AWS
  # account, you can use the AWS CLI: aws ec2 describe-regions.
  guardduty_opt_in_regions = <list(string)>

  # Creates resources in the specified regions. The best practice is to enable
  # IAM Access Analyzer in all enabled regions in your AWS account. This
  # variable must NOT be set to null or empty. Otherwise, we won't know which
  # regions to use and authenticate to, and may use some not enabled in your AWS
  # account (e.g., GovCloud, China, etc). To get the list of regions enabled in
  # your AWS account, you can use the AWS CLI: aws ec2 describe-regions.
  iam_access_analyzer_opt_in_regions = <list(string)>

  # Creates resources in the specified regions. This variable must NOT be set to
  # null or empty. Otherwise, we won't know which regions to use and
  # authenticate to, and may use some not enabled in your AWS account (e.g.,
  # GovCloud, China, etc). To get the list of regions enabled in your AWS
  # account, you can use the AWS CLI: aws ec2 describe-regions.
  kms_cmk_opt_in_regions = <list(string)>

  # Creates resources in the specified regions. The best practice is to enable
  # Amazon Macie in all enabled regions in your AWS account. This variable must
  # NOT be set to null or empty. Otherwise, we won't know which regions to use
  # and authenticate to, and may use some not enabled in your AWS account (e.g.,
  # GovCloud, China, etc). To get the list of regions enabled in your AWS
  # account, you can use the AWS CLI: aws ec2 describe-regions.
  macie_opt_in_regions = <list(string)>

  # The name used to prefix AWS Config and Cloudtrail resources, including the
  # S3 bucket names and SNS topics used for each.
  name_prefix = <string>

  # Creates resources in the specified regions. The best practice is to enable
  # AWS Security Hub in all enabled regions in your AWS account. This variable
  # must NOT be set to null or empty. Otherwise, we won't know which regions to
  # use and authenticate to, and may use some not enabled in your AWS account
  # (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS
  # account, you can use the AWS CLI: aws ec2 describe-regions.
  security_hub_opt_in_regions = <list(string)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of IAM ARNs from other AWS accounts that will be allowed to assume
  # the auto deploy IAM role that has the permissions in
  # var.auto_deploy_permissions.
  allow_auto_deploy_from_other_account_arns = []

  # A list of IAM ARNs from other AWS accounts that will be allowed full (read
  # and write) access to the billing info for this account.
  allow_billing_access_from_other_account_arns = []

  # A list of IAM ARNs from other AWS accounts that will be allowed full (read
  # and write) access to the services in this account specified in
  # var.dev_permitted_services.
  allow_dev_access_from_other_account_arns = []

  # A list of IAM ARNs from other AWS accounts that will be allowed full (read
  # and write) access to this account.
  allow_full_access_from_other_account_arns = []

  # A list of IAM ARNs from other AWS accounts that will be allowed read access
  # to the logs in CloudTrail, AWS Config, and CloudWatch in this account.
  allow_logs_access_from_other_account_arns = []

  # A list of IAM ARNs from other AWS accounts that will be allowed read-only
  # access to this account.
  allow_read_only_access_from_other_account_arns = []

  # A list of IAM ARNs from other AWS accounts that will be allowed read access
  # to IAM groups and publish SSH keys. This is used for ssh-grunt.
  allow_ssh_grunt_access_from_other_account_arns = []

  # A list of IAM ARNs from other AWS accounts that will be allowed access to
  # AWS support for this account.
  allow_support_access_from_other_account_arns = []

  # A list of IAM permissions (e.g. ec2:*) that will be added to an IAM Group
  # for doing automated deployments. NOTE: If
  # var.should_create_iam_group_auto_deploy is true, the list must have at least
  # one element (e.g. '*').
  auto_deploy_permissions = []

  # Namespace all Lambda resources created by this module with this name.
  cleanup_expired_certs_lambda_namespace = "cleanup-expired-iam-certs"

  # If set true, just before the Lambda function finishes running, it will
  # report a custom metric to CloudWatch, as specified by
  # var.report_cloudwatch_metric_namespace and
  # var.report_cloudwatch_metric_name. You can set an alarm on this metric to
  # detect if the Lambda job deleted any certificates. Note: you must also set
  # var.report_cloudwatch_metric_namespace and var.report_cloudwatch_metric_name
  # if this variable is set to true.
  cleanup_expired_certs_report_cloudwatch_metric = true

  # The name to use for the custom CloudWatch metric. Only used if
  # var.report_cloudwatch_metric is set to true.
  cleanup_expired_certs_report_cloudwatch_metric_name = "cleanup-expired-iam-certs-count"

  # The namespace to use for the custom CloudWatch metric. Only used if
  # var.report_cloudwatch_metric is set to true.
  cleanup_expired_certs_report_cloudwatch_metric_namespace = "custom/cis"

  # An expression that defines how often to run the Lambda function to clean up
  # expired IAM certs. For example, cron(0 20 * * ? *) or rate(5 minutes).
  cleanup_expired_certs_schedule_expression = "rate(1 hour)"

  # Set to false to create an S3 bucket of name var.cloudtrail_s3_bucket_name in
  # this account for storing CloudTrail logs (e.g., if this is the logs
  # account). Set to true to assume the bucket specified in
  # var.cloudtrail_s3_bucket_name already exists in another AWS account (e.g.,
  # if this is the stage or prod account and var.cloudtrail_s3_bucket_name is
  # the name of a bucket in the logs account).
  cloudtrail_s3_bucket_already_exists = true

  # Set to true to create an S3 bucket of name var.config_s3_bucket_name in this
  # account for storing AWS Config data (e.g., if this is the logs account). Set
  # to false to assume the bucket specified in var.config_s3_bucket_name already
  # exists in another AWS account (e.g., if this is the stage or prod account
  # and var.config_s3_bucket_name is the name of a bucket in the logs account).
  config_should_create_s3_bucket = false

  # The ID of the your management (root) AWS account where Control Tower is
  # enabled. Only used if create_control_tower_execution_role is set to true.
  control_tower_management_account_id = null

  # Set to true to create the Control Tower Execution IAM role. This role gives
  # Control Tower permissions to manage this account. If you create an account
  # using Control Tower, it will create this role automatically, but if you are
  # enrolling an existing account in Control Tower, you MUST set this variable
  # to true to create this IAM role. If set to true, you MUST also set the
  # control_tower_management_account_id input variable.
  create_control_tower_execution_role = false

  # Set to true to create an S3 bucket of name macie_bucket_name for storing
  # sensitive data discovery results. Set to false to assume the bucket already
  # exists. NOTE: Whether you choose to create the bucket yourself, or have it
  # automatically created by Terraform, you will need to manually configure this
  # bucket to store sensitive data discovery results in AWS Console.
  create_macie_bucket = false

  # A map of tags to apply to the IAM roles.
  cross_account_iam_role_tags = {}

  # A list of AWS services for which the developers from the accounts in
  # var.allow_dev_access_from_other_account_arns will receive full permissions.
  # See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to
  # grant developers access only to EC2 and Amazon Machine Learning, use the
  # value ["ec2","machinelearning"]. Do NOT add iam to the list of services, or
  # that will grant Developers de facto admin access.
  dev_permitted_services = []

  # The name of the KMS CMK to use by default for encrypting EBS volumes, if
  # var.enable_encryption and var.use_existing_kms_keys are enabled. The name
  # must match the name given the var.kms_customer_master_keys variable.
  ebs_kms_key_name = ""

  # If set to true, the KMS Customer Managed Keys (CMK) with the name in
  # var.ebs_kms_key_name will be set as the default for EBS encryption. When
  # false (default), the AWS-managed aws/ebs key will be used.
  ebs_use_existing_kms_keys = false

  # When true, enable the Encrypted Volumes check in AWS Config. This check
  # identifies EBS volumes that are not encrypted. This check is useful for
  # identifying and encrypting EBS volumes, which can help reduce the risk of
  # unauthorized access to your AWS resources.
  enable_encrypted_volumes = false

  # When true, create an Open ID Connect Provider that GitHub actions can use to
  # assume IAM roles in the account. Refer to
  # https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services
  # for more information.
  enable_github_actions_access = false

  # When true, enable the IAM Password Policy check in AWS Config. This check
  # identifies IAM users whose password policy does not meet the specified
  # requirements. This check is useful for identifying and enforcing a password
  # policy for IAM users, which can help reduce the risk of unauthorized access
  # to your AWS resources.
  enable_iam_password_policy = false

  # When true, enable the IAM User Unused Credentials check in AWS Config. This
  # check identifies IAM users who have not used their credentials for a
  # specified number of days. This check is useful for identifying and removing
  # unused IAM users, which can help reduce the risk of unauthorized access to
  # your AWS resources. Note that this is required for the
  # `revoke_unused_iam_credentials` module, which is provisioned here and is the
  # only reason this is set to true. The current recommended way to handle
  # propagating Config rules in AWS is to use Control Tower Controls.
  enable_iam_user_unused_credentials_check = true

  # When true, enable the Insecure Security Group Rules check in AWS Config.
  # This check identifies security groups that allow unrestricted inbound
  # traffic. This check is useful for identifying and removing insecure security
  # group rules, which can help reduce the risk of unauthorized access to your
  # AWS resources.
  enable_insecure_sg_rules = false

  # When true, enable the RDS Storage Encrypted check in AWS Config. This check
  # identifies RDS instances that are not encrypted. This check is useful for
  # identifying and encrypting RDS instances, which can help reduce the risk of
  # unauthorized access to your AWS resources.
  enable_rds_storage_encrypted = false

  # When true, enable the Root Account MFA check in AWS Config. This check
  # identifies the AWS account root user that does not have multi-factor
  # authentication (MFA) enabled. This check is useful for identifying and
  # enabling MFA for the root account, which can help reduce the risk of
  # unauthorized access to your AWS resources.
  enable_root_account_mfa = false

  # When true, enable the S3 Bucket Public Read Prohibited check in AWS Config.
  # This check identifies S3 buckets that allow public read access. This check
  # is useful for identifying and removing public read access from S3 buckets,
  # which can help reduce the risk of unauthorized access to your AWS resources.
  enable_s3_bucket_public_read_prohibited = false

  # When true, enable the S3 Bucket Public Write Prohibited check in AWS Config.
  # This check identifies S3 buckets that allow public write access. This check
  # is useful for identifying and removing public write access from S3 buckets,
  # which can help reduce the risk of unauthorized access to your AWS resources.
  enable_s3_bucket_public_write_prohibited = false

  # Set to false to disable Security Hub in the account.
  enable_security_hub = true

  # If set to true, when you run 'terraform destroy', delete all objects from
  # all S3 buckets and any IAM users created by this module so that everything
  # can be destroyed without error. Warning: these objects are not recoverable
  # so only use this if you're absolutely sure you want to permanently delete
  # everything! This is mostly useful when testing.
  force_destroy = false

  # If set to true, when you run 'terraform destroy', delete all objects from
  # the bucket macie_bucket_name so that the bucket can be destroyed without
  # error. Warning: these objects are not recoverable so only use this if you're
  # absolutely sure you want to permanently delete everything!
  force_destroy_macie_bucket = false

  # When set, use the statically provided hardcoded list of thumbprints rather
  # than looking it up dynamically. This is useful if you want to trade
  # relibaility of the OpenID Connect Provider across certificate renewals with
  # a static list that is obtained using a trustworthy mechanism to mitigate
  # potential damage from a domain hijacking attack on GitHub domains.
  github_actions_openid_connect_provider_thumbprint_list = null

  # Whether to accept an invite from the master account if the detector is not
  # created automatically
  guardduty_accept_invite = false

  # The AWS account ID of the GuardDuty delegated admin/master account
  guardduty_admin_account_id = null

  # Name of the Cloudwatch event rules.
  guardduty_cloudwatch_event_rule_name = "guardduty-finding-events"

  # Map of detector features to enable, where the key is the name of the feature
  # the value is the feature configuration. When AWS Organizations delegated
  # admin account is used, use var.organization_configuration_features in the
  # deledated admin account instead. See
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/guardduty_detector_feature
  guardduty_detector_features = {}

  # Specifies the frequency of notifications sent for subsequent finding
  # occurrences. If the detector is a GuardDuty member account, the value is
  # determined by the GuardDuty master account and cannot be modified, otherwise
  # defaults to SIX_HOURS. For standalone and GuardDuty master accounts, it must
  # be configured in Terraform to enable drift detection. Valid values for
  # standalone and master accounts: FIFTEEN_MINUTES, ONE_HOUR, SIX_HOURS.
  guardduty_finding_publishing_frequency = null

  # If true, an IAM Policy that grants access to the key will be honored. If
  # false, only the ARNs listed in var.kms_key_user_iam_arns will have access to
  # the key and any IAM Policy grants will be ignored. (true or false)
  guardduty_findings_allow_kms_access_with_iam = true

  # The AWS regions that are allowed to write to the GuardDuty findings S3
  # bucket. This is needed to configure the bucket and CMK policy to allow
  # writes from manually-enabled regions. See
  # https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_exportfindings.html#guardduty_exportfindings-s3-policies
  guardduty_findings_allowed_regions = []

  # Whether or not to enable automatic annual rotation of the KMS key. Defaults
  # to true.
  guardduty_findings_enable_key_rotation = true

  # A list of external AWS accounts that should be given write access for
  # GuardDuty findings to this S3 bucket. This is useful when aggregating
  # findings for multiple AWS accounts in one common S3 bucket.
  guardduty_findings_external_aws_account_ids_with_write_access = []

  # If set to true, when you run 'terraform destroy', delete all objects from
  # the bucket so that the bucket can be destroyed without error. Warning: these
  # objects are not recoverable so only use this if you're absolutely sure you
  # want to permanently delete everything!
  guardduty_findings_force_destroy = false

  # All GuardDuty findings will be encrypted with a KMS Key (a Customer Master
  # Key). The IAM Users specified in this list will have rights to change who
  # can access the data.
  guardduty_findings_kms_key_administrator_iam_arns = []

  # If set to true, that means the KMS key you're using already exists, and does
  # not need to be created.
  guardduty_findings_kms_key_already_exists = false

  # The ARN of the KMS key used to encrypt GuardDuty findings. GuardDuty
  # enforces findings to be encrypted. Only used if
  # guardduty_publish_findings_to_s3 is true.
  guardduty_findings_kms_key_arn = null

  # Additional service principals beyond GuardDuty that should have access to
  # the KMS key used to encrypt the logs.
  guardduty_findings_kms_key_service_principals = []

  # All GuardDuty findings will be encrypted with a KMS Key (a Customer Master
  # Key). The IAM Users specified in this list will have read-only access to the
  # data.
  guardduty_findings_kms_key_user_iam_arns = []

  # After this number of days, findings should be transitioned from S3 to
  # Glacier. Enter 0 to never archive findings.
  guardduty_findings_num_days_after_which_archive_findings_data = 30

  # After this number of days, log files should be deleted from S3. Enter 0 to
  # never delete log data.
  guardduty_findings_num_days_after_which_delete_findings_data = 365

  # Additional IAM policies to apply to this S3 bucket. You can use this to
  # grant read/write access. This should be a map, where each key is a unique
  # statement ID (SID), and each value is an object that contains the parameters
  # defined in the comment above.
  guardduty_findings_s3_bucket_additional_policy_statements = {}

  # The S3 bucket ARN to which the findings get exported.
  guardduty_findings_s3_bucket_arn = null

  # The name of the S3 Bucket where GuardDuty findings will be stored.
  guardduty_findings_s3_bucket_name = null

  # Optional prefix directory to create in the bucket. Must contain a trailing
  # '/'. If you use a prefix for S3 findings publishing, you must pre-create the
  # prefix in the findings bucket. See
  # https://github.com/hashicorp/terraform-provider-aws/issues/16750.
  guardduty_findings_s3_bucket_prefix = null

  # Enable MFA delete for either 'Change the versioning state of your bucket' or
  # 'Permanently delete an object version'. This setting only applies to the
  # bucket used to storage GuardDuty findings. This cannot be used to toggle
  # this setting but is available to allow managed buckets to reflect the state
  # in AWS. For instructions on how to enable MFA Delete, check out the README
  # from the terraform-aws-security/private-s3-bucket module.
  guardduty_findings_s3_mfa_delete = false

  # The bucket prefix without trailing '/' under which the findings get
  # exported. The prefix is optional and will be
  # AWSLogs/[Account-ID]/GuardDuty/[Region]/ if not provided.
  guardduty_findings_s3_prefix = null

  # Whether to create a bucket for GuardDuty findings. If set to true, you must
  # provide the var.guardduty_findings_s3_bucket_name.
  guardduty_findings_should_create_bucket = false

  # Specifies a name for the created SNS topics where findings are published.
  # publish_findings_to_sns must be set to true.
  guardduty_findings_sns_topic_name = "guardduty-findings"

  # Tags to apply to the GuardDuty findings resources (S3 bucket and CMK).
  guardduty_findings_tags = {}

  # Publish GuardDuty findings to an S3 bucket.
  guardduty_publish_findings_to_s3 = false

  # Send GuardDuty findings to SNS topics specified by findings_sns_topic_name.
  guardduty_publish_findings_to_sns = false

  # The name of the IAM Access Analyzer module
  iam_access_analyzer_name = "baseline_app-iam_access_analyzer"

  # Password expiration requires administrator reset.
  iam_password_policy_hard_expiry = true

  # The number of days that an user password is valid. Enter 0 for no
  # expiration.
  iam_password_policy_max_password_age = 0

  # Password minimum length. To be compliant with CIS recommendation 1.8, the
  # minimum password length is 14.
  iam_password_policy_minimum_password_length = 14

  # Whether to require lowercase characters for user passwords (true or false).
  iam_password_policy_require_lowercase_characters = true

  # Whether to require numbers for user passwords (true or false).
  iam_password_policy_require_numbers = true

  # Whether to require symbols for user passwords (true or false).
  iam_password_policy_require_symbols = true

  # Whether to require uppercase characters for user passwords (true or false).
  iam_password_policy_require_uppercase_characters = true

  # Include this value as a prefix in the name of every IAM role created by this
  # module. This is useful to prepend, for example, '<account-name>-' to every
  # IAM role name: e.g., allow-full-access-from-other-accounts becomes
  # stage-allow-full-access-from-other-accounts.
  iam_role_name_prefix = ""

  # A map of tags to apply to all KMS Keys to be created. In this map variable,
  # the key is the tag name and the value is the tag value.
  kms_cmk_global_tags = {}

  # You can use this variable to create account-level KMS Customer Master Keys
  # (CMKs) for encrypting and decrypting data. This variable should be a map
  # where the keys are the names of the CMK and the values are an object that
  # defines the configuration for that CMK. See the comment below for the
  # configuration options you can set for each key.
  kms_customer_master_keys = {}

  # The map of names of KMS grants to the region where the key resides in. There
  # should be a one to one mapping between entries in this map and the entries
  # of the kms_grants map. This is used to workaround a terraform limitation
  # where the for_each value can not depend on resources.
  kms_grant_regions = {}

  # Create the specified KMS grants to allow entities to use the KMS key without
  # modifying the KMS policy or IAM. This is necessary to allow AWS services
  # (e.g. ASG) to use CMKs encrypt and decrypt resources. The input is a map of
  # grant name to grant properties. The name must be unique per account.
  kms_grants = {}

  # Specifies the status for the account. To enable Amazon Macie and start all
  # Macie activities for the account, set this value to ENABLED. Valid values
  # are ENABLED or PAUSED.
  macie_account_status = "ENABLED"

  # AWS Account to join this account's Amazon Macie to. Must have already
  # received an invite from this account.
  macie_administrator_account_id = ""

  # The name of the S3 bucket for storing sensitive data discovery results. Only
  # used if create_macie_bucket is true. If omitted, Terraform will assign a
  # random, unique name.
  macie_bucket_name = null

  # S3 buckets that Macie should analyze. This should be a map, where each key
  # is a region, and each value is a list of buckets in that region that should
  # be analyzed. Unfortunately, due to the limitations in the Terraform AWS
  # provider, there is no way to automatically select all buckets in a region,
  # therefore an explicit list of buckets to analyze must be maintained in this
  # variable. For more information, see
  # https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/blob/master/modules/security/macie/core-concepts.md#buckets-to-analyze.
  macie_buckets_to_analyze = {}

  # A map from region to ID (ARN, alias ARN, AWS ID) of a customer managed KMS
  # Key to use for encrypting Macie log data. Only used if
  # var.macie_create_logs_kms_key is set to false.
  macie_cloudwatch_log_group_kms_key_id = null

  # The number of days to retain log events in the log group for Macie. Refer to
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days
  # for all the valid values. When null, the log events are retained forever.
  macie_cloudwatch_log_group_retention_in_days = null

  # Tags to apply on the Macie CloudWatch Log Group, encoded as a map where the
  # keys are tag keys and values are tag values.
  macie_cloudwatch_log_group_tags = null

  # Set to true to create a KMS key to encrypt sensitive data discovery results.
  # NOTE: Whether you choose to create the key yourself, or have it
  # automatically created by Terraform, you will need to manually configure this
  # key to encrypt sensitive data discovery results in AWS Console.
  macie_create_discovery_results_kms_key = false

  # Set to true to create a KMS key to encrypt Macie log entries. If false, log
  # entries will not be encrypted unless a key is provided with
  # var.macie_cloudwatch_log_group_kms_key_id.
  macie_create_logs_kms_key = false

  # The number of days to keep around the KMS Customer managed Key for
  # encrypting sensitive discovery results after it has been marked for
  # deletion.
  macie_discovery_results_kms_key_deletion_window_in_days = 30

  # The name of the KMS key to encrypt sensitive data discovery results.
  # Required if create_kms_key is set to true, otherwise ignored.
  macie_discovery_results_kms_key_name = null

  # A list of IAM user ARNs with access to the KMS key above. Required if
  # create_kms_key is set to true, otherwise ignored.
  macie_discovery_results_kms_key_users = null

  # Map of AWS Accounts to add as members to this account's Amazon Macie
  # configuration. The keys in this map should each be a unique value (e.g., the
  # account name) and the values should be objects that contain the account ID
  # and Email.
  macie_external_member_accounts = {}

  # Specifies how often to publish updates to policy findings for the account.
  # Valid values are FIFTEEN_MINUTES, ONE_HOUR or SIX_HOURS.
  macie_finding_publishing_frequency = "FIFTEEN_MINUTES"

  # A custom name for the job. If omitted, Terraform will assign a random,
  # unique name.
  macie_job_name = null

  # The number of days to keep the KMS Customer managed Key for Macie Los around
  # after it has been marked for deletion.
  macie_logs_kms_key_deletion_window_in_days = 30

  # The name of the KMS key to encrypt Macie logs. Required if
  # macie_create_logs_kms_key is set to true, otherwise ignored.
  macie_logs_kms_key_name = null

  # The primary region where the kms key for encrypting Macie logs should be
  # created. When set, the KMS key will be created in this region and then
  # replicated to all opted in regions. On the other hand, when null, a
  # different KMS key will be created in all opted in regions.
  macie_logs_kms_key_primary_region = null

  # A list of IAM user ARNs with access to the KMS key above. Required if
  # macie_create_logs_kms_key is set to true, otherwise ignored.
  macie_logs_kms_key_users = null

  # When true, precreate the CloudWatch Log Group to use for the Macie Data
  # Discovery job. This is useful if you wish to customize the CloudWatch Log
  # Group with various settings such as retention periods and KMS encryption.
  # When false, AWS Macie will automatically create a basic log group to use.
  macie_should_create_cloudwatch_log_group = true

  # The maximum allowable session duration, in seconds, for the credentials you
  # get when assuming the IAM roles created by this module. This variable
  # applies to all IAM roles created by this module that are intended for people
  # to use, such as allow-read-only-access-from-other-accounts. For IAM roles
  # that are intended for machine users, such as
  # allow-auto-deploy-from-other-accounts, see
  # var.max_session_duration_machine_users.
  max_session_duration_human_users = 43200

  # The maximum allowable session duration, in seconds, for the credentials you
  # get when assuming the IAM roles created by this module. This variable 
  # applies to all IAM roles created by this module that are intended for
  # machine users, such as allow-auto-deploy-from-other-accounts. For IAM roles
  # that are intended for human users, such as
  # allow-read-only-access-from-other-accounts, see
  # var.max_session_duration_human_users.
  max_session_duration_machine_users = 3600

  # The amount of reserved concurrent executions for this lambda function or -1
  # if unreserved. Note that this defaults to 1 to ensure that we only have one
  # instance of this process running at a time. Since the process depends on
  # querying expired IAM certificates, it can lead to errors if more than one of
  # these are running at a time.
  reserved_concurrent_executions = 1

  # The AWS region (e.g., us-east-1) where all the findings will be aggregated.
  # If null, no region will be designated as an aggregate region and findings
  # will only be visible to the region where it was reported. NOTE: this can
  # only be implemented on the SecurityHub administrator account.
  security_hub_aggregate_region = null

  # AWS Account to join this account's Security Hub to. Must have already
  # received an invite from the another account. If SecurityHub is being
  # centralized in the current AWS account, use
  # var.security_hub_external_member_accounts instead.
  security_hub_associate_to_admin_account_id = ""

  # When true, enable the CIS benchmark v1.4 ruleset for automatic checks in
  # SecurityHub. Set this to false if you are using Steampipe instead.
  security_hub_enable_cis_1_4_check = true

  # When true, enable the CIS benchmark v1.2 ruleset for automatic checks in
  # SecurityHub. If you also want to disable the CIS benchmark v1.4 check, then
  # var.security_hub_enable_cis_1_4_check should also be set to false. Set this
  # to false if you are using Steampipe instead.
  security_hub_enable_cis_check = true

  # Map of AWS Accounts to add as members to this account's SecurityHub
  # configuration. The keys in this map should each be a unique value (e.g., the
  # account name) and the values should be objects that contain the account ID
  # and Email to contact about security issues in the account. This variable is
  # used when Security Hub is being centralized in the current AWS account (e.g.
  # a logs account). If it's centralized elsewhere,
  # var.security_hub_associate_to_admin_account_id should be used instead.
  security_hub_external_member_accounts = {}

  # Adjust the logging level of the script to sync SecurityHub member accounts.
  # Valid values: debug, info, warn, error
  security_hub_loglevel = "info"

  # List of product integration IDs to enable on SecurityHub. Refer to
  # https://www.terraform.io/docs/providers/aws/r/securityhub_product_subscription.html#argument-reference
  # for valid values.
  security_hub_product_integrations = []

  # Create service-linked roles for this set of services. You should pass in the
  # URLs of the services, but without the protocol (e.g., http://) in front:
  # e.g., use elasticbeanstalk.amazonaws.com for Elastic Beanstalk or
  # es.amazonaws.com for Amazon Elasticsearch. Service-linked roles are
  # predefined by the service, can typically only be assumed by that service,
  # and include all the permissions that the service requires to call other AWS
  # services on your behalf. You can typically only create one such role per AWS
  # account, which is why this parameter exists in the account baseline. See
  # https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_aws-services-that-work-with-iam.html
  # for the list of services that support service-linked roles.
  service_linked_roles = []

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

<HclListItem name="aws_region" requirement="required" type="string">
<HclListItemDescription>

The AWS Region to use as the global config recorder.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ebs_opt_in_regions" requirement="required" type="list(string)">
<HclListItemDescription>

Creates resources in the specified regions. The best practice is to enable EBS Encryption in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions.

</HclListItemDescription>
</HclListItem>

<HclListItem name="guardduty_opt_in_regions" requirement="required" type="list(string)">
<HclListItemDescription>

Creates resources in the specified regions. The best practice is to enable GuardDuty in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions.

</HclListItemDescription>
</HclListItem>

<HclListItem name="iam_access_analyzer_opt_in_regions" requirement="required" type="list(string)">
<HclListItemDescription>

Creates resources in the specified regions. The best practice is to enable IAM Access Analyzer in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions.

</HclListItemDescription>
</HclListItem>

<HclListItem name="kms_cmk_opt_in_regions" requirement="required" type="list(string)">
<HclListItemDescription>

Creates resources in the specified regions. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions.

</HclListItemDescription>
</HclListItem>

<HclListItem name="macie_opt_in_regions" requirement="required" type="list(string)">
<HclListItemDescription>

Creates resources in the specified regions. The best practice is to enable Amazon Macie in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions.

</HclListItemDescription>
</HclListItem>

<HclListItem name="name_prefix" requirement="required" type="string">
<HclListItemDescription>

The name used to prefix AWS Config and Cloudtrail resources, including the S3 bucket names and SNS topics used for each.

</HclListItemDescription>
</HclListItem>

<HclListItem name="security_hub_opt_in_regions" requirement="required" type="list(string)">
<HclListItemDescription>

Creates resources in the specified regions. The best practice is to enable AWS Security Hub in all enabled regions in your AWS account. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="allow_auto_deploy_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed to assume the auto deploy IAM role that has the permissions in <a href="#auto_deploy_permissions"><code>auto_deploy_permissions</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_billing_access_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed full (read and write) access to the billing info for this account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_dev_access_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed full (read and write) access to the services in this account specified in <a href="#dev_permitted_services"><code>dev_permitted_services</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_full_access_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed full (read and write) access to this account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_logs_access_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed read access to the logs in CloudTrail, AWS Config, and CloudWatch in this account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_read_only_access_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed read-only access to this account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
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

<HclListItem name="auto_deploy_permissions" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM permissions (e.g. ec2:*) that will be added to an IAM Group for doing automated deployments. NOTE: If <a href="#should_create_iam_group_auto_deploy"><code>should_create_iam_group_auto_deploy</code></a> is true, the list must have at least one element (e.g. '*').

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cleanup_expired_certs_lambda_namespace" requirement="optional" type="string">
<HclListItemDescription>

Namespace all Lambda resources created by this module with this name.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;cleanup-expired-iam-certs&quot;"/>
</HclListItem>

<HclListItem name="cleanup_expired_certs_report_cloudwatch_metric" requirement="optional" type="bool">
<HclListItemDescription>

If set true, just before the Lambda function finishes running, it will report a custom metric to CloudWatch, as specified by <a href="#report_cloudwatch_metric_namespace"><code>report_cloudwatch_metric_namespace</code></a> and <a href="#report_cloudwatch_metric_name"><code>report_cloudwatch_metric_name</code></a>. You can set an alarm on this metric to detect if the Lambda job deleted any certificates. Note: you must also set <a href="#report_cloudwatch_metric_namespace"><code>report_cloudwatch_metric_namespace</code></a> and <a href="#report_cloudwatch_metric_name"><code>report_cloudwatch_metric_name</code></a> if this variable is set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="cleanup_expired_certs_report_cloudwatch_metric_name" requirement="optional" type="string">
<HclListItemDescription>

The name to use for the custom CloudWatch metric. Only used if <a href="#report_cloudwatch_metric"><code>report_cloudwatch_metric</code></a> is set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;cleanup-expired-iam-certs-count&quot;"/>
</HclListItem>

<HclListItem name="cleanup_expired_certs_report_cloudwatch_metric_namespace" requirement="optional" type="string">
<HclListItemDescription>

The namespace to use for the custom CloudWatch metric. Only used if <a href="#report_cloudwatch_metric"><code>report_cloudwatch_metric</code></a> is set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;custom/cis&quot;"/>
</HclListItem>

<HclListItem name="cleanup_expired_certs_schedule_expression" requirement="optional" type="string">
<HclListItemDescription>

An expression that defines how often to run the Lambda function to clean up expired IAM certs. For example, cron(0 20 * * ? *) or rate(5 minutes).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;rate(1 hour)&quot;"/>
</HclListItem>

<HclListItem name="cloudtrail_s3_bucket_already_exists" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to create an S3 bucket of name <a href="#cloudtrail_s3_bucket_name"><code>cloudtrail_s3_bucket_name</code></a> in this account for storing CloudTrail logs (e.g., if this is the logs account). Set to true to assume the bucket specified in <a href="#cloudtrail_s3_bucket_name"><code>cloudtrail_s3_bucket_name</code></a> already exists in another AWS account (e.g., if this is the stage or prod account and <a href="#cloudtrail_s3_bucket_name"><code>cloudtrail_s3_bucket_name</code></a> is the name of a bucket in the logs account).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="config_should_create_s3_bucket" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to create an S3 bucket of name <a href="#config_s3_bucket_name"><code>config_s3_bucket_name</code></a> in this account for storing AWS Config data (e.g., if this is the logs account). Set to false to assume the bucket specified in <a href="#config_s3_bucket_name"><code>config_s3_bucket_name</code></a> already exists in another AWS account (e.g., if this is the stage or prod account and <a href="#config_s3_bucket_name"><code>config_s3_bucket_name</code></a> is the name of a bucket in the logs account).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="control_tower_management_account_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the your management (root) AWS account where Control Tower is enabled. Only used if create_control_tower_execution_role is set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="create_control_tower_execution_role" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to create the Control Tower Execution IAM role. This role gives Control Tower permissions to manage this account. If you create an account using Control Tower, it will create this role automatically, but if you are enrolling an existing account in Control Tower, you MUST set this variable to true to create this IAM role. If set to true, you MUST also set the control_tower_management_account_id input variable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="create_macie_bucket" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to create an S3 bucket of name macie_bucket_name for storing sensitive data discovery results. Set to false to assume the bucket already exists. NOTE: Whether you choose to create the bucket yourself, or have it automatically created by Terraform, you will need to manually configure this bucket to store sensitive data discovery results in AWS Console.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="cross_account_iam_role_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the IAM roles.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="dev_permitted_services" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of AWS services for which the developers from the accounts in <a href="#allow_dev_access_from_other_account_arns"><code>allow_dev_access_from_other_account_arns</code></a> will receive full permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to grant developers access only to EC2 and Amazon Machine Learning, use the value ['ec2','machinelearning']. Do NOT add iam to the list of services, or that will grant Developers de facto admin access.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ebs_kms_key_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the KMS CMK to use by default for encrypting EBS volumes, if <a href="#enable_encryption"><code>enable_encryption</code></a> and <a href="#use_existing_kms_keys"><code>use_existing_kms_keys</code></a> are enabled. The name must match the name given the <a href="#kms_customer_master_keys"><code>kms_customer_master_keys</code></a> variable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="ebs_use_existing_kms_keys" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, the KMS Customer Managed Keys (CMK) with the name in <a href="#ebs_kms_key_name"><code>ebs_kms_key_name</code></a> will be set as the default for EBS encryption. When false (default), the AWS-managed aws/ebs key will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_encrypted_volumes" requirement="optional" type="bool">
<HclListItemDescription>

When true, enable the Encrypted Volumes check in AWS Config. This check identifies EBS volumes that are not encrypted. This check is useful for identifying and encrypting EBS volumes, which can help reduce the risk of unauthorized access to your AWS resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_github_actions_access" requirement="optional" type="bool">
<HclListItemDescription>

When true, create an Open ID Connect Provider that GitHub actions can use to assume IAM roles in the account. Refer to https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services for more information.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_iam_password_policy" requirement="optional" type="bool">
<HclListItemDescription>

When true, enable the IAM Password Policy check in AWS Config. This check identifies IAM users whose password policy does not meet the specified requirements. This check is useful for identifying and enforcing a password policy for IAM users, which can help reduce the risk of unauthorized access to your AWS resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_iam_user_unused_credentials_check" requirement="optional" type="bool">
<HclListItemDescription>

When true, enable the IAM User Unused Credentials check in AWS Config. This check identifies IAM users who have not used their credentials for a specified number of days. This check is useful for identifying and removing unused IAM users, which can help reduce the risk of unauthorized access to your AWS resources. Note that this is required for the `revoke_unused_iam_credentials` module, which is provisioned here and is the only reason this is set to true. The current recommended way to handle propagating Config rules in AWS is to use Control Tower Controls.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_insecure_sg_rules" requirement="optional" type="bool">
<HclListItemDescription>

When true, enable the Insecure Security Group Rules check in AWS Config. This check identifies security groups that allow unrestricted inbound traffic. This check is useful for identifying and removing insecure security group rules, which can help reduce the risk of unauthorized access to your AWS resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_rds_storage_encrypted" requirement="optional" type="bool">
<HclListItemDescription>

When true, enable the RDS Storage Encrypted check in AWS Config. This check identifies RDS instances that are not encrypted. This check is useful for identifying and encrypting RDS instances, which can help reduce the risk of unauthorized access to your AWS resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_root_account_mfa" requirement="optional" type="bool">
<HclListItemDescription>

When true, enable the Root Account MFA check in AWS Config. This check identifies the AWS account root user that does not have multi-factor authentication (MFA) enabled. This check is useful for identifying and enabling MFA for the root account, which can help reduce the risk of unauthorized access to your AWS resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_s3_bucket_public_read_prohibited" requirement="optional" type="bool">
<HclListItemDescription>

When true, enable the S3 Bucket Public Read Prohibited check in AWS Config. This check identifies S3 buckets that allow public read access. This check is useful for identifying and removing public read access from S3 buckets, which can help reduce the risk of unauthorized access to your AWS resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_s3_bucket_public_write_prohibited" requirement="optional" type="bool">
<HclListItemDescription>

When true, enable the S3 Bucket Public Write Prohibited check in AWS Config. This check identifies S3 buckets that allow public write access. This check is useful for identifying and removing public write access from S3 buckets, which can help reduce the risk of unauthorized access to your AWS resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_security_hub" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to disable Security Hub in the account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="force_destroy" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, when you run 'terraform destroy', delete all objects from all S3 buckets and any IAM users created by this module so that everything can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything! This is mostly useful when testing.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="force_destroy_macie_bucket" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, when you run 'terraform destroy', delete all objects from the bucket macie_bucket_name so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="github_actions_openid_connect_provider_thumbprint_list" requirement="optional" type="list(string)">
<HclListItemDescription>

When set, use the statically provided hardcoded list of thumbprints rather than looking it up dynamically. This is useful if you want to trade relibaility of the OpenID Connect Provider across certificate renewals with a static list that is obtained using a trustworthy mechanism to mitigate potential damage from a domain hijacking attack on GitHub domains.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="guardduty_accept_invite" requirement="optional" type="bool">
<HclListItemDescription>

Whether to accept an invite from the master account if the detector is not created automatically

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="guardduty_admin_account_id" requirement="optional" type="string">
<HclListItemDescription>

The AWS account ID of the GuardDuty delegated admin/master account

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="guardduty_cloudwatch_event_rule_name" requirement="optional" type="string">
<HclListItemDescription>

Name of the Cloudwatch event rules.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;guardduty-finding-events&quot;"/>
</HclListItem>

<HclListItem name="guardduty_detector_features" requirement="optional" type="map(object(…))">
<HclListItemDescription>

Map of detector features to enable, where the key is the name of the feature the value is the feature configuration. When AWS Organizations delegated admin account is used, use <a href="#organization_configuration_features"><code>organization_configuration_features</code></a> in the deledated admin account instead. See https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/guardduty_detector_feature

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    status = string
    additional_configuration = list(object({
      name   = string
      status = string
    }))
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="guardduty_finding_publishing_frequency" requirement="optional" type="string">
<HclListItemDescription>

Specifies the frequency of notifications sent for subsequent finding occurrences. If the detector is a GuardDuty member account, the value is determined by the GuardDuty master account and cannot be modified, otherwise defaults to SIX_HOURS. For standalone and GuardDuty master accounts, it must be configured in Terraform to enable drift detection. Valid values for standalone and master accounts: FIFTEEN_MINUTES, ONE_HOUR, SIX_HOURS.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="guardduty_findings_allow_kms_access_with_iam" requirement="optional" type="bool">
<HclListItemDescription>

If true, an IAM Policy that grants access to the key will be honored. If false, only the ARNs listed in <a href="#kms_key_user_iam_arns"><code>kms_key_user_iam_arns</code></a> will have access to the key and any IAM Policy grants will be ignored. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="guardduty_findings_allowed_regions" requirement="optional" type="list(string)">
<HclListItemDescription>

The AWS regions that are allowed to write to the GuardDuty findings S3 bucket. This is needed to configure the bucket and CMK policy to allow writes from manually-enabled regions. See https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_exportfindings.html#guardduty_exportfindings-s3-policies

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="guardduty_findings_enable_key_rotation" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to enable automatic annual rotation of the KMS key. Defaults to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="guardduty_findings_external_aws_account_ids_with_write_access" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of external AWS accounts that should be given write access for GuardDuty findings to this S3 bucket. This is useful when aggregating findings for multiple AWS accounts in one common S3 bucket.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="guardduty_findings_force_destroy" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, when you run 'terraform destroy', delete all objects from the bucket so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="guardduty_findings_kms_key_administrator_iam_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

All GuardDuty findings will be encrypted with a KMS Key (a Customer Master Key). The IAM Users specified in this list will have rights to change who can access the data.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="guardduty_findings_kms_key_already_exists" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, that means the KMS key you're using already exists, and does not need to be created.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="guardduty_findings_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the KMS key used to encrypt GuardDuty findings. GuardDuty enforces findings to be encrypted. Only used if guardduty_publish_findings_to_s3 is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="guardduty_findings_kms_key_service_principals" requirement="optional" type="list(object(…))">
<HclListItemDescription>

Additional service principals beyond GuardDuty that should have access to the KMS key used to encrypt the logs.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    # The name of the service principal (e.g.: s3.amazonaws.com).
    name = string

    # The list of actions that the given service principal is allowed to perform (e.g. ["kms:DescribeKey",
    # "kms:GenerateDataKey"]).
    actions = list(string)

    # List of additional service principals. Useful when, for example, granting
    # access to opt-in region service endpoints (e.g. guardduty.us-east-1.amazonaws.com).
    additional_principals = list(string)

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

     List of additional service principals. Useful when, for example, granting
     access to opt-in region service endpoints (e.g. guardduty.us-east-1.amazonaws.com).

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

<HclListItem name="guardduty_findings_kms_key_user_iam_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

All GuardDuty findings will be encrypted with a KMS Key (a Customer Master Key). The IAM Users specified in this list will have read-only access to the data.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="guardduty_findings_num_days_after_which_archive_findings_data" requirement="optional" type="number">
<HclListItemDescription>

After this number of days, findings should be transitioned from S3 to Glacier. Enter 0 to never archive findings.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="guardduty_findings_num_days_after_which_delete_findings_data" requirement="optional" type="number">
<HclListItemDescription>

After this number of days, log files should be deleted from S3. Enter 0 to never delete log data.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="365"/>
</HclListItem>

<HclListItem name="guardduty_findings_s3_bucket_additional_policy_statements" requirement="optional" type="any">
<HclListItemDescription>

Additional IAM policies to apply to this S3 bucket. You can use this to grant read/write access. This should be a map, where each key is a unique statement ID (SID), and each value is an object that contains the parameters defined in the comment above.

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

   Ideally, this would be a map(object({...})), but the Terraform object type constraint doesn't support optional
   parameters, whereas IAM policy statements have many optional params. And we can't even use map(any), as the
   Terraform map type constraint requires all values to have the same type ("shape"), but as each object in the map
   may specify different optional params, this won't work either. So, sadly, we are forced to fall back to "any."

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="guardduty_findings_s3_bucket_arn" requirement="optional" type="string">
<HclListItemDescription>

The S3 bucket ARN to which the findings get exported.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="guardduty_findings_s3_bucket_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the S3 Bucket where GuardDuty findings will be stored.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="guardduty_findings_s3_bucket_prefix" requirement="optional" type="string">
<HclListItemDescription>

Optional prefix directory to create in the bucket. Must contain a trailing '/'. If you use a prefix for S3 findings publishing, you must pre-create the prefix in the findings bucket. See https://github.com/hashicorp/terraform-provider-aws/issues/16750.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="guardduty_findings_s3_mfa_delete" requirement="optional" type="bool">
<HclListItemDescription>

Enable MFA delete for either 'Change the versioning state of your bucket' or 'Permanently delete an object version'. This setting only applies to the bucket used to storage GuardDuty findings. This cannot be used to toggle this setting but is available to allow managed buckets to reflect the state in AWS. For instructions on how to enable MFA Delete, check out the README from the terraform-aws-security/private-s3-bucket module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="guardduty_findings_s3_prefix" requirement="optional" type="string">
<HclListItemDescription>

The bucket prefix without trailing '/' under which the findings get exported. The prefix is optional and will be AWSLogs/[Account-ID]/GuardDuty/[Region]/ if not provided.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="guardduty_findings_should_create_bucket" requirement="optional" type="bool">
<HclListItemDescription>

Whether to create a bucket for GuardDuty findings. If set to true, you must provide the <a href="#guardduty_findings_s3_bucket_name"><code>guardduty_findings_s3_bucket_name</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="guardduty_findings_sns_topic_name" requirement="optional" type="string">
<HclListItemDescription>

Specifies a name for the created SNS topics where findings are published. publish_findings_to_sns must be set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;guardduty-findings&quot;"/>
</HclListItem>

<HclListItem name="guardduty_findings_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags to apply to the GuardDuty findings resources (S3 bucket and CMK).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="guardduty_publish_findings_to_s3" requirement="optional" type="bool">
<HclListItemDescription>

Publish GuardDuty findings to an S3 bucket.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
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
<HclListItemDefaultValue defaultValue="&quot;baseline_app-iam_access_analyzer&quot;"/>
</HclListItem>

<HclListItem name="iam_password_policy_hard_expiry" requirement="optional" type="bool">
<HclListItemDescription>

Password expiration requires administrator reset.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="iam_password_policy_max_password_age" requirement="optional" type="number">
<HclListItemDescription>

The number of days that an user password is valid. Enter 0 for no expiration.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="iam_password_policy_minimum_password_length" requirement="optional" type="number">
<HclListItemDescription>

Password minimum length. To be compliant with CIS recommendation 1.8, the minimum password length is 14.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="14"/>
</HclListItem>

<HclListItem name="iam_password_policy_require_lowercase_characters" requirement="optional" type="bool">
<HclListItemDescription>

Whether to require lowercase characters for user passwords (true or false).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="iam_password_policy_require_numbers" requirement="optional" type="bool">
<HclListItemDescription>

Whether to require numbers for user passwords (true or false).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="iam_password_policy_require_symbols" requirement="optional" type="bool">
<HclListItemDescription>

Whether to require symbols for user passwords (true or false).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="iam_password_policy_require_uppercase_characters" requirement="optional" type="bool">
<HclListItemDescription>

Whether to require uppercase characters for user passwords (true or false).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="iam_role_name_prefix" requirement="optional" type="string">
<HclListItemDescription>

Include this value as a prefix in the name of every IAM role created by this module. This is useful to prepend, for example, '&lt;account-name>-' to every IAM role name: e.g., allow-full-access-from-other-accounts becomes stage-allow-full-access-from-other-accounts.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="kms_cmk_global_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to all KMS Keys to be created. In this map variable, the key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="kms_customer_master_keys" requirement="optional" type="any">
<HclListItemDescription>

You can use this variable to create account-level KMS Customer Master Keys (CMKs) for encrypting and decrypting data. This variable should be a map where the keys are the names of the CMK and the values are an object that defines the configuration for that CMK. See the comment below for the configuration options you can set for each key.

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

   Each entry in the map supports the following attributes:
  
   OPTIONAL (defaults to value of corresponding module input):
   - cmk_administrator_iam_arns            [list(string)] : A list of IAM ARNs for users who should be given
                                                            administrator access to this CMK (e.g.
                                                            arn:aws:iam::<aws-account-id>:user/<iam-user-arn>).
   - cmk_user_iam_arns                     [list(string)] : A list of IAM ARNs for users who should be given
                                                            permissions to use this CMK (e.g.
                                                            arn:aws:iam::<aws-account-id>:user/<iam-user-arn>).
   - cmk_read_only_user_iam_arns           [list(object[CMKUser])] : A list of IAM ARNs for users who should be given
                                                            read-only (decrypt-only) permissions to use this CMK (e.g.
                                                            arn:aws:iam::<aws-account-id>:user/<iam-user-arn>).
   - cmk_external_user_iam_arns            [list(string)] : A list of IAM ARNs for users from external AWS accounts
                                                            who should be given permissions to use this CMK (e.g.
                                                            arn:aws:iam::<aws-account-id>:root).
   - cmk_service_principals                [list(object[ServicePrincipal])] : A list of Service Principals that should be given
                                                            permissions to use this CMK (e.g. s3.amazonaws.com). See
                                                            below for the structure of the object that should be passed
                                                            in.
  
   - allow_manage_key_permissions_with_iam [bool]         : If true, both the CMK's Key Policy and IAM Policies
                                                            (permissions) can be used to grant permissions on the CMK.
                                                            If false, only the CMK's Key Policy can be used to grant
                                                            permissions on the CMK. False is more secure (and
                                                            generally preferred), but true is more flexible and
                                                            convenient.
   - region                  [string]      : The region (e.g., us-west-2) where the key should be created. If null or
                                             omitted, the key will be created in all enabled regions. Any keys
                                             targeting an opted out region or invalid region string will show up in the
                                             invalid_cmk_inputs output.
   - deletion_window_in_days [number]      : The number of days to keep this KMS Master Key around after it has been
                                             marked for deletion.
   - tags                    [map(string)] : A map of tags to apply to the KMS Key to be created. In this map
                                             variable, the key is the tag name and the value  is the tag value. Note
                                             that this map is merged with var.global_tags, and can be used to override
                                             tags specified in that variable.
   - enable_key_rotation     [bool]        : Whether or not to enable automatic annual rotation of the KMS key.
   - spec                    [string]      : Specifies whether the key contains a symmetric key or an asymmetric key
                                             pair and the encryption algorithms or signing algorithms that the key
                                             supports. Valid values: SYMMETRIC_DEFAULT, RSA_2048, RSA_3072, RSA_4096,
                                             ECC_NIST_P256, ECC_NIST_P384, ECC_NIST_P521, or ECC_SECG_P256K1.
   Structure of ServicePrincipal object:
   - name          [string]                   : The name of the service principal (e.g.: s3.amazonaws.com).
   - actions       [list(string)]             : The list of actions that the given service principal is allowed to
                                                perform (e.g. ["kms:DescribeKey", "kms:GenerateDataKey"]).
   - conditions    [list(object[Condition])]  : (Optional) List of conditions to apply to the permissions for the service
                                                principal. Use this to apply conditions on the permissions for
                                                accessing the KMS key (e.g., only allow access for certain encryption
                                                contexts). The condition object accepts the same fields as the condition
                                                block on the IAM policy document (See
                                                https://www.terraform.io/docs/providers/aws/d/iam_policy_document.htmlcondition).
  
  
   Example:
   customer_master_keys = {
     cmk-stage = {
       region                                = "us-west-1"
       cmk_administrator_iam_arns            = ["arn:aws:iam::0000000000:user/admin"]
       cmk_user_iam_arns                     = ["arn:aws:iam::0000000000:user/dev"]
       cmk_read_only_user_iam_arns           = [
         {
           name = ["arn:aws:iam::0000000000:user/qa"]
           conditions = []
         }
       ]
       cmk_external_user_iam_arns            = ["arn:aws:iam::1111111111:user/root"]
       cmk_service_principals                = [
         {
           name       = "s3.amazonaws.com"
           actions    = ["kms:Encrypt"]
           conditions = []
         }
       ]
     }
     cmk-prod = {
       region                                = "us-west-1"
       cmk_administrator_iam_arns            = ["arn:aws:iam::0000000000:user/admin"]
       cmk_user_iam_arns                     = ["arn:aws:iam::0000000000:user/dev"]
       allow_manage_key_permissions_with_iam = true
        Override the default value for all keys configured with var.default_deletion_window_in_days
       deletion_window_in_days = 7
  
        Set extra tags on the CMK for prod
       tags = {
         Environment = "prod"
       }
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="kms_grant_regions" requirement="optional" type="map(string)">
<HclListItemDescription>

The map of names of KMS grants to the region where the key resides in. There should be a one to one mapping between entries in this map and the entries of the kms_grants map. This is used to workaround a terraform limitation where the for_each value can not depend on resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="kms_grants" requirement="optional" type="map(object(…))">
<HclListItemDescription>

Create the specified KMS grants to allow entities to use the KMS key without modifying the KMS policy or IAM. This is necessary to allow AWS services (e.g. ASG) to use CMKs encrypt and decrypt resources. The input is a map of grant name to grant properties. The name must be unique per account.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
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
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

     The principal that is given permission to perform the operations that the grant permits. This must be in ARN
     format. For example, the grantee principal for ASG is:
     arn:aws:iam::111122223333:role/aws-service-role/autoscaling.amazonaws.com/AWSServiceRoleForAutoScaling

```
</details>

<details>


```hcl

     A list of operations that the grant permits. The permitted values are:
     Decrypt, Encrypt, GenerateDataKey, GenerateDataKeyWithoutPlaintext, ReEncryptFrom, ReEncryptTo, CreateGrant,
     RetireGrant, DescribeKey

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="macie_account_status" requirement="optional" type="string">
<HclListItemDescription>

Specifies the status for the account. To enable Amazon Macie and start all Macie activities for the account, set this value to ENABLED. Valid values are ENABLED or PAUSED.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ENABLED&quot;"/>
</HclListItem>

<HclListItem name="macie_administrator_account_id" requirement="optional" type="string">
<HclListItemDescription>

AWS Account to join this account's Amazon Macie to. Must have already received an invite from this account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="macie_bucket_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the S3 bucket for storing sensitive data discovery results. Only used if create_macie_bucket is true. If omitted, Terraform will assign a random, unique name.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="macie_buckets_to_analyze" requirement="optional" type="map(list(…))">
<HclListItemDescription>

S3 buckets that Macie should analyze. This should be a map, where each key is a region, and each value is a list of buckets in that region that should be analyzed. Unfortunately, due to the limitations in the Terraform AWS provider, there is no way to automatically select all buckets in a region, therefore an explicit list of buckets to analyze must be maintained in this variable. For more information, see https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/blob/master/modules/security/macie/core-concepts.md#buckets-to-analyze.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(list(string))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="macie_cloudwatch_log_group_kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

A map from region to ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for encrypting Macie log data. Only used if <a href="#macie_create_logs_kms_key"><code>macie_create_logs_kms_key</code></a> is set to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="macie_cloudwatch_log_group_retention_in_days" requirement="optional" type="number">
<HclListItemDescription>

The number of days to retain log events in the log group for Macie. Refer to https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days for all the valid values. When null, the log events are retained forever.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="macie_cloudwatch_log_group_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags to apply on the Macie CloudWatch Log Group, encoded as a map where the keys are tag keys and values are tag values.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="macie_create_discovery_results_kms_key" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to create a KMS key to encrypt sensitive data discovery results. NOTE: Whether you choose to create the key yourself, or have it automatically created by Terraform, you will need to manually configure this key to encrypt sensitive data discovery results in AWS Console.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="macie_create_logs_kms_key" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to create a KMS key to encrypt Macie log entries. If false, log entries will not be encrypted unless a key is provided with <a href="#macie_cloudwatch_log_group_kms_key_id"><code>macie_cloudwatch_log_group_kms_key_id</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="macie_discovery_results_kms_key_deletion_window_in_days" requirement="optional" type="number">
<HclListItemDescription>

The number of days to keep around the KMS Customer managed Key for encrypting sensitive discovery results after it has been marked for deletion.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="macie_discovery_results_kms_key_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the KMS key to encrypt sensitive data discovery results. Required if create_kms_key is set to true, otherwise ignored.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="macie_discovery_results_kms_key_users" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM user ARNs with access to the KMS key above. Required if create_kms_key is set to true, otherwise ignored.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="macie_external_member_accounts" requirement="optional" type="map(object(…))">
<HclListItemDescription>

Map of AWS Accounts to add as members to this account's Amazon Macie configuration. The keys in this map should each be a unique value (e.g., the account name) and the values should be objects that contain the account ID and Email.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    account_id = string
    email      = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="macie_finding_publishing_frequency" requirement="optional" type="string">
<HclListItemDescription>

Specifies how often to publish updates to policy findings for the account. Valid values are FIFTEEN_MINUTES, ONE_HOUR or SIX_HOURS.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;FIFTEEN_MINUTES&quot;"/>
</HclListItem>

<HclListItem name="macie_job_name" requirement="optional" type="string">
<HclListItemDescription>

A custom name for the job. If omitted, Terraform will assign a random, unique name.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="macie_logs_kms_key_deletion_window_in_days" requirement="optional" type="number">
<HclListItemDescription>

The number of days to keep the KMS Customer managed Key for Macie Los around after it has been marked for deletion.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="macie_logs_kms_key_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the KMS key to encrypt Macie logs. Required if macie_create_logs_kms_key is set to true, otherwise ignored.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="macie_logs_kms_key_primary_region" requirement="optional" type="string">
<HclListItemDescription>

The primary region where the kms key for encrypting Macie logs should be created. When set, the KMS key will be created in this region and then replicated to all opted in regions. On the other hand, when null, a different KMS key will be created in all opted in regions.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="macie_logs_kms_key_users" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM user ARNs with access to the KMS key above. Required if macie_create_logs_kms_key is set to true, otherwise ignored.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="macie_should_create_cloudwatch_log_group" requirement="optional" type="bool">
<HclListItemDescription>

When true, precreate the CloudWatch Log Group to use for the Macie Data Discovery job. This is useful if you wish to customize the CloudWatch Log Group with various settings such as retention periods and KMS encryption. When false, AWS Macie will automatically create a basic log group to use.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="max_session_duration_human_users" requirement="optional" type="number">
<HclListItemDescription>

The maximum allowable session duration, in seconds, for the credentials you get when assuming the IAM roles created by this module. This variable applies to all IAM roles created by this module that are intended for people to use, such as allow-read-only-access-from-other-accounts. For IAM roles that are intended for machine users, such as allow-auto-deploy-from-other-accounts, see <a href="#max_session_duration_machine_users"><code>max_session_duration_machine_users</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="43200"/>
</HclListItem>

<HclListItem name="max_session_duration_machine_users" requirement="optional" type="number">
<HclListItemDescription>

The maximum allowable session duration, in seconds, for the credentials you get when assuming the IAM roles created by this module. This variable  applies to all IAM roles created by this module that are intended for machine users, such as allow-auto-deploy-from-other-accounts. For IAM roles that are intended for human users, such as allow-read-only-access-from-other-accounts, see <a href="#max_session_duration_human_users"><code>max_session_duration_human_users</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="3600"/>
</HclListItem>

<HclListItem name="reserved_concurrent_executions" requirement="optional" type="number">
<HclListItemDescription>

The amount of reserved concurrent executions for this lambda function or -1 if unreserved. Note that this defaults to 1 to ensure that we only have one instance of this process running at a time. Since the process depends on querying expired IAM certificates, it can lead to errors if more than one of these are running at a time.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="security_hub_aggregate_region" requirement="optional" type="string">
<HclListItemDescription>

The AWS region (e.g., us-east-1) where all the findings will be aggregated. If null, no region will be designated as an aggregate region and findings will only be visible to the region where it was reported. NOTE: this can only be implemented on the SecurityHub administrator account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="security_hub_associate_to_admin_account_id" requirement="optional" type="string">
<HclListItemDescription>

AWS Account to join this account's Security Hub to. Must have already received an invite from the another account. If SecurityHub is being centralized in the current AWS account, use <a href="#security_hub_external_member_accounts"><code>security_hub_external_member_accounts</code></a> instead.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="security_hub_enable_cis_1_4_check" requirement="optional" type="bool">
<HclListItemDescription>

When true, enable the CIS benchmark v1.4 ruleset for automatic checks in SecurityHub. Set this to false if you are using Steampipe instead.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="security_hub_enable_cis_check" requirement="optional" type="bool">
<HclListItemDescription>

When true, enable the CIS benchmark v1.2 ruleset for automatic checks in SecurityHub. If you also want to disable the CIS benchmark v1.4 check, then <a href="#security_hub_enable_cis_1_4_check"><code>security_hub_enable_cis_1_4_check</code></a> should also be set to false. Set this to false if you are using Steampipe instead.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="security_hub_external_member_accounts" requirement="optional" type="map(object(…))">
<HclListItemDescription>

Map of AWS Accounts to add as members to this account's SecurityHub configuration. The keys in this map should each be a unique value (e.g., the account name) and the values should be objects that contain the account ID and Email to contact about security issues in the account. This variable is used when Security Hub is being centralized in the current AWS account (e.g. a logs account). If it's centralized elsewhere, <a href="#security_hub_associate_to_admin_account_id"><code>security_hub_associate_to_admin_account_id</code></a> should be used instead.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    account_id = string
    email      = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="security_hub_loglevel" requirement="optional" type="string">
<HclListItemDescription>

Adjust the logging level of the script to sync SecurityHub member accounts. Valid values: debug, info, warn, error

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;info&quot;"/>
</HclListItem>

<HclListItem name="security_hub_product_integrations" requirement="optional" type="list(object(…))">
<HclListItemDescription>

List of product integration IDs to enable on SecurityHub. Refer to https://www.terraform.io/docs/providers/aws/r/securityhub_product_subscription.html#argument-reference for valid values.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    owning_account_id = string
    product_id        = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="service_linked_roles" requirement="optional" type="set(string)">
<HclListItemDescription>

Create service-linked roles for this set of services. You should pass in the URLs of the services, but without the protocol (e.g., http://) in front: e.g., use elasticbeanstalk.amazonaws.com for Elastic Beanstalk or es.amazonaws.com for Amazon Elasticsearch. Service-linked roles are predefined by the service, can typically only be assumed by that service, and include all the permissions that the service requires to call other AWS services on your behalf. You can typically only create one such role per AWS account, which is why this parameter exists in the account baseline. See https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_aws-services-that-work-with-iam.html for the list of services that support service-linked roles.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="use_managed_iam_policies" requirement="optional" type="bool">
<HclListItemDescription>

When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

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

<HclListItem name="cleanup_expired_certs_lambda_function_arn">
<HclListItemDescription>

The ARN of the AWS Lambda Function used for automatically removing all expired SSL/TLS certificates stored in AWS IAM.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cleanup_expired_certs_lambda_iam_role_id">
<HclListItemDescription>

The name of the IAM role used by the AWS Lambda Function used for automatically removing all expired SSL/TLS certificates stored in AWS IAM.

</HclListItemDescription>
</HclListItem>

<HclListItem name="control_tower_execution_role_arn">
<HclListItemDescription>

The ARN of the Control Tower Execution Role. Only set if create_control_tower_execution_role is true.

</HclListItemDescription>
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

<HclListItem name="guardduty_findings_kms_key_alias_name">
<HclListItemDescription>

The alias of the KMS key used by the S3 bucket to encrypt GuardDuty findings.

</HclListItemDescription>
</HclListItem>

<HclListItem name="guardduty_findings_kms_key_arn">
<HclListItemDescription>

The ARN of the KMS key used by the S3 bucket to encrypt GuardDuty findings.

</HclListItemDescription>
</HclListItem>

<HclListItem name="guardduty_findings_s3_bucket_arn">
<HclListItemDescription>

The ARN of the S3 bucket where GuardDuty findings are delivered.

</HclListItemDescription>
</HclListItem>

<HclListItem name="guardduty_findings_s3_bucket_name">
<HclListItemDescription>

The name of the S3 bucket where GuardDuty findings are delivered.

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

<HclListItem name="kms_key_aliases">
<HclListItemDescription>

A map from region to aliases of the KMS CMKs that were created. The value will also be a map mapping the keys from the <a href="#customer_master_keys"><code>customer_master_keys</code></a> input variable to the corresponding alias.

</HclListItemDescription>
</HclListItem>

<HclListItem name="kms_key_arns">
<HclListItemDescription>

A map from region to ARNs of the KMS CMKs that were created. The value will also be a map mapping the keys from the <a href="#kms_customer_master_keys"><code>kms_customer_master_keys</code></a> input variable to the corresponding ARN.

</HclListItemDescription>
</HclListItem>

<HclListItem name="security_hub_accounts">
<HclListItemDescription>

Map of AWS Account IDs for regions that have AWS Security Hub enabled.

</HclListItemDescription>
</HclListItem>

<HclListItem name="service_linked_role_arns">
<HclListItemDescription>

A map of ARNs of the service linked roles created from <a href="#service_linked_roles"><code>service_linked_roles</code></a>.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.1.0/modules/control-tower-app-account-baseline/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.1.0/modules/control-tower-app-account-baseline/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.1.0/modules/control-tower-app-account-baseline/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "36aefa3600407db930318a146ca06235"
}
##DOCS-SOURCER-END -->
