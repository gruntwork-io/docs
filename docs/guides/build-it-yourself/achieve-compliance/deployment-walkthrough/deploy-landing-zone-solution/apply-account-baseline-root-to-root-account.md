---
pagination_label: Deploy Landing Zone Solution
sidebar_label: Apply the account-baseline-root to the root account
---

# Apply the `account-baseline-root` to the root account

Configure the `account-baseline-root` for the root account

:::info

You must be a <span className="js-subscribe-cta">Gruntwork Compliance subscriber</span> to access the Gruntwork Infrastructure as Code Library and the [CIS AWS Foundations Benchmark modules](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/).

:::

First, let’s consider the repository structure that is recommended by this guide. It is available for your reference in the `/examples/for-production` folder of the [`terraform-aws-cis-service-catalog` repository](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/tree/master/examples/for-production). Consider the following directory structure for your `infrastructure-live` repository. It showcases the configuration files for your local variables.

```
.
└ infrastructure-live
    └ root
        └ account.hcl
        └ _global
            └ region.hcl
        └ us-east-1
            └ region.hcl
    └ common.hcl
    └ accounts.json
```

Each of the `region.hcl`, `accounts.hcl` and `common.hcl` should contain the relevant information, so in your modules, you’re able to reference the values like this:

```hcl
locals {
  # Automatically load common variables shared across all accounts
  common_vars = read_terragrunt_config(find_in_parent_folders("common.hcl"))

  # Automatically load account-level variables
  account_vars = read_terragrunt_config(find_in_parent_folders("account.hcl"))

  # Extract the account_name for easy access
  account_name = local.account_vars.locals.account_name

  # Automatically load region-level variables
  region_vars = read_terragrunt_config(find_in_parent_folders("region.hcl"))

  # Extract the region for easy access
  aws_region = local.region_vars.locals.aws_region
}
```

You’ll need to create these files to be able to follow the code examples following. For examples on what to put in each of these files, refer to the [`terraform-aws-cis-service-catalog` repository](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/tree/master/examples/for-production). Each of the `terragrunt.hcl` files will use the above `locals` configuration to help you avoid repetition. Note that the examples below won’t show this in the interest of clarity.

Next, we’ll configure the `account-baseline-root` with settings needed for creating all the child accounts - AWS Organizations, IAM Roles, IAM Users, IAM Groups, IAM Password Policies, Amazon GuardDuty, AWS CloudTrail, AWS Config, Security Hub and Amazon Macie.

We’ll be using the `landingzone/account-baseline-root` module from [terraform-aws-cis-service-catalog](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog).

:::info

This guide will use [Terragrunt](https://github.com/gruntwork-io/terragrunt) and its associated file and folder
structure to deploy Terraform modules. Please note that **Terragrunt is NOT required for using Terraform modules from the Gruntwork Infrastructure as Code Library.**

:::

Next, create a `terragrunt.hcl` file in `infrastructure-live`, under the file path `root/_global/account-baseline`:

```bash
  infrastructure-live
    └ root
      └ _global
        └ region.hcl
        └ account-baseline
          └ terragrunt.hcl
```

Point the `source` URL in your `terragrunt.hcl` file to the `account-baseline-root` module in the [terraform-aws-cis-service-catalog](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog)
repo, setting the `ref` param to the version you require:

```hcl title=infrastructure-live/root/_global/account-baseline/terragrunt.hcl
terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-cis-service-catalog.git//modules/landingzone/account-baseline-root?ref=v0.27.0"
}
```

Set the variables for the `account-baseline-root` module in this environment in the `inputs = { ... }` block of `terragrunt.hcl`:

```hcl title=infrastructure-live/root/_global/account-baseline/terragrunt.hcl
# ---------------------------------------------------------------------------------------------------------------------
# CONFIGURE A PROVIDER FOR EACH AWS REGION
# To deploy a multi-region module, we have to configure a provider with a unique alias for each of the regions AWS
# supports and pass all these providers to the multi-region module in a provider = { ... } block. You MUST create a
# provider block for EVERY one of these AWS regions, but you should specify the ones to use and authenticate to (the
# ones actually enabled in your AWS account) using opt_in_regions.
# ---------------------------------------------------------------------------------------------------------------------

locals {
  common_vars = read_terragrunt_config(find_in_parent_folders("common.hcl"))

  # A local for more convenient access to the accounts map.
  accounts = local.common_vars.locals.accounts

  # Both buckets will be created in the logs account by account-baseline-root
  config_s3_bucket_name     = "acme-config-bucket-logs"
  cloudtrail_s3_bucket_name = "acme-cloudtrail-logs"

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
  name_prefix = "<SOME_UNIQUE_IDENTIFIER>-root"

  # If you've already created an AWS Organization in your root account, set this to false
  create_organization = false

  # The child AWS accounts to create in this AWS organization
  child_accounts = {
    logs = {
      email = "root-accounts+logs@acme.com"

      # Mark this account as the logs account, used to aggregate all AWS Config and CloudTrail data.
      is_logs_account = true
    },
    security = {
      email = "root-accounts+security@acme.com"
    },
    shared-services = {
      email = "root-accounts+shared-services@acme.com"
    },
    dev = {
      email = "root-accounts+dev@acme.com"
    },
    stage = {
      email = "root-accounts+stage@acme.com"
    },
    prod = {
      email = "root-accounts+prod@acme.com"
    }
  }

  # The IAM users to create in this account. Since this is the root account, you should only create IAM users for a
  # small handful of trusted admins.
  #
  # NOTE: Make sure to include the IAM user you created manually here! We'll import the user into Terraform state in
  # the next step of this guide, allowing you to manage this user as code going forward.
  users = {
    alice = {
      groups               = ["support"]
      pgp_key              = "keybase:alice"
      create_login_profile = true
      create_access_keys   = false
    },
    bob = {
      groups               = ["billing"]
      pgp_key              = "keybase:bob"
      create_login_profile = true
      create_access_keys   = false
    }
  }

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

  # The ARN is a key ID. This variable prevents a perpetual diff when using an alias.
  cloudtrail_kms_key_arn_is_alias = false

  ##################################
  # Cross-account IAM role permissions
  ##################################

  # By granting access to the root ARN of the Security account in each of the roles below,
  # we allow administrators to further delegate access to other IAM entities

  # Assuming the developers role will grant access to these services.
  dev_permitted_services = [
    "ec2",
    "ecs",
    "lambda",
    "rds",
    "elasticache",
    "route53",
  ]

  # Assuming the auto-deploy role will grant access to these services.
  auto_deploy_permissions = [
    "iam:GetRole",
    "iam:GetRolePolicy",
  ]

  # Join this account to the root account's Security Hub
  security_hub_associate_to_master_account_id = local.accounts.root

  # Configure opt in regions for each multi region service based on locally configured setting.
  config_opt_in_regions              = local.opt_in_regions
  guardduty_opt_in_regions           = local.opt_in_regions
  kms_cmk_opt_in_regions             = local.opt_in_regions
  iam_access_analyzer_opt_in_regions = local.opt_in_regions
  ebs_opt_in_regions                 = local.opt_in_regions
  security_hub_opt_in_regions        = local.opt_in_regions

  # Configures Amazon Macie
  create_macie_bucket      = true
  macie_bucket_name        = "<your-macie-bucket-name>-root-macie-results"
  macie_create_kms_key     = true
  macie_kms_key_name       = "<your-macie-kms-key-name>-macie"
  macie_kms_key_users      = ["arn:aws:iam::${local.accounts.root}:root"]
  macie_opt_in_regions     = local.opt_in_regions

  # The variable below for Amazon Macie needs to be manually maintained. Please ensure you change the defaults.
  macie_buckets_to_analyze = {
    "us-east-1": ["<FILL_IN_BUCKET_1_NAME>", "<FILL_IN_BUCKET_2_NAME>"],
    "<another-region>": ["<FILL_IN_BUCKET_3_NAME>", "<FILL_IN_BUCKET_4_NAME>"]
  }
}
```

The example code above does the following:

1. **Create 6 child AWS accounts**. These accounts are described in more detail in the [How to configure a production-grade AWS account structure using Gruntwork AWS Landing Zone child accounts section](https://www.gruntwork.io/guides/foundations/how-to-configure-production-grade-aws-account-structure/#child_accounts).

2. **Associate an email address with each of the child accounts**. This will be the email address for the root user of
   each account and AWS requires that the root user’s email address is _globally_ unique, so it cannot be the email
   address you used for the root account or any of the other child accounts. You’ll have to either create multiple email
   accounts in your company’s email system, or, if your company uses Gmail (perhaps as part of G Suite), you can take
   advantage of the fact that [Gmail
   ignores everything after a plus sign in an email address](https://gmail.googleblog.com/2008/03/2-hidden-ways-to-get-more-from-your.html), so that while AWS will see
   `root-accounts+security@acme.com`, `root-accounts+shared@acme.com`, and
   `root-accounts+dev@acme.com` as three unique email addresses, Gmail will see them all as the same email
   address, `root-accounts@acme.com`.

3. **Mark one of the child accounts as a logs account**. We set `is_logs_account = true` on one of the child accounts
   to indicate it is the logs account where we will aggregate AWS Config, CloudTrail, IAM Access Analyzer, Security Hub and Amazon Macie data from all the other accounts.
   The `account-baseline-root` module will automatically create an S3 bucket for AWS Config and an S3 bucket and KMS CMK
   = for CloudTrail in this account and configure the root account to send all the AWS Config and CloudTrail data to these
   S3 buckets. Later on, you’ll configure all the other accounts to send their data to these S3 buckets too.

4. **Create IAM groups**. By default, `account-baseline-root` will **not** create a `full-access` IAM group as CIS requirement 1.16 guides. It will create a `support` and a `billing` IAM group (for the support and finance teams).

5. **Create IAM users**. For this example, we create `alice` and `bob`, adding `alice` to the `full-access`
   IAM group and `bob` to the `billing` IAM group. _Note_: your own IAM user (the one you created manually) should be
   in the `users` list; we’ll use the `import` command to put this user under Terraform management shortly.

6. **Generate a password for each user**. We encrypt this password with that user’s PGP key from Keybase (we’ll come
   back to how to handle the passwords shortly).

Pull in the [backend](https://www.terraform.io/docs/backends/) settings from a root `terragrunt.hcl` file that you
`include` in each child `terragrunt.hcl`:

```hcl title=infrastructure-live/root/_global/account-baseline/terragrunt.hcl
include {
  path = find_in_parent_folders()
}
```

Next, you need to authenticate as your IAM user in the root account. There are
[multiple ways to authenticate to AWS on the CLI](https://blog.gruntwork.io/a-comprehensive-guide-to-authenticating-to-aws-on-the-command-line-63656a686799);
in this guide, we’ll use the open source tool [aws-vault](https://github.com/99designs/aws-vault).
[Install aws-vault](https://github.com/99designs/aws-vault#installing) and add to it the Access Keys you saved earlier
from your IAM user:

```bash
$ aws-vault add root-iam-user
Enter Access Key Id: XXXXXXXXXXXX
Enter Secret Key: YYYYYYYYYYYY
```

You should also enable MFA for the IAM user ([see the AWS docs on enabling a virtual MFA device](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html))) and add the configuration to your profile as follows:

```bash
mfa_serial=arn:aws:iam::${local.accounts.root}:mfa/<YOUR_IAM_USER>
```

Next, [install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html), and check that
authentication is working:

```bash
aws-vault exec root-iam-user -- aws sts get-caller-identity
```

You should get JSON output with information about your IAM user:

```json
{
  "UserId": "AIDAXXXXXXXXXXXX",
  "Account": "${local.accounts.root}",
  "Arn": "arn:aws:iam::${local.accounts.root}:user/<YOUR_IAM_USER>"
}
```

You’re now almost ready to deploy the `account-baseline` module in the root account. But first, you may need to import
some existing resources.

## Import existing resources from the root account into Terraform state

Before applying the security baseline to the root account, we need to import any existing resources—including the IAM
user you created manually earlier—into Terraform state, so that Terraform manages those existing resources instead of
trying to create totally new ones. You can do this using the
[`import` command](https://www.terraform.io/docs/import/index.html), which uses the format:

```bash
terraform import <ADDRESS> <ID>
```

Where `<ADDRESS>` is the [address](https://www.terraform.io/docs/internals/resource-addressing.html) of the Terraform
resource you’re importing and `<ID>` is a resource-specific identifier (e.g., for `aws_instance`, it’s the instance ID,
whereas for `aws_lb`, it’s the load balancer’s name—check the docs for the resource to find out what to use).

Let’s import the IAM user you created manually in the root account. IAM users are managed using the
`aws_iam_user` resource, and the
[documentation for that
resource](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_user#import) tells us to use the user’s `name` as the `<ID>`; we’ll assume for this example that your IAM user’s name was
`alice`, who is already one of the entries in the `users` variable in `terragrunt.hcl`. So now we need the `<ADDRESS>`.
An easy way to get it is to run `plan`:

```bash
cd infrastructure-live/root/_global/account-baseline
aws-vault exec root-iam-user -- terragrunt plan
```

You should get a whole bunch of log output, including something that looks like this:

```bash
------------------------------------------------------------------------
An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create
  <= read (data resources)

Terraform will perform the following actions:

# ... (omitting lots of log output for simplicity) ...

# module.root_baseline.module.iam_users.aws_iam_user.user["alice"] will be created
  + resource "aws_iam_user" "user" {
      + arn           = (known after apply)
      + id            = (known after apply)
      + name          = "alice"
      + path          = "/"
      + unique_id     = (known after apply)
    }

# ... (omitting lots of log output for simplicity) ...

Plan: 160 to add, 0 to change, 0 to destroy.

------------------------------------------------------------------------
Note: You didn't specify an "-out" parameter to save this plan, so Terraform
can't guarantee that exactly these actions will be performed if
"terraform apply" is subsequently run.
```

This `plan` output is telling you that Terraform will create a bunch of resources, including the `aws_iam_user` named
`alice`. Of course, this user already exists, so we want to `import` the user rather than create it again. The text
next to the `#` gives you the `<ADDRESS>` to use:

```bash
# module.root_baseline.module.iam_users.aws_iam_user.user["alice"] will be created
```

So the `<ADDRESS>` you want is `module.root_baseline.module.iam_users.aws_iam_user.user["alice"]`. Next, import your IAM user:

```bash
aws-vault exec root-iam-user -- terragrunt import \
  'module.root_baseline.module.iam_users.aws_iam_user.user["alice"]' \
  'alice'
```

You should see log output that looks something like this:

```bash
[terragrunt] 2021/05/13 14:19:16 Running command: terraform import module.root_baseline.module.iam_users.aws_iam_user.user["alice"] alice
module.root_baseline.module.iam_users.aws_iam_user.user["alice"]: Importing from ID "alice"...
module.root_baseline.module.iam_users.aws_iam_user.user["alice"]: Import prepared!
  Prepared aws_iam_user for import
module.root_baseline.module.iam_users.aws_iam_user.user["alice"]: Refreshing state... [id=alice]

Import successful!
```

The resources that were imported are shown above. These resources are now in
your Terraform state and will henceforth be managed by Terraform.

You’ll now be able to manage that IAM user as code going forward!

If you created other resources manually in the root account, you may want to `import` them too, so you can manage
everything as code, and so that Terraform doesn’t try to create any duplicate resources.

## Apply the `account-baseline-root` baseline to the root account

You’re now ready to apply the security baseline to the root account. You should be authenticated as the same IAM user
in the root account as in the previous two sections. To apply the security baseline, you run `terragrunt apply`:

```bash
cd infrastructure-live/root/_global/account-baseline
aws-vault exec root-iam-user -- terragrunt apply
```

:::caution

On some operating systems, such as MacOS, you may also need to increase your open files limit to avoid "pipe: too many open files" errors by running: `ulimit -n 1024`.

:::

Once `apply` completes, you should see output variables with all of your account IDs, the name of the AWS Config S3
bucket, the name of the CloudTrail S3 bucket, and the ARN of the CloudTrail KMS key:

```hcl
# (this output has been edited to be easier to read)
child_accounts = {
  "dev" = {
    "email" = "root-accounts+dev@acme.com"
    "id" = "<DEV_ACCOUNT_ID>"
    # (...)
  }
  "logs" = {
    "email" = "root-accounts+logs@acme.com"
    "id" = "<LOGS_ACCOUNT_ID>"
    # (...)
  }
  "prod" = {
    "email" = "root-accounts+prod@acme.com"
    "id" = "<PROD_ACCOUNT_ID>"
    # (...)
  }
  "security" = {
    "email" = "root-accounts+security@acme.com"
    "id" = "<SECURITY_ACCOUNT_ID>"
    # (...)
  }
  "shared-services" = {
    "email" = "root-accounts+shared-services@acme.com"
    "id" = "<SHARED_SERVICES_ACCOUNT_ID>"
    # (...)
  }
  "stage" = {
    "email" = "root-accounts+stage@acme.com"
    "id" = "<STAGE_ACCOUNT_ID>"
    # (...)
  }
}
cloudtrail_kms_key_arn          = "<CLOUDTRAIL_KMS_KEY_ARN>"
cloudtrail_s3_bucket_name       = "<CLOUDTRAIL_BUCKET_NAME>"
config_s3_bucket_name           = "<CONFIG_BUCKET_NAME>"
cloudtrail_cloudwatch_group_arn = "<CLOUDWATCH_GROUP_ARN>"
```

If you followed the [steps for preparing your `infrastructure-live` repo](http://gruntwork.io/guides/foundations/how-to-configure-production-grade-aws-account-structure/#prepare-your-infrastructure-live-repository), now you can update the `account.hcl` with the account IDs from the Terraform output! If you are instead making use of `account.hcl` files (located in each account folder (e.g., `infrastructure-live/dev`, `infrastructure-live/shared`, etc.), update them too with the
appropriate account ID shown in the Terraform output, so they look like:

```hcl
locals {
  account_name = "<REPLACE_WITH_NAME_OF_ACCOUNT>"
  account_id = "<REPLACE_WITH_ID_OF_ACCOUNT>"
}
```

```json
{
  "account_name": "<REPLACE_WITH_ID_OF_ACCOUNT>"
}
```

Note that we haven’t specified any region here so far. If you’re following the guide on how to prepare your `infrastructure-live` repo, you might have created previously files called `region.hcl` like below:

```hcl
# Common variables for this region
locals {
  # Automatically load common variables shared across all accounts
  common_vars = read_terragrunt_config(find_in_parent_folders("common.hcl"))

  # Automatically load account-level variables
  account_vars = read_terragrunt_config(find_in_parent_folders("account.hcl"))

  aws_region   = "us-west-2"
  state_bucket = "${local.common_vars.locals.name_prefix}-${local.account_vars.locals.account_name}-${local.aws_region}-tf-state"
}
```

Alternatively, you can add to your locals where necessary the following line, containing your choice of AWS regions:

```hcl
  aws_region   = "us-west-2"
```

Similarly, you will need to use the `common.hcl` file to store some terraform output values too. We will be needing throughout the rest of this guide the following values: `cloudtrail_s3_bucket_name`, `config_s3_bucket_name`, `cloudtrail_kms_key_arn`, `cloudtrail_cloudwatch_group_arn`, and the encrypted passwords for IAM users you created:

```hcl
user_passwords = {
  "alice" = "wcBMA7E6Kn/t1YPfAQgAVSXlUzumcs4UyO8E5q099YnnU="
  "bob" = "wcBMA7E6Kn/t1YPfAQgACgbdb1mYtQx7EL4hnVWtYAi="
}
```

Send the encrypted password to each user, along with their user name, and the IAM user sign-in URL for the root account.
Each user can then decrypt the password on their own computer (which should have their PGP key) as follows:

```bash
echo "<PASSWORD>" | base64 --decode | keybase pgp decrypt
```

## Reset the root user password in each child account

When creating the child accounts, you may have noticed that you provided an email address for each root user, but
confusingly, not a password. So how do you login as the root user then? It’s not obvious, but the answer is that you
[reset the root user password](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys_retrieve.html#reset-root-password),
using the "Forgot your password?" prompt on the [root user login page](https://console.aws.amazon.com/). AWS will email
you a reset link, which you can click to go to a page that will allow you to configure a password for the root user.
Use this process to reset the password for the root user of each child account you created.

## Lock down the root user in the child accounts

Once you’re able to access the root user of each child account, you should follow the steps in [Lock down the root user](../lock-down-the-root-user.md)
for each of those child accounts—including enabling MFA and deleting the root user’s access keys—and (almost) never use
those root users again.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "85c7d13e3ed847c86ba58be0abf99398"
}
##DOCS-SOURCER-END -->
