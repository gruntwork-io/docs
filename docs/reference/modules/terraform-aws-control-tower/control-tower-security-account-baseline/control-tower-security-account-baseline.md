---
title: "Account Baseline Security with Control Tower Integration"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Control Tower" version="0.0.24" />

# Account Baseline Security with Control Tower Integration

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.0.24/modules/landingzone/control-tower-security-account-baseline" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases?q=control-tower-security-account-baseline" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

A CIS compliant security baseline for AWS Landing Zone for configuring the security account (the one where all your IAM
users and IAM groups are defined), as part of a Control Tower integration. This module fills in features NOT supported
by Control Tower, including setting up Amazon Guard Duty, Macie, IAM users, IAM groups, IAM password policy, and more.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CONTROL-TOWER-SECURITY-ACCOUNT-BASELINE MODULE
# ------------------------------------------------------------------------------------------------------

module "control_tower_security_account_baseline" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-security-account-baseline?ref=v0.0.24"

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

  # The name used to prefix all resources
  name_prefix = <string>

  # AWS Account to join this account's SecurityHub to. Must have already
  # received an invite from this account.
  security_hub_associate_to_admin_account_id = <string>

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

  # A list of IAM ARNs from other AWS accounts that will be allowed read access
  # to the logs in CloudTrail, AWS Config, and CloudWatch for this account. If
  # var.cloudtrail_kms_key_arn is set, will also grant decrypt permissions for
  # the KMS CMK.
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

  # A list of IAM permissions (e.g. ec2:*) which will be granted for automated
  # deployment.
  auto_deploy_permissions = []

  # Namespace all Lambda resources created by this module with this name.
  cleanup_expired_certs_lambda_namespace = "cleanup-expired-iam-certs"

  # The name to use for the custom CloudWatch metric. Only used if
  # var.report_cloudwatch_metric is set to true.
  cleanup_expired_certs_report_cloudwatch_metric_name = "cleanup-expired-iam-certs-count"

  # The namespace to use for the custom CloudWatch metric. Only used if
  # var.report_cloudwatch_metric is set to true.
  cleanup_expired_certs_report_cloudwatch_metric_namespace = "custom/cis"

  # An expression that defines how often to run the Lambda function to clean up
  # expired IAM certs. For example, cron(0 20 * * ? *) or rate(5 minutes).
  cleanup_expired_certs_schedule_expression = "rate(1 hour)"

  # Namespace all Lambda scheduling resources created by this module with this
  # name.
  cleanup_expired_certs_schedule_namespace = "cleanup-expired-iam-certs-scheduled"

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

  # The name of the IAM group that will grant access to all external AWS
  # accounts in var.iam_groups_for_cross_account_access.
  cross_account_access_all_group_name = "access-all-external-accounts"

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
  # var.ebs_enable_encryption and var.ebs_use_existing_kms_keys are enabled. The
  # name must match a name given the var.kms_customer_master_keys variable.
  ebs_kms_key_name = ""

  # If set to true, the KMS Customer Managed Keys (CMK) with the name in
  # var.ebs_kms_key_name will be set as the default for EBS encryption. When
  # false (default), the AWS-managed aws/ebs key will be used.
  ebs_use_existing_kms_keys = false

  # When true, create an Open ID Connect Provider that GitHub actions can use to
  # assume IAM roles in the account. Refer to
  # https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services
  # for more information.
  enable_github_actions_access = false

  # If set to true, when you run 'terraform destroy', delete all objects from
  # the bucket macie_bucket_name so that the bucket can be destroyed without
  # error. Warning: these objects are not recoverable so only use this if you're
  # absolutely sure you want to permanently delete everything!
  force_destroy_macie_bucket = false

  # When destroying this user, destroy even if it has non-Terraform-managed IAM
  # access keys, login profile, or MFA devices. Without force_destroy a user
  # with non-Terraform-managed access keys and login profile will fail to be
  # destroyed.
  force_destroy_users = false

  # When set, use the statically provided hardcoded list of thumbprints rather
  # than looking it up dynamically. This is useful if you want to trade
  # relibaility of the OpenID Connect Provider across certificate renewals with
  # a static list that is obtained using a trustworthy mechanism to mitigate
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

  # A list of AWS services for which the developers IAM Group will receive full
  # permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For
  # example, to grant developers access only to EC2 and Amazon Machine Learning,
  # use the value ["ec2","machinelearning"].
  iam_group_developers_permitted_services = []

  # The prefix of the S3 Bucket Name to which an individual IAM User will have
  # full access. For example, if the prefix is acme.user-, then IAM User
  # john.doe will have access to S3 Bucket acme.user-john.doe.
  iam_group_developers_s3_bucket_prefix = "acme.user-"

  # The name to be used for the IAM Group that grants read/write access to all
  # billing features in AWS.
  iam_group_name_billing = "billing"

  # The name to be used for the IAM Group that grants IAM Users a reasonable set
  # of permissions for developers.
  iam_group_name_developers = "developers"

  # The name to be used for the IAM Group that grants IAM administrative access.
  # Effectively grants administrator access.
  iam_group_name_iam_admin = "iam-admin"

  # The name to be used for the IAM Group that grants IAM Users the permissions
  # to manage their own IAM User account.
  iam_group_name_iam_user_self_mgmt = "iam-user-self-mgmt"

  # The name to be used for the IAM Group that grants read access to CloudTrail,
  # AWS Config, and CloudWatch in AWS.
  iam_group_name_logs = "logs"

  # The name to be used for the IAM Group that grants read-only access to all
  # AWS resources.
  iam_group_name_read_only = "read-only"

  # The name of the IAM Group that allows access to AWS Support.
  iam_group_name_support = "support"

  # The name to be used for the IAM Group that grants IAM Users the permissions
  # to use existing IAM Roles when launching AWS Resources. This does NOT grant
  # the permission to create new IAM Roles.
  iam_group_name_use_existing_iam_roles = "use-existing-iam-roles"

  # The list of names to be used for the IAM Group that enables its members to
  # SSH as a sudo user into any server configured with the ssh-grunt Gruntwork
  # module. Pass in multiple to configure multiple different IAM groups to
  # control different groupings of access at the server level. Pass in empty
  # list to disable creation of the IAM groups.
  iam_group_names_ssh_grunt_sudo_users = ["ssh-grunt-sudo-users"]

  # The name to be used for the IAM Group that enables its members to SSH as a
  # non-sudo user into any server configured with the ssh-grunt Gruntwork
  # module. Pass in multiple to configure multiple different IAM groups to
  # control different groupings of access at the server level. Pass in empty
  # list to disable creation of the IAM groups.
  iam_group_names_ssh_grunt_users = ["ssh-grunt-users"]

  # This variable is used to create groups that allow allow IAM users to assume
  # roles in your other AWS accounts. It should be a list of maps, where each
  # map has the keys group_name and iam_role_arn. For each entry in the list, we
  # will create an IAM group that allows users to assume the given IAM role in
  # the other AWS account. This allows you to define all your IAM users in one
  # account (e.g. the users account) and to grant them access to certain IAM
  # roles in other accounts (e.g. the stage, prod, audit accounts).
  iam_groups_for_cross_account_access = []

  # Password expiration requires administrator reset.
  iam_password_policy_hard_expiry = true

  # Number of days before password expiration.
  iam_password_policy_max_password_age = 0

  # Password minimum length. To be compliant with CIS recommendation 1.8, the
  # minimum password length is 14 characters.
  iam_password_policy_minimum_password_length = 14

  # The name to be used for the IAM Policy that grants IAM administrative
  # access.
  iam_policy_iam_admin = "iam-admin"

  # The name to be used for the IAM Policy that grants IAM Users the permissions
  # to manage their own IAM User account.
  iam_policy_iam_user_self_mgmt = "iam-user-self-mgmt"

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

  # Force the user to reset their password on initial login. Only used for users
  # with create_login_profile set to true.
  password_reset_required = true

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

  # When true, enable the CIS benchmark v1.4 ruleset for automatic checks in
  # SecurityHub. Set this to false if you are using Steampipe instead.
  security_hub_enable_cis_1_4_check = true

  # When true, enable the CIS benchmark v1.2 ruleset for automatic checks in
  # SecurityHub. If you also want to disable the CIS benchmark v1.4 check, then
  # var.security_hub_enable_cis_1_4_check should also be set to false. Set this
  # to false if you are using Steampipe instead.
  security_hub_enable_cis_check = true

  # List of AWS Accounts (ID and Email) to add as members to this account's
  # SecurityHub configuration.
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

  # Should we create the IAM Group for auto-deploy? Allows automated deployment
  # by granting the permissions specified in var.auto_deploy_permissions. (true
  # or false)
  should_create_iam_group_auto_deploy = false

  # Should we create the IAM Group for billing? Allows read-write access to
  # billing features only. (true or false)
  should_create_iam_group_billing = false

  # Should we create the IAM Group for access to all external AWS accounts? 
  should_create_iam_group_cross_account_access_all = true

  # Should we create the IAM Group for developers? The permissions of that group
  # are specified via var.iam_group_developers_permitted_services. (true or
  # false)
  should_create_iam_group_developers = false

  # Should we create the IAM Group for logs? Allows read access to CloudTrail,
  # AWS Config, and CloudWatch. If var.cloudtrail_kms_key_arn is set, will also
  # give decrypt access to a KMS CMK. (true or false)
  should_create_iam_group_logs = false

  # Should we create the IAM Group for read-only? Allows read-only access to all
  # AWS resources. (true or false)
  should_create_iam_group_read_only = false

  # Should we create the IAM Group for use-existing-iam-roles? Allow launching
  # AWS resources with existing IAM Roles, but no ability to create new IAM
  # Roles. (true or false)
  should_create_iam_group_use_existing_iam_roles = false

  # Should we create the IAM Group for iam-user-self-mgmt? Allows IAM users to
  # manage their own account, but not other users. (true or false)
  should_create_iam_group_user_self_mgmt = false

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
# DEPLOY GRUNTWORK'S CONTROL-TOWER-SECURITY-ACCOUNT-BASELINE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-security-account-baseline?ref=v0.0.24"
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

  # The name used to prefix all resources
  name_prefix = <string>

  # AWS Account to join this account's SecurityHub to. Must have already
  # received an invite from this account.
  security_hub_associate_to_admin_account_id = <string>

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

  # A list of IAM ARNs from other AWS accounts that will be allowed read access
  # to the logs in CloudTrail, AWS Config, and CloudWatch for this account. If
  # var.cloudtrail_kms_key_arn is set, will also grant decrypt permissions for
  # the KMS CMK.
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

  # A list of IAM permissions (e.g. ec2:*) which will be granted for automated
  # deployment.
  auto_deploy_permissions = []

  # Namespace all Lambda resources created by this module with this name.
  cleanup_expired_certs_lambda_namespace = "cleanup-expired-iam-certs"

  # The name to use for the custom CloudWatch metric. Only used if
  # var.report_cloudwatch_metric is set to true.
  cleanup_expired_certs_report_cloudwatch_metric_name = "cleanup-expired-iam-certs-count"

  # The namespace to use for the custom CloudWatch metric. Only used if
  # var.report_cloudwatch_metric is set to true.
  cleanup_expired_certs_report_cloudwatch_metric_namespace = "custom/cis"

  # An expression that defines how often to run the Lambda function to clean up
  # expired IAM certs. For example, cron(0 20 * * ? *) or rate(5 minutes).
  cleanup_expired_certs_schedule_expression = "rate(1 hour)"

  # Namespace all Lambda scheduling resources created by this module with this
  # name.
  cleanup_expired_certs_schedule_namespace = "cleanup-expired-iam-certs-scheduled"

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

  # The name of the IAM group that will grant access to all external AWS
  # accounts in var.iam_groups_for_cross_account_access.
  cross_account_access_all_group_name = "access-all-external-accounts"

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
  # var.ebs_enable_encryption and var.ebs_use_existing_kms_keys are enabled. The
  # name must match a name given the var.kms_customer_master_keys variable.
  ebs_kms_key_name = ""

  # If set to true, the KMS Customer Managed Keys (CMK) with the name in
  # var.ebs_kms_key_name will be set as the default for EBS encryption. When
  # false (default), the AWS-managed aws/ebs key will be used.
  ebs_use_existing_kms_keys = false

  # When true, create an Open ID Connect Provider that GitHub actions can use to
  # assume IAM roles in the account. Refer to
  # https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services
  # for more information.
  enable_github_actions_access = false

  # If set to true, when you run 'terraform destroy', delete all objects from
  # the bucket macie_bucket_name so that the bucket can be destroyed without
  # error. Warning: these objects are not recoverable so only use this if you're
  # absolutely sure you want to permanently delete everything!
  force_destroy_macie_bucket = false

  # When destroying this user, destroy even if it has non-Terraform-managed IAM
  # access keys, login profile, or MFA devices. Without force_destroy a user
  # with non-Terraform-managed access keys and login profile will fail to be
  # destroyed.
  force_destroy_users = false

  # When set, use the statically provided hardcoded list of thumbprints rather
  # than looking it up dynamically. This is useful if you want to trade
  # relibaility of the OpenID Connect Provider across certificate renewals with
  # a static list that is obtained using a trustworthy mechanism to mitigate
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

  # A list of AWS services for which the developers IAM Group will receive full
  # permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For
  # example, to grant developers access only to EC2 and Amazon Machine Learning,
  # use the value ["ec2","machinelearning"].
  iam_group_developers_permitted_services = []

  # The prefix of the S3 Bucket Name to which an individual IAM User will have
  # full access. For example, if the prefix is acme.user-, then IAM User
  # john.doe will have access to S3 Bucket acme.user-john.doe.
  iam_group_developers_s3_bucket_prefix = "acme.user-"

  # The name to be used for the IAM Group that grants read/write access to all
  # billing features in AWS.
  iam_group_name_billing = "billing"

  # The name to be used for the IAM Group that grants IAM Users a reasonable set
  # of permissions for developers.
  iam_group_name_developers = "developers"

  # The name to be used for the IAM Group that grants IAM administrative access.
  # Effectively grants administrator access.
  iam_group_name_iam_admin = "iam-admin"

  # The name to be used for the IAM Group that grants IAM Users the permissions
  # to manage their own IAM User account.
  iam_group_name_iam_user_self_mgmt = "iam-user-self-mgmt"

  # The name to be used for the IAM Group that grants read access to CloudTrail,
  # AWS Config, and CloudWatch in AWS.
  iam_group_name_logs = "logs"

  # The name to be used for the IAM Group that grants read-only access to all
  # AWS resources.
  iam_group_name_read_only = "read-only"

  # The name of the IAM Group that allows access to AWS Support.
  iam_group_name_support = "support"

  # The name to be used for the IAM Group that grants IAM Users the permissions
  # to use existing IAM Roles when launching AWS Resources. This does NOT grant
  # the permission to create new IAM Roles.
  iam_group_name_use_existing_iam_roles = "use-existing-iam-roles"

  # The list of names to be used for the IAM Group that enables its members to
  # SSH as a sudo user into any server configured with the ssh-grunt Gruntwork
  # module. Pass in multiple to configure multiple different IAM groups to
  # control different groupings of access at the server level. Pass in empty
  # list to disable creation of the IAM groups.
  iam_group_names_ssh_grunt_sudo_users = ["ssh-grunt-sudo-users"]

  # The name to be used for the IAM Group that enables its members to SSH as a
  # non-sudo user into any server configured with the ssh-grunt Gruntwork
  # module. Pass in multiple to configure multiple different IAM groups to
  # control different groupings of access at the server level. Pass in empty
  # list to disable creation of the IAM groups.
  iam_group_names_ssh_grunt_users = ["ssh-grunt-users"]

  # This variable is used to create groups that allow allow IAM users to assume
  # roles in your other AWS accounts. It should be a list of maps, where each
  # map has the keys group_name and iam_role_arn. For each entry in the list, we
  # will create an IAM group that allows users to assume the given IAM role in
  # the other AWS account. This allows you to define all your IAM users in one
  # account (e.g. the users account) and to grant them access to certain IAM
  # roles in other accounts (e.g. the stage, prod, audit accounts).
  iam_groups_for_cross_account_access = []

  # Password expiration requires administrator reset.
  iam_password_policy_hard_expiry = true

  # Number of days before password expiration.
  iam_password_policy_max_password_age = 0

  # Password minimum length. To be compliant with CIS recommendation 1.8, the
  # minimum password length is 14 characters.
  iam_password_policy_minimum_password_length = 14

  # The name to be used for the IAM Policy that grants IAM administrative
  # access.
  iam_policy_iam_admin = "iam-admin"

  # The name to be used for the IAM Policy that grants IAM Users the permissions
  # to manage their own IAM User account.
  iam_policy_iam_user_self_mgmt = "iam-user-self-mgmt"

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

  # Force the user to reset their password on initial login. Only used for users
  # with create_login_profile set to true.
  password_reset_required = true

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

  # When true, enable the CIS benchmark v1.4 ruleset for automatic checks in
  # SecurityHub. Set this to false if you are using Steampipe instead.
  security_hub_enable_cis_1_4_check = true

  # When true, enable the CIS benchmark v1.2 ruleset for automatic checks in
  # SecurityHub. If you also want to disable the CIS benchmark v1.4 check, then
  # var.security_hub_enable_cis_1_4_check should also be set to false. Set this
  # to false if you are using Steampipe instead.
  security_hub_enable_cis_check = true

  # List of AWS Accounts (ID and Email) to add as members to this account's
  # SecurityHub configuration.
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

  # Should we create the IAM Group for auto-deploy? Allows automated deployment
  # by granting the permissions specified in var.auto_deploy_permissions. (true
  # or false)
  should_create_iam_group_auto_deploy = false

  # Should we create the IAM Group for billing? Allows read-write access to
  # billing features only. (true or false)
  should_create_iam_group_billing = false

  # Should we create the IAM Group for access to all external AWS accounts? 
  should_create_iam_group_cross_account_access_all = true

  # Should we create the IAM Group for developers? The permissions of that group
  # are specified via var.iam_group_developers_permitted_services. (true or
  # false)
  should_create_iam_group_developers = false

  # Should we create the IAM Group for logs? Allows read access to CloudTrail,
  # AWS Config, and CloudWatch. If var.cloudtrail_kms_key_arn is set, will also
  # give decrypt access to a KMS CMK. (true or false)
  should_create_iam_group_logs = false

  # Should we create the IAM Group for read-only? Allows read-only access to all
  # AWS resources. (true or false)
  should_create_iam_group_read_only = false

  # Should we create the IAM Group for use-existing-iam-roles? Allow launching
  # AWS resources with existing IAM Roles, but no ability to create new IAM
  # Roles. (true or false)
  should_create_iam_group_use_existing_iam_roles = false

  # Should we create the IAM Group for iam-user-self-mgmt? Allows IAM users to
  # manage their own account, but not other users. (true or false)
  should_create_iam_group_user_self_mgmt = false

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

The name used to prefix all resources

</HclListItemDescription>
</HclListItem>

<HclListItem name="security_hub_associate_to_admin_account_id" requirement="required" type="string">
<HclListItemDescription>

AWS Account to join this account's SecurityHub to. Must have already received an invite from this account.

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
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = [
     "arn:aws:iam::123445678910:role/jenkins"
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="allow_billing_access_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed full (read and write) access to the billing info for this account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = [
     "arn:aws:iam::123445678910:root"
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="allow_dev_access_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed full (read and write) access to the services in this account specified in <a href="#dev_permitted_services"><code>dev_permitted_services</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = [
     "arn:aws:iam::123445678910:root"
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="allow_logs_access_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed read access to the logs in CloudTrail, AWS Config, and CloudWatch for this account. If <a href="#cloudtrail_kms_key_arn"><code>cloudtrail_kms_key_arn</code></a> is set, will also grant decrypt permissions for the KMS CMK.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = [
     "arn:aws:iam::123445678910:root"
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="allow_read_only_access_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed read-only access to this account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = [
     "arn:aws:iam::123445678910:root"
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="allow_ssh_grunt_access_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed read access to IAM groups and publish SSH keys. This is used for ssh-grunt.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = [
     "arn:aws:iam::123445678910:root"
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="allow_support_access_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed access to AWS support for this account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = [
     "arn:aws:iam::123445678910:root"
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="auto_deploy_permissions" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM permissions (e.g. ec2:*) which will be granted for automated deployment.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cleanup_expired_certs_lambda_namespace" requirement="optional" type="string">
<HclListItemDescription>

Namespace all Lambda resources created by this module with this name.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;cleanup-expired-iam-certs&quot;"/>
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

<HclListItem name="cleanup_expired_certs_schedule_namespace" requirement="optional" type="string">
<HclListItemDescription>

Namespace all Lambda scheduling resources created by this module with this name.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;cleanup-expired-iam-certs-scheduled&quot;"/>
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

<HclListItem name="cross_account_access_all_group_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the IAM group that will grant access to all external AWS accounts in <a href="#iam_groups_for_cross_account_access"><code>iam_groups_for_cross_account_access</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;access-all-external-accounts&quot;"/>
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

The name of the KMS CMK to use by default for encrypting EBS volumes, if <a href="#ebs_enable_encryption"><code>ebs_enable_encryption</code></a> and <a href="#ebs_use_existing_kms_keys"><code>ebs_use_existing_kms_keys</code></a> are enabled. The name must match a name given the <a href="#kms_customer_master_keys"><code>kms_customer_master_keys</code></a> variable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="ebs_use_existing_kms_keys" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, the KMS Customer Managed Keys (CMK) with the name in <a href="#ebs_kms_key_name"><code>ebs_kms_key_name</code></a> will be set as the default for EBS encryption. When false (default), the AWS-managed aws/ebs key will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_github_actions_access" requirement="optional" type="bool">
<HclListItemDescription>

When true, create an Open ID Connect Provider that GitHub actions can use to assume IAM roles in the account. Refer to https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services for more information.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="force_destroy_macie_bucket" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, when you run 'terraform destroy', delete all objects from the bucket macie_bucket_name so that the bucket can be destroyed without error. Warning: these objects are not recoverable so only use this if you're absolutely sure you want to permanently delete everything!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="force_destroy_users" requirement="optional" type="bool">
<HclListItemDescription>

When destroying this user, destroy even if it has non-Terraform-managed IAM access keys, login profile, or MFA devices. Without force_destroy a user with non-Terraform-managed access keys and login profile will fail to be destroyed.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="github_actions_openid_connect_provider_thumbprint_list" requirement="optional" type="list(string)">
<HclListItemDescription>

When set, use the statically provided hardcoded list of thumbprints rather than looking it up dynamically. This is useful if you want to trade relibaility of the OpenID Connect Provider across certificate renewals with a static list that is obtained using a trustworthy mechanism to mitigate potential damage from a domain hijacking attack on GitHub domains.

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

<HclListItem name="iam_group_developers_permitted_services" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of AWS services for which the developers IAM Group will receive full permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to grant developers access only to EC2 and Amazon Machine Learning, use the value ['ec2','machinelearning'].

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="iam_group_developers_s3_bucket_prefix" requirement="optional" type="string">
<HclListItemDescription>

The prefix of the S3 Bucket Name to which an individual IAM User will have full access. For example, if the prefix is acme.user-, then IAM User john.doe will have access to S3 Bucket acme.user-john.doe.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;acme.user-&quot;"/>
</HclListItem>

<HclListItem name="iam_group_name_billing" requirement="optional" type="string">
<HclListItemDescription>

The name to be used for the IAM Group that grants read/write access to all billing features in AWS.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;billing&quot;"/>
</HclListItem>

<HclListItem name="iam_group_name_developers" requirement="optional" type="string">
<HclListItemDescription>

The name to be used for the IAM Group that grants IAM Users a reasonable set of permissions for developers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;developers&quot;"/>
</HclListItem>

<HclListItem name="iam_group_name_iam_admin" requirement="optional" type="string">
<HclListItemDescription>

The name to be used for the IAM Group that grants IAM administrative access. Effectively grants administrator access.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;iam-admin&quot;"/>
</HclListItem>

<HclListItem name="iam_group_name_iam_user_self_mgmt" requirement="optional" type="string">
<HclListItemDescription>

The name to be used for the IAM Group that grants IAM Users the permissions to manage their own IAM User account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;iam-user-self-mgmt&quot;"/>
</HclListItem>

<HclListItem name="iam_group_name_logs" requirement="optional" type="string">
<HclListItemDescription>

The name to be used for the IAM Group that grants read access to CloudTrail, AWS Config, and CloudWatch in AWS.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;logs&quot;"/>
</HclListItem>

<HclListItem name="iam_group_name_read_only" requirement="optional" type="string">
<HclListItemDescription>

The name to be used for the IAM Group that grants read-only access to all AWS resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;read-only&quot;"/>
</HclListItem>

<HclListItem name="iam_group_name_support" requirement="optional" type="string">
<HclListItemDescription>

The name of the IAM Group that allows access to AWS Support.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;support&quot;"/>
</HclListItem>

<HclListItem name="iam_group_name_use_existing_iam_roles" requirement="optional" type="string">
<HclListItemDescription>

The name to be used for the IAM Group that grants IAM Users the permissions to use existing IAM Roles when launching AWS Resources. This does NOT grant the permission to create new IAM Roles.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;use-existing-iam-roles&quot;"/>
</HclListItem>

<HclListItem name="iam_group_names_ssh_grunt_sudo_users" requirement="optional" type="list(string)">
<HclListItemDescription>

The list of names to be used for the IAM Group that enables its members to SSH as a sudo user into any server configured with the ssh-grunt Gruntwork module. Pass in multiple to configure multiple different IAM groups to control different groupings of access at the server level. Pass in empty list to disable creation of the IAM groups.

</HclListItemDescription>
<HclListItemDefaultValue>

```hcl
[
  "ssh-grunt-sudo-users"
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="iam_group_names_ssh_grunt_users" requirement="optional" type="list(string)">
<HclListItemDescription>

The name to be used for the IAM Group that enables its members to SSH as a non-sudo user into any server configured with the ssh-grunt Gruntwork module. Pass in multiple to configure multiple different IAM groups to control different groupings of access at the server level. Pass in empty list to disable creation of the IAM groups.

</HclListItemDescription>
<HclListItemDefaultValue>

```hcl
[
  "ssh-grunt-users"
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="iam_groups_for_cross_account_access" requirement="optional" type="list(object(…))">
<HclListItemDescription>

This variable is used to create groups that allow allow IAM users to assume roles in your other AWS accounts. It should be a list of maps, where each map has the keys group_name and iam_role_arn. For each entry in the list, we will create an IAM group that allows users to assume the given IAM role in the other AWS account. This allows you to define all your IAM users in one account (e.g. the users account) and to grant them access to certain IAM roles in other accounts (e.g. the stage, prod, audit accounts).

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
       group_name    = "stage-full-access"
       iam_role_arns = ["arn:aws:iam::123445678910:role/mgmt-full-access"]
     },
     {
       group_name    = "prod-read-only-access"
       iam_role_arns = ["arn:aws:iam::9876543210:role/prod-read-only-access"]
     }
   ]

```
</details>

</HclGeneralListItem>
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
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="iam_password_policy_minimum_password_length" requirement="optional" type="number">
<HclListItemDescription>

Password minimum length. To be compliant with CIS recommendation 1.8, the minimum password length is 14 characters.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="14"/>
</HclListItem>

<HclListItem name="iam_policy_iam_admin" requirement="optional" type="string">
<HclListItemDescription>

The name to be used for the IAM Policy that grants IAM administrative access.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;iam-admin&quot;"/>
</HclListItem>

<HclListItem name="iam_policy_iam_user_self_mgmt" requirement="optional" type="string">
<HclListItemDescription>

The name to be used for the IAM Policy that grants IAM Users the permissions to manage their own IAM User account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;iam-user-self-mgmt&quot;"/>
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
   - region                                  string                : The region (e.g., us-west-2) where the key should be created. If null or
                                                                     omitted, the key will be created in all enabled regions. Any keys
                                                                     targeting an opted out region or invalid region string will show up in the
                                                                     invalid_cmk_inputs output.
   - cmk_administrator_iam_arns              list(string)          : A list of IAM ARNs for users who should be given
                                                                     administrator access to this CMK (e.g.
                                                                     arn:aws:iam::<aws-account-id>:user/<iam-user-arn>).
   - cmk_user_iam_arns                       list(object[CMKUser]) : A list of IAM ARNs for users who should be given
                                                                     permissions to use this CMK (e.g.
                                                                     arn:aws:iam::<aws-account-id>:user/<iam-user-arn>).
   - cmk_read_only_user_iam_arns             list(object[CMKUser]) : A list of IAM ARNs for users who should be given
                                                                     read-only (decrypt-only) permissions to use this CMK (e.g.
                                                                     arn:aws:iam::<aws-account-id>:user/<iam-user-arn>).
   - cmk_external_user_iam_arns              list(string)          : A list of IAM ARNs for users from external AWS accounts
                                                                     who should be given permissions to use this CMK (e.g.
                                                                     arn:aws:iam::<aws-account-id>:root).
   - allow_manage_key_permissions_with_iam   bool                  : If true, both the CMK's Key Policy and IAM Policies
                                                                     (permissions) can be used to grant permissions on the CMK.
                                                                     If false, only the CMK's Key Policy can be used to grant
                                                                     permissions on the CMK. False is more secure (and
                                                                     generally preferred), but true is more flexible and
                                                                     convenient.
   - deletion_window_in_days                 number                : The number of days to keep this KMS Master Key around after it has been
                                                                     marked for deletion.
   - tags                                    map(string)           : A map of tags to apply to the KMS Key to be created. In this map
                                                                     variable, the key is the tag name and the value  is the tag value. Note
                                                                     that this map is merged with var.global_tags, and can be used to override
                                                                     tags specified in that variable.
   - enable_key_rotation                     bool                  : Whether or not to enable automatic annual rotation of the KMS key.
   - spec                                    string                : Specifies whether the key contains a symmetric key or an asymmetric key
                                                                     pair and the encryption algorithms or signing algorithms that the key
                                                                     supports. Valid values: SYMMETRIC_DEFAULT, RSA_2048, RSA_3072, RSA_4096,
                                                                     ECC_NIST_P256, ECC_NIST_P384, ECC_NIST_P521, or ECC_SECG_P256K1.
   - cmk_service_principals                  list(object[ServicePrincipal]) : A list of Service Principals that should be given
                                                                              permissions to use this CMK (e.g. s3.amazonaws.com). See
                                                                              below for the structure of the object that should be passed
                                                                              in.
  
   Structure of ServicePrincipal object:
   - name          string                   : The name of the service principal (e.g.: s3.amazonaws.com).
   - actions       list(string)             : The list of actions that the given service principal is allowed to
                                              perform (e.g. ["kms:DescribeKey", "kms:GenerateDataKey"]).
   - conditions    list(object[Condition])  : (Optional) List of conditions to apply to the permissions for the service
                                              principal. Use this to apply conditions on the permissions for
                                              accessing the KMS key (e.g., only allow access for certain encryption
                                              contexts). The condition object accepts the same fields as the condition
                                              block on the IAM policy document (See
                                              https://www.terraform.io/docs/providers/aws/d/iam_policy_document.htmlcondition).
   Structure of CMKUser object:
   - name          list(string)             : The list of names of the AWS principal (e.g.: arn:aws:iam::0000000000:user/dev).
   - conditions    list(object[Condition])  : (Optional) List of conditions to apply to the permissions for the CMK User
                                              Use this to apply conditions on the permissions for accessing the KMS key
                                              (e.g., only allow access for certain encryption contexts).
                                              The condition object accepts the same fields as the condition
                                              block on the IAM policy document (See
                                              https://www.terraform.io/docs/providers/aws/d/iam_policy_document.htmlcondition).
   Example:
   kms_customer_master_keys = {
     cmk-stage = {
       region                                = "us-west-1"
       cmk_administrator_iam_arns            = ["arn:aws:iam::0000000000:user/admin"]
       cmk_user_iam_arns                     = [
         {
           name = ["arn:aws:iam::0000000000:user/dev"]
           conditions = []
         }
       ]
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
       region                                = "us-east-1"
       cmk_administrator_iam_arns            = ["arn:aws:iam::0000000000:user/admin"]
       cmk_user_iam_arns                     = [
         {
           name = ["arn:aws:iam::0000000000:user/prod"]
           conditions = []
         }
       ]
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

The maximum allowable session duration, in seconds, for the credentials you get when assuming the IAM roles created by this module. This variable applies to all IAM roles created by this module that are intended for machine users, such as allow-auto-deploy-from-other-accounts. For IAM roles that are intended for human users, such as allow-read-only-access-from-other-accounts, see <a href="#max_session_duration_human_users"><code>max_session_duration_human_users</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="3600"/>
</HclListItem>

<HclListItem name="password_reset_required" requirement="optional" type="bool">
<HclListItemDescription>

Force the user to reset their password on initial login. Only used for users with create_login_profile set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
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

List of AWS Accounts (ID and Email) to add as members to this account's SecurityHub configuration.

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
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="should_create_iam_group_cross_account_access_all" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for access to all external AWS accounts? 

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="should_create_iam_group_developers" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for developers? The permissions of that group are specified via <a href="#iam_group_developers_permitted_services"><code>iam_group_developers_permitted_services</code></a>. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="should_create_iam_group_logs" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for logs? Allows read access to CloudTrail, AWS Config, and CloudWatch. If <a href="#cloudtrail_kms_key_arn"><code>cloudtrail_kms_key_arn</code></a> is set, will also give decrypt access to a KMS CMK. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="should_create_iam_group_read_only" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for read-only? Allows read-only access to all AWS resources. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="should_create_iam_group_use_existing_iam_roles" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for use-existing-iam-roles? Allow launching AWS resources with existing IAM Roles, but no ability to create new IAM Roles. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="should_create_iam_group_user_self_mgmt" requirement="optional" type="bool">
<HclListItemDescription>

Should we create the IAM Group for iam-user-self-mgmt? Allows IAM users to manage their own account, but not other users. (true or false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
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
   users = {
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

<HclListItem name="control_tower_execution_role_arn">
<HclListItemDescription>

The ARN of the Control Tower Execution Role. Only set if create_control_tower_execution_role is true.

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

<HclListItem name="kms_key_ids">
<HclListItemDescription>

A map from region to IDs of the KMS CMKs that were created. The value will also be a map mapping the keys from the <a href="#kms_customer_master_keys"><code>kms_customer_master_keys</code></a> input variable to the corresponding ID.

</HclListItemDescription>
</HclListItem>

<HclListItem name="lambda_function_arn">
</HclListItem>

<HclListItem name="lambda_iam_role_id">
</HclListItem>

<HclListItem name="service_linked_role_arns">
<HclListItemDescription>

A map of ARNs of the service linked roles created from <a href="#service_linked_roles"><code>service_linked_roles</code></a>.

</HclListItemDescription>
</HclListItem>

<HclListItem name="user_access_keys">
<HclListItemDescription>

A map of usernames to that user's access keys (a map with keys access_key_id and secret_access_key), with the secret_access_key encrypted with that user's PGP key (only shows up for users with create_access_keys = true). You can decrypt the secret_access_key on the CLI: echo &lt;secret_access_key> | base64 --decode | keybase pgp decrypt

</HclListItemDescription>
</HclListItem>

<HclListItem name="user_arns">
<HclListItemDescription>

A map of usernames to the ARN for that IAM user.

</HclListItemDescription>
</HclListItem>

<HclListItem name="user_passwords">
<HclListItemDescription>

A map of usernames to that user's AWS Web Console password, encrypted with that user's PGP key (only shows up for users with create_login_profile = true). You can decrypt the password on the CLI: echo &lt;password> | base64 --decode | keybase pgp decrypt

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.0.24/modules/control-tower-security-account-baseline/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.0.24/modules/control-tower-security-account-baseline/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.0.24/modules/control-tower-security-account-baseline/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "1ecdec5bf1e3264c38ff1e76f56ec057"
}
##DOCS-SOURCER-END -->
