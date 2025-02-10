---
title: "ECS Service"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon ECS" version="0.38.4" lastModifiedVersion="0.38.4"/>

# ECS Service

<a href="https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/modules/ecs-service" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.38.4" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module creates an [Elastic Container Service (ECS) Service](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html) that you can use to run one or more related, long-running Docker containers, such as a web service. An ECS service can automatically deploy multiple instances of your Docker containers across an ECS cluster (see the [ecs-cluster module](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/modules/ecs-cluster)), restart any failed Docker containers, route traffic across your containers using an optional Elastic Load Balancer (ELB), and optionally register the services to AWS Service Discovery Service. Additionally, CodeDeploy blue/green deployments are supported as the module can be enabled to ignore CodeDeploy managed resources.

![ECS Service architecture](/img/reference/modules/terraform-aws-ecs/ecs-service/ecs-service-architecture.png)

## Features

*   Deploy and manage one or more docker containers as a logical unit

*   Deploy on Fargate or EC2 instances

*   Auto scaling and auto healing containers

*   Canary deployments

*   CodeDeploy blue/green deployment support (using external CICD)

*   Service discovery through AWS Service Discovery Service

*   ELB (CLB, ALB, and NLB) support

*   VPC support

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://docs.gruntwork.io/library/overview/)!

### Core concepts

*   [What is Amazon ECS?](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/core-concepts.md#what-is-elastic-container-service)

*   [Helpful vocabulary for ECS](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/core-concepts.md#helpful-vocabulary)

*   [What is Fargate?](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/core-concepts.md#what-is-fargate)

*   [What is an ECS Service?](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/modules/ecs-service/core-concepts.md#what-is-an-ecs-service)

*   [What is ECS Service Discovery?](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/modules/ecs-service/core-concepts.md#what-is-ecs-service-discovery)

*   [ECS Documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html): Amazon’s docs for ECS that cover core concepts such as the different cluster hosting options, scheduling properties, Docker, security, and monitoring.

*   [A crash course on Docker & Packer](https://training.gruntwork.io/p/a-crash-course-on-docker-packer): a series of training videos that teach you how to use docker, including a section on ECS.

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.

    *   [modules/ecs-cluster](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/modules/ecs-cluster): use this module to provision an ECS cluster with ECS container instances.

    *   [modules/ecs-scripts](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/modules/ecs-scripts): use the scripts in this module to configure private docker registries and register ECS container instances to ECS clusters.

    *   [modules/ecs-service](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/modules/ecs-service): use this module to deploy one or more docker containers as a ECS service, with options to use ELBs (CLB, ALB, or NLB), Service Discovery, or Fargate.

    *   [modules/ecs-daemon-service](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/modules/ecs-daemon-service): use this module to deploy one or more docker containers that run on a regular schedule.

    *   [modules/ecs-deploy](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/modules/ecs-deploy): use the scripts in this module to run one or more docker containers as a one time task on an ECS cluster.

    *   **\[DEPRECATED]** [modules/ecs-deploy-check-binaries](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/modules/ecs-deploy-check-binaries): use the python binary packages in this module to check ECS service deployments to ensure that they are active and healthy.

*   [examples](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/examples): This folder contains working examples of how to use the submodules.

*   [test](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/test): Automated tests for the modules and examples.

### Gruntwork analysis

*   [EC2 vs Fargate launch types](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/core-concepts.md#ec2-vs-fargate-launch-types): A detailed comparison between the two available launch types for ECS, showing you the trade-offs between ECS container instances and Fargate.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples folder](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/examples): The `examples` folder contains sample code optimized for learning, experimenting, and testing (but not production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

Production-ready sample code from the Reference Architecture:

*   ECS Cluster: examples for managing an ECS cluster with ECS container instances

*   [app account configuration](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/main/examples/for-production/infrastructure-live/prod/us-west-2/prod/services/ecs-cluster/terragrunt.hcl)

*   [base configuration](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/main/examples/for-production/infrastructure-live/\_envcommon/services/ecs-cluster.hcl)

*   ECS Service with ALB: examples for managing ECS services load balanced by an ALB

*   [app account configuration](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/main/examples/for-production/infrastructure-live/prod/us-west-2/prod/services/ecs-sample-app-frontend/terragrunt.hcl)

*   [base configuration](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/main/examples/for-production/infrastructure-live/\_envcommon/services/ecs-sample-app-frontend.hcl)

## Manage

### Day-to-day operations

*   [How do I use Fargate?](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/modules/ecs-service/core-concepts.md#how-do-i-use-fargate)

*   [How do I associate the ECS Service with an ALB or NLB?](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/modules/ecs-service/core-concepts.md#how-do-i-associate-the-ecs-service-with-an-alb-or-nlb)

*   [How do I setup Service Discovery?](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/modules/ecs-service/core-concepts.md#how-do-i-setup-service-discovery)

*   [How do I add IAM policies to the ECS service?](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/modules/ecs-service/core-concepts.md#how-do-you-add-additional-iam-policies-to-the-ecs-service)

*   [How do I scale an ECS service?](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/modules/ecs-service/core-concepts.md#how-do-you-scale-an-ecs-service)

### Major changes

*   [How do you make changes to the EC2 instances in the cluster?](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/module/ecs-cluster/README.md#how-do-you-make-changes-to-the-ec-2-instances-in-the-cluster)

*   [How do ECS Services deploy new versions of containers?](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/modules/ecs-service/core-concepts.md#how-do-ecs-services-deploy-new-versions-of-containers)

*   [How do I do a canary deployment?](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/modules/ecs-service/core-concepts.md#how-do-i-do-a-canary-deployment)

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ECS-SERVICE MODULE
# ------------------------------------------------------------------------------------------------------

module "ecs_service" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-ecs.git//modules/ecs-service?ref=v0.38.4"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # How many copies of the Task to run across the cluster.
  desired_number_of_tasks = <number>

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

  # The time period, in seconds, during which requests from a client should be
  # routed to the same Target. After this time period expires, the load
  # balancer-generated cookie is considered stale. The acceptable range is 1
  # second to 1 week (604800 seconds). The default value is 1 day (86400
  # seconds). Only used if var.elb_target_group_name is set.
  alb_sticky_session_cookie_duration = 86400

  # The type of Sticky Sessions to use. See https://goo.gl/MNwqNu for possible
  # values. Only used if var.elb_target_group_name is set.
  alb_sticky_session_type = "lb_cookie"

  # The capacity provider strategy to use for the service. Note that the
  # capacity providers have to be present on ECS cluster before deploying ECS
  # service. When provided, var.launch_type is ignored.
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

  # Custom name to use for the ECS service IAM role that is created. Note that
  # this service IAM role is only needed when the ECS service is being used with
  # an ELB. If blank (default), the name will be set to var.service_name.
  custom_ecs_service_role_name = null

  # Prefix for name of the IAM role used by the ECS task. If not provide, will
  # be set to var.service_name.
  custom_iam_role_name_prefix = null

  # Prefix for name of task execution IAM role and policy that grants access to
  # CloudWatch and ECR. If not provide, will be set to var.service_name.
  custom_task_execution_name_prefix = null

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # Set enable to 'true' to prevent the task from attempting to continuously
  # redeploy after a failed health check. Set rollback to 'true' to also
  # automatically roll back to the last successful deployment. If this setting
  # is used, both 'enable' and 'rollback' are required fields.
  deployment_circuit_breaker = null

  # CloudWatch alarms which triggers deployment rollback if failure.
  deployment_cloudwatch_alarms = null

  # Type of deployment controller, possible values: CODE_DEPLOY, ECS, EXTERNAL
  deployment_controller = null

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

  # How many Tasks to run of the var.ecs_task_definition_canary to deploy for a
  # canary deployment. Typically, only 0 or 1 should be used.
  desired_number_of_canary_tasks_to_run = 0

  # Check alias target health before routing to the service. Only used if
  # var.discovery_use_public_dns is true.
  discovery_alias_record_evaluate_target_health = true

  # Container name value, already specified in the task definition, to be used
  # for your service discovery service. Required when using `SRV` record type.
  discovery_container_name = null

  # Port value, already specified in the task definition, to be used for your
  # service discovery service. Required when using `SRV` record type.
  discovery_container_port = null

  # The number of 30-second intervals that you want service discovery to wait
  # before it changes the health status of a service instance. Maximum value of
  # 10. Only used if var.use_service_discovery is true.
  discovery_custom_health_check_failure_threshold = 1

  # The type of the resource, which indicates the value that Amazon Route 53
  # returns in response to DNS queries corresponded to service discovery
  # requests.
  discovery_dns_record_type = "A"

  # The routing policy that you want to apply to all records that Route 53
  # creates when you register an instance and specify the service. Valid Values:
  # MULTIVALUE, WEIGHTED. Only used if var.use_service_discovery is true.
  discovery_dns_routing_policy = "MULTIVALUE"

  # The amount of time, in seconds, that you want DNS resolvers to cache the
  # settings for this resource record set. Only used if
  # var.use_service_discovery is true.
  discovery_dns_ttl = 60

  # The name by which the service can be discovered. It will be used to form the
  # service discovery address along with the namespace name in
  # <discovery_name>.<namespace_name>. So if your discovery name is 'my-service'
  # and your namespace name is 'my-company-staging.local', the hostname for the
  # service will be 'my-service.my-company-staging.local'. Only used if
  # var.use_service_discovery is true.
  discovery_name = null

  # The id of the previously created namespace for service discovery. It will be
  # used to form the service discovery address along with the discovery name in
  # <discovery_name>.<namespace_name>. So if your discovery name is 'my-service'
  # and your namespace name is 'my-company-staging.local', the hostname for the
  # service will be 'my-service.my-company-staging.local'. Only used if
  # var.use_service_discovery is true.
  discovery_namespace_id = null

  # The ID of the original Route 53 Hosted Zone where associated with the domain
  # registrar. Only used if var.discovery_use_public_dns is true.
  discovery_original_public_route53_zone_id = null

  # The ID of the new Route 53 Hosted Zone created for the public DNS namespace.
  # Only used if var.discovery_use_public_dns is true.
  discovery_public_dns_namespace_route53_zone_id = null

  # Set this variable to 'true' when using public DNS namespaces. Only used if
  # var.use_service_discovery is true.
  discovery_use_public_dns = false

  # The configuration to use when setting up the VPC network mode. Required and
  # only used if ecs_task_definition_network_mode is awsvpc.
  ecs_service_network_configuration = null

  # The JSON text of the ECS Task Definition to be run for the canary. This
  # defines the Docker container(s) to be run along with all their properties.
  # It should adhere to the format described at https://goo.gl/ob5U3g.
  ecs_task_definition_canary = "[{ \"name\":\"not-used\" }]"

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

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role for the ELB.
  elb_role_permissions_boundary_arn = null

  # The amount time for targets to warm up before the load balancer sends them a
  # full share of requests. The range is 30-900 seconds or 0 to disable. The
  # default value is 0 seconds. Only used if var.elb_target_group_name is set.
  elb_slow_start = 0

  # The amount of time for Elastic Load Balancing to wait before changing the
  # state of a deregistering target from draining to unused. The range is 0-3600
  # seconds. Only used if var.elb_target_group_name is set.
  elb_target_group_deregistration_delay = 300

  # The ID of the VPC in which to create the target group. Only used if
  # var.elb_target_group_name is set.
  elb_target_group_vpc_id = null

  # Configurations for ELB target groups for ALBs and NLBs that should be
  # associated with the ECS Tasks. Each entry corresponds to a separate target
  # group. Set to the empty object ({}) if you are not using an ALB or NLB.
  elb_target_groups = {}

  # Specifies whether to enable Amazon ECS Exec for the tasks within the
  # service.
  enable_execute_command = false

  # The name of the existing task execution role to be used in place of creating
  # a new role.
  existing_ecs_task_execution_role_name = null

  # The name of the existing task role to be used in place of creating a new
  # role.
  existing_ecs_task_role_name = null

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

  # The launch type of the ECS service. Defaults to null, which will result in
  # using the default capacity provider strategyfrom the ECS cluster. Valid
  # value must be one of EC2 or FARGATE. When using FARGATE, you must set the
  # network mode to awsvpc and configure it. When using EC2, you can configure
  # the placement strategy using the variables ordered_placement_strategy,
  # placement_constraint_type, placement_constraint_expression. This variable is
  # ignored if var.capacity_provider_strategy is provided.
  launch_type = null

  # A map of tags to apply to the elb target group. Each item in this list
  # should be a map with the parameters key and value.
  lb_target_group_tags = {}

  # Listener rules list required first to be provisioned before creation of ECS
  # cluster.
  listener_rule_ids = []

  # The maximum number of ECS Task instances of the ECS Service to run. Auto
  # scaling will never scale out above this number. Must be set when
  # var.use_auto_scaling is true.
  max_number_of_tasks = null

  # The minimum number of ECS Task instances of the ECS Service to run. Auto
  # scaling will never scale in below this number. Must be set when
  # var.use_auto_scaling is true.
  min_number_of_tasks = null

  # Service level strategy rules that are taken into consideration during task
  # placement. List from top to bottom in order of precedence. Updates to this
  # configuration will take effect next task deployment unless
  # force_new_deployment is enabled. The maximum number of
  # ordered_placement_strategy blocks is 5.
  ordered_placement_strategy = [{"field":"cpu","type":"binpack"}]

  placement_constraint_expression = "attribute:ecs.ami-id != 'ami-fake'"

  placement_constraint_type = "memberOf"

  # The platform version on which to run your service. Only applicable for
  # launch_type set to FARGATE. Defaults to LATEST.
  platform_version = null

  # Whether tags should be propogated to the tasks from the service or from the
  # task definition. Valid values are SERVICE and TASK_DEFINITION. Defaults to
  # SERVICE. If set to null, no tags are created for tasks.
  propagate_tags = "SERVICE"

  # Configuration block for the App Mesh proxy. The only supported value for
  # `type` is "APPMESH". Use the name of the Envoy proxy container from
  # `container_definitions` as the `container_name`. `properties` is a map of
  # network configuration parameters to provide the Container Network Interface
  # (CNI) plugin.
  proxy_configuration = null

  # Define runtime platform options
  runtime_platform = null

  # ECS Service Connect configuration for this service to discover and connect
  # to services, and be discovered by, and connected from, other services within
  # a namespace
  service_connect_configuration = null

  # Use this variable to adjust the default timeout of 20m for create and update
  # operations the the ECS service. Adjusting the value can be particularly
  # useful when using 'wait_for_steady_state'.
  service_create_update_timeout = "20m"

  # Use this variable to adjust the default timeout of 5m for delete operations
  # the the ECS service.
  service_delete_timeout = "5m"

  # A map of tags to apply to the ECS service. Each item in this list should be
  # a map with the parameters key and value.
  service_tags = {}

  # Whether or not to include check for ALB/NLB health checks. When set to true,
  # no health check will be performed against the load balancer. This can be
  # used to speed up deployments, but keep in mind that disabling health checks
  # mean you won't have confirmed status of the service being operational.
  # Defaults to false (health checks enabled).
  skip_load_balancer_check_arg = false

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

  # If true, the ALB will use use Sticky Sessions as described at
  # https://goo.gl/VLcNbk. Only used if var.elb_target_group_name is set. Note
  # that this can only be true when associating with an ALB. This cannot be used
  # with CLBs or NLBs.
  use_alb_sticky_sessions = false

  # Set this variable to 'true' to tell the ECS service to ignore
  # var.desired_number_of_tasks and instead use auto scaling to determine how
  # many Tasks of this service to run.
  use_auto_scaling = false

  # Set this variable to 'true' to setup service discovery for the ECS service
  # by automatically registering the task IPs to a registry that is created
  # within this module. Currently this is only supported with the 'awsvpc'
  # networking mode.
  use_service_discovery = false

  # (Optional) A map of volume blocks that containers in your task may use. The
  # key should be the name of the volume and the value should be a map
  # compatible with
  # https://www.terraform.io/docs/providers/aws/r/ecs_task_definition.html#volume-block-arguments,
  # but not including the name parameter.
  volumes = {}

  # If true, Terraform will wait for the service to reach a steady state — as
  # in, the ECS tasks you wanted are actually deployed — before 'apply' is
  # considered complete.
  wait_for_steady_state = true

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ECS-SERVICE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-ecs.git//modules/ecs-service?ref=v0.38.4"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # How many copies of the Task to run across the cluster.
  desired_number_of_tasks = <number>

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

  # The time period, in seconds, during which requests from a client should be
  # routed to the same Target. After this time period expires, the load
  # balancer-generated cookie is considered stale. The acceptable range is 1
  # second to 1 week (604800 seconds). The default value is 1 day (86400
  # seconds). Only used if var.elb_target_group_name is set.
  alb_sticky_session_cookie_duration = 86400

  # The type of Sticky Sessions to use. See https://goo.gl/MNwqNu for possible
  # values. Only used if var.elb_target_group_name is set.
  alb_sticky_session_type = "lb_cookie"

  # The capacity provider strategy to use for the service. Note that the
  # capacity providers have to be present on ECS cluster before deploying ECS
  # service. When provided, var.launch_type is ignored.
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

  # Custom name to use for the ECS service IAM role that is created. Note that
  # this service IAM role is only needed when the ECS service is being used with
  # an ELB. If blank (default), the name will be set to var.service_name.
  custom_ecs_service_role_name = null

  # Prefix for name of the IAM role used by the ECS task. If not provide, will
  # be set to var.service_name.
  custom_iam_role_name_prefix = null

  # Prefix for name of task execution IAM role and policy that grants access to
  # CloudWatch and ECR. If not provide, will be set to var.service_name.
  custom_task_execution_name_prefix = null

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # Set enable to 'true' to prevent the task from attempting to continuously
  # redeploy after a failed health check. Set rollback to 'true' to also
  # automatically roll back to the last successful deployment. If this setting
  # is used, both 'enable' and 'rollback' are required fields.
  deployment_circuit_breaker = null

  # CloudWatch alarms which triggers deployment rollback if failure.
  deployment_cloudwatch_alarms = null

  # Type of deployment controller, possible values: CODE_DEPLOY, ECS, EXTERNAL
  deployment_controller = null

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

  # How many Tasks to run of the var.ecs_task_definition_canary to deploy for a
  # canary deployment. Typically, only 0 or 1 should be used.
  desired_number_of_canary_tasks_to_run = 0

  # Check alias target health before routing to the service. Only used if
  # var.discovery_use_public_dns is true.
  discovery_alias_record_evaluate_target_health = true

  # Container name value, already specified in the task definition, to be used
  # for your service discovery service. Required when using `SRV` record type.
  discovery_container_name = null

  # Port value, already specified in the task definition, to be used for your
  # service discovery service. Required when using `SRV` record type.
  discovery_container_port = null

  # The number of 30-second intervals that you want service discovery to wait
  # before it changes the health status of a service instance. Maximum value of
  # 10. Only used if var.use_service_discovery is true.
  discovery_custom_health_check_failure_threshold = 1

  # The type of the resource, which indicates the value that Amazon Route 53
  # returns in response to DNS queries corresponded to service discovery
  # requests.
  discovery_dns_record_type = "A"

  # The routing policy that you want to apply to all records that Route 53
  # creates when you register an instance and specify the service. Valid Values:
  # MULTIVALUE, WEIGHTED. Only used if var.use_service_discovery is true.
  discovery_dns_routing_policy = "MULTIVALUE"

  # The amount of time, in seconds, that you want DNS resolvers to cache the
  # settings for this resource record set. Only used if
  # var.use_service_discovery is true.
  discovery_dns_ttl = 60

  # The name by which the service can be discovered. It will be used to form the
  # service discovery address along with the namespace name in
  # <discovery_name>.<namespace_name>. So if your discovery name is 'my-service'
  # and your namespace name is 'my-company-staging.local', the hostname for the
  # service will be 'my-service.my-company-staging.local'. Only used if
  # var.use_service_discovery is true.
  discovery_name = null

  # The id of the previously created namespace for service discovery. It will be
  # used to form the service discovery address along with the discovery name in
  # <discovery_name>.<namespace_name>. So if your discovery name is 'my-service'
  # and your namespace name is 'my-company-staging.local', the hostname for the
  # service will be 'my-service.my-company-staging.local'. Only used if
  # var.use_service_discovery is true.
  discovery_namespace_id = null

  # The ID of the original Route 53 Hosted Zone where associated with the domain
  # registrar. Only used if var.discovery_use_public_dns is true.
  discovery_original_public_route53_zone_id = null

  # The ID of the new Route 53 Hosted Zone created for the public DNS namespace.
  # Only used if var.discovery_use_public_dns is true.
  discovery_public_dns_namespace_route53_zone_id = null

  # Set this variable to 'true' when using public DNS namespaces. Only used if
  # var.use_service_discovery is true.
  discovery_use_public_dns = false

  # The configuration to use when setting up the VPC network mode. Required and
  # only used if ecs_task_definition_network_mode is awsvpc.
  ecs_service_network_configuration = null

  # The JSON text of the ECS Task Definition to be run for the canary. This
  # defines the Docker container(s) to be run along with all their properties.
  # It should adhere to the format described at https://goo.gl/ob5U3g.
  ecs_task_definition_canary = "[{ \"name\":\"not-used\" }]"

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

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role for the ELB.
  elb_role_permissions_boundary_arn = null

  # The amount time for targets to warm up before the load balancer sends them a
  # full share of requests. The range is 30-900 seconds or 0 to disable. The
  # default value is 0 seconds. Only used if var.elb_target_group_name is set.
  elb_slow_start = 0

  # The amount of time for Elastic Load Balancing to wait before changing the
  # state of a deregistering target from draining to unused. The range is 0-3600
  # seconds. Only used if var.elb_target_group_name is set.
  elb_target_group_deregistration_delay = 300

  # The ID of the VPC in which to create the target group. Only used if
  # var.elb_target_group_name is set.
  elb_target_group_vpc_id = null

  # Configurations for ELB target groups for ALBs and NLBs that should be
  # associated with the ECS Tasks. Each entry corresponds to a separate target
  # group. Set to the empty object ({}) if you are not using an ALB or NLB.
  elb_target_groups = {}

  # Specifies whether to enable Amazon ECS Exec for the tasks within the
  # service.
  enable_execute_command = false

  # The name of the existing task execution role to be used in place of creating
  # a new role.
  existing_ecs_task_execution_role_name = null

  # The name of the existing task role to be used in place of creating a new
  # role.
  existing_ecs_task_role_name = null

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

  # The launch type of the ECS service. Defaults to null, which will result in
  # using the default capacity provider strategyfrom the ECS cluster. Valid
  # value must be one of EC2 or FARGATE. When using FARGATE, you must set the
  # network mode to awsvpc and configure it. When using EC2, you can configure
  # the placement strategy using the variables ordered_placement_strategy,
  # placement_constraint_type, placement_constraint_expression. This variable is
  # ignored if var.capacity_provider_strategy is provided.
  launch_type = null

  # A map of tags to apply to the elb target group. Each item in this list
  # should be a map with the parameters key and value.
  lb_target_group_tags = {}

  # Listener rules list required first to be provisioned before creation of ECS
  # cluster.
  listener_rule_ids = []

  # The maximum number of ECS Task instances of the ECS Service to run. Auto
  # scaling will never scale out above this number. Must be set when
  # var.use_auto_scaling is true.
  max_number_of_tasks = null

  # The minimum number of ECS Task instances of the ECS Service to run. Auto
  # scaling will never scale in below this number. Must be set when
  # var.use_auto_scaling is true.
  min_number_of_tasks = null

  # Service level strategy rules that are taken into consideration during task
  # placement. List from top to bottom in order of precedence. Updates to this
  # configuration will take effect next task deployment unless
  # force_new_deployment is enabled. The maximum number of
  # ordered_placement_strategy blocks is 5.
  ordered_placement_strategy = [{"field":"cpu","type":"binpack"}]

  placement_constraint_expression = "attribute:ecs.ami-id != 'ami-fake'"

  placement_constraint_type = "memberOf"

  # The platform version on which to run your service. Only applicable for
  # launch_type set to FARGATE. Defaults to LATEST.
  platform_version = null

  # Whether tags should be propogated to the tasks from the service or from the
  # task definition. Valid values are SERVICE and TASK_DEFINITION. Defaults to
  # SERVICE. If set to null, no tags are created for tasks.
  propagate_tags = "SERVICE"

  # Configuration block for the App Mesh proxy. The only supported value for
  # `type` is "APPMESH". Use the name of the Envoy proxy container from
  # `container_definitions` as the `container_name`. `properties` is a map of
  # network configuration parameters to provide the Container Network Interface
  # (CNI) plugin.
  proxy_configuration = null

  # Define runtime platform options
  runtime_platform = null

  # ECS Service Connect configuration for this service to discover and connect
  # to services, and be discovered by, and connected from, other services within
  # a namespace
  service_connect_configuration = null

  # Use this variable to adjust the default timeout of 20m for create and update
  # operations the the ECS service. Adjusting the value can be particularly
  # useful when using 'wait_for_steady_state'.
  service_create_update_timeout = "20m"

  # Use this variable to adjust the default timeout of 5m for delete operations
  # the the ECS service.
  service_delete_timeout = "5m"

  # A map of tags to apply to the ECS service. Each item in this list should be
  # a map with the parameters key and value.
  service_tags = {}

  # Whether or not to include check for ALB/NLB health checks. When set to true,
  # no health check will be performed against the load balancer. This can be
  # used to speed up deployments, but keep in mind that disabling health checks
  # mean you won't have confirmed status of the service being operational.
  # Defaults to false (health checks enabled).
  skip_load_balancer_check_arg = false

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

  # If true, the ALB will use use Sticky Sessions as described at
  # https://goo.gl/VLcNbk. Only used if var.elb_target_group_name is set. Note
  # that this can only be true when associating with an ALB. This cannot be used
  # with CLBs or NLBs.
  use_alb_sticky_sessions = false

  # Set this variable to 'true' to tell the ECS service to ignore
  # var.desired_number_of_tasks and instead use auto scaling to determine how
  # many Tasks of this service to run.
  use_auto_scaling = false

  # Set this variable to 'true' to setup service discovery for the ECS service
  # by automatically registering the task IPs to a registry that is created
  # within this module. Currently this is only supported with the 'awsvpc'
  # networking mode.
  use_service_discovery = false

  # (Optional) A map of volume blocks that containers in your task may use. The
  # key should be the name of the volume and the value should be a map
  # compatible with
  # https://www.terraform.io/docs/providers/aws/r/ecs_task_definition.html#volume-block-arguments,
  # but not including the name parameter.
  volumes = {}

  # If true, Terraform will wait for the service to reach a steady state — as
  # in, the ECS tasks you wanted are actually deployed — before 'apply' is
  # considered complete.
  wait_for_steady_state = true

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="desired_number_of_tasks" requirement="required" type="number">
<HclListItemDescription>

How many copies of the Task to run across the cluster.

</HclListItemDescription>
</HclListItem>

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

<HclListItem name="alb_sticky_session_cookie_duration" requirement="optional" type="number">
<HclListItemDescription>

The time period, in seconds, during which requests from a client should be routed to the same Target. After this time period expires, the load balancer-generated cookie is considered stale. The acceptable range is 1 second to 1 week (604800 seconds). The default value is 1 day (86400 seconds). Only used if <a href="#elb_target_group_name"><code>elb_target_group_name</code></a> is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="86400"/>
</HclListItem>

<HclListItem name="alb_sticky_session_type" requirement="optional" type="string">
<HclListItemDescription>

The type of Sticky Sessions to use. See https://goo.gl/MNwqNu for possible values. Only used if <a href="#elb_target_group_name"><code>elb_target_group_name</code></a> is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;lb_cookie&quot;"/>
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

<HclListItem name="custom_ecs_service_role_name" requirement="optional" type="string">
<HclListItemDescription>

Custom name to use for the ECS service IAM role that is created. Note that this service IAM role is only needed when the ECS service is being used with an ELB. If blank (default), the name will be set to <a href="#service_name"><code>service_name</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_iam_role_name_prefix" requirement="optional" type="string">
<HclListItemDescription>

Prefix for name of the IAM role used by the ECS task. If not provide, will be set to <a href="#service_name"><code>service_name</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_task_execution_name_prefix" requirement="optional" type="string">
<HclListItemDescription>

Prefix for name of task execution IAM role and policy that grants access to CloudWatch and ECR. If not provide, will be set to <a href="#service_name"><code>service_name</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="dependencies" requirement="optional" type="list(string)">
<HclListItemDescription>

Create a dependency between the resources in this module to the interpolated values in this list (and thus the source resources). In other words, the resources in this module will now depend on the resources backing the values in this list such that those resources need to be created before the resources in this module, and the resources in this module need to be destroyed before the resources in the list.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="deployment_circuit_breaker" requirement="optional" type="object(…)">
<HclListItemDescription>

Set enable to 'true' to prevent the task from attempting to continuously redeploy after a failed health check. Set rollback to 'true' to also automatically roll back to the last successful deployment. If this setting is used, both 'enable' and 'rollback' are required fields.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    enable   = bool
    rollback = bool
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="deployment_cloudwatch_alarms" requirement="optional" type="object(…)">
<HclListItemDescription>

CloudWatch alarms which triggers deployment rollback if failure.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    cloudwatch_alarms = list(string)
    enable            = bool
    rollback          = bool
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="deployment_controller" requirement="optional" type="string">
<HclListItemDescription>

Type of deployment controller, possible values: CODE_DEPLOY, ECS, EXTERNAL

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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

<HclListItem name="desired_number_of_canary_tasks_to_run" requirement="optional" type="number">
<HclListItemDescription>

How many Tasks to run of the <a href="#ecs_task_definition_canary"><code>ecs_task_definition_canary</code></a> to deploy for a canary deployment. Typically, only 0 or 1 should be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="discovery_alias_record_evaluate_target_health" requirement="optional" type="bool">
<HclListItemDescription>

Check alias target health before routing to the service. Only used if <a href="#discovery_use_public_dns"><code>discovery_use_public_dns</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="discovery_container_name" requirement="optional" type="string">
<HclListItemDescription>

Container name value, already specified in the task definition, to be used for your service discovery service. Required when using `SRV` record type.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="discovery_container_port" requirement="optional" type="string">
<HclListItemDescription>

Port value, already specified in the task definition, to be used for your service discovery service. Required when using `SRV` record type.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="discovery_custom_health_check_failure_threshold" requirement="optional" type="number">
<HclListItemDescription>

The number of 30-second intervals that you want service discovery to wait before it changes the health status of a service instance. Maximum value of 10. Only used if <a href="#use_service_discovery"><code>use_service_discovery</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="discovery_dns_record_type" requirement="optional" type="string">
<HclListItemDescription>

The type of the resource, which indicates the value that Amazon Route 53 returns in response to DNS queries corresponded to service discovery requests.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;A&quot;"/>
</HclListItem>

<HclListItem name="discovery_dns_routing_policy" requirement="optional" type="string">
<HclListItemDescription>

The routing policy that you want to apply to all records that Route 53 creates when you register an instance and specify the service. Valid Values: MULTIVALUE, WEIGHTED. Only used if <a href="#use_service_discovery"><code>use_service_discovery</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;MULTIVALUE&quot;"/>
</HclListItem>

<HclListItem name="discovery_dns_ttl" requirement="optional" type="number">
<HclListItemDescription>

The amount of time, in seconds, that you want DNS resolvers to cache the settings for this resource record set. Only used if <a href="#use_service_discovery"><code>use_service_discovery</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="discovery_name" requirement="optional" type="string">
<HclListItemDescription>

The name by which the service can be discovered. It will be used to form the service discovery address along with the namespace name in &lt;discovery_name>.&lt;namespace_name>. So if your discovery name is 'my-service' and your namespace name is 'my-company-staging.local', the hostname for the service will be 'my-service.my-company-staging.local'. Only used if <a href="#use_service_discovery"><code>use_service_discovery</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="discovery_namespace_id" requirement="optional" type="string">
<HclListItemDescription>

The id of the previously created namespace for service discovery. It will be used to form the service discovery address along with the discovery name in &lt;discovery_name>.&lt;namespace_name>. So if your discovery name is 'my-service' and your namespace name is 'my-company-staging.local', the hostname for the service will be 'my-service.my-company-staging.local'. Only used if <a href="#use_service_discovery"><code>use_service_discovery</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="discovery_original_public_route53_zone_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the original Route 53 Hosted Zone where associated with the domain registrar. Only used if <a href="#discovery_use_public_dns"><code>discovery_use_public_dns</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="discovery_public_dns_namespace_route53_zone_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the new Route 53 Hosted Zone created for the public DNS namespace. Only used if <a href="#discovery_use_public_dns"><code>discovery_use_public_dns</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="discovery_use_public_dns" requirement="optional" type="bool">
<HclListItemDescription>

Set this variable to 'true' when using public DNS namespaces. Only used if <a href="#use_service_discovery"><code>use_service_discovery</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="ecs_service_network_configuration" requirement="optional" type="object(…)">
<HclListItemDescription>

The configuration to use when setting up the VPC network mode. Required and only used if ecs_task_definition_network_mode is awsvpc.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    subnets          = list(string)
    security_groups  = list(string)
    assign_public_ip = bool
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ecs_task_definition_canary" requirement="optional" type="string">
<HclListItemDescription>

The JSON text of the ECS Task Definition to be run for the canary. This defines the Docker container(s) to be run along with all their properties. It should adhere to the format described at https://goo.gl/ob5U3g.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;[{ &quot;name&quot;:&quot;not-used&quot; }]&quot;"/>
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

<HclListItem name="elb_role_permissions_boundary_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role for the ELB.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="elb_slow_start" requirement="optional" type="number">
<HclListItemDescription>

The amount time for targets to warm up before the load balancer sends them a full share of requests. The range is 30-900 seconds or 0 to disable. The default value is 0 seconds. Only used if <a href="#elb_target_group_name"><code>elb_target_group_name</code></a> is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="elb_target_group_deregistration_delay" requirement="optional" type="number">
<HclListItemDescription>

The amount of time for Elastic Load Balancing to wait before changing the state of a deregistering target from draining to unused. The range is 0-3600 seconds. Only used if <a href="#elb_target_group_name"><code>elb_target_group_name</code></a> is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="elb_target_group_vpc_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the VPC in which to create the target group. Only used if <a href="#elb_target_group_name"><code>elb_target_group_name</code></a> is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="elb_target_groups" requirement="optional" type="any">
<HclListItemDescription>

Configurations for ELB target groups for ALBs and NLBs that should be associated with the ECS Tasks. Each entry corresponds to a separate target group. Set to the empty object (&#123;&#125;) if you are not using an ALB or NLB.

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

<HclListItem name="enable_execute_command" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether to enable Amazon ECS Exec for the tasks within the service.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="existing_ecs_task_execution_role_name" requirement="optional">
<HclListItemDescription>

The name of the existing task execution role to be used in place of creating a new role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="existing_ecs_task_role_name" requirement="optional">
<HclListItemDescription>

The name of the existing task role to be used in place of creating a new role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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

<HclListItem name="launch_type" requirement="optional" type="string">
<HclListItemDescription>

The launch type of the ECS service. Defaults to null, which will result in using the default capacity provider strategyfrom the ECS cluster. Valid value must be one of EC2 or FARGATE. When using FARGATE, you must set the network mode to awsvpc and configure it. When using EC2, you can configure the placement strategy using the variables ordered_placement_strategy, placement_constraint_type, placement_constraint_expression. This variable is ignored if <a href="#capacity_provider_strategy"><code>capacity_provider_strategy</code></a> is provided.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="lb_target_group_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the elb target group. Each item in this list should be a map with the parameters key and value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="listener_rule_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

Listener rules list required first to be provisioned before creation of ECS cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="max_number_of_tasks" requirement="optional" type="number">
<HclListItemDescription>

The maximum number of ECS Task instances of the ECS Service to run. Auto scaling will never scale out above this number. Must be set when <a href="#use_auto_scaling"><code>use_auto_scaling</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="min_number_of_tasks" requirement="optional" type="number">
<HclListItemDescription>

The minimum number of ECS Task instances of the ECS Service to run. Auto scaling will never scale in below this number. Must be set when <a href="#use_auto_scaling"><code>use_auto_scaling</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ordered_placement_strategy" requirement="optional" type="list(object(…))">
<HclListItemDescription>

Service level strategy rules that are taken into consideration during task placement. List from top to bottom in order of precedence. Updates to this configuration will take effect next task deployment unless force_new_deployment is enabled. The maximum number of ordered_placement_strategy blocks is 5.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    type  = string
    field = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
[
  {
    field = "cpu",
    type = "binpack"
  }
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="placement_constraint_expression" requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="&quot;attribute:ecs.ami-id != &apos;ami-fake&apos;&quot;"/>
</HclListItem>

<HclListItem name="placement_constraint_type" requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="&quot;memberOf&quot;"/>
</HclListItem>

<HclListItem name="platform_version" requirement="optional" type="string">
<HclListItemDescription>

The platform version on which to run your service. Only applicable for launch_type set to FARGATE. Defaults to LATEST.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="propagate_tags" requirement="optional" type="string">
<HclListItemDescription>

Whether tags should be propogated to the tasks from the service or from the task definition. Valid values are SERVICE and TASK_DEFINITION. Defaults to SERVICE. If set to null, no tags are created for tasks.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;SERVICE&quot;"/>
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

<HclListItem name="service_connect_configuration" requirement="optional" type="any">
<HclListItemDescription>

ECS Service Connect configuration for this service to discover and connect to services, and be discovered by, and connected from, other services within a namespace

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   {
     namespace = string                        : (Optional) Namespace name or ARN of the aws_service_discovery_http_namespace for use with Service Connect.
     service = list({                          : (Optional) List of Service Connect service objects
       client_alias = {                        : (Optional) Client aliases for this Service Connect service. You use these to assign names that can be used by client applications. The maximum number of client aliases that you can have in this list is 1. See below.
         dns_name = string                     : (Optional) Name that you use in the applications of client tasks to connect to this service.
         port = number                         : (Required) Listening port number for the Service Connect proxy. This port is available inside of all of the tasks within the same namespace.
       }             
       discovery_name = string                 : (Optional) Name of the new AWS Cloud Map service that Amazon ECS creates for this Amazon ECS service.
       ingress_port_override= number           : (Optional) Port number for the Service Connect proxy to listen on.
       port_name = string                      : (Required) Name of one of the portMappings from all the containers in the task definition of this Amazon ECS service.
       timeout = {                             : (Optional) Configuration timeouts for Service Connect
         idle_timeout_seconds = number         : (Optional) Amount of time in seconds a connection will stay active while idle. A value of 0 can be set to disable idleTimeout
         per_request_timeout_seconds = number  : (Optional) Amount of time in seconds for the upstream to respond with a complete response per request. A value of 0 can be set to disable perRequestTimeout. Can only be set when appProtocol isn't TCP.
       }
       tls = {                                 : (Optional) Configuration for enabling Transport Layer Security (TLS)        
         issuer_cert_authority = {             : (Required) Details of the certificate authority which will issue the certificate.
            aws_pca_authority_arn = string     : (Required) ARN of the aws_acmpca_certificate_authority used to create the TLS Certificates.
         }
         kms_key = string                      : (Optional) KMS key used to encrypt the private key in Secrets Manager.
         role_arn = string                     : (Optional) ARN of the IAM Role that's associated with the Service Connect TLS.          
       }
     })
     log_configuration = {                     : (Optional)
       log_driver = string                     : (Required) Log driver to use for the container.
       options = map(string)                   : (Optional) Configuration options to send to the log driver.
       secret_option = list({                  : (Optional) Secrets to pass to the log configuration.
         name = string                         : (Required) Name of the secret.
         value_from = string                   : (Required) Secret to expose to the container. The supported values are either the full ARN of the AWS Secrets Manager secret or the full ARN of the parameter in the SSM Parameter Store.
       })
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="service_create_update_timeout" requirement="optional" type="string">
<HclListItemDescription>

Use this variable to adjust the default timeout of 20m for create and update operations the the ECS service. Adjusting the value can be particularly useful when using 'wait_for_steady_state'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;20m&quot;"/>
</HclListItem>

<HclListItem name="service_delete_timeout" requirement="optional" type="string">
<HclListItemDescription>

Use this variable to adjust the default timeout of 5m for delete operations the the ECS service.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;5m&quot;"/>
</HclListItem>

<HclListItem name="service_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the ECS service. Each item in this list should be a map with the parameters key and value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="skip_load_balancer_check_arg" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to include check for ALB/NLB health checks. When set to true, no health check will be performed against the load balancer. This can be used to speed up deployments, but keep in mind that disabling health checks mean you won't have confirmed status of the service being operational. Defaults to false (health checks enabled).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
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

<HclListItem name="use_alb_sticky_sessions" requirement="optional" type="bool">
<HclListItemDescription>

If true, the ALB will use use Sticky Sessions as described at https://goo.gl/VLcNbk. Only used if <a href="#elb_target_group_name"><code>elb_target_group_name</code></a> is set. Note that this can only be true when associating with an ALB. This cannot be used with CLBs or NLBs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="use_auto_scaling" requirement="optional" type="bool">
<HclListItemDescription>

Set this variable to 'true' to tell the ECS service to ignore <a href="#desired_number_of_tasks"><code>desired_number_of_tasks</code></a> and instead use auto scaling to determine how many Tasks of this service to run.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="use_service_discovery" requirement="optional" type="bool">
<HclListItemDescription>

Set this variable to 'true' to setup service discovery for the ECS service by automatically registering the task IPs to a registry that is created within this module. Currently this is only supported with the 'awsvpc' networking mode.

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

<HclListItem name="wait_for_steady_state" requirement="optional" type="bool">
<HclListItemDescription>

If true, Terraform will wait for the service to reach a steady state — as in, the ECS tasks you wanted are actually deployed — before 'apply' is considered complete.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="aws_ecs_task_definition_arn">
</HclListItem>

<HclListItem name="aws_ecs_task_definition_canary_arn">
</HclListItem>

<HclListItem name="canary_service_arn">
</HclListItem>

<HclListItem name="capacity_provider_strategy">
</HclListItem>

<HclListItem name="ecs_task_execution_iam_role_arn">
</HclListItem>

<HclListItem name="ecs_task_execution_iam_role_name">
</HclListItem>

<HclListItem name="ecs_task_iam_role_arn">
</HclListItem>

<HclListItem name="ecs_task_iam_role_name">
</HclListItem>

<HclListItem name="service_app_autoscaling_target_arn">
</HclListItem>

<HclListItem name="service_app_autoscaling_target_resource_id">
</HclListItem>

<HclListItem name="service_arn">
</HclListItem>

<HclListItem name="service_discovery_arn">
</HclListItem>

<HclListItem name="service_iam_role_arn">
</HclListItem>

<HclListItem name="service_iam_role_name">
</HclListItem>

<HclListItem name="target_group_arns">
</HclListItem>

<HclListItem name="target_group_names">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/modules/ecs-service/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/modules/ecs-service/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.38.4/modules/ecs-service/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "6c778872832d095e38803da29a396563"
}
##DOCS-SOURCER-END -->
