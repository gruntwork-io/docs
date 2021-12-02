import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon ECS Cluster

Deploy an Amazon ECS Cluster

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/ecs-cluster" className="link-button">View on GitHub</a>

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
        <td><a name="alarms_sns_topic_arn" href="#alarms_sns_topic_arn" className="snap-top"><code>alarms_sns_topic_arn</code></a></td>
        <td>The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications</td>
    </tr><tr>
        <td><a name="allow_ssh_from_cidr_blocks" href="#allow_ssh_from_cidr_blocks" className="snap-top"><code>allow_ssh_from_cidr_blocks</code></a></td>
        <td>The IP address ranges in CIDR format from which to allow incoming SSH requests to the ECS instances.</td>
    </tr><tr>
        <td><a name="allow_ssh_from_security_group_ids" href="#allow_ssh_from_security_group_ids" className="snap-top"><code>allow_ssh_from_security_group_ids</code></a></td>
        <td>The IDs of security groups from which to allow incoming SSH requests to the ECS instances.</td>
    </tr><tr>
        <td><a name="autoscaling_termination_protection" href="#autoscaling_termination_protection" className="snap-top"><code>autoscaling_termination_protection</code></a></td>
        <td>Protect EC2 instances running ECS tasks from being terminated due to scale in (spot instances do not support lifecycle modifications). Note that the behavior of termination protection differs between clusters with capacity providers and clusters without. When capacity providers is turned on and this flag is true, only instances that have 0 ECS tasks running will be scaled in, regardless of capacity_provider_target. If capacity providers is turned off and this flag is true, this will prevent ANY instances from being scaled in.</td>
    </tr><tr>
        <td><a name="capacity_provider_enabled" href="#capacity_provider_enabled" className="snap-top"><code>capacity_provider_enabled</code></a></td>
        <td>Enable a capacity provider to autoscale the EC2 ASG created for this ECS cluster.</td>
    </tr><tr>
        <td><a name="capacity_provider_max_scale_step" href="#capacity_provider_max_scale_step" className="snap-top"><code>capacity_provider_max_scale_step</code></a></td>
        <td>Maximum step adjustment size to the ASG's desired instance count. A number between 1 and 10000.</td>
    </tr><tr>
        <td><a name="capacity_provider_min_scale_step" href="#capacity_provider_min_scale_step" className="snap-top"><code>capacity_provider_min_scale_step</code></a></td>
        <td>Minimum step adjustment size to the ASG's desired instance count. A number between 1 and 10000.</td>
    </tr><tr>
        <td><a name="capacity_provider_target" href="#capacity_provider_target" className="snap-top"><code>capacity_provider_target</code></a></td>
        <td>Target cluster utilization for the ASG capacity provider; a number from 1 to 100. This number influences when scale out happens, and when instances should be scaled in. For example, a setting of 90 means that new instances will be provisioned when all instances are at 90% utilization, while instances that are only 10% utilized (CPU and Memory usage from tasks = 10%) will be scaled in.</td>
    </tr><tr>
        <td><a name="cloud_init_parts" href="#cloud_init_parts" className="snap-top"><code>cloud_init_parts</code></a></td>
        <td>Cloud init scripts to run on the ECS cluster instances during boot. See the part blocks in https://www.terraform.io/docs/providers/template/d/cloudinit_config.html for syntax</td>
    </tr><tr>
        <td><a name="cloudwatch_log_group_name" href="#cloudwatch_log_group_name" className="snap-top"><code>cloudwatch_log_group_name</code></a></td>
        <td>The name of the log group to create in CloudWatch. Defaults to `var.cluster_name-logs`.</td>
    </tr><tr>
        <td><a name="cluster_access_from_sgs" href="#cluster_access_from_sgs" className="snap-top"><code>cluster_access_from_sgs</code></a></td>
        <td>Specify a list of Security Groups that will have access to the ECS cluster. Only used if var.enable_cluster_access_ports is set to true</td>
    </tr><tr>
        <td><a name="cluster_instance_ami" href="#cluster_instance_ami" className="snap-top"><code>cluster_instance_ami</code></a></td>
        <td>The AMI to run on each instance in the ECS cluster. You can build the AMI using the Packer template ecs-node-al2.json. One of var.cluster_instance_ami or var.cluster_instance_ami_filters is required.</td>
    </tr><tr>
        <td><a name="cluster_instance_ami_filters" href="#cluster_instance_ami_filters" className="snap-top"><code>cluster_instance_ami_filters</code></a></td>
        <td>Properties on the AMI that can be used to lookup a prebuilt AMI for use with ECS workers. You can build the AMI using the Packer template ecs-node-al2.json. Only used if var.cluster_instance_ami is null. One of var.cluster_instance_ami or var.cluster_instance_ami_filters is required. Set to null if cluster_instance_ami is set.</td>
    </tr><tr>
        <td><a name="cluster_instance_associate_public_ip_address" href="#cluster_instance_associate_public_ip_address" className="snap-top"><code>cluster_instance_associate_public_ip_address</code></a></td>
        <td>Whether to associate a public IP address with an instance in a VPC</td>
    </tr><tr>
        <td><a name="cluster_instance_keypair_name" href="#cluster_instance_keypair_name" className="snap-top"><code>cluster_instance_keypair_name</code></a></td>
        <td>The name of the Key Pair that can be used to SSH to each instance in the ECS cluster</td>
    </tr><tr>
        <td><a name="cluster_instance_type" href="#cluster_instance_type" className="snap-top"><code>cluster_instance_type</code></a></td>
        <td>The type of instances to run in the ECS cluster (e.g. t2.medium)</td>
    </tr><tr>
        <td><a name="cluster_max_size" href="#cluster_max_size" className="snap-top"><code>cluster_max_size</code></a></td>
        <td>The maxiumum number of instances to run in the ECS cluster</td>
    </tr><tr>
        <td><a name="cluster_min_size" href="#cluster_min_size" className="snap-top"><code>cluster_min_size</code></a></td>
        <td>The minimum number of instances to run in the ECS cluster</td>
    </tr><tr>
        <td><a name="cluster_name" href="#cluster_name" className="snap-top"><code>cluster_name</code></a></td>
        <td>The name of the ECS cluster</td>
    </tr><tr>
        <td><a name="default_user" href="#default_user" className="snap-top"><code>default_user</code></a></td>
        <td>The default OS user for the ECS worker AMI. For AWS Amazon Linux AMIs, which is what the Packer template in ecs-node-al2.json uses, the default OS user is 'ec2-user'.</td>
    </tr><tr>
        <td><a name="disallowed_availability_zones" href="#disallowed_availability_zones" className="snap-top"><code>disallowed_availability_zones</code></a></td>
        <td>A list of availability zones in the region that should be skipped when deploying ECS. You can use this to avoid availability zones that may not be able to provision the resources (e.g instance type does not exist). If empty, allows all availability zones.</td>
    </tr><tr>
        <td><a name="enable_cloudwatch_log_aggregation" href="#enable_cloudwatch_log_aggregation" className="snap-top"><code>enable_cloudwatch_log_aggregation</code></a></td>
        <td>Set to true to enable Cloudwatch log aggregation for the ECS cluster</td>
    </tr><tr>
        <td><a name="enable_cloudwatch_metrics" href="#enable_cloudwatch_metrics" className="snap-top"><code>enable_cloudwatch_metrics</code></a></td>
        <td>Set to true to enable Cloudwatch metrics collection for the ECS cluster</td>
    </tr><tr>
        <td><a name="enable_cluster_access_ports" href="#enable_cluster_access_ports" className="snap-top"><code>enable_cluster_access_ports</code></a></td>
        <td>Specify a list of ECS Cluster ports which should be accessible from the security groups given in cluster_access_from_sgs</td>
    </tr><tr>
        <td><a name="enable_ecs_cloudwatch_alarms" href="#enable_ecs_cloudwatch_alarms" className="snap-top"><code>enable_ecs_cloudwatch_alarms</code></a></td>
        <td>Set to true to enable several basic Cloudwatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using var.alarms_sns_topic_arn</td>
    </tr><tr>
        <td><a name="enable_fail2ban" href="#enable_fail2ban" className="snap-top"><code>enable_fail2ban</code></a></td>
        <td>Enable fail2ban to block brute force log in attempts. Defaults to true</td>
    </tr><tr>
        <td><a name="enable_ip_lockdown" href="#enable_ip_lockdown" className="snap-top"><code>enable_ip_lockdown</code></a></td>
        <td>Enable ip-lockdown to block access to the instance metadata. Defaults to true</td>
    </tr><tr>
        <td><a name="enable_ssh_grunt" href="#enable_ssh_grunt" className="snap-top"><code>enable_ssh_grunt</code></a></td>
        <td>Set to true to add IAM permissions for ssh-grunt (https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ssh-grunt), which will allow you to manage SSH access via IAM groups.</td>
    </tr><tr>
        <td><a name="external_account_ssh_grunt_role_arn" href="#external_account_ssh_grunt_role_arn" className="snap-top"><code>external_account_ssh_grunt_role_arn</code></a></td>
        <td>Since our IAM users are defined in a separate AWS account, this variable is used to specify the ARN of an IAM role that allows ssh-grunt to retrieve IAM group and public SSH key info from that account.</td>
    </tr><tr>
        <td><a name="high_cpu_utilization_evaluation_periods" href="#high_cpu_utilization_evaluation_periods" className="snap-top"><code>high_cpu_utilization_evaluation_periods</code></a></td>
        <td>The number of periods over which data is compared to the specified threshold</td>
    </tr><tr>
        <td><a name="high_cpu_utilization_period" href="#high_cpu_utilization_period" className="snap-top"><code>high_cpu_utilization_period</code></a></td>
        <td>The period, in seconds, over which to measure the CPU utilization percentage. Only used if var.enable_ecs_cloudwatch_alarms is set to true</td>
    </tr><tr>
        <td><a name="high_cpu_utilization_statistic" href="#high_cpu_utilization_statistic" className="snap-top"><code>high_cpu_utilization_statistic</code></a></td>
        <td>The statistic to apply to the alarm's high CPU metric. Either of the following is supported: SampleCount, Average, Sum, Minimum, Maximum</td>
    </tr><tr>
        <td><a name="high_cpu_utilization_threshold" href="#high_cpu_utilization_threshold" className="snap-top"><code>high_cpu_utilization_threshold</code></a></td>
        <td>Trigger an alarm if the ECS Cluster has a CPU utilization percentage above this threshold. Only used if var.enable_ecs_cloudwatch_alarms is set to true</td>
    </tr><tr>
        <td><a name="high_disk_utilization_period" href="#high_disk_utilization_period" className="snap-top"><code>high_disk_utilization_period</code></a></td>
        <td>The period, in seconds, over which to measure the disk utilization percentage. Only used if var.enable_ecs_cloudwatch_alarms is set to true</td>
    </tr><tr>
        <td><a name="high_disk_utilization_threshold" href="#high_disk_utilization_threshold" className="snap-top"><code>high_disk_utilization_threshold</code></a></td>
        <td>Trigger an alarm if the EC2 instances in the ECS Cluster have a disk utilization percentage above this threshold. Only used if var.enable_ecs_cloudwatch_alarms is set to true</td>
    </tr><tr>
        <td><a name="high_memory_utilization_evaluation_periods" href="#high_memory_utilization_evaluation_periods" className="snap-top"><code>high_memory_utilization_evaluation_periods</code></a></td>
        <td>The number of periods over which data is compared to the specified threshold</td>
    </tr><tr>
        <td><a name="high_memory_utilization_period" href="#high_memory_utilization_period" className="snap-top"><code>high_memory_utilization_period</code></a></td>
        <td>The period, in seconds, over which to measure the memory utilization percentage. Only used if var.enable_ecs_cloudwatch_alarms is set to true</td>
    </tr><tr>
        <td><a name="high_memory_utilization_statistic" href="#high_memory_utilization_statistic" className="snap-top"><code>high_memory_utilization_statistic</code></a></td>
        <td>The statistic to apply to the alarm's high CPU metric. Either of the following is supported: SampleCount, Average, Sum, Minimum, Maximum</td>
    </tr><tr>
        <td><a name="high_memory_utilization_threshold" href="#high_memory_utilization_threshold" className="snap-top"><code>high_memory_utilization_threshold</code></a></td>
        <td>Trigger an alarm if the ECS Cluster has a memory utilization percentage above this threshold. Only used if var.enable_ecs_cloudwatch_alarms is set to true</td>
    </tr><tr>
        <td><a name="internal_alb_sg_ids" href="#internal_alb_sg_ids" className="snap-top"><code>internal_alb_sg_ids</code></a></td>
        <td>The Security Group ID for the internal ALB</td>
    </tr><tr>
        <td><a name="multi_az_capacity_provider" href="#multi_az_capacity_provider" className="snap-top"><code>multi_az_capacity_provider</code></a></td>
        <td>Enable a multi-az capacity provider to autoscale the EC2 ASGs created for this ECS cluster, only if capacity_provider_enabled = true</td>
    </tr><tr>
        <td><a name="public_alb_sg_ids" href="#public_alb_sg_ids" className="snap-top"><code>public_alb_sg_ids</code></a></td>
        <td>The Security Group ID for the public ALB</td>
    </tr><tr>
        <td><a name="ssh_grunt_iam_group" href="#ssh_grunt_iam_group" className="snap-top"><code>ssh_grunt_iam_group</code></a></td>
        <td>If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the nodes in this ECS cluster. This value is only used if enable_ssh_grunt=true.</td>
    </tr><tr>
        <td><a name="ssh_grunt_iam_group_sudo" href="#ssh_grunt_iam_group_sudo" className="snap-top"><code>ssh_grunt_iam_group_sudo</code></a></td>
        <td>If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the nodes in this ECS cluster with sudo permissions. This value is only used if enable_ssh_grunt=true.</td>
    </tr><tr>
        <td><a name="tenancy" href="#tenancy" className="snap-top"><code>tenancy</code></a></td>
        <td>The tenancy of this server. Must be one of: default, dedicated, or host.</td>
    </tr><tr>
        <td><a name="vpc_id" href="#vpc_id" className="snap-top"><code>vpc_id</code></a></td>
        <td>The ID of the VPC in which the ECS cluster should be launched</td>
    </tr><tr>
        <td><a name="vpc_subnet_ids" href="#vpc_subnet_ids" className="snap-top"><code>vpc_subnet_ids</code></a></td>
        <td>The IDs of the subnets in which to deploy the ECS cluster instances</td>
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
        <td><a name="all_metric_widgets" href="#all_metric_widgets" className="snap-top"><code>all_metric_widgets</code></a></td>
        <td>A list of all the CloudWatch Dashboard metric widgets available in this module.</td>
    </tr><tr>
        <td><a name="ecs_cluster_arn" href="#ecs_cluster_arn" className="snap-top"><code>ecs_cluster_arn</code></a></td>
        <td>The ID of the ECS cluster</td>
    </tr><tr>
        <td><a name="ecs_cluster_asg_name" href="#ecs_cluster_asg_name" className="snap-top"><code>ecs_cluster_asg_name</code></a></td>
        <td>The name of the ECS cluster's autoscaling group (ASG)</td>
    </tr><tr>
        <td><a name="ecs_cluster_asg_names" href="#ecs_cluster_asg_names" className="snap-top"><code>ecs_cluster_asg_names</code></a></td>
        <td>For configurations with multiple ASGs, this contains a list of ASG names.</td>
    </tr><tr>
        <td><a name="ecs_cluster_capacity_provider_names" href="#ecs_cluster_capacity_provider_names" className="snap-top"><code>ecs_cluster_capacity_provider_names</code></a></td>
        <td>For configurations with multiple capacity providers, this contains a list of all capacity provider names.</td>
    </tr><tr>
        <td><a name="ecs_cluster_launch_configuration_id" href="#ecs_cluster_launch_configuration_id" className="snap-top"><code>ecs_cluster_launch_configuration_id</code></a></td>
        <td>The ID of the launch configuration used by the ECS cluster's auto scaling group (ASG)</td>
    </tr><tr>
        <td><a name="ecs_cluster_name" href="#ecs_cluster_name" className="snap-top"><code>ecs_cluster_name</code></a></td>
        <td>The name of the ECS cluster</td>
    </tr><tr>
        <td><a name="ecs_cluster_vpc_id" href="#ecs_cluster_vpc_id" className="snap-top"><code>ecs_cluster_vpc_id</code></a></td>
        <td>The ID of the VPC into which the ECS cluster is launched</td>
    </tr><tr>
        <td><a name="ecs_cluster_vpc_subnet_ids" href="#ecs_cluster_vpc_subnet_ids" className="snap-top"><code>ecs_cluster_vpc_subnet_ids</code></a></td>
        <td>The VPC subnet IDs into which the ECS cluster can launch resources into</td>
    </tr><tr>
        <td><a name="ecs_instance_iam_role_arn" href="#ecs_instance_iam_role_arn" className="snap-top"><code>ecs_instance_iam_role_arn</code></a></td>
        <td>The ARN of the IAM role applied to ECS instances</td>
    </tr><tr>
        <td><a name="ecs_instance_iam_role_id" href="#ecs_instance_iam_role_id" className="snap-top"><code>ecs_instance_iam_role_id</code></a></td>
        <td>The ID of the IAM role applied to ECS instances</td>
    </tr><tr>
        <td><a name="ecs_instance_iam_role_name" href="#ecs_instance_iam_role_name" className="snap-top"><code>ecs_instance_iam_role_name</code></a></td>
        <td>The name of the IAM role applied to ECS instances</td>
    </tr><tr>
        <td><a name="ecs_instance_security_group_id" href="#ecs_instance_security_group_id" className="snap-top"><code>ecs_instance_security_group_id</code></a></td>
        <td>The ID of the security group applied to ECS instances</td>
    </tr><tr>
        <td><a name="metric_widget_ecs_cluster_cpu_usage" href="#metric_widget_ecs_cluster_cpu_usage" className="snap-top"><code>metric_widget_ecs_cluster_cpu_usage</code></a></td>
        <td>The CloudWatch Dashboard metric widget for the ECS cluster workers' CPU utilization metric.</td>
    </tr><tr>
        <td><a name="metric_widget_ecs_cluster_memory_usage" href="#metric_widget_ecs_cluster_memory_usage" className="snap-top"><code>metric_widget_ecs_cluster_memory_usage</code></a></td>
        <td>The CloudWatch Dashboard metric widget for the ECS cluster workers' Memory utilization metric.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"5e25d77bd0c9db653b2986729829f383"}
##DOCS-SOURCER-END -->
