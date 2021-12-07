---
title: How to update to version 3 of the Terraform AWS Provider
categories: Upgrades
image: /assets/img/guides/refresh_icon.png
excerpt: Learn how to update the Gruntwork Reference Architecture and your infrastructure code that depends on the Gruntwork Infrastructure as Code Library to use version 3.x of the Terraform AWS provider.
tags: ["aws", "terraform", "terragrunt"]
cloud: ["aws"]
redirect_from: /static/guides/upgrades/how-to-update-to-aws-provider-v3/
---

# Intro

This guide will walk you through how to update the [Gruntwork Reference
Architecture](https://gruntwork.io/reference-architecture/) and any code that depends on the
[Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/) to version 3.x of the
Terraform AWS provider. Following the release of v3.0.0, new features and bug fixes will only be available on version
3.x, but it also has a number of backwards incompatibilities that have to be incorporated into your codebase.

## What you’ll learn in this guide

This guide consists of three main sections:

[Core Concepts](#core_concepts)  
An overview of version 3 of the AWS provider and why it is important to update your code for compatibility.

[Deployment walkthrough](#deployment_walkthrough)  
The steps you need to take to update your code relying on the Gruntwork Infrastructure as Code library and your
version of the Gruntwork Reference Architecture with compatibility with AWS provider v3. Includes a
[version compatibility table](#compatibility_table) you can use as a reference to know which Gruntwork Repo version
tag is compatible with AWS provider v3.

# Core Concepts

## Background

Version [v3.0.0](https://github.com/terraform-providers/terraform-provider-aws/releases/tag/v3.0.0) of the Terraform AWS
provider was released on July 30th 2020 with backwards incompatible updates. Following the provider release cycle,
future releases from this point onward would only be compatible with 3.X. This means that if you wish to use any new
resources or data sources that are released from this point onwards, you will need to be compatible with version 3 of
the AWS provider to be able to pull those changes in.

Since this is a major version change, there are a number of backwards incompatible changes that were introduced. In
order to be able to use version 3, you need to update your code to be compatible when upgrading (specifically, the
resource and data source blocks that have backwards incompatible changes).

For your own code, you can follow
[the official guide](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/guides/version-3-upgrade) on
updating to AWS provider version 3. The rest of this guide will focus on updating references to Gruntwork modules and
the Gruntwork Reference Architecture to be compatible with AWS provider version 3.

# Deployment walkthrough

## Updating references to Gruntwork Infrastructure as Code Library

In order to take advantage of the Terraform AWS provider version 3, you need to update your references to the Gruntwork
Infrastructure as Code Library to use a compatible version. We (Gruntwork) have gone through all our modules in the
library to test and update the code to be compatible with AWS provider version 3. As a customer, you need to update to
the proper versions of the Gruntwork library to pick up the fixes/changes that were made to be compatible. Be sure to
read the release notes to know what changes need to be made to update to that version.

Refer to [the
"Updating" section of "How to use the Gruntwork Infrastructure as Code Library"](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/#updating)
for instructions on how to update the versions in your code.

The following table provides a summary of all the relevant Gruntwork AWS modules and the respective versions that are
compatible with AWS provider version 3.

Gruntwork follows
[semantic
versioning](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/#versioning). For any pre-1.0 modules, this means that version updates to the minor version are considered backwards
incompatible releases for any version updates prior to 1.0.0 release. Make sure to read the release notes for the
relevant modules any time you are updating minor versions! Note that you will want to read the release notes for each
minor version that is updated (e.g., if you are going from v0.5.x to v0.9.x, you will want to read the notes for v0.6.0,
v0.7.0, v0.8.0, and v0.9.0 to get the full list of backwards incompatible updates).

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>Gruntwork Repo</p></td>
<td style="text-align: left;"><p><strong>Minimum version with AWS Provider v3 support</strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-vpc</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases/tag/v0.9.0">v0.9.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>module-asg</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/module-asg/releases/tag/v0.10.0">v0.10.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>module-data-storage</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/module-data-storage/releases/tag/v0.15.0">v0.15.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>module-server</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/module-server/releases/tag/v0.8.5">v0.8.5</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>package-lambda</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/package-lambda/releases/tag/v0.8.1">v0.8.1</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>package-sam</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/package-sam/releases/tag/v0.2.1">v0.2.1</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>module-cache</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/module-cache/releases/tag/v0.9.4">v0.9.4</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>package-messaging</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/package-messaging/releases/tag/v0.3.4">v0.3.4</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>package-static-assets</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/package-static-assets/releases/tag/v0.6.5">v0.6.5</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-monitoring</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.22.1">v0.22.1</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>package-openvpn</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/package-openvpn/releases/tag/v0.11.0">v0.11.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>module-security</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/module-security/releases/tag/v0.35.0">v0.35.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>module-ecs</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/module-ecs/releases/tag/v0.22.0">v0.22.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>module-ci</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/module-ci/releases/tag/v0.27.3">v0.27.3</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-eks</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.22.1">v0.22.1</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>module-load-balancer</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/module-load-balancer/releases/tag/v0.20.4">v0.20.4</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-couchbase</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-couchbase/releases/tag/v0.3.0">v0.3.0</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>package-zookeeper</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/package-zookeeper/releases/tag/v0.6.7">v0.6.7</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>package-kafka</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/package-kafka/releases/tag/v0.6.3">v0.6.3</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>package-elk</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/package-elk/releases/tag/v0.6.0">v0.6.0</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-influx</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/terraform-aws-influx/releases/tag/v0.1.3">v0.1.3</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-vault</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/hashicorp/terraform-aws-vault/releases/tag/v0.13.11">v0.13.11</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>terraform-aws-consul</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/hashicorp/terraform-aws-consul/releases/tag/v0.7.10">v0.7.10</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>terraform-aws-nomad</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/hashicorp/terraform-aws-nomad/releases/tag/v0.6.6">v0.6.6</a></strong></p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>package-terraform-utilities</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/package-terraform-utilities/releases/tag/v0.2.1">v0.2.1</a></strong></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>cis-compliance-aws</p></td>
<td style="text-align: left;"><p><strong><a href="https://github.com/gruntwork-io/cis-compliance-aws/releases/tag/v0.6.0">v0.6.0</a></strong></p></td>
</tr>
</tbody>
</table>

## Updating the Gruntwork Reference Architecture to AWS Provider v3

If you purchased the Gruntwork Reference Architecture, you will have a copy of the `infrastructure-live` and
`infrastructure-modules` repositories that contain the infrastructure code for deploying the Reference Architecture. You
will need to update the relevant code in `infrastructure-modules` to use a compatible version of the
Gruntwork Infrastructure as Code Library, as per [the compatibility table](#compatibility_table) above.

To help guide you through the upgrade process, we have updated the Acme Reference Architecture examples to support AWS
provider v3. You can refer to the following release notes for detailed information and code patches that you can apply
to update your snapshot of the Gruntwork Reference Architecture:

CIS Reference Architecture  
Refer to the release notes for
[v0.0.1-20201021](https://github.com/gruntwork-io/cis-infrastructure-live-acme/releases/tag/v0.0.1-20201021) of the
`cis-infrastructure-live-acme` repository for instructions on how to update the CIS components of the Reference
Architecture to be compatible with AWS provider v3. For all other components, refer to the release notes for
[v0.0.1-20201021](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1-20201021)
of the `infrastructure-modules-multi-account-acme` repository.

Standard Reference Architecture  
Refer to the release notes for
[v0.0.1-20201021](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/releases/tag/v0.0.1-20201021)
of the `infrastructure-modules-multi-account-acme` repository for instructions on how to update your components to be
compatible with AWS provider v3.
