# Apply the security baseline to the root account

You’re now ready to apply the security baseline to the root account. You should be authenticated as the same IAM user
in the root account as in the previous two sections. To apply the security baseline, you run `terragrunt apply`:

```bash
cd infrastructure-live/root/_global/account-baseline
aws-vault exec root-iam-user -- terragrunt apply
```

:::caution

On some operating systems, such as MacOS, you may also need to increase your open files limit to avoid "pipe: too many open files" errors by running: `ulimit -n 10240`.

:::

Once `apply` completes, you should see output variables with all of your account IDs, the name of the AWS Config S3
bucket, the name of the CloudTrail S3 bucket, and the ARN of the CloudTrail KMS key:

```hcl
# (This output has been truncated to be easier to read)
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
  "shared" = {
    "email" = "root-accounts+shared@acme.com"
    "id" = "<SHARED_SERVICES_ACCOUNT_ID>"
    # (...)
  }
  "stage" = {
    "email" = "root-accounts+stage@acme.com"
    "id" = "<STAGE_ACCOUNT_ID>"
    # (...)
  }
}
cloudtrail_kms_key_arn    = "<CLOUDTRAIL_KMS_KEY_ARN>"
cloudtrail_s3_bucket_name = "<CLOUDTRAIL_BUCKET_NAME>"
config_s3_bucket_name     = "<CONFIG_BUCKET_NAME>"
```

Now, you can update the `accounts.json` file with the account IDs from the Terraform output! Also `account.hcl` files
located in each account folder (e.g., infrastructure-live/dev, infrastructure-live/shared, etc.), with the appropriate
account ID shown in the Terraform output.

Also update the entries for `cloudtrail_kms_key_arn`, `cloudtrail_s3_bucket_name`, and `config_s3_bucket_name` into your
`infrastructure-live/common.hcl` file, because you’ll need these values for every account in the steps below.

One other useful output are the encrypted passwords for IAM users you created:

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

<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"d2f718d308c8a1cdd38d628bd9181268"}
##DOCS-SOURCER-END -->
