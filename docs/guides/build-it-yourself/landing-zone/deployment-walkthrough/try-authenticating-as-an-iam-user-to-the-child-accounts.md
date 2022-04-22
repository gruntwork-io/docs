# Try authenticating as an IAM user to the child accounts

Now that you have IAM users in the security account and IAM roles in the other accounts, it’s time to practice
authenticating:

1. Use your IAM user’s user name and password (decrypted using keybase) to log into the web console of the security
   account (remember to use the IAM user sign-in URL for the security account).

2. Follow the steps in [Lock down the root account IAM users](lock-down-the-root-account-iam-users.md) to lock down your IAM user in the security account. This includes
   configuring an MFA device for your IAM user.

3. After configuring an MFA device, log out, and then log back into the security account again, this time providing your
   MFA token. If you don’t do this, attempting to assume IAM roles in other accounts won’t work, as those roles require
   an MFA token to be present.

4. Try to [switch to a role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-console.html) in
   one of the other child accounts using the AWS Web Console. For example, authenticate as one of the IAM users in the
   security account, and then assume the `allow-full-access-from-other-accounts` role in the dev account (you can find
   the default list of IAM roles created in each account
   [here](https://github.com/gruntwork-io/module-security/tree/master/modules/cross-account-iam-roles#resources-created)).

5. Alternatively, you can use the `aws-vault login xxx` command to login to the AWS Web Console for any profile `xxx`
   that you’ve configured in `aws-vault`. For example, `aws-vault login logs-from-root` will open up your web browser
   and log you into the logs account using the `OrganizationAccountAccessRole` IAM Role.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "35cbebd2ff2edeb050efe3fdeb75a877"
}
##DOCS-SOURCER-END -->
