import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Bastion

Deploy a Bastion host on to your AWS VPC network.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/mgmt/bastion-host" class="link-button">View on GitHub</a>

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
        <td>additional_security_group_ids</td>
        <td>A list of optional additional security group ids to assign to the bastion server.</td>
    </tr><tr>
        <td>alarms_sns_topic_arn</td>
        <td>The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications.</td>
    </tr><tr>
        <td>allow_ssh_from_cidr_list</td>
        <td>A list of IP address ranges in CIDR format from which SSH access will be permitted. Attempts to access the bastion host from all other IP addresses will be blocked. This is only used if var.allow_ssh_from_cidr is true.</td>
    </tr><tr>
        <td>ami</td>
        <td>The AMI to run on the bastion host. This should be built from the Packer template under bastion-host.json. One of var.ami or var.ami_filters is required. Set to null if looking up the ami with filters.</td>
    </tr><tr>
        <td>ami_filters</td>
        <td>Properties on the AMI that can be used to lookup a prebuilt AMI for use with the Bastion Host. You can build the AMI using the Packer template bastion-host.json. Only used if var.ami is null. One of var.ami or var.ami_filters is required. Set to null if passing the ami ID directly.</td>
    </tr><tr>
        <td>base_domain_name_tags</td>
        <td>Tags to use to filter the Route 53 Hosted Zones that might match the hosted zone's name (use if you have multiple public hosted zones with the same name)</td>
    </tr><tr>
        <td>cloud_init_parts</td>
        <td>Cloud init scripts to run on the bastion host while it boots. See the part blocks in https://www.terraform.io/docs/providers/template/d/cloudinit_config.html for syntax.</td>
    </tr><tr>
        <td>create_dns_record</td>
        <td>Set to true to create a DNS record in Route53 pointing to the bastion. If true, be sure to set var.domain_name.</td>
    </tr><tr>
        <td>default_user</td>
        <td>The default OS user for the Bastion Host AMI. For AWS Ubuntu AMIs, which is what the Packer template in bastion-host.json uses, the default OS user is 'ubuntu'.</td>
    </tr><tr>
        <td>domain_name</td>
        <td>The apex domain of the hostname for the bastion server (e.g., example.com). The complete hostname for the bastion server will be var.name.var.domain_name (e.g., bastion.example.com). Only used if create_dns_record is true.</td>
    </tr><tr>
        <td>enable_cloudwatch_alarms</td>
        <td>Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using var.alarms_sns_topic_arn.</td>
    </tr><tr>
        <td>enable_cloudwatch_log_aggregation</td>
        <td>Set to true to send logs to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/cloudwatch-log-aggregation-scripts to do log aggregation in CloudWatch.</td>
    </tr><tr>
        <td>enable_cloudwatch_metrics</td>
        <td>Set to true to add IAM permissions to send custom metrics to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent to get memory and disk metrics in CloudWatch for your Bastion host.</td>
    </tr><tr>
        <td>enable_fail2ban</td>
        <td>Enable fail2ban to block brute force log in attempts. Defaults to true.</td>
    </tr><tr>
        <td>enable_ip_lockdown</td>
        <td>Enable ip-lockdown to block access to the instance metadata. Defaults to true.</td>
    </tr><tr>
        <td>enable_ssh_grunt</td>
        <td>Set to true to add IAM permissions for ssh-grunt (https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ssh-grunt), which will allow you to manage SSH access via IAM groups.</td>
    </tr><tr>
        <td>external_account_ssh_grunt_role_arn</td>
        <td>If you are using ssh-grunt and your IAM users / groups are defined in a separate AWS account, you can use this variable to specify the ARN of an IAM role that ssh-grunt can assume to retrieve IAM group and public SSH key info from that account. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).</td>
    </tr><tr>
        <td>instance_type</td>
        <td>The type of instance to run for the bastion host</td>
    </tr><tr>
        <td>keypair_name</td>
        <td>The name of a Key Pair that can be used to SSH to this instance.</td>
    </tr><tr>
        <td>name</td>
        <td>The name of the bastion host and the other resources created by these templates</td>
    </tr><tr>
        <td>ssh_grunt_iam_group</td>
        <td>If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this Bastion Host. This value is only used if enable_ssh_grunt=true.</td>
    </tr><tr>
        <td>ssh_grunt_iam_group_sudo</td>
        <td>If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this Bastion Host with sudo permissions. This value is only used if enable_ssh_grunt=true.</td>
    </tr><tr>
        <td>subnet_id</td>
        <td>The ID of the subnet in which to deploy the bastion. Must be a subnet in var.vpc_id.</td>
    </tr><tr>
        <td>tenancy</td>
        <td>The tenancy of this server. Must be one of: default, dedicated, or host.</td>
    </tr><tr>
        <td>vpc_id</td>
        <td>The ID of the VPC in which to deploy the bastion.</td>
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
        <td>bastion_host_iam_role_arn</td>
        <td>The ARN of the bastion host's IAM role.</td>
    </tr><tr>
        <td>bastion_host_instance_id</td>
        <td>The EC2 instance ID of the bastion host.</td>
    </tr><tr>
        <td>bastion_host_private_ip</td>
        <td>The private IP address of the bastion host.</td>
    </tr><tr>
        <td>bastion_host_public_ip</td>
        <td>The public IP address of the bastion host.</td>
    </tr><tr>
        <td>bastion_host_security_group_id</td>
        <td>The ID of the bastion hosts's security group.</td>
    </tr><tr>
        <td>dns_name</td>
        <td>The fully qualified name of the bastion host.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"4c94b62d31f164ac81cd5359853b8817"}
##DOCS-SOURCER-END -->
