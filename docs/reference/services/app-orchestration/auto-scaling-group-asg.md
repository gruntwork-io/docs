import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Auto Scaling Group (ASG)

Deploy an AMI across an Auto Scaling Group (ASG), with support for zero-downtime, rolling deployment, load balancing, health checks, service discovery, and auto scaling.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/asg-service" className="link-button">View on GitHub</a>

### Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<a name="alarm_sns_topic_arns_us_east_1" className="snap-top"></a>

* [**`alarm_sns_topic_arns_us_east_1`**](#alarm_sns_topic_arns_us_east_1) &mdash; A list of SNS topic ARNs to notify when the health check changes to ALARM, OK, or [`INSUFFICIENT_DATA`](#INSUFFICIENT_DATA) state. Note: these SNS topics MUST be in us-east-1! This is because Route 53 only sends CloudWatch metrics to us-east-1, so we must create the alarm in that region, and therefore, can only notify SNS topics in that region.

<a name="alarms_sns_topic_arn" className="snap-top"></a>

* [**`alarms_sns_topic_arn`**](#alarms_sns_topic_arn) &mdash; The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications. Also used for the alarms if the Jenkins backup job fails.

<a name="allow_inbound_from_cidr_blocks" className="snap-top"></a>

* [**`allow_inbound_from_cidr_blocks`**](#allow_inbound_from_cidr_blocks) &mdash; The CIDR blocks from which to allow access to the ports in [`server_ports`](#server_ports)

<a name="allow_inbound_from_security_group_ids" className="snap-top"></a>

* [**`allow_inbound_from_security_group_ids`**](#allow_inbound_from_security_group_ids) &mdash; The security group IDs from which to allow access to the ports in [`server_ports`](#server_ports)

<a name="allow_ssh_from_cidr_blocks" className="snap-top"></a>

* [**`allow_ssh_from_cidr_blocks`**](#allow_ssh_from_cidr_blocks) &mdash; The CIDR blocks from which to allow SSH access

<a name="allow_ssh_security_group_ids" className="snap-top"></a>

* [**`allow_ssh_security_group_ids`**](#allow_ssh_security_group_ids) &mdash; The security group IDs from which to allow SSH access

<a name="ami" className="snap-top"></a>

* [**`ami`**](#ami) &mdash; The ID of the AMI to run on each instance in the ASG. The AMI needs to have `ec2-baseline` installed, since by default it will run [``start_ec2_baseline`](#`start_ec2_baseline)` on the User Data.

<a name="ami_filters" className="snap-top"></a>

* [**`ami_filters`**](#ami_filters) &mdash; Properties on the AMI that can be used to lookup a prebuilt AMI for use with the Bastion Host. You can build the AMI using the Packer template bastion-host.json. Only used if var.ami is null. One of var.ami or [`ami_filters`](#ami_filters) is required. Set to null if passing the ami ID directly.

<a name="cloud_init_parts" className="snap-top"></a>

* [**`cloud_init_parts`**](#cloud_init_parts) &mdash; Cloud init scripts to run on the ASG instances during boot. See the part blocks in [`https://www.terraform.io/docs/providers/template/d/cloudinit_config`](#https://www.terraform.io/docs/providers/template/d/cloudinit_config).html for syntax

<a name="create_route53_entry" className="snap-top"></a>

* [**`create_route53_entry`**](#create_route53_entry) &mdash; Set to true to create a DNS A record in Route 53 for this service.

<a name="custom_tags" className="snap-top"></a>

* [**`custom_tags`**](#custom_tags) &mdash; A list of custom tags to apply to the EC2 Instances in this ASG. Each item in this list should be a map with the parameters key, value, and [`propagate_at_launch`](#propagate_at_launch).

<a name="default_forward_target_group_arns" className="snap-top"></a>

* [**`default_forward_target_group_arns`**](#default_forward_target_group_arns) &mdash; The ARN of the Target Group to which to route traffic.

<a name="default_user" className="snap-top"></a>

* [**`default_user`**](#default_user) &mdash; The default OS user for the service AMI. For example, for AWS Ubuntu AMIs, the default OS user is 'ubuntu'.

<a name="desired_capacity" className="snap-top"></a>

* [**`desired_capacity`**](#desired_capacity) &mdash; The desired number of EC2 Instances to run in the ASG initially. Note that auto scaling policies may change this value. If you're using auto scaling policies to dynamically resize the cluster, you should actually leave this value as null.

<a name="domain_name" className="snap-top"></a>

* [**`domain_name`**](#domain_name) &mdash; The domain name to register in [`hosted_zone_id`](#hosted_zone_id) (e.g. foo.example.com). Only used if [`create_route53_entry`](#create_route53_entry) is true.

<a name="enable_cloudwatch_alarms" className="snap-top"></a>

* [**`enable_cloudwatch_alarms`**](#enable_cloudwatch_alarms) &mdash; Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using [`alarms_sns_topic_arn`](#alarms_sns_topic_arn).

<a name="enable_cloudwatch_log_aggregation" className="snap-top"></a>

* [**`enable_cloudwatch_log_aggregation`**](#enable_cloudwatch_log_aggregation) &mdash; Set to true to add AIM permissions to send logs to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/cloudwatch-log-aggregation-scripts to do log aggregation in CloudWatch.

<a name="enable_cloudwatch_metrics" className="snap-top"></a>

* [**`enable_cloudwatch_metrics`**](#enable_cloudwatch_metrics) &mdash; Set to true to add IAM permissions to send custom metrics to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent to get memory and disk metrics in CloudWatch for your Auto Scaling Group

<a name="enable_fail2ban" className="snap-top"></a>

* [**`enable_fail2ban`**](#enable_fail2ban) &mdash; Enable fail2ban to block brute force log in attempts. Defaults to true

<a name="enable_ip_lockdown" className="snap-top"></a>

* [**`enable_ip_lockdown`**](#enable_ip_lockdown) &mdash; Enable ip-lockdown to block access to the instance metadata. Defaults to true

<a name="enable_route53_health_check" className="snap-top"></a>

* [**`enable_route53_health_check`**](#enable_route53_health_check) &mdash; If set to true, use Route 53 to perform health checks on [`domain_name`](#domain_name).

<a name="enabled_metrics" className="snap-top"></a>

* [**`enabled_metrics`**](#enabled_metrics) &mdash; A list of metrics the ASG should enable for monitoring all instances in a group. The allowed values are GroupMinSize, GroupMaxSize, GroupDesiredCapacity, GroupInServiceInstances, GroupPendingInstances, GroupStandbyInstances, GroupTerminatingInstances, GroupTotalInstances.

<a name="external_account_ssh_grunt_role_arn" className="snap-top"></a>

* [**`external_account_ssh_grunt_role_arn`**](#external_account_ssh_grunt_role_arn) &mdash; Since our IAM users are defined in a separate AWS account, this variable is used to specify the ARN of an IAM role that allows ssh-grunt to retrieve IAM group and public SSH key info from that account.

<a name="fixed_response_listener_rules" className="snap-top"></a>

* [**`fixed_response_listener_rules`**](#fixed_response_listener_rules) &mdash; Listener rules for a fixed-response action. See comments below for information about the parameters.

<a name="forward_listener_rules" className="snap-top"></a>

* [**`forward_listener_rules`**](#forward_listener_rules) &mdash; Listener rules for a forward action that distributes requests among one or more target groups. By default, sends traffic to the target groups created for the ports in [`server_ports`](#server_ports). See comments below for information about the parameters.

<a name="health_check_grace_period" className="snap-top"></a>

* [**`health_check_grace_period`**](#health_check_grace_period) &mdash; Time, in seconds, after an EC2 Instance comes into service before checking health.

<a name="hosted_zone_id" className="snap-top"></a>

* [**`hosted_zone_id`**](#hosted_zone_id) &mdash; The ID of the Route 53 Hosted Zone in which to create a DNS A record for the Auto Scaling Group. Optional if [`create_route53_entry`](#create_route53_entry) = false.

<a name="iam_policy" className="snap-top"></a>

* [**`iam_policy`**](#iam_policy) &mdash; An object defining the policy to attach to [``iam_role_name`](#`iam_role_name)` if the IAM role is going to be created. Accepts a map of objects, where the map keys are sids for IAM policy statements, and the object fields are the resources, actions, and the effect ("Allow" or "Deny") of the statement. Ignored if [``iam_role_arn`](#`iam_role_arn)` is provided. Leave as null if you do not wish to use IAM role with Service Accounts.

<a name="instance_type" className="snap-top"></a>

* [**`instance_type`**](#instance_type) &mdash; The type of instance to run in the ASG (e.g. t3.medium)

<a name="key_pair_name" className="snap-top"></a>

* [**`key_pair_name`**](#key_pair_name) &mdash; The name of a Key Pair that can be used to SSH to the EC2 Instances in the ASG. Set to null if you don't want to enable Key Pair auth.

<a name="lb_hosted_zone_id" className="snap-top"></a>

* [**`lb_hosted_zone_id`**](#lb_hosted_zone_id) &mdash; The ID of the Route 53 Hosted Zone in which to create a DNS A record for the Auto Scaling Group. Optional if [`create_route53_entry`](#create_route53_entry) = false.

<a name="listener_arns" className="snap-top"></a>

* [**`listener_arns`**](#listener_arns) &mdash; A map of all the listeners on the load balancer. The keys should be the port numbers and the values should be the ARN of the listener for that port.

<a name="listener_ports" className="snap-top"></a>

* [**`listener_ports`**](#listener_ports) &mdash; The ports the ALB listens on for requests

<a name="load_balancers" className="snap-top"></a>

* [**`load_balancers`**](#load_balancers) &mdash; A list of Elastic Load Balancer (ELB) names to associate with this ASG. If you're using the Application Load Balancer (ALB), see [`target_group_arns`](#target_group_arns).

<a name="max_size" className="snap-top"></a>

* [**`max_size`**](#max_size) &mdash; The maximum number of EC2 Instances to run in this ASG

<a name="metadata_users" className="snap-top"></a>

* [**`metadata_users`**](#metadata_users) &mdash; List of users on the ASG EC2 instances that should be permitted access to the EC2 metadata.

<a name="min_elb_capacity" className="snap-top"></a>

* [**`min_elb_capacity`**](#min_elb_capacity) &mdash; Wait for this number of EC2 Instances to show up healthy in the load balancer on creation.

<a name="min_size" className="snap-top"></a>

* [**`min_size`**](#min_size) &mdash; The minimum number of EC2 Instances to run in this ASG

<a name="name" className="snap-top"></a>

* [**`name`**](#name) &mdash; The name for the ASG and all other resources created by these templates.

<a name="original_lb_dns_name" className="snap-top"></a>

* [**`original_lb_dns_name`**](#original_lb_dns_name) &mdash; The DNS name that was assigned by AWS to the load balancer upon creation

<a name="redirect_listener_rules" className="snap-top"></a>

* [**`redirect_listener_rules`**](#redirect_listener_rules) &mdash; Listener rules for a redirect action. See comments below for information about the parameters.

<a name="secrets_access" className="snap-top"></a>

* [**`secrets_access`**](#secrets_access) &mdash; A list of ARNs of Secrets Manager secrets that the task should have permissions to read. The IAM role for the task will be granted `secretsmanager:GetSecretValue` for each secret in the list. The ARN can be either the complete ARN, including the randomly generated suffix, or the ARN without the suffix. If the latter, the module will look up the full ARN automatically. This is helpful in cases where you don't yet know the randomly generated suffix because the rest of the ARN is a predictable value.

<a name="server_ports" className="snap-top"></a>

* [**`server_ports`**](#server_ports) &mdash; The ports the EC2 instances listen on for requests. A Target Group will be created for each port and any rules specified in [`forward_rules`](#forward_rules) will forward traffic to these Target Groups.

<a name="ssh_grunt_iam_group" className="snap-top"></a>

* [**`ssh_grunt_iam_group`**](#ssh_grunt_iam_group) &mdash; If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the instances. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).

<a name="ssh_grunt_iam_group_sudo" className="snap-top"></a>

* [**`ssh_grunt_iam_group_sudo`**](#ssh_grunt_iam_group_sudo) &mdash; If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the instances with sudo permissions. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).

<a name="ssh_port" className="snap-top"></a>

* [**`ssh_port`**](#ssh_port) &mdash; The port at which SSH will be allowed from [`allow_ssh_from_cidr_blocks`](#allow_ssh_from_cidr_blocks) and [`allow_ssh_security_group_ids`](#allow_ssh_security_group_ids)

<a name="subnet_ids" className="snap-top"></a>

* [**`subnet_ids`**](#subnet_ids) &mdash; The list of IDs of the subnets in which to deploy ASG. The list must only contain subnets in [`vpc_id`](#vpc_id).

<a name="tag_asg_id_key" className="snap-top"></a>

* [**`tag_asg_id_key`**](#tag_asg_id_key) &mdash; The key for the tag that will be used to associate a unique identifier with this ASG. This identifier will persist between redeploys of the ASG, even though the underlying ASG is being deleted and replaced with a different one.

<a name="termination_policies" className="snap-top"></a>

* [**`termination_policies`**](#termination_policies) &mdash; A list of policies to decide how the instances in the auto scale group should be terminated. The allowed values are OldestInstance, NewestInstance, OldestLaunchConfiguration, ClosestToNextInstanceHour, Default.

<a name="use_elb_health_checks" className="snap-top"></a>

* [**`use_elb_health_checks`**](#use_elb_health_checks) &mdash; Whether or not ELB or ALB health checks should be enabled. If set to true, the [`load_balancers`](#load_balancers) or [`target_groups_arns`](#target_groups_arns) variable should be set depending on the load balancer type you are using. Useful for testing connectivity before health check endpoints are available.

<a name="vpc_id" className="snap-top"></a>

* [**`vpc_id`**](#vpc_id) &mdash; The ID of the VPC in which to deploy the Auto Scaling Group

<a name="wait_for_capacity_timeout" className="snap-top"></a>

* [**`wait_for_capacity_timeout`**](#wait_for_capacity_timeout) &mdash; A maximum duration that Terraform should wait for the EC2 Instances to be healthy before timing out.

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="asg_name" className="snap-top"></a>

* [**`asg_name`**](#asg_name) &mdash; The name of the auto scaling group.

<a name="asg_unique_id" className="snap-top"></a>

* [**`asg_unique_id`**](#asg_unique_id) &mdash; A unique ID common to all ASGs used for [`get_desired_capacity`](#get_desired_capacity) on new deploys.

<a name="fully_qualified_domain_name" className="snap-top"></a>

* [**`fully_qualified_domain_name`**](#fully_qualified_domain_name) &mdash; The Fully Qualified Domain Name built using the zone domain and name.

<a name="launch_configuration_id" className="snap-top"></a>

* [**`launch_configuration_id`**](#launch_configuration_id) &mdash; The ID of the launch configuration used for the ASG.

<a name="launch_configuration_name" className="snap-top"></a>

* [**`launch_configuration_name`**](#launch_configuration_name) &mdash; The name of the launch configuration used for the ASG.

<a name="lb_listener_rule_fixed_response_arns" className="snap-top"></a>

* [**`lb_listener_rule_fixed_response_arns`**](#lb_listener_rule_fixed_response_arns) &mdash; The ARNs of the rules of type fixed-response. The key is the same key of the rule from the [``fixed_response_rules`](#`fixed_response_rules)` variable.

<a name="lb_listener_rule_forward_arns" className="snap-top"></a>

* [**`lb_listener_rule_forward_arns`**](#lb_listener_rule_forward_arns) &mdash; The ARNs of the rules of type forward. The key is the same key of the rule from the [``forward_rules`](#`forward_rules)` variable.

<a name="lb_listener_rule_redirect_arns" className="snap-top"></a>

* [**`lb_listener_rule_redirect_arns`**](#lb_listener_rule_redirect_arns) &mdash; The ARNs of the rules of type redirect. The key is the same key of the rule from the [``redirect_rules`](#`redirect_rules)` variable.

<a name="security_group_id" className="snap-top"></a>

* [**`security_group_id`**](#security_group_id) &mdash; The ID of the Security Group that belongs to the ASG.

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"79f18ee98f85ad50817f2fb6b75355e2"}
##DOCS-SOURCER-END -->
