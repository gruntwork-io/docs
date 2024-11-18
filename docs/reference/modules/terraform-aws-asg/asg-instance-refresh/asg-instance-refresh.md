---
title: "Auto Scaling Group Module with Instance Refresh"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Auto Scaling Group Modules" version="0.21.17" lastModifiedVersion="0.21.11"/>

# Auto Scaling Group Module with Instance Refresh

<a href="https://github.com/gruntwork-io/terraform-aws-asg/tree/v0.21.17/modules/asg-instance-refresh" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v0.21.11" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module creates an Auto Scaling Group (ASG) that can do a zero-downtime rolling deployment. That means every time you update your app (e.g. publish a new AMI), all you have to do is run `terraform apply` and the new version of your app will automatically roll out across your Auto Scaling Group. Note that this module *only* creates the ASG and it's up to you to create all the other related resources, such as the launch configuration, ELB, and security groups.

**WARNING: Launch Configurations:** [Launch configurations](https://docs.aws.amazon.com/autoscaling/ec2/userguide/launch-configurations.html) are being phased out in favor of [Launch Templates](https://docs.aws.amazon.com/autoscaling/ec2/userguide/launch-templates.html). Before upgrading to the latest release please be sure to test and plan any changes to infrastructure that may be impacted. Please also keep in mind that AWS will remove support for Launch Configurations on Dec 31st 2023.

## What's an Auto Scaling Group?

An [Auto Scaling Group](https://aws.amazon.com/autoscaling/) (ASG) is used to manage a cluster of EC2 Instances. It can enforce pre-defined rules about how many instances to run in the cluster, scale the number of instances up or down depending on traffic, and automatically restart instances if they go down.

## What is AWS Instance Refresh?

AWS [Instance Refresh](https://docs.aws.amazon.com/autoscaling/ec2/userguide/asg-instance-refresh.html) is a feature that allows instances of an Auto Scaling Group to be automatically refreshed without the need to manually replace instances. This is a useful feature when configuration changes require instances be replaced (such as changing instance size or deploying a new AMI) and you have a large number of instances in your autoscaling group.

## How does Instance Refresh allow for rolling deployments?

This module enables AWS Instance Refresh triggers that will start the instance refresh process when properties change in the `launch_configuration`, `launch_template`, `mixed_instances_policy`, or any user-defined trigger. The instance refresh process works as follows:

*   A trigger event (such as an updated instance size in a launch template change)
*   Using the user-defined variables for minimum healthy percentage, instance warmup time, and checkpoints, the Auto Scaling Group starts the instance refresh process
*   EC2 Auto Scaling starts performing a rolling replacement of all running instances in the Auto Scaling group by taking a set of instances out of service, terminating them, and launching a new set of instances with the new desired configuration.
*   The process will pause and wait until the new instances pass health checks and complete warmup before moving to the next set of instances to replace
*   A checkpoint is reached after a certain percentage of the group is replaced. Whenever a checkpoint is reached, EC2 Auto Scaling temporarily stops replacing instances and waits for a specified amount of time (var.checkpoint_delay) until continuing with the replacement. This allows time for testing, if desired, to confirm the new instances work as expected.
*   After the instance refresh succeeds, the Auto Scaling group settings are automatically updated with the configuration that you specified at the start of the operation.

## User-configurable Instance Refresh Variables

The Terraform [instance_refresh](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/autoscaling_group#instance_refresh) resource provides the following variables that can be adjusted depending on usage requirements:

### checkpoint_delay

*   Description: The number of seconds to wait after a checkpoint. This delay will be used for each 'checkpoint_percentages' configured and is meant to provide a means of validating your deployment and providing enough time to cancel the instance refresh (from the AWS console) if problems are detected.
*   Default Value: 3600

### checkpoint_percentages

*   Description: List of percentages for each checkpoint. Values must be unique and in ascending order. The final number must be 100.
    *   If you had 8 instances to be replaced and configured checkpoint_percentages of `[25, 50, 100]`, then instance refresh would replace 2 instances (25% of 8) and then wait for the number of seconds specified by `checkpoint_delay` before continuing. Once the `checkpoint_delay` was complete, instance refresh would replace 2 more instances for a total of 4 (50% of 8) and then wait again for the number of seconds specified by `checkpoint_delay`. Finally, the remaining instances would be replaced to bring the total replaced percentage from 50% to 100%.
*   Default Value: \[100]
*   Example checkpoints at 25%, 50%, and 100% completion: \[25, 50, 100]

### instance_warmup

*   Description: The number of seconds until a newly launched instance is configured and ready to use.
*   Default Value: 30

### min_healthy_percentage

*   Description: The amount of capacity in the Auto Scaling group that must remain healthy during an instance refresh to allow the operation to continue, as a percentage of the desired capacity
*   Default Value: 90

### triggers

*   Description: Set of additional property names that will trigger an Instance Refresh. A refresh will always be triggered by a change in any of launch_configuration, launch_template, or mixed_instances_policy.
*   Default Value: \["tag"]

## Important Notes

*   Auto Scaling Groups support up to one active instance refresh at a time. When this resource is updated, any existing refresh is cancelled.
*   Depending on health check settings and group size, an instance refresh may take a long time or fail. The Terraform `instance_refresh` resource does not wait for the instance refresh to complete.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ASG-INSTANCE-REFRESH MODULE
# ------------------------------------------------------------------------------------------------------

module "asg_instance_refresh" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-asg.git//modules/asg-instance-refresh?ref=v0.21.17"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the ASG.
  asg_name = <string>

  # The desired number of EC2 Instances to run in the ASG initially. Note that
  # auto scaling policies may change this value. If you're using auto scaling
  # policies to dynamically resize the cluster, you should actually leave this
  # value as null.
  desired_capacity = <number>

  # The maximum number of EC2 Instances to run in the ASG
  max_size = <number>

  # The minimum number of EC2 Instances to run in the ASG
  min_size = <number>

  # A list of subnet ids in the VPC were the EC2 Instances should be deployed
  vpc_subnet_ids = <list(string)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The number of seconds to wait after a checkpoint.
  checkpoint_delay = null

  # List of percentages for each checkpoint. Values must be unique and in
  # ascending order. To replace all instances, the final number must be 100.
  checkpoint_percentages = null

  # A list of custom tags to apply to the EC2 Instances in this ASG. Each item
  # in this list should be a map with the parameters key, value, and
  # propagate_at_launch.
  custom_tags = []

  # Timeout value for deletion operations on autoscale groups.
  deletion_timeout = "10m"

  # A list of metrics the ASG should enable for monitoring all instances in a
  # group. The allowed values are GroupMinSize, GroupMaxSize,
  # GroupDesiredCapacity, GroupInServiceInstances, GroupPendingInstances,
  # GroupStandbyInstances, GroupTerminatingInstances, GroupTotalInstances.
  enabled_metrics = []

  # Time, in seconds, after an EC2 Instance comes into service before checking
  # health.
  health_check_grace_period = 300

  # The number of seconds until a newly launched instance is configured and
  # ready to use.
  instance_warmup = null

  # This is DEPRECATED and will be removed on Dec 31st 2023. Please switch to
  # using Launch Template below. The name of the Launch Configuration to use for
  # each EC2 Instance in this ASG. This value MUST be an output of the Launch
  # Configuration resource itself. This ensures a new ASG is created every time
  # the Launch Configuration changes, rolling out your changes automatically.
  # One of var.launch_configuration_name or var.launch_template must be set.
  launch_configuration_name = null

  # The ID and version of the Launch Template to use for each EC2 instance in
  # this ASG. The version value MUST be an output of the Launch Template
  # resource itself. This ensures that a new ASG is created every time a new
  # Launch Template version is created. One of var.launch_configuration_name or
  # var.launch_template must be set.
  launch_template = null

  # A list of Elastic Load Balancer (ELB) names to associate with this ASG. If
  # you're using the Application Load Balancer (ALB), see var.target_group_arns.
  load_balancers = []

  # Wait for this number of EC2 Instances to show up healthy in the load
  # balancer on creation.
  min_elb_capacity = 0

  # The amount of capacity in the Auto Scaling group that must remain healthy
  # during an instance refresh to allow the operation to continue, as a
  # percentage of the desired capacity
  min_healthy_percentage = null

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
  # OldestLaunchConfiguration, ClosestToNextInstanceHour, Default.
  termination_policies = []

  # Set of additional property names that will trigger an Instance Refresh. A
  # refresh will always be triggered by a change in any of launch_configuration,
  # launch_template, or mixed_instances_policy.
  triggers = null

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
# DEPLOY GRUNTWORK'S ASG-INSTANCE-REFRESH MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-asg.git//modules/asg-instance-refresh?ref=v0.21.17"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the ASG.
  asg_name = <string>

  # The desired number of EC2 Instances to run in the ASG initially. Note that
  # auto scaling policies may change this value. If you're using auto scaling
  # policies to dynamically resize the cluster, you should actually leave this
  # value as null.
  desired_capacity = <number>

  # The maximum number of EC2 Instances to run in the ASG
  max_size = <number>

  # The minimum number of EC2 Instances to run in the ASG
  min_size = <number>

  # A list of subnet ids in the VPC were the EC2 Instances should be deployed
  vpc_subnet_ids = <list(string)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The number of seconds to wait after a checkpoint.
  checkpoint_delay = null

  # List of percentages for each checkpoint. Values must be unique and in
  # ascending order. To replace all instances, the final number must be 100.
  checkpoint_percentages = null

  # A list of custom tags to apply to the EC2 Instances in this ASG. Each item
  # in this list should be a map with the parameters key, value, and
  # propagate_at_launch.
  custom_tags = []

  # Timeout value for deletion operations on autoscale groups.
  deletion_timeout = "10m"

  # A list of metrics the ASG should enable for monitoring all instances in a
  # group. The allowed values are GroupMinSize, GroupMaxSize,
  # GroupDesiredCapacity, GroupInServiceInstances, GroupPendingInstances,
  # GroupStandbyInstances, GroupTerminatingInstances, GroupTotalInstances.
  enabled_metrics = []

  # Time, in seconds, after an EC2 Instance comes into service before checking
  # health.
  health_check_grace_period = 300

  # The number of seconds until a newly launched instance is configured and
  # ready to use.
  instance_warmup = null

  # This is DEPRECATED and will be removed on Dec 31st 2023. Please switch to
  # using Launch Template below. The name of the Launch Configuration to use for
  # each EC2 Instance in this ASG. This value MUST be an output of the Launch
  # Configuration resource itself. This ensures a new ASG is created every time
  # the Launch Configuration changes, rolling out your changes automatically.
  # One of var.launch_configuration_name or var.launch_template must be set.
  launch_configuration_name = null

  # The ID and version of the Launch Template to use for each EC2 instance in
  # this ASG. The version value MUST be an output of the Launch Template
  # resource itself. This ensures that a new ASG is created every time a new
  # Launch Template version is created. One of var.launch_configuration_name or
  # var.launch_template must be set.
  launch_template = null

  # A list of Elastic Load Balancer (ELB) names to associate with this ASG. If
  # you're using the Application Load Balancer (ALB), see var.target_group_arns.
  load_balancers = []

  # Wait for this number of EC2 Instances to show up healthy in the load
  # balancer on creation.
  min_elb_capacity = 0

  # The amount of capacity in the Auto Scaling group that must remain healthy
  # during an instance refresh to allow the operation to continue, as a
  # percentage of the desired capacity
  min_healthy_percentage = null

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
  # OldestLaunchConfiguration, ClosestToNextInstanceHour, Default.
  termination_policies = []

  # Set of additional property names that will trigger an Instance Refresh. A
  # refresh will always be triggered by a change in any of launch_configuration,
  # launch_template, or mixed_instances_policy.
  triggers = null

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

<HclListItem name="asg_name" requirement="required" type="string">
<HclListItemDescription>

The name of the ASG.

</HclListItemDescription>
</HclListItem>

<HclListItem name="desired_capacity" requirement="required" type="number">
<HclListItemDescription>

The desired number of EC2 Instances to run in the ASG initially. Note that auto scaling policies may change this value. If you're using auto scaling policies to dynamically resize the cluster, you should actually leave this value as null.

</HclListItemDescription>
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

<HclListItem name="checkpoint_delay" requirement="optional" type="number">
<HclListItemDescription>

The number of seconds to wait after a checkpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="checkpoint_percentages" requirement="optional" type="list(any)">
<HclListItemDescription>

List of percentages for each checkpoint. Values must be unique and in ascending order. To replace all instances, the final number must be 100.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
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

<HclListItem name="instance_warmup" requirement="optional" type="number">
<HclListItemDescription>

The number of seconds until a newly launched instance is configured and ready to use.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="launch_configuration_name" requirement="optional" type="string">
<HclListItemDescription>

This is DEPRECATED and will be removed on Dec 31st 2023. Please switch to using Launch Template below. The name of the Launch Configuration to use for each EC2 Instance in this ASG. This value MUST be an output of the Launch Configuration resource itself. This ensures a new ASG is created every time the Launch Configuration changes, rolling out your changes automatically. One of <a href="#launch_configuration_name"><code>launch_configuration_name</code></a> or <a href="#launch_template"><code>launch_template</code></a> must be set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="launch_template" requirement="optional" type="object(…)">
<HclListItemDescription>

The ID and version of the Launch Template to use for each EC2 instance in this ASG. The version value MUST be an output of the Launch Template resource itself. This ensures that a new ASG is created every time a new Launch Template version is created. One of <a href="#launch_configuration_name"><code>launch_configuration_name</code></a> or <a href="#launch_template"><code>launch_template</code></a> must be set.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    id      = string
    version = string
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="load_balancers" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of Elastic Load Balancer (ELB) names to associate with this ASG. If you're using the Application Load Balancer (ALB), see <a href="#target_group_arns"><code>target_group_arns</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="min_elb_capacity" requirement="optional" type="number">
<HclListItemDescription>

Wait for this number of EC2 Instances to show up healthy in the load balancer on creation.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="min_healthy_percentage" requirement="optional" type="number">
<HclListItemDescription>

The amount of capacity in the Auto Scaling group that must remain healthy during an instance refresh to allow the operation to continue, as a percentage of the desired capacity

</HclListItemDescription>
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

A list of policies to decide how the instances in the auto scale group should be terminated. The allowed values are OldestInstance, NewestInstance, OldestLaunchConfiguration, ClosestToNextInstanceHour, Default.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="triggers" requirement="optional" type="list(string)">
<HclListItemDescription>

Set of additional property names that will trigger an Instance Refresh. A refresh will always be triggered by a change in any of launch_configuration, launch_template, or mixed_instances_policy.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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
    "https://github.com/gruntwork-io/terraform-aws-asg/tree/v0.21.17/modules/asg-instance-refresh/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-asg/tree/v0.21.17/modules/asg-instance-refresh/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-asg/tree/v0.21.17/modules/asg-instance-refresh/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "5d1422d1c632c9081b20d8d2f0767862"
}
##DOCS-SOURCER-END -->
