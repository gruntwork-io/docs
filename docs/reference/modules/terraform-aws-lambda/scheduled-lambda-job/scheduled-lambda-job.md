---
title: "Scheduled Lambda Job Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Lambda" version="1.3.1" lastModifiedVersion="1.3.1"/>

# Scheduled Lambda Job Module

<a href="https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.3.1/modules/scheduled-lambda-job" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases/tag/v1.3.1" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module makes it easy to run an [AWS Lambda](https://aws.amazon.com/lambda/) function (such as one created with the
[lambda module](https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.3.1/modules/lambda)) on a scheduled basis. This is useful for periodic background jobs, such as taking a
daily snapshot of your servers.

## Background info

For more information on AWS Lambda, how it works, and how to configure your functions, check out the [lambda module
documentation](https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.3.1/modules/lambda).

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S SCHEDULED-LAMBDA-JOB MODULE
# ------------------------------------------------------------------------------------------------------

module "scheduled_lambda_job" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/scheduled-lambda-job?ref=v1.3.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ARN of the lambda function.
  lambda_function_arn = <string>

  # The name of the lambda function.
  lambda_function_name = <string>

  # An expression that defines the schedule for this lambda job. For example,
  # cron(0 20 * * ? *) or rate(5 minutes).
  schedule_expression = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A custom assume role policy for the IAM role for EventBridge Scheduler. Only
  # applies on the EventBridge Scheduler path (when schedule_expression_timezone
  # is set). If not set, the default is a policy that allows the EventBridge
  # Scheduler service to assume the IAM role, which is what most users will
  # need. However, you can use this variable to override the policy for special
  # cases.
  assume_role_policy = null

  # Set to false to have this module skip creating resources. This weird
  # parameter exists solely because Terraform does not support conditional
  # modules. Therefore, this is a hack to allow you to conditionally decide if
  # this module should create anything or not.
  create_resources = true

  # Flag to add confused-deputy conditions (aws:SourceArn scoped to this module's schedule group, plus
  # aws:SourceAccount) to the trust relationship of the IAM role, so only EventBridge Scheduler schedules in this
  # module's schedule group can assume the role. Per AWS guidance the condition is scoped to the schedule group ARN,
  # not an individual schedule ARN (a schedule ARN cannot be validated at create time). Only applies to the
  # EventBridge Scheduler path (when schedule_expression_timezone is set). In a future release, this will default to true.
  #
  enforce_source_arn_condition = false

  # The ARN of existing IAM role that will be used by EventBridge Scheduler to
  # invoke the Lambda function. If set, the module will not create any IAM
  # entities and fully relies on caller to provide correct IAM role and its
  # policies. Using the variable allows the module to leverage an existing IAM
  # role - for example, when an account has centralized set of IAM entities, or
  # when deploying same function across multiple AWS region to avoid the module
  # attempting to create duplicate IAM entities.
  existing_role_arn = null

  # Determines whether the schedule is invoked within a flexible time window. 
  # Default is 'false' (don't run in a flexible time window)
  flexible_time_window_enabled = false

  # The name to use for the IAM role created for EventBridge Scheduler to invoke
  # the Lambda function. If null, default to the namespace (var.namespace). Only
  # used if var.existing_role_arn is null.
  iam_role_name = null

  # A map of tags to apply to the IAM role created for EventBridge Scheduler to
  # invoke the function. Only used if var.existing_role_arn is null.
  iam_role_tags = {}

  # ARN of a customer-managed key used to encrypt the Lambda function input
  # payload. If not set, the default AWS-managed key will be used.
  kms_key_arn = null

  # JSON text that will be passed to the lambda function on each invoke.
  lambda_function_input = null

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role for EventBridge Scheduler
  lambda_role_permissions_boundary_arn = null

  # Maximum amount of time, in seconds, to continue to make retry attempts.
  # Ranges from 60 to 86400 (default).
  maximum_event_age_in_seconds = 86400

  # Maximum number of retry attempts to make before the request fails. Ranges
  # from 0 to 185 (default).
  maximum_retry_attempts = 185

  # Maximum time window during which a schedule can be invoked. Ranges from 1 to
  # 1440 minutes. Must be set if flexible_time_window_enabled is true.
  maximum_window_in_minutes = null

  # The namespace to use for all resources created by this module. If not set,
  # var.lambda_function_name, with '-scheduled' as a suffix, is used.
  namespace = null

  # Timezone in which the scheduling expression is evaluated. When set, the
  # module uses an EventBridge Scheduler schedule (which is timezone and
  # daylight-savings aware) instead of the default EventBridge rule (which is
  # always UTC). Leave null to keep the default rule-based behavior. Example:
  # Australia/Sydney.
  schedule_expression_timezone = null

  # A map of tags to apply to the EventBridge (CloudWatch Event) rule created on
  # the default schedule path (when schedule_expression_timezone is null). Not
  # used on the EventBridge Scheduler path, since Scheduler does not support
  # tagging schedules; tag the Scheduler IAM role via var.iam_role_tags instead.
  tags = {}

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
# DEPLOY GRUNTWORK'S SCHEDULED-LAMBDA-JOB MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-lambda.git//modules/scheduled-lambda-job?ref=v1.3.1"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ARN of the lambda function.
  lambda_function_arn = <string>

  # The name of the lambda function.
  lambda_function_name = <string>

  # An expression that defines the schedule for this lambda job. For example,
  # cron(0 20 * * ? *) or rate(5 minutes).
  schedule_expression = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A custom assume role policy for the IAM role for EventBridge Scheduler. Only
  # applies on the EventBridge Scheduler path (when schedule_expression_timezone
  # is set). If not set, the default is a policy that allows the EventBridge
  # Scheduler service to assume the IAM role, which is what most users will
  # need. However, you can use this variable to override the policy for special
  # cases.
  assume_role_policy = null

  # Set to false to have this module skip creating resources. This weird
  # parameter exists solely because Terraform does not support conditional
  # modules. Therefore, this is a hack to allow you to conditionally decide if
  # this module should create anything or not.
  create_resources = true

  # Flag to add confused-deputy conditions (aws:SourceArn scoped to this module's schedule group, plus
  # aws:SourceAccount) to the trust relationship of the IAM role, so only EventBridge Scheduler schedules in this
  # module's schedule group can assume the role. Per AWS guidance the condition is scoped to the schedule group ARN,
  # not an individual schedule ARN (a schedule ARN cannot be validated at create time). Only applies to the
  # EventBridge Scheduler path (when schedule_expression_timezone is set). In a future release, this will default to true.
  #
  enforce_source_arn_condition = false

  # The ARN of existing IAM role that will be used by EventBridge Scheduler to
  # invoke the Lambda function. If set, the module will not create any IAM
  # entities and fully relies on caller to provide correct IAM role and its
  # policies. Using the variable allows the module to leverage an existing IAM
  # role - for example, when an account has centralized set of IAM entities, or
  # when deploying same function across multiple AWS region to avoid the module
  # attempting to create duplicate IAM entities.
  existing_role_arn = null

  # Determines whether the schedule is invoked within a flexible time window. 
  # Default is 'false' (don't run in a flexible time window)
  flexible_time_window_enabled = false

  # The name to use for the IAM role created for EventBridge Scheduler to invoke
  # the Lambda function. If null, default to the namespace (var.namespace). Only
  # used if var.existing_role_arn is null.
  iam_role_name = null

  # A map of tags to apply to the IAM role created for EventBridge Scheduler to
  # invoke the function. Only used if var.existing_role_arn is null.
  iam_role_tags = {}

  # ARN of a customer-managed key used to encrypt the Lambda function input
  # payload. If not set, the default AWS-managed key will be used.
  kms_key_arn = null

  # JSON text that will be passed to the lambda function on each invoke.
  lambda_function_input = null

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role for EventBridge Scheduler
  lambda_role_permissions_boundary_arn = null

  # Maximum amount of time, in seconds, to continue to make retry attempts.
  # Ranges from 60 to 86400 (default).
  maximum_event_age_in_seconds = 86400

  # Maximum number of retry attempts to make before the request fails. Ranges
  # from 0 to 185 (default).
  maximum_retry_attempts = 185

  # Maximum time window during which a schedule can be invoked. Ranges from 1 to
  # 1440 minutes. Must be set if flexible_time_window_enabled is true.
  maximum_window_in_minutes = null

  # The namespace to use for all resources created by this module. If not set,
  # var.lambda_function_name, with '-scheduled' as a suffix, is used.
  namespace = null

  # Timezone in which the scheduling expression is evaluated. When set, the
  # module uses an EventBridge Scheduler schedule (which is timezone and
  # daylight-savings aware) instead of the default EventBridge rule (which is
  # always UTC). Leave null to keep the default rule-based behavior. Example:
  # Australia/Sydney.
  schedule_expression_timezone = null

  # A map of tags to apply to the EventBridge (CloudWatch Event) rule created on
  # the default schedule path (when schedule_expression_timezone is null). Not
  # used on the EventBridge Scheduler path, since Scheduler does not support
  # tagging schedules; tag the Scheduler IAM role via var.iam_role_tags instead.
  tags = {}

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

<HclListItem name="lambda_function_arn" requirement="required" type="string">
<HclListItemDescription>

The ARN of the lambda function.

</HclListItemDescription>
</HclListItem>

<HclListItem name="lambda_function_name" requirement="required" type="string">
<HclListItemDescription>

The name of the lambda function.

</HclListItemDescription>
</HclListItem>

<HclListItem name="schedule_expression" requirement="required" type="string">
<HclListItemDescription>

An expression that defines the schedule for this lambda job. For example, cron(0 20 * * ? *) or rate(5 minutes).

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="assume_role_policy" requirement="optional" type="string">
<HclListItemDescription>

A custom assume role policy for the IAM role for EventBridge Scheduler. Only applies on the EventBridge Scheduler path (when schedule_expression_timezone is set). If not set, the default is a policy that allows the EventBridge Scheduler service to assume the IAM role, which is what most users will need. However, you can use this variable to override the policy for special cases.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to have this module skip creating resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if this module should create anything or not.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enforce_source_arn_condition" requirement="optional" type="bool">
<HclListItemDescription>

Flag to add confused-deputy conditions (aws:SourceArn scoped to this module's schedule group, plus
aws:SourceAccount) to the trust relationship of the IAM role, so only EventBridge Scheduler schedules in this
module's schedule group can assume the role. Per AWS guidance the condition is scoped to the schedule group ARN,
not an individual schedule ARN (a schedule ARN cannot be validated at create time). Only applies to the
EventBridge Scheduler path (when schedule_expression_timezone is set). In a future release, this will default to true.


</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="existing_role_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of existing IAM role that will be used by EventBridge Scheduler to invoke the Lambda function. If set, the module will not create any IAM entities and fully relies on caller to provide correct IAM role and its policies. Using the variable allows the module to leverage an existing IAM role - for example, when an account has centralized set of IAM entities, or when deploying same function across multiple AWS region to avoid the module attempting to create duplicate IAM entities.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="flexible_time_window_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Determines whether the schedule is invoked within a flexible time window.  Default is 'false' (don't run in a flexible time window)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

The name to use for the IAM role created for EventBridge Scheduler to invoke the Lambda function. If null, default to the namespace (<a href="#namespace"><code>namespace</code></a>). Only used if <a href="#existing_role_arn"><code>existing_role_arn</code></a> is null.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="iam_role_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the IAM role created for EventBridge Scheduler to invoke the function. Only used if <a href="#existing_role_arn"><code>existing_role_arn</code></a> is null.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

ARN of a customer-managed key used to encrypt the Lambda function input payload. If not set, the default AWS-managed key will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="lambda_function_input" requirement="optional" type="string">
<HclListItemDescription>

JSON text that will be passed to the lambda function on each invoke.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="lambda_role_permissions_boundary_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role for EventBridge Scheduler

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="maximum_event_age_in_seconds" requirement="optional" type="number">
<HclListItemDescription>

Maximum amount of time, in seconds, to continue to make retry attempts. Ranges from 60 to 86400 (default).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="86400"/>
</HclListItem>

<HclListItem name="maximum_retry_attempts" requirement="optional" type="number">
<HclListItemDescription>

Maximum number of retry attempts to make before the request fails. Ranges from 0 to 185 (default).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="185"/>
</HclListItem>

<HclListItem name="maximum_window_in_minutes" requirement="optional" type="number">
<HclListItemDescription>

Maximum time window during which a schedule can be invoked. Ranges from 1 to 1440 minutes. Must be set if flexible_time_window_enabled is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="namespace" requirement="optional" type="string">
<HclListItemDescription>

The namespace to use for all resources created by this module. If not set, <a href="#lambda_function_name"><code>lambda_function_name</code></a>, with '-scheduled' as a suffix, is used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="schedule_expression_timezone" requirement="optional" type="string">
<HclListItemDescription>

Timezone in which the scheduling expression is evaluated. When set, the module uses an EventBridge Scheduler schedule (which is timezone and daylight-savings aware) instead of the default EventBridge rule (which is always UTC). Leave null to keep the default rule-based behavior. Example: Australia/Sydney.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the EventBridge (CloudWatch Event) rule created on the default schedule path (when schedule_expression_timezone is null). Not used on the EventBridge Scheduler path, since Scheduler does not support tagging schedules; tag the Scheduler IAM role via <a href="#iam_role_tags"><code>iam_role_tags</code></a> instead.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="use_managed_iam_policies" requirement="optional" type="bool">
<HclListItemDescription>

When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="event_rule_arn">
<HclListItemDescription>

ARN of the EventBridge (CloudWatch Event) rule on the default schedule path. Null when schedule_expression_timezone is set (Scheduler path) or when create_resources is false.

</HclListItemDescription>
</HclListItem>

<HclListItem name="event_rule_schedule">
<HclListItemDescription>

Schedule expression of the EventBridge (CloudWatch Event) rule on the default schedule path. Null when schedule_expression_timezone is set (Scheduler path) or when create_resources is false.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eventbridge_scheduler_schedule_arn">
<HclListItemDescription>

ARN of the EventBridge Scheduler schedule. Null unless schedule_expression_timezone is set (Scheduler path).

</HclListItemDescription>
</HclListItem>

<HclListItem name="eventbridge_scheduler_schedule_expression">
<HclListItemDescription>

Schedule expression of the EventBridge Scheduler schedule. Null unless schedule_expression_timezone is set (Scheduler path).

</HclListItemDescription>
</HclListItem>

<HclListItem name="iam_role_arn">
<HclListItemDescription>

ARN of the IAM role used by EventBridge Scheduler to invoke the Lambda function (the created role, or existing_role_arn if provided). Null on the default rule path and when create_resources is false.

</HclListItemDescription>
</HclListItem>

<HclListItem name="iam_role_id">
<HclListItemDescription>

ID of the IAM role created for EventBridge Scheduler to invoke the Lambda function. Null on the default rule path (no IAM role is needed) and when create_resources is false.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.3.1/modules/scheduled-lambda-job/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.3.1/modules/scheduled-lambda-job/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/v1.3.1/modules/scheduled-lambda-job/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "4f22b55eb5eaeb15a5647b93fb2d0f8a"
}
##DOCS-SOURCER-END -->
