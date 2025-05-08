---
title: "Auto Scaling Group with Rolling Deployment Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Auto Scaling Group Modules" version="1.0.0" lastModifiedVersion="0.21.17"/>

# Auto Scaling Group with Rolling Deployment Module

<a href="https://github.com/gruntwork-io/terraform-aws-asg/tree/v1.0.0/modules/asg-rolling-deploy" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.17" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module creates an Auto Scaling Group (ASG) that can do a zero-downtime rolling deployment. That means
every time you update your app (e.g. publish a new AMI), all you have to do is run `terraform apply` and the new
version of your app will automatically roll out across your Auto Scaling Group. Note that this module *only*
creates the ASG and it's up to you to create all the other related resources, such as the launch template, ELB,
and security groups.

:::note

This module used to use Launch configurations but has been updated to use Launch templates. This has been
[recommended by AWS for some time](https://aws.amazon.com/blogs/compute/amazon-ec2-auto-scaling-will-no-longer-add-support-for-new-ec2-features-to-launch-configurations/) and Launch configurations will finally be deprecated entirely on Dec 31st 2023.

:::

## What's an Auto Scaling Group?

An [Auto Scaling Group](https://aws.amazon.com/autoscaling/) (ASG) is used to manage a cluster of EC2 Instances. It
can enforce pre-defined rules about how many instances to run in the cluster, scale the number of instances up or
down depending on traffic, and automatically restart instances if they go down.

## How does rolling deployment work?

Since Terraform does not have rolling deployment built in (see https://github.com/hashicorp/terraform/issues/1552), we
are faking it using the `create_before_destroy` lifecycle property. This approach is based on the rolling deploy
strategy used by HashiCorp itself, [as described by Paul Hinze
here](https://groups.google.com/forum/#!msg/terraform-tool/7Gdhv1OAc80/iNQ93riiLwAJ). As a result, every time you
update your launch templates (e.g. by specifying a new AMI to deploy), Terraform will:

1.  Create a new ASG with the new launch templates.
2.  Wait for the new ASG to deploy successfully and for the instances to register with the load balancer (if you
    associated an ELB or ALB with this ASG).
3.  Destroy the old ASG.
4.  Since the old ASG is only removed once the new ASG instances are registered with the ELB and serving traffic, there
    will be no downtime. Moreover, if anything went wrong while rolling out the new ASG, it will be marked as
    [tainted](https://www.terraform.io/docs/commands/taint.html) (i.e. marked for deletion next time) and the original
    ASG will be left unchanged, so again, there is no downtime.

Note that if all we did was use `create_before_destroy`, on each redeploy, our ASG would reset to its hard-coded
`desired_capacity`, losing the capacity changes from auto scaling policies. We solve this problem by using an
[external data source](https://www.terraform.io/docs/providers/external/data_source.html) that runs the Python script
[get-desired-capacity.py](https://github.com/gruntwork-io/terraform-aws-asg/tree/v1.0.0/modules/asg-rolling-deploy/describe-autoscaling-group/get-desired-capacity.py) to fetch the latest value of the
`desired_capacity` parameter:

*   If the script finds a value from an already-existing ASG, we use it, to ensure that the changes form auto scaling
    events are not lost.
*   If the script doesn't find an already-existing ASG, that means this is the first deploy, and we fall back to the
    hard-coded `desired_capacity` value.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ASG-ROLLING-DEPLOY MODULE
# ------------------------------------------------------------------------------------------------------

module "asg_rolling_deploy" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-asg.git//modules/asg-rolling-deploy?ref=v1.0.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The desired number of EC2 Instances to run in the ASG initially. Note that
  # auto scaling policies may change this value. If you're using auto scaling
  # policies to dynamically resize the cluster, you should actually leave this
  # value as null.
  desired_capacity = <number>

  # The ID and version of the Launch Template to use for each EC2 instance in
  # this ASG. The version value MUST be an output of the Launch Template
  # resource itself. This ensures that a new ASG is created every time a new
  # Launch Template version is created.
  launch_template = <object(
    id      = string
    name    = string
    version = string
  )>

  # The maximum number of EC2 Instances to run in the ASG
  max_size = <number>

  # The minimum number of EC2 Instances to run in the ASG
  min_size = <number>

  # A list of subnet ids in the VPC were the EC2 Instances should be deployed
  vpc_subnet_ids = <list(string)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Override the auto-generated ASG name with this value.
  asg_name = ""

  # Capacity Rebalancing helps you maintain workload availability by proactively
  # augmenting your fleet with a new Spot Instance before a running instance is
  # interrupted by Amazon EC2
  autoscaling_capacity_rebalance = false

  # Defines the action the Auto Scaling group should take when the lifecycle
  # hook timeout elapses or if an unexpected failure occurs. The value for this
  # parameter can be either CONTINUE or ABANDON. The default value for this
  # parameter is ABANDON.
  autoscaling_lifecycle_hook_default_result = null

  # Defines the amount of time, in seconds, that can elapse before the lifecycle
  # hook times out. When the lifecycle hook times out, Auto Scaling performs the
  # action defined in the DefaultResult parameter
  autoscaling_lifecycle_hook_heartbeat_timeout = null

  # Required if enable_autoscaling_lifecycle_hook is enabled. Instance state to
  # which you want to attach the lifecycle hook. For a list of lifecycle hook
  # types, see
  # https://docs.aws.amazon.com/cli/latest/reference/autoscaling/describe-lifecycle-hook-types.html#examples
  autoscaling_lifecycle_lifecycle_transition = null

  # Contains additional information that you want to include any time Auto
  # Scaling sends a message to the notification target.
  autoscaling_lifecycle_notification_metadata = []

  # ARN of the notification target that Auto Scaling will use to notify you when
  # an instance is in the transition state for the lifecycle hook.
  autoscaling_lifecycle_notification_target_arn = null

  # ARN of the IAM role that allows the Auto Scaling group to publish to the
  # specified notification target.
  autoscaling_lifecycle_role_arn = null

  # A list of custom tags to apply to the EC2 Instances in this ASG. Each item
  # in this list should be a map with the parameters key, value, and
  # propagate_at_launch.
  custom_tags = []

  # Timeout value for deletion operations on autoscale groups.
  deletion_timeout = "10m"

  # Toggles if the autoscaling_lifecycle_hook will be enabled or not. If
  # enabled, the aws_autoscaling_lifecycle_hook resource will be created and
  # attached to the ALB. Make sure you set all autoscaling_lifecycle_* variables
  # to desired values if enabled.
  enable_autoscaling_lifecycle_hook = false

  # A list of metrics the ASG should enable for monitoring all instances in a
  # group. The allowed values are GroupMinSize, GroupMaxSize,
  # GroupDesiredCapacity, GroupInServiceInstances, GroupPendingInstances,
  # GroupStandbyInstances, GroupTerminatingInstances, GroupTotalInstances.
  enabled_metrics = []

  # Time, in seconds, after an EC2 Instance comes into service before checking
  # health.
  health_check_grace_period = 300

  # A list of Elastic Load Balancer (ELB) names to associate with this ASG. If
  # you're using the Application Load Balancer (ALB), see var.target_group_arns.
  load_balancers = []

  # The maximum amount of time, in seconds, that an instance inside an ASG can
  # be in service, values must be either equal to 0 or between 604800 and
  # 31536000 seconds.
  max_instance_lifetime = null

  # Wait for this number of EC2 Instances to show up healthy in the load
  # balancer on creation.
  min_elb_capacity = 0

  # Define policy using spot and on-demand instances.
  mixed_instance_policy = null

  # The key for the tag that will be used to associate a unique identifier with
  # this ASG. This identifier will persist between redeploys of the ASG, even
  # though the underlying ASG is being deleted and replaced with a different
  # one.
  tag_asg_id_key = "AsgId"

  # A list of Application Load Balancer (ALB) target group ARNs to associate
  # with this ASG. If you're using the Elastic Load Balancer (ELB), see
  # var.load_balancers.
  target_group_arns = []

  # A list of policies to decide how the instances in the auto scale group
  # should be terminated. The allowed values are OldestInstance, NewestInstance,
  # OldestLaunchTemplate, AllocationStrategy, ClosestToNextInstanceHour,
  # Default.
  termination_policies = []

  # Whether or not ELB or ALB health checks should be enabled. If set to true,
  # the load_balancers or target_groups_arns variable should be set depending on
  # the load balancer type you are using. Useful for testing connectivity before
  # health check endpoints are available.
  use_elb_health_checks = true

  # A maximum duration that Terraform should wait for the EC2 Instances to be
  # healthy before timing out.
  wait_for_capacity_timeout = "10m"

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ASG-ROLLING-DEPLOY MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-asg.git//modules/asg-rolling-deploy?ref=v1.0.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The desired number of EC2 Instances to run in the ASG initially. Note that
  # auto scaling policies may change this value. If you're using auto scaling
  # policies to dynamically resize the cluster, you should actually leave this
  # value as null.
  desired_capacity = <number>

  # The ID and version of the Launch Template to use for each EC2 instance in
  # this ASG. The version value MUST be an output of the Launch Template
  # resource itself. This ensures that a new ASG is created every time a new
  # Launch Template version is created.
  launch_template = <object(
    id      = string
    name    = string
    version = string
  )>

  # The maximum number of EC2 Instances to run in the ASG
  max_size = <number>

  # The minimum number of EC2 Instances to run in the ASG
  min_size = <number>

  # A list of subnet ids in the VPC were the EC2 Instances should be deployed
  vpc_subnet_ids = <list(string)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Override the auto-generated ASG name with this value.
  asg_name = ""

  # Capacity Rebalancing helps you maintain workload availability by proactively
  # augmenting your fleet with a new Spot Instance before a running instance is
  # interrupted by Amazon EC2
  autoscaling_capacity_rebalance = false

  # Defines the action the Auto Scaling group should take when the lifecycle
  # hook timeout elapses or if an unexpected failure occurs. The value for this
  # parameter can be either CONTINUE or ABANDON. The default value for this
  # parameter is ABANDON.
  autoscaling_lifecycle_hook_default_result = null

  # Defines the amount of time, in seconds, that can elapse before the lifecycle
  # hook times out. When the lifecycle hook times out, Auto Scaling performs the
  # action defined in the DefaultResult parameter
  autoscaling_lifecycle_hook_heartbeat_timeout = null

  # Required if enable_autoscaling_lifecycle_hook is enabled. Instance state to
  # which you want to attach the lifecycle hook. For a list of lifecycle hook
  # types, see
  # https://docs.aws.amazon.com/cli/latest/reference/autoscaling/describe-lifecycle-hook-types.html#examples
  autoscaling_lifecycle_lifecycle_transition = null

  # Contains additional information that you want to include any time Auto
  # Scaling sends a message to the notification target.
  autoscaling_lifecycle_notification_metadata = []

  # ARN of the notification target that Auto Scaling will use to notify you when
  # an instance is in the transition state for the lifecycle hook.
  autoscaling_lifecycle_notification_target_arn = null

  # ARN of the IAM role that allows the Auto Scaling group to publish to the
  # specified notification target.
  autoscaling_lifecycle_role_arn = null

  # A list of custom tags to apply to the EC2 Instances in this ASG. Each item
  # in this list should be a map with the parameters key, value, and
  # propagate_at_launch.
  custom_tags = []

  # Timeout value for deletion operations on autoscale groups.
  deletion_timeout = "10m"

  # Toggles if the autoscaling_lifecycle_hook will be enabled or not. If
  # enabled, the aws_autoscaling_lifecycle_hook resource will be created and
  # attached to the ALB. Make sure you set all autoscaling_lifecycle_* variables
  # to desired values if enabled.
  enable_autoscaling_lifecycle_hook = false

  # A list of metrics the ASG should enable for monitoring all instances in a
  # group. The allowed values are GroupMinSize, GroupMaxSize,
  # GroupDesiredCapacity, GroupInServiceInstances, GroupPendingInstances,
  # GroupStandbyInstances, GroupTerminatingInstances, GroupTotalInstances.
  enabled_metrics = []

  # Time, in seconds, after an EC2 Instance comes into service before checking
  # health.
  health_check_grace_period = 300

  # A list of Elastic Load Balancer (ELB) names to associate with this ASG. If
  # you're using the Application Load Balancer (ALB), see var.target_group_arns.
  load_balancers = []

  # The maximum amount of time, in seconds, that an instance inside an ASG can
  # be in service, values must be either equal to 0 or between 604800 and
  # 31536000 seconds.
  max_instance_lifetime = null

  # Wait for this number of EC2 Instances to show up healthy in the load
  # balancer on creation.
  min_elb_capacity = 0

  # Define policy using spot and on-demand instances.
  mixed_instance_policy = null

  # The key for the tag that will be used to associate a unique identifier with
  # this ASG. This identifier will persist between redeploys of the ASG, even
  # though the underlying ASG is being deleted and replaced with a different
  # one.
  tag_asg_id_key = "AsgId"

  # A list of Application Load Balancer (ALB) target group ARNs to associate
  # with this ASG. If you're using the Elastic Load Balancer (ELB), see
  # var.load_balancers.
  target_group_arns = []

  # A list of policies to decide how the instances in the auto scale group
  # should be terminated. The allowed values are OldestInstance, NewestInstance,
  # OldestLaunchTemplate, AllocationStrategy, ClosestToNextInstanceHour,
  # Default.
  termination_policies = []

  # Whether or not ELB or ALB health checks should be enabled. If set to true,
  # the load_balancers or target_groups_arns variable should be set depending on
  # the load balancer type you are using. Useful for testing connectivity before
  # health check endpoints are available.
  use_elb_health_checks = true

  # A maximum duration that Terraform should wait for the EC2 Instances to be
  # healthy before timing out.
  wait_for_capacity_timeout = "10m"

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="desired_capacity" requirement="required" type="number">
<HclListItemDescription>

The desired number of EC2 Instances to run in the ASG initially. Note that auto scaling policies may change this value. If you're using auto scaling policies to dynamically resize the cluster, you should actually leave this value as null.

</HclListItemDescription>
</HclListItem>

<HclListItem name="launch_template" requirement="required" type="object(…)">
<HclListItemDescription>

The ID and version of the Launch Template to use for each EC2 instance in this ASG. The version value MUST be an output of the Launch Template resource itself. This ensures that a new ASG is created every time a new Launch Template version is created.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    id      = string
    name    = string
    version = string
  })
```

</HclListItemTypeDetails>
</HclListItem>

<HclListItem name="max_size" requirement="required" type="number">
<HclListItemDescription>

The maximum number of EC2 Instances to run in the ASG

</HclListItemDescription>
</HclListItem>

<HclListItem name="min_size" requirement="required" type="number">
<HclListItemDescription>

The minimum number of EC2 Instances to run in the ASG

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

A list of subnet ids in the VPC were the EC2 Instances should be deployed

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="asg_name" requirement="optional" type="string">
<HclListItemDescription>

Override the auto-generated ASG name with this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="autoscaling_capacity_rebalance" requirement="optional" type="bool">
<HclListItemDescription>

Capacity Rebalancing helps you maintain workload availability by proactively augmenting your fleet with a new Spot Instance before a running instance is interrupted by Amazon EC2

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="autoscaling_lifecycle_hook_default_result" requirement="optional" type="string">
<HclListItemDescription>

Defines the action the Auto Scaling group should take when the lifecycle hook timeout elapses or if an unexpected failure occurs. The value for this parameter can be either CONTINUE or ABANDON. The default value for this parameter is ABANDON.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="autoscaling_lifecycle_hook_heartbeat_timeout" requirement="optional" type="number">
<HclListItemDescription>

Defines the amount of time, in seconds, that can elapse before the lifecycle hook times out. When the lifecycle hook times out, Auto Scaling performs the action defined in the DefaultResult parameter

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="autoscaling_lifecycle_lifecycle_transition" requirement="optional" type="string">
<HclListItemDescription>

Required if enable_autoscaling_lifecycle_hook is enabled. Instance state to which you want to attach the lifecycle hook. For a list of lifecycle hook types, see https://docs.aws.amazon.com/cli/latest/reference/autoscaling/describe-lifecycle-hook-types.html#examples

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="autoscaling_lifecycle_notification_metadata" requirement="optional" type="any">
<HclListItemDescription>

Contains additional information that you want to include any time Auto Scaling sends a message to the notification target.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="autoscaling_lifecycle_notification_target_arn" requirement="optional" type="string">
<HclListItemDescription>

ARN of the notification target that Auto Scaling will use to notify you when an instance is in the transition state for the lifecycle hook.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="autoscaling_lifecycle_role_arn" requirement="optional" type="string">
<HclListItemDescription>

ARN of the IAM role that allows the Auto Scaling group to publish to the specified notification target.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="list(object(…))">
<HclListItemDescription>

A list of custom tags to apply to the EC2 Instances in this ASG. Each item in this list should be a map with the parameters key, value, and propagate_at_launch.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    key                 = string
    value               = string
    propagate_at_launch = bool
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = [
     {
       key = "foo"
       value = "bar"
       propagate_at_launch = true
     },
     {
       key = "baz"
       value = "blah"
       propagate_at_launch = true
     }
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="deletion_timeout" requirement="optional" type="string">
<HclListItemDescription>

Timeout value for deletion operations on autoscale groups.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;10m&quot;"/>
</HclListItem>

<HclListItem name="enable_autoscaling_lifecycle_hook" requirement="optional" type="bool">
<HclListItemDescription>

Toggles if the autoscaling_lifecycle_hook will be enabled or not. If enabled, the aws_autoscaling_lifecycle_hook resource will be created and attached to the ALB. Make sure you set all autoscaling_lifecycle_* variables to desired values if enabled.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enabled_metrics" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of metrics the ASG should enable for monitoring all instances in a group. The allowed values are GroupMinSize, GroupMaxSize, GroupDesiredCapacity, GroupInServiceInstances, GroupPendingInstances, GroupStandbyInstances, GroupTerminatingInstances, GroupTotalInstances.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   enabled_metrics = [
      "GroupDesiredCapacity",
      "GroupInServiceInstances",
      "GroupMaxSize",
      "GroupMinSize",
      "GroupPendingInstances",
      "GroupStandbyInstances",
      "GroupTerminatingInstances",
      "GroupTotalInstances"
    ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="health_check_grace_period" requirement="optional" type="number">
<HclListItemDescription>

Time, in seconds, after an EC2 Instance comes into service before checking health.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="load_balancers" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of Elastic Load Balancer (ELB) names to associate with this ASG. If you're using the Application Load Balancer (ALB), see <a href="#target_group_arns"><code>target_group_arns</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="max_instance_lifetime" requirement="optional" type="number">
<HclListItemDescription>

The maximum amount of time, in seconds, that an instance inside an ASG can be in service, values must be either equal to 0 or between 604800 and 31536000 seconds.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="min_elb_capacity" requirement="optional" type="number">
<HclListItemDescription>

Wait for this number of EC2 Instances to show up healthy in the load balancer on creation.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="mixed_instance_policy" requirement="optional" type="any">
<HclListItemDescription>

Define policy using spot and on-demand instances.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="tag_asg_id_key" requirement="optional" type="string">
<HclListItemDescription>

The key for the tag that will be used to associate a unique identifier with this ASG. This identifier will persist between redeploys of the ASG, even though the underlying ASG is being deleted and replaced with a different one.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;AsgId&quot;"/>
</HclListItem>

<HclListItem name="target_group_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of Application Load Balancer (ALB) target group ARNs to associate with this ASG. If you're using the Elastic Load Balancer (ELB), see <a href="#load_balancers"><code>load_balancers</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="termination_policies" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of policies to decide how the instances in the auto scale group should be terminated. The allowed values are OldestInstance, NewestInstance, OldestLaunchTemplate, AllocationStrategy, ClosestToNextInstanceHour, Default.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="use_elb_health_checks" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not ELB or ALB health checks should be enabled. If set to true, the load_balancers or target_groups_arns variable should be set depending on the load balancer type you are using. Useful for testing connectivity before health check endpoints are available.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="wait_for_capacity_timeout" requirement="optional" type="string">
<HclListItemDescription>

A maximum duration that Terraform should wait for the EC2 Instances to be healthy before timing out.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;10m&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="asg_arn">
</HclListItem>

<HclListItem name="asg_name">
</HclListItem>

<HclListItem name="asg_unique_id">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-asg/tree/v1.0.0/modules/asg-rolling-deploy/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-asg/tree/v1.0.0/modules/asg-rolling-deploy/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-asg/tree/v1.0.0/modules/asg-rolling-deploy/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "3f68c5ebf1b889fe60dddd0b9c85a6ad"
}
##DOCS-SOURCER-END -->
