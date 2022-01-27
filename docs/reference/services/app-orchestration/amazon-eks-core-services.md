import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon EKS Core Services

Deploy core administrative applications on top of Amazon EC2 Kubernetes Service (EKS)

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/eks-core-services" className="link-button">View on GitHub</a>

### Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<a name="alb_ingress_controller_pod_node_affinity" className="snap-top"></a>

* [**`alb_ingress_controller_pod_node_affinity`**](#alb_ingress_controller_pod_node_affinity) &mdash; Configure affinity rules for the ALB Ingress Controller Pod to control which nodes to schedule on. Each item in the list should be a map with the keys `key`, `values`, and `operator`, corresponding to the 3 properties of matchExpressions. Note that all expressions must be satisfied to schedule on the node.

<a name="alb_ingress_controller_pod_tolerations" className="snap-top"></a>

* [**`alb_ingress_controller_pod_tolerations`**](#alb_ingress_controller_pod_tolerations) &mdash; Configure tolerations rules to allow the ALB Ingress Controller Pod to schedule on nodes that have been tainted. Each item in the list specifies a toleration rule.

<a name="autoscaler_down_delay_after_add" className="snap-top"></a>

* [**`autoscaler_down_delay_after_add`**](#autoscaler_down_delay_after_add) &mdash; Minimum time to wait after a scale up event before any node is considered for scale down.

<a name="autoscaler_scale_down_unneeded_time" className="snap-top"></a>

* [**`autoscaler_scale_down_unneeded_time`**](#autoscaler_scale_down_unneeded_time) &mdash; Minimum time to wait since the node became unused before the node is considered for scale down by the autoscaler.

<a name="autoscaler_skip_nodes_with_local_storage" className="snap-top"></a>

* [**`autoscaler_skip_nodes_with_local_storage`**](#autoscaler_skip_nodes_with_local_storage) &mdash; If true cluster autoscaler will never delete nodes with pods with local storage, e.g. EmptyDir or HostPath

<a name="aws_region" className="snap-top"></a>

* [**`aws_region`**](#aws_region) &mdash; The AWS region in which all resources will be created

<a name="cluster_autoscaler_pod_annotations" className="snap-top"></a>

* [**`cluster_autoscaler_pod_annotations`**](#cluster_autoscaler_pod_annotations) &mdash; Annotations to apply to the cluster autoscaler pod(s), as key value pairs.

<a name="cluster_autoscaler_pod_labels" className="snap-top"></a>

* [**`cluster_autoscaler_pod_labels`**](#cluster_autoscaler_pod_labels) &mdash; Labels to apply to the cluster autoscaler pod(s), as key value pairs.

<a name="cluster_autoscaler_pod_node_affinity" className="snap-top"></a>

* [**`cluster_autoscaler_pod_node_affinity`**](#cluster_autoscaler_pod_node_affinity) &mdash; Configure affinity rules for the cluster-autoscaler Pod to control which nodes to schedule on. Each item in the list should be a map with the keys `key`, `values`, and `operator`, corresponding to the 3 properties of matchExpressions. Note that all expressions must be satisfied to schedule on the node.

<a name="cluster_autoscaler_pod_resources" className="snap-top"></a>

* [**`cluster_autoscaler_pod_resources`**](#cluster_autoscaler_pod_resources) &mdash; Pod resource requests and limits to use. Refer to https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/ for more information. This is most useful for configuring CPU+Memory availability for Fargate, which defaults to 0.25 vCPU and 256MB RAM.

<a name="cluster_autoscaler_pod_tolerations" className="snap-top"></a>

* [**`cluster_autoscaler_pod_tolerations`**](#cluster_autoscaler_pod_tolerations) &mdash; Configure tolerations rules to allow the cluster-autoscaler Pod to schedule on nodes that have been tainted. Each item in the list specifies a toleration rule.

<a name="cluster_autoscaler_release_name" className="snap-top"></a>

* [**`cluster_autoscaler_release_name`**](#cluster_autoscaler_release_name) &mdash; The name to use for the helm release for cluster-autoscaler. This is useful to force a redeployment of the cluster-autoscaler component.

<a name="cluster_autoscaler_repository" className="snap-top"></a>

* [**`cluster_autoscaler_repository`**](#cluster_autoscaler_repository) &mdash; Which docker repository to use to install the cluster autoscaler. Check the following link for valid repositories to use https://github.com/kubernetes/autoscaler/releases

<a name="cluster_autoscaler_scaling_strategy" className="snap-top"></a>

* [**`cluster_autoscaler_scaling_strategy`**](#cluster_autoscaler_scaling_strategy) &mdash; Specifies an 'expander' for the cluster autoscaler. This helps determine which ASG to scale when additional resource capacity is needed.

<a name="cluster_autoscaler_version" className="snap-top"></a>

* [**`cluster_autoscaler_version`**](#cluster_autoscaler_version) &mdash; Which version of the cluster autoscaler to install. This should match the major/minor version (e.g., v1.20) of your Kubernetes Installation. See https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler#releases for a list of versions.

<a name="eks_cluster_name" className="snap-top"></a>

* [**`eks_cluster_name`**](#eks_cluster_name) &mdash; The name of the EKS cluster where the core services will be deployed into.

<a name="eks_iam_role_for_service_accounts_config" className="snap-top"></a>

* [**`eks_iam_role_for_service_accounts_config`**](#eks_iam_role_for_service_accounts_config) &mdash; Configuration for using the IAM role with Service Accounts feature to provide permissions to the applications. This expects a map with two properties: [``openid_connect_provider_arn`](#`openid_connect_provider_arn)` and [``openid_connect_provider_url`](#`openid_connect_provider_url)`. The [``openid_connect_provider_arn`](#`openid_connect_provider_arn)` is the ARN of the OpenID Connect Provider for EKS to retrieve IAM credentials, while [``openid_connect_provider_url`](#`openid_connect_provider_url)` is the URL. Set to null if you do not wish to use IAM role with Service Accounts.

<a name="enable_alb_ingress_controller" className="snap-top"></a>

* [**`enable_alb_ingress_controller`**](#enable_alb_ingress_controller) &mdash; Whether or not to enable the AWS LB Ingress controller.

<a name="enable_cluster_autoscaler" className="snap-top"></a>

* [**`enable_cluster_autoscaler`**](#enable_cluster_autoscaler) &mdash; Whether or not to enable cluster-autoscaler for Autoscaling EKS worker nodes.

<a name="enable_external_dns" className="snap-top"></a>

* [**`enable_external_dns`**](#enable_external_dns) &mdash; Whether or not to enable external-dns for DNS entry syncing with Route 53 for Services and Ingresses.

<a name="enable_fargate_fluent_bit" className="snap-top"></a>

* [**`enable_fargate_fluent_bit`**](#enable_fargate_fluent_bit) &mdash; Whether or not to enable fluent-bit on EKS Fargate workers for log aggregation.

<a name="enable_fluent_bit" className="snap-top"></a>

* [**`enable_fluent_bit`**](#enable_fluent_bit) &mdash; Whether or not to enable fluent-bit for log aggregation.

<a name="external_dns_pod_node_affinity" className="snap-top"></a>

* [**`external_dns_pod_node_affinity`**](#external_dns_pod_node_affinity) &mdash; Configure affinity rules for the external-dns Pod to control which nodes to schedule on. Each item in the list should be a map with the keys `key`, `values`, and `operator`, corresponding to the 3 properties of matchExpressions. Note that all expressions must be satisfied to schedule on the node.

<a name="external_dns_pod_tolerations" className="snap-top"></a>

* [**`external_dns_pod_tolerations`**](#external_dns_pod_tolerations) &mdash; Configure tolerations rules to allow the external-dns Pod to schedule on nodes that have been tainted. Each item in the list specifies a toleration rule.

<a name="external_dns_route53_hosted_zone_domain_filters" className="snap-top"></a>

* [**`external_dns_route53_hosted_zone_domain_filters`**](#external_dns_route53_hosted_zone_domain_filters) &mdash; Only create records in hosted zones that match the provided domain names. Empty list (default) means match all zones. Zones must satisfy all three constraints [`(var.external_dns_route53_hosted_zone_tag_filters`](#(var.external_dns_route53_hosted_zone_tag_filters), [`external_dns_route53_hosted_zone_id_filters`](#external_dns_route53_hosted_zone_id_filters), and [`external_dns_route53_hosted_zone_domain_filters`](#external_dns_route53_hosted_zone_domain_filters)).

<a name="external_dns_route53_hosted_zone_id_filters" className="snap-top"></a>

* [**`external_dns_route53_hosted_zone_id_filters`**](#external_dns_route53_hosted_zone_id_filters) &mdash; Only create records in hosted zones that match the provided IDs. Empty list (default) means match all zones. Zones must satisfy all three constraints [`(var.external_dns_route53_hosted_zone_tag_filters`](#(var.external_dns_route53_hosted_zone_tag_filters), [`external_dns_route53_hosted_zone_id_filters`](#external_dns_route53_hosted_zone_id_filters), and [`external_dns_route53_hosted_zone_domain_filters`](#external_dns_route53_hosted_zone_domain_filters)).

<a name="external_dns_route53_hosted_zone_tag_filters" className="snap-top"></a>

* [**`external_dns_route53_hosted_zone_tag_filters`**](#external_dns_route53_hosted_zone_tag_filters) &mdash; Only create records in hosted zones that match the provided tags. Each item in the list should specify tag key and tag value as a map. Empty list (default) means match all zones. Zones must satisfy all three constraints [`(var.external_dns_route53_hosted_zone_tag_filters`](#(var.external_dns_route53_hosted_zone_tag_filters), [`external_dns_route53_hosted_zone_id_filters`](#external_dns_route53_hosted_zone_id_filters), and [`external_dns_route53_hosted_zone_domain_filters`](#external_dns_route53_hosted_zone_domain_filters)).

<a name="external_dns_sources" className="snap-top"></a>

* [**`external_dns_sources`**](#external_dns_sources) &mdash; K8s resources type to be observed for new DNS entries by ExternalDNS.

<a name="fargate_fluent_bit_execution_iam_role_arns" className="snap-top"></a>

* [**`fargate_fluent_bit_execution_iam_role_arns`**](#fargate_fluent_bit_execution_iam_role_arns) &mdash; List of ARNs of Fargate execution IAM Roles that should get permissions to ship logs using fluent-bit. This must be provided if [`enable_fargate_fluent_bit`](#enable_fargate_fluent_bit) is true.

<a name="fargate_fluent_bit_extra_filters" className="snap-top"></a>

* [**`fargate_fluent_bit_extra_filters`**](#fargate_fluent_bit_extra_filters) &mdash; Additional filters that fluent-bit should apply to log output. This string should be formatted according to the Fluent-bit docs [`(https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/configuration-file#config_filter`](#(https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/configuration-file#config_filter)).

<a name="fargate_fluent_bit_extra_parsers" className="snap-top"></a>

* [**`fargate_fluent_bit_extra_parsers`**](#fargate_fluent_bit_extra_parsers) &mdash; Additional parsers that fluent-bit should export logs to. This string should be formatted according to the Fluent-bit docs [`(https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/configuration-file#config_output`](#(https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/configuration-file#config_output)).

<a name="fargate_fluent_bit_log_stream_prefix" className="snap-top"></a>

* [**`fargate_fluent_bit_log_stream_prefix`**](#fargate_fluent_bit_log_stream_prefix) &mdash; Prefix string to use for the CloudWatch Log Stream that gets created for each Fargate pod.

<a name="fargate_worker_disallowed_availability_zones" className="snap-top"></a>

* [**`fargate_worker_disallowed_availability_zones`**](#fargate_worker_disallowed_availability_zones) &mdash; A list of availability zones in the region that we CANNOT use to deploy the EKS Fargate workers. You can use this to avoid availability zones that may not be able to provision the resources (e.g ran out of capacity). If empty, will allow all availability zones.

<a name="fluent_bit_extra_filters" className="snap-top"></a>

* [**`fluent_bit_extra_filters`**](#fluent_bit_extra_filters) &mdash; Additional filters that fluent-bit should apply to log output. This string should be formatted according to the Fluent-bit docs [`(https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/configuration-file#config_filter`](#(https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/configuration-file#config_filter)).

<a name="fluent_bit_extra_outputs" className="snap-top"></a>

* [**`fluent_bit_extra_outputs`**](#fluent_bit_extra_outputs) &mdash; Additional output streams that fluent-bit should export logs to. This string should be formatted according to the Fluent-bit docs [`(https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/configuration-file#config_output`](#(https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/configuration-file#config_output)).

<a name="fluent_bit_log_group_already_exists" className="snap-top"></a>

* [**`fluent_bit_log_group_already_exists`**](#fluent_bit_log_group_already_exists) &mdash; If set to true, that means that the CloudWatch Log Group fluent-bit should use for streaming logs already exists and does not need to be created.

<a name="fluent_bit_log_group_kms_key_id" className="snap-top"></a>

* [**`fluent_bit_log_group_kms_key_id`**](#fluent_bit_log_group_kms_key_id) &mdash; The ARN of the KMS key to use to encrypt the logs in the CloudWatch Log Group used for storing container logs streamed with FluentBit. Set to null to disable encryption.

<a name="fluent_bit_log_group_name" className="snap-top"></a>

* [**`fluent_bit_log_group_name`**](#fluent_bit_log_group_name) &mdash; Name of the CloudWatch Log Group fluent-bit should use to stream logs to. When null (default), uses the [`eks_cluster_name`](#eks_cluster_name) as the Log Group name.

<a name="fluent_bit_log_group_retention" className="snap-top"></a>

* [**`fluent_bit_log_group_retention`**](#fluent_bit_log_group_retention) &mdash; number of days to retain log events. Possible values are: 1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1827, 3653, and 0. Select 0 to never expire.

<a name="fluent_bit_log_stream_prefix" className="snap-top"></a>

* [**`fluent_bit_log_stream_prefix`**](#fluent_bit_log_stream_prefix) &mdash; Prefix string to use for the CloudWatch Log Stream that gets created for each pod. When null (default), the prefix is set to 'fluentbit'.

<a name="fluent_bit_pod_node_affinity" className="snap-top"></a>

* [**`fluent_bit_pod_node_affinity`**](#fluent_bit_pod_node_affinity) &mdash; Configure affinity rules for the fluent-bit Pods to control which nodes to schedule on. Each item in the list should be a map with the keys `key`, `values`, and `operator`, corresponding to the 3 properties of matchExpressions. Note that all expressions must be satisfied to schedule on the node.

<a name="fluent_bit_pod_tolerations" className="snap-top"></a>

* [**`fluent_bit_pod_tolerations`**](#fluent_bit_pod_tolerations) &mdash; Configure tolerations rules to allow the fluent-bit Pods to schedule on nodes that have been tainted. Each item in the list specifies a toleration rule.

<a name="pod_execution_iam_role_arn" className="snap-top"></a>

* [**`pod_execution_iam_role_arn`**](#pod_execution_iam_role_arn) &mdash; ARN of IAM Role to use as the Pod execution role for Fargate. Required if any of the services are being scheduled on Fargate. Set to null if none of the Pods are being scheduled on Fargate.

<a name="route53_record_update_policy" className="snap-top"></a>

* [**`route53_record_update_policy`**](#route53_record_update_policy) &mdash; Policy for how DNS records are sychronized between sources and providers (options: sync, upsert-only).

<a name="schedule_alb_ingress_controller_on_fargate" className="snap-top"></a>

* [**`schedule_alb_ingress_controller_on_fargate`**](#schedule_alb_ingress_controller_on_fargate) &mdash; When true, the ALB ingress controller pods will be scheduled on Fargate.

<a name="schedule_cluster_autoscaler_on_fargate" className="snap-top"></a>

* [**`schedule_cluster_autoscaler_on_fargate`**](#schedule_cluster_autoscaler_on_fargate) &mdash; When true, the cluster autoscaler pods will be scheduled on Fargate. It is recommended to run the cluster autoscaler on Fargate to avoid the autoscaler scaling down a node where it is running (and thus shutting itself down during a scale down event). However, since Fargate is only supported on a handful of regions, we don't default to true here.

<a name="schedule_external_dns_on_fargate" className="snap-top"></a>

* [**`schedule_external_dns_on_fargate`**](#schedule_external_dns_on_fargate) &mdash; When true, the external-dns pods will be scheduled on Fargate.

<a name="service_dns_mappings" className="snap-top"></a>

* [**`service_dns_mappings`**](#service_dns_mappings) &mdash; Configure Kubernetes Services to lookup external DNS records. This can be useful to bind friendly internal service names to domains (e.g. the RDS database endpoint).

<a name="use_exec_plugin_for_auth" className="snap-top"></a>

* [**`use_exec_plugin_for_auth`**](#use_exec_plugin_for_auth) &mdash; If this variable is set to true, then use an exec-based plugin to authenticate and fetch tokens for EKS. This is useful because EKS clusters use short-lived authentication tokens that can expire in the middle of an 'apply' or 'destroy', and since the native Kubernetes provider in Terraform doesn't have a way to fetch up-to-date tokens, we recommend using an exec-based provider as a workaround. Use the [`use_kubergrunt_to_fetch_token`](#use_kubergrunt_to_fetch_token) input variable to control whether kubergrunt or aws is used to fetch tokens.

<a name="use_kubergrunt_to_fetch_token" className="snap-top"></a>

* [**`use_kubergrunt_to_fetch_token`**](#use_kubergrunt_to_fetch_token) &mdash; EKS clusters use short-lived authentication tokens that can expire in the middle of an 'apply' or 'destroy'. To avoid this issue, we use an exec-based plugin to fetch an up-to-date token. If this variable is set to true, we'll use kubergrunt to fetch the token (in which case, kubergrunt must be installed and on PATH); if this variable is set to false, we'll use the aws CLI to fetch the token (in which case, aws must be installed and on PATH). Note this functionality is only enabled if [`use_exec_plugin_for_auth`](#use_exec_plugin_for_auth) is set to true.

<a name="vpc_id" className="snap-top"></a>

* [**`vpc_id`**](#vpc_id) &mdash; The ID of the VPC where the EKS cluster is deployed.

<a name="worker_vpc_subnet_ids" className="snap-top"></a>

* [**`worker_vpc_subnet_ids`**](#worker_vpc_subnet_ids) &mdash; The subnet IDs to use for EKS worker nodes. Used when provisioning Pods on to Fargate. Required if any of the services are being scheduled on Fargate. Set to empty list if none of the Pods are being scheduled on Fargate.

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="container_logs_cloudwatch_log_group_name" className="snap-top"></a>

* [**`container_logs_cloudwatch_log_group_name`**](#container_logs_cloudwatch_log_group_name) &mdash; Name of the CloudWatch Log Group used to store the container logs.

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"8adf4fe7421ff047d2c90b864e1e2953"}
##DOCS-SOURCER-END -->
