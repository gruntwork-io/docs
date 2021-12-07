---
title: How to update to Terraform 1.x
categories: Upgrades
image: /assets/img/guides/refresh_icon.png
excerpt: Learn how to update your infrastructure code that depends on the Gruntwork Infrastructure as Code Library to Terraform 1.x.
tags: ["aws", "terraform", "terragrunt"]
cloud: ["aws"]
redirect_from: /static/guides/upgrades/how-to-update-to-terraform-1-x/
---

# Intro

This guide will walk you through how to update any code that depends on the
[Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/) to
[Terraform 1.x](https://www.terraform.io/upgrade-guides/1-0.html). Terraform v1.0
is an unusual release in that its primary focus is on stability. Terraform
v1.0.0 intentionally has no significant changes compared to Terraform v0.15.5.
You can consider the v1.0 series as a direct continuation of the v0.15 series.

## What you’ll learn in this guide

This guide consists of two main sections:

[Core Concepts](#core_concepts)  
An overview of Terraform 1.x.

[Deployment walkthrough](#deployment_walkthrough)  
The steps you need to take to update your code relying on the Gruntwork Infrastructure as Code library to work with
Terraform 1.x. Includes a
[version compatibility table](#compatibility_table) you can use as a reference to know which Gruntwork Repo version
tag is compatible with Terraform 0.15.

# Core Concepts

## Background

[Terraform 1.0.0 was released on
June 08, 2021](https://www.hashicorp.com/blog/announcing-hashicorp-terraform-1-0-general-availability). Some of the major new features in 0.15 include:

1.  A more stable state file format that will be compatible with Terraform 0.14, 0.15, and, once it’s released, 1.0.

For more info, check out the for a complete introduction, check out the
[announcement blog post](https://www.hashicorp.com/blog/announcing-hashicorp-terraform-1-0-general-availability).

From the [release
notes](https://github.com/hashicorp/terraform/releases/tag/v1.0.0): "Terraform v1.0.0 intentionally has no significant changes compared to
Terraform v0.15.5. You can consider the v1.0 series as a direct continuation of
the v0.15 series; we do not intend to issue any further releases in the v0.15
series, because all of the v1.0 releases will be only minor updates to address
bugs."

# Deployment walkthrough

## Step 1: update your code to be compatible with Terraform 0.15

If you haven’t already, you need to:

1.  Update your code to work with Terraform 0.15. Do NOT skip from, say, 0.11, straight to 1.x. You MUST update to
    0.15.0 or above first!

    1.  If you’re still on Terraform 0.11 or older, see our
        [Terraform 0.12 upgrade guide](https://docs.gruntwork.io/guides/upgrading-to-tf12-tg19/).

    2.  If you’re still on Terraform 0.12, see our
        [Terraform 0.13 upgrade guide](https://gruntwork.io/guides/upgrades/how-to-update-to-terraform-13/).

    3.  If you’re still on Terraform 0.13, see our
        [Terraform 0.14 upgrade guide](https://gruntwork.io/guides/upgrades/how-to-update-to-terraform-14/).

    4.  If you’re still on Terraform 0.14, see our
        [Terraform 0.15 upgrade guide](https://gruntwork.io/guides/upgrades/how-to-update-to-terraform-15/).

2.  Update all your Gruntwork modules to the latest versions just _before_ the TF 1.x versions in the compatibility
    table below. The upgrade will be much easier and less error prone if you keep the number of version jumps as small
    as possible.

## Step 2: update references to the Gruntwork Infrastructure as Code Library

In order to take advantage of the Terraform 1.x, you need to update your references to the Gruntwork
Infrastructure as Code Library to use a compatible version. We (Gruntwork) have gone through all our modules in the
library to test and update the code to be compatible with Terraform 1.x. As a customer, you need to update to
the proper versions of the Gruntwork library to pick up the fixes/changes that we made to be compatible. Refer to
[the
"Updating" section of "How to use the Gruntwork Infrastructure as Code Library"](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/#updating) for instructions on how to update the
versions in your code.

For the vast majority of the repos, the only change that will be necessary is a version number bump, but several repos
require more extensive code changes and state migrations. To upgrade without downtime and data loss, **you MUST follow
the migration instructions in the release notes in each repo to know what changes need to be made to update to the new
version.**

Gruntwork follows
[semantic
versioning](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/#versioning). For any pre-1.0 modules, this means that version updates to the minor version are considered backwards
incompatible releases for any version updates prior to 1.0.0 release. Make sure to read the release notes for the
relevant modules any time you are updating minor versions! Note that you will want to read the release notes for each
minor version that is updated (e.g., if you are going from v0.5.x to v0.9.x, you will want to read the notes for v0.6.0,
v0.7.0, v0.8.0, and v0.9.0 to get the full list of backwards incompatible updates).

The following table provides a summary of all the relevant Gruntwork AWS modules and the respective versions that are
compatible with Terraform 1.x:

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>Gruntwork Repo</p></td>
<td style="text-align: left;"><p><strong>Minimum version with Terraform 1.x support</strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>Terratest</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/Terratest/releases/tag/v0.37.0">v0.37.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>Terragrunt</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/Terragrunt/releases/tag/v0.31.0">v0.31.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-utilities</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.6.0">v0.6.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-vpc</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.17.0">v0.17.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-asg</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.15.0">v0.15.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-server</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.13.0">v0.13.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-lambda</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.13.0">v0.13.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-security</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.53.0">v0.53.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-load-balancer</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.27.0">v0.27.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-data-storage</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.21.0">v0.21.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-cache</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.16.0">v0.16.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-messaging</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.7.0">v0.7.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-static-assets</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.11.0">v0.11.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-monitoring</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.30.0">v0.30.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-openvpn</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.16.0">v0.16.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-ecs</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.30.0">v0.30.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-ci</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.38.0">v0.38.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-eks</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.43.0">v0.43.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-zookeeper</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.12.0">v0.12.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-kafka</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.11.0">v0.11.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-elk</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.11.0">v0.11.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-kubernetes-namespace</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-kubernetes-namespace/releases/tag/v0.4.0">v0.4.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-cis-service-catalog</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.26.0">v0.26.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-sam</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.6.0">v0.6.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-couchbase</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-couchbase/releases/tag/v0.7.0">v0.7.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-vault</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/hashicorp/terraform-aws-vault/releases/tag/v0.17.0">v0.17.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-consul</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/hashicorp/terraform-aws-consul/releases/tag/v0.11.0">v0.11.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-nomad</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/hashicorp/terraform-aws-nomad/releases/tag/v0.10.0">v0.10.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-architecture-catalog</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.18">v0.0.18</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-service-catalog</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.55.0">v0.55.0</a></strong></p></td>
</tr>
</tbody>
</table>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"957cf65de4aabadc0c8252d796571742"}
##DOCS-SOURCER-END -->
