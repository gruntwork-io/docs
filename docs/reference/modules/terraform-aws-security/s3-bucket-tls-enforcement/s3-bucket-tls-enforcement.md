---
title: "S3 Bucket TLS Enforcement"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="1.3.0" />

# S3 Bucket TLS Enforcement

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules/s3-bucket-tls-enforcement" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases?q=s3-bucket-tls-enforcement" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module applies a bucket policy to one or more [Amazon S3](https://aws.amazon.com/s3/) buckets that denies any requests made over plain HTTP, enforcing TLS-only access. This satisfies [CIS AWS Foundations Benchmark v3.0.0 S3.5](https://docs.aws.amazon.com/securityhub/latest/userguide/s3-controls.html#s3-5), which requires that S3 buckets require requests to use SSL.

## Features

*   Attach a deny policy (`AllowTLSRequestsOnly`) to S3 buckets that blocks non-TLS requests

*   Apply to multiple buckets at once by passing a list of bucket names

*   Automatically merge the TLS deny statement into existing bucket policies when specified

*   Supports conditional resource creation via the `create_resources` variable

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://docs.gruntwork.io/library/overview/)!

### Core concepts

*   [Security Best Practices for Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html)

*   [CIS AWS Foundations Benchmark v3.0.0 - S3.5](https://docs.aws.amazon.com/securityhub/latest/userguide/s3-controls.html#s3-5)

*   [How to enforce TLS on S3 buckets](https://repost.aws/knowledge-center/s3-bucket-policy-for-config-rule)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.

*   [examples](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/examples): This folder contains working examples of how to use the submodules.

*   [test](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this module out, check out the following resources:

*   [examples/s3-bucket-tls-enforcement](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/examples/s3-bucket-tls-enforcement): A sample configuration optimized for learning, experimenting, and testing (but not production usage).

### Production deployment

If you want to deploy this module in production, check out the following resources:

*   [How to configure a production-grade AWS account structure](https://docs.gruntwork.io/guides/build-it-yourself/landing-zone)

### Usage

To enforce TLS on buckets that do not yet have a bucket policy:

```hcl
module "s3_bucket_tls_enforcement" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/s3-bucket-tls-enforcement?ref=v1.0.0"

  bucket_names = ["my-bucket-1", "my-bucket-2"]
}
```

To merge the TLS deny statement into buckets that already have a policy:

```hcl
module "s3_bucket_tls_enforcement" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/s3-bucket-tls-enforcement?ref=v1.0.0"

  bucket_names                 = ["my-bucket-1", "my-bucket-2"]
  buckets_with_existing_policy = ["my-bucket-1"]
}
```

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S S3-BUCKET-TLS-ENFORCEMENT MODULE
# ------------------------------------------------------------------------------------------------------

module "s_3_bucket_tls_enforcement" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/s3-bucket-tls-enforcement?ref=v1.3.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of S3 bucket names to apply the TLS-only bucket policy to.
  bucket_names = <list(string)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of bucket names (a subset of bucket_names) that already have a bucket
  # policy. The TLS deny statement will be merged into their existing policy
  # rather than replacing it. Buckets not in this list are assumed to have no
  # existing policy.
  buckets_with_existing_policy = []

  # Set to false to have this module skip creating resources. This weird
  # parameter exists solely because Terraform does not support conditional
  # modules. Therefore, this is a hack to allow you to conditionally decide if
  # the resources in this module should be created or not.
  create_resources = true

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S S3-BUCKET-TLS-ENFORCEMENT MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/s3-bucket-tls-enforcement?ref=v1.3.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of S3 bucket names to apply the TLS-only bucket policy to.
  bucket_names = <list(string)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of bucket names (a subset of bucket_names) that already have a bucket
  # policy. The TLS deny statement will be merged into their existing policy
  # rather than replacing it. Buckets not in this list are assumed to have no
  # existing policy.
  buckets_with_existing_policy = []

  # Set to false to have this module skip creating resources. This weird
  # parameter exists solely because Terraform does not support conditional
  # modules. Therefore, this is a hack to allow you to conditionally decide if
  # the resources in this module should be created or not.
  create_resources = true

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="bucket_names" requirement="required" type="list(string)">
<HclListItemDescription>

List of S3 bucket names to apply the TLS-only bucket policy to.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="buckets_with_existing_policy" requirement="optional" type="list(string)">
<HclListItemDescription>

List of bucket names (a subset of bucket_names) that already have a bucket policy. The TLS deny statement will be merged into their existing policy rather than replacing it. Buckets not in this list are assumed to have no existing policy.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to have this module skip creating resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if the resources in this module should be created or not.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="bucket_policy_ids">
<HclListItemDescription>

Map of bucket name to the bucket policy resource ID.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules/s3-bucket-tls-enforcement/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules/s3-bucket-tls-enforcement/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules/s3-bucket-tls-enforcement/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "7a6bb8664e356836d1abd924c9d9c47e"
}
##DOCS-SOURCER-END -->
