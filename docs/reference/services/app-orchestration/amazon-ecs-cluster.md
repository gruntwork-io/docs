import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon ECS Cluster

Deploy an Amazon ECS Cluster

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/ecs-cluster" className="link-button">View on GitHub</a>

### Reference

<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <ul>
      
    <li>
      <p>
        <a name="alarms_sns_topic_arn" href="#alarms_sns_topic_arn" className="snap-top">
          <code>alarms_sns_topic_arn</code>
        </a> - The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications
      </p>
    </li>
    <li>
      <p>
        <a name="allow_ssh_from_cidr_blocks" href="#allow_ssh_from_cidr_blocks" className="snap-top">
          <code>allow_ssh_from_cidr_blocks</code>
        </a> - The IP address ranges in CIDR format from which to allow incoming SSH requests to the ECS instances.
      </p>
    </li>
    <li>
      <p>
        <a name="allow_ssh_from_security_group_ids" href="#allow_ssh_from_security_group_ids" className="snap-top">
          <code>allow_ssh_from_security_group_ids</code>
        </a> - The IDs of security groups from which to allow incoming SSH requests to the ECS instances.
      </p>
    </li>
    <li>
      <p>
        <a name="autoscaling_termination_protection" href="#autoscaling_termination_protection" className="snap-top">
          <code>autoscaling_termination_protection</code>
        </a> - Protect EC2 instances running ECS tasks from being terminated due to scale in (spot instances do not support lifecycle modifications). Note that the behavior of termination protection differs between clusters with capacity providers and clusters without. When capacity providers is turned on and this flag is true, only instances that have 0 ECS tasks running will be scaled in, regardless of capacity_provider_target. If capacity providers is turned off and this flag is true, this will prevent ANY instances from being scaled in.
      </p>
    </li>
    <li>
      <p>
        <a name="capacity_provider_enabled" href="#capacity_provider_enabled" className="snap-top">
          <code>capacity_provider_enabled</code>
        </a> - Enable a capacity provider to autoscale the EC2 ASG created for this ECS cluster.
      </p>
    </li>
    <li>
      <p>
        <a name="capacity_provider_max_scale_step" href="#capacity_provider_max_scale_step" className="snap-top">
          <code>capacity_provider_max_scale_step</code>
        </a> - Maximum step adjustment size to the ASG's desired instance count. A number between 1 and 10000.
      </p>
    </li>
    <li>
      <p>
        <a name="capacity_provider_min_scale_step" href="#capacity_provider_min_scale_step" className="snap-top">
          <code>capacity_provider_min_scale_step</code>
        </a> - Minimum step adjustment size to the ASG's desired instance count. A number between 1 and 10000.
      </p>
    </li>
    <li>
      <p>
        <a name="capacity_provider_target" href="#capacity_provider_target" className="snap-top">
          <code>capacity_provider_target</code>
        </a> - Target cluster utilization for the ASG capacity provider; a number from 1 to 100. This number influences when scale out happens, and when instances should be scaled in. For example, a setting of 90 means that new instances will be provisioned when all instances are at 90% utilization, while instances that are only 10% utilized (CPU and Memory usage from tasks = 10%) will be scaled in.
      </p>
    </li>
    <li>
      <p>
        <a name="cloud_init_parts" href="#cloud_init_parts" className="snap-top">
          <code>cloud_init_parts</code>
        </a> - Cloud init scripts to run on the ECS cluster instances during boot. See the part blocks in https://www.terraform.io/docs/providers/template/d/cloudinit_config.html for syntax
      </p>
    </li>
    <li>
      <p>
        <a name="cloudwatch_log_group_name" href="#cloudwatch_log_group_name" className="snap-top">
          <code>cloudwatch_log_group_name</code>
        </a> - The name of the log group to create in CloudWatch. Defaults to `var.cluster_name-logs`.
      </p>
    </li>
    <li>
      <p>
        <a name="cluster_access_from_sgs" href="#cluster_access_from_sgs" className="snap-top">
          <code>cluster_access_from_sgs</code>
        </a> - Specify a list of Security Groups that will have access to the ECS cluster. Only used if var.enable_cluster_access_ports is set to true
      </p>
    </li>
    <li>
      <p>
        <a name="cluster_instance_ami" href="#cluster_instance_ami" className="snap-top">
          <code>cluster_instance_ami</code>
        </a> - The AMI to run on each instance in the ECS cluster. You can build the AMI using the Packer template ecs-node-al2.json. One of var.cluster_instance_ami or var.cluster_instance_ami_filters is required.
      </p>
    </li>
    <li>
      <p>
        <a name="cluster_instance_ami_filters" href="#cluster_instance_ami_filters" className="snap-top">
          <code>cluster_instance_ami_filters</code>
        </a> - Properties on the AMI that can be used to lookup a prebuilt AMI for use with ECS workers. You can build the AMI using the Packer template ecs-node-al2.json. Only used if var.cluster_instance_ami is null. One of var.cluster_instance_ami or var.cluster_instance_ami_filters is required. Set to null if cluster_instance_ami is set.
      </p>
    </li>
    <li>
      <p>
        <a name="cluster_instance_associate_public_ip_address" href="#cluster_instance_associate_public_ip_address" className="snap-top">
          <code>cluster_instance_associate_public_ip_address</code>
        </a> - Whether to associate a public IP address with an instance in a VPC
      </p>
    </li>
    <li>
      <p>
        <a name="cluster_instance_keypair_name" href="#cluster_instance_keypair_name" className="snap-top">
          <code>cluster_instance_keypair_name</code>
        </a> - The name of the Key Pair that can be used to SSH to each instance in the ECS cluster
      </p>
    </li>
    <li>
      <p>
        <a name="cluster_instance_type" href="#cluster_instance_type" className="snap-top">
          <code>cluster_instance_type</code>
        </a> - The type of instances to run in the ECS cluster (e.g. t2.medium)
      </p>
    </li>
    <li>
      <p>
        <a name="cluster_max_size" href="#cluster_max_size" className="snap-top">
          <code>cluster_max_size</code>
        </a> - The maxiumum number of instances to run in the ECS cluster
      </p>
    </li>
    <li>
      <p>
        <a name="cluster_min_size" href="#cluster_min_size" className="snap-top">
          <code>cluster_min_size</code>
        </a> - The minimum number of instances to run in the ECS cluster
      </p>
    </li>
    <li>
      <p>
        <a name="cluster_name" href="#cluster_name" className="snap-top">
          <code>cluster_name</code>
        </a> - The name of the ECS cluster
      </p>
    </li>
    <li>
      <p>
        <a name="default_user" href="#default_user" className="snap-top">
          <code>default_user</code>
        </a> - The default OS user for the ECS worker AMI. For AWS Amazon Linux AMIs, which is what the Packer template in ecs-node-al2.json uses, the default OS user is 'ec2-user'.
      </p>
    </li>
    <li>
      <p>
        <a name="disallowed_availability_zones" href="#disallowed_availability_zones" className="snap-top">
          <code>disallowed_availability_zones</code>
        </a> - A list of availability zones in the region that should be skipped when deploying ECS. You can use this to avoid availability zones that may not be able to provision the resources (e.g instance type does not exist). If empty, allows all availability zones.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_cloudwatch_log_aggregation" href="#enable_cloudwatch_log_aggregation" className="snap-top">
          <code>enable_cloudwatch_log_aggregation</code>
        </a> - Set to true to enable Cloudwatch log aggregation for the ECS cluster
      </p>
    </li>
    <li>
      <p>
        <a name="enable_cloudwatch_metrics" href="#enable_cloudwatch_metrics" className="snap-top">
          <code>enable_cloudwatch_metrics</code>
        </a> - Set to true to enable Cloudwatch metrics collection for the ECS cluster
      </p>
    </li>
    <li>
      <p>
        <a name="enable_cluster_access_ports" href="#enable_cluster_access_ports" className="snap-top">
          <code>enable_cluster_access_ports</code>
        </a> - Specify a list of ECS Cluster ports which should be accessible from the security groups given in cluster_access_from_sgs
      </p>
    </li>
    <li>
      <p>
        <a name="enable_ecs_cloudwatch_alarms" href="#enable_ecs_cloudwatch_alarms" className="snap-top">
          <code>enable_ecs_cloudwatch_alarms</code>
        </a> - Set to true to enable several basic Cloudwatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using var.alarms_sns_topic_arn
      </p>
    </li>
    <li>
      <p>
        <a name="enable_fail2ban" href="#enable_fail2ban" className="snap-top">
          <code>enable_fail2ban</code>
        </a> - Enable fail2ban to block brute force log in attempts. Defaults to true
      </p>
    </li>
    <li>
      <p>
        <a name="enable_ip_lockdown" href="#enable_ip_lockdown" className="snap-top">
          <code>enable_ip_lockdown</code>
        </a> - Enable ip-lockdown to block access to the instance metadata. Defaults to true
      </p>
    </li>
    <li>
      <p>
        <a name="enable_ssh_grunt" href="#enable_ssh_grunt" className="snap-top">
          <code>enable_ssh_grunt</code>
        </a> - Set to true to add IAM permissions for ssh-grunt (https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ssh-grunt), which will allow you to manage SSH access via IAM groups.
      </p>
    </li>
    <li>
      <p>
        <a name="external_account_ssh_grunt_role_arn" href="#external_account_ssh_grunt_role_arn" className="snap-top">
          <code>external_account_ssh_grunt_role_arn</code>
        </a> - Since our IAM users are defined in a separate AWS account, this variable is used to specify the ARN of an IAM role that allows ssh-grunt to retrieve IAM group and public SSH key info from that account.
      </p>
    </li>
    <li>
      <p>
        <a name="high_cpu_utilization_evaluation_periods" href="#high_cpu_utilization_evaluation_periods" className="snap-top">
          <code>high_cpu_utilization_evaluation_periods</code>
        </a> - The number of periods over which data is compared to the specified threshold
      </p>
    </li>
    <li>
      <p>
        <a name="high_cpu_utilization_period" href="#high_cpu_utilization_period" className="snap-top">
          <code>high_cpu_utilization_period</code>
        </a> - The period, in seconds, over which to measure the CPU utilization percentage. Only used if var.enable_ecs_cloudwatch_alarms is set to true
      </p>
    </li>
    <li>
      <p>
        <a name="high_cpu_utilization_statistic" href="#high_cpu_utilization_statistic" className="snap-top">
          <code>high_cpu_utilization_statistic</code>
        </a> - The statistic to apply to the alarm's high CPU metric. Either of the following is supported: SampleCount, Average, Sum, Minimum, Maximum
      </p>
    </li>
    <li>
      <p>
        <a name="high_cpu_utilization_threshold" href="#high_cpu_utilization_threshold" className="snap-top">
          <code>high_cpu_utilization_threshold</code>
        </a> - Trigger an alarm if the ECS Cluster has a CPU utilization percentage above this threshold. Only used if var.enable_ecs_cloudwatch_alarms is set to true
      </p>
    </li>
    <li>
      <p>
        <a name="high_disk_utilization_period" href="#high_disk_utilization_period" className="snap-top">
          <code>high_disk_utilization_period</code>
        </a> - The period, in seconds, over which to measure the disk utilization percentage. Only used if var.enable_ecs_cloudwatch_alarms is set to true
      </p>
    </li>
    <li>
      <p>
        <a name="high_disk_utilization_threshold" href="#high_disk_utilization_threshold" className="snap-top">
          <code>high_disk_utilization_threshold</code>
        </a> - Trigger an alarm if the EC2 instances in the ECS Cluster have a disk utilization percentage above this threshold. Only used if var.enable_ecs_cloudwatch_alarms is set to true
      </p>
    </li>
    <li>
      <p>
        <a name="high_memory_utilization_evaluation_periods" href="#high_memory_utilization_evaluation_periods" className="snap-top">
          <code>high_memory_utilization_evaluation_periods</code>
        </a> - The number of periods over which data is compared to the specified threshold
      </p>
    </li>
    <li>
      <p>
        <a name="high_memory_utilization_period" href="#high_memory_utilization_period" className="snap-top">
          <code>high_memory_utilization_period</code>
        </a> - The period, in seconds, over which to measure the memory utilization percentage. Only used if var.enable_ecs_cloudwatch_alarms is set to true
      </p>
    </li>
    <li>
      <p>
        <a name="high_memory_utilization_statistic" href="#high_memory_utilization_statistic" className="snap-top">
          <code>high_memory_utilization_statistic</code>
        </a> - The statistic to apply to the alarm's high CPU metric. Either of the following is supported: SampleCount, Average, Sum, Minimum, Maximum
      </p>
    </li>
    <li>
      <p>
        <a name="high_memory_utilization_threshold" href="#high_memory_utilization_threshold" className="snap-top">
          <code>high_memory_utilization_threshold</code>
        </a> - Trigger an alarm if the ECS Cluster has a memory utilization percentage above this threshold. Only used if var.enable_ecs_cloudwatch_alarms is set to true
      </p>
    </li>
    <li>
      <p>
        <a name="internal_alb_sg_ids" href="#internal_alb_sg_ids" className="snap-top">
          <code>internal_alb_sg_ids</code>
        </a> - The Security Group ID for the internal ALB
      </p>
    </li>
    <li>
      <p>
        <a name="multi_az_capacity_provider" href="#multi_az_capacity_provider" className="snap-top">
          <code>multi_az_capacity_provider</code>
        </a> - Enable a multi-az capacity provider to autoscale the EC2 ASGs created for this ECS cluster, only if capacity_provider_enabled = true
      </p>
    </li>
    <li>
      <p>
        <a name="public_alb_sg_ids" href="#public_alb_sg_ids" className="snap-top">
          <code>public_alb_sg_ids</code>
        </a> - The Security Group ID for the public ALB
      </p>
    </li>
    <li>
      <p>
        <a name="ssh_grunt_iam_group" href="#ssh_grunt_iam_group" className="snap-top">
          <code>ssh_grunt_iam_group</code>
        </a> - If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the nodes in this ECS cluster. This value is only used if enable_ssh_grunt=true.
      </p>
    </li>
    <li>
      <p>
        <a name="ssh_grunt_iam_group_sudo" href="#ssh_grunt_iam_group_sudo" className="snap-top">
          <code>ssh_grunt_iam_group_sudo</code>
        </a> - If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the nodes in this ECS cluster with sudo permissions. This value is only used if enable_ssh_grunt=true.
      </p>
    </li>
    <li>
      <p>
        <a name="tenancy" href="#tenancy" className="snap-top">
          <code>tenancy</code>
        </a> - The tenancy of this server. Must be one of: default, dedicated, or host.
      </p>
    </li>
    <li>
      <p>
        <a name="vpc_id" href="#vpc_id" className="snap-top">
          <code>vpc_id</code>
        </a> - The ID of the VPC in which the ECS cluster should be launched
      </p>
    </li>
    <li>
      <p>
        <a name="vpc_subnet_ids" href="#vpc_subnet_ids" className="snap-top">
          <code>vpc_subnet_ids</code>
        </a> - The IDs of the subnets in which to deploy the ECS cluster instances
      </p>
    </li>
    </ul>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <ul>
      
    <li>
      <p>
        <a name="all_metric_widgets" href="#all_metric_widgets" className="snap-top">
          <code>all_metric_widgets</code>
        </a> - A list of all the CloudWatch Dashboard metric widgets available in this module.
      </p>
    </li>
    <li>
      <p>
        <a name="ecs_cluster_arn" href="#ecs_cluster_arn" className="snap-top">
          <code>ecs_cluster_arn</code>
        </a> - The ID of the ECS cluster
      </p>
    </li>
    <li>
      <p>
        <a name="ecs_cluster_asg_name" href="#ecs_cluster_asg_name" className="snap-top">
          <code>ecs_cluster_asg_name</code>
        </a> - The name of the ECS cluster's autoscaling group (ASG)
      </p>
    </li>
    <li>
      <p>
        <a name="ecs_cluster_asg_names" href="#ecs_cluster_asg_names" className="snap-top">
          <code>ecs_cluster_asg_names</code>
        </a> - For configurations with multiple ASGs, this contains a list of ASG names.
      </p>
    </li>
    <li>
      <p>
        <a name="ecs_cluster_capacity_provider_names" href="#ecs_cluster_capacity_provider_names" className="snap-top">
          <code>ecs_cluster_capacity_provider_names</code>
        </a> - For configurations with multiple capacity providers, this contains a list of all capacity provider names.
      </p>
    </li>
    <li>
      <p>
        <a name="ecs_cluster_launch_configuration_id" href="#ecs_cluster_launch_configuration_id" className="snap-top">
          <code>ecs_cluster_launch_configuration_id</code>
        </a> - The ID of the launch configuration used by the ECS cluster's auto scaling group (ASG)
      </p>
    </li>
    <li>
      <p>
        <a name="ecs_cluster_name" href="#ecs_cluster_name" className="snap-top">
          <code>ecs_cluster_name</code>
        </a> - The name of the ECS cluster
      </p>
    </li>
    <li>
      <p>
        <a name="ecs_cluster_vpc_id" href="#ecs_cluster_vpc_id" className="snap-top">
          <code>ecs_cluster_vpc_id</code>
        </a> - The ID of the VPC into which the ECS cluster is launched
      </p>
    </li>
    <li>
      <p>
        <a name="ecs_cluster_vpc_subnet_ids" href="#ecs_cluster_vpc_subnet_ids" className="snap-top">
          <code>ecs_cluster_vpc_subnet_ids</code>
        </a> - The VPC subnet IDs into which the ECS cluster can launch resources into
      </p>
    </li>
    <li>
      <p>
        <a name="ecs_instance_iam_role_arn" href="#ecs_instance_iam_role_arn" className="snap-top">
          <code>ecs_instance_iam_role_arn</code>
        </a> - The ARN of the IAM role applied to ECS instances
      </p>
    </li>
    <li>
      <p>
        <a name="ecs_instance_iam_role_id" href="#ecs_instance_iam_role_id" className="snap-top">
          <code>ecs_instance_iam_role_id</code>
        </a> - The ID of the IAM role applied to ECS instances
      </p>
    </li>
    <li>
      <p>
        <a name="ecs_instance_iam_role_name" href="#ecs_instance_iam_role_name" className="snap-top">
          <code>ecs_instance_iam_role_name</code>
        </a> - The name of the IAM role applied to ECS instances
      </p>
    </li>
    <li>
      <p>
        <a name="ecs_instance_security_group_id" href="#ecs_instance_security_group_id" className="snap-top">
          <code>ecs_instance_security_group_id</code>
        </a> - The ID of the security group applied to ECS instances
      </p>
    </li>
    <li>
      <p>
        <a name="metric_widget_ecs_cluster_cpu_usage" href="#metric_widget_ecs_cluster_cpu_usage" className="snap-top">
          <code>metric_widget_ecs_cluster_cpu_usage</code>
        </a> - The CloudWatch Dashboard metric widget for the ECS cluster workers' CPU utilization metric.
      </p>
    </li>
    <li>
      <p>
        <a name="metric_widget_ecs_cluster_memory_usage" href="#metric_widget_ecs_cluster_memory_usage" className="snap-top">
          <code>metric_widget_ecs_cluster_memory_usage</code>
        </a> - The CloudWatch Dashboard metric widget for the ECS cluster workers' Memory utilization metric.
      </p>
    </li>
    </ul>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"9d9367ac8e3e14c8cdd8f01344e6b906"}
##DOCS-SOURCER-END -->
