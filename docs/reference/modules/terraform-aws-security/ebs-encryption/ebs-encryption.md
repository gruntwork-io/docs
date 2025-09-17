---
title: "Elastic Block Storage Encryption"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="1.0.5" lastModifiedVersion="0.75.7"/>

# Elastic Block Storage Encryption

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.5/modules/ebs-encryption" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.7" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module configures EC2 Elastic Block Storage encryption defaults, allowing encryption to be enabled for all new EBS
volumes and selection of a KMS Customer Managed Key to use by default.

This module is not meant to be used directly. Instead, it's used under the hood in the [account-baseline-\*](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.5/modules)
modules. Please see those modules for more information.

## Background Information

*   [EBS encryption](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html) including how default keys
    and the encryption-by-default settings work.
*   [AWS blog: Opt-in to Default Encryption for New EBS Volumes](https://aws.amazon.com/blogs/aws/new-opt-in-to-default-encryption-for-new-ebs-volumes/)

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EBS-ENCRYPTION MODULE
# ------------------------------------------------------------------------------------------------------

module "ebs_encryption" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/ebs-encryption?ref=v1.0.5"

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Set to false to have this module skip creating resources. This weird
  # parameter exists solely because Terraform does not support conditional
  # modules. Therefore, this is a hack to allow you to conditionally decide if
  # the resources in this module should be created or not.
  create_resources = false

  # If set to true, all new EBS volumes will have encryption enabled by default
  enable_encryption = true

  # Optional KMS key ARN used for EBS volume encryption when
  # var.use_existing_kms_key is true.
  kms_key_arn = null

  # Whether or not to use the existing key specified in var.kms_key_arn. We need
  # this weird parameter because `count` must be a known value at plan time, so
  # we cannot calculate whether or not to use the key dynamically.
  use_existing_kms_key = false

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EBS-ENCRYPTION MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/ebs-encryption?ref=v1.0.5"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Set to false to have this module skip creating resources. This weird
  # parameter exists solely because Terraform does not support conditional
  # modules. Therefore, this is a hack to allow you to conditionally decide if
  # the resources in this module should be created or not.
  create_resources = false

  # If set to true, all new EBS volumes will have encryption enabled by default
  enable_encryption = true

  # Optional KMS key ARN used for EBS volume encryption when
  # var.use_existing_kms_key is true.
  kms_key_arn = null

  # Whether or not to use the existing key specified in var.kms_key_arn. We need
  # this weird parameter because `count` must be a known value at plan time, so
  # we cannot calculate whether or not to use the key dynamically.
  use_existing_kms_key = false

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Optional

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to have this module skip creating resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if the resources in this module should be created or not.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_encryption" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, all new EBS volumes will have encryption enabled by default

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

Optional KMS key ARN used for EBS volume encryption when <a href="#use_existing_kms_key"><code>use_existing_kms_key</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="use_existing_kms_key" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to use the existing key specified in <a href="#kms_key_arn"><code>kms_key_arn</code></a>. We need this weird parameter because `count` must be a known value at plan time, so we cannot calculate whether or not to use the key dynamically.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="aws_ebs_encryption_by_default_enabled">
<HclListItemDescription>

Whether or not EBS volume encryption is enabled by default.

</HclListItemDescription>
</HclListItem>

<HclListItem name="aws_ebs_encryption_default_kms_key">
<HclListItemDescription>

The default KMS key used for EBS encryption.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.5/modules/ebs-encryption/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.5/modules/ebs-encryption/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.5/modules/ebs-encryption/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "c83fb5efdba91bf9521bc13484fd6149"
}
##DOCS-SOURCER-END -->
