---
title: "EKS K8s Karpenter Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon EKS" version="0.73.3" lastModifiedVersion="0.72.3"/>

# EKS K8s Karpenter Module

<a href="https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.73.3/modules/eks-k8s-karpenter" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.72.3" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Module can be used to deploy [Karpenter](https://karpenter.sh/) as an alternative to the [Cluster Autoscaler](https://github.com/kubernetes/autoscaler/tree/b6d53e8/cluster-autoscaler) for autoscaling capabilities of an EKS cluster.
This module will create all of the necessary resources for a functional installation of Karpenter as well as the installation of Karpenter. This module does not create Karpenter [Provisioners](https://karpenter.sh/v0.27.0/concepts/provisioners/) or [Node Templates](https://karpenter.sh/v0.27.0/concepts/node-templates/), only the installation of the Karpenter Controller. See the [Karpenter Example](https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.73.3/examples/eks-cluster-with-karpenter/) for an example of how to deploy the additional `CRDs` (Provisioners, Node Templates, etc) to the EKS cluster.

> Note: For EKS cluster autoscaling capabilities, either `Karpenter` OR the `cluster-autoscaler` should be used; not both. To migrate to using `karpenter` instead of the `cluster-autoscaler` see [Migrating to Karpenter from the Cluster Autoscaler](https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.73.3/modules/eks-k8s-karpenter/migrating-to-karpenter-from-cas.md)

To leverage the full power and potential of Karpenter, one must understand the [Karpenter Core Concepts](https://karpenter.sh/v0.27.0/concepts/). Deploying this module without additional configuration (ie deploying Karpenter CRDs) will not enable EKS cluster autoscaling. As use-cases are presented, we will do our best effort to continue to add meaningful examples to the [examples](https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.73.3/examples/) folder to help ease the complexities of configuring Karpenter. At minimum, one should configure and deploy a default `Provisioner` and `Node Template` for just in time node provisioning via Karpenter.

### Resources Created

This module will create the following core resources, some of which are optional which are noted in the [input variables](https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.73.3/modules/eks-k8s-karpenter/variables.tf):

| AWS Resource | Description |
| --- | --- |
| Karpenter Node IAM Role |  IAM Role used by Karpenter Nodes provisioned by the Karpenter Controller |
| Karpenter Node Instance Profile | IAM Instance Profile attached to EC2 instances launched by the Karpenter Controller |
| Karpenter Controller IRSA | IAM Role for Service Account (IRSA) to be used by the Karpenter Controller |
| Karpenter Helm Release | Karpenter deployment to EKS via Helm |
| Karpenter SQS Queue | SQS Queue used to listen to EC2 events |

Additional supporting resources do exist in addition to the table above, such as IAM Policy Documents, Attachments  and CloudWatch rules.

***

## What is Karpenter?

From the Karpenter official docs:

> [Karpenter](https://karpenter.sh/) is an open-source node provisioning project built for Kubernetes. Adding Karpenter to a Kubernetes cluster can dramatically improve the efficiency and cost of running workloads on that cluster.
>
> Karpenter works by:
>
> *   Watching for pods that the Kubernetes scheduler has marked as unschedulable
> *   Evaluating scheduling constraints (resource requests, nodeselectors, affinities, tolerations, and topology spread constraints) requested by the pods
> *   Provisioning nodes that meet the requirements of the pods
> *   Removing the nodes when the nodes are no longer needed

For additional details and in-depth information on Karpenter, please see the [Karpenter Docs Site](https://karpenter.sh/).

***

## How to enable de Deprovisioning based on EC2 events?

This is used to inform Karpenter of EC2 events that affect the cluster capacity ( Spot Interruption Warnings, Scheduled Change Health Events (Maintenance Events)
, Instance Terminating Events, Instance Stopping Events).

This is particularly useful to users that rely on Spot Instances that can be terminated at will.

For more information read the [Karpenter Intrerruption section](https://karpenter.sh/preview/concepts/deprovisioning/#interruption)

*   From [variables.tf](https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.73.3/modules/eks-k8s-karpenter/variables.tf) enable `create_karpenter_deprovisioning_queue`t

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-K8S-KARPENTER MODULE
# ------------------------------------------------------------------------------------------------------

module "eks_k_8_s_karpenter" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-k8s-karpenter?ref=v0.73.3"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS Region to create resources in.
  aws_region = <string>

  # URL endpoint of the Kubernetes control plane provided by EKS.
  eks_cluster_endpoint = <string>

  # The name of the EKS Cluster that Karpenter will be deployed to.
  eks_cluster_name = <string>

  # The ARN of the EKS OIDC provider. This is required if creating IRSA for the
  # Karpenter Controller.
  eks_openid_connect_provider_arn = <string>

  # The URL of the EKS OIDC provider. This is required if creating IRSA for the
  # Karpenter Controller.
  eks_openid_connect_provider_url = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Optionally create an IAM Role for Service Account (IRSA) for the Karpenter
  # Controller.
  create_karpenter_controller_irsa = true

  # Conditional flag to optionally create the Karpenter Deprovisioning Queue.
  create_karpenter_deprovisioning_queue = true

  # Conditional flag to create the Karpenter Node IAM Role. If this is set to
  # false, then an existing IAM Role must be provided with the
  # `karpenter_node_iam_role_arn` variable
  create_karpenter_node_iam_role = true

  # Conditional flag to optionally create resources in this module.
  create_resources = true

  # Tags to apply to all AWS resources managed by this module.
  default_tags = {}

  # Additional Helm chart values to pass to the Karpenter Helm chart. See the
  # official Karpenter Helm chart values file and documentation for available
  # configuration options.
  karpenter_chart_additional_values = {}

  # The Helm chart name for the Karpenter chart.
  karpenter_chart_name = "karpenter"

  # The k8s namespace that the Karpenter Helm chart will be deployed to.
  karpenter_chart_namespace = "karpenter"

  # The Helm release name for the Karpenter chart.
  karpenter_chart_release_name = "karpenter"

  # The Helm repository to obtain the Karpenter chart from.
  karpenter_chart_repository = "oci://public.ecr.aws/karpenter"

  # Optionally provide a Password for HTTP basic authentication against the
  # Karpenter Chart repository.
  karpenter_chart_repository_password = null

  # Optionally provide a Username for HTTP basic authentication against the
  # Karpenter Chart repository. 
  karpenter_chart_repository_username = null

  # Whether or not to install CRDs with the Karpenter Helm Chart. This should be
  # set to true if using the karpenter-crd Helm Chart
  # (karpenter_chart_additional_values = true).
  karpenter_chart_skip_crds = false

  # The version of the Karpenter Helm chart.
  karpenter_chart_version = "v0.37.5"

  # Provide an existing IAM Role ARN to be used with the Karpenter Controller
  # Service Account. This is required if `create_karpenter_controller_irsa` is
  # set to false.
  karpenter_controller_existing_role_arn = null

  # A map of custom tags to apply to the Karpenter Controller IAM Policies if
  # enabled. The key is the tag name and the value is the tag value.
  karpenter_controller_iam_policy_tags = {}

  # Additional tags to add to the Karpenter Controller IAM Role.
  karpenter_controller_iam_role_tags = {}

  # The Helm chart name for the Karpenter CRD chart.
  karpenter_crd_chart_name = "karpenter-crd"

  # The k8s namespace that the Karpenter CRD Helm chart will be deployed to.
  karpenter_crd_chart_namespace = "karpenter"

  # The Helm release name for the Karpenter CRD chart.
  karpenter_crd_chart_release_name = "karpenter-crd"

  # The Helm repository to obtain the Karpenter CRD chart from.
  karpenter_crd_chart_repository = "oci://public.ecr.aws/karpenter"

  # Optionally provide a Password for HTTP basic authentication against the
  # Karpenter CRD Chart repository.
  karpenter_crd_chart_repository_password = null

  # Optionally provide a Username for HTTP basic authentication against the
  # Karpenter CRD Chart repository.
  karpenter_crd_chart_repository_username = null

  # The version of the Karpenter CRD Helm chart. This should typically be the
  # same version as karpenter_chart_version.
  karpenter_crd_chart_version = "v0.32.7"

  # Whether or not to create the Karpneter CRDs via the karpenter-crd Helm
  # chart. It is suggested to manage the Karpenter CRDs via this Helm chart.
  karpenter_crd_helm_create = true

  # A map of custom tags to apply to the Karpenter Deprovisioning Queue IAM
  # Policies if enabled. The key is the tag name and the value is the tag value.
  karpenter_deprovisioning_queue_iam_policy_tags = {}

  # Additional tags to add to the Karpenter Deprovisioning Queue.
  karpenter_deprovisioning_queue_tags = {}

  # A tag that is used by Karpenter to discover resources.
  karpenter_discovery_tag = "karpenter.sh/discovery"

  # ARN of the policy that is used to set the permissions boundary for the role.
  karpenter_irsa_permissions_boundary = null

  # Use an existing IAM Role to be used for the Karpenter Node Instance Profile.
  # This is required if `create_karpenter_node_iam_role` is set to false. This
  # should be the ARN of the IAM Role.
  karpenter_node_existing_iam_role_arn = null

  # Use an existing IAM Role to be used for the Karpenter Node Instance Profile.
  # This is required if `create_karpenter_node_iam_role` is set to false. This
  # should be the Name of the IAM Role.
  karpenter_node_existing_iam_role_name = null

  # A description of the Karpenter Node IAM Role.
  karpenter_node_iam_role_description = "IAM Role attached to nodes launched by Karpenter."

  # Maximum session duration (in seconds) that you want to set for the Karpenter
  # Node role. Value can be between 3600 and 43200.
  karpenter_node_iam_role_max_session_duration = 3600

  # Optionally provide a name for the Karpenter Node IAM Role. If unset, a name
  # will be generated.
  karpenter_node_iam_role_name = null

  # Optionally provide a path to the Karpenter Node IAM Role.
  karpenter_node_iam_role_path = null

  # ARN of the policy that is used to set the permissions boundary for the role.
  karpenter_node_iam_role_permissions_boundary = null

  # Additional tags to add to the Karpenter Node IAM Role.
  karpenter_node_iam_role_tags = {}

  # Optionally use an IAM name prefix for the Karpenter IAM Role.
  karpenter_node_iam_role_use_name_prefix = false

  # Optionally provide a name for the Karpenter service account that will be
  # associated with IRSA.
  karpenter_service_account_name = "karpenter"

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-K8S-KARPENTER MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-k8s-karpenter?ref=v0.73.3"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS Region to create resources in.
  aws_region = <string>

  # URL endpoint of the Kubernetes control plane provided by EKS.
  eks_cluster_endpoint = <string>

  # The name of the EKS Cluster that Karpenter will be deployed to.
  eks_cluster_name = <string>

  # The ARN of the EKS OIDC provider. This is required if creating IRSA for the
  # Karpenter Controller.
  eks_openid_connect_provider_arn = <string>

  # The URL of the EKS OIDC provider. This is required if creating IRSA for the
  # Karpenter Controller.
  eks_openid_connect_provider_url = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Optionally create an IAM Role for Service Account (IRSA) for the Karpenter
  # Controller.
  create_karpenter_controller_irsa = true

  # Conditional flag to optionally create the Karpenter Deprovisioning Queue.
  create_karpenter_deprovisioning_queue = true

  # Conditional flag to create the Karpenter Node IAM Role. If this is set to
  # false, then an existing IAM Role must be provided with the
  # `karpenter_node_iam_role_arn` variable
  create_karpenter_node_iam_role = true

  # Conditional flag to optionally create resources in this module.
  create_resources = true

  # Tags to apply to all AWS resources managed by this module.
  default_tags = {}

  # Additional Helm chart values to pass to the Karpenter Helm chart. See the
  # official Karpenter Helm chart values file and documentation for available
  # configuration options.
  karpenter_chart_additional_values = {}

  # The Helm chart name for the Karpenter chart.
  karpenter_chart_name = "karpenter"

  # The k8s namespace that the Karpenter Helm chart will be deployed to.
  karpenter_chart_namespace = "karpenter"

  # The Helm release name for the Karpenter chart.
  karpenter_chart_release_name = "karpenter"

  # The Helm repository to obtain the Karpenter chart from.
  karpenter_chart_repository = "oci://public.ecr.aws/karpenter"

  # Optionally provide a Password for HTTP basic authentication against the
  # Karpenter Chart repository.
  karpenter_chart_repository_password = null

  # Optionally provide a Username for HTTP basic authentication against the
  # Karpenter Chart repository. 
  karpenter_chart_repository_username = null

  # Whether or not to install CRDs with the Karpenter Helm Chart. This should be
  # set to true if using the karpenter-crd Helm Chart
  # (karpenter_chart_additional_values = true).
  karpenter_chart_skip_crds = false

  # The version of the Karpenter Helm chart.
  karpenter_chart_version = "v0.37.5"

  # Provide an existing IAM Role ARN to be used with the Karpenter Controller
  # Service Account. This is required if `create_karpenter_controller_irsa` is
  # set to false.
  karpenter_controller_existing_role_arn = null

  # A map of custom tags to apply to the Karpenter Controller IAM Policies if
  # enabled. The key is the tag name and the value is the tag value.
  karpenter_controller_iam_policy_tags = {}

  # Additional tags to add to the Karpenter Controller IAM Role.
  karpenter_controller_iam_role_tags = {}

  # The Helm chart name for the Karpenter CRD chart.
  karpenter_crd_chart_name = "karpenter-crd"

  # The k8s namespace that the Karpenter CRD Helm chart will be deployed to.
  karpenter_crd_chart_namespace = "karpenter"

  # The Helm release name for the Karpenter CRD chart.
  karpenter_crd_chart_release_name = "karpenter-crd"

  # The Helm repository to obtain the Karpenter CRD chart from.
  karpenter_crd_chart_repository = "oci://public.ecr.aws/karpenter"

  # Optionally provide a Password for HTTP basic authentication against the
  # Karpenter CRD Chart repository.
  karpenter_crd_chart_repository_password = null

  # Optionally provide a Username for HTTP basic authentication against the
  # Karpenter CRD Chart repository.
  karpenter_crd_chart_repository_username = null

  # The version of the Karpenter CRD Helm chart. This should typically be the
  # same version as karpenter_chart_version.
  karpenter_crd_chart_version = "v0.32.7"

  # Whether or not to create the Karpneter CRDs via the karpenter-crd Helm
  # chart. It is suggested to manage the Karpenter CRDs via this Helm chart.
  karpenter_crd_helm_create = true

  # A map of custom tags to apply to the Karpenter Deprovisioning Queue IAM
  # Policies if enabled. The key is the tag name and the value is the tag value.
  karpenter_deprovisioning_queue_iam_policy_tags = {}

  # Additional tags to add to the Karpenter Deprovisioning Queue.
  karpenter_deprovisioning_queue_tags = {}

  # A tag that is used by Karpenter to discover resources.
  karpenter_discovery_tag = "karpenter.sh/discovery"

  # ARN of the policy that is used to set the permissions boundary for the role.
  karpenter_irsa_permissions_boundary = null

  # Use an existing IAM Role to be used for the Karpenter Node Instance Profile.
  # This is required if `create_karpenter_node_iam_role` is set to false. This
  # should be the ARN of the IAM Role.
  karpenter_node_existing_iam_role_arn = null

  # Use an existing IAM Role to be used for the Karpenter Node Instance Profile.
  # This is required if `create_karpenter_node_iam_role` is set to false. This
  # should be the Name of the IAM Role.
  karpenter_node_existing_iam_role_name = null

  # A description of the Karpenter Node IAM Role.
  karpenter_node_iam_role_description = "IAM Role attached to nodes launched by Karpenter."

  # Maximum session duration (in seconds) that you want to set for the Karpenter
  # Node role. Value can be between 3600 and 43200.
  karpenter_node_iam_role_max_session_duration = 3600

  # Optionally provide a name for the Karpenter Node IAM Role. If unset, a name
  # will be generated.
  karpenter_node_iam_role_name = null

  # Optionally provide a path to the Karpenter Node IAM Role.
  karpenter_node_iam_role_path = null

  # ARN of the policy that is used to set the permissions boundary for the role.
  karpenter_node_iam_role_permissions_boundary = null

  # Additional tags to add to the Karpenter Node IAM Role.
  karpenter_node_iam_role_tags = {}

  # Optionally use an IAM name prefix for the Karpenter IAM Role.
  karpenter_node_iam_role_use_name_prefix = false

  # Optionally provide a name for the Karpenter service account that will be
  # associated with IRSA.
  karpenter_service_account_name = "karpenter"

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="aws_region" requirement="required" type="string">
<HclListItemDescription>

The AWS Region to create resources in.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_cluster_endpoint" requirement="required" type="string">
<HclListItemDescription>

URL endpoint of the Kubernetes control plane provided by EKS.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_cluster_name" requirement="required" type="string">
<HclListItemDescription>

The name of the EKS Cluster that Karpenter will be deployed to.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_openid_connect_provider_arn" requirement="required" type="string">
<HclListItemDescription>

The ARN of the EKS OIDC provider. This is required if creating IRSA for the Karpenter Controller.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_openid_connect_provider_url" requirement="required" type="string">
<HclListItemDescription>

The URL of the EKS OIDC provider. This is required if creating IRSA for the Karpenter Controller.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="create_karpenter_controller_irsa" requirement="optional" type="bool">
<HclListItemDescription>

Optionally create an IAM Role for Service Account (IRSA) for the Karpenter Controller.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_karpenter_deprovisioning_queue" requirement="optional" type="bool">
<HclListItemDescription>

Conditional flag to optionally create the Karpenter Deprovisioning Queue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_karpenter_node_iam_role" requirement="optional" type="bool">
<HclListItemDescription>

Conditional flag to create the Karpenter Node IAM Role. If this is set to false, then an existing IAM Role must be provided with the `karpenter_node_iam_role_arn` variable

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Conditional flag to optionally create resources in this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="default_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags to apply to all AWS resources managed by this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="karpenter_chart_additional_values" requirement="optional" type="any">
<HclListItemDescription>

Additional Helm chart values to pass to the Karpenter Helm chart. See the official Karpenter Helm chart values file and documentation for available configuration options.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="karpenter_chart_name" requirement="optional" type="string">
<HclListItemDescription>

The Helm chart name for the Karpenter chart.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;karpenter&quot;"/>
</HclListItem>

<HclListItem name="karpenter_chart_namespace" requirement="optional" type="string">
<HclListItemDescription>

The k8s namespace that the Karpenter Helm chart will be deployed to.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;karpenter&quot;"/>
</HclListItem>

<HclListItem name="karpenter_chart_release_name" requirement="optional" type="string">
<HclListItemDescription>

The Helm release name for the Karpenter chart.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;karpenter&quot;"/>
</HclListItem>

<HclListItem name="karpenter_chart_repository" requirement="optional" type="string">
<HclListItemDescription>

The Helm repository to obtain the Karpenter chart from.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;oci://public.ecr.aws/karpenter&quot;"/>
</HclListItem>

<HclListItem name="karpenter_chart_repository_password" requirement="optional" type="string">
<HclListItemDescription>

Optionally provide a Password for HTTP basic authentication against the Karpenter Chart repository.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="karpenter_chart_repository_username" requirement="optional" type="string">
<HclListItemDescription>

Optionally provide a Username for HTTP basic authentication against the Karpenter Chart repository. 

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="karpenter_chart_skip_crds" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to install CRDs with the Karpenter Helm Chart. This should be set to true if using the karpenter-crd Helm Chart (karpenter_chart_additional_values = true).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="karpenter_chart_version" requirement="optional" type="string">
<HclListItemDescription>

The version of the Karpenter Helm chart.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;v0.37.5&quot;"/>
</HclListItem>

<HclListItem name="karpenter_controller_existing_role_arn" requirement="optional" type="string">
<HclListItemDescription>

Provide an existing IAM Role ARN to be used with the Karpenter Controller Service Account. This is required if `create_karpenter_controller_irsa` is set to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="karpenter_controller_iam_policy_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the Karpenter Controller IAM Policies if enabled. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="karpenter_controller_iam_role_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Additional tags to add to the Karpenter Controller IAM Role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="karpenter_crd_chart_name" requirement="optional" type="string">
<HclListItemDescription>

The Helm chart name for the Karpenter CRD chart.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;karpenter-crd&quot;"/>
</HclListItem>

<HclListItem name="karpenter_crd_chart_namespace" requirement="optional" type="string">
<HclListItemDescription>

The k8s namespace that the Karpenter CRD Helm chart will be deployed to.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;karpenter&quot;"/>
</HclListItem>

<HclListItem name="karpenter_crd_chart_release_name" requirement="optional" type="string">
<HclListItemDescription>

The Helm release name for the Karpenter CRD chart.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;karpenter-crd&quot;"/>
</HclListItem>

<HclListItem name="karpenter_crd_chart_repository" requirement="optional" type="string">
<HclListItemDescription>

The Helm repository to obtain the Karpenter CRD chart from.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;oci://public.ecr.aws/karpenter&quot;"/>
</HclListItem>

<HclListItem name="karpenter_crd_chart_repository_password" requirement="optional" type="string">
<HclListItemDescription>

Optionally provide a Password for HTTP basic authentication against the Karpenter CRD Chart repository.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="karpenter_crd_chart_repository_username" requirement="optional" type="string">
<HclListItemDescription>

Optionally provide a Username for HTTP basic authentication against the Karpenter CRD Chart repository.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="karpenter_crd_chart_version" requirement="optional" type="string">
<HclListItemDescription>

The version of the Karpenter CRD Helm chart. This should typically be the same version as karpenter_chart_version.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;v0.32.7&quot;"/>
</HclListItem>

<HclListItem name="karpenter_crd_helm_create" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to create the Karpneter CRDs via the karpenter-crd Helm chart. It is suggested to manage the Karpenter CRDs via this Helm chart.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="karpenter_deprovisioning_queue_iam_policy_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the Karpenter Deprovisioning Queue IAM Policies if enabled. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="karpenter_deprovisioning_queue_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Additional tags to add to the Karpenter Deprovisioning Queue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="karpenter_discovery_tag" requirement="optional" type="string">
<HclListItemDescription>

A tag that is used by Karpenter to discover resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;karpenter.sh/discovery&quot;"/>
</HclListItem>

<HclListItem name="karpenter_irsa_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

ARN of the policy that is used to set the permissions boundary for the role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="karpenter_node_existing_iam_role_arn" requirement="optional" type="string">
<HclListItemDescription>

Use an existing IAM Role to be used for the Karpenter Node Instance Profile. This is required if `create_karpenter_node_iam_role` is set to false. This should be the ARN of the IAM Role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="karpenter_node_existing_iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

Use an existing IAM Role to be used for the Karpenter Node Instance Profile. This is required if `create_karpenter_node_iam_role` is set to false. This should be the Name of the IAM Role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="karpenter_node_iam_role_description" requirement="optional" type="string">
<HclListItemDescription>

A description of the Karpenter Node IAM Role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;IAM Role attached to nodes launched by Karpenter.&quot;"/>
</HclListItem>

<HclListItem name="karpenter_node_iam_role_max_session_duration" requirement="optional" type="number">
<HclListItemDescription>

Maximum session duration (in seconds) that you want to set for the Karpenter Node role. Value can be between 3600 and 43200.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="3600"/>
</HclListItem>

<HclListItem name="karpenter_node_iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

Optionally provide a name for the Karpenter Node IAM Role. If unset, a name will be generated.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="karpenter_node_iam_role_path" requirement="optional" type="string">
<HclListItemDescription>

Optionally provide a path to the Karpenter Node IAM Role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="karpenter_node_iam_role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

ARN of the policy that is used to set the permissions boundary for the role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="karpenter_node_iam_role_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Additional tags to add to the Karpenter Node IAM Role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="karpenter_node_iam_role_use_name_prefix" requirement="optional" type="bool">
<HclListItemDescription>

Optionally use an IAM name prefix for the Karpenter IAM Role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="karpenter_service_account_name" requirement="optional" type="string">
<HclListItemDescription>

Optionally provide a name for the Karpenter service account that will be associated with IRSA.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;karpenter&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="karpenter_controller_irsa_arn">
<HclListItemDescription>

The ARN of the Karpenter Controller IRSA Role.

</HclListItemDescription>
</HclListItem>

<HclListItem name="karpenter_controller_irsa_name">
<HclListItemDescription>

The Name of the Karpenter Controller IRSA Role.

</HclListItemDescription>
</HclListItem>

<HclListItem name="karpenter_node_instance_profile_arn">
<HclListItemDescription>

The ARN of the Karpenter Node Instance Profile.

</HclListItemDescription>
</HclListItem>

<HclListItem name="karpenter_node_role_arn">
<HclListItemDescription>

The ARN of the Karpenter Node IAM Role.

</HclListItemDescription>
</HclListItem>

<HclListItem name="karpenter_node_role_name">
<HclListItemDescription>

The name of the Karpenter Node IAM Role.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.73.3/modules/eks-k8s-karpenter/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.73.3/modules/eks-k8s-karpenter/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.73.3/modules/eks-k8s-karpenter/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "740462286a74f37c97c8a234cd6ebd47"
}
##DOCS-SOURCER-END -->
