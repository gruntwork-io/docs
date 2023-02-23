---
title: "Backup PKI Assets Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem} from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-openvpn/tree/main/modules%2Fbackup-openvpn-pki" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Backup PKI Assets Module

This module is used to backup the OpenVPN Public Key Infrastructure (PKI) to S3 on a server that has been installed using
the [install-openvpn](https://github.com/gruntwork-io/terraform-aws-openvpn/tree/install-openvpn) module.

The PKI is the set of certificates used to verify the server and users' identities for VPN authentication purposes. This
normally lives on the OpenVPN server in the `/etc/openvpn-ca` and `/etc/openvpn` directories. If we didn't back these files
up, we would have to reissue client certificates if the OpenVPN server ever needed to be rebuilt.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "f4c565ae38fbd4291b2ba2e7a008cbc6"
}
##DOCS-SOURCER-END -->
