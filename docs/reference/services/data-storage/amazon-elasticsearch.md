import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon Elasticsearch

Deploy and manage Amazon Elasticsearch Service

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/data-stores/elasticsearch" class="link-button">View on GitHub</a>

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
        <td>advanced_options</td>
        <td>Key-value string pairs to specify advanced configuration options. Note that the values for these configuration options must be strings (wrapped in quotes).</td>
    </tr><tr>
        <td>advanced_security_options</td>
        <td>Enable fine grain access control</td>
    </tr><tr>
        <td>alarm_sns_topic_arns</td>
        <td>ARNs of the SNS topics associated with the CloudWatch alarms for the Elasticsearch cluster.</td>
    </tr><tr>
        <td>allow_connections_from_cidr_blocks</td>
        <td>The list of network CIDR blocks to allow network access to Aurora from. One of var.allow_connections_from_cidr_blocks or var.allow_connections_from_security_groups must be specified for the database to be reachable.</td>
    </tr><tr>
        <td>allow_connections_from_security_groups</td>
        <td>The list of IDs or Security Groups to allow network access to Aurora from. All security groups must either be in the VPC specified by var.vpc_id, or a peered VPC with the VPC specified by var.vpc_id. One of var.allow_connections_from_cidr_blocks or var.allow_connections_from_security_groups must be specified for the database to be reachable.</td>
    </tr><tr>
        <td>automated_snapshot_start_hour</td>
        <td>Hour during which the service takes an automated daily snapshot of the indices in the domain. This setting has no effect on Elasticsearch 5.3 and later.</td>
    </tr><tr>
        <td>availability_zone_count</td>
        <td>Number of Availability Zones for the domain to use with var.zone_awareness_enabled. Defaults to 2. Valid values: 2 or 3.</td>
    </tr><tr>
        <td>create_service_linked_role</td>
        <td>Whether or not the Service Linked Role for Elasticsearch should be created within this module. Normally the service linked role is created automatically by AWS when creating the Elasticsearch domain in the web console, but API does not implement this logic. You can either have AWS automatically manage this by creating a domain manually in the console, or manage it in terraform using the landing zone modules or this variable.</td>
    </tr><tr>
        <td>custom_endpoint</td>
        <td>Fully qualified domain for your custom endpoint.</td>
    </tr><tr>
        <td>custom_endpoint_certificate_arn</td>
        <td>ACM certificate ARN for your custom endpoint.</td>
    </tr><tr>
        <td>custom_endpoint_enabled</td>
        <td>Whether to enable custom endpoint for the Elasticsearch domain.</td>
    </tr><tr>
        <td>custom_tags</td>
        <td>A map of custom tags to apply to the ElasticSearch Domain. The key is the tag name and the value is the tag value.</td>
    </tr><tr>
        <td>dedicated_master_count</td>
        <td>The number of dedicated master nodes to run. We recommend setting this to 3 for production deployments. Only used if var.dedicated_master_enabled is true.</td>
    </tr><tr>
        <td>dedicated_master_enabled</td>
        <td>Whether to deploy separate nodes specifically for performing cluster management tasks (e.g. tracking number of nodes, monitoring health, replicating changes). This increases the stability of large clusters and is required for clusters with more than 10 nodes.</td>
    </tr><tr>
        <td>dedicated_master_type</td>
        <td>The instance type for the dedicated master nodes. These nodes can use a different instance type than the rest of the cluster. Only used if var.dedicated_master_enabled is true.</td>
    </tr><tr>
        <td>domain_name</td>
        <td>The name of the Elasticsearch cluster. It must be unique to your account and region, start with a lowercase letter, contain between 3 and 28 characters, and contain only lowercase letters a-z, the numbers 0-9, and the hyphen (-).</td>
    </tr><tr>
        <td>ebs_enabled</td>
        <td>Set to false to disable EBS volumes. This is useful for nodes that have optimized instance storage, like hosts running the i3 instance type.</td>
    </tr><tr>
        <td>elasticsearch_version</td>
        <td>The version of Elasticsearch to deploy.</td>
    </tr><tr>
        <td>enable_cloudwatch_alarms</td>
        <td>Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using var.alarms_sns_topic_arns.</td>
    </tr><tr>
        <td>enable_encryption_at_rest</td>
        <td>False by default because encryption at rest is not included in the free tier. When true, the Elasticsearch domain storage will be encrypted at rest using the KMS key described with var.encryption_kms_key_id. We strongly recommend configuring a custom KMS key instead of using the shared service key for a better security posture when configuring encryption at rest.</td>
    </tr><tr>
        <td>enable_node_to_node_encryption</td>
        <td>Whether to enable node-to-node encryption. </td>
    </tr><tr>
        <td>encryption_kms_key_id</td>
        <td>The ID of the KMS key to use to encrypt the Elasticsearch domain storage. Only used if enable_encryption_at_rest. When null, uses the aws/es service KMS key.</td>
    </tr><tr>
        <td>iam_principal_arns</td>
        <td>The ARNS of the IAM users and roles to which to allow full access to the Elasticsearch cluster. Setting this to a restricted list is useful when using a public access cluster.</td>
    </tr><tr>
        <td>instance_count</td>
        <td>The number of instances to deploy in the Elasticsearch cluster. This must be an even number if zone_awareness_enabled is true.</td>
    </tr><tr>
        <td>instance_type</td>
        <td>The instance type to use for Elasticsearch data nodes (e.g., t2.small.elasticsearch, or m4.large.elasticsearch). For supported instance types see https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/aes-supported-instance-types.html.</td>
    </tr><tr>
        <td>internal_user_database_enabled</td>
        <td>Whether the internal user database is enabled. Enable this to use master accounts. Only used if advanced_security_options is set to true.</td>
    </tr><tr>
        <td>iops</td>
        <td>The baseline input/output (I/O) performance of EBS volumes attached to data nodes. Must be between 1000 and 4000. Applicable only if var.volume_type is io1.</td>
    </tr><tr>
        <td>is_public</td>
        <td>Whether the cluster is publicly accessible.</td>
    </tr><tr>
        <td>master_user_arn</td>
        <td>ARN of the master user. Only used if advanced_security_options and internal_user_database_enabled are set to true.</td>
    </tr><tr>
        <td>master_user_name</td>
        <td>Master account user name. Only used if advanced_security_options and internal_user_database_enabled are set to true.</td>
    </tr><tr>
        <td>master_user_password</td>
        <td>Master account user password. Only used if advanced_security_options and internal_user_database_enabled are set to true. WARNING: this password will be stored in Terraform state.</td>
    </tr><tr>
        <td>subnet_ids</td>
        <td> List of VPC Subnet IDs for the Elasticsearch domain endpoints to be created in. If var.zone_awareness_enabled is true, the first 2 or 3 provided subnet ids are used, depending on var.availability_zone_count. Otherwise only the first one is used.</td>
    </tr><tr>
        <td>tls_security_policy</td>
        <td>The name of the TLS security policy that needs to be applied to the HTTPS endpoint. Valid values are Policy-Min-TLS-1-0-2019-07 and Policy-Min-TLS-1-2-2019-07. Terraform performs drift detection if this is configured.</td>
    </tr><tr>
        <td>update_timeout</td>
        <td>How long to wait for updates to the ES cluster before timing out and reporting an error.</td>
    </tr><tr>
        <td>volume_size</td>
        <td>The size in GiB of the EBS volume for each node in the cluster (e.g. 10, or 512). For volume size limits see https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/aes-limits.html.</td>
    </tr><tr>
        <td>volume_type</td>
        <td>The type of EBS volumes to use in the cluster. Must be one of: standard, gp2, io1, sc1, or st1. For a comparison of EBS volume types, see https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/ebs-volume-types.html.</td>
    </tr><tr>
        <td>vpc_id</td>
        <td>The id of the VPC to deploy into. It must be in the same region as the Elasticsearch domain and its tenancy must be set to Default. If zone_awareness_enabled is false, the Elasticsearch cluster will have an endpoint in one subnet of the VPC; otherwise it will have endpoints in two subnets.</td>
    </tr><tr>
        <td>zone_awareness_enabled</td>
        <td>Whether to deploy the Elasticsearch nodes across two Availability Zones instead of one. Note that if you enable this, the instance_count MUST be an even number.</td>
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
        <td>cluster_arn</td>
        <td>The ARN of the Elasticsearch cluster created by this module.</td>
    </tr><tr>
        <td>cluster_domain_id</td>
        <td>The domain ID of the Elasticsearch cluster created by this module.</td>
    </tr><tr>
        <td>cluster_domain_name</td>
        <td>The name of the Elasticsearch domain.</td>
    </tr><tr>
        <td>cluster_endpoint</td>
        <td>The endpoint of the Elasticsearch cluster created by this module.</td>
    </tr><tr>
        <td>cluster_security_group_id</td>
        <td>If the domain was created inside a VPC, the ID of the security group created by this module for securing the Elasticsearch cluster.</td>
    </tr><tr>
        <td>kibana_endpoint</td>
        <td>Domain-specific endpoint for Kibana without https scheme.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"caf7c6b0bd823d6c6d7cf3ac9087cf7b"}
##DOCS-SOURCER-END -->
