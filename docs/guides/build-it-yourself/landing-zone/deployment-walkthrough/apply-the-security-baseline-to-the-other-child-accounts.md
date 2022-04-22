# Apply the security baseline to the other child accounts

Now that your security account is fully configured, you need to apply the security baseline to the remaining child
accounts (i.e., dev, stage, prod, and shared, plus sandbox and testing accounts you might have) as
detailed in the [Child accounts](../production-grade-design/child-accounts.md) section. Feel free to adjust this as necessary based on the accounts your company
needs.

The `account-baseline-app` module in the Service Catalog can be used interchangeably between app accounts and log
accounts as they deploy most of the same resources. That means this module can be re-used for all of the child
accounts.

Create `terragrunt.hcl` files in `infrastructure-live` under the file paths `<ACCOUNT>/_global/account-baseline`,
where `<ACCOUNT>` is one of these other child accounts, such as dev, stage, prod, and shared. In the rest of
this example, we’ll look solely at the stage account, but make sure you follow the analogous steps for EACH of your
child accounts.

```bash
infrastructure-live
  └ root
  └ logs
  └ securityH
  └ stage
    └ _global
      └ account-baseline
        └ terragrunt.hcl
```

Point the `source` URL in your `terragrunt.hcl` file to the [account-baseline-app](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.41.4/modules/landingzone/account-baseline-app) service in the Service Catalog.

```hcl title=infrastructure-live/stage/_global/account-baseline/terragrunt.hcl
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

```hcl title=infrastructure-live/stage/_global/account-baseline/terragrunt.hcl
include {
  path = find_in_parent_folders()
}
```

Set the variables for the `account-baseline-app` module in this environment in the `inputs = { ... }` block of `terragrunt.hcl`:

```hcl title=infrastructure-live/stage/_global/account-baseline/terragrunt.hcl
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

  # Use the S3 bucket that was already created in the logs account by account-baseline-root
  config_s3_bucket_name                            = "<CONFIG_BUCKET_NAME>"
  config_aggregate_config_data_in_external_account = true
  config_central_account_id                        = local.accounts.logs

  # Specify the services the dev IAM role will have access to
  dev_permitted_services = ["ec2", "s3", "rds", "dynamodb", "elasticache", "eks", "ecs"]

  # Specify the services the auto-deploy IAM role will have access to
  auto_deploy_permissions = ["cloudwatch:*", "logs:*", "dynamodb:*", "ecr:*", "ecs:*", "iam:GetPolicy", "iam:GetPolicyVersion", "iam:ListEntitiesForPolicy", "eks:DescribeCluster", "route53:*", "s3:*", "autoscaling:*", "elasticloadbalancing:*", "iam:GetRole", "iam:GetRolePolicy", "iam:PassRole"]

  # Allow users in the security account to access the IAM roles in this account
  allow_read_only_access_from_other_account_arns = [local.security_account_root_arn]
  allow_billing_access_from_other_account_arns   = [local.security_account_root_arn]
  allow_dev_access_from_other_account_arns       = [local.security_account_root_arn]
  allow_full_access_from_other_account_arns      = [local.security_account_root_arn]

  # A list of account root ARNs that should be able to assume the auto deploy role.
  allow_auto_deploy_from_other_account_arns = [
    # External CI/CD systems may use an IAM user in the security account to perform deployments.
    local.security_account_root_arn,

    # The shared-services account contains automation and infrastructure tools, such as CI/CD systems.
    "arn:aws:iam::${local.accounts.shared}:root",
  ]
}
```

The code above does the following:

1. **Enable CloudTrail**. We’ve configured CloudTrail to use the S3 bucket and KMS CMK in the logs account.

2. **Enable AWS Config**. We’ve configured AWS Config to use the S3 bucket in the logs account.

3. **Configure the dev IAM role**. We create a `dev` IAM role in this account, which will get read and write access to
   the services specified in `dev_permitted_services`.

4. **Configure the Auto Deploy IAM role**. We also create an `auto-deploy` IAM role that can be assumed by a CI server
   in the shared-services account to do deployments. This role will have the permissions specified in
   `auto_deploy_permissions`.

5. **Configure cross-account IAM roles**. We then specify which other accounts are allowed to assume the IAM roles in
   this account. For the most part, we grant all permissions to the security account, so that by assigning users to IAM
   groups in that account, you’ll be able to access IAM roles in all the other child accounts.

Just as with the logs and security accounts, you’re going to use the `OrganizationAccountAccessRole` IAM role created by
`account-baseline-root` to authenticate to the stage account and all other child accounts. There are many ways to
[assume an IAM role on the CLI](https://blog.gruntwork.io/a-comprehensive-guide-to-authenticating-to-aws-on-the-command-line-63656a686799);
for this guide, we’re going to keep using `aws-vault`.

Add a new `profile` entry in `~/.aws/config` for your stage account that uses the `root-iam-user` as the
`source_profile`:

```text
[profile stage-from-root]
role_arn=arn:aws:iam::<STAGE_ACCOUNT_ID>:role/OrganizationAccountAccessRole
source_profile=root-iam-user
```

Check that you’re able to authenticate to the stage account:

```bash
aws-vault exec stage-from-root -- aws sts get-caller-identity
```

You should see JSON output indicating that you’ve successfully assumed an IAM role:

```json
{
  "UserId": "AIDAXXXXXXXXXXXX:1597932316055520000",
  "Account": "<STAGE_ACCOUNT_ID>",
  "Arn": "arn:aws:sts::<STAGE_ACCOUNT_ID>:assumed-role/OrganizationAccountAccessRole/1597932316055520000"
}
```

You’re now ready to deploy the `account-baseline` module in the stage account by running `terragrunt apply`:

```bash
cd infrastructure-live/stage/_global/account-baseline
aws-vault exec stage-from-root -- terragrunt apply
```

:::caution

On some operating systems, such as MacOS, you may also need to increase your open files limit to avoid "pipe: too many open files" errors by running: `ulimit -n 10240`.

:::

Remember to repeat this process in the other child accounts too (i.e., dev, prod, shared, etc)!


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "45173e5da3f7dee7be00b3a1817b2ba5"
}
##DOCS-SOURCER-END -->
