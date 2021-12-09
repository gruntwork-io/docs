# Deploy Landing Zone solution

## Apply the `account-baseline-root` to the root account

Configure the `account-baseline-root` for the root account

:::caution

You must be a <span className="js-subscribe-cta">Gruntwork Compliance subscriber</span> to access the Gruntwork Infrastructure as Code Library and the [CIS AWS Foundations Benchmark modules](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/).

:::

First, let’s consider the repository structure that is recommended by this guide. It is available for your reference in the `/examples/for-production` folder of the [`terraform-aws-cis-service-catalog` repository](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/tree/master/examples/for-production). Consider the following directory structure for your `infrastructure-live` repository. It showcases the configuration files for your local variables.

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

This guide will use [Terragrunt](https://github.com/gruntwork-io/terragrunt) and its associated file and folder
structure to deploy Terraform modules. Please note that **Terragrunt is NOT required for using Terraform modules from the Gruntwork Infrastructure as Code Library.** Check out [How to use the Gruntwork Infrastructure as Code Library](/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library)
for instructions on alternative options, such as how to
[deploying how to use plain terraform](/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library#deploy_using_plain_terraform).

Next, create a `terragrunt.hcl` file in `infrastructure-live`, under the file path `root/_global/account-baseline`:

    infrastructure-live
      └ root
        └ _global
          └ region.hcl
          └ account-baseline
            └ terragrunt.hcl

Point the `source` URL in your `terragrunt.hcl` file to the `account-baseline-root` module in the [terraform-aws-cis-service-catalog](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog)
repo, setting the `ref` param to the version you require:

**infrastructure-live/root/\_global/account-baseline/terragrunt.hcl**

```hcl
terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-cis-service-catalog.git//modules/landingzone/account-baseline-root?ref=v0.27.0"
}
```

Set the variables for the `account-baseline-root` module in this environment in the `inputs = { ... }` block of `terragrunt.hcl`:

**infrastructure-live/root/\_global/account-baseline/terragrunt.hcl**

```hcl
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

1.  **Create 6 child AWS accounts**. These accounts are described in more detail in the [How to configure a production-grade AWS account structure using Gruntwork AWS Landing Zone child accounts section](https://www.gruntwork.io/guides/foundations/how-to-configure-production-grade-aws-account-structure/#child_accounts).

2.  **Associate an email address with each of the child accounts**. This will be the email address for the root user of
    each account and AWS requires that the root user’s email address is _globally_ unique, so it cannot be the email
    address you used for the root account or any of the other child accounts. You’ll have to either create multiple email
    accounts in your company’s email system, or, if your company uses Gmail (perhaps as part of G Suite), you can take
    advantage of the fact that [Gmail
    ignores everything after a plus sign in an email address](https://gmail.googleblog.com/2008/03/2-hidden-ways-to-get-more-from-your.html), so that while AWS will see
    `root-accounts+security@acme.com`, `root-accounts+shared@acme.com`, and
    `root-accounts+dev@acme.com` as three unique email addresses, Gmail will see them all as the same email
    address, `root-accounts@acme.com`.

3.  **Mark one of the child accounts as a logs account**. We set `is_logs_account = true` on one of the child accounts
    to indicate it is the logs account where we will aggregate AWS Config, CloudTrail, IAM Access Analyzer, Security Hub and Amazon Macie data from all the other accounts.
    The `account-baseline-root` module will automatically create an S3 bucket for AWS Config and an S3 bucket and KMS CMK
    = for CloudTrail in this account and configure the root account to send all the AWS Config and CloudTrail data to these
    S3 buckets. Later on, you’ll configure all the other accounts to send their data to these S3 buckets too.

4.  **Create IAM groups**. By default, `account-baseline-root` will **not** create a `full-access` IAM group as CIS requirement 1.16 guides. It will create a `support` and a `billing` IAM group (for the support and finance teams).

5.  **Create IAM users**. For this example, we create `alice` and `bob`, adding `alice` to the `full-access`
    IAM group and `bob` to the `billing` IAM group. _Note_: your own IAM user (the one you created manually) should be
    in the `users` list; we’ll use the `import` command to put this user under Terraform management shortly.

6.  **Generate a password for each user**. We encrypt this password with that user’s PGP key from Keybase (we’ll come
    back to how to handle the passwords shortly).

Pull in the [backend](https://www.terraform.io/docs/backends/) settings from a root `terragrunt.hcl` file that you
`include` in each child `terragrunt.hcl`:

**infrastructure-live/root/\_global/account-baseline/terragrunt.hcl**

```hcl
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

#### Import existing resources from the root account into Terraform state

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

# ... (ommitting lots of log output for simplicity) ...

# module.root_baseline.module.iam_users.aws_iam_user.user["alice"] will be created
  + resource "aws_iam_user" "user" {
      + arn           = (known after apply)
      + id            = (known after apply)
      + name          = "alice"
      + path          = "/"
      + unique_id     = (known after apply)
    }

# ... (ommitting lots of log output for simplicity) ...

Plan: 160 to add, 0 to change, 0 to destroy.

------------------------------------------------------------------------
Note: You didn't specify an "-out" parameter to save this plan, so Terraform
can't guarantee that exactly these actions will be performed if
"terraform apply" is subsequently run.
```

This `plan` output is telling you that Terraform will create a bunch of resources, including the `aws_iam_user` named
`alice`. Of course, this user already exists, so we want to `import` the user rather than create it again. The text
next to the `#` gives you the `<ADDRESS>` to use:

    # module.root_baseline.module.iam_users.aws_iam_user.user["alice"] will be created

So the `<ADDRESS>` you want is `module.root_baseline.module.iam_users.aws_iam_user.user["alice"]`. Next, import your IAM user:

```bash
aws-vault exec root-iam-user -- terragrunt import \
  'module.root_baseline.module.iam_users.aws_iam_user.user["alice"]' \
  'alice'
```

You should see log output that looks something like this:

    [terragrunt] 2021/05/13 14:19:16 Running command: terraform import module.root_baseline.module.iam_users.aws_iam_user.user["alice"] alice
    module.root_baseline.module.iam_users.aws_iam_user.user["alice"]: Importing from ID "alice"...
    module.root_baseline.module.iam_users.aws_iam_user.user["alice"]: Import prepared!
      Prepared aws_iam_user for import
    module.root_baseline.module.iam_users.aws_iam_user.user["alice"]: Refreshing state... [id=alice]

    Import successful!

    The resources that were imported are shown above. These resources are now in
    your Terraform state and will henceforth be managed by Terraform.

You’ll now be able to manage that IAM user as code going forward!

If you created other resources manually in the root account, you may want to `import` them too, so you can manage
everything as code, and so that Terraform doesn’t try to create any duplicate resources.

#### Apply the `account-baseline-root` baseline to the root account

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

#### Reset the root user password in each child account

When creating the child accounts, you may have noticed that you provided an email address for each root user, but
confusingly, not a password. So how do you login as the root user then? It’s not obvious, but the answer is that you
[reset the root user password](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys_retrieve.html#reset-root-password),
using the "Forgot your password?" prompt on the [root user login page](https://console.aws.amazon.com/). AWS will email
you a reset link, which you can click to go to a page that will allow you to configure a password for the root user.
Use this process to reset the password for the root user of each child account you created.

#### Lock down the root user in the child accounts

Once you’re able to access the root user of each child account, you should follow the steps in [Lock down the root user](#lock_down_root_user)
for each of those child accounts—including enabling MFA and deleting the root user’s access keys—and (almost) never use
those root users again.

## Apply the `account-baseline-app` to the logs account

The next step is to configure the **logs** account, which is used to aggregate AWS Config, CloudTrail, IAM Access Analyzer,
Security Hub and Amazon Macie data from all the other accounts.

Create a `terragrunt.hcl` file in `infrastructure-live` under the file path `logs/_global/account-baseline`:

    infrastructure-live
      └ root
      └ logs
        └ _global
          └ account-baseline
            └ terragrunt.hcl

Point the `source` URL in your `terragrunt.hcl` file to the `account-baseline-app` module in the [terraform-aws-cis-service-catalog](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog)
repo, setting the `ref` param to the version you require:

**infrastructure-live/logs/\_global/account-baseline/terragrunt.hcl**

```hcl
terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-cis-service-catalog.git//modules/landingzone/account-baseline-app?ref=v0.27.0"
}
```

Set the variables for the `account-baseline-app` module in this environment in the `inputs = { ... }` block of `terragrunt.hcl`:

**infrastructure-live/logs/\_global/account-baseline/terragrunt.hcl**

```hcl
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

1.  **Aggregate CloudTrail Logs**: We configure the logs account to use the S3 bucket and KMS CMK for CloudTrail that
    were already created by `account-baseline-root`.

2.  **Aggregate AWS Config**: We configure the logs account to use the S3 bucket for AWS Config that was already
    created by `account-baseline-root`.

3.  **Allow access from the security account**: We configure IAM roles that IAM users in the security account will be
    able to assume to get access to the logs account.

Configure your Terraform backend:

**infrastructure-live/logs/\_global/account-baseline/terragrunt.hcl**

```hcl
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

## Apply the `account-baseline-security` to the security account

Now that your logs accounts is fully configured, you need to apply the security baseline to the security account, which
is where all your IAM users and groups will be defined and managed.

Create a `terragrunt.hcl` file in `infrastructure-live` under the file path `security/_global/account-baseline`:

    infrastructure-live
      └ root
      └ logs
      └ security
        └ _global
          └ account-baseline
            └ terragrunt.hcl

Point the `source` URL in your `terragrunt.hcl` file to the `account-baseline-security` module in the [terraform-aws-cis-service-catalog](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog)
repo, setting the `ref` param to the version you require:

**infrastructure-live/security/\_global/account-baseline/terragrunt.hcl**

```hcl
terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-cis-service-catalog.git//modules/landingzone/account-baseline-security?ref=v0.27.0"
}
```

Set the variables for the `account-baseline-security` module in this environment in the `inputs = { ... }` block of `terragrunt.hcl`:

**infrastructure-live/security/\_global/account-baseline/terragrunt.hcl**

```hcl
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

1.  **Enable Guard Duty**. We’ve configured AWS Guard Duty for all enabled regions in compliance with CIS.

2.  **Enable CloudTrail**. We’ve configured CloudTrail across all enabled regions to use the S3 bucket and KMS CMK in the logs account.

3.  **Enable AWS Config**. We’ve configured AWS Config for all enabled regions and set it up to use the S3 bucket in the logs account.

4.  **Create IAM groups**. We’ve created IAM groups, both for permissions within the security account (e.g.,
    `iam-admin` grants IAM admin permissions in the security account) and for permissions in other accounts (e.g.,
    `ssh-grunt-users` enables users to ssh into an EC2 instance running `ssh-grunt` in a any AWS Account).

5.  **Create IAM users**. The example above creates IAM users for `alice`, `bob` and assigns them to
    the various IAM groups. You should create an IAM user for yourself in the `full-access` group, plus IAM users for the
    rest of your team in the appropriate groups. Like the root account, the code will also generate a password for each
    user and encrypt it with that user’s PGP key from Keybase (see below for how to handle the passwords).

6.  **Create IAM Cross Account IAM roles**. We’ve configured IAM cross account IAM roles that will allow you to authenticate using the IAM users and roles in other AWS Accounts that have been configured with the Landing Zone setup shown in this guide.

7.  **Create IAM User Password Policy**. We’ve configured the IAM user password policy to be compliant with CIS 1.3.

8.  **Create a function to cleanup expired TLS certificates**. We’ve setup a lambda function to monitor your SSL/TLS certificates and clean them up when they’ve expired. This is enforced by CIS requirement 1.19.

9.  **Enable Security Hub**. We’ve enabled Security Hub across all enabled regions. For this feature to work, the `administrator` Security Hub account (usually the Account that has the AWS Organizations, in this case `root`) will have to invite the `member` accounts, and the `member` accounts also have to accept the invitation.

10. **Enable Amazon Macie**. We’ve enabled Amazon Macie across all enabled regions. For this feature to work, the `administrator` Amazon Macie account (usually the Account that has the AWS Organizations, in this case `root`) will have to invite the `member` accounts, and the `member` accounts also have to accept the invitation.

Configure your Terraform backend:

**infrastructure-live/security/\_global/account-baseline/terragrunt.hcl**

```hcl
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

## Apply the `account-baseline-app` to the other child accounts

Now that your **security** account is fully configured, you need to apply the security baseline to the remaining child
accounts (e.g., `dev`, `stage`, `prod`, `shared-services`). Feel free to adjust this as necessary based on the accounts your
company needs.

Create `terragrunt.hcl` files in `infrastructure-live` under the file paths `<ACCOUNT>/_global/account-baseline`,
where `<ACCOUNT>` is one of these other child accounts, such as `dev`, `stage`, `prod`, and `shared-services`. In the rest of
this example, we’ll look solely at the stage account, but make sure you follow the analogous steps for EACH of your
child accounts.

    infrastructure-live
      └ root
      └ logs
      └ security
      └ stage
        └ _global
          └ account-baseline
            └ terragrunt.hcl

Point the `source` URL in your `terragrunt.hcl` file to the `account-baseline-app` module in the [terraform-aws-cis-service-catalog](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog)
repo, setting the `ref` param to the version you require:

**infrastructure-live/stage/\_global/account-baseline/terragrunt.hcl**

```hcl
terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-cis-service-catalog.git//modules/landingzone/account-baseline-app?ref=v0.27.0"
}
```

Set the variables for the `account-baseline-app` module in this environment in the `inputs = { ... }` block of `terragrunt.hcl`:

**infrastructure-live/stage/\_global/account-baseline/terragrunt.hcl**

```hcl
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

1.  **Enable CloudTrail**. We’ve configured CloudTrail to use the S3 bucket and KMS CMK in the logs account.

2.  **Enable AWS Config**. We’ve configured AWS Config to use the S3 bucket in the logs account.

3.  **Configure the dev IAM role**. We create a `dev` IAM role in this account, which will get read and write access to
    the services specified in `dev_permitted_services`.

4.  **Configure the Auto Deploy IAM role**. We also create an `auto-deploy` IAM role that can be assumed by a CI server
    in the `shared-services` account to do deployments. This role will have the permissions specified in
    `auto_deploy_permissions`.

5.  **Configure cross-account IAM roles**. We then specify which other accounts are allowed to assume the IAM roles in
    this account. For the most part, we grant all permissions to the security account, so that by assigning users to IAM
    groups in that account, you’ll be able to access IAM roles in all the other child accounts.

Configure your Terraform backend:

**infrastructure-live/stage/\_global/account-baseline/terragrunt.hcl**

```hcl
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

1.  Use your IAM user’s user name and password (decrypted using keybase) to log into the web console of the security
    account (remember to use the IAM user sign-in URL for the security account).

2.  Follow the steps in [Lock down the root account IAM users](#lock_down_iam_users) to lock down your IAM user in the security account. This includes
    configuring an MFA device for your IAM user.

3.  After configuring an MFA device, log out, and then log back into the security account again, this time providing your
    MFA token. If you don’t do this, attempting to assume IAM roles in other accounts won’t work, as those roles require
    an MFA token to be present.

4.  Try to [switch to a role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-console.html) in
    one of the other child accounts using the AWS Web Console. For example, authenticate as one of the IAM users in the
    security account, and then assume the `allow-full-access-from-other-accounts` role in the dev account (you can find
    the default list of IAM roles created in each account
    [here](https://github.com/gruntwork-io/module-security/tree/master/modules/cross-account-iam-roles#resources-created)).

5.  Alternatively, you can use the `aws-vault login xxx` command to login to the AWS Web Console for any profile `xxx`
    that you’ve configured in `aws-vault`. For example, `aws-vault login logs-from-root` will open up your web browser
    and log you into the `logs` account using the `OrganizationAccountAccessRole` IAM Role.

**Configure AWS Security Hub in the root account**

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

## Use IAM roles for EC2 instances

All Gruntwork modules that require AWS API access use roles rather than an IAM user with static API credentials for
authentication. For example:

- [`terraform-aws-server`](https://github.com/gruntwork-io/terraform-aws-server/blob/master/modules/single-server/main.tf)
  is used to manage a single EC2 instance with an IAM role attached.

- [`terraform-aws-asg`](https://github.com/gruntwork-io/terraform-aws-asg) applies IAM roles to instances in auto-scaling
  group.

- [`terraform-aws-eks`](https://github.com/gruntwork-io/terraform-aws-eks/blob/master/modules/eks-cluster-workers/main.tf)
  uses IAM roles for EKS cluster workers.

- [`ecs-cluster`](https://github.com/gruntwork-io/terraform-aws-ecs/tree/master/modules/ecs-cluster) creates IAM
  roles for ECS instances

- [`lambda`](https://github.com/gruntwork-io/terraform-aws-lambda/tree/master/modules/lambda) creates IAM
  roles for Lambda functions

Use these modules whenever possible. You should always use IAM roles in your own modules any time you need to provide
access to the AWS API. Using static API credentials should be avoided whenever possible.

## Maintaining compliance by following IAM best practices

We conclude the IAM section with a few parting words of wisdom for maintaining compliance over time:

1.  Do not attach any policies without requiring MFA.

2.  Never use the `AdministratorAccess` AWS managed policy with any users, groups, or roles.

3.  Refrain from granting inline permissions or attaching managed policies directly to IAM users. Permissions
    should be granted exclusively via IAM groups and roles.

4.  Never use static IAM user access keys to allow an application to access AWS, whether that application is hosted on an EC2 instance or anywhere else!

5.  Avoid logging in as the root user. Unfortunately, there is nothing built-in to AWS to prevent use of the
    root user. It cannot be locked or removed from the account. In fact, there are
    [several tasks that require
    the use of root](https://docs.aws.amazon.com/general/latest/gr/aws_tasks-that-require-root.html). Fortunately, most of these activities are rare, so usage of the root account can be kept to
    a minimum.

## Maintaining compliance by following Storage best practices

## S3 Buckets

To make sure your S3 buckets are compliant with the benchmark, use the
[`private-s3-bucket` module](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/private-s3-bucket)
to create and manage all of your S3 buckets. This module blocks public access and enforces encryption by default. Note
that all Gruntwork modules that create S3 buckets use this module under the hood.

You can either use the `private-s3-bucket` module in your own modules, or, if you wish to deploy a standalone S3 bucket,
use the [`s3-bucket` service](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/master/modules/data-stores/s3-bucket/)
from the Gruntwork Service Catalog.

To ensure that all the data in your S3 buckets has been discovered, classified and secured, use the
[`macie` module](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/tree/master/modules/security/macie)
to monitor all your S3 buckets. Note that all the Gruntwork account baseline modules include the `macie` module under
the hood.

## Maintaining compliance by following Logging best practices

The logging section of the Benchmark includes configurations for CloudTrail, AWS Config, KMS keys, and VPC
flow logs.

## Enable key rotation for KMS keys

To make sure your KMS keys are compliant with the benchmark, use the
[`kms-master-key` module](https://github.com/gruntwork-io/terraform-aws-security/blob/master/modules/kms-master-key/README.md)
to create KMS keys with key rotation enabled by default.

<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"e0e5c449e0d95196ccbeb10441c1f0e6"}
##DOCS-SOURCER-END -->
