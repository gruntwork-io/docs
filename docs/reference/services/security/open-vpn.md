---
type: "service"
name: "OpenVPN"
description: "Deploy an OpenVPN Server on AWS."
category: "remote-access"
cloud: "aws"
tags: ["vpn","ec2","ssh","security"]
license: "gruntwork"
built-with: "terraform, bash, packer"
title: "OpenVPN Server"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';

<VersionBadge version="0.85.0" lastModifiedVersion="0.84.4"/>

# OpenVPN Server


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/eak12913-patch-1/modules/mgmt/openvpn-server" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=mgmt%2Fopenvpn-server" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

## Overview

This service deploys an [OpenVPN Server](https://openvpn.net/).

![OpenVPN server architecture](/img/reference/services/security/openvpn-architecture.png)

This server acts as the entrypoint to the VPC in which it is deployed. You must connect to it with an OpenVPN client
before you can connect to any of your other servers, which are in private subnets. This way, you minimize the surface
area you expose to attackers, and can focus all your efforts on locking down just a single server.

## Features

*   An AMI to run on the OpenVPN Server
*   An Auto Scaling Group of size 1 (for fault tolerance)
*   An Elastic IP Address (EIP)
*   IAM Role and IAM instance profile
*   Security group.
*   A DNS record
*   Harden the OS by installing `fail2ban`, `ntp`, `auto-update`, `ip-lockdown`, and more
*   Send all logs and metrics to CloudWatch
*   Configure alerts in CloudWatch for CPU, memory, and disk space usage
*   Manage SSH access with IAM groups using `ssh-grunt`

Under the hood, this is all implemented using Terraform modules from the Gruntwork
[terraform-aws-openvpn](https://github.com/gruntwork-io/terraform-aws-openvpn) repo.

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

### Core concepts

To understand core concepts like why you should use an OpenVPN server, how to connect to the vpn, how to use the
VPN server to connect to other systems on the AWS VPC, see the
[openvpn-server documentation](https://github.com/gruntwork-io/terraform-aws-openvpn/blob/master/modules/openvpn-server/README.md)
documentation in the [package-openvpn](https://github.com/gruntwork-io/terraform-aws-openvpn) repo.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/eak12913-patch-1/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/eak12913-patch-1/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog, configure CI / CD for your apps and
    infrastructure.

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<a name="alarms_sns_topic_arn" className="snap-top"></a>

* [**`alarms_sns_topic_arn`**](#alarms_sns_topic_arn) &mdash; The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications.

<a name="allow_manage_key_permissions_with_iam" className="snap-top"></a>

* [**`allow_manage_key_permissions_with_iam`**](#allow_manage_key_permissions_with_iam) &mdash; If true, both the CMK's Key Policy and IAM Policies (permissions) can be used to grant permissions on the CMK. If false, only the CMK's Key Policy can be used to grant permissions on the CMK. False is more secure (and generally preferred), but true is more flexible and convenient.

<a name="allow_ssh_from_cidr_list" className="snap-top"></a>

* [**`allow_ssh_from_cidr_list`**](#allow_ssh_from_cidr_list) &mdash; The IP address ranges in CIDR format from which to allow incoming SSH requests to the OpenVPN server.

<a name="allow_ssh_from_security_group_ids" className="snap-top"></a>

* [**`allow_ssh_from_security_group_ids`**](#allow_ssh_from_security_group_ids) &mdash; The IDs of security groups from which to allow incoming SSH requests to the OpenVPN server.

<a name="allow_vpn_from_cidr_list" className="snap-top"></a>

* [**`allow_vpn_from_cidr_list`**](#allow_vpn_from_cidr_list) &mdash; A list of IP address ranges in CIDR format from which VPN access will be permitted. Attempts to access the OpenVPN Server from all other IP addresses will be blocked.

<a name="ami" className="snap-top"></a>

* [**`ami`**](#ami) &mdash; The AMI to run on the OpenVPN Server. This should be built from the Packer template under openvpn-server.json. One of var.ami or [`ami_filters`](#ami_filters) is required. Set to null if looking up the ami with filters.

<a name="ami_filters" className="snap-top"></a>

* [**`ami_filters`**](#ami_filters) &mdash; Properties on the AMI that can be used to lookup a prebuilt AMI for use with the OpenVPN server. You can build the AMI using the Packer template openvpn-server.json. Only used if var.ami is null. One of var.ami or [`ami_filters`](#ami_filters) is required. Set to null if passing the ami ID directly.

<a name="backup_bucket_name" className="snap-top"></a>

* [**`backup_bucket_name`**](#backup_bucket_name) &mdash; The name of the S3 bucket that will be used to backup PKI secrets. This is a required variable because bucket names must be globally unique across all AWS customers.

<a name="base_domain_name" className="snap-top"></a>

* [**`base_domain_name`**](#base_domain_name) &mdash; The base domain name to use for the OpenVPN server. Used to lookup the Hosted Zone ID to use for creating the Route 53 domain entry. Only used if [`create_route53_entry`](#create_route53_entry) is true.

<a name="base_domain_name_tags" className="snap-top"></a>

* [**`base_domain_name_tags`**](#base_domain_name_tags) &mdash; Tags to use to filter the Route 53 Hosted Zones that might match [`domain_name`](#domain_name).

<a name="ca_cert_fields" className="snap-top"></a>

* [**`ca_cert_fields`**](#ca_cert_fields) &mdash; An object with fields for the country, state, locality, organization, organizational unit, and email address to use with the OpenVPN CA certificate.

<a name="cloud_init_parts" className="snap-top"></a>

* [**`cloud_init_parts`**](#cloud_init_parts) &mdash; Cloud init scripts to run on the OpenVPN server while it boots. See the part blocks in [`https://www.terraform.io/docs/providers/template/d/cloudinit_config`](#https://www.terraform.io/docs/providers/template/d/cloudinit_config).html for syntax.

<a name="cloudwatch_log_group_kms_key_id" className="snap-top"></a>

* [**`cloudwatch_log_group_kms_key_id`**](#cloudwatch_log_group_kms_key_id) &mdash; The ID (ARN, alias ARN, AWS ID) of a customer managed KMS Key to use for encrypting log data.

<a name="cloudwatch_log_group_retention_in_days" className="snap-top"></a>

* [**`cloudwatch_log_group_retention_in_days`**](#cloudwatch_log_group_retention_in_days) &mdash; The number of days to retain log events in the log group. Refer to [`https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days`](#https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group#retention_in_days) for all the valid values. When null, the log events are retained forever.

<a name="cloudwatch_log_group_tags" className="snap-top"></a>

* [**`cloudwatch_log_group_tags`**](#cloudwatch_log_group_tags) &mdash; Tags to apply on the CloudWatch Log Group, encoded as a map where the keys are tag keys and values are tag values.

<a name="cmk_administrator_iam_arns" className="snap-top"></a>

* [**`cmk_administrator_iam_arns`**](#cmk_administrator_iam_arns) &mdash; A list of IAM ARNs for users who should be given administrator access to this CMK (e.g. arn:aws:iam::&lt;aws-account-id>:user/&lt;iam-user-arn>). If this list is empty, and [`kms_key_arn`](#kms_key_arn) is null, the ARN of the current user will be used.

<a name="cmk_external_user_iam_arns" className="snap-top"></a>

* [**`cmk_external_user_iam_arns`**](#cmk_external_user_iam_arns) &mdash; A list of IAM ARNs for users from external AWS accounts who should be given permissions to use this CMK (e.g. arn:aws:iam::&lt;aws-account-id>:root).

<a name="cmk_user_iam_arns" className="snap-top"></a>

* [**`cmk_user_iam_arns`**](#cmk_user_iam_arns) &mdash; A list of IAM ARNs for users who should be given permissions to use this KMS Master Key (e.g. arn:aws:iam::1234567890:user/foo).

<a name="create_route53_entry" className="snap-top"></a>

* [**`create_route53_entry`**](#create_route53_entry) &mdash; Set to true to add [`domain_name`](#domain_name) as a Route 53 DNS A record for the OpenVPN server

<a name="default_user" className="snap-top"></a>

* [**`default_user`**](#default_user) &mdash; The default OS user for the OpenVPN AMI. For AWS Ubuntu AMIs, which is what the Packer template in openvpn-server.json uses, the default OS user is 'ubuntu'.

<a name="domain_name" className="snap-top"></a>

* [**`domain_name`**](#domain_name) &mdash; The domain name to use for the OpenVPN server. Only used if [`create_route53_entry`](#create_route53_entry) is true. If null, set to [`&lt;NAME>.&lt;BASE_DOMAIN_NAME`](#&lt;NAME>.&lt;BASE_DOMAIN_NAME)>.

<a name="ebs_optimized" className="snap-top"></a>

* [**`ebs_optimized`**](#ebs_optimized) &mdash; If true, the launched EC2 instance will be EBS-optimized. Note that for most instance types, EBS optimization does not incur additional cost, and that many newer EC2 instance types have EBS optimization enabled by default. However, if you are running previous generation instances, there may be an additional cost per hour to run your instances with EBS optimization enabled. Please see: [`https://aws.amazon.com/ec2/pricing/on-demand/#EBS-Optimized_Instances`](#https://aws.amazon.com/ec2/pricing/on-demand/#EBS-Optimized_Instances)

<a name="enable_cloudwatch_alarms" className="snap-top"></a>

* [**`enable_cloudwatch_alarms`**](#enable_cloudwatch_alarms) &mdash; Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using [`alarms_sns_topic_arn`](#alarms_sns_topic_arn).

<a name="enable_cloudwatch_log_aggregation" className="snap-top"></a>

* [**`enable_cloudwatch_log_aggregation`**](#enable_cloudwatch_log_aggregation) &mdash; Set to true to send logs to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/logs/cloudwatch-log-aggregation-scripts to do log aggregation in CloudWatch.

<a name="enable_cloudwatch_metrics" className="snap-top"></a>

* [**`enable_cloudwatch_metrics`**](#enable_cloudwatch_metrics) &mdash; Set to true to add IAM permissions to send custom metrics to CloudWatch. This is useful in combination with https://github.com/gruntwork-io/terraform-aws-monitoring/tree/master/modules/agents/cloudwatch-agent to get memory and disk metrics in CloudWatch for your OpenVPN server.

<a name="enable_fail2ban" className="snap-top"></a>

* [**`enable_fail2ban`**](#enable_fail2ban) &mdash; Enable fail2ban to block brute force log in attempts. Defaults to true.

<a name="enable_ip_lockdown" className="snap-top"></a>

* [**`enable_ip_lockdown`**](#enable_ip_lockdown) &mdash; Enable ip-lockdown to block access to the instance metadata. Defaults to true.

<a name="enable_ssh_grunt" className="snap-top"></a>

* [**`enable_ssh_grunt`**](#enable_ssh_grunt) &mdash; Set to true to add IAM permissions for ssh-grunt (https://github.com/gruntwork-io/terraform-aws-security/tree/master/modules/ssh-grunt), which will allow you to manage SSH access via IAM groups.

<a name="external_account_arns" className="snap-top"></a>

* [**`external_account_arns`**](#external_account_arns) &mdash; The ARNs of external AWS accounts where your IAM users are defined. This module will create IAM roles that users in those accounts will be able to assume to get access to the request/revocation SQS queues.

<a name="external_account_ssh_grunt_role_arn" className="snap-top"></a>

* [**`external_account_ssh_grunt_role_arn`**](#external_account_ssh_grunt_role_arn) &mdash; Since our IAM users are defined in a separate AWS account, this variable is used to specify the ARN of an IAM role that allows ssh-grunt to retrieve IAM group and public SSH key info from that account.

<a name="force_destroy" className="snap-top"></a>

* [**`force_destroy`**](#force_destroy) &mdash; When a terraform destroy is run, should the backup s3 bucket be destroyed even if it contains files. Should only be set to true for testing/development

<a name="hosted_zone_id" className="snap-top"></a>

* [**`hosted_zone_id`**](#hosted_zone_id) &mdash; The ID of the Route 53 Hosted Zone in which the domain should be created. Only used if [`create_route53_entry`](#create_route53_entry) is true. If null, lookup the hosted zone ID using the [`base_domain_name`](#base_domain_name).

<a name="instance_type" className="snap-top"></a>

* [**`instance_type`**](#instance_type) &mdash; The type of instance to run for the OpenVPN Server

<a name="keypair_name" className="snap-top"></a>

* [**`keypair_name`**](#keypair_name) &mdash; The name of a Key Pair that can be used to SSH to this instance. Leave blank if you don't want to enable Key Pair auth.

<a name="kms_key_arn" className="snap-top"></a>

* [**`kms_key_arn`**](#kms_key_arn) &mdash; The Amazon Resource Name (ARN) of an existing KMS customer master key (CMK) that will be used to encrypt/decrypt backup files. If null, a key will be created with permissions assigned by the following variables: [`cmk_administrator_iam_arns`](#cmk_administrator_iam_arns), [`cmk_user_iam_arns`](#cmk_user_iam_arns), [`cmk_external_user_iam_arns`](#cmk_external_user_iam_arns), [`allow_manage_key_permissions`](#allow_manage_key_permissions).

<a name="name" className="snap-top"></a>

* [**`name`**](#name) &mdash; The name of the OpenVPN Server and the other resources created by these templates

<a name="request_queue_name" className="snap-top"></a>

* [**`request_queue_name`**](#request_queue_name) &mdash; The name of the sqs queue that will be used to receive new certificate requests.

<a name="revocation_queue_name" className="snap-top"></a>

* [**`revocation_queue_name`**](#revocation_queue_name) &mdash; The name of the sqs queue that will be used to receive certification revocation requests. Note that the queue name will be automatically prefixed with 'openvpn-requests-'.

<a name="should_create_cloudwatch_log_group" className="snap-top"></a>

* [**`should_create_cloudwatch_log_group`**](#should_create_cloudwatch_log_group) &mdash; When true, precreate the CloudWatch Log Group to use for log aggregation from the EC2 instances. This is useful if you wish to customize the CloudWatch Log Group with various settings such as retention periods and KMS encryption. When false, the CloudWatch agent will automatically create a basic log group to use.

<a name="ssh_grunt_iam_group" className="snap-top"></a>

* [**`ssh_grunt_iam_group`**](#ssh_grunt_iam_group) &mdash; If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this OpenVPN server. This value is only used if [`enable_ssh_grunt`](#enable_ssh_grunt)=true.

<a name="ssh_grunt_iam_group_sudo" className="snap-top"></a>

* [**`ssh_grunt_iam_group_sudo`**](#ssh_grunt_iam_group_sudo) &mdash; If you are using ssh-grunt, this is the name of the IAM group from which users will be allowed to SSH to this OpenVPN server with sudo permissions. This value is only used if [`enable_ssh_grunt`](#enable_ssh_grunt)=true.

<a name="subnet_ids" className="snap-top"></a>

* [**`subnet_ids`**](#subnet_ids) &mdash; The ids of the subnets where this server should be deployed.

<a name="tenancy" className="snap-top"></a>

* [**`tenancy`**](#tenancy) &mdash; The tenancy of this server. Must be one of: default, dedicated, or host.

<a name="use_managed_iam_policies" className="snap-top"></a>

* [**`use_managed_iam_policies`**](#use_managed_iam_policies) &mdash; When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards.

<a name="use_strong_prime" className="snap-top"></a>

* [**`use_strong_prime`**](#use_strong_prime) &mdash; When true, generate Diffie-Hellman parameters using strong primes. Note that while stronger primes make the keys more cryptographically secure, the effective security gains are known to be insignificant in practice.

<a name="vpc_id" className="snap-top"></a>

* [**`vpc_id`**](#vpc_id) &mdash; The ID of the VPC in which to deploy the OpenVPN server.

<a name="vpn_route_cidr_blocks" className="snap-top"></a>

* [**`vpn_route_cidr_blocks`**](#vpn_route_cidr_blocks) &mdash; A list of CIDR ranges to be routed over the VPN.

<a name="vpn_search_domains" className="snap-top"></a>

* [**`vpn_search_domains`**](#vpn_search_domains) &mdash; A list of domains to push down to the client to resolve over VPN. This will configure the OpenVPN server to pass through domains that should be resolved over the VPN connection (as opposed to the locally configured resolver) to the client. Note that for each domain, all subdomains will be resolved as well. E.g., if you pass in 'mydomain.local', subdomains such as 'hello.world.mydomain.local' and 'example.mydomain.local' will also be forwarded to through the VPN server.

<a name="vpn_subnet" className="snap-top"></a>

* [**`vpn_subnet`**](#vpn_subnet) &mdash; The subnet IP and mask vpn clients will be assigned addresses from. For example, 172.16.1.0 255.255.255.0. This is a non-routed network that only exists between the VPN server and the client. Therefore, it should NOT overlap with VPC addressing, or the client won't be able to access any of the VPC IPs. In general, we recommend using internal, non-RFC 1918 IP addresses, such as 172.16.xx.yy.

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="allow_certificate_requests_for_external_accounts_iam_role_arn" className="snap-top"></a>

* [**`allow_certificate_requests_for_external_accounts_iam_role_arn`**](#allow_certificate_requests_for_external_accounts_iam_role_arn) &mdash; The ARN of the IAM role that can be assumed from external accounts to request certificates.

<a name="allow_certificate_requests_for_external_accounts_iam_role_id" className="snap-top"></a>

* [**`allow_certificate_requests_for_external_accounts_iam_role_id`**](#allow_certificate_requests_for_external_accounts_iam_role_id) &mdash; The name of the IAM role that can be assumed from external accounts to request certificates.

<a name="allow_certificate_revocations_for_external_accounts_iam_role_arn" className="snap-top"></a>

* [**`allow_certificate_revocations_for_external_accounts_iam_role_arn`**](#allow_certificate_revocations_for_external_accounts_iam_role_arn) &mdash; The ARN of the IAM role that can be assumed from external accounts to revoke certificates.

<a name="allow_certificate_revocations_for_external_accounts_iam_role_id" className="snap-top"></a>

* [**`allow_certificate_revocations_for_external_accounts_iam_role_id`**](#allow_certificate_revocations_for_external_accounts_iam_role_id) &mdash; The name of the IAM role that can be assumed from external accounts to revoke certificates.

<a name="autoscaling_group_id" className="snap-top"></a>

* [**`autoscaling_group_id`**](#autoscaling_group_id) &mdash; The AutoScaling Group ID of the OpenVPN server.

<a name="backup_bucket_name" className="snap-top"></a>

* [**`backup_bucket_name`**](#backup_bucket_name) &mdash; The S3 bucket used for backing up the OpenVPN PKI.

<a name="client_request_queue" className="snap-top"></a>

* [**`client_request_queue`**](#client_request_queue) &mdash; The SQS queue used by the openvpn-admin tool for certificate requests.

<a name="client_revocation_queue" className="snap-top"></a>

* [**`client_revocation_queue`**](#client_revocation_queue) &mdash; The SQS queue used by the openvpn-admin tool for certificate revocations.

<a name="elastic_ip" className="snap-top"></a>

* [**`elastic_ip`**](#elastic_ip) &mdash; The elastic IP address of the OpenVPN server.

<a name="iam_role_id" className="snap-top"></a>

* [**`iam_role_id`**](#iam_role_id) &mdash; The ID of the IAM role used by the OpenVPN server.

<a name="openvpn_admins_group_name" className="snap-top"></a>

* [**`openvpn_admins_group_name`**](#openvpn_admins_group_name) &mdash; The name of the OpenVPN admins IAM group (to request and revoke certificates).

<a name="openvpn_users_group_name" className="snap-top"></a>

* [**`openvpn_users_group_name`**](#openvpn_users_group_name) &mdash; The name of the OpenVPN users IAM group (to request certificates).

<a name="private_ip" className="snap-top"></a>

* [**`private_ip`**](#private_ip) &mdash; The private IP address of the OpenVPN server.

<a name="public_ip" className="snap-top"></a>

* [**`public_ip`**](#public_ip) &mdash; The public IP address of the OpenVPN server.

<a name="security_group_id" className="snap-top"></a>

* [**`security_group_id`**](#security_group_id) &mdash; The security group ID of the OpenVPN server.

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"0d3d60fbb15a52ac9e47936765fde668"}
##DOCS-SOURCER-END -->
