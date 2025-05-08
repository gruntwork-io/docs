---
title: "ECS Daemon Service Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon ECS" version="1.0.0" lastModifiedVersion="0.38.7"/>

# ECS Daemon Service Module

<a href="https://github.com/gruntwork-io/terraform-aws-ecs/tree/v1.0.0/modules/ecs-daemon-service" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.38.7" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module creates an [ECS Daemon Service](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html)
that you can use to deploy exactly one task on each active container instance that meets all of the task placement constraints
specified in your cluster.

## What is an ECS Daemon Service?

To run Docker daemon containers with ECS, you first define an [ECS
Task](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_defintions.html), which is a JSON file that
describes what container(s) to run, the resources (memory, CPU) those containers need, the volumes to mount, the
environment variables to set, and so on. To actually run an ECS Task, you define an ECS Daemon Service, which will:

1.  Deploy exactly one task on each active container instance.
2.  Restart tasks if they fail.

## How do you create an ECS cluster?

To use ECS, you first deploy one or more EC2 Instances into a "cluster". See the [ecs-cluster module](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v1.0.0/modules/ecs-cluster)
for how to create a cluster.

## How do you add additional IAM policies?

If you associate this ECS Service with a single ELB, then we create an IAM Role and
associated IAM Policies that allow the ECS Service to talk to the ELB. To add additional IAM policies to this IAM Role,
you can use the [aws_iam_role_policy](https://www.terraform.io/docs/providers/aws/r/iam_role_policy.html) or
[aws_iam_policy_attachment](https://www.terraform.io/docs/providers/aws/r/iam_policy_attachment.html) resources, and
set the IAM role id to the Terraform output of this module called `service_iam_role_id` . For example, here is how
you can allow the ECS Service in this cluster to access an S3 bucket:

```hcl
module "ecs_daemon_service" {
  # (arguments omitted)
}

resource "aws_iam_role_policy" "access_s3_bucket" {
    name = "access_s3_bucket"
    role = "${module.ecs_daemon_service.service_iam_role_arn}"
    policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect":"Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::examplebucket/*"
    }
  ]
}
EOF
}
```

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ECS-DAEMON-SERVICE MODULE
# ------------------------------------------------------------------------------------------------------

module "ecs_daemon_service" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-ecs.git//modules/ecs-daemon-service?ref=v1.0.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The Amazon Resource Name (ARN) of the ECS Cluster where this service should
  # run.
  ecs_cluster_arn = <string>

  # The JSON text of the ECS Task Container Definitions. This portion of the ECS
  # Task Definition defines the Docker container(s) to be run along with all
  # their properties. It should adhere to the format described at
  # https://goo.gl/ob5U3g.
  ecs_task_container_definitions = <string>

  # The name of the service. This is used to namespace all resources created by
  # this module.
  service_name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of additional principals who can assume the task and task execution
  # roles
  additional_task_assume_role_policy_principals = []

  # ECS automatically redistributes tasks within a service across Availability
  # Zones (AZs) to mitigate the risk of impaired application availability due to
  # underlying infrastructure failures and task lifecycle activities. The valid
  # values are ENABLED and DISABLED. Defaults to DISABLED.
  availability_zone_rebalancing = "DISABLED"

  # Prefix for name of the IAM role used by the ECS task. If not provide, will
  # be set to var.service_name.
  custom_iam_role_name_prefix = null

  # A map of tags to apply to all resources created by this module. Each item in
  # this list should be a map with the parameters key and value.
  custom_tags = {}

  # Prefix for name of iam role and policy that allows cloudwatch and ecr access
  custom_task_execution_name_prefix = null

  # Type of deployment controller, possible values: CODE_DEPLOY, ECS, EXTERNAL
  deployment_controller = null

  # (Optional) The lower limit (as a percentage of the service's desiredCount)
  # of the number of running tasks that must remain running and healthy in a
  # service during a deployment
  deployment_minimum_healthy_percent = null

  # The Docker networking mode to use for the containers in the task. The valid
  # values are none, bridge, awsvpc, and host
  ecs_task_definition_network_mode = "bridge"

  # The process namespace to use for the containers in the task. The valid
  # values are host and task.
  ecs_task_definition_pid_mode = "task"

  # The launch type on which to run your service. The valid values are EC2 and
  # FARGATE. Defaults to EC2
  launch_type = "EC2"

  placement_constraint_expression = "attribute:ecs.ami-id != 'ami-fake'"

  placement_constraint_type = "memberOf"

  # Whether tags should be propogated to the tasks from the service or from the
  # task definition. Valid values are SERVICE and TASK_DEFINITION. Defaults to
  # SERVICE. If set to null, no tags are created for tasks.
  propagate_tags = "SERVICE"

  # Use this variable to adjust the default timeout of 20m for create and update
  # operations the the ECS service. Adjusting the value can be particularly
  # useful when using 'wait_for_steady_state'.
  service_create_update_timeout = "20m"

  # A map of tags to apply to the ECS service. Each item in this list should be
  # a map with the parameters key and value.
  service_tags = {}

  # A map of tags to apply to the task definition. Each item in this list should
  # be a map with the parameters key and value.
  task_definition_tags = {}

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role for the ECS task execution.
  task_execution_role_permissions_boundary_arn = null

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role for the ECS task.
  task_role_permissions_boundary_arn = null

  # (Optional) A map of volume blocks that containers in your task may use. The
  # key should be the name of the volume and the value should be a map
  # compatible with
  # https://www.terraform.io/docs/providers/aws/r/ecs_task_definition.html#volume-block-arguments,
  # but not including the name parameter.
  volumes = {}

  # If true, Terraform will wait for the service to reach a steady state—as in,
  # the ECS tasks you wanted are actually deployed—before 'apply' is considered
  # complete.
  wait_for_steady_state = true

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ECS-DAEMON-SERVICE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-ecs.git//modules/ecs-daemon-service?ref=v1.0.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The Amazon Resource Name (ARN) of the ECS Cluster where this service should
  # run.
  ecs_cluster_arn = <string>

  # The JSON text of the ECS Task Container Definitions. This portion of the ECS
  # Task Definition defines the Docker container(s) to be run along with all
  # their properties. It should adhere to the format described at
  # https://goo.gl/ob5U3g.
  ecs_task_container_definitions = <string>

  # The name of the service. This is used to namespace all resources created by
  # this module.
  service_name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of additional principals who can assume the task and task execution
  # roles
  additional_task_assume_role_policy_principals = []

  # ECS automatically redistributes tasks within a service across Availability
  # Zones (AZs) to mitigate the risk of impaired application availability due to
  # underlying infrastructure failures and task lifecycle activities. The valid
  # values are ENABLED and DISABLED. Defaults to DISABLED.
  availability_zone_rebalancing = "DISABLED"

  # Prefix for name of the IAM role used by the ECS task. If not provide, will
  # be set to var.service_name.
  custom_iam_role_name_prefix = null

  # A map of tags to apply to all resources created by this module. Each item in
  # this list should be a map with the parameters key and value.
  custom_tags = {}

  # Prefix for name of iam role and policy that allows cloudwatch and ecr access
  custom_task_execution_name_prefix = null

  # Type of deployment controller, possible values: CODE_DEPLOY, ECS, EXTERNAL
  deployment_controller = null

  # (Optional) The lower limit (as a percentage of the service's desiredCount)
  # of the number of running tasks that must remain running and healthy in a
  # service during a deployment
  deployment_minimum_healthy_percent = null

  # The Docker networking mode to use for the containers in the task. The valid
  # values are none, bridge, awsvpc, and host
  ecs_task_definition_network_mode = "bridge"

  # The process namespace to use for the containers in the task. The valid
  # values are host and task.
  ecs_task_definition_pid_mode = "task"

  # The launch type on which to run your service. The valid values are EC2 and
  # FARGATE. Defaults to EC2
  launch_type = "EC2"

  placement_constraint_expression = "attribute:ecs.ami-id != 'ami-fake'"

  placement_constraint_type = "memberOf"

  # Whether tags should be propogated to the tasks from the service or from the
  # task definition. Valid values are SERVICE and TASK_DEFINITION. Defaults to
  # SERVICE. If set to null, no tags are created for tasks.
  propagate_tags = "SERVICE"

  # Use this variable to adjust the default timeout of 20m for create and update
  # operations the the ECS service. Adjusting the value can be particularly
  # useful when using 'wait_for_steady_state'.
  service_create_update_timeout = "20m"

  # A map of tags to apply to the ECS service. Each item in this list should be
  # a map with the parameters key and value.
  service_tags = {}

  # A map of tags to apply to the task definition. Each item in this list should
  # be a map with the parameters key and value.
  task_definition_tags = {}

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role for the ECS task execution.
  task_execution_role_permissions_boundary_arn = null

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role for the ECS task.
  task_role_permissions_boundary_arn = null

  # (Optional) A map of volume blocks that containers in your task may use. The
  # key should be the name of the volume and the value should be a map
  # compatible with
  # https://www.terraform.io/docs/providers/aws/r/ecs_task_definition.html#volume-block-arguments,
  # but not including the name parameter.
  volumes = {}

  # If true, Terraform will wait for the service to reach a steady state—as in,
  # the ECS tasks you wanted are actually deployed—before 'apply' is considered
  # complete.
  wait_for_steady_state = true

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="ecs_cluster_arn" requirement="required" type="string">
<HclListItemDescription>

The Amazon Resource Name (ARN) of the ECS Cluster where this service should run.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecs_task_container_definitions" requirement="required" type="string">
<HclListItemDescription>

The JSON text of the ECS Task Container Definitions. This portion of the ECS Task Definition defines the Docker container(s) to be run along with all their properties. It should adhere to the format described at https://goo.gl/ob5U3g.

</HclListItemDescription>
</HclListItem>

<HclListItem name="service_name" requirement="required" type="string">
<HclListItemDescription>

The name of the service. This is used to namespace all resources created by this module.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="additional_task_assume_role_policy_principals" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of additional principals who can assume the task and task execution roles

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="availability_zone_rebalancing" requirement="optional" type="string">
<HclListItemDescription>

ECS automatically redistributes tasks within a service across Availability Zones (AZs) to mitigate the risk of impaired application availability due to underlying infrastructure failures and task lifecycle activities. The valid values are ENABLED and DISABLED. Defaults to DISABLED.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;DISABLED&quot;"/>
</HclListItem>

<HclListItem name="custom_iam_role_name_prefix" requirement="optional" type="string">
<HclListItemDescription>

Prefix for name of the IAM role used by the ECS task. If not provide, will be set to <a href="#service_name"><code>service_name</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to all resources created by this module. Each item in this list should be a map with the parameters key and value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="custom_task_execution_name_prefix" requirement="optional" type="string">
<HclListItemDescription>

Prefix for name of iam role and policy that allows cloudwatch and ecr access

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="deployment_controller" requirement="optional" type="string">
<HclListItemDescription>

Type of deployment controller, possible values: CODE_DEPLOY, ECS, EXTERNAL

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="deployment_minimum_healthy_percent" requirement="optional" type="number">
<HclListItemDescription>

(Optional) The lower limit (as a percentage of the service's desiredCount) of the number of running tasks that must remain running and healthy in a service during a deployment

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ecs_task_definition_network_mode" requirement="optional" type="string">
<HclListItemDescription>

The Docker networking mode to use for the containers in the task. The valid values are none, bridge, awsvpc, and host

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;bridge&quot;"/>
</HclListItem>

<HclListItem name="ecs_task_definition_pid_mode" requirement="optional" type="string">
<HclListItemDescription>

The process namespace to use for the containers in the task. The valid values are host and task.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;task&quot;"/>
</HclListItem>

<HclListItem name="launch_type" requirement="optional" type="string">
<HclListItemDescription>

The launch type on which to run your service. The valid values are EC2 and FARGATE. Defaults to EC2

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;EC2&quot;"/>
</HclListItem>

<HclListItem name="placement_constraint_expression" requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="&quot;attribute:ecs.ami-id != &apos;ami-fake&apos;&quot;"/>
</HclListItem>

<HclListItem name="placement_constraint_type" requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="&quot;memberOf&quot;"/>
</HclListItem>

<HclListItem name="propagate_tags" requirement="optional" type="string">
<HclListItemDescription>

Whether tags should be propogated to the tasks from the service or from the task definition. Valid values are SERVICE and TASK_DEFINITION. Defaults to SERVICE. If set to null, no tags are created for tasks.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;SERVICE&quot;"/>
</HclListItem>

<HclListItem name="service_create_update_timeout" requirement="optional" type="string">
<HclListItemDescription>

Use this variable to adjust the default timeout of 20m for create and update operations the the ECS service. Adjusting the value can be particularly useful when using 'wait_for_steady_state'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;20m&quot;"/>
</HclListItem>

<HclListItem name="service_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the ECS service. Each item in this list should be a map with the parameters key and value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="task_definition_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the task definition. Each item in this list should be a map with the parameters key and value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="task_execution_role_permissions_boundary_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role for the ECS task execution.

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

<HclListItem name="wait_for_steady_state" requirement="optional" type="bool">
<HclListItemDescription>

If true, Terraform will wait for the service to reach a steady state—as in, the ECS tasks you wanted are actually deployed—before 'apply' is considered complete.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="aws_ecs_task_definition_arn">
</HclListItem>

<HclListItem name="ecs_task_execution_iam_role_arn">
</HclListItem>

<HclListItem name="ecs_task_execution_iam_role_name">
</HclListItem>

<HclListItem name="ecs_task_iam_role_arn">
</HclListItem>

<HclListItem name="ecs_task_iam_role_name">
</HclListItem>

<HclListItem name="service_arn">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-ecs/tree/v1.0.0/modules/ecs-daemon-service/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-ecs/tree/v1.0.0/modules/ecs-daemon-service/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-ecs/tree/v1.0.0/modules/ecs-daemon-service/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "52d072ccca7092ed34ce83be45f12a0d"
}
##DOCS-SOURCER-END -->
