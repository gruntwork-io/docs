---
title: "Infrastructure Pipeline: Infrastructure Deployer CLI"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="CI Modules" version="0.52.5" lastModifiedVersion="0.50.8"/>

# Infrastructure Pipeline: Infrastructure Deployer CLI

<a href="https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.52.5/modules/infrastructure-deployer" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.50.8" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module contains a CLI that can be used to set up a secure CI/CD pipeline for your infrastructure code ([Terraform](https://www.terraform.io), [Terragrunt](https://terragrunt.gruntwork.io), [Packer](https://www.packer.io/), [Docker](https://www.docker.com/), etc). This CLI can be used to in existing CI servers (e.g Jenkins, CircleCI, GitLab) to set up workflows that:

*   Run `plan` and `apply` with approval stages

*   Build docker images for every PR

*   Build VM images (e.g., AMIs) for every PR

*   Automatically update infrastructure configurations and deploying them

These workflows can be invoked on an isolated ECS task setup by the [ecs-deploy-runner module](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.52.5/modules/ecs-deploy-runner).

Refer to the [ecs-deploy-runner module](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.52.5/modules/ecs-deploy-runner) for more information on the ECS task.

## Features

*   Run arbitrary terraform/terragrunt commands: plan, apply, etc

*   Run docker and packer image builds

*   Deploy any reference (commit sha, tag, or branch) from any git repository

*   Synchronously wait for deployments to complete before exiting

*   Stream log outputs from deployments as they happen

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/)!

### Core concepts

*   [Overview](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.52.5/modules/infrastructure-deployer/core-concepts.md#overview): An overview of the CLI and how to use it within CI jobs to implement an automated workflow for infrastructure code.

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.52.5/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.

*   [examples](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.52.5/examples): This folder contains working examples of how to use the submodules.

*   [test](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.52.5/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples folder](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.52.5/examples): The `examples` folder contains sample code optimized for learning, experimenting, and testing (but not production usage).

## Manage

*   [How do I install the infrastructure-deployer CLI?](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.52.5/modules/infrastructure-deployer/core-concepts.md#how-do-i-install-the-infrastructure-deployer-cli)

*   [What are the IAM permissions](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.52.5/modules/infrastructure-deployer/core-concepts.md#what-are-the-iam-permissions-necessary-to-trigger-a-deployment)

*   [How do I invoke the ECS deploy runner?](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.52.5/modules/infrastructure-deployer/core-concepts.md#how-do-i-invoke-the-ecs-deploy-runner)


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.52.5/modules/infrastructure-deployer/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.52.5/modules/infrastructure-deployer/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.52.5/modules/infrastructure-deployer/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "cdf9c3bb6faabf7b93ad65607eddd39d"
}
##DOCS-SOURCER-END -->
