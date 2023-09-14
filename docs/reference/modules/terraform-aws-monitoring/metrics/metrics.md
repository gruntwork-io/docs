---
title: "Metrics modules"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Monitoring Modules" version="0.36.4" lastModifiedVersion="0.36.3"/>

# Metrics modules

<a href="https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.4/modules/metrics" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.3" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This folder contains modules for working with CloudWatch metrics:

*   [cloudwatch-custom-metrics-iam-policy](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.4/modules/metrics/cloudwatch-custom-metrics-iam-policy): A module that defines
    an IAM policy that allows reading/writing CloudWatch metrics.
*   [cloudwatch-dashboard-metric-widget](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.4/modules/metrics/cloudwatch-dashboard-metric-widget): Configures a CloudWatch Dashboard metric widget.
*   [cloudwatch-dashboard-text-widget](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.4/modules/metrics/cloudwatch-dashboard-text-widget): Configures a CloudWatch Dashboard text widget.
*   [cloudwatch-dashboard](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.4/modules/metrics/cloudwatch-dashboard): Configures and deploys a CloudWatch Dashboard.

Click on each module above to see its documentation. Head over to the [examples folder](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.4/examples) for examples.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.4/modules/metrics/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.4/modules/metrics/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.4/modules/metrics/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "db7984d31c50c0390bd5110cf0190ae7"
}
##DOCS-SOURCER-END -->
