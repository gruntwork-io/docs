---
title: "Redis Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Cache Modules" version="0.23.0" lastModifiedVersion="0.23.0"/>

# Redis Module

<a href="https://github.com/gruntwork-io/terraform-aws-cache/tree/v0.23.0/modules/redis" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-cache/releases/tag/v0.23.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module creates an ElastiCache cluster that runs [Redis](http://redis.io/).

The redis cluster is managed by AWS and automatically detects and replaces failed nodes, streamlines software upgrades
and patches, enables easy scaling of the cluster both horizontally (add more nodes) and vertically (increase the power
of existing nodes), and simplifies backup and restore functionality.

## About Amazon ElastiCache

### What is Amazon ElastiCache?

Before [Amazon ElastiCache](http://docs.aws.amazon.com/AmazonElastiCache/latest/UserGuide/WhatIs.html) existed, teams
would painstakingly configure the memcached or redis caching engines on their own. Setting up automatic failover, read
replicas, backups, and handling upgrades are all non-trivial and AWS recognized they could implement these features
according to best practices themselves, sparing customers the time and cost of doing it themselves. Behind the scenes,
ElastiCache runs on EC2 Instances located in subnets and protected by security groups you specify.

### Structure of an ElastiCache Redis deployment

*   **Nodes:** The smallest unit of an ElastiCache Redis deployment is a node. It's basically the network-attached RAM on
    which the cache engine (Redis in this case) runs
*   **Shards:** Also sometimes called "Node Group". A Shard is a replication-enabled collection of multiple nodes. Within
    a Shard, one node is the primary read/write node while the rest are read-only replicas of the primary node.
*   **Cluster:** An ElastiCache cluster is a collection of one or more Shards. Somewhat confusingly, an ElastiCache
    Cluster has a "cluster mode" property that allows a Cluster to distribute its data over multiple Shards.

### Concept of Sharding & Replication in ElasticCache Redis

Redis implements replication in two ways:

*   **Cluster Mode Disabled**: With a single shard that contains all of the cluster's data in each node
*   **Cluster Mode Enabled**: With data partitioned across up to 500 shards

Each shard in a replication group has a single read/write primary node and up to 5 read-only replica nodes. You can
create a cluster with higher number of shards and lower number of replicas totaling up to 90 nodes per cluster. This
cluster configuration can range from 90 shards and 0 replicas to 15 shards and 5 replicas, which is the maximum number
of replicas allowed.

The node or shard limit can be increased to a maximum of 500 per cluster if the Redis engine version is 5.0.6 or higher.
For example, you can choose to configure a 500 node cluster that ranges between 83 shards (one primary and 5 replicas
per shard) and 500 shards (single primary and no replicas). Make sure there are enough available IP addresses to
accommodate the increase. Common pitfalls include the subnets in the subnet group have too small a CIDR range or the
subnets are shared and heavily used by other clusters.

You can find more information
here: https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/Replication.Redis.Groups.html

### Different Modes of ElasticCache Redis deployment

There are different types of modes you can deploy ElasticCache Redis:

| Mode                 | Description                                      | Configuration                                                                                                                                                                           |
|----------------------|--------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Cluster Enabled**  | - supports sharding <br/> - supports replication | - `enable_single_instance_mode = false` <br/> - `cluster_mode:num_node_groups > 1`                                                                                                      |
| **Cluster Disabled** | - no replication <br/> - supports sharding       | - `enable_single_instance_mode = false` <br/> - `cluster_mode:num_node_groups = 1` <br/> <br/> **Note**: do not include `.cluster.on` suffix if you are setting `parameter_group_name`. |
| **Single Instance**  | - no replication <br/> - no sharding             | - `enable_single_instance_mode = true`                                                                                                                                                  |

#### How to Enable Cluster Mode with Single Sharding

By default, if you set `cluster_mode::num_node_groups = 1`, you are deploying Redis with the cluster mode disabled. If
you want to enable cluster mode for redis with single sharding, you need to explicitly set the parameter group with
`cluster-enabled=yes` (e.g., default.redis5.0.cluster.on). You can find the list of default parameter group for
different redis version family group
here: https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/ParameterGroups.Redis.html

#### Choosing Cluster Mode vs. Single Instance

You can use `var.enable_single_instance_mode=true` to deploy a single node Redis instance. Refer
to [examples/redis_single_instance](https://github.com/gruntwork-io/terraform-aws-cache/tree/v0.23.0/examples/redis_single_instance) as an example.

Here are some of the points you may consider while choosing which mode to run:

*   **Scalability**: Redis single instance is limited to a single server node, which can be scaled vertically, while Redis
    cluster mode supports horizontal scaling by distributing data across multiple nodes, up to 1000 nodes. This allows for
    increased capacity, availability, and fault tolerance.
*   **High Availability**: Redis single instance has limited high availability options, as it can only be replicated to a
    slave node. In contrast, Redis cluster mode provides more robust high availability features by automatically
    distributing data across multiple nodes and ensuring data replication, even in the case of node failures.
*   **Performance**: Redis cluster mode provides improved performance, as it allows for distributing the data across
    multiple nodes, providing more CPU and memory resources. Additionally, Redis cluster mode uses sharding to distribute
    keys across multiple nodes, allowing for parallel data processing and faster data access.
*   **Complexity**: Redis cluster mode introduces more complexity than Redis single instance. Configuring and managing a
    Redis cluster requires more effort and expertise, as it involves setting up and managing multiple nodes, and
    configuring the sharding and replication.

### How do you connect to the Redis Cluster?

*   When connecting to Redis (cluster mode disabled) from your app, direct all operations to the **Primary Endpoint** of
    the **Cluster.** This way, in the event of a failover, your app will be resolving a DNS record that automatically gets
    updated to the latest primary node.

*   When connecting to Redis (cluster mode enabled) from your app, direct all reads/writes to the \*\*Configuration Endpoint
    \*\* of the **Cluster.** Ensure you have a client that supports Redis Cluster (redis 3.2). You can still read from
    individual node enpoints.

*   In both "cluster mode enabled" and "cluster mode disabled" deployment models you can still direct reads to any of the
    **Read Endpoints** of the nodes in the Cluster, however you now risk reading a slightly out-of-date copy of the data
    in the event that you read from a node before the primary's latest data has synced to it.

*   (Optional) It is possible to link a `user_group_id` and provide a list of user_id's to add additional layers of
    security for your cluster or replication group. Refer to
    the [ElasticCache RBAC Access](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/Clusters.RBAC.html)
    documentation for further information.

*   (Optional) It is also possible to update the `default` user id used by AWS when creating a redis cluster and replace
    it with your own `default` user. This is actually recommended by AWS as a first step to securing your Redis cluster.
    Refer to
    the [Role-Based Access Control (RBAC)](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/Clusters.RBAC.html)
    documentation on how to do this. The new user_id can be passed into the Redis clusters user group via
    the `default_user_id` variable.

This module outputs [Terraform output variables](https://www.terraform.io/intro/getting-started/outputs.html) that
contain the address of the primary endpoint and read endpoints. You can programmatically extract these variables in your
Terraform templates and pass them to other resources (e.g. as environment variables in an EC2 Instance) You'll also see
the variables at the end of each `terraform apply` call or if you run `terraform output`.

### How do you scale the Redis Cluster?

You can scale your ElastiCache Cluster either horizontally (by adding more nodes) or vertically (by using more powerful
nodes), but the method depends on whether Cluster Mode is enabled or disabled.

#### When Cluster Mode is Disabled

This mode is useful when you'd prefer to have only a single point for data to be written to the redis database. All data
is written to the primary node of the single shard which is now replicated to the replica nodes. The advantage of this
approach is that you're sure that all your data is present at a single point which could make migrations and backups a
lot easier, if there's a problem with the primary write node however, all write attempts will fail.

*   **Vertical:** You can increase the type of the read replica nodes using the `instance_type` parameter (
    see [here](https://aws.amazon.com/elasticache/details/#Available_Cache_Node_Types) for valid values).

*   **Horizontal:** You can add up to 5 replica nodes to a Redis Cluster using the `cluster_size` parameter. There is
    always a primary node where all writes take place, but you can reduce load on this primary node by offloading reads to
    the non-primary nodes, which are known as Read Replicas.

For more info on both methods,
see [Scaling Single-Node Redis (cluster mode disabled) Clusters](https://docs.aws.amazon.com/AmazonElastiCache/latest/UserGuide/Scaling.RedisStandalone.html).

#### When Cluster Mode is Enabled

When cluster mode is enabled, data you write is split among the primary nodes in multiple Shards, and each data stored
in those Shards are replicated among the read replicas. If one Shard becomes unavailable for whatever reason, other
shards are still available for writing.

To deploy a Redis "cluster mode enabled" cluster you must ensure that the `enable_automatic_failover` parameter is set
to `true` and the `cluster_mode` variable has a single map with `num_shards` and `replicas_per_shard` parameters.

E.g. the following Terraform code specifies a "cluster mode enabled" Cluster with 2 Shards and 1 Read Replica per Shard

```hcl
cluster_mode = [
  {
    num_node_groups         = 2
    replicas_per_node_group = 1
  }
]
```

*   **Horizontal:** A "cluster mode enabled" cluster can be scaled horizontally by adding more Shards - also called
    Resharding, the amount of read replicas present in the extra Shards is the same as the number specified when the
    cluster was originally created. Resharding can take anywhere from a few minutes to several hours.

*   **Vertical:** A "cluster mode enabled" cluster can be scaled vertically by changing the node types within each Shard.
    This method is offline only and the cluster has to be backed up, a new cluster created with the required node types
    and the backup restored to that new cluster. During this process your entire cluster will experience a downtime which
    could last for any length of time depending on how much data the original cluster contained.

For more info on scaling "cluster mode enabled" Redis clusters,
see [Scaling Multishard Redis (cluster mode disabled) Clusters](https://docs.aws.amazon.com/AmazonElastiCache/latest/UserGuide/scaling-redis-cluster-mode-enabled.html)

### How do you use the auto-scaling feature?

[Auto Scaling ElastiCache for Redis clusters](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/AutoScaling.html)
summarizes how auto-scaling works for Redis clusters. You can enable auto-scaling via using the following variables:

*   `enable_auto_scaling`: true
*   `auto_scale_dimension`: choose one from the supported scalable dimension mentioned below
*   `auto_scale_trigger_metric`: choose one from the supported trigger metric mentioned below
*   `auto_scale_min_capacity`: choose the desired min capacity
*   `auto_scale_max_capacity`: choose the desired max capacity (**Note**: depends on the configuration of the Redis
    cluster. (e.g., 5 would be the maximum for
    replica auto-scaling)

#### Prerequisites

ElastiCache for Redis Auto Scaling is limited to the following:

*   Redis (cluster mode enabled) clusters running Redis engine version 6.0 onwards
*   Instance type families - R5, R6g, M5, M6g
*   Instance sizes - Large, XLarge, 2XLarge
*   Auto Scaling in ElastiCache for Redis is not supported for clusters running in Global datastores, Outposts or Local
    Zones.
*   AWS Auto Scaling for ElastiCache for Redis is not available in the following regions: China (Beijing), China (
    Ningxia), AWS GovCloud (US-West) and AWS GovCloud (US-East).

#### Supported Predefined Metrics

Here are some predefined metrics available for Redis: `ElastiCachePrimaryEngineCPUUtilization` (shards
auto-scale), `ElastiCacheReplicaEngineCPUUtilization` (replica auto-scale). You can find more information here:

*   [Auto-Scaling with Replicas](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/AutoScaling-Scaling-Policies-Replicas-Replicas.html)
*   [Auto-Scaling with Shards](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/AutoScaling-Scaling-Policies-Target.html)

Both pages also explain how to use a custom metric and you can find the list of CloudWatch metrics for Redis from
here: https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/CacheMetrics.Redis.html

#### Supported Scalable Dimensions

ElastiCache for Redis supports the following types of automatic scaling dimensions:

*   `elasticache:replication-group:NodeGroups` - The number of node groups for an Amazon ElastiCache replication group.
*   `elasticache:replication-group:Replicas` - The number of replicas per node group for an Amazon ElastiCache replication
    group.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S REDIS MODULE
# ------------------------------------------------------------------------------------------------------

module "redis" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-cache.git//modules/redis?ref=v0.23.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The compute and memory capacity of the nodes (e.g. cache.t3.medium).
  instance_type = <string>

  # The name used to namespace all resources created by these templates,
  # including the ElastiCache cluster itself (e.g. rediscache). Must be unique
  # in this region. Must be a lowercase string.
  name = <string>

  # A list of subnet ids where the ElastiCache instances should be deployed. For
  # the standard Gruntwork VPC setup, these should be the private peristence
  # subnet ids.
  subnet_ids = <list(string)>

  # The id of the VPC in which the ElastiCache cluster should be deployed.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of additional security group ids to attach
  additional_security_group_ids = []

  # A list of CIDR-formatted IP address ranges that can connect to this
  # ElastiCache cluster. For the standard Gruntwork VPC setup, these should be
  # the CIDR blocks of the private app subnet in this VPC plus the private
  # subnet in the mgmt VPC.
  allow_connections_from_cidr_blocks = []

  # Specifies a list of Security Groups to allow connections from.
  allow_connections_from_security_groups = []

  # Specifies whether any database modifications are applied immediately, or
  # during the next maintenance window.
  apply_immediately = false

  # The password used to access a password protected server. Can be specified
  # only if transit_encryption_enabled = true. Must contain from 16 to 128
  # alphanumeric characters or symbols (excluding @, <double-quotes>, and /)
  auth_token = null

  # Specifies whether minor version engine upgrades will be applied
  # automatically to the underlying Cache Cluster instances during the
  # maintenance window. Only supported for engine type 'redis' and if the engine
  # version is 6 or higher
  auto_minor_version_upgrade = true

  # Scalable dimension of the scalable target. Supported dimensions are:
  # [elasticache:replication-group:NodeGroups,elasticache:replication-group:Replicas].
  # Documentation can be found in the ScalableDimension parameter at:
  # https://docs.aws.amazon.com/autoscaling/application/APIReference/API_RegisterScalableTarget.html#API_RegisterScalableTarget_RequestParameters.
  auto_scale_dimension = null

  # Max capacity of the scalable target.
  auto_scale_max_capacity = null

  # Min capacity of the scalable target.
  auto_scale_min_capacity = null

  # Metric type to trigger auto-scaling. Supported metric type can be found
  # here:
  # https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/CacheMetrics.Redis.html
  auto_scale_trigger_metric = null

  # Target value of the auto_scale trigger metric
  auto_scale_trigger_metric_target_value = null

  # Configuration variables for an ElastiCache Parameter Group.
  aws_elasticache_parameter_group_config = null

  # The description of the aws_elasticache_security_group that is created.
  # Defaults to 'Security group for the var.name ElastiCache cluster' if not
  # specified.
  aws_elasticache_security_group_description = null

  # The name of the aws_elasticache_security_group that is created. Defaults to
  # var.name if not specified.
  aws_elasticache_security_group_name = null

  # Subnet group for the var.name ElastiCache cluster.
  aws_elasticache_subnet_group_description = null

  # The name of the aws_elasticache_subnet_group that is created. Defaults to
  # var.name-subnet-group if not specified.
  aws_elasticache_subnet_group_name = null

  # Whether to create the ElastiCache user group or not. If not then it will
  # asume the group pointed by `user_group_id` already exists
  create_user_group = true

  # The name of the new 'default' user_id, in the event is different from
  # 'default'.
  default_user_id = "default"

  # Whether to enable encryption at rest.
  enable_at_rest_encryption = true

  # Whether to enable auto-scaling or not. Please refer to the prerequisite
  # section to understand the supported Redis configuration:
  # https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/AutoScaling.html
  enable_auto_scaling = false

  # Specifies whether a read-only replica is automatically promoted to
  # read/write primary if the existing primary fails. It must be enabled for
  # Redis (cluster mode enabled) replication groups. This is required if
  # enable_single_instance_mode is set to false.
  enable_automatic_failover = null

  # Indicates whether Multi-AZ is enabled. When Multi-AZ is enabled, a read-only
  # replica is automatically promoted to a read-write primary cluster if the
  # existing primary cluster fails. If you specify true, you must specify a
  # value greater than 1 for replication_group_size. This is required if
  # enable_single_instance_mode is set to false
  enable_multi_az = null

  # Whether to enable single-node Redis instance.
  enable_single_instance_mode = false

  # Whether to enable encryption in transit.
  enable_transit_encryption = true

  # Specifies the destination and format of Redis Engine Log. See the
  # documentation on Amazon ElastiCache. See Log Delivery Configuration below
  # for more details. You can find more information here
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elasticache_replication_group#log-delivery-configuration.
  engine_log_delivery_configuration = null

  # The KMS key ARN used to encrypt data at rest. Can be specified only if
  # at_rest_encryption_enabled = true.
  kms_key_id = null

  # Specifies the destination and format of Redis SLOWLOG or Redis Engine Log.
  # See the documentation on Amazon ElastiCache. See Log Delivery Configuration
  # below for more details. You can find more information here
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elasticache_replication_group#log-delivery-configuration.
  log_delivery_configuration = null

  # Specifies the weekly time range for when maintenance on the cache cluster is
  # performed (e.g. sun:05:00-sun:09:00). The format is ddd:hh24:mi-ddd:hh24:mi
  # (24H Clock UTC). The minimum maintenance window is a 60 minute period.
  maintenance_window = "sat:07:00-sat:08:00"

  # Number of node groups (shards) for this Redis replication group. Changing
  # this number will trigger a resizing operation before other settings
  # modifications.
  num_node_groups = null

  # Name of the parameter group to associate with this cache cluster. This can
  # be used to configure custom settings for the cluster.
  parameter_group_name = null

  # The port number on which each of the cache nodes will accept connections
  # (e.g. 6379).
  port = 6379

  # Version number of redis to use (e.g. 5.0.6). Set to 6.x to use redis 6.
  redis_version = "5.0.6"

  #  Number of replica nodes in each node group. Changing this number will
  # trigger a resizing operation before other settings modifications. Valid
  # values are 0 to 5.
  replicas_per_node_group = null

  # The total number of nodes in the Redis Replication Group. E.g. 1 represents
  # just the primary node, 2 represents the primary plus a single Read Replica.
  # This is required if enable_single_instance_mode is set to false
  replication_group_size = null

  # A set of tags to set for the Security Group created as part of this module.
  security_group_tags = {}

  # Specifies the destination and format of Redis SLOWLOG. See the documentation
  # on Amazon ElastiCache. See Log Delivery Configuration below for more
  # details. You can find more information here
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elasticache_replication_group#log-delivery-configuration.
  slow_log_delivery_configuration = null

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
  snapshot_retention_limit = 7

  # The daily time range during which automated backups are created (e.g.
  # 04:00-09:00). Time zone is UTC. Performance may be degraded while a backup
  # runs. Set to empty string to disable snapshots.
  snapshot_window = "06:00-07:00"

  # The ARN of the SNS Topic to which notifications will be sent when a
  # Replication Group event happens, such as an automatic failover (e.g.
  # arn:aws:sns:*:123456789012:my_sns_topic). An empty string is a valid value
  # if you do not wish to receive notifications via SNS. This is required if
  # enable_single_instance_mode is set to false
  sns_topic_for_notifications = null

  # A set of tags to set for the ElastiCache Replication Group.
  tags = {}

  # The group id of the AWS Elasticache group which can be used to provide
  # access to a Redis replication group or cluster and allow for RBAC access
  user_group_id = null

  # This is a list of user IDs  that should be added to the group defined in the
  # 'user_group_id' variable. This list should always include the 'default' user
  # in addition to user Ids
  user_ids = []

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S REDIS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-cache.git//modules/redis?ref=v0.23.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The compute and memory capacity of the nodes (e.g. cache.t3.medium).
  instance_type = <string>

  # The name used to namespace all resources created by these templates,
  # including the ElastiCache cluster itself (e.g. rediscache). Must be unique
  # in this region. Must be a lowercase string.
  name = <string>

  # A list of subnet ids where the ElastiCache instances should be deployed. For
  # the standard Gruntwork VPC setup, these should be the private peristence
  # subnet ids.
  subnet_ids = <list(string)>

  # The id of the VPC in which the ElastiCache cluster should be deployed.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of additional security group ids to attach
  additional_security_group_ids = []

  # A list of CIDR-formatted IP address ranges that can connect to this
  # ElastiCache cluster. For the standard Gruntwork VPC setup, these should be
  # the CIDR blocks of the private app subnet in this VPC plus the private
  # subnet in the mgmt VPC.
  allow_connections_from_cidr_blocks = []

  # Specifies a list of Security Groups to allow connections from.
  allow_connections_from_security_groups = []

  # Specifies whether any database modifications are applied immediately, or
  # during the next maintenance window.
  apply_immediately = false

  # The password used to access a password protected server. Can be specified
  # only if transit_encryption_enabled = true. Must contain from 16 to 128
  # alphanumeric characters or symbols (excluding @, <double-quotes>, and /)
  auth_token = null

  # Specifies whether minor version engine upgrades will be applied
  # automatically to the underlying Cache Cluster instances during the
  # maintenance window. Only supported for engine type 'redis' and if the engine
  # version is 6 or higher
  auto_minor_version_upgrade = true

  # Scalable dimension of the scalable target. Supported dimensions are:
  # [elasticache:replication-group:NodeGroups,elasticache:replication-group:Replicas].
  # Documentation can be found in the ScalableDimension parameter at:
  # https://docs.aws.amazon.com/autoscaling/application/APIReference/API_RegisterScalableTarget.html#API_RegisterScalableTarget_RequestParameters.
  auto_scale_dimension = null

  # Max capacity of the scalable target.
  auto_scale_max_capacity = null

  # Min capacity of the scalable target.
  auto_scale_min_capacity = null

  # Metric type to trigger auto-scaling. Supported metric type can be found
  # here:
  # https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/CacheMetrics.Redis.html
  auto_scale_trigger_metric = null

  # Target value of the auto_scale trigger metric
  auto_scale_trigger_metric_target_value = null

  # Configuration variables for an ElastiCache Parameter Group.
  aws_elasticache_parameter_group_config = null

  # The description of the aws_elasticache_security_group that is created.
  # Defaults to 'Security group for the var.name ElastiCache cluster' if not
  # specified.
  aws_elasticache_security_group_description = null

  # The name of the aws_elasticache_security_group that is created. Defaults to
  # var.name if not specified.
  aws_elasticache_security_group_name = null

  # Subnet group for the var.name ElastiCache cluster.
  aws_elasticache_subnet_group_description = null

  # The name of the aws_elasticache_subnet_group that is created. Defaults to
  # var.name-subnet-group if not specified.
  aws_elasticache_subnet_group_name = null

  # Whether to create the ElastiCache user group or not. If not then it will
  # asume the group pointed by `user_group_id` already exists
  create_user_group = true

  # The name of the new 'default' user_id, in the event is different from
  # 'default'.
  default_user_id = "default"

  # Whether to enable encryption at rest.
  enable_at_rest_encryption = true

  # Whether to enable auto-scaling or not. Please refer to the prerequisite
  # section to understand the supported Redis configuration:
  # https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/AutoScaling.html
  enable_auto_scaling = false

  # Specifies whether a read-only replica is automatically promoted to
  # read/write primary if the existing primary fails. It must be enabled for
  # Redis (cluster mode enabled) replication groups. This is required if
  # enable_single_instance_mode is set to false.
  enable_automatic_failover = null

  # Indicates whether Multi-AZ is enabled. When Multi-AZ is enabled, a read-only
  # replica is automatically promoted to a read-write primary cluster if the
  # existing primary cluster fails. If you specify true, you must specify a
  # value greater than 1 for replication_group_size. This is required if
  # enable_single_instance_mode is set to false
  enable_multi_az = null

  # Whether to enable single-node Redis instance.
  enable_single_instance_mode = false

  # Whether to enable encryption in transit.
  enable_transit_encryption = true

  # Specifies the destination and format of Redis Engine Log. See the
  # documentation on Amazon ElastiCache. See Log Delivery Configuration below
  # for more details. You can find more information here
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elasticache_replication_group#log-delivery-configuration.
  engine_log_delivery_configuration = null

  # The KMS key ARN used to encrypt data at rest. Can be specified only if
  # at_rest_encryption_enabled = true.
  kms_key_id = null

  # Specifies the destination and format of Redis SLOWLOG or Redis Engine Log.
  # See the documentation on Amazon ElastiCache. See Log Delivery Configuration
  # below for more details. You can find more information here
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elasticache_replication_group#log-delivery-configuration.
  log_delivery_configuration = null

  # Specifies the weekly time range for when maintenance on the cache cluster is
  # performed (e.g. sun:05:00-sun:09:00). The format is ddd:hh24:mi-ddd:hh24:mi
  # (24H Clock UTC). The minimum maintenance window is a 60 minute period.
  maintenance_window = "sat:07:00-sat:08:00"

  # Number of node groups (shards) for this Redis replication group. Changing
  # this number will trigger a resizing operation before other settings
  # modifications.
  num_node_groups = null

  # Name of the parameter group to associate with this cache cluster. This can
  # be used to configure custom settings for the cluster.
  parameter_group_name = null

  # The port number on which each of the cache nodes will accept connections
  # (e.g. 6379).
  port = 6379

  # Version number of redis to use (e.g. 5.0.6). Set to 6.x to use redis 6.
  redis_version = "5.0.6"

  #  Number of replica nodes in each node group. Changing this number will
  # trigger a resizing operation before other settings modifications. Valid
  # values are 0 to 5.
  replicas_per_node_group = null

  # The total number of nodes in the Redis Replication Group. E.g. 1 represents
  # just the primary node, 2 represents the primary plus a single Read Replica.
  # This is required if enable_single_instance_mode is set to false
  replication_group_size = null

  # A set of tags to set for the Security Group created as part of this module.
  security_group_tags = {}

  # Specifies the destination and format of Redis SLOWLOG. See the documentation
  # on Amazon ElastiCache. See Log Delivery Configuration below for more
  # details. You can find more information here
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elasticache_replication_group#log-delivery-configuration.
  slow_log_delivery_configuration = null

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
  snapshot_retention_limit = 7

  # The daily time range during which automated backups are created (e.g.
  # 04:00-09:00). Time zone is UTC. Performance may be degraded while a backup
  # runs. Set to empty string to disable snapshots.
  snapshot_window = "06:00-07:00"

  # The ARN of the SNS Topic to which notifications will be sent when a
  # Replication Group event happens, such as an automatic failover (e.g.
  # arn:aws:sns:*:123456789012:my_sns_topic). An empty string is a valid value
  # if you do not wish to receive notifications via SNS. This is required if
  # enable_single_instance_mode is set to false
  sns_topic_for_notifications = null

  # A set of tags to set for the ElastiCache Replication Group.
  tags = {}

  # The group id of the AWS Elasticache group which can be used to provide
  # access to a Redis replication group or cluster and allow for RBAC access
  user_group_id = null

  # This is a list of user IDs  that should be added to the group defined in the
  # 'user_group_id' variable. This list should always include the 'default' user
  # in addition to user Ids
  user_ids = []

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="instance_type" requirement="required" type="string">
<HclListItemDescription>

The compute and memory capacity of the nodes (e.g. cache.t3.medium).

</HclListItemDescription>
</HclListItem>

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name used to namespace all resources created by these templates, including the ElastiCache cluster itself (e.g. rediscache). Must be unique in this region. Must be a lowercase string.

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

<HclListItem name="auto_minor_version_upgrade" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether minor version engine upgrades will be applied automatically to the underlying Cache Cluster instances during the maintenance window. Only supported for engine type 'redis' and if the engine version is 6 or higher

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="auto_scale_dimension" requirement="optional" type="string">
<HclListItemDescription>

Scalable dimension of the scalable target. Supported dimensions are: [elasticache:replication-group:NodeGroups,elasticache:replication-group:Replicas]. Documentation can be found in the ScalableDimension parameter at: https://docs.aws.amazon.com/autoscaling/application/APIReference/API_RegisterScalableTarget.html#API_RegisterScalableTarget_RequestParameters.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="auto_scale_max_capacity" requirement="optional" type="number">
<HclListItemDescription>

Max capacity of the scalable target.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="auto_scale_min_capacity" requirement="optional" type="number">
<HclListItemDescription>

Min capacity of the scalable target.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="auto_scale_trigger_metric" requirement="optional" type="string">
<HclListItemDescription>

Metric type to trigger auto-scaling. Supported metric type can be found here: https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/CacheMetrics.Redis.html

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="auto_scale_trigger_metric_target_value" requirement="optional" type="number">
<HclListItemDescription>

Target value of the auto_scale trigger metric

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="aws_elasticache_parameter_group_config" requirement="optional" type="object(…)">
<HclListItemDescription>

Configuration variables for an ElastiCache Parameter Group.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    name        = string
    family      = string
    description = string
    parameters  = list(map(string))
  })
```

</HclListItemTypeDetails>
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

<HclListItem name="create_user_group" requirement="optional" type="bool">
<HclListItemDescription>

Whether to create the ElastiCache user group or not. If not then it will asume the group pointed by `user_group_id` already exists

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="default_user_id" requirement="optional" type="string">
<HclListItemDescription>

The name of the new 'default' user_id, in the event is different from 'default'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;default&quot;"/>
</HclListItem>

<HclListItem name="enable_at_rest_encryption" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable encryption at rest.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_auto_scaling" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable auto-scaling or not. Please refer to the prerequisite section to understand the supported Redis configuration: https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/AutoScaling.html

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_automatic_failover" requirement="optional" type="bool">
<HclListItemDescription>

Specifies whether a read-only replica is automatically promoted to read/write primary if the existing primary fails. It must be enabled for Redis (cluster mode enabled) replication groups. This is required if enable_single_instance_mode is set to false.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="enable_multi_az" requirement="optional" type="bool">
<HclListItemDescription>

Indicates whether Multi-AZ is enabled. When Multi-AZ is enabled, a read-only replica is automatically promoted to a read-write primary cluster if the existing primary cluster fails. If you specify true, you must specify a value greater than 1 for replication_group_size. This is required if enable_single_instance_mode is set to false

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="enable_single_instance_mode" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable single-node Redis instance.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_transit_encryption" requirement="optional" type="bool">
<HclListItemDescription>

Whether to enable encryption in transit.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
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

<HclListItem name="kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

The KMS key ARN used to encrypt data at rest. Can be specified only if at_rest_encryption_enabled = true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="log_delivery_configuration" requirement="optional" type="object(…)">
<HclListItemDescription>

Specifies the destination and format of Redis SLOWLOG or Redis Engine Log. See the documentation on Amazon ElastiCache. See Log Delivery Configuration below for more details. You can find more information here https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elasticache_replication_group#log-delivery-configuration.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    destination      = string
    destination_type = string
    log_format       = string
    log_type         = string
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

<HclListItem name="num_node_groups" requirement="optional" type="number">
<HclListItemDescription>

Number of node groups (shards) for this Redis replication group. Changing this number will trigger a resizing operation before other settings modifications.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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

Version number of redis to use (e.g. 5.0.6). Set to 6.x to use redis 6.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;5.0.6&quot;"/>
</HclListItem>

<HclListItem name="replicas_per_node_group" requirement="optional" type="number">
<HclListItemDescription>

 Number of replica nodes in each node group. Changing this number will trigger a resizing operation before other settings modifications. Valid values are 0 to 5.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="replication_group_size" requirement="optional" type="number">
<HclListItemDescription>

The total number of nodes in the Redis Replication Group. E.g. 1 represents just the primary node, 2 represents the primary plus a single Read Replica. This is required if enable_single_instance_mode is set to false

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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

<HclListItem name="sns_topic_for_notifications" requirement="optional" type="string">
<HclListItemDescription>

The ARN of the SNS Topic to which notifications will be sent when a Replication Group event happens, such as an automatic failover (e.g. arn:aws:sns:*:123456789012:my_sns_topic). An empty string is a valid value if you do not wish to receive notifications via SNS. This is required if enable_single_instance_mode is set to false

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A set of tags to set for the ElastiCache Replication Group.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="user_group_id" requirement="optional" type="string">
<HclListItemDescription>

The group id of the AWS Elasticache group which can be used to provide access to a Redis replication group or cluster and allow for RBAC access

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="user_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

This is a list of user IDs  that should be added to the group defined in the 'user_group_id' variable. This list should always include the 'default' user in addition to user Ids

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   When a Redis cluster is created, there is always a default user, and that
   user always must be added to the group.

```
</details>

</HclGeneralListItem>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="cache_addresses">
</HclListItem>

<HclListItem name="cache_cluster_ids">
</HclListItem>

<HclListItem name="cache_node_id">
</HclListItem>

<HclListItem name="cache_node_ids">
</HclListItem>

<HclListItem name="cache_port">
</HclListItem>

<HclListItem name="configuration_endpoint">
</HclListItem>

<HclListItem name="parameter_group">
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
    "https://github.com/gruntwork-io/terraform-aws-cache/tree/v0.23.0/modules/redis/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-cache/tree/v0.23.0/modules/redis/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-cache/tree/v0.23.0/modules/redis/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "a9b85f0f916ac95fd8e603096c1c6b9d"
}
##DOCS-SOURCER-END -->
