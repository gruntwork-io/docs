---
title: "Simple Queuing Service (SQS) To Lambda Connection Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Messaging" version="1.0.3" lastModifiedVersion="0.13.0"/>

# Simple Queuing Service (SQS) To Lambda Connection Module

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/tree/v1.0.3/modules/sqs-lambda-connection" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.13.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module wraps the basics for using SQS to trigger a Lambda for processing

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S SQS-LAMBDA-CONNECTION MODULE
# ------------------------------------------------------------------------------------------------------

module "sqs_lambda_connection" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/sqs-lambda-connection?ref=v1.0.3"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The arn of the lambda.
  lambda_arn = <string>

  # The arn of the queue.
  sqs_arn = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The largest number of records that Lambda will retrieve from your event
  # source at the time of invocation. Defaults to 10 for SQS
  batch_size = 10

  # The maximum amount of time to gather records before invoking the function,
  # in seconds (between 0 and 300). Only available for stream sources (DynamoDB
  # and Kinesis) and SQS standard queues.
  maximum_batching_window_in_seconds = null

  # Limits the number of concurrent instances that the Amazon SQS event source
  # can invoke. Must be greater than or equal to 2.
  maximum_concurrency = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S SQS-LAMBDA-CONNECTION MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/sqs-lambda-connection?ref=v1.0.3"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The arn of the lambda.
  lambda_arn = <string>

  # The arn of the queue.
  sqs_arn = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The largest number of records that Lambda will retrieve from your event
  # source at the time of invocation. Defaults to 10 for SQS
  batch_size = 10

  # The maximum amount of time to gather records before invoking the function,
  # in seconds (between 0 and 300). Only available for stream sources (DynamoDB
  # and Kinesis) and SQS standard queues.
  maximum_batching_window_in_seconds = null

  # Limits the number of concurrent instances that the Amazon SQS event source
  # can invoke. Must be greater than or equal to 2.
  maximum_concurrency = null

}


```

</TabItem>
</Tabs>




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

<HclListItem name="maximum_batching_window_in_seconds" requirement="optional" type="number">
<HclListItemDescription>

The maximum amount of time to gather records before invoking the function, in seconds (between 0 and 300). Only available for stream sources (DynamoDB and Kinesis) and SQS standard queues.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="maximum_concurrency" requirement="optional" type="number">
<HclListItemDescription>

Limits the number of concurrent instances that the Amazon SQS event source can invoke. Must be greater than or equal to 2.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v1.0.3/modules/sqs-lambda-connection/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v1.0.3/modules/sqs-lambda-connection/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v1.0.3/modules/sqs-lambda-connection/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "df1f8a40ff1c657006114f7b7c0a1078"
}
##DOCS-SOURCER-END -->
