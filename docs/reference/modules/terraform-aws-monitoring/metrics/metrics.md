---
title: "Metrics modules"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-monitoring/tree/main/modules%2Fmetrics" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Metrics modules

This folder contains modules for working with CloudWatch metrics:

*   [cloudwatch-custom-metrics-iam-policy](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/main/modules/metrics/cloudwatch-custom-metrics-iam-policy): A module that defines
    an IAM policy that allows reading/writing CloudWatch metrics.
*   [cloudwatch-dashboard-metric-widget](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/main/modules/metrics/cloudwatch-dashboard-metric-widget): Configures a CloudWatch Dashboard metric widget.
*   [cloudwatch-dashboard-text-widget](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/main/modules/metrics/cloudwatch-dashboard-text-widget): Configures a CloudWatch Dashboard text widget.
*   [cloudwatch-dashboard](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/main/modules/metrics/cloudwatch-dashboard): Configures and deploys a CloudWatch Dashboard.

Click on each module above to see its documentation. Head over to the [examples folder](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/main/examples) for examples.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-monitoring/tree/modules%2Fmetrics%2Freadme.md",
    "https://github.com/gruntwork-io/terraform-aws-monitoring/tree/modules%2Fmetrics%2Fvariables.tf",
    "https://github.com/gruntwork-io/terraform-aws-monitoring/tree/modules%2Fmetrics%2Foutputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "08903a53838bd108a5a52b9d10386beb"
}
##DOCS-SOURCER-END -->
