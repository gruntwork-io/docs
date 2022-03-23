---
type: "service"
name: "Amazon ElastiCache for Memcached"
description: "Deploy and manage Amazon ElastiCache for Memcached."
category: "nosql"
cloud: "aws"
tags: ["data","database","nosql","memcached","elasticache"]
license: "gruntwork"
built-with: "terraform"
title: "Amazon ElastiCache for Memcached"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';

<VersionBadge version="0.85.0" lastModifiedVersion="0.85.0"/>

# Amazon ElastiCache for Memcached


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/data-stores/memcached" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=data-stores%2Fmemcached" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

## Overview

This service contains code to deploy a [Memcached](https://memcached.org/) Cluster using
[Amazon ElastiCache](https://aws.amazon.com/elasticache/). The cluster is managed by AWS and automatically handles
automatic node discovery, recovery from failures, patching, and the ability to scale to large clusters of nodes.

![ElastiCache for Memcached architecture](/img/reference/services/data-storage/elasticache-memcached-architecture.png)

## Features

*   Deploy a fully-managed Memcached cluster
*   Automatic detection and recovery from cache node failures
*   Automatic discovery of nodes within a cluster
*   CloudWatch Alarms for alerting when CPU, memory, and disk metrics exceed certain thresholds
*   Integrate with Kubernetes Service Discovery

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

*   [Amazon ElastiCache for Memcached documentation](https://docs.aws.amazon.com/AmazonElastiCache/latest/mem-ug/WhatIs.html):
    Amazon’s ElastiCache for Memcached docs that cover core concepts such as the options and versions supported, security,
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

### Required

<a name="az_mode" className="snap-top"></a>

* [**`az_mode`**](#az_mode) &mdash; Specifies whether the nodes in this Memcached node group are created in a single Availability Zone or created across multiple Availability Zones in the cluster's region. Valid values for this parameter are single-az or cross-az. If you want to choose cross-az, [`num_cache_nodes`](#num_cache_nodes) must be greater than 1.

<a name="instance_type" className="snap-top"></a>

* [**`instance_type`**](#instance_type) &mdash; The compute and memory capacity of the nodes (e.g. cache.m4.large).

<a name="name" className="snap-top"></a>

* [**`name`**](#name) &mdash; The name used to namespace all resources created by these templates, including the ElastiCache cluster itself. Must be unique in this region. Must be a lowercase string.

<a name="num_cache_nodes" className="snap-top"></a>

* [**`num_cache_nodes`**](#num_cache_nodes) &mdash; The initial number of cache nodes that the cache cluster will have. Must be between 1 and 20.

<a name="subnet_ids" className="snap-top"></a>

* [**`subnet_ids`**](#subnet_ids) &mdash; The list of IDs of the subnets in which to deploy the ElasticCache instances. The list must only contain subnets in [`vpc_id`](#vpc_id).

<a name="vpc_id" className="snap-top"></a>

* [**`vpc_id`**](#vpc_id) &mdash; The ID of the VPC in which to deploy RDS.

### Optional

<a name="alarms_sns_topic_arns" className="snap-top"></a>

* [**`alarms_sns_topic_arns`**](#alarms_sns_topic_arns) &mdash; The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications.

<a name="allow_connections_from_cidr_blocks" className="snap-top"></a>

* [**`allow_connections_from_cidr_blocks`**](#allow_connections_from_cidr_blocks) &mdash; The list of network CIDR blocks to allow network access to ElastiCache from. One of [`allow_connections_from_cidr_blocks`](#allow_connections_from_cidr_blocks) or [`allow_connections_from_security_groups`](#allow_connections_from_security_groups) must be specified for the ElastiCache instances to be reachable.

<a name="allow_connections_from_security_groups" className="snap-top"></a>

* [**`allow_connections_from_security_groups`**](#allow_connections_from_security_groups) &mdash; The list of IDs or Security Groups to allow network access to ElastiCache from. All security groups must either be in the VPC specified by [`vpc_id`](#vpc_id), or a peered VPC with the VPC specified by [`vpc_id`](#vpc_id). One of [`allow_connections_from_cidr_blocks`](#allow_connections_from_cidr_blocks) or [`allow_connections_from_security_groups`](#allow_connections_from_security_groups) must be specified for the ElastiCache instances to be reachable.

<a name="apply_immediately" className="snap-top"></a>

* [**`apply_immediately`**](#apply_immediately) &mdash; Specifies whether any database modifications are applied immediately, or during the next maintenance window.

<a name="enable_cloudwatch_alarms" className="snap-top"></a>

* [**`enable_cloudwatch_alarms`**](#enable_cloudwatch_alarms) &mdash; Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using [`alarms_sns_topic_arn`](#alarms_sns_topic_arn).

<a name="maintenance_window" className="snap-top"></a>

* [**`maintenance_window`**](#maintenance_window) &mdash; Specifies the weekly time range for when maintenance on the cache cluster is performed (e.g. sun:05:00-sun:09:00). The format is ddd:hh24:mi-ddd:hh24:mi (24H Clock UTC). The minimum maintenance window is a 60 minute period.

<a name="memcached_version" className="snap-top"></a>

* [**`memcached_version`**](#memcached_version) &mdash; Version number of memcached to use (e.g. 1.5.16).

<a name="port" className="snap-top"></a>

* [**`port`**](#port) &mdash; The port number on which each of the cache nodes will accept connections (e.g. 11211).

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="cache_addresses" className="snap-top"></a>

* [**`cache_addresses`**](#cache_addresses) &mdash; The list of addresses of the Memcached nodes without the port appended.

<a name="cache_cluster_id" className="snap-top"></a>

* [**`cache_cluster_id`**](#cache_cluster_id) &mdash; The id of the ElastiCache Memcached cluster.

<a name="cache_node_ids" className="snap-top"></a>

* [**`cache_node_ids`**](#cache_node_ids) &mdash; The list of the AWS cache cluster node ids where each one represents a Memcached node.

<a name="cache_port" className="snap-top"></a>

* [**`cache_port`**](#cache_port) &mdash; The port number on which each of the cache nodes will accept connections (e.g. 11211).

<a name="configuration_endpoint" className="snap-top"></a>

* [**`configuration_endpoint`**](#configuration_endpoint) &mdash; The configuration endpoint to allow host discovery.

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"406ff8847a0204698f21bb80403a1697"}
##DOCS-SOURCER-END -->
