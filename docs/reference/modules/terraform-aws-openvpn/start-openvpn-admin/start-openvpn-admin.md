---
title: "Start OpenVPN Admin"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Open VPN Package Infrastructure Package" version="0.27.0" lastModifiedVersion="0.26.2"/>

# Start OpenVPN Admin

<a href="https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.27.0/modules/start-openvpn-admin" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.26.2" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module is used to setup system.d and to start the OpenVPN Admin to process new certificate requests and
certificate revocation requests on the OpenVPN server


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.27.0/modules/start-openvpn-admin/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.27.0/modules/start-openvpn-admin/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.27.0/modules/start-openvpn-admin/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "0594b5eb439373d33a16273455be8501"
}
##DOCS-SOURCER-END -->
