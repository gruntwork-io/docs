---
title: "IAM Policies"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="CI Modules" version="0.59.5" lastModifiedVersion="0.52.17"/>

# IAM Policies

<a href="https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.5/modules/iam-policies" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.52.17" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This folder contains modules that create an IAM Policy with the minimum permissions needed to support specific CI use
cases. It includes:

*   [ecr-docker-push](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.5/modules/iam-policies/ecr-docker-push): An IAM Policy that enables checking for an existing Docker image in Amazon ECR and pushing a new one.
*   [ecs-service-deployment](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.5/modules/iam-policies/ecs-service-deployment): An IAM Policy that enables deploying a new Docker image to the ECS Cluster.
*   [terraform-remote-state-s3](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.5/modules/iam-policies/terraform-remote-state-s3): An IAM Policy that enables using Terraform Remote State with S3.
*   [terragrunt](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.5/modules/iam-policies/terragrunt): An IAM Policy that enables using the locking and user-identity features of Terragrunt.

## Background

### When should you use these modules?

When setting up a Continuous Integration / Continuous Delivery pipeline in your CI tool of choice (e.g. Jenkins or
CircleCI), under certain conditions, your CI tool will automatically initiate a deployment. In many cases, this will
require certain AWS permissions. You can assign these permissions to your CI tool by creating an IAM User specially for
your CI tool and granting that IAM User the minimum necessary AWS permissions to execute its deployments.

A common way to enable the CI tool to assume the permissions of your IAM User is to create the environment variables
`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.

### Why not just grant a broad set of AWS permissions to my CI tool?

There are several reasons why it's important to lock down this user.

First, an important security principle is the [principle of least access](https://en.wikipedia.org/wiki/Principle_of_least_privilege),
which holds that users should have the minimum permissions necessary to do their job and no more.

Second, restricted permissions serve as "guard rails." For example, your CI job may not be intended to deploy your entire
ECS Service from scratch, just a new Docker image (new ECS Task Definition). Therefore, if your CI job *tries* to
deploy an entire new ECS Service from scratch, something has gone wrong. Minimal permissions will ensure this errors out
versus silently doing something it's not supposed to do.

Finally, many different users will have access to your CI environment and anyone who can access your CI environment can
read all environment variables and therefore assume its AWS credentials. For this reason, in addition to limiting the
number of users who have access to the CI environment, per the security principle of [defense in depth](https://en.wikipedia.org/wiki/Defense_in_depth_\(computing\)), if a rogue user were to gain access to the CI system, we
want to limit the amount of damage she can do.

### Couldn't these permissions be locked down even further?

In some cases, yes they could. However, we must balance the need for security with the need for maintainability. For
example, one IAM Policy could be configured to grant permissions to *all* ECS Services rather than just to a specific set
of ECS Services. Although this grants more permissions than needed, this relieves us of the burden to update this IAM
Policy every time we add a new ECS Service.

Some modules are configurable to support whatever level of

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.5/modules/iam-policies/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.5/modules/iam-policies/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.5/modules/iam-policies/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "ce4da83a89543f9fe9f27f79f5cb8575"
}
##DOCS-SOURCER-END -->
