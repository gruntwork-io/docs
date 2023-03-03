# Setting up initial access

If this is the first time you're using this infrastructure—that is, if the Gruntwork team just deployed a [Reference
Architecture](https://gruntwork.io/reference-architecture/) for you, and handed it over—this section will walk you
through the initial setup steps:

## Configure root users

Each of your AWS accounts has a [root user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html) that
you need to configure. When you created the child AWS accounts(dev, stage, prod, etc), you provided the root user's
email address for each account; if you don't know what those email addresses were, you can login to the root account
(the parent of the AWS Organization) and go to the [AWS Organizations
Console](https://console.aws.amazon.com/organizations/home) to find the email addresses.

Once you have the email addresses, you'll need the passwords. Oddly, when you create child accounts in an AWS
organization, AWS does _not_ allow you to set those passwords. So, to get the passwords, you will need to:

1. Go to the [AWS Console](https://console.aws.amazon.com/console/home).
2. If you are already signed in to some other AWS account, sign out, and return to the [AWS
   Console](https://console.aws.amazon.com/console/home) again.
3. If you had previously signed into some other AWS account as an IAM user, rather than a root user, click "Sign-in
   using root account credentials."
4. Enter the email address of the root user.
5. Click "Forgot your password" to reset the password.
6. Check the email address associated with the root user account for a link you can use to create a new password.

Please note that the root user account can do just about _anything_ in your AWS account, bypassing almost all security
restrictions you put in place, so you need to take extra care with protecting this account. We **very strongly**
recommend that when you reset the password for each account, you:

1. **Use a strong password**: preferably 30+ characters, randomly generated, and stored in a secrets manager.
2. **Enable Multi-Factor Auth (MFA)**: [Follow these instructions to enable
   MFA](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html#enable-virt-mfa-for-root)
   for the root user. It takes less than a minute and _dramatically_ improves your security posture.
3. **Do not use the root user anymore**. After this initial set up, you should NOT use the root user account afterwords,
   except in very rare circumstances. (e.g., if you get locked out of your IAM User account). For almost all day to day
   tasks, you should use an IAM user instead, as described in the next section.

Please note that you'll want to repeat the process above of resetting the password and enabling MFA for _every_
account in your organization: dev, stage, prod, shared-services, security, and the root account too!

### Configure your IAM user

All IAM users are defined and managed in the security account. As part of deploying a Reference Architecture for you,
Gruntwork created an IAM user with admin permissions in the security account. The password is encrypted via PGP using
[Keybase](https://keybase.io/) and [Base64-encoded](https://en.wikipedia.org/wiki/Base64).

However, to access the Terraform state containing the password, you need to already be authenticated to the account.
Thus to get access to the initial admin IAM user, we will use the root user credentials. To do this, you can **either**:

- Login on the AWS Web Console using the root user credentials for the `security` account and use the web console to
  setup the web console password and AWS Access Keys for the IAM user.
- Use the [gruntwork CLI](https://github.com/gruntwork-io/gruntwork/) to rotate the password using the command:

```bash
gruntwork aws reset-password --iam-user-name <IAM_username>
```

Once you have access with the IAM user, be sure to do the following to finish configuring the user:

1. **Enable MFA**. [Follow these instructions to enable
   MFA](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable.html) for your IAM user. It takes
   less than a minute and *dramatically* improves your security posture. Moreover, MFA is **required** by the Reference
   Architecture, and you won't be able to access any other accounts without it!

:::note

The name of the MFA **must** be named exactly the same as the AWS IAM Username. This allows your AWS user to create and delete only your own MFA credential.

:::

2. **Logout and log back in**. After enabling MFA, you need to log out and then log back in, thereby forcing AWS to
   prompt you for an MFA token. Until you don't do this, you will not be able to access anything else in the web
   console!

3. **Create access keys**. [Follow these instructions to create access
   keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) for yourself. Store the
   access keys in a secrets manager. You will need these to authenticate to AWS from the command-line.

### Configure other IAM users

Now that your IAM user is all set up, you can configure IAM users for the rest of your team! All of the IAM users are
managed as code in the security account, in the [account-baseline-app module](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/633ae73172c86ac6e5e48985c529fd45cc06f67e/examples/for-production/infrastructure-live/security/_global/account-baseline/users.yml). If
you open the `terragrunt.hcl` file in that repo, you should see the list of users, which will look something like:

```yml
jane@acme.com:
  create_access_keys: false
  create_login_profile: true
  groups:
  - full-access
  pgp_key: keybase:jane_on_keybase
```

Here's how you could two other users, Alice and Bob, to this list:

```yml
jane@acme.com:
  create_login_profile: true
  groups:
  - full-access
  pgp_key: keybase:jane_on_keybase
alice@acme.com:
  create_login_profile: true
  groups:
  - _account.dev-full-access
  - _account.stage-full-access
  - _account.prod-full-access
  - iam-user-self-mgmt
  pgp_key: keybase:alice_on_keybase
bob@acme.com:
  create_login_profile: true
  groups:
  - _account.prod-read-only
  - ssh-grunt-sudo-users
  - iam-user-self-mgmt
  pgp_key: keybase:bob_on_keybase
```

A few notes about the code above:

1. **Groups**. We add each user to a set of IAM groups: for example, we add Alice to IAM groups that give her admin
   access in the dev, stage, and prod accounts, whereas Bob gets read-only access to prod, plus SSH access (with sudo
   permissions) to EC2 instances. For the full list of IAM groups available out of the box, see the
   [IAM groups module](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/iam-groups#iam-groups).

2. **PGP Keys**. We specify a PGP Key to use to encrypt any secrets for that user. Keys of the form `keybase:<username>`
   are automatically fetched for user `<username>` on [Keybase](https://keybase.io/).

3. **Credentials**. For each user that `create_login_profile` set to `true`, this code will automatically generate a
   password that can be used to login to the web console. The password will be encrypted with the user's PGP key and
   visible as a Terraform output. So after you run `apply`, you can copy/paste these encrypted credentials and email
   them to the user.

To deploy this new code and create the new IAM users, you will need to:

1. **Authenticate**. [Authenticate to AWS via the CLI](04-authenticate-to-aws-via-the-cli.md).

2. **Apply your changes**. Run `terragrunt apply`.

3. **Send credentials**. Copy / paste the login URL, usernames, and (encrypted) credentials and email them to your team
   members. Make sure to tell each team member to follow the [Configure your IAM user](#configure-your-iam-user)
   instructions to (a) login, (b) reset their password, and (c) enable MFA. **Enabling MFA is required in the
   Reference Architecture**. Without MFA, they will not be able to access anything!
