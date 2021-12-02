import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Auto Scaling Group (ASG)

Deploy an AMI across an Auto Scaling Group (ASG), with support for zero-downtime, rolling deployment, load balancing, health checks, service discovery, and auto scaling.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/asg-service" className="link-button">View on GitHub</a>

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
        <td><a name="alarm_sns_topic_arns_us_east_1" href="#alarm_sns_topic_arns_us_east_1" className="snap-top"><code>alarm_sns_topic_arns_us_east_1</code></a></td>
        <td>A list of SNS topic ARNs to notify when the health check changes to ALARM, OK, or INSUFFICIENT_DATA state. Note: these SNS topics MUST be in us-east-1! This is because Route 53 only sends CloudWatch metrics to us-east-1, so we must create the alarm in that region, and therefore, can only notify SNS topics in that region.</td>
    </tr><tr>
        <td><a name="alarms_sns_topic_arn" href="#alarms_sns_topic_arn" className="snap-top"><code>alarms_sns_topic_arn</code></a></td>
        <td>The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications. Also used for the alarms if the Jenkins backup job fails.</td>
    </tr><tr>
        <td><a name="allow_inbound_from_cidr_blocks" href="#allow_inbound_from_cidr_blocks" className="snap-top"><code>allow_inbound_from_cidr_blocks</code></a></td>
        <td>The CIDR blocks from which to allow access to the ports in var.server_ports</td>
    </tr><tr>
        <td><a name="allow_inbound_from_security_group_ids" href="#allow_inbound_from_security_group_ids" className="snap-top"><code>allow_inbound_from_security_group_ids</code></a></td>
        <td>The security group IDs from which to allow access to the ports in var.server_ports</td>
    </tr><tr>
        <td><a name="allow_ssh_from_cidr_blocks" href="#allow_ssh_from_cidr_blocks" className="snap-top"><code>allow_ssh_from_cidr_blocks</code></a></td>
        <td>The CIDR blocks from which to allow SSH access</td>
    </tr><tr>
        <td><a name="allow_ssh_security_group_ids" href="#allow_ssh_security_group_ids" className="snap-top"><code>allow_ssh_security_group_ids</code></a></td>
        <td>The security group IDs from which to allow SSH access</td>
    </tr><tr>
        <td><a name="ami" href="#ami" className="snap-top"><code>ami</code></a></td>
        <td>The ID of the AMI to run on each instance in the ASG. The AMI needs to have `ec2-baseline` installed, since by default it will run `start_ec2_baseline` on the User Data.</td>
    </tr><tr>
        <td><a name="ami_filters" href="#ami_filters" className="snap-top"><code>ami_filters</code></a></td>
        <td>Properties on the AMI that can be used to lookup a prebuilt AMI for use with the Bastion Host. You can build the AMI using the Packer template bastion-host.json. Only used if var.ami is null. One of var.ami or var.ami_filters is required. Set to null if passing the ami ID directly.</td>
    </tr><tr>
        <td><a name="cloud_init_parts" href="#cloud_init_parts" className="snap-top"><code>cloud_init_parts</code></a></td>
        <td>Cloud init scripts to run on the ASG instances during boot. See the part blocks in https://www.terraform.io/docs/providers/template/d/cloudinit_config.html for syntax</td>
    </tr><tr>
        <td><a name="create_route53_entry" href="#create_route53_entry" className="snap-top"><code>create_route53_entry</code></a></td>
        <td>Set to true to create a DNS A record in Route 53 for this service.</td>
    </tr><tr>
        <td><a name="custom_tags" href="#custom_tags" className="snap-top"><code>custom_tags</code></a></td>
        <td>A list of custom tags to apply to the EC2 Instances in this ASG. Each item in this list should be a map with the parameters key, value, and propagate_at_launch.</td>
    </tr><tr>
        <td><a name="default_forward_target_group_arns" href="#default_forward_target_group_arns" className="snap-top"><code>default_forward_target_group_arns</code></a></td>
        <td>The ARN of the Target Group to which to route traffic.</td>
    </tr><tr>
        <td><a name="default_user" href="#default_user" className="snap-top"><code>default_user</code></a></td>
        <td>The default OS user for the service AMI. For example, for AWS Ubuntu AMIs, the default OS user is 'ubuntu'.</td>
    </tr><tr>
        <td><a name="desired_capacity" href="#desired_capacity" className="snap-top"><code>desired_capacity</code></a></td>
        <td>The desired number of EC2 Instances to run in the ASG initially. Note that auto scaling policies may change this value. If you're using auto scaling policies to dynamically resize the cluster, you should actually leave this value as null.</td>
    </tr><tr>
        <td><a name="domain_name" href="#domain_name" className="snap-top"><code>domain_name</code></a></td>
        <td>The domain name to register in var.hosted_zone_id (e.g. foo.example.com). Only used if var.create_route53_entry is true.</td>
    </tr><tr>
        <td><a name="enable_cloudwatch_alarms" href="#enable_cloudwatch_alarms" className="snap-top"><code>enable_cloudwatch_alarms</code></a></td>
        <td>Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using var.alarms_sns_topic_arn.</td>
    </tr><tr>
        <td><a name="enable_cloudwatch_log_aggregation" href="#enable_cloudwatch_log_aggregation" className="snap-top"><code>enable_cloudwatch_log_aggregation</code></a></td>
        <td>Set to true to add AIM permissions to send logs to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/cloudwatch-log-aggregation-scripts to do log aggregation in CloudWatch.</td>
    </tr><tr>
        <td><a name="enable_cloudwatch_metrics" href="#enable_cloudwatch_metrics" className="snap-top"><code>enable_cloudwatch_metrics</code></a></td>
        <td>Set to true to add IAM permissions to send custom metrics to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent to get memory and disk metrics in CloudWatch for your Auto Scaling Group</td>
    </tr><tr>
        <td><a name="enable_fail2ban" href="#enable_fail2ban" className="snap-top"><code>enable_fail2ban</code></a></td>
        <td>Enable fail2ban to block brute force log in attempts. Defaults to true</td>
    </tr><tr>
        <td><a name="enable_ip_lockdown" href="#enable_ip_lockdown" className="snap-top"><code>enable_ip_lockdown</code></a></td>
        <td>Enable ip-lockdown to block access to the instance metadata. Defaults to true</td>
    </tr><tr>
        <td><a name="enable_route53_health_check" href="#enable_route53_health_check" className="snap-top"><code>enable_route53_health_check</code></a></td>
        <td>If set to true, use Route 53 to perform health checks on var.domain_name.</td>
    </tr><tr>
        <td><a name="enabled_metrics" href="#enabled_metrics" className="snap-top"><code>enabled_metrics</code></a></td>
        <td>A list of metrics the ASG should enable for monitoring all instances in a group. The allowed values are GroupMinSize, GroupMaxSize, GroupDesiredCapacity, GroupInServiceInstances, GroupPendingInstances, GroupStandbyInstances, GroupTerminatingInstances, GroupTotalInstances.</td>
    </tr><tr>
        <td><a name="external_account_ssh_grunt_role_arn" href="#external_account_ssh_grunt_role_arn" className="snap-top"><code>external_account_ssh_grunt_role_arn</code></a></td>
        <td>Since our IAM users are defined in a separate AWS account, this variable is used to specify the ARN of an IAM role that allows ssh-grunt to retrieve IAM group and public SSH key info from that account.</td>
    </tr><tr>
        <td><a name="fixed_response_listener_rules" href="#fixed_response_listener_rules" className="snap-top"><code>fixed_response_listener_rules</code></a></td>
        <td>Listener rules for a fixed-response action. See comments below for information about the parameters.</td>
    </tr><tr>
        <td><a name="forward_listener_rules" href="#forward_listener_rules" className="snap-top"><code>forward_listener_rules</code></a></td>
        <td>Listener rules for a forward action that distributes requests among one or more target groups. By default, sends traffic to the target groups created for the ports in var.server_ports. See comments below for information about the parameters.</td>
    </tr><tr>
        <td><a name="health_check_grace_period" href="#health_check_grace_period" className="snap-top"><code>health_check_grace_period</code></a></td>
        <td>Time, in seconds, after an EC2 Instance comes into service before checking health.</td>
    </tr><tr>
        <td><a name="hosted_zone_id" href="#hosted_zone_id" className="snap-top"><code>hosted_zone_id</code></a></td>
        <td>The ID of the Route 53 Hosted Zone in which to create a DNS A record for the Auto Scaling Group. Optional if create_route53_entry = false.</td>
    </tr><tr>
        <td><a name="iam_policy" href="#iam_policy" className="snap-top"><code>iam_policy</code></a></td>
        <td>An object defining the policy to attach to `iam_role_name` if the IAM role is going to be created. Accepts a map of objects, where the map keys are sids for IAM policy statements, and the object fields are the resources, actions, and the effect ("Allow" or "Deny") of the statement. Ignored if `iam_role_arn` is provided. Leave as null if you do not wish to use IAM role with Service Accounts.</td>
    </tr><tr>
        <td><a name="instance_type" href="#instance_type" className="snap-top"><code>instance_type</code></a></td>
        <td>The type of instance to run in the ASG (e.g. t3.medium)</td>
    </tr><tr>
        <td><a name="key_pair_name" href="#key_pair_name" className="snap-top"><code>key_pair_name</code></a></td>
        <td>The name of a Key Pair that can be used to SSH to the EC2 Instances in the ASG. Set to null if you don't want to enable Key Pair auth.</td>
    </tr><tr>
        <td><a name="lb_hosted_zone_id" href="#lb_hosted_zone_id" className="snap-top"><code>lb_hosted_zone_id</code></a></td>
        <td>The ID of the Route 53 Hosted Zone in which to create a DNS A record for the Auto Scaling Group. Optional if create_route53_entry = false.</td>
    </tr><tr>
        <td><a name="listener_arns" href="#listener_arns" className="snap-top"><code>listener_arns</code></a></td>
        <td>A map of all the listeners on the load balancer. The keys should be the port numbers and the values should be the ARN of the listener for that port.</td>
    </tr><tr>
        <td><a name="listener_ports" href="#listener_ports" className="snap-top"><code>listener_ports</code></a></td>
        <td>The ports the ALB listens on for requests</td>
    </tr><tr>
        <td><a name="load_balancers" href="#load_balancers" className="snap-top"><code>load_balancers</code></a></td>
        <td>A list of Elastic Load Balancer (ELB) names to associate with this ASG. If you're using the Application Load Balancer (ALB), see var.target_group_arns.</td>
    </tr><tr>
        <td><a name="max_size" href="#max_size" className="snap-top"><code>max_size</code></a></td>
        <td>The maximum number of EC2 Instances to run in this ASG</td>
    </tr><tr>
        <td><a name="metadata_users" href="#metadata_users" className="snap-top"><code>metadata_users</code></a></td>
        <td>List of users on the ASG EC2 instances that should be permitted access to the EC2 metadata.</td>
    </tr><tr>
        <td><a name="min_elb_capacity" href="#min_elb_capacity" className="snap-top"><code>min_elb_capacity</code></a></td>
        <td>Wait for this number of EC2 Instances to show up healthy in the load balancer on creation.</td>
    </tr><tr>
        <td><a name="min_size" href="#min_size" className="snap-top"><code>min_size</code></a></td>
        <td>The minimum number of EC2 Instances to run in this ASG</td>
    </tr><tr>
        <td><a name="name" href="#name" className="snap-top"><code>name</code></a></td>
        <td>The name for the ASG and all other resources created by these templates.</td>
    </tr><tr>
        <td><a name="original_lb_dns_name" href="#original_lb_dns_name" className="snap-top"><code>original_lb_dns_name</code></a></td>
        <td>The DNS name that was assigned by AWS to the load balancer upon creation</td>
    </tr><tr>
        <td><a name="redirect_listener_rules" href="#redirect_listener_rules" className="snap-top"><code>redirect_listener_rules</code></a></td>
        <td>Listener rules for a redirect action. See comments below for information about the parameters.</td>
    </tr><tr>
        <td><a name="secrets_access" href="#secrets_access" className="snap-top"><code>secrets_access</code></a></td>
        <td>A list of ARNs of Secrets Manager secrets that the task should have permissions to read. The IAM role for the task will be granted `secretsmanager:GetSecretValue` for each secret in the list. The ARN can be either the complete ARN, including the randomly generated suffix, or the ARN without the suffix. If the latter, the module will look up the full ARN automatically. This is helpful in cases where you don't yet know the randomly generated suffix because the rest of the ARN is a predictable value.</td>
    </tr><tr>
        <td><a name="server_ports" href="#server_ports" className="snap-top"><code>server_ports</code></a></td>
        <td>The ports the EC2 instances listen on for requests. A Target Group will be created for each port and any rules specified in var.forward_rules will forward traffic to these Target Groups.</td>
    </tr><tr>
        <td><a name="ssh_grunt_iam_group" href="#ssh_grunt_iam_group" className="snap-top"><code>ssh_grunt_iam_group</code></a></td>
        <td>If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the instances. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).</td>
    </tr><tr>
        <td><a name="ssh_grunt_iam_group_sudo" href="#ssh_grunt_iam_group_sudo" className="snap-top"><code>ssh_grunt_iam_group_sudo</code></a></td>
        <td>If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the instances with sudo permissions. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).</td>
    </tr><tr>
        <td><a name="ssh_port" href="#ssh_port" className="snap-top"><code>ssh_port</code></a></td>
        <td>The port at which SSH will be allowed from var.allow_ssh_from_cidr_blocks and var.allow_ssh_security_group_ids</td>
    </tr><tr>
        <td><a name="subnet_ids" href="#subnet_ids" className="snap-top"><code>subnet_ids</code></a></td>
        <td>The list of IDs of the subnets in which to deploy ASG. The list must only contain subnets in var.vpc_id.</td>
    </tr><tr>
        <td><a name="tag_asg_id_key" href="#tag_asg_id_key" className="snap-top"><code>tag_asg_id_key</code></a></td>
        <td>The key for the tag that will be used to associate a unique identifier with this ASG. This identifier will persist between redeploys of the ASG, even though the underlying ASG is being deleted and replaced with a different one.</td>
    </tr><tr>
        <td><a name="termination_policies" href="#termination_policies" className="snap-top"><code>termination_policies</code></a></td>
        <td>A list of policies to decide how the instances in the auto scale group should be terminated. The allowed values are OldestInstance, NewestInstance, OldestLaunchConfiguration, ClosestToNextInstanceHour, Default.</td>
    </tr><tr>
        <td><a name="use_elb_health_checks" href="#use_elb_health_checks" className="snap-top"><code>use_elb_health_checks</code></a></td>
        <td>Whether or not ELB or ALB health checks should be enabled. If set to true, the load_balancers or target_groups_arns variable should be set depending on the load balancer type you are using. Useful for testing connectivity before health check endpoints are available.</td>
    </tr><tr>
        <td><a name="vpc_id" href="#vpc_id" className="snap-top"><code>vpc_id</code></a></td>
        <td>The ID of the VPC in which to deploy the Auto Scaling Group</td>
    </tr><tr>
        <td><a name="wait_for_capacity_timeout" href="#wait_for_capacity_timeout" className="snap-top"><code>wait_for_capacity_timeout</code></a></td>
        <td>A maximum duration that Terraform should wait for the EC2 Instances to be healthy before timing out.</td>
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
        <td><a name="asg_name" href="#asg_name" className="snap-top"><code>asg_name</code></a></td>
        <td>The name of the auto scaling group.</td>
    </tr><tr>
        <td><a name="asg_unique_id" href="#asg_unique_id" className="snap-top"><code>asg_unique_id</code></a></td>
        <td>A unique ID common to all ASGs used for get_desired_capacity on new deploys.</td>
    </tr><tr>
        <td><a name="fully_qualified_domain_name" href="#fully_qualified_domain_name" className="snap-top"><code>fully_qualified_domain_name</code></a></td>
        <td>The Fully Qualified Domain Name built using the zone domain and name.</td>
    </tr><tr>
        <td><a name="launch_configuration_id" href="#launch_configuration_id" className="snap-top"><code>launch_configuration_id</code></a></td>
        <td>The ID of the launch configuration used for the ASG.</td>
    </tr><tr>
        <td><a name="launch_configuration_name" href="#launch_configuration_name" className="snap-top"><code>launch_configuration_name</code></a></td>
        <td>The name of the launch configuration used for the ASG.</td>
    </tr><tr>
        <td><a name="lb_listener_rule_fixed_response_arns" href="#lb_listener_rule_fixed_response_arns" className="snap-top"><code>lb_listener_rule_fixed_response_arns</code></a></td>
        <td>The ARNs of the rules of type fixed-response. The key is the same key of the rule from the `fixed_response_rules` variable.</td>
    </tr><tr>
        <td><a name="lb_listener_rule_forward_arns" href="#lb_listener_rule_forward_arns" className="snap-top"><code>lb_listener_rule_forward_arns</code></a></td>
        <td>The ARNs of the rules of type forward. The key is the same key of the rule from the `forward_rules` variable.</td>
    </tr><tr>
        <td><a name="lb_listener_rule_redirect_arns" href="#lb_listener_rule_redirect_arns" className="snap-top"><code>lb_listener_rule_redirect_arns</code></a></td>
        <td>The ARNs of the rules of type redirect. The key is the same key of the rule from the `redirect_rules` variable.</td>
    </tr><tr>
        <td><a name="security_group_id" href="#security_group_id" className="snap-top"><code>security_group_id</code></a></td>
        <td>The ID of the Security Group that belongs to the ASG.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"228cf9061712bd065cef9a01527b3cbb"}
##DOCS-SOURCER-END -->
