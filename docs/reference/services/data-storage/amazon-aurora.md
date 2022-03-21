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
import { HclListItem, HclListItemTypeDetails, HclListItemDefaultValue } from '../../../../src/components/HclListItem.tsx';

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

<HclListItem name="aurora_subnet_ids" description="The list of IDs of the subnets in which to deploy Aurora. The list must only contain subnets in <a href=#vpc_id><code>vpc_id</code></a>." requirement="required" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
</HclListItem>

<HclListItem name="name" description="The name used to namespace all the Aurora resources created by these templates, including the cluster and cluster instances (e.g. drupaldb). Must be unique in this region. Must be a lowercase string." requirement="required" type="string">
</HclListItem>

<HclListItem name="vpc_id" description="The ID of the VPC in which to deploy Aurora." requirement="required" type="string">
</HclListItem>

### Optional

<HclListItem name="alarms_sns_topic_arns" description="The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications. Also used for the alarms if the share snapshot backup job fails." requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_cidr_blocks" description="The list of network CIDR blocks to allow network access to Aurora from. One of <a href=#allow_connections_from_cidr_blocks><code>allow_connections_from_cidr_blocks</code></a> or <a href=#allow_connections_from_security_groups><code>allow_connections_from_security_groups</code></a> must be specified for the database to be reachable." requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_security_groups" description="The list of IDs or Security Groups to allow network access to Aurora from. All security groups must either be in the VPC specified by <a href=#vpc_id><code>vpc_id</code></a>, or a peered VPC with the VPC specified by <a href=#vpc_id><code>vpc_id</code></a>. One of <a href=#allow_connections_from_cidr_blocks><code>allow_connections_from_cidr_blocks</code></a> or <a href=#allow_connections_from_security_groups><code>allow_connections_from_security_groups</code></a> must be specified for the database to be reachable." requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_major_version_upgrade" description="Enable to allow major engine version upgrades when changing engine versions." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="apply_immediately" description="Specifies whether any cluster modifications are applied immediately, or during the next maintenance window. Note that cluster modifications may cause degraded performance or downtime." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="backup_job_alarm_period" description="How often, in seconds, the backup job is expected to run. This is the same as <a href=#schedule_expression><code>schedule_expression</code></a>, but unfortunately, Terraform offers no way to convert rate expressions to seconds. We add a CloudWatch alarm that triggers if the metric in <a href=#create_snapshot_cloudwatch_metric_namespace><code>create_snapshot_cloudwatch_metric_namespace</code></a> isn't updated within this time period, as that indicates the backup failed to run." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="3600"/>
</HclListItem>

<HclListItem name="backup_retention_period" description="How many days to keep backup snapshots around before cleaning them up. Max: 35" requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="copy_tags_to_snapshot" description="Copy all the Aurora cluster tags to snapshots. Default is false." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="create_snapshot_cloudwatch_metric_namespace" description="The namespace to use for the CloudWatch metric we report every time a new RDS snapshot is created. We add a CloudWatch alarm on this metric to notify us if the backup job fails to run for any reason. Defaults to the cluster name." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_tags" description="A map of custom tags to apply to the RDS cluster and all associated resources created for it. The key is the tag name and the value is the tag value." requirement="optional" type="map">
<HclListItemTypeDetails>

```hcl
map(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="dashboard_cpu_usage_widget_parameters" description="Parameters for the cpu usage widget to output for use in a CloudWatch dashboard." requirement="optional" type="object">
<HclListItemTypeDetails>

```hcl
object({
    # The period in seconds for metrics to sample across.
    period = number

    # The width and height of the widget in grid units in a 24 column grid. E.g., a value of 12 will take up half the
    # space.
    width  = number
    height = number
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{'height':6,'period':60,'width':8}"/>
</HclListItem>

<HclListItem name="dashboard_db_connections_widget_parameters" description="Parameters for the database connections widget to output for use in a CloudWatch dashboard." requirement="optional" type="object">
<HclListItemTypeDetails>

```hcl
object({
    # The period in seconds for metrics to sample across.
    period = number

    # The width and height of the widget in grid units in a 24 column grid. E.g., a value of 12 will take up half the
    # space.
    width  = number
    height = number
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{'height':6,'period':60,'width':8}"/>
</HclListItem>

<HclListItem name="dashboard_disk_space_widget_parameters" description="Parameters for the available disk space widget to output for use in a CloudWatch dashboard." requirement="optional" type="object">
<HclListItemTypeDetails>

```hcl
object({
    # The period in seconds for metrics to sample across.
    period = number

    # The width and height of the widget in grid units in a 24 column grid. E.g., a value of 12 will take up half the
    # space.
    width  = number
    height = number
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{'height':6,'period':60,'width':8}"/>
</HclListItem>

<HclListItem name="dashboard_memory_widget_parameters" description="Parameters for the available memory widget to output for use in a CloudWatch dashboard." requirement="optional" type="object">
<HclListItemTypeDetails>

```hcl
object({
    # The period in seconds for metrics to sample across.
    period = number

    # The width and height of the widget in grid units in a 24 column grid. E.g., a value of 12 will take up half the
    # space.
    width  = number
    height = number
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{'height':6,'period':60,'width':8}"/>
</HclListItem>

<HclListItem name="dashboard_read_latency_widget_parameters" description="Parameters for the read latency widget to output for use in a CloudWatch dashboard." requirement="optional" type="object">
<HclListItemTypeDetails>

```hcl
object({
    # The period in seconds for metrics to sample across.
    period = number

    # The width and height of the widget in grid units in a 24 column grid. E.g., a value of 12 will take up half the
    # space.
    width  = number
    height = number
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{'height':6,'period':60,'width':8}"/>
</HclListItem>

<HclListItem name="dashboard_write_latency_widget_parameters" description="Parameters for the read latency widget to output for use in a CloudWatch dashboard." requirement="optional" type="object">
<HclListItemTypeDetails>

```hcl
object({
    # The period in seconds for metrics to sample across.
    period = number

    # The width and height of the widget in grid units in a 24 column grid. E.g., a value of 12 will take up half the
    # space.
    width  = number
    height = number
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{'height':6,'period':60,'width':8}"/>
</HclListItem>

<HclListItem name="db_cluster_custom_parameter_group" description="Configure a custom parameter group for the RDS DB cluster. This will create a new parameter group with the given parameters. When null, the database will be launched with the default parameter group." requirement="optional" type="object">
<HclListItemTypeDetails>

```hcl
object({
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

      # When to apply the parameter. "immediate" or "pending-reboot".
      apply_method = string
    }))
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="db_config_secrets_manager_id" description="The friendly name or ARN of an AWS Secrets Manager secret that contains database configuration information in the format outlined by this document: https://docs.aws.amazon.com/secretsmanager/latest/userguide/best-practices.html. The engine, username, password, dbname, and port fields must be included in the JSON. Note that even with this precaution, this information will be stored in plaintext in the Terraform state file! See the following blog post for more details: https://blog.gruntwork.io/a-comprehensive-guide-to-managing-secrets-in-your-terraform-code-1d586955ace1. If you do not wish to use Secrets Manager, leave this as null, and use the master_username, master_password, db_name, engine, and port variables." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="db_instance_custom_parameter_group" description="Configure a custom parameter group for the RDS DB Instance. This will create a new parameter group with the given parameters. When null, the database will be launched with the default parameter group." requirement="optional" type="object">
<HclListItemTypeDetails>

```hcl
object({
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

      # When to apply the parameter. "immediate" or "pending-reboot".
      apply_method = string
    }))
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="db_name" description="The name for your database of up to 8 alpha-numeric characters. If you do not provide a name, Amazon RDS will not create a database in the DB cluster you are creating. This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id. A value here overrides the value in db_config_secrets_manager_id." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_alarms" description="Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using <a href=#alarms_sns_topic_arn><code>alarms_sns_topic_arn</code></a>." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_metrics" description="When true, enable CloudWatch metrics for the manual snapshots created for the purpose of sharing with another account." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_deletion_protection" description="Enable deletion protection on the database instance. If this is enabled, the database cannot be deleted." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_perf_alarms" description="Set to true to enable alarms related to performance, such as read and write latency alarms. Set to false to disable those alarms if you aren't sure what would be reasonable perf numbers for your RDS set up or if those numbers are too unpredictable." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_share_snapshot_cloudwatch_alarms" description="When true, enable CloudWatch alarms for the manual snapshots created for the purpose of sharing with another account. Only used if <a href=#share_snapshot_with_another_account><code>share_snapshot_with_another_account</code></a> is true." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enabled_cloudwatch_logs_exports" description="If non-empty, the Aurora cluster will export the specified logs to Cloudwatch. Must be zero or more of: audit, error, general and slowquery" requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="engine" description="The name of the database engine to be used for this DB cluster. Valid Values: aurora (for MySQL 5.6-compatible Aurora), aurora-mysql (for MySQL 5.7-compatible Aurora), and aurora-postgresql. This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id. A value here overrides the value in db_config_secrets_manager_id." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="engine_mode" description="The version of aurora to run - provisioned or serverless." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="provisioned"/>
</HclListItem>

<HclListItem name="engine_version" description="The Amazon Aurora DB engine version for the selected engine and engine_mode. Note: Starting with Aurora MySQL 2.03.2, Aurora engine versions have the following syntax <mysql-major-version>.mysql_aurora.<aurora-mysql-version>. e.g. 5.7.mysql_aurora.2.08.1." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="high_cpu_utilization_period" description="The period, in seconds, over which to measure the CPU utilization percentage." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="high_cpu_utilization_threshold" description="Trigger an alarm if the DB instance has a CPU utilization percentage above this threshold." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="90"/>
</HclListItem>

<HclListItem name="high_read_latency_period" description="The period, in seconds, over which to measure the read latency." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="high_read_latency_threshold" description="Trigger an alarm if the DB instance read latency (average amount of time taken per disk I/O operation), in seconds, is above this threshold." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="5"/>
</HclListItem>

<HclListItem name="high_write_latency_period" description="The period, in seconds, over which to measure the write latency." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="high_write_latency_threshold" description="Trigger an alarm if the DB instance write latency (average amount of time taken per disk I/O operation), in seconds, is above this threshold." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="5"/>
</HclListItem>

<HclListItem name="iam_database_authentication_enabled" description="Specifies whether mappings of AWS Identity and Access Management (IAM) accounts to database accounts is enabled. Disabled by default." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="instance_count" description="The number of DB instances, including the primary, to run in the RDS cluster. Only used when <a href=#engine_mode><code>engine_mode</code></a> is set to provisioned." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="instance_type" description="The instance type to use for the db (e.g. db.r3.large). Only used when <a href=#engine_mode><code>engine_mode</code></a> is set to provisioned." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="db.t3.small"/>
</HclListItem>

<HclListItem name="kms_key_arn" description="The ARN of a KMS key that should be used to encrypt data on disk. Only used if <a href=#storage_encrypted><code>storage_encrypted</code></a> is true. If you leave this null, the default RDS KMS key for the account will be used." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="low_disk_space_available_period" description="The period, in seconds, over which to measure the available free disk space." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="low_disk_space_available_threshold" description="Trigger an alarm if the amount of disk space, in Bytes, on the DB instance drops below this threshold." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="1000000000"/>
</HclListItem>

<HclListItem name="low_memory_available_period" description="The period, in seconds, over which to measure the available free memory." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="low_memory_available_threshold" description="Trigger an alarm if the amount of free memory, in Bytes, on the DB instance drops below this threshold." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="100000000"/>
</HclListItem>

<HclListItem name="master_password" description="The value to use for the master password of the database. This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id. A value here overrides the value in db_config_secrets_manager_id." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="master_username" description="The value to use for the master username of the database. This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id. A value here overrides the value in db_config_secrets_manager_id." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="port" description="The port the DB will listen on (e.g. 3306). This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id. A value here overrides the value in db_config_secrets_manager_id." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="publicly_accessible" description="If you wish to make your database accessible from the public Internet, set this flag to true (WARNING: NOT RECOMMENDED FOR REGULAR USAGE!!). The default is false, which means the database is only accessible from within the VPC, which is much more secure. This flag MUST be false for serverless mode." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="restore_source_cluster_identifier" description="If non-empty, the Aurora cluster will be restored from the given source cluster using the latest restorable time. Can only be used if snapshot_identifier is null. For more information see https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_PIT.html" requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="restore_type" description="Only used if 'restore_source_cluster_identifier' is non-empty. Type of restore to be performed. Valid options are 'full-copy' and 'copy-on-write'. https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Clone.html" requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="scaling_configuration_auto_pause" description="Whether to enable automatic pause. A DB cluster can be paused only when it's idle (it has no connections). If a DB cluster is paused for more than seven days, the DB cluster might be backed up with a snapshot. In this case, the DB cluster is restored when there is a request to connect to it. Only used when <a href=#engine_mode><code>engine_mode</code></a> is set to serverless." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="scaling_configuration_max_capacity" description="The maximum capacity. The maximum capacity must be greater than or equal to the minimum capacity. Valid capacity values are 2, 4, 8, 16, 32, 64, 128, and 256. Only used when <a href=#engine_mode><code>engine_mode</code></a> is set to serverless." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="256"/>
</HclListItem>

<HclListItem name="scaling_configuration_min_capacity" description="The minimum capacity. The minimum capacity must be lesser than or equal to the maximum capacity. Valid capacity values are 2, 4, 8, 16, 32, 64, 128, and 256. Only used when <a href=#engine_mode><code>engine_mode</code></a> is set to serverless." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="2"/>
</HclListItem>

<HclListItem name="scaling_configuration_seconds_until_auto_pause" description="The time, in seconds, before an Aurora DB cluster in serverless mode is paused. Valid values are 300 through 86400. Only used when <a href=#engine_mode><code>engine_mode</code></a> is set to serverless." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="share_snapshot_max_snapshots" description="The maximum number of snapshots to keep around for the purpose of cross account sharing. Once this number is exceeded, a lambda function will delete the oldest snapshots. Only used if <a href=#share_snapshot_with_another_account><code>share_snapshot_with_another_account</code></a> is true." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="share_snapshot_schedule_expression" description="An expression that defines how often to run the lambda function to take snapshots for the purpose of cross account sharing. For example, cron(0 20 * * ? *) or rate(5 minutes). Required if <a href=#share_snapshot_with_another_account><code>share_snapshot_with_another_account</code></a> is true" requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="share_snapshot_with_account_id" description="The ID of the AWS Account that the snapshot should be shared with. Required if <a href=#share_snapshot_with_another_account><code>share_snapshot_with_another_account</code></a> is true." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="share_snapshot_with_another_account" description="If set to true, take periodic snapshots of the Aurora DB that should be shared with another account." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="skip_final_snapshot" description="Determines whether a final DB snapshot is created before the DB instance is deleted. Be very careful setting this to true; if you do, and you delete this DB instance, you will not have any backups of the data! You almost never want to set this to true, unless you are doing automated or manual testing." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="snapshot_identifier" description="If non-null, the RDS Instance will be restored from the given Snapshot ID. This is the Snapshot ID you'd find in the RDS console, e.g: rds:production-2015-06-26-06-05." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="storage_encrypted" description="Specifies whether the DB cluster uses encryption for data at rest in the underlying storage for the DB, its automated backups, Read Replicas, and snapshots. Uses the default aws/rds key in KMS." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="too_many_db_connections_threshold" description="Trigger an alarm if the number of connections to the DB instance goes above this threshold." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<br/>

<HclListItem name="all_metric_widgets" description="A list of all the CloudWatch Dashboard metric widgets available in this module.">
</HclListItem>

<HclListItem name="cleanup_snapshots_lambda_arn" description="The ARN of the AWS Lambda Function used for cleaning up manual snapshots taken for sharing with secondary accounts.">
</HclListItem>

<HclListItem name="cluster_arn" description="The ARN of the RDS Aurora cluster.">
</HclListItem>

<HclListItem name="cluster_id" description="The ID of the RDS Aurora cluster (e.g TODO).">
</HclListItem>

<HclListItem name="cluster_resource_id" description="The unique resource ID assigned to the cluster e.g. cluster-POBCBQUFQC56EBAAWXGFJ77GRU. This is useful for allowing database authentication via IAM.">
</HclListItem>

<HclListItem name="create_snapshot_lambda_arn" description="The ARN of the AWS Lambda Function used for periodically taking snapshots to share with secondary accounts.">
</HclListItem>

<HclListItem name="instance_endpoints" description="A list of endpoints of the RDS instances that you can use to make requests to.">
</HclListItem>

<HclListItem name="metric_widget_aurora_cpu_usage" description="A CloudWatch Dashboard widget that graphs CPU usage (percentage) of the Aurora cluster.">
</HclListItem>

<HclListItem name="metric_widget_aurora_db_connections" description="A CloudWatch Dashboard widget that graphs the number of active database connections of the Aurora cluster.">
</HclListItem>

<HclListItem name="metric_widget_aurora_disk_space" description="A CloudWatch Dashboard widget that graphs available disk space (in bytes) on the Aurora cluster.">
</HclListItem>

<HclListItem name="metric_widget_aurora_memory" description="A CloudWatch Dashboard widget that graphs available memory (in bytes) on the Aurora cluster.">
</HclListItem>

<HclListItem name="metric_widget_aurora_read_latency" description="A CloudWatch Dashboard widget that graphs the average amount of time taken per disk I/O operation on reads.">
</HclListItem>

<HclListItem name="metric_widget_aurora_write_latency" description="A CloudWatch Dashboard widget that graphs the average amount of time taken per disk I/O operation on writes.">
</HclListItem>

<HclListItem name="port" description="The port used by the RDS Aurora cluster for handling database connections.">
</HclListItem>

<HclListItem name="primary_endpoint" description="The primary endpoint of the RDS Aurora cluster that you can use to make requests to.">
</HclListItem>

<HclListItem name="primary_host" description="The host portion of the Aurora endpoint. primary_endpoint is in the form '<host>:<port>', and this output returns just the host part.">
</HclListItem>

<HclListItem name="reader_endpoint" description="A read-only endpoint for the Aurora cluster, automatically load-balanced across replicas.">
</HclListItem>

<HclListItem name="share_snapshot_lambda_arn" description="The ARN of the AWS Lambda Function used for sharing manual snapshots with secondary accounts.">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"0d55b49c6dff3f74a92cc1e24b7ee1da"}
##DOCS-SOURCER-END -->
