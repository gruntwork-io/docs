---
title: "Network Load Balancer (NLB) Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem} from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/tree/main/modules%2Fnlb" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-load-balancer/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Network Load Balancer (NLB) Module

**NOTE**: The `nlb` module has been deprecated and removed as of `v0.15.0`. If you would like to provision an NLB, you
should use the `aws_lb` resource directly instead. If you were using this module before, refer to [the migration
guide](https://github.com/gruntwork-io/module-load-balancer/tree/v0.15.0/\_docs/migration_guides/nlb_to\_0.15.0) for information on how to update your usage.

For information on why the module was removed, refer to the discussion in [PR
\#62](https://github.com/gruntwork-io/terraform-aws-load-balancer/pull/62) and [PR
\#65](https://github.com/gruntwork-io/terraform-aws-load-balancer/pull/65).


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-load-balancer/tree/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-load-balancer/tree/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-load-balancer/tree/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "5e6546b1a954d9d4aa8ffd4e11ef3234"
}
##DOCS-SOURCER-END -->
