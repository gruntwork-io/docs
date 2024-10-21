---
title: "EKS Cluster Workers Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon EKS" version="0.71.0" lastModifiedVersion="0.67.12"/>

# EKS Cluster Workers Module

<a href="https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.71.0/modules/eks-cluster-workers" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.67.12" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

**This module provisions self managed ASGs, in contrast to [EKS Managed Node Groups](https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html). See the [eks-cluster-managed-workers](https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.71.0/modules/eks-cluster-managed-workers) module for a module to deploy Managed Node Groups.**

This Terraform Module launches worker nodes for an [Elastic Container Service for Kubernetes
Cluster](https://docs.aws.amazon.com/eks/latest/userguide/clusters.html) that you can use to run Kubernetes Pods and
Deployments.

This module is responsible for the EKS Worker Nodes in [the EKS cluster
topology](https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.71.0/modules/eks-cluster-control-plane/README.md#what-is-an-eks-cluster). You must launch a control plane in order
for the worker nodes to function. See the [eks-cluster-control-plane module](https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.71.0/modules/eks-cluster-control-plane) for
managing an EKS control plane.

## Differences with managed node groups

See the \[Differences with self managed workers] section in the documentation for [eks-cluster-managed-workers
module](https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.71.0/modules/eks-cluster-managed-workers) for a detailed overview of differences with EKS Managed Node Groups.

## What should be included in the user-data script?

In order for the EKS worker nodes to function, it must register itself to the Kubernetes API run by the EKS control
plane. This is handled by the bootstrap script provided in the EKS optimized AMI. The user-data script should call the
bootstrap script at some point during its execution. You can get this information from the [eks-cluster-control-plane
module](https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.71.0/modules/eks-cluster-control-plane).

For an example of a user data script, see the [eks-cluster example's user-data.sh
script](https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.71.0/examples/eks-cluster-with-iam-role-mappings/user-data/user-data.sh).

You can read more about the bootstrap script in [the official documentation for EKS](https://docs.aws.amazon.com/eks/latest/userguide/launch-workers.html).

## Which security group should I use?

EKS clusters using Kubernetes version 1.14 and above automatically create a managed security group known as the cluster
security group. The cluster security group is designed to allow all traffic from the control plane and worker nodes to
flow freely between each other. This security group has the following rules:

*   Allow Kubernetes API traffic between the security group and the control plane security group.
*   Allow all traffic between instances of the security group ("ingress all from self").
*   Allow all outbound traffic.

EKS will automatically use this security group for the underlying worker instances used with managed node groups or
Fargate. This allows traffic to flow freely between Fargate Pods and worker instances managed with managed node groups.

You can read more about the cluster security group in [the AWS
docs](https://docs.aws.amazon.com/eks/latest/userguide/sec-group-reqs.html#cluster-sg).

By default this module will attach two security groups to the worker nodes managed by the module:

*   The cluster security group.
*   A custom security group that can be extended with additional rules.

You can attach additional security groups to the nodes using the `var.additional_security_group_ids` input variable.

If you would like to avoid the cluster security group (this is useful if
you wish to isolate at the network level the workers managed by this module from other workers in your cluster like
Fargate, Managed Node Groups, or other self managed ASGs), set the `use_cluster_security_group` input variable to
`false`. With this setting, the module will apply recommended security group rules to the custom group to allow the node
to function as a EKS worker. The rules used for the new security group are based on [the recommendations provided by
AWS](https://docs.aws.amazon.com/eks/latest/userguide/sec-group-reqs.html#control-plane-worker-node-sgs) for configuring
an EKS cluster.

### <a name="how-to-extend-security-group"></a>How do you add additional security group rules?

To add additional security group rules to the EKS cluster worker nodes, you can use the
[aws_security_group_rule](https://www.terraform.io/docs/providers/aws/r/security_group_rule.html) resource, and set its
`security_group_id` argument to the Terraform output of this module called `eks_worker_security_group_id` for the worker
nodes. For example, here is how you can allow the EC2 Instances in this cluster to allow incoming HTTP requests on port
8080:

```hcl
module "eks_workers" {
  # (arguments omitted)
}

resource "aws_security_group_rule" "allow_inbound_http_from_anywhere" {
  type = "ingress"
  from_port = 8080
  to_port = 8080
  protocol = "tcp"
  cidr_blocks = ["0.0.0.0/0"]

  security_group_id = "${module.eks_workers.eks_worker_security_group_id}"
}
```

**Note**: The security group rules you add will apply to ALL Pods running on these EC2 Instances. There is currently no
way in EKS to manage security group rules on a per-Pod basis. Instead, rely on [Kubernetes Network
Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/) to restrict network access within a
Kubernetes cluster.

## What IAM policies are attached to the EKS Cluster?

This module will create IAM roles for the EKS cluster worker nodes with the minimum set of policies necessary
for the cluster to function as a Kubernetes cluster. The policies attached to the roles are the same as those documented
in [the AWS getting started guide for EKS](https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html).

### How do you add additional IAM policies?

To add additional IAM policies to the EKS cluster worker nodes, you can use the
[aws_iam_role_policy](https://www.terraform.io/docs/providers/aws/r/iam_role_policy.html) or
[aws_iam_policy_attachment](https://www.terraform.io/docs/providers/aws/r/iam_policy_attachment.html) resources, and set
the IAM role id to the Terraform output of this module called `eks_worker_iam_role_name` for the worker nodes. For
example, here is how you can allow the worker nodes in this cluster to access an S3 bucket:

```hcl
module "eks_workers" {
  # (arguments omitted)
}

resource "aws_iam_role_policy" "access_s3_bucket" {
    name = "access_s3_bucket"
    role = "${module.eks_workers.eks_worker_iam_role_name}"
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

**Note**: The IAM policies you add will apply to ALL Pods running on these EC2 Instances. See the [How do I associate
IAM roles to the Pods?](https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.71.0/modules/eks-cluster-control-plane/README.md#how-do-i-associate-iam-roles-to-the-pods) section of the
`eks-cluster-control-plane` module README for more fine-grained allocation of IAM credentials to Pods.

## How do I SSH into the nodes?

This module provides options to allow you to SSH into the worker nodes of an EKS cluster that are managed by this
module. To do so, you must first use an AMI that is configured to allow SSH access. Then, you must setup the auto
scaling group to launch instances with a known keypair that you have access to by using the
`cluster_instance_keypair_name` option of the module. Finally, you need to configure the security group of the worker
node to allow access to the port for SSH by extending the security group of the worker nodes by following [the guide
above](#how-to-extend-security-group). This will allow SSH access to the instance using the specified keypair, provided
the server AMI is configured to run the ssh daemon.

**Note**: Using a single key pair shared with your whole team for all of your SSH access is not secure. For a more
secure option that allows each developer to use their own SSH key, and to manage server access via IAM or your Identity
Provider (e.g. Google, ADFS, Okta, etc), see [ssh-grunt](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/ssh-grunt).

## How do I roll out an update to the instances?

Terraform and AWS do not provide a way to automatically roll out a change to the Instances in an EKS Cluster. Due to
Terraform limitations (see [here for a discussion](https://github.com/gruntwork-io/terraform-aws-ecs/pull/29)), there is
currently no way to implement this purely in Terraform code. Therefore, we've embedded this functionality into
`kubergrunt` that can do a zero-downtime roll out for you.

Refer to the [`deploy` subcommand documentation](https://github.com/gruntwork-io/kubergrunt#deploy) for more details on how this works.

## How do I perform a blue green release to roll out new versions of the module?

Gruntwork tries to provide migration paths that avoid downtime when rolling out new versions of the module. These are
usually implemented as feature flags, or a list of state migration calls that allow you to avoid a resource recreation.
However, it is not always possible to avoid a resource recreation with AutoScaling Groups.

When it is not possible to avoid resource recreation, you can perform a blue-green release of the worker pool. In this
deployment model, you can deploy a new worker pool using the updated version, and migrate the Kubernetes workload to the
new cluster prior to spinning down the old one.

The following are the steps you can take to perform a blue-green release for this module:

*   Add a new module block that calls the `eks-cluster-workers` module using the new version, leaving the old module block
    with the old version untouched. E.g.,

    ```
    # old version
    module "workers" {
      source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-cluster-workers?ref=v0.37.2"
      # other args omitted for brevity
    }

    # new version
    module "workers_next_version" {
      source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-cluster-workers?ref=v0.38.0"
      # other args omitted for brevity
    }
    ```

    This will spin up the new worker pool on the updated version in parallel with the old workers, without touching the
    old ones.

*   Make sure to add the IAM role for the new worker set to the `aws-auth` ConfigMap so that the workers can authenticate
    to the Kubernetes API. This can be done by adding the `eks_worker_iam_role_arn` output of the new module block to the
    `eks_worker_iam_role_arns` input list for the module call to `eks-k8s-role-mapping`.

*   Verify that the new workers are registered to the Kubernetes cluster by checking the output of `kubectl get nodes`. If
    the nodes are not in the list, or don't reach the `Ready` state, you will want to troubleshoot by introspecting the
    system logs.

*   Once the new workers are up and registered to the Kubernetes Control Plane, you can run `kubectl cordon` and `kubectl
    drain` on each instance in the old ASG to transition the workload over to the new worker pool. `kubergrunt` provides
    [a helper command](https://github.com/gruntwork-io/kubergrunt/#drain) to make it easier to run this:

    ```
    kubergrunt eks drain --asg-name my-asg-a --asg-name my-asg-b --asg-name my-asg-c --region us-east-2
    ```

    This command will cordon and drain all the nodes associated with the given ASGs.

*   Once the workload is transitioned, you can tear down the old worker pool by dropping the old module block and running
    `terraform apply`.

## How do I enable cluster auto-scaling?

This module will not automatically scale in response to resource usage by default, the
`autoscaling_group_configurations.*.max_size` option is only used to give room for new instances during rolling updates.
To enable auto-scaling in response to resource utilization, you must set the `include_autoscaler_discovery_tags` input
variable to `true` and also deploy the [Kubernetes Cluster Autoscaler module](https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.71.0/modules/eks-k8s-cluster-autoscaler).

Note that the cluster autoscaler supports ASGs that manage nodes in a single availability zone or ASGs that manage nodes in multiple availability zones. However, there is a caveat:

*   If you intend to use EBS volumes, you need to make sure that the autoscaler scales the correct ASG for pods that are localized to the availability zone. This is because EBS volumes are local to the availability zone. You need to carefully provision the managed node groups such that you have one group per AZ if you wish to use the cluster autoscaler in this case, which you can do by ensuring that the `subnet_ids` in each `autoscaling_group_configurations` input map entry come from the same AZ.

*   You can certainly use a single ASG that spans multiple AZs if you don't intend to use EBS volumes.

*   AWS now supports EFS as a persistent storage solution with EKS. This can be used with ASGs that span a single or multiple AZs.

Refer to the [Kubernetes Autoscaler](https://github.com/kubernetes/autoscaler) documentation for more details.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-CLUSTER-WORKERS MODULE
# ------------------------------------------------------------------------------------------------------

module "eks_cluster_workers" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-cluster-workers?ref=v0.71.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Configure one or more Auto Scaling Groups (ASGs) to manage the EC2 instances
  # in this cluster. If any of the values are not provided, the specified
  # default variable will be used to lookup a default value.
  autoscaling_group_configurations = <any>

  # The name of the EKS cluster (e.g. eks-prod). This is also used to namespace
  # all the resources created by these templates.
  cluster_name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of additional Security Groups IDs to be attached on the EKS Worker.
  additional_security_group_ids = []

  # When true, this module will attach a security group rule to the instances
  # that will allow all outbound network access. Only used if
  # `use_cluster_security_group` is `false`.
  allow_all_outbound_network_calls = true

  # Default value for the enable_detailed_monitoring field of
  # autoscaling_group_configurations.
  asg_default_enable_detailed_monitoring = true

  # Default value for the http_put_response_hop_limit field of
  # autoscaling_group_configurations.
  asg_default_http_put_response_hop_limit = null

  # Default value for the asg_instance_ami field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # asg_instance_ami will use this value.
  asg_default_instance_ami = null

  # Default value for the instance_maintenance_policy field of
  # autoscaling_group_configurations.
  asg_default_instance_maintenance_policy = null

  # Default value for the asg_instance_root_volume_encryption field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # asg_instance_root_volume_encryption will use this value.
  asg_default_instance_root_volume_encryption = true

  # Default value for the asg_instance_root_volume_iops field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # asg_instance_root_volume_iops will use this value.
  asg_default_instance_root_volume_iops = null

  # Default value for the asg_instance_root_volume_name field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # asg_instance_root_volume_type will use this value.
  asg_default_instance_root_volume_name = "/dev/xvda"

  # Default value for the asg_instance_root_volume_size field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # asg_instance_root_volume_size will use this value.
  asg_default_instance_root_volume_size = 40

  # Default value for the asg_instance_root_volume_throughput field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # asg_instance_root_volume_throughput will use this value.
  asg_default_instance_root_volume_throughput = null

  # Default value for the asg_instance_root_volume_type field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # asg_instance_root_volume_type will use this value.
  asg_default_instance_root_volume_type = "standard"

  # Default value for the asg_instance_type field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # asg_instance_type will use this value.
  asg_default_instance_type = "t3.medium"

  # Default value for the asg_instance_user_data_base64 field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # asg_instance_user_data_base64 will use this value.
  asg_default_instance_user_data_base64 = null

  # Default value for the max_size field of autoscaling_group_configurations.
  # Any map entry that does not specify max_size will use this value.
  asg_default_max_size = 2

  # Default value for the min_size field of autoscaling_group_configurations.
  # Any map entry that does not specify min_size will use this value.
  asg_default_min_size = 1

  # Default value for the multi_instance_overrides field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # multi_instance_overrides will use this value.
  asg_default_multi_instance_overrides = []

  # Default value for the on_demand_allocation_strategy field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # on_demand_allocation_strategy will use this value.
  asg_default_on_demand_allocation_strategy = null

  # Default value for the on_demand_base_capacity field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # on_demand_base_capacity will use this value.
  asg_default_on_demand_base_capacity = null

  # Default value for the on_demand_percentage_above_base_capacity field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # on_demand_percentage_above_base_capacity will use this value.
  asg_default_on_demand_percentage_above_base_capacity = null

  # Default value for the spot_allocation_strategy field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # spot_allocation_strategy will use this value.
  asg_default_spot_allocation_strategy = null

  # Default value for the spot_instance_pools field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # spot_instance_pools will use this value.
  asg_default_spot_instance_pools = null

  # Default value for the spot_max_price field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # spot_max_price will use this value. Set to empty string (default) to mean
  # on-demand price.
  asg_default_spot_max_price = null

  # Default value for the tags field of autoscaling_group_configurations. Any
  # map entry that does not specify tags will use this value.
  asg_default_tags = []

  # Default value for the use_multi_instances_policy field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # use_multi_instances_policy will use this value.
  asg_default_use_multi_instances_policy = false

  # The AWS partition used for default AWS Resources.
  aws_partition = "aws"

  # Whether or not to associate a public IP address to the instances of the
  # cluster. Will only work if the instances are launched in a public subnet.
  cluster_instance_associate_public_ip_address = false

  # The EC2 Keypair name used to SSH into the EKS Cluster's EC2 Instances. To
  # disable keypairs, pass in blank.
  cluster_instance_keypair_name = null

  # If you set this variable to false, this module will not create any
  # resources. This is used as a workaround because Terraform does not allow you
  # to use the 'count' parameter on modules. By using this parameter, you can
  # optionally create or not create the resources within this module.
  create_resources = true

  # A map of custom tags to apply to the Security Group for this EKS Cluster.
  # The key is the tag name and the value is the tag value.
  custom_tags_security_group = {}

  # Security group ID of the EKS Control Plane nodes to enhance to allow access
  # to the control plane from the workers. Only used if
  # `use_cluster_security_group` is `false`. Set to null to use the first
  # security group assigned to the cluster.
  eks_control_plane_security_group_id = null

  # When true, the Instance Metadata Service will expose the tags of the
  # instance.
  enable_instance_metadata_tags = false

  # A list of metrics to collect from the ASG. For a list of allowed values, see
  # https://www.terraform.io/docs/providers/aws/r/autoscaling_group.html#enabled_metrics.
  enabled_metrics = []

  # Whether to force detaching any policies the role has before destroying it.
  # If policies are attached to the role via the aws_iam_policy_attachment
  # resource and you are modifying the role name or path, the
  # force_detach_policies argument must be set to true and applied before
  # attempting the operation otherwise you will encounter a DeleteConflict
  # error. The aws_iam_role_policy_attachment resource (recommended) does not
  # have this requirement.
  force_detach_policies = false

  # Custom name for the IAM instance profile. When null, the IAM role name will
  # be used. If var.use_resource_name_prefix is true, this will be used as a
  # name prefix.
  iam_instance_profile_name = null

  # Whether or not the IAM role used for the workers already exists. When false,
  # this module will create a new IAM role.
  iam_role_already_exists = false

  # ARN of the IAM role to use if iam_role_already_exists = true. When null,
  # uses iam_role_name to lookup the ARN. One of iam_role_name and iam_role_arn
  # is required (must be non-null) if iam_role_already_exists is true.
  iam_role_arn = null

  # Custom name for the IAM role. When null, a default name based on
  # cluster_name will be used. One of iam_role_name and iam_role_arn is required
  # (must be non-null) if iam_role_already_exists is true.
  iam_role_name = null

  # Adds additional tags to each ASG that allow a cluster autoscaler to
  # auto-discover them.
  include_autoscaler_discovery_tags = false

  # A list of elastic load balancer names to add to the autoscaling group names.
  # Use with ELB classic and NLBs.
  load_balancers = []

  # The maximum amount of time, in seconds, that an instance inside an ASG can
  # be in service, values must be either equal to 0 or between 604800 and
  # 31536000 seconds. Note that this will be a disruptive shutdown: the ASG will
  # not automatically drain the node prior to shutting it down.
  max_instance_lifetime = null

  # Prefix resource names with this string. When you have multiple worker groups
  # for the cluster, you can use this to namespace the resources.
  name_prefix = ""

  # Suffix resource names with this string. When you have multiple worker groups
  # for the cluster, you can use this to namespace the resources.
  name_suffix = ""

  # A list of aws_alb_target_group ARNs, for use with Application Load
  # Balancing.
  target_group_arns = []

  # The tenancy of the servers in this cluster. Must be one of: default,
  # dedicated, or host.
  tenancy = "default"

  # Whether or not to attach the EKS managed cluster security group to the
  # worker nodes for control plane and cross worker network management. Avoiding
  # the cluster security group allows you to better isolate worker nodes at the
  # network level (E.g., disallowing free flowing traffic between Fargate Pods
  # and self managed workers). It is recommended to use the cluster security
  # group for most use cases. Refer to the module README for more information.
  # If use_existing_cluster_config is false and this is set to true, it is
  # assumed that the cluster security group is provided in
  # var.additional_security_group_ids.
  use_cluster_security_group = true

  # When true, this module will retrieve vpc config and security group ids from
  # the existing cluster with the provided cluster_name. When false, you must
  # provide var.vpc_id and var.eks_control_plane_security_group_id.
  use_existing_cluster_config = true

  # Set this variable to true to enable the use of Instance Metadata Service
  # Version 1 in this module's aws_launch_configuration. Note that while IMDsv2
  # is preferred due to its special security hardening, we allow this in order
  # to support the use case of AMIs built outside of these modules that depend
  # on IMDSv1.
  use_imdsv1 = false

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

  # When true, all the relevant resources will be set to use the name_prefix
  # attribute so that unique names are generated for them. This allows those
  # resources to support recreation through create_before_destroy lifecycle
  # rules. Set to false if you were using any version before 0.45.0 and wish to
  # avoid recreating the entire worker pool on your cluster.
  use_resource_name_prefix = true

  # VPC id for the EKS cluster deployment.
  vpc_id = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-CLUSTER-WORKERS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-cluster-workers?ref=v0.71.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Configure one or more Auto Scaling Groups (ASGs) to manage the EC2 instances
  # in this cluster. If any of the values are not provided, the specified
  # default variable will be used to lookup a default value.
  autoscaling_group_configurations = <any>

  # The name of the EKS cluster (e.g. eks-prod). This is also used to namespace
  # all the resources created by these templates.
  cluster_name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of additional Security Groups IDs to be attached on the EKS Worker.
  additional_security_group_ids = []

  # When true, this module will attach a security group rule to the instances
  # that will allow all outbound network access. Only used if
  # `use_cluster_security_group` is `false`.
  allow_all_outbound_network_calls = true

  # Default value for the enable_detailed_monitoring field of
  # autoscaling_group_configurations.
  asg_default_enable_detailed_monitoring = true

  # Default value for the http_put_response_hop_limit field of
  # autoscaling_group_configurations.
  asg_default_http_put_response_hop_limit = null

  # Default value for the asg_instance_ami field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # asg_instance_ami will use this value.
  asg_default_instance_ami = null

  # Default value for the instance_maintenance_policy field of
  # autoscaling_group_configurations.
  asg_default_instance_maintenance_policy = null

  # Default value for the asg_instance_root_volume_encryption field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # asg_instance_root_volume_encryption will use this value.
  asg_default_instance_root_volume_encryption = true

  # Default value for the asg_instance_root_volume_iops field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # asg_instance_root_volume_iops will use this value.
  asg_default_instance_root_volume_iops = null

  # Default value for the asg_instance_root_volume_name field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # asg_instance_root_volume_type will use this value.
  asg_default_instance_root_volume_name = "/dev/xvda"

  # Default value for the asg_instance_root_volume_size field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # asg_instance_root_volume_size will use this value.
  asg_default_instance_root_volume_size = 40

  # Default value for the asg_instance_root_volume_throughput field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # asg_instance_root_volume_throughput will use this value.
  asg_default_instance_root_volume_throughput = null

  # Default value for the asg_instance_root_volume_type field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # asg_instance_root_volume_type will use this value.
  asg_default_instance_root_volume_type = "standard"

  # Default value for the asg_instance_type field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # asg_instance_type will use this value.
  asg_default_instance_type = "t3.medium"

  # Default value for the asg_instance_user_data_base64 field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # asg_instance_user_data_base64 will use this value.
  asg_default_instance_user_data_base64 = null

  # Default value for the max_size field of autoscaling_group_configurations.
  # Any map entry that does not specify max_size will use this value.
  asg_default_max_size = 2

  # Default value for the min_size field of autoscaling_group_configurations.
  # Any map entry that does not specify min_size will use this value.
  asg_default_min_size = 1

  # Default value for the multi_instance_overrides field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # multi_instance_overrides will use this value.
  asg_default_multi_instance_overrides = []

  # Default value for the on_demand_allocation_strategy field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # on_demand_allocation_strategy will use this value.
  asg_default_on_demand_allocation_strategy = null

  # Default value for the on_demand_base_capacity field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # on_demand_base_capacity will use this value.
  asg_default_on_demand_base_capacity = null

  # Default value for the on_demand_percentage_above_base_capacity field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # on_demand_percentage_above_base_capacity will use this value.
  asg_default_on_demand_percentage_above_base_capacity = null

  # Default value for the spot_allocation_strategy field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # spot_allocation_strategy will use this value.
  asg_default_spot_allocation_strategy = null

  # Default value for the spot_instance_pools field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # spot_instance_pools will use this value.
  asg_default_spot_instance_pools = null

  # Default value for the spot_max_price field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # spot_max_price will use this value. Set to empty string (default) to mean
  # on-demand price.
  asg_default_spot_max_price = null

  # Default value for the tags field of autoscaling_group_configurations. Any
  # map entry that does not specify tags will use this value.
  asg_default_tags = []

  # Default value for the use_multi_instances_policy field of
  # autoscaling_group_configurations. Any map entry that does not specify
  # use_multi_instances_policy will use this value.
  asg_default_use_multi_instances_policy = false

  # The AWS partition used for default AWS Resources.
  aws_partition = "aws"

  # Whether or not to associate a public IP address to the instances of the
  # cluster. Will only work if the instances are launched in a public subnet.
  cluster_instance_associate_public_ip_address = false

  # The EC2 Keypair name used to SSH into the EKS Cluster's EC2 Instances. To
  # disable keypairs, pass in blank.
  cluster_instance_keypair_name = null

  # If you set this variable to false, this module will not create any
  # resources. This is used as a workaround because Terraform does not allow you
  # to use the 'count' parameter on modules. By using this parameter, you can
  # optionally create or not create the resources within this module.
  create_resources = true

  # A map of custom tags to apply to the Security Group for this EKS Cluster.
  # The key is the tag name and the value is the tag value.
  custom_tags_security_group = {}

  # Security group ID of the EKS Control Plane nodes to enhance to allow access
  # to the control plane from the workers. Only used if
  # `use_cluster_security_group` is `false`. Set to null to use the first
  # security group assigned to the cluster.
  eks_control_plane_security_group_id = null

  # When true, the Instance Metadata Service will expose the tags of the
  # instance.
  enable_instance_metadata_tags = false

  # A list of metrics to collect from the ASG. For a list of allowed values, see
  # https://www.terraform.io/docs/providers/aws/r/autoscaling_group.html#enabled_metrics.
  enabled_metrics = []

  # Whether to force detaching any policies the role has before destroying it.
  # If policies are attached to the role via the aws_iam_policy_attachment
  # resource and you are modifying the role name or path, the
  # force_detach_policies argument must be set to true and applied before
  # attempting the operation otherwise you will encounter a DeleteConflict
  # error. The aws_iam_role_policy_attachment resource (recommended) does not
  # have this requirement.
  force_detach_policies = false

  # Custom name for the IAM instance profile. When null, the IAM role name will
  # be used. If var.use_resource_name_prefix is true, this will be used as a
  # name prefix.
  iam_instance_profile_name = null

  # Whether or not the IAM role used for the workers already exists. When false,
  # this module will create a new IAM role.
  iam_role_already_exists = false

  # ARN of the IAM role to use if iam_role_already_exists = true. When null,
  # uses iam_role_name to lookup the ARN. One of iam_role_name and iam_role_arn
  # is required (must be non-null) if iam_role_already_exists is true.
  iam_role_arn = null

  # Custom name for the IAM role. When null, a default name based on
  # cluster_name will be used. One of iam_role_name and iam_role_arn is required
  # (must be non-null) if iam_role_already_exists is true.
  iam_role_name = null

  # Adds additional tags to each ASG that allow a cluster autoscaler to
  # auto-discover them.
  include_autoscaler_discovery_tags = false

  # A list of elastic load balancer names to add to the autoscaling group names.
  # Use with ELB classic and NLBs.
  load_balancers = []

  # The maximum amount of time, in seconds, that an instance inside an ASG can
  # be in service, values must be either equal to 0 or between 604800 and
  # 31536000 seconds. Note that this will be a disruptive shutdown: the ASG will
  # not automatically drain the node prior to shutting it down.
  max_instance_lifetime = null

  # Prefix resource names with this string. When you have multiple worker groups
  # for the cluster, you can use this to namespace the resources.
  name_prefix = ""

  # Suffix resource names with this string. When you have multiple worker groups
  # for the cluster, you can use this to namespace the resources.
  name_suffix = ""

  # A list of aws_alb_target_group ARNs, for use with Application Load
  # Balancing.
  target_group_arns = []

  # The tenancy of the servers in this cluster. Must be one of: default,
  # dedicated, or host.
  tenancy = "default"

  # Whether or not to attach the EKS managed cluster security group to the
  # worker nodes for control plane and cross worker network management. Avoiding
  # the cluster security group allows you to better isolate worker nodes at the
  # network level (E.g., disallowing free flowing traffic between Fargate Pods
  # and self managed workers). It is recommended to use the cluster security
  # group for most use cases. Refer to the module README for more information.
  # If use_existing_cluster_config is false and this is set to true, it is
  # assumed that the cluster security group is provided in
  # var.additional_security_group_ids.
  use_cluster_security_group = true

  # When true, this module will retrieve vpc config and security group ids from
  # the existing cluster with the provided cluster_name. When false, you must
  # provide var.vpc_id and var.eks_control_plane_security_group_id.
  use_existing_cluster_config = true

  # Set this variable to true to enable the use of Instance Metadata Service
  # Version 1 in this module's aws_launch_configuration. Note that while IMDsv2
  # is preferred due to its special security hardening, we allow this in order
  # to support the use case of AMIs built outside of these modules that depend
  # on IMDSv1.
  use_imdsv1 = false

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

  # When true, all the relevant resources will be set to use the name_prefix
  # attribute so that unique names are generated for them. This allows those
  # resources to support recreation through create_before_destroy lifecycle
  # rules. Set to false if you were using any version before 0.45.0 and wish to
  # avoid recreating the entire worker pool on your cluster.
  use_resource_name_prefix = true

  # VPC id for the EKS cluster deployment.
  vpc_id = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="autoscaling_group_configurations" requirement="required" type="any">
<HclListItemDescription>

Configure one or more Auto Scaling Groups (ASGs) to manage the EC2 instances in this cluster. If any of the values are not provided, the specified default variable will be used to lookup a default value.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Each configuration must be keyed by a unique string that will be used as a suffix for the ASG name. The values
   support the following attributes:
  
   REQUIRED (must be provided for every entry):
   - subnet_ids  list(string)  : A list of the subnets into which the EKS Cluster's worker nodes will be launched.
                                 These should usually be all private subnets and include one in each AWS Availability
                                 Zone. NOTE: If using a cluster autoscaler, each ASG may only belong to a single
                                 availability zone.
  
   OPTIONAL (defaults to value of corresponding module input):
   - min_size            number             : (Defaults to value from var.asg_default_min_size) The minimum number of
                                              EC2 Instances representing workers launchable for this EKS Cluster.
                                              Useful for auto-scaling limits.
   - max_size            number             : (Defaults to value from var.asg_default_max_size) The maximum number of
                                              EC2 Instances representing workers that must be running for this EKS
                                              Cluster. We recommend making this at least twice the min_size, even if
                                              you don't plan on scaling the cluster up and down, as the extra capacity
                                              will be used to deploy updates to the cluster.
   - asg_instance_type   string             : (Defaults to value from var.asg_default_instance_type) The type of
                                              instances to use for the ASG (e.g., t3.medium).
   - asg_instance_ami   string              : (Defaults to value from var.asg_default_instance_ami) The ami that
                                              instances should use for the ASG .
   - asg_instance_user_data_base64   string : (Defaults to value from var.asg_default_instance_user_data_base64) The base64 user-data content of
                                              instances to use for the ASG.
   - asg_instance_root_volume_size   number : (Defaults to value from var.asg_default_instance_root_volume_size) The root volume size of
                                              instances to use for the ASG in GB (e.g., 40).
   - asg_instance_root_volume_type   string : (Defaults to value from var.asg_default_instance_root_volume_type) The root volume type of
                                              instances to use for the ASG (e.g., "standard").
   - asg_instance_root_volume_name   string : (Defaults to value from var.asg_default_instance_root_volume_device) The root volume name of
                                              instances to use for the ASG (e.g., /dev/sda1)
   - asg_instance_root_volume_iops   number : (Defaults to value from var.asg_default_instance_root_volume_iops) The root volume iops of
                                              instances to use for the ASG (e.g., 200).
   - asg_instance_root_volume_throughput   number : (Defaults to value from var.asg_default_instance_root_volume_throughput) The root volume throughput in MiBPS of
                                              instances to use for the ASG (e.g., 125).
   - asg_instance_root_volume_encryption   bool  : (Defaults to value from var.asg_default_instance_root_volume_encryption)
                                               Whether or not to enable root volume encryption for instances of the ASG.
   - tags                list(object[Tag])  : (Defaults to value from var.asg_default_tags) Custom tags to apply to the
                                              EC2 Instances in this ASG. Refer to structure definition below for the
                                              object type of each entry in the list.
   - enable_detailed_monitoring   bool      : (Defaults to value from
                                              var.asg_default_enable_detailed_monitoring) Whether to enable
                                              detailed monitoring on the EC2 instances that comprise the ASG.
   - use_multi_instances_policy   bool       : (Defaults to value from var.asg_default_use_multi_instances_policy)
                                               Whether or not to use a multi_instances_policy for the ASG.
   - multi_instance_overrides     list(MultiInstanceOverride) : (Defaults to value from var.asg_default_multi_instance_overrides)
                                               List of multi instance overrides to apply. Each element in the list is
                                               an object that specifies the instance_type to use for the override, and
                                               the weighted_capacity.
   - on_demand_allocation_strategy   string  : (Defaults to value from var.asg_default_on_demand_allocation_strategy)
                                               When using a multi_instances_policy the strategy to use when launching on-demand instances. Valid values: prioritized.
   - on_demand_base_capacity   number        : (Defaults to value from var.asg_default_on_demand_base_capacity)
                                               When using a multi_instances_policy the absolute minimum amount of desired capacity that must be fulfilled by on-demand instances.
   - on_demand_percentage_above_base_capacity   number : (Defaults to value from var.asg_default_on_demand_percentage_above_base_capacity)
                                               When using a multi_instances_policy the percentage split between on-demand and Spot instances above the base on-demand capacity.
   - spot_allocation_strategy   string       : (Defaults to value from var.asg_default_spot_allocation_strategy)
                                               When using a multi_instances_policy how to allocate capacity across the Spot pools. Valid values: lowest-price, capacity-optimized.
   - spot_instance_pools   number            : (Defaults to value from var.asg_default_spot_instance_pools)
                                               When using a multi_instances_policy the Number of Spot pools per availability zone to allocate capacity.
                                               EC2 Auto Scaling selects the cheapest Spot pools and evenly allocates Spot capacity across the number of Spot pools that you specify.
   - spot_max_price   string                 : (Defaults to value from var.asg_default_spot_max_price, an empty string which means the on-demand price.)
                                               When using a multi_instances_policy the maximum price per unit hour that the user is willing to pay for the Spot instances.
   - http_put_response_hop_limit     number  : (Defaults to value from var.asg_default_http_put_response_hop_limit) The
                                               desired HTTP PUT response hop limit for instance metadata requests.
  
   - instance_maintenance_policy     object(Health_Percentage)
  
   Structure of Health_Percentage object:
   - min_healthy_percentage  number  : Min healthy percentage forthe  intance maintenance policy
   - max_healthy_percentage  number  : Max healthy percentage for the intance maintenance policy
  
   Structure of Tag object:
   - key                  string  : The key for the tag to apply to the instance.
   - value                string  : The value for the tag to apply to the instance.
   - propagate_at_launch  bool    : Whether or not the tags should be propagated to the instance at launch time.
  
  
   Example:
   autoscaling_group_configurations = {
     "asg1" = {
       asg_instance_type = "t3.medium"
       subnet_ids        = [data.terraform_remote_state.vpc.outputs.private_app_subnet_ids[0]]
     },
     "asg2" = {
       max_size          = 3
       asg_instance_type = "t3.large"
       subnet_ids        = [data.terraform_remote_state.vpc.outputs.private_app_subnet_ids[1]]
  
       tags = [{
         key                 = "size"
         value               = "large"
         propagate_at_launch = true
       }]
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="cluster_name" requirement="required" type="string">
<HclListItemDescription>

The name of the EKS cluster (e.g. eks-prod). This is also used to namespace all the resources created by these templates.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="additional_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of additional Security Groups IDs to be attached on the EKS Worker.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_all_outbound_network_calls" requirement="optional" type="bool">
<HclListItemDescription>

When true, this module will attach a security group rule to the instances that will allow all outbound network access. Only used if `use_cluster_security_group` is `false`.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="asg_default_enable_detailed_monitoring" requirement="optional" type="bool">
<HclListItemDescription>

Default value for the enable_detailed_monitoring field of autoscaling_group_configurations.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="asg_default_http_put_response_hop_limit" requirement="optional" type="number">
<HclListItemDescription>

Default value for the http_put_response_hop_limit field of autoscaling_group_configurations.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="asg_default_instance_ami" requirement="optional" type="string">
<HclListItemDescription>

Default value for the asg_instance_ami field of autoscaling_group_configurations. Any map entry that does not specify asg_instance_ami will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="asg_default_instance_maintenance_policy" requirement="optional" type="object(…)">
<HclListItemDescription>

Default value for the instance_maintenance_policy field of autoscaling_group_configurations.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    min_healthy_percentage = number
    max_healthy_percentage = number
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="asg_default_instance_root_volume_encryption" requirement="optional" type="bool">
<HclListItemDescription>

Default value for the asg_instance_root_volume_encryption field of autoscaling_group_configurations. Any map entry that does not specify asg_instance_root_volume_encryption will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="asg_default_instance_root_volume_iops" requirement="optional" type="number">
<HclListItemDescription>

Default value for the asg_instance_root_volume_iops field of autoscaling_group_configurations. Any map entry that does not specify asg_instance_root_volume_iops will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="asg_default_instance_root_volume_name" requirement="optional" type="string">
<HclListItemDescription>

Default value for the asg_instance_root_volume_name field of autoscaling_group_configurations. Any map entry that does not specify asg_instance_root_volume_type will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;/dev/xvda&quot;"/>
</HclListItem>

<HclListItem name="asg_default_instance_root_volume_size" requirement="optional" type="number">
<HclListItemDescription>

Default value for the asg_instance_root_volume_size field of autoscaling_group_configurations. Any map entry that does not specify asg_instance_root_volume_size will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="40"/>
</HclListItem>

<HclListItem name="asg_default_instance_root_volume_throughput" requirement="optional" type="number">
<HclListItemDescription>

Default value for the asg_instance_root_volume_throughput field of autoscaling_group_configurations. Any map entry that does not specify asg_instance_root_volume_throughput will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="asg_default_instance_root_volume_type" requirement="optional" type="string">
<HclListItemDescription>

Default value for the asg_instance_root_volume_type field of autoscaling_group_configurations. Any map entry that does not specify asg_instance_root_volume_type will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;standard&quot;"/>
</HclListItem>

<HclListItem name="asg_default_instance_type" requirement="optional" type="string">
<HclListItemDescription>

Default value for the asg_instance_type field of autoscaling_group_configurations. Any map entry that does not specify asg_instance_type will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;t3.medium&quot;"/>
</HclListItem>

<HclListItem name="asg_default_instance_user_data_base64" requirement="optional" type="string">
<HclListItemDescription>

Default value for the asg_instance_user_data_base64 field of autoscaling_group_configurations. Any map entry that does not specify asg_instance_user_data_base64 will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="asg_default_max_size" requirement="optional" type="number">
<HclListItemDescription>

Default value for the max_size field of autoscaling_group_configurations. Any map entry that does not specify max_size will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="2"/>
</HclListItem>

<HclListItem name="asg_default_min_size" requirement="optional" type="number">
<HclListItemDescription>

Default value for the min_size field of autoscaling_group_configurations. Any map entry that does not specify min_size will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="asg_default_multi_instance_overrides" requirement="optional" type="any">
<HclListItemDescription>

Default value for the multi_instance_overrides field of autoscaling_group_configurations. Any map entry that does not specify multi_instance_overrides will use this value.

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
   [
     {
       instance_type = "t3.micro"
       weighted_capacity = 2
     },
     {
       instance_type = "t3.medium"
       weighted_capacity = 1
     },
   ]

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Ideally, we would use a concrete type here, but terraform doesn't support optional attributes yet, so we have to
   resort to the untyped any.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="asg_default_on_demand_allocation_strategy" requirement="optional" type="string">
<HclListItemDescription>

Default value for the on_demand_allocation_strategy field of autoscaling_group_configurations. Any map entry that does not specify on_demand_allocation_strategy will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="asg_default_on_demand_base_capacity" requirement="optional" type="number">
<HclListItemDescription>

Default value for the on_demand_base_capacity field of autoscaling_group_configurations. Any map entry that does not specify on_demand_base_capacity will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="asg_default_on_demand_percentage_above_base_capacity" requirement="optional" type="number">
<HclListItemDescription>

Default value for the on_demand_percentage_above_base_capacity field of autoscaling_group_configurations. Any map entry that does not specify on_demand_percentage_above_base_capacity will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="asg_default_spot_allocation_strategy" requirement="optional" type="string">
<HclListItemDescription>

Default value for the spot_allocation_strategy field of autoscaling_group_configurations. Any map entry that does not specify spot_allocation_strategy will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="asg_default_spot_instance_pools" requirement="optional" type="number">
<HclListItemDescription>

Default value for the spot_instance_pools field of autoscaling_group_configurations. Any map entry that does not specify spot_instance_pools will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="asg_default_spot_max_price" requirement="optional" type="string">
<HclListItemDescription>

Default value for the spot_max_price field of autoscaling_group_configurations. Any map entry that does not specify spot_max_price will use this value. Set to empty string (default) to mean on-demand price.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="asg_default_tags" requirement="optional" type="list(object(…))">
<HclListItemDescription>

Default value for the tags field of autoscaling_group_configurations. Any map entry that does not specify tags will use this value.

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
</HclListItem>

<HclListItem name="asg_default_use_multi_instances_policy" requirement="optional" type="bool">
<HclListItemDescription>

Default value for the use_multi_instances_policy field of autoscaling_group_configurations. Any map entry that does not specify use_multi_instances_policy will use this value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="aws_partition" requirement="optional" type="string">
<HclListItemDescription>

The AWS partition used for default AWS Resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;aws&quot;"/>
</HclListItem>

<HclListItem name="cluster_instance_associate_public_ip_address" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to associate a public IP address to the instances of the cluster. Will only work if the instances are launched in a public subnet.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="cluster_instance_keypair_name" requirement="optional" type="string">
<HclListItemDescription>

The EC2 Keypair name used to SSH into the EKS Cluster's EC2 Instances. To disable keypairs, pass in blank.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

If you set this variable to false, this module will not create any resources. This is used as a workaround because Terraform does not allow you to use the 'count' parameter on modules. By using this parameter, you can optionally create or not create the resources within this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="custom_tags_security_group" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the Security Group for this EKS Cluster. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
     {
       key1 = "value1"
       key2 = "value2"
     }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="eks_control_plane_security_group_id" requirement="optional" type="string">
<HclListItemDescription>

Security group ID of the EKS Control Plane nodes to enhance to allow access to the control plane from the workers. Only used if `use_cluster_security_group` is `false`. Set to null to use the first security group assigned to the cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="enable_instance_metadata_tags" requirement="optional" type="bool">
<HclListItemDescription>

When true, the Instance Metadata Service will expose the tags of the instance.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enabled_metrics" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of metrics to collect from the ASG. For a list of allowed values, see https://www.terraform.io/docs/providers/aws/r/autoscaling_group.html#enabled_metrics.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="force_detach_policies" requirement="optional" type="bool">
<HclListItemDescription>

Whether to force detaching any policies the role has before destroying it. If policies are attached to the role via the aws_iam_policy_attachment resource and you are modifying the role name or path, the force_detach_policies argument must be set to true and applied before attempting the operation otherwise you will encounter a DeleteConflict error. The aws_iam_role_policy_attachment resource (recommended) does not have this requirement.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="iam_instance_profile_name" requirement="optional" type="string">
<HclListItemDescription>

Custom name for the IAM instance profile. When null, the IAM role name will be used. If <a href="#use_resource_name_prefix"><code>use_resource_name_prefix</code></a> is true, this will be used as a name prefix.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="iam_role_already_exists" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not the IAM role used for the workers already exists. When false, this module will create a new IAM role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="iam_role_arn" requirement="optional" type="string">
<HclListItemDescription>

ARN of the IAM role to use if iam_role_already_exists = true. When null, uses iam_role_name to lookup the ARN. One of iam_role_name and iam_role_arn is required (must be non-null) if iam_role_already_exists is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

Custom name for the IAM role. When null, a default name based on cluster_name will be used. One of iam_role_name and iam_role_arn is required (must be non-null) if iam_role_already_exists is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="include_autoscaler_discovery_tags" requirement="optional" type="bool">
<HclListItemDescription>

Adds additional tags to each ASG that allow a cluster autoscaler to auto-discover them.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="load_balancers" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of elastic load balancer names to add to the autoscaling group names. Use with ELB classic and NLBs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="max_instance_lifetime" requirement="optional" type="number">
<HclListItemDescription>

The maximum amount of time, in seconds, that an instance inside an ASG can be in service, values must be either equal to 0 or between 604800 and 31536000 seconds. Note that this will be a disruptive shutdown: the ASG will not automatically drain the node prior to shutting it down.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="name_prefix" requirement="optional" type="string">
<HclListItemDescription>

Prefix resource names with this string. When you have multiple worker groups for the cluster, you can use this to namespace the resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="name_suffix" requirement="optional" type="string">
<HclListItemDescription>

Suffix resource names with this string. When you have multiple worker groups for the cluster, you can use this to namespace the resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="target_group_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of aws_alb_target_group ARNs, for use with Application Load Balancing.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="tenancy" requirement="optional" type="string">
<HclListItemDescription>

The tenancy of the servers in this cluster. Must be one of: default, dedicated, or host.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;default&quot;"/>
</HclListItem>

<HclListItem name="use_cluster_security_group" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to attach the EKS managed cluster security group to the worker nodes for control plane and cross worker network management. Avoiding the cluster security group allows you to better isolate worker nodes at the network level (E.g., disallowing free flowing traffic between Fargate Pods and self managed workers). It is recommended to use the cluster security group for most use cases. Refer to the module README for more information. If use_existing_cluster_config is false and this is set to true, it is assumed that the cluster security group is provided in <a href="#additional_security_group_ids"><code>additional_security_group_ids</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="use_existing_cluster_config" requirement="optional" type="bool">
<HclListItemDescription>

When true, this module will retrieve vpc config and security group ids from the existing cluster with the provided cluster_name. When false, you must provide <a href="#vpc_id"><code>vpc_id</code></a> and <a href="#eks_control_plane_security_group_id"><code>eks_control_plane_security_group_id</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="use_imdsv1" requirement="optional" type="bool">
<HclListItemDescription>

Set this variable to true to enable the use of Instance Metadata Service Version 1 in this module's aws_launch_configuration. Note that while IMDsv2 is preferred due to its special security hardening, we allow this in order to support the use case of AMIs built outside of these modules that depend on IMDSv1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="use_managed_iam_policies" requirement="optional" type="bool">
<HclListItemDescription>

When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="use_resource_name_prefix" requirement="optional" type="bool">
<HclListItemDescription>

When true, all the relevant resources will be set to use the name_prefix attribute so that unique names are generated for them. This allows those resources to support recreation through create_before_destroy lifecycle rules. Set to false if you were using any version before 0.45.0 and wish to avoid recreating the entire worker pool on your cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="vpc_id" requirement="optional" type="string">
<HclListItemDescription>

VPC id for the EKS cluster deployment.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="eks_worker_asg_arns">
<HclListItemDescription>

AWS ARNs of the auto scaling groups for the EKS worker nodes.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_worker_asg_ids">
<HclListItemDescription>

AWS IDs of the auto scaling group for the EKS worker nodes.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_worker_asg_names">
<HclListItemDescription>

Names of the auto scaling groups for the EKS worker nodes.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_worker_iam_role_arn">
<HclListItemDescription>

AWS ARN identifier of the IAM role created for the EKS worker nodes.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_worker_iam_role_name">
<HclListItemDescription>

Name of the IAM role created for the EKS worker nodes.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_worker_security_group_id">
<HclListItemDescription>

AWS ID of the security group created for the EKS worker nodes.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.71.0/modules/eks-cluster-workers/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.71.0/modules/eks-cluster-workers/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.71.0/modules/eks-cluster-workers/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "c7b7538c95ac6f4a7864716210d0cec9"
}
##DOCS-SOURCER-END -->
