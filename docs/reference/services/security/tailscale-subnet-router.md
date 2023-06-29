---
type: "service"
name: "Tailscale Subnet Router"
description: "Deploy a Tailscale Subnet Router on AWS."
category: "remote-access"
cloud: "aws"
tags: ["vpn","ec2","ssh","security"]
license: "gruntwork"
built-with: "terraform, bash, packer"
title: "Tailscale Subnet Router"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.104.14" lastModifiedVersion="0.95.1"/>

# Tailscale Subnet Router

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/mgmt/tailscale-subnet-router" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=mgmt%2Ftailscale-subnet-router" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>

## Overview

This service contains [Terraform](https://www.terraform.io) code to deploy a production-grade server that can act as a
[Tailscale](https://tailscale.com/) [subnet router](https://tailscale.com/kb/1019/subnets/) for a VPC on
[AWS](https://aws.amazon.com).

Under the hood this module launches an EC2 instance (backed by an ASG) with Tailscale running in subnet router mode to
expose the VPC network to the [tailnet](https://tailscale.com/kb/1136/tailnet/).

:::note

This module depends on a [Tailscale](https://tailscale.com/) account. You must be signed up for the service to use
this VPN. The number of instances of this module you can deploy is dependent on how many subnet routers are
available on your plan. Refer to the [Tailscale pricing page](https://tailscale.com/pricing/) for more details on
available subnet routers for each plan.

:::

![Tailscale Subnet Router architecture](/img/reference/services/security/tailscale-subnet-router-architecture.png)

## Features

*   VPN without inbound security group rules.
*   Authenticate to tailscale using auth keys stored in Secrets Manager
*   Built in fault tolerance with Auto Scaling Group.
*   Rolling deployment support with [Instance Refresh](https://docs.aws.amazon.com/autoscaling/ec2/userguide/asg-instance-refresh.html).
*   Support for customizable IAM role.
*   Support for customizable security groups.

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

### Core concepts

*   [What is Tailscale?](https://tailscale.com/kb/1151/what-is-tailscale/)
*   [What is a Tailscale subnet router?](https://tailscale.com/kb/1019/subnets/)
*   [How does Tailscale work?](https://tailscale.com/blog/how-tailscale-works/)
*   [How does Tailscale avoid inbound Security Group rules?](https://tailscale.com/blog/how-nat-traversal-works/)

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

## Manage

### What ports should I expose on the Security Group to connect to the tailnet?

You do not need to expose any inbound ports on the Security Group to access the VPC network through the subnet router.
[Tailnet solely depends on outbound stateful connections to manage network
access](https://tailscale.com/blog/how-nat-traversal-works/).

However, you will need to create inbound security group rules that allow access from the Tailscale subnet router to
access services within your VPC through the tailnet.

### What AMI should I use?

Any AMI can be used with this module, provided that the [install-tailscale](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/mgmt/tailscale-subnet-router/scripts/install-tailscale.sh) script is installed
into the AMI. The `install-tailscale` script ensures that Tailscale is installed with the `init-tailscale-subnet-router` boot
script, which can be used to load the auth key from AWS Secrets Manager to authenticate to Tailscale at boot time.

### How do I authenticate the server to Tailscale?

This module expects the server to authenticate to Tailscale using [an auth
key](https://tailscale.com/kb/1085/auth-keys/) that is stored in AWS Secrets Manager. When creating the Secrets Manager secret first select the `Other type of secret` option, then select the `Plaintext` tab, and finally input your Tailscale auth key.

The auth key must be **Reusable** to allow the server to automatically rejoin the network when recovering from a failure.

We also recommend using a unique auth key for each subnet router instance, and to tag each key so that you can
differentiate between the different VPC networks in your [Tailscale ACL rules](https://tailscale.com/kb/1018/acls/).

You can specify the ACL tags your server will advertise by using the [tailscale_advertise_tags](https://github.com/gruntwork-io/terraform-aws-service-catalog/blob/e865799422cf334940a3a01c52d84f0377f494c6/modules/mgmt/tailscale-subnet-router/variables.tf#L71) variable, which will grant access to the server automatically based on tag-based ACLs in Tailscale. For more information see [Server role account using ACL tags](https://tailscale.com/kb/1068/acl-tags/).

### How do I add IAM policies to the Tailscale subnet router IAM role?

This module creates an IAM role that is assigned to the EC2 instance acting as the Tailscale subnet router. You can attach
custom policies to the IAM role directly by using the `aws_iam_role_policy` resource (for inline policies), or
the `aws_iam_role_policy_attachment` resource (for attaching dedicated IAM policies).

For example:

```hcl
module "tailscale" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-openvpn.git//modules/tailscale-subnet-router?ref=v1.0.8"

  # (... options omitted...)
}

resource "aws_iam_policy" "my_custom_policy" {
  name   = "my-custom-policy"
  policy = " (... omitted ...) "
}

resource "aws_iam_role_policy_attachment" "attachment" {
  role       = module.tailscale.iam_role_id
  policy_arn = aws_iam_policy.my_custom_policy.arn
}
```


## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S TAILSCALE-SUBNET-ROUTER MODULE
# ------------------------------------------------------------------------------------------------------

module "tailscale_subnet_router" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/tailscale-subnet-router?ref=v0.104.14"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AMI to run on the Tailscale subnet router. This should be built from the
  # Packer template under tailscale-subnet-router-ubuntu.json. One of var.ami or
  # var.ami_filters is required. Set to null if looking up the ami with filters.
  ami = <string>

  # Properties on the AMI that can be used to lookup a prebuilt AMI for use with
  # the Tailscale subnet router. You can build the AMI using the Packer template
  # tailscale-subnet-router-ubuntu.json. Only used if var.ami is null. One of
  # var.ami or var.ami_filters is required. Set to null if passing the ami ID
  # directly.
  ami_filters = <object(
    owners = list(string)
    filters = list(object(
      name   = string
      values = list(string)
    ))
  )>

  # The ARN of a Secrets Manager entry containing the Tailscale auth key to use
  # for authenticating the server.
  auth_key_secrets_manager_arn = <string>

  # The name of the server. This will be used to namespace all resources created
  # by this module.
  name = <string>

  # The ids of the subnets where this server should be deployed.
  subnet_ids = <list(string)>

  # The id of the VPC where this server should be deployed.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of IDs of AWS Security Groups that should be attached to the tailscale
  # relay server.
  additional_security_groups = []

  # The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and
  # disk space usage) should send notifications.
  alarms_sns_topic_arn = []

  # Cloud init scripts to run on the Tailscale subnet router while it boots. See
  # the part blocks in
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

  # The default OS user for the Tailscale subnet router AMI. For AWS Ubuntu
  # AMIs, which is what the Packer template in
  # tailscale-subnet-router-ubuntu.json uses, the default OS user is 'ubuntu'.
  default_user = "ubuntu"

  # If true, the launched EC2 instance will be EBS-optimized. Note that for most
  # instance types, EBS optimization does not incur additional cost, and that
  # many newer EC2 instance types have EBS optimization enabled by default.
  # However, if you are running previous generation instances, there may be an
  # additional cost per hour to run your instances with EBS optimization
  # enabled. Please see:
  # https://aws.amazon.com/ec2/pricing/on-demand/#EBS-Optimized_Instances
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
  # https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent
  # to get memory and disk metrics in CloudWatch for your Tailscale subnet
  # router.
  enable_cloudwatch_metrics = true

  # Enable fail2ban to block brute force log in attempts. Defaults to true.
  enable_fail2ban = true

  # Set this variable to true to enable the Instance Metadata Service (IMDS)
  # endpoint, which is used to fetch information such as user-data scripts,
  # instance IP address and region, etc. Set this variable to false if you do
  # not want the IMDS endpoint enabled for instances launched into the Auto
  # Scaling Group.
  enable_imds = true

  # Enable ip-lockdown to block access to the instance metadata. Defaults to
  # true.
  enable_ip_lockdown = true

  # Set to true to add IAM permissions for ssh-grunt
  # (https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ssh-grunt),
  # which will allow you to manage SSH access via IAM groups.
  enable_ssh_grunt = true

  # Whether to configure DNS to Tailscale on the EC2 instance. By default we
  # disable the tailnet DNS as it is generally best to let Amazon handle the DNS
  # configuration on EC2 instances. This is most useful when the subnet router
  # needs to communicate with other services on your tailnet.
  enable_tailscale_dns = false

  # If you are using ssh-grunt and your IAM users / groups are defined in a
  # separate AWS account, you can use this variable to specify the ARN of an IAM
  # role that ssh-grunt can assume to retrieve IAM group and public SSH key info
  # from that account. To omit this variable, set it to an empty string (do NOT
  # use null, or Terraform will complain).
  external_account_ssh_grunt_role_arn = ""

  # The period, in seconds, over which to measure the CPU utilization percentage
  # for the ASG.
  high_asg_cpu_utilization_period = 60

  # Trigger an alarm if the ASG has an average cluster CPU utilization
  # percentage above this threshold.
  high_asg_cpu_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_asg_cpu_utilization_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the root disk utilization
  # percentage for the ASG.
  high_asg_disk_utilization_period = 60

  # Trigger an alarm if the ASG has an average cluster root disk utilization
  # percentage above this threshold.
  high_asg_disk_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_asg_disk_utilization_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the Memory utilization
  # percentage for the ASG.
  high_asg_memory_utilization_period = 60

  # Trigger an alarm if the ASG has an average cluster Memory utilization
  # percentage above this threshold.
  high_asg_memory_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_asg_memory_utilization_treat_missing_data = "missing"

  # The type of EC2 instance to run (e.g. t2.micro)
  instance_type = "t3.nano"

  # The number of seconds until a newly launched instance is configured and
  # ready to use.
  instance_warmup = null

  # The name of a Key Pair that can be used to SSH to this instance. Leave blank
  # if you don't want to enable Key Pair auth.
  keypair_name = null

  # List of CIDR blocks to expose as routes on the tailnet through this server.
  # If null, defaults to the entire VPC CIDR block.
  routes = null

  # When true, precreate the CloudWatch Log Group to use for log aggregation
  # from the EC2 instances. This is useful if you wish to customize the
  # CloudWatch Log Group with various settings such as retention periods and KMS
  # encryption. When false, the CloudWatch agent will automatically create a
  # basic log group to use.
  should_create_cloudwatch_log_group = true

  # If you are using ssh-grunt, this is the name of the IAM group from which
  # users will be allowed to SSH to this Tailscale subnet router. This value is
  # only used if enable_ssh_grunt=true.
  ssh_grunt_iam_group = "ssh-grunt-users"

  # If you are using ssh-grunt, this is the name of the IAM group from which
  # users will be allowed to SSH to this Tailscale subnet router with sudo
  # permissions. This value is only used if enable_ssh_grunt=true.
  ssh_grunt_iam_group_sudo = "ssh-grunt-sudo-users"

  # Advertised hostname of the server on the tailnet. If null, defaults to the
  # var.name input value.
  tailnet_hostname = null

  # Advertise tags for Tailscale subnet router. These are used on the 'up'
  # command to control ACLs in Tailscale.
  tailscale_advertise_tags = []

  # Set this variable to true to enable the use of Instance Metadata Service
  # Version 1 in this module's aws_launch_template. Note that while IMDsv2 is
  # preferred due to its special security hardening, we allow this in order to
  # support the use case of AMIs built outside of these modules that depend on
  # IMDSv1.
  use_imdsv1 = false

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S TAILSCALE-SUBNET-ROUTER MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/tailscale-subnet-router?ref=v0.104.14"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AMI to run on the Tailscale subnet router. This should be built from the
  # Packer template under tailscale-subnet-router-ubuntu.json. One of var.ami or
  # var.ami_filters is required. Set to null if looking up the ami with filters.
  ami = <string>

  # Properties on the AMI that can be used to lookup a prebuilt AMI for use with
  # the Tailscale subnet router. You can build the AMI using the Packer template
  # tailscale-subnet-router-ubuntu.json. Only used if var.ami is null. One of
  # var.ami or var.ami_filters is required. Set to null if passing the ami ID
  # directly.
  ami_filters = <object(
    owners = list(string)
    filters = list(object(
      name   = string
      values = list(string)
    ))
  )>

  # The ARN of a Secrets Manager entry containing the Tailscale auth key to use
  # for authenticating the server.
  auth_key_secrets_manager_arn = <string>

  # The name of the server. This will be used to namespace all resources created
  # by this module.
  name = <string>

  # The ids of the subnets where this server should be deployed.
  subnet_ids = <list(string)>

  # The id of the VPC where this server should be deployed.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of IDs of AWS Security Groups that should be attached to the tailscale
  # relay server.
  additional_security_groups = []

  # The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and
  # disk space usage) should send notifications.
  alarms_sns_topic_arn = []

  # Cloud init scripts to run on the Tailscale subnet router while it boots. See
  # the part blocks in
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

  # The default OS user for the Tailscale subnet router AMI. For AWS Ubuntu
  # AMIs, which is what the Packer template in
  # tailscale-subnet-router-ubuntu.json uses, the default OS user is 'ubuntu'.
  default_user = "ubuntu"

  # If true, the launched EC2 instance will be EBS-optimized. Note that for most
  # instance types, EBS optimization does not incur additional cost, and that
  # many newer EC2 instance types have EBS optimization enabled by default.
  # However, if you are running previous generation instances, there may be an
  # additional cost per hour to run your instances with EBS optimization
  # enabled. Please see:
  # https://aws.amazon.com/ec2/pricing/on-demand/#EBS-Optimized_Instances
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
  # https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent
  # to get memory and disk metrics in CloudWatch for your Tailscale subnet
  # router.
  enable_cloudwatch_metrics = true

  # Enable fail2ban to block brute force log in attempts. Defaults to true.
  enable_fail2ban = true

  # Set this variable to true to enable the Instance Metadata Service (IMDS)
  # endpoint, which is used to fetch information such as user-data scripts,
  # instance IP address and region, etc. Set this variable to false if you do
  # not want the IMDS endpoint enabled for instances launched into the Auto
  # Scaling Group.
  enable_imds = true

  # Enable ip-lockdown to block access to the instance metadata. Defaults to
  # true.
  enable_ip_lockdown = true

  # Set to true to add IAM permissions for ssh-grunt
  # (https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ssh-grunt),
  # which will allow you to manage SSH access via IAM groups.
  enable_ssh_grunt = true

  # Whether to configure DNS to Tailscale on the EC2 instance. By default we
  # disable the tailnet DNS as it is generally best to let Amazon handle the DNS
  # configuration on EC2 instances. This is most useful when the subnet router
  # needs to communicate with other services on your tailnet.
  enable_tailscale_dns = false

  # If you are using ssh-grunt and your IAM users / groups are defined in a
  # separate AWS account, you can use this variable to specify the ARN of an IAM
  # role that ssh-grunt can assume to retrieve IAM group and public SSH key info
  # from that account. To omit this variable, set it to an empty string (do NOT
  # use null, or Terraform will complain).
  external_account_ssh_grunt_role_arn = ""

  # The period, in seconds, over which to measure the CPU utilization percentage
  # for the ASG.
  high_asg_cpu_utilization_period = 60

  # Trigger an alarm if the ASG has an average cluster CPU utilization
  # percentage above this threshold.
  high_asg_cpu_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_asg_cpu_utilization_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the root disk utilization
  # percentage for the ASG.
  high_asg_disk_utilization_period = 60

  # Trigger an alarm if the ASG has an average cluster root disk utilization
  # percentage above this threshold.
  high_asg_disk_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_asg_disk_utilization_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the Memory utilization
  # percentage for the ASG.
  high_asg_memory_utilization_period = 60

  # Trigger an alarm if the ASG has an average cluster Memory utilization
  # percentage above this threshold.
  high_asg_memory_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_asg_memory_utilization_treat_missing_data = "missing"

  # The type of EC2 instance to run (e.g. t2.micro)
  instance_type = "t3.nano"

  # The number of seconds until a newly launched instance is configured and
  # ready to use.
  instance_warmup = null

  # The name of a Key Pair that can be used to SSH to this instance. Leave blank
  # if you don't want to enable Key Pair auth.
  keypair_name = null

  # List of CIDR blocks to expose as routes on the tailnet through this server.
  # If null, defaults to the entire VPC CIDR block.
  routes = null

  # When true, precreate the CloudWatch Log Group to use for log aggregation
  # from the EC2 instances. This is useful if you wish to customize the
  # CloudWatch Log Group with various settings such as retention periods and KMS
  # encryption. When false, the CloudWatch agent will automatically create a
  # basic log group to use.
  should_create_cloudwatch_log_group = true

  # If you are using ssh-grunt, this is the name of the IAM group from which
  # users will be allowed to SSH to this Tailscale subnet router. This value is
  # only used if enable_ssh_grunt=true.
  ssh_grunt_iam_group = "ssh-grunt-users"

  # If you are using ssh-grunt, this is the name of the IAM group from which
  # users will be allowed to SSH to this Tailscale subnet router with sudo
  # permissions. This value is only used if enable_ssh_grunt=true.
  ssh_grunt_iam_group_sudo = "ssh-grunt-sudo-users"

  # Advertised hostname of the server on the tailnet. If null, defaults to the
  # var.name input value.
  tailnet_hostname = null

  # Advertise tags for Tailscale subnet router. These are used on the 'up'
  # command to control ACLs in Tailscale.
  tailscale_advertise_tags = []

  # Set this variable to true to enable the use of Instance Metadata Service
  # Version 1 in this module's aws_launch_template. Note that while IMDsv2 is
  # preferred due to its special security hardening, we allow this in order to
  # support the use case of AMIs built outside of these modules that depend on
  # IMDSv1.
  use_imdsv1 = false

}


```

</TabItem>
</Tabs>



## Reference


<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="ami" requirement="required" type="string">
<HclListItemDescription>

The AMI to run on the Tailscale subnet router. This should be built from the Packer template under tailscale-subnet-router-ubuntu.json. One of <a href="#ami"><code>ami</code></a> or <a href="#ami_filters"><code>ami_filters</code></a> is required. Set to null if looking up the ami with filters.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ami_filters" requirement="required" type="object(…)">
<HclListItemDescription>

Properties on the AMI that can be used to lookup a prebuilt AMI for use with the Tailscale subnet router. You can build the AMI using the Packer template tailscale-subnet-router-ubuntu.json. Only used if <a href="#ami"><code>ami</code></a> is null. One of <a href="#ami"><code>ami</code></a> or <a href="#ami_filters"><code>ami_filters</code></a> is required. Set to null if passing the ami ID directly.

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

<HclListItem name="auth_key_secrets_manager_arn" requirement="required" type="string">
<HclListItemDescription>

The ARN of a Secrets Manager entry containing the Tailscale auth key to use for authenticating the server.

</HclListItemDescription>
</HclListItem>

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name of the server. This will be used to namespace all resources created by this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

The ids of the subnets where this server should be deployed.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The id of the VPC where this server should be deployed.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="additional_security_groups" requirement="optional" type="list(string)">
<HclListItemDescription>

List of IDs of AWS Security Groups that should be attached to the tailscale relay server.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="alarms_sns_topic_arn" requirement="optional" type="list(string)">
<HclListItemDescription>

The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cloud_init_parts" requirement="optional" type="map(object(…))">
<HclListItemDescription>

Cloud init scripts to run on the Tailscale subnet router while it boots. See the part blocks in https://www.terraform.io/docs/providers/template/d/cloudinit_config.html for syntax.

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

<HclListItem name="default_user" requirement="optional" type="string">
<HclListItemDescription>

The default OS user for the Tailscale subnet router AMI. For AWS Ubuntu AMIs, which is what the Packer template in tailscale-subnet-router-ubuntu.json uses, the default OS user is 'ubuntu'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ubuntu&quot;"/>
</HclListItem>

<HclListItem name="ebs_optimized" requirement="optional" type="bool">
<HclListItemDescription>

If true, the launched EC2 instance will be EBS-optimized. Note that for most instance types, EBS optimization does not incur additional cost, and that many newer EC2 instance types have EBS optimization enabled by default. However, if you are running previous generation instances, there may be an additional cost per hour to run your instances with EBS optimization enabled. Please see: https://aws.amazon.com/ec2/pricing/on-demand/#EBS-Optimized_Instances

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

Set to true to add IAM permissions to send custom metrics to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent to get memory and disk metrics in CloudWatch for your Tailscale subnet router.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_fail2ban" requirement="optional" type="bool">
<HclListItemDescription>

Enable fail2ban to block brute force log in attempts. Defaults to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_imds" requirement="optional" type="bool">
<HclListItemDescription>

Set this variable to true to enable the Instance Metadata Service (IMDS) endpoint, which is used to fetch information such as user-data scripts, instance IP address and region, etc. Set this variable to false if you do not want the IMDS endpoint enabled for instances launched into the Auto Scaling Group.

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

<HclListItem name="enable_tailscale_dns" requirement="optional" type="bool">
<HclListItemDescription>

Whether to configure DNS to Tailscale on the EC2 instance. By default we disable the tailnet DNS as it is generally best to let Amazon handle the DNS configuration on EC2 instances. This is most useful when the subnet router needs to communicate with other services on your tailnet.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="external_account_ssh_grunt_role_arn" requirement="optional" type="string">
<HclListItemDescription>

If you are using ssh-grunt and your IAM users / groups are defined in a separate AWS account, you can use this variable to specify the ARN of an IAM role that ssh-grunt can assume to retrieve IAM group and public SSH key info from that account. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="high_asg_cpu_utilization_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the CPU utilization percentage for the ASG.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="high_asg_cpu_utilization_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the ASG has an average cluster CPU utilization percentage above this threshold.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="90"/>
</HclListItem>

<HclListItem name="high_asg_cpu_utilization_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="high_asg_disk_utilization_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the root disk utilization percentage for the ASG.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="high_asg_disk_utilization_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the ASG has an average cluster root disk utilization percentage above this threshold.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="90"/>
</HclListItem>

<HclListItem name="high_asg_disk_utilization_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="high_asg_memory_utilization_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the Memory utilization percentage for the ASG.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="high_asg_memory_utilization_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the ASG has an average cluster Memory utilization percentage above this threshold.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="90"/>
</HclListItem>

<HclListItem name="high_asg_memory_utilization_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="instance_type" requirement="optional" type="string">
<HclListItemDescription>

The type of EC2 instance to run (e.g. t2.micro)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;t3.nano&quot;"/>
</HclListItem>

<HclListItem name="instance_warmup" requirement="optional" type="number">
<HclListItemDescription>

The number of seconds until a newly launched instance is configured and ready to use.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="keypair_name" requirement="optional" type="string">
<HclListItemDescription>

The name of a Key Pair that can be used to SSH to this instance. Leave blank if you don't want to enable Key Pair auth.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="routes" requirement="optional" type="list(string)">
<HclListItemDescription>

List of CIDR blocks to expose as routes on the tailnet through this server. If null, defaults to the entire VPC CIDR block.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="should_create_cloudwatch_log_group" requirement="optional" type="bool">
<HclListItemDescription>

When true, precreate the CloudWatch Log Group to use for log aggregation from the EC2 instances. This is useful if you wish to customize the CloudWatch Log Group with various settings such as retention periods and KMS encryption. When false, the CloudWatch agent will automatically create a basic log group to use.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="ssh_grunt_iam_group" requirement="optional" type="string">
<HclListItemDescription>

If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this Tailscale subnet router. This value is only used if enable_ssh_grunt=true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ssh-grunt-users&quot;"/>
</HclListItem>

<HclListItem name="ssh_grunt_iam_group_sudo" requirement="optional" type="string">
<HclListItemDescription>

If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this Tailscale subnet router with sudo permissions. This value is only used if enable_ssh_grunt=true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ssh-grunt-sudo-users&quot;"/>
</HclListItem>

<HclListItem name="tailnet_hostname" requirement="optional" type="string">
<HclListItemDescription>

Advertised hostname of the server on the tailnet. If null, defaults to the <a href="#name"><code>name</code></a> input value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="tailscale_advertise_tags" requirement="optional" type="list(string)">
<HclListItemDescription>

Advertise tags for Tailscale subnet router. These are used on the 'up' command to control ACLs in Tailscale.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="use_imdsv1" requirement="optional" type="bool">
<HclListItemDescription>

Set this variable to true to enable the use of Instance Metadata Service Version 1 in this module's aws_launch_template. Note that while IMDsv2 is preferred due to its special security hardening, we allow this in order to support the use case of AMIs built outside of these modules that depend on IMDSv1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="autoscaling_group_arn">
<HclListItemDescription>

The ARN of the ASG managing the Tailscale relay server.

</HclListItemDescription>
</HclListItem>

<HclListItem name="autoscaling_group_name">
<HclListItemDescription>

The name of the ASG managing the Tailscale relay server.

</HclListItemDescription>
</HclListItem>

<HclListItem name="iam_role_arn">
<HclListItemDescription>

ARN of the IAM role attached to the Tailscale relay server.

</HclListItemDescription>
</HclListItem>

<HclListItem name="iam_role_id">
<HclListItemDescription>

ID of the IAM role attached to the Tailscale relay server.

</HclListItemDescription>
</HclListItem>

<HclListItem name="security_group_id">
<HclListItemDescription>

ID of the primary security group attached to the Tailscale relay server.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/mgmt/tailscale-subnet-router/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/mgmt/tailscale-subnet-router/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/mgmt/tailscale-subnet-router/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "18e100c1f7e0c2b69f6002ed37a61e9f"
}
##DOCS-SOURCER-END -->
