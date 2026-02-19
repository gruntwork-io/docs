---
title: "ECS Cluster Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon ECS" version="1.3.0" lastModifiedVersion="1.3.0"/>

# ECS Cluster Module

<a href="https://github.com/gruntwork-io/terraform-aws-ecs/tree/v1.3.0/modules/ecs-cluster" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v1.3.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module launches an [EC2 Container Service
Cluster](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_clusters.html) that you can use to run
Docker containers and services (see the [ecs-service module](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v1.3.0/modules/ecs-service/README.adoc)).

**WARNING: Launch Configurations:** [Launch configurations](https://docs.aws.amazon.com/autoscaling/ec2/userguide/launch-configurations.html) are being phased out in favor of [Launch Templates](https://docs.aws.amazon.com/autoscaling/ec2/userguide/launch-templates.html). Before upgrading to the latest release please be sure to test and plan any changes to infrastructure that may be impacted. Launch templates are being introduced in [PR #371](https://github.com/gruntwork-io/terraform-aws-ecs/pull/371)

## What is an ECS Cluster?

To use ECS with the EC2 launch type, you first deploy one or more EC2 Instances into a "cluster". The ECS scheduler can
then deploy Docker containers across any of the instances in this cluster. Each instance needs to have the [Amazon ECS
Agent](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_agent.html) installed so it can communicate with
ECS and register itself as part of the right cluster.

## How do you run Docker containers on the cluster?

See the [service module](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v1.3.0/modules/ecs-service/README.adoc).

## How do you add additional security group rules?

To add additional security group rules to the EC2 Instances in the ECS cluster, you can use the
[aws_security_group_rule](https://www.terraform.io/docs/providers/aws/r/security_group_rule.html) resource, and set its
`security_group_id` argument to the Terraform output of this module called `ecs_instance_security_group_id`. For
example, here is how you can allow the EC2 Instances in this cluster to allow incoming HTTP requests on port 8080:

```hcl
module "ecs_cluster" {
  # (arguments omitted)
}

resource "aws_security_group_rule" "allow_inbound_http_from_anywhere" {
  type = "ingress"
  from_port = 8080
  to_port = 8080
  protocol = "tcp"
  cidr_blocks = ["0.0.0.0/0"]

  security_group_id = "${module.ecs_cluster.ecs_instance_security_group_id}"
}
```

**Note**: The security group rules you add will apply to ALL Docker containers running on these EC2 Instances. There is
currently no way in ECS to manage security group rules on a per-Docker-container basis.

## How do you add additional IAM policies?

To add additional IAM policies to the EC2 Instances in the ECS cluster, you can use the
[aws_iam_role_policy](https://www.terraform.io/docs/providers/aws/r/iam_role_policy.html) or
[aws_iam_policy_attachment](https://www.terraform.io/docs/providers/aws/r/iam_policy_attachment.html) resources, and
set the IAM role id to the Terraform output of this module called `ecs_instance_iam_role_name` . For example, here is how
you can allow the EC2 Instances in this cluster to access an S3 bucket:

```hcl
module "ecs_cluster" {
  # (arguments omitted)
}

resource "aws_iam_role_policy" "access_s3_bucket" {
    name = "access_s3_bucket"
    role = "${module.ecs_cluster.ecs_instance_iam_role_name}"
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

**Note**: The IAM policies you add will apply to ALL Docker containers running on these EC2 Instances. There is
currently no way in ECS to manage IAM policies on a per-Docker-container basis.

## How do you make changes to the EC2 Instances in the cluster?

To deploy an update to an ECS Service, see the [ecs-service module](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v1.3.0/modules/ecs-service). To deploy an update to the
EC2 Instances in your ECS cluster, such as a new AMI, read on.

Terraform and AWS do not provide a way to automatically roll out a change to the Instances in an ECS Cluster. Due to
Terraform limitations (see [here for a discussion](https://github.com/gruntwork-io/terraform-aws-ecs/pull/29)), there is
currently no way to implement this purely in Terraform code. Therefore, we've created scripts called
`roll-out-ecs-cluster-update.py` and `asg-instance-refresh.py` that can do a zero-downtime roll out for you.

Since introducing the `roll-out-ecs-cluster-update.py`, AWS has released further capabilities, such
as [ECS managed instance draining](https://aws.amazon.com/about-aws/whats-new/2024/01/amazon-ecs-managed-instance-draining/)
and [instance refresh](https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-overview.html), so we
added another script `asg-instance-refresh`, that initiates and monitoris instance refresh using the AWS APIs.

### How to use the roll-out-ecs-cluster-update.py script

First, make sure you have the latest version of the [AWS Python SDK (boto3)](https://github.com/boto/boto3) installed
(e.g. `pip3 install boto3`).

To deploy a change such as rolling out a new AMI to all ECS Instances:

1.  Make sure the `cluster_max_size` is at least twice the size of `cluster_min_size`. The extra capacity will be used
    to deploy the updated instances.
2.  Update the Terraform code with your changes (e.g. update the `cluster_instance_ami` variable to a new AMI).
3.  Run `terraform apply`.
4.  Run the script:

    ```
    python3 roll-out-ecs-cluster-update.py --asg-name ASG_NAME --cluster-name CLUSTER_NAME --aws-region AWS_REGION
    ```

    If you have your output variables configured as shown in [outputs.tf](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v1.3.0/examples/docker-service-with-elb/outputs.tf)
    of the [docker-service-with-elb example](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v1.3.0/examples/docker-service-with-elb), you can use the `terraform output`
    command to fill in most of the arguments automatically:

    ```
    python3 roll-out-ecs-cluster-update.py \
      --asg-name $(terragrunt output -no-color asg_name) \
      --cluster-name $(terragrunt output -no-color ecs_cluster_name) \
      --aws-region $(terragrunt output -no-color aws_region)
    ```

**Note**: during upgrade, if `desired_capacity * 2 > max_size` then ASG max size will be updated to `desired_capacity * 2` for the period of upgrade, to disable this behaviour - pass `--keep-max-size` argument.

To avoid the need to install python dependencies on your local machine, you may choose to use Docker.

1.  Navigate to the directory that you have downloaded `roll-out-ecs-cluster-update.py`:
2.  If you use [aws-vault](https://github.com/99designs/aws-vault), you can run the following to make your aws
    credentials available to the container. If you do not use `aws-vault`, you will have to manually use the `--env`
    option of `docker run`

    ```
    docker run \
        -it --rm -v "$PWD":/usr/src -w /usr/src \
        --env-file <(aws-vault exec --assume-role-ttl=1h PROFILE -- env | grep AWS) \
        python:3.10-alpine \
        sh -c "pip3 install boto3 && python3 roll-out-ecs-cluster-update.py \
        --asg-name ASG_NAME \
        --cluster-name CLUSTER_NAME \
        --aws-region AWS_REGION"
    ```

### How roll-out-ecs-cluster-update.py works

The `roll-out-ecs-cluster-update.py` script does the following:

1.  Double the desired capacity of the Auto Scaling Group that powers the ECS Cluster. This causes EC2 Instances to
    deploy with the new launch template.
2.  Put all the old ECS Instances in DRAINING state so all ECS Tasks are migrated to the new Instances.
3.  Wait for all ECS Tasks to migrate to the new Instances.
4.  Detach the now drained instances from the Auto Scaling Group, decrementing the desired capacity back to the original value.

### How to use the asg-instance-refresh.py script

First, make sure you have the latest version of the [AWS Python SDK (boto3)](https://github.com/boto/boto3) installed
(e.g. `pip3 install boto3`).

To deploy a change such as rolling out a new AMI to all ECS Instances:

1.  Run the script:

    ```
    python3 asg-instance-refresh.py --asg-name ASG_NAME --aws-region AWS_REGION
    ```

    If you have your output variables configured as shown in [outputs.tf](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v1.3.0/examples/docker-service-with-elb/outputs.tf)
    of the [docker-service-with-elb example](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v1.3.0/examples/docker-service-with-elb), you can use the `terraform output`
    command to fill in most of the arguments automatically:

    ```
    python3 asg-instance-refresh.py \
      --asg-name $(terragrunt output -no-color asg_name) \
      --aws-region $(terragrunt output -no-color aws_region)
    ```

## How do you configure cluster autoscaling?

ECS Clusters support two tiers of autoscaling:

*   Autoscaling of ECS Service and Tasks, where ECS will horizontally or vertically scale your ECS Tasks by provisioning
    more replicas of the Task or replacing them with Tasks that have more resources allocated to it.
*   Autoscaling of the ECS Cluster, where the AWS Autoscaling Group will horizontally scale the worker nodes by
    provisioning more.

The `ecs-cluster` module supports configuring ECS Cluster Autoscaling by leveraging [ECS Capacity
Providers](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cluster-capacity-providers.html). You can read
more about how cluster autoscaling works with capacity providers in the [official
documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cluster-auto-scaling.html).

To enable capacity providers for cluster autoscaling on your ECS cluster, you will want to configure the following
variables:

```hcl
# Turn on capacity providers for autoscaling
capacity_provider_enabled = true

# Enable Multi AZ capacity providers to balance autoscaling load across AZs. This should be true in production. Can be
# false in dev and stage.
multi_az_capacity_provider = true

# Configure target utilization for the ECS cluster. This number influences when scale out happens, and when instances
# should be scaled in. For example, a setting of 90 means that new instances will be provisioned when all instances are
# at 90% utilization, while instances that are only 10% utilized (CPU and Memory usage from tasks = 10%) will be scaled
# in. A recommended default to start with is 90.
capacity_provider_target = 90

# The following are optional configurations, and configures how many instances should be scaled out or scaled in at one
# time. Defaults to 1.
# capacity_provider_max_scale_step = 1
# capacity_provider_min_scale_step = 1
```

### Note on toggling capacity providers on existing ECS Clusters

Each EC2 instance must be registered with Capacity Providers to be considered in the pool. This means that when you
enable Capacity Providers on an existing ECS cluster that did not have Capacity Providers, you must rotate the EC2
instances to ensure all the instances get associated with the new Capacity Provider.

To rotate the instances, you can run the
[roll-out-ecs-cluster-update.py](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v1.3.0/modules/ecs-cluster/roll-out-ecs-cluster-update.py)
script in the `terraform-aws-ecs` module. Refer to the
[documentation](#how-do-you-make-changes-to-the-ec2-instances-in-the-cluster)
for more information on the script.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ECS-CLUSTER MODULE
# ------------------------------------------------------------------------------------------------------

module "ecs_cluster" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-ecs.git//modules/ecs-cluster?ref=v1.3.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AMI to run on each of the ECS Cluster's EC2 Instances.
  cluster_instance_ami = <string>

  # The EC2 Keypair name used to SSH into the ECS Cluster's EC2 Instances.
  cluster_instance_keypair_name = <string>

  # The type of EC2 instance to run for each of the ECS Cluster's EC2 Instances
  # (e.g. t2.medium).
  cluster_instance_type = <string>

  # The maximum number of EC2 Instances that must be running for this ECS
  # Cluster. We recommend making this twice var.cluster_min_size, even if you
  # don't plan on scaling the cluster up and down, as the extra capacity will be
  # used to deploy udpates to the cluster.
  cluster_max_size = <number>

  # The minimum number of EC2 Instances launchable for this ECS Cluster. Useful
  # for auto-scaling limits.
  cluster_min_size = <number>

  # The name of the ECS cluster (e.g. ecs-prod). This is used to namespace all
  # the resources created by these templates.
  cluster_name = <string>

  # The ID of the VPC in which the ECS Cluster's EC2 Instances will reside.
  vpc_id = <string>

  # A list of the subnets into which the ECS Cluster's EC2 Instances will be
  # launched. These should usually be all private subnets and include one in
  # each AWS Availability Zone.
  vpc_subnet_ids = <list(string)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of Security Group IDs of the ALBs which will send traffic to this ECS
  # Cluster.
  alb_security_group_ids = []

  # The IP address ranges in CIDR format from which to allow incoming SSH
  # requests to the ECS instances.
  allow_ssh_from_cidr_blocks = []

  # The IDs of security groups from which to allow incoming SSH requests to the
  # ECS instances.
  allow_ssh_from_security_group_ids = []

  # Enables or disables a graceful shutdown of instances without disturbing
  # workloads.
  autoscaling_managed_draining = true

  # Protect EC2 instances running ECS tasks from being terminated due to scale
  # in (spot instances do not support lifecycle modifications)
  autoscaling_termination_protection = false

  # Enable a capacity provider to autoscale the EC2 ASG created for this ECS
  # cluster
  capacity_provider_enabled = false

  # Maximum step adjustment size to the ASG's desired instance count
  capacity_provider_max_scale_step = 10

  # Minimum step adjustment size to the ASG's desired instance count
  capacity_provider_min_scale_step = 1

  # Target cluster utilization for the capacity provider; a number from 1 to
  # 100.
  capacity_provider_target = 75

  # Indicates whether capacity rebalance is enabled on the Auto Scaling Group.
  # When enabled, Amazon EC2 Auto Scaling attempts to launch a Spot Instance
  # whenever Amazon EC2 notifies that a Spot Instance is at an elevated risk of
  # interruption.
  capacity_rebalance = false

  # A list of metrics to collect. The allowed values are GroupDesiredCapacity,
  # GroupInServiceCapacity, GroupPendingCapacity, GroupMinSize, GroupMaxSize,
  # GroupInServiceInstances, GroupPendingInstances, GroupStandbyInstances,
  # GroupStandbyCapacity, GroupTerminatingCapacity, GroupTerminatingInstances,
  # GroupTotalCapacity, GroupTotalInstances.
  cluster_asg_metrics_enabled = []

  # Amount of time, in seconds, until a newly launched instance can contribute
  # to the Amazon CloudWatch metrics. This delay lets an instance finish
  # initializing before Amazon EC2 Auto Scaling aggregates instance metrics,
  # resulting in more reliable usage data. Set this value equal to the amount of
  # time that it takes for resource consumption to become stable after an
  # instance reaches the InService state.
  cluster_default_instance_warmup = null

  # Enables/disables detailed CloudWatch monitoring for EC2 instances
  cluster_detailed_monitoring = true

  # Passthrough to aws_launch_template resource.  Associate a public ip address
  # with EC2 instances in cluster
  cluster_instance_associate_public_ip_address = false

  # The name of the device to mount.
  cluster_instance_block_device_name = "/dev/xvdcz"

  # Whether the volume should be destroyed on instance termination. Defaults to
  # false
  cluster_instance_ebs_delete_on_termination = false

  # The amount of provisioned IOPS. This must be set with a volume_type of
  # io1/io2.
  cluster_instance_ebs_iops = null

  # The ARN of the AWS Key Management Service (AWS KMS) customer master key
  # (CMK) to use when creating the encrypted volume. The variable
  # cluster_instance_root_volume_encrypted must be set to true when this is set.
  cluster_instance_ebs_kms_key_id = null

  # If true, the launched EC2 instance will be EBS-optimized
  cluster_instance_ebs_optimized = false

  # The Snapshot ID to mount.
  cluster_instance_ebs_snapshot_id = null

  # The throughput to provision for a gp3 volume in MiB/s (specified as an
  # integer, e.g., 500), with a maximum of 1,000 MiB/s.
  cluster_instance_ebs_throughput = null

  # The required duration in minutes. This value must be a multiple of 60.
  cluster_instance_market_block_duration_minutes = null

  # The behavior when a Spot Instance is interrupted. Can be hibernate, stop, or
  # terminate. (Default: terminate).
  cluster_instance_market_instance_interruption_behavior = "terminate"

  # The Spot Instance request type. Can be one-time, or persistent.
  cluster_instance_market_spot_instance_type = null

  # The end date of the request.
  cluster_instance_market_valid_until = null

  # The strategy for allocating on-demand capacity. Valid value: prioritized.
  # Only used when cluster_instance_type_overrides is set.
  cluster_instance_on_demand_allocation_strategy = null

  # The minimum number of on-demand instances that must be provisioned in the
  # Auto Scaling Group. The remaining instances will be a mix of on-demand and
  # spot, governed by cluster_instance_on_demand_percentage_above_base_capacity.
  # Only used when cluster_instance_type_overrides is set.
  cluster_instance_on_demand_base_capacity = null

  # The percentage of on-demand instances above the base capacity. Set to 0 to
  # use only spot instances above the base capacity, or 100 to use only
  # on-demand. Only used when cluster_instance_type_overrides is set.
  cluster_instance_on_demand_percentage_above_base_capacity = null

  # The affinity setting for an instance on a Dedicated Host.
  cluster_instance_placement_affinity = null

  # The name of the placement group for the instance.
  cluster_instance_placement_group_name = null

  # The ID of the Dedicated Host for the instance.
  cluster_instance_placement_host_id = null

  # The ARN of the Host Resource Group in which to launch instances.
  cluster_instance_placement_host_resource_group_arn = null

  # The number of the partition the instance should launch in. Valid only if the
  # placement group strategy is set to partition.
  cluster_instance_placement_partition_number = null

  # Set to true to request spot instances. Set cluster_instance_spot_price
  # variable to set a maximum spot price limit.
  cluster_instance_request_spot_instances = false

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role for the cluster instances.
  cluster_instance_role_permissions_boundary_arn = null

  # Set to true to encrypt the root block devices for the ECS cluster's EC2
  # instances
  cluster_instance_root_volume_encrypted = false

  # The size in GB of the root volume for each of the ECS Cluster's EC2
  # Instances
  cluster_instance_root_volume_size = 40

  # The volume type for the root volume for each of the ECS Cluster's EC2
  # Instances. Can be standard, gp2, or io1
  cluster_instance_root_volume_type = "gp2"

  # The strategy for allocating spot capacity. Valid values: lowest-price,
  # capacity-optimized, capacity-optimized-prioritized,
  # price-capacity-optimized. Only used when cluster_instance_type_overrides is
  # set.
  cluster_instance_spot_allocation_strategy = null

  # The number of Spot Instance pools across which to allocate your Spot
  # Instances. Only relevant when cluster_instance_spot_allocation_strategy is
  # lowest-price. Only used when cluster_instance_type_overrides is set.
  cluster_instance_spot_instance_pools = null

  # The maximum price per unit hour that you are willing to pay for a Spot
  # Instance. Only used when cluster_instance_type_overrides is set.
  cluster_instance_spot_max_price = null

  # Value is the maximum bid price for the instance on the EC2 Spot Market.
  cluster_instance_spot_price = null

  # The list of EC2-instance-type overrides allowed for each of the ECS
  # Cluster's EC2 Instances
  cluster_instance_type_overrides = null

  # The User Data script to run on each of the ECS Cluster's EC2 Instances on
  # their first boot.
  cluster_instance_user_data = null

  # The base64-encoded User Data script to run on the server when it is booting.
  # This can be used to pass binary User Data, such as a gzipped cloud-init
  # script. If you wish to pass in plain text (e.g., typical Bash script) for
  # User Data, use var.cluster_instance_user_data instead.
  cluster_instance_user_data_base64 = null

  # If you set this variable to false, this module will not create any
  # resources. This is used as a workaround because Terraform does not allow you
  # to use the 'count' parameter on modules. By using this parameter, you can
  # optionally create or not create the resources within this module.
  create_resources = true

  # When set, name the IAM role for the ECS cluster using this variable. When
  # null, the IAM role name will be derived from var.cluster_name.
  custom_iam_role_name = null

  # A list of custom tags to apply to the EC2 Instances in this ASG. Each item
  # in this list should be a map with the parameters key, value, and
  # propagate_at_launch.
  custom_tags_ec2_instances = []

  # Custom tags to apply to the ECS cluster
  custom_tags_ecs_cluster = {}

  # A map of custom tags to apply to the Security Group for this ECS Cluster.
  # The key is the tag name and the value is the tag value.
  custom_tags_security_group = {}

  # List of CIDR blocks that will be allowed for egress access.
  egress_allow_outbound_all = ["0.0.0.0/0"]

  # The from port range (paired with egress_to_port) to be used for for egress
  # access.
  egress_from_port = 0

  # The protocol to be used for for egress access.
  egress_protocol = "-1"

  # The end port range (paired with egress_from_port) to be used for for egress
  # access.
  egress_to_port = 0

  # Enables additional block device mapping. Change to false if you wish to
  # disable additional EBS volume attachment to EC2 instances. Defaults to true.
  enable_block_device_mappings = true

  # Whether or not to enable Container Insights on the ECS cluster. Refer to
  # https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cloudwatch-container-insights.html
  # for more information on ECS Container Insights.
  enable_cluster_container_insights = false

  # Set this variable to true to enable the Instance Metadata Service (IMDS)
  # endpoint, which is used to fetch information such as user-data scripts,
  # instance IP address and region, etc. Set this variable to false if you do
  # not want the IMDS endpoint enabled for instances launched into the Auto
  # Scaling Group for the workers.
  enable_imds = true

  # The desired HTTP PUT response hop limit for instance metadata requests.
  http_put_response_hop_limit = null

  # Override default parameters for Instance Refresh. See
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/autoscaling_group#preferences
  # for available options
  instance_refresh_preferences = {}

  # Strategy to use for instance refresh. If not specified then instance_refresh
  # is disabled
  instance_refresh_strategy = null

  # Whether to update Default Version for the Launch Template with each update.
  launch_template_update_default_version = true

  # Maximum amount of time, in seconds, that an instance can be in service,
  # values must be either equal to 0 or between 86400 and 31536000 seconds.
  max_instance_lifetime = null

  # Enable a multi-az capacity provider to autoscale the EC2 ASGs created for
  # this ECS cluster, only if capacity_provider_enabled = true
  multi_az_capacity_provider = false

  # The port to use for SSH access.
  ssh_port = 22

  # The tenancy of the servers in this cluster. Must be one of: default,
  # dedicated, or host.
  tenancy = "default"

  # A list of policies to decide how the instances in the auto scale group
  # should be terminated. The allowed values are OldestInstance, NewestInstance,
  # OldestLaunchConfiguration, ClosestToNextInstanceHour, OldestLaunchTemplate,
  # AllocationStrategy, Default. If you specify more than one policy, the ASG
  # will try each one in turn, use it to select the instance(s) to terminate,
  # and if more than one instance matches the criteria, then use the next policy
  # to try to break the tie. E.g., If you use ['OldestInstance',
  # 'ClosestToNextInstanceHour'] and and there were two instances with exactly
  # the same launch time, then the ASG would try the next policy, which is to
  # terminate the one closest to the next instance hour in billing.
  termination_policies = ["OldestInstance"]

  # Set this variable to true to enable the use of Instance Metadata Service
  # Version 1 in this module's aws_launch_template. Note that while IMDsv2 is
  # preferred due to its special security hardening, we allow this in order to
  # support the use case of AMIs built outside of these modules that depend on
  # IMDSv1.
  use_imdsv1 = true

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ECS-CLUSTER MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-ecs.git//modules/ecs-cluster?ref=v1.3.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AMI to run on each of the ECS Cluster's EC2 Instances.
  cluster_instance_ami = <string>

  # The EC2 Keypair name used to SSH into the ECS Cluster's EC2 Instances.
  cluster_instance_keypair_name = <string>

  # The type of EC2 instance to run for each of the ECS Cluster's EC2 Instances
  # (e.g. t2.medium).
  cluster_instance_type = <string>

  # The maximum number of EC2 Instances that must be running for this ECS
  # Cluster. We recommend making this twice var.cluster_min_size, even if you
  # don't plan on scaling the cluster up and down, as the extra capacity will be
  # used to deploy udpates to the cluster.
  cluster_max_size = <number>

  # The minimum number of EC2 Instances launchable for this ECS Cluster. Useful
  # for auto-scaling limits.
  cluster_min_size = <number>

  # The name of the ECS cluster (e.g. ecs-prod). This is used to namespace all
  # the resources created by these templates.
  cluster_name = <string>

  # The ID of the VPC in which the ECS Cluster's EC2 Instances will reside.
  vpc_id = <string>

  # A list of the subnets into which the ECS Cluster's EC2 Instances will be
  # launched. These should usually be all private subnets and include one in
  # each AWS Availability Zone.
  vpc_subnet_ids = <list(string)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of Security Group IDs of the ALBs which will send traffic to this ECS
  # Cluster.
  alb_security_group_ids = []

  # The IP address ranges in CIDR format from which to allow incoming SSH
  # requests to the ECS instances.
  allow_ssh_from_cidr_blocks = []

  # The IDs of security groups from which to allow incoming SSH requests to the
  # ECS instances.
  allow_ssh_from_security_group_ids = []

  # Enables or disables a graceful shutdown of instances without disturbing
  # workloads.
  autoscaling_managed_draining = true

  # Protect EC2 instances running ECS tasks from being terminated due to scale
  # in (spot instances do not support lifecycle modifications)
  autoscaling_termination_protection = false

  # Enable a capacity provider to autoscale the EC2 ASG created for this ECS
  # cluster
  capacity_provider_enabled = false

  # Maximum step adjustment size to the ASG's desired instance count
  capacity_provider_max_scale_step = 10

  # Minimum step adjustment size to the ASG's desired instance count
  capacity_provider_min_scale_step = 1

  # Target cluster utilization for the capacity provider; a number from 1 to
  # 100.
  capacity_provider_target = 75

  # Indicates whether capacity rebalance is enabled on the Auto Scaling Group.
  # When enabled, Amazon EC2 Auto Scaling attempts to launch a Spot Instance
  # whenever Amazon EC2 notifies that a Spot Instance is at an elevated risk of
  # interruption.
  capacity_rebalance = false

  # A list of metrics to collect. The allowed values are GroupDesiredCapacity,
  # GroupInServiceCapacity, GroupPendingCapacity, GroupMinSize, GroupMaxSize,
  # GroupInServiceInstances, GroupPendingInstances, GroupStandbyInstances,
  # GroupStandbyCapacity, GroupTerminatingCapacity, GroupTerminatingInstances,
  # GroupTotalCapacity, GroupTotalInstances.
  cluster_asg_metrics_enabled = []

  # Amount of time, in seconds, until a newly launched instance can contribute
  # to the Amazon CloudWatch metrics. This delay lets an instance finish
  # initializing before Amazon EC2 Auto Scaling aggregates instance metrics,
  # resulting in more reliable usage data. Set this value equal to the amount of
  # time that it takes for resource consumption to become stable after an
  # instance reaches the InService state.
  cluster_default_instance_warmup = null

  # Enables/disables detailed CloudWatch monitoring for EC2 instances
  cluster_detailed_monitoring = true

  # Passthrough to aws_launch_template resource.  Associate a public ip address
  # with EC2 instances in cluster
  cluster_instance_associate_public_ip_address = false

  # The name of the device to mount.
  cluster_instance_block_device_name = "/dev/xvdcz"

  # Whether the volume should be destroyed on instance termination. Defaults to
  # false
  cluster_instance_ebs_delete_on_termination = false

  # The amount of provisioned IOPS. This must be set with a volume_type of
  # io1/io2.
  cluster_instance_ebs_iops = null

  # The ARN of the AWS Key Management Service (AWS KMS) customer master key
  # (CMK) to use when creating the encrypted volume. The variable
  # cluster_instance_root_volume_encrypted must be set to true when this is set.
  cluster_instance_ebs_kms_key_id = null

  # If true, the launched EC2 instance will be EBS-optimized
  cluster_instance_ebs_optimized = false

  # The Snapshot ID to mount.
  cluster_instance_ebs_snapshot_id = null

  # The throughput to provision for a gp3 volume in MiB/s (specified as an
  # integer, e.g., 500), with a maximum of 1,000 MiB/s.
  cluster_instance_ebs_throughput = null

  # The required duration in minutes. This value must be a multiple of 60.
  cluster_instance_market_block_duration_minutes = null

  # The behavior when a Spot Instance is interrupted. Can be hibernate, stop, or
  # terminate. (Default: terminate).
  cluster_instance_market_instance_interruption_behavior = "terminate"

  # The Spot Instance request type. Can be one-time, or persistent.
  cluster_instance_market_spot_instance_type = null

  # The end date of the request.
  cluster_instance_market_valid_until = null

  # The strategy for allocating on-demand capacity. Valid value: prioritized.
  # Only used when cluster_instance_type_overrides is set.
  cluster_instance_on_demand_allocation_strategy = null

  # The minimum number of on-demand instances that must be provisioned in the
  # Auto Scaling Group. The remaining instances will be a mix of on-demand and
  # spot, governed by cluster_instance_on_demand_percentage_above_base_capacity.
  # Only used when cluster_instance_type_overrides is set.
  cluster_instance_on_demand_base_capacity = null

  # The percentage of on-demand instances above the base capacity. Set to 0 to
  # use only spot instances above the base capacity, or 100 to use only
  # on-demand. Only used when cluster_instance_type_overrides is set.
  cluster_instance_on_demand_percentage_above_base_capacity = null

  # The affinity setting for an instance on a Dedicated Host.
  cluster_instance_placement_affinity = null

  # The name of the placement group for the instance.
  cluster_instance_placement_group_name = null

  # The ID of the Dedicated Host for the instance.
  cluster_instance_placement_host_id = null

  # The ARN of the Host Resource Group in which to launch instances.
  cluster_instance_placement_host_resource_group_arn = null

  # The number of the partition the instance should launch in. Valid only if the
  # placement group strategy is set to partition.
  cluster_instance_placement_partition_number = null

  # Set to true to request spot instances. Set cluster_instance_spot_price
  # variable to set a maximum spot price limit.
  cluster_instance_request_spot_instances = false

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role for the cluster instances.
  cluster_instance_role_permissions_boundary_arn = null

  # Set to true to encrypt the root block devices for the ECS cluster's EC2
  # instances
  cluster_instance_root_volume_encrypted = false

  # The size in GB of the root volume for each of the ECS Cluster's EC2
  # Instances
  cluster_instance_root_volume_size = 40

  # The volume type for the root volume for each of the ECS Cluster's EC2
  # Instances. Can be standard, gp2, or io1
  cluster_instance_root_volume_type = "gp2"

  # The strategy for allocating spot capacity. Valid values: lowest-price,
  # capacity-optimized, capacity-optimized-prioritized,
  # price-capacity-optimized. Only used when cluster_instance_type_overrides is
  # set.
  cluster_instance_spot_allocation_strategy = null

  # The number of Spot Instance pools across which to allocate your Spot
  # Instances. Only relevant when cluster_instance_spot_allocation_strategy is
  # lowest-price. Only used when cluster_instance_type_overrides is set.
  cluster_instance_spot_instance_pools = null

  # The maximum price per unit hour that you are willing to pay for a Spot
  # Instance. Only used when cluster_instance_type_overrides is set.
  cluster_instance_spot_max_price = null

  # Value is the maximum bid price for the instance on the EC2 Spot Market.
  cluster_instance_spot_price = null

  # The list of EC2-instance-type overrides allowed for each of the ECS
  # Cluster's EC2 Instances
  cluster_instance_type_overrides = null

  # The User Data script to run on each of the ECS Cluster's EC2 Instances on
  # their first boot.
  cluster_instance_user_data = null

  # The base64-encoded User Data script to run on the server when it is booting.
  # This can be used to pass binary User Data, such as a gzipped cloud-init
  # script. If you wish to pass in plain text (e.g., typical Bash script) for
  # User Data, use var.cluster_instance_user_data instead.
  cluster_instance_user_data_base64 = null

  # If you set this variable to false, this module will not create any
  # resources. This is used as a workaround because Terraform does not allow you
  # to use the 'count' parameter on modules. By using this parameter, you can
  # optionally create or not create the resources within this module.
  create_resources = true

  # When set, name the IAM role for the ECS cluster using this variable. When
  # null, the IAM role name will be derived from var.cluster_name.
  custom_iam_role_name = null

  # A list of custom tags to apply to the EC2 Instances in this ASG. Each item
  # in this list should be a map with the parameters key, value, and
  # propagate_at_launch.
  custom_tags_ec2_instances = []

  # Custom tags to apply to the ECS cluster
  custom_tags_ecs_cluster = {}

  # A map of custom tags to apply to the Security Group for this ECS Cluster.
  # The key is the tag name and the value is the tag value.
  custom_tags_security_group = {}

  # List of CIDR blocks that will be allowed for egress access.
  egress_allow_outbound_all = ["0.0.0.0/0"]

  # The from port range (paired with egress_to_port) to be used for for egress
  # access.
  egress_from_port = 0

  # The protocol to be used for for egress access.
  egress_protocol = "-1"

  # The end port range (paired with egress_from_port) to be used for for egress
  # access.
  egress_to_port = 0

  # Enables additional block device mapping. Change to false if you wish to
  # disable additional EBS volume attachment to EC2 instances. Defaults to true.
  enable_block_device_mappings = true

  # Whether or not to enable Container Insights on the ECS cluster. Refer to
  # https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cloudwatch-container-insights.html
  # for more information on ECS Container Insights.
  enable_cluster_container_insights = false

  # Set this variable to true to enable the Instance Metadata Service (IMDS)
  # endpoint, which is used to fetch information such as user-data scripts,
  # instance IP address and region, etc. Set this variable to false if you do
  # not want the IMDS endpoint enabled for instances launched into the Auto
  # Scaling Group for the workers.
  enable_imds = true

  # The desired HTTP PUT response hop limit for instance metadata requests.
  http_put_response_hop_limit = null

  # Override default parameters for Instance Refresh. See
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/autoscaling_group#preferences
  # for available options
  instance_refresh_preferences = {}

  # Strategy to use for instance refresh. If not specified then instance_refresh
  # is disabled
  instance_refresh_strategy = null

  # Whether to update Default Version for the Launch Template with each update.
  launch_template_update_default_version = true

  # Maximum amount of time, in seconds, that an instance can be in service,
  # values must be either equal to 0 or between 86400 and 31536000 seconds.
  max_instance_lifetime = null

  # Enable a multi-az capacity provider to autoscale the EC2 ASGs created for
  # this ECS cluster, only if capacity_provider_enabled = true
  multi_az_capacity_provider = false

  # The port to use for SSH access.
  ssh_port = 22

  # The tenancy of the servers in this cluster. Must be one of: default,
  # dedicated, or host.
  tenancy = "default"

  # A list of policies to decide how the instances in the auto scale group
  # should be terminated. The allowed values are OldestInstance, NewestInstance,
  # OldestLaunchConfiguration, ClosestToNextInstanceHour, OldestLaunchTemplate,
  # AllocationStrategy, Default. If you specify more than one policy, the ASG
  # will try each one in turn, use it to select the instance(s) to terminate,
  # and if more than one instance matches the criteria, then use the next policy
  # to try to break the tie. E.g., If you use ['OldestInstance',
  # 'ClosestToNextInstanceHour'] and and there were two instances with exactly
  # the same launch time, then the ASG would try the next policy, which is to
  # terminate the one closest to the next instance hour in billing.
  termination_policies = ["OldestInstance"]

  # Set this variable to true to enable the use of Instance Metadata Service
  # Version 1 in this module's aws_launch_template. Note that while IMDsv2 is
  # preferred due to its special security hardening, we allow this in order to
  # support the use case of AMIs built outside of these modules that depend on
  # IMDSv1.
  use_imdsv1 = true

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="cluster_instance_ami" requirement="required" type="string">
<HclListItemDescription>

The AMI to run on each of the ECS Cluster's EC2 Instances.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_instance_keypair_name" requirement="required" type="string">
<HclListItemDescription>

The EC2 Keypair name used to SSH into the ECS Cluster's EC2 Instances.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_instance_type" requirement="required" type="string">
<HclListItemDescription>

The type of EC2 instance to run for each of the ECS Cluster's EC2 Instances (e.g. t2.medium).

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_max_size" requirement="required" type="number">
<HclListItemDescription>

The maximum number of EC2 Instances that must be running for this ECS Cluster. We recommend making this twice <a href="#cluster_min_size"><code>cluster_min_size</code></a>, even if you don't plan on scaling the cluster up and down, as the extra capacity will be used to deploy udpates to the cluster.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_min_size" requirement="required" type="number">
<HclListItemDescription>

The minimum number of EC2 Instances launchable for this ECS Cluster. Useful for auto-scaling limits.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_name" requirement="required" type="string">
<HclListItemDescription>

The name of the ECS cluster (e.g. ecs-prod). This is used to namespace all the resources created by these templates.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the VPC in which the ECS Cluster's EC2 Instances will reside.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

A list of the subnets into which the ECS Cluster's EC2 Instances will be launched. These should usually be all private subnets and include one in each AWS Availability Zone.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="alb_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of Security Group IDs of the ALBs which will send traffic to this ECS Cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_ssh_from_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

The IP address ranges in CIDR format from which to allow incoming SSH requests to the ECS instances.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_ssh_from_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of security groups from which to allow incoming SSH requests to the ECS instances.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="autoscaling_managed_draining" requirement="optional" type="bool">
<HclListItemDescription>

Enables or disables a graceful shutdown of instances without disturbing workloads.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="autoscaling_termination_protection" requirement="optional" type="bool">
<HclListItemDescription>

Protect EC2 instances running ECS tasks from being terminated due to scale in (spot instances do not support lifecycle modifications)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="capacity_provider_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Enable a capacity provider to autoscale the EC2 ASG created for this ECS cluster

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="capacity_provider_max_scale_step" requirement="optional" type="number">
<HclListItemDescription>

Maximum step adjustment size to the ASG's desired instance count

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="10"/>
</HclListItem>

<HclListItem name="capacity_provider_min_scale_step" requirement="optional" type="number">
<HclListItemDescription>

Minimum step adjustment size to the ASG's desired instance count

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="capacity_provider_target" requirement="optional" type="number">
<HclListItemDescription>

Target cluster utilization for the capacity provider; a number from 1 to 100.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="75"/>
</HclListItem>

<HclListItem name="capacity_rebalance" requirement="optional" type="bool">
<HclListItemDescription>

Indicates whether capacity rebalance is enabled on the Auto Scaling Group. When enabled, Amazon EC2 Auto Scaling attempts to launch a Spot Instance whenever Amazon EC2 notifies that a Spot Instance is at an elevated risk of interruption.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="cluster_asg_metrics_enabled" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of metrics to collect. The allowed values are GroupDesiredCapacity, GroupInServiceCapacity, GroupPendingCapacity, GroupMinSize, GroupMaxSize, GroupInServiceInstances, GroupPendingInstances, GroupStandbyInstances, GroupStandbyCapacity, GroupTerminatingCapacity, GroupTerminatingInstances, GroupTotalCapacity, GroupTotalInstances.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cluster_default_instance_warmup" requirement="optional" type="number">
<HclListItemDescription>

Amount of time, in seconds, until a newly launched instance can contribute to the Amazon CloudWatch metrics. This delay lets an instance finish initializing before Amazon EC2 Auto Scaling aggregates instance metrics, resulting in more reliable usage data. Set this value equal to the amount of time that it takes for resource consumption to become stable after an instance reaches the InService state.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_detailed_monitoring" requirement="optional" type="bool">
<HclListItemDescription>

Enables/disables detailed CloudWatch monitoring for EC2 instances

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="cluster_instance_associate_public_ip_address" requirement="optional" type="bool">
<HclListItemDescription>

Passthrough to aws_launch_template resource.  Associate a public ip address with EC2 instances in cluster

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="cluster_instance_block_device_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the device to mount.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;/dev/xvdcz&quot;"/>
</HclListItem>

<HclListItem name="cluster_instance_ebs_delete_on_termination" requirement="optional" type="bool">
<HclListItemDescription>

Whether the volume should be destroyed on instance termination. Defaults to false

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="cluster_instance_ebs_iops" requirement="optional" type="string">
<HclListItemDescription>

The amount of provisioned IOPS. This must be set with a volume_type of io1/io2.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_instance_ebs_kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the AWS Key Management Service (AWS KMS) customer master key (CMK) to use when creating the encrypted volume. The variable cluster_instance_root_volume_encrypted must be set to true when this is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_instance_ebs_optimized" requirement="optional" type="bool">
<HclListItemDescription>

If true, the launched EC2 instance will be EBS-optimized

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="cluster_instance_ebs_snapshot_id" requirement="optional" type="string">
<HclListItemDescription>

The Snapshot ID to mount.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_instance_ebs_throughput" requirement="optional" type="number">
<HclListItemDescription>

The throughput to provision for a gp3 volume in MiB/s (specified as an integer, e.g., 500), with a maximum of 1,000 MiB/s.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_instance_market_block_duration_minutes" requirement="optional" type="number">
<HclListItemDescription>

The required duration in minutes. This value must be a multiple of 60.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_instance_market_instance_interruption_behavior" requirement="optional" type="string">
<HclListItemDescription>

The behavior when a Spot Instance is interrupted. Can be hibernate, stop, or terminate. (Default: terminate).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;terminate&quot;"/>
</HclListItem>

<HclListItem name="cluster_instance_market_spot_instance_type" requirement="optional" type="string">
<HclListItemDescription>

The Spot Instance request type. Can be one-time, or persistent.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_instance_market_valid_until" requirement="optional" type="string">
<HclListItemDescription>

The end date of the request.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_instance_on_demand_allocation_strategy" requirement="optional" type="string">
<HclListItemDescription>

The strategy for allocating on-demand capacity. Valid value: prioritized. Only used when cluster_instance_type_overrides is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_instance_on_demand_base_capacity" requirement="optional" type="number">
<HclListItemDescription>

The minimum number of on-demand instances that must be provisioned in the Auto Scaling Group. The remaining instances will be a mix of on-demand and spot, governed by cluster_instance_on_demand_percentage_above_base_capacity. Only used when cluster_instance_type_overrides is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_instance_on_demand_percentage_above_base_capacity" requirement="optional" type="number">
<HclListItemDescription>

The percentage of on-demand instances above the base capacity. Set to 0 to use only spot instances above the base capacity, or 100 to use only on-demand. Only used when cluster_instance_type_overrides is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_instance_placement_affinity" requirement="optional" type="string">
<HclListItemDescription>

The affinity setting for an instance on a Dedicated Host.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_instance_placement_group_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the placement group for the instance.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_instance_placement_host_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the Dedicated Host for the instance.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_instance_placement_host_resource_group_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the Host Resource Group in which to launch instances.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_instance_placement_partition_number" requirement="optional" type="number">
<HclListItemDescription>

The number of the partition the instance should launch in. Valid only if the placement group strategy is set to partition.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_instance_request_spot_instances" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to request spot instances. Set cluster_instance_spot_price variable to set a maximum spot price limit.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="cluster_instance_role_permissions_boundary_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role for the cluster instances.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_instance_root_volume_encrypted" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to encrypt the root block devices for the ECS cluster's EC2 instances

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="cluster_instance_root_volume_size" requirement="optional" type="number">
<HclListItemDescription>

The size in GB of the root volume for each of the ECS Cluster's EC2 Instances

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="40"/>
</HclListItem>

<HclListItem name="cluster_instance_root_volume_type" requirement="optional" type="string">
<HclListItemDescription>

The volume type for the root volume for each of the ECS Cluster's EC2 Instances. Can be standard, gp2, or io1

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;gp2&quot;"/>
</HclListItem>

<HclListItem name="cluster_instance_spot_allocation_strategy" requirement="optional" type="string">
<HclListItemDescription>

The strategy for allocating spot capacity. Valid values: lowest-price, capacity-optimized, capacity-optimized-prioritized, price-capacity-optimized. Only used when cluster_instance_type_overrides is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_instance_spot_instance_pools" requirement="optional" type="number">
<HclListItemDescription>

The number of Spot Instance pools across which to allocate your Spot Instances. Only relevant when cluster_instance_spot_allocation_strategy is lowest-price. Only used when cluster_instance_type_overrides is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_instance_spot_max_price" requirement="optional" type="string">
<HclListItemDescription>

The maximum price per unit hour that you are willing to pay for a Spot Instance. Only used when cluster_instance_type_overrides is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_instance_spot_price" requirement="optional" type="string">
<HclListItemDescription>

Value is the maximum bid price for the instance on the EC2 Spot Market.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_instance_type_overrides" requirement="optional" type="list(object(…))">
<HclListItemDescription>

The list of EC2-instance-type overrides allowed for each of the ECS Cluster's EC2 Instances

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    type   = string
    weight = number
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_instance_user_data" requirement="optional" type="string">
<HclListItemDescription>

The User Data script to run on each of the ECS Cluster's EC2 Instances on their first boot.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_instance_user_data_base64" requirement="optional" type="string">
<HclListItemDescription>

The base64-encoded User Data script to run on the server when it is booting. This can be used to pass binary User Data, such as a gzipped cloud-init script. If you wish to pass in plain text (e.g., typical Bash script) for User Data, use <a href="#cluster_instance_user_data"><code>cluster_instance_user_data</code></a> instead.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

If you set this variable to false, this module will not create any resources. This is used as a workaround because Terraform does not allow you to use the 'count' parameter on modules. By using this parameter, you can optionally create or not create the resources within this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="custom_iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

When set, name the IAM role for the ECS cluster using this variable. When null, the IAM role name will be derived from <a href="#cluster_name"><code>cluster_name</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_tags_ec2_instances" requirement="optional" type="list">
<HclListItemDescription>

A list of custom tags to apply to the EC2 Instances in this ASG. Each item in this list should be a map with the parameters key, value, and propagate_at_launch.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="custom_tags_ecs_cluster" requirement="optional" type="map(string)">
<HclListItemDescription>

Custom tags to apply to the ECS cluster

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="custom_tags_security_group" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the Security Group for this ECS Cluster. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="egress_allow_outbound_all" requirement="optional" type="list(string)">
<HclListItemDescription>

List of CIDR blocks that will be allowed for egress access.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[
  &quot;0.0.0.0/0&quot;
]"/>
</HclListItem>

<HclListItem name="egress_from_port" requirement="optional" type="number">
<HclListItemDescription>

The from port range (paired with egress_to_port) to be used for for egress access.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="egress_protocol" requirement="optional" type="string">
<HclListItemDescription>

The protocol to be used for for egress access.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;-1&quot;"/>
</HclListItem>

<HclListItem name="egress_to_port" requirement="optional" type="number">
<HclListItemDescription>

The end port range (paired with egress_from_port) to be used for for egress access.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="enable_block_device_mappings" requirement="optional" type="bool">
<HclListItemDescription>

Enables additional block device mapping. Change to false if you wish to disable additional EBS volume attachment to EC2 instances. Defaults to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_cluster_container_insights" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to enable Container Insights on the ECS cluster. Refer to https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cloudwatch-container-insights.html for more information on ECS Container Insights.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   We intentionally default this to false. While Container Insights provides useful metrics, the costs can add up
   depending on how large your clusters are. Specifically, Container Insights will add:
   - 8 custom metrics per ECS cluster
   - 6 custom metrics per ECS task
   - 11 custom metrics per ECS service
   Each metric costs $0.30 per month up to 10,000 metrics, at which point the costs start to drop. Refer to
   https://aws.amazon.com/cloudwatch/pricing/ for more details.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="enable_imds" requirement="optional" type="bool">
<HclListItemDescription>

Set this variable to true to enable the Instance Metadata Service (IMDS) endpoint, which is used to fetch information such as user-data scripts, instance IP address and region, etc. Set this variable to false if you do not want the IMDS endpoint enabled for instances launched into the Auto Scaling Group for the workers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="http_put_response_hop_limit" requirement="optional" type="number">
<HclListItemDescription>

The desired HTTP PUT response hop limit for instance metadata requests.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="instance_refresh_preferences" requirement="optional" type="map(any)">
<HclListItemDescription>

Override default parameters for Instance Refresh. See https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/autoscaling_group#preferences for available options

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="instance_refresh_strategy" requirement="optional" type="string">
<HclListItemDescription>

Strategy to use for instance refresh. If not specified then instance_refresh is disabled

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="launch_template_update_default_version" requirement="optional" type="bool">
<HclListItemDescription>

Whether to update Default Version for the Launch Template with each update.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="max_instance_lifetime" requirement="optional" type="number">
<HclListItemDescription>

Maximum amount of time, in seconds, that an instance can be in service, values must be either equal to 0 or between 86400 and 31536000 seconds.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="multi_az_capacity_provider" requirement="optional" type="bool">
<HclListItemDescription>

Enable a multi-az capacity provider to autoscale the EC2 ASGs created for this ECS cluster, only if capacity_provider_enabled = true

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="ssh_port" requirement="optional" type="number">
<HclListItemDescription>

The port to use for SSH access.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="22"/>
</HclListItem>

<HclListItem name="tenancy" requirement="optional" type="string">
<HclListItemDescription>

The tenancy of the servers in this cluster. Must be one of: default, dedicated, or host.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;default&quot;"/>
</HclListItem>

<HclListItem name="termination_policies" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of policies to decide how the instances in the auto scale group should be terminated. The allowed values are OldestInstance, NewestInstance, OldestLaunchConfiguration, ClosestToNextInstanceHour, OldestLaunchTemplate, AllocationStrategy, Default. If you specify more than one policy, the ASG will try each one in turn, use it to select the instance(s) to terminate, and if more than one instance matches the criteria, then use the next policy to try to break the tie. E.g., If you use ['OldestInstance', 'ClosestToNextInstanceHour'] and and there were two instances with exactly the same launch time, then the ASG would try the next policy, which is to terminate the one closest to the next instance hour in billing.

</HclListItemDescription>
<HclListItemDefaultValue>

```hcl
[
  "OldestInstance"
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="use_imdsv1" requirement="optional" type="bool">
<HclListItemDescription>

Set this variable to true to enable the use of Instance Metadata Service Version 1 in this module's aws_launch_template. Note that while IMDsv2 is preferred due to its special security hardening, we allow this in order to support the use case of AMIs built outside of these modules that depend on IMDSv1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="ecs_cluster_arn">
</HclListItem>

<HclListItem name="ecs_cluster_asg_name">
</HclListItem>

<HclListItem name="ecs_cluster_asg_names">
</HclListItem>

<HclListItem name="ecs_cluster_capacity_provider_names">
</HclListItem>

<HclListItem name="ecs_cluster_launch_template_id">
</HclListItem>

<HclListItem name="ecs_cluster_name">
</HclListItem>

<HclListItem name="ecs_instance_iam_role_arn">
</HclListItem>

<HclListItem name="ecs_instance_iam_role_id">
</HclListItem>

<HclListItem name="ecs_instance_iam_role_name">
</HclListItem>

<HclListItem name="ecs_instance_security_group_id">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-ecs/tree/v1.3.0/modules/ecs-cluster/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-ecs/tree/v1.3.0/modules/ecs-cluster/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-ecs/tree/v1.3.0/modules/ecs-cluster/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "0d78f915e6955fec7f0feba11f7b61a0"
}
##DOCS-SOURCER-END -->
