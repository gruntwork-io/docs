---
title: "Install OpenVPN Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Open VPN Package Infrastructure Package" version="0.27.9" lastModifiedVersion="0.27.4"/>

# Install OpenVPN Module

<a href="https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.27.9/modules/install-openvpn" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.27.4" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module is used to install the OpenVPN package and related template files onto a server. It is expected that
the [init-openvpn](https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.27.9/modules/init-openvpn) module will be run on the server during boot to configure the OpenVPN server installed by this
package.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.27.9/modules/install-openvpn/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.27.9/modules/install-openvpn/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.27.9/modules/install-openvpn/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "a031d966f2205b7975219789db2e7039"
}
##DOCS-SOURCER-END -->
