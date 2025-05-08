---
title: "Attach ENI Scripts"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Module Server" version="0.16.3" lastModifiedVersion="0.15.14"/>

# Attach ENI Scripts

<a href="https://github.com/gruntwork-io/terraform-aws-server/tree/v0.16.3/modules/attach-eni" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.15.14" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This folder contains scripts you can use to attach [Elastic Network Interfaces
(ENIs)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html) to your EC2 Instances.

1.  `attach-eni`: This script can be run on an EC2 instance to attach an ENI. You can specify the ENI by ID or by having
    the script search for the ENI by tag. Normally, you would use Terraform's [aws_network_interface_attachment
    resource](https://www.terraform.io/docs/providers/aws/r/network_interface_attachment.html) to do this, but this
    resource does not work in cases where you need to attach volumes dynamically, such as with Auto Scaling Groups.

    The script has been tested with Ubuntu 18.04, Ubuntu 20.04, AmazonLinux v1.x, and AmazonLinux v2.x, though
    it may work on other Linux distributions as well.

An ENI allows you to have IP addresses that remain static, even if the underlying EC2 Instances are changing.

Check out the [attach-eni example](https://github.com/gruntwork-io/terraform-aws-server/tree/v0.16.3/examples/attach-eni) for how to use these scripts with Terraform.

## Installing the attach-eni script

You can install the `attach-eni` script using the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install --module-name "attach-eni" --repo "https://github.com/gruntwork-io/terraform-aws-server" --tag "0.1.10"
```

## Using the attach-eni script

The `attach-eni` script has the following prerequisites:

1.  It must be run as root
2.  It must be run on an EC2 instance
3.  The EC2 instance must have an IAM role with permissions to search ENIs and EC2 tags, as well as attach ENIs (see the
    [attach-eni example](https://github.com/gruntwork-io/terraform-aws-server/tree/v0.16.3/examples/attach-eni))
4.  The EC2 instance must have the AWS CLI and jq installed

Typically, you'll want to run the `attach-eni` script in the User Data of your EC2 instances so it attaches the ENI at
boot time.

Here is an example usage:

```bash
attach-eni --eni-id eni-abcd1234
```

This will attach ENI `eni-abcd1234` to the current Instance. Alternatively, you can also run the script as follows:

```bash
attach-eni --eni-with-same-tag Name
```

This tells the script to try find and attach an ENI with the same `Name` tag as the current EC2 Instance.

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-server/tree/v0.16.3/modules/attach-eni/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-server/tree/v0.16.3/modules/attach-eni/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-server/tree/v0.16.3/modules/attach-eni/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "4b9a19c0e6e5f310e0c20e785b8a3bc3"
}
##DOCS-SOURCER-END -->
