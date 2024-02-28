---
title: "SSO Permission Sets"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Control Tower" version="0.5.1" />

# SSO Permission Sets

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.5.1/modules/aws-sso/sso-permission-sets" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases?q=sso-permission-sets" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module contains [Terraform](https://www.terraform.io) code to provision and manage best practices set of Permission Sets for AWS SSO (aka Identity Center).

## Features

*   Define and provision multiple Permission Sets.
*   Assign Permission Sets directly to AWS Identity Store Groups so that they are immediately available to access your AWS
    Accounts.
*   Assign managed and inline IAM Policies to the Permission Sets.

## Learn

### What is AWS SSO / Identity Center?

You can learn more about AWS SSO (aka Identity Center) in the [official documentation provided by
AWS](https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html).

### What is a Permission Set?

A Permission Set in AWS SSO is a logical grouping of AWS IAM Policies that define the permissions that an entity has to
access an account. This Permission Set is then provisioned to an AWS Account to grant access through AWS SSO to users
and groups defined in the AWS Identity Store.

Refer to the [official
documentation](https://docs.aws.amazon.com/singlesignon/latest/userguide/permissionsetsconcept.html) for more
information on Permission Sets.

### How do I provision a Permission Set to an Account?

You can use this module to provision a Permission Set to an Account or multiple AWS Accounts. To provision the
Permission Set, it must be assigned to an AWS Account and a Group. This combination grants access to the AWS Account to
the Group with the given Permission Set.

You can specify the Account and Group pair in the `accounts` sub property of the Permission Set configuration passed to
the `permission_sets` input variable to provision the Permission Set to the given AWS Account.

For example:

```hcl
module "sso_permission_sets" {
  # ... other args omitted for brevity ...

  permission_sets = {
    TFFullAccess = {
      # ... other args omitted for brevity ...

      managed_policy_names     = ["AdministratorAccess"]
      accounts = [
        {
          id         = "000000000000" # AWS Account ID
          group_name = "FullAccess"   # Name of the group in AWS SSO Identity Store
          group_id   = null
        },
        {
          id         = "1234567891234"                         # AWS Account ID
          group_name = null
          group_id   = "fffaaaaa-0000-1111-2222-1111ccccbbbb"  # ID of the group in AWS SSO Identity Store
        },
      ]
    }
  }
```

In the example above, the `TFFullAccess` Permission Set is assigned the `AdministratorAccess` managed IAM policy, and
provisioned to the AWS Account with ID `000000000000` for the SSO Identity Store group with the name `FullAccess`. It is
also provisioned to the AWS Account with ID `1234567891234` for the SSO Identity Store group with the ID
`fffaaaaa-0000-1111-2222-1111ccccbbbb`.

Once provisioned, users in the AWS Identity Store that are assigned to the specified group will automatically be granted
access to the AWS Account with the IAM permissions defined on the Permission Set.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S SSO-PERMISSION-SETS MODULE
# ------------------------------------------------------------------------------------------------------

module "sso_permission_sets" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/aws-sso/sso-permission-sets?ref=v0.5.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  description = <string>

  name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The inline policy, as a string, to use for the permission set.
  inline_policy = null

  # A list of managed policy names to add to the Permission set.
  managed_policy_names = []

  # The length, in hours, that a session is valid.
  session_duration_hours = 1

  # ARN of the SSO Admin instance where the Permission Set should be
  # provisioned. This instance will be dynamically looked up when set to null.
  sso_admin_instance_arn = null

  # Tags to apply to the SSO Permission Set, defaults to empty map.
  tags = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S SSO-PERMISSION-SETS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/aws-sso/sso-permission-sets?ref=v0.5.1"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  description = <string>

  name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The inline policy, as a string, to use for the permission set.
  inline_policy = null

  # A list of managed policy names to add to the Permission set.
  managed_policy_names = []

  # The length, in hours, that a session is valid.
  session_duration_hours = 1

  # ARN of the SSO Admin instance where the Permission Set should be
  # provisioned. This instance will be dynamically looked up when set to null.
  sso_admin_instance_arn = null

  # Tags to apply to the SSO Permission Set, defaults to empty map.
  tags = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="description" requirement="required" type="string">
</HclListItem>

<HclListItem name="name" requirement="required" type="string">
</HclListItem>

### Optional

<HclListItem name="inline_policy" requirement="optional" type="string">
<HclListItemDescription>

The inline policy, as a string, to use for the permission set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="managed_policy_names" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of managed policy names to add to the Permission set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="session_duration_hours" requirement="optional" type="number">
<HclListItemDescription>

The length, in hours, that a session is valid.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="sso_admin_instance_arn" requirement="optional" type="string">
<HclListItemDescription>

ARN of the SSO Admin instance where the Permission Set should be provisioned. This instance will be dynamically looked up when set to null.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags to apply to the SSO Permission Set, defaults to empty map.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="arn">
<HclListItemDescription>

A map from permission set names to the respective arns that were provisioned.

</HclListItemDescription>
</HclListItem>

<HclListItem name="name">
<HclListItemDescription>

The name of the permission set that was created.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.5.1/modules/sso-permission-sets/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.5.1/modules/sso-permission-sets/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.5.1/modules/sso-permission-sets/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "2ac6a036b8531e687e4f1076ad6b97e9"
}
##DOCS-SOURCER-END -->
