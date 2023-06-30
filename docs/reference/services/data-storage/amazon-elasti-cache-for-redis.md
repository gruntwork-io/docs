---
type: "service"
name: "Amazon ElastiCache for Redis"
description: "Deploy and manage Amazon ElastiCache for Redis."
category: "nosql"
cloud: "aws"
tags: ["data","database","nosql","redis","elasticache"]
license: "gruntwork"
built-with: "terraform"
title: "Amazon ElastiCache for Redis"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.104.14" lastModifiedVersion="0.104.5"/>

# Amazon ElastiCache for Redis

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/data-stores/redis" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=data-stores%2Fredis" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>

## Overview

This service contains code to deploy a Redis Cluster using Amazon ElastiCache. The cluster is managed by AWS and
automatically handles standby failover, read replicas, backups, patching, and encryption.

![ElastiCache for Redis architecture](/img/reference/services/data-storage/elasticache-redis-architecture.png)

## Features

*   Deploy a fully-managed Redis cluster
*   Automatic failover to a standby in another availability zone
*   Read replicas
*   Automatic nightly snapshots
*   Automatic cross account snapshots
*   Automatic scaling of storage
*   CloudWatch Alarms for alerting when CPU, memory, and disk metrics exceed certain thresholds
*   Integrate with Kubernetes Service Discovery

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

*   [What is Amazon ElastiCache?](https://github.com/gruntwork-io/terraform-aws-cache/tree/master/modules/redis#what-is-amazon-elasticache)
*   [Common gotchas with ElastiCache](https://github.com/gruntwork-io/terraform-aws-cache/tree/master/modules/redis#common-gotchas)
*   [Amazon ElastiCache for Redis documentation](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/WhatIs.html):
    Amazon’s ElastiCache for Redis docs that cover core concepts such as the options and versions supported, security,
    backup & restore, and monitoring.
*   *[Designing Data Intensive Applications](https://dataintensive.net)*: the best book we’ve found for understanding data
    systems, including relational databases, NoSQL, replication, sharding, consistency, and so on.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.


## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S REDIS MODULE
# ------------------------------------------------------------------------------------------------------

module "redis" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/redis?ref=v0.104.14"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Indicates whether Multi-AZ is enabled. When Multi-AZ is enabled, a read-only
  # replica is automatically promoted to a read-write primary cluster if the
  # existing primary cluster fails. If you specify true, you must specify a
  # value greater than 1 for replication_group_size.
  enable_automatic_failover = <bool>

  # Indicates whether Multi-AZ is enabled. When Multi-AZ is enabled, a read-only
  # replica is automatically promoted to a read-write primary cluster if the
  # existing primary cluster fails. If you specify true, you must specify a
  # value greater than 1 for replication_group_size.
  enable_multi_az = <bool>

  # The compute and memory capacity of the nodes (e.g. cache.m4.large).
  instance_type = <string>

  # The name used to namespace all resources created by these templates,
  # including the ElastiCache cluster itself (e.g. rediscache). Must be unique
  # in this region. Must be a lowercase string.
  name = <string>

  # The total number of nodes in the Redis Replication Group. E.g. 1 represents
  # just the primary node, 2 represents the primary plus a single Read Replica.
  replication_group_size = <number>

  # The list of IDs of the subnets in which to deploy the ElasticCache
  # instances. The list must only contain subnets in var.vpc_id.
  subnet_ids = <list(string)>

  # The ID of the VPC in which to deploy RDS.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Trigger an alarm if the amount of free memory, in Bytes, on the node drops
  # below this threshold
  alarm_low_memory_available_threshold = 100000000

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  alarm_treat_missing_data = "missing"

  # The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and
  # disk space usage) should send notifications.
  alarms_sns_topic_arns = []

  # The list of network CIDR blocks to allow network access to ElastiCache from.
  # One of var.allow_connections_from_cidr_blocks or
  # var.allow_connections_from_security_groups must be specified for the
  # ElastiCache instances to be reachable.
  allow_connections_from_cidr_blocks = []

  # The list of IDs or Security Groups to allow network access to ElastiCache
  # from. All security groups must either be in the VPC specified by var.vpc_id,
  # or a peered VPC with the VPC specified by var.vpc_id. One of
  # var.allow_connections_from_cidr_blocks or
  # var.allow_connections_from_security_groups must be specified for the
  # ElastiCache instances to be reachable.
  allow_connections_from_security_groups = []

  # Specifies whether any modifications are applied immediately, or during the
  # next maintenance window.
  apply_immediately = false

  # The password used to access a password protected server. Can be specified
  # only if transit_encryption_enabled = true. Must contain from 16 to 128
  # alphanumeric characters or symbols (excluding @, <double-quotes>, and /)
  auth_token = null

  # Specifies the number of shards and replicas per shard in the cluster. The
  # list should contain a single map with keys 'num_node_groups' and
  # 'replicas_per_node_group' set to desired integer values.
  cluster_mode = []

  # Whether to enable encryption at rest.
  enable_at_rest_encryption = true

  # Set to true to enable several basic CloudWatch alarms around CPU usage,
  # memory usage, and disk space usage. If set to true, make sure to specify SNS
  # topics to send notifications to using var.alarms_sns_topic_arn.
  enable_cloudwatch_alarms = true

  # Whether to enable encryption in transit.
  enable_transit_encryption = true

  # Specifies the weekly time range for when maintenance on the cache cluster is
  # performed (e.g. sun:05:00-sun:09:00). The format is ddd:hh24:mi-ddd:hh24:mi
  # (24H Clock UTC). The minimum maintenance window is a 60 minute period.
  maintenance_window = "sat:07:00-sat:08:00"

  # Name of the parameter group to associate with this cache cluster. This can
  # be used to configure custom settings for the cluster.
  parameter_group_name = null

  # The port number on which each of the cache nodes will accept connections
  # (e.g. 6379).
  port = 6379

  # Version number of redis to use (e.g. 5.0.6).
  redis_version = "5.0.6"

  # The Amazon Resource Name (ARN) of a Redis RDB snapshot file stored in Amazon
  # S3. You can use this parameter to restore from an externally created
  # snapshot. If you have an ElastiCache snapshot, use snapshot_name.
  snapshot_arn = null

  # The name of a snapshot from which to restore the Redis cluster. You can use
  # this to restore from an ElastiCache snapshot. If you have an externally
  # created snapshot, use snapshot_arn.
  snapshot_name = null

  # The number of days for which ElastiCache will retain automatic cache cluster
  # snapshots before deleting them. Set to 0 to disable snapshots.
  snapshot_retention_limit = 15

  # The daily time range during which automated backups are created (e.g.
  # 04:00-09:00). Time zone is UTC. Performance may be degraded while a backup
  # runs. Set to empty string to disable snapshots.
  snapshot_window = "06:00-07:00"

  # The ARN of the SNS Topic to which notifications will be sent when a
  # Replication Group event happens, such as an automatic failover (e.g.
  # arn:aws:sns:*:123456789012:my_sns_topic). An empty string is a valid value
  # if you do not wish to receive notifications via SNS.
  sns_topic_for_notifications = ""

  # A set of tags to set for the ElastiCache Replication Group.
  tags = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S REDIS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/redis?ref=v0.104.14"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Indicates whether Multi-AZ is enabled. When Multi-AZ is enabled, a read-only
  # replica is automatically promoted to a read-write primary cluster if the
  # existing primary cluster fails. If you specify true, you must specify a
  # value greater than 1 for replication_group_size.
  enable_automatic_failover = <bool>

  # Indicates whether Multi-AZ is enabled. When Multi-AZ is enabled, a read-only
  # replica is automatically promoted to a read-write primary cluster if the
  # existing primary cluster fails. If you specify true, you must specify a
  # value greater than 1 for replication_group_size.
  enable_multi_az = <bool>

  # The compute and memory capacity of the nodes (e.g. cache.m4.large).
  instance_type = <string>

  # The name used to namespace all resources created by these templates,
  # including the ElastiCache cluster itself (e.g. rediscache). Must be unique
  # in this region. Must be a lowercase string.
  name = <string>

  # The total number of nodes in the Redis Replication Group. E.g. 1 represents
  # just the primary node, 2 represents the primary plus a single Read Replica.
  replication_group_size = <number>

  # The list of IDs of the subnets in which to deploy the ElasticCache
  # instances. The list must only contain subnets in var.vpc_id.
  subnet_ids = <list(string)>

  # The ID of the VPC in which to deploy RDS.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Trigger an alarm if the amount of free memory, in Bytes, on the node drops
  # below this threshold
  alarm_low_memory_available_threshold = 100000000

  # Sets how this alarm should handle entering the INSUFFICIENT_DATA state.
  # Based on
  # https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data.
  # Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.
  alarm_treat_missing_data = "missing"

  # The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and
  # disk space usage) should send notifications.
  alarms_sns_topic_arns = []

  # The list of network CIDR blocks to allow network access to ElastiCache from.
  # One of var.allow_connections_from_cidr_blocks or
  # var.allow_connections_from_security_groups must be specified for the
  # ElastiCache instances to be reachable.
  allow_connections_from_cidr_blocks = []

  # The list of IDs or Security Groups to allow network access to ElastiCache
  # from. All security groups must either be in the VPC specified by var.vpc_id,
  # or a peered VPC with the VPC specified by var.vpc_id. One of
  # var.allow_connections_from_cidr_blocks or
  # var.allow_connections_from_security_groups must be specified for the
  # ElastiCache instances to be reachable.
  allow_connections_from_security_groups = []

  # Specifies whether any modifications are applied immediately, or during the
  # next maintenance window.
  apply_immediately = false

  # The password used to access a password protected server. Can be specified
  # only if transit_encryption_enabled = true. Must contain from 16 to 128
  # alphanumeric characters or symbols (excluding @, <double-quotes>, and /)
  auth_token = null

  # Specifies the number of shards and replicas per shard in the cluster. The
  # list should contain a single map with keys 'num_node_groups' and
  # 'replicas_per_node_group' set to desired integer values.
  cluster_mode = []

  # Whether to enable encryption at rest.
  enable_at_rest_encryption = true

  # Set to true to enable several basic CloudWatch alarms around CPU usage,
  # memory usage, and disk space usage. If set to true, make sure to specify SNS
  # topics to send notifications to using var.alarms_sns_topic_arn.
  enable_cloudwatch_alarms = true

  # Whether to enable encryption in transit.
  enable_transit_encryption = true

  # Specifies the weekly time range for when maintenance on the cache cluster is
  # performed (e.g. sun:05:00-sun:09:00). The format is ddd:hh24:mi-ddd:hh24:mi
  # (24H Clock UTC). The minimum maintenance window is a 60 minute period.
  maintenance_window = "sat:07:00-sat:08:00"

  # Name of the parameter group to associate with this cache cluster. This can
  # be used to configure custom settings for the cluster.
  parameter_group_name = null

  # The port number on which each of the cache nodes will accept connections
  # (e.g. 6379).
  port = 6379

  # Version number of redis to use (e.g. 5.0.6).
  redis_version = "5.0.6"

  # The Amazon Resource Name (ARN) of a Redis RDB snapshot file stored in Amazon
  # S3. You can use this parameter to restore from an externally created
  # snapshot. If you have an ElastiCache snapshot, use snapshot_name.
  snapshot_arn = null

  # The name of a snapshot from which to restore the Redis cluster. You can use
  # this to restore from an ElastiCache snapshot. If you have an externally
  # created snapshot, use snapshot_arn.
  snapshot_name = null

  # The number of days for which ElastiCache will retain automatic cache cluster
  # snapshots before deleting them. Set to 0 to disable snapshots.
  snapshot_retention_limit = 15

  # The daily time range during which automated backups are created (e.g.
  # 04:00-09:00). Time zone is UTC. Performance may be degraded while a backup
  # runs. Set to empty string to disable snapshots.
  snapshot_window = "06:00-07:00"

  # The ARN of the SNS Topic to which notifications will be sent when a
  # Replication Group event happens, such as an automatic failover (e.g.
  # arn:aws:sns:*:123456789012:my_sns_topic). An empty string is a valid value
  # if you do not wish to receive notifications via SNS.
  sns_topic_for_notifications = ""

  # A set of tags to set for the ElastiCache Replication Group.
  tags = {}

}


```

</TabItem>
</Tabs>



## Reference


<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="enable_automatic_failover" requirement="required" type="bool">
<HclListItemDescription>

Indicates whether Multi-AZ is enabled. When Multi-AZ is enabled, a read-only replica is automatically promoted to a read-write primary cluster if the existing primary cluster fails. If you specify true, you must specify a value greater than 1 for replication_group_size.

</HclListItemDescription>
</HclListItem>

<HclListItem name="enable_multi_az" requirement="required" type="bool">
<HclListItemDescription>

Indicates whether Multi-AZ is enabled. When Multi-AZ is enabled, a read-only replica is automatically promoted to a read-write primary cluster if the existing primary cluster fails. If you specify true, you must specify a value greater than 1 for replication_group_size.

</HclListItemDescription>
</HclListItem>

<HclListItem name="instance_type" requirement="required" type="string">
<HclListItemDescription>

The compute and memory capacity of the nodes (e.g. cache.m4.large).

</HclListItemDescription>
</HclListItem>

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name used to namespace all resources created by these templates, including the ElastiCache cluster itself (e.g. rediscache). Must be unique in this region. Must be a lowercase string.

</HclListItemDescription>
</HclListItem>

<HclListItem name="replication_group_size" requirement="required" type="number">
<HclListItemDescription>

The total number of nodes in the Redis Replication Group. E.g. 1 represents just the primary node, 2 represents the primary plus a single Read Replica.

</HclListItemDescription>
</HclListItem>

<HclListItem name="subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

The list of IDs of the subnets in which to deploy the ElasticCache instances. The list must only contain subnets in <a href="#vpc_id"><code>vpc_id</code></a>.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the VPC in which to deploy RDS.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="alarm_low_memory_available_threshold" requirement="optional" type="number">
<HclListItemDescription>

Trigger an alarm if the amount of free memory, in Bytes, on the node drops below this threshold

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="100000000"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Default is 100MB (100 million bytes)

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="alarm_treat_missing_data" requirement="optional" type="string">
<HclListItemDescription>

Sets how this alarm should handle entering the INSUFFICIENT_DATA state. Based on https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarms-and-missing-data. Must be one of: 'missing', 'ignore', 'breaching' or 'notBreaching'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;missing&quot;"/>
</HclListItem>

<HclListItem name="alarms_sns_topic_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

The list of network CIDR blocks to allow network access to ElastiCache from. One of <a href="#allow_connections_from_cidr_blocks"><code>allow_connections_from_cidr_blocks</code></a> or <a href="#allow_connections_from_security_groups"><code>allow_connections_from_security_groups</code></a> must be specified for the ElastiCache instances to be reachable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_security_groups" requirement="optional" type="list(string)">
<HclListItemDescription>

The list of IDs or Security Groups to allow network access to ElastiCache from. All security groups must either be in the VPC specified by <a href="#vpc_id"><code>vpc_id</code></a>, or a peered VPC with the VPC specified by <a href="#vpc_id"><code>vpc_id</code></a>. One of <a href="#allow_connections_from_cidr_blocks"><code>allow_connections_from_cidr_blocks</code></a> or <a href="#allow_connections_from_security_groups"><code>allow_connections_from_security_groups</code></a> must be specified for the ElastiCache instances to be reachable.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="apply_immediately" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether any modifications are applied immediately, or during the next maintenance window.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="auth_token" requirement="optional" type="string">
<HclListItemDescription>

The password used to access a password protected server. Can be specified only if transit_encryption_enabled = true. Must contain from 16 to 128 alphanumeric characters or symbols (excluding @, &lt;double-quotes>, and /)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_mode" requirement="optional" type="list(object(…))">
<HclListItemDescription>

Specifies the number of shards and replicas per shard in the cluster. The list should contain a single map with keys 'num_node_groups' and 'replicas_per_node_group' set to desired integer values.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    num_node_groups         = number
    replicas_per_node_group = number
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="enable_at_rest_encryption" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable encryption at rest.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_alarms" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using <a href="#alarms_sns_topic_arn"><code>alarms_sns_topic_arn</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_transit_encryption" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable encryption in transit.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
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
<HclListItemDefaultValue defaultValue="6379"/>
</HclListItem>

<HclListItem name="redis_version" requirement="optional" type="string">
<HclListItemDescription>

Version number of redis to use (e.g. 5.0.6).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;5.0.6&quot;"/>
</HclListItem>

<HclListItem name="snapshot_arn" requirement="optional" type="string">
<HclListItemDescription>

The Amazon Resource Name (ARN) of a Redis RDB snapshot file stored in Amazon S3. You can use this parameter to restore from an externally created snapshot. If you have an ElastiCache snapshot, use snapshot_name.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="snapshot_name" requirement="optional" type="string">
<HclListItemDescription>

The name of a snapshot from which to restore the Redis cluster. You can use this to restore from an ElastiCache snapshot. If you have an externally created snapshot, use snapshot_arn.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="snapshot_retention_limit" requirement="optional" type="number">
<HclListItemDescription>

The number of days for which ElastiCache will retain automatic cache cluster snapshots before deleting them. Set to 0 to disable snapshots.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="15"/>
</HclListItem>

<HclListItem name="snapshot_window" requirement="optional" type="string">
<HclListItemDescription>

The daily time range during which automated backups are created (e.g. 04:00-09:00). Time zone is UTC. Performance may be degraded while a backup runs. Set to empty string to disable snapshots.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;06:00-07:00&quot;"/>
</HclListItem>

<HclListItem name="sns_topic_for_notifications" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the SNS Topic to which notifications will be sent when a Replication Group event happens, such as an automatic failover (e.g. arn:aws:sns:*:123456789012:my_sns_topic). An empty string is a valid value if you do not wish to receive notifications via SNS.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A set of tags to set for the ElastiCache Replication Group.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="cache_cluster_ids">
<HclListItemDescription>

The list of AWS cache cluster ids where each one represents a Redis node.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cache_node_id">
<HclListItemDescription>

The id of the ElastiCache node. Note: Each Redis cache cluster has only one node and its id is always 0001.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cache_port">
<HclListItemDescription>

The port number on which each of the cache nodes will accept connections (e.g. 6379).

</HclListItemDescription>
</HclListItem>

<HclListItem name="configuration_endpoint">
<HclListItemDescription>

When cluster mode is enabled, use this endpoint for all operations. Redis will automatically determine which of the cluster's node to access.

</HclListItemDescription>
</HclListItem>

<HclListItem name="primary_endpoint">
<HclListItemDescription>

The primary endpoint is a DNS name that always resolves to the primary node in the Redis cluster.

</HclListItemDescription>
</HclListItem>

<HclListItem name="reader_endpoint">
<HclListItemDescription>

When cluster mode is disabled, use this endpoint for all read operations.

</HclListItemDescription>
</HclListItem>

<HclListItem name="security_group_id">
<HclListItemDescription>

Security Group ID used for redis cluster.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/data-stores/redis/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/data-stores/redis/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/data-stores/redis/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "3f4c1c47c0bdec7087e1445d90c80165"
}
##DOCS-SOURCER-END -->
