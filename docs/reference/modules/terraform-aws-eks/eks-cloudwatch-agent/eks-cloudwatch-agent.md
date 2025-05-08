---
title: "EKS CloudWatch Agent Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon EKS" version="1.0.1" lastModifiedVersion="0.72.1"/>

# EKS CloudWatch Agent Module

<a href="https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.0.1/modules/eks-cloudwatch-agent" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.72.1" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module installs and configures
[Amazon CloudWatch Agent](https://github.com/aws/amazon-cloudwatch-agent/) on an EKS cluster, so that
each node runs the agent to collect more system-level metrics from Amazon EC2 instances and ship them to Amazon CloudWatch.
This extra metric data allows using [CloudWatch Container Insights](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContainerInsights.html)
for a single pane of glass for application, performance, host, control plane, data plane insights.

This module uses the [community helm chart](https://github.com/aws/eks-charts/tree/8b063ec/stable/aws-cloudwatch-metrics),
with a set of best practices inputs.

**This module is for setting up CloudWatch Agent for EKS clusters with worker nodes (self-managed or managed node groups) that
have support for [`DaemonSets`](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/). CloudWatch Container
Insights is [not supported for EKS Fargate](https://github.com/aws/containers-roadmap/issues/920).**

## How does this work?

CloudWatch automatically collects metrics for many resources, such as CPU, memory, disk, and network.
Container Insights also provides diagnostic information, such as container restart failures,
to help you isolate issues and resolve them quickly.

In Amazon EKS and Kubernetes, using Container Insights requires using a containerized version of the CloudWatch agent
to discover all of the running containers in a cluster. It collects performance data at every layer of the performance
stack as log events using embedded metric format. From this data, CloudWatch creates aggregated metrics at the cluster,
node, pod, task, and service level as CloudWatch metrics. [The metrics that Container Insights collects](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Container-Insights-metrics-EKS.html)
are available in CloudWatch automatic dashboards, and also viewable in the Metrics section of the CloudWatch console.

`cloudwatch-agent` is installed as a Kubernetes
[`DaemonSet`](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/), which ensures that there is one
`cloudwatch-agent` `Pod` running per node. In this way, we are able to ensure that all workers in the cluster are running the
`cloudwatch-agent` service for shipping the metric data into CloudWatch.

Note that metrics collected by CloudWatch Agent are charged as custom metrics. For more information about CloudWatch pricing,
see [Amazon CloudWatch Pricing](https://aws.amazon.com/cloudwatch/pricing/).

You can read more about `cloudwatch-agent` in the [GitHub repository](https://github.com/aws/amazon-cloudwatch-agent/).
You can also learn more about Container Insights in the [official AWS
docs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContainerInsights.html).

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-CLOUDWATCH-AGENT MODULE
# ------------------------------------------------------------------------------------------------------

module "eks_cloudwatch_agent" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-cloudwatch-agent?ref=v1.0.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Name of the EKS cluster where resources are deployed to.
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

  # A map of custom tags to apply to the Agent IAM Role if enabled. The key is
  # the tag name and the value is the tag value.
  agent_iam_role_tags = {}

  # The Container repository to use for looking up the cloudwatch-agent
  # Container image when deploying the pods. When null, uses the default
  # repository set in the chart.
  aws_cloudwatch_agent_image_repository = null

  # Which version of amazon/cloudwatch-agent to install. When null, uses the
  # default version set in the chart.
  aws_cloudwatch_agent_version = null

  # The version of the aws-cloudwatch-metrics helm chart to deploy. Note that
  # this is different from the app/container version (use
  # var.aws_cloudwatch_agent_version to control the app/container version).
  aws_cloudwatch_metrics_chart_version = "0.0.7"

  # Tags to apply to all AWS resources managed by this module.
  default_tags = {}

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # Used to name IAM roles for the service account. Recommended when
  # var.iam_role_for_service_accounts_config is configured.
  iam_role_name_prefix = null

  # Namespace to create the resources in.
  namespace = "kube-system"

  # Configure affinity rules for the Pod to control which nodes to schedule on.
  # Each item in the list should be a map with the keys `key`, `values`, and
  # `operator`, corresponding to the 3 properties of matchExpressions. Note that
  # all expressions must be satisfied to schedule on the node.
  pod_node_affinity = []

  # Specify the resource limits and requests for the cloudwatch-agent pods. Set
  # to null (default) to use chart defaults.
  pod_resources = null

  # Configure tolerations rules to allow the Pod to schedule on nodes that have
  # been tainted. Each item in the list specifies a toleration rule.
  pod_tolerations = []

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-CLOUDWATCH-AGENT MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-cloudwatch-agent?ref=v1.0.1"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Name of the EKS cluster where resources are deployed to.
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

  # A map of custom tags to apply to the Agent IAM Role if enabled. The key is
  # the tag name and the value is the tag value.
  agent_iam_role_tags = {}

  # The Container repository to use for looking up the cloudwatch-agent
  # Container image when deploying the pods. When null, uses the default
  # repository set in the chart.
  aws_cloudwatch_agent_image_repository = null

  # Which version of amazon/cloudwatch-agent to install. When null, uses the
  # default version set in the chart.
  aws_cloudwatch_agent_version = null

  # The version of the aws-cloudwatch-metrics helm chart to deploy. Note that
  # this is different from the app/container version (use
  # var.aws_cloudwatch_agent_version to control the app/container version).
  aws_cloudwatch_metrics_chart_version = "0.0.7"

  # Tags to apply to all AWS resources managed by this module.
  default_tags = {}

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # Used to name IAM roles for the service account. Recommended when
  # var.iam_role_for_service_accounts_config is configured.
  iam_role_name_prefix = null

  # Namespace to create the resources in.
  namespace = "kube-system"

  # Configure affinity rules for the Pod to control which nodes to schedule on.
  # Each item in the list should be a map with the keys `key`, `values`, and
  # `operator`, corresponding to the 3 properties of matchExpressions. Note that
  # all expressions must be satisfied to schedule on the node.
  pod_node_affinity = []

  # Specify the resource limits and requests for the cloudwatch-agent pods. Set
  # to null (default) to use chart defaults.
  pod_resources = null

  # Configure tolerations rules to allow the Pod to schedule on nodes that have
  # been tainted. Each item in the list specifies a toleration rule.
  pod_tolerations = []

}


```

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.0.1/modules/eks-cloudwatch-agent/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.0.1/modules/eks-cloudwatch-agent/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.0.1/modules/eks-cloudwatch-agent/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "eeee38a2057c596c7a6046f6c78cc42d"
}
##DOCS-SOURCER-END -->
