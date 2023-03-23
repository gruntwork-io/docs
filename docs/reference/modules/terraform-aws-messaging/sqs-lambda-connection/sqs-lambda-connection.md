---
title: "Simple Queuing Service (SQS) To Lambda Connection Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Messaging" version="0.10.1" lastModifiedVersion="0.9.0"/>

# Simple Queuing Service (SQS) To Lambda Connection Module

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/tree/main/modules/sqs-lambda-connection" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.9.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module wraps the basics for using SQS to trigger a Lambda for processing

## Sample Usage

<ModuleUsage>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S SQS-LAMBDA-CONNECTION MODULE
# ------------------------------------------------------------------------------------------------------

module "sqs_lambda_connection" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/sqs-lambda-connection?ref=v0.10.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The arn of the lambda.
  lambda_arn = <INPUT REQUIRED>

  # The arn of the queue.
  sqs_arn = <INPUT REQUIRED>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The largest number of records that Lambda will retrieve from your event source
  # at the time of invocation. Defaults to 10 for SQS
  batch_size = 10

}

```

</ModuleUsage>




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
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/main/modules/sqs-lambda-connection/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/main/modules/sqs-lambda-connection/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/main/modules/sqs-lambda-connection/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "105d4856d9f4cb403c6dd73c0b068b6c"
}
##DOCS-SOURCER-END -->
