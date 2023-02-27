---
title: "Redis Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-cache/tree/main/modules%2Fredis" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-cache/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Redis Module

This module creates an ElastiCache cluster that runs [Redis](http://redis.io/).

The redis cluster is managed by AWS and automatically detects and replaces failed nodes, streamlines software upgrades
and patches, enables easy scaling of the cluster both horizontally (add more nodes) and vertically (increase the power
of existing nodes), and simplifies backup and restore functionality.

## About Amazon ElastiCache

### What is Amazon ElastiCache?

Before [Amazon ElastiCache](http://docs.aws.amazon.com/AmazonElastiCache/latest/UserGuide/WhatIs.html) existed, teams would painstakingly configure the memcached or redis caching engines on their own. Setting up automatic failover, read replicas, backups, and handling upgrades are all non-trivial and AWS recognized they could implement these features according to best practices themselves, sparing customers the time and cost of doing it themselves.

Behind the scenes, ElastiCache runs on EC2 Instances located in subnets and protected by security groups you specify.

### Structure of an ElastiCache Redis deployment

*   **Nodes:** The smallest unit of an ElastiCache Redis deployment is a node. It's basically the network-attached RAM on which the cache engine (Redis in this case) runs

*   **Shards:** Also sometimes called "Node Group". A Shard is a replication-enabled collection of multiple nodes. Within a Shard, one node is the primary read/write node while the rest are read-only replicas of the primary node. A Shard can have up to 5 read-only replicas.

*   **Cluster:** An ElastiCache cluster is a collection of one or more Shards. Somewhat confusingly, an ElastiCache Cluster has a "cluster mode" property that allows a Cluster to distribute its data over multiple Shards. When cluster mode is disabled, the Cluster can have at most one Shard. When cluster mode is enabled, the Cluster can have up to 15 Shards. A "cluster mode disabled" Cluster (i.e. Single Shard cluster) can be scaled horizontally by adding/removing replica nodes within its single Shard, vertical scaling is achieved by simply changing the node types. However, a "cluster mode enabled" Cluster (i.e. Multi Shard cluster) can be scaled horizontally by adding/removing Shards, the node types in the Shards can also be changed to achieve vertical scaling. Each cluster mode will be explained in detail below with additional info on when each one will be more appropriate depending on your scaling needs.

### How do you connect to the Redis Cluster?

*   When connecting to Redis (cluster mode disabled) from your app, direct all operations to the **Primary Endpoint** of the **Cluster.** This way, in the event of a failover, your app will be resolving a DNS record that automatically gets updated to the latest primary node.

*   When connecting to Redis (cluster mode enabled) from your app, direct all reads/writes to the **Configuration Endpoint** of the **Cluster.** Ensure you have a client that supports Redis Cluster (redis 3.2). You can still read from individual node enpoints.

*   In both "cluster mode enabled" and "cluster mode disabled" deployment models you can still direct reads to any of the **Read Endpoints** of the nodes in the Cluster, however you now risk reading a slightly out-of-date copy of the data in the event that you read from a node before the primary's latest data has synced to it.

This module outputs [Terraform output variables](https://www.terraform.io/intro/getting-started/outputs.html) that contain the address of the primary endpoint and read endpoints. You can programmatically extract these variables in your Terraform templates and pass them to other resources (e.g. as environment variables in an EC2 Instance) You'll also see the variables at the end of each `terraform apply` call or if you run `terraform output`.

### How do you scale the Redis Cluster?

You can scale your ElastiCache Cluster either horizontally (by adding more nodes) or vertically (by using more powerful nodes), but the method depends on whether Cluster Mode is enabled or disabled.

#### When Cluster Mode is Disabled

This mode is useful when you'd prefer to have only a single point for data to be written to the redis database. All data is written to the primary node of the single shard which is now replicated to the replica nodes. The advantage of this approach is that you're sure that all your data is present at a single point which could make migrations and backups a lot easier, if there's a problem with the primary write node however, all write attempts will fail.

*   **Vertical:** You can increase the type of the read replica nodes using the `instance_type` parameter (see [here](https://aws.amazon.com/elasticache/details/#Available_Cache_Node_Types) for valid values).

*   **Horizontal:** You can add up to 5 replica nodes to a Redis Cluster using the `cluster_size` parameter. There is always a primary node where all writes take place, but you can reduce load on this primary node by offloading reads to the non-primary nodes, which are known as Read Replicas.

For more info on both methods, see [Scaling Single-Node Redis (cluster mode disabled) Clusters](https://docs.aws.amazon.com/AmazonElastiCache/latest/UserGuide/Scaling.RedisStandalone.html).

#### When Cluster Mode is Enabled

When cluster mode is enabled, data you write is split among the primary nodes in multiple Shards, and each data stored in those Shards are replicated among the read replicas. If one Shard becomes unavailable for whatever reason, other shards are still available for writing.

To deploy a Redis "cluster mode enabled" cluster you must ensure that the `enable_automatic_failover` parameter is set to `true` and the `cluster_mode` variable has a single map with `num_shards` and `replicas_per_shard` parameters.

E.g. the following Terraform code specifies a "cluster mode enabled" Cluster with 2 Shards and 1 Read Replica per Shard

```hcl
cluster_mode = [{
    num_node_groups = 2
    replicas_per_node_group = 1
}]
```

*   **Horizontal:** A "cluster mode enabled" cluster can be scaled horizontally by adding more Shards - also called Resharding, the amount of read replicas present in the extra Shards is the same as the number specified when the cluster was originally created. Resharding can take anywhere from a few minutes to several hours.

*   **Vertical:** A "cluster mode enabled" cluster can be scaled vertically by changing the node types within each Shard. This method is offline only and the cluster has to be backed up, a new cluster created with the required node types and the backup restored to that new cluster. During this process your entire cluster will experience a downtime which could last for any length of time depending on how much data the original cluster contained.

For more info on scaling "cluster mode enabled" Redis clusters, see [Scaling Multishard Redis (cluster mode disabled) Clusters](https://docs.aws.amazon.com/AmazonElastiCache/latest/UserGuide/scaling-redis-cluster-mode-enabled.html)




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="enable_automatic_failover" requirement="required" type="bool">
<HclListItemDescription>

Specifies whether a read-only replica is automatically promoted to read/write primary if the existing primary fails. It must be enabled for Redis (cluster mode enabled) replication groups.

</HclListItemDescription>
</HclListItem>

<HclListItem name="enable_multi_az" requirement="required" type="bool">
<HclListItemDescription>

Indicates whether Multi-AZ is enabled. When Multi-AZ is enabled, a read-only replica is automatically promoted to a read-write primary cluster if the existing primary cluster fails. If you specify true, you must specify a value greater than 1 for replication_group_size.

</HclListItemDescription>
</HclListItem>

<HclListItem name="instance_type" requirement="required" type="string">
<HclListItemDescription>

The compute and memory capacity of the nodes (e.g. cache.m3.medium).

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

<HclListItem name="sns_topic_for_notifications" requirement="required" type="string">
<HclListItemDescription>

The ARN of the SNS Topic to which notifications will be sent when a Replication Group event happens, such as an automatic failover (e.g. arn:aws:sns:*:123456789012:my_sns_topic). An empty string is a valid value if you do not wish to receive notifications via SNS.

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

<HclListItem name="additional_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of additional security group ids to attach

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of CIDR-formatted IP address ranges that can connect to this ElastiCache cluster. For the standard Gruntwork VPC setup, these should be the CIDR blocks of the private app subnet in this VPC plus the private subnet in the mgmt VPC.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

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

<HclListItem name="auth_token" requirement="optional" type="string">
<HclListItemDescription>

The password used to access a password protected server. Can be specified only if transit_encryption_enabled = true. Must contain from 16 to 128 alphanumeric characters or symbols (excluding @, &lt;double-quotes>, and /)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="aws_elasticache_security_group_description" requirement="optional" type="string">
<HclListItemDescription>

The description of the aws_elasticache_security_group that is created. Defaults to 'Security group for the <a href="#name"><code>name</code></a> ElastiCache cluster' if not specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="aws_elasticache_security_group_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the aws_elasticache_security_group that is created. Defaults to <a href="#name"><code>name</code></a> if not specified.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="aws_elasticache_subnet_group_description" requirement="optional" type="string">
<HclListItemDescription>

Subnet group for the <a href="#name"><code>name</code></a> ElastiCache cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="aws_elasticache_subnet_group_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the aws_elasticache_subnet_group that is created. Defaults to <a href="#name"><code>name</code></a>-subnet-group if not specified.

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

<HclListItem name="enable_transit_encryption" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable encryption in transit.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

The KMS key ARN used to encrypt data at rest. Can be specified only if at_rest_encryption_enabled = true.

</HclListItemDescription>
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
<HclListItemDefaultValue defaultValue="6379"/>
</HclListItem>

<HclListItem name="redis_version" requirement="optional" type="string">
<HclListItemDescription>

Version number of redis to use (e.g. 5.0.5). Set to 6.x to use redis 6.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;5.0.5&quot;"/>
</HclListItem>

<HclListItem name="security_group_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A set of tags to set for the Security Group created as part of this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
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
<HclListItemDefaultValue defaultValue="7"/>
</HclListItem>

<HclListItem name="snapshot_window" requirement="optional" type="string">
<HclListItemDescription>

The daily time range during which automated backups are created (e.g. 04:00-09:00). Time zone is UTC. Performance may be degraded while a backup runs. Set to empty string to disable snapshots.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;06:00-07:00&quot;"/>
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
</HclListItem>

<HclListItem name="cache_node_id">
</HclListItem>

<HclListItem name="cache_port">
</HclListItem>

<HclListItem name="cluster_mode">
</HclListItem>

<HclListItem name="configuration_endpoint">
</HclListItem>

<HclListItem name="primary_endpoint">
</HclListItem>

<HclListItem name="reader_endpoint">
</HclListItem>

<HclListItem name="security_group_id">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-cache/tree/modules%2Fredis%2Freadme.md",
    "https://github.com/gruntwork-io/terraform-aws-cache/tree/modules%2Fredis%2Fvariables.tf",
    "https://github.com/gruntwork-io/terraform-aws-cache/tree/modules%2Fredis%2Foutputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "66c226a7b8fb27ebd9ad72f3fa57ccae"
}
##DOCS-SOURCER-END -->
