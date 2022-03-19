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
import HclListItem from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.85.0" lastModifiedVersion="0.85.0"/>

# Kubernetes Service


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/k8s-service" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=services%2Fk8s-service" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

## Overview

This service contains [Terraform](https://www.terraform.io) code to deploy your web application containers using
[the k8-service Gruntwork Helm Chart](https://github.com/gruntwork-io/helm-kubernetes-services/) on to
[Kubernetes](https://kubernetes.io/) following best practices.

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

*   [modules](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.
*   [examples](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples): This folder contains working examples of how to use the submodules.
*   [test](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<br/>

### Required

<HclListItem name="application_name" requirement="required" description="The name of the application (e.g. my-service-stage). Used for labeling Kubernetes resources." type="string"/>

<HclListItem name="container_image" requirement="required" description="The Docker image to run." type="object" typeDetails="object({
    # Repository of the docker image (e.g. gruntwork/frontend-service)
    repository = string
    # The tag of the docker image to deploy.
    tag = string
    # The image pull policy. Can be one of IfNotPresent, Always, or Never.
    pull_policy = string
  })"/>

<HclListItem name="container_port" requirement="required" description="The port number on which this service's Docker container accepts incoming traffic." type="number"/>

<HclListItem name="desired_number_of_pods" requirement="required" description="The number of Pods to run on the Kubernetes cluster for this service." type="number"/>

<HclListItem name="namespace" requirement="required" description="The Kubernetes Namespace to deploy the application into." type="string"/>


<br/>


### Optional

<HclListItem name="alb_acm_certificate_arns" requirement="optional" description="A list of ACM certificate ARNs to attach to the ALB. The first certificate in the list will be added as default certificate." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="alb_health_check_healthy_threshold" requirement="optional" description="The number of consecutive health check successes required before considering an unhealthy target healthy." type="number" defaultValue="2"/>

<HclListItem name="alb_health_check_interval" requirement="optional" description="Interval between ALB health checks in seconds." type="number" defaultValue="30"/>

<HclListItem name="alb_health_check_path" requirement="optional" description="URL path for the endpoint that the ALB health check should ping. Defaults to /." type="string" defaultValue="/"/>

<HclListItem name="alb_health_check_port" requirement="optional" description="String value specifying the port that the ALB health check should probe. By default, this will be set to the traffic port (the NodePort or port where the service receives traffic). This can also be set to a Kubernetes named port, or direct integer value. See https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.3/guide/ingress/annotations/#healthcheck-port for more information." type="string" defaultValue="traffic-port"/>

<HclListItem name="alb_health_check_protocol" requirement="optional" description="Protocol (HTTP or HTTPS) that the ALB health check should use to connect to the application container." type="string" defaultValue="HTTP"/>

<HclListItem name="alb_health_check_success_codes" requirement="optional" description="The HTTP status code that should be expected when doing health checks against the specified health check path. Accepts a single value (200), multiple values (200,201), or a range of values (200-300)." type="string" defaultValue="200"/>

<HclListItem name="alb_health_check_timeout" requirement="optional" description="The timeout, in seconds, during which no response from a target means a failed health check." type="number" defaultValue="10"/>

<HclListItem name="canary_image" requirement="optional" description="The Docker image to use for the canary. Required if <a href=#desired_number_of_canary_pods><code>desired_number_of_canary_pods</code></a> is greater than 0." type="object" typeDetails="object({
    # Repository of the docker image (e.g. gruntwork/frontend-service)
    repository = string
    # The tag of the docker image to deploy.
    tag = string
    # The image pull policy. Can be one of IfNotPresent, Always, or Never.
    pull_policy = string
  })" defaultValue="null"/>

<HclListItem name="configmaps_as_env_vars" requirement="optional" description="Kubernetes ConfigMaps to be injected into the container. Each entry in the map represents a ConfigMap to be injected, with the key representing the name of the ConfigMap. The value is also a map, with each entry corresponding to an entry in the ConfigMap, with the key corresponding to the ConfigMap entry key and the value corresponding to the environment variable name." type="map" typeDetails="map(map(string))" defaultValue="{}"/>

<HclListItem name="configmaps_as_volumes" requirement="optional" description="Kubernetes ConfigMaps to be injected into the container as volume mounts. Each entry in the map represents a ConfigMap to be mounted, with the key representing the name of the ConfigMap and the value representing a file path on the container to mount the ConfigMap to." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="container_protocol" requirement="optional" description="The protocol on which this service's Docker container accepts traffic. Must be one of the supported protocols: https://kubernetes.io/docs/concepts/services-networking/service/#protocol-support." type="string" defaultValue="TCP"/>

<HclListItem name="custom_resources" requirement="optional" description="The map that lets you define Kubernetes resources you want installed and configured as part of the chart." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="desired_number_of_canary_pods" requirement="optional" description="The number of canary Pods to run on the Kubernetes cluster for this service. If greater than 0, you must provide <a href=#canary_image><code>canary_image</code></a>." type="number" defaultValue="0"/>

<HclListItem name="domain_name" requirement="optional" description="The domain name for the DNS A record to bind to the Ingress resource for this service (e.g. service.foo.com). Depending on your external-dns configuration, this will also create the DNS record in the configured DNS service (e.g., Route53)." type="string" defaultValue="null"/>

<HclListItem name="domain_propagation_ttl" requirement="optional" description="The TTL value of the DNS A record that is bound to the Ingress resource. Only used if <a href=#domain_name><code>domain_name</code></a> is set and external-dns is deployed." type="number" defaultValue="null"/>

<HclListItem name="eks_iam_role_for_service_accounts_config" requirement="optional" description="Configuration for using the IAM role with Service Accounts feature to provide permissions to the applications. This expects a map with two properties: `<a href=#openid_connect_provider_arn><code>openid_connect_provider_arn</code></a>` and `<a href=#openid_connect_provider_url><code>openid_connect_provider_url</code></a>`. The `<a href=#openid_connect_provider_arn><code>openid_connect_provider_arn</code></a>` is the ARN of the OpenID Connect Provider for EKS to retrieve IAM credentials, while `<a href=#openid_connect_provider_url><code>openid_connect_provider_url</code></a>` is the URL. Leave as an empty string if you do not wish to use IAM role with Service Accounts." type="object" typeDetails="object({
    openid_connect_provider_arn = string
    openid_connect_provider_url = string
  })" defaultValue="{'openid_connect_provider_arn':'','openid_connect_provider_url':''}"/>

<HclListItem name="enable_liveness_probe" requirement="optional" description="Whether or not to enable liveness probe. Liveness checks indicate whether or not the container is alive. When these checks fail, the cluster will automatically rotate the Pod." type="bool" defaultValue="false"/>

<HclListItem name="enable_readiness_probe" requirement="optional" description="Whether or not to enable readiness probe. Readiness checks indicate whether or not the container can accept traffic. When these checks fail, the Pods are automatically removed from the Service (and added back in when they pass)." type="bool" defaultValue="false"/>

<HclListItem name="env_vars" requirement="optional" description="A map of environment variable name to environment variable value that should be made available to the Docker container." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="expose_type" requirement="optional" description="How the service will be exposed in the cluster. Must be one of `external` (accessible over the public Internet), `internal` (only accessible from within the same VPC as the cluster), `cluster-internal` (only accessible within the Kubernetes network)." type="string" defaultValue="cluster-internal"/>

<HclListItem name="force_destroy_ingress_access_logs" requirement="optional" description="A boolean that indicates whether the access logs bucket should be destroyed, even if there are files in it, when you run Terraform destroy. Unless you are using this bucket only for test purposes, you'll want to leave this variable set to false." type="bool" defaultValue="false"/>

<HclListItem name="helm_chart_version" requirement="optional" description="The version of the k8s-service helm chart to deploy." type="string" defaultValue="v0.2.12"/>

<HclListItem name="horizontal_pod_autoscaler" requirement="optional" description="Configure the Horizontal Pod Autoscaler information for the associated Deployment. HPA is disabled when this variable is set to null." type="object" typeDetails="object({
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
  })" defaultValue="null"/>

<HclListItem name="iam_policy" requirement="optional" description="An object defining the policy to attach to `<a href=#iam_role_name><code>iam_role_name</code></a>` if the IAM role is going to be created. Accepts a map of objects, where the map keys are sids for IAM policy statements, and the object fields are the resources, actions, and the effect ('Allow' or 'Deny') of the statement. Ignored if `<a href=#iam_role_arn><code>iam_role_arn</code></a>` is provided. Leave as null if you do not wish to use IAM role with Service Accounts." type="map" typeDetails="map(object({
    resources = list(string)
    actions   = list(string)
    effect    = string
  }))" defaultValue="null"/>

<HclListItem name="iam_role_exists" requirement="optional" description="Whether or not the IAM role passed in `<a href=#iam_role_name><code>iam_role_name</code></a>` already exists. Set to true if it exists, or false if it needs to be created. Defaults to false." type="bool" defaultValue="false"/>

<HclListItem name="iam_role_name" requirement="optional" description="The name of an IAM role that will be used by the pod to access the AWS API. If `<a href=#iam_role_exists><code>iam_role_exists</code></a>` is set to false, this role will be created. Leave as an empty string if you do not wish to use IAM role with Service Accounts." type="string" defaultValue=""/>

<HclListItem name="ingress_access_logs_s3_bucket_already_exists" requirement="optional" description="Set to true if the S3 bucket to store the Ingress access logs is managed external to this module." type="bool" defaultValue="false"/>

<HclListItem name="ingress_access_logs_s3_bucket_name" requirement="optional" description="The name to use for the S3 bucket where the Ingress access logs will be stored. If you leave this blank, a name will be generated automatically based on <a href=#application_name><code>application_name</code></a>." type="string" defaultValue=""/>

<HclListItem name="ingress_access_logs_s3_prefix" requirement="optional" description="The prefix to use for ingress access logs associated with the ALB. All logs will be stored in a key with this prefix. If null, the application name will be used." type="string" defaultValue="null"/>

<HclListItem name="ingress_annotations" requirement="optional" description="A list of custom ingress annotations, such as health checks and TLS certificates, to add to the Helm chart. See: https://kubernetes-sigs.github.io/aws-alb-ingress-controller/guide/ingress/annotation/" type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="ingress_backend_protocol" requirement="optional" description="The protocol used by the Ingress ALB resource to communicate with the Service. Must be one of HTTP or HTTPS." type="string" defaultValue="HTTP"/>

<HclListItem name="ingress_configure_ssl_redirect" requirement="optional" description="When true, HTTP requests will automatically be redirected to use SSL (HTTPS). Used only when <a href=#expose_type><code>expose_type</code></a> is either external or internal." type="bool" defaultValue="true"/>

<HclListItem name="ingress_group" requirement="optional" description="Assign the ingress resource to an IngressGroup. All Ingress rules of the group will be collapsed to a single ALB. The rules will be collapsed in priority order, with lower numbers being evaluated first." type="object" typeDetails="object({
    # Ingress group to assign to.
    name = string
    # The priority of the rules in this Ingress. Smaller numbers have higher priority.
    priority = number
  })" defaultValue="null"/>

<HclListItem name="ingress_listener_protocol_ports" requirement="optional" description="A list of maps of protocols and ports that the ALB should listen on." type="list" typeDetails="list(object({
    protocol = string
    port     = number
  }))" defaultValue="[{'port':80,'protocol':'HTTP'},{'port':443,'protocol':'HTTPS'}]"/>

<HclListItem name="ingress_path" requirement="optional" description="Path prefix that should be matched to route to the service. For Kubernetes Versions <1.19, Use /* to match all paths. For Kubernetes Versions >=1.19, use / with <a href=#ingress_path_type><code>ingress_path_type</code></a> set to Prefix to match all paths." type="string" defaultValue="/"/>

<HclListItem name="ingress_path_type" requirement="optional" description="The path type to use for the ingress rule. Refer to https://kubernetes.io/docs/concepts/services-networking/ingress/#path-types for more information." type="string" defaultValue="Prefix"/>

<HclListItem name="ingress_ssl_redirect_rule_already_exists" requirement="optional" description="Set to true if the Ingress SSL redirect rule is managed externally. This is useful when configuring Ingress grouping and you only want one service to be managing the SSL redirect rules. Only used if <a href=#ingress_configure_ssl_redirect><code>ingress_configure_ssl_redirect</code></a> is true." type="bool" defaultValue="false"/>

<HclListItem name="ingress_ssl_redirect_rule_requires_path_type" requirement="optional" description="Whether or not the redirect rule requires setting path type. Set to true when deploying to Kubernetes clusters with version >=1.19. Only used if <a href=#ingress_configure_ssl_redirect><code>ingress_configure_ssl_redirect</code></a> is true." type="bool" defaultValue="true"/>

<HclListItem name="ingress_target_type" requirement="optional" description="Controls how the ALB routes traffic to the Pods. Supports 'instance' mode (route traffic to NodePort and load balance across all worker nodes, relying on Kubernetes Service networking to route to the pods), or 'ip' mode (route traffic directly to the pod IP - only works with AWS VPC CNI). Must be set to 'ip' if using Fargate. Only used if <a href=#expose_type><code>expose_type</code></a> is not cluster-internal." type="string" defaultValue="instance"/>

<HclListItem name="liveness_probe_grace_period_seconds" requirement="optional" description="Seconds to wait after Pod creation before liveness probe has any effect. Any failures during this period are ignored." type="number" defaultValue="15"/>

<HclListItem name="liveness_probe_interval_seconds" requirement="optional" description="The approximate amount of time, in seconds, between liveness checks of an individual Target." type="number" defaultValue="30"/>

<HclListItem name="liveness_probe_path" requirement="optional" description="URL path for the endpoint that the liveness probe should ping." type="string" defaultValue="/"/>

<HclListItem name="liveness_probe_port" requirement="optional" description="Port that the liveness probe should use to connect to the application container." type="number" defaultValue="80"/>

<HclListItem name="liveness_probe_protocol" requirement="optional" description="Protocol (HTTP or HTTPS) that the liveness probe should use to connect to the application container." type="string" defaultValue="HTTP"/>

<HclListItem name="min_number_of_pods_available" requirement="optional" description="The minimum number of pods that should be available at any given point in time. This is used to configure a PodDisruptionBudget for the service, allowing you to achieve a graceful rollout. See https://blog.gruntwork.io/avoiding-outages-in-your-kubernetes-cluster-using-poddisruptionbudgets-ef6a4baa5085 for an introduction to PodDisruptionBudgets." type="number" defaultValue="0"/>

<HclListItem name="num_days_after_which_archive_ingress_log_data" requirement="optional" description="After this number of days, Ingress log files should be transitioned from S3 to Glacier. Set to 0 to never archive logs." type="number" defaultValue="0"/>

<HclListItem name="num_days_after_which_delete_ingress_log_data" requirement="optional" description="After this number of days, Ingress log files should be deleted from S3. Set to 0 to never delete logs." type="number" defaultValue="0"/>

<HclListItem name="override_chart_inputs" requirement="optional" description="Override any computed chart inputs with this map. This map is shallow merged to the computed chart inputs prior to passing on to the Helm Release. This is provided as a workaround while the terraform module does not support a particular input value that is exposed in the underlying chart. Please always file a GitHub issue to request exposing additional underlying input values prior to using this variable." type="any" defaultValue="{}"/>

<HclListItem name="readiness_probe_grace_period_seconds" requirement="optional" description="Seconds to wait after Pod creation before liveness probe has any effect. Any failures during this period are ignored." type="number" defaultValue="15"/>

<HclListItem name="readiness_probe_interval_seconds" requirement="optional" description="The approximate amount of time, in seconds, between liveness checks of an individual Target." type="number" defaultValue="30"/>

<HclListItem name="readiness_probe_path" requirement="optional" description="URL path for the endpoint that the readiness probe should ping." type="string" defaultValue="/"/>

<HclListItem name="readiness_probe_port" requirement="optional" description="Port that the readiness probe should use to connect to the application container." type="number" defaultValue="80"/>

<HclListItem name="readiness_probe_protocol" requirement="optional" description="Protocol (HTTP or HTTPS) that the readiness probe should use to connect to the application container." type="string" defaultValue="HTTP"/>

<HclListItem name="scratch_paths" requirement="optional" description="Paths that should be allocated as tmpfs volumes in the Deployment container. Each entry in the map is a key value pair where the key is an arbitrary name to bind to the volume, and the value is the path in the container to mount the tmpfs volume." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="secrets_as_env_vars" requirement="optional" description="Kubernetes Secrets to be injected into the container. Each entry in the map represents a Secret to be injected, with the key representing the name of the Secret. The value is also a map, with each entry corresponding to an entry in the Secret, with the key corresponding to the Secret entry key and the value corresponding to the environment variable name." type="map" typeDetails="map(map(string))" defaultValue="{}"/>

<HclListItem name="secrets_as_volumes" requirement="optional" description="Kubernetes Secrets to be injected into the container as volume mounts. Each entry in the map represents a Secret to be mounted, with the key representing the name of the Secret and the value representing a file path on the container to mount the Secret to." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="service_account_exists" requirement="optional" description="When true, and <a href=#service_account_name><code>service_account_name</code></a> is not blank, lookup and assign an existing ServiceAccount in the Namespace to the Pods." type="bool" defaultValue="false"/>

<HclListItem name="service_account_name" requirement="optional" description="The name of a service account to create for use with the Pods. This service account will be mapped to the IAM role defined in `<a href=#iam_role_name><code>iam_role_name</code></a>` to give the pod permissions to access the AWS API. Must be unique in this namespace. Leave as an empty string if you do not wish to assign a Service Account to the Pods." type="string" defaultValue=""/>

<HclListItem name="service_port" requirement="optional" description="The port to expose on the Service. This is most useful when addressing the Service internally to the cluster, as it is ignored when connecting from the Ingress resource." type="number" defaultValue="80"/>

<HclListItem name="sidecar_containers" requirement="optional" description="Map of keys to container definitions that allow you to manage additional side car containers that should be included in the Pod. Note that the values are injected directly into the container list for the Pod Spec." type="any" defaultValue="{}"/>

<HclListItem name="termination_grace_period_seconds" requirement="optional" description="Grace period in seconds that Kubernetes will wait before terminating the pod. The timeout happens in parallel to preStop hook and the SIGTERM signal, Kubernetes does not wait for preStop to finish before beginning the grace period." type="number" defaultValue="null"/>

<HclListItem name="use_managed_iam_policies" requirement="optional" description="When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards." type="bool" defaultValue="true"/>

<HclListItem name="values_file_path" requirement="optional" description="A local file path where the helm chart values will be emitted. Use to debug issues with the helm chart values. Set to null to prevent creation of the file." type="string" defaultValue="null"/>

<HclListItem name="wait" requirement="optional" description="When true, wait until Pods are up and healthy or <a href=#wait_timeout><code>wait_timeout</code></a> seconds before exiting terraform." type="bool" defaultValue="true"/>

<HclListItem name="wait_timeout" requirement="optional" description="Number of seconds to wait for Pods to become healthy before marking the deployment as a failure." type="number" defaultValue="300"/>

</TabItem>
<TabItem value="outputs" label="Outputs">

<br/>



</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"6be66630d9684283ad78681b526af2f8"}
##DOCS-SOURCER-END -->
