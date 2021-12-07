import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Jenkins

Deploy Jenkins CI Server on AWS.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/mgmt/jenkins" className="link-button">View on GitHub</a>

### Reference

<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <ul>
      
    <li>
      <p>
        <a name="acm_ssl_certificate_domain" href="#acm_ssl_certificate_domain" className="snap-top">
          <code>acm_ssl_certificate_domain</code>
        </a> - The domain name used for an SSL certificate issued by the Amazon Certificate Manager (ACM).
      </p>
    </li>
    <li>
      <p>
        <a name="alarms_sns_topic_arn" href="#alarms_sns_topic_arn" className="snap-top">
          <code>alarms_sns_topic_arn</code>
        </a> - The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications. Also used for the alarms if the Jenkins backup job fails.
      </p>
    </li>
    <li>
      <p>
        <a name="alb_subnet_ids" href="#alb_subnet_ids" className="snap-top">
          <code>alb_subnet_ids</code>
        </a> - The IDs of the subnets in which to deploy the ALB that runs in front of Jenkins. Must be subnets in var.vpc_id.
      </p>
    </li>
    <li>
      <p>
        <a name="allow_incoming_http_from_cidr_blocks" href="#allow_incoming_http_from_cidr_blocks" className="snap-top">
          <code>allow_incoming_http_from_cidr_blocks</code>
        </a> - The IP address ranges in CIDR format from which to allow incoming HTTP requests to Jenkins.
      </p>
    </li>
    <li>
      <p>
        <a name="allow_incoming_http_from_security_group_ids" href="#allow_incoming_http_from_security_group_ids" className="snap-top">
          <code>allow_incoming_http_from_security_group_ids</code>
        </a> - The IDs of security groups from which to allow incoming HTTP requests to Jenkins.
      </p>
    </li>
    <li>
      <p>
        <a name="allow_ssh_from_cidr_blocks" href="#allow_ssh_from_cidr_blocks" className="snap-top">
          <code>allow_ssh_from_cidr_blocks</code>
        </a> - The IP address ranges in CIDR format from which to allow incoming SSH requests to Jenkins.
      </p>
    </li>
    <li>
      <p>
        <a name="allow_ssh_from_security_group_ids" href="#allow_ssh_from_security_group_ids" className="snap-top">
          <code>allow_ssh_from_security_group_ids</code>
        </a> - The IDs of security groups from which to allow incoming SSH requests to Jenkins.
      </p>
    </li>
    <li>
      <p>
        <a name="ami" href="#ami" className="snap-top">
          <code>ami</code>
        </a> - The ID of the AMI to run on the Jenkins server. This should be the AMI build from the Packer template jenkins-ubuntu.json. One of var.ami or var.ami_filters is required. Set to null if looking up the ami with filters.
      </p>
    </li>
    <li>
      <p>
        <a name="ami_filters" href="#ami_filters" className="snap-top">
          <code>ami_filters</code>
        </a> - Properties on the AMI that can be used to lookup a prebuilt AMI for use with Jenkins. You can build the AMI using the Packer template jenkins-ubuntu.json. Only used if var.ami is null. One of var.ami or var.ami_filters is required. Set to null if passing the ami ID directly.
      </p>
    </li>
    <li>
      <p>
        <a name="backup_job_alarm_period" href="#backup_job_alarm_period" className="snap-top">
          <code>backup_job_alarm_period</code>
        </a> - How often, in seconds, the backup job is expected to run. This is the same as var.backup_job_schedule_expression, but unfortunately, Terraform offers no way to convert rate expressions to seconds. We add a CloudWatch alarm that triggers if the value of var.backup_job_metric_name and var.backup_job_metric_namespace isn't updated within this time period, as that indicates the backup failed to run.
      </p>
    </li>
    <li>
      <p>
        <a name="backup_job_metric_name" href="#backup_job_metric_name" className="snap-top">
          <code>backup_job_metric_name</code>
        </a> - The name for the CloudWatch Metric the AWS lambda backup job will increment every time the job completes successfully.
      </p>
    </li>
    <li>
      <p>
        <a name="backup_job_metric_namespace" href="#backup_job_metric_namespace" className="snap-top">
          <code>backup_job_metric_namespace</code>
        </a> - The namespace for the CloudWatch Metric the AWS lambda backup job will increment every time the job completes successfully.
      </p>
    </li>
    <li>
      <p>
        <a name="backup_job_schedule_expression" href="#backup_job_schedule_expression" className="snap-top">
          <code>backup_job_schedule_expression</code>
        </a> - A cron or rate expression that specifies how often to take a snapshot of the Jenkins server for backup purposes. See https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html for syntax details.
      </p>
    </li>
    <li>
      <p>
        <a name="backup_using_dlm" href="#backup_using_dlm" className="snap-top">
          <code>backup_using_dlm</code>
        </a> - Set to true to backup the Jenkins Server using AWS Data Lifecycle Management Policies.
      </p>
    </li>
    <li>
      <p>
        <a name="backup_using_lambda" href="#backup_using_lambda" className="snap-top">
          <code>backup_using_lambda</code>
        </a> - Set to true to backup the Jenkins Server using a Scheduled Lambda Function.
      </p>
    </li>
    <li>
      <p>
        <a name="build_permission_actions" href="#build_permission_actions" className="snap-top">
          <code>build_permission_actions</code>
        </a> - The list of IAM actions this Jenkins server should be allowed to do: e.g., ec2:*, s3:*, etc. This should be the list of IAM permissions Jenkins needs in this AWS account to run builds. These permissions will be added to the server's IAM role for all resources ('*').
      </p>
    </li>
    <li>
      <p>
        <a name="cloud_init_parts" href="#cloud_init_parts" className="snap-top">
          <code>cloud_init_parts</code>
        </a> - Cloud init scripts to run on the Jenkins server when it is booting. See the part blocks in https://www.terraform.io/docs/providers/template/d/cloudinit_config.html for syntax.
      </p>
    </li>
    <li>
      <p>
        <a name="custom_tags" href="#custom_tags" className="snap-top">
          <code>custom_tags</code>
        </a> - A list of custom tags to apply to Jenkins and all other resources.
      </p>
    </li>
    <li>
      <p>
        <a name="default_user" href="#default_user" className="snap-top">
          <code>default_user</code>
        </a> - The default OS user for the Jenkins AMI. For AWS Ubuntu AMIs, which is what the Packer template in jenkins-ubunutu.json uses, the default OS user is 'ubuntu'.
      </p>
    </li>
    <li>
      <p>
        <a name="dlm_backup_job_schedule_interval" href="#dlm_backup_job_schedule_interval" className="snap-top">
          <code>dlm_backup_job_schedule_interval</code>
        </a> - How often this lifecycle policy should be evaluated, in hours.
      </p>
    </li>
    <li>
      <p>
        <a name="dlm_backup_job_schedule_name" href="#dlm_backup_job_schedule_name" className="snap-top">
          <code>dlm_backup_job_schedule_name</code>
        </a> - The name of the data lifecyle management schedule
      </p>
    </li>
    <li>
      <p>
        <a name="dlm_backup_job_schedule_number_of_snapshots_to_retain" href="#dlm_backup_job_schedule_number_of_snapshots_to_retain" className="snap-top">
          <code>dlm_backup_job_schedule_number_of_snapshots_to_retain</code>
        </a> - How many snapshots to keep. Must be an integer between 1 and 1000.
      </p>
    </li>
    <li>
      <p>
        <a name="dlm_backup_job_schedule_times" href="#dlm_backup_job_schedule_times" className="snap-top">
          <code>dlm_backup_job_schedule_times</code>
        </a> - A list of times in 24 hour clock format that sets when the lifecyle policy should be evaluated. Max of 1.
      </p>
    </li>
    <li>
      <p>
        <a name="domain_name" href="#domain_name" className="snap-top">
          <code>domain_name</code>
        </a> - The domain name for the DNS A record to add for Jenkins (e.g. jenkins.foo.com). Must be in the domain managed by var.hosted_zone_id.
      </p>
    </li>
    <li>
      <p>
        <a name="ebs_kms_key_arn" href="#ebs_kms_key_arn" className="snap-top">
          <code>ebs_kms_key_arn</code>
        </a> - The ARN of the KMS key used for encrypting the Jenkins EBS volume. The module will grant Jenkins permission to use this key.
      </p>
    </li>
    <li>
      <p>
        <a name="ebs_kms_key_arn_is_alias" href="#ebs_kms_key_arn_is_alias" className="snap-top">
          <code>ebs_kms_key_arn_is_alias</code>
        </a> - Whether or not the provide EBS KMS key ARN is a key alias. If providing the key ID, leave this set to false.
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
        </a> - Set to true to add AIM permissions to send logs to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/cloudwatch-log-aggregation-scripts to do log aggregation in CloudWatch.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_cloudwatch_metrics" href="#enable_cloudwatch_metrics" className="snap-top">
          <code>enable_cloudwatch_metrics</code>
        </a> - Set to true to add IAM permissions to send custom metrics to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent to get memory and disk metrics in CloudWatch for your Jenkins server.
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
        <a name="external_account_auto_deploy_iam_role_arns" href="#external_account_auto_deploy_iam_role_arns" className="snap-top">
          <code>external_account_auto_deploy_iam_role_arns</code>
        </a> - A list of IAM role ARNs in other AWS accounts that Jenkins will be able to assume to do automated deployment in those accounts.
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
        <a name="hosted_zone_id" href="#hosted_zone_id" className="snap-top">
          <code>hosted_zone_id</code>
        </a> - The ID of the Route 53 Hosted Zone in which to create a DNS A record for Jenkins.
      </p>
    </li>
    <li>
      <p>
        <a name="instance_type" href="#instance_type" className="snap-top">
          <code>instance_type</code>
        </a> - The instance type to use for the Jenkins server (e.g. t2.medium)
      </p>
    </li>
    <li>
      <p>
        <a name="is_internal_alb" href="#is_internal_alb" className="snap-top">
          <code>is_internal_alb</code>
        </a> - Set to true to make the Jenkins ALB an internal ALB that cannot be accessed from the public Internet. We strongly recommend setting this to true to keep Jenkins more secure.
      </p>
    </li>
    <li>
      <p>
        <a name="jenkins_device_name" href="#jenkins_device_name" className="snap-top">
          <code>jenkins_device_name</code>
        </a> - The OS device name where the Jenkins EBS volume should be attached
      </p>
    </li>
    <li>
      <p>
        <a name="jenkins_mount_point" href="#jenkins_mount_point" className="snap-top">
          <code>jenkins_mount_point</code>
        </a> - The OS path where the Jenkins EBS volume should be mounted
      </p>
    </li>
    <li>
      <p>
        <a name="jenkins_subnet_id" href="#jenkins_subnet_id" className="snap-top">
          <code>jenkins_subnet_id</code>
        </a> - The ID of the subnet in which to deploy Jenkins. Must be a subnet in var.vpc_id.
      </p>
    </li>
    <li>
      <p>
        <a name="jenkins_user" href="#jenkins_user" className="snap-top">
          <code>jenkins_user</code>
        </a> - The OS user that should be used to run Jenkins
      </p>
    </li>
    <li>
      <p>
        <a name="jenkins_volume_encrypted" href="#jenkins_volume_encrypted" className="snap-top">
          <code>jenkins_volume_encrypted</code>
        </a> - Set to true to encrypt the Jenkins EBS volume.
      </p>
    </li>
    <li>
      <p>
        <a name="jenkins_volume_size" href="#jenkins_volume_size" className="snap-top">
          <code>jenkins_volume_size</code>
        </a> - The amount of disk space, in GB, to allocate for the EBS volume used by the Jenkins server.
      </p>
    </li>
    <li>
      <p>
        <a name="jenkins_volume_type" href="#jenkins_volume_type" className="snap-top">
          <code>jenkins_volume_type</code>
        </a> - The type of volume to use for the EBS volume used by the Jenkins server. Must be one of: standard, gp2, io1, sc1, or st1.
      </p>
    </li>
    <li>
      <p>
        <a name="keypair_name" href="#keypair_name" className="snap-top">
          <code>keypair_name</code>
        </a> - The name of a Key Pair that can be used to SSH to the Jenkins server. Leave blank if you don't want to enable Key Pair auth.
      </p>
    </li>
    <li>
      <p>
        <a name="memory" href="#memory" className="snap-top">
          <code>memory</code>
        </a> - The amount of memory to give Jenkins (e.g., 1g or 512m). Used for the -Xms and -Xmx settings.
      </p>
    </li>
    <li>
      <p>
        <a name="name" href="#name" className="snap-top">
          <code>name</code>
        </a> - Enter the name of the Jenkins server
      </p>
    </li>
    <li>
      <p>
        <a name="root_block_device_volume_type" href="#root_block_device_volume_type" className="snap-top">
          <code>root_block_device_volume_type</code>
        </a> - The type of volume to use for the root disk for Jenkins. Must be one of: standard, gp2, io1, sc1, or st1.
      </p>
    </li>
    <li>
      <p>
        <a name="root_volume_size" href="#root_volume_size" className="snap-top">
          <code>root_volume_size</code>
        </a> - The amount of disk space, in GB, to allocate for the root volume of this server. Note that all of Jenkins' data is stored on a separate EBS Volume (see var.jenkins_volume_size), so this root volume is primarily used for the OS, temp folders, apps, etc.
      </p>
    </li>
    <li>
      <p>
        <a name="skip_health_check" href="#skip_health_check" className="snap-top">
          <code>skip_health_check</code>
        </a> - If set to true, skip the health check, and start a rolling deployment of Jenkins without waiting for it to initially be in a healthy state. This is primarily useful if the server group is in a broken state and you want to force a deployment anyway.
      </p>
    </li>
    <li>
      <p>
        <a name="ssh_grunt_iam_group" href="#ssh_grunt_iam_group" className="snap-top">
          <code>ssh_grunt_iam_group</code>
        </a> - If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this Jenkins server. This value is only used if enable_ssh_grunt=true.
      </p>
    </li>
    <li>
      <p>
        <a name="ssh_grunt_iam_group_sudo" href="#ssh_grunt_iam_group_sudo" className="snap-top">
          <code>ssh_grunt_iam_group_sudo</code>
        </a> - If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this Jenkins server with sudo permissions. This value is only used if enable_ssh_grunt=true.
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
        </a> - The ID of the VPC in which to deploy Jenkins
      </p>
    </li>
    </ul>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <ul>
      
    <li>
      <p>
        <a name="alb_arn" href="#alb_arn" className="snap-top">
          <code>alb_arn</code>
        </a> - The ARN of the ALB deployed in front of Jenkins
      </p>
    </li>
    <li>
      <p>
        <a name="alb_dns_name" href="#alb_dns_name" className="snap-top">
          <code>alb_dns_name</code>
        </a> - The DNS name of the ALB deployed in front of Jenkins
      </p>
    </li>
    <li>
      <p>
        <a name="alb_hosted_zone_id" href="#alb_hosted_zone_id" className="snap-top">
          <code>alb_hosted_zone_id</code>
        </a> - The hosted zone ID of the ALB deployed in front of Jenkins
      </p>
    </li>
    <li>
      <p>
        <a name="alb_http_listener_arns" href="#alb_http_listener_arns" className="snap-top">
          <code>alb_http_listener_arns</code>
        </a> - The ARNs of just the HTTP ALB listeners of the ALB deployed in front of Jenkins
      </p>
    </li>
    <li>
      <p>
        <a name="alb_https_listener_acm_cert_arns" href="#alb_https_listener_acm_cert_arns" className="snap-top">
          <code>alb_https_listener_acm_cert_arns</code>
        </a> - The ARNs of just the HTTPS ALB listeners that usse ACM certs of the ALB deployed in front of Jenkins
      </p>
    </li>
    <li>
      <p>
        <a name="alb_https_listener_non_acm_cert_arns" href="#alb_https_listener_non_acm_cert_arns" className="snap-top">
          <code>alb_https_listener_non_acm_cert_arns</code>
        </a> - The ARNs of just the HTTPS ALB listeners that use non-ACM certs of the ALB deployed in front of Jenkins
      </p>
    </li>
    <li>
      <p>
        <a name="alb_listener_arns" href="#alb_listener_arns" className="snap-top">
          <code>alb_listener_arns</code>
        </a> - The ARNs of the ALB listeners of the ALB deployed in front of Jenkins
      </p>
    </li>
    <li>
      <p>
        <a name="alb_name" href="#alb_name" className="snap-top">
          <code>alb_name</code>
        </a> - The name of the ALB deployed in front of Jenkins
      </p>
    </li>
    <li>
      <p>
        <a name="alb_security_group_id" href="#alb_security_group_id" className="snap-top">
          <code>alb_security_group_id</code>
        </a> - The ID of the security group attached to the ALB deployed in front of Jenkins
      </p>
    </li>
    <li>
      <p>
        <a name="backup_lambda_function_arn" href="#backup_lambda_function_arn" className="snap-top">
          <code>backup_lambda_function_arn</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="backup_lambda_function_name" href="#backup_lambda_function_name" className="snap-top">
          <code>backup_lambda_function_name</code>
        </a> - 
      </p>
    </li>
    <li>
      <p>
        <a name="jenkins_asg_name" href="#jenkins_asg_name" className="snap-top">
          <code>jenkins_asg_name</code>
        </a> - The name of the Auto Scaling Group in which Jenkins is running
      </p>
    </li>
    <li>
      <p>
        <a name="jenkins_domain_name" href="#jenkins_domain_name" className="snap-top">
          <code>jenkins_domain_name</code>
        </a> - The public domain name configured for Jenkins
      </p>
    </li>
    <li>
      <p>
        <a name="jenkins_ebs_volume_id" href="#jenkins_ebs_volume_id" className="snap-top">
          <code>jenkins_ebs_volume_id</code>
        </a> - The ID of the EBS Volume that will store the JENKINS_HOME directory
      </p>
    </li>
    <li>
      <p>
        <a name="jenkins_iam_role_arn" href="#jenkins_iam_role_arn" className="snap-top">
          <code>jenkins_iam_role_arn</code>
        </a> - The ARN of the IAM role attached to the Jenkins EC2 Instance
      </p>
    </li>
    <li>
      <p>
        <a name="jenkins_iam_role_id" href="#jenkins_iam_role_id" className="snap-top">
          <code>jenkins_iam_role_id</code>
        </a> - The ID of the IAM role attached to the Jenkins EC2 Instance
      </p>
    </li>
    <li>
      <p>
        <a name="jenkins_security_group_id" href="#jenkins_security_group_id" className="snap-top">
          <code>jenkins_security_group_id</code>
        </a> - The ID of the Security Group attached to the Jenkins EC2 Instance
      </p>
    </li>
    </ul>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"e7c0aa1d6758b74585347aa43c5d13f5"}
##DOCS-SOURCER-END -->
