---
title: "Simple Notification Service (SNS) Topic to Simple Queuing Service (SQS) Connection Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Messaging" version="0.10.1" lastModifiedVersion="0.9.0"/>

# Simple Notification Service (SNS) Topic to Simple Queuing Service (SQS) Connection Module

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/tree/main/modules/sns-sqs-connection" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.9.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module makes it easy to subscribe a SQS to a SNS topic after both have been successfully created.

## Sample Usage

<ModuleUsage>

```hcl title="main.tf"

# ---------------------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S SNS-SQS-CONNECTION MODULE
# ---------------------------------------------------------------------------------------------------------------------

module "sns-sqs-connection" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/sns-sqs-connection?ref=v0.10.1"

  # ---------------------------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ---------------------------------------------------------------------------------------------------------------------

  # The arn of the topic to subscribe to.
  sns_topic_arn = <INPUT REQUIRED>

  # The queue arn for the Simple Queue Service (SQS).
  sqs_arn = <INPUT REQUIRED>

  # The queue URL for the Simple Queue Service (SQS).
  sqs_queue_url = <INPUT REQUIRED>

}

```

</ModuleUsage>




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

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="subscription_arn">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/main/modules/sns-sqs-connection/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/main/modules/sns-sqs-connection/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/main/modules/sns-sqs-connection/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "4e21a3002f63bba488433b515a61e804"
}
##DOCS-SOURCER-END -->
