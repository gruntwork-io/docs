import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Kubernetes Service

Deploy your application containers as a Kubernetes Service and Deployment following best practices.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/k8s-service" className="link-button">View on GitHub</a>

### Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<a name="alb_acm_certificate_arns" className="snap-top"></a>

* [**`alb_acm_certificate_arns`**](#alb_acm_certificate_arns) &mdash; A list of ACM certificate ARNs to attach to the ALB. The first certificate in the list will be added as default certificate.

<a name="alb_health_check_healthy_threshold" className="snap-top"></a>

* [**`alb_health_check_healthy_threshold`**](#alb_health_check_healthy_threshold) &mdash; The number of consecutive health check successes required before considering an unhealthy target healthy.

<a name="alb_health_check_interval" className="snap-top"></a>

* [**`alb_health_check_interval`**](#alb_health_check_interval) &mdash; Interval between ALB health checks in seconds.

<a name="alb_health_check_path" className="snap-top"></a>

* [**`alb_health_check_path`**](#alb_health_check_path) &mdash; URL path for the endpoint that the ALB health check should ping. Defaults to /.

<a name="alb_health_check_port" className="snap-top"></a>

* [**`alb_health_check_port`**](#alb_health_check_port) &mdash; String value specifying the port that the ALB health check should probe. By default, this will be set to the traffic port (the NodePort or port where the service receives traffic). This can also be set to a Kubernetes named port, or direct integer value. See https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.3/guide/ingress/annotations/#healthcheck-port for more information.

<a name="alb_health_check_protocol" className="snap-top"></a>

* [**`alb_health_check_protocol`**](#alb_health_check_protocol) &mdash; Protocol (HTTP or HTTPS) that the ALB health check should use to connect to the application container.

<a name="alb_health_check_success_codes" className="snap-top"></a>

* [**`alb_health_check_success_codes`**](#alb_health_check_success_codes) &mdash; The HTTP status code that should be expected when doing health checks against the specified health check path. Accepts a single value (200), multiple values (200,201), or a range of values (200-300).

<a name="alb_health_check_timeout" className="snap-top"></a>

* [**`alb_health_check_timeout`**](#alb_health_check_timeout) &mdash; The timeout, in seconds, during which no response from a target means a failed health check.

<a name="application_name" className="snap-top"></a>

* [**`application_name`**](#application_name) &mdash; The name of the application (e.g. my-service-stage). Used for labeling Kubernetes resources.

<a name="canary_image" className="snap-top"></a>

* [**`canary_image`**](#canary_image) &mdash; The Docker image to use for the canary. Required if [`desired_number_of_canary_pods`](#desired_number_of_canary_pods) is greater than 0.

<a name="configmaps_as_env_vars" className="snap-top"></a>

* [**`configmaps_as_env_vars`**](#configmaps_as_env_vars) &mdash; Kubernetes ConfigMaps to be injected into the container. Each entry in the map represents a ConfigMap to be injected, with the key representing the name of the ConfigMap. The value is also a map, with each entry corresponding to an entry in the ConfigMap, with the key corresponding to the ConfigMap entry key and the value corresponding to the environment variable name.

<a name="configmaps_as_volumes" className="snap-top"></a>

* [**`configmaps_as_volumes`**](#configmaps_as_volumes) &mdash; Kubernetes ConfigMaps to be injected into the container as volume mounts. Each entry in the map represents a ConfigMap to be mounted, with the key representing the name of the ConfigMap and the value representing a file path on the container to mount the ConfigMap to.

<a name="container_image" className="snap-top"></a>

* [**`container_image`**](#container_image) &mdash; The Docker image to run.

<a name="container_port" className="snap-top"></a>

* [**`container_port`**](#container_port) &mdash; The port number on which this service's Docker container accepts incoming traffic.

<a name="container_protocol" className="snap-top"></a>

* [**`container_protocol`**](#container_protocol) &mdash; The protocol on which this service's Docker container accepts traffic. Must be one of the supported protocols: https://kubernetes.io/docs/concepts/services-networking/service/#protocol-support.

<a name="custom_resources" className="snap-top"></a>

* [**`custom_resources`**](#custom_resources) &mdash; The map that lets you define Kubernetes resources you want installed and configured as part of the chart.

<a name="desired_number_of_canary_pods" className="snap-top"></a>

* [**`desired_number_of_canary_pods`**](#desired_number_of_canary_pods) &mdash; The number of canary Pods to run on the Kubernetes cluster for this service. If greater than 0, you must provide [`canary_image`](#canary_image).

<a name="desired_number_of_pods" className="snap-top"></a>

* [**`desired_number_of_pods`**](#desired_number_of_pods) &mdash; The number of Pods to run on the Kubernetes cluster for this service.

<a name="domain_name" className="snap-top"></a>

* [**`domain_name`**](#domain_name) &mdash; The domain name for the DNS A record to bind to the Ingress resource for this service (e.g. service.foo.com). Depending on your external-dns configuration, this will also create the DNS record in the configured DNS service (e.g., Route53).

<a name="domain_propagation_ttl" className="snap-top"></a>

* [**`domain_propagation_ttl`**](#domain_propagation_ttl) &mdash; The TTL value of the DNS A record that is bound to the Ingress resource. Only used if [`domain_name`](#domain_name) is set and external-dns is deployed.

<a name="eks_iam_role_for_service_accounts_config" className="snap-top"></a>

* [**`eks_iam_role_for_service_accounts_config`**](#eks_iam_role_for_service_accounts_config) &mdash; Configuration for using the IAM role with Service Accounts feature to provide permissions to the applications. This expects a map with two properties: [``openid_connect_provider_arn`](#`openid_connect_provider_arn)` and [``openid_connect_provider_url`](#`openid_connect_provider_url)`. The [``openid_connect_provider_arn`](#`openid_connect_provider_arn)` is the ARN of the OpenID Connect Provider for EKS to retrieve IAM credentials, while [``openid_connect_provider_url`](#`openid_connect_provider_url)` is the URL. Leave as an empty string if you do not wish to use IAM role with Service Accounts.

<a name="enable_liveness_probe" className="snap-top"></a>

* [**`enable_liveness_probe`**](#enable_liveness_probe) &mdash; Whether or not to enable liveness probe. Liveness checks indicate whether or not the container is alive. When these checks fail, the cluster will automatically rotate the Pod.

<a name="enable_readiness_probe" className="snap-top"></a>

* [**`enable_readiness_probe`**](#enable_readiness_probe) &mdash; Whether or not to enable readiness probe. Readiness checks indicate whether or not the container can accept traffic. When these checks fail, the Pods are automatically removed from the Service (and added back in when they pass).

<a name="env_vars" className="snap-top"></a>

* [**`env_vars`**](#env_vars) &mdash; A map of environment variable name to environment variable value that should be made available to the Docker container.

<a name="expose_type" className="snap-top"></a>

* [**`expose_type`**](#expose_type) &mdash; How the service will be exposed in the cluster. Must be one of `external` (accessible over the public Internet), `internal` (only accessible from within the same VPC as the cluster), `cluster-internal` (only accessible within the Kubernetes network).

<a name="force_destroy_ingress_access_logs" className="snap-top"></a>

* [**`force_destroy_ingress_access_logs`**](#force_destroy_ingress_access_logs) &mdash; A boolean that indicates whether the access logs bucket should be destroyed, even if there are files in it, when you run Terraform destroy. Unless you are using this bucket only for test purposes, you'll want to leave this variable set to false.

<a name="helm_chart_version" className="snap-top"></a>

* [**`helm_chart_version`**](#helm_chart_version) &mdash; The version of the k8s-service helm chart to deploy.

<a name="horizontal_pod_autoscaler" className="snap-top"></a>

* [**`horizontal_pod_autoscaler`**](#horizontal_pod_autoscaler) &mdash; Configure the Horizontal Pod Autoscaler information for the associated Deployment. HPA is disabled when this variable is set to null.

<a name="iam_policy" className="snap-top"></a>

* [**`iam_policy`**](#iam_policy) &mdash; An object defining the policy to attach to [``iam_role_name`](#`iam_role_name)` if the IAM role is going to be created. Accepts a map of objects, where the map keys are sids for IAM policy statements, and the object fields are the resources, actions, and the effect ("Allow" or "Deny") of the statement. Ignored if [``iam_role_arn`](#`iam_role_arn)` is provided. Leave as null if you do not wish to use IAM role with Service Accounts.

<a name="iam_role_exists" className="snap-top"></a>

* [**`iam_role_exists`**](#iam_role_exists) &mdash; Whether or not the IAM role passed in [``iam_role_name`](#`iam_role_name)` already exists. Set to true if it exists, or false if it needs to be created. Defaults to false.

<a name="iam_role_name" className="snap-top"></a>

* [**`iam_role_name`**](#iam_role_name) &mdash; The name of an IAM role that will be used by the pod to access the AWS API. If [``iam_role_exists`](#`iam_role_exists)` is set to false, this role will be created. Leave as an empty string if you do not wish to use IAM role with Service Accounts.

<a name="ingress_access_logs_s3_bucket_already_exists" className="snap-top"></a>

* [**`ingress_access_logs_s3_bucket_already_exists`**](#ingress_access_logs_s3_bucket_already_exists) &mdash; Set to true if the S3 bucket to store the Ingress access logs is managed external to this module.

<a name="ingress_access_logs_s3_bucket_name" className="snap-top"></a>

* [**`ingress_access_logs_s3_bucket_name`**](#ingress_access_logs_s3_bucket_name) &mdash; The name to use for the S3 bucket where the Ingress access logs will be stored. If you leave this blank, a name will be generated automatically based on [`application_name`](#application_name).

<a name="ingress_access_logs_s3_prefix" className="snap-top"></a>

* [**`ingress_access_logs_s3_prefix`**](#ingress_access_logs_s3_prefix) &mdash; The prefix to use for ingress access logs associated with the ALB. All logs will be stored in a key with this prefix. If null, the application name will be used.

<a name="ingress_annotations" className="snap-top"></a>

* [**`ingress_annotations`**](#ingress_annotations) &mdash; A list of custom ingress annotations, such as health checks and TLS certificates, to add to the Helm chart. See: https://kubernetes-sigs.github.io/aws-alb-ingress-controller/guide/ingress/annotation/

<a name="ingress_backend_protocol" className="snap-top"></a>

* [**`ingress_backend_protocol`**](#ingress_backend_protocol) &mdash; The protocol used by the Ingress ALB resource to communicate with the Service. Must be one of HTTP or HTTPS.

<a name="ingress_configure_ssl_redirect" className="snap-top"></a>

* [**`ingress_configure_ssl_redirect`**](#ingress_configure_ssl_redirect) &mdash; When true, HTTP requests will automatically be redirected to use SSL (HTTPS). Used only when [`expose_type`](#expose_type) is either external or internal.

<a name="ingress_group" className="snap-top"></a>

* [**`ingress_group`**](#ingress_group) &mdash; Assign the ingress resource to an IngressGroup. All Ingress rules of the group will be collapsed to a single ALB. The rules will be collapsed in priority order, with lower numbers being evaluated first.

<a name="ingress_listener_protocol_ports" className="snap-top"></a>

* [**`ingress_listener_protocol_ports`**](#ingress_listener_protocol_ports) &mdash; A list of maps of protocols and ports that the ALB should listen on.

<a name="ingress_path" className="snap-top"></a>

* [**`ingress_path`**](#ingress_path) &mdash; Path prefix that should be matched to route to the service. For Kubernetes Versions &lt;1.19, Use /* to match all paths. For Kubernetes Versions >=1.19, use / with [`ingress_path_type`](#ingress_path_type) set to Prefix to match all paths.

<a name="ingress_path_type" className="snap-top"></a>

* [**`ingress_path_type`**](#ingress_path_type) &mdash; The path type to use for the ingress rule. Refer to https://kubernetes.io/docs/concepts/services-networking/ingress/#path-types for more information.

<a name="ingress_ssl_redirect_rule_already_exists" className="snap-top"></a>

* [**`ingress_ssl_redirect_rule_already_exists`**](#ingress_ssl_redirect_rule_already_exists) &mdash; Set to true if the Ingress SSL redirect rule is managed externally. This is useful when configuring Ingress grouping and you only want one service to be managing the SSL redirect rules. Only used if [`ingress_configure_ssl_redirect`](#ingress_configure_ssl_redirect) is true.

<a name="ingress_ssl_redirect_rule_requires_path_type" className="snap-top"></a>

* [**`ingress_ssl_redirect_rule_requires_path_type`**](#ingress_ssl_redirect_rule_requires_path_type) &mdash; Whether or not the redirect rule requires setting path type. Set to true when deploying to Kubernetes clusters with version >=1.19. Only used if [`ingress_configure_ssl_redirect`](#ingress_configure_ssl_redirect) is true.

<a name="ingress_target_type" className="snap-top"></a>

* [**`ingress_target_type`**](#ingress_target_type) &mdash; Controls how the ALB routes traffic to the Pods. Supports 'instance' mode (route traffic to NodePort and load balance across all worker nodes, relying on Kubernetes Service networking to route to the pods), or 'ip' mode (route traffic directly to the pod IP - only works with AWS VPC CNI). Must be set to 'ip' if using Fargate. Only used if [`expose_type`](#expose_type) is not cluster-internal.

<a name="liveness_probe_grace_period_seconds" className="snap-top"></a>

* [**`liveness_probe_grace_period_seconds`**](#liveness_probe_grace_period_seconds) &mdash; Seconds to wait after Pod creation before liveness probe has any effect. Any failures during this period are ignored.

<a name="liveness_probe_interval_seconds" className="snap-top"></a>

* [**`liveness_probe_interval_seconds`**](#liveness_probe_interval_seconds) &mdash; The approximate amount of time, in seconds, between liveness checks of an individual Target.

<a name="liveness_probe_path" className="snap-top"></a>

* [**`liveness_probe_path`**](#liveness_probe_path) &mdash; URL path for the endpoint that the liveness probe should ping.

<a name="liveness_probe_port" className="snap-top"></a>

* [**`liveness_probe_port`**](#liveness_probe_port) &mdash; Port that the liveness probe should use to connect to the application container.

<a name="liveness_probe_protocol" className="snap-top"></a>

* [**`liveness_probe_protocol`**](#liveness_probe_protocol) &mdash; Protocol (HTTP or HTTPS) that the liveness probe should use to connect to the application container.

<a name="min_number_of_pods_available" className="snap-top"></a>

* [**`min_number_of_pods_available`**](#min_number_of_pods_available) &mdash; The minimum number of pods that should be available at any given point in time. This is used to configure a PodDisruptionBudget for the service, allowing you to achieve a graceful rollout. See https://blog.gruntwork.io/avoiding-outages-in-your-kubernetes-cluster-using-poddisruptionbudgets-ef6a4baa5085 for an introduction to PodDisruptionBudgets.

<a name="namespace" className="snap-top"></a>

* [**`namespace`**](#namespace) &mdash; The Kubernetes Namespace to deploy the application into.

<a name="num_days_after_which_archive_ingress_log_data" className="snap-top"></a>

* [**`num_days_after_which_archive_ingress_log_data`**](#num_days_after_which_archive_ingress_log_data) &mdash; After this number of days, Ingress log files should be transitioned from S3 to Glacier. Set to 0 to never archive logs.

<a name="num_days_after_which_delete_ingress_log_data" className="snap-top"></a>

* [**`num_days_after_which_delete_ingress_log_data`**](#num_days_after_which_delete_ingress_log_data) &mdash; After this number of days, Ingress log files should be deleted from S3. Set to 0 to never delete logs.

<a name="override_chart_inputs" className="snap-top"></a>

* [**`override_chart_inputs`**](#override_chart_inputs) &mdash; Override any computed chart inputs with this map. This map is shallow merged to the computed chart inputs prior to passing on to the Helm Release. This is provided as a workaround while the terraform module does not support a particular input value that is exposed in the underlying chart. Please always file a GitHub issue to request exposing additional underlying input values prior to using this variable.

<a name="readiness_probe_grace_period_seconds" className="snap-top"></a>

* [**`readiness_probe_grace_period_seconds`**](#readiness_probe_grace_period_seconds) &mdash; Seconds to wait after Pod creation before liveness probe has any effect. Any failures during this period are ignored.

<a name="readiness_probe_interval_seconds" className="snap-top"></a>

* [**`readiness_probe_interval_seconds`**](#readiness_probe_interval_seconds) &mdash; The approximate amount of time, in seconds, between liveness checks of an individual Target.

<a name="readiness_probe_path" className="snap-top"></a>

* [**`readiness_probe_path`**](#readiness_probe_path) &mdash; URL path for the endpoint that the readiness probe should ping.

<a name="readiness_probe_port" className="snap-top"></a>

* [**`readiness_probe_port`**](#readiness_probe_port) &mdash; Port that the readiness probe should use to connect to the application container.

<a name="readiness_probe_protocol" className="snap-top"></a>

* [**`readiness_probe_protocol`**](#readiness_probe_protocol) &mdash; Protocol (HTTP or HTTPS) that the readiness probe should use to connect to the application container.

<a name="scratch_paths" className="snap-top"></a>

* [**`scratch_paths`**](#scratch_paths) &mdash; Paths that should be allocated as tmpfs volumes in the Deployment container. Each entry in the map is a key value pair where the key is an arbitrary name to bind to the volume, and the value is the path in the container to mount the tmpfs volume.

<a name="secrets_as_env_vars" className="snap-top"></a>

* [**`secrets_as_env_vars`**](#secrets_as_env_vars) &mdash; Kubernetes Secrets to be injected into the container. Each entry in the map represents a Secret to be injected, with the key representing the name of the Secret. The value is also a map, with each entry corresponding to an entry in the Secret, with the key corresponding to the Secret entry key and the value corresponding to the environment variable name.

<a name="secrets_as_volumes" className="snap-top"></a>

* [**`secrets_as_volumes`**](#secrets_as_volumes) &mdash; Kubernetes Secrets to be injected into the container as volume mounts. Each entry in the map represents a Secret to be mounted, with the key representing the name of the Secret and the value representing a file path on the container to mount the Secret to.

<a name="service_account_exists" className="snap-top"></a>

* [**`service_account_exists`**](#service_account_exists) &mdash; When true, and [`service_account_name`](#service_account_name) is not blank, lookup and assign an existing ServiceAccount in the Namespace to the Pods.

<a name="service_account_name" className="snap-top"></a>

* [**`service_account_name`**](#service_account_name) &mdash; The name of a service account to create for use with the Pods. This service account will be mapped to the IAM role defined in [``var.iam_role_name`](#`var.iam_role_name)` to give the pod permissions to access the AWS API. Must be unique in this namespace. Leave as an empty string if you do not wish to assign a Service Account to the Pods.

<a name="service_port" className="snap-top"></a>

* [**`service_port`**](#service_port) &mdash; The port to expose on the Service. This is most useful when addressing the Service internally to the cluster, as it is ignored when connecting from the Ingress resource.

<a name="sidecar_containers" className="snap-top"></a>

* [**`sidecar_containers`**](#sidecar_containers) &mdash; Map of keys to container definitions that allow you to manage additional side car containers that should be included in the Pod. Note that the values are injected directly into the container list for the Pod Spec.

<a name="termination_grace_period_seconds" className="snap-top"></a>

* [**`termination_grace_period_seconds`**](#termination_grace_period_seconds) &mdash; Grace period in seconds that Kubernetes will wait before terminating the pod. The timeout happens in parallel to preStop hook and the SIGTERM signal, Kubernetes does not wait for preStop to finish before beginning the grace period.

<a name="values_file_path" className="snap-top"></a>

* [**`values_file_path`**](#values_file_path) &mdash; A local file path where the helm chart values will be emitted. Use to debug issues with the helm chart values. Set to null to prevent creation of the file.

<a name="wait" className="snap-top"></a>

* [**`wait`**](#wait) &mdash; When true, wait until Pods are up and healthy or [`wait_timeout`](#wait_timeout) seconds before exiting terraform.

<a name="wait_timeout" className="snap-top"></a>

* [**`wait_timeout`**](#wait_timeout) &mdash; Number of seconds to wait for Pods to become healthy before marking the deployment as a failure.

</TabItem>
<TabItem value="outputs" label="Outputs">



</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"f4b1bc4a06d95b4adf0194eeaf2f60da"}
##DOCS-SOURCER-END -->
