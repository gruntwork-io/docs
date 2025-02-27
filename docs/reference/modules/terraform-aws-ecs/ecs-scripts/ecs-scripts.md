---
title: "ECS Scripts"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon ECS" version="0.38.6" lastModifiedVersion="0.32.1"/>

# ECS Scripts

<a href="https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.6/modules/ecs-scripts" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.32.1" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This folder contains helper scripts for running an ECS Cluster, including:

*   `configure-ecs-instance`: This script configures an EC2 Instance so it registers in the specified ECS cluster and
    uses the specified credentials for private Docker registry access. Note that this script can only be run as root on
    an EC2 instance with the [Amazon ECS-optimized AMI](https://aws.amazon.com/marketplace/pp/B00U6QTYI2/) installed.

## Installing the helpers

You can install the helpers using the [Gruntwork Installer](https://github.com/gruntwork-io/gruntwork-installer):

```bash
gruntwork-install --module-name "ecs-scripts" --repo "https://github.com/gruntwork-io/terraform-aws-ecs" --tag "0.0.1"
```

For an example, see the [Packer](https://www.packer.io/) template under [/examples/example-ecs-instance-ami/build.json](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.6/examples/example-ecs-instance-ami/build.json).

## Using the configure-ecs-instance helper

The `configure-ecs-instance` script has the following prerequisites:

1.  It must be run on an EC2 instance.
2.  The EC2 instance must be running an [Amazon ECS-optimized AMI](https://aws.amazon.com/marketplace/pp/B00U6QTYI2/).
3.  The EC2 instance must have the AWS CLI installed.

To run the script, you need to pass it the name of the ECS cluster you are using.

If you're using ECR auth, the ECS Agent will authenticate automatically using the IAM role of your EC2 instances. If
you are NOT using ECR auth, you must specify the auth type and corresponding auth details to the
`configure-ecs-instance` script so it can configure the ECS Agent accordingly:

*   `docker-hub`: You must set the environment variables `DOCKER_REPO_AUTH` (the auth token) and `DOCKER_REPO_EMAIL`
    (the email address used to login).
*   `docker-gitlab`: You must set the environment variables `DOCKER_REPO_AUTH` (the auth token).
*   `docker-other`: You must set the environment variables `DOCKER_REPO_URL` (the URL of your Docker registry),
    `DOCKER_REPO_AUTH` (the auth token), and, optionally, `DOCKER_REPO_EMAIL` (the email address used to login).

See [Docker Authentication
Formats](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/private-auth.html#docker-auth-formats) to learn
about how ECS handles Docker registry authentication.

For example, to use a private [Docker Hub](https://hub.docker.com/) repo, you would run:

```bash
export DOCKER_REPO_AUTH="(your Docker Hub auth value)"
export DOCKER_REPO_EMAIL="(your Docker Hub email)"
configure-ecs-instance --ecs-cluster-name my-ecs-cluster --docker-auth-type docker-hub
```

To use a private Docker registry other than Docker Hub, you would run:

```bash
export DOCKER_REPO_URL="(your Docker repo URL)"
export DOCKER_REPO_AUTH="(your Docker repo auth value)"
export DOCKER_REPO_EMAIL="(your Docker repo email)"
configure-ecs-instance --ecs-cluster-name my-ecs-cluster --docker-auth-type docker-hub
```

Run `configure-ecs-instance --help` to see all available options.

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.6/modules/ecs-scripts/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.6/modules/ecs-scripts/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.6/modules/ecs-scripts/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "fa05cfd26f6fec1278d16d52a02d1d32"
}
##DOCS-SOURCER-END -->
