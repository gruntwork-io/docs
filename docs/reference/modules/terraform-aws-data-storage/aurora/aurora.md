---
title: "Aurora Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Data Storage Modules" version="0.26.0" />

# Aurora Module

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/tree/main/modules/aurora" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

This module creates an Amazon Relational Database Service (RDS) cluster that can run [Amazon Aurora](https://aws.amazon.com/rds/aurora/), Amazon’s cloud-native relational database. The cluster is managed by AWS and automatically handles standby failover, read replicas, backups, patching, and encryption.

![RDS architecture](/img/reference/modules/terraform-aws-data-storage/aurora/rds-architecture.png)

## Features

*   Deploy a fully-managed, cloud-native relational database

*   MySQL and PostgreSQL compatibility

*   Automatic failover to a standby in another availability zone

*   Read replicas

*   Automatic nightly snapshots

*   Automatic scaling of storage

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/)!

### Core concepts

*   [What is Amazon RDS?](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/main/modules/aurora/core-concepts.md#what-is-amazon-rds)

*   [Common gotchas with RDS](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/main/modules/aurora/core-concepts.md#common-gotchas)

*   [RDS documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html): Amazon’s docs for RDS that cover core concepts such as the types of databases supported, security, backup & restore, and monitoring.

*   *[Designing Data Intensive Applications](https://dataintensive.net)*: the best book we’ve found for understanding data systems, including relational databases, NoSQL, replication, sharding, consistency, and so on.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples folder](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/main/examples): The `examples` folder contains sample code optimized for learning, experimenting, and testing (but not production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [rds module in the Acme example Reference Architecture](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/tree/5fcefff/data-stores/rds): Production-ready sample code from the Acme Reference Architecture examples.

## Manage

### Day-to-day operations

*   [How to connect to an Aurora instance](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/main/modules/aurora/core-concepts.md#how-do-you-connect-to-the-database)

*   [How to authenticate to RDS with IAM](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAM.html)

*   [How to scale Aurora](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/main/modules/aurora/core-concepts.md#how-do-you-scale-this-database)

*   [How to backup Aurora snapshots to a separate AWS account](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/main/modules/lambda-create-snapshot#how-do-you-backup-your-rds-snapshots-to-a-separate-aws-account)

### Major changes

*   [Upgrading a DB instance](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_UpgradeDBInstance.Upgrading.html)

*   [Restoring from a DB snapshot](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_RestoreFromSnapshot.html)

*   [Point in time restore](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_PIT.html)

## Sample Usage

<ModuleUsage>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S AURORA MODULE
# ------------------------------------------------------------------------------------------------------

module "aurora" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/aurora?ref=v0.26.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # How many instances to launch. RDS will automatically pick a leader and configure
  # the others as replicas.
  instance_count = <INPUT REQUIRED>

  # The instance type from an Amazon Aurora supported instance class based on a
  # selected engine_mode. Amazon Aurora supports 2 types of instance classes: Memory
  # Optimized (db.r) and Burstable Performance (db.t). Aurora Global Clusters
  # require instance class of either db.r5 (latest) or db.r4 (current). See AWS
  # documentation on Amazon Aurora supported instance class types:
  # https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.DBInstance
  # lass.html#Concepts.DBInstanceClass.Types
  instance_type = <INPUT REQUIRED>

  # The name used to namespace all resources created by these templates, including
  # the cluster and cluster instances (e.g. drupaldb). Must be unique in this
  # region. Must be a lowercase string.
  name = <INPUT REQUIRED>

  # A list of subnet ids where the database instances should be deployed. In the
  # standard Gruntwork VPC setup, these should be the private persistence subnet
  # ids. This is ignored if create_subnet_group=false.
  subnet_ids = <INPUT REQUIRED>

  # The id of the VPC in which this DB should be deployed.
  vpc_id = <INPUT REQUIRED>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of CIDR-formatted IP address ranges that can connect to this DB. In the
  # standard Gruntwork VPC setup, these should be the CIDR blocks of the private app
  # subnets, plus the private subnets in the mgmt VPC.
  allow_connections_from_cidr_blocks = []

  # Specifies a list of Security Groups to allow connections from.
  allow_connections_from_security_groups = []

  # Enable to allow major engine version upgrades when changing engine versions.
  allow_major_version_upgrade = false

  # Specifies whether any cluster modifications are applied immediately, or during
  # the next maintenance window. Note that cluster modifications may cause degraded
  # performance or downtime.
  apply_immediately = false

  # Configure the auto minor version upgrade behavior. This is applied to the
  # cluster instances and indicates if the automatic minor version upgrade of the
  # engine is allowed. Default value is true.
  auto_minor_version_upgrade = true

  # The description of the aws_db_security_group that is created. Defaults to
  # 'Security group for the var.name DB' if not specified.
  aws_db_security_group_description = null

  # The name of the aws_db_security_group that is created. Defaults to var.name if
  # not specified.
  aws_db_security_group_name = null

  # The description of the aws_db_subnet_group that is created. Defaults to 'Subnet
  # group for the var.name DB' if not specified.
  aws_db_subnet_group_description = null

  # The name of the aws_db_subnet_group that is created, or an existing one to use
  # if create_subnet_group is false. Defaults to var.name if not specified.
  aws_db_subnet_group_name = null

  # Window to allow Aurora Backtrack a special, in-place, destructive rollback for
  # the entire cluster. Must be specified in seconds. 0=disabled, to maximum of
  # 259200
  backtrack_window = null

  # How many days to keep backup snapshots around before cleaning them up
  backup_retention_period = 21

  # The Certificate Authority (CA) certificate bundle to use on the Aurora DB
  # instances.
  ca_cert_identifier = null

  # List of IAM role ARNs to attach to the cluster. Be sure these roles exists. They
  # will not be created here. Serverless aurora does not support attaching IAM
  # roles.
  cluster_iam_roles = []

  # Amount of time, in minutes, to allow for DB maintenance windows for the cluster
  # instances
  cluster_instances_maintenance_duration_minutes = 120

  # The cluster instances maintenance window start in RFC 3339 timestamp (date and
  # time) format. The default starts at "wed:00:00-wed:02:00". Can have any date
  # from any year, only the day of the week will be used. Performance may be
  # degraded or there may even be a downtime during maintenance windows.
  cluster_instances_maintenance_window_start_timestamp = "2017-11-22T00:00:00Z"

  # Amount of time, in minutes, between maintenance windows of the cluster instances
  cluster_instances_minutes_between_maintenance_windows = 180

  # Copy all the Aurora cluster tags to snapshots. Default is false.
  copy_tags_to_snapshot = false

  # If false, the DB will bind to aws_db_subnet_group_name and the CIDR will be
  # ignored (allow_connections_from_cidr_blocks).
  create_subnet_group = true

  # Timeout for DB creating
  creating_timeout = "120m"

  # A map of custom tags to apply to the Aurora RDS Instance and the Security Group
  # created for it. The key is the tag name and the value is the tag value.
  custom_tags = {}

  # A cluster parameter group to associate with the cluster. Parameters in a DB
  # cluster parameter group apply to every DB instance in a DB cluster.
  db_cluster_parameter_group_name = null

  # An instance parameter group to associate with the cluster instances. Parameters
  # in a DB parameter group apply to a single DB instance in an Aurora DB cluster.
  db_instance_parameter_group_name = null

  # The name for your database of up to 8 alpha-numeric characters. If you do not
  # provide a name, Amazon RDS will not create a database in the DB cluster you are
  # creating.
  db_name = null

  # Timeout for DB deleting
  deleting_timeout = "120m"

  # If the DB instance should have deletion protection enabled. The database can't
  # be deleted when this value is set to true.
  deletion_protection = false

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values in
  # this list such that those resources need to be created before the resources in
  # this module, and the resources in this module need to be destroyed before the
  # resources in the list.
  dependencies = []

  # If true, enables the HTTP endpoint used for Data API. Only valid when
  # engine_mode is set to serverless.
  enable_http_endpoint = null

  # If non-empty, the Aurora cluster will export the specified logs to Cloudwatch.
  # Must be zero or more of: audit, error, general and slowquery
  enabled_cloudwatch_logs_exports = []

  # The name of the database engine to be used for this DB cluster. Valid Values:
  # aurora (for MySQL 5.6-compatible Aurora), aurora-mysql (for MySQL 5.7-compatible
  # Aurora), and aurora-postgresql
  engine = "aurora-mysql"

  # The DB engine mode of the DB cluster: either provisioned, serverless,
  # parallelquery, multimaster or global which only applies for global database
  # clusters created with Aurora MySQL version 5.6.10a. For higher Aurora MySQL
  # versions, the clusters in a global database use provisioned engine mode..
  # Limitations and requirements apply to some DB engine modes. See AWS
  # documentation:
  # https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraSettingU
  # .html
  engine_mode = "provisioned"

  # The Amazon Aurora DB engine version for the selected engine and engine_mode.
  # Note: Starting with Aurora MySQL 2.03.2, Aurora engine versions have the
  # following syntax <mysql-major-version>.mysql_aurora.<aurora-mysql-version>. e.g.
  # 5.7.mysql_aurora.2.08.1.
  engine_version = null

  # The name of the final_snapshot_identifier. Defaults to var.name-final-snapshot
  # if not specified.
  final_snapshot_name = null

  # Global cluster identifier when creating the global secondary cluster.
  global_cluster_identifier = null

  # Specifies whether mappings of AWS Identity and Access Management (IAM) accounts
  # to database accounts is enabled. Disabled by default.
  iam_database_authentication_enabled = false

  # Implements a cluster that disables terraform from updating the master_password. 
  # Useful when managing secrets outside of terraform (ex. using AWS Secrets Manager
  # Rotations).  Note changing this value will switch the cluster resource.  To
  # avoid deleting your old database and creating a new one, you will need to run
  # `terraform state mv` when changing this variable
  ignore_password_changes = false

  # The ARN of a KMS key that should be used to encrypt data on disk. Only used if
  # var.storage_encrypted is true. If you leave this null, the default RDS KMS key
  # for the account will be used.
  kms_key_arn = null

  # The password for the master user. Required unless this is a secondary database
  # in a global Aurora cluster. If var.snapshot_identifier is non-empty, this value
  # is ignored.
  master_password = null

  # The username for the master user. Required unless this is a secondary database
  # in a global Aurora cluster.
  master_username = null

  # The interval, in seconds, between points when Enhanced Monitoring metrics are
  # collected for the DB instance. To disable collecting Enhanced Monitoring
  # metrics, specify 0. Allowed values: 0, 1, 5, 15, 30, 60. Enhanced Monitoring
  # metrics are useful when you want to see how different processes or threads on a
  # DB instance use the CPU.
  monitoring_interval = 0

  # The ARN for the IAM role that permits RDS to send enhanced monitoring metrics to
  # CloudWatch Logs. Be sure this role exists. It will not be created here. You must
  # specify a MonitoringInterval value other than 0 when you specify a
  # MonitoringRoleARN value that is not empty string.
  monitoring_role_arn = null

  # Specifies whether Performance Insights is enabled or not. On Aurora MySQL,
  # Performance Insights is not supported on db.t2 or db.t3 DB instance classes.
  performance_insights_enabled = false

  # The ARN for the KMS key to encrypt Performance Insights data.
  performance_insights_kms_key_id = null

  # The port the DB will listen on (e.g. 3306)
  port = 3306

  # The daily time range during which automated backups are created (e.g.
  # 04:00-09:00). Time zone is UTC. Performance may be degraded while a backup runs.
  preferred_backup_window = "06:00-07:00"

  # The weekly day and time range during which cluster maintenance can occur (e.g.
  # wed:04:00-wed:04:30). Time zone is UTC. Performance may be degraded or there may
  # even be a downtime during maintenance windows. For cluster instance maintenance,
  # see "cluster_instances_maintenance_window_start_timestamp"
  preferred_maintenance_window = "sun:07:00-sun:08:00"

  # If you wish to make your database accessible from the public Internet, set this
  # flag to true (WARNING: NOT RECOMMENDED FOR PRODUCTION USAGE!!). The default is
  # false, which means the database is only accessible from within the VPC, which is
  # much more secure.
  publicly_accessible = false

  # ARN of a source DB cluster or DB instance if this DB cluster is to be created as
  # a Read Replica.
  replication_source_identifier = null

  # If non-empty, the Aurora cluster will be restored from the given source cluster
  # using the latest restorable time. Can only be used if snapshot_identifier is
  # null. For more information see
  # https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_PIT.html
  restore_source_cluster_identifier = null

  # Only used if 'restore_source_cluster_identifier' is non-empty. Date and time in
  # UTC format to restore the database cluster to (e.g, 2009-09-07T23:45:00Z). When
  # null, the latest restorable time will be used.
  restore_to_time = null

  # Only used if 'restore_source_cluster_identifier' is non-empty. Type of restore
  # to be performed. Valid options are 'full-copy' and 'copy-on-write'.
  restore_type = null

  # Whether to enable automatic pause. A DB cluster can be paused only when it's
  # idle (it has no connections). If a DB cluster is paused for more than seven
  # days, the DB cluster might be backed up with a snapshot. In this case, the DB
  # cluster is restored when there is a request to connect to it.
  scaling_configuration_auto_pause = true

  # The maximum capacity. The maximum capacity must be greater than or equal to the
  # minimum capacity. Valid capacity values are 2, 4, 8, 16, 32, 64, 128, and 256.
  scaling_configuration_max_capacity = 256

  # The maximum capacity for an Aurora DB cluster in provisioned DB engine mode. The
  # maximum capacity must be greater than or equal to the minimum capacity. Valid
  # capacity values are in a range of 0.5 up to 128 in steps of 0.5.
  scaling_configuration_max_capacity_V2 = 0.5

  # The minimum capacity. The minimum capacity must be lesser than or equal to the
  # maximum capacity. Valid capacity values are 2, 4, 8, 16, 32, 64, 128, and 256.
  scaling_configuration_min_capacity = 2

  # The minimum capacity for an Aurora DB cluster in provisioned DB engine mode. The
  # minimum capacity must be lesser than or equal to the maximum capacity. Valid
  # capacity values are in a range of 0.5 up to 128 in steps of 0.5.
  scaling_configuration_min_capacity_V2 = 128

  # The time, in seconds, before an Aurora DB cluster in serverless mode is paused.
  # Valid values are 300 through 86400.
  scaling_configuration_seconds_until_auto_pause = 300

  # The action to take when the timeout is reached. Valid values:
  # ForceApplyCapacityChange, RollbackCapacityChange. Defaults to
  # RollbackCapacityChange.
  scaling_configuration_timeout_action = "RollbackCapacityChange"

  # Determines whether a final DB snapshot is created before the DB instance is
  # deleted. Be very careful setting this to true; if you do, and you delete this DB
  # instance, you will not have any backups of the data!
  skip_final_snapshot = false

  # If non-empty, the Aurora cluster will be restored from the given Snapshot ID.
  # This is the Snapshot ID you'd find in the RDS console, e.g:
  # rds:production-2015-06-26-06-05.
  snapshot_identifier = null

  # Source region for global secondary cluster (if creating a global cluster) or the
  # master cluster (if creating a read replica cluster).
  source_region = null

  # Specifies whether the DB cluster uses encryption for data at rest in the
  # underlying storage for the DB, its automated backups, Read Replicas, and
  # snapshots. Uses the default aws/rds key in KMS.
  storage_encrypted = true

  # Timeout for DB updating
  updating_timeout = "120m"

}

```

</ModuleUsage>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="instance_count" requirement="required" type="number">
<HclListItemDescription>

How many instances to launch. RDS will automatically pick a leader and configure the others as replicas.

</HclListItemDescription>
</HclListItem>

<HclListItem name="instance_type" requirement="required" type="string">
<HclListItemDescription>

The instance type from an Amazon Aurora supported instance class based on a selected engine_mode. Amazon Aurora supports 2 types of instance classes: Memory Optimized (db.r) and Burstable Performance (db.t). Aurora Global Clusters require instance class of either db.r5 (latest) or db.r4 (current). See AWS documentation on Amazon Aurora supported instance class types: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.DBInstanceClass.html#Concepts.DBInstanceClass.Types

</HclListItemDescription>
</HclListItem>

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name used to namespace all resources created by these templates, including the cluster and cluster instances (e.g. drupaldb). Must be unique in this region. Must be a lowercase string.

</HclListItemDescription>
</HclListItem>

<HclListItem name="subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

A list of subnet ids where the database instances should be deployed. In the standard Gruntwork VPC setup, these should be the private persistence subnet ids. This is ignored if create_subnet_group=false.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The id of the VPC in which this DB should be deployed.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="allow_connections_from_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of CIDR-formatted IP address ranges that can connect to this DB. In the standard Gruntwork VPC setup, these should be the CIDR blocks of the private app subnets, plus the private subnets in the mgmt VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_security_groups" requirement="optional" type="list(string)">
<HclListItemDescription>

Specifies a list of Security Groups to allow connections from.

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

<HclListItem name="aws_db_security_group_description" requirement="optional" type="string">
<HclListItemDescription>

The description of the aws_db_security_group that is created. Defaults to 'Security group for the <a href="#name"><code>name</code></a> DB' if not specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="aws_db_security_group_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the aws_db_security_group that is created. Defaults to <a href="#name"><code>name</code></a> if not specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="aws_db_subnet_group_description" requirement="optional" type="string">
<HclListItemDescription>

The description of the aws_db_subnet_group that is created. Defaults to 'Subnet group for the <a href="#name"><code>name</code></a> DB' if not specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="aws_db_subnet_group_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the aws_db_subnet_group that is created, or an existing one to use if create_subnet_group is false. Defaults to <a href="#name"><code>name</code></a> if not specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="backtrack_window" requirement="optional" type="number">
<HclListItemDescription>

Window to allow Aurora Backtrack a special, in-place, destructive rollback for the entire cluster. Must be specified in seconds. 0=disabled, to maximum of 259200

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="backup_retention_period" requirement="optional" type="number">
<HclListItemDescription>

How many days to keep backup snapshots around before cleaning them up

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="21"/>
</HclListItem>

<HclListItem name="ca_cert_identifier" requirement="optional" type="string">
<HclListItemDescription>

The Certificate Authority (CA) certificate bundle to use on the Aurora DB instances.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_iam_roles" requirement="optional" type="list(string)">
<HclListItemDescription>

List of IAM role ARNs to attach to the cluster. Be sure these roles exists. They will not be created here. Serverless aurora does not support attaching IAM roles.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cluster_instances_maintenance_duration_minutes" requirement="optional" type="number">
<HclListItemDescription>

Amount of time, in minutes, to allow for DB maintenance windows for the cluster instances

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="120"/>
</HclListItem>

<HclListItem name="cluster_instances_maintenance_window_start_timestamp" requirement="optional" type="string">
<HclListItemDescription>

The cluster instances maintenance window start in RFC 3339 timestamp (date and time) format. The default starts at 'wed:00:00-wed:02:00'. Can have any date from any year, only the day of the week will be used. Performance may be degraded or there may even be a downtime during maintenance windows.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;2017-11-22T00:00:00Z&quot;"/>
</HclListItem>

<HclListItem name="cluster_instances_minutes_between_maintenance_windows" requirement="optional" type="number">
<HclListItemDescription>

Amount of time, in minutes, between maintenance windows of the cluster instances

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="180"/>
</HclListItem>

<HclListItem name="copy_tags_to_snapshot" requirement="optional" type="bool">
<HclListItemDescription>

Copy all the Aurora cluster tags to snapshots. Default is false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="create_subnet_group" requirement="optional" type="bool">
<HclListItemDescription>

If false, the DB will bind to aws_db_subnet_group_name and the CIDR will be ignored (allow_connections_from_cidr_blocks).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="creating_timeout" requirement="optional" type="string">
<HclListItemDescription>

Timeout for DB creating

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;120m&quot;"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the Aurora RDS Instance and the Security Group created for it. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="db_cluster_parameter_group_name" requirement="optional" type="string">
<HclListItemDescription>

A cluster parameter group to associate with the cluster. Parameters in a DB cluster parameter group apply to every DB instance in a DB cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="db_instance_parameter_group_name" requirement="optional" type="string">
<HclListItemDescription>

An instance parameter group to associate with the cluster instances. Parameters in a DB parameter group apply to a single DB instance in an Aurora DB cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="db_name" requirement="optional" type="string">
<HclListItemDescription>

The name for your database of up to 8 alpha-numeric characters. If you do not provide a name, Amazon RDS will not create a database in the DB cluster you are creating.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="deleting_timeout" requirement="optional" type="string">
<HclListItemDescription>

Timeout for DB deleting

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;120m&quot;"/>
</HclListItem>

<HclListItem name="deletion_protection" requirement="optional" type="bool">
<HclListItemDescription>

If the DB instance should have deletion protection enabled. The database can't be deleted when this value is set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="dependencies" requirement="optional" type="list(string)">
<HclListItemDescription>

Create a dependency between the resources in this module to the interpolated values in this list (and thus the source resources). In other words, the resources in this module will now depend on the resources backing the values in this list such that those resources need to be created before the resources in this module, and the resources in this module need to be destroyed before the resources in the list.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="enable_http_endpoint" requirement="optional" type="bool">
<HclListItemDescription>

If true, enables the HTTP endpoint used for Data API. Only valid when engine_mode is set to serverless.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="enabled_cloudwatch_logs_exports" requirement="optional" type="list(string)">
<HclListItemDescription>

If non-empty, the Aurora cluster will export the specified logs to Cloudwatch. Must be zero or more of: audit, error, general and slowquery

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="engine" requirement="optional" type="string">
<HclListItemDescription>

The name of the database engine to be used for this DB cluster. Valid Values: aurora (for MySQL 5.6-compatible Aurora), aurora-mysql (for MySQL 5.7-compatible Aurora), and aurora-postgresql

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;aurora-mysql&quot;"/>
</HclListItem>

<HclListItem name="engine_mode" requirement="optional" type="string">
<HclListItemDescription>

The DB engine mode of the DB cluster: either provisioned, serverless, parallelquery, multimaster or global which only applies for global database clusters created with Aurora MySQL version 5.6.10a. For higher Aurora MySQL versions, the clusters in a global database use provisioned engine mode.. Limitations and requirements apply to some DB engine modes. See AWS documentation: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraSettingUp.html

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;provisioned&quot;"/>
</HclListItem>

<HclListItem name="engine_version" requirement="optional" type="string">
<HclListItemDescription>

The Amazon Aurora DB engine version for the selected engine and engine_mode. Note: Starting with Aurora MySQL 2.03.2, Aurora engine versions have the following syntax &lt;mysql-major-version>.mysql_aurora.&lt;aurora-mysql-version>. e.g. 5.7.mysql_aurora.2.08.1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="final_snapshot_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the final_snapshot_identifier. Defaults to <a href="#name"><code>name</code></a>-final-snapshot if not specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="global_cluster_identifier" requirement="optional" type="string">
<HclListItemDescription>

Global cluster identifier when creating the global secondary cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="iam_database_authentication_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether mappings of AWS Identity and Access Management (IAM) accounts to database accounts is enabled. Disabled by default.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="ignore_password_changes" requirement="optional" type="bool">
<HclListItemDescription>

Implements a cluster that disables terraform from updating the master_password.  Useful when managing secrets outside of terraform (ex. using AWS Secrets Manager Rotations).  Note changing this value will switch the cluster resource.  To avoid deleting your old database and creating a new one, you will need to run `terraform state mv` when changing this variable

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of a KMS key that should be used to encrypt data on disk. Only used if <a href="#storage_encrypted"><code>storage_encrypted</code></a> is true. If you leave this null, the default RDS KMS key for the account will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="master_password" requirement="optional" type="string">
<HclListItemDescription>

The password for the master user. Required unless this is a secondary database in a global Aurora cluster. If <a href="#snapshot_identifier"><code>snapshot_identifier</code></a> is non-empty, this value is ignored.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="master_username" requirement="optional" type="string">
<HclListItemDescription>

The username for the master user. Required unless this is a secondary database in a global Aurora cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="monitoring_interval" requirement="optional" type="number">
<HclListItemDescription>

The interval, in seconds, between points when Enhanced Monitoring metrics are collected for the DB instance. To disable collecting Enhanced Monitoring metrics, specify 0. Allowed values: 0, 1, 5, 15, 30, 60. Enhanced Monitoring metrics are useful when you want to see how different processes or threads on a DB instance use the CPU.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="monitoring_role_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN for the IAM role that permits RDS to send enhanced monitoring metrics to CloudWatch Logs. Be sure this role exists. It will not be created here. You must specify a MonitoringInterval value other than 0 when you specify a MonitoringRoleARN value that is not empty string.

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

The port the DB will listen on (e.g. 3306)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="3306"/>
</HclListItem>

<HclListItem name="preferred_backup_window" requirement="optional" type="string">
<HclListItemDescription>

The daily time range during which automated backups are created (e.g. 04:00-09:00). Time zone is UTC. Performance may be degraded while a backup runs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;06:00-07:00&quot;"/>
</HclListItem>

<HclListItem name="preferred_maintenance_window" requirement="optional" type="string">
<HclListItemDescription>

The weekly day and time range during which cluster maintenance can occur (e.g. wed:04:00-wed:04:30). Time zone is UTC. Performance may be degraded or there may even be a downtime during maintenance windows. For cluster instance maintenance, see 'cluster_instances_maintenance_window_start_timestamp'

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;sun:07:00-sun:08:00&quot;"/>
</HclListItem>

<HclListItem name="publicly_accessible" requirement="optional" type="bool">
<HclListItemDescription>

If you wish to make your database accessible from the public Internet, set this flag to true (WARNING: NOT RECOMMENDED FOR PRODUCTION USAGE!!). The default is false, which means the database is only accessible from within the VPC, which is much more secure.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="replication_source_identifier" requirement="optional" type="string">
<HclListItemDescription>

ARN of a source DB cluster or DB instance if this DB cluster is to be created as a Read Replica.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="restore_source_cluster_identifier" requirement="optional" type="string">
<HclListItemDescription>

If non-empty, the Aurora cluster will be restored from the given source cluster using the latest restorable time. Can only be used if snapshot_identifier is null. For more information see https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_PIT.html

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="restore_to_time" requirement="optional" type="string">
<HclListItemDescription>

Only used if 'restore_source_cluster_identifier' is non-empty. Date and time in UTC format to restore the database cluster to (e.g, 2009-09-07T23:45:00Z). When null, the latest restorable time will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="restore_type" requirement="optional" type="string">
<HclListItemDescription>

Only used if 'restore_source_cluster_identifier' is non-empty. Type of restore to be performed. Valid options are 'full-copy' and 'copy-on-write'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="scaling_configuration_auto_pause" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable automatic pause. A DB cluster can be paused only when it's idle (it has no connections). If a DB cluster is paused for more than seven days, the DB cluster might be backed up with a snapshot. In this case, the DB cluster is restored when there is a request to connect to it.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="scaling_configuration_max_capacity" requirement="optional" type="number">
<HclListItemDescription>

The maximum capacity. The maximum capacity must be greater than or equal to the minimum capacity. Valid capacity values are 2, 4, 8, 16, 32, 64, 128, and 256.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="256"/>
</HclListItem>

<HclListItem name="scaling_configuration_max_capacity_V2" requirement="optional" type="number">
<HclListItemDescription>

The maximum capacity for an Aurora DB cluster in provisioned DB engine mode. The maximum capacity must be greater than or equal to the minimum capacity. Valid capacity values are in a range of 0.5 up to 128 in steps of 0.5.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0.5"/>
</HclListItem>

<HclListItem name="scaling_configuration_min_capacity" requirement="optional" type="number">
<HclListItemDescription>

The minimum capacity. The minimum capacity must be lesser than or equal to the maximum capacity. Valid capacity values are 2, 4, 8, 16, 32, 64, 128, and 256.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="2"/>
</HclListItem>

<HclListItem name="scaling_configuration_min_capacity_V2" requirement="optional" type="number">
<HclListItemDescription>

The minimum capacity for an Aurora DB cluster in provisioned DB engine mode. The minimum capacity must be lesser than or equal to the maximum capacity. Valid capacity values are in a range of 0.5 up to 128 in steps of 0.5.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="128"/>
</HclListItem>

<HclListItem name="scaling_configuration_seconds_until_auto_pause" requirement="optional" type="number">
<HclListItemDescription>

The time, in seconds, before an Aurora DB cluster in serverless mode is paused. Valid values are 300 through 86400.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="scaling_configuration_timeout_action" requirement="optional" type="string">
<HclListItemDescription>

The action to take when the timeout is reached. Valid values: ForceApplyCapacityChange, RollbackCapacityChange. Defaults to RollbackCapacityChange.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;RollbackCapacityChange&quot;"/>
</HclListItem>

<HclListItem name="skip_final_snapshot" requirement="optional" type="bool">
<HclListItemDescription>

Determines whether a final DB snapshot is created before the DB instance is deleted. Be very careful setting this to true; if you do, and you delete this DB instance, you will not have any backups of the data!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="snapshot_identifier" requirement="optional" type="string">
<HclListItemDescription>

If non-empty, the Aurora cluster will be restored from the given Snapshot ID. This is the Snapshot ID you'd find in the RDS console, e.g: rds:production-2015-06-26-06-05.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="source_region" requirement="optional" type="string">
<HclListItemDescription>

Source region for global secondary cluster (if creating a global cluster) or the master cluster (if creating a read replica cluster).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="storage_encrypted" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether the DB cluster uses encryption for data at rest in the underlying storage for the DB, its automated backups, Read Replicas, and snapshots. Uses the default aws/rds key in KMS.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="updating_timeout" requirement="optional" type="string">
<HclListItemDescription>

Timeout for DB updating

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;120m&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="cluster_arn">
</HclListItem>

<HclListItem name="cluster_endpoint">
</HclListItem>

<HclListItem name="cluster_id">
</HclListItem>

<HclListItem name="cluster_instances_maintenance_window">
</HclListItem>

<HclListItem name="cluster_resource_id">
</HclListItem>

<HclListItem name="db_name">
</HclListItem>

<HclListItem name="instance_endpoints">
</HclListItem>

<HclListItem name="instance_ids">
</HclListItem>

<HclListItem name="port">
</HclListItem>

<HclListItem name="reader_endpoint">
</HclListItem>

<HclListItem name="security_group_id">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/main/modules/aurora/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/main/modules/aurora/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/main/modules/aurora/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "9e2f7711ffdb5aede1210132e5163fbd"
}
##DOCS-SOURCER-END -->
