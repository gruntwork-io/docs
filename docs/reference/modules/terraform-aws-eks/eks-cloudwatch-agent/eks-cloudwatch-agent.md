---
title: "EKS CloudWatch Agent Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-cloudwatch-agent" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-eks/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# EKS CloudWatch Agent Module

This Terraform Module installs and configures
[Amazon CloudWatch Agent](https://github.com/aws/amazon-cloudwatch-agent/) on an EKS cluster, so that
each node runs the agent to collect more system-level metrics from Amazon EC2 instances and ship them to Amazon CloudWatch.
This extra metric data allows using [CloudWatch Container Insights](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContainerInsights.html)
for a single pane of glass for application, performance, host, control plane, data plane insights.

This module uses the [community helm chart](https://github.com/aws/eks-charts/tree/8b063ec/stable/aws-cloudwatch-metrics),
with a set of best practices inputs.

**This module is for setting up CloudWatch Agent for EKS clusters with worker nodes (self-managed or managed node groups) that
have support for [`DaemonSets`](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/). CloudWatch Container
Insights is [not supported for EKS Fargate](https://github.com/aws/containers-roadmap/issues/920).**

## How does this work?

CloudWatch automatically collects metrics for many resources, such as CPU, memory, disk, and network.
Container Insights also provides diagnostic information, such as container restart failures,
to help you isolate issues and resolve them quickly.

In Amazon EKS and Kubernetes, using Container Insights requires using a containerized version of the CloudWatch agent
to discover all of the running containers in a cluster. It collects performance data at every layer of the performance
stack as log events using embedded metric format. From this data, CloudWatch creates aggregated metrics at the cluster,
node, pod, task, and service level as CloudWatch metrics. [The metrics that Container Insights collects](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Container-Insights-metrics-EKS.html)
are available in CloudWatch automatic dashboards, and also viewable in the Metrics section of the CloudWatch console.

`cloudwatch-agent` is installed as a Kubernetes
[`DaemonSet`](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/), which ensures that there is one
`cloudwatch-agent` `Pod` running per node. In this way, we are able to ensure that all workers in the cluster are running the
`cloudwatch-agent` service for shipping the metric data into CloudWatch.

Note that metrics collected by CloudWatch Agent are charged as custom metrics. For more information about CloudWatch pricing,
see [Amazon CloudWatch Pricing](https://aws.amazon.com/cloudwatch/pricing/).

You can read more about `cloudwatch-agent` in the [GitHub repository](https://github.com/aws/amazon-cloudwatch-agent/).
You can also learn more about Container Insights in the [official AWS
docs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContainerInsights.html).




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="eks_cluster_name" requirement="required" type="string">
<HclListItemDescription>

Name of the EKS cluster where resources are deployed to.

</HclListItemDescription>
</HclListItem>

<HclListItem name="iam_role_for_service_accounts_config" requirement="required" type="object(…)">
<HclListItemDescription>

Configuration for using the IAM role with Service Accounts feature to provide permissions to the helm charts. This expects a map with two properties: `openid_connect_provider_arn` and `openid_connect_provider_url`. The `openid_connect_provider_arn` is the ARN of the OpenID Connect Provider for EKS to retrieve IAM credentials, while `openid_connect_provider_url` is the URL. Set to null if you do not wish to use IAM role with Service Accounts.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    openid_connect_provider_arn = string
    openid_connect_provider_url = string
  })
```

</HclListItemTypeDetails>
</HclListItem>

### Optional

<HclListItem name="aws_cloudwatch_agent_image_repository" requirement="optional" type="string">
<HclListItemDescription>

The Container repository to use for looking up the cloudwatch-agent Container image when deploying the pods. When null, uses the default repository set in the chart.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="aws_cloudwatch_agent_version" requirement="optional" type="string">
<HclListItemDescription>

Which version of amazon/cloudwatch-agent to install. When null, uses the default version set in the chart.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="aws_cloudwatch_metrics_chart_version" requirement="optional" type="string">
<HclListItemDescription>

The version of the aws-cloudwatch-metrics helm chart to deploy. Note that this is different from the app/container version (use <a href="#aws_cloudwatch_agent_version"><code>aws_cloudwatch_agent_version</code></a> to control the app/container version).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;0.0.7&quot;"/>
</HclListItem>

<HclListItem name="dependencies" requirement="optional" type="list(string)">
<HclListItemDescription>

Create a dependency between the resources in this module to the interpolated values in this list (and thus the source resources). In other words, the resources in this module will now depend on the resources backing the values in this list such that those resources need to be created before the resources in this module, and the resources in this module need to be destroyed before the resources in the list.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="iam_role_name_prefix" requirement="optional" type="string">
<HclListItemDescription>

Used to name IAM roles for the service account. Recommended when <a href="#iam_role_for_service_accounts_config"><code>iam_role_for_service_accounts_config</code></a> is configured.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="namespace" requirement="optional" type="string">
<HclListItemDescription>

Namespace to create the resources in.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;kube-system&quot;"/>
</HclListItem>

<HclListItem name="pod_node_affinity" requirement="optional" type="list(object(…))">
<HclListItemDescription>

Configure affinity rules for the Pod to control which nodes to schedule on. Each item in the list should be a map with the keys `key`, `values`, and `operator`, corresponding to the 3 properties of matchExpressions. Note that all expressions must be satisfied to schedule on the node.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    key      = string
    values   = list(string)
    operator = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Each item in the list represents a matchExpression for requiredDuringSchedulingIgnoredDuringExecution.
   https://kubernetes.io/docs/concepts/configuration/assign-pod-node/affinity-and-anti-affinity for the various
   configuration option.
  
   Example:
  
   [
     {
       "key" = "node-label-key"
       "values" = ["node-label-value", "another-node-label-value"]
       "operator" = "In"
     }
   ]
  
   Translates to:
  
   nodeAffinity:
     requiredDuringSchedulingIgnoredDuringExecution:
       nodeSelectorTerms:
       - matchExpressions:
         - key: node-label-key
           operator: In
           values:
           - node-label-value
           - another-node-label-value

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="pod_resources" requirement="optional" type="any">
<HclListItemDescription>

Specify the resource limits and requests for the cloudwatch-agent pods. Set to null (default) to use chart defaults.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   This object is passed through to the resources section of a pod spec as described in
   https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
   Example:
  
   {
     requests = {
       cpu    = "250m"
       memory = "128Mi"
     }
     limits = {
       cpu    = "500m"
       memory = "256Mi"
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="pod_tolerations" requirement="optional" type="any">
<HclListItemDescription>

Configure tolerations rules to allow the Pod to schedule on nodes that have been tainted. Each item in the list specifies a toleration rule.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Each item in the list represents a particular toleration. See
   https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/ for the various rules you can specify.
  
   Example:
  
   [
     {
       key = "node.kubernetes.io/unreachable"
       operator = "Exists"
       effect = "NoExecute"
       tolerationSeconds = 6000
     }
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">



</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/modules/eks-cloudwatch-agent/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/modules/eks-cloudwatch-agent/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/modules/eks-cloudwatch-agent/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "f8071d29cb650add922e100aa6d3aace"
}
##DOCS-SOURCER-END -->
