---
title: "Backup PKI Assets Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Open VPN Package Infrastructure Package" version="0.27.9" lastModifiedVersion="0.26.2"/>

# Backup PKI Assets Module

<a href="https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.27.9/modules/backup-openvpn-pki" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.26.2" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module is used to backup the OpenVPN Public Key Infrastructure (PKI) to S3 on a server that has been installed using
the [install-openvpn](https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.27.9/modules/install-openvpn) module.

The PKI is the set of certificates used to verify the server and users' identities for VPN authentication purposes. This
normally lives on the OpenVPN server in the `/etc/openvpn-ca` and `/etc/openvpn` directories. If we didn't back these files
up, we would have to reissue client certificates if the OpenVPN server ever needed to be rebuilt.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.27.9/modules/backup-openvpn-pki/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.27.9/modules/backup-openvpn-pki/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.27.9/modules/backup-openvpn-pki/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "01ae879dadcc170b2e4248b32cf57f34"
}
##DOCS-SOURCER-END -->
