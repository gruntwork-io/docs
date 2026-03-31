---
title: "S3 TLS Enforcement SCP"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="1.4.1" lastModifiedVersion="1.4.0"/>

# S3 TLS Enforcement SCP

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v1.4.1/modules/s3-tls-enforcement-scp" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.4.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module creates an [AWS Organizations Service Control Policy (SCP)](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html) that denies all S3 operations not using TLS and attaches it to the organization root. This provides defense-in-depth for CIS compliance across all member accounts by ensuring that no account in the organization can make unencrypted S3 requests.

## Features

*   Creates an SCP that denies all `s3:*` actions when `aws:SecureTransport` is `false`

*   Attaches the policy to the AWS Organizations root, enforcing it across all member accounts

*   Supports conditional resource creation via the `create_resources` variable

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://docs.gruntwork.io/library/overview/)!

### Core concepts

*   [Service Control Policies (SCPs)](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html)

*   [Amazon S3 Security Best Practices](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.4.1/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.

*   [examples](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.4.1/examples): This folder contains working examples of how to use the submodules.

*   [test](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.4.1/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this module out, check out the following resources:

*   [examples/s3-tls-enforcement-scp](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.4.1/examples/s3-tls-enforcement-scp): A sample configuration optimized for learning, experimenting, and testing (but not production usage).

### Production deployment

If you want to deploy this module in production, check out the following resources:

*   [How to configure a production-grade AWS account structure](https://docs.gruntwork.io/guides/build-it-yourself/landing-zone)

Note

This module must be deployed from the **management account** (root account) of your AWS Organization, as SCPs can only be created and attached there.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S S3-TLS-ENFORCEMENT-SCP MODULE
# ------------------------------------------------------------------------------------------------------

module "s_3_tls_enforcement_scp" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/s3-tls-enforcement-scp?ref=v1.4.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A name prefix to use for the SCP policy name.
  name_prefix = <string>

  # The ID of the AWS Organizations root, organizational unit, or account to
  # attach the SCP to.
  target_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Set to false to skip creating resources. This is a workaround for
  # Terraform's lack of support for conditional modules.
  create_resources = true

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S S3-TLS-ENFORCEMENT-SCP MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/s3-tls-enforcement-scp?ref=v1.4.1"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A name prefix to use for the SCP policy name.
  name_prefix = <string>

  # The ID of the AWS Organizations root, organizational unit, or account to
  # attach the SCP to.
  target_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Set to false to skip creating resources. This is a workaround for
  # Terraform's lack of support for conditional modules.
  create_resources = true

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="name_prefix" requirement="required" type="string">
<HclListItemDescription>

A name prefix to use for the SCP policy name.

</HclListItemDescription>
</HclListItem>

<HclListItem name="target_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the AWS Organizations root, organizational unit, or account to attach the SCP to.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to skip creating resources. This is a workaround for Terraform's lack of support for conditional modules.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="policy_id">
<HclListItemDescription>

The ID of the S3 TLS enforcement SCP.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.4.1/modules/s3-tls-enforcement-scp/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.4.1/modules/s3-tls-enforcement-scp/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.4.1/modules/s3-tls-enforcement-scp/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "2e39739be1d77fed07c129618c4894f9"
}
##DOCS-SOURCER-END -->
