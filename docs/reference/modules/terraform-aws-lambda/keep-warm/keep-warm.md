---
title: "Keep Warm Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Lambda" version="1.1.0" lastModifiedVersion="1.1.0"/>

# Keep Warm Module

<a href="https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.1.0/modules/keep-warm" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v1.1.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This is a Lambda function you can use to invoke your other Lambda functions on a scheduled basis to keep those
functions "warm." This is necessary for Lambda functions that require a low response time (e.g., if you're using Lambda API Gateway as a web service), as Lambda functions that have not been executed in a while will be shut down (that is,
the underlying Docker container will be stopped), and the next time that function is executed, you will be faced with
the overhead of starting the function again. This is known as a "cold start" and the overhead can be from a few hundred
milliseconds all the way up to 15 seconds (the latter is mostly for cold start in a VPC). For more info on cold starts,
see:

*   [I’m afraid you’re thinking about AWS Lambda cold starts all wrong](https://hackernoon.com/im-afraid-you-re-thinking-about-aws-lambda-cold-starts-all-wrong-7d907f278a4f)
*   [Resolving Cold Start️ in AWS Lambda](https://medium.com/@lakshmanLD/resolving-cold-start%EF%B8%8F-in-aws-lambda-804512ca9b61)
*   [API Gateway & Lambda & VPC performance](https://www.robertvojta.com/aws-journey-api-gateway-lambda-vpc-performance/)

## Concurrency

An important idea to understand is that a cold start happens once for each *concurrent execution* of your function. If
the same function is executed more than once at roughly the same time, then each of those executions will happen in
a separate Docker container. If this is the first time executing that container in a long time, it will be subject to
a cold start.

Therefore, if your Lambda functions may be executed concurrently, you will need to use the `concurrency` parameter in
this module to tell it to execute your function concurrently and keep multiple containers warm at the same time. For
example, if your Lambda function is idle most of the time, but periodically, traffic spikes and you need to support 5
simultaneous executions of it, you should set `concurrency = 5` in the `keep-warm` module.

## How often should you run this function?

AWS is making rapid changes to Lambda, so it's hard to say exactly how long the underlying Docker containers will be
kept around, but as of May, 2018, it seems that Lambda functions that are inactive for 10 - 15 minutes get shut down.
Therefore, you should probably run the `keep-warm` function every 5-10 minutes, with the appropriate [concurrency
level](#concurrency) for your functions.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S KEEP-WARM MODULE
# ------------------------------------------------------------------------------------------------------

module "keep_warm" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/keep-warm?ref=v1.1.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A map where the keys are the ARNs of Lambda functions to invoke (to keep
  # them warm) and the values are the event objects to send to those functions
  # when invoking them.
  function_to_event_map = <any>

  # The name for this Lambda function. Also used to namespace the other
  # resources created by this module.
  name = <string>

  # An expression that defines how often to invoke the functions in
  # var.function_to_event_map. For example, cron(0 20 * * ? *) or rate(5
  # minutes).
  schedule_expression = <string>

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

  # Tags to apply on the CloudWatch Log Group, encoded as a map where the keys
  # are tag keys and values are tag values.
  cloudwatch_log_group_tags = null

  # How many concurrent requests to send to each Lambda function in
  # var.function_to_event_map. With Lambda, each concurrent requests to the same
  # function spins up a new container that must be kept warm, so you'll want to
  # set this number to roughly the expected concurrency you see in real-world
  # usage.
  concurrency = 1

  # When true, precreate the CloudWatch Log Group to use for log aggregation
  # from the lambda function execution. This is useful if you wish to customize
  # the CloudWatch Log Group with various settings such as retention periods and
  # KMS encryption. When false, AWS Lambda will automatically create a basic log
  # group to use.
  should_create_cloudwatch_log_group = true

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S KEEP-WARM MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/keep-warm?ref=v1.1.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A map where the keys are the ARNs of Lambda functions to invoke (to keep
  # them warm) and the values are the event objects to send to those functions
  # when invoking them.
  function_to_event_map = <any>

  # The name for this Lambda function. Also used to namespace the other
  # resources created by this module.
  name = <string>

  # An expression that defines how often to invoke the functions in
  # var.function_to_event_map. For example, cron(0 20 * * ? *) or rate(5
  # minutes).
  schedule_expression = <string>

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

  # Tags to apply on the CloudWatch Log Group, encoded as a map where the keys
  # are tag keys and values are tag values.
  cloudwatch_log_group_tags = null

  # How many concurrent requests to send to each Lambda function in
  # var.function_to_event_map. With Lambda, each concurrent requests to the same
  # function spins up a new container that must be kept warm, so you'll want to
  # set this number to roughly the expected concurrency you see in real-world
  # usage.
  concurrency = 1

  # When true, precreate the CloudWatch Log Group to use for log aggregation
  # from the lambda function execution. This is useful if you wish to customize
  # the CloudWatch Log Group with various settings such as retention periods and
  # KMS encryption. When false, AWS Lambda will automatically create a basic log
  # group to use.
  should_create_cloudwatch_log_group = true

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="function_to_event_map" requirement="required" type="any">
<HclListItemDescription>

A map where the keys are the ARNs of Lambda functions to invoke (to keep them warm) and the values are the event objects to send to those functions when invoking them.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = {
     "arn:aws:lambda:us-east-1:123456789011:function:my-function-foo" = {}
  
     "arn:aws:lambda:us-east-1:123456789011:function:my-function-bar" = {
        foo  = "bar"
        blah = 12345
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name for this Lambda function. Also used to namespace the other resources created by this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="schedule_expression" requirement="required" type="string">
<HclListItemDescription>

An expression that defines how often to invoke the functions in <a href="#function_to_event_map"><code>function_to_event_map</code></a>. For example, cron(0 20 * * ? *) or rate(5 minutes).

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

<HclListItem name="cloudwatch_log_group_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags to apply on the CloudWatch Log Group, encoded as a map where the keys are tag keys and values are tag values.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="concurrency" requirement="optional" type="number">
<HclListItemDescription>

How many concurrent requests to send to each Lambda function in <a href="#function_to_event_map"><code>function_to_event_map</code></a>. With Lambda, each concurrent requests to the same function spins up a new container that must be kept warm, so you'll want to set this number to roughly the expected concurrency you see in real-world usage.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="should_create_cloudwatch_log_group" requirement="optional" type="bool">
<HclListItemDescription>

When true, precreate the CloudWatch Log Group to use for log aggregation from the lambda function execution. This is useful if you wish to customize the CloudWatch Log Group with various settings such as retention periods and KMS encryption. When false, AWS Lambda will automatically create a basic log group to use.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="use_managed_iam_policies" requirement="optional" type="bool">
<HclListItemDescription>

When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="function_arn">
</HclListItem>

<HclListItem name="function_name">
</HclListItem>

<HclListItem name="iam_role_arn">
</HclListItem>

<HclListItem name="iam_role_id">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.1.0/modules/keep-warm/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.1.0/modules/keep-warm/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.1.0/modules/keep-warm/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "780003915677dcf18f001a3d2c43107f"
}
##DOCS-SOURCER-END -->
