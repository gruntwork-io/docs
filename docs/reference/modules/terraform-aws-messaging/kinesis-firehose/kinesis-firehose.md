---
title: "Kinesis Firehose Delivery Stream Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Messaging" version="1.0.3" lastModifiedVersion="1.0.3"/>

# Kinesis Firehose Delivery Stream Module

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/tree/v1.0.3/modules/kinesis-firehose" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v1.0.3" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module creates
an [Amazon Kinesis Data Firehose](https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html).

## Destination to Amazon S3

This module currently only supports a fully managed service for delivering real-time streaming data to Amazon S3 and
also deployed lambda for data transformation. Use the `var.s3_bucket_arn` to specify the s3 destination path and
the `var.kinesis_stream_arn` to specify the kinesis data stream, we also have a Map variable
`var.processing_configurations` which provides a way to configure the attributes for data transformation.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S KINESIS-FIREHOSE MODULE
# ------------------------------------------------------------------------------------------------------

module "kinesis_firehose" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/kinesis-firehose?ref=v1.0.3"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the Kinesis Data Firehose.
  name = <string>

  # The ARN of the S3 bucket you want to export the data to.
  s3_bucket_arn = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Set to true to use a Kinesis Data Stream as the source for the Firehose.
  # When true, kinesis_stream_arn must also be provided. When false, the
  # Firehose will use Direct PUT as the source. This variable is needed because
  # kinesis_stream_arn may come from a resource that isn't created yet, and
  # Terraform needs to know at plan time whether to create the kinesis source
  # configuration.
  enable_kinesis_source = false

  # The processing configuration for the Kinesis Data Firehose.
  extended_s3_processors = []

  # The ARN of the kinesis data stream. Must be set when enable_kinesis_source
  # is true.
  kinesis_stream_arn = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S KINESIS-FIREHOSE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/kinesis-firehose?ref=v1.0.3"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the Kinesis Data Firehose.
  name = <string>

  # The ARN of the S3 bucket you want to export the data to.
  s3_bucket_arn = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Set to true to use a Kinesis Data Stream as the source for the Firehose.
  # When true, kinesis_stream_arn must also be provided. When false, the
  # Firehose will use Direct PUT as the source. This variable is needed because
  # kinesis_stream_arn may come from a resource that isn't created yet, and
  # Terraform needs to know at plan time whether to create the kinesis source
  # configuration.
  enable_kinesis_source = false

  # The processing configuration for the Kinesis Data Firehose.
  extended_s3_processors = []

  # The ARN of the kinesis data stream. Must be set when enable_kinesis_source
  # is true.
  kinesis_stream_arn = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

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

<HclListItem name="enable_kinesis_source" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to use a Kinesis Data Stream as the source for the Firehose. When true, kinesis_stream_arn must also be provided. When false, the Firehose will use Direct PUT as the source. This variable is needed because kinesis_stream_arn may come from a resource that isn't created yet, and Terraform needs to know at plan time whether to create the kinesis source configuration.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="extended_s3_processors" requirement="optional" type="list(object(…))">
<HclListItemDescription>

The processing configuration for the Kinesis Data Firehose.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    type = string
    parameters = list(object({
      parameter_name  = string
      parameter_value = string
    }))
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="kinesis_stream_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the kinesis data stream. Must be set when enable_kinesis_source is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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

<HclListItem name="kinesis_firehose_role_arn">
<HclListItemDescription>

ARN of the role for Kinesis Firehose

</HclListItemDescription>
</HclListItem>

<HclListItem name="kinesis_firehose_role_name">
<HclListItemDescription>

Name of the role for Kinesis Firehose

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v1.0.3/modules/kinesis-firehose/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v1.0.3/modules/kinesis-firehose/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v1.0.3/modules/kinesis-firehose/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "be90673f4a06c106ae6392ce58e39820"
}
##DOCS-SOURCER-END -->
