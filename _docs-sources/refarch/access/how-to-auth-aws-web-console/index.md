# Authenticating to the AWS web console

## Authenticate to the AWS Web Console in the security account

To authenticate to the security account, you will need:

1. IAM User Credentials. See [setting up initial access](/refarch/access/setup-auth/) for how to create IAM users.
1. An MFA Token. See [Configuring your IAM user](/refarch/access/setup-auth/#configure-your-iam-user).
1. The login URL. This should be of the format `https://<YOUR_ACCOUNT_ID>.signin.aws.amazon.com/console`.

## Authenticate to the AWS Web Console in all other accounts

To authenticate to any other account (e.g., dev, stage, prod), you need to:

1. Authenticate to the security account. All IAM users are defined in this account, you must always authenticate to it first.
1. [Assume an IAM Role in the other AWS account](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-console.html). To access other accounts, you switch to an IAM Role defined in that account.

:::note
Note that to be able to access an IAM Role in some account, your IAM User must be in an IAM Group that has permissions to assume that IAM Role.
:::

See the `cross-account-iam-roles` module for the [default set of IAM Roles](https://github.com/gruntwork-io/terraform-aws-security/blob/main/modules/cross-account-iam-roles/README.md#iam-roles-intended-for-human-users) that exist in each account. For example, to assume the allow-read-only-access-from-other-accounts IAM Role in the prod account, you must be in the \_account.prod-read-only IAM Group. See [Configure other IAM Users](/refarch/access/setup-auth/#configure-other-iam-users) for how you add users to IAM Groups.

:::note
Not all of the default roles referenced in the `cross-account-iam-roles` module are deployed in each account.
:::
