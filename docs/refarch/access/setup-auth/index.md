# Set up AWS Auth

## Configure root users

Each of your AWS accounts has a root user that you need to configure. When you created the child AWS accounts (dev, stage, prod, etc), you provided the root user's email address for each account; if you don't know what those email addresses were, you can log in to the root account (the parent of the AWS Organization) and go to the AWS Organizations Console to find them.

Once you have the email addresses, you'll need the passwords. When you create child accounts in an AWS organization, AWS will not allow you to set the root password. In order to generate the root password:

1. Go to the AWS Console.
1. If you had previously signed into some other AWS account as an IAM User, rather than a root user, click "Sign-in using root account credentials."
1. Enter the email address of the root user.
1. Click "Forgot your password" to reset the password.
1. Check the email address associated with the root user account for a link you can use to create a new password.

:::danger
Please note that the root user account can do anything in your AWS account, bypassing the security restrictions you put in place, so you need to take extra care with protecting this account.
:::

We strongly recommend that when you reset the password for each account, you also:

1. Use a strong password: preferably 30+ characters, randomly generated, and stored in a secrets manager.
1. Enable Multi-Factor Auth (MFA): Follow [these instructions](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html#enable-virt-mfa-for-root) to enable MFA for the root user.
   After this initial set up, you should _not_ use the root user account afterward except in very rare circumstances. (e.g., if you get locked out of your IAM User account and no one has permissions to reset your password). For day-to-day tasks, you should use an IAM User instead, as described in the next section.

Please note that you'll have to repeat the process above of resetting the password and enabling MFA for every account in your organization: dev, stage, prod, shared, security, logs, and the root account.

## Configure your IAM user

The security account defines and manages all IAM Users. When deploying your Reference Architecture, Gruntwork creates an IAM User with admin permissions in the security account. The password for the IAM User is encrypted via PGP using [Keybase](https://keybase.io) (you'll need a free account) and is Base64-encoded.

To access the Terraform state containing the password, you need to already be authenticated to the account. Thus to get access to the initial admin IAM User, we will use the root user credentials. To do this, you can either:

- Log in to the AWS Web Console using the root user credentials for the security account and set up the password and AWS Access Keys for the IAM User.

- Use the [Gruntwork CLI](https://github.com/gruntwork-io/gruntwork/) to rotate the password using the command:

  ```bash
  gruntwork aws reset-password --iam-user-name <IAM_username>
  ```

Once you have access via your IAM user, finish hardening your security posture:

1. Enable MFA for your IAM User by following [these instructions](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable.html). MFA is required by the Reference Architecture, and you won't be able to access any other accounts without it.

   :::note
   Note that the name of the MFA must be exactly the same as the AWS IAM Username
   :::

1. Log out and log back in — After enabling MFA, you need to log out and then log back in. This forces AWS to prompt you for your MFA token.

   :::caution
   Until you enable MFA, you will not be able to access anything else in the web console.
   :::

1. Create access keys for yourself by following [these instructions](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html). Store the access keys in a secrets manager. You will need these to authenticate to AWS from the command-line.

## Configure other IAM users

Now that your IAM user is all set up, you can configure IAM users for the rest of your team.

:::note
Each of your users will need a free [Keybase](https://keybase.io/) account so that their credentials can be encrypted just for their access.
:::

All of the IAM users are managed as code in the security account in the `account-baseline-app` module. If you open the `terragrunt.hcl` file in that repo, you should see the list of users, which will look something like:

```yaml
jane@acme.com:
  create_access_keys: false
  create_login_profile: true
  groups:
    - full-access
  pgp_key: keybase:jane_on_keybase
```

Here's how you would add two more users, Alice and Bob, to your security account:

```yaml
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

1. **Groups**. We add each user to a set of IAM Groups: for example, we add Alice to IAM Groups that give her admin access in the dev, stage, and prod accounts, whereas Bob gets read-only access to prod, plus SSH access (with `sudo` permissions) to EC2 instances. For the full list of IAM Groups available, see the [IAM Groups module](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/iam-groups#iam-groups).

1. **PGP Keys**. We specify a PGP Key to use to encrypt any secrets for that user. Keys of the form `keybase:<username>` are automatically fetched for user `<username>` on [Keybase](https://keybase.io/).

1. **Credentials**. For each user whose `create_login_profile` field is set to `true`, a password will be automatically generated. This password can be used to log in to the web console. This password will be encrypted with the user's PGP key and visible as a Terraform output. After you run `terragrunt apply`, you can copy/paste these encrypted credentials and send them to the user.

To deploy this new code and create the new IAM Users, you will need to:

1. Authenticate to AWS via the CLI.

1. Apply your changes by running `terragrunt apply`.

1. Share the login URL, usernames, and (encrypted) password with your team members.

   :::note
   Make sure to tell each team member to follow the [Configure your IAM User instructions](#configure-your-iam-user) to log in, reset their password, and enable MFA.
   :::

   :::caution
   Enabling MFA is required to access the Reference Architecture
   :::


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "7e8a7edee39caec4a8f74b13cf742beb"
}
##DOCS-SOURCER-END -->
