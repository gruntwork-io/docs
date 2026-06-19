---
title: "Control Tower Organization Structure"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Control Tower" version="2.1.0" />

# Control Tower Organization Structure

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v2.1.0/modules/landingzone/control-tower-organization-structure" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases?q=control-tower-organization-structure" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This is a Terraform module for managing an AWS Organizations [organizational unit
(OU)](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_ous.html) tree as code and
**registering each OU with AWS Control Tower** so that accounts can be enrolled into it via Account Factory.

## Why this module exists

OUs created directly through the AWS Organizations API are *not* governed by Control Tower until a Control Tower
baseline is enabled on them. Until then they show up as **"Not registered"** in the Control Tower console, and
[Account Factory](https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v2.1.0/modules/control-tower-multi-account-factory) refuses to provision accounts into them.

The `control-tower-landing-zone` module creates a few OUs as plain `aws_organizations_organizational_unit` resources,
but the Control Tower landing zone manifest does not register them. This module owns the workload OU tree end to end:
it creates the (optionally nested) OUs and enables the `AWSControlTowerBaseline` on each, which is the Terraform
equivalent of the **"Register OU"** action in the console.

## What it does (MVP)

*   Creates an N-level OU tree (up to AWS's limit of 5 levels under the org root) from a single flat, path-based input.
*   Registers each OU with Control Tower via `aws_controltower_baseline` (you supply the required baseline ARNs).
*   Outputs a `path -> { id, arn, name, path }` map for downstream modules (e.g. Account Factory discovers the OU by
    name, and [`control-tower-controls`](https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v2.1.0/modules/control-tower-controls) attaches guardrails by OU id).

It does **not** move accounts between OUs. Accounts provisioned through Account Factory are placed by specifying
`organizational_unit_name` in the account request; this module's job is to make sure that OU exists and is registered
so the placement succeeds.

## Requirements

*   AWS Terraform provider **&gt;= 6.14.0** (the `aws_controltower_baseline` resource was introduced in 6.14.0).
*   The two baseline ARNs (`control_tower_baseline_identifier` and `identity_center_enabled_baseline_arn`) supplied as
    inputs. The module does not auto-discover them: there is no Terraform data source for them, and shelling out to the
    AWS CLI would not reuse the provider's credentials (it spawns a subprocess with its own credential resolution, which
    in a Control Tower setup fails to assume the `AWSControlTowerAdmin` role). Look them up once with
    `aws controltower list-baselines` and `aws controltower list-enabled-baselines`.
*   Must run in the management account, against an org where the Control Tower landing zone (with IAM Identity Center
    access management) is already deployed.

## Usage

```hcl
module "organization_structure" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-organization-structure?ref=<VERSION>"

  # Nesting is expressed in the path. Every nested OU must have its parent declared too.
  organizational_units = [
    { path = "Pre-prod" },
    { path = "Prod" },
    { path = "Workloads" },
    { path = "Workloads/Team-A" },
    { path = "Workloads/Team-A/Sandbox", register = false },
  ]

  # The two baseline ARNs needed to register an OU. Look them up once in the management account with
  # `aws controltower list-baselines` and `aws controltower list-enabled-baselines`.
  control_tower_baseline_identifier    = "arn:aws:controltower:us-east-1::baseline/17BSJV3IGJ2QSGA2"
  identity_center_enabled_baseline_arn = "arn:aws:controltower:us-east-1:111122223333:enabledbaseline/AB12CD34EF56GH78"
}
```

## How nesting works

Terraform cannot express recursive object types, so the tree is supplied as a flat list of full paths (`"A/B/C"`).
The module derives each OU's parent and depth from its path and creates OUs one level at a time, resolving each
child's `parent_id` from the OU created at the level above. AWS caps OU nesting at 5 levels under the root, so the
module handles up to five levels.

## Inputs

| Name | Description | Required |
|------|-------------|:--------:|
| `organizational_units` | Flat list of OU paths to create/register (`path`, optional `register`, optional `tags`). | yes |
| `control_tower_baseline_identifier` | The `AWSControlTowerBaseline` ARN to enable on each registered OU. | yes |
| `identity_center_enabled_baseline_arn` | The enabled IAM Identity Center baseline ARN. | yes |
| `control_tower_baseline_version` | Baseline version to enable (default `"4.0"`). | no |
| `root_ou_id` | Org root OU id; auto-discovered when empty. | no |

## Outputs

| Name | Description |
|------|-------------|
| `organizational_units` | `path -> { id, arn, name, path }` for every managed OU. |
| `ou_path_to_id` | `path -> id`. |
| `ou_name_to_id` | `name -> id` (names may not be unique across a nested tree). |
| `registered_ou_arns` | `path -> enabled-baseline ARN` for registered OUs. |

## Operational notes

*   Control Tower registration runs one OU at a time and can take several minutes each; keep `-parallelism` low when
    applying (as the Account Factory units do) to avoid `ResourceInUseException`.
*   Register a parent OU before its children.
*   This module owns all organizational structure. The `control-tower-landing-zone` module creates only the foundational
    Security OU (which holds the Log Archive and Audit accounts); every other OU belongs here. If you previously had OUs
    created by `control-tower-landing-zone`, hand them to this module and `terraform import` the existing OU ids so they
    are adopted rather than recreated.

## Roadmap

This is a deliberately minimal first version. Planned expansions: per-OU controls
(via `control-tower-controls`), Service Control Policies / tag policies attached per OU, and account placement for
non-Account-Factory accounts.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CONTROL-TOWER-ORGANIZATION-STRUCTURE MODULE
# ------------------------------------------------------------------------------------------------------

module "control_tower_organization_structure" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-organization-structure?ref=v2.1.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ARN of the "AWSControlTowerBaseline" to enable on each registered OU. This module does not auto-discover it:
  # there is no Terraform data source for it, and shelling out to the AWS CLI does not reuse the provider's
  # credentials. Look it up once with `aws controltower list-baselines` and pass it in, e.g.
  # "arn:aws:controltower:us-east-1::baseline/17BSJV3IGJ2QSGA2".
  #
  control_tower_baseline_identifier = <string>

  # The ARN of the *enabled* IAM Identity Center baseline (a required parameter when registering an OU). The Identity
  # Center baseline is enabled by Control Tower itself rather than as a Terraform-managed resource, so this module does
  # not auto-discover it. Look it up once with `aws controltower list-enabled-baselines` and pass it in, e.g.
  # "arn:aws:controltower:us-east-1:111122223333:enabledbaseline/AB12CD34EF56GH78".
  #
  identity_center_enabled_baseline_arn = <string>

  # The organizational units (OUs) to create and (optionally) register with AWS Control Tower, expressed as full
  # paths under the organization root. Nesting is expressed in the path using "/" as the separator, e.g. "Workloads",
  # "Workloads/Prod", "Workloads/Prod/Team-A". Every nested OU MUST also have its parent declared in this list.
  #
  # AWS supports OUs nested at most 5 levels under the root, so the deepest path may contain at most 5 segments.
  #
  # Fields:
  #   - path:     Full path of the OU under the org root (no leading/trailing slash).
  #   - register: Whether to register (govern/enroll) the OU in Control Tower so Account Factory can deploy into it.
  #               Defaults to true. Set to false to manage the OU in Organizations only.
  #   - tags:     Tags to apply to the OU.
  #
  organizational_units = <list(object(
    path     = string
    register = optional(bool, true)
    tags     = optional(map(string), )
  ))>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The version of the AWS Control Tower baseline to enable on each registered
  # OU (e.g. "5.0").
  control_tower_baseline_version = "5.0"

  # The ID of the organization root OU under which top-level OUs are created. If
  # empty, it is auto-discovered from the organization.
  root_ou_id = ""

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CONTROL-TOWER-ORGANIZATION-STRUCTURE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-organization-structure?ref=v2.1.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ARN of the "AWSControlTowerBaseline" to enable on each registered OU. This module does not auto-discover it:
  # there is no Terraform data source for it, and shelling out to the AWS CLI does not reuse the provider's
  # credentials. Look it up once with `aws controltower list-baselines` and pass it in, e.g.
  # "arn:aws:controltower:us-east-1::baseline/17BSJV3IGJ2QSGA2".
  #
  control_tower_baseline_identifier = <string>

  # The ARN of the *enabled* IAM Identity Center baseline (a required parameter when registering an OU). The Identity
  # Center baseline is enabled by Control Tower itself rather than as a Terraform-managed resource, so this module does
  # not auto-discover it. Look it up once with `aws controltower list-enabled-baselines` and pass it in, e.g.
  # "arn:aws:controltower:us-east-1:111122223333:enabledbaseline/AB12CD34EF56GH78".
  #
  identity_center_enabled_baseline_arn = <string>

  # The organizational units (OUs) to create and (optionally) register with AWS Control Tower, expressed as full
  # paths under the organization root. Nesting is expressed in the path using "/" as the separator, e.g. "Workloads",
  # "Workloads/Prod", "Workloads/Prod/Team-A". Every nested OU MUST also have its parent declared in this list.
  #
  # AWS supports OUs nested at most 5 levels under the root, so the deepest path may contain at most 5 segments.
  #
  # Fields:
  #   - path:     Full path of the OU under the org root (no leading/trailing slash).
  #   - register: Whether to register (govern/enroll) the OU in Control Tower so Account Factory can deploy into it.
  #               Defaults to true. Set to false to manage the OU in Organizations only.
  #   - tags:     Tags to apply to the OU.
  #
  organizational_units = <list(object(
    path     = string
    register = optional(bool, true)
    tags     = optional(map(string), )
  ))>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The version of the AWS Control Tower baseline to enable on each registered
  # OU (e.g. "5.0").
  control_tower_baseline_version = "5.0"

  # The ID of the organization root OU under which top-level OUs are created. If
  # empty, it is auto-discovered from the organization.
  root_ou_id = ""

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="control_tower_baseline_identifier" requirement="required" type="string">
<HclListItemDescription>

The ARN of the 'AWSControlTowerBaseline' to enable on each registered OU. This module does not auto-discover it:
there is no Terraform data source for it, and shelling out to the AWS CLI does not reuse the provider's
credentials. Look it up once with `aws controltower list-baselines` and pass it in, e.g.
'arn:aws:controltower:us-east-1::baseline/17BSJV3IGJ2QSGA2'.


</HclListItemDescription>
</HclListItem>

<HclListItem name="identity_center_enabled_baseline_arn" requirement="required" type="string">
<HclListItemDescription>

The ARN of the *enabled* IAM Identity Center baseline (a required parameter when registering an OU). The Identity
Center baseline is enabled by Control Tower itself rather than as a Terraform-managed resource, so this module does
not auto-discover it. Look it up once with `aws controltower list-enabled-baselines` and pass it in, e.g.
'arn:aws:controltower:us-east-1:111122223333:enabledbaseline/AB12CD34EF56GH78'.


</HclListItemDescription>
</HclListItem>

<HclListItem name="organizational_units" requirement="required" type="list(object(…))">
<HclListItemDescription>

The organizational units (OUs) to create and (optionally) register with AWS Control Tower, expressed as full
paths under the organization root. Nesting is expressed in the path using '/' as the separator, e.g. 'Workloads',
'Workloads/Prod', 'Workloads/Prod/Team-A'. Every nested OU MUST also have its parent declared in this list.

AWS supports OUs nested at most 5 levels under the root, so the deepest path may contain at most 5 segments.

Fields:
  - path:     Full path of the OU under the org root (no leading/trailing slash).
  - register: Whether to register (govern/enroll) the OU in Control Tower so Account Factory can deploy into it.
              Defaults to true. Set to false to manage the OU in Organizations only.
  - tags:     Tags to apply to the OU.


</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    path     = string
    register = optional(bool, true)
    tags     = optional(map(string), {})
  }))
```

</HclListItemTypeDetails>
</HclListItem>

### Optional

<HclListItem name="control_tower_baseline_version" requirement="optional" type="string">
<HclListItemDescription>

The version of the AWS Control Tower baseline to enable on each registered OU (e.g. '5.0').

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;5.0&quot;"/>
</HclListItem>

<HclListItem name="root_ou_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the organization root OU under which top-level OUs are created. If empty, it is auto-discovered from the organization.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="organizational_units">
<HclListItemDescription>

Map of OU path to its details (&#123; id, arn, name, path &#125;) for every OU managed by this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ou_name_to_id">
<HclListItemDescription>

Map of OU name to OU id. NOTE: OU names are not guaranteed unique across a nested tree; prefer ou_path_to_id when names may collide.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ou_path_to_id">
<HclListItemDescription>

Map of OU path to OU id.

</HclListItemDescription>
</HclListItem>

<HclListItem name="registered_ou_arns">
<HclListItemDescription>

Map of OU path to the ARN of its enabled Control Tower baseline, for OUs registered by this module.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v2.1.0/modules/control-tower-organization-structure/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v2.1.0/modules/control-tower-organization-structure/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v2.1.0/modules/control-tower-organization-structure/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "9c7c51b183f8d54db4cfeff60152090f"
}
##DOCS-SOURCER-END -->
