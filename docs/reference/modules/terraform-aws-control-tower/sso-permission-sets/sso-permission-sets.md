---
title: "SSO Permission Sets"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Control Tower" version="1.4.1" lastModifiedVersion="1.2.0"/>

# SSO Permission Sets

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.4.1/modules/aws-sso/sso-permission-sets" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v1.2.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module contains [Terraform](https://www.terraform.io) code to provision and manage best practices set of Permission Sets for AWS SSO (aka Identity Center).

## Features

*   Define and provision a Permission Set
*   Assign managed and inline IAM Policies to the Permission Set.

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

### How do I create a permission set?

For example:

```hcl
module "sso_permission_set" {
  source = "git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/aws-sso/sso-permission-sets"

  name          = "GWFullAccess"
  description   = "Provides full (administrator) access to accounts"
  inline_policy = <<EOP
{
    "Statement": [
        {
            "Effect": "Allow",
            "NotAction": [
                "organizations:*",
                "account:*"
            ],
            "Resource": "*"
        }
    ],
    "Version": "2012-10-17"
}
EOP
}

```

In the example above, the `GWFullAccess` Permission Set is assigned a custom inline IAM policy.

Once provisioned, users in the AWS Identity Store that are assigned to the specified group will automatically be granted
access to the AWS Account with the IAM permissions defined on the Permission Set.

### How do I provision a Permission Set to an Account?

Permission sets are normally bound to groups using your IDP.

For an example of a manual binding see the [sso-groups module](https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.4.1/modules/aws-sso/sso-groups).

### What are permission boundaries?

Permission boundaries are an advanced feature of AWS IAM that allows you to set the maximum permissions that an entity.
For example you can limit the permissions of a Permission Set to `ReadOnlyAccess`:

```hcl
module "sso_permission_set" {
  source = "git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/aws-sso/sso-permission-sets"

  name          = "GWReadOnlyAccess"
  description   = "Provides read-only access to accounts"
  managed_policy_names = ["ReadOnlyAccess"]

  permissions_boundary_managed_policy_name = ["ReadOnlyAccess"]
}
```

For more information on permission boundaries, see the [official documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html).

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S SSO-PERMISSION-SETS MODULE
# ------------------------------------------------------------------------------------------------------

module "sso_permission_sets" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/aws-sso/sso-permission-sets?ref=v1.4.1"

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

  # The customer managed policy reference to use as the permissions boundary for
  # the Permission Set. Note that this is mutually exclusive with
  # `permissions_boundary_managed_policy_name`.
  permisions_boundary_customer_managed_policy_reference = null

  # The name of the managed policy to use as the permissions boundary for the
  # Permission Set. Note that this is mutually exclusive with
  # `permissions_boundary_customer_managed_policy_reference`.
  permissions_boundary_managed_policy_name = null

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
  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/aws-sso/sso-permission-sets?ref=v1.4.1"
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

  # The customer managed policy reference to use as the permissions boundary for
  # the Permission Set. Note that this is mutually exclusive with
  # `permissions_boundary_managed_policy_name`.
  permisions_boundary_customer_managed_policy_reference = null

  # The name of the managed policy to use as the permissions boundary for the
  # Permission Set. Note that this is mutually exclusive with
  # `permissions_boundary_customer_managed_policy_reference`.
  permissions_boundary_managed_policy_name = null

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

<HclListItem name="permisions_boundary_customer_managed_policy_reference" requirement="optional" type="object(…)">
<HclListItemDescription>

The customer managed policy reference to use as the permissions boundary for the Permission Set. Note that this is mutually exclusive with `permissions_boundary_managed_policy_name`.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    name = string
    path = optional(string, "/")
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="permissions_boundary_managed_policy_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the managed policy to use as the permissions boundary for the Permission Set. Note that this is mutually exclusive with `permissions_boundary_customer_managed_policy_reference`.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.4.1/modules/sso-permission-sets/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.4.1/modules/sso-permission-sets/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.4.1/modules/sso-permission-sets/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "ede66220aacd0b946054195540adc504"
}
##DOCS-SOURCER-END -->
