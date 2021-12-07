import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Bastion

Deploy a Bastion host on to your AWS VPC network.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/mgmt/bastion-host" className="link-button">View on GitHub</a>

### Reference

<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <ul>
      
    <li>
      <p>
        <a name="additional_security_group_ids" href="#additional_security_group_ids" className="snap-top">
          <code>additional_security_group_ids</code>
        </a> - A list of optional additional security group ids to assign to the bastion server.
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
        <a name="allow_ssh_from_cidr_list" href="#allow_ssh_from_cidr_list" className="snap-top">
          <code>allow_ssh_from_cidr_list</code>
        </a> - A list of IP address ranges in CIDR format from which SSH access will be permitted. Attempts to access the bastion host from all other IP addresses will be blocked. This is only used if var.allow_ssh_from_cidr is true.
      </p>
    </li>
    <li>
      <p>
        <a name="ami" href="#ami" className="snap-top">
          <code>ami</code>
        </a> - The AMI to run on the bastion host. This should be built from the Packer template under bastion-host.json. One of var.ami or var.ami_filters is required. Set to null if looking up the ami with filters.
      </p>
    </li>
    <li>
      <p>
        <a name="ami_filters" href="#ami_filters" className="snap-top">
          <code>ami_filters</code>
        </a> - Properties on the AMI that can be used to lookup a prebuilt AMI for use with the Bastion Host. You can build the AMI using the Packer template bastion-host.json. Only used if var.ami is null. One of var.ami or var.ami_filters is required. Set to null if passing the ami ID directly.
      </p>
    </li>
    <li>
      <p>
        <a name="base_domain_name_tags" href="#base_domain_name_tags" className="snap-top">
          <code>base_domain_name_tags</code>
        </a> - Tags to use to filter the Route 53 Hosted Zones that might match the hosted zone's name (use if you have multiple public hosted zones with the same name)
      </p>
    </li>
    <li>
      <p>
        <a name="cloud_init_parts" href="#cloud_init_parts" className="snap-top">
          <code>cloud_init_parts</code>
        </a> - Cloud init scripts to run on the bastion host while it boots. See the part blocks in https://www.terraform.io/docs/providers/template/d/cloudinit_config.html for syntax.
      </p>
    </li>
    <li>
      <p>
        <a name="create_dns_record" href="#create_dns_record" className="snap-top">
          <code>create_dns_record</code>
        </a> - Set to true to create a DNS record in Route53 pointing to the bastion. If true, be sure to set var.domain_name.
      </p>
    </li>
    <li>
      <p>
        <a name="default_user" href="#default_user" className="snap-top">
          <code>default_user</code>
        </a> - The default OS user for the Bastion Host AMI. For AWS Ubuntu AMIs, which is what the Packer template in bastion-host.json uses, the default OS user is 'ubuntu'.
      </p>
    </li>
    <li>
      <p>
        <a name="domain_name" href="#domain_name" className="snap-top">
          <code>domain_name</code>
        </a> - The apex domain of the hostname for the bastion server (e.g., example.com). The complete hostname for the bastion server will be var.name.var.domain_name (e.g., bastion.example.com). Only used if create_dns_record is true.
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
        <a name="enable_cloudwatch_log_aggregation" href="#enable_cloudwatch_log_aggregation" className="snap-top">
          <code>enable_cloudwatch_log_aggregation</code>
        </a> - Set to true to send logs to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/cloudwatch-log-aggregation-scripts to do log aggregation in CloudWatch.
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
        <a name="enable_ip_lockdown" href="#enable_ip_lockdown" className="snap-top">
          <code>enable_ip_lockdown</code>
        </a> - Enable ip-lockdown to block access to the instance metadata. Defaults to true.
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
        </a> - If you are using ssh-grunt and your IAM users / groups are defined in a separate AWS account, you can use this variable to specify the ARN of an IAM role that ssh-grunt can assume to retrieve IAM group and public SSH key info from that account. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).
      </p>
    </li>
    <li>
      <p>
        <a name="instance_type" href="#instance_type" className="snap-top">
          <code>instance_type</code>
        </a> - The type of instance to run for the bastion host
      </p>
    </li>
    <li>
      <p>
        <a name="keypair_name" href="#keypair_name" className="snap-top">
          <code>keypair_name</code>
        </a> - The name of a Key Pair that can be used to SSH to this instance.
      </p>
    </li>
    <li>
      <p>
        <a name="name" href="#name" className="snap-top">
          <code>name</code>
        </a> - The name of the bastion host and the other resources created by these templates
      </p>
    </li>
    <li>
      <p>
        <a name="ssh_grunt_iam_group" href="#ssh_grunt_iam_group" className="snap-top">
          <code>ssh_grunt_iam_group</code>
        </a> - If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this Bastion Host. This value is only used if enable_ssh_grunt=true.
      </p>
    </li>
    <li>
      <p>
        <a name="ssh_grunt_iam_group_sudo" href="#ssh_grunt_iam_group_sudo" className="snap-top">
          <code>ssh_grunt_iam_group_sudo</code>
        </a> - If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this Bastion Host with sudo permissions. This value is only used if enable_ssh_grunt=true.
      </p>
    </li>
    <li>
      <p>
        <a name="subnet_id" href="#subnet_id" className="snap-top">
          <code>subnet_id</code>
        </a> - The ID of the subnet in which to deploy the bastion. Must be a subnet in var.vpc_id.
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
        </a> - The ID of the VPC in which to deploy the bastion.
      </p>
    </li>
    </ul>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <ul>
      
    <li>
      <p>
        <a name="bastion_host_iam_role_arn" href="#bastion_host_iam_role_arn" className="snap-top">
          <code>bastion_host_iam_role_arn</code>
        </a> - The ARN of the bastion host's IAM role.
      </p>
    </li>
    <li>
      <p>
        <a name="bastion_host_instance_id" href="#bastion_host_instance_id" className="snap-top">
          <code>bastion_host_instance_id</code>
        </a> - The EC2 instance ID of the bastion host.
      </p>
    </li>
    <li>
      <p>
        <a name="bastion_host_private_ip" href="#bastion_host_private_ip" className="snap-top">
          <code>bastion_host_private_ip</code>
        </a> - The private IP address of the bastion host.
      </p>
    </li>
    <li>
      <p>
        <a name="bastion_host_public_ip" href="#bastion_host_public_ip" className="snap-top">
          <code>bastion_host_public_ip</code>
        </a> - The public IP address of the bastion host.
      </p>
    </li>
    <li>
      <p>
        <a name="bastion_host_security_group_id" href="#bastion_host_security_group_id" className="snap-top">
          <code>bastion_host_security_group_id</code>
        </a> - The ID of the bastion hosts's security group.
      </p>
    </li>
    <li>
      <p>
        <a name="dns_name" href="#dns_name" className="snap-top">
          <code>dns_name</code>
        </a> - The fully qualified name of the bastion host.
      </p>
    </li>
    </ul>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"797eb5175fc71c925f2bdff9483dd0b2"}
##DOCS-SOURCER-END -->
