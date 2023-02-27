---
title: "Start OpenVPN Admin"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-openvpn/tree/main/modules%2Fstart-openvpn-admin" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Start OpenVPN Admin

This module is used to setup system.d and to start the OpenVPN Admin to process new certificate requests and
certificate revocation requests on the OpenVPN server


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/modules%2Fstart-openvpn-admin%2Freadme.md",
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/modules%2Fstart-openvpn-admin%2Fvariables.tf",
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/modules%2Fstart-openvpn-admin%2Foutputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "2049afb07053543471eac60438fdfefe"
}
##DOCS-SOURCER-END -->
