import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# OpenVPN

Deploy an OpenVPN Server on AWS.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/mgmt/openvpn-server" className="link-button">View on GitHub</a>

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
        <td>The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications.</td>
    </tr><tr>
        <td><a name="allow_manage_key_permissions_with_iam" href="#allow_manage_key_permissions_with_iam" className="snap-top"><code>allow_manage_key_permissions_with_iam</code></a></td>
        <td>If true, both the CMK's Key Policy and IAM Policies (permissions) can be used to grant permissions on the CMK. If false, only the CMK's Key Policy can be used to grant permissions on the CMK. False is more secure (and generally preferred), but true is more flexible and convenient.</td>
    </tr><tr>
        <td><a name="allow_ssh_from_cidr_list" href="#allow_ssh_from_cidr_list" className="snap-top"><code>allow_ssh_from_cidr_list</code></a></td>
        <td>The IP address ranges in CIDR format from which to allow incoming SSH requests to the OpenVPN server.</td>
    </tr><tr>
        <td><a name="allow_ssh_from_security_group_ids" href="#allow_ssh_from_security_group_ids" className="snap-top"><code>allow_ssh_from_security_group_ids</code></a></td>
        <td>The IDs of security groups from which to allow incoming SSH requests to the OpenVPN server.</td>
    </tr><tr>
        <td><a name="allow_vpn_from_cidr_list" href="#allow_vpn_from_cidr_list" className="snap-top"><code>allow_vpn_from_cidr_list</code></a></td>
        <td>A list of IP address ranges in CIDR format from which VPN access will be permitted. Attempts to access the OpenVPN Server from all other IP addresses will be blocked.</td>
    </tr><tr>
        <td><a name="ami" href="#ami" className="snap-top"><code>ami</code></a></td>
        <td>The AMI to run on the OpenVPN Server. This should be built from the Packer template under openvpn-server.json. One of var.ami or var.ami_filters is required. Set to null if looking up the ami with filters.</td>
    </tr><tr>
        <td><a name="ami_filters" href="#ami_filters" className="snap-top"><code>ami_filters</code></a></td>
        <td>Properties on the AMI that can be used to lookup a prebuilt AMI for use with the OpenVPN server. You can build the AMI using the Packer template openvpn-server.json. Only used if var.ami is null. One of var.ami or var.ami_filters is required. Set to null if passing the ami ID directly.</td>
    </tr><tr>
        <td><a name="backup_bucket_name" href="#backup_bucket_name" className="snap-top"><code>backup_bucket_name</code></a></td>
        <td>The name of the S3 bucket that will be used to backup PKI secrets. This is a required variable because bucket names must be globally unique across all AWS customers.</td>
    </tr><tr>
        <td><a name="base_domain_name" href="#base_domain_name" className="snap-top"><code>base_domain_name</code></a></td>
        <td>The base domain name to use for the OpenVPN server. Used to lookup the Hosted Zone ID to use for creating the Route 53 domain entry. Only used if var.create_route53_entry is true.</td>
    </tr><tr>
        <td><a name="base_domain_name_tags" href="#base_domain_name_tags" className="snap-top"><code>base_domain_name_tags</code></a></td>
        <td>Tags to use to filter the Route 53 Hosted Zones that might match var.domain_name.</td>
    </tr><tr>
        <td><a name="ca_cert_fields" href="#ca_cert_fields" className="snap-top"><code>ca_cert_fields</code></a></td>
        <td>An object with fields for the country, state, locality, organization, organizational unit, and email address to use with the OpenVPN CA certificate.</td>
    </tr><tr>
        <td><a name="cloud_init_parts" href="#cloud_init_parts" className="snap-top"><code>cloud_init_parts</code></a></td>
        <td>Cloud init scripts to run on the OpenVPN server while it boots. See the part blocks in https://www.terraform.io/docs/providers/template/d/cloudinit_config.html for syntax.</td>
    </tr><tr>
        <td><a name="cmk_administrator_iam_arns" href="#cmk_administrator_iam_arns" className="snap-top"><code>cmk_administrator_iam_arns</code></a></td>
        <td>A list of IAM ARNs for users who should be given administrator access to this CMK (e.g. arn:aws:iam::&lt;aws-account-id>:user/&lt;iam-user-arn>). If this list is empty, and var.kms_key_arn is null, the ARN of the current user will be used.</td>
    </tr><tr>
        <td><a name="cmk_external_user_iam_arns" href="#cmk_external_user_iam_arns" className="snap-top"><code>cmk_external_user_iam_arns</code></a></td>
        <td>A list of IAM ARNs for users from external AWS accounts who should be given permissions to use this CMK (e.g. arn:aws:iam::&lt;aws-account-id>:root).</td>
    </tr><tr>
        <td><a name="cmk_user_iam_arns" href="#cmk_user_iam_arns" className="snap-top"><code>cmk_user_iam_arns</code></a></td>
        <td>A list of IAM ARNs for users who should be given permissions to use this KMS Master Key (e.g. arn:aws:iam::1234567890:user/foo).</td>
    </tr><tr>
        <td><a name="create_route53_entry" href="#create_route53_entry" className="snap-top"><code>create_route53_entry</code></a></td>
        <td>Set to true to add var.domain_name as a Route 53 DNS A record for the OpenVPN server</td>
    </tr><tr>
        <td><a name="default_user" href="#default_user" className="snap-top"><code>default_user</code></a></td>
        <td>The default OS user for the OpenVPN AMI. For AWS Ubuntu AMIs, which is what the Packer template in openvpn-server.json uses, the default OS user is 'ubuntu'.</td>
    </tr><tr>
        <td><a name="domain_name" href="#domain_name" className="snap-top"><code>domain_name</code></a></td>
        <td>The domain name to use for the OpenVPN server. Only used if var.create_route53_entry is true. If null, set to &lt;NAME>.&lt;BASE_DOMAIN_NAME>.</td>
    </tr><tr>
        <td><a name="enable_cloudwatch_alarms" href="#enable_cloudwatch_alarms" className="snap-top"><code>enable_cloudwatch_alarms</code></a></td>
        <td>Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using var.alarms_sns_topic_arn.</td>
    </tr><tr>
        <td><a name="enable_cloudwatch_log_aggregation" href="#enable_cloudwatch_log_aggregation" className="snap-top"><code>enable_cloudwatch_log_aggregation</code></a></td>
        <td>Set to true to send logs to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/cloudwatch-log-aggregation-scripts to do log aggregation in CloudWatch.</td>
    </tr><tr>
        <td><a name="enable_cloudwatch_metrics" href="#enable_cloudwatch_metrics" className="snap-top"><code>enable_cloudwatch_metrics</code></a></td>
        <td>Set to true to add IAM permissions to send custom metrics to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent to get memory and disk metrics in CloudWatch for your OpenVPN server.</td>
    </tr><tr>
        <td><a name="enable_fail2ban" href="#enable_fail2ban" className="snap-top"><code>enable_fail2ban</code></a></td>
        <td>Enable fail2ban to block brute force log in attempts. Defaults to true.</td>
    </tr><tr>
        <td><a name="enable_ip_lockdown" href="#enable_ip_lockdown" className="snap-top"><code>enable_ip_lockdown</code></a></td>
        <td>Enable ip-lockdown to block access to the instance metadata. Defaults to true.</td>
    </tr><tr>
        <td><a name="enable_ssh_grunt" href="#enable_ssh_grunt" className="snap-top"><code>enable_ssh_grunt</code></a></td>
        <td>Set to true to add IAM permissions for ssh-grunt (https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ssh-grunt), which will allow you to manage SSH access via IAM groups.</td>
    </tr><tr>
        <td><a name="external_account_arns" href="#external_account_arns" className="snap-top"><code>external_account_arns</code></a></td>
        <td>The ARNs of external AWS accounts where your IAM users are defined. This module will create IAM roles that users in those accounts will be able to assume to get access to the request/revocation SQS queues.</td>
    </tr><tr>
        <td><a name="external_account_ssh_grunt_role_arn" href="#external_account_ssh_grunt_role_arn" className="snap-top"><code>external_account_ssh_grunt_role_arn</code></a></td>
        <td>Since our IAM users are defined in a separate AWS account, this variable is used to specify the ARN of an IAM role that allows ssh-grunt to retrieve IAM group and public SSH key info from that account.</td>
    </tr><tr>
        <td><a name="force_destroy" href="#force_destroy" className="snap-top"><code>force_destroy</code></a></td>
        <td>When a terraform destroy is run, should the backup s3 bucket be destroyed even if it contains files. Should only be set to true for testing/development</td>
    </tr><tr>
        <td><a name="hosted_zone_id" href="#hosted_zone_id" className="snap-top"><code>hosted_zone_id</code></a></td>
        <td>The ID of the Route 53 Hosted Zone in which the domain should be created. Only used if var.create_route53_entry is true. If null, lookup the hosted zone ID using the var.base_domain_name.</td>
    </tr><tr>
        <td><a name="instance_type" href="#instance_type" className="snap-top"><code>instance_type</code></a></td>
        <td>The type of instance to run for the OpenVPN Server</td>
    </tr><tr>
        <td><a name="keypair_name" href="#keypair_name" className="snap-top"><code>keypair_name</code></a></td>
        <td>The name of a Key Pair that can be used to SSH to this instance. Leave blank if you don't want to enable Key Pair auth.</td>
    </tr><tr>
        <td><a name="kms_key_arn" href="#kms_key_arn" className="snap-top"><code>kms_key_arn</code></a></td>
        <td>The Amazon Resource Name (ARN) of an existing KMS customer master key (CMK) that will be used to encrypt/decrypt backup files. If null, a key will be created with permissions assigned by the following variables: cmk_administrator_iam_arns, cmk_user_iam_arns, cmk_external_user_iam_arns, allow_manage_key_permissions.</td>
    </tr><tr>
        <td><a name="name" href="#name" className="snap-top"><code>name</code></a></td>
        <td>The name of the OpenVPN Server and the other resources created by these templates</td>
    </tr><tr>
        <td><a name="request_queue_name" href="#request_queue_name" className="snap-top"><code>request_queue_name</code></a></td>
        <td>The name of the sqs queue that will be used to receive new certificate requests.</td>
    </tr><tr>
        <td><a name="revocation_queue_name" href="#revocation_queue_name" className="snap-top"><code>revocation_queue_name</code></a></td>
        <td>The name of the sqs queue that will be used to receive certification revocation requests. Note that the queue name will be automatically prefixed with 'openvpn-requests-'.</td>
    </tr><tr>
        <td><a name="ssh_grunt_iam_group" href="#ssh_grunt_iam_group" className="snap-top"><code>ssh_grunt_iam_group</code></a></td>
        <td>If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this OpenVPN server. This value is only used if enable_ssh_grunt=true.</td>
    </tr><tr>
        <td><a name="ssh_grunt_iam_group_sudo" href="#ssh_grunt_iam_group_sudo" className="snap-top"><code>ssh_grunt_iam_group_sudo</code></a></td>
        <td>If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this OpenVPN server with sudo permissions. This value is only used if enable_ssh_grunt=true.</td>
    </tr><tr>
        <td><a name="subnet_ids" href="#subnet_ids" className="snap-top"><code>subnet_ids</code></a></td>
        <td>The ids of the subnets where this server should be deployed.</td>
    </tr><tr>
        <td><a name="tenancy" href="#tenancy" className="snap-top"><code>tenancy</code></a></td>
        <td>The tenancy of this server. Must be one of: default, dedicated, or host.</td>
    </tr><tr>
        <td><a name="vpc_id" href="#vpc_id" className="snap-top"><code>vpc_id</code></a></td>
        <td>The ID of the VPC in which to deploy the OpenVPN server.</td>
    </tr><tr>
        <td><a name="vpn_route_cidr_blocks" href="#vpn_route_cidr_blocks" className="snap-top"><code>vpn_route_cidr_blocks</code></a></td>
        <td>A list of CIDR ranges to be routed over the VPN.</td>
    </tr><tr>
        <td><a name="vpn_search_domains" href="#vpn_search_domains" className="snap-top"><code>vpn_search_domains</code></a></td>
        <td>A list of domains to push down to the client to resolve over VPN. This will configure the OpenVPN server to pass through domains that should be resolved over the VPN connection (as opposed to the locally configured resolver) to the client. Note that for each domain, all subdomains will be resolved as well. E.g., if you pass in 'mydomain.local', subdomains such as 'hello.world.mydomain.local' and 'example.mydomain.local' will also be forwarded to through the VPN server.</td>
    </tr><tr>
        <td><a name="vpn_subnet" href="#vpn_subnet" className="snap-top"><code>vpn_subnet</code></a></td>
        <td>The subnet IP and mask vpn clients will be assigned addresses from. For example, 172.16.1.0 255.255.255.0. This is a non-routed network that only exists between the VPN server and the client. Therefore, it should NOT overlap with VPC addressing, or the client won't be able to access any of the VPC IPs. In general, we recommend using internal, non-RFC 1918 IP addresses, such as 172.16.xx.yy.</td>
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
        <td><a name="allow_certificate_requests_for_external_accounts_iam_role_arn" href="#allow_certificate_requests_for_external_accounts_iam_role_arn" className="snap-top"><code>allow_certificate_requests_for_external_accounts_iam_role_arn</code></a></td>
        <td>The ARN of the IAM role that can be assumed from external accounts to request certificates.</td>
    </tr><tr>
        <td><a name="allow_certificate_requests_for_external_accounts_iam_role_id" href="#allow_certificate_requests_for_external_accounts_iam_role_id" className="snap-top"><code>allow_certificate_requests_for_external_accounts_iam_role_id</code></a></td>
        <td>The name of the IAM role that can be assumed from external accounts to request certificates.</td>
    </tr><tr>
        <td><a name="allow_certificate_revocations_for_external_accounts_iam_role_arn" href="#allow_certificate_revocations_for_external_accounts_iam_role_arn" className="snap-top"><code>allow_certificate_revocations_for_external_accounts_iam_role_arn</code></a></td>
        <td>The ARN of the IAM role that can be assumed from external accounts to revoke certificates.</td>
    </tr><tr>
        <td><a name="allow_certificate_revocations_for_external_accounts_iam_role_id" href="#allow_certificate_revocations_for_external_accounts_iam_role_id" className="snap-top"><code>allow_certificate_revocations_for_external_accounts_iam_role_id</code></a></td>
        <td>The name of the IAM role that can be assumed from external accounts to revoke certificates.</td>
    </tr><tr>
        <td><a name="autoscaling_group_id" href="#autoscaling_group_id" className="snap-top"><code>autoscaling_group_id</code></a></td>
        <td>The AutoScaling Group ID of the OpenVPN server.</td>
    </tr><tr>
        <td><a name="backup_bucket_name" href="#backup_bucket_name" className="snap-top"><code>backup_bucket_name</code></a></td>
        <td>The S3 bucket used for backing up the OpenVPN PKI.</td>
    </tr><tr>
        <td><a name="client_request_queue" href="#client_request_queue" className="snap-top"><code>client_request_queue</code></a></td>
        <td>The SQS queue used by the openvpn-admin tool for certificate requests.</td>
    </tr><tr>
        <td><a name="client_revocation_queue" href="#client_revocation_queue" className="snap-top"><code>client_revocation_queue</code></a></td>
        <td>The SQS queue used by the openvpn-admin tool for certificate revocations.</td>
    </tr><tr>
        <td><a name="elastic_ip" href="#elastic_ip" className="snap-top"><code>elastic_ip</code></a></td>
        <td>The elastic IP address of the OpenVPN server.</td>
    </tr><tr>
        <td><a name="iam_role_id" href="#iam_role_id" className="snap-top"><code>iam_role_id</code></a></td>
        <td>The ID of the IAM role used by the OpenVPN server.</td>
    </tr><tr>
        <td><a name="openvpn_admins_group_name" href="#openvpn_admins_group_name" className="snap-top"><code>openvpn_admins_group_name</code></a></td>
        <td>The name of the OpenVPN admins IAM group (to request and revoke certificates).</td>
    </tr><tr>
        <td><a name="openvpn_users_group_name" href="#openvpn_users_group_name" className="snap-top"><code>openvpn_users_group_name</code></a></td>
        <td>The name of the OpenVPN users IAM group (to request certificates).</td>
    </tr><tr>
        <td><a name="private_ip" href="#private_ip" className="snap-top"><code>private_ip</code></a></td>
        <td>The private IP address of the OpenVPN server.</td>
    </tr><tr>
        <td><a name="public_ip" href="#public_ip" className="snap-top"><code>public_ip</code></a></td>
        <td>The public IP address of the OpenVPN server.</td>
    </tr><tr>
        <td><a name="security_group_id" href="#security_group_id" className="snap-top"><code>security_group_id</code></a></td>
        <td>The security group ID of the OpenVPN server.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"c634960b53b0bccfc993484d6ff59b28"}
##DOCS-SOURCER-END -->
