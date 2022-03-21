---
type: "service"
name: "Amazon ECS Service"
description: "Deploy an Amazon ECS Service."
category: "docker-orchestration"
cloud: "aws"
tags: ["docker","orchestration","ecs","containers"]
license: "gruntwork"
built-with: "terraform, bash, python, go"
title: "Amazon ECS Service"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemTypeDetails, HclListItemDefaultValue } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.85.0" lastModifiedVersion="0.85.0"/>

# Amazon ECS Service


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/ecs-service" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=services%2Fecs-service" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

## Overview

This service contains [Terraform](https://www.terraform.io) code to deploy a production-grade ECS service on
[AWS](https://aws.amazon.com) using [Elastic Container Service(ECS)](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html).

![ECS architecture](/img/reference/services/app-orchestration/ecs-architecture.png)

## Features

*   Deploy an ECS Service onto an existing ECS cluster
*   Define arbitrary tasks via JSON
*   Optionally deploy a canary task for testing release candidates
*   Configure and deploy load balancing and optional DNS records
*   Auto scaling of ECS tasks
*   Cloudwatch metrics and alerts

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

Under the hood, this is all implemented using Terraform modules from the Gruntwork
[terraform-aws-ecs](https://github.com/gruntwork-io/terraform-aws-ecs) repo. If you are a subscriber and don’t have
access to this repo, email <support@gruntwork.io>.

### Core concepts

To understand core concepts like what is ECS, the different cluster types, how to authenticate to Kubernetes, and
more, see the documentation in the
[terraform-aws-ecs](https://github.com/gruntwork-io/terraform-aws-ecs) repo.

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal
    submodules.
*   [examples](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples): This folder contains working examples of how to use the submodules.
*   [test](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

## Manage

For information on how to manage your ECS service, see the documentation in the
[module ecs](https://github.com/gruntwork-io/terraform-aws-ecs) repo.

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<br/>

### Required

<HclListItem name="container_definitions" description="List of container definitions to use for the ECS task. Each entry corresponds to a different ECS container definition." requirement="required" type="any">
</HclListItem>

<HclListItem name="default_listener_arns" description="A map of all the listeners on the load balancer. The keys should be the port numbers and the values should be the ARN of the listener for that port." requirement="required" type="map">
<HclListItemTypeDetails>

```hcl
map(string)
```

</HclListItemTypeDetails>
</HclListItem>

<HclListItem name="default_listener_ports" description="The default port numbers on the load balancer to attach listener rules to. You can override this default on a rule-by-rule basis by setting the listener_ports parameter in each rule. The port numbers specified in this variable and the listener_ports parameter must exist in <a href=#listener_arns><code>listener_arns</code></a>." requirement="required" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
</HclListItem>

<HclListItem name="ecs_cluster_arn" description="The ARN of the cluster to which the ecs service should be deployed." requirement="required" type="string">
</HclListItem>

<HclListItem name="ecs_cluster_name" description="The name of the ecs cluster to deploy the ecs service onto." requirement="required" type="string">
</HclListItem>

<HclListItem name="service_name" description="The name of the ECS service (e.g. my-service-stage)" requirement="required" type="string">
</HclListItem>

### Optional

<HclListItem name="alarm_sns_topic_arns" description="A list of ARNs of the SNS topic(s) to write alarm events to" requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="alarm_sns_topic_arns_us_east_1" description="A list of SNS topic ARNs to notify when the route53 health check changes to ALARM, OK, or INSUFFICIENT_DATA state. Note: these SNS topics MUST be in us-east-1! This is because Route 53 only sends CloudWatch metrics to us-east-1, so we must create the alarm in that region, and therefore, can only notify SNS topics in that region" requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="alb_sticky_session_cookie_duration" description="The time period, in seconds, during which requests from a client should be routed to the same Target. After this time period expires, the load balancer-generated cookie is considered stale. The acceptable range is 1 second to 1 week (604800 seconds). The default value is 1 day (86400 seconds). Only used if <a href=#elb_target_groups><code>elb_target_groups</code></a> is set." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="86400"/>
</HclListItem>

<HclListItem name="alb_sticky_session_type" description="The type of Sticky Sessions to use. See https://goo.gl/MNwqNu for possible values. Only used if <a href=#elb_target_groups><code>elb_target_groups</code></a> is set." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="lb_cookie"/>
</HclListItem>

<HclListItem name="canary_container_definitions" description="List of container definitions to use for the canary ECS task. Each entry corresponds to a different ECS container definition." requirement="optional" type="any">
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="canary_version" description="Which version of the ECS Service Docker container to deploy as a canary (e.g. 0.57)" requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="capacity_provider_strategy" description="The capacity provider strategy to use for the service. Note that the capacity providers have to be present on the ECS cluster before deploying the ECS service. When provided, <a href=#launch_type><code>launch_type</code></a> is ignored." requirement="optional" type="list">
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
</HclListItem>

<HclListItem name="clb_container_name" description="The name of the container, as it appears in the <a href=#task_arn><code>task_arn</code></a> Task definition, to associate with a CLB. Currently, ECS can only associate a CLB with a single container per service. Only used if clb_name is set." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="clb_container_port" description="The port on the container in <a href=#clb_container_name><code>clb_container_name</code></a> to associate with an CLB. Currently, ECS can only associate a CLB with a single container per service. Only used if clb_name is set." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="clb_name" description="The name of a Classic Load Balancer (CLB) to associate with this service. Containers in the service will automatically register with the CLB when booting up. Set to null if using ELBv2." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_kms_key_id" description="The ARN of a KMS CMK to use for encrypting log events in the CloudWatch Logs. Set to null to disable encryption. Only used if <a href=#create_cloudwatch_log_group><code>create_cloudwatch_log_group</code></a> is true." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_name" description="The name for the Cloudwatch logs that will be generated by the ecs service. Only used (and required) if <a href=#create_cloudwatch_log_group><code>create_cloudwatch_log_group</code></a> is true." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_retention" description="Number of days to retain log events. Possible values are: 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1827, 3653, and 0. Select 0 to never expire. Only used if <a href=#create_cloudwatch_log_group><code>create_cloudwatch_log_group</code></a> is true." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cpu" description="The number of CPU units to allocate to the ECS Service." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="create_cloudwatch_log_group" description="When true, create and manage the CloudWatch Log Group in the Terraform module instead of relying on ECS. This is useful for configuring options that are not available in the ECS native feature of managing the Log Group (e.g., encryption support)." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="create_route53_entry" description="Set to true if you want a DNS record automatically created and pointed at the the load balancer for the ECS service" requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="custom_docker_command" description="If <a href=#use_custom_docker_run_command><code>use_custom_docker_run_command</code></a> is set to true, set this variable to the custom docker run command you want to provide" requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_ecs_service_role_name" description="The name to use for the ECS Service IAM role, which is used to grant permissions to the ECS service to register the task IPs to ELBs." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_iam_policy_prefix" description="Prefix for name of the custom IAM policies created by this module (those resulting from <a href=#iam_policy><code>iam_policy</code></a> and <a href=#secrets_access><code>secrets_access</code></a>). If omitted, defaults to <a href=#service_name><code>service_name</code></a>." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_iam_role_name_prefix" description="Prefix for name of the IAM role used by the ECS task." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_task_execution_iam_role_name_prefix" description="Prefix for name of task execution IAM role and policy that grants access to CloudWatch and ECR." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="dependencies" description="Create a dependency between the resources in this module to the interpolated values in this list (and thus the source resources). In other words, the resources in this module will now depend on the resources backing the values in this list such that those resources need to be created before the resources in this module, and the resources in this module need to be destroyed before the resources in the list." requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="deployment_check_loglevel" description="Set the logging level of the deployment check script. You can set this to `error`, `warn`, or `info`, in increasing verbosity." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="info"/>
</HclListItem>

<HclListItem name="deployment_check_timeout_seconds" description="Seconds to wait before timing out each check for verifying ECS service deployment. See ecs_deploy_check_binaries for more details." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="600"/>
</HclListItem>

<HclListItem name="deployment_circuit_breaker_enabled" description="Set to 'true' to prevent the task from attempting to continuously redeploy after a failed health check." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="deployment_circuit_breaker_rollback" description="Set to 'true' to also automatically roll back to the last successful deployment. deploy_circuit_breaker_enabled must also be true to enable this behavior." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="deployment_maximum_percent" description="The upper limit, as a percentage of <a href=#desired_number_of_tasks><code>desired_number_of_tasks</code></a>, of the number of running tasks that can be running in a service during a deployment. Setting this to more than 100 means that during deployment, ECS will deploy new instances of a Task before undeploying the old ones." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="200"/>
</HclListItem>

<HclListItem name="deployment_minimum_healthy_percent" description="The lower limit, as a percentage of <a href=#desired_number_of_tasks><code>desired_number_of_tasks</code></a>, of the number of running tasks that must remain running and healthy in a service during a deployment. Setting this to less than 100 means that during deployment, ECS may undeploy old instances of a Task before deploying new ones." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="100"/>
</HclListItem>

<HclListItem name="desired_number_of_canary_tasks" description="How many instances of the ECS Service to run across the ECS cluster for a canary deployment. Typically, only 0 or 1 should be used." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="desired_number_of_tasks" description="How many instances of the ECS Service to run across the ECS cluster" requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="domain_name" description="The domain name to create a route 53 record for. This DNS record will point to the load balancer for the ECS service" requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ecs_instance_security_group_id" description="The ID of the security group that should be applied to ecs service instances" requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ecs_node_port_mappings" description="A map of ports to be opened via security groups applied to the EC2 instances that back the ECS cluster, when not using fargate. The key should be the container port and the value should be what host port to map it to." requirement="optional" type="map">
<HclListItemTypeDetails>

```hcl
map(number)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="efs_volumes" description="(Optional) A map of EFS volumes that containers in your task may use. Each item in the list should be a map compatible with https://www.terraform.io/docs/providers/aws/r/ecs_task_definition.html#efs-volume-configuration-arguments." requirement="optional" type="map">
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
</HclListItem>

<HclListItem name="elb_slow_start" description="The amount time for targets to warm up before the load balancer sends them a full share of requests. The range is 30-900 seconds or 0 to disable. The default value is 0 seconds. Only used if <a href=#elb_target_groups><code>elb_target_groups</code></a> is set." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="elb_target_group_deregistration_delay" description="The amount of time for Elastic Load Balancing to wait before changing the state of a deregistering target from draining to unused. The range is 0-3600 seconds. Only used if <a href=#elb_target_groups><code>elb_target_groups</code></a> is set." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="elb_target_group_vpc_id" description="The ID of the VPC in which to create the target group. Only used if <a href=#elb_target_groups><code>elb_target_groups</code></a> is set." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="elb_target_groups" description="Configurations for ELB target groups for ALBs and NLBs that should be associated with the ECS Tasks. Each entry corresponds to a separate target group. Set to the empty object ({}) if you are not using an ALB or NLB." requirement="optional" type="any">
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_alarms" description="Set to true to enable Cloudwatch alarms on the ecs service instances" requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_ecs_deployment_check" description="Whether or not to enable the ECS deployment check binary to make terraform wait for the task to be deployed. See ecs_deploy_check_binaries for more details. You must install the companion binary before the check can be used. Refer to the README for more details." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_execute_command" description="Specifies whether to enable Amazon ECS Exec for the tasks within the service." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_route53_health_check" description="Set this to true to create a route 53 health check and Cloudwatch alarm that will alert if your domain becomes unreachable" requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="expose_ecs_service_to_other_ecs_nodes" description="Set this to true to allow the ecs service to be accessed by other ecs nodes" requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="fixed_response_rules" requirement="optional" type="map">
<HclListItemTypeDetails>

```hcl
map(any)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="forward_rules" requirement="optional" type="any">
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="health_check_enabled" description="If true, enable health checks on the target group. Only applies to ELBv2. For CLBs, health checks are not configurable." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="health_check_grace_period_seconds" description="Seconds to ignore failing load balancer health checks on newly instantiated tasks to prevent premature shutdown, up to 2,147,483,647. Only valid for services configured to use load balancers." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="health_check_healthy_threshold" description="The number of consecutive successful health checks required before considering an unhealthy Target healthy. The acceptable range is 2 to 10." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="5"/>
</HclListItem>

<HclListItem name="health_check_interval" description="The approximate amount of time, in seconds, between health checks of an individual Target. Minimum value 5 seconds, Maximum value 300 seconds." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="health_check_matcher" description="The HTTP codes to use when checking for a successful response from a Target. You can specify multiple values (e.g. '200,202') or a range of values (e.g. '200-299'). Required when using ALBs." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="200"/>
</HclListItem>

<HclListItem name="health_check_path" description="The ping path that is the destination on the Targets for health checks. Required when using ALBs." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="/"/>
</HclListItem>

<HclListItem name="health_check_port" description="The port the ELB uses when performing health checks on Targets. The default is to use the port on which each target receives traffic from the load balancer, indicated by the value 'traffic-port'." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="traffic-port"/>
</HclListItem>

<HclListItem name="health_check_timeout" description="The amount of time, in seconds, during which no response from a Target means a failed health check. The acceptable range is 2 to 60 seconds." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="5"/>
</HclListItem>

<HclListItem name="health_check_unhealthy_threshold" description="The number of consecutive failed health checks required before considering a target unhealthy. The acceptable range is 2 to 10. For NLBs, this value must be the same as the health_check_healthy_threshold." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="2"/>
</HclListItem>

<HclListItem name="high_cpu_utilization_period" description="The period, in seconds, over which to measure the CPU utilization percentage" requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="high_cpu_utilization_threshold" description="Trigger an alarm if the ECS Service has a CPU utilization percentage above this threshold" requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="90"/>
</HclListItem>

<HclListItem name="high_memory_utilization_period" description="The period, in seconds, over which to measure the memory utilization percentage" requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="high_memory_utilization_threshold" description="Trigger an alarm if the ECS Service has a memory utilization percentage above this threshold" requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="90"/>
</HclListItem>

<HclListItem name="hosted_zone_id" description="The ID of the Route 53 hosted zone into which the Route 53 DNS record should be written" requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="iam_policy" description="An object defining the policy to attach to the ECS task. Accepts a map of objects, where the map keys are sids for IAM policy statements, and the object fields are the resources, actions, and the effect ('Allow' or 'Deny') of the statement." requirement="optional" type="map">
<HclListItemTypeDetails>

```hcl
map(object({
    resources = list(string)
    actions   = list(string)
    effect    = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="launch_type" description="The launch type of the ECS service. Must be one of EC2 or FARGATE. When using FARGATE, you must set the network mode to awsvpc and configure it. When using EC2, you can configure the placement strategy using the variables <a href=#placement_strategy_type><code>placement_strategy_type</code></a>, <a href=#placement_strategy_field><code>placement_strategy_field</code></a>, <a href=#placement_constraint_type><code>placement_constraint_type</code></a>, <a href=#placement_constraint_expression><code>placement_constraint_expression</code></a>. This variable is ignored if <a href=#capacity_provider_strategy><code>capacity_provider_strategy</code></a> is provided." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="EC2"/>
</HclListItem>

<HclListItem name="lb_hosted_zone_id" description="The ID of the Route 53 Hosted Zone in which to create a DNS A record pointed to the ECS service's load balancer" requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="max_number_of_tasks" description="The maximum number of instances of the ECS Service to run. Auto scaling will never scale out above this number." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="3"/>
</HclListItem>

<HclListItem name="memory" description="How much memory, in MB, to give the ECS Service." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="500"/>
</HclListItem>

<HclListItem name="min_number_of_tasks" description="The minimum number of instances of the ECS Service to run. Auto scaling will never scale in below this number." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="network_configuration" description="The configuration to use when setting up the VPC network mode. Required and only used if network_mode is awsvpc." requirement="optional" type="object">
<HclListItemTypeDetails>

```hcl
object({
    # IDs of VPC Subnets to allocate fargate worker network from.
    subnets = list(string)

    # The ID of the VPC used for the Fargate worker network. Must be non-null when security_group_rules are provided.
    vpc_id = string

    # Security Group Rules to apply to the ECS Fargate worker. This module will create a new security group for the
    # worker and attach these rules. Each entry accepts the same attributes as the aws_security_group_rule resource,
    # except for security_group_id which will be set to the security group created within the module.
    # Each entry corresponds to a rule. The key is a unique, user provided, arbitrary value that can be used by
    # Terraform to know which rules to update across changes.
    security_group_rules = map(object({
      type                     = string
      from_port                = number
      to_port                  = number
      protocol                 = string
      source_security_group_id = string
      cidr_blocks              = list(string)
    }))

    # Additional existing Security Groups that should be bound to the ECS Fargate worker.
    additional_security_group_ids = list(string)

    # Whether or not the ECS Fargate worker should get a public IP address.
    assign_public_ip = bool
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="network_mode" description="The Docker networking mode to use for the containers in the task. The valid values are none, bridge, awsvpc, and host. If the network_mode is set to awsvpc, you must configure <a href=#network_configuration><code>network_configuration</code></a>." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="bridge"/>
</HclListItem>

<HclListItem name="original_lb_dns_name" description="The DNS name that was assigned by AWS to the load balancer upon creation" requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="placement_constraint_expression" description="Cluster Query Language expression to apply to the constraint for matching. Does not need to be specified for the distinctInstance constraint type." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="attribute:ecs.ami-id != 'ami-fake'"/>
</HclListItem>

<HclListItem name="placement_constraint_type" description="The type of constraint to apply for container instance placement. The only valid values at this time are memberOf and distinctInstance." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="memberOf"/>
</HclListItem>

<HclListItem name="placement_strategy_field" description="The field to apply the placement strategy against. For the spread placement strategy, valid values are instanceId (or host, which has the same effect), or any platform or custom attribute that is applied to a container instance, such as attribute:ecs.availability-zone. For the binpack placement strategy, valid values are cpu and memory. For the random placement strategy, this field is not used." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="cpu"/>
</HclListItem>

<HclListItem name="placement_strategy_type" description="The strategy to use when placing ECS tasks on EC2 instances. Can be binpack (default), random, or spread." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="binpack"/>
</HclListItem>

<HclListItem name="propagate_tags" description="Whether tags should be propogated to the tasks from the service or from the task definition. Valid values are SERVICE and TASK_DEFINITION. Defaults to SERVICE. If set to null, no tags are created for tasks." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="SERVICE"/>
</HclListItem>

<HclListItem name="proxy_configuration_container_name" description="Use the name of the Envoy proxy container from `container_definitions` as the container name." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="proxy_configuration_properties" description="A map of network configuration parameters to provide the Container Network Interface (CNI) plugin." requirement="optional" type="map">
<HclListItemTypeDetails>

```hcl
map(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="redirect_rules" requirement="optional" type="map">
<HclListItemTypeDetails>

```hcl
map(any)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="route53_health_check_path" description="The path, without any leading slash, that can be used as a health check (e.g. healthcheck) by Route 53. Should return a 200 OK when the service is up and running." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="/"/>
</HclListItem>

<HclListItem name="route53_health_check_port" description="The port to use for Route 53 health checks. This should be the port for the service that is available at the publicly accessible domain name (<a href=#domain_name><code>domain_name</code></a>)." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="80"/>
</HclListItem>

<HclListItem name="route53_health_check_protocol" description="The protocol to use for Route 53 health checks. Should be one of HTTP, HTTPS." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="HTTP"/>
</HclListItem>

<HclListItem name="route53_health_check_provider_external_id" description="The optional external_id to be used in the us-east-1 provider block defined in the route53-health-check-alarms module.  This module configures its own AWS provider to ensure resources are created in us-east-1." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="route53_health_check_provider_profile" description="The optional AWS profile to be used in the us-east-1 provider block defined in the route53-health-check-alarms module.  This module configures its own AWS provider to ensure resources are created in us-east-1." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="route53_health_check_provider_role_arn" description="The optional role_arn to be used in the us-east-1 provider block defined in the route53-health-check-alarms module.  This module configures its own AWS provider to ensure resources are created in us-east-1." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="route53_health_check_provider_session_name" description="The optional session_name to be used in the us-east-1 provider block defined in the route53-health-check-alarms module.  This module configures its own AWS provider to ensure resources are created in us-east-1." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="route53_health_check_provider_shared_credentials_file" description="The optional path to a credentials file used in the us-east-1 provider block defined in the route53-health-check-alarms module.  This module configures its own AWS provider to ensure resources are created in us-east-1." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="secrets_access" description="A list of ARNs of Secrets Manager secrets that the task should have permissions to read. The IAM role for the task will be granted `secretsmanager:GetSecretValue` for each secret in the list. The ARN can be either the complete ARN, including the randomly generated suffix, or the ARN without the suffix. If the latter, the module will look up the full ARN automatically. This is helpful in cases where you don't yet know the randomly generated suffix because the rest of the ARN is a predictable value." requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="secrets_manager_arns" description="A list of ARNs for Secrets Manager secrets that the ECS execution IAM policy should be granted access to read. Note that this is different from the ECS task IAM policy. The execution policy is concerned with permissions required to run the ECS task." requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="secrets_manager_kms_key_arn" description="The ARN of the kms key associated with secrets manager" requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="service_tags" description="A map of tags to apply to the ECS service. Each item in this list should be a map with the parameters key and value." requirement="optional" type="map">
<HclListItemTypeDetails>

```hcl
map(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="task_cpu" description="The CPU units for the instances that Fargate will spin up. Options here: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html#fargate-tasks-size. Required when using FARGATE launch type." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="task_definition_tags" description="A map of tags to apply to the task definition. Each item in this list should be a map with the parameters key and value." requirement="optional" type="map">
<HclListItemTypeDetails>

```hcl
map(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="task_memory" description="The memory units for the instances that Fargate will spin up. Options here: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html#fargate-tasks-size. Required when using FARGATE launch type." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="use_alb_sticky_sessions" description="If true, the ALB will use use Sticky Sessions as described at https://goo.gl/VLcNbk. Only used if <a href=#elb_target_groups><code>elb_target_groups</code></a> is set. Note that this can only be true when associating with an ALB. This cannot be used with CLBs or NLBs." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="use_auto_scaling" description="Whether or not to enable auto scaling for the ecs service" requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="use_custom_docker_run_command" description="Set this to true if you want to pass a custom docker run command. If you set this to true, you must supply <a href=#custom_docker_command><code>custom_docker_command</code></a>" requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="volumes" description="(Optional) A map of volume blocks that containers in your task may use. The key should be the name of the volume and the value should be a map compatible with https://www.terraform.io/docs/providers/aws/r/ecs_task_definition.html#volume-block-arguments, but not including the name parameter." requirement="optional" type="any">
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<br/>

<HclListItem name="all_metric_widgets" description="A list of all the CloudWatch Dashboard metric widgets available in this module.">
</HclListItem>

<HclListItem name="aws_ecs_task_definition_arn" description="The ARN of the ECS task definition">
</HclListItem>

<HclListItem name="aws_ecs_task_definition_canary_arn" description="The ARN of the canary ECS task definition">
</HclListItem>

<HclListItem name="canary_service_arn" description="The ARN of the canary service. Canary services are optional and can be helpful when you're attempting to verify a release candidate">
</HclListItem>

<HclListItem name="capacity_provider_strategy" description="The capacity provider strategy determines how infrastructure (such as EC2 instances or Fargate) that backs your ECS service is managed. See https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cluster-capacity-providers.html for more information">
</HclListItem>

<HclListItem name="ecs_node_port_mappings" description="A map representing the instance host and container ports that should be opened">
</HclListItem>

<HclListItem name="ecs_task_execution_iam_role_arn" description="The ARN of the ECS task's IAM role">
</HclListItem>

<HclListItem name="ecs_task_execution_iam_role_name" description="The name of the ECS task execution IAM role. The execution role is used by the ECS container agent to make calls to the ECS API, pull container images from ECR, use the logs driver, etc">
</HclListItem>

<HclListItem name="ecs_task_iam_role_arn" description="The ARN of the IAM role associated with the ECS task">
</HclListItem>

<HclListItem name="ecs_task_iam_role_name" description="The name of the IAM role granting permissions to the running ECS task itself. Note this role is separate from the execution role which is assumed by the ECS container agent">
</HclListItem>

<HclListItem name="metric_widget_ecs_service_cpu_usage" description="The metric widget for the ECS service's CPU usage ">
</HclListItem>

<HclListItem name="metric_widget_ecs_service_memory_usage" description="The metric widget for the ECS service's memory usage">
</HclListItem>

<HclListItem name="route53_domain_name" description="The domain name of the optional route53 record, which points at the load balancer for the ECS service">
</HclListItem>

<HclListItem name="service_app_autoscaling_target_arn" description="The ARN of the app autoscaling target">
</HclListItem>

<HclListItem name="service_app_autoscaling_target_resource_id" description="The resource ID of the autoscaling target">
</HclListItem>

<HclListItem name="service_arn" description="The ARN of the ECS service">
</HclListItem>

<HclListItem name="service_iam_role_arn" description="The ARN of the service role associated with the ELB of the ECS service">
</HclListItem>

<HclListItem name="service_iam_role_name" description="The name of the service role associated with the ELB of the ECS service">
</HclListItem>

<HclListItem name="target_group_arns" description="The ARNs of the ECS service's load balancer's target groups">
</HclListItem>

<HclListItem name="target_group_names" description="The names of the ECS service's load balancer's target groups">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"3a79b52c6e1de596506de2771b9e5e9d"}
##DOCS-SOURCER-END -->
