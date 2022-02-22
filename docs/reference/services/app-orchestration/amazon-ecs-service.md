---
type: "service"
name: "Amazon ECS Service"
description: "Deploy an Amazon ECS Service."
category: "docker-orchestration"
cloud: "aws"
tags: ["docker","orchestration","ecs","containers"]
license: "gruntwork"
built-with: "terraform, bash, python, go"
title: "Amazon ECS"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';

<VersionBadge version="0.78.1"/>

# Amazon ECS


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/ecs-service" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=services/ecs-service" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Filtered Release Notes</a>

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

<a name="alarm_sns_topic_arns" className="snap-top"></a>

* [**`alarm_sns_topic_arns`**](#alarm_sns_topic_arns) &mdash; A list of ARNs of the SNS topic(s) to write alarm events to

<a name="alarm_sns_topic_arns_us_east_1" className="snap-top"></a>

* [**`alarm_sns_topic_arns_us_east_1`**](#alarm_sns_topic_arns_us_east_1) &mdash; A list of SNS topic ARNs to notify when the route53 health check changes to ALARM, OK, or [`INSUFFICIENT_DATA`](#INSUFFICIENT_DATA) state. Note: these SNS topics MUST be in us-east-1! This is because Route 53 only sends CloudWatch metrics to us-east-1, so we must create the alarm in that region, and therefore, can only notify SNS topics in that region

<a name="alb_sticky_session_cookie_duration" className="snap-top"></a>

* [**`alb_sticky_session_cookie_duration`**](#alb_sticky_session_cookie_duration) &mdash; The time period, in seconds, during which requests from a client should be routed to the same Target. After this time period expires, the load balancer-generated cookie is considered stale. The acceptable range is 1 second to 1 week (604800 seconds). The default value is 1 day (86400 seconds). Only used if [`elb_target_groups`](#elb_target_groups) is set.

<a name="alb_sticky_session_type" className="snap-top"></a>

* [**`alb_sticky_session_type`**](#alb_sticky_session_type) &mdash; The type of Sticky Sessions to use. See https://goo.gl/MNwqNu for possible values. Only used if [`elb_target_groups`](#elb_target_groups) is set.

<a name="canary_container_definitions" className="snap-top"></a>

* [**`canary_container_definitions`**](#canary_container_definitions) &mdash; List of container definitions to use for the canary ECS task. Each entry corresponds to a different ECS container definition.

<a name="canary_version" className="snap-top"></a>

* [**`canary_version`**](#canary_version) &mdash; Which version of the ECS Service Docker container to deploy as a canary (e.g. 0.57)

<a name="capacity_provider_strategy" className="snap-top"></a>

* [**`capacity_provider_strategy`**](#capacity_provider_strategy) &mdash; The capacity provider strategy to use for the service. Note that the capacity providers have to be present on the ECS cluster before deploying the ECS service. When provided, [`launch_type`](#launch_type) is ignored.

<a name="clb_container_name" className="snap-top"></a>

* [**`clb_container_name`**](#clb_container_name) &mdash; The name of the container, as it appears in the [`task_arn`](#task_arn) Task definition, to associate with a CLB. Currently, ECS can only associate a CLB with a single container per service. Only used if [`clb_name`](#clb_name) is set.

<a name="clb_container_port" className="snap-top"></a>

* [**`clb_container_port`**](#clb_container_port) &mdash; The port on the container in [`clb_container_name`](#clb_container_name) to associate with an CLB. Currently, ECS can only associate a CLB with a single container per service. Only used if [`clb_name`](#clb_name) is set.

<a name="clb_name" className="snap-top"></a>

* [**`clb_name`**](#clb_name) &mdash; The name of a Classic Load Balancer (CLB) to associate with this service. Containers in the service will automatically register with the CLB when booting up. Set to null if using ELBv2.

<a name="cloudwatch_log_group_kms_key_id" className="snap-top"></a>

* [**`cloudwatch_log_group_kms_key_id`**](#cloudwatch_log_group_kms_key_id) &mdash; The ARN of a KMS CMK to use for encrypting log events in the CloudWatch Logs. Set to null to disable encryption. Only used if [`create_cloudwatch_log_group`](#create_cloudwatch_log_group) is true.

<a name="cloudwatch_log_group_name" className="snap-top"></a>

* [**`cloudwatch_log_group_name`**](#cloudwatch_log_group_name) &mdash; The name for the Cloudwatch logs that will be generated by the ecs service. Only used (and required) if [`create_cloudwatch_log_group`](#create_cloudwatch_log_group) is true.

<a name="cloudwatch_log_group_retention" className="snap-top"></a>

* [**`cloudwatch_log_group_retention`**](#cloudwatch_log_group_retention) &mdash; Number of days to retain log events. Possible values are: 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1827, 3653, and 0. Select 0 to never expire. Only used if [`create_cloudwatch_log_group`](#create_cloudwatch_log_group) is true.

<a name="container_definitions" className="snap-top"></a>

* [**`container_definitions`**](#container_definitions) &mdash; List of container definitions to use for the ECS task. Each entry corresponds to a different ECS container definition.

<a name="cpu" className="snap-top"></a>

* [**`cpu`**](#cpu) &mdash; The number of CPU units to allocate to the ECS Service.

<a name="create_cloudwatch_log_group" className="snap-top"></a>

* [**`create_cloudwatch_log_group`**](#create_cloudwatch_log_group) &mdash; When true, create and manage the CloudWatch Log Group in the Terraform module instead of relying on ECS. This is useful for configuring options that are not available in the ECS native feature of managing the Log Group (e.g., encryption support).

<a name="create_route53_entry" className="snap-top"></a>

* [**`create_route53_entry`**](#create_route53_entry) &mdash; Set to true if you want a DNS record automatically created and pointed at the the load balancer for the ECS service

<a name="custom_docker_command" className="snap-top"></a>

* [**`custom_docker_command`**](#custom_docker_command) &mdash; If [`use_custom_docker_run_command`](#use_custom_docker_run_command) is set to true, set this variable to the custom docker run command you want to provide

<a name="custom_ecs_service_role_name" className="snap-top"></a>

* [**`custom_ecs_service_role_name`**](#custom_ecs_service_role_name) &mdash; The name to use for the ECS Service IAM role, which is used to grant permissions to the ECS service to register the task IPs to ELBs.

<a name="custom_iam_policy_prefix" className="snap-top"></a>

* [**`custom_iam_policy_prefix`**](#custom_iam_policy_prefix) &mdash; Prefix for name of the custom IAM policies created by this module (those resulting from [`iam_policy`](#iam_policy) and [`secrets_access`](#secrets_access)). If omitted, defaults to [`service_name`](#service_name).

<a name="custom_iam_role_name_prefix" className="snap-top"></a>

* [**`custom_iam_role_name_prefix`**](#custom_iam_role_name_prefix) &mdash; Prefix for name of the IAM role used by the ECS task.

<a name="custom_task_execution_iam_role_name_prefix" className="snap-top"></a>

* [**`custom_task_execution_iam_role_name_prefix`**](#custom_task_execution_iam_role_name_prefix) &mdash; Prefix for name of task execution IAM role and policy that grants access to CloudWatch and ECR.

<a name="default_listener_arns" className="snap-top"></a>

* [**`default_listener_arns`**](#default_listener_arns) &mdash; A map of all the listeners on the load balancer. The keys should be the port numbers and the values should be the ARN of the listener for that port.

<a name="default_listener_ports" className="snap-top"></a>

* [**`default_listener_ports`**](#default_listener_ports) &mdash; The default port numbers on the load balancer to attach listener rules to. You can override this default on a rule-by-rule basis by setting the [`listener_ports`](#listener_ports) parameter in each rule. The port numbers specified in this variable and the [`listener_ports`](#listener_ports) parameter must exist in [`listener_arns`](#listener_arns).

<a name="dependencies" className="snap-top"></a>

* [**`dependencies`**](#dependencies) &mdash; Create a dependency between the resources in this module to the interpolated values in this list (and thus the source resources). In other words, the resources in this module will now depend on the resources backing the values in this list such that those resources need to be created before the resources in this module, and the resources in this module need to be destroyed before the resources in the list.

<a name="deployment_check_loglevel" className="snap-top"></a>

* [**`deployment_check_loglevel`**](#deployment_check_loglevel) &mdash; Set the logging level of the deployment check script. You can set this to `error`, `warn`, or `info`, in increasing verbosity.

<a name="deployment_check_timeout_seconds" className="snap-top"></a>

* [**`deployment_check_timeout_seconds`**](#deployment_check_timeout_seconds) &mdash; Seconds to wait before timing out each check for verifying ECS service deployment. See [`ecs_deploy_check_binaries`](#ecs_deploy_check_binaries) for more details.

<a name="deployment_circuit_breaker_enabled" className="snap-top"></a>

* [**`deployment_circuit_breaker_enabled`**](#deployment_circuit_breaker_enabled) &mdash; Set to 'true' to prevent the task from attempting to continuously redeploy after a failed health check.

<a name="deployment_circuit_breaker_rollback" className="snap-top"></a>

* [**`deployment_circuit_breaker_rollback`**](#deployment_circuit_breaker_rollback) &mdash; Set to 'true' to also automatically roll back to the last successful deployment. [`deploy_circuit_breaker_enabled`](#deploy_circuit_breaker_enabled) must also be true to enable this behavior.

<a name="deployment_maximum_percent" className="snap-top"></a>

* [**`deployment_maximum_percent`**](#deployment_maximum_percent) &mdash; The upper limit, as a percentage of [`desired_number_of_tasks`](#desired_number_of_tasks), of the number of running tasks that can be running in a service during a deployment. Setting this to more than 100 means that during deployment, ECS will deploy new instances of a Task before undeploying the old ones.

<a name="deployment_minimum_healthy_percent" className="snap-top"></a>

* [**`deployment_minimum_healthy_percent`**](#deployment_minimum_healthy_percent) &mdash; The lower limit, as a percentage of [`desired_number_of_tasks`](#desired_number_of_tasks), of the number of running tasks that must remain running and healthy in a service during a deployment. Setting this to less than 100 means that during deployment, ECS may undeploy old instances of a Task before deploying new ones.

<a name="desired_number_of_canary_tasks" className="snap-top"></a>

* [**`desired_number_of_canary_tasks`**](#desired_number_of_canary_tasks) &mdash; How many instances of the ECS Service to run across the ECS cluster for a canary deployment. Typically, only 0 or 1 should be used.

<a name="desired_number_of_tasks" className="snap-top"></a>

* [**`desired_number_of_tasks`**](#desired_number_of_tasks) &mdash; How many instances of the ECS Service to run across the ECS cluster

<a name="domain_name" className="snap-top"></a>

* [**`domain_name`**](#domain_name) &mdash; The domain name to create a route 53 record for. This DNS record will point to the load balancer for the ECS service

<a name="ecs_cluster_arn" className="snap-top"></a>

* [**`ecs_cluster_arn`**](#ecs_cluster_arn) &mdash; The ARN of the cluster to which the ecs service should be deployed.

<a name="ecs_cluster_name" className="snap-top"></a>

* [**`ecs_cluster_name`**](#ecs_cluster_name) &mdash; The name of the ecs cluster to deploy the ecs service onto.

<a name="ecs_instance_security_group_id" className="snap-top"></a>

* [**`ecs_instance_security_group_id`**](#ecs_instance_security_group_id) &mdash; The ID of the security group that should be applied to ecs service instances

<a name="ecs_node_port_mappings" className="snap-top"></a>

* [**`ecs_node_port_mappings`**](#ecs_node_port_mappings) &mdash; A map of ports to be opened via security groups applied to the EC2 instances that back the ECS cluster, when not using fargate. The key should be the container port and the value should be what host port to map it to.

<a name="efs_volumes" className="snap-top"></a>

* [**`efs_volumes`**](#efs_volumes) &mdash; (Optional) A map of EFS volumes that containers in your task may use. Each item in the list should be a map compatible with [`https://www.terraform.io/docs/providers/aws/r/ecs_task_definition`](#https://www.terraform.io/docs/providers/aws/r/ecs_task_definition).html#efs-volume-configuration-arguments.

<a name="elb_slow_start" className="snap-top"></a>

* [**`elb_slow_start`**](#elb_slow_start) &mdash; The amount time for targets to warm up before the load balancer sends them a full share of requests. The range is 30-900 seconds or 0 to disable. The default value is 0 seconds. Only used if [`elb_target_groups`](#elb_target_groups) is set.

<a name="elb_target_group_deregistration_delay" className="snap-top"></a>

* [**`elb_target_group_deregistration_delay`**](#elb_target_group_deregistration_delay) &mdash; The amount of time for Elastic Load Balancing to wait before changing the state of a deregistering target from draining to unused. The range is 0-3600 seconds. Only used if [`elb_target_groups`](#elb_target_groups) is set.

<a name="elb_target_group_vpc_id" className="snap-top"></a>

* [**`elb_target_group_vpc_id`**](#elb_target_group_vpc_id) &mdash; The ID of the VPC in which to create the target group. Only used if [`elb_target_groups`](#elb_target_groups) is set.

<a name="elb_target_groups" className="snap-top"></a>

* [**`elb_target_groups`**](#elb_target_groups) &mdash; Configurations for ELB target groups for ALBs and NLBs that should be associated with the ECS Tasks. Each entry corresponds to a separate target group. Set to the empty object ({}) if you are not using an ALB or NLB.

<a name="enable_cloudwatch_alarms" className="snap-top"></a>

* [**`enable_cloudwatch_alarms`**](#enable_cloudwatch_alarms) &mdash; Set to true to enable Cloudwatch alarms on the ecs service instances

<a name="enable_ecs_deployment_check" className="snap-top"></a>

* [**`enable_ecs_deployment_check`**](#enable_ecs_deployment_check) &mdash; Whether or not to enable the ECS deployment check binary to make terraform wait for the task to be deployed. See [`ecs_deploy_check_binaries`](#ecs_deploy_check_binaries) for more details. You must install the companion binary before the check can be used. Refer to the README for more details.

<a name="enable_execute_command" className="snap-top"></a>

* [**`enable_execute_command`**](#enable_execute_command) &mdash; Specifies whether to enable Amazon ECS Exec for the tasks within the service.

<a name="enable_route53_health_check" className="snap-top"></a>

* [**`enable_route53_health_check`**](#enable_route53_health_check) &mdash; Set this to true to create a route 53 health check and Cloudwatch alarm that will alert if your domain becomes unreachable

<a name="expose_ecs_service_to_other_ecs_nodes" className="snap-top"></a>

* [**`expose_ecs_service_to_other_ecs_nodes`**](#expose_ecs_service_to_other_ecs_nodes) &mdash; Set this to true to allow the ecs service to be accessed by other ecs nodes

<a name="fixed_response_rules" className="snap-top"></a>

* [**`fixed_response_rules`**](#fixed_response_rules) &mdash; 

<a name="forward_rules" className="snap-top"></a>

* [**`forward_rules`**](#forward_rules) &mdash; 

<a name="health_check_enabled" className="snap-top"></a>

* [**`health_check_enabled`**](#health_check_enabled) &mdash; If true, enable health checks on the target group. Only applies to ELBv2. For CLBs, health checks are not configurable.

<a name="health_check_grace_period_seconds" className="snap-top"></a>

* [**`health_check_grace_period_seconds`**](#health_check_grace_period_seconds) &mdash; Seconds to ignore failing load balancer health checks on newly instantiated tasks to prevent premature shutdown, up to 2,147,483,647. Only valid for services configured to use load balancers.

<a name="health_check_healthy_threshold" className="snap-top"></a>

* [**`health_check_healthy_threshold`**](#health_check_healthy_threshold) &mdash; The number of consecutive successful health checks required before considering an unhealthy Target healthy. The acceptable range is 2 to 10.

<a name="health_check_interval" className="snap-top"></a>

* [**`health_check_interval`**](#health_check_interval) &mdash; The approximate amount of time, in seconds, between health checks of an individual Target. Minimum value 5 seconds, Maximum value 300 seconds.

<a name="health_check_matcher" className="snap-top"></a>

* [**`health_check_matcher`**](#health_check_matcher) &mdash; The HTTP codes to use when checking for a successful response from a Target. You can specify multiple values (e.g. '200,202') or a range of values (e.g. '200-299'). Required when using ALBs.

<a name="health_check_path" className="snap-top"></a>

* [**`health_check_path`**](#health_check_path) &mdash; The ping path that is the destination on the Targets for health checks. Required when using ALBs.

<a name="health_check_port" className="snap-top"></a>

* [**`health_check_port`**](#health_check_port) &mdash; The port the ELB uses when performing health checks on Targets. The default is to use the port on which each target receives traffic from the load balancer, indicated by the value 'traffic-port'.

<a name="health_check_timeout" className="snap-top"></a>

* [**`health_check_timeout`**](#health_check_timeout) &mdash; The amount of time, in seconds, during which no response from a Target means a failed health check. The acceptable range is 2 to 60 seconds.

<a name="health_check_unhealthy_threshold" className="snap-top"></a>

* [**`health_check_unhealthy_threshold`**](#health_check_unhealthy_threshold) &mdash; The number of consecutive failed health checks required before considering a target unhealthy. The acceptable range is 2 to 10. For NLBs, this value must be the same as the [`health_check_healthy_threshold`](#health_check_healthy_threshold).

<a name="high_cpu_utilization_period" className="snap-top"></a>

* [**`high_cpu_utilization_period`**](#high_cpu_utilization_period) &mdash; The period, in seconds, over which to measure the CPU utilization percentage

<a name="high_cpu_utilization_threshold" className="snap-top"></a>

* [**`high_cpu_utilization_threshold`**](#high_cpu_utilization_threshold) &mdash; Trigger an alarm if the ECS Service has a CPU utilization percentage above this threshold

<a name="high_memory_utilization_period" className="snap-top"></a>

* [**`high_memory_utilization_period`**](#high_memory_utilization_period) &mdash; The period, in seconds, over which to measure the memory utilization percentage

<a name="high_memory_utilization_threshold" className="snap-top"></a>

* [**`high_memory_utilization_threshold`**](#high_memory_utilization_threshold) &mdash; Trigger an alarm if the ECS Service has a memory utilization percentage above this threshold

<a name="hosted_zone_id" className="snap-top"></a>

* [**`hosted_zone_id`**](#hosted_zone_id) &mdash; The ID of the Route 53 hosted zone into which the Route 53 DNS record should be written

<a name="iam_policy" className="snap-top"></a>

* [**`iam_policy`**](#iam_policy) &mdash; An object defining the policy to attach to the ECS task. Accepts a map of objects, where the map keys are sids for IAM policy statements, and the object fields are the resources, actions, and the effect ("Allow" or "Deny") of the statement.

<a name="launch_type" className="snap-top"></a>

* [**`launch_type`**](#launch_type) &mdash; The launch type of the ECS service. Must be one of EC2 or FARGATE. When using FARGATE, you must set the network mode to awsvpc and configure it. When using EC2, you can configure the placement strategy using the variables [`placement_strategy_type`](#placement_strategy_type), [`placement_strategy_field`](#placement_strategy_field), [`placement_constraint_type`](#placement_constraint_type), [`placement_constraint_expression`](#placement_constraint_expression). This variable is ignored if [`capacity_provider_strategy`](#capacity_provider_strategy) is provided.

<a name="lb_hosted_zone_id" className="snap-top"></a>

* [**`lb_hosted_zone_id`**](#lb_hosted_zone_id) &mdash; The ID of the Route 53 Hosted Zone in which to create a DNS A record pointed to the ECS service's load balancer

<a name="max_number_of_tasks" className="snap-top"></a>

* [**`max_number_of_tasks`**](#max_number_of_tasks) &mdash; The maximum number of instances of the ECS Service to run. Auto scaling will never scale out above this number.

<a name="memory" className="snap-top"></a>

* [**`memory`**](#memory) &mdash; How much memory, in MB, to give the ECS Service.

<a name="min_number_of_tasks" className="snap-top"></a>

* [**`min_number_of_tasks`**](#min_number_of_tasks) &mdash; The minimum number of instances of the ECS Service to run. Auto scaling will never scale in below this number.

<a name="network_configuration" className="snap-top"></a>

* [**`network_configuration`**](#network_configuration) &mdash; The configuration to use when setting up the VPC network mode. Required and only used if [`network_mode`](#network_mode) is awsvpc.

<a name="network_mode" className="snap-top"></a>

* [**`network_mode`**](#network_mode) &mdash; The Docker networking mode to use for the containers in the task. The valid values are none, bridge, awsvpc, and host. If the [`network_mode`](#network_mode) is set to awsvpc, you must configure [`network_configuration`](#network_configuration).

<a name="original_lb_dns_name" className="snap-top"></a>

* [**`original_lb_dns_name`**](#original_lb_dns_name) &mdash; The DNS name that was assigned by AWS to the load balancer upon creation

<a name="placement_constraint_expression" className="snap-top"></a>

* [**`placement_constraint_expression`**](#placement_constraint_expression) &mdash; Cluster Query Language expression to apply to the constraint for matching. Does not need to be specified for the distinctInstance constraint type.

<a name="placement_constraint_type" className="snap-top"></a>

* [**`placement_constraint_type`**](#placement_constraint_type) &mdash; The type of constraint to apply for container instance placement. The only valid values at this time are memberOf and distinctInstance.

<a name="placement_strategy_field" className="snap-top"></a>

* [**`placement_strategy_field`**](#placement_strategy_field) &mdash; The field to apply the placement strategy against. For the spread placement strategy, valid values are instanceId (or host, which has the same effect), or any platform or custom attribute that is applied to a container instance, such as attribute:ecs.availability-zone. For the binpack placement strategy, valid values are cpu and memory. For the random placement strategy, this field is not used.

<a name="placement_strategy_type" className="snap-top"></a>

* [**`placement_strategy_type`**](#placement_strategy_type) &mdash; The strategy to use when placing ECS tasks on EC2 instances. Can be binpack (default), random, or spread.

<a name="propagate_tags" className="snap-top"></a>

* [**`propagate_tags`**](#propagate_tags) &mdash; Whether tags should be propogated to the tasks from the service or from the task definition. Valid values are SERVICE and [`TASK_DEFINITION`](#TASK_DEFINITION). Defaults to SERVICE. If set to null, no tags are created for tasks.

<a name="proxy_configuration_container_name" className="snap-top"></a>

* [**`proxy_configuration_container_name`**](#proxy_configuration_container_name) &mdash; Use the name of the Envoy proxy container from [``container_definitions`](#`container_definitions)` as the container name.

<a name="proxy_configuration_properties" className="snap-top"></a>

* [**`proxy_configuration_properties`**](#proxy_configuration_properties) &mdash; A map of network configuration parameters to provide the Container Network Interface (CNI) plugin.

<a name="redirect_rules" className="snap-top"></a>

* [**`redirect_rules`**](#redirect_rules) &mdash; 

<a name="route53_health_check_path" className="snap-top"></a>

* [**`route53_health_check_path`**](#route53_health_check_path) &mdash; The path, without any leading slash, that can be used as a health check (e.g. healthcheck) by Route 53. Should return a 200 OK when the service is up and running.

<a name="route53_health_check_port" className="snap-top"></a>

* [**`route53_health_check_port`**](#route53_health_check_port) &mdash; The port to use for Route 53 health checks. This should be the port for the service that is available at the publicly accessible domain name [`(var.domain_name`](#(var.domain_name)).

<a name="route53_health_check_protocol" className="snap-top"></a>

* [**`route53_health_check_protocol`**](#route53_health_check_protocol) &mdash; The protocol to use for Route 53 health checks. Should be one of HTTP, HTTPS.

<a name="secrets_access" className="snap-top"></a>

* [**`secrets_access`**](#secrets_access) &mdash; A list of ARNs of Secrets Manager secrets that the task should have permissions to read. The IAM role for the task will be granted `secretsmanager:GetSecretValue` for each secret in the list. The ARN can be either the complete ARN, including the randomly generated suffix, or the ARN without the suffix. If the latter, the module will look up the full ARN automatically. This is helpful in cases where you don't yet know the randomly generated suffix because the rest of the ARN is a predictable value.

<a name="secrets_manager_arns" className="snap-top"></a>

* [**`secrets_manager_arns`**](#secrets_manager_arns) &mdash; A list of ARNs for Secrets Manager secrets that the ECS execution IAM policy should be granted access to read. Note that this is different from the ECS task IAM policy. The execution policy is concerned with permissions required to run the ECS task.

<a name="secrets_manager_kms_key_arn" className="snap-top"></a>

* [**`secrets_manager_kms_key_arn`**](#secrets_manager_kms_key_arn) &mdash; The ARN of the kms key associated with secrets manager

<a name="service_name" className="snap-top"></a>

* [**`service_name`**](#service_name) &mdash; The name of the ECS service (e.g. my-service-stage)

<a name="service_tags" className="snap-top"></a>

* [**`service_tags`**](#service_tags) &mdash; A map of tags to apply to the ECS service. Each item in this list should be a map with the parameters key and value.

<a name="task_cpu" className="snap-top"></a>

* [**`task_cpu`**](#task_cpu) &mdash; The CPU units for the instances that Fargate will spin up. Options here: [`https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate`](#https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate).html#fargate-tasks-size. Required when using FARGATE launch type.

<a name="task_definition_tags" className="snap-top"></a>

* [**`task_definition_tags`**](#task_definition_tags) &mdash; A map of tags to apply to the task definition. Each item in this list should be a map with the parameters key and value.

<a name="task_memory" className="snap-top"></a>

* [**`task_memory`**](#task_memory) &mdash; The memory units for the instances that Fargate will spin up. Options here: [`https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate`](#https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate).html#fargate-tasks-size. Required when using FARGATE launch type.

<a name="use_alb_sticky_sessions" className="snap-top"></a>

* [**`use_alb_sticky_sessions`**](#use_alb_sticky_sessions) &mdash; If true, the ALB will use use Sticky Sessions as described at https://goo.gl/VLcNbk. Only used if [`elb_target_groups`](#elb_target_groups) is set. Note that this can only be true when associating with an ALB. This cannot be used with CLBs or NLBs.

<a name="use_auto_scaling" className="snap-top"></a>

* [**`use_auto_scaling`**](#use_auto_scaling) &mdash; Whether or not to enable auto scaling for the ecs service

<a name="use_custom_docker_run_command" className="snap-top"></a>

* [**`use_custom_docker_run_command`**](#use_custom_docker_run_command) &mdash; Set this to true if you want to pass a custom docker run command. If you set this to true, you must supply [`custom_docker_command`](#custom_docker_command)

<a name="volumes" className="snap-top"></a>

* [**`volumes`**](#volumes) &mdash; (Optional) A map of volume blocks that containers in your task may use. The key should be the name of the volume and the value should be a map compatible with [`https://www.terraform.io/docs/providers/aws/r/ecs_task_definition`](#https://www.terraform.io/docs/providers/aws/r/ecs_task_definition).html#volume-block-arguments, but not including the name parameter.

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="all_metric_widgets" className="snap-top"></a>

* [**`all_metric_widgets`**](#all_metric_widgets) &mdash; A list of all the CloudWatch Dashboard metric widgets available in this module.

<a name="aws_ecs_task_definition_arn" className="snap-top"></a>

* [**`aws_ecs_task_definition_arn`**](#aws_ecs_task_definition_arn) &mdash; The ARN of the ECS task definition

<a name="aws_ecs_task_definition_canary_arn" className="snap-top"></a>

* [**`aws_ecs_task_definition_canary_arn`**](#aws_ecs_task_definition_canary_arn) &mdash; The ARN of the canary ECS task definition

<a name="canary_service_arn" className="snap-top"></a>

* [**`canary_service_arn`**](#canary_service_arn) &mdash; The ARN of the canary service. Canary services are optional and can be helpful when you're attempting to verify a release candidate

<a name="capacity_provider_strategy" className="snap-top"></a>

* [**`capacity_provider_strategy`**](#capacity_provider_strategy) &mdash; The capacity provider strategy determines how infrastructure (such as EC2 instances or Fargate) that backs your ECS service is managed. See https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cluster-capacity-providers.html for more information

<a name="ecs_node_port_mappings" className="snap-top"></a>

* [**`ecs_node_port_mappings`**](#ecs_node_port_mappings) &mdash; A map representing the instance host and container ports that should be opened

<a name="ecs_task_execution_iam_role_arn" className="snap-top"></a>

* [**`ecs_task_execution_iam_role_arn`**](#ecs_task_execution_iam_role_arn) &mdash; The ARN of the ECS task's IAM role

<a name="ecs_task_execution_iam_role_name" className="snap-top"></a>

* [**`ecs_task_execution_iam_role_name`**](#ecs_task_execution_iam_role_name) &mdash; The name of the ECS task execution IAM role. The execution role is used by the ECS container agent to make calls to the ECS API, pull container images from ECR, use the logs driver, etc

<a name="ecs_task_iam_role_arn" className="snap-top"></a>

* [**`ecs_task_iam_role_arn`**](#ecs_task_iam_role_arn) &mdash; The ARN of the IAM role associated with the ECS task

<a name="ecs_task_iam_role_name" className="snap-top"></a>

* [**`ecs_task_iam_role_name`**](#ecs_task_iam_role_name) &mdash; The name of the IAM role granting permissions to the running ECS task itself. Note this role is separate from the execution role which is assumed by the ECS container agent

<a name="metric_widget_ecs_service_cpu_usage" className="snap-top"></a>

* [**`metric_widget_ecs_service_cpu_usage`**](#metric_widget_ecs_service_cpu_usage) &mdash; The metric widget for the ECS service's CPU usage 

<a name="metric_widget_ecs_service_memory_usage" className="snap-top"></a>

* [**`metric_widget_ecs_service_memory_usage`**](#metric_widget_ecs_service_memory_usage) &mdash; The metric widget for the ECS service's memory usage

<a name="route53_domain_name" className="snap-top"></a>

* [**`route53_domain_name`**](#route53_domain_name) &mdash; The domain name of the optional route53 record, which points at the load balancer for the ECS service

<a name="service_app_autoscaling_target_arn" className="snap-top"></a>

* [**`service_app_autoscaling_target_arn`**](#service_app_autoscaling_target_arn) &mdash; The ARN of the app autoscaling target

<a name="service_app_autoscaling_target_resource_id" className="snap-top"></a>

* [**`service_app_autoscaling_target_resource_id`**](#service_app_autoscaling_target_resource_id) &mdash; The resource ID of the autoscaling target

<a name="service_arn" className="snap-top"></a>

* [**`service_arn`**](#service_arn) &mdash; The ARN of the ECS service

<a name="service_iam_role_arn" className="snap-top"></a>

* [**`service_iam_role_arn`**](#service_iam_role_arn) &mdash; The ARN of the service role associated with the ELB of the ECS service

<a name="service_iam_role_name" className="snap-top"></a>

* [**`service_iam_role_name`**](#service_iam_role_name) &mdash; The name of the service role associated with the ELB of the ECS service

<a name="target_group_arns" className="snap-top"></a>

* [**`target_group_arns`**](#target_group_arns) &mdash; The ARNs of the ECS service's load balancer's target groups

<a name="target_group_names" className="snap-top"></a>

* [**`target_group_names`**](#target_group_names) &mdash; The names of the ECS service's load balancer's target groups

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"36af31281947d09fd9727d6764c37445"}
##DOCS-SOURCER-END -->
