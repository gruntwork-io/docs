---
title: "Infrastructure Pipeline: Infrastructure Deploy Scripts"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="CI Modules" version="0.59.2" lastModifiedVersion="0.56.0"/>

# Infrastructure Pipeline: Infrastructure Deploy Scripts

<a href="https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.2/modules/infrastructure-deploy-script" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.56.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module contains a script for deploying arbitrary infrastructure code stored in version control using [Terraform](https://www.terraform.io) and [Terragrunt](https://terragrunt.gruntwork.io). The deployment script can be used to set up secure CI/CD pipelines for infrastructure code. The deployment script can run in any environment (e.g directly in CI servers, ECS task, EKS pod) to remotely run infrastructure code based on version control events. Refer to the [ecs-deploy-runner module](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.2/modules/ecs-deploy-runner) to run the deployment in an isolated ECS task, separate from the CI servers.

## Features

*   Run arbitrary terraform/terragrunt commands: plan, apply, etc

*   Deploy any reference (commit sha, tag, or branch) from any git repository

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/)!

### Core concepts

*   [Overview of scripts](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.2/modules/infrastructure-deploy-script/core-concepts.md#overview): An overview of the scripts included in this module, including how to deploy and use the scripts to implement a CI/CD pipeline for IaC code.

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.2/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.

*   [examples](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.2/examples): This folder contains working examples of how to use the submodules.

*   [test](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.2/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples folder](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.2/examples): The `examples` folder contains sample code optimized for learning, experimenting, and testing (but not production usage).

## Manage

*   [Where do I run the deploy script?](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.2/modules/infrastructure-deploy-script/core-concepts.md#where-do-i-run-the-deploy-script)

*   [What are the system requirements for the deploy script?](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.2/modules/infrastructure-deploy-script/core-concepts.md#system-requirements)


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.2/modules/infrastructure-deploy-script/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.2/modules/infrastructure-deploy-script/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.2/modules/infrastructure-deploy-script/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "134abfd30a462174c911ecefa4dea51f"
}
##DOCS-SOURCER-END -->
