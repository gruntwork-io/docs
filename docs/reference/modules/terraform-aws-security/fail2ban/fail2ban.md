---
title: "Fail2Ban Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.71.3" lastModifiedVersion="0.65.9"/>

# Fail2Ban Module

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v0.71.3/modules/fail2ban" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.65.9" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module can configure a Linux server to automatically ban malicious ip addresses from connecting to the server
via SSH. This module currently supports Ubuntu, Amazon Linux, Amazon Linux 2, and CentOS (using
[fail2ban](https://www.fail2ban.org)).

The module also optionally creates CloudWatch Metrics to track the number of Banned and Unbanned IP Addresses per AWS
Instance.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.71.3/modules/fail2ban/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.71.3/modules/fail2ban/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.71.3/modules/fail2ban/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "dc18be0e83dfcaffc4bd0559f9512688"
}
##DOCS-SOURCER-END -->
