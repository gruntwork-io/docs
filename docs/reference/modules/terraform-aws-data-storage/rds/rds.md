---
title: "RDS Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Data Storage Modules" version="0.26.0" lastModifiedVersion="0.26.0"/>

# RDS Module

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/tree/main/modules/rds" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.26.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module creates an Amazon Relational Database Service (RDS) cluster that can run MySQL, Postgres, MariaDB, Oracle, or SQL Server. The cluster is managed by AWS and automatically handles standby failover, read replicas, backups, patching, and encryption.

![RDS architecture](/img/reference/modules/terraform-aws-data-storage/rds/rds-architecture.png)

## Features

*   Deploy a fully-managed relational database

*   Supports MySQL, PostgreSQL, MariaDB, Oracle, and SQL Server

*   Automatic failover to a standby in another availability zone

*   Read replicas

*   Automatic nightly snapshots

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/)!

### Core concepts

*   [What is Amazon RDS?](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/main/modules/rds/core-concepts.md#what-is-amazon-rds)

*   [Common gotchas with RDS](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/main/modules/rds/core-concepts.md#common-gotchas)

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

*   [How to connect to an RDS instance](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/main/modules/rds/core-concepts.md#how-do-you-connect-to-the-database)

*   [How to authenticate to RDS with IAM](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAM.html)

*   [How to scale RDS](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/main/modules/rds/core-concepts.md#how-do-you-scale-this-database)

*   [How to backup RDS snapshots to a separate AWS account](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/main/modules/lambda-create-snapshot#how-do-you-backup-your-rds-snapshots-to-a-separate-aws-account)

### Major changes

*   [Upgrading a DB instance](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_UpgradeDBInstance.Upgrading.html)

*   [Restoring from a DB snapshot](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_RestoreFromSnapshot.html)

## Sample Usage

<ModuleUsage>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S RDS MODULE
# ------------------------------------------------------------------------------------------------------

module "rds" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/rds?ref=v0.26.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The DB engine to use (e.g. mysql). Required unless var.replicate_source_db is
  # set.
  engine = <INPUT REQUIRED>

  # The version of var.engine to use (e.g. 5.7.11 for mysql). If
  # var.auto_minor_version_upgrade is set to true, set the version number to
  # MAJOR.MINOR and omit the PATCH (e.g., set it to 5.7 and not 5.7.11) to avoid
  # state drift. See
  # https://www.terraform.io/docs/providers/aws/r/db_instance.html#engine_version
  # for more details.
  engine_version = <INPUT REQUIRED>

  # The instance type to use for the db (e.g. db.t2.micro)
  instance_type = <INPUT REQUIRED>

  # The name used to namespace all resources created by these templates, including
  # the DB instance (e.g. drupaldb). Must be unique for this region. May contain
  # only lowercase alphanumeric characters, hyphens, underscores, periods, and
  # spaces.
  name = <INPUT REQUIRED>

  # The port the DB will listen on (e.g. 3306)
  port = <INPUT REQUIRED>

  # A list of subnet ids where the database should be deployed. In the standard
  # Gruntwork VPC setup, these should be the private persistence subnet ids. This is
  # ignored if create_subnet_group=false.
  subnet_ids = <INPUT REQUIRED>

  # The id of the VPC in which this DB should be deployed.
  vpc_id = <INPUT REQUIRED>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of IDs of AWS Security Groups to attach to the primary RDS instance.
  additional_primary_instance_security_group_ids = []

  # List of IDs of AWS Security Groups to attach to the read replica RDS instance.
  additional_read_replica_instance_security_group_ids = []

  # The amount of storage space the DB should use, in GB. If max_allocated_storage
  # is configured, this argument represents the initial storage allocation and
  # differences from the configuration will be ignored automatically when Storage
  # Autoscaling occurs. Required unless var.replicate_source_db is set.
  allocated_storage = null

  # A list of CIDR-formatted IP address ranges that can connect to this DB. Should
  # typically be the CIDR blocks of the private app subnet in this VPC plus the
  # private subnet in the mgmt VPC.
  allow_connections_from_cidr_blocks = []

  # A list of CIDR-formatted IP address ranges that can connect to read replica
  # instances. If not set read replica instances will use the same security group as
  # master instance.
  allow_connections_from_cidr_blocks_to_read_replicas = []

  # A list of Security Groups that can connect to this DB.
  allow_connections_from_security_groups = []

  # A list of Security Groups that can connect to read replica instances. If not set
  # read replica instances will use the same security group as master instance.
  allow_connections_from_security_groups_to_read_replicas = []

  # Indicates whether major version upgrades (e.g. 9.4.x to 9.5.x) will ever be
  # permitted. Note that these updates must always be manually performed and will
  # never automatically applied.
  allow_major_version_upgrade = true

  # The availability zones within which it should be possible to spin up replicas
  allowed_replica_zones = []

  # Specifies whether any cluster modifications are applied immediately, or during
  # the next maintenance window. Note that cluster modifications may cause degraded
  # performance or downtime.
  apply_immediately = false

  # Indicates that minor engine upgrades will be applied automatically to the DB
  # instance during the maintenance window. If set to true, you should set
  # var.engine_version to MAJOR.MINOR and omit the .PATCH at the end (e.g., use 5.7
  # and not 5.7.11); otherwise, you'll get Terraform state drift. See
  # https://www.terraform.io/docs/providers/aws/r/db_instance.html#engine_version
  # for more details.
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

  # How many days to keep backup snapshots around before cleaning them up. Must be 1
  # or greater to support read replicas. 0 means disable automated backups.
  backup_retention_period = 21

  # The daily time range during which automated backups are created (e.g.
  # 04:00-09:00). Time zone is UTC. Performance may be degraded while a backup runs.
  backup_window = "06:00-07:00"

  # The Certificate Authority (CA) certificates bundle to use on the RDS instance.
  ca_cert_identifier = null

  # The character set name to use for DB encoding in Oracle and Microsoft SQL
  # instances (collation). This must be null for all other engine types. Note that
  # this is only relevant at create time - it can not be changed after creation.
  character_set_name = null

  # Copy all the RDS instance tags to snapshots. Default is false.
  copy_tags_to_snapshot = false

  # If false, the DB will bind to aws_db_subnet_group_name and the CIDR will be
  # ignored (allow_connections_from_cidr_blocks)
  create_subnet_group = true

  # Timeout for DB creating
  creating_timeout = "40m"

  # A map of custom tags to apply to the RDS Instance and the Security Group created
  # for it. The key is the tag name and the value is the tag value.
  custom_tags = {}

  # The name for your database of up to 8 alpha-numeric characters. If you do not
  # provide a name, Amazon RDS will not create a database in the DB cluster you are
  # creating.
  db_name = null

  # A map of the default license to use for each supported RDS engine.
  default_license_models = {"mariadb":"general-public-license","mysql":"general-public-license","oracle-ee":"bring-your-own-license","oracle-se":"bring-your-own-license","oracle-se1":"bring-your-own-license","oracle-se2":"bring-your-own-license","postgres":"postgresql-license","sqlserver-ee":"license-included","sqlserver-ex":"license-included","sqlserver-se":"license-included","sqlserver-web":"license-included"}

  # Specifies whether to remove automated backups immediately after the DB instance
  # is deleted
  delete_automated_backups = true

  # Timeout for DB deleting
  deleting_timeout = "60m"

  # The database can't be deleted when this value is set to true. The default is
  # false.
  deletion_protection = false

  # List of log types to enable for exporting to CloudWatch logs. If omitted, no
  # logs will be exported. Valid values (depending on engine): alert, audit, error,
  # general, listener, slowquery, trace, postgresql (PostgreSQL) and upgrade
  # (PostgreSQL).
  enabled_cloudwatch_logs_exports = []

  # The name of the final_snapshot_identifier. Defaults to var.name-final-snapshot
  # if not specified.
  final_snapshot_name = null

  # Specifies whether IAM database authentication is enabled. This option is only
  # available for MySQL and PostgreSQL engines.
  iam_database_authentication_enabled = null

  # Creates an instance that disables terraform from updating the master_password. 
  # Useful when managing secrets outside of terraform (ex. using AWS Secrets Manager
  # Rotations).  Note changing this value will switch the db instance resource.  To
  # avoid deleting your old database and creating a new one, you will need to run
  # `terraform state mv` when changing this variable
  ignore_password_changes = false

  # The amount of provisioned IOPS for the primary instance. Setting this implies a
  # storage_type of 'io1','io2, or 'gp3'. Set to 0 to disable.
  iops = 0

  # The ARN of a KMS key that should be used to encrypt data on disk. Only used if
  # var.storage_encrypted is true. If you leave this blank, the default RDS KMS key
  # for the account will be used.
  kms_key_arn = null

  # The license model to use for this DB. Check the docs for your RDS DB for
  # available license models. Valid values: general-public-license,
  # postgresql-license, license-included, bring-your-own-license.
  license_model = null

  # The weekly day and time range during which system maintenance can occur (e.g.
  # wed:04:00-wed:04:30). Time zone is UTC. Performance may be degraded or there may
  # even be a downtime during maintenance windows.
  maintenance_window = "sun:07:00-sun:08:00"

  # The password for the master user. If var.snapshot_identifier is non-empty, this
  # value is ignored. Required unless var.replicate_source_db is set.
  master_password = null

  # The username for the master user. Required unless var.replicate_source_db is
  # set.
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
  # monitoring_role_arn is let as an empty string, a default IAM role that allows
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
  multi_az = true

  # The national character set is used in the NCHAR, NVARCHAR2, and NCLOB data types
  # for Oracle instances. This must be null for all other engine types. Note that
  # this is only relevant at create time - it can not be changed after creation.
  nchar_character_set_name = null

  # The number of read replicas to create. RDS will asynchronously replicate all
  # data from the master to these replicas, which you can use to horizontally scale
  # reads traffic.
  num_read_replicas = 0

  # Name of a DB option group to associate.
  option_group_name = null

  # Name of a DB parameter group to associate.
  parameter_group_name = null

  # Name of a DB parameter group to associate with read replica instances. Defaults
  # to var.parameter_group_name if not set.
  parameter_group_name_for_read_replicas = null

  # Specifies whether Performance Insights are enabled. Performance Insights can be
  # enabled for specific versions of database engines. See
  # https://aws.amazon.com/rds/performance-insights/ for more details.
  performance_insights_enabled = false

  # The ARN for the KMS key to encrypt Performance Insights data. When specifying
  # performance_insights_kms_key_id, performance_insights_enabled needs to be set to
  # true. Once KMS key is set, it can never be changed. When set to `null` default
  # aws/rds KMS for given region is used.
  performance_insights_kms_key_id = null

  # The amount of time in days to retain Performance Insights data. Either 7 (7
  # days) or 731 (2 years). When specifying performance_insights_retention_period,
  # performance_insights_enabled needs to be set to true. Defaults to `7`.
  performance_insights_retention_period = null

  # The ARN of the policy that is used to set the permissions boundary for the role
  # of enhanced monitoring role. This policy should be created outside of this
  # module.
  permissions_boundary_arn = null

  # WARNING: - In nearly all cases a database should NOT be publicly accessible.
  # Only set this to true if you want the database open to the internet.
  publicly_accessible = false

  # The amount of provisioned IOPS for read replicas. If null, the replica will use
  # the same value as the primary, which is set in var.iops.
  read_replica_iops = null

  # The type of storage to use for read replicas. If null, the replica will use the
  # same value as the primary, which is set in var.storage_type.
  read_replica_storage_type = null

  # How many days to keep backup snapshots around before cleaning them up on the
  # read replicas. Must be 1 or greater to support read replicas. 0 means disable
  # automated backups.
  replica_backup_retention_period = 0

  # Specifies that this resource is a Replicate database, and to use this value as
  # the source database. This correlates to the identifier of another Amazon RDS
  # Database to replicate (if replicating within a single region) or ARN of the
  # Amazon RDS Database to replicate (if replicating cross-region). Note that if you
  # are creating a cross-region replica of an encrypted database you will also need
  # to specify a kms_key_arn.
  replicate_source_db = null

  # Determines whether a final DB snapshot is created before the DB instance is
  # deleted. Be very careful setting this to true; if you do, and you delete this DB
  # instance, you will not have any backups of the data!
  skip_final_snapshot = false

  # If non-null, the RDS Instance will be restored from the given Snapshot ID. This
  # is the Snapshot ID you'd find in the RDS console, e.g:
  # rds:production-2015-06-26-06-05.
  snapshot_identifier = null

  # Specifies whether the DB instance is encrypted.
  storage_encrypted = true

  # The storage throughput value for the DB instance. Can only be set when
  # var.storage_type is 'gp3'. Cannot be specified if the allocated_storage value is
  # below a per-engine threshold. See the RDS User Guide:
  # https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Storage.html#gp3-sto
  # age
  storage_throughput = null

  # The type of storage to use for the primary instance. Must be one of 'standard'
  # (magnetic), 'gp2' (general purpose SSD), 'gp3' (general purpose SSD), io1'
  # (provisioned IOPS SSD), or 'io2' (2nd gen provisioned IOPS SSD).
  storage_type = "gp2"

  # Timeout for DB updating
  updating_timeout = "80m"

}

```

</ModuleUsage>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="engine" requirement="required" type="string">
<HclListItemDescription>

The DB engine to use (e.g. mysql). Required unless <a href="#replicate_source_db"><code>replicate_source_db</code></a> is set.

</HclListItemDescription>
</HclListItem>

<HclListItem name="engine_version" requirement="required" type="string">
<HclListItemDescription>

The version of <a href="#engine"><code>engine</code></a> to use (e.g. 5.7.11 for mysql). If <a href="#auto_minor_version_upgrade"><code>auto_minor_version_upgrade</code></a> is set to true, set the version number to MAJOR.MINOR and omit the PATCH (e.g., set it to 5.7 and not 5.7.11) to avoid state drift. See https://www.terraform.io/docs/providers/aws/r/db_instance.html#engine_version for more details.

</HclListItemDescription>
</HclListItem>

<HclListItem name="instance_type" requirement="required" type="string">
<HclListItemDescription>

The instance type to use for the db (e.g. db.t2.micro)

</HclListItemDescription>
</HclListItem>

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name used to namespace all resources created by these templates, including the DB instance (e.g. drupaldb). Must be unique for this region. May contain only lowercase alphanumeric characters, hyphens, underscores, periods, and spaces.

</HclListItemDescription>
</HclListItem>

<HclListItem name="port" requirement="required" type="number">
<HclListItemDescription>

The port the DB will listen on (e.g. 3306)

</HclListItemDescription>
</HclListItem>

<HclListItem name="subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

A list of subnet ids where the database should be deployed. In the standard Gruntwork VPC setup, these should be the private persistence subnet ids. This is ignored if create_subnet_group=false.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The id of the VPC in which this DB should be deployed.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="additional_primary_instance_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

List of IDs of AWS Security Groups to attach to the primary RDS instance.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="additional_read_replica_instance_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

List of IDs of AWS Security Groups to attach to the read replica RDS instance.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allocated_storage" requirement="optional" type="number">
<HclListItemDescription>

The amount of storage space the DB should use, in GB. If max_allocated_storage is configured, this argument represents the initial storage allocation and differences from the configuration will be ignored automatically when Storage Autoscaling occurs. Required unless <a href="#replicate_source_db"><code>replicate_source_db</code></a> is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="allow_connections_from_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of CIDR-formatted IP address ranges that can connect to this DB. Should typically be the CIDR blocks of the private app subnet in this VPC plus the private subnet in the mgmt VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_cidr_blocks_to_read_replicas" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of CIDR-formatted IP address ranges that can connect to read replica instances. If not set read replica instances will use the same security group as master instance.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_security_groups" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of Security Groups that can connect to this DB.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_security_groups_to_read_replicas" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of Security Groups that can connect to read replica instances. If not set read replica instances will use the same security group as master instance.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_major_version_upgrade" requirement="optional" type="bool">
<HclListItemDescription>

Indicates whether major version upgrades (e.g. 9.4.x to 9.5.x) will ever be permitted. Note that these updates must always be manually performed and will never automatically applied.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="allowed_replica_zones" requirement="optional" type="list(string)">
<HclListItemDescription>

The availability zones within which it should be possible to spin up replicas

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="apply_immediately" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether any cluster modifications are applied immediately, or during the next maintenance window. Note that cluster modifications may cause degraded performance or downtime.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="auto_minor_version_upgrade" requirement="optional" type="bool">
<HclListItemDescription>

Indicates that minor engine upgrades will be applied automatically to the DB instance during the maintenance window. If set to true, you should set <a href="#engine_version"><code>engine_version</code></a> to MAJOR.MINOR and omit the .PATCH at the end (e.g., use 5.7 and not 5.7.11); otherwise, you'll get Terraform state drift. See https://www.terraform.io/docs/providers/aws/r/db_instance.html#engine_version for more details.

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

<HclListItem name="backup_retention_period" requirement="optional" type="number">
<HclListItemDescription>

How many days to keep backup snapshots around before cleaning them up. Must be 1 or greater to support read replicas. 0 means disable automated backups.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="21"/>
</HclListItem>

<HclListItem name="backup_window" requirement="optional" type="string">
<HclListItemDescription>

The daily time range during which automated backups are created (e.g. 04:00-09:00). Time zone is UTC. Performance may be degraded while a backup runs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;06:00-07:00&quot;"/>
</HclListItem>

<HclListItem name="ca_cert_identifier" requirement="optional" type="string">
<HclListItemDescription>

The Certificate Authority (CA) certificates bundle to use on the RDS instance.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="character_set_name" requirement="optional" type="string">
<HclListItemDescription>

The character set name to use for DB encoding in Oracle and Microsoft SQL instances (collation). This must be null for all other engine types. Note that this is only relevant at create time - it can not be changed after creation.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="copy_tags_to_snapshot" requirement="optional" type="bool">
<HclListItemDescription>

Copy all the RDS instance tags to snapshots. Default is false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="create_subnet_group" requirement="optional" type="bool">
<HclListItemDescription>

If false, the DB will bind to aws_db_subnet_group_name and the CIDR will be ignored (allow_connections_from_cidr_blocks)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="creating_timeout" requirement="optional" type="string">
<HclListItemDescription>

Timeout for DB creating

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;40m&quot;"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the RDS Instance and the Security Group created for it. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="db_name" requirement="optional" type="string">
<HclListItemDescription>

The name for your database of up to 8 alpha-numeric characters. If you do not provide a name, Amazon RDS will not create a database in the DB cluster you are creating.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="default_license_models" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of the default license to use for each supported RDS engine.

</HclListItemDescription>
<HclListItemDefaultValue>

```hcl
{
  mariadb = "general-public-license",
  mysql = "general-public-license",
  oracle-ee = "bring-your-own-license",
  oracle-se = "bring-your-own-license",
  oracle-se1 = "bring-your-own-license",
  oracle-se2 = "bring-your-own-license",
  postgres = "postgresql-license",
  sqlserver-ee = "license-included",
  sqlserver-ex = "license-included",
  sqlserver-se = "license-included",
  sqlserver-web = "license-included"
}
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="delete_automated_backups" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether to remove automated backups immediately after the DB instance is deleted

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="deleting_timeout" requirement="optional" type="string">
<HclListItemDescription>

Timeout for DB deleting

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;60m&quot;"/>
</HclListItem>

<HclListItem name="deletion_protection" requirement="optional" type="bool">
<HclListItemDescription>

The database can't be deleted when this value is set to true. The default is false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enabled_cloudwatch_logs_exports" requirement="optional" type="list(string)">
<HclListItemDescription>

List of log types to enable for exporting to CloudWatch logs. If omitted, no logs will be exported. Valid values (depending on engine): alert, audit, error, general, listener, slowquery, trace, postgresql (PostgreSQL) and upgrade (PostgreSQL).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="final_snapshot_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the final_snapshot_identifier. Defaults to <a href="#name"><code>name</code></a>-final-snapshot if not specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="iam_database_authentication_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether IAM database authentication is enabled. This option is only available for MySQL and PostgreSQL engines.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ignore_password_changes" requirement="optional" type="bool">
<HclListItemDescription>

Creates an instance that disables terraform from updating the master_password.  Useful when managing secrets outside of terraform (ex. using AWS Secrets Manager Rotations).  Note changing this value will switch the db instance resource.  To avoid deleting your old database and creating a new one, you will need to run `terraform state mv` when changing this variable

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="iops" requirement="optional" type="number">
<HclListItemDescription>

The amount of provisioned IOPS for the primary instance. Setting this implies a storage_type of 'io1','io2, or 'gp3'. Set to 0 to disable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of a KMS key that should be used to encrypt data on disk. Only used if <a href="#storage_encrypted"><code>storage_encrypted</code></a> is true. If you leave this blank, the default RDS KMS key for the account will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="license_model" requirement="optional" type="string">
<HclListItemDescription>

The license model to use for this DB. Check the docs for your RDS DB for available license models. Valid values: general-public-license, postgresql-license, license-included, bring-your-own-license.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="maintenance_window" requirement="optional" type="string">
<HclListItemDescription>

The weekly day and time range during which system maintenance can occur (e.g. wed:04:00-wed:04:30). Time zone is UTC. Performance may be degraded or there may even be a downtime during maintenance windows.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;sun:07:00-sun:08:00&quot;"/>
</HclListItem>

<HclListItem name="master_password" requirement="optional" type="string">
<HclListItemDescription>

The password for the master user. If <a href="#snapshot_identifier"><code>snapshot_identifier</code></a> is non-empty, this value is ignored. Required unless <a href="#replicate_source_db"><code>replicate_source_db</code></a> is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="master_username" requirement="optional" type="string">
<HclListItemDescription>

The username for the master user. Required unless <a href="#replicate_source_db"><code>replicate_source_db</code></a> is set.

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

The ARN for the IAM role that permits RDS to send enhanced monitoring metrics to CloudWatch Logs. If monitoring_interval is greater than 0, but monitoring_role_arn is let as an empty string, a default IAM role that allows enhanced monitoring will be created.

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
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="nchar_character_set_name" requirement="optional" type="string">
<HclListItemDescription>

The national character set is used in the NCHAR, NVARCHAR2, and NCLOB data types for Oracle instances. This must be null for all other engine types. Note that this is only relevant at create time - it can not be changed after creation.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="num_read_replicas" requirement="optional" type="number">
<HclListItemDescription>

The number of read replicas to create. RDS will asynchronously replicate all data from the master to these replicas, which you can use to horizontally scale reads traffic.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="option_group_name" requirement="optional" type="string">
<HclListItemDescription>

Name of a DB option group to associate.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="parameter_group_name" requirement="optional" type="string">
<HclListItemDescription>

Name of a DB parameter group to associate.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="parameter_group_name_for_read_replicas" requirement="optional" type="string">
<HclListItemDescription>

Name of a DB parameter group to associate with read replica instances. Defaults to <a href="#parameter_group_name"><code>parameter_group_name</code></a> if not set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="performance_insights_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether Performance Insights are enabled. Performance Insights can be enabled for specific versions of database engines. See https://aws.amazon.com/rds/performance-insights/ for more details.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="performance_insights_kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

The ARN for the KMS key to encrypt Performance Insights data. When specifying performance_insights_kms_key_id, performance_insights_enabled needs to be set to true. Once KMS key is set, it can never be changed. When set to `null` default aws/rds KMS for given region is used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="performance_insights_retention_period" requirement="optional" type="number">
<HclListItemDescription>

The amount of time in days to retain Performance Insights data. Either 7 (7 days) or 731 (2 years). When specifying performance_insights_retention_period, performance_insights_enabled needs to be set to true. Defaults to `7`.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="permissions_boundary_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the policy that is used to set the permissions boundary for the role of enhanced monitoring role. This policy should be created outside of this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="publicly_accessible" requirement="optional" type="bool">
<HclListItemDescription>

WARNING: - In nearly all cases a database should NOT be publicly accessible. Only set this to true if you want the database open to the internet.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="read_replica_iops" requirement="optional" type="number">
<HclListItemDescription>

The amount of provisioned IOPS for read replicas. If null, the replica will use the same value as the primary, which is set in <a href="#iops"><code>iops</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="read_replica_storage_type" requirement="optional" type="string">
<HclListItemDescription>

The type of storage to use for read replicas. If null, the replica will use the same value as the primary, which is set in <a href="#storage_type"><code>storage_type</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="replica_backup_retention_period" requirement="optional" type="number">
<HclListItemDescription>

How many days to keep backup snapshots around before cleaning them up on the read replicas. Must be 1 or greater to support read replicas. 0 means disable automated backups.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="replicate_source_db" requirement="optional" type="string">
<HclListItemDescription>

Specifies that this resource is a Replicate database, and to use this value as the source database. This correlates to the identifier of another Amazon RDS Database to replicate (if replicating within a single region) or ARN of the Amazon RDS Database to replicate (if replicating cross-region). Note that if you are creating a cross-region replica of an encrypted database you will also need to specify a kms_key_arn.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="skip_final_snapshot" requirement="optional" type="bool">
<HclListItemDescription>

Determines whether a final DB snapshot is created before the DB instance is deleted. Be very careful setting this to true; if you do, and you delete this DB instance, you will not have any backups of the data!

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

<HclListItem name="storage_throughput" requirement="optional" type="string">
<HclListItemDescription>

The storage throughput value for the DB instance. Can only be set when <a href="#storage_type"><code>storage_type</code></a> is 'gp3'. Cannot be specified if the allocated_storage value is below a per-engine threshold. See the RDS User Guide: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Storage.html#gp3-storage

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="storage_type" requirement="optional" type="string">
<HclListItemDescription>

The type of storage to use for the primary instance. Must be one of 'standard' (magnetic), 'gp2' (general purpose SSD), 'gp3' (general purpose SSD), io1' (provisioned IOPS SSD), or 'io2' (2nd gen provisioned IOPS SSD).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;gp2&quot;"/>
</HclListItem>

<HclListItem name="updating_timeout" requirement="optional" type="string">
<HclListItemDescription>

Timeout for DB updating

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;80m&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="db_name">
</HclListItem>

<HclListItem name="name">
</HclListItem>

<HclListItem name="parameter_group_name">
</HclListItem>

<HclListItem name="port">
</HclListItem>

<HclListItem name="primary_address">
</HclListItem>

<HclListItem name="primary_arn">
</HclListItem>

<HclListItem name="primary_endpoint">
</HclListItem>

<HclListItem name="primary_id">
</HclListItem>

<HclListItem name="read_replica_addresses">
</HclListItem>

<HclListItem name="read_replica_arns">
</HclListItem>

<HclListItem name="read_replica_endpoints">
</HclListItem>

<HclListItem name="read_replica_ids">
</HclListItem>

<HclListItem name="security_group_id">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/main/modules/rds/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/main/modules/rds/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/main/modules/rds/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "6588c74a117c7ae5aa470fe060e2a4ea"
}
##DOCS-SOURCER-END -->
