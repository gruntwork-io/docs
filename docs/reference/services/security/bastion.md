---
title: Bastion
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from "../../../../src/components/VersionBadge.tsx"

<VersionBadge version="0.74.0"/>

# Bastion

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/mgmt/bastion-host" className="link-button">View Source</a>
<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=mgmt/bastion-host" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Filtered Release Notes</a>

Deploy a Bastion host on to your AWS VPC network.

### Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<a name="additional_security_group_ids" className="snap-top"></a>

* [**`additional_security_group_ids`**](#additional_security_group_ids) &mdash; A list of optional additional security group ids to assign to the bastion server.

<a name="alarms_sns_topic_arn" className="snap-top"></a>

* [**`alarms_sns_topic_arn`**](#alarms_sns_topic_arn) &mdash; The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications.

<a name="allow_ssh_from_cidr_list" className="snap-top"></a>

* [**`allow_ssh_from_cidr_list`**](#allow_ssh_from_cidr_list) &mdash; A list of IP address ranges in CIDR format from which SSH access will be permitted. Attempts to access the bastion host from all other IP addresses will be blocked. This is only used if [`allow_ssh_from_cidr`](#allow_ssh_from_cidr) is true.

<a name="ami" className="snap-top"></a>

* [**`ami`**](#ami) &mdash; The AMI to run on the bastion host. This should be built from the Packer template under bastion-host.json. One of var.ami or [`ami_filters`](#ami_filters) is required. Set to null if looking up the ami with filters.

<a name="ami_filters" className="snap-top"></a>

* [**`ami_filters`**](#ami_filters) &mdash; Properties on the AMI that can be used to lookup a prebuilt AMI for use with the Bastion Host. You can build the AMI using the Packer template bastion-host.json. Only used if var.ami is null. One of var.ami or [`ami_filters`](#ami_filters) is required. Set to null if passing the ami ID directly.

<a name="base_domain_name_tags" className="snap-top"></a>

* [**`base_domain_name_tags`**](#base_domain_name_tags) &mdash; Tags to use to filter the Route 53 Hosted Zones that might match the hosted zone's name (use if you have multiple public hosted zones with the same name)

<a name="cloud_init_parts" className="snap-top"></a>

* [**`cloud_init_parts`**](#cloud_init_parts) &mdash; Cloud init scripts to run on the bastion host while it boots. See the part blocks in [`https://www.terraform.io/docs/providers/template/d/cloudinit_config`](#https://www.terraform.io/docs/providers/template/d/cloudinit_config).html for syntax.

<a name="cloudwatch_log_group_kms_key_id" className="snap-top"></a>

* [**`cloudwatch_log_group_kms_key_id`**](#cloudwatch_log_group_kms_key_id) &mdash; The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for encrypting log data.

<a name="cloudwatch_log_group_retention_in_days" className="snap-top"></a>

* [**`cloudwatch_log_group_retention_in_days`**](#cloudwatch_log_group_retention_in_days) &mdash; The number of days to retain log events in the log group. Refer to [`https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days`](#https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days) for all the valid values. When null, the log events are retained forever.

<a name="cloudwatch_log_group_tags" className="snap-top"></a>

* [**`cloudwatch_log_group_tags`**](#cloudwatch_log_group_tags) &mdash; Tags to apply on the CloudWatch Log Group, encoded as a map where the keys are tag keys and values are tag values.

<a name="create_dns_record" className="snap-top"></a>

* [**`create_dns_record`**](#create_dns_record) &mdash; Set to true to create a DNS record in Route53 pointing to the bastion. If true, be sure to set [`domain_name`](#domain_name).

<a name="default_user" className="snap-top"></a>

* [**`default_user`**](#default_user) &mdash; The default OS user for the Bastion Host AMI. For AWS Ubuntu AMIs, which is what the Packer template in bastion-host.json uses, the default OS user is 'ubuntu'.

<a name="domain_name" className="snap-top"></a>

* [**`domain_name`**](#domain_name) &mdash; The apex domain of the hostname for the bastion server (e.g., example.com). The complete hostname for the bastion server will be [`name.var.domain_name`](#name.var.domain_name) (e.g., bastion.example.com). Only used if [`create_dns_record`](#create_dns_record) is true.

<a name="enable_cloudwatch_alarms" className="snap-top"></a>

* [**`enable_cloudwatch_alarms`**](#enable_cloudwatch_alarms) &mdash; Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using [`alarms_sns_topic_arn`](#alarms_sns_topic_arn).

<a name="enable_cloudwatch_log_aggregation" className="snap-top"></a>

* [**`enable_cloudwatch_log_aggregation`**](#enable_cloudwatch_log_aggregation) &mdash; Set to true to send logs to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/cloudwatch-log-aggregation-scripts to do log aggregation in CloudWatch.

<a name="enable_cloudwatch_metrics" className="snap-top"></a>

* [**`enable_cloudwatch_metrics`**](#enable_cloudwatch_metrics) &mdash; Set to true to add IAM permissions to send custom metrics to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent to get memory and disk metrics in CloudWatch for your Bastion host.

<a name="enable_fail2ban" className="snap-top"></a>

* [**`enable_fail2ban`**](#enable_fail2ban) &mdash; Enable fail2ban to block brute force log in attempts. Defaults to true.

<a name="enable_ip_lockdown" className="snap-top"></a>

* [**`enable_ip_lockdown`**](#enable_ip_lockdown) &mdash; Enable ip-lockdown to block access to the instance metadata. Defaults to true.

<a name="enable_ssh_grunt" className="snap-top"></a>

* [**`enable_ssh_grunt`**](#enable_ssh_grunt) &mdash; Set to true to add IAM permissions for ssh-grunt (https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ssh-grunt), which will allow you to manage SSH access via IAM groups.

<a name="external_account_ssh_grunt_role_arn" className="snap-top"></a>

* [**`external_account_ssh_grunt_role_arn`**](#external_account_ssh_grunt_role_arn) &mdash; If you are using ssh-grunt and your IAM users / groups are defined in a separate AWS account, you can use this variable to specify the ARN of an IAM role that ssh-grunt can assume to retrieve IAM group and public SSH key info from that account. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).

<a name="instance_type" className="snap-top"></a>

* [**`instance_type`**](#instance_type) &mdash; The type of instance to run for the bastion host

<a name="keypair_name" className="snap-top"></a>

* [**`keypair_name`**](#keypair_name) &mdash; The name of a Key Pair that can be used to SSH to this instance.

<a name="name" className="snap-top"></a>

* [**`name`**](#name) &mdash; The name of the bastion host and the other resources created by these templates

<a name="should_create_cloudwatch_log_group" className="snap-top"></a>

* [**`should_create_cloudwatch_log_group`**](#should_create_cloudwatch_log_group) &mdash; When true, precreate the CloudWatch Log Group to use for log aggregation from the EC2 instances. This is useful if you wish to customize the CloudWatch Log Group with various settings such as retention periods and KMS encryption. When false, the CloudWatch agent will automatically create a basic log group to use.

<a name="ssh_grunt_iam_group" className="snap-top"></a>

* [**`ssh_grunt_iam_group`**](#ssh_grunt_iam_group) &mdash; If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this Bastion Host. This value is only used if [`enable_ssh_grunt`](#enable_ssh_grunt)=true.

<a name="ssh_grunt_iam_group_sudo" className="snap-top"></a>

* [**`ssh_grunt_iam_group_sudo`**](#ssh_grunt_iam_group_sudo) &mdash; If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this Bastion Host with sudo permissions. This value is only used if [`enable_ssh_grunt`](#enable_ssh_grunt)=true.

<a name="subnet_id" className="snap-top"></a>

* [**`subnet_id`**](#subnet_id) &mdash; The ID of the subnet in which to deploy the bastion. Must be a subnet in [`vpc_id`](#vpc_id).

<a name="tenancy" className="snap-top"></a>

* [**`tenancy`**](#tenancy) &mdash; The tenancy of this server. Must be one of: default, dedicated, or host.

<a name="vpc_id" className="snap-top"></a>

* [**`vpc_id`**](#vpc_id) &mdash; The ID of the VPC in which to deploy the bastion.

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="bastion_host_iam_role_arn" className="snap-top"></a>

* [**`bastion_host_iam_role_arn`**](#bastion_host_iam_role_arn) &mdash; The ARN of the bastion host's IAM role.

<a name="bastion_host_instance_id" className="snap-top"></a>

* [**`bastion_host_instance_id`**](#bastion_host_instance_id) &mdash; The EC2 instance ID of the bastion host.

<a name="bastion_host_private_ip" className="snap-top"></a>

* [**`bastion_host_private_ip`**](#bastion_host_private_ip) &mdash; The private IP address of the bastion host.

<a name="bastion_host_public_ip" className="snap-top"></a>

* [**`bastion_host_public_ip`**](#bastion_host_public_ip) &mdash; The public IP address of the bastion host.

<a name="bastion_host_security_group_id" className="snap-top"></a>

* [**`bastion_host_security_group_id`**](#bastion_host_security_group_id) &mdash; The ID of the bastion hosts's security group.

<a name="dns_name" className="snap-top"></a>

* [**`dns_name`**](#dns_name) &mdash; The fully qualified name of the bastion host.

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"bc7f828a987fdea6cc77effc1e798f57"}
##DOCS-SOURCER-END -->
