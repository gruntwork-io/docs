---
title: "Start OpenVPN Admin"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Open VPN Package Infrastructure Package" version="0.25.0" />

# Start OpenVPN Admin

<a href="https://github.com/gruntwork-io/terraform-aws-openvpn/tree/main/modules/start-openvpn-admin" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

This module is used to setup system.d and to start the OpenVPN Admin to process new certificate requests and
certificate revocation requests on the OpenVPN server


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/main/modules/start-openvpn-admin/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/main/modules/start-openvpn-admin/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/main/modules/start-openvpn-admin/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "2df0281d4117d50eef656ade8ee8d8c9"
}
##DOCS-SOURCER-END -->
