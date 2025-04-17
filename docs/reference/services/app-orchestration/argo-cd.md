---
type: "service"
name: "Argo CD"
description: "Deploy Argo CD to Amazon Elastic Kubernetes Service (EKS)."
category: "docker-orchestration"
cloud: "aws"
tags: ["docker","orchestration","kubernetes","containers"]
license: "gruntwork"
built-with: "terraform, bash, python, go"
title: "Gruntwork GitOps \"GruntOps\""
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.125.0" lastModifiedVersion="0.114.0"/>

# Gruntwork GitOps "GruntOps"

GitOps is an operational framework that is built around DevOps best practices for a standardized approach to managing the lifecycle of Kubernetes based deployments. GitOps provides a unified approach to the deployment and management of container workloads, with Git being the single source of truth for the state of the container infrastructure. GitOps is a very developer-centric workflow that works best when adopted by individuals and teams that follow a git based development lifecycle. The core principles of GitOps have been at the center of Gruntwork from the beginning!

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.125.0/modules/services/eks-argocd" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=services%2Feks-argocd" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>


## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-ARGOCD MODULE
# ------------------------------------------------------------------------------------------------------

module "eks_argocd" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/services/eks-argocd?ref=v0.125.0"

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Additional Helm chart values to pass to the argocd Helm chart. See the
  # official argocd Helm chart values file and documentation for available
  # configuration options.
  argocd_chart_additional_values = {}

  # Whether or not Helm should create the namespace to deploy the Argo CD chart
  # to.
  argocd_chart_create_namespace = true

  # The Helm chart name for the argocd chart.
  argocd_chart_name = "argo-cd"

  # The k8s namespace that the argocd Helm chart will be deployed to.
  argocd_chart_namespace = "argocd"

  # The Helm release name for the Argo CD chart.
  argocd_chart_release_name = "argocd"

  # The Helm repository to obtain the Argo CD chart from.
  argocd_chart_repository = "https://argoproj.github.io/argo-helm"

  # Whether or not to skip CRD resource installation.
  argocd_chart_skip_crds = false

  # The version of the argocd Helm chart.
  argocd_chart_version = "5.42.2"

  # Whether or not to to wait until resources are in a ready state before
  # marking the Helm release as successful.
  argocd_chart_wait = false

  # ARN of permissions boundary to apply to the Argo CD Fargate IAM role - the
  # IAM role created for Argo CD.
  argocd_iam_role_permissions_boundary = null

  # The AWS partition used for default AWS Resources.
  aws_partition = "aws"

  # When set to true, create a dedicated Fargate execution role for Argo CD.
  # When false, you must provide an existing fargate execution role in the
  # variable var.pod_execution_iam_role_arn. Only used if
  # var.create_fargate_profile is true.
  create_fargate_execution_role = false

  # When set to true, create a dedicated Fargate execution profile for the Argo
  # CD.
  create_fargate_profile = false

  # Conditional flag to optionally create resources in this module.
  create_resources = true

  # Tags to apply to all AWS resources managed by this module.
  default_tags = {}

  # The name of the EKS Cluster that Argo CD will be deployed to. Required if
  # deploying to Fargate.
  eks_cluster_name = ""

  # A map of custom tags to apply to the Fargate Profile IAM Role if enabled.
  # The key is the tag name and the value is the tag value.
  fargate_profile_iam_role_tags = {}

  # A map of custom tags to apply to the Fargate Profile if enabled. The key is
  # the tag name and the value is the tag value.
  fargate_profile_tags = {}

  # ARN of IAM Role to use as the Pod execution role for Fargate. Set to null
  # (default) to create a new one. Only used when var.create_fargate_profile is
  # true.
  pod_execution_iam_role_arn = null

  # A list of the subnets into which the Argo CD pods will be launched. These
  # should usually be all private subnets and include one in each AWS
  # Availability Zone. Required when var.create_fargate_profile is true.
  vpc_worker_subnet_ids = []

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-ARGOCD MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/services/eks-argocd?ref=v0.125.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Additional Helm chart values to pass to the argocd Helm chart. See the
  # official argocd Helm chart values file and documentation for available
  # configuration options.
  argocd_chart_additional_values = {}

  # Whether or not Helm should create the namespace to deploy the Argo CD chart
  # to.
  argocd_chart_create_namespace = true

  # The Helm chart name for the argocd chart.
  argocd_chart_name = "argo-cd"

  # The k8s namespace that the argocd Helm chart will be deployed to.
  argocd_chart_namespace = "argocd"

  # The Helm release name for the Argo CD chart.
  argocd_chart_release_name = "argocd"

  # The Helm repository to obtain the Argo CD chart from.
  argocd_chart_repository = "https://argoproj.github.io/argo-helm"

  # Whether or not to skip CRD resource installation.
  argocd_chart_skip_crds = false

  # The version of the argocd Helm chart.
  argocd_chart_version = "5.42.2"

  # Whether or not to to wait until resources are in a ready state before
  # marking the Helm release as successful.
  argocd_chart_wait = false

  # ARN of permissions boundary to apply to the Argo CD Fargate IAM role - the
  # IAM role created for Argo CD.
  argocd_iam_role_permissions_boundary = null

  # The AWS partition used for default AWS Resources.
  aws_partition = "aws"

  # When set to true, create a dedicated Fargate execution role for Argo CD.
  # When false, you must provide an existing fargate execution role in the
  # variable var.pod_execution_iam_role_arn. Only used if
  # var.create_fargate_profile is true.
  create_fargate_execution_role = false

  # When set to true, create a dedicated Fargate execution profile for the Argo
  # CD.
  create_fargate_profile = false

  # Conditional flag to optionally create resources in this module.
  create_resources = true

  # Tags to apply to all AWS resources managed by this module.
  default_tags = {}

  # The name of the EKS Cluster that Argo CD will be deployed to. Required if
  # deploying to Fargate.
  eks_cluster_name = ""

  # A map of custom tags to apply to the Fargate Profile IAM Role if enabled.
  # The key is the tag name and the value is the tag value.
  fargate_profile_iam_role_tags = {}

  # A map of custom tags to apply to the Fargate Profile if enabled. The key is
  # the tag name and the value is the tag value.
  fargate_profile_tags = {}

  # ARN of IAM Role to use as the Pod execution role for Fargate. Set to null
  # (default) to create a new one. Only used when var.create_fargate_profile is
  # true.
  pod_execution_iam_role_arn = null

  # A list of the subnets into which the Argo CD pods will be launched. These
  # should usually be all private subnets and include one in each AWS
  # Availability Zone. Required when var.create_fargate_profile is true.
  vpc_worker_subnet_ids = []

}


```

</TabItem>
</Tabs>



## Reference


<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Optional

<HclListItem name="argocd_chart_additional_values" requirement="optional" type="any">
<HclListItemDescription>

Additional Helm chart values to pass to the argocd Helm chart. See the official argocd Helm chart values file and documentation for available configuration options.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="argocd_chart_create_namespace" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not Helm should create the namespace to deploy the Argo CD chart to.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="argocd_chart_name" requirement="optional" type="string">
<HclListItemDescription>

The Helm chart name for the argocd chart.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;argo-cd&quot;"/>
</HclListItem>

<HclListItem name="argocd_chart_namespace" requirement="optional" type="string">
<HclListItemDescription>

The k8s namespace that the argocd Helm chart will be deployed to.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;argocd&quot;"/>
</HclListItem>

<HclListItem name="argocd_chart_release_name" requirement="optional" type="string">
<HclListItemDescription>

The Helm release name for the Argo CD chart.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;argocd&quot;"/>
</HclListItem>

<HclListItem name="argocd_chart_repository" requirement="optional" type="string">
<HclListItemDescription>

The Helm repository to obtain the Argo CD chart from.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;https://argoproj.github.io/argo-helm&quot;"/>
</HclListItem>

<HclListItem name="argocd_chart_skip_crds" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to skip CRD resource installation.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="argocd_chart_version" requirement="optional" type="string">
<HclListItemDescription>

The version of the argocd Helm chart.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;5.42.2&quot;"/>
</HclListItem>

<HclListItem name="argocd_chart_wait" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to to wait until resources are in a ready state before marking the Helm release as successful.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="argocd_iam_role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

ARN of permissions boundary to apply to the Argo CD Fargate IAM role - the IAM role created for Argo CD.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="aws_partition" requirement="optional" type="string">
<HclListItemDescription>

The AWS partition used for default AWS Resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;aws&quot;"/>
</HclListItem>

<HclListItem name="create_fargate_execution_role" requirement="optional" type="bool">
<HclListItemDescription>

When set to true, create a dedicated Fargate execution role for Argo CD. When false, you must provide an existing fargate execution role in the variable <a href="#pod_execution_iam_role_arn"><code>pod_execution_iam_role_arn</code></a>. Only used if <a href="#create_fargate_profile"><code>create_fargate_profile</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="create_fargate_profile" requirement="optional" type="bool">
<HclListItemDescription>

When set to true, create a dedicated Fargate execution profile for the Argo CD.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
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

<HclListItem name="eks_cluster_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the EKS Cluster that Argo CD will be deployed to. Required if deploying to Fargate.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="fargate_profile_iam_role_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the Fargate Profile IAM Role if enabled. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="fargate_profile_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the Fargate Profile if enabled. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="pod_execution_iam_role_arn" requirement="optional" type="string">
<HclListItemDescription>

ARN of IAM Role to use as the Pod execution role for Fargate. Set to null (default) to create a new one. Only used when <a href="#create_fargate_profile"><code>create_fargate_profile</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="vpc_worker_subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of the subnets into which the Argo CD pods will be launched. These should usually be all private subnets and include one in each AWS Availability Zone. Required when <a href="#create_fargate_profile"><code>create_fargate_profile</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">



</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.125.0/modules/services/eks-argocd/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.125.0/modules/services/eks-argocd/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.125.0/modules/services/eks-argocd/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "3d426776ee7ec317fa2565ca66c45431"
}
##DOCS-SOURCER-END -->
