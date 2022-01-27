---
sidebar_label: Apply the account-baseline-security to the security account
---

# Apply the `account-baseline-security` to the security account

Now that your logs accounts is fully configured, you need to apply the security baseline to the security account, which
is where all your IAM users and groups will be defined and managed.

Create a `terragrunt.hcl` file in `infrastructure-live` under the file path `security/_global/account-baseline`:

```bash
infrastructure-live
  └ root
  └ logs
  └ security
    └ _global
      └ account-baseline
        └ terragrunt.hcl
```

Point the `source` URL in your `terragrunt.hcl` file to the `account-baseline-security` module in the [terraform-aws-cis-service-catalog](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog)
repo, setting the `ref` param to the version you require:

```hcl title=infrastructure-live/security/_global/account-baseline/terragrunt.hcl
terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-cis-service-catalog.git//modules/landingzone/account-baseline-security?ref=v0.27.0"
}
```

Set the variables for the `account-baseline-security` module in this environment in the `inputs = { ... }` block of `terragrunt.hcl`:

```hcl title=infrastructure-live/security/_global/account-baseline/terragrunt.hcl
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

  # This input will be generated for you with the Ref Arch or you can set it yourself too
  cross_account_groups = [
    {
      group_name    = "${local.accounts.logs}-billing-only-access",
      iam_role_arns = ["arn:aws:iam::${local.accounts.logs}:role/allow-billing-only-access-from-other-accounts"]
    },
    {
      group_name    = "${local.accounts.logs}-read-only-access",
      iam_role_arns = ["arn:aws:iam::${local.accounts.logs}:role/allow-read-only-access-from-other-accounts"]
    },
    {
      group_name    = "${local.accounts.logs}-support-access",
      iam_role_arns = ["arn:aws:iam::${local.accounts.logs}:role/allow-support-access-from-other-accounts"]
    }
  ]

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

input = {
  # You might need to provide these separately, or reference/import a file containing the values
  # account_id =
  # aws_region =

  # Prefix all resources with this name
  name_prefix = "<SOME_UNIQUE_IDENTIFIER>-security"

  # Provide the opt_in_regions for all multi-region modules
  config_opt_in_regions              = local.opt_in_regions
  guardduty_opt_in_regions           = local.opt_in_regions
  kms_cmk_opt_in_regions             = local.opt_in_regions
  ebs_opt_in_regions                 = local.opt_in_regions
  iam_access_analyzer_opt_in_regions = local.opt_in_regions
  security_hub_opt_in_regions        = local.opt_in_regions

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

  # The CloudTrail bucket is created in the logs account, so don't create it here.
  cloudtrail_s3_bucket_already_exists = true

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

  # Create groups that allow IAM users in this account to assume roles in your other AWS accounts.
  iam_groups_for_cross_account_access = local.cross_account_groups

  # Allow these accounts to have read access to IAM groups and the public SSH keys of users in the group.
  allow_ssh_grunt_access_from_other_account_arns = [
    for name, id in local.accounts :
      "arn:aws:iam::${id}:root" if name != "security"
  ]

  # A list of account root ARNs that should be able to assume the auto deploy role.
  allow_auto_deploy_from_other_account_arns = [
    # External CI/CD systems may use an IAM user in the security account to perform deployments.
    "arn:aws:iam::${local.accounts.security}:root",

    # The shared account contains automation and infrastructure tools, such as CI/CD systems.
    "arn:aws:iam::${local.accounts.shared}:root",
  ]
  auto_deploy_permissions = [
    "iam:GetRole",
    "iam:GetRolePolicy",
  ]

  # Create the IAM groups according to the CIS 1.4.0 Benchmark recommendations
  should_create_iam_group_user_self_mgmt = true
  should_create_iam_group_billing = true
  should_create_iam_group_read_only = true

  # IAM users
  users = {
    alice = {
      groups               = ["${local.accounts.logs}-billing-only-access"]
      pgp_key              = "keybase:alice_on_keybase"
      create_login_profile = true
      create_access_keys   = false
    }

    bob = {
      groups               = ["${local.accounts.logs}-read-only-access"]
      pgp_key              = "keybase:bob_on_keybase"
      create_login_profile = true
      create_access_keys   = false
    }
  }

  # Join this account to the root account's Security Hub
  security_hub_associate_to_master_account_id = local.accounts.root

  # Join this account to the root account's Amazon Macie

  # Configure Amazon Macie
  create_macie_bucket            = true
  macie_bucket_name              = "<your-macie-bucket-name>-security-macie-results"
  macie_create_kms_key           = true
  macie_kms_key_name             = "<your-macie-kms-key-name>-macie"
  macie_kms_key_users            = ["arn:aws:iam::${local.accounts.root}:root"]
  macie_opt_in_regions           = local.opt_in_regions
  macie_administrator_account_id = local.accounts.root

  # The variable below for Amazon Macie needs to be manually maintained. Please ensure you change the defaults.
  macie_buckets_to_analyze = {
    "us-east-1": ["<FILL_IN_BUCKET_1_NAME>", "<FILL_IN_BUCKET_2_NAME>"],
    "<another-region>": ["<FILL_IN_BUCKET_3_NAME>", "<FILL_IN_BUCKET_4_NAME>"]
  }
}
```

The code above does the following:

1. **Enable Guard Duty**. We’ve configured AWS Guard Duty for all enabled regions in compliance with CIS.

2. **Enable CloudTrail**. We’ve configured CloudTrail across all enabled regions to use the S3 bucket and KMS CMK in the logs account.

3. **Enable AWS Config**. We’ve configured AWS Config for all enabled regions and set it up to use the S3 bucket in the logs account.

4. **Create IAM groups**. We’ve created IAM groups, both for permissions within the security account (e.g.,
    `iam-admin` grants IAM admin permissions in the security account) and for permissions in other accounts (e.g.,
    `ssh-grunt-users` enables users to ssh into an EC2 instance running `ssh-grunt` in a any AWS Account).

5. **Create IAM users**. The example above creates IAM users for `alice`, `bob` and assigns them to
    the various IAM groups. You should create an IAM user for yourself in the `full-access` group, plus IAM users for the
    rest of your team in the appropriate groups. Like the root account, the code will also generate a password for each
    user and encrypt it with that user’s PGP key from Keybase (see below for how to handle the passwords).

6. **Create IAM Cross Account IAM roles**. We’ve configured IAM cross account IAM roles that will allow you to authenticate using the IAM users and roles in other AWS Accounts that have been configured with the Landing Zone setup shown in this guide.

7. **Create IAM User Password Policy**. We’ve configured the IAM user password policy to be compliant with CIS 1.3.

8. **Create a function to cleanup expired TLS certificates**. We’ve setup a lambda function to monitor your SSL/TLS certificates and clean them up when they’ve expired. This is enforced by CIS requirement 1.19.

9. **Enable Security Hub**. We’ve enabled Security Hub across all enabled regions. For this feature to work, the `administrator` Security Hub account (usually the Account that has the AWS Organizations, in this case `root`) will have to invite the `member` accounts, and the `member` accounts also have to accept the invitation.

10. **Enable Amazon Macie**. We’ve enabled Amazon Macie across all enabled regions. For this feature to work, the `administrator` Amazon Macie account (usually the Account that has the AWS Organizations, in this case `root`) will have to invite the `member` accounts, and the `member` accounts also have to accept the invitation.

Configure your Terraform backend:

```hcl title=infrastructure-live/security/_global/account-baseline/terragrunt.hcl
include {
  path = find_in_parent_folders()
}
```

Just as with the logs account, you’re going to use the `OrganizationAccountAccessRole` IAM role created by
`account-baseline-root` to authenticate to the security account. There are many ways to
[assume an IAM role on the CLI](https://blog.gruntwork.io/a-comprehensive-guide-to-authenticating-to-aws-on-the-command-line-63656a686799);
for this guide, we’re going to keep using `aws-vault`.

Add a new `profile` entry in `~/.aws/config` for your security account that uses the `root-iam-user` as the
`source_profile`:

```text
[profile security-from-root]
role_arn=arn:aws:iam::${local.accounts.security}:role/OrganizationAccountAccessRole
source_profile=root-iam-user
```

Check that you’re able to authenticate to the security account:

```bash
aws-vault exec security-from-root -- aws sts get-caller-identity
```

You should see JSON output indicating that you’ve successfully assumed an IAM role:

```json
{
  "UserId": "AIDAXXXXXXXXXXXX:1111111111111111111",
  "Account": "${local.accounts.security}",
  "Arn": "arn:aws:sts::${local.accounts.security}:assumed-role/OrganizationAccountAccessRole/1111111111111111111"
}
```

You’re now ready to deploy the `account-baseline` module in the security account by running `terragrunt apply`:

```bash
cd infrastructure-live/security/_global/account-baseline
aws-vault exec security-from-root -- terragrunt apply
```

:::caution

On some operating systems, such as MacOS, you may also need to increase your open files limit to avoid "pipe: too many open files" errors by running: `ulimit -n 1024`.

:::

When `apply` finishes, the module will output the encrypted passwords for the users defined above. Send the encrypted
password to each user, along with their user name, and the IAM user sign-in URL for the account. Each user can then
decrypt the password on their own computer (which should have their PGP key) as follows:

```bash
echo "<PASSWORD>" | base64 --decode | keybase pgp decrypt
```


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"f468685e4e7a3c96e847d3353bb6c680"}
##DOCS-SOURCER-END -->
