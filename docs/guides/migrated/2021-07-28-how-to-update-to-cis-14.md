---
title: How to update to CIS AWS Foundations Benchmark v1.4.0
categories: Upgrades
image: /assets/img/guides/refresh_icon.png
excerpt: Learn how to update to version 1.4.0 of the CIS AWS Foundations Benchmark
tags: ["aws", "security", "compliance"]
cloud: ["aws"]
redirect_from: /static/guides/upgrades/how-to-update-to-cis-1.4/
---

# Intro

This guide will walk you through the process of updating version 1.3.0 to version 1.4.0 of our CIS AWS Foundations
Benchmark solution. We assume you are using the landing zone modules provided in our CIS service catalog, however,
if you are starting from scratch, check out our [How to achieve compliance with the CIS AWS Foundations Benchmark](https://gruntwork.io/guides/compliance/how-to-achieve-cis-benchmark-compliance/)
guide instead.

## Previous versions of this guide

- [How to update to CIS AWS Foundations Benchmark v1.3.0](https://gruntwork.io/guides/upgrades/how-to-update-to-cis-13/)

## What you’ll learn in this guide

This guide consists of two main sections:

[Core Concepts](#core_concepts)  
An overview of the CIS AWS Foundations Benchmark v1.4.0 and why it is important to update your code for compatibility.

[Deployment walkthrough](#deployment_walkthrough)  
The steps you need to take to update your code to be compliant with v1.4.0. It includes a
[version compatibility table](#compatibility_table) you can use as a reference to know which Gruntwork Repo version
tag is compatible along with the deployment steps you need to perform to achieve compliance with version 1.4.0 of the
CIS AWS Foundations Benchmark.

# Core Concepts

## Background

Version 1.4.0 of the CIS AWS Foundations Benchmark was released in May of 2021. You can refer to the [CIS website](https://www.cisecurity.org/benchmark/amazon_web_services/) where you can download the latest version of the Benchmark (as well as all the previous versions). The latest version introduces a few new recommendations, and also updates one recommendation.

### Changes in recommendations

Changes in recommendations (both additions and removals) are listed below. You can think of these as a "diff"
between versions 1.3.0 and 1.4.0.

#### New recommendations

These are the new recommendations introduced in version 1.4.0 of the benchmark:

- 2.1.3: Ensure MFA Delete is enabled on S3 buckets

- 2.1.4: Ensure all data in Amazon S3 has been discovered, classified and secured when required

- 2.3.1: Ensure that encryption is enabled for RDS Instances

#### Updated recommendations

Version 1.4.0 also updated a recommendation. It only affects the IAM password policy:

- 1.12: Ensure credentials unused for 45 days or greater are disabled. The previous recommendation required credentials older than 90 days to be disabled.

### New Gruntwork modules vs. existing modules

To achieve compliance with the new version of the benchmark, we’ve updated a bunch of existing modules. We’ve also
created a new module for Amazon Macie, and updated the Landing Zone modules so that Landing Zone accounts now
include relevant configurations for the Amazon Macie service. The latter will satisfy the recommendation 2.1.4.

To ensure compliance with version 1.4.0 of the CIS AWS Foundations Benchmark, you’ll need to follow all the
instructions in the [Deployment walkthrough](#deployment_walkthrough) section below; precisely, follow Steps 1 and 2 to ensure that
the existing modules get updated to their CIS AWS v1.4.0 compliant versions and follow Step 3 to perform the
necessary manual steps.

# Deployment walkthrough

## Step 1: Update references to the Gruntwork Infrastructure as Code Library

To update to the CIS AWS Foundations Benchmark v1.4.0, you need to update your references to the Gruntwork
Infrastructure as Code Library to use compatible versions. We (Gruntwork) have reviewed and updated all the library
modules for compatibility with the new version of the benchmark. As a customer, you need to update to
the proper versions of the Gruntwork library to pick up the fixes/changes made to be compatible. Refer to
[the
"Updating" section of "How to use the Gruntwork Infrastructure as Code Library"](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/#updating) for instructions on how to update the
versions in your code.

Gruntwork follows
[semantic
versioning](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/#versioning). For any pre-1.0 modules, this means that version updates to the minor version are considered backward
incompatible releases for any version updates before the 1.0.0 release. Make sure to read the release notes for the
relevant modules any time you are updating minor versions! Note that you will want to read the release notes for each
minor version that is updated (e.g., if you are going from v0.5.x to v0.9.x, you will want to read the notes for v0.6.0,
v0.7.0, v0.8.0, and v0.9.0 to get the full list of backward incompatible updates).

The following table provides a summary of all the relevant Gruntwork AWS modules and the respective versions that are
compatible with CIS AWS v1.4.0:

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>Gruntwork Repo</p></td>
<td style="text-align: left;"><p><strong>Minimum version with CIS AWS v1.4.0 support</strong></p></td>
<td style="text-align: left;"><p>Corresponding CIS AWS v1.4.0 recommendations</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-security</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.54.0">v0.54.0</a></strong></p></td>
<td style="text-align: left;"><p>1.12, 2.1.3, 2.1.5</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-cis-service-catalog</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.27.0">v0.27.0</a></strong></p></td>
<td style="text-align: left;"><p>2.1.4, 4.1</p></td>
</tr>
</tbody>
</table>

## Step 2: Update the Account Baseline modules

Next, you will need to update the account baseline (landing zone) modules to the version compatible
with v1.4.0 of the CIS AWS Foundations Benchmark. We strongly recommend upgrading straight to at least v0.27.0,
instead of each minor version incrementally. This saves a lot of time due to the performance enhancements in
recent versions of the account baseline modules and you can still complete the required migration steps before
running Terraform/Terragrunt `apply`.

This guide assumes you are using at least v0.22.0 of the CIS Service Catalog repo.

The account baseline modules had three breaking changes between versions v0.22.0 and v0.27.0. We must manually run
these migration steps before updating the module versions.

1.  [v0.23.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.23.0): Refactored the
    SecurityHub module to remove a Python script that managed invitations between the AWS accounts. It’s necessary to run a
    state migration to manage the invitations with Terraform.

2.  [v0.24.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.24.0): This release introduces MFA Delete. You will need to follow the migration guide to ensure all S3 buckets are properly secured. Note: It is unlikely you will need to perform this step on the AWS root account as they typically don’t contain S3 buckets. Please ensure you migrate all other AWS accounts.

3.  [v0.25.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.25.0): Update the codebase
    to a new multi-region approach. In [v0.51.0](https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.51.0) of
    `terraform-aws-security`, we refactored how we build multi-region modules—that
    is, those modules that deploy resources across every single AWS region, such as `aws-config-multi-region`—to no longer
    create nested provider blocks, and instead, have users pass in providers via the providers map.

Additionally, earlier versions of the account baseline modules did not set the following variables, so please ensure
that they exist. Here is [an example](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/blob/v0.27.0/examples/for-production/infrastructure-live/logs/_global/account-baseline/terragrunt.hcl#L281) of what you might set the values to for the prod account.

- `var.config_central_account_id`

- `var.security_hub_associate_to_master_account_id`

- `var.config_opt_in_regions`

- `var.guardduty_opt_in_regions`

- `var.kms_cmk_opt_in_regions`

- `var.iam_access_analyzer_opt_in_regions`

- `var.ebs_opt_in_regions`

- `var.security_hub_opt_in_regions`

- `var.macie_opt_in_regions`

Once you have completed the above migration steps, it is time to update each baseline module to at least version [v0.27.0](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.27.0) and run Terraform/Terragrunt apply. Typically this is done using the `source` parameter:

**infrastructure-live/root/\_global/account-baseline/terragrunt.hcl**

```hcl
git::git@github.com:gruntwork-io/terraform-aws-cis-service-catalog.git//modules/landingzone/account-baseline-root?ref=v0.27.0
```

Now execute Terraform/Terragrunt `apply`. It should take approximately ~30 minutes to apply the account baseline
modules. If you encouter any issues then please check out the [Known Issues](#known_issues) section.

Be sure to do this for each AWS account and account baseline module.

In addition to the above breaking changes, you’ll need to configure the account baseline modules to include the newly
created module for [Amazon Macie](https://aws.amazon.com/macie/). Amazon Macie satisfies the new 2.1.4 benchmark recommendation that requires all data
in Amazon S3 be discovered, classified and secured. We have created a dedicated
[`macie` module](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/tree/master/modules/security/macie)
in our CIS service catalog.

Manual steps required! After updating the account baseline modules as described below, make sure you perform the manual steps
outlined in the [Configure Amazon Macie (recommendation 2.1.4)](#macie_manual_steps) section.

To configure account baseline modules to include Amazon Macie, add the following configuration to the respective account
baseline module configurations:

**infrastructure-live/root/\_global/account-baseline/terragrunt.hcl**

```hcl
inputs {
  # ... previous inputs ...

  # Configures Amazon Macie
  create_macie_bucket      = true
  macie_bucket_name        = "<your-macie-bucket-name>"
  macie_create_kms_key     = true
  macie_kms_key_name       = "<your-macie-kms-key-name>"
  macie_kms_key_users      = ["arn:aws:iam::${local.accounts[local.account_name]}:root"]
  macie_opt_in_regions     = local.opt_in_regions

  # The variable below for Amazon Macie needs to be manually maintained. Please ensure you change the defaults.
  macie_buckets_to_analyze = {
    "us-east-1": ["<FILL_IN_BUCKET_1_NAME>", "<FILL_IN_BUCKET_2_NAME>"],
    "<another-region>": ["<FILL_IN_BUCKET_3_NAME>", "<FILL_IN_BUCKET_4_NAME>"]
  }
}
```

**infrastructure-live/security/\_global/account-baseline/terragrunt.hcl**

```hcl
inputs {
  # ... previous inputs ...

  # Configures Amazon Macie
  create_macie_bucket      = true
  macie_bucket_name        = "<your-macie-bucket-name>"
  macie_create_kms_key     = true
  macie_kms_key_name       = "<your-macie-kms-key-name>"
  macie_kms_key_users      = ["arn:aws:iam::${local.accounts[local.account_name]}:root"]
  macie_opt_in_regions     = local.opt_in_regions
  macie_administrator_account_id = local.accounts.root

  # The variable below for Amazon Macie needs to be manually maintained. Please ensure you change the defaults.
  macie_buckets_to_analyze = {
    "us-east-1": ["<FILL_IN_BUCKET_1_NAME>", "<FILL_IN_BUCKET_2_NAME>"],
    "<another-region>": ["<FILL_IN_BUCKET_3_NAME>", "<FILL_IN_BUCKET_4_NAME>"]
  }
}
```

All the other child accounts (logs, stage, prod, etc) need the same configuration change as the security account above. Ensure you make that change in all the child accounts.

## Step 3: Manual steps

### Enable MFA Delete (recommendation 2.1.3)

Enabling MFA Delete in your bucket adds another layer of security by requiring MFA in any request to delete a version or change the versioning state of the bucket.

The attribute `mfa_delete` is only used by Terraform to [reflect the current state of the bucket](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket#mfa_delete). It is not possible to create a bucket if the `mfa_delete` is `true`, because it needs to be activated [using AWS CLI or the API](https://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiFactorAuthenticationDelete.html).

To make this change [**you need to use the root user of the account**](https://docs.aws.amazon.com/general/latest/gr/root-vs-iam.html#aws_tasks-that-require-root) that owns the bucket, and MFA needs to be enabled.

We do not recommend having active AWS access keys for the root user, so remember to delete them when you finish this step.

In order to enable MFA Delete, you need to:

1.  [Create access keys for the root user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_add-key)

2.  [Configure MFA for the root user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_mfa)

3.  Create a bucket with `mfa_delete=false`.

4.  Using the root user, call the AWS CLI to enable MFA Delete. If you are using `aws-vault`, it is necessary to use the `--no-session` flag.

    ```bash
    aws s3api put-bucket-versioning --region <REGION> \
        --bucket <BUCKET NAME> \
        --versioning-configuration Status=Enabled,MFADelete=Enabled \
        --mfa "arn:aws:iam::<ACCOUNT ID>:mfa/root-account-mfa-device <MFA CODE>"
    ```

5.  Set `mfa_delete=true` in your Terraform code

6.  Remove any Lifecycle Rule that the bucket might contain (for the `aws-config-bucket` and `cloudtrail-bucket` modules, enabling `mfa_delete` will already disable the lifecycle rules).

7.  Run `terraform apply`.

8.  If there are no S3 buckets remaining to enable MFA Delete, delete the access keys for the root user, but be sure to **leave MFA enabled**.

We also created a script to help you enable MFA Delete in all buckets from a single account at once.

#### Using mfa-delete.sh

If you want to enable MFA Delete to _all_ your buckets at once, you can use the script at [terraform-aws-security/private-s3-bucket/mfa-delete-script](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/private-s3-bucket). You need to use the access keys for the root user and the root MFA code.

Usage:

```bash
aws-vault exec <PROFILE> --no-session -- ./mfa-delete.sh --account-id <ACCOUNT ID>
```

Example:

```bash
aws-vault exec root-prod -- ./mfa-delete.sh --account-id 226486542153
```

### Configure Amazon Macie (recommendation 2.1.4)

When configuring Macie for each account and each region, you’ll need to specify a few things:

- the S3 bucket to be a repository for the sensitive data discovery results;

- the KMS key that the data in that bucket will be encrypted with;

- and the S3 bucket(s) that you’ll need Macie to analyze for you.

Below, we’ll cover in a few steps how to configure the above resources for Macie. These steps are manual, because at the time of developing this module and releasing the Gruntwork Service Catalog for CIS Benchmark 1.4.0, some of these configurations are [currently not supported](https://github.com/hashicorp/terraform-provider-aws/issues/19856) in the terraform AWS provider.

#### Configure bucket to store sensitive data discovery results

Once you’ve applied the account baseline configurations that include the Macie module using `terraform` or `terragrunt`, you need to do the following manual steps in each of the account baseline accounts:

1.  Log into the AWS console and for every region where you have enabled Macie, repeat the steps 2 to 9.

2.  Go to the Amazon Macie service.

3.  In the left pane, under Settings, click on "Discovery results".

4.  Click on "Configure now" to configure an S3 bucket for long-term retention of sensitive data discovery results.

5.  Choose "Existing bucket".

6.  Under "Choose a bucket", select your bucket. This can be either one you already have, or the one that the module created under the variable `macie_bucket_name` (if you set the `create_macie_bucket` variable to `true`). You will use the same bucket for every region.

7.  Under "KMS encryption" choose "Select a key from your account". You can also re-use a single key across different accounts - if you wish to do this, select "Enter the ARN of a key in another account" instead.

8.  Under "KMS key alias" (or "KMS key ARN", if you’re re-using a KMS key from a different account) select your KMS key. This can be either one you already have, or the one that the module created under the variable `kms_key_name` (if you set the `create_kms_key` variable to `true`). You will use the same key for every region.

9.  Click "Save".

Note that you can re-use a single KMS key across AWS accounts, but you need a separate bucket for each account.

Once Terraform AWS provider supports the above configurations, we will
[update the Gruntwork Macie module](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/issues/205)
so that it completely automates all the steps of configuring Amazon Macie, and no manual steps will be required any longer.

#### Manually maintain buckets to analyze in the `buckets_to_analyze` variable

To set up Macie to analyze the desired S3 buckets, you’ll need to create a **Macie classification job**. Typically, you’ll want it to analyze all the buckets in the region. However, the terraform AWS provider does not support specifying all the buckets in a region - it requires that an explicit list of buckets be provided (see related bug
[here](https://github.com/hashicorp/terraform-provider-aws/issues/20044)). Therefore, you’ll need to maintain an
explicit list of buckets per region, namely in the variable `buckets_to_analyze`. Please read the
[documentation](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/blob/master/modules/security/macie/variables.tf#L21-L30)
for this variable in order to understand how to structure the list of buckets per region. Once the above issue in the
terraform AWS provider has been resolved, we will
[update the Gruntwork macie module](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/issues/204)
to add support for specifying all buckets in a region.

### Known Issues

You may encounter the following issues when trying to upgrade to v0.27.0 of the AWS CIS Service Catalog.

#### Cloudtrail KMS Key Error

```bash
with module.cloudtrail.module.cloudtrail.data.aws_kms_key.by_loose_id[0],
on .terraform/modules/cloudtrail.cloudtrail/modules/cloudtrail/main.tf line 40, in data "aws_kms_key" "by_loose_id":
```

Please ensure `var.cloudtrail_kms_key_arn_is_alias` is set to `false` in each account baseline.

#### AWS Config Rules

```bash
Error: Error creating AWSConfig rule: Failed to create AWSConfig rule: InvalidParameterValueException: The sourceIdentifier VPC_SG_OPEN_ONLY_TO_AUTHORIZED_PORTS is invalid. Please refer to the documentation for a list of valid sourceIdentifiers that can be used when AWS is the Owner.
```

You may be using a region that doesn’t properly support AWS Config (e.g: `ap-northeast-3` Osaka). Please ensure this region is disabled or remove it from your opt-in regions.

# Finally

And that’s all, fellow Gruntworkers.

This guide is meant to help you get your AWS infrastructure from CIS 1.3.0 to CIS 1.4.0 using our dedicated and up-to-date modules. While we try to automate as much as possible, some of the steps are still manual. We hope that the guide above clearly details what needs to be done, and how.

If you’ve got any feedback or you think something’s missing from the guide, please get in touch via [Github](https://github.com/gruntwork-io/gruntwork-io.github.io), or our dedicated [Contact Us](https://gruntwork.io/contact) page.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"08f2bc37ce113e90df50790415d5e888"}
##DOCS-SOURCER-END -->
