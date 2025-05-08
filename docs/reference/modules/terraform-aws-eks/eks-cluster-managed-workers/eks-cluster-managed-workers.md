---
title: "EKS Cluster Managed Workers Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon EKS" version="1.0.1" lastModifiedVersion="0.72.1"/>

# EKS Cluster Managed Workers Module

<a href="https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.0.1/modules/eks-cluster-managed-workers" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.72.1" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

**This module provisions [EKS Managed Node Groups](https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html), as opposed to self managed ASGs. See the [eks-cluster-workers](https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.0.1/modules/eks-cluster-workers) module for a module to provision self managed worker groups.**

This Terraform module launches worker nodes using [EKS Managed Node
Groups](https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html) that you can use to run Kubernetes
Pods and Deployments.

This module is responsible for the EKS Worker Nodes in [the EKS cluster
topology](https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.0.1/modules/eks-cluster-control-plane/README.md#what-is-an-eks-cluster). You must launch a control plane in order
for the worker nodes to function. See the [eks-cluster-control-plane module](https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.0.1/modules/eks-cluster-control-plane) for
managing an EKS control plane.

## Differences with self managed workers

Managed Node Groups is a feature of EKS where you rely on EKS to manage the lifecycle of your worker nodes. This
includes:

*   Automatic IAM role registration
*   Upgrades to platform versions and AMIs
*   Scaling up and down
*   Security Groups

Instead of manually managing Auto Scaling Groups and AMIs, you rely on EKS to manage those for you. This allows you to
offload concerns such as upgrading and graceful scale out of your worker pools to AWS so that you don't have to manage
them using tools like `kubergrunt`.

Which flavor of worker pools to use depends on your infrastructure needs. Note that you can have both managed and self
managed worker pools on a single EKS cluster, should you find the need for additional customizations.

Here is a list of additional tradeoffs to consider between the two flavors:

|                                 | Managed Node Groups                                                                                                        | Self Managed Node Groups                                                                                                 |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| Graceful Scale in and Scale out | Supported automatically without needing additional tooling.                                                                | Requires specialized tooling (e.g `kubergrunt`) to implement.                                                            |
| Boot scripts                    | Not supported.                                                                                                             | Supported via user-data scripts in the ASG configuration.                                                                |
| OS                              | Only supports Amazon Linux.                                                                                                | Supports any arbitrary AMI, including Windows.                                                                           |
| SSH access                      | Only supports EC2 key pair, and restrictions by Security Group ID.                                                         | Supports any PAM customized either in the AMI or boot scripts. Also supports any arbitrary security group configuration. |
| EBS Volumes                     | Only supports adjusting the root EBS volume.                                                                               | Supports any EBS volume configuration, including attaching additional block devices.                                     |
| ELB                             | Supports automatic configuration via Kubernetes mechanisms. There is no way to manually register target groups to the ASG. | Supports both automatic configuration by Kubernetes, and manual configuration with target group registration.            |
| GPU support                     | Supported via the GPU compatible EKS Optimized AMI.                                                                        | Supported via a GPU compatible AMI.                                                                                      |

## How do I enable cluster auto-scaling?

This module will not automatically scale in response to resource usage by default, the
`autoscaling_group_configurations.*.max_size` option is only used to give room for new instances during rolling updates.
To enable auto-scaling in response to resource utilization, deploy the [Kubernetes Cluster Autoscaler module](https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.0.1/modules/eks-k8s-cluster-autoscaler).

Note that the cluster autoscaler supports ASGs that manage nodes in a single availability zone or ASGs that manage nodes in multiple availability zones. However, there is a caveat:

*   If you intend to use EBS volumes, you need to make sure that the autoscaler scales the correct ASG for pods that are localized to the availability zone. This is because EBS volumes are local to the availability zone. You need to carefully provision the managed node groups such that you have one group per AZ if you wish to use the cluster autoscaler in this case, which you can do by ensuring that the `subnet_ids` in each `autoscaling_group_configurations` input map entry come from the same AZ.

*   You can certainly use a single ASG that spans multiple AZs if you don't intend to use EBS volumes.

*   AWS now supports EFS as a persistent storage solution with EKS. This can be used with ASGs that span a single or multiple AZs.

Refer to the [Kubernetes Autoscaler](https://github.com/kubernetes/autoscaler) documentation for more details.

## How do I roll out an update to the instances?

Due to the way managed node groups work in Terraform, currently there is no way to rotate the instances without downtime
when using terraform. Changes to the AMI or instance type will automatically cause the node group to be replaced.
Additionally, the current resource does not support a mechanism to create the new group before destroying (the resource
does not support `name_prefix`, and you can't create a new node group with the same name). As such, a naive update to
the properties of the node group will likely lead to a period of reduced capacity as terraform replaces the groups.

To avoid downtime when updating your node groups, use a [blue-green
deployment](https://martinfowler.com/bliki/BlueGreenDeployment.html):

1.  Provision a new node group with the updated, desired properties. You can do this by adding a new entry into the input
    map `var.node_group_configurations`.
2.  Apply the updated config using `terraform apply` to create the replacement node group.
3.  Once the new node group scales up, remove the old node group configuration from the input map.
4.  Apply the updated config using `terraform apply` to remove the old node group. The managed node group will
    gracefully scale down the nodes in Kubernetes (honoring
    [PodDisruptionBudgets](https://kubernetes.io/docs/concepts/workloads/pods/disruptions/)) before terminating them.
    During this process, the workloads will reschedule to the new nodes.

## How do I perform a blue green release to roll out new versions of the module?

Gruntwork tries to provide migration paths that avoid downtime when rolling out new versions of the module. These are
usually implemented as feature flags, or a list of state migration calls that allow you to avoid a resource recreation.
However, it is not always possible to avoid a resource recreation with Managed Node Groups.

When it is not possible to avoid resource recreation, you can perform a blue-green release of the entire worker pool. In
this deployment model, you can deploy a new worker pool using the updated module version, and migrate the Kubernetes
workload to the new cluster prior to spinning down the old one.

The following are the steps you can take to perform a blue-green release for this module:

*   Add a new module block that calls the `eks-cluster-managed-workers` module using the new version, leaving the old module block
    with the old version untouched. E.g.,

    ```
    # old version
    module "workers" {
      source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-cluster-managed-workers?ref=v0.37.2"
      # other args omitted for brevity
    }

    # new version
    module "workers_next_version" {
      source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-cluster-managed-workers?ref=v0.38.0"
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

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-CLUSTER-MANAGED-WORKERS MODULE
# ------------------------------------------------------------------------------------------------------

module "eks_cluster_managed_workers" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-cluster-managed-workers?ref=v1.0.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the EKS cluster (e.g. eks-prod). This is used to namespace all
  # the resources created by these templates.
  cluster_name = <string>

  # Configure one or more Node Groups to manage the EC2 instances in this
  # cluster.
  node_group_configurations = <any>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of Security Group IDs to allow SSH access from. Only used if
  # var.cluster_instance_keypair_name is set. Set to null to allow access from
  # all locations.
  allow_ssh_from_security_groups = []

  # Where to get the AMI from. Can be 'auto', 'launch_template', or
  # 'eks_nodegroup'. WARNING there are limitation on what the value is, check
  # the documentation for more information
  # https://docs.aws.amazon.com/eks/latest/userguide/launch-templates.html#mng-ami-id-conditions
  ami_source = "auto"

  # The AWS partition used for default AWS Resources.
  aws_partition = "aws"

  # The EC2 Keypair name used to SSH into the EKS Cluster's EC2 Instances. To
  # disable keypairs, pass in blank.
  cluster_instance_keypair_name = null

  # A map of key-value pairs of Kubernetes labels to apply to all EC2 instances,
  # across all Node Groups.
  common_labels = {}

  # A map of key-value pairs of AWS tags to apply to all EC2 instances, across
  # all Node Groups.
  common_tags = {}

  # If you set this variable to false, this module will not create any
  # resources. This is used as a workaround because Terraform does not allow you
  # to use the 'count' parameter on modules. By using this parameter, you can
  # optionally create or not create the resources within this module.
  create_resources = true

  # A map of default tags to apply to all supported resources in this module.
  # These tags will be merged with any other resource specific tags. The key is
  # the tag name and the value is the tag value.
  default_tags = {}

  # A map of custom tags to apply to the EKS Worker IAM Role. The key is the tag
  # name and the value is the tag value.
  eks_worker_iam_role_tags = {}

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

  # The version of Kubernetes to use for the AMI. Defaults to the Kubernetes
  # version of the EKS cluster.
  kubernetes_version = null

  # Tags assigned to a node group are mirrored to the underlaying autoscaling
  # group by default. If you want to disable this behaviour, set this flag to
  # false. Note that this assumes that there is a one-to-one mappping between
  # ASGs and Node Groups. If there is more than one ASG mapped to the Node
  # Group, then this will only apply the tags on the first one. Due to a
  # limitation in Terraform for_each where it can not depend on dynamic data, it
  # is currently not possible in the module to map the tags to all ASGs. If you
  # wish to apply the tags to all underlying ASGs, then it is recommended to
  # call the aws_autoscaling_group_tag resource in a separate terraform state
  # file outside of this module, or use a two-stage apply process.
  mirror_node_group_tags_to_asg = true

  # Prefix resource names with this string. When you have multiple worker groups
  # for the cluster, you can use this to namespace the resources.
  name_prefix = ""

  # Suffix resource names with this string. When you have multiple worker groups
  # for the cluster, you can use this to namespace the resources.
  name_suffix = ""

  # Default value for ami_type field of node_group_configurations.
  node_group_default_ami_type = "AL2_x86_64"

  # Default value for ami_version field of node_group_configurations.
  node_group_default_ami_version = null

  # Default value for capacity_type field of node_group_configurations.
  node_group_default_capacity_type = "ON_DEMAND"

  # Default value for desired_size field of node_group_configurations.
  node_group_default_desired_size = 1

  # Default value for disk_size field of node_group_configurations.
  node_group_default_disk_size = 30

  # Whether to force the roll out of release versions to the EKS workers. When
  # true, this will forcefully delete any pods after 15 minutes if it is not
  # able to safely drain the nodes. When null (default), this setting is false.
  node_group_default_force_update_version = null

  # Default value for instance_types field of node_group_configurations.
  node_group_default_instance_types = ["t3.medium"]

  # Default value for labels field of node_group_configurations. Unlike
  # common_labels which will always be merged in, these labels are only used if
  # the labels field is omitted from the configuration.
  node_group_default_labels = {}

  # Default value for launch_template field of node_group_configurations.
  node_group_default_launch_template = null

  # Default value for max_size field of node_group_configurations.
  node_group_default_max_size = 1

  # Default value for min_size field of node_group_configurations.
  node_group_default_min_size = 1

  # Default value for subnet_ids field of node_group_configurations.
  node_group_default_subnet_ids = null

  # Default value for tags field of node_group_configurations. Unlike
  # common_tags which will always be merged in, these tags are only used if the
  # tags field is omitted from the configuration.
  node_group_default_tags = {}

  # Default value for taint field of node_group_configurations. These taints are
  # only used if the taint field is omitted from the configuration.
  node_group_default_taints = []

  # The names of the node groups. When null, this value is automatically
  # calculated from the node_group_configurations map. This variable must be set
  # if any of the values of the node_group_configurations map depends on a
  # resource that is not available at plan time to work around terraform
  # limitations with for_each.
  node_group_names = null

  # ARN of permissions boundary to apply to the worker IAM role - the IAM role
  # created for the EKS worker nodes.
  worker_iam_role_permissions_boundary = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-CLUSTER-MANAGED-WORKERS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-cluster-managed-workers?ref=v1.0.1"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the EKS cluster (e.g. eks-prod). This is used to namespace all
  # the resources created by these templates.
  cluster_name = <string>

  # Configure one or more Node Groups to manage the EC2 instances in this
  # cluster.
  node_group_configurations = <any>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of Security Group IDs to allow SSH access from. Only used if
  # var.cluster_instance_keypair_name is set. Set to null to allow access from
  # all locations.
  allow_ssh_from_security_groups = []

  # Where to get the AMI from. Can be 'auto', 'launch_template', or
  # 'eks_nodegroup'. WARNING there are limitation on what the value is, check
  # the documentation for more information
  # https://docs.aws.amazon.com/eks/latest/userguide/launch-templates.html#mng-ami-id-conditions
  ami_source = "auto"

  # The AWS partition used for default AWS Resources.
  aws_partition = "aws"

  # The EC2 Keypair name used to SSH into the EKS Cluster's EC2 Instances. To
  # disable keypairs, pass in blank.
  cluster_instance_keypair_name = null

  # A map of key-value pairs of Kubernetes labels to apply to all EC2 instances,
  # across all Node Groups.
  common_labels = {}

  # A map of key-value pairs of AWS tags to apply to all EC2 instances, across
  # all Node Groups.
  common_tags = {}

  # If you set this variable to false, this module will not create any
  # resources. This is used as a workaround because Terraform does not allow you
  # to use the 'count' parameter on modules. By using this parameter, you can
  # optionally create or not create the resources within this module.
  create_resources = true

  # A map of default tags to apply to all supported resources in this module.
  # These tags will be merged with any other resource specific tags. The key is
  # the tag name and the value is the tag value.
  default_tags = {}

  # A map of custom tags to apply to the EKS Worker IAM Role. The key is the tag
  # name and the value is the tag value.
  eks_worker_iam_role_tags = {}

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

  # The version of Kubernetes to use for the AMI. Defaults to the Kubernetes
  # version of the EKS cluster.
  kubernetes_version = null

  # Tags assigned to a node group are mirrored to the underlaying autoscaling
  # group by default. If you want to disable this behaviour, set this flag to
  # false. Note that this assumes that there is a one-to-one mappping between
  # ASGs and Node Groups. If there is more than one ASG mapped to the Node
  # Group, then this will only apply the tags on the first one. Due to a
  # limitation in Terraform for_each where it can not depend on dynamic data, it
  # is currently not possible in the module to map the tags to all ASGs. If you
  # wish to apply the tags to all underlying ASGs, then it is recommended to
  # call the aws_autoscaling_group_tag resource in a separate terraform state
  # file outside of this module, or use a two-stage apply process.
  mirror_node_group_tags_to_asg = true

  # Prefix resource names with this string. When you have multiple worker groups
  # for the cluster, you can use this to namespace the resources.
  name_prefix = ""

  # Suffix resource names with this string. When you have multiple worker groups
  # for the cluster, you can use this to namespace the resources.
  name_suffix = ""

  # Default value for ami_type field of node_group_configurations.
  node_group_default_ami_type = "AL2_x86_64"

  # Default value for ami_version field of node_group_configurations.
  node_group_default_ami_version = null

  # Default value for capacity_type field of node_group_configurations.
  node_group_default_capacity_type = "ON_DEMAND"

  # Default value for desired_size field of node_group_configurations.
  node_group_default_desired_size = 1

  # Default value for disk_size field of node_group_configurations.
  node_group_default_disk_size = 30

  # Whether to force the roll out of release versions to the EKS workers. When
  # true, this will forcefully delete any pods after 15 minutes if it is not
  # able to safely drain the nodes. When null (default), this setting is false.
  node_group_default_force_update_version = null

  # Default value for instance_types field of node_group_configurations.
  node_group_default_instance_types = ["t3.medium"]

  # Default value for labels field of node_group_configurations. Unlike
  # common_labels which will always be merged in, these labels are only used if
  # the labels field is omitted from the configuration.
  node_group_default_labels = {}

  # Default value for launch_template field of node_group_configurations.
  node_group_default_launch_template = null

  # Default value for max_size field of node_group_configurations.
  node_group_default_max_size = 1

  # Default value for min_size field of node_group_configurations.
  node_group_default_min_size = 1

  # Default value for subnet_ids field of node_group_configurations.
  node_group_default_subnet_ids = null

  # Default value for tags field of node_group_configurations. Unlike
  # common_tags which will always be merged in, these tags are only used if the
  # tags field is omitted from the configuration.
  node_group_default_tags = {}

  # Default value for taint field of node_group_configurations. These taints are
  # only used if the taint field is omitted from the configuration.
  node_group_default_taints = []

  # The names of the node groups. When null, this value is automatically
  # calculated from the node_group_configurations map. This variable must be set
  # if any of the values of the node_group_configurations map depends on a
  # resource that is not available at plan time to work around terraform
  # limitations with for_each.
  node_group_names = null

  # ARN of permissions boundary to apply to the worker IAM role - the IAM role
  # created for the EKS worker nodes.
  worker_iam_role_permissions_boundary = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="cluster_name" requirement="required" type="string">
<HclListItemDescription>

The name of the EKS cluster (e.g. eks-prod). This is used to namespace all the resources created by these templates.

</HclListItemDescription>
</HclListItem>

<HclListItem name="node_group_configurations" requirement="required" type="any">
<HclListItemDescription>

Configure one or more Node Groups to manage the EC2 instances in this cluster.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Each configuration must be keyed by a unique string that will be used as a suffix for the node group name. The
   values support the following attributes:
  
  
   OPTIONAL (defaults to value of corresponding module input):
   - subnet_ids          list(string)       : (Defaults to value from var.node_group_default_subnet_ids) A list of the
                                              subnets into which the EKS Cluster's managed nodes will be launched.
                                              These should usually be all private subnets and include one in each AWS
                                              Availability Zone. NOTE: If using a cluster autoscaler with EBS volumes,
                                              each ASG may only belong to a single availability zone.
   - min_size            number             : (Defaults to value from var.node_group_default_min_size) The minimum
                                              number of EC2 Instances representing workers launchable for this EKS
                                              Cluster. Useful for auto-scaling limits.
   - max_size            number             : (Defaults to value from var.node_group_default_max_size) The maximum
                                              number of EC2 Instances representing workers that must be running for
                                              this EKS Cluster. We recommend making this at least twice the min_size,
                                              even if you don't plan on scaling the cluster up and down, as the extra
                                              capacity will be used to deploy updates to the cluster.
   - desired_size        number             : (Defaults to value from var.node_group_default_desired_size) The current
                                              desired number of EC2 Instances representing workers that must be running
                                              for this EKS Cluster.
   - instance_types      list(string)       : (Defaults to value from var.node_group_default_instance_types) A list of
                                              instance types (e.g., t3.medium) to use for the EKS Cluster's worker
                                              nodes. EKS will choose from this list of instance types when launching
                                              new instances. When using launch templates, this setting will override
                                              the configured instance type of the launch template.
   - capacity_type       string             : (Defaults to value from var.node_group_default_capacity_type) Type of capacity
                                              associated with the EKS Node Group. Valid values: ON_DEMAND, SPOT.
   - force_update_version bool              : (Defaults to value from var.node_group_default_force_update_version)
                                              Whether to force the roll out of release versions to the EKS workers.
                                              When true, this will forcefully delete any pods after 15 minutes if it is
                                              not able to safely drain the nodes.
   - launch_template     LaunchTemplate     : (Defaults to value from var.node_group_default_launch_template)
                                              Launch template to use for the node. Specify either Name or ID of launch
                                              template. Must include version. Although the API supports using the
                                              values "$Latest" and "$Default" to configure the version, this can lead
                                              to a perpetual diff. Use the `latest_version` or `default_version` output
                                              of the aws_launch_template data source or resource instead. See
                                              https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/eks_node_grouplaunch_template-configuration-block
                                              for more information.
   - disk_size           number             : (Defaults to value from var.node_group_default_disk_size) Root disk size
                                              in GiB for the worker nodes.
                                              Ignored if launch_template is configured.
   - ami_type            string             : (Defaults to value from var.node_group_default_ami_type) Type of Amazon
                                              Machine Image (e.g. AL2_x86_64, AL2_x86_64_GPU) associated with the EKS
                                              Node Group.
                                              Ignored if launch_template is configured.
   - ami_version         string             : (Defaults to value from var.node_group_default_ami_version) Version of
                                              the AMI to use for the EKS node groups. If null, the latest version for
                                              the given Kubernetes version will be used.
                                              Ignored if launch_template is configured.
   - tags                map(string)        : (Defaults to value from var.node_group_default_tags) Custom tags to apply
                                              to the EC2 Instances in this node group. This should be a key value pair,
                                              where the keys are tag keys and values are the tag values. Merged with
                                              var.common_tags.
   - labels              map(string)        : (Defaults to value from var.node_group_default_labels) Custom Kubernetes
                                              Labels to apply to the EC2 Instances in this node group. This should be a
                                              key value pair, where the keys are label keys and values are the label
                                              values. Merged with var.common_labels.
   - taints              list(map(string))  : (Defaults to value from var.node_group_default_taints) Custom Kubernetes
                                              taint to apply to the EC2 Instances in this node group. See below for
                                              structure of taints.
  
   Structure of LaunchTemplate object:
   - name     string  : The Name of the Launch Template to use. One of ID or Name should be provided.
   - id       string  : The ID of the Launch Template to use. One of ID or Name should be provided.
   - version  string  : The version of the Launch Template to use.
  
   Structure of Taints Object: [{},{}]
   - key     string  : The key of the taint. Maximum length of 63.
   - value   string  : The value of the taint. Maximum length of 63.
   - effect  string  : The effect of the taint. Valid values: NO_SCHEDULE, NO_EXECUTE, PREFER_NO_SCHEDULE.
  
   Example:
   node_group_configurations = {
     ngroup1 = {
       desired_size = 1
       min_size     = 1
       max_size     = 3
       subnet_ids  = [data.terraform_remote_state.vpc.outputs.private_app_subnet_ids[0]]
     }
     asg2 = {
       desired_size   = 1
       min_size       = 1
       max_size       = 3
       subnet_ids     = [data.terraform_remote_state.vpc.outputs.private_app_subnet_ids[0]]
       disk_size      = 50
     }
     ngroup2 = {}   Only defaults
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

### Optional

<HclListItem name="allow_ssh_from_security_groups" requirement="optional" type="list(string)">
<HclListItemDescription>

List of Security Group IDs to allow SSH access from. Only used if <a href="#cluster_instance_keypair_name"><code>cluster_instance_keypair_name</code></a> is set. Set to null to allow access from all locations.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="ami_source" requirement="optional" type="string">
<HclListItemDescription>

Where to get the AMI from. Can be 'auto', 'launch_template', or 'eks_nodegroup'. WARNING there are limitation on what the value is, check the documentation for more information https://docs.aws.amazon.com/eks/latest/userguide/launch-templates.html#mng-ami-id-conditions

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;auto&quot;"/>
</HclListItem>

<HclListItem name="aws_partition" requirement="optional" type="string">
<HclListItemDescription>

The AWS partition used for default AWS Resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;aws&quot;"/>
</HclListItem>

<HclListItem name="cluster_instance_keypair_name" requirement="optional" type="string">
<HclListItemDescription>

The EC2 Keypair name used to SSH into the EKS Cluster's EC2 Instances. To disable keypairs, pass in blank.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="common_labels" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of key-value pairs of Kubernetes labels to apply to all EC2 instances, across all Node Groups.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="common_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of key-value pairs of AWS tags to apply to all EC2 instances, across all Node Groups.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

If you set this variable to false, this module will not create any resources. This is used as a workaround because Terraform does not allow you to use the 'count' parameter on modules. By using this parameter, you can optionally create or not create the resources within this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="default_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of default tags to apply to all supported resources in this module. These tags will be merged with any other resource specific tags. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="eks_worker_iam_role_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the EKS Worker IAM Role. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
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

<HclListItem name="kubernetes_version" requirement="optional" type="string">
<HclListItemDescription>

The version of Kubernetes to use for the AMI. Defaults to the Kubernetes version of the EKS cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="mirror_node_group_tags_to_asg" requirement="optional" type="bool">
<HclListItemDescription>

Tags assigned to a node group are mirrored to the underlaying autoscaling group by default. If you want to disable this behaviour, set this flag to false. Note that this assumes that there is a one-to-one mappping between ASGs and Node Groups. If there is more than one ASG mapped to the Node Group, then this will only apply the tags on the first one. Due to a limitation in Terraform for_each where it can not depend on dynamic data, it is currently not possible in the module to map the tags to all ASGs. If you wish to apply the tags to all underlying ASGs, then it is recommended to call the aws_autoscaling_group_tag resource in a separate terraform state file outside of this module, or use a two-stage apply process.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
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

<HclListItem name="node_group_default_ami_type" requirement="optional" type="string">
<HclListItemDescription>

Default value for ami_type field of node_group_configurations.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;AL2_x86_64&quot;"/>
</HclListItem>

<HclListItem name="node_group_default_ami_version" requirement="optional" type="string">
<HclListItemDescription>

Default value for ami_version field of node_group_configurations.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="node_group_default_capacity_type" requirement="optional" type="string">
<HclListItemDescription>

Default value for capacity_type field of node_group_configurations.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ON_DEMAND&quot;"/>
</HclListItem>

<HclListItem name="node_group_default_desired_size" requirement="optional" type="number">
<HclListItemDescription>

Default value for desired_size field of node_group_configurations.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="node_group_default_disk_size" requirement="optional" type="number">
<HclListItemDescription>

Default value for disk_size field of node_group_configurations.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="node_group_default_force_update_version" requirement="optional" type="bool">
<HclListItemDescription>

Whether to force the roll out of release versions to the EKS workers. When true, this will forcefully delete any pods after 15 minutes if it is not able to safely drain the nodes. When null (default), this setting is false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="node_group_default_instance_types" requirement="optional" type="list(string)">
<HclListItemDescription>

Default value for instance_types field of node_group_configurations.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[
  &quot;t3.medium&quot;
]"/>
</HclListItem>

<HclListItem name="node_group_default_labels" requirement="optional" type="map(string)">
<HclListItemDescription>

Default value for labels field of node_group_configurations. Unlike common_labels which will always be merged in, these labels are only used if the labels field is omitted from the configuration.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="node_group_default_launch_template" requirement="optional" type="object(…)">
<HclListItemDescription>

Default value for launch_template field of node_group_configurations.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    name    = string
    id      = string
    version = string
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="node_group_default_max_size" requirement="optional" type="number">
<HclListItemDescription>

Default value for max_size field of node_group_configurations.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="node_group_default_min_size" requirement="optional" type="number">
<HclListItemDescription>

Default value for min_size field of node_group_configurations.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="node_group_default_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

Default value for subnet_ids field of node_group_configurations.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="node_group_default_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Default value for tags field of node_group_configurations. Unlike common_tags which will always be merged in, these tags are only used if the tags field is omitted from the configuration.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="node_group_default_taints" requirement="optional" type="list(map(…))">
<HclListItemDescription>

Default value for taint field of node_group_configurations. These taints are only used if the taint field is omitted from the configuration.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(map(string))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="node_group_names" requirement="optional" type="list(string)">
<HclListItemDescription>

The names of the node groups. When null, this value is automatically calculated from the node_group_configurations map. This variable must be set if any of the values of the node_group_configurations map depends on a resource that is not available at plan time to work around terraform limitations with for_each.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="worker_iam_role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

ARN of permissions boundary to apply to the worker IAM role - the IAM role created for the EKS worker nodes.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="eks_worker_asg_names">
<HclListItemDescription>

Map of Node Group names to Auto Scaling Group names

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_worker_asg_security_group_ids">
<HclListItemDescription>

Map of Node Group names to Auto Scaling Group security group IDs. Empty if <a href="#cluster_instance_keypair_name"><code>cluster_instance_keypair_name</code></a> is not set.

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

<HclListItem name="eks_worker_node_group_arns">
<HclListItemDescription>

Map of Node Group names to ARNs of the created EKS Node Groups

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.0.1/modules/eks-cluster-managed-workers/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.0.1/modules/eks-cluster-managed-workers/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.0.1/modules/eks-cluster-managed-workers/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "bd051f222a64500e3eea5a6dddcc47a7"
}
##DOCS-SOURCER-END -->
