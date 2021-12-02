import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# EC2 Instance

Deploy an EC2 Instance, including server hardening, IAM role, EIP, EBS Volume, and CloudWatch metrics, logs, and alerts.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/ec2-instance" class="link-button">View on GitHub</a>

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
        <td>A list of optional additional security group ids to assign to the EC2 instance.</td>
    </tr><tr>
        <td>alarms_sns_topic_arn</td>
        <td>The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications.</td>
    </tr><tr>
        <td>allow_port_from_cidr_blocks</td>
        <td>Accept inbound traffic on these port ranges from the specified CIDR blocks</td>
    </tr><tr>
        <td>allow_port_from_security_group_ids</td>
        <td>Accept inbound traffic on these port ranges from the specified security groups</td>
    </tr><tr>
        <td>allow_ssh_from_cidr_blocks</td>
        <td>Accept inbound SSH from these CIDR blocks</td>
    </tr><tr>
        <td>allow_ssh_from_security_group_ids</td>
        <td>Accept inbound SSH from these security groups</td>
    </tr><tr>
        <td>ami</td>
        <td>The AMI to run on the EC2 instance. This should be built from the Packer template under ec2-instance.json. One of var.ami or var.ami_filters is required. Set to null if looking up the ami with filters.</td>
    </tr><tr>
        <td>ami_filters</td>
        <td>Properties on the AMI that can be used to lookup a prebuilt AMI for use with the EC2 instance. You can build the AMI using the Packer template ec2-instance.json. Only used if var.ami is null. One of var.ami or var.ami_filters is required. Set to null if passing the ami ID directly.</td>
    </tr><tr>
        <td>attach_eip</td>
        <td>Determines if an Elastic IP (EIP) will be created for this instance.</td>
    </tr><tr>
        <td>base_domain_name_tags</td>
        <td>Tags to use to filter the Route 53 Hosted Zones that might match the hosted zone's name (use if you have multiple public hosted zones with the same name)</td>
    </tr><tr>
        <td>cloud_init_parts</td>
        <td>Cloud init scripts to run on the EC2 instance while it boots. See the part blocks in https://www.terraform.io/docs/providers/template/d/cloudinit_config.html for syntax.</td>
    </tr><tr>
        <td>create_dns_record</td>
        <td>Set to true to create a DNS record in Route53 pointing to the EC2 instance. If true, be sure to set var.fully_qualified_domain_name.</td>
    </tr><tr>
        <td>default_user</td>
        <td>The default OS user for the EC2 instance AMI. For AWS Ubuntu AMIs, which is what the Packer template in ec2-instance.json uses, the default OS user is 'ubuntu'.</td>
    </tr><tr>
        <td>dns_ttl</td>
        <td>DNS Time To Live in seconds.</td>
    </tr><tr>
        <td>dns_zone_is_private</td>
        <td>Specify whether we're selecting a private or public Route 53 DNS Zone</td>
    </tr><tr>
        <td>ebs_volumes</td>
        <td>The EBS volumes to attach to the instance. This must be a map of key/value pairs.</td>
    </tr><tr>
        <td>enable_cloudwatch_alarms</td>
        <td>Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using var.alarms_sns_topic_arn.</td>
    </tr><tr>
        <td>enable_cloudwatch_log_aggregation</td>
        <td>Set to true to send logs to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/cloudwatch-log-aggregation-scripts to do log aggregation in CloudWatch.</td>
    </tr><tr>
        <td>enable_cloudwatch_metrics</td>
        <td>Set to true to add IAM permissions to send custom metrics to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/metrics/cloudwatch-memory-disk-metrics-scripts to get memory and disk metrics in CloudWatch for your EC2 instance.</td>
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
        <td>fully_qualified_domain_name</td>
        <td>The apex domain of the hostname for the EC2 instance (e.g., example.com). The complete hostname for the EC2 instance will be var.name.var.fully_qualified_domain_name (e.g., bastion.example.com). Only used if create_dns_record is true.</td>
    </tr><tr>
        <td>instance_type</td>
        <td>The type of instance to run for the EC2 instance</td>
    </tr><tr>
        <td>keypair_name</td>
        <td>The name of a Key Pair that can be used to SSH to this instance. This instance may have ssh-grunt installed. The preferred way to do SSH access is with your own IAM user name and SSH key. This Key Pair is only as a fallback.</td>
    </tr><tr>
        <td>name</td>
        <td>The name of the EC2 instance and the other resources created by these templates</td>
    </tr><tr>
        <td>root_volume_delete_on_termination</td>
        <td>If set to true, the root volume will be deleted when the Instance is terminated.</td>
    </tr><tr>
        <td>root_volume_size</td>
        <td>The size of the root volume, in gigabytes.</td>
    </tr><tr>
        <td>root_volume_type</td>
        <td>The root volume type. Must be one of: standard, gp2, io1.</td>
    </tr><tr>
        <td>route53_lookup_domain_name</td>
        <td>The domain name to use to look up the Route 53 hosted zone. Will be a subset of fully_qualified_domain_name: e.g., my-company.com. Only one of route53_lookup_domain_name or route53_zone_id should be used.</td>
    </tr><tr>
        <td>route53_zone_id</td>
        <td>The ID of the hosted zone to use. Allows specifying the hosted zone directly instead of looking it up via domain name. Only one of route53_lookup_domain_name or route53_zone_id should be used.</td>
    </tr><tr>
        <td>ssh_grunt_iam_group</td>
        <td>If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this EC2 instance. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).</td>
    </tr><tr>
        <td>ssh_grunt_iam_group_sudo</td>
        <td>If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this EC2 instance. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).</td>
    </tr><tr>
        <td>subnet_id</td>
        <td>The ID of the subnet in which to deploy the EC2 instance. Must be a subnet in var.vpc_id.</td>
    </tr><tr>
        <td>tags</td>
        <td>A map of tags to apply to the EC2 instance and the S3 Buckets. The key is the tag name and the value is the tag value.</td>
    </tr><tr>
        <td>tenancy</td>
        <td>The tenancy of this instance. Must be one of: default, dedicated, or host.</td>
    </tr><tr>
        <td>vpc_id</td>
        <td>The ID of the VPC in which to deploy the EC2 instance.</td>
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
        <td>dns_name</td>
        <td>The fully qualified name of the EC2 server.</td>
    </tr><tr>
        <td>ec2_instance_iam_role_arn</td>
        <td>The ARN of the EC2 server's IAM role.</td>
    </tr><tr>
        <td>ec2_instance_instance_id</td>
        <td>The EC2 instance ID of the EC2 server.</td>
    </tr><tr>
        <td>ec2_instance_private_ip</td>
        <td>The private IP address of the EC2 server.</td>
    </tr><tr>
        <td>ec2_instance_public_ip</td>
        <td>The public IP address of the EC2 server.</td>
    </tr><tr>
        <td>ec2_instance_security_group_id</td>
        <td>The ID of the EC2 servers's security group.</td>
    </tr><tr>
        <td>ec2_instance_volume_info</td>
        <td>Info about the created EBS volumes.</td>
    </tr><tr>
        <td>ec2_instance_volume_parameters</td>
        <td>The input parameters for the EBS volumes.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"497f2006ad47b1f4fe6a5a1a1afbd548"}
##DOCS-SOURCER-END -->
