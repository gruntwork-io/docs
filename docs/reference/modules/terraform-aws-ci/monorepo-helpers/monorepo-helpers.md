---
title: "Infrastructure Pipeline: Monorepo Helpers"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="CI Modules" version="0.59.5" lastModifiedVersion="0.56.0"/>

# Infrastructure Pipeline: Monorepo Helpers

<a href="https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.5/modules/monorepo-helpers" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.56.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module contains scripts that help with adapting CI/CD pipelines for infrastructure code to monorepo setups. These scripts can be used to setup pipelines that only run tests on the infrastructure modules that changed, as opposed to always running all tests on every change. By only running the relevant tests for each commit, you can drastically reduce the runtime of your CI/CD pipelines (as only a subset of the tests run each time).

NOTE: - These scripts are built for running Go tests, such as \[Terratest]\([https://terratest.gruntwork.io/](https://terratest.gruntwork.io/)). - The scripts rely on certain heuristics and assumptions to decide which tests should or shouldn’t run. If you follow Gruntwork conventions, those heuristics will work for you; otherwise, they may not detect the correct tests to run.

## Features

*   Identify infrastructure (terraform, terragrunt, packer, docker, terratest, etc) modules that changed.

*   Identify the minimal tests that should be run for the modules that changed.

*   Specify and ignore changes that don’t have any tests (e.g., documentation updates).

*   Specify groups of tests that should be run for specific changes.

*   Setup precommit hooks that ensure every module has a corresponding test.

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/)!

### Core concepts

*   [Overview of scripts](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.5/modules/monorepo-helpers/core-concepts.md#overview): An overview of the scripts included in this module, including how they work.

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.5/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.

*   [examples](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.5/examples): This folder contains working examples of how to use the submodules.

*   [test](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.5/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this module out for experimenting and learning, check out the following resources:

*   [CircleCI Quickstart](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.5/modules/monorepo-helpers/core-concepts.md#circleci-quickstart): Quickstart guide for integrating the scripts into CircleCI to setup dynamic test selection.

### Production deployment

*   [terraform-aws-service-catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog): The `terraform-aws-service-catalog` module uses the scripts in this module to setup dynamic test selection.

## Manage

*   [How to configure direct test mappings](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.5/modules/monorepo-helpers/core-concepts.md#how-to-configure-direct-test-mappings)

*   [How to override the files checked by validate-monorepo-test-mappings](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.5/modules/monorepo-helpers/core-concepts.md#how-to-override-the-files-checked-by-validate-monorepo-test-mappings)

*   [Adding a new module to a repo with validate-monorepo-test-mappings](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.5/modules/monorepo-helpers/core-concepts.md#adding-a-new-module-to-a-repo-with-validate-monorepo-test-mappings)

*   [Adding a new file that has no tests to a repo with validate-monorepo-test-mappings](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.5/modules/monorepo-helpers/core-concepts.md#adding-a-new-file-that-has-no-tests-to-a-repo-with-validate-monorepo-test-mappings)

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.5/modules/monorepo-helpers/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.5/modules/monorepo-helpers/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.5/modules/monorepo-helpers/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "945ff7b8356cd5dd7ed492975f1be178"
}
##DOCS-SOURCER-END -->
