---
title: EC2 Instance
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from "../../../../src/components/VersionBadge.tsx"

<VersionBadge version="0.73.2"/>

# EC2 Instance

Deploy an EC2 Instance, including server hardening, IAM role, EIP, EBS Volume, and CloudWatch metrics, logs, and alerts.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/ec2-instance" className="link-button">View Source</a>
<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=services/ec2-instance" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Filtered Release Notes</a>

### Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<a name="additional_security_group_ids" className="snap-top"></a>

* [**`additional_security_group_ids`**](#additional_security_group_ids) &mdash; A list of optional additional security group ids to assign to the EC2 instance.

<a name="alarms_sns_topic_arn" className="snap-top"></a>

* [**`alarms_sns_topic_arn`**](#alarms_sns_topic_arn) &mdash; The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications.

<a name="allow_port_from_cidr_blocks" className="snap-top"></a>

* [**`allow_port_from_cidr_blocks`**](#allow_port_from_cidr_blocks) &mdash; Accept inbound traffic on these port ranges from the specified CIDR blocks

<a name="allow_port_from_security_group_ids" className="snap-top"></a>

* [**`allow_port_from_security_group_ids`**](#allow_port_from_security_group_ids) &mdash; Accept inbound traffic on these port ranges from the specified security groups

<a name="allow_ssh_from_cidr_blocks" className="snap-top"></a>

* [**`allow_ssh_from_cidr_blocks`**](#allow_ssh_from_cidr_blocks) &mdash; Accept inbound SSH from these CIDR blocks

<a name="allow_ssh_from_security_group_ids" className="snap-top"></a>

* [**`allow_ssh_from_security_group_ids`**](#allow_ssh_from_security_group_ids) &mdash; Accept inbound SSH from these security groups

<a name="ami" className="snap-top"></a>

* [**`ami`**](#ami) &mdash; The AMI to run on the EC2 instance. This should be built from the Packer template under ec2-instance.json. One of var.ami or [`ami_filters`](#ami_filters) is required. Set to null if looking up the ami with filters.

<a name="ami_filters" className="snap-top"></a>

* [**`ami_filters`**](#ami_filters) &mdash; Properties on the AMI that can be used to lookup a prebuilt AMI for use with the EC2 instance. You can build the AMI using the Packer template ec2-instance.json. Only used if var.ami is null. One of var.ami or [`ami_filters`](#ami_filters) is required. Set to null if passing the ami ID directly.

<a name="attach_eip" className="snap-top"></a>

* [**`attach_eip`**](#attach_eip) &mdash; Determines if an Elastic IP (EIP) will be created for this instance.

<a name="base_domain_name_tags" className="snap-top"></a>

* [**`base_domain_name_tags`**](#base_domain_name_tags) &mdash; Tags to use to filter the Route 53 Hosted Zones that might match the hosted zone's name (use if you have multiple public hosted zones with the same name)

<a name="cloud_init_parts" className="snap-top"></a>

* [**`cloud_init_parts`**](#cloud_init_parts) &mdash; Cloud init scripts to run on the EC2 instance while it boots. See the part blocks in [`https://www.terraform.io/docs/providers/template/d/cloudinit_config`](#https://www.terraform.io/docs/providers/template/d/cloudinit_config).html for syntax.

<a name="cloudwatch_log_group_kms_key_id" className="snap-top"></a>

* [**`cloudwatch_log_group_kms_key_id`**](#cloudwatch_log_group_kms_key_id) &mdash; The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for encrypting log data.

<a name="cloudwatch_log_group_retention_in_days" className="snap-top"></a>

* [**`cloudwatch_log_group_retention_in_days`**](#cloudwatch_log_group_retention_in_days) &mdash; The number of days to retain log events in the log group. Refer to [`https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days`](#https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days) for all the valid values. When null, the log events are retained forever.

<a name="cloudwatch_log_group_tags" className="snap-top"></a>

* [**`cloudwatch_log_group_tags`**](#cloudwatch_log_group_tags) &mdash; Tags to apply on the CloudWatch Log Group, encoded as a map where the keys are tag keys and values are tag values.

<a name="create_dns_record" className="snap-top"></a>

* [**`create_dns_record`**](#create_dns_record) &mdash; Set to true to create a DNS record in Route53 pointing to the EC2 instance. If true, be sure to set [`fully_qualified_domain_name`](#fully_qualified_domain_name).

<a name="default_user" className="snap-top"></a>

* [**`default_user`**](#default_user) &mdash; The default OS user for the EC2 instance AMI. For AWS Ubuntu AMIs, which is what the Packer template in ec2-instance.json uses, the default OS user is 'ubuntu'.

<a name="dns_ttl" className="snap-top"></a>

* [**`dns_ttl`**](#dns_ttl) &mdash; DNS Time To Live in seconds.

<a name="dns_zone_is_private" className="snap-top"></a>

* [**`dns_zone_is_private`**](#dns_zone_is_private) &mdash; Specify whether we're selecting a private or public Route 53 DNS Zone

<a name="ebs_volumes" className="snap-top"></a>

* [**`ebs_volumes`**](#ebs_volumes) &mdash; The EBS volumes to attach to the instance. This must be a map of key/value pairs.

<a name="enable_cloudwatch_alarms" className="snap-top"></a>

* [**`enable_cloudwatch_alarms`**](#enable_cloudwatch_alarms) &mdash; Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using [`alarms_sns_topic_arn`](#alarms_sns_topic_arn).

<a name="enable_cloudwatch_log_aggregation" className="snap-top"></a>

* [**`enable_cloudwatch_log_aggregation`**](#enable_cloudwatch_log_aggregation) &mdash; Set to true to send logs to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/cloudwatch-log-aggregation-scripts to do log aggregation in CloudWatch.

<a name="enable_cloudwatch_metrics" className="snap-top"></a>

* [**`enable_cloudwatch_metrics`**](#enable_cloudwatch_metrics) &mdash; Set to true to add IAM permissions to send custom metrics to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/metrics/cloudwatch-memory-disk-metrics-scripts to get memory and disk metrics in CloudWatch for your EC2 instance.

<a name="enable_fail2ban" className="snap-top"></a>

* [**`enable_fail2ban`**](#enable_fail2ban) &mdash; Enable fail2ban to block brute force log in attempts. Defaults to true.

<a name="enable_ip_lockdown" className="snap-top"></a>

* [**`enable_ip_lockdown`**](#enable_ip_lockdown) &mdash; Enable ip-lockdown to block access to the instance metadata. Defaults to true.

<a name="enable_ssh_grunt" className="snap-top"></a>

* [**`enable_ssh_grunt`**](#enable_ssh_grunt) &mdash; Set to true to add IAM permissions for ssh-grunt (https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ssh-grunt), which will allow you to manage SSH access via IAM groups.

<a name="external_account_ssh_grunt_role_arn" className="snap-top"></a>

* [**`external_account_ssh_grunt_role_arn`**](#external_account_ssh_grunt_role_arn) &mdash; If you are using ssh-grunt and your IAM users / groups are defined in a separate AWS account, you can use this variable to specify the ARN of an IAM role that ssh-grunt can assume to retrieve IAM group and public SSH key info from that account. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).

<a name="fully_qualified_domain_name" className="snap-top"></a>

* [**`fully_qualified_domain_name`**](#fully_qualified_domain_name) &mdash; The apex domain of the hostname for the EC2 instance (e.g., example.com). The complete hostname for the EC2 instance will be [`name.var.fully_qualified_domain_name`](#name.var.fully_qualified_domain_name) (e.g., bastion.example.com). Only used if [`create_dns_record`](#create_dns_record) is true.

<a name="instance_type" className="snap-top"></a>

* [**`instance_type`**](#instance_type) &mdash; The type of instance to run for the EC2 instance

<a name="keypair_name" className="snap-top"></a>

* [**`keypair_name`**](#keypair_name) &mdash; The name of a Key Pair that can be used to SSH to this instance. This instance may have ssh-grunt installed. The preferred way to do SSH access is with your own IAM user name and SSH key. This Key Pair is only as a fallback.

<a name="name" className="snap-top"></a>

* [**`name`**](#name) &mdash; The name of the EC2 instance and the other resources created by these templates

<a name="root_volume_delete_on_termination" className="snap-top"></a>

* [**`root_volume_delete_on_termination`**](#root_volume_delete_on_termination) &mdash; If set to true, the root volume will be deleted when the Instance is terminated.

<a name="root_volume_size" className="snap-top"></a>

* [**`root_volume_size`**](#root_volume_size) &mdash; The size of the root volume, in gigabytes.

<a name="root_volume_type" className="snap-top"></a>

* [**`root_volume_type`**](#root_volume_type) &mdash; The root volume type. Must be one of: standard, gp2, io1.

<a name="route53_lookup_domain_name" className="snap-top"></a>

* [**`route53_lookup_domain_name`**](#route53_lookup_domain_name) &mdash; The domain name to use to look up the Route 53 hosted zone. Will be a subset of [`fully_qualified_domain_name`](#fully_qualified_domain_name): e.g., my-company.com. Only one of [`route53_lookup_domain_name`](#route53_lookup_domain_name) or [`route53_zone_id`](#route53_zone_id) should be used.

<a name="route53_zone_id" className="snap-top"></a>

* [**`route53_zone_id`**](#route53_zone_id) &mdash; The ID of the hosted zone to use. Allows specifying the hosted zone directly instead of looking it up via domain name. Only one of [`route53_lookup_domain_name`](#route53_lookup_domain_name) or [`route53_zone_id`](#route53_zone_id) should be used.

<a name="should_create_cloudwatch_log_group" className="snap-top"></a>

* [**`should_create_cloudwatch_log_group`**](#should_create_cloudwatch_log_group) &mdash; When true, precreate the CloudWatch Log Group to use for log aggregation from the EC2 instances. This is useful if you wish to customize the CloudWatch Log Group with various settings such as retention periods and KMS encryption. When false, the CloudWatch agent will automatically create a basic log group to use.

<a name="ssh_grunt_iam_group" className="snap-top"></a>

* [**`ssh_grunt_iam_group`**](#ssh_grunt_iam_group) &mdash; If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this EC2 instance. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).

<a name="ssh_grunt_iam_group_sudo" className="snap-top"></a>

* [**`ssh_grunt_iam_group_sudo`**](#ssh_grunt_iam_group_sudo) &mdash; If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this EC2 instance. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).

<a name="subnet_id" className="snap-top"></a>

* [**`subnet_id`**](#subnet_id) &mdash; The ID of the subnet in which to deploy the EC2 instance. Must be a subnet in [`vpc_id`](#vpc_id).

<a name="tags" className="snap-top"></a>

* [**`tags`**](#tags) &mdash; A map of tags to apply to the EC2 instance and the S3 Buckets. The key is the tag name and the value is the tag value.

<a name="tenancy" className="snap-top"></a>

* [**`tenancy`**](#tenancy) &mdash; The tenancy of this instance. Must be one of: default, dedicated, or host.

<a name="vpc_id" className="snap-top"></a>

* [**`vpc_id`**](#vpc_id) &mdash; The ID of the VPC in which to deploy the EC2 instance.

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="dns_name" className="snap-top"></a>

* [**`dns_name`**](#dns_name) &mdash; The fully qualified name of the EC2 server.

<a name="ec2_instance_iam_role_arn" className="snap-top"></a>

* [**`ec2_instance_iam_role_arn`**](#ec2_instance_iam_role_arn) &mdash; The ARN of the EC2 server's IAM role.

<a name="ec2_instance_iam_role_id" className="snap-top"></a>

* [**`ec2_instance_iam_role_id`**](#ec2_instance_iam_role_id) &mdash; The ID of the EC2 server's IAM role.

<a name="ec2_instance_iam_role_name" className="snap-top"></a>

* [**`ec2_instance_iam_role_name`**](#ec2_instance_iam_role_name) &mdash; The name of the EC2 server's IAM role.

<a name="ec2_instance_instance_id" className="snap-top"></a>

* [**`ec2_instance_instance_id`**](#ec2_instance_instance_id) &mdash; The EC2 instance ID of the EC2 server.

<a name="ec2_instance_private_ip" className="snap-top"></a>

* [**`ec2_instance_private_ip`**](#ec2_instance_private_ip) &mdash; The private IP address of the EC2 server.

<a name="ec2_instance_public_ip" className="snap-top"></a>

* [**`ec2_instance_public_ip`**](#ec2_instance_public_ip) &mdash; The public IP address of the EC2 server.

<a name="ec2_instance_security_group_id" className="snap-top"></a>

* [**`ec2_instance_security_group_id`**](#ec2_instance_security_group_id) &mdash; The ID of the EC2 servers's security group.

<a name="ec2_instance_volume_info" className="snap-top"></a>

* [**`ec2_instance_volume_info`**](#ec2_instance_volume_info) &mdash; Info about the created EBS volumes.

<a name="ec2_instance_volume_parameters" className="snap-top"></a>

* [**`ec2_instance_volume_parameters`**](#ec2_instance_volume_parameters) &mdash; The input parameters for the EBS volumes.

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"7102499a403e62dbc1ee888d278d9a94"}
##DOCS-SOURCER-END -->
