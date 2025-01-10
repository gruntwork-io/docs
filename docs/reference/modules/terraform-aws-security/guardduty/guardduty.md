---
title: "AWS GuardDuty"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.75.2" lastModifiedVersion="0.74.0"/>

# AWS GuardDuty

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.2/modules/guardduty" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.74.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module configures [AWS GuardDuty](https://aws.amazon.com/guardduty/), a service for detecting threats and continuously monitoring your AWS accounts and workloads against malicious activity and unauthorized behavior.

## Features

*   Continuously monitor your AWS account for malicious activity and unauthorized behavior

*   Analyze events across multiple AWS data sources, such as AWS CloudTrail, Amazon VPC Flow Logs, and DNS logs and use machine learning, anomaly detection, and integrated threat intelligence to identify and prioritize potential threats

*   Uses the \[guardduty module]\(../guardduty-single-region) to enable AWS GuardDuty across all regions (recommended best practice) on your AWS account

*   Allows publishing threat findings to SNS topics through CloudWatch Events

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/)!

### Core concepts

*   [What Is GuardDuty?](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.2/modules/guardduty/core-concepts.md#what-is-guardduty)

*   [Why Use GuardDuty?](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.2/modules/guardduty/core-concepts.md#why-use-guardduty)

*   [What Is A Finding?](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.2/modules/guardduty/core-concepts.md#what-is-a-finding)

*   [Where Should I Enable GuardDuty?](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.2/modules/guardduty/core-concepts.md#where-should-i-enable-guardduty)

*   [Resources Created](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.2/modules/guardduty/core-concepts.md#resources-created)

*   [Gotchas](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.2/modules/guardduty/core-concepts.md#gotchas)

*   [Known Issues](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.2/modules/guardduty/core-concepts.md#known-issues)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.2/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.

*   [codegen](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.2/codegen): Code generation utilities that help generate modules in this repo.

*   [examples](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.2/examples): This folder contains working examples of how to use the submodules.

*   [test](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.2/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this module out, check out the following resources:

*   [guardduty example](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.2/examples/guardduty).

### Production deployment

If you want to deploy this module in production, check out the following resources:

*   ***Coming soon***. We have not yet added this module to the [Acme example Reference Architecture](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme).

*   [Terraform Module to enable GuardDuty in all enabled regions of an AWS Account](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.2/modules/guardduty-multi-region).

*   [How to configure a production-grade AWS account structure](https://gruntwork.io/guides/foundations/how-to-configure-production-grade-aws-account-structure/)

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S GUARDDUTY MODULE
# ------------------------------------------------------------------------------------------------------

module "guardduty" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/guardduty?ref=v0.75.2"

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Whether to accept an invite from the master account if the detector is not
  # created automatically
  accept_invite = false

  # The AWS account ID of the GuardDuty delegated admin/master account
  admin_account_id = null

  # Indicates the auto-enablement configuration of GuardDuty for the member
  # accounts in the organization. Valid values are ALL, NEW, NONE.
  auto_enable_organization_members = null

  # Name of the Cloudwatch event rule
  cloudwatch_event_rule_name = "guardduty-finding-events"

  # Create the GuardDuty Member Detector resource
  create_detector = true

  # Set to 'true' to create GuardDuty Organization Admin Account. Only usable in
  # Organizations primary account.
  create_organization_admin_account = false

  # The type of GuardDuty event to match. Setting this to anything other than
  # the default will generate noise. This usually only needs to be adjusted for
  # automated testing purposes.
  detail_type = "GuardDuty Finding"

  # Map of detector features to enable, where the key is the name of the feature
  # the value is the feature configuration. When AWS Organizations delegated
  # admin account is used, use var.organization_configuration_features instead.
  # See
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/guardduty_detector_feature
  detector_features = {}

  # Enable monitoring and feedback reporting. Setting to false is equivalent to
  # suspending GuardDuty. Defaults to true
  enable = true

  # Specifies the frequency of notifications sent for subsequent finding
  # occurrences. If the detector is a GuardDuty member account, the value is
  # determined by the GuardDuty administrator account and cannot be modified,
  # otherwise defaults to SIX_HOURS. For standalone and GuardDuty administrator
  # accounts, it must be configured in Terraform to enable drift detection.
  # Valid values for standalone and administrator accounts: FIFTEEN_MINUTES,
  # ONE_HOUR, SIX_HOURS.
  finding_publishing_frequency = null

  # The S3 bucket ARN under which the findings get exported. Required if
  # publish_findings_to_s3 is set to true.
  findings_s3_bucket_arn = null

  # The ARN of the KMS key used to encrypt GuardDuty findings. GuardDuty
  # enforces this to be encrypted. Only used if publish_findings_to_s3 is true.
  findings_s3_kms_key_arn = null

  # The bucket prefix without trailing '/' under which the findings get
  # exported. The prefix is optional and will be
  # AWSLogs/[Account-ID]/GuardDuty/[Region]/ if not provided.
  findings_s3_prefix = null

  # Specifies a name for the created SNS topic where findings are published.
  # publish_findings_to_sns must be set to true.
  findings_sns_topic_name = "guardduty-findings"

  # The invitation message to send to the member accounts.
  invitation_message = "Please accept GuardDuty invitation."

  # Map of member accounts to add to GuardDuty where key is the AWS account
  # number. Use to add Organization accounts to delegated admin account or
  # invite member accounts by invite.
  member_accounts = {}

  # Map of organization configuration features to enable, where key is the
  # feature name and value is feature configuration. See
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/guardduty_organization_configuration_feature
  organization_configuration_features = {}

  # Publish GuardDuty findings to an S3 bucket. The bucket arn and prefix are
  # specified by findings_s3_bucket_arn and findings_s3_bucket_prefix.
  publish_findings_to_s3 = false

  # Send GuardDuty findings to a SNS topic specified by findings_sns_topic_name.
  publish_findings_to_sns = false

  # The ID of a customer master key (CMK) to use to encrypt the SNS topic. This
  # could be an AWS managed CMK (e.g., aws/sns) or customer managed CMK (e.g.,
  # alias/example-key). Only used if publish_findings_to_sns is true.
  sns_kms_master_key_id = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S GUARDDUTY MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/guardduty?ref=v0.75.2"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Whether to accept an invite from the master account if the detector is not
  # created automatically
  accept_invite = false

  # The AWS account ID of the GuardDuty delegated admin/master account
  admin_account_id = null

  # Indicates the auto-enablement configuration of GuardDuty for the member
  # accounts in the organization. Valid values are ALL, NEW, NONE.
  auto_enable_organization_members = null

  # Name of the Cloudwatch event rule
  cloudwatch_event_rule_name = "guardduty-finding-events"

  # Create the GuardDuty Member Detector resource
  create_detector = true

  # Set to 'true' to create GuardDuty Organization Admin Account. Only usable in
  # Organizations primary account.
  create_organization_admin_account = false

  # The type of GuardDuty event to match. Setting this to anything other than
  # the default will generate noise. This usually only needs to be adjusted for
  # automated testing purposes.
  detail_type = "GuardDuty Finding"

  # Map of detector features to enable, where the key is the name of the feature
  # the value is the feature configuration. When AWS Organizations delegated
  # admin account is used, use var.organization_configuration_features instead.
  # See
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/guardduty_detector_feature
  detector_features = {}

  # Enable monitoring and feedback reporting. Setting to false is equivalent to
  # suspending GuardDuty. Defaults to true
  enable = true

  # Specifies the frequency of notifications sent for subsequent finding
  # occurrences. If the detector is a GuardDuty member account, the value is
  # determined by the GuardDuty administrator account and cannot be modified,
  # otherwise defaults to SIX_HOURS. For standalone and GuardDuty administrator
  # accounts, it must be configured in Terraform to enable drift detection.
  # Valid values for standalone and administrator accounts: FIFTEEN_MINUTES,
  # ONE_HOUR, SIX_HOURS.
  finding_publishing_frequency = null

  # The S3 bucket ARN under which the findings get exported. Required if
  # publish_findings_to_s3 is set to true.
  findings_s3_bucket_arn = null

  # The ARN of the KMS key used to encrypt GuardDuty findings. GuardDuty
  # enforces this to be encrypted. Only used if publish_findings_to_s3 is true.
  findings_s3_kms_key_arn = null

  # The bucket prefix without trailing '/' under which the findings get
  # exported. The prefix is optional and will be
  # AWSLogs/[Account-ID]/GuardDuty/[Region]/ if not provided.
  findings_s3_prefix = null

  # Specifies a name for the created SNS topic where findings are published.
  # publish_findings_to_sns must be set to true.
  findings_sns_topic_name = "guardduty-findings"

  # The invitation message to send to the member accounts.
  invitation_message = "Please accept GuardDuty invitation."

  # Map of member accounts to add to GuardDuty where key is the AWS account
  # number. Use to add Organization accounts to delegated admin account or
  # invite member accounts by invite.
  member_accounts = {}

  # Map of organization configuration features to enable, where key is the
  # feature name and value is feature configuration. See
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/guardduty_organization_configuration_feature
  organization_configuration_features = {}

  # Publish GuardDuty findings to an S3 bucket. The bucket arn and prefix are
  # specified by findings_s3_bucket_arn and findings_s3_bucket_prefix.
  publish_findings_to_s3 = false

  # Send GuardDuty findings to a SNS topic specified by findings_sns_topic_name.
  publish_findings_to_sns = false

  # The ID of a customer master key (CMK) to use to encrypt the SNS topic. This
  # could be an AWS managed CMK (e.g., aws/sns) or customer managed CMK (e.g.,
  # alias/example-key). Only used if publish_findings_to_sns is true.
  sns_kms_master_key_id = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Optional

<HclListItem name="accept_invite" requirement="optional" type="bool">
<HclListItemDescription>

Whether to accept an invite from the master account if the detector is not created automatically

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="admin_account_id" requirement="optional" type="string">
<HclListItemDescription>

The AWS account ID of the GuardDuty delegated admin/master account

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="auto_enable_organization_members" requirement="optional" type="string">
<HclListItemDescription>

Indicates the auto-enablement configuration of GuardDuty for the member accounts in the organization. Valid values are ALL, NEW, NONE.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_event_rule_name" requirement="optional" type="string">
<HclListItemDescription>

Name of the Cloudwatch event rule

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;guardduty-finding-events&quot;"/>
</HclListItem>

<HclListItem name="create_detector" requirement="optional" type="bool">
<HclListItemDescription>

Create the GuardDuty Member Detector resource

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_organization_admin_account" requirement="optional" type="bool">
<HclListItemDescription>

Set to 'true' to create GuardDuty Organization Admin Account. Only usable in Organizations primary account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="detail_type" requirement="optional" type="string">
<HclListItemDescription>

The type of GuardDuty event to match. Setting this to anything other than the default will generate noise. This usually only needs to be adjusted for automated testing purposes.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;GuardDuty Finding&quot;"/>
</HclListItem>

<HclListItem name="detector_features" requirement="optional" type="map(object(…))">
<HclListItemDescription>

Map of detector features to enable, where the key is the name of the feature the value is the feature configuration. When AWS Organizations delegated admin account is used, use <a href="#organization_configuration_features"><code>organization_configuration_features</code></a> instead. See https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/guardduty_detector_feature

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    status = string
    additional_configuration = list(object({
      name   = string
      status = string
    }))
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
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

<HclListItem name="findings_s3_bucket_arn" requirement="optional" type="string">
<HclListItemDescription>

The S3 bucket ARN under which the findings get exported. Required if publish_findings_to_s3 is set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="findings_s3_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the KMS key used to encrypt GuardDuty findings. GuardDuty enforces this to be encrypted. Only used if publish_findings_to_s3 is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="findings_s3_prefix" requirement="optional" type="string">
<HclListItemDescription>

The bucket prefix without trailing '/' under which the findings get exported. The prefix is optional and will be AWSLogs/[Account-ID]/GuardDuty/[Region]/ if not provided.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="findings_sns_topic_name" requirement="optional" type="string">
<HclListItemDescription>

Specifies a name for the created SNS topic where findings are published. publish_findings_to_sns must be set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;guardduty-findings&quot;"/>
</HclListItem>

<HclListItem name="invitation_message" requirement="optional" type="string">
<HclListItemDescription>

The invitation message to send to the member accounts.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;Please accept GuardDuty invitation.&quot;"/>
</HclListItem>

<HclListItem name="member_accounts" requirement="optional" type="map(object(…))">
<HclListItemDescription>

Map of member accounts to add to GuardDuty where key is the AWS account number. Use to add Organization accounts to delegated admin account or invite member accounts by invite.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    email = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="organization_configuration_features" requirement="optional" type="map(object(…))">
<HclListItemDescription>

Map of organization configuration features to enable, where key is the feature name and value is feature configuration. See https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/guardduty_organization_configuration_feature

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    auto_enable = string
    additional_configuration = list(object({
      name        = string
      auto_enable = string
    }))
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="publish_findings_to_s3" requirement="optional" type="bool">
<HclListItemDescription>

Publish GuardDuty findings to an S3 bucket. The bucket arn and prefix are specified by findings_s3_bucket_arn and findings_s3_bucket_prefix.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
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
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.2/modules/guardduty/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.2/modules/guardduty/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.2/modules/guardduty/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "7ee6535a7bdef5eba3bc1fda01c177f0"
}
##DOCS-SOURCER-END -->
