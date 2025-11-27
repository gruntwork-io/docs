---
title: "EKS VPC Tags Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon EKS" version="3.1.2" lastModifiedVersion="0.64.3"/>

# EKS VPC Tags Module

<a href="https://github.com/gruntwork-io/terraform-aws-eks/tree/v3.1.2/modules/eks-vpc-tags" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.64.3" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module exports a set of known tags for VPCs that are used for an [Elastic Container Service for
Kubernetes Cluster](https://docs.aws.amazon.com/eks/latest/userguide/clusters.html).

EKS relies on various tags on resources related to the cluster to provide integrations with plugins in Kubernetes. For
example, VPC subnets must be tagged with `kubernetes.io/cluster/EKS_CLUSTER_NAME=shared` so that the [amazon-vpc-cni-k8s
plugin](https://github.com/aws/amazon-vpc-cni-k8s) knows which subnet to use to allocate IPs for Kubernetes pods. The
tags exported by this module are the most common recommended tags to use for a newly created VPC intended to be used
with EKS.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-VPC-TAGS MODULE
# ------------------------------------------------------------------------------------------------------

module "eks_vpc_tags" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-vpc-tags?ref=v3.1.2"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Names of the EKS clusters that you would like to associate with this VPC.
  eks_cluster_names = <list(string)>

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-VPC-TAGS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-vpc-tags?ref=v3.1.2"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Names of the EKS clusters that you would like to associate with this VPC.
  eks_cluster_names = <list(string)>

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="eks_cluster_names" requirement="required" type="list(string)">
<HclListItemDescription>

Names of the EKS clusters that you would like to associate with this VPC.

</HclListItemDescription>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="vpc_eks_tags">
<HclListItemDescription>

Tags for the VPC to use for integration with EKS.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_private_app_subnet_eks_tags">
<HclListItemDescription>

Tags for private application subnets in the VPC to use for integration with EKS.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_private_persistence_subnet_eks_tags">
<HclListItemDescription>

Tags for private persistence tier subnets in the VPC to use for integration with EKS.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_public_subnet_eks_tags">
<HclListItemDescription>

Tags for public subnets in the VPC to use for integration with EKS.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v3.1.2/modules/eks-vpc-tags/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v3.1.2/modules/eks-vpc-tags/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v3.1.2/modules/eks-vpc-tags/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "3b95f66e69a1d5fed2710af065839cbf"
}
##DOCS-SOURCER-END -->
