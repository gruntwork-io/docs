---
title: "ECS Task Scheduler Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon ECS" version="0.38.4" lastModifiedVersion="0.38.0"/>

# ECS Task Scheduler Module

<a href="https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/modules/ecs-task-scheduler" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.38.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This terraform module allows for [scheduling of ECS tasks](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/scheduling_tasks.html)

## How do you configure when the ECS task will run?

This module provides two options for defining when ECS tasks will be run:

*   [Event Patterns](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-patterns.html)
*   [Schedule Expressions](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-rule-schedule.html#eb-rate-expressions)

In [variables.tf](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/modules/ecs-task-scheduler/variables.tf) there are two variables (`task_event_pattern` and `task_schedule_expression`) that can be provided in the module definition. At least one, but not both of these fields, must be provided. This is what is passed to the EventBridge rule to determine when to invoke your ECS task.

Note that this approach has AWS limitations with monitoring the event trigger and ECS task. AWS EventBridge fires the event but does not monitor whether the task ran successfully so if there is a failure, EventBridge does not attempt any retries or report failures.

### Event Patterns

The event pattern variable is a json string that defines which events to listen to and invoke your ECS task from.

```hcl
module "ecs_task_scheduler" {

  task_event_pattern = <<EOF
    {
      "source": ["aws.ec2"],
      "detail-type": ["EC2 Instance State-change Notification"],
      "detail": {
        "state": ["terminated"]
      }
    }
  EOF

  #(additional arguments omitted)
}
```

For more information see the [AWS Documentation on event rule patterns](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-rule.html)

### Schedule Expressions

With schedule expressions, you can define based on Cron schedules, and rate expressions. For more information on how to use expressions see AWS documention and examples below:

*   [Cron Expressions](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-rule-schedule.html#eb-cron-expressions)
*   [Rate Expressions](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-rule-schedule.html#eb-rate-expressions)

```hcl
module "ecs_task_scheduler" {

  task_schedule_expression = "rate(5 minutes)"  

  #(additional arguments omitted)
}
```

```hcl
module "ecs_task_scheduler" {

  task_schedule_expression = "cron(0 12 * * ? *)"  

  #(additional arguments omitted)
}
```

For more information see the [AWS Documentation on schedule rules](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-rule-schedule.html)

## Can I enable or disable the rule?

The rule is enabled by default, and can be disabled by setting the `is_enabled` variable to `false`

## Can I use my own IAM role?

To provide an IAM role instead of using the role provided by the module you can:

*   Set `create_iam_role` variable to `false`
*   Provide the IAM role ARN to the `ecs_task_iam_role_arn` variable

## How do I pass inputs and overrides to my ECS task from the EventBridge rule?

This module provides support for passing the following additional inputs and overrides:

*   Task Count

*   Target Group

*   Launch Type

*   Platform Version

*   Propagate Tags

*   Enable Execute Command

*   Enable ECS Managed Tags

*   Network Configuration

    Example Network Configuration Block

    ```hcl
    module "ecs_task_scheduler" {

      ecs_target_network_configuration = {
        assign_public_ip = false
        security_groups = [
          "sg-xxxx"
        ]
        subnets = [
          "subnet-xxxx",
          "subnet-xxxx"
        ]
      }

      #(additional arguments omitted)
    }
    ```

    Note that `subnets` is the only required parameter if the `network_configuration` block is defined.

*   Placement Contstraints

    Example Placement Constraints Configuration Block

    ```hcl
    module "ecs_task_scheduler" {

      ecs_target_placement_constraints = [
        {
          type = "memberOf"
          expression = "attribute:ecs.availability-zone in [us-west-2a, us-west-2b, us-west-2c, us-west-2d]"
        },
        {
          type = "memberOf"
          expression = "attribute:ecs.subnet-id in [subnet-xxxx]"
        }
      ]

      #(additional arguments omitted)
    }
    ```

    Note that there is a maximum limit of 10 placement constraint objects.
    See [AWS Documention for additional](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-placement-constraints.html) information on placement constraints

*   Container Overrides

    Example Container Overrides configuration input

    ```hcl
    module "ecs_task_scheduler" {

      ecs_target_container_overrides = <<DOC
        {
          "containerOverrides": [
            {
              "name": "name-of-container-to-override",
              "command": ["bin/console", "scheduled-task"]
            }
          ]
        }
      DOC

      #(additional arguments omitted)
    }
    ```

See [variables.tf](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/modules/ecs-task-scheduler/variables.tf) for specific variable definitions.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ECS-TASK-SCHEDULER MODULE
# ------------------------------------------------------------------------------------------------------

module "ecs_task_scheduler" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-ecs.git//modules/ecs-task-scheduler?ref=v0.38.4"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The arn of the ECS cluster to use.
  ecs_target_cluster_arn = <string>

  # The task definition ARN for cloudwatch schedule to run.
  ecs_target_task_definition_arn = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Creation of the Eventbridge IAM role within the module. If omitted IAM role
  # ARN must be provided in ecs_task_iam_role variable.
  create_iam_role = true

  # String of JSON that defines container overrides that are passed to the task.
  ecs_target_container_overrides = null

  # Whether or not to enable the execute command functionality for the
  # containers in this task.
  ecs_target_enable_execute_command = null

  # Specifies an ECS task group for the task.
  ecs_target_group = null

  # Specifies the launch type on which your task is running.
  ecs_target_launch_type = null

  # Object that defines the target network configuration.
  ecs_target_network_configuration = null

  # An array of placement constraint objects to use for the task.
  ecs_target_placement_constraints = []

  # Specifies the platform version for the task.
  ecs_target_platform_version = null

  # Specifies whether to propagate the tags from the task definition to the
  # task.
  ecs_target_propagate_tags = null

  # The number of tasks to create based on the TaskDefinition.
  ecs_target_task_count = 1

  # ARN of IAM role for eventbridge to use. Only use if create_iam_role is set
  # to true
  ecs_task_iam_role = null

  # Specifies whether to enable Amazon ECS managed tags for the task.
  enable_ecs_managed_tags = null

  # Set to true to enable the rule and false to disable
  is_enabled = true

  # The event pattern to use. See README for usage examples. Leave null if using
  # task_schedule_expression.
  task_event_pattern = null

  # The scheduling expression to use (rate or cron - see README for usage
  # examples). Leave null if using task_event_pattern.
  task_schedule_expression = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ECS-TASK-SCHEDULER MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-ecs.git//modules/ecs-task-scheduler?ref=v0.38.4"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The arn of the ECS cluster to use.
  ecs_target_cluster_arn = <string>

  # The task definition ARN for cloudwatch schedule to run.
  ecs_target_task_definition_arn = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Creation of the Eventbridge IAM role within the module. If omitted IAM role
  # ARN must be provided in ecs_task_iam_role variable.
  create_iam_role = true

  # String of JSON that defines container overrides that are passed to the task.
  ecs_target_container_overrides = null

  # Whether or not to enable the execute command functionality for the
  # containers in this task.
  ecs_target_enable_execute_command = null

  # Specifies an ECS task group for the task.
  ecs_target_group = null

  # Specifies the launch type on which your task is running.
  ecs_target_launch_type = null

  # Object that defines the target network configuration.
  ecs_target_network_configuration = null

  # An array of placement constraint objects to use for the task.
  ecs_target_placement_constraints = []

  # Specifies the platform version for the task.
  ecs_target_platform_version = null

  # Specifies whether to propagate the tags from the task definition to the
  # task.
  ecs_target_propagate_tags = null

  # The number of tasks to create based on the TaskDefinition.
  ecs_target_task_count = 1

  # ARN of IAM role for eventbridge to use. Only use if create_iam_role is set
  # to true
  ecs_task_iam_role = null

  # Specifies whether to enable Amazon ECS managed tags for the task.
  enable_ecs_managed_tags = null

  # Set to true to enable the rule and false to disable
  is_enabled = true

  # The event pattern to use. See README for usage examples. Leave null if using
  # task_schedule_expression.
  task_event_pattern = null

  # The scheduling expression to use (rate or cron - see README for usage
  # examples). Leave null if using task_event_pattern.
  task_schedule_expression = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="ecs_target_cluster_arn" requirement="required" type="string">
<HclListItemDescription>

The arn of the ECS cluster to use.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecs_target_task_definition_arn" requirement="required" type="string">
<HclListItemDescription>

The task definition ARN for cloudwatch schedule to run.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="create_iam_role" requirement="optional" type="bool">
<HclListItemDescription>

Creation of the Eventbridge IAM role within the module. If omitted IAM role ARN must be provided in ecs_task_iam_role variable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="ecs_target_container_overrides" requirement="optional" type="string">
<HclListItemDescription>

String of JSON that defines container overrides that are passed to the task.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ecs_target_enable_execute_command" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to enable the execute command functionality for the containers in this task.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ecs_target_group" requirement="optional" type="string">
<HclListItemDescription>

Specifies an ECS task group for the task.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ecs_target_launch_type" requirement="optional" type="string">
<HclListItemDescription>

Specifies the launch type on which your task is running.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ecs_target_network_configuration" requirement="optional">
<HclListItemDescription>

Object that defines the target network configuration.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ecs_target_placement_constraints" requirement="optional" type="list(map(…))">
<HclListItemDescription>

An array of placement constraint objects to use for the task.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(map(string))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ecs_target_platform_version" requirement="optional" type="string">
<HclListItemDescription>

Specifies the platform version for the task.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ecs_target_propagate_tags" requirement="optional" type="string">
<HclListItemDescription>

Specifies whether to propagate the tags from the task definition to the task.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ecs_target_task_count" requirement="optional" type="number">
<HclListItemDescription>

The number of tasks to create based on the TaskDefinition.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="ecs_task_iam_role" requirement="optional" type="string">
<HclListItemDescription>

ARN of IAM role for eventbridge to use. Only use if create_iam_role is set to true

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="enable_ecs_managed_tags" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether to enable Amazon ECS managed tags for the task.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="is_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable the rule and false to disable

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="task_event_pattern" requirement="optional" type="string">
<HclListItemDescription>

The event pattern to use. See README for usage examples. Leave null if using task_schedule_expression.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="task_schedule_expression" requirement="optional" type="string">
<HclListItemDescription>

The scheduling expression to use (rate or cron - see README for usage examples). Leave null if using task_event_pattern.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="ecs_events_iam_role_arn">
</HclListItem>

<HclListItem name="ecs_events_iam_role_name">
</HclListItem>

<HclListItem name="ecs_schedule_task_rule_arn">
</HclListItem>

<HclListItem name="ecs_schedule_task_rule_name">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/modules/ecs-task-scheduler/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/modules/ecs-task-scheduler/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/modules/ecs-task-scheduler/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "2ce5e26d5c034c67b6277f0ffc451d33"
}
##DOCS-SOURCER-END -->
