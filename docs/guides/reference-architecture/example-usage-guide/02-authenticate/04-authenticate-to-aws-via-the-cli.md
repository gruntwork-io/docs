# Authenticate to AWS via the CLI

A few important notes on authenticating via the CLI:

1. **You will need access keys**. See [configuring your IAM user](setting-up-initial-access#configure-your-iam-user) for instructions.

1. **You will need an MFA token**. MFA is **required** for the Reference Architecture, including on the CLI. See
   [configuring your IAM user](setting-up-initial-access#configure-your-iam-user) for instructions on setting up an MFA token.

1. **You will need to assume an IAM role in most accounts**. To authenticate to the security account, you only need
   your access keys and an MFA token. To authenticate to all other accounts (e.g., dev, stage, prod), you will need
   access keys, an MFA token, and the ARN of an IAM role in that account to assume: e.g., to get read-only access to an
   account, you could assume the `allow-read-only-access-from-other-accounts` IAM role. See the
   [`cross-account-iam-roles` module](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/cross-account-iam-roles#iam-roles-intended-for-human-users)
   for the default set of IAM roles that exist in each account. Note that to be able to access an IAM role `xxx` in
   some account `yyy`, your IAM user must be in an IAM group that has permissions to assume that IAM role. For example,
   to assume the `allow-read-only-access-from-other-accounts` IAM role in the prod account, you must be in the
   `_account.prod-read-only` IAM group. See [Configure other IAM users](setting-up-initial-access#configure-other-iam-users) for how you add
   users to IAM groups.

So how do you actually authenticate to AWS on the CLI? It turns out that there are many ways to do it, each with various
trade-offs, so check out [A Comprehensive Guide to Authenticating to AWS on
the Command Line](https://blog.gruntwork.io/a-comprehensive-guide-to-authenticating-to-aws-on-the-command-line-63656a686799)
for all the options. Our current recommendation is to use [aws-vault](https://github.com/99designs/aws-vault) for all CLI authentication.

## Using aws-vault with the Reference Architecture

We recommend [aws-vault](https://github.com/99designs/aws-vault) for its wide platform support, variety of backends, MFA support, and ease of use with the shell.

Do the following steps to configure aws-vault for use with the reference architecture:

- [Install aws-vault](https://github.com/99designs/aws-vault#installing).
- Make sure your IAM user has MFA configured, as mentioned above.
- Add your IAM user credentials:

```bash
aws-vault add security
```

- Add new profiles for each of the accounts to `~/.aws/config`. We have generated a configuration for you.

```bash
[default]
region=us-west-2

[profile security]
mfa_serial = arn:aws:iam::123456789012:mfa/gruntwork

[profile dev]
source_profile = security
mfa_serial = arn:aws:iam::123456789012:mfa/gruntwork
role_arn = arn:aws:iam::345678901234:role/allow-full-access-from-other-accounts

[profile logs]
source_profile = security
mfa_serial = arn:aws:iam::123456789012:mfa/gruntwork
role_arn = arn:aws:iam::012345678901:role/allow-full-access-from-other-accounts

[profile prod]
source_profile = security
mfa_serial = arn:aws:iam::123456789012:mfa/gruntwork
role_arn = arn:aws:iam::567890123456:role/allow-full-access-from-other-accounts


[profile shared]
source_profile = security
mfa_serial = arn:aws:iam::123456789012:mfa/gruntwork
role_arn = arn:aws:iam::234567890123:role/allow-full-access-from-other-accounts

[profile stage]
source_profile = security
mfa_serial = arn:aws:iam::123456789012:mfa/gruntwork
role_arn = arn:aws:iam::456789012345:role/allow-full-access-from-other-accounts

```

Once configured, you can use AWS vault with Terragrunt, Terraform, the AWS CLI, and anything else that uses the AWS SDK to authenticate. To check if your authentication is working, you can run `aws sts caller-identity`:

```bash
aws-vault exec dev -- aws sts get-caller-identity
```

Note that in some cases, you may need to change this to:

```bash
aws-vault exec dev --no-session -- aws sts get-caller-identity
```

This avoids using an STS session, which may lead to an error, depending on the command that you're running.

You can also use `aws-vault` to log in to the web console for each account:

```bash
aws-vault login dev --duration 8h -s
```

This will print a URL that you can paste in to a browser and be immediately logged in to the `dev` account.

Be sure to read [`USAGE.md`](https://github.com/99designs/aws-vault/blob/master/USAGE.md) for details and many helpful hints for using aws-vault.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"18111d9a15431ff8db544e24d26c278d"}
##DOCS-SOURCER-END -->
