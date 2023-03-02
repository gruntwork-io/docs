---
title: "AWS GuardDuty Multi Region Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.67.2" />

# AWS GuardDuty Multi Region Module

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/guardduty-multi-region" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

This module wraps the [guardduty core module](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/guardduty/README.adoc) to configure [AWS GuardDuty](https://aws.amazon.com/guardduty/) in all enabled regions for the AWS Account.

## Features

*   Uses the [guardduty module](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/guardduty) to enable AWS GuardDuty across all regions (recommended best practice) on your AWS account

*   Continuously monitor your AWS account for malicious activity and unauthorized behavior

*   Analyze events across multiple AWS data sources, such as AWS CloudTrail, Amazon VPC Flow Logs, and DNS logs and use machine learning, anomaly detection, and integrated threat intelligence to identify and prioritize potential threats

*   Allows publishing threat findings to SNS topics through CloudWatch Events

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/)!

### Core concepts

*   Learn more about GuardDuty in the [guardduty core module](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/guardduty/README.adoc).

*   [How to use a multi-region module](https://github.com/gruntwork-io/terraform-aws-security/tree/main/codegen/core-concepts.md#how-to-use-a-multi-region-module)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.

*   [codegen](https://github.com/gruntwork-io/terraform-aws-security/tree/main/codegen): Code generation utilities that help generate modules in this repo.

*   [examples](https://github.com/gruntwork-io/terraform-aws-security/tree/main/examples): This folder contains working examples of how to use the submodules.

*   [test](https://github.com/gruntwork-io/terraform-aws-security/tree/main/test): Automated tests for the modules and examples.

## Deploy

Note

This module depends on Python being available on your system. Python 2.7, 3.5+ are supported.

*   ***Coming soon***. We have not yet added this module to the [Acme example Reference Architecture](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme).

*   [How to configure a production-grade AWS account structure](https://gruntwork.io/guides/foundations/how-to-configure-production-grade-aws-account-structure/)

## Sample Usage

<ModuleUsage>

```hcl title="main.tf"

# ---------------------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S GUARDDUTY-MULTI-REGION MODULE
# ---------------------------------------------------------------------------------------------------------------------

module "guardduty-multi-region" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/guardduty-multi-region?ref=v0.67.2"

  # ---------------------------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ---------------------------------------------------------------------------------------------------------------------

  # The AWS Account ID the template should be operated on. This avoids
  # misconfiguration errors caused by environment variables.
  aws_account_id = <INPUT REQUIRED>

  # ---------------------------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ---------------------------------------------------------------------------------------------------------------------

  # Name of the Cloudwatch event rules.
  cloudwatch_event_rule_name = "guardduty-finding-events"

  # The ID of the default customer master key (CMK) to use to encrypt the SNS topic
  # for any region that isn't defined in var.sns_kms_master_key_ids. This could be
  # an AWS managed CMK (e.g., aws/sns) or customer managed CMK (e.g.,
  # alias/example-key). For example, you might set this variable to 'aws/sns' to use
  # the AWS managed CMK for encryption in all regions. Only used if
  # publish_findings_to_sns is true.
  default_sns_kms_master_key_id = null

  # The type of GuardDuty event to match. Setting this to anything other than the
  # default will generate noise. This usually only needs to be adjusted for
  # automated testing purposes.
  detail_type = "GuardDuty Finding"

  # If set to false, suspends GuardDuty (does not destroy data).
  enable = true

  # Specifies the frequency of notifications sent for subsequent finding
  # occurrences. If the detector is a GuardDuty member account, the value is
  # determined by the GuardDuty administrator account and cannot be modified,
  # otherwise defaults to SIX_HOURS. For standalone and GuardDuty administrator
  # accounts, it must be configured in Terraform to enable drift detection. Valid
  # values for standalone and administrator accounts: FIFTEEN_MINUTES, ONE_HOUR,
  # SIX_HOURS.
  finding_publishing_frequency = null

  # Specifies a name for the created SNS topics where findings are published.
  # publish_findings_to_sns must be set to true.
  findings_sns_topic_name = "guardduty-findings"

  # Send GuardDuty findings to SNS topics specified by findings_sns_topic_name.
  publish_findings_to_sns = false

  # A map from AWS region to the ID of a customer master key (CMK) to use to encrypt
  # the SNS topic in that region. This could be an AWS managed CMK (e.g., aws/sns)
  # or customer managed CMK (e.g., alias/example-key). If there's no CMK set for a
  # region, the value in var.default_sns_kms_master_key_id will be used instead.
  # Only used if publish_findings_to_sns is true.
  sns_kms_master_key_ids = {}

}

```

</ModuleUsage>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="aws_account_id" requirement="required" type="string">
<HclListItemDescription>

The AWS Account ID the template should be operated on. This avoids misconfiguration errors caused by environment variables.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="cloudwatch_event_rule_name" requirement="optional" type="string">
<HclListItemDescription>

Name of the Cloudwatch event rules.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;guardduty-finding-events&quot;"/>
</HclListItem>

<HclListItem name="default_sns_kms_master_key_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the default customer master key (CMK) to use to encrypt the SNS topic for any region that isn't defined in <a href="#sns_kms_master_key_ids"><code>sns_kms_master_key_ids</code></a>. This could be an AWS managed CMK (e.g., aws/sns) or customer managed CMK (e.g., alias/example-key). For example, you might set this variable to 'aws/sns' to use the AWS managed CMK for encryption in all regions. Only used if publish_findings_to_sns is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="detail_type" requirement="optional" type="string">
<HclListItemDescription>

The type of GuardDuty event to match. Setting this to anything other than the default will generate noise. This usually only needs to be adjusted for automated testing purposes.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;GuardDuty Finding&quot;"/>
</HclListItem>

<HclListItem name="enable" requirement="optional" type="bool">
<HclListItemDescription>

If set to false, suspends GuardDuty (does not destroy data).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="finding_publishing_frequency" requirement="optional" type="string">
<HclListItemDescription>

Specifies the frequency of notifications sent for subsequent finding occurrences. If the detector is a GuardDuty member account, the value is determined by the GuardDuty administrator account and cannot be modified, otherwise defaults to SIX_HOURS. For standalone and GuardDuty administrator accounts, it must be configured in Terraform to enable drift detection. Valid values for standalone and administrator accounts: FIFTEEN_MINUTES, ONE_HOUR, SIX_HOURS.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="findings_sns_topic_name" requirement="optional" type="string">
<HclListItemDescription>

Specifies a name for the created SNS topics where findings are published. publish_findings_to_sns must be set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;guardduty-findings&quot;"/>
</HclListItem>

<HclListItem name="publish_findings_to_sns" requirement="optional" type="bool">
<HclListItemDescription>

Send GuardDuty findings to SNS topics specified by findings_sns_topic_name.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="sns_kms_master_key_ids" requirement="optional" type="map(string)">
<HclListItemDescription>

A map from AWS region to the ID of a customer master key (CMK) to use to encrypt the SNS topic in that region. This could be an AWS managed CMK (e.g., aws/sns) or customer managed CMK (e.g., alias/example-key). If there's no CMK set for a region, the value in <a href="#default_sns_kms_master_key_id"><code>default_sns_kms_master_key_id</code></a> will be used instead. Only used if publish_findings_to_sns is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="cloudwatch_event_rule_arns">
<HclListItemDescription>

The ARNs of the cloudwatch event rules used to publish findings to sns if <a href="#publish_findings_to_sns"><code>publish_findings_to_sns</code></a> is set to true.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloudwatch_event_target_arns">
<HclListItemDescription>

The ARNs of the cloudwatch event targets used to publish findings to sns if <a href="#publish_findings_to_sns"><code>publish_findings_to_sns</code></a> is set to true.

</HclListItemDescription>
</HclListItem>

<HclListItem name="findings_sns_topic_arns">
<HclListItemDescription>

The ARNs of the SNS topics where findings are published if <a href="#publish_findings_to_sns"><code>publish_findings_to_sns</code></a> is set to true.

</HclListItemDescription>
</HclListItem>

<HclListItem name="findings_sns_topic_names">
<HclListItemDescription>

The names of the SNS topic where findings are published if <a href="#publish_findings_to_sns"><code>publish_findings_to_sns</code></a> is set to true.

</HclListItemDescription>
</HclListItem>

<HclListItem name="guardduty_detector_ids">
<HclListItemDescription>

The IDs of the GuardDuty detectors.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/guardduty-multi-region/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/guardduty-multi-region/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/guardduty-multi-region/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "aaf8d5475766dc2b9aea27ed0c9b4ff3"
}
##DOCS-SOURCER-END -->
