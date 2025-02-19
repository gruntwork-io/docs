---
title: "ECS Service with ALB"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon ECS" version="0.38.6" lastModifiedVersion="0.24.1"/>

# ECS Service with ALB

<a href="https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.6/modules/ecs-service-with-alb" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.24.1" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

**NOTE**: The `ecs-service-with-alb` module has been merged with `ecs-service` as of `v0.16.0`. Refer to the migration
guide in [the release notes](https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.16.0) for more info.

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.6/modules/ecs-service-with-alb/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.6/modules/ecs-service-with-alb/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.6/modules/ecs-service-with-alb/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "8be7de3c9f5ff0b4e9dbddb26f3d8201"
}
##DOCS-SOURCER-END -->
