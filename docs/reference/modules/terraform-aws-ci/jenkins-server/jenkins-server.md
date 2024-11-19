---
title: "Jenkins server"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="CI Modules" version="0.59.2" lastModifiedVersion="0.58.0"/>

# Jenkins server

<a href="https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.2/modules/jenkins-server" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.58.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module can be used to deploy [Jenkins CI server](https://jenkins.io) in AWS. It creates the following resources:

*   An ASG to run Jenkins and automatically redeploy it if it crashes
*   An EBS volume for the Jenkins data directory that persists between redeploys
*   An ALB to route traffic to Jenkins
*   A Route 53 DNS A record for Jenkins pointing at the ALB

Under the hood, we are using the [server-group module](https://github.com/gruntwork-io/terraform-aws-asg/tree/main/modules/server-group)
to run an ASG for Jenkins that can correctly reattach an EBS volume.

## Example code

*   Check out the [jenkins example](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.2/examples/jenkins) for working sample code.
*   See [vars.tf](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.2/modules/jenkins-server/vars.tf) for all parameters you can configure on this module.

## Jenkins AMI

See the [install-jenkins module](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.2/modules/install-jenkins) for a way to create an AMI with Jenkins installed and a
script you can run in User Data to start Jenkins while the server is booting.

## Backing up Jenkins

See the [ec2-backup module](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.2/modules/ec2-backup) for an automatic way to take scheduled backups of Jenkins and its EBS
volume.

## IAM permissions

This module assigns an IAM role to the Jenkins server and exports the ID of the IAM role. To give your Jenkins server
IAM permissions—e.g., so you can use the server to automatically deploy changes into your AWS account—you can attach
inline permissions to the IAM role using the [aws_iam_role_policy
resource](https://www.terraform.io/docs/providers/aws/r/iam_role_policy.html):

```hcl
module "jenkins" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-ci.git//modules/jenkins-server?ref=v1.0.8"

  # ... (params ommitted) ...
}

resource "aws_iam_role_policy" "example" {
  role   = "${module.jenkins.jenkins_iam_role_id}"
  policy = "${data.aws_iam_policy_document.example.json}"
}

data "aws_iam_policy_document" "example" {
  statement {
    effect    = "Allow"
    actions   = ["s3:*"]
    resources = "*"
  }
}
```

You can also attach managed policies (not inline) to the IAM role using the [aws_iam_role_policy_attachment
resource](https://www.terraform.io/docs/providers/awas/r/iam_role_policy_attachment.html):

```hcl
module "jenkins" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-ci.git//modules/jenkins-server?ref=v1.0.8"

  # ... (params ommitted) ...
}

resource "aws_iam_policy" "example" {
  name_prefix = "example-iam-policy"
  policy      = "${data.aws_iam_policy_document.example.json}"
}

resource "aws_iam_role_policy_attachment" "example" {
  role       = "${module.jenkins.jenkins_iam_role_id}"
  policy_arn = aws_iam_policy.example.arn
}

data "aws_iam_policy_document" "example" {
  statement {
    effect    = "Allow"
    actions   = ["s3:*"]
    resources = "*"
  }
}
```

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S JENKINS-SERVER MODULE
# ------------------------------------------------------------------------------------------------------

module "jenkins_server" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-ci.git//modules/jenkins-server?ref=v0.59.2"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The domain name for which there is an ACM cert in this region that can be
  # used to do SSL termination for the Jenkins ALB (e.g. *.foo.com).
  acm_cert_domain_name = <string>

  # The IDs of the subnets where the Jenkins ALB should be deployed (e.g.,
  # subnet-abcd1234).
  alb_subnet_ids = <list(string)>

  # The ID of the Amazon Machine Image (AMI) to run for Jenkins (e.g.,
  # ami-abcd1234).
  ami_id = <string>

  # The AWS region to deploy to (e.g. us-east-1).
  aws_region = <string>

  # The type of EC2 Instance to run (e.g. t2.micro).
  instance_type = <string>

  # The ID of the subnet where Jenkins should be deployed (e.g.,
  # subnet-abcd1234).
  jenkins_subnet_id = <string>

  # The name for the Jenkins ASG and to namespace all the resources created by
  # this module.
  name = <string>

  # The id of the VPC where Jenkins should be deployed (e.g. vpc-abcd1234).
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of additional ALB target group ARNs. The Jenkins server will be
  # registered in these groups, in addition to the ALB created by this module.
  # Allows for custom and specialised routing of certain Jenkins paths, for
  # example WebHooks.
  additional_target_group_arns = []

  # If true, the ALB will drop invalid headers. Elastic Load Balancing requires
  # that message header names contain only alphanumeric characters and hyphens.
  alb_drop_invalid_header_fields = false

  # The port the Jenkins ALB should listen on for HTTP requests.
  alb_http_port = 80

  # The port the Jenkins ALB should listen on for HTTPS requests.
  alb_https_port = 443

  # The CIDR blocks from which the Jenkins ALB will allow HTTP/HTTPS requests.
  # At least one of allow_incoming_http_from_cidr_blocks or
  # allow_incoming_http_from_security_group_ids must be non-empty, or the ALB
  # won't be able to receive any requests!
  allow_incoming_http_from_cidr_blocks = []

  # The Security Group IDs from which the Jenkins ALB will allow HTTP/HTTPS
  # requests. At least one of allow_incoming_http_from_cidr_blocks or
  # allow_incoming_http_from_security_group_ids must be non-empty, or the ALB
  # won't be able to receive any requests!
  allow_incoming_http_from_security_group_ids = []

  # A list of IP address ranges in CIDR format from which SSH access will be
  # permitted. Attempts to access the bastion host from all other IP addresses
  # will be blocked.
  allow_ssh_from_cidr_blocks = []

  # The IDs of security groups from which SSH connections will be allowed.
  allow_ssh_from_security_group_ids = []

  # If set to true, create a DNS A Record for the Jenkins ALB. Make sure to set
  # var.hosted_zone_id and var.domain_name as well.
  create_route53_entry = false

  # A list of custom tags to apply to Jenkins and all other resources.
  custom_tags = {}

  # How many servers to deploy at a time during a rolling deployment. For
  # example, if you have 10 servers and set this variable to 2, then the
  # deployment will a) undeploy 2 servers, b) deploy 2 replacement servers, c)
  # repeat the process for the next 2 servers.
  deployment_batch_size = 1

  # The maximum number of times to retry the Load Balancer's Health Check before
  # giving up on a rolling deployment of Jenkins. Only used if
  # var.skip_health_check is false.
  deployment_health_check_max_retries = 60

  # The amount of time in seconds to wait between checking the status of the
  # Load Balancer's Health Check status for a Jenkins instance that is being
  # deployed or redeployed. Only used if var.skip_health_check is false
  deployment_health_check_retry_interval_in_seconds = 10

  # The domain name for which to create a DNS A Record (e.g., foo.jenkins.com).
  # Only used if var.create_route53_entry is true.
  domain_name = "replace-me"

  # Set to true to make Jenkins EBS-optimized.
  ebs_optimized = false

  # Set to true to use an encrypted EBS volume for the Jenkins data dir.
  ebs_volume_encrypted = true

  # The amount of provisioned IOPS for the EBS volume to use for the Jenkins
  # data dir. If ebs_volume_type is set to io1, you must set this parameter; if
  # ebs_volume_type is set to anything else, you must NOT set this parameter.
  ebs_volume_iops = null

  # The size, in GB, of the EBS volume to use for the Jenkins data dir.
  ebs_volume_size = 100

  # The ID of an EBS snapshot to base the volume off of. This is used to restore
  # from an existing EBS volume rather than launching from scratch.
  ebs_volume_snapshot_id = null

  # The type of EBS volume to use for the Jenkins data dir. Must be one of:
  # standard, gp2, or io1.
  ebs_volume_type = "gp2"

  # If true, deletion of the ALB will be disabled via the AWS API. This will
  # prevent Terraform from deleting the load balancer.
  enable_alb_deletion_protection = false

  # How long, in seconds, to wait after Jenkins deploys before checking its
  # health.
  health_check_grace_period = 120

  # How many load balancer health checks Jenkins must pass before it is
  # considered healthy.
  health_check_healthy_threshold = 2

  # How often, in seconds, the load balancer should conduct health checks on
  # Jenkins.
  health_check_interval = 15

  # The path on the Jenins server the ALB should use for health checks.
  health_check_path = "/login"

  # The status code the ALB should expect for health checks.
  health_check_status_code = "200"

  # The maximum time, in seconds, Jenkins has to respond to a load balancer
  # health check before it times out.
  health_check_timeout = 10

  # How many load balancer health checks Jenkins must fail before it is
  # considered unhealthy.
  health_check_unhealthy_threshold = 10

  # The ID of the Route 53 Hosted Zone in which to create a DNS A Record. Only
  # used if var.create_route53_entry is true.
  hosted_zone_id = "replace-me"

  # Set to true to make the Jenkins ALB an internal ALB that cannot be accessed
  # from the public Internet. We strongly recommend setting this to true to keep
  # Jenkins more secure.
  is_internal_alb = true

  # The amount time for the load balancer will wait between changing Jenkins'
  # status from draining to unused when redeploying.
  jenkins_deregistration_delay = 10

  # The port Jenkins should listen on for HTTP requests.
  jenkins_http_port = 8080

  # The protocol the load balancer should use when talking to Jenkins.
  jenkins_protocol = "HTTP"

  # The name of an EC2 Key Pair to associate with each server for SSH access.
  # Set to an empty string to not associate a Key Pair.
  key_pair_name = null

  # After this number of days, Jenkins ALB access logs should be transitioned
  # from S3 to Glacier. Enter 0 to never archive log data.
  num_days_after_which_archive_log_data = 30

  # After this number of days, Jenkins ALB access logs should be deleted from
  # S3. Enter 0 to never delete log data.
  num_days_after_which_delete_log_data = 0

  # Set to true to enable redirect of all requests from http to https. Ideally,
  # this variable wouldn't be necessary, but because Terraform can't interpolate
  # dynamic variables in counts, we must explicitly include this. Enter true or
  # false.
  redirect_http_to_https = false

  # Whether the root volume for Jenkins should be encrypted.
  root_block_device_encrypted = true

  # The name of the root volume
  root_block_device_name = "/dev/sda1"

  # The size, in GB, of the root volume for Jenkins.
  root_block_device_volume_size = 100

  # The type of the root volume for Jenkins. Must be one of: standard, gp2, or
  # io1.
  root_block_device_volume_type = "standard"

  # The log level to use with the rolling deploy script. It can be useful to set
  # this to DEBUG when troubleshooting Jenkins redeploys.
  script_log_level = "INFO"

  # Set to 'true' to allow the server group role to assume itself. See
  # https://aws.amazon.com/blogs/security/announcing-an-update-to-iam-role-trust-policy-behavior/
  server_iam_role_allow_self_assume = false

  # Maximum session duration (in seconds) that you want to set for the server
  # group role. This setting can have a value from 1 hour to 12 hours. Default
  # is 1 hour (3600s).
  server_iam_role_max_session_duration = 3600

  # If set to true, skip the health check, and start a rolling deployment of
  # Jenkins without waiting for it to initially be in a healthy state. This is
  # primarily useful if the server group is in a broken state and you want to
  # force a deployment anyway.
  skip_health_check = false

  # If set to true, skip the rolling deployment, and destroy all the servers
  # immediately. You should typically NOT enable this in prod, as it will cause
  # downtime! The main use case for this flag is to make testing and cleanup
  # easier. It can also be handy in case the rolling deployment code has a bug.
  skip_rolling_deploy = false

  # The aws predefined policy for alb. A List of policies can be found here:
  # https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html#describe-ssl-policies
  ssl_policy = "ELBSecurityPolicy-TLS-1-1-2017-01"

  # The tenancy to use for Jenkins. Must be one of: default, dedicated, or host.
  tenancy = "default"

  # Set this variable to true to enable the use of Instance Metadata Service
  # Version 1 in this module's aws_launch_template. Note that while IMDsv2 is
  # preferred due to its special security hardening, we allow this in order to
  # support the use case of AMIs built outside of these modules that depend on
  # IMDSv1.
  use_imdsv1 = true

  # The User Data script to run on the Jenkins server when it is booting. If you
  # need to pass gzipped, base64-encoded data (e.g., for a cloud-init script),
  # use var.user_data_base64 instead.
  user_data = null

  # The base64-encoded User Data script to run on the Jenkins server when it is
  # booting. This can be used to pass binary User Data, such as a gzipped
  # cloud-init script. If you wish to pass in plain text (e.g., typical Bash
  # Script) for User Data, use var.user_data instead.
  user_data_base64 = null

  # A maximum duration to wait for each server to be healthy before timing out
  # (e.g. 10m). Valid units of time are: s, m, h.
  wait_for_capacity_timeout = "10m"

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S JENKINS-SERVER MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-ci.git//modules/jenkins-server?ref=v0.59.2"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The domain name for which there is an ACM cert in this region that can be
  # used to do SSL termination for the Jenkins ALB (e.g. *.foo.com).
  acm_cert_domain_name = <string>

  # The IDs of the subnets where the Jenkins ALB should be deployed (e.g.,
  # subnet-abcd1234).
  alb_subnet_ids = <list(string)>

  # The ID of the Amazon Machine Image (AMI) to run for Jenkins (e.g.,
  # ami-abcd1234).
  ami_id = <string>

  # The AWS region to deploy to (e.g. us-east-1).
  aws_region = <string>

  # The type of EC2 Instance to run (e.g. t2.micro).
  instance_type = <string>

  # The ID of the subnet where Jenkins should be deployed (e.g.,
  # subnet-abcd1234).
  jenkins_subnet_id = <string>

  # The name for the Jenkins ASG and to namespace all the resources created by
  # this module.
  name = <string>

  # The id of the VPC where Jenkins should be deployed (e.g. vpc-abcd1234).
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of additional ALB target group ARNs. The Jenkins server will be
  # registered in these groups, in addition to the ALB created by this module.
  # Allows for custom and specialised routing of certain Jenkins paths, for
  # example WebHooks.
  additional_target_group_arns = []

  # If true, the ALB will drop invalid headers. Elastic Load Balancing requires
  # that message header names contain only alphanumeric characters and hyphens.
  alb_drop_invalid_header_fields = false

  # The port the Jenkins ALB should listen on for HTTP requests.
  alb_http_port = 80

  # The port the Jenkins ALB should listen on for HTTPS requests.
  alb_https_port = 443

  # The CIDR blocks from which the Jenkins ALB will allow HTTP/HTTPS requests.
  # At least one of allow_incoming_http_from_cidr_blocks or
  # allow_incoming_http_from_security_group_ids must be non-empty, or the ALB
  # won't be able to receive any requests!
  allow_incoming_http_from_cidr_blocks = []

  # The Security Group IDs from which the Jenkins ALB will allow HTTP/HTTPS
  # requests. At least one of allow_incoming_http_from_cidr_blocks or
  # allow_incoming_http_from_security_group_ids must be non-empty, or the ALB
  # won't be able to receive any requests!
  allow_incoming_http_from_security_group_ids = []

  # A list of IP address ranges in CIDR format from which SSH access will be
  # permitted. Attempts to access the bastion host from all other IP addresses
  # will be blocked.
  allow_ssh_from_cidr_blocks = []

  # The IDs of security groups from which SSH connections will be allowed.
  allow_ssh_from_security_group_ids = []

  # If set to true, create a DNS A Record for the Jenkins ALB. Make sure to set
  # var.hosted_zone_id and var.domain_name as well.
  create_route53_entry = false

  # A list of custom tags to apply to Jenkins and all other resources.
  custom_tags = {}

  # How many servers to deploy at a time during a rolling deployment. For
  # example, if you have 10 servers and set this variable to 2, then the
  # deployment will a) undeploy 2 servers, b) deploy 2 replacement servers, c)
  # repeat the process for the next 2 servers.
  deployment_batch_size = 1

  # The maximum number of times to retry the Load Balancer's Health Check before
  # giving up on a rolling deployment of Jenkins. Only used if
  # var.skip_health_check is false.
  deployment_health_check_max_retries = 60

  # The amount of time in seconds to wait between checking the status of the
  # Load Balancer's Health Check status for a Jenkins instance that is being
  # deployed or redeployed. Only used if var.skip_health_check is false
  deployment_health_check_retry_interval_in_seconds = 10

  # The domain name for which to create a DNS A Record (e.g., foo.jenkins.com).
  # Only used if var.create_route53_entry is true.
  domain_name = "replace-me"

  # Set to true to make Jenkins EBS-optimized.
  ebs_optimized = false

  # Set to true to use an encrypted EBS volume for the Jenkins data dir.
  ebs_volume_encrypted = true

  # The amount of provisioned IOPS for the EBS volume to use for the Jenkins
  # data dir. If ebs_volume_type is set to io1, you must set this parameter; if
  # ebs_volume_type is set to anything else, you must NOT set this parameter.
  ebs_volume_iops = null

  # The size, in GB, of the EBS volume to use for the Jenkins data dir.
  ebs_volume_size = 100

  # The ID of an EBS snapshot to base the volume off of. This is used to restore
  # from an existing EBS volume rather than launching from scratch.
  ebs_volume_snapshot_id = null

  # The type of EBS volume to use for the Jenkins data dir. Must be one of:
  # standard, gp2, or io1.
  ebs_volume_type = "gp2"

  # If true, deletion of the ALB will be disabled via the AWS API. This will
  # prevent Terraform from deleting the load balancer.
  enable_alb_deletion_protection = false

  # How long, in seconds, to wait after Jenkins deploys before checking its
  # health.
  health_check_grace_period = 120

  # How many load balancer health checks Jenkins must pass before it is
  # considered healthy.
  health_check_healthy_threshold = 2

  # How often, in seconds, the load balancer should conduct health checks on
  # Jenkins.
  health_check_interval = 15

  # The path on the Jenins server the ALB should use for health checks.
  health_check_path = "/login"

  # The status code the ALB should expect for health checks.
  health_check_status_code = "200"

  # The maximum time, in seconds, Jenkins has to respond to a load balancer
  # health check before it times out.
  health_check_timeout = 10

  # How many load balancer health checks Jenkins must fail before it is
  # considered unhealthy.
  health_check_unhealthy_threshold = 10

  # The ID of the Route 53 Hosted Zone in which to create a DNS A Record. Only
  # used if var.create_route53_entry is true.
  hosted_zone_id = "replace-me"

  # Set to true to make the Jenkins ALB an internal ALB that cannot be accessed
  # from the public Internet. We strongly recommend setting this to true to keep
  # Jenkins more secure.
  is_internal_alb = true

  # The amount time for the load balancer will wait between changing Jenkins'
  # status from draining to unused when redeploying.
  jenkins_deregistration_delay = 10

  # The port Jenkins should listen on for HTTP requests.
  jenkins_http_port = 8080

  # The protocol the load balancer should use when talking to Jenkins.
  jenkins_protocol = "HTTP"

  # The name of an EC2 Key Pair to associate with each server for SSH access.
  # Set to an empty string to not associate a Key Pair.
  key_pair_name = null

  # After this number of days, Jenkins ALB access logs should be transitioned
  # from S3 to Glacier. Enter 0 to never archive log data.
  num_days_after_which_archive_log_data = 30

  # After this number of days, Jenkins ALB access logs should be deleted from
  # S3. Enter 0 to never delete log data.
  num_days_after_which_delete_log_data = 0

  # Set to true to enable redirect of all requests from http to https. Ideally,
  # this variable wouldn't be necessary, but because Terraform can't interpolate
  # dynamic variables in counts, we must explicitly include this. Enter true or
  # false.
  redirect_http_to_https = false

  # Whether the root volume for Jenkins should be encrypted.
  root_block_device_encrypted = true

  # The name of the root volume
  root_block_device_name = "/dev/sda1"

  # The size, in GB, of the root volume for Jenkins.
  root_block_device_volume_size = 100

  # The type of the root volume for Jenkins. Must be one of: standard, gp2, or
  # io1.
  root_block_device_volume_type = "standard"

  # The log level to use with the rolling deploy script. It can be useful to set
  # this to DEBUG when troubleshooting Jenkins redeploys.
  script_log_level = "INFO"

  # Set to 'true' to allow the server group role to assume itself. See
  # https://aws.amazon.com/blogs/security/announcing-an-update-to-iam-role-trust-policy-behavior/
  server_iam_role_allow_self_assume = false

  # Maximum session duration (in seconds) that you want to set for the server
  # group role. This setting can have a value from 1 hour to 12 hours. Default
  # is 1 hour (3600s).
  server_iam_role_max_session_duration = 3600

  # If set to true, skip the health check, and start a rolling deployment of
  # Jenkins without waiting for it to initially be in a healthy state. This is
  # primarily useful if the server group is in a broken state and you want to
  # force a deployment anyway.
  skip_health_check = false

  # If set to true, skip the rolling deployment, and destroy all the servers
  # immediately. You should typically NOT enable this in prod, as it will cause
  # downtime! The main use case for this flag is to make testing and cleanup
  # easier. It can also be handy in case the rolling deployment code has a bug.
  skip_rolling_deploy = false

  # The aws predefined policy for alb. A List of policies can be found here:
  # https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html#describe-ssl-policies
  ssl_policy = "ELBSecurityPolicy-TLS-1-1-2017-01"

  # The tenancy to use for Jenkins. Must be one of: default, dedicated, or host.
  tenancy = "default"

  # Set this variable to true to enable the use of Instance Metadata Service
  # Version 1 in this module's aws_launch_template. Note that while IMDsv2 is
  # preferred due to its special security hardening, we allow this in order to
  # support the use case of AMIs built outside of these modules that depend on
  # IMDSv1.
  use_imdsv1 = true

  # The User Data script to run on the Jenkins server when it is booting. If you
  # need to pass gzipped, base64-encoded data (e.g., for a cloud-init script),
  # use var.user_data_base64 instead.
  user_data = null

  # The base64-encoded User Data script to run on the Jenkins server when it is
  # booting. This can be used to pass binary User Data, such as a gzipped
  # cloud-init script. If you wish to pass in plain text (e.g., typical Bash
  # Script) for User Data, use var.user_data instead.
  user_data_base64 = null

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

<HclListItem name="acm_cert_domain_name" requirement="required" type="string">
<HclListItemDescription>

The domain name for which there is an ACM cert in this region that can be used to do SSL termination for the Jenkins ALB (e.g. *.foo.com).

</HclListItemDescription>
</HclListItem>

<HclListItem name="alb_subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

The IDs of the subnets where the Jenkins ALB should be deployed (e.g., subnet-abcd1234).

</HclListItemDescription>
</HclListItem>

<HclListItem name="ami_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the Amazon Machine Image (AMI) to run for Jenkins (e.g., ami-abcd1234).

</HclListItemDescription>
</HclListItem>

<HclListItem name="aws_region" requirement="required" type="string">
<HclListItemDescription>

The AWS region to deploy to (e.g. us-east-1).

</HclListItemDescription>
</HclListItem>

<HclListItem name="instance_type" requirement="required" type="string">
<HclListItemDescription>

The type of EC2 Instance to run (e.g. t2.micro).

</HclListItemDescription>
</HclListItem>

<HclListItem name="jenkins_subnet_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the subnet where Jenkins should be deployed (e.g., subnet-abcd1234).

</HclListItemDescription>
</HclListItem>

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name for the Jenkins ASG and to namespace all the resources created by this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The id of the VPC where Jenkins should be deployed (e.g. vpc-abcd1234).

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="additional_target_group_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of additional ALB target group ARNs. The Jenkins server will be registered in these groups, in addition to the ALB created by this module. Allows for custom and specialised routing of certain Jenkins paths, for example WebHooks.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="alb_drop_invalid_header_fields" requirement="optional" type="bool">
<HclListItemDescription>

If true, the ALB will drop invalid headers. Elastic Load Balancing requires that message header names contain only alphanumeric characters and hyphens.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="alb_http_port" requirement="optional" type="number">
<HclListItemDescription>

The port the Jenkins ALB should listen on for HTTP requests.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="80"/>
</HclListItem>

<HclListItem name="alb_https_port" requirement="optional" type="number">
<HclListItemDescription>

The port the Jenkins ALB should listen on for HTTPS requests.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="443"/>
</HclListItem>

<HclListItem name="allow_incoming_http_from_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

The CIDR blocks from which the Jenkins ALB will allow HTTP/HTTPS requests. At least one of allow_incoming_http_from_cidr_blocks or allow_incoming_http_from_security_group_ids must be non-empty, or the ALB won't be able to receive any requests!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_incoming_http_from_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The Security Group IDs from which the Jenkins ALB will allow HTTP/HTTPS requests. At least one of allow_incoming_http_from_cidr_blocks or allow_incoming_http_from_security_group_ids must be non-empty, or the ALB won't be able to receive any requests!

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

<HclListItem name="create_route53_entry" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, create a DNS A Record for the Jenkins ALB. Make sure to set <a href="#hosted_zone_id"><code>hosted_zone_id</code></a> and <a href="#domain_name"><code>domain_name</code></a> as well.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A list of custom tags to apply to Jenkins and all other resources.

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

The maximum number of times to retry the Load Balancer's Health Check before giving up on a rolling deployment of Jenkins. Only used if <a href="#skip_health_check"><code>skip_health_check</code></a> is false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="deployment_health_check_retry_interval_in_seconds" requirement="optional" type="number">
<HclListItemDescription>

The amount of time in seconds to wait between checking the status of the Load Balancer's Health Check status for a Jenkins instance that is being deployed or redeployed. Only used if <a href="#skip_health_check"><code>skip_health_check</code></a> is false

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="10"/>
</HclListItem>

<HclListItem name="domain_name" requirement="optional" type="string">
<HclListItemDescription>

The domain name for which to create a DNS A Record (e.g., foo.jenkins.com). Only used if <a href="#create_route53_entry"><code>create_route53_entry</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;replace-me&quot;"/>
</HclListItem>

<HclListItem name="ebs_optimized" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to make Jenkins EBS-optimized.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="ebs_volume_encrypted" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to use an encrypted EBS volume for the Jenkins data dir.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="ebs_volume_iops" requirement="optional" type="string">
<HclListItemDescription>

The amount of provisioned IOPS for the EBS volume to use for the Jenkins data dir. If ebs_volume_type is set to io1, you must set this parameter; if ebs_volume_type is set to anything else, you must NOT set this parameter.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ebs_volume_size" requirement="optional" type="number">
<HclListItemDescription>

The size, in GB, of the EBS volume to use for the Jenkins data dir.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="100"/>
</HclListItem>

<HclListItem name="ebs_volume_snapshot_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of an EBS snapshot to base the volume off of. This is used to restore from an existing EBS volume rather than launching from scratch.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ebs_volume_type" requirement="optional" type="string">
<HclListItemDescription>

The type of EBS volume to use for the Jenkins data dir. Must be one of: standard, gp2, or io1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;gp2&quot;"/>
</HclListItem>

<HclListItem name="enable_alb_deletion_protection" requirement="optional" type="bool">
<HclListItemDescription>

If true, deletion of the ALB will be disabled via the AWS API. This will prevent Terraform from deleting the load balancer.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="health_check_grace_period" requirement="optional" type="number">
<HclListItemDescription>

How long, in seconds, to wait after Jenkins deploys before checking its health.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="120"/>
</HclListItem>

<HclListItem name="health_check_healthy_threshold" requirement="optional" type="number">
<HclListItemDescription>

How many load balancer health checks Jenkins must pass before it is considered healthy.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="2"/>
</HclListItem>

<HclListItem name="health_check_interval" requirement="optional" type="number">
<HclListItemDescription>

How often, in seconds, the load balancer should conduct health checks on Jenkins.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="15"/>
</HclListItem>

<HclListItem name="health_check_path" requirement="optional" type="string">
<HclListItemDescription>

The path on the Jenins server the ALB should use for health checks.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;/login&quot;"/>
</HclListItem>

<HclListItem name="health_check_status_code" requirement="optional" type="string">
<HclListItemDescription>

The status code the ALB should expect for health checks.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;200&quot;"/>
</HclListItem>

<HclListItem name="health_check_timeout" requirement="optional" type="number">
<HclListItemDescription>

The maximum time, in seconds, Jenkins has to respond to a load balancer health check before it times out.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="10"/>
</HclListItem>

<HclListItem name="health_check_unhealthy_threshold" requirement="optional" type="number">
<HclListItemDescription>

How many load balancer health checks Jenkins must fail before it is considered unhealthy.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="10"/>
</HclListItem>

<HclListItem name="hosted_zone_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the Route 53 Hosted Zone in which to create a DNS A Record. Only used if <a href="#create_route53_entry"><code>create_route53_entry</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;replace-me&quot;"/>
</HclListItem>

<HclListItem name="is_internal_alb" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to make the Jenkins ALB an internal ALB that cannot be accessed from the public Internet. We strongly recommend setting this to true to keep Jenkins more secure.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="jenkins_deregistration_delay" requirement="optional" type="number">
<HclListItemDescription>

The amount time for the load balancer will wait between changing Jenkins' status from draining to unused when redeploying.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="10"/>
</HclListItem>

<HclListItem name="jenkins_http_port" requirement="optional" type="number">
<HclListItemDescription>

The port Jenkins should listen on for HTTP requests.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="8080"/>
</HclListItem>

<HclListItem name="jenkins_protocol" requirement="optional" type="string">
<HclListItemDescription>

The protocol the load balancer should use when talking to Jenkins.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;HTTP&quot;"/>
</HclListItem>

<HclListItem name="key_pair_name" requirement="optional" type="string">
<HclListItemDescription>

The name of an EC2 Key Pair to associate with each server for SSH access. Set to an empty string to not associate a Key Pair.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="num_days_after_which_archive_log_data" requirement="optional" type="number">
<HclListItemDescription>

After this number of days, Jenkins ALB access logs should be transitioned from S3 to Glacier. Enter 0 to never archive log data.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="num_days_after_which_delete_log_data" requirement="optional" type="number">
<HclListItemDescription>

After this number of days, Jenkins ALB access logs should be deleted from S3. Enter 0 to never delete log data.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="redirect_http_to_https" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable redirect of all requests from http to https. Ideally, this variable wouldn't be necessary, but because Terraform can't interpolate dynamic variables in counts, we must explicitly include this. Enter true or false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="root_block_device_encrypted" requirement="optional" type="bool">
<HclListItemDescription>

Whether the root volume for Jenkins should be encrypted.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="root_block_device_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the root volume

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;/dev/sda1&quot;"/>
</HclListItem>

<HclListItem name="root_block_device_volume_size" requirement="optional" type="number">
<HclListItemDescription>

The size, in GB, of the root volume for Jenkins.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="100"/>
</HclListItem>

<HclListItem name="root_block_device_volume_type" requirement="optional" type="string">
<HclListItemDescription>

The type of the root volume for Jenkins. Must be one of: standard, gp2, or io1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;standard&quot;"/>
</HclListItem>

<HclListItem name="script_log_level" requirement="optional" type="string">
<HclListItemDescription>

The log level to use with the rolling deploy script. It can be useful to set this to DEBUG when troubleshooting Jenkins redeploys.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;INFO&quot;"/>
</HclListItem>

<HclListItem name="server_iam_role_allow_self_assume" requirement="optional" type="bool">
<HclListItemDescription>

Set to 'true' to allow the server group role to assume itself. See https://aws.amazon.com/blogs/security/announcing-an-update-to-iam-role-trust-policy-behavior/

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="server_iam_role_max_session_duration" requirement="optional" type="number">
<HclListItemDescription>

Maximum session duration (in seconds) that you want to set for the server group role. This setting can have a value from 1 hour to 12 hours. Default is 1 hour (3600s).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="3600"/>
</HclListItem>

<HclListItem name="skip_health_check" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, skip the health check, and start a rolling deployment of Jenkins without waiting for it to initially be in a healthy state. This is primarily useful if the server group is in a broken state and you want to force a deployment anyway.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="skip_rolling_deploy" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, skip the rolling deployment, and destroy all the servers immediately. You should typically NOT enable this in prod, as it will cause downtime! The main use case for this flag is to make testing and cleanup easier. It can also be handy in case the rolling deployment code has a bug.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="ssl_policy" requirement="optional" type="string">
<HclListItemDescription>

The aws predefined policy for alb. A List of policies can be found here: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html#describe-ssl-policies

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ELBSecurityPolicy-TLS-1-1-2017-01&quot;"/>
</HclListItem>

<HclListItem name="tenancy" requirement="optional" type="string">
<HclListItemDescription>

The tenancy to use for Jenkins. Must be one of: default, dedicated, or host.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;default&quot;"/>
</HclListItem>

<HclListItem name="use_imdsv1" requirement="optional" type="bool">
<HclListItemDescription>

Set this variable to true to enable the use of Instance Metadata Service Version 1 in this module's aws_launch_template. Note that while IMDsv2 is preferred due to its special security hardening, we allow this in order to support the use case of AMIs built outside of these modules that depend on IMDSv1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="user_data" requirement="optional" type="string">
<HclListItemDescription>

The User Data script to run on the Jenkins server when it is booting. If you need to pass gzipped, base64-encoded data (e.g., for a cloud-init script), use <a href="#user_data_base64"><code>user_data_base64</code></a> instead.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="user_data_base64" requirement="optional" type="string">
<HclListItemDescription>

The base64-encoded User Data script to run on the Jenkins server when it is booting. This can be used to pass binary User Data, such as a gzipped cloud-init script. If you wish to pass in plain text (e.g., typical Bash Script) for User Data, use <a href="#user_data"><code>user_data</code></a> instead.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="wait_for_capacity_timeout" requirement="optional" type="string">
<HclListItemDescription>

A maximum duration to wait for each server to be healthy before timing out (e.g. 10m). Valid units of time are: s, m, h.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;10m&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="alb_arn">
</HclListItem>

<HclListItem name="alb_dns_name">
</HclListItem>

<HclListItem name="alb_hosted_zone_id">
</HclListItem>

<HclListItem name="alb_http_listener_arns">
</HclListItem>

<HclListItem name="alb_https_listener_acm_cert_arns">
</HclListItem>

<HclListItem name="alb_https_listener_non_acm_cert_arns">
</HclListItem>

<HclListItem name="alb_listener_arns">
</HclListItem>

<HclListItem name="alb_name">
</HclListItem>

<HclListItem name="alb_security_group_id">
</HclListItem>

<HclListItem name="jenkins_asg_name">
</HclListItem>

<HclListItem name="jenkins_domain_name">
</HclListItem>

<HclListItem name="jenkins_ebs_volume_id">
</HclListItem>

<HclListItem name="jenkins_iam_role_arn">
</HclListItem>

<HclListItem name="jenkins_iam_role_id">
</HclListItem>

<HclListItem name="jenkins_security_group_id">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.2/modules/jenkins-server/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.2/modules/jenkins-server/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.59.2/modules/jenkins-server/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "9b8d5a893027d8777a8ecf9e5910a155"
}
##DOCS-SOURCER-END -->
