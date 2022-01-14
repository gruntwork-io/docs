# Apply the security baseline to the logs account

The next step is to configure the logs account, which is used to aggregate AWS Config and CloudTrail data from all the
other accounts.

Create a `terragrunt.hcl` file in `infrastructure-live` under the file path `logs/_global/account-baseline`:

```bash
infrastructure-live
  └ root
  └ logs
    └ _global
      └ account-baseline
        └ terragrunt.hcl
```

Point the `source` URL in your `terragrunt.hcl` file to the [account-baseline-app](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.41.4/modules/landingzone/account-baseline-app) service in the Service Catalog.

```hcl title=infrastructure-live/logs/_global/account-baseline/terragrunt.hcl
terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/landingzone/account-baseline-app?ref=v0.41.4"

  # This module deploys some resources (e.g., AWS Config) across all AWS regions, each of which needs its own provider,
  # which in Terraform means a separate process. To avoid all these processes thrashing the CPU, which leads to network
  # connectivity issues, we limit the parallelism here.
  extra_arguments "parallelism" {
    commands  = get_terraform_commands_that_need_parallelism()
    arguments = ["-parallelism=2"]
  }
}
```

:::caution

We **strongly** recommend setting Terraform parallelism to a low value (e.g., `-parallelism=2`), as shown above, with the `account-baseline-xxx` modules. This is because these modules deploy multi-region resources (e.g., GuardDuty, AWS Config, etc), and for each region, Terraform spins up a separate process, so if you don’t limit the parallelism, it may peg all your CPU cores and lead to network connectivity errors.

:::

Include all the settings from the root terragrunt.hcl file:

```hcl title=infrastructure-live/logs/_global/account-baseline/terragrunt.hcl
include {
  path = find_in_parent_folders()
}
```

Set the variables for the `account-baseline-app` module in this environment in the `inputs = { ... }` block of `terragrunt.hcl`:

```hcl title=infrastructure-live/logs/_global/account-baseline/terragrunt.hcl
locals {
  # A local for more convenient access to the accounts map.
  accounts = local.common_vars.locals.accounts

  # A local for convenient access to the security account root ARN.
  security_account_root_arn = "arn:aws:iam::${local.accounts.security}:root"
}

inputs = {
  # Use the S3 bucket and KMS key that were already created in the logs account by account-baseline-root
  cloudtrail_s3_bucket_name = "<CLOUDTRAIL_BUCKET_NAME>"
  cloudtrail_kms_key_arn    = "<CLOUDTRAIL_KMS_KEY_ARN>"

  # All of the other accounts send logs to this account.
  cloudtrail_allow_kms_describe_key_to_external_aws_accounts = true
  cloudtrail_external_aws_account_ids_with_write_access = [
    for name, id in local.accounts :
      id if name != "logs"
  ]

  # Use the S3 bucket that was already created in the logs account by account-baseline-root
  config_s3_bucket_name                            = "<CONFIG_BUCKET_NAME>"
  config_aggregate_config_data_in_external_account = false
  config_central_account_id                        = local.accounts.logs
  config_force_destroy                             = false

  # This is the Logs account, so we create the S3 bucket and SNS topic for aggregating Config logs from all accounts.
  config_should_create_s3_bucket = true
  config_should_create_sns_topic = true

  # All of the other accounts send logs to this account.
  config_linked_accounts = [
    for name, id in local.accounts :
      id if name != "logs"
  ]

  # Allow users in the security account to assume IAM roles in this account
  allow_full_access_from_other_account_arns      = [local.security_account_root_arn]
  allow_read_only_access_from_other_account_arns = [local.security_account_root_arn]
  allow_logs_access_from_other_account_arns      = [local.security_account_root_arn]
}
```

The example above configures the logs account of an AWS Organization as follows:

1. **Aggregate CloudTrail Logs**: We configure the logs account to use the S3 bucket and KMS CMK for CloudTrail that
    were already created by `account-baseline-root`.

2. **Aggregate AWS Config**: We configure the logs account to use the S3 bucket for AWS Config that was already
    created by `account-baseline-root`.

3. **Allow access from the security account**: We configure IAM roles that IAM users in the security account will be
    able to assume to get access to the logs account.

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
role_arn=arn:aws:iam::<LOGS_ACCOUNT_ID>:role/OrganizationAccountAccessRole
source_profile=root-iam-user
```

Check that you’re able to authenticate to the logs account:

```bash
aws-vault exec logs-from-root -- aws sts get-caller-identity
```

You should see JSON output indicating that you’ve successfully assumed an IAM role:

```json
{
  "UserId": "AIDAXXXXXXXXXXXX:1597932316055520000",
  "Account": "<LOGS_ACCOUNT_ID>",
  "Arn": "arn:aws:sts::<LOGS_ACCOUNT_ID>:assumed-role/OrganizationAccountAccessRole/1597932316055520000"
}
```

You’re now ready to deploy the `account-baseline` module in the logs account by running `terragrunt apply`:

```bash
cd infrastructure-live/logs/_global/account-baseline
aws-vault exec logs-from-root -- terragrunt apply
```

:::caution

On some operating systems, such as MacOS, you may also need to increase your open files limit to avoid "pipe: too many open files" errors by running: `ulimit -n 10240`.

:::


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"5897f14941f18912553be9b56c315a44"}
##DOCS-SOURCER-END -->
