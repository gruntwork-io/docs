---
title: "SSM Healthchecks IAM Permissions"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="1.0.1" lastModifiedVersion="0.72.1"/>

# SSM Healthchecks IAM Permissions

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.1/modules/ssm-healthchecks-iam-permissions" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.72.1" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This modules adds the necessary IAM policies to an IAM role so that the [AWS Systems Manager](https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html) [agent](https://docs.aws.amazon.com/systems-manager/latest/userguide/ssm-agent.html) gets necessary permissions in order to do automated health checks.

## Motivation

From: https://docs.aws.amazon.com/systems-manager/latest/userguide/ssm-agent.html

> SSM Agent is installed, by default, on the following Amazon EC2 Amazon Machine Images (AMIs):
>
> *   Windows Server (all SKUs)
> *   Amazon Linux 2
> *   Ubuntu Server 18.04
> *   Ubuntu Server 20.04

We recommend using this module with just about every single EC2 Instance and Auto Scaling Group you launch, or you'll end up with confusing SSM errors in your logs (`syslog`).

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S SSM-HEALTHCHECKS-IAM-PERMISSIONS MODULE
# ------------------------------------------------------------------------------------------------------

module "ssm_healthchecks_iam_permissions" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/ssm-healthchecks-iam-permissions?ref=v1.0.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The Id of the IAM role to which we should add SSM healthcheck permissions
  iam_role_id = <string>

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S SSM-HEALTHCHECKS-IAM-PERMISSIONS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/ssm-healthchecks-iam-permissions?ref=v1.0.1"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The Id of the IAM role to which we should add SSM healthcheck permissions
  iam_role_id = <string>

}


```

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.1/modules/ssm-healthchecks-iam-permissions/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.1/modules/ssm-healthchecks-iam-permissions/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.1/modules/ssm-healthchecks-iam-permissions/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "0d1b1d3d193600909f981d8beed9ebbe"
}
##DOCS-SOURCER-END -->
