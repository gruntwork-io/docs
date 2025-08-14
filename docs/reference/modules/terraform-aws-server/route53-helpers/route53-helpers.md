---
title: "Route 53 Helpers"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Module Server" version="1.0.2" lastModifiedVersion="0.13.4"/>

# Route 53 Helpers

<a href="https://github.com/gruntwork-io/terraform-aws-server/tree/v1.0.2/modules/route53-helpers" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.13.4" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This folder contains helper scripts for working with Amazon's DNS Service, [Route 53](https://aws.amazon.com/route53/).
The helpers are:

*   `add-dns-a-record`: A script that can be run on an EC2 instance to add a DNS A record pointing to the instance's IP
    address.

Check out the [route53-helpers example](https://github.com/gruntwork-io/terraform-aws-server/tree/v1.0.2/examples/route53-helpers) for how to use these scripts with Terraform.

## Installing the helpers

You can install the helpers using the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install --module-name "route53-helpers" --repo "https://github.com/gruntwork-io/terraform-aws-server" --tag "0.0.3"
```

## Using the add-dns-a-record helper

The `add-dns-a-record` script has the following prerequisites:

1.  It must be run on an EC2 instance
2.  The EC2 instance must have an IAM role with permissions to modify Route 53 entries (see below)
3.  The EC2 instance must have the AWS CLI and jq installed

To run the script, simply pass it the AWS region, the id of the [hosted
zone](http://docs.aws.amazon.com/Route53/latest/DeveloperGuide/AboutHostedZones.html) where the DNS entry should be
added, and the hostname to use for the DNS entry:

```bash
add-dns-a-record --aws-region us-east-1 --hosted-zone-id ASDF123456 --hostname foo.my-company.com
```

Run `add-dns-a-record --help` to see all available options.

## IAM Permissions

Here is an example of an IAM policy your EC2 instance needs attached to its IAM role to run these scripts:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Action": "route53:ChangeResourceRecordSets",
      "Effect": "Allow",
      "Resource": "arn:aws:route53:::hostedzone/<ID_OF_HOSTED_ZONE>"
    }
  ]
}
```

Check out the [route53-helpers example](https://github.com/gruntwork-io/terraform-aws-server/tree/v1.0.2/examples/route53-helpers) to see what this looks like in action.

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-server/tree/v1.0.2/modules/route53-helpers/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-server/tree/v1.0.2/modules/route53-helpers/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-server/tree/v1.0.2/modules/route53-helpers/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "dbd48e0ba9f60447d2ff55fe503927e0"
}
##DOCS-SOURCER-END -->
