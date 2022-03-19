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
import HclListItem from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.85.0" lastModifiedVersion="0.84.4"/>

# EC2 Instance


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/ec2-instance" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=services%2Fec2-instance" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

## Overview

This service creates a single EC2 instance that includes server hardening, IAM role, EIP (optional), EBS Volume
(optional), and CloudWatch metrics, logs, and alerts. Note that a single EC2 instance can be a single point of failure,
so if you want to run multiple EC2 instances for high availability and scalability, see the
[asg-service](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/asg-service).

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

*   [How do I update my instance?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/ec2-instance/core-concepts.md#how-do-i-update-my-instance)
*   [How do I use User Data?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/ec2-instance/core-concepts.md#how-do-i-use-user-data)
*   [How do I mount an EBS volume?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/ec2-instance/core-concepts.md#how-do-i-mount-an-ebs-volume)

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

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-learning-and-testing): The `examples/for-learning-and-testing`
    folder contains standalone sample code optimized for learning, experimenting, and testing (but not direct
    production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog, configure CI / CD for your apps and
    infrastructure.

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<br/>

### Required

<HclListItem name="allow_port_from_cidr_blocks" requirement="required" description="Accept inbound traffic on these port ranges from the specified CIDR blocks" type="map" typeDetails="map(object({
    from_port   = number
    to_port     = number
    protocol    = string
    cidr_blocks = list(string)
  }))"/>

<HclListItem name="allow_port_from_security_group_ids" requirement="required" description="Accept inbound traffic on these port ranges from the specified security groups" type="map" typeDetails="map(object({
    from_port                = number
    to_port                  = number
    protocol                 = string
    source_security_group_id = string
  }))"/>

<HclListItem name="allow_ssh_from_cidr_blocks" requirement="required" description="Accept inbound SSH from these CIDR blocks" type="list" typeDetails="list(string)"/>

<HclListItem name="allow_ssh_from_security_group_ids" requirement="required" description="Accept inbound SSH from these security groups" type="list" typeDetails="list(string)"/>

<HclListItem name="ami" requirement="required" description="The AMI to run on the EC2 instance. This should be built from the Packer template under ec2-instance.json. One of var.ami or <a href=#ami_filters><code>ami_filters</code></a> is required. Set to null if looking up the ami with filters." type="string"/>

<HclListItem name="ami_filters" requirement="required" description="Properties on the AMI that can be used to lookup a prebuilt AMI for use with the EC2 instance. You can build the AMI using the Packer template ec2-instance.json. Only used if var.ami is null. One of var.ami or <a href=#ami_filters><code>ami_filters</code></a> is required. Set to null if passing the ami ID directly." type="object" typeDetails="object({
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

<HclListItem name="dns_zone_is_private" requirement="required" description="Specify whether we're selecting a private or public Route 53 DNS Zone" type="bool"/>

<HclListItem name="ebs_volumes" requirement="required" description="The EBS volumes to attach to the instance. This must be a map of key/value pairs." type="any"/>

<HclListItem name="instance_type" requirement="required" description="The type of instance to run for the EC2 instance" type="string"/>

<HclListItem name="name" requirement="required" description="The name of the EC2 instance and the other resources created by these templates" type="string"/>

<HclListItem name="route53_lookup_domain_name" requirement="required" description="The domain name to use to look up the Route 53 hosted zone. Will be a subset of <a href=#fully_qualified_domain_name><code>fully_qualified_domain_name</code></a>: e.g., my-company.com. Only one of <a href=#route53_lookup_domain_name><code>route53_lookup_domain_name</code></a> or <a href=#route53_zone_id><code>route53_zone_id</code></a> should be used."/>

<HclListItem name="route53_zone_id" requirement="required" description="The ID of the hosted zone to use. Allows specifying the hosted zone directly instead of looking it up via domain name. Only one of <a href=#route53_lookup_domain_name><code>route53_lookup_domain_name</code></a> or <a href=#route53_zone_id><code>route53_zone_id</code></a> should be used." type="string"/>

<HclListItem name="subnet_id" requirement="required" description="The ID of the subnet in which to deploy the EC2 instance. Must be a subnet in <a href=#vpc_id><code>vpc_id</code></a>." type="string"/>

<HclListItem name="vpc_id" requirement="required" description="The ID of the VPC in which to deploy the EC2 instance." type="string"/>


<br/>


### Optional

<HclListItem name="additional_security_group_ids" requirement="optional" description="A list of optional additional security group ids to assign to the EC2 instance." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="alarms_sns_topic_arn" requirement="optional" description="The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="attach_eip" requirement="optional" description="Determines if an Elastic IP (EIP) will be created for this instance." type="bool" defaultValue="true"/>

<HclListItem name="base_domain_name_tags" requirement="optional" description="Tags to use to filter the Route 53 Hosted Zones that might match the hosted zone's name (use if you have multiple public hosted zones with the same name)" type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="cloud_init_parts" requirement="optional" description="Cloud init scripts to run on the EC2 instance while it boots. See the part blocks in https://www.terraform.io/docs/providers/template/d/<a href=#cloudinit_config><code>cloudinit_config</code></a>.html for syntax." type="map" typeDetails="map(object({
    filename     = string
    content_type = string
    content      = string
  }))" defaultValue="{}"/>

<HclListItem name="cloudwatch_log_group_kms_key_id" requirement="optional" description="The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for encrypting log data." type="string" defaultValue="null"/>

<HclListItem name="cloudwatch_log_group_retention_in_days" requirement="optional" description="The number of days to retain log events in the log group. Refer to https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/<a href=#cloudwatch_log_group><code>cloudwatch_log_group</code></a>#<a href=#retention_in_days><code>retention_in_days</code></a> for all the valid values. When null, the log events are retained forever." type="number" defaultValue="null"/>

<HclListItem name="cloudwatch_log_group_tags" requirement="optional" description="Tags to apply on the CloudWatch Log Group, encoded as a map where the keys are tag keys and values are tag values." type="map" typeDetails="map(string)" defaultValue="null"/>

<HclListItem name="create_dns_record" requirement="optional" description="Set to true to create a DNS record in Route53 pointing to the EC2 instance. If true, be sure to set <a href=#fully_qualified_domain_name><code>fully_qualified_domain_name</code></a>." type="bool" defaultValue="true"/>

<HclListItem name="default_user" requirement="optional" description="The default OS user for the EC2 instance AMI. For AWS Ubuntu AMIs, which is what the Packer template in ec2-instance.json uses, the default OS user is 'ubuntu'." type="string" defaultValue="ubuntu"/>

<HclListItem name="dns_ttl" requirement="optional" description="DNS Time To Live in seconds." type="number" defaultValue="300"/>

<HclListItem name="ebs_optimized" requirement="optional" description="If true, the launched EC2 Instance will be EBS-optimized." type="bool" defaultValue="true"/>

<HclListItem name="enable_cloudwatch_alarms" requirement="optional" description="Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using <a href=#alarms_sns_topic_arn><code>alarms_sns_topic_arn</code></a>." type="bool" defaultValue="true"/>

<HclListItem name="enable_cloudwatch_log_aggregation" requirement="optional" description="Set to true to send logs to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/cloudwatch-log-aggregation-scripts to do log aggregation in CloudWatch." type="bool" defaultValue="true"/>

<HclListItem name="enable_cloudwatch_metrics" requirement="optional" description="Set to true to add IAM permissions to send custom metrics to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/metrics/cloudwatch-memory-disk-metrics-scripts to get memory and disk metrics in CloudWatch for your EC2 instance." type="bool" defaultValue="true"/>

<HclListItem name="enable_fail2ban" requirement="optional" description="Enable fail2ban to block brute force log in attempts. Defaults to true." type="bool" defaultValue="true"/>

<HclListItem name="enable_ip_lockdown" requirement="optional" description="Enable ip-lockdown to block access to the instance metadata. Defaults to true." type="bool" defaultValue="true"/>

<HclListItem name="enable_ssh_grunt" requirement="optional" description="Set to true to add IAM permissions for ssh-grunt (https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ssh-grunt), which will allow you to manage SSH access via IAM groups." type="bool" defaultValue="true"/>

<HclListItem name="external_account_ssh_grunt_role_arn" requirement="optional" description="If you are using ssh-grunt and your IAM users / groups are defined in a separate AWS account, you can use this variable to specify the ARN of an IAM role that ssh-grunt can assume to retrieve IAM group and public SSH key info from that account. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain)." type="string" defaultValue=""/>

<HclListItem name="fully_qualified_domain_name" requirement="optional" description="The apex domain of the hostname for the EC2 instance (e.g., example.com). The complete hostname for the EC2 instance will be var.name.<a href=#fully_qualified_domain_name><code>fully_qualified_domain_name</code></a> (e.g., bastion.example.com). Only used if <a href=#create_dns_record><code>create_dns_record</code></a> is true." type="string" defaultValue=""/>

<HclListItem name="keypair_name" requirement="optional" description="The name of a Key Pair that can be used to SSH to this instance. This instance may have ssh-grunt installed. The preferred way to do SSH access is with your own IAM user name and SSH key. This Key Pair is only as a fallback." type="string" defaultValue="null"/>

<HclListItem name="root_volume_delete_on_termination" requirement="optional" description="If set to true, the root volume will be deleted when the Instance is terminated." type="bool" defaultValue="true"/>

<HclListItem name="root_volume_size" requirement="optional" description="The size of the root volume, in gigabytes." type="number" defaultValue="8"/>

<HclListItem name="root_volume_type" requirement="optional" description="The root volume type. Must be one of: standard, gp2, io1." type="string" defaultValue="standard"/>

<HclListItem name="should_create_cloudwatch_log_group" requirement="optional" description="When true, precreate the CloudWatch Log Group to use for log aggregation from the EC2 instances. This is useful if you wish to customize the CloudWatch Log Group with various settings such as retention periods and KMS encryption. When false, the CloudWatch agent will automatically create a basic log group to use." type="bool" defaultValue="true"/>

<HclListItem name="ssh_grunt_iam_group" requirement="optional" description="If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this EC2 instance. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain)." type="string" defaultValue=""/>

<HclListItem name="ssh_grunt_iam_group_sudo" requirement="optional" description="If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this EC2 instance. To omit this variable, set it to an empty string (do NOT use null, or Terraform will complain)." type="string" defaultValue=""/>

<HclListItem name="tags" requirement="optional" description="A map of tags to apply to the EC2 instance and the S3 Buckets. The key is the tag name and the value is the tag value." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="tenancy" requirement="optional" description="The tenancy of this instance. Must be one of: default, dedicated, or host." type="string" defaultValue="default"/>

<HclListItem name="use_managed_iam_policies" requirement="optional" description="When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards." type="bool" defaultValue="true"/>

</TabItem>
<TabItem value="outputs" label="Outputs">

<br/>

<HclListItem name="dns_name" requirement="required" description="The fully qualified name of the EC2 server."/>

<HclListItem name="ec2_instance_iam_role_arn" requirement="required" description="The ARN of the EC2 server's IAM role."/>

<HclListItem name="ec2_instance_iam_role_id" requirement="required" description="The ID of the EC2 server's IAM role."/>

<HclListItem name="ec2_instance_iam_role_name" requirement="required" description="The name of the EC2 server's IAM role."/>

<HclListItem name="ec2_instance_instance_id" requirement="required" description="The EC2 instance ID of the EC2 server."/>

<HclListItem name="ec2_instance_private_ip" requirement="required" description="The private IP address of the EC2 server."/>

<HclListItem name="ec2_instance_public_ip" requirement="required" description="The public IP address of the EC2 server."/>

<HclListItem name="ec2_instance_security_group_id" requirement="required" description="The ID of the EC2 servers's security group."/>

<HclListItem name="ec2_instance_volume_info" requirement="required" description="Info about the created EBS volumes."/>

<HclListItem name="ec2_instance_volume_parameters" requirement="required" description="The input parameters for the EBS volumes."/>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"53c45361ba0a2076d03ea0f3815f210f"}
##DOCS-SOURCER-END -->
