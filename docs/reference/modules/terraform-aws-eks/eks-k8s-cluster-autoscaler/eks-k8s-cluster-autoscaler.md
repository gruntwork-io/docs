---
title: "K8S Cluster Autoscaler Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules%2Feks-k8s-cluster-autoscaler" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-eks/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# K8S Cluster Autoscaler Module

This Terraform Module installs a [Cluster Autoscaler](https://github.com/kubernetes/autoscaler/tree/b6d53e8/cluster-autoscaler)
to automatically scale up and down the nodes in a cluster in response to resource utilization.

This module is responsible for manipulating each Auto Scaling Group (ASG) that was created by the [EKS cluster
workers](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-cluster-workers) module. By default, the ASG is configured to allow zero-downtime
deployments but is not configured to scale automatically. You must launch an [EKS control
plane](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-cluster-control-plane) with worker nodes for this module to function.

## Important Considerations

*   The autoscaler doesn't account for CPU or Memory usage in deciding to scale up, it scales up when Pods fail to
    schedule due to insufficient resources. This means it's important to carefully the manage the compute resources you
    assign to your deployments. See [the Kubernetes
    documentation](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container) on compute
    resources for more information.
*   Scaling down happens when utilization dips below a specified threshold and there are pods that are able to be moved
    to another node. There are [a variety of conditions](https://github.com/kubernetes/autoscaler/blob/b6d53e8/cluster-autoscaler/FAQ.md#what-types-of-pods-can-prevent-ca-from-removing-a-node)
    to be aware of that can prevent pods from being automatically removable which can result in wasted capacity.

## How do I deploy the Pods to Fargate?

To deploy the Pods to Fargate, you can use the `create_fargate_profile` variable to `true` and specify the subnet IDs
for Fargate using `vpc_worker_subnet_ids`. Note that if you are using Fargate, you must rely on the IAM Roles for
Service Accounts (IRSA) feature to grant the necessary AWS IAM permissions to the Pod. This is configured using the
`use_iam_role_for_service_accounts`, `eks_openid_connect_provider_arn`, and `eks_openid_connect_provider_url` input
variables.


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/modules%2Feks-k8s-cluster-autoscaler%2Freadme.md",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/modules%2Feks-k8s-cluster-autoscaler%2Fvariables.tf",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/modules%2Feks-k8s-cluster-autoscaler%2Foutputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "a0368e3e0d90788ae2e45cdfb1e26cc3"
}
##DOCS-SOURCER-END -->
