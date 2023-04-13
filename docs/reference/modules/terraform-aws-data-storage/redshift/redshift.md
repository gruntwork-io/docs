---
title: "Redshift Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Data Storage Modules" version="0.26.0" lastModifiedVersion="0.26.0"/>

# Redshift Module

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.26.0/modules/redshift" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.26.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module creates an Amazon Redshift cluster that you can use as a data warehouse. The cluster is managed by AWS and automatically handles leader nodes, worker nodes, backups, patching, and encryption.

![Redshift architecture](/img/reference/modules/terraform-aws-data-storage/redshift/redshift-architecture.png)

## Features

*   Deploy a fully-managed data warehouse

*   Scalable worker nodes and storage

*   Automatic nightly snapshots

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/)!

### Core concepts

*   [What is Amazon Redshift?](https://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html)

*   [Redshift documentation](https://docs.aws.amazon.com/redshift/index.html)

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples folder](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.26.0/examples): The `examples` folder contains sample code optimized for learning, experimenting, and testing (but not production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   (coming soon)

## Manage

### Day-to-day operations

*   [Designing tables](https://docs.aws.amazon.com/redshift/latest/dg/t_Creating_tables.html)

*   [Loading data](https://docs.aws.amazon.com/redshift/latest/dg/t_Loading_data.html)

*   [Querying Redshift](https://docs.aws.amazon.com/redshift/latest/mgmt/query-databases.html)

*   [Redshift best practices](https://docs.aws.amazon.com/redshift/latest/dg/best-practices.html)

### Major changes

*   [Managing securitty](https://docs.aws.amazon.com/redshift/latest/dg/r_Database_objects.html)

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S REDSHIFT MODULE
# ------------------------------------------------------------------------------------------------------

module "redshift" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/redshift?ref=v0.26.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The instance type to use for the db (e.g. dc2.large)
  instance_type = <INPUT REQUIRED>

  # The name used to namespace all resources created by these templates, including
  # the DB instance (e.g. drupaldb). Must be unique for this region. May contain
  # only lowercase alphanumeric characters, hyphens.
  name = <INPUT REQUIRED>

  # The number of nodes in the cluster
  number_of_nodes = <INPUT REQUIRED>

  # A list of subnet ids where the database should be deployed. In the standard
  # Gruntwork VPC setup, these should be the private persistence subnet ids.
  subnet_ids = <INPUT REQUIRED>

  # The id of the VPC in which this DB should be deployed.
  vpc_id = <INPUT REQUIRED>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of CIDR-formatted IP address ranges that can connect to this DB. Should
  # typically be the CIDR blocks of the private app subnet in this VPC plus the
  # private subnet in the mgmt VPC. This is ignored if create_subnet_group=false.
  allow_connections_from_cidr_blocks = []

  # A list of Security Groups that can connect to this DB.
  allow_connections_from_security_groups = []

  # Indicates whether major version upgrades (e.g. 9.4.x to 9.5.x) will ever be
  # permitted. Note that these updates must always be manually performed and will
  # never automatically applied.
  allow_major_version_upgrade = true

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

  # How many days to keep backup snapshots around before cleaning them up. Must be 1
  # or greater to support read replicas.
  backup_retention_period = 21

  # The description of the cluster_subnet_group that is created. Defaults to 'Subnet
  # group for the var.name DB' if not specified.
  cluster_subnet_group_description = null

  # The name of the cluster_subnet_group that is created, or an existing one to use
  # if cluster_subnet_group is false. Defaults to var.name if not specified.
  cluster_subnet_group_name = null

  # If false, the DB will bind to aws_db_subnet_group_name and the CIDR will be
  # ignored (allow_connections_from_cidr_blocks)
  create_subnet_group = true

  # Timeout for DB creating
  creating_timeout = "75m"

  # A map of custom tags to apply to the RDS Instance and the Security Group created
  # for it. The key is the tag name and the value is the tag value.
  custom_tags = {}

  # The name for your database of up to 8 alpha-numeric characters. If you do not
  # provide a name, Amazon RDS will not create a database in the DB cluster you are
  # creating.
  db_name = "dev"

  # Timeout for DB deleting
  deleting_timeout = "40m"

  # If true , enhanced VPC routing is enabled. Forces COPY and UNLOAD traffic
  # between the cluster and data repositories to go through your VPC.
  enhanced_vpc_routing = false

  # The name of the final_snapshot_identifier. Defaults to var.name-final-snapshot
  # if not specified.
  final_snapshot_name = null

  # A list of IAM Role ARNs to associate with the cluster. A Maximum of 10 can be
  # associated to the cluster at any time.
  iam_roles = null

  # The ARN of a KMS key that should be used to encrypt data on disk. Only used if
  # var.storage_encrypted is true. If you leave this blank, the default RDS KMS key
  # for the account will be used.
  kms_key_arn = null

  # Configures logging information such as queries and connection attempts for the
  # specified Amazon Redshift cluster. If enable is set to true. The bucket_name and
  # s3_key_prefix must be set. The bucket must be in the same region as the cluster
  # and the cluster must have read bucket and put object permission.
  logging = {"bucket_name":null,"enable":false,"s3_key_prefix":null}

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

  # Name of a Redshift parameter group to associate.
  parameter_group_name = null

  # The port the DB will listen on (e.g. 3306)
  port = 5439

  # WARNING: - In nearly all cases a database should NOT be publicly accessible.
  # Only set this to true if you want the database open to the internet.
  publicly_accessible = false

  # Determines whether a final DB snapshot is created before the DB instance is
  # deleted. Be very careful setting this to true; if you do, and you delete this DB
  # instance, you will not have any backups of the data!
  skip_final_snapshot = false

  # If non-null, the name of the cluster the source snapshot was created from.
  snapshot_cluster_identifier = null

  # If non-null, the Redshift cluster will be restored from the given Snapshot ID.
  # This is the Snapshot ID you'd find in the Redshift console, e.g:
  # rs:production-2015-06-26-06-05.
  snapshot_identifier = null

  # Required if you are restoring a snapshot you do not own, optional if you own the
  # snapshot. The AWS customer account used to create or copy the snapshot.
  snapshot_owner_account = null

  # Specifies whether the DB instance is encrypted.
  storage_encrypted = true

  # Timeout for DB updating
  updating_timeout = "75m"

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S REDSHIFT MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/redshift?ref=v0.26.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The instance type to use for the db (e.g. dc2.large)
  instance_type = <INPUT REQUIRED>

  # The name used to namespace all resources created by these templates, including
  # the DB instance (e.g. drupaldb). Must be unique for this region. May contain
  # only lowercase alphanumeric characters, hyphens.
  name = <INPUT REQUIRED>

  # The number of nodes in the cluster
  number_of_nodes = <INPUT REQUIRED>

  # A list of subnet ids where the database should be deployed. In the standard
  # Gruntwork VPC setup, these should be the private persistence subnet ids.
  subnet_ids = <INPUT REQUIRED>

  # The id of the VPC in which this DB should be deployed.
  vpc_id = <INPUT REQUIRED>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of CIDR-formatted IP address ranges that can connect to this DB. Should
  # typically be the CIDR blocks of the private app subnet in this VPC plus the
  # private subnet in the mgmt VPC. This is ignored if create_subnet_group=false.
  allow_connections_from_cidr_blocks = []

  # A list of Security Groups that can connect to this DB.
  allow_connections_from_security_groups = []

  # Indicates whether major version upgrades (e.g. 9.4.x to 9.5.x) will ever be
  # permitted. Note that these updates must always be manually performed and will
  # never automatically applied.
  allow_major_version_upgrade = true

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

  # How many days to keep backup snapshots around before cleaning them up. Must be 1
  # or greater to support read replicas.
  backup_retention_period = 21

  # The description of the cluster_subnet_group that is created. Defaults to 'Subnet
  # group for the var.name DB' if not specified.
  cluster_subnet_group_description = null

  # The name of the cluster_subnet_group that is created, or an existing one to use
  # if cluster_subnet_group is false. Defaults to var.name if not specified.
  cluster_subnet_group_name = null

  # If false, the DB will bind to aws_db_subnet_group_name and the CIDR will be
  # ignored (allow_connections_from_cidr_blocks)
  create_subnet_group = true

  # Timeout for DB creating
  creating_timeout = "75m"

  # A map of custom tags to apply to the RDS Instance and the Security Group created
  # for it. The key is the tag name and the value is the tag value.
  custom_tags = {}

  # The name for your database of up to 8 alpha-numeric characters. If you do not
  # provide a name, Amazon RDS will not create a database in the DB cluster you are
  # creating.
  db_name = "dev"

  # Timeout for DB deleting
  deleting_timeout = "40m"

  # If true , enhanced VPC routing is enabled. Forces COPY and UNLOAD traffic
  # between the cluster and data repositories to go through your VPC.
  enhanced_vpc_routing = false

  # The name of the final_snapshot_identifier. Defaults to var.name-final-snapshot
  # if not specified.
  final_snapshot_name = null

  # A list of IAM Role ARNs to associate with the cluster. A Maximum of 10 can be
  # associated to the cluster at any time.
  iam_roles = null

  # The ARN of a KMS key that should be used to encrypt data on disk. Only used if
  # var.storage_encrypted is true. If you leave this blank, the default RDS KMS key
  # for the account will be used.
  kms_key_arn = null

  # Configures logging information such as queries and connection attempts for the
  # specified Amazon Redshift cluster. If enable is set to true. The bucket_name and
  # s3_key_prefix must be set. The bucket must be in the same region as the cluster
  # and the cluster must have read bucket and put object permission.
  logging = {"bucket_name":null,"enable":false,"s3_key_prefix":null}

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

  # Name of a Redshift parameter group to associate.
  parameter_group_name = null

  # The port the DB will listen on (e.g. 3306)
  port = 5439

  # WARNING: - In nearly all cases a database should NOT be publicly accessible.
  # Only set this to true if you want the database open to the internet.
  publicly_accessible = false

  # Determines whether a final DB snapshot is created before the DB instance is
  # deleted. Be very careful setting this to true; if you do, and you delete this DB
  # instance, you will not have any backups of the data!
  skip_final_snapshot = false

  # If non-null, the name of the cluster the source snapshot was created from.
  snapshot_cluster_identifier = null

  # If non-null, the Redshift cluster will be restored from the given Snapshot ID.
  # This is the Snapshot ID you'd find in the Redshift console, e.g:
  # rs:production-2015-06-26-06-05.
  snapshot_identifier = null

  # Required if you are restoring a snapshot you do not own, optional if you own the
  # snapshot. The AWS customer account used to create or copy the snapshot.
  snapshot_owner_account = null

  # Specifies whether the DB instance is encrypted.
  storage_encrypted = true

  # Timeout for DB updating
  updating_timeout = "75m"

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

The instance type to use for the db (e.g. dc2.large)

</HclListItemDescription>
</HclListItem>

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name used to namespace all resources created by these templates, including the DB instance (e.g. drupaldb). Must be unique for this region. May contain only lowercase alphanumeric characters, hyphens.

</HclListItemDescription>
</HclListItem>

<HclListItem name="number_of_nodes" requirement="required" type="number">
<HclListItemDescription>

The number of nodes in the cluster

</HclListItemDescription>
</HclListItem>

<HclListItem name="subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

A list of subnet ids where the database should be deployed. In the standard Gruntwork VPC setup, these should be the private persistence subnet ids.

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

A list of CIDR-formatted IP address ranges that can connect to this DB. Should typically be the CIDR blocks of the private app subnet in this VPC plus the private subnet in the mgmt VPC. This is ignored if create_subnet_group=false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_security_groups" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of Security Groups that can connect to this DB.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_major_version_upgrade" requirement="optional" type="bool">
<HclListItemDescription>

Indicates whether major version upgrades (e.g. 9.4.x to 9.5.x) will ever be permitted. Note that these updates must always be manually performed and will never automatically applied.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
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

<HclListItem name="backup_retention_period" requirement="optional" type="number">
<HclListItemDescription>

How many days to keep backup snapshots around before cleaning them up. Must be 1 or greater to support read replicas.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="21"/>
</HclListItem>

<HclListItem name="cluster_subnet_group_description" requirement="optional" type="string">
<HclListItemDescription>

The description of the cluster_subnet_group that is created. Defaults to 'Subnet group for the <a href="#name"><code>name</code></a> DB' if not specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_subnet_group_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the cluster_subnet_group that is created, or an existing one to use if cluster_subnet_group is false. Defaults to <a href="#name"><code>name</code></a> if not specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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
<HclListItemDefaultValue defaultValue="&quot;75m&quot;"/>
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
<HclListItemDefaultValue defaultValue="&quot;dev&quot;"/>
</HclListItem>

<HclListItem name="deleting_timeout" requirement="optional" type="string">
<HclListItemDescription>

Timeout for DB deleting

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;40m&quot;"/>
</HclListItem>

<HclListItem name="enhanced_vpc_routing" requirement="optional" type="bool">
<HclListItemDescription>

If true , enhanced VPC routing is enabled. Forces COPY and UNLOAD traffic between the cluster and data repositories to go through your VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="final_snapshot_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the final_snapshot_identifier. Defaults to <a href="#name"><code>name</code></a>-final-snapshot if not specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="iam_roles" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM Role ARNs to associate with the cluster. A Maximum of 10 can be associated to the cluster at any time.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of a KMS key that should be used to encrypt data on disk. Only used if <a href="#storage_encrypted"><code>storage_encrypted</code></a> is true. If you leave this blank, the default RDS KMS key for the account will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="logging" requirement="optional" type="object(…)">
<HclListItemDescription>

Configures logging information such as queries and connection attempts for the specified Amazon Redshift cluster. If enable is set to true. The bucket_name and s3_key_prefix must be set. The bucket must be in the same region as the cluster and the cluster must have read bucket and put object permission.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    enable        = bool
    bucket_name   = string
    s3_key_prefix = string
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
{
  bucket_name = null,
  enable = false,
  s3_key_prefix = null
}
```

</HclListItemDefaultValue>
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

<HclListItem name="parameter_group_name" requirement="optional" type="string">
<HclListItemDescription>

Name of a Redshift parameter group to associate.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="port" requirement="optional" type="number">
<HclListItemDescription>

The port the DB will listen on (e.g. 3306)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="5439"/>
</HclListItem>

<HclListItem name="publicly_accessible" requirement="optional" type="bool">
<HclListItemDescription>

WARNING: - In nearly all cases a database should NOT be publicly accessible. Only set this to true if you want the database open to the internet.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="skip_final_snapshot" requirement="optional" type="bool">
<HclListItemDescription>

Determines whether a final DB snapshot is created before the DB instance is deleted. Be very careful setting this to true; if you do, and you delete this DB instance, you will not have any backups of the data!

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="snapshot_cluster_identifier" requirement="optional" type="string">
<HclListItemDescription>

If non-null, the name of the cluster the source snapshot was created from.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="snapshot_identifier" requirement="optional" type="string">
<HclListItemDescription>

If non-null, the Redshift cluster will be restored from the given Snapshot ID. This is the Snapshot ID you'd find in the Redshift console, e.g: rs:production-2015-06-26-06-05.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="snapshot_owner_account" requirement="optional" type="string">
<HclListItemDescription>

Required if you are restoring a snapshot you do not own, optional if you own the snapshot. The AWS customer account used to create or copy the snapshot.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="storage_encrypted" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether the DB instance is encrypted.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="updating_timeout" requirement="optional" type="string">
<HclListItemDescription>

Timeout for DB updating

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;75m&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="arn">
<HclListItemDescription>

 Amazon Resource Name (ARN) of cluster

</HclListItemDescription>
</HclListItem>

<HclListItem name="db_name">
<HclListItemDescription>

The name of the Database in the cluster

</HclListItemDescription>
</HclListItem>

<HclListItem name="dns_name">
<HclListItemDescription>

The DNS name of the cluster

</HclListItemDescription>
</HclListItem>

<HclListItem name="endpoint">
<HclListItemDescription>

The cluter's connection endpoint

</HclListItemDescription>
</HclListItem>

<HclListItem name="id">
<HclListItemDescription>

The Redshift Cluster ID

</HclListItemDescription>
</HclListItem>

<HclListItem name="name">
<HclListItemDescription>

The name of the Redshift cluster

</HclListItemDescription>
</HclListItem>

<HclListItem name="parameter_group_name">
<HclListItemDescription>

The name of the parameter group associated with this cluster

</HclListItemDescription>
</HclListItem>

<HclListItem name="port">
<HclListItemDescription>

The Port the cluster responds on

</HclListItemDescription>
</HclListItem>

<HclListItem name="security_group_id">
<HclListItemDescription>

The ID of the Security Group that controls access to the cluster

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.26.0/modules/redshift/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.26.0/modules/redshift/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.26.0/modules/redshift/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "1c201b9e0861adcb3ec642ec681ad23b"
}
##DOCS-SOURCER-END -->
