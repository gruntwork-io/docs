---
title: "DMS Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Data Storage Modules" version="0.46.0" lastModifiedVersion="0.40.3"/>

# DMS Module

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.46.0/modules/dms" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.40.3" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module creates AWS Database Migration Service (DMS) resources for database migration and replication.

## What This Module Creates

*   DMS replication instance
*   Source and target endpoints
*   Replication tasks
*   Required IAM roles and policies
*   CloudWatch log groups
*   Security groups for network access

## Supported Engines

Currently supports:

*   MySQL
*   MariaDB
*   Aurora MySQL

(As source and target)

## Migration Types

The module supports three migration types via `migration_type` variable:

*   `full-load` - One-time migration
*   `cdc` - Ongoing replication only
*   `full-load-and-cdc` - Full migration plus ongoing replication

## Usage

```hcl
module "dms" {
  source = "../modules/dms"

  name = "my-database-migration"

  # Replication instance
  replication_instance_class = "dms.t3.medium"
  allocated_storage         = 100

  # Source endpoint
  source_endpoint_config = {
    endpoint_id   = "source-mysql"
    endpoint_type = "source"
    engine_name   = "mysql"
    server_name   = "source.example.com"
    port          = 3306
    username      = var.source_username
    password      = var.source_password
  }

  # Target endpoint
  target_endpoint_config = {
    endpoint_id   = "target-aurora"
    endpoint_type = "target"
    engine_name   = "aurora"
    server_name   = "target.cluster.amazonaws.com"
    port          = 3306
    username      = var.target_username
    password      = var.target_password
  }

  migration_type = "full-load-and-cdc"
}
```

## Configuration

*   See the [root README](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.46.0/README.md) for instructions on using Terraform modules.
*   See the [variables.tf](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.46.0/modules/dms/variables.tf) for all the variables you can set on this module.
*   See the [dms-mysql examples](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.46.0/examples/dms-mysql/) folder for instruction on how to setup the modules to migrate data from an AWS RDS MySQL Instance to another AWS RDS MySQL Instance.
*   See the [dms-aurora examples](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.46.0/examples/dms-aurora/) folder for instructions on how to setup the modules to migrate data from an AWS RDS MySQL Instance to another AWS RDS MySQL Instance.

## Key Variables

*   `name` - Name prefix for all DMS resources
*   `replication_instance_class` - Instance size (e.g., dms.t3.medium)
*   `allocated_storage` - Storage in GB
*   `vpc_id` - VPC for deployment
*   `subnet_ids` - Subnets for replication instance
*   `migration_type` - full-load, cdc, or full-load-and-cdc

## Common Issues

*   **Network**: Ensure replication instance can reach both databases
*   **Storage**: Allocate enough for your data volume
*   **Primary keys**: Required for CDC performance
*   **LOB columns**: May need special handling

## Outputs

*   `replication_instance_arn` - ARN of replication instance
*   `source_endpoint_arn` - Source endpoint ARN
*   `target_endpoint_arn` - Target endpoint ARN
*   `replication_task_arn` - Task ARN

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S DMS MODULE
# ------------------------------------------------------------------------------------------------------

module "dms" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/dms?ref=v0.46.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The compute and memory capacity of the replication instance as specified by
  # the replication instance class
  instance_type = <string>

  # The name used to namespace all resources created by these templates,
  # including the DB instance (e.g. drupaldb). Must be unique for this region.
  # May contain only lowercase alphanumeric characters, hyphens, underscores,
  # periods, and spaces.
  name = <string>

  # A list of subnet ids where the Replication Instance should be deployed. In
  # the standard Gruntwork VPC setup, these should be the private persistence
  # subnet ids. This is ignored if create_subnet_group=false.
  subnet_ids = <list(string)>

  # The migration type. Can be one of `full-load` | `cdc` | `full-load-and-cdc`.
  task_migration_type = <string>

  # An escaped JSON string that contains the table mappings. For information on
  # table mapping see
  # http://docs.aws.amazon.com/dms/latest/userguide/CHAP_Tasks.CustomizingTasks.TableMapping.html
  task_table_mappings = <string>

  # The id of the VPC in which this Replication Instance should be deployed.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # If false, the DMS instance will bind to `instance_subnet_group_id` variable.
  create_subnet_group = true

  # A map of custom tags to apply to the DMS Instance and the Security Group
  # created for it. The key is the tag name and the value is the tag value.
  custom_tags = {}

  # The amount of storage (in gigabytes) to be initially allocated for the
  # replication instance. Min: 5, Max: 6144, Default: 50
  instance_allocated_storage = null

  # Indicates that major version upgrades are allowed
  instance_allow_major_version_upgrade = true

  # Indicates whether the changes should be applied immediately or during the
  # next maintenance window
  instance_apply_immediately = null

  # Indicates that minor engine upgrades will be applied automatically to the
  # replication instance during the maintenance window
  instance_auto_minor_version_upgrade = true

  # The EC2 Availability Zone that the replication instance will be created in
  instance_availability_zone = null

  # The [engine
  # version](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_ReleaseNotes.html)
  # number of the replication instance
  instance_engine_version = null

  # The replication instance identifier. This parameter is stored as a lowercase
  # string
  instance_id = null

  # The Amazon Resource Name (ARN) for the KMS key that will be used to encrypt
  # the connection parameters
  instance_kms_key_arn = null

  # Specifies if the replication instance is a multi-az deployment. You cannot
  # set the `availability_zone` parameter if the `multi_az` parameter is set to
  # `true`
  instance_multi_az = null

  # The weekly time range during which system maintenance can occur, in
  # Universal Coordinated Time (UTC)
  instance_preferred_maintenance_window = null

  # Specifies the accessibility options for the replication instance
  instance_publicly_accessible = null

  # An existing subnet group to associate with the replication instance
  instance_subnet_group_id = null

  # A map of additional tags to apply to the replication instance
  instance_tags = {}

  # A map of timeouts for replication instance create/update/delete operations
  instance_timeouts = {}

  # A list of VPC security group IDs to be used with the replication instance
  instance_vpc_security_group_ids = null

  # Name of the endpoint database
  source_endpoint_database_name = null

  # Type of engine for the endpoint.
  source_endpoint_engine_name = "mysql"

  # Additional attributes associated with the connection. For available
  # attributes for a source Endpoint, see
  # https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.html. For
  # available attributes for a target Endpoint, see
  # https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.html.
  source_endpoint_extra_connection_attributes = null

  # ARN for the KMS key that will be used to encrypt the connection parameters.
  # If you do not specify a value for kms_key_arn, then AWS DMS will use your
  # default encryption key. AWS KMS creates the default encryption key for your
  # AWS account. Your AWS account has a different default encryption key for
  # each AWS region
  source_endpoint_kms_key_arn = null

  # Password to be used to login to the endpoint database.
  source_endpoint_password = null

  #  Port used by the endpoint database.
  source_endpoint_port = null

  # (Required if using non-s3 source) Host name of the server.
  source_endpoint_server_name = null

  # SSL mode to use for the connection. Valid values are none, require,
  # verify-ca, verify-full
  source_endpoint_ssl_mode = "none"

  # User name to be used to login to the endpoint database.
  source_endpoint_username = null

  # (Required if using s3) S3 bucket name.
  source_s3_bucket_name = null

  # (Required if using s3 for CDC; otherwise, Optional) Folder path of CDC
  # files. If cdc_path is set, AWS DMS reads CDC files from this path and
  # replicates the data changes to the target endpoint. Supported in AWS DMS
  # versions 3.4.2 and later.
  source_s3_cdc_path = null

  # (Required if using s3) JSON document that describes how AWS DMS should
  # interpret the data.
  source_s3_external_table_definition = null

  # ARN of the IAM role with permissions to the S3 Bucket. Default one will be
  # created if not specified
  source_s3_service_access_role_arn = null

  # The description of the aws_dms_replication_subnet_group that is created.
  # Defaults to 'Subnet group for the var.name DB' if not specified.
  subnet_group_description = null

  # The name of the aws_dms_replication_subnet_group that is created, or an
  # existing one to use if create_subnet_group is false. Defaults to var.name if
  # not specified.
  subnet_group_name = null

  # Name of the endpoint database
  target_endpoint_database_name = null

  # Type of engine for the endpoint. 
  target_endpoint_engine_name = "mysql"

  # Additional attributes associated with the connection. For available
  # attributes for a source Endpoint, see
  # https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.html. For
  # available attributes for a target Endpoint, see
  # https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.html.
  target_endpoint_extra_connection_attributes = null

  # ARN for the KMS key that will be used to encrypt the connection parameters.
  # If you do not specify a value for kms_key_arn, then AWS DMS will use your
  # default encryption key. AWS KMS creates the default encryption key for your
  # AWS account. Your AWS account has a different default encryption key for
  # each AWS region
  target_endpoint_kms_key_arn = null

  # Password to be used to login to the endpoint database.
  target_endpoint_password = null

  #  Port used by the endpoint database.
  target_endpoint_port = null

  # (Required if using non-s3 target) Host name of the server.
  target_endpoint_server_name = null

  # SSL mode to use for the connection. Valid values are none, require,
  # verify-ca, verify-full
  target_endpoint_ssl_mode = "none"

  # User name to be used to login to the endpoint database.
  target_endpoint_username = null

  # (Required if using s3) S3 bucket name.
  target_s3_bucket_name = null

  # Folder path of CDC files. If cdc_path is set, AWS DMS reads CDC files from
  # this path and replicates the data changes to the target endpoint. Supported
  # in AWS DMS versions 3.4.2 and later.
  target_s3_cdc_path = null

  # JSON document that describes how AWS DMS should interpret the data.
  target_s3_external_table_definition = null

  # ARN of the IAM role with permissions to the S3 Bucket. Default one will be
  # created if not specified
  target_s3_service_access_role_arn = null

  # (Conflicts with task_cdc_start_time) Indicates when you want a change data
  # capture (CDC) operation to start. The value can be in date, checkpoint, or
  # LSN/SCN format depending on the source engine. For more information, see
  # https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Task.CDC.html#CHAP_Task.CDC.StartPoint.Native.
  task_cdc_start_position = null

  # (Conflicts with task_cdc_start_position) The Unix timestamp integer for the
  # start of the Change Data Capture (CDC) operation.
  task_cdc_start_time = null

  # An escaped JSON string that contains the task settings. For a complete list
  # of task settings, see
  # http://docs.aws.amazon.com/dms/latest/userguide/CHAP_Tasks.CustomizingTasks.TaskSettings.html.
  task_settings = null

  # Whether to run or stop the replication task.
  task_start_replication_task = false

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S DMS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/dms?ref=v0.46.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The compute and memory capacity of the replication instance as specified by
  # the replication instance class
  instance_type = <string>

  # The name used to namespace all resources created by these templates,
  # including the DB instance (e.g. drupaldb). Must be unique for this region.
  # May contain only lowercase alphanumeric characters, hyphens, underscores,
  # periods, and spaces.
  name = <string>

  # A list of subnet ids where the Replication Instance should be deployed. In
  # the standard Gruntwork VPC setup, these should be the private persistence
  # subnet ids. This is ignored if create_subnet_group=false.
  subnet_ids = <list(string)>

  # The migration type. Can be one of `full-load` | `cdc` | `full-load-and-cdc`.
  task_migration_type = <string>

  # An escaped JSON string that contains the table mappings. For information on
  # table mapping see
  # http://docs.aws.amazon.com/dms/latest/userguide/CHAP_Tasks.CustomizingTasks.TableMapping.html
  task_table_mappings = <string>

  # The id of the VPC in which this Replication Instance should be deployed.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # If false, the DMS instance will bind to `instance_subnet_group_id` variable.
  create_subnet_group = true

  # A map of custom tags to apply to the DMS Instance and the Security Group
  # created for it. The key is the tag name and the value is the tag value.
  custom_tags = {}

  # The amount of storage (in gigabytes) to be initially allocated for the
  # replication instance. Min: 5, Max: 6144, Default: 50
  instance_allocated_storage = null

  # Indicates that major version upgrades are allowed
  instance_allow_major_version_upgrade = true

  # Indicates whether the changes should be applied immediately or during the
  # next maintenance window
  instance_apply_immediately = null

  # Indicates that minor engine upgrades will be applied automatically to the
  # replication instance during the maintenance window
  instance_auto_minor_version_upgrade = true

  # The EC2 Availability Zone that the replication instance will be created in
  instance_availability_zone = null

  # The [engine
  # version](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_ReleaseNotes.html)
  # number of the replication instance
  instance_engine_version = null

  # The replication instance identifier. This parameter is stored as a lowercase
  # string
  instance_id = null

  # The Amazon Resource Name (ARN) for the KMS key that will be used to encrypt
  # the connection parameters
  instance_kms_key_arn = null

  # Specifies if the replication instance is a multi-az deployment. You cannot
  # set the `availability_zone` parameter if the `multi_az` parameter is set to
  # `true`
  instance_multi_az = null

  # The weekly time range during which system maintenance can occur, in
  # Universal Coordinated Time (UTC)
  instance_preferred_maintenance_window = null

  # Specifies the accessibility options for the replication instance
  instance_publicly_accessible = null

  # An existing subnet group to associate with the replication instance
  instance_subnet_group_id = null

  # A map of additional tags to apply to the replication instance
  instance_tags = {}

  # A map of timeouts for replication instance create/update/delete operations
  instance_timeouts = {}

  # A list of VPC security group IDs to be used with the replication instance
  instance_vpc_security_group_ids = null

  # Name of the endpoint database
  source_endpoint_database_name = null

  # Type of engine for the endpoint.
  source_endpoint_engine_name = "mysql"

  # Additional attributes associated with the connection. For available
  # attributes for a source Endpoint, see
  # https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.html. For
  # available attributes for a target Endpoint, see
  # https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.html.
  source_endpoint_extra_connection_attributes = null

  # ARN for the KMS key that will be used to encrypt the connection parameters.
  # If you do not specify a value for kms_key_arn, then AWS DMS will use your
  # default encryption key. AWS KMS creates the default encryption key for your
  # AWS account. Your AWS account has a different default encryption key for
  # each AWS region
  source_endpoint_kms_key_arn = null

  # Password to be used to login to the endpoint database.
  source_endpoint_password = null

  #  Port used by the endpoint database.
  source_endpoint_port = null

  # (Required if using non-s3 source) Host name of the server.
  source_endpoint_server_name = null

  # SSL mode to use for the connection. Valid values are none, require,
  # verify-ca, verify-full
  source_endpoint_ssl_mode = "none"

  # User name to be used to login to the endpoint database.
  source_endpoint_username = null

  # (Required if using s3) S3 bucket name.
  source_s3_bucket_name = null

  # (Required if using s3 for CDC; otherwise, Optional) Folder path of CDC
  # files. If cdc_path is set, AWS DMS reads CDC files from this path and
  # replicates the data changes to the target endpoint. Supported in AWS DMS
  # versions 3.4.2 and later.
  source_s3_cdc_path = null

  # (Required if using s3) JSON document that describes how AWS DMS should
  # interpret the data.
  source_s3_external_table_definition = null

  # ARN of the IAM role with permissions to the S3 Bucket. Default one will be
  # created if not specified
  source_s3_service_access_role_arn = null

  # The description of the aws_dms_replication_subnet_group that is created.
  # Defaults to 'Subnet group for the var.name DB' if not specified.
  subnet_group_description = null

  # The name of the aws_dms_replication_subnet_group that is created, or an
  # existing one to use if create_subnet_group is false. Defaults to var.name if
  # not specified.
  subnet_group_name = null

  # Name of the endpoint database
  target_endpoint_database_name = null

  # Type of engine for the endpoint. 
  target_endpoint_engine_name = "mysql"

  # Additional attributes associated with the connection. For available
  # attributes for a source Endpoint, see
  # https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.html. For
  # available attributes for a target Endpoint, see
  # https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.html.
  target_endpoint_extra_connection_attributes = null

  # ARN for the KMS key that will be used to encrypt the connection parameters.
  # If you do not specify a value for kms_key_arn, then AWS DMS will use your
  # default encryption key. AWS KMS creates the default encryption key for your
  # AWS account. Your AWS account has a different default encryption key for
  # each AWS region
  target_endpoint_kms_key_arn = null

  # Password to be used to login to the endpoint database.
  target_endpoint_password = null

  #  Port used by the endpoint database.
  target_endpoint_port = null

  # (Required if using non-s3 target) Host name of the server.
  target_endpoint_server_name = null

  # SSL mode to use for the connection. Valid values are none, require,
  # verify-ca, verify-full
  target_endpoint_ssl_mode = "none"

  # User name to be used to login to the endpoint database.
  target_endpoint_username = null

  # (Required if using s3) S3 bucket name.
  target_s3_bucket_name = null

  # Folder path of CDC files. If cdc_path is set, AWS DMS reads CDC files from
  # this path and replicates the data changes to the target endpoint. Supported
  # in AWS DMS versions 3.4.2 and later.
  target_s3_cdc_path = null

  # JSON document that describes how AWS DMS should interpret the data.
  target_s3_external_table_definition = null

  # ARN of the IAM role with permissions to the S3 Bucket. Default one will be
  # created if not specified
  target_s3_service_access_role_arn = null

  # (Conflicts with task_cdc_start_time) Indicates when you want a change data
  # capture (CDC) operation to start. The value can be in date, checkpoint, or
  # LSN/SCN format depending on the source engine. For more information, see
  # https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Task.CDC.html#CHAP_Task.CDC.StartPoint.Native.
  task_cdc_start_position = null

  # (Conflicts with task_cdc_start_position) The Unix timestamp integer for the
  # start of the Change Data Capture (CDC) operation.
  task_cdc_start_time = null

  # An escaped JSON string that contains the task settings. For a complete list
  # of task settings, see
  # http://docs.aws.amazon.com/dms/latest/userguide/CHAP_Tasks.CustomizingTasks.TaskSettings.html.
  task_settings = null

  # Whether to run or stop the replication task.
  task_start_replication_task = false

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

The compute and memory capacity of the replication instance as specified by the replication instance class

</HclListItemDescription>
</HclListItem>

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name used to namespace all resources created by these templates, including the DB instance (e.g. drupaldb). Must be unique for this region. May contain only lowercase alphanumeric characters, hyphens, underscores, periods, and spaces.

</HclListItemDescription>
</HclListItem>

<HclListItem name="subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

A list of subnet ids where the Replication Instance should be deployed. In the standard Gruntwork VPC setup, these should be the private persistence subnet ids. This is ignored if create_subnet_group=false.

</HclListItemDescription>
</HclListItem>

<HclListItem name="task_migration_type" requirement="required" type="string">
<HclListItemDescription>

The migration type. Can be one of `full-load` | `cdc` | `full-load-and-cdc`.

</HclListItemDescription>
</HclListItem>

<HclListItem name="task_table_mappings" requirement="required" type="string">
<HclListItemDescription>

An escaped JSON string that contains the table mappings. For information on table mapping see http://docs.aws.amazon.com/dms/latest/userguide/CHAP_Tasks.CustomizingTasks.TableMapping.html

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The id of the VPC in which this Replication Instance should be deployed.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="create_subnet_group" requirement="optional" type="bool">
<HclListItemDescription>

If false, the DMS instance will bind to `instance_subnet_group_id` variable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the DMS Instance and the Security Group created for it. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="instance_allocated_storage" requirement="optional" type="number">
<HclListItemDescription>

The amount of storage (in gigabytes) to be initially allocated for the replication instance. Min: 5, Max: 6144, Default: 50

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="instance_allow_major_version_upgrade" requirement="optional" type="bool">
<HclListItemDescription>

Indicates that major version upgrades are allowed

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="instance_apply_immediately" requirement="optional" type="bool">
<HclListItemDescription>

Indicates whether the changes should be applied immediately or during the next maintenance window

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="instance_auto_minor_version_upgrade" requirement="optional" type="bool">
<HclListItemDescription>

Indicates that minor engine upgrades will be applied automatically to the replication instance during the maintenance window

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="instance_availability_zone" requirement="optional" type="string">
<HclListItemDescription>

The EC2 Availability Zone that the replication instance will be created in

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="instance_engine_version" requirement="optional" type="string">
<HclListItemDescription>

The [engine version](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_ReleaseNotes.html) number of the replication instance

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="instance_id" requirement="optional" type="string">
<HclListItemDescription>

The replication instance identifier. This parameter is stored as a lowercase string

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="instance_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

The Amazon Resource Name (ARN) for the KMS key that will be used to encrypt the connection parameters

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="instance_multi_az" requirement="optional" type="bool">
<HclListItemDescription>

Specifies if the replication instance is a multi-az deployment. You cannot set the `availability_zone` parameter if the `multi_az` parameter is set to `true`

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="instance_preferred_maintenance_window" requirement="optional" type="string">
<HclListItemDescription>

The weekly time range during which system maintenance can occur, in Universal Coordinated Time (UTC)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="instance_publicly_accessible" requirement="optional" type="bool">
<HclListItemDescription>

Specifies the accessibility options for the replication instance

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="instance_subnet_group_id" requirement="optional" type="string">
<HclListItemDescription>

An existing subnet group to associate with the replication instance

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="instance_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of additional tags to apply to the replication instance

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="instance_timeouts" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of timeouts for replication instance create/update/delete operations

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="instance_vpc_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of VPC security group IDs to be used with the replication instance

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="source_endpoint_database_name" requirement="optional" type="string">
<HclListItemDescription>

Name of the endpoint database

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="source_endpoint_engine_name" requirement="optional" type="string">
<HclListItemDescription>

Type of engine for the endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;mysql&quot;"/>
</HclListItem>

<HclListItem name="source_endpoint_extra_connection_attributes" requirement="optional" type="string">
<HclListItemDescription>

Additional attributes associated with the connection. For available attributes for a source Endpoint, see https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.html. For available attributes for a target Endpoint, see https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.html.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="source_endpoint_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

ARN for the KMS key that will be used to encrypt the connection parameters. If you do not specify a value for kms_key_arn, then AWS DMS will use your default encryption key. AWS KMS creates the default encryption key for your AWS account. Your AWS account has a different default encryption key for each AWS region

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="source_endpoint_password" requirement="optional" type="string">
<HclListItemDescription>

Password to be used to login to the endpoint database.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="source_endpoint_port" requirement="optional" type="number">
<HclListItemDescription>

 Port used by the endpoint database.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="source_endpoint_server_name" requirement="optional" type="string">
<HclListItemDescription>

(Required if using non-s3 source) Host name of the server.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="source_endpoint_ssl_mode" requirement="optional" type="string">
<HclListItemDescription>

SSL mode to use for the connection. Valid values are none, require, verify-ca, verify-full

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;none&quot;"/>
</HclListItem>

<HclListItem name="source_endpoint_username" requirement="optional" type="string">
<HclListItemDescription>

User name to be used to login to the endpoint database.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="source_s3_bucket_name" requirement="optional" type="string">
<HclListItemDescription>

(Required if using s3) S3 bucket name.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="source_s3_cdc_path" requirement="optional" type="string">
<HclListItemDescription>

(Required if using s3 for CDC; otherwise, Optional) Folder path of CDC files. If cdc_path is set, AWS DMS reads CDC files from this path and replicates the data changes to the target endpoint. Supported in AWS DMS versions 3.4.2 and later.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="source_s3_external_table_definition" requirement="optional" type="string">
<HclListItemDescription>

(Required if using s3) JSON document that describes how AWS DMS should interpret the data.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="source_s3_service_access_role_arn" requirement="optional" type="string">
<HclListItemDescription>

ARN of the IAM role with permissions to the S3 Bucket. Default one will be created if not specified

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="subnet_group_description" requirement="optional" type="string">
<HclListItemDescription>

The description of the aws_dms_replication_subnet_group that is created. Defaults to 'Subnet group for the <a href="#name"><code>name</code></a> DB' if not specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="subnet_group_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the aws_dms_replication_subnet_group that is created, or an existing one to use if create_subnet_group is false. Defaults to <a href="#name"><code>name</code></a> if not specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="target_endpoint_database_name" requirement="optional" type="string">
<HclListItemDescription>

Name of the endpoint database

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="target_endpoint_engine_name" requirement="optional" type="string">
<HclListItemDescription>

Type of engine for the endpoint. 

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;mysql&quot;"/>
</HclListItem>

<HclListItem name="target_endpoint_extra_connection_attributes" requirement="optional" type="string">
<HclListItemDescription>

Additional attributes associated with the connection. For available attributes for a source Endpoint, see https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.html. For available attributes for a target Endpoint, see https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.html.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="target_endpoint_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

ARN for the KMS key that will be used to encrypt the connection parameters. If you do not specify a value for kms_key_arn, then AWS DMS will use your default encryption key. AWS KMS creates the default encryption key for your AWS account. Your AWS account has a different default encryption key for each AWS region

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="target_endpoint_password" requirement="optional" type="string">
<HclListItemDescription>

Password to be used to login to the endpoint database.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="target_endpoint_port" requirement="optional" type="number">
<HclListItemDescription>

 Port used by the endpoint database.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="target_endpoint_server_name" requirement="optional" type="string">
<HclListItemDescription>

(Required if using non-s3 target) Host name of the server.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="target_endpoint_ssl_mode" requirement="optional" type="string">
<HclListItemDescription>

SSL mode to use for the connection. Valid values are none, require, verify-ca, verify-full

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;none&quot;"/>
</HclListItem>

<HclListItem name="target_endpoint_username" requirement="optional" type="string">
<HclListItemDescription>

User name to be used to login to the endpoint database.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="target_s3_bucket_name" requirement="optional" type="string">
<HclListItemDescription>

(Required if using s3) S3 bucket name.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="target_s3_cdc_path" requirement="optional" type="string">
<HclListItemDescription>

Folder path of CDC files. If cdc_path is set, AWS DMS reads CDC files from this path and replicates the data changes to the target endpoint. Supported in AWS DMS versions 3.4.2 and later.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="target_s3_external_table_definition" requirement="optional" type="string">
<HclListItemDescription>

JSON document that describes how AWS DMS should interpret the data.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="target_s3_service_access_role_arn" requirement="optional" type="string">
<HclListItemDescription>

ARN of the IAM role with permissions to the S3 Bucket. Default one will be created if not specified

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="task_cdc_start_position" requirement="optional" type="string">
<HclListItemDescription>

(Conflicts with task_cdc_start_time) Indicates when you want a change data capture (CDC) operation to start. The value can be in date, checkpoint, or LSN/SCN format depending on the source engine. For more information, see https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Task.CDC.html#CHAP_Task.CDC.StartPoint.Native.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="task_cdc_start_time" requirement="optional" type="string">
<HclListItemDescription>

(Conflicts with task_cdc_start_position) The Unix timestamp integer for the start of the Change Data Capture (CDC) operation.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="task_settings" requirement="optional" type="string">
<HclListItemDescription>

An escaped JSON string that contains the task settings. For a complete list of task settings, see http://docs.aws.amazon.com/dms/latest/userguide/CHAP_Tasks.CustomizingTasks.TaskSettings.html.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="task_start_replication_task" requirement="optional" type="bool">
<HclListItemDescription>

Whether to run or stop the replication task.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="endpoints">
<HclListItemDescription>

A map of maps containing the endpoints created and their full output of attributes and values

</HclListItemDescription>
</HclListItem>

<HclListItem name="replication_instance_arn">
<HclListItemDescription>

The Amazon Resource Name (ARN) of the replication instance

</HclListItemDescription>
</HclListItem>

<HclListItem name="replication_instance_private_ips">
<HclListItemDescription>

A list of the private IP addresses of the replication instance

</HclListItemDescription>
</HclListItem>

<HclListItem name="replication_instance_public_ips">
<HclListItemDescription>

A list of the public IP addresses of the replication instance

</HclListItemDescription>
</HclListItem>

<HclListItem name="replication_instance_tags_all">
<HclListItemDescription>

A map of tags assigned to the resource, including those inherited from the provider `default_tags` configuration block

</HclListItemDescription>
</HclListItem>

<HclListItem name="replication_subnet_group_id">
<HclListItemDescription>

The ID of the subnet group

</HclListItemDescription>
</HclListItem>

<HclListItem name="replication_tasks">
<HclListItemDescription>

A map of maps containing the replication tasks created and their full output of attributes and values

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.46.0/modules/dms/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.46.0/modules/dms/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.46.0/modules/dms/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "deae214ba85a6eba5bdc99d5ab15726c"
}
##DOCS-SOURCER-END -->
