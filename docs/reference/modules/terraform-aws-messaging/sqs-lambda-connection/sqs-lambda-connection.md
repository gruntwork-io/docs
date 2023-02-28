---
title: "Simple Queuing Service (SQS) To Lambda Connection Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/tree/main/modules/sqs-lambda-connection" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Simple Queuing Service (SQS) To Lambda Connection Module

This module wraps the basics for using SQS to trigger a Lambda for processing




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="lambda_arn" requirement="required" type="string">
<HclListItemDescription>

The arn of the lambda.

</HclListItemDescription>
</HclListItem>

<HclListItem name="sqs_arn" requirement="required" type="string">
<HclListItemDescription>

The arn of the queue.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="batch_size" requirement="optional" type="number">
<HclListItemDescription>

The largest number of records that Lambda will retrieve from your event source at the time of invocation. Defaults to 10 for SQS

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="10"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="function_arn">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/modules/sqs-lambda-connection/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/modules/sqs-lambda-connection/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/modules/sqs-lambda-connection/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "9d272756a3db782121777d168a0a2b95"
}
##DOCS-SOURCER-END -->
