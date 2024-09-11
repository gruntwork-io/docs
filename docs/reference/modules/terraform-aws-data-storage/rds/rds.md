---
title: "RDS Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Data Storage Modules" version="0.38.1" lastModifiedVersion="0.38.1"/>

# RDS Module

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.38.1/modules/rds" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.38.1" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module creates an Amazon Relational Database Service (RDS) cluster that can run MySQL, Postgres, MariaDB, Oracle,
or SQL Server. The cluster is managed by AWS and automatically handles standby failover, read replicas, backups,
patching, and encryption.

![img](/img/reference/modules/terraform-aws-data-storage/rds/rds-architecture.png)

## About RDS

Amazon Relational Database Service (Amazon RDS) is a web service that makes it easier to set up, operate, and scale a
relational database in the AWS Cloud. It provides cost-efficient, resizable capacity for an industry-standard relational
database and manages common database administration tasks. Refer to
the [What is Amazon RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html) page for more information.

## Common Gotcha's

*   All RDS upgrades (version upgrades, instance type upgrades, etc.) require a few minutes of scheduled downtime.
*   If an RDS instance that uses Multi-AZ fails, Amazon will automatically kick off a fail-over, but you will still
    experience about 3 - 5 minutes of downtime.
*   Based on the above, make sure you've written your app to gracefully handle database downtime.
*   An RDS instance that runs out of disk space will stop working, so be sure to monitor and set an alert on the
    FreeStorageSpace CloudWatch Metric. Consider monitoring other RDS CloudWatch Metrics as well.

## How do you scale this database?

*   **Storage**: Use the `allocated_storage` variable.
*   **Vertical scaling**: To scale vertically (i.e. bigger DB instances with more CPU and RAM), use the `instance_type`,
    `storage_type`, and `iops` input variables. For a list of AWS RDS server types, see [DB Instance
    Class](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.DBInstanceClass.html)
*   **Horizontal scaling**: To scale horizontally, you can add more replicas using the `num_read_replicas` input variable,
    and RDS will automatically deploy the new instances, begin asynchronous replication, and make them available as read
    replicas. For more info, see [Working with PostgreSQL, MySQL, and MariaDB Read
    Replicas](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html#USER_ReadRepl.Overview).
*   **Storage performance**: **N.B: only available when `var.storage_type` is set to `gp3`.** When you are using gp3, you
    can
    optionally fine-tune storage performance characteristics via the `storage_throughput` variable. See
    the [RDS User Guide](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Storage.html#gp3-storage) for
    more information.

## How do you connect to the database?

This module provides the connection details as [Terraform output
variables](https://www.terraform.io/intro/getting-started/outputs.html):

1.  **Primary endpoint**: The endpoint for the primary DB. You should always use this URL for writes, as it points to
    the primary.
2.  **Read replica endpoints**: A comma-separated list of read replica URLs.
3.  **Port**: The port to use to connect to the endpoints above.

You can programmatically extract these variables in your Terraform templates and pass them to other resources (e.g.
pass them to User Data in your EC2 instances). You'll also see the variables at the end of each `terraform apply` call
or if you run `terraform output`.

Note that the database is likely behind a Bastion Host, so you may need to first connect to the Bastion Host (or use SSH
Tunneling) before you can connect to the database.

## Deployment

Before making any deployment for the RDS database, start by backing up the database and taking a snapshot of the infrastructure state. Review the release notes for any breaking changes and new features. Update the infrastructure code by modifying the Terraform configurations and testing them in a non-production environment. Conduct post-upgrade testing to ensure application functionality and performance, while monitoring the database health. Communicate the potential downtime to relevant stakeholders and involve them in the process.

### Minor version upgrades

RDS supports automatically installing minor version upgrades. For example, it can automatically update a MySQL database from version 5.7.10 to 5.7.11. To enable this functionality, follow these steps:

1.  Set the `auto_minor_version_upgrade` parameter to `true`.
2.  Set the `engine_version` parameter to `MAJOR.MINOR` and omit the `PATCH` number.

### Major Version Upgrade

RDS supports automatically installing major version upgrades. To enable this functionality, follow these steps:

1.  Set the `allow_major_version_upgrade` parameter to `true`.
2.  Set the `engine_version` parameter to `MAJOR.MINOR` and omit the `PATCH` number.

**Note**: consider temporarily setting parameter and option group variables to engine defaults during the major version upgrade process. This step is important to prevent upgrade failures that might occur due to custom configurations not being compatible with the new version. By reverting these configurations to default settings temporarily, you minimize the risk of incompatibility issues during the upgrade process. After the upgrade is successfully completed, these configurations can be reverted back to their custom values, ensuring that your database operates with the desired settings while being compatible with the upgraded version.

**Note**: A minimal downtime is expected during a major version upgrade. Make sure to communicate the potential downtime to relevant stakeholders in advance.

### Blue/Green Deployment for Low-Downtime Updates

By default, RDS updates DB Instances in-place, which can cause service interruptions. Low-downtime updates minimize interruptions by using an RDS Blue/Green deployment. To enable this, set the `enable_blue_green_update` variable to `true`.

Note that low-downtime updates are only supported for MySQL, MariaDB, and Postgresql, and backups must be enabled. When using terraform, the Blue/Green Deployment won't finish until the Green instances become the new instance and the Blue instance is deleted. Therefore, Blue/Green Deployment cannot be used for scenarios outside of terraform's resource update, such as manual testing of the Green deployment or reverting back to the Blue deployment.

### Standby Deployment

Set `multi_az=true`. When setting up a multi-AZ (Availability Zone) RDS deployment in AWS, both the primary and standby RDS instances are created in different Availability Zones for high availability. However, this doesn't mean they will have different endpoints. Both instances will have the same DNS endpoint, and AWS's internal infrastructure will handle the failover process transparently for you. AWS RDS provides automatic failover support for DB instances using Multi-AZ deployments for the supported database engines. Failover is automatically handled by RDS without any manual intervention.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S RDS MODULE
# ------------------------------------------------------------------------------------------------------

module "rds" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/rds?ref=v0.38.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The DB engine to use (e.g. mysql).
  engine = <string>

  # The version of var.engine to use (e.g. 5.7.11 for mysql). If
  # var.auto_minor_version_upgrade is set to true, set the version number to
  # MAJOR.MINOR and omit the PATCH (e.g., set it to 5.7 and not 5.7.11) to avoid
  # state drift. See
  # https://www.terraform.io/docs/providers/aws/r/db_instance.html#engine_version
  # for more details.
  engine_version = <string>

  # The instance type to use for the db (e.g. db.t2.micro)
  instance_type = <string>

  # The name used to namespace all resources created by these templates,
  # including the DB instance (e.g. drupaldb). Must be unique for this region.
  # May contain only lowercase alphanumeric characters, hyphens, underscores,
  # periods, and spaces.
  name = <string>

  # The port the DB will listen on (e.g. 3306)
  port = <number>

  # A list of subnet ids where the database should be deployed. In the standard
  # Gruntwork VPC setup, these should be the private persistence subnet ids.
  # This is ignored if create_subnet_group=false.
  subnet_ids = <list(string)>

  # The id of the VPC in which this DB should be deployed.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of IDs of AWS Security Groups to attach to the primary RDS instance.
  additional_primary_instance_security_group_ids = []

  # List of IDs of AWS Security Groups to attach to the read replica RDS
  # instance.
  additional_read_replica_instance_security_group_ids = []

  # The amount of storage space the DB should use, in GB. If
  # max_allocated_storage is configured, this argument represents the initial
  # storage allocation and differences from the configuration will be ignored
  # automatically when Storage Autoscaling occurs.
  allocated_storage = null

  # A list of CIDR-formatted IP address ranges that can connect to this DB.
  # Should typically be the CIDR blocks of the private app subnet in this VPC
  # plus the private subnet in the mgmt VPC.
  allow_connections_from_cidr_blocks = []

  # A list of CIDR-formatted IP address ranges that can connect to read replica
  # instances. If not set read replica instances will use the same security
  # group as master instance.
  allow_connections_from_cidr_blocks_to_read_replicas = []

  # A list of Security Groups that can connect to this DB.
  allow_connections_from_security_groups = []

  # A list of Security Groups that can connect to read replica instances. If not
  # set read replica instances will use the same security group as master
  # instance.
  allow_connections_from_security_groups_to_read_replicas = []

  # Indicates whether major version upgrades (e.g. 9.4.x to 9.5.x) will ever be
  # permitted. Note that these updates must always be manually performed and
  # will never automatically applied.
  allow_major_version_upgrade = true

  # A list of CIDR-formatted IP address ranges that the database is allowed to
  # send traffit to. Should typically be the CIDR blocks of the private app
  # subnet in this VPC plus the private subnet in the mgmt VPC.
  allow_outbound_connections_to_cidr_blocks = []

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

  # The description of the aws_db_security_group that is created. Defaults to
  # 'Security group for the var.name DB' if not specified.
  aws_db_security_group_description = null

  # The name of the aws_db_security_group that is created. Defaults to var.name
  # if not specified.
  aws_db_security_group_name = null

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
  backup_window = "06:00-07:00"

  # The Certificate Authority (CA) certificates bundle to use on the RDS
  # instance.
  ca_cert_identifier = null

  # The character set name to use for DB encoding in Oracle and Microsoft SQL
  # instances (collation). This must be null for all other engine types. Note
  # that this is only relevant at create time - it can not be changed after
  # creation.
  character_set_name = null

  # Copy all the RDS instance tags to snapshots. Default is false.
  copy_tags_to_snapshot = false

  # If false, the DB will bind to aws_db_subnet_group_name and the CIDR will be
  # ignored (allow_connections_from_cidr_blocks)
  create_subnet_group = true

  # Timeout for DB creating
  creating_timeout = "40m"

  # The instance profile associated with the underlying Amazon EC2 instance of
  # an RDS Custom DB instance.
  custom_iam_instance_profile = null

  # Configure a custom parameter group for the RDS DB. This will create a new
  # parameter group with the given parameters. When null, the database will be
  # launched with the default parameter group.
  custom_parameter_group = null

  # A map of custom tags to apply to the RDS Instance and the Security Group
  # created for it. The key is the tag name and the value is the tag value.
  custom_tags = {}

  # The name for your database of up to 8 alpha-numeric characters. If you do
  # not provide a name, Amazon RDS will not create a database in the DB cluster
  # you are creating.
  db_name = null

  # A map of the default license to use for each supported RDS engine.
  default_license_models = {"mariadb":"general-public-license","mysql":"general-public-license","oracle-ee":"bring-your-own-license","oracle-ee-cdb":"bring-your-own-license","oracle-se":"bring-your-own-license","oracle-se1":"bring-your-own-license","oracle-se2":"bring-your-own-license","oracle-se2-cdb":"bring-your-own-license","postgres":"postgresql-license","sqlserver-ee":"license-included","sqlserver-ex":"license-included","sqlserver-se":"license-included","sqlserver-web":"license-included"}

  # Specifies whether to remove automated backups immediately after the DB
  # instance is deleted
  delete_automated_backups = true

  # Timeout for DB deleting
  deleting_timeout = "60m"

  # The database can't be deleted when this value is set to true. The default is
  # false.
  deletion_protection = false

  # Enable blue/green deployment to minimize down time due to changes made to
  # the RDS Instance. See
  # https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/blue-green-deployments-overview.html
  # for more detailed information.
  enable_blue_green_update = false

  # List of log types to enable for exporting to CloudWatch logs. If omitted, no
  # logs will be exported. Valid values (depending on engine): alert, audit,
  # error, general, listener, slowquery, trace, postgresql (PostgreSQL) and
  # upgrade (PostgreSQL).
  enabled_cloudwatch_logs_exports = []

  # The name of the final_snapshot_identifier. Defaults to
  # var.name-final-snapshot if not specified.
  final_snapshot_name = null

  # Specifies whether IAM database authentication is enabled. This option is
  # only available for MySQL and PostgreSQL engines.
  iam_database_authentication_enabled = null

  # The amount of provisioned IOPS for the primary instance. Setting this
  # implies a storage_type of 'io1','io2, or 'gp3'. Set to 0 to disable.
  iops = 0

  # The ARN of a KMS key that should be used to encrypt data on disk. Only used
  # if var.storage_encrypted is true. If you leave this blank, the default RDS
  # KMS key for the account will be used. This variable needs to be set to an
  # AWS KMS CMK if provisioning a custom RDS instance.
  kms_key_arn = null

  # The license model to use for this DB. Check the docs for your RDS DB for
  # available license models. Valid values: general-public-license,
  # postgresql-license, license-included, bring-your-own-license.
  license_model = null

  # The weekly day and time range during which system maintenance can occur
  # (e.g. wed:04:00-wed:04:30). Time zone is UTC. Performance may be degraded or
  # there may even be a downtime during maintenance windows.
  maintenance_window = "sun:07:00-sun:08:00"

  # Set to true to allow RDS to manage the master user password in Secrets
  # Manager. Cannot be set if password is provided.
  manage_master_user_password = null

  # The password for the master user. If var.snapshot_identifier is non-empty,
  # this value is ignored.
  master_password = null

  # The Amazon Web Services KMS key identifier is the key ARN, key ID, alias
  # ARN, or alias name for the KMS key. To use a KMS key in a different Amazon
  # Web Services account, specify the key ARN or alias ARN. If not specified,
  # the default KMS key for your Amazon Web Services account is used.
  master_user_secret_kms_key_id = null

  # The username for the master user.
  master_username = null

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

  # Optionally add a path to the IAM monitoring role. If left blank, it will
  # default to just /.
  monitoring_role_arn_path = "/"

  # The name of the enhanced_monitoring_role that is created. Defaults to
  # var.name-monitoring-role if not specified.
  monitoring_role_name = null

  # Specifies if a standby instance should be deployed in another availability
  # zone. If the primary fails, this instance will automatically take over.
  multi_az = true

  # The national character set is used in the NCHAR, NVARCHAR2, and NCLOB data
  # types for Oracle instances. This must be null for all other engine types.
  # Note that this is only relevant at create time - it can not be changed after
  # creation.
  nchar_character_set_name = null

  # (Optional) The network type of the DB instance. Valid values: IPV4, DUAL. By
  # default, it's set to IPV4
  network_type = null

  # The number of read replicas to create. RDS will asynchronously replicate all
  # data from the master to these replicas, which you can use to horizontally
  # scale reads traffic.
  num_read_replicas = 0

  # Name of a DB option group to associate.
  option_group_name = null

  # Name of a DB parameter group to associate.
  parameter_group_name = null

  # Name of a DB parameter group to associate with read replica instances.
  # Defaults to var.parameter_group_name if not set.
  parameter_group_name_for_read_replicas = null

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

  # The ARN of the policy that is used to set the permissions boundary for the
  # role of enhanced monitoring role. This policy should be created outside of
  # this module.
  permissions_boundary_arn = null

  # WARNING: - In nearly all cases a database should NOT be publicly accessible.
  # Only set this to true if you want the database open to the internet.
  publicly_accessible = false

  # Redefine replica instance type, if you want to define a different RDS
  # instance type for replica.
  read_replica_instance_type = null

  # The amount of provisioned IOPS for read replicas. If null, the replica will
  # use the same value as the primary, which is set in var.iops.
  read_replica_iops = null

  # The type of storage to use for read replicas. If null, the replica will use
  # the same value as the primary, which is set in var.storage_type.
  read_replica_storage_type = null

  # How many days to keep backup snapshots around before cleaning them up on the
  # read replicas. Must be 1 or greater to support read replicas. 0 means
  # disable automated backups.
  replica_backup_retention_period = 0

  # A configuration block for restoring a DB instance to an arbitrary point in
  # time. Refer to
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/db_instance#restore-to-point-in-time
  # for more details
  restore_to_point_in_time = null

  # Determines whether a final DB snapshot is created before the DB instance is
  # deleted. Be very careful setting this to true; if you do, and you delete
  # this DB instance, you will not have any backups of the data!
  skip_final_snapshot = false

  # If non-null, the RDS Instance will be restored from the given Snapshot ID.
  # This is the Snapshot ID you'd find in the RDS console, e.g:
  # rds:production-2015-06-26-06-05.
  snapshot_identifier = null

  # Specifies whether the DB instance is encrypted.
  storage_encrypted = true

  # The storage throughput value for the DB instance. Can only be set when
  # var.storage_type is 'gp3'. Cannot be specified if the allocated_storage
  # value is below a per-engine threshold. See the RDS User Guide:
  # https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Storage.html#gp3-storage
  storage_throughput = null

  # The type of storage to use for the primary instance. Must be one of
  # 'standard' (magnetic), 'gp2' (general purpose SSD), 'gp3' (general purpose
  # SSD), io1' (provisioned IOPS SSD), or 'io2' (2nd gen provisioned IOPS SSD).
  storage_type = "gp2"

  # Timeout for DB updating
  updating_timeout = "80m"

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S RDS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/rds?ref=v0.38.1"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The DB engine to use (e.g. mysql).
  engine = <string>

  # The version of var.engine to use (e.g. 5.7.11 for mysql). If
  # var.auto_minor_version_upgrade is set to true, set the version number to
  # MAJOR.MINOR and omit the PATCH (e.g., set it to 5.7 and not 5.7.11) to avoid
  # state drift. See
  # https://www.terraform.io/docs/providers/aws/r/db_instance.html#engine_version
  # for more details.
  engine_version = <string>

  # The instance type to use for the db (e.g. db.t2.micro)
  instance_type = <string>

  # The name used to namespace all resources created by these templates,
  # including the DB instance (e.g. drupaldb). Must be unique for this region.
  # May contain only lowercase alphanumeric characters, hyphens, underscores,
  # periods, and spaces.
  name = <string>

  # The port the DB will listen on (e.g. 3306)
  port = <number>

  # A list of subnet ids where the database should be deployed. In the standard
  # Gruntwork VPC setup, these should be the private persistence subnet ids.
  # This is ignored if create_subnet_group=false.
  subnet_ids = <list(string)>

  # The id of the VPC in which this DB should be deployed.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of IDs of AWS Security Groups to attach to the primary RDS instance.
  additional_primary_instance_security_group_ids = []

  # List of IDs of AWS Security Groups to attach to the read replica RDS
  # instance.
  additional_read_replica_instance_security_group_ids = []

  # The amount of storage space the DB should use, in GB. If
  # max_allocated_storage is configured, this argument represents the initial
  # storage allocation and differences from the configuration will be ignored
  # automatically when Storage Autoscaling occurs.
  allocated_storage = null

  # A list of CIDR-formatted IP address ranges that can connect to this DB.
  # Should typically be the CIDR blocks of the private app subnet in this VPC
  # plus the private subnet in the mgmt VPC.
  allow_connections_from_cidr_blocks = []

  # A list of CIDR-formatted IP address ranges that can connect to read replica
  # instances. If not set read replica instances will use the same security
  # group as master instance.
  allow_connections_from_cidr_blocks_to_read_replicas = []

  # A list of Security Groups that can connect to this DB.
  allow_connections_from_security_groups = []

  # A list of Security Groups that can connect to read replica instances. If not
  # set read replica instances will use the same security group as master
  # instance.
  allow_connections_from_security_groups_to_read_replicas = []

  # Indicates whether major version upgrades (e.g. 9.4.x to 9.5.x) will ever be
  # permitted. Note that these updates must always be manually performed and
  # will never automatically applied.
  allow_major_version_upgrade = true

  # A list of CIDR-formatted IP address ranges that the database is allowed to
  # send traffit to. Should typically be the CIDR blocks of the private app
  # subnet in this VPC plus the private subnet in the mgmt VPC.
  allow_outbound_connections_to_cidr_blocks = []

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

  # The description of the aws_db_security_group that is created. Defaults to
  # 'Security group for the var.name DB' if not specified.
  aws_db_security_group_description = null

  # The name of the aws_db_security_group that is created. Defaults to var.name
  # if not specified.
  aws_db_security_group_name = null

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
  backup_window = "06:00-07:00"

  # The Certificate Authority (CA) certificates bundle to use on the RDS
  # instance.
  ca_cert_identifier = null

  # The character set name to use for DB encoding in Oracle and Microsoft SQL
  # instances (collation). This must be null for all other engine types. Note
  # that this is only relevant at create time - it can not be changed after
  # creation.
  character_set_name = null

  # Copy all the RDS instance tags to snapshots. Default is false.
  copy_tags_to_snapshot = false

  # If false, the DB will bind to aws_db_subnet_group_name and the CIDR will be
  # ignored (allow_connections_from_cidr_blocks)
  create_subnet_group = true

  # Timeout for DB creating
  creating_timeout = "40m"

  # The instance profile associated with the underlying Amazon EC2 instance of
  # an RDS Custom DB instance.
  custom_iam_instance_profile = null

  # Configure a custom parameter group for the RDS DB. This will create a new
  # parameter group with the given parameters. When null, the database will be
  # launched with the default parameter group.
  custom_parameter_group = null

  # A map of custom tags to apply to the RDS Instance and the Security Group
  # created for it. The key is the tag name and the value is the tag value.
  custom_tags = {}

  # The name for your database of up to 8 alpha-numeric characters. If you do
  # not provide a name, Amazon RDS will not create a database in the DB cluster
  # you are creating.
  db_name = null

  # A map of the default license to use for each supported RDS engine.
  default_license_models = {"mariadb":"general-public-license","mysql":"general-public-license","oracle-ee":"bring-your-own-license","oracle-ee-cdb":"bring-your-own-license","oracle-se":"bring-your-own-license","oracle-se1":"bring-your-own-license","oracle-se2":"bring-your-own-license","oracle-se2-cdb":"bring-your-own-license","postgres":"postgresql-license","sqlserver-ee":"license-included","sqlserver-ex":"license-included","sqlserver-se":"license-included","sqlserver-web":"license-included"}

  # Specifies whether to remove automated backups immediately after the DB
  # instance is deleted
  delete_automated_backups = true

  # Timeout for DB deleting
  deleting_timeout = "60m"

  # The database can't be deleted when this value is set to true. The default is
  # false.
  deletion_protection = false

  # Enable blue/green deployment to minimize down time due to changes made to
  # the RDS Instance. See
  # https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/blue-green-deployments-overview.html
  # for more detailed information.
  enable_blue_green_update = false

  # List of log types to enable for exporting to CloudWatch logs. If omitted, no
  # logs will be exported. Valid values (depending on engine): alert, audit,
  # error, general, listener, slowquery, trace, postgresql (PostgreSQL) and
  # upgrade (PostgreSQL).
  enabled_cloudwatch_logs_exports = []

  # The name of the final_snapshot_identifier. Defaults to
  # var.name-final-snapshot if not specified.
  final_snapshot_name = null

  # Specifies whether IAM database authentication is enabled. This option is
  # only available for MySQL and PostgreSQL engines.
  iam_database_authentication_enabled = null

  # The amount of provisioned IOPS for the primary instance. Setting this
  # implies a storage_type of 'io1','io2, or 'gp3'. Set to 0 to disable.
  iops = 0

  # The ARN of a KMS key that should be used to encrypt data on disk. Only used
  # if var.storage_encrypted is true. If you leave this blank, the default RDS
  # KMS key for the account will be used. This variable needs to be set to an
  # AWS KMS CMK if provisioning a custom RDS instance.
  kms_key_arn = null

  # The license model to use for this DB. Check the docs for your RDS DB for
  # available license models. Valid values: general-public-license,
  # postgresql-license, license-included, bring-your-own-license.
  license_model = null

  # The weekly day and time range during which system maintenance can occur
  # (e.g. wed:04:00-wed:04:30). Time zone is UTC. Performance may be degraded or
  # there may even be a downtime during maintenance windows.
  maintenance_window = "sun:07:00-sun:08:00"

  # Set to true to allow RDS to manage the master user password in Secrets
  # Manager. Cannot be set if password is provided.
  manage_master_user_password = null

  # The password for the master user. If var.snapshot_identifier is non-empty,
  # this value is ignored.
  master_password = null

  # The Amazon Web Services KMS key identifier is the key ARN, key ID, alias
  # ARN, or alias name for the KMS key. To use a KMS key in a different Amazon
  # Web Services account, specify the key ARN or alias ARN. If not specified,
  # the default KMS key for your Amazon Web Services account is used.
  master_user_secret_kms_key_id = null

  # The username for the master user.
  master_username = null

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

  # Optionally add a path to the IAM monitoring role. If left blank, it will
  # default to just /.
  monitoring_role_arn_path = "/"

  # The name of the enhanced_monitoring_role that is created. Defaults to
  # var.name-monitoring-role if not specified.
  monitoring_role_name = null

  # Specifies if a standby instance should be deployed in another availability
  # zone. If the primary fails, this instance will automatically take over.
  multi_az = true

  # The national character set is used in the NCHAR, NVARCHAR2, and NCLOB data
  # types for Oracle instances. This must be null for all other engine types.
  # Note that this is only relevant at create time - it can not be changed after
  # creation.
  nchar_character_set_name = null

  # (Optional) The network type of the DB instance. Valid values: IPV4, DUAL. By
  # default, it's set to IPV4
  network_type = null

  # The number of read replicas to create. RDS will asynchronously replicate all
  # data from the master to these replicas, which you can use to horizontally
  # scale reads traffic.
  num_read_replicas = 0

  # Name of a DB option group to associate.
  option_group_name = null

  # Name of a DB parameter group to associate.
  parameter_group_name = null

  # Name of a DB parameter group to associate with read replica instances.
  # Defaults to var.parameter_group_name if not set.
  parameter_group_name_for_read_replicas = null

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

  # The ARN of the policy that is used to set the permissions boundary for the
  # role of enhanced monitoring role. This policy should be created outside of
  # this module.
  permissions_boundary_arn = null

  # WARNING: - In nearly all cases a database should NOT be publicly accessible.
  # Only set this to true if you want the database open to the internet.
  publicly_accessible = false

  # Redefine replica instance type, if you want to define a different RDS
  # instance type for replica.
  read_replica_instance_type = null

  # The amount of provisioned IOPS for read replicas. If null, the replica will
  # use the same value as the primary, which is set in var.iops.
  read_replica_iops = null

  # The type of storage to use for read replicas. If null, the replica will use
  # the same value as the primary, which is set in var.storage_type.
  read_replica_storage_type = null

  # How many days to keep backup snapshots around before cleaning them up on the
  # read replicas. Must be 1 or greater to support read replicas. 0 means
  # disable automated backups.
  replica_backup_retention_period = 0

  # A configuration block for restoring a DB instance to an arbitrary point in
  # time. Refer to
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/db_instance#restore-to-point-in-time
  # for more details
  restore_to_point_in_time = null

  # Determines whether a final DB snapshot is created before the DB instance is
  # deleted. Be very careful setting this to true; if you do, and you delete
  # this DB instance, you will not have any backups of the data!
  skip_final_snapshot = false

  # If non-null, the RDS Instance will be restored from the given Snapshot ID.
  # This is the Snapshot ID you'd find in the RDS console, e.g:
  # rds:production-2015-06-26-06-05.
  snapshot_identifier = null

  # Specifies whether the DB instance is encrypted.
  storage_encrypted = true

  # The storage throughput value for the DB instance. Can only be set when
  # var.storage_type is 'gp3'. Cannot be specified if the allocated_storage
  # value is below a per-engine threshold. See the RDS User Guide:
  # https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Storage.html#gp3-storage
  storage_throughput = null

  # The type of storage to use for the primary instance. Must be one of
  # 'standard' (magnetic), 'gp2' (general purpose SSD), 'gp3' (general purpose
  # SSD), io1' (provisioned IOPS SSD), or 'io2' (2nd gen provisioned IOPS SSD).
  storage_type = "gp2"

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

<HclListItem name="engine" requirement="required" type="string">
<HclListItemDescription>

The DB engine to use (e.g. mysql).

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

The amount of storage space the DB should use, in GB. If max_allocated_storage is configured, this argument represents the initial storage allocation and differences from the configuration will be ignored automatically when Storage Autoscaling occurs.

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

<HclListItem name="allow_outbound_connections_to_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of CIDR-formatted IP address ranges that the database is allowed to send traffit to. Should typically be the CIDR blocks of the private app subnet in this VPC plus the private subnet in the mgmt VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
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

<HclListItem name="custom_iam_instance_profile" requirement="optional" type="string">
<HclListItemDescription>

The instance profile associated with the underlying Amazon EC2 instance of an RDS Custom DB instance.

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
  oracle-ee-cdb = "bring-your-own-license",
  oracle-se = "bring-your-own-license",
  oracle-se1 = "bring-your-own-license",
  oracle-se2 = "bring-your-own-license",
  oracle-se2-cdb = "bring-your-own-license",
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

<HclListItem name="enable_blue_green_update" requirement="optional" type="bool">
<HclListItemDescription>

Enable blue/green deployment to minimize down time due to changes made to the RDS Instance. See https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/blue-green-deployments-overview.html for more detailed information.

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

<HclListItem name="iops" requirement="optional" type="number">
<HclListItemDescription>

The amount of provisioned IOPS for the primary instance. Setting this implies a storage_type of 'io1','io2, or 'gp3'. Set to 0 to disable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of a KMS key that should be used to encrypt data on disk. Only used if <a href="#storage_encrypted"><code>storage_encrypted</code></a> is true. If you leave this blank, the default RDS KMS key for the account will be used. This variable needs to be set to an AWS KMS CMK if provisioning a custom RDS instance.

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

<HclListItem name="manage_master_user_password" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to allow RDS to manage the master user password in Secrets Manager. Cannot be set if password is provided.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="master_password" requirement="optional" type="string">
<HclListItemDescription>

The password for the master user. If <a href="#snapshot_identifier"><code>snapshot_identifier</code></a> is non-empty, this value is ignored.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="master_user_secret_kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

The Amazon Web Services KMS key identifier is the key ARN, key ID, alias ARN, or alias name for the KMS key. To use a KMS key in a different Amazon Web Services account, specify the key ARN or alias ARN. If not specified, the default KMS key for your Amazon Web Services account is used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="master_username" requirement="optional" type="string">
<HclListItemDescription>

The username for the master user.

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

<HclListItem name="network_type" requirement="optional" type="string">
<HclListItemDescription>

(Optional) The network type of the DB instance. Valid values: IPV4, DUAL. By default, it's set to IPV4

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

<HclListItem name="read_replica_instance_type" requirement="optional" type="string">
<HclListItemDescription>

Redefine replica instance type, if you want to define a different RDS instance type for replica.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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

<HclListItem name="restore_to_point_in_time" requirement="optional" type="map(object(…))">
<HclListItemDescription>

A configuration block for restoring a DB instance to an arbitrary point in time. Refer to https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/db_instance#restore-to-point-in-time for more details

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    restore_time                             = string
    source_db_instance_identifier            = string
    source_db_instance_automated_backups_arn = string
    source_dbi_resource_id                   = string
    use_latest_restorable_time               = string

  }))
```

</HclListItemTypeDetails>
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

<HclListItem name="master_password_secret_arn">
</HclListItem>

<HclListItem name="name">
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

<HclListItem name="resource_id">
</HclListItem>

<HclListItem name="security_group_id">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.38.1/modules/rds/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.38.1/modules/rds/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.38.1/modules/rds/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "2096e9117641e6be8e4e23ef2f2a79fa"
}
##DOCS-SOURCER-END -->
