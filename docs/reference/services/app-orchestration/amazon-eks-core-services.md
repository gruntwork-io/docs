---
type: "service"
name: "Amazon EKS Core Services"
description: "Deploy core administrative applications on top of Amazon EC2 Kubernetes Service (EKS)."
category: "docker-orchestration"
cloud: "aws"
tags: ["docker","orchestration","kubernetes","containers"]
license: "gruntwork"
built-with: "terraform, helm"
title: "Amazon EKS Core Services"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.104.14" lastModifiedVersion="0.100.0"/>

# Amazon EKS Core Services

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/eks-core-services" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=services%2Feks-core-services" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>

## Overview

This service contains [Terraform](https://www.terraform.io) and [Helm](https://helm.sh/) code to deploy core
administrative services, such as FluentD and the ALB Ingress Controller, onto
[Elastic Kubernetes Service(EKS)](https://docs.aws.amazon.com/eks/latest/userguide/clusters.html).

![EKS Core Services architecture](/img/reference/services/app-orchestration/eks-core-services-architecture.png)

## Features

*   Deploy FluentD DaemonSet to ship container logs to CloudWatch Logs
*   Deploy ALB Ingress Controller to configure ALBs from within Kubernetes
*   Deploy external-dns to manage Route 53 DNS records from within Kubernetes
*   Deploy Kubernetes cluster-autoscaler to configure auto scaling of ASGs based on Pod demand
*   Deploy AWS CloudWatch Agent to configure container and node level metrics from worker nodes

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

Under the hood, this is all implemented using Terraform modules from the Gruntwork
[terraform-aws-eks](https://github.com/gruntwork-io/terraform-aws-eks) repo. If you are a subscriber and don’t have
access to this repo, email <support@gruntwork.io>.

### Core concepts

For information on each of the core services deployed by this service, see the documentation in the
[terraform-aws-eks](https://github.com/gruntwork-io/terraform-aws-eks) repo.

*   [FluentD DaemonSet](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-cloudwatch-container-logs)
*   [ALB Ingress Controller](https://github.com/gruntwork-io/terraform-aws-eks/blob/master/modules/eks-alb-ingress-controller)
*   [external-dns](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-k8s-external-dns)
*   [cluster-autoscaler](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-k8s-cluster-autoscaler)
*   [EKS CloudWatch Agent](https://github.com/gruntwork-io/terraform-aws-eks/tree/master/modules/eks-cloudwatch-agent)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.
*   [examples](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples): This folder contains working examples of how to use the submodules.
*   [test](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

*   [How to deploy a production-grade Kubernetes cluster on AWS](https://docs.gruntwork.io/guides/build-it-yourself/kubernetes-cluster/deployment-walkthrough/pre-requisites):
    A step-by-step guide for deploying a production-grade EKS cluster on AWS using the code in this repo.


## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EKS-CORE-SERVICES MODULE
# ------------------------------------------------------------------------------------------------------

module "eks_core_services" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/eks-core-services?ref=v0.104.14"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS region in which all resources will be created
  aws_region = <string>

  # The name of the EKS cluster where the core services will be deployed into.
  eks_cluster_name = <string>

  # Configuration for using the IAM role with Service Accounts feature to
  # provide permissions to the applications. This expects a map with two
  # properties: `openid_connect_provider_arn` and `openid_connect_provider_url`.
  # The `openid_connect_provider_arn` is the ARN of the OpenID Connect Provider
  # for EKS to retrieve IAM credentials, while `openid_connect_provider_url` is
  # the URL. Set to null if you do not wish to use IAM role with Service
  # Accounts.
  eks_iam_role_for_service_accounts_config = <object(
    openid_connect_provider_arn = string
    openid_connect_provider_url = string
  )>

  # ARN of IAM Role to use as the Pod execution role for Fargate. Required if
  # any of the services are being scheduled on Fargate. Set to null if none of
  # the Pods are being scheduled on Fargate.
  pod_execution_iam_role_arn = <string>

  # The ID of the VPC where the EKS cluster is deployed.
  vpc_id = <string>

  # The subnet IDs to use for EKS worker nodes. Used when provisioning Pods on
  # to Fargate. Required if any of the services are being scheduled on Fargate.
  # Set to empty list if none of the Pods are being scheduled on Fargate.
  worker_vpc_subnet_ids = <list(string)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The version of the aws-load-balancer-controller helmchart to use.
  alb_ingress_controller_chart_version = "1.4.1"

  # The repository of the aws-load-balancer-controller docker image that should
  # be deployed.
  alb_ingress_controller_docker_image_repo = "602401143452.dkr.ecr.us-west-2.amazonaws.com/amazon/aws-load-balancer-controller"

  # The tag of the aws-load-balancer-controller docker image that should be
  # deployed.
  alb_ingress_controller_docker_image_tag = "v2.4.1"

  # Configure affinity rules for the ALB Ingress Controller Pod to control which
  # nodes to schedule on. Each item in the list should be a map with the keys
  # `key`, `values`, and `operator`, corresponding to the 3 properties of
  # matchExpressions. Note that all expressions must be satisfied to schedule on
  # the node.
  alb_ingress_controller_pod_node_affinity = []

  # Configure tolerations rules to allow the ALB Ingress Controller Pod to
  # schedule on nodes that have been tainted. Each item in the list specifies a
  # toleration rule.
  alb_ingress_controller_pod_tolerations = []

  # Minimum time to wait after a scale up event before any node is considered
  # for scale down.
  autoscaler_down_delay_after_add = "10m"

  # Number for the log level verbosity. Lower numbers are less verbose, higher
  # numbers are more verbose. (Default: 4)
  autoscaler_log_level_verbosity = 4

  # Minimum time to wait since the node became unused before the node is
  # considered for scale down by the autoscaler.
  autoscaler_scale_down_unneeded_time = "10m"

  # If true cluster autoscaler will never delete nodes with pods with local
  # storage, e.g. EmptyDir or HostPath
  autoscaler_skip_nodes_with_local_storage = true

  # The Container repository to use for looking up the cloudwatch-agent
  # Container image when deploying the pods. When null, uses the default
  # repository set in the chart. Only applies to non-fargate workers.
  aws_cloudwatch_agent_image_repository = null

  # Configure affinity rules for the AWS CloudWatch Agent Pod to control which
  # nodes to schedule on. Each item in the list should be a map with the keys
  # `key`, `values`, and `operator`, corresponding to the 3 properties of
  # matchExpressions. Note that all expressions must be satisfied to schedule on
  # the node.
  aws_cloudwatch_agent_pod_node_affinity = []

  # Pod resource requests and limits to use. Refer to
  # https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
  # for more information.
  aws_cloudwatch_agent_pod_resources = null

  # Configure tolerations rules to allow the AWS CloudWatch Agent Pods to
  # schedule on nodes that have been tainted. Each item in the list specifies a
  # toleration rule.
  aws_cloudwatch_agent_pod_tolerations = []

  # Which version of amazon/cloudwatch-agent to install. When null, uses the
  # default version set in the chart. Only applies to non-fargate workers.
  aws_cloudwatch_agent_version = null

  # Annotations to apply to the cluster autoscaler pod(s), as key value pairs.
  cluster_autoscaler_pod_annotations = {}

  # Labels to apply to the cluster autoscaler pod(s), as key value pairs.
  cluster_autoscaler_pod_labels = {}

  # Configure affinity rules for the cluster-autoscaler Pod to control which
  # nodes to schedule on. Each item in the list should be a map with the keys
  # `key`, `values`, and `operator`, corresponding to the 3 properties of
  # matchExpressions. Note that all expressions must be satisfied to schedule on
  # the node.
  cluster_autoscaler_pod_node_affinity = []

  # Pod resource requests and limits to use. Refer to
  # https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
  # for more information. This is most useful for configuring CPU+Memory
  # availability for Fargate, which defaults to 0.25 vCPU and 256MB RAM.
  cluster_autoscaler_pod_resources = {"limits":{"cpu":"250m","memory":"1024Mi"},"requests":{"cpu":"250m","memory":"1024Mi"}}

  # Configure tolerations rules to allow the cluster-autoscaler Pod to schedule
  # on nodes that have been tainted. Each item in the list specifies a
  # toleration rule.
  cluster_autoscaler_pod_tolerations = []

  # The name to use for the helm release for cluster-autoscaler. This is useful
  # to force a redeployment of the cluster-autoscaler component.
  cluster_autoscaler_release_name = "cluster-autoscaler"

  # Which docker repository to use to install the cluster autoscaler. Check the
  # following link for valid repositories to use
  # https://github.com/kubernetes/autoscaler/releases
  cluster_autoscaler_repository = "us.gcr.io/k8s-artifacts-prod/autoscaling/cluster-autoscaler"

  # Specifies an 'expander' for the cluster autoscaler. This helps determine
  # which ASG to scale when additional resource capacity is needed.
  cluster_autoscaler_scaling_strategy = "least-waste"

  # Which version of the cluster autoscaler to install. This should match the
  # major/minor version (e.g., v1.20) of your Kubernetes Installation. See
  # https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler#releases
  # for a list of versions.
  cluster_autoscaler_version = "v1.26.0"

  # Whether or not to enable the AWS LB Ingress controller.
  enable_alb_ingress_controller = true

  # Whether to enable the AWS CloudWatch Agent DaemonSet for collecting
  # container and node metrics from worker nodes (self-managed ASG or managed
  # node groups).
  enable_aws_cloudwatch_agent = true

  # Whether or not to enable cluster-autoscaler for Autoscaling EKS worker
  # nodes.
  enable_cluster_autoscaler = true

  # Whether or not to enable external-dns for DNS entry syncing with Route 53
  # for Services and Ingresses.
  enable_external_dns = true

  # Whether or not to enable fluent-bit on EKS Fargate workers for log
  # aggregation.
  enable_fargate_fluent_bit = true

  # Whether or not to enable fluent-bit for log aggregation.
  enable_fluent_bit = true

  # Duration string (e.g. 1m) indicating the interval between making changes to
  # Route 53 by external-dns. When null, use the default defined in the chart
  # (1s).
  external_dns_batch_change_interval = null

  # The maximum number of changes that should be applied in a batch by
  # external-dns. When null, use the default defined in the chart (1000).
  external_dns_batch_change_size = null

  # Name of the Helm chart for external-dns. This should usually be
  # 'external-dns' but may differ in the case of overriding the repository URL.
  external_dns_chart_name = "external-dns"

  # Helm chart repository URL to obtain the external-dns chart from. Useful when
  # using Bitnami charts that are older than 6 months due to Bitnami's lifecycle
  # policy which removes older chart from the main index.
  external_dns_chart_repository_url = "https://charts.bitnami.com/bitnami"

  # The version of the helm chart to use. Note that this is different from the
  # app/container version.
  external_dns_chart_version = "6.12.2"

  # Configure affinity rules for the external-dns Pod to control which nodes to
  # schedule on. Each item in the list should be a map with the keys `key`,
  # `values`, and `operator`, corresponding to the 3 properties of
  # matchExpressions. Note that all expressions must be satisfied to schedule on
  # the node.
  external_dns_pod_node_affinity = []

  # Configure tolerations rules to allow the external-dns Pod to schedule on
  # nodes that have been tainted. Each item in the list specifies a toleration
  # rule.
  external_dns_pod_tolerations = []

  # Duration string (e.g. 1m) indicating the polling interval for syncing the
  # domains by external-dns. When null, use the default defined in the chart
  # (1m).
  external_dns_poll_interval = null

  # Only create records in hosted zones that match the provided domain names.
  # Empty list (default) means match all zones. Zones must satisfy all three
  # constraints (var.external_dns_route53_hosted_zone_tag_filters,
  # var.external_dns_route53_hosted_zone_id_filters, and
  # var.external_dns_route53_hosted_zone_domain_filters).
  external_dns_route53_hosted_zone_domain_filters = []

  # Only create records in hosted zones that match the provided IDs. Empty list
  # (default) means match all zones. Zones must satisfy all three constraints
  # (var.external_dns_route53_hosted_zone_tag_filters,
  # var.external_dns_route53_hosted_zone_id_filters, and
  # var.external_dns_route53_hosted_zone_domain_filters).
  external_dns_route53_hosted_zone_id_filters = []

  # Only create records in hosted zones that match the provided tags. Each item
  # in the list should specify tag key and tag value as a map. Empty list
  # (default) means match all zones. Zones must satisfy all three constraints
  # (var.external_dns_route53_hosted_zone_tag_filters,
  # var.external_dns_route53_hosted_zone_id_filters, and
  # var.external_dns_route53_hosted_zone_domain_filters).
  external_dns_route53_hosted_zone_tag_filters = []

  # Duration string (e.g. 1m) indicating the amount of time the Hosted Zones are
  # cached in external-dns. When null, use the default defined in the chart (0 -
  # no caching).
  external_dns_route53_zones_cache_duration = null

  # K8s resources type to be observed for new DNS entries by ExternalDNS.
  external_dns_sources = ["ingress","service"]

  # When enabled, triggers external-dns run loop on create/update/delete events
  # (optional, in addition of regular interval)
  external_dns_trigger_loop_on_event = false

  # List of ARNs of Fargate execution IAM Roles that should get permissions to
  # ship logs using fluent-bit. This must be provided if
  # enable_fargate_fluent_bit is true.
  fargate_fluent_bit_execution_iam_role_arns = []

  # Additional filters that fluent-bit should apply to log output. This string
  # should be formatted according to the Fluent-bit docs
  # (https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/configuration-file#config_filter).
  fargate_fluent_bit_extra_filters = ""

  # Additional parsers that fluent-bit should export logs to. This string should
  # be formatted according to the Fluent-bit docs
  # (https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/configuration-file#config_output).
  fargate_fluent_bit_extra_parsers = ""

  # Whether or not Kubernetes metadata is added to the log files
  fargate_fluent_bit_include_kubernetes_metadata = true

  # Prefix string to use for the CloudWatch Log Stream that gets created for
  # each Fargate pod.
  fargate_fluent_bit_log_stream_prefix = "fargate"

  # A list of availability zones in the region that we CANNOT use to deploy the
  # EKS Fargate workers. You can use this to avoid availability zones that may
  # not be able to provision the resources (e.g ran out of capacity). If empty,
  # will allow all availability zones.
  fargate_worker_disallowed_availability_zones = ["us-east-1d","us-east-1e","ca-central-1d"]

  # Can be used to add more inputs. This string should be formatted according to
  # Fluent Bit docs
  # (https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/classic-mode/configuration-file#config_input).
  fluent_bit_additional_inputs = ""

  # Additional filters that fluent-bit should apply to log output. This string
  # should be formatted according to the Fluent-bit docs
  # (https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/configuration-file#config_filter).
  fluent_bit_extra_filters = ""

  # Additional output streams that fluent-bit should export logs to. This string
  # should be formatted according to the Fluent-bit docs
  # (https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/configuration-file#config_output).
  fluent_bit_extra_outputs = ""

  # Can be used to add additional log parsers. This string should be formatted
  # according to Fluent Bit docs, as it will be injected directly into the
  # fluent-bit.conf file.
  fluent_bit_extra_parsers = ""

  # The Container repository to use for looking up the aws-for-fluent-bit
  # Container image when deploying the pods. When null, uses the default
  # repository set in the chart. Only applies to non-fargate workers.
  fluent_bit_image_repository = null

  # If set to true, that means that the CloudWatch Log Group fluent-bit should
  # use for streaming logs already exists and does not need to be created.
  fluent_bit_log_group_already_exists = false

  # The ARN of the KMS key to use to encrypt the logs in the CloudWatch Log
  # Group used for storing container logs streamed with FluentBit. Set to null
  # to disable encryption.
  fluent_bit_log_group_kms_key_id = null

  # Name of the CloudWatch Log Group fluent-bit should use to stream logs to.
  # When null (default), uses the eks_cluster_name as the Log Group name.
  fluent_bit_log_group_name = null

  # number of days to retain log events. Possible values are: 1, 3, 5, 7, 14,
  # 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1827, 3653, and 0. Select 0
  # to never expire.
  fluent_bit_log_group_retention = 0

  # ARN of the lambda function to trigger when events arrive at the fluent bit
  # log group.
  fluent_bit_log_group_subscription_arn = null

  # Filter pattern for the CloudWatch subscription. Only used if
  # var.fluent_bit_log_group_subscription_arn is set.
  fluent_bit_log_group_subscription_filter = ""

  # Prefix string to use for the CloudWatch Log Stream that gets created for
  # each pod. When null (default), the prefix is set to 'fluentbit'.
  fluent_bit_log_stream_prefix = null

  # Configure affinity rules for the fluent-bit Pods to control which nodes to
  # schedule on. Each item in the list should be a map with the keys `key`,
  # `values`, and `operator`, corresponding to the 3 properties of
  # matchExpressions. Note that all expressions must be satisfied to schedule on
  # the node.
  fluent_bit_pod_node_affinity = []

  # Configure tolerations rules to allow the fluent-bit Pods to schedule on
  # nodes that have been tainted. Each item in the list specifies a toleration
  # rule.
  fluent_bit_pod_tolerations = []

  # Optionally use a cri parser instead of the default Docker parser. This
  # should be used for EKS v1.24 and later.
  fluent_bit_use_cri_parser_conf = true

  # Which version of aws-for-fluent-bit to install. When null, uses the default
  # version set in the chart. Only applies to non-fargate workers.
  fluent_bit_version = null

  # A map of PriorityClass configurations, with the key as the PriorityClass
  # name.
  # https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/#priorityclass
  kubernetes_priority_classes = {}

  # Policy for how DNS records are sychronized between sources and providers
  # (options: sync, upsert-only).
  route53_record_update_policy = "sync"

  # When true, the ALB ingress controller pods will be scheduled on Fargate.
  schedule_alb_ingress_controller_on_fargate = false

  # When true, the cluster autoscaler pods will be scheduled on Fargate. It is
  # recommended to run the cluster autoscaler on Fargate to avoid the autoscaler
  # scaling down a node where it is running (and thus shutting itself down
  # during a scale down event). However, since Fargate is only supported on a
  # handful of regions, we don't default to true here.
  schedule_cluster_autoscaler_on_fargate = false

  # When true, the external-dns pods will be scheduled on Fargate.
  schedule_external_dns_on_fargate = false

  # Configure Kubernetes Services to lookup external DNS records. This can be
  # useful to bind friendly internal service names to domains (e.g. the RDS
  # database endpoint).
  service_dns_mappings = {}

  # If this variable is set to true, then use an exec-based plugin to
  # authenticate and fetch tokens for EKS. This is useful because EKS clusters
  # use short-lived authentication tokens that can expire in the middle of an
  # 'apply' or 'destroy', and since the native Kubernetes provider in Terraform
  # doesn't have a way to fetch up-to-date tokens, we recommend using an
  # exec-based provider as a workaround. Use the use_kubergrunt_to_fetch_token
  # input variable to control whether kubergrunt or aws is used to fetch tokens.
  use_exec_plugin_for_auth = true

  # EKS clusters use short-lived authentication tokens that can expire in the
  # middle of an 'apply' or 'destroy'. To avoid this issue, we use an exec-based
  # plugin to fetch an up-to-date token. If this variable is set to true, we'll
  # use kubergrunt to fetch the token (in which case, kubergrunt must be
  # installed and on PATH); if this variable is set to false, we'll use the aws
  # CLI to fetch the token (in which case, aws must be installed and on PATH).
  # Note this functionality is only enabled if use_exec_plugin_for_auth is set
  # to true.
  use_kubergrunt_to_fetch_token = true

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
# DEPLOY GRUNTWORK'S EKS-CORE-SERVICES MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/eks-core-services?ref=v0.104.14"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS region in which all resources will be created
  aws_region = <string>

  # The name of the EKS cluster where the core services will be deployed into.
  eks_cluster_name = <string>

  # Configuration for using the IAM role with Service Accounts feature to
  # provide permissions to the applications. This expects a map with two
  # properties: `openid_connect_provider_arn` and `openid_connect_provider_url`.
  # The `openid_connect_provider_arn` is the ARN of the OpenID Connect Provider
  # for EKS to retrieve IAM credentials, while `openid_connect_provider_url` is
  # the URL. Set to null if you do not wish to use IAM role with Service
  # Accounts.
  eks_iam_role_for_service_accounts_config = <object(
    openid_connect_provider_arn = string
    openid_connect_provider_url = string
  )>

  # ARN of IAM Role to use as the Pod execution role for Fargate. Required if
  # any of the services are being scheduled on Fargate. Set to null if none of
  # the Pods are being scheduled on Fargate.
  pod_execution_iam_role_arn = <string>

  # The ID of the VPC where the EKS cluster is deployed.
  vpc_id = <string>

  # The subnet IDs to use for EKS worker nodes. Used when provisioning Pods on
  # to Fargate. Required if any of the services are being scheduled on Fargate.
  # Set to empty list if none of the Pods are being scheduled on Fargate.
  worker_vpc_subnet_ids = <list(string)>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The version of the aws-load-balancer-controller helmchart to use.
  alb_ingress_controller_chart_version = "1.4.1"

  # The repository of the aws-load-balancer-controller docker image that should
  # be deployed.
  alb_ingress_controller_docker_image_repo = "602401143452.dkr.ecr.us-west-2.amazonaws.com/amazon/aws-load-balancer-controller"

  # The tag of the aws-load-balancer-controller docker image that should be
  # deployed.
  alb_ingress_controller_docker_image_tag = "v2.4.1"

  # Configure affinity rules for the ALB Ingress Controller Pod to control which
  # nodes to schedule on. Each item in the list should be a map with the keys
  # `key`, `values`, and `operator`, corresponding to the 3 properties of
  # matchExpressions. Note that all expressions must be satisfied to schedule on
  # the node.
  alb_ingress_controller_pod_node_affinity = []

  # Configure tolerations rules to allow the ALB Ingress Controller Pod to
  # schedule on nodes that have been tainted. Each item in the list specifies a
  # toleration rule.
  alb_ingress_controller_pod_tolerations = []

  # Minimum time to wait after a scale up event before any node is considered
  # for scale down.
  autoscaler_down_delay_after_add = "10m"

  # Number for the log level verbosity. Lower numbers are less verbose, higher
  # numbers are more verbose. (Default: 4)
  autoscaler_log_level_verbosity = 4

  # Minimum time to wait since the node became unused before the node is
  # considered for scale down by the autoscaler.
  autoscaler_scale_down_unneeded_time = "10m"

  # If true cluster autoscaler will never delete nodes with pods with local
  # storage, e.g. EmptyDir or HostPath
  autoscaler_skip_nodes_with_local_storage = true

  # The Container repository to use for looking up the cloudwatch-agent
  # Container image when deploying the pods. When null, uses the default
  # repository set in the chart. Only applies to non-fargate workers.
  aws_cloudwatch_agent_image_repository = null

  # Configure affinity rules for the AWS CloudWatch Agent Pod to control which
  # nodes to schedule on. Each item in the list should be a map with the keys
  # `key`, `values`, and `operator`, corresponding to the 3 properties of
  # matchExpressions. Note that all expressions must be satisfied to schedule on
  # the node.
  aws_cloudwatch_agent_pod_node_affinity = []

  # Pod resource requests and limits to use. Refer to
  # https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
  # for more information.
  aws_cloudwatch_agent_pod_resources = null

  # Configure tolerations rules to allow the AWS CloudWatch Agent Pods to
  # schedule on nodes that have been tainted. Each item in the list specifies a
  # toleration rule.
  aws_cloudwatch_agent_pod_tolerations = []

  # Which version of amazon/cloudwatch-agent to install. When null, uses the
  # default version set in the chart. Only applies to non-fargate workers.
  aws_cloudwatch_agent_version = null

  # Annotations to apply to the cluster autoscaler pod(s), as key value pairs.
  cluster_autoscaler_pod_annotations = {}

  # Labels to apply to the cluster autoscaler pod(s), as key value pairs.
  cluster_autoscaler_pod_labels = {}

  # Configure affinity rules for the cluster-autoscaler Pod to control which
  # nodes to schedule on. Each item in the list should be a map with the keys
  # `key`, `values`, and `operator`, corresponding to the 3 properties of
  # matchExpressions. Note that all expressions must be satisfied to schedule on
  # the node.
  cluster_autoscaler_pod_node_affinity = []

  # Pod resource requests and limits to use. Refer to
  # https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
  # for more information. This is most useful for configuring CPU+Memory
  # availability for Fargate, which defaults to 0.25 vCPU and 256MB RAM.
  cluster_autoscaler_pod_resources = {"limits":{"cpu":"250m","memory":"1024Mi"},"requests":{"cpu":"250m","memory":"1024Mi"}}

  # Configure tolerations rules to allow the cluster-autoscaler Pod to schedule
  # on nodes that have been tainted. Each item in the list specifies a
  # toleration rule.
  cluster_autoscaler_pod_tolerations = []

  # The name to use for the helm release for cluster-autoscaler. This is useful
  # to force a redeployment of the cluster-autoscaler component.
  cluster_autoscaler_release_name = "cluster-autoscaler"

  # Which docker repository to use to install the cluster autoscaler. Check the
  # following link for valid repositories to use
  # https://github.com/kubernetes/autoscaler/releases
  cluster_autoscaler_repository = "us.gcr.io/k8s-artifacts-prod/autoscaling/cluster-autoscaler"

  # Specifies an 'expander' for the cluster autoscaler. This helps determine
  # which ASG to scale when additional resource capacity is needed.
  cluster_autoscaler_scaling_strategy = "least-waste"

  # Which version of the cluster autoscaler to install. This should match the
  # major/minor version (e.g., v1.20) of your Kubernetes Installation. See
  # https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler#releases
  # for a list of versions.
  cluster_autoscaler_version = "v1.26.0"

  # Whether or not to enable the AWS LB Ingress controller.
  enable_alb_ingress_controller = true

  # Whether to enable the AWS CloudWatch Agent DaemonSet for collecting
  # container and node metrics from worker nodes (self-managed ASG or managed
  # node groups).
  enable_aws_cloudwatch_agent = true

  # Whether or not to enable cluster-autoscaler for Autoscaling EKS worker
  # nodes.
  enable_cluster_autoscaler = true

  # Whether or not to enable external-dns for DNS entry syncing with Route 53
  # for Services and Ingresses.
  enable_external_dns = true

  # Whether or not to enable fluent-bit on EKS Fargate workers for log
  # aggregation.
  enable_fargate_fluent_bit = true

  # Whether or not to enable fluent-bit for log aggregation.
  enable_fluent_bit = true

  # Duration string (e.g. 1m) indicating the interval between making changes to
  # Route 53 by external-dns. When null, use the default defined in the chart
  # (1s).
  external_dns_batch_change_interval = null

  # The maximum number of changes that should be applied in a batch by
  # external-dns. When null, use the default defined in the chart (1000).
  external_dns_batch_change_size = null

  # Name of the Helm chart for external-dns. This should usually be
  # 'external-dns' but may differ in the case of overriding the repository URL.
  external_dns_chart_name = "external-dns"

  # Helm chart repository URL to obtain the external-dns chart from. Useful when
  # using Bitnami charts that are older than 6 months due to Bitnami's lifecycle
  # policy which removes older chart from the main index.
  external_dns_chart_repository_url = "https://charts.bitnami.com/bitnami"

  # The version of the helm chart to use. Note that this is different from the
  # app/container version.
  external_dns_chart_version = "6.12.2"

  # Configure affinity rules for the external-dns Pod to control which nodes to
  # schedule on. Each item in the list should be a map with the keys `key`,
  # `values`, and `operator`, corresponding to the 3 properties of
  # matchExpressions. Note that all expressions must be satisfied to schedule on
  # the node.
  external_dns_pod_node_affinity = []

  # Configure tolerations rules to allow the external-dns Pod to schedule on
  # nodes that have been tainted. Each item in the list specifies a toleration
  # rule.
  external_dns_pod_tolerations = []

  # Duration string (e.g. 1m) indicating the polling interval for syncing the
  # domains by external-dns. When null, use the default defined in the chart
  # (1m).
  external_dns_poll_interval = null

  # Only create records in hosted zones that match the provided domain names.
  # Empty list (default) means match all zones. Zones must satisfy all three
  # constraints (var.external_dns_route53_hosted_zone_tag_filters,
  # var.external_dns_route53_hosted_zone_id_filters, and
  # var.external_dns_route53_hosted_zone_domain_filters).
  external_dns_route53_hosted_zone_domain_filters = []

  # Only create records in hosted zones that match the provided IDs. Empty list
  # (default) means match all zones. Zones must satisfy all three constraints
  # (var.external_dns_route53_hosted_zone_tag_filters,
  # var.external_dns_route53_hosted_zone_id_filters, and
  # var.external_dns_route53_hosted_zone_domain_filters).
  external_dns_route53_hosted_zone_id_filters = []

  # Only create records in hosted zones that match the provided tags. Each item
  # in the list should specify tag key and tag value as a map. Empty list
  # (default) means match all zones. Zones must satisfy all three constraints
  # (var.external_dns_route53_hosted_zone_tag_filters,
  # var.external_dns_route53_hosted_zone_id_filters, and
  # var.external_dns_route53_hosted_zone_domain_filters).
  external_dns_route53_hosted_zone_tag_filters = []

  # Duration string (e.g. 1m) indicating the amount of time the Hosted Zones are
  # cached in external-dns. When null, use the default defined in the chart (0 -
  # no caching).
  external_dns_route53_zones_cache_duration = null

  # K8s resources type to be observed for new DNS entries by ExternalDNS.
  external_dns_sources = ["ingress","service"]

  # When enabled, triggers external-dns run loop on create/update/delete events
  # (optional, in addition of regular interval)
  external_dns_trigger_loop_on_event = false

  # List of ARNs of Fargate execution IAM Roles that should get permissions to
  # ship logs using fluent-bit. This must be provided if
  # enable_fargate_fluent_bit is true.
  fargate_fluent_bit_execution_iam_role_arns = []

  # Additional filters that fluent-bit should apply to log output. This string
  # should be formatted according to the Fluent-bit docs
  # (https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/configuration-file#config_filter).
  fargate_fluent_bit_extra_filters = ""

  # Additional parsers that fluent-bit should export logs to. This string should
  # be formatted according to the Fluent-bit docs
  # (https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/configuration-file#config_output).
  fargate_fluent_bit_extra_parsers = ""

  # Whether or not Kubernetes metadata is added to the log files
  fargate_fluent_bit_include_kubernetes_metadata = true

  # Prefix string to use for the CloudWatch Log Stream that gets created for
  # each Fargate pod.
  fargate_fluent_bit_log_stream_prefix = "fargate"

  # A list of availability zones in the region that we CANNOT use to deploy the
  # EKS Fargate workers. You can use this to avoid availability zones that may
  # not be able to provision the resources (e.g ran out of capacity). If empty,
  # will allow all availability zones.
  fargate_worker_disallowed_availability_zones = ["us-east-1d","us-east-1e","ca-central-1d"]

  # Can be used to add more inputs. This string should be formatted according to
  # Fluent Bit docs
  # (https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/classic-mode/configuration-file#config_input).
  fluent_bit_additional_inputs = ""

  # Additional filters that fluent-bit should apply to log output. This string
  # should be formatted according to the Fluent-bit docs
  # (https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/configuration-file#config_filter).
  fluent_bit_extra_filters = ""

  # Additional output streams that fluent-bit should export logs to. This string
  # should be formatted according to the Fluent-bit docs
  # (https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/configuration-file#config_output).
  fluent_bit_extra_outputs = ""

  # Can be used to add additional log parsers. This string should be formatted
  # according to Fluent Bit docs, as it will be injected directly into the
  # fluent-bit.conf file.
  fluent_bit_extra_parsers = ""

  # The Container repository to use for looking up the aws-for-fluent-bit
  # Container image when deploying the pods. When null, uses the default
  # repository set in the chart. Only applies to non-fargate workers.
  fluent_bit_image_repository = null

  # If set to true, that means that the CloudWatch Log Group fluent-bit should
  # use for streaming logs already exists and does not need to be created.
  fluent_bit_log_group_already_exists = false

  # The ARN of the KMS key to use to encrypt the logs in the CloudWatch Log
  # Group used for storing container logs streamed with FluentBit. Set to null
  # to disable encryption.
  fluent_bit_log_group_kms_key_id = null

  # Name of the CloudWatch Log Group fluent-bit should use to stream logs to.
  # When null (default), uses the eks_cluster_name as the Log Group name.
  fluent_bit_log_group_name = null

  # number of days to retain log events. Possible values are: 1, 3, 5, 7, 14,
  # 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1827, 3653, and 0. Select 0
  # to never expire.
  fluent_bit_log_group_retention = 0

  # ARN of the lambda function to trigger when events arrive at the fluent bit
  # log group.
  fluent_bit_log_group_subscription_arn = null

  # Filter pattern for the CloudWatch subscription. Only used if
  # var.fluent_bit_log_group_subscription_arn is set.
  fluent_bit_log_group_subscription_filter = ""

  # Prefix string to use for the CloudWatch Log Stream that gets created for
  # each pod. When null (default), the prefix is set to 'fluentbit'.
  fluent_bit_log_stream_prefix = null

  # Configure affinity rules for the fluent-bit Pods to control which nodes to
  # schedule on. Each item in the list should be a map with the keys `key`,
  # `values`, and `operator`, corresponding to the 3 properties of
  # matchExpressions. Note that all expressions must be satisfied to schedule on
  # the node.
  fluent_bit_pod_node_affinity = []

  # Configure tolerations rules to allow the fluent-bit Pods to schedule on
  # nodes that have been tainted. Each item in the list specifies a toleration
  # rule.
  fluent_bit_pod_tolerations = []

  # Optionally use a cri parser instead of the default Docker parser. This
  # should be used for EKS v1.24 and later.
  fluent_bit_use_cri_parser_conf = true

  # Which version of aws-for-fluent-bit to install. When null, uses the default
  # version set in the chart. Only applies to non-fargate workers.
  fluent_bit_version = null

  # A map of PriorityClass configurations, with the key as the PriorityClass
  # name.
  # https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/#priorityclass
  kubernetes_priority_classes = {}

  # Policy for how DNS records are sychronized between sources and providers
  # (options: sync, upsert-only).
  route53_record_update_policy = "sync"

  # When true, the ALB ingress controller pods will be scheduled on Fargate.
  schedule_alb_ingress_controller_on_fargate = false

  # When true, the cluster autoscaler pods will be scheduled on Fargate. It is
  # recommended to run the cluster autoscaler on Fargate to avoid the autoscaler
  # scaling down a node where it is running (and thus shutting itself down
  # during a scale down event). However, since Fargate is only supported on a
  # handful of regions, we don't default to true here.
  schedule_cluster_autoscaler_on_fargate = false

  # When true, the external-dns pods will be scheduled on Fargate.
  schedule_external_dns_on_fargate = false

  # Configure Kubernetes Services to lookup external DNS records. This can be
  # useful to bind friendly internal service names to domains (e.g. the RDS
  # database endpoint).
  service_dns_mappings = {}

  # If this variable is set to true, then use an exec-based plugin to
  # authenticate and fetch tokens for EKS. This is useful because EKS clusters
  # use short-lived authentication tokens that can expire in the middle of an
  # 'apply' or 'destroy', and since the native Kubernetes provider in Terraform
  # doesn't have a way to fetch up-to-date tokens, we recommend using an
  # exec-based provider as a workaround. Use the use_kubergrunt_to_fetch_token
  # input variable to control whether kubergrunt or aws is used to fetch tokens.
  use_exec_plugin_for_auth = true

  # EKS clusters use short-lived authentication tokens that can expire in the
  # middle of an 'apply' or 'destroy'. To avoid this issue, we use an exec-based
  # plugin to fetch an up-to-date token. If this variable is set to true, we'll
  # use kubergrunt to fetch the token (in which case, kubergrunt must be
  # installed and on PATH); if this variable is set to false, we'll use the aws
  # CLI to fetch the token (in which case, aws must be installed and on PATH).
  # Note this functionality is only enabled if use_exec_plugin_for_auth is set
  # to true.
  use_kubergrunt_to_fetch_token = true

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

<HclListItem name="aws_region" requirement="required" type="string">
<HclListItemDescription>

The AWS region in which all resources will be created

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_cluster_name" requirement="required" type="string">
<HclListItemDescription>

The name of the EKS cluster where the core services will be deployed into.

</HclListItemDescription>
</HclListItem>

<HclListItem name="eks_iam_role_for_service_accounts_config" requirement="required" type="object(…)">
<HclListItemDescription>

Configuration for using the IAM role with Service Accounts feature to provide permissions to the applications. This expects a map with two properties: `openid_connect_provider_arn` and `openid_connect_provider_url`. The `openid_connect_provider_arn` is the ARN of the OpenID Connect Provider for EKS to retrieve IAM credentials, while `openid_connect_provider_url` is the URL. Set to null if you do not wish to use IAM role with Service Accounts.

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

<HclListItem name="pod_execution_iam_role_arn" requirement="required" type="string">
<HclListItemDescription>

ARN of IAM Role to use as the Pod execution role for Fargate. Required if any of the services are being scheduled on Fargate. Set to null if none of the Pods are being scheduled on Fargate.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the VPC where the EKS cluster is deployed.

</HclListItemDescription>
</HclListItem>

<HclListItem name="worker_vpc_subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

The subnet IDs to use for EKS worker nodes. Used when provisioning Pods on to Fargate. Required if any of the services are being scheduled on Fargate. Set to empty list if none of the Pods are being scheduled on Fargate.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="alb_ingress_controller_chart_version" requirement="optional" type="string">
<HclListItemDescription>

The version of the aws-load-balancer-controller helmchart to use.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;1.4.1&quot;"/>
</HclListItem>

<HclListItem name="alb_ingress_controller_docker_image_repo" requirement="optional" type="string">
<HclListItemDescription>

The repository of the aws-load-balancer-controller docker image that should be deployed.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;602401143452.dkr.ecr.us-west-2.amazonaws.com/amazon/aws-load-balancer-controller&quot;"/>
</HclListItem>

<HclListItem name="alb_ingress_controller_docker_image_tag" requirement="optional" type="string">
<HclListItemDescription>

The tag of the aws-load-balancer-controller docker image that should be deployed.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;v2.4.1&quot;"/>
</HclListItem>

<HclListItem name="alb_ingress_controller_pod_node_affinity" requirement="optional" type="list(object(…))">
<HclListItemDescription>

Configure affinity rules for the ALB Ingress Controller Pod to control which nodes to schedule on. Each item in the list should be a map with the keys `key`, `values`, and `operator`, corresponding to the 3 properties of matchExpressions. Note that all expressions must be satisfied to schedule on the node.

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

<HclListItem name="alb_ingress_controller_pod_tolerations" requirement="optional" type="list(map(…))">
<HclListItemDescription>

Configure tolerations rules to allow the ALB Ingress Controller Pod to schedule on nodes that have been tainted. Each item in the list specifies a toleration rule.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(map(any))
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

<HclListItem name="autoscaler_down_delay_after_add" requirement="optional" type="string">
<HclListItemDescription>

Minimum time to wait after a scale up event before any node is considered for scale down.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;10m&quot;"/>
</HclListItem>

<HclListItem name="autoscaler_log_level_verbosity" requirement="optional" type="number">
<HclListItemDescription>

Number for the log level verbosity. Lower numbers are less verbose, higher numbers are more verbose. (Default: 4)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="4"/>
</HclListItem>

<HclListItem name="autoscaler_scale_down_unneeded_time" requirement="optional" type="string">
<HclListItemDescription>

Minimum time to wait since the node became unused before the node is considered for scale down by the autoscaler.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;10m&quot;"/>
</HclListItem>

<HclListItem name="autoscaler_skip_nodes_with_local_storage" requirement="optional" type="bool">
<HclListItemDescription>

If true cluster autoscaler will never delete nodes with pods with local storage, e.g. EmptyDir or HostPath

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="aws_cloudwatch_agent_image_repository" requirement="optional" type="string">
<HclListItemDescription>

The Container repository to use for looking up the cloudwatch-agent Container image when deploying the pods. When null, uses the default repository set in the chart. Only applies to non-fargate workers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="aws_cloudwatch_agent_pod_node_affinity" requirement="optional" type="list(object(…))">
<HclListItemDescription>

Configure affinity rules for the AWS CloudWatch Agent Pod to control which nodes to schedule on. Each item in the list should be a map with the keys `key`, `values`, and `operator`, corresponding to the 3 properties of matchExpressions. Note that all expressions must be satisfied to schedule on the node.

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

<HclListItem name="aws_cloudwatch_agent_pod_resources" requirement="optional" type="any">
<HclListItemDescription>

Pod resource requests and limits to use. Refer to https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/ for more information.

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

   We use any type here to avoid maintaining the kubernetes defined type spec for the resources here. That way, we can
   support wide range of kubernetes versions.

```
</details>

<details>


```hcl

   Example value:
   {
     requests = {
       memory = "1024Mi"
       cpu    = "250m"
     }
     limits = {
       memory = "1024Mi"
       cpu    = "250m"
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="aws_cloudwatch_agent_pod_tolerations" requirement="optional" type="list(map(…))">
<HclListItemDescription>

Configure tolerations rules to allow the AWS CloudWatch Agent Pods to schedule on nodes that have been tainted. Each item in the list specifies a toleration rule.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(map(any))
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

<HclListItem name="aws_cloudwatch_agent_version" requirement="optional" type="string">
<HclListItemDescription>

Which version of amazon/cloudwatch-agent to install. When null, uses the default version set in the chart. Only applies to non-fargate workers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_autoscaler_pod_annotations" requirement="optional" type="map(string)">
<HclListItemDescription>

Annotations to apply to the cluster autoscaler pod(s), as key value pairs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="cluster_autoscaler_pod_labels" requirement="optional" type="map(string)">
<HclListItemDescription>

Labels to apply to the cluster autoscaler pod(s), as key value pairs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="cluster_autoscaler_pod_node_affinity" requirement="optional" type="list(object(…))">
<HclListItemDescription>

Configure affinity rules for the cluster-autoscaler Pod to control which nodes to schedule on. Each item in the list should be a map with the keys `key`, `values`, and `operator`, corresponding to the 3 properties of matchExpressions. Note that all expressions must be satisfied to schedule on the node.

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

<HclListItem name="cluster_autoscaler_pod_resources" requirement="optional" type="any">
<HclListItemDescription>

Pod resource requests and limits to use. Refer to https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/ for more information. This is most useful for configuring CPU+Memory availability for Fargate, which defaults to 0.25 vCPU and 256MB RAM.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
{
  limits = {
    cpu = "250m",
    memory = "1024Mi"
  },
  requests = {
    cpu = "250m",
    memory = "1024Mi"
  }
}
```

</HclListItemDefaultValue>
<HclGeneralListItem title="More Details">
<details>


```hcl

   We use any type here to avoid maintaining the kubernetes defined type spec for the resources here. That way, we can
   support wide range of kubernetes versions.

```
</details>

<details>


```hcl

   cluster-autoscaler is known to fail on Fargate when the default resource limits are used, so we set a saner default
   here.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="cluster_autoscaler_pod_tolerations" requirement="optional" type="list(map(…))">
<HclListItemDescription>

Configure tolerations rules to allow the cluster-autoscaler Pod to schedule on nodes that have been tainted. Each item in the list specifies a toleration rule.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(map(any))
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

<HclListItem name="cluster_autoscaler_release_name" requirement="optional" type="string">
<HclListItemDescription>

The name to use for the helm release for cluster-autoscaler. This is useful to force a redeployment of the cluster-autoscaler component.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;cluster-autoscaler&quot;"/>
</HclListItem>

<HclListItem name="cluster_autoscaler_repository" requirement="optional" type="string">
<HclListItemDescription>

Which docker repository to use to install the cluster autoscaler. Check the following link for valid repositories to use https://github.com/kubernetes/autoscaler/releases

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;us.gcr.io/k8s-artifacts-prod/autoscaling/cluster-autoscaler&quot;"/>
</HclListItem>

<HclListItem name="cluster_autoscaler_scaling_strategy" requirement="optional" type="string">
<HclListItemDescription>

Specifies an 'expander' for the cluster autoscaler. This helps determine which ASG to scale when additional resource capacity is needed.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;least-waste&quot;"/>
</HclListItem>

<HclListItem name="cluster_autoscaler_version" requirement="optional" type="string">
<HclListItemDescription>

Which version of the cluster autoscaler to install. This should match the major/minor version (e.g., v1.20) of your Kubernetes Installation. See https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler#releases for a list of versions.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;v1.26.0&quot;"/>
</HclListItem>

<HclListItem name="enable_alb_ingress_controller" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to enable the AWS LB Ingress controller.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_aws_cloudwatch_agent" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable the AWS CloudWatch Agent DaemonSet for collecting container and node metrics from worker nodes (self-managed ASG or managed node groups).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_cluster_autoscaler" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to enable cluster-autoscaler for Autoscaling EKS worker nodes.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_external_dns" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to enable external-dns for DNS entry syncing with Route 53 for Services and Ingresses.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_fargate_fluent_bit" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to enable fluent-bit on EKS Fargate workers for log aggregation.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_fluent_bit" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to enable fluent-bit for log aggregation.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="external_dns_batch_change_interval" requirement="optional" type="string">
<HclListItemDescription>

Duration string (e.g. 1m) indicating the interval between making changes to Route 53 by external-dns. When null, use the default defined in the chart (1s).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="external_dns_batch_change_size" requirement="optional" type="number">
<HclListItemDescription>

The maximum number of changes that should be applied in a batch by external-dns. When null, use the default defined in the chart (1000).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="external_dns_chart_name" requirement="optional" type="string">
<HclListItemDescription>

Name of the Helm chart for external-dns. This should usually be 'external-dns' but may differ in the case of overriding the repository URL.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;external-dns&quot;"/>
</HclListItem>

<HclListItem name="external_dns_chart_repository_url" requirement="optional" type="string">
<HclListItemDescription>

Helm chart repository URL to obtain the external-dns chart from. Useful when using Bitnami charts that are older than 6 months due to Bitnami's lifecycle policy which removes older chart from the main index.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;https://charts.bitnami.com/bitnami&quot;"/>
</HclListItem>

<HclListItem name="external_dns_chart_version" requirement="optional" type="string">
<HclListItemDescription>

The version of the helm chart to use. Note that this is different from the app/container version.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;6.12.2&quot;"/>
</HclListItem>

<HclListItem name="external_dns_pod_node_affinity" requirement="optional" type="list(object(…))">
<HclListItemDescription>

Configure affinity rules for the external-dns Pod to control which nodes to schedule on. Each item in the list should be a map with the keys `key`, `values`, and `operator`, corresponding to the 3 properties of matchExpressions. Note that all expressions must be satisfied to schedule on the node.

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

<HclListItem name="external_dns_pod_tolerations" requirement="optional" type="list(map(…))">
<HclListItemDescription>

Configure tolerations rules to allow the external-dns Pod to schedule on nodes that have been tainted. Each item in the list specifies a toleration rule.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(map(any))
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

<HclListItem name="external_dns_poll_interval" requirement="optional" type="string">
<HclListItemDescription>

Duration string (e.g. 1m) indicating the polling interval for syncing the domains by external-dns. When null, use the default defined in the chart (1m).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="external_dns_route53_hosted_zone_domain_filters" requirement="optional" type="list(string)">
<HclListItemDescription>

Only create records in hosted zones that match the provided domain names. Empty list (default) means match all zones. Zones must satisfy all three constraints (<a href="#external_dns_route53_hosted_zone_tag_filters"><code>external_dns_route53_hosted_zone_tag_filters</code></a>, <a href="#external_dns_route53_hosted_zone_id_filters"><code>external_dns_route53_hosted_zone_id_filters</code></a>, and <a href="#external_dns_route53_hosted_zone_domain_filters"><code>external_dns_route53_hosted_zone_domain_filters</code></a>).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="external_dns_route53_hosted_zone_id_filters" requirement="optional" type="list(string)">
<HclListItemDescription>

Only create records in hosted zones that match the provided IDs. Empty list (default) means match all zones. Zones must satisfy all three constraints (<a href="#external_dns_route53_hosted_zone_tag_filters"><code>external_dns_route53_hosted_zone_tag_filters</code></a>, <a href="#external_dns_route53_hosted_zone_id_filters"><code>external_dns_route53_hosted_zone_id_filters</code></a>, and <a href="#external_dns_route53_hosted_zone_domain_filters"><code>external_dns_route53_hosted_zone_domain_filters</code></a>).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="external_dns_route53_hosted_zone_tag_filters" requirement="optional" type="list(object(…))">
<HclListItemDescription>

Only create records in hosted zones that match the provided tags. Each item in the list should specify tag key and tag value as a map. Empty list (default) means match all zones. Zones must satisfy all three constraints (<a href="#external_dns_route53_hosted_zone_tag_filters"><code>external_dns_route53_hosted_zone_tag_filters</code></a>, <a href="#external_dns_route53_hosted_zone_id_filters"><code>external_dns_route53_hosted_zone_id_filters</code></a>, and <a href="#external_dns_route53_hosted_zone_domain_filters"><code>external_dns_route53_hosted_zone_domain_filters</code></a>).

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    key   = string
    value = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   [
     {
       key = "Name"
       value = "current"
     }
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="external_dns_route53_zones_cache_duration" requirement="optional" type="string">
<HclListItemDescription>

Duration string (e.g. 1m) indicating the amount of time the Hosted Zones are cached in external-dns. When null, use the default defined in the chart (0 - no caching).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="external_dns_sources" requirement="optional" type="list(string)">
<HclListItemDescription>

K8s resources type to be observed for new DNS entries by ExternalDNS.

</HclListItemDescription>
<HclListItemDefaultValue>

```hcl
[
  "ingress",
  "service"
]
```

</HclListItemDefaultValue>
<HclGeneralListItem title="More Details">
<details>


```hcl

   NOTE ON ISTIO: By default, external-dns will listen for "ingress" and "service" events. To use it with Istio, make
   sure to include the "istio-gateway" events here. See the docs for more details:
   https://github.com/kubernetes-incubator/external-dns/blob/master/docs/tutorials/istio.md

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="external_dns_trigger_loop_on_event" requirement="optional" type="bool">
<HclListItemDescription>

When enabled, triggers external-dns run loop on create/update/delete events (optional, in addition of regular interval)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="fargate_fluent_bit_execution_iam_role_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

List of ARNs of Fargate execution IAM Roles that should get permissions to ship logs using fluent-bit. This must be provided if enable_fargate_fluent_bit is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="fargate_fluent_bit_extra_filters" requirement="optional" type="string">
<HclListItemDescription>

Additional filters that fluent-bit should apply to log output. This string should be formatted according to the Fluent-bit docs (https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/configuration-file#config_filter).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="fargate_fluent_bit_extra_parsers" requirement="optional" type="string">
<HclListItemDescription>

Additional parsers that fluent-bit should export logs to. This string should be formatted according to the Fluent-bit docs (https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/configuration-file#config_output).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="fargate_fluent_bit_include_kubernetes_metadata" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not Kubernetes metadata is added to the log files

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="fargate_fluent_bit_log_stream_prefix" requirement="optional" type="string">
<HclListItemDescription>

Prefix string to use for the CloudWatch Log Stream that gets created for each Fargate pod.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;fargate&quot;"/>
</HclListItem>

<HclListItem name="fargate_worker_disallowed_availability_zones" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of availability zones in the region that we CANNOT use to deploy the EKS Fargate workers. You can use this to avoid availability zones that may not be able to provision the resources (e.g ran out of capacity). If empty, will allow all availability zones.

</HclListItemDescription>
<HclListItemDefaultValue>

```hcl
[
  "us-east-1d",
  "us-east-1e",
  "ca-central-1d"
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="fluent_bit_additional_inputs" requirement="optional" type="string">
<HclListItemDescription>

Can be used to add more inputs. This string should be formatted according to Fluent Bit docs (https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/classic-mode/configuration-file#config_input).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="fluent_bit_extra_filters" requirement="optional" type="string">
<HclListItemDescription>

Additional filters that fluent-bit should apply to log output. This string should be formatted according to the Fluent-bit docs (https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/configuration-file#config_filter).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="fluent_bit_extra_outputs" requirement="optional" type="string">
<HclListItemDescription>

Additional output streams that fluent-bit should export logs to. This string should be formatted according to the Fluent-bit docs (https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/configuration-file#config_output).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="fluent_bit_extra_parsers" requirement="optional" type="string">
<HclListItemDescription>

Can be used to add additional log parsers. This string should be formatted according to Fluent Bit docs, as it will be injected directly into the fluent-bit.conf file.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="fluent_bit_image_repository" requirement="optional" type="string">
<HclListItemDescription>

The Container repository to use for looking up the aws-for-fluent-bit Container image when deploying the pods. When null, uses the default repository set in the chart. Only applies to non-fargate workers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="fluent_bit_log_group_already_exists" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, that means that the CloudWatch Log Group fluent-bit should use for streaming logs already exists and does not need to be created.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="fluent_bit_log_group_kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the KMS key to use to encrypt the logs in the CloudWatch Log Group used for storing container logs streamed with FluentBit. Set to null to disable encryption.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="fluent_bit_log_group_name" requirement="optional" type="string">
<HclListItemDescription>

Name of the CloudWatch Log Group fluent-bit should use to stream logs to. When null (default), uses the eks_cluster_name as the Log Group name.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="fluent_bit_log_group_retention" requirement="optional" type="number">
<HclListItemDescription>

number of days to retain log events. Possible values are: 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1827, 3653, and 0. Select 0 to never expire.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="fluent_bit_log_group_subscription_arn" requirement="optional" type="string">
<HclListItemDescription>

ARN of the lambda function to trigger when events arrive at the fluent bit log group.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="fluent_bit_log_group_subscription_filter" requirement="optional" type="string">
<HclListItemDescription>

Filter pattern for the CloudWatch subscription. Only used if <a href="#fluent_bit_log_group_subscription_arn"><code>fluent_bit_log_group_subscription_arn</code></a> is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="fluent_bit_log_stream_prefix" requirement="optional" type="string">
<HclListItemDescription>

Prefix string to use for the CloudWatch Log Stream that gets created for each pod. When null (default), the prefix is set to 'fluentbit'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="fluent_bit_pod_node_affinity" requirement="optional" type="list(object(…))">
<HclListItemDescription>

Configure affinity rules for the fluent-bit Pods to control which nodes to schedule on. Each item in the list should be a map with the keys `key`, `values`, and `operator`, corresponding to the 3 properties of matchExpressions. Note that all expressions must be satisfied to schedule on the node.

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

<HclListItem name="fluent_bit_pod_tolerations" requirement="optional" type="list(map(…))">
<HclListItemDescription>

Configure tolerations rules to allow the fluent-bit Pods to schedule on nodes that have been tainted. Each item in the list specifies a toleration rule.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(map(any))
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

<HclListItem name="fluent_bit_use_cri_parser_conf" requirement="optional" type="bool">
<HclListItemDescription>

Optionally use a cri parser instead of the default Docker parser. This should be used for EKS v1.24 and later.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="fluent_bit_version" requirement="optional" type="string">
<HclListItemDescription>

Which version of aws-for-fluent-bit to install. When null, uses the default version set in the chart. Only applies to non-fargate workers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="kubernetes_priority_classes" requirement="optional" type="map(object(…))">
<HclListItemDescription>

A map of PriorityClass configurations, with the key as the PriorityClass name. https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/#priorityclass

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    description    = string
    global_default = bool
    value          = number
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="route53_record_update_policy" requirement="optional" type="string">
<HclListItemDescription>

Policy for how DNS records are sychronized between sources and providers (options: sync, upsert-only).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;sync&quot;"/>
</HclListItem>

<HclListItem name="schedule_alb_ingress_controller_on_fargate" requirement="optional" type="bool">
<HclListItemDescription>

When true, the ALB ingress controller pods will be scheduled on Fargate.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="schedule_cluster_autoscaler_on_fargate" requirement="optional" type="bool">
<HclListItemDescription>

When true, the cluster autoscaler pods will be scheduled on Fargate. It is recommended to run the cluster autoscaler on Fargate to avoid the autoscaler scaling down a node where it is running (and thus shutting itself down during a scale down event). However, since Fargate is only supported on a handful of regions, we don't default to true here.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="schedule_external_dns_on_fargate" requirement="optional" type="bool">
<HclListItemDescription>

When true, the external-dns pods will be scheduled on Fargate.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="service_dns_mappings" requirement="optional" type="map(object(…))">
<HclListItemDescription>

Configure Kubernetes Services to lookup external DNS records. This can be useful to bind friendly internal service names to domains (e.g. the RDS database endpoint).

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    # DNS record to route requests to the Kubernetes Service to.
    target_dns = string

    # Port to route requests
    target_port = number

    # Namespace to create the underlying Kubernetes Service in.
    namespace = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

     Port to route requests

```
</details>

<details>


```hcl

     Namespace to create the underlying Kubernetes Service in.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="use_exec_plugin_for_auth" requirement="optional" type="bool">
<HclListItemDescription>

If this variable is set to true, then use an exec-based plugin to authenticate and fetch tokens for EKS. This is useful because EKS clusters use short-lived authentication tokens that can expire in the middle of an 'apply' or 'destroy', and since the native Kubernetes provider in Terraform doesn't have a way to fetch up-to-date tokens, we recommend using an exec-based provider as a workaround. Use the use_kubergrunt_to_fetch_token input variable to control whether kubergrunt or aws is used to fetch tokens.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="use_kubergrunt_to_fetch_token" requirement="optional" type="bool">
<HclListItemDescription>

EKS clusters use short-lived authentication tokens that can expire in the middle of an 'apply' or 'destroy'. To avoid this issue, we use an exec-based plugin to fetch an up-to-date token. If this variable is set to true, we'll use kubergrunt to fetch the token (in which case, kubergrunt must be installed and on PATH); if this variable is set to false, we'll use the aws CLI to fetch the token (in which case, aws must be installed and on PATH). Note this functionality is only enabled if use_exec_plugin_for_auth is set to true.

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

<HclListItem name="container_logs_cloudwatch_log_group_name">
<HclListItemDescription>

Name of the CloudWatch Log Group used to store the container logs.

</HclListItemDescription>
</HclListItem>

<HclListItem name="kubernetes_priority_class_names">
<HclListItemDescription>

A list of names of Kubernetes PriorityClass objects created by this module.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/eks-core-services/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/eks-core-services/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/eks-core-services/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "e14a48e33b9d7d093f2bd90e73ed8920"
}
##DOCS-SOURCER-END -->
