---
title: "EKS Container Logs Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon EKS" version="0.65.2" lastModifiedVersion="0.64.3"/>

# EKS Container Logs Module

<a href="https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.65.2/modules/eks-container-logs" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.64.3" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module installs and configures
[aws-for-fluent-bit](https://github.com/aws/aws-for-fluent-bit) on an EKS cluster, so that
each node runs [fluent-bit](https://fluentbit.io/) to collect the logs and ship to CloudWatch Logs, Kinesis Streams, or
Kinesis Firehose.

This module uses the community helm chart, with a set of best practices inputs.

**This module is for setting up log aggregation for EKS Pods on EC2 workers (self-managed or managed node groups). For
Fargate pods, take a look at the [eks-fargate-container-logs](https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.65.2/modules/eks-fargate-container-logs) module.**

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

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-CONTAINER-LOGS MODULE
# ------------------------------------------------------------------------------------------------------

module "eks_container_logs" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-container-logs?ref=v0.65.2"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Configuration for using the IAM role with Service Accounts feature to
  # provide permissions to the helm charts. This expects a map with two
  # properties: `openid_connect_provider_arn` and `openid_connect_provider_url`.
  # The `openid_connect_provider_arn` is the ARN of the OpenID Connect Provider
  # for EKS to retrieve IAM credentials, while `openid_connect_provider_url` is
  # the URL. Set to null if you do not wish to use IAM role with Service
  # Accounts.
  iam_role_for_service_accounts_config = <object(
    openid_connect_provider_arn = string
    openid_connect_provider_url = string
  )>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Can be used to add additional filter configuration blocks. This string
  # should be formatted according to Fluent Bit docs, as it will be injected
  # directly into the fluent-bit.conf file.
  additional_filters = ""

  # Can be used to add more inputs. This string should be formatted according to
  # Fluent Bit docs, as it will be injected directly into the fluent-bit.conf
  # file.
  additional_inputs = ""

  # Configurations for forwarding logs to AWS managed Elasticsearch. Set to null
  # if you do not wish to forward the logs to ES.
  aws_elasticsearch_configuration = null

  # The version of the aws-for-fluent-bit helm chart to deploy. Note that this
  # is different from the app/container version (use
  # var.aws_for_fluent_bit_version to control the app/container version).
  aws_for_fluent_bit_chart_version = "0.1.23"

  # The Container repository to use for looking up the aws-for-fluent-bit
  # Container image when deploying the pods. When null, uses the default
  # repository set in the chart.
  aws_for_fluent_bit_image_repository = null

  # Which version of aws-for-fluent-bit to install. When null, uses the default
  # version set in the chart.
  aws_for_fluent_bit_version = null

  # The AWS partition used for default AWS Resources.
  aws_partition = "aws"

  # Configurations for forwarding logs to CloudWatch Logs. Set to null if you do
  # not wish to forward the logs to CloudWatch Logs.
  cloudwatch_configuration = {"autoCreateGroup":null,"credentialsEndpoint":null,"enabled":null,"endpoint":null,"extraOutputs":null,"logFormat":null,"logKey":null,"logRetentionDays":null,"logStreamName":null,"log_group_name":null,"log_stream_prefix":null,"match":null,"region":null,"roleArn":null}

  # Configurations for adjusting the default filter settings. Set to null if you
  # do not wish to use the default filter.
  default_filter_configuration = {"bufferSize":"32k","enabled":true,"k8sLoggingExclude":"On","k8sLoggingParser":"On","keepLog":"On","kubeURL":"https://kubernetes.default.svc.cluster.local:443","match":"kube.*","mergeLog":"On","mergeLogKey":"data"}

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # Can be used to provide additional kubernetes plugin configuration parameters
  # for the default kubernetes filter that is pre-configured in the
  # aws-for-fluent-bit Helm chart. This string should be formatted according to
  # Fluent Bit docs, as it will append to the default kubernetes filter
  # configuration.
  extra_filters = ""

  # Can be used to fan out the log output to multiple additional clients beyond
  # the AWS ones. This string should be formatted according to Fluent Bit docs,
  # as it will be injected directly into the fluent-bit.conf file.
  extra_outputs = ""

  # Can be used to add additional log parsers. This string should be formatted
  # according to Fluent Bit docs, as it will be injected directly into the
  # fluent-bit.conf file.
  extra_parsers = ""

  # Configurations for forwarding logs to Kinesis Firehose. Set to null if you
  # do not wish to forward the logs to Firehose.
  firehose_configuration = null

  # Used to name IAM roles for the service account. Recommended when
  # var.iam_role_for_service_accounts_config is configured.
  iam_role_name_prefix = null

  # Configurations for forwarding logs to Kinesis stream. Set to null if you do
  # not wish to forward the logs to Kinesis.
  kinesis_configuration = null

  # Configure affinity rules for the Pod to control which nodes to schedule on.
  # Each item in the list should be a map with the keys `key`, `values`, and
  # `operator`, corresponding to the 3 properties of matchExpressions. Note that
  # all expressions must be satisfied to schedule on the node.
  pod_node_affinity = []

  # Specify the resource limits and requests for the fluent-bit pods. Set to
  # null (default) to use chart defaults.
  pod_resources = null

  # Configure tolerations rules to allow the Pod to schedule on nodes that have
  # been tainted. Each item in the list specifies a toleration rule.
  pod_tolerations = []

  # Optionally use a cri parser instead of the default Docker parser. This
  # should be used for EKS v1.24 and later.
  use_cri_parser_conf = true

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
# DEPLOY GRUNTWORK'S EKS-CONTAINER-LOGS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-container-logs?ref=v0.65.2"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Configuration for using the IAM role with Service Accounts feature to
  # provide permissions to the helm charts. This expects a map with two
  # properties: `openid_connect_provider_arn` and `openid_connect_provider_url`.
  # The `openid_connect_provider_arn` is the ARN of the OpenID Connect Provider
  # for EKS to retrieve IAM credentials, while `openid_connect_provider_url` is
  # the URL. Set to null if you do not wish to use IAM role with Service
  # Accounts.
  iam_role_for_service_accounts_config = <object(
    openid_connect_provider_arn = string
    openid_connect_provider_url = string
  )>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Can be used to add additional filter configuration blocks. This string
  # should be formatted according to Fluent Bit docs, as it will be injected
  # directly into the fluent-bit.conf file.
  additional_filters = ""

  # Can be used to add more inputs. This string should be formatted according to
  # Fluent Bit docs, as it will be injected directly into the fluent-bit.conf
  # file.
  additional_inputs = ""

  # Configurations for forwarding logs to AWS managed Elasticsearch. Set to null
  # if you do not wish to forward the logs to ES.
  aws_elasticsearch_configuration = null

  # The version of the aws-for-fluent-bit helm chart to deploy. Note that this
  # is different from the app/container version (use
  # var.aws_for_fluent_bit_version to control the app/container version).
  aws_for_fluent_bit_chart_version = "0.1.23"

  # The Container repository to use for looking up the aws-for-fluent-bit
  # Container image when deploying the pods. When null, uses the default
  # repository set in the chart.
  aws_for_fluent_bit_image_repository = null

  # Which version of aws-for-fluent-bit to install. When null, uses the default
  # version set in the chart.
  aws_for_fluent_bit_version = null

  # The AWS partition used for default AWS Resources.
  aws_partition = "aws"

  # Configurations for forwarding logs to CloudWatch Logs. Set to null if you do
  # not wish to forward the logs to CloudWatch Logs.
  cloudwatch_configuration = {"autoCreateGroup":null,"credentialsEndpoint":null,"enabled":null,"endpoint":null,"extraOutputs":null,"logFormat":null,"logKey":null,"logRetentionDays":null,"logStreamName":null,"log_group_name":null,"log_stream_prefix":null,"match":null,"region":null,"roleArn":null}

  # Configurations for adjusting the default filter settings. Set to null if you
  # do not wish to use the default filter.
  default_filter_configuration = {"bufferSize":"32k","enabled":true,"k8sLoggingExclude":"On","k8sLoggingParser":"On","keepLog":"On","kubeURL":"https://kubernetes.default.svc.cluster.local:443","match":"kube.*","mergeLog":"On","mergeLogKey":"data"}

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # Can be used to provide additional kubernetes plugin configuration parameters
  # for the default kubernetes filter that is pre-configured in the
  # aws-for-fluent-bit Helm chart. This string should be formatted according to
  # Fluent Bit docs, as it will append to the default kubernetes filter
  # configuration.
  extra_filters = ""

  # Can be used to fan out the log output to multiple additional clients beyond
  # the AWS ones. This string should be formatted according to Fluent Bit docs,
  # as it will be injected directly into the fluent-bit.conf file.
  extra_outputs = ""

  # Can be used to add additional log parsers. This string should be formatted
  # according to Fluent Bit docs, as it will be injected directly into the
  # fluent-bit.conf file.
  extra_parsers = ""

  # Configurations for forwarding logs to Kinesis Firehose. Set to null if you
  # do not wish to forward the logs to Firehose.
  firehose_configuration = null

  # Used to name IAM roles for the service account. Recommended when
  # var.iam_role_for_service_accounts_config is configured.
  iam_role_name_prefix = null

  # Configurations for forwarding logs to Kinesis stream. Set to null if you do
  # not wish to forward the logs to Kinesis.
  kinesis_configuration = null

  # Configure affinity rules for the Pod to control which nodes to schedule on.
  # Each item in the list should be a map with the keys `key`, `values`, and
  # `operator`, corresponding to the 3 properties of matchExpressions. Note that
  # all expressions must be satisfied to schedule on the node.
  pod_node_affinity = []

  # Specify the resource limits and requests for the fluent-bit pods. Set to
  # null (default) to use chart defaults.
  pod_resources = null

  # Configure tolerations rules to allow the Pod to schedule on nodes that have
  # been tainted. Each item in the list specifies a toleration rule.
  pod_tolerations = []

  # Optionally use a cri parser instead of the default Docker parser. This
  # should be used for EKS v1.24 and later.
  use_cri_parser_conf = true

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


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.65.2/modules/eks-container-logs/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.65.2/modules/eks-container-logs/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v0.65.2/modules/eks-container-logs/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "5edae4982b327a8b8c7acb7eff018321"
}
##DOCS-SOURCER-END -->
