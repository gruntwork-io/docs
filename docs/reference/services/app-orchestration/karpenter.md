---
type: "service"
name: "Karpenter"
description: "Deploy Karpenter to an Amazon Elastic Kubernetes Service (EKS) cluster."
category: "docker-orchestration"
cloud: "aws"
tags: ["docker","orchestration","kubernetes","containers"]
license: "gruntwork"
built-with: "terraform, helm"
title: "EKS Karpenter"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.104.14" lastModifiedVersion="0.104.11"/>

# EKS Karpenter

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/eks-karpenter" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=services%2Feks-karpenter" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>

## Overview

This service contains [Terraform](https://www.terraform.io) code to deploy [Karpenter](https://karpenter.sh/) to
[Elastic Kubernetes Service(EKS)](https://docs.aws.amazon.com/eks/latest/userguide/clusters.html).

> From the Karpenter Project:
>
> Karpenter automatically launches just the right compute resources to handle your cluster's applications. It is designed to let you take full advantage of the cloud with fast and simple compute provisioning for Kubernetes clusters.

## Features

*   Creates the required resources to deploy Karpenter to EKS

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

Under the hood, this is all implemented using Terraform modules from the Gruntwork
[terraform-aws-eks](https://github.com/gruntwork-io/terraform-aws-eks) repo. If you are a subscriber and don’t have
access to this repo, email <support@gruntwork.io>.

### Core concepts

For detailed information on how Karpenter is deployed to EKS, see the documentation in the
[terraform-aws-eks](https://github.com/gruntwork-io/terraform-aws-eks) repo.

*   [Karpenter](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-k8s-karpenter)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.
*   [examples](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples): This folder contains working examples of how to use the submodules.
*   [test](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

*   [How to deploy a production-grade Kubernetes cluster on AWS](https://docs.gruntwork.io/guides/build-it-yourself/kubernetes-cluster/deployment-walkthrough/pre-requisites):
    A step-by-step guide for deploying a production-grade EKS cluster on AWS using the code in this repo.


## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-KARPENTER MODULE
# ------------------------------------------------------------------------------------------------------

module "eks_karpenter" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/eks-karpenter?ref=v0.104.14"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS region in which all resources will be created
  aws_region = <string>

  # URL endpoint of the Kubernetes control plane provided by EKS.
  eks_cluster_endpoint = <string>

  # The name of the EKS cluster where the core services will be deployed into.
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

  # Conditional flag to create the Karpenter Node IAM Role. If this is set to
  # false, then an existing IAM Role must be provided with the
  # `karpenter_node_iam_role_arn` variable
  create_karpenter_node_iam_role = true

  # Conditional flag to optionally create resources in this module.
  create_resources = true

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

  # The version of the Karpenter Helm chart.
  karpenter_chart_version = "v0.24.0"

  # Provide an existing IAM Role ARN to be used with the Karpenter Controller
  # Service Account. This is required if `create_karpenter_controller_irsa` is
  # set to false.
  karpenter_controller_existing_role_arn = true

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
# DEPLOY GRUNTWORK'S EKS-KARPENTER MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/eks-karpenter?ref=v0.104.14"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS region in which all resources will be created
  aws_region = <string>

  # URL endpoint of the Kubernetes control plane provided by EKS.
  eks_cluster_endpoint = <string>

  # The name of the EKS cluster where the core services will be deployed into.
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

  # Conditional flag to create the Karpenter Node IAM Role. If this is set to
  # false, then an existing IAM Role must be provided with the
  # `karpenter_node_iam_role_arn` variable
  create_karpenter_node_iam_role = true

  # Conditional flag to optionally create resources in this module.
  create_resources = true

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

  # The version of the Karpenter Helm chart.
  karpenter_chart_version = "v0.24.0"

  # Provide an existing IAM Role ARN to be used with the Karpenter Controller
  # Service Account. This is required if `create_karpenter_controller_irsa` is
  # set to false.
  karpenter_controller_existing_role_arn = true

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

The AWS region in which all resources will be created

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_cluster_endpoint" requirement="required" type="string">
<HclListItemDescription>

URL endpoint of the Kubernetes control plane provided by EKS.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_cluster_name" requirement="required" type="string">
<HclListItemDescription>

The name of the EKS cluster where the core services will be deployed into.

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

<HclListItem name="karpenter_chart_version" requirement="optional" type="string">
<HclListItemDescription>

The version of the Karpenter Helm chart.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;v0.24.0&quot;"/>
</HclListItem>

<HclListItem name="karpenter_controller_existing_role_arn" requirement="optional" type="bool">
<HclListItemDescription>

Provide an existing IAM Role ARN to be used with the Karpenter Controller Service Account. This is required if `create_karpenter_controller_irsa` is set to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
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
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/eks-karpenter/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/eks-karpenter/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/eks-karpenter/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "d0f7dff6ee86c74030f5f3cf520fda9b"
}
##DOCS-SOURCER-END -->
