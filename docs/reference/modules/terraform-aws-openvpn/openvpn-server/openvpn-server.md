---
title: "OpenVPN Server Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Open VPN Package Infrastructure Package" version="0.28.0" lastModifiedVersion="0.28.0"/>

# OpenVPN Server Module

<a href="https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.28.0/modules/openvpn-server" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-openvpn/releases/tag/v0.28.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module makes it easy to deploy an OpenVPN server in an auto-scaling group (size 1) for fault tolerance --along with the all the resources it typically needs:

1.  The Auto-Scaling Group.
2.  An EC2 Instance
3.  An Elastic IP (EIP) address.
4.  IAM Role and IAM instance profile.
5.  Simple Queuing Services (SQS) Queues
6.  An S3 Bucket for certificate backups
7.  Security groups.

## How do I access the server?

This module include several [Terraform outputs](https://www.terraform.io/intro/getting-started/outputs.html),
including:

1.  `public_ip`: The public IP address of the server (via its EIP)

## How do I add custom security group rules?

One of the other important outputs of this module is the `security_group_id`, which is the id of the server's Security
Group. You can add custom rules to this Security Group using the `aws_security_group_rule` resource:

```hcl
module "openvpn" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-openvpn.git//modules/openvpn-server?ref=v0.0.40"

  # (... options omitted...)
}

# Custom rule to allow inbound HTTPS traffic from anywhere
resource "aws_security_group_rule" "allow_inbound_https_all" {
  type = "ingress"
  from_port = 443
  to_port = 443
  protocol = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
  security_group_id = "${module.openvpn.security_group_id}"
}
```

## How do I add a custom IAM policy?

This module creates an IAM role for your EC2 instance and exports the id of that role as the output `iam_role_id`. You
can attach custom policies to this IAM role using the `aws_iam_policy_attachment` resource:

```hcl
module "openvpn" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-openvpn.git//modules/openvpn-server?ref=v0.0.40"

  # (... options omitted...)
}

resource "aws_iam_policy" "my_custom_policy" {
  name = "my-custom-policy"
  policy = " (... omitted ...) "
}

resource "aws_iam_policy_attachment" "attachment" {
  name = "example-attachment"
  roles = ["${module.openvpn.iam_role_id}"]
  policy_arn = "${aws_iam_policy.my_custom_policy.arn}"
}
```

## What if I want to enable MFA?

The scripts [init-openvpn](https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.28.0/modules/init-openvpn) and [install-openvpn](https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.28.0/modules/install-openvpn) support setting up the
[duo_openvpn](https://github.com/duosecurity/duo_openvpn) plugin for 2FA authentication. To enable the duo plugin, you
need to:

1.  Build an AMI that has the `duo_openvpn` plugin installed. You can use `install-openvpn` to install the plugin
    alongside openvpn by passing in the argument `--duo-version`. For example:

    sudo /usr/local/bin/install-openvpn --duo-version 2.2

2.  In the `user_data` script for the server, pass in the duo keys to `init-openvpn` using the arguments `--duo-ikey`,
    `--duo-skey`, and `--duo-host` to configure the integration key, secret key, and API hostname respectively. You can
    obtain these by following [the Duo setup instructions for OpenVPN](https://duo.com/docs/openvpn).

See the [packer-duo](https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.28.0/modules/examples/packer-duo) and [openvpn-host-duo](https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.28.0/modules/examples/openvpn-host-duo) examples for an
example configuration to deploy the OpenVPN server with Duo enabled.

Once the plugin is setup, all authentication for the client will result in a password prompt. To authenticate, you pass
in the MFA token in the password prompt, or `push` if you have push authentication enabled in duo. Note that in order
for 2FA to work, the certificate username (the value for `--username` when running `openvpn-admin request`) should
exactly match the duo username.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S OPENVPN-SERVER MODULE
# ------------------------------------------------------------------------------------------------------

module "openvpn_server" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-openvpn.git//modules/openvpn-server?ref=v0.28.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the AMI to run for this server.
  ami = <string>

  # The AWS account ID where the OpenVPN Server will be created. Note that all
  # IAM Users who receive OpenVPN access must also reside in this AWS account.
  aws_account_id = <string>

  # The AWS region in which the resources will be created.
  aws_region = <string>

  # The name of the s3 bucket that will be used to backup PKI secrets
  backup_bucket_name = <string>

  # The type of EC2 instance to run (e.g. t2.micro)
  instance_type = <string>

  # The name of a Key Pair that can be used to SSH to this instance. Leave blank
  # if you don't want to enable Key Pair auth.
  keypair_name = <string>

  # The Amazon Resource Name (ARN) of the KMS Key that will be used to
  # encrypt/decrypt backup files.
  kms_key_arn = <string>

  # The name of the sqs queue that will be used to receive certification list
  # requests. Note that the queue name will be automatically prefixed with
  # 'openvpn-lists-'.
  list_queue_name = <string>

  # The name of the server. This will be used to namespace all resources created
  # by this module.
  name = <string>

  # The name of the sqs queue that will be used to receive new certificate
  # requests. Note that the queue name will be automatically prefixed with
  # 'openvpn-requests-'.
  request_queue_name = <string>

  # The name of the sqs queue that will be used to receive certification
  # revocation requests. Note that the queue name will be automatically prefixed
  # with 'openvpn-revocations-'.
  revocation_queue_name = <string>

  # The ids of the subnets where this server should be deployed.
  subnet_ids = <list(string)>

  # The id of the VPC where this server should be deployed.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A boolean that specifies if this server will allow SSH connections from the
  # list of CIDR blocks specified in var.allow_ssh_from_cidr_list.
  allow_ssh_from_cidr = false

  # A list of IP address ranges in CIDR format from which SSH access will be
  # permitted. Attempts to access the VPN server from all other IP addresses
  # will be blocked. This is only used if var.allow_ssh_from_cidr is true.
  allow_ssh_from_cidr_list = []

  # A boolean that specifies if this server will allow SSH connections from the
  # security group specified in var.allow_ssh_from_security_group_id.
  allow_ssh_from_security_group = false

  # The ID of a security group from which SSH connections will be allowed. Only
  # used if var.allow_ssh_from_security_group is true.
  allow_ssh_from_security_group_id = null

  # A list of IP address ranges in CIDR format from which VPN access will be
  # permitted. Attempts to access the VPN server from all other IP addresses
  # will be blocked.
  allow_vpn_from_cidr_list = ["0.0.0.0/0"]

  # When a terraform destroy is run, should the backup s3 bucket be destroyed
  # even if it contains files. Should only be set to true for
  # testing/development
  backup_bucket_force_destroy = false

  # Number of days that non current versions of file should be kept. Only used
  # if var.enable_backup_bucket_noncurrent_version_expiration is true
  backup_bucket_noncurrent_version_expiration_days = 30

  # When set, stream S3 server access logs to the bucket denoted by this name.
  # When null, but var.enable_backup_bucket_server_access_logging is set to
  # true, create a new access log bucket for the backup bucket. Only used when
  # var.enable_backup_bucket_server_access_logging is true.
  backup_bucket_server_access_logging_bucket_name = null

  # When set, stream S3 server access logs to the prefix in an S3 bucket denoted
  # by this name. when defined
  # var.backup_bucket_server_access_logging_bucket_name is used to determine
  # which bucket is used. Only applicable when
  # var.enable_backup_bucket_server_access_logging is true.
  backup_bucket_server_access_logging_prefix = null

  # The name of the root device to mount.
  block_device_name = "/dev/sda1"

  # When true, create default IAM Groups that you can use to manage permissions
  # for accessing the SQS queue for requesting and revoking OpenVPN
  # certificates.
  create_iam_groups = true

  # If true, the launched EC2 instance will be EBS-optimized. Note that for most
  # instance types, EBS optimization does not incur additional cost, and that
  # many newer EC2 instance types have EBS optimization enabled by default.
  # However, if you are running previous generation instances, there may be an
  # additional cost per hour to run your instances with EBS optimization
  # enabled. Please see:
  # https://aws.amazon.com/ec2/pricing/on-demand/#EBS-Optimized_Instances
  ebs_optimized = true

  # Should lifecycle policy to expire noncurrent versions be enabled.
  enable_backup_bucket_noncurrent_version_expiration = false

  # When true, enable S3 server access logging on the backup bucket. The bucket
  # where the access logs are streamed to is determined by the
  # var.backup_bucket_server_access_logging_bucket_name input variable.
  enable_backup_bucket_server_access_logging = false

  # When set to true AWS will create an eip for the OpenVPN server and output it
  # so it can be attached during boot with the user data script when set to
  # false no eip will be created
  enable_eip = true

  # Set this variable to true to enable the Instance Metadata Service (IMDS)
  # endpoint, which is used to fetch information such as user-data scripts,
  # instance IP address and region, etc. Set this variable to false if you do
  # not want the IMDS endpoint enabled for instances launched into the Auto
  # Scaling Group.
  enable_imds = true

  # The ARNs of external AWS accounts where your IAM users are defined. If not
  # empty, this module will create IAM roles that users in those accounts will
  # be able to assume to get access to the request/revocation/list SQS queues.
  external_account_arns = []

  # The length of time, in seconds, for which Amazon SQS can reuse a data key to
  # encrypt or decrypt messages before calling AWS KMS again. An integer
  # representing seconds, between 60 seconds (1 minute) and 86,400 seconds (24
  # hours)
  kms_data_key_reuse_period_seconds = 300

  # The ID of an AWS-managed customer master key (such as 'alias/aws/sqs') for
  # Amazon SQS or a custom CMK
  kms_master_key_id = null

  # The required duration in minutes. This value must be a multiple of 60.
  market_block_duration_minutes = null

  # The behavior when a Spot Instance is interrupted. Can be hibernate, stop, or
  # terminate. (Default: terminate).
  market_instance_interruption_behavior = "terminate"

  # The Spot Instance request type. Can be one-time, or persistent.
  market_spot_instance_type = null

  # The end date of the request.
  market_valid_until = null

  # Set to true to request spot instances. Set cluster_instance_spot_price
  # variable to set a maximum spot price limit.
  request_spot_instances = false

  # If set to true, the root volume will be deleted when the Instance is
  # terminated.
  root_volume_delete_on_termination = true

  # Set to true to encrypt the root block device.
  root_volume_encrypted = false

  # The amount of provisioned IOPS. This is only valid for volume_type of io1,
  # and must be specified if using that type.
  root_volume_iops = 0

  # The ARN or alias of the KMS key to use for EBS root volume encryption. Only
  # used when root_volume_encrypted is true. If null and root_volume_encrypted
  # is true, the default EBS encryption key for the account will be used.
  root_volume_kms_key_id = null

  # The size of the root volume, in gigabytes.
  root_volume_size = 8

  # The root volume type. Must be one of: standard, gp2, io1.
  root_volume_type = "gp2"

  # This parameter controls the maximum price to use for reserving spot
  # instances. This can save you a lot of money on the VPN server, but it also
  # risks that the server will be down if your requested spot instance price
  # cannot be met.
  spot_price = null

  # Tags to apply to every resource created by this module.
  tags = {}

  # The tenancy of this server. Must be one of: default, dedicated, or host.
  tenancy = "default"

  # Set this variable to true to enable the use of Instance Metadata Service
  # Version 1 in this module's aws_launch_template. Note that while IMDsv2 is
  # preferred due to its special security hardening, we allow this in order to
  # support the use case of AMIs built outside of these modules that depend on
  # IMDSv1.
  use_imdsv1 = true

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

  # The User Data script to run on this instance when it is booting. If you need
  # to pass gzipped, base64-encoded data (e.g., for a cloud-init script), use
  # var.user_data_base64 instead. Either user_data or user_data_base64 are
  # required.
  user_data = null

  # The base64-encoded User Data script to run on the server when it is booting.
  # This can be used to pass binary User Data, such as a gzipped cloud-init
  # script. If you wish to pass in plain text (e.g., typical Bash script) for
  # User Data, use var.user_data instead. Either user_data or user_data_base64
  # are required.
  user_data_base64 = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S OPENVPN-SERVER MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-openvpn.git//modules/openvpn-server?ref=v0.28.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the AMI to run for this server.
  ami = <string>

  # The AWS account ID where the OpenVPN Server will be created. Note that all
  # IAM Users who receive OpenVPN access must also reside in this AWS account.
  aws_account_id = <string>

  # The AWS region in which the resources will be created.
  aws_region = <string>

  # The name of the s3 bucket that will be used to backup PKI secrets
  backup_bucket_name = <string>

  # The type of EC2 instance to run (e.g. t2.micro)
  instance_type = <string>

  # The name of a Key Pair that can be used to SSH to this instance. Leave blank
  # if you don't want to enable Key Pair auth.
  keypair_name = <string>

  # The Amazon Resource Name (ARN) of the KMS Key that will be used to
  # encrypt/decrypt backup files.
  kms_key_arn = <string>

  # The name of the sqs queue that will be used to receive certification list
  # requests. Note that the queue name will be automatically prefixed with
  # 'openvpn-lists-'.
  list_queue_name = <string>

  # The name of the server. This will be used to namespace all resources created
  # by this module.
  name = <string>

  # The name of the sqs queue that will be used to receive new certificate
  # requests. Note that the queue name will be automatically prefixed with
  # 'openvpn-requests-'.
  request_queue_name = <string>

  # The name of the sqs queue that will be used to receive certification
  # revocation requests. Note that the queue name will be automatically prefixed
  # with 'openvpn-revocations-'.
  revocation_queue_name = <string>

  # The ids of the subnets where this server should be deployed.
  subnet_ids = <list(string)>

  # The id of the VPC where this server should be deployed.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A boolean that specifies if this server will allow SSH connections from the
  # list of CIDR blocks specified in var.allow_ssh_from_cidr_list.
  allow_ssh_from_cidr = false

  # A list of IP address ranges in CIDR format from which SSH access will be
  # permitted. Attempts to access the VPN server from all other IP addresses
  # will be blocked. This is only used if var.allow_ssh_from_cidr is true.
  allow_ssh_from_cidr_list = []

  # A boolean that specifies if this server will allow SSH connections from the
  # security group specified in var.allow_ssh_from_security_group_id.
  allow_ssh_from_security_group = false

  # The ID of a security group from which SSH connections will be allowed. Only
  # used if var.allow_ssh_from_security_group is true.
  allow_ssh_from_security_group_id = null

  # A list of IP address ranges in CIDR format from which VPN access will be
  # permitted. Attempts to access the VPN server from all other IP addresses
  # will be blocked.
  allow_vpn_from_cidr_list = ["0.0.0.0/0"]

  # When a terraform destroy is run, should the backup s3 bucket be destroyed
  # even if it contains files. Should only be set to true for
  # testing/development
  backup_bucket_force_destroy = false

  # Number of days that non current versions of file should be kept. Only used
  # if var.enable_backup_bucket_noncurrent_version_expiration is true
  backup_bucket_noncurrent_version_expiration_days = 30

  # When set, stream S3 server access logs to the bucket denoted by this name.
  # When null, but var.enable_backup_bucket_server_access_logging is set to
  # true, create a new access log bucket for the backup bucket. Only used when
  # var.enable_backup_bucket_server_access_logging is true.
  backup_bucket_server_access_logging_bucket_name = null

  # When set, stream S3 server access logs to the prefix in an S3 bucket denoted
  # by this name. when defined
  # var.backup_bucket_server_access_logging_bucket_name is used to determine
  # which bucket is used. Only applicable when
  # var.enable_backup_bucket_server_access_logging is true.
  backup_bucket_server_access_logging_prefix = null

  # The name of the root device to mount.
  block_device_name = "/dev/sda1"

  # When true, create default IAM Groups that you can use to manage permissions
  # for accessing the SQS queue for requesting and revoking OpenVPN
  # certificates.
  create_iam_groups = true

  # If true, the launched EC2 instance will be EBS-optimized. Note that for most
  # instance types, EBS optimization does not incur additional cost, and that
  # many newer EC2 instance types have EBS optimization enabled by default.
  # However, if you are running previous generation instances, there may be an
  # additional cost per hour to run your instances with EBS optimization
  # enabled. Please see:
  # https://aws.amazon.com/ec2/pricing/on-demand/#EBS-Optimized_Instances
  ebs_optimized = true

  # Should lifecycle policy to expire noncurrent versions be enabled.
  enable_backup_bucket_noncurrent_version_expiration = false

  # When true, enable S3 server access logging on the backup bucket. The bucket
  # where the access logs are streamed to is determined by the
  # var.backup_bucket_server_access_logging_bucket_name input variable.
  enable_backup_bucket_server_access_logging = false

  # When set to true AWS will create an eip for the OpenVPN server and output it
  # so it can be attached during boot with the user data script when set to
  # false no eip will be created
  enable_eip = true

  # Set this variable to true to enable the Instance Metadata Service (IMDS)
  # endpoint, which is used to fetch information such as user-data scripts,
  # instance IP address and region, etc. Set this variable to false if you do
  # not want the IMDS endpoint enabled for instances launched into the Auto
  # Scaling Group.
  enable_imds = true

  # The ARNs of external AWS accounts where your IAM users are defined. If not
  # empty, this module will create IAM roles that users in those accounts will
  # be able to assume to get access to the request/revocation/list SQS queues.
  external_account_arns = []

  # The length of time, in seconds, for which Amazon SQS can reuse a data key to
  # encrypt or decrypt messages before calling AWS KMS again. An integer
  # representing seconds, between 60 seconds (1 minute) and 86,400 seconds (24
  # hours)
  kms_data_key_reuse_period_seconds = 300

  # The ID of an AWS-managed customer master key (such as 'alias/aws/sqs') for
  # Amazon SQS or a custom CMK
  kms_master_key_id = null

  # The required duration in minutes. This value must be a multiple of 60.
  market_block_duration_minutes = null

  # The behavior when a Spot Instance is interrupted. Can be hibernate, stop, or
  # terminate. (Default: terminate).
  market_instance_interruption_behavior = "terminate"

  # The Spot Instance request type. Can be one-time, or persistent.
  market_spot_instance_type = null

  # The end date of the request.
  market_valid_until = null

  # Set to true to request spot instances. Set cluster_instance_spot_price
  # variable to set a maximum spot price limit.
  request_spot_instances = false

  # If set to true, the root volume will be deleted when the Instance is
  # terminated.
  root_volume_delete_on_termination = true

  # Set to true to encrypt the root block device.
  root_volume_encrypted = false

  # The amount of provisioned IOPS. This is only valid for volume_type of io1,
  # and must be specified if using that type.
  root_volume_iops = 0

  # The ARN or alias of the KMS key to use for EBS root volume encryption. Only
  # used when root_volume_encrypted is true. If null and root_volume_encrypted
  # is true, the default EBS encryption key for the account will be used.
  root_volume_kms_key_id = null

  # The size of the root volume, in gigabytes.
  root_volume_size = 8

  # The root volume type. Must be one of: standard, gp2, io1.
  root_volume_type = "gp2"

  # This parameter controls the maximum price to use for reserving spot
  # instances. This can save you a lot of money on the VPN server, but it also
  # risks that the server will be down if your requested spot instance price
  # cannot be met.
  spot_price = null

  # Tags to apply to every resource created by this module.
  tags = {}

  # The tenancy of this server. Must be one of: default, dedicated, or host.
  tenancy = "default"

  # Set this variable to true to enable the use of Instance Metadata Service
  # Version 1 in this module's aws_launch_template. Note that while IMDsv2 is
  # preferred due to its special security hardening, we allow this in order to
  # support the use case of AMIs built outside of these modules that depend on
  # IMDSv1.
  use_imdsv1 = true

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

  # The User Data script to run on this instance when it is booting. If you need
  # to pass gzipped, base64-encoded data (e.g., for a cloud-init script), use
  # var.user_data_base64 instead. Either user_data or user_data_base64 are
  # required.
  user_data = null

  # The base64-encoded User Data script to run on the server when it is booting.
  # This can be used to pass binary User Data, such as a gzipped cloud-init
  # script. If you wish to pass in plain text (e.g., typical Bash script) for
  # User Data, use var.user_data instead. Either user_data or user_data_base64
  # are required.
  user_data_base64 = null

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

The ID of the AMI to run for this server.

</HclListItemDescription>
</HclListItem>

<HclListItem name="aws_account_id" requirement="required" type="string">
<HclListItemDescription>

The AWS account ID where the OpenVPN Server will be created. Note that all IAM Users who receive OpenVPN access must also reside in this AWS account.

</HclListItemDescription>
</HclListItem>

<HclListItem name="aws_region" requirement="required" type="string">
<HclListItemDescription>

The AWS region in which the resources will be created.

</HclListItemDescription>
</HclListItem>

<HclListItem name="backup_bucket_name" requirement="required" type="string">
<HclListItemDescription>

The name of the s3 bucket that will be used to backup PKI secrets

</HclListItemDescription>
</HclListItem>

<HclListItem name="instance_type" requirement="required" type="string">
<HclListItemDescription>

The type of EC2 instance to run (e.g. t2.micro)

</HclListItemDescription>
</HclListItem>

<HclListItem name="keypair_name" requirement="required" type="string">
<HclListItemDescription>

The name of a Key Pair that can be used to SSH to this instance. Leave blank if you don't want to enable Key Pair auth.

</HclListItemDescription>
</HclListItem>

<HclListItem name="kms_key_arn" requirement="required" type="string">
<HclListItemDescription>

The Amazon Resource Name (ARN) of the KMS Key that will be used to encrypt/decrypt backup files.

</HclListItemDescription>
</HclListItem>

<HclListItem name="list_queue_name" requirement="required" type="string">
<HclListItemDescription>

The name of the sqs queue that will be used to receive certification list requests. Note that the queue name will be automatically prefixed with 'openvpn-lists-'.

</HclListItemDescription>
</HclListItem>

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name of the server. This will be used to namespace all resources created by this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="request_queue_name" requirement="required" type="string">
<HclListItemDescription>

The name of the sqs queue that will be used to receive new certificate requests. Note that the queue name will be automatically prefixed with 'openvpn-requests-'.

</HclListItemDescription>
</HclListItem>

<HclListItem name="revocation_queue_name" requirement="required" type="string">
<HclListItemDescription>

The name of the sqs queue that will be used to receive certification revocation requests. Note that the queue name will be automatically prefixed with 'openvpn-revocations-'.

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

<HclListItem name="allow_ssh_from_cidr" requirement="optional" type="bool">
<HclListItemDescription>

A boolean that specifies if this server will allow SSH connections from the list of CIDR blocks specified in <a href="#allow_ssh_from_cidr_list"><code>allow_ssh_from_cidr_list</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="allow_ssh_from_cidr_list" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IP address ranges in CIDR format from which SSH access will be permitted. Attempts to access the VPN server from all other IP addresses will be blocked. This is only used if <a href="#allow_ssh_from_cidr"><code>allow_ssh_from_cidr</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_ssh_from_security_group" requirement="optional" type="bool">
<HclListItemDescription>

A boolean that specifies if this server will allow SSH connections from the security group specified in <a href="#allow_ssh_from_security_group_id"><code>allow_ssh_from_security_group_id</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="allow_ssh_from_security_group_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of a security group from which SSH connections will be allowed. Only used if <a href="#allow_ssh_from_security_group"><code>allow_ssh_from_security_group</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="allow_vpn_from_cidr_list" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IP address ranges in CIDR format from which VPN access will be permitted. Attempts to access the VPN server from all other IP addresses will be blocked.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[
  &quot;0.0.0.0/0&quot;
]"/>
</HclListItem>

<HclListItem name="backup_bucket_force_destroy" requirement="optional" type="bool">
<HclListItemDescription>

When a terraform destroy is run, should the backup s3 bucket be destroyed even if it contains files. Should only be set to true for testing/development

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="backup_bucket_noncurrent_version_expiration_days" requirement="optional" type="number">
<HclListItemDescription>

Number of days that non current versions of file should be kept. Only used if <a href="#enable_backup_bucket_noncurrent_version_expiration"><code>enable_backup_bucket_noncurrent_version_expiration</code></a> is true

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="backup_bucket_server_access_logging_bucket_name" requirement="optional" type="string">
<HclListItemDescription>

When set, stream S3 server access logs to the bucket denoted by this name. When null, but <a href="#enable_backup_bucket_server_access_logging"><code>enable_backup_bucket_server_access_logging</code></a> is set to true, create a new access log bucket for the backup bucket. Only used when <a href="#enable_backup_bucket_server_access_logging"><code>enable_backup_bucket_server_access_logging</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="backup_bucket_server_access_logging_prefix" requirement="optional" type="string">
<HclListItemDescription>

When set, stream S3 server access logs to the prefix in an S3 bucket denoted by this name. when defined <a href="#backup_bucket_server_access_logging_bucket_name"><code>backup_bucket_server_access_logging_bucket_name</code></a> is used to determine which bucket is used. Only applicable when <a href="#enable_backup_bucket_server_access_logging"><code>enable_backup_bucket_server_access_logging</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="block_device_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the root device to mount.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;/dev/sda1&quot;"/>
</HclListItem>

<HclListItem name="create_iam_groups" requirement="optional" type="bool">
<HclListItemDescription>

When true, create default IAM Groups that you can use to manage permissions for accessing the SQS queue for requesting and revoking OpenVPN certificates.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="ebs_optimized" requirement="optional" type="bool">
<HclListItemDescription>

If true, the launched EC2 instance will be EBS-optimized. Note that for most instance types, EBS optimization does not incur additional cost, and that many newer EC2 instance types have EBS optimization enabled by default. However, if you are running previous generation instances, there may be an additional cost per hour to run your instances with EBS optimization enabled. Please see: https://aws.amazon.com/ec2/pricing/on-demand/#EBS-Optimized_Instances

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_backup_bucket_noncurrent_version_expiration" requirement="optional" type="bool">
<HclListItemDescription>

Should lifecycle policy to expire noncurrent versions be enabled.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_backup_bucket_server_access_logging" requirement="optional" type="bool">
<HclListItemDescription>

When true, enable S3 server access logging on the backup bucket. The bucket where the access logs are streamed to is determined by the <a href="#backup_bucket_server_access_logging_bucket_name"><code>backup_bucket_server_access_logging_bucket_name</code></a> input variable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_eip" requirement="optional" type="bool">
<HclListItemDescription>

When set to true AWS will create an eip for the OpenVPN server and output it so it can be attached during boot with the user data script when set to false no eip will be created

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_imds" requirement="optional" type="bool">
<HclListItemDescription>

Set this variable to true to enable the Instance Metadata Service (IMDS) endpoint, which is used to fetch information such as user-data scripts, instance IP address and region, etc. Set this variable to false if you do not want the IMDS endpoint enabled for instances launched into the Auto Scaling Group.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="external_account_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

The ARNs of external AWS accounts where your IAM users are defined. If not empty, this module will create IAM roles that users in those accounts will be able to assume to get access to the request/revocation/list SQS queues.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="kms_data_key_reuse_period_seconds" requirement="optional" type="number">
<HclListItemDescription>

The length of time, in seconds, for which Amazon SQS can reuse a data key to encrypt or decrypt messages before calling AWS KMS again. An integer representing seconds, between 60 seconds (1 minute) and 86,400 seconds (24 hours)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="kms_master_key_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of an AWS-managed customer master key (such as 'alias/aws/sqs') for Amazon SQS or a custom CMK

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="market_block_duration_minutes" requirement="optional" type="number">
<HclListItemDescription>

The required duration in minutes. This value must be a multiple of 60.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="market_instance_interruption_behavior" requirement="optional" type="string">
<HclListItemDescription>

The behavior when a Spot Instance is interrupted. Can be hibernate, stop, or terminate. (Default: terminate).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;terminate&quot;"/>
</HclListItem>

<HclListItem name="market_spot_instance_type" requirement="optional" type="string">
<HclListItemDescription>

The Spot Instance request type. Can be one-time, or persistent.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="market_valid_until" requirement="optional" type="string">
<HclListItemDescription>

The end date of the request.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="request_spot_instances" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to request spot instances. Set cluster_instance_spot_price variable to set a maximum spot price limit.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="root_volume_delete_on_termination" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, the root volume will be deleted when the Instance is terminated.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="root_volume_encrypted" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to encrypt the root block device.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="root_volume_iops" requirement="optional" type="number">
<HclListItemDescription>

The amount of provisioned IOPS. This is only valid for volume_type of io1, and must be specified if using that type.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="root_volume_kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

The ARN or alias of the KMS key to use for EBS root volume encryption. Only used when root_volume_encrypted is true. If null and root_volume_encrypted is true, the default EBS encryption key for the account will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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
<HclListItemDefaultValue defaultValue="&quot;gp2&quot;"/>
</HclListItem>

<HclListItem name="spot_price" requirement="optional" type="number">
<HclListItemDescription>

This parameter controls the maximum price to use for reserving spot instances. This can save you a lot of money on the VPN server, but it also risks that the server will be down if your requested spot instance price cannot be met.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags to apply to every resource created by this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="tenancy" requirement="optional" type="string">
<HclListItemDescription>

The tenancy of this server. Must be one of: default, dedicated, or host.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;default&quot;"/>
</HclListItem>

<HclListItem name="use_imdsv1" requirement="optional" type="bool">
<HclListItemDescription>

Set this variable to true to enable the use of Instance Metadata Service Version 1 in this module's aws_launch_template. Note that while IMDsv2 is preferred due to its special security hardening, we allow this in order to support the use case of AMIs built outside of these modules that depend on IMDSv1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="use_managed_iam_policies" requirement="optional" type="bool">
<HclListItemDescription>

When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="user_data" requirement="optional" type="string">
<HclListItemDescription>

The User Data script to run on this instance when it is booting. If you need to pass gzipped, base64-encoded data (e.g., for a cloud-init script), use <a href="#user_data_base64"><code>user_data_base64</code></a> instead. Either user_data or user_data_base64 are required.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="user_data_base64" requirement="optional" type="string">
<HclListItemDescription>

The base64-encoded User Data script to run on the server when it is booting. This can be used to pass binary User Data, such as a gzipped cloud-init script. If you wish to pass in plain text (e.g., typical Bash script) for User Data, use <a href="#user_data"><code>user_data</code></a> instead. Either user_data or user_data_base64 are required.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="allow_certificate_lists_for_external_accounts_iam_role_arn">
</HclListItem>

<HclListItem name="allow_certificate_lists_for_external_accounts_iam_role_id">
</HclListItem>

<HclListItem name="allow_certificate_requests_for_external_accounts_iam_role_arn">
</HclListItem>

<HclListItem name="allow_certificate_requests_for_external_accounts_iam_role_id">
</HclListItem>

<HclListItem name="allow_certificate_revocations_for_external_accounts_iam_role_arn">
</HclListItem>

<HclListItem name="allow_certificate_revocations_for_external_accounts_iam_role_id">
</HclListItem>

<HclListItem name="autoscaling_group_id">
</HclListItem>

<HclListItem name="backup_bucket_name">
</HclListItem>

<HclListItem name="client_list_queue">
</HclListItem>

<HclListItem name="client_request_queue">
</HclListItem>

<HclListItem name="client_revocation_queue">
</HclListItem>

<HclListItem name="elastic_ip">
</HclListItem>

<HclListItem name="iam_role_id">
</HclListItem>

<HclListItem name="openvpn_admins_group_name">
</HclListItem>

<HclListItem name="openvpn_users_group_name">
</HclListItem>

<HclListItem name="private_ip">
</HclListItem>

<HclListItem name="public_ip">
</HclListItem>

<HclListItem name="security_group_id">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.28.0/modules/openvpn-server/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.28.0/modules/openvpn-server/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-openvpn/tree/v0.28.0/modules/openvpn-server/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "296500e729577d7813a65f81440fda28"
}
##DOCS-SOURCER-END -->
