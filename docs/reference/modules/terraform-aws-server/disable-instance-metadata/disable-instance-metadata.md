---
title: "Disable Instance Metadata Access script"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Module Server" version="0.16.1" lastModifiedVersion="0.13.4"/>

# Disable Instance Metadata Access script

<a href="https://github.com/gruntwork-io/terraform-aws-server/tree/v0.16.1/modules/disable-instance-metadata" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.13.4" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This folder contains a script you can use to disable access to [the Instance Metadata service](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html) once it is no longer required.

This script is particularly helpful in use-cases where you only want your instances to consult the Instance Metadata endpoint initially, perhaps during boot, in order to retrieve some necessary information.

Once that is done, you can call this script to further secure your instance by disabling any future access to the Instance Metadata service.

`disable-instance-metadata`: This script can be run on an EC2 instance to disable further access to the Instance Metadata service from that instance. It uses
the AWS API to disable access to the endpoint.

Check out the [route53-helpers example](https://github.com/gruntwork-io/terraform-aws-server/tree/v0.16.1/examples/route53-helpers) for how to use these scripts with Packer and Terraform.

## Installing the scripts

You can install these scripts using the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install --module-name "disable-instance-metadata" --repo "https://github.com/gruntwork-io/terraform-aws-server" --tag "0.13.3"
```

## Using the script

The `disable-instance-metadata` script has the following prerequisites:

1.  It must be run on an EC2 instance
2.  The EC2 instance must have an IAM role with permissions to modify the Instance Metadata service's options. See the
    [route53-helpers example](https://github.com/gruntwork-io/terraform-aws-server/tree/v0.16.1/examples/route53-helpers)) for a reference implementation.
3.  The EC2 instance must have the AWS CLI (version 2.2.37 or higher), unzip and jq installed.

Run the `disable-instance-metadata` script in the User Data of your EC2 instances, after any required calls to the Instance Metadata service have been made. This way, your instances will still be able to access the Instance Metadata service when needed, but will also disable further access to the service upon boot.

Here is an example usage:

```bash
disable-instance-metadata
```

Example output:

```
Disabling instance metadata access...
{
    "InstanceId": "i-002132f6f69e13b22",
    "InstanceMetadataOptions": {
        "State": "pending",
        "HttpTokens": "optional",
        "HttpPutResponseHopLimit": 1,
        "HttpEndpoint": "disabled",
        "HttpProtocolIpv6": "disabled"
    }
}
```

This will result in subsequent calls to the Instance Metadata service to fail.

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-server/tree/v0.16.1/modules/disable-instance-metadata/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-server/tree/v0.16.1/modules/disable-instance-metadata/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-server/tree/v0.16.1/modules/disable-instance-metadata/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "078ef49488ff651f9c0f4a71edc53970"
}
##DOCS-SOURCER-END -->
