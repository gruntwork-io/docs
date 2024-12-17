---
title: "Simple Notification Service (SNS) Topic to Simple Queuing Service (SQS) Connection Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Messaging" version="0.12.5" lastModifiedVersion="0.12.4"/>

# Simple Notification Service (SNS) Topic to Simple Queuing Service (SQS) Connection Module

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/tree/v0.12.5/modules/sns-sqs-connection" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.12.4" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module makes it easy to subscribe a SQS to a SNS topic after both have been successfully created.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S SNS-SQS-CONNECTION MODULE
# ------------------------------------------------------------------------------------------------------

module "sns_sqs_connection" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/sns-sqs-connection?ref=v0.12.5"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The arn of the topic to subscribe to.
  sns_topic_arn = <string>

  # The queue arn for the Simple Queue Service (SQS).
  sqs_arn = <string>

  # The queue URL for the Simple Queue Service (SQS).
  sqs_queue_url = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # (Optional) JSON String with the filter policy that will be used in the
  # subscription to filter messages seen by the target resource. Refer to the
  # SNS docs for more details
  # https://docs.aws.amazon.com/sns/latest/dg/sns-message-filtering.html.
  filter_policy = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S SNS-SQS-CONNECTION MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/sns-sqs-connection?ref=v0.12.5"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The arn of the topic to subscribe to.
  sns_topic_arn = <string>

  # The queue arn for the Simple Queue Service (SQS).
  sqs_arn = <string>

  # The queue URL for the Simple Queue Service (SQS).
  sqs_queue_url = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # (Optional) JSON String with the filter policy that will be used in the
  # subscription to filter messages seen by the target resource. Refer to the
  # SNS docs for more details
  # https://docs.aws.amazon.com/sns/latest/dg/sns-message-filtering.html.
  filter_policy = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="sns_topic_arn" requirement="required" type="string">
<HclListItemDescription>

The arn of the topic to subscribe to.

</HclListItemDescription>
</HclListItem>

<HclListItem name="sqs_arn" requirement="required" type="string">
<HclListItemDescription>

The queue arn for the Simple Queue Service (SQS).

</HclListItemDescription>
</HclListItem>

<HclListItem name="sqs_queue_url" requirement="required" type="string">
<HclListItemDescription>

The queue URL for the Simple Queue Service (SQS).

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="filter_policy" requirement="optional" type="string">
<HclListItemDescription>

(Optional) JSON String with the filter policy that will be used in the subscription to filter messages seen by the target resource. Refer to the SNS docs for more details https://docs.aws.amazon.com/sns/latest/dg/sns-message-filtering.html.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="subscription_arn">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v0.12.5/modules/sns-sqs-connection/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v0.12.5/modules/sns-sqs-connection/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v0.12.5/modules/sns-sqs-connection/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "60234a1df294b7ba174dde46eb0e8caa"
}
##DOCS-SOURCER-END -->
