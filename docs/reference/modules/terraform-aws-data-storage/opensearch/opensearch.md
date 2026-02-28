---
title: "OpenSearch Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Data Storage Modules" version="0.47.0" lastModifiedVersion="0.47.0"/>

# OpenSearch Module

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.47.0/modules/opensearch" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.47.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module creates an [Amazon OpenSearch Service](https://aws.amazon.com/opensearch-service/) domain (the successor to Amazon Elasticsearch Service).

## Features

*   OpenSearch or legacy Elasticsearch engine versions
*   VPC or public endpoint deployment
*   Encryption at rest and node-to-node encryption
*   Fine-grained access control (FGAC) with internal user database, IAM, or SAML
*   Cognito authentication for OpenSearch Dashboards
*   Dedicated master nodes, UltraWarm storage, and cold storage
*   Multi-AZ with standby
*   Auto-Tune with maintenance schedules
*   gp3 EBS volumes with configurable IOPS and throughput
*   Off-peak maintenance windows and automatic software updates
*   CloudWatch log publishing
*   Custom domain endpoints

## Usage

```hcl
module "opensearch" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/opensearch?ref=v1.0.0"

  domain_name    = "my-domain"
  engine_version = "OpenSearch_2.11"

  instance_type  = "m6g.large.search"
  instance_count = 2
  volume_type    = "gp3"
  volume_size    = 100

  # VPC mode
  vpc_id     = "vpc-abc123"
  subnet_ids = ["subnet-abc123", "subnet-def456"]

  allow_connections_from_cidr_blocks = ["10.0.0.0/16"]

  # Fine-grained access control
  advanced_security_options_enabled = true
  internal_user_database_enabled    = true
  master_user_name                  = "admin"
  master_user_password              = "MySecurePassword1!"
}
```

## Required Inputs

| Name | Description |
|------|-------------|
| `domain_name` | Name of the OpenSearch domain (3-28 chars, lowercase) |
| `engine_version` | Engine version (e.g. `OpenSearch_2.11`) |
| `instance_type` | Instance type for data nodes |
| `instance_count` | Number of data nodes |
| `volume_type` | EBS volume type (gp3, gp2, io1, standard) |
| `volume_size` | EBS volume size in GB |

## Outputs

| Name | Description |
|------|-------------|
| `domain_arn` | ARN of the OpenSearch domain |
| `domain_id` | Unique identifier for the domain |
| `domain_name` | Name of the domain |
| `domain_endpoint` | Endpoint for submitting requests |
| `dashboards_endpoint` | Endpoint for OpenSearch Dashboards |
| `security_group_id` | Security group ID (null if not in VPC mode) |

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S OPENSEARCH MODULE
#
# NOTE: This module uses some sensitive variables marked inline with "# SENSITIVE".
# When using values other than defaults for these variables, set them through environment variables or
# another secure method.
#
# ------------------------------------------------------------------------------------------------------

module "opensearch" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/opensearch?ref=v0.47.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the OpenSearch domain. Must be between 3 and 28 characters,
  # start with a lowercase letter, and contain only lowercase letters, numbers,
  # and hyphens.
  domain_name = <string>

  # The engine version for the OpenSearch domain (e.g. 'OpenSearch_2.11' or
  # 'Elasticsearch_7.10').
  engine_version = <string>

  # The number of data nodes in the OpenSearch domain.
  instance_count = <number>

  # The instance type for the OpenSearch domain data nodes (e.g.
  # 'm6g.large.search').
  instance_type = <string>

  # The size of the EBS volume in GB for each data node.
  volume_size = <number>

  # The type of EBS volume to use (gp3, gp2, io1, or standard).
  volume_type = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # IAM policy document specifying the access policies for the domain. If null,
  # no access policy is applied.
  access_policies = null

  # Key-value pairs of advanced configuration options (e.g.
  # 'rest.action.multi.allow_explicit_index' = 'true').
  advanced_options = null

  # Whether to enable fine-grained access control (FGAC). Requires
  # enforce_https, node_to_node_encryption, and encrypt_at_rest to be true.
  advanced_security_options_enabled = false

  # A list of CIDR-formatted IP address ranges that can connect to this
  # OpenSearch domain over HTTPS (port 443).
  allow_connections_from_cidr_blocks = []

  # A list of IPv6 CIDR-formatted IP address ranges that can connect to this
  # OpenSearch domain over HTTPS (port 443).
  allow_connections_from_ipv6_cidr_blocks = []

  # A list of security group IDs that can connect to this OpenSearch domain.
  allow_connections_from_security_groups = []

  # Whether to enable anonymous authentication. Only relevant when
  # advanced_security_options_enabled is true.
  anonymous_auth_enabled = false

  # Whether automatic software updates are enabled for the domain.
  auto_software_update_enabled = false

  # The Auto-Tune desired state. Valid values are 'ENABLED' and 'DISABLED'.
  auto_tune_desired_state = "ENABLED"

  # Whether to enable Auto-Tune for the domain.
  auto_tune_enabled = false

  # A list of Auto-Tune maintenance schedules.
  auto_tune_maintenance_schedules = []

  # Whether to roll back Auto-Tune settings when disabling. Valid values are
  # 'NO_ROLLBACK' and 'DEFAULT_ROLLBACK'.
  auto_tune_rollback_on_disable = "NO_ROLLBACK"

  # The hour (0-23) during which the service takes an automated daily snapshot
  # of the indices. Set to null to omit.
  automated_snapshot_start_hour = null

  # The number of availability zones for zone-aware domains. Valid values are 2
  # or 3. Only used when zone_awareness_enabled is true.
  availability_zone_count = 2

  # Cognito authentication options for OpenSearch Dashboards. Set to null to
  # disable Cognito.
  cognito_options = null

  # Whether cold storage is enabled. Requires UltraWarm to be enabled.
  cold_storage_enabled = false

  # Whether to create the AWSServiceRoleForAmazonOpenSearchService
  # service-linked role. Only needed once per AWS account.
  create_service_linked_role = false

  # Timeout for creating the OpenSearch domain.
  creating_timeout = "60m"

  # The fully qualified domain name for a custom endpoint (e.g.
  # 'search.example.com'). If null, custom endpoints are disabled.
  custom_endpoint = null

  # The ACM certificate ARN for the custom endpoint. Required when
  # custom_endpoint is set.
  custom_endpoint_certificate_arn = null

  # A map of custom tags to apply to the OpenSearch domain and security group.
  # The key is the tag name and the value is the tag value.
  custom_tags = {}

  # The number of dedicated master nodes in the cluster.
  dedicated_master_count = null

  # Whether dedicated master nodes are enabled for the cluster.
  dedicated_master_enabled = false

  # The instance type for the dedicated master nodes (e.g. 'm6g.large.search').
  dedicated_master_type = null

  # Timeout for deleting the OpenSearch domain.
  deleting_timeout = "60m"

  # Whether EBS volumes are attached to data nodes.
  ebs_enabled = true

  # Whether to enable encryption at rest for the OpenSearch domain.
  encrypt_at_rest = true

  # Whether to require HTTPS for all traffic to the domain.
  enforce_https = true

  # Whether to enable the internal user database for fine-grained access
  # control.
  internal_user_database_enabled = false

  # The baseline I/O performance of EBS volumes attached to data nodes. Only
  # applicable for io1 and gp3 volume types.
  iops = null

  # The type of IP addresses supported by the endpoint. Valid values are 'ipv4'
  # and 'dualstack'.
  ip_address_type = null

  # The KMS key ID to use for encryption at rest. If not specified, the default
  # OpenSearch KMS key is used.
  kms_key_id = null

  # A list of log publishing options. Each entry specifies a log type and a
  # CloudWatch Log Group ARN.
  log_publishing_options = []

  # The ARN of the IAM user to use as the master user for FGAC. Conflicts with
  # master_user_name and master_user_password.
  master_user_arn = null

  # The master username for fine-grained access control. Requires
  # internal_user_database_enabled to be true.
  master_user_name = null

  # The master password for fine-grained access control. Requires
  # internal_user_database_enabled to be true. Must be at least 8 characters
  # with at least one uppercase letter, one lowercase letter, one digit, and one
  # special character.
  master_user_password = null # SENSITIVE

  # Whether a multi-AZ domain is turned on with a standby AZ. Requires zone
  # awareness and at least 3 AZs.
  multi_az_with_standby_enabled = false

  # Whether to enable node-to-node encryption.
  node_to_node_encryption = true

  # Whether the off-peak window is enabled. Set to null to omit the block
  # entirely.
  off_peak_window_enabled = null

  # The start time of the off-peak window.
  off_peak_window_start_time = null

  # SAML authentication options for OpenSearch Dashboards. Set to null to
  # disable SAML.
  saml_options = null

  # The description of the security group created for the OpenSearch domain.
  # Defaults to 'Security group for the <domain_name> OpenSearch domain' if not
  # specified.
  security_group_description = null

  # The name of the security group created for the OpenSearch domain. Defaults
  # to var.domain_name if not specified.
  security_group_name = null

  # A list of subnet IDs for the OpenSearch domain to use for VPC endpoints. If
  # empty, the domain is created with a public endpoint.
  subnet_ids = []

  # The throughput (in MiB/s) of the EBS volumes attached to data nodes. Only
  # applicable for gp3 volume types.
  throughput = null

  # The TLS security policy to apply to the HTTPS endpoint. Valid values are
  # 'Policy-Min-TLS-1-0-2019-07' and 'Policy-Min-TLS-1-2-2019-07'.
  tls_security_policy = "Policy-Min-TLS-1-2-2019-07"

  # Timeout for updating the OpenSearch domain.
  updating_timeout = "60m"

  # The ID of the VPC in which to create the security group. Required when
  # subnet_ids is provided.
  vpc_id = null

  # The number of UltraWarm nodes in the cluster.
  warm_count = null

  # Whether UltraWarm storage is enabled.
  warm_enabled = false

  # The instance type for UltraWarm nodes (e.g. 'ultrawarm1.medium.search').
  warm_type = null

  # Whether zone awareness is enabled. If true, nodes are distributed across
  # availability zones.
  zone_awareness_enabled = false

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S OPENSEARCH MODULE
#
# NOTE: This module uses some sensitive variables marked inline with "# SENSITIVE".
# When using values other than defaults for these variables, set them through environment variables or
# another secure method.
#
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/opensearch?ref=v0.47.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the OpenSearch domain. Must be between 3 and 28 characters,
  # start with a lowercase letter, and contain only lowercase letters, numbers,
  # and hyphens.
  domain_name = <string>

  # The engine version for the OpenSearch domain (e.g. 'OpenSearch_2.11' or
  # 'Elasticsearch_7.10').
  engine_version = <string>

  # The number of data nodes in the OpenSearch domain.
  instance_count = <number>

  # The instance type for the OpenSearch domain data nodes (e.g.
  # 'm6g.large.search').
  instance_type = <string>

  # The size of the EBS volume in GB for each data node.
  volume_size = <number>

  # The type of EBS volume to use (gp3, gp2, io1, or standard).
  volume_type = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # IAM policy document specifying the access policies for the domain. If null,
  # no access policy is applied.
  access_policies = null

  # Key-value pairs of advanced configuration options (e.g.
  # 'rest.action.multi.allow_explicit_index' = 'true').
  advanced_options = null

  # Whether to enable fine-grained access control (FGAC). Requires
  # enforce_https, node_to_node_encryption, and encrypt_at_rest to be true.
  advanced_security_options_enabled = false

  # A list of CIDR-formatted IP address ranges that can connect to this
  # OpenSearch domain over HTTPS (port 443).
  allow_connections_from_cidr_blocks = []

  # A list of IPv6 CIDR-formatted IP address ranges that can connect to this
  # OpenSearch domain over HTTPS (port 443).
  allow_connections_from_ipv6_cidr_blocks = []

  # A list of security group IDs that can connect to this OpenSearch domain.
  allow_connections_from_security_groups = []

  # Whether to enable anonymous authentication. Only relevant when
  # advanced_security_options_enabled is true.
  anonymous_auth_enabled = false

  # Whether automatic software updates are enabled for the domain.
  auto_software_update_enabled = false

  # The Auto-Tune desired state. Valid values are 'ENABLED' and 'DISABLED'.
  auto_tune_desired_state = "ENABLED"

  # Whether to enable Auto-Tune for the domain.
  auto_tune_enabled = false

  # A list of Auto-Tune maintenance schedules.
  auto_tune_maintenance_schedules = []

  # Whether to roll back Auto-Tune settings when disabling. Valid values are
  # 'NO_ROLLBACK' and 'DEFAULT_ROLLBACK'.
  auto_tune_rollback_on_disable = "NO_ROLLBACK"

  # The hour (0-23) during which the service takes an automated daily snapshot
  # of the indices. Set to null to omit.
  automated_snapshot_start_hour = null

  # The number of availability zones for zone-aware domains. Valid values are 2
  # or 3. Only used when zone_awareness_enabled is true.
  availability_zone_count = 2

  # Cognito authentication options for OpenSearch Dashboards. Set to null to
  # disable Cognito.
  cognito_options = null

  # Whether cold storage is enabled. Requires UltraWarm to be enabled.
  cold_storage_enabled = false

  # Whether to create the AWSServiceRoleForAmazonOpenSearchService
  # service-linked role. Only needed once per AWS account.
  create_service_linked_role = false

  # Timeout for creating the OpenSearch domain.
  creating_timeout = "60m"

  # The fully qualified domain name for a custom endpoint (e.g.
  # 'search.example.com'). If null, custom endpoints are disabled.
  custom_endpoint = null

  # The ACM certificate ARN for the custom endpoint. Required when
  # custom_endpoint is set.
  custom_endpoint_certificate_arn = null

  # A map of custom tags to apply to the OpenSearch domain and security group.
  # The key is the tag name and the value is the tag value.
  custom_tags = {}

  # The number of dedicated master nodes in the cluster.
  dedicated_master_count = null

  # Whether dedicated master nodes are enabled for the cluster.
  dedicated_master_enabled = false

  # The instance type for the dedicated master nodes (e.g. 'm6g.large.search').
  dedicated_master_type = null

  # Timeout for deleting the OpenSearch domain.
  deleting_timeout = "60m"

  # Whether EBS volumes are attached to data nodes.
  ebs_enabled = true

  # Whether to enable encryption at rest for the OpenSearch domain.
  encrypt_at_rest = true

  # Whether to require HTTPS for all traffic to the domain.
  enforce_https = true

  # Whether to enable the internal user database for fine-grained access
  # control.
  internal_user_database_enabled = false

  # The baseline I/O performance of EBS volumes attached to data nodes. Only
  # applicable for io1 and gp3 volume types.
  iops = null

  # The type of IP addresses supported by the endpoint. Valid values are 'ipv4'
  # and 'dualstack'.
  ip_address_type = null

  # The KMS key ID to use for encryption at rest. If not specified, the default
  # OpenSearch KMS key is used.
  kms_key_id = null

  # A list of log publishing options. Each entry specifies a log type and a
  # CloudWatch Log Group ARN.
  log_publishing_options = []

  # The ARN of the IAM user to use as the master user for FGAC. Conflicts with
  # master_user_name and master_user_password.
  master_user_arn = null

  # The master username for fine-grained access control. Requires
  # internal_user_database_enabled to be true.
  master_user_name = null

  # The master password for fine-grained access control. Requires
  # internal_user_database_enabled to be true. Must be at least 8 characters
  # with at least one uppercase letter, one lowercase letter, one digit, and one
  # special character.
  master_user_password = null # SENSITIVE

  # Whether a multi-AZ domain is turned on with a standby AZ. Requires zone
  # awareness and at least 3 AZs.
  multi_az_with_standby_enabled = false

  # Whether to enable node-to-node encryption.
  node_to_node_encryption = true

  # Whether the off-peak window is enabled. Set to null to omit the block
  # entirely.
  off_peak_window_enabled = null

  # The start time of the off-peak window.
  off_peak_window_start_time = null

  # SAML authentication options for OpenSearch Dashboards. Set to null to
  # disable SAML.
  saml_options = null

  # The description of the security group created for the OpenSearch domain.
  # Defaults to 'Security group for the <domain_name> OpenSearch domain' if not
  # specified.
  security_group_description = null

  # The name of the security group created for the OpenSearch domain. Defaults
  # to var.domain_name if not specified.
  security_group_name = null

  # A list of subnet IDs for the OpenSearch domain to use for VPC endpoints. If
  # empty, the domain is created with a public endpoint.
  subnet_ids = []

  # The throughput (in MiB/s) of the EBS volumes attached to data nodes. Only
  # applicable for gp3 volume types.
  throughput = null

  # The TLS security policy to apply to the HTTPS endpoint. Valid values are
  # 'Policy-Min-TLS-1-0-2019-07' and 'Policy-Min-TLS-1-2-2019-07'.
  tls_security_policy = "Policy-Min-TLS-1-2-2019-07"

  # Timeout for updating the OpenSearch domain.
  updating_timeout = "60m"

  # The ID of the VPC in which to create the security group. Required when
  # subnet_ids is provided.
  vpc_id = null

  # The number of UltraWarm nodes in the cluster.
  warm_count = null

  # Whether UltraWarm storage is enabled.
  warm_enabled = false

  # The instance type for UltraWarm nodes (e.g. 'ultrawarm1.medium.search').
  warm_type = null

  # Whether zone awareness is enabled. If true, nodes are distributed across
  # availability zones.
  zone_awareness_enabled = false

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="domain_name" requirement="required" type="string">
<HclListItemDescription>

The name of the OpenSearch domain. Must be between 3 and 28 characters, start with a lowercase letter, and contain only lowercase letters, numbers, and hyphens.

</HclListItemDescription>
</HclListItem>

<HclListItem name="engine_version" requirement="required" type="string">
<HclListItemDescription>

The engine version for the OpenSearch domain (e.g. 'OpenSearch_2.11' or 'Elasticsearch_7.10').

</HclListItemDescription>
</HclListItem>

<HclListItem name="instance_count" requirement="required" type="number">
<HclListItemDescription>

The number of data nodes in the OpenSearch domain.

</HclListItemDescription>
</HclListItem>

<HclListItem name="instance_type" requirement="required" type="string">
<HclListItemDescription>

The instance type for the OpenSearch domain data nodes (e.g. 'm6g.large.search').

</HclListItemDescription>
</HclListItem>

<HclListItem name="volume_size" requirement="required" type="number">
<HclListItemDescription>

The size of the EBS volume in GB for each data node.

</HclListItemDescription>
</HclListItem>

<HclListItem name="volume_type" requirement="required" type="string">
<HclListItemDescription>

The type of EBS volume to use (gp3, gp2, io1, or standard).

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="access_policies" requirement="optional" type="string">
<HclListItemDescription>

IAM policy document specifying the access policies for the domain. If null, no access policy is applied.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="advanced_options" requirement="optional" type="map(string)">
<HclListItemDescription>

Key-value pairs of advanced configuration options (e.g. 'rest.action.multi.allow_explicit_index' = 'true').

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="advanced_security_options_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable fine-grained access control (FGAC). Requires enforce_https, node_to_node_encryption, and encrypt_at_rest to be true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="allow_connections_from_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of CIDR-formatted IP address ranges that can connect to this OpenSearch domain over HTTPS (port 443).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_ipv6_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IPv6 CIDR-formatted IP address ranges that can connect to this OpenSearch domain over HTTPS (port 443).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_security_groups" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of security group IDs that can connect to this OpenSearch domain.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="anonymous_auth_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable anonymous authentication. Only relevant when advanced_security_options_enabled is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="auto_software_update_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether automatic software updates are enabled for the domain.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="auto_tune_desired_state" requirement="optional" type="string">
<HclListItemDescription>

The Auto-Tune desired state. Valid values are 'ENABLED' and 'DISABLED'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;ENABLED&quot;"/>
</HclListItem>

<HclListItem name="auto_tune_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable Auto-Tune for the domain.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="auto_tune_maintenance_schedules" requirement="optional" type="list(object(…))">
<HclListItemDescription>

A list of Auto-Tune maintenance schedules.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    start_at                       = string
    cron_expression_for_recurrence = string
    duration_value                 = number
    duration_unit                  = string
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="auto_tune_rollback_on_disable" requirement="optional" type="string">
<HclListItemDescription>

Whether to roll back Auto-Tune settings when disabling. Valid values are 'NO_ROLLBACK' and 'DEFAULT_ROLLBACK'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;NO_ROLLBACK&quot;"/>
</HclListItem>

<HclListItem name="automated_snapshot_start_hour" requirement="optional" type="number">
<HclListItemDescription>

The hour (0-23) during which the service takes an automated daily snapshot of the indices. Set to null to omit.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="availability_zone_count" requirement="optional" type="number">
<HclListItemDescription>

The number of availability zones for zone-aware domains. Valid values are 2 or 3. Only used when zone_awareness_enabled is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="2"/>
</HclListItem>

<HclListItem name="cognito_options" requirement="optional" type="object(…)">
<HclListItemDescription>

Cognito authentication options for OpenSearch Dashboards. Set to null to disable Cognito.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    user_pool_id     = string
    identity_pool_id = string
    role_arn         = string
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cold_storage_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether cold storage is enabled. Requires UltraWarm to be enabled.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="create_service_linked_role" requirement="optional" type="bool">
<HclListItemDescription>

Whether to create the AWSServiceRoleForAmazonOpenSearchService service-linked role. Only needed once per AWS account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="creating_timeout" requirement="optional" type="string">
<HclListItemDescription>

Timeout for creating the OpenSearch domain.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;60m&quot;"/>
</HclListItem>

<HclListItem name="custom_endpoint" requirement="optional" type="string">
<HclListItemDescription>

The fully qualified domain name for a custom endpoint (e.g. 'search.example.com'). If null, custom endpoints are disabled.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_endpoint_certificate_arn" requirement="optional" type="string">
<HclListItemDescription>

The ACM certificate ARN for the custom endpoint. Required when custom_endpoint is set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the OpenSearch domain and security group. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="dedicated_master_count" requirement="optional" type="number">
<HclListItemDescription>

The number of dedicated master nodes in the cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="dedicated_master_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether dedicated master nodes are enabled for the cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="dedicated_master_type" requirement="optional" type="string">
<HclListItemDescription>

The instance type for the dedicated master nodes (e.g. 'm6g.large.search').

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="deleting_timeout" requirement="optional" type="string">
<HclListItemDescription>

Timeout for deleting the OpenSearch domain.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;60m&quot;"/>
</HclListItem>

<HclListItem name="ebs_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether EBS volumes are attached to data nodes.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="encrypt_at_rest" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable encryption at rest for the OpenSearch domain.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enforce_https" requirement="optional" type="bool">
<HclListItemDescription>

Whether to require HTTPS for all traffic to the domain.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="internal_user_database_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable the internal user database for fine-grained access control.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="iops" requirement="optional" type="number">
<HclListItemDescription>

The baseline I/O performance of EBS volumes attached to data nodes. Only applicable for io1 and gp3 volume types.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="ip_address_type" requirement="optional" type="string">
<HclListItemDescription>

The type of IP addresses supported by the endpoint. Valid values are 'ipv4' and 'dualstack'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

The KMS key ID to use for encryption at rest. If not specified, the default OpenSearch KMS key is used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="log_publishing_options" requirement="optional" type="list(object(…))">
<HclListItemDescription>

A list of log publishing options. Each entry specifies a log type and a CloudWatch Log Group ARN.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    log_type                 = string
    cloudwatch_log_group_arn = string
    enabled                  = optional(bool, true)
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="master_user_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the IAM user to use as the master user for FGAC. Conflicts with master_user_name and master_user_password.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="master_user_name" requirement="optional" type="string">
<HclListItemDescription>

The master username for fine-grained access control. Requires internal_user_database_enabled to be true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="master_user_password" requirement="optional" type="string">
<HclListItemDescription>

The master password for fine-grained access control. Requires internal_user_database_enabled to be true. Must be at least 8 characters with at least one uppercase letter, one lowercase letter, one digit, and one special character.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="multi_az_with_standby_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether a multi-AZ domain is turned on with a standby AZ. Requires zone awareness and at least 3 AZs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="node_to_node_encryption" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable node-to-node encryption.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="off_peak_window_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether the off-peak window is enabled. Set to null to omit the block entirely.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="off_peak_window_start_time" requirement="optional" type="object(…)">
<HclListItemDescription>

The start time of the off-peak window.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    hours   = number
    minutes = number
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="saml_options" requirement="optional" type="object(…)">
<HclListItemDescription>

SAML authentication options for OpenSearch Dashboards. Set to null to disable SAML.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    idp_entity_id           = string
    idp_metadata_content    = string
    subject_key             = optional(string)
    roles_key               = optional(string)
    session_timeout_minutes = optional(number)
    master_backend_role     = optional(string)
    master_user_name        = optional(string)
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="security_group_description" requirement="optional" type="string">
<HclListItemDescription>

The description of the security group created for the OpenSearch domain. Defaults to 'Security group for the &lt;domain_name> OpenSearch domain' if not specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="security_group_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the security group created for the OpenSearch domain. Defaults to <a href="#domain_name"><code>domain_name</code></a> if not specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of subnet IDs for the OpenSearch domain to use for VPC endpoints. If empty, the domain is created with a public endpoint.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="throughput" requirement="optional" type="number">
<HclListItemDescription>

The throughput (in MiB/s) of the EBS volumes attached to data nodes. Only applicable for gp3 volume types.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="tls_security_policy" requirement="optional" type="string">
<HclListItemDescription>

The TLS security policy to apply to the HTTPS endpoint. Valid values are 'Policy-Min-TLS-1-0-2019-07' and 'Policy-Min-TLS-1-2-2019-07'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;Policy-Min-TLS-1-2-2019-07&quot;"/>
</HclListItem>

<HclListItem name="updating_timeout" requirement="optional" type="string">
<HclListItemDescription>

Timeout for updating the OpenSearch domain.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;60m&quot;"/>
</HclListItem>

<HclListItem name="vpc_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the VPC in which to create the security group. Required when subnet_ids is provided.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="warm_count" requirement="optional" type="number">
<HclListItemDescription>

The number of UltraWarm nodes in the cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="warm_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether UltraWarm storage is enabled.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="warm_type" requirement="optional" type="string">
<HclListItemDescription>

The instance type for UltraWarm nodes (e.g. 'ultrawarm1.medium.search').

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="zone_awareness_enabled" requirement="optional" type="bool">
<HclListItemDescription>

Whether zone awareness is enabled. If true, nodes are distributed across availability zones.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="dashboards_endpoint">
<HclListItemDescription>

The domain-specific endpoint for OpenSearch Dashboards (formerly Kibana).

</HclListItemDescription>
</HclListItem>

<HclListItem name="domain_arn">
<HclListItemDescription>

The ARN of the OpenSearch domain.

</HclListItemDescription>
</HclListItem>

<HclListItem name="domain_endpoint">
<HclListItemDescription>

The domain-specific endpoint used to submit index, search, and data upload requests.

</HclListItemDescription>
</HclListItem>

<HclListItem name="domain_id">
<HclListItemDescription>

The unique identifier for the OpenSearch domain.

</HclListItemDescription>
</HclListItem>

<HclListItem name="domain_name">
<HclListItemDescription>

The name of the OpenSearch domain.

</HclListItemDescription>
</HclListItem>

<HclListItem name="security_group_id">
<HclListItemDescription>

The ID of the security group created for the OpenSearch domain. Null if not in VPC mode.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.47.0/modules/opensearch/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.47.0/modules/opensearch/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.47.0/modules/opensearch/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "4b4f32fc5e3aa2835a68b0434bcd4710"
}
##DOCS-SOURCER-END -->
