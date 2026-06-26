---
type: "service"
name: "Amazon OpenSearch"
description: "Deploy and manage an Amazon OpenSearch Service domain."
category: "nosql"
cloud: "aws"
tags: ["analytics","data"]
license: "gruntwork"
built-with: "terraform"
title: "Amazon OpenSearch Service"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="2.11.0" />

# Amazon OpenSearch Service

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v2.11.0/modules/data-stores/opensearch" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=data-stores%2Fopensearch" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>

## Overview

This service deploys an [Amazon OpenSearch Service](https://aws.amazon.com/opensearch-service/) domain (the successor
to Amazon Elasticsearch Service). It wraps the [terraform-aws-data-storage opensearch
module](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/main/modules/opensearch) and adds CloudWatch
alarms for monitoring the health of the domain. It replaces the legacy self-contained
[elasticsearch module](/reference/services/data-storage/amazon-elasticsearch).

## Features

*   A fully-managed OpenSearch domain in a VPC (or with a public endpoint)
*   A fully functional OpenSearch Dashboards (formerly Kibana) UI
*   VPC-based security
*   Encryption at rest and node-to-node encryption
*   Fine-grained access control, SAML, Cognito, and IAM Identity Center authentication
*   Zone awareness, UltraWarm, and cold storage
*   CloudWatch Alarms for alerting when CPU, memory, and disk metrics exceed certain thresholds

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

*   [About Amazon OpenSearch Service](https://aws.amazon.com/opensearch-service/)
*   [Developer Guide](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html):
    Contains the main documentation on how to use Amazon OpenSearch Service.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v2.11.0/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v2.11.0/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/),
    and it shows you how we build an end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

*   [Amazon OpenSearch Service pricing](https://aws.amazon.com/opensearch-service/pricing/)


## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S OPENSEARCH MODULE
#
# NOTE: This module uses some sensitive variables marked inline with "# SENSITIVE".
# When using values other than defaults for these variables, set them through environment variables or
# another secure method.
#
# ------------------------------------------------------------------------------------------------------

module "opensearch" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/data-stores/opensearch?ref=v2.11.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the OpenSearch domain. Must be between 3 and 28 characters,
  # start with a lowercase letter, and contain only lowercase letters, numbers,
  # and hyphens.
  domain_name = <string>

  # The engine version for the OpenSearch domain (e.g. 'OpenSearch_2.11' or
  # 'Elasticsearch_7.10').
  engine_version = <string>

  # The number of data nodes in the OpenSearch domain.
  instance_count = <number>

  # The instance type for the OpenSearch domain data nodes (e.g.
  # 'm6g.large.search').
  instance_type = <string>

  # The size of the EBS volume in GB for each data node.
  volume_size = <number>

  # The type of EBS volume to use (gp3, gp2, io1, or standard).
  volume_type = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # IAM policy document specifying the access policies for the domain. If null,
  # no access policy is applied.
  access_policies = null

  # Key-value pairs of advanced configuration options (e.g.
  # 'rest.action.multi.allow_explicit_index' = 'true').
  advanced_options = null

  # Whether to enable fine-grained access control (FGAC). Requires
  # enforce_https, node_to_node_encryption, and encrypt_at_rest to be true.
  advanced_security_options_enabled = false

  # ARNs of the SNS topics associated with the CloudWatch alarms for the
  # OpenSearch domain.
  alarms_sns_topic_arns = []

  # A list of CIDR-formatted IP address ranges that can connect to this
  # OpenSearch domain over HTTPS (port 443).
  allow_connections_from_cidr_blocks = []

  # A list of IPv6 CIDR-formatted IP address ranges that can connect to this
  # OpenSearch domain over HTTPS (port 443).
  allow_connections_from_ipv6_cidr_blocks = []

  # A list of security group IDs that can connect to this OpenSearch domain.
  allow_connections_from_security_groups = []

  # Whether to enable anonymous authentication. Only relevant when
  # advanced_security_options_enabled is true.
  anonymous_auth_enabled = false

  # Whether automatic software updates are enabled for the domain.
  auto_software_update_enabled = false

  # The Auto-Tune desired state. Valid values are 'ENABLED' and 'DISABLED'.
  auto_tune_desired_state = "ENABLED"

  # Whether to enable Auto-Tune for the domain.
  auto_tune_enabled = false

  # A list of Auto-Tune maintenance schedules.
  auto_tune_maintenance_schedules = []

  # Whether to roll back Auto-Tune settings when disabling. Valid values are
  # 'NO_ROLLBACK' and 'DEFAULT_ROLLBACK'.
  auto_tune_rollback_on_disable = "NO_ROLLBACK"

  # The hour (0-23) during which the service takes an automated daily snapshot
  # of the indices. Set to null to omit.
  automated_snapshot_start_hour = null

  # The number of availability zones for zone-aware domains. Valid values are 2
  # or 3. Only used when zone_awareness_enabled is true.
  availability_zone_count = 2

  # The period, in seconds, over which to measure the CPU utilization percentage
  cluster_high_cpu_utilization_period = 60

  # Trigger an alarm if the OpenSearch domain has a CPU utilization percentage
  # above this threshold
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
  # OpenSearch domain drops below this threshold
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

  # Cognito authentication options for OpenSearch Dashboards. Set to null to
  # disable Cognito.
  cognito_options = null

  # Whether cold storage is enabled. Requires UltraWarm to be enabled.
  cold_storage_enabled = false

  # Whether to create the AWSServiceRoleForAmazonOpenSearchService
  # service-linked role. Only needed once per AWS account.
  create_service_linked_role = false

  # Timeout for creating the OpenSearch domain.
  creating_timeout = "60m"

  # The fully qualified domain name for a custom endpoint (e.g.
  # 'search.example.com'). If null, custom endpoints are disabled.
  custom_endpoint = null

  # The ACM certificate ARN for the custom endpoint. Required when
  # custom_endpoint is set.
  custom_endpoint_certificate_arn = null

  # A map of custom tags to apply to the OpenSearch domain and security group.
  # The key is the tag name and the value is the tag value.
  custom_tags = {}

  # The number of dedicated master nodes in the cluster.
  dedicated_master_count = null

  # Whether dedicated master nodes are enabled for the cluster.
  dedicated_master_enabled = false

  # The instance type for the dedicated master nodes (e.g. 'm6g.large.search').
  dedicated_master_type = null

  # Timeout for deleting the OpenSearch domain.
  deleting_timeout = "60m"

  # Whether EBS volumes are attached to data nodes.
  ebs_enabled = true

  # Set to true to enable several basic CloudWatch alarms around CPU usage,
  # memory usage, and disk space usage. If set to true, make sure to specify SNS
  # topics to send notifications to using var.alarms_sns_topic_arns.
  enable_cloudwatch_alarms = true

  # Whether to enable encryption at rest for the OpenSearch domain.
  encrypt_at_rest = true

  # Whether to require HTTPS for all traffic to the domain.
  enforce_https = true

  # IAM Identity Center options for the OpenSearch domain. Set to null to
  # disable. Requires fine-grained access control
  # (advanced_security_options_enabled must be true).
  # identity_center_instance_arn is required when enabled_api_access is true.
  # Valid values for subject_key are 'UserName', 'UserId' (default), and
  # 'Email'; valid values for roles_key are 'GroupName' and 'GroupId' (default).
  identity_center_options = null

  # Whether to enable the internal user database for fine-grained access
  # control.
  internal_user_database_enabled = false

  # The baseline I/O performance of EBS volumes attached to data nodes. Only
  # applicable for io1 and gp3 volume types.
  iops = null

  # The type of IP addresses supported by the endpoint. Valid values are 'ipv4'
  # and 'dualstack'.
  ip_address_type = null

  # The maximum amount of time, in seconds, that KMSKeyError can be in red
  # status before triggering an alarm
  kms_key_error_period = 60

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  kms_key_error_treat_missing_data = "missing"

  # The KMS key ID to use for encryption at rest. If not specified, the default
  # OpenSearch KMS key is used.
  kms_key_id = null

  # The maximum amount of time, in seconds, that KMSKeyInaccessible can be in
  # red status before triggering an alarm
  kms_key_inaccessible_period = 60

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  kms_key_inaccessible_treat_missing_data = "missing"

  # A list of log publishing options. Each entry specifies a log type and a
  # CloudWatch Log Group ARN.
  log_publishing_options = []

  # The period, in seconds, over which to measure the master nodes' CPU
  # utilization
  master_cpu_utilization_period = 900

  # Trigger an alarm if the OpenSearch domain master nodes have a CPU
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

  # Trigger an alarm if the OpenSearch domain master nodes have a JVM memory
  # pressure percentage above this threshold
  master_jvm_memory_pressure_threshold = 80

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  master_jvm_memory_pressure_treat_missing_data = "missing"

  # The ARN of the IAM user to use as the master user for FGAC. Conflicts with
  # master_user_name and master_user_password.
  master_user_arn = null

  # The master username for fine-grained access control. Requires
  # internal_user_database_enabled to be true.
  master_user_name = null

  # The master password for fine-grained access control. Requires
  # internal_user_database_enabled to be true. Must be at least 8 characters
  # with at least one uppercase letter, one lowercase letter, one digit, and one
  # special character.
  master_user_password = null # SENSITIVE

  # Whether to monitor KMS key statistics
  monitor_kms_key = false

  # Whether to monitor master node statistics
  monitor_master_nodes = false

  # Whether a multi-AZ domain is turned on with a standby AZ. Requires zone
  # awareness and at least 3 AZs.
  multi_az_with_standby_enabled = false

  # The period, in seconds, over which to measure the master nodes' CPU
  # utilization
  node_count_period = 86400

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  node_count_treat_missing_data = "missing"

  # Whether to enable node-to-node encryption.
  node_to_node_encryption = true

  # Whether the off-peak window is enabled. Set to null to omit the block
  # entirely.
  off_peak_window_enabled = null

  # The start time of the off-peak window.
  off_peak_window_start_time = null

  # SAML authentication options for OpenSearch Dashboards. Set to null to
  # disable SAML.
  saml_options = null

  # The description of the security group created for the OpenSearch domain.
  # Defaults to 'Security group for the <domain_name> OpenSearch domain' if not
  # specified.
  security_group_description = null

  # The name of the security group created for the OpenSearch domain. Defaults
  # to var.domain_name if not specified.
  security_group_name = null

  # A list of subnet IDs for the OpenSearch domain to use for VPC endpoints. If
  # empty, the domain is created with a public endpoint.
  subnet_ids = []

  # The throughput (in MiB/s) of the EBS volumes attached to data nodes. Only
  # applicable for gp3 volume types.
  throughput = null

  # The TLS security policy to apply to the HTTPS endpoint. Valid values are
  # 'Policy-Min-TLS-1-0-2019-07' and 'Policy-Min-TLS-1-2-2019-07'.
  tls_security_policy = "Policy-Min-TLS-1-2-2019-07"

  # Timeout for updating the OpenSearch domain.
  updating_timeout = "60m"

  # The ID of the VPC in which to create the security group. Required when
  # subnet_ids is provided.
  vpc_id = null

  # The number of UltraWarm nodes in the cluster.
  warm_count = null

  # Whether UltraWarm storage is enabled.
  warm_enabled = false

  # The instance type for UltraWarm nodes (e.g. 'ultrawarm1.medium.search').
  warm_type = null

  # Whether zone awareness is enabled. If true, nodes are distributed across
  # availability zones.
  zone_awareness_enabled = false

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S OPENSEARCH MODULE
#
# NOTE: This module uses some sensitive variables marked inline with "# SENSITIVE".
# When using values other than defaults for these variables, set them through environment variables or
# another secure method.
#
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/data-stores/opensearch?ref=v2.11.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the OpenSearch domain. Must be between 3 and 28 characters,
  # start with a lowercase letter, and contain only lowercase letters, numbers,
  # and hyphens.
  domain_name = <string>

  # The engine version for the OpenSearch domain (e.g. 'OpenSearch_2.11' or
  # 'Elasticsearch_7.10').
  engine_version = <string>

  # The number of data nodes in the OpenSearch domain.
  instance_count = <number>

  # The instance type for the OpenSearch domain data nodes (e.g.
  # 'm6g.large.search').
  instance_type = <string>

  # The size of the EBS volume in GB for each data node.
  volume_size = <number>

  # The type of EBS volume to use (gp3, gp2, io1, or standard).
  volume_type = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # IAM policy document specifying the access policies for the domain. If null,
  # no access policy is applied.
  access_policies = null

  # Key-value pairs of advanced configuration options (e.g.
  # 'rest.action.multi.allow_explicit_index' = 'true').
  advanced_options = null

  # Whether to enable fine-grained access control (FGAC). Requires
  # enforce_https, node_to_node_encryption, and encrypt_at_rest to be true.
  advanced_security_options_enabled = false

  # ARNs of the SNS topics associated with the CloudWatch alarms for the
  # OpenSearch domain.
  alarms_sns_topic_arns = []

  # A list of CIDR-formatted IP address ranges that can connect to this
  # OpenSearch domain over HTTPS (port 443).
  allow_connections_from_cidr_blocks = []

  # A list of IPv6 CIDR-formatted IP address ranges that can connect to this
  # OpenSearch domain over HTTPS (port 443).
  allow_connections_from_ipv6_cidr_blocks = []

  # A list of security group IDs that can connect to this OpenSearch domain.
  allow_connections_from_security_groups = []

  # Whether to enable anonymous authentication. Only relevant when
  # advanced_security_options_enabled is true.
  anonymous_auth_enabled = false

  # Whether automatic software updates are enabled for the domain.
  auto_software_update_enabled = false

  # The Auto-Tune desired state. Valid values are 'ENABLED' and 'DISABLED'.
  auto_tune_desired_state = "ENABLED"

  # Whether to enable Auto-Tune for the domain.
  auto_tune_enabled = false

  # A list of Auto-Tune maintenance schedules.
  auto_tune_maintenance_schedules = []

  # Whether to roll back Auto-Tune settings when disabling. Valid values are
  # 'NO_ROLLBACK' and 'DEFAULT_ROLLBACK'.
  auto_tune_rollback_on_disable = "NO_ROLLBACK"

  # The hour (0-23) during which the service takes an automated daily snapshot
  # of the indices. Set to null to omit.
  automated_snapshot_start_hour = null

  # The number of availability zones for zone-aware domains. Valid values are 2
  # or 3. Only used when zone_awareness_enabled is true.
  availability_zone_count = 2

  # The period, in seconds, over which to measure the CPU utilization percentage
  cluster_high_cpu_utilization_period = 60

  # Trigger an alarm if the OpenSearch domain has a CPU utilization percentage
  # above this threshold
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
  # OpenSearch domain drops below this threshold
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

  # Cognito authentication options for OpenSearch Dashboards. Set to null to
  # disable Cognito.
  cognito_options = null

  # Whether cold storage is enabled. Requires UltraWarm to be enabled.
  cold_storage_enabled = false

  # Whether to create the AWSServiceRoleForAmazonOpenSearchService
  # service-linked role. Only needed once per AWS account.
  create_service_linked_role = false

  # Timeout for creating the OpenSearch domain.
  creating_timeout = "60m"

  # The fully qualified domain name for a custom endpoint (e.g.
  # 'search.example.com'). If null, custom endpoints are disabled.
  custom_endpoint = null

  # The ACM certificate ARN for the custom endpoint. Required when
  # custom_endpoint is set.
  custom_endpoint_certificate_arn = null

  # A map of custom tags to apply to the OpenSearch domain and security group.
  # The key is the tag name and the value is the tag value.
  custom_tags = {}

  # The number of dedicated master nodes in the cluster.
  dedicated_master_count = null

  # Whether dedicated master nodes are enabled for the cluster.
  dedicated_master_enabled = false

  # The instance type for the dedicated master nodes (e.g. 'm6g.large.search').
  dedicated_master_type = null

  # Timeout for deleting the OpenSearch domain.
  deleting_timeout = "60m"

  # Whether EBS volumes are attached to data nodes.
  ebs_enabled = true

  # Set to true to enable several basic CloudWatch alarms around CPU usage,
  # memory usage, and disk space usage. If set to true, make sure to specify SNS
  # topics to send notifications to using var.alarms_sns_topic_arns.
  enable_cloudwatch_alarms = true

  # Whether to enable encryption at rest for the OpenSearch domain.
  encrypt_at_rest = true

  # Whether to require HTTPS for all traffic to the domain.
  enforce_https = true

  # IAM Identity Center options for the OpenSearch domain. Set to null to
  # disable. Requires fine-grained access control
  # (advanced_security_options_enabled must be true).
  # identity_center_instance_arn is required when enabled_api_access is true.
  # Valid values for subject_key are 'UserName', 'UserId' (default), and
  # 'Email'; valid values for roles_key are 'GroupName' and 'GroupId' (default).
  identity_center_options = null

  # Whether to enable the internal user database for fine-grained access
  # control.
  internal_user_database_enabled = false

  # The baseline I/O performance of EBS volumes attached to data nodes. Only
  # applicable for io1 and gp3 volume types.
  iops = null

  # The type of IP addresses supported by the endpoint. Valid values are 'ipv4'
  # and 'dualstack'.
  ip_address_type = null

  # The maximum amount of time, in seconds, that KMSKeyError can be in red
  # status before triggering an alarm
  kms_key_error_period = 60

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  kms_key_error_treat_missing_data = "missing"

  # The KMS key ID to use for encryption at rest. If not specified, the default
  # OpenSearch KMS key is used.
  kms_key_id = null

  # The maximum amount of time, in seconds, that KMSKeyInaccessible can be in
  # red status before triggering an alarm
  kms_key_inaccessible_period = 60

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  kms_key_inaccessible_treat_missing_data = "missing"

  # A list of log publishing options. Each entry specifies a log type and a
  # CloudWatch Log Group ARN.
  log_publishing_options = []

  # The period, in seconds, over which to measure the master nodes' CPU
  # utilization
  master_cpu_utilization_period = 900

  # Trigger an alarm if the OpenSearch domain master nodes have a CPU
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

  # Trigger an alarm if the OpenSearch domain master nodes have a JVM memory
  # pressure percentage above this threshold
  master_jvm_memory_pressure_threshold = 80

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  master_jvm_memory_pressure_treat_missing_data = "missing"

  # The ARN of the IAM user to use as the master user for FGAC. Conflicts with
  # master_user_name and master_user_password.
  master_user_arn = null

  # The master username for fine-grained access control. Requires
  # internal_user_database_enabled to be true.
  master_user_name = null

  # The master password for fine-grained access control. Requires
  # internal_user_database_enabled to be true. Must be at least 8 characters
  # with at least one uppercase letter, one lowercase letter, one digit, and one
  # special character.
  master_user_password = null # SENSITIVE

  # Whether to monitor KMS key statistics
  monitor_kms_key = false

  # Whether to monitor master node statistics
  monitor_master_nodes = false

  # Whether a multi-AZ domain is turned on with a standby AZ. Requires zone
  # awareness and at least 3 AZs.
  multi_az_with_standby_enabled = false

  # The period, in seconds, over which to measure the master nodes' CPU
  # utilization
  node_count_period = 86400

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  node_count_treat_missing_data = "missing"

  # Whether to enable node-to-node encryption.
  node_to_node_encryption = true

  # Whether the off-peak window is enabled. Set to null to omit the block
  # entirely.
  off_peak_window_enabled = null

  # The start time of the off-peak window.
  off_peak_window_start_time = null

  # SAML authentication options for OpenSearch Dashboards. Set to null to
  # disable SAML.
  saml_options = null

  # The description of the security group created for the OpenSearch domain.
  # Defaults to 'Security group for the <domain_name> OpenSearch domain' if not
  # specified.
  security_group_description = null

  # The name of the security group created for the OpenSearch domain. Defaults
  # to var.domain_name if not specified.
  security_group_name = null

  # A list of subnet IDs for the OpenSearch domain to use for VPC endpoints. If
  # empty, the domain is created with a public endpoint.
  subnet_ids = []

  # The throughput (in MiB/s) of the EBS volumes attached to data nodes. Only
  # applicable for gp3 volume types.
  throughput = null

  # The TLS security policy to apply to the HTTPS endpoint. Valid values are
  # 'Policy-Min-TLS-1-0-2019-07' and 'Policy-Min-TLS-1-2-2019-07'.
  tls_security_policy = "Policy-Min-TLS-1-2-2019-07"

  # Timeout for updating the OpenSearch domain.
  updating_timeout = "60m"

  # The ID of the VPC in which to create the security group. Required when
  # subnet_ids is provided.
  vpc_id = null

  # The number of UltraWarm nodes in the cluster.
  warm_count = null

  # Whether UltraWarm storage is enabled.
  warm_enabled = false

  # The instance type for UltraWarm nodes (e.g. 'ultrawarm1.medium.search').
  warm_type = null

  # Whether zone awareness is enabled. If true, nodes are distributed across
  # availability zones.
  zone_awareness_enabled = false

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

The name of the OpenSearch domain. Must be between 3 and 28 characters, start with a lowercase letter, and contain only lowercase letters, numbers, and hyphens.

</HclListItemDescription>
</HclListItem>

<HclListItem name="engine_version" requirement="required" type="string">
<HclListItemDescription>

The engine version for the OpenSearch domain (e.g. 'OpenSearch_2.11' or 'Elasticsearch_7.10').

</HclListItemDescription>
</HclListItem>

<HclListItem name="instance_count" requirement="required" type="number">
<HclListItemDescription>

The number of data nodes in the OpenSearch domain.

</HclListItemDescription>
</HclListItem>

<HclListItem name="instance_type" requirement="required" type="string">
<HclListItemDescription>

The instance type for the OpenSearch domain data nodes (e.g. 'm6g.large.search').

</HclListItemDescription>
</HclListItem>

<HclListItem name="volume_size" requirement="required" type="number">
<HclListItemDescription>

The size of the EBS volume in GB for each data node.

</HclListItemDescription>
</HclListItem>

<HclListItem name="volume_type" requirement="required" type="string">
<HclListItemDescription>

The type of EBS volume to use (gp3, gp2, io1, or standard).

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="access_policies" requirement="optional" type="string">
<HclListItemDescription>

IAM policy document specifying the access policies for the domain. If null, no access policy is applied.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="advanced_options" requirement="optional" type="map(string)">
<HclListItemDescription>

Key-value pairs of advanced configuration options (e.g. 'rest.action.multi.allow_explicit_index' = 'true').

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="advanced_security_options_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable fine-grained access control (FGAC). Requires enforce_https, node_to_node_encryption, and encrypt_at_rest to be true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="alarms_sns_topic_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

ARNs of the SNS topics associated with the CloudWatch alarms for the OpenSearch domain.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of CIDR-formatted IP address ranges that can connect to this OpenSearch domain over HTTPS (port 443).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_ipv6_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IPv6 CIDR-formatted IP address ranges that can connect to this OpenSearch domain over HTTPS (port 443).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_security_groups" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of security group IDs that can connect to this OpenSearch domain.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="anonymous_auth_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable anonymous authentication. Only relevant when advanced_security_options_enabled is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="auto_software_update_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether automatic software updates are enabled for the domain.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="auto_tune_desired_state" requirement="optional" type="string">
<HclListItemDescription>

The Auto-Tune desired state. Valid values are 'ENABLED' and 'DISABLED'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ENABLED&quot;"/>
</HclListItem>

<HclListItem name="auto_tune_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable Auto-Tune for the domain.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="auto_tune_maintenance_schedules" requirement="optional" type="list(object(…))">
<HclListItemDescription>

A list of Auto-Tune maintenance schedules.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    start_at                       = string
    cron_expression_for_recurrence = string
    duration_value                 = number
    duration_unit                  = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="auto_tune_rollback_on_disable" requirement="optional" type="string">
<HclListItemDescription>

Whether to roll back Auto-Tune settings when disabling. Valid values are 'NO_ROLLBACK' and 'DEFAULT_ROLLBACK'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;NO_ROLLBACK&quot;"/>
</HclListItem>

<HclListItem name="automated_snapshot_start_hour" requirement="optional" type="number">
<HclListItemDescription>

The hour (0-23) during which the service takes an automated daily snapshot of the indices. Set to null to omit.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="availability_zone_count" requirement="optional" type="number">
<HclListItemDescription>

The number of availability zones for zone-aware domains. Valid values are 2 or 3. Only used when zone_awareness_enabled is true.

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

Trigger an alarm if the OpenSearch domain has a CPU utilization percentage above this threshold

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

Trigger an alarm if the amount of free storage space, in Megabytes, on the OpenSearch domain drops below this threshold

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

<HclListItem name="cognito_options" requirement="optional" type="object(…)">
<HclListItemDescription>

Cognito authentication options for OpenSearch Dashboards. Set to null to disable Cognito.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    user_pool_id     = string
    identity_pool_id = string
    role_arn         = string
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cold_storage_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether cold storage is enabled. Requires UltraWarm to be enabled.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="create_service_linked_role" requirement="optional" type="bool">
<HclListItemDescription>

Whether to create the AWSServiceRoleForAmazonOpenSearchService service-linked role. Only needed once per AWS account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="creating_timeout" requirement="optional" type="string">
<HclListItemDescription>

Timeout for creating the OpenSearch domain.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;60m&quot;"/>
</HclListItem>

<HclListItem name="custom_endpoint" requirement="optional" type="string">
<HclListItemDescription>

The fully qualified domain name for a custom endpoint (e.g. 'search.example.com'). If null, custom endpoints are disabled.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_endpoint_certificate_arn" requirement="optional" type="string">
<HclListItemDescription>

The ACM certificate ARN for the custom endpoint. Required when custom_endpoint is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the OpenSearch domain and security group. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="dedicated_master_count" requirement="optional" type="number">
<HclListItemDescription>

The number of dedicated master nodes in the cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="dedicated_master_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether dedicated master nodes are enabled for the cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="dedicated_master_type" requirement="optional" type="string">
<HclListItemDescription>

The instance type for the dedicated master nodes (e.g. 'm6g.large.search').

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="deleting_timeout" requirement="optional" type="string">
<HclListItemDescription>

Timeout for deleting the OpenSearch domain.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;60m&quot;"/>
</HclListItem>

<HclListItem name="ebs_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether EBS volumes are attached to data nodes.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_alarms" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using <a href="#alarms_sns_topic_arns"><code>alarms_sns_topic_arns</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="encrypt_at_rest" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable encryption at rest for the OpenSearch domain.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enforce_https" requirement="optional" type="bool">
<HclListItemDescription>

Whether to require HTTPS for all traffic to the domain.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="identity_center_options" requirement="optional" type="object(…)">
<HclListItemDescription>

IAM Identity Center options for the OpenSearch domain. Set to null to disable. Requires fine-grained access control (advanced_security_options_enabled must be true). identity_center_instance_arn is required when enabled_api_access is true. Valid values for subject_key are 'UserName', 'UserId' (default), and 'Email'; valid values for roles_key are 'GroupName' and 'GroupId' (default).

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    enabled_api_access           = optional(bool, true)
    identity_center_instance_arn = optional(string)
    subject_key                  = optional(string)
    roles_key                    = optional(string)
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="internal_user_database_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable the internal user database for fine-grained access control.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="iops" requirement="optional" type="number">
<HclListItemDescription>

The baseline I/O performance of EBS volumes attached to data nodes. Only applicable for io1 and gp3 volume types.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ip_address_type" requirement="optional" type="string">
<HclListItemDescription>

The type of IP addresses supported by the endpoint. Valid values are 'ipv4' and 'dualstack'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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

<HclListItem name="kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

The KMS key ID to use for encryption at rest. If not specified, the default OpenSearch KMS key is used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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

<HclListItem name="log_publishing_options" requirement="optional" type="list(object(…))">
<HclListItemDescription>

A list of log publishing options. Each entry specifies a log type and a CloudWatch Log Group ARN.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    log_type                 = string
    cloudwatch_log_group_arn = string
    enabled                  = optional(bool, true)
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="master_cpu_utilization_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the master nodes' CPU utilization

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="900"/>
</HclListItem>

<HclListItem name="master_cpu_utilization_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the OpenSearch domain master nodes have a CPU utilization percentage above this threshold

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

Trigger an alarm if the OpenSearch domain master nodes have a JVM memory pressure percentage above this threshold

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

The ARN of the IAM user to use as the master user for FGAC. Conflicts with master_user_name and master_user_password.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="master_user_name" requirement="optional" type="string">
<HclListItemDescription>

The master username for fine-grained access control. Requires internal_user_database_enabled to be true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="master_user_password" requirement="optional" type="string">
<HclListItemDescription>

The master password for fine-grained access control. Requires internal_user_database_enabled to be true. Must be at least 8 characters with at least one uppercase letter, one lowercase letter, one digit, and one special character.

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

<HclListItem name="multi_az_with_standby_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether a multi-AZ domain is turned on with a standby AZ. Requires zone awareness and at least 3 AZs.

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

<HclListItem name="node_to_node_encryption" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable node-to-node encryption.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="off_peak_window_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether the off-peak window is enabled. Set to null to omit the block entirely.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="off_peak_window_start_time" requirement="optional" type="object(…)">
<HclListItemDescription>

The start time of the off-peak window.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    hours   = number
    minutes = number
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="saml_options" requirement="optional" type="object(…)">
<HclListItemDescription>

SAML authentication options for OpenSearch Dashboards. Set to null to disable SAML.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    idp_entity_id           = string
    idp_metadata_content    = string
    subject_key             = optional(string)
    roles_key               = optional(string)
    session_timeout_minutes = optional(number)
    master_backend_role     = optional(string)
    master_user_name        = optional(string)
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="security_group_description" requirement="optional" type="string">
<HclListItemDescription>

The description of the security group created for the OpenSearch domain. Defaults to 'Security group for the &lt;domain_name> OpenSearch domain' if not specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="security_group_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the security group created for the OpenSearch domain. Defaults to <a href="#domain_name"><code>domain_name</code></a> if not specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of subnet IDs for the OpenSearch domain to use for VPC endpoints. If empty, the domain is created with a public endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="throughput" requirement="optional" type="number">
<HclListItemDescription>

The throughput (in MiB/s) of the EBS volumes attached to data nodes. Only applicable for gp3 volume types.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="tls_security_policy" requirement="optional" type="string">
<HclListItemDescription>

The TLS security policy to apply to the HTTPS endpoint. Valid values are 'Policy-Min-TLS-1-0-2019-07' and 'Policy-Min-TLS-1-2-2019-07'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;Policy-Min-TLS-1-2-2019-07&quot;"/>
</HclListItem>

<HclListItem name="updating_timeout" requirement="optional" type="string">
<HclListItemDescription>

Timeout for updating the OpenSearch domain.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;60m&quot;"/>
</HclListItem>

<HclListItem name="vpc_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the VPC in which to create the security group. Required when subnet_ids is provided.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="warm_count" requirement="optional" type="number">
<HclListItemDescription>

The number of UltraWarm nodes in the cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="warm_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether UltraWarm storage is enabled.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="warm_type" requirement="optional" type="string">
<HclListItemDescription>

The instance type for UltraWarm nodes (e.g. 'ultrawarm1.medium.search').

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="zone_awareness_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether zone awareness is enabled. If true, nodes are distributed across availability zones.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="dashboards_endpoint">
<HclListItemDescription>

The domain-specific endpoint for OpenSearch Dashboards (formerly Kibana).

</HclListItemDescription>
</HclListItem>

<HclListItem name="domain_arn">
<HclListItemDescription>

The ARN of the OpenSearch domain.

</HclListItemDescription>
</HclListItem>

<HclListItem name="domain_endpoint">
<HclListItemDescription>

The domain-specific endpoint used to submit index, search, and data upload requests.

</HclListItemDescription>
</HclListItem>

<HclListItem name="domain_id">
<HclListItemDescription>

The unique identifier for the OpenSearch domain.

</HclListItemDescription>
</HclListItem>

<HclListItem name="domain_name">
<HclListItemDescription>

The name of the OpenSearch domain.

</HclListItemDescription>
</HclListItem>

<HclListItem name="security_group_id">
<HclListItemDescription>

The ID of the security group created for the OpenSearch domain. Null if not in VPC mode.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v2.11.0/modules/data-stores/opensearch/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v2.11.0/modules/data-stores/opensearch/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v2.11.0/modules/data-stores/opensearch/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "4b2c9560db2d464ec9a06c84a0345fc1"
}
##DOCS-SOURCER-END -->
