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

<VersionBadge version="0.80.2" lastModifiedVersion="0.79.0"/>

# Jenkins CI Server


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/mgmt/jenkins" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=mgmt%2Fjenkins" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

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

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

*   [How to configure a production-grade CI/CD workflow for application and infrastructure code](https://docs.gruntwork.io/guides/build-it-yourself/pipelines/):
    step-by-step guide on how to configure CI / CD for your apps and infrastructure.

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<a name="acm_ssl_certificate_domain" className="snap-top"></a>

* [**`acm_ssl_certificate_domain`**](#acm_ssl_certificate_domain) &mdash; The domain name used for an SSL certificate issued by the Amazon Certificate Manager (ACM).

<a name="alarms_sns_topic_arn" className="snap-top"></a>

* [**`alarms_sns_topic_arn`**](#alarms_sns_topic_arn) &mdash; The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications. Also used for the alarms if the Jenkins backup job fails.

<a name="alb_subnet_ids" className="snap-top"></a>

* [**`alb_subnet_ids`**](#alb_subnet_ids) &mdash; The IDs of the subnets in which to deploy the ALB that runs in front of Jenkins. Must be subnets in [`vpc_id`](#vpc_id).

<a name="allow_incoming_http_from_cidr_blocks" className="snap-top"></a>

* [**`allow_incoming_http_from_cidr_blocks`**](#allow_incoming_http_from_cidr_blocks) &mdash; The IP address ranges in CIDR format from which to allow incoming HTTP requests to Jenkins.

<a name="allow_incoming_http_from_security_group_ids" className="snap-top"></a>

* [**`allow_incoming_http_from_security_group_ids`**](#allow_incoming_http_from_security_group_ids) &mdash; The IDs of security groups from which to allow incoming HTTP requests to Jenkins.

<a name="allow_ssh_from_cidr_blocks" className="snap-top"></a>

* [**`allow_ssh_from_cidr_blocks`**](#allow_ssh_from_cidr_blocks) &mdash; The IP address ranges in CIDR format from which to allow incoming SSH requests to Jenkins.

<a name="allow_ssh_from_security_group_ids" className="snap-top"></a>

* [**`allow_ssh_from_security_group_ids`**](#allow_ssh_from_security_group_ids) &mdash; The IDs of security groups from which to allow incoming SSH requests to Jenkins.

<a name="ami" className="snap-top"></a>

* [**`ami`**](#ami) &mdash; The ID of the AMI to run on the Jenkins server. This should be the AMI build from the Packer template jenkins-ubuntu.json. One of var.ami or [`ami_filters`](#ami_filters) is required. Set to null if looking up the ami with filters.

<a name="ami_filters" className="snap-top"></a>

* [**`ami_filters`**](#ami_filters) &mdash; Properties on the AMI that can be used to lookup a prebuilt AMI for use with Jenkins. You can build the AMI using the Packer template jenkins-ubuntu.json. Only used if var.ami is null. One of var.ami or [`ami_filters`](#ami_filters) is required. Set to null if passing the ami ID directly.

<a name="backup_job_alarm_period" className="snap-top"></a>

* [**`backup_job_alarm_period`**](#backup_job_alarm_period) &mdash; How often, in seconds, the backup job is expected to run. This is the same as [`backup_job_schedule_expression`](#backup_job_schedule_expression), but unfortunately, Terraform offers no way to convert rate expressions to seconds. We add a CloudWatch alarm that triggers if the value of [`backup_job_metric_name`](#backup_job_metric_name) and [`backup_job_metric_namespace`](#backup_job_metric_namespace) isn't updated within this time period, as that indicates the backup failed to run.

<a name="backup_job_metric_name" className="snap-top"></a>

* [**`backup_job_metric_name`**](#backup_job_metric_name) &mdash; The name for the CloudWatch Metric the AWS lambda backup job will increment every time the job completes successfully.

<a name="backup_job_metric_namespace" className="snap-top"></a>

* [**`backup_job_metric_namespace`**](#backup_job_metric_namespace) &mdash; The namespace for the CloudWatch Metric the AWS lambda backup job will increment every time the job completes successfully.

<a name="backup_job_schedule_expression" className="snap-top"></a>

* [**`backup_job_schedule_expression`**](#backup_job_schedule_expression) &mdash; A cron or rate expression that specifies how often to take a snapshot of the Jenkins server for backup purposes. See https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html for syntax details.

<a name="backup_using_dlm" className="snap-top"></a>

* [**`backup_using_dlm`**](#backup_using_dlm) &mdash; Set to true to backup the Jenkins Server using AWS Data Lifecycle Management Policies.

<a name="backup_using_lambda" className="snap-top"></a>

* [**`backup_using_lambda`**](#backup_using_lambda) &mdash; Set to true to backup the Jenkins Server using a Scheduled Lambda Function.

<a name="build_permission_actions" className="snap-top"></a>

* [**`build_permission_actions`**](#build_permission_actions) &mdash; The list of IAM actions this Jenkins server should be allowed to do: e.g., ec2:*, s3:*, etc. This should be the list of IAM permissions Jenkins needs in this AWS account to run builds. These permissions will be added to the server's IAM role for all resources ('*').

<a name="cloud_init_parts" className="snap-top"></a>

* [**`cloud_init_parts`**](#cloud_init_parts) &mdash; Cloud init scripts to run on the Jenkins server when it is booting. See the part blocks in [`https://www.terraform.io/docs/providers/template/d/cloudinit_config`](#https://www.terraform.io/docs/providers/template/d/cloudinit_config).html for syntax.

<a name="cloudwatch_log_group_kms_key_id" className="snap-top"></a>

* [**`cloudwatch_log_group_kms_key_id`**](#cloudwatch_log_group_kms_key_id) &mdash; The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for encrypting log data.

<a name="cloudwatch_log_group_retention_in_days" className="snap-top"></a>

* [**`cloudwatch_log_group_retention_in_days`**](#cloudwatch_log_group_retention_in_days) &mdash; The number of days to retain log events in the log group. Refer to [`https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days`](#https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days) for all the valid values. When null, the log events are retained forever.

<a name="cloudwatch_log_group_tags" className="snap-top"></a>

* [**`cloudwatch_log_group_tags`**](#cloudwatch_log_group_tags) &mdash; Tags to apply on the CloudWatch Log Group, encoded as a map where the keys are tag keys and values are tag values.

<a name="custom_tags" className="snap-top"></a>

* [**`custom_tags`**](#custom_tags) &mdash; A list of custom tags to apply to Jenkins and all other resources.

<a name="default_user" className="snap-top"></a>

* [**`default_user`**](#default_user) &mdash; The default OS user for the Jenkins AMI. For AWS Ubuntu AMIs, which is what the Packer template in jenkins-ubunutu.json uses, the default OS user is 'ubuntu'.

<a name="dlm_backup_job_schedule_interval" className="snap-top"></a>

* [**`dlm_backup_job_schedule_interval`**](#dlm_backup_job_schedule_interval) &mdash; How often this lifecycle policy should be evaluated, in hours.

<a name="dlm_backup_job_schedule_name" className="snap-top"></a>

* [**`dlm_backup_job_schedule_name`**](#dlm_backup_job_schedule_name) &mdash; The name of the data lifecyle management schedule

<a name="dlm_backup_job_schedule_number_of_snapshots_to_retain" className="snap-top"></a>

* [**`dlm_backup_job_schedule_number_of_snapshots_to_retain`**](#dlm_backup_job_schedule_number_of_snapshots_to_retain) &mdash; How many snapshots to keep. Must be an integer between 1 and 1000.

<a name="dlm_backup_job_schedule_times" className="snap-top"></a>

* [**`dlm_backup_job_schedule_times`**](#dlm_backup_job_schedule_times) &mdash; A list of times in 24 hour clock format that sets when the lifecyle policy should be evaluated. Max of 1.

<a name="domain_name" className="snap-top"></a>

* [**`domain_name`**](#domain_name) &mdash; The domain name for the DNS A record to add for Jenkins (e.g. jenkins.foo.com). Must be in the domain managed by [`hosted_zone_id`](#hosted_zone_id).

<a name="ebs_kms_key_arn" className="snap-top"></a>

* [**`ebs_kms_key_arn`**](#ebs_kms_key_arn) &mdash; The ARN of the KMS key used for encrypting the Jenkins EBS volume. The module will grant Jenkins permission to use this key.

<a name="ebs_kms_key_arn_is_alias" className="snap-top"></a>

* [**`ebs_kms_key_arn_is_alias`**](#ebs_kms_key_arn_is_alias) &mdash; Whether or not the provide EBS KMS key ARN is a key alias. If providing the key ID, leave this set to false.

<a name="enable_cloudwatch_alarms" className="snap-top"></a>

* [**`enable_cloudwatch_alarms`**](#enable_cloudwatch_alarms) &mdash; Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using [`alarms_sns_topic_arn`](#alarms_sns_topic_arn).

<a name="enable_cloudwatch_log_aggregation" className="snap-top"></a>

* [**`enable_cloudwatch_log_aggregation`**](#enable_cloudwatch_log_aggregation) &mdash; Set to true to add AIM permissions to send logs to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/cloudwatch-log-aggregation-scripts to do log aggregation in CloudWatch.

<a name="enable_cloudwatch_metrics" className="snap-top"></a>

* [**`enable_cloudwatch_metrics`**](#enable_cloudwatch_metrics) &mdash; Set to true to add IAM permissions to send custom metrics to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent to get memory and disk metrics in CloudWatch for your Jenkins server.

<a name="enable_ip_lockdown" className="snap-top"></a>

* [**`enable_ip_lockdown`**](#enable_ip_lockdown) &mdash; Enable ip-lockdown to block access to the instance metadata. Defaults to true.

<a name="enable_ssh_grunt" className="snap-top"></a>

* [**`enable_ssh_grunt`**](#enable_ssh_grunt) &mdash; Set to true to add IAM permissions for ssh-grunt (https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ssh-grunt), which will allow you to manage SSH access via IAM groups.

<a name="external_account_auto_deploy_iam_role_arns" className="snap-top"></a>

* [**`external_account_auto_deploy_iam_role_arns`**](#external_account_auto_deploy_iam_role_arns) &mdash; A list of IAM role ARNs in other AWS accounts that Jenkins will be able to assume to do automated deployment in those accounts.

<a name="external_account_ssh_grunt_role_arn" className="snap-top"></a>

* [**`external_account_ssh_grunt_role_arn`**](#external_account_ssh_grunt_role_arn) &mdash; If you are using ssh-grunt and your IAM users / groups are defined in a separate AWS account, you can use this variable to specify the ARN of an IAM role that ssh-grunt can assume to retrieve IAM group and public SSH key info from that account. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain).

<a name="hosted_zone_id" className="snap-top"></a>

* [**`hosted_zone_id`**](#hosted_zone_id) &mdash; The ID of the Route 53 Hosted Zone in which to create a DNS A record for Jenkins.

<a name="instance_type" className="snap-top"></a>

* [**`instance_type`**](#instance_type) &mdash; The instance type to use for the Jenkins server (e.g. t2.medium)

<a name="is_internal_alb" className="snap-top"></a>

* [**`is_internal_alb`**](#is_internal_alb) &mdash; Set to true to make the Jenkins ALB an internal ALB that cannot be accessed from the public Internet. We strongly recommend setting this to true to keep Jenkins more secure.

<a name="jenkins_device_name" className="snap-top"></a>

* [**`jenkins_device_name`**](#jenkins_device_name) &mdash; The OS device name where the Jenkins EBS volume should be attached

<a name="jenkins_mount_point" className="snap-top"></a>

* [**`jenkins_mount_point`**](#jenkins_mount_point) &mdash; The OS path where the Jenkins EBS volume should be mounted

<a name="jenkins_subnet_id" className="snap-top"></a>

* [**`jenkins_subnet_id`**](#jenkins_subnet_id) &mdash; The ID of the subnet in which to deploy Jenkins. Must be a subnet in [`vpc_id`](#vpc_id).

<a name="jenkins_user" className="snap-top"></a>

* [**`jenkins_user`**](#jenkins_user) &mdash; The OS user that should be used to run Jenkins

<a name="jenkins_volume_encrypted" className="snap-top"></a>

* [**`jenkins_volume_encrypted`**](#jenkins_volume_encrypted) &mdash; Set to true to encrypt the Jenkins EBS volume.

<a name="jenkins_volume_size" className="snap-top"></a>

* [**`jenkins_volume_size`**](#jenkins_volume_size) &mdash; The amount of disk space, in GB, to allocate for the EBS volume used by the Jenkins server.

<a name="jenkins_volume_type" className="snap-top"></a>

* [**`jenkins_volume_type`**](#jenkins_volume_type) &mdash; The type of volume to use for the EBS volume used by the Jenkins server. Must be one of: standard, gp2, io1, sc1, or st1.

<a name="keypair_name" className="snap-top"></a>

* [**`keypair_name`**](#keypair_name) &mdash; The name of a Key Pair that can be used to SSH to the Jenkins server. Leave blank if you don't want to enable Key Pair auth.

<a name="memory" className="snap-top"></a>

* [**`memory`**](#memory) &mdash; The amount of memory to give Jenkins (e.g., 1g or 512m). Used for the -Xms and -Xmx settings.

<a name="name" className="snap-top"></a>

* [**`name`**](#name) &mdash; Enter the name of the Jenkins server

<a name="root_block_device_volume_type" className="snap-top"></a>

* [**`root_block_device_volume_type`**](#root_block_device_volume_type) &mdash; The type of volume to use for the root disk for Jenkins. Must be one of: standard, gp2, io1, sc1, or st1.

<a name="root_volume_size" className="snap-top"></a>

* [**`root_volume_size`**](#root_volume_size) &mdash; The amount of disk space, in GB, to allocate for the root volume of this server. Note that all of Jenkins' data is stored on a separate EBS Volume (see [`jenkins_volume_size`](#jenkins_volume_size)), so this root volume is primarily used for the OS, temp folders, apps, etc.

<a name="should_create_cloudwatch_log_group" className="snap-top"></a>

* [**`should_create_cloudwatch_log_group`**](#should_create_cloudwatch_log_group) &mdash; When true, precreate the CloudWatch Log Group to use for log aggregation from the EC2 instances. This is useful if you wish to customize the CloudWatch Log Group with various settings such as retention periods and KMS encryption. When false, the CloudWatch agent will automatically create a basic log group to use.

<a name="skip_health_check" className="snap-top"></a>

* [**`skip_health_check`**](#skip_health_check) &mdash; If set to true, skip the health check, and start a rolling deployment of Jenkins without waiting for it to initially be in a healthy state. This is primarily useful if the server group is in a broken state and you want to force a deployment anyway.

<a name="ssh_grunt_iam_group" className="snap-top"></a>

* [**`ssh_grunt_iam_group`**](#ssh_grunt_iam_group) &mdash; If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this Jenkins server. This value is only used if [`enable_ssh_grunt`](#enable_ssh_grunt)=true.

<a name="ssh_grunt_iam_group_sudo" className="snap-top"></a>

* [**`ssh_grunt_iam_group_sudo`**](#ssh_grunt_iam_group_sudo) &mdash; If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this Jenkins server with sudo permissions. This value is only used if [`enable_ssh_grunt`](#enable_ssh_grunt)=true.

<a name="tenancy" className="snap-top"></a>

* [**`tenancy`**](#tenancy) &mdash; The tenancy of this server. Must be one of: default, dedicated, or host.

<a name="use_managed_iam_policies" className="snap-top"></a>

* [**`use_managed_iam_policies`**](#use_managed_iam_policies) &mdash; When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards.

<a name="vpc_id" className="snap-top"></a>

* [**`vpc_id`**](#vpc_id) &mdash; The ID of the VPC in which to deploy Jenkins

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="alb_arn" className="snap-top"></a>

* [**`alb_arn`**](#alb_arn) &mdash; The ARN of the ALB deployed in front of Jenkins

<a name="alb_dns_name" className="snap-top"></a>

* [**`alb_dns_name`**](#alb_dns_name) &mdash; The DNS name of the ALB deployed in front of Jenkins

<a name="alb_hosted_zone_id" className="snap-top"></a>

* [**`alb_hosted_zone_id`**](#alb_hosted_zone_id) &mdash; The hosted zone ID of the ALB deployed in front of Jenkins

<a name="alb_http_listener_arns" className="snap-top"></a>

* [**`alb_http_listener_arns`**](#alb_http_listener_arns) &mdash; The ARNs of just the HTTP ALB listeners of the ALB deployed in front of Jenkins

<a name="alb_https_listener_acm_cert_arns" className="snap-top"></a>

* [**`alb_https_listener_acm_cert_arns`**](#alb_https_listener_acm_cert_arns) &mdash; The ARNs of just the HTTPS ALB listeners that usse ACM certs of the ALB deployed in front of Jenkins

<a name="alb_https_listener_non_acm_cert_arns" className="snap-top"></a>

* [**`alb_https_listener_non_acm_cert_arns`**](#alb_https_listener_non_acm_cert_arns) &mdash; The ARNs of just the HTTPS ALB listeners that use non-ACM certs of the ALB deployed in front of Jenkins

<a name="alb_listener_arns" className="snap-top"></a>

* [**`alb_listener_arns`**](#alb_listener_arns) &mdash; The ARNs of the ALB listeners of the ALB deployed in front of Jenkins

<a name="alb_name" className="snap-top"></a>

* [**`alb_name`**](#alb_name) &mdash; The name of the ALB deployed in front of Jenkins

<a name="alb_security_group_id" className="snap-top"></a>

* [**`alb_security_group_id`**](#alb_security_group_id) &mdash; The ID of the security group attached to the ALB deployed in front of Jenkins

<a name="backup_lambda_function_arn" className="snap-top"></a>

* [**`backup_lambda_function_arn`**](#backup_lambda_function_arn) &mdash; 

<a name="backup_lambda_function_name" className="snap-top"></a>

* [**`backup_lambda_function_name`**](#backup_lambda_function_name) &mdash; 

<a name="jenkins_asg_name" className="snap-top"></a>

* [**`jenkins_asg_name`**](#jenkins_asg_name) &mdash; The name of the Auto Scaling Group in which Jenkins is running

<a name="jenkins_domain_name" className="snap-top"></a>

* [**`jenkins_domain_name`**](#jenkins_domain_name) &mdash; The public domain name configured for Jenkins

<a name="jenkins_ebs_volume_id" className="snap-top"></a>

* [**`jenkins_ebs_volume_id`**](#jenkins_ebs_volume_id) &mdash; The ID of the EBS Volume that will store the [`JENKINS_HOME`](#JENKINS_HOME) directory

<a name="jenkins_iam_role_arn" className="snap-top"></a>

* [**`jenkins_iam_role_arn`**](#jenkins_iam_role_arn) &mdash; The ARN of the IAM role attached to the Jenkins EC2 Instance

<a name="jenkins_iam_role_id" className="snap-top"></a>

* [**`jenkins_iam_role_id`**](#jenkins_iam_role_id) &mdash; The ID of the IAM role attached to the Jenkins EC2 Instance

<a name="jenkins_security_group_id" className="snap-top"></a>

* [**`jenkins_security_group_id`**](#jenkins_security_group_id) &mdash; The ID of the Security Group attached to the Jenkins EC2 Instance

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"dc3ec1ac08af9840f8055e2f8ff7c2a5"}
##DOCS-SOURCER-END -->
