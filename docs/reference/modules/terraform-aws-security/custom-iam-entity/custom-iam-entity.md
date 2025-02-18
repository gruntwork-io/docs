---
title: "Custom IAM Entity"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.75.9" lastModifiedVersion="0.69.2"/>

# Custom IAM Entity

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.9/modules/custom-iam-entity" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.69.2" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Gruntwork Terraform Module creates an IAM group and/or role and attaches a provided set of IAM managed policies to the group. This can be used in conjunction with the [iam-groups](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.9/modules/iam-groups), [cross-account-iam-roles](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.9/modules/cross-account-iam-roles), and [saml-iam-roles](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.9/modules/saml-iam-roles) modules which create a set of groups and roles with smart defaults. Use this module to easily create IAM groups and roles with a defined set of permissions.

### Requirements

*   You will need to be authenticated to AWS with an account that has `iam:*` permissions.

### Instructions

Check out the [custom-iam-entity example](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.9/examples/custom-iam-entity) for a working example.

#### Resources Created

*   **IAM group** - (optional) an IAM group with the provided name and attaches each of the requested policies.
*   **IAM role** - (optional) an IAM role with the provided name and attaches each of the requested policies.

If neither role nor group are provided, this module does nothing.

#### Resources NOT Created

*   **IAM users** - This module does not create any IAM Users, nor assign any existing IAM Users to IAM Groups. You can use the [iam-users module](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.9/modules/iam-users) to create users.
*   **IAM policies** - This module only attaches policies by ARN or by name. It does not create any new policies.

#### MFA support

This module includes the `should_require_mfa` variable which controls whether MFA should be required for the created IAM group and/or role. The implementation of how MFA is enforced differs between IAM groups and IAM roles.

*   For IAM groups, we attach the `require_mfa_policy` from the [`iam-policies` module](https://github.com/gruntwork-io/terraform-aws-security/blob/main/modules/iam-policies/README.md). This policy denies access to all AWS APIs unless MFA is being used, except those allowing a member of the group to manage their own MFA devices.
*   For IAM roles, we use the `aws:MultiFactorAuthPresent` condition key on the role's trust policy, ensuring that MFA is present when assuming the role.

The reason for this difference is difficult to explain, but boils down to limitations imposed by [role chaining](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_terms-and-concepts.html#iam-term-role-chaining) in combination with the presence of the `aws:MultiFactorAuthPresent` condition key under various authentication scenarios. For more information, refer to the AWS docs on [Configuring MFA-protected API access](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_configure-api-require.html#MFAProtectedAPI-cross-account-delegation).

## Background Information

For background information on IAM, IAM users, IAM policies, and more, check out the [background information docs in
the iam-policies module](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.9/modules/iam-policies#background-information).

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CUSTOM-IAM-ENTITY MODULE
# ------------------------------------------------------------------------------------------------------

module "custom_iam_entity" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/custom-iam-entity?ref=v0.75.9"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Should we require that all IAM Users use Multi-Factor Authentication for
  # both AWS API calls and the AWS Web Console? (true or false)
  should_require_mfa = <bool>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of IAM ARNs (users, groups, or roles) that can assume this role.
  # Required if should_create_iam_role is true.
  assume_role_arns = []

  # Map of custom conditions to apply to the assume role policy for the custom
  # IAM role. The input is a map of objects where the map keys are arbitrary
  # unique IDs and the values are objects that define the condition blocks.
  # Refer to
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/iam_policy_document#condition
  # for more information on the supported condition fields.
  assume_role_custom_conditions = {}

  # Custom IAM policy JSON for the IAM Role to control assume role settings.
  # Note that when an assume role policy is passed in this manner,
  # var.should_require_mfa is ignored.
  assume_role_iam_policy_json = null

  # The name to use for the custom inline IAM policy that is attached to the
  # Role/Group when var.iam_policy is configured.
  custom_iam_policy_name = "GrantCustomIAMPolicy"

  # A list of IAM AWS Managed Policy names to attach to the group.
  iam_aws_managed_policy_names = null

  # A list of IAM AWS Customer Managed policy names to attach to the group.
  iam_customer_managed_policy_names = null

  # A list of IAM roles that this members of this group can assume.
  iam_group_assume_role_arns = null

  # The name of an IAM Group to create. Required when
  # var.should_create_iam_group is true.
  iam_group_name = null

  # A list of policies (by ARN) to attach to this group.
  iam_policy_arns = null

  # JSON formatted IAM policy that should be attached directly to the IAM
  # role/group.
  iam_policy_json = ""

  # The name to use for the IAM policy that is attached to the Role/Group when
  # var.iam_policy_json is configured.
  iam_policy_json_name = "CustomIAMPolicyFromJSON"

  # The name of an IAM role to create. Required when var.should_create_iam_role
  # is true.
  iam_role_name = null

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role
  iam_role_permissions_boundary = null

  # The maximum allowable session duration, in seconds, for the credentials you
  # get when assuming the IAM roles created by this module.
  max_session_duration = 43200

  # A list of AWS services for which the IAM role will receive full permissions.
  # See
  # https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_actions-resources-contextkeys.html
  # to find the service name. For example, to grant developers access only to
  # EC2 and Amazon Machine Learning, use the value ["ec2","machinelearning"].
  permitted_full_access_services = []

  # Should we create an IAM group with the attached policies? (default false)
  should_create_iam_group = false

  # Should we create an IAM role with the attached policies? (default false)
  should_create_iam_role = false

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CUSTOM-IAM-ENTITY MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/custom-iam-entity?ref=v0.75.9"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Should we require that all IAM Users use Multi-Factor Authentication for
  # both AWS API calls and the AWS Web Console? (true or false)
  should_require_mfa = <bool>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of IAM ARNs (users, groups, or roles) that can assume this role.
  # Required if should_create_iam_role is true.
  assume_role_arns = []

  # Map of custom conditions to apply to the assume role policy for the custom
  # IAM role. The input is a map of objects where the map keys are arbitrary
  # unique IDs and the values are objects that define the condition blocks.
  # Refer to
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/iam_policy_document#condition
  # for more information on the supported condition fields.
  assume_role_custom_conditions = {}

  # Custom IAM policy JSON for the IAM Role to control assume role settings.
  # Note that when an assume role policy is passed in this manner,
  # var.should_require_mfa is ignored.
  assume_role_iam_policy_json = null

  # The name to use for the custom inline IAM policy that is attached to the
  # Role/Group when var.iam_policy is configured.
  custom_iam_policy_name = "GrantCustomIAMPolicy"

  # A list of IAM AWS Managed Policy names to attach to the group.
  iam_aws_managed_policy_names = null

  # A list of IAM AWS Customer Managed policy names to attach to the group.
  iam_customer_managed_policy_names = null

  # A list of IAM roles that this members of this group can assume.
  iam_group_assume_role_arns = null

  # The name of an IAM Group to create. Required when
  # var.should_create_iam_group is true.
  iam_group_name = null

  # A list of policies (by ARN) to attach to this group.
  iam_policy_arns = null

  # JSON formatted IAM policy that should be attached directly to the IAM
  # role/group.
  iam_policy_json = ""

  # The name to use for the IAM policy that is attached to the Role/Group when
  # var.iam_policy_json is configured.
  iam_policy_json_name = "CustomIAMPolicyFromJSON"

  # The name of an IAM role to create. Required when var.should_create_iam_role
  # is true.
  iam_role_name = null

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role
  iam_role_permissions_boundary = null

  # The maximum allowable session duration, in seconds, for the credentials you
  # get when assuming the IAM roles created by this module.
  max_session_duration = 43200

  # A list of AWS services for which the IAM role will receive full permissions.
  # See
  # https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_actions-resources-contextkeys.html
  # to find the service name. For example, to grant developers access only to
  # EC2 and Amazon Machine Learning, use the value ["ec2","machinelearning"].
  permitted_full_access_services = []

  # Should we create an IAM group with the attached policies? (default false)
  should_create_iam_group = false

  # Should we create an IAM role with the attached policies? (default false)
  should_create_iam_role = false

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="should_require_mfa" requirement="required" type="bool">
<HclListItemDescription>

Should we require that all IAM Users use Multi-Factor Authentication for both AWS API calls and the AWS Web Console? (true or false)

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="assume_role_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs (users, groups, or roles) that can assume this role. Required if should_create_iam_role is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="assume_role_custom_conditions" requirement="optional" type="map(object(…))">
<HclListItemDescription>

Map of custom conditions to apply to the assume role policy for the custom IAM role. The input is a map of objects where the map keys are arbitrary unique IDs and the values are objects that define the condition blocks. Refer to https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/iam_policy_document#condition for more information on the supported condition fields.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    test     = string
    values   = list(string)
    variable = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="assume_role_iam_policy_json" requirement="optional" type="string">
<HclListItemDescription>

Custom IAM policy JSON for the IAM Role to control assume role settings. Note that when an assume role policy is passed in this manner, <a href="#should_require_mfa"><code>should_require_mfa</code></a> is ignored.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_iam_policy_name" requirement="optional" type="string">
<HclListItemDescription>

The name to use for the custom inline IAM policy that is attached to the Role/Group when <a href="#iam_policy"><code>iam_policy</code></a> is configured.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;GrantCustomIAMPolicy&quot;"/>
</HclListItem>

<HclListItem name="iam_aws_managed_policy_names" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM AWS Managed Policy names to attach to the group.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="iam_customer_managed_policy_names" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM AWS Customer Managed policy names to attach to the group.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="iam_group_assume_role_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM roles that this members of this group can assume.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="iam_group_name" requirement="optional" type="string">
<HclListItemDescription>

The name of an IAM Group to create. Required when <a href="#should_create_iam_group"><code>should_create_iam_group</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="iam_policy_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of policies (by ARN) to attach to this group.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="iam_policy_json" requirement="optional" type="string">
<HclListItemDescription>

JSON formatted IAM policy that should be attached directly to the IAM role/group.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="iam_policy_json_name" requirement="optional" type="string">
<HclListItemDescription>

The name to use for the IAM policy that is attached to the Role/Group when <a href="#iam_policy_json"><code>iam_policy_json</code></a> is configured.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;CustomIAMPolicyFromJSON&quot;"/>
</HclListItem>

<HclListItem name="iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

The name of an IAM role to create. Required when <a href="#should_create_iam_role"><code>should_create_iam_role</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="iam_role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="max_session_duration" requirement="optional" type="number">
<HclListItemDescription>

The maximum allowable session duration, in seconds, for the credentials you get when assuming the IAM roles created by this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="43200"/>
</HclListItem>

<HclListItem name="permitted_full_access_services" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of AWS services for which the IAM role will receive full permissions. See https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_actions-resources-contextkeys.html to find the service name. For example, to grant developers access only to EC2 and Amazon Machine Learning, use the value ['ec2','machinelearning'].

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="should_create_iam_group" requirement="optional" type="bool">
<HclListItemDescription>

Should we create an IAM group with the attached policies? (default false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="should_create_iam_role" requirement="optional" type="bool">
<HclListItemDescription>

Should we create an IAM role with the attached policies? (default false)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="iam_group_arn">
<HclListItemDescription>

The ARN of the IAM group.

</HclListItemDescription>
</HclListItem>

<HclListItem name="iam_group_name">
<HclListItemDescription>

The name of the IAM group.

</HclListItemDescription>
</HclListItem>

<HclListItem name="iam_role_arn">
<HclListItemDescription>

The ARN of the IAM role.

</HclListItemDescription>
</HclListItem>

<HclListItem name="iam_role_name">
<HclListItemDescription>

The name of the IAM role.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.9/modules/custom-iam-entity/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.9/modules/custom-iam-entity/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.9/modules/custom-iam-entity/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "cbd4538f03c4f6ce54e0c0325b2deb7d"
}
##DOCS-SOURCER-END -->
