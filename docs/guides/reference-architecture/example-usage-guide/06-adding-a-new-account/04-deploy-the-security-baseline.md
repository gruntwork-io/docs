# Deploy the security baseline

Now that the cross account access is configured, you are ready to start provisioning the new account!

First, create a new folder for your account in `infrastructure-live`. The folder name should match the name of the AWS
account.

Once the folder is created, create the following folders and files in the new folder:

- `account.hcl` - This should have the following contents:

```hcl
locals {
  account_name = "<REPLACE_WITH_NAME_OF_ACCOUNT>"
}
```

- `_global/region.hcl` - This should have the following contents:

```hcl
# Modules in the account _global folder don't live in any specific AWS region, but you still have to send the API calls
# to _some_ AWS region, so here we pick a default region to use for those API calls.
locals {
  aws_region = "us-east-1"
}
```

Next, copy over the `account-baseline` configuration from one of the application accounts (e.g., `dev`) and place it in
the `_global` folder:

```bash
cp -r dev/_global/account-baseline <REPLACE_WITH_NAME_OF_ACCOUNT>/_global/account-baseline
```

Open the `terragrunt.hcl` file in the `account-baseline` folder and sanity check the configuration. Make sure there are
no hard coded parameters that are specific to the dev account. If you have not touched the configuration since the
Reference Architecture was deployed, you won't need to change anything.

At this point, your folder structure for the new account should look like the following:

```bash
.
└── new-account
    ├── account.hcl
    └── _global
        ├── region.hcl
        └── account-baseline
            └── terragrunt.hcl
```

Once the folder structure looks correct and you have confirmed the `terragrunt.hcl` configuration is accurate, you are
ready to deploy the security baseline. Authenticate to the new account on the CLI (see [this blog
post](https://blog.gruntwork.io/a-comprehensive-guide-to-authenticating-to-aws-on-the-command-line-63656a686799) for
instructions) using the access credentials for the temporary IAM user you created above and run `terragrunt apply`.

When running `apply`, you will see the plan for applying all the security baseline to the new account. Verify the plan
looks correct, and then approve it roll out the security baseline.

At this point, you can now use the cross account access from the `security` account to authenticate to the new account.
Use your security account IAM user to assume the `allow-full-access-from-other-accounts` IAM role in the new account to
confirm this. Refer to the [authentication section of this guide](../02-authenticate/01-intro.md) for more details on how to do
this.

Once you confirm you have access to the new account from the `security` account, login using the
`allow-full-access-from-other-accounts` IAM role and remove the temporary IAM user as you will no longer need to use it.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"6b2971383476a10a88bcaa6c38599547"}
##DOCS-SOURCER-END -->
