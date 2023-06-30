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
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.104.14" lastModifiedVersion="0.96.1"/>

# Amazon ElastiCache for Memcached

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/data-stores/memcached" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=data-stores%2Fmemcached" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>

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
# DEPLOY GRUNTWORK'S MEMCACHED MODULE
# ------------------------------------------------------------------------------------------------------

module "memcached" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/memcached?ref=v0.104.14"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Specifies whether the nodes in this Memcached node group are created in a
  # single Availability Zone or created across multiple Availability Zones in
  # the cluster's region. Valid values for this parameter are single-az or
  # cross-az. If you want to choose cross-az, num_cache_nodes must be greater
  # than 1.
  az_mode = <string>

  # The compute and memory capacity of the nodes (e.g. cache.m4.large).
  instance_type = <string>

  # The name used to namespace all resources created by these templates,
  # including the ElastiCache cluster itself. Must be unique in this region.
  # Must be a lowercase string.
  name = <string>

  # The initial number of cache nodes that the cache cluster will have. Must be
  # between 1 and 20.
  num_cache_nodes = <number>

  # The list of IDs of the subnets in which to deploy the ElasticCache
  # instances. The list must only contain subnets in var.vpc_id.
  subnet_ids = <list(string)>

  # The ID of the VPC in which to deploy RDS.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

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

  # Specifies whether any database modifications are applied immediately, or
  # during the next maintenance window.
  apply_immediately = false

  # Set to true to enable several basic CloudWatch alarms around CPU usage,
  # memory usage, and disk space usage. If set to true, make sure to specify SNS
  # topics to send notifications to using var.alarms_sns_topic_arn.
  enable_cloudwatch_alarms = true

  # Specifies the weekly time range for when maintenance on the cache cluster is
  # performed (e.g. sun:05:00-sun:09:00). The format is ddd:hh24:mi-ddd:hh24:mi
  # (24H Clock UTC). The minimum maintenance window is a 60 minute period.
  maintenance_window = "sat:07:00-sat:08:00"

  # Version number of memcached to use (e.g. 1.5.16).
  memcached_version = "1.5.16"

  # The port number on which each of the cache nodes will accept connections
  # (e.g. 11211).
  port = 11211

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S MEMCACHED MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/memcached?ref=v0.104.14"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Specifies whether the nodes in this Memcached node group are created in a
  # single Availability Zone or created across multiple Availability Zones in
  # the cluster's region. Valid values for this parameter are single-az or
  # cross-az. If you want to choose cross-az, num_cache_nodes must be greater
  # than 1.
  az_mode = <string>

  # The compute and memory capacity of the nodes (e.g. cache.m4.large).
  instance_type = <string>

  # The name used to namespace all resources created by these templates,
  # including the ElastiCache cluster itself. Must be unique in this region.
  # Must be a lowercase string.
  name = <string>

  # The initial number of cache nodes that the cache cluster will have. Must be
  # between 1 and 20.
  num_cache_nodes = <number>

  # The list of IDs of the subnets in which to deploy the ElasticCache
  # instances. The list must only contain subnets in var.vpc_id.
  subnet_ids = <list(string)>

  # The ID of the VPC in which to deploy RDS.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

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

  # Specifies whether any database modifications are applied immediately, or
  # during the next maintenance window.
  apply_immediately = false

  # Set to true to enable several basic CloudWatch alarms around CPU usage,
  # memory usage, and disk space usage. If set to true, make sure to specify SNS
  # topics to send notifications to using var.alarms_sns_topic_arn.
  enable_cloudwatch_alarms = true

  # Specifies the weekly time range for when maintenance on the cache cluster is
  # performed (e.g. sun:05:00-sun:09:00). The format is ddd:hh24:mi-ddd:hh24:mi
  # (24H Clock UTC). The minimum maintenance window is a 60 minute period.
  maintenance_window = "sat:07:00-sat:08:00"

  # Version number of memcached to use (e.g. 1.5.16).
  memcached_version = "1.5.16"

  # The port number on which each of the cache nodes will accept connections
  # (e.g. 11211).
  port = 11211

}


```

</TabItem>
</Tabs>



## Reference


<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="az_mode" requirement="required" type="string">
<HclListItemDescription>

Specifies whether the nodes in this Memcached node group are created in a single Availability Zone or created across multiple Availability Zones in the cluster's region. Valid values for this parameter are single-az or cross-az. If you want to choose cross-az, num_cache_nodes must be greater than 1.

</HclListItemDescription>
</HclListItem>

<HclListItem name="instance_type" requirement="required" type="string">
<HclListItemDescription>

The compute and memory capacity of the nodes (e.g. cache.m4.large).

</HclListItemDescription>
</HclListItem>

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name used to namespace all resources created by these templates, including the ElastiCache cluster itself. Must be unique in this region. Must be a lowercase string.

</HclListItemDescription>
</HclListItem>

<HclListItem name="num_cache_nodes" requirement="required" type="number">
<HclListItemDescription>

The initial number of cache nodes that the cache cluster will have. Must be between 1 and 20.

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

Specifies whether any database modifications are applied immediately, or during the next maintenance window.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_alarms" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using <a href="#alarms_sns_topic_arn"><code>alarms_sns_topic_arn</code></a>.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="maintenance_window" requirement="optional" type="string">
<HclListItemDescription>

Specifies the weekly time range for when maintenance on the cache cluster is performed (e.g. sun:05:00-sun:09:00). The format is ddd:hh24:mi-ddd:hh24:mi (24H Clock UTC). The minimum maintenance window is a 60 minute period.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;sat:07:00-sat:08:00&quot;"/>
</HclListItem>

<HclListItem name="memcached_version" requirement="optional" type="string">
<HclListItemDescription>

Version number of memcached to use (e.g. 1.5.16).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;1.5.16&quot;"/>
</HclListItem>

<HclListItem name="port" requirement="optional" type="number">
<HclListItemDescription>

The port number on which each of the cache nodes will accept connections (e.g. 11211).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="11211"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="cache_addresses">
<HclListItemDescription>

The list of addresses of the Memcached nodes without the port appended.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cache_cluster_id">
<HclListItemDescription>

The id of the ElastiCache Memcached cluster.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cache_node_ids">
<HclListItemDescription>

The list of the AWS cache cluster node ids where each one represents a Memcached node.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cache_port">
<HclListItemDescription>

The port number on which each of the cache nodes will accept connections (e.g. 11211).

</HclListItemDescription>
</HclListItem>

<HclListItem name="configuration_endpoint">
<HclListItemDescription>

The configuration endpoint to allow host discovery.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/data-stores/memcached/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/data-stores/memcached/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/data-stores/memcached/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "96a90974e3a22787375a9159d309f1a5"
}
##DOCS-SOURCER-END -->
