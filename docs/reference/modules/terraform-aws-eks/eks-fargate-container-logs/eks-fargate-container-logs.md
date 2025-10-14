---
title: "EKS Fargate Container Logs Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon EKS" version="3.1.1" lastModifiedVersion="0.72.1"/>

# EKS Fargate Container Logs Module

<a href="https://github.com/gruntwork-io/terraform-aws-eks/tree/v3.1.1/modules/eks-fargate-container-logs" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.72.1" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module supports collecting logs from Fargate Pods and shipping them to CloudWatch Logs, Elasticsearch, Kinesis
Streams, or Kinesis Firehose.

This Terraform Module sets up the required Kubernetes `Namespace` and `ConfigMap` for configuring the [Fluent
Bit](https://fluentbit.io/) instance that runs on Fargate worker nodes. This allows you to instrument container log
aggregation on Fargate Pods in EKS without setting up a side car container.

**This module is for setting up log aggregation for EKS Fargate Pods. For other pods, take a look at the
[eks-container-logs](https://github.com/gruntwork-io/terraform-aws-eks/tree/v3.1.1/modules/eks-container-logs) module.**

## How does this work?

This module solves the problem of unifying the log streams from EKS Fargate Pods in your Kubernetes cluster to be
shipped to an aggregation service on AWS (CloudWatch Logs, Kinesis, or Firehose) so that you have a single interface to
search and monitor your logs. Since Fargate doesn't support `DaemonSets`, traditionally you had to rely on side car
containers to implement the log aggregation. This required writing logs to a location that was shared with the side
cars, requiring instrumentation to both the application and infrastructure.

This module leverages the built in `fluent-bit` service on Fargate worker nodes that run the EKS Pods. EKS supports
configuring `fluent-bit` on the Fargate workers to ship to arbitrary targets if it sees a special `ConfigMap` that
contains the `fluent-bit` configuration. The Fargate `fluent-bit` service expects to see the `fluent-bit` configuration
in a `ConfigMap` named `aws-logging` in the `aws-observability` Namespace. This module can be used to manage the
`Namespace` and the `ConfigMap`.

You can read more about `fluent-bit` in their [official home page](https://fluentbit.io/). You can also learn more about
Fargate Pod Logging in [the official AWS
documentation](https://docs.aws.amazon.com/eks/latest/userguide/fargate-logging.html).

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

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-FARGATE-CONTAINER-LOGS MODULE
# ------------------------------------------------------------------------------------------------------

module "eks_fargate_container_logs" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-fargate-container-logs?ref=v3.1.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of ARNs of Fargate execution IAM roles that should have permission to
  # talk to each output target. Policies that grant permissions to each output
  # service will be attached to these IAM roles.
  fargate_execution_iam_role_arns = <list(string)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Configurations for forwarding logs to AWS managed Elasticsearch. Set to null
  # if you do not wish to forward the logs to ES.
  aws_elasticsearch_configuration = null

  # The AWS partition used for default AWS Resources.
  aws_partition = "aws"

  # Configurations for forwarding logs to CloudWatch Logs. Set to null if you do
  # not wish to forward the logs to CloudWatch Logs.
  cloudwatch_configuration = null

  # Annotations to associate with the aws-logging ConfigMap
  configmap_annotations = {}

  # Labels to associate with the aws-logging ConfigMap
  configmap_labels = {}

  # Tags to apply to all AWS resources managed by this module.
  default_tags = {}

  # Can be used to provide custom filtering of the log output. This string
  # should be formatted according to Fluent Bit docs, as it will be injected
  # directly into the fluent-bit.conf file.
  extra_filters = ""

  # Can be used to provide custom parsers of the log output. This string should
  # be formatted according to Fluent Bit docs, as it will be injected directly
  # into the fluent-bit.conf file.
  extra_parsers = ""

  # A map of custom tags to apply to the IAM Policies created for the Fargate
  # Execution IAM Role if enabled. The key is the tag name and the value is the
  # tag value.
  fargate_iam_policy_tags = {}

  # Configurations for forwarding logs to Kinesis Firehose. Set to null if you
  # do not wish to forward the logs to Firehose.
  firehose_configuration = null

  # Whether or not Kubernetes metadata is added to the log files
  include_kubernetes_metadata = true

  # Configurations for forwarding logs to Kinesis stream. Set to null if you do
  # not wish to forward the logs to Kinesis.
  kinesis_configuration = null

  # The time Fluent Bit waits until it communicates with the API server for the
  # latest metadata. The smaller the TTL, the more load is generated on the API
  # server. This setting will only have effect, when
  # 'include_kubernetes_metadata' is 'true'.
  kubernetes_metadata_cache_ttl = "300s"

  # When enabled, it checks if the log field content is a JSON string map, if
  # so, it append the map fields as part of the log structure. This setting will
  # only have effect, when 'include_kubernetes_metadata' is 'true'.
  kubernetes_metadata_merge_log = false

  # If Merge_Log_Key is set, all the new structured fields taken from the
  # original log content are inserted under the new key. This setting will only
  # have effect, when 'include_kubernetes_metadata' is 'true'.
  kubernetes_metadata_merge_log_key = null

  # Annotations to associate with the aws-observability Namespace
  namespace_annotations = {}

  # Labels to associate with the aws-observability Namespace
  namespace_labels = {}

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-FARGATE-CONTAINER-LOGS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-fargate-container-logs?ref=v3.1.1"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of ARNs of Fargate execution IAM roles that should have permission to
  # talk to each output target. Policies that grant permissions to each output
  # service will be attached to these IAM roles.
  fargate_execution_iam_role_arns = <list(string)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Configurations for forwarding logs to AWS managed Elasticsearch. Set to null
  # if you do not wish to forward the logs to ES.
  aws_elasticsearch_configuration = null

  # The AWS partition used for default AWS Resources.
  aws_partition = "aws"

  # Configurations for forwarding logs to CloudWatch Logs. Set to null if you do
  # not wish to forward the logs to CloudWatch Logs.
  cloudwatch_configuration = null

  # Annotations to associate with the aws-logging ConfigMap
  configmap_annotations = {}

  # Labels to associate with the aws-logging ConfigMap
  configmap_labels = {}

  # Tags to apply to all AWS resources managed by this module.
  default_tags = {}

  # Can be used to provide custom filtering of the log output. This string
  # should be formatted according to Fluent Bit docs, as it will be injected
  # directly into the fluent-bit.conf file.
  extra_filters = ""

  # Can be used to provide custom parsers of the log output. This string should
  # be formatted according to Fluent Bit docs, as it will be injected directly
  # into the fluent-bit.conf file.
  extra_parsers = ""

  # A map of custom tags to apply to the IAM Policies created for the Fargate
  # Execution IAM Role if enabled. The key is the tag name and the value is the
  # tag value.
  fargate_iam_policy_tags = {}

  # Configurations for forwarding logs to Kinesis Firehose. Set to null if you
  # do not wish to forward the logs to Firehose.
  firehose_configuration = null

  # Whether or not Kubernetes metadata is added to the log files
  include_kubernetes_metadata = true

  # Configurations for forwarding logs to Kinesis stream. Set to null if you do
  # not wish to forward the logs to Kinesis.
  kinesis_configuration = null

  # The time Fluent Bit waits until it communicates with the API server for the
  # latest metadata. The smaller the TTL, the more load is generated on the API
  # server. This setting will only have effect, when
  # 'include_kubernetes_metadata' is 'true'.
  kubernetes_metadata_cache_ttl = "300s"

  # When enabled, it checks if the log field content is a JSON string map, if
  # so, it append the map fields as part of the log structure. This setting will
  # only have effect, when 'include_kubernetes_metadata' is 'true'.
  kubernetes_metadata_merge_log = false

  # If Merge_Log_Key is set, all the new structured fields taken from the
  # original log content are inserted under the new key. This setting will only
  # have effect, when 'include_kubernetes_metadata' is 'true'.
  kubernetes_metadata_merge_log_key = null

  # Annotations to associate with the aws-observability Namespace
  namespace_annotations = {}

  # Labels to associate with the aws-observability Namespace
  namespace_labels = {}

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="fargate_execution_iam_role_arns" requirement="required" type="list(string)">
<HclListItemDescription>

List of ARNs of Fargate execution IAM roles that should have permission to talk to each output target. Policies that grant permissions to each output service will be attached to these IAM roles.

</HclListItemDescription>
</HclListItem>

### Optional

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

    # The name of the AWS CloudWatch Log Group to use for all the logs shipped by the cluster.
    log_group_name = string

    # Prefix to append to all CloudWatch Log Streams in the group shipped by fluentbit.
    log_stream_prefix = string
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

     The name of the AWS CloudWatch Log Group to use for all the logs shipped by the cluster.

```
</details>

<details>


```hcl

     Prefix to append to all CloudWatch Log Streams in the group shipped by fluentbit.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="configmap_annotations" requirement="optional" type="map(string)">
<HclListItemDescription>

Annotations to associate with the aws-logging ConfigMap

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="configmap_labels" requirement="optional" type="map(string)">
<HclListItemDescription>

Labels to associate with the aws-logging ConfigMap

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="default_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags to apply to all AWS resources managed by this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="extra_filters" requirement="optional" type="string">
<HclListItemDescription>

Can be used to provide custom filtering of the log output. This string should be formatted according to Fluent Bit docs, as it will be injected directly into the fluent-bit.conf file.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="extra_parsers" requirement="optional" type="string">
<HclListItemDescription>

Can be used to provide custom parsers of the log output. This string should be formatted according to Fluent Bit docs, as it will be injected directly into the fluent-bit.conf file.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="fargate_iam_policy_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the IAM Policies created for the Fargate Execution IAM Role if enabled. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
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

<HclListItem name="include_kubernetes_metadata" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not Kubernetes metadata is added to the log files

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
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

<HclListItem name="kubernetes_metadata_cache_ttl" requirement="optional" type="string">
<HclListItemDescription>

The time Fluent Bit waits until it communicates with the API server for the latest metadata. The smaller the TTL, the more load is generated on the API server. This setting will only have effect, when 'include_kubernetes_metadata' is 'true'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;300s&quot;"/>
</HclListItem>

<HclListItem name="kubernetes_metadata_merge_log" requirement="optional" type="bool">
<HclListItemDescription>

When enabled, it checks if the log field content is a JSON string map, if so, it append the map fields as part of the log structure. This setting will only have effect, when 'include_kubernetes_metadata' is 'true'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="kubernetes_metadata_merge_log_key" requirement="optional" type="string">
<HclListItemDescription>

If Merge_Log_Key is set, all the new structured fields taken from the original log content are inserted under the new key. This setting will only have effect, when 'include_kubernetes_metadata' is 'true'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="namespace_annotations" requirement="optional" type="map(string)">
<HclListItemDescription>

Annotations to associate with the aws-observability Namespace

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="namespace_labels" requirement="optional" type="map(string)">
<HclListItemDescription>

Labels to associate with the aws-observability Namespace

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="use_managed_iam_policies" requirement="optional" type="bool">
<HclListItemDescription>

When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="config_map_id">
<HclListItemDescription>

The ID of the Kubernetes ConfigMap containing the logging configuration. This can be used to chain other downstream dependencies to the ConfigMap.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v3.1.1/modules/eks-fargate-container-logs/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v3.1.1/modules/eks-fargate-container-logs/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v3.1.1/modules/eks-fargate-container-logs/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "1fe30dea520271c80e60dcb13d50919e"
}
##DOCS-SOURCER-END -->
