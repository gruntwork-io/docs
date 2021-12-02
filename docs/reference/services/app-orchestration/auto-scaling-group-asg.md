import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Auto Scaling Group (ASG)

Deploy an AMI across an Auto Scaling Group (ASG), with support for zero-downtime, rolling deployment, load balancing, health checks, service discovery, and auto scaling.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/asg-service" class="link-button">View on GitHub</a>

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
        <td>alarm_sns_topic_arns_us_east_1</td>
        <td>A list of SNS topic ARNs to notify when the health check changes to ALARM, OK, or INSUFFICIENT_DATA state. Note: these SNS topics MUST be in us-east-1! This is because Route 53 only sends CloudWatch metrics to us-east-1, so we must create the alarm in that region, and therefore, can only notify SNS topics in that region.</td>
    </tr><tr>
        <td>alarms_sns_topic_arn</td>
        <td>The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications. Also used for the alarms if the Jenkins backup job fails.</td>
    </tr><tr>
        <td>allow_inbound_from_cidr_blocks</td>
        <td>The CIDR blocks from which to allow access to the ports in var.server_ports</td>
    </tr><tr>
        <td>allow_inbound_from_security_group_ids</td>
        <td>The security group IDs from which to allow access to the ports in var.server_ports</td>
    </tr><tr>
        <td>allow_ssh_from_cidr_blocks</td>
        <td>The CIDR blocks from which to allow SSH access</td>
    </tr><tr>
        <td>allow_ssh_security_group_ids</td>
        <td>The security group IDs from which to allow SSH access</td>
    </tr><tr>
        <td>ami</td>
        <td>The ID of the AMI to run on each instance in the ASG. The AMI needs to have `ec2-baseline` installed, since by default it will run `start_ec2_baseline` on the User Data.</td>
    </tr><tr>
        <td>ami_filters</td>
        <td>Properties on the AMI that can be used to lookup a prebuilt AMI for use with the Bastion Host. You can build the AMI using the Packer template bastion-host.json. Only used if var.ami is null. One of var.ami or var.ami_filters is required. Set to null if passing the ami ID directly.</td>
    </tr><tr>
        <td>cloud_init_parts</td>
        <td>Cloud init scripts to run on the ASG instances during boot. See the part blocks in https://www.terraform.io/docs/providers/template/d/cloudinit_config.html for syntax</td>
    </tr><tr>
        <td>create_route53_entry</td>
        <td>Set to true to create a DNS A record in Route 53 for this service.</td>
    </tr><tr>
        <td>custom_tags</td>
        <td>A list of custom tags to apply to the EC2 Instances in this ASG. Each item in this list should be a map with the parameters key, value, and propagate_at_launch.</td>
    </tr><tr>
        <td>default_forward_target_group_arns</td>
        <td>The ARN of the Target Group to which to route traffic.</td>
    </tr><tr>
        <td>default_user</td>
        <td>The default OS user for the service AMI. For example, for AWS Ubuntu AMIs, the default OS user is 'ubuntu'.</td>
    </tr><tr>
        <td>desired_capacity</td>
        <td>The desired number of EC2 Instances to run in the ASG initially. Note that auto scaling policies may change this value. If you're using auto scaling policies to dynamically resize the cluster, you should actually leave this value as null.</td>
    </tr><tr>
        <td>domain_name</td>
        <td>The domain name to register in var.hosted_zone_id (e.g. foo.example.com). Only used if var.create_route53_entry is true.</td>
    </tr><tr>
        <td>enable_cloudwatch_alarms</td>
        <td>Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using var.alarms_sns_topic_arn.</td>
    </tr><tr>
        <td>enable_cloudwatch_log_aggregation</td>
        <td>Set to true to add AIM permissions to send logs to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/cloudwatch-log-aggregation-scripts to do log aggregation in CloudWatch.</td>
    </tr><tr>
        <td>enable_cloudwatch_metrics</td>
        <td>Set to true to add IAM permissions to send custom metrics to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent to get memory and disk metrics in CloudWatch for your Auto Scaling Group</td>
    </tr><tr>
        <td>enable_fail2ban</td>
        <td>Enable fail2ban to block brute force log in attempts. Defaults to true</td>
    </tr><tr>
        <td>enable_ip_lockdown</td>
        <td>Enable ip-lockdown to block access to the instance metadata. Defaults to true</td>
    </tr><tr>
        <td>enable_route53_health_check</td>
        <td>If set to true, use Route 53 to perform health checks on var.domain_name.</td>
    </tr><tr>
        <td>enabled_metrics</td>
        <td>A list of metrics the ASG should enable for monitoring all instances in a group. The allowed values are GroupMinSize, GroupMaxSize, GroupDesiredCapacity, GroupInServiceInstances, GroupPendingInstances, GroupStandbyInstances, GroupTerminatingInstances, GroupTotalInstances.</td>
    </tr><tr>
        <td>external_account_ssh_grunt_role_arn</td>
        <td>Since our IAM users are defined in a separate AWS account, this variable is used to specify the ARN of an IAM role that allows ssh-grunt to retrieve IAM group and public SSH key info from that account.</td>
    </tr><tr>
        <td>fixed_response_listener_rules</td>
        <td>Listener rules for a fixed-response action. See comments below for information about the parameters.</td>
    </tr><tr>
        <td>forward_listener_rules</td>
        <td>Listener rules for a forward action that distributes requests among one or more target groups. By default, sends traffic to the target groups created for the ports in var.server_ports. See comments below for information about the parameters.</td>
    </tr><tr>
        <td>health_check_grace_period</td>
        <td>Time, in seconds, after an EC2 Instance comes into service before checking health.</td>
    </tr><tr>
        <td>hosted_zone_id</td>
        <td>The ID of the Route 53 Hosted Zone in which to create a DNS A record for the Auto Scaling Group. Optional if create_route53_entry = false.</td>
    </tr><tr>
        <td>iam_policy</td>
        <td>An object defining the policy to attach to `iam_role_name` if the IAM role is going to be created. Accepts a map of objects, where the map keys are sids for IAM policy statements, and the object fields are the resources, actions, and the effect ("Allow" or "Deny") of the statement. Ignored if `iam_role_arn` is provided. Leave as null if you do not wish to use IAM role with Service Accounts.</td>
    </tr><tr>
        <td>instance_type</td>
        <td>The type of instance to run in the ASG (e.g. t3.medium)</td>
    </tr><tr>
        <td>key_pair_name</td>
        <td>The name of a Key Pair that can be used to SSH to the EC2 Instances in the ASG. Set to null if you don't want to enable Key Pair auth.</td>
    </tr><tr>
        <td>lb_hosted_zone_id</td>
        <td>The ID of the Route 53 Hosted Zone in which to create a DNS A record for the Auto Scaling Group. Optional if create_route53_entry = false.</td>
    </tr><tr>
        <td>listener_arns</td>
        <td>A map of all the listeners on the load balancer. The keys should be the port numbers and the values should be the ARN of the listener for that port.</td>
    </tr><tr>
        <td>listener_ports</td>
        <td>The ports the ALB listens on for requests</td>
    </tr><tr>
        <td>load_balancers</td>
        <td>A list of Elastic Load Balancer (ELB) names to associate with this ASG. If you're using the Application Load Balancer (ALB), see var.target_group_arns.</td>
    </tr><tr>
        <td>max_size</td>
        <td>The maximum number of EC2 Instances to run in this ASG</td>
    </tr><tr>
        <td>metadata_users</td>
        <td>List of users on the ASG EC2 instances that should be permitted access to the EC2 metadata.</td>
    </tr><tr>
        <td>min_elb_capacity</td>
        <td>Wait for this number of EC2 Instances to show up healthy in the load balancer on creation.</td>
    </tr><tr>
        <td>min_size</td>
        <td>The minimum number of EC2 Instances to run in this ASG</td>
    </tr><tr>
        <td>name</td>
        <td>The name for the ASG and all other resources created by these templates.</td>
    </tr><tr>
        <td>original_lb_dns_name</td>
        <td>The DNS name that was assigned by AWS to the load balancer upon creation</td>
    </tr><tr>
        <td>redirect_listener_rules</td>
        <td>Listener rules for a redirect action. See comments below for information about the parameters.</td>
    </tr><tr>
        <td>secrets_access</td>
        <td>A list of ARNs of Secrets Manager secrets that the task should have permissions to read. The IAM role for the task will be granted `secretsmanager:GetSecretValue` for each secret in the list. The ARN can be either the complete ARN, including the randomly generated suffix, or the ARN without the suffix. If the latter, the module will look up the full ARN automatically. This is helpful in cases where you don't yet know the randomly generated suffix because the rest of the ARN is a predictable value.</td>
    </tr><tr>
        <td>server_ports</td>
        <td>The ports the EC2 instances listen on for requests. A Target Group will be created for each port and any rules specified in var.forward_rules will forward traffic to these Target Groups.</td>
    </tr><tr>
        <td>ssh_grunt_iam_group</td>
        <td>If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the instances. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).</td>
    </tr><tr>
        <td>ssh_grunt_iam_group_sudo</td>
        <td>If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to the instances with sudo permissions. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).</td>
    </tr><tr>
        <td>ssh_port</td>
        <td>The port at which SSH will be allowed from var.allow_ssh_from_cidr_blocks and var.allow_ssh_security_group_ids</td>
    </tr><tr>
        <td>subnet_ids</td>
        <td>The list of IDs of the subnets in which to deploy ASG. The list must only contain subnets in var.vpc_id.</td>
    </tr><tr>
        <td>tag_asg_id_key</td>
        <td>The key for the tag that will be used to associate a unique identifier with this ASG. This identifier will persist between redeploys of the ASG, even though the underlying ASG is being deleted and replaced with a different one.</td>
    </tr><tr>
        <td>termination_policies</td>
        <td>A list of policies to decide how the instances in the auto scale group should be terminated. The allowed values are OldestInstance, NewestInstance, OldestLaunchConfiguration, ClosestToNextInstanceHour, Default.</td>
    </tr><tr>
        <td>use_elb_health_checks</td>
        <td>Whether or not ELB or ALB health checks should be enabled. If set to true, the load_balancers or target_groups_arns variable should be set depending on the load balancer type you are using. Useful for testing connectivity before health check endpoints are available.</td>
    </tr><tr>
        <td>vpc_id</td>
        <td>The ID of the VPC in which to deploy the Auto Scaling Group</td>
    </tr><tr>
        <td>wait_for_capacity_timeout</td>
        <td>A maximum duration that Terraform should wait for the EC2 Instances to be healthy before timing out.</td>
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
        <td>asg_name</td>
        <td>The name of the auto scaling group.</td>
    </tr><tr>
        <td>asg_unique_id</td>
        <td>A unique ID common to all ASGs used for get_desired_capacity on new deploys.</td>
    </tr><tr>
        <td>fully_qualified_domain_name</td>
        <td>The Fully Qualified Domain Name built using the zone domain and name.</td>
    </tr><tr>
        <td>launch_configuration_id</td>
        <td>The ID of the launch configuration used for the ASG.</td>
    </tr><tr>
        <td>launch_configuration_name</td>
        <td>The name of the launch configuration used for the ASG.</td>
    </tr><tr>
        <td>lb_listener_rule_fixed_response_arns</td>
        <td>The ARNs of the rules of type fixed-response. The key is the same key of the rule from the `fixed_response_rules` variable.</td>
    </tr><tr>
        <td>lb_listener_rule_forward_arns</td>
        <td>The ARNs of the rules of type forward. The key is the same key of the rule from the `forward_rules` variable.</td>
    </tr><tr>
        <td>lb_listener_rule_redirect_arns</td>
        <td>The ARNs of the rules of type redirect. The key is the same key of the rule from the `redirect_rules` variable.</td>
    </tr><tr>
        <td>security_group_id</td>
        <td>The ID of the Security Group that belongs to the ASG.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"4b973bc12756322a88c95a2419070306"}
##DOCS-SOURCER-END -->
