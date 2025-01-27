---
title: "A best-practices set of IAM roles for SAML access"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.75.5" lastModifiedVersion="0.69.2"/>

# A best-practices set of IAM roles for SAML access

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.5/modules/saml-iam-roles" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.69.2" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module can be used to allow users authenticated via external Security Assertion Markup Language (SAML) identity
providers such as Google, Amazon SSO, Microsoft Active Directory Federation Services (ADFS), Okta, and OneLogin to access
your AWS accounts ([saml-access](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_enable-console-saml.html)).
This allows you to define each environment (mgmt, stage, prod, etc) in a separate AWS account and to use SAML to assume
different roles in each account.

If you're not familiar with IAM concepts, start with the [Background Information](#background-information) section as a
way to familiarize yourself with the terminology.

## Resources Created

This module creates the following IAM roles (all optional):

*   **allow-read-only-access-from-saml**: Users authenticated by the SAML providers in
    `var.allow_read_only_access_from_saml_provider_arns` will get read-only access to all services in this account.

*   **allow-billing-access-from-saml**: Users authenticated by the SAML providers in
    `var.allow_billing_access_from_saml_provider_arns` will get full (read and write) access to the billing details for
    this account.

*   **allow-support-access-from-saml**: Users authenticated by the SAML providers in
    `var.allow_support_access_from_saml_provider_arns` will get access to AWS support for this account.

*   **allow-logs-access-from-saml**: Users authenticated by the SAML providers in
    `var.allow_logs_access_from_saml_provider_arns` will get read access to the logs in CloudTrail, AWS Config, and
    CloudWatch for this account. Since CloudTrail logs may be encrypted with a KMS CMK, if `var.cloudtrail_kms_key_arn` is
    set, these users will also get permissions to decrypt using this KMS CMK.

*   **allow-ssh-grunt-access-from-saml**: Users authenticated by the SAML providers in
    `var.allow_ssh_grunt_access_from_saml_provider_arns` will get read access to IAM Groups and public SSH keys. This is
    useful to allow [ssh-grunt](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.5/modules/ssh-grunt) running on EC2 Instances in other AWS accounts to validate SSH
    connections against IAM users defined in this AWS account.

*   **allow-dev-access-from-saml**:Users authenticated by the SAML providers in
    `var.allow_dev_access_from_saml_provider_arns` will get full (read and write) access to the services in this account
    specified in `var.dev_permitted_services`.

*   **allow-full-access-from-saml**: Users authenticated by the SAML providers in
    `var.allow_full_access_from_saml_provider_arns` will get full (read and write) access to all services in this account.

*   **allow-iam-admin-access-from-saml**: Users authenticated by the SAML providers in
    `var.allow_iam_admin_access_from_saml_provider_arns` will get full IAM (`iam:*`) access in this account.

*   **allow-auto-deploy-access-from-saml**: Users authenticated by the SAML providers in
    `var.allow_read_only_access_from_saml_provider_arns` will get automated deployment access to all services in this
    account with the permissions specified in `var.auto_deploy_permissions`. The main use case is to allow a CI server
    (e.g. Jenkins) in another AWS account to do automated deployments in this AWS account.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S SAML-IAM-ROLES MODULE
# ------------------------------------------------------------------------------------------------------

module "saml_iam_roles" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/saml-iam-roles?ref=v0.75.5"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the AWS Account.
  aws_account_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A flag to indicate if auto deploy access will be delegated to SAML
  # providers.
  allow_auto_deploy_access_from_saml_provider = false

  # A list of IAM ARNs of Identity Providers that will be delegated the auto
  # deploy IAM role that has the permissions in var.auto_deploy_permissions.
  allow_auto_deploy_from_saml_provider_arns = []

  # A flag to indicate if billing access will be delegated to SAML providers.
  allow_billing_access_from_saml_provider = false

  # A list of IAM ARNs of Identity Providers that will be delegated full (read
  # and write) access to the billing info for this account.
  allow_billing_access_from_saml_provider_arns = []

  # A flag to indicate if dev access will be delegated to SAML providers.
  allow_dev_access_from_saml_provider = false

  # A list of IAM ARNs of Identity Providers that will be delegated full (read
  # and write) access to the services in this account specified in
  # var.dev_permitted_services.
  allow_dev_access_from_saml_provider_arns = []

  # A flag to indicate if full access will be delegated to SAML providers.
  allow_full_access_from_saml_provider = false

  # A list of IAM ARNs of Identity Providers that will be delegated full (read
  # and write) access to this account.
  allow_full_access_from_saml_provider_arns = []

  # A flag to indicate if IAM admin access will be delegated to SAML providers.
  allow_iam_admin_access_from_saml_provider = false

  # A list of IAM ARNs of Identity Providers that will be delegated IAM admin
  # access to this account.
  allow_iam_admin_access_from_saml_provider_arns = []

  # A flag to indicate if logs access will be delegated to SAML providers.
  allow_logs_access_from_saml_provider = false

  # A list of IAM ARNs of Identity Providers that will be delegated read access
  # to the logs in CloudTrail, AWS Config, and CloudWatch for this account. If
  # var.cloudtrail_kms_key_arn is set, the users will also be delegated access
  # to decrypt using this KMS CMK.
  allow_logs_access_from_saml_provider_arns = []

  # A flag to indicate if read only access will be delegated to SAML providers.
  allow_read_only_access_from_saml_provider = false

  # A list of IAM ARNs of Identity Providers that will be delegated read-only
  # access to this account.
  allow_read_only_access_from_saml_provider_arns = []

  # A flag to indicate if ssh-grunt access will be delegated to SAML providers.
  allow_ssh_grunt_access_from_saml_provider = false

  # A list of IAM ARNs of Identity Providers that will be delegated read access
  # to IAM groups and publish SSH keys. This is used for ssh-grunt.
  allow_ssh_grunt_access_from_saml_provider_arns = []

  # A flag to indicate if AWS support access will be delegated to SAML
  # providers.
  allow_support_access_from_saml_provider = false

  # A list of IAM ARNs of Identity Providers that will be delegated AWS support
  # access for this account.
  allow_support_access_from_saml_provider_arns = []

  # What to name the auto deploy IAM role
  auto_deploy_access_iam_role_name = "allow-auto-deploy-from-saml"

  # A list of IAM permissions (e.g. ec2:*) which will be granted for automated
  # deployment.
  auto_deploy_permissions = []

  # What to name the billing access IAM role
  billing_access_iam_role_name = "allow-billing-only-access-from-saml"

  # The ARN of a KMS CMK used to encrypt CloudTrail logs. If set, the logs IAM
  # roles will include permissions to decrypt using this CMK.
  cloudtrail_kms_key_arn = null

  # What to name the dev access IAM role
  dev_access_iam_role_name = "allow-dev-access-from-saml"

  # A list of AWS services for which the developers from the accounts in
  # var.allow_dev_access_from_other_account_arns will receive full permissions.
  # See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to
  # grant developers access only to EC2 and Amazon Machine Learning, use the
  # value ["ec2","machinelearning"]. Do NOT add iam to the list of services, or
  # that will grant Developers de facto admin access.
  dev_permitted_services = []

  # What to name the full access IAM role
  full_access_iam_role_name = "allow-full-access-from-saml"

  # What to name the IAM admin access IAM role
  iam_admin_access_iam_role_name = "allow-iam-admin-access-from-saml"

  # What to name the logs access IAM role
  logs_access_iam_role_name = "allow-logs-access-from-saml"

  # The maximum allowable session duration, in seconds, for the credentials you
  # get when assuming the IAM roles created by this module. This variable
  # applies to all IAM roles created by this module that are intended for people
  # to use, such as allow-read-only-access-from-saml. For IAM roles that are
  # intended for machine users, such as allow-auto-deploy-from-other-accounts,
  # see var.max_session_duration_machine_users.
  max_session_duration_human_users = 43200

  # The maximum allowable session duration, in seconds, for the credentials you
  # get when assuming the IAM roles created by this module. This variable 
  # applies to all IAM roles created by this module that are intended for
  # machine users, such as allow-auto-deploy-from-saml. For IAM roles that are
  # intended for human users, such as
  # allow-read-only-access-from-other-accounts, see
  # var.max_session_duration_human_users.
  max_session_duration_machine_users = 3600

  # What to name the read-only access IAM role
  read_only_access_iam_role_name = "allow-read-only-access-from-saml"

  # What to name the ssh-grunt access IAM role
  ssh_grunt_access_iam_role_name = "allow-ssh-grunt-access-from-saml"

  # What to name the support access IAM role
  support_access_iam_role_name = "allow-support-access-from-saml"

  # A map of tags to apply to the IAM roles.
  tags = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S SAML-IAM-ROLES MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/saml-iam-roles?ref=v0.75.5"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the AWS Account.
  aws_account_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A flag to indicate if auto deploy access will be delegated to SAML
  # providers.
  allow_auto_deploy_access_from_saml_provider = false

  # A list of IAM ARNs of Identity Providers that will be delegated the auto
  # deploy IAM role that has the permissions in var.auto_deploy_permissions.
  allow_auto_deploy_from_saml_provider_arns = []

  # A flag to indicate if billing access will be delegated to SAML providers.
  allow_billing_access_from_saml_provider = false

  # A list of IAM ARNs of Identity Providers that will be delegated full (read
  # and write) access to the billing info for this account.
  allow_billing_access_from_saml_provider_arns = []

  # A flag to indicate if dev access will be delegated to SAML providers.
  allow_dev_access_from_saml_provider = false

  # A list of IAM ARNs of Identity Providers that will be delegated full (read
  # and write) access to the services in this account specified in
  # var.dev_permitted_services.
  allow_dev_access_from_saml_provider_arns = []

  # A flag to indicate if full access will be delegated to SAML providers.
  allow_full_access_from_saml_provider = false

  # A list of IAM ARNs of Identity Providers that will be delegated full (read
  # and write) access to this account.
  allow_full_access_from_saml_provider_arns = []

  # A flag to indicate if IAM admin access will be delegated to SAML providers.
  allow_iam_admin_access_from_saml_provider = false

  # A list of IAM ARNs of Identity Providers that will be delegated IAM admin
  # access to this account.
  allow_iam_admin_access_from_saml_provider_arns = []

  # A flag to indicate if logs access will be delegated to SAML providers.
  allow_logs_access_from_saml_provider = false

  # A list of IAM ARNs of Identity Providers that will be delegated read access
  # to the logs in CloudTrail, AWS Config, and CloudWatch for this account. If
  # var.cloudtrail_kms_key_arn is set, the users will also be delegated access
  # to decrypt using this KMS CMK.
  allow_logs_access_from_saml_provider_arns = []

  # A flag to indicate if read only access will be delegated to SAML providers.
  allow_read_only_access_from_saml_provider = false

  # A list of IAM ARNs of Identity Providers that will be delegated read-only
  # access to this account.
  allow_read_only_access_from_saml_provider_arns = []

  # A flag to indicate if ssh-grunt access will be delegated to SAML providers.
  allow_ssh_grunt_access_from_saml_provider = false

  # A list of IAM ARNs of Identity Providers that will be delegated read access
  # to IAM groups and publish SSH keys. This is used for ssh-grunt.
  allow_ssh_grunt_access_from_saml_provider_arns = []

  # A flag to indicate if AWS support access will be delegated to SAML
  # providers.
  allow_support_access_from_saml_provider = false

  # A list of IAM ARNs of Identity Providers that will be delegated AWS support
  # access for this account.
  allow_support_access_from_saml_provider_arns = []

  # What to name the auto deploy IAM role
  auto_deploy_access_iam_role_name = "allow-auto-deploy-from-saml"

  # A list of IAM permissions (e.g. ec2:*) which will be granted for automated
  # deployment.
  auto_deploy_permissions = []

  # What to name the billing access IAM role
  billing_access_iam_role_name = "allow-billing-only-access-from-saml"

  # The ARN of a KMS CMK used to encrypt CloudTrail logs. If set, the logs IAM
  # roles will include permissions to decrypt using this CMK.
  cloudtrail_kms_key_arn = null

  # What to name the dev access IAM role
  dev_access_iam_role_name = "allow-dev-access-from-saml"

  # A list of AWS services for which the developers from the accounts in
  # var.allow_dev_access_from_other_account_arns will receive full permissions.
  # See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to
  # grant developers access only to EC2 and Amazon Machine Learning, use the
  # value ["ec2","machinelearning"]. Do NOT add iam to the list of services, or
  # that will grant Developers de facto admin access.
  dev_permitted_services = []

  # What to name the full access IAM role
  full_access_iam_role_name = "allow-full-access-from-saml"

  # What to name the IAM admin access IAM role
  iam_admin_access_iam_role_name = "allow-iam-admin-access-from-saml"

  # What to name the logs access IAM role
  logs_access_iam_role_name = "allow-logs-access-from-saml"

  # The maximum allowable session duration, in seconds, for the credentials you
  # get when assuming the IAM roles created by this module. This variable
  # applies to all IAM roles created by this module that are intended for people
  # to use, such as allow-read-only-access-from-saml. For IAM roles that are
  # intended for machine users, such as allow-auto-deploy-from-other-accounts,
  # see var.max_session_duration_machine_users.
  max_session_duration_human_users = 43200

  # The maximum allowable session duration, in seconds, for the credentials you
  # get when assuming the IAM roles created by this module. This variable 
  # applies to all IAM roles created by this module that are intended for
  # machine users, such as allow-auto-deploy-from-saml. For IAM roles that are
  # intended for human users, such as
  # allow-read-only-access-from-other-accounts, see
  # var.max_session_duration_human_users.
  max_session_duration_machine_users = 3600

  # What to name the read-only access IAM role
  read_only_access_iam_role_name = "allow-read-only-access-from-saml"

  # What to name the ssh-grunt access IAM role
  ssh_grunt_access_iam_role_name = "allow-ssh-grunt-access-from-saml"

  # What to name the support access IAM role
  support_access_iam_role_name = "allow-support-access-from-saml"

  # A map of tags to apply to the IAM roles.
  tags = {}

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

### Optional

<HclListItem name="allow_auto_deploy_access_from_saml_provider" requirement="optional" type="bool">
<HclListItemDescription>

A flag to indicate if auto deploy access will be delegated to SAML providers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="allow_auto_deploy_from_saml_provider_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs of Identity Providers that will be delegated the auto deploy IAM role that has the permissions in <a href="#auto_deploy_permissions"><code>auto_deploy_permissions</code></a>.

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

<HclListItem name="allow_billing_access_from_saml_provider" requirement="optional" type="bool">
<HclListItemDescription>

A flag to indicate if billing access will be delegated to SAML providers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="allow_billing_access_from_saml_provider_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs of Identity Providers that will be delegated full (read and write) access to the billing info for this account.

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

<HclListItem name="allow_dev_access_from_saml_provider" requirement="optional" type="bool">
<HclListItemDescription>

A flag to indicate if dev access will be delegated to SAML providers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="allow_dev_access_from_saml_provider_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs of Identity Providers that will be delegated full (read and write) access to the services in this account specified in <a href="#dev_permitted_services"><code>dev_permitted_services</code></a>.

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

<HclListItem name="allow_full_access_from_saml_provider" requirement="optional" type="bool">
<HclListItemDescription>

A flag to indicate if full access will be delegated to SAML providers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="allow_full_access_from_saml_provider_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs of Identity Providers that will be delegated full (read and write) access to this account.

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

<HclListItem name="allow_iam_admin_access_from_saml_provider" requirement="optional" type="bool">
<HclListItemDescription>

A flag to indicate if IAM admin access will be delegated to SAML providers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="allow_iam_admin_access_from_saml_provider_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs of Identity Providers that will be delegated IAM admin access to this account.

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

<HclListItem name="allow_logs_access_from_saml_provider" requirement="optional" type="bool">
<HclListItemDescription>

A flag to indicate if logs access will be delegated to SAML providers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="allow_logs_access_from_saml_provider_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs of Identity Providers that will be delegated read access to the logs in CloudTrail, AWS Config, and CloudWatch for this account. If <a href="#cloudtrail_kms_key_arn"><code>cloudtrail_kms_key_arn</code></a> is set, the users will also be delegated access to decrypt using this KMS CMK.

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

<HclListItem name="allow_read_only_access_from_saml_provider" requirement="optional" type="bool">
<HclListItemDescription>

A flag to indicate if read only access will be delegated to SAML providers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="allow_read_only_access_from_saml_provider_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs of Identity Providers that will be delegated read-only access to this account.

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

<HclListItem name="allow_ssh_grunt_access_from_saml_provider" requirement="optional" type="bool">
<HclListItemDescription>

A flag to indicate if ssh-grunt access will be delegated to SAML providers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="allow_ssh_grunt_access_from_saml_provider_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs of Identity Providers that will be delegated read access to IAM groups and publish SSH keys. This is used for ssh-grunt.

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

<HclListItem name="allow_support_access_from_saml_provider" requirement="optional" type="bool">
<HclListItemDescription>

A flag to indicate if AWS support access will be delegated to SAML providers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="allow_support_access_from_saml_provider_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs of Identity Providers that will be delegated AWS support access for this account.

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

<HclListItem name="auto_deploy_access_iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

What to name the auto deploy IAM role

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;allow-auto-deploy-from-saml&quot;"/>
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
<HclListItemDefaultValue defaultValue="&quot;allow-billing-only-access-from-saml&quot;"/>
</HclListItem>

<HclListItem name="cloudtrail_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of a KMS CMK used to encrypt CloudTrail logs. If set, the logs IAM roles will include permissions to decrypt using this CMK.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="dev_access_iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

What to name the dev access IAM role

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;allow-dev-access-from-saml&quot;"/>
</HclListItem>

<HclListItem name="dev_permitted_services" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of AWS services for which the developers from the accounts in <a href="#allow_dev_access_from_other_account_arns"><code>allow_dev_access_from_other_account_arns</code></a> will receive full permissions. See https://goo.gl/ZyoHlz to find the IAM Service name. For example, to grant developers access only to EC2 and Amazon Machine Learning, use the value ['ec2','machinelearning']. Do NOT add iam to the list of services, or that will grant Developers de facto admin access.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="full_access_iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

What to name the full access IAM role

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;allow-full-access-from-saml&quot;"/>
</HclListItem>

<HclListItem name="iam_admin_access_iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

What to name the IAM admin access IAM role

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;allow-iam-admin-access-from-saml&quot;"/>
</HclListItem>

<HclListItem name="logs_access_iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

What to name the logs access IAM role

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;allow-logs-access-from-saml&quot;"/>
</HclListItem>

<HclListItem name="max_session_duration_human_users" requirement="optional" type="number">
<HclListItemDescription>

The maximum allowable session duration, in seconds, for the credentials you get when assuming the IAM roles created by this module. This variable applies to all IAM roles created by this module that are intended for people to use, such as allow-read-only-access-from-saml. For IAM roles that are intended for machine users, such as allow-auto-deploy-from-other-accounts, see <a href="#max_session_duration_machine_users"><code>max_session_duration_machine_users</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="43200"/>
</HclListItem>

<HclListItem name="max_session_duration_machine_users" requirement="optional" type="number">
<HclListItemDescription>

The maximum allowable session duration, in seconds, for the credentials you get when assuming the IAM roles created by this module. This variable  applies to all IAM roles created by this module that are intended for machine users, such as allow-auto-deploy-from-saml. For IAM roles that are intended for human users, such as allow-read-only-access-from-other-accounts, see <a href="#max_session_duration_human_users"><code>max_session_duration_human_users</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="3600"/>
</HclListItem>

<HclListItem name="read_only_access_iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

What to name the read-only access IAM role

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;allow-read-only-access-from-saml&quot;"/>
</HclListItem>

<HclListItem name="ssh_grunt_access_iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

What to name the ssh-grunt access IAM role

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;allow-ssh-grunt-access-from-saml&quot;"/>
</HclListItem>

<HclListItem name="support_access_iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

What to name the support access IAM role

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;allow-support-access-from-saml&quot;"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the IAM roles.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="allow_auto_deploy_access_from_saml_iam_role_arn">
</HclListItem>

<HclListItem name="allow_auto_deploy_access_from_saml_iam_role_id">
</HclListItem>

<HclListItem name="allow_billing_access_from_saml_iam_role_arn">
</HclListItem>

<HclListItem name="allow_billing_access_from_saml_iam_role_id">
</HclListItem>

<HclListItem name="allow_dev_access_from_saml_iam_role_arn">
</HclListItem>

<HclListItem name="allow_dev_access_from_saml_iam_role_id">
</HclListItem>

<HclListItem name="allow_full_access_from_saml_iam_role_arn">
</HclListItem>

<HclListItem name="allow_full_access_from_saml_iam_role_id">
</HclListItem>

<HclListItem name="allow_iam_admin_access_from_saml_iam_role_arn">
</HclListItem>

<HclListItem name="allow_logs_access_from_saml_iam_role_arn">
</HclListItem>

<HclListItem name="allow_logs_access_from_saml_iam_role_id">
</HclListItem>

<HclListItem name="allow_read_only_access_from_saml_iam_role_arn">
</HclListItem>

<HclListItem name="allow_read_only_access_from_saml_iam_role_id">
</HclListItem>

<HclListItem name="allow_ssh_grunt_access_from_saml_iam_role_arn">
</HclListItem>

<HclListItem name="allow_ssh_grunt_access_from_saml_iam_role_id">
</HclListItem>

<HclListItem name="allow_support_access_from_saml_iam_role_arn">
</HclListItem>

<HclListItem name="allow_support_access_from_saml_iam_role_id">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.5/modules/saml-iam-roles/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.5/modules/saml-iam-roles/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.5/modules/saml-iam-roles/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "a74a08707a1851b8dae829fa593143fb"
}
##DOCS-SOURCER-END -->
