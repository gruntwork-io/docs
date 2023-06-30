---
type: "service"
name: "EC2 Instance"
description: "Deploy an EC2 Instance, including server hardening, IAM role, EIP, EBS Volume, and CloudWatch metrics, logs, and alerts."
category: "services"
cloud: "aws"
tags: ["ec2","ssh","security"]
license: "gruntwork"
built-with: "terraform, bash, packer"
title: "EC2 Instance"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.104.14" lastModifiedVersion="0.104.12"/>

# EC2 Instance

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/ec2-instance" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=services%2Fec2-instance" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>

## Overview

This service creates a single EC2 instance that includes server hardening, IAM role, EIP (optional), EBS Volume
(optional), and CloudWatch metrics, logs, and alerts. Note that a single EC2 instance can be a single point of failure,
so if you want to run multiple EC2 instances for high availability and scalability, see the
[asg-service](/reference/services/app-orchestration/auto-scaling-group-asg).

## Features

*   Build an AMI to run on the EC2 instance
*   Create EC2 instance for the host
*   Allocate an optional Elastic IP Address (EIP) and an associated DNS record
*   Create an IAM Role and IAM instance profile
*   Create a security group to manage ingress and egress traffic on desired ports
*   Harden the OS by installing `fail2ban`, `ntp`, `auto-update`, `ip-lockdown`, and more
*   Send all logs and metrics to CloudWatch
*   Configure alerts in CloudWatch for CPU, memory, and disk space usage
*   Manage SSH access with IAM groups using `ssh-grunt`
*   Create and mount optional EBS volumes
*   Allow ingress traffic on desired ports

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

### Core concepts

*   [How do I update my instance?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/ec2-instance/core-concepts.md#how-do-i-update-my-instance)
*   [How do I use User Data?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/ec2-instance/core-concepts.md#how-do-i-use-user-data)
*   [How do I mount an EBS volume?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/ec2-instance/core-concepts.md#how-do-i-mount-an-ebs-volume)

### The EC2 Instance AMI

The EC2 Instance AMI is defined using the [Packer](https://www.packer.io/) template at `ec2-instance.json`.
This template configures the AMI to:

1.  Run the [ssh-grunt module](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ssh-grunt) so
    that developers can upload their public SSH keys to IAM and use those SSH keys, along with their IAM user names,
    toSSH to the EC2 instance.

2.  Run the [auto-update module](https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/auto-update)
    so that the EC2 instance installs security updates automatically.

3.  Optionally run the
    [syslog module](https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/syslog)
    to automatically rotate and rate limit syslog so that the EC2 instance doesn’t run out of disk space from large
    volumes of logs.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-learning-and-testing): The `examples/for-learning-and-testing`
    folder contains standalone sample code optimized for learning, experimenting, and testing (but not direct
    production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog, configure CI / CD for your apps and
    infrastructure.


## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EC2-INSTANCE MODULE
# ------------------------------------------------------------------------------------------------------

module "ec_2_instance" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/ec2-instance?ref=v0.104.14"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Accept inbound traffic on these port ranges from the specified CIDR blocks
  allow_port_from_cidr_blocks = <map(object(
    from_port   = number
    to_port     = number
    protocol    = string
    cidr_blocks = list(string)
  ))>

  # Accept inbound traffic on these port ranges from the specified security
  # groups
  allow_port_from_security_group_ids = <map(object(
    from_port                = number
    to_port                  = number
    protocol                 = string
    source_security_group_id = string
  ))>

  # Accept inbound SSH from these CIDR blocks
  allow_ssh_from_cidr_blocks = <list(string)>

  # Accept inbound SSH from these security groups
  allow_ssh_from_security_group_ids = <list(string)>

  # The AMI to run on the EC2 instance. This should be built from the Packer
  # template under ec2-instance.json. One of var.ami or var.ami_filters is
  # required. Set to null if looking up the ami with filters.
  ami = <string>

  # Properties on the AMI that can be used to lookup a prebuilt AMI for use with
  # the EC2 instance. You can build the AMI using the Packer template
  # ec2-instance.json. Only used if var.ami is null. One of var.ami or
  # var.ami_filters is required. Set to null if passing the ami ID directly.
  ami_filters = <object(
    owners = list(string)
    filters = list(object(
      name   = string
      values = list(string)
    ))
  )>

  # Specify whether we're selecting a private or public Route 53 DNS Zone
  dns_zone_is_private = <bool>

  # The EBS volumes to attach to the instance. This must be a map of key/value
  # pairs.
  ebs_volumes = <any>

  # The type of instance to run for the EC2 instance
  instance_type = <string>

  # The name of the EC2 instance and the other resources created by these
  # templates
  name = <string>

  # The domain name to use to look up the Route 53 hosted zone. Will be a subset
  # of fully_qualified_domain_name: e.g., my-company.com. Only one of
  # route53_lookup_domain_name or route53_zone_id should be used.
  route53_lookup_domain_name = <INPUT REQUIRED>

  # The ID of the hosted zone to use. Allows specifying the hosted zone directly
  # instead of looking it up via domain name. Only one of
  # route53_lookup_domain_name or route53_zone_id should be used.
  route53_zone_id = <string>

  # The ID of the subnet in which to deploy the EC2 instance. Must be a subnet
  # in var.vpc_id.
  subnet_id = <string>

  # The ID of the VPC in which to deploy the EC2 instance.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of optional additional security group ids to assign to the EC2
  # instance.
  additional_security_group_ids = []

  # The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and
  # disk space usage) should send notifications.
  alarms_sns_topic_arn = []

  # Determines if an Elastic IP (EIP) will be created for this instance.
  attach_eip = true

  # Tags to use to filter the Route 53 Hosted Zones that might match the hosted
  # zone's name (use if you have multiple public hosted zones with the same
  # name)
  base_domain_name_tags = {}

  # Cloud init scripts to run on the EC2 instance while it boots. See the part
  # blocks in
  # https://www.terraform.io/docs/providers/template/d/cloudinit_config.html for
  # syntax.
  cloud_init_parts = {}

  # The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for
  # encrypting log data.
  cloudwatch_log_group_kms_key_id = null

  # The number of days to retain log events in the log group. Refer to
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days
  # for all the valid values. When null, the log events are retained forever.
  cloudwatch_log_group_retention_in_days = null

  # Tags to apply on the CloudWatch Log Group, encoded as a map where the keys
  # are tag keys and values are tag values.
  cloudwatch_log_group_tags = null

  # Set to true to create a DNS record in Route53 pointing to the EC2 instance.
  # If true, be sure to set var.fully_qualified_domain_name.
  create_dns_record = true

  # When true, this module will create a new IAM role to bind to the EC2
  # instance. Set to false if you wish to use a preexisting IAM role. By
  # default, this module will create an instance profile to pass this IAM role
  # to the EC2 instance. Preexisting IAM roles created through the AWS console
  # instead of programatically (e.g. withTerraform) will automatically create an
  # instance profile with the same name. In that case, set
  # create_instance_profile to false to avoid errors during Terraform apply.
  create_iam_role = true

  # When true, this module will create an instance profile to pass the IAM role,
  # either the one created by this module or one passed externally, to the EC2
  # instance. Set to false if you wish to use a preexisting instance profile.
  # For more information see
  # https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html.
  create_instance_profile = true

  # The default OS user for the EC2 instance AMI. For AWS Ubuntu AMIs, which is
  # what the Packer template in ec2-instance.json uses, the default OS user is
  # 'ubuntu'.
  default_user = "ubuntu"

  # DNS Time To Live in seconds.
  dns_ttl = 300

  # If true, the launched EC2 Instance will be EBS-optimized.
  ebs_optimized = true

  # Set to true to enable several basic CloudWatch alarms around CPU usage,
  # memory usage, and disk space usage. If set to true, make sure to specify SNS
  # topics to send notifications to using var.alarms_sns_topic_arn.
  enable_cloudwatch_alarms = true

  # Set to true to send logs to CloudWatch. This is useful in combination with
  # https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/cloudwatch-log-aggregation-scripts
  # to do log aggregation in CloudWatch.
  enable_cloudwatch_log_aggregation = true

  # Set to true to add IAM permissions to send custom metrics to CloudWatch.
  # This is useful in combination with
  # https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/metrics/cloudwatch-memory-disk-metrics-scripts
  # to get memory and disk metrics in CloudWatch for your EC2 instance.
  enable_cloudwatch_metrics = true

  # Enable fail2ban to block brute force log in attempts. Defaults to true.
  enable_fail2ban = true

  # Enable ip-lockdown to block access to the instance metadata. Defaults to
  # true.
  enable_ip_lockdown = true

  # Set to true to add IAM permissions for ssh-grunt
  # (https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ssh-grunt),
  # which will allow you to manage SSH access via IAM groups.
  enable_ssh_grunt = true

  # If you are using ssh-grunt and your IAM users / groups are defined in a
  # separate AWS account, you can use this variable to specify the ARN of an IAM
  # role that ssh-grunt can assume to retrieve IAM group and public SSH key info
  # from that account. To omit this variable, set it to an empty string (do NOT
  # use null, or Terraform will complain).
  external_account_ssh_grunt_role_arn = ""

  # The apex domain of the hostname for the EC2 instance (e.g., example.com).
  # The complete hostname for the EC2 instance will be
  # var.name.var.fully_qualified_domain_name (e.g., bastion.example.com). Only
  # used if create_dns_record is true.
  fully_qualified_domain_name = ""

  # The period, in seconds, over which to measure the CPU utilization percentage
  # for the instance.
  high_instance_cpu_utilization_period = 60

  # Trigger an alarm if the EC2 instance has a CPU utilization percentage above
  # this threshold.
  high_instance_cpu_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_instance_cpu_utilization_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the root disk utilization
  # percentage for the instance.
  high_instance_disk_utilization_period = 60

  # Trigger an alarm if the EC2 instance has a root disk utilization percentage
  # above this threshold.
  high_instance_disk_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_instance_disk_utilization_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the Memory utilization
  # percentage for the instance.
  high_instance_memory_utilization_period = 60

  # Trigger an alarm if the EC2 instance has a Memory utilization percentage
  # above this threshold.
  high_instance_memory_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_instance_memory_utilization_treat_missing_data = "missing"

  # The name for the bastion host's IAM role and instance profile. If set to an
  # empty string, will use var.name. Required when create_iam_role is false.
  iam_role_name = ""

  # The name of a Key Pair that can be used to SSH to this instance. This
  # instance may have ssh-grunt installed. The preferred way to do SSH access is
  # with your own IAM user name and SSH key. This Key Pair is only as a
  # fallback.
  keypair_name = null

  # Whether the metadata service is available. Valid values include enabled or
  # disabled. Defaults to enabled.
  metadata_http_endpoint = "enabled"

  # Desired HTTP PUT response hop limit for instance metadata requests. The
  # larger the number, the further instance metadata requests can travel. Valid
  # values are integer from 1 to 64. Defaults to 1.
  metadata_http_put_response_hop_limit = 1

  # Whether or not the metadata service requires session tokens, also referred
  # to as Instance Metadata Service Version 2 (IMDSv2). Valid values include
  # optional or required. Defaults to optional.
  metadata_http_tokens = "optional"

  # Enables or disables access to instance tags from the instance metadata
  # service. Valid values include enabled or disabled. Defaults to disabled.
  metadata_tags = "disabled"

  # If set to true, the root volume will be deleted when the Instance is
  # terminated.
  root_volume_delete_on_termination = true

  # The size of the root volume, in gigabytes.
  root_volume_size = 8

  # The root volume type. Must be one of: standard, gp2, io1.
  root_volume_type = "standard"

  # A list of secondary private IPv4 addresses to assign to the instance's
  # primary network interface (eth0) in a VPC
  secondary_private_ips = []

  # When true, precreate the CloudWatch Log Group to use for log aggregation
  # from the EC2 instances. This is useful if you wish to customize the
  # CloudWatch Log Group with various settings such as retention periods and KMS
  # encryption. When false, the CloudWatch agent will automatically create a
  # basic log group to use.
  should_create_cloudwatch_log_group = true

  # If you are using ssh-grunt, this is the name of the IAM group from which
  # users will be allowed to SSH to this EC2 instance. To omit this variable,
  # set it to an empty string (do NOT use null, or Terraform will complain).
  ssh_grunt_iam_group = ""

  # If you are using ssh-grunt, this is the name of the IAM group from which
  # users will be allowed to SSH to this EC2 instance. To omit this variable,
  # set it to an empty string (do NOT use null, or Terraform will complain).
  ssh_grunt_iam_group_sudo = ""

  # A map of tags to apply to the EC2 instance and the S3 Buckets. The key is
  # the tag name and the value is the tag value.
  tags = {}

  # The tenancy of this instance. Must be one of: default, dedicated, or host.
  tenancy = "default"

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EC2-INSTANCE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/ec2-instance?ref=v0.104.14"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Accept inbound traffic on these port ranges from the specified CIDR blocks
  allow_port_from_cidr_blocks = <map(object(
    from_port   = number
    to_port     = number
    protocol    = string
    cidr_blocks = list(string)
  ))>

  # Accept inbound traffic on these port ranges from the specified security
  # groups
  allow_port_from_security_group_ids = <map(object(
    from_port                = number
    to_port                  = number
    protocol                 = string
    source_security_group_id = string
  ))>

  # Accept inbound SSH from these CIDR blocks
  allow_ssh_from_cidr_blocks = <list(string)>

  # Accept inbound SSH from these security groups
  allow_ssh_from_security_group_ids = <list(string)>

  # The AMI to run on the EC2 instance. This should be built from the Packer
  # template under ec2-instance.json. One of var.ami or var.ami_filters is
  # required. Set to null if looking up the ami with filters.
  ami = <string>

  # Properties on the AMI that can be used to lookup a prebuilt AMI for use with
  # the EC2 instance. You can build the AMI using the Packer template
  # ec2-instance.json. Only used if var.ami is null. One of var.ami or
  # var.ami_filters is required. Set to null if passing the ami ID directly.
  ami_filters = <object(
    owners = list(string)
    filters = list(object(
      name   = string
      values = list(string)
    ))
  )>

  # Specify whether we're selecting a private or public Route 53 DNS Zone
  dns_zone_is_private = <bool>

  # The EBS volumes to attach to the instance. This must be a map of key/value
  # pairs.
  ebs_volumes = <any>

  # The type of instance to run for the EC2 instance
  instance_type = <string>

  # The name of the EC2 instance and the other resources created by these
  # templates
  name = <string>

  # The domain name to use to look up the Route 53 hosted zone. Will be a subset
  # of fully_qualified_domain_name: e.g., my-company.com. Only one of
  # route53_lookup_domain_name or route53_zone_id should be used.
  route53_lookup_domain_name = <INPUT REQUIRED>

  # The ID of the hosted zone to use. Allows specifying the hosted zone directly
  # instead of looking it up via domain name. Only one of
  # route53_lookup_domain_name or route53_zone_id should be used.
  route53_zone_id = <string>

  # The ID of the subnet in which to deploy the EC2 instance. Must be a subnet
  # in var.vpc_id.
  subnet_id = <string>

  # The ID of the VPC in which to deploy the EC2 instance.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of optional additional security group ids to assign to the EC2
  # instance.
  additional_security_group_ids = []

  # The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and
  # disk space usage) should send notifications.
  alarms_sns_topic_arn = []

  # Determines if an Elastic IP (EIP) will be created for this instance.
  attach_eip = true

  # Tags to use to filter the Route 53 Hosted Zones that might match the hosted
  # zone's name (use if you have multiple public hosted zones with the same
  # name)
  base_domain_name_tags = {}

  # Cloud init scripts to run on the EC2 instance while it boots. See the part
  # blocks in
  # https://www.terraform.io/docs/providers/template/d/cloudinit_config.html for
  # syntax.
  cloud_init_parts = {}

  # The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for
  # encrypting log data.
  cloudwatch_log_group_kms_key_id = null

  # The number of days to retain log events in the log group. Refer to
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days
  # for all the valid values. When null, the log events are retained forever.
  cloudwatch_log_group_retention_in_days = null

  # Tags to apply on the CloudWatch Log Group, encoded as a map where the keys
  # are tag keys and values are tag values.
  cloudwatch_log_group_tags = null

  # Set to true to create a DNS record in Route53 pointing to the EC2 instance.
  # If true, be sure to set var.fully_qualified_domain_name.
  create_dns_record = true

  # When true, this module will create a new IAM role to bind to the EC2
  # instance. Set to false if you wish to use a preexisting IAM role. By
  # default, this module will create an instance profile to pass this IAM role
  # to the EC2 instance. Preexisting IAM roles created through the AWS console
  # instead of programatically (e.g. withTerraform) will automatically create an
  # instance profile with the same name. In that case, set
  # create_instance_profile to false to avoid errors during Terraform apply.
  create_iam_role = true

  # When true, this module will create an instance profile to pass the IAM role,
  # either the one created by this module or one passed externally, to the EC2
  # instance. Set to false if you wish to use a preexisting instance profile.
  # For more information see
  # https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html.
  create_instance_profile = true

  # The default OS user for the EC2 instance AMI. For AWS Ubuntu AMIs, which is
  # what the Packer template in ec2-instance.json uses, the default OS user is
  # 'ubuntu'.
  default_user = "ubuntu"

  # DNS Time To Live in seconds.
  dns_ttl = 300

  # If true, the launched EC2 Instance will be EBS-optimized.
  ebs_optimized = true

  # Set to true to enable several basic CloudWatch alarms around CPU usage,
  # memory usage, and disk space usage. If set to true, make sure to specify SNS
  # topics to send notifications to using var.alarms_sns_topic_arn.
  enable_cloudwatch_alarms = true

  # Set to true to send logs to CloudWatch. This is useful in combination with
  # https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/cloudwatch-log-aggregation-scripts
  # to do log aggregation in CloudWatch.
  enable_cloudwatch_log_aggregation = true

  # Set to true to add IAM permissions to send custom metrics to CloudWatch.
  # This is useful in combination with
  # https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/metrics/cloudwatch-memory-disk-metrics-scripts
  # to get memory and disk metrics in CloudWatch for your EC2 instance.
  enable_cloudwatch_metrics = true

  # Enable fail2ban to block brute force log in attempts. Defaults to true.
  enable_fail2ban = true

  # Enable ip-lockdown to block access to the instance metadata. Defaults to
  # true.
  enable_ip_lockdown = true

  # Set to true to add IAM permissions for ssh-grunt
  # (https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ssh-grunt),
  # which will allow you to manage SSH access via IAM groups.
  enable_ssh_grunt = true

  # If you are using ssh-grunt and your IAM users / groups are defined in a
  # separate AWS account, you can use this variable to specify the ARN of an IAM
  # role that ssh-grunt can assume to retrieve IAM group and public SSH key info
  # from that account. To omit this variable, set it to an empty string (do NOT
  # use null, or Terraform will complain).
  external_account_ssh_grunt_role_arn = ""

  # The apex domain of the hostname for the EC2 instance (e.g., example.com).
  # The complete hostname for the EC2 instance will be
  # var.name.var.fully_qualified_domain_name (e.g., bastion.example.com). Only
  # used if create_dns_record is true.
  fully_qualified_domain_name = ""

  # The period, in seconds, over which to measure the CPU utilization percentage
  # for the instance.
  high_instance_cpu_utilization_period = 60

  # Trigger an alarm if the EC2 instance has a CPU utilization percentage above
  # this threshold.
  high_instance_cpu_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_instance_cpu_utilization_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the root disk utilization
  # percentage for the instance.
  high_instance_disk_utilization_period = 60

  # Trigger an alarm if the EC2 instance has a root disk utilization percentage
  # above this threshold.
  high_instance_disk_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_instance_disk_utilization_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the Memory utilization
  # percentage for the instance.
  high_instance_memory_utilization_period = 60

  # Trigger an alarm if the EC2 instance has a Memory utilization percentage
  # above this threshold.
  high_instance_memory_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_instance_memory_utilization_treat_missing_data = "missing"

  # The name for the bastion host's IAM role and instance profile. If set to an
  # empty string, will use var.name. Required when create_iam_role is false.
  iam_role_name = ""

  # The name of a Key Pair that can be used to SSH to this instance. This
  # instance may have ssh-grunt installed. The preferred way to do SSH access is
  # with your own IAM user name and SSH key. This Key Pair is only as a
  # fallback.
  keypair_name = null

  # Whether the metadata service is available. Valid values include enabled or
  # disabled. Defaults to enabled.
  metadata_http_endpoint = "enabled"

  # Desired HTTP PUT response hop limit for instance metadata requests. The
  # larger the number, the further instance metadata requests can travel. Valid
  # values are integer from 1 to 64. Defaults to 1.
  metadata_http_put_response_hop_limit = 1

  # Whether or not the metadata service requires session tokens, also referred
  # to as Instance Metadata Service Version 2 (IMDSv2). Valid values include
  # optional or required. Defaults to optional.
  metadata_http_tokens = "optional"

  # Enables or disables access to instance tags from the instance metadata
  # service. Valid values include enabled or disabled. Defaults to disabled.
  metadata_tags = "disabled"

  # If set to true, the root volume will be deleted when the Instance is
  # terminated.
  root_volume_delete_on_termination = true

  # The size of the root volume, in gigabytes.
  root_volume_size = 8

  # The root volume type. Must be one of: standard, gp2, io1.
  root_volume_type = "standard"

  # A list of secondary private IPv4 addresses to assign to the instance's
  # primary network interface (eth0) in a VPC
  secondary_private_ips = []

  # When true, precreate the CloudWatch Log Group to use for log aggregation
  # from the EC2 instances. This is useful if you wish to customize the
  # CloudWatch Log Group with various settings such as retention periods and KMS
  # encryption. When false, the CloudWatch agent will automatically create a
  # basic log group to use.
  should_create_cloudwatch_log_group = true

  # If you are using ssh-grunt, this is the name of the IAM group from which
  # users will be allowed to SSH to this EC2 instance. To omit this variable,
  # set it to an empty string (do NOT use null, or Terraform will complain).
  ssh_grunt_iam_group = ""

  # If you are using ssh-grunt, this is the name of the IAM group from which
  # users will be allowed to SSH to this EC2 instance. To omit this variable,
  # set it to an empty string (do NOT use null, or Terraform will complain).
  ssh_grunt_iam_group_sudo = ""

  # A map of tags to apply to the EC2 instance and the S3 Buckets. The key is
  # the tag name and the value is the tag value.
  tags = {}

  # The tenancy of this instance. Must be one of: default, dedicated, or host.
  tenancy = "default"

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

}


```

</TabItem>
</Tabs>



## Reference


<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="allow_port_from_cidr_blocks" requirement="required" type="map(object(…))">
<HclListItemDescription>

Accept inbound traffic on these port ranges from the specified CIDR blocks

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    from_port   = number
    to_port     = number
    protocol    = string
    cidr_blocks = list(string)
  }))
```

</HclListItemTypeDetails>
</HclListItem>

<HclListItem name="allow_port_from_security_group_ids" requirement="required" type="map(object(…))">
<HclListItemDescription>

Accept inbound traffic on these port ranges from the specified security groups

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    from_port                = number
    to_port                  = number
    protocol                 = string
    source_security_group_id = string
  }))
```

</HclListItemTypeDetails>
</HclListItem>

<HclListItem name="allow_ssh_from_cidr_blocks" requirement="required" type="list(string)">
<HclListItemDescription>

Accept inbound SSH from these CIDR blocks

</HclListItemDescription>
</HclListItem>

<HclListItem name="allow_ssh_from_security_group_ids" requirement="required" type="list(string)">
<HclListItemDescription>

Accept inbound SSH from these security groups

</HclListItemDescription>
</HclListItem>

<HclListItem name="ami" requirement="required" type="string">
<HclListItemDescription>

The AMI to run on the EC2 instance. This should be built from the Packer template under ec2-instance.json. One of <a href="#ami"><code>ami</code></a> or <a href="#ami_filters"><code>ami_filters</code></a> is required. Set to null if looking up the ami with filters.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ami_filters" requirement="required" type="object(…)">
<HclListItemDescription>

Properties on the AMI that can be used to lookup a prebuilt AMI for use with the EC2 instance. You can build the AMI using the Packer template ec2-instance.json. Only used if <a href="#ami"><code>ami</code></a> is null. One of <a href="#ami"><code>ami</code></a> or <a href="#ami_filters"><code>ami_filters</code></a> is required. Set to null if passing the ami ID directly.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # List of owners to limit the search. Set to null if you do not wish to limit the search by AMI owners.
    owners = list(string)

    # Name/Value pairs to filter the AMI off of. There are several valid keys, for a full reference, check out the
    # documentation for describe-images in the AWS CLI reference
    # (https://docs.aws.amazon.com/cli/latest/reference/ec2/describe-images.html).
    filters = list(object({
      name   = string
      values = list(string)
    }))
  })
```

</HclListItemTypeDetails>
<HclGeneralListItem title="More Details">
<details>


```hcl

     Name/Value pairs to filter the AMI off of. There are several valid keys, for a full reference, check out the
     documentation for describe-images in the AWS CLI reference
     (https://docs.aws.amazon.com/cli/latest/reference/ec2/describe-images.html).

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="dns_zone_is_private" requirement="required" type="bool">
<HclListItemDescription>

Specify whether we're selecting a private or public Route 53 DNS Zone

</HclListItemDescription>
</HclListItem>

<HclListItem name="ebs_volumes" requirement="required" type="any">
<HclListItemDescription>

The EBS volumes to attach to the instance. This must be a map of key/value pairs.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
</HclListItem>

<HclListItem name="instance_type" requirement="required" type="string">
<HclListItemDescription>

The type of instance to run for the EC2 instance

</HclListItemDescription>
</HclListItem>

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name of the EC2 instance and the other resources created by these templates

</HclListItemDescription>
</HclListItem>

<HclListItem name="route53_lookup_domain_name" requirement="required">
<HclListItemDescription>

The domain name to use to look up the Route 53 hosted zone. Will be a subset of fully_qualified_domain_name: e.g., my-company.com. Only one of route53_lookup_domain_name or route53_zone_id should be used.

</HclListItemDescription>
</HclListItem>

<HclListItem name="route53_zone_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the hosted zone to use. Allows specifying the hosted zone directly instead of looking it up via domain name. Only one of route53_lookup_domain_name or route53_zone_id should be used.

</HclListItemDescription>
</HclListItem>

<HclListItem name="subnet_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the subnet in which to deploy the EC2 instance. Must be a subnet in <a href="#vpc_id"><code>vpc_id</code></a>.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the VPC in which to deploy the EC2 instance.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="additional_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of optional additional security group ids to assign to the EC2 instance.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="alarms_sns_topic_arn" requirement="optional" type="list(string)">
<HclListItemDescription>

The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="attach_eip" requirement="optional" type="bool">
<HclListItemDescription>

Determines if an Elastic IP (EIP) will be created for this instance.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="base_domain_name_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags to use to filter the Route 53 Hosted Zones that might match the hosted zone's name (use if you have multiple public hosted zones with the same name)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="cloud_init_parts" requirement="optional" type="map(object(…))">
<HclListItemDescription>

Cloud init scripts to run on the EC2 instance while it boots. See the part blocks in https://www.terraform.io/docs/providers/template/d/cloudinit_config.html for syntax.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    filename     = string
    content_type = string
    content      = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for encrypting log data.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_retention_in_days" requirement="optional" type="number">
<HclListItemDescription>

The number of days to retain log events in the log group. Refer to https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days for all the valid values. When null, the log events are retained forever.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags to apply on the CloudWatch Log Group, encoded as a map where the keys are tag keys and values are tag values.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="create_dns_record" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to create a DNS record in Route53 pointing to the EC2 instance. If true, be sure to set <a href="#fully_qualified_domain_name"><code>fully_qualified_domain_name</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_iam_role" requirement="optional" type="bool">
<HclListItemDescription>

When true, this module will create a new IAM role to bind to the EC2 instance. Set to false if you wish to use a preexisting IAM role. By default, this module will create an instance profile to pass this IAM role to the EC2 instance. Preexisting IAM roles created through the AWS console instead of programatically (e.g. withTerraform) will automatically create an instance profile with the same name. In that case, set create_instance_profile to false to avoid errors during Terraform apply.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="create_instance_profile" requirement="optional" type="bool">
<HclListItemDescription>

When true, this module will create an instance profile to pass the IAM role, either the one created by this module or one passed externally, to the EC2 instance. Set to false if you wish to use a preexisting instance profile. For more information see https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="default_user" requirement="optional" type="string">
<HclListItemDescription>

The default OS user for the EC2 instance AMI. For AWS Ubuntu AMIs, which is what the Packer template in ec2-instance.json uses, the default OS user is 'ubuntu'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ubuntu&quot;"/>
</HclListItem>

<HclListItem name="dns_ttl" requirement="optional" type="number">
<HclListItemDescription>

DNS Time To Live in seconds.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="ebs_optimized" requirement="optional" type="bool">
<HclListItemDescription>

If true, the launched EC2 Instance will be EBS-optimized.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_alarms" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using <a href="#alarms_sns_topic_arn"><code>alarms_sns_topic_arn</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_log_aggregation" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to send logs to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/cloudwatch-log-aggregation-scripts to do log aggregation in CloudWatch.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_metrics" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to add IAM permissions to send custom metrics to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/metrics/cloudwatch-memory-disk-metrics-scripts to get memory and disk metrics in CloudWatch for your EC2 instance.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_fail2ban" requirement="optional" type="bool">
<HclListItemDescription>

Enable fail2ban to block brute force log in attempts. Defaults to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_ip_lockdown" requirement="optional" type="bool">
<HclListItemDescription>

Enable ip-lockdown to block access to the instance metadata. Defaults to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_ssh_grunt" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to add IAM permissions for ssh-grunt (https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ssh-grunt), which will allow you to manage SSH access via IAM groups.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="external_account_ssh_grunt_role_arn" requirement="optional" type="string">
<HclListItemDescription>

If you are using ssh-grunt and your IAM users / groups are defined in a separate AWS account, you can use this variable to specify the ARN of an IAM role that ssh-grunt can assume to retrieve IAM group and public SSH key info from that account. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="fully_qualified_domain_name" requirement="optional" type="string">
<HclListItemDescription>

The apex domain of the hostname for the EC2 instance (e.g., example.com). The complete hostname for the EC2 instance will be <a href="#name"><code>name</code></a>.<a href="#fully_qualified_domain_name"><code>fully_qualified_domain_name</code></a> (e.g., bastion.example.com). Only used if create_dns_record is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="high_instance_cpu_utilization_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the CPU utilization percentage for the instance.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="high_instance_cpu_utilization_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the EC2 instance has a CPU utilization percentage above this threshold.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="90"/>
</HclListItem>

<HclListItem name="high_instance_cpu_utilization_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="high_instance_disk_utilization_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the root disk utilization percentage for the instance.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="high_instance_disk_utilization_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the EC2 instance has a root disk utilization percentage above this threshold.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="90"/>
</HclListItem>

<HclListItem name="high_instance_disk_utilization_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="high_instance_memory_utilization_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the Memory utilization percentage for the instance.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="high_instance_memory_utilization_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the EC2 instance has a Memory utilization percentage above this threshold.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="90"/>
</HclListItem>

<HclListItem name="high_instance_memory_utilization_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

The name for the bastion host's IAM role and instance profile. If set to an empty string, will use <a href="#name"><code>name</code></a>. Required when create_iam_role is false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="keypair_name" requirement="optional" type="string">
<HclListItemDescription>

The name of a Key Pair that can be used to SSH to this instance. This instance may have ssh-grunt installed. The preferred way to do SSH access is with your own IAM user name and SSH key. This Key Pair is only as a fallback.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="metadata_http_endpoint" requirement="optional" type="string">
<HclListItemDescription>

Whether the metadata service is available. Valid values include enabled or disabled. Defaults to enabled.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;enabled&quot;"/>
</HclListItem>

<HclListItem name="metadata_http_put_response_hop_limit" requirement="optional" type="number">
<HclListItemDescription>

Desired HTTP PUT response hop limit for instance metadata requests. The larger the number, the further instance metadata requests can travel. Valid values are integer from 1 to 64. Defaults to 1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="metadata_http_tokens" requirement="optional" type="string">
<HclListItemDescription>

Whether or not the metadata service requires session tokens, also referred to as Instance Metadata Service Version 2 (IMDSv2). Valid values include optional or required. Defaults to optional.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;optional&quot;"/>
</HclListItem>

<HclListItem name="metadata_tags" requirement="optional" type="string">
<HclListItemDescription>

Enables or disables access to instance tags from the instance metadata service. Valid values include enabled or disabled. Defaults to disabled.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;disabled&quot;"/>
</HclListItem>

<HclListItem name="root_volume_delete_on_termination" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, the root volume will be deleted when the Instance is terminated.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="root_volume_size" requirement="optional" type="number">
<HclListItemDescription>

The size of the root volume, in gigabytes.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="8"/>
</HclListItem>

<HclListItem name="root_volume_type" requirement="optional" type="string">
<HclListItemDescription>

The root volume type. Must be one of: standard, gp2, io1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;standard&quot;"/>
</HclListItem>

<HclListItem name="secondary_private_ips" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of secondary private IPv4 addresses to assign to the instance's primary network interface (eth0) in a VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="should_create_cloudwatch_log_group" requirement="optional" type="bool">
<HclListItemDescription>

When true, precreate the CloudWatch Log Group to use for log aggregation from the EC2 instances. This is useful if you wish to customize the CloudWatch Log Group with various settings such as retention periods and KMS encryption. When false, the CloudWatch agent will automatically create a basic log group to use.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="ssh_grunt_iam_group" requirement="optional" type="string">
<HclListItemDescription>

If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this EC2 instance. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="ssh_grunt_iam_group_sudo" requirement="optional" type="string">
<HclListItemDescription>

If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this EC2 instance. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the EC2 instance and the S3 Buckets. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="tenancy" requirement="optional" type="string">
<HclListItemDescription>

The tenancy of this instance. Must be one of: default, dedicated, or host.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;default&quot;"/>
</HclListItem>

<HclListItem name="use_managed_iam_policies" requirement="optional" type="bool">
<HclListItemDescription>

When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="dns_name">
<HclListItemDescription>

The fully qualified name of the EC2 server.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ec2_instance_iam_role_arn">
<HclListItemDescription>

The ARN of the EC2 server's IAM role.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ec2_instance_iam_role_id">
<HclListItemDescription>

The ID of the EC2 server's IAM role.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ec2_instance_iam_role_name">
<HclListItemDescription>

The name of the EC2 server's IAM role.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ec2_instance_instance_id">
<HclListItemDescription>

The EC2 instance ID of the EC2 server.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ec2_instance_private_ip">
<HclListItemDescription>

The private IP address of the EC2 server.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ec2_instance_public_ip">
<HclListItemDescription>

The public IP address of the EC2 server.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ec2_instance_security_group_id">
<HclListItemDescription>

The ID of the EC2 servers's security group.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ec2_instance_volume_info">
<HclListItemDescription>

Info about the created EBS volumes.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ec2_instance_volume_parameters">
<HclListItemDescription>

The input parameters for the EBS volumes.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/ec2-instance/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/ec2-instance/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/services/ec2-instance/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "1b0368638cfd58d3337221f589b33405"
}
##DOCS-SOURCER-END -->
