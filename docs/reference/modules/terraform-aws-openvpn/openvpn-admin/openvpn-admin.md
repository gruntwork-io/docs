---
title: "openvpn-admin"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Open VPN Package Infrastructure Package" version="0.27.9" lastModifiedVersion="0.27.8"/>

# openvpn-admin

<a href="https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.27.9/modules/openvpn-admin" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.27.8" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module contains a command-line utility that allows users to request new certificates, administrators to revoke
certificates and the OpenVPN server to process those requests.

## New Certificate Request Workflow

![openvpn-request-flow-diagram](/img/reference/modules/terraform-aws-openvpn/openvpn-admin/openvpn-request-flow-diagram.svg)

## Revoke Certificate Workflow

![openvpn-revoke-flow-diagram](/img/reference/modules/terraform-aws-openvpn/openvpn-admin/openvpn-revoke-flow-diagram.png)


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.27.9/modules/openvpn-admin/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.27.9/modules/openvpn-admin/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.27.9/modules/openvpn-admin/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "c876add3a391cee8474a77016c9f6f6d"
}
##DOCS-SOURCER-END -->
