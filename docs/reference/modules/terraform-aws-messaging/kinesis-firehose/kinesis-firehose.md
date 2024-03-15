---
title: "Kinesis Firehose Delivery Stream Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Messaging" version="0.12.5" lastModifiedVersion="0.12.4"/>

# Kinesis Firehose Delivery Stream Module

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/tree/v0.12.5/modules/kinesis-firehose" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.12.4" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module creates
an [Amazon Kinesis Data Firehose](https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html).

## Destination to Amazon S3

This module currently only supports a fully managed service for delivering real-time streaming data to Amazon S3 and also deployed lambda for data transformation. Use
the `var.s3_bucket_arn` to specify the s3 destination path and the `var.kinesis_stream_arn` to specify the kinesis data
stream, we also have a Map variable `var.lambda_function_attributes`which provides a way to configure the attributes for data transformation lambda.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S KINESIS-FIREHOSE MODULE
# ------------------------------------------------------------------------------------------------------

module "kinesis_firehose" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/kinesis-firehose?ref=v0.12.5"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ARN of the kinesis data stream.
  kinesis_stream_arn = <string>

  # The name of the Kinesis Data Firehose.
  name = <string>

  # The ARN of the S3 bucket you want to export the data to.
  s3_bucket_arn = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # All required lambda function attributes.
  lambda_processing_attributes = {"lambda_function_directory":" ","lambda_function_handler":"lambda-function.lambda_handler","lambda_function_name":"data-transformation-lambda","lambda_function_runtime":"python3.8"}

  # To enable lambda processing of messages from Kinesis
  use_lambda_processing = false

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S KINESIS-FIREHOSE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/kinesis-firehose?ref=v0.12.5"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ARN of the kinesis data stream.
  kinesis_stream_arn = <string>

  # The name of the Kinesis Data Firehose.
  name = <string>

  # The ARN of the S3 bucket you want to export the data to.
  s3_bucket_arn = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # All required lambda function attributes.
  lambda_processing_attributes = {"lambda_function_directory":" ","lambda_function_handler":"lambda-function.lambda_handler","lambda_function_name":"data-transformation-lambda","lambda_function_runtime":"python3.8"}

  # To enable lambda processing of messages from Kinesis
  use_lambda_processing = false

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="kinesis_stream_arn" requirement="required" type="string">
<HclListItemDescription>

The ARN of the kinesis data stream.

</HclListItemDescription>
</HclListItem>

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name of the Kinesis Data Firehose.

</HclListItemDescription>
</HclListItem>

<HclListItem name="s3_bucket_arn" requirement="required" type="string">
<HclListItemDescription>

The ARN of the S3 bucket you want to export the data to.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="lambda_processing_attributes" requirement="optional" type="object(…)">
<HclListItemDescription>

All required lambda function attributes.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    lambda_function_name     = string
    lambda_function_handler  = string
    lambda_function_runtime  = string
    lambda_function_directory = string
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
{
  lambda_function_directory = " ",
  lambda_function_handler = "lambda-function.lambda_handler",
  lambda_function_name = "data-transformation-lambda",
  lambda_function_runtime = "python3.8"
}
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="use_lambda_processing" requirement="optional" type="bool">
<HclListItemDescription>

To enable lambda processing of messages from Kinesis

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="kinesis_firehose_arn">
<HclListItemDescription>

ARN of the Kinesis Firehose delivery stream.

</HclListItemDescription>
</HclListItem>

<HclListItem name="kinesis_firehose_name">
<HclListItemDescription>

Name of the Kinesis Firehose delivery stream.

</HclListItemDescription>
</HclListItem>

<HclListItem name="lambda_processing_arn">
<HclListItemDescription>

ARN of the lambda processing function

</HclListItemDescription>
</HclListItem>

<HclListItem name="lambda_processing_function_name">
<HclListItemDescription>

Name of lambda processing function

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v0.12.5/modules/kinesis-firehose/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v0.12.5/modules/kinesis-firehose/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v0.12.5/modules/kinesis-firehose/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "b76102de8a9a29d63711e75e52d32150"
}
##DOCS-SOURCER-END -->
