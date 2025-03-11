---
title: "EKS EBS CSI Driver Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon EKS" version="0.74.2" lastModifiedVersion="0.72.1"/>

# EKS EBS CSI Driver Module

<a href="https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.74.2/modules/eks-ebs-csi-driver" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.72.1" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform module installs the [Amazon EBS CSI Driver](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html) to an EKS cluster as an EKS Managed AddOn. The EBS CSI Driver manages the lifecycle of EBS Volumes when used as Kubernetes Volumes. The EBS CSI Driver is enabled by default in EKS clusters &gt;= `1.23`, but not installed. The EBS CSI Driver was installed by default on earlier versions of EKS. This module will create all of the required resources to run the EBS CSI Driver and can be configured as needed without the bounds of the EBS CSI Driver as a Managed AddOn. See the [official documentation](https://docs.aws.amazon.com/eks/latest/userguide/managing-ebs-csi.html) for more details.

This module is exposed directly on the [eks-cluster-control](https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.74.2/modules/eks-cluster-control-plane/) module as with the other available EKS AddOns, but this module can also be used independently by toggling the `enable_ebs_csi_driver` to `false` (`false` by default on the `eks-control-plane` module) on the `eks-control-plane` module and instead declaring this module elsewhere within the codebase.

> NOTE: currently enabling/deploying this module in a new cluster will take ~15 mins to deploy due to a limitation on the AWS side. The health status of the AddOn itself isn't reported in a timely manner which causes the deployment to take extra time even though the AddOn is deployed and healthy. Please be aware of this as it will increase the initial deployment time of a new EKS cluster.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-EBS-CSI-DRIVER MODULE
# ------------------------------------------------------------------------------------------------------

module "eks_ebs_csi_driver" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-ebs-csi-driver?ref=v0.74.2"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the EKS cluster to create the AWS EKS EBS CSI Driver in.
  eks_cluster_name = <string>

  # ARN of the OpenID Connect Provider provisioned for the EKS cluster.
  eks_openid_connect_provider_arn = <string>

  # URL of the OpenID Connect Provider provisioned for the EKS cluster.
  eks_openid_connect_provider_url = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Tags to apply to all AWS resources managed by this module.
  default_tags = {}

  # Configuraiton object for the EBS CSI Driver EKS AddOn
  ebs_csi_driver_addon_config = {}

  # A map of custom tags to apply to the EBS CSI Driver AddOn. The key is the
  # tag name and the value is the tag value.
  ebs_csi_driver_addon_tags = {}

  # A map of custom tags to apply to the IAM Policies created for the EBS CSI
  # Driver IAM Role if enabled. The key is the tag name and the value is the tag
  # value.
  ebs_csi_driver_iam_policy_tags = {}

  # A map of custom tags to apply to the EBS CSI Driver IAM Role if enabled. The
  # key is the tag name and the value is the tag value.
  ebs_csi_driver_iam_role_tags = {}

  # If using KMS encryption of EBS volumes, provide the KMS Key ARN to be used
  # for a policy attachment.
  ebs_csi_driver_kms_key_arn = null

  # The namespace for the EBS CSI Driver. This will almost always be the
  # kube-system namespace.
  ebs_csi_driver_namespace = "kube-system"

  # The Service Account name to be used with the EBS CSI Driver
  ebs_csi_driver_sa_name = "ebs-csi-controller-sa"

  # When set to true, the module configures and install the EBS CSI Driver as an
  # EKS managed AddOn
  # (https://docs.aws.amazon.com/eks/latest/userguide/managing-ebs-csi.html). To
  # use this feature, `configure_openid_connect_provider` must be set to true
  # (the default value).
  enable_ebs_csi_driver = true

  # The version of Kubernetes for the EKS Cluster.
  kubernetes_version = "1.30"

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-EBS-CSI-DRIVER MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-ebs-csi-driver?ref=v0.74.2"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the EKS cluster to create the AWS EKS EBS CSI Driver in.
  eks_cluster_name = <string>

  # ARN of the OpenID Connect Provider provisioned for the EKS cluster.
  eks_openid_connect_provider_arn = <string>

  # URL of the OpenID Connect Provider provisioned for the EKS cluster.
  eks_openid_connect_provider_url = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Tags to apply to all AWS resources managed by this module.
  default_tags = {}

  # Configuraiton object for the EBS CSI Driver EKS AddOn
  ebs_csi_driver_addon_config = {}

  # A map of custom tags to apply to the EBS CSI Driver AddOn. The key is the
  # tag name and the value is the tag value.
  ebs_csi_driver_addon_tags = {}

  # A map of custom tags to apply to the IAM Policies created for the EBS CSI
  # Driver IAM Role if enabled. The key is the tag name and the value is the tag
  # value.
  ebs_csi_driver_iam_policy_tags = {}

  # A map of custom tags to apply to the EBS CSI Driver IAM Role if enabled. The
  # key is the tag name and the value is the tag value.
  ebs_csi_driver_iam_role_tags = {}

  # If using KMS encryption of EBS volumes, provide the KMS Key ARN to be used
  # for a policy attachment.
  ebs_csi_driver_kms_key_arn = null

  # The namespace for the EBS CSI Driver. This will almost always be the
  # kube-system namespace.
  ebs_csi_driver_namespace = "kube-system"

  # The Service Account name to be used with the EBS CSI Driver
  ebs_csi_driver_sa_name = "ebs-csi-controller-sa"

  # When set to true, the module configures and install the EBS CSI Driver as an
  # EKS managed AddOn
  # (https://docs.aws.amazon.com/eks/latest/userguide/managing-ebs-csi.html). To
  # use this feature, `configure_openid_connect_provider` must be set to true
  # (the default value).
  enable_ebs_csi_driver = true

  # The version of Kubernetes for the EKS Cluster.
  kubernetes_version = "1.30"

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

<HclListItem name="eks_openid_connect_provider_arn" requirement="required" type="string">
<HclListItemDescription>

ARN of the OpenID Connect Provider provisioned for the EKS cluster.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_openid_connect_provider_url" requirement="required" type="string">
<HclListItemDescription>

URL of the OpenID Connect Provider provisioned for the EKS cluster.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="default_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags to apply to all AWS resources managed by this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="ebs_csi_driver_addon_config" requirement="optional" type="any">
<HclListItemDescription>

Configuraiton object for the EBS CSI Driver EKS AddOn

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
     addon_version               = "v1.14.0-eksbuild.1"
     configuration_values        = {}
     preserve                    = false
     resolve_conflicts_on_create = "OVERWRITE"
     resolve_conflicts_on_update = "NONE"
     service_account_role_arn    = "arn:aws:iam::123456789012:role/role-name"
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="ebs_csi_driver_addon_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the EBS CSI Driver AddOn. The key is the tag name and the value is the tag value.

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

<HclListItem name="ebs_csi_driver_iam_policy_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the IAM Policies created for the EBS CSI Driver IAM Role if enabled. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="ebs_csi_driver_iam_role_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the EBS CSI Driver IAM Role if enabled. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="ebs_csi_driver_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

If using KMS encryption of EBS volumes, provide the KMS Key ARN to be used for a policy attachment.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ebs_csi_driver_namespace" requirement="optional" type="string">
<HclListItemDescription>

The namespace for the EBS CSI Driver. This will almost always be the kube-system namespace.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;kube-system&quot;"/>
</HclListItem>

<HclListItem name="ebs_csi_driver_sa_name" requirement="optional" type="string">
<HclListItemDescription>

The Service Account name to be used with the EBS CSI Driver

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ebs-csi-controller-sa&quot;"/>
</HclListItem>

<HclListItem name="enable_ebs_csi_driver" requirement="optional" type="bool">
<HclListItemDescription>

When set to true, the module configures and install the EBS CSI Driver as an EKS managed AddOn (https://docs.aws.amazon.com/eks/latest/userguide/managing-ebs-csi.html). To use this feature, `configure_openid_connect_provider` must be set to true (the default value).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="kubernetes_version" requirement="optional" type="string">
<HclListItemDescription>

The version of Kubernetes for the EKS Cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;1.30&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="ebs_csi_addon_arn">
<HclListItemDescription>

The ARN of the EBS CSI AddOn.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ebs_csi_addon_current_version">
<HclListItemDescription>

The current version of the EBS CSI AddOn.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ebs_csi_addon_latest_version">
<HclListItemDescription>

The latest available version of the EBS CSI AddOn.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.74.2/modules/eks-ebs-csi-driver/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.74.2/modules/eks-ebs-csi-driver/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.74.2/modules/eks-ebs-csi-driver/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "fba49494a2ecf594437148ad705653e0"
}
##DOCS-SOURCER-END -->
