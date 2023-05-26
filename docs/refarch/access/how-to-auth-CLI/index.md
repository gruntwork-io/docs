# Authenticate via the AWS command line interface (CLI)

CLI access requires [AWS access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html). We recommend using [aws-vault](https://github.com/99designs/aws-vault) for managing all aspects related to CLI authentication. To use `aws-vault` you will need to generate AWS Access Keys for your IAM user in the security account.

:::tip

`aws-vault` is not the only method which can be used to authenticate on the CLI. Please refer to [A Comprehensive Guide to Authenticating to AWS on the Command Line](https://blog.gruntwork.io/a-comprehensive-guide-to-authenticating-to-aws-on-the-command-line-63656a686799) for several other options.

:::

:::info

MFA is required for the Reference Architecture, including on the CLI. See [configuring your IAM user](/refarch/access/setup-auth/#configure-your-iam-user) for instructions on setting up an MFA token.

:::

## Access resources in the security account

To authenticate to the security account, you only need your AWS access keys and an MFA token. See [the guide](https://github.com/99designs/aws-vault#quick-start) on adding credentials to `aws-vault`.

You should be able to run the following command using AWS CLI

```bash
aws-vault exec <YOUR_SECURITY_ACCOUNT_PROFILE_NAME> -- aws sts get-caller-identity
```

and expect to get an output with your user's IAM role:

```json
{
    "UserId": "AIDAXXXXXXXXXXXX”,
    "Account": “<YOUR_ACCOUNT_ID>",
    "Arn": "arn:aws:iam::<YOUR_ACCOUNT_ID>:user/<your_iam_user_name>"
}
```

## Accessing all other accounts

To authenticate to all other accounts (e.g., dev, stage, prod), you will need the ARN of an IAM Role in that account to assume. To configure accessing accounts using assumed roles with `aws-vault` refer to [these instructions](https://github.com/99designs/aws-vault#roles-and-mfa).

Given the following command (where `YOUR_ACCOUNT_PROFILE_NAME` will be any account other than your security account)

```bash
aws-vault exec <YOUR_ACCOUNT_PROFILE_NAME> -- aws sts get-caller-identity
```

you should expect to see the following output:

```json
{
  "UserId": "AIDAXXXXXXXXXXXX",
  "Account": "<YOUR_ACCOUNT_ID>",
  "Arn": "arn:aws:sts::<YOUR_ACCOUNT_ID>:assumed-role/<assumed_role_name>/11111111111111111111"
}
```


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "4f4a0e2a45367a1ceb5311cc6341c87b"
}
##DOCS-SOURCER-END -->
