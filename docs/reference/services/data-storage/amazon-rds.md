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
import { HclListItem, HclListItemTypeDetails, HclListItemDefaultValue } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.85.0" lastModifiedVersion="0.85.0"/>

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

<br/>

### Required

<HclListItem name="allocated_storage" description="The amount of storage space the DB should use, in GB." requirement="required" type="number">
</HclListItem>

<HclListItem name="engine_version" description="The version of var.engine to use (e.g. 8.0.17 for mysql)." requirement="required" type="string">
</HclListItem>

<HclListItem name="name" description="The name used to namespace all the RDS resources created by these templates, including the cluster and cluster instances (e.g. mysql-stage). Must be unique in this region. Must be a lowercase string." requirement="required" type="string">
</HclListItem>

<HclListItem name="subnet_ids" description="The list of IDs of the subnets in which to deploy RDS. The list must only contain subnets in <a href=#vpc_id><code>vpc_id</code></a>." requirement="required" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
</HclListItem>

<HclListItem name="vpc_id" description="The ID of the VPC in which to deploy RDS." requirement="required" type="string">
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

<HclListItem name="allow_connections_from_cidr_blocks" description="The list of network CIDR blocks to allow network access to RDS from. One of <a href=#allow_connections_from_cidr_blocks><code>allow_connections_from_cidr_blocks</code></a> or <a href=#allow_connections_from_security_groups><code>allow_connections_from_security_groups</code></a> must be specified for the database to be reachable." requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_security_groups" description="The list of IDs or Security Groups to allow network access to RDS from. All security groups must either be in the VPC specified by <a href=#vpc_id><code>vpc_id</code></a>, or a peered VPC with the VPC specified by <a href=#vpc_id><code>vpc_id</code></a>. One of <a href=#allow_connections_from_cidr_blocks><code>allow_connections_from_cidr_blocks</code></a> or <a href=#allow_connections_from_security_groups><code>allow_connections_from_security_groups</code></a> must be specified for the database to be reachable." requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_manage_key_permissions_with_iam" description="If true, both the CMK's Key Policy and IAM Policies (permissions) can be used to grant permissions on the CMK. If false, only the CMK's Key Policy can be used to grant permissions on the CMK. False is more secure (and generally preferred), but true is more flexible and convenient." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="apply_immediately" description="Specifies whether any cluster modifications are applied immediately, or during the next maintenance window. Note that cluster modifications may cause degraded performance or downtime." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="backup_job_alarm_period" description="How often, in seconds, the backup job is expected to run. This is the same as <a href=#schedule_expression><code>schedule_expression</code></a>, but unfortunately, Terraform offers no way to convert rate expressions to seconds. We add a CloudWatch alarm that triggers if the metric in <a href=#create_snapshot_cloudwatch_metric_namespace><code>create_snapshot_cloudwatch_metric_namespace</code></a> isn't updated within this time period, as that indicates the backup failed to run." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="3600"/>
</HclListItem>

<HclListItem name="backup_retention_period" description="How many days to keep backup snapshots around before cleaning them up. Must be 1 or greater to support read replicas." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="backup_window" description="The daily time range during which automated backups are created (e.g. 04:00-09:00). Time zone is UTC. Performance may be degraded while a backup runs." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="06:00-07:00"/>
</HclListItem>

<HclListItem name="cmk_administrator_iam_arns" description="A list of IAM ARNs for users who should be given administrator access to this CMK (e.g. arn:aws:iam::<aws-account-id>:user/<iam-user-arn>). If this list is empty, and <a href=#kms_key_arn><code>kms_key_arn</code></a> is null, the ARN of the current user will be used." requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cmk_external_user_iam_arns" description="A list of IAM ARNs for users from external AWS accounts who should be given permissions to use this CMK (e.g. arn:aws:iam::<aws-account-id>:root)." requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cmk_user_iam_arns" description="A list of IAM ARNs for users who should be given permissions to use this CMK (e.g.  arn:aws:iam::<aws-account-id>:user/<iam-user-arn>). If this list is empty, and <a href=#kms_key_arn><code>kms_key_arn</code></a> is null, the ARN of the current user will be used." requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(object({
    name = list(string)
    conditions = list(object({
      test     = string
      variable = string
      values   = list(string)
    }))
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="create_custom_kms_key" description="If set to true, create a KMS CMK and use it to encrypt data on disk in the database. The permissions for this CMK will be assigned by the following variables: cmk_administrator_iam_arns, cmk_user_iam_arns, cmk_external_user_iam_arns, allow_manage_key_permissions." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="create_snapshot_cloudwatch_metric_namespace" description="The namespace to use for the CloudWatch metric we report every time a new RDS snapshot is created. We add a CloudWatch alarm on this metric to notify us if the backup job fails to run for any reason. Defaults to the cluster name." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_parameter_group" description="Configure a custom parameter group for the RDS DB. This will create a new parameter group with the given parameters. When null, the database will be launched with the default parameter group." requirement="optional" type="object">
<HclListItemTypeDetails>

```hcl
object({
    # Name of the parameter group to create
    name = string

    # The family of the DB parameter group.
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

<HclListItem name="custom_tags" description="A map of custom tags to apply to the RDS Instance and the Security Group created for it. The key is the tag name and the value is the tag value." requirement="optional" type="map">
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
<HclListItemDefaultValue>

```hcl
{
  height = 6,
  period = 60,
  width = 8
}
```

</HclListItemDefaultValue>
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
<HclListItemDefaultValue>

```hcl
{
  height = 6,
  period = 60,
  width = 8
}
```

</HclListItemDefaultValue>
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
<HclListItemDefaultValue>

```hcl
{
  height = 6,
  period = 60,
  width = 8
}
```

</HclListItemDefaultValue>
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
<HclListItemDefaultValue>

```hcl
{
  height = 6,
  period = 60,
  width = 8
}
```

</HclListItemDefaultValue>
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
<HclListItemDefaultValue>

```hcl
{
  height = 6,
  period = 60,
  width = 8
}
```

</HclListItemDefaultValue>
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
<HclListItemDefaultValue>

```hcl
{
  height = 6,
  period = 60,
  width = 8
}
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="db_config_secrets_manager_id" description="The friendly name or ARN of an AWS Secrets Manager secret that contains database configuration information in the format outlined by this document: https://docs.aws.amazon.com/secretsmanager/latest/userguide/best-practices.html. The engine, username, password, dbname, and port fields must be included in the JSON. Note that even with this precaution, this information will be stored in plaintext in the Terraform state file! See the following blog post for more details: https://blog.gruntwork.io/a-comprehensive-guide-to-managing-secrets-in-your-terraform-code-1d586955ace1. If you do not wish to use Secrets Manager, leave this as null, and use the master_username, master_password, db_name, engine, and port variables." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="db_name" description="The name for your database of up to 8 alpha-numeric characters. If you do not provide a name, Amazon RDS will not create an empty database on the RDS instance. This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="delete_automated_backups" description="Specifies whether to remove automated backups immediately after the DB instance is deleted" requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_alarms" description="Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using <a href=#alarms_sns_topic_arn><code>alarms_sns_topic_arn</code></a>." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_metrics" description="When true, enable CloudWatch metrics for the manual snapshots created for the purpose of sharing with another account." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_deletion_protection" description="Enable deletion protection on the RDS instance. If this is enabled, the database cannot be deleted prior to disabling" requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_perf_alarms" description="Set to true to enable alarms related to performance, such as read and write latency alarms. Set to false to disable those alarms if you aren't sure what would be reasonable perf numbers for your RDS set up or if those numbers are too unpredictable." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_share_snapshot_cloudwatch_alarms" description="When true, enable CloudWatch alarms for the manual snapshots created for the purpose of sharing with another account. Only used if <a href=#share_snapshot_with_another_account><code>share_snapshot_with_another_account</code></a> is true." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enabled_cloudwatch_logs_exports" description="List of log types to enable for exporting to CloudWatch logs. If omitted, no logs will be exported. Valid values (depending on engine): alert, audit, error, general, listener, slowquery, trace, postgresql (PostgreSQL) and upgrade (PostgreSQL)." requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="engine" description="The DB engine to use (e.g. mysql). This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id." requirement="optional" type="string">
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

<HclListItem name="instance_type" description="The instance type to use for the db (e.g. db.t3.micro)" requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="db.t3.micro"/>
</HclListItem>

<HclListItem name="kms_key_arn" description="The Amazon Resource Name (ARN) of an existing KMS customer master key (CMK) that will be used to encrypt/decrypt backup files. If you leave this blank, the default RDS KMS key for the account will be used. If you set <a href=#create_custom_kms_key><code>create_custom_kms_key</code></a> to true, this value will be ignored and a custom key will be created and used instead." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="license_model" description="The license model to use for this DB. Check the docs for your RDS DB for available license models. Set to an empty string to use the default." requirement="optional" type="string">
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

<HclListItem name="master_password" description="The value to use for the master password of the database. This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="master_username" description="The value to use for the master username of the database. This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="max_allocated_storage" description="When configured, the upper limit to which Amazon RDS can automatically scale the storage of the DB instance. Configuring this will automatically ignore differences to allocated_storage. Must be greater than or equal to allocated_storage or 0 to disable Storage Autoscaling." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="multi_az" description="Specifies if a standby instance should be deployed in another availability zone. If the primary fails, this instance will automatically take over." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="num_read_replicas" description="The number of read replicas to deploy" requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="performance_insights_enabled" description="Specifies whether Performance Insights are enabled. Performance Insights can be enabled for specific versions of database engines. See https://aws.amazon.com/rds/performance-insights/ for more details." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="port" description="The port the DB will listen on (e.g. 3306). Alternatively, this can be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="publicly_accessible" description="If you wish to make your database accessible from the public Internet, set this flag to true (WARNING: NOT RECOMMENDED FOR REGULAR USAGE!!). The default is false, which means the database is only accessible from within the VPC, which is much more secure. This flag MUST be false for serverless mode." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="replica_backup_retention_period" description="How many days to keep backup snapshots around before cleaning them up on the read replicas. Must be 1 or greater to support read replicas. 0 means disable automated backups." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="0"/>
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

<HclListItem name="share_snapshot_with_another_account" description="If set to true, take periodic snapshots of the RDS DB that should be shared with another account." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="skip_final_snapshot" description="Determines whether a final DB snapshot is created before the DB instance is deleted. Be very careful setting this to true; if you do, and you delete this DB instance, you will not have any backups of the data! You almost never want to set this to true, unless you are doing automated or manual testing." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="snapshot_identifier" description="If non-null, the RDS Instance will be restored from the given Snapshot ID. This is the Snapshot ID you'd find in the RDS console, e.g: rds:production-2015-06-26-06-05." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="storage_encrypted" description="Specifies whether the DB instance is encrypted." requirement="optional" type="bool">
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

<HclListItem name="db_name" description="The name of the empty database created on this RDS DB instance.">
</HclListItem>

<HclListItem name="metric_widget_rds_cpu_usage" description="A CloudWatch Dashboard widget that graphs CPU usage (percentage) on the RDS DB instance.">
</HclListItem>

<HclListItem name="metric_widget_rds_db_connections" description="A CloudWatch Dashboard widget that graphs the number of active database connections on the RDS DB Instance.">
</HclListItem>

<HclListItem name="metric_widget_rds_disk_space" description="A CloudWatch Dashboard widget that graphs available disk space (in bytes) on the RDS DB instance.">
</HclListItem>

<HclListItem name="metric_widget_rds_memory" description="A CloudWatch Dashboard widget that graphs available memory (in bytes) on the RDS DB instance.">
</HclListItem>

<HclListItem name="metric_widget_rds_read_latency" description="A CloudWatch Dashboard widget that graphs the average amount of time taken per disk I/O operation on reads.">
</HclListItem>

<HclListItem name="metric_widget_rds_write_latency" description="A CloudWatch Dashboard widget that graphs the average amount of time taken per disk I/O operation on writes.">
</HclListItem>

<HclListItem name="name" description="The name of the RDS DB instance.">
</HclListItem>

<HclListItem name="num_read_replicas" description="The number of read replicas for the RDS DB instance.">
</HclListItem>

<HclListItem name="port" description="The port of the RDS DB instance.">
</HclListItem>

<HclListItem name="primary_arn" description="The ARN of the RDS DB instance.">
</HclListItem>

<HclListItem name="primary_endpoint" description="The endpoint of the RDS DB instance that you can make requests to.">
</HclListItem>

<HclListItem name="primary_host" description="The host portion of the RDS DB instance endpoint. primary_endpoint is in the form '<host>:<port>', and this output returns just the host part.">
</HclListItem>

<HclListItem name="primary_id" description="The ID of the RDS DB instance.">
</HclListItem>

<HclListItem name="read_replica_arns" description="A list of ARNs of the RDS DB instance's read replicas.">
</HclListItem>

<HclListItem name="read_replica_endpoints" description="A list of endpoints of the RDS DB instance's read replicas.">
</HclListItem>

<HclListItem name="read_replica_ids" description="A list of IDs of the RDS DB instance's read replicas.">
</HclListItem>

<HclListItem name="security_group_id" description="The ID of the Security Group that controls access to the RDS DB instance.">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"2d44d5c84db496fba0b60a4e2c359f3a"}
##DOCS-SOURCER-END -->
