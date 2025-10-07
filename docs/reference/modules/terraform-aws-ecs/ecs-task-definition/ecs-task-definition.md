---
title: "ECS Task Definition Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon ECS" version="1.2.0" lastModifiedVersion="1.2.0"/>

# ECS Task Definition Module

<a href="https://github.com/gruntwork-io/terraform-aws-ecs/tree/v1.2.0/modules/ecs-task-definition" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v1.2.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This terraform module creates an [ECS task definition](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html) that defines the Docker containers to be run.

## How do you configure your ECS task?

This module provides support for configuring the following aspects of your ECS task:

*   Container Definitions
*   Network Mode
*   Volumes and EFS Volumes
*   IAM Roles for Tasks and Task Execution
*   Fargate Configuration (CPU, Memory)
*   Runtime Platform
*   Proxy Configuration
*   Task Execution Command (ECS Exec)
*   Tagging

### Basic Usage

```hcl
module "ecs_task_definition" {
  source = "./modules/ecs-task-definition"

  task_definition_name              = "my-task-definition"
  ecs_task_container_definitions    = jsonencode([
    {
      name  = "my-container"
      image = "nginx:latest"
      ports = [
        {
          containerPort = 80
        }
      ]
    }
  ])
}
```

### Fargate Configuration

```hcl
module "ecs_task_definition" {
  source = "./modules/ecs-task-definition"

  task_definition_name              = "my-fargate-task"
  ecs_task_container_definitions    = jsonencode([
    {
      name  = "my-container"
      image = "nginx:latest"
      ports = [
        {
          containerPort = 80
        }
      ]
    }
  ])

  task_cpu    = 256
  task_memory = 512
}
```

### Using Existing IAM Roles

```hcl
module "ecs_task_definition" {
  source = "./modules/ecs-task-definition"

  task_definition_name              = "my-task-with-existing-roles"
  ecs_task_container_definitions    = jsonencode([
    {
      name  = "my-container"
      image = "nginx:latest"
    }
  ])

  existing_ecs_task_role_name              = "my-existing-task-role"
  existing_ecs_task_execution_role_name    = "my-existing-task-execution-role"
}
```

## What are the required variables?

*   `task_definition_name` - The name of the task definition
*   `ecs_task_container_definitions` - The JSON text of the ECS Task Container Definitions

## What are the optional variables?

See [variables.tf](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v1.2.0/modules/ecs-task-definition/variables.tf) for all the variables you can set on this module.

## What does this module output?

See [outputs.tf](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v1.2.0/modules/ecs-task-definition/outputs.tf) for all the outputs this module provides.

## How do I use this with ecs-task-scheduler?

The ecs-task-definition module is designed to be used by the ecs-task-scheduler module. The scheduler will:

1.  Create a task definition using this module
2.  Reference the task definition ARN in its configuration
3.  Use the IAM roles created by this module for scheduled task execution

## How do I add IAM policies to the task?

IAM policies should be attached to the IAM roles created by this module. The module creates two roles:

*   Task IAM role (used for the task itself)
*   Task execution IAM role (used for task execution)

These roles can be referenced using the outputs:

*   `ecs_task_iam_role_name` and `ecs_task_iam_role_arn`
*   `ecs_task_execution_iam_role_name` and `ecs_task_execution_iam_role_arn`

## How do I use Fargate?

To use Fargate, set the `ecs_task_definition_network_mode` to `awsvpc` and provide `task_cpu` and `task_memory` values. The module will automatically configure the task for Fargate launch type.

## How do I use ECS Exec?

To enable ECS Exec, set `enable_execute_command` to `true`. This will create the necessary IAM policies and permissions for ECS Exec functionality.

## How do I use volumes?

The module supports both regular volumes and EFS volumes. Configure them using the `volumes` and `efs_volumes` variables respectively.

## How do I use proxy configuration?

The module supports App Mesh proxy configuration. Configure it using the `proxy_configuration` variable.

## How do I use runtime platform?

For Graviton instances, configure the `runtime_platform` variable with the appropriate operating system family and CPU architecture.

## How do I tag my task definition?

Use the `task_definition_tags` variable to apply tags to your task definition.

See [variables.tf](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v1.2.0/modules/ecs-task-definition/variables.tf) for specific variable definitions.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ECS-TASK-DEFINITION MODULE
# ------------------------------------------------------------------------------------------------------

module "ecs_task_definition" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-ecs.git//modules/ecs-task-definition?ref=v1.2.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The JSON text of the ECS Task Container Definitions. This portion of the ECS
  # Task Definition defines the Docker container(s) to be run along with all
  # their properties. It should adhere to the format described at
  # https://goo.gl/ob5U3g.
  ecs_task_container_definitions = <string>

  # The name of the task definition. This is used to namespace all resources
  # created by this module.
  task_definition_name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of additional principals who can assume the task and task execution
  # roles
  additional_task_assume_role_policy_principals = []

  # The capacity provider strategy to use for the service. Note that the
  # capacity providers have to be present on ECS cluster before deploying ECS
  # service. When provided, var.launch_type is ignored.
  capacity_provider_strategy = []

  # Prefix for name of the IAM role used by the ECS task. If not provide, will
  # be set to var.task_definition_name.
  custom_iam_role_name_prefix = null

  # Prefix for name of task execution IAM role and policy that grants access to
  # CloudWatch and ECR. If not provide, will be set to var.task_definition_name.
  custom_task_execution_name_prefix = null

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # The Docker networking mode to use for the containers in the task. The valid
  # values are none, bridge, awsvpc, and host
  ecs_task_definition_network_mode = "bridge"

  # Process namespace to use for the containers in the task. The valid values
  # are host and task.
  ecs_task_definition_pid_mode = null

  # (Optional) A map of EFS volumes that containers in your task may use. Each
  # item in the list should be a map compatible with
  # https://www.terraform.io/docs/providers/aws/r/ecs_task_definition.html#efs-volume-configuration-arguments.
  efs_volumes = {}

  # Specifies whether to enable Amazon ECS Exec for the tasks within the
  # service.
  enable_execute_command = false

  # The name of the existing task execution role to be used in place of creating
  # a new role.
  existing_ecs_task_execution_role_name = null

  # The name of the existing task role to be used in place of creating a new
  # role.
  existing_ecs_task_role_name = null

  # The launch type of the ECS service. Defaults to null, which will result in
  # using the default capacity provider strategyfrom the ECS cluster. Valid
  # value must be one of EC2 or FARGATE. When using FARGATE, you must set the
  # network mode to awsvpc and configure it. When using EC2, you can configure
  # the placement strategy using the variables ordered_placement_strategy,
  # placement_constraint_type, placement_constraint_expression. This variable is
  # ignored if var.capacity_provider_strategy is provided.
  launch_type = null

  # Configuration block for the App Mesh proxy. The only supported value for
  # `type` is "APPMESH". Use the name of the Envoy proxy container from
  # `container_definitions` as the `container_name`. `properties` is a map of
  # network configuration parameters to provide the Container Network Interface
  # (CNI) plugin.
  proxy_configuration = null

  # Define runtime platform options
  runtime_platform = null

  # The CPU units for the instances that Fargate will spin up. Options here:
  # https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html#fargate-tasks-size.
  # Required when using FARGATE launch type.
  task_cpu = null

  # A map of tags to apply to the task definition. Each item in this list should
  # be a map with the parameters key and value.
  task_definition_tags = {}

  # Ephemeral storage size for Fargate tasks. See:
  # https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#task_definition_ephemeralStorage
  task_ephemeral_storage = null

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role for the ECS task execution.
  task_execution_role_permissions_boundary_arn = null

  # The memory units for the instances that Fargate will spin up. Options here:
  # https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html#fargate-tasks-size.
  # Required when using FARGATE launch type.
  task_memory = null

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role for the ECS task.
  task_role_permissions_boundary_arn = null

  # (Optional) A map of volume blocks that containers in your task may use. The
  # key should be the name of the volume and the value should be a map
  # compatible with
  # https://www.terraform.io/docs/providers/aws/r/ecs_task_definition.html#volume-block-arguments,
  # but not including the name parameter.
  volumes = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ECS-TASK-DEFINITION MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-ecs.git//modules/ecs-task-definition?ref=v1.2.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The JSON text of the ECS Task Container Definitions. This portion of the ECS
  # Task Definition defines the Docker container(s) to be run along with all
  # their properties. It should adhere to the format described at
  # https://goo.gl/ob5U3g.
  ecs_task_container_definitions = <string>

  # The name of the task definition. This is used to namespace all resources
  # created by this module.
  task_definition_name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of additional principals who can assume the task and task execution
  # roles
  additional_task_assume_role_policy_principals = []

  # The capacity provider strategy to use for the service. Note that the
  # capacity providers have to be present on ECS cluster before deploying ECS
  # service. When provided, var.launch_type is ignored.
  capacity_provider_strategy = []

  # Prefix for name of the IAM role used by the ECS task. If not provide, will
  # be set to var.task_definition_name.
  custom_iam_role_name_prefix = null

  # Prefix for name of task execution IAM role and policy that grants access to
  # CloudWatch and ECR. If not provide, will be set to var.task_definition_name.
  custom_task_execution_name_prefix = null

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # The Docker networking mode to use for the containers in the task. The valid
  # values are none, bridge, awsvpc, and host
  ecs_task_definition_network_mode = "bridge"

  # Process namespace to use for the containers in the task. The valid values
  # are host and task.
  ecs_task_definition_pid_mode = null

  # (Optional) A map of EFS volumes that containers in your task may use. Each
  # item in the list should be a map compatible with
  # https://www.terraform.io/docs/providers/aws/r/ecs_task_definition.html#efs-volume-configuration-arguments.
  efs_volumes = {}

  # Specifies whether to enable Amazon ECS Exec for the tasks within the
  # service.
  enable_execute_command = false

  # The name of the existing task execution role to be used in place of creating
  # a new role.
  existing_ecs_task_execution_role_name = null

  # The name of the existing task role to be used in place of creating a new
  # role.
  existing_ecs_task_role_name = null

  # The launch type of the ECS service. Defaults to null, which will result in
  # using the default capacity provider strategyfrom the ECS cluster. Valid
  # value must be one of EC2 or FARGATE. When using FARGATE, you must set the
  # network mode to awsvpc and configure it. When using EC2, you can configure
  # the placement strategy using the variables ordered_placement_strategy,
  # placement_constraint_type, placement_constraint_expression. This variable is
  # ignored if var.capacity_provider_strategy is provided.
  launch_type = null

  # Configuration block for the App Mesh proxy. The only supported value for
  # `type` is "APPMESH". Use the name of the Envoy proxy container from
  # `container_definitions` as the `container_name`. `properties` is a map of
  # network configuration parameters to provide the Container Network Interface
  # (CNI) plugin.
  proxy_configuration = null

  # Define runtime platform options
  runtime_platform = null

  # The CPU units for the instances that Fargate will spin up. Options here:
  # https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html#fargate-tasks-size.
  # Required when using FARGATE launch type.
  task_cpu = null

  # A map of tags to apply to the task definition. Each item in this list should
  # be a map with the parameters key and value.
  task_definition_tags = {}

  # Ephemeral storage size for Fargate tasks. See:
  # https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#task_definition_ephemeralStorage
  task_ephemeral_storage = null

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role for the ECS task execution.
  task_execution_role_permissions_boundary_arn = null

  # The memory units for the instances that Fargate will spin up. Options here:
  # https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html#fargate-tasks-size.
  # Required when using FARGATE launch type.
  task_memory = null

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role for the ECS task.
  task_role_permissions_boundary_arn = null

  # (Optional) A map of volume blocks that containers in your task may use. The
  # key should be the name of the volume and the value should be a map
  # compatible with
  # https://www.terraform.io/docs/providers/aws/r/ecs_task_definition.html#volume-block-arguments,
  # but not including the name parameter.
  volumes = {}

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="ecs_task_container_definitions" requirement="required" type="string">
<HclListItemDescription>

The JSON text of the ECS Task Container Definitions. This portion of the ECS Task Definition defines the Docker container(s) to be run along with all their properties. It should adhere to the format described at https://goo.gl/ob5U3g.

</HclListItemDescription>
</HclListItem>

<HclListItem name="task_definition_name" requirement="required" type="string">
<HclListItemDescription>

The name of the task definition. This is used to namespace all resources created by this module.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="additional_task_assume_role_policy_principals" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of additional principals who can assume the task and task execution roles

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="capacity_provider_strategy" requirement="optional" type="list(object(…))">
<HclListItemDescription>

The capacity provider strategy to use for the service. Note that the capacity providers have to be present on ECS cluster before deploying ECS service. When provided, <a href="#launch_type"><code>launch_type</code></a> is ignored.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    capacity_provider = string
    weight            = number
    base              = number
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   capacity_provider_strategy = [
      {
        capacity_provider = "FARGATE"
        weight            = 1
        base              = 2
      },
      {
        capacity_provider = "FARGATE_SPOT"
        weight            = 2
        base              = null
      },
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="custom_iam_role_name_prefix" requirement="optional" type="string">
<HclListItemDescription>

Prefix for name of the IAM role used by the ECS task. If not provide, will be set to <a href="#task_definition_name"><code>task_definition_name</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_task_execution_name_prefix" requirement="optional" type="string">
<HclListItemDescription>

Prefix for name of task execution IAM role and policy that grants access to CloudWatch and ECR. If not provide, will be set to <a href="#task_definition_name"><code>task_definition_name</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="dependencies" requirement="optional" type="list(string)">
<HclListItemDescription>

Create a dependency between the resources in this module to the interpolated values in this list (and thus the source resources). In other words, the resources in this module will now depend on the resources backing the values in this list such that those resources need to be created before the resources in this module, and the resources in this module need to be destroyed before the resources in the list.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ecs_task_definition_network_mode" requirement="optional" type="string">
<HclListItemDescription>

The Docker networking mode to use for the containers in the task. The valid values are none, bridge, awsvpc, and host

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;bridge&quot;"/>
</HclListItem>

<HclListItem name="ecs_task_definition_pid_mode" requirement="optional" type="string">
<HclListItemDescription>

Process namespace to use for the containers in the task. The valid values are host and task.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="efs_volumes" requirement="optional" type="map(object(…))">
<HclListItemDescription>

(Optional) A map of EFS volumes that containers in your task may use. Each item in the list should be a map compatible with https://www.terraform.io/docs/providers/aws/r/ecs_task_definition.html#efs-volume-configuration-arguments.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    file_system_id          = string # required
    container_path          = string # required
    root_directory          = string
    transit_encryption      = string
    transit_encryption_port = number
    access_point_id         = string
    iam                     = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   efs_volumes = {
     jenkins = {
       file_system_id          = "fs-a1bc234d"
       container_path          = "/efs"
       root_directory          = "/jenkins"
       transit_encryption      = "ENABLED"
       transit_encryption_port = 2999
       access_point_id         = "fsap-123a4b5c5d7891234"
       iam                     = "ENABLED"
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="enable_execute_command" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether to enable Amazon ECS Exec for the tasks within the service.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="existing_ecs_task_execution_role_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the existing task execution role to be used in place of creating a new role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="existing_ecs_task_role_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the existing task role to be used in place of creating a new role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="launch_type" requirement="optional" type="string">
<HclListItemDescription>

The launch type of the ECS service. Defaults to null, which will result in using the default capacity provider strategyfrom the ECS cluster. Valid value must be one of EC2 or FARGATE. When using FARGATE, you must set the network mode to awsvpc and configure it. When using EC2, you can configure the placement strategy using the variables ordered_placement_strategy, placement_constraint_type, placement_constraint_expression. This variable is ignored if <a href="#capacity_provider_strategy"><code>capacity_provider_strategy</code></a> is provided.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="proxy_configuration" requirement="optional" type="object(…)">
<HclListItemDescription>

Configuration block for the App Mesh proxy. The only supported value for `type` is 'APPMESH'. Use the name of the Envoy proxy container from `container_definitions` as the `container_name`. `properties` is a map of network configuration parameters to provide the Container Network Interface (CNI) plugin.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    type           = string
    container_name = string
    properties     = map(string)
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   proxy_configuration = {
     type           = "APPMESH"
     container_name = "applicationContainerName"
     properties = {
       AppPorts         = "8080"
       EgressIgnoredIPs = "169.254.170.2,169.254.169.254"
       IgnoredUID       = "1337"
       ProxyEgressPort  = 15001
       ProxyIngressPort = 15000
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="runtime_platform" requirement="optional" type="object(…)">
<HclListItemDescription>

Define runtime platform options

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    operating_system_family = string
    cpu_architecture        = string
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="task_cpu" requirement="optional" type="number">
<HclListItemDescription>

The CPU units for the instances that Fargate will spin up. Options here: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html#fargate-tasks-size. Required when using FARGATE launch type.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="task_definition_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the task definition. Each item in this list should be a map with the parameters key and value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="task_ephemeral_storage" requirement="optional" type="number">
<HclListItemDescription>

Ephemeral storage size for Fargate tasks. See: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#task_definition_ephemeralStorage

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="task_execution_role_permissions_boundary_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role for the ECS task execution.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="task_memory" requirement="optional" type="number">
<HclListItemDescription>

The memory units for the instances that Fargate will spin up. Options here: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html#fargate-tasks-size. Required when using FARGATE launch type.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="task_role_permissions_boundary_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role for the ECS task.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="volumes" requirement="optional" type="any">
<HclListItemDescription>

(Optional) A map of volume blocks that containers in your task may use. The key should be the name of the volume and the value should be a map compatible with https://www.terraform.io/docs/providers/aws/r/ecs_task_definition.html#volume-block-arguments, but not including the name parameter.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   volumes = {
     datadog = {
       host_path = "/var/run/datadog"
     }
  
     logs = {
       host_path = "/var/log"
       docker_volume_configuration = {
         scope         = "shared"
         autoprovision = true
         driver        = "local"
       }
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="ecs_task_execution_iam_role_arn">
</HclListItem>

<HclListItem name="ecs_task_execution_iam_role_name">
</HclListItem>

<HclListItem name="ecs_task_iam_role_arn">
</HclListItem>

<HclListItem name="ecs_task_iam_role_name">
</HclListItem>

<HclListItem name="task_definition_arn">
</HclListItem>

<HclListItem name="task_definition_family">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-ecs/tree/v1.2.0/modules/ecs-task-definition/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-ecs/tree/v1.2.0/modules/ecs-task-definition/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-ecs/tree/v1.2.0/modules/ecs-task-definition/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "dabac18ff20182f08ac528957fe9b591"
}
##DOCS-SOURCER-END -->
