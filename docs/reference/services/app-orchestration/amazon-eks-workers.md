import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon EKS Workers

Deploy EC2 instances as Kubernetes workers for Amazon Elastic Kubernetes Service (EKS)

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/eks-workers" class="link-button">View on GitHub</a>

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
        <td>alarms_sns_topic_arn</td>
        <td>The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications.</td>
    </tr><tr>
        <td>allow_inbound_ssh_from_cidr_blocks</td>
        <td>The list of CIDR blocks to allow inbound SSH access to the worker groups.</td>
    </tr><tr>
        <td>allow_inbound_ssh_from_security_groups</td>
        <td>The list of security group IDs to allow inbound SSH access to the worker groups.</td>
    </tr><tr>
        <td>asg_custom_iam_role_name</td>
        <td>Custom name for the IAM role for the Self-managed workers. When null, a default name based on worker_name_prefix will be used. One of asg_custom_iam_role_name and asg_iam_role_arn is required (must be non-null) if asg_iam_role_already_exists is true.</td>
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
        <td>asg_iam_role_already_exists</td>
        <td>Whether or not the IAM role used for the Self-managed workers already exists. When false, this module will create a new IAM role.</td>
    </tr><tr>
        <td>asg_iam_role_arn</td>
        <td>ARN of the IAM role to use if iam_role_already_exists = true. When null, uses asg_custom_iam_role_name to lookup the ARN. One of asg_custom_iam_role_name and asg_iam_role_arn is required (must be non-null) if asg_iam_role_already_exists is true.</td>
    </tr><tr>
        <td>asg_security_group_tags</td>
        <td>A map of tags to apply to the Security Group of the ASG for the self managed worker pool. The key is the tag name and the value is the tag value.</td>
    </tr><tr>
        <td>asg_use_resource_name_prefix</td>
        <td>When true, all the relevant resources for self managed workers will be set to use the name_prefix attribute so that unique names are generated for them. This allows those resources to support recreation through create_before_destroy lifecycle rules. Set to false if you were using any version before 0.65.0 and wish to avoid recreating the entire worker pool on your cluster.</td>
    </tr><tr>
        <td>autoscaling_group_configurations</td>
        <td>Configure one or more self-managed Auto Scaling Groups (ASGs) to manage the EC2 instances in this cluster. Set to empty object ({}) if you do not wish to configure self-managed ASGs.</td>
    </tr><tr>
        <td>autoscaling_group_include_autoscaler_discovery_tags</td>
        <td>Adds additional tags to each ASG that allow a cluster autoscaler to auto-discover them. Only used for self-managed workers.</td>
    </tr><tr>
        <td>aws_auth_merger_namespace</td>
        <td>Namespace where the AWS Auth Merger is deployed. If configured, the worker IAM role will be mapped to the Kubernetes RBAC group for Nodes using a ConfigMap in the auth merger namespace.</td>
    </tr><tr>
        <td>cloud_init_parts</td>
        <td>Cloud init scripts to run on the EKS worker nodes when it is booting. See the part blocks in https://www.terraform.io/docs/providers/template/d/cloudinit_config.html for syntax. To override the default boot script installed as part of the module, use the key `default`.</td>
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
        <td>The name of the Key Pair that can be used to SSH to each instance in the EKS cluster.</td>
    </tr><tr>
        <td>custom_egress_security_group_rules</td>
        <td>A map of unique identifiers to egress security group rules to attach to the worker groups.</td>
    </tr><tr>
        <td>custom_ingress_security_group_rules</td>
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
        <td>eks_cluster_name</td>
        <td>The name of the EKS cluster. The cluster must exist/already be deployed.</td>
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
        <td>external_account_ssh_grunt_role_arn</td>
        <td>If you are using ssh-grunt and your IAM users / groups are defined in a separate AWS account, you can use this variable to specify the ARN of an IAM role that ssh-grunt can assume to retrieve IAM group and public SSH key info from that account. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).</td>
    </tr><tr>
        <td>managed_node_group_configurations</td>
        <td>Configure one or more Node Groups to manage the EC2 instances in this cluster. Set to empty object ({}) if you do not wish to configure managed node groups.</td>
    </tr><tr>
        <td>managed_node_group_custom_iam_role_name</td>
        <td>Custom name for the IAM role for the Managed Node Groups. When null, a default name based on worker_name_prefix will be used. One of managed_node_group_custom_iam_role_name and managed_node_group_iam_role_arn is required (must be non-null) if managed_node_group_iam_role_already_exists is true.</td>
    </tr><tr>
        <td>managed_node_group_iam_role_already_exists</td>
        <td>Whether or not the IAM role used for the Managed Node Group workers already exists. When false, this module will create a new IAM role.</td>
    </tr><tr>
        <td>managed_node_group_iam_role_arn</td>
        <td>ARN of the IAM role to use if iam_role_already_exists = true. When null, uses managed_node_group_custom_iam_role_name to lookup the ARN. One of managed_node_group_custom_iam_role_name and managed_node_group_iam_role_arn is required (must be non-null) if managed_node_group_iam_role_already_exists is true.</td>
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
        <td>node_group_launch_template_instance_type</td>
        <td>The instance type to configure in the launch template. This value will be used when the instance_types field is set to null (NOT omitted, in which case var.node_group_default_instance_types will be used).</td>
    </tr><tr>
        <td>node_group_names</td>
        <td>The names of the node groups. When null, this value is automatically calculated from the managed_node_group_configurations map. This variable must be set if any of the values of the managed_node_group_configurations map depends on a resource that is not available at plan time to work around terraform limitations with for_each.</td>
    </tr><tr>
        <td>node_group_security_group_tags</td>
        <td>A map of tags to apply to the Security Group of the ASG for the managed node group pool. The key is the tag name and the value is the tag value.</td>
    </tr><tr>
        <td>ssh_grunt_iam_group</td>
        <td>If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the EKS workers. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).</td>
    </tr><tr>
        <td>ssh_grunt_iam_group_sudo</td>
        <td>If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the EKS workers with sudo permissions. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).</td>
    </tr><tr>
        <td>tenancy</td>
        <td>The tenancy of the servers in the self-managed worker ASG. Must be one of: default, dedicated, or host.</td>
    </tr><tr>
        <td>use_exec_plugin_for_auth</td>
        <td>If this variable is set to true, then use an exec-based plugin to authenticate and fetch tokens for EKS. This is useful because EKS clusters use short-lived authentication tokens that can expire in the middle of an 'apply' or 'destroy', and since the native Kubernetes provider in Terraform doesn't have a way to fetch up-to-date tokens, we recommend using an exec-based provider as a workaround. Use the use_kubergrunt_to_fetch_token input variable to control whether kubergrunt or aws is used to fetch tokens.</td>
    </tr><tr>
        <td>use_kubergrunt_to_fetch_token</td>
        <td>EKS clusters use short-lived authentication tokens that can expire in the middle of an 'apply' or 'destroy'. To avoid this issue, we use an exec-based plugin to fetch an up-to-date token. If this variable is set to true, we'll use kubergrunt to fetch the token (in which case, kubergrunt must be installed and on PATH); if this variable is set to false, we'll use the aws CLI to fetch the token (in which case, aws must be installed and on PATH). Note this functionality is only enabled if use_exec_plugin_for_auth is set to true.</td>
    </tr><tr>
        <td>worker_k8s_role_mapping_name</td>
        <td>Name of the IAM role to Kubernetes RBAC group mapping ConfigMap. Only used if aws_auth_merger_namespace is not null.</td>
    </tr><tr>
        <td>worker_name_prefix</td>
        <td>Prefix EKS worker resource names with this string. When you have multiple worker groups for the cluster, you can use this to namespace the resources. Defaults to empty string so that resource names are not excessively long by default.</td>
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
        <td>managed_node_group_arns</td>
        <td>Map of Node Group names to ARNs of the created EKS Node Groups.</td>
    </tr><tr>
        <td>managed_node_group_worker_iam_role_arn</td>
        <td>The ARN of the IAM role associated with the Managed Node Group EKS workers.</td>
    </tr><tr>
        <td>managed_node_group_worker_iam_role_name</td>
        <td>The name of the IAM role associated with the Managed Node Group EKS workers.</td>
    </tr><tr>
        <td>managed_node_group_worker_security_group_ids</td>
        <td>Map of Node Group names to Auto Scaling Group security group IDs. Empty if var.cluster_instance_keypair_name is not set.</td>
    </tr><tr>
        <td>metric_widget_managed_node_group_worker_cpu_usage</td>
        <td>A CloudWatch Dashboard widget that graphs CPU usage (percentage) of the Managed Node Group EKS workers.</td>
    </tr><tr>
        <td>metric_widget_managed_node_group_worker_disk_usage</td>
        <td>A CloudWatch Dashboard widget that graphs disk usage (percentage) of the Managed Node Group EKS workers.</td>
    </tr><tr>
        <td>metric_widget_managed_node_group_worker_memory_usage</td>
        <td>A CloudWatch Dashboard widget that graphs memory usage (percentage) of the Managed Node Group EKS workers.</td>
    </tr><tr>
        <td>metric_widget_self_managed_worker_cpu_usage</td>
        <td>A CloudWatch Dashboard widget that graphs CPU usage (percentage) of the self-managed EKS workers.</td>
    </tr><tr>
        <td>metric_widget_self_managed_worker_disk_usage</td>
        <td>A CloudWatch Dashboard widget that graphs disk usage (percentage) of the self-managed EKS workers.</td>
    </tr><tr>
        <td>metric_widget_self_managed_worker_memory_usage</td>
        <td>A CloudWatch Dashboard widget that graphs memory usage (percentage) of the self-managed EKS workers.</td>
    </tr><tr>
        <td>self_managed_worker_iam_role_arn</td>
        <td>The ARN of the IAM role associated with the self-managed EKS workers.</td>
    </tr><tr>
        <td>self_managed_worker_iam_role_name</td>
        <td>The name of the IAM role associated with the self-managed EKS workers.</td>
    </tr><tr>
        <td>self_managed_worker_security_group_id</td>
        <td>The ID of the AWS Security Group associated with the self-managed EKS workers.</td>
    </tr><tr>
        <td>worker_asg_names</td>
        <td>The list of names of the ASGs that were deployed to act as EKS workers.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"62333c33b89e583cb4c0f2ceafaf8b90"}
##DOCS-SOURCER-END -->
