---
title: "EBS Encryption Multi Region Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="1.0.1" lastModifiedVersion="0.75.7"/>

# EBS Encryption Multi Region Module

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.1/modules/ebs-encryption-multi-region" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.7" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module wraps the [ebs-encryption core module](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.1/modules/ebs-encryption/README.md) to configure [AWS EBS encryption](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html) in all enabled regions for the AWS Account.

## Features

*   Enable or disable Elastic Block Storage (EBS) volume encryption by default

*   Designate a default KMS Customer Managed Key (CMK) for EBS volume encryption

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://docs.gruntwork.io/library/overview/)!

### Core concepts

*   [EBS encryption](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html) including how default keys and the encryption-by-default settings work.

*   [AWS blog: Opt-in to Default Encryption for New EBS Volumes](https://aws.amazon.com/blogs/aws/new-opt-in-to-default-encryption-for-new-ebs-volumes/)

*   [How to use a multi-region module](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.1/codegen/core-concepts.md#how-to-use-a-multi-region-module)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.1/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.

*   [codegen](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.1/codegen): Code generation utilities that help generate modules in this repo.

*   [examples](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.1/examples): This folder contains working examples of how to use the submodules.

*   [test](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.1/test): Automated tests for the modules and examples.

## Deploy

*   [How to configure a production-grade AWS account structure](https://docs.gruntwork.io/guides/build-it-yourself/landing-zone)

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EBS-ENCRYPTION-MULTI-REGION MODULE
# ------------------------------------------------------------------------------------------------------

module "ebs_encryption_multi_region" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/ebs-encryption-multi-region?ref=v1.0.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS Account ID the template should be operated on. This avoids
  # misconfiguration errors caused by environment variables.
  aws_account_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # If set to true, all new EBS volumes will have encryption enabled by default
  enable_encryption = true

  # Optional map of region names to KMS keys to use for EBS volume encryption
  # when var.use_existing_kms_keys is enabled.
  kms_key_arns = {}

  # Whether or not to use the existing keys specified in var.kms_key_arns. If
  # false (the default), will use the default aws/ebs key. We need this weird
  # parameter because `count` must be a known value at plan time, so we cannot
  # calculate whether or not to use the key dynamically.
  use_existing_kms_keys = false

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EBS-ENCRYPTION-MULTI-REGION MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/ebs-encryption-multi-region?ref=v1.0.1"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS Account ID the template should be operated on. This avoids
  # misconfiguration errors caused by environment variables.
  aws_account_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # If set to true, all new EBS volumes will have encryption enabled by default
  enable_encryption = true

  # Optional map of region names to KMS keys to use for EBS volume encryption
  # when var.use_existing_kms_keys is enabled.
  kms_key_arns = {}

  # Whether or not to use the existing keys specified in var.kms_key_arns. If
  # false (the default), will use the default aws/ebs key. We need this weird
  # parameter because `count` must be a known value at plan time, so we cannot
  # calculate whether or not to use the key dynamically.
  use_existing_kms_keys = false

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

The AWS Account ID the template should be operated on. This avoids misconfiguration errors caused by environment variables.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="enable_encryption" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, all new EBS volumes will have encryption enabled by default

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="kms_key_arns" requirement="optional" type="map(string)">
<HclListItemDescription>

Optional map of region names to KMS keys to use for EBS volume encryption when <a href="#use_existing_kms_keys"><code>use_existing_kms_keys</code></a> is enabled.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="use_existing_kms_keys" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to use the existing keys specified in <a href="#kms_key_arns"><code>kms_key_arns</code></a>. If false (the default), will use the default aws/ebs key. We need this weird parameter because `count` must be a known value at plan time, so we cannot calculate whether or not to use the key dynamically.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="aws_ebs_encryption_by_default_enabled">
<HclListItemDescription>

A map from region to a boolean indicating whether or not EBS encryption is enabled by default for each region.

</HclListItemDescription>
</HclListItem>

<HclListItem name="aws_ebs_encryption_default_kms_key">
<HclListItemDescription>

A map from region to the ARN of the KMS key used for default EBS encryption for each region.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.1/modules/ebs-encryption-multi-region/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.1/modules/ebs-encryption-multi-region/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.1/modules/ebs-encryption-multi-region/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "534333da50590a3b41439e8ef8e04b9f"
}
##DOCS-SOURCER-END -->
