---
title: "Lambda@Edge Function Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Lambda" version="1.0.0" lastModifiedVersion="1.0.0"/>

# Lambda@Edge Function Module

<a href="https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.0.0/modules/lambda-edge" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v1.0.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module makes it easy to deploy and manage an [AWS Lambda@Edge](https://aws.amazon.com/lambda/edge/) function.
Lambda@Edge gives you a way to run code on-demand in AWS Edge locations without having to manage servers.

Lambda@Edge has the following limitations compared to regular Lambda (see
[the CloudFront Developer Guide](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-requirements-limits.html)
for the full details):

*   The functions must not have any environment variables.
*   The execution timeout must not be higher than 30 seconds.
*   The function must be versioned in order to be a target for Cloudfront events.
*   The function must be deployed in the `us-east-1` region.
*   The function runtime must be one of:
    *   `nodejs18.x` or newer
    *   `python3.9` or newer

## What is AWS Lambda?

[AWS Lambda](https://aws.amazon.com/lambda/) lets you run code without provisioning or managing servers. You define a
function in a supported language (currently: Python, JavaScript, Java, and C#), upload the code to Lambda, specify how
that function can be triggered, and then AWS Lambda takes care of all the details of deploying and scaling the
infrastructure to run that code.

## How do you add additional IAM policies and permissions?

By default, the `lambda-edge` module configures your lambda function with an IAM role that allows it to write logs to
CloudWatch Logs. The ID of the IAM role is exported as the output `iam_role_id` and the ID of the lambda function is
exported as the output `function_arn`, so you can add custom rules using the `aws_iam_role_policy` or
`aws_lambda_permission` resources, respectively. For example, to allow your lambda function to be triggered by SNS:

```hcl
module "my_lambda_function" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/lambda-edge?ref=v1.0.8"
  # (params omitted)
}

resource "aws_lambda_permission" "with_sns" {
  statement_id = "AllowExecutionFromSNS"
  action = "lambda:InvokeFunction"
  function_name = "${module.my_lambda_function.function_arn}"
  principal = "sns.amazonaws.com"
  source_arn = "${aws_sns_topic.default.arn}"
}
```

## How to get the logs of your function

Lambda@Edge stores CloudWatch Logs in the AWS Regions closest to the location where the function receives traffic and is
executed. That means a log group must be created in every region that have [Regional Edge Caches](https://aws.amazon.com/blogs/networking-and-content-delivery/aggregating-lambdaedge-logs/).
Instructions on how to do this can be found at the   [`lambda-edge-multi-region-log-groups` module](https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.0.0/modules/lambda-edge-multi-region-log-groups). To see which regions are receiving traffic, you can find graphs of metrics for the
function on the CloudFront console and choose your region there.

## How to trigger this Lambda function from Cloudfront

This module deploys the Lambda function but doesn't create any CloudFront trigger. There are two ways to create those
triggers:

1.  Using terraform. To link the Lambda@Edge function to the [s3-cloudfront module from
    terraform-aws-static-assets](https://github.com/gruntwork-io/terraform-aws-static-assets/tree/main/modules/s3-cloudfront),
    you can use the
    [default_lambda_associations](https://github.com/gruntwork-io/terraform-aws-static-assets/blob/main/modules/s3-cloudfront/variables.tf#L308)
    input variable.
2.  Manually from the AWS Console as described in the
    [Lambda@Edge documentation](https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html#lambda-edge-add-triggers)

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S LAMBDA-EDGE MODULE
# ------------------------------------------------------------------------------------------------------

module "lambda_edge" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/lambda-edge?ref=v1.0.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The function entrypoint in your code. This is typically the name of a
  # function or method in your code that AWS will execute when this Lambda
  # function is triggered.
  handler = <string>

  # The maximum amount of memory, in MB, your Lambda function will be able to
  # use at runtime. Can be set in 64MB increments from 128MB up to 1536MB. Note
  # that the amount of CPU power given to a Lambda function is proportional to
  # the amount of memory you request, so a Lambda function with 256MB of memory
  # has twice as much CPU power as one with 128MB.
  memory_size = <number>

  # The name of the Lambda function. Used to namespace all resources created by
  # this module.
  name = <string>

  # The maximum amount of time, in seconds, your Lambda function will be allowed
  # to run. Must be between 1 and 30 seconds.
  timeout = <number>

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
  # or Lambda function ARN. Only applicable if var.log_regions is not empty.
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

  # The ARN of an SNS topic or an SQS queue to notify when invocation of a
  # Lambda function fails. If this option is used, you must grant this
  # function's IAM role (the ID is outputted as iam_role_id) access to write to
  # the target object, which means allowing either the sns:Publish or
  # sqs:SendMessage action on this ARN, depending on which service is targeted.
  dead_letter_target_arn = null

  # A description of what the Lambda function does.
  description = null

  # Set to true to enable versioning for this Lambda function. This allows you
  # to use aliases to refer to execute different versions of the function in
  # different environments. Note that an alternative way to run Lambda functions
  # in multiple environments is to version your Terraform code. Only versioned
  # lambdas can be the target of a CloudFront event trigger.
  enable_versioning = true

  # A custom KMS key to use to encrypt and decrypt Lambda function environment
  # variables. Leave it blank to use the default KMS key provided in your AWS
  # account.
  kms_key_arn = null

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role for the Lambda function.
  lambda_role_permissions_boundary_arn = null

  # Regions in which to create log groups. If you completely disable one of
  # these regions in your AWS account, you can not pass them here, but their
  # respective providers still need to be passed to the lambda-edge module. The
  # default is set to all regions that have a Regional Edge Cache.
  log_regions = ["us-east-1","us-east-2","us-west-1","us-west-2","ap-south-1","ap-northeast-2","ap-southeast-1","ap-southeast-2","ap-northeast-1","eu-central-1","eu-west-1","eu-west-2","sa-east-1"]

  # The amount of reserved concurrent executions for this lambda function or -1
  # if unreserved.
  reserved_concurrent_executions = null

  # The runtime environment for the Lambda function (e.g. nodejs, python3.9,
  # java8). See
  # https://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html#SSS-CreateFunction-request-Runtime
  # for all possible values. Currently Lambda@Edge supports only nodejs18.x and
  # python3.9.
  runtime = "nodejs18.x"

  # An S3 bucket location containing the function's deployment package. Exactly
  # one of var.source_path or the var.s3_xxx variables must be specified.
  s3_bucket = null

  # The path within var.s3_bucket where the deployment package is located.
  # Exactly one of var.source_path or the var.s3_xxx variables must be
  # specified.
  s3_key = null

  # The version of the path in var.s3_key to use as the deployment package.
  # Exactly one of var.source_path or the var.s3_xxx variables must be
  # specified.
  s3_object_version = null

  # If set to false, this function will no longer set the source_code_hash
  # parameter, so this module will no longer detect and upload changes to the
  # deployment package. This is primarily useful if you update the Lambda
  # function from outside of this module (e.g., you have scripts that do it
  # separately) and want to avoid a plan diff. Used only if var.source_path is
  # non-empty.
  set_source_code_hash = true

  # (Optional) Set to true if you do not wish the log group to be deleted at
  # destroy time, and instead just remove the log group from the Terraform
  # state. Defaults to `false`.
  skip_destroy = false

  # Set to true to skip zip archive creation and assume that var.source_path
  # points to a pregenerated zip archive.
  skip_zip = false

  # The path to the directory that contains your Lambda function source code.
  # This code will be zipped up and uploaded to Lambda as your deployment
  # package. If var.skip_zip is set to true, then this is assumed to be the path
  # to an already-zipped file, and it will be uploaded directly to Lambda as a
  # deployment package. Exactly one of var.source_path or the var.s3_xxx
  # variables must be specified.
  source_path = null

  # A map of tags to apply to the Lambda function.
  tags = {}

  # Whether to sample and trace a subset of incoming requests with AWS X-Ray.
  # Valid values are PassThrough and Active.
  tracing_config_mode = null

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

  # Files in var.source_path to ignore when zipping the directory in addition to
  # .terragrunt-source-manifest.
  zip_exclude_files = []

  # The path to store the output zip file of your source code. If empty,
  # defaults to module path. This should be the full path to the zip file, not a
  # directory.
  zip_output_path = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S LAMBDA-EDGE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/lambda-edge?ref=v1.0.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The function entrypoint in your code. This is typically the name of a
  # function or method in your code that AWS will execute when this Lambda
  # function is triggered.
  handler = <string>

  # The maximum amount of memory, in MB, your Lambda function will be able to
  # use at runtime. Can be set in 64MB increments from 128MB up to 1536MB. Note
  # that the amount of CPU power given to a Lambda function is proportional to
  # the amount of memory you request, so a Lambda function with 256MB of memory
  # has twice as much CPU power as one with 128MB.
  memory_size = <number>

  # The name of the Lambda function. Used to namespace all resources created by
  # this module.
  name = <string>

  # The maximum amount of time, in seconds, your Lambda function will be allowed
  # to run. Must be between 1 and 30 seconds.
  timeout = <number>

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
  # or Lambda function ARN. Only applicable if var.log_regions is not empty.
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

  # The ARN of an SNS topic or an SQS queue to notify when invocation of a
  # Lambda function fails. If this option is used, you must grant this
  # function's IAM role (the ID is outputted as iam_role_id) access to write to
  # the target object, which means allowing either the sns:Publish or
  # sqs:SendMessage action on this ARN, depending on which service is targeted.
  dead_letter_target_arn = null

  # A description of what the Lambda function does.
  description = null

  # Set to true to enable versioning for this Lambda function. This allows you
  # to use aliases to refer to execute different versions of the function in
  # different environments. Note that an alternative way to run Lambda functions
  # in multiple environments is to version your Terraform code. Only versioned
  # lambdas can be the target of a CloudFront event trigger.
  enable_versioning = true

  # A custom KMS key to use to encrypt and decrypt Lambda function environment
  # variables. Leave it blank to use the default KMS key provided in your AWS
  # account.
  kms_key_arn = null

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role for the Lambda function.
  lambda_role_permissions_boundary_arn = null

  # Regions in which to create log groups. If you completely disable one of
  # these regions in your AWS account, you can not pass them here, but their
  # respective providers still need to be passed to the lambda-edge module. The
  # default is set to all regions that have a Regional Edge Cache.
  log_regions = ["us-east-1","us-east-2","us-west-1","us-west-2","ap-south-1","ap-northeast-2","ap-southeast-1","ap-southeast-2","ap-northeast-1","eu-central-1","eu-west-1","eu-west-2","sa-east-1"]

  # The amount of reserved concurrent executions for this lambda function or -1
  # if unreserved.
  reserved_concurrent_executions = null

  # The runtime environment for the Lambda function (e.g. nodejs, python3.9,
  # java8). See
  # https://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html#SSS-CreateFunction-request-Runtime
  # for all possible values. Currently Lambda@Edge supports only nodejs18.x and
  # python3.9.
  runtime = "nodejs18.x"

  # An S3 bucket location containing the function's deployment package. Exactly
  # one of var.source_path or the var.s3_xxx variables must be specified.
  s3_bucket = null

  # The path within var.s3_bucket where the deployment package is located.
  # Exactly one of var.source_path or the var.s3_xxx variables must be
  # specified.
  s3_key = null

  # The version of the path in var.s3_key to use as the deployment package.
  # Exactly one of var.source_path or the var.s3_xxx variables must be
  # specified.
  s3_object_version = null

  # If set to false, this function will no longer set the source_code_hash
  # parameter, so this module will no longer detect and upload changes to the
  # deployment package. This is primarily useful if you update the Lambda
  # function from outside of this module (e.g., you have scripts that do it
  # separately) and want to avoid a plan diff. Used only if var.source_path is
  # non-empty.
  set_source_code_hash = true

  # (Optional) Set to true if you do not wish the log group to be deleted at
  # destroy time, and instead just remove the log group from the Terraform
  # state. Defaults to `false`.
  skip_destroy = false

  # Set to true to skip zip archive creation and assume that var.source_path
  # points to a pregenerated zip archive.
  skip_zip = false

  # The path to the directory that contains your Lambda function source code.
  # This code will be zipped up and uploaded to Lambda as your deployment
  # package. If var.skip_zip is set to true, then this is assumed to be the path
  # to an already-zipped file, and it will be uploaded directly to Lambda as a
  # deployment package. Exactly one of var.source_path or the var.s3_xxx
  # variables must be specified.
  source_path = null

  # A map of tags to apply to the Lambda function.
  tags = {}

  # Whether to sample and trace a subset of incoming requests with AWS X-Ray.
  # Valid values are PassThrough and Active.
  tracing_config_mode = null

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

  # Files in var.source_path to ignore when zipping the directory in addition to
  # .terragrunt-source-manifest.
  zip_exclude_files = []

  # The path to store the output zip file of your source code. If empty,
  # defaults to module path. This should be the full path to the zip file, not a
  # directory.
  zip_output_path = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="handler" requirement="required" type="string">
<HclListItemDescription>

The function entrypoint in your code. This is typically the name of a function or method in your code that AWS will execute when this Lambda function is triggered.

</HclListItemDescription>
</HclListItem>

<HclListItem name="memory_size" requirement="required" type="number">
<HclListItemDescription>

The maximum amount of memory, in MB, your Lambda function will be able to use at runtime. Can be set in 64MB increments from 128MB up to 1536MB. Note that the amount of CPU power given to a Lambda function is proportional to the amount of memory you request, so a Lambda function with 256MB of memory has twice as much CPU power as one with 128MB.

</HclListItemDescription>
</HclListItem>

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name of the Lambda function. Used to namespace all resources created by this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="timeout" requirement="required" type="number">
<HclListItemDescription>

The maximum amount of time, in seconds, your Lambda function will be allowed to run. Must be between 1 and 30 seconds.

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

The ARN of the destination to deliver matching log events to. Kinesis stream or Lambda function ARN. Only applicable if <a href="#log_regions"><code>log_regions</code></a> is not empty.

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

<HclListItem name="dead_letter_target_arn" requirement="optional">
<HclListItemDescription>

The ARN of an SNS topic or an SQS queue to notify when invocation of a Lambda function fails. If this option is used, you must grant this function's IAM role (the ID is outputted as iam_role_id) access to write to the target object, which means allowing either the sns:Publish or sqs:SendMessage action on this ARN, depending on which service is targeted.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="description" requirement="optional" type="string">
<HclListItemDescription>

A description of what the Lambda function does.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="enable_versioning" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable versioning for this Lambda function. This allows you to use aliases to refer to execute different versions of the function in different environments. Note that an alternative way to run Lambda functions in multiple environments is to version your Terraform code. Only versioned lambdas can be the target of a CloudFront event trigger.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

A custom KMS key to use to encrypt and decrypt Lambda function environment variables. Leave it blank to use the default KMS key provided in your AWS account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="lambda_role_permissions_boundary_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role for the Lambda function.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="log_regions" requirement="optional" type="list(any)">
<HclListItemDescription>

Regions in which to create log groups. If you completely disable one of these regions in your AWS account, you can not pass them here, but their respective providers still need to be passed to the lambda-edge module. The default is set to all regions that have a Regional Edge Cache.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
[
  "us-east-1",
  "us-east-2",
  "us-west-1",
  "us-west-2",
  "ap-south-1",
  "ap-northeast-2",
  "ap-southeast-1",
  "ap-southeast-2",
  "ap-northeast-1",
  "eu-central-1",
  "eu-west-1",
  "eu-west-2",
  "sa-east-1"
]
```

</HclListItemDefaultValue>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Regions that have Regional Edge Caches
   More info: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-edge-permissions.html

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="reserved_concurrent_executions" requirement="optional" type="number">
<HclListItemDescription>

The amount of reserved concurrent executions for this lambda function or -1 if unreserved.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="runtime" requirement="optional" type="string">
<HclListItemDescription>

The runtime environment for the Lambda function (e.g. nodejs, python3.9, java8). See https://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html#SSS-CreateFunction-request-Runtime for all possible values. Currently Lambda@Edge supports only nodejs18.x and python3.9.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;nodejs18.x&quot;"/>
</HclListItem>

<HclListItem name="s3_bucket" requirement="optional" type="string">
<HclListItemDescription>

An S3 bucket location containing the function's deployment package. Exactly one of <a href="#source_path"><code>source_path</code></a> or the <a href="#s3_xxx"><code>s3_xxx</code></a> variables must be specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="s3_key" requirement="optional" type="string">
<HclListItemDescription>

The path within <a href="#s3_bucket"><code>s3_bucket</code></a> where the deployment package is located. Exactly one of <a href="#source_path"><code>source_path</code></a> or the <a href="#s3_xxx"><code>s3_xxx</code></a> variables must be specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="s3_object_version" requirement="optional" type="string">
<HclListItemDescription>

The version of the path in <a href="#s3_key"><code>s3_key</code></a> to use as the deployment package. Exactly one of <a href="#source_path"><code>source_path</code></a> or the <a href="#s3_xxx"><code>s3_xxx</code></a> variables must be specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="set_source_code_hash" requirement="optional" type="bool">
<HclListItemDescription>

If set to false, this function will no longer set the source_code_hash parameter, so this module will no longer detect and upload changes to the deployment package. This is primarily useful if you update the Lambda function from outside of this module (e.g., you have scripts that do it separately) and want to avoid a plan diff. Used only if <a href="#source_path"><code>source_path</code></a> is non-empty.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="skip_destroy" requirement="optional" type="bool">
<HclListItemDescription>

(Optional) Set to true if you do not wish the log group to be deleted at destroy time, and instead just remove the log group from the Terraform state. Defaults to `false`.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="skip_zip" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to skip zip archive creation and assume that <a href="#source_path"><code>source_path</code></a> points to a pregenerated zip archive.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="source_path" requirement="optional" type="string">
<HclListItemDescription>

The path to the directory that contains your Lambda function source code. This code will be zipped up and uploaded to Lambda as your deployment package. If <a href="#skip_zip"><code>skip_zip</code></a> is set to true, then this is assumed to be the path to an already-zipped file, and it will be uploaded directly to Lambda as a deployment package. Exactly one of <a href="#source_path"><code>source_path</code></a> or the <a href="#s3_xxx"><code>s3_xxx</code></a> variables must be specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the Lambda function.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="tracing_config_mode" requirement="optional" type="string">
<HclListItemDescription>

Whether to sample and trace a subset of incoming requests with AWS X-Ray. Valid values are PassThrough and Active.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="use_managed_iam_policies" requirement="optional" type="bool">
<HclListItemDescription>

When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="zip_exclude_files" requirement="optional" type="list(string)">
<HclListItemDescription>

Files in <a href="#source_path"><code>source_path</code></a> to ignore when zipping the directory in addition to .terragrunt-source-manifest.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="zip_output_path" requirement="optional" type="string">
<HclListItemDescription>

The path to store the output zip file of your source code. If empty, defaults to module path. This should be the full path to the zip file, not a directory.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="cloudwatch_log_group_names">
<HclListItemDescription>

Name of the (optionally) created CloudWatch log groups for the lambda function.

</HclListItemDescription>
</HclListItem>

<HclListItem name="function_arn">
</HclListItem>

<HclListItem name="function_name">
</HclListItem>

<HclListItem name="iam_role_arn">
</HclListItem>

<HclListItem name="iam_role_id">
</HclListItem>

<HclListItem name="invoke_arn">
</HclListItem>

<HclListItem name="qualified_arn">
</HclListItem>

<HclListItem name="version">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.0.0/modules/lambda-edge/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.0.0/modules/lambda-edge/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.0.0/modules/lambda-edge/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "2eca58012252ae5b5166a1128450a5d2"
}
##DOCS-SOURCER-END -->
