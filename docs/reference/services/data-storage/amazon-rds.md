---
type: "service"
name: "Amazon RDS"
description: "Deploy and manage Amazon Relational Database Service (RDS)."
category: "database"
cloud: "aws"
tags: ["data","database","sql","rds","postgresql","mysql"]
license: "gruntwork"
built-with: "terraform"
title: "Amazon Relational Database Service"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';

<VersionBadge version="0.84.3" lastModifiedVersion="0.83.0"/>

# Amazon Relational Database Service


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/data-stores/rds" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=data-stores%2Frds" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

## Overview

This service contains code to deploy an Amazon Relational Database Service (RDS) cluster that can run MySQL, PostgreSQL,
SQL Server, Oracle, or MariaDB. The cluster is managed by AWS and automatically handles standby failover, read replicas,
backups, patching, and encryption. For Aurora, use the [Aurora](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/data-stores/aurora/) service.

![RDS architecture](/img/reference/services/data-storage/rds-architecture.png)

## Features

*   Deploy a fully-managed native relational database
*   Supports, MySQL, PostgreSQL, SQL Server, Oracle, and MariaDB
*   Automatic failover to a standby in another availability zone
*   Read replicas
*   Automatic nightly snapshots
*   Automatic cross account snapshots
*   Automatic scaling of storage
*   CloudWatch Alarms for alerting when CPU, memory, and disk metrics exceed certain thresholds
*   CloudWatch dashboard widgets for RDS statistics
*   Integrate with Kubernetes Service Discovery

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

*   [What is Amazon RDS?](https://github.com/gruntwork-io/terraform-aws-data-storage/blob/master/modules/rds/core-concepts.md#what-is-amazon-rds)
*   [Common gotchas with RDS](https://github.com/gruntwork-io/terraform-aws-data-storage/blob/master/modules/rds/core-concepts.md#common-gotchas)
*   [RDS documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html): Amazon’s docs for RDS that
    cover core concepts such as the types of databases supported, security, backup & restore, and monitoring.
*   *[Designing Data Intensive Applications](https://dataintensive.net)*: the best book we’ve found for understanding data
    systems, including relational databases, NoSQL, replication, sharding, consistency, and so on.

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
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

*   [How do I pass database configuration securely?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/data-stores/rds/core-concepts.md#how-do-i-pass-database-configuration-securely)

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<a name="alarms_sns_topic_arns" className="snap-top"></a>

* [**`alarms_sns_topic_arns`**](#alarms_sns_topic_arns) &mdash; The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications. Also used for the alarms if the share snapshot backup job fails.

<a name="allocated_storage" className="snap-top"></a>

* [**`allocated_storage`**](#allocated_storage) &mdash; The amount of storage space the DB should use, in GB.

<a name="allow_connections_from_cidr_blocks" className="snap-top"></a>

* [**`allow_connections_from_cidr_blocks`**](#allow_connections_from_cidr_blocks) &mdash; The list of network CIDR blocks to allow network access to RDS from. One of [`allow_connections_from_cidr_blocks`](#allow_connections_from_cidr_blocks) or [`allow_connections_from_security_groups`](#allow_connections_from_security_groups) must be specified for the database to be reachable.

<a name="allow_connections_from_security_groups" className="snap-top"></a>

* [**`allow_connections_from_security_groups`**](#allow_connections_from_security_groups) &mdash; The list of IDs or Security Groups to allow network access to RDS from. All security groups must either be in the VPC specified by [`vpc_id`](#vpc_id), or a peered VPC with the VPC specified by [`vpc_id`](#vpc_id). One of [`allow_connections_from_cidr_blocks`](#allow_connections_from_cidr_blocks) or [`allow_connections_from_security_groups`](#allow_connections_from_security_groups) must be specified for the database to be reachable.

<a name="allow_manage_key_permissions_with_iam" className="snap-top"></a>

* [**`allow_manage_key_permissions_with_iam`**](#allow_manage_key_permissions_with_iam) &mdash; If true, both the CMK's Key Policy and IAM Policies (permissions) can be used to grant permissions on the CMK. If false, only the CMK's Key Policy can be used to grant permissions on the CMK. False is more secure (and generally preferred), but true is more flexible and convenient.

<a name="apply_immediately" className="snap-top"></a>

* [**`apply_immediately`**](#apply_immediately) &mdash; Specifies whether any cluster modifications are applied immediately, or during the next maintenance window. Note that cluster modifications may cause degraded performance or downtime.

<a name="backup_job_alarm_period" className="snap-top"></a>

* [**`backup_job_alarm_period`**](#backup_job_alarm_period) &mdash; How often, in seconds, the backup job is expected to run. This is the same as [`schedule_expression`](#schedule_expression), but unfortunately, Terraform offers no way to convert rate expressions to seconds. We add a CloudWatch alarm that triggers if the metric in [`create_snapshot_cloudwatch_metric_namespace`](#create_snapshot_cloudwatch_metric_namespace) isn't updated within this time period, as that indicates the backup failed to run.

<a name="backup_retention_period" className="snap-top"></a>

* [**`backup_retention_period`**](#backup_retention_period) &mdash; How many days to keep backup snapshots around before cleaning them up. Must be 1 or greater to support read replicas.

<a name="backup_window" className="snap-top"></a>

* [**`backup_window`**](#backup_window) &mdash; The daily time range during which automated backups are created (e.g. 04:00-09:00). Time zone is UTC. Performance may be degraded while a backup runs.

<a name="cmk_administrator_iam_arns" className="snap-top"></a>

* [**`cmk_administrator_iam_arns`**](#cmk_administrator_iam_arns) &mdash; A list of IAM ARNs for users who should be given administrator access to this CMK (e.g. arn:aws:iam::&lt;aws-account-id>:user/&lt;iam-user-arn>). If this list is empty, and [`kms_key_arn`](#kms_key_arn) is null, the ARN of the current user will be used.

<a name="cmk_external_user_iam_arns" className="snap-top"></a>

* [**`cmk_external_user_iam_arns`**](#cmk_external_user_iam_arns) &mdash; A list of IAM ARNs for users from external AWS accounts who should be given permissions to use this CMK (e.g. arn:aws:iam::&lt;aws-account-id>:root).

<a name="cmk_user_iam_arns" className="snap-top"></a>

* [**`cmk_user_iam_arns`**](#cmk_user_iam_arns) &mdash; A list of IAM ARNs for users who should be given permissions to use this CMK (e.g.  arn:aws:iam::&lt;aws-account-id>:user/&lt;iam-user-arn>). If this list is empty, and [`kms_key_arn`](#kms_key_arn) is null, the ARN of the current user will be used.

<a name="create_custom_kms_key" className="snap-top"></a>

* [**`create_custom_kms_key`**](#create_custom_kms_key) &mdash; If set to true, create a KMS CMK and use it to encrypt data on disk in the database. The permissions for this CMK will be assigned by the following variables: [`cmk_administrator_iam_arns`](#cmk_administrator_iam_arns), [`cmk_user_iam_arns`](#cmk_user_iam_arns), [`cmk_external_user_iam_arns`](#cmk_external_user_iam_arns), [`allow_manage_key_permissions`](#allow_manage_key_permissions).

<a name="create_snapshot_cloudwatch_metric_namespace" className="snap-top"></a>

* [**`create_snapshot_cloudwatch_metric_namespace`**](#create_snapshot_cloudwatch_metric_namespace) &mdash; The namespace to use for the CloudWatch metric we report every time a new RDS snapshot is created. We add a CloudWatch alarm on this metric to notify us if the backup job fails to run for any reason. Defaults to the cluster name.

<a name="custom_parameter_group" className="snap-top"></a>

* [**`custom_parameter_group`**](#custom_parameter_group) &mdash; Configure a custom parameter group for the RDS DB. This will create a new parameter group with the given parameters. When null, the database will be launched with the default parameter group.

<a name="custom_tags" className="snap-top"></a>

* [**`custom_tags`**](#custom_tags) &mdash; A map of custom tags to apply to the RDS Instance and the Security Group created for it. The key is the tag name and the value is the tag value.

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

<a name="db_config_secrets_manager_id" className="snap-top"></a>

* [**`db_config_secrets_manager_id`**](#db_config_secrets_manager_id) &mdash; The friendly name or ARN of an AWS Secrets Manager secret that contains database configuration information in the format outlined by this document: https://docs.aws.amazon.com/secretsmanager/latest/userguide/best-practices.html. The engine, username, password, dbname, and port fields must be included in the JSON. Note that even with this precaution, this information will be stored in plaintext in the Terraform state file! See the following blog post for more details: https://blog.gruntwork.io/a-comprehensive-guide-to-managing-secrets-in-your-terraform-code-1d586955ace1. If you do not wish to use Secrets Manager, leave this as null, and use the [`master_username`](#master_username), [`master_password`](#master_password), [`db_name`](#db_name), engine, and port variables.

<a name="db_name" className="snap-top"></a>

* [**`db_name`**](#db_name) &mdash; The name for your database of up to 8 alpha-numeric characters. If you do not provide a name, Amazon RDS will not create an empty database on the RDS instance. This can also be provided via AWS Secrets Manager. See the description of [`db_config_secrets_manager_id`](#db_config_secrets_manager_id).

<a name="delete_automated_backups" className="snap-top"></a>

* [**`delete_automated_backups`**](#delete_automated_backups) &mdash; Specifies whether to remove automated backups immediately after the DB instance is deleted

<a name="enable_cloudwatch_alarms" className="snap-top"></a>

* [**`enable_cloudwatch_alarms`**](#enable_cloudwatch_alarms) &mdash; Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using [`alarms_sns_topic_arn`](#alarms_sns_topic_arn).

<a name="enable_cloudwatch_metrics" className="snap-top"></a>

* [**`enable_cloudwatch_metrics`**](#enable_cloudwatch_metrics) &mdash; When true, enable CloudWatch metrics for the manual snapshots created for the purpose of sharing with another account.

<a name="enable_deletion_protection" className="snap-top"></a>

* [**`enable_deletion_protection`**](#enable_deletion_protection) &mdash; Enable deletion protection on the RDS instance. If this is enabled, the database cannot be deleted prior to disabling

<a name="enable_perf_alarms" className="snap-top"></a>

* [**`enable_perf_alarms`**](#enable_perf_alarms) &mdash; Set to true to enable alarms related to performance, such as read and write latency alarms. Set to false to disable those alarms if you aren't sure what would be reasonable perf numbers for your RDS set up or if those numbers are too unpredictable.

<a name="enable_share_snapshot_cloudwatch_alarms" className="snap-top"></a>

* [**`enable_share_snapshot_cloudwatch_alarms`**](#enable_share_snapshot_cloudwatch_alarms) &mdash; When true, enable CloudWatch alarms for the manual snapshots created for the purpose of sharing with another account. Only used if [`share_snapshot_with_another_account`](#share_snapshot_with_another_account) is true.

<a name="enabled_cloudwatch_logs_exports" className="snap-top"></a>

* [**`enabled_cloudwatch_logs_exports`**](#enabled_cloudwatch_logs_exports) &mdash; List of log types to enable for exporting to CloudWatch logs. If omitted, no logs will be exported. Valid values (depending on engine): alert, audit, error, general, listener, slowquery, trace, postgresql (PostgreSQL) and upgrade (PostgreSQL).

<a name="engine" className="snap-top"></a>

* [**`engine`**](#engine) &mdash; The DB engine to use (e.g. mysql). This can also be provided via AWS Secrets Manager. See the description of [`db_config_secrets_manager_id`](#db_config_secrets_manager_id).

<a name="engine_version" className="snap-top"></a>

* [**`engine_version`**](#engine_version) &mdash; The version of var.engine to use (e.g. 8.0.17 for mysql).

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

<a name="instance_type" className="snap-top"></a>

* [**`instance_type`**](#instance_type) &mdash; The instance type to use for the db (e.g. db.t3.micro)

<a name="kms_key_arn" className="snap-top"></a>

* [**`kms_key_arn`**](#kms_key_arn) &mdash; The Amazon Resource Name (ARN) of an existing KMS customer master key (CMK) that will be used to encrypt/decrypt backup files. If you leave this blank, the default RDS KMS key for the account will be used. If you set [`create_custom_kms_key`](#create_custom_kms_key) to true, this value will be ignored and a custom key will be created and used instead.

<a name="license_model" className="snap-top"></a>

* [**`license_model`**](#license_model) &mdash; The license model to use for this DB. Check the docs for your RDS DB for available license models. Set to an empty string to use the default.

<a name="low_disk_space_available_period" className="snap-top"></a>

* [**`low_disk_space_available_period`**](#low_disk_space_available_period) &mdash; The period, in seconds, over which to measure the available free disk space.

<a name="low_disk_space_available_threshold" className="snap-top"></a>

* [**`low_disk_space_available_threshold`**](#low_disk_space_available_threshold) &mdash; Trigger an alarm if the amount of disk space, in Bytes, on the DB instance drops below this threshold.

<a name="low_memory_available_period" className="snap-top"></a>

* [**`low_memory_available_period`**](#low_memory_available_period) &mdash; The period, in seconds, over which to measure the available free memory.

<a name="low_memory_available_threshold" className="snap-top"></a>

* [**`low_memory_available_threshold`**](#low_memory_available_threshold) &mdash; Trigger an alarm if the amount of free memory, in Bytes, on the DB instance drops below this threshold.

<a name="master_password" className="snap-top"></a>

* [**`master_password`**](#master_password) &mdash; The value to use for the master password of the database. This can also be provided via AWS Secrets Manager. See the description of [`db_config_secrets_manager_id`](#db_config_secrets_manager_id).

<a name="master_username" className="snap-top"></a>

* [**`master_username`**](#master_username) &mdash; The value to use for the master username of the database. This can also be provided via AWS Secrets Manager. See the description of [`db_config_secrets_manager_id`](#db_config_secrets_manager_id).

<a name="max_allocated_storage" className="snap-top"></a>

* [**`max_allocated_storage`**](#max_allocated_storage) &mdash; When configured, the upper limit to which Amazon RDS can automatically scale the storage of the DB instance. Configuring this will automatically ignore differences to [`allocated_storage`](#allocated_storage). Must be greater than or equal to [`allocated_storage`](#allocated_storage) or 0 to disable Storage Autoscaling.

<a name="multi_az" className="snap-top"></a>

* [**`multi_az`**](#multi_az) &mdash; Specifies if a standby instance should be deployed in another availability zone. If the primary fails, this instance will automatically take over.

<a name="name" className="snap-top"></a>

* [**`name`**](#name) &mdash; The name used to namespace all the RDS resources created by these templates, including the cluster and cluster instances (e.g. mysql-stage). Must be unique in this region. Must be a lowercase string.

<a name="num_read_replicas" className="snap-top"></a>

* [**`num_read_replicas`**](#num_read_replicas) &mdash; The number of read replicas to deploy

<a name="performance_insights_enabled" className="snap-top"></a>

* [**`performance_insights_enabled`**](#performance_insights_enabled) &mdash; Specifies whether Performance Insights are enabled. Performance Insights can be enabled for specific versions of database engines. See https://aws.amazon.com/rds/performance-insights/ for more details.

<a name="port" className="snap-top"></a>

* [**`port`**](#port) &mdash; The port the DB will listen on (e.g. 3306). Alternatively, this can be provided via AWS Secrets Manager. See the description of [`db_config_secrets_manager_id`](#db_config_secrets_manager_id).

<a name="publicly_accessible" className="snap-top"></a>

* [**`publicly_accessible`**](#publicly_accessible) &mdash; If you wish to make your database accessible from the public Internet, set this flag to true (WARNING: NOT RECOMMENDED FOR REGULAR USAGE!!). The default is false, which means the database is only accessible from within the VPC, which is much more secure. This flag MUST be false for serverless mode.

<a name="replica_backup_retention_period" className="snap-top"></a>

* [**`replica_backup_retention_period`**](#replica_backup_retention_period) &mdash; How many days to keep backup snapshots around before cleaning them up on the read replicas. Must be 1 or greater to support read replicas. 0 means disable automated backups.

<a name="share_snapshot_max_snapshots" className="snap-top"></a>

* [**`share_snapshot_max_snapshots`**](#share_snapshot_max_snapshots) &mdash; The maximum number of snapshots to keep around for the purpose of cross account sharing. Once this number is exceeded, a lambda function will delete the oldest snapshots. Only used if [`share_snapshot_with_another_account`](#share_snapshot_with_another_account) is true.

<a name="share_snapshot_schedule_expression" className="snap-top"></a>

* [**`share_snapshot_schedule_expression`**](#share_snapshot_schedule_expression) &mdash; An expression that defines how often to run the lambda function to take snapshots for the purpose of cross account sharing. For example, cron(0 20 * * ? *) or rate(5 minutes). Required if [`share_snapshot_with_another_account`](#share_snapshot_with_another_account) is true

<a name="share_snapshot_with_account_id" className="snap-top"></a>

* [**`share_snapshot_with_account_id`**](#share_snapshot_with_account_id) &mdash; The ID of the AWS Account that the snapshot should be shared with. Required if [`share_snapshot_with_another_account`](#share_snapshot_with_another_account) is true.

<a name="share_snapshot_with_another_account" className="snap-top"></a>

* [**`share_snapshot_with_another_account`**](#share_snapshot_with_another_account) &mdash; If set to true, take periodic snapshots of the RDS DB that should be shared with another account.

<a name="skip_final_snapshot" className="snap-top"></a>

* [**`skip_final_snapshot`**](#skip_final_snapshot) &mdash; Determines whether a final DB snapshot is created before the DB instance is deleted. Be very careful setting this to true; if you do, and you delete this DB instance, you will not have any backups of the data! You almost never want to set this to true, unless you are doing automated or manual testing.

<a name="snapshot_identifier" className="snap-top"></a>

* [**`snapshot_identifier`**](#snapshot_identifier) &mdash; If non-null, the RDS Instance will be restored from the given Snapshot ID. This is the Snapshot ID you'd find in the RDS console, e.g: rds:production-2015-06-26-06-05.

<a name="storage_encrypted" className="snap-top"></a>

* [**`storage_encrypted`**](#storage_encrypted) &mdash; Specifies whether the DB instance is encrypted.

<a name="subnet_ids" className="snap-top"></a>

* [**`subnet_ids`**](#subnet_ids) &mdash; The list of IDs of the subnets in which to deploy RDS. The list must only contain subnets in [`vpc_id`](#vpc_id).

<a name="too_many_db_connections_threshold" className="snap-top"></a>

* [**`too_many_db_connections_threshold`**](#too_many_db_connections_threshold) &mdash; Trigger an alarm if the number of connections to the DB instance goes above this threshold.

<a name="vpc_id" className="snap-top"></a>

* [**`vpc_id`**](#vpc_id) &mdash; The ID of the VPC in which to deploy RDS.

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="all_metric_widgets" className="snap-top"></a>

* [**`all_metric_widgets`**](#all_metric_widgets) &mdash; A list of all the CloudWatch Dashboard metric widgets available in this module.

<a name="db_name" className="snap-top"></a>

* [**`db_name`**](#db_name) &mdash; The name of the empty database created on this RDS DB instance.

<a name="metric_widget_rds_cpu_usage" className="snap-top"></a>

* [**`metric_widget_rds_cpu_usage`**](#metric_widget_rds_cpu_usage) &mdash; A CloudWatch Dashboard widget that graphs CPU usage (percentage) on the RDS DB instance.

<a name="metric_widget_rds_db_connections" className="snap-top"></a>

* [**`metric_widget_rds_db_connections`**](#metric_widget_rds_db_connections) &mdash; A CloudWatch Dashboard widget that graphs the number of active database connections on the RDS DB Instance.

<a name="metric_widget_rds_disk_space" className="snap-top"></a>

* [**`metric_widget_rds_disk_space`**](#metric_widget_rds_disk_space) &mdash; A CloudWatch Dashboard widget that graphs available disk space (in bytes) on the RDS DB instance.

<a name="metric_widget_rds_memory" className="snap-top"></a>

* [**`metric_widget_rds_memory`**](#metric_widget_rds_memory) &mdash; A CloudWatch Dashboard widget that graphs available memory (in bytes) on the RDS DB instance.

<a name="metric_widget_rds_read_latency" className="snap-top"></a>

* [**`metric_widget_rds_read_latency`**](#metric_widget_rds_read_latency) &mdash; A CloudWatch Dashboard widget that graphs the average amount of time taken per disk I/O operation on reads.

<a name="metric_widget_rds_write_latency" className="snap-top"></a>

* [**`metric_widget_rds_write_latency`**](#metric_widget_rds_write_latency) &mdash; A CloudWatch Dashboard widget that graphs the average amount of time taken per disk I/O operation on writes.

<a name="name" className="snap-top"></a>

* [**`name`**](#name) &mdash; The name of the RDS DB instance.

<a name="num_read_replicas" className="snap-top"></a>

* [**`num_read_replicas`**](#num_read_replicas) &mdash; The number of read replicas for the RDS DB instance.

<a name="port" className="snap-top"></a>

* [**`port`**](#port) &mdash; The port of the RDS DB instance.

<a name="primary_arn" className="snap-top"></a>

* [**`primary_arn`**](#primary_arn) &mdash; The ARN of the RDS DB instance.

<a name="primary_endpoint" className="snap-top"></a>

* [**`primary_endpoint`**](#primary_endpoint) &mdash; The endpoint of the RDS DB instance that you can make requests to.

<a name="primary_host" className="snap-top"></a>

* [**`primary_host`**](#primary_host) &mdash; The host portion of the RDS DB instance endpoint. [`primary_endpoint`](#primary_endpoint) is in the form '&lt;host>:&lt;port>', and this output returns just the host part.

<a name="primary_id" className="snap-top"></a>

* [**`primary_id`**](#primary_id) &mdash; The ID of the RDS DB instance.

<a name="read_replica_arns" className="snap-top"></a>

* [**`read_replica_arns`**](#read_replica_arns) &mdash; A list of ARNs of the RDS DB instance's read replicas.

<a name="read_replica_endpoints" className="snap-top"></a>

* [**`read_replica_endpoints`**](#read_replica_endpoints) &mdash; A list of endpoints of the RDS DB instance's read replicas.

<a name="read_replica_ids" className="snap-top"></a>

* [**`read_replica_ids`**](#read_replica_ids) &mdash; A list of IDs of the RDS DB instance's read replicas.

<a name="security_group_id" className="snap-top"></a>

* [**`security_group_id`**](#security_group_id) &mdash; The ID of the Security Group that controls access to the RDS DB instance.

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"073350387b906874b95515cb21801b69"}
##DOCS-SOURCER-END -->
