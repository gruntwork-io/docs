---
title: "Redshift Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Data Storage Modules" version="0.45.0" lastModifiedVersion="0.45.0"/>

# Redshift Module

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.45.0/modules/redshift" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.45.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module creates an Amazon Redshift cluster that you can use as a data warehouse. The cluster is managed by AWS and
automatically handles leader nodes, worker nodes, backups, patching, and encryption.

![img](/img/reference/modules/terraform-aws-data-storage/redshift/redshift-architecture.png)

## About Redshift

Amazon Redshift is a fully managed, petabyte-scale data warehouse service in the cloud. Refer to the following resources
to get more information:

*   [What is Amazon Redshift](https://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html)
*   [Designing tables](https://docs.aws.amazon.com/redshift/latest/dg/t_Creating_tables.html)
*   [Loading data](https://docs.aws.amazon.com/redshift/latest/dg/t_Loading_data.html)
*   [Querying Redshift](https://docs.aws.amazon.com/redshift/latest/mgmt/query-databases.html)
*   [Redshift best practices](https://docs.aws.amazon.com/redshift/latest/dg/best-practices.html)

## Serverless

Amazon Redshift Serverless makes it convenient for you to run and scale analytics without having to provision and manage
data warehouses. Use the `var.enable_serverless` to enable serverless and the `var.serverless_base_capacity` to set teh
base Redshift Processing Units (RPU) for serving queries.

Refer to the [Amazon Redshift Serverless](https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-serverless.html)
page for more information.

**Note**: it seems like the `terraform destroy` command is not working smoothly for Redshift serverless feature
yet ([hashicorp/terraform-provider-aws#29962](https://github.com/hashicorp/terraform-provider-aws/issues/29962)). Users
would likely encounter error when trying to delete a workgroup associated with the Redshift serverless namespace. As a
workaround, you can re-run the destroy command once the workspace gets deleted completely (e.g., after 30 mins).

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S REDSHIFT MODULE
# ------------------------------------------------------------------------------------------------------

module "redshift" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/redshift?ref=v0.45.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name used to namespace all resources created by these templates,
  # including the DB instance (e.g. drupaldb). Must be unique for this region.
  # May contain only lowercase alphanumeric characters, hyphens.
  name = <string>

  # A list of subnet ids where the database should be deployed. In the standard
  # Gruntwork VPC setup, these should be the private persistence subnet ids.
  subnet_ids = <list(string)>

  # The id of the VPC in which this DB should be deployed.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of CIDR-formatted IP address ranges that can connect to this DB.
  # Should typically be the CIDR blocks of the private app subnet in this VPC
  # plus the private subnet in the mgmt VPC. This is ignored if
  # create_subnet_group=false.
  allow_connections_from_cidr_blocks = []

  # A list of Security Groups that can connect to this DB.
  allow_connections_from_security_groups = []

  # Indicates whether major version upgrades (e.g. 9.4.x to 9.5.x) will ever be
  # permitted. Note that these updates must always be manually performed and
  # will never automatically applied.
  allow_major_version_upgrade = true

  # A list of CIDR-formatted IP address ranges that this DB can connect. Use
  # this if the database needs to connect to certain IP addresses for special
  # operation
  allow_outbound_connections_from_cidr_blocks = []

  # Specifies whether any cluster modifications are applied immediately, or
  # during the next maintenance window.
  apply_immediately = false

  # Indicates that minor engine upgrades will be applied automatically to the DB
  # instance during the maintenance window. If set to true, you should set
  # var.engine_version to MAJOR.MINOR and omit the .PATCH at the end (e.g., use
  # 5.7 and not 5.7.11); otherwise, you'll get Terraform state drift. See
  # https://www.terraform.io/docs/providers/aws/r/db_instance.html#engine_version
  # for more details.
  auto_minor_version_upgrade = true

  #  If true, the cluster can be relocated to another availabity zone, either
  # automatically by AWS or when requested. Default is false. Available for use
  # on clusters from the RA3 instance family.
  availability_zone_relocation_enabled = null

  # The description of the aws_db_security_group that is created. Defaults to
  # 'Security group for the var.name DB' if not specified.
  aws_db_security_group_description = null

  # The name of the aws_db_security_group that is created. Defaults to var.name
  # if not specified.
  aws_db_security_group_name = null

  # How many days to keep backup snapshots around before cleaning them up. Must
  # be 1 or greater to support read replicas.
  backup_retention_period = 21

  # The description of the cluster_subnet_group that is created. Defaults to
  # 'Subnet group for the var.name DB' if not specified.
  cluster_subnet_group_description = null

  # The name of the cluster_subnet_group that is created, or an existing one to
  # use if cluster_subnet_group is false. Defaults to var.name if not specified.
  cluster_subnet_group_name = null

  # If false, the DB will bind to aws_db_subnet_group_name and the CIDR will be
  # ignored (allow_connections_from_cidr_blocks)
  create_subnet_group = true

  # Timeout for DB creating
  creating_timeout = "75m"

  # A map of custom tags to apply to the RDS Instance and the Security Group
  # created for it. The key is the tag name and the value is the tag value.
  custom_tags = {}

  # The name of the first database to create in the Redshift cluster. Must be
  # 1-127 characters. Must begin with a letter or underscore. Subsequent
  # characters can be letters, underscores, digits, or dollar signs. Cannot be a
  # reserved word. Default is 'dev'.
  db_name = "dev"

  # Timeout for DB deleting
  deleting_timeout = "40m"

  # Elastic IP that will be associated with the cluster
  elastic_ip = null

  # Whether to enable serverless feature or not. Refer to
  # https://docs.aws.amazon.com/redshift/latest/gsg/new-user-serverless.html for
  # more information.
  enable_serverless = false

  # If true , enhanced VPC routing is enabled. Forces COPY and UNLOAD traffic
  # between the cluster and data repositories to go through your VPC.
  enhanced_vpc_routing = false

  # The name of the final_snapshot_identifier. Defaults to
  # var.name-final-snapshot if not specified.
  final_snapshot_name = null

  # A list of IAM Role ARNs to associate with the cluster. A Maximum of 10 can
  # be associated to the cluster at any time.
  iam_roles = null

  # The instance type to use for the db (e.g. ra3.large). This field is
  # mandatory for provisioned Redshift.
  instance_type = null

  # The ARN of a KMS key that should be used to encrypt data on disk. Only used
  # if var.storage_encrypted is true. If you leave this blank, the default RDS
  # KMS key for the account will be used.
  kms_key_arn = null

  # Required when log_destination_type is s3. Name of an existing S3 bucket
  # where the log files are to be stored. Must be in the same region as the
  # cluster and the cluster must have read bucket and put object permissions.
  logging_bucket_name = null

  # Boolean to toggle database audit logging.
  logging_enable = false

  # Type of the rule group. Valid values: "s3", "cloudwatch"
  logging_log_destination_type = null

  # Required when log_destination_type is cloudwatch. Collection of exported log
  # types. See variable definition for details
  logging_log_exports = null

  # Required when log_destination_type is s3. Prefix applied to the log file
  # names.
  logging_s3_key_prefix = null

  # The name of the maintenance track to apply to the cluster.
  maintenance_track_name = null

  # The weekly day and time range during which system maintenance can occur
  # (e.g. wed:04:00-wed:04:30). Time zone is UTC. Performance may be degraded or
  # there may even be a downtime during maintenance windows.
  maintenance_window = "sun:07:00-sun:08:00"

  # The password for the master user. If var.snapshot_identifier is non-empty,
  # this value is ignored. Required unless var.replicate_source_db is set.
  master_password = null

  # The username for the master user. Required unless var.replicate_source_db is
  # set.
  master_username = null

  # The number of nodes in the cluster. This field is mandatory for provisioned
  # Redshift.
  number_of_nodes = null

  # Name of a Redshift parameter group to associate.
  parameter_group_name = null

  # The port the DB will listen on (e.g. 3306)
  port = 5439

  # WARNING: - In nearly all cases a database should NOT be publicly accessible.
  # Only set this to true if you want the database open to the internet.
  publicly_accessible = false

  # This setting specifies the base data warehouse capacity Amazon Redshift uses
  # to serve queries. Base capacity is specified in RPUs. You can set a base
  # capacity in Redshift Processing Units (RPUs). One RPU provides 16 GB of
  # memory. You can adjust the Base capacity setting from 8 RPUs to 512 RPUs in
  # units of 8. This field is mandatory for serverless.
  serverless_base_capacity = null

  # Determines whether a final DB snapshot is created before the DB instance is
  # deleted. Be very careful setting this to true; if you do, and you delete
  # this DB instance, you will not have any backups of the data!
  skip_final_snapshot = false

  # If non-null, the name of the cluster the source snapshot was created from.
  snapshot_cluster_identifier = null

  # Configuration of automatic copy of snapshots from one region to another. See
  # https://registry.terraform.io/providers/hashicorp/aws/5.40.0/docs/resources/redshift_cluster#snapshot_copy
  # for more detail
  snapshot_copy = null

  # If non-null, the Redshift cluster will be restored from the given Snapshot
  # ID. This is the Snapshot ID you'd find in the Redshift console, e.g:
  # rs:production-2015-06-26-06-05.
  snapshot_identifier = null

  # Required if you are restoring a snapshot you do not own, optional if you own
  # the snapshot. The AWS customer account used to create or copy the snapshot.
  snapshot_owner_account = null

  # Automatic snapshot schedule definition. See
  # https://registry.terraform.io/providers/hashicorp/aws/5.40.0/docs/resources/redshift_snapshot_schedule#definitions
  # for more detail
  snapshot_schedule_definitions = []

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
  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/redshift?ref=v0.45.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name used to namespace all resources created by these templates,
  # including the DB instance (e.g. drupaldb). Must be unique for this region.
  # May contain only lowercase alphanumeric characters, hyphens.
  name = <string>

  # A list of subnet ids where the database should be deployed. In the standard
  # Gruntwork VPC setup, these should be the private persistence subnet ids.
  subnet_ids = <list(string)>

  # The id of the VPC in which this DB should be deployed.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of CIDR-formatted IP address ranges that can connect to this DB.
  # Should typically be the CIDR blocks of the private app subnet in this VPC
  # plus the private subnet in the mgmt VPC. This is ignored if
  # create_subnet_group=false.
  allow_connections_from_cidr_blocks = []

  # A list of Security Groups that can connect to this DB.
  allow_connections_from_security_groups = []

  # Indicates whether major version upgrades (e.g. 9.4.x to 9.5.x) will ever be
  # permitted. Note that these updates must always be manually performed and
  # will never automatically applied.
  allow_major_version_upgrade = true

  # A list of CIDR-formatted IP address ranges that this DB can connect. Use
  # this if the database needs to connect to certain IP addresses for special
  # operation
  allow_outbound_connections_from_cidr_blocks = []

  # Specifies whether any cluster modifications are applied immediately, or
  # during the next maintenance window.
  apply_immediately = false

  # Indicates that minor engine upgrades will be applied automatically to the DB
  # instance during the maintenance window. If set to true, you should set
  # var.engine_version to MAJOR.MINOR and omit the .PATCH at the end (e.g., use
  # 5.7 and not 5.7.11); otherwise, you'll get Terraform state drift. See
  # https://www.terraform.io/docs/providers/aws/r/db_instance.html#engine_version
  # for more details.
  auto_minor_version_upgrade = true

  #  If true, the cluster can be relocated to another availabity zone, either
  # automatically by AWS or when requested. Default is false. Available for use
  # on clusters from the RA3 instance family.
  availability_zone_relocation_enabled = null

  # The description of the aws_db_security_group that is created. Defaults to
  # 'Security group for the var.name DB' if not specified.
  aws_db_security_group_description = null

  # The name of the aws_db_security_group that is created. Defaults to var.name
  # if not specified.
  aws_db_security_group_name = null

  # How many days to keep backup snapshots around before cleaning them up. Must
  # be 1 or greater to support read replicas.
  backup_retention_period = 21

  # The description of the cluster_subnet_group that is created. Defaults to
  # 'Subnet group for the var.name DB' if not specified.
  cluster_subnet_group_description = null

  # The name of the cluster_subnet_group that is created, or an existing one to
  # use if cluster_subnet_group is false. Defaults to var.name if not specified.
  cluster_subnet_group_name = null

  # If false, the DB will bind to aws_db_subnet_group_name and the CIDR will be
  # ignored (allow_connections_from_cidr_blocks)
  create_subnet_group = true

  # Timeout for DB creating
  creating_timeout = "75m"

  # A map of custom tags to apply to the RDS Instance and the Security Group
  # created for it. The key is the tag name and the value is the tag value.
  custom_tags = {}

  # The name of the first database to create in the Redshift cluster. Must be
  # 1-127 characters. Must begin with a letter or underscore. Subsequent
  # characters can be letters, underscores, digits, or dollar signs. Cannot be a
  # reserved word. Default is 'dev'.
  db_name = "dev"

  # Timeout for DB deleting
  deleting_timeout = "40m"

  # Elastic IP that will be associated with the cluster
  elastic_ip = null

  # Whether to enable serverless feature or not. Refer to
  # https://docs.aws.amazon.com/redshift/latest/gsg/new-user-serverless.html for
  # more information.
  enable_serverless = false

  # If true , enhanced VPC routing is enabled. Forces COPY and UNLOAD traffic
  # between the cluster and data repositories to go through your VPC.
  enhanced_vpc_routing = false

  # The name of the final_snapshot_identifier. Defaults to
  # var.name-final-snapshot if not specified.
  final_snapshot_name = null

  # A list of IAM Role ARNs to associate with the cluster. A Maximum of 10 can
  # be associated to the cluster at any time.
  iam_roles = null

  # The instance type to use for the db (e.g. ra3.large). This field is
  # mandatory for provisioned Redshift.
  instance_type = null

  # The ARN of a KMS key that should be used to encrypt data on disk. Only used
  # if var.storage_encrypted is true. If you leave this blank, the default RDS
  # KMS key for the account will be used.
  kms_key_arn = null

  # Required when log_destination_type is s3. Name of an existing S3 bucket
  # where the log files are to be stored. Must be in the same region as the
  # cluster and the cluster must have read bucket and put object permissions.
  logging_bucket_name = null

  # Boolean to toggle database audit logging.
  logging_enable = false

  # Type of the rule group. Valid values: "s3", "cloudwatch"
  logging_log_destination_type = null

  # Required when log_destination_type is cloudwatch. Collection of exported log
  # types. See variable definition for details
  logging_log_exports = null

  # Required when log_destination_type is s3. Prefix applied to the log file
  # names.
  logging_s3_key_prefix = null

  # The name of the maintenance track to apply to the cluster.
  maintenance_track_name = null

  # The weekly day and time range during which system maintenance can occur
  # (e.g. wed:04:00-wed:04:30). Time zone is UTC. Performance may be degraded or
  # there may even be a downtime during maintenance windows.
  maintenance_window = "sun:07:00-sun:08:00"

  # The password for the master user. If var.snapshot_identifier is non-empty,
  # this value is ignored. Required unless var.replicate_source_db is set.
  master_password = null

  # The username for the master user. Required unless var.replicate_source_db is
  # set.
  master_username = null

  # The number of nodes in the cluster. This field is mandatory for provisioned
  # Redshift.
  number_of_nodes = null

  # Name of a Redshift parameter group to associate.
  parameter_group_name = null

  # The port the DB will listen on (e.g. 3306)
  port = 5439

  # WARNING: - In nearly all cases a database should NOT be publicly accessible.
  # Only set this to true if you want the database open to the internet.
  publicly_accessible = false

  # This setting specifies the base data warehouse capacity Amazon Redshift uses
  # to serve queries. Base capacity is specified in RPUs. You can set a base
  # capacity in Redshift Processing Units (RPUs). One RPU provides 16 GB of
  # memory. You can adjust the Base capacity setting from 8 RPUs to 512 RPUs in
  # units of 8. This field is mandatory for serverless.
  serverless_base_capacity = null

  # Determines whether a final DB snapshot is created before the DB instance is
  # deleted. Be very careful setting this to true; if you do, and you delete
  # this DB instance, you will not have any backups of the data!
  skip_final_snapshot = false

  # If non-null, the name of the cluster the source snapshot was created from.
  snapshot_cluster_identifier = null

  # Configuration of automatic copy of snapshots from one region to another. See
  # https://registry.terraform.io/providers/hashicorp/aws/5.40.0/docs/resources/redshift_cluster#snapshot_copy
  # for more detail
  snapshot_copy = null

  # If non-null, the Redshift cluster will be restored from the given Snapshot
  # ID. This is the Snapshot ID you'd find in the Redshift console, e.g:
  # rs:production-2015-06-26-06-05.
  snapshot_identifier = null

  # Required if you are restoring a snapshot you do not own, optional if you own
  # the snapshot. The AWS customer account used to create or copy the snapshot.
  snapshot_owner_account = null

  # Automatic snapshot schedule definition. See
  # https://registry.terraform.io/providers/hashicorp/aws/5.40.0/docs/resources/redshift_snapshot_schedule#definitions
  # for more detail
  snapshot_schedule_definitions = []

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

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name used to namespace all resources created by these templates, including the DB instance (e.g. drupaldb). Must be unique for this region. May contain only lowercase alphanumeric characters, hyphens.

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

<HclListItem name="allow_outbound_connections_from_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of CIDR-formatted IP address ranges that this DB can connect. Use this if the database needs to connect to certain IP addresses for special operation

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="apply_immediately" requirement="optional" type="string">
<HclListItemDescription>

Specifies whether any cluster modifications are applied immediately, or during the next maintenance window.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="auto_minor_version_upgrade" requirement="optional" type="bool">
<HclListItemDescription>

Indicates that minor engine upgrades will be applied automatically to the DB instance during the maintenance window. If set to true, you should set <a href="#engine_version"><code>engine_version</code></a> to MAJOR.MINOR and omit the .PATCH at the end (e.g., use 5.7 and not 5.7.11); otherwise, you'll get Terraform state drift. See https://www.terraform.io/docs/providers/aws/r/db_instance.html#engine_version for more details.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="availability_zone_relocation_enabled" requirement="optional" type="bool">
<HclListItemDescription>

 If true, the cluster can be relocated to another availabity zone, either automatically by AWS or when requested. Default is false. Available for use on clusters from the RA3 instance family.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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

The name of the first database to create in the Redshift cluster. Must be 1-127 characters. Must begin with a letter or underscore. Subsequent characters can be letters, underscores, digits, or dollar signs. Cannot be a reserved word. Default is 'dev'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;dev&quot;"/>
</HclListItem>

<HclListItem name="deleting_timeout" requirement="optional" type="string">
<HclListItemDescription>

Timeout for DB deleting

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;40m&quot;"/>
</HclListItem>

<HclListItem name="elastic_ip" requirement="optional" type="string">
<HclListItemDescription>

Elastic IP that will be associated with the cluster

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="enable_serverless" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable serverless feature or not. Refer to https://docs.aws.amazon.com/redshift/latest/gsg/new-user-serverless.html for more information.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
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

<HclListItem name="instance_type" requirement="optional" type="string">
<HclListItemDescription>

The instance type to use for the db (e.g. ra3.large). This field is mandatory for provisioned Redshift.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of a KMS key that should be used to encrypt data on disk. Only used if <a href="#storage_encrypted"><code>storage_encrypted</code></a> is true. If you leave this blank, the default RDS KMS key for the account will be used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="logging_bucket_name" requirement="optional" type="string">
<HclListItemDescription>

Required when log_destination_type is s3. Name of an existing S3 bucket where the log files are to be stored. Must be in the same region as the cluster and the cluster must have read bucket and put object permissions.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="logging_enable" requirement="optional" type="bool">
<HclListItemDescription>

Boolean to toggle database audit logging.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="logging_log_destination_type" requirement="optional" type="string">
<HclListItemDescription>

Type of the rule group. Valid values: 's3', 'cloudwatch'

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="logging_log_exports" requirement="optional" type="list(string)">
<HclListItemDescription>

Required when log_destination_type is cloudwatch. Collection of exported log types. See variable definition for details

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="logging_s3_key_prefix" requirement="optional" type="string">
<HclListItemDescription>

Required when log_destination_type is s3. Prefix applied to the log file names.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="maintenance_track_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the maintenance track to apply to the cluster.

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

<HclListItem name="number_of_nodes" requirement="optional" type="number">
<HclListItemDescription>

The number of nodes in the cluster. This field is mandatory for provisioned Redshift.

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

<HclListItem name="serverless_base_capacity" requirement="optional" type="number">
<HclListItemDescription>

This setting specifies the base data warehouse capacity Amazon Redshift uses to serve queries. Base capacity is specified in RPUs. You can set a base capacity in Redshift Processing Units (RPUs). One RPU provides 16 GB of memory. You can adjust the Base capacity setting from 8 RPUs to 512 RPUs in units of 8. This field is mandatory for serverless.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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

<HclListItem name="snapshot_copy" requirement="optional" type="map(any)">
<HclListItemDescription>

Configuration of automatic copy of snapshots from one region to another. See https://registry.terraform.io/providers/hashicorp/aws/5.40.0/docs/resources/redshift_cluster#snapshot_copy for more detail

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
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

<HclListItem name="snapshot_schedule_definitions" requirement="optional" type="list(string)">
<HclListItemDescription>

Automatic snapshot schedule definition. See https://registry.terraform.io/providers/hashicorp/aws/5.40.0/docs/resources/redshift_snapshot_schedule#definitions for more detail

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
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

The cluster's connection endpoint

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
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.45.0/modules/redshift/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.45.0/modules/redshift/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.45.0/modules/redshift/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "316f833be4ab2978476abe7b1862cc0b"
}
##DOCS-SOURCER-END -->
