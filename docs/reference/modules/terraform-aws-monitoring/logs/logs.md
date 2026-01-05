---
title: "Log modules"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Monitoring Modules" version="1.3.0" lastModifiedVersion="1.3.0"/>

# Log modules

<a href="https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v1.3.0/modules/logs" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-monitoring/releases/tag/v1.3.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This folder contains modules that help with logging:

*   [cloudwatch-log-aggregation-iam-policy](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v1.3.0/modules/logs/cloudwatch-log-aggregation-iam-policy): A module that defines
    an IAM policy that allows reading/writing CloudWatch log data.
*   [cloudwatch-logs-metric-filters](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v1.3.0/modules/logs/cloudwatch-logs-metric-filters): A Terraform module to send alerts when patterns are matched in CloudWatch Logs groups.
*   [load-balancer-access-logs](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v1.3.0/modules/logs/load-balancer-access-logs): Creates an S3 bucket to store ELB access logs, along with the appropriate access policy and lifecycle rules.
*   [syslog](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v1.3.0/modules/logs/syslog): Configures rate limiting and log rotation for syslog.

Click on each module above to see its documentation. Head over to the [examples folder](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v1.3.0/examples) for examples.

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v1.3.0/modules/logs/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v1.3.0/modules/logs/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-monitoring/tree/v1.3.0/modules/logs/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "db6e06bf7a38f0798737bc2b1f51a12d"
}
##DOCS-SOURCER-END -->
