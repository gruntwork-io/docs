---
title: "EKS Cluster Workers Cross Access Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon EKS" version="0.79.0" lastModifiedVersion="0.64.3"/>

# EKS Cluster Workers Cross Access Module

<a href="https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.79.0/modules/eks-cluster-workers-cross-access" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.64.3" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module creates reciprocating ingress security group rules for the ports that are provided, so that you
can configure network access between separate ASG worker groups.

This module should be used when you have core services that can be scheduled on any of your available worker groups, and
services on either group depend on them. For example, `coredns` is an essential service on EKS clusters that provide DNS
capabilities within the Kubernetes cluster. `coredns` has tolerations such that it can be scheduled on any node.
Therefore, you will typically want to ensure port 53 is available between all your worker pools. To allow port 53 access
between all your worker groups, you can add the following module block:

```hcl
module "allow_all_access_between_worker_pools" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-cluster-workers-cross-access?ref=v0.3.1"

  # This should be the number of security groups in the list eks_worker_security_group_ids.
  num_eks_worker_security_group_ids = 2

  eks_worker_security_group_ids = [
    # Include the security group ID of each worker group
  ]

  ports = [
    {
      from_port = 53
      to_port   = 53
    },
  ]
}
```

Note that this module will configure the security group rules to go both ways for each pair in the provided list. If you
have more complex network topologies, you should manually construct the security group rules instead of using this
module.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-CLUSTER-WORKERS-CROSS-ACCESS MODULE
# ------------------------------------------------------------------------------------------------------

module "eks_cluster_workers_cross_access" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-cluster-workers-cross-access?ref=v0.79.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The list of Security Group IDs for EKS workers that should have
  # reciprocating ingress rules for the port information provided in var.ports.
  # For each group in the list, there will be an ingress rule created for all
  # ports provided for all the other groups in the list.
  eks_worker_security_group_ids = <list(string)>

  # The number of Security Group IDs passed into the module. This should be
  # equal to the length of the var.eks_worker_security_group_ids input list.
  num_eks_worker_security_group_ids = <number>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The list of port ranges that should be allowed into the security groups.
  ports = [{"from_port":0,"protocol":"-1","to_port":0}]

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-CLUSTER-WORKERS-CROSS-ACCESS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-cluster-workers-cross-access?ref=v0.79.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The list of Security Group IDs for EKS workers that should have
  # reciprocating ingress rules for the port information provided in var.ports.
  # For each group in the list, there will be an ingress rule created for all
  # ports provided for all the other groups in the list.
  eks_worker_security_group_ids = <list(string)>

  # The number of Security Group IDs passed into the module. This should be
  # equal to the length of the var.eks_worker_security_group_ids input list.
  num_eks_worker_security_group_ids = <number>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The list of port ranges that should be allowed into the security groups.
  ports = [{"from_port":0,"protocol":"-1","to_port":0}]

}


```

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.79.0/modules/eks-cluster-workers-cross-access/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.79.0/modules/eks-cluster-workers-cross-access/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.79.0/modules/eks-cluster-workers-cross-access/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "99dd9b4faac11ef95f8066a0611ca3a6"
}
##DOCS-SOURCER-END -->
