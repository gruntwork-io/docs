import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon ElastiCache for Memcached

Deploy and manage Amazon ElastiCache for Memcached

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/data-stores/memcached" className="link-button">View on GitHub</a>

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
        </a> - Specifies whether any database modifications are applied immediately, or during the next maintenance window.
      </p>
    </li>
    <li>
      <p>
        <a name="az_mode" href="#az_mode" className="snap-top">
          <code>az_mode</code>
        </a> - Specifies whether the nodes in this Memcached node group are created in a single Availability Zone or created across multiple Availability Zones in the cluster's region. Valid values for this parameter are single-az or cross-az. If you want to choose cross-az, num_cache_nodes must be greater than 1.
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
        <a name="memcached_version" href="#memcached_version" className="snap-top">
          <code>memcached_version</code>
        </a> - Version number of memcached to use (e.g. 1.5.16).
      </p>
    </li>
    <li>
      <p>
        <a name="name" href="#name" className="snap-top">
          <code>name</code>
        </a> - The name used to namespace all resources created by these templates, including the ElastiCache cluster itself. Must be unique in this region. Must be a lowercase string.
      </p>
    </li>
    <li>
      <p>
        <a name="num_cache_nodes" href="#num_cache_nodes" className="snap-top">
          <code>num_cache_nodes</code>
        </a> - The initial number of cache nodes that the cache cluster will have. Must be between 1 and 20.
      </p>
    </li>
    <li>
      <p>
        <a name="port" href="#port" className="snap-top">
          <code>port</code>
        </a> - The port number on which each of the cache nodes will accept connections (e.g. 11211).
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
        <a name="cache_addresses" href="#cache_addresses" className="snap-top">
          <code>cache_addresses</code>
        </a> - The list of addresses of the Memcached nodes without the port appended.
      </p>
    </li>
    <li>
      <p>
        <a name="cache_cluster_id" href="#cache_cluster_id" className="snap-top">
          <code>cache_cluster_id</code>
        </a> - The id of the ElastiCache Memcached cluster.
      </p>
    </li>
    <li>
      <p>
        <a name="cache_node_ids" href="#cache_node_ids" className="snap-top">
          <code>cache_node_ids</code>
        </a> - The list of the AWS cache cluster node ids where each one represents a Memcached node.
      </p>
    </li>
    <li>
      <p>
        <a name="cache_port" href="#cache_port" className="snap-top">
          <code>cache_port</code>
        </a> - The port number on which each of the cache nodes will accept connections (e.g. 11211).
      </p>
    </li>
    <li>
      <p>
        <a name="configuration_endpoint" href="#configuration_endpoint" className="snap-top">
          <code>configuration_endpoint</code>
        </a> - The configuration endpoint to allow host discovery.
      </p>
    </li>
    </ul>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"ecade19e936f650a733815a8586a59aa"}
##DOCS-SOURCER-END -->
