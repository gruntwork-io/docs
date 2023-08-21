---
title: "Install OpenVPN Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Open VPN Package Infrastructure Package" version="0.26.5" lastModifiedVersion="0.19.0"/>

# Install OpenVPN Module

<a href="https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.26.5/modules/install-openvpn" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.19.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module is used to install the OpenVPN package and related template files onto a server. It is expected that
the [init-openvpn](https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.26.5/modules/init-openvpn) module will be run on the server during boot to configure the OpenVPN server installed by this
package.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.26.5/modules/install-openvpn/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.26.5/modules/install-openvpn/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.26.5/modules/install-openvpn/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "190ffe038c3d016de74426e6a4d2b8b1"
}
##DOCS-SOURCER-END -->
