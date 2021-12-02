import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Kubernetes Service

Deploy your application containers as a Kubernetes Service and Deployment following best practices.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/k8s-service" class="link-button">View on GitHub</a>

<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <table>
        <thead>
            <tr>
                <td>Variable name</td>
                <td>Description</td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td>alb_acm_certificate_arns</td>
        <td>A list of ACM certificate ARNs to attach to the ALB. The first certificate in the list will be added as default certificate.</td>
    </tr><tr>
        <td>alb_health_check_healthy_threshold</td>
        <td>The number of consecutive health check successes required before considering an unhealthy target healthy.</td>
    </tr><tr>
        <td>alb_health_check_interval</td>
        <td>Interval between ALB health checks in seconds.</td>
    </tr><tr>
        <td>alb_health_check_path</td>
        <td>URL path for the endpoint that the ALB health check should ping. Defaults to /.</td>
    </tr><tr>
        <td>alb_health_check_port</td>
        <td>String value specifying the port that the ALB health check should probe. By default, this will be set to the traffic port.</td>
    </tr><tr>
        <td>alb_health_check_protocol</td>
        <td>Protocol (HTTP or HTTPS) that the ALB health check should use to connect to the application container.</td>
    </tr><tr>
        <td>alb_health_check_success_codes</td>
        <td>The HTTP status code that should be expected when doing health checks against the specified health check path. Accepts a single value (200), multiple values (200,201), or a range of values (200-300).</td>
    </tr><tr>
        <td>alb_health_check_timeout</td>
        <td>The timeout, in seconds, during which no response from a target means a failed health check.</td>
    </tr><tr>
        <td>application_name</td>
        <td>The name of the application (e.g. my-service-stage). Used for labeling Kubernetes resources.</td>
    </tr><tr>
        <td>canary_image</td>
        <td>The Docker image to use for the canary. Required if desired_number_of_canary_pods is greater than 0.</td>
    </tr><tr>
        <td>configmaps_as_env_vars</td>
        <td>Kubernetes ConfigMaps to be injected into the container. Each entry in the map represents a ConfigMap to be injected, with the key representing the name of the ConfigMap. The value is also a map, with each entry corresponding to an entry in the ConfigMap, with the key corresponding to the ConfigMap entry key and the value corresponding to the environment variable name.</td>
    </tr><tr>
        <td>configmaps_as_volumes</td>
        <td>Kubernetes ConfigMaps to be injected into the container as volume mounts. Each entry in the map represents a ConfigMap to be mounted, with the key representing the name of the ConfigMap and the value representing a file path on the container to mount the ConfigMap to.</td>
    </tr><tr>
        <td>container_image</td>
        <td>The Docker image to run.</td>
    </tr><tr>
        <td>container_port</td>
        <td>The port number on which this service's Docker container accepts incoming traffic.</td>
    </tr><tr>
        <td>container_protocol</td>
        <td>The protocol on which this service's Docker container accepts traffic. Must be one of the supported protocols: https://kubernetes.io/docs/concepts/services-networking/service/#protocol-support.</td>
    </tr><tr>
        <td>custom_resources</td>
        <td>The map that lets you define Kubernetes resources you want installed and configured as part of the chart.</td>
    </tr><tr>
        <td>desired_number_of_canary_pods</td>
        <td>The number of canary Pods to run on the Kubernetes cluster for this service. If greater than 0, you must provide var.canary_image.</td>
    </tr><tr>
        <td>desired_number_of_pods</td>
        <td>The number of Pods to run on the Kubernetes cluster for this service.</td>
    </tr><tr>
        <td>domain_name</td>
        <td>The domain name for the DNS A record to bind to the Ingress resource for this service (e.g. service.foo.com). Depending on your external-dns configuration, this will also create the DNS record in the configured DNS service (e.g., Route53).</td>
    </tr><tr>
        <td>domain_propagation_ttl</td>
        <td>The TTL value of the DNS A record that is bound to the Ingress resource. Only used if var.domain_name is set and external-dns is deployed.</td>
    </tr><tr>
        <td>eks_iam_role_for_service_accounts_config</td>
        <td>Configuration for using the IAM role with Service Accounts feature to provide permissions to the applications. This expects a map with two properties: `openid_connect_provider_arn` and `openid_connect_provider_url`. The `openid_connect_provider_arn` is the ARN of the OpenID Connect Provider for EKS to retrieve IAM credentials, while `openid_connect_provider_url` is the URL. Leave as an empty string if you do not wish to use IAM role with Service Accounts.</td>
    </tr><tr>
        <td>enable_liveness_probe</td>
        <td>Whether or not to enable liveness probe. Liveness checks indicate whether or not the container is alive. When these checks fail, the cluster will automatically rotate the Pod.</td>
    </tr><tr>
        <td>enable_readiness_probe</td>
        <td>Whether or not to enable readiness probe. Readiness checks indicate whether or not the container can accept traffic. When these checks fail, the Pods are automatically removed from the Service (and added back in when they pass).</td>
    </tr><tr>
        <td>env_vars</td>
        <td>A map of environment variable name to environment variable value that should be made available to the Docker container.</td>
    </tr><tr>
        <td>expose_type</td>
        <td>How the service will be exposed in the cluster. Must be one of `external` (accessible over the public Internet), `internal` (only accessible from within the same VPC as the cluster), `cluster-internal` (only accessible within the Kubernetes network).</td>
    </tr><tr>
        <td>force_destroy_ingress_access_logs</td>
        <td>A boolean that indicates whether the access logs bucket should be destroyed, even if there are files in it, when you run Terraform destroy. Unless you are using this bucket only for test purposes, you'll want to leave this variable set to false.</td>
    </tr><tr>
        <td>horizontal_pod_autoscaler</td>
        <td>Configure the Horizontal Pod Autoscaler information for the associated Deployment. HPA is disabled when this variable is set to null.</td>
    </tr><tr>
        <td>iam_policy</td>
        <td>An object defining the policy to attach to `iam_role_name` if the IAM role is going to be created. Accepts a map of objects, where the map keys are sids for IAM policy statements, and the object fields are the resources, actions, and the effect ("Allow" or "Deny") of the statement. Ignored if `iam_role_arn` is provided. Leave as null if you do not wish to use IAM role with Service Accounts.</td>
    </tr><tr>
        <td>iam_role_exists</td>
        <td>Whether or not the IAM role passed in `iam_role_name` already exists. Set to true if it exists, or false if it needs to be created. Defaults to false.</td>
    </tr><tr>
        <td>iam_role_name</td>
        <td>The name of an IAM role that will be used by the pod to access the AWS API. If `iam_role_exists` is set to false, this role will be created. Leave as an empty string if you do not wish to use IAM role with Service Accounts.</td>
    </tr><tr>
        <td>ingress_access_logs_s3_bucket_already_exists</td>
        <td>Set to true if the S3 bucket to store the Ingress access logs is managed external to this module.</td>
    </tr><tr>
        <td>ingress_access_logs_s3_bucket_name</td>
        <td>The name to use for the S3 bucket where the Ingress access logs will be stored. If you leave this blank, a name will be generated automatically based on var.application_name.</td>
    </tr><tr>
        <td>ingress_access_logs_s3_prefix</td>
        <td>The prefix to use for ingress access logs associated with the ALB. All logs will be stored in a key with this prefix. If null, the application name will be used.</td>
    </tr><tr>
        <td>ingress_annotations</td>
        <td>A list of custom ingress annotations, such as health checks and TLS certificates, to add to the Helm chart. See: https://kubernetes-sigs.github.io/aws-alb-ingress-controller/guide/ingress/annotation/</td>
    </tr><tr>
        <td>ingress_backend_protocol</td>
        <td>The protocol used by the Ingress ALB resource to communicate with the Service. Must be one of HTTP or HTTPS.</td>
    </tr><tr>
        <td>ingress_configure_ssl_redirect</td>
        <td>When true, HTTP requests will automatically be redirected to use SSL (HTTPS). Used only when expose_type is either external or internal.</td>
    </tr><tr>
        <td>ingress_group</td>
        <td>Assign the ingress resource to an IngressGroup. All Ingress rules of the group will be collapsed to a single ALB. The rules will be collapsed in priority order, with lower numbers being evaluated first.</td>
    </tr><tr>
        <td>ingress_listener_protocol_ports</td>
        <td>A list of maps of protocols and ports that the ALB should listen on.</td>
    </tr><tr>
        <td>ingress_path</td>
        <td>Path prefix that should be matched to route to the service. Use /* to match all paths.</td>
    </tr><tr>
        <td>ingress_ssl_redirect_rule_already_exists</td>
        <td>Set to true if the Ingress SSL redirect rule is managed externally. This is useful when configuring Ingress grouping and you only want one service to be managing the SSL redirect rules. Only used if ingress_configure_ssl_redirect is true.</td>
    </tr><tr>
        <td>ingress_target_type</td>
        <td>Controls how the ALB routes traffic to the Pods. Supports 'instance' mode (route traffic to NodePort and load balance across all worker nodes, relying on Kubernetes Service networking to route to the pods), or 'ip' mode (route traffic directly to the pod IP - only works with AWS VPC CNI). Must be set to 'ip' if using Fargate. Only used if expose_type is not cluster-internal.</td>
    </tr><tr>
        <td>liveness_probe_grace_period_seconds</td>
        <td>Seconds to wait after Pod creation before liveness probe has any effect. Any failures during this period are ignored.</td>
    </tr><tr>
        <td>liveness_probe_interval_seconds</td>
        <td>The approximate amount of time, in seconds, between liveness checks of an individual Target.</td>
    </tr><tr>
        <td>liveness_probe_path</td>
        <td>URL path for the endpoint that the liveness probe should ping.</td>
    </tr><tr>
        <td>liveness_probe_port</td>
        <td>Port that the liveness probe should use to connect to the application container.</td>
    </tr><tr>
        <td>liveness_probe_protocol</td>
        <td>Protocol (HTTP or HTTPS) that the liveness probe should use to connect to the application container.</td>
    </tr><tr>
        <td>min_number_of_pods_available</td>
        <td>The minimum number of pods that should be available at any given point in time. This is used to configure a PodDisruptionBudget for the service, allowing you to achieve a graceful rollout. See https://blog.gruntwork.io/avoiding-outages-in-your-kubernetes-cluster-using-poddisruptionbudgets-ef6a4baa5085 for an introduction to PodDisruptionBudgets.</td>
    </tr><tr>
        <td>namespace</td>
        <td>The Kubernetes Namespace to deploy the application into.</td>
    </tr><tr>
        <td>num_days_after_which_archive_ingress_log_data</td>
        <td>After this number of days, Ingress log files should be transitioned from S3 to Glacier. Set to 0 to never archive logs.</td>
    </tr><tr>
        <td>num_days_after_which_delete_ingress_log_data</td>
        <td>After this number of days, Ingress log files should be deleted from S3. Set to 0 to never delete logs.</td>
    </tr><tr>
        <td>override_chart_inputs</td>
        <td>Override any computed chart inputs with this map. This map is shallow merged to the computed chart inputs prior to passing on to the Helm Release. This is provided as a workaround while the terraform module does not support a particular input value that is exposed in the underlying chart. Please always file a GitHub issue to request exposing additional underlying input values prior to using this variable.</td>
    </tr><tr>
        <td>readiness_probe_grace_period_seconds</td>
        <td>Seconds to wait after Pod creation before liveness probe has any effect. Any failures during this period are ignored.</td>
    </tr><tr>
        <td>readiness_probe_interval_seconds</td>
        <td>The approximate amount of time, in seconds, between liveness checks of an individual Target.</td>
    </tr><tr>
        <td>readiness_probe_path</td>
        <td>URL path for the endpoint that the readiness probe should ping.</td>
    </tr><tr>
        <td>readiness_probe_port</td>
        <td>Port that the readiness probe should use to connect to the application container.</td>
    </tr><tr>
        <td>readiness_probe_protocol</td>
        <td>Protocol (HTTP or HTTPS) that the readiness probe should use to connect to the application container.</td>
    </tr><tr>
        <td>scratch_paths</td>
        <td>Paths that should be allocated as tmpfs volumes in the Deployment container. Each entry in the map is a key value pair where the key is an arbitrary name to bind to the volume, and the value is the path in the container to mount the tmpfs volume.</td>
    </tr><tr>
        <td>secrets_as_env_vars</td>
        <td>Kubernetes Secrets to be injected into the container. Each entry in the map represents a Secret to be injected, with the key representing the name of the Secret. The value is also a map, with each entry corresponding to an entry in the Secret, with the key corresponding to the Secret entry key and the value corresponding to the environment variable name.</td>
    </tr><tr>
        <td>secrets_as_volumes</td>
        <td>Kubernetes Secrets to be injected into the container as volume mounts. Each entry in the map represents a Secret to be mounted, with the key representing the name of the Secret and the value representing a file path on the container to mount the Secret to.</td>
    </tr><tr>
        <td>service_account_exists</td>
        <td>When true, and service_account_name is not blank, lookup and assign an existing ServiceAccount in the Namespace to the Pods.</td>
    </tr><tr>
        <td>service_account_name</td>
        <td>The name of a service account to create for use with the Pods. This service account will be mapped to the IAM role defined in `var.iam_role_name` to give the pod permissions to access the AWS API. Must be unique in this namespace. Leave as an empty string if you do not wish to assign a Service Account to the Pods.</td>
    </tr><tr>
        <td>service_port</td>
        <td>The port to expose on the Service. This is most useful when addressing the Service internally to the cluster, as it is ignored when connecting from the Ingress resource.</td>
    </tr><tr>
        <td>sidecar_containers</td>
        <td>Map of keys to container definitions that allow you to manage additional side car containers that should be included in the Pod. Note that the values are injected directly into the container list for the Pod Spec.</td>
    </tr><tr>
        <td>termination_grace_period_seconds</td>
        <td>Grace period in seconds that Kubernetes will wait before terminating the pod. The timeout happens in parallel to preStop hook and the SIGTERM signal, Kubernetes does not wait for preStop to finish before beginning the grace period.</td>
    </tr><tr>
        <td>values_file_path</td>
        <td>A local file path where the helm chart values will be emitted. Use to debug issues with the helm chart values. Set to null to prevent creation of the file.</td>
    </tr><tr>
        <td>wait</td>
        <td>When true, wait until Pods are up and healthy or wait_timeout seconds before exiting terraform.</td>
    </tr><tr>
        <td>wait_timeout</td>
        <td>Number of seconds to wait for Pods to become healthy before marking the deployment as a failure.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <table>
        <thead>
            <tr>
                <td>Variable name</td>
                <td>Description</td>
            </tr>
        </thead>
        <tbody>
            
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"3085a4f31a95a38b80cc9ab7ca333c63"}
##DOCS-SOURCER-END -->
