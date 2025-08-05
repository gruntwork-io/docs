---
title: "NTP Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="1.0.2" lastModifiedVersion="0.74.2"/>

# NTP Module

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.2/modules/ntp" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.74.2" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module installs and configures [Chrony](https://chrony.tuxfamily.org/) on a Linux server. This helps prevent clock drift on the
server; if the clock drifts too far, you'll get all sorts of strange errors, such as AWS API calls failing due to
invalid timestamps.

This script currently works on:

*   Ubuntu
*   Amazon Linux 2 (currently a no-op, since Amazon Linux already has NTP installed & configured)
*   CentOS Stream 9

## Why does a module called NTP install something other than NTP?

Originally, Amazon recommended installing `ntpd` to prevent clock drift. Today, Amazon [recommends Chrony](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/set-time.html). In addition, Chrony is a newer, more robust implementation of the network time protocol (NTP). Chrony is strongly preferred to ntpd, however there are still minor [differences between ntpd and chronyd](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/system_administrators_guide/ch-configuring_ntp_using_the_chrony_suite#sect-differences_between_ntpd_and_chronyd).

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.2/modules/ntp/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.2/modules/ntp/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.2/modules/ntp/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "ecfce9fe14905e97d54764be29bd86d3"
}
##DOCS-SOURCER-END -->
