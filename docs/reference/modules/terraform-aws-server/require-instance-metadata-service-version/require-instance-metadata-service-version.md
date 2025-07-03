---
title: "Require Instance Metadata Service version script"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Module Server" version="1.0.1" lastModifiedVersion="0.13.6"/>

# Require Instance Metadata Service version script

<a href="https://github.com/gruntwork-io/terraform-aws-server/tree/v1.0.1/modules/require-instance-metadata-service-version" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.13.6" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This folder contains a script (`require-instance-metadata-service-version`) you can use to either:

1.  Allow access to both versions `1.0` and `2.0` of the Instance Metadata Service
2.  Disable version `1.0` of the Instance Metadata Service and require that version `2.0` be used

Learn more at [the official AWS EC2 Instance Metadata Service documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html).

Check out the [route53-helpers example](https://github.com/gruntwork-io/terraform-aws-server/tree/v1.0.1/examples/route53-helpers) for how to use these scripts with Packer and Terraform.

## Installing bash-commons

[`bash-commons`](https://github.com/gruntwork-io/bash-commons) is a dependency of this script. You must first install it via the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer). This script requires version `v0.1.8` of `bash-commons` or newer.

```bash
gruntwork-install --module-name "bash-commons" --repo "https://github.com/gruntwork-io/bash-commons" --tag "0.1.8"
```

## Installing the script

You can install these scripts using the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install --module-name "require-instance-metadata-service-version" --repo "https://github.com/gruntwork-io/terraform-aws-server" --tag "0.13.3"
```

## Using the script

The `require-instance-metadata-service-version` script has the following prerequisites:

1.  It must be run on an EC2 instance
2.  It requires that `bash-commons` version `v0.1.8` or newer is installed on the EC2 Instance. See instructions above.
3.  The EC2 instance must have an IAM role with permissions to modify the Instance Metadata service's options. See the
    [route53-helpers example](https://github.com/gruntwork-io/terraform-aws-server/tree/v1.0.1/examples/route53-helpers)) for a reference implementation.
4.  The EC2 instance must have the AWS CLI (version 2.2.37 or higher), unzip and jq installed.

Run the `require-instance-metadata-service-version` script in the User Data of your EC2 instances, prior to any calls to the Instance Metadata Service to configure if you want `2.0` credentials to be `required` or `optional`.

Here is an example usage:

```bash
# Require that only IMDS version 2.0 be used, disabling version 1.0
require-instance-metadata-service-version --version-2-state 'required'

# Allow either IMDS 1.0 or 2.0 versions to be used
require-instance-metadata-service-version --version-2-state 'optional'
```

Example output:

```
Setting Instance Metadata Service version 2 state to required
{
    "InstanceId": "i-002132f6f69e13b22",
    "InstanceMetadataOptions": {
        "State": "pending",
        "HttpTokens": "required",
        "HttpPutResponseHopLimit": 1,
        "HttpEndpoint": "enabled",
        "HttpProtocolIpv6": "disabled"
    }
}

...

Setting Instance Metadata Service version 2 state to optional
{
    "InstanceId": "i-002132f6f69e13b22",
    "InstanceMetadataOptions": {
        "State": "pending",
        "HttpTokens": "optional",
        "HttpPutResponseHopLimit": 1,
        "HttpEndpoint": "enabled",
        "HttpProtocolIpv6": "disabled"
    }
}
```

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-server/tree/v1.0.1/modules/require-instance-metadata-service-version/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-server/tree/v1.0.1/modules/require-instance-metadata-service-version/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-server/tree/v1.0.1/modules/require-instance-metadata-service-version/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "7e5c0a6e4f4129ccef4ff92c3d5212d2"
}
##DOCS-SOURCER-END -->
