---
title: "K8S Cluster Autoscaler Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon EKS" version="0.77.0" lastModifiedVersion="0.77.0"/>

# K8S Cluster Autoscaler Module

<a href="https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.77.0/modules/eks-k8s-cluster-autoscaler" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.77.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module installs a [Cluster Autoscaler](https://github.com/kubernetes/autoscaler/tree/b6d53e8/cluster-autoscaler)
to automatically scale up and down the nodes in a cluster in response to resource utilization.

This module is responsible for manipulating each Auto Scaling Group (ASG) that was created by the [EKS cluster
workers](https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.77.0/modules/eks-cluster-workers) module. By default, the ASG is configured to allow zero-downtime
deployments but is not configured to scale automatically. You must launch an [EKS control
plane](https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.77.0/modules/eks-cluster-control-plane) with worker nodes for this module to function.

## IAM Policy Considerations

There are two primary methods of granting permissions to the cluster autoscaler to allow scaling activities: Tag Based Policies and Resource Based Policies.
The Resource Based method restricts the cluster autoscaler IAM Role Policy to the specific ASG ARNs to esnure only ASGs used within the EKS cluster are allowed to be modified by the cluster autoscaler. The Resource Based policy is enabled by setting the variable `cluster_autoscaler_absolute_arns` to `true` (this is the default setting). There have been issues with this at scale due to IAM Policy size limitations. At scale, the recommended approach is to use a Tag Based Policy instead. A Tag Based Policy is more dynamic as it will permit the cluster autoscaler to modify ASGs of the EKS cluster IF they have the tag `k8s.io/cluster-autoscaler/<cluster name>` present. This keeps the IAM Policy size minimal and it supports a dynamic environment by discovering ASGs based on the well-known cluster autoscaler tag being present. To enable the Tag Based Policy, set the variable `cluster_autoscaler_absolute_arns` to `false`.

## Important Considerations

*   The autoscaler doesn't account for CPU or Memory usage in deciding to scale up, it scales up when Pods fail to
    schedule due to insufficient resources. This means it's important to carefully the manage the compute resources you
    assign to your deployments. See [the Kubernetes
    documentation](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container) on compute
    resources for more information.
*   Scaling down happens when utilization dips below a specified threshold and there are pods that are able to be moved
    to another node. There are [a variety of conditions](https://github.com/kubernetes/autoscaler/blob/b6d53e8/cluster-autoscaler/FAQ.md#what-types-of-pods-can-prevent-ca-from-removing-a-node)
    to be aware of that can prevent pods from being automatically removable which can result in wasted capacity.

## How do I deploy the Pods to Fargate?

To deploy the Pods to Fargate, you can use the `create_fargate_profile` variable to `true` and specify the subnet IDs
for Fargate using `vpc_worker_subnet_ids`. Note that if you are using Fargate, you must rely on the IAM Roles for
Service Accounts (IRSA) feature to grant the necessary AWS IAM permissions to the Pod. This is configured using the
`use_iam_role_for_service_accounts`, `eks_openid_connect_provider_arn`, and `eks_openid_connect_provider_url` input
variables.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-K8S-CLUSTER-AUTOSCALER MODULE
# ------------------------------------------------------------------------------------------------------

module "eks_k_8_s_cluster_autoscaler" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-k8s-cluster-autoscaler?ref=v0.77.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS region that the EKS cluster resides in.
  aws_region = <string>

  # The name of the EKS cluster (e.g. eks-prod). This is used to assist with
  # auto-discovery of the cluster workers ASG.
  eks_cluster_name = <string>

  # Configuration for using the IAM role with Service Accounts feature to
  # provide permissions to the helm charts. This expects a map with two
  # properties: `openid_connect_provider_arn` and `openid_connect_provider_url`.
  # The `openid_connect_provider_arn` is the ARN of the OpenID Connect Provider
  # for EKS to retrieve IAM credentials, while `openid_connect_provider_url` is
  # the URL. Set to null if you do not wish to use IAM role with Service
  # Accounts.
  iam_role_for_service_accounts_config = <object(
    openid_connect_provider_arn = string
    openid_connect_provider_url = string
  )>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A map of custom tags to apply to the Autoscaler Fargate Profile IAM Role if
  # enabled. The key is the tag name and the value is the tag value.
  autoscaler_fargate_profile_iam_role_tags = {}

  # A map of custom tags to apply to the Autoscaler Fargate Profile if enabled.
  # The key is the tag name and the value is the tag value.
  autoscaler_fargate_profile_tags = {}

  # A map of custom tags to apply to the Autoscaler IAM Policies if enabled. The
  # key is the tag name and the value is the tag value.
  autoscaler_iam_policy_tags = {}

  # ARN of permissions boundary to apply to the autoscaler IAM role - the IAM
  # role created for the Autoscaler
  autoscaler_iam_role_permissions_boundary = null

  # A map of custom tags to apply to the Autoscaler IAM Role if enabled. The key
  # is the tag name and the value is the tag value.
  autoscaler_iam_role_tags = {}

  # The AWS partition used for default AWS Resources.
  aws_partition = "aws"

  # Restrict the cluster autoscaler to a list of absolute ASG ARNs upon initial
  # apply to ensure no new ASGs can be managed by the autoscaler without
  # explicitly running another apply. Setting this to false will ensure that the
  # cluster autoscaler is automatically given access to manage any new ASGs with
  # the k8s.io/cluster-autoscaler/CLUSTER_NAME tag applied.
  cluster_autoscaler_absolute_arns = true

  # The version of the cluster-autoscaler helm chart to deploy. Note that this
  # is different from the app/container version, which is sepecified with
  # var.cluster_autoscaler_version.
  cluster_autoscaler_chart_version = "9.21.0"

  # Which docker repository to use to install the cluster autoscaler. Check the
  # following link for valid repositories to use
  # https://github.com/kubernetes/autoscaler/releases
  cluster_autoscaler_repository = "registry.k8s.io/autoscaling/cluster-autoscaler"

  # ARN of IAM Role to use for the Cluster Autoscaler. Only used when
  # var.create_cluster_autoscaler_role is false.
  cluster_autoscaler_role_arn = null

  # Which version of the cluster autoscaler to install.
  cluster_autoscaler_version = "v1.31.0"

  # Map of extra arguments to pass to the container.
  container_extra_args = {}

  # When set to true, create a new dedicated IAM Role for the cluster
  # autoscaler. When set to true, var.iam_role_for_service_accounts_config is
  # required.
  create_cluster_autoscaler_role = true

  # When set to true, create a dedicated Fargate execution role for the cluster
  # autoscaler. When false, you must provide an existing fargate execution role
  # in the variable var.pod_execution_iam_role_arn. Only used if
  # var.create_fargate_profile is true.
  create_fargate_execution_role = false

  # When set to true, create a dedicated Fargate execution profile for the
  # cluster autoscaler.
  create_fargate_profile = false

  # Tags to apply to all AWS resources managed by this module.
  default_tags = {}

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # If scaling_strategy is set to 'priority', you can use this variable to
  # define cluster-autoscaler-priority-expander priorities. See:
  # https://github.com/kubernetes/autoscaler/blob/b6d53e8/cluster-autoscaler/expander/priority/readme.md
  expander_priorities = {}

  # Which Kubernetes Namespace to deploy the chart into.
  namespace = "kube-system"

  # Annotations to apply to the Pod that is deployed, as key value pairs.
  pod_annotations = {}

  # ARN of IAM Role to use as the Pod execution role for Fargate. Set to null
  # (default) to create a new one. Only used when var.create_fargate_profile is
  # true.
  pod_execution_iam_role_arn = null

  # Labels to apply to the Pod that is deployed, as key value pairs.
  pod_labels = {}

  # Configure affinity rules for the Pod to control which nodes to schedule on.
  # Each item in the list should be a map with the keys `key`, `values`, and
  # `operator`, corresponding to the 3 properties of matchExpressions. Note that
  # all expressions must be satisfied to schedule on the node.
  pod_node_affinity = []

  # Configure priorityClassName of pods to allow scheduler to order pending pods
  # by their priority.
  pod_priority_class_name = null

  # Number of replicas of the cluster autoscaler Pod to deploy.
  pod_replica_count = 1

  # Pod resource requests and limits to use. Refer to
  # https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
  # for more information.
  pod_resources = null

  # Configure tolerations rules to allow the Pod to schedule on nodes that have
  # been tainted. Each item in the list specifies a toleration rule.
  pod_tolerations = []

  # If scaling_strategy is set to 'priority', you can use this to specify
  # annotations to add to the cluster-autoscaler-priority-expander ConfigMap.
  priority_config_map_annotations = {}

  # The name of the helm release to use. Using different release names are
  # useful for deploying different copies of the cluster autoscaler.
  release_name = "cluster-autoscaler"

  # Specifies an 'expander' for the cluster autoscaler. This helps determine
  # which ASG to scale when additional resource capacity is needed.
  scaling_strategy = "least-waste"

  # The name of the service account to create for the cluster autoscaler.
  service_account_name = "cluster-autoscaler-aws-cluster-autoscaler"

  # A list of the subnets into which the EKS Cluster's administrative pods will
  # be launched. These should usually be all private subnets and include one in
  # each AWS Availability Zone. Required when var.create_fargate_profile is
  # true.
  vpc_worker_subnet_ids = []

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-K8S-CLUSTER-AUTOSCALER MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-k8s-cluster-autoscaler?ref=v0.77.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS region that the EKS cluster resides in.
  aws_region = <string>

  # The name of the EKS cluster (e.g. eks-prod). This is used to assist with
  # auto-discovery of the cluster workers ASG.
  eks_cluster_name = <string>

  # Configuration for using the IAM role with Service Accounts feature to
  # provide permissions to the helm charts. This expects a map with two
  # properties: `openid_connect_provider_arn` and `openid_connect_provider_url`.
  # The `openid_connect_provider_arn` is the ARN of the OpenID Connect Provider
  # for EKS to retrieve IAM credentials, while `openid_connect_provider_url` is
  # the URL. Set to null if you do not wish to use IAM role with Service
  # Accounts.
  iam_role_for_service_accounts_config = <object(
    openid_connect_provider_arn = string
    openid_connect_provider_url = string
  )>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A map of custom tags to apply to the Autoscaler Fargate Profile IAM Role if
  # enabled. The key is the tag name and the value is the tag value.
  autoscaler_fargate_profile_iam_role_tags = {}

  # A map of custom tags to apply to the Autoscaler Fargate Profile if enabled.
  # The key is the tag name and the value is the tag value.
  autoscaler_fargate_profile_tags = {}

  # A map of custom tags to apply to the Autoscaler IAM Policies if enabled. The
  # key is the tag name and the value is the tag value.
  autoscaler_iam_policy_tags = {}

  # ARN of permissions boundary to apply to the autoscaler IAM role - the IAM
  # role created for the Autoscaler
  autoscaler_iam_role_permissions_boundary = null

  # A map of custom tags to apply to the Autoscaler IAM Role if enabled. The key
  # is the tag name and the value is the tag value.
  autoscaler_iam_role_tags = {}

  # The AWS partition used for default AWS Resources.
  aws_partition = "aws"

  # Restrict the cluster autoscaler to a list of absolute ASG ARNs upon initial
  # apply to ensure no new ASGs can be managed by the autoscaler without
  # explicitly running another apply. Setting this to false will ensure that the
  # cluster autoscaler is automatically given access to manage any new ASGs with
  # the k8s.io/cluster-autoscaler/CLUSTER_NAME tag applied.
  cluster_autoscaler_absolute_arns = true

  # The version of the cluster-autoscaler helm chart to deploy. Note that this
  # is different from the app/container version, which is sepecified with
  # var.cluster_autoscaler_version.
  cluster_autoscaler_chart_version = "9.21.0"

  # Which docker repository to use to install the cluster autoscaler. Check the
  # following link for valid repositories to use
  # https://github.com/kubernetes/autoscaler/releases
  cluster_autoscaler_repository = "registry.k8s.io/autoscaling/cluster-autoscaler"

  # ARN of IAM Role to use for the Cluster Autoscaler. Only used when
  # var.create_cluster_autoscaler_role is false.
  cluster_autoscaler_role_arn = null

  # Which version of the cluster autoscaler to install.
  cluster_autoscaler_version = "v1.31.0"

  # Map of extra arguments to pass to the container.
  container_extra_args = {}

  # When set to true, create a new dedicated IAM Role for the cluster
  # autoscaler. When set to true, var.iam_role_for_service_accounts_config is
  # required.
  create_cluster_autoscaler_role = true

  # When set to true, create a dedicated Fargate execution role for the cluster
  # autoscaler. When false, you must provide an existing fargate execution role
  # in the variable var.pod_execution_iam_role_arn. Only used if
  # var.create_fargate_profile is true.
  create_fargate_execution_role = false

  # When set to true, create a dedicated Fargate execution profile for the
  # cluster autoscaler.
  create_fargate_profile = false

  # Tags to apply to all AWS resources managed by this module.
  default_tags = {}

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # If scaling_strategy is set to 'priority', you can use this variable to
  # define cluster-autoscaler-priority-expander priorities. See:
  # https://github.com/kubernetes/autoscaler/blob/b6d53e8/cluster-autoscaler/expander/priority/readme.md
  expander_priorities = {}

  # Which Kubernetes Namespace to deploy the chart into.
  namespace = "kube-system"

  # Annotations to apply to the Pod that is deployed, as key value pairs.
  pod_annotations = {}

  # ARN of IAM Role to use as the Pod execution role for Fargate. Set to null
  # (default) to create a new one. Only used when var.create_fargate_profile is
  # true.
  pod_execution_iam_role_arn = null

  # Labels to apply to the Pod that is deployed, as key value pairs.
  pod_labels = {}

  # Configure affinity rules for the Pod to control which nodes to schedule on.
  # Each item in the list should be a map with the keys `key`, `values`, and
  # `operator`, corresponding to the 3 properties of matchExpressions. Note that
  # all expressions must be satisfied to schedule on the node.
  pod_node_affinity = []

  # Configure priorityClassName of pods to allow scheduler to order pending pods
  # by their priority.
  pod_priority_class_name = null

  # Number of replicas of the cluster autoscaler Pod to deploy.
  pod_replica_count = 1

  # Pod resource requests and limits to use. Refer to
  # https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
  # for more information.
  pod_resources = null

  # Configure tolerations rules to allow the Pod to schedule on nodes that have
  # been tainted. Each item in the list specifies a toleration rule.
  pod_tolerations = []

  # If scaling_strategy is set to 'priority', you can use this to specify
  # annotations to add to the cluster-autoscaler-priority-expander ConfigMap.
  priority_config_map_annotations = {}

  # The name of the helm release to use. Using different release names are
  # useful for deploying different copies of the cluster autoscaler.
  release_name = "cluster-autoscaler"

  # Specifies an 'expander' for the cluster autoscaler. This helps determine
  # which ASG to scale when additional resource capacity is needed.
  scaling_strategy = "least-waste"

  # The name of the service account to create for the cluster autoscaler.
  service_account_name = "cluster-autoscaler-aws-cluster-autoscaler"

  # A list of the subnets into which the EKS Cluster's administrative pods will
  # be launched. These should usually be all private subnets and include one in
  # each AWS Availability Zone. Required when var.create_fargate_profile is
  # true.
  vpc_worker_subnet_ids = []

}


```

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.77.0/modules/eks-k8s-cluster-autoscaler/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.77.0/modules/eks-k8s-cluster-autoscaler/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.77.0/modules/eks-k8s-cluster-autoscaler/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "e5946ed4a1982a51dc8387d433c1981f"
}
##DOCS-SOURCER-END -->
