---
sidebar_label: Apply the account-baseline-app to the other child accounts
---
# Apply the `account-baseline-app` to the other child accounts

Now that your **security** account is fully configured, you need to apply the security baseline to the remaining child
accounts (e.g., `dev`, `stage`, `prod`, `shared-services`). Feel free to adjust this as necessary based on the accounts your
company needs.

Create `terragrunt.hcl` files in `infrastructure-live` under the file paths `<ACCOUNT>/_global/account-baseline`,
where `<ACCOUNT>` is one of these other child accounts, such as `dev`, `stage`, `prod`, and `shared-services`. In the rest of
this example, we’ll look solely at the stage account, but make sure you follow the analogous steps for EACH of your
child accounts.

```bash
infrastructure-live
  └ root
  └ logs
  └ security
  └ stage
    └ _global
      └ account-baseline
        └ terragrunt.hcl
```

Point the `source` URL in your `terragrunt.hcl` file to the `account-baseline-app` module in the [terraform-aws-cis-service-catalog](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog)
repo, setting the `ref` param to the version you require:

```hcl title=infrastructure-live/stage/_global/account-baseline/terragrunt.hcl
terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-cis-service-catalog.git//modules/landingzone/account-baseline-app?ref=v0.27.0"
}
```

Set the variables for the `account-baseline-app` module in this environment in the `inputs = { ... }` block of `terragrunt.hcl`:

```hcl title=infrastructure-live/stage/_global/account-baseline/terragrunt.hcl
locals {
  aws_region = local.region.aws_region

  # A local for more convenient access to the accounts map.
  accounts = local.common_vars.locals.accounts

  # Both buckets are created in the logs account by account-baseline-root
  config_s3_bucket_name     = local.common_vars.locals.config_s3_bucket_name
  cloudtrail_s3_bucket_name = local.common_vars.locals.cloudtrail_s3_bucket_name

  # The Cloudtrail KMS Key is deployed at the logs account but it's value is an output from the root account.
  cloudtrail_kms_key_arn = local.common_vars.locals.cloudtrail_kms_key_arn

  # A local for convenient access to the security account root ARN.
  security_account_root_arn = "arn:aws:iam::${local.accounts.security}:root"

  # The following locals are used for constructing multi region provider configurations for the underlying module.
  # A list of all AWS regions
  all_aws_regions = [
    "af-south-1",
    "ap-east-1",
    "ap-northeast-1",
    "ap-northeast-2",
    "ap-northeast-3",
    "ap-south-1",
    "ap-southeast-1",
    "ap-southeast-2",
    "ca-central-1",
    "cn-north-1",
    "cn-northwest-1",
    "eu-central-1",
    "eu-north-1",
    "eu-south-1",
    "eu-west-1",
    "eu-west-2",
    "eu-west-3",
    "me-south-1",
    "sa-east-1",
    "us-east-1",
    "us-east-2",
    "us-gov-east-1",
    "us-gov-west-1",
    "us-west-1",
    "us-west-2",
  ]

  # Creates resources in the specified regions. The best practice is to enable multiregion modules in all enabled
  # regions in your AWS account. To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws
  # ec2 describe-regions.
  opt_in_regions = [
    "eu-north-1",
    "ap-south-1",
    "eu-west-3",
    # ...,
  ]
}

# ---------------------------------------------------------------------------------------------------------------------
# CONFIGURE A PROVIDER FOR EACH AWS REGION
# To deploy a multi-region module, we have to configure a provider with a unique alias for each of the regions AWS
# supports and pass all these providers to the multi-region module in a provider = { ... } block. You MUST create a
# provider block for EVERY one of these AWS regions, but you should specify the ones to use and authenticate to (the
# ones actually enabled in your AWS account) using opt_in_regions.
# ---------------------------------------------------------------------------------------------------------------------

generate "providers" {
  path      = "providers.tf"
  if_exists = "overwrite"
  contents  = <<EOF
%{for region in local.all_aws_regions}
provider "aws" {
  region = "${region}"
  alias  = "${replace(region, "-", "_")}"
  # Skip credential validation and account ID retrieval for disabled or restricted regions
  skip_credentials_validation = ${contains(coalesce(local.opt_in_regions, []), region) ? "false" : "true"}
  skip_requesting_account_id  = ${contains(coalesce(local.opt_in_regions, []), region) ? "false" : "true"}
}
%{endfor}
EOF
}

inputs = {
  # Prefix all resources with this name
  name_prefix = "<SOME_UNIQUE_IDENTIFIER>-logs"

 ################################
  # Parameters for AWS Config
  ################################
  # Send Config logs to the common S3 bucket.
  config_s3_bucket_name = local.config_s3_bucket_name

  # Send Config logs and events to the logs account.
  config_central_account_id = local.accounts.logs

  # This account sends logs to the Logs account.
  config_aggregate_config_data_in_external_account = true

  ################################
  # Parameters for CloudTrail
  ################################

  # Send CloudTrail logs to the common S3 bucket.
  cloudtrail_s3_bucket_name = local.cloudtrail_s3_bucket_name

  # Encrypt CloudTrail logs using a common KMS key.
  cloudtrail_kms_key_arn = local.cloudtrail_kms_key_arn

  # The ARN is a key ID. This variable prevents a perpetual diff when using an alias.
  cloudtrail_kms_key_arn_is_alias = false

  ##################################
  # Benchmark SNS alarms configuration
  ##################################

  # The ARN of an SNS topic for sending alarms about CIS Benchmark compliance issues.
  # The topic exists in the logs account
  cloudtrail_benchmark_alarm_sns_topic_arn = "arn:aws:sns:${local.aws_region}:${local.accounts.logs}:BenchmarkAlarmTopic"

  ##################################
  # Cross-account IAM role permissions
  ##################################
  # A role to allow users that can view and modify AWS account billing information.
  allow_billing_access_from_other_account_arns = [local.security_account_root_arn]

  # A role that allows read only access.
  allow_read_only_access_from_other_account_arns = [local.security_account_root_arn]

  # A role that allows access to support only.
  allow_support_access_from_other_account_arns = [local.security_account_root_arn]

  service_linked_roles = ["autoscaling.amazonaws.com"]

  ##################################
  # KMS grants
  ##################################

  # These grants allow the autoscaling service-linked role to access to the AMI encryption key so that it
  # can launch instances from AMIs that were shared from the `shared-services` account.
  kms_grant_regions = {
    ami_encryption_key = local.aws_region
  }
  kms_grants = {
    ami_encryption_key = {
      kms_cmk_arn       = "arn:aws:kms:${local.aws_region}:${local.accounts.shared}:alias/ami-encryption"
      grantee_principal = "arn:aws:iam::${local.accounts[local.account_name]}:role/aws-service-role/autoscaling.amazonaws.com/AWSServiceRoleForAutoScaling"
      granted_operations = [
        "Encrypt",
        "Decrypt",
        "ReEncryptFrom",
        "ReEncryptTo",
        "GenerateDataKey",
        "DescribeKey"
      ]
    }
  }

  # Join this account to the root account's Security Hub
  security_hub_associate_to_master_account_id = local.accounts.root

  # Join this account to the root account's Amazon Macie
  macie_administrator_account_id = local.accounts.root
}
```

The code above does the following:

1. **Enable CloudTrail**. We’ve configured CloudTrail to use the S3 bucket and KMS CMK in the logs account.

2. **Enable AWS Config**. We’ve configured AWS Config to use the S3 bucket in the logs account.

3. **Configure the dev IAM role**. We create a `dev` IAM role in this account, which will get read and write access to
    the services specified in `dev_permitted_services`.

4. **Configure the Auto Deploy IAM role**. We also create an `auto-deploy` IAM role that can be assumed by a CI server
    in the `shared-services` account to do deployments. This role will have the permissions specified in
    `auto_deploy_permissions`.

5. **Configure cross-account IAM roles**. We then specify which other accounts are allowed to assume the IAM roles in
    this account. For the most part, we grant all permissions to the security account, so that by assigning users to IAM
    groups in that account, you’ll be able to access IAM roles in all the other child accounts.

Configure your Terraform backend:

```hcl title=infrastructure-live/stage/_global/account-baseline/terragrunt.hcl
include {
  path = find_in_parent_folders()
}
```

Just as with the **logs** and **security** accounts, you’re going to use the `OrganizationAccountAccessRole` IAM role created by
`account-baseline-root` to authenticate to the stage account and all other child accounts. There are many ways to
[assume an IAM role on the CLI](https://blog.gruntwork.io/a-comprehensive-guide-to-authenticating-to-aws-on-the-command-line-63656a686799);
for this guide, we’re going to keep using `aws-vault`.

Add a new `profile` entry in `~/.aws/config` for your stage account that uses the `root-iam-user` as the
`source_profile`:

```text
[profile stage-from-root]
role_arn=arn:aws:iam::${local.accounts.stage}:role/OrganizationAccountAccessRole
source_profile=root-iam-user
```

Check that you’re able to authenticate to the stage account:

```bash
aws-vault exec stage-from-root -- aws sts get-caller-identity
```

You should see JSON output indicating that you’ve successfully assumed an IAM role:

```json
{
  "UserId": "AIDAXXXXXXXXXXXX:1111111111111111111",
  "Account": "${local.accounts.stage}",
  "Arn": "arn:aws:sts::${local.accounts.stage}:assumed-role/OrganizationAccountAccessRole/1111111111111111111"
}
```

You’re now ready to deploy the `account-baseline-app` in the **stage** account by running `terragrunt apply`:

```bash
cd infrastructure-live/stage/_global/account-baseline
aws-vault exec stage-from-root -- terragrunt apply
```

:::caution

On some operating systems, such as MacOS, you may also need to increase your open files limit to avoid "pipe: too many open files" errors by running: `ulimit -n 1024`.

:::

**Remember to repeat this process in the other child accounts too (i.e., `dev`, `prod`, `shared-services`, etc)!**

**Next, try authenticating as an IAM user to the child accounts:**

1. Use your IAM user’s user name and password (decrypted using keybase) to log into the web console of the security
    account (remember to use the IAM user sign-in URL for the security account).

2. Follow the steps in [Lock down the root account IAM users](#lock_down_iam_users) to lock down your IAM user in the security account. This includes
    configuring an MFA device for your IAM user.

3. After configuring an MFA device, log out, and then log back into the security account again, this time providing your
    MFA token. If you don’t do this, attempting to assume IAM roles in other accounts won’t work, as those roles require
    an MFA token to be present.

4. Try to [switch to a role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-console.html) in
    one of the other child accounts using the AWS Web Console. For example, authenticate as one of the IAM users in the
    security account, and then assume the `allow-full-access-from-other-accounts` role in the dev account (you can find
    the default list of IAM roles created in each account
    [here](https://github.com/gruntwork-io/module-security/tree/master/modules/cross-account-iam-roles#resources-created)).

5. Alternatively, you can use the `aws-vault login xxx` command to login to the AWS Web Console for any profile `xxx`
    that you’ve configured in `aws-vault`. For example, `aws-vault login logs-from-root` will open up your web browser
    and log you into the `logs` account using the `OrganizationAccountAccessRole` IAM Role.

## Configure AWS Security Hub in the root account

Next, we’ll configure [AWS Security Hub](https://aws.amazon.com/security-hub/) in the root account. AWS Security Hub
is deployed by the account baselines in every enabled region of an AWS account to check your account [for compliance](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-standards.html)
with the AWS CIS Foundations Benchmark. The Security Hub runs the exact audit steps specified in the Benchmark using AWS
Config managed rules. _Note: Security Hub is not explicitly required by the Benchmark, however we suggest enabling it,
so you can track your compliance efforts and be notified if any recommendations have not been implemented._

In order to ensure the Security Hub dashboard shows a positive score, you will need to follow these [Manual Steps](https://gruntwork.io/guides/compliance/how-to-achieve-cis-benchmark-compliance/#identity-and-access-management-2)
to complete CIS compliance. These steps cannot be automated using AWS APIs. Additionally, in the AWS Console UI, AWS Security
Hub will show a low security score for the CIS AWS Foundations Benchmark v1.2.0. This is due to AWS limitations on
checking compliance standards for cross-region/cross-account rules. This does not indicate that the accounts are not in
compliance; it is a failure of the AWS audit tool. Note also that the accounts are configured for the latest version of
the benchmark, v1.3.0; the AWS Security Hub does not support this version at the current time.
