# Authenticate to the AWS Web Console

## Authenticate to the AWS Web Console in the security account

To authenticate to the security account, you will need to:

1. **Login URL**. This should be of the format `https://<ACCOUNT ID>.signin.aws.amazon.com/console`.
1. **IAM User Credentials**. This will consist of a username and password. See [setting up initial
   access](setting-up-initial-access) for how to create IAM users.
1. **An MFA Token**. This is something you must set up during your first login. See [configuring your IAM
   user](setting-up-initial-access#configure-your-iam-user).

Once you have these details, open your web browser to the Login URL, enter your username, password, and MFA token, and
you should be in.

## Authenticate to the AWS Web Console in all other accounts

To authenticate to any other account (e.g., dev, stage, prod), you need to:

1. [Authenticate to the security account](authenticate-to-the-aws-web-console#authenticate-to-the-aws-web-console-in-the-security-account). Since all IAM
   users are defined in this account, you must always authenticate to it first.

1. [Switching to an IAM Role in the other AWS account](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-console.html).
   To access other accounts, you "switch" to (AKA, "assume") an IAM role defined in that account: e.g., to get
   read-only access to an account, you could assume the `allow-read-only-access-from-other-accounts` IAM role. See the
   [`cross-account-iam-roles` module](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/cross-account-iam-roles#iam-roles-intended-for-human-users)
   for the default set of IAM roles that exist in each account. Note that to be able to access an IAM role `xxx` in
   some account `yyy`, your IAM user must be in an IAM group that has permissions to assume that IAM role. For example,
   to assume the `allow-read-only-access-from-other-accounts` IAM role in the prod account, you must be in the
   `_account.prod-read-only` IAM group. See [Configure other IAM users](setting-up-initial-access#configure-other-iam-users) for how you add
   users to IAM groups.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"979ec28e782e43d075a0a2ffc0e492c6"}
##DOCS-SOURCER-END -->
