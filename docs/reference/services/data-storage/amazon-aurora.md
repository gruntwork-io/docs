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
import HclListItem from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.85.0" lastModifiedVersion="0.85.0"/>

# Amazon Aurora


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/data-stores/aurora" className="link-button">View Source</a>

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

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/),
    and it shows you how we build an end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<br/>

### Required

<HclListItem name="aurora_subnet_ids" requirement="required" description="The list of IDs of the subnets in which to deploy Aurora. The list must only contain subnets in <a href=#vpc_id><code>vpc_id</code></a>." type="list" typeDetails="list(string)"/>

<HclListItem name="name" requirement="required" description="The name used to namespace all the Aurora resources created by these templates, including the cluster and cluster instances (e.g. drupaldb). Must be unique in this region. Must be a lowercase string." type="string"/>

<HclListItem name="vpc_id" requirement="required" description="The ID of the VPC in which to deploy Aurora." type="string"/>


<br/>


### Optional

<HclListItem name="alarms_sns_topic_arns" requirement="optional" description="The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications. Also used for the alarms if the share snapshot backup job fails." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="allow_connections_from_cidr_blocks" requirement="optional" description="The list of network CIDR blocks to allow network access to Aurora from. One of <a href=#allow_connections_from_cidr_blocks><code>allow_connections_from_cidr_blocks</code></a> or <a href=#allow_connections_from_security_groups><code>allow_connections_from_security_groups</code></a> must be specified for the database to be reachable." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="allow_connections_from_security_groups" requirement="optional" description="The list of IDs or Security Groups to allow network access to Aurora from. All security groups must either be in the VPC specified by <a href=#vpc_id><code>vpc_id</code></a>, or a peered VPC with the VPC specified by <a href=#vpc_id><code>vpc_id</code></a>. One of <a href=#allow_connections_from_cidr_blocks><code>allow_connections_from_cidr_blocks</code></a> or <a href=#allow_connections_from_security_groups><code>allow_connections_from_security_groups</code></a> must be specified for the database to be reachable." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="allow_major_version_upgrade" requirement="optional" description="Enable to allow major engine version upgrades when changing engine versions." type="bool" defaultValue="false"/>

<HclListItem name="apply_immediately" requirement="optional" description="Specifies whether any cluster modifications are applied immediately, or during the next maintenance window. Note that cluster modifications may cause degraded performance or downtime." type="bool" defaultValue="false"/>

<HclListItem name="backup_job_alarm_period" requirement="optional" description="How often, in seconds, the backup job is expected to run. This is the same as <a href=#schedule_expression><code>schedule_expression</code></a>, but unfortunately, Terraform offers no way to convert rate expressions to seconds. We add a CloudWatch alarm that triggers if the metric in <a href=#create_snapshot_cloudwatch_metric_namespace><code>create_snapshot_cloudwatch_metric_namespace</code></a> isn't updated within this time period, as that indicates the backup failed to run." type="number" defaultValue="3600"/>

<HclListItem name="backup_retention_period" requirement="optional" description="How many days to keep backup snapshots around before cleaning them up. Max: 35" type="number" defaultValue="30"/>

<HclListItem name="copy_tags_to_snapshot" requirement="optional" description="Copy all the Aurora cluster tags to snapshots. Default is false." type="bool" defaultValue="false"/>

<HclListItem name="create_snapshot_cloudwatch_metric_namespace" requirement="optional" description="The namespace to use for the CloudWatch metric we report every time a new RDS snapshot is created. We add a CloudWatch alarm on this metric to notify us if the backup job fails to run for any reason. Defaults to the cluster name." type="string" defaultValue="null"/>

<HclListItem name="custom_tags" requirement="optional" description="A map of custom tags to apply to the RDS cluster and all associated resources created for it. The key is the tag name and the value is the tag value." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="dashboard_cpu_usage_widget_parameters" requirement="optional" description="Parameters for the cpu usage widget to output for use in a CloudWatch dashboard." type="object" typeDetails="object({
    # The period in seconds for metrics to sample across.
    period = number
    # The width and height of the widget in grid units in a 24 column grid. E.g., a value of 12 will take up half the
    # space.
    width  = number
    height = number
  })" defaultValue="{'height':6,'period':60,'width':8}"/>

<HclListItem name="dashboard_db_connections_widget_parameters" requirement="optional" description="Parameters for the database connections widget to output for use in a CloudWatch dashboard." type="object" typeDetails="object({
    # The period in seconds for metrics to sample across.
    period = number
    # The width and height of the widget in grid units in a 24 column grid. E.g., a value of 12 will take up half the
    # space.
    width  = number
    height = number
  })" defaultValue="{'height':6,'period':60,'width':8}"/>

<HclListItem name="dashboard_disk_space_widget_parameters" requirement="optional" description="Parameters for the available disk space widget to output for use in a CloudWatch dashboard." type="object" typeDetails="object({
    # The period in seconds for metrics to sample across.
    period = number
    # The width and height of the widget in grid units in a 24 column grid. E.g., a value of 12 will take up half the
    # space.
    width  = number
    height = number
  })" defaultValue="{'height':6,'period':60,'width':8}"/>

<HclListItem name="dashboard_memory_widget_parameters" requirement="optional" description="Parameters for the available memory widget to output for use in a CloudWatch dashboard." type="object" typeDetails="object({
    # The period in seconds for metrics to sample across.
    period = number
    # The width and height of the widget in grid units in a 24 column grid. E.g., a value of 12 will take up half the
    # space.
    width  = number
    height = number
  })" defaultValue="{'height':6,'period':60,'width':8}"/>

<HclListItem name="dashboard_read_latency_widget_parameters" requirement="optional" description="Parameters for the read latency widget to output for use in a CloudWatch dashboard." type="object" typeDetails="object({
    # The period in seconds for metrics to sample across.
    period = number
    # The width and height of the widget in grid units in a 24 column grid. E.g., a value of 12 will take up half the
    # space.
    width  = number
    height = number
  })" defaultValue="{'height':6,'period':60,'width':8}"/>

<HclListItem name="dashboard_write_latency_widget_parameters" requirement="optional" description="Parameters for the read latency widget to output for use in a CloudWatch dashboard." type="object" typeDetails="object({
    # The period in seconds for metrics to sample across.
    period = number
    # The width and height of the widget in grid units in a 24 column grid. E.g., a value of 12 will take up half the
    # space.
    width  = number
    height = number
  })" defaultValue="{'height':6,'period':60,'width':8}"/>

<HclListItem name="db_cluster_custom_parameter_group" requirement="optional" description="Configure a custom parameter group for the RDS DB cluster. This will create a new parameter group with the given parameters. When null, the database will be launched with the default parameter group." type="object" typeDetails="object({
    # Name of the parameter group to create
    name = string
    # The family of the DB cluster parameter group.
    family = string
    # The parameters to configure on the created parameter group.
    parameters = list(object({
      # Parameter name to configure.
      name = string
      # Vaue to set the parameter.
      value = string
      # When to apply the parameter. 'immediate' or 'pending-reboot'.
      apply_method = string
    }))
  })" defaultValue="null"/>

<HclListItem name="db_config_secrets_manager_id" requirement="optional" description="The friendly name or ARN of an AWS Secrets Manager secret that contains database configuration information in the format outlined by this document: https://docs.aws.amazon.com/secretsmanager/latest/userguide/best-practices.html. The engine, username, password, dbname, and port fields must be included in the JSON. Note that even with this precaution, this information will be stored in plaintext in the Terraform state file! See the following blog post for more details: https://blog.gruntwork.io/a-comprehensive-guide-to-managing-secrets-in-your-terraform-code-1d586955ace1. If you do not wish to use Secrets Manager, leave this as null, and use the <a href=#master_username><code>master_username</code></a>, <a href=#master_password><code>master_password</code></a>, <a href=#db_name><code>db_name</code></a>, engine, and port variables." type="string" defaultValue="null"/>

<HclListItem name="db_instance_custom_parameter_group" requirement="optional" description="Configure a custom parameter group for the RDS DB Instance. This will create a new parameter group with the given parameters. When null, the database will be launched with the default parameter group." type="object" typeDetails="object({
    # Name of the parameter group to create
    name = string
    # The family of the DB cluster parameter group.
    family = string
    # The parameters to configure on the created parameter group.
    parameters = list(object({
      # Parameter name to configure.
      name = string
      # Vaue to set the parameter.
      value = string
      # When to apply the parameter. 'immediate' or 'pending-reboot'.
      apply_method = string
    }))
  })" defaultValue="null"/>

<HclListItem name="db_name" requirement="optional" description="The name for your database of up to 8 alpha-numeric characters. If you do not provide a name, Amazon RDS will not create a database in the DB cluster you are creating. This can also be provided via AWS Secrets Manager. See the description of <a href=#db_config_secrets_manager_id><code>db_config_secrets_manager_id</code></a>. A value here overrides the value in <a href=#db_config_secrets_manager_id><code>db_config_secrets_manager_id</code></a>." type="string" defaultValue="null"/>

<HclListItem name="enable_cloudwatch_alarms" requirement="optional" description="Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using <a href=#alarms_sns_topic_arn><code>alarms_sns_topic_arn</code></a>." type="bool" defaultValue="true"/>

<HclListItem name="enable_cloudwatch_metrics" requirement="optional" description="When true, enable CloudWatch metrics for the manual snapshots created for the purpose of sharing with another account." type="bool" defaultValue="true"/>

<HclListItem name="enable_deletion_protection" requirement="optional" description="Enable deletion protection on the database instance. If this is enabled, the database cannot be deleted." type="bool" defaultValue="false"/>

<HclListItem name="enable_perf_alarms" requirement="optional" description="Set to true to enable alarms related to performance, such as read and write latency alarms. Set to false to disable those alarms if you aren't sure what would be reasonable perf numbers for your RDS set up or if those numbers are too unpredictable." type="bool" defaultValue="true"/>

<HclListItem name="enable_share_snapshot_cloudwatch_alarms" requirement="optional" description="When true, enable CloudWatch alarms for the manual snapshots created for the purpose of sharing with another account. Only used if <a href=#share_snapshot_with_another_account><code>share_snapshot_with_another_account</code></a> is true." type="bool" defaultValue="true"/>

<HclListItem name="enabled_cloudwatch_logs_exports" requirement="optional" description="If non-empty, the Aurora cluster will export the specified logs to Cloudwatch. Must be zero or more of: audit, error, general and slowquery" type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="engine" requirement="optional" description="The name of the database engine to be used for this DB cluster. Valid Values: aurora (for MySQL 5.6-compatible Aurora), aurora-mysql (for MySQL 5.7-compatible Aurora), and aurora-postgresql. This can also be provided via AWS Secrets Manager. See the description of <a href=#db_config_secrets_manager_id><code>db_config_secrets_manager_id</code></a>. A value here overrides the value in <a href=#db_config_secrets_manager_id><code>db_config_secrets_manager_id</code></a>." type="string" defaultValue="null"/>

<HclListItem name="engine_mode" requirement="optional" description="The version of aurora to run - provisioned or serverless." type="string" defaultValue="provisioned"/>

<HclListItem name="engine_version" requirement="optional" description="The Amazon Aurora DB engine version for the selected engine and <a href=#engine_mode><code>engine_mode</code></a>. Note: Starting with Aurora MySQL 2.03.2, Aurora engine versions have the following syntax <mysql-major-version>.<a href=#mysql_aurora><code>mysql_aurora</code></a>.<aurora-mysql-version>. e.g. 5.7.<a href=#mysql_aurora><code>mysql_aurora</code></a>.2.08.1." type="string" defaultValue="null"/>

<HclListItem name="high_cpu_utilization_period" requirement="optional" description="The period, in seconds, over which to measure the CPU utilization percentage." type="number" defaultValue="60"/>

<HclListItem name="high_cpu_utilization_threshold" requirement="optional" description="Trigger an alarm if the DB instance has a CPU utilization percentage above this threshold." type="number" defaultValue="90"/>

<HclListItem name="high_read_latency_period" requirement="optional" description="The period, in seconds, over which to measure the read latency." type="number" defaultValue="60"/>

<HclListItem name="high_read_latency_threshold" requirement="optional" description="Trigger an alarm if the DB instance read latency (average amount of time taken per disk I/O operation), in seconds, is above this threshold." type="number" defaultValue="5"/>

<HclListItem name="high_write_latency_period" requirement="optional" description="The period, in seconds, over which to measure the write latency." type="number" defaultValue="60"/>

<HclListItem name="high_write_latency_threshold" requirement="optional" description="Trigger an alarm if the DB instance write latency (average amount of time taken per disk I/O operation), in seconds, is above this threshold." type="number" defaultValue="5"/>

<HclListItem name="iam_database_authentication_enabled" requirement="optional" description="Specifies whether mappings of AWS Identity and Access Management (IAM) accounts to database accounts is enabled. Disabled by default." type="bool" defaultValue="false"/>

<HclListItem name="instance_count" requirement="optional" description="The number of DB instances, including the primary, to run in the RDS cluster. Only used when <a href=#engine_mode><code>engine_mode</code></a> is set to provisioned." type="number" defaultValue="1"/>

<HclListItem name="instance_type" requirement="optional" description="The instance type to use for the db (e.g. db.r3.large). Only used when <a href=#engine_mode><code>engine_mode</code></a> is set to provisioned." type="string" defaultValue="db.t3.small"/>

<HclListItem name="kms_key_arn" requirement="optional" description="The ARN of a KMS key that should be used to encrypt data on disk. Only used if <a href=#storage_encrypted><code>storage_encrypted</code></a> is true. If you leave this null, the default RDS KMS key for the account will be used." type="string" defaultValue="null"/>

<HclListItem name="low_disk_space_available_period" requirement="optional" description="The period, in seconds, over which to measure the available free disk space." type="number" defaultValue="60"/>

<HclListItem name="low_disk_space_available_threshold" requirement="optional" description="Trigger an alarm if the amount of disk space, in Bytes, on the DB instance drops below this threshold." type="number" defaultValue="1000000000"/>

<HclListItem name="low_memory_available_period" requirement="optional" description="The period, in seconds, over which to measure the available free memory." type="number" defaultValue="60"/>

<HclListItem name="low_memory_available_threshold" requirement="optional" description="Trigger an alarm if the amount of free memory, in Bytes, on the DB instance drops below this threshold." type="number" defaultValue="100000000"/>

<HclListItem name="master_password" requirement="optional" description="The value to use for the master password of the database. This can also be provided via AWS Secrets Manager. See the description of <a href=#db_config_secrets_manager_id><code>db_config_secrets_manager_id</code></a>. A value here overrides the value in <a href=#db_config_secrets_manager_id><code>db_config_secrets_manager_id</code></a>." type="string" defaultValue="null"/>

<HclListItem name="master_username" requirement="optional" description="The value to use for the master username of the database. This can also be provided via AWS Secrets Manager. See the description of <a href=#db_config_secrets_manager_id><code>db_config_secrets_manager_id</code></a>. A value here overrides the value in <a href=#db_config_secrets_manager_id><code>db_config_secrets_manager_id</code></a>." type="string" defaultValue="null"/>

<HclListItem name="port" requirement="optional" description="The port the DB will listen on (e.g. 3306). This can also be provided via AWS Secrets Manager. See the description of <a href=#db_config_secrets_manager_id><code>db_config_secrets_manager_id</code></a>. A value here overrides the value in <a href=#db_config_secrets_manager_id><code>db_config_secrets_manager_id</code></a>." type="number" defaultValue="null"/>

<HclListItem name="publicly_accessible" requirement="optional" description="If you wish to make your database accessible from the public Internet, set this flag to true (WARNING: NOT RECOMMENDED FOR REGULAR USAGE!!). The default is false, which means the database is only accessible from within the VPC, which is much more secure. This flag MUST be false for serverless mode." type="bool" defaultValue="false"/>

<HclListItem name="restore_source_cluster_identifier" requirement="optional" description="If non-empty, the Aurora cluster will be restored from the given source cluster using the latest restorable time. Can only be used if <a href=#snapshot_identifier><code>snapshot_identifier</code></a> is null. For more information see https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/<a href=#USER_PIT><code>USER_PIT</code></a>.html" type="string" defaultValue="null"/>

<HclListItem name="restore_type" requirement="optional" description="Only used if '<a href=#restore_source_cluster_identifier><code>restore_source_cluster_identifier</code></a>' is non-empty. Type of restore to be performed. Valid options are 'full-copy' and 'copy-on-write'. https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Clone.html" type="string" defaultValue="null"/>

<HclListItem name="scaling_configuration_auto_pause" requirement="optional" description="Whether to enable automatic pause. A DB cluster can be paused only when it's idle (it has no connections). If a DB cluster is paused for more than seven days, the DB cluster might be backed up with a snapshot. In this case, the DB cluster is restored when there is a request to connect to it. Only used when <a href=#engine_mode><code>engine_mode</code></a> is set to serverless." type="bool" defaultValue="true"/>

<HclListItem name="scaling_configuration_max_capacity" requirement="optional" description="The maximum capacity. The maximum capacity must be greater than or equal to the minimum capacity. Valid capacity values are 2, 4, 8, 16, 32, 64, 128, and 256. Only used when <a href=#engine_mode><code>engine_mode</code></a> is set to serverless." type="number" defaultValue="256"/>

<HclListItem name="scaling_configuration_min_capacity" requirement="optional" description="The minimum capacity. The minimum capacity must be lesser than or equal to the maximum capacity. Valid capacity values are 2, 4, 8, 16, 32, 64, 128, and 256. Only used when <a href=#engine_mode><code>engine_mode</code></a> is set to serverless." type="number" defaultValue="2"/>

<HclListItem name="scaling_configuration_seconds_until_auto_pause" requirement="optional" description="The time, in seconds, before an Aurora DB cluster in serverless mode is paused. Valid values are 300 through 86400. Only used when <a href=#engine_mode><code>engine_mode</code></a> is set to serverless." type="number" defaultValue="300"/>

<HclListItem name="share_snapshot_max_snapshots" requirement="optional" description="The maximum number of snapshots to keep around for the purpose of cross account sharing. Once this number is exceeded, a lambda function will delete the oldest snapshots. Only used if <a href=#share_snapshot_with_another_account><code>share_snapshot_with_another_account</code></a> is true." type="number" defaultValue="30"/>

<HclListItem name="share_snapshot_schedule_expression" requirement="optional" description="An expression that defines how often to run the lambda function to take snapshots for the purpose of cross account sharing. For example, cron(0 20 * * ? *) or rate(5 minutes). Required if <a href=#share_snapshot_with_another_account><code>share_snapshot_with_another_account</code></a> is true" type="string" defaultValue="null"/>

<HclListItem name="share_snapshot_with_account_id" requirement="optional" description="The ID of the AWS Account that the snapshot should be shared with. Required if <a href=#share_snapshot_with_another_account><code>share_snapshot_with_another_account</code></a> is true." type="string" defaultValue="null"/>

<HclListItem name="share_snapshot_with_another_account" requirement="optional" description="If set to true, take periodic snapshots of the Aurora DB that should be shared with another account." type="bool" defaultValue="false"/>

<HclListItem name="skip_final_snapshot" requirement="optional" description="Determines whether a final DB snapshot is created before the DB instance is deleted. Be very careful setting this to true; if you do, and you delete this DB instance, you will not have any backups of the data! You almost never want to set this to true, unless you are doing automated or manual testing." type="bool" defaultValue="false"/>

<HclListItem name="snapshot_identifier" requirement="optional" description="If non-null, the RDS Instance will be restored from the given Snapshot ID. This is the Snapshot ID you'd find in the RDS console, e.g: rds:production-2015-06-26-06-05." type="string" defaultValue="null"/>

<HclListItem name="storage_encrypted" requirement="optional" description="Specifies whether the DB cluster uses encryption for data at rest in the underlying storage for the DB, its automated backups, Read Replicas, and snapshots. Uses the default aws/rds key in KMS." type="bool" defaultValue="true"/>

<HclListItem name="too_many_db_connections_threshold" requirement="optional" description="Trigger an alarm if the number of connections to the DB instance goes above this threshold." type="number" defaultValue="null"/>

</TabItem>
<TabItem value="outputs" label="Outputs">

<br/>

<HclListItem name="all_metric_widgets" requirement="required" description="A list of all the CloudWatch Dashboard metric widgets available in this module."/>

<HclListItem name="cleanup_snapshots_lambda_arn" requirement="required" description="The ARN of the AWS Lambda Function used for cleaning up manual snapshots taken for sharing with secondary accounts."/>

<HclListItem name="cluster_arn" requirement="required" description="The ARN of the RDS Aurora cluster."/>

<HclListItem name="cluster_id" requirement="required" description="The ID of the RDS Aurora cluster (e.g TODO)."/>

<HclListItem name="cluster_resource_id" requirement="required" description="The unique resource ID assigned to the cluster e.g. cluster-POBCBQUFQC56EBAAWXGFJ77GRU. This is useful for allowing database authentication via IAM."/>

<HclListItem name="create_snapshot_lambda_arn" requirement="required" description="The ARN of the AWS Lambda Function used for periodically taking snapshots to share with secondary accounts."/>

<HclListItem name="instance_endpoints" requirement="required" description="A list of endpoints of the RDS instances that you can use to make requests to."/>

<HclListItem name="metric_widget_aurora_cpu_usage" requirement="required" description="A CloudWatch Dashboard widget that graphs CPU usage (percentage) of the Aurora cluster."/>

<HclListItem name="metric_widget_aurora_db_connections" requirement="required" description="A CloudWatch Dashboard widget that graphs the number of active database connections of the Aurora cluster."/>

<HclListItem name="metric_widget_aurora_disk_space" requirement="required" description="A CloudWatch Dashboard widget that graphs available disk space (in bytes) on the Aurora cluster."/>

<HclListItem name="metric_widget_aurora_memory" requirement="required" description="A CloudWatch Dashboard widget that graphs available memory (in bytes) on the Aurora cluster."/>

<HclListItem name="metric_widget_aurora_read_latency" requirement="required" description="A CloudWatch Dashboard widget that graphs the average amount of time taken per disk I/O operation on reads."/>

<HclListItem name="metric_widget_aurora_write_latency" requirement="required" description="A CloudWatch Dashboard widget that graphs the average amount of time taken per disk I/O operation on writes."/>

<HclListItem name="port" requirement="required" description="The port used by the RDS Aurora cluster for handling database connections."/>

<HclListItem name="primary_endpoint" requirement="required" description="The primary endpoint of the RDS Aurora cluster that you can use to make requests to."/>

<HclListItem name="primary_host" requirement="required" description="The host portion of the Aurora endpoint. <a href=#primary_endpoint><code>primary_endpoint</code></a> is in the form '<host>:<port>', and this output returns just the host part."/>

<HclListItem name="reader_endpoint" requirement="required" description="A read-only endpoint for the Aurora cluster, automatically load-balanced across replicas."/>

<HclListItem name="share_snapshot_lambda_arn" requirement="required" description="The ARN of the AWS Lambda Function used for sharing manual snapshots with secondary accounts."/>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"c138de8564411ee7fc9c84d3dfe47257"}
##DOCS-SOURCER-END -->
