---
title: "IAM Users"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.75.1" lastModifiedVersion="0.74.2"/>

# IAM Users

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.1/modules/iam-users" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.74.2" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This is a Terraform module you can use to create and manage
[IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) as code.

## How do you generate passwords and access keys with this module?

This module can optionally create a password for AWS Web Console access and/or access keys for programmatic access for
each IAM user if you set `create_login_profile` and/or `create_access_keys` to `true` for that IAM user, respectively.

To avoid having these secrets stored in plain text in Terraform state, this module will only generate the password or
access keys if you specify the `pgp_key` param for that user. This param can contain either the base-64 encoded PGP
public key for that user or the user's Keybase username in the format `keybase:<USERNAME>`.

We recommend using Keybase, as it makes it easier to manage PGP keys. Have each user at your company:

1.  [Install the Keybase app](https://keybase.io/download).
2.  Claim a Keybase username.
3.  Use the Keybase app to create a PGP key and add it to their profile.
4.  Send you their username.

Once you have their user name, set `pgp_key = "keybase:<USERNAME>"` and `create_login_profile` and/or
`create_access_keys` to `true` for that user, and this module will generate the password and/or access keys, and
export them in the output variables `user_passwords` and `user_access_keys`. The output will look something like this:

```
user_access_keys = {
  "alice" = {
    "access_key_id" = "AKIARIUU2OIYE2APGOYK"
    "secret_access_key" = "wcBMA7E6Kn/t1YPfAQgAjLvUWUES/GeLHr/=="
  }
}
user_passwords = {
  "bob" = "wcBMA7E6Kn/t1YPfAQgAdByWFftehuD3uw="
}
```

You can see that Alice's `secret_access_key` and Bob's password are encrypted, so you can safely mail those credentials
to each user.

### How do I use PGP keys directly?

The module also supports using PGP keys directly, without keybase. To use a raw PGP key, export the public key in binary
format and base64 encode it:

```bash
# Set KEYID to the ID of the PGP key you would like to use for encrypting
gpg --export $KEYID | base64
```

You can then set the `pgp_key` field to the resulting string.

### How do you decrypt the generated passwords and access keys?

To decrypt a user's password or access keys, that user can decrypt them on the command-line as follows:

```bash
echo "<SECRET>" | base64 --decode | keybase pgp decrypt
```

Note that this only works if the user has the private key for their PGP key on their local computer (which they will
if they used the Keybase app to create the PGP key in the first place).

If you used a raw PGP key, you can use the following command instead:

```bash
# Set KEYID to the ID of the PGP key you used for encrypting
echo "<SECRET>" | base64 --decode | gpg -d $KEYID
```

## How do you delete users?

Under the hood, this module uses the [`aws_iam_user` resource](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_user), which only allows you to delete an IAM user by doing the following multi-step process:

1.  Set the `force_destroy` parameter to `true` on that user. Example:

    ```hcl
    module "iam_users" {
      source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/iam-users?ref=v0.53.2"

      users = {
        # Set force_destroy to true on the user you want to delete
        "example-user-to-delete" = {
          force_destroy = true
        }
        
        "some-other-user"  = {}
        "yet-another-user" = {}
      }
    }    
    ```

2.  Run `apply`.

3.  Remove the user you wish to delete from the `users` input variable. Following on the previous example:

    ```hcl
    module "iam_users" {
      source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/iam-users?ref=v0.53.2"

      users = {
        # Note that example-user-to-delete has been removed
        
        "some-other-user"  = {}
        "yet-another-user" = {}
      }
    }    
    ```

4.  Run `apply` again.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S IAM-USERS MODULE
# ------------------------------------------------------------------------------------------------------

module "iam_users" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/iam-users?ref=v0.75.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A map of users to create. The keys are the user names and the values are an
  # object with the optional keys 'groups' (a list of IAM groups to add the user
  # to), 'tags' (a map of tags to apply to the user), 'pgp_key' (either a
  # base-64 encoded PGP public key, or a keybase username in the form
  # keybase:username, used to encrypt the user's credentials; required if
  # create_login_profile or create_access_keys is true), 'create_login_profile'
  # (if set to true, create a password to login to the AWS Web Console),
  # 'create_access_keys' (if set to true, create access keys for the user),
  # 'path' (the path), 'permissions_boundary' (the ARN of the policy that is
  # used to set the permissions boundary for the user), and 'ssh_public_key'
  # (the public part of the user's SSH key that will be added to their security
  # credentials for use with `ssh-grunt`).
  users = <any>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # When destroying this user, destroy even if it has non-Terraform-managed IAM
  # access keys, login profile, or MFA devices. Without force_destroy a user
  # with non-Terraform-managed access keys and login profile will fail to be
  # destroyed.
  force_destroy = false

  # ARN or Id of the AWS KMS key to be used to encrypt the secret values in the
  # versions stored in this secret. If you don't specify this value, then
  # Secrets Manager defaults to using the AWS account's default KMS key
  kms_key_id = null

  # The length for the generated AWS Web Console password. Only used for users
  # with create_login_profile set to true.
  password_length = 20

  # Force the user to reset their password on initial login. Only used for users
  # with create_login_profile set to true.
  password_reset_required = true

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S IAM-USERS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/iam-users?ref=v0.75.1"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A map of users to create. The keys are the user names and the values are an
  # object with the optional keys 'groups' (a list of IAM groups to add the user
  # to), 'tags' (a map of tags to apply to the user), 'pgp_key' (either a
  # base-64 encoded PGP public key, or a keybase username in the form
  # keybase:username, used to encrypt the user's credentials; required if
  # create_login_profile or create_access_keys is true), 'create_login_profile'
  # (if set to true, create a password to login to the AWS Web Console),
  # 'create_access_keys' (if set to true, create access keys for the user),
  # 'path' (the path), 'permissions_boundary' (the ARN of the policy that is
  # used to set the permissions boundary for the user), and 'ssh_public_key'
  # (the public part of the user's SSH key that will be added to their security
  # credentials for use with `ssh-grunt`).
  users = <any>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # When destroying this user, destroy even if it has non-Terraform-managed IAM
  # access keys, login profile, or MFA devices. Without force_destroy a user
  # with non-Terraform-managed access keys and login profile will fail to be
  # destroyed.
  force_destroy = false

  # ARN or Id of the AWS KMS key to be used to encrypt the secret values in the
  # versions stored in this secret. If you don't specify this value, then
  # Secrets Manager defaults to using the AWS account's default KMS key
  kms_key_id = null

  # The length for the generated AWS Web Console password. Only used for users
  # with create_login_profile set to true.
  password_length = 20

  # Force the user to reset their password on initial login. Only used for users
  # with create_login_profile set to true.
  password_reset_required = true

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="users" requirement="required" type="any">
<HclListItemDescription>

A map of users to create. The keys are the user names and the values are an object with the optional keys 'groups' (a list of IAM groups to add the user to), 'tags' (a map of tags to apply to the user), 'pgp_key' (either a base-64 encoded PGP public key, or a keybase username in the form keybase:username, used to encrypt the user's credentials; required if create_login_profile or create_access_keys is true), 'create_login_profile' (if set to true, create a password to login to the AWS Web Console), 'create_access_keys' (if set to true, create access keys for the user), 'path' (the path), 'permissions_boundary' (the ARN of the policy that is used to set the permissions boundary for the user), and 'ssh_public_key' (the public part of the user's SSH key that will be added to their security credentials for use with `ssh-grunt`).

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = {
     alice = {
       groups = ["user-self-mgmt", "developers", "ssh-sudo-users"]
     }
  
     bob = {
       path   = "/"
       groups = ["user-self-mgmt", "ops", "admins"]
       tags   = {
         foo = "bar"
       }
     }
  
     carol = {
       groups               = ["user-self-mgmt", "developers", "ssh-users"]
       pgp_key              = "keybase:carol_on_keybase"
       ssh_public_key       = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQD3F6tyPEFEzV0LX3X8BsXdMsQz1x2cEikKDEY0aIj41qgxMCP/iteneqXSIFZBp5vizPvaoIR3Um9xK7PGoW8giupGn+EPuxIA4cDM4vzOqOkiMPhz5XK0whEjkVzTo4+S0puvDZuwIsdiW9mxhJc7tgBNL0cYlWSYVkz4G/fslNfRPW5mYAM49f4fhtxPb5ok4Q2Lg9dPKVHO/Bgeu5woMc7RY0p1ej6D4CKFE6lymSDJpW0YHX/wqE9+cfEauh7xZcG0q9t2ta6F6fmX0agvpFyZo8aFbXeUBr7osSCJNgvavWbM/06niWrOvYX2xwWdhXmXSrbX8ZbabVohBK41 carol@example.com"
       create_login_profile = true
       create_access_keys   = true
     }
  
     dan = {
       json_policies = {
         EC2FullAccess = <<-EOF
         {
             "Version": "2012-10-17",
             "Statement": [
                 {
                     "Sid": "AllowEC2FullAccess",
                     "Effect": "Allow",
                     "Action": [
                         "ec2:*"
                     ],
                     "Resource": "*"
                 }
             ]
         }
         EOF
         billing  = module.iam_policies.billing
       }
       inline_iam_policies = {
         AdminAccess = {
           actions   = ["*:*"]
           resources = ["*"]
           effect    = "Allow"
           force_mfa = true
         }
       }
     }
   }

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Ideally, this would be a map of (string, object), but object does not support optional properties, and we want
   users to be able to specify, say, tags for some users, but not for others. We can't use a map(any) either, as that
   would require the values to all have the same type, and due to optional parameters, that wouldn't work either. So,
   we have to lamely fall back to any.

```
</details>

<details>


```hcl

   Each entry in the map supports the following attributes:
  
   OPTIONAL
   - groups                             list(string)    : A list of IAM groups to add the user to. Defaults to null.
   - customer_managed_policy_names      list(string)    : A list of IAM AWS Customer Managed policy names to attach to the IAM
                                                          user. Defaults to null.
   - aws_managed_policy_names           list(string)    : A list of IAM AWS Managed Policy names to attach to the group.
                                                          Defaults to null.
   - inline_iam_policies                map(PolicyDoc)  : Map of names to IAM policy documents to attach as inline policies
                                                          on the user. See below for the schema of each object. Defaults to null.
   - json_policies                      map(string)     : Map of names to JSON formatted policy documents to attach to the user.
                                                          Defaults to null.
   - create_login_profile               bool            : When true, create a password to login to the AWS Web Console.
                                                          Defaults to false. The resulting secret is encrypted using the PGP
                                                          key specified in the pgp_key attribute.
   - create_access_keys                 bool            : When true, create AWS Access Key pair for the user.  Defaults to
                                                          false. The resulting secret is encrypted using the PGP key specified
                                                          in the pgp_key attribute.
   - path                               string          : The path for the IAM user.
   - pgp_key                            string          : Used to encrypt the user's credentials. Required if create_login_profile or
                                                          create_access_keys attributes is true. This is either a base64
                                                          encoded PGP public key, or a keybase username in the form
                                                          'keybase:username'.
   - permissions_boundary               string          : The ARN of the policy that is used to set the permissions boundary
                                                          for the user. Defaults to null.
   - ssh_public_key                     string          : The public part of the user's SSH key that will be added to their
                                                          security credentials for use with ssh-grunt. Defaults to null.
   - store_access_keys_in_secrets_mgr   bool            : if set to true, store the user's access keys in AWS Secrets Manager. This should
                                                          only be set to `true` for machine users. Secrets Manager
                                                          allows multiple team members to access the data, whereas a
                                                          PGP key is usually only accessible to one team member. The
                                                          secret id will be equal to the IAM username for which the
                                                          secret is provisioned. **WARNING**: This will cause the
                                                          user's access keys to be stored in plain text in Terraform
                                                          state. The Secrets Manager secret value will be a JSON
                                                          object with the keys `accessKey` and `secretKey` similar to
                                                          the following (`ACCESS_KEY_HERE` and `SECRET_KEY_HERE` will
                                                          be replaced with the real access key and secret key for
                                                          the user):
                                                              {
                                                                  "accessKey": "ACCESS_KEY_HERE",
                                                                  "secretKey": "SECRET_KEY_HERE"
                                                              }
   - tags                               map(string)     : A map of tags to apply to the user, where the keys are tag keys and
                                                          values are tag values. Defaults to {}.
  
   Structure of PolicyDoc object:
   - resources  list(string)  : The list of resources that the policy applies to.
   - actions    list(string)  : The list of AWS actions (e.g., ec2:DescribeImages or ec2:*) that applies to the policy.
   - effect     string        : Whether the IAM policy is specifying actions the user is allowed to do, or denied to
                                do. Must be "Allow" or "Deny".
   - force_mfa  bool          : Whether or not the MFA is only applied if the session is MFA verified.
  

```
</details>

</HclGeneralListItem>
</HclListItem>

### Optional

<HclListItem name="dependencies" requirement="optional" type="list(string)">
<HclListItemDescription>

Create a dependency between the resources in this module to the interpolated values in this list (and thus the source resources). In other words, the resources in this module will now depend on the resources backing the values in this list such that those resources need to be created before the resources in this module, and the resources in this module need to be destroyed before the resources in the list.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="force_destroy" requirement="optional" type="bool">
<HclListItemDescription>

When destroying this user, destroy even if it has non-Terraform-managed IAM access keys, login profile, or MFA devices. Without force_destroy a user with non-Terraform-managed access keys and login profile will fail to be destroyed.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

ARN or Id of the AWS KMS key to be used to encrypt the secret values in the versions stored in this secret. If you don't specify this value, then Secrets Manager defaults to using the AWS account's default KMS key

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="password_length" requirement="optional" type="number">
<HclListItemDescription>

The length for the generated AWS Web Console password. Only used for users with create_login_profile set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="20"/>
</HclListItem>

<HclListItem name="password_reset_required" requirement="optional" type="bool">
<HclListItemDescription>

Force the user to reset their password on initial login. Only used for users with create_login_profile set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="secrets_mgr_arns_for_user_access_keys">
<HclListItemDescription>

A map of usernames to the ARN for that user's AWS Secrets Manager Secret containing that user's access keys.

</HclListItemDescription>
</HclListItem>

<HclListItem name="user_access_keys">
<HclListItemDescription>

A map of usernames to that user's access keys (a map with keys access_key_id and secret_access_key), with the secret_access_key encrypted with that user's PGP key (only shows up for users with create_access_keys = true and pgp_key != null). You can decrypt the secret_access_key on the CLI: echo &lt;secret_access_key> | base64 --decode | keybase pgp decrypt

</HclListItemDescription>
</HclListItem>

<HclListItem name="user_arns">
<HclListItemDescription>

A map of usernames to the ARN for that IAM user.

</HclListItemDescription>
</HclListItem>

<HclListItem name="user_passwords">
<HclListItemDescription>

A map of usernames to that user's AWS Web Console password, encrypted with that user's PGP key (only shows up for users with create_login_profile = true). You can decrypt the password on the CLI: echo &lt;password> | base64 --decode | keybase pgp decrypt

</HclListItemDescription>
</HclListItem>

<HclListItem name="user_ssh_key_ids">
<HclListItemDescription>

A map of usernames to that user's AWS SSH Security Credential ID

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.1/modules/iam-users/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.1/modules/iam-users/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.1/modules/iam-users/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "6e7e9921f8b67b26398ac06fb12b194e"
}
##DOCS-SOURCER-END -->
