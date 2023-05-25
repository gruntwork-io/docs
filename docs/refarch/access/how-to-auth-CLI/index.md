# Authenticate via the AWS command line interface (CLI)

A few important notes on authenticating via the CLI:

1. You will need access keys. See [configuring your IAM user](../setup-auth/#step-2-configure-your-iam-user) for instructions.
1. You will need an MFA token. MFA is required for the Reference Architecture, including on the CLI. See [configuring your IAM user](../setup-auth/#step-2-configure-your-iam-user) for instructions on setting up an MFA token.
1. You will need to assume an IAM Role in most accounts. To authenticate to the security account, you only need your access keys and an MFA token. To authenticate to all other accounts (e.g., dev, stage, prod), you will need access keys, an MFA token, and the ARN of an IAM Role in that account to assume: e.g., to get read-only access to an account, you could assume the `allow-read-only-access-from-other-accounts` IAM Role. See the `cross-account-iam-roles` module for the default set of IAM Roles that exist in each account. Note that to be able to access an IAM Role xxx in some account yyy, your IAM User must be in an IAM Group that has permissions to assume that IAM Role. For example, to assume the `allow-read-only-access-from-other-accounts` IAM Role in the prod account, you must be in the `_account.prod-read-only` IAM Group. See [Configure other IAM users](../setup-auth/#step-3-configure-other-iam-users) for how you add users to IAM Groups.

So how do you actually authenticate to AWS on the CLI? It turns out that there are many ways to do it, each with various trade-offs, so check out [A Comprehensive Guide to Authenticating to AWS on the Command Line](https://blog.gruntwork.io/a-comprehensive-guide-to-authenticating-to-aws-on-the-command-line-63656a686799) for all the options. Our current recommendation is to use [aws-vault](https://github.com/99designs/aws-vault) for all CLI authentication.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "d9939ab3943b8f028e30cb6388127484"
}
##DOCS-SOURCER-END -->
