# Configure the security baseline for the root account

Next, we’ll configure a security baseline for the root account that is responsible for creating all the child accounts.
It will also configure AWS Organizations, IAM Roles, IAM Users, IAM Groups, IAM Password Policies, Amazon GuardDuty,
AWS CloudTrail, and AWS Config.

We’ll be using the `account-baseline-root` module from [terraform-aws-service-catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog).

:::caution

You must be a <span className="js-subscribe-cta">Gruntwork subscriber</span> to access `terraform-aws-service-catalog`.

:::

## Set up the inputs for `account-baseline` for the root account

Next, create a `terragrunt.hcl` file in `infrastructure-live`. It should go under the file path `root/_global/account-baseline`:

```bash
infrastructure-live
  └ root
    └ _global
      └ account-baseline
        └ terragrunt.hcl
```

Define the `terraform` block with the source pointing to the [terraform-aws-service-catalog account-baseline-root](https://github.com/gruntwork-io/terraform-aws-service-catalog) module.

```hcl title=infrastructure-live/root/_global/account-baseline/terragrunt.hcl
terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/landingzone/account-baseline-root?ref=v0.41.4"

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

We **strongly** recommend setting Terraform parallelism to a low value (i.e., `-parallelism=2`), as shown above, with the `account-baseline-xxx` modules. This is because these modules deploy multi-region resources (e.g., GuardDuty, AWS Config, etc), and for each region, Terraform spins up a separate process, so if you don’t limit the parallelism, it may peg all your CPU cores and lead to network connectivity errors.

:::

Set the variables for the `account-baseline-root` module in this environment in the `inputs = { ... }` block.

```hcl title=infrastructure-live/root/_global/account-baseline/terragrunt.hcl
inputs = {
  # If you've already created an AWS Organization in your root account, you'll be able to import it later in this guide
  create_organization = true

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
    shared = {
      email = "root-accounts+shared@acme.com"
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
      groups               = ["full-access"]
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
}
```

The example code above does the following:

1. **Create 6 child AWS accounts**. These are the accounts described in the [Child accounts](../production-grade-design/child-accounts.md) sections.

2. **Associate an email address with each of the child accounts**. This will be the email address for the root user of
   each account and AWS requires that the root user’s email address is _globally_ unique, so it cannot be the email
   address you used for the root account or any of the other child accounts. You’ll have to either create multiple email
   accounts in your company’s email system, or, if your company uses Gmail (perhaps as part of G Suite), you can take
   advantage of the fact that [Gmail
   ignores everything after a plus sign in an email address](https://gmail.googleblog.com/2008/03/2-hidden-ways-to-get-more-from-your.html), so that while AWS will see
   `root-accounts+security@your-company.com`, `root-accounts+shared@your-company.com`, and
   `root-accounts+dev@your-company.com` as three unique email addresses, Gmail will see them all as the same email
   address, `root-accounts@your-company.com`.

3. **Mark one of the child accounts as a logs account**. We set `is_logs_account = true` on one of the child accounts
   to indicate it is the logs account where we will aggregate AWS Config and CloudTrail data from all the other accounts.
   The `account-baseline-root` module will automatically create an S3 bucket for AWS Config and an S3 bucket and KMS CMK
   for CloudTrail in this account and configure the root account to send all the AWS Config and CloudTrail data to these
   S3 buckets. Later on, you’ll configure all the other accounts to send their data to these S3 buckets too.

4. **Create IAM groups**. By default, `account-baseline-root` will create a `full-access` IAM group (for admins) and a
   `billing` IAM group (for the finance team).

5. **Create IAM users**. For this example, we create `alice` and `bob`, and `carol`, adding `alice` to the `full-access`
   IAM group and `carol` to the `billing` IAM group. _Note_: your own IAM user (the one you created manually) should be
   in the `users` list; we’ll use the `import` command to put this user under Terraform management shortly.

6. **Generate a password for each user**. We encrypt this password with that user’s PGP key from Keybase (we’ll come
   back to how to handle the passwords shortly).

Pull in the [backend](https://www.terraform.io/docs/backends/) settings from a root `terragrunt.hcl` file that you
`include` in each child `terragrunt.hcl`. The file you created earlier in `infrastructure-live/terragrunt.hcl` will be pulled.

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

Next, [install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html), and check that
authentication is working:

```bash
aws-vault exec root-iam-user -- aws sts get-caller-identity
```

You should get JSON output with information about your IAM user:

```json
{
  "UserId": "AIDAXXXXXXXXXXXX",
  "Account": "<ROOT_ACCOUNT_ID>",
  "Arn": "arn:aws:iam::<ROOT_ACCOUNT_ID>:user/<YOUR_IAM_USER>"
}
```

You’re now almost ready to deploy the `account-baseline` module in the root account. But first, let’s import the IAM user
and any other existing resources.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"30683ab11accc62e34aedda01ae175a3"}
##DOCS-SOURCER-END -->
