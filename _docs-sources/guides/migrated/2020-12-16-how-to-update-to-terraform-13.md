---
title: How to update to Terraform 13
categories: Upgrades
image: /assets/img/guides/refresh_icon.png
excerpt: Learn how to update the Gruntwork Reference Architecture and your infrastructure code that depends on the Gruntwork Infrastructure as Code Library to Terraform 0.13.
tags: ["aws", "terraform", "terragrunt"]
cloud: ["aws"]
redirect_from: /static/guides/upgrades/how-to-update-to-terraform-13/
---

# Intro

This guide will walk you through how to update the [Gruntwork Reference
Architecture](https://gruntwork.io/reference-architecture/) and any code that depends on the
[Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/) to
[Terraform 0.13](https://www.terraform.io/upgrade-guides/0-13.html). Terraform 0.13 introduces a number of new features
and fixes, but it also has a number of backwards incompatibilities that have to be incorporated into your codebase.

## What you’ll learn in this guide

This guide consists of two main sections:

[Core Concepts](#core_concepts)  
An overview of Terraform 0.13 and why it is important to update your code for compatibility.

[Deployment walkthrough](#deployment_walkthrough)  
The steps you need to take to update your code relying on the Gruntwork Infrastructure as Code library and your
version of the Gruntwork Reference Architecture to work with Terraform 0.13. Includes a
[version compatibility table](#compatibility_table) you can use as a reference to know which Gruntwork Repo version
tag is compatible with Terraform 0.13.

# Core Concepts

## Background

[Terraform 0.13 was released on August 10th, 2020](https://www.hashicorp.com/blog/announcing-hashicorp-terraform-0-13).
Some of the major new features in 0.13 include:

1.  The ability to use `count`, `for_each`, and `depends_on` with modules.

2.  A new `required_providers` block that makes it much easier to work with third-party providers.

3.  Custom variable validation.

For more info, check out the [announcement blog post](https://www.hashicorp.com/blog/announcing-hashicorp-terraform-0-13).

0.13 is a major new release for Terraform, which means it includes a number of backwards incompatible changes. We have
gone through all the Terraform modules in the [Gruntwork
Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/) and updated them to work with Terraform 0.13. In order to use 0.13, you will need to
update to these new versions and make other changes to your code, as described in the following section.

# Deployment walkthrough

## Step 1: update your code to be compatible with Terraform 0.12

If you haven’t already, you need to:

1.  Update your code to work with Terraform 0.12. Do NOT skip from, say, 0.11, straight to 0.13. You MUST update to
    0.12.26 or above first! If you’re still on Terraform 0.11 or older, see our
    [Terraform 0.12 upgrade guide](https://docs.gruntwork.io/guides/upgrading-to-tf12-tg19/) for instructions.

2.  Update all your Gruntwork modules to the latest versions just _before_ the TF 0.13 versions in the compatibility
    table below. The upgrade will be much easier and less error prone if you keep the number of version jumps as small
    as possible.

## Step 2: update your code to be compatible with Terraform 0.13

The first step is to update your own code (e.g., the code that lives in your `infrastructure-modules` repo) to be
compatible with Terraform 0.13 by following HashiCorp’s [Terraform 0.13
Upgrade Guide](https://www.terraform.io/upgrade-guides/0-13.html).

## Step 3: update references to the Gruntwork Infrastructure as Code Library

In order to take advantage of the Terraform 0.13, you need to update your references to the Gruntwork
Infrastructure as Code Library to use a compatible version. We (Gruntwork) have gone through all our modules in the
library to test and update the code to be compatible with Terraform 0.13. As a customer, you need to update to
the proper versions of the Gruntwork library to pick up the fixes/changes that were made to be compatible. Refer to
[the
"Updating" section of "How to use the Gruntwork Infrastructure as Code Library"](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/#updating) for instructions on how to update the
versions in your code.

For the vast majority of the repos, the only change that will be necessary is a version number bump, but several repos
require more extensive code changes and state migrations. To upgrade without downtime and data loss, **you MUST follow
the migration instructions in the release notes in each repo to know what changes need to be made to update to the new
version.** The repo most affected by the 0.13 backward incompatibilities was `terraform-aws-eks`, so if you are an EKS
user, pay special attention to the release notes!

Gruntwork follows
[semantic
versioning](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/#versioning). For any pre-1.0 modules, this means that version updates to the minor version are considered backwards
incompatible releases for any version updates prior to 1.0.0 release. Make sure to read the release notes for the
relevant modules any time you are updating minor versions! Note that you will want to read the release notes for each
minor version that is updated (e.g., if you are going from v0.5.x to v0.9.x, you will want to read the notes for v0.6.0,
v0.7.0, v0.8.0, and v0.9.0 to get the full list of backwards incompatible updates).

The following table provides a summary of all the relevant Gruntwork AWS modules and the respective versions that are
compatible with Terraform 0.13:

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>Gruntwork Repo</p></td>
<td style="text-align: left;"><p><strong>Minimum version with Terraform 0.13 support</strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>Terratest</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terratest/releases/tag/v0.30.0">v0.30.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>Terragrunt</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terragrunt/releases/tag/v0.25.4">v0.25.4</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>package-terraform-utilities</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/package-terraform-utilities/releases/tag/v0.3.0">v0.3.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-vpc</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.10.0">v0.10.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>module-asg</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/module-asg/releases/tag/v0.11.0">v0.11.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>module-server</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/module-server/releases/tag/v0.9.0">v0.9.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>package-lambda</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/package-lambda/releases/tag/v0.9.0">v0.9.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>module-security</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/module-security/releases/tag/v0.37.0">v0.37.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>module-load-balancer</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/module-load-balancer/releases/tag/v0.21.0">v0.21.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>module-data-storage</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/module-data-storage/releases/tag/v0.16.0">v0.16.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>module-cache</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/module-cache/releases/tag/v0.10.0">v0.10.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>package-messaging</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/package-messaging/releases/tag/v0.4.0">v0.4.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>package-static-assets</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/package-static-assets/releases/tag/v0.7.0">v0.7.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-monitoring</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.23.0">v0.23.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>package-openvpn</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/package-openvpn/releases/tag/v0.12.0">v0.12.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>module-ecs</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/module-ecs/releases/tag/v0.23.0">v0.23.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>module-ci</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/module-ci/releases/tag/v0.29.0">v0.29.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-eks</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.30.0">v0.30.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>package-zookeeper</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/package-zookeeper/releases/tag/v0.7.0">v0.7.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>package-kafka</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/package-kafka/releases/tag/v0.7.0">v0.7.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>package-elk</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/package-elk/releases/tag/v0.7.0">v0.7.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-kubernetes-helm</p></td>
<td style="text-align: left;"><p><strong>Deprecated. Migrate to <code>terraform-kubernetes-namespace</code> instead.</strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-kubernetes-namespace</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-kubernetes-namespace/releases/tag/v0.1.0">v0.1.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>cis-compliance-aws</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/cis-compliance-aws/releases/tag/v0.9.0">v0.9.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>package-sam</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/package-sam/releases/tag/v0.3.0">v0.3.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-couchbase</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-couchbase/releases/tag/v0.4.0">v0.4.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-influx</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-influx/releases/tag/v0.2.0">v0.2.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-consul</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/hashicorp/terraform-aws-consul/releases/tag/v0.8.0">v0.8.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-vault</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/hashicorp/terraform-aws-vault/releases/tag/v0.14.0">v0.14.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-nomad</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/hashicorp/terraform-aws-nomad/releases/tag/v0.7.0">v0.7.0</a></strong></p></td>
</tr>
</tbody>
</table>

## Updating the Gruntwork Reference Architecture to Terraform 0.13

If you purchased the Gruntwork Reference Architecture, you will have a copy of the `infrastructure-live` and
`infrastructure-modules` repositories that contain the infrastructure code for deploying the Reference Architecture. You
will need to update the relevant code in `infrastructure-modules` to use a compatible version of the
Gruntwork Infrastructure as Code Library, as per [the compatibility table](#compatibility_table) above.

To help guide you through the upgrade process, we have updated the Acme Reference Architecture examples to support
Terraform 0.13. You can refer to the pull requests to see an example of the updates you’lll need to do to make your
Reference Architecture work with Terraform 0.13:

Standard Reference Architecture  
See the Release Notes for
[v0.0.1-20201218
tag in infrastructure-modules](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1-20201218) instructions on how to update the Reference Architecture for Terraform 0.13
compatibility. You can also view the [infrastructure-modules PR](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/pull/46)
and the [infrastructure-live PR](https://github.com/gruntwork-io/infrastructure-live-multi-account-acme/pull/44) for
an example of a Terraform 0.13 update.

CIS Reference Architecture  
See the [infrastructure-modules PR](https://github.com/gruntwork-io/cis-infrastructure-modules-acme/pull/5)
and the [infrastructure-live PR](https://github.com/gruntwork-io/cis-infrastructure-live-acme/pull/7) for
an example of a Terraform 0.13 update for the CIS components of the Reference Architecture. For all other components,
refer to PRs in the Standard Reference Architecture section above.
