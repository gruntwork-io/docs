---
title: "Amazon MQ Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Messaging" version="1.0.3" />

# Amazon MQ Module

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/tree/v1.0.3/modules/amazon-mq" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases?q=amazon-mq" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module deploys an [Amazon MQ](https://aws.amazon.com/amazon-mq/) broker supporting both **ActiveMQ** and **RabbitMQ** engine types.

## Engine Types

### ActiveMQ

*   Deployment modes: SINGLE_INSTANCE, ACTIVE_STANDBY_MULTI_AZ
*   Ports: 8162 (Web Console), 61617 (OpenWire+SSL), 5671 (AMQP+SSL), 8883 (MQTT+SSL), 61614 (STOMP+SSL), 61619 (WSS)
*   Supports EFS and EBS storage types, audit logging, and XML configuration

### RabbitMQ

*   Deployment modes: SINGLE_INSTANCE, CLUSTER_MULTI_AZ
*   Ports: 443 (Management UI), 5671 (AMQP+SSL)

## Usage

```hcl
module "amazon_mq" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/amazon-mq?ref=v0.0.1"

  broker_name        = "my-broker"
  engine_type        = "ActiveMQ"
  engine_version     = "5.18"
  host_instance_type = "mq.m5.large"
  deployment_mode    = "SINGLE_INSTANCE"

  subnet_ids = ["subnet-abc123"]
  vpc_id     = "vpc-abc123"

  admin_username = "admin"
  admin_password = var.admin_password

  allowed_cidr_blocks = ["10.0.0.0/16"]
}
```

See [variables.tf](https://github.com/gruntwork-io/terraform-aws-messaging/tree/v1.0.3/modules/amazon-mq/variables.tf) for all available options and the [examples folder](https://github.com/gruntwork-io/terraform-aws-messaging/tree/v1.0.3/examples) for working examples.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S AMAZON-MQ MODULE
#
# NOTE: This module uses some sensitive variables marked inline with "# SENSITIVE".
# When using values other than defaults for these variables, set them through environment variables or
# another secure method.
#
# ------------------------------------------------------------------------------------------------------

module "amazon_mq" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/amazon-mq?ref=v1.0.3"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The password for the admin user.
  admin_password = <string> # SENSITIVE

  # The username for the admin user.
  admin_username = <string>

  # The name of the Amazon MQ broker.
  broker_name = <string>

  # The type of broker engine. Valid values are ActiveMQ and RabbitMQ.
  engine_type = <string>

  # The version of the broker engine. For ActiveMQ, e.g. '5.18'. For RabbitMQ,
  # e.g. '3.13'.
  engine_version = <string>

  # The broker's instance type. e.g. 'mq.m5.large', 'mq.t3.micro'.
  host_instance_type = <string>

  # List of subnet IDs for the broker. Use 1 subnet for SINGLE_INSTANCE, 2+ for
  # ACTIVE_STANDBY_MULTI_AZ or CLUSTER_MULTI_AZ.
  subnet_ids = <list(string)>

  # The ID of the VPC in which to create the broker security group.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of additional security group IDs to attach to the broker.
  additional_security_group_ids = []

  # List of CIDR blocks allowed to connect to the broker.
  allowed_cidr_blocks = []

  # List of security group IDs allowed to connect to the broker.
  allowed_security_groups = []

  # List of application users for the broker. Each user should have username,
  # password, and optionally console_access and groups (ActiveMQ only).
  application_users = [] # SENSITIVE

  # Whether to apply changes to the broker immediately or during the next
  # maintenance window.
  apply_immediately = false

  # Whether to enable audit logging for the broker. Only supported for ActiveMQ
  # engine type.
  audit_log_enabled = false

  # Whether to automatically upgrade to new minor versions of the broker engine
  # as they are released.
  auto_minor_version_upgrade = false

  # The ActiveMQ XML configuration data. When set, an aws_mq_configuration
  # resource is created and associated with the broker. Only applicable for
  # ActiveMQ engine type.
  configuration_data = null

  # If you set this variable to false, this module will not create any
  # resources. This is used as a workaround because Terraform does not allow you
  # to use the 'count' parameter on modules.
  create_resources = true

  # Custom tags to apply to all resources created by this module.
  custom_tags = {}

  # The deployment mode of the broker. Valid values are SINGLE_INSTANCE,
  # ACTIVE_STANDBY_MULTI_AZ, and CLUSTER_MULTI_AZ.
  deployment_mode = "SINGLE_INSTANCE"

  # Whether to explicitly configure the encryption_options block on the broker.
  # Amazon MQ always encrypts data at rest. When true (default), you can specify
  # a custom KMS key via kms_key_id. When false, the block is omitted and AWS
  # uses its default AWS-owned key.
  enable_encryption = true

  # Whether to enable general logging for the broker.
  general_log_enabled = false

  # The ARN of a custom KMS key to use for encryption at rest. If not set and
  # enable_encryption is true, the AWS-owned key is used.
  kms_key_id = null

  # The day of the week for the maintenance window. e.g. 'MONDAY', 'TUESDAY',
  # etc. Set all three maintenance variables to enable.
  maintenance_day_of_week = null

  # The time of day for the maintenance window in 24-hour format. e.g. '02:00'.
  maintenance_time_of_day = null

  # The time zone for the maintenance window. e.g. 'UTC', 'America/New_York'.
  maintenance_time_zone = "UTC"

  # Whether to enable connections from applications outside of the VPC that
  # hosts the broker's subnets.
  publicly_accessible = false

  # The name for the security group. Defaults to '<broker_name>-mq' if not set.
  security_group_name = null

  # Storage type of the broker. Valid values are 'efs' and 'ebs'. Only
  # configurable for ActiveMQ (defaults to 'efs'). RabbitMQ always uses EBS.
  storage_type = null

  # Whether to use the AWS-owned KMS key for encryption at rest. Set to false to
  # use a custom kms_key_id.
  use_aws_owned_key = true

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S AMAZON-MQ MODULE
#
# NOTE: This module uses some sensitive variables marked inline with "# SENSITIVE".
# When using values other than defaults for these variables, set them through environment variables or
# another secure method.
#
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/amazon-mq?ref=v1.0.3"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The password for the admin user.
  admin_password = <string> # SENSITIVE

  # The username for the admin user.
  admin_username = <string>

  # The name of the Amazon MQ broker.
  broker_name = <string>

  # The type of broker engine. Valid values are ActiveMQ and RabbitMQ.
  engine_type = <string>

  # The version of the broker engine. For ActiveMQ, e.g. '5.18'. For RabbitMQ,
  # e.g. '3.13'.
  engine_version = <string>

  # The broker's instance type. e.g. 'mq.m5.large', 'mq.t3.micro'.
  host_instance_type = <string>

  # List of subnet IDs for the broker. Use 1 subnet for SINGLE_INSTANCE, 2+ for
  # ACTIVE_STANDBY_MULTI_AZ or CLUSTER_MULTI_AZ.
  subnet_ids = <list(string)>

  # The ID of the VPC in which to create the broker security group.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # List of additional security group IDs to attach to the broker.
  additional_security_group_ids = []

  # List of CIDR blocks allowed to connect to the broker.
  allowed_cidr_blocks = []

  # List of security group IDs allowed to connect to the broker.
  allowed_security_groups = []

  # List of application users for the broker. Each user should have username,
  # password, and optionally console_access and groups (ActiveMQ only).
  application_users = [] # SENSITIVE

  # Whether to apply changes to the broker immediately or during the next
  # maintenance window.
  apply_immediately = false

  # Whether to enable audit logging for the broker. Only supported for ActiveMQ
  # engine type.
  audit_log_enabled = false

  # Whether to automatically upgrade to new minor versions of the broker engine
  # as they are released.
  auto_minor_version_upgrade = false

  # The ActiveMQ XML configuration data. When set, an aws_mq_configuration
  # resource is created and associated with the broker. Only applicable for
  # ActiveMQ engine type.
  configuration_data = null

  # If you set this variable to false, this module will not create any
  # resources. This is used as a workaround because Terraform does not allow you
  # to use the 'count' parameter on modules.
  create_resources = true

  # Custom tags to apply to all resources created by this module.
  custom_tags = {}

  # The deployment mode of the broker. Valid values are SINGLE_INSTANCE,
  # ACTIVE_STANDBY_MULTI_AZ, and CLUSTER_MULTI_AZ.
  deployment_mode = "SINGLE_INSTANCE"

  # Whether to explicitly configure the encryption_options block on the broker.
  # Amazon MQ always encrypts data at rest. When true (default), you can specify
  # a custom KMS key via kms_key_id. When false, the block is omitted and AWS
  # uses its default AWS-owned key.
  enable_encryption = true

  # Whether to enable general logging for the broker.
  general_log_enabled = false

  # The ARN of a custom KMS key to use for encryption at rest. If not set and
  # enable_encryption is true, the AWS-owned key is used.
  kms_key_id = null

  # The day of the week for the maintenance window. e.g. 'MONDAY', 'TUESDAY',
  # etc. Set all three maintenance variables to enable.
  maintenance_day_of_week = null

  # The time of day for the maintenance window in 24-hour format. e.g. '02:00'.
  maintenance_time_of_day = null

  # The time zone for the maintenance window. e.g. 'UTC', 'America/New_York'.
  maintenance_time_zone = "UTC"

  # Whether to enable connections from applications outside of the VPC that
  # hosts the broker's subnets.
  publicly_accessible = false

  # The name for the security group. Defaults to '<broker_name>-mq' if not set.
  security_group_name = null

  # Storage type of the broker. Valid values are 'efs' and 'ebs'. Only
  # configurable for ActiveMQ (defaults to 'efs'). RabbitMQ always uses EBS.
  storage_type = null

  # Whether to use the AWS-owned KMS key for encryption at rest. Set to false to
  # use a custom kms_key_id.
  use_aws_owned_key = true

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="admin_password" requirement="required" type="string">
<HclListItemDescription>

The password for the admin user.

</HclListItemDescription>
</HclListItem>

<HclListItem name="admin_username" requirement="required" type="string">
<HclListItemDescription>

The username for the admin user.

</HclListItemDescription>
</HclListItem>

<HclListItem name="broker_name" requirement="required" type="string">
<HclListItemDescription>

The name of the Amazon MQ broker.

</HclListItemDescription>
</HclListItem>

<HclListItem name="engine_type" requirement="required" type="string">
<HclListItemDescription>

The type of broker engine. Valid values are ActiveMQ and RabbitMQ.

</HclListItemDescription>
</HclListItem>

<HclListItem name="engine_version" requirement="required" type="string">
<HclListItemDescription>

The version of the broker engine. For ActiveMQ, e.g. '5.18'. For RabbitMQ, e.g. '3.13'.

</HclListItemDescription>
</HclListItem>

<HclListItem name="host_instance_type" requirement="required" type="string">
<HclListItemDescription>

The broker's instance type. e.g. 'mq.m5.large', 'mq.t3.micro'.

</HclListItemDescription>
</HclListItem>

<HclListItem name="subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

List of subnet IDs for the broker. Use 1 subnet for SINGLE_INSTANCE, 2+ for ACTIVE_STANDBY_MULTI_AZ or CLUSTER_MULTI_AZ.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the VPC in which to create the broker security group.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="additional_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

List of additional security group IDs to attach to the broker.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allowed_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

List of CIDR blocks allowed to connect to the broker.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allowed_security_groups" requirement="optional" type="list(string)">
<HclListItemDescription>

List of security group IDs allowed to connect to the broker.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="application_users" requirement="optional" type="list(object(…))">
<HclListItemDescription>

List of application users for the broker. Each user should have username, password, and optionally console_access and groups (ActiveMQ only).

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    username       = string
    password       = string
    console_access = optional(bool, false)
    groups         = optional(list(string), [])
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="apply_immediately" requirement="optional" type="bool">
<HclListItemDescription>

Whether to apply changes to the broker immediately or during the next maintenance window.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="audit_log_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable audit logging for the broker. Only supported for ActiveMQ engine type.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="auto_minor_version_upgrade" requirement="optional" type="bool">
<HclListItemDescription>

Whether to automatically upgrade to new minor versions of the broker engine as they are released.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="configuration_data" requirement="optional" type="string">
<HclListItemDescription>

The ActiveMQ XML configuration data. When set, an aws_mq_configuration resource is created and associated with the broker. Only applicable for ActiveMQ engine type.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

If you set this variable to false, this module will not create any resources. This is used as a workaround because Terraform does not allow you to use the 'count' parameter on modules.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Custom tags to apply to all resources created by this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="deployment_mode" requirement="optional" type="string">
<HclListItemDescription>

The deployment mode of the broker. Valid values are SINGLE_INSTANCE, ACTIVE_STANDBY_MULTI_AZ, and CLUSTER_MULTI_AZ.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;SINGLE_INSTANCE&quot;"/>
</HclListItem>

<HclListItem name="enable_encryption" requirement="optional" type="bool">
<HclListItemDescription>

Whether to explicitly configure the encryption_options block on the broker. Amazon MQ always encrypts data at rest. When true (default), you can specify a custom KMS key via kms_key_id. When false, the block is omitted and AWS uses its default AWS-owned key.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="general_log_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable general logging for the broker.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

The ARN of a custom KMS key to use for encryption at rest. If not set and enable_encryption is true, the AWS-owned key is used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="maintenance_day_of_week" requirement="optional" type="string">
<HclListItemDescription>

The day of the week for the maintenance window. e.g. 'MONDAY', 'TUESDAY', etc. Set all three maintenance variables to enable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="maintenance_time_of_day" requirement="optional" type="string">
<HclListItemDescription>

The time of day for the maintenance window in 24-hour format. e.g. '02:00'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="maintenance_time_zone" requirement="optional" type="string">
<HclListItemDescription>

The time zone for the maintenance window. e.g. 'UTC', 'America/New_York'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;UTC&quot;"/>
</HclListItem>

<HclListItem name="publicly_accessible" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable connections from applications outside of the VPC that hosts the broker's subnets.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="security_group_name" requirement="optional" type="string">
<HclListItemDescription>

The name for the security group. Defaults to '&lt;broker_name>-mq' if not set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="storage_type" requirement="optional" type="string">
<HclListItemDescription>

Storage type of the broker. Valid values are 'efs' and 'ebs'. Only configurable for ActiveMQ (defaults to 'efs'). RabbitMQ always uses EBS.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="use_aws_owned_key" requirement="optional" type="bool">
<HclListItemDescription>

Whether to use the AWS-owned KMS key for encryption at rest. Set to false to use a custom kms_key_id.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="broker_arn">
<HclListItemDescription>

The ARN of the Amazon MQ broker.

</HclListItemDescription>
</HclListItem>

<HclListItem name="broker_id">
<HclListItemDescription>

The unique ID of the Amazon MQ broker.

</HclListItemDescription>
</HclListItem>

<HclListItem name="broker_instances">
<HclListItemDescription>

List of broker instance details including console URL, endpoints, and IP address.

</HclListItemDescription>
</HclListItem>

<HclListItem name="configuration_arn">
<HclListItemDescription>

The ARN of the ActiveMQ configuration. Empty string if not created.

</HclListItemDescription>
</HclListItem>

<HclListItem name="configuration_id">
<HclListItemDescription>

The ID of the ActiveMQ configuration. Empty string if not created.

</HclListItemDescription>
</HclListItem>

<HclListItem name="primary_console_url">
<HclListItemDescription>

The URL of the broker's ActiveMQ Web Console or RabbitMQ Management UI for the primary instance.

</HclListItemDescription>
</HclListItem>

<HclListItem name="primary_endpoint">
<HclListItemDescription>

The broker's primary endpoint (e.g., OpenWire SSL for ActiveMQ, AMQP for RabbitMQ).

</HclListItemDescription>
</HclListItem>

<HclListItem name="primary_endpoints">
<HclListItemDescription>

The list of all broker endpoints for the primary instance (e.g., OpenWire, AMQP, MQTT, STOMP, WSS for ActiveMQ; AMQP for RabbitMQ).

</HclListItemDescription>
</HclListItem>

<HclListItem name="security_group_id">
<HclListItemDescription>

The ID of the security group created for the broker.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v1.0.3/modules/amazon-mq/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v1.0.3/modules/amazon-mq/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v1.0.3/modules/amazon-mq/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "604dd8db89ee676e8f6d286fc0f5300c"
}
##DOCS-SOURCER-END -->
