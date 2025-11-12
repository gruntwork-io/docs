---
title: "ElasticCache Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Cache Modules" version="1.0.3" lastModifiedVersion="1.0.3"/>

# ElasticCache Module

<a href="https://github.com/gruntwork-io/terraform-aws-cache/tree/v1.0.3/modules/elastic-cache" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v1.0.3" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module creates an ElastiCache cluster, which manages either a Memcached cluster, a single-node Redis instance.

## How do you connect to the ElasticCache cluster?

This module outputs a [Terraform output variable](https://www.terraform.io/intro/getting-started/outputs.html) that
contains a comma-separated list of addresses of the ElasticCache nodes. You can programmatically extract this variable in
your Terraform templates and pass it to other resources (e.g. as an environment variable in an EC2 instance). You'll
also see the variable at the end of each `terraform apply` call or if you run `terraform output`.

## How do you scale this ElasticCache cluster?

*   To scale vertically, increase the size of the nodes using the `instance_type` parameter (see
    [here](https://aws.amazon.com/elasticache/details/#Available_Cache_Node_Types) for valid values).
*   To scale horizontally, increase the number of nodes using the `num_cache_nodes` parameter.

For more info, see [Scaling Memcached](http://docs.aws.amazon.com/AmazonElastiCache/latest/UserGuide/Scaling.Memcached.html).

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ELASTIC-CACHE MODULE
# ------------------------------------------------------------------------------------------------------

module "elastic_cache" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-cache.git//modules/elastic-cache?ref=v1.0.3"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of CIDR-formatted IP address ranges that can connect to this
  # ElastiCache cluster. For the standard Gruntwork VPC setup, these should be
  # the CIDR blocks of the private app subnet in this VPC plus the private
  # subnet in the mgmt VPC.
  allow_connections_from_cidr_blocks = <list(string)>

  # Name of the cache engine to be used for this cache cluster. Valid values are
  # memcached, redis, or valkey.
  engine = <string>

  # Version number of ElasticCache cluster to use.
  engine_version = <string>

  # The compute and memory capacity of the nodes (e.g. cache.m3.medium).
  instance_type = <string>

  # The name used to namespace all resources created by these templates,
  # including the ElastiCache cluster itself (e.g. mycache). Must be unique in
  # this region. Must be a lowercase string.
  name = <string>

  # The initial number of cache nodes that the cache cluster will have. Must be
  # between 1 and 20.
  num_cache_nodes = <number>

  # A list of subnet ids where the ElastiCache instances should be deployed. For
  # the standard Gruntwork VPC setup, these should be the private peristence
  # subnet ids.
  subnet_ids = <list(string)>

  # The id of the VPC in which the ElastiCache cluster should be deployed.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Specifies a list of Security Groups to allow connections from.
  allow_connections_from_security_groups = []

  # Specifies whether any database modifications are applied immediately, or
  # during the next maintenance window.
  apply_immediately = false

  # Specifies whether minor version engine upgrades will be applied
  # automatically to the underlying Cache Cluster instances during the
  # maintenance window. Only supported for engine type 'redis' and if the engine
  # version is 6 or higher
  auto_minor_version_upgrade = true

  # Specifies whether the nodes in this Memcached node group are created in a
  # single Availability Zone or created across multiple Availability Zones in
  # the cluster's region. Valid values for this parameter are single-az or
  # cross-az. If you want to choose cross-az, num_cache_nodes must be greater
  # than 1.
  az_mode = "single-az"

  # Enable encryption in-transit. Supported only with Memcached versions 1.6.12
  # and later, running in a VPC. Also only settable on cluster creation.
  enable_transport_encryption = false

  # Specifies the destination and format of Redis Engine Log. See the
  # documentation on Amazon ElastiCache. See Log Delivery Configuration below
  # for more details. You can find more information here
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elasticache_replication_group#log-delivery-configuration.
  engine_log_delivery_configuration = null

  # Specifies the weekly time range for when maintenance on the cache cluster is
  # performed (e.g. sun:05:00-sun:09:00). The format is ddd:hh24:mi-ddd:hh24:mi
  # (24H Clock UTC). The minimum maintenance window is a 60 minute period.
  maintenance_window = "sat:07:00-sat:08:00"

  # Name of the parameter group to associate with this cache cluster. This can
  # be used to configure custom settings for the cluster.
  parameter_group_name = null

  # The port number on which each of the cache nodes will accept connections
  # (e.g. 6379).
  port = 11211

  # A set of tags to set for the Security Group created as part of this module.
  security_group_tags = {}

  # Specifies the destination and format of Redis SLOWLOG. See the documentation
  # on Amazon ElastiCache. See Log Delivery Configuration below for more
  # details. You can find more information here
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elasticache_replication_group#log-delivery-configuration.
  slow_log_delivery_configuration = null

  # The ARN of the SNS Topic to which notifications will be sent when a
  # ElastiCache event happens, such as an automatic failover (e.g.
  # arn:aws:sns:*:123456789012:my_sns_topic). An empty string is a valid value
  # if you do not wish to receive notifications via SNS. This is required if
  # enable_single_instance_mode is set to false
  sns_topic_for_notifications = null

  # A set of tags to set for the ElastiCache Cluster.
  tags = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ELASTIC-CACHE MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-cache.git//modules/elastic-cache?ref=v1.0.3"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of CIDR-formatted IP address ranges that can connect to this
  # ElastiCache cluster. For the standard Gruntwork VPC setup, these should be
  # the CIDR blocks of the private app subnet in this VPC plus the private
  # subnet in the mgmt VPC.
  allow_connections_from_cidr_blocks = <list(string)>

  # Name of the cache engine to be used for this cache cluster. Valid values are
  # memcached, redis, or valkey.
  engine = <string>

  # Version number of ElasticCache cluster to use.
  engine_version = <string>

  # The compute and memory capacity of the nodes (e.g. cache.m3.medium).
  instance_type = <string>

  # The name used to namespace all resources created by these templates,
  # including the ElastiCache cluster itself (e.g. mycache). Must be unique in
  # this region. Must be a lowercase string.
  name = <string>

  # The initial number of cache nodes that the cache cluster will have. Must be
  # between 1 and 20.
  num_cache_nodes = <number>

  # A list of subnet ids where the ElastiCache instances should be deployed. For
  # the standard Gruntwork VPC setup, these should be the private peristence
  # subnet ids.
  subnet_ids = <list(string)>

  # The id of the VPC in which the ElastiCache cluster should be deployed.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Specifies a list of Security Groups to allow connections from.
  allow_connections_from_security_groups = []

  # Specifies whether any database modifications are applied immediately, or
  # during the next maintenance window.
  apply_immediately = false

  # Specifies whether minor version engine upgrades will be applied
  # automatically to the underlying Cache Cluster instances during the
  # maintenance window. Only supported for engine type 'redis' and if the engine
  # version is 6 or higher
  auto_minor_version_upgrade = true

  # Specifies whether the nodes in this Memcached node group are created in a
  # single Availability Zone or created across multiple Availability Zones in
  # the cluster's region. Valid values for this parameter are single-az or
  # cross-az. If you want to choose cross-az, num_cache_nodes must be greater
  # than 1.
  az_mode = "single-az"

  # Enable encryption in-transit. Supported only with Memcached versions 1.6.12
  # and later, running in a VPC. Also only settable on cluster creation.
  enable_transport_encryption = false

  # Specifies the destination and format of Redis Engine Log. See the
  # documentation on Amazon ElastiCache. See Log Delivery Configuration below
  # for more details. You can find more information here
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elasticache_replication_group#log-delivery-configuration.
  engine_log_delivery_configuration = null

  # Specifies the weekly time range for when maintenance on the cache cluster is
  # performed (e.g. sun:05:00-sun:09:00). The format is ddd:hh24:mi-ddd:hh24:mi
  # (24H Clock UTC). The minimum maintenance window is a 60 minute period.
  maintenance_window = "sat:07:00-sat:08:00"

  # Name of the parameter group to associate with this cache cluster. This can
  # be used to configure custom settings for the cluster.
  parameter_group_name = null

  # The port number on which each of the cache nodes will accept connections
  # (e.g. 6379).
  port = 11211

  # A set of tags to set for the Security Group created as part of this module.
  security_group_tags = {}

  # Specifies the destination and format of Redis SLOWLOG. See the documentation
  # on Amazon ElastiCache. See Log Delivery Configuration below for more
  # details. You can find more information here
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elasticache_replication_group#log-delivery-configuration.
  slow_log_delivery_configuration = null

  # The ARN of the SNS Topic to which notifications will be sent when a
  # ElastiCache event happens, such as an automatic failover (e.g.
  # arn:aws:sns:*:123456789012:my_sns_topic). An empty string is a valid value
  # if you do not wish to receive notifications via SNS. This is required if
  # enable_single_instance_mode is set to false
  sns_topic_for_notifications = null

  # A set of tags to set for the ElastiCache Cluster.
  tags = {}

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="allow_connections_from_cidr_blocks" requirement="required" type="list(string)">
<HclListItemDescription>

A list of CIDR-formatted IP address ranges that can connect to this ElastiCache cluster. For the standard Gruntwork VPC setup, these should be the CIDR blocks of the private app subnet in this VPC plus the private subnet in the mgmt VPC.

</HclListItemDescription>
</HclListItem>

<HclListItem name="engine" requirement="required" type="string">
<HclListItemDescription>

Name of the cache engine to be used for this cache cluster. Valid values are memcached, redis, or valkey.

</HclListItemDescription>
</HclListItem>

<HclListItem name="engine_version" requirement="required" type="string">
<HclListItemDescription>

Version number of ElasticCache cluster to use.

</HclListItemDescription>
</HclListItem>

<HclListItem name="instance_type" requirement="required" type="string">
<HclListItemDescription>

The compute and memory capacity of the nodes (e.g. cache.m3.medium).

</HclListItemDescription>
</HclListItem>

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name used to namespace all resources created by these templates, including the ElastiCache cluster itself (e.g. mycache). Must be unique in this region. Must be a lowercase string.

</HclListItemDescription>
</HclListItem>

<HclListItem name="num_cache_nodes" requirement="required" type="number">
<HclListItemDescription>

The initial number of cache nodes that the cache cluster will have. Must be between 1 and 20.

</HclListItemDescription>
</HclListItem>

<HclListItem name="subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

A list of subnet ids where the ElastiCache instances should be deployed. For the standard Gruntwork VPC setup, these should be the private peristence subnet ids.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The id of the VPC in which the ElastiCache cluster should be deployed.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="allow_connections_from_security_groups" requirement="optional" type="list(string)">
<HclListItemDescription>

Specifies a list of Security Groups to allow connections from.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="apply_immediately" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether any database modifications are applied immediately, or during the next maintenance window.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="auto_minor_version_upgrade" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether minor version engine upgrades will be applied automatically to the underlying Cache Cluster instances during the maintenance window. Only supported for engine type 'redis' and if the engine version is 6 or higher

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="az_mode" requirement="optional" type="string">
<HclListItemDescription>

Specifies whether the nodes in this Memcached node group are created in a single Availability Zone or created across multiple Availability Zones in the cluster's region. Valid values for this parameter are single-az or cross-az. If you want to choose cross-az, num_cache_nodes must be greater than 1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;single-az&quot;"/>
</HclListItem>

<HclListItem name="enable_transport_encryption" requirement="optional" type="bool">
<HclListItemDescription>

Enable encryption in-transit. Supported only with Memcached versions 1.6.12 and later, running in a VPC. Also only settable on cluster creation.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="engine_log_delivery_configuration" requirement="optional" type="object(…)">
<HclListItemDescription>

Specifies the destination and format of Redis Engine Log. See the documentation on Amazon ElastiCache. See Log Delivery Configuration below for more details. You can find more information here https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elasticache_replication_group#log-delivery-configuration.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    destination      = string
    destination_type = string
    log_format       = string
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="maintenance_window" requirement="optional" type="string">
<HclListItemDescription>

Specifies the weekly time range for when maintenance on the cache cluster is performed (e.g. sun:05:00-sun:09:00). The format is ddd:hh24:mi-ddd:hh24:mi (24H Clock UTC). The minimum maintenance window is a 60 minute period.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;sat:07:00-sat:08:00&quot;"/>
</HclListItem>

<HclListItem name="parameter_group_name" requirement="optional" type="string">
<HclListItemDescription>

Name of the parameter group to associate with this cache cluster. This can be used to configure custom settings for the cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="port" requirement="optional" type="number">
<HclListItemDescription>

The port number on which each of the cache nodes will accept connections (e.g. 6379).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="11211"/>
</HclListItem>

<HclListItem name="security_group_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A set of tags to set for the Security Group created as part of this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="slow_log_delivery_configuration" requirement="optional" type="object(…)">
<HclListItemDescription>

Specifies the destination and format of Redis SLOWLOG. See the documentation on Amazon ElastiCache. See Log Delivery Configuration below for more details. You can find more information here https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elasticache_replication_group#log-delivery-configuration.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    destination      = string
    destination_type = string
    log_format       = string
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="sns_topic_for_notifications" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the SNS Topic to which notifications will be sent when a ElastiCache event happens, such as an automatic failover (e.g. arn:aws:sns:*:123456789012:my_sns_topic). An empty string is a valid value if you do not wish to receive notifications via SNS. This is required if enable_single_instance_mode is set to false

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A set of tags to set for the ElastiCache Cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="cache_addresses">
</HclListItem>

<HclListItem name="cache_cluster_id">
</HclListItem>

<HclListItem name="cache_node_ids">
</HclListItem>

<HclListItem name="cache_port">
</HclListItem>

<HclListItem name="configuration_endpoint">
</HclListItem>

<HclListItem name="parameter_group">
</HclListItem>

<HclListItem name="security_group_id">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-cache/tree/v1.0.3/modules/elastic-cache/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-cache/tree/v1.0.3/modules/elastic-cache/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-cache/tree/v1.0.3/modules/elastic-cache/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "59b3d6ca7dc63bd9a22672bfaef876ed"
}
##DOCS-SOURCER-END -->
