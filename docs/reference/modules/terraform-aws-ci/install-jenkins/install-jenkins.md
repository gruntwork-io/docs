---
title: "Install Jenkins Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="CI Modules" version="1.0.0" lastModifiedVersion="0.58.0"/>

# Install Jenkins Module

<a href="https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.0.0/modules/install-jenkins" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.58.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module contains two scripts for working with [Jenkins CI server](https://jenkins.io):

1.  `install.sh`: This script will install Jenkins on a Linux server. Currently, Ubuntu is supported.
    This script also installs the `run-jenkins` script.
2.  `run-jenkins`: This script can be used to configure and run Jenkins. You will typically run this script while your
    server is booting.

## Example code

*   Check out the [jenkins example](https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.0.0/examples/jenkins) for working sample code.
*   See [install.sh](https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.0.0/modules/install-jenkins/install.sh) and [run-jenkins.sh](https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.0.0/modules/install-jenkins/run-jenkins) for all options you can pass to these scripts.

## Install Jenkins

The easiest way to install and run these scripts is to use the [Gruntwork
Installer](https://github.com/gruntwork-io/gruntwork-installer) (make sure to replace `VERSION` below with the latest
version from the [releases page](https://github.com/gruntwork-io/terraform-aws-ci/releases)):

```bash
gruntwork-install \
  --module-name 'install-jenkins' \
  --repo 'https://github.com/gruntwork-io/terraform-aws-ci' \
  --tag '<VERSION>' \
  --version 2.164.3
```

The command above will copy `install.sh` to your server, run it, install Jenkins 2.164.3, and copy the `run-jenkins`
script into `/usr/local/bin`. We recommend running this command in a [Packer template](https://www.packer.io/) so you
can create an AMI with Jenkins installed. Check out the [jenkins example](https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.0.0/examples/jenkins) for an example of such a
Packer template.

## Run Jenkins

Once you have an AMI with Jenkins installed, you need to deploy it on an EC2 Instance in AWS. The easiest way to do
this is with the [jenkins-server module](https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.0.0/modules/jenkins-server). When the EC2 Instance is booting, you should
typically do two things in [User Data](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html):

1.  Mount an EBS volume for the Jenkins home directory. You want to use an EBS volume so that your Jenkins data is
    persisted even if the EC2 Instance is replaced (e.g., after a crash or upgrade). The `mount-ebs-volume` script in the
    [persistent-ebs-volume module](https://github.com/gruntwork-io/terraform-aws-server/tree/main/modules/persistent-ebs-volume)
    makes it easy to attach and mount a volume.

2.  Execute the `run-jenkins` script to start Jenkins, set its home directory to the mount point for the EBS volume,
    and configure it to use a certain amount of memory:

    ```bash
    run-jenkins \
      --memory "1g" \
      --jenkins-home "/jenkins"
    ```

Check out the [jenkins example](https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.0.0/examples/jenkins) for an example of such a User Data script.

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.0.0/modules/install-jenkins/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.0.0/modules/install-jenkins/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v1.0.0/modules/install-jenkins/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "82f97bebc2de18227d28aeb84cb56932"
}
##DOCS-SOURCER-END -->
