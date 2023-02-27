---
title: "EKS Cluster Workers Cross Access Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules%2Feks-cluster-workers-cross-access" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-eks/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# EKS Cluster Workers Cross Access Module

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




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="eks_worker_security_group_ids" requirement="required" type="list(string)">
<HclListItemDescription>

The list of Security Group IDs for EKS workers that should have reciprocating ingress rules for the port information provided in <a href="#ports"><code>ports</code></a>. For each group in the list, there will be an ingress rule created for all ports provided for all the other groups in the list.

</HclListItemDescription>
</HclListItem>

<HclListItem name="num_eks_worker_security_group_ids" requirement="required" type="number">
<HclListItemDescription>

The number of Security Group IDs passed into the module. This should be equal to the length of the <a href="#eks_worker_security_group_ids"><code>eks_worker_security_group_ids</code></a> input list.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="ports" requirement="optional" type="list(object(…))">
<HclListItemDescription>

The list of port ranges that should be allowed into the security groups.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    from_port = number
    to_port   = number
    protocol  = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
[
  {
    from_port = 0,
    protocol = "-1",
    to_port = 0
  }
]
```

</HclListItemDefaultValue>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">



</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/modules%2Feks-cluster-workers-cross-access%2Freadme.md",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/modules%2Feks-cluster-workers-cross-access%2Fvariables.tf",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/modules%2Feks-cluster-workers-cross-access%2Foutputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "373d043a6a1522006f678e10b2803cbd"
}
##DOCS-SOURCER-END -->
