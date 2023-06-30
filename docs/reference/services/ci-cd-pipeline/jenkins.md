---
type: "service"
name: "Jenkins"
description: "Deploy Jenkins CI Server on AWS."
category: "ci-cd"
cloud: "aws"
tags: ["jenkins","ec2","ci","cd","ci-cd"]
license: "gruntwork"
built-with: "terraform, bash, packer"
title: "Jenkins CI Server"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.104.14" lastModifiedVersion="0.104.8"/>

# Jenkins CI Server

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/mgmt/jenkins" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=mgmt%2Fjenkins" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>

## Overview

This service contains code to deploy [Jenkins CI Server](https://jenkins.io/) on AWS.

![Jenkins architecture](/img/reference/services/ci-cd-pipeline/jenkins-architecture.png)

## Features

*   Deploy Jenkins CI Server
*   Run Jenkins in an Auto Scaling Group for high availability
*   Store the `JENKINS_HOME` directory in an EBS Volume
*   Take nightly snapshots of the EBS Volume using the `ec2-backup` scheduled Lambda function
*   Run an ALB in front of Jenkins so it’s not accessible directly to users
*   Configure DNS in Route 53 and TLS in AWS Certificate Manager (ACM)
*   Send all logs and metrics to CloudWatch
*   Configure alerts in CloudWatch for CPU, memory, and disk space usage
*   Manage SSH access with IAM groups using `ssh-grunt`
*   Manage deployment permissions for the server using IAM roles
*   OS hardening, including `fail2ban`, `ntp`, `auto-update`, `ip-lockdown`, and more

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

*   [CI/ CD Core Concepts](https://docs.gruntwork.io/guides/build-it-yourself/pipelines/core-concepts/why-is-it-important-to-have-ci-cds):
    An overview of the core concepts you need to understand what a typical CI/CD pipeline entails for application and
    infrastructure code, including a sample workflow, infrastructure to support CI/CD, an threat models to consider to
    protect your infrastructure.

*   [Jenkins Documentation](https://jenkins.io/doc/): The official documentation for Jenkins.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

*   [How to configure a production-grade CI/CD workflow for application and infrastructure code](https://docs.gruntwork.io/guides/build-it-yourself/pipelines/):
    step-by-step guide on how to configure CI / CD for your apps and infrastructure.


## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S JENKINS MODULE
# ------------------------------------------------------------------------------------------------------

module "jenkins" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/jenkins?ref=v0.104.14"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The domain name used for an SSL certificate issued by the Amazon Certificate
  # Manager (ACM).
  acm_ssl_certificate_domain = <string>

  # The IDs of the subnets in which to deploy the ALB that runs in front of
  # Jenkins. Must be subnets in var.vpc_id.
  alb_subnet_ids = <list(string)>

  # The ID of the AMI to run on the Jenkins server. This should be the AMI build
  # from the Packer template jenkins-ubuntu.json. One of var.ami or
  # var.ami_filters is required. Set to null if looking up the ami with filters.
  ami = <string>

  # Properties on the AMI that can be used to lookup a prebuilt AMI for use with
  # Jenkins. You can build the AMI using the Packer template
  # jenkins-ubuntu.json. Only used if var.ami is null. One of var.ami or
  # var.ami_filters is required. Set to null if passing the ami ID directly.
  ami_filters = <object(
    owners = list(string)
    filters = list(object(
      name   = string
      values = list(string)
    ))
  )>

  # The domain name for the DNS A record to add for Jenkins (e.g.
  # jenkins.foo.com). Must be in the domain managed by var.hosted_zone_id.
  domain_name = <string>

  # The ID of the Route 53 Hosted Zone in which to create a DNS A record for
  # Jenkins.
  hosted_zone_id = <string>

  # The instance type to use for the Jenkins server (e.g. t2.medium)
  instance_type = <string>

  # The ID of the subnet in which to deploy Jenkins. Must be a subnet in
  # var.vpc_id.
  jenkins_subnet_id = <string>

  # The amount of memory to give Jenkins (e.g., 1g or 512m). Used for the -Xms
  # and -Xmx settings.
  memory = <string>

  # The ID of the VPC in which to deploy Jenkins
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and
  # disk space usage) should send notifications. Also used for the alarms if the
  # Jenkins backup job fails.
  alarms_sns_topic_arn = []

  # The IP address ranges in CIDR format from which to allow incoming HTTP
  # requests to Jenkins.
  allow_incoming_http_from_cidr_blocks = []

  # The IDs of security groups from which to allow incoming HTTP requests to
  # Jenkins.
  allow_incoming_http_from_security_group_ids = []

  # The IP address ranges in CIDR format from which to allow incoming SSH
  # requests to Jenkins.
  allow_ssh_from_cidr_blocks = []

  # The IDs of security groups from which to allow incoming SSH requests to
  # Jenkins.
  allow_ssh_from_security_group_ids = []

  # How often, in seconds, the backup job is expected to run. This is the same
  # as var.backup_job_schedule_expression, but unfortunately, Terraform offers
  # no way to convert rate expressions to seconds. We add a CloudWatch alarm
  # that triggers if the value of var.backup_job_metric_name and
  # var.backup_job_metric_namespace isn't updated within this time period, as
  # that indicates the backup failed to run.
  backup_job_alarm_period = 86400

  # The name for the CloudWatch Metric the AWS lambda backup job will increment
  # every time the job completes successfully.
  backup_job_metric_name = "jenkins-backup-job"

  # The namespace for the CloudWatch Metric the AWS lambda backup job will
  # increment every time the job completes successfully.
  backup_job_metric_namespace = "Custom/Jenkins"

  # A cron or rate expression that specifies how often to take a snapshot of the
  # Jenkins server for backup purposes. See
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html
  # for syntax details.
  backup_job_schedule_expression = "rate(1 day)"

  # Set to true to backup the Jenkins Server using AWS Data Lifecycle Management
  # Policies.
  backup_using_dlm = true

  # Set to true to backup the Jenkins Server using a Scheduled Lambda Function.
  backup_using_lambda = false

  # The list of IAM actions this Jenkins server should be allowed to do: e.g.,
  # ec2:*, s3:*, etc. This should be the list of IAM permissions Jenkins needs
  # in this AWS account to run builds. These permissions will be added to the
  # server's IAM role for all resources ('*').
  build_permission_actions = []

  # Cloud init scripts to run on the Jenkins server when it is booting. See the
  # part blocks in
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

  # Set to true to create a public DNS A record in Route53 for Jenkins.
  create_route53_entry = true

  # A list of custom tags to apply to Jenkins and all other resources.
  custom_tags = {}

  # The default OS user for the Jenkins AMI. For AWS Ubuntu AMIs, which is what
  # the Packer template in jenkins-ubunutu.json uses, the default OS user is
  # 'ubuntu'.
  default_user = "ubuntu"

  # How often this lifecycle policy should be evaluated, in hours.
  dlm_backup_job_schedule_interval = 24

  # The name of the data lifecyle management schedule
  dlm_backup_job_schedule_name = "daily-last-two-weeks"

  # How many snapshots to keep. Must be an integer between 1 and 1000.
  dlm_backup_job_schedule_number_of_snapshots_to_retain = 15

  # A list of times in 24 hour clock format that sets when the lifecyle policy
  # should be evaluated. Max of 1.
  dlm_backup_job_schedule_times = ["03:00"]

  # The ARN of the KMS key used for encrypting the Jenkins EBS volume. The
  # module will grant Jenkins permission to use this key.
  ebs_kms_key_arn = null

  # Whether or not the provide EBS KMS key ARN is a key alias. If providing the
  # key ID, leave this set to false.
  ebs_kms_key_arn_is_alias = false

  # Set to true to enable several basic CloudWatch alarms around CPU usage,
  # memory usage, and disk space usage. If set to true, make sure to specify SNS
  # topics to send notifications to using var.alarms_sns_topic_arn.
  enable_cloudwatch_alarms = true

  # Set to true to add AIM permissions to send logs to CloudWatch. This is
  # useful in combination with
  # https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/cloudwatch-log-aggregation-scripts
  # to do log aggregation in CloudWatch.
  enable_cloudwatch_log_aggregation = true

  # Set to true to add IAM permissions to send custom metrics to CloudWatch.
  # This is useful in combination with
  # https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent
  # to get memory and disk metrics in CloudWatch for your Jenkins server.
  enable_cloudwatch_metrics = true

  # Enable ip-lockdown to block access to the instance metadata. Defaults to
  # true.
  enable_ip_lockdown = true

  # Set to true to add IAM permissions for ssh-grunt
  # (https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ssh-grunt),
  # which will allow you to manage SSH access via IAM groups.
  enable_ssh_grunt = true

  # A list of IAM role ARNs in other AWS accounts that Jenkins will be able to
  # assume to do automated deployment in those accounts.
  external_account_auto_deploy_iam_role_arns = []

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

  # Set to true to make the Jenkins ALB an internal ALB that cannot be accessed
  # from the public Internet. We strongly recommend setting this to true to keep
  # Jenkins more secure.
  is_internal_alb = true

  # The OS device name where the Jenkins EBS volume should be attached
  jenkins_device_name = "xvdh"

  # The OS path where the Jenkins EBS volume should be mounted
  jenkins_mount_point = "/jenkins"

  # The OS user that should be used to run Jenkins
  jenkins_user = "jenkins"

  # Sets how the backup job alarm should handle entering the INSUFFICIENT_DATA
  # state. Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  jenkins_volume_alarm_treat_missing_data = "missing"

  # Set to true to encrypt the Jenkins EBS volume.
  jenkins_volume_encrypted = true

  # The amount of disk space, in GB, to allocate for the EBS volume used by the
  # Jenkins server.
  jenkins_volume_size = 200

  # The type of volume to use for the EBS volume used by the Jenkins server.
  # Must be one of: standard, gp2, io1, sc1, or st1.
  jenkins_volume_type = "gp2"

  # The name of a Key Pair that can be used to SSH to the Jenkins server. Leave
  # blank if you don't want to enable Key Pair auth.
  keypair_name = null

  # Enter the name of the Jenkins server
  name = "jenkins"

  # The type of volume to use for the root disk for Jenkins. Must be one of:
  # standard, gp2, io1, sc1, or st1.
  root_block_device_volume_type = "gp2"

  # The amount of disk space, in GB, to allocate for the root volume of this
  # server. Note that all of Jenkins' data is stored on a separate EBS Volume
  # (see var.jenkins_volume_size), so this root volume is primarily used for the
  # OS, temp folders, apps, etc.
  root_volume_size = 100

  # When true, precreate the CloudWatch Log Group to use for log aggregation
  # from the EC2 instances. This is useful if you wish to customize the
  # CloudWatch Log Group with various settings such as retention periods and KMS
  # encryption. When false, the CloudWatch agent will automatically create a
  # basic log group to use.
  should_create_cloudwatch_log_group = true

  # If set to true, skip the health check, and start a rolling deployment of
  # Jenkins without waiting for it to initially be in a healthy state. This is
  # primarily useful if the server group is in a broken state and you want to
  # force a deployment anyway.
  skip_health_check = false

  # If you are using ssh-grunt, this is the name of the IAM group from which
  # users will be allowed to SSH to this Jenkins server. This value is only used
  # if enable_ssh_grunt=true.
  ssh_grunt_iam_group = "ssh-grunt-users"

  # If you are using ssh-grunt, this is the name of the IAM group from which
  # users will be allowed to SSH to this Jenkins server with sudo permissions.
  # This value is only used if enable_ssh_grunt=true.
  ssh_grunt_iam_group_sudo = "ssh-grunt-sudo-users"

  # The tenancy of this server. Must be one of: default, dedicated, or host.
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
# DEPLOY GRUNTWORK'S JENKINS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/jenkins?ref=v0.104.14"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The domain name used for an SSL certificate issued by the Amazon Certificate
  # Manager (ACM).
  acm_ssl_certificate_domain = <string>

  # The IDs of the subnets in which to deploy the ALB that runs in front of
  # Jenkins. Must be subnets in var.vpc_id.
  alb_subnet_ids = <list(string)>

  # The ID of the AMI to run on the Jenkins server. This should be the AMI build
  # from the Packer template jenkins-ubuntu.json. One of var.ami or
  # var.ami_filters is required. Set to null if looking up the ami with filters.
  ami = <string>

  # Properties on the AMI that can be used to lookup a prebuilt AMI for use with
  # Jenkins. You can build the AMI using the Packer template
  # jenkins-ubuntu.json. Only used if var.ami is null. One of var.ami or
  # var.ami_filters is required. Set to null if passing the ami ID directly.
  ami_filters = <object(
    owners = list(string)
    filters = list(object(
      name   = string
      values = list(string)
    ))
  )>

  # The domain name for the DNS A record to add for Jenkins (e.g.
  # jenkins.foo.com). Must be in the domain managed by var.hosted_zone_id.
  domain_name = <string>

  # The ID of the Route 53 Hosted Zone in which to create a DNS A record for
  # Jenkins.
  hosted_zone_id = <string>

  # The instance type to use for the Jenkins server (e.g. t2.medium)
  instance_type = <string>

  # The ID of the subnet in which to deploy Jenkins. Must be a subnet in
  # var.vpc_id.
  jenkins_subnet_id = <string>

  # The amount of memory to give Jenkins (e.g., 1g or 512m). Used for the -Xms
  # and -Xmx settings.
  memory = <string>

  # The ID of the VPC in which to deploy Jenkins
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and
  # disk space usage) should send notifications. Also used for the alarms if the
  # Jenkins backup job fails.
  alarms_sns_topic_arn = []

  # The IP address ranges in CIDR format from which to allow incoming HTTP
  # requests to Jenkins.
  allow_incoming_http_from_cidr_blocks = []

  # The IDs of security groups from which to allow incoming HTTP requests to
  # Jenkins.
  allow_incoming_http_from_security_group_ids = []

  # The IP address ranges in CIDR format from which to allow incoming SSH
  # requests to Jenkins.
  allow_ssh_from_cidr_blocks = []

  # The IDs of security groups from which to allow incoming SSH requests to
  # Jenkins.
  allow_ssh_from_security_group_ids = []

  # How often, in seconds, the backup job is expected to run. This is the same
  # as var.backup_job_schedule_expression, but unfortunately, Terraform offers
  # no way to convert rate expressions to seconds. We add a CloudWatch alarm
  # that triggers if the value of var.backup_job_metric_name and
  # var.backup_job_metric_namespace isn't updated within this time period, as
  # that indicates the backup failed to run.
  backup_job_alarm_period = 86400

  # The name for the CloudWatch Metric the AWS lambda backup job will increment
  # every time the job completes successfully.
  backup_job_metric_name = "jenkins-backup-job"

  # The namespace for the CloudWatch Metric the AWS lambda backup job will
  # increment every time the job completes successfully.
  backup_job_metric_namespace = "Custom/Jenkins"

  # A cron or rate expression that specifies how often to take a snapshot of the
  # Jenkins server for backup purposes. See
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html
  # for syntax details.
  backup_job_schedule_expression = "rate(1 day)"

  # Set to true to backup the Jenkins Server using AWS Data Lifecycle Management
  # Policies.
  backup_using_dlm = true

  # Set to true to backup the Jenkins Server using a Scheduled Lambda Function.
  backup_using_lambda = false

  # The list of IAM actions this Jenkins server should be allowed to do: e.g.,
  # ec2:*, s3:*, etc. This should be the list of IAM permissions Jenkins needs
  # in this AWS account to run builds. These permissions will be added to the
  # server's IAM role for all resources ('*').
  build_permission_actions = []

  # Cloud init scripts to run on the Jenkins server when it is booting. See the
  # part blocks in
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

  # Set to true to create a public DNS A record in Route53 for Jenkins.
  create_route53_entry = true

  # A list of custom tags to apply to Jenkins and all other resources.
  custom_tags = {}

  # The default OS user for the Jenkins AMI. For AWS Ubuntu AMIs, which is what
  # the Packer template in jenkins-ubunutu.json uses, the default OS user is
  # 'ubuntu'.
  default_user = "ubuntu"

  # How often this lifecycle policy should be evaluated, in hours.
  dlm_backup_job_schedule_interval = 24

  # The name of the data lifecyle management schedule
  dlm_backup_job_schedule_name = "daily-last-two-weeks"

  # How many snapshots to keep. Must be an integer between 1 and 1000.
  dlm_backup_job_schedule_number_of_snapshots_to_retain = 15

  # A list of times in 24 hour clock format that sets when the lifecyle policy
  # should be evaluated. Max of 1.
  dlm_backup_job_schedule_times = ["03:00"]

  # The ARN of the KMS key used for encrypting the Jenkins EBS volume. The
  # module will grant Jenkins permission to use this key.
  ebs_kms_key_arn = null

  # Whether or not the provide EBS KMS key ARN is a key alias. If providing the
  # key ID, leave this set to false.
  ebs_kms_key_arn_is_alias = false

  # Set to true to enable several basic CloudWatch alarms around CPU usage,
  # memory usage, and disk space usage. If set to true, make sure to specify SNS
  # topics to send notifications to using var.alarms_sns_topic_arn.
  enable_cloudwatch_alarms = true

  # Set to true to add AIM permissions to send logs to CloudWatch. This is
  # useful in combination with
  # https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/cloudwatch-log-aggregation-scripts
  # to do log aggregation in CloudWatch.
  enable_cloudwatch_log_aggregation = true

  # Set to true to add IAM permissions to send custom metrics to CloudWatch.
  # This is useful in combination with
  # https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent
  # to get memory and disk metrics in CloudWatch for your Jenkins server.
  enable_cloudwatch_metrics = true

  # Enable ip-lockdown to block access to the instance metadata. Defaults to
  # true.
  enable_ip_lockdown = true

  # Set to true to add IAM permissions for ssh-grunt
  # (https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ssh-grunt),
  # which will allow you to manage SSH access via IAM groups.
  enable_ssh_grunt = true

  # A list of IAM role ARNs in other AWS accounts that Jenkins will be able to
  # assume to do automated deployment in those accounts.
  external_account_auto_deploy_iam_role_arns = []

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

  # Set to true to make the Jenkins ALB an internal ALB that cannot be accessed
  # from the public Internet. We strongly recommend setting this to true to keep
  # Jenkins more secure.
  is_internal_alb = true

  # The OS device name where the Jenkins EBS volume should be attached
  jenkins_device_name = "xvdh"

  # The OS path where the Jenkins EBS volume should be mounted
  jenkins_mount_point = "/jenkins"

  # The OS user that should be used to run Jenkins
  jenkins_user = "jenkins"

  # Sets how the backup job alarm should handle entering the INSUFFICIENT_DATA
  # state. Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  jenkins_volume_alarm_treat_missing_data = "missing"

  # Set to true to encrypt the Jenkins EBS volume.
  jenkins_volume_encrypted = true

  # The amount of disk space, in GB, to allocate for the EBS volume used by the
  # Jenkins server.
  jenkins_volume_size = 200

  # The type of volume to use for the EBS volume used by the Jenkins server.
  # Must be one of: standard, gp2, io1, sc1, or st1.
  jenkins_volume_type = "gp2"

  # The name of a Key Pair that can be used to SSH to the Jenkins server. Leave
  # blank if you don't want to enable Key Pair auth.
  keypair_name = null

  # Enter the name of the Jenkins server
  name = "jenkins"

  # The type of volume to use for the root disk for Jenkins. Must be one of:
  # standard, gp2, io1, sc1, or st1.
  root_block_device_volume_type = "gp2"

  # The amount of disk space, in GB, to allocate for the root volume of this
  # server. Note that all of Jenkins' data is stored on a separate EBS Volume
  # (see var.jenkins_volume_size), so this root volume is primarily used for the
  # OS, temp folders, apps, etc.
  root_volume_size = 100

  # When true, precreate the CloudWatch Log Group to use for log aggregation
  # from the EC2 instances. This is useful if you wish to customize the
  # CloudWatch Log Group with various settings such as retention periods and KMS
  # encryption. When false, the CloudWatch agent will automatically create a
  # basic log group to use.
  should_create_cloudwatch_log_group = true

  # If set to true, skip the health check, and start a rolling deployment of
  # Jenkins without waiting for it to initially be in a healthy state. This is
  # primarily useful if the server group is in a broken state and you want to
  # force a deployment anyway.
  skip_health_check = false

  # If you are using ssh-grunt, this is the name of the IAM group from which
  # users will be allowed to SSH to this Jenkins server. This value is only used
  # if enable_ssh_grunt=true.
  ssh_grunt_iam_group = "ssh-grunt-users"

  # If you are using ssh-grunt, this is the name of the IAM group from which
  # users will be allowed to SSH to this Jenkins server with sudo permissions.
  # This value is only used if enable_ssh_grunt=true.
  ssh_grunt_iam_group_sudo = "ssh-grunt-sudo-users"

  # The tenancy of this server. Must be one of: default, dedicated, or host.
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

<HclListItem name="acm_ssl_certificate_domain" requirement="required" type="string">
<HclListItemDescription>

The domain name used for an SSL certificate issued by the Amazon Certificate Manager (ACM).

</HclListItemDescription>
</HclListItem>

<HclListItem name="alb_subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

The IDs of the subnets in which to deploy the ALB that runs in front of Jenkins. Must be subnets in <a href="#vpc_id"><code>vpc_id</code></a>.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ami" requirement="required" type="string">
<HclListItemDescription>

The ID of the AMI to run on the Jenkins server. This should be the AMI build from the Packer template jenkins-ubuntu.json. One of <a href="#ami"><code>ami</code></a> or <a href="#ami_filters"><code>ami_filters</code></a> is required. Set to null if looking up the ami with filters.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ami_filters" requirement="required" type="object(…)">
<HclListItemDescription>

Properties on the AMI that can be used to lookup a prebuilt AMI for use with Jenkins. You can build the AMI using the Packer template jenkins-ubuntu.json. Only used if <a href="#ami"><code>ami</code></a> is null. One of <a href="#ami"><code>ami</code></a> or <a href="#ami_filters"><code>ami_filters</code></a> is required. Set to null if passing the ami ID directly.

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

<HclListItem name="domain_name" requirement="required" type="string">
<HclListItemDescription>

The domain name for the DNS A record to add for Jenkins (e.g. jenkins.foo.com). Must be in the domain managed by <a href="#hosted_zone_id"><code>hosted_zone_id</code></a>.

</HclListItemDescription>
</HclListItem>

<HclListItem name="hosted_zone_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the Route 53 Hosted Zone in which to create a DNS A record for Jenkins.

</HclListItemDescription>
</HclListItem>

<HclListItem name="instance_type" requirement="required" type="string">
<HclListItemDescription>

The instance type to use for the Jenkins server (e.g. t2.medium)

</HclListItemDescription>
</HclListItem>

<HclListItem name="jenkins_subnet_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the subnet in which to deploy Jenkins. Must be a subnet in <a href="#vpc_id"><code>vpc_id</code></a>.

</HclListItemDescription>
</HclListItem>

<HclListItem name="memory" requirement="required" type="string">
<HclListItemDescription>

The amount of memory to give Jenkins (e.g., 1g or 512m). Used for the -Xms and -Xmx settings.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the VPC in which to deploy Jenkins

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="alarms_sns_topic_arn" requirement="optional" type="list(string)">
<HclListItemDescription>

The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications. Also used for the alarms if the Jenkins backup job fails.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_incoming_http_from_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

The IP address ranges in CIDR format from which to allow incoming HTTP requests to Jenkins.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_incoming_http_from_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of security groups from which to allow incoming HTTP requests to Jenkins.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_ssh_from_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

The IP address ranges in CIDR format from which to allow incoming SSH requests to Jenkins.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_ssh_from_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

The IDs of security groups from which to allow incoming SSH requests to Jenkins.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="backup_job_alarm_period" requirement="optional" type="number">
<HclListItemDescription>

How often, in seconds, the backup job is expected to run. This is the same as <a href="#backup_job_schedule_expression"><code>backup_job_schedule_expression</code></a>, but unfortunately, Terraform offers no way to convert rate expressions to seconds. We add a CloudWatch alarm that triggers if the value of <a href="#backup_job_metric_name"><code>backup_job_metric_name</code></a> and <a href="#backup_job_metric_namespace"><code>backup_job_metric_namespace</code></a> isn't updated within this time period, as that indicates the backup failed to run.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="86400"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   One day in seconds

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="backup_job_metric_name" requirement="optional" type="string">
<HclListItemDescription>

The name for the CloudWatch Metric the AWS lambda backup job will increment every time the job completes successfully.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;jenkins-backup-job&quot;"/>
</HclListItem>

<HclListItem name="backup_job_metric_namespace" requirement="optional" type="string">
<HclListItemDescription>

The namespace for the CloudWatch Metric the AWS lambda backup job will increment every time the job completes successfully.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;Custom/Jenkins&quot;"/>
</HclListItem>

<HclListItem name="backup_job_schedule_expression" requirement="optional" type="string">
<HclListItemDescription>

A cron or rate expression that specifies how often to take a snapshot of the Jenkins server for backup purposes. See https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html for syntax details.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;rate(1 day)&quot;"/>
</HclListItem>

<HclListItem name="backup_using_dlm" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to backup the Jenkins Server using AWS Data Lifecycle Management Policies.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="backup_using_lambda" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to backup the Jenkins Server using a Scheduled Lambda Function.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="build_permission_actions" requirement="optional" type="list(string)">
<HclListItemDescription>

The list of IAM actions this Jenkins server should be allowed to do: e.g., ec2:*, s3:*, etc. This should be the list of IAM permissions Jenkins needs in this AWS account to run builds. These permissions will be added to the server's IAM role for all resources ('*').

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cloud_init_parts" requirement="optional" type="map(object(…))">
<HclListItemDescription>

Cloud init scripts to run on the Jenkins server when it is booting. See the part blocks in https://www.terraform.io/docs/providers/template/d/cloudinit_config.html for syntax.

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

<HclListItem name="create_route53_entry" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to create a public DNS A record in Route53 for Jenkins.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A list of custom tags to apply to Jenkins and all other resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="default_user" requirement="optional" type="string">
<HclListItemDescription>

The default OS user for the Jenkins AMI. For AWS Ubuntu AMIs, which is what the Packer template in jenkins-ubunutu.json uses, the default OS user is 'ubuntu'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ubuntu&quot;"/>
</HclListItem>

<HclListItem name="dlm_backup_job_schedule_interval" requirement="optional" type="number">
<HclListItemDescription>

How often this lifecycle policy should be evaluated, in hours.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="24"/>
</HclListItem>

<HclListItem name="dlm_backup_job_schedule_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the data lifecyle management schedule

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;daily-last-two-weeks&quot;"/>
</HclListItem>

<HclListItem name="dlm_backup_job_schedule_number_of_snapshots_to_retain" requirement="optional" type="number">
<HclListItemDescription>

How many snapshots to keep. Must be an integer between 1 and 1000.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="15"/>
</HclListItem>

<HclListItem name="dlm_backup_job_schedule_times" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of times in 24 hour clock format that sets when the lifecyle policy should be evaluated. Max of 1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[
  &quot;03:00&quot;
]"/>
</HclListItem>

<HclListItem name="ebs_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the KMS key used for encrypting the Jenkins EBS volume. The module will grant Jenkins permission to use this key.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ebs_kms_key_arn_is_alias" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not the provide EBS KMS key ARN is a key alias. If providing the key ID, leave this set to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_alarms" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using <a href="#alarms_sns_topic_arn"><code>alarms_sns_topic_arn</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_log_aggregation" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to add AIM permissions to send logs to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/cloudwatch-log-aggregation-scripts to do log aggregation in CloudWatch.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_metrics" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to add IAM permissions to send custom metrics to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent to get memory and disk metrics in CloudWatch for your Jenkins server.

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

<HclListItem name="external_account_auto_deploy_iam_role_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM role ARNs in other AWS accounts that Jenkins will be able to assume to do automated deployment in those accounts.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
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

<HclListItem name="is_internal_alb" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to make the Jenkins ALB an internal ALB that cannot be accessed from the public Internet. We strongly recommend setting this to true to keep Jenkins more secure.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="jenkins_device_name" requirement="optional" type="string">
<HclListItemDescription>

The OS device name where the Jenkins EBS volume should be attached

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;xvdh&quot;"/>
</HclListItem>

<HclListItem name="jenkins_mount_point" requirement="optional" type="string">
<HclListItemDescription>

The OS path where the Jenkins EBS volume should be mounted

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;/jenkins&quot;"/>
</HclListItem>

<HclListItem name="jenkins_user" requirement="optional" type="string">
<HclListItemDescription>

The OS user that should be used to run Jenkins

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;jenkins&quot;"/>
</HclListItem>

<HclListItem name="jenkins_volume_alarm_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how the backup job alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="jenkins_volume_encrypted" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to encrypt the Jenkins EBS volume.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="jenkins_volume_size" requirement="optional" type="number">
<HclListItemDescription>

The amount of disk space, in GB, to allocate for the EBS volume used by the Jenkins server.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="200"/>
</HclListItem>

<HclListItem name="jenkins_volume_type" requirement="optional" type="string">
<HclListItemDescription>

The type of volume to use for the EBS volume used by the Jenkins server. Must be one of: standard, gp2, io1, sc1, or st1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;gp2&quot;"/>
</HclListItem>

<HclListItem name="keypair_name" requirement="optional" type="string">
<HclListItemDescription>

The name of a Key Pair that can be used to SSH to the Jenkins server. Leave blank if you don't want to enable Key Pair auth.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="name" requirement="optional" type="string">
<HclListItemDescription>

Enter the name of the Jenkins server

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;jenkins&quot;"/>
</HclListItem>

<HclListItem name="root_block_device_volume_type" requirement="optional" type="string">
<HclListItemDescription>

The type of volume to use for the root disk for Jenkins. Must be one of: standard, gp2, io1, sc1, or st1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;gp2&quot;"/>
</HclListItem>

<HclListItem name="root_volume_size" requirement="optional" type="number">
<HclListItemDescription>

The amount of disk space, in GB, to allocate for the root volume of this server. Note that all of Jenkins' data is stored on a separate EBS Volume (see <a href="#jenkins_volume_size"><code>jenkins_volume_size</code></a>), so this root volume is primarily used for the OS, temp folders, apps, etc.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="100"/>
</HclListItem>

<HclListItem name="should_create_cloudwatch_log_group" requirement="optional" type="bool">
<HclListItemDescription>

When true, precreate the CloudWatch Log Group to use for log aggregation from the EC2 instances. This is useful if you wish to customize the CloudWatch Log Group with various settings such as retention periods and KMS encryption. When false, the CloudWatch agent will automatically create a basic log group to use.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="skip_health_check" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, skip the health check, and start a rolling deployment of Jenkins without waiting for it to initially be in a healthy state. This is primarily useful if the server group is in a broken state and you want to force a deployment anyway.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="ssh_grunt_iam_group" requirement="optional" type="string">
<HclListItemDescription>

If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this Jenkins server. This value is only used if enable_ssh_grunt=true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ssh-grunt-users&quot;"/>
</HclListItem>

<HclListItem name="ssh_grunt_iam_group_sudo" requirement="optional" type="string">
<HclListItemDescription>

If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this Jenkins server with sudo permissions. This value is only used if enable_ssh_grunt=true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ssh-grunt-sudo-users&quot;"/>
</HclListItem>

<HclListItem name="tenancy" requirement="optional" type="string">
<HclListItemDescription>

The tenancy of this server. Must be one of: default, dedicated, or host.

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

<HclListItem name="alb_arn">
<HclListItemDescription>

The ARN of the ALB deployed in front of Jenkins

</HclListItemDescription>
</HclListItem>

<HclListItem name="alb_dns_name">
<HclListItemDescription>

The DNS name of the ALB deployed in front of Jenkins

</HclListItemDescription>
</HclListItem>

<HclListItem name="alb_hosted_zone_id">
<HclListItemDescription>

The hosted zone ID of the ALB deployed in front of Jenkins

</HclListItemDescription>
</HclListItem>

<HclListItem name="alb_http_listener_arns">
<HclListItemDescription>

The ARNs of just the HTTP ALB listeners of the ALB deployed in front of Jenkins

</HclListItemDescription>
</HclListItem>

<HclListItem name="alb_https_listener_acm_cert_arns">
<HclListItemDescription>

The ARNs of just the HTTPS ALB listeners that usse ACM certs of the ALB deployed in front of Jenkins

</HclListItemDescription>
</HclListItem>

<HclListItem name="alb_https_listener_non_acm_cert_arns">
<HclListItemDescription>

The ARNs of just the HTTPS ALB listeners that use non-ACM certs of the ALB deployed in front of Jenkins

</HclListItemDescription>
</HclListItem>

<HclListItem name="alb_listener_arns">
<HclListItemDescription>

The ARNs of the ALB listeners of the ALB deployed in front of Jenkins

</HclListItemDescription>
</HclListItem>

<HclListItem name="alb_name">
<HclListItemDescription>

The name of the ALB deployed in front of Jenkins

</HclListItemDescription>
</HclListItem>

<HclListItem name="alb_security_group_id">
<HclListItemDescription>

The ID of the security group attached to the ALB deployed in front of Jenkins

</HclListItemDescription>
</HclListItem>

<HclListItem name="backup_lambda_function_arn">
</HclListItem>

<HclListItem name="backup_lambda_function_name">
</HclListItem>

<HclListItem name="jenkins_asg_name">
<HclListItemDescription>

The name of the Auto Scaling Group in which Jenkins is running

</HclListItemDescription>
</HclListItem>

<HclListItem name="jenkins_domain_name">
<HclListItemDescription>

The public domain name configured for Jenkins

</HclListItemDescription>
</HclListItem>

<HclListItem name="jenkins_ebs_volume_id">
<HclListItemDescription>

The ID of the EBS Volume that will store the JENKINS_HOME directory

</HclListItemDescription>
</HclListItem>

<HclListItem name="jenkins_iam_role_arn">
<HclListItemDescription>

The ARN of the IAM role attached to the Jenkins EC2 Instance

</HclListItemDescription>
</HclListItem>

<HclListItem name="jenkins_iam_role_id">
<HclListItemDescription>

The ID of the IAM role attached to the Jenkins EC2 Instance

</HclListItemDescription>
</HclListItem>

<HclListItem name="jenkins_security_group_id">
<HclListItemDescription>

The ID of the Security Group attached to the Jenkins EC2 Instance

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/mgmt/jenkins/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/mgmt/jenkins/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/mgmt/jenkins/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "1ec69c595192cc675cc8c161a306bc31"
}
##DOCS-SOURCER-END -->
