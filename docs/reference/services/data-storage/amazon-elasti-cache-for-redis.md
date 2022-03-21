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
import { HclListItem, HclListItemTypeDetails, HclListItemDefaultValue } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.85.0" lastModifiedVersion="0.85.0"/>

# Amazon ElastiCache for Redis


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/data-stores/redis" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=data-stores%2Fredis" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

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

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<br/>

### Required

<HclListItem name="enable_automatic_failover" description="Indicates whether Multi-AZ is enabled. When Multi-AZ is enabled, a read-only replica is automatically promoted to a read-write primary cluster if the existing primary cluster fails. If you specify true, you must specify a value greater than 1 for replication_group_size." requirement="required" type="bool">
</HclListItem>

<HclListItem name="enable_multi_az" description="Indicates whether Multi-AZ is enabled. When Multi-AZ is enabled, a read-only replica is automatically promoted to a read-write primary cluster if the existing primary cluster fails. If you specify true, you must specify a value greater than 1 for replication_group_size." requirement="required" type="bool">
</HclListItem>

<HclListItem name="instance_type" description="The compute and memory capacity of the nodes (e.g. cache.m4.large)." requirement="required" type="string">
</HclListItem>

<HclListItem name="name" description="The name used to namespace all resources created by these templates, including the ElastiCache cluster itself (e.g. rediscache). Must be unique in this region. Must be a lowercase string." requirement="required" type="string">
</HclListItem>

<HclListItem name="replication_group_size" description="The total number of nodes in the Redis Replication Group. E.g. 1 represents just the primary node, 2 represents the primary plus a single Read Replica." requirement="required" type="number">
</HclListItem>

<HclListItem name="subnet_ids" description="The list of IDs of the subnets in which to deploy the ElasticCache instances. The list must only contain subnets in <a href=#vpc_id><code>vpc_id</code></a>." requirement="required" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
</HclListItem>

<HclListItem name="vpc_id" description="The ID of the VPC in which to deploy RDS." requirement="required" type="string">
</HclListItem>

### Optional

<HclListItem name="alarms_sns_topic_arns" description="The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications." requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_cidr_blocks" description="The list of network CIDR blocks to allow network access to ElastiCache from. One of <a href=#allow_connections_from_cidr_blocks><code>allow_connections_from_cidr_blocks</code></a> or <a href=#allow_connections_from_security_groups><code>allow_connections_from_security_groups</code></a> must be specified for the ElastiCache instances to be reachable." requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_security_groups" description="The list of IDs or Security Groups to allow network access to ElastiCache from. All security groups must either be in the VPC specified by <a href=#vpc_id><code>vpc_id</code></a>, or a peered VPC with the VPC specified by <a href=#vpc_id><code>vpc_id</code></a>. One of <a href=#allow_connections_from_cidr_blocks><code>allow_connections_from_cidr_blocks</code></a> or <a href=#allow_connections_from_security_groups><code>allow_connections_from_security_groups</code></a> must be specified for the ElastiCache instances to be reachable." requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="apply_immediately" description="Specifies whether any modifications are applied immediately, or during the next maintenance window." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="auth_token" description="The password used to access a password protected server. Can be specified only if transit_encryption_enabled = true. Must contain from 16 to 128 alphanumeric characters or symbols (excluding @, <double-quotes>, and /)" requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_mode" description="Specifies the number of shards and replicas per shard in the cluster. The list should contain a single map with keys 'num_node_groups' and 'replicas_per_node_group' set to desired integer values." requirement="optional" type="list">
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

<HclListItem name="enable_at_rest_encryption" description="Whether to enable encryption at rest." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_alarms" description="Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using <a href=#alarms_sns_topic_arn><code>alarms_sns_topic_arn</code></a>." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_transit_encryption" description="Whether to enable encryption in transit." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="maintenance_window" description="Specifies the weekly time range for when maintenance on the cache cluster is performed (e.g. sun:05:00-sun:09:00). The format is ddd:hh24:mi-ddd:hh24:mi (24H Clock UTC). The minimum maintenance window is a 60 minute period." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="sat:07:00-sat:08:00"/>
</HclListItem>

<HclListItem name="parameter_group_name" description="Name of the parameter group to associate with this cache cluster. This can be used to configure custom settings for the cluster." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="port" description="The port number on which each of the cache nodes will accept connections (e.g. 6379)." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="6379"/>
</HclListItem>

<HclListItem name="redis_version" description="Version number of redis to use (e.g. 5.0.6)." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="5.0.6"/>
</HclListItem>

<HclListItem name="snapshot_arn" description="The Amazon Resource Name (ARN) of a Redis RDB snapshot file stored in Amazon S3. You can use this parameter to restore from an externally created snapshot. If you have an ElastiCache snapshot, use snapshot_name." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="snapshot_name" description="The name of a snapshot from which to restore the Redis cluster. You can use this to restore from an ElastiCache snapshot. If you have an externally created snapshot, use snapshot_arn." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="snapshot_retention_limit" description="The number of days for which ElastiCache will retain automatic cache cluster snapshots before deleting them. Set to 0 to disable snapshots." requirement="optional" type="number">
<HclListItemDefaultValue defaultValue="15"/>
</HclListItem>

<HclListItem name="snapshot_window" description="The daily time range during which automated backups are created (e.g. 04:00-09:00). Time zone is UTC. Performance may be degraded while a backup runs. Set to empty string to disable snapshots." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="06:00-07:00"/>
</HclListItem>

<HclListItem name="sns_topic_for_notifications" description="The ARN of the SNS Topic to which notifications will be sent when a Replication Group event happens, such as an automatic failover (e.g. arn:aws:sns:*:123456789012:my_sns_topic). An empty string is a valid value if you do not wish to receive notifications via SNS." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue=""/>
</HclListItem>

<HclListItem name="tags" description="A set of tags to set for the ElastiCache Replication Group." requirement="optional" type="map">
<HclListItemTypeDetails>

```hcl
map(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<br/>

<HclListItem name="cache_cluster_ids" description="The list of AWS cache cluster ids where each one represents a Redis node.">
</HclListItem>

<HclListItem name="cache_node_id" description="The id of the ElastiCache node. Note: Each Redis cache cluster has only one node and its id is always 0001.">
</HclListItem>

<HclListItem name="cache_port" description="The port number on which each of the cache nodes will accept connections (e.g. 6379).">
</HclListItem>

<HclListItem name="configuration_endpoint" description="When cluster mode is enabled, use this endpoint for all operations. Redis will automatically determine which of the cluster's node to access.">
</HclListItem>

<HclListItem name="primary_endpoint" description="The primary endpoint is a DNS name that always resolves to the primary node in the Redis cluster.">
</HclListItem>

<HclListItem name="reader_endpoint" description="When cluster mode is disabled, use this endpoint for all read operations.">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"bc288548c4092eb117db2fb5cb93a622"}
##DOCS-SOURCER-END -->
