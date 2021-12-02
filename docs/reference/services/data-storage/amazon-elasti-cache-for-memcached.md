import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon ElastiCache for Memcached

Deploy and manage Amazon ElastiCache for Memcached

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/data-stores/memcached" class="link-button">View on GitHub</a>

<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <table>
        <thead>
            <tr>
                <td>Variable name</td>
                <td>Description</td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td>alarms_sns_topic_arns</td>
        <td>The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications.</td>
    </tr><tr>
        <td>allow_connections_from_cidr_blocks</td>
        <td>The list of network CIDR blocks to allow network access to ElastiCache from. One of var.allow_connections_from_cidr_blocks or var.allow_connections_from_security_groups must be specified for the ElastiCache instances to be reachable.</td>
    </tr><tr>
        <td>allow_connections_from_security_groups</td>
        <td>The list of IDs or Security Groups to allow network access to ElastiCache from. All security groups must either be in the VPC specified by var.vpc_id, or a peered VPC with the VPC specified by var.vpc_id. One of var.allow_connections_from_cidr_blocks or var.allow_connections_from_security_groups must be specified for the ElastiCache instances to be reachable.</td>
    </tr><tr>
        <td>apply_immediately</td>
        <td>Specifies whether any database modifications are applied immediately, or during the next maintenance window.</td>
    </tr><tr>
        <td>az_mode</td>
        <td>Specifies whether the nodes in this Memcached node group are created in a single Availability Zone or created across multiple Availability Zones in the cluster's region. Valid values for this parameter are single-az or cross-az. If you want to choose cross-az, num_cache_nodes must be greater than 1.</td>
    </tr><tr>
        <td>enable_cloudwatch_alarms</td>
        <td>Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using var.alarms_sns_topic_arn.</td>
    </tr><tr>
        <td>instance_type</td>
        <td>The compute and memory capacity of the nodes (e.g. cache.m4.large).</td>
    </tr><tr>
        <td>maintenance_window</td>
        <td>Specifies the weekly time range for when maintenance on the cache cluster is performed (e.g. sun:05:00-sun:09:00). The format is ddd:hh24:mi-ddd:hh24:mi (24H Clock UTC). The minimum maintenance window is a 60 minute period.</td>
    </tr><tr>
        <td>memcached_version</td>
        <td>Version number of memcached to use (e.g. 1.5.16).</td>
    </tr><tr>
        <td>name</td>
        <td>The name used to namespace all resources created by these templates, including the ElastiCache cluster itself. Must be unique in this region. Must be a lowercase string.</td>
    </tr><tr>
        <td>num_cache_nodes</td>
        <td>The initial number of cache nodes that the cache cluster will have. Must be between 1 and 20.</td>
    </tr><tr>
        <td>port</td>
        <td>The port number on which each of the cache nodes will accept connections (e.g. 11211).</td>
    </tr><tr>
        <td>subnet_ids</td>
        <td>The list of IDs of the subnets in which to deploy the ElasticCache instances. The list must only contain subnets in var.vpc_id.</td>
    </tr><tr>
        <td>vpc_id</td>
        <td>The ID of the VPC in which to deploy RDS.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <table>
        <thead>
            <tr>
                <td>Variable name</td>
                <td>Description</td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td>cache_addresses</td>
        <td>The list of addresses of the Memcached nodes without the port appended.</td>
    </tr><tr>
        <td>cache_cluster_id</td>
        <td>The id of the ElastiCache Memcached cluster.</td>
    </tr><tr>
        <td>cache_node_ids</td>
        <td>The list of the AWS cache cluster node ids where each one represents a Memcached node.</td>
    </tr><tr>
        <td>cache_port</td>
        <td>The port number on which each of the cache nodes will accept connections (e.g. 11211).</td>
    </tr><tr>
        <td>configuration_endpoint</td>
        <td>The configuration endpoint to allow host discovery.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"f3192aa6e205c02885e46e3bdf389efe"}
##DOCS-SOURCER-END -->
