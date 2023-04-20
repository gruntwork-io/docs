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
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.102.13" lastModifiedVersion="0.102.11"/>

# Amazon Relational Database Service

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.102.13/modules/data-stores/rds" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=data-stores%2Frds" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>

## Overview

This service contains code to deploy an Amazon Relational Database Service (RDS) cluster that can run MySQL, PostgreSQL,
SQL Server, Oracle, or MariaDB. The cluster is managed by AWS and automatically handles standby failover, read replicas,
backups, patching, and encryption. For Aurora, use the [Aurora](/reference/services/data-storage/amazon-aurora) service.

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

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.102.13/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.102.13/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

*   [How do I pass database configuration securely?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.102.13/modules/data-stores/rds/core-concepts.md#how-do-i-pass-database-configuration-securely)


## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S RDS MODULE
# ------------------------------------------------------------------------------------------------------

module "rds" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/rds?ref=v0.102.13"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The amount of storage space the DB should use, in GB.
  allocated_storage = <number>

  # The version of var.engine to use (e.g. 8.0.17 for mysql).
  engine_version = <string>

  # The name used to namespace all the RDS resources created by these templates,
  # including the cluster and cluster instances (e.g. mysql-stage). Must be unique
  # in this region. Must be a lowercase string.
  name = <string>

  # The list of IDs of the subnets in which to deploy RDS. The list must only
  # contain subnets in var.vpc_id.
  subnet_ids = <list(string)>

  # The ID of the VPC in which to deploy RDS.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk
  # space usage) should send notifications. Also used for the alarms if the share
  # snapshot backup job fails.
  alarms_sns_topic_arns = []

  # The list of network CIDR blocks to allow network access to RDS from. One of
  # var.allow_connections_from_cidr_blocks or
  # var.allow_connections_from_security_groups must be specified for the database to
  # be reachable.
  allow_connections_from_cidr_blocks = []

  # The list of IDs or Security Groups to allow network access to RDS from. All
  # security groups must either be in the VPC specified by var.vpc_id, or a peered
  # VPC with the VPC specified by var.vpc_id. One of
  # var.allow_connections_from_cidr_blocks or
  # var.allow_connections_from_security_groups must be specified for the database to
  # be reachable.
  allow_connections_from_security_groups = []

  # If true, both the CMK's Key Policy and IAM Policies (permissions) can be used to
  # grant permissions on the CMK. If false, only the CMK's Key Policy can be used to
  # grant permissions on the CMK. False is more secure (and generally preferred),
  # but true is more flexible and convenient.
  allow_manage_key_permissions_with_iam = false

  # Specifies whether any cluster modifications are applied immediately, or during
  # the next maintenance window. Note that cluster modifications may cause degraded
  # performance or downtime.
  apply_immediately = false

  # Indicates that minor engine upgrades will be applied automatically to the DB
  # instance during the maintenance window. If set to true, you should set
  # var.engine_version to MAJOR.MINOR and omit the .PATCH at the end (e.g., use 5.7
  # and not 5.7.11); otherwise, you'll get Terraform state drift. See
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/db_i
  # stance.html#engine_version for more details.
  auto_minor_version_upgrade = true

  # The name of the aws_db_security_group that is created. Defaults to var.name if
  # not specified.
  aws_db_security_group_name = null

  # How often, in seconds, the backup job is expected to run. This is the same as
  # var.schedule_expression, but unfortunately, Terraform offers no way to convert
  # rate expressions to seconds. We add a CloudWatch alarm that triggers if the
  # metric in var.create_snapshot_cloudwatch_metric_namespace isn't updated within
  # this time period, as that indicates the backup failed to run.
  backup_job_alarm_period = 3600

  # Sets how the backup job alarm should handle entering the INSUFFICIENT_DATA
  # state. Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEma
  # l.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching'
  # or 'notBreaching'.
  backup_job_alarm_treat_missing_data = "missing"

  # How many days to keep backup snapshots around before cleaning them up. Must be 1
  # or greater to support read replicas.
  backup_retention_period = 30

  # The daily time range during which automated backups are created (e.g.
  # 04:00-09:00). Time zone is UTC. Performance may be degraded while a backup runs.
  backup_window = "06:00-07:00"

  # A list of IAM ARNs for users who should be given administrator access to this
  # CMK (e.g. arn:aws:iam::<aws-account-id>:user/<iam-user-arn>). If this list is
  # empty, and var.kms_key_arn is null, the ARN of the current user will be used.
  cmk_administrator_iam_arns = []

  # A list of IAM ARNs for users from external AWS accounts who should be given
  # permissions to use this CMK (e.g. arn:aws:iam::<aws-account-id>:root).
  cmk_external_user_iam_arns = []

  # A list of IAM ARNs for users who should be given permissions to use this CMK
  # (e.g.  arn:aws:iam::<aws-account-id>:user/<iam-user-arn>). If this list is
  # empty, and var.kms_key_arn is null, the ARN of the current user will be used.
  cmk_user_iam_arns = []

  # Copy all the RDS instance tags to snapshots. Default is false.
  copy_tags_to_snapshot = false

  # If set to true, create a KMS CMK and use it to encrypt data on disk in the
  # database. The permissions for this CMK will be assigned by the following
  # variables: cmk_administrator_iam_arns, cmk_user_iam_arns,
  # cmk_external_user_iam_arns, allow_manage_key_permissions.
  create_custom_kms_key = false

  # Set to true if you want a DNS record automatically created and pointed at the
  # RDS endpoints.
  create_route53_entry = false

  # The namespace to use for the CloudWatch metric we report every time a new RDS
  # snapshot is created. We add a CloudWatch alarm on this metric to notify us if
  # the backup job fails to run for any reason. Defaults to the cluster name.
  create_snapshot_cloudwatch_metric_namespace = null

  # Configure a custom parameter group for the RDS DB. This will create a new
  # parameter group with the given parameters. When null, the database will be
  # launched with the default parameter group.
  custom_parameter_group = null

  # A map of custom tags to apply to the RDS Instance and the Security Group created
  # for it. The key is the tag name and the value is the tag value.
  custom_tags = {}

  # Parameters for the cpu usage widget to output for use in a CloudWatch dashboard.
  dashboard_cpu_usage_widget_parameters = {"height":6,"period":60,"width":8}

  # Parameters for the database connections widget to output for use in a CloudWatch
  # dashboard.
  dashboard_db_connections_widget_parameters = {"height":6,"period":60,"width":8}

  # Parameters for the available disk space widget to output for use in a CloudWatch
  # dashboard.
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

  # The friendly name or ARN of an AWS Secrets Manager secret that contains database
  # configuration information in the format outlined by this document:
  # https://docs.aws.amazon.com/secretsmanager/latest/userguide/best-practices.html.
  # The engine, username, password, dbname, and port fields must be included in the
  # JSON. Note that even with this precaution, this information will be stored in
  # plaintext in the Terraform state file! See the following blog post for more
  # details:
  # https://blog.gruntwork.io/a-comprehensive-guide-to-managing-secrets-in-your-terr
  # form-code-1d586955ace1. If you do not wish to use Secrets Manager, leave this as
  # null, and use the master_username, master_password, db_name, engine, and port
  # variables.
  db_config_secrets_manager_id = null

  # The name for your database of up to 8 alpha-numeric characters. If you do not
  # provide a name, Amazon RDS will not create an empty database on the RDS
  # instance. This can also be provided via AWS Secrets Manager. See the description
  # of db_config_secrets_manager_id.
  db_name = null

  # Specifies whether to remove automated backups immediately after the DB instance
  # is deleted
  delete_automated_backups = true

  # Set to true to enable several basic CloudWatch alarms around CPU usage, memory
  # usage, and disk space usage. If set to true, make sure to specify SNS topics to
  # send notifications to using var.alarms_sns_topic_arn.
  enable_cloudwatch_alarms = true

  # When true, enable CloudWatch metrics for the manual snapshots created for the
  # purpose of sharing with another account.
  enable_cloudwatch_metrics = true

  # Enable deletion protection on the RDS instance. If this is enabled, the database
  # cannot be deleted prior to disabling
  enable_deletion_protection = false

  # Set to true to enable alarms related to performance, such as read and write
  # latency alarms. Set to false to disable those alarms if you aren't sure what
  # would be reasonable perf numbers for your RDS set up or if those numbers are too
  # unpredictable.
  enable_perf_alarms = true

  # When true, enable CloudWatch alarms for the manual snapshots created for the
  # purpose of sharing with another account. Only used if
  # var.share_snapshot_with_another_account is true.
  enable_share_snapshot_cloudwatch_alarms = true

  # List of log types to enable for exporting to CloudWatch logs. If omitted, no
  # logs will be exported. Valid values (depending on engine): alert, audit, error,
  # general, listener, slowquery, trace, postgresql (PostgreSQL) and upgrade
  # (PostgreSQL).
  enabled_cloudwatch_logs_exports = []

  # The DB engine to use (e.g. mysql). This can also be provided via AWS Secrets
  # Manager. See the description of db_config_secrets_manager_id.
  engine = null

  # The period, in seconds, over which to measure the CPU utilization percentage.
  high_cpu_utilization_period = 60

  # Trigger an alarm if the DB instance has a CPU utilization percentage above this
  # threshold.
  high_cpu_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEma
  # l.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching'
  # or 'notBreaching'.
  high_cpu_utilization_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the read latency.
  high_read_latency_period = 60

  # Trigger an alarm if the DB instance read latency (average amount of time taken
  # per disk I/O operation), in seconds, is above this threshold.
  high_read_latency_threshold = 5

  # The period, in seconds, over which to measure the write latency.
  high_write_latency_period = 60

  # Trigger an alarm if the DB instance write latency (average amount of time taken
  # per disk I/O operation), in seconds, is above this threshold.
  high_write_latency_threshold = 5

  # The ID of the Route 53 hosted zone into which the Route 53 DNS record should be
  # written
  hosted_zone_id = null

  # Specifies whether mappings of AWS Identity and Access Management (IAM) accounts
  # to database accounts is enabled. Disabled by default.
  iam_database_authentication_enabled = false

  # The instance type to use for the db (e.g. db.t3.micro)
  instance_type = "db.t3.micro"

  # The amount of provisioned IOPS for the primary instance. Setting this implies a
  # storage_type of 'io1'. Can only be set when storage_type is 'gp3' or 'io1'. Set
  # to 0 to disable.
  iops = 0

  # The Amazon Resource Name (ARN) of an existing KMS customer master key (CMK) that
  # will be used to encrypt/decrypt backup files. If you leave this blank, the
  # default RDS KMS key for the account will be used. If you set
  # var.create_custom_kms_key to true, this value will be ignored and a custom key
  # will be created and used instead.
  kms_key_arn = null

  # The license model to use for this DB. Check the docs for your RDS DB for
  # available license models. Set to an empty string to use the default.
  license_model = null

  # The period, in seconds, over which to measure the available free disk space.
  low_disk_space_available_period = 60

  # Trigger an alarm if the amount of disk space, in Bytes, on the DB instance drops
  # below this threshold.
  low_disk_space_available_threshold = 1000000000

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEma
  # l.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching'
  # or 'notBreaching'.
  low_disk_space_available_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the available free memory.
  low_memory_available_period = 60

  # Trigger an alarm if the amount of free memory, in Bytes, on the DB instance
  # drops below this threshold.
  low_memory_available_threshold = 100000000

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEma
  # l.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching'
  # or 'notBreaching'.
  low_memory_available_treat_missing_data = "missing"

  # The weekly day and time range during which system maintenance can occur (e.g.
  # wed:04:00-wed:04:30). Time zone is UTC. Performance may be degraded or there may
  # even be a downtime during maintenance windows.
  maintenance_window = "sun:07:00-sun:08:00"

  # The value to use for the master password of the database. This can also be
  # provided via AWS Secrets Manager. See the description of
  # db_config_secrets_manager_id.
  master_password = null

  # The value to use for the master username of the database. This can also be
  # provided via AWS Secrets Manager. See the description of
  # db_config_secrets_manager_id.
  master_username = null

  # When configured, the upper limit to which Amazon RDS can automatically scale the
  # storage of the DB instance. Configuring this will automatically ignore
  # differences to allocated_storage. Must be greater than or equal to
  # allocated_storage or 0 to disable Storage Autoscaling.
  max_allocated_storage = 0

  # The interval, in seconds, between points when Enhanced Monitoring metrics are
  # collected for the DB instance. To disable collecting Enhanced Monitoring
  # metrics, specify 0. Valid Values: 0, 1, 5, 10, 15, 30, 60. Enhanced Monitoring
  # metrics are useful when you want to see how different processes or threads on a
  # DB instance use the CPU.
  monitoring_interval = 0

  # The ARN for the IAM role that permits RDS to send enhanced monitoring metrics to
  # CloudWatch Logs. If monitoring_interval is greater than 0, but
  # monitoring_role_arn is left as an empty string, a default IAM role that allows
  # enhanced monitoring will be created.
  monitoring_role_arn = null

  # Optionally add a path to the IAM monitoring role. If left blank, it will default
  # to just /.
  monitoring_role_arn_path = "/"

  # The name of the enhanced_monitoring_role that is created. Defaults to
  # var.name-monitoring-role if not specified.
  monitoring_role_name = null

  # Specifies if a standby instance should be deployed in another availability zone.
  # If the primary fails, this instance will automatically take over.
  multi_az = false

  # The number of read replicas to deploy
  num_read_replicas = 0

  # Name of a DB option group to associate.
  option_group_name = null

  # Specifies whether Performance Insights are enabled. Performance Insights can be
  # enabled for specific versions of database engines. See
  # https://aws.amazon.com/rds/performance-insights/ for more details.
  performance_insights_enabled = false

  # The port the DB will listen on (e.g. 3306). Alternatively, this can be provided
  # via AWS Secrets Manager. See the description of db_config_secrets_manager_id.
  port = null

  # The domain name to create a route 53 record for the primary endpoint of the RDS
  # database.
  primary_domain_name = null

  # If you wish to make your database accessible from the public Internet, set this
  # flag to true (WARNING: NOT RECOMMENDED FOR REGULAR USAGE!!). The default is
  # false, which means the database is only accessible from within the VPC, which is
  # much more secure. This flag MUST be false for serverless mode.
  publicly_accessible = false

  # How many days to keep backup snapshots around before cleaning them up on the
  # read replicas. Must be 1 or greater to support read replicas. 0 means disable
  # automated backups.
  replica_backup_retention_period = 0

  # The domain name to create a route 53 record for the read replicas of the RDS
  # database.
  replica_domain_name = null

  # The maximum number of snapshots to keep around for the purpose of cross account
  # sharing. Once this number is exceeded, a lambda function will delete the oldest
  # snapshots. Only used if var.share_snapshot_with_another_account is true.
  share_snapshot_max_snapshots = 30

  # An expression that defines how often to run the lambda function to take
  # snapshots for the purpose of cross account sharing. For example, cron(0 20 * * ?
  # *) or rate(5 minutes). Required if var.share_snapshot_with_another_account is
  # true
  share_snapshot_schedule_expression = null

  # The ID of the AWS Account that the snapshot should be shared with. Required if
  # var.share_snapshot_with_another_account is true.
  share_snapshot_with_account_id = null

  # If set to true, take periodic snapshots of the RDS DB that should be shared with
  # another account.
  share_snapshot_with_another_account = false

  # Determines whether a final DB snapshot is created before the DB instance is
  # deleted. Be very careful setting this to true; if you do, and you delete this DB
  # instance, you will not have any backups of the data! You almost never want to
  # set this to true, unless you are doing automated or manual testing.
  skip_final_snapshot = false

  # If non-null, the RDS Instance will be restored from the given Snapshot ID. This
  # is the Snapshot ID you'd find in the RDS console, e.g:
  # rds:production-2015-06-26-06-05.
  snapshot_identifier = null

  # Specifies whether the DB instance is encrypted.
  storage_encrypted = true

  # The type of storage to use for the primary instance. Must be one of 'standard'
  # (magnetic), 'gp2' (general purpose SSD), 'gp3' (general purpose SSD that needs
  # iops independently), or 'io1' (provisioned IOPS SSD).
  storage_type = "gp2"

  # Trigger an alarm if the number of connections to the DB instance goes above this
  # threshold.
  too_many_db_connections_threshold = null

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEma
  # l.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching'
  # or 'notBreaching'.
  too_many_db_connections_treat_missing_data = "missing"

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S RDS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/rds?ref=v0.102.13"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The amount of storage space the DB should use, in GB.
  allocated_storage = <number>

  # The version of var.engine to use (e.g. 8.0.17 for mysql).
  engine_version = <string>

  # The name used to namespace all the RDS resources created by these templates,
  # including the cluster and cluster instances (e.g. mysql-stage). Must be unique
  # in this region. Must be a lowercase string.
  name = <string>

  # The list of IDs of the subnets in which to deploy RDS. The list must only
  # contain subnets in var.vpc_id.
  subnet_ids = <list(string)>

  # The ID of the VPC in which to deploy RDS.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk
  # space usage) should send notifications. Also used for the alarms if the share
  # snapshot backup job fails.
  alarms_sns_topic_arns = []

  # The list of network CIDR blocks to allow network access to RDS from. One of
  # var.allow_connections_from_cidr_blocks or
  # var.allow_connections_from_security_groups must be specified for the database to
  # be reachable.
  allow_connections_from_cidr_blocks = []

  # The list of IDs or Security Groups to allow network access to RDS from. All
  # security groups must either be in the VPC specified by var.vpc_id, or a peered
  # VPC with the VPC specified by var.vpc_id. One of
  # var.allow_connections_from_cidr_blocks or
  # var.allow_connections_from_security_groups must be specified for the database to
  # be reachable.
  allow_connections_from_security_groups = []

  # If true, both the CMK's Key Policy and IAM Policies (permissions) can be used to
  # grant permissions on the CMK. If false, only the CMK's Key Policy can be used to
  # grant permissions on the CMK. False is more secure (and generally preferred),
  # but true is more flexible and convenient.
  allow_manage_key_permissions_with_iam = false

  # Specifies whether any cluster modifications are applied immediately, or during
  # the next maintenance window. Note that cluster modifications may cause degraded
  # performance or downtime.
  apply_immediately = false

  # Indicates that minor engine upgrades will be applied automatically to the DB
  # instance during the maintenance window. If set to true, you should set
  # var.engine_version to MAJOR.MINOR and omit the .PATCH at the end (e.g., use 5.7
  # and not 5.7.11); otherwise, you'll get Terraform state drift. See
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/db_i
  # stance.html#engine_version for more details.
  auto_minor_version_upgrade = true

  # The name of the aws_db_security_group that is created. Defaults to var.name if
  # not specified.
  aws_db_security_group_name = null

  # How often, in seconds, the backup job is expected to run. This is the same as
  # var.schedule_expression, but unfortunately, Terraform offers no way to convert
  # rate expressions to seconds. We add a CloudWatch alarm that triggers if the
  # metric in var.create_snapshot_cloudwatch_metric_namespace isn't updated within
  # this time period, as that indicates the backup failed to run.
  backup_job_alarm_period = 3600

  # Sets how the backup job alarm should handle entering the INSUFFICIENT_DATA
  # state. Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEma
  # l.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching'
  # or 'notBreaching'.
  backup_job_alarm_treat_missing_data = "missing"

  # How many days to keep backup snapshots around before cleaning them up. Must be 1
  # or greater to support read replicas.
  backup_retention_period = 30

  # The daily time range during which automated backups are created (e.g.
  # 04:00-09:00). Time zone is UTC. Performance may be degraded while a backup runs.
  backup_window = "06:00-07:00"

  # A list of IAM ARNs for users who should be given administrator access to this
  # CMK (e.g. arn:aws:iam::<aws-account-id>:user/<iam-user-arn>). If this list is
  # empty, and var.kms_key_arn is null, the ARN of the current user will be used.
  cmk_administrator_iam_arns = []

  # A list of IAM ARNs for users from external AWS accounts who should be given
  # permissions to use this CMK (e.g. arn:aws:iam::<aws-account-id>:root).
  cmk_external_user_iam_arns = []

  # A list of IAM ARNs for users who should be given permissions to use this CMK
  # (e.g.  arn:aws:iam::<aws-account-id>:user/<iam-user-arn>). If this list is
  # empty, and var.kms_key_arn is null, the ARN of the current user will be used.
  cmk_user_iam_arns = []

  # Copy all the RDS instance tags to snapshots. Default is false.
  copy_tags_to_snapshot = false

  # If set to true, create a KMS CMK and use it to encrypt data on disk in the
  # database. The permissions for this CMK will be assigned by the following
  # variables: cmk_administrator_iam_arns, cmk_user_iam_arns,
  # cmk_external_user_iam_arns, allow_manage_key_permissions.
  create_custom_kms_key = false

  # Set to true if you want a DNS record automatically created and pointed at the
  # RDS endpoints.
  create_route53_entry = false

  # The namespace to use for the CloudWatch metric we report every time a new RDS
  # snapshot is created. We add a CloudWatch alarm on this metric to notify us if
  # the backup job fails to run for any reason. Defaults to the cluster name.
  create_snapshot_cloudwatch_metric_namespace = null

  # Configure a custom parameter group for the RDS DB. This will create a new
  # parameter group with the given parameters. When null, the database will be
  # launched with the default parameter group.
  custom_parameter_group = null

  # A map of custom tags to apply to the RDS Instance and the Security Group created
  # for it. The key is the tag name and the value is the tag value.
  custom_tags = {}

  # Parameters for the cpu usage widget to output for use in a CloudWatch dashboard.
  dashboard_cpu_usage_widget_parameters = {"height":6,"period":60,"width":8}

  # Parameters for the database connections widget to output for use in a CloudWatch
  # dashboard.
  dashboard_db_connections_widget_parameters = {"height":6,"period":60,"width":8}

  # Parameters for the available disk space widget to output for use in a CloudWatch
  # dashboard.
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

  # The friendly name or ARN of an AWS Secrets Manager secret that contains database
  # configuration information in the format outlined by this document:
  # https://docs.aws.amazon.com/secretsmanager/latest/userguide/best-practices.html.
  # The engine, username, password, dbname, and port fields must be included in the
  # JSON. Note that even with this precaution, this information will be stored in
  # plaintext in the Terraform state file! See the following blog post for more
  # details:
  # https://blog.gruntwork.io/a-comprehensive-guide-to-managing-secrets-in-your-terr
  # form-code-1d586955ace1. If you do not wish to use Secrets Manager, leave this as
  # null, and use the master_username, master_password, db_name, engine, and port
  # variables.
  db_config_secrets_manager_id = null

  # The name for your database of up to 8 alpha-numeric characters. If you do not
  # provide a name, Amazon RDS will not create an empty database on the RDS
  # instance. This can also be provided via AWS Secrets Manager. See the description
  # of db_config_secrets_manager_id.
  db_name = null

  # Specifies whether to remove automated backups immediately after the DB instance
  # is deleted
  delete_automated_backups = true

  # Set to true to enable several basic CloudWatch alarms around CPU usage, memory
  # usage, and disk space usage. If set to true, make sure to specify SNS topics to
  # send notifications to using var.alarms_sns_topic_arn.
  enable_cloudwatch_alarms = true

  # When true, enable CloudWatch metrics for the manual snapshots created for the
  # purpose of sharing with another account.
  enable_cloudwatch_metrics = true

  # Enable deletion protection on the RDS instance. If this is enabled, the database
  # cannot be deleted prior to disabling
  enable_deletion_protection = false

  # Set to true to enable alarms related to performance, such as read and write
  # latency alarms. Set to false to disable those alarms if you aren't sure what
  # would be reasonable perf numbers for your RDS set up or if those numbers are too
  # unpredictable.
  enable_perf_alarms = true

  # When true, enable CloudWatch alarms for the manual snapshots created for the
  # purpose of sharing with another account. Only used if
  # var.share_snapshot_with_another_account is true.
  enable_share_snapshot_cloudwatch_alarms = true

  # List of log types to enable for exporting to CloudWatch logs. If omitted, no
  # logs will be exported. Valid values (depending on engine): alert, audit, error,
  # general, listener, slowquery, trace, postgresql (PostgreSQL) and upgrade
  # (PostgreSQL).
  enabled_cloudwatch_logs_exports = []

  # The DB engine to use (e.g. mysql). This can also be provided via AWS Secrets
  # Manager. See the description of db_config_secrets_manager_id.
  engine = null

  # The period, in seconds, over which to measure the CPU utilization percentage.
  high_cpu_utilization_period = 60

  # Trigger an alarm if the DB instance has a CPU utilization percentage above this
  # threshold.
  high_cpu_utilization_threshold = 90

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEma
  # l.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching'
  # or 'notBreaching'.
  high_cpu_utilization_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the read latency.
  high_read_latency_period = 60

  # Trigger an alarm if the DB instance read latency (average amount of time taken
  # per disk I/O operation), in seconds, is above this threshold.
  high_read_latency_threshold = 5

  # The period, in seconds, over which to measure the write latency.
  high_write_latency_period = 60

  # Trigger an alarm if the DB instance write latency (average amount of time taken
  # per disk I/O operation), in seconds, is above this threshold.
  high_write_latency_threshold = 5

  # The ID of the Route 53 hosted zone into which the Route 53 DNS record should be
  # written
  hosted_zone_id = null

  # Specifies whether mappings of AWS Identity and Access Management (IAM) accounts
  # to database accounts is enabled. Disabled by default.
  iam_database_authentication_enabled = false

  # The instance type to use for the db (e.g. db.t3.micro)
  instance_type = "db.t3.micro"

  # The amount of provisioned IOPS for the primary instance. Setting this implies a
  # storage_type of 'io1'. Can only be set when storage_type is 'gp3' or 'io1'. Set
  # to 0 to disable.
  iops = 0

  # The Amazon Resource Name (ARN) of an existing KMS customer master key (CMK) that
  # will be used to encrypt/decrypt backup files. If you leave this blank, the
  # default RDS KMS key for the account will be used. If you set
  # var.create_custom_kms_key to true, this value will be ignored and a custom key
  # will be created and used instead.
  kms_key_arn = null

  # The license model to use for this DB. Check the docs for your RDS DB for
  # available license models. Set to an empty string to use the default.
  license_model = null

  # The period, in seconds, over which to measure the available free disk space.
  low_disk_space_available_period = 60

  # Trigger an alarm if the amount of disk space, in Bytes, on the DB instance drops
  # below this threshold.
  low_disk_space_available_threshold = 1000000000

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEma
  # l.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching'
  # or 'notBreaching'.
  low_disk_space_available_treat_missing_data = "missing"

  # The period, in seconds, over which to measure the available free memory.
  low_memory_available_period = 60

  # Trigger an alarm if the amount of free memory, in Bytes, on the DB instance
  # drops below this threshold.
  low_memory_available_threshold = 100000000

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEma
  # l.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching'
  # or 'notBreaching'.
  low_memory_available_treat_missing_data = "missing"

  # The weekly day and time range during which system maintenance can occur (e.g.
  # wed:04:00-wed:04:30). Time zone is UTC. Performance may be degraded or there may
  # even be a downtime during maintenance windows.
  maintenance_window = "sun:07:00-sun:08:00"

  # The value to use for the master password of the database. This can also be
  # provided via AWS Secrets Manager. See the description of
  # db_config_secrets_manager_id.
  master_password = null

  # The value to use for the master username of the database. This can also be
  # provided via AWS Secrets Manager. See the description of
  # db_config_secrets_manager_id.
  master_username = null

  # When configured, the upper limit to which Amazon RDS can automatically scale the
  # storage of the DB instance. Configuring this will automatically ignore
  # differences to allocated_storage. Must be greater than or equal to
  # allocated_storage or 0 to disable Storage Autoscaling.
  max_allocated_storage = 0

  # The interval, in seconds, between points when Enhanced Monitoring metrics are
  # collected for the DB instance. To disable collecting Enhanced Monitoring
  # metrics, specify 0. Valid Values: 0, 1, 5, 10, 15, 30, 60. Enhanced Monitoring
  # metrics are useful when you want to see how different processes or threads on a
  # DB instance use the CPU.
  monitoring_interval = 0

  # The ARN for the IAM role that permits RDS to send enhanced monitoring metrics to
  # CloudWatch Logs. If monitoring_interval is greater than 0, but
  # monitoring_role_arn is left as an empty string, a default IAM role that allows
  # enhanced monitoring will be created.
  monitoring_role_arn = null

  # Optionally add a path to the IAM monitoring role. If left blank, it will default
  # to just /.
  monitoring_role_arn_path = "/"

  # The name of the enhanced_monitoring_role that is created. Defaults to
  # var.name-monitoring-role if not specified.
  monitoring_role_name = null

  # Specifies if a standby instance should be deployed in another availability zone.
  # If the primary fails, this instance will automatically take over.
  multi_az = false

  # The number of read replicas to deploy
  num_read_replicas = 0

  # Name of a DB option group to associate.
  option_group_name = null

  # Specifies whether Performance Insights are enabled. Performance Insights can be
  # enabled for specific versions of database engines. See
  # https://aws.amazon.com/rds/performance-insights/ for more details.
  performance_insights_enabled = false

  # The port the DB will listen on (e.g. 3306). Alternatively, this can be provided
  # via AWS Secrets Manager. See the description of db_config_secrets_manager_id.
  port = null

  # The domain name to create a route 53 record for the primary endpoint of the RDS
  # database.
  primary_domain_name = null

  # If you wish to make your database accessible from the public Internet, set this
  # flag to true (WARNING: NOT RECOMMENDED FOR REGULAR USAGE!!). The default is
  # false, which means the database is only accessible from within the VPC, which is
  # much more secure. This flag MUST be false for serverless mode.
  publicly_accessible = false

  # How many days to keep backup snapshots around before cleaning them up on the
  # read replicas. Must be 1 or greater to support read replicas. 0 means disable
  # automated backups.
  replica_backup_retention_period = 0

  # The domain name to create a route 53 record for the read replicas of the RDS
  # database.
  replica_domain_name = null

  # The maximum number of snapshots to keep around for the purpose of cross account
  # sharing. Once this number is exceeded, a lambda function will delete the oldest
  # snapshots. Only used if var.share_snapshot_with_another_account is true.
  share_snapshot_max_snapshots = 30

  # An expression that defines how often to run the lambda function to take
  # snapshots for the purpose of cross account sharing. For example, cron(0 20 * * ?
  # *) or rate(5 minutes). Required if var.share_snapshot_with_another_account is
  # true
  share_snapshot_schedule_expression = null

  # The ID of the AWS Account that the snapshot should be shared with. Required if
  # var.share_snapshot_with_another_account is true.
  share_snapshot_with_account_id = null

  # If set to true, take periodic snapshots of the RDS DB that should be shared with
  # another account.
  share_snapshot_with_another_account = false

  # Determines whether a final DB snapshot is created before the DB instance is
  # deleted. Be very careful setting this to true; if you do, and you delete this DB
  # instance, you will not have any backups of the data! You almost never want to
  # set this to true, unless you are doing automated or manual testing.
  skip_final_snapshot = false

  # If non-null, the RDS Instance will be restored from the given Snapshot ID. This
  # is the Snapshot ID you'd find in the RDS console, e.g:
  # rds:production-2015-06-26-06-05.
  snapshot_identifier = null

  # Specifies whether the DB instance is encrypted.
  storage_encrypted = true

  # The type of storage to use for the primary instance. Must be one of 'standard'
  # (magnetic), 'gp2' (general purpose SSD), 'gp3' (general purpose SSD that needs
  # iops independently), or 'io1' (provisioned IOPS SSD).
  storage_type = "gp2"

  # Trigger an alarm if the number of connections to the DB instance goes above this
  # threshold.
  too_many_db_connections_threshold = null

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEma
  # l.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching'
  # or 'notBreaching'.
  too_many_db_connections_treat_missing_data = "missing"

}


```

</TabItem>
</Tabs>



## Reference


<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="allocated_storage" requirement="required" type="number">
<HclListItemDescription>

The amount of storage space the DB should use, in GB.

</HclListItemDescription>
</HclListItem>

<HclListItem name="engine_version" requirement="required" type="string">
<HclListItemDescription>

The version of <a href="#engine"><code>engine</code></a> to use (e.g. 8.0.17 for mysql).

</HclListItemDescription>
</HclListItem>

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name used to namespace all the RDS resources created by these templates, including the cluster and cluster instances (e.g. mysql-stage). Must be unique in this region. Must be a lowercase string.

</HclListItemDescription>
</HclListItem>

<HclListItem name="subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

The list of IDs of the subnets in which to deploy RDS. The list must only contain subnets in <a href="#vpc_id"><code>vpc_id</code></a>.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the VPC in which to deploy RDS.

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

The list of network CIDR blocks to allow network access to RDS from. One of <a href="#allow_connections_from_cidr_blocks"><code>allow_connections_from_cidr_blocks</code></a> or <a href="#allow_connections_from_security_groups"><code>allow_connections_from_security_groups</code></a> must be specified for the database to be reachable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_security_groups" requirement="optional" type="list(string)">
<HclListItemDescription>

The list of IDs or Security Groups to allow network access to RDS from. All security groups must either be in the VPC specified by <a href="#vpc_id"><code>vpc_id</code></a>, or a peered VPC with the VPC specified by <a href="#vpc_id"><code>vpc_id</code></a>. One of <a href="#allow_connections_from_cidr_blocks"><code>allow_connections_from_cidr_blocks</code></a> or <a href="#allow_connections_from_security_groups"><code>allow_connections_from_security_groups</code></a> must be specified for the database to be reachable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_manage_key_permissions_with_iam" requirement="optional" type="bool">
<HclListItemDescription>

If true, both the CMK's Key Policy and IAM Policies (permissions) can be used to grant permissions on the CMK. If false, only the CMK's Key Policy can be used to grant permissions on the CMK. False is more secure (and generally preferred), but true is more flexible and convenient.

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

Indicates that minor engine upgrades will be applied automatically to the DB instance during the maintenance window. If set to true, you should set <a href="#engine_version"><code>engine_version</code></a> to MAJOR.MINOR and omit the .PATCH at the end (e.g., use 5.7 and not 5.7.11); otherwise, you'll get Terraform state drift. See https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/db_instance.html#engine_version for more details.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="aws_db_security_group_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the aws_db_security_group that is created. Defaults to <a href="#name"><code>name</code></a> if not specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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

How many days to keep backup snapshots around before cleaning them up. Must be 1 or greater to support read replicas.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="backup_window" requirement="optional" type="string">
<HclListItemDescription>

The daily time range during which automated backups are created (e.g. 04:00-09:00). Time zone is UTC. Performance may be degraded while a backup runs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;06:00-07:00&quot;"/>
</HclListItem>

<HclListItem name="cmk_administrator_iam_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs for users who should be given administrator access to this CMK (e.g. arn:aws:iam::&lt;aws-account-id>:user/&lt;iam-user-arn>). If this list is empty, and <a href="#kms_key_arn"><code>kms_key_arn</code></a> is null, the ARN of the current user will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cmk_external_user_iam_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs for users from external AWS accounts who should be given permissions to use this CMK (e.g. arn:aws:iam::&lt;aws-account-id>:root).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cmk_user_iam_arns" requirement="optional" type="list(object(…))">
<HclListItemDescription>

A list of IAM ARNs for users who should be given permissions to use this CMK (e.g.  arn:aws:iam::&lt;aws-account-id>:user/&lt;iam-user-arn>). If this list is empty, and <a href="#kms_key_arn"><code>kms_key_arn</code></a> is null, the ARN of the current user will be used.

</HclListItemDescription>
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
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
  [
    {
      name    = "arn:aws:iam::0000000000:user/dev"
      conditions = [{
        test     = "StringLike"
        variable = "kms:ViaService"
        values   = ["s3.ca-central-1.amazonaws.com"]
      }]
    },
  ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="copy_tags_to_snapshot" requirement="optional" type="bool">
<HclListItemDescription>

Copy all the RDS instance tags to snapshots. Default is false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="create_custom_kms_key" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, create a KMS CMK and use it to encrypt data on disk in the database. The permissions for this CMK will be assigned by the following variables: cmk_administrator_iam_arns, cmk_user_iam_arns, cmk_external_user_iam_arns, allow_manage_key_permissions.

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

<HclListItem name="custom_parameter_group" requirement="optional" type="object(…)">
<HclListItemDescription>

Configure a custom parameter group for the RDS DB. This will create a new parameter group with the given parameters. When null, the database will be launched with the default parameter group.

</HclListItemDescription>
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
<HclGeneralListItem title="More Details">
<details>


```hcl

     The family of the DB parameter group.

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

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the RDS Instance and the Security Group created for it. The key is the tag name and the value is the tag value.

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

<HclListItem name="db_config_secrets_manager_id" requirement="optional" type="string">
<HclListItemDescription>

The friendly name or ARN of an AWS Secrets Manager secret that contains database configuration information in the format outlined by this document: https://docs.aws.amazon.com/secretsmanager/latest/userguide/best-practices.html. The engine, username, password, dbname, and port fields must be included in the JSON. Note that even with this precaution, this information will be stored in plaintext in the Terraform state file! See the following blog post for more details: https://blog.gruntwork.io/a-comprehensive-guide-to-managing-secrets-in-your-terraform-code-1d586955ace1. If you do not wish to use Secrets Manager, leave this as null, and use the master_username, master_password, db_name, engine, and port variables.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="db_name" requirement="optional" type="string">
<HclListItemDescription>

The name for your database of up to 8 alpha-numeric characters. If you do not provide a name, Amazon RDS will not create an empty database on the RDS instance. This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="delete_automated_backups" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether to remove automated backups immediately after the DB instance is deleted

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
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

Enable deletion protection on the RDS instance. If this is enabled, the database cannot be deleted prior to disabling

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

List of log types to enable for exporting to CloudWatch logs. If omitted, no logs will be exported. Valid values (depending on engine): alert, audit, error, general, listener, slowquery, trace, postgresql (PostgreSQL) and upgrade (PostgreSQL).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="engine" requirement="optional" type="string">
<HclListItemDescription>

The DB engine to use (e.g. mysql). This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id.

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

<HclListItem name="hosted_zone_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the Route 53 hosted zone into which the Route 53 DNS record should be written

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="iam_database_authentication_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether mappings of AWS Identity and Access Management (IAM) accounts to database accounts is enabled. Disabled by default.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="instance_type" requirement="optional" type="string">
<HclListItemDescription>

The instance type to use for the db (e.g. db.t3.micro)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;db.t3.micro&quot;"/>
</HclListItem>

<HclListItem name="iops" requirement="optional" type="number">
<HclListItemDescription>

The amount of provisioned IOPS for the primary instance. Setting this implies a storage_type of 'io1'. Can only be set when storage_type is 'gp3' or 'io1'. Set to 0 to disable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

The Amazon Resource Name (ARN) of an existing KMS customer master key (CMK) that will be used to encrypt/decrypt backup files. If you leave this blank, the default RDS KMS key for the account will be used. If you set <a href="#create_custom_kms_key"><code>create_custom_kms_key</code></a> to true, this value will be ignored and a custom key will be created and used instead.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="license_model" requirement="optional" type="string">
<HclListItemDescription>

The license model to use for this DB. Check the docs for your RDS DB for available license models. Set to an empty string to use the default.

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

<HclListItem name="maintenance_window" requirement="optional" type="string">
<HclListItemDescription>

The weekly day and time range during which system maintenance can occur (e.g. wed:04:00-wed:04:30). Time zone is UTC. Performance may be degraded or there may even be a downtime during maintenance windows.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;sun:07:00-sun:08:00&quot;"/>
</HclListItem>

<HclListItem name="master_password" requirement="optional" type="string">
<HclListItemDescription>

The value to use for the master password of the database. This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="master_username" requirement="optional" type="string">
<HclListItemDescription>

The value to use for the master username of the database. This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="max_allocated_storage" requirement="optional" type="number">
<HclListItemDescription>

When configured, the upper limit to which Amazon RDS can automatically scale the storage of the DB instance. Configuring this will automatically ignore differences to allocated_storage. Must be greater than or equal to allocated_storage or 0 to disable Storage Autoscaling.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="monitoring_interval" requirement="optional" type="number">
<HclListItemDescription>

The interval, in seconds, between points when Enhanced Monitoring metrics are collected for the DB instance. To disable collecting Enhanced Monitoring metrics, specify 0. Valid Values: 0, 1, 5, 10, 15, 30, 60. Enhanced Monitoring metrics are useful when you want to see how different processes or threads on a DB instance use the CPU.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="monitoring_role_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN for the IAM role that permits RDS to send enhanced monitoring metrics to CloudWatch Logs. If monitoring_interval is greater than 0, but monitoring_role_arn is left as an empty string, a default IAM role that allows enhanced monitoring will be created.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="monitoring_role_arn_path" requirement="optional" type="string">
<HclListItemDescription>

Optionally add a path to the IAM monitoring role. If left blank, it will default to just /.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;/&quot;"/>
</HclListItem>

<HclListItem name="monitoring_role_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the enhanced_monitoring_role that is created. Defaults to <a href="#name"><code>name</code></a>-monitoring-role if not specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="multi_az" requirement="optional" type="bool">
<HclListItemDescription>

Specifies if a standby instance should be deployed in another availability zone. If the primary fails, this instance will automatically take over.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="num_read_replicas" requirement="optional" type="number">
<HclListItemDescription>

The number of read replicas to deploy

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="option_group_name" requirement="optional" type="string">
<HclListItemDescription>

Name of a DB option group to associate.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="performance_insights_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether Performance Insights are enabled. Performance Insights can be enabled for specific versions of database engines. See https://aws.amazon.com/rds/performance-insights/ for more details.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="port" requirement="optional" type="number">
<HclListItemDescription>

The port the DB will listen on (e.g. 3306). Alternatively, this can be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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

<HclListItem name="replica_backup_retention_period" requirement="optional" type="number">
<HclListItemDescription>

How many days to keep backup snapshots around before cleaning them up on the read replicas. Must be 1 or greater to support read replicas. 0 means disable automated backups.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="replica_domain_name" requirement="optional" type="string">
<HclListItemDescription>

The domain name to create a route 53 record for the read replicas of the RDS database.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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

If set to true, take periodic snapshots of the RDS DB that should be shared with another account.

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

Specifies whether the DB instance is encrypted.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="storage_type" requirement="optional" type="string">
<HclListItemDescription>

The type of storage to use for the primary instance. Must be one of 'standard' (magnetic), 'gp2' (general purpose SSD), 'gp3' (general purpose SSD that needs iops independently), or 'io1' (provisioned IOPS SSD).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;gp2&quot;"/>
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

<HclListItem name="too_many_db_connections_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="all_metric_widgets">
<HclListItemDescription>

A list of all the CloudWatch Dashboard metric widgets available in this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="db_name">
<HclListItemDescription>

The name of the empty database created on this RDS DB instance.

</HclListItemDescription>
</HclListItem>

<HclListItem name="metric_widget_rds_cpu_usage">
<HclListItemDescription>

A CloudWatch Dashboard widget that graphs CPU usage (percentage) on the RDS DB instance.

</HclListItemDescription>
</HclListItem>

<HclListItem name="metric_widget_rds_db_connections">
<HclListItemDescription>

A CloudWatch Dashboard widget that graphs the number of active database connections on the RDS DB Instance.

</HclListItemDescription>
</HclListItem>

<HclListItem name="metric_widget_rds_disk_space">
<HclListItemDescription>

A CloudWatch Dashboard widget that graphs available disk space (in bytes) on the RDS DB instance.

</HclListItemDescription>
</HclListItem>

<HclListItem name="metric_widget_rds_memory">
<HclListItemDescription>

A CloudWatch Dashboard widget that graphs available memory (in bytes) on the RDS DB instance.

</HclListItemDescription>
</HclListItem>

<HclListItem name="metric_widget_rds_read_latency">
<HclListItemDescription>

A CloudWatch Dashboard widget that graphs the average amount of time taken per disk I/O operation on reads.

</HclListItemDescription>
</HclListItem>

<HclListItem name="metric_widget_rds_write_latency">
<HclListItemDescription>

A CloudWatch Dashboard widget that graphs the average amount of time taken per disk I/O operation on writes.

</HclListItemDescription>
</HclListItem>

<HclListItem name="name">
<HclListItemDescription>

The name of the RDS DB instance.

</HclListItemDescription>
</HclListItem>

<HclListItem name="num_read_replicas">
<HclListItemDescription>

The number of read replicas for the RDS DB instance.

</HclListItemDescription>
</HclListItem>

<HclListItem name="port">
<HclListItemDescription>

The port of the RDS DB instance.

</HclListItemDescription>
</HclListItem>

<HclListItem name="primary_arn">
<HclListItemDescription>

The ARN of the RDS DB instance.

</HclListItemDescription>
</HclListItem>

<HclListItem name="primary_endpoint">
<HclListItemDescription>

The endpoint of the RDS DB instance that you can make requests to.

</HclListItemDescription>
</HclListItem>

<HclListItem name="primary_host">
<HclListItemDescription>

The host portion of the RDS DB instance endpoint. primary_endpoint is in the form '&lt;host>:&lt;port>', and this output returns just the host part.

</HclListItemDescription>
</HclListItem>

<HclListItem name="primary_id">
<HclListItemDescription>

The ID of the RDS DB instance.

</HclListItemDescription>
</HclListItem>

<HclListItem name="read_replica_arns">
<HclListItemDescription>

A list of ARNs of the RDS DB instance's read replicas.

</HclListItemDescription>
</HclListItem>

<HclListItem name="read_replica_endpoints">
<HclListItemDescription>

A list of endpoints of the RDS DB instance's read replicas.

</HclListItemDescription>
</HclListItem>

<HclListItem name="read_replica_ids">
<HclListItemDescription>

A list of IDs of the RDS DB instance's read replicas.

</HclListItemDescription>
</HclListItem>

<HclListItem name="security_group_id">
<HclListItemDescription>

The ID of the Security Group that controls access to the RDS DB instance.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.102.13/modules/data-stores/rds/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.102.13/modules/data-stores/rds/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.102.13/modules/data-stores/rds/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "1ef05e2cb284de9cc2fd58cb33b2d9ae"
}
##DOCS-SOURCER-END -->
