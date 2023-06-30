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
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.104.14" lastModifiedVersion="0.102.14"/>

# Amazon Aurora

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/data-stores/aurora" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=data-stores%2Faurora" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>

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
*   Support Aurora Serverless v2

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

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/),
    and it shows you how we build an end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.


## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S AURORA MODULE
#
# NOTE: This module uses some sensitive variables marked inline with "# SENSITIVE".
# When using values other than defaults for these variables, set them through environment variables or
# another secure method.
#
# ------------------------------------------------------------------------------------------------------

module "aurora" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/aurora?ref=v0.104.14"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The list of IDs of the subnets in which to deploy Aurora. The list must only
  # contain subnets in var.vpc_id.
  aurora_subnet_ids = <list(string)>

  # The name used to namespace all the Aurora resources created by these
  # templates, including the cluster and cluster instances (e.g. drupaldb). Must
  # be unique in this region. Must be a lowercase string.
  name = <string>

  # The ID of the VPC in which to deploy Aurora.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and
  # disk space usage) should send notifications. Also used for the alarms if the
  # share snapshot backup job fails.
  alarms_sns_topic_arns = []

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

  # Enable to allow major engine version upgrades when changing engine versions.
  allow_major_version_upgrade = false

  # Specifies whether any cluster modifications are applied immediately, or
  # during the next maintenance window. Note that cluster modifications may
  # cause degraded performance or downtime.
  apply_immediately = false

  # Configure the auto minor version upgrade behavior. This is applied to the
  # cluster instances and indicates if the automatic minor version upgrade of
  # the engine is allowed. Default value is true.
  auto_minor_version_upgrade = true

  # How often, in seconds, the backup job is expected to run. This is the same
  # as var.schedule_expression, but unfortunately, Terraform offers no way to
  # convert rate expressions to seconds. We add a CloudWatch alarm that triggers
  # if the metric in var.create_snapshot_cloudwatch_metric_namespace isn't
  # updated within this time period, as that indicates the backup failed to run.
  backup_job_alarm_period = 3600

  # Sets how the backup job alarm should handle entering the INSUFFICIENT_DATA
  # state. Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  backup_job_alarm_treat_missing_data = "missing"

  # How many days to keep backup snapshots around before cleaning them up. Max:
  # 35
  backup_retention_period = 30

  # Copy all the Aurora cluster tags to snapshots. Default is false.
  copy_tags_to_snapshot = false

  # Set to true if you want a DNS record automatically created and pointed at
  # the RDS endpoints.
  create_route53_entry = false

  # The namespace to use for the CloudWatch metric we report every time a new
  # RDS snapshot is created. We add a CloudWatch alarm on this metric to notify
  # us if the backup job fails to run for any reason. Defaults to the cluster
  # name.
  create_snapshot_cloudwatch_metric_namespace = null

  # A map of custom tags to apply to the RDS cluster and all associated
  # resources created for it. The key is the tag name and the value is the tag
  # value.
  custom_tags = {}

  # Parameters for the cpu usage widget to output for use in a CloudWatch
  # dashboard.
  dashboard_cpu_usage_widget_parameters = {"height":6,"period":60,"width":8}

  # Parameters for the database connections widget to output for use in a
  # CloudWatch dashboard.
  dashboard_db_connections_widget_parameters = {"height":6,"period":60,"width":8}

  # Parameters for the available disk space widget to output for use in a
  # CloudWatch dashboard.
  dashboard_disk_space_widget_parameters = {"height":6,"period":60,"width":8}

  # Parameters for the available memory widget to output for use in a CloudWatch
  # dashboard.
  dashboard_memory_widget_parameters = {"height":6,"period":60,"width":8}

  # Parameters for the read latency widget to output for use in a CloudWatch
  # dashboard.
  dashboard_read_latency_widget_parameters = {"height":6,"period":60,"width":8}

  # Parameters for the read latency widget to output for use in a CloudWatch
  # dashboard.
  dashboard_write_latency_widget_parameters = {"height":6,"period":60,"width":8}

  # Configure a custom parameter group for the RDS DB cluster. This will create
  # a new parameter group with the given parameters. When null, the database
  # will be launched with the default parameter group.
  db_cluster_custom_parameter_group = null

  # The friendly name or ARN of an AWS Secrets Manager secret that contains
  # database configuration information in the format outlined by this document:
  # https://docs.aws.amazon.com/secretsmanager/latest/userguide/best-practices.html.
  # The engine, username, password, dbname, and port fields must be included in
  # the JSON. Note that even with this precaution, this information will be
  # stored in plaintext in the Terraform state file! See the following blog post
  # for more details:
  # https://blog.gruntwork.io/a-comprehensive-guide-to-managing-secrets-in-your-terraform-code-1d586955ace1.
  # If you do not wish to use Secrets Manager, leave this as null, and use the
  # master_username, master_password, db_name, engine, and port variables.
  db_config_secrets_manager_id = null

  # Configure a custom parameter group for the RDS DB Instance. This will create
  # a new parameter group with the given parameters. When null, the database
  # will be launched with the default parameter group.
  db_instance_custom_parameter_group = null

  # The name for your database of up to 8 alpha-numeric characters. If you do
  # not provide a name, Amazon RDS will not create a database in the DB cluster
  # you are creating. This can also be provided via AWS Secrets Manager. See the
  # description of db_config_secrets_manager_id. A value here overrides the
  # value in db_config_secrets_manager_id.
  db_name = null

  # Set to true to enable several basic CloudWatch alarms around CPU usage,
  # memory usage, and disk space usage. If set to true, make sure to specify SNS
  # topics to send notifications to using var.alarms_sns_topic_arn.
  enable_cloudwatch_alarms = true

  # When true, enable CloudWatch metrics for the manual snapshots created for
  # the purpose of sharing with another account.
  enable_cloudwatch_metrics = true

  # Enable deletion protection on the database instance. If this is enabled, the
  # database cannot be deleted.
  enable_deletion_protection = false

  # Set to true to enable alarms related to performance, such as read and write
  # latency alarms. Set to false to disable those alarms if you aren't sure what
  # would be reasonable perf numbers for your RDS set up or if those numbers are
  # too unpredictable.
  enable_perf_alarms = true

  # When true, enable CloudWatch alarms for the manual snapshots created for the
  # purpose of sharing with another account. Only used if
  # var.share_snapshot_with_another_account is true.
  enable_share_snapshot_cloudwatch_alarms = true

  # If non-empty, the Aurora cluster will export the specified logs to
  # Cloudwatch. Must be zero or more of: audit, error, general and slowquery
  enabled_cloudwatch_logs_exports = []

  # The name of the database engine to be used for this DB cluster. Valid
  # Values: aurora (for MySQL 5.6-compatible Aurora), aurora-mysql (for MySQL
  # 5.7-compatible Aurora), and aurora-postgresql. This can also be provided via
  # AWS Secrets Manager. See the description of db_config_secrets_manager_id. A
  # value here overrides the value in db_config_secrets_manager_id.
  engine = null

  # The version of aurora to run - provisioned or serverless.
  engine_mode = "provisioned"

  # The Amazon Aurora DB engine version for the selected engine and engine_mode.
  # Note: Starting with Aurora MySQL 2.03.2, Aurora engine versions have the
  # following syntax <mysql-major-version>.mysql_aurora.<aurora-mysql-version>.
  # e.g. 5.7.mysql_aurora.2.08.1.
  engine_version = null

  # The period, in seconds, over which to measure the CPU utilization
  # percentage.
  high_cpu_utilization_period = 60

  # Trigger an alarm if the DB instance has a CPU utilization percentage above
  # this threshold.
  high_cpu_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_cpu_utilization_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the read latency.
  high_read_latency_period = 60

  # Trigger an alarm if the DB instance read latency (average amount of time
  # taken per disk I/O operation), in seconds, is above this threshold.
  high_read_latency_threshold = 5

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_read_latency_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the write latency.
  high_write_latency_period = 60

  # Trigger an alarm if the DB instance write latency (average amount of time
  # taken per disk I/O operation), in seconds, is above this threshold.
  high_write_latency_threshold = 5

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_write_latency_treat_missing_data = "missing"

  # The ID of the hosted zone in which to write DNS records
  hosted_zone_id = null

  # Specifies whether mappings of AWS Identity and Access Management (IAM)
  # accounts to database accounts is enabled. Disabled by default.
  iam_database_authentication_enabled = false

  # The number of DB instances, including the primary, to run in the RDS
  # cluster. Only used when var.engine_mode is set to provisioned.
  instance_count = 1

  # The instance type to use for the db (e.g. db.r3.large). Only used when
  # var.engine_mode is set to provisioned.
  instance_type = "db.t3.small"

  # The ARN of a KMS key that should be used to encrypt data on disk. Only used
  # if var.storage_encrypted is true. If you leave this null, the default RDS
  # KMS key for the account will be used.
  kms_key_arn = null

  # The period, in seconds, over which to measure the available free disk space.
  low_disk_space_available_period = 60

  # Trigger an alarm if the amount of disk space, in Bytes, on the DB instance
  # drops below this threshold.
  low_disk_space_available_threshold = 1000000000

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  low_disk_space_available_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the available free memory.
  low_memory_available_period = 60

  # Trigger an alarm if the amount of free memory, in Bytes, on the DB instance
  # drops below this threshold.
  low_memory_available_threshold = 100000000

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  low_memory_available_treat_missing_data = "missing"

  # The value to use for the master password of the database. This can also be
  # provided via AWS Secrets Manager. See the description of
  # db_config_secrets_manager_id. A value here overrides the value in
  # db_config_secrets_manager_id.
  master_password = null # SENSITIVE

  # The value to use for the master username of the database. This can also be
  # provided via AWS Secrets Manager. See the description of
  # db_config_secrets_manager_id. A value here overrides the value in
  # db_config_secrets_manager_id.
  master_username = null

  # Specifies whether Performance Insights is enabled or not. On Aurora MySQL,
  # Performance Insights is not supported on db.t2 or db.t3 DB instance classes.
  performance_insights_enabled = false

  # The ARN for the KMS key to encrypt Performance Insights data.
  performance_insights_kms_key_id = null

  # The port the DB will listen on (e.g. 3306). This can also be provided via
  # AWS Secrets Manager. See the description of db_config_secrets_manager_id. A
  # value here overrides the value in db_config_secrets_manager_id.
  port = null

  # The daily time range during which automated backups are created (e.g.
  # 04:00-09:00). Time zone is UTC. Performance may be degraded while a backup
  # runs.
  preferred_backup_window = "06:00-07:00"

  # The weekly day and time range during which cluster maintenance can occur
  # (e.g. wed:04:00-wed:04:30). Time zone is UTC. Performance may be degraded or
  # there may even be a downtime during maintenance windows.
  preferred_maintenance_window = "sun:07:00-sun:08:00"

  # The domain name to create a route 53 record for the primary endpoint of the
  # RDS database.
  primary_domain_name = null

  # If you wish to make your database accessible from the public Internet, set
  # this flag to true (WARNING: NOT RECOMMENDED FOR REGULAR USAGE!!). The
  # default is false, which means the database is only accessible from within
  # the VPC, which is much more secure. This flag MUST be false for serverless
  # mode.
  publicly_accessible = false

  # The domain name to create a route 53 record for the reader endpoint of the
  # RDS database. Note that Aurora Serverless does not have reader endpoints, so
  # this option is ignored when engine_mode is set to serverless. 
  reader_domain_name = null

  # If non-empty, the Aurora cluster will be restored from the given source
  # cluster using the latest restorable time. Can only be used if
  # snapshot_identifier is null. For more information see
  # https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_PIT.html
  restore_source_cluster_identifier = null

  # Only used if 'restore_source_cluster_identifier' is non-empty. Type of
  # restore to be performed. Valid options are 'full-copy' and 'copy-on-write'.
  # https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Clone.html
  restore_type = null

  # Whether to enable automatic pause. A DB cluster can be paused only when it's
  # idle (it has no connections). If a DB cluster is paused for more than seven
  # days, the DB cluster might be backed up with a snapshot. In this case, the
  # DB cluster is restored when there is a request to connect to it. Only used
  # when var.engine_mode is set to serverless.
  scaling_configuration_auto_pause = true

  # The maximum capacity. The maximum capacity must be greater than or equal to
  # the minimum capacity. Valid capacity values are 2, 4, 8, 16, 32, 64, 128,
  # and 256. Only used when var.engine_mode is set to serverless.
  scaling_configuration_max_capacity = 256

  scaling_configuration_max_capacity_V2 = null

  # The minimum capacity. The minimum capacity must be lesser than or equal to
  # the maximum capacity. Valid capacity values are 2, 4, 8, 16, 32, 64, 128,
  # and 256. Only used when var.engine_mode is set to serverless.
  scaling_configuration_min_capacity = 2

  scaling_configuration_min_capacity_V2 = null

  # The time, in seconds, before an Aurora DB cluster in serverless mode is
  # paused. Valid values are 300 through 86400. Only used when var.engine_mode
  # is set to serverless.
  scaling_configuration_seconds_until_auto_pause = 300

  # The maximum number of snapshots to keep around for the purpose of cross
  # account sharing. Once this number is exceeded, a lambda function will delete
  # the oldest snapshots. Only used if var.share_snapshot_with_another_account
  # is true.
  share_snapshot_max_snapshots = 30

  # An expression that defines how often to run the lambda function to take
  # snapshots for the purpose of cross account sharing. For example, cron(0 20 *
  # * ? *) or rate(5 minutes). Required if
  # var.share_snapshot_with_another_account is true
  share_snapshot_schedule_expression = null

  # The ID of the AWS Account that the snapshot should be shared with. Required
  # if var.share_snapshot_with_another_account is true.
  share_snapshot_with_account_id = null

  # If set to true, take periodic snapshots of the Aurora DB that should be
  # shared with another account.
  share_snapshot_with_another_account = false

  # Determines whether a final DB snapshot is created before the DB instance is
  # deleted. Be very careful setting this to true; if you do, and you delete
  # this DB instance, you will not have any backups of the data! You almost
  # never want to set this to true, unless you are doing automated or manual
  # testing.
  skip_final_snapshot = false

  # If non-null, the RDS Instance will be restored from the given Snapshot ID.
  # This is the Snapshot ID you'd find in the RDS console, e.g:
  # rds:production-2015-06-26-06-05.
  snapshot_identifier = null

  # Specifies whether the DB cluster uses encryption for data at rest in the
  # underlying storage for the DB, its automated backups, Read Replicas, and
  # snapshots. Uses the default aws/rds key in KMS.
  storage_encrypted = true

  # Trigger an alarm if the number of connections to the DB instance goes above
  # this threshold.
  too_many_db_connections_threshold = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S AURORA MODULE
#
# NOTE: This module uses some sensitive variables marked inline with "# SENSITIVE".
# When using values other than defaults for these variables, set them through environment variables or
# another secure method.
#
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/aurora?ref=v0.104.14"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The list of IDs of the subnets in which to deploy Aurora. The list must only
  # contain subnets in var.vpc_id.
  aurora_subnet_ids = <list(string)>

  # The name used to namespace all the Aurora resources created by these
  # templates, including the cluster and cluster instances (e.g. drupaldb). Must
  # be unique in this region. Must be a lowercase string.
  name = <string>

  # The ID of the VPC in which to deploy Aurora.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and
  # disk space usage) should send notifications. Also used for the alarms if the
  # share snapshot backup job fails.
  alarms_sns_topic_arns = []

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

  # Enable to allow major engine version upgrades when changing engine versions.
  allow_major_version_upgrade = false

  # Specifies whether any cluster modifications are applied immediately, or
  # during the next maintenance window. Note that cluster modifications may
  # cause degraded performance or downtime.
  apply_immediately = false

  # Configure the auto minor version upgrade behavior. This is applied to the
  # cluster instances and indicates if the automatic minor version upgrade of
  # the engine is allowed. Default value is true.
  auto_minor_version_upgrade = true

  # How often, in seconds, the backup job is expected to run. This is the same
  # as var.schedule_expression, but unfortunately, Terraform offers no way to
  # convert rate expressions to seconds. We add a CloudWatch alarm that triggers
  # if the metric in var.create_snapshot_cloudwatch_metric_namespace isn't
  # updated within this time period, as that indicates the backup failed to run.
  backup_job_alarm_period = 3600

  # Sets how the backup job alarm should handle entering the INSUFFICIENT_DATA
  # state. Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  backup_job_alarm_treat_missing_data = "missing"

  # How many days to keep backup snapshots around before cleaning them up. Max:
  # 35
  backup_retention_period = 30

  # Copy all the Aurora cluster tags to snapshots. Default is false.
  copy_tags_to_snapshot = false

  # Set to true if you want a DNS record automatically created and pointed at
  # the RDS endpoints.
  create_route53_entry = false

  # The namespace to use for the CloudWatch metric we report every time a new
  # RDS snapshot is created. We add a CloudWatch alarm on this metric to notify
  # us if the backup job fails to run for any reason. Defaults to the cluster
  # name.
  create_snapshot_cloudwatch_metric_namespace = null

  # A map of custom tags to apply to the RDS cluster and all associated
  # resources created for it. The key is the tag name and the value is the tag
  # value.
  custom_tags = {}

  # Parameters for the cpu usage widget to output for use in a CloudWatch
  # dashboard.
  dashboard_cpu_usage_widget_parameters = {"height":6,"period":60,"width":8}

  # Parameters for the database connections widget to output for use in a
  # CloudWatch dashboard.
  dashboard_db_connections_widget_parameters = {"height":6,"period":60,"width":8}

  # Parameters for the available disk space widget to output for use in a
  # CloudWatch dashboard.
  dashboard_disk_space_widget_parameters = {"height":6,"period":60,"width":8}

  # Parameters for the available memory widget to output for use in a CloudWatch
  # dashboard.
  dashboard_memory_widget_parameters = {"height":6,"period":60,"width":8}

  # Parameters for the read latency widget to output for use in a CloudWatch
  # dashboard.
  dashboard_read_latency_widget_parameters = {"height":6,"period":60,"width":8}

  # Parameters for the read latency widget to output for use in a CloudWatch
  # dashboard.
  dashboard_write_latency_widget_parameters = {"height":6,"period":60,"width":8}

  # Configure a custom parameter group for the RDS DB cluster. This will create
  # a new parameter group with the given parameters. When null, the database
  # will be launched with the default parameter group.
  db_cluster_custom_parameter_group = null

  # The friendly name or ARN of an AWS Secrets Manager secret that contains
  # database configuration information in the format outlined by this document:
  # https://docs.aws.amazon.com/secretsmanager/latest/userguide/best-practices.html.
  # The engine, username, password, dbname, and port fields must be included in
  # the JSON. Note that even with this precaution, this information will be
  # stored in plaintext in the Terraform state file! See the following blog post
  # for more details:
  # https://blog.gruntwork.io/a-comprehensive-guide-to-managing-secrets-in-your-terraform-code-1d586955ace1.
  # If you do not wish to use Secrets Manager, leave this as null, and use the
  # master_username, master_password, db_name, engine, and port variables.
  db_config_secrets_manager_id = null

  # Configure a custom parameter group for the RDS DB Instance. This will create
  # a new parameter group with the given parameters. When null, the database
  # will be launched with the default parameter group.
  db_instance_custom_parameter_group = null

  # The name for your database of up to 8 alpha-numeric characters. If you do
  # not provide a name, Amazon RDS will not create a database in the DB cluster
  # you are creating. This can also be provided via AWS Secrets Manager. See the
  # description of db_config_secrets_manager_id. A value here overrides the
  # value in db_config_secrets_manager_id.
  db_name = null

  # Set to true to enable several basic CloudWatch alarms around CPU usage,
  # memory usage, and disk space usage. If set to true, make sure to specify SNS
  # topics to send notifications to using var.alarms_sns_topic_arn.
  enable_cloudwatch_alarms = true

  # When true, enable CloudWatch metrics for the manual snapshots created for
  # the purpose of sharing with another account.
  enable_cloudwatch_metrics = true

  # Enable deletion protection on the database instance. If this is enabled, the
  # database cannot be deleted.
  enable_deletion_protection = false

  # Set to true to enable alarms related to performance, such as read and write
  # latency alarms. Set to false to disable those alarms if you aren't sure what
  # would be reasonable perf numbers for your RDS set up or if those numbers are
  # too unpredictable.
  enable_perf_alarms = true

  # When true, enable CloudWatch alarms for the manual snapshots created for the
  # purpose of sharing with another account. Only used if
  # var.share_snapshot_with_another_account is true.
  enable_share_snapshot_cloudwatch_alarms = true

  # If non-empty, the Aurora cluster will export the specified logs to
  # Cloudwatch. Must be zero or more of: audit, error, general and slowquery
  enabled_cloudwatch_logs_exports = []

  # The name of the database engine to be used for this DB cluster. Valid
  # Values: aurora (for MySQL 5.6-compatible Aurora), aurora-mysql (for MySQL
  # 5.7-compatible Aurora), and aurora-postgresql. This can also be provided via
  # AWS Secrets Manager. See the description of db_config_secrets_manager_id. A
  # value here overrides the value in db_config_secrets_manager_id.
  engine = null

  # The version of aurora to run - provisioned or serverless.
  engine_mode = "provisioned"

  # The Amazon Aurora DB engine version for the selected engine and engine_mode.
  # Note: Starting with Aurora MySQL 2.03.2, Aurora engine versions have the
  # following syntax <mysql-major-version>.mysql_aurora.<aurora-mysql-version>.
  # e.g. 5.7.mysql_aurora.2.08.1.
  engine_version = null

  # The period, in seconds, over which to measure the CPU utilization
  # percentage.
  high_cpu_utilization_period = 60

  # Trigger an alarm if the DB instance has a CPU utilization percentage above
  # this threshold.
  high_cpu_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_cpu_utilization_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the read latency.
  high_read_latency_period = 60

  # Trigger an alarm if the DB instance read latency (average amount of time
  # taken per disk I/O operation), in seconds, is above this threshold.
  high_read_latency_threshold = 5

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_read_latency_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the write latency.
  high_write_latency_period = 60

  # Trigger an alarm if the DB instance write latency (average amount of time
  # taken per disk I/O operation), in seconds, is above this threshold.
  high_write_latency_threshold = 5

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  high_write_latency_treat_missing_data = "missing"

  # The ID of the hosted zone in which to write DNS records
  hosted_zone_id = null

  # Specifies whether mappings of AWS Identity and Access Management (IAM)
  # accounts to database accounts is enabled. Disabled by default.
  iam_database_authentication_enabled = false

  # The number of DB instances, including the primary, to run in the RDS
  # cluster. Only used when var.engine_mode is set to provisioned.
  instance_count = 1

  # The instance type to use for the db (e.g. db.r3.large). Only used when
  # var.engine_mode is set to provisioned.
  instance_type = "db.t3.small"

  # The ARN of a KMS key that should be used to encrypt data on disk. Only used
  # if var.storage_encrypted is true. If you leave this null, the default RDS
  # KMS key for the account will be used.
  kms_key_arn = null

  # The period, in seconds, over which to measure the available free disk space.
  low_disk_space_available_period = 60

  # Trigger an alarm if the amount of disk space, in Bytes, on the DB instance
  # drops below this threshold.
  low_disk_space_available_threshold = 1000000000

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  low_disk_space_available_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the available free memory.
  low_memory_available_period = 60

  # Trigger an alarm if the amount of free memory, in Bytes, on the DB instance
  # drops below this threshold.
  low_memory_available_threshold = 100000000

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  low_memory_available_treat_missing_data = "missing"

  # The value to use for the master password of the database. This can also be
  # provided via AWS Secrets Manager. See the description of
  # db_config_secrets_manager_id. A value here overrides the value in
  # db_config_secrets_manager_id.
  master_password = null # SENSITIVE

  # The value to use for the master username of the database. This can also be
  # provided via AWS Secrets Manager. See the description of
  # db_config_secrets_manager_id. A value here overrides the value in
  # db_config_secrets_manager_id.
  master_username = null

  # Specifies whether Performance Insights is enabled or not. On Aurora MySQL,
  # Performance Insights is not supported on db.t2 or db.t3 DB instance classes.
  performance_insights_enabled = false

  # The ARN for the KMS key to encrypt Performance Insights data.
  performance_insights_kms_key_id = null

  # The port the DB will listen on (e.g. 3306). This can also be provided via
  # AWS Secrets Manager. See the description of db_config_secrets_manager_id. A
  # value here overrides the value in db_config_secrets_manager_id.
  port = null

  # The daily time range during which automated backups are created (e.g.
  # 04:00-09:00). Time zone is UTC. Performance may be degraded while a backup
  # runs.
  preferred_backup_window = "06:00-07:00"

  # The weekly day and time range during which cluster maintenance can occur
  # (e.g. wed:04:00-wed:04:30). Time zone is UTC. Performance may be degraded or
  # there may even be a downtime during maintenance windows.
  preferred_maintenance_window = "sun:07:00-sun:08:00"

  # The domain name to create a route 53 record for the primary endpoint of the
  # RDS database.
  primary_domain_name = null

  # If you wish to make your database accessible from the public Internet, set
  # this flag to true (WARNING: NOT RECOMMENDED FOR REGULAR USAGE!!). The
  # default is false, which means the database is only accessible from within
  # the VPC, which is much more secure. This flag MUST be false for serverless
  # mode.
  publicly_accessible = false

  # The domain name to create a route 53 record for the reader endpoint of the
  # RDS database. Note that Aurora Serverless does not have reader endpoints, so
  # this option is ignored when engine_mode is set to serverless. 
  reader_domain_name = null

  # If non-empty, the Aurora cluster will be restored from the given source
  # cluster using the latest restorable time. Can only be used if
  # snapshot_identifier is null. For more information see
  # https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_PIT.html
  restore_source_cluster_identifier = null

  # Only used if 'restore_source_cluster_identifier' is non-empty. Type of
  # restore to be performed. Valid options are 'full-copy' and 'copy-on-write'.
  # https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Clone.html
  restore_type = null

  # Whether to enable automatic pause. A DB cluster can be paused only when it's
  # idle (it has no connections). If a DB cluster is paused for more than seven
  # days, the DB cluster might be backed up with a snapshot. In this case, the
  # DB cluster is restored when there is a request to connect to it. Only used
  # when var.engine_mode is set to serverless.
  scaling_configuration_auto_pause = true

  # The maximum capacity. The maximum capacity must be greater than or equal to
  # the minimum capacity. Valid capacity values are 2, 4, 8, 16, 32, 64, 128,
  # and 256. Only used when var.engine_mode is set to serverless.
  scaling_configuration_max_capacity = 256

  scaling_configuration_max_capacity_V2 = null

  # The minimum capacity. The minimum capacity must be lesser than or equal to
  # the maximum capacity. Valid capacity values are 2, 4, 8, 16, 32, 64, 128,
  # and 256. Only used when var.engine_mode is set to serverless.
  scaling_configuration_min_capacity = 2

  scaling_configuration_min_capacity_V2 = null

  # The time, in seconds, before an Aurora DB cluster in serverless mode is
  # paused. Valid values are 300 through 86400. Only used when var.engine_mode
  # is set to serverless.
  scaling_configuration_seconds_until_auto_pause = 300

  # The maximum number of snapshots to keep around for the purpose of cross
  # account sharing. Once this number is exceeded, a lambda function will delete
  # the oldest snapshots. Only used if var.share_snapshot_with_another_account
  # is true.
  share_snapshot_max_snapshots = 30

  # An expression that defines how often to run the lambda function to take
  # snapshots for the purpose of cross account sharing. For example, cron(0 20 *
  # * ? *) or rate(5 minutes). Required if
  # var.share_snapshot_with_another_account is true
  share_snapshot_schedule_expression = null

  # The ID of the AWS Account that the snapshot should be shared with. Required
  # if var.share_snapshot_with_another_account is true.
  share_snapshot_with_account_id = null

  # If set to true, take periodic snapshots of the Aurora DB that should be
  # shared with another account.
  share_snapshot_with_another_account = false

  # Determines whether a final DB snapshot is created before the DB instance is
  # deleted. Be very careful setting this to true; if you do, and you delete
  # this DB instance, you will not have any backups of the data! You almost
  # never want to set this to true, unless you are doing automated or manual
  # testing.
  skip_final_snapshot = false

  # If non-null, the RDS Instance will be restored from the given Snapshot ID.
  # This is the Snapshot ID you'd find in the RDS console, e.g:
  # rds:production-2015-06-26-06-05.
  snapshot_identifier = null

  # Specifies whether the DB cluster uses encryption for data at rest in the
  # underlying storage for the DB, its automated backups, Read Replicas, and
  # snapshots. Uses the default aws/rds key in KMS.
  storage_encrypted = true

  # Trigger an alarm if the number of connections to the DB instance goes above
  # this threshold.
  too_many_db_connections_threshold = null

}


```

</TabItem>
</Tabs>



## Reference


<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="aurora_subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

The list of IDs of the subnets in which to deploy Aurora. The list must only contain subnets in <a href="#vpc_id"><code>vpc_id</code></a>.

</HclListItemDescription>
</HclListItem>

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name used to namespace all the Aurora resources created by these templates, including the cluster and cluster instances (e.g. drupaldb). Must be unique in this region. Must be a lowercase string.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the VPC in which to deploy Aurora.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="alarms_sns_topic_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications. Also used for the alarms if the share snapshot backup job fails.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

The list of network CIDR blocks to allow network access to Aurora from. One of <a href="#allow_connections_from_cidr_blocks"><code>allow_connections_from_cidr_blocks</code></a> or <a href="#allow_connections_from_security_groups"><code>allow_connections_from_security_groups</code></a> must be specified for the database to be reachable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_security_groups" requirement="optional" type="list(string)">
<HclListItemDescription>

The list of IDs or Security Groups to allow network access to Aurora from. All security groups must either be in the VPC specified by <a href="#vpc_id"><code>vpc_id</code></a>, or a peered VPC with the VPC specified by <a href="#vpc_id"><code>vpc_id</code></a>. One of <a href="#allow_connections_from_cidr_blocks"><code>allow_connections_from_cidr_blocks</code></a> or <a href="#allow_connections_from_security_groups"><code>allow_connections_from_security_groups</code></a> must be specified for the database to be reachable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_major_version_upgrade" requirement="optional" type="bool">
<HclListItemDescription>

Enable to allow major engine version upgrades when changing engine versions.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="apply_immediately" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether any cluster modifications are applied immediately, or during the next maintenance window. Note that cluster modifications may cause degraded performance or downtime.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="auto_minor_version_upgrade" requirement="optional" type="bool">
<HclListItemDescription>

Configure the auto minor version upgrade behavior. This is applied to the cluster instances and indicates if the automatic minor version upgrade of the engine is allowed. Default value is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="backup_job_alarm_period" requirement="optional" type="number">
<HclListItemDescription>

How often, in seconds, the backup job is expected to run. This is the same as <a href="#schedule_expression"><code>schedule_expression</code></a>, but unfortunately, Terraform offers no way to convert rate expressions to seconds. We add a CloudWatch alarm that triggers if the metric in <a href="#create_snapshot_cloudwatch_metric_namespace"><code>create_snapshot_cloudwatch_metric_namespace</code></a> isn't updated within this time period, as that indicates the backup failed to run.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="3600"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Default to hourly

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="backup_job_alarm_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how the backup job alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="backup_retention_period" requirement="optional" type="number">
<HclListItemDescription>

How many days to keep backup snapshots around before cleaning them up. Max: 35

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="copy_tags_to_snapshot" requirement="optional" type="bool">
<HclListItemDescription>

Copy all the Aurora cluster tags to snapshots. Default is false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="create_route53_entry" requirement="optional" type="bool">
<HclListItemDescription>

Set to true if you want a DNS record automatically created and pointed at the RDS endpoints.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="create_snapshot_cloudwatch_metric_namespace" requirement="optional" type="string">
<HclListItemDescription>

The namespace to use for the CloudWatch metric we report every time a new RDS snapshot is created. We add a CloudWatch alarm on this metric to notify us if the backup job fails to run for any reason. Defaults to the cluster name.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the RDS cluster and all associated resources created for it. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="dashboard_cpu_usage_widget_parameters" requirement="optional" type="object(…)">
<HclListItemDescription>

Parameters for the cpu usage widget to output for use in a CloudWatch dashboard.

</HclListItemDescription>
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
<HclGeneralListItem title="More Details">
<details>


```hcl

     The width and height of the widget in grid units in a 24 column grid. E.g., a value of 12 will take up half the
     space.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="dashboard_db_connections_widget_parameters" requirement="optional" type="object(…)">
<HclListItemDescription>

Parameters for the database connections widget to output for use in a CloudWatch dashboard.

</HclListItemDescription>
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
<HclGeneralListItem title="More Details">
<details>


```hcl

     The width and height of the widget in grid units in a 24 column grid. E.g., a value of 12 will take up half the
     space.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="dashboard_disk_space_widget_parameters" requirement="optional" type="object(…)">
<HclListItemDescription>

Parameters for the available disk space widget to output for use in a CloudWatch dashboard.

</HclListItemDescription>
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
<HclGeneralListItem title="More Details">
<details>


```hcl

     The width and height of the widget in grid units in a 24 column grid. E.g., a value of 12 will take up half the
     space.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="dashboard_memory_widget_parameters" requirement="optional" type="object(…)">
<HclListItemDescription>

Parameters for the available memory widget to output for use in a CloudWatch dashboard.

</HclListItemDescription>
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
<HclGeneralListItem title="More Details">
<details>


```hcl

     The width and height of the widget in grid units in a 24 column grid. E.g., a value of 12 will take up half the
     space.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="dashboard_read_latency_widget_parameters" requirement="optional" type="object(…)">
<HclListItemDescription>

Parameters for the read latency widget to output for use in a CloudWatch dashboard.

</HclListItemDescription>
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
<HclGeneralListItem title="More Details">
<details>


```hcl

     The width and height of the widget in grid units in a 24 column grid. E.g., a value of 12 will take up half the
     space.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="dashboard_write_latency_widget_parameters" requirement="optional" type="object(…)">
<HclListItemDescription>

Parameters for the read latency widget to output for use in a CloudWatch dashboard.

</HclListItemDescription>
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
<HclGeneralListItem title="More Details">
<details>


```hcl

     The width and height of the widget in grid units in a 24 column grid. E.g., a value of 12 will take up half the
     space.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="db_cluster_custom_parameter_group" requirement="optional" type="object(…)">
<HclListItemDescription>

Configure a custom parameter group for the RDS DB cluster. This will create a new parameter group with the given parameters. When null, the database will be launched with the default parameter group.

</HclListItemDescription>
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
<HclGeneralListItem title="More Details">
<details>


```hcl

     The family of the DB cluster parameter group.

```
</details>

<details>


```hcl

     The parameters to configure on the created parameter group.

```
</details>

<details>


```hcl

       Vaue to set the parameter.

```
</details>

<details>


```hcl

       When to apply the parameter. "immediate" or "pending-reboot".

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="db_config_secrets_manager_id" requirement="optional" type="string">
<HclListItemDescription>

The friendly name or ARN of an AWS Secrets Manager secret that contains database configuration information in the format outlined by this document: https://docs.aws.amazon.com/secretsmanager/latest/userguide/best-practices.html. The engine, username, password, dbname, and port fields must be included in the JSON. Note that even with this precaution, this information will be stored in plaintext in the Terraform state file! See the following blog post for more details: https://blog.gruntwork.io/a-comprehensive-guide-to-managing-secrets-in-your-terraform-code-1d586955ace1. If you do not wish to use Secrets Manager, leave this as null, and use the master_username, master_password, db_name, engine, and port variables.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="db_instance_custom_parameter_group" requirement="optional" type="object(…)">
<HclListItemDescription>

Configure a custom parameter group for the RDS DB Instance. This will create a new parameter group with the given parameters. When null, the database will be launched with the default parameter group.

</HclListItemDescription>
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
<HclGeneralListItem title="More Details">
<details>


```hcl

     The family of the DB cluster parameter group.

```
</details>

<details>


```hcl

     The parameters to configure on the created parameter group.

```
</details>

<details>


```hcl

       Vaue to set the parameter.

```
</details>

<details>


```hcl

       When to apply the parameter. "immediate" or "pending-reboot".

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="db_name" requirement="optional" type="string">
<HclListItemDescription>

The name for your database of up to 8 alpha-numeric characters. If you do not provide a name, Amazon RDS will not create a database in the DB cluster you are creating. This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id. A value here overrides the value in db_config_secrets_manager_id.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_alarms" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using <a href="#alarms_sns_topic_arn"><code>alarms_sns_topic_arn</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_metrics" requirement="optional" type="bool">
<HclListItemDescription>

When true, enable CloudWatch metrics for the manual snapshots created for the purpose of sharing with another account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_deletion_protection" requirement="optional" type="bool">
<HclListItemDescription>

Enable deletion protection on the database instance. If this is enabled, the database cannot be deleted.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_perf_alarms" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable alarms related to performance, such as read and write latency alarms. Set to false to disable those alarms if you aren't sure what would be reasonable perf numbers for your RDS set up or if those numbers are too unpredictable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_share_snapshot_cloudwatch_alarms" requirement="optional" type="bool">
<HclListItemDescription>

When true, enable CloudWatch alarms for the manual snapshots created for the purpose of sharing with another account. Only used if <a href="#share_snapshot_with_another_account"><code>share_snapshot_with_another_account</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enabled_cloudwatch_logs_exports" requirement="optional" type="list(string)">
<HclListItemDescription>

If non-empty, the Aurora cluster will export the specified logs to Cloudwatch. Must be zero or more of: audit, error, general and slowquery

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="engine" requirement="optional" type="string">
<HclListItemDescription>

The name of the database engine to be used for this DB cluster. Valid Values: aurora (for MySQL 5.6-compatible Aurora), aurora-mysql (for MySQL 5.7-compatible Aurora), and aurora-postgresql. This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id. A value here overrides the value in db_config_secrets_manager_id.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="engine_mode" requirement="optional" type="string">
<HclListItemDescription>

The version of aurora to run - provisioned or serverless.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;provisioned&quot;"/>
</HclListItem>

<HclListItem name="engine_version" requirement="optional" type="string">
<HclListItemDescription>

The Amazon Aurora DB engine version for the selected engine and engine_mode. Note: Starting with Aurora MySQL 2.03.2, Aurora engine versions have the following syntax &lt;mysql-major-version>.mysql_aurora.&lt;aurora-mysql-version>. e.g. 5.7.mysql_aurora.2.08.1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="high_cpu_utilization_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the CPU utilization percentage.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="high_cpu_utilization_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the DB instance has a CPU utilization percentage above this threshold.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="90"/>
</HclListItem>

<HclListItem name="high_cpu_utilization_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="high_read_latency_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the read latency.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="high_read_latency_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the DB instance read latency (average amount of time taken per disk I/O operation), in seconds, is above this threshold.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="5"/>
</HclListItem>

<HclListItem name="high_read_latency_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="high_write_latency_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the write latency.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="high_write_latency_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the DB instance write latency (average amount of time taken per disk I/O operation), in seconds, is above this threshold.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="5"/>
</HclListItem>

<HclListItem name="high_write_latency_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="hosted_zone_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the hosted zone in which to write DNS records

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="iam_database_authentication_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether mappings of AWS Identity and Access Management (IAM) accounts to database accounts is enabled. Disabled by default.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="instance_count" requirement="optional" type="number">
<HclListItemDescription>

The number of DB instances, including the primary, to run in the RDS cluster. Only used when <a href="#engine_mode"><code>engine_mode</code></a> is set to provisioned.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1"/>
</HclListItem>

<HclListItem name="instance_type" requirement="optional" type="string">
<HclListItemDescription>

The instance type to use for the db (e.g. db.r3.large). Only used when <a href="#engine_mode"><code>engine_mode</code></a> is set to provisioned.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;db.t3.small&quot;"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   See https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Aurora.Managing.html for the instance types supported by
   Aurora

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of a KMS key that should be used to encrypt data on disk. Only used if <a href="#storage_encrypted"><code>storage_encrypted</code></a> is true. If you leave this null, the default RDS KMS key for the account will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="low_disk_space_available_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the available free disk space.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="low_disk_space_available_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the amount of disk space, in Bytes, on the DB instance drops below this threshold.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1000000000"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Default is 1GB (1 billion bytes)

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="low_disk_space_available_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="low_memory_available_period" requirement="optional" type="number">
<HclListItemDescription>

The period, in seconds, over which to measure the available free memory.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="low_memory_available_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the amount of free memory, in Bytes, on the DB instance drops below this threshold.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="100000000"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Default is 100MB (100 million bytes)

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="low_memory_available_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="master_password" requirement="optional" type="string">
<HclListItemDescription>

The value to use for the master password of the database. This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id. A value here overrides the value in db_config_secrets_manager_id.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="master_username" requirement="optional" type="string">
<HclListItemDescription>

The value to use for the master username of the database. This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id. A value here overrides the value in db_config_secrets_manager_id.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="performance_insights_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether Performance Insights is enabled or not. On Aurora MySQL, Performance Insights is not supported on db.t2 or db.t3 DB instance classes.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="performance_insights_kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

The ARN for the KMS key to encrypt Performance Insights data.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="port" requirement="optional" type="number">
<HclListItemDescription>

The port the DB will listen on (e.g. 3306). This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id. A value here overrides the value in db_config_secrets_manager_id.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="preferred_backup_window" requirement="optional" type="string">
<HclListItemDescription>

The daily time range during which automated backups are created (e.g. 04:00-09:00). Time zone is UTC. Performance may be degraded while a backup runs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;06:00-07:00&quot;"/>
</HclListItem>

<HclListItem name="preferred_maintenance_window" requirement="optional" type="string">
<HclListItemDescription>

The weekly day and time range during which cluster maintenance can occur (e.g. wed:04:00-wed:04:30). Time zone is UTC. Performance may be degraded or there may even be a downtime during maintenance windows.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;sun:07:00-sun:08:00&quot;"/>
</HclListItem>

<HclListItem name="primary_domain_name" requirement="optional" type="string">
<HclListItemDescription>

The domain name to create a route 53 record for the primary endpoint of the RDS database.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="publicly_accessible" requirement="optional" type="bool">
<HclListItemDescription>

If you wish to make your database accessible from the public Internet, set this flag to true (WARNING: NOT RECOMMENDED FOR REGULAR USAGE!!). The default is false, which means the database is only accessible from within the VPC, which is much more secure. This flag MUST be false for serverless mode.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="reader_domain_name" requirement="optional" type="string">
<HclListItemDescription>

The domain name to create a route 53 record for the reader endpoint of the RDS database. Note that Aurora Serverless does not have reader endpoints, so this option is ignored when engine_mode is set to serverless. 

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="restore_source_cluster_identifier" requirement="optional" type="string">
<HclListItemDescription>

If non-empty, the Aurora cluster will be restored from the given source cluster using the latest restorable time. Can only be used if snapshot_identifier is null. For more information see https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_PIT.html

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="restore_type" requirement="optional" type="string">
<HclListItemDescription>

Only used if 'restore_source_cluster_identifier' is non-empty. Type of restore to be performed. Valid options are 'full-copy' and 'copy-on-write'. https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Clone.html

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="scaling_configuration_auto_pause" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable automatic pause. A DB cluster can be paused only when it's idle (it has no connections). If a DB cluster is paused for more than seven days, the DB cluster might be backed up with a snapshot. In this case, the DB cluster is restored when there is a request to connect to it. Only used when <a href="#engine_mode"><code>engine_mode</code></a> is set to serverless.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="scaling_configuration_max_capacity" requirement="optional" type="number">
<HclListItemDescription>

The maximum capacity. The maximum capacity must be greater than or equal to the minimum capacity. Valid capacity values are 2, 4, 8, 16, 32, 64, 128, and 256. Only used when <a href="#engine_mode"><code>engine_mode</code></a> is set to serverless.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="256"/>
</HclListItem>

<HclListItem name="scaling_configuration_max_capacity_V2" requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="scaling_configuration_min_capacity" requirement="optional" type="number">
<HclListItemDescription>

The minimum capacity. The minimum capacity must be lesser than or equal to the maximum capacity. Valid capacity values are 2, 4, 8, 16, 32, 64, 128, and 256. Only used when <a href="#engine_mode"><code>engine_mode</code></a> is set to serverless.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="2"/>
</HclListItem>

<HclListItem name="scaling_configuration_min_capacity_V2" requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="scaling_configuration_seconds_until_auto_pause" requirement="optional" type="number">
<HclListItemDescription>

The time, in seconds, before an Aurora DB cluster in serverless mode is paused. Valid values are 300 through 86400. Only used when <a href="#engine_mode"><code>engine_mode</code></a> is set to serverless.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="share_snapshot_max_snapshots" requirement="optional" type="number">
<HclListItemDescription>

The maximum number of snapshots to keep around for the purpose of cross account sharing. Once this number is exceeded, a lambda function will delete the oldest snapshots. Only used if <a href="#share_snapshot_with_another_account"><code>share_snapshot_with_another_account</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="share_snapshot_schedule_expression" requirement="optional" type="string">
<HclListItemDescription>

An expression that defines how often to run the lambda function to take snapshots for the purpose of cross account sharing. For example, cron(0 20 * * ? *) or rate(5 minutes). Required if <a href="#share_snapshot_with_another_account"><code>share_snapshot_with_another_account</code></a> is true

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="share_snapshot_with_account_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the AWS Account that the snapshot should be shared with. Required if <a href="#share_snapshot_with_another_account"><code>share_snapshot_with_another_account</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="share_snapshot_with_another_account" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, take periodic snapshots of the Aurora DB that should be shared with another account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="skip_final_snapshot" requirement="optional" type="bool">
<HclListItemDescription>

Determines whether a final DB snapshot is created before the DB instance is deleted. Be very careful setting this to true; if you do, and you delete this DB instance, you will not have any backups of the data! You almost never want to set this to true, unless you are doing automated or manual testing.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="snapshot_identifier" requirement="optional" type="string">
<HclListItemDescription>

If non-null, the RDS Instance will be restored from the given Snapshot ID. This is the Snapshot ID you'd find in the RDS console, e.g: rds:production-2015-06-26-06-05.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="storage_encrypted" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether the DB cluster uses encryption for data at rest in the underlying storage for the DB, its automated backups, Read Replicas, and snapshots. Uses the default aws/rds key in KMS.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="too_many_db_connections_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the number of connections to the DB instance goes above this threshold.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   The max number of connections allowed by RDS depends a) the type of DB, b) the DB instance type, and c) the
   use case, and it can vary from ~30 all the way up to 5,000, so we cannot pick a reasonable default here.

```
</details>

</HclGeneralListItem>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="all_metric_widgets">
<HclListItemDescription>

A list of all the CloudWatch Dashboard metric widgets available in this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cleanup_snapshots_lambda_arn">
<HclListItemDescription>

The ARN of the AWS Lambda Function used for cleaning up manual snapshots taken for sharing with secondary accounts.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_arn">
<HclListItemDescription>

The ARN of the RDS Aurora cluster.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_id">
<HclListItemDescription>

The ID of the RDS Aurora cluster (e.g TODO).

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_resource_id">
<HclListItemDescription>

The unique resource ID assigned to the cluster e.g. cluster-POBCBQUFQC56EBAAWXGFJ77GRU. This is useful for allowing database authentication via IAM.

</HclListItemDescription>
</HclListItem>

<HclListItem name="create_snapshot_lambda_arn">
<HclListItemDescription>

The ARN of the AWS Lambda Function used for periodically taking snapshots to share with secondary accounts.

</HclListItemDescription>
</HclListItem>

<HclListItem name="instance_endpoints">
<HclListItemDescription>

A list of endpoints of the RDS instances that you can use to make requests to.

</HclListItemDescription>
</HclListItem>

<HclListItem name="metric_widget_aurora_cpu_usage">
<HclListItemDescription>

A CloudWatch Dashboard widget that graphs CPU usage (percentage) of the Aurora cluster.

</HclListItemDescription>
</HclListItem>

<HclListItem name="metric_widget_aurora_db_connections">
<HclListItemDescription>

A CloudWatch Dashboard widget that graphs the number of active database connections of the Aurora cluster.

</HclListItemDescription>
</HclListItem>

<HclListItem name="metric_widget_aurora_disk_space">
<HclListItemDescription>

A CloudWatch Dashboard widget that graphs available disk space (in bytes) on the Aurora cluster.

</HclListItemDescription>
</HclListItem>

<HclListItem name="metric_widget_aurora_memory">
<HclListItemDescription>

A CloudWatch Dashboard widget that graphs available memory (in bytes) on the Aurora cluster.

</HclListItemDescription>
</HclListItem>

<HclListItem name="metric_widget_aurora_read_latency">
<HclListItemDescription>

A CloudWatch Dashboard widget that graphs the average amount of time taken per disk I/O operation on reads.

</HclListItemDescription>
</HclListItem>

<HclListItem name="metric_widget_aurora_write_latency">
<HclListItemDescription>

A CloudWatch Dashboard widget that graphs the average amount of time taken per disk I/O operation on writes.

</HclListItemDescription>
</HclListItem>

<HclListItem name="port">
<HclListItemDescription>

The port used by the RDS Aurora cluster for handling database connections.

</HclListItemDescription>
</HclListItem>

<HclListItem name="primary_endpoint">
<HclListItemDescription>

The primary endpoint of the RDS Aurora cluster that you can use to make requests to.

</HclListItemDescription>
</HclListItem>

<HclListItem name="primary_host">
<HclListItemDescription>

The host portion of the Aurora endpoint. primary_endpoint is in the form '&lt;host>:&lt;port>', and this output returns just the host part.

</HclListItemDescription>
</HclListItem>

<HclListItem name="reader_endpoint">
<HclListItemDescription>

A read-only endpoint for the Aurora cluster, automatically load-balanced across replicas.

</HclListItemDescription>
</HclListItem>

<HclListItem name="security_group_id">
<HclListItemDescription>

ID of security group created by aurora module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="share_snapshot_lambda_arn">
<HclListItemDescription>

The ARN of the AWS Lambda Function used for sharing manual snapshots with secondary accounts.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/data-stores/aurora/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/data-stores/aurora/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/data-stores/aurora/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "016b2ea43f98af6bc97b7a67fdbd595c"
}
##DOCS-SOURCER-END -->
