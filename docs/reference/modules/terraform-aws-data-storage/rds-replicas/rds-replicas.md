---
title: "RDS Read Replicas Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Data Storage Modules" version="0.40.4" lastModifiedVersion="0.40.3"/>

# RDS Read Replicas Module

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.40.4/modules/rds-replicas" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.40.3" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module creates a read replica (read-only copy) of a DB instance.

## About RDS Read Replicas

A read replica is a read-only copy of a DB instance. You can reduce the load on your primary DB instance by routing
queries from your applications to the read replica. Refer to
[Working with DB instance read replicas](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html)
for more information.

## Promoting Read Replica as Primary

For disaster recovery, you may need to promote a read replica as a primary instance. Promoting an RDS replica to be a
primary instance is not a supported operation in Terraform and requires direct interaction with AWS APIs. Subsequent
steps are then required to ensure your Terraform state is up-to-date. Please see the following walk-through for steps to
promote a replica to primary.

1.  **Promote the replica**: Run AWS CLI command to promote read replica as primary with the following command:

```shell
aws rds promote-read-replica \
   --db-instance-identifier <replica-identifier> \
   --region <region>
```

**Note**: This command triggers the promotion process and takes an additional 30-60 mins to complete the
modification.

2.  **Update the Terraform configuration**: Modify your Terraform configuration file (e.g., main.tf) to reflect the new
    state. There's no way to automatically reflect the new state in terraform.
3.  **Import the new primary instance into Terraform state**: Run the `terraform import` command. This command associates
    the
    resource in your Terraform configuration with the existing resource in AWS.

```shell
terraform import aws_db_instance.<identifier> <primary_instance_arn>
```

4.  **Refresh the Terraform state**: Run `terraform refresh` to fetch the current state of the primary instance from AWS
    and update the Terraform state file accordingly. This ensures that Terraform is aware of the new primary instance's
    attributes.
5.  **Verify the Terraform plan**: Run `terraform plan` to review the changes that Terraform will apply based on the
    updated configuration and current state. Make sure the plan reflects the desired changes, including the new primary
    instance attributes.
6.  **Apply the Terraform changes**: If the plan looks correct, apply the changes by running `terraform apply`. Terraform
    will update the resources to match the desired configuration, reflecting the newly promoted primary
    instance.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S RDS-REPLICAS MODULE
# ------------------------------------------------------------------------------------------------------

module "rds_replicas" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/rds-replicas?ref=v0.40.4"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The instance type to use for the db (e.g. db.t2.micro)
  instance_type = <string>

  # The name used to namespace all resources created by these templates,
  # including the DB instance (e.g. drupaldb). Must be unique for this region.
  # May contain only lowercase alphanumeric characters, hyphens, underscores,
  # periods, and spaces.
  name = <string>

  # The port the DB will listen on (e.g. 3306)
  port = <number>

  # An ID of the primary DB instance to create read replicas from
  primary_instance_id = <string>

  # The id of the VPC in which this DB should be deployed.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of IDs of AWS Security Groups to attach to the read replica RDS
  # instance.
  additional_security_group_ids = []

  # A list of CIDR-formatted IP address ranges that can connect to read replica
  # instances. If not set read replica instances will use the same security
  # group as master instance.
  allow_connections_from_cidr_blocks = []

  # A list of Security Groups that can connect to read replica instances. If not
  # set read replica instances will use the same security group as master
  # instance.
  allow_connections_from_security_groups = []

  # Indicates whether major version upgrades (e.g. 9.4.x to 9.5.x) will ever be
  # permitted. Note that these updates must always be manually performed and
  # will never automatically applied.
  allow_major_version_upgrade = true

  # The availability zones within which it should be possible to spin up
  # replicas
  allowed_replica_zones = []

  # Specifies whether any cluster modifications are applied immediately, or
  # during the next maintenance window. Note that cluster modifications may
  # cause degraded performance or downtime.
  apply_immediately = false

  # Indicates that minor engine upgrades will be applied automatically to the DB
  # instance during the maintenance window. If set to true, you should set
  # var.engine_version to MAJOR.MINOR and omit the .PATCH at the end (e.g., use
  # 5.7 and not 5.7.11); otherwise, you'll get Terraform state drift. See
  # https://www.terraform.io/docs/providers/aws/r/db_instance.html#engine_version
  # for more details.
  auto_minor_version_upgrade = true

  # The description of the aws_db_subnet_group that is created. Defaults to
  # 'Subnet group for the var.name DB' if not specified.
  aws_db_subnet_group_description = null

  # The name of the aws_db_subnet_group that is created, or an existing one to
  # use if create_subnet_group is false. Defaults to var.name if not specified.
  aws_db_subnet_group_name = null

  # How many days to keep backup snapshots around before cleaning them up. Must
  # be 1 or greater to support read replicas. 0 means disable automated backups.
  backup_retention_period = 21

  # The daily time range during which automated backups are created (e.g.
  # 04:00-09:00). Time zone is UTC. Performance may be degraded while a backup
  # runs.
  backup_window = null

  # The Certificate Authority (CA) certificates bundle to use on the RDS
  # instance.
  ca_cert_identifier = null

  # Copy all the RDS instance tags to snapshots. Default is false.
  copy_tags_to_snapshot = false

  # When working with read replicas, only configure db subnet group if the
  # source database specifies an instance in another AWS Region. If true, it
  # will create a new subnet group.
  create_subnet_group = false

  # Timeout for DB creating
  creating_timeout = "40m"

  # A map of custom tags to apply to the RDS Instance and the Security Group
  # created for it. The key is the tag name and the value is the tag value.
  custom_tags = {}

  # Specifies whether to remove automated backups immediately after the DB
  # instance is deleted
  delete_automated_backups = null

  # Timeout for DB deleting
  deleting_timeout = "60m"

  # The database can't be deleted when this value is set to true. The default is
  # false.
  deletion_protection = false

  # List of log types to enable for exporting to CloudWatch logs. If omitted, no
  # logs will be exported. Valid values (depending on engine): alert, audit,
  # error, general, listener, slowquery, trace, postgresql (PostgreSQL) and
  # upgrade (PostgreSQL).
  enabled_cloudwatch_logs_exports = []

  # Specifies whether IAM database authentication is enabled. This option is
  # only available for MySQL and PostgreSQL engines.
  iam_database_authentication_enabled = null

  # The amount of provisioned IOPS for the primary instance. Setting this
  # implies a storage_type of 'io1','io2, or 'gp3'. Set to 0 to disable.
  iops = 0

  # The ARN of a KMS key that should be used to encrypt data on disk. Only used
  # if var.storage_encrypted is true. If you leave this blank, the default RDS
  # KMS key for the account will be used.
  kms_key_arn = null

  # The weekly day and time range during which system maintenance can occur
  # (e.g. wed:04:00-wed:04:30). Time zone is UTC. Performance may be degraded or
  # there may even be a downtime during maintenance windows.
  maintenance_window = null

  # When configured, the upper limit to which Amazon RDS can automatically scale
  # the storage of the DB instance. Configuring this will automatically ignore
  # differences to allocated_storage. Must be greater than or equal to
  # allocated_storage or 0 to disable Storage Autoscaling.
  max_allocated_storage = 0

  # The interval, in seconds, between points when Enhanced Monitoring metrics
  # are collected for the DB instance. To disable collecting Enhanced Monitoring
  # metrics, specify 0. Valid Values: 0, 1, 5, 10, 15, 30, 60. Enhanced
  # Monitoring metrics are useful when you want to see how different processes
  # or threads on a DB instance use the CPU.
  monitoring_interval = 0

  # The ARN for the IAM role that permits RDS to send enhanced monitoring
  # metrics to CloudWatch Logs. If monitoring_interval is greater than 0, but
  # monitoring_role_arn is let as an empty string, a default IAM role that
  # allows enhanced monitoring will be created.
  monitoring_role_arn = null

  # Specifies if a standby instance should be deployed in another availability
  # zone. If the primary fails, this instance will automatically take over.
  multi_az = false

  # (Optional) The network type of the DB instance. Valid values: IPV4, DUAL. By
  # default, it's set to IPV4.
  network_type = null

  # The number of read replicas to create. RDS will asynchronously replicate all
  # data from the master to these replicas, which you can use to horizontally
  # scale reads traffic.
  num_read_replicas = 0

  # Name of a DB parameter group to associate.
  parameter_group_name = null

  # Specifies whether Performance Insights are enabled. Performance Insights can
  # be enabled for specific versions of database engines. See
  # https://aws.amazon.com/rds/performance-insights/ for more details.
  performance_insights_enabled = false

  # The ARN for the KMS key to encrypt Performance Insights data. When
  # specifying performance_insights_kms_key_id, performance_insights_enabled
  # needs to be set to true. Once KMS key is set, it can never be changed. When
  # set to `null` default aws/rds KMS for given region is used.
  performance_insights_kms_key_id = null

  # The amount of time in days to retain Performance Insights data. Either 7 (7
  # days) or 731 (2 years). When specifying
  # performance_insights_retention_period, performance_insights_enabled needs to
  # be set to true. Defaults to `7`.
  performance_insights_retention_period = null

  # WARNING: - In nearly all cases a database should NOT be publicly accessible.
  # Only set this to true if you want the database open to the internet.
  publicly_accessible = false

  # Identifiers of the replica you want to create. Use this variable if you want
  # to set custom identifier for your read replicas.
  replica_identifiers = null

  # Determines whether a final DB snapshot is created before the DB instance is
  # deleted. Be very careful setting this to true; if you do, and you delete
  # this DB instance, you will not have any backups of the data!
  skip_final_snapshot = false

  # Specifies whether the DB instance is encrypted.
  storage_encrypted = true

  # The type of storage to use for the primary instance. Must be one of
  # 'standard' (magnetic), 'gp2' (general purpose SSD), 'gp3' (general purpose
  # SSD), io1' (provisioned IOPS SSD), or 'io2' (2nd gen provisioned IOPS SSD).
  storage_type = "gp2"

  # A list of subnet ids where the database should be deployed. In the standard
  # Gruntwork VPC setup, these should be the private persistence subnet ids.
  # This is ignored if create_subnet_group=false.
  subnet_ids = null

  # Time zone of the DB instance. timezone is currently only supported by
  # Microsoft SQL Server. The timezone can only be set on creation. See MSSQL
  # User Guide
  # (https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SQLServer.html#SQLServer.Concepts.General.TimeZone)
  # for more information.
  timezone = null

  # Timeout for DB updating
  updating_timeout = "80m"

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S RDS-REPLICAS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/rds-replicas?ref=v0.40.4"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The instance type to use for the db (e.g. db.t2.micro)
  instance_type = <string>

  # The name used to namespace all resources created by these templates,
  # including the DB instance (e.g. drupaldb). Must be unique for this region.
  # May contain only lowercase alphanumeric characters, hyphens, underscores,
  # periods, and spaces.
  name = <string>

  # The port the DB will listen on (e.g. 3306)
  port = <number>

  # An ID of the primary DB instance to create read replicas from
  primary_instance_id = <string>

  # The id of the VPC in which this DB should be deployed.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of IDs of AWS Security Groups to attach to the read replica RDS
  # instance.
  additional_security_group_ids = []

  # A list of CIDR-formatted IP address ranges that can connect to read replica
  # instances. If not set read replica instances will use the same security
  # group as master instance.
  allow_connections_from_cidr_blocks = []

  # A list of Security Groups that can connect to read replica instances. If not
  # set read replica instances will use the same security group as master
  # instance.
  allow_connections_from_security_groups = []

  # Indicates whether major version upgrades (e.g. 9.4.x to 9.5.x) will ever be
  # permitted. Note that these updates must always be manually performed and
  # will never automatically applied.
  allow_major_version_upgrade = true

  # The availability zones within which it should be possible to spin up
  # replicas
  allowed_replica_zones = []

  # Specifies whether any cluster modifications are applied immediately, or
  # during the next maintenance window. Note that cluster modifications may
  # cause degraded performance or downtime.
  apply_immediately = false

  # Indicates that minor engine upgrades will be applied automatically to the DB
  # instance during the maintenance window. If set to true, you should set
  # var.engine_version to MAJOR.MINOR and omit the .PATCH at the end (e.g., use
  # 5.7 and not 5.7.11); otherwise, you'll get Terraform state drift. See
  # https://www.terraform.io/docs/providers/aws/r/db_instance.html#engine_version
  # for more details.
  auto_minor_version_upgrade = true

  # The description of the aws_db_subnet_group that is created. Defaults to
  # 'Subnet group for the var.name DB' if not specified.
  aws_db_subnet_group_description = null

  # The name of the aws_db_subnet_group that is created, or an existing one to
  # use if create_subnet_group is false. Defaults to var.name if not specified.
  aws_db_subnet_group_name = null

  # How many days to keep backup snapshots around before cleaning them up. Must
  # be 1 or greater to support read replicas. 0 means disable automated backups.
  backup_retention_period = 21

  # The daily time range during which automated backups are created (e.g.
  # 04:00-09:00). Time zone is UTC. Performance may be degraded while a backup
  # runs.
  backup_window = null

  # The Certificate Authority (CA) certificates bundle to use on the RDS
  # instance.
  ca_cert_identifier = null

  # Copy all the RDS instance tags to snapshots. Default is false.
  copy_tags_to_snapshot = false

  # When working with read replicas, only configure db subnet group if the
  # source database specifies an instance in another AWS Region. If true, it
  # will create a new subnet group.
  create_subnet_group = false

  # Timeout for DB creating
  creating_timeout = "40m"

  # A map of custom tags to apply to the RDS Instance and the Security Group
  # created for it. The key is the tag name and the value is the tag value.
  custom_tags = {}

  # Specifies whether to remove automated backups immediately after the DB
  # instance is deleted
  delete_automated_backups = null

  # Timeout for DB deleting
  deleting_timeout = "60m"

  # The database can't be deleted when this value is set to true. The default is
  # false.
  deletion_protection = false

  # List of log types to enable for exporting to CloudWatch logs. If omitted, no
  # logs will be exported. Valid values (depending on engine): alert, audit,
  # error, general, listener, slowquery, trace, postgresql (PostgreSQL) and
  # upgrade (PostgreSQL).
  enabled_cloudwatch_logs_exports = []

  # Specifies whether IAM database authentication is enabled. This option is
  # only available for MySQL and PostgreSQL engines.
  iam_database_authentication_enabled = null

  # The amount of provisioned IOPS for the primary instance. Setting this
  # implies a storage_type of 'io1','io2, or 'gp3'. Set to 0 to disable.
  iops = 0

  # The ARN of a KMS key that should be used to encrypt data on disk. Only used
  # if var.storage_encrypted is true. If you leave this blank, the default RDS
  # KMS key for the account will be used.
  kms_key_arn = null

  # The weekly day and time range during which system maintenance can occur
  # (e.g. wed:04:00-wed:04:30). Time zone is UTC. Performance may be degraded or
  # there may even be a downtime during maintenance windows.
  maintenance_window = null

  # When configured, the upper limit to which Amazon RDS can automatically scale
  # the storage of the DB instance. Configuring this will automatically ignore
  # differences to allocated_storage. Must be greater than or equal to
  # allocated_storage or 0 to disable Storage Autoscaling.
  max_allocated_storage = 0

  # The interval, in seconds, between points when Enhanced Monitoring metrics
  # are collected for the DB instance. To disable collecting Enhanced Monitoring
  # metrics, specify 0. Valid Values: 0, 1, 5, 10, 15, 30, 60. Enhanced
  # Monitoring metrics are useful when you want to see how different processes
  # or threads on a DB instance use the CPU.
  monitoring_interval = 0

  # The ARN for the IAM role that permits RDS to send enhanced monitoring
  # metrics to CloudWatch Logs. If monitoring_interval is greater than 0, but
  # monitoring_role_arn is let as an empty string, a default IAM role that
  # allows enhanced monitoring will be created.
  monitoring_role_arn = null

  # Specifies if a standby instance should be deployed in another availability
  # zone. If the primary fails, this instance will automatically take over.
  multi_az = false

  # (Optional) The network type of the DB instance. Valid values: IPV4, DUAL. By
  # default, it's set to IPV4.
  network_type = null

  # The number of read replicas to create. RDS will asynchronously replicate all
  # data from the master to these replicas, which you can use to horizontally
  # scale reads traffic.
  num_read_replicas = 0

  # Name of a DB parameter group to associate.
  parameter_group_name = null

  # Specifies whether Performance Insights are enabled. Performance Insights can
  # be enabled for specific versions of database engines. See
  # https://aws.amazon.com/rds/performance-insights/ for more details.
  performance_insights_enabled = false

  # The ARN for the KMS key to encrypt Performance Insights data. When
  # specifying performance_insights_kms_key_id, performance_insights_enabled
  # needs to be set to true. Once KMS key is set, it can never be changed. When
  # set to `null` default aws/rds KMS for given region is used.
  performance_insights_kms_key_id = null

  # The amount of time in days to retain Performance Insights data. Either 7 (7
  # days) or 731 (2 years). When specifying
  # performance_insights_retention_period, performance_insights_enabled needs to
  # be set to true. Defaults to `7`.
  performance_insights_retention_period = null

  # WARNING: - In nearly all cases a database should NOT be publicly accessible.
  # Only set this to true if you want the database open to the internet.
  publicly_accessible = false

  # Identifiers of the replica you want to create. Use this variable if you want
  # to set custom identifier for your read replicas.
  replica_identifiers = null

  # Determines whether a final DB snapshot is created before the DB instance is
  # deleted. Be very careful setting this to true; if you do, and you delete
  # this DB instance, you will not have any backups of the data!
  skip_final_snapshot = false

  # Specifies whether the DB instance is encrypted.
  storage_encrypted = true

  # The type of storage to use for the primary instance. Must be one of
  # 'standard' (magnetic), 'gp2' (general purpose SSD), 'gp3' (general purpose
  # SSD), io1' (provisioned IOPS SSD), or 'io2' (2nd gen provisioned IOPS SSD).
  storage_type = "gp2"

  # A list of subnet ids where the database should be deployed. In the standard
  # Gruntwork VPC setup, these should be the private persistence subnet ids.
  # This is ignored if create_subnet_group=false.
  subnet_ids = null

  # Time zone of the DB instance. timezone is currently only supported by
  # Microsoft SQL Server. The timezone can only be set on creation. See MSSQL
  # User Guide
  # (https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SQLServer.html#SQLServer.Concepts.General.TimeZone)
  # for more information.
  timezone = null

  # Timeout for DB updating
  updating_timeout = "80m"

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

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

<HclListItem name="primary_instance_id" requirement="required" type="string">
<HclListItemDescription>

An ID of the primary DB instance to create read replicas from

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The id of the VPC in which this DB should be deployed.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="additional_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

List of IDs of AWS Security Groups to attach to the read replica RDS instance.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of CIDR-formatted IP address ranges that can connect to read replica instances. If not set read replica instances will use the same security group as master instance.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_security_groups" requirement="optional" type="list(string)">
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
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ca_cert_identifier" requirement="optional" type="string">
<HclListItemDescription>

The Certificate Authority (CA) certificates bundle to use on the RDS instance.

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

When working with read replicas, only configure db subnet group if the source database specifies an instance in another AWS Region. If true, it will create a new subnet group.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
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

<HclListItem name="delete_automated_backups" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether to remove automated backups immediately after the DB instance is deleted

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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

<HclListItem name="iam_database_authentication_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether IAM database authentication is enabled. This option is only available for MySQL and PostgreSQL engines.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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

<HclListItem name="maintenance_window" requirement="optional" type="string">
<HclListItemDescription>

The weekly day and time range during which system maintenance can occur (e.g. wed:04:00-wed:04:30). Time zone is UTC. Performance may be degraded or there may even be a downtime during maintenance windows.

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

<HclListItem name="multi_az" requirement="optional" type="bool">
<HclListItemDescription>

Specifies if a standby instance should be deployed in another availability zone. If the primary fails, this instance will automatically take over.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="network_type" requirement="optional" type="string">
<HclListItemDescription>

(Optional) The network type of the DB instance. Valid values: IPV4, DUAL. By default, it's set to IPV4.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="num_read_replicas" requirement="optional" type="number">
<HclListItemDescription>

The number of read replicas to create. RDS will asynchronously replicate all data from the master to these replicas, which you can use to horizontally scale reads traffic.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="parameter_group_name" requirement="optional" type="string">
<HclListItemDescription>

Name of a DB parameter group to associate.

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

<HclListItem name="publicly_accessible" requirement="optional" type="bool">
<HclListItemDescription>

WARNING: - In nearly all cases a database should NOT be publicly accessible. Only set this to true if you want the database open to the internet.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="replica_identifiers" requirement="optional" type="list(string)">
<HclListItemDescription>

Identifiers of the replica you want to create. Use this variable if you want to set custom identifier for your read replicas.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="skip_final_snapshot" requirement="optional" type="bool">
<HclListItemDescription>

Determines whether a final DB snapshot is created before the DB instance is deleted. Be very careful setting this to true; if you do, and you delete this DB instance, you will not have any backups of the data!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="storage_encrypted" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether the DB instance is encrypted.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="storage_type" requirement="optional" type="string">
<HclListItemDescription>

The type of storage to use for the primary instance. Must be one of 'standard' (magnetic), 'gp2' (general purpose SSD), 'gp3' (general purpose SSD), io1' (provisioned IOPS SSD), or 'io2' (2nd gen provisioned IOPS SSD).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;gp2&quot;"/>
</HclListItem>

<HclListItem name="subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of subnet ids where the database should be deployed. In the standard Gruntwork VPC setup, these should be the private persistence subnet ids. This is ignored if create_subnet_group=false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="timezone" requirement="optional" type="string">
<HclListItemDescription>

Time zone of the DB instance. timezone is currently only supported by Microsoft SQL Server. The timezone can only be set on creation. See MSSQL User Guide (https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SQLServer.html#SQLServer.Concepts.General.TimeZone) for more information.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="updating_timeout" requirement="optional" type="string">
<HclListItemDescription>

Timeout for DB updating

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;80m&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="read_replica_addresses">
</HclListItem>

<HclListItem name="read_replica_arns">
</HclListItem>

<HclListItem name="read_replica_endpoints">
</HclListItem>

<HclListItem name="read_replica_ids">
</HclListItem>

<HclListItem name="read_replica_names">
</HclListItem>

<HclListItem name="read_replica_port">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.40.4/modules/rds-replicas/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.40.4/modules/rds-replicas/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.40.4/modules/rds-replicas/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "2067ea9e1219cb0c5a0ea83fd2179521"
}
##DOCS-SOURCER-END -->
