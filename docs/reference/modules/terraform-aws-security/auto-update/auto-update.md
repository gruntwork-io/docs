---
title: "Security Modules"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.75.18" lastModifiedVersion="0.75.13"/>

# Security Modules

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.18/modules/auto-update" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.13" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module can configure a Linux server to automatically install critical security updates.

## Features

*   Automatically install critical security updates once per night so your servers don’t go unpatched for long periods of time.

*   Built-in random delay (between 0 and 30 minutes, by default) so all of your servers don’t update at the exact same time.

*   Supports Ubuntu 18.04 and 20.04 via [unattended-upgrades](https://help.ubuntu.com/lts/serverguide/automatic-updates.html).

*   Supports Amazon Linux 2, Amazon Linux 2023, and CentOS Stream 9 [yum-cron](http://man7.org/linux/man-pages/man8/yum-cron.8.html).

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://docs.gruntwork.io/library/overview/)!

### Core concepts

*   [How to install Auto Update](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.18/modules/auto-update/core-concepts.md#installation)

*   [How Auto Update works on Ubuntu](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.18/modules/auto-update/core-concepts.md#ubuntu-support)

*   [How Auto Update works on Amazon Linux 2](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.18/modules/auto-update/core-concepts.md#amazon-linux-support)

*   [Auto Update Limitations](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.18/modules/auto-update/core-concepts.md#limitations)

*   [Core Security Concepts](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.18/README.adoc#core-concepts)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.18/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.

*   [examples](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.18/examples): This folder contains working examples of how to use the submodules.

*   [test](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.18/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [auto-update example](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.18/examples/auto-update): The `examples/auto-update` folder contains sample code optimized for learning, experimenting, and testing (but not production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [Packer template in the Acme example Reference Architecture](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/blob/main/services/eks-cluster/packer/eks-node.json): Production-ready sample code from the Acme Reference Architecture examples.

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.18/modules/auto-update/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.18/modules/auto-update/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.18/modules/auto-update/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "70780598bd7a3ed67443fe3536d7a652"
}
##DOCS-SOURCER-END -->
