---
title: "EKS K8s ArgoCD Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon EKS" version="0.59.4" />

# EKS K8s ArgoCD Module

<a href="https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.59.4/modules/eks-k8s-argocd" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-eks/releases?q=eks-k8s-argocd" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Module can be used to deploy [ArgoCD](https://argo-cd.readthedocs.io/) as an alternative to [Terraform-wrapper Helm Charts](https://registry.terraform.io/providers/hashicorp/helm/0.10.6/docs/resources/release).

To leverage the full power and potential of ArgoCD , one must understand the [ArgoCD Core Concepts](https://argo-cd.readthedocs.io/en/stable/core_concepts/). Deploying this module without additional configuration (ie deploying applications using the GitOps model) does not bring any benefits.

As use-cases are presented, we will do our best effort to continue to add meaningful examples to the [examples](https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.59.4/examples/) folder to help ease the complexities of configuring ArgoCD.

### Resources Created

This module will create the following core resources, some of which are optional which are noted in the [input variables](https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.59.4/modules/eks-k8s-argocd/variables.tf):

| AWS Resource | Description |
| --- | --- |

Additional supporting resources do exist in addition to the table above, such as IAM Policy Documents and Attachments.

***

## What is ArgoCD?

todo(matei): add some docs from the official website

***

## Implementation plan

### A good release should address

1.  First we should get the ArgoCD deployet via helm_release
2.  Then we should expose some configuration variables that are interesting for this module. For example
    *   Do we want to deploy from terraform some Git access (ssh/https, etc) for automatic bootstrap <- this would also help with our example
    *   Do you want to use redis in cluster or managed service by AWS (this will require also IAM access)
3.  We need to setup an example and test
    *   Setup a public repo that deplores an nginx (this can be used in tests and examples)
4.  Add better image support. We need a way to avoid docker hub (AWS cache or info on how to build the images).
5.  ArgoCD has an UI component and DEX we should:
    *   think of how we expose the UI component (at least an example with an ingress)
    *   offer some defaults/example for DEX (google, github and gitlab are good candidates)

### Extra points

1.  Handling joining an existing cluster. A tf module that joines an EKS exiting EKS cluster to a remote
2.  Given that ArgoCD is a big topic more examples could help
    *   GitHub app integration is also pretty neat - https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/services/github/

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-K8S-ARGOCD MODULE
# ------------------------------------------------------------------------------------------------------

module "eks_k_8_s_argocd" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-k8s-argocd?ref=v0.59.4"

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Additional Helm chart values to pass to the ArgoCD Helm chart. See the
  # official ArgoCD Helm chart values file and documentation for available
  # configuration options.
  argocd_chart_additional_values = {}

  # The Helm chart name for the ArgoCD chart.
  argocd_chart_name = "argo-cd"

  # The k8s namespace that the ArgoCD Helm chart will be deployed to.
  argocd_chart_namespace = "argocd"

  # The Helm release name for the ArgoCD chart.
  argocd_chart_release_name = "argo-cd"

  # The Helm repository to obtain the ArgoCD chart from.
  argocd_chart_repository = "https://argoproj.github.io/argo-helm"

  # The version of the ArgoCD Helm chart.
  argocd_chart_version = "5.41.1"

  # Conditional flag to optionally create resources in this module.
  create_resources = true

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-K8S-ARGOCD MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-k8s-argocd?ref=v0.59.4"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Additional Helm chart values to pass to the ArgoCD Helm chart. See the
  # official ArgoCD Helm chart values file and documentation for available
  # configuration options.
  argocd_chart_additional_values = {}

  # The Helm chart name for the ArgoCD chart.
  argocd_chart_name = "argo-cd"

  # The k8s namespace that the ArgoCD Helm chart will be deployed to.
  argocd_chart_namespace = "argocd"

  # The Helm release name for the ArgoCD chart.
  argocd_chart_release_name = "argo-cd"

  # The Helm repository to obtain the ArgoCD chart from.
  argocd_chart_repository = "https://argoproj.github.io/argo-helm"

  # The version of the ArgoCD Helm chart.
  argocd_chart_version = "5.41.1"

  # Conditional flag to optionally create resources in this module.
  create_resources = true

}


```

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.59.4/modules/eks-k8s-argocd/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.59.4/modules/eks-k8s-argocd/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.59.4/modules/eks-k8s-argocd/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "5a5abe90ed599e7cca2398f0dde56d8b"
}
##DOCS-SOURCER-END -->
