import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Jenkins

Deploy Jenkins CI Server on AWS.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/mgmt/jenkins" class="link-button">View on GitHub</a>

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
        <td>acm_ssl_certificate_domain</td>
        <td>The domain name used for an SSL certificate issued by the Amazon Certificate Manager (ACM).</td>
    </tr><tr>
        <td>alarms_sns_topic_arn</td>
        <td>The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications. Also used for the alarms if the Jenkins backup job fails.</td>
    </tr><tr>
        <td>alb_subnet_ids</td>
        <td>The IDs of the subnets in which to deploy the ALB that runs in front of Jenkins. Must be subnets in var.vpc_id.</td>
    </tr><tr>
        <td>allow_incoming_http_from_cidr_blocks</td>
        <td>The IP address ranges in CIDR format from which to allow incoming HTTP requests to Jenkins.</td>
    </tr><tr>
        <td>allow_incoming_http_from_security_group_ids</td>
        <td>The IDs of security groups from which to allow incoming HTTP requests to Jenkins.</td>
    </tr><tr>
        <td>allow_ssh_from_cidr_blocks</td>
        <td>The IP address ranges in CIDR format from which to allow incoming SSH requests to Jenkins.</td>
    </tr><tr>
        <td>allow_ssh_from_security_group_ids</td>
        <td>The IDs of security groups from which to allow incoming SSH requests to Jenkins.</td>
    </tr><tr>
        <td>ami</td>
        <td>The ID of the AMI to run on the Jenkins server. This should be the AMI build from the Packer template jenkins-ubuntu.json. One of var.ami or var.ami_filters is required. Set to null if looking up the ami with filters.</td>
    </tr><tr>
        <td>ami_filters</td>
        <td>Properties on the AMI that can be used to lookup a prebuilt AMI for use with Jenkins. You can build the AMI using the Packer template jenkins-ubuntu.json. Only used if var.ami is null. One of var.ami or var.ami_filters is required. Set to null if passing the ami ID directly.</td>
    </tr><tr>
        <td>backup_job_alarm_period</td>
        <td>How often, in seconds, the backup job is expected to run. This is the same as var.backup_job_schedule_expression, but unfortunately, Terraform offers no way to convert rate expressions to seconds. We add a CloudWatch alarm that triggers if the value of var.backup_job_metric_name and var.backup_job_metric_namespace isn't updated within this time period, as that indicates the backup failed to run.</td>
    </tr><tr>
        <td>backup_job_metric_name</td>
        <td>The name for the CloudWatch Metric the AWS lambda backup job will increment every time the job completes successfully.</td>
    </tr><tr>
        <td>backup_job_metric_namespace</td>
        <td>The namespace for the CloudWatch Metric the AWS lambda backup job will increment every time the job completes successfully.</td>
    </tr><tr>
        <td>backup_job_schedule_expression</td>
        <td>A cron or rate expression that specifies how often to take a snapshot of the Jenkins server for backup purposes. See https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html for syntax details.</td>
    </tr><tr>
        <td>backup_using_dlm</td>
        <td>Set to true to backup the Jenkins Server using AWS Data Lifecycle Management Policies.</td>
    </tr><tr>
        <td>backup_using_lambda</td>
        <td>Set to true to backup the Jenkins Server using a Scheduled Lambda Function.</td>
    </tr><tr>
        <td>build_permission_actions</td>
        <td>The list of IAM actions this Jenkins server should be allowed to do: e.g., ec2:*, s3:*, etc. This should be the list of IAM permissions Jenkins needs in this AWS account to run builds. These permissions will be added to the server's IAM role for all resources ('*').</td>
    </tr><tr>
        <td>cloud_init_parts</td>
        <td>Cloud init scripts to run on the Jenkins server when it is booting. See the part blocks in https://www.terraform.io/docs/providers/template/d/cloudinit_config.html for syntax.</td>
    </tr><tr>
        <td>custom_tags</td>
        <td>A list of custom tags to apply to Jenkins and all other resources.</td>
    </tr><tr>
        <td>default_user</td>
        <td>The default OS user for the Jenkins AMI. For AWS Ubuntu AMIs, which is what the Packer template in jenkins-ubunutu.json uses, the default OS user is 'ubuntu'.</td>
    </tr><tr>
        <td>dlm_backup_job_schedule_interval</td>
        <td>How often this lifecycle policy should be evaluated, in hours.</td>
    </tr><tr>
        <td>dlm_backup_job_schedule_name</td>
        <td>The name of the data lifecyle management schedule</td>
    </tr><tr>
        <td>dlm_backup_job_schedule_number_of_snapshots_to_retain</td>
        <td>How many snapshots to keep. Must be an integer between 1 and 1000.</td>
    </tr><tr>
        <td>dlm_backup_job_schedule_times</td>
        <td>A list of times in 24 hour clock format that sets when the lifecyle policy should be evaluated. Max of 1.</td>
    </tr><tr>
        <td>domain_name</td>
        <td>The domain name for the DNS A record to add for Jenkins (e.g. jenkins.foo.com). Must be in the domain managed by var.hosted_zone_id.</td>
    </tr><tr>
        <td>ebs_kms_key_arn</td>
        <td>The ARN of the KMS key used for encrypting the Jenkins EBS volume. The module will grant Jenkins permission to use this key.</td>
    </tr><tr>
        <td>ebs_kms_key_arn_is_alias</td>
        <td>Whether or not the provide EBS KMS key ARN is a key alias. If providing the key ID, leave this set to false.</td>
    </tr><tr>
        <td>enable_cloudwatch_alarms</td>
        <td>Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using var.alarms_sns_topic_arn.</td>
    </tr><tr>
        <td>enable_cloudwatch_log_aggregation</td>
        <td>Set to true to add AIM permissions to send logs to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/cloudwatch-log-aggregation-scripts to do log aggregation in CloudWatch.</td>
    </tr><tr>
        <td>enable_cloudwatch_metrics</td>
        <td>Set to true to add IAM permissions to send custom metrics to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent to get memory and disk metrics in CloudWatch for your Jenkins server.</td>
    </tr><tr>
        <td>enable_ip_lockdown</td>
        <td>Enable ip-lockdown to block access to the instance metadata. Defaults to true.</td>
    </tr><tr>
        <td>enable_ssh_grunt</td>
        <td>Set to true to add IAM permissions for ssh-grunt (https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ssh-grunt), which will allow you to manage SSH access via IAM groups.</td>
    </tr><tr>
        <td>external_account_auto_deploy_iam_role_arns</td>
        <td>A list of IAM role ARNs in other AWS accounts that Jenkins will be able to assume to do automated deployment in those accounts.</td>
    </tr><tr>
        <td>external_account_ssh_grunt_role_arn</td>
        <td>If you are using ssh-grunt and your IAM users / groups are defined in a separate AWS account, you can use this variable to specify the ARN of an IAM role that ssh-grunt can assume to retrieve IAM group and public SSH key info from that account. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).</td>
    </tr><tr>
        <td>hosted_zone_id</td>
        <td>The ID of the Route 53 Hosted Zone in which to create a DNS A record for Jenkins.</td>
    </tr><tr>
        <td>instance_type</td>
        <td>The instance type to use for the Jenkins server (e.g. t2.medium)</td>
    </tr><tr>
        <td>is_internal_alb</td>
        <td>Set to true to make the Jenkins ALB an internal ALB that cannot be accessed from the public Internet. We strongly recommend setting this to true to keep Jenkins more secure.</td>
    </tr><tr>
        <td>jenkins_device_name</td>
        <td>The OS device name where the Jenkins EBS volume should be attached</td>
    </tr><tr>
        <td>jenkins_mount_point</td>
        <td>The OS path where the Jenkins EBS volume should be mounted</td>
    </tr><tr>
        <td>jenkins_subnet_id</td>
        <td>The ID of the subnet in which to deploy Jenkins. Must be a subnet in var.vpc_id.</td>
    </tr><tr>
        <td>jenkins_user</td>
        <td>The OS user that should be used to run Jenkins</td>
    </tr><tr>
        <td>jenkins_volume_encrypted</td>
        <td>Set to true to encrypt the Jenkins EBS volume.</td>
    </tr><tr>
        <td>jenkins_volume_size</td>
        <td>The amount of disk space, in GB, to allocate for the EBS volume used by the Jenkins server.</td>
    </tr><tr>
        <td>jenkins_volume_type</td>
        <td>The type of volume to use for the EBS volume used by the Jenkins server. Must be one of: standard, gp2, io1, sc1, or st1.</td>
    </tr><tr>
        <td>keypair_name</td>
        <td>The name of a Key Pair that can be used to SSH to the Jenkins server. Leave blank if you don't want to enable Key Pair auth.</td>
    </tr><tr>
        <td>memory</td>
        <td>The amount of memory to give Jenkins (e.g., 1g or 512m). Used for the -Xms and -Xmx settings.</td>
    </tr><tr>
        <td>name</td>
        <td>Enter the name of the Jenkins server</td>
    </tr><tr>
        <td>root_block_device_volume_type</td>
        <td>The type of volume to use for the root disk for Jenkins. Must be one of: standard, gp2, io1, sc1, or st1.</td>
    </tr><tr>
        <td>root_volume_size</td>
        <td>The amount of disk space, in GB, to allocate for the root volume of this server. Note that all of Jenkins' data is stored on a separate EBS Volume (see var.jenkins_volume_size), so this root volume is primarily used for the OS, temp folders, apps, etc.</td>
    </tr><tr>
        <td>skip_health_check</td>
        <td>If set to true, skip the health check, and start a rolling deployment of Jenkins without waiting for it to initially be in a healthy state. This is primarily useful if the server group is in a broken state and you want to force a deployment anyway.</td>
    </tr><tr>
        <td>ssh_grunt_iam_group</td>
        <td>If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this Jenkins server. This value is only used if enable_ssh_grunt=true.</td>
    </tr><tr>
        <td>ssh_grunt_iam_group_sudo</td>
        <td>If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this Jenkins server with sudo permissions. This value is only used if enable_ssh_grunt=true.</td>
    </tr><tr>
        <td>tenancy</td>
        <td>The tenancy of this server. Must be one of: default, dedicated, or host.</td>
    </tr><tr>
        <td>vpc_id</td>
        <td>The ID of the VPC in which to deploy Jenkins</td>
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
        <td>alb_arn</td>
        <td>The ARN of the ALB deployed in front of Jenkins</td>
    </tr><tr>
        <td>alb_dns_name</td>
        <td>The DNS name of the ALB deployed in front of Jenkins</td>
    </tr><tr>
        <td>alb_hosted_zone_id</td>
        <td>The hosted zone ID of the ALB deployed in front of Jenkins</td>
    </tr><tr>
        <td>alb_http_listener_arns</td>
        <td>The ARNs of just the HTTP ALB listeners of the ALB deployed in front of Jenkins</td>
    </tr><tr>
        <td>alb_https_listener_acm_cert_arns</td>
        <td>The ARNs of just the HTTPS ALB listeners that usse ACM certs of the ALB deployed in front of Jenkins</td>
    </tr><tr>
        <td>alb_https_listener_non_acm_cert_arns</td>
        <td>The ARNs of just the HTTPS ALB listeners that use non-ACM certs of the ALB deployed in front of Jenkins</td>
    </tr><tr>
        <td>alb_listener_arns</td>
        <td>The ARNs of the ALB listeners of the ALB deployed in front of Jenkins</td>
    </tr><tr>
        <td>alb_name</td>
        <td>The name of the ALB deployed in front of Jenkins</td>
    </tr><tr>
        <td>alb_security_group_id</td>
        <td>The ID of the security group attached to the ALB deployed in front of Jenkins</td>
    </tr><tr>
        <td>backup_lambda_function_arn</td>
        <td></td>
    </tr><tr>
        <td>backup_lambda_function_name</td>
        <td></td>
    </tr><tr>
        <td>jenkins_asg_name</td>
        <td>The name of the Auto Scaling Group in which Jenkins is running</td>
    </tr><tr>
        <td>jenkins_domain_name</td>
        <td>The public domain name configured for Jenkins</td>
    </tr><tr>
        <td>jenkins_ebs_volume_id</td>
        <td>The ID of the EBS Volume that will store the JENKINS_HOME directory</td>
    </tr><tr>
        <td>jenkins_iam_role_arn</td>
        <td>The ARN of the IAM role attached to the Jenkins EC2 Instance</td>
    </tr><tr>
        <td>jenkins_iam_role_id</td>
        <td>The ID of the IAM role attached to the Jenkins EC2 Instance</td>
    </tr><tr>
        <td>jenkins_security_group_id</td>
        <td>The ID of the Security Group attached to the Jenkins EC2 Instance</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"ea9457d9f128545e877396650742ba66"}
##DOCS-SOURCER-END -->
