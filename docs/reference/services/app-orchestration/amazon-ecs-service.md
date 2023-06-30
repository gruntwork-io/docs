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
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.104.14" lastModifiedVersion="0.104.12"/>

# Amazon ECS Service

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/ecs-service" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=services%2Fecs-service" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>

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

*   [modules](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal
    submodules.
*   [examples](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples): This folder contains working examples of how to use the submodules.
*   [test](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

## Manage

For information on how to manage your ECS service, see the documentation in the
[module ecs](https://github.com/gruntwork-io/terraform-aws-ecs) repo.


## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ECS-SERVICE MODULE
# ------------------------------------------------------------------------------------------------------

module "ecs_service" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/ecs-service?ref=v0.104.14"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of container definitions to use for the ECS task. Each entry
  # corresponds to a different ECS container definition.
  container_definitions = <any>

  # A map of all the listeners on the load balancer. The keys should be the port
  # numbers and the values should be the ARN of the listener for that port.
  default_listener_arns = <map(string)>

  # The default port numbers on the load balancer to attach listener rules to.
  # You can override this default on a rule-by-rule basis by setting the
  # listener_ports parameter in each rule. The port numbers specified in this
  # variable and the listener_ports parameter must exist in var.listener_arns.
  default_listener_ports = <list(string)>

  # The ARN of the cluster to which the ecs service should be deployed.
  ecs_cluster_arn = <string>

  # The name of the ecs cluster to deploy the ecs service onto.
  ecs_cluster_name = <string>

  # The name of the ECS service (e.g. my-service-stage)
  service_name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of ARNs of the SNS topic(s) to write alarm events to
  alarm_sns_topic_arns = []

  # A list of SNS topic ARNs to notify when the route53 health check changes to
  # ALARM, OK, or INSUFFICIENT_DATA state. Note: these SNS topics MUST be in
  # us-east-1! This is because Route 53 only sends CloudWatch metrics to
  # us-east-1, so we must create the alarm in that region, and therefore, can
  # only notify SNS topics in that region
  alarm_sns_topic_arns_us_east_1 = []

  # The time period, in seconds, during which requests from a client should be
  # routed to the same Target. After this time period expires, the load
  # balancer-generated cookie is considered stale. The acceptable range is 1
  # second to 1 week (604800 seconds). The default value is 1 day (86400
  # seconds). Only used if var.elb_target_groups is set.
  alb_sticky_session_cookie_duration = 86400

  # The type of Sticky Sessions to use. See https://goo.gl/MNwqNu for possible
  # values. Only used if var.elb_target_groups is set.
  alb_sticky_session_type = "lb_cookie"

  # List of container definitions to use for the canary ECS task. Each entry
  # corresponds to a different ECS container definition.
  canary_container_definitions = []

  # Which version of the ECS Service Docker container to deploy as a canary
  # (e.g. 0.57)
  canary_version = null

  # The capacity provider strategy to use for the service. Note that the
  # capacity providers have to be present on the ECS cluster before deploying
  # the ECS service. When provided, var.launch_type is ignored.
  capacity_provider_strategy = []

  # The name of the container, as it appears in the var.task_arn Task
  # definition, to associate with a CLB. Currently, ECS can only associate a CLB
  # with a single container per service. Only used if clb_name is set.
  clb_container_name = null

  # The port on the container in var.clb_container_name to associate with an
  # CLB. Currently, ECS can only associate a CLB with a single container per
  # service. Only used if clb_name is set.
  clb_container_port = null

  # The name of a Classic Load Balancer (CLB) to associate with this service.
  # Containers in the service will automatically register with the CLB when
  # booting up. Set to null if using ELBv2.
  clb_name = null

  # The ARN of a KMS CMK to use for encrypting log events in the CloudWatch
  # Logs. Set to null to disable encryption. Only used if
  # var.create_cloudwatch_log_group is true.
  cloudwatch_log_group_kms_key_id = null

  # The name for the Cloudwatch logs that will be generated by the ecs service.
  # Only used (and required) if var.create_cloudwatch_log_group is true.
  cloudwatch_log_group_name = null

  # Number of days to retain log events. Possible values are: 1, 3, 5, 7, 14,
  # 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1827, 3653, and 0. Select 0
  # to never expire. Only used if var.create_cloudwatch_log_group is true.
  cloudwatch_log_group_retention = null

  # A map of tags to apply to the Cloudwatch log group. Each item in this list
  # should be a map with the parameters key and value. Only used if
  # var.create_cloudwatch_log_group is true.
  cloudwatch_log_group_tags = {}

  # The number of CPU units to allocate to the ECS Service.
  cpu = 1

  # When true, create and manage the CloudWatch Log Group in the Terraform
  # module instead of relying on ECS. This is useful for configuring options
  # that are not available in the ECS native feature of managing the Log Group
  # (e.g., encryption support).
  create_cloudwatch_log_group = false

  # Set to true if you want a DNS record automatically created and pointed at
  # the the load balancer for the ECS service
  create_route53_entry = false

  # If var.use_custom_docker_run_command is set to true, set this variable to
  # the custom docker run command you want to provide
  custom_docker_command = null

  # The name to use for the ECS Service IAM role, which is used to grant
  # permissions to the ECS service to register the task IPs to ELBs.
  custom_ecs_service_role_name = null

  # Prefix for name of the custom IAM policies created by this module (those
  # resulting from var.iam_policy and var.secrets_access). If omitted, defaults
  # to var.service_name.
  custom_iam_policy_prefix = null

  # Prefix for name of the IAM role used by the ECS task.
  custom_iam_role_name_prefix = null

  # Prefix for name of task execution IAM role and policy that grants access to
  # CloudWatch and ECR.
  custom_task_execution_iam_role_name_prefix = null

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # Set the logging level of the deployment check script. You can set this to
  # `error`, `warn`, or `info`, in increasing verbosity.
  deployment_check_loglevel = "info"

  # Seconds to wait before timing out each check for verifying ECS service
  # deployment. See ecs_deploy_check_binaries for more details.
  deployment_check_timeout_seconds = 600

  # Set to 'true' to prevent the task from attempting to continuously redeploy
  # after a failed health check.
  deployment_circuit_breaker_enabled = false

  # Set to 'true' to also automatically roll back to the last successful
  # deployment. deploy_circuit_breaker_enabled must also be true to enable this
  # behavior.
  deployment_circuit_breaker_rollback = false

  # The upper limit, as a percentage of var.desired_number_of_tasks, of the
  # number of running tasks that can be running in a service during a
  # deployment. Setting this to more than 100 means that during deployment, ECS
  # will deploy new instances of a Task before undeploying the old ones.
  deployment_maximum_percent = 200

  # The lower limit, as a percentage of var.desired_number_of_tasks, of the
  # number of running tasks that must remain running and healthy in a service
  # during a deployment. Setting this to less than 100 means that during
  # deployment, ECS may undeploy old instances of a Task before deploying new
  # ones.
  deployment_minimum_healthy_percent = 100

  # How many instances of the ECS Service to run across the ECS cluster for a
  # canary deployment. Typically, only 0 or 1 should be used.
  desired_number_of_canary_tasks = 0

  # How many instances of the ECS Service to run across the ECS cluster
  desired_number_of_tasks = 1

  # The domain name to create a route 53 record for. This DNS record will point
  # to the load balancer for the ECS service
  domain_name = null

  # The ID of the security group that should be applied to ecs service instances
  ecs_instance_security_group_id = null

  # A map of ports to be opened via security groups applied to the EC2 instances
  # that back the ECS cluster, when not using fargate. The key should be the
  # container port and the value should be what host port to map it to.
  ecs_node_port_mappings = {}

  # (Optional) A map of EFS volumes that containers in your task may use. Each
  # item in the list should be a map compatible with
  # https://www.terraform.io/docs/providers/aws/r/ecs_task_definition.html#efs-volume-configuration-arguments.
  efs_volumes = {}

  # The amount time for targets to warm up before the load balancer sends them a
  # full share of requests. The range is 30-900 seconds or 0 to disable. The
  # default value is 0 seconds. Only used if var.elb_target_groups is set.
  elb_slow_start = 0

  # The amount of time for Elastic Load Balancing to wait before changing the
  # state of a deregistering target from draining to unused. The range is 0-3600
  # seconds. Only used if var.elb_target_groups is set.
  elb_target_group_deregistration_delay = 300

  # The ID of the VPC in which to create the target group. Only used if
  # var.elb_target_groups is set.
  elb_target_group_vpc_id = null

  # Configurations for ELB target groups for ALBs and NLBs that should be
  # associated with the ECS Tasks. Each entry corresponds to a separate target
  # group. Set to the empty object ({}) if you are not using an ALB or NLB.
  elb_target_groups = {}

  # Set to true to enable Cloudwatch alarms on the ecs service instances
  enable_cloudwatch_alarms = false

  # Whether or not to enable the ECS deployment check binary to make terraform
  # wait for the task to be deployed. See ecs_deploy_check_binaries for more
  # details. You must install the companion binary before the check can be used.
  # Refer to the README for more details.
  enable_ecs_deployment_check = true

  # Specifies whether to enable Amazon ECS Exec for the tasks within the
  # service.
  enable_execute_command = false

  # Set this to true to create a route 53 health check and Cloudwatch alarm that
  # will alert if your domain becomes unreachable
  enable_route53_health_check = false

  # Set this to true to allow the ecs service to be accessed by other ecs nodes
  expose_ecs_service_to_other_ecs_nodes = false

  fixed_response_rules = {}

  forward_rules = {}

  # If true, enable health checks on the target group. Only applies to ELBv2.
  # For CLBs, health checks are not configurable.
  health_check_enabled = true

  # Seconds to ignore failing load balancer health checks on newly instantiated
  # tasks to prevent premature shutdown, up to 2,147,483,647. Only valid for
  # services configured to use load balancers.
  health_check_grace_period_seconds = 0

  # The number of consecutive successful health checks required before
  # considering an unhealthy Target healthy. The acceptable range is 2 to 10.
  health_check_healthy_threshold = 5

  # The approximate amount of time, in seconds, between health checks of an
  # individual Target. Minimum value 5 seconds, Maximum value 300 seconds.
  health_check_interval = 30

  # The HTTP codes to use when checking for a successful response from a Target.
  # You can specify multiple values (e.g. '200,202') or a range of values (e.g.
  # '200-299'). Required when using ALBs.
  health_check_matcher = "200"

  # The ping path that is the destination on the Targets for health checks.
  # Required when using ALBs.
  health_check_path = "/"

  # The port the ELB uses when performing health checks on Targets. The default
  # is to use the port on which each target receives traffic from the load
  # balancer, indicated by the value 'traffic-port'.
  health_check_port = "traffic-port"

  # The amount of time, in seconds, during which no response from a Target means
  # a failed health check. The acceptable range is 2 to 60 seconds.
  health_check_timeout = 5

  # The number of consecutive failed health checks required before considering a
  # target unhealthy. The acceptable range is 2 to 10. For NLBs, this value must
  # be the same as the health_check_healthy_threshold.
  health_check_unhealthy_threshold = 2

  # The period, in seconds, over which to measure the CPU utilization percentage
  high_cpu_utilization_period = 300

  # Trigger an alarm if the ECS Service has a CPU utilization percentage above
  # this threshold
  high_cpu_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Must
  # be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_cpu_utilization_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the memory utilization
  # percentage
  high_memory_utilization_period = 300

  # Trigger an alarm if the ECS Service has a memory utilization percentage
  # above this threshold
  high_memory_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Must
  # be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_memory_utilization_treat_missing_data = "missing"

  # The ID of the Route 53 hosted zone into which the Route 53 DNS record should
  # be written
  hosted_zone_id = null

  # An object defining the policy to attach to the ECS task. Accepts a map of
  # objects, where the map keys are sids for IAM policy statements, and the
  # object fields are the resources, actions, and the effect ("Allow" or "Deny")
  # of the statement.
  iam_policy = null

  # The launch type of the ECS service. Must be one of EC2 or FARGATE. When
  # using FARGATE, you must set the network mode to awsvpc and configure it.
  # When using EC2, you can configure the placement strategy using the variables
  # var.placement_strategy_type, var.placement_strategy_field,
  # var.placement_constraint_type, var.placement_constraint_expression. This
  # variable is ignored if var.capacity_provider_strategy is provided.
  launch_type = "EC2"

  # The ID of the Route 53 Hosted Zone in which to create a DNS A record pointed
  # to the ECS service's load balancer
  lb_hosted_zone_id = null

  # A map of tags to apply to the elb target group. Each item in this list
  # should be a map with the parameters key and value.
  lb_target_group_tags = {}

  # The maximum number of instances of the ECS Service to run. Auto scaling will
  # never scale out above this number.
  max_number_of_tasks = 3

  # How much memory, in MB, to give the ECS Service.
  memory = 500

  # The minimum number of instances of the ECS Service to run. Auto scaling will
  # never scale in below this number.
  min_number_of_tasks = 1

  # The configuration to use when setting up the VPC network mode. Required and
  # only used if network_mode is awsvpc.
  network_configuration = null

  # The Docker networking mode to use for the containers in the task. The valid
  # values are none, bridge, awsvpc, and host. If the network_mode is set to
  # awsvpc, you must configure var.network_configuration.
  network_mode = "bridge"

  # The DNS name that was assigned by AWS to the load balancer upon creation
  original_lb_dns_name = null

  # Cluster Query Language expression to apply to the constraint for matching.
  # Does not need to be specified for the distinctInstance constraint type.
  placement_constraint_expression = "attribute:ecs.ami-id != 'ami-fake'"

  # The type of constraint to apply for container instance placement. The only
  # valid values at this time are memberOf and distinctInstance.
  placement_constraint_type = "memberOf"

  # The field to apply the placement strategy against. For the spread placement
  # strategy, valid values are instanceId (or host, which has the same effect),
  # or any platform or custom attribute that is applied to a container instance,
  # such as attribute:ecs.availability-zone. For the binpack placement strategy,
  # valid values are cpu and memory. For the random placement strategy, this
  # field is not used.
  placement_strategy_field = "cpu"

  # The strategy to use when placing ECS tasks on EC2 instances. Can be binpack
  # (default), random, or spread.
  placement_strategy_type = "binpack"

  # Whether tags should be propogated to the tasks from the service or from the
  # task definition. Valid values are SERVICE and TASK_DEFINITION. Defaults to
  # SERVICE. If set to null, no tags are created for tasks.
  propagate_tags = "SERVICE"

  # Use the name of the Envoy proxy container from `container_definitions` as
  # the container name.
  proxy_configuration_container_name = null

  # A map of network configuration parameters to provide the Container Network
  # Interface (CNI) plugin.
  proxy_configuration_properties = null

  redirect_rules = {}

  # The path, without any leading slash, that can be used as a health check
  # (e.g. healthcheck) by Route 53. Should return a 200 OK when the service is
  # up and running.
  route53_health_check_path = "/"

  # The port to use for Route 53 health checks. This should be the port for the
  # service that is available at the publicly accessible domain name
  # (var.domain_name).
  route53_health_check_port = 80

  # The protocol to use for Route 53 health checks. Should be one of HTTP,
  # HTTPS.
  route53_health_check_protocol = "HTTP"

  # The optional external_id to be used in the us-east-1 provider block defined
  # in the route53-health-check-alarms module.  This module configures its own
  # AWS provider to ensure resources are created in us-east-1.
  route53_health_check_provider_external_id = null

  # The optional AWS profile to be used in the us-east-1 provider block defined
  # in the route53-health-check-alarms module.  This module configures its own
  # AWS provider to ensure resources are created in us-east-1.
  route53_health_check_provider_profile = null

  # The optional role_arn to be used in the us-east-1 provider block defined in
  # the route53-health-check-alarms module.  This module configures its own AWS
  # provider to ensure resources are created in us-east-1.
  route53_health_check_provider_role_arn = null

  # The optional session_name to be used in the us-east-1 provider block defined
  # in the route53-health-check-alarms module.  This module configures its own
  # AWS provider to ensure resources are created in us-east-1.
  route53_health_check_provider_session_name = null

  # The optional path to a credentials file used in the us-east-1 provider block
  # defined in the route53-health-check-alarms module.  This module configures
  # its own AWS provider to ensure resources are created in us-east-1.
  route53_health_check_provider_shared_credentials_file = null

  # Define runtime platform options
  runtime_platform = null

  # A list of ARNs of Secrets Manager secrets that the task should have
  # permissions to read. The IAM role for the task will be granted
  # `secretsmanager:GetSecretValue` for each secret in the list. The ARN can be
  # either the complete ARN, including the randomly generated suffix, or the ARN
  # without the suffix. If the latter, the module will look up the full ARN
  # automatically. This is helpful in cases where you don't yet know the
  # randomly generated suffix because the rest of the ARN is a predictable
  # value.
  secrets_access = []

  # A list of ARNs for Secrets Manager secrets that the ECS execution IAM policy
  # should be granted access to read. Note that this is different from the ECS
  # task IAM policy. The execution policy is concerned with permissions required
  # to run the ECS task. The ARN can be either the complete ARN, including the
  # randomly generated suffix, or the ARN without the suffix. If the latter, the
  # module will look up the full ARN automatically. This is helpful in cases
  # where you don't yet know the randomly generated suffix because the rest of
  # the ARN is a predictable value.
  secrets_manager_arns = []

  # The ARN of the kms key associated with secrets manager
  secrets_manager_kms_key_arn = null

  # The name of the aws_security_group that gets created if var.network_mode is
  # awsvpc and custom rules are specified for the ECS Fargate worker via
  # var.network_configuration.security_group_rules. Defaults to var.service_name
  # if not specified.
  service_security_group_name = null

  # A map of tags to apply to the ECS service. Each item in this list should be
  # a map with the parameters key and value.
  service_tags = {}

  # The CPU units for the instances that Fargate will spin up. Options here:
  # https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html#fargate-tasks-size.
  # Required when using FARGATE launch type.
  task_cpu = null

  # A map of tags to apply to the task definition. Each item in this list should
  # be a map with the parameters key and value.
  task_definition_tags = {}

  # The memory units for the instances that Fargate will spin up. Options here:
  # https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html#fargate-tasks-size.
  # Required when using FARGATE launch type.
  task_memory = null

  # If true, the ALB will use use Sticky Sessions as described at
  # https://goo.gl/VLcNbk. Only used if var.elb_target_groups is set. Note that
  # this can only be true when associating with an ALB. This cannot be used with
  # CLBs or NLBs.
  use_alb_sticky_sessions = false

  # Whether or not to enable auto scaling for the ecs service
  use_auto_scaling = true

  # Set this to true if you want to pass a custom docker run command. If you set
  # this to true, you must supply var.custom_docker_command
  use_custom_docker_run_command = false

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
# DEPLOY GRUNTWORK'S ECS-SERVICE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/ecs-service?ref=v0.104.14"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of container definitions to use for the ECS task. Each entry
  # corresponds to a different ECS container definition.
  container_definitions = <any>

  # A map of all the listeners on the load balancer. The keys should be the port
  # numbers and the values should be the ARN of the listener for that port.
  default_listener_arns = <map(string)>

  # The default port numbers on the load balancer to attach listener rules to.
  # You can override this default on a rule-by-rule basis by setting the
  # listener_ports parameter in each rule. The port numbers specified in this
  # variable and the listener_ports parameter must exist in var.listener_arns.
  default_listener_ports = <list(string)>

  # The ARN of the cluster to which the ecs service should be deployed.
  ecs_cluster_arn = <string>

  # The name of the ecs cluster to deploy the ecs service onto.
  ecs_cluster_name = <string>

  # The name of the ECS service (e.g. my-service-stage)
  service_name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of ARNs of the SNS topic(s) to write alarm events to
  alarm_sns_topic_arns = []

  # A list of SNS topic ARNs to notify when the route53 health check changes to
  # ALARM, OK, or INSUFFICIENT_DATA state. Note: these SNS topics MUST be in
  # us-east-1! This is because Route 53 only sends CloudWatch metrics to
  # us-east-1, so we must create the alarm in that region, and therefore, can
  # only notify SNS topics in that region
  alarm_sns_topic_arns_us_east_1 = []

  # The time period, in seconds, during which requests from a client should be
  # routed to the same Target. After this time period expires, the load
  # balancer-generated cookie is considered stale. The acceptable range is 1
  # second to 1 week (604800 seconds). The default value is 1 day (86400
  # seconds). Only used if var.elb_target_groups is set.
  alb_sticky_session_cookie_duration = 86400

  # The type of Sticky Sessions to use. See https://goo.gl/MNwqNu for possible
  # values. Only used if var.elb_target_groups is set.
  alb_sticky_session_type = "lb_cookie"

  # List of container definitions to use for the canary ECS task. Each entry
  # corresponds to a different ECS container definition.
  canary_container_definitions = []

  # Which version of the ECS Service Docker container to deploy as a canary
  # (e.g. 0.57)
  canary_version = null

  # The capacity provider strategy to use for the service. Note that the
  # capacity providers have to be present on the ECS cluster before deploying
  # the ECS service. When provided, var.launch_type is ignored.
  capacity_provider_strategy = []

  # The name of the container, as it appears in the var.task_arn Task
  # definition, to associate with a CLB. Currently, ECS can only associate a CLB
  # with a single container per service. Only used if clb_name is set.
  clb_container_name = null

  # The port on the container in var.clb_container_name to associate with an
  # CLB. Currently, ECS can only associate a CLB with a single container per
  # service. Only used if clb_name is set.
  clb_container_port = null

  # The name of a Classic Load Balancer (CLB) to associate with this service.
  # Containers in the service will automatically register with the CLB when
  # booting up. Set to null if using ELBv2.
  clb_name = null

  # The ARN of a KMS CMK to use for encrypting log events in the CloudWatch
  # Logs. Set to null to disable encryption. Only used if
  # var.create_cloudwatch_log_group is true.
  cloudwatch_log_group_kms_key_id = null

  # The name for the Cloudwatch logs that will be generated by the ecs service.
  # Only used (and required) if var.create_cloudwatch_log_group is true.
  cloudwatch_log_group_name = null

  # Number of days to retain log events. Possible values are: 1, 3, 5, 7, 14,
  # 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1827, 3653, and 0. Select 0
  # to never expire. Only used if var.create_cloudwatch_log_group is true.
  cloudwatch_log_group_retention = null

  # A map of tags to apply to the Cloudwatch log group. Each item in this list
  # should be a map with the parameters key and value. Only used if
  # var.create_cloudwatch_log_group is true.
  cloudwatch_log_group_tags = {}

  # The number of CPU units to allocate to the ECS Service.
  cpu = 1

  # When true, create and manage the CloudWatch Log Group in the Terraform
  # module instead of relying on ECS. This is useful for configuring options
  # that are not available in the ECS native feature of managing the Log Group
  # (e.g., encryption support).
  create_cloudwatch_log_group = false

  # Set to true if you want a DNS record automatically created and pointed at
  # the the load balancer for the ECS service
  create_route53_entry = false

  # If var.use_custom_docker_run_command is set to true, set this variable to
  # the custom docker run command you want to provide
  custom_docker_command = null

  # The name to use for the ECS Service IAM role, which is used to grant
  # permissions to the ECS service to register the task IPs to ELBs.
  custom_ecs_service_role_name = null

  # Prefix for name of the custom IAM policies created by this module (those
  # resulting from var.iam_policy and var.secrets_access). If omitted, defaults
  # to var.service_name.
  custom_iam_policy_prefix = null

  # Prefix for name of the IAM role used by the ECS task.
  custom_iam_role_name_prefix = null

  # Prefix for name of task execution IAM role and policy that grants access to
  # CloudWatch and ECR.
  custom_task_execution_iam_role_name_prefix = null

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # Set the logging level of the deployment check script. You can set this to
  # `error`, `warn`, or `info`, in increasing verbosity.
  deployment_check_loglevel = "info"

  # Seconds to wait before timing out each check for verifying ECS service
  # deployment. See ecs_deploy_check_binaries for more details.
  deployment_check_timeout_seconds = 600

  # Set to 'true' to prevent the task from attempting to continuously redeploy
  # after a failed health check.
  deployment_circuit_breaker_enabled = false

  # Set to 'true' to also automatically roll back to the last successful
  # deployment. deploy_circuit_breaker_enabled must also be true to enable this
  # behavior.
  deployment_circuit_breaker_rollback = false

  # The upper limit, as a percentage of var.desired_number_of_tasks, of the
  # number of running tasks that can be running in a service during a
  # deployment. Setting this to more than 100 means that during deployment, ECS
  # will deploy new instances of a Task before undeploying the old ones.
  deployment_maximum_percent = 200

  # The lower limit, as a percentage of var.desired_number_of_tasks, of the
  # number of running tasks that must remain running and healthy in a service
  # during a deployment. Setting this to less than 100 means that during
  # deployment, ECS may undeploy old instances of a Task before deploying new
  # ones.
  deployment_minimum_healthy_percent = 100

  # How many instances of the ECS Service to run across the ECS cluster for a
  # canary deployment. Typically, only 0 or 1 should be used.
  desired_number_of_canary_tasks = 0

  # How many instances of the ECS Service to run across the ECS cluster
  desired_number_of_tasks = 1

  # The domain name to create a route 53 record for. This DNS record will point
  # to the load balancer for the ECS service
  domain_name = null

  # The ID of the security group that should be applied to ecs service instances
  ecs_instance_security_group_id = null

  # A map of ports to be opened via security groups applied to the EC2 instances
  # that back the ECS cluster, when not using fargate. The key should be the
  # container port and the value should be what host port to map it to.
  ecs_node_port_mappings = {}

  # (Optional) A map of EFS volumes that containers in your task may use. Each
  # item in the list should be a map compatible with
  # https://www.terraform.io/docs/providers/aws/r/ecs_task_definition.html#efs-volume-configuration-arguments.
  efs_volumes = {}

  # The amount time for targets to warm up before the load balancer sends them a
  # full share of requests. The range is 30-900 seconds or 0 to disable. The
  # default value is 0 seconds. Only used if var.elb_target_groups is set.
  elb_slow_start = 0

  # The amount of time for Elastic Load Balancing to wait before changing the
  # state of a deregistering target from draining to unused. The range is 0-3600
  # seconds. Only used if var.elb_target_groups is set.
  elb_target_group_deregistration_delay = 300

  # The ID of the VPC in which to create the target group. Only used if
  # var.elb_target_groups is set.
  elb_target_group_vpc_id = null

  # Configurations for ELB target groups for ALBs and NLBs that should be
  # associated with the ECS Tasks. Each entry corresponds to a separate target
  # group. Set to the empty object ({}) if you are not using an ALB or NLB.
  elb_target_groups = {}

  # Set to true to enable Cloudwatch alarms on the ecs service instances
  enable_cloudwatch_alarms = false

  # Whether or not to enable the ECS deployment check binary to make terraform
  # wait for the task to be deployed. See ecs_deploy_check_binaries for more
  # details. You must install the companion binary before the check can be used.
  # Refer to the README for more details.
  enable_ecs_deployment_check = true

  # Specifies whether to enable Amazon ECS Exec for the tasks within the
  # service.
  enable_execute_command = false

  # Set this to true to create a route 53 health check and Cloudwatch alarm that
  # will alert if your domain becomes unreachable
  enable_route53_health_check = false

  # Set this to true to allow the ecs service to be accessed by other ecs nodes
  expose_ecs_service_to_other_ecs_nodes = false

  fixed_response_rules = {}

  forward_rules = {}

  # If true, enable health checks on the target group. Only applies to ELBv2.
  # For CLBs, health checks are not configurable.
  health_check_enabled = true

  # Seconds to ignore failing load balancer health checks on newly instantiated
  # tasks to prevent premature shutdown, up to 2,147,483,647. Only valid for
  # services configured to use load balancers.
  health_check_grace_period_seconds = 0

  # The number of consecutive successful health checks required before
  # considering an unhealthy Target healthy. The acceptable range is 2 to 10.
  health_check_healthy_threshold = 5

  # The approximate amount of time, in seconds, between health checks of an
  # individual Target. Minimum value 5 seconds, Maximum value 300 seconds.
  health_check_interval = 30

  # The HTTP codes to use when checking for a successful response from a Target.
  # You can specify multiple values (e.g. '200,202') or a range of values (e.g.
  # '200-299'). Required when using ALBs.
  health_check_matcher = "200"

  # The ping path that is the destination on the Targets for health checks.
  # Required when using ALBs.
  health_check_path = "/"

  # The port the ELB uses when performing health checks on Targets. The default
  # is to use the port on which each target receives traffic from the load
  # balancer, indicated by the value 'traffic-port'.
  health_check_port = "traffic-port"

  # The amount of time, in seconds, during which no response from a Target means
  # a failed health check. The acceptable range is 2 to 60 seconds.
  health_check_timeout = 5

  # The number of consecutive failed health checks required before considering a
  # target unhealthy. The acceptable range is 2 to 10. For NLBs, this value must
  # be the same as the health_check_healthy_threshold.
  health_check_unhealthy_threshold = 2

  # The period, in seconds, over which to measure the CPU utilization percentage
  high_cpu_utilization_period = 300

  # Trigger an alarm if the ECS Service has a CPU utilization percentage above
  # this threshold
  high_cpu_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Must
  # be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_cpu_utilization_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the memory utilization
  # percentage
  high_memory_utilization_period = 300

  # Trigger an alarm if the ECS Service has a memory utilization percentage
  # above this threshold
  high_memory_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Must
  # be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_memory_utilization_treat_missing_data = "missing"

  # The ID of the Route 53 hosted zone into which the Route 53 DNS record should
  # be written
  hosted_zone_id = null

  # An object defining the policy to attach to the ECS task. Accepts a map of
  # objects, where the map keys are sids for IAM policy statements, and the
  # object fields are the resources, actions, and the effect ("Allow" or "Deny")
  # of the statement.
  iam_policy = null

  # The launch type of the ECS service. Must be one of EC2 or FARGATE. When
  # using FARGATE, you must set the network mode to awsvpc and configure it.
  # When using EC2, you can configure the placement strategy using the variables
  # var.placement_strategy_type, var.placement_strategy_field,
  # var.placement_constraint_type, var.placement_constraint_expression. This
  # variable is ignored if var.capacity_provider_strategy is provided.
  launch_type = "EC2"

  # The ID of the Route 53 Hosted Zone in which to create a DNS A record pointed
  # to the ECS service's load balancer
  lb_hosted_zone_id = null

  # A map of tags to apply to the elb target group. Each item in this list
  # should be a map with the parameters key and value.
  lb_target_group_tags = {}

  # The maximum number of instances of the ECS Service to run. Auto scaling will
  # never scale out above this number.
  max_number_of_tasks = 3

  # How much memory, in MB, to give the ECS Service.
  memory = 500

  # The minimum number of instances of the ECS Service to run. Auto scaling will
  # never scale in below this number.
  min_number_of_tasks = 1

  # The configuration to use when setting up the VPC network mode. Required and
  # only used if network_mode is awsvpc.
  network_configuration = null

  # The Docker networking mode to use for the containers in the task. The valid
  # values are none, bridge, awsvpc, and host. If the network_mode is set to
  # awsvpc, you must configure var.network_configuration.
  network_mode = "bridge"

  # The DNS name that was assigned by AWS to the load balancer upon creation
  original_lb_dns_name = null

  # Cluster Query Language expression to apply to the constraint for matching.
  # Does not need to be specified for the distinctInstance constraint type.
  placement_constraint_expression = "attribute:ecs.ami-id != 'ami-fake'"

  # The type of constraint to apply for container instance placement. The only
  # valid values at this time are memberOf and distinctInstance.
  placement_constraint_type = "memberOf"

  # The field to apply the placement strategy against. For the spread placement
  # strategy, valid values are instanceId (or host, which has the same effect),
  # or any platform or custom attribute that is applied to a container instance,
  # such as attribute:ecs.availability-zone. For the binpack placement strategy,
  # valid values are cpu and memory. For the random placement strategy, this
  # field is not used.
  placement_strategy_field = "cpu"

  # The strategy to use when placing ECS tasks on EC2 instances. Can be binpack
  # (default), random, or spread.
  placement_strategy_type = "binpack"

  # Whether tags should be propogated to the tasks from the service or from the
  # task definition. Valid values are SERVICE and TASK_DEFINITION. Defaults to
  # SERVICE. If set to null, no tags are created for tasks.
  propagate_tags = "SERVICE"

  # Use the name of the Envoy proxy container from `container_definitions` as
  # the container name.
  proxy_configuration_container_name = null

  # A map of network configuration parameters to provide the Container Network
  # Interface (CNI) plugin.
  proxy_configuration_properties = null

  redirect_rules = {}

  # The path, without any leading slash, that can be used as a health check
  # (e.g. healthcheck) by Route 53. Should return a 200 OK when the service is
  # up and running.
  route53_health_check_path = "/"

  # The port to use for Route 53 health checks. This should be the port for the
  # service that is available at the publicly accessible domain name
  # (var.domain_name).
  route53_health_check_port = 80

  # The protocol to use for Route 53 health checks. Should be one of HTTP,
  # HTTPS.
  route53_health_check_protocol = "HTTP"

  # The optional external_id to be used in the us-east-1 provider block defined
  # in the route53-health-check-alarms module.  This module configures its own
  # AWS provider to ensure resources are created in us-east-1.
  route53_health_check_provider_external_id = null

  # The optional AWS profile to be used in the us-east-1 provider block defined
  # in the route53-health-check-alarms module.  This module configures its own
  # AWS provider to ensure resources are created in us-east-1.
  route53_health_check_provider_profile = null

  # The optional role_arn to be used in the us-east-1 provider block defined in
  # the route53-health-check-alarms module.  This module configures its own AWS
  # provider to ensure resources are created in us-east-1.
  route53_health_check_provider_role_arn = null

  # The optional session_name to be used in the us-east-1 provider block defined
  # in the route53-health-check-alarms module.  This module configures its own
  # AWS provider to ensure resources are created in us-east-1.
  route53_health_check_provider_session_name = null

  # The optional path to a credentials file used in the us-east-1 provider block
  # defined in the route53-health-check-alarms module.  This module configures
  # its own AWS provider to ensure resources are created in us-east-1.
  route53_health_check_provider_shared_credentials_file = null

  # Define runtime platform options
  runtime_platform = null

  # A list of ARNs of Secrets Manager secrets that the task should have
  # permissions to read. The IAM role for the task will be granted
  # `secretsmanager:GetSecretValue` for each secret in the list. The ARN can be
  # either the complete ARN, including the randomly generated suffix, or the ARN
  # without the suffix. If the latter, the module will look up the full ARN
  # automatically. This is helpful in cases where you don't yet know the
  # randomly generated suffix because the rest of the ARN is a predictable
  # value.
  secrets_access = []

  # A list of ARNs for Secrets Manager secrets that the ECS execution IAM policy
  # should be granted access to read. Note that this is different from the ECS
  # task IAM policy. The execution policy is concerned with permissions required
  # to run the ECS task. The ARN can be either the complete ARN, including the
  # randomly generated suffix, or the ARN without the suffix. If the latter, the
  # module will look up the full ARN automatically. This is helpful in cases
  # where you don't yet know the randomly generated suffix because the rest of
  # the ARN is a predictable value.
  secrets_manager_arns = []

  # The ARN of the kms key associated with secrets manager
  secrets_manager_kms_key_arn = null

  # The name of the aws_security_group that gets created if var.network_mode is
  # awsvpc and custom rules are specified for the ECS Fargate worker via
  # var.network_configuration.security_group_rules. Defaults to var.service_name
  # if not specified.
  service_security_group_name = null

  # A map of tags to apply to the ECS service. Each item in this list should be
  # a map with the parameters key and value.
  service_tags = {}

  # The CPU units for the instances that Fargate will spin up. Options here:
  # https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html#fargate-tasks-size.
  # Required when using FARGATE launch type.
  task_cpu = null

  # A map of tags to apply to the task definition. Each item in this list should
  # be a map with the parameters key and value.
  task_definition_tags = {}

  # The memory units for the instances that Fargate will spin up. Options here:
  # https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html#fargate-tasks-size.
  # Required when using FARGATE launch type.
  task_memory = null

  # If true, the ALB will use use Sticky Sessions as described at
  # https://goo.gl/VLcNbk. Only used if var.elb_target_groups is set. Note that
  # this can only be true when associating with an ALB. This cannot be used with
  # CLBs or NLBs.
  use_alb_sticky_sessions = false

  # Whether or not to enable auto scaling for the ecs service
  use_auto_scaling = true

  # Set this to true if you want to pass a custom docker run command. If you set
  # this to true, you must supply var.custom_docker_command
  use_custom_docker_run_command = false

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

<HclListItem name="container_definitions" requirement="required" type="any">
<HclListItemDescription>

List of container definitions to use for the ECS task. Each entry corresponds to a different ECS container definition.

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
   container_definitions = [{
     name  = "nginx"
     image = "nginx:1.21"
   }]

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Ideally we can use a concrete type here, but container definitions have many optional fields which Terraform does
   not yet have good support for.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="default_listener_arns" requirement="required" type="map(string)">
<HclListItemDescription>

A map of all the listeners on the load balancer. The keys should be the port numbers and the values should be the ARN of the listener for that port.

</HclListItemDescription>
</HclListItem>

<HclListItem name="default_listener_ports" requirement="required" type="list(string)">
<HclListItemDescription>

The default port numbers on the load balancer to attach listener rules to. You can override this default on a rule-by-rule basis by setting the listener_ports parameter in each rule. The port numbers specified in this variable and the listener_ports parameter must exist in <a href="#listener_arns"><code>listener_arns</code></a>.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecs_cluster_arn" requirement="required" type="string">
<HclListItemDescription>

The ARN of the cluster to which the ecs service should be deployed.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecs_cluster_name" requirement="required" type="string">
<HclListItemDescription>

The name of the ecs cluster to deploy the ecs service onto.

</HclListItemDescription>
</HclListItem>

<HclListItem name="service_name" requirement="required" type="string">
<HclListItemDescription>

The name of the ECS service (e.g. my-service-stage)

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="alarm_sns_topic_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of ARNs of the SNS topic(s) to write alarm events to

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="alarm_sns_topic_arns_us_east_1" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of SNS topic ARNs to notify when the route53 health check changes to ALARM, OK, or INSUFFICIENT_DATA state. Note: these SNS topics MUST be in us-east-1! This is because Route 53 only sends CloudWatch metrics to us-east-1, so we must create the alarm in that region, and therefore, can only notify SNS topics in that region

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="alb_sticky_session_cookie_duration" requirement="optional" type="number">
<HclListItemDescription>

The time period, in seconds, during which requests from a client should be routed to the same Target. After this time period expires, the load balancer-generated cookie is considered stale. The acceptable range is 1 second to 1 week (604800 seconds). The default value is 1 day (86400 seconds). Only used if <a href="#elb_target_groups"><code>elb_target_groups</code></a> is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="86400"/>
</HclListItem>

<HclListItem name="alb_sticky_session_type" requirement="optional" type="string">
<HclListItemDescription>

The type of Sticky Sessions to use. See https://goo.gl/MNwqNu for possible values. Only used if <a href="#elb_target_groups"><code>elb_target_groups</code></a> is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;lb_cookie&quot;"/>
</HclListItem>

<HclListItem name="canary_container_definitions" requirement="optional" type="any">
<HclListItemDescription>

List of container definitions to use for the canary ECS task. Each entry corresponds to a different ECS container definition.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   container_definitions = [{
     name  = "nginx"
     image = "nginx:1.21"
   }]

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Ideally we can use a concrete type here, but container definitions have many optional fields which Terraform does
   not yet have good support for.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="canary_version" requirement="optional" type="string">
<HclListItemDescription>

Which version of the ECS Service Docker container to deploy as a canary (e.g. 0.57)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="capacity_provider_strategy" requirement="optional" type="list(object(…))">
<HclListItemDescription>

The capacity provider strategy to use for the service. Note that the capacity providers have to be present on the ECS cluster before deploying the ECS service. When provided, <a href="#launch_type"><code>launch_type</code></a> is ignored.

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

<HclListItem name="clb_container_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the container, as it appears in the <a href="#task_arn"><code>task_arn</code></a> Task definition, to associate with a CLB. Currently, ECS can only associate a CLB with a single container per service. Only used if clb_name is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="clb_container_port" requirement="optional" type="number">
<HclListItemDescription>

The port on the container in <a href="#clb_container_name"><code>clb_container_name</code></a> to associate with an CLB. Currently, ECS can only associate a CLB with a single container per service. Only used if clb_name is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="clb_name" requirement="optional" type="string">
<HclListItemDescription>

The name of a Classic Load Balancer (CLB) to associate with this service. Containers in the service will automatically register with the CLB when booting up. Set to null if using ELBv2.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

The ARN of a KMS CMK to use for encrypting log events in the CloudWatch Logs. Set to null to disable encryption. Only used if <a href="#create_cloudwatch_log_group"><code>create_cloudwatch_log_group</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_name" requirement="optional" type="string">
<HclListItemDescription>

The name for the Cloudwatch logs that will be generated by the ecs service. Only used (and required) if <a href="#create_cloudwatch_log_group"><code>create_cloudwatch_log_group</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_retention" requirement="optional" type="number">
<HclListItemDescription>

Number of days to retain log events. Possible values are: 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1827, 3653, and 0. Select 0 to never expire. Only used if <a href="#create_cloudwatch_log_group"><code>create_cloudwatch_log_group</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the Cloudwatch log group. Each item in this list should be a map with the parameters key and value. Only used if <a href="#create_cloudwatch_log_group"><code>create_cloudwatch_log_group</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="cpu" requirement="optional" type="number">
<HclListItemDescription>

The number of CPU units to allocate to the ECS Service.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="create_cloudwatch_log_group" requirement="optional" type="bool">
<HclListItemDescription>

When true, create and manage the CloudWatch Log Group in the Terraform module instead of relying on ECS. This is useful for configuring options that are not available in the ECS native feature of managing the Log Group (e.g., encryption support).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="create_route53_entry" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want a DNS record automatically created and pointed at the the load balancer for the ECS service

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="custom_docker_command" requirement="optional" type="string">
<HclListItemDescription>

If <a href="#use_custom_docker_run_command"><code>use_custom_docker_run_command</code></a> is set to true, set this variable to the custom docker run command you want to provide

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_ecs_service_role_name" requirement="optional" type="string">
<HclListItemDescription>

The name to use for the ECS Service IAM role, which is used to grant permissions to the ECS service to register the task IPs to ELBs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_iam_policy_prefix" requirement="optional" type="string">
<HclListItemDescription>

Prefix for name of the custom IAM policies created by this module (those resulting from <a href="#iam_policy"><code>iam_policy</code></a> and <a href="#secrets_access"><code>secrets_access</code></a>). If omitted, defaults to <a href="#service_name"><code>service_name</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_iam_role_name_prefix" requirement="optional" type="string">
<HclListItemDescription>

Prefix for name of the IAM role used by the ECS task.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_task_execution_iam_role_name_prefix" requirement="optional" type="string">
<HclListItemDescription>

Prefix for name of task execution IAM role and policy that grants access to CloudWatch and ECR.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="dependencies" requirement="optional" type="list(string)">
<HclListItemDescription>

Create a dependency between the resources in this module to the interpolated values in this list (and thus the source resources). In other words, the resources in this module will now depend on the resources backing the values in this list such that those resources need to be created before the resources in this module, and the resources in this module need to be destroyed before the resources in the list.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="deployment_check_loglevel" requirement="optional" type="string">
<HclListItemDescription>

Set the logging level of the deployment check script. You can set this to `error`, `warn`, or `info`, in increasing verbosity.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;info&quot;"/>
</HclListItem>

<HclListItem name="deployment_check_timeout_seconds" requirement="optional" type="number">
<HclListItemDescription>

Seconds to wait before timing out each check for verifying ECS service deployment. See ecs_deploy_check_binaries for more details.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="600"/>
</HclListItem>

<HclListItem name="deployment_circuit_breaker_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to 'true' to prevent the task from attempting to continuously redeploy after a failed health check.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="deployment_circuit_breaker_rollback" requirement="optional" type="bool">
<HclListItemDescription>

Set to 'true' to also automatically roll back to the last successful deployment. deploy_circuit_breaker_enabled must also be true to enable this behavior.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="deployment_maximum_percent" requirement="optional" type="number">
<HclListItemDescription>

The upper limit, as a percentage of <a href="#desired_number_of_tasks"><code>desired_number_of_tasks</code></a>, of the number of running tasks that can be running in a service during a deployment. Setting this to more than 100 means that during deployment, ECS will deploy new instances of a Task before undeploying the old ones.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="200"/>
</HclListItem>

<HclListItem name="deployment_minimum_healthy_percent" requirement="optional" type="number">
<HclListItemDescription>

The lower limit, as a percentage of <a href="#desired_number_of_tasks"><code>desired_number_of_tasks</code></a>, of the number of running tasks that must remain running and healthy in a service during a deployment. Setting this to less than 100 means that during deployment, ECS may undeploy old instances of a Task before deploying new ones.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="100"/>
</HclListItem>

<HclListItem name="desired_number_of_canary_tasks" requirement="optional" type="number">
<HclListItemDescription>

How many instances of the ECS Service to run across the ECS cluster for a canary deployment. Typically, only 0 or 1 should be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="desired_number_of_tasks" requirement="optional" type="number">
<HclListItemDescription>

How many instances of the ECS Service to run across the ECS cluster

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="domain_name" requirement="optional" type="string">
<HclListItemDescription>

The domain name to create a route 53 record for. This DNS record will point to the load balancer for the ECS service

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ecs_instance_security_group_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the security group that should be applied to ecs service instances

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ecs_node_port_mappings" requirement="optional" type="map(number)">
<HclListItemDescription>

A map of ports to be opened via security groups applied to the EC2 instances that back the ECS cluster, when not using fargate. The key should be the container port and the value should be what host port to map it to.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
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

<HclListItem name="elb_slow_start" requirement="optional" type="number">
<HclListItemDescription>

The amount time for targets to warm up before the load balancer sends them a full share of requests. The range is 30-900 seconds or 0 to disable. The default value is 0 seconds. Only used if <a href="#elb_target_groups"><code>elb_target_groups</code></a> is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="elb_target_group_deregistration_delay" requirement="optional" type="number">
<HclListItemDescription>

The amount of time for Elastic Load Balancing to wait before changing the state of a deregistering target from draining to unused. The range is 0-3600 seconds. Only used if <a href="#elb_target_groups"><code>elb_target_groups</code></a> is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="elb_target_group_vpc_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the VPC in which to create the target group. Only used if <a href="#elb_target_groups"><code>elb_target_groups</code></a> is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="elb_target_groups" requirement="optional" type="any">
<HclListItemDescription>

Configurations for ELB target groups for ALBs and NLBs that should be associated with the ECS Tasks. Each entry corresponds to a separate target group. Set to the empty object ({}) if you are not using an ALB or NLB.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   `elb_target_groups` should be set to a map of keys to objects with one mapping per desired target group. The keys
   in the map can be any arbitrary name and are used to link the outputs with the inputs. The values of the map are an
   object containing these attributes:

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="enable_cloudwatch_alarms" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable Cloudwatch alarms on the ecs service instances

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_ecs_deployment_check" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to enable the ECS deployment check binary to make terraform wait for the task to be deployed. See ecs_deploy_check_binaries for more details. You must install the companion binary before the check can be used. Refer to the README for more details.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_execute_command" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether to enable Amazon ECS Exec for the tasks within the service.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_route53_health_check" requirement="optional" type="bool">
<HclListItemDescription>

Set this to true to create a route 53 health check and Cloudwatch alarm that will alert if your domain becomes unreachable

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="expose_ecs_service_to_other_ecs_nodes" requirement="optional" type="bool">
<HclListItemDescription>

Set this to true to allow the ecs service to be accessed by other ecs nodes

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="fixed_response_rules" requirement="optional" type="map(any)">
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
    {
      "health-path" = {
        priority     = 130
  
        content_type = "text/plain"
        message_body = "HEALTHY"
        status_code  = "200"
  
      Conditions:
      You need to provide *at least ONE* per set of rules. It should contain one of the following:
        host_headers         = ["foo.com", "www.foo.com"]
        path_patterns        = ["/health"]
        source_ips           = ["127.0.0.1"]
        http_request_methods = ["GET"]
        query_strings = [
          {
            key   = "foo"   Key is optional, this can be ommited.
            value = "bar"
          }, {
            value = "hello"
          }
        ]
      }
    }

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Each entry in the map supports the following attributes:
  
   REQUIRED
   - content_type [string]: The content type. Valid values are `text/plain`, `text/css`, `text/html`, `application/javascript`
                            and `application/json`.
  
   OPTIONAL (defaults to value of corresponding module input):
   - priority      [number]       : A value between 1 and 50000. Leaving it unset will automatically set the rule with the next
                                   available priority after currently existing highest rule. This value must be unique for each
                                   listener.
   - listener_arns [list(string)]: A list of listener ARNs to override `var.default_listener_arns`
   - message_body  [string]      : The message body.
   - status_code   [string]      : The HTTP response code. Valid values are `2XX`, `4XX`, or `5XX`.
  
   Wildcard characters:
   * - matches 0 or more characters
   ? - matches exactly 1 character
   To search for a literal '*' or '?' character in a query string, escape the character with a backslash (\).
  
   Conditions (need to specify at least one):
   - path_patterns        [list(string)]     : A list of paths to match (note that "/foo" is different than "/foo/").
                                              Comparison is case sensitive. Wildcard characters supported: * and ?.
                                              It is compared to the path of the URL, not it's query string. To compare
                                              against query string, use the `query_strings` condition.
   - host_headers         [list(string)]     : A list of host header patterns to match. Comparison is case insensitive.
                                              Wildcard characters supported: * and ?.
   - source_ips           [list(string)]     : A list of IP CIDR notations to match. You can use both IPv4 and IPv6
                                              addresses. Wildcards are not supported. Condition is not satisfied by the
                                              addresses in the `X-Forwarded-For` header, use `http_headers` condition instead.
   - query_strings        [list(map(string))]: Query string pairs or values to match. Comparison is case insensitive.
                                              Wildcard characters supported: * and ?. Only one pair needs to match for
                                              the condition to be satisfied.
   - http_request_methods [list(string)]     : A list of HTTP request methods or verbs to match. Only allowed characters are
                                              A-Z, hyphen (-) and underscore (_). Comparison is case sensitive. Wildcards
                                              are not supported. AWS recommends that GET and HEAD requests are routed in the
                                              same way because the response to a HEAD request may be cached.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="forward_rules" requirement="optional" type="any">
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
    {
      "foo" = {
        priority = 120
  
        host_headers         = ["www.foo.com", "*.foo.com"]
        path_patterns        = ["/foo/*"]
        source_ips           = ["127.0.0.1/32"]
        http_request_methods = ["GET"]
        query_strings = [
          {
             key   = "foo"   Key is optional, this can be ommited.
            value = "bar"
          }, {
            value = "hello"
          }
       ]
     },
     "auth" = {
       priority       = 128
       listener_ports = ["443"]
  
       host_headers      = ["intern.example.com]
       path_patterns     = ["/admin", "/admin/*]
       authenticate_oidc = {
         authorization_endpoint = "https://myaccount.oktapreview.com/oauth2/v1/authorize"
         client_id              = "0123456789aBcDeFgHiJ"
         client_secret          = "clientsecret"
         issuer                 = "https://myaccount.oktapreview.com"
         token_endpoint         = "https://myaccount.oktapreview.com/oauth2/v1/token"
         user_info_endpoint     = "https://myaccount.oktapreview.com/oauth2/v1/userinfo"
       }
   }

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Each entry in the map supports the following attributes:
  
   OPTIONAL (defaults to value of corresponding module input):
   - priority          [number]                    : A value between 1 and 50000. Leaving it unset will automatically set
                                                    the rule with the next available priority after currently existing highest
                                                     rule. This value must be unique for each listener.
   - listener_arns     [list(string)]              : A list of listener ARNs to override `var.default_listener_arns`
   - stickiness        [map(object[Stickiness])]   : Target group stickiness for the rule. Only applies if more than one
                                                    target_group_arn is defined.
   - authenticate_oidc map(object)                 : OIDC authentication configuration. Only applies, if not null.
  

```
</details>

<details>


```hcl

   Wildcard characters:
   * - matches 0 or more characters
   ? - matches exactly 1 character
   To search for a literal '*' or '?' character in a query string, escape the character with a backslash (\).

```
</details>

<details>


```hcl

   Conditions (need to specify at least one):
   - path_patterns        [list(string)]     : A list of paths to match (note that "/foo" is different than "/foo/").
                                              Comparison is case sensitive. Wildcard characters supported: * and ?.
                                              It is compared to the path of the URL, not it's query string. To compare
                                              against query string, use the `query_strings` condition.
   - host_headers         [list(string)]     : A list of host header patterns to match. Comparison is case insensitive.
                                              Wildcard characters supported: * and ?.
   - source_ips           [list(string)]     : A list of IP CIDR notations to match. You can use both IPv4 and IPv6
                                              addresses. Wildcards are not supported. Condition is not satisfied by the
                                              addresses in the `X-Forwarded-For` header, use `http_headers` condition instead.
   - query_strings        [list(map(string))]: Query string pairs or values to match. Comparison is case insensitive.
                                              Wildcard characters supported: * and ?. Only one pair needs to match for
                                              the condition to be satisfied.
   - http_request_methods [list(string)]     : A list of HTTP request methods or verbs to match. Only allowed characters are
                                              A-Z, hyphen (-) and underscore (_). Comparison is case sensitive. Wildcards
                                              are not supported. AWS recommends that GET and HEAD requests are routed in the
                                              same way because the response to a HEAD request may be cached.

```
</details>

<details>


```hcl

   Authenticate OIDC Blocks:
   authenticate_oidc:
   - authorization_endpoint              string     : (Required) The authorization endpoint of the IdP.
   - client_id                           string     : (Required) The OAuth 2.0 client identifier.
   - client_secret                       string     : (Required) The OAuth 2.0 client secret.
   - issuer                              string     : (Required) The OIDC issuer identifier of the IdP.
   - token_endpoint                      string     : (Required) The token endpoint of the IdP.
   - user_info_endpoint                  string     : (Required) The user info endpoint of the IdP.
   - authentication_request_extra_params map(string): (Optional) The query parameters to include in the redirect request to the authorization endpoint. Max: 10.
   - on_unauthenticated_request          string     : (Optional) The behavior if the user is not authenticated. Valid values: deny, allow and authenticate
   - scope                               string     : (Optional) The set of user claims to be requested from the IdP.
   - session_cookie_name                 string     : (Optional) The name of the cookie used to maintain session information.
   - session_timeout                     int        : (Optional) The maximum duration of the authentication session, in seconds.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="health_check_enabled" requirement="optional" type="bool">
<HclListItemDescription>

If true, enable health checks on the target group. Only applies to ELBv2. For CLBs, health checks are not configurable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="health_check_grace_period_seconds" requirement="optional" type="number">
<HclListItemDescription>

Seconds to ignore failing load balancer health checks on newly instantiated tasks to prevent premature shutdown, up to 2,147,483,647. Only valid for services configured to use load balancers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="health_check_healthy_threshold" requirement="optional" type="number">
<HclListItemDescription>

The number of consecutive successful health checks required before considering an unhealthy Target healthy. The acceptable range is 2 to 10.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="5"/>
</HclListItem>

<HclListItem name="health_check_interval" requirement="optional" type="number">
<HclListItemDescription>

The approximate amount of time, in seconds, between health checks of an individual Target. Minimum value 5 seconds, Maximum value 300 seconds.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="health_check_matcher" requirement="optional" type="string">
<HclListItemDescription>

The HTTP codes to use when checking for a successful response from a Target. You can specify multiple values (e.g. '200,202') or a range of values (e.g. '200-299'). Required when using ALBs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;200&quot;"/>
</HclListItem>

<HclListItem name="health_check_path" requirement="optional" type="string">
<HclListItemDescription>

The ping path that is the destination on the Targets for health checks. Required when using ALBs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;/&quot;"/>
</HclListItem>

<HclListItem name="health_check_port" requirement="optional" type="string">
<HclListItemDescription>

The port the ELB uses when performing health checks on Targets. The default is to use the port on which each target receives traffic from the load balancer, indicated by the value 'traffic-port'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;traffic-port&quot;"/>
</HclListItem>

<HclListItem name="health_check_timeout" requirement="optional" type="number">
<HclListItemDescription>

The amount of time, in seconds, during which no response from a Target means a failed health check. The acceptable range is 2 to 60 seconds.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="5"/>
</HclListItem>

<HclListItem name="health_check_unhealthy_threshold" requirement="optional" type="number">
<HclListItemDescription>

The number of consecutive failed health checks required before considering a target unhealthy. The acceptable range is 2 to 10. For NLBs, this value must be the same as the health_check_healthy_threshold.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="2"/>
</HclListItem>

<HclListItem name="high_cpu_utilization_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the CPU utilization percentage

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="high_cpu_utilization_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the ECS Service has a CPU utilization percentage above this threshold

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="90"/>
</HclListItem>

<HclListItem name="high_cpu_utilization_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="high_memory_utilization_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the memory utilization percentage

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="high_memory_utilization_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the ECS Service has a memory utilization percentage above this threshold

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="90"/>
</HclListItem>

<HclListItem name="high_memory_utilization_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="hosted_zone_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the Route 53 hosted zone into which the Route 53 DNS record should be written

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="iam_policy" requirement="optional" type="map(object(…))">
<HclListItemDescription>

An object defining the policy to attach to the ECS task. Accepts a map of objects, where the map keys are sids for IAM policy statements, and the object fields are the resources, actions, and the effect ('Allow' or 'Deny') of the statement.

</HclListItemDescription>
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
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   iam_policy = {
     S3Access = {
       actions = ["s3:*"]
       resources = ["arn:aws:s3:::mybucket"]
       effect = "Allow"
     },
     SecretsManagerAccess = {
       actions = ["secretsmanager:GetSecretValue"],
       resources = ["arn:aws:secretsmanager:us-east-1:0123456789012:secret:mysecert"]
       effect = "Allow"
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="launch_type" requirement="optional" type="string">
<HclListItemDescription>

The launch type of the ECS service. Must be one of EC2 or FARGATE. When using FARGATE, you must set the network mode to awsvpc and configure it. When using EC2, you can configure the placement strategy using the variables <a href="#placement_strategy_type"><code>placement_strategy_type</code></a>, <a href="#placement_strategy_field"><code>placement_strategy_field</code></a>, <a href="#placement_constraint_type"><code>placement_constraint_type</code></a>, <a href="#placement_constraint_expression"><code>placement_constraint_expression</code></a>. This variable is ignored if <a href="#capacity_provider_strategy"><code>capacity_provider_strategy</code></a> is provided.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;EC2&quot;"/>
</HclListItem>

<HclListItem name="lb_hosted_zone_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the Route 53 Hosted Zone in which to create a DNS A record pointed to the ECS service's load balancer

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="lb_target_group_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the elb target group. Each item in this list should be a map with the parameters key and value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="max_number_of_tasks" requirement="optional" type="number">
<HclListItemDescription>

The maximum number of instances of the ECS Service to run. Auto scaling will never scale out above this number.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="3"/>
</HclListItem>

<HclListItem name="memory" requirement="optional" type="number">
<HclListItemDescription>

How much memory, in MB, to give the ECS Service.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="500"/>
</HclListItem>

<HclListItem name="min_number_of_tasks" requirement="optional" type="number">
<HclListItemDescription>

The minimum number of instances of the ECS Service to run. Auto scaling will never scale in below this number.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="network_configuration" requirement="optional" type="object(…)">
<HclListItemDescription>

The configuration to use when setting up the VPC network mode. Required and only used if network_mode is awsvpc.

</HclListItemDescription>
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
<HclGeneralListItem title="More Details">
<details>


```hcl

     The ID of the VPC used for the Fargate worker network. Must be non-null when security_group_rules are provided.

```
</details>

<details>


```hcl

     Security Group Rules to apply to the ECS Fargate worker. This module will create a new security group for the
     worker and attach these rules. Each entry accepts the same attributes as the aws_security_group_rule resource,
     except for security_group_id which will be set to the security group created within the module.
     Each entry corresponds to a rule. The key is a unique, user provided, arbitrary value that can be used by
     Terraform to know which rules to update across changes.

```
</details>

<details>


```hcl

     Additional existing Security Groups that should be bound to the ECS Fargate worker.

```
</details>

<details>


```hcl

     Whether or not the ECS Fargate worker should get a public IP address.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="network_mode" requirement="optional" type="string">
<HclListItemDescription>

The Docker networking mode to use for the containers in the task. The valid values are none, bridge, awsvpc, and host. If the network_mode is set to awsvpc, you must configure <a href="#network_configuration"><code>network_configuration</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;bridge&quot;"/>
</HclListItem>

<HclListItem name="original_lb_dns_name" requirement="optional" type="string">
<HclListItemDescription>

The DNS name that was assigned by AWS to the load balancer upon creation

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="placement_constraint_expression" requirement="optional" type="string">
<HclListItemDescription>

Cluster Query Language expression to apply to the constraint for matching. Does not need to be specified for the distinctInstance constraint type.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;attribute:ecs.ami-id != &apos;ami-fake&apos;&quot;"/>
</HclListItem>

<HclListItem name="placement_constraint_type" requirement="optional" type="string">
<HclListItemDescription>

The type of constraint to apply for container instance placement. The only valid values at this time are memberOf and distinctInstance.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;memberOf&quot;"/>
</HclListItem>

<HclListItem name="placement_strategy_field" requirement="optional" type="string">
<HclListItemDescription>

The field to apply the placement strategy against. For the spread placement strategy, valid values are instanceId (or host, which has the same effect), or any platform or custom attribute that is applied to a container instance, such as attribute:ecs.availability-zone. For the binpack placement strategy, valid values are cpu and memory. For the random placement strategy, this field is not used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;cpu&quot;"/>
</HclListItem>

<HclListItem name="placement_strategy_type" requirement="optional" type="string">
<HclListItemDescription>

The strategy to use when placing ECS tasks on EC2 instances. Can be binpack (default), random, or spread.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;binpack&quot;"/>
</HclListItem>

<HclListItem name="propagate_tags" requirement="optional" type="string">
<HclListItemDescription>

Whether tags should be propogated to the tasks from the service or from the task definition. Valid values are SERVICE and TASK_DEFINITION. Defaults to SERVICE. If set to null, no tags are created for tasks.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;SERVICE&quot;"/>
</HclListItem>

<HclListItem name="proxy_configuration_container_name" requirement="optional" type="string">
<HclListItemDescription>

Use the name of the Envoy proxy container from `container_definitions` as the container name.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="proxy_configuration_properties" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of network configuration parameters to provide the Container Network Interface (CNI) plugin.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   properties = {
     AppPorts         = "8080"
     EgressIgnoredIPs = "169.254.170.2,169.254.169.254"
     IgnoredUID       = "1337"
     ProxyEgressPort  = 15001
     ProxyIngressPort = 15000
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="redirect_rules" requirement="optional" type="map(any)">
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
    {
      "old-website" = {
        priority = 120
        port     = 443
        protocol = "HTTPS"
  
        status_code = "HTTP_301"
        host  = "gruntwork.in"
        path  = "/signup"
        query = "foo"
  
      Conditions:
        host_headers         = ["foo.com", "www.foo.com"]
        path_patterns        = ["/health"]
        source_ips           = ["127.0.0.1"]
        http_request_methods = ["GET"]
        query_strings = [
          {
            key   = "foo"   Key is optional, this can be ommited.
            value = "bar"
          }, {
            value = "hello"
          }
        ]
      }
    }

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Each entry in the map supports the following attributes:
  
   OPTIONAL (defaults to value of corresponding module input):
   - priority       [number]: A value between 1 and 50000. Leaving it unset will automatically set the rule with the next
                           available priority after currently existing highest rule. This value must be unique for each
                           listener.
   - listener_arns [list(string)]: A list of listener ARNs to override `var.default_listener_arns`
   - status_code   [string]: The HTTP redirect code. The redirect is either permanent `HTTP_301` or temporary `HTTP_302`.
  
   The URI consists of the following components: `protocol://hostname:port/path?query`. You must modify at least one of
   the following components to avoid a redirect loop: protocol, hostname, port, or path. Any components that you do not
   modify retain their original values.
   - host        [string]: The hostname. The hostname can contain {host}.
   - path        [string]: The absolute path, starting with the leading "/". The path can contain `host`, `path`, and `port`.
   - port        [string]: The port. Specify a value from 1 to 65525.
   - protocol    [string]: The protocol. Valid values are `HTTP` and `HTTPS`. You cannot redirect HTTPS to HTTP.
   - query       [string]: The query params. Do not include the leading "?".
  
   Wildcard characters:
   * - matches 0 or more characters
   ? - matches exactly 1 character
   To search for a literal '*' or '?' character in a query string, escape the character with a backslash (\).
  
   Conditions (need to specify at least one):
   - path_patterns        [list(string)]     : A list of paths to match (note that "/foo" is different than "/foo/").
                                              Comparison is case sensitive. Wildcard characters supported: * and ?.
                                              It is compared to the path of the URL, not it's query string. To compare
                                              against query string, use the `query_strings` condition.
   - host_headers         [list(string)]     : A list of host header patterns to match. Comparison is case insensitive.
                                              Wildcard characters supported: * and ?.
   - source_ips           [list(string)]     : A list of IP CIDR notations to match. You can use both IPv4 and IPv6
                                              addresses. Wildcards are not supported. Condition is not satisfied by the
                                              addresses in the `X-Forwarded-For` header, use `http_headers` condition instead.
   - query_strings        [list(map(string))]: Query string pairs or values to match. Comparison is case insensitive.
                                              Wildcard characters supported: * and ?. Only one pair needs to match for
                                              the condition to be satisfied.
   - http_request_methods [list(string)]     : A list of HTTP request methods or verbs to match. Only allowed characters are
                                              A-Z, hyphen (-) and underscore (_). Comparison is case sensitive. Wildcards
                                              are not supported. AWS recommends that GET and HEAD requests are routed in the
                                              same way because the response to a HEAD request may be cached.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="route53_health_check_path" requirement="optional" type="string">
<HclListItemDescription>

The path, without any leading slash, that can be used as a health check (e.g. healthcheck) by Route 53. Should return a 200 OK when the service is up and running.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;/&quot;"/>
</HclListItem>

<HclListItem name="route53_health_check_port" requirement="optional" type="number">
<HclListItemDescription>

The port to use for Route 53 health checks. This should be the port for the service that is available at the publicly accessible domain name (<a href="#domain_name"><code>domain_name</code></a>).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="80"/>
</HclListItem>

<HclListItem name="route53_health_check_protocol" requirement="optional" type="string">
<HclListItemDescription>

The protocol to use for Route 53 health checks. Should be one of HTTP, HTTPS.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;HTTP&quot;"/>
</HclListItem>

<HclListItem name="route53_health_check_provider_external_id" requirement="optional" type="string">
<HclListItemDescription>

The optional external_id to be used in the us-east-1 provider block defined in the route53-health-check-alarms module.  This module configures its own AWS provider to ensure resources are created in us-east-1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="route53_health_check_provider_profile" requirement="optional" type="string">
<HclListItemDescription>

The optional AWS profile to be used in the us-east-1 provider block defined in the route53-health-check-alarms module.  This module configures its own AWS provider to ensure resources are created in us-east-1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="route53_health_check_provider_role_arn" requirement="optional" type="string">
<HclListItemDescription>

The optional role_arn to be used in the us-east-1 provider block defined in the route53-health-check-alarms module.  This module configures its own AWS provider to ensure resources are created in us-east-1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="route53_health_check_provider_session_name" requirement="optional" type="string">
<HclListItemDescription>

The optional session_name to be used in the us-east-1 provider block defined in the route53-health-check-alarms module.  This module configures its own AWS provider to ensure resources are created in us-east-1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="route53_health_check_provider_shared_credentials_file" requirement="optional" type="string">
<HclListItemDescription>

The optional path to a credentials file used in the us-east-1 provider block defined in the route53-health-check-alarms module.  This module configures its own AWS provider to ensure resources are created in us-east-1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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

<HclListItem name="secrets_access" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of ARNs of Secrets Manager secrets that the task should have permissions to read. The IAM role for the task will be granted `secretsmanager:GetSecretValue` for each secret in the list. The ARN can be either the complete ARN, including the randomly generated suffix, or the ARN without the suffix. If the latter, the module will look up the full ARN automatically. This is helpful in cases where you don't yet know the randomly generated suffix because the rest of the ARN is a predictable value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="secrets_manager_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of ARNs for Secrets Manager secrets that the ECS execution IAM policy should be granted access to read. Note that this is different from the ECS task IAM policy. The execution policy is concerned with permissions required to run the ECS task. The ARN can be either the complete ARN, including the randomly generated suffix, or the ARN without the suffix. If the latter, the module will look up the full ARN automatically. This is helpful in cases where you don't yet know the randomly generated suffix because the rest of the ARN is a predictable value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="secrets_manager_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the kms key associated with secrets manager

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="service_security_group_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the aws_security_group that gets created if <a href="#network_mode"><code>network_mode</code></a> is awsvpc and custom rules are specified for the ECS Fargate worker via <a href="#network_configuration"><code>network_configuration</code></a>.security_group_rules. Defaults to <a href="#service_name"><code>service_name</code></a> if not specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="service_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the ECS service. Each item in this list should be a map with the parameters key and value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
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

<HclListItem name="task_memory" requirement="optional" type="number">
<HclListItemDescription>

The memory units for the instances that Fargate will spin up. Options here: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html#fargate-tasks-size. Required when using FARGATE launch type.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="use_alb_sticky_sessions" requirement="optional" type="bool">
<HclListItemDescription>

If true, the ALB will use use Sticky Sessions as described at https://goo.gl/VLcNbk. Only used if <a href="#elb_target_groups"><code>elb_target_groups</code></a> is set. Note that this can only be true when associating with an ALB. This cannot be used with CLBs or NLBs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="use_auto_scaling" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to enable auto scaling for the ecs service

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="use_custom_docker_run_command" requirement="optional" type="bool">
<HclListItemDescription>

Set this to true if you want to pass a custom docker run command. If you set this to true, you must supply <a href="#custom_docker_command"><code>custom_docker_command</code></a>

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
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

<HclListItem name="all_metric_widgets">
<HclListItemDescription>

A list of all the CloudWatch Dashboard metric widgets available in this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="aws_ecs_task_definition_arn">
<HclListItemDescription>

The ARN of the ECS task definition

</HclListItemDescription>
</HclListItem>

<HclListItem name="aws_ecs_task_definition_canary_arn">
<HclListItemDescription>

The ARN of the canary ECS task definition

</HclListItemDescription>
</HclListItem>

<HclListItem name="canary_service_arn">
<HclListItemDescription>

The ARN of the canary service. Canary services are optional and can be helpful when you're attempting to verify a release candidate

</HclListItemDescription>
</HclListItem>

<HclListItem name="capacity_provider_strategy">
<HclListItemDescription>

The capacity provider strategy determines how infrastructure (such as EC2 instances or Fargate) that backs your ECS service is managed. See https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cluster-capacity-providers.html for more information

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecs_node_port_mappings">
<HclListItemDescription>

A map representing the instance host and container ports that should be opened

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecs_task_execution_iam_role_arn">
<HclListItemDescription>

The ARN of the ECS task's IAM role

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecs_task_execution_iam_role_name">
<HclListItemDescription>

The name of the ECS task execution IAM role. The execution role is used by the ECS container agent to make calls to the ECS API, pull container images from ECR, use the logs driver, etc

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecs_task_iam_role_arn">
<HclListItemDescription>

The ARN of the IAM role associated with the ECS task

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecs_task_iam_role_name">
<HclListItemDescription>

The name of the IAM role granting permissions to the running ECS task itself. Note this role is separate from the execution role which is assumed by the ECS container agent

</HclListItemDescription>
</HclListItem>

<HclListItem name="metric_widget_ecs_service_cpu_usage">
<HclListItemDescription>

The metric widget for the ECS service's CPU usage 

</HclListItemDescription>
</HclListItem>

<HclListItem name="metric_widget_ecs_service_memory_usage">
<HclListItemDescription>

The metric widget for the ECS service's memory usage

</HclListItemDescription>
</HclListItem>

<HclListItem name="route53_domain_name">
<HclListItemDescription>

The domain name of the optional route53 record, which points at the load balancer for the ECS service

</HclListItemDescription>
</HclListItem>

<HclListItem name="service_app_autoscaling_target_arn">
<HclListItemDescription>

The ARN of the app autoscaling target

</HclListItemDescription>
</HclListItem>

<HclListItem name="service_app_autoscaling_target_resource_id">
<HclListItemDescription>

The resource ID of the autoscaling target

</HclListItemDescription>
</HclListItem>

<HclListItem name="service_arn">
<HclListItemDescription>

The ARN of the ECS service

</HclListItemDescription>
</HclListItem>

<HclListItem name="service_iam_role_arn">
<HclListItemDescription>

The ARN of the service role associated with the ELB of the ECS service

</HclListItemDescription>
</HclListItem>

<HclListItem name="service_iam_role_name">
<HclListItemDescription>

The name of the service role associated with the ELB of the ECS service

</HclListItemDescription>
</HclListItem>

<HclListItem name="target_group_arns">
<HclListItemDescription>

The ARNs of the ECS service's load balancer's target groups

</HclListItemDescription>
</HclListItem>

<HclListItem name="target_group_names">
<HclListItemDescription>

The names of the ECS service's load balancer's target groups

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/ecs-service/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/ecs-service/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/ecs-service/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "2c6c28e8390d332100be2473ff001b7d"
}
##DOCS-SOURCER-END -->
