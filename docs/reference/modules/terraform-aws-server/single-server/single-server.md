---
title: "Single Server Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Module Server" version="0.16.1" lastModifiedVersion="0.16.1"/>

# Single Server Module

<a href="https://github.com/gruntwork-io/terraform-aws-server/tree/v0.16.1/modules/single-server" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-server/releases/tag/v0.16.1" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module makes it easy to deploy a single server--that is, a single EC2 instance (e.g. a bastion host, Jenkins
server) rather than an Auto Scaling Group or ECS Cluster--along with the all the resources it typically needs:

1.  The EC2 instance itself.
2.  An Elastic IP (EIP) address.
3.  An optional DNS record pointing at the EIP.
4.  IAM Role and IAM instance profile.
5.  Security group.

## How do I see the server?

This module includes several [Terraform outputs](https://www.terraform.io/intro/getting-started/outputs.html),
including:

1.  `public_ip`: The public IP address of the server (via its EIP)
2.  `fqdn`: The fully-qualified domain name of the server (e.g. jenkins.example.com) if you set the `dns_zone_id` and
    `dns_name` variables.

## Can I BYOSG (bring your own security groups)?

In some cases, it's desirable to have the ability to assign your own externally managed security groups. To do this,
set the `additional_security_group_ids` variable with the desired security group id(s). This list of security groups
will be combined with the default security group.

Note: if you set `default_network_interface_id` to override the default network interface, AWS does not allow attaching
any security groups to the EC2 instance, so you will need to attach any and all security groups you need to the network
interface you pass in.

## What if I just want to add custom security group rules to the default security group?

One of the other important outputs of this module is the `security_group_id`, which is the id of the server's default
Security Group. You can add custom rules to this Security Group using the `aws_security_group_rule` resource:

```hcl
module "jenkins" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-server.git//modules/single-server?ref=v0.0.40"

  # (... options omitted...)
}

# Custom rule to allow inbound HTTPS traffic from anywhere
resource "aws_security_group_rule" "allow_inbound_https_all" {
  type = "ingress"
  from_port = 443
  to_port = 443
  protocol = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
  security_group_id = "${module.jenkins.security_group_id}"
}
```

## How do I add a custom IAM policy?

This module creates an IAM role for your EC2 instance and exports the id of that role as the output `iam_role_id`. You
can attach custom policies to this IAM role using the `aws_iam_policy_attachment` resource:

```hcl
module "jenkins" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-server.git//modules/single-server?ref=v0.0.40"

  # (... options omitted...)
}

resource "aws_iam_policy" "my_custom_policy" {
  name = "my-custom-policy"
  policy = " (... omitted ...) "
}

resource "aws_iam_policy_attachment" "attachment" {
  name = "example-attachment"
  roles = ["${module.jenkins.iam_role_id}"]
  policy_arn = "${aws_iam_policy.my_custom_policy.arn}"
}
```

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S SINGLE-SERVER MODULE
# ------------------------------------------------------------------------------------------------------

module "single_server" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-server.git//modules/single-server?ref=v0.16.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the AMI to run for this server.
  ami = <string>

  # The type of EC2 instance to run (e.g. t2.micro)
  instance_type = <string>

  # The name of a Key Pair that can be used to SSH to this instance. Leave blank
  # if you don't want to enable Key Pair auth.
  keypair_name = <string>

  # The name of the server. This will be used to namespace all resources created
  # by this module.
  name = <string>

  # The id of the subnet where this server should be deployed. Required unless
  # default_network_interface_id is set, in which case subnet_id should be set
  # to null.
  subnet_id = <string>

  # The id of the VPC where this server should be deployed.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of optional additional security group ids to assign to the server.
  # Note: this variable is NOT used if default_network_interface_id is set.
  additional_security_group_ids = []

  # A boolean that specifies whether or not to add a security group rule that
  # allows all outbound traffic from this server. Works if
  # custom_egress_rules_cidr_blocks is not specified.
  allow_all_outbound_traffic = true

  # A list of IP address ranges in CIDR format from which rdp access will be
  # permitted. Attempts to access the bastion host from all other IP addresses
  # will be blocked.
  allow_rdp_from_cidr_list = []

  # A list of IPv6 address ranges in CIDR format from which rdp access will be
  # permitted. Attempts to access the bastion host from all other IP addresses
  # will be blocked.
  allow_rdp_from_ipv6_cidr_list = []

  # The IDs of security groups from which rdp connections will be allowed.
  allow_rdp_from_security_group_ids = []

  # A list of IP address ranges in CIDR format from which SSH access will be
  # permitted. Attempts to access the server from all other IP addresses will be
  # blocked.
  allow_ssh_from_cidr_list = []

  # A list of IPv6 address ranges in CIDR format from which SSH access will be
  # permitted. Attempts to access the server from all other IP addresses will be
  # blocked.
  allow_ssh_from_ipv6_cidr_list = []

  # The IDs of security groups from which SSH connections will be allowed.
  allow_ssh_from_security_group_ids = []

  # Whether or not to associate a public IP address to the instance. When null,
  # defaults to the subnet setting (e.g., if public subnet defaults to
  # associating a public IP, associate one - otherwise, does not associate a
  # public IP).
  associate_public_ip_address = null

  # A list of AWS service principals that can assume the instance IAM role. If
  # deploying in AWS China, set this to [ec2.amazonaws.com.cn].
  assume_role_principals = ["ec2.amazonaws.com"]

  # Determines if an Elastic IP (EIP) will be created for this instance. Must be
  # set to a boolean (not a string!) true or false value.
  attach_eip = true

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

  # Whether to create a security group for the instance. If set to false, you
  # will have to provide security group with 'var.additional_security_group_ids.
  create_security_group = true

  # Custom egress rules with the CIDR Blocks destination. If we use this, the
  # security group rule that allows all outbound traffic won't be created.
  custom_egress_rules_cidr_blocks = {}

  # ID of a dedicated host that the instance will be assigned to. Use when an
  # instance is to be launched on a specific dedicated host.
  dedicated_host_id = null

  # The ID of a network interface to use to override the default network
  # interface for this EC2 instance, attached at eth0 (device index 0). If set,
  # subnet_id must be set to null.
  default_network_interface_id = null

  # If true, enables EC2 Instance Termination Protection.
  disable_api_termination = false

  # The DNS name to add for this server in var.dns_zone_id. Only used if
  # var.dns_zone_id is set. For example, if var.dns_zone_id points to the hosted
  # zone for example.com and you set dns_name to foo, this server will have the
  # domain foo.example.com.
  dns_name = ""

  # The TTL, in seconds, of the DNS record for this server.  Only used if
  # var.dns_zone_id is set.
  dns_ttl = 300

  # The DNS record type when adding a DNS record for this server. Only used if
  # var.dns_zone_id is set.
  dns_type = "A"

  # If set to true, point the Route 53 DNS record at the private IP of the EIP
  # rather than the public IP.
  dns_uses_private_ip = false

  # The id of a route53 hosted zone. Leave blank if you don't want a DNS entry
  # for this server. If you specify this variable, you must also specify
  # var.dns_name.
  dns_zone_id = ""

  # If true, the launced EC2 Instance will be EBS-optimized.
  ebs_optimized = false

  # A set of tags to set for the EIP for EC2 Instance. This is optional and if
  # not provided the tags from variable tags will be used
  eip_tags = {}

  # Whether to force detaching any policies the role has before destroying it.
  # If policies are attached to the role via the aws_iam_policy_attachment
  # resource and you are modifying the role name or path, the
  # force_detach_policies argument must be set to true and applied before
  # attempting the operation otherwise you will encounter a DeleteConflict
  # error. The aws_iam_role_policy_attachment resource (recommended) does not
  # have this requirement.
  force_detach_policies = false

  # Whether or not to extract Base-64 encoded encrypted password data for the
  # instance. Useful for getting the administrator password for instances
  # running Microsoft Windows.
  get_password_data = false

  # The name for the bastion host's IAM role and instance profile. If set to an
  # empty string, will use var.name. Required when create_iam_role is false.
  iam_role_name = ""

  # A set of tags to set for instance iam role. This is optional and if not
  # provided the tags from variable tags will be used
  iam_role_tags = {}

  # A set of tags for EC2 Instance. This is optional and if not provided the
  # tags from variable tags will be used
  instance_tags = {}

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
  metadata_http_tokens = "required"

  # Enables or disables access to instance tags from the instance metadata
  # service. Valid values include enabled or disabled. Defaults to disabled.
  metadata_tags = "disabled"

  # If true, the launched EC2 instance will have detailed monitoring enabled.
  monitoring = true

  # Private IP address to associate with the instance in a VPC
  private_ip = null

  # Instruct Terraform to revoke all of the Security Groups attached ingress and
  # egress rules before deleting the rule itself. This is normally not needed,
  # however certain AWS services such as Elastic Map Reduce may automatically
  # add required rules to security groups used with the service, and those rules
  # may contain a cyclic dependency that prevent the security groups from being
  # destroyed without removing the dependency first.
  revoke_security_group_rules_on_delete = false

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role.
  role_permissions_boundary = null

  # If set to true, the root volume will be deleted when the Instance is
  # terminated.
  root_volume_delete_on_termination = true

  # If set to true, the root volume will be encrypted. Default is set to false
  root_volume_encrypted = false

  # The IOPS to allocate for the root volume.
  root_volume_iops = null

  # The size of the root volume, in gigabytes.
  root_volume_size = 8

  # Tags to set on the root volume.
  root_volume_tags = {}

  # The root volume type. Must be one of: standard, gp2, io1.
  root_volume_type = "standard"

  # A list of secondary private IPv4 addresses to assign to the instance's
  # primary network interface (eth0) in a VPC
  secondary_private_ips = null

  # The name for the bastion host's security group. If set to an empty string,
  # will use var.name.
  security_group_name = ""

  # A set of tags to set for the Security Group. This is optional and if not
  # provided the tags from variable tags will be used
  security_group_tags = {}

  # Controls if traffic is routed to the instance when the destination address
  # does not match the instance. Must be set to a boolean (not a string!) true
  # or false value.
  source_dest_check = true

  # A set of tags for the EC2 Instance. These are common tags and will be used
  # for Instance, IAM Role, EIP and Security Group. Note that other AWS
  # resources created by this module such as an Elastic IP Address and Route53
  # Record do not support tags.
  tags = {}

  # The tenancy of this server. Must be one of: default, dedicated, or host.
  tenancy = "default"

  # The User Data script to run on this instance when it is booting. If you need
  # to pass gzipped, base64-encoded data (e.g., for a cloud-init script), use
  # var.user_data_base64 instead.
  user_data = null

  # The base64-encoded User Data script to run on the server when it is booting.
  # This can be used to pass binary User Data, such as a gzipped cloud-init
  # script. If you wish to pass in plain text (e.g., typical Bash script) for
  # User Data, use var.user_data instead.
  user_data_base64 = null

  # When used in combination with user_data or user_data_base64, a user_data
  # change will trigger a destroy and recreate when set to true. Defaults to
  # null.
  user_data_replace_on_change = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S SINGLE-SERVER MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-server.git//modules/single-server?ref=v0.16.1"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the AMI to run for this server.
  ami = <string>

  # The type of EC2 instance to run (e.g. t2.micro)
  instance_type = <string>

  # The name of a Key Pair that can be used to SSH to this instance. Leave blank
  # if you don't want to enable Key Pair auth.
  keypair_name = <string>

  # The name of the server. This will be used to namespace all resources created
  # by this module.
  name = <string>

  # The id of the subnet where this server should be deployed. Required unless
  # default_network_interface_id is set, in which case subnet_id should be set
  # to null.
  subnet_id = <string>

  # The id of the VPC where this server should be deployed.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of optional additional security group ids to assign to the server.
  # Note: this variable is NOT used if default_network_interface_id is set.
  additional_security_group_ids = []

  # A boolean that specifies whether or not to add a security group rule that
  # allows all outbound traffic from this server. Works if
  # custom_egress_rules_cidr_blocks is not specified.
  allow_all_outbound_traffic = true

  # A list of IP address ranges in CIDR format from which rdp access will be
  # permitted. Attempts to access the bastion host from all other IP addresses
  # will be blocked.
  allow_rdp_from_cidr_list = []

  # A list of IPv6 address ranges in CIDR format from which rdp access will be
  # permitted. Attempts to access the bastion host from all other IP addresses
  # will be blocked.
  allow_rdp_from_ipv6_cidr_list = []

  # The IDs of security groups from which rdp connections will be allowed.
  allow_rdp_from_security_group_ids = []

  # A list of IP address ranges in CIDR format from which SSH access will be
  # permitted. Attempts to access the server from all other IP addresses will be
  # blocked.
  allow_ssh_from_cidr_list = []

  # A list of IPv6 address ranges in CIDR format from which SSH access will be
  # permitted. Attempts to access the server from all other IP addresses will be
  # blocked.
  allow_ssh_from_ipv6_cidr_list = []

  # The IDs of security groups from which SSH connections will be allowed.
  allow_ssh_from_security_group_ids = []

  # Whether or not to associate a public IP address to the instance. When null,
  # defaults to the subnet setting (e.g., if public subnet defaults to
  # associating a public IP, associate one - otherwise, does not associate a
  # public IP).
  associate_public_ip_address = null

  # A list of AWS service principals that can assume the instance IAM role. If
  # deploying in AWS China, set this to [ec2.amazonaws.com.cn].
  assume_role_principals = ["ec2.amazonaws.com"]

  # Determines if an Elastic IP (EIP) will be created for this instance. Must be
  # set to a boolean (not a string!) true or false value.
  attach_eip = true

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

  # Whether to create a security group for the instance. If set to false, you
  # will have to provide security group with 'var.additional_security_group_ids.
  create_security_group = true

  # Custom egress rules with the CIDR Blocks destination. If we use this, the
  # security group rule that allows all outbound traffic won't be created.
  custom_egress_rules_cidr_blocks = {}

  # ID of a dedicated host that the instance will be assigned to. Use when an
  # instance is to be launched on a specific dedicated host.
  dedicated_host_id = null

  # The ID of a network interface to use to override the default network
  # interface for this EC2 instance, attached at eth0 (device index 0). If set,
  # subnet_id must be set to null.
  default_network_interface_id = null

  # If true, enables EC2 Instance Termination Protection.
  disable_api_termination = false

  # The DNS name to add for this server in var.dns_zone_id. Only used if
  # var.dns_zone_id is set. For example, if var.dns_zone_id points to the hosted
  # zone for example.com and you set dns_name to foo, this server will have the
  # domain foo.example.com.
  dns_name = ""

  # The TTL, in seconds, of the DNS record for this server.  Only used if
  # var.dns_zone_id is set.
  dns_ttl = 300

  # The DNS record type when adding a DNS record for this server. Only used if
  # var.dns_zone_id is set.
  dns_type = "A"

  # If set to true, point the Route 53 DNS record at the private IP of the EIP
  # rather than the public IP.
  dns_uses_private_ip = false

  # The id of a route53 hosted zone. Leave blank if you don't want a DNS entry
  # for this server. If you specify this variable, you must also specify
  # var.dns_name.
  dns_zone_id = ""

  # If true, the launced EC2 Instance will be EBS-optimized.
  ebs_optimized = false

  # A set of tags to set for the EIP for EC2 Instance. This is optional and if
  # not provided the tags from variable tags will be used
  eip_tags = {}

  # Whether to force detaching any policies the role has before destroying it.
  # If policies are attached to the role via the aws_iam_policy_attachment
  # resource and you are modifying the role name or path, the
  # force_detach_policies argument must be set to true and applied before
  # attempting the operation otherwise you will encounter a DeleteConflict
  # error. The aws_iam_role_policy_attachment resource (recommended) does not
  # have this requirement.
  force_detach_policies = false

  # Whether or not to extract Base-64 encoded encrypted password data for the
  # instance. Useful for getting the administrator password for instances
  # running Microsoft Windows.
  get_password_data = false

  # The name for the bastion host's IAM role and instance profile. If set to an
  # empty string, will use var.name. Required when create_iam_role is false.
  iam_role_name = ""

  # A set of tags to set for instance iam role. This is optional and if not
  # provided the tags from variable tags will be used
  iam_role_tags = {}

  # A set of tags for EC2 Instance. This is optional and if not provided the
  # tags from variable tags will be used
  instance_tags = {}

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
  metadata_http_tokens = "required"

  # Enables or disables access to instance tags from the instance metadata
  # service. Valid values include enabled or disabled. Defaults to disabled.
  metadata_tags = "disabled"

  # If true, the launched EC2 instance will have detailed monitoring enabled.
  monitoring = true

  # Private IP address to associate with the instance in a VPC
  private_ip = null

  # Instruct Terraform to revoke all of the Security Groups attached ingress and
  # egress rules before deleting the rule itself. This is normally not needed,
  # however certain AWS services such as Elastic Map Reduce may automatically
  # add required rules to security groups used with the service, and those rules
  # may contain a cyclic dependency that prevent the security groups from being
  # destroyed without removing the dependency first.
  revoke_security_group_rules_on_delete = false

  # The ARN of the policy that is used to set the permissions boundary for the
  # IAM role.
  role_permissions_boundary = null

  # If set to true, the root volume will be deleted when the Instance is
  # terminated.
  root_volume_delete_on_termination = true

  # If set to true, the root volume will be encrypted. Default is set to false
  root_volume_encrypted = false

  # The IOPS to allocate for the root volume.
  root_volume_iops = null

  # The size of the root volume, in gigabytes.
  root_volume_size = 8

  # Tags to set on the root volume.
  root_volume_tags = {}

  # The root volume type. Must be one of: standard, gp2, io1.
  root_volume_type = "standard"

  # A list of secondary private IPv4 addresses to assign to the instance's
  # primary network interface (eth0) in a VPC
  secondary_private_ips = null

  # The name for the bastion host's security group. If set to an empty string,
  # will use var.name.
  security_group_name = ""

  # A set of tags to set for the Security Group. This is optional and if not
  # provided the tags from variable tags will be used
  security_group_tags = {}

  # Controls if traffic is routed to the instance when the destination address
  # does not match the instance. Must be set to a boolean (not a string!) true
  # or false value.
  source_dest_check = true

  # A set of tags for the EC2 Instance. These are common tags and will be used
  # for Instance, IAM Role, EIP and Security Group. Note that other AWS
  # resources created by this module such as an Elastic IP Address and Route53
  # Record do not support tags.
  tags = {}

  # The tenancy of this server. Must be one of: default, dedicated, or host.
  tenancy = "default"

  # The User Data script to run on this instance when it is booting. If you need
  # to pass gzipped, base64-encoded data (e.g., for a cloud-init script), use
  # var.user_data_base64 instead.
  user_data = null

  # The base64-encoded User Data script to run on the server when it is booting.
  # This can be used to pass binary User Data, such as a gzipped cloud-init
  # script. If you wish to pass in plain text (e.g., typical Bash script) for
  # User Data, use var.user_data instead.
  user_data_base64 = null

  # When used in combination with user_data or user_data_base64, a user_data
  # change will trigger a destroy and recreate when set to true. Defaults to
  # null.
  user_data_replace_on_change = null

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

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name of the server. This will be used to namespace all resources created by this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="subnet_id" requirement="required" type="string">
<HclListItemDescription>

The id of the subnet where this server should be deployed. Required unless default_network_interface_id is set, in which case subnet_id should be set to null.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The id of the VPC where this server should be deployed.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="additional_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of optional additional security group ids to assign to the server. Note: this variable is NOT used if default_network_interface_id is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_all_outbound_traffic" requirement="optional" type="bool">
<HclListItemDescription>

A boolean that specifies whether or not to add a security group rule that allows all outbound traffic from this server. Works if custom_egress_rules_cidr_blocks is not specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="allow_rdp_from_cidr_list" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IP address ranges in CIDR format from which rdp access will be permitted. Attempts to access the bastion host from all other IP addresses will be blocked.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_rdp_from_ipv6_cidr_list" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IPv6 address ranges in CIDR format from which rdp access will be permitted. Attempts to access the bastion host from all other IP addresses will be blocked.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_rdp_from_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of security groups from which rdp connections will be allowed.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_ssh_from_cidr_list" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IP address ranges in CIDR format from which SSH access will be permitted. Attempts to access the server from all other IP addresses will be blocked.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_ssh_from_ipv6_cidr_list" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IPv6 address ranges in CIDR format from which SSH access will be permitted. Attempts to access the server from all other IP addresses will be blocked.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_ssh_from_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of security groups from which SSH connections will be allowed.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="associate_public_ip_address" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to associate a public IP address to the instance. When null, defaults to the subnet setting (e.g., if public subnet defaults to associating a public IP, associate one - otherwise, does not associate a public IP).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="assume_role_principals" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of AWS service principals that can assume the instance IAM role. If deploying in AWS China, set this to [ec2.amazonaws.com.cn].

</HclListItemDescription>
<HclListItemDefaultValue>

```hcl
[
  "ec2.amazonaws.com"
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="attach_eip" requirement="optional" type="bool">
<HclListItemDescription>

Determines if an Elastic IP (EIP) will be created for this instance. Must be set to a boolean (not a string!) true or false value.

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

<HclListItem name="create_security_group" requirement="optional" type="bool">
<HclListItemDescription>

Whether to create a security group for the instance. If set to false, you will have to provide security group with '<a href="#additional_security_group_ids"><code>additional_security_group_ids</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="custom_egress_rules_cidr_blocks" requirement="optional" type="map(object(…))">
<HclListItemDescription>

Custom egress rules with the CIDR Blocks destination. If we use this, the security group rule that allows all outbound traffic won't be created.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    description = string
    cidr_blocks = list(string)
    from_port   = number
    to_port     = number
    protocol    = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   An example:
   custom_egress_rules_cidr_blocks = {
     db_instance = {
       description = "Connect to the DB instance"
       cidr_blocks = ["10.0.0.0/16"]
       from_port   = 5432
       to_port     = 5432
       protocol    = "tcp"
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="dedicated_host_id" requirement="optional" type="string">
<HclListItemDescription>

ID of a dedicated host that the instance will be assigned to. Use when an instance is to be launched on a specific dedicated host.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="default_network_interface_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of a network interface to use to override the default network interface for this EC2 instance, attached at eth0 (device index 0). If set, subnet_id must be set to null.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="disable_api_termination" requirement="optional" type="bool">
<HclListItemDescription>

If true, enables EC2 Instance Termination Protection.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="dns_name" requirement="optional" type="string">
<HclListItemDescription>

The DNS name to add for this server in <a href="#dns_zone_id"><code>dns_zone_id</code></a>. Only used if <a href="#dns_zone_id"><code>dns_zone_id</code></a> is set. For example, if <a href="#dns_zone_id"><code>dns_zone_id</code></a> points to the hosted zone for example.com and you set dns_name to foo, this server will have the domain foo.example.com.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="dns_ttl" requirement="optional" type="number">
<HclListItemDescription>

The TTL, in seconds, of the DNS record for this server.  Only used if <a href="#dns_zone_id"><code>dns_zone_id</code></a> is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="dns_type" requirement="optional" type="string">
<HclListItemDescription>

The DNS record type when adding a DNS record for this server. Only used if <a href="#dns_zone_id"><code>dns_zone_id</code></a> is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;A&quot;"/>
</HclListItem>

<HclListItem name="dns_uses_private_ip" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, point the Route 53 DNS record at the private IP of the EIP rather than the public IP.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="dns_zone_id" requirement="optional" type="string">
<HclListItemDescription>

The id of a route53 hosted zone. Leave blank if you don't want a DNS entry for this server. If you specify this variable, you must also specify <a href="#dns_name"><code>dns_name</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="ebs_optimized" requirement="optional" type="bool">
<HclListItemDescription>

If true, the launced EC2 Instance will be EBS-optimized.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="eip_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A set of tags to set for the EIP for EC2 Instance. This is optional and if not provided the tags from variable tags will be used

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="force_detach_policies" requirement="optional" type="string">
<HclListItemDescription>

Whether to force detaching any policies the role has before destroying it. If policies are attached to the role via the aws_iam_policy_attachment resource and you are modifying the role name or path, the force_detach_policies argument must be set to true and applied before attempting the operation otherwise you will encounter a DeleteConflict error. The aws_iam_role_policy_attachment resource (recommended) does not have this requirement.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="get_password_data" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to extract Base-64 encoded encrypted password data for the instance. Useful for getting the administrator password for instances running Microsoft Windows.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

The name for the bastion host's IAM role and instance profile. If set to an empty string, will use <a href="#name"><code>name</code></a>. Required when create_iam_role is false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="iam_role_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A set of tags to set for instance iam role. This is optional and if not provided the tags from variable tags will be used

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="instance_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A set of tags for EC2 Instance. This is optional and if not provided the tags from variable tags will be used

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
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
<HclListItemDefaultValue defaultValue="&quot;required&quot;"/>
</HclListItem>

<HclListItem name="metadata_tags" requirement="optional" type="string">
<HclListItemDescription>

Enables or disables access to instance tags from the instance metadata service. Valid values include enabled or disabled. Defaults to disabled.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;disabled&quot;"/>
</HclListItem>

<HclListItem name="monitoring" requirement="optional" type="bool">
<HclListItemDescription>

If true, the launched EC2 instance will have detailed monitoring enabled.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="private_ip" requirement="optional" type="string">
<HclListItemDescription>

Private IP address to associate with the instance in a VPC

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="revoke_security_group_rules_on_delete" requirement="optional" type="bool">
<HclListItemDescription>

Instruct Terraform to revoke all of the Security Groups attached ingress and egress rules before deleting the rule itself. This is normally not needed, however certain AWS services such as Elastic Map Reduce may automatically add required rules to security groups used with the service, and those rules may contain a cyclic dependency that prevent the security groups from being destroyed without removing the dependency first.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the IAM role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="root_volume_delete_on_termination" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, the root volume will be deleted when the Instance is terminated.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="root_volume_encrypted" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, the root volume will be encrypted. Default is set to false

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="root_volume_iops" requirement="optional" type="number">
<HclListItemDescription>

The IOPS to allocate for the root volume.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="root_volume_size" requirement="optional" type="number">
<HclListItemDescription>

The size of the root volume, in gigabytes.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="8"/>
</HclListItem>

<HclListItem name="root_volume_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags to set on the root volume.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
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
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="security_group_name" requirement="optional" type="string">
<HclListItemDescription>

The name for the bastion host's security group. If set to an empty string, will use <a href="#name"><code>name</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="security_group_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A set of tags to set for the Security Group. This is optional and if not provided the tags from variable tags will be used

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="source_dest_check" requirement="optional" type="bool">
<HclListItemDescription>

Controls if traffic is routed to the instance when the destination address does not match the instance. Must be set to a boolean (not a string!) true or false value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A set of tags for the EC2 Instance. These are common tags and will be used for Instance, IAM Role, EIP and Security Group. Note that other AWS resources created by this module such as an Elastic IP Address and Route53 Record do not support tags.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="tenancy" requirement="optional" type="string">
<HclListItemDescription>

The tenancy of this server. Must be one of: default, dedicated, or host.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;default&quot;"/>
</HclListItem>

<HclListItem name="user_data" requirement="optional" type="string">
<HclListItemDescription>

The User Data script to run on this instance when it is booting. If you need to pass gzipped, base64-encoded data (e.g., for a cloud-init script), use <a href="#user_data_base64"><code>user_data_base64</code></a> instead.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="user_data_base64" requirement="optional" type="string">
<HclListItemDescription>

The base64-encoded User Data script to run on the server when it is booting. This can be used to pass binary User Data, such as a gzipped cloud-init script. If you wish to pass in plain text (e.g., typical Bash script) for User Data, use <a href="#user_data"><code>user_data</code></a> instead.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="user_data_replace_on_change" requirement="optional" type="bool">
<HclListItemDescription>

When used in combination with user_data or user_data_base64, a user_data change will trigger a destroy and recreate when set to true. Defaults to null.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="ami">
</HclListItem>

<HclListItem name="arn">
</HclListItem>

<HclListItem name="fqdn">
</HclListItem>

<HclListItem name="iam_role_arn">
</HclListItem>

<HclListItem name="iam_role_id">
</HclListItem>

<HclListItem name="iam_role_name">
</HclListItem>

<HclListItem name="id">
</HclListItem>

<HclListItem name="instance_ip">
</HclListItem>

<HclListItem name="name">
</HclListItem>

<HclListItem name="password_data">
</HclListItem>

<HclListItem name="private_ip">
</HclListItem>

<HclListItem name="public_ip">
</HclListItem>

<HclListItem name="secondary_private_ips">
</HclListItem>

<HclListItem name="security_group_id">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-server/tree/v0.16.1/modules/single-server/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-server/tree/v0.16.1/modules/single-server/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-server/tree/v0.16.1/modules/single-server/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "a9b0325032435f849161038de4af7b90"
}
##DOCS-SOURCER-END -->
