---
type: "service"
name: "Kubernetes Service"
description: "Deploy your application containers as a Kubernetes Service and Deployment following best practices."
category: "docker-orchestration"
cloud: "aws"
tags: ["docker","orchestration","kubernetes","containers"]
license: "gruntwork"
built-with: "terraform, helm"
title: "Kubernetes Service"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.104.14" lastModifiedVersion="0.100.0"/>

# Kubernetes Service

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/k8s-service" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=services%2Fk8s-service" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>

## Overview

This service contains [Terraform](https://www.terraform.io) code to deploy your web application containers using
[the k8-service Gruntwork Helm Chart](https://github.com/gruntwork-io/helm-kubernetes-services/) on to
[Kubernetes](https://kubernetes.io/) following best practices.

If you want to deploy third-party applications already packaged as Helm Charts, such as those available in [bitnami](https://bitnami.com/stacks/helm), see the [`helm-service`](/reference/services/app-orchestration/helm-service) module.

![Kubernetes Service architecture](/img/reference/services/app-orchestration/k8s-service-architecture.png)

## Features

*   Deploy your application containers on to Kubernetes
*   Zero-downtime rolling deployments
*   Auto scaling and auto healing
*   Configuration management and Secrets management
*   Ingress and Service endpoints
*   Service discovery with Kubernetes DNS
*   Managed with Helm

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

Under the hood, this is all implemented using Terraform modules from the Gruntwork
[helm-kubernetes-services](https://github.com/gruntwork-io/helm-kubernetes-services) repo. If you are a subscriber and
don’t have access to this repo, email <support@gruntwork.io>.

### Core concepts

*   [Kubernetes core concepts](https://docs.gruntwork.io/guides/build-it-yourself/kubernetes-cluster/core-concepts/what-is-kubernetes):
    learn about Kubernetes architecture (control plane, worker nodes), access control (authentication, authorization,
    resources (pods, controllers, services, config, secrets), and more.

*   [How do you run applications on Kubernetes?](https://github.com/gruntwork-io/helm-kubernetes-services/blob/master/core-concepts.md#how-do-you-run-applications-on-kubernetes)

*   [What is Helm?](https://github.com/gruntwork-io/helm-kubernetes-services/blob/master/core-concepts.md#what-is-helm)

*   *[Kubernetes in Action](https://www.manning.com/books/kubernetes-in-action)*: the best book we’ve found for getting up
    and running with Kubernetes.

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


## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S K8S-SERVICE MODULE
# ------------------------------------------------------------------------------------------------------

module "k_8_s_service" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/k8s-service?ref=v0.104.14"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the application (e.g. my-service-stage). Used for labeling
  # Kubernetes resources.
  application_name = <string>

  # The Docker image to run.
  container_image = <object(
    repository = string
    tag = string
    pull_policy = string
  )>

  # The port number on which this service's Docker container accepts incoming
  # traffic.
  container_port = <number>

  # The number of Pods to run on the Kubernetes cluster for this service.
  desired_number_of_pods = <number>

  # The Kubernetes Namespace to deploy the application into.
  namespace = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Map of additional ports to expose for the container. The key is the name of
  # the port and value contains port number and protocol.
  additional_ports = null

  # A list of ACM certificate ARNs to attach to the ALB. The first certificate
  # in the list will be added as default certificate.
  alb_acm_certificate_arns = []

  # The number of consecutive health check successes required before considering
  # an unhealthy target healthy.
  alb_health_check_healthy_threshold = 2

  # Interval between ALB health checks in seconds.
  alb_health_check_interval = 30

  # URL path for the endpoint that the ALB health check should ping. Defaults to
  # /.
  alb_health_check_path = "/"

  # String value specifying the port that the ALB health check should probe. By
  # default, this will be set to the traffic port (the NodePort or port where
  # the service receives traffic). This can also be set to a Kubernetes named
  # port, or direct integer value. See
  # https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.3/guide/ingress/annotations/#healthcheck-port
  # for more information.
  alb_health_check_port = "traffic-port"

  # Protocol (HTTP or HTTPS) that the ALB health check should use to connect to
  # the application container.
  alb_health_check_protocol = "HTTP"

  # The HTTP status code that should be expected when doing health checks
  # against the specified health check path. Accepts a single value (200),
  # multiple values (200,201), or a range of values (200-300).
  alb_health_check_success_codes = "200"

  # The timeout, in seconds, during which no response from a target means a
  # failed health check.
  alb_health_check_timeout = 10

  # The Docker image to use for the canary. Required if
  # desired_number_of_canary_pods is greater than 0.
  canary_image = null

  # Allow deletion of new resources created in this upgrade when upgrade fails.
  cleanup_on_fail = null

  # Kubernetes ConfigMaps to be injected into the container. Each entry in the
  # map represents a ConfigMap to be injected, with the key representing the
  # name of the ConfigMap. The value is also a map, with each entry
  # corresponding to an entry in the ConfigMap, with the key corresponding to
  # the ConfigMap entry key and the value corresponding to the environment
  # variable name.
  configmaps_as_env_vars = {}

  # Kubernetes ConfigMaps to be injected into the container as volume mounts.
  # Each entry in the map represents a ConfigMap to be mounted, with the key
  # representing the name of the ConfigMap and the value as a map containing
  # required mountPath (file path on the container to mount the ConfigMap to)
  # and optional subPath (sub-path inside the referenced volume).
  configmaps_as_volumes = {}

  # The protocol on which this service's Docker container accepts traffic. Must
  # be one of the supported protocols:
  # https://kubernetes.io/docs/concepts/services-networking/service/#protocol-support.
  container_protocol = "TCP"

  # The map that lets you define Kubernetes resources you want installed and
  # configured as part of the chart.
  custom_resources = {}

  # The number of canary Pods to run on the Kubernetes cluster for this service.
  # If greater than 0, you must provide var.canary_image.
  desired_number_of_canary_pods = 0

  # The domain name for the DNS A record to bind to the Ingress resource for
  # this service (e.g. service.foo.com). Depending on your external-dns
  # configuration, this will also create the DNS record in the configured DNS
  # service (e.g., Route53).
  domain_name = null

  # The TTL value of the DNS A record that is bound to the Ingress resource.
  # Only used if var.domain_name is set and external-dns is deployed.
  domain_propagation_ttl = null

  # Configuration for using the IAM role with Service Accounts feature to
  # provide permissions to the applications. This expects a map with two
  # properties: `openid_connect_provider_arn` and `openid_connect_provider_url`.
  # The `openid_connect_provider_arn` is the ARN of the OpenID Connect Provider
  # for EKS to retrieve IAM credentials, while `openid_connect_provider_url` is
  # the URL. Leave as an empty string if you do not wish to use IAM role with
  # Service Accounts.
  eks_iam_role_for_service_accounts_config = {"openid_connect_provider_arn":"","openid_connect_provider_url":""}

  # Whether or not to enable liveness probe. Liveness checks indicate whether or
  # not the container is alive. When these checks fail, the cluster will
  # automatically rotate the Pod.
  enable_liveness_probe = false

  # Whether or not to enable readiness probe. Readiness checks indicate whether
  # or not the container can accept traffic. When these checks fail, the Pods
  # are automatically removed from the Service (and added back in when they
  # pass).
  enable_readiness_probe = false

  # A map of environment variable name to environment variable value that should
  # be made available to the Docker container.
  env_vars = {}

  # How the service will be exposed in the cluster. Must be one of `external`
  # (accessible over the public Internet), `internal` (only accessible from
  # within the same VPC as the cluster), `cluster-internal` (only accessible
  # within the Kubernetes network), `none` (deploys as a headless service with
  # no service IP).
  expose_type = "cluster-internal"

  # A boolean that indicates whether the access logs bucket should be destroyed,
  # even if there are files in it, when you run Terraform destroy. Unless you
  # are using this bucket only for test purposes, you'll want to leave this
  # variable set to false.
  force_destroy_ingress_access_logs = false

  # The version of the k8s-service helm chart to deploy.
  helm_chart_version = "v0.2.18"

  # Configure the Horizontal Pod Autoscaler (HPA) information for the associated
  # Deployment. HPA is disabled when this variable is set to null. Note that to
  # use an HPA, you must have a corresponding service deployed to your cluster
  # that exports the metrics (e.g., metrics-server
  # https://github.com/kubernetes-sigs/metrics-server).
  horizontal_pod_autoscaler = null

  # An object defining the policy to attach to `iam_role_name` if the IAM role
  # is going to be created. Accepts a map of objects, where the map keys are
  # sids for IAM policy statements, and the object fields are the resources,
  # actions, and the effect ("Allow" or "Deny") of the statement. Ignored if
  # `iam_role_arn` is provided. Leave as null if you do not wish to use IAM role
  # with Service Accounts.
  iam_policy = null

  # Whether or not the IAM role passed in `iam_role_name` already exists. Set to
  # true if it exists, or false if it needs to be created. Defaults to false.
  iam_role_exists = false

  # The name of an IAM role that will be used by the pod to access the AWS API.
  # If `iam_role_exists` is set to false, this role will be created. Leave as an
  # empty string if you do not wish to use IAM role with Service Accounts.
  iam_role_name = ""

  # Set to true if the S3 bucket to store the Ingress access logs is managed
  # external to this module.
  ingress_access_logs_s3_bucket_already_exists = false

  # The name to use for the S3 bucket where the Ingress access logs will be
  # stored. If you leave this blank, a name will be generated automatically
  # based on var.application_name.
  ingress_access_logs_s3_bucket_name = ""

  # The prefix to use for ingress access logs associated with the ALB. All logs
  # will be stored in a key with this prefix. If null, the application name will
  # be used.
  ingress_access_logs_s3_prefix = null

  # A list of custom ingress annotations, such as health checks and TLS
  # certificates, to add to the Helm chart. See:
  # https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/guide/ingress/annotations/
  ingress_annotations = {}

  # The protocol used by the Ingress ALB resource to communicate with the
  # Service. Must be one of HTTP or HTTPS.
  ingress_backend_protocol = "HTTP"

  # When true, HTTP requests will automatically be redirected to use SSL
  # (HTTPS). Used only when expose_type is either external or internal.
  ingress_configure_ssl_redirect = true

  # Assign the ingress resource to an IngressGroup. All Ingress rules of the
  # group will be collapsed to a single ALB. The rules will be collapsed in
  # priority order, with lower numbers being evaluated first.
  ingress_group = null

  # A list of maps of protocols and ports that the ALB should listen on.
  ingress_listener_protocol_ports = [{"port":80,"protocol":"HTTP"},{"port":443,"protocol":"HTTPS"}]

  # Path prefix that should be matched to route to the service. For Kubernetes
  # Versions <1.19, Use /* to match all paths. For Kubernetes Versions >=1.19,
  # use / with ingress_path_type set to Prefix to match all paths.
  ingress_path = "/"

  # The path type to use for the ingress rule. Refer to
  # https://kubernetes.io/docs/concepts/services-networking/ingress/#path-types
  # for more information.
  ingress_path_type = "Prefix"

  # Set to true if the Ingress SSL redirect rule is managed externally. This is
  # useful when configuring Ingress grouping and you only want one service to be
  # managing the SSL redirect rules. Only used if ingress_configure_ssl_redirect
  # is true.
  ingress_ssl_redirect_rule_already_exists = false

  # Whether or not the redirect rule requires setting path type. Set to true
  # when deploying to Kubernetes clusters with version >=1.19. Only used if
  # ingress_configure_ssl_redirect is true.
  ingress_ssl_redirect_rule_requires_path_type = true

  # Controls how the ALB routes traffic to the Pods. Supports 'instance' mode
  # (route traffic to NodePort and load balance across all worker nodes, relying
  # on Kubernetes Service networking to route to the pods), or 'ip' mode (route
  # traffic directly to the pod IP - only works with AWS VPC CNI). Must be set
  # to 'ip' if using Fargate. Only used if expose_type is not cluster-internal.
  ingress_target_type = "instance"

  # Seconds to wait after Pod creation before liveness probe has any effect. Any
  # failures during this period are ignored.
  liveness_probe_grace_period_seconds = 15

  # The approximate amount of time, in seconds, between liveness checks of an
  # individual Target.
  liveness_probe_interval_seconds = 30

  # URL path for the endpoint that the liveness probe should ping.
  liveness_probe_path = "/"

  # Port that the liveness probe should use to connect to the application
  # container.
  liveness_probe_port = 80

  # Protocol (HTTP or HTTPS) that the liveness probe should use to connect to
  # the application container.
  liveness_probe_protocol = "HTTP"

  # The minimum number of pods that should be available at any given point in
  # time. This is used to configure a PodDisruptionBudget for the service,
  # allowing you to achieve a graceful rollout. See
  # https://blog.gruntwork.io/avoiding-outages-in-your-kubernetes-cluster-using-poddisruptionbudgets-ef6a4baa5085
  # for an introduction to PodDisruptionBudgets.
  min_number_of_pods_available = 0

  # After this number of days, Ingress log files should be transitioned from S3
  # to Glacier. Set to 0 to never archive logs.
  num_days_after_which_archive_ingress_log_data = 0

  # After this number of days, Ingress log files should be deleted from S3. Set
  # to 0 to never delete logs.
  num_days_after_which_delete_ingress_log_data = 0

  # Override any computed chart inputs with this map. This map is shallow merged
  # to the computed chart inputs prior to passing on to the Helm Release. This
  # is provided as a workaround while the terraform module does not support a
  # particular input value that is exposed in the underlying chart. Please
  # always file a GitHub issue to request exposing additional underlying input
  # values prior to using this variable.
  override_chart_inputs = {}

  # Seconds to wait after Pod creation before liveness probe has any effect. Any
  # failures during this period are ignored.
  readiness_probe_grace_period_seconds = 15

  # The approximate amount of time, in seconds, between liveness checks of an
  # individual Target.
  readiness_probe_interval_seconds = 30

  # URL path for the endpoint that the readiness probe should ping.
  readiness_probe_path = "/"

  # Port that the readiness probe should use to connect to the application
  # container.
  readiness_probe_port = 80

  # Protocol (HTTP or HTTPS) that the readiness probe should use to connect to
  # the application container.
  readiness_probe_protocol = "HTTP"

  # Paths that should be allocated as tmpfs volumes in the Deployment container.
  # Each entry in the map is a key value pair where the key is an arbitrary name
  # to bind to the volume, and the value is the path in the container to mount
  # the tmpfs volume.
  scratch_paths = {}

  # Kubernetes Secrets to be injected into the container. Each entry in the map
  # represents a Secret to be injected, with the key representing the name of
  # the Secret. The value is also a map, with each entry corresponding to an
  # entry in the Secret, with the key corresponding to the Secret entry key and
  # the value corresponding to the environment variable name.
  secrets_as_env_vars = {}

  # Kubernetes Secrets to be injected into the container as volume mounts. Each
  # entry in the map represents a Secret to be mounted, with the key
  # representing the name of the Secret and the value as a map containing
  # required mountPath (file path on the container to mount the Secret to) and
  # optional subPath (sub-path inside the referenced volume).
  secrets_as_volumes = {}

  # When true, and service_account_name is not blank, lookup and assign an
  # existing ServiceAccount in the Namespace to the Pods.
  service_account_exists = false

  # The name of a service account to create for use with the Pods. This service
  # account will be mapped to the IAM role defined in `var.iam_role_name` to
  # give the pod permissions to access the AWS API. Must be unique in this
  # namespace. Leave as an empty string if you do not wish to assign a Service
  # Account to the Pods.
  service_account_name = ""

  # The port to expose on the Service. This is most useful when addressing the
  # Service internally to the cluster, as it is ignored when connecting from the
  # Ingress resource.
  service_port = 80

  # Map of keys to container definitions that allow you to manage additional
  # side car containers that should be included in the Pod. Note that the values
  # are injected directly into the container list for the Pod Spec.
  sidecar_containers = {}

  # Grace period in seconds that Kubernetes will wait before terminating the
  # pod. The timeout happens in parallel to preStop hook and the SIGTERM signal,
  # Kubernetes does not wait for preStop to finish before beginning the grace
  # period.
  termination_grace_period_seconds = null

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

  # A local file path where the helm chart values will be emitted. Use to debug
  # issues with the helm chart values. Set to null to prevent creation of the
  # file.
  values_file_path = null

  # When true, wait until Pods are up and healthy or wait_timeout seconds before
  # exiting terraform.
  wait = true

  # Number of seconds to wait for Pods to become healthy before marking the
  # deployment as a failure.
  wait_timeout = 300

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S K8S-SERVICE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/k8s-service?ref=v0.104.14"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the application (e.g. my-service-stage). Used for labeling
  # Kubernetes resources.
  application_name = <string>

  # The Docker image to run.
  container_image = <object(
    repository = string
    tag = string
    pull_policy = string
  )>

  # The port number on which this service's Docker container accepts incoming
  # traffic.
  container_port = <number>

  # The number of Pods to run on the Kubernetes cluster for this service.
  desired_number_of_pods = <number>

  # The Kubernetes Namespace to deploy the application into.
  namespace = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Map of additional ports to expose for the container. The key is the name of
  # the port and value contains port number and protocol.
  additional_ports = null

  # A list of ACM certificate ARNs to attach to the ALB. The first certificate
  # in the list will be added as default certificate.
  alb_acm_certificate_arns = []

  # The number of consecutive health check successes required before considering
  # an unhealthy target healthy.
  alb_health_check_healthy_threshold = 2

  # Interval between ALB health checks in seconds.
  alb_health_check_interval = 30

  # URL path for the endpoint that the ALB health check should ping. Defaults to
  # /.
  alb_health_check_path = "/"

  # String value specifying the port that the ALB health check should probe. By
  # default, this will be set to the traffic port (the NodePort or port where
  # the service receives traffic). This can also be set to a Kubernetes named
  # port, or direct integer value. See
  # https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.3/guide/ingress/annotations/#healthcheck-port
  # for more information.
  alb_health_check_port = "traffic-port"

  # Protocol (HTTP or HTTPS) that the ALB health check should use to connect to
  # the application container.
  alb_health_check_protocol = "HTTP"

  # The HTTP status code that should be expected when doing health checks
  # against the specified health check path. Accepts a single value (200),
  # multiple values (200,201), or a range of values (200-300).
  alb_health_check_success_codes = "200"

  # The timeout, in seconds, during which no response from a target means a
  # failed health check.
  alb_health_check_timeout = 10

  # The Docker image to use for the canary. Required if
  # desired_number_of_canary_pods is greater than 0.
  canary_image = null

  # Allow deletion of new resources created in this upgrade when upgrade fails.
  cleanup_on_fail = null

  # Kubernetes ConfigMaps to be injected into the container. Each entry in the
  # map represents a ConfigMap to be injected, with the key representing the
  # name of the ConfigMap. The value is also a map, with each entry
  # corresponding to an entry in the ConfigMap, with the key corresponding to
  # the ConfigMap entry key and the value corresponding to the environment
  # variable name.
  configmaps_as_env_vars = {}

  # Kubernetes ConfigMaps to be injected into the container as volume mounts.
  # Each entry in the map represents a ConfigMap to be mounted, with the key
  # representing the name of the ConfigMap and the value as a map containing
  # required mountPath (file path on the container to mount the ConfigMap to)
  # and optional subPath (sub-path inside the referenced volume).
  configmaps_as_volumes = {}

  # The protocol on which this service's Docker container accepts traffic. Must
  # be one of the supported protocols:
  # https://kubernetes.io/docs/concepts/services-networking/service/#protocol-support.
  container_protocol = "TCP"

  # The map that lets you define Kubernetes resources you want installed and
  # configured as part of the chart.
  custom_resources = {}

  # The number of canary Pods to run on the Kubernetes cluster for this service.
  # If greater than 0, you must provide var.canary_image.
  desired_number_of_canary_pods = 0

  # The domain name for the DNS A record to bind to the Ingress resource for
  # this service (e.g. service.foo.com). Depending on your external-dns
  # configuration, this will also create the DNS record in the configured DNS
  # service (e.g., Route53).
  domain_name = null

  # The TTL value of the DNS A record that is bound to the Ingress resource.
  # Only used if var.domain_name is set and external-dns is deployed.
  domain_propagation_ttl = null

  # Configuration for using the IAM role with Service Accounts feature to
  # provide permissions to the applications. This expects a map with two
  # properties: `openid_connect_provider_arn` and `openid_connect_provider_url`.
  # The `openid_connect_provider_arn` is the ARN of the OpenID Connect Provider
  # for EKS to retrieve IAM credentials, while `openid_connect_provider_url` is
  # the URL. Leave as an empty string if you do not wish to use IAM role with
  # Service Accounts.
  eks_iam_role_for_service_accounts_config = {"openid_connect_provider_arn":"","openid_connect_provider_url":""}

  # Whether or not to enable liveness probe. Liveness checks indicate whether or
  # not the container is alive. When these checks fail, the cluster will
  # automatically rotate the Pod.
  enable_liveness_probe = false

  # Whether or not to enable readiness probe. Readiness checks indicate whether
  # or not the container can accept traffic. When these checks fail, the Pods
  # are automatically removed from the Service (and added back in when they
  # pass).
  enable_readiness_probe = false

  # A map of environment variable name to environment variable value that should
  # be made available to the Docker container.
  env_vars = {}

  # How the service will be exposed in the cluster. Must be one of `external`
  # (accessible over the public Internet), `internal` (only accessible from
  # within the same VPC as the cluster), `cluster-internal` (only accessible
  # within the Kubernetes network), `none` (deploys as a headless service with
  # no service IP).
  expose_type = "cluster-internal"

  # A boolean that indicates whether the access logs bucket should be destroyed,
  # even if there are files in it, when you run Terraform destroy. Unless you
  # are using this bucket only for test purposes, you'll want to leave this
  # variable set to false.
  force_destroy_ingress_access_logs = false

  # The version of the k8s-service helm chart to deploy.
  helm_chart_version = "v0.2.18"

  # Configure the Horizontal Pod Autoscaler (HPA) information for the associated
  # Deployment. HPA is disabled when this variable is set to null. Note that to
  # use an HPA, you must have a corresponding service deployed to your cluster
  # that exports the metrics (e.g., metrics-server
  # https://github.com/kubernetes-sigs/metrics-server).
  horizontal_pod_autoscaler = null

  # An object defining the policy to attach to `iam_role_name` if the IAM role
  # is going to be created. Accepts a map of objects, where the map keys are
  # sids for IAM policy statements, and the object fields are the resources,
  # actions, and the effect ("Allow" or "Deny") of the statement. Ignored if
  # `iam_role_arn` is provided. Leave as null if you do not wish to use IAM role
  # with Service Accounts.
  iam_policy = null

  # Whether or not the IAM role passed in `iam_role_name` already exists. Set to
  # true if it exists, or false if it needs to be created. Defaults to false.
  iam_role_exists = false

  # The name of an IAM role that will be used by the pod to access the AWS API.
  # If `iam_role_exists` is set to false, this role will be created. Leave as an
  # empty string if you do not wish to use IAM role with Service Accounts.
  iam_role_name = ""

  # Set to true if the S3 bucket to store the Ingress access logs is managed
  # external to this module.
  ingress_access_logs_s3_bucket_already_exists = false

  # The name to use for the S3 bucket where the Ingress access logs will be
  # stored. If you leave this blank, a name will be generated automatically
  # based on var.application_name.
  ingress_access_logs_s3_bucket_name = ""

  # The prefix to use for ingress access logs associated with the ALB. All logs
  # will be stored in a key with this prefix. If null, the application name will
  # be used.
  ingress_access_logs_s3_prefix = null

  # A list of custom ingress annotations, such as health checks and TLS
  # certificates, to add to the Helm chart. See:
  # https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/guide/ingress/annotations/
  ingress_annotations = {}

  # The protocol used by the Ingress ALB resource to communicate with the
  # Service. Must be one of HTTP or HTTPS.
  ingress_backend_protocol = "HTTP"

  # When true, HTTP requests will automatically be redirected to use SSL
  # (HTTPS). Used only when expose_type is either external or internal.
  ingress_configure_ssl_redirect = true

  # Assign the ingress resource to an IngressGroup. All Ingress rules of the
  # group will be collapsed to a single ALB. The rules will be collapsed in
  # priority order, with lower numbers being evaluated first.
  ingress_group = null

  # A list of maps of protocols and ports that the ALB should listen on.
  ingress_listener_protocol_ports = [{"port":80,"protocol":"HTTP"},{"port":443,"protocol":"HTTPS"}]

  # Path prefix that should be matched to route to the service. For Kubernetes
  # Versions <1.19, Use /* to match all paths. For Kubernetes Versions >=1.19,
  # use / with ingress_path_type set to Prefix to match all paths.
  ingress_path = "/"

  # The path type to use for the ingress rule. Refer to
  # https://kubernetes.io/docs/concepts/services-networking/ingress/#path-types
  # for more information.
  ingress_path_type = "Prefix"

  # Set to true if the Ingress SSL redirect rule is managed externally. This is
  # useful when configuring Ingress grouping and you only want one service to be
  # managing the SSL redirect rules. Only used if ingress_configure_ssl_redirect
  # is true.
  ingress_ssl_redirect_rule_already_exists = false

  # Whether or not the redirect rule requires setting path type. Set to true
  # when deploying to Kubernetes clusters with version >=1.19. Only used if
  # ingress_configure_ssl_redirect is true.
  ingress_ssl_redirect_rule_requires_path_type = true

  # Controls how the ALB routes traffic to the Pods. Supports 'instance' mode
  # (route traffic to NodePort and load balance across all worker nodes, relying
  # on Kubernetes Service networking to route to the pods), or 'ip' mode (route
  # traffic directly to the pod IP - only works with AWS VPC CNI). Must be set
  # to 'ip' if using Fargate. Only used if expose_type is not cluster-internal.
  ingress_target_type = "instance"

  # Seconds to wait after Pod creation before liveness probe has any effect. Any
  # failures during this period are ignored.
  liveness_probe_grace_period_seconds = 15

  # The approximate amount of time, in seconds, between liveness checks of an
  # individual Target.
  liveness_probe_interval_seconds = 30

  # URL path for the endpoint that the liveness probe should ping.
  liveness_probe_path = "/"

  # Port that the liveness probe should use to connect to the application
  # container.
  liveness_probe_port = 80

  # Protocol (HTTP or HTTPS) that the liveness probe should use to connect to
  # the application container.
  liveness_probe_protocol = "HTTP"

  # The minimum number of pods that should be available at any given point in
  # time. This is used to configure a PodDisruptionBudget for the service,
  # allowing you to achieve a graceful rollout. See
  # https://blog.gruntwork.io/avoiding-outages-in-your-kubernetes-cluster-using-poddisruptionbudgets-ef6a4baa5085
  # for an introduction to PodDisruptionBudgets.
  min_number_of_pods_available = 0

  # After this number of days, Ingress log files should be transitioned from S3
  # to Glacier. Set to 0 to never archive logs.
  num_days_after_which_archive_ingress_log_data = 0

  # After this number of days, Ingress log files should be deleted from S3. Set
  # to 0 to never delete logs.
  num_days_after_which_delete_ingress_log_data = 0

  # Override any computed chart inputs with this map. This map is shallow merged
  # to the computed chart inputs prior to passing on to the Helm Release. This
  # is provided as a workaround while the terraform module does not support a
  # particular input value that is exposed in the underlying chart. Please
  # always file a GitHub issue to request exposing additional underlying input
  # values prior to using this variable.
  override_chart_inputs = {}

  # Seconds to wait after Pod creation before liveness probe has any effect. Any
  # failures during this period are ignored.
  readiness_probe_grace_period_seconds = 15

  # The approximate amount of time, in seconds, between liveness checks of an
  # individual Target.
  readiness_probe_interval_seconds = 30

  # URL path for the endpoint that the readiness probe should ping.
  readiness_probe_path = "/"

  # Port that the readiness probe should use to connect to the application
  # container.
  readiness_probe_port = 80

  # Protocol (HTTP or HTTPS) that the readiness probe should use to connect to
  # the application container.
  readiness_probe_protocol = "HTTP"

  # Paths that should be allocated as tmpfs volumes in the Deployment container.
  # Each entry in the map is a key value pair where the key is an arbitrary name
  # to bind to the volume, and the value is the path in the container to mount
  # the tmpfs volume.
  scratch_paths = {}

  # Kubernetes Secrets to be injected into the container. Each entry in the map
  # represents a Secret to be injected, with the key representing the name of
  # the Secret. The value is also a map, with each entry corresponding to an
  # entry in the Secret, with the key corresponding to the Secret entry key and
  # the value corresponding to the environment variable name.
  secrets_as_env_vars = {}

  # Kubernetes Secrets to be injected into the container as volume mounts. Each
  # entry in the map represents a Secret to be mounted, with the key
  # representing the name of the Secret and the value as a map containing
  # required mountPath (file path on the container to mount the Secret to) and
  # optional subPath (sub-path inside the referenced volume).
  secrets_as_volumes = {}

  # When true, and service_account_name is not blank, lookup and assign an
  # existing ServiceAccount in the Namespace to the Pods.
  service_account_exists = false

  # The name of a service account to create for use with the Pods. This service
  # account will be mapped to the IAM role defined in `var.iam_role_name` to
  # give the pod permissions to access the AWS API. Must be unique in this
  # namespace. Leave as an empty string if you do not wish to assign a Service
  # Account to the Pods.
  service_account_name = ""

  # The port to expose on the Service. This is most useful when addressing the
  # Service internally to the cluster, as it is ignored when connecting from the
  # Ingress resource.
  service_port = 80

  # Map of keys to container definitions that allow you to manage additional
  # side car containers that should be included in the Pod. Note that the values
  # are injected directly into the container list for the Pod Spec.
  sidecar_containers = {}

  # Grace period in seconds that Kubernetes will wait before terminating the
  # pod. The timeout happens in parallel to preStop hook and the SIGTERM signal,
  # Kubernetes does not wait for preStop to finish before beginning the grace
  # period.
  termination_grace_period_seconds = null

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

  # A local file path where the helm chart values will be emitted. Use to debug
  # issues with the helm chart values. Set to null to prevent creation of the
  # file.
  values_file_path = null

  # When true, wait until Pods are up and healthy or wait_timeout seconds before
  # exiting terraform.
  wait = true

  # Number of seconds to wait for Pods to become healthy before marking the
  # deployment as a failure.
  wait_timeout = 300

}


```

</TabItem>
</Tabs>



## Reference


<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="application_name" requirement="required" type="string">
<HclListItemDescription>

The name of the application (e.g. my-service-stage). Used for labeling Kubernetes resources.

</HclListItemDescription>
</HclListItem>

<HclListItem name="container_image" requirement="required" type="object(…)">
<HclListItemDescription>

The Docker image to run.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # Repository of the docker image (e.g. gruntwork/frontend-service)
    repository = string
    # The tag of the docker image to deploy.
    tag = string
    # The image pull policy. Can be one of IfNotPresent, Always, or Never.
    pull_policy = string
  })
```

</HclListItemTypeDetails>
</HclListItem>

<HclListItem name="container_port" requirement="required" type="number">
<HclListItemDescription>

The port number on which this service's Docker container accepts incoming traffic.

</HclListItemDescription>
</HclListItem>

<HclListItem name="desired_number_of_pods" requirement="required" type="number">
<HclListItemDescription>

The number of Pods to run on the Kubernetes cluster for this service.

</HclListItemDescription>
</HclListItem>

<HclListItem name="namespace" requirement="required" type="string">
<HclListItemDescription>

The Kubernetes Namespace to deploy the application into.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="additional_ports" requirement="optional" type="map(object(…))">
<HclListItemDescription>

Map of additional ports to expose for the container. The key is the name of the port and value contains port number and protocol.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    port : number
    protocol : string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   additional_ports = {
     prometheus = {
       port = 9102
       protocol = "TCP"
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="alb_acm_certificate_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of ACM certificate ARNs to attach to the ALB. The first certificate in the list will be added as default certificate.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="alb_health_check_healthy_threshold" requirement="optional" type="number">
<HclListItemDescription>

The number of consecutive health check successes required before considering an unhealthy target healthy.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="2"/>
</HclListItem>

<HclListItem name="alb_health_check_interval" requirement="optional" type="number">
<HclListItemDescription>

Interval between ALB health checks in seconds.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="alb_health_check_path" requirement="optional" type="string">
<HclListItemDescription>

URL path for the endpoint that the ALB health check should ping. Defaults to /.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;/&quot;"/>
</HclListItem>

<HclListItem name="alb_health_check_port" requirement="optional" type="string">
<HclListItemDescription>

String value specifying the port that the ALB health check should probe. By default, this will be set to the traffic port (the NodePort or port where the service receives traffic). This can also be set to a Kubernetes named port, or direct integer value. See https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.3/guide/ingress/annotations/#healthcheck-port for more information.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;traffic-port&quot;"/>
</HclListItem>

<HclListItem name="alb_health_check_protocol" requirement="optional" type="string">
<HclListItemDescription>

Protocol (HTTP or HTTPS) that the ALB health check should use to connect to the application container.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;HTTP&quot;"/>
</HclListItem>

<HclListItem name="alb_health_check_success_codes" requirement="optional" type="string">
<HclListItemDescription>

The HTTP status code that should be expected when doing health checks against the specified health check path. Accepts a single value (200), multiple values (200,201), or a range of values (200-300).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;200&quot;"/>
</HclListItem>

<HclListItem name="alb_health_check_timeout" requirement="optional" type="number">
<HclListItemDescription>

The timeout, in seconds, during which no response from a target means a failed health check.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="10"/>
</HclListItem>

<HclListItem name="canary_image" requirement="optional" type="object(…)">
<HclListItemDescription>

The Docker image to use for the canary. Required if desired_number_of_canary_pods is greater than 0.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # Repository of the docker image (e.g. gruntwork/frontend-service)
    repository = string
    # The tag of the docker image to deploy.
    tag = string
    # The image pull policy. Can be one of IfNotPresent, Always, or Never.
    pull_policy = string
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cleanup_on_fail" requirement="optional" type="bool">
<HclListItemDescription>

Allow deletion of new resources created in this upgrade when upgrade fails.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="configmaps_as_env_vars" requirement="optional" type="map(map(…))">
<HclListItemDescription>

Kubernetes ConfigMaps to be injected into the container. Each entry in the map represents a ConfigMap to be injected, with the key representing the name of the ConfigMap. The value is also a map, with each entry corresponding to an entry in the ConfigMap, with the key corresponding to the ConfigMap entry key and the value corresponding to the environment variable name.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(map(string))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl

   Example: This will inject the foo key of the ConfigMap myconfig as the environment variable MY_CONFIG.
   {
     myconfig = {
       foo = "MY_CONFIG"
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="configmaps_as_volumes" requirement="optional" type="map(any)">
<HclListItemDescription>

Kubernetes ConfigMaps to be injected into the container as volume mounts. Each entry in the map represents a ConfigMap to be mounted, with the key representing the name of the ConfigMap and the value as a map containing required mountPath (file path on the container to mount the ConfigMap to) and optional subPath (sub-path inside the referenced volume).

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl

   Example: This will mount the ConfigMap myconfig to the path /etc/myconfig
   {
     myconfig = {
       mount_path = "/etc/myconfig"
     }
   }
   Example: This will mount the ConfigMap myconfig to the path /etc/nginx/nginx.conf
   {
     myconfig = {
       mount_path = "/etc/nginx/nginx.conf"
       sub_path = "nginx.conf"
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="container_protocol" requirement="optional" type="string">
<HclListItemDescription>

The protocol on which this service's Docker container accepts traffic. Must be one of the supported protocols: https://kubernetes.io/docs/concepts/services-networking/service/#protocol-support.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;TCP&quot;"/>
</HclListItem>

<HclListItem name="custom_resources" requirement="optional" type="map(string)">
<HclListItemDescription>

The map that lets you define Kubernetes resources you want installed and configured as part of the chart.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl

   Example: the following example creates a custom ConfigMap from a string and a Secret from a file.
   {
     custom_configmap = <<EOF
   apiVersion: v1
   kind: ConfigMap
   metadata:
     name: example
   stringData:
     key: value
   EOF
     custom_secret = file("${path.module}/secret.yaml")
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="desired_number_of_canary_pods" requirement="optional" type="number">
<HclListItemDescription>

The number of canary Pods to run on the Kubernetes cluster for this service. If greater than 0, you must provide <a href="#canary_image"><code>canary_image</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="domain_name" requirement="optional" type="string">
<HclListItemDescription>

The domain name for the DNS A record to bind to the Ingress resource for this service (e.g. service.foo.com). Depending on your external-dns configuration, this will also create the DNS record in the configured DNS service (e.g., Route53).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="domain_propagation_ttl" requirement="optional" type="number">
<HclListItemDescription>

The TTL value of the DNS A record that is bound to the Ingress resource. Only used if <a href="#domain_name"><code>domain_name</code></a> is set and external-dns is deployed.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="eks_iam_role_for_service_accounts_config" requirement="optional" type="object(…)">
<HclListItemDescription>

Configuration for using the IAM role with Service Accounts feature to provide permissions to the applications. This expects a map with two properties: `openid_connect_provider_arn` and `openid_connect_provider_url`. The `openid_connect_provider_arn` is the ARN of the OpenID Connect Provider for EKS to retrieve IAM credentials, while `openid_connect_provider_url` is the URL. Leave as an empty string if you do not wish to use IAM role with Service Accounts.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    openid_connect_provider_arn = string
    openid_connect_provider_url = string
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
{
  openid_connect_provider_arn = "",
  openid_connect_provider_url = ""
}
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="enable_liveness_probe" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to enable liveness probe. Liveness checks indicate whether or not the container is alive. When these checks fail, the cluster will automatically rotate the Pod.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_readiness_probe" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to enable readiness probe. Readiness checks indicate whether or not the container can accept traffic. When these checks fail, the Pods are automatically removed from the Service (and added back in when they pass).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="env_vars" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of environment variable name to environment variable value that should be made available to the Docker container.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="expose_type" requirement="optional" type="string">
<HclListItemDescription>

How the service will be exposed in the cluster. Must be one of `external` (accessible over the public Internet), `internal` (only accessible from within the same VPC as the cluster), `cluster-internal` (only accessible within the Kubernetes network), `none` (deploys as a headless service with no service IP).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;cluster-internal&quot;"/>
</HclListItem>

<HclListItem name="force_destroy_ingress_access_logs" requirement="optional" type="bool">
<HclListItemDescription>

A boolean that indicates whether the access logs bucket should be destroyed, even if there are files in it, when you run Terraform destroy. Unless you are using this bucket only for test purposes, you'll want to leave this variable set to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="helm_chart_version" requirement="optional" type="string">
<HclListItemDescription>

The version of the k8s-service helm chart to deploy.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;v0.2.18&quot;"/>
</HclListItem>

<HclListItem name="horizontal_pod_autoscaler" requirement="optional" type="object(…)">
<HclListItemDescription>

Configure the Horizontal Pod Autoscaler (HPA) information for the associated Deployment. HPA is disabled when this variable is set to null. Note that to use an HPA, you must have a corresponding service deployed to your cluster that exports the metrics (e.g., metrics-server https://github.com/kubernetes-sigs/metrics-server).

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # The minimum amount of replicas allowed
    min_replicas = number
    # The maximum amount of replicas allowed
    max_replicas = number
    # The target average CPU utilization (as a percentage) to be used with the metrics. E.g., setting this to 60 means
    # that the HPA controller will keep the average utilization of the CPU in Pods in the scaling target at 60%.
    avg_cpu_utilization = number
    # The target average Memory utilization (as a percentage) to be used with the metrics. Works the same as
    # avg_cpu_utilization.
    avg_mem_utilization = number
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="iam_policy" requirement="optional" type="map(object(…))">
<HclListItemDescription>

An object defining the policy to attach to `iam_role_name` if the IAM role is going to be created. Accepts a map of objects, where the map keys are sids for IAM policy statements, and the object fields are the resources, actions, and the effect ('Allow' or 'Deny') of the statement. Ignored if `iam_role_arn` is provided. Leave as null if you do not wish to use IAM role with Service Accounts.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    resources = list(string)
    actions   = list(string)
    effect    = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   iam_policy = {
     S3Access = {
       actions = ["s3:*"]
       resources = ["arn:aws:s3:::mybucket"]
       effect = "Allow"
     },
     SecretsManagerAccess = {
       actions = ["secretsmanager:GetSecretValue"],
       resources = ["arn:aws:secretsmanager:us-east-1:0123456789012:secret:mysecert"]
       effect = "Allow"
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="iam_role_exists" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not the IAM role passed in `iam_role_name` already exists. Set to true if it exists, or false if it needs to be created. Defaults to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

The name of an IAM role that will be used by the pod to access the AWS API. If `iam_role_exists` is set to false, this role will be created. Leave as an empty string if you do not wish to use IAM role with Service Accounts.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="ingress_access_logs_s3_bucket_already_exists" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if the S3 bucket to store the Ingress access logs is managed external to this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="ingress_access_logs_s3_bucket_name" requirement="optional" type="string">
<HclListItemDescription>

The name to use for the S3 bucket where the Ingress access logs will be stored. If you leave this blank, a name will be generated automatically based on <a href="#application_name"><code>application_name</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="ingress_access_logs_s3_prefix" requirement="optional" type="string">
<HclListItemDescription>

The prefix to use for ingress access logs associated with the ALB. All logs will be stored in a key with this prefix. If null, the application name will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ingress_annotations" requirement="optional" type="map(string)">
<HclListItemDescription>

A list of custom ingress annotations, such as health checks and TLS certificates, to add to the Helm chart. See: https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/guide/ingress/annotations/

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   {
     "alb.ingress.kubernetes.io/shield-advanced-protection" : "true"
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="ingress_backend_protocol" requirement="optional" type="string">
<HclListItemDescription>

The protocol used by the Ingress ALB resource to communicate with the Service. Must be one of HTTP or HTTPS.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;HTTP&quot;"/>
</HclListItem>

<HclListItem name="ingress_configure_ssl_redirect" requirement="optional" type="bool">
<HclListItemDescription>

When true, HTTP requests will automatically be redirected to use SSL (HTTPS). Used only when expose_type is either external or internal.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="ingress_group" requirement="optional" type="object(…)">
<HclListItemDescription>

Assign the ingress resource to an IngressGroup. All Ingress rules of the group will be collapsed to a single ALB. The rules will be collapsed in priority order, with lower numbers being evaluated first.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # Ingress group to assign to.
    name = string
    # The priority of the rules in this Ingress. Smaller numbers have higher priority.
    priority = number
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ingress_listener_protocol_ports" requirement="optional" type="list(object(…))">
<HclListItemDescription>

A list of maps of protocols and ports that the ALB should listen on.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    protocol = string
    port     = number
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
[
  {
    port = 80,
    protocol = "HTTP"
  },
  {
    port = 443,
    protocol = "HTTPS"
  }
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="ingress_path" requirement="optional" type="string">
<HclListItemDescription>

Path prefix that should be matched to route to the service. For Kubernetes Versions &lt;1.19, Use /* to match all paths. For Kubernetes Versions >=1.19, use / with ingress_path_type set to Prefix to match all paths.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;/&quot;"/>
</HclListItem>

<HclListItem name="ingress_path_type" requirement="optional" type="string">
<HclListItemDescription>

The path type to use for the ingress rule. Refer to https://kubernetes.io/docs/concepts/services-networking/ingress/#path-types for more information.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;Prefix&quot;"/>
</HclListItem>

<HclListItem name="ingress_ssl_redirect_rule_already_exists" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if the Ingress SSL redirect rule is managed externally. This is useful when configuring Ingress grouping and you only want one service to be managing the SSL redirect rules. Only used if ingress_configure_ssl_redirect is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="ingress_ssl_redirect_rule_requires_path_type" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not the redirect rule requires setting path type. Set to true when deploying to Kubernetes clusters with version >=1.19. Only used if ingress_configure_ssl_redirect is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="ingress_target_type" requirement="optional" type="string">
<HclListItemDescription>

Controls how the ALB routes traffic to the Pods. Supports 'instance' mode (route traffic to NodePort and load balance across all worker nodes, relying on Kubernetes Service networking to route to the pods), or 'ip' mode (route traffic directly to the pod IP - only works with AWS VPC CNI). Must be set to 'ip' if using Fargate. Only used if expose_type is not cluster-internal.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;instance&quot;"/>
</HclListItem>

<HclListItem name="liveness_probe_grace_period_seconds" requirement="optional" type="number">
<HclListItemDescription>

Seconds to wait after Pod creation before liveness probe has any effect. Any failures during this period are ignored.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="15"/>
</HclListItem>

<HclListItem name="liveness_probe_interval_seconds" requirement="optional" type="number">
<HclListItemDescription>

The approximate amount of time, in seconds, between liveness checks of an individual Target.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="liveness_probe_path" requirement="optional" type="string">
<HclListItemDescription>

URL path for the endpoint that the liveness probe should ping.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;/&quot;"/>
</HclListItem>

<HclListItem name="liveness_probe_port" requirement="optional" type="number">
<HclListItemDescription>

Port that the liveness probe should use to connect to the application container.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="80"/>
</HclListItem>

<HclListItem name="liveness_probe_protocol" requirement="optional" type="string">
<HclListItemDescription>

Protocol (HTTP or HTTPS) that the liveness probe should use to connect to the application container.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;HTTP&quot;"/>
</HclListItem>

<HclListItem name="min_number_of_pods_available" requirement="optional" type="number">
<HclListItemDescription>

The minimum number of pods that should be available at any given point in time. This is used to configure a PodDisruptionBudget for the service, allowing you to achieve a graceful rollout. See https://blog.gruntwork.io/avoiding-outages-in-your-kubernetes-cluster-using-poddisruptionbudgets-ef6a4baa5085 for an introduction to PodDisruptionBudgets.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="num_days_after_which_archive_ingress_log_data" requirement="optional" type="number">
<HclListItemDescription>

After this number of days, Ingress log files should be transitioned from S3 to Glacier. Set to 0 to never archive logs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="num_days_after_which_delete_ingress_log_data" requirement="optional" type="number">
<HclListItemDescription>

After this number of days, Ingress log files should be deleted from S3. Set to 0 to never delete logs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="override_chart_inputs" requirement="optional" type="any">
<HclListItemDescription>

Override any computed chart inputs with this map. This map is shallow merged to the computed chart inputs prior to passing on to the Helm Release. This is provided as a workaround while the terraform module does not support a particular input value that is exposed in the underlying chart. Please always file a GitHub issue to request exposing additional underlying input values prior to using this variable.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Ideally we would define a concrete type here, but since the input value spec for the chart has dynamic optional
   values, we can't use a concrete object type for Terraform. Also, setting a type spec here will defeat the purpose of
   the escape hatch since it requires defining new input values here before users can use it.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="readiness_probe_grace_period_seconds" requirement="optional" type="number">
<HclListItemDescription>

Seconds to wait after Pod creation before liveness probe has any effect. Any failures during this period are ignored.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="15"/>
</HclListItem>

<HclListItem name="readiness_probe_interval_seconds" requirement="optional" type="number">
<HclListItemDescription>

The approximate amount of time, in seconds, between liveness checks of an individual Target.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="readiness_probe_path" requirement="optional" type="string">
<HclListItemDescription>

URL path for the endpoint that the readiness probe should ping.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;/&quot;"/>
</HclListItem>

<HclListItem name="readiness_probe_port" requirement="optional" type="number">
<HclListItemDescription>

Port that the readiness probe should use to connect to the application container.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="80"/>
</HclListItem>

<HclListItem name="readiness_probe_protocol" requirement="optional" type="string">
<HclListItemDescription>

Protocol (HTTP or HTTPS) that the readiness probe should use to connect to the application container.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;HTTP&quot;"/>
</HclListItem>

<HclListItem name="scratch_paths" requirement="optional" type="map(string)">
<HclListItemDescription>

Paths that should be allocated as tmpfs volumes in the Deployment container. Each entry in the map is a key value pair where the key is an arbitrary name to bind to the volume, and the value is the path in the container to mount the tmpfs volume.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl

   Example: This will mount the tmpfs volume "foo" to the path "/mnt/scratch"
   {
     foo = "/mnt/scratch"
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="secrets_as_env_vars" requirement="optional" type="map(map(…))">
<HclListItemDescription>

Kubernetes Secrets to be injected into the container. Each entry in the map represents a Secret to be injected, with the key representing the name of the Secret. The value is also a map, with each entry corresponding to an entry in the Secret, with the key corresponding to the Secret entry key and the value corresponding to the environment variable name.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(map(string))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl

   Example: This will inject the foo key of the Secret mysecret as the environment variable MY_SECRET.
   {
     mysecret = {
       foo = "MY_SECRET"
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="secrets_as_volumes" requirement="optional" type="map(any)">
<HclListItemDescription>

Kubernetes Secrets to be injected into the container as volume mounts. Each entry in the map represents a Secret to be mounted, with the key representing the name of the Secret and the value as a map containing required mountPath (file path on the container to mount the Secret to) and optional subPath (sub-path inside the referenced volume).

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl

   Example: This will mount the Secret mysecret to the path /etc/mysecret
   {
     mysecret = {
       mount_path = "/etc/mysecret"
     }
   }
   Example: This will mount the Secret mysecret to the path /etc/nginx/nginx.conf
   {
     mysecret = {
       mount_path = "/etc/nginx/nginx.conf"
       sub_path = "nginx.conf"
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="service_account_exists" requirement="optional" type="bool">
<HclListItemDescription>

When true, and service_account_name is not blank, lookup and assign an existing ServiceAccount in the Namespace to the Pods.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="service_account_name" requirement="optional" type="string">
<HclListItemDescription>

The name of a service account to create for use with the Pods. This service account will be mapped to the IAM role defined in `<a href="#iam_role_name"><code>iam_role_name</code></a>` to give the pod permissions to access the AWS API. Must be unique in this namespace. Leave as an empty string if you do not wish to assign a Service Account to the Pods.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="service_port" requirement="optional" type="number">
<HclListItemDescription>

The port to expose on the Service. This is most useful when addressing the Service internally to the cluster, as it is ignored when connecting from the Ingress resource.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="80"/>
</HclListItem>

<HclListItem name="sidecar_containers" requirement="optional" type="any">
<HclListItemDescription>

Map of keys to container definitions that allow you to manage additional side car containers that should be included in the Pod. Note that the values are injected directly into the container list for the Pod Spec.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   sidecar_containers = {
     datadog = {
       image = "datadog/agent:latest"
       env = [
         {
           name = "DD_API_KEY"
           value = "ASDF-1234"
         },
         {
           name = "SD_BACKEND"
           value = "docker"
         },
       ]
     }
   }

```
</details>

</HclGeneralListItem>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Ideally we would define a concrete type here, but since the container spec for Pods have dynamic optional values, we
   can't use a concrete object type for Terraform.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="termination_grace_period_seconds" requirement="optional" type="number">
<HclListItemDescription>

Grace period in seconds that Kubernetes will wait before terminating the pod. The timeout happens in parallel to preStop hook and the SIGTERM signal, Kubernetes does not wait for preStop to finish before beginning the grace period.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="use_managed_iam_policies" requirement="optional" type="bool">
<HclListItemDescription>

When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="values_file_path" requirement="optional" type="string">
<HclListItemDescription>

A local file path where the helm chart values will be emitted. Use to debug issues with the helm chart values. Set to null to prevent creation of the file.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="wait" requirement="optional" type="bool">
<HclListItemDescription>

When true, wait until Pods are up and healthy or wait_timeout seconds before exiting terraform.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="wait_timeout" requirement="optional" type="number">
<HclListItemDescription>

Number of seconds to wait for Pods to become healthy before marking the deployment as a failure.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">



</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/k8s-service/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/k8s-service/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/k8s-service/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "92d7180f538181c50b56a5f849f10ec4"
}
##DOCS-SOURCER-END -->
