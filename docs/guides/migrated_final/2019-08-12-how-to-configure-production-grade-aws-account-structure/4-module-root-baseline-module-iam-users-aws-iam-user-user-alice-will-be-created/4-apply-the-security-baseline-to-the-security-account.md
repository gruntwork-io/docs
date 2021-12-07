## Apply the security baseline to the security account

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

Point the `source` URL in your `terragrunt.hcl` file to the [account-baseline-security](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.41.4/modules/landingzone/account-baseline-security) service in the Service Catalog.

**infrastructure-live/security/\_global/account-baseline/terragrunt.hcl**

```hcl
terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/landingzone/account-baseline-security?ref=v0.41.4"

  # This module deploys some resources (e.g., AWS Config) across all AWS regions, each of which needs its own provider,
  # which in Terraform means a separate process. To avoid all these processes thrashing the CPU, which leads to network
  # connectivity issues, we limit the parallelism here.
  extra_arguments "parallelism" {
    commands  = get_terraform_commands_that_need_parallelism()
    arguments = ["-parallelism=2"]
  }
}
```

We **strongly** recommend setting Terraform parallelism to a low value (e.g., `-parallelism=2`), as shown above, with the `account-baseline-xxx` modules. This is because these modules deploy multi-region resources (e.g., GuardDuty, AWS Config, etc), and for each region, Terraform spins up a separate process, so if you don’t limit the parallelism, it may peg all your CPU cores and lead to network connectivity errors.

Include all the settings from the root terragrunt.hcl file:

**infrastructure-live/security/\_global/account-baseline/terragrunt.hcl**

```hcl
include {
  path = find_in_parent_folders()
}
```

Set the variables for the `account-baseline-security` module in this environment in the `inputs = { ... }` block of `terragrunt.hcl`:

**infrastructure-live/security/\_global/account-baseline/terragrunt.hcl**

```hcl
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
  config_s3_bucket_name     = "<CONFIG_BUCKET_NAME>"
  config_central_account_id = local.accounts.logs

  # Enable the IAM groups you want
  should_create_iam_group_full_access    = true
  should_create_iam_group_read_only      = true
  should_create_iam_group_user_self_mgmt = true

  # Configure the names for IAM groups
  iam_group_name_full_access            = "full-access"
  iam_group_name_read_only              = "read-only"
  iam_group_name_iam_user_self_mgmt     = "iam-user-self-mgmt"
  iam_group_names_ssh_grunt_sudo_users  = ["ssh-grunt-sudo-users"]
  iam_group_names_ssh_grunt_users       = ["ssh-grunt-users"]

  # Create IAM groups that grant access to the other AWS accounts
  iam_groups_for_cross_account_access = [
    {
      group_name    = "_account.stage-full-access",
      iam_role_arns = ["arn:aws:iam::${locals.accounts.stage}:role/allow-full-access-from-other-accounts"]
    },
    {
      group_name    = "_account.stage-read-only",
      iam_role_arns = ["arn:aws:iam::${locals.accounts.stage}:role/allow-read-only-access-from-other-accounts"]
    },
    {
      group_name    = "_account.stage-dev",
      iam_role_arns = ["arn:aws:iam::${locals.accounts.stage}:role/allow-dev-access-from-other-accounts"]
    },
    {
      group_name    = "_account.stage-openvpn-admins",
      iam_role_arns = ["arn:aws:iam::${locals.accounts.stage}:role/openvpn-allow-certificate-revocations-for-external-accounts"]
    },
    {
      group_name    = "_account.stage-openvpn-users",
      iam_role_arns = ["arn:aws:iam::${locals.accounts.stage}:role/openvpn-allow-certificate-requests-for-external-accounts"]
    },

    # ... Repeat the same set of groups for each of dev, prod, logs, and shared services account IDs too!
  ]

  # Create all the IAM users for your company and assign them to IAM groups
  users = {
    alice = {
      groups               = ["iam-user-self-mgmt", "ssh-grunt-sudo-users", "_account.dev-full-access"]
      pgp_key              = "keybase:alice_on_keybase"
      create_login_profile = true
      create_access_keys   = false
    }

    bob = {
      groups               = ["iam-user-self-mgmt", "_account.dev-full-access", "_account.prod-read-only"]
      pgp_key              = "keybase:bob_on_keybase"
      create_login_profile = true
      create_access_keys   = false
    }
    carol = {
      groups               = ["iam-user-self-mgmt", "full-access"]
      pgp_key              = "keybase:carol_on_keybase"
      create_login_profile = true
      create_access_keys   = true
    }
  }

  # Allow accounts to have read access to IAM groups and the public SSH keys of users in the group.
  allow_ssh_grunt_access_from_other_account_arns = [
    for name, id in local.accounts :
      "arn:aws:iam::${id}:root" if name != "security"
  ]
}
```

The code above does the following:

1.  **Enable CloudTrail**. We’ve configured CloudTrail to use the S3 bucket and KMS CMK in the logs account.

2.  **Enable AWS Config**. We’ve configured AWS Config to use the S3 bucket in the logs account.

3.  **Create IAM groups**. We’ve created IAM groups, both for permissions within the security account (e.g.,
    `full-access` grants admin permissions in the security account) and for permissions in other accounts (e.g.,
    `_account.stage-full-access` grants access to an IAM role with admin permissions in the stage account). Be sure to
    fill out the section for permissions in dev, prod, logs, and shared-services accounts.

4.  **Create IAM users**. The example above creates IAM users for `alice`, `bob`, and `carol`, and assigns them to
    the various IAM groups. You should create an IAM user for yourself in the `full-access` group, plus IAM users for the
    rest of your team in the appropriate groups. Like the root account, the code will also generate a password for each
    user and encrypt it with that user’s PGP key from Keybase (see below for how to handle the passwords).

Just as with the logs account, you’re going to use the `OrganizationAccountAccessRole` IAM role created by
`account-baseline-root` to authenticate to the security account. There are many ways to
[assume an IAM role on the CLI](https://blog.gruntwork.io/a-comprehensive-guide-to-authenticating-to-aws-on-the-command-line-63656a686799);
for this guide, we’re going to keep using `aws-vault`.

Add a new `profile` entry in `~/.aws/config` for your security account that uses the `root-iam-user` as the
`source_profile`:

```text
[profile security-from-root]
role_arn=arn:aws:iam::<SECURITY_ACCOUNT_ID>:role/OrganizationAccountAccessRole
source_profile=root-iam-user
```

Check that you’re able to authenticate to the security account:

```bash
aws-vault exec security-from-root -- aws sts get-caller-identity
```

You should see JSON output indicating that you’ve successfully assumed an IAM role:

```json
{
  "UserId": "AIDAXXXXXXXXXXXX:1597932316055520000",
  "Account": "<SECURITY_ACCOUNT_ID>",
  "Arn": "arn:aws:sts::<SECURITY_ACCOUNT_ID>:assumed-role/OrganizationAccountAccessRole/1597932316055520000"
}
```

You’re now ready to deploy the `account-baseline` module in the security account by running `terragrunt apply`:

```bash
cd infrastructure-live/security/_global/account-baseline
aws-vault exec security-from-root -- terragrunt apply
```

On some operating systems, such as MacOS, you may also need to increase your open files limit to avoid "pipe: too many open files" errors by running: `ulimit -n 10240`.

When `apply` finishes, the module will output the encrypted passwords for the users defined above. Send the encrypted
password to each user, along with their user name, and the IAM user sign-in URL for the account. Each user can then
decrypt the password on their own computer (which should have their PGP key) as follows:

```bash
echo "<PASSWORD>" | base64 --decode | keybase pgp decrypt
```



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"41e58ca68ecf93ace343dcbee052b0e6"}
##DOCS-SOURCER-END -->
