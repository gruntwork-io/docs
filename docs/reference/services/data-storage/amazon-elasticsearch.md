---
type: "service"
name: "Amazon Elasticsearch"
description: "Deploy and manage Amazon Elasticsearch Service."
category: "nosql"
cloud: "aws"
tags: ["analytics","data"]
license: "gruntwork"
built-with: "terraform"
title: "Amazon Elasticsearch Service"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.104.14" lastModifiedVersion="0.95.1"/>

# Amazon Elasticsearch Service

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/data-stores/elasticsearch" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=data-stores%2Felasticsearch" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>

## Overview

This service contains code to deploy an Amazon Elasticsearch Service cluster.
See the [Amazon Elasticsearch Service documentation](http://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/what-is-amazon-elasticsearch-service.html)
and the [Getting Started](https://aws.amazon.com/elasticsearch-service/getting-started/) page for more information.

## Features

*   A fully-managed native Elasticsearch cluster in a VPC
*   A fully functional Kibana UI
*   VPC-based security
*   Zone awareness, i.e., deployment of Elasticsearch nodes across Availability Zones
*   Automatic nightly snapshots
*   CloudWatch Alarms for alerting when CPU, memory, and disk metrics exceed certain thresholds

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

*   [About Amazon Elasticsearch Service](https://aws.amazon.com/elasticsearch-service/)
*   [Features of Amazon ES](https://aws.amazon.com/elasticsearch-service/features/)
*   [Developer Guide](https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/what-is-amazon-elasticsearch-service.html):
    Contains the main documentation on how to use Amazon ES and answers questions such as "What is Amazon Elasticsearch
    Service?"
*   [Streaming CloudWatch monitoring logs to Amazon Elasticsearch Service](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_ES_Stream.html)

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

*   [AWS Free tier](https://aws.amazon.com/free/): Using Amazon ES on Amazon’s free tier is a great way to get started,
    but it has limited features and does not include encryption at rest, ultra warm data notes, or advanced security
    options such as fine-grained access control. The free tier does allow multiple availability zones, VPC-based access
    control, TLS-only requests, and node-to-node encryption.

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/),
    and it shows you how we build an end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

*   [Amazon Elasticsearch Service pricing](https://aws.amazon.com/elasticsearch-service/pricing/)


## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ELASTICSEARCH MODULE
#
# NOTE: This module uses some sensitive variables marked inline with "# SENSITIVE".
# When using values other than defaults for these variables, set them through environment variables or
# another secure method.
#
# ------------------------------------------------------------------------------------------------------

module "elasticsearch" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/elasticsearch?ref=v0.104.14"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the Elasticsearch cluster. It must be unique to your account and
  # region, start with a lowercase letter, contain between 3 and 28 characters,
  # and contain only lowercase letters a-z, the numbers 0-9, and the hyphen (-).
  domain_name = <string>

  # The number of instances to deploy in the Elasticsearch cluster. This must be
  # an even number if zone_awareness_enabled is true.
  instance_count = <number>

  # The instance type to use for Elasticsearch data nodes (e.g.,
  # t2.small.elasticsearch, or m4.large.elasticsearch). For supported instance
  # types see
  # https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/aes-supported-instance-types.html.
  instance_type = <string>

  # The size in GiB of the EBS volume for each node in the cluster (e.g. 10, or
  # 512). For volume size limits see
  # https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/aes-limits.html.
  volume_size = <number>

  # The type of EBS volumes to use in the cluster. Must be one of: standard,
  # gp2, io1, sc1, or st1. For a comparison of EBS volume types, see
  # https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/ebs-volume-types.html.
  volume_type = <string>

  # Whether to deploy the Elasticsearch nodes across two Availability Zones
  # instead of one. Note that if you enable this, the instance_count MUST be an
  # even number.
  zone_awareness_enabled = <bool>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Key-value string pairs to specify advanced configuration options. Note that
  # the values for these configuration options must be strings (wrapped in
  # quotes).
  advanced_options = {}

  # Enable fine grain access control
  advanced_security_options = false

  # ARNs of the SNS topics associated with the CloudWatch alarms for the
  # Elasticsearch cluster.
  alarm_sns_topic_arns = []

  # The list of network CIDR blocks to allow network access to Aurora from. One
  # of var.allow_connections_from_cidr_blocks or
  # var.allow_connections_from_security_groups must be specified for the
  # database to be reachable.
  allow_connections_from_cidr_blocks = []

  # The list of IDs or Security Groups to allow network access to Aurora from.
  # All security groups must either be in the VPC specified by var.vpc_id, or a
  # peered VPC with the VPC specified by var.vpc_id. One of
  # var.allow_connections_from_cidr_blocks or
  # var.allow_connections_from_security_groups must be specified for the
  # database to be reachable.
  allow_connections_from_security_groups = []

  # Hour during which the service takes an automated daily snapshot of the
  # indices in the domain. This setting has no effect on Elasticsearch 5.3 and
  # later.
  automated_snapshot_start_hour = 0

  # Number of Availability Zones for the domain to use with
  # var.zone_awareness_enabled. Defaults to 2. Valid values: 2 or 3.
  availability_zone_count = 2

  # The period, in seconds, over which to measure the CPU utilization percentage
  cluster_high_cpu_utilization_period = 60

  # Trigger an alarm if the Elasticsearch cluster has a CPU utilization
  # percentage above this threshold
  cluster_high_cpu_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  cluster_high_cpu_utilization_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the JVM heap usage percentage
  cluster_high_jvm_memory_pressure_period = 60

  # Trigger an alarm if the JVM heap usage percentage goes above this threshold
  cluster_high_jvm_memory_pressure_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  cluster_high_jvm_memory_pressure_treat_missing_data = "missing"

  # The maximum amount of time, in seconds, that ClusterIndexWritesBlocked can
  # be in red status before triggering an alarm
  cluster_index_writes_blocked_period = 300

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  cluster_index_writes_blocked_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the CPU credit balance
  cluster_low_cpu_credit_balance_period = 60

  # Trigger an alarm if the CPU credit balance drops below this threshold. Only
  # used if var.instance_type is t2.xxx.
  cluster_low_cpu_credit_balance_threshold = 10

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  cluster_low_cpu_credit_balance_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the available free storage
  # space
  cluster_low_free_storage_space_period = 60

  # Trigger an alarm if the amount of free storage space, in Megabytes, on the
  # Elasticsearch cluster drops below this threshold
  cluster_low_free_storage_space_threshold = 1024

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  cluster_low_free_storage_space_treat_missing_data = "missing"

  # The maximum amount of time, in seconds, during with the
  # AutomatedSnapshotFailure can be in red status before triggering an alarm
  cluster_snapshot_period = 60

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  cluster_snapshot_treat_missing_data = "missing"

  # The maximum amount of time, in seconds, during which the cluster can be in
  # red status before triggering an alarm
  cluster_status_red_period = 300

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  cluster_status_red_treat_missing_data = "missing"

  # The maximum amount of time, in seconds, during which the cluster can be in
  # yellow status before triggering an alarm
  cluster_status_yellow_period = 300

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  cluster_status_yellow_treat_missing_data = "missing"

  # Whether or not the Service Linked Role for Elasticsearch should be created
  # within this module. Normally the service linked role is created
  # automatically by AWS when creating the Elasticsearch domain in the web
  # console, but API does not implement this logic. You can either have AWS
  # automatically manage this by creating a domain manually in the console, or
  # manage it in terraform using the landing zone modules or this variable.
  create_service_linked_role = false

  # Fully qualified domain for your custom endpoint.
  custom_endpoint = null

  # ACM certificate ARN for your custom endpoint.
  custom_endpoint_certificate_arn = null

  # Whether to enable custom endpoint for the Elasticsearch domain.
  custom_endpoint_enabled = false

  # A map of custom tags to apply to the ElasticSearch Domain. The key is the
  # tag name and the value is the tag value.
  custom_tags = {}

  # The number of dedicated master nodes to run. We recommend setting this to 3
  # for production deployments. Only used if var.dedicated_master_enabled is
  # true.
  dedicated_master_count = null

  # Whether to deploy separate nodes specifically for performing cluster
  # management tasks (e.g. tracking number of nodes, monitoring health,
  # replicating changes). This increases the stability of large clusters and is
  # required for clusters with more than 10 nodes.
  dedicated_master_enabled = false

  # The instance type for the dedicated master nodes. These nodes can use a
  # different instance type than the rest of the cluster. Only used if
  # var.dedicated_master_enabled is true.
  dedicated_master_type = null

  # Set to false to disable EBS volumes. This is useful for nodes that have
  # optimized instance storage, like hosts running the i3 instance type.
  ebs_enabled = true

  # The version of Elasticsearch to deploy.
  elasticsearch_version = "7.7"

  # Set to true to enable several basic CloudWatch alarms around CPU usage,
  # memory usage, and disk space usage. If set to true, make sure to specify SNS
  # topics to send notifications to using var.alarms_sns_topic_arns.
  enable_cloudwatch_alarms = true

  # False by default because encryption at rest is not included in the free
  # tier. When true, the Elasticsearch domain storage will be encrypted at rest
  # using the KMS key described with var.encryption_kms_key_id. We strongly
  # recommend configuring a custom KMS key instead of using the shared service
  # key for a better security posture when configuring encryption at rest.
  enable_encryption_at_rest = true

  # Whether to enable node-to-node encryption. 
  enable_node_to_node_encryption = true

  # The ID of the KMS key to use to encrypt the Elasticsearch domain storage.
  # Only used if enable_encryption_at_rest. When null, uses the aws/es service
  # KMS key.
  encryption_kms_key_id = null

  # The ARNS of the IAM users and roles to which to allow full access to the
  # Elasticsearch cluster. Setting this to a restricted list is useful when
  # using a public access cluster.
  iam_principal_arns = ["*"]

  # Whether the internal user database is enabled. Enable this to use master
  # accounts. Only used if advanced_security_options is set to true.
  internal_user_database_enabled = false

  # The baseline input/output (I/O) performance of EBS volumes attached to data
  # nodes. Must be between 1000 and 4000. Applicable only if var.volume_type is
  # io1.
  iops = null

  # Whether the cluster is publicly accessible.
  is_public = false

  # The maximum amount of time, in seconds, that KMSKeyError can be in red
  # status before triggering an alarm
  kms_key_error_period = 60

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  kms_key_error_treat_missing_data = "missing"

  # The maximum amount of time, in seconds, that KMSKeyInaccessible can be in
  # red status before triggering an alarm
  kms_key_inaccessible_period = 60

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  kms_key_inaccessible_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the master nodes' CPU
  # utilization
  master_cpu_utilization_period = 900

  # Trigger an alarm if the Elasticsearch cluster master nodes have a CPU
  # utilization percentage above this threshold
  master_cpu_utilization_threshold = 50

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  master_cpu_utilization_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the master nodes' JVM memory
  # pressure
  master_jvm_memory_pressure_period = 900

  # Trigger an alarm if the Elasticsearch cluster master nodes have a JVM memory
  # pressure percentage above this threshold
  master_jvm_memory_pressure_threshold = 80

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  master_jvm_memory_pressure_treat_missing_data = "missing"

  # ARN of the master user. Only used if advanced_security_options and
  # internal_user_database_enabled are set to true.
  master_user_arn = null

  # Master account user name. Only used if advanced_security_options and
  # internal_user_database_enabled are set to true.
  master_user_name = null

  # Master account user password. Only used if advanced_security_options and
  # internal_user_database_enabled are set to true. WARNING: this password will
  # be stored in Terraform state.
  master_user_password = null # SENSITIVE

  # Whether to monitor KMS key statistics
  monitor_kms_key = false

  # Whether to monitor master node statistics
  monitor_master_nodes = false

  # The period, in seconds, over which to measure the master nodes' CPU
  # utilization
  node_count_period = 86400

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  node_count_treat_missing_data = "missing"

  #  List of VPC Subnet IDs for the Elasticsearch domain endpoints to be created
  # in. If var.zone_awareness_enabled is true, the first 2 or 3 provided subnet
  # ids are used, depending on var.availability_zone_count. Otherwise only the
  # first one is used.
  subnet_ids = []

  # The name of the TLS security policy that needs to be applied to the HTTPS
  # endpoint. Valid values are Policy-Min-TLS-1-0-2019-07 and
  # Policy-Min-TLS-1-2-2019-07. Terraform performs drift detection if this is
  # configured.
  tls_security_policy = "Policy-Min-TLS-1-2-2019-07"

  # How long to wait for updates to the ES cluster before timing out and
  # reporting an error.
  update_timeout = "90m"

  # The id of the VPC to deploy into. It must be in the same region as the
  # Elasticsearch domain and its tenancy must be set to Default. If
  # zone_awareness_enabled is false, the Elasticsearch cluster will have an
  # endpoint in one subnet of the VPC; otherwise it will have endpoints in two
  # subnets.
  vpc_id = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ELASTICSEARCH MODULE
#
# NOTE: This module uses some sensitive variables marked inline with "# SENSITIVE".
# When using values other than defaults for these variables, set them through environment variables or
# another secure method.
#
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/elasticsearch?ref=v0.104.14"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the Elasticsearch cluster. It must be unique to your account and
  # region, start with a lowercase letter, contain between 3 and 28 characters,
  # and contain only lowercase letters a-z, the numbers 0-9, and the hyphen (-).
  domain_name = <string>

  # The number of instances to deploy in the Elasticsearch cluster. This must be
  # an even number if zone_awareness_enabled is true.
  instance_count = <number>

  # The instance type to use for Elasticsearch data nodes (e.g.,
  # t2.small.elasticsearch, or m4.large.elasticsearch). For supported instance
  # types see
  # https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/aes-supported-instance-types.html.
  instance_type = <string>

  # The size in GiB of the EBS volume for each node in the cluster (e.g. 10, or
  # 512). For volume size limits see
  # https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/aes-limits.html.
  volume_size = <number>

  # The type of EBS volumes to use in the cluster. Must be one of: standard,
  # gp2, io1, sc1, or st1. For a comparison of EBS volume types, see
  # https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/ebs-volume-types.html.
  volume_type = <string>

  # Whether to deploy the Elasticsearch nodes across two Availability Zones
  # instead of one. Note that if you enable this, the instance_count MUST be an
  # even number.
  zone_awareness_enabled = <bool>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Key-value string pairs to specify advanced configuration options. Note that
  # the values for these configuration options must be strings (wrapped in
  # quotes).
  advanced_options = {}

  # Enable fine grain access control
  advanced_security_options = false

  # ARNs of the SNS topics associated with the CloudWatch alarms for the
  # Elasticsearch cluster.
  alarm_sns_topic_arns = []

  # The list of network CIDR blocks to allow network access to Aurora from. One
  # of var.allow_connections_from_cidr_blocks or
  # var.allow_connections_from_security_groups must be specified for the
  # database to be reachable.
  allow_connections_from_cidr_blocks = []

  # The list of IDs or Security Groups to allow network access to Aurora from.
  # All security groups must either be in the VPC specified by var.vpc_id, or a
  # peered VPC with the VPC specified by var.vpc_id. One of
  # var.allow_connections_from_cidr_blocks or
  # var.allow_connections_from_security_groups must be specified for the
  # database to be reachable.
  allow_connections_from_security_groups = []

  # Hour during which the service takes an automated daily snapshot of the
  # indices in the domain. This setting has no effect on Elasticsearch 5.3 and
  # later.
  automated_snapshot_start_hour = 0

  # Number of Availability Zones for the domain to use with
  # var.zone_awareness_enabled. Defaults to 2. Valid values: 2 or 3.
  availability_zone_count = 2

  # The period, in seconds, over which to measure the CPU utilization percentage
  cluster_high_cpu_utilization_period = 60

  # Trigger an alarm if the Elasticsearch cluster has a CPU utilization
  # percentage above this threshold
  cluster_high_cpu_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  cluster_high_cpu_utilization_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the JVM heap usage percentage
  cluster_high_jvm_memory_pressure_period = 60

  # Trigger an alarm if the JVM heap usage percentage goes above this threshold
  cluster_high_jvm_memory_pressure_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  cluster_high_jvm_memory_pressure_treat_missing_data = "missing"

  # The maximum amount of time, in seconds, that ClusterIndexWritesBlocked can
  # be in red status before triggering an alarm
  cluster_index_writes_blocked_period = 300

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  cluster_index_writes_blocked_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the CPU credit balance
  cluster_low_cpu_credit_balance_period = 60

  # Trigger an alarm if the CPU credit balance drops below this threshold. Only
  # used if var.instance_type is t2.xxx.
  cluster_low_cpu_credit_balance_threshold = 10

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  cluster_low_cpu_credit_balance_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the available free storage
  # space
  cluster_low_free_storage_space_period = 60

  # Trigger an alarm if the amount of free storage space, in Megabytes, on the
  # Elasticsearch cluster drops below this threshold
  cluster_low_free_storage_space_threshold = 1024

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  cluster_low_free_storage_space_treat_missing_data = "missing"

  # The maximum amount of time, in seconds, during with the
  # AutomatedSnapshotFailure can be in red status before triggering an alarm
  cluster_snapshot_period = 60

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  cluster_snapshot_treat_missing_data = "missing"

  # The maximum amount of time, in seconds, during which the cluster can be in
  # red status before triggering an alarm
  cluster_status_red_period = 300

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  cluster_status_red_treat_missing_data = "missing"

  # The maximum amount of time, in seconds, during which the cluster can be in
  # yellow status before triggering an alarm
  cluster_status_yellow_period = 300

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  cluster_status_yellow_treat_missing_data = "missing"

  # Whether or not the Service Linked Role for Elasticsearch should be created
  # within this module. Normally the service linked role is created
  # automatically by AWS when creating the Elasticsearch domain in the web
  # console, but API does not implement this logic. You can either have AWS
  # automatically manage this by creating a domain manually in the console, or
  # manage it in terraform using the landing zone modules or this variable.
  create_service_linked_role = false

  # Fully qualified domain for your custom endpoint.
  custom_endpoint = null

  # ACM certificate ARN for your custom endpoint.
  custom_endpoint_certificate_arn = null

  # Whether to enable custom endpoint for the Elasticsearch domain.
  custom_endpoint_enabled = false

  # A map of custom tags to apply to the ElasticSearch Domain. The key is the
  # tag name and the value is the tag value.
  custom_tags = {}

  # The number of dedicated master nodes to run. We recommend setting this to 3
  # for production deployments. Only used if var.dedicated_master_enabled is
  # true.
  dedicated_master_count = null

  # Whether to deploy separate nodes specifically for performing cluster
  # management tasks (e.g. tracking number of nodes, monitoring health,
  # replicating changes). This increases the stability of large clusters and is
  # required for clusters with more than 10 nodes.
  dedicated_master_enabled = false

  # The instance type for the dedicated master nodes. These nodes can use a
  # different instance type than the rest of the cluster. Only used if
  # var.dedicated_master_enabled is true.
  dedicated_master_type = null

  # Set to false to disable EBS volumes. This is useful for nodes that have
  # optimized instance storage, like hosts running the i3 instance type.
  ebs_enabled = true

  # The version of Elasticsearch to deploy.
  elasticsearch_version = "7.7"

  # Set to true to enable several basic CloudWatch alarms around CPU usage,
  # memory usage, and disk space usage. If set to true, make sure to specify SNS
  # topics to send notifications to using var.alarms_sns_topic_arns.
  enable_cloudwatch_alarms = true

  # False by default because encryption at rest is not included in the free
  # tier. When true, the Elasticsearch domain storage will be encrypted at rest
  # using the KMS key described with var.encryption_kms_key_id. We strongly
  # recommend configuring a custom KMS key instead of using the shared service
  # key for a better security posture when configuring encryption at rest.
  enable_encryption_at_rest = true

  # Whether to enable node-to-node encryption. 
  enable_node_to_node_encryption = true

  # The ID of the KMS key to use to encrypt the Elasticsearch domain storage.
  # Only used if enable_encryption_at_rest. When null, uses the aws/es service
  # KMS key.
  encryption_kms_key_id = null

  # The ARNS of the IAM users and roles to which to allow full access to the
  # Elasticsearch cluster. Setting this to a restricted list is useful when
  # using a public access cluster.
  iam_principal_arns = ["*"]

  # Whether the internal user database is enabled. Enable this to use master
  # accounts. Only used if advanced_security_options is set to true.
  internal_user_database_enabled = false

  # The baseline input/output (I/O) performance of EBS volumes attached to data
  # nodes. Must be between 1000 and 4000. Applicable only if var.volume_type is
  # io1.
  iops = null

  # Whether the cluster is publicly accessible.
  is_public = false

  # The maximum amount of time, in seconds, that KMSKeyError can be in red
  # status before triggering an alarm
  kms_key_error_period = 60

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  kms_key_error_treat_missing_data = "missing"

  # The maximum amount of time, in seconds, that KMSKeyInaccessible can be in
  # red status before triggering an alarm
  kms_key_inaccessible_period = 60

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  kms_key_inaccessible_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the master nodes' CPU
  # utilization
  master_cpu_utilization_period = 900

  # Trigger an alarm if the Elasticsearch cluster master nodes have a CPU
  # utilization percentage above this threshold
  master_cpu_utilization_threshold = 50

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  master_cpu_utilization_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the master nodes' JVM memory
  # pressure
  master_jvm_memory_pressure_period = 900

  # Trigger an alarm if the Elasticsearch cluster master nodes have a JVM memory
  # pressure percentage above this threshold
  master_jvm_memory_pressure_threshold = 80

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  master_jvm_memory_pressure_treat_missing_data = "missing"

  # ARN of the master user. Only used if advanced_security_options and
  # internal_user_database_enabled are set to true.
  master_user_arn = null

  # Master account user name. Only used if advanced_security_options and
  # internal_user_database_enabled are set to true.
  master_user_name = null

  # Master account user password. Only used if advanced_security_options and
  # internal_user_database_enabled are set to true. WARNING: this password will
  # be stored in Terraform state.
  master_user_password = null # SENSITIVE

  # Whether to monitor KMS key statistics
  monitor_kms_key = false

  # Whether to monitor master node statistics
  monitor_master_nodes = false

  # The period, in seconds, over which to measure the master nodes' CPU
  # utilization
  node_count_period = 86400

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  node_count_treat_missing_data = "missing"

  #  List of VPC Subnet IDs for the Elasticsearch domain endpoints to be created
  # in. If var.zone_awareness_enabled is true, the first 2 or 3 provided subnet
  # ids are used, depending on var.availability_zone_count. Otherwise only the
  # first one is used.
  subnet_ids = []

  # The name of the TLS security policy that needs to be applied to the HTTPS
  # endpoint. Valid values are Policy-Min-TLS-1-0-2019-07 and
  # Policy-Min-TLS-1-2-2019-07. Terraform performs drift detection if this is
  # configured.
  tls_security_policy = "Policy-Min-TLS-1-2-2019-07"

  # How long to wait for updates to the ES cluster before timing out and
  # reporting an error.
  update_timeout = "90m"

  # The id of the VPC to deploy into. It must be in the same region as the
  # Elasticsearch domain and its tenancy must be set to Default. If
  # zone_awareness_enabled is false, the Elasticsearch cluster will have an
  # endpoint in one subnet of the VPC; otherwise it will have endpoints in two
  # subnets.
  vpc_id = null

}


```

</TabItem>
</Tabs>



## Reference


<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="domain_name" requirement="required" type="string">
<HclListItemDescription>

The name of the Elasticsearch cluster. It must be unique to your account and region, start with a lowercase letter, contain between 3 and 28 characters, and contain only lowercase letters a-z, the numbers 0-9, and the hyphen (-).

</HclListItemDescription>
</HclListItem>

<HclListItem name="instance_count" requirement="required" type="number">
<HclListItemDescription>

The number of instances to deploy in the Elasticsearch cluster. This must be an even number if zone_awareness_enabled is true.

</HclListItemDescription>
</HclListItem>

<HclListItem name="instance_type" requirement="required" type="string">
<HclListItemDescription>

The instance type to use for Elasticsearch data nodes (e.g., t2.small.elasticsearch, or m4.large.elasticsearch). For supported instance types see https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/aes-supported-instance-types.html.

</HclListItemDescription>
</HclListItem>

<HclListItem name="volume_size" requirement="required" type="number">
<HclListItemDescription>

The size in GiB of the EBS volume for each node in the cluster (e.g. 10, or 512). For volume size limits see https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/aes-limits.html.

</HclListItemDescription>
</HclListItem>

<HclListItem name="volume_type" requirement="required" type="string">
<HclListItemDescription>

The type of EBS volumes to use in the cluster. Must be one of: standard, gp2, io1, sc1, or st1. For a comparison of EBS volume types, see https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/ebs-volume-types.html.

</HclListItemDescription>
</HclListItem>

<HclListItem name="zone_awareness_enabled" requirement="required" type="bool">
<HclListItemDescription>

Whether to deploy the Elasticsearch nodes across two Availability Zones instead of one. Note that if you enable this, the instance_count MUST be an even number.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="advanced_options" requirement="optional" type="map(any)">
<HclListItemDescription>

Key-value string pairs to specify advanced configuration options. Note that the values for these configuration options must be strings (wrapped in quotes).

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="advanced_security_options" requirement="optional" type="bool">
<HclListItemDescription>

Enable fine grain access control

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="alarm_sns_topic_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

ARNs of the SNS topics associated with the CloudWatch alarms for the Elasticsearch cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_cidr_blocks" requirement="optional" type="set(string)">
<HclListItemDescription>

The list of network CIDR blocks to allow network access to Aurora from. One of <a href="#allow_connections_from_cidr_blocks"><code>allow_connections_from_cidr_blocks</code></a> or <a href="#allow_connections_from_security_groups"><code>allow_connections_from_security_groups</code></a> must be specified for the database to be reachable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_security_groups" requirement="optional" type="set(string)">
<HclListItemDescription>

The list of IDs or Security Groups to allow network access to Aurora from. All security groups must either be in the VPC specified by <a href="#vpc_id"><code>vpc_id</code></a>, or a peered VPC with the VPC specified by <a href="#vpc_id"><code>vpc_id</code></a>. One of <a href="#allow_connections_from_cidr_blocks"><code>allow_connections_from_cidr_blocks</code></a> or <a href="#allow_connections_from_security_groups"><code>allow_connections_from_security_groups</code></a> must be specified for the database to be reachable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="automated_snapshot_start_hour" requirement="optional" type="number">
<HclListItemDescription>

Hour during which the service takes an automated daily snapshot of the indices in the domain. This setting has no effect on Elasticsearch 5.3 and later.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="availability_zone_count" requirement="optional" type="number">
<HclListItemDescription>

Number of Availability Zones for the domain to use with <a href="#zone_awareness_enabled"><code>zone_awareness_enabled</code></a>. Defaults to 2. Valid values: 2 or 3.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="2"/>
</HclListItem>

<HclListItem name="cluster_high_cpu_utilization_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the CPU utilization percentage

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="cluster_high_cpu_utilization_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the Elasticsearch cluster has a CPU utilization percentage above this threshold

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="90"/>
</HclListItem>

<HclListItem name="cluster_high_cpu_utilization_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="cluster_high_jvm_memory_pressure_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the JVM heap usage percentage

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="cluster_high_jvm_memory_pressure_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the JVM heap usage percentage goes above this threshold

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="90"/>
</HclListItem>

<HclListItem name="cluster_high_jvm_memory_pressure_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="cluster_index_writes_blocked_period" requirement="optional" type="number">
<HclListItemDescription>

The maximum amount of time, in seconds, that ClusterIndexWritesBlocked can be in red status before triggering an alarm

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="cluster_index_writes_blocked_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="cluster_low_cpu_credit_balance_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the CPU credit balance

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="cluster_low_cpu_credit_balance_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the CPU credit balance drops below this threshold. Only used if <a href="#instance_type"><code>instance_type</code></a> is t2.xxx.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="10"/>
</HclListItem>

<HclListItem name="cluster_low_cpu_credit_balance_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="cluster_low_free_storage_space_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the available free storage space

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="cluster_low_free_storage_space_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the amount of free storage space, in Megabytes, on the Elasticsearch cluster drops below this threshold

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1024"/>
</HclListItem>

<HclListItem name="cluster_low_free_storage_space_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="cluster_snapshot_period" requirement="optional" type="number">
<HclListItemDescription>

The maximum amount of time, in seconds, during with the AutomatedSnapshotFailure can be in red status before triggering an alarm

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="cluster_snapshot_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="cluster_status_red_period" requirement="optional" type="number">
<HclListItemDescription>

The maximum amount of time, in seconds, during which the cluster can be in red status before triggering an alarm

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="cluster_status_red_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="cluster_status_yellow_period" requirement="optional" type="number">
<HclListItemDescription>

The maximum amount of time, in seconds, during which the cluster can be in yellow status before triggering an alarm

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="cluster_status_yellow_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="create_service_linked_role" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not the Service Linked Role for Elasticsearch should be created within this module. Normally the service linked role is created automatically by AWS when creating the Elasticsearch domain in the web console, but API does not implement this logic. You can either have AWS automatically manage this by creating a domain manually in the console, or manage it in terraform using the landing zone modules or this variable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="custom_endpoint" requirement="optional" type="string">
<HclListItemDescription>

Fully qualified domain for your custom endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_endpoint_certificate_arn" requirement="optional" type="string">
<HclListItemDescription>

ACM certificate ARN for your custom endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_endpoint_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable custom endpoint for the Elasticsearch domain.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the ElasticSearch Domain. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="dedicated_master_count" requirement="optional" type="number">
<HclListItemDescription>

The number of dedicated master nodes to run. We recommend setting this to 3 for production deployments. Only used if <a href="#dedicated_master_enabled"><code>dedicated_master_enabled</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="dedicated_master_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether to deploy separate nodes specifically for performing cluster management tasks (e.g. tracking number of nodes, monitoring health, replicating changes). This increases the stability of large clusters and is required for clusters with more than 10 nodes.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="dedicated_master_type" requirement="optional" type="string">
<HclListItemDescription>

The instance type for the dedicated master nodes. These nodes can use a different instance type than the rest of the cluster. Only used if <a href="#dedicated_master_enabled"><code>dedicated_master_enabled</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ebs_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to disable EBS volumes. This is useful for nodes that have optimized instance storage, like hosts running the i3 instance type.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="elasticsearch_version" requirement="optional" type="string">
<HclListItemDescription>

The version of Elasticsearch to deploy.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;7.7&quot;"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_alarms" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using <a href="#alarms_sns_topic_arns"><code>alarms_sns_topic_arns</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_encryption_at_rest" requirement="optional" type="bool">
<HclListItemDescription>

False by default because encryption at rest is not included in the free tier. When true, the Elasticsearch domain storage will be encrypted at rest using the KMS key described with <a href="#encryption_kms_key_id"><code>encryption_kms_key_id</code></a>. We strongly recommend configuring a custom KMS key instead of using the shared service key for a better security posture when configuring encryption at rest.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_node_to_node_encryption" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable node-to-node encryption. 

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="encryption_kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the KMS key to use to encrypt the Elasticsearch domain storage. Only used if enable_encryption_at_rest. When null, uses the aws/es service KMS key.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="iam_principal_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

The ARNS of the IAM users and roles to which to allow full access to the Elasticsearch cluster. Setting this to a restricted list is useful when using a public access cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[
  &quot;*&quot;
]"/>
</HclListItem>

<HclListItem name="internal_user_database_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether the internal user database is enabled. Enable this to use master accounts. Only used if advanced_security_options is set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="iops" requirement="optional" type="number">
<HclListItemDescription>

The baseline input/output (I/O) performance of EBS volumes attached to data nodes. Must be between 1000 and 4000. Applicable only if <a href="#volume_type"><code>volume_type</code></a> is io1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="is_public" requirement="optional" type="bool">
<HclListItemDescription>

Whether the cluster is publicly accessible.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="kms_key_error_period" requirement="optional" type="number">
<HclListItemDescription>

The maximum amount of time, in seconds, that KMSKeyError can be in red status before triggering an alarm

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="kms_key_error_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="kms_key_inaccessible_period" requirement="optional" type="number">
<HclListItemDescription>

The maximum amount of time, in seconds, that KMSKeyInaccessible can be in red status before triggering an alarm

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="kms_key_inaccessible_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="master_cpu_utilization_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the master nodes' CPU utilization

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="900"/>
</HclListItem>

<HclListItem name="master_cpu_utilization_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the Elasticsearch cluster master nodes have a CPU utilization percentage above this threshold

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="50"/>
</HclListItem>

<HclListItem name="master_cpu_utilization_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="master_jvm_memory_pressure_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the master nodes' JVM memory pressure

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="900"/>
</HclListItem>

<HclListItem name="master_jvm_memory_pressure_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the Elasticsearch cluster master nodes have a JVM memory pressure percentage above this threshold

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="80"/>
</HclListItem>

<HclListItem name="master_jvm_memory_pressure_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="master_user_arn" requirement="optional" type="string">
<HclListItemDescription>

ARN of the master user. Only used if advanced_security_options and internal_user_database_enabled are set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="master_user_name" requirement="optional" type="string">
<HclListItemDescription>

Master account user name. Only used if advanced_security_options and internal_user_database_enabled are set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="master_user_password" requirement="optional" type="string">
<HclListItemDescription>

Master account user password. Only used if advanced_security_options and internal_user_database_enabled are set to true. WARNING: this password will be stored in Terraform state.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="monitor_kms_key" requirement="optional" type="bool">
<HclListItemDescription>

Whether to monitor KMS key statistics

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="monitor_master_nodes" requirement="optional" type="bool">
<HclListItemDescription>

Whether to monitor master node statistics

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="node_count_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the master nodes' CPU utilization

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="86400"/>
</HclListItem>

<HclListItem name="node_count_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

 List of VPC Subnet IDs for the Elasticsearch domain endpoints to be created in. If <a href="#zone_awareness_enabled"><code>zone_awareness_enabled</code></a> is true, the first 2 or 3 provided subnet ids are used, depending on <a href="#availability_zone_count"><code>availability_zone_count</code></a>. Otherwise only the first one is used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="tls_security_policy" requirement="optional" type="string">
<HclListItemDescription>

The name of the TLS security policy that needs to be applied to the HTTPS endpoint. Valid values are Policy-Min-TLS-1-0-2019-07 and Policy-Min-TLS-1-2-2019-07. Terraform performs drift detection if this is configured.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;Policy-Min-TLS-1-2-2019-07&quot;"/>
</HclListItem>

<HclListItem name="update_timeout" requirement="optional" type="string">
<HclListItemDescription>

How long to wait for updates to the ES cluster before timing out and reporting an error.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;90m&quot;"/>
</HclListItem>

<HclListItem name="vpc_id" requirement="optional" type="string">
<HclListItemDescription>

The id of the VPC to deploy into. It must be in the same region as the Elasticsearch domain and its tenancy must be set to Default. If zone_awareness_enabled is false, the Elasticsearch cluster will have an endpoint in one subnet of the VPC; otherwise it will have endpoints in two subnets.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="cluster_arn">
<HclListItemDescription>

The ARN of the Elasticsearch cluster created by this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_domain_id">
<HclListItemDescription>

The domain ID of the Elasticsearch cluster created by this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_domain_name">
<HclListItemDescription>

The name of the Elasticsearch domain.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_endpoint">
<HclListItemDescription>

The endpoint of the Elasticsearch cluster created by this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_security_group_id">
<HclListItemDescription>

If the domain was created inside a VPC, the ID of the security group created by this module for securing the Elasticsearch cluster.

</HclListItemDescription>
</HclListItem>

<HclListItem name="kibana_endpoint">
<HclListItemDescription>

Domain-specific endpoint for Kibana without https scheme.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/data-stores/elasticsearch/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/data-stores/elasticsearch/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/data-stores/elasticsearch/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "16008236d6d40091adc7cb6d7069209e"
}
##DOCS-SOURCER-END -->
