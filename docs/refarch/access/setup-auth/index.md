# Set up AWS Auth

## Step 1. Configure root users

Each of your AWS accounts has a root user that you need to configure. When you created the child AWS accounts (dev, stage, prod, etc), you provided the root user's email address for each account; if you don't know what those email addresses were, you can login to the root account (the parent of the AWS Organization) and go to the AWS Organizations Console to find the email addresses.

Once you have the email addresses, you'll need the passwords. When you create child accounts in an AWS organization, AWS does not allow you to set those passwords. In order to retrieve the passwords:

1. Go to the AWS Console.
1. If you are already signed in to some other AWS account, sign out, and return to the AWS Console again.
1. If you had previously signed into some other AWS account as an IAM User, rather than a root user, click "Sign-in using root account credentials."
1. Enter the email address of the root user.
1. Click "Forgot your password" to reset the password.
1. Check the email address associated with the root user account for a link you can use to create a new password.

Please note that the root user account can do anything in your AWS account, bypassing the security restrictions you put in place, so **you need to take extra care with protecting this account**. *We strongly recommend that when you reset the password for each account, you also*:
1. Use a strong password: preferably 30+ characters, randomly generated, and stored in a secrets manager.
1. Enable Multi-Factor Auth (MFA): Follow [these instructions](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html#enable-virt-mfa-for-root) to enable MFA for the root user.
After this initial set up, you should NOT use the root user account afterward except in very rare circumstances. (e.g., if you get locked out of your IAM User account and no one has permissions to reset your password). For day to day tasks, you should use an IAM User instead, as described in the next section.

Please note that you'll want to repeat the process above of resetting the password and enabling MFA for every account in your organization: dev, stage, prod, shared, security, logs, and the root account too.

## Step 2. Configure your IAM user

The security account defines and manages all IAM Users. When deploying your Reference Architecture, Gruntwork creates an IAM User with admin permissions in the security account. The password for the IAM User is encrypted via PGP using Keybase and is Base64-encoded.

To access the Terraform state containing the password, you need to already be authenticated to the account. Thus to get access to the initial admin IAM User, we will use the root user credentials. To do this, you can either:

* Login on the AWS Web Console using the root user credentials for the security account and use the web console to setup the web console password and AWS Access Keys for the IAM User.

* Use the [Gruntwork CLI](https://github.com/gruntwork-io/gruntwork/) to rotate the password using the command:

```
gruntwork aws reset-password --iam-user-name <IAM_username>
```

Once you have access with via you IAM user, finish hardening your security posture:

1. Enable MFA by following [these instructions](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable.html) to enable MFA for your IAM User. It takes less than a minute and dramatically improves your security posture. Moreover, MFA is required by the Reference Architecture, and you won't be able to access any other accounts without it! Note that the name of the MFA must be named exactly the same as the AWS IAM Username.

1. Logout and log back in. After enabling MFA, you need to log out and then log back in, thereby forcing AWS to prompt you for an MFA token. Until you do this, you will not be able to access anything else in the web console!

1. Create access keys by following [these instructions](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) to create access keys for yourself. Store the access keys in a secrets manager. You will need these to authenticate to AWS from the command-line.

## Step 3. Configure other IAM users 

Now that your IAM user is all set up, you can configure IAM users for the rest of your team. All of the IAM users are managed as code in the security account in the `account-baseline-app module`. If you open the `terragrunt.hcl` file in that repo, you should see the list of users, which will look something like:

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

1. **Groups**. We add each user to a set of IAM Groups: for example, we add Alice to IAM Groups that give her admin access in the dev, stage, and prod accounts, whereas Bob gets read-only access to prod, plus SSH access (with sudo permissions) to EC2 instances. For the full list of IAM Groups available, see the [IAM Groups module](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/iam-groups#iam-groups).

1. **PGP Keys**. We specify a PGP Key to use to encrypt any secrets for that user. Keys of the form `keybase:<username>` are automatically fetched for user `<username>` on [Keybase](https://keybase.io/).

1. **Credentials**. For each user whose `create_login_profile` field is set to `true`, the code will automatically generate a password that can be used to login to the web console. The password will be encrypted with the user's PGP key and visible as a Terraform output. After you run `terragrunt apply`, you can copy/paste these encrypted credentials and send them to the user.

To deploy this new code and create the new IAM Users, you will need to:

1. **Authenticate**. Authenticate to AWS via the CLI.

1. **Apply your changes**. Run `terragrunt apply`.

1. **Send credentials**. Copy / paste the login URL, usernames, and (encrypted) credentials and email them to your team members. Make sure to tell each team member to follow the Configure your IAM User instructions to (a) login, (b) reset their password, and (c) enable MFA. **Enabling MFA is required in the Reference Architecture**. Without MFA, they will not be able to access anything! Note that the name of the MFA device each user creates when setting up multi-factor authentication for their user must be named exactly the same name as their AWS IAM user's username.



<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "97a480f6bf019715d20fad837af3afd4"
}
##DOCS-SOURCER-END -->
