import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon ElastiCache for Redis

Deploy and manage Amazon ElastiCache for Redis

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/data-stores/redis" className="link-button">View on GitHub</a>

### Reference

<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <ul>
      
    <li>
      <p>
        <a name="alarms_sns_topic_arns" href="#alarms_sns_topic_arns" className="snap-top">
          <code>alarms_sns_topic_arns</code>
        </a> - The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications.
      </p>
    </li>
    <li>
      <p>
        <a name="allow_connections_from_cidr_blocks" href="#allow_connections_from_cidr_blocks" className="snap-top">
          <code>allow_connections_from_cidr_blocks</code>
        </a> - The list of network CIDR blocks to allow network access to ElastiCache from. One of var.allow_connections_from_cidr_blocks or var.allow_connections_from_security_groups must be specified for the ElastiCache instances to be reachable.
      </p>
    </li>
    <li>
      <p>
        <a name="allow_connections_from_security_groups" href="#allow_connections_from_security_groups" className="snap-top">
          <code>allow_connections_from_security_groups</code>
        </a> - The list of IDs or Security Groups to allow network access to ElastiCache from. All security groups must either be in the VPC specified by var.vpc_id, or a peered VPC with the VPC specified by var.vpc_id. One of var.allow_connections_from_cidr_blocks or var.allow_connections_from_security_groups must be specified for the ElastiCache instances to be reachable.
      </p>
    </li>
    <li>
      <p>
        <a name="apply_immediately" href="#apply_immediately" className="snap-top">
          <code>apply_immediately</code>
        </a> - Specifies whether any modifications are applied immediately, or during the next maintenance window.
      </p>
    </li>
    <li>
      <p>
        <a name="cluster_mode" href="#cluster_mode" className="snap-top">
          <code>cluster_mode</code>
        </a> - Specifies the number of shards and replicas per shard in the cluster. The list should contain a single map with keys 'num_node_groups' and 'replicas_per_node_group' set to desired integer values.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_at_rest_encryption" href="#enable_at_rest_encryption" className="snap-top">
          <code>enable_at_rest_encryption</code>
        </a> - Whether to enable encryption at rest.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_automatic_failover" href="#enable_automatic_failover" className="snap-top">
          <code>enable_automatic_failover</code>
        </a> - Indicates whether Multi-AZ is enabled. When Multi-AZ is enabled, a read-only replica is automatically promoted to a read-write primary cluster if the existing primary cluster fails. If you specify true, you must specify a value greater than 1 for replication_group_size.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_cloudwatch_alarms" href="#enable_cloudwatch_alarms" className="snap-top">
          <code>enable_cloudwatch_alarms</code>
        </a> - Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using var.alarms_sns_topic_arn.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_multi_az" href="#enable_multi_az" className="snap-top">
          <code>enable_multi_az</code>
        </a> - Indicates whether Multi-AZ is enabled. When Multi-AZ is enabled, a read-only replica is automatically promoted to a read-write primary cluster if the existing primary cluster fails. If you specify true, you must specify a value greater than 1 for replication_group_size.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_transit_encryption" href="#enable_transit_encryption" className="snap-top">
          <code>enable_transit_encryption</code>
        </a> - Whether to enable encryption in transit.
      </p>
    </li>
    <li>
      <p>
        <a name="instance_type" href="#instance_type" className="snap-top">
          <code>instance_type</code>
        </a> - The compute and memory capacity of the nodes (e.g. cache.m4.large).
      </p>
    </li>
    <li>
      <p>
        <a name="maintenance_window" href="#maintenance_window" className="snap-top">
          <code>maintenance_window</code>
        </a> - Specifies the weekly time range for when maintenance on the cache cluster is performed (e.g. sun:05:00-sun:09:00). The format is ddd:hh24:mi-ddd:hh24:mi (24H Clock UTC). The minimum maintenance window is a 60 minute period.
      </p>
    </li>
    <li>
      <p>
        <a name="name" href="#name" className="snap-top">
          <code>name</code>
        </a> - The name used to namespace all resources created by these templates, including the ElastiCache cluster itself (e.g. rediscache). Must be unique in this region. Must be a lowercase string.
      </p>
    </li>
    <li>
      <p>
        <a name="parameter_group_name" href="#parameter_group_name" className="snap-top">
          <code>parameter_group_name</code>
        </a> - Name of the parameter group to associate with this cache cluster. This can be used to configure custom settings for the cluster.
      </p>
    </li>
    <li>
      <p>
        <a name="port" href="#port" className="snap-top">
          <code>port</code>
        </a> - The port number on which each of the cache nodes will accept connections (e.g. 6379).
      </p>
    </li>
    <li>
      <p>
        <a name="redis_version" href="#redis_version" className="snap-top">
          <code>redis_version</code>
        </a> - Version number of redis to use (e.g. 5.0.6).
      </p>
    </li>
    <li>
      <p>
        <a name="replication_group_size" href="#replication_group_size" className="snap-top">
          <code>replication_group_size</code>
        </a> - The total number of nodes in the Redis Replication Group. E.g. 1 represents just the primary node, 2 represents the primary plus a single Read Replica.
      </p>
    </li>
    <li>
      <p>
        <a name="snapshot_retention_limit" href="#snapshot_retention_limit" className="snap-top">
          <code>snapshot_retention_limit</code>
        </a> - The number of days for which ElastiCache will retain automatic cache cluster snapshots before deleting them. Set to 0 to disable snapshots.
      </p>
    </li>
    <li>
      <p>
        <a name="snapshot_window" href="#snapshot_window" className="snap-top">
          <code>snapshot_window</code>
        </a> - The daily time range during which automated backups are created (e.g. 04:00-09:00). Time zone is UTC. Performance may be degraded while a backup runs. Set to empty string to disable snapshots.
      </p>
    </li>
    <li>
      <p>
        <a name="sns_topic_for_notifications" href="#sns_topic_for_notifications" className="snap-top">
          <code>sns_topic_for_notifications</code>
        </a> - The ARN of the SNS Topic to which notifications will be sent when a Replication Group event happens, such as an automatic failover (e.g. arn:aws:sns:*:123456789012:my_sns_topic). An empty string is a valid value if you do not wish to receive notifications via SNS.
      </p>
    </li>
    <li>
      <p>
        <a name="subnet_ids" href="#subnet_ids" className="snap-top">
          <code>subnet_ids</code>
        </a> - The list of IDs of the subnets in which to deploy the ElasticCache instances. The list must only contain subnets in var.vpc_id.
      </p>
    </li>
    <li>
      <p>
        <a name="tags" href="#tags" className="snap-top">
          <code>tags</code>
        </a> - A set of tags to set for the ElastiCache Replication Group.
      </p>
    </li>
    <li>
      <p>
        <a name="vpc_id" href="#vpc_id" className="snap-top">
          <code>vpc_id</code>
        </a> - The ID of the VPC in which to deploy RDS.
      </p>
    </li>
    </ul>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <ul>
      
    <li>
      <p>
        <a name="cache_cluster_ids" href="#cache_cluster_ids" className="snap-top">
          <code>cache_cluster_ids</code>
        </a> - The list of AWS cache cluster ids where each one represents a Redis node.
      </p>
    </li>
    <li>
      <p>
        <a name="cache_node_id" href="#cache_node_id" className="snap-top">
          <code>cache_node_id</code>
        </a> - The id of the ElastiCache node. Note: Each Redis cache cluster has only one node and its id is always 0001.
      </p>
    </li>
    <li>
      <p>
        <a name="cache_port" href="#cache_port" className="snap-top">
          <code>cache_port</code>
        </a> - The port number on which each of the cache nodes will accept connections (e.g. 6379).
      </p>
    </li>
    <li>
      <p>
        <a name="configuration_endpoint" href="#configuration_endpoint" className="snap-top">
          <code>configuration_endpoint</code>
        </a> - When cluster mode is enabled, use this endpoint for all operations. Redis will automatically determine which of the cluster's node to access.
      </p>
    </li>
    <li>
      <p>
        <a name="primary_endpoint" href="#primary_endpoint" className="snap-top">
          <code>primary_endpoint</code>
        </a> - The primary endpoint is a DNS name that always resolves to the primary node in the Redis cluster.
      </p>
    </li>
    <li>
      <p>
        <a name="reader_endpoint" href="#reader_endpoint" className="snap-top">
          <code>reader_endpoint</code>
        </a> - When cluster mode is disabled, use this endpoint for all read operations.
      </p>
    </li>
    </ul>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"1a1249551a041cac54d8a2e3588a9178"}
##DOCS-SOURCER-END -->
