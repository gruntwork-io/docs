# Authenticating to the AWS web console

## Authenticate to the AWS Web Console in the security account

To authenticate to the security account, you will need:

1. The login URL. This should be of the format `https://<ACCOUNT ID>.signin.aws.amazon.com/console`.
1. IAM User Credentials. This will consist of a username and password. See [setting up initial access](/refarch/access/setup-auth/) for how to create IAM users.
1. An MFA Token. This is something you must set up during your first login. See configuring your IAM user.

Once you have these details, open your web browser to the Login URL, enter your username, password, and MFA token, and you should be in.

## Authenticate to the AWS Web Console in all other accounts

To authenticate to any other account (e.g., dev, stage, prod), you need to:

1. Authenticate to the security account. Since all IAM users are defined in this account, you must always authenticate to it first.
1. [Switch to an IAM Role in the other AWS account](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-console.html). To access other accounts, you "switch" to (AKA, "assume") an IAM Role defined in that account: e.g., to get read-only access to an account, you could assume the allow-read-only-access-from-other-accounts IAM Role. See the cross-account-iam-roles module for the default set of IAM Roles that exist in each account. Note that to be able to access an IAM Role xxx in some account yyy, your IAM User must be in an IAM Group that has permissions to assume that IAM Role. For example, to assume the allow-read-only-access-from-other-accounts IAM Role in the prod account, you must be in the _account.prod-read-only IAM Group. See Configure other IAM Users for how you add users to IAM Groups.
