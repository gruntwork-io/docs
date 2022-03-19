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
import HclListItem from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.85.0" lastModifiedVersion="0.85.0"/>

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

<br/>

### Required

<HclListItem name="acm_ssl_certificate_domain" requirement="required" description="The domain name used for an SSL certificate issued by the Amazon Certificate Manager (ACM)." type="string"/>

<HclListItem name="alb_subnet_ids" requirement="required" description="The IDs of the subnets in which to deploy the ALB that runs in front of Jenkins. Must be subnets in <a href=#vpc_id><code>vpc_id</code></a>." type="list" typeDetails="list(string)"/>

<HclListItem name="ami" requirement="required" description="The ID of the AMI to run on the Jenkins server. This should be the AMI build from the Packer template jenkins-ubuntu.json. One of var.ami or <a href=#ami_filters><code>ami_filters</code></a> is required. Set to null if looking up the ami with filters." type="string"/>

<HclListItem name="ami_filters" requirement="required" description="Properties on the AMI that can be used to lookup a prebuilt AMI for use with Jenkins. You can build the AMI using the Packer template jenkins-ubuntu.json. Only used if var.ami is null. One of var.ami or <a href=#ami_filters><code>ami_filters</code></a> is required. Set to null if passing the ami ID directly." type="object" typeDetails="object({
    # List of owners to limit the search. Set to null if you do not wish to limit the search by AMI owners.
    owners = list(string)
    # Name/Value pairs to filter the AMI off of. There are several valid keys, for a full reference, check out the
    # documentation for describe-images in the AWS CLI reference
    # (https://docs.aws.amazon.com/cli/latest/reference/ec2/describe-images.html).
    filters = list(object({
      name   = string
      values = list(string)
    }))
  })"/>

<HclListItem name="domain_name" requirement="required" description="The domain name for the DNS A record to add for Jenkins (e.g. jenkins.foo.com). Must be in the domain managed by <a href=#hosted_zone_id><code>hosted_zone_id</code></a>." type="string"/>

<HclListItem name="hosted_zone_id" requirement="required" description="The ID of the Route 53 Hosted Zone in which to create a DNS A record for Jenkins." type="string"/>

<HclListItem name="instance_type" requirement="required" description="The instance type to use for the Jenkins server (e.g. t2.medium)" type="string"/>

<HclListItem name="jenkins_subnet_id" requirement="required" description="The ID of the subnet in which to deploy Jenkins. Must be a subnet in <a href=#vpc_id><code>vpc_id</code></a>." type="string"/>

<HclListItem name="memory" requirement="required" description="The amount of memory to give Jenkins (e.g., 1g or 512m). Used for the -Xms and -Xmx settings." type="string"/>

<HclListItem name="vpc_id" requirement="required" description="The ID of the VPC in which to deploy Jenkins" type="string"/>


<br/>


### Optional

<HclListItem name="alarms_sns_topic_arn" requirement="optional" description="The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications. Also used for the alarms if the Jenkins backup job fails." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="allow_incoming_http_from_cidr_blocks" requirement="optional" description="The IP address ranges in CIDR format from which to allow incoming HTTP requests to Jenkins." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="allow_incoming_http_from_security_group_ids" requirement="optional" description="The IDs of security groups from which to allow incoming HTTP requests to Jenkins." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="allow_ssh_from_cidr_blocks" requirement="optional" description="The IP address ranges in CIDR format from which to allow incoming SSH requests to Jenkins." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="allow_ssh_from_security_group_ids" requirement="optional" description="The IDs of security groups from which to allow incoming SSH requests to Jenkins." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="backup_job_alarm_period" requirement="optional" description="How often, in seconds, the backup job is expected to run. This is the same as <a href=#backup_job_schedule_expression><code>backup_job_schedule_expression</code></a>, but unfortunately, Terraform offers no way to convert rate expressions to seconds. We add a CloudWatch alarm that triggers if the value of <a href=#backup_job_metric_name><code>backup_job_metric_name</code></a> and <a href=#backup_job_metric_namespace><code>backup_job_metric_namespace</code></a> isn't updated within this time period, as that indicates the backup failed to run." type="number" defaultValue="86400"/>

<HclListItem name="backup_job_metric_name" requirement="optional" description="The name for the CloudWatch Metric the AWS lambda backup job will increment every time the job completes successfully." type="string" defaultValue="jenkins-backup-job"/>

<HclListItem name="backup_job_metric_namespace" requirement="optional" description="The namespace for the CloudWatch Metric the AWS lambda backup job will increment every time the job completes successfully." type="string" defaultValue="Custom/Jenkins"/>

<HclListItem name="backup_job_schedule_expression" requirement="optional" description="A cron or rate expression that specifies how often to take a snapshot of the Jenkins server for backup purposes. See https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html for syntax details." type="string" defaultValue="rate(1 day)"/>

<HclListItem name="backup_using_dlm" requirement="optional" description="Set to true to backup the Jenkins Server using AWS Data Lifecycle Management Policies." type="bool" defaultValue="true"/>

<HclListItem name="backup_using_lambda" requirement="optional" description="Set to true to backup the Jenkins Server using a Scheduled Lambda Function." type="bool" defaultValue="false"/>

<HclListItem name="build_permission_actions" requirement="optional" description="The list of IAM actions this Jenkins server should be allowed to do: e.g., ec2:*, s3:*, etc. This should be the list of IAM permissions Jenkins needs in this AWS account to run builds. These permissions will be added to the server's IAM role for all resources ('*')." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="cloud_init_parts" requirement="optional" description="Cloud init scripts to run on the Jenkins server when it is booting. See the part blocks in https://www.terraform.io/docs/providers/template/d/<a href=#cloudinit_config><code>cloudinit_config</code></a>.html for syntax." type="map" typeDetails="map(object({
    filename     = string
    content_type = string
    content      = string
  }))" defaultValue="{}"/>

<HclListItem name="cloudwatch_log_group_kms_key_id" requirement="optional" description="The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for encrypting log data." type="string" defaultValue="null"/>

<HclListItem name="cloudwatch_log_group_retention_in_days" requirement="optional" description="The number of days to retain log events in the log group. Refer to https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/<a href=#cloudwatch_log_group><code>cloudwatch_log_group</code></a>#<a href=#retention_in_days><code>retention_in_days</code></a> for all the valid values. When null, the log events are retained forever." type="number" defaultValue="null"/>

<HclListItem name="cloudwatch_log_group_tags" requirement="optional" description="Tags to apply on the CloudWatch Log Group, encoded as a map where the keys are tag keys and values are tag values." type="map" typeDetails="map(string)" defaultValue="null"/>

<HclListItem name="custom_tags" requirement="optional" description="A list of custom tags to apply to Jenkins and all other resources." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="default_user" requirement="optional" description="The default OS user for the Jenkins AMI. For AWS Ubuntu AMIs, which is what the Packer template in jenkins-ubunutu.json uses, the default OS user is 'ubuntu'." type="string" defaultValue="ubuntu"/>

<HclListItem name="dlm_backup_job_schedule_interval" requirement="optional" description="How often this lifecycle policy should be evaluated, in hours." type="number" defaultValue="24"/>

<HclListItem name="dlm_backup_job_schedule_name" requirement="optional" description="The name of the data lifecyle management schedule" type="string" defaultValue="daily-last-two-weeks"/>

<HclListItem name="dlm_backup_job_schedule_number_of_snapshots_to_retain" requirement="optional" description="How many snapshots to keep. Must be an integer between 1 and 1000." type="number" defaultValue="15"/>

<HclListItem name="dlm_backup_job_schedule_times" requirement="optional" description="A list of times in 24 hour clock format that sets when the lifecyle policy should be evaluated. Max of 1." type="list" typeDetails="list(string)" defaultValue="['03:00']"/>

<HclListItem name="ebs_kms_key_arn" requirement="optional" description="The ARN of the KMS key used for encrypting the Jenkins EBS volume. The module will grant Jenkins permission to use this key." type="string" defaultValue="null"/>

<HclListItem name="ebs_kms_key_arn_is_alias" requirement="optional" description="Whether or not the provide EBS KMS key ARN is a key alias. If providing the key ID, leave this set to false." type="bool" defaultValue="false"/>

<HclListItem name="enable_cloudwatch_alarms" requirement="optional" description="Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using <a href=#alarms_sns_topic_arn><code>alarms_sns_topic_arn</code></a>." type="bool" defaultValue="true"/>

<HclListItem name="enable_cloudwatch_log_aggregation" requirement="optional" description="Set to true to add AIM permissions to send logs to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/cloudwatch-log-aggregation-scripts to do log aggregation in CloudWatch." type="bool" defaultValue="true"/>

<HclListItem name="enable_cloudwatch_metrics" requirement="optional" description="Set to true to add IAM permissions to send custom metrics to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent to get memory and disk metrics in CloudWatch for your Jenkins server." type="bool" defaultValue="true"/>

<HclListItem name="enable_ip_lockdown" requirement="optional" description="Enable ip-lockdown to block access to the instance metadata. Defaults to true." type="bool" defaultValue="true"/>

<HclListItem name="enable_ssh_grunt" requirement="optional" description="Set to true to add IAM permissions for ssh-grunt (https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ssh-grunt), which will allow you to manage SSH access via IAM groups." type="bool" defaultValue="true"/>

<HclListItem name="external_account_auto_deploy_iam_role_arns" requirement="optional" description="A list of IAM role ARNs in other AWS accounts that Jenkins will be able to assume to do automated deployment in those accounts." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="external_account_ssh_grunt_role_arn" requirement="optional" description="If you are using ssh-grunt and your IAM users / groups are defined in a separate AWS account, you can use this variable to specify the ARN of an IAM role that ssh-grunt can assume to retrieve IAM group and public SSH key info from that account. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain)." type="string" defaultValue=""/>

<HclListItem name="is_internal_alb" requirement="optional" description="Set to true to make the Jenkins ALB an internal ALB that cannot be accessed from the public Internet. We strongly recommend setting this to true to keep Jenkins more secure." type="bool" defaultValue="true"/>

<HclListItem name="jenkins_device_name" requirement="optional" description="The OS device name where the Jenkins EBS volume should be attached" type="string" defaultValue="xvdh"/>

<HclListItem name="jenkins_mount_point" requirement="optional" description="The OS path where the Jenkins EBS volume should be mounted" type="string" defaultValue="/jenkins"/>

<HclListItem name="jenkins_user" requirement="optional" description="The OS user that should be used to run Jenkins" type="string" defaultValue="jenkins"/>

<HclListItem name="jenkins_volume_encrypted" requirement="optional" description="Set to true to encrypt the Jenkins EBS volume." type="bool" defaultValue="true"/>

<HclListItem name="jenkins_volume_size" requirement="optional" description="The amount of disk space, in GB, to allocate for the EBS volume used by the Jenkins server." type="number" defaultValue="200"/>

<HclListItem name="jenkins_volume_type" requirement="optional" description="The type of volume to use for the EBS volume used by the Jenkins server. Must be one of: standard, gp2, io1, sc1, or st1." type="string" defaultValue="gp2"/>

<HclListItem name="keypair_name" requirement="optional" description="The name of a Key Pair that can be used to SSH to the Jenkins server. Leave blank if you don't want to enable Key Pair auth." type="string" defaultValue="null"/>

<HclListItem name="name" requirement="optional" description="Enter the name of the Jenkins server" type="string" defaultValue="jenkins"/>

<HclListItem name="root_block_device_volume_type" requirement="optional" description="The type of volume to use for the root disk for Jenkins. Must be one of: standard, gp2, io1, sc1, or st1." type="string" defaultValue="gp2"/>

<HclListItem name="root_volume_size" requirement="optional" description="The amount of disk space, in GB, to allocate for the root volume of this server. Note that all of Jenkins' data is stored on a separate EBS Volume (see <a href=#jenkins_volume_size><code>jenkins_volume_size</code></a>), so this root volume is primarily used for the OS, temp folders, apps, etc." type="number" defaultValue="100"/>

<HclListItem name="should_create_cloudwatch_log_group" requirement="optional" description="When true, precreate the CloudWatch Log Group to use for log aggregation from the EC2 instances. This is useful if you wish to customize the CloudWatch Log Group with various settings such as retention periods and KMS encryption. When false, the CloudWatch agent will automatically create a basic log group to use." type="bool" defaultValue="true"/>

<HclListItem name="skip_health_check" requirement="optional" description="If set to true, skip the health check, and start a rolling deployment of Jenkins without waiting for it to initially be in a healthy state. This is primarily useful if the server group is in a broken state and you want to force a deployment anyway." type="bool" defaultValue="false"/>

<HclListItem name="ssh_grunt_iam_group" requirement="optional" description="If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this Jenkins server. This value is only used if <a href=#enable_ssh_grunt><code>enable_ssh_grunt</code></a>=true." type="string" defaultValue="ssh-grunt-users"/>

<HclListItem name="ssh_grunt_iam_group_sudo" requirement="optional" description="If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this Jenkins server with sudo permissions. This value is only used if <a href=#enable_ssh_grunt><code>enable_ssh_grunt</code></a>=true." type="string" defaultValue="ssh-grunt-sudo-users"/>

<HclListItem name="tenancy" requirement="optional" description="The tenancy of this server. Must be one of: default, dedicated, or host." type="string" defaultValue="default"/>

<HclListItem name="use_managed_iam_policies" requirement="optional" description="When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards." type="bool" defaultValue="true"/>

</TabItem>
<TabItem value="outputs" label="Outputs">

<br/>

<HclListItem name="alb_arn" requirement="required" description="The ARN of the ALB deployed in front of Jenkins"/>

<HclListItem name="alb_dns_name" requirement="required" description="The DNS name of the ALB deployed in front of Jenkins"/>

<HclListItem name="alb_hosted_zone_id" requirement="required" description="The hosted zone ID of the ALB deployed in front of Jenkins"/>

<HclListItem name="alb_http_listener_arns" requirement="required" description="The ARNs of just the HTTP ALB listeners of the ALB deployed in front of Jenkins"/>

<HclListItem name="alb_https_listener_acm_cert_arns" requirement="required" description="The ARNs of just the HTTPS ALB listeners that usse ACM certs of the ALB deployed in front of Jenkins"/>

<HclListItem name="alb_https_listener_non_acm_cert_arns" requirement="required" description="The ARNs of just the HTTPS ALB listeners that use non-ACM certs of the ALB deployed in front of Jenkins"/>

<HclListItem name="alb_listener_arns" requirement="required" description="The ARNs of the ALB listeners of the ALB deployed in front of Jenkins"/>

<HclListItem name="alb_name" requirement="required" description="The name of the ALB deployed in front of Jenkins"/>

<HclListItem name="alb_security_group_id" requirement="required" description="The ID of the security group attached to the ALB deployed in front of Jenkins"/>

<HclListItem name="backup_lambda_function_arn" requirement="required"/>

<HclListItem name="backup_lambda_function_name" requirement="required"/>

<HclListItem name="jenkins_asg_name" requirement="required" description="The name of the Auto Scaling Group in which Jenkins is running"/>

<HclListItem name="jenkins_domain_name" requirement="required" description="The public domain name configured for Jenkins"/>

<HclListItem name="jenkins_ebs_volume_id" requirement="required" description="The ID of the EBS Volume that will store the <a href=#JENKINS_HOME><code>JENKINS_HOME</code></a> directory"/>

<HclListItem name="jenkins_iam_role_arn" requirement="required" description="The ARN of the IAM role attached to the Jenkins EC2 Instance"/>

<HclListItem name="jenkins_iam_role_id" requirement="required" description="The ID of the IAM role attached to the Jenkins EC2 Instance"/>

<HclListItem name="jenkins_security_group_id" requirement="required" description="The ID of the Security Group attached to the Jenkins EC2 Instance"/>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"2afae11b6798a73668c66980bd09a4e4"}
##DOCS-SOURCER-END -->
