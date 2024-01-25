---
title: "AWS GuardDuty Delegated Administrator Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.70.2" />

# AWS GuardDuty Delegated Administrator Module

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v0.70.2/modules/guardduty-delegated-admin" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases?q=guardduty-delegated-admin" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

(WILL BE AUTOMATICALLY GENERATED)

This module designates a [GuardDuty delegated administrator account](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_organizations.html).

As GuardDuty is a Regional service, the GuardDuty delegated administrators (and their member accounts) must be added through in each desired Region where you have GuardDuty enabled.

## Features

*   Designate AWS GuardDuty delegated administrator across all regions (recommended best practice) on your AWS account

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/)!

### Core concepts

*   Learn more about GuardDuty in the [guardduty core module](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.70.2/modules/guardduty/README.adoc).

*   [How to use a multi-region module](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.70.2/codegen/core-concepts.md#how-to-use-a-multi-region-module)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.70.2/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.

*   [codegen](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.70.2/codegen): Code generation utilities that help generate modules in this repo.

*   [examples](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.70.2/examples): This folder contains working examples of how to use the submodules.

*   [test](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.70.2/test): Automated tests for the modules and examples.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S GUARDDUTY-DELEGATED-ADMIN MODULE
# ------------------------------------------------------------------------------------------------------

module "guardduty_delegated_admin" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/guardduty-delegated-admin?ref=v0.70.2"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the AWS account to designate as the GuardDuty administrator
  # account.
  admin_account_id = <string>

  # Creates resources in the specified regions. This variable must NOT be set to
  # null or empty. Otherwise, we won't know which regions to use and
  # authenticate to, and may use some not enabled in your AWS account (e.g.,
  # GovCloud, China, etc). To get the list of regions enabled in your AWS
  # account, you can use the AWS CLI: aws ec2 describe-regions.
  opt_in_regions = <list(string)>

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S GUARDDUTY-DELEGATED-ADMIN MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/guardduty-delegated-admin?ref=v0.70.2"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the AWS account to designate as the GuardDuty administrator
  # account.
  admin_account_id = <string>

  # Creates resources in the specified regions. This variable must NOT be set to
  # null or empty. Otherwise, we won't know which regions to use and
  # authenticate to, and may use some not enabled in your AWS account (e.g.,
  # GovCloud, China, etc). To get the list of regions enabled in your AWS
  # account, you can use the AWS CLI: aws ec2 describe-regions.
  opt_in_regions = <list(string)>

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="admin_account_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the AWS account to designate as the GuardDuty administrator account.

</HclListItemDescription>
</HclListItem>

<HclListItem name="opt_in_regions" requirement="required" type="list(string)">
<HclListItemDescription>

Creates resources in the specified regions. This variable must NOT be set to null or empty. Otherwise, we won't know which regions to use and authenticate to, and may use some not enabled in your AWS account (e.g., GovCloud, China, etc). To get the list of regions enabled in your AWS account, you can use the AWS CLI: aws ec2 describe-regions.

</HclListItemDescription>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="guardduty_admin_account_id">
<HclListItemDescription>

The ID of the GuardDuty admin account.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.70.2/modules/guardduty-delegated-admin/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.70.2/modules/guardduty-delegated-admin/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.70.2/modules/guardduty-delegated-admin/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "5601324170a3a8d02d720e25f8ebfd3c"
}
##DOCS-SOURCER-END -->
