---
title: "Server Group Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Auto Scaling Group Modules" version="1.1.0" lastModifiedVersion="1.1.0"/>

# Server Group Module

<a href="https://github.com/gruntwork-io/terraform-aws-asg/tree/v1.1.0/modules/server-group" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-asg/releases/tag/v1.1.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module allows you to run a fixed-size cluster of servers that can:

1.  Attach [EBS Volumes](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSVolumes.html) to each server.
2.  Attach [Elastic Network Interfaces (ENIs)](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html) to
    each server.
3.  Do a zero-downtime, rolling deployment, where each server is shut down, the EBS Volume and/or ENI detached, and new
    server is brought up that reattaches the EBS Volume and/or ENI.
4.  Integrate with an [Application Load Balancer
    (ALB)](https://aws.amazon.com/elasticloadbalancing/applicationloadbalancer/) or [Elastic Load Balancer
    (ELB)](https://aws.amazon.com/elasticloadbalancing/classicloadbalancer/) for routing and health checks.
5.  Automatically replace failed servers.

The main use case for this module is to run data stores such as MongoDB and ZooKeeper. See the [Background
section](#background) to understand how this module works and in what use cases you should use it instead of an Auto
Scaling Group (ASG).

**WARNING: Launch Configurations:** [Launch configurations](https://docs.aws.amazon.com/autoscaling/ec2/userguide/launch-configurations.html) are being phased out in favor of [Launch Templates](https://docs.aws.amazon.com/autoscaling/ec2/userguide/launch-templates.html). Before upgrading to the latest release please be sure to test and plan any changes to infrastructure that may be impacted. Launch templates are being introduced in [PR #175](https://github.com/gruntwork-io/terraform-aws-asg/pull/175)

## Quick start

Check out the [server-group examples](https://github.com/gruntwork-io/terraform-aws-asg/tree/v1.1.0/examples/server-group) for sample code that demonstrates how to use this module.

## Background

1.  [Why not an Auto Scaling Group?](#why-not-an-auto-scaling-group)
2.  [How does this module work?](#how-does-this-module-work)
3.  [How does rolling deployment work?](#how-does-rolling-deployment-work)

### Why not an Auto Scaling Group?

The first question you may ask is, how is this different than an [Auto Scaling Group
(ASG)](http://docs.aws.amazon.com/autoscaling/latest/userguide/AutoScalingGroup.html)? While an ASG does allow you to
run a cluster of servers, automaticaly replace failed servers, and do zero-downtime deployment (see the
[asg-rolling-deploy module](https://github.com/gruntwork-io/terraform-aws-asg/tree/v1.1.0/modules/asg-rolling-deploy)), attaching ENIs and EBS Volumes to servers in an ASG is very
tricky:

1.  Using ENIs and EBS Volumes with ASGs is not natively supported by Terraform. The
    [aws_network_interface_attachment](https://www.terraform.io/docs/providers/aws/r/network_interface_attachment.html)
    and [aws_volume_attachment](https://www.terraform.io/docs/providers/aws/r/volume_attachment.html) resources only
    work with individual EC2 Instances and not ASGs. Therefore, you typically create a pool of ENIs and EBS Volumes in
    Terraform, and your servers, while booting, use the AWS CLI to attach those ENIs and EBS Volumes.

2.  Attaching ENIs and EBS Volumes from a pool requires that each server has a way to uniquely pick which ENI or EBS
    Volume belongs to it. Picking at random and retrying can be slow and error prone.

3.  With EBS Volumes, attaching them from an ASG is particularly problematic, as you can only attach an EBS Volume in
    the same Availability Zone (AZ) as the server. If you have, for example, three AZs and five servers, it's entirely
    possible that the ASG will launch a server in an AZ that does not have any EBS Volumes available.

The goal of this module is to give you a way to run a cluster of servers where attaching ENIs and EBS Volumes is easy.

### How does this module work?

The solution used in this module is to:

1.  Create one ASG for each server. So if you create a cluster with five servers, you'll end up with five ASGs. Using
    ASGs gives us the ability to automatically integrate with the ALB and ELB and to replace failed servers.
2.  Each ASG is assigned to exactly one subnet, and therefore, one AZ.
3.  Create ENIs and EBS Volumes for each server, in the same AZ as that server's ASG. This ensures a server will
    never launch in an AZ that doesn't have an EBS Volume.
4.  Each server and ENI pair and each server and EBS Volume pair get matching tags, so each server can always uniquely
    identify the ENIs and EBS Volumes that belong to it.
5.  Zero-downtime deployment is done using a Python script in a [local-exec
    provisioner](https://www.terraform.io/docs/provisioners/local-exec.html). See [How does rolling deployment
    work?](#how-does-rolling-deployment-work) for more details.

## How does rolling deployment work?

The server-group module will perform a zero-downtime, rolling deployment every time you make a change to the code and
run `terraform apply`. This deployment process is implemented in a Python script called
[rolling_deployment.py](https://github.com/gruntwork-io/terraform-aws-asg/tree/v1.1.0/modules/server-group/rolling-deploy/rolling_deployment.py) which runs in a [local-exec
provisioner](https://www.terraform.io/docs/provisioners/local-exec.html).

Here is how it works:

1.  [The rolling deployment process](#the-rolling-deployment-process)
2.  [Deployment configuration options](#deployment-configuration-options)

### The rolling deployment process

The rolling deployment process works as follows:

1.  Wait for the server-group to be healthy before starting the deployment. That means the server-group has the expected
    number of servers up and running and passing health checks.

2.  Pick one of the ASGs in the server-group and set its size to 0. This will terminate the Instance in that ASG,
    respecting any connection draining settings you may have set up. It will also detach any ENI or EBS Volume.

3.  Once the instance has terminated, set the ASG size back to 1. This will launch a new Instance with your new code
    and reattach its ENI or EBS Volume.

4.  Wait for the new Instance to pass health checks.

5.  Once the Instance is healthy, repeat the process with the next ASG, until all ASGs have been redeployed.

### Deployment configuration options

You can customize the way the rolling deployment works by specifying the following parameters to the server-group
module in your Terraform code:

*   `script_log_level`: Specify the [logging level](https://docs.python.org/3/library/logging.html#logging-levels) the
    script should use. Default is `INFO`. To debug issues, you may want to turn it up to `DEBUG`. To quiet the script
    down, you may want to turn it down to `ERROR`.

*   `deployment_batch_size`: How many servers to redeploy at a time. The default is 1. If you have a lot of servers to
    redeploy, you may want to increase this number to do the deployment in larger batches. However, make sure that taking
    down a batch of this size does not cause an unintended outage for your service!

*   `skip_health_check`: If set to `true`, the rolling deployment process will not wait for the server-group to be
    healthy before starting the deployment. This is useful if your server-group is already experiencing some sort of
    downtime or problem and you want to force a deployment as a way to fix it.

*   `skip_rolling_deploy`: If set to `true`, skip the rolling deployment process entirely. That means your Terraform
    changes will be applied to the launch templates underneath the ASGs, but no new code will be deployed until
    something triggers the ASG to launch new instances. This is primarily useful if the rolling deployment script turns
    out to have some sort of bug in it.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S SERVER-GROUP MODULE
# ------------------------------------------------------------------------------------------------------

module "server_group" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-asg.git//modules/server-group?ref=v1.1.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the Amazon Machine Image (AMI) to run on each server (e.g.,
  # ami-abcd1234).
  ami_id = <string>

  # The type of EC2 Instance to run (e.g. t3.micro).
  instance_type = <string>

  # The name for this group of servers. Used as the default Name tag on each EC2
  # Instance and to namespace all the resources created by this module.
  name = <string>

  # The number of servers to run in the server group.
  size = <number>

  # The IDs of the subnets where the servers should be deployed (e.g.,
  # subnet-abcd1234).
  subnet_ids = <list(string)>

  # The id of the VPC where the servers should be deployed (e.g. vpc-abcd1234).
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of Security Group IDs that should be added to the Launch Template and
  # any ENIs, if applicable, created by this module.
  additional_security_group_ids = []

  # The ARNs of Application Load Balancer (ALB) Target Groups to associate with
  # the servers. We recommend associating at least one ELB (via var.elb_names)
  # or ALB (via this parameter) and setting var.health_check_type to ELB to use
  # a load balancer for health checks during deployments.
  alb_target_group_arns = []

  # A list of IP address ranges in CIDR format from which SSH access will be
  # permitted. Attempts to access the bastion host from all other IP addresses
  # will be blocked.
  allow_ssh_from_cidr_blocks = []

  # The IDs of security groups from which SSH connections will be allowed.
  allow_ssh_from_security_group_ids = []

  # Set to true to associate a public IP address with each server.
  associate_public_ip_address = false

  # Specify the AWS region to deploy to (e.g. us-east-1) instead of inferring it
  # from the provider.
  aws_region = ""

  # The name of the device to mount.
  block_device_name = "/dev/xvdcz"

  # A map of key value pairs that represents custom tags to apply to the EC2
  # Instances, ENIs, EBS Volumes, and Security Group in this server group.
  custom_tags = {}

  # How many servers to deploy at a time during a rolling deployment. For
  # example, if you have 10 servers and set this variable to 2, then the
  # deployment will a) undeploy 2 servers, b) deploy 2 replacement servers, c)
  # repeat the process for the next 2 servers.
  deployment_batch_size = 1

  # The maximum number of times to retry the Load Balancer's Health Check before
  # giving up on the rolling deployment. After this number is hit, the Python
  # script will cease checking the failed EC2 Instance deployment but continue
  # with other EC2 Instance deployments.
  deployment_health_check_max_retries = 360

  # The amount of time in seconds to wait between checking the status of the
  # Load Balancer's Health Check status for an EC2 Instance that is being
  # replaced.
  deployment_health_check_retry_interval_in_seconds = 10

  # Desired capacity of instances in autoscaling group.
  desired_capacity = 1

  # The common portion of the DNS name to assign to each server. For example, if
  # you want DNS records eni-0.0.foo, eni-0.1.foo, eni-0.2.foo, etc., use the
  # value 'foo' and set var.num_enis to 1. A unique DNS records will be created
  # for each combination of an ENI and server. Note that this value must be a
  # valid record name for the Route 53 Hosted Zone ID specified in
  # var.route53_hosted_zone_id. This var is overriden by var.dns_names if that
  # var is non-empty. Examples: kafka.aws or kafka.acme.com.
  dns_name_common_portion = ""

  # A list of DNS names to assign to each ENI in the Server Group. Make sure the
  # list has n entries, where n = var.num_enis * var.size. If this var is
  # specified, it will override var.dns_name_common_portion. Example:
  # [0.acme.com, 1.acme.com, 2.acme.com]
  dns_names = []

  # The TTL (Time to Live) to apply to any DNS records created by this module.
  dns_ttl = 300

  # Set to true to make each server EBS-optimized.
  ebs_optimized = false

  # A list that defines the EBS Volumes to create for each server. Each item in
  # the list should be a map that contains the keys 'type' (one of standard,
  # gp2, gp3, io1, io2, sc1 or st1), 'size' (in GB), 'encrypted' (true or
  # false), 'iops' value if using a disk type of io1, io2 or gp3, and
  # 'snapshot_id' (optional ID to recover the volume from a snapshot). Each EBS
  # Volume and server pair will get matching tags with a name of the format
  # ebs-volume-xxx, where xxx is the index of the EBS Volume (e.g.,
  # ebs-volume-0, ebs-volume-1, etc). These tags can be used by each server to
  # find and mount its EBS Volume(s).
  ebs_volumes = []

  # The names of Elastic Load Balancers (ELBs) to associate with the servers. We
  # recommend associating at least one ELB (via this parameter) or ALB (via
  # var.alb_target_group_arns) and setting var.health_check_type to ELB to use a
  # load balancer for health checks during deployments.
  elb_names = []

  # Set to true to enable block device mappings for the aws_launch_template
  # server_group. Set to false will skip creating the block device mappings.
  # Defaults to true.
  enable_block_device_mappings = true

  # Enable detailed CloudWatch monitoring for the servers. This gives you more
  # granularity with your CloudWatch metrics, but also costs more money.
  enable_detailed_monitoring = false

  # If true, create an Elastic IP Address for each ENI and associate it with the
  # ENI.
  enable_elastic_ips = false

  # Set this variable to true to enable the Instance Metadata Service (IMDS)
  # endpoint, which is used to fetch information such as user-data scripts,
  # instance IP address and region, etc. Set this variable to false if you do
  # not want the IMDS endpoint enabled for instances launched into the Auto
  # Scaling Group for the workers.
  enable_imds = true

  # A list of metrics the ASG should enable for monitoring all instances in a
  # group. The allowed values are GroupMinSize, GroupMaxSize,
  # GroupDesiredCapacity, GroupInServiceInstances, GroupPendingInstances,
  # GroupStandbyInstances, GroupTerminatingInstances, GroupTotalInstances.
  enabled_metrics = []

  # Specify the name of an existing IAM role to attach to the instance profile
  # if you don't want this module to create one.
  existing_iam_role_name = null

  # The time, in seconds, after a server first comes into service before
  # beginning to check health. This is useful if your server needs time to boot
  # up (e.g., to warm a cache) without having to worry about failing health
  # checks and being replaced right away.
  health_check_grace_period = 30

  # The type of health check to use. Must be one of: EC2 or ELB. If you
  # associate any load balancers with this server group via var.elb_names or
  # var.alb_target_group_arns, you should typically set this parameter to ELB.
  health_check_type = "EC2"

  # The desired HTTP PUT response hop limit for instance metadata requests.
  http_put_response_hop_limit = null

  # The name of an EC2 Key Pair to associate with each server for SSH access.
  # Set to null to not associate a Key Pair.
  key_pair_name = null

  # The ARN for the KMS encryption key. When encrypted is set to true, this
  # kms_key_id will be used. If encrypted is set to true and this is empty
  # string, the default aws/ebs AWS managed key.
  kms_key_id = ""

  # Configure the tag specifications for the Launch Template.
  launch_template_tag_specifications = []

  # The maximum number of instances in autoscaling group.
  max_size = 1

  # The minimum number of instances in autoscaling group.
  min_size = 0

  # The number of extra Elastic Network Interfaces (ENIs) to create for server.
  # Each ENI is an IP address that will remain static, even if the underlying
  # server is replaced. Each ENI and server pair will get matching tags with a
  # name of the format eni-xxx, where xxx is the index of the ENI (e.g., eni-0,
  # eni-1, etc). These tags can be used by each server to find and mount its
  # ENI(s).
  num_enis = 0

  # When true, newly launched instances are automatically protected from
  # termination by Amazon EC2 Auto Scaling when scaling in.
  protect_from_scale_in = false

  # Set to 'true' to allow the server group role to assume itself. See
  # https://aws.amazon.com/blogs/security/announcing-an-update-to-iam-role-trust-policy-behavior/
  role_allow_self_assume = false

  # Maximum session duration (in seconds) that you want to set for the server
  # group role. This setting can have a value from 1 hour to 12 hours. Default
  # is 1 hour (3600s).
  role_max_session_duration = 3600

  # The ARN of the policy that is used to set the permissions boundary for the
  # server group role. This policy should be created outside of this module.
  role_permissions_boundary = null

  # The name prefix that is used for the server group role.
  role_prefix = "server-group-"

  # Whether the root volume of each server should be deleted when the server is
  # terminated. Please note that when using EBS optimized AMIs, the root volume
  # name name is determined by the AMI, and if var.block_device_name does not
  # match the AMI's device name, AWS will create another volume instead of
  # applying this configuration to the root volume.
  root_block_device_delete_on_termination = true

  # Whether the root volume of each server should be encrypted. Please note that
  # when using EBS optimized AMIs, the root volume name name is determined by
  # the AMI, and if var.block_device_name does not match the AMI's device name,
  # AWS will create another volume instead of applying this configuration to the
  # root volume.
  root_block_device_encrypted = true

  # The size, in GB, of the root volume of each server. Please note that when
  # using EBS optimized AMIs, the root volume name name is determined by the
  # AMI, and if var.block_device_name does not match the AMI's device name, AWS
  # will create another volume instead of applying this configuration to the
  # root volume.
  root_block_device_volume_size = 20

  # The type of the root volume of each server. Must be one of: standard, gp2,
  # gp3, io1, io2, sc1, or st1. Please note that when using EBS optimized AMIs,
  # the root volume name name is determined by the AMI, and if
  # var.block_device_name does not match the AMI's device name, AWS will create
  # another volume instead of applying this configuration to the root volume.
  root_block_device_volume_type = "standard"

  # The ID of the Route53 Hosted Zone in which we will create the DNS records
  # specified by var.dns_name_common_portion. Only used if
  # var.dns_name_common_portion is non-empty.
  route53_hosted_zone_id = null

  # The log level to use with the rolling deploy script. It can be useful to set
  # this to DEBUG when troubleshooting the script.
  script_log_level = "INFO"

  # The name prefix that is used for the security group
  security_group_prefix = "server-group-"

  # If set to true, skip the health check, and start a rolling deployment
  # without waiting for the server group to be in a healthy state. This is
  # primarily useful if the server group is in a broken state and you want to
  # force a deployment anyway.
  skip_health_check = false

  # If set to true, skip the rolling deployment, and destroy all the servers
  # immediately. You should typically NOT enable this in prod, as it will cause
  # downtime! The main use case for this flag is to make testing and cleanup
  # easier. It can also be handy in case the rolling deployment code has a bug.
  skip_rolling_deploy = false

  # The port to use for SSH access.
  ssh_port = 22

  # The tenancy of each server. Must be one of: default, dedicated, or host.
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

  # The User Data script to run on each server when it is booting. If you need
  # to pass gzipped, base64-encoded data (e.g., for a cloud-init script), use
  # var.user_data_base64 instead.
  user_data = null

  # The base64-encoded User Data script to run on each server when it is
  # booting. This can be used to pass binary User Data, such as a gzipped
  # cloud-init script. If you wish to pass in plain text (e.g., typical Bash
  # Script) for User Data, use var.user_data instead.
  user_data_base64 = null

  # By passing a value to this variable, you can effectively tell this module to
  # wait to deploy until the given variable's value is resolved, which is a way
  # to require that this module depend on some other module. Note that the
  # actual value of this variable doesn't matter.
  wait_for = ""

  # A maximum duration to wait for each server to be healthy before timing out
  # (e.g. 10m). Valid units of time are: s, m, h.
  wait_for_capacity_timeout = "10m"

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S SERVER-GROUP MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-asg.git//modules/server-group?ref=v1.1.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the Amazon Machine Image (AMI) to run on each server (e.g.,
  # ami-abcd1234).
  ami_id = <string>

  # The type of EC2 Instance to run (e.g. t3.micro).
  instance_type = <string>

  # The name for this group of servers. Used as the default Name tag on each EC2
  # Instance and to namespace all the resources created by this module.
  name = <string>

  # The number of servers to run in the server group.
  size = <number>

  # The IDs of the subnets where the servers should be deployed (e.g.,
  # subnet-abcd1234).
  subnet_ids = <list(string)>

  # The id of the VPC where the servers should be deployed (e.g. vpc-abcd1234).
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of Security Group IDs that should be added to the Launch Template and
  # any ENIs, if applicable, created by this module.
  additional_security_group_ids = []

  # The ARNs of Application Load Balancer (ALB) Target Groups to associate with
  # the servers. We recommend associating at least one ELB (via var.elb_names)
  # or ALB (via this parameter) and setting var.health_check_type to ELB to use
  # a load balancer for health checks during deployments.
  alb_target_group_arns = []

  # A list of IP address ranges in CIDR format from which SSH access will be
  # permitted. Attempts to access the bastion host from all other IP addresses
  # will be blocked.
  allow_ssh_from_cidr_blocks = []

  # The IDs of security groups from which SSH connections will be allowed.
  allow_ssh_from_security_group_ids = []

  # Set to true to associate a public IP address with each server.
  associate_public_ip_address = false

  # Specify the AWS region to deploy to (e.g. us-east-1) instead of inferring it
  # from the provider.
  aws_region = ""

  # The name of the device to mount.
  block_device_name = "/dev/xvdcz"

  # A map of key value pairs that represents custom tags to apply to the EC2
  # Instances, ENIs, EBS Volumes, and Security Group in this server group.
  custom_tags = {}

  # How many servers to deploy at a time during a rolling deployment. For
  # example, if you have 10 servers and set this variable to 2, then the
  # deployment will a) undeploy 2 servers, b) deploy 2 replacement servers, c)
  # repeat the process for the next 2 servers.
  deployment_batch_size = 1

  # The maximum number of times to retry the Load Balancer's Health Check before
  # giving up on the rolling deployment. After this number is hit, the Python
  # script will cease checking the failed EC2 Instance deployment but continue
  # with other EC2 Instance deployments.
  deployment_health_check_max_retries = 360

  # The amount of time in seconds to wait between checking the status of the
  # Load Balancer's Health Check status for an EC2 Instance that is being
  # replaced.
  deployment_health_check_retry_interval_in_seconds = 10

  # Desired capacity of instances in autoscaling group.
  desired_capacity = 1

  # The common portion of the DNS name to assign to each server. For example, if
  # you want DNS records eni-0.0.foo, eni-0.1.foo, eni-0.2.foo, etc., use the
  # value 'foo' and set var.num_enis to 1. A unique DNS records will be created
  # for each combination of an ENI and server. Note that this value must be a
  # valid record name for the Route 53 Hosted Zone ID specified in
  # var.route53_hosted_zone_id. This var is overriden by var.dns_names if that
  # var is non-empty. Examples: kafka.aws or kafka.acme.com.
  dns_name_common_portion = ""

  # A list of DNS names to assign to each ENI in the Server Group. Make sure the
  # list has n entries, where n = var.num_enis * var.size. If this var is
  # specified, it will override var.dns_name_common_portion. Example:
  # [0.acme.com, 1.acme.com, 2.acme.com]
  dns_names = []

  # The TTL (Time to Live) to apply to any DNS records created by this module.
  dns_ttl = 300

  # Set to true to make each server EBS-optimized.
  ebs_optimized = false

  # A list that defines the EBS Volumes to create for each server. Each item in
  # the list should be a map that contains the keys 'type' (one of standard,
  # gp2, gp3, io1, io2, sc1 or st1), 'size' (in GB), 'encrypted' (true or
  # false), 'iops' value if using a disk type of io1, io2 or gp3, and
  # 'snapshot_id' (optional ID to recover the volume from a snapshot). Each EBS
  # Volume and server pair will get matching tags with a name of the format
  # ebs-volume-xxx, where xxx is the index of the EBS Volume (e.g.,
  # ebs-volume-0, ebs-volume-1, etc). These tags can be used by each server to
  # find and mount its EBS Volume(s).
  ebs_volumes = []

  # The names of Elastic Load Balancers (ELBs) to associate with the servers. We
  # recommend associating at least one ELB (via this parameter) or ALB (via
  # var.alb_target_group_arns) and setting var.health_check_type to ELB to use a
  # load balancer for health checks during deployments.
  elb_names = []

  # Set to true to enable block device mappings for the aws_launch_template
  # server_group. Set to false will skip creating the block device mappings.
  # Defaults to true.
  enable_block_device_mappings = true

  # Enable detailed CloudWatch monitoring for the servers. This gives you more
  # granularity with your CloudWatch metrics, but also costs more money.
  enable_detailed_monitoring = false

  # If true, create an Elastic IP Address for each ENI and associate it with the
  # ENI.
  enable_elastic_ips = false

  # Set this variable to true to enable the Instance Metadata Service (IMDS)
  # endpoint, which is used to fetch information such as user-data scripts,
  # instance IP address and region, etc. Set this variable to false if you do
  # not want the IMDS endpoint enabled for instances launched into the Auto
  # Scaling Group for the workers.
  enable_imds = true

  # A list of metrics the ASG should enable for monitoring all instances in a
  # group. The allowed values are GroupMinSize, GroupMaxSize,
  # GroupDesiredCapacity, GroupInServiceInstances, GroupPendingInstances,
  # GroupStandbyInstances, GroupTerminatingInstances, GroupTotalInstances.
  enabled_metrics = []

  # Specify the name of an existing IAM role to attach to the instance profile
  # if you don't want this module to create one.
  existing_iam_role_name = null

  # The time, in seconds, after a server first comes into service before
  # beginning to check health. This is useful if your server needs time to boot
  # up (e.g., to warm a cache) without having to worry about failing health
  # checks and being replaced right away.
  health_check_grace_period = 30

  # The type of health check to use. Must be one of: EC2 or ELB. If you
  # associate any load balancers with this server group via var.elb_names or
  # var.alb_target_group_arns, you should typically set this parameter to ELB.
  health_check_type = "EC2"

  # The desired HTTP PUT response hop limit for instance metadata requests.
  http_put_response_hop_limit = null

  # The name of an EC2 Key Pair to associate with each server for SSH access.
  # Set to null to not associate a Key Pair.
  key_pair_name = null

  # The ARN for the KMS encryption key. When encrypted is set to true, this
  # kms_key_id will be used. If encrypted is set to true and this is empty
  # string, the default aws/ebs AWS managed key.
  kms_key_id = ""

  # Configure the tag specifications for the Launch Template.
  launch_template_tag_specifications = []

  # The maximum number of instances in autoscaling group.
  max_size = 1

  # The minimum number of instances in autoscaling group.
  min_size = 0

  # The number of extra Elastic Network Interfaces (ENIs) to create for server.
  # Each ENI is an IP address that will remain static, even if the underlying
  # server is replaced. Each ENI and server pair will get matching tags with a
  # name of the format eni-xxx, where xxx is the index of the ENI (e.g., eni-0,
  # eni-1, etc). These tags can be used by each server to find and mount its
  # ENI(s).
  num_enis = 0

  # When true, newly launched instances are automatically protected from
  # termination by Amazon EC2 Auto Scaling when scaling in.
  protect_from_scale_in = false

  # Set to 'true' to allow the server group role to assume itself. See
  # https://aws.amazon.com/blogs/security/announcing-an-update-to-iam-role-trust-policy-behavior/
  role_allow_self_assume = false

  # Maximum session duration (in seconds) that you want to set for the server
  # group role. This setting can have a value from 1 hour to 12 hours. Default
  # is 1 hour (3600s).
  role_max_session_duration = 3600

  # The ARN of the policy that is used to set the permissions boundary for the
  # server group role. This policy should be created outside of this module.
  role_permissions_boundary = null

  # The name prefix that is used for the server group role.
  role_prefix = "server-group-"

  # Whether the root volume of each server should be deleted when the server is
  # terminated. Please note that when using EBS optimized AMIs, the root volume
  # name name is determined by the AMI, and if var.block_device_name does not
  # match the AMI's device name, AWS will create another volume instead of
  # applying this configuration to the root volume.
  root_block_device_delete_on_termination = true

  # Whether the root volume of each server should be encrypted. Please note that
  # when using EBS optimized AMIs, the root volume name name is determined by
  # the AMI, and if var.block_device_name does not match the AMI's device name,
  # AWS will create another volume instead of applying this configuration to the
  # root volume.
  root_block_device_encrypted = true

  # The size, in GB, of the root volume of each server. Please note that when
  # using EBS optimized AMIs, the root volume name name is determined by the
  # AMI, and if var.block_device_name does not match the AMI's device name, AWS
  # will create another volume instead of applying this configuration to the
  # root volume.
  root_block_device_volume_size = 20

  # The type of the root volume of each server. Must be one of: standard, gp2,
  # gp3, io1, io2, sc1, or st1. Please note that when using EBS optimized AMIs,
  # the root volume name name is determined by the AMI, and if
  # var.block_device_name does not match the AMI's device name, AWS will create
  # another volume instead of applying this configuration to the root volume.
  root_block_device_volume_type = "standard"

  # The ID of the Route53 Hosted Zone in which we will create the DNS records
  # specified by var.dns_name_common_portion. Only used if
  # var.dns_name_common_portion is non-empty.
  route53_hosted_zone_id = null

  # The log level to use with the rolling deploy script. It can be useful to set
  # this to DEBUG when troubleshooting the script.
  script_log_level = "INFO"

  # The name prefix that is used for the security group
  security_group_prefix = "server-group-"

  # If set to true, skip the health check, and start a rolling deployment
  # without waiting for the server group to be in a healthy state. This is
  # primarily useful if the server group is in a broken state and you want to
  # force a deployment anyway.
  skip_health_check = false

  # If set to true, skip the rolling deployment, and destroy all the servers
  # immediately. You should typically NOT enable this in prod, as it will cause
  # downtime! The main use case for this flag is to make testing and cleanup
  # easier. It can also be handy in case the rolling deployment code has a bug.
  skip_rolling_deploy = false

  # The port to use for SSH access.
  ssh_port = 22

  # The tenancy of each server. Must be one of: default, dedicated, or host.
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

  # The User Data script to run on each server when it is booting. If you need
  # to pass gzipped, base64-encoded data (e.g., for a cloud-init script), use
  # var.user_data_base64 instead.
  user_data = null

  # The base64-encoded User Data script to run on each server when it is
  # booting. This can be used to pass binary User Data, such as a gzipped
  # cloud-init script. If you wish to pass in plain text (e.g., typical Bash
  # Script) for User Data, use var.user_data instead.
  user_data_base64 = null

  # By passing a value to this variable, you can effectively tell this module to
  # wait to deploy until the given variable's value is resolved, which is a way
  # to require that this module depend on some other module. Note that the
  # actual value of this variable doesn't matter.
  wait_for = ""

  # A maximum duration to wait for each server to be healthy before timing out
  # (e.g. 10m). Valid units of time are: s, m, h.
  wait_for_capacity_timeout = "10m"

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="ami_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the Amazon Machine Image (AMI) to run on each server (e.g., ami-abcd1234).

</HclListItemDescription>
</HclListItem>

<HclListItem name="instance_type" requirement="required" type="string">
<HclListItemDescription>

The type of EC2 Instance to run (e.g. t3.micro).

</HclListItemDescription>
</HclListItem>

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name for this group of servers. Used as the default Name tag on each EC2 Instance and to namespace all the resources created by this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="size" requirement="required" type="number">
<HclListItemDescription>

The number of servers to run in the server group.

</HclListItemDescription>
</HclListItem>

<HclListItem name="subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

The IDs of the subnets where the servers should be deployed (e.g., subnet-abcd1234).

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The id of the VPC where the servers should be deployed (e.g. vpc-abcd1234).

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="additional_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of Security Group IDs that should be added to the Launch Template and any ENIs, if applicable, created by this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="alb_target_group_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

The ARNs of Application Load Balancer (ALB) Target Groups to associate with the servers. We recommend associating at least one ELB (via <a href="#elb_names"><code>elb_names</code></a>) or ALB (via this parameter) and setting <a href="#health_check_type"><code>health_check_type</code></a> to ELB to use a load balancer for health checks during deployments.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_ssh_from_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IP address ranges in CIDR format from which SSH access will be permitted. Attempts to access the bastion host from all other IP addresses will be blocked.

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

Set to true to associate a public IP address with each server.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="aws_region" requirement="optional" type="string">
<HclListItemDescription>

Specify the AWS region to deploy to (e.g. us-east-1) instead of inferring it from the provider.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="block_device_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the device to mount.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;/dev/xvdcz&quot;"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of key value pairs that represents custom tags to apply to the EC2 Instances, ENIs, EBS Volumes, and Security Group in this server group.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="deployment_batch_size" requirement="optional" type="number">
<HclListItemDescription>

How many servers to deploy at a time during a rolling deployment. For example, if you have 10 servers and set this variable to 2, then the deployment will a) undeploy 2 servers, b) deploy 2 replacement servers, c) repeat the process for the next 2 servers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="deployment_health_check_max_retries" requirement="optional" type="number">
<HclListItemDescription>

The maximum number of times to retry the Load Balancer's Health Check before giving up on the rolling deployment. After this number is hit, the Python script will cease checking the failed EC2 Instance deployment but continue with other EC2 Instance deployments.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="360"/>
</HclListItem>

<HclListItem name="deployment_health_check_retry_interval_in_seconds" requirement="optional" type="number">
<HclListItemDescription>

The amount of time in seconds to wait between checking the status of the Load Balancer's Health Check status for an EC2 Instance that is being replaced.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="10"/>
</HclListItem>

<HclListItem name="desired_capacity" requirement="optional" type="number">
<HclListItemDescription>

Desired capacity of instances in autoscaling group.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="dns_name_common_portion" requirement="optional" type="string">
<HclListItemDescription>

The common portion of the DNS name to assign to each server. For example, if you want DNS records eni-0.0.foo, eni-0.1.foo, eni-0.2.foo, etc., use the value 'foo' and set <a href="#num_enis"><code>num_enis</code></a> to 1. A unique DNS records will be created for each combination of an ENI and server. Note that this value must be a valid record name for the Route 53 Hosted Zone ID specified in <a href="#route53_hosted_zone_id"><code>route53_hosted_zone_id</code></a>. This var is overriden by <a href="#dns_names"><code>dns_names</code></a> if that var is non-empty. Examples: kafka.aws or kafka.acme.com.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="dns_names" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of DNS names to assign to each ENI in the Server Group. Make sure the list has n entries, where n = <a href="#num_enis"><code>num_enis</code></a> * <a href="#size"><code>size</code></a>. If this var is specified, it will override <a href="#dns_name_common_portion"><code>dns_name_common_portion</code></a>. Example: [0.acme.com, 1.acme.com, 2.acme.com]

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="dns_ttl" requirement="optional" type="number">
<HclListItemDescription>

The TTL (Time to Live) to apply to any DNS records created by this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="ebs_optimized" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to make each server EBS-optimized.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="ebs_volumes" requirement="optional" type="list(any)">
<HclListItemDescription>

A list that defines the EBS Volumes to create for each server. Each item in the list should be a map that contains the keys 'type' (one of standard, gp2, gp3, io1, io2, sc1 or st1), 'size' (in GB), 'encrypted' (true or false), 'iops' value if using a disk type of io1, io2 or gp3, and 'snapshot_id' (optional ID to recover the volume from a snapshot). Each EBS Volume and server pair will get matching tags with a name of the format ebs-volume-xxx, where xxx is the index of the EBS Volume (e.g., ebs-volume-0, ebs-volume-1, etc). These tags can be used by each server to find and mount its EBS Volume(s).

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   default = [
     {
       type      = "standard"
       size      = 100
       encrypted = true
     },
     {
       type        = "gp2"
       size        = 300
       encrypted   = true
       snapshot_id = "snap-abcd1234"
     },
     {
       type        = "io1"
       size        = 300
       iops        = 2000
       encrypted   = false
     }
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="elb_names" requirement="optional" type="list(string)">
<HclListItemDescription>

The names of Elastic Load Balancers (ELBs) to associate with the servers. We recommend associating at least one ELB (via this parameter) or ALB (via <a href="#alb_target_group_arns"><code>alb_target_group_arns</code></a>) and setting <a href="#health_check_type"><code>health_check_type</code></a> to ELB to use a load balancer for health checks during deployments.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="enable_block_device_mappings" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable block device mappings for the aws_launch_template server_group. Set to false will skip creating the block device mappings. Defaults to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_detailed_monitoring" requirement="optional" type="bool">
<HclListItemDescription>

Enable detailed CloudWatch monitoring for the servers. This gives you more granularity with your CloudWatch metrics, but also costs more money.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_elastic_ips" requirement="optional" type="bool">
<HclListItemDescription>

If true, create an Elastic IP Address for each ENI and associate it with the ENI.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_imds" requirement="optional" type="bool">
<HclListItemDescription>

Set this variable to true to enable the Instance Metadata Service (IMDS) endpoint, which is used to fetch information such as user-data scripts, instance IP address and region, etc. Set this variable to false if you do not want the IMDS endpoint enabled for instances launched into the Auto Scaling Group for the workers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enabled_metrics" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of metrics the ASG should enable for monitoring all instances in a group. The allowed values are GroupMinSize, GroupMaxSize, GroupDesiredCapacity, GroupInServiceInstances, GroupPendingInstances, GroupStandbyInstances, GroupTerminatingInstances, GroupTotalInstances.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   enabled_metrics = [
      "GroupDesiredCapacity",
      "GroupInServiceInstances",
      "GroupMaxSize",
      "GroupMinSize",
      "GroupPendingInstances",
      "GroupStandbyInstances",
      "GroupTerminatingInstances",
      "GroupTotalInstances"
    ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="existing_iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

Specify the name of an existing IAM role to attach to the instance profile if you don't want this module to create one.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="health_check_grace_period" requirement="optional" type="number">
<HclListItemDescription>

The time, in seconds, after a server first comes into service before beginning to check health. This is useful if your server needs time to boot up (e.g., to warm a cache) without having to worry about failing health checks and being replaced right away.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="health_check_type" requirement="optional" type="string">
<HclListItemDescription>

The type of health check to use. Must be one of: EC2 or ELB. If you associate any load balancers with this server group via <a href="#elb_names"><code>elb_names</code></a> or <a href="#alb_target_group_arns"><code>alb_target_group_arns</code></a>, you should typically set this parameter to ELB.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;EC2&quot;"/>
</HclListItem>

<HclListItem name="http_put_response_hop_limit" requirement="optional" type="number">
<HclListItemDescription>

The desired HTTP PUT response hop limit for instance metadata requests.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="key_pair_name" requirement="optional" type="string">
<HclListItemDescription>

The name of an EC2 Key Pair to associate with each server for SSH access. Set to null to not associate a Key Pair.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

The ARN for the KMS encryption key. When encrypted is set to true, this kms_key_id will be used. If encrypted is set to true and this is empty string, the default aws/ebs AWS managed key.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="launch_template_tag_specifications" requirement="optional" type="list(any)">
<HclListItemDescription>

Configure the tag specifications for the Launch Template.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="max_size" requirement="optional" type="number">
<HclListItemDescription>

The maximum number of instances in autoscaling group.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="min_size" requirement="optional" type="number">
<HclListItemDescription>

The minimum number of instances in autoscaling group.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="num_enis" requirement="optional">
<HclListItemDescription>

The number of extra Elastic Network Interfaces (ENIs) to create for server. Each ENI is an IP address that will remain static, even if the underlying server is replaced. Each ENI and server pair will get matching tags with a name of the format eni-xxx, where xxx is the index of the ENI (e.g., eni-0, eni-1, etc). These tags can be used by each server to find and mount its ENI(s).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="protect_from_scale_in" requirement="optional" type="bool">
<HclListItemDescription>

When true, newly launched instances are automatically protected from termination by Amazon EC2 Auto Scaling when scaling in.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="role_allow_self_assume" requirement="optional" type="bool">
<HclListItemDescription>

Set to 'true' to allow the server group role to assume itself. See https://aws.amazon.com/blogs/security/announcing-an-update-to-iam-role-trust-policy-behavior/

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="role_max_session_duration" requirement="optional" type="number">
<HclListItemDescription>

Maximum session duration (in seconds) that you want to set for the server group role. This setting can have a value from 1 hour to 12 hours. Default is 1 hour (3600s).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="3600"/>
</HclListItem>

<HclListItem name="role_permissions_boundary" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the server group role. This policy should be created outside of this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="role_prefix" requirement="optional" type="string">
<HclListItemDescription>

The name prefix that is used for the server group role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;server-group-&quot;"/>
</HclListItem>

<HclListItem name="root_block_device_delete_on_termination" requirement="optional" type="bool">
<HclListItemDescription>

Whether the root volume of each server should be deleted when the server is terminated. Please note that when using EBS optimized AMIs, the root volume name name is determined by the AMI, and if <a href="#block_device_name"><code>block_device_name</code></a> does not match the AMI's device name, AWS will create another volume instead of applying this configuration to the root volume.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="root_block_device_encrypted" requirement="optional" type="bool">
<HclListItemDescription>

Whether the root volume of each server should be encrypted. Please note that when using EBS optimized AMIs, the root volume name name is determined by the AMI, and if <a href="#block_device_name"><code>block_device_name</code></a> does not match the AMI's device name, AWS will create another volume instead of applying this configuration to the root volume.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="root_block_device_volume_size" requirement="optional" type="number">
<HclListItemDescription>

The size, in GB, of the root volume of each server. Please note that when using EBS optimized AMIs, the root volume name name is determined by the AMI, and if <a href="#block_device_name"><code>block_device_name</code></a> does not match the AMI's device name, AWS will create another volume instead of applying this configuration to the root volume.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="20"/>
</HclListItem>

<HclListItem name="root_block_device_volume_type" requirement="optional" type="string">
<HclListItemDescription>

The type of the root volume of each server. Must be one of: standard, gp2, gp3, io1, io2, sc1, or st1. Please note that when using EBS optimized AMIs, the root volume name name is determined by the AMI, and if <a href="#block_device_name"><code>block_device_name</code></a> does not match the AMI's device name, AWS will create another volume instead of applying this configuration to the root volume.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;standard&quot;"/>
</HclListItem>

<HclListItem name="route53_hosted_zone_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the Route53 Hosted Zone in which we will create the DNS records specified by <a href="#dns_name_common_portion"><code>dns_name_common_portion</code></a>. Only used if <a href="#dns_name_common_portion"><code>dns_name_common_portion</code></a> is non-empty.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="script_log_level" requirement="optional" type="string">
<HclListItemDescription>

The log level to use with the rolling deploy script. It can be useful to set this to DEBUG when troubleshooting the script.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;INFO&quot;"/>
</HclListItem>

<HclListItem name="security_group_prefix" requirement="optional" type="string">
<HclListItemDescription>

The name prefix that is used for the security group

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;server-group-&quot;"/>
</HclListItem>

<HclListItem name="skip_health_check" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, skip the health check, and start a rolling deployment without waiting for the server group to be in a healthy state. This is primarily useful if the server group is in a broken state and you want to force a deployment anyway.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="skip_rolling_deploy" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, skip the rolling deployment, and destroy all the servers immediately. You should typically NOT enable this in prod, as it will cause downtime! The main use case for this flag is to make testing and cleanup easier. It can also be handy in case the rolling deployment code has a bug.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="ssh_port" requirement="optional" type="number">
<HclListItemDescription>

The port to use for SSH access.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="22"/>
</HclListItem>

<HclListItem name="tenancy" requirement="optional" type="string">
<HclListItemDescription>

The tenancy of each server. Must be one of: default, dedicated, or host.

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

The User Data script to run on each server when it is booting. If you need to pass gzipped, base64-encoded data (e.g., for a cloud-init script), use <a href="#user_data_base64"><code>user_data_base64</code></a> instead.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="user_data_base64" requirement="optional" type="string">
<HclListItemDescription>

The base64-encoded User Data script to run on each server when it is booting. This can be used to pass binary User Data, such as a gzipped cloud-init script. If you wish to pass in plain text (e.g., typical Bash Script) for User Data, use <a href="#user_data"><code>user_data</code></a> instead.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="wait_for" requirement="optional" type="string">
<HclListItemDescription>

By passing a value to this variable, you can effectively tell this module to wait to deploy until the given variable's value is resolved, which is a way to require that this module depend on some other module. Note that the actual value of this variable doesn't matter.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="wait_for_capacity_timeout" requirement="optional" type="string">
<HclListItemDescription>

A maximum duration to wait for each server to be healthy before timing out (e.g. 10m). Valid units of time are: s, m, h.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;10m&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="dns_names">
</HclListItem>

<HclListItem name="ebs_volume_ids">
</HclListItem>

<HclListItem name="eni_elastic_ips">
</HclListItem>

<HclListItem name="eni_private_ips">
</HclListItem>

<HclListItem name="iam_instance_profile_name">
</HclListItem>

<HclListItem name="iam_role_arn">
</HclListItem>

<HclListItem name="iam_role_id">
</HclListItem>

<HclListItem name="rolling_deployment_done">
<HclListItemDescription>

Other modules can depend on this variable to ensure those modules only deploy after this module is done deploying. Note that the actual value of this output can be ignored.

</HclListItemDescription>
</HclListItem>

<HclListItem name="security_group_id">
</HclListItem>

<HclListItem name="server_asg_names">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-asg/tree/v1.1.0/modules/server-group/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-asg/tree/v1.1.0/modules/server-group/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-asg/tree/v1.1.0/modules/server-group/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "fbbaf399888ba478696b4360888f6250"
}
##DOCS-SOURCER-END -->
