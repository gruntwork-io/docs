import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Kubernetes Service

Deploy your application containers as a Kubernetes Service and Deployment following best practices.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/k8s-service" className="link-button">View on GitHub</a>

### Reference

<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <ul>
      
    <li>
      <p>
        <a name="alb_acm_certificate_arns" href="#alb_acm_certificate_arns" className="snap-top">
          <code>alb_acm_certificate_arns</code>
        </a> - A list of ACM certificate ARNs to attach to the ALB. The first certificate in the list will be added as default certificate.
      </p>
    </li>
    <li>
      <p>
        <a name="alb_health_check_healthy_threshold" href="#alb_health_check_healthy_threshold" className="snap-top">
          <code>alb_health_check_healthy_threshold</code>
        </a> - The number of consecutive health check successes required before considering an unhealthy target healthy.
      </p>
    </li>
    <li>
      <p>
        <a name="alb_health_check_interval" href="#alb_health_check_interval" className="snap-top">
          <code>alb_health_check_interval</code>
        </a> - Interval between ALB health checks in seconds.
      </p>
    </li>
    <li>
      <p>
        <a name="alb_health_check_path" href="#alb_health_check_path" className="snap-top">
          <code>alb_health_check_path</code>
        </a> - URL path for the endpoint that the ALB health check should ping. Defaults to /.
      </p>
    </li>
    <li>
      <p>
        <a name="alb_health_check_port" href="#alb_health_check_port" className="snap-top">
          <code>alb_health_check_port</code>
        </a> - String value specifying the port that the ALB health check should probe. By default, this will be set to the traffic port.
      </p>
    </li>
    <li>
      <p>
        <a name="alb_health_check_protocol" href="#alb_health_check_protocol" className="snap-top">
          <code>alb_health_check_protocol</code>
        </a> - Protocol (HTTP or HTTPS) that the ALB health check should use to connect to the application container.
      </p>
    </li>
    <li>
      <p>
        <a name="alb_health_check_success_codes" href="#alb_health_check_success_codes" className="snap-top">
          <code>alb_health_check_success_codes</code>
        </a> - The HTTP status code that should be expected when doing health checks against the specified health check path. Accepts a single value (200), multiple values (200,201), or a range of values (200-300).
      </p>
    </li>
    <li>
      <p>
        <a name="alb_health_check_timeout" href="#alb_health_check_timeout" className="snap-top">
          <code>alb_health_check_timeout</code>
        </a> - The timeout, in seconds, during which no response from a target means a failed health check.
      </p>
    </li>
    <li>
      <p>
        <a name="application_name" href="#application_name" className="snap-top">
          <code>application_name</code>
        </a> - The name of the application (e.g. my-service-stage). Used for labeling Kubernetes resources.
      </p>
    </li>
    <li>
      <p>
        <a name="canary_image" href="#canary_image" className="snap-top">
          <code>canary_image</code>
        </a> - The Docker image to use for the canary. Required if desired_number_of_canary_pods is greater than 0.
      </p>
    </li>
    <li>
      <p>
        <a name="configmaps_as_env_vars" href="#configmaps_as_env_vars" className="snap-top">
          <code>configmaps_as_env_vars</code>
        </a> - Kubernetes ConfigMaps to be injected into the container. Each entry in the map represents a ConfigMap to be injected, with the key representing the name of the ConfigMap. The value is also a map, with each entry corresponding to an entry in the ConfigMap, with the key corresponding to the ConfigMap entry key and the value corresponding to the environment variable name.
      </p>
    </li>
    <li>
      <p>
        <a name="configmaps_as_volumes" href="#configmaps_as_volumes" className="snap-top">
          <code>configmaps_as_volumes</code>
        </a> - Kubernetes ConfigMaps to be injected into the container as volume mounts. Each entry in the map represents a ConfigMap to be mounted, with the key representing the name of the ConfigMap and the value representing a file path on the container to mount the ConfigMap to.
      </p>
    </li>
    <li>
      <p>
        <a name="container_image" href="#container_image" className="snap-top">
          <code>container_image</code>
        </a> - The Docker image to run.
      </p>
    </li>
    <li>
      <p>
        <a name="container_port" href="#container_port" className="snap-top">
          <code>container_port</code>
        </a> - The port number on which this service's Docker container accepts incoming traffic.
      </p>
    </li>
    <li>
      <p>
        <a name="container_protocol" href="#container_protocol" className="snap-top">
          <code>container_protocol</code>
        </a> - The protocol on which this service's Docker container accepts traffic. Must be one of the supported protocols: https://kubernetes.io/docs/concepts/services-networking/service/#protocol-support.
      </p>
    </li>
    <li>
      <p>
        <a name="custom_resources" href="#custom_resources" className="snap-top">
          <code>custom_resources</code>
        </a> - The map that lets you define Kubernetes resources you want installed and configured as part of the chart.
      </p>
    </li>
    <li>
      <p>
        <a name="desired_number_of_canary_pods" href="#desired_number_of_canary_pods" className="snap-top">
          <code>desired_number_of_canary_pods</code>
        </a> - The number of canary Pods to run on the Kubernetes cluster for this service. If greater than 0, you must provide var.canary_image.
      </p>
    </li>
    <li>
      <p>
        <a name="desired_number_of_pods" href="#desired_number_of_pods" className="snap-top">
          <code>desired_number_of_pods</code>
        </a> - The number of Pods to run on the Kubernetes cluster for this service.
      </p>
    </li>
    <li>
      <p>
        <a name="domain_name" href="#domain_name" className="snap-top">
          <code>domain_name</code>
        </a> - The domain name for the DNS A record to bind to the Ingress resource for this service (e.g. service.foo.com). Depending on your external-dns configuration, this will also create the DNS record in the configured DNS service (e.g., Route53).
      </p>
    </li>
    <li>
      <p>
        <a name="domain_propagation_ttl" href="#domain_propagation_ttl" className="snap-top">
          <code>domain_propagation_ttl</code>
        </a> - The TTL value of the DNS A record that is bound to the Ingress resource. Only used if var.domain_name is set and external-dns is deployed.
      </p>
    </li>
    <li>
      <p>
        <a name="eks_iam_role_for_service_accounts_config" href="#eks_iam_role_for_service_accounts_config" className="snap-top">
          <code>eks_iam_role_for_service_accounts_config</code>
        </a> - Configuration for using the IAM role with Service Accounts feature to provide permissions to the applications. This expects a map with two properties: `openid_connect_provider_arn` and `openid_connect_provider_url`. The `openid_connect_provider_arn` is the ARN of the OpenID Connect Provider for EKS to retrieve IAM credentials, while `openid_connect_provider_url` is the URL. Leave as an empty string if you do not wish to use IAM role with Service Accounts.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_liveness_probe" href="#enable_liveness_probe" className="snap-top">
          <code>enable_liveness_probe</code>
        </a> - Whether or not to enable liveness probe. Liveness checks indicate whether or not the container is alive. When these checks fail, the cluster will automatically rotate the Pod.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_readiness_probe" href="#enable_readiness_probe" className="snap-top">
          <code>enable_readiness_probe</code>
        </a> - Whether or not to enable readiness probe. Readiness checks indicate whether or not the container can accept traffic. When these checks fail, the Pods are automatically removed from the Service (and added back in when they pass).
      </p>
    </li>
    <li>
      <p>
        <a name="env_vars" href="#env_vars" className="snap-top">
          <code>env_vars</code>
        </a> - A map of environment variable name to environment variable value that should be made available to the Docker container.
      </p>
    </li>
    <li>
      <p>
        <a name="expose_type" href="#expose_type" className="snap-top">
          <code>expose_type</code>
        </a> - How the service will be exposed in the cluster. Must be one of `external` (accessible over the public Internet), `internal` (only accessible from within the same VPC as the cluster), `cluster-internal` (only accessible within the Kubernetes network).
      </p>
    </li>
    <li>
      <p>
        <a name="force_destroy_ingress_access_logs" href="#force_destroy_ingress_access_logs" className="snap-top">
          <code>force_destroy_ingress_access_logs</code>
        </a> - A boolean that indicates whether the access logs bucket should be destroyed, even if there are files in it, when you run Terraform destroy. Unless you are using this bucket only for test purposes, you'll want to leave this variable set to false.
      </p>
    </li>
    <li>
      <p>
        <a name="horizontal_pod_autoscaler" href="#horizontal_pod_autoscaler" className="snap-top">
          <code>horizontal_pod_autoscaler</code>
        </a> - Configure the Horizontal Pod Autoscaler information for the associated Deployment. HPA is disabled when this variable is set to null.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_policy" href="#iam_policy" className="snap-top">
          <code>iam_policy</code>
        </a> - An object defining the policy to attach to `iam_role_name` if the IAM role is going to be created. Accepts a map of objects, where the map keys are sids for IAM policy statements, and the object fields are the resources, actions, and the effect ("Allow" or "Deny") of the statement. Ignored if `iam_role_arn` is provided. Leave as null if you do not wish to use IAM role with Service Accounts.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_role_exists" href="#iam_role_exists" className="snap-top">
          <code>iam_role_exists</code>
        </a> - Whether or not the IAM role passed in `iam_role_name` already exists. Set to true if it exists, or false if it needs to be created. Defaults to false.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_role_name" href="#iam_role_name" className="snap-top">
          <code>iam_role_name</code>
        </a> - The name of an IAM role that will be used by the pod to access the AWS API. If `iam_role_exists` is set to false, this role will be created. Leave as an empty string if you do not wish to use IAM role with Service Accounts.
      </p>
    </li>
    <li>
      <p>
        <a name="ingress_access_logs_s3_bucket_already_exists" href="#ingress_access_logs_s3_bucket_already_exists" className="snap-top">
          <code>ingress_access_logs_s3_bucket_already_exists</code>
        </a> - Set to true if the S3 bucket to store the Ingress access logs is managed external to this module.
      </p>
    </li>
    <li>
      <p>
        <a name="ingress_access_logs_s3_bucket_name" href="#ingress_access_logs_s3_bucket_name" className="snap-top">
          <code>ingress_access_logs_s3_bucket_name</code>
        </a> - The name to use for the S3 bucket where the Ingress access logs will be stored. If you leave this blank, a name will be generated automatically based on var.application_name.
      </p>
    </li>
    <li>
      <p>
        <a name="ingress_access_logs_s3_prefix" href="#ingress_access_logs_s3_prefix" className="snap-top">
          <code>ingress_access_logs_s3_prefix</code>
        </a> - The prefix to use for ingress access logs associated with the ALB. All logs will be stored in a key with this prefix. If null, the application name will be used.
      </p>
    </li>
    <li>
      <p>
        <a name="ingress_annotations" href="#ingress_annotations" className="snap-top">
          <code>ingress_annotations</code>
        </a> - A list of custom ingress annotations, such as health checks and TLS certificates, to add to the Helm chart. See: https://kubernetes-sigs.github.io/aws-alb-ingress-controller/guide/ingress/annotation/
      </p>
    </li>
    <li>
      <p>
        <a name="ingress_backend_protocol" href="#ingress_backend_protocol" className="snap-top">
          <code>ingress_backend_protocol</code>
        </a> - The protocol used by the Ingress ALB resource to communicate with the Service. Must be one of HTTP or HTTPS.
      </p>
    </li>
    <li>
      <p>
        <a name="ingress_configure_ssl_redirect" href="#ingress_configure_ssl_redirect" className="snap-top">
          <code>ingress_configure_ssl_redirect</code>
        </a> - When true, HTTP requests will automatically be redirected to use SSL (HTTPS). Used only when expose_type is either external or internal.
      </p>
    </li>
    <li>
      <p>
        <a name="ingress_group" href="#ingress_group" className="snap-top">
          <code>ingress_group</code>
        </a> - Assign the ingress resource to an IngressGroup. All Ingress rules of the group will be collapsed to a single ALB. The rules will be collapsed in priority order, with lower numbers being evaluated first.
      </p>
    </li>
    <li>
      <p>
        <a name="ingress_listener_protocol_ports" href="#ingress_listener_protocol_ports" className="snap-top">
          <code>ingress_listener_protocol_ports</code>
        </a> - A list of maps of protocols and ports that the ALB should listen on.
      </p>
    </li>
    <li>
      <p>
        <a name="ingress_path" href="#ingress_path" className="snap-top">
          <code>ingress_path</code>
        </a> - Path prefix that should be matched to route to the service. Use /* to match all paths.
      </p>
    </li>
    <li>
      <p>
        <a name="ingress_ssl_redirect_rule_already_exists" href="#ingress_ssl_redirect_rule_already_exists" className="snap-top">
          <code>ingress_ssl_redirect_rule_already_exists</code>
        </a> - Set to true if the Ingress SSL redirect rule is managed externally. This is useful when configuring Ingress grouping and you only want one service to be managing the SSL redirect rules. Only used if ingress_configure_ssl_redirect is true.
      </p>
    </li>
    <li>
      <p>
        <a name="ingress_target_type" href="#ingress_target_type" className="snap-top">
          <code>ingress_target_type</code>
        </a> - Controls how the ALB routes traffic to the Pods. Supports 'instance' mode (route traffic to NodePort and load balance across all worker nodes, relying on Kubernetes Service networking to route to the pods), or 'ip' mode (route traffic directly to the pod IP - only works with AWS VPC CNI). Must be set to 'ip' if using Fargate. Only used if expose_type is not cluster-internal.
      </p>
    </li>
    <li>
      <p>
        <a name="liveness_probe_grace_period_seconds" href="#liveness_probe_grace_period_seconds" className="snap-top">
          <code>liveness_probe_grace_period_seconds</code>
        </a> - Seconds to wait after Pod creation before liveness probe has any effect. Any failures during this period are ignored.
      </p>
    </li>
    <li>
      <p>
        <a name="liveness_probe_interval_seconds" href="#liveness_probe_interval_seconds" className="snap-top">
          <code>liveness_probe_interval_seconds</code>
        </a> - The approximate amount of time, in seconds, between liveness checks of an individual Target.
      </p>
    </li>
    <li>
      <p>
        <a name="liveness_probe_path" href="#liveness_probe_path" className="snap-top">
          <code>liveness_probe_path</code>
        </a> - URL path for the endpoint that the liveness probe should ping.
      </p>
    </li>
    <li>
      <p>
        <a name="liveness_probe_port" href="#liveness_probe_port" className="snap-top">
          <code>liveness_probe_port</code>
        </a> - Port that the liveness probe should use to connect to the application container.
      </p>
    </li>
    <li>
      <p>
        <a name="liveness_probe_protocol" href="#liveness_probe_protocol" className="snap-top">
          <code>liveness_probe_protocol</code>
        </a> - Protocol (HTTP or HTTPS) that the liveness probe should use to connect to the application container.
      </p>
    </li>
    <li>
      <p>
        <a name="min_number_of_pods_available" href="#min_number_of_pods_available" className="snap-top">
          <code>min_number_of_pods_available</code>
        </a> - The minimum number of pods that should be available at any given point in time. This is used to configure a PodDisruptionBudget for the service, allowing you to achieve a graceful rollout. See https://blog.gruntwork.io/avoiding-outages-in-your-kubernetes-cluster-using-poddisruptionbudgets-ef6a4baa5085 for an introduction to PodDisruptionBudgets.
      </p>
    </li>
    <li>
      <p>
        <a name="namespace" href="#namespace" className="snap-top">
          <code>namespace</code>
        </a> - The Kubernetes Namespace to deploy the application into.
      </p>
    </li>
    <li>
      <p>
        <a name="num_days_after_which_archive_ingress_log_data" href="#num_days_after_which_archive_ingress_log_data" className="snap-top">
          <code>num_days_after_which_archive_ingress_log_data</code>
        </a> - After this number of days, Ingress log files should be transitioned from S3 to Glacier. Set to 0 to never archive logs.
      </p>
    </li>
    <li>
      <p>
        <a name="num_days_after_which_delete_ingress_log_data" href="#num_days_after_which_delete_ingress_log_data" className="snap-top">
          <code>num_days_after_which_delete_ingress_log_data</code>
        </a> - After this number of days, Ingress log files should be deleted from S3. Set to 0 to never delete logs.
      </p>
    </li>
    <li>
      <p>
        <a name="override_chart_inputs" href="#override_chart_inputs" className="snap-top">
          <code>override_chart_inputs</code>
        </a> - Override any computed chart inputs with this map. This map is shallow merged to the computed chart inputs prior to passing on to the Helm Release. This is provided as a workaround while the terraform module does not support a particular input value that is exposed in the underlying chart. Please always file a GitHub issue to request exposing additional underlying input values prior to using this variable.
      </p>
    </li>
    <li>
      <p>
        <a name="readiness_probe_grace_period_seconds" href="#readiness_probe_grace_period_seconds" className="snap-top">
          <code>readiness_probe_grace_period_seconds</code>
        </a> - Seconds to wait after Pod creation before liveness probe has any effect. Any failures during this period are ignored.
      </p>
    </li>
    <li>
      <p>
        <a name="readiness_probe_interval_seconds" href="#readiness_probe_interval_seconds" className="snap-top">
          <code>readiness_probe_interval_seconds</code>
        </a> - The approximate amount of time, in seconds, between liveness checks of an individual Target.
      </p>
    </li>
    <li>
      <p>
        <a name="readiness_probe_path" href="#readiness_probe_path" className="snap-top">
          <code>readiness_probe_path</code>
        </a> - URL path for the endpoint that the readiness probe should ping.
      </p>
    </li>
    <li>
      <p>
        <a name="readiness_probe_port" href="#readiness_probe_port" className="snap-top">
          <code>readiness_probe_port</code>
        </a> - Port that the readiness probe should use to connect to the application container.
      </p>
    </li>
    <li>
      <p>
        <a name="readiness_probe_protocol" href="#readiness_probe_protocol" className="snap-top">
          <code>readiness_probe_protocol</code>
        </a> - Protocol (HTTP or HTTPS) that the readiness probe should use to connect to the application container.
      </p>
    </li>
    <li>
      <p>
        <a name="scratch_paths" href="#scratch_paths" className="snap-top">
          <code>scratch_paths</code>
        </a> - Paths that should be allocated as tmpfs volumes in the Deployment container. Each entry in the map is a key value pair where the key is an arbitrary name to bind to the volume, and the value is the path in the container to mount the tmpfs volume.
      </p>
    </li>
    <li>
      <p>
        <a name="secrets_as_env_vars" href="#secrets_as_env_vars" className="snap-top">
          <code>secrets_as_env_vars</code>
        </a> - Kubernetes Secrets to be injected into the container. Each entry in the map represents a Secret to be injected, with the key representing the name of the Secret. The value is also a map, with each entry corresponding to an entry in the Secret, with the key corresponding to the Secret entry key and the value corresponding to the environment variable name.
      </p>
    </li>
    <li>
      <p>
        <a name="secrets_as_volumes" href="#secrets_as_volumes" className="snap-top">
          <code>secrets_as_volumes</code>
        </a> - Kubernetes Secrets to be injected into the container as volume mounts. Each entry in the map represents a Secret to be mounted, with the key representing the name of the Secret and the value representing a file path on the container to mount the Secret to.
      </p>
    </li>
    <li>
      <p>
        <a name="service_account_exists" href="#service_account_exists" className="snap-top">
          <code>service_account_exists</code>
        </a> - When true, and service_account_name is not blank, lookup and assign an existing ServiceAccount in the Namespace to the Pods.
      </p>
    </li>
    <li>
      <p>
        <a name="service_account_name" href="#service_account_name" className="snap-top">
          <code>service_account_name</code>
        </a> - The name of a service account to create for use with the Pods. This service account will be mapped to the IAM role defined in `var.iam_role_name` to give the pod permissions to access the AWS API. Must be unique in this namespace. Leave as an empty string if you do not wish to assign a Service Account to the Pods.
      </p>
    </li>
    <li>
      <p>
        <a name="service_port" href="#service_port" className="snap-top">
          <code>service_port</code>
        </a> - The port to expose on the Service. This is most useful when addressing the Service internally to the cluster, as it is ignored when connecting from the Ingress resource.
      </p>
    </li>
    <li>
      <p>
        <a name="sidecar_containers" href="#sidecar_containers" className="snap-top">
          <code>sidecar_containers</code>
        </a> - Map of keys to container definitions that allow you to manage additional side car containers that should be included in the Pod. Note that the values are injected directly into the container list for the Pod Spec.
      </p>
    </li>
    <li>
      <p>
        <a name="termination_grace_period_seconds" href="#termination_grace_period_seconds" className="snap-top">
          <code>termination_grace_period_seconds</code>
        </a> - Grace period in seconds that Kubernetes will wait before terminating the pod. The timeout happens in parallel to preStop hook and the SIGTERM signal, Kubernetes does not wait for preStop to finish before beginning the grace period.
      </p>
    </li>
    <li>
      <p>
        <a name="values_file_path" href="#values_file_path" className="snap-top">
          <code>values_file_path</code>
        </a> - A local file path where the helm chart values will be emitted. Use to debug issues with the helm chart values. Set to null to prevent creation of the file.
      </p>
    </li>
    <li>
      <p>
        <a name="wait" href="#wait" className="snap-top">
          <code>wait</code>
        </a> - When true, wait until Pods are up and healthy or wait_timeout seconds before exiting terraform.
      </p>
    </li>
    <li>
      <p>
        <a name="wait_timeout" href="#wait_timeout" className="snap-top">
          <code>wait_timeout</code>
        </a> - Number of seconds to wait for Pods to become healthy before marking the deployment as a failure.
      </p>
    </li>
    </ul>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <ul>
      
    </ul>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"1d4320cb5ac605e278db15c797cb64fe"}
##DOCS-SOURCER-END -->
