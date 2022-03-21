---
type: "service"
name: "Lambda"
description: "Deploy a Lambda on AWS."
category: "lambda"
cloud: "aws"
tags: ["lambda"]
license: "gruntwork"
built-with: "terraform"
title: "Lambda"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemTypeDetails, HclListItemDefaultValue } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.85.0" lastModifiedVersion="0.85.0"/>

# Lambda


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/lambda" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=services%2Flambda" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

## Overview

This service contains code to deploy a [Lambda](https://aws.amazon.com/lambda) on AWS that can be used for either
production or non-production workloads.

![Lambda architecture](/img/reference/services/app-orchestration/lambda-service-architecture.png)

## Features

*   The lambda function
*   Optionally, a schedule expression if you want to execute the lambda periodically
*   Optionally, an alarm that can be triggered when the lambda fails

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

Under the hood, this is all implemented using Terraform modules from the Gruntwork
[terraform-aws-lambda](https://github.com/gruntwork-io/terraform-aws-lambda) repo. If you are a subscriber and don’t
have access to this repo, email <support@gruntwork.io>.

### Core concepts

To understand core concepts like what’s a Lambda, how to test it, and more, see the
documentation in the [terraform-aws-lambda](https://github.com/gruntwork-io/terraform-aws-lambda) repo.

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules): The main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.
*   [examples](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples): This folder contains working examples of how to use the submodules.
*   [test](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

*   [How to deploy a production-grade VPC on AWS](https://docs.gruntwork.io/guides/build-it-yourself/vpc/)

*   [How to configure a production-grade CI/CD workflow for application and infrastructure code](https://docs.gruntwork.io/guides/build-it-yourself/pipelines/):
    step-by-step guide on how to configure CI / CD for your apps and infrastructure.

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<br/>

### Required

<HclListItem name="alarm_sns_topic_arns" description="A list of SNS topic ARNs to notify when the lambda alarms change to ALARM, OK, or INSUFFICIENT_DATA state" requirement="required" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
</HclListItem>

<HclListItem name="memory_size" description="The maximum amount of memory, in MB, your Lambda function will be able to use at runtime. Can be set in 64MB increments from 128MB up to 1536MB. Note that the amount of CPU power given to a Lambda function is proportional to the amount of memory you request, so a Lambda function with 256MB of memory has twice as much CPU power as one with 128MB." requirement="required" type="number">
</HclListItem>

<HclListItem name="name" description="The name of the Lambda function. Used to namespace all resources created by this module." requirement="required" type="string">
</HclListItem>

<HclListItem name="timeout" description="The maximum amount of time, in seconds, your Lambda function will be allowed to run. Must be between 1 and 900 seconds." requirement="required" type="number">
</HclListItem>

### Optional

<HclListItem name="assume_role_policy" description="A custom assume role policy for the IAM role for this Lambda function. If not set, the default is a policy that allows the Lambda service to assume the IAM role, which is what most users will need. However, you can use this variable to override the policy for special cases, such as using a Lambda function to rotate AWS Secrets Manager secrets." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_kms_key_id" description="The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for encrypting log data." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_retention_in_days" description="The number of days to retain log events in the log group. Refer to https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days for all the valid values. When null, the log events are retained forever." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_subscription_destination_arn" description="The ARN of the destination to deliver matching log events to. Kinesis stream or Lambda function ARN. Only applicable if <a href=#should_create_cloudwatch_log_group><code>should_create_cloudwatch_log_group</code></a> is true." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_subscription_distribution" description="The method used to distribute log data to the destination. Only applicable when <a href=#cloudwatch_log_group_subscription_destination_arn><code>cloudwatch_log_group_subscription_destination_arn</code></a> is a kinesis stream. Valid values are `Random` and `ByLogStream`." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_subscription_filter_pattern" description="A valid CloudWatch Logs filter pattern for subscribing to a filtered stream of log events." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue=""/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_subscription_role_arn" description="ARN of an IAM role that grants Amazon CloudWatch Logs permissions to deliver ingested log events to the destination. Only applicable when <a href=#cloudwatch_log_group_subscription_destination_arn><code>cloudwatch_log_group_subscription_destination_arn</code></a> is a kinesis stream." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_tags" description="Tags to apply on the CloudWatch Log Group, encoded as a map where the keys are tag keys and values are tag values." requirement="optional" type="map">
<HclListItemTypeDetails>

```hcl
map(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="command" description="The CMD for the docker image. Only used if you specify a Docker image via image_uri." requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="comparison_operator" description="The arithmetic operation to use when comparing the specified Statistic and Threshold. The specified Statistic value is used as the first operand. Either of the following is supported: `GreaterThanOrEqualToThreshold`, `GreaterThanThreshold`, `LessThanThreshold`, `LessThanOrEqualToThreshold`. Additionally, the values `LessThanLowerOrGreaterThanUpperThreshold`, `LessThanLowerThreshold`, and `GreaterThanUpperThreshold` are used only for alarms based on anomaly detection models." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="GreaterThanThreshold"/>
</HclListItem>

<HclListItem name="create_resources" description="Set to false to have this module skip creating resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if this module should create anything or not." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="datapoints_to_alarm" description="The number of datapoints that must be breaching to trigger the alarm." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="dead_letter_target_arn" description="The ARN of an SNS topic or an SQS queue to notify when invocation of a Lambda function fails. If this option is used, you must grant this function's IAM role (the ID is outputted as iam_role_id) access to write to the target object, which means allowing either the sns:Publish or sqs:SendMessage action on this ARN, depending on which service is targeted." requirement="optional">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="description" description="A description of what the Lambda function does." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="enable_versioning" description="Set to true to enable versioning for this Lambda function. This allows you to use aliases to refer to execute different versions of the function in different environments. Note that an alternative way to run Lambda functions in multiple environments is to version your Terraform code." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="entry_point" description="The ENTRYPOINT for the docker image. Only used if you specify a Docker image via image_uri." requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="environment_variables" description="A map of environment variables to pass to the Lambda function. AWS will automatically encrypt these with KMS and decrypt them when running the function." requirement="optional" type="map">
<HclListItemTypeDetails>

```hcl
map(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{'EnvVarPlaceHolder':'Placeholder'}"/>
</HclListItem>

<HclListItem name="evaluation_periods" description="The number of periods over which data is compared to the specified threshold." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="file_system_access_point_arn" description="The ARN of an EFS access point to use to access the file system. Only used if <a href=#mount_to_file_system><code>mount_to_file_system</code></a> is true." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="file_system_mount_path" description="The mount path where the lambda can access the file system. This path must begin with /mnt/. Only used if <a href=#mount_to_file_system><code>mount_to_file_system</code></a> is true." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="handler" description="The function entrypoint in your code. This is typically the name of a function or method in your code that AWS will execute when this Lambda function is triggered." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="image_uri" description="The ECR image URI containing the function's deployment package. Example: 01234501234501.dkr.ecr.us-east-1.amazonaws.com/image_name:image_tag" requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="kms_key_arn" description="A custom KMS key to use to encrypt and decrypt Lambda function environment variables. Leave it blank to use the default KMS key provided in your AWS account." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="lambda_role_permissions_boundary_arn" description="The ARN of the policy that is used to set the permissions boundary for the IAM role for the lambda" requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="layers" description="The list of Lambda Layer Version ARNs to attach to your Lambda Function. You can have a maximum of 5 Layers attached to each function." requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="metric_name" description="The name for the alarm's associated metric." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="Errors"/>
</HclListItem>

<HclListItem name="mount_to_file_system" description="Set to true to mount your Lambda function on an EFS. Note that the lambda must also be deployed inside a VPC (run_in_vpc must be set to true) for this config to have any effect." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="namespace" description="The namespace to use for all resources created by this module. If not set, <a href=#lambda_function_name><code>lambda_function_name</code></a>, with '-scheduled' as a suffix, is used." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="period" description="The period in seconds over which the specified `statistic` is applied." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="reserved_concurrent_executions" description="The amount of reserved concurrent executions for this lambda function or -1 if unreserved." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="run_in_vpc" description="Set to true to give your Lambda function access to resources within a VPC." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="runtime" description="The runtime environment for the Lambda function (e.g. nodejs, python2.7, java8). See https://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html#SSS-CreateFunction-request-Runtime for all possible values." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="s3_bucket" description="An S3 bucket location containing the function's deployment package. Exactly one of <a href=#source_path><code>source_path</code></a> or the <a href=#s3_xxx><code>s3_xxx</code></a> variables must be specified." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="s3_key" description="The path within <a href=#s3_bucket><code>s3_bucket</code></a> where the deployment package is located. Exactly one of <a href=#source_path><code>source_path</code></a> or the <a href=#s3_xxx><code>s3_xxx</code></a> variables must be specified." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="s3_object_version" description="The version of the path in <a href=#s3_key><code>s3_key</code></a> to use as the deployment package. Exactly one of <a href=#source_path><code>source_path</code></a> or the <a href=#s3_xxx><code>s3_xxx</code></a> variables must be specified." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="schedule_expression" description="An expression that defines the schedule for this lambda job. For example, cron(0 20 * * ? *) or rate(5 minutes). For more information visit https://docs.aws.amazon.com/lambda/latest/dg/services-cloudwatchevents-expressions.html" requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="set_source_code_hash" description="If set to false, this function will no longer set the source_code_hash parameter, so this module will no longer detect and upload changes to the deployment package. This is primarily useful if you update the Lambda function from outside of this module (e.g., you have scripts that do it separately) and want to avoid a plan diff. Used only if <a href=#source_path><code>source_path</code></a> is non-empty." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="should_create_cloudwatch_log_group" description="When true, precreate the CloudWatch Log Group to use for log aggregation from the lambda function execution. This is useful if you wish to customize the CloudWatch Log Group with various settings such as retention periods and KMS encryption. When false, AWS Lambda will automatically create a basic log group to use." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="should_create_outbound_rule" description="If true, create an egress rule allowing all outbound traffic from Lambda function to the entire Internet (e.g. 0.0.0.0/0)." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="skip_zip" description="Set to true to skip zip archive creation and assume that <a href=#source_path><code>source_path</code></a> points to a pregenerated zip archive." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="source_path" description="The path to the directory that contains your Lambda function source code. This code will be zipped up and uploaded to Lambda as your deployment package. If <a href=#skip_zip><code>skip_zip</code></a> is set to true, then this is assumed to be the path to an already-zipped file, and it will be uploaded directly to Lambda as a deployment package. Exactly one of <a href=#source_path><code>source_path</code></a> or the <a href=#s3_xxx><code>s3_xxx</code></a> variables must be specified." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="statistic" description="The statistic to apply to the alarm's associated metric." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="Sum"/>
</HclListItem>

<HclListItem name="subnet_ids" description="A list of subnet IDs the Lambda function should be able to access within your VPC. Only used if <a href=#run_in_vpc><code>run_in_vpc</code></a> is true." requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="tags" description="A map of tags to apply to the Lambda function." requirement="optional" type="map">
<HclListItemTypeDetails>

```hcl
map(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="threshold" description="The value against which the specified statistic is compared. This parameter is required for alarms based on static thresholds, but should not be used for alarms based on anomaly detection models." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="use_managed_iam_policies" description="When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="vpc_id" description="The ID of the VPC the Lambda function should be able to access. Only used if <a href=#run_in_vpc><code>run_in_vpc</code></a> is true." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="working_directory" description="The working directory for the docker image. Only used if you specify a Docker image via image_uri." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="zip_output_path" description="The path to store the output zip file of your source code. If empty, defaults to module path. This should be the full path to the zip file, not a directory." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<br/>

<HclListItem name="alarm_actions" description="The list of actions to execute when this alarm transitions into an ALARM state from any other state">
</HclListItem>

<HclListItem name="alarm_arn" description="ARN of the Cloudwatch alarm">
</HclListItem>

<HclListItem name="alarm_name" description="Name of the Cloudwatch alarm">
</HclListItem>

<HclListItem name="event_rule_arn" description="Cloudwatch Event Rule Arn">
</HclListItem>

<HclListItem name="event_rule_schedule" description="Cloudwatch Event Rule schedule expression">
</HclListItem>

<HclListItem name="function_arn" description="Amazon Resource Name (ARN) identifying the Lambda Function">
</HclListItem>

<HclListItem name="function_name" description="Unique name for Lambda Function">
</HclListItem>

<HclListItem name="iam_role_arn" description="Amazon Resource Name (ARN) of the AWS IAM Role created for the Lambda Function">
</HclListItem>

<HclListItem name="iam_role_id" description="Name of the AWS IAM Role created for the Lambda Function">
</HclListItem>

<HclListItem name="insufficient_data_actions" description="The list of actions to execute when this alarm transitions into an INSUFFICIENT_DATA state from any other state">
</HclListItem>

<HclListItem name="invoke_arn" description="Amazon Resource Name (ARN) to be used for invoking the Lambda Function">
</HclListItem>

<HclListItem name="ok_actions" description="The list of actions to execute when this alarm transitions into an OK state from any other state">
</HclListItem>

<HclListItem name="qualified_arn" description="Amazon Resource Name (ARN) identifying your Lambda Function version">
</HclListItem>

<HclListItem name="security_group_id" description="Security Group ID of the Security Group created for the Lambda Function">
</HclListItem>

<HclListItem name="version" description="Latest published version of your Lambda Function">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"155acd03acef9d63af4106ca45c36566"}
##DOCS-SOURCER-END -->
