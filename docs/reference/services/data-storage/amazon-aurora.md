---
type: "service"
name: "Amazon Aurora"
description: "Deploy and manage Amazon Aurora using Amazon's Relational Database Service (RDS)."
category: "database"
cloud: "aws"
tags: ["data","database","sql","rds","aurora"]
license: "gruntwork"
built-with: "terraform"
title: "Amazon Aurora"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';

<VersionBadge version="0.85.0" lastModifiedVersion="0.85.0"/>

# Amazon Aurora


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/eak12913-patch-1/modules/data-stores/aurora" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=data-stores%2Faurora" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

## Overview

This service contains code to deploy an Amazon Relational Database Service (RDS) cluster that can run
[Amazon Aurora](https://aws.amazon.com/rds/aurora/), Amazon’s cloud-native relational database. The cluster is managed
by AWS and automatically handles standby failover, read replicas, backups, patching, and encryption.

![RDS architecture](/img/reference/services/data-storage/rds-architecture.png)

## Features

*   Deploy a fully-managed, cloud-native relational database
*   MySQL and PostgreSQL compatibility
*   Automatic failover to a standby in another availability zone
*   Read replicas
*   Automatic nightly snapshots
*   Automatic cross account snapshots
*   Automatic scaling of storage
*   Scale to 0 with Aurora Serverless
*   Integrate with Kubernetes Service Discovery

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

*   [What is Amazon RDS?](https://github.com/gruntwork-io/terraform-aws-data-storage/blob/master/modules/aurora/core-concepts.md#what-is-amazon-rds)
*   [Common gotchas with RDS](https://github.com/gruntwork-io/terraform-aws-data-storage/blob/master/modules/aurora/core-concepts.md#common-gotchas)
*   [Aurora Serverless documentation](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless.html):
    Amazon’s docs for Aurora Serverless, including its advantages, limitations, architecture, and scaling configurations.
*   [RDS documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html): Amazon’s docs for RDS that
    cover core concepts such a the types of databases supported, security, backup & restore, and monitoring.
*   *[Designing Data Intensive Applications](https://dataintensive.net)*: the best book we’ve found for understanding data
    systems, including relational databases, NoSQL, replication, sharding, consistency, and so on.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/eak12913-patch-1/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/eak12913-patch-1/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/),
    and it shows you how we build an end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<a name="alarms_sns_topic_arns" className="snap-top"></a>

* [**`alarms_sns_topic_arns`**](#alarms_sns_topic_arns) &mdash; The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications. Also used for the alarms if the share snapshot backup job fails.

<a name="allow_connections_from_cidr_blocks" className="snap-top"></a>

* [**`allow_connections_from_cidr_blocks`**](#allow_connections_from_cidr_blocks) &mdash; The list of network CIDR blocks to allow network access to Aurora from. One of [`allow_connections_from_cidr_blocks`](#allow_connections_from_cidr_blocks) or [`allow_connections_from_security_groups`](#allow_connections_from_security_groups) must be specified for the database to be reachable.

<a name="allow_connections_from_security_groups" className="snap-top"></a>

* [**`allow_connections_from_security_groups`**](#allow_connections_from_security_groups) &mdash; The list of IDs or Security Groups to allow network access to Aurora from. All security groups must either be in the VPC specified by [`vpc_id`](#vpc_id), or a peered VPC with the VPC specified by [`vpc_id`](#vpc_id). One of [`allow_connections_from_cidr_blocks`](#allow_connections_from_cidr_blocks) or [`allow_connections_from_security_groups`](#allow_connections_from_security_groups) must be specified for the database to be reachable.

<a name="allow_major_version_upgrade" className="snap-top"></a>

* [**`allow_major_version_upgrade`**](#allow_major_version_upgrade) &mdash; Enable to allow major engine version upgrades when changing engine versions.

<a name="apply_immediately" className="snap-top"></a>

* [**`apply_immediately`**](#apply_immediately) &mdash; Specifies whether any cluster modifications are applied immediately, or during the next maintenance window. Note that cluster modifications may cause degraded performance or downtime.

<a name="aurora_subnet_ids" className="snap-top"></a>

* [**`aurora_subnet_ids`**](#aurora_subnet_ids) &mdash; The list of IDs of the subnets in which to deploy Aurora. The list must only contain subnets in [`vpc_id`](#vpc_id).

<a name="backup_job_alarm_period" className="snap-top"></a>

* [**`backup_job_alarm_period`**](#backup_job_alarm_period) &mdash; How often, in seconds, the backup job is expected to run. This is the same as [`schedule_expression`](#schedule_expression), but unfortunately, Terraform offers no way to convert rate expressions to seconds. We add a CloudWatch alarm that triggers if the metric in [`create_snapshot_cloudwatch_metric_namespace`](#create_snapshot_cloudwatch_metric_namespace) isn't updated within this time period, as that indicates the backup failed to run.

<a name="backup_retention_period" className="snap-top"></a>

* [**`backup_retention_period`**](#backup_retention_period) &mdash; How many days to keep backup snapshots around before cleaning them up. Max: 35

<a name="copy_tags_to_snapshot" className="snap-top"></a>

* [**`copy_tags_to_snapshot`**](#copy_tags_to_snapshot) &mdash; Copy all the Aurora cluster tags to snapshots. Default is false.

<a name="create_snapshot_cloudwatch_metric_namespace" className="snap-top"></a>

* [**`create_snapshot_cloudwatch_metric_namespace`**](#create_snapshot_cloudwatch_metric_namespace) &mdash; The namespace to use for the CloudWatch metric we report every time a new RDS snapshot is created. We add a CloudWatch alarm on this metric to notify us if the backup job fails to run for any reason. Defaults to the cluster name.

<a name="custom_tags" className="snap-top"></a>

* [**`custom_tags`**](#custom_tags) &mdash; A map of custom tags to apply to the RDS cluster and all associated resources created for it. The key is the tag name and the value is the tag value.

<a name="dashboard_cpu_usage_widget_parameters" className="snap-top"></a>

* [**`dashboard_cpu_usage_widget_parameters`**](#dashboard_cpu_usage_widget_parameters) &mdash; Parameters for the cpu usage widget to output for use in a CloudWatch dashboard.

<a name="dashboard_db_connections_widget_parameters" className="snap-top"></a>

* [**`dashboard_db_connections_widget_parameters`**](#dashboard_db_connections_widget_parameters) &mdash; Parameters for the database connections widget to output for use in a CloudWatch dashboard.

<a name="dashboard_disk_space_widget_parameters" className="snap-top"></a>

* [**`dashboard_disk_space_widget_parameters`**](#dashboard_disk_space_widget_parameters) &mdash; Parameters for the available disk space widget to output for use in a CloudWatch dashboard.

<a name="dashboard_memory_widget_parameters" className="snap-top"></a>

* [**`dashboard_memory_widget_parameters`**](#dashboard_memory_widget_parameters) &mdash; Parameters for the available memory widget to output for use in a CloudWatch dashboard.

<a name="dashboard_read_latency_widget_parameters" className="snap-top"></a>

* [**`dashboard_read_latency_widget_parameters`**](#dashboard_read_latency_widget_parameters) &mdash; Parameters for the read latency widget to output for use in a CloudWatch dashboard.

<a name="dashboard_write_latency_widget_parameters" className="snap-top"></a>

* [**`dashboard_write_latency_widget_parameters`**](#dashboard_write_latency_widget_parameters) &mdash; Parameters for the read latency widget to output for use in a CloudWatch dashboard.

<a name="db_cluster_custom_parameter_group" className="snap-top"></a>

* [**`db_cluster_custom_parameter_group`**](#db_cluster_custom_parameter_group) &mdash; Configure a custom parameter group for the RDS DB cluster. This will create a new parameter group with the given parameters. When null, the database will be launched with the default parameter group.

<a name="db_config_secrets_manager_id" className="snap-top"></a>

* [**`db_config_secrets_manager_id`**](#db_config_secrets_manager_id) &mdash; The friendly name or ARN of an AWS Secrets Manager secret that contains database configuration information in the format outlined by this document: https://docs.aws.amazon.com/secretsmanager/latest/userguide/best-practices.html. The engine, username, password, dbname, and port fields must be included in the JSON. Note that even with this precaution, this information will be stored in plaintext in the Terraform state file! See the following blog post for more details: https://blog.gruntwork.io/a-comprehensive-guide-to-managing-secrets-in-your-terraform-code-1d586955ace1. If you do not wish to use Secrets Manager, leave this as null, and use the [`master_username`](#master_username), [`master_password`](#master_password), [`db_name`](#db_name), engine, and port variables.

<a name="db_instance_custom_parameter_group" className="snap-top"></a>

* [**`db_instance_custom_parameter_group`**](#db_instance_custom_parameter_group) &mdash; Configure a custom parameter group for the RDS DB Instance. This will create a new parameter group with the given parameters. When null, the database will be launched with the default parameter group.

<a name="db_name" className="snap-top"></a>

* [**`db_name`**](#db_name) &mdash; The name for your database of up to 8 alpha-numeric characters. If you do not provide a name, Amazon RDS will not create a database in the DB cluster you are creating. This can also be provided via AWS Secrets Manager. See the description of [`db_config_secrets_manager_id`](#db_config_secrets_manager_id). A value here overrides the value in [`db_config_secrets_manager_id`](#db_config_secrets_manager_id).

<a name="enable_cloudwatch_alarms" className="snap-top"></a>

* [**`enable_cloudwatch_alarms`**](#enable_cloudwatch_alarms) &mdash; Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using [`alarms_sns_topic_arn`](#alarms_sns_topic_arn).

<a name="enable_cloudwatch_metrics" className="snap-top"></a>

* [**`enable_cloudwatch_metrics`**](#enable_cloudwatch_metrics) &mdash; When true, enable CloudWatch metrics for the manual snapshots created for the purpose of sharing with another account.

<a name="enable_deletion_protection" className="snap-top"></a>

* [**`enable_deletion_protection`**](#enable_deletion_protection) &mdash; Enable deletion protection on the database instance. If this is enabled, the database cannot be deleted.

<a name="enable_perf_alarms" className="snap-top"></a>

* [**`enable_perf_alarms`**](#enable_perf_alarms) &mdash; Set to true to enable alarms related to performance, such as read and write latency alarms. Set to false to disable those alarms if you aren't sure what would be reasonable perf numbers for your RDS set up or if those numbers are too unpredictable.

<a name="enable_share_snapshot_cloudwatch_alarms" className="snap-top"></a>

* [**`enable_share_snapshot_cloudwatch_alarms`**](#enable_share_snapshot_cloudwatch_alarms) &mdash; When true, enable CloudWatch alarms for the manual snapshots created for the purpose of sharing with another account. Only used if [`share_snapshot_with_another_account`](#share_snapshot_with_another_account) is true.

<a name="enabled_cloudwatch_logs_exports" className="snap-top"></a>

* [**`enabled_cloudwatch_logs_exports`**](#enabled_cloudwatch_logs_exports) &mdash; If non-empty, the Aurora cluster will export the specified logs to Cloudwatch. Must be zero or more of: audit, error, general and slowquery

<a name="engine" className="snap-top"></a>

* [**`engine`**](#engine) &mdash; The name of the database engine to be used for this DB cluster. Valid Values: aurora (for MySQL 5.6-compatible Aurora), aurora-mysql (for MySQL 5.7-compatible Aurora), and aurora-postgresql. This can also be provided via AWS Secrets Manager. See the description of [`db_config_secrets_manager_id`](#db_config_secrets_manager_id). A value here overrides the value in [`db_config_secrets_manager_id`](#db_config_secrets_manager_id).

<a name="engine_mode" className="snap-top"></a>

* [**`engine_mode`**](#engine_mode) &mdash; The version of aurora to run - provisioned or serverless.

<a name="engine_version" className="snap-top"></a>

* [**`engine_version`**](#engine_version) &mdash; The Amazon Aurora DB engine version for the selected engine and [`engine_mode`](#engine_mode). Note: Starting with Aurora MySQL 2.03.2, Aurora engine versions have the following syntax [`&lt;mysql-major-version>.mysql_aurora`](#&lt;mysql-major-version>.mysql_aurora).&lt;aurora-mysql-version>. e.g. [`5.7.mysql_aurora`](#5.7.mysql_aurora).2.08.1.

<a name="high_cpu_utilization_period" className="snap-top"></a>

* [**`high_cpu_utilization_period`**](#high_cpu_utilization_period) &mdash; The period, in seconds, over which to measure the CPU utilization percentage.

<a name="high_cpu_utilization_threshold" className="snap-top"></a>

* [**`high_cpu_utilization_threshold`**](#high_cpu_utilization_threshold) &mdash; Trigger an alarm if the DB instance has a CPU utilization percentage above this threshold.

<a name="high_read_latency_period" className="snap-top"></a>

* [**`high_read_latency_period`**](#high_read_latency_period) &mdash; The period, in seconds, over which to measure the read latency.

<a name="high_read_latency_threshold" className="snap-top"></a>

* [**`high_read_latency_threshold`**](#high_read_latency_threshold) &mdash; Trigger an alarm if the DB instance read latency (average amount of time taken per disk I/O operation), in seconds, is above this threshold.

<a name="high_write_latency_period" className="snap-top"></a>

* [**`high_write_latency_period`**](#high_write_latency_period) &mdash; The period, in seconds, over which to measure the write latency.

<a name="high_write_latency_threshold" className="snap-top"></a>

* [**`high_write_latency_threshold`**](#high_write_latency_threshold) &mdash; Trigger an alarm if the DB instance write latency (average amount of time taken per disk I/O operation), in seconds, is above this threshold.

<a name="iam_database_authentication_enabled" className="snap-top"></a>

* [**`iam_database_authentication_enabled`**](#iam_database_authentication_enabled) &mdash; Specifies whether mappings of AWS Identity and Access Management (IAM) accounts to database accounts is enabled. Disabled by default.

<a name="instance_count" className="snap-top"></a>

* [**`instance_count`**](#instance_count) &mdash; The number of DB instances, including the primary, to run in the RDS cluster. Only used when [`engine_mode`](#engine_mode) is set to provisioned.

<a name="instance_type" className="snap-top"></a>

* [**`instance_type`**](#instance_type) &mdash; The instance type to use for the db (e.g. db.r3.large). Only used when [`engine_mode`](#engine_mode) is set to provisioned.

<a name="kms_key_arn" className="snap-top"></a>

* [**`kms_key_arn`**](#kms_key_arn) &mdash; The ARN of a KMS key that should be used to encrypt data on disk. Only used if [`storage_encrypted`](#storage_encrypted) is true. If you leave this null, the default RDS KMS key for the account will be used.

<a name="low_disk_space_available_period" className="snap-top"></a>

* [**`low_disk_space_available_period`**](#low_disk_space_available_period) &mdash; The period, in seconds, over which to measure the available free disk space.

<a name="low_disk_space_available_threshold" className="snap-top"></a>

* [**`low_disk_space_available_threshold`**](#low_disk_space_available_threshold) &mdash; Trigger an alarm if the amount of disk space, in Bytes, on the DB instance drops below this threshold.

<a name="low_memory_available_period" className="snap-top"></a>

* [**`low_memory_available_period`**](#low_memory_available_period) &mdash; The period, in seconds, over which to measure the available free memory.

<a name="low_memory_available_threshold" className="snap-top"></a>

* [**`low_memory_available_threshold`**](#low_memory_available_threshold) &mdash; Trigger an alarm if the amount of free memory, in Bytes, on the DB instance drops below this threshold.

<a name="master_password" className="snap-top"></a>

* [**`master_password`**](#master_password) &mdash; The value to use for the master password of the database. This can also be provided via AWS Secrets Manager. See the description of [`db_config_secrets_manager_id`](#db_config_secrets_manager_id). A value here overrides the value in [`db_config_secrets_manager_id`](#db_config_secrets_manager_id).

<a name="master_username" className="snap-top"></a>

* [**`master_username`**](#master_username) &mdash; The value to use for the master username of the database. This can also be provided via AWS Secrets Manager. See the description of [`db_config_secrets_manager_id`](#db_config_secrets_manager_id). A value here overrides the value in [`db_config_secrets_manager_id`](#db_config_secrets_manager_id).

<a name="name" className="snap-top"></a>

* [**`name`**](#name) &mdash; The name used to namespace all the Aurora resources created by these templates, including the cluster and cluster instances (e.g. drupaldb). Must be unique in this region. Must be a lowercase string.

<a name="port" className="snap-top"></a>

* [**`port`**](#port) &mdash; The port the DB will listen on (e.g. 3306). This can also be provided via AWS Secrets Manager. See the description of [`db_config_secrets_manager_id`](#db_config_secrets_manager_id). A value here overrides the value in [`db_config_secrets_manager_id`](#db_config_secrets_manager_id).

<a name="publicly_accessible" className="snap-top"></a>

* [**`publicly_accessible`**](#publicly_accessible) &mdash; If you wish to make your database accessible from the public Internet, set this flag to true (WARNING: NOT RECOMMENDED FOR REGULAR USAGE!!). The default is false, which means the database is only accessible from within the VPC, which is much more secure. This flag MUST be false for serverless mode.

<a name="restore_source_cluster_identifier" className="snap-top"></a>

* [**`restore_source_cluster_identifier`**](#restore_source_cluster_identifier) &mdash; If non-empty, the Aurora cluster will be restored from the given source cluster using the latest restorable time. Can only be used if [`snapshot_identifier`](#snapshot_identifier) is null. For more information see [`https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_PIT`](#https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_PIT).html

<a name="restore_type" className="snap-top"></a>

* [**`restore_type`**](#restore_type) &mdash; Only used if [`'restore_source_cluster_identifier`](#'restore_source_cluster_identifier)' is non-empty. Type of restore to be performed. Valid options are 'full-copy' and 'copy-on-write'. https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Clone.html

<a name="scaling_configuration_auto_pause" className="snap-top"></a>

* [**`scaling_configuration_auto_pause`**](#scaling_configuration_auto_pause) &mdash; Whether to enable automatic pause. A DB cluster can be paused only when it's idle (it has no connections). If a DB cluster is paused for more than seven days, the DB cluster might be backed up with a snapshot. In this case, the DB cluster is restored when there is a request to connect to it. Only used when [`engine_mode`](#engine_mode) is set to serverless.

<a name="scaling_configuration_max_capacity" className="snap-top"></a>

* [**`scaling_configuration_max_capacity`**](#scaling_configuration_max_capacity) &mdash; The maximum capacity. The maximum capacity must be greater than or equal to the minimum capacity. Valid capacity values are 2, 4, 8, 16, 32, 64, 128, and 256. Only used when [`engine_mode`](#engine_mode) is set to serverless.

<a name="scaling_configuration_min_capacity" className="snap-top"></a>

* [**`scaling_configuration_min_capacity`**](#scaling_configuration_min_capacity) &mdash; The minimum capacity. The minimum capacity must be lesser than or equal to the maximum capacity. Valid capacity values are 2, 4, 8, 16, 32, 64, 128, and 256. Only used when [`engine_mode`](#engine_mode) is set to serverless.

<a name="scaling_configuration_seconds_until_auto_pause" className="snap-top"></a>

* [**`scaling_configuration_seconds_until_auto_pause`**](#scaling_configuration_seconds_until_auto_pause) &mdash; The time, in seconds, before an Aurora DB cluster in serverless mode is paused. Valid values are 300 through 86400. Only used when [`engine_mode`](#engine_mode) is set to serverless.

<a name="share_snapshot_max_snapshots" className="snap-top"></a>

* [**`share_snapshot_max_snapshots`**](#share_snapshot_max_snapshots) &mdash; The maximum number of snapshots to keep around for the purpose of cross account sharing. Once this number is exceeded, a lambda function will delete the oldest snapshots. Only used if [`share_snapshot_with_another_account`](#share_snapshot_with_another_account) is true.

<a name="share_snapshot_schedule_expression" className="snap-top"></a>

* [**`share_snapshot_schedule_expression`**](#share_snapshot_schedule_expression) &mdash; An expression that defines how often to run the lambda function to take snapshots for the purpose of cross account sharing. For example, cron(0 20 * * ? *) or rate(5 minutes). Required if [`share_snapshot_with_another_account`](#share_snapshot_with_another_account) is true

<a name="share_snapshot_with_account_id" className="snap-top"></a>

* [**`share_snapshot_with_account_id`**](#share_snapshot_with_account_id) &mdash; The ID of the AWS Account that the snapshot should be shared with. Required if [`share_snapshot_with_another_account`](#share_snapshot_with_another_account) is true.

<a name="share_snapshot_with_another_account" className="snap-top"></a>

* [**`share_snapshot_with_another_account`**](#share_snapshot_with_another_account) &mdash; If set to true, take periodic snapshots of the Aurora DB that should be shared with another account.

<a name="skip_final_snapshot" className="snap-top"></a>

* [**`skip_final_snapshot`**](#skip_final_snapshot) &mdash; Determines whether a final DB snapshot is created before the DB instance is deleted. Be very careful setting this to true; if you do, and you delete this DB instance, you will not have any backups of the data! You almost never want to set this to true, unless you are doing automated or manual testing.

<a name="snapshot_identifier" className="snap-top"></a>

* [**`snapshot_identifier`**](#snapshot_identifier) &mdash; If non-null, the RDS Instance will be restored from the given Snapshot ID. This is the Snapshot ID you'd find in the RDS console, e.g: rds:production-2015-06-26-06-05.

<a name="storage_encrypted" className="snap-top"></a>

* [**`storage_encrypted`**](#storage_encrypted) &mdash; Specifies whether the DB cluster uses encryption for data at rest in the underlying storage for the DB, its automated backups, Read Replicas, and snapshots. Uses the default aws/rds key in KMS.

<a name="too_many_db_connections_threshold" className="snap-top"></a>

* [**`too_many_db_connections_threshold`**](#too_many_db_connections_threshold) &mdash; Trigger an alarm if the number of connections to the DB instance goes above this threshold.

<a name="vpc_id" className="snap-top"></a>

* [**`vpc_id`**](#vpc_id) &mdash; The ID of the VPC in which to deploy Aurora.

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="all_metric_widgets" className="snap-top"></a>

* [**`all_metric_widgets`**](#all_metric_widgets) &mdash; A list of all the CloudWatch Dashboard metric widgets available in this module.

<a name="cleanup_snapshots_lambda_arn" className="snap-top"></a>

* [**`cleanup_snapshots_lambda_arn`**](#cleanup_snapshots_lambda_arn) &mdash; The ARN of the AWS Lambda Function used for cleaning up manual snapshots taken for sharing with secondary accounts.

<a name="cluster_arn" className="snap-top"></a>

* [**`cluster_arn`**](#cluster_arn) &mdash; The ARN of the RDS Aurora cluster.

<a name="cluster_id" className="snap-top"></a>

* [**`cluster_id`**](#cluster_id) &mdash; The ID of the RDS Aurora cluster (e.g TODO).

<a name="cluster_resource_id" className="snap-top"></a>

* [**`cluster_resource_id`**](#cluster_resource_id) &mdash; The unique resource ID assigned to the cluster e.g. cluster-POBCBQUFQC56EBAAWXGFJ77GRU. This is useful for allowing database authentication via IAM.

<a name="create_snapshot_lambda_arn" className="snap-top"></a>

* [**`create_snapshot_lambda_arn`**](#create_snapshot_lambda_arn) &mdash; The ARN of the AWS Lambda Function used for periodically taking snapshots to share with secondary accounts.

<a name="instance_endpoints" className="snap-top"></a>

* [**`instance_endpoints`**](#instance_endpoints) &mdash; A list of endpoints of the RDS instances that you can use to make requests to.

<a name="metric_widget_aurora_cpu_usage" className="snap-top"></a>

* [**`metric_widget_aurora_cpu_usage`**](#metric_widget_aurora_cpu_usage) &mdash; A CloudWatch Dashboard widget that graphs CPU usage (percentage) of the Aurora cluster.

<a name="metric_widget_aurora_db_connections" className="snap-top"></a>

* [**`metric_widget_aurora_db_connections`**](#metric_widget_aurora_db_connections) &mdash; A CloudWatch Dashboard widget that graphs the number of active database connections of the Aurora cluster.

<a name="metric_widget_aurora_disk_space" className="snap-top"></a>

* [**`metric_widget_aurora_disk_space`**](#metric_widget_aurora_disk_space) &mdash; A CloudWatch Dashboard widget that graphs available disk space (in bytes) on the Aurora cluster.

<a name="metric_widget_aurora_memory" className="snap-top"></a>

* [**`metric_widget_aurora_memory`**](#metric_widget_aurora_memory) &mdash; A CloudWatch Dashboard widget that graphs available memory (in bytes) on the Aurora cluster.

<a name="metric_widget_aurora_read_latency" className="snap-top"></a>

* [**`metric_widget_aurora_read_latency`**](#metric_widget_aurora_read_latency) &mdash; A CloudWatch Dashboard widget that graphs the average amount of time taken per disk I/O operation on reads.

<a name="metric_widget_aurora_write_latency" className="snap-top"></a>

* [**`metric_widget_aurora_write_latency`**](#metric_widget_aurora_write_latency) &mdash; A CloudWatch Dashboard widget that graphs the average amount of time taken per disk I/O operation on writes.

<a name="port" className="snap-top"></a>

* [**`port`**](#port) &mdash; The port used by the RDS Aurora cluster for handling database connections.

<a name="primary_endpoint" className="snap-top"></a>

* [**`primary_endpoint`**](#primary_endpoint) &mdash; The primary endpoint of the RDS Aurora cluster that you can use to make requests to.

<a name="primary_host" className="snap-top"></a>

* [**`primary_host`**](#primary_host) &mdash; The host portion of the Aurora endpoint. [`primary_endpoint`](#primary_endpoint) is in the form '&lt;host>:&lt;port>', and this output returns just the host part.

<a name="reader_endpoint" className="snap-top"></a>

* [**`reader_endpoint`**](#reader_endpoint) &mdash; A read-only endpoint for the Aurora cluster, automatically load-balanced across replicas.

<a name="share_snapshot_lambda_arn" className="snap-top"></a>

* [**`share_snapshot_lambda_arn`**](#share_snapshot_lambda_arn) &mdash; The ARN of the AWS Lambda Function used for sharing manual snapshots with secondary accounts.

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"9b0fe66e726e0c6b103b6df3046befed"}
##DOCS-SOURCER-END -->
