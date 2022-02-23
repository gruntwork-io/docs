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

<VersionBadge version="0.78.1" lastModifiedVersion="0.70.0"/>

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

<a name="alarms_sns_topic_arns" className="snap-top"></a>

* [**`alarms_sns_topic_arns`**](#alarms_sns_topic_arns) &mdash; The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications.

<a name="allow_connections_from_cidr_blocks" className="snap-top"></a>

* [**`allow_connections_from_cidr_blocks`**](#allow_connections_from_cidr_blocks) &mdash; The list of network CIDR blocks to allow network access to ElastiCache from. One of [`allow_connections_from_cidr_blocks`](#allow_connections_from_cidr_blocks) or [`allow_connections_from_security_groups`](#allow_connections_from_security_groups) must be specified for the ElastiCache instances to be reachable.

<a name="allow_connections_from_security_groups" className="snap-top"></a>

* [**`allow_connections_from_security_groups`**](#allow_connections_from_security_groups) &mdash; The list of IDs or Security Groups to allow network access to ElastiCache from. All security groups must either be in the VPC specified by [`vpc_id`](#vpc_id), or a peered VPC with the VPC specified by [`vpc_id`](#vpc_id). One of [`allow_connections_from_cidr_blocks`](#allow_connections_from_cidr_blocks) or [`allow_connections_from_security_groups`](#allow_connections_from_security_groups) must be specified for the ElastiCache instances to be reachable.

<a name="apply_immediately" className="snap-top"></a>

* [**`apply_immediately`**](#apply_immediately) &mdash; Specifies whether any modifications are applied immediately, or during the next maintenance window.

<a name="cluster_mode" className="snap-top"></a>

* [**`cluster_mode`**](#cluster_mode) &mdash; Specifies the number of shards and replicas per shard in the cluster. The list should contain a single map with keys [`'num_node_groups`](#'num_node_groups)' and [`'replicas_per_node_group`](#'replicas_per_node_group)' set to desired integer values.

<a name="enable_at_rest_encryption" className="snap-top"></a>

* [**`enable_at_rest_encryption`**](#enable_at_rest_encryption) &mdash; Whether to enable encryption at rest.

<a name="enable_automatic_failover" className="snap-top"></a>

* [**`enable_automatic_failover`**](#enable_automatic_failover) &mdash; Indicates whether Multi-AZ is enabled. When Multi-AZ is enabled, a read-only replica is automatically promoted to a read-write primary cluster if the existing primary cluster fails. If you specify true, you must specify a value greater than 1 for [`replication_group_size`](#replication_group_size).

<a name="enable_cloudwatch_alarms" className="snap-top"></a>

* [**`enable_cloudwatch_alarms`**](#enable_cloudwatch_alarms) &mdash; Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using [`alarms_sns_topic_arn`](#alarms_sns_topic_arn).

<a name="enable_multi_az" className="snap-top"></a>

* [**`enable_multi_az`**](#enable_multi_az) &mdash; Indicates whether Multi-AZ is enabled. When Multi-AZ is enabled, a read-only replica is automatically promoted to a read-write primary cluster if the existing primary cluster fails. If you specify true, you must specify a value greater than 1 for [`replication_group_size`](#replication_group_size).

<a name="enable_transit_encryption" className="snap-top"></a>

* [**`enable_transit_encryption`**](#enable_transit_encryption) &mdash; Whether to enable encryption in transit.

<a name="instance_type" className="snap-top"></a>

* [**`instance_type`**](#instance_type) &mdash; The compute and memory capacity of the nodes (e.g. cache.m4.large).

<a name="maintenance_window" className="snap-top"></a>

* [**`maintenance_window`**](#maintenance_window) &mdash; Specifies the weekly time range for when maintenance on the cache cluster is performed (e.g. sun:05:00-sun:09:00). The format is ddd:hh24:mi-ddd:hh24:mi (24H Clock UTC). The minimum maintenance window is a 60 minute period.

<a name="name" className="snap-top"></a>

* [**`name`**](#name) &mdash; The name used to namespace all resources created by these templates, including the ElastiCache cluster itself (e.g. rediscache). Must be unique in this region. Must be a lowercase string.

<a name="parameter_group_name" className="snap-top"></a>

* [**`parameter_group_name`**](#parameter_group_name) &mdash; Name of the parameter group to associate with this cache cluster. This can be used to configure custom settings for the cluster.

<a name="port" className="snap-top"></a>

* [**`port`**](#port) &mdash; The port number on which each of the cache nodes will accept connections (e.g. 6379).

<a name="redis_version" className="snap-top"></a>

* [**`redis_version`**](#redis_version) &mdash; Version number of redis to use (e.g. 5.0.6).

<a name="replication_group_size" className="snap-top"></a>

* [**`replication_group_size`**](#replication_group_size) &mdash; The total number of nodes in the Redis Replication Group. E.g. 1 represents just the primary node, 2 represents the primary plus a single Read Replica.

<a name="snapshot_retention_limit" className="snap-top"></a>

* [**`snapshot_retention_limit`**](#snapshot_retention_limit) &mdash; The number of days for which ElastiCache will retain automatic cache cluster snapshots before deleting them. Set to 0 to disable snapshots.

<a name="snapshot_window" className="snap-top"></a>

* [**`snapshot_window`**](#snapshot_window) &mdash; The daily time range during which automated backups are created (e.g. 04:00-09:00). Time zone is UTC. Performance may be degraded while a backup runs. Set to empty string to disable snapshots.

<a name="sns_topic_for_notifications" className="snap-top"></a>

* [**`sns_topic_for_notifications`**](#sns_topic_for_notifications) &mdash; The ARN of the SNS Topic to which notifications will be sent when a Replication Group event happens, such as an automatic failover (e.g. [`arn:aws:sns:*:123456789012:my_sns_topic`](#arn:aws:sns:*:123456789012:my_sns_topic)). An empty string is a valid value if you do not wish to receive notifications via SNS.

<a name="subnet_ids" className="snap-top"></a>

* [**`subnet_ids`**](#subnet_ids) &mdash; The list of IDs of the subnets in which to deploy the ElasticCache instances. The list must only contain subnets in [`vpc_id`](#vpc_id).

<a name="tags" className="snap-top"></a>

* [**`tags`**](#tags) &mdash; A set of tags to set for the ElastiCache Replication Group.

<a name="vpc_id" className="snap-top"></a>

* [**`vpc_id`**](#vpc_id) &mdash; The ID of the VPC in which to deploy RDS.

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="cache_cluster_ids" className="snap-top"></a>

* [**`cache_cluster_ids`**](#cache_cluster_ids) &mdash; The list of AWS cache cluster ids where each one represents a Redis node.

<a name="cache_node_id" className="snap-top"></a>

* [**`cache_node_id`**](#cache_node_id) &mdash; The id of the ElastiCache node. Note: Each Redis cache cluster has only one node and its id is always 0001.

<a name="cache_port" className="snap-top"></a>

* [**`cache_port`**](#cache_port) &mdash; The port number on which each of the cache nodes will accept connections (e.g. 6379).

<a name="configuration_endpoint" className="snap-top"></a>

* [**`configuration_endpoint`**](#configuration_endpoint) &mdash; When cluster mode is enabled, use this endpoint for all operations. Redis will automatically determine which of the cluster's node to access.

<a name="primary_endpoint" className="snap-top"></a>

* [**`primary_endpoint`**](#primary_endpoint) &mdash; The primary endpoint is a DNS name that always resolves to the primary node in the Redis cluster.

<a name="reader_endpoint" className="snap-top"></a>

* [**`reader_endpoint`**](#reader_endpoint) &mdash; When cluster mode is disabled, use this endpoint for all read operations.

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"769f876cdcc41231e5aea112bc98c0c6"}
##DOCS-SOURCER-END -->
