---
sidebar_label: Apply the account-baseline-app to the logs account
---

# Apply the `account-baseline-app` to the logs account

The next step is to configure the **logs** account, which is used to aggregate AWS Config, CloudTrail, IAM Access Analyzer,
Security Hub and Amazon Macie data from all the other accounts.

Create a `terragrunt.hcl` file in `infrastructure-live` under the file path `logs/_global/account-baseline`:

```
infrastructure-live
  └ root
  └ logs
    └ _global
      └ account-baseline
        └ terragrunt.hcl
```

Point the `source` URL in your `terragrunt.hcl` file to the `account-baseline-app` module in the [terraform-aws-cis-service-catalog](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog)
repo, setting the `ref` param to the version you require:

```hcl title=infrastructure-live/logs/_global/account-baseline/terragrunt.hcl
terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-cis-service-catalog.git//modules/landingzone/account-baseline-app?ref=v0.27.0"
}
```

Set the variables for the `account-baseline-app` module in this environment in the `inputs = { ... }` block of `terragrunt.hcl`:

```hcl title=infrastructure-live/logs/_global/account-baseline/terragrunt.hcl
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

  #  This is the Logs account, so we create the SNS topic for aggregating Config logs from all accounts.
  config_should_create_sns_topic = true

  # All of the other accounts send logs to this account.
  config_linked_accounts = [
  for name, id in local.accounts :
    id if name != "logs"
  ]

  ################################
  # Parameters for CloudTrail
  ################################

  # Send CloudTrail logs to the common S3 bucket.
  cloudtrail_s3_bucket_name = local.cloudtrail_s3_bucket_name

  # All of the other accounts send logs to this account.
  cloudtrail_allow_kms_describe_key_to_external_aws_accounts = true
  cloudtrail_external_aws_account_ids_with_write_access = [
  for name, id in local.accounts :
    id if name != "logs"
  ]

  # The ARN is a key ID. This variable prevents a perpetual diff when using an alias.
  cloudtrail_kms_key_arn_is_alias = false

  # By granting access to the root ARN of the Logs account, we allow administrators to further delegate to access
  # other IAM entities
  cloudtrail_kms_key_administrator_iam_arns = ["arn:aws:iam::${local.accounts.logs}:root"]
  cloudtrail_kms_key_user_iam_arns          = ["arn:aws:iam::${local.accounts.logs}:root"]

  ##################################
  # Benchmark SNS alarms configuration
  ##################################

  # Create the alarms topic in the logs account
  cloudtrail_benchmark_alarm_sns_topic_already_exists = false
  cloudtrail_benchmark_alarm_sns_topic_name           = "BenchmarkAlarmTopic"

  ##################################
  # Cross-account IAM role permissions
  ##################################

  # A role to allow users that can view and modify AWS account billing information.
  allow_billing_access_from_other_account_arns = [local.security_account_root_arn]

  # A role that allows read only access.
  allow_read_only_access_from_other_account_arns = [local.security_account_root_arn]

  # A role that allows access to support only.
  allow_support_access_from_other_account_arns = [local.security_account_root_arn]

  # Join this account to the root account's Security Hub
  security_hub_associate_to_master_account_id = local.accounts.root

  # Join this account to the root account's Amazon Macie
  macie_administrator_account_id = local.accounts.root

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

The example above configures the logs account of an AWS Organization as follows:

1. **Aggregate CloudTrail Logs**: We configure the logs account to use the S3 bucket and KMS CMK for CloudTrail that
    were already created by `account-baseline-root`.

2. **Aggregate AWS Config**: We configure the logs account to use the S3 bucket for AWS Config that was already
    created by `account-baseline-root`.

3. **Allow access from the security account**: We configure IAM roles that IAM users in the security account will be
    able to assume to get access to the logs account.

Configure your Terraform backend:

```hcl title=infrastructure-live/logs/_global/account-baseline/terragrunt.hcl
include {
  path = find_in_parent_folders()
}
```

You’re now going to use an IAM role to authenticate to the logs account. This IAM role is created automatically in each
child account by `account-baseline-root` and has a default name of `OrganizationAccountAccessRole`. There are many ways
to [assume an IAM role on the CLI](https://blog.gruntwork.io/a-comprehensive-guide-to-authenticating-to-aws-on-the-command-line-63656a686799);
for this guide, we’re going to keep using `aws-vault`.

Open up `~/.aws/config` and you should see a `profile` that was created automatically when you ran
`aws-vault add root-iam-user` earlier:

```text
[profile root-iam-user]
```

Add a new `profile` entry in `~/.aws/config` for your logs account that uses the `root-iam-user` as the
`source_profile`:

```text
[profile logs-from-root]
role_arn=arn:aws:iam::${local.accounts.logs}:role/OrganizationAccountAccessRole
source_profile=root-iam-user
```

Check that you’re able to authenticate to the logs account:

```bash
aws-vault exec logs-from-root -- aws sts get-caller-identity
```

You should see JSON output indicating that you’ve successfully assumed an IAM role:

```json
{
  "UserId": "AIDAXXXXXXXXXXXX:1111111111111111111",
  "Account": "${local.accounts.logs}",
  "Arn": "arn:aws:sts::${local.accounts.logs}:assumed-role/OrganizationAccountAccessRole/1111111111111111111"
}
```

You’re now ready to deploy the `account-baseline-app` in the logs account by running `terragrunt apply`:

```bash
cd infrastructure-live/logs/_global/account-baseline
aws-vault exec logs-from-root -- terragrunt apply
```

:::caution

On some operating systems, such as MacOS, you may also need to increase your open files limit to avoid "pipe: too many open files" errors by running: `ulimit -n 1024`.

:::


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"1e95d860557dc4159ade32bb1da1da32"}
##DOCS-SOURCER-END -->
