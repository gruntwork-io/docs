---
title: "Log group for Lambda Edge"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Lambda" version="0.21.14" lastModifiedVersion="0.21.14"/>

# Log group for Lambda Edge

<a href="https://github.com/gruntwork-io/terraform-aws-lambda/tree/v0.21.14/modules/lambda-edge-log-group" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v0.21.14" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module creates a Cloudwatch log group to receive Lambda Edge function logs in one single AWS Region. This module is meant to be used as a building block for the [`lambda-edge-multi-region-log-groups` module](https://github.com/gruntwork-io/terraform-aws-lambda/tree/v0.21.14/modules/lambda-edge-multi-region-log-groups).

## Why are the resources in this module not created within the Lambda Edge Module?

Lambda@Edge automatically creates CloudWatch Logs log streams in the AWS Regions closest to the location where the function
receives traffic and is executed. For these resources to be under Terraform control, a log group must be created in every
region that have [Regional Edge Caches](https://aws.amazon.com/blogs/networking-and-content-delivery/aggregating-lambdaedge-logs/).

Unfortunately, it is not possible to use a `for_each` on provider blocks and there are multiple issues related to
using nested providers. That means that, currently, the only way to create multi-regional modules is by code generating each
block and passing down the providers. A full example of creating the providers and using this module can be found at the
[lambda-edge example](https://github.com/gruntwork-io/terraform-aws-lambda/tree/v0.21.14/examples/lambda-edge).

## Which regions have regional edge caches?

As of 22 Aug 2022, the list of regions with edge caches are:

```
US East (N. Virginia) – us-east-1

US East (Ohio) – us-east-2

US West (N. California) – us-west-1

US West (Oregon) – us-west-2

Asia Pacific (Mumbai) – ap-south-1

Asia Pacific (Seoul) – ap-northeast-2

Asia Pacific (Singapore) – ap-southeast-1

Asia Pacific (Sydney) – ap-southeast-2

Asia Pacific (Tokyo) – ap-northeast-1

Europe (Frankfurt) – eu-central-1

Europe (Ireland) – eu-west-1

Europe (London) – eu-west-2

South America (São Paulo) – sa-east-1
```

More information:

*   https://aws.amazon.com/blogs/networking-and-content-delivery/aggregating-lambdaedge-logs/
*   https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-cloudwatch-metrics-logging.html
*   https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-edge-permissions.html

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S LAMBDA-EDGE-LOG-GROUP MODULE
# ------------------------------------------------------------------------------------------------------

module "lambda_edge_log_group" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/lambda-edge-log-group?ref=v0.21.14"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the log group.
  name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for
  # encrypting log data.
  cloudwatch_log_group_kms_key_id = null

  # The number of days to retain log events in the log group. Refer to
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days
  # for all the valid values. When null, the log events are retained forever.
  cloudwatch_log_group_retention_in_days = null

  # The ARN of the destination to deliver matching log events to. Kinesis stream
  # or Lambda function ARN. Only applicable if
  # var.should_create_cloudwatch_log_group is true.
  cloudwatch_log_group_subscription_destination_arn = null

  # The method used to distribute log data to the destination. Only applicable
  # when var.cloudwatch_log_group_subscription_destination_arn is a kinesis
  # stream. Valid values are `Random` and `ByLogStream`.
  cloudwatch_log_group_subscription_distribution = null

  # A valid CloudWatch Logs filter pattern for subscribing to a filtered stream
  # of log events.
  cloudwatch_log_group_subscription_filter_pattern = ""

  # ARN of an IAM role that grants Amazon CloudWatch Logs permissions to deliver
  # ingested log events to the destination. Only applicable when
  # var.cloudwatch_log_group_subscription_destination_arn is a kinesis stream.
  cloudwatch_log_group_subscription_role_arn = null

  # Tags to apply on the CloudWatch Log Group, encoded as a map where the keys
  # are tag keys and values are tag values.
  cloudwatch_log_group_tags = {}

  # When true, precreate the CloudWatch Log Group to use for log aggregation
  # from the lambda function execution. This is useful if you wish to customize
  # the CloudWatch Log Group with various settings such as retention periods and
  # KMS encryption. When false, AWS Lambda will automatically create a basic log
  # group to use.
  should_create_cloudwatch_log_group = true

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S LAMBDA-EDGE-LOG-GROUP MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/lambda-edge-log-group?ref=v0.21.14"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the log group.
  name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for
  # encrypting log data.
  cloudwatch_log_group_kms_key_id = null

  # The number of days to retain log events in the log group. Refer to
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days
  # for all the valid values. When null, the log events are retained forever.
  cloudwatch_log_group_retention_in_days = null

  # The ARN of the destination to deliver matching log events to. Kinesis stream
  # or Lambda function ARN. Only applicable if
  # var.should_create_cloudwatch_log_group is true.
  cloudwatch_log_group_subscription_destination_arn = null

  # The method used to distribute log data to the destination. Only applicable
  # when var.cloudwatch_log_group_subscription_destination_arn is a kinesis
  # stream. Valid values are `Random` and `ByLogStream`.
  cloudwatch_log_group_subscription_distribution = null

  # A valid CloudWatch Logs filter pattern for subscribing to a filtered stream
  # of log events.
  cloudwatch_log_group_subscription_filter_pattern = ""

  # ARN of an IAM role that grants Amazon CloudWatch Logs permissions to deliver
  # ingested log events to the destination. Only applicable when
  # var.cloudwatch_log_group_subscription_destination_arn is a kinesis stream.
  cloudwatch_log_group_subscription_role_arn = null

  # Tags to apply on the CloudWatch Log Group, encoded as a map where the keys
  # are tag keys and values are tag values.
  cloudwatch_log_group_tags = {}

  # When true, precreate the CloudWatch Log Group to use for log aggregation
  # from the lambda function execution. This is useful if you wish to customize
  # the CloudWatch Log Group with various settings such as retention periods and
  # KMS encryption. When false, AWS Lambda will automatically create a basic log
  # group to use.
  should_create_cloudwatch_log_group = true

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

The name of the log group.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="cloudwatch_log_group_kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for encrypting log data.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_retention_in_days" requirement="optional" type="number">
<HclListItemDescription>

The number of days to retain log events in the log group. Refer to https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days for all the valid values. When null, the log events are retained forever.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_subscription_destination_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the destination to deliver matching log events to. Kinesis stream or Lambda function ARN. Only applicable if <a href="#should_create_cloudwatch_log_group"><code>should_create_cloudwatch_log_group</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_subscription_distribution" requirement="optional" type="string">
<HclListItemDescription>

The method used to distribute log data to the destination. Only applicable when <a href="#cloudwatch_log_group_subscription_destination_arn"><code>cloudwatch_log_group_subscription_destination_arn</code></a> is a kinesis stream. Valid values are `Random` and `ByLogStream`.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_subscription_filter_pattern" requirement="optional" type="string">
<HclListItemDescription>

A valid CloudWatch Logs filter pattern for subscribing to a filtered stream of log events.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_subscription_role_arn" requirement="optional" type="string">
<HclListItemDescription>

ARN of an IAM role that grants Amazon CloudWatch Logs permissions to deliver ingested log events to the destination. Only applicable when <a href="#cloudwatch_log_group_subscription_destination_arn"><code>cloudwatch_log_group_subscription_destination_arn</code></a> is a kinesis stream.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags to apply on the CloudWatch Log Group, encoded as a map where the keys are tag keys and values are tag values.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="should_create_cloudwatch_log_group" requirement="optional" type="bool">
<HclListItemDescription>

When true, precreate the CloudWatch Log Group to use for log aggregation from the lambda function execution. This is useful if you wish to customize the CloudWatch Log Group with various settings such as retention periods and KMS encryption. When false, AWS Lambda will automatically create a basic log group to use.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="log_group_name">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v0.21.14/modules/lambda-edge-log-group/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v0.21.14/modules/lambda-edge-log-group/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v0.21.14/modules/lambda-edge-log-group/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "d2f71fbe950f81bd3383367c453d0410"
}
##DOCS-SOURCER-END -->
