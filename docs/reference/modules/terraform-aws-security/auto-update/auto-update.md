---
title: "Security Modules"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.67.5" lastModifiedVersion="0.65.9"/>

# Security Modules

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/auto-update" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.9" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module can configure a Linux server to automatically install critical security updates.

## Features

*   Automatically install critical security updates once per night so your servers don’t go unpatched for long periods of time.

*   Built-in random delay (between 0 and 30 minutes, by default) so all of your servers don’t update at the exact same time.

*   Supports Ubuntu 18.04 and 20.04 via [unattended-upgrades](https://help.ubuntu.com/lts/serverguide/automatic-updates.html).

*   Supports Amazon Linux, Amazon Linux 2, and CentOS via [yum-cron](http://man7.org/linux/man-pages/man8/yum-cron.8.html).

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/)!

### Core concepts

*   [How to install Auto Update](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/auto-update/core-concepts.md#installation)

*   [How Auto Update works on Ubuntu](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/auto-update/core-concepts.md#ubuntu-support)

*   [How Auto Update works on Amazon Linux and CentOS](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/auto-update/core-concepts.md#amazon-linux-and-centos-support)

*   [Auto Update Limitations](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/auto-update/core-concepts.md#limitations)

*   [Core Security Concepts](https://github.com/gruntwork-io/terraform-aws-security/tree/main/README.adoc#core-concepts)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.

*   [examples](https://github.com/gruntwork-io/terraform-aws-security/tree/main/examples): This folder contains working examples of how to use the submodules.

*   [test](https://github.com/gruntwork-io/terraform-aws-security/tree/main/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [auto-update example](https://github.com/gruntwork-io/terraform-aws-security/tree/main/examples/auto-update): The `examples/auto-update` folder contains sample code optimized for learning, experimenting, and testing (but not production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [Packer template in the Acme example Reference Architecture](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/main/services/eks-cluster/packer/eks-node.json): Production-ready sample code from the Acme Reference Architecture examples.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/auto-update/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/auto-update/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/auto-update/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "c90140d253a64821a8578ea1aacc2bcf"
}
##DOCS-SOURCER-END -->
