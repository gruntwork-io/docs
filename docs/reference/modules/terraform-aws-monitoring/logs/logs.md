---
title: "Log modules"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Monitoring Modules" version="0.36.5" lastModifiedVersion="0.36.5"/>

# Log modules

<a href="https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.5/modules/logs" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v0.36.5" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This folder contains modules that help with logging:

*   [cloudwatch-log-aggregation-iam-policy](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.5/modules/logs/cloudwatch-log-aggregation-iam-policy): A module that defines
    an IAM policy that allows reading/writing CloudWatch log data.
*   [cloudwatch-logs-metric-filters](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.5/modules/logs/cloudwatch-logs-metric-filters): A Terraform module to send alerts when patterns are matched in CloudWatch Logs groups.
*   [load-balancer-access-logs](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.5/modules/logs/load-balancer-access-logs): Creates an S3 bucket to store ELB access logs, along with the appropriate access policy and lifecycle rules.
*   [syslog](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.5/modules/logs/syslog): Configures rate limiting and log rotation for syslog.

Click on each module above to see its documentation. Head over to the [examples folder](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.5/examples) for examples.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.5/modules/logs/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.5/modules/logs/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v0.36.5/modules/logs/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "92d73b5ea6d1e0d73fac0c97f5393075"
}
##DOCS-SOURCER-END -->
