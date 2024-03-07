---
title: "ECS Cluster Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon ECS" version="0.35.15" lastModifiedVersion="0.35.14"/>

# ECS Cluster Module

<a href="https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.35.15/modules/ecs-cluster" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-ecs/releases/tag/v0.35.14" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module launches an [EC2 Container Service
Cluster](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_clusters.html) that you can use to run
Docker containers and services (see the [ecs-service module](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.35.15/modules/ecs-service/README.adoc)).

## What is an ECS Cluster?

To use ECS with the EC2 launch type, you first deploy one or more EC2 Instances into a "cluster". The ECS scheduler can
then deploy Docker containers across any of the instances in this cluster. Each instance needs to have the [Amazon ECS
Agent](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_agent.html) installed so it can communicate with
ECS and register itself as part of the right cluster.

## How do you run Docker containers on the cluster?

See the [service module](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.35.15/modules/ecs-service/README.adoc).

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

To deploy an update to an ECS Service, see the [ecs-service module](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.35.15/modules/ecs-service). To deploy an update to the
EC2 Instances in your ECS cluster, such as a new AMI, read on.

Terraform and AWS do not provide a way to automatically roll out a change to the Instances in an ECS Cluster. Due to
Terraform limitations (see [here for a discussion](https://github.com/gruntwork-io/module-ecs/pull/29)), there is
currently no way to implement this purely in Terraform code. Therefore, we've created a script called
`roll-out-ecs-cluster-update.py` that can do a zero-downtime roll out for you.

### How to use the roll-out-ecs-cluster-update.py script

First, make sure you have the latest version of the [AWS Python SDK (boto3)](https://github.com/boto/boto3) installed
(e.g. `pip install boto3`).

To deploy a change such as rolling out a new AMI to all ECS Instances:

1.  Make sure the `cluster_max_size` is at least twice the size of `cluster_min_size`. The extra capacity will be used
    to deploy the updated instances.
2.  Update the Terraform code with your changes (e.g. update the `cluster_instance_ami` variable to a new AMI).
3.  Run `terraform apply`.
4.  Run the script:

    ```
    python roll-out-ecs-cluster-update.py --asg-name ASG_NAME --cluster-name CLUSTER_NAME --aws-region AWS_REGION
    ```

    If you have your output variables configured as shown in [outputs.tf](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.35.15/examples/docker-service-with-elb/outputs.tf)
    of the [docker-service-with-elb example](https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.35.15/examples/docker-service-with-elb), you can use the `terraform output`
    command to fill in most of the arguments automatically:

    ```
    python roll-out-ecs-cluster-update.py \
      --asg-name $(terragrunt output -no-color asg_name) \
      --cluster-name $(terragrunt output -no-color ecs_cluster_name) \
      --aws-region $(terragrunt output -no-color aws_region)
    ```

To avoid the need to install python dependencies on your local machine, you may chose to use docker.

1.  Navigate to the directory that you have downloaded `roll-out-ecs-cluster-update.py`:
2.  If you use [aws-vault](https://github.com/99designs/aws-vault), you can run the following to make your aws
    credentials available to the container. If you do not use `aws-vault`, you will have to manually use the `--env`
    option of `docker run`

    ```
    docker run \
        -it --rm -v "$PWD":/usr/src -w /usr/src \
        --env-file <(aws-vault exec --assume-role-ttl=1h PROFIE -- env | grep AWS) \
        python:2.7-alpine \
        sh -c "pip install boto3 && python roll-out-ecs-cluster-update.py \
        --asg-name ASG_NAME \
        --cluster-name CLUSTER_NAME \
        --aws-region AWS_REGION"
    ```

### How roll-out-ecs-cluster-update.py works

The `roll-out-ecs-cluster-update.py` script does the following:

1.  Double the desired capacity of the Auto Scaling Group that powers the ECS Cluster. This causes EC2 Instances to
    deploy with the new launch configuration.
2.  Put all the old ECS Instances in DRAINING state so all ECS Tasks are migrated off of them to the new Instances.
3.  Wait for all ECS Tasks to migrate off the old Instances.
4.  Set the desired capacity of the Auto Scaling Group back to its original value.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ECS-CLUSTER MODULE
# ------------------------------------------------------------------------------------------------------

module "ecs_cluster" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-ecs.git//modules/ecs-cluster?ref=v0.35.15"

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

  # Set to true to encrypt the root block devices for the ECS cluster's EC2
  # instances
  cluster_instance_root_volume_encrypted = false

  # The size in GB of the root volume for each of the ECS Cluster's EC2
  # Instances
  cluster_instance_root_volume_size = 40

  # The volume type for the root volume for each of the ECS Cluster's EC2
  # Instances. Can be standard, gp2, or io1
  cluster_instance_root_volume_type = "gp2"

  # If set to a non-empty string EC2 Spot Instances will be requested for the
  # ECS Cluster. The value is the maximum bid price for the instance on the EC2
  # Spot Market.
  cluster_instance_spot_price = null

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

  # A list of custom tags to apply to the EC2 Instances in this ASG. Each item
  # in this list should be a map with the parameters key, value, and
  # propagate_at_launch.
  custom_tags_ec2_instances = []

  # A map of custom tags to apply to the Security Group for this ECS Cluster.
  # The key is the tag name and the value is the tag value.
  custom_tags_security_group = {}

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

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ECS-CLUSTER MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-ecs.git//modules/ecs-cluster?ref=v0.35.15"
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

  # Set to true to encrypt the root block devices for the ECS cluster's EC2
  # instances
  cluster_instance_root_volume_encrypted = false

  # The size in GB of the root volume for each of the ECS Cluster's EC2
  # Instances
  cluster_instance_root_volume_size = 40

  # The volume type for the root volume for each of the ECS Cluster's EC2
  # Instances. Can be standard, gp2, or io1
  cluster_instance_root_volume_type = "gp2"

  # If set to a non-empty string EC2 Spot Instances will be requested for the
  # ECS Cluster. The value is the maximum bid price for the instance on the EC2
  # Spot Market.
  cluster_instance_spot_price = null

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

  # A list of custom tags to apply to the EC2 Instances in this ASG. Each item
  # in this list should be a map with the parameters key, value, and
  # propagate_at_launch.
  custom_tags_ec2_instances = []

  # A map of custom tags to apply to the Security Group for this ECS Cluster.
  # The key is the tag name and the value is the tag value.
  custom_tags_security_group = {}

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

<HclListItem name="cluster_instance_spot_price" requirement="optional" type="string">
<HclListItemDescription>

If set to a non-empty string EC2 Spot Instances will be requested for the ECS Cluster. The value is the maximum bid price for the instance on the EC2 Spot Market.

</HclListItemDescription>
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

<HclListItem name="custom_tags_ec2_instances" requirement="optional" type="list">
<HclListItemDescription>

A list of custom tags to apply to the EC2 Instances in this ASG. Each item in this list should be a map with the parameters key, value, and propagate_at_launch.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="custom_tags_security_group" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the Security Group for this ECS Cluster. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
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
<HclGeneralListItem title="More Details">
<details>


```hcl

   Our default policy is optimized for rolling out updates to the ECS cluster via roll-out-ecs-cluster-update.py.
   That script scales the cluster up to launch new instances and then back down with the intention of terminating
   the older instances, so we need to use the OldestInstance policy for that to work.

```
</details>

</HclGeneralListItem>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="ecs_cluster_arn">
</HclListItem>

<HclListItem name="ecs_cluster_asg_name">
</HclListItem>

<HclListItem name="ecs_cluster_launch_configuration_id">
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
    "https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.35.15/modules/ecs-cluster/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.35.15/modules/ecs-cluster/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-ecs/tree/v0.35.15/modules/ecs-cluster/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "2e8d2e333f8afee4ed2a4cc1823f36b0"
}
##DOCS-SOURCER-END -->
