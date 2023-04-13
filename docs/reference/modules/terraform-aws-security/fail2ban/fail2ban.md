---
title: "Fail2Ban Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.67.8" lastModifiedVersion="0.65.9"/>

# Fail2Ban Module

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v0.67.8/modules/fail2ban" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.9" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module can configure a Linux server to automatically ban malicious ip addresses from connecting to the server
via SSH. This module currently supports Ubuntu, Amazon Linux, Amazon Linux 2, and CentOS (using
[fail2ban](https://www.fail2ban.org)).

The module also optionally creates CloudWatch Metrics to track the number of Banned and Unbanned IP Addresses per AWS
Instance.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.67.8/modules/fail2ban/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.67.8/modules/fail2ban/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.67.8/modules/fail2ban/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "5ee123f1ea49e6dff2c268ced5d603be"
}
##DOCS-SOURCER-END -->
