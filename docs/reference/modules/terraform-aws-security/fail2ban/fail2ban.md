---
title: "Fail2Ban Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules%2Ffail2ban" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Fail2Ban Module

This module can configure a Linux server to automatically ban malicious ip addresses from connecting to the server
via SSH. This module currently supports Ubuntu, Amazon Linux, Amazon Linux 2, and CentOS (using
[fail2ban](https://www.fail2ban.org)).

The module also optionally creates CloudWatch Metrics to track the number of Banned and Unbanned IP Addresses per AWS
Instance.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/modules%2Ffail2ban%2Freadme.md",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/modules%2Ffail2ban%2Fvariables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/modules%2Ffail2ban%2Foutputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "0d8376bf186d9d9e324c89f0f260c2d7"
}
##DOCS-SOURCER-END -->
