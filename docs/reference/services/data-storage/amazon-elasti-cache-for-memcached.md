import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon ElastiCache for Memcached

Deploy and manage Amazon ElastiCache for Memcached

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/data-stores/memcached" className="link-button">View on GitHub</a>

### Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<a name="alarms_sns_topic_arns" className="snap-top"></a>

* [**`alarms_sns_topic_arns`**](#alarms_sns_topic_arns) &mdash; The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications.

<a name="allow_connections_from_cidr_blocks" className="snap-top"></a>

* [**`allow_connections_from_cidr_blocks`**](#allow_connections_from_cidr_blocks) &mdash; The list of network CIDR blocks to allow network access to ElastiCache from. One of [`allow_connections_from_cidr_blocks`](#allow_connections_from_cidr_blocks) or [`allow_connections_from_security_groups`](#allow_connections_from_security_groups) must be specified for the ElastiCache instances to be reachable.

<a name="allow_connections_from_security_groups" className="snap-top"></a>

* [**`allow_connections_from_security_groups`**](#allow_connections_from_security_groups) &mdash; The list of IDs or Security Groups to allow network access to ElastiCache from. All security groups must either be in the VPC specified by [`vpc_id`](#vpc_id), or a peered VPC with the VPC specified by [`vpc_id`](#vpc_id). One of [`allow_connections_from_cidr_blocks`](#allow_connections_from_cidr_blocks) or [`allow_connections_from_security_groups`](#allow_connections_from_security_groups) must be specified for the ElastiCache instances to be reachable.

<a name="apply_immediately" className="snap-top"></a>

* [**`apply_immediately`**](#apply_immediately) &mdash; Specifies whether any database modifications are applied immediately, or during the next maintenance window.

<a name="az_mode" className="snap-top"></a>

* [**`az_mode`**](#az_mode) &mdash; Specifies whether the nodes in this Memcached node group are created in a single Availability Zone or created across multiple Availability Zones in the cluster's region. Valid values for this parameter are single-az or cross-az. If you want to choose cross-az, [`num_cache_nodes`](#num_cache_nodes) must be greater than 1.

<a name="enable_cloudwatch_alarms" className="snap-top"></a>

* [**`enable_cloudwatch_alarms`**](#enable_cloudwatch_alarms) &mdash; Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using [`alarms_sns_topic_arn`](#alarms_sns_topic_arn).

<a name="instance_type" className="snap-top"></a>

* [**`instance_type`**](#instance_type) &mdash; The compute and memory capacity of the nodes (e.g. cache.m4.large).

<a name="maintenance_window" className="snap-top"></a>

* [**`maintenance_window`**](#maintenance_window) &mdash; Specifies the weekly time range for when maintenance on the cache cluster is performed (e.g. sun:05:00-sun:09:00). The format is ddd:hh24:mi-ddd:hh24:mi (24H Clock UTC). The minimum maintenance window is a 60 minute period.

<a name="memcached_version" className="snap-top"></a>

* [**`memcached_version`**](#memcached_version) &mdash; Version number of memcached to use (e.g. 1.5.16).

<a name="name" className="snap-top"></a>

* [**`name`**](#name) &mdash; The name used to namespace all resources created by these templates, including the ElastiCache cluster itself. Must be unique in this region. Must be a lowercase string.

<a name="num_cache_nodes" className="snap-top"></a>

* [**`num_cache_nodes`**](#num_cache_nodes) &mdash; The initial number of cache nodes that the cache cluster will have. Must be between 1 and 20.

<a name="port" className="snap-top"></a>

* [**`port`**](#port) &mdash; The port number on which each of the cache nodes will accept connections (e.g. 11211).

<a name="subnet_ids" className="snap-top"></a>

* [**`subnet_ids`**](#subnet_ids) &mdash; The list of IDs of the subnets in which to deploy the ElasticCache instances. The list must only contain subnets in [`vpc_id`](#vpc_id).

<a name="vpc_id" className="snap-top"></a>

* [**`vpc_id`**](#vpc_id) &mdash; The ID of the VPC in which to deploy RDS.

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
{"sourcePlugin":"Service Catalog Reference","hash":"2fb7c9e39315d159b33ad9916c0634cf"}
##DOCS-SOURCER-END -->
