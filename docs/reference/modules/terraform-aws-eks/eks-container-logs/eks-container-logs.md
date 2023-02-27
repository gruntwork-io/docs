---
title: "EKS Container Logs Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules%2Feks-container-logs" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-eks/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# EKS Container Logs Module

This Terraform Module installs and configures
[aws-for-fluent-bit](https://github.com/aws/aws-for-fluent-bit) on an EKS cluster, so that
each node runs [fluent-bit](https://fluentbit.io/) to collect the logs and ship to CloudWatch Logs, Kinesis Streams, or
Kinesis Firehose.

This module uses the community helm chart, with a set of best practices inputs.

**This module is for setting up log aggregation for EKS Pods on EC2 workers (self-managed or managed node groups). For
Fargate pods, take a look at the [eks-fargate-container-logs](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-fargate-container-logs) module.**

## How does this work?

This module solves the problem of unifying the log streams in your Kubernetes cluster to be shipped to an aggregation
service on AWS (CloudWatch Logs, Kinesis, or Firehose) so that you have a single interface to search and monitor your
logs. To achieve this, the module installs a service (`fluent-bit`) that monitors the log files on the filesystem,
parses custom log formats into a unified format, and ships the result to a centralized log aggregation service
(CloudWatch).

`fluent-bit` is installed as a Kubernetes
[`DaemonSet`](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/), which ensures that there is one
`fluent-bit` `Pod` running per node. In this way, we are able to ensure that all workers in the cluster are running the
`fluent-bit` service for shipping the logs into CloudWatch.

You can read more about `fluent-bit` in their [official home page](https://fluentbit.io/). You can also learn more about
CloudWatch logging in the [official AWS
docs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html).

## What is the difference with fluentd?

[fluent-bit](https://fluentbit.io/) is an optimized version of [fluentd](https://www.fluentd.org/) that focuses on
streaming and aggregating log files.  `fluentd` has a larger ecosystem of plugins that enable various processing
capabilities on top of the logs prior to aggregating in the data store.

For most EKS deployments, it is recommended to use this `fluent-bit` module for container log aggregation. Unless you have a specific
need for a plugin only supported by `fluentd`, the superior performance and memory footprint of `fluent-bit` will
ensure resources are available on your EKS workers for your Pods.

## Log format

This module leverages native plugins for Kubernetes built into `fluent-bit` that extract additional
metadata for each Pod that is reporting. Each log is shipped to the respective outputs in the following structure:

```json
{
    "kubernetes": {
        "namespace_name": "NAMESPACE_WHERE_POD_LOCATED",
        "pod_name": "NAME_OF_POD_EMITTING_LOG",
        "pod_id": "ID_IN_KUBERNETES_OF_POD",
        "container_hash": "KUBERNETES_GENERATED_HASH_OF_CONTAINER_EMITTING_LOG",
        "container_name": "NAME_OF_CONTAINER_IN_POD_EMITTING_LOG",
        "docker_id": "ID_IN_DOCKER_OF_CONTAINER",
        "host": "NODE_NAME_OF_HOST_EMITTING_LOG",
        "labels": {
            "KEY": "VALUE",
        },
        "annotations": {
            "KEY": "VALUE"
        }
    },
    "log": "CONTENTS_OF_LOG_MESSAGE",
    "stream": "STDERR_OR_STDOUT",
    "time": "TIMESTAMP_OF_LOG"
}
```

This allows you to filter and search the logs by the respective attributes. For example, the following CloudWatch
Insights Query can be used to search for all logs from Pods in the `kube-system` Namespace:

```
fields @timestamp, @message
| filter kubernetes.namespace_name = "kube-system"
| sort @timestamp desc
| limit 20
```




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

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

<HclListItem name="additional_inputs" requirement="optional" type="string">
<HclListItemDescription>

Can be used to add more inputs. This string should be formatted according to Fluent Bit docs, as it will be injected directly into the fluent-bit.conf file.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="aws_elasticsearch_configuration" requirement="optional" type="object(…)">
<HclListItemDescription>

Configurations for forwarding logs to AWS managed Elasticsearch. Set to null if you do not wish to forward the logs to ES.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # The AWS region where the Elasticsearch instance is deployed.
    region = string

    # Elasticsearch endpoint to ship logs to.
    endpoint = object({
      host = string
      port = number
    })

    # Whether or not AWS based authentication and authorization is enabled on the Elasticsearch instance.
    use_aws_auth = bool

    # Whether or not TLS is enabled on the Elasticsearch endpoint.
    use_tls = bool

    # Match string for logs to send to Elasticsearch.
    match = string
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

     Elasticsearch endpoint to ship logs to.

```
</details>

<details>


```hcl

     Whether or not AWS based authentication and authorization is enabled on the Elasticsearch instance.

```
</details>

<details>


```hcl

     Whether or not TLS is enabled on the Elasticsearch endpoint.

```
</details>

<details>


```hcl

     Match string for logs to send to Elasticsearch.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="aws_for_fluent_bit_chart_version" requirement="optional" type="string">
<HclListItemDescription>

The version of the aws-for-fluent-bit helm chart to deploy. Note that this is different from the app/container version (use <a href="#aws_for_fluent_bit_version"><code>aws_for_fluent_bit_version</code></a> to control the app/container version).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;0.1.15&quot;"/>
</HclListItem>

<HclListItem name="aws_for_fluent_bit_image_repository" requirement="optional" type="string">
<HclListItemDescription>

The Container repository to use for looking up the aws-for-fluent-bit Container image when deploying the pods. When null, uses the default repository set in the chart.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="aws_for_fluent_bit_version" requirement="optional" type="string">
<HclListItemDescription>

Which version of aws-for-fluent-bit to install. When null, uses the default version set in the chart.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="aws_partition" requirement="optional" type="string">
<HclListItemDescription>

The AWS partition used for default AWS Resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;aws&quot;"/>
</HclListItem>

<HclListItem name="cloudwatch_configuration" requirement="optional" type="object(…)">
<HclListItemDescription>

Configurations for forwarding logs to CloudWatch Logs. Set to null if you do not wish to forward the logs to CloudWatch Logs.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # The AWS region that holds the CloudWatch Log Group where the logs will be streamed to.
    region = string

    # The name of the AWS CloudWatch Log Group to use for all the logs shipped by the cluster. Set to null to use chart
    # default (`/aws/eks/fluentbit-cloudwatch/logs`).
    log_group_name = string

    # Prefix to append to all CloudWatch Log Streams in the group shipped by fluentbit. Use "" if you do not with to
    # attach a prefix, or null to use chart default (`fluentbit-`).
    log_stream_prefix = string
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

     The name of the AWS CloudWatch Log Group to use for all the logs shipped by the cluster. Set to null to use chart
     default (`/aws/eks/fluentbit-cloudwatch/logs`).

```
</details>

<details>


```hcl

     Prefix to append to all CloudWatch Log Streams in the group shipped by fluentbit. Use "" if you do not with to
     attach a prefix, or null to use chart default (`fluentbit-`).

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="dependencies" requirement="optional" type="list(string)">
<HclListItemDescription>

Create a dependency between the resources in this module to the interpolated values in this list (and thus the source resources). In other words, the resources in this module will now depend on the resources backing the values in this list such that those resources need to be created before the resources in this module, and the resources in this module need to be destroyed before the resources in the list.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="extra_filters" requirement="optional" type="string">
<HclListItemDescription>

Can be used to provide custom filtering of the log output. This string should be formatted according to Fluent Bit docs, as it will be injected directly into the fluent-bit.conf file.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="extra_outputs" requirement="optional" type="string">
<HclListItemDescription>

Can be used to fan out the log output to multiple additional clients beyond the AWS ones. This string should be formatted according to Fluent Bit docs, as it will be injected directly into the fluent-bit.conf file.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="firehose_configuration" requirement="optional" type="object(…)">
<HclListItemDescription>

Configurations for forwarding logs to Kinesis Firehose. Set to null if you do not wish to forward the logs to Firehose.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # The AWS region that holds the Firehose delivery stream.
    region = string

    # The name of the delivery stream you want log records sent to. This must already exist.
    delivery_stream_name = string
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

     The name of the delivery stream you want log records sent to. This must already exist.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="iam_role_name_prefix" requirement="optional" type="string">
<HclListItemDescription>

Used to name IAM roles for the service account. Recommended when <a href="#iam_role_for_service_accounts_config"><code>iam_role_for_service_accounts_config</code></a> is configured.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="kinesis_configuration" requirement="optional" type="object(…)">
<HclListItemDescription>

Configurations for forwarding logs to Kinesis stream. Set to null if you do not wish to forward the logs to Kinesis.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # The AWS region that holds the Kinesis stream.
    region = string

    # The name of the stream you want log records sent to. This must already exist.
    stream_name = string
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

     The name of the stream you want log records sent to. This must already exist.

```
</details>

</HclGeneralListItem>
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

Specify the resource limits and requests for the fluent-bit pods. Set to null (default) to use chart defaults.

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

<HclListItem name="use_cri_parser_conf" requirement="optional" type="bool">
<HclListItemDescription>

Optionally use a cri parser instead of the default Docker parser. This should be used for EKS v1.24 and later.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="use_managed_iam_policies" requirement="optional" type="bool">
<HclListItemDescription>

When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">



</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/modules%2Feks-container-logs%2Freadme.md",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/modules%2Feks-container-logs%2Fvariables.tf",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/modules%2Feks-container-logs%2Foutputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "da288eaade64b85ec9a371e6131ad73d"
}
##DOCS-SOURCER-END -->
