---
title: "ip-lockdown Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="1.0.2" lastModifiedVersion="0.44.10"/>

# ip-lockdown Module

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.2/modules/ip-lockdown" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.44.10" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module can lock down specified outgoing ip addresses on a Linux server such that only specific OS users can access them.
The main motivation for locking down EC2 metadata is as follows:

1.  EC2 metadata gives you the credentials you need to assume any IAM role associated with the EC2 instance, and thereby, get all the permissions available in that IAM role.
2.  Locking down the metadata to, for example, only the root user, makes sure that if a hacker breaks into your server with a privileged user, they cannot get the full power of the IAM role.

This module has been tested specifically with Ubuntu, but will probably work with any Debian distribution that uses [iptables](http://ipset.netfilter.org/iptables.man.html).

#### Example

In the example below we restrict access to [ec2-instance-metadata endpoint](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html) to the users `foo`, `bar` and `root`. All other users on the instance will be blocked from access.

`./ip-lockdown 169.254.169.254 foo bar root`

Normally users make a `curl` call to get metadata like the AWS region or credentials associated with this EC2 Instance's IAM Role. Following the invocation of ip-lockdown, only users foo, bar, and root can query that data.

The complete example of using terraform to deploy a generated AMI into your AWS account and automatically invoke `ip-lockdown` from the `User Data` is also available in the [examples](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.2/examples/ip-lockdown/aws-example) folder.

#### Installation

To use this module, you just need to:

1.  Install [bash-commons](https://github.com/gruntwork-io/bash-commons) on your servers.
2.  Install the `ip-lockdown` script on your servers.

The best way to do that is to use the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer) in a
[Packer](https://www.packer.io/) template (make sure to replace `<BASH_COMMONS_VERSION>` and
`<MODULE_SECURITY_VERSION>` below with the latest versions from the [bash-commons releases
page](https://github.com/gruntwork-io/bash-commons/releases) and [terraform-aws-security releases
page](https://github.com/gruntwork-io/terraform-aws-security/releases), respectively):

```
gruntwork-install --module-name bash-commons --tag <BASH_COMMONS_VERSION> --repo https://github.com/gruntwork-io/bash-commons
gruntwork-install --module-name ip-lockdown --tag <MODULE_SECURITY_VERSION> --repo https://github.com/gruntwork-io/terraform-aws-security
```

|Option|Description|Required|Example|
|---|---|---|---|
|IP|IP address that will be locked down (outgoing access will be disabled) for all *but* the users specified in subequent `[<USER> ... ]]` arguments|Required|169.254.169.254|
|USER|Space separated whitelist of users who will be allowed outgoing access to specified ip address|Optional|root (or any other OS user name)|

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.2/modules/ip-lockdown/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.2/modules/ip-lockdown/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.2/modules/ip-lockdown/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "0d0328ed9d3799fbc318d062545f5467"
}
##DOCS-SOURCER-END -->
