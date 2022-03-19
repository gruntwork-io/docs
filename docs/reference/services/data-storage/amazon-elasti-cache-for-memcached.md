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
import HclListItem from '../../../../src/components/HclListItem.tsx';

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

<br/>

### Required

<HclListItem name="az_mode" requirement="required" description="Specifies whether the nodes in this Memcached node group are created in a single Availability Zone or created across multiple Availability Zones in the cluster's region. Valid values for this parameter are single-az or cross-az. If you want to choose cross-az, <a href=#num_cache_nodes><code>num_cache_nodes</code></a> must be greater than 1." type="string"/>

<HclListItem name="instance_type" requirement="required" description="The compute and memory capacity of the nodes (e.g. cache.m4.large)." type="string"/>

<HclListItem name="name" requirement="required" description="The name used to namespace all resources created by these templates, including the ElastiCache cluster itself. Must be unique in this region. Must be a lowercase string." type="string"/>

<HclListItem name="num_cache_nodes" requirement="required" description="The initial number of cache nodes that the cache cluster will have. Must be between 1 and 20." type="number"/>

<HclListItem name="subnet_ids" requirement="required" description="The list of IDs of the subnets in which to deploy the ElasticCache instances. The list must only contain subnets in <a href=#vpc_id><code>vpc_id</code></a>." type="list" typeDetails="list(string)"/>

<HclListItem name="vpc_id" requirement="required" description="The ID of the VPC in which to deploy RDS." type="string"/>


<br/>


### Optional

<HclListItem name="alarms_sns_topic_arns" requirement="optional" description="The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="allow_connections_from_cidr_blocks" requirement="optional" description="The list of network CIDR blocks to allow network access to ElastiCache from. One of <a href=#allow_connections_from_cidr_blocks><code>allow_connections_from_cidr_blocks</code></a> or <a href=#allow_connections_from_security_groups><code>allow_connections_from_security_groups</code></a> must be specified for the ElastiCache instances to be reachable." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="allow_connections_from_security_groups" requirement="optional" description="The list of IDs or Security Groups to allow network access to ElastiCache from. All security groups must either be in the VPC specified by <a href=#vpc_id><code>vpc_id</code></a>, or a peered VPC with the VPC specified by <a href=#vpc_id><code>vpc_id</code></a>. One of <a href=#allow_connections_from_cidr_blocks><code>allow_connections_from_cidr_blocks</code></a> or <a href=#allow_connections_from_security_groups><code>allow_connections_from_security_groups</code></a> must be specified for the ElastiCache instances to be reachable." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="apply_immediately" requirement="optional" description="Specifies whether any database modifications are applied immediately, or during the next maintenance window." type="bool" defaultValue="false"/>

<HclListItem name="enable_cloudwatch_alarms" requirement="optional" description="Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using <a href=#alarms_sns_topic_arn><code>alarms_sns_topic_arn</code></a>." type="bool" defaultValue="true"/>

<HclListItem name="maintenance_window" requirement="optional" description="Specifies the weekly time range for when maintenance on the cache cluster is performed (e.g. sun:05:00-sun:09:00). The format is ddd:hh24:mi-ddd:hh24:mi (24H Clock UTC). The minimum maintenance window is a 60 minute period." type="string" defaultValue="sat:07:00-sat:08:00"/>

<HclListItem name="memcached_version" requirement="optional" description="Version number of memcached to use (e.g. 1.5.16)." type="string" defaultValue="1.5.16"/>

<HclListItem name="port" requirement="optional" description="The port number on which each of the cache nodes will accept connections (e.g. 11211)." type="number" defaultValue="11211"/>

</TabItem>
<TabItem value="outputs" label="Outputs">

<br/>

<HclListItem name="cache_addresses" requirement="required" description="The list of addresses of the Memcached nodes without the port appended."/>

<HclListItem name="cache_cluster_id" requirement="required" description="The id of the ElastiCache Memcached cluster."/>

<HclListItem name="cache_node_ids" requirement="required" description="The list of the AWS cache cluster node ids where each one represents a Memcached node."/>

<HclListItem name="cache_port" requirement="required" description="The port number on which each of the cache nodes will accept connections (e.g. 11211)."/>

<HclListItem name="configuration_endpoint" requirement="required" description="The configuration endpoint to allow host discovery."/>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"6fe2b485640b9e4ed66d95c7020a86d3"}
##DOCS-SOURCER-END -->
