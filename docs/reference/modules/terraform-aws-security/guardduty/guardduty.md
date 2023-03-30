---
title: "AWS GuardDuty"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.67.6" lastModifiedVersion="0.66.0"/>

# AWS GuardDuty

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/guardduty" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.66.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module configures [AWS GuardDuty](https://aws.amazon.com/guardduty/), a service for detecting threats and continuously monitoring your AWS accounts and workloads against malicious activity and unauthorized behavior.

## Features

*   Continuously monitor your AWS account for malicious activity and unauthorized behavior

*   Analyze events across multiple AWS data sources, such as AWS CloudTrail, Amazon VPC Flow Logs, and DNS logs and use machine learning, anomaly detection, and integrated threat intelligence to identify and prioritize potential threats

*   Uses the \[guardduty-single-region module]\(../guardduty-single-region) to enable AWS GuardDuty across all regions (recommended best practice) on your AWS account

*   Allows publishing threat findings to SNS topics through CloudWatch Events

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/)!

### Core concepts

*   [What Is GuardDuty?](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/guardduty/core-concepts.md#what-is-guardduty)

*   [Why Use GuardDuty?](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/guardduty/core-concepts.md#why-use-guardduty)

*   [What Is A Finding?](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/guardduty/core-concepts.md#what-is-a-finding)

*   [Where Should I Enable GuardDuty?](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/guardduty/core-concepts.md#where-should-i-enable-guardduty)

*   [Resources Created](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/guardduty/core-concepts.md#resources-created)

*   [Gotchas](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/guardduty/core-concepts.md#gotchas)

*   [Known Issues](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/guardduty/core-concepts.md#known-issues)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.

*   [codegen](https://github.com/gruntwork-io/terraform-aws-security/tree/main/codegen): Code generation utilities that help generate modules in this repo.

*   [examples](https://github.com/gruntwork-io/terraform-aws-security/tree/main/examples): This folder contains working examples of how to use the submodules.

*   [test](https://github.com/gruntwork-io/terraform-aws-security/tree/main/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this module out, check out the following resources:

*   [guardduty example](https://github.com/gruntwork-io/terraform-aws-security/tree/main/examples/guardduty).

### Production deployment

If you want to deploy this module in production, check out the following resources:

*   ***Coming soon***. We have not yet added this module to the [Acme example Reference Architecture](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme).

*   [Terraform Module to enable GuardDuty in all enabled regions of an AWS Account](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/guardduty-multi-region).

*   [How to configure a production-grade AWS account structure](https://gruntwork.io/guides/foundations/how-to-configure-production-grade-aws-account-structure/)

## Sample Usage

<ModuleUsage>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S GUARDDUTY MODULE
# ------------------------------------------------------------------------------------------------------

module "guardduty" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/guardduty?ref=v0.67.6"

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Name of the Cloudwatch event rule
  cloudwatch_event_rule_name = "guardduty-finding-events"

  # Enable or disable creation of the resources of this module. Necessary workaround
  # when it is desired to set count = 0 for modules, which is not yet possible as of
  # terraform 0.12.17
  create_resources = true

  # The type of GuardDuty event to match. Setting this to anything other than the
  # default will generate noise. This usually only needs to be adjusted for
  # automated testing purposes.
  detail_type = "GuardDuty Finding"

  # Enable monitoring and feedback reporting. Setting to false is equivalent to
  # suspending GuardDuty. Defaults to true
  enable = true

  # Specifies the frequency of notifications sent for subsequent finding
  # occurrences. If the detector is a GuardDuty member account, the value is
  # determined by the GuardDuty administrator account and cannot be modified,
  # otherwise defaults to SIX_HOURS. For standalone and GuardDuty administrator
  # accounts, it must be configured in Terraform to enable drift detection. Valid
  # values for standalone and administrator accounts: FIFTEEN_MINUTES, ONE_HOUR,
  # SIX_HOURS.
  finding_publishing_frequency = null

  # Specifies a name for the created SNS topic where findings are published.
  # publish_findings_to_sns must be set to true.
  findings_sns_topic_name = "guardduty-findings"

  # Send GuardDuty findings to a SNS topic specified by findings_sns_topic_name.
  publish_findings_to_sns = false

  # The ID of a customer master key (CMK) to use to encrypt the SNS topic. This
  # could be an AWS managed CMK (e.g., aws/sns) or customer managed CMK (e.g.,
  # alias/example-key). Only used if publish_findings_to_sns is true.
  sns_kms_master_key_id = null

}

```

</ModuleUsage>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Optional

<HclListItem name="cloudwatch_event_rule_name" requirement="optional" type="string">
<HclListItemDescription>

Name of the Cloudwatch event rule

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;guardduty-finding-events&quot;"/>
</HclListItem>

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Enable or disable creation of the resources of this module. Necessary workaround when it is desired to set count = 0 for modules, which is not yet possible as of terraform 0.12.17

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="detail_type" requirement="optional" type="string">
<HclListItemDescription>

The type of GuardDuty event to match. Setting this to anything other than the default will generate noise. This usually only needs to be adjusted for automated testing purposes.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;GuardDuty Finding&quot;"/>
</HclListItem>

<HclListItem name="enable" requirement="optional" type="bool">
<HclListItemDescription>

Enable monitoring and feedback reporting. Setting to false is equivalent to suspending GuardDuty. Defaults to true

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

Specifies a name for the created SNS topic where findings are published. publish_findings_to_sns must be set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;guardduty-findings&quot;"/>
</HclListItem>

<HclListItem name="publish_findings_to_sns" requirement="optional" type="bool">
<HclListItemDescription>

Send GuardDuty findings to a SNS topic specified by findings_sns_topic_name.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="sns_kms_master_key_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of a customer master key (CMK) to use to encrypt the SNS topic. This could be an AWS managed CMK (e.g., aws/sns) or customer managed CMK (e.g., alias/example-key). Only used if publish_findings_to_sns is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="cloudwatch_event_rule_arn">
<HclListItemDescription>

The ARN of the cloudwatch event rule used to publish findings to sns if <a href="#publish_findings_to_sns"><code>publish_findings_to_sns</code></a> is set to true.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloudwatch_event_rule_id">
<HclListItemDescription>

The id of the cloudwatch event rule used to publish findings to sns if <a href="#publish_findings_to_sns"><code>publish_findings_to_sns</code></a> is set to true.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloudwatch_event_target_arn">
<HclListItemDescription>

The ARN of the cloudwatch event target used to publish findings to sns if <a href="#publish_findings_to_sns"><code>publish_findings_to_sns</code></a> is set to true.

</HclListItemDescription>
</HclListItem>

<HclListItem name="findings_sns_topic_arn">
<HclListItemDescription>

The ARN of the SNS topic where findings are published if <a href="#publish_findings_to_sns"><code>publish_findings_to_sns</code></a> is set to true.

</HclListItemDescription>
</HclListItem>

<HclListItem name="findings_sns_topic_name">
<HclListItemDescription>

The name of the SNS topic where findings are published if <a href="#publish_findings_to_sns"><code>publish_findings_to_sns</code></a> is set to true.

</HclListItemDescription>
</HclListItem>

<HclListItem name="guardduty_detector_account_id">
<HclListItemDescription>

The AWS account ID of the GuardDuty detector.

</HclListItemDescription>
</HclListItem>

<HclListItem name="guardduty_detector_id">
<HclListItemDescription>

The ID of the GuardDuty detector.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/guardduty/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/guardduty/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/guardduty/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "6e25a7b10a9febf5f0458a72def9aa33"
}
##DOCS-SOURCER-END -->
