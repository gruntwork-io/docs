---
title: "EKS Container Logs Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Amazon EKS" version="1.5.0" lastModifiedVersion="0.73.0"/>

# EKS Container Logs Module

<a href="https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.5.0/modules/eks-container-logs" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-eks/releases/tag/v0.73.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module installs and configures
[aws-for-fluent-bit](https://github.com/aws/aws-for-fluent-bit) on an EKS cluster, so that
each node runs [fluent-bit](https://fluentbit.io/) to collect the logs and ship to CloudWatch Logs, Kinesis Streams, or
Kinesis Firehose.

This module uses the community helm chart, with a set of best practices inputs.

**This module is for setting up log aggregation for EKS Pods on EC2 workers (self-managed or managed node groups). For
Fargate pods, take a look at the [eks-fargate-container-logs](https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.5.0/modules/eks-fargate-container-logs) module.**

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

## Using the new high performance plugin for Cloudwatch Logs

[fluent-bit](https://fluentbit.io/) added support for a new, higher performance, plugin to aggregate logs and push them to Cloudwatch logs. However, the configuration parameters differ slightly between the old plugin vs the new plugin.

For example, the following configuration input enables the old cloudwatch logs plugin, with a few minor adjustments:

```terraform
  cloudwatch_configuration = {
    enabled           = true
    region            = "us-west-2"
    logGroupName      = "/aws/eks/example-log-group"
    logStreamPrefix   = "prefix-example"
  }

```

However, with the new input, the same configuration would look like this:

```terraform
  cloudwatch_logs_configuration = {
    enabled         = true
    region          = "us-west-2"
    logGroupName    = "/aws/eks/example-log-group"
    logStreamPrefix = "prefix-example"
  }
```

A new input was deemed important due to subtle configuration differences with the new plugin itself, as new parameters, and differing parameters are used by Helm to configure the new plugin.

### Custom Credential Endpoint with the new plugin

There is one key difference between the old plugin vs the new plugin, and that relates to using a custom credential endpoint. The old cloudwatch plugin uses an HTTP endpoint, where as the new plugin uses an STS based endpoint.

An example of the new configuration would look like this:

```terraform
  cloudwatch_logs_configuration = {
    ...
    stsEndpoint = "https://sts.eu-west-1.amazonaws.com"
  }
```

For more information see the following documentation:

*   [amazon-cloudwatch-logs-for-fluent-bit](https://github.com/aws/amazon-cloudwatch-logs-for-fluent-bit)

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

  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-container-logs?ref=v1.5.0"

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

  # Can be used to add additional outputs with this value.
  additional_outputs = ""

  # Configurations for forwarding logs to AWS managed Elasticsearch. Set to null
  # if you do not wish to forward the logs to ES.
  aws_elasticsearch_configuration = null

  # The name of the aws-for-fluent-bit Helm chart to fetch from the repository.
  # This should always be aws-for-fluent-bit unless fetching from a different
  # repository.
  aws_for_fluent_bit_chart_name = "aws-for-fluent-bit"

  # The Kubernetes namespace to install the Helm chart to.
  aws_for_fluent_bit_chart_namespace = "kube-system"

  # The version of the aws-for-fluent-bit helm chart to deploy. Note that this
  # is different from the app/container version (use
  # var.aws_for_fluent_bit_version to control the app/container version).
  aws_for_fluent_bit_chart_version = "0.1.34"

  # Pull policy for the image. When null, uses the default setting
  # `IfNotPresent` set in the chart.
  aws_for_fluent_bit_image_pull_policy = null

  # The Container repository to use for looking up the aws-for-fluent-bit
  # Container image when deploying the pods. When null, uses the default
  # repository set in the chart.
  aws_for_fluent_bit_image_repository = null

  # The Helm Release Name to create when installing the chart to the cluster.
  aws_for_fluent_bit_release_name = "aws-for-fluent-bit"

  # Which version of aws-for-fluent-bit to install (corresponds to the image
  # tag). When null, uses the default version set in the chart.
  aws_for_fluent_bit_version = null

  # The AWS partition used for default AWS Resources.
  aws_partition = "aws"

  # Configurations for forwarding logs to CloudWatch Logs using the original
  # plugin. Set to null if you do not wish to forward the logs to CloudWatch
  # Logs using the older plugin. This is disabled by default in fluent-bit.
  cloudwatch_configuration = null

  # Configurations for forwarding logs to CloudWatch Logs using a higher
  # performance plugin. Set to null if you do not wish to forward the logs to
  # CloudWatch Logs using this plugin. This plugin is enabled by default in
  # fluent-bit.
  cloudwatch_logs_configuration = {"autoCreateGroup":null,"autoRetryRequests":null,"enabled":true,"endpoint":null,"externalId":null,"extraOutputs":null,"logFormat":null,"logGroupName":"/aws/eks/fluentbit-cloudwatch/logs","logGroupTemplate":null,"logKey":null,"logRetentionDays":null,"logStreamName":null,"logStreamPrefix":"fluentbit-","logStreamTemplate":null,"match":"*","metricDimensions":null,"metricNamespace":null,"region":"us-east-1","roleArn":null,"stsEndpoint":null}

  # Configurations for adjusting the default filter settings. Set to null if you
  # do not wish to use the default filter.
  default_filter_configuration = {"bufferSize":"32k","enabled":true,"extraFilters":null,"k8sLoggingExclude":"On","k8sLoggingParser":"On","keepLog":"On","kubeURL":"https://kubernetes.default.svc.cluster.local:443","match":"kube.*","mergeLog":"On","mergeLogKey":"data"}

  # Configurations for adjusting the default input settings. Set to null if you
  # do not wish to use the default filter.
  default_input_configuration = {"db":"/var/log/flb_kube.db","dockerMode":"On","enabled":true,"extraInputs":null,"memBufLimit":"5MB","multilineParser":"docker, cri","parser":"docker","path":"/var/log/containers/*.log","refreshInterval":"10","skipLongLines":"On","tag":"kube.*"}

  # Tags to apply to all AWS resources managed by this module.
  default_tags = {}

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # DEPRECATED - Extra Filters should be configured on the
  # default_filter_configuration object. This variable will be temporarily be
  # mapped to the default_filter_configuration object but will removed in a
  # future release. Please update variable configurations accordingly.
  extra_filters = ""

  # DEPRECATED - Extra Inputs should be configured on the
  # default_input_configuration object. This variable will be temporarily be
  # mapped to the default_input_configuration object but will removed in a
  # future release. Please update variable configurations accordingly.
  extra_inputs = ""

  # DEPRECATED - This value is no longer mapped to a Helm Chart Value. Use the
  # additional_outputs variable for adding additional output configuration
  # mappings. This variable will be removed in an upcoming release.
  extra_outputs = ""

  # Can be used to add additional log parsers. This string should be formatted
  # according to Fluent Bit docs, as it will be injected directly into the
  # fluent-bit.conf file.
  extra_parsers = ""

  # Allow the service to be exposed for monitoring.
  extra_service = ""

  # Configurations for forwarding logs to Kinesis Firehose. Set to null if you
  # do not wish to forward the logs to Firehose.
  firehose_configuration = null

  # A map of custom tags to apply to the IAM Policies created for the fluentbit
  # IAM Role if enabled. The key is the tag name and the value is the tag value.
  fluent_bit_iam_policy_tags = {}

  # A map of custom tags to apply to the fluentbit IAM Role if enabled. The key
  # is the tag name and the value is the tag value.
  fluent_bit_iam_role_tags = {}

  # Used to name IAM roles for the service account. Recommended when
  # var.iam_role_for_service_accounts_config is configured.
  iam_role_name_prefix = null

  # Configurations for forwarding logs to Kinesis stream. Set to null if you do
  # not wish to forward the logs to Kinesis.
  kinesis_configuration = null

  kinesis_streams_configuration = null

  # Node selector constraints for scheduling pods.
  node_selector = null

  opensearch_configuration = null

  # Pod annotations to apply to the deployment.
  pod_annotations = null

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

  # Create a restricted pod security policy.
  rbac_psp_enabled = false

  s3_configuration = null

  # Merge and mask sensitive values like apikeys or passwords that are part of
  # the helm charts `values.yaml`. These sensitive values will show up in the
  # final metadata as clear text unless passed in as K:V pairs that are injected
  # into the `values.yaml`. Key should be the paramater path and value should be
  # the value.
  sensitive_values = {}

  # Annotations to apply to the Service Account. If
  # `iam_role_for_service_accounts_config` is provided, then this module will
  # automatically add the annotation `eks.amazonaws.com/role-arn = <IAM Role
  # ARN> to the Service Account to leverage IRSA. Annotations provided by this
  # variable will be merged with the module applied Annotations.
  service_account_annotations = {}

  # Whether a new service account should be created.
  service_account_create = true

  # Name of the service account.
  service_account_name = "aws-for-fluent-bit"

  # Optional update strategy for the Kubernetes Deployment.
  update_strategy_type = "RollingUpdate"

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
  source = "git::git@github.com:gruntwork-io/terraform-aws-eks.git//modules/eks-container-logs?ref=v1.5.0"
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

  # Can be used to add additional outputs with this value.
  additional_outputs = ""

  # Configurations for forwarding logs to AWS managed Elasticsearch. Set to null
  # if you do not wish to forward the logs to ES.
  aws_elasticsearch_configuration = null

  # The name of the aws-for-fluent-bit Helm chart to fetch from the repository.
  # This should always be aws-for-fluent-bit unless fetching from a different
  # repository.
  aws_for_fluent_bit_chart_name = "aws-for-fluent-bit"

  # The Kubernetes namespace to install the Helm chart to.
  aws_for_fluent_bit_chart_namespace = "kube-system"

  # The version of the aws-for-fluent-bit helm chart to deploy. Note that this
  # is different from the app/container version (use
  # var.aws_for_fluent_bit_version to control the app/container version).
  aws_for_fluent_bit_chart_version = "0.1.34"

  # Pull policy for the image. When null, uses the default setting
  # `IfNotPresent` set in the chart.
  aws_for_fluent_bit_image_pull_policy = null

  # The Container repository to use for looking up the aws-for-fluent-bit
  # Container image when deploying the pods. When null, uses the default
  # repository set in the chart.
  aws_for_fluent_bit_image_repository = null

  # The Helm Release Name to create when installing the chart to the cluster.
  aws_for_fluent_bit_release_name = "aws-for-fluent-bit"

  # Which version of aws-for-fluent-bit to install (corresponds to the image
  # tag). When null, uses the default version set in the chart.
  aws_for_fluent_bit_version = null

  # The AWS partition used for default AWS Resources.
  aws_partition = "aws"

  # Configurations for forwarding logs to CloudWatch Logs using the original
  # plugin. Set to null if you do not wish to forward the logs to CloudWatch
  # Logs using the older plugin. This is disabled by default in fluent-bit.
  cloudwatch_configuration = null

  # Configurations for forwarding logs to CloudWatch Logs using a higher
  # performance plugin. Set to null if you do not wish to forward the logs to
  # CloudWatch Logs using this plugin. This plugin is enabled by default in
  # fluent-bit.
  cloudwatch_logs_configuration = {"autoCreateGroup":null,"autoRetryRequests":null,"enabled":true,"endpoint":null,"externalId":null,"extraOutputs":null,"logFormat":null,"logGroupName":"/aws/eks/fluentbit-cloudwatch/logs","logGroupTemplate":null,"logKey":null,"logRetentionDays":null,"logStreamName":null,"logStreamPrefix":"fluentbit-","logStreamTemplate":null,"match":"*","metricDimensions":null,"metricNamespace":null,"region":"us-east-1","roleArn":null,"stsEndpoint":null}

  # Configurations for adjusting the default filter settings. Set to null if you
  # do not wish to use the default filter.
  default_filter_configuration = {"bufferSize":"32k","enabled":true,"extraFilters":null,"k8sLoggingExclude":"On","k8sLoggingParser":"On","keepLog":"On","kubeURL":"https://kubernetes.default.svc.cluster.local:443","match":"kube.*","mergeLog":"On","mergeLogKey":"data"}

  # Configurations for adjusting the default input settings. Set to null if you
  # do not wish to use the default filter.
  default_input_configuration = {"db":"/var/log/flb_kube.db","dockerMode":"On","enabled":true,"extraInputs":null,"memBufLimit":"5MB","multilineParser":"docker, cri","parser":"docker","path":"/var/log/containers/*.log","refreshInterval":"10","skipLongLines":"On","tag":"kube.*"}

  # Tags to apply to all AWS resources managed by this module.
  default_tags = {}

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # DEPRECATED - Extra Filters should be configured on the
  # default_filter_configuration object. This variable will be temporarily be
  # mapped to the default_filter_configuration object but will removed in a
  # future release. Please update variable configurations accordingly.
  extra_filters = ""

  # DEPRECATED - Extra Inputs should be configured on the
  # default_input_configuration object. This variable will be temporarily be
  # mapped to the default_input_configuration object but will removed in a
  # future release. Please update variable configurations accordingly.
  extra_inputs = ""

  # DEPRECATED - This value is no longer mapped to a Helm Chart Value. Use the
  # additional_outputs variable for adding additional output configuration
  # mappings. This variable will be removed in an upcoming release.
  extra_outputs = ""

  # Can be used to add additional log parsers. This string should be formatted
  # according to Fluent Bit docs, as it will be injected directly into the
  # fluent-bit.conf file.
  extra_parsers = ""

  # Allow the service to be exposed for monitoring.
  extra_service = ""

  # Configurations for forwarding logs to Kinesis Firehose. Set to null if you
  # do not wish to forward the logs to Firehose.
  firehose_configuration = null

  # A map of custom tags to apply to the IAM Policies created for the fluentbit
  # IAM Role if enabled. The key is the tag name and the value is the tag value.
  fluent_bit_iam_policy_tags = {}

  # A map of custom tags to apply to the fluentbit IAM Role if enabled. The key
  # is the tag name and the value is the tag value.
  fluent_bit_iam_role_tags = {}

  # Used to name IAM roles for the service account. Recommended when
  # var.iam_role_for_service_accounts_config is configured.
  iam_role_name_prefix = null

  # Configurations for forwarding logs to Kinesis stream. Set to null if you do
  # not wish to forward the logs to Kinesis.
  kinesis_configuration = null

  kinesis_streams_configuration = null

  # Node selector constraints for scheduling pods.
  node_selector = null

  opensearch_configuration = null

  # Pod annotations to apply to the deployment.
  pod_annotations = null

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

  # Create a restricted pod security policy.
  rbac_psp_enabled = false

  s3_configuration = null

  # Merge and mask sensitive values like apikeys or passwords that are part of
  # the helm charts `values.yaml`. These sensitive values will show up in the
  # final metadata as clear text unless passed in as K:V pairs that are injected
  # into the `values.yaml`. Key should be the paramater path and value should be
  # the value.
  sensitive_values = {}

  # Annotations to apply to the Service Account. If
  # `iam_role_for_service_accounts_config` is provided, then this module will
  # automatically add the annotation `eks.amazonaws.com/role-arn = <IAM Role
  # ARN> to the Service Account to leverage IRSA. Annotations provided by this
  # variable will be merged with the module applied Annotations.
  service_account_annotations = {}

  # Whether a new service account should be created.
  service_account_create = true

  # Name of the service account.
  service_account_name = "aws-for-fluent-bit"

  # Optional update strategy for the Kubernetes Deployment.
  update_strategy_type = "RollingUpdate"

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
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.5.0/modules/eks-container-logs/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.5.0/modules/eks-container-logs/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-eks/tree/v1.5.0/modules/eks-container-logs/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "3ee088f599ce6b5870fc037936efe8f3"
}
##DOCS-SOURCER-END -->
