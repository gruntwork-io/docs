---
title: "Bash Commons"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem} from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/tree/master/modules%2Fbash-commons" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-kafka/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Bash Commons

Many of the scripts in this repo use a generic set of bash functions that any proper general purpose programming language
would have in its core libraries. We try to approximate this experience for bash by creating our own "bash commons".

## Usage

Any scripts in this repo that use the bash commons libraries will assume they have already been installed by Packer into
a Docker image or Amazon Machine Image (AMI) with `gruntwork-install` as follows

```
gruntwork-install --module-name 'bash-commons' --tag 'vX.Y.Z' --repo https://github.com/gruntwork-io/terraform-aws-kafka
```

This will download all the bash-commons libraries to `/opt/lib/github.com/gruntwork-io/terraform-aws-kafka/bash-commons`.

### Development

If you're modifying this repo, consider using the `--branch` property with `gruntwork-install` so that your Docker Image
or AMI uses your active branch's copy of the bash-commons

```
export PACKAGE_ZOOKEEPER_BRANCH=<my-branch-name>
gruntwork-install --module-name 'bash-commons' --tag 'vX.Y.Z' --branch "$PACKAGE_KAFKA_BRANCH" --repo https://github.com/gruntwork-io/terraform-aws-kafka
```

Better yet, in your `docker-compose.yml`, mount the bash-commons module directory to
`/opt/lib/github.com/gruntwork-io/terraform-aws-kafka/bash-commons` so that you will enjoy hot reload on every new run of
`docker-compose up`!


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-kafka/tree/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "e3389d5cfcf9a8a561f2d8712dee557e"
}
##DOCS-SOURCER-END -->
