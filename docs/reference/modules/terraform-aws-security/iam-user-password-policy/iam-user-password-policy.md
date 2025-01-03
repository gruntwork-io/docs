---
title: "Set a Password Policy for IAM Users"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.75.1" lastModifiedVersion="0.74.3"/>

# Set a Password Policy for IAM Users

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.1/modules/iam-user-password-policy" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.74.3" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Gruntwork Terraform Module sets the [AWS Account Password Policy](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_passwords_account-policy.html) that will govern password
requirements for IAM Users.

## Motivation

This module adds no value beyond directly using the [aws_iam_account_password_policy](https://www.terraform.io/docs/providers/aws/r/iam_account_password_policy.html), except that having a standardized
module supported by Gruntwork enables you to easily invoke this Terraform resource using Terragrunt's functionality of
downloading a module and setting values with nothing more than a `terraform.tfvars` file.

## Resources Created

### IAM User Password Policy

This module will apply the desired password policy to the given AWS account. Note that this will overwrite any existing
password policy you already have in place!

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S IAM-USER-PASSWORD-POLICY MODULE
# ------------------------------------------------------------------------------------------------------

module "iam_user_password_policy" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/iam-user-password-policy?ref=v0.75.1"

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Whether to allow users to change their own password (true or false).
  allow_users_to_change_password = true

  # Set to false to have this module create no resources. This weird parameter
  # exists solely because Terraform does not support conditional modules.
  # Therefore, this is a hack to allow you to conditionally decide if the
  # resources should be created or not.
  create_resources = true

  # Whether users are prevented from setting a new password after their password
  # has expired (i.e. require administrator reset) (true or false).
  hard_expiry = true

  # The number of days that an user password is valid. Enter 0 for no
  # expiration.
  max_password_age = 0

  # Minimum length to require for user passwords.
  minimum_password_length = 16

  # The number of previous passwords that users are prevented from reusing.
  password_reuse_prevention = 5

  # Whether to require lowercase characters for user passwords (true or false).
  require_lowercase_characters = true

  # Whether to require numbers for user passwords (true or false).
  require_numbers = true

  # Whether to require symbols for user passwords (true or false).
  require_symbols = true

  # Whether to require uppercase characters for user passwords (true or false).
  require_uppercase_characters = true

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S IAM-USER-PASSWORD-POLICY MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/iam-user-password-policy?ref=v0.75.1"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Whether to allow users to change their own password (true or false).
  allow_users_to_change_password = true

  # Set to false to have this module create no resources. This weird parameter
  # exists solely because Terraform does not support conditional modules.
  # Therefore, this is a hack to allow you to conditionally decide if the
  # resources should be created or not.
  create_resources = true

  # Whether users are prevented from setting a new password after their password
  # has expired (i.e. require administrator reset) (true or false).
  hard_expiry = true

  # The number of days that an user password is valid. Enter 0 for no
  # expiration.
  max_password_age = 0

  # Minimum length to require for user passwords.
  minimum_password_length = 16

  # The number of previous passwords that users are prevented from reusing.
  password_reuse_prevention = 5

  # Whether to require lowercase characters for user passwords (true or false).
  require_lowercase_characters = true

  # Whether to require numbers for user passwords (true or false).
  require_numbers = true

  # Whether to require symbols for user passwords (true or false).
  require_symbols = true

  # Whether to require uppercase characters for user passwords (true or false).
  require_uppercase_characters = true

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Optional

<HclListItem name="allow_users_to_change_password" requirement="optional" type="bool">
<HclListItemDescription>

Whether to allow users to change their own password (true or false).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to have this module create no resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if the resources should be created or not.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="hard_expiry" requirement="optional" type="bool">
<HclListItemDescription>

Whether users are prevented from setting a new password after their password has expired (i.e. require administrator reset) (true or false).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="max_password_age" requirement="optional" type="number">
<HclListItemDescription>

The number of days that an user password is valid. Enter 0 for no expiration.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="minimum_password_length" requirement="optional" type="number">
<HclListItemDescription>

Minimum length to require for user passwords.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="16"/>
</HclListItem>

<HclListItem name="password_reuse_prevention" requirement="optional" type="number">
<HclListItemDescription>

The number of previous passwords that users are prevented from reusing.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="5"/>
</HclListItem>

<HclListItem name="require_lowercase_characters" requirement="optional" type="bool">
<HclListItemDescription>

Whether to require lowercase characters for user passwords (true or false).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="require_numbers" requirement="optional" type="bool">
<HclListItemDescription>

Whether to require numbers for user passwords (true or false).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="require_symbols" requirement="optional" type="bool">
<HclListItemDescription>

Whether to require symbols for user passwords (true or false).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="require_uppercase_characters" requirement="optional" type="bool">
<HclListItemDescription>

Whether to require uppercase characters for user passwords (true or false).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="iam_password_policy_allow_users_to_change_password">
<HclListItemDescription>

Whether to allow users to change their own password.

</HclListItemDescription>
</HclListItem>

<HclListItem name="iam_password_policy_expire_passwords">
<HclListItemDescription>

Indicates whether passwords in the account expire.

</HclListItemDescription>
</HclListItem>

<HclListItem name="iam_password_policy_hard_expiry">
<HclListItemDescription>

Whether users are prevented from setting a new password after their password has expired (i.e. require administrator reset).

</HclListItemDescription>
</HclListItem>

<HclListItem name="iam_password_policy_max_password_age">
<HclListItemDescription>

The number of days that an user password is valid. 0 means no expiration.

</HclListItemDescription>
</HclListItem>

<HclListItem name="iam_password_policy_minimum_password_length">
<HclListItemDescription>

Minimum length to require for user passwords.

</HclListItemDescription>
</HclListItem>

<HclListItem name="iam_password_policy_password_reuse_prevention">
<HclListItemDescription>

The number of previous passwords that users are prevented from reusing.

</HclListItemDescription>
</HclListItem>

<HclListItem name="iam_password_policy_require_lowercase_characters">
<HclListItemDescription>

Whether to require lowercase characters for user passwords.

</HclListItemDescription>
</HclListItem>

<HclListItem name="iam_password_policy_require_symbols">
<HclListItemDescription>

Whether to require symbols for user passwords.

</HclListItemDescription>
</HclListItem>

<HclListItem name="iam_password_policy_require_uppercase_characters">
<HclListItemDescription>

Whether to require uppercase characters for user passwords.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.1/modules/iam-user-password-policy/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.1/modules/iam-user-password-policy/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.1/modules/iam-user-password-policy/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "6c68bdddb9390540c96249d0e07b981a"
}
##DOCS-SOURCER-END -->
