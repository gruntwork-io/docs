import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon EKS Workers

Deploy EC2 instances as Kubernetes workers for Amazon Elastic Kubernetes Service (EKS)

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/eks-workers" className="link-button">View on GitHub</a>

### Reference

<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <ul>
      
    <li>
      <p>
        <a name="additional_security_groups_for_workers" href="#additional_security_groups_for_workers" className="snap-top">
          <code>additional_security_groups_for_workers</code>
        </a> - A list of additional security group IDs to be attached on worker groups.
      </p>
    </li>
    <li>
      <p>
        <a name="alarms_sns_topic_arn" href="#alarms_sns_topic_arn" className="snap-top">
          <code>alarms_sns_topic_arn</code>
        </a> - The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications.
      </p>
    </li>
    <li>
      <p>
        <a name="allow_inbound_ssh_from_cidr_blocks" href="#allow_inbound_ssh_from_cidr_blocks" className="snap-top">
          <code>allow_inbound_ssh_from_cidr_blocks</code>
        </a> - The list of CIDR blocks to allow inbound SSH access to the worker groups.
      </p>
    </li>
    <li>
      <p>
        <a name="allow_inbound_ssh_from_security_groups" href="#allow_inbound_ssh_from_security_groups" className="snap-top">
          <code>allow_inbound_ssh_from_security_groups</code>
        </a> - The list of security group IDs to allow inbound SSH access to the worker groups.
      </p>
    </li>
    <li>
      <p>
        <a name="asg_custom_iam_role_name" href="#asg_custom_iam_role_name" className="snap-top">
          <code>asg_custom_iam_role_name</code>
        </a> - Custom name for the IAM role for the Self-managed workers. When null, a default name based on worker_name_prefix will be used. One of asg_custom_iam_role_name and asg_iam_role_arn is required (must be non-null) if asg_iam_role_already_exists is true.
      </p>
    </li>
    <li>
      <p>
        <a name="asg_default_instance_root_volume_encryption" href="#asg_default_instance_root_volume_encryption" className="snap-top">
          <code>asg_default_instance_root_volume_encryption</code>
        </a> - Default value for the asg_instance_root_volume_encryption field of autoscaling_group_configurations. Any map entry that does not specify asg_instance_root_volume_encryption will use this value.
      </p>
    </li>
    <li>
      <p>
        <a name="asg_default_instance_root_volume_size" href="#asg_default_instance_root_volume_size" className="snap-top">
          <code>asg_default_instance_root_volume_size</code>
        </a> - Default value for the asg_instance_root_volume_size field of autoscaling_group_configurations. Any map entry that does not specify asg_instance_root_volume_size will use this value.
      </p>
    </li>
    <li>
      <p>
        <a name="asg_default_instance_root_volume_type" href="#asg_default_instance_root_volume_type" className="snap-top">
          <code>asg_default_instance_root_volume_type</code>
        </a> - Default value for the asg_instance_root_volume_type field of autoscaling_group_configurations. Any map entry that does not specify asg_instance_root_volume_type will use this value.
      </p>
    </li>
    <li>
      <p>
        <a name="asg_default_instance_type" href="#asg_default_instance_type" className="snap-top">
          <code>asg_default_instance_type</code>
        </a> - Default value for the asg_instance_type field of autoscaling_group_configurations. Any map entry that does not specify asg_instance_type will use this value.
      </p>
    </li>
    <li>
      <p>
        <a name="asg_default_max_size" href="#asg_default_max_size" className="snap-top">
          <code>asg_default_max_size</code>
        </a> - Default value for the max_size field of autoscaling_group_configurations. Any map entry that does not specify max_size will use this value.
      </p>
    </li>
    <li>
      <p>
        <a name="asg_default_min_size" href="#asg_default_min_size" className="snap-top">
          <code>asg_default_min_size</code>
        </a> - Default value for the min_size field of autoscaling_group_configurations. Any map entry that does not specify min_size will use this value.
      </p>
    </li>
    <li>
      <p>
        <a name="asg_default_multi_instance_overrides" href="#asg_default_multi_instance_overrides" className="snap-top">
          <code>asg_default_multi_instance_overrides</code>
        </a> - Default value for the multi_instance_overrides field of autoscaling_group_configurations. Any map entry that does not specify multi_instance_overrides will use this value.
      </p>
    </li>
    <li>
      <p>
        <a name="asg_default_on_demand_allocation_strategy" href="#asg_default_on_demand_allocation_strategy" className="snap-top">
          <code>asg_default_on_demand_allocation_strategy</code>
        </a> - Default value for the on_demand_allocation_strategy field of autoscaling_group_configurations. Any map entry that does not specify on_demand_allocation_strategy will use this value.
      </p>
    </li>
    <li>
      <p>
        <a name="asg_default_on_demand_base_capacity" href="#asg_default_on_demand_base_capacity" className="snap-top">
          <code>asg_default_on_demand_base_capacity</code>
        </a> - Default value for the on_demand_base_capacity field of autoscaling_group_configurations. Any map entry that does not specify on_demand_base_capacity will use this value.
      </p>
    </li>
    <li>
      <p>
        <a name="asg_default_on_demand_percentage_above_base_capacity" href="#asg_default_on_demand_percentage_above_base_capacity" className="snap-top">
          <code>asg_default_on_demand_percentage_above_base_capacity</code>
        </a> - Default value for the on_demand_percentage_above_base_capacity field of autoscaling_group_configurations. Any map entry that does not specify on_demand_percentage_above_base_capacity will use this value.
      </p>
    </li>
    <li>
      <p>
        <a name="asg_default_spot_allocation_strategy" href="#asg_default_spot_allocation_strategy" className="snap-top">
          <code>asg_default_spot_allocation_strategy</code>
        </a> - Default value for the spot_allocation_strategy field of autoscaling_group_configurations. Any map entry that does not specify spot_allocation_strategy will use this value.
      </p>
    </li>
    <li>
      <p>
        <a name="asg_default_spot_instance_pools" href="#asg_default_spot_instance_pools" className="snap-top">
          <code>asg_default_spot_instance_pools</code>
        </a> - Default value for the spot_instance_pools field of autoscaling_group_configurations. Any map entry that does not specify spot_instance_pools will use this value.
      </p>
    </li>
    <li>
      <p>
        <a name="asg_default_spot_max_price" href="#asg_default_spot_max_price" className="snap-top">
          <code>asg_default_spot_max_price</code>
        </a> - Default value for the spot_max_price field of autoscaling_group_configurations. Any map entry that does not specify spot_max_price will use this value. Set to empty string (default) to mean on-demand price.
      </p>
    </li>
    <li>
      <p>
        <a name="asg_default_tags" href="#asg_default_tags" className="snap-top">
          <code>asg_default_tags</code>
        </a> - Default value for the tags field of autoscaling_group_configurations. Any map entry that does not specify tags will use this value.
      </p>
    </li>
    <li>
      <p>
        <a name="asg_default_use_multi_instances_policy" href="#asg_default_use_multi_instances_policy" className="snap-top">
          <code>asg_default_use_multi_instances_policy</code>
        </a> - Default value for the use_multi_instances_policy field of autoscaling_group_configurations. Any map entry that does not specify use_multi_instances_policy will use this value.
      </p>
    </li>
    <li>
      <p>
        <a name="asg_iam_instance_profile_name" href="#asg_iam_instance_profile_name" className="snap-top">
          <code>asg_iam_instance_profile_name</code>
        </a> - Custom name for the IAM instance profile for the Self-managed workers. When null, the IAM role name will be used. If var.asg_use_resource_name_prefix is true, this will be used as a name prefix.
      </p>
    </li>
    <li>
      <p>
        <a name="asg_iam_role_already_exists" href="#asg_iam_role_already_exists" className="snap-top">
          <code>asg_iam_role_already_exists</code>
        </a> - Whether or not the IAM role used for the Self-managed workers already exists. When false, this module will create a new IAM role.
      </p>
    </li>
    <li>
      <p>
        <a name="asg_iam_role_arn" href="#asg_iam_role_arn" className="snap-top">
          <code>asg_iam_role_arn</code>
        </a> - ARN of the IAM role to use if iam_role_already_exists = true. When null, uses asg_custom_iam_role_name to lookup the ARN. One of asg_custom_iam_role_name and asg_iam_role_arn is required (must be non-null) if asg_iam_role_already_exists is true.
      </p>
    </li>
    <li>
      <p>
        <a name="asg_security_group_tags" href="#asg_security_group_tags" className="snap-top">
          <code>asg_security_group_tags</code>
        </a> - A map of tags to apply to the Security Group of the ASG for the self managed worker pool. The key is the tag name and the value is the tag value.
      </p>
    </li>
    <li>
      <p>
        <a name="asg_use_resource_name_prefix" href="#asg_use_resource_name_prefix" className="snap-top">
          <code>asg_use_resource_name_prefix</code>
        </a> - When true, all the relevant resources for self managed workers will be set to use the name_prefix attribute so that unique names are generated for them. This allows those resources to support recreation through create_before_destroy lifecycle rules. Set to false if you were using any version before 0.65.0 and wish to avoid recreating the entire worker pool on your cluster.
      </p>
    </li>
    <li>
      <p>
        <a name="autoscaling_group_configurations" href="#autoscaling_group_configurations" className="snap-top">
          <code>autoscaling_group_configurations</code>
        </a> - Configure one or more self-managed Auto Scaling Groups (ASGs) to manage the EC2 instances in this cluster. Set to empty object ({}) if you do not wish to configure self-managed ASGs.
      </p>
    </li>
    <li>
      <p>
        <a name="autoscaling_group_include_autoscaler_discovery_tags" href="#autoscaling_group_include_autoscaler_discovery_tags" className="snap-top">
          <code>autoscaling_group_include_autoscaler_discovery_tags</code>
        </a> - Adds additional tags to each ASG that allow a cluster autoscaler to auto-discover them. Only used for self-managed workers.
      </p>
    </li>
    <li>
      <p>
        <a name="aws_auth_merger_namespace" href="#aws_auth_merger_namespace" className="snap-top">
          <code>aws_auth_merger_namespace</code>
        </a> - Namespace where the AWS Auth Merger is deployed. If configured, the worker IAM role will be mapped to the Kubernetes RBAC group for Nodes using a ConfigMap in the auth merger namespace.
      </p>
    </li>
    <li>
      <p>
        <a name="cloud_init_parts" href="#cloud_init_parts" className="snap-top">
          <code>cloud_init_parts</code>
        </a> - Cloud init scripts to run on the EKS worker nodes when it is booting. See the part blocks in https://www.terraform.io/docs/providers/template/d/cloudinit_config.html for syntax. To override the default boot script installed as part of the module, use the key `default`.
      </p>
    </li>
    <li>
      <p>
        <a name="cluster_instance_ami" href="#cluster_instance_ami" className="snap-top">
          <code>cluster_instance_ami</code>
        </a> - The AMI to run on each instance in the EKS cluster. You can build the AMI using the Packer template eks-node-al2.json. One of var.cluster_instance_ami or var.cluster_instance_ami_filters is required. Only used if var.cluster_instance_ami_filters is null. Set to null if cluster_instance_ami_filters is set.
      </p>
    </li>
    <li>
      <p>
        <a name="cluster_instance_ami_filters" href="#cluster_instance_ami_filters" className="snap-top">
          <code>cluster_instance_ami_filters</code>
        </a> - Properties on the AMI that can be used to lookup a prebuilt AMI for use with self managed workers. You can build the AMI using the Packer template eks-node-al2.json. One of var.cluster_instance_ami or var.cluster_instance_ami_filters is required. If both are defined, var.cluster_instance_ami_filters will be used. Set to null if cluster_instance_ami is set.
      </p>
    </li>
    <li>
      <p>
        <a name="cluster_instance_associate_public_ip_address" href="#cluster_instance_associate_public_ip_address" className="snap-top">
          <code>cluster_instance_associate_public_ip_address</code>
        </a> - Whether or not to associate a public IP address to the instances of the self managed ASGs. Will only work if the instances are launched in a public subnet.
      </p>
    </li>
    <li>
      <p>
        <a name="cluster_instance_keypair_name" href="#cluster_instance_keypair_name" className="snap-top">
          <code>cluster_instance_keypair_name</code>
        </a> - The name of the Key Pair that can be used to SSH to each instance in the EKS cluster.
      </p>
    </li>
    <li>
      <p>
        <a name="custom_egress_security_group_rules" href="#custom_egress_security_group_rules" className="snap-top">
          <code>custom_egress_security_group_rules</code>
        </a> - A map of unique identifiers to egress security group rules to attach to the worker groups.
      </p>
    </li>
    <li>
      <p>
        <a name="custom_ingress_security_group_rules" href="#custom_ingress_security_group_rules" className="snap-top">
          <code>custom_ingress_security_group_rules</code>
        </a> - A map of unique identifiers to ingress security group rules to attach to the worker groups.
      </p>
    </li>
    <li>
      <p>
        <a name="dashboard_cpu_usage_widget_parameters" href="#dashboard_cpu_usage_widget_parameters" className="snap-top">
          <code>dashboard_cpu_usage_widget_parameters</code>
        </a> - Parameters for the worker cpu usage widget to output for use in a CloudWatch dashboard.
      </p>
    </li>
    <li>
      <p>
        <a name="dashboard_disk_usage_widget_parameters" href="#dashboard_disk_usage_widget_parameters" className="snap-top">
          <code>dashboard_disk_usage_widget_parameters</code>
        </a> - Parameters for the worker disk usage widget to output for use in a CloudWatch dashboard.
      </p>
    </li>
    <li>
      <p>
        <a name="dashboard_memory_usage_widget_parameters" href="#dashboard_memory_usage_widget_parameters" className="snap-top">
          <code>dashboard_memory_usage_widget_parameters</code>
        </a> - Parameters for the worker memory usage widget to output for use in a CloudWatch dashboard.
      </p>
    </li>
    <li>
      <p>
        <a name="eks_cluster_name" href="#eks_cluster_name" className="snap-top">
          <code>eks_cluster_name</code>
        </a> - The name of the EKS cluster. The cluster must exist/already be deployed.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_cloudwatch_alarms" href="#enable_cloudwatch_alarms" className="snap-top">
          <code>enable_cloudwatch_alarms</code>
        </a> - Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using var.alarms_sns_topic_arn.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_cloudwatch_metrics" href="#enable_cloudwatch_metrics" className="snap-top">
          <code>enable_cloudwatch_metrics</code>
        </a> - Set to true to add IAM permissions to send custom metrics to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent to get memory and disk metrics in CloudWatch for your Bastion host.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_fail2ban" href="#enable_fail2ban" className="snap-top">
          <code>enable_fail2ban</code>
        </a> - Enable fail2ban to block brute force log in attempts. Defaults to true.
      </p>
    </li>
    <li>
      <p>
        <a name="external_account_ssh_grunt_role_arn" href="#external_account_ssh_grunt_role_arn" className="snap-top">
          <code>external_account_ssh_grunt_role_arn</code>
        </a> - If you are using ssh-grunt and your IAM users / groups are defined in a separate AWS account, you can use this variable to specify the ARN of an IAM role that ssh-grunt can assume to retrieve IAM group and public SSH key info from that account. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).
      </p>
    </li>
    <li>
      <p>
        <a name="managed_node_group_configurations" href="#managed_node_group_configurations" className="snap-top">
          <code>managed_node_group_configurations</code>
        </a> - Configure one or more Node Groups to manage the EC2 instances in this cluster. Set to empty object ({}) if you do not wish to configure managed node groups.
      </p>
    </li>
    <li>
      <p>
        <a name="managed_node_group_custom_iam_role_name" href="#managed_node_group_custom_iam_role_name" className="snap-top">
          <code>managed_node_group_custom_iam_role_name</code>
        </a> - Custom name for the IAM role for the Managed Node Groups. When null, a default name based on worker_name_prefix will be used. One of managed_node_group_custom_iam_role_name and managed_node_group_iam_role_arn is required (must be non-null) if managed_node_group_iam_role_already_exists is true.
      </p>
    </li>
    <li>
      <p>
        <a name="managed_node_group_iam_role_already_exists" href="#managed_node_group_iam_role_already_exists" className="snap-top">
          <code>managed_node_group_iam_role_already_exists</code>
        </a> - Whether or not the IAM role used for the Managed Node Group workers already exists. When false, this module will create a new IAM role.
      </p>
    </li>
    <li>
      <p>
        <a name="managed_node_group_iam_role_arn" href="#managed_node_group_iam_role_arn" className="snap-top">
          <code>managed_node_group_iam_role_arn</code>
        </a> - ARN of the IAM role to use if iam_role_already_exists = true. When null, uses managed_node_group_custom_iam_role_name to lookup the ARN. One of managed_node_group_custom_iam_role_name and managed_node_group_iam_role_arn is required (must be non-null) if managed_node_group_iam_role_already_exists is true.
      </p>
    </li>
    <li>
      <p>
        <a name="node_group_default_capacity_type" href="#node_group_default_capacity_type" className="snap-top">
          <code>node_group_default_capacity_type</code>
        </a> - Default value for capacity_type field of managed_node_group_configurations.
      </p>
    </li>
    <li>
      <p>
        <a name="node_group_default_desired_size" href="#node_group_default_desired_size" className="snap-top">
          <code>node_group_default_desired_size</code>
        </a> - Default value for desired_size field of managed_node_group_configurations.
      </p>
    </li>
    <li>
      <p>
        <a name="node_group_default_instance_root_volume_encryption" href="#node_group_default_instance_root_volume_encryption" className="snap-top">
          <code>node_group_default_instance_root_volume_encryption</code>
        </a> - Default value for the instance_root_volume_encryption field of managed_node_group_configurations.
      </p>
    </li>
    <li>
      <p>
        <a name="node_group_default_instance_root_volume_size" href="#node_group_default_instance_root_volume_size" className="snap-top">
          <code>node_group_default_instance_root_volume_size</code>
        </a> - Default value for the instance_root_volume_size field of managed_node_group_configurations.
      </p>
    </li>
    <li>
      <p>
        <a name="node_group_default_instance_root_volume_type" href="#node_group_default_instance_root_volume_type" className="snap-top">
          <code>node_group_default_instance_root_volume_type</code>
        </a> - Default value for the instance_root_volume_type field of managed_node_group_configurations.
      </p>
    </li>
    <li>
      <p>
        <a name="node_group_default_instance_types" href="#node_group_default_instance_types" className="snap-top">
          <code>node_group_default_instance_types</code>
        </a> - Default value for instance_types field of managed_node_group_configurations.
      </p>
    </li>
    <li>
      <p>
        <a name="node_group_default_labels" href="#node_group_default_labels" className="snap-top">
          <code>node_group_default_labels</code>
        </a> - Default value for labels field of managed_node_group_configurations. Unlike common_labels which will always be merged in, these labels are only used if the labels field is omitted from the configuration.
      </p>
    </li>
    <li>
      <p>
        <a name="node_group_default_max_size" href="#node_group_default_max_size" className="snap-top">
          <code>node_group_default_max_size</code>
        </a> - Default value for max_size field of managed_node_group_configurations.
      </p>
    </li>
    <li>
      <p>
        <a name="node_group_default_min_size" href="#node_group_default_min_size" className="snap-top">
          <code>node_group_default_min_size</code>
        </a> - Default value for min_size field of managed_node_group_configurations.
      </p>
    </li>
    <li>
      <p>
        <a name="node_group_default_subnet_ids" href="#node_group_default_subnet_ids" className="snap-top">
          <code>node_group_default_subnet_ids</code>
        </a> - Default value for subnet_ids field of managed_node_group_configurations.
      </p>
    </li>
    <li>
      <p>
        <a name="node_group_default_tags" href="#node_group_default_tags" className="snap-top">
          <code>node_group_default_tags</code>
        </a> - Default value for tags field of managed_node_group_configurations. Unlike common_tags which will always be merged in, these tags are only used if the tags field is omitted from the configuration.
      </p>
    </li>
    <li>
      <p>
        <a name="node_group_launch_template_instance_type" href="#node_group_launch_template_instance_type" className="snap-top">
          <code>node_group_launch_template_instance_type</code>
        </a> - The instance type to configure in the launch template. This value will be used when the instance_types field is set to null (NOT omitted, in which case var.node_group_default_instance_types will be used).
      </p>
    </li>
    <li>
      <p>
        <a name="node_group_names" href="#node_group_names" className="snap-top">
          <code>node_group_names</code>
        </a> - The names of the node groups. When null, this value is automatically calculated from the managed_node_group_configurations map. This variable must be set if any of the values of the managed_node_group_configurations map depends on a resource that is not available at plan time to work around terraform limitations with for_each.
      </p>
    </li>
    <li>
      <p>
        <a name="node_group_security_group_tags" href="#node_group_security_group_tags" className="snap-top">
          <code>node_group_security_group_tags</code>
        </a> - A map of tags to apply to the Security Group of the ASG for the managed node group pool. The key is the tag name and the value is the tag value.
      </p>
    </li>
    <li>
      <p>
        <a name="ssh_grunt_iam_group" href="#ssh_grunt_iam_group" className="snap-top">
          <code>ssh_grunt_iam_group</code>
        </a> - If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the EKS workers. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).
      </p>
    </li>
    <li>
      <p>
        <a name="ssh_grunt_iam_group_sudo" href="#ssh_grunt_iam_group_sudo" className="snap-top">
          <code>ssh_grunt_iam_group_sudo</code>
        </a> - If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the EKS workers with sudo permissions. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).
      </p>
    </li>
    <li>
      <p>
        <a name="tenancy" href="#tenancy" className="snap-top">
          <code>tenancy</code>
        </a> - The tenancy of the servers in the self-managed worker ASG. Must be one of: default, dedicated, or host.
      </p>
    </li>
    <li>
      <p>
        <a name="use_exec_plugin_for_auth" href="#use_exec_plugin_for_auth" className="snap-top">
          <code>use_exec_plugin_for_auth</code>
        </a> - If this variable is set to true, then use an exec-based plugin to authenticate and fetch tokens for EKS. This is useful because EKS clusters use short-lived authentication tokens that can expire in the middle of an 'apply' or 'destroy', and since the native Kubernetes provider in Terraform doesn't have a way to fetch up-to-date tokens, we recommend using an exec-based provider as a workaround. Use the use_kubergrunt_to_fetch_token input variable to control whether kubergrunt or aws is used to fetch tokens.
      </p>
    </li>
    <li>
      <p>
        <a name="use_kubergrunt_to_fetch_token" href="#use_kubergrunt_to_fetch_token" className="snap-top">
          <code>use_kubergrunt_to_fetch_token</code>
        </a> - EKS clusters use short-lived authentication tokens that can expire in the middle of an 'apply' or 'destroy'. To avoid this issue, we use an exec-based plugin to fetch an up-to-date token. If this variable is set to true, we'll use kubergrunt to fetch the token (in which case, kubergrunt must be installed and on PATH); if this variable is set to false, we'll use the aws CLI to fetch the token (in which case, aws must be installed and on PATH). Note this functionality is only enabled if use_exec_plugin_for_auth is set to true.
      </p>
    </li>
    <li>
      <p>
        <a name="worker_k8s_role_mapping_name" href="#worker_k8s_role_mapping_name" className="snap-top">
          <code>worker_k8s_role_mapping_name</code>
        </a> - Name of the IAM role to Kubernetes RBAC group mapping ConfigMap. Only used if aws_auth_merger_namespace is not null.
      </p>
    </li>
    <li>
      <p>
        <a name="worker_name_prefix" href="#worker_name_prefix" className="snap-top">
          <code>worker_name_prefix</code>
        </a> - Prefix EKS worker resource names with this string. When you have multiple worker groups for the cluster, you can use this to namespace the resources. Defaults to empty string so that resource names are not excessively long by default.
      </p>
    </li>
    </ul>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <ul>
      
    <li>
      <p>
        <a name="managed_node_group_arns" href="#managed_node_group_arns" className="snap-top">
          <code>managed_node_group_arns</code>
        </a> - Map of Node Group names to ARNs of the created EKS Node Groups.
      </p>
    </li>
    <li>
      <p>
        <a name="managed_node_group_worker_iam_role_arn" href="#managed_node_group_worker_iam_role_arn" className="snap-top">
          <code>managed_node_group_worker_iam_role_arn</code>
        </a> - The ARN of the IAM role associated with the Managed Node Group EKS workers.
      </p>
    </li>
    <li>
      <p>
        <a name="managed_node_group_worker_iam_role_name" href="#managed_node_group_worker_iam_role_name" className="snap-top">
          <code>managed_node_group_worker_iam_role_name</code>
        </a> - The name of the IAM role associated with the Managed Node Group EKS workers.
      </p>
    </li>
    <li>
      <p>
        <a name="managed_node_group_worker_security_group_ids" href="#managed_node_group_worker_security_group_ids" className="snap-top">
          <code>managed_node_group_worker_security_group_ids</code>
        </a> - Map of Node Group names to Auto Scaling Group security group IDs. Empty if var.cluster_instance_keypair_name is not set.
      </p>
    </li>
    <li>
      <p>
        <a name="managed_node_group_worker_shared_security_group_id" href="#managed_node_group_worker_shared_security_group_id" className="snap-top">
          <code>managed_node_group_worker_shared_security_group_id</code>
        </a> - The ID of the common AWS Security Group associated with all the managed EKS workers.
      </p>
    </li>
    <li>
      <p>
        <a name="metric_widget_managed_node_group_worker_cpu_usage" href="#metric_widget_managed_node_group_worker_cpu_usage" className="snap-top">
          <code>metric_widget_managed_node_group_worker_cpu_usage</code>
        </a> - A CloudWatch Dashboard widget that graphs CPU usage (percentage) of the Managed Node Group EKS workers.
      </p>
    </li>
    <li>
      <p>
        <a name="metric_widget_managed_node_group_worker_disk_usage" href="#metric_widget_managed_node_group_worker_disk_usage" className="snap-top">
          <code>metric_widget_managed_node_group_worker_disk_usage</code>
        </a> - A CloudWatch Dashboard widget that graphs disk usage (percentage) of the Managed Node Group EKS workers.
      </p>
    </li>
    <li>
      <p>
        <a name="metric_widget_managed_node_group_worker_memory_usage" href="#metric_widget_managed_node_group_worker_memory_usage" className="snap-top">
          <code>metric_widget_managed_node_group_worker_memory_usage</code>
        </a> - A CloudWatch Dashboard widget that graphs memory usage (percentage) of the Managed Node Group EKS workers.
      </p>
    </li>
    <li>
      <p>
        <a name="metric_widget_self_managed_worker_cpu_usage" href="#metric_widget_self_managed_worker_cpu_usage" className="snap-top">
          <code>metric_widget_self_managed_worker_cpu_usage</code>
        </a> - A CloudWatch Dashboard widget that graphs CPU usage (percentage) of the self-managed EKS workers.
      </p>
    </li>
    <li>
      <p>
        <a name="metric_widget_self_managed_worker_disk_usage" href="#metric_widget_self_managed_worker_disk_usage" className="snap-top">
          <code>metric_widget_self_managed_worker_disk_usage</code>
        </a> - A CloudWatch Dashboard widget that graphs disk usage (percentage) of the self-managed EKS workers.
      </p>
    </li>
    <li>
      <p>
        <a name="metric_widget_self_managed_worker_memory_usage" href="#metric_widget_self_managed_worker_memory_usage" className="snap-top">
          <code>metric_widget_self_managed_worker_memory_usage</code>
        </a> - A CloudWatch Dashboard widget that graphs memory usage (percentage) of the self-managed EKS workers.
      </p>
    </li>
    <li>
      <p>
        <a name="self_managed_worker_iam_role_arn" href="#self_managed_worker_iam_role_arn" className="snap-top">
          <code>self_managed_worker_iam_role_arn</code>
        </a> - The ARN of the IAM role associated with the self-managed EKS workers.
      </p>
    </li>
    <li>
      <p>
        <a name="self_managed_worker_iam_role_name" href="#self_managed_worker_iam_role_name" className="snap-top">
          <code>self_managed_worker_iam_role_name</code>
        </a> - The name of the IAM role associated with the self-managed EKS workers.
      </p>
    </li>
    <li>
      <p>
        <a name="self_managed_worker_security_group_id" href="#self_managed_worker_security_group_id" className="snap-top">
          <code>self_managed_worker_security_group_id</code>
        </a> - The ID of the AWS Security Group associated with the self-managed EKS workers.
      </p>
    </li>
    <li>
      <p>
        <a name="worker_asg_names" href="#worker_asg_names" className="snap-top">
          <code>worker_asg_names</code>
        </a> - The list of names of the ASGs that were deployed to act as EKS workers.
      </p>
    </li>
    </ul>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"23930f85e4a89bd2cf10864f917a3337"}
##DOCS-SOURCER-END -->
