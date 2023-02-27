---
title: "Network ACL Outbound Terraform Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/main/modules/network-acl-outbound" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Network ACL Outbound Terraform Module

This Terraform Module launches is a simple helper for adding outbound rules to a [Network
ACL](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_ACLs.html). Network ACLs can be a bit tricky to work with
because they are stateless, which means that opening an outbound port is often not enough; you also need to open
[ephemeral inbound ports](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_ACLs.html#VPC_ACLs_Ephemeral_Ports)
which the remote services can use to respond. This can be very easy to forget, so this module adds not only the
outbound to an ACL, but also the ephemeral inbound ports for return traffic.

See the [network-acl-inbound](https://github.com/gruntwork-io/terraform-aws-vpc/tree/main/modules/network-acl-inbound) module for the analogous version of this module, but for opening
inbound ports.

## What's a Network ACL?

[Network ACLs](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_ACLs.html) provide an extra layer of network
security, similar to a [security group](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html).
Whereas a security group controls what inbound and outbound traffic is allowed for a specific resource (e.g. a single
EC2 instance), a network ACL controls what inbound and outbound traffic is allowed for an entire subnet.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/modules/network-acl-outbound/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/modules/network-acl-outbound/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/modules/network-acl-outbound/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "a0b00ede139fd34b083d3b2bd94a23bd"
}
##DOCS-SOURCER-END -->
