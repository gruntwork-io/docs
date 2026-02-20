---
title: "S3 Account Public Access Block"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="1.3.0" />

# S3 Account Public Access Block

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules/s3-account-public-access-block" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases?q=s3-account-public-access-block" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module configures [Amazon S3 Account-Level Public Access Block](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html#access-control-block-public-access-options) settings. When enabled, these settings block public access to all S3 buckets in the account, providing a safety net against accidental public exposure of data.

## Features

*   Block public ACLs for all S3 buckets in the account

*   Block public bucket policies for all S3 buckets in the account

*   Ignore public ACLs on all S3 buckets in the account

*   Restrict public bucket policies on all S3 buckets in the account

*   All four settings default to `true` for maximum security

*   Supports conditional resource creation via the `create_resources` variable

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://docs.gruntwork.io/library/overview/)!

### Core concepts

*   [Blocking Public Access to Amazon S3 Storage](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html)

*   [CIS AWS Foundations Benchmark - S3 Controls](https://docs.aws.amazon.com/securityhub/latest/userguide/s3-controls.html)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.

*   [examples](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/examples): This folder contains working examples of how to use the submodules.

*   [test](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this module out, check out the following resources:

*   [examples/s3-account-public-access-block](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/examples/s3-account-public-access-block): A sample configuration optimized for learning, experimenting, and testing (but not production usage).

### Production deployment

If you want to deploy this module in production, check out the following resources:

*   [How to configure a production-grade AWS account structure](https://docs.gruntwork.io/guides/build-it-yourself/landing-zone)

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S S3-ACCOUNT-PUBLIC-ACCESS-BLOCK MODULE
# ------------------------------------------------------------------------------------------------------

module "s_3_account_public_access_block" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/s3-account-public-access-block?ref=v1.3.0"

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Whether Amazon S3 should block public ACLs for buckets in this account.
  block_public_acls = true

  # Whether Amazon S3 should block public bucket policies for buckets in this
  # account.
  block_public_policy = true

  # Set to false to have this module skip creating resources. This weird
  # parameter exists solely because Terraform does not support conditional
  # modules. Therefore, this is a hack to allow you to conditionally decide if
  # the resources in this module should be created or not.
  create_resources = true

  # Whether Amazon S3 should ignore public ACLs for buckets in this account.
  ignore_public_acls = true

  # Whether Amazon S3 should restrict public bucket policies for buckets in this
  # account.
  restrict_public_buckets = true

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S S3-ACCOUNT-PUBLIC-ACCESS-BLOCK MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/s3-account-public-access-block?ref=v1.3.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Whether Amazon S3 should block public ACLs for buckets in this account.
  block_public_acls = true

  # Whether Amazon S3 should block public bucket policies for buckets in this
  # account.
  block_public_policy = true

  # Set to false to have this module skip creating resources. This weird
  # parameter exists solely because Terraform does not support conditional
  # modules. Therefore, this is a hack to allow you to conditionally decide if
  # the resources in this module should be created or not.
  create_resources = true

  # Whether Amazon S3 should ignore public ACLs for buckets in this account.
  ignore_public_acls = true

  # Whether Amazon S3 should restrict public bucket policies for buckets in this
  # account.
  restrict_public_buckets = true

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Optional

<HclListItem name="block_public_acls" requirement="optional" type="bool">
<HclListItemDescription>

Whether Amazon S3 should block public ACLs for buckets in this account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="block_public_policy" requirement="optional" type="bool">
<HclListItemDescription>

Whether Amazon S3 should block public bucket policies for buckets in this account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to have this module skip creating resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if the resources in this module should be created or not.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="ignore_public_acls" requirement="optional" type="bool">
<HclListItemDescription>

Whether Amazon S3 should ignore public ACLs for buckets in this account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="restrict_public_buckets" requirement="optional" type="bool">
<HclListItemDescription>

Whether Amazon S3 should restrict public bucket policies for buckets in this account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="block_public_acls">
<HclListItemDescription>

Whether public ACLs are blocked.

</HclListItemDescription>
</HclListItem>

<HclListItem name="block_public_policy">
<HclListItemDescription>

Whether public bucket policies are blocked.

</HclListItemDescription>
</HclListItem>

<HclListItem name="id">
<HclListItemDescription>

The AWS account ID of the S3 account public access block.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules/s3-account-public-access-block/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules/s3-account-public-access-block/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules/s3-account-public-access-block/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "9d4c8846bd5abe901ce6c120181f78e9"
}
##DOCS-SOURCER-END -->
