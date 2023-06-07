---
title: "Init OpenVPN Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Open VPN Package Infrastructure Package" version="0.26.3" lastModifiedVersion="0.18.0"/>

# Init OpenVPN Module

<a href="https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.26.3/modules/init-openvpn" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.18.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module is used to initialize the OpenVPN server, its Public Key Infrastructure (PKI), Certificate Authority
(CA) and configuration on a server that has been installed using the [install-openvpn](https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.26.3/modules/install-openvpn) module.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.26.3/modules/init-openvpn/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.26.3/modules/init-openvpn/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.26.3/modules/init-openvpn/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "fbf75fa1873b27c9097465fb02326e07"
}
##DOCS-SOURCER-END -->
