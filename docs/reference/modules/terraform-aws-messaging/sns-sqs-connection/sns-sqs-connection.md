---
title: "Simple Notification Service (SNS) Topic to Simple Queuing Service (SQS) Connection Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/tree/main/modules/sns-sqs-connection" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Simple Notification Service (SNS) Topic to Simple Queuing Service (SQS) Connection Module

This module makes it easy to subscribe a SQS to a SNS topic after both have been successfully created.




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
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/modules/sns-sqs-connection/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/modules/sns-sqs-connection/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/modules/sns-sqs-connection/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "3c1e21b92fa3b88c4a442fa5023bce87"
}
##DOCS-SOURCER-END -->
