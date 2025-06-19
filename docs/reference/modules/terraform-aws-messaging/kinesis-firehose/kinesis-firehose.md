---
title: "Kinesis Firehose Delivery Stream Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Messaging" version="1.0.0" lastModifiedVersion="0.13.0"/>

# Kinesis Firehose Delivery Stream Module

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/tree/v1.0.0/modules/kinesis-firehose" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.13.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

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

  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/kinesis-firehose?ref=v1.0.0"

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

  # The processing configuration for the Kinesis Data Firehose.
  extended_s3_processors = []

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S KINESIS-FIREHOSE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/kinesis-firehose?ref=v1.0.0"
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

  # The processing configuration for the Kinesis Data Firehose.
  extended_s3_processors = []

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
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v1.0.0/modules/kinesis-firehose/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v1.0.0/modules/kinesis-firehose/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v1.0.0/modules/kinesis-firehose/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "330e2064a58c419a940c3a29367c2e60"
}
##DOCS-SOURCER-END -->
