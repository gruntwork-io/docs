---
title: "Init OpenVPN Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-openvpn/tree/main/modules%2Finit-openvpn" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Init OpenVPN Module

This module is used to initialize the OpenVPN server, its Public Key Infrastructure (PKI), Certificate Authority
(CA) and configuration on a server that has been installed using the [install-openvpn](https://github.com/gruntwork-io/terraform-aws-openvpn/tree/install-openvpn) module.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "4ff938eb4a0f7d817dd691dc64c4ce7e"
}
##DOCS-SOURCER-END -->
