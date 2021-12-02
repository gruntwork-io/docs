import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon EKS Core Services

Deploy core administrative applications on top of Amazon EC2 Kubernetes Service (EKS)

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/eks-core-services" className="link-button">View on GitHub</a>

### Reference 

<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <table>
        <thead>
            <tr>
                <td><b>Variable name</b></td>
                <td><b>Description</b></td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td><a name="alb_ingress_controller_pod_node_affinity" href="#alb_ingress_controller_pod_node_affinity" className="snap-top"><code>alb_ingress_controller_pod_node_affinity</code></a></td>
        <td>Configure affinity rules for the ALB Ingress Controller Pod to control which nodes to schedule on. Each item in the list should be a map with the keys `key`, `values`, and `operator`, corresponding to the 3 properties of matchExpressions. Note that all expressions must be satisfied to schedule on the node.</td>
    </tr><tr>
        <td><a name="alb_ingress_controller_pod_tolerations" href="#alb_ingress_controller_pod_tolerations" className="snap-top"><code>alb_ingress_controller_pod_tolerations</code></a></td>
        <td>Configure tolerations rules to allow the ALB Ingress Controller Pod to schedule on nodes that have been tainted. Each item in the list specifies a toleration rule.</td>
    </tr><tr>
        <td><a name="autoscaler_down_delay_after_add" href="#autoscaler_down_delay_after_add" className="snap-top"><code>autoscaler_down_delay_after_add</code></a></td>
        <td>Minimum time to wait after a scale up event before any node is considered for scale down.</td>
    </tr><tr>
        <td><a name="autoscaler_scale_down_unneeded_time" href="#autoscaler_scale_down_unneeded_time" className="snap-top"><code>autoscaler_scale_down_unneeded_time</code></a></td>
        <td>Minimum time to wait since the node became unused before the node is considered for scale down by the autoscaler.</td>
    </tr><tr>
        <td><a name="autoscaler_skip_nodes_with_local_storage" href="#autoscaler_skip_nodes_with_local_storage" className="snap-top"><code>autoscaler_skip_nodes_with_local_storage</code></a></td>
        <td>If true cluster autoscaler will never delete nodes with pods with local storage, e.g. EmptyDir or HostPath</td>
    </tr><tr>
        <td><a name="aws_region" href="#aws_region" className="snap-top"><code>aws_region</code></a></td>
        <td>The AWS region in which all resources will be created</td>
    </tr><tr>
        <td><a name="cluster_autoscaler_pod_annotations" href="#cluster_autoscaler_pod_annotations" className="snap-top"><code>cluster_autoscaler_pod_annotations</code></a></td>
        <td>Annotations to apply to the cluster autoscaler pod(s), as key value pairs.</td>
    </tr><tr>
        <td><a name="cluster_autoscaler_pod_labels" href="#cluster_autoscaler_pod_labels" className="snap-top"><code>cluster_autoscaler_pod_labels</code></a></td>
        <td>Labels to apply to the cluster autoscaler pod(s), as key value pairs.</td>
    </tr><tr>
        <td><a name="cluster_autoscaler_pod_node_affinity" href="#cluster_autoscaler_pod_node_affinity" className="snap-top"><code>cluster_autoscaler_pod_node_affinity</code></a></td>
        <td>Configure affinity rules for the cluster-autoscaler Pod to control which nodes to schedule on. Each item in the list should be a map with the keys `key`, `values`, and `operator`, corresponding to the 3 properties of matchExpressions. Note that all expressions must be satisfied to schedule on the node.</td>
    </tr><tr>
        <td><a name="cluster_autoscaler_pod_resources" href="#cluster_autoscaler_pod_resources" className="snap-top"><code>cluster_autoscaler_pod_resources</code></a></td>
        <td>Pod resource requests and limits to use. Refer to https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/ for more information.</td>
    </tr><tr>
        <td><a name="cluster_autoscaler_pod_tolerations" href="#cluster_autoscaler_pod_tolerations" className="snap-top"><code>cluster_autoscaler_pod_tolerations</code></a></td>
        <td>Configure tolerations rules to allow the cluster-autoscaler Pod to schedule on nodes that have been tainted. Each item in the list specifies a toleration rule.</td>
    </tr><tr>
        <td><a name="cluster_autoscaler_release_name" href="#cluster_autoscaler_release_name" className="snap-top"><code>cluster_autoscaler_release_name</code></a></td>
        <td>The name to use for the helm release for cluster-autoscaler. This is useful to force a redeployment of the cluster-autoscaler component.</td>
    </tr><tr>
        <td><a name="cluster_autoscaler_repository" href="#cluster_autoscaler_repository" className="snap-top"><code>cluster_autoscaler_repository</code></a></td>
        <td>Which docker repository to use to install the cluster autoscaler. Check the following link for valid repositories to use https://github.com/kubernetes/autoscaler/releases</td>
    </tr><tr>
        <td><a name="cluster_autoscaler_scaling_strategy" href="#cluster_autoscaler_scaling_strategy" className="snap-top"><code>cluster_autoscaler_scaling_strategy</code></a></td>
        <td>Specifies an 'expander' for the cluster autoscaler. This helps determine which ASG to scale when additional resource capacity is needed.</td>
    </tr><tr>
        <td><a name="cluster_autoscaler_version" href="#cluster_autoscaler_version" className="snap-top"><code>cluster_autoscaler_version</code></a></td>
        <td>Which version of the cluster autoscaler to install. This should match the major/minor version (e.g., v1.20) of your Kubernetes Installation. See https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler#releases for a list of versions.</td>
    </tr><tr>
        <td><a name="eks_cluster_name" href="#eks_cluster_name" className="snap-top"><code>eks_cluster_name</code></a></td>
        <td>The name of the EKS cluster where the core services will be deployed into.</td>
    </tr><tr>
        <td><a name="eks_iam_role_for_service_accounts_config" href="#eks_iam_role_for_service_accounts_config" className="snap-top"><code>eks_iam_role_for_service_accounts_config</code></a></td>
        <td>Configuration for using the IAM role with Service Accounts feature to provide permissions to the applications. This expects a map with two properties: `openid_connect_provider_arn` and `openid_connect_provider_url`. The `openid_connect_provider_arn` is the ARN of the OpenID Connect Provider for EKS to retrieve IAM credentials, while `openid_connect_provider_url` is the URL. Set to null if you do not wish to use IAM role with Service Accounts.</td>
    </tr><tr>
        <td><a name="enable_alb_ingress_controller" href="#enable_alb_ingress_controller" className="snap-top"><code>enable_alb_ingress_controller</code></a></td>
        <td>Whether or not to enable the AWS LB Ingress controller.</td>
    </tr><tr>
        <td><a name="enable_cluster_autoscaler" href="#enable_cluster_autoscaler" className="snap-top"><code>enable_cluster_autoscaler</code></a></td>
        <td>Whether or not to enable cluster-autoscaler for Autoscaling EKS worker nodes.</td>
    </tr><tr>
        <td><a name="enable_external_dns" href="#enable_external_dns" className="snap-top"><code>enable_external_dns</code></a></td>
        <td>Whether or not to enable external-dns for DNS entry syncing with Route 53 for Services and Ingresses.</td>
    </tr><tr>
        <td><a name="enable_fargate_fluent_bit" href="#enable_fargate_fluent_bit" className="snap-top"><code>enable_fargate_fluent_bit</code></a></td>
        <td>Whether or not to enable fluent-bit on EKS Fargate workers for log aggregation.</td>
    </tr><tr>
        <td><a name="enable_fluent_bit" href="#enable_fluent_bit" className="snap-top"><code>enable_fluent_bit</code></a></td>
        <td>Whether or not to enable fluent-bit for log aggregation.</td>
    </tr><tr>
        <td><a name="external_dns_pod_node_affinity" href="#external_dns_pod_node_affinity" className="snap-top"><code>external_dns_pod_node_affinity</code></a></td>
        <td>Configure affinity rules for the external-dns Pod to control which nodes to schedule on. Each item in the list should be a map with the keys `key`, `values`, and `operator`, corresponding to the 3 properties of matchExpressions. Note that all expressions must be satisfied to schedule on the node.</td>
    </tr><tr>
        <td><a name="external_dns_pod_tolerations" href="#external_dns_pod_tolerations" className="snap-top"><code>external_dns_pod_tolerations</code></a></td>
        <td>Configure tolerations rules to allow the external-dns Pod to schedule on nodes that have been tainted. Each item in the list specifies a toleration rule.</td>
    </tr><tr>
        <td><a name="external_dns_route53_hosted_zone_domain_filters" href="#external_dns_route53_hosted_zone_domain_filters" className="snap-top"><code>external_dns_route53_hosted_zone_domain_filters</code></a></td>
        <td>Only create records in hosted zones that match the provided domain names. Empty list (default) means match all zones. Zones must satisfy all three constraints (var.external_dns_route53_hosted_zone_tag_filters, var.external_dns_route53_hosted_zone_id_filters, and var.external_dns_route53_hosted_zone_domain_filters).</td>
    </tr><tr>
        <td><a name="external_dns_route53_hosted_zone_id_filters" href="#external_dns_route53_hosted_zone_id_filters" className="snap-top"><code>external_dns_route53_hosted_zone_id_filters</code></a></td>
        <td>Only create records in hosted zones that match the provided IDs. Empty list (default) means match all zones. Zones must satisfy all three constraints (var.external_dns_route53_hosted_zone_tag_filters, var.external_dns_route53_hosted_zone_id_filters, and var.external_dns_route53_hosted_zone_domain_filters).</td>
    </tr><tr>
        <td><a name="external_dns_route53_hosted_zone_tag_filters" href="#external_dns_route53_hosted_zone_tag_filters" className="snap-top"><code>external_dns_route53_hosted_zone_tag_filters</code></a></td>
        <td>Only create records in hosted zones that match the provided tags. Each item in the list should specify tag key and tag value as a map. Empty list (default) means match all zones. Zones must satisfy all three constraints (var.external_dns_route53_hosted_zone_tag_filters, var.external_dns_route53_hosted_zone_id_filters, and var.external_dns_route53_hosted_zone_domain_filters).</td>
    </tr><tr>
        <td><a name="external_dns_sources" href="#external_dns_sources" className="snap-top"><code>external_dns_sources</code></a></td>
        <td>K8s resources type to be observed for new DNS entries by ExternalDNS.</td>
    </tr><tr>
        <td><a name="fargate_fluent_bit_execution_iam_role_arns" href="#fargate_fluent_bit_execution_iam_role_arns" className="snap-top"><code>fargate_fluent_bit_execution_iam_role_arns</code></a></td>
        <td>List of ARNs of Fargate execution IAM Roles that should get permissions to ship logs using fluent-bit. This must be provided if enable_fargate_fluent_bit is true.</td>
    </tr><tr>
        <td><a name="fargate_fluent_bit_extra_filters" href="#fargate_fluent_bit_extra_filters" className="snap-top"><code>fargate_fluent_bit_extra_filters</code></a></td>
        <td>Additional filters that fluent-bit should apply to log output. This string should be formatted according to the Fluent-bit docs (https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/configuration-file#config_filter).</td>
    </tr><tr>
        <td><a name="fargate_fluent_bit_extra_parsers" href="#fargate_fluent_bit_extra_parsers" className="snap-top"><code>fargate_fluent_bit_extra_parsers</code></a></td>
        <td>Additional parsers that fluent-bit should export logs to. This string should be formatted according to the Fluent-bit docs (https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/configuration-file#config_output).</td>
    </tr><tr>
        <td><a name="fargate_fluent_bit_log_stream_prefix" href="#fargate_fluent_bit_log_stream_prefix" className="snap-top"><code>fargate_fluent_bit_log_stream_prefix</code></a></td>
        <td>Prefix string to use for the CloudWatch Log Stream that gets created for each Fargate pod.</td>
    </tr><tr>
        <td><a name="fargate_worker_disallowed_availability_zones" href="#fargate_worker_disallowed_availability_zones" className="snap-top"><code>fargate_worker_disallowed_availability_zones</code></a></td>
        <td>A list of availability zones in the region that we CANNOT use to deploy the EKS Fargate workers. You can use this to avoid availability zones that may not be able to provision the resources (e.g ran out of capacity). If empty, will allow all availability zones.</td>
    </tr><tr>
        <td><a name="fluent_bit_extra_filters" href="#fluent_bit_extra_filters" className="snap-top"><code>fluent_bit_extra_filters</code></a></td>
        <td>Additional filters that fluent-bit should apply to log output. This string should be formatted according to the Fluent-bit docs (https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/configuration-file#config_filter).</td>
    </tr><tr>
        <td><a name="fluent_bit_extra_outputs" href="#fluent_bit_extra_outputs" className="snap-top"><code>fluent_bit_extra_outputs</code></a></td>
        <td>Additional output streams that fluent-bit should export logs to. This string should be formatted according to the Fluent-bit docs (https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/configuration-file#config_output).</td>
    </tr><tr>
        <td><a name="fluent_bit_log_group_already_exists" href="#fluent_bit_log_group_already_exists" className="snap-top"><code>fluent_bit_log_group_already_exists</code></a></td>
        <td>If set to true, that means that the CloudWatch Log Group fluent-bit should use for streaming logs already exists and does not need to be created.</td>
    </tr><tr>
        <td><a name="fluent_bit_log_group_name" href="#fluent_bit_log_group_name" className="snap-top"><code>fluent_bit_log_group_name</code></a></td>
        <td>Name of the CloudWatch Log Group fluent-bit should use to stream logs to. When null (default), uses the eks_cluster_name as the Log Group name.</td>
    </tr><tr>
        <td><a name="fluent_bit_log_group_retention" href="#fluent_bit_log_group_retention" className="snap-top"><code>fluent_bit_log_group_retention</code></a></td>
        <td>number of days to retain log events. Possible values are: 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1827, 3653, and 0. Select 0 to never expire.</td>
    </tr><tr>
        <td><a name="fluent_bit_log_stream_prefix" href="#fluent_bit_log_stream_prefix" className="snap-top"><code>fluent_bit_log_stream_prefix</code></a></td>
        <td>Prefix string to use for the CloudWatch Log Stream that gets created for each pod. When null (default), the prefix is set to 'fluentbit'.</td>
    </tr><tr>
        <td><a name="fluent_bit_pod_node_affinity" href="#fluent_bit_pod_node_affinity" className="snap-top"><code>fluent_bit_pod_node_affinity</code></a></td>
        <td>Configure affinity rules for the fluent-bit Pods to control which nodes to schedule on. Each item in the list should be a map with the keys `key`, `values`, and `operator`, corresponding to the 3 properties of matchExpressions. Note that all expressions must be satisfied to schedule on the node.</td>
    </tr><tr>
        <td><a name="fluent_bit_pod_tolerations" href="#fluent_bit_pod_tolerations" className="snap-top"><code>fluent_bit_pod_tolerations</code></a></td>
        <td>Configure tolerations rules to allow the fluent-bit Pods to schedule on nodes that have been tainted. Each item in the list specifies a toleration rule.</td>
    </tr><tr>
        <td><a name="pod_execution_iam_role_arn" href="#pod_execution_iam_role_arn" className="snap-top"><code>pod_execution_iam_role_arn</code></a></td>
        <td>ARN of IAM Role to use as the Pod execution role for Fargate. Required if any of the services are being scheduled on Fargate. Set to null if none of the Pods are being scheduled on Fargate.</td>
    </tr><tr>
        <td><a name="route53_record_update_policy" href="#route53_record_update_policy" className="snap-top"><code>route53_record_update_policy</code></a></td>
        <td>Policy for how DNS records are sychronized between sources and providers (options: sync, upsert-only).</td>
    </tr><tr>
        <td><a name="schedule_alb_ingress_controller_on_fargate" href="#schedule_alb_ingress_controller_on_fargate" className="snap-top"><code>schedule_alb_ingress_controller_on_fargate</code></a></td>
        <td>When true, the ALB ingress controller pods will be scheduled on Fargate.</td>
    </tr><tr>
        <td><a name="schedule_cluster_autoscaler_on_fargate" href="#schedule_cluster_autoscaler_on_fargate" className="snap-top"><code>schedule_cluster_autoscaler_on_fargate</code></a></td>
        <td>When true, the cluster autoscaler pods will be scheduled on Fargate. It is recommended to run the cluster autoscaler on Fargate to avoid the autoscaler scaling down a node where it is running (and thus shutting itself down during a scale down event). However, since Fargate is only supported on a handful of regions, we don't default to true here.</td>
    </tr><tr>
        <td><a name="schedule_external_dns_on_fargate" href="#schedule_external_dns_on_fargate" className="snap-top"><code>schedule_external_dns_on_fargate</code></a></td>
        <td>When true, the external-dns pods will be scheduled on Fargate.</td>
    </tr><tr>
        <td><a name="service_dns_mappings" href="#service_dns_mappings" className="snap-top"><code>service_dns_mappings</code></a></td>
        <td>Configure Kubernetes Services to lookup external DNS records. This can be useful to bind friendly internal service names to domains (e.g. the RDS database endpoint).</td>
    </tr><tr>
        <td><a name="use_exec_plugin_for_auth" href="#use_exec_plugin_for_auth" className="snap-top"><code>use_exec_plugin_for_auth</code></a></td>
        <td>If this variable is set to true, then use an exec-based plugin to authenticate and fetch tokens for EKS. This is useful because EKS clusters use short-lived authentication tokens that can expire in the middle of an 'apply' or 'destroy', and since the native Kubernetes provider in Terraform doesn't have a way to fetch up-to-date tokens, we recommend using an exec-based provider as a workaround. Use the use_kubergrunt_to_fetch_token input variable to control whether kubergrunt or aws is used to fetch tokens.</td>
    </tr><tr>
        <td><a name="use_kubergrunt_to_fetch_token" href="#use_kubergrunt_to_fetch_token" className="snap-top"><code>use_kubergrunt_to_fetch_token</code></a></td>
        <td>EKS clusters use short-lived authentication tokens that can expire in the middle of an 'apply' or 'destroy'. To avoid this issue, we use an exec-based plugin to fetch an up-to-date token. If this variable is set to true, we'll use kubergrunt to fetch the token (in which case, kubergrunt must be installed and on PATH); if this variable is set to false, we'll use the aws CLI to fetch the token (in which case, aws must be installed and on PATH). Note this functionality is only enabled if use_exec_plugin_for_auth is set to true.</td>
    </tr><tr>
        <td><a name="vpc_id" href="#vpc_id" className="snap-top"><code>vpc_id</code></a></td>
        <td>The ID of the VPC where the EKS cluster is deployed.</td>
    </tr><tr>
        <td><a name="worker_vpc_subnet_ids" href="#worker_vpc_subnet_ids" className="snap-top"><code>worker_vpc_subnet_ids</code></a></td>
        <td>The subnet IDs to use for EKS worker nodes. Used when provisioning Pods on to Fargate. Required if any of the services are being scheduled on Fargate. Set to empty list if none of the Pods are being scheduled on Fargate.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <table>
        <thead>
            <tr>
              <td><b>Variable name</b></td>
              <td><b>Description</b></td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td><a name="container_logs_cloudwatch_log_group_name" href="#container_logs_cloudwatch_log_group_name" className="snap-top"><code>container_logs_cloudwatch_log_group_name</code></a></td>
        <td>Name of the CloudWatch Log Group used to store the container logs.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"f4ade37607ac71eee8ffd01a95fe89f4"}
##DOCS-SOURCER-END -->
