import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon EKS

Deploy Kubernetes on top of Amazon Elastic Kubernetes Service (EKS)

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/eks-cluster" class="link-button">View on GitHub</a>

### Reference 
              
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
        <td>additional_security_groups</td>
        <td>A list of additional security group IDs to attach to the control plane.</td>
    </tr><tr>
        <td>alarms_sns_topic_arn</td>
        <td>The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications.</td>
    </tr><tr>
        <td>allow_inbound_api_access_from_cidr_blocks</td>
        <td>The list of CIDR blocks to allow inbound access to the Kubernetes API.</td>
    </tr><tr>
        <td>allow_inbound_ssh_from_cidr_blocks</td>
        <td>The list of CIDR blocks to allow inbound SSH access to the worker groups.</td>
    </tr><tr>
        <td>allow_inbound_ssh_from_security_groups</td>
        <td>The list of security group IDs to allow inbound SSH access to the worker groups.</td>
    </tr><tr>
        <td>allow_private_api_access_from_cidr_blocks</td>
        <td>The list of CIDR blocks to allow inbound access to the private Kubernetes API endpoint (e.g. the endpoint within the VPC, not the public endpoint).</td>
    </tr><tr>
        <td>allow_private_api_access_from_security_groups</td>
        <td>The list of security groups to allow inbound access to the private Kubernetes API endpoint (e.g. the endpoint within the VPC, not the public endpoint).</td>
    </tr><tr>
        <td>asg_default_instance_root_volume_encryption</td>
        <td>Default value for the asg_instance_root_volume_encryption field of autoscaling_group_configurations. Any map entry that does not specify asg_instance_root_volume_encryption will use this value.</td>
    </tr><tr>
        <td>asg_default_instance_root_volume_size</td>
        <td>Default value for the asg_instance_root_volume_size field of autoscaling_group_configurations. Any map entry that does not specify asg_instance_root_volume_size will use this value.</td>
    </tr><tr>
        <td>asg_default_instance_root_volume_type</td>
        <td>Default value for the asg_instance_root_volume_type field of autoscaling_group_configurations. Any map entry that does not specify asg_instance_root_volume_type will use this value.</td>
    </tr><tr>
        <td>asg_default_instance_type</td>
        <td>Default value for the asg_instance_type field of autoscaling_group_configurations. Any map entry that does not specify asg_instance_type will use this value.</td>
    </tr><tr>
        <td>asg_default_max_size</td>
        <td>Default value for the max_size field of autoscaling_group_configurations. Any map entry that does not specify max_size will use this value.</td>
    </tr><tr>
        <td>asg_default_min_size</td>
        <td>Default value for the min_size field of autoscaling_group_configurations. Any map entry that does not specify min_size will use this value.</td>
    </tr><tr>
        <td>asg_default_multi_instance_overrides</td>
        <td>Default value for the multi_instance_overrides field of autoscaling_group_configurations. Any map entry that does not specify multi_instance_overrides will use this value.</td>
    </tr><tr>
        <td>asg_default_on_demand_allocation_strategy</td>
        <td>Default value for the on_demand_allocation_strategy field of autoscaling_group_configurations. Any map entry that does not specify on_demand_allocation_strategy will use this value.</td>
    </tr><tr>
        <td>asg_default_on_demand_base_capacity</td>
        <td>Default value for the on_demand_base_capacity field of autoscaling_group_configurations. Any map entry that does not specify on_demand_base_capacity will use this value.</td>
    </tr><tr>
        <td>asg_default_on_demand_percentage_above_base_capacity</td>
        <td>Default value for the on_demand_percentage_above_base_capacity field of autoscaling_group_configurations. Any map entry that does not specify on_demand_percentage_above_base_capacity will use this value.</td>
    </tr><tr>
        <td>asg_default_spot_allocation_strategy</td>
        <td>Default value for the spot_allocation_strategy field of autoscaling_group_configurations. Any map entry that does not specify spot_allocation_strategy will use this value.</td>
    </tr><tr>
        <td>asg_default_spot_instance_pools</td>
        <td>Default value for the spot_instance_pools field of autoscaling_group_configurations. Any map entry that does not specify spot_instance_pools will use this value.</td>
    </tr><tr>
        <td>asg_default_spot_max_price</td>
        <td>Default value for the spot_max_price field of autoscaling_group_configurations. Any map entry that does not specify spot_max_price will use this value. Set to empty string (default) to mean on-demand price.</td>
    </tr><tr>
        <td>asg_default_tags</td>
        <td>Default value for the tags field of autoscaling_group_configurations. Any map entry that does not specify tags will use this value.</td>
    </tr><tr>
        <td>asg_default_use_multi_instances_policy</td>
        <td>Default value for the use_multi_instances_policy field of autoscaling_group_configurations. Any map entry that does not specify use_multi_instances_policy will use this value.</td>
    </tr><tr>
        <td>asg_iam_instance_profile_name</td>
        <td>Custom name for the IAM instance profile for the Self-managed workers. When null, the IAM role name will be used. If var.asg_use_resource_name_prefix is true, this will be used as a name prefix.</td>
    </tr><tr>
        <td>asg_iam_permissions_boundary</td>
        <td>ARN of a permission boundary to apply on the IAM role created for the self managed workers.</td>
    </tr><tr>
        <td>asg_security_group_tags</td>
        <td>A map of tags to apply to the Security Group of the ASG for the self managed worker pool. The key is the tag name and the value is the tag value.</td>
    </tr><tr>
        <td>asg_use_resource_name_prefix</td>
        <td>When true, all the relevant resources for self managed workers will be set to use the name_prefix attribute so that unique names are generated for them. This allows those resources to support recreation through create_before_destroy lifecycle rules. Set to false if you were using any version before 0.65.0 and wish to avoid recreating the entire worker pool on your cluster.</td>
    </tr><tr>
        <td>autoscaling_group_configurations</td>
        <td>Configure one or more Auto Scaling Groups (ASGs) to manage the EC2 instances in this cluster. If any of the values are not provided, the specified default variable will be used to lookup a default value.</td>
    </tr><tr>
        <td>autoscaling_group_include_autoscaler_discovery_tags</td>
        <td>Adds additional tags to each ASG that allow a cluster autoscaler to auto-discover them.</td>
    </tr><tr>
        <td>aws_auth_merger_default_configmap_name</td>
        <td>Name of the default aws-auth ConfigMap to use. This will be the name of the ConfigMap that gets created by this module in the aws-auth-merger namespace to seed the initial aws-auth ConfigMap.</td>
    </tr><tr>
        <td>aws_auth_merger_image</td>
        <td>Location of the container image to use for the aws-auth-merger app. You can use the Dockerfile provided in terraform-aws-eks to construct an image. See https://github.com/gruntwork-io/terraform-aws-eks/blob/master/modules/eks-aws-auth-merger/core-concepts.md#how-do-i-use-the-aws-auth-merger for more info.</td>
    </tr><tr>
        <td>aws_auth_merger_namespace</td>
        <td>Namespace to deploy the aws-auth-merger into. The app will watch for ConfigMaps in this Namespace to merge into the aws-auth ConfigMap.</td>
    </tr><tr>
        <td>cloud_init_parts</td>
        <td>Cloud init scripts to run on the EKS worker nodes when it is booting. See the part blocks in https://www.terraform.io/docs/providers/template/d/cloudinit_config.html for syntax. To override the default boot script installed as part of the module, use the key `default`.</td>
    </tr><tr>
        <td>cluster_iam_role_permissions_boundary</td>
        <td>ARN of permissions boundary to apply to the cluster IAM role - the IAM role created for the EKS cluster.</td>
    </tr><tr>
        <td>cluster_instance_ami</td>
        <td>The AMI to run on each instance in the EKS cluster. You can build the AMI using the Packer template eks-node-al2.json. One of var.cluster_instance_ami or var.cluster_instance_ami_filters is required. Only used if var.cluster_instance_ami_filters is null. Set to null if cluster_instance_ami_filters is set.</td>
    </tr><tr>
        <td>cluster_instance_ami_filters</td>
        <td>Properties on the AMI that can be used to lookup a prebuilt AMI for use with self managed workers. You can build the AMI using the Packer template eks-node-al2.json. One of var.cluster_instance_ami or var.cluster_instance_ami_filters is required. If both are defined, var.cluster_instance_ami_filters will be used. Set to null if cluster_instance_ami is set.</td>
    </tr><tr>
        <td>cluster_instance_associate_public_ip_address</td>
        <td>Whether or not to associate a public IP address to the instances of the self managed ASGs. Will only work if the instances are launched in a public subnet.</td>
    </tr><tr>
        <td>cluster_instance_keypair_name</td>
        <td>The name of the Key Pair that can be used to SSH to each instance in the EKS cluster</td>
    </tr><tr>
        <td>cluster_name</td>
        <td>The name of the EKS cluster</td>
    </tr><tr>
        <td>control_plane_disallowed_availability_zones</td>
        <td>A list of availability zones in the region that we CANNOT use to deploy the EKS control plane. You can use this to avoid availability zones that may not be able to provision the resources (e.g ran out of capacity). If empty, will allow all availability zones.</td>
    </tr><tr>
        <td>control_plane_vpc_subnet_ids</td>
        <td>List of IDs of the subnets that can be used for the EKS Control Plane.</td>
    </tr><tr>
        <td>create_default_fargate_iam_role</td>
        <td>When true, IAM role will be created and attached to Fargate control plane services.</td>
    </tr><tr>
        <td>custom_default_fargate_iam_role_name</td>
        <td>The name to use for the default Fargate execution IAM role that is created when create_default_fargate_iam_role is true. When null, defaults to CLUSTER_NAME-fargate-role.</td>
    </tr><tr>
        <td>custom_worker_egress_security_group_rules</td>
        <td>A map of unique identifiers to egress security group rules to attach to the worker groups.</td>
    </tr><tr>
        <td>custom_worker_ingress_security_group_rules</td>
        <td>A map of unique identifiers to ingress security group rules to attach to the worker groups.</td>
    </tr><tr>
        <td>dashboard_cpu_usage_widget_parameters</td>
        <td>Parameters for the worker cpu usage widget to output for use in a CloudWatch dashboard.</td>
    </tr><tr>
        <td>dashboard_disk_usage_widget_parameters</td>
        <td>Parameters for the worker disk usage widget to output for use in a CloudWatch dashboard.</td>
    </tr><tr>
        <td>dashboard_memory_usage_widget_parameters</td>
        <td>Parameters for the worker memory usage widget to output for use in a CloudWatch dashboard.</td>
    </tr><tr>
        <td>eks_cluster_security_group_tags</td>
        <td>A map of custom tags to apply to the Security Group for the EKS Cluster Control Plane. The key is the tag name and the value is the tag value.</td>
    </tr><tr>
        <td>eks_cluster_tags</td>
        <td>A map of custom tags to apply to the EKS Cluster Control Plane. The key is the tag name and the value is the tag value.</td>
    </tr><tr>
        <td>enable_aws_auth_merger</td>
        <td>If set to true, installs the aws-auth-merger to manage the aws-auth configuration. When true, requires setting the var.aws_auth_merger_image variable.</td>
    </tr><tr>
        <td>enable_aws_auth_merger_fargate</td>
        <td>When true, deploy the aws-auth-merger into Fargate. It is recommended to run the aws-auth-merger on Fargate to avoid chicken and egg issues between the aws-auth-merger and having an authenticated worker pool.</td>
    </tr><tr>
        <td>enable_cloudwatch_alarms</td>
        <td>Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using var.alarms_sns_topic_arn.</td>
    </tr><tr>
        <td>enable_cloudwatch_metrics</td>
        <td>Set to true to add IAM permissions to send custom metrics to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent to get memory and disk metrics in CloudWatch for your Bastion host.</td>
    </tr><tr>
        <td>enable_fail2ban</td>
        <td>Enable fail2ban to block brute force log in attempts. Defaults to true.</td>
    </tr><tr>
        <td>enabled_control_plane_log_types</td>
        <td>A list of the desired control plane logging to enable. See https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html for the list of available logs.</td>
    </tr><tr>
        <td>endpoint_public_access</td>
        <td>Whether or not to enable public API endpoints which allow access to the Kubernetes API from outside of the VPC. Note that private access within the VPC is always enabled.</td>
    </tr><tr>
        <td>external_account_ssh_grunt_role_arn</td>
        <td>If you are using ssh-grunt and your IAM users / groups are defined in a separate AWS account, you can use this variable to specify the ARN of an IAM role that ssh-grunt can assume to retrieve IAM group and public SSH key info from that account. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).</td>
    </tr><tr>
        <td>fargate_profile_executor_iam_role_arns_for_k8s_role_mapping</td>
        <td>List of ARNs of AWS IAM roles corresponding to Fargate Profiles that should be mapped as Kubernetes Nodes.</td>
    </tr><tr>
        <td>fargate_worker_disallowed_availability_zones</td>
        <td>A list of availability zones in the region that we CANNOT use to deploy the EKS Fargate workers. You can use this to avoid availability zones that may not be able to provision the resources (e.g ran out of capacity). If empty, will allow all availability zones.</td>
    </tr><tr>
        <td>iam_role_to_rbac_group_mapping</td>
        <td>Mapping of IAM role ARNs to Kubernetes RBAC groups that grant permissions to the user.</td>
    </tr><tr>
        <td>iam_user_to_rbac_group_mapping</td>
        <td>Mapping of IAM user ARNs to Kubernetes RBAC groups that grant permissions to the user.</td>
    </tr><tr>
        <td>kubernetes_version</td>
        <td>Version of Kubernetes to use. Refer to EKS docs for list of available versions (https://docs.aws.amazon.com/eks/latest/userguide/platform-versions.html).</td>
    </tr><tr>
        <td>managed_node_group_configurations</td>
        <td>Configure one or more Node Groups to manage the EC2 instances in this cluster. Set to empty object ({}) if you do not wish to configure managed node groups.</td>
    </tr><tr>
        <td>node_group_default_capacity_type</td>
        <td>Default value for capacity_type field of managed_node_group_configurations.</td>
    </tr><tr>
        <td>node_group_default_desired_size</td>
        <td>Default value for desired_size field of managed_node_group_configurations.</td>
    </tr><tr>
        <td>node_group_default_instance_root_volume_encryption</td>
        <td>Default value for the instance_root_volume_encryption field of managed_node_group_configurations.</td>
    </tr><tr>
        <td>node_group_default_instance_root_volume_size</td>
        <td>Default value for the instance_root_volume_size field of managed_node_group_configurations.</td>
    </tr><tr>
        <td>node_group_default_instance_root_volume_type</td>
        <td>Default value for the instance_root_volume_type field of managed_node_group_configurations.</td>
    </tr><tr>
        <td>node_group_default_instance_types</td>
        <td>Default value for instance_types field of managed_node_group_configurations.</td>
    </tr><tr>
        <td>node_group_default_labels</td>
        <td>Default value for labels field of managed_node_group_configurations. Unlike common_labels which will always be merged in, these labels are only used if the labels field is omitted from the configuration.</td>
    </tr><tr>
        <td>node_group_default_max_size</td>
        <td>Default value for max_size field of managed_node_group_configurations.</td>
    </tr><tr>
        <td>node_group_default_min_size</td>
        <td>Default value for min_size field of managed_node_group_configurations.</td>
    </tr><tr>
        <td>node_group_default_subnet_ids</td>
        <td>Default value for subnet_ids field of managed_node_group_configurations.</td>
    </tr><tr>
        <td>node_group_default_tags</td>
        <td>Default value for tags field of managed_node_group_configurations. Unlike common_tags which will always be merged in, these tags are only used if the tags field is omitted from the configuration.</td>
    </tr><tr>
        <td>node_group_iam_permissions_boundary</td>
        <td>ARN of a permission boundary to apply on the IAM role created for the managed node groups.</td>
    </tr><tr>
        <td>node_group_launch_template_instance_type</td>
        <td>The instance type to configure in the launch template. This value will be used when the instance_types field is set to null (NOT omitted, in which case var.node_group_default_instance_types will be used).</td>
    </tr><tr>
        <td>node_group_security_group_tags</td>
        <td>A map of tags to apply to the Security Group of the ASG for the managed node group pool. The key is the tag name and the value is the tag value.</td>
    </tr><tr>
        <td>num_control_plane_vpc_subnet_ids</td>
        <td>Number of subnets provided in the var.control_plane_vpc_subnet_ids variable. When null (default), this is computed dynamically from the list. This is used to workaround terraform limitations where resource count and for_each can not depend on dynamic resources (e.g., if you are creating the subnets and the EKS cluster in the same module).</td>
    </tr><tr>
        <td>num_worker_vpc_subnet_ids</td>
        <td>Number of subnets provided in the var.worker_vpc_subnet_ids variable. When null (default), this is computed dynamically from the list. This is used to workaround terraform limitations where resource count and for_each can not depend on dynamic resources (e.g., if you are creating the subnets and the EKS cluster in the same module).</td>
    </tr><tr>
        <td>schedule_control_plane_services_on_fargate</td>
        <td>When true, configures control plane services to run on Fargate so that the cluster can run without worker nodes. If true, requires kubergrunt to be available on the system, and create_default_fargate_iam_role be set to true.</td>
    </tr><tr>
        <td>secret_envelope_encryption_kms_key_arn</td>
        <td>ARN for KMS Key to use for envelope encryption of Kubernetes Secrets. By default Secrets in EKS are encrypted at rest at the EBS layer in the managed etcd cluster using shared AWS managed keys. Setting this variable will configure Kubernetes to use envelope encryption to encrypt Secrets using this KMS key on top of the EBS layer encryption.</td>
    </tr><tr>
        <td>ssh_grunt_iam_group</td>
        <td>If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the EKS workers. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).</td>
    </tr><tr>
        <td>ssh_grunt_iam_group_sudo</td>
        <td>If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the EKS workers with sudo permissions. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).</td>
    </tr><tr>
        <td>tenancy</td>
        <td>The tenancy of this server. Must be one of: default, dedicated, or host.</td>
    </tr><tr>
        <td>use_exec_plugin_for_auth</td>
        <td>If this variable is set to true, then use an exec-based plugin to authenticate and fetch tokens for EKS. This is useful because EKS clusters use short-lived authentication tokens that can expire in the middle of an 'apply' or 'destroy', and since the native Kubernetes provider in Terraform doesn't have a way to fetch up-to-date tokens, we recommend using an exec-based provider as a workaround. Use the use_kubergrunt_to_fetch_token input variable to control whether kubergrunt or aws is used to fetch tokens.</td>
    </tr><tr>
        <td>use_kubergrunt_sync_components</td>
        <td>When set to true, this will enable kubergrunt based component syncing. This step ensures that the core EKS components that are installed are upgraded to a matching version everytime the cluster's Kubernetes version is updated.</td>
    </tr><tr>
        <td>use_kubergrunt_to_fetch_token</td>
        <td>EKS clusters use short-lived authentication tokens that can expire in the middle of an 'apply' or 'destroy'. To avoid this issue, we use an exec-based plugin to fetch an up-to-date token. If this variable is set to true, we'll use kubergrunt to fetch the token (in which case, kubergrunt must be installed and on PATH); if this variable is set to false, we'll use the aws CLI to fetch the token (in which case, aws must be installed and on PATH). Note this functionality is only enabled if use_exec_plugin_for_auth is set to true.</td>
    </tr><tr>
        <td>use_kubergrunt_verification</td>
        <td>When set to true, this will enable kubergrunt verification to wait for the Kubernetes API server to come up before completing. If false, reverts to a 30 second timed wait instead.</td>
    </tr><tr>
        <td>vpc_id</td>
        <td>ID of the VPC where the EKS resources will be deployed.</td>
    </tr><tr>
        <td>worker_iam_role_arns_for_k8s_role_mapping</td>
        <td>List of ARNs of AWS IAM roles corresponding to EC2 instances that should be mapped as Kubernetes Nodes.</td>
    </tr><tr>
        <td>worker_name_prefix</td>
        <td>Prefix EKS worker resource names with this string. When you have multiple worker groups for the cluster, you can use this to namespace the resources. Defaults to empty string so that resource names are not excessively long by default.</td>
    </tr><tr>
        <td>worker_vpc_subnet_ids</td>
        <td>A list of the subnets into which the EKS Cluster's administrative pods will be launched. These should usually be all private subnets and include one in each AWS Availability Zone. Required when var.schedule_control_plane_services_on_fargate is true.</td>
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
            <tr>
        <td>aws_auth_merger_namespace</td>
        <td>The namespace name for the aws-auth-merger add on, if created.</td>
    </tr><tr>
        <td>eks_cluster_arn</td>
        <td>The ARN of the EKS cluster that was deployed.</td>
    </tr><tr>
        <td>eks_cluster_name</td>
        <td>The name of the EKS cluster that was deployed.</td>
    </tr><tr>
        <td>eks_default_fargate_execution_role_arn</td>
        <td>A basic IAM Role ARN that has the minimal permissions to pull images from ECR that can be used for most Pods as Fargate Execution Role that do not need to interact with AWS.</td>
    </tr><tr>
        <td>eks_iam_role_for_service_accounts_config</td>
        <td>Configuration for using the IAM role with Service Accounts feature to provide permissions to the applications. This outputs a map with two properties: `openid_connect_provider_arn` and `openid_connect_provider_url`. The `openid_connect_provider_arn` is the ARN of the OpenID Connect Provider for EKS to retrieve IAM credentials, while `openid_connect_provider_url` is the URL.</td>
    </tr><tr>
        <td>eks_kubeconfig</td>
        <td>Minimal configuration for kubectl to authenticate with the created EKS cluster.</td>
    </tr><tr>
        <td>eks_worker_asg_names</td>
        <td>The list of names of the ASGs that were deployed to act as EKS workers.</td>
    </tr><tr>
        <td>managed_node_group_worker_iam_role_arn</td>
        <td>The ARN of the IAM role associated with the Managed Node Group EKS workers.</td>
    </tr><tr>
        <td>managed_node_group_worker_iam_role_name</td>
        <td>The name of the IAM role associated with the Managed Node Group EKS workers.</td>
    </tr><tr>
        <td>metric_widget_worker_cpu_usage</td>
        <td>A CloudWatch Dashboard widget that graphs CPU usage (percentage) of the EKS workers (self-managed and managed node groups).</td>
    </tr><tr>
        <td>metric_widget_worker_disk_usage</td>
        <td>A CloudWatch Dashboard widget that graphs disk usage (percentage) of the EKS workers (self-managed and managed node groups).</td>
    </tr><tr>
        <td>metric_widget_worker_memory_usage</td>
        <td>A CloudWatch Dashboard widget that graphs memory usage (percentage) of the EKS workers (self-managed and managed node groups).</td>
    </tr><tr>
        <td>self_managed_worker_iam_role_arn</td>
        <td>The ARN of the IAM role associated with the self-managed EKS workers.</td>
    </tr><tr>
        <td>self_managed_worker_iam_role_name</td>
        <td>The name of the IAM role associated with the self-managed EKS workers.</td>
    </tr><tr>
        <td>self_managed_worker_security_group_id</td>
        <td>The ID of the AWS Security Group associated with the self-managed EKS workers.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"44b372f3d5e99ed9b9320198f2913bd4"}
##DOCS-SOURCER-END -->
