---
title: How to update to Terraform 14
categories: Upgrades
image: /assets/img/guides/refresh_icon.png
excerpt: Learn how to update your infrastructure code that depends on the Gruntwork Infrastructure as Code Library to Terraform 0.14.
tags: ["aws", "terraform", "terragrunt"]
cloud: ["aws"]
redirect_from: /static/guides/upgrades/how-to-update-to-terraform-14/
---

# Intro

This guide will walk you through how to update any code that depends on the
[Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/) to
[Terraform 0.14](https://www.terraform.io/upgrade-guides/0-14.html). Terraform 0.14 introduces several new features
and fixes, but it also has a number of backwards incompatibilities that have to be incorporated into your codebase.

## What you’ll learn in this guide

This guide consists of two main sections:

[Core Concepts](#core_concepts)  
An overview of Terraform 0.14 and why it is important to update your code for compatibility.

[Deployment walkthrough](#deployment_walkthrough)  
The steps you need to take to update your code relying on the Gruntwork Infrastructure as Code library to work with
Terraform 0.14. Includes a
[version compatibility table](#compatibility_table) you can use as a reference to know which Gruntwork Repo version
tag is compatible with Terraform 0.14.

# Core Concepts

## Background

[Terraform 0.14 was released on
December 02, 2020](https://www.hashicorp.com/blog/announcing-hashicorp-terraform-0-14-general-availability). Some of the major new features in 0.14 include:

1.  Consise diff output in `plan`.

2.  The ability to mark input variables as `sensitive`.

3.  A lock file for provider dependency versions.

For more info, check out the
[announcement blog post](https://www.hashicorp.com/blog/announcing-hashicorp-terraform-0-14-general-availability).

0.14 is a major new release for Terraform, which means it includes some backwards incompatible changes. We have
gone through all the Terraform modules in the [Gruntwork
Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/) and updated them to work with Terraform 0.14. In order to use 0.14, you will need to
update to these new versions and make other changes to your code, as described in the following section.

# Deployment walkthrough

## Step 1: update your code to be compatible with Terraform 0.13

If you haven’t already, you need to:

1.  Update your code to work with Terraform 0.13. Do NOT skip from, say, 0.11, straight to 0.14. You MUST update to
    0.13.0 or above first! If you’re still on Terraform 0.11 or older, see our
    [Terraform 0.12 upgrade guide](https://docs.gruntwork.io/guides/upgrading-to-tf12-tg19/) for instructions. If you’re
    still on Terraform 0.12, see our [Terraform 0.13
    upgrade guide](https://gruntwork.io/guides/upgrades/how-to-update-to-terraform-13/).

2.  Update all your Gruntwork modules to the latest versions just _before_ the TF 0.14 versions in the compatibility
    table below. The upgrade will be much easier and less error prone if you keep the number of version jumps as small
    as possible.

## Step 2: update your code to be compatible with Terraform 0.14

The first step is to update your own code (e.g., the code that lives in your `infrastructure-modules` repo) to be
compatible with Terraform 0.14 by following HashiCorp’s [Terraform 0.14
Upgrade Guide](https://www.terraform.io/upgrade-guides/0-14.html).

## Step 3: update references to the Gruntwork Infrastructure as Code Library

In order to take advantage of the Terraform 0.14, you need to update your references to the Gruntwork
Infrastructure as Code Library to use a compatible version. We (Gruntwork) have gone through all our modules in the
library to test and update the code to be compatible with Terraform 0.14. As a customer, you need to update to
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
compatible with Terraform 0.14:

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>Gruntwork Repo</p></td>
<td style="text-align: left;"><p><strong>Minimum version with Terraform 0.14 support</strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>Terratest</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terratest/releases/tag/v0.31.1">v0.31.1</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>Terragrunt</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terragrunt/releases/tag/v0.27.0">v0.27.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-utilities</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-utilities/releases/tag/v0.4.0">v0.4.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-vpc</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.14.0">v0.14.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-asg</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.12.0">v0.12.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-server</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.11.0">v0.11.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-lambda</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.10.0">v0.10.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-security</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.46.0">v0.46.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-load-balancer</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.22.0">v0.22.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-data-storage</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.18.0">v0.18.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-cache</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.13.0">v0.13.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-messaging</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.5.0">v0.5.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-static-assets</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-static-assets/releases/tag/v0.8.0">v0.8.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-monitoring</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.25.0">v0.25.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-openvpn</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.14.0">v0.14.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-ecs</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.28.0">v0.28.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-ci</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.32.0">v0.32.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-eks</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.36.0">v0.36.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-zookeeper</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-zookeeper/releases/tag/v0.9.0">v0.9.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-kafka</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases/tag/v0.8.0">v0.8.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-elk</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-elk/releases/tag/v0.8.0">v0.8.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-kubernetes-namespace</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-kubernetes-namespace/releases/tag/v0.2.0">v0.2.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-cis-service-catalog</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-cis-service-catalog/releases/tag/v0.16.0">v0.16.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-sam</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-sam/releases/tag/v0.4.0">v0.4.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-couchbase</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-couchbase/releases/tag/v0.5.0">v0.5.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-vault</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/hashicorp/terraform-aws-vault/releases/tag/v0.15.0">v0.15.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-consul</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/hashicorp/terraform-aws-consul/releases/tag/v0.9.0">v0.9.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-nomad</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/hashicorp/terraform-aws-nomad/releases/tag/v0.8.0">v0.8.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-architecture-catalog</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-architecture-catalog/releases/tag/v0.0.5">v0.0.5</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-service-catalog</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases/tag/v0.34.1">v0.34.1</a></strong></p></td>
</tr>
</tbody>
</table>

## Step 4: start using lock files

One of the big new features in Terraform 0.14 is the lock file for provider dependencies. The next time you run `init`
with Terraform 0.14, it will create a `.terraform.lock.hcl` file that locks you to specific versions of all the
providers you’re using. We recommend checking the `.terraform.lock.hcl` files into version control so that all your
team members get the _exact_ same provider versions when they run `init`.

Note that we’ve updated Terragrunt (as of [v0.27.0](https://github.com/gruntwork-io/terragrunt/releases/tag/v0.27.0)) to
work with lock files too. When you run `terragrunt init`, or when
[Auto Init](https://terragrunt.gruntwork.io/docs/features/auto-init/) runs as part of some other command, Terragrunt will
automatically copy the `.terraform.lock.hcl` file right next to your `terragrunt.hcl` file, making it easy to commit it
to version control.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"569cc7fb8983fc4cd3d71ae55f6a1354"}
##DOCS-SOURCER-END -->
