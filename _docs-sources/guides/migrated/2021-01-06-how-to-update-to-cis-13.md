---
title: How to update to CIS AWS Foundations Benchmark v1.3.0
categories: Upgrades
image: /assets/img/guides/refresh_icon.png
excerpt: Learn how to update to version 1.3.0 of the CIS AWS Foundations Benchmark
tags: ["aws", "security", "compliance"]
cloud: ["aws"]
redirect_from: /static/guides/upgrades/how-to-update-to-cis-13/
---

:page-type: guide
:page-layout: post

# Intro

This guide will walk you through how to update from version 1.2.0 to version 1.3.0 of the CIS AWS Foundations Benchmark.
If your infrastructure is already compliant with the Benchmark’s version 1.2.0, and you are looking to upgrade to v1.3.0,
this guide is for you. If you are starting to work on compliance with this benchmark from scratch, check out our
[How to achieve compliance with the CIS AWS Foundations Benchmark](https://gruntwork.io/guides/compliance/how-to-achieve-cis-benchmark-compliance/)
guide instead.

## What you’ll learn in this guide

This guide consists of two main sections:

[Core Concepts](#core_concepts)

: An overview of the CIS AWS Foundations Benchmark v1.3.0 and why it is important to update your code for compatibility.

[Deployment walkthrough](#deployment_walkthrough)

: The steps you need to take to update your code to be compliant with CIS AWS v1.3.0. It includes a
[version compatibility table](#compatibility_table) you can use as a reference to know which Gruntwork Repo version
tag is compatible with CIS AWS v1.3.0, as well as the manuals step you need to perform to achieve said compliance.

# Core Concepts

## Background

Version 1.3.0 of the CIS AWS Foundations Benchmark was released in September of 2020. You can refer to the
[CIS website](https://www.cisecurity.org/benchmark/amazon_web_services/) where you can download the latest version of the
Benchmark (as well as all the previous versions). The latest version introduces several new recommendations, and also
removes several recommendations. This guide will walk you through implementing these using Gruntwork’s Infrastructure as Code Library
so that your infrastructure is fully compliant with version 1.3.0 of the framework.

### Changes in recommendations

Changes in recommendations (both additions and removals) are listed below. You can think of these as a "diff"
between versions 1.2.0 and 1.3.0.

#### New recommendations

These are the new recommendations introduced in version 1.3.0 of the Benchmark:

- 1.19: Ensure that all the expired SSL/TLS certificates stored in AWS IAM are removed

- 1.20: Ensure that S3 Buckets are configured with _Block public access (bucket settings)_

- 1.21: Ensure that the IAM Access analyzer is enabled

- 2.1.1: Ensure all S3 buckets employ encryption-at-rest

- 2.1.2: Ensure S3 Bucket Policy allows HTTPS requests

- 2.2.1: Ensure EBS volume encryption is enabled

- 3.10: Ensure that object-level logging for write events is enabled for (CloudTrail) S3 bucket

- 3.11: Ensure that object-level logging for reading events is enabled for (CloudTrail) S3 bucket

- 4.15: Ensure a log metric filter and alarm exists for AWS Organizations changes

- 5.1: Ensure no network ACLs allow ingress from 0.0.0.0/0 to remote server administration ports

#### Deleted recommendations

Version 1.3.0 removed some recommendations, but they only affect the IAM password policy:

- 1.5: Ensure IAM password policy requires at least one uppercase letter

- 1.6: Ensure IAM password policy require at least one lowercase letter

- 1.7: Ensure IAM password policy require at least one symbol

- 1.8: Ensure IAM password policy require at least one number

### New Gruntwork modules vs. existing modules

To achieve compliance with the new version of the Framework, we created four new modules in the
Gruntwork’s Infrastructure as Code Library, and updated a bunch of existing modules. Namely: recommendations 1.19, 1.21,
2.2.1 and 5.1 required creating new modules; the rest of the recommendations were achieved by updating existing modules.

To ensure compliance with version 1.3.0 of the CIS AWS Foundations Benchmark, you’ll need to follow all the
instructions in the [Deployment walkthrough](#deployment_walkthrough) section of this guide; precisely, follow Steps 1 and 2 to ensure that
the existing modules get updated to their CIS AWS v1.3.0 compliant versions and follow Step 3 to ensure that you install and
configure the newly created modules.

# Deployment walkthrough

Please follow the steps below to upgrade from version 1.2.0 to version 1.3.0 of the Benchmark. To see examples of what the relevant code
changes look like, please refer to these pull requests in the Acme CIS Reference Architecture:

- [cis-infrastructure-modules-acme](https://github.com/gruntwork-io/cis-infrastructure-modules-acme/pull/6)

- [cis-infrastructure-live-acme](https://github.com/gruntwork-io/cis-infrastructure-live-acme/pull/8)

## Step 1: Update references to the Gruntwork Infrastructure as Code Library

To update to the CIS AWS Foundations Benchmark v1.3.0, you need to update your references to the Gruntwork
Infrastructure as Code Library to use compatible versions. We (Gruntwork) have reviewed and updated all the library modules for compatibility with the new version of the Benchmark. As a customer, you need to update to
the proper versions of the Gruntwork library to pick up the fixes/changes made to be compatible. Refer to
[the
"Updating" section of "How to use the Gruntwork Infrastructure as Code Library"](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/#updating) for instructions on how to update the
versions in your code.

For the vast majority of the repos, the only change that will be necessary is a version number bump, but several repos
require more extensive code changes and state migrations. To upgrade without downtime and data loss, **you MUST follow
the migration instructions in the release notes in each repo to know what changes need to be made to update to the new
version.**

Gruntwork follows
[semantic
versioning](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/#versioning). For any pre-1.0 modules, this means that version updates to the minor version are considered backward
incompatible releases for any version updates before the 1.0.0 release. Make sure to read the release notes for the
relevant modules any time you are updating minor versions! Note that you will want to read the release notes for each
minor version that is updated (e.g., if you are going from v0.5.x to v0.9.x, you will want to read the notes for v0.6.0,
v0.7.0, v0.8.0, and v0.9.0 to get the full list of backward incompatible updates).

The following table provides a summary of all the relevant Gruntwork AWS modules and the respective versions that are
compatible with CIS AWS v1.3.0:

<table>
<colgroup>
<col />
<col />
<col />
</colgroup>
<tbody>
<tr className="odd">
<td><p>Gruntwork Repo</p></td>
<td><p><strong>Minimum version with CIS AWS v1.3.0 support</strong></p></td>
<td><p>Corresponding CIS AWS v1.3.0 recommendations</p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-security</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.6">v0.44.6</a></strong></p></td>
<td><p>1.20, 1.21, 2.1.1, 2.1.2, 3.10, 3.11</p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-monitoring</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.24.0">v0.24.0</a></strong></p></td>
<td><p>1.20, 2.1.1, 2.1.2</p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-zookeeper</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.8.0">v0.8.0</a></strong></p></td>
<td><p>1.20, 2.1.1, 2.1.2</p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-vpc</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.13.0">v0.13.0</a></strong></p></td>
<td><p>1.20, 2.1.1, 2.1.2</p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-openvpn</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.13.0">v0.13.0</a></strong></p></td>
<td><p>1.20, 2.1.1, 2.1.2</p></td>
</tr>
<tr className="odd">
<td><p>terraform-aws-cis-service-catalog</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.11.1">v0.11.1</a></strong></p></td>
<td><p>3.10, 3.11, 4.15, 5.1</p></td>
</tr>
<tr className="even">
<td><p>terraform-aws-service-catalog</p></td>
<td><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.15.4">v0.15.4</a></strong></p></td>
<td><p>1.21</p></td>
</tr>
</tbody>
</table>

## Step 2: Manual steps

Recommendation 4.15 requires an active subscriber for the SNS topic created by this recommendation (see Audit steps 6
and 7 for 4.15). As it’s impossible to automate this subscriber’s creation, you’ll have to do so manually. See
[Subscribing to an Amazon SNS topic](https://docs.aws.amazon.com/sns/latest/dg/sns-create-subscribe-endpoint-to-topic.html)
on the AWS website for detailed instructions.

## Step 3: Deploy new modules

### 1. Deploy the Cleanup Expired Certs module (recommendation 1.19)

The new CIS AWS v1.3 recommendations require that all expired SSL/TLS certificates stored in AWS IAM are automatically removed. Removing expired SSL/TLS certificates eliminates the risk that an invalid certificate will be deployed
accidentally to a resource such as AWS Elastic Load Balancer (ELB), which can damage the credibility of the application/website behind the ELB. As a best practice, it is recommended to delete expired certificates. To help you
achieve this recommendation, check out the [example](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/tree/v0.10.0/examples/cleanup-expired-certs/terraform) of the ready-made `cleanup-expired-certs` module.

For the code examples of deploying this module, see the
[relevant section](https://gruntwork.io/guides/compliance/how-to-achieve-cis-benchmark-compliance/#cleanup_expired_certs_deployment)
of our "How to achieve compliance with the CIS AWS Foundations Benchmark" guide.

### 2. Deploy IAM Access Analyzer module (recommendation 1.21)

The updated recommendations also require that the AWS IAM Access Analyzer service is enabled across all active regions in a given AWS account or organization.

Once enabled and active, this service will examine the trust policies and access to the following resources:

- Amazon Simple Storage Service buckets;

- AWS Identity and Access Management roles;

- AWS Key Management Service keys;

- AWS Lambda functions and layers;

- Amazon Simple Queue Service queues.

The IAM Access Analyzer will scan only within the AWS Account or Organization boundaries it has been enabled for. The results from this scan will be visible and accessible through the AWS CLI and the AWS Web console. For more information and details on what the AWS IAM Access Analyzer can achieve for your AWS Account and Organization, please refer to the official [AWS docs](https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html).

To help you achieve CIS AWS v1.3 compliance, you can find examples of how to use the ready-made module as part of the `landingzone` module in the `terraform-aws-service-catalog` repository [v0.15.4](https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.15.4), and specifically the `account-baseline-root` and `account-baseline-security` [examples](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.15.4/examples/for-learning-and-testing/landingzone).

For the code examples of deploying this module, see the
[relevant section](https://gruntwork.io/guides/compliance/how-to-achieve-cis-benchmark-compliance/#iam_access_analyzer_deployment)
of our "How to achieve compliance with the CIS AWS Foundations Benchmark" guide.

### 3. Deploy the ebs-encryption-multi-region module (recommendation 2.2.1)

EC2 supports encryption at rest when using the Elastic Block Store (EBS) service. While disabled by default, forcing encryption when creating EBS volumes is supported. Encrypting data at rest reduces the likelihood that it is
unintentionally exposed and can nullify the impact of disclosure if the encryption remains unbroken. Recommendation 2.2.1 specifies a manual process to encrypt EBS volumes using the AWS Console; however, Gruntwork has developed
a module that configures volume encryption by default in all enabled regions. Check out the [ebs-encryption-multi-region](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ebs-encryption-multi-region) to
configure AWS EBS encryption in all allowed regions of an AWS Account.

For the code examples of deploying this module, see the
[relevant section](https://gruntwork.io/guides/compliance/how-to-achieve-cis-benchmark-compliance/#encrypt_ebs_volumes)
of our "How to achieve compliance with the CIS AWS Foundations Benchmark" guide.

### 4. Deploy the vpc-app-network-acl and vpc-mgmt-network-acl modules (recommendation 5.1)

To help us achieve CIS 1.3 compliance, we’ve also created the `vpc-app-network-acl` module in our [dedicated CIS service catalog](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/tree/v0.10.0/modules/vpc-app-network-acls). This module is designed to follow CIS 1.3 recommendations - restrict access by default, but only allow explicitly listed SSH and RDP connections and hosts. To be compliant, you’ll need to deploy the new module. For more details, please refer to the [dedicated module README](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/blob/v0.10.0/modules/vpc-app-network-acls/README.md) and [the relevant example](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/tree/v0.10.0/examples/vpc-network-acls).

If you are already using the `vpc-app-network-acl` or `vpc-mgmt-network-acl` modules, you need to update the
source URL from the [`terraform-aws-vpc` module](https://github.com/gruntwork-io/terraform-aws-vpc) (previously known
as `module-vpc`). To make sure you won’t delete your existing Network ACL rules, you need to follow our [migration guide](https://github.com/gruntwork-io/cis-infrastructure-modules-acme/blob/master/networking/vpc-app/migration-guides/migrating_to_cis_v13.md) that uses `terragrunt state mv` to update the state.

The new required arguments are `allow_administrative_remote_access_cidrs`, for your office CIDRs, `allow_administrative_remote_access_cidrs_private_app_subnets` and `allow_administrative_remote_access_cidrs_private_persistence_subnets`, for the private subnets, with the CIDRs of the VPC or specific subnets within that VPC.

```hcl
module "vpc_app_network_acls" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-cis-service-catalog.git//modules/vpc-app-network-acls?ref=v0.10.0"

  # ... the existing variables weren't affected!

  allow_administrative_remote_access_cidrs_public_subnets = {
    berlin_office = "1.2.3.4/32"
    ny_office     = "6.7.8.9/32"
  }

  allow_administrative_remote_access_cidrs_private_app_subnets         = { app_vpc_cidrs = module.app_vpc.vpc_cidr_block }
  allow_administrative_remote_access_cidrs_private_persistence_subnets = { app_vpc_cidrs = module.app_vpc.vpc_cidr_block }
}
```

For the code examples of deploying this module, see the
[relevant section](https://gruntwork.io/guides/compliance/how-to-achieve-cis-benchmark-compliance/#configure_networking)
of our "How to achieve compliance with the CIS AWS Foundations Benchmark" guide.

#### 4.1 Network ACL Rules Quota limit

The new Network ACL Rules exceed the default AWS Quota for NACL Rules. To solve this issue, we created a Terraform module
([`request-quota-increase`](https://github.com/gruntwork-io/terraform-aws-utilities/tree/master/modules/request-quota-increase))
to request a quota increase! You can see a terragrunt example in the [cis-infrastructure-live-acme repository](https://github.com/gruntwork-io/cis-infrastructure-live-acme/tree/master/prod/_global/request-quota-increase).

After increase to the AWS maximum quota, when you use two remote administration ports (the defaults for both modules
are 22 (SSH) and 3389 (Remote Desktop)), you can add up to 10 CIDRs. Check out
[our
docs](https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/tree/v0.10.0/modules/vpc-app-network-acls#calculating-nacl-rules-limits) to see how to calculate the maximum number of CIDRs that you can add.
