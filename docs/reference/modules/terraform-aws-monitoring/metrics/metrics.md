---
title: "Metrics modules"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Monitoring Modules" version="1.3.1" lastModifiedVersion="1.3.0"/>

# Metrics modules

<a href="https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v1.3.1/modules/metrics" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v1.3.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This folder contains modules for working with CloudWatch metrics:

*   [cloudwatch-custom-metrics-iam-policy](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v1.3.1/modules/metrics/cloudwatch-custom-metrics-iam-policy): A module that defines
    an IAM policy that allows reading/writing CloudWatch metrics.
*   [cloudwatch-dashboard-metric-widget](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v1.3.1/modules/metrics/cloudwatch-dashboard-metric-widget): Configures a CloudWatch Dashboard metric widget.
*   [cloudwatch-dashboard-text-widget](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v1.3.1/modules/metrics/cloudwatch-dashboard-text-widget): Configures a CloudWatch Dashboard text widget.
*   [cloudwatch-dashboard](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v1.3.1/modules/metrics/cloudwatch-dashboard): Configures and deploys a CloudWatch Dashboard.

Click on each module above to see its documentation. Head over to the [examples folder](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v1.3.1/examples) for examples.

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v1.3.1/modules/metrics/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v1.3.1/modules/metrics/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v1.3.1/modules/metrics/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "5546b6b63a3c373437b97d9d8b015874"
}
##DOCS-SOURCER-END -->
