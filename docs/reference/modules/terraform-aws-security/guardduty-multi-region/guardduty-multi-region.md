---
title: "AWS GuardDuty Multi Region Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="0.75.6" lastModifiedVersion="0.74.0"/>

# AWS GuardDuty Multi Region Module

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.6/modules/guardduty-multi-region" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.74.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module wraps the [guardduty core module](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.6/modules/guardduty/README.adoc) to configure [AWS GuardDuty](https://aws.amazon.com/guardduty/) in all enabled regions for the AWS Account.

## Features

*   Uses the [guardduty module](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.6/modules/guardduty) to enable AWS GuardDuty across all regions (recommended best practice) on your AWS account

*   Continuously monitor your AWS account for malicious activity and unauthorized behavior

*   Analyze events across multiple AWS data sources, such as AWS CloudTrail, Amazon VPC Flow Logs, and DNS logs and use machine learning, anomaly detection, and integrated threat intelligence to identify and prioritize potential threats

*   Allows publishing threat findings to S3 and SNS topics through CloudWatch Events

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://docs.gruntwork.io/library/overview/)!

### Core concepts

*   Learn more about GuardDuty in the [guardduty core module](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.6/modules/guardduty/README.adoc).

*   [How to use a multi-region module](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.6/codegen/core-concepts.md#how-to-use-a-multi-region-module)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.6/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.

*   [codegen](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.6/codegen): Code generation utilities that help generate modules in this repo.

*   [examples](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.6/examples): This folder contains working examples of how to use the submodules.

*   [test](https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.6/test): Automated tests for the modules and examples.

## Deploy

Note

This module depends on Python being available on your system. Python 2.7, 3.5+ are supported.

*   ***Coming soon***. We have not yet added this module to the [Acme example Reference Architecture](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme).

*   [How to configure a production-grade AWS account structure](https://docs.gruntwork.io/guides/build-it-yourself/landing-zone)

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S GUARDDUTY-MULTI-REGION MODULE
# ------------------------------------------------------------------------------------------------------

module "guardduty_multi_region" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/guardduty-multi-region?ref=v0.75.6"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS Account ID the template should be operated on. This avoids
  # misconfiguration errors caused by environment variables.
  aws_account_id = <string>

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

  # Name of the Cloudwatch event rules.
  cloudwatch_event_rule_name = "guardduty-finding-events"

  # Create the GuardDuty Member Detector resource
  create_detector = true

  # Set to 'true' to create GuardDuty Organization Admin Account. Only usable in
  # Organizations primary account.
  create_organization_admin_account = false

  # The S3 bucket ARN under which the findings get exported.
  default_findings_s3_bucket_arn = null

  # The ARN of the KMS key used to encrypt GuardDuty findings. GuardDuty
  # enforces this to be encrypted. Only used if publish_findings_to_s3 is true.
  default_findings_s3_kms_key_arn = null

  # The ID of the default customer master key (CMK) to use to encrypt the SNS
  # topic for any region that isn't defined in var.sns_kms_master_key_ids. This
  # could be an AWS managed CMK (e.g., aws/sns) or customer managed CMK (e.g.,
  # alias/example-key). For example, you might set this variable to 'aws/sns' to
  # use the AWS managed CMK for encryption in all regions. Only used if
  # publish_findings_to_sns is true.
  default_sns_kms_master_key_id = null

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

  # If set to false, suspends GuardDuty (does not destroy data).
  enable = true

  # Specifies the frequency of notifications sent for subsequent finding
  # occurrences. If the detector is a GuardDuty member account, the value is
  # determined by the GuardDuty administrator account and cannot be modified,
  # otherwise defaults to SIX_HOURS. For standalone and GuardDuty administrator
  # accounts, it must be configured in Terraform to enable drift detection.
  # Valid values for standalone and administrator accounts: FIFTEEN_MINUTES,
  # ONE_HOUR, SIX_HOURS.
  finding_publishing_frequency = null

  # A map from AWS region to the ARN of an S3 bucket under which the findings
  # get exported. If there's no S3 bucket set for a region, the value in
  # var.default_findings_s3_bucket_arn will be used instead. Only used if
  # publish_findings_to_s3 is true.
  findings_s3_bucket_arns = {}

  # A map from AWS region to the ARN of a customer master key (CMK) to use to
  # encrypt GuardDuty findings in that region. If there's no ARN set for a
  # region, the value in var.default_findings_s3_kms_key_arn will be used
  # instead. Only used if publish_findings_to_s3 is true.
  findings_s3_kms_key_arns = {}

  # The bucket prefix without trailing '/' under which the findings get
  # exported. The prefix is optional and will be
  # AWSLogs/[Account-ID]/GuardDuty/[Region]/ if not provided.
  findings_s3_prefix = null

  # Specifies a name for the created SNS topics where findings are published.
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

  # Send GuardDuty findings to SNS topics specified by findings_sns_topic_name.
  publish_findings_to_sns = false

  # A map from AWS region to the ID of a customer master key (CMK) to use to
  # encrypt the SNS topic in that region. This could be an AWS managed CMK
  # (e.g., aws/sns) or customer managed CMK (e.g., alias/example-key). If
  # there's no CMK set for a region, the value in
  # var.default_sns_kms_master_key_id will be used instead. Only used if
  # publish_findings_to_sns is true.
  sns_kms_master_key_ids = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S GUARDDUTY-MULTI-REGION MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/guardduty-multi-region?ref=v0.75.6"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS Account ID the template should be operated on. This avoids
  # misconfiguration errors caused by environment variables.
  aws_account_id = <string>

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

  # Name of the Cloudwatch event rules.
  cloudwatch_event_rule_name = "guardduty-finding-events"

  # Create the GuardDuty Member Detector resource
  create_detector = true

  # Set to 'true' to create GuardDuty Organization Admin Account. Only usable in
  # Organizations primary account.
  create_organization_admin_account = false

  # The S3 bucket ARN under which the findings get exported.
  default_findings_s3_bucket_arn = null

  # The ARN of the KMS key used to encrypt GuardDuty findings. GuardDuty
  # enforces this to be encrypted. Only used if publish_findings_to_s3 is true.
  default_findings_s3_kms_key_arn = null

  # The ID of the default customer master key (CMK) to use to encrypt the SNS
  # topic for any region that isn't defined in var.sns_kms_master_key_ids. This
  # could be an AWS managed CMK (e.g., aws/sns) or customer managed CMK (e.g.,
  # alias/example-key). For example, you might set this variable to 'aws/sns' to
  # use the AWS managed CMK for encryption in all regions. Only used if
  # publish_findings_to_sns is true.
  default_sns_kms_master_key_id = null

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

  # If set to false, suspends GuardDuty (does not destroy data).
  enable = true

  # Specifies the frequency of notifications sent for subsequent finding
  # occurrences. If the detector is a GuardDuty member account, the value is
  # determined by the GuardDuty administrator account and cannot be modified,
  # otherwise defaults to SIX_HOURS. For standalone and GuardDuty administrator
  # accounts, it must be configured in Terraform to enable drift detection.
  # Valid values for standalone and administrator accounts: FIFTEEN_MINUTES,
  # ONE_HOUR, SIX_HOURS.
  finding_publishing_frequency = null

  # A map from AWS region to the ARN of an S3 bucket under which the findings
  # get exported. If there's no S3 bucket set for a region, the value in
  # var.default_findings_s3_bucket_arn will be used instead. Only used if
  # publish_findings_to_s3 is true.
  findings_s3_bucket_arns = {}

  # A map from AWS region to the ARN of a customer master key (CMK) to use to
  # encrypt GuardDuty findings in that region. If there's no ARN set for a
  # region, the value in var.default_findings_s3_kms_key_arn will be used
  # instead. Only used if publish_findings_to_s3 is true.
  findings_s3_kms_key_arns = {}

  # The bucket prefix without trailing '/' under which the findings get
  # exported. The prefix is optional and will be
  # AWSLogs/[Account-ID]/GuardDuty/[Region]/ if not provided.
  findings_s3_prefix = null

  # Specifies a name for the created SNS topics where findings are published.
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

  # Send GuardDuty findings to SNS topics specified by findings_sns_topic_name.
  publish_findings_to_sns = false

  # A map from AWS region to the ID of a customer master key (CMK) to use to
  # encrypt the SNS topic in that region. This could be an AWS managed CMK
  # (e.g., aws/sns) or customer managed CMK (e.g., alias/example-key). If
  # there's no CMK set for a region, the value in
  # var.default_sns_kms_master_key_id will be used instead. Only used if
  # publish_findings_to_sns is true.
  sns_kms_master_key_ids = {}

}


```

</TabItem>
</Tabs>




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

Name of the Cloudwatch event rules.

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

<HclListItem name="default_findings_s3_bucket_arn" requirement="optional" type="string">
<HclListItemDescription>

The S3 bucket ARN under which the findings get exported.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="default_findings_s3_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the KMS key used to encrypt GuardDuty findings. GuardDuty enforces this to be encrypted. Only used if publish_findings_to_s3 is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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

<HclListItem name="findings_s3_bucket_arns" requirement="optional" type="map(string)">
<HclListItemDescription>

A map from AWS region to the ARN of an S3 bucket under which the findings get exported. If there's no S3 bucket set for a region, the value in <a href="#default_findings_s3_bucket_arn"><code>default_findings_s3_bucket_arn</code></a> will be used instead. Only used if publish_findings_to_s3 is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="findings_s3_kms_key_arns" requirement="optional" type="map(string)">
<HclListItemDescription>

A map from AWS region to the ARN of a customer master key (CMK) to use to encrypt GuardDuty findings in that region. If there's no ARN set for a region, the value in <a href="#default_findings_s3_kms_key_arn"><code>default_findings_s3_kms_key_arn</code></a> will be used instead. Only used if publish_findings_to_s3 is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="findings_s3_prefix" requirement="optional" type="string">
<HclListItemDescription>

The bucket prefix without trailing '/' under which the findings get exported. The prefix is optional and will be AWSLogs/[Account-ID]/GuardDuty/[Region]/ if not provided.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="findings_sns_topic_name" requirement="optional" type="string">
<HclListItemDescription>

Specifies a name for the created SNS topics where findings are published. publish_findings_to_sns must be set to true.

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
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.6/modules/guardduty-multi-region/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.6/modules/guardduty-multi-region/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v0.75.6/modules/guardduty-multi-region/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "131507411cfed2edd7d3d81342e10ed1"
}
##DOCS-SOURCER-END -->
