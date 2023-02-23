---
title: "Network ACL Inbound Terraform Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem} from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/tree/main/modules%2Fnetwork-acl-inbound" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-vpc/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Network ACL Inbound Terraform Module

This Terraform Module launches is a simple helper for adding inbound rules to a [Network
ACL](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_ACLs.html). Network ACLs can be a bit tricky to work
with because they are stateless, which means that opening an inbound port is often not enough; you also need to open
[ephemeral outbound ports](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_ACLs.html#VPC_ACLs_Ephemeral_Ports)
which your services use to respond. This can be very easy to forget, so this module adds not only the inbound ports to
an ACL, but also the ephemeral outbound ports for return traffic.

See the [network-acl-outbound](https://github.com/gruntwork-io/terraform-aws-vpc/tree/network-acl-outbound) module for the analogous version of this module, but for opening
outbound ports.

## What's a Network ACL?

[Network ACLs](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_ACLs.html) provide an extra layer of network
security, similar to a [security group](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html).
Whereas a security group controls what inbound and outbound traffic is allowed for a specific resource (e.g. a single
EC2 instance), a network ACL controls what inbound and outbound traffic is allowed for an entire subnet.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-vpc/tree/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "1ac66b7f825d97685db823bdeec10e16"
}
##DOCS-SOURCER-END -->
