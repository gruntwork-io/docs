---
title: "Network Load Balancer (NLB) Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Load Balancer Modules" version="0.30.4" lastModifiedVersion="0.23.0"/>

# Network Load Balancer (NLB) Module

<a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/tree/v0.30.4/modules/nlb" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases/tag/v0.23.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

**NOTE**: The `nlb` module has been deprecated and removed as of `v0.15.0`. If you would like to provision an NLB, you
should use the `aws_lb` resource directly instead. If you were using this module before, refer to [the migration
guide](https://github.com/gruntwork-io/module-load-balancer/tree/v0.15.0/\_docs/migration_guides/nlb_to\_0.15.0) for information on how to update your usage.

For information on why the module was removed, refer to the discussion in [PR
\#62](https://github.com/gruntwork-io/terraform-aws-load-balancer/pull/62) and [PR
\#65](https://github.com/gruntwork-io/terraform-aws-load-balancer/pull/65).

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-load-balancer/tree/v0.30.4/modules/nlb/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-load-balancer/tree/v0.30.4/modules/nlb/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-load-balancer/tree/v0.30.4/modules/nlb/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "a8a1c40adf5596636c33fe725b0a315e"
}
##DOCS-SOURCER-END -->
