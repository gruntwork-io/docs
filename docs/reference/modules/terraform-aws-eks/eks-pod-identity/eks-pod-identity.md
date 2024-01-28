---
title: "EKS Pod Identity Agent"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon EKS" version="0.65.5" />

# EKS Pod Identity Agent

<a href="https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.65.5/modules/eks-pod-identity" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-eks/releases?q=eks-pod-identity" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform module installs the [Amazon EKS Pod Identity](https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html) to an EKS cluster as an EKS Managed AddOn. The EBS CSI Driver manages the lifecycle of EBS Volumes when used as Kubernetes Volumes. The EBS CSI Driver is enabled by default in EKS clusters >= `1.23`, but not installed. The EBS CSI Driver was installed by default on earlier versions of EKS. This module will create all of the required resources to run the EBS CSI Driver and can be configured as needed without the bounds of the EBS CSI Driver as a Managed AddOn. See the [official documentation](https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html) for more details.

This module is exposed directly on the [eks-cluster-control](https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.65.5/modules/eks-cluster-control-plane/) module as with the other available EKS AddOns, but this module can also be used independently by toggling the `enable_eks_pod_identity` to `false` (`false` by default on the `eks-control-plane` module) on the `eks-control-plane` module and instead declaring this module elsewhere within the codebase.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-POD-IDENTITY MODULE
# ------------------------------------------------------------------------------------------------------

module "eks_pod_identity" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-pod-identity?ref=v0.65.5"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the EKS cluster to create the AWS EKS EBS CSI Driver in.
  eks_cluster_name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Configuraiton object for the EKS Pod Identity AddOn
  eks_pod_identity_addon_config = {}

  # A map of custom tags to apply to the EKS Pod Identity AddOn. The key is the
  # tag name and the value is the tag value.
  eks_pod_identity_addon_tags = {}

  # When set to true, the module configures and install the POd Identity Addon
  # as an EKS managed AddOn
  # (https://docs.aws.amazon.com/eks/latest/userguide/pod-id-how-it-works.html).
  enable_eks_pod_identity = true

  # The version of Kubernetes for the EKS Cluster.
  kubernetes_version = "1.28"

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-POD-IDENTITY MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-pod-identity?ref=v0.65.5"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the EKS cluster to create the AWS EKS EBS CSI Driver in.
  eks_cluster_name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Configuraiton object for the EKS Pod Identity AddOn
  eks_pod_identity_addon_config = {}

  # A map of custom tags to apply to the EKS Pod Identity AddOn. The key is the
  # tag name and the value is the tag value.
  eks_pod_identity_addon_tags = {}

  # When set to true, the module configures and install the POd Identity Addon
  # as an EKS managed AddOn
  # (https://docs.aws.amazon.com/eks/latest/userguide/pod-id-how-it-works.html).
  enable_eks_pod_identity = true

  # The version of Kubernetes for the EKS Cluster.
  kubernetes_version = "1.28"

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="eks_cluster_name" requirement="required" type="string">
<HclListItemDescription>

The name of the EKS cluster to create the AWS EKS EBS CSI Driver in.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="eks_pod_identity_addon_config" requirement="optional" type="any">
<HclListItemDescription>

Configuraiton object for the EKS Pod Identity AddOn

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   EKS add-on advanced configuration via configuration_values must follow the configuration schema for the deployed version of the add-on. 
   See the following AWS Blog for more details on advanced configuration of EKS add-ons: https://aws.amazon.com/blogs/containers/amazon-eks-add-ons-advanced-configuration/
   Example:
   {
     addon_version        = "v1.14.0-eksbuild.1"
     configuration_values = {}
     preserve                 = false
     resolve_conflicts        = "NONE"
     service_account_role_arn = "arn:aws:iam::123456789012:role/role-name"
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="eks_pod_identity_addon_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the EKS Pod Identity AddOn. The key is the tag name and the value is the tag value.

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

<HclListItem name="enable_eks_pod_identity" requirement="optional" type="bool">
<HclListItemDescription>

When set to true, the module configures and install the POd Identity Addon as an EKS managed AddOn (https://docs.aws.amazon.com/eks/latest/userguide/pod-id-how-it-works.html).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="kubernetes_version" requirement="optional" type="string">
<HclListItemDescription>

The version of Kubernetes for the EKS Cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;1.28&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="eks_pod_identity_addon_arn">
<HclListItemDescription>

The ARN of the EKS Pod Identity AddOn.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_pod_identity_addon_current_version">
<HclListItemDescription>

The current version of the EKS Pod Identity AddOn.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_pod_identity_addon_latest_version">
<HclListItemDescription>

The latest available version of the EKS Pod Identity AddOn.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.65.5/modules/eks-pod-identity/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.65.5/modules/eks-pod-identity/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.65.5/modules/eks-pod-identity/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "d803f4f4df06e7d466772fb5fd690fc8"
}
##DOCS-SOURCER-END -->
