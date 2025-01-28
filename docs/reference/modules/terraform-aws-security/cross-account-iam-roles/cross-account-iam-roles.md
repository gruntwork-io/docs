---
title: "A best-practices set of IAM roles for cross-account access"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.75.6" lastModifiedVersion="0.69.2"/>

# A best-practices set of IAM roles for cross-account access

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.6/modules/cross-account-iam-roles" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.69.2" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module can be used to allow IAM users from other AWS accounts to access your AWS accounts (i.e. [cross-account
access](https://aws.amazon.com/blogs/security/enable-a-new-feature-in-the-aws-management-console-cross-account-access/)).
This allows you to define each environment (mgmt, stage, prod, etc) in a separate AWS account, your IAM users in a
single account, and to allow those users to easily switch between accounts with a single set of credentials.

If you're not familiar with IAM concepts, start with the [Background Information](#background-information) section as a
way to familiarize yourself with the terminology.

## Resources Created

This module creates the following IAM roles (all optional):

### IAM Roles intended for human users

These IAM Roles are intended to be assumed by human users (i.e., IAM Users in another AWS account). The default
maximum session expiration for these roles is 12 hours (configurable via the `var.max_session_duration_human_users`).
Note that these are the *maximum* session expirations; the actual value for session expiration is specified when
making API calls to assume the IAM role (see [aws-auth](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.6/modules/aws-auth)).

*   **allow-read-only-access-from-other-accounts**: Users from the accounts in
    `var.allow_read_only_access_from_other_account_arns` will get read-only access to all services in this account.

*   **allow-billing-access-from-other-accounts**: Users from the accounts in
    `var.allow_billing_access_from_other_account_arns` will get full (read and write) access to the billing details for
    this account.

*   **allow-support-access-from-other-accounts**: Users from the accounts in
    `var.allow_support_access_from_other_account_arns` will get access to AWS support for this account.

*   **allow-logs-access-from-other-accounts**: Users from the accounts in
    `var.allow_logs_access_from_other_account_arns` will get read access to the logs in CloudTrail, AWS Config, and
    CloudWatch in this account. Since CloudTrail logs may be encrypted with a KMS CMK, if `var.cloudtrail_kms_key_arn` is
    set, these users will also get permissions to decrypt using this KMS CMK.

*   **allow-dev-access-from-other-accounts**: Users from the accounts in `var.allow_dev_access_from_other_account_arns`
    will get full (read and write) access to the services in this account specified in `var.dev_permitted_services`.

*   **allow-full-access-from-other-accounts**: Users from the accounts in `var.allow_full_access_from_other_account_arns`
    will get full (read and write) access to all services in this account.

*   **allow-iam-admin-access-from-other-accounts**: Users from the accounts in `var.allow_iam_admin_access_from_other_account_arns`
    will get IAM admin access.

### IAM Roles intended for machine users

These IAM Roles are intended to be assumed by machine users (i.e., an EC2 Instance in another AWS account). The default
maximum session expiration for these roles is 1 hour (configurable via the `var.max_session_duration_machine_users`).
Note that these are the *maximum* session expirations; the actual value for session expiration is specified when
making API calls to assume the IAM role (see [aws-auth](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.6/modules/aws-auth)).

*   **allow-ssh-grunt-access-from-other-accounts**: Users (or more likely, EC2 Instances) from the accounts in
    `var.allow_ssh_grunt_access_from_other_account_arns` will get read access to IAM Groups and public SSH keys. This is
    useful to allow [ssh-grunt](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.6/modules/ssh-grunt) running on EC2 Instances in other AWS accounts to validate SSH
    connections against IAM users defined in this AWS account.

*   **allow-auto-deploy-access-from-other-accounts**: Users from the accounts in `var.allow_auto_deploy_from_other_account_arns`
    will get automated deployment access to all services in this account with the permissions specified in
    `var.auto_deploy_permissions`. The main use case is to allow a CI server (e.g. Jenkins) in another AWS account to do
    automated deployments in this AWS account.

## How to switch between accounts

### Switching in the AWS console

Check out the [AWS Switching to a Role (AWS Console)
documentation](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-console.html).

Note that this module automatically outputs the convenient sign-in URLs to quickly switch to a given role. The outputs
are named `allow_XXX_access_sign_in_url`, where `XXX` is one of `read-only`, `billing`, `dev`, or `full`.

### Switching with CLI tools (including Terraform)

Check out the [AWS Switching to a Role (AWS Command Line Interface)
documentation](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-cli.html). Note that assuming
roles with the AWS CLI takes quite a few steps, so use the [aws-auth script](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/aws-auth) to reduce it to a one-liner.

## Background Information

For background information on IAM, IAM users, IAM policies, and more, check out the [background information docs in
the iam-policies module](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.6/modules/iam-policies#background-information).

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CROSS-ACCOUNT-IAM-ROLES MODULE
# ------------------------------------------------------------------------------------------------------

module "cross_account_iam_roles" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/cross-account-iam-roles?ref=v0.75.6"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the AWS Account.
  aws_account_id = <string>

  # Should we require that all IAM Users use Multi-Factor Authentication for
  # both AWS API calls and the AWS Web Console? (true or false)
  should_require_mfa = <bool>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Allow GitHub Actions to assume the auto deploy IAM role using an OpenID
  # Connect Provider. Refer to the docs for github-actions-iam-role for more
  # information. Note that this is mutually exclusive with
  # var.allow_auto_deploy_from_other_account_arns.
  allow_auto_deploy_from_github_actions = null

  # A list of IAM ARNs from other AWS accounts that will be allowed to assume
  # the auto deploy IAM role that has the permissions in
  # var.auto_deploy_permissions.
  allow_auto_deploy_from_other_account_arns = []

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role.
  allow_auto_deploy_iam_role_permissions_boundary = null

  # A list of IAM ARNs from other AWS accounts that will be allowed full (read
  # and write) access to the billing info for this account.
  allow_billing_access_from_other_account_arns = []

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role.
  allow_billing_access_iam_role_permissions_boundary = null

  # A list of IAM ARNs from other AWS accounts that will be allowed full (read
  # and write) access to the services in this account specified in
  # var.dev_permitted_services.
  allow_dev_access_from_other_account_arns = []

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role.
  allow_dev_access_iam_role_permissions_boundary = null

  # A list of IAM ARNs from other AWS accounts that will be allowed full (read
  # and write) access to this account.
  allow_full_access_from_other_account_arns = []

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role.
  allow_full_access_iam_role_permissions_boundary = null

  # A list of IAM ARNs from other AWS accounts that will be allowed IAM admin
  # access to this account.
  allow_iam_admin_access_from_other_account_arns = []

  # A list of IAM ARNs from other AWS accounts that will be allowed read access
  # to the logs in CloudTrail, AWS Config, and CloudWatch for this account. If
  # var.cloudtrail_kms_key_arn is set, will also grant decrypt permissions for
  # the KMS CMK.
  allow_logs_access_from_other_account_arns = []

  # A list of IAM ARNs from other AWS accounts that will be allowed read-only
  # access to this account.
  allow_read_only_access_from_other_account_arns = []

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role.
  allow_read_only_access_iam_role_permissions_boundary = null

  # A list of IAM ARNs from other AWS accounts that will be allowed read access
  # to IAM groups and publish SSH keys. This is used for ssh-grunt.
  allow_ssh_grunt_access_from_other_account_arns = []

  # A list of IAM ARNs from other AWS accounts that will be allowed access to
  # AWS support for this account.
  allow_support_access_from_other_account_arns = []

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role.
  allow_support_access_iam_role_permissions_boundary = null

  # What to name the auto deploy IAM role
  auto_deploy_access_iam_role_name = "allow-auto-deploy-from-other-accounts"

  # A list of IAM permissions (e.g. ec2:*) which will be granted for automated
  # deployment.
  auto_deploy_permissions = []

  # What to name the billing access IAM role
  billing_access_iam_role_name = "allow-billing-only-access-from-other-accounts"

  # The ARN of a KMS CMK used to encrypt CloudTrail logs. If set, the logs IAM
  # role will include permissions to decrypt using this CMK.
  cloudtrail_kms_key_arn = null

  # Set to false to have this module create no resources. This weird parameter
  # exists solely because Terraform does not support conditional modules.
  # Therefore, this is a hack to allow you to conditionally decide if the
  # resources should be created or not.
  create_resources = true

  # What to name the dev access IAM role
  dev_access_iam_role_name = "allow-dev-access-from-other-accounts"

  # A list of AWS services for which the developers from the accounts in
  # var.allow_dev_access_from_other_account_arns will receive full permissions.
  # See
  # https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_actions-resources-contextkeys.html
  # to find the service name. For example, to grant developers access only to
  # EC2 and Amazon Machine Learning, use the value ["ec2","machinelearning"]. Do
  # NOT add iam to the list of services, or that will grant Developers de facto
  # admin access.
  dev_permitted_services = []

  # What to name the full access IAM role
  full_access_iam_role_name = "allow-full-access-from-other-accounts"

  # What to name the IAM admin access IAM role
  iam_admin_access_iam_role_name = "allow-iam-admin-access-from-other-accounts"

  # Include this value as a prefix in the name of every IAM role created by this
  # module. This is useful to prepend, for example, '<account-name>-' to every
  # IAM role name: e.g., allow-full-access-from-other-accounts becomes
  # stage-allow-full-access-from-other-accounts.
  iam_role_name_prefix = ""

  # What to name the logs access IAM role
  logs_access_iam_role_name = "allow-logs-access-from-other-accounts"

  # The maximum allowable session duration, in seconds, for the credentials you
  # get when assuming the IAM roles created by this module. This variable
  # applies to all IAM roles created by this module that are intended for people
  # to use, such as allow-read-only-access-from-other-accounts. For IAM roles
  # that are intended for machine users, such as
  # allow-auto-deploy-from-other-accounts, see
  # var.max_session_duration_machine_users.
  max_session_duration_human_users = 43200

  # The maximum allowable session duration, in seconds, for the credentials you
  # get when assuming the IAM roles created by this module. This variable 
  # applies to all IAM roles created by this module that are intended for
  # machine users, such as allow-auto-deploy-from-other-accounts. For IAM roles
  # that are intended for human users, such as
  # allow-read-only-access-from-other-accounts, see
  # var.max_session_duration_human_users.
  max_session_duration_machine_users = 3600

  # What to name the read-only access IAM role
  read_only_access_iam_role_name = "allow-read-only-access-from-other-accounts"

  # What to name the ssh-grunt access IAM role
  ssh_grunt_access_iam_role_name = "allow-ssh-grunt-access-from-other-accounts"

  # What to name the support access IAM role
  support_access_iam_role_name = "allow-support-access-from-other-accounts"

  # A map of tags to apply to the IAM roles.
  tags = {}

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CROSS-ACCOUNT-IAM-ROLES MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/cross-account-iam-roles?ref=v0.75.6"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the AWS Account.
  aws_account_id = <string>

  # Should we require that all IAM Users use Multi-Factor Authentication for
  # both AWS API calls and the AWS Web Console? (true or false)
  should_require_mfa = <bool>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Allow GitHub Actions to assume the auto deploy IAM role using an OpenID
  # Connect Provider. Refer to the docs for github-actions-iam-role for more
  # information. Note that this is mutually exclusive with
  # var.allow_auto_deploy_from_other_account_arns.
  allow_auto_deploy_from_github_actions = null

  # A list of IAM ARNs from other AWS accounts that will be allowed to assume
  # the auto deploy IAM role that has the permissions in
  # var.auto_deploy_permissions.
  allow_auto_deploy_from_other_account_arns = []

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role.
  allow_auto_deploy_iam_role_permissions_boundary = null

  # A list of IAM ARNs from other AWS accounts that will be allowed full (read
  # and write) access to the billing info for this account.
  allow_billing_access_from_other_account_arns = []

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role.
  allow_billing_access_iam_role_permissions_boundary = null

  # A list of IAM ARNs from other AWS accounts that will be allowed full (read
  # and write) access to the services in this account specified in
  # var.dev_permitted_services.
  allow_dev_access_from_other_account_arns = []

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role.
  allow_dev_access_iam_role_permissions_boundary = null

  # A list of IAM ARNs from other AWS accounts that will be allowed full (read
  # and write) access to this account.
  allow_full_access_from_other_account_arns = []

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role.
  allow_full_access_iam_role_permissions_boundary = null

  # A list of IAM ARNs from other AWS accounts that will be allowed IAM admin
  # access to this account.
  allow_iam_admin_access_from_other_account_arns = []

  # A list of IAM ARNs from other AWS accounts that will be allowed read access
  # to the logs in CloudTrail, AWS Config, and CloudWatch for this account. If
  # var.cloudtrail_kms_key_arn is set, will also grant decrypt permissions for
  # the KMS CMK.
  allow_logs_access_from_other_account_arns = []

  # A list of IAM ARNs from other AWS accounts that will be allowed read-only
  # access to this account.
  allow_read_only_access_from_other_account_arns = []

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role.
  allow_read_only_access_iam_role_permissions_boundary = null

  # A list of IAM ARNs from other AWS accounts that will be allowed read access
  # to IAM groups and publish SSH keys. This is used for ssh-grunt.
  allow_ssh_grunt_access_from_other_account_arns = []

  # A list of IAM ARNs from other AWS accounts that will be allowed access to
  # AWS support for this account.
  allow_support_access_from_other_account_arns = []

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role.
  allow_support_access_iam_role_permissions_boundary = null

  # What to name the auto deploy IAM role
  auto_deploy_access_iam_role_name = "allow-auto-deploy-from-other-accounts"

  # A list of IAM permissions (e.g. ec2:*) which will be granted for automated
  # deployment.
  auto_deploy_permissions = []

  # What to name the billing access IAM role
  billing_access_iam_role_name = "allow-billing-only-access-from-other-accounts"

  # The ARN of a KMS CMK used to encrypt CloudTrail logs. If set, the logs IAM
  # role will include permissions to decrypt using this CMK.
  cloudtrail_kms_key_arn = null

  # Set to false to have this module create no resources. This weird parameter
  # exists solely because Terraform does not support conditional modules.
  # Therefore, this is a hack to allow you to conditionally decide if the
  # resources should be created or not.
  create_resources = true

  # What to name the dev access IAM role
  dev_access_iam_role_name = "allow-dev-access-from-other-accounts"

  # A list of AWS services for which the developers from the accounts in
  # var.allow_dev_access_from_other_account_arns will receive full permissions.
  # See
  # https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_actions-resources-contextkeys.html
  # to find the service name. For example, to grant developers access only to
  # EC2 and Amazon Machine Learning, use the value ["ec2","machinelearning"]. Do
  # NOT add iam to the list of services, or that will grant Developers de facto
  # admin access.
  dev_permitted_services = []

  # What to name the full access IAM role
  full_access_iam_role_name = "allow-full-access-from-other-accounts"

  # What to name the IAM admin access IAM role
  iam_admin_access_iam_role_name = "allow-iam-admin-access-from-other-accounts"

  # Include this value as a prefix in the name of every IAM role created by this
  # module. This is useful to prepend, for example, '<account-name>-' to every
  # IAM role name: e.g., allow-full-access-from-other-accounts becomes
  # stage-allow-full-access-from-other-accounts.
  iam_role_name_prefix = ""

  # What to name the logs access IAM role
  logs_access_iam_role_name = "allow-logs-access-from-other-accounts"

  # The maximum allowable session duration, in seconds, for the credentials you
  # get when assuming the IAM roles created by this module. This variable
  # applies to all IAM roles created by this module that are intended for people
  # to use, such as allow-read-only-access-from-other-accounts. For IAM roles
  # that are intended for machine users, such as
  # allow-auto-deploy-from-other-accounts, see
  # var.max_session_duration_machine_users.
  max_session_duration_human_users = 43200

  # The maximum allowable session duration, in seconds, for the credentials you
  # get when assuming the IAM roles created by this module. This variable 
  # applies to all IAM roles created by this module that are intended for
  # machine users, such as allow-auto-deploy-from-other-accounts. For IAM roles
  # that are intended for human users, such as
  # allow-read-only-access-from-other-accounts, see
  # var.max_session_duration_human_users.
  max_session_duration_machine_users = 3600

  # What to name the read-only access IAM role
  read_only_access_iam_role_name = "allow-read-only-access-from-other-accounts"

  # What to name the ssh-grunt access IAM role
  ssh_grunt_access_iam_role_name = "allow-ssh-grunt-access-from-other-accounts"

  # What to name the support access IAM role
  support_access_iam_role_name = "allow-support-access-from-other-accounts"

  # A map of tags to apply to the IAM roles.
  tags = {}

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="aws_account_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the AWS Account.

</HclListItemDescription>
</HclListItem>

<HclListItem name="should_require_mfa" requirement="required" type="bool">
<HclListItemDescription>

Should we require that all IAM Users use Multi-Factor Authentication for both AWS API calls and the AWS Web Console? (true or false)

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="allow_auto_deploy_from_github_actions" requirement="optional" type="object(…)">
<HclListItemDescription>

Allow GitHub Actions to assume the auto deploy IAM role using an OpenID Connect Provider. Refer to the docs for github-actions-iam-role for more information. Note that this is mutually exclusive with <a href="#allow_auto_deploy_from_other_account_arns"><code>allow_auto_deploy_from_other_account_arns</code></a>.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # ARN of the OpenID Connect Provider provisioned for GitHub Actions.
    openid_connect_provider_arn = string

    # URL of the OpenID Connect Provider provisioned for GitHub Actions.
    openid_connect_provider_url = string

    # Map of github repositories to the list of branches that are allowed to assume the IAM role. The repository should
    # be encoded as org/repo-name (e.g., gruntwork-io/terrraform-aws-ci).
    allowed_sources = map(list(string))
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = {
     openid_connect_provider_arn = "ARN"
     openid_connect_provider_url = "URL"
     allowed_sources = {
       "gruntwork-io/terraform-aws-security" = ["main", "dev"]
     }
   }

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

     URL of the OpenID Connect Provider provisioned for GitHub Actions.

```
</details>

<details>


```hcl

     Map of github repositories to the list of branches that are allowed to assume the IAM role. The repository should
     be encoded as org/repo-name (e.g., gruntwork-io/terrraform-aws-ci).

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="allow_auto_deploy_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed to assume the auto deploy IAM role that has the permissions in <a href="#auto_deploy_permissions"><code>auto_deploy_permissions</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = [
     "arn:aws:iam::123445678910:role/jenkins"
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="allow_auto_deploy_iam_role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="allow_billing_access_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed full (read and write) access to the billing info for this account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = [
     "arn:aws:iam::123445678910:root"
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="allow_billing_access_iam_role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="allow_dev_access_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed full (read and write) access to the services in this account specified in <a href="#dev_permitted_services"><code>dev_permitted_services</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = [
     "arn:aws:iam::123445678910:root"
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="allow_dev_access_iam_role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="allow_full_access_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed full (read and write) access to this account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = [
     "arn:aws:iam::123445678910:root"
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="allow_full_access_iam_role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="allow_iam_admin_access_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed IAM admin access to this account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = [
     "arn:aws:iam::123445678910:root"
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="allow_logs_access_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed read access to the logs in CloudTrail, AWS Config, and CloudWatch for this account. If <a href="#cloudtrail_kms_key_arn"><code>cloudtrail_kms_key_arn</code></a> is set, will also grant decrypt permissions for the KMS CMK.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = [
     "arn:aws:iam::123445678910:root"
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="allow_read_only_access_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed read-only access to this account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = [
     "arn:aws:iam::123445678910:root"
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="allow_read_only_access_iam_role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="allow_ssh_grunt_access_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed read access to IAM groups and publish SSH keys. This is used for ssh-grunt.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = [
     "arn:aws:iam::123445678910:root"
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="allow_support_access_from_other_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs from other AWS accounts that will be allowed access to AWS support for this account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = [
     "arn:aws:iam::123445678910:root"
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="allow_support_access_iam_role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="auto_deploy_access_iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

What to name the auto deploy IAM role

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;allow-auto-deploy-from-other-accounts&quot;"/>
</HclListItem>

<HclListItem name="auto_deploy_permissions" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM permissions (e.g. ec2:*) which will be granted for automated deployment.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="billing_access_iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

What to name the billing access IAM role

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;allow-billing-only-access-from-other-accounts&quot;"/>
</HclListItem>

<HclListItem name="cloudtrail_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of a KMS CMK used to encrypt CloudTrail logs. If set, the logs IAM role will include permissions to decrypt using this CMK.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to have this module create no resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if the resources should be created or not.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="dev_access_iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

What to name the dev access IAM role

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;allow-dev-access-from-other-accounts&quot;"/>
</HclListItem>

<HclListItem name="dev_permitted_services" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of AWS services for which the developers from the accounts in <a href="#allow_dev_access_from_other_account_arns"><code>allow_dev_access_from_other_account_arns</code></a> will receive full permissions. See https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_actions-resources-contextkeys.html to find the service name. For example, to grant developers access only to EC2 and Amazon Machine Learning, use the value ['ec2','machinelearning']. Do NOT add iam to the list of services, or that will grant Developers de facto admin access.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="full_access_iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

What to name the full access IAM role

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;allow-full-access-from-other-accounts&quot;"/>
</HclListItem>

<HclListItem name="iam_admin_access_iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

What to name the IAM admin access IAM role

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;allow-iam-admin-access-from-other-accounts&quot;"/>
</HclListItem>

<HclListItem name="iam_role_name_prefix" requirement="optional" type="string">
<HclListItemDescription>

Include this value as a prefix in the name of every IAM role created by this module. This is useful to prepend, for example, '&lt;account-name>-' to every IAM role name: e.g., allow-full-access-from-other-accounts becomes stage-allow-full-access-from-other-accounts.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="logs_access_iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

What to name the logs access IAM role

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;allow-logs-access-from-other-accounts&quot;"/>
</HclListItem>

<HclListItem name="max_session_duration_human_users" requirement="optional" type="number">
<HclListItemDescription>

The maximum allowable session duration, in seconds, for the credentials you get when assuming the IAM roles created by this module. This variable applies to all IAM roles created by this module that are intended for people to use, such as allow-read-only-access-from-other-accounts. For IAM roles that are intended for machine users, such as allow-auto-deploy-from-other-accounts, see <a href="#max_session_duration_machine_users"><code>max_session_duration_machine_users</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="43200"/>
</HclListItem>

<HclListItem name="max_session_duration_machine_users" requirement="optional" type="number">
<HclListItemDescription>

The maximum allowable session duration, in seconds, for the credentials you get when assuming the IAM roles created by this module. This variable  applies to all IAM roles created by this module that are intended for machine users, such as allow-auto-deploy-from-other-accounts. For IAM roles that are intended for human users, such as allow-read-only-access-from-other-accounts, see <a href="#max_session_duration_human_users"><code>max_session_duration_human_users</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="3600"/>
</HclListItem>

<HclListItem name="read_only_access_iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

What to name the read-only access IAM role

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;allow-read-only-access-from-other-accounts&quot;"/>
</HclListItem>

<HclListItem name="ssh_grunt_access_iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

What to name the ssh-grunt access IAM role

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;allow-ssh-grunt-access-from-other-accounts&quot;"/>
</HclListItem>

<HclListItem name="support_access_iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

What to name the support access IAM role

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;allow-support-access-from-other-accounts&quot;"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the IAM roles.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="use_managed_iam_policies" requirement="optional" type="bool">
<HclListItemDescription>

When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="allow_auto_deploy_access_from_other_accounts_iam_role_arn">
</HclListItem>

<HclListItem name="allow_auto_deploy_access_from_other_accounts_iam_role_id">
</HclListItem>

<HclListItem name="allow_billing_access_from_other_accounts_iam_role_arn">
</HclListItem>

<HclListItem name="allow_billing_access_from_other_accounts_iam_role_id">
</HclListItem>

<HclListItem name="allow_billing_access_sign_in_url">
</HclListItem>

<HclListItem name="allow_dev_access_from_other_accounts_iam_role_arn">
</HclListItem>

<HclListItem name="allow_dev_access_from_other_accounts_iam_role_id">
</HclListItem>

<HclListItem name="allow_dev_access_sign_in_url">
</HclListItem>

<HclListItem name="allow_full_access_from_other_accounts_iam_role_arn">
</HclListItem>

<HclListItem name="allow_full_access_from_other_accounts_iam_role_id">
</HclListItem>

<HclListItem name="allow_full_access_sign_in_url">
</HclListItem>

<HclListItem name="allow_iam_admin_access_from_other_accounts_iam_role_arn">
</HclListItem>

<HclListItem name="allow_iam_admin_access_from_other_accounts_iam_role_id">
</HclListItem>

<HclListItem name="allow_iam_admin_access_sign_in_url">
</HclListItem>

<HclListItem name="allow_logs_access_from_other_accounts_iam_role_arn">
</HclListItem>

<HclListItem name="allow_logs_access_from_other_accounts_iam_role_id">
</HclListItem>

<HclListItem name="allow_logs_access_sign_in_url">
</HclListItem>

<HclListItem name="allow_read_only_access_from_other_accounts_iam_role_arn">
</HclListItem>

<HclListItem name="allow_read_only_access_from_other_accounts_iam_role_id">
</HclListItem>

<HclListItem name="allow_read_only_access_sign_in_url">
</HclListItem>

<HclListItem name="allow_ssh_grunt_access_from_other_accounts_iam_role_arn">
</HclListItem>

<HclListItem name="allow_ssh_grunt_access_from_other_accounts_iam_role_id">
</HclListItem>

<HclListItem name="allow_ssh_grunt_access_sign_in_url">
</HclListItem>

<HclListItem name="allow_support_access_from_other_accounts_iam_role_arn">
</HclListItem>

<HclListItem name="allow_support_access_from_other_accounts_iam_role_id">
</HclListItem>

<HclListItem name="allow_support_access_sign_in_url">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.6/modules/cross-account-iam-roles/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.6/modules/cross-account-iam-roles/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.6/modules/cross-account-iam-roles/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "5c460b5a74351be88efa2e036634c611"
}
##DOCS-SOURCER-END -->
