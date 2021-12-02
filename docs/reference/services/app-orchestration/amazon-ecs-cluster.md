import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon ECS Cluster

Deploy an Amazon ECS Cluster

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/ecs-cluster" class="link-button">View on GitHub</a>

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
        <td>alarms_sns_topic_arn</td>
        <td>The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications</td>
    </tr><tr>
        <td>allow_ssh_from_cidr_blocks</td>
        <td>The IP address ranges in CIDR format from which to allow incoming SSH requests to the ECS instances.</td>
    </tr><tr>
        <td>allow_ssh_from_security_group_ids</td>
        <td>The IDs of security groups from which to allow incoming SSH requests to the ECS instances.</td>
    </tr><tr>
        <td>autoscaling_termination_protection</td>
        <td>Protect EC2 instances running ECS tasks from being terminated due to scale in (spot instances do not support lifecycle modifications). Note that the behavior of termination protection differs between clusters with capacity providers and clusters without. When capacity providers is turned on and this flag is true, only instances that have 0 ECS tasks running will be scaled in, regardless of capacity_provider_target. If capacity providers is turned off and this flag is true, this will prevent ANY instances from being scaled in.</td>
    </tr><tr>
        <td>capacity_provider_enabled</td>
        <td>Enable a capacity provider to autoscale the EC2 ASG created for this ECS cluster.</td>
    </tr><tr>
        <td>capacity_provider_max_scale_step</td>
        <td>Maximum step adjustment size to the ASG's desired instance count. A number between 1 and 10000.</td>
    </tr><tr>
        <td>capacity_provider_min_scale_step</td>
        <td>Minimum step adjustment size to the ASG's desired instance count. A number between 1 and 10000.</td>
    </tr><tr>
        <td>capacity_provider_target</td>
        <td>Target cluster utilization for the ASG capacity provider; a number from 1 to 100. This number influences when scale out happens, and when instances should be scaled in. For example, a setting of 90 means that new instances will be provisioned when all instances are at 90% utilization, while instances that are only 10% utilized (CPU and Memory usage from tasks = 10%) will be scaled in.</td>
    </tr><tr>
        <td>cloud_init_parts</td>
        <td>Cloud init scripts to run on the ECS cluster instances during boot. See the part blocks in https://www.terraform.io/docs/providers/template/d/cloudinit_config.html for syntax</td>
    </tr><tr>
        <td>cloudwatch_log_group_name</td>
        <td>The name of the log group to create in CloudWatch. Defaults to `var.cluster_name-logs`.</td>
    </tr><tr>
        <td>cluster_access_from_sgs</td>
        <td>Specify a list of Security Groups that will have access to the ECS cluster. Only used if var.enable_cluster_access_ports is set to true</td>
    </tr><tr>
        <td>cluster_instance_ami</td>
        <td>The AMI to run on each instance in the ECS cluster. You can build the AMI using the Packer template ecs-node-al2.json. One of var.cluster_instance_ami or var.cluster_instance_ami_filters is required.</td>
    </tr><tr>
        <td>cluster_instance_ami_filters</td>
        <td>Properties on the AMI that can be used to lookup a prebuilt AMI for use with ECS workers. You can build the AMI using the Packer template ecs-node-al2.json. Only used if var.cluster_instance_ami is null. One of var.cluster_instance_ami or var.cluster_instance_ami_filters is required. Set to null if cluster_instance_ami is set.</td>
    </tr><tr>
        <td>cluster_instance_associate_public_ip_address</td>
        <td>Whether to associate a public IP address with an instance in a VPC</td>
    </tr><tr>
        <td>cluster_instance_keypair_name</td>
        <td>The name of the Key Pair that can be used to SSH to each instance in the ECS cluster</td>
    </tr><tr>
        <td>cluster_instance_type</td>
        <td>The type of instances to run in the ECS cluster (e.g. t2.medium)</td>
    </tr><tr>
        <td>cluster_max_size</td>
        <td>The maxiumum number of instances to run in the ECS cluster</td>
    </tr><tr>
        <td>cluster_min_size</td>
        <td>The minimum number of instances to run in the ECS cluster</td>
    </tr><tr>
        <td>cluster_name</td>
        <td>The name of the ECS cluster</td>
    </tr><tr>
        <td>default_user</td>
        <td>The default OS user for the ECS worker AMI. For AWS Amazon Linux AMIs, which is what the Packer template in ecs-node-al2.json uses, the default OS user is 'ec2-user'.</td>
    </tr><tr>
        <td>disallowed_availability_zones</td>
        <td>A list of availability zones in the region that should be skipped when deploying ECS. You can use this to avoid availability zones that may not be able to provision the resources (e.g instance type does not exist). If empty, allows all availability zones.</td>
    </tr><tr>
        <td>enable_cloudwatch_log_aggregation</td>
        <td>Set to true to enable Cloudwatch log aggregation for the ECS cluster</td>
    </tr><tr>
        <td>enable_cloudwatch_metrics</td>
        <td>Set to true to enable Cloudwatch metrics collection for the ECS cluster</td>
    </tr><tr>
        <td>enable_cluster_access_ports</td>
        <td>Specify a list of ECS Cluster ports which should be accessible from the security groups given in cluster_access_from_sgs</td>
    </tr><tr>
        <td>enable_ecs_cloudwatch_alarms</td>
        <td>Set to true to enable several basic Cloudwatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using var.alarms_sns_topic_arn</td>
    </tr><tr>
        <td>enable_fail2ban</td>
        <td>Enable fail2ban to block brute force log in attempts. Defaults to true</td>
    </tr><tr>
        <td>enable_ip_lockdown</td>
        <td>Enable ip-lockdown to block access to the instance metadata. Defaults to true</td>
    </tr><tr>
        <td>enable_ssh_grunt</td>
        <td>Set to true to add IAM permissions for ssh-grunt (https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ssh-grunt), which will allow you to manage SSH access via IAM groups.</td>
    </tr><tr>
        <td>external_account_ssh_grunt_role_arn</td>
        <td>Since our IAM users are defined in a separate AWS account, this variable is used to specify the ARN of an IAM role that allows ssh-grunt to retrieve IAM group and public SSH key info from that account.</td>
    </tr><tr>
        <td>high_cpu_utilization_evaluation_periods</td>
        <td>The number of periods over which data is compared to the specified threshold</td>
    </tr><tr>
        <td>high_cpu_utilization_period</td>
        <td>The period, in seconds, over which to measure the CPU utilization percentage. Only used if var.enable_ecs_cloudwatch_alarms is set to true</td>
    </tr><tr>
        <td>high_cpu_utilization_statistic</td>
        <td>The statistic to apply to the alarm's high CPU metric. Either of the following is supported: SampleCount, Average, Sum, Minimum, Maximum</td>
    </tr><tr>
        <td>high_cpu_utilization_threshold</td>
        <td>Trigger an alarm if the ECS Cluster has a CPU utilization percentage above this threshold. Only used if var.enable_ecs_cloudwatch_alarms is set to true</td>
    </tr><tr>
        <td>high_disk_utilization_period</td>
        <td>The period, in seconds, over which to measure the disk utilization percentage. Only used if var.enable_ecs_cloudwatch_alarms is set to true</td>
    </tr><tr>
        <td>high_disk_utilization_threshold</td>
        <td>Trigger an alarm if the EC2 instances in the ECS Cluster have a disk utilization percentage above this threshold. Only used if var.enable_ecs_cloudwatch_alarms is set to true</td>
    </tr><tr>
        <td>high_memory_utilization_evaluation_periods</td>
        <td>The number of periods over which data is compared to the specified threshold</td>
    </tr><tr>
        <td>high_memory_utilization_period</td>
        <td>The period, in seconds, over which to measure the memory utilization percentage. Only used if var.enable_ecs_cloudwatch_alarms is set to true</td>
    </tr><tr>
        <td>high_memory_utilization_statistic</td>
        <td>The statistic to apply to the alarm's high CPU metric. Either of the following is supported: SampleCount, Average, Sum, Minimum, Maximum</td>
    </tr><tr>
        <td>high_memory_utilization_threshold</td>
        <td>Trigger an alarm if the ECS Cluster has a memory utilization percentage above this threshold. Only used if var.enable_ecs_cloudwatch_alarms is set to true</td>
    </tr><tr>
        <td>internal_alb_sg_ids</td>
        <td>The Security Group ID for the internal ALB</td>
    </tr><tr>
        <td>multi_az_capacity_provider</td>
        <td>Enable a multi-az capacity provider to autoscale the EC2 ASGs created for this ECS cluster, only if capacity_provider_enabled = true</td>
    </tr><tr>
        <td>public_alb_sg_ids</td>
        <td>The Security Group ID for the public ALB</td>
    </tr><tr>
        <td>ssh_grunt_iam_group</td>
        <td>If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the nodes in this ECS cluster. This value is only used if enable_ssh_grunt=true.</td>
    </tr><tr>
        <td>ssh_grunt_iam_group_sudo</td>
        <td>If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the nodes in this ECS cluster with sudo permissions. This value is only used if enable_ssh_grunt=true.</td>
    </tr><tr>
        <td>tenancy</td>
        <td>The tenancy of this server. Must be one of: default, dedicated, or host.</td>
    </tr><tr>
        <td>vpc_id</td>
        <td>The ID of the VPC in which the ECS cluster should be launched</td>
    </tr><tr>
        <td>vpc_subnet_ids</td>
        <td>The IDs of the subnets in which to deploy the ECS cluster instances</td>
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
        <td>all_metric_widgets</td>
        <td>A list of all the CloudWatch Dashboard metric widgets available in this module.</td>
    </tr><tr>
        <td>ecs_cluster_arn</td>
        <td>The ID of the ECS cluster</td>
    </tr><tr>
        <td>ecs_cluster_asg_name</td>
        <td>The name of the ECS cluster's autoscaling group (ASG)</td>
    </tr><tr>
        <td>ecs_cluster_asg_names</td>
        <td>For configurations with multiple ASGs, this contains a list of ASG names.</td>
    </tr><tr>
        <td>ecs_cluster_capacity_provider_names</td>
        <td>For configurations with multiple capacity providers, this contains a list of all capacity provider names.</td>
    </tr><tr>
        <td>ecs_cluster_launch_configuration_id</td>
        <td>The ID of the launch configuration used by the ECS cluster's auto scaling group (ASG)</td>
    </tr><tr>
        <td>ecs_cluster_name</td>
        <td>The name of the ECS cluster</td>
    </tr><tr>
        <td>ecs_cluster_vpc_id</td>
        <td>The ID of the VPC into which the ECS cluster is launched</td>
    </tr><tr>
        <td>ecs_cluster_vpc_subnet_ids</td>
        <td>The VPC subnet IDs into which the ECS cluster can launch resources into</td>
    </tr><tr>
        <td>ecs_instance_iam_role_arn</td>
        <td>The ARN of the IAM role applied to ECS instances</td>
    </tr><tr>
        <td>ecs_instance_iam_role_id</td>
        <td>The ID of the IAM role applied to ECS instances</td>
    </tr><tr>
        <td>ecs_instance_iam_role_name</td>
        <td>The name of the IAM role applied to ECS instances</td>
    </tr><tr>
        <td>ecs_instance_security_group_id</td>
        <td>The ID of the security group applied to ECS instances</td>
    </tr><tr>
        <td>metric_widget_ecs_cluster_cpu_usage</td>
        <td>The CloudWatch Dashboard metric widget for the ECS cluster workers' CPU utilization metric.</td>
    </tr><tr>
        <td>metric_widget_ecs_cluster_memory_usage</td>
        <td>The CloudWatch Dashboard metric widget for the ECS cluster workers' Memory utilization metric.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"ae3ac1fa3396b95b8166b2adce4bf7fb"}
##DOCS-SOURCER-END -->
