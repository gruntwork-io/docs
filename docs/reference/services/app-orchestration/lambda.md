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
import HclListItem from '../../../../src/components/HclListItem.tsx';

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

<HclListItem name="alarm_sns_topic_arns" requirement="required" description="A list of SNS topic ARNs to notify when the lambda alarms change to ALARM, OK, or <a href=#INSUFFICIENT_DATA><code>INSUFFICIENT_DATA</code></a> state" type="list" typeDetails="list(string)"/>

<HclListItem name="memory_size" requirement="required" description="The maximum amount of memory, in MB, your Lambda function will be able to use at runtime. Can be set in 64MB increments from 128MB up to 1536MB. Note that the amount of CPU power given to a Lambda function is proportional to the amount of memory you request, so a Lambda function with 256MB of memory has twice as much CPU power as one with 128MB." type="number"/>

<HclListItem name="name" requirement="required" description="The name of the Lambda function. Used to namespace all resources created by this module." type="string"/>

<HclListItem name="timeout" requirement="required" description="The maximum amount of time, in seconds, your Lambda function will be allowed to run. Must be between 1 and 900 seconds." type="number"/>


<br/>


### Optional

<HclListItem name="assume_role_policy" requirement="optional" description="A custom assume role policy for the IAM role for this Lambda function. If not set, the default is a policy that allows the Lambda service to assume the IAM role, which is what most users will need. However, you can use this variable to override the policy for special cases, such as using a Lambda function to rotate AWS Secrets Manager secrets." type="string" defaultValue="null"/>

<HclListItem name="cloudwatch_log_group_kms_key_id" requirement="optional" description="The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for encrypting log data." type="string" defaultValue="null"/>

<HclListItem name="cloudwatch_log_group_retention_in_days" requirement="optional" description="The number of days to retain log events in the log group. Refer to https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/<a href=#cloudwatch_log_group><code>cloudwatch_log_group</code></a>#<a href=#retention_in_days><code>retention_in_days</code></a> for all the valid values. When null, the log events are retained forever." type="number" defaultValue="null"/>

<HclListItem name="cloudwatch_log_group_subscription_destination_arn" requirement="optional" description="The ARN of the destination to deliver matching log events to. Kinesis stream or Lambda function ARN. Only applicable if <a href=#should_create_cloudwatch_log_group><code>should_create_cloudwatch_log_group</code></a> is true." type="string" defaultValue="null"/>

<HclListItem name="cloudwatch_log_group_subscription_distribution" requirement="optional" description="The method used to distribute log data to the destination. Only applicable when <a href=#cloudwatch_log_group_subscription_destination_arn><code>cloudwatch_log_group_subscription_destination_arn</code></a> is a kinesis stream. Valid values are `Random` and `ByLogStream`." type="string" defaultValue="null"/>

<HclListItem name="cloudwatch_log_group_subscription_filter_pattern" requirement="optional" description="A valid CloudWatch Logs filter pattern for subscribing to a filtered stream of log events." type="string" defaultValue=""/>

<HclListItem name="cloudwatch_log_group_subscription_role_arn" requirement="optional" description="ARN of an IAM role that grants Amazon CloudWatch Logs permissions to deliver ingested log events to the destination. Only applicable when <a href=#cloudwatch_log_group_subscription_destination_arn><code>cloudwatch_log_group_subscription_destination_arn</code></a> is a kinesis stream." type="string" defaultValue="null"/>

<HclListItem name="cloudwatch_log_group_tags" requirement="optional" description="Tags to apply on the CloudWatch Log Group, encoded as a map where the keys are tag keys and values are tag values." type="map" typeDetails="map(string)" defaultValue="null"/>

<HclListItem name="command" requirement="optional" description="The CMD for the docker image. Only used if you specify a Docker image via <a href=#image_uri><code>image_uri</code></a>." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="comparison_operator" requirement="optional" description="The arithmetic operation to use when comparing the specified Statistic and Threshold. The specified Statistic value is used as the first operand. Either of the following is supported: `GreaterThanOrEqualToThreshold`, `GreaterThanThreshold`, `LessThanThreshold`, `LessThanOrEqualToThreshold`. Additionally, the values `LessThanLowerOrGreaterThanUpperThreshold`, `LessThanLowerThreshold`, and `GreaterThanUpperThreshold` are used only for alarms based on anomaly detection models." type="string" defaultValue="GreaterThanThreshold"/>

<HclListItem name="create_resources" requirement="optional" description="Set to false to have this module skip creating resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if this module should create anything or not." type="bool" defaultValue="true"/>

<HclListItem name="datapoints_to_alarm" requirement="optional" description="The number of datapoints that must be breaching to trigger the alarm." type="number" defaultValue="1"/>

<HclListItem name="dead_letter_target_arn" requirement="optional" description="The ARN of an SNS topic or an SQS queue to notify when invocation of a Lambda function fails. If this option is used, you must grant this function's IAM role (the ID is outputted as <a href=#iam_role_id><code>iam_role_id</code></a>) access to write to the target object, which means allowing either the sns:Publish or sqs:SendMessage action on this ARN, depending on which service is targeted." defaultValue="null"/>

<HclListItem name="description" requirement="optional" description="A description of what the Lambda function does." type="string" defaultValue="null"/>

<HclListItem name="enable_versioning" requirement="optional" description="Set to true to enable versioning for this Lambda function. This allows you to use aliases to refer to execute different versions of the function in different environments. Note that an alternative way to run Lambda functions in multiple environments is to version your Terraform code." type="bool" defaultValue="false"/>

<HclListItem name="entry_point" requirement="optional" description="The ENTRYPOINT for the docker image. Only used if you specify a Docker image via <a href=#image_uri><code>image_uri</code></a>." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="environment_variables" requirement="optional" description="A map of environment variables to pass to the Lambda function. AWS will automatically encrypt these with KMS and decrypt them when running the function." type="map" typeDetails="map(string)" defaultValue="{'EnvVarPlaceHolder':'Placeholder'}"/>

<HclListItem name="evaluation_periods" requirement="optional" description="The number of periods over which data is compared to the specified threshold." type="number" defaultValue="1"/>

<HclListItem name="file_system_access_point_arn" requirement="optional" description="The ARN of an EFS access point to use to access the file system. Only used if <a href=#mount_to_file_system><code>mount_to_file_system</code></a> is true." type="string" defaultValue="null"/>

<HclListItem name="file_system_mount_path" requirement="optional" description="The mount path where the lambda can access the file system. This path must begin with /mnt/. Only used if <a href=#mount_to_file_system><code>mount_to_file_system</code></a> is true." type="string" defaultValue="null"/>

<HclListItem name="handler" requirement="optional" description="The function entrypoint in your code. This is typically the name of a function or method in your code that AWS will execute when this Lambda function is triggered." type="string" defaultValue="null"/>

<HclListItem name="image_uri" requirement="optional" description="The ECR image URI containing the function's deployment package. Example: 01234501234501.dkr.ecr.us-east-1.amazonaws.com/<a href=#image_name><code>image_name</code></a>:<a href=#image_tag><code>image_tag</code></a>" type="string" defaultValue="null"/>

<HclListItem name="kms_key_arn" requirement="optional" description="A custom KMS key to use to encrypt and decrypt Lambda function environment variables. Leave it blank to use the default KMS key provided in your AWS account." type="string" defaultValue="null"/>

<HclListItem name="lambda_role_permissions_boundary_arn" requirement="optional" description="The ARN of the policy that is used to set the permissions boundary for the IAM role for the lambda" type="string" defaultValue="null"/>

<HclListItem name="layers" requirement="optional" description="The list of Lambda Layer Version ARNs to attach to your Lambda Function. You can have a maximum of 5 Layers attached to each function." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="metric_name" requirement="optional" description="The name for the alarm's associated metric." type="string" defaultValue="Errors"/>

<HclListItem name="mount_to_file_system" requirement="optional" description="Set to true to mount your Lambda function on an EFS. Note that the lambda must also be deployed inside a VPC (<a href=#run_in_vpc><code>run_in_vpc</code></a> must be set to true) for this config to have any effect." type="bool" defaultValue="false"/>

<HclListItem name="namespace" requirement="optional" description="The namespace to use for all resources created by this module. If not set, <a href=#lambda_function_name><code>lambda_function_name</code></a>, with '-scheduled' as a suffix, is used." type="string" defaultValue="null"/>

<HclListItem name="period" requirement="optional" description="The period in seconds over which the specified `statistic` is applied." type="number" defaultValue="60"/>

<HclListItem name="reserved_concurrent_executions" requirement="optional" description="The amount of reserved concurrent executions for this lambda function or -1 if unreserved." type="number" defaultValue="null"/>

<HclListItem name="run_in_vpc" requirement="optional" description="Set to true to give your Lambda function access to resources within a VPC." type="bool" defaultValue="false"/>

<HclListItem name="runtime" requirement="optional" description="The runtime environment for the Lambda function (e.g. nodejs, python2.7, java8). See https://docs.aws.amazon.com/lambda/latest/dg/<a href=#API_CreateFunction><code>API_CreateFunction</code></a>.html#SSS-CreateFunction-request-Runtime for all possible values." type="string" defaultValue="null"/>

<HclListItem name="s3_bucket" requirement="optional" description="An S3 bucket location containing the function's deployment package. Exactly one of <a href=#source_path><code>source_path</code></a> or the <a href=#s3_xxx><code>s3_xxx</code></a> variables must be specified." type="string" defaultValue="null"/>

<HclListItem name="s3_key" requirement="optional" description="The path within <a href=#s3_bucket><code>s3_bucket</code></a> where the deployment package is located. Exactly one of <a href=#source_path><code>source_path</code></a> or the <a href=#s3_xxx><code>s3_xxx</code></a> variables must be specified." type="string" defaultValue="null"/>

<HclListItem name="s3_object_version" requirement="optional" description="The version of the path in <a href=#s3_key><code>s3_key</code></a> to use as the deployment package. Exactly one of <a href=#source_path><code>source_path</code></a> or the <a href=#s3_xxx><code>s3_xxx</code></a> variables must be specified." type="string" defaultValue="null"/>

<HclListItem name="schedule_expression" requirement="optional" description="An expression that defines the schedule for this lambda job. For example, cron(0 20 * * ? *) or rate(5 minutes). For more information visit https://docs.aws.amazon.com/lambda/latest/dg/services-cloudwatchevents-expressions.html" type="string" defaultValue="null"/>

<HclListItem name="set_source_code_hash" requirement="optional" description="If set to false, this function will no longer set the <a href=#source_code_hash><code>source_code_hash</code></a> parameter, so this module will no longer detect and upload changes to the deployment package. This is primarily useful if you update the Lambda function from outside of this module (e.g., you have scripts that do it separately) and want to avoid a plan diff. Used only if <a href=#source_path><code>source_path</code></a> is non-empty." type="bool" defaultValue="true"/>

<HclListItem name="should_create_cloudwatch_log_group" requirement="optional" description="When true, precreate the CloudWatch Log Group to use for log aggregation from the lambda function execution. This is useful if you wish to customize the CloudWatch Log Group with various settings such as retention periods and KMS encryption. When false, AWS Lambda will automatically create a basic log group to use." type="bool" defaultValue="true"/>

<HclListItem name="should_create_outbound_rule" requirement="optional" description="If true, create an egress rule allowing all outbound traffic from Lambda function to the entire Internet (e.g. 0.0.0.0/0)." type="bool" defaultValue="false"/>

<HclListItem name="skip_zip" requirement="optional" description="Set to true to skip zip archive creation and assume that <a href=#source_path><code>source_path</code></a> points to a pregenerated zip archive." type="bool" defaultValue="false"/>

<HclListItem name="source_path" requirement="optional" description="The path to the directory that contains your Lambda function source code. This code will be zipped up and uploaded to Lambda as your deployment package. If <a href=#skip_zip><code>skip_zip</code></a> is set to true, then this is assumed to be the path to an already-zipped file, and it will be uploaded directly to Lambda as a deployment package. Exactly one of <a href=#source_path><code>source_path</code></a> or the <a href=#s3_xxx><code>s3_xxx</code></a> variables must be specified." type="string" defaultValue="null"/>

<HclListItem name="statistic" requirement="optional" description="The statistic to apply to the alarm's associated metric." type="string" defaultValue="Sum"/>

<HclListItem name="subnet_ids" requirement="optional" description="A list of subnet IDs the Lambda function should be able to access within your VPC. Only used if <a href=#run_in_vpc><code>run_in_vpc</code></a> is true." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="tags" requirement="optional" description="A map of tags to apply to the Lambda function." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="threshold" requirement="optional" description="The value against which the specified statistic is compared. This parameter is required for alarms based on static thresholds, but should not be used for alarms based on anomaly detection models." type="number" defaultValue="0"/>

<HclListItem name="use_managed_iam_policies" requirement="optional" description="When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards." type="bool" defaultValue="true"/>

<HclListItem name="vpc_id" requirement="optional" description="The ID of the VPC the Lambda function should be able to access. Only used if <a href=#run_in_vpc><code>run_in_vpc</code></a> is true." type="string" defaultValue="null"/>

<HclListItem name="working_directory" requirement="optional" description="The working directory for the docker image. Only used if you specify a Docker image via <a href=#image_uri><code>image_uri</code></a>." type="string" defaultValue="null"/>

<HclListItem name="zip_output_path" requirement="optional" description="The path to store the output zip file of your source code. If empty, defaults to module path. This should be the full path to the zip file, not a directory." type="string" defaultValue="null"/>

</TabItem>
<TabItem value="outputs" label="Outputs">

<br/>

<HclListItem name="alarm_actions" requirement="required" description="The list of actions to execute when this alarm transitions into an ALARM state from any other state"/>

<HclListItem name="alarm_arn" requirement="required" description="ARN of the Cloudwatch alarm"/>

<HclListItem name="alarm_name" requirement="required" description="Name of the Cloudwatch alarm"/>

<HclListItem name="event_rule_arn" requirement="required" description="Cloudwatch Event Rule Arn"/>

<HclListItem name="event_rule_schedule" requirement="required" description="Cloudwatch Event Rule schedule expression"/>

<HclListItem name="function_arn" requirement="required" description="Amazon Resource Name (ARN) identifying the Lambda Function"/>

<HclListItem name="function_name" requirement="required" description="Unique name for Lambda Function"/>

<HclListItem name="iam_role_arn" requirement="required" description="Amazon Resource Name (ARN) of the AWS IAM Role created for the Lambda Function"/>

<HclListItem name="iam_role_id" requirement="required" description="Name of the AWS IAM Role created for the Lambda Function"/>

<HclListItem name="insufficient_data_actions" requirement="required" description="The list of actions to execute when this alarm transitions into an <a href=#INSUFFICIENT_DATA><code>INSUFFICIENT_DATA</code></a> state from any other state"/>

<HclListItem name="invoke_arn" requirement="required" description="Amazon Resource Name (ARN) to be used for invoking the Lambda Function"/>

<HclListItem name="ok_actions" requirement="required" description="The list of actions to execute when this alarm transitions into an OK state from any other state"/>

<HclListItem name="qualified_arn" requirement="required" description="Amazon Resource Name (ARN) identifying your Lambda Function version"/>

<HclListItem name="security_group_id" requirement="required" description="Security Group ID of the Security Group created for the Lambda Function"/>

<HclListItem name="version" requirement="required" description="Latest published version of your Lambda Function"/>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"707c8601e64be374a6e475304befe2e0"}
##DOCS-SOURCER-END -->
