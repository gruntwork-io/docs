import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon Aurora

Deploy and manage Amazon Aurora using Amazon's Relational Database Service (RDS)

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/data-stores/aurora" class="link-button">View on GitHub</a>

### Reference 
              
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
        <td>The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications. Also used for the alarms if the share snapshot backup job fails.</td>
    </tr><tr>
        <td>allow_connections_from_cidr_blocks</td>
        <td>The list of network CIDR blocks to allow network access to Aurora from. One of var.allow_connections_from_cidr_blocks or var.allow_connections_from_security_groups must be specified for the database to be reachable.</td>
    </tr><tr>
        <td>allow_connections_from_security_groups</td>
        <td>The list of IDs or Security Groups to allow network access to Aurora from. All security groups must either be in the VPC specified by var.vpc_id, or a peered VPC with the VPC specified by var.vpc_id. One of var.allow_connections_from_cidr_blocks or var.allow_connections_from_security_groups must be specified for the database to be reachable.</td>
    </tr><tr>
        <td>allow_major_version_upgrade</td>
        <td>Enable to allow major engine version upgrades when changing engine versions.</td>
    </tr><tr>
        <td>apply_immediately</td>
        <td>Specifies whether any cluster modifications are applied immediately, or during the next maintenance window. Note that cluster modifications may cause degraded performance or downtime.</td>
    </tr><tr>
        <td>aurora_subnet_ids</td>
        <td>The list of IDs of the subnets in which to deploy Aurora. The list must only contain subnets in var.vpc_id.</td>
    </tr><tr>
        <td>backup_job_alarm_period</td>
        <td>How often, in seconds, the backup job is expected to run. This is the same as var.schedule_expression, but unfortunately, Terraform offers no way to convert rate expressions to seconds. We add a CloudWatch alarm that triggers if the metric in var.create_snapshot_cloudwatch_metric_namespace isn't updated within this time period, as that indicates the backup failed to run.</td>
    </tr><tr>
        <td>backup_retention_period</td>
        <td>How many days to keep backup snapshots around before cleaning them up. Max: 35</td>
    </tr><tr>
        <td>create_snapshot_cloudwatch_metric_namespace</td>
        <td>The namespace to use for the CloudWatch metric we report every time a new RDS snapshot is created. We add a CloudWatch alarm on this metric to notify us if the backup job fails to run for any reason. Defaults to the cluster name.</td>
    </tr><tr>
        <td>custom_tags</td>
        <td>A map of custom tags to apply to the RDS cluster and all associated resources created for it. The key is the tag name and the value is the tag value.</td>
    </tr><tr>
        <td>dashboard_cpu_usage_widget_parameters</td>
        <td>Parameters for the cpu usage widget to output for use in a CloudWatch dashboard.</td>
    </tr><tr>
        <td>dashboard_db_connections_widget_parameters</td>
        <td>Parameters for the database connections widget to output for use in a CloudWatch dashboard.</td>
    </tr><tr>
        <td>dashboard_disk_space_widget_parameters</td>
        <td>Parameters for the available disk space widget to output for use in a CloudWatch dashboard.</td>
    </tr><tr>
        <td>dashboard_memory_widget_parameters</td>
        <td>Parameters for the available memory widget to output for use in a CloudWatch dashboard.</td>
    </tr><tr>
        <td>dashboard_read_latency_widget_parameters</td>
        <td>Parameters for the read latency widget to output for use in a CloudWatch dashboard.</td>
    </tr><tr>
        <td>dashboard_write_latency_widget_parameters</td>
        <td>Parameters for the read latency widget to output for use in a CloudWatch dashboard.</td>
    </tr><tr>
        <td>db_cluster_custom_parameter_group</td>
        <td>Configure a custom parameter group for the RDS DB cluster. This will create a new parameter group with the given parameters. When null, the database will be launched with the default parameter group.</td>
    </tr><tr>
        <td>db_config_secrets_manager_id</td>
        <td>The friendly name or ARN of an AWS Secrets Manager secret that contains database configuration information in the format outlined by this document: https://docs.aws.amazon.com/secretsmanager/latest/userguide/best-practices.html. The engine, username, password, dbname, and port fields must be included in the JSON. Note that even with this precaution, this information will be stored in plaintext in the Terraform state file! See the following blog post for more details: https://blog.gruntwork.io/a-comprehensive-guide-to-managing-secrets-in-your-terraform-code-1d586955ace1. If you do not wish to use Secrets Manager, leave this as null, and use the master_username, master_password, db_name, engine, and port variables.</td>
    </tr><tr>
        <td>db_instance_custom_parameter_group</td>
        <td>Configure a custom parameter group for the RDS DB Instance. This will create a new parameter group with the given parameters. When null, the database will be launched with the default parameter group.</td>
    </tr><tr>
        <td>db_name</td>
        <td>The name for your database of up to 8 alpha-numeric characters. If you do not provide a name, Amazon RDS will not create a database in the DB cluster you are creating. This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id. A value here overrides the value in db_config_secrets_manager_id.</td>
    </tr><tr>
        <td>enable_cloudwatch_alarms</td>
        <td>Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using var.alarms_sns_topic_arn.</td>
    </tr><tr>
        <td>enable_cloudwatch_metrics</td>
        <td>When true, enable CloudWatch metrics for the manual snapshots created for the purpose of sharing with another account.</td>
    </tr><tr>
        <td>enable_deletion_protection</td>
        <td>Enable deletion protection on the database instance. If this is enabled, the database cannot be deleted.</td>
    </tr><tr>
        <td>enable_perf_alarms</td>
        <td>Set to true to enable alarms related to performance, such as read and write latency alarms. Set to false to disable those alarms if you aren't sure what would be reasonable perf numbers for your RDS set up or if those numbers are too unpredictable.</td>
    </tr><tr>
        <td>enable_share_snapshot_cloudwatch_alarms</td>
        <td>When true, enable CloudWatch alarms for the manual snapshots created for the purpose of sharing with another account. Only used if var.share_snapshot_with_another_account is true.</td>
    </tr><tr>
        <td>enabled_cloudwatch_logs_exports</td>
        <td>If non-empty, the Aurora cluster will export the specified logs to Cloudwatch. Must be zero or more of: audit, error, general and slowquery</td>
    </tr><tr>
        <td>engine</td>
        <td>The name of the database engine to be used for this DB cluster. Valid Values: aurora (for MySQL 5.6-compatible Aurora), aurora-mysql (for MySQL 5.7-compatible Aurora), and aurora-postgresql. This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id. A value here overrides the value in db_config_secrets_manager_id.</td>
    </tr><tr>
        <td>engine_mode</td>
        <td>The version of aurora to run - provisioned or serverless.</td>
    </tr><tr>
        <td>engine_version</td>
        <td>The Amazon Aurora DB engine version for the selected engine and engine_mode. Note: Starting with Aurora MySQL 2.03.2, Aurora engine versions have the following syntax &lt;mysql-major-version>.mysql_aurora.&lt;aurora-mysql-version>. e.g. 5.7.mysql_aurora.2.08.1.</td>
    </tr><tr>
        <td>high_cpu_utilization_period</td>
        <td>The period, in seconds, over which to measure the CPU utilization percentage.</td>
    </tr><tr>
        <td>high_cpu_utilization_threshold</td>
        <td>Trigger an alarm if the DB instance has a CPU utilization percentage above this threshold.</td>
    </tr><tr>
        <td>high_read_latency_period</td>
        <td>The period, in seconds, over which to measure the read latency.</td>
    </tr><tr>
        <td>high_read_latency_threshold</td>
        <td>Trigger an alarm if the DB instance read latency (average amount of time taken per disk I/O operation), in seconds, is above this threshold.</td>
    </tr><tr>
        <td>high_write_latency_period</td>
        <td>The period, in seconds, over which to measure the write latency.</td>
    </tr><tr>
        <td>high_write_latency_threshold</td>
        <td>Trigger an alarm if the DB instance write latency (average amount of time taken per disk I/O operation), in seconds, is above this threshold.</td>
    </tr><tr>
        <td>iam_database_authentication_enabled</td>
        <td>Specifies whether mappings of AWS Identity and Access Management (IAM) accounts to database accounts is enabled. Disabled by default.</td>
    </tr><tr>
        <td>instance_count</td>
        <td>The number of DB instances, including the primary, to run in the RDS cluster. Only used when var.engine_mode is set to provisioned.</td>
    </tr><tr>
        <td>instance_type</td>
        <td>The instance type to use for the db (e.g. db.r3.large). Only used when var.engine_mode is set to provisioned.</td>
    </tr><tr>
        <td>kms_key_arn</td>
        <td>The ARN of a KMS key that should be used to encrypt data on disk. Only used if var.storage_encrypted is true. If you leave this null, the default RDS KMS key for the account will be used.</td>
    </tr><tr>
        <td>low_disk_space_available_period</td>
        <td>The period, in seconds, over which to measure the available free disk space.</td>
    </tr><tr>
        <td>low_disk_space_available_threshold</td>
        <td>Trigger an alarm if the amount of disk space, in Bytes, on the DB instance drops below this threshold.</td>
    </tr><tr>
        <td>low_memory_available_period</td>
        <td>The period, in seconds, over which to measure the available free memory.</td>
    </tr><tr>
        <td>low_memory_available_threshold</td>
        <td>Trigger an alarm if the amount of free memory, in Bytes, on the DB instance drops below this threshold.</td>
    </tr><tr>
        <td>master_password</td>
        <td>The value to use for the master password of the database. This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id. A value here overrides the value in db_config_secrets_manager_id.</td>
    </tr><tr>
        <td>master_username</td>
        <td>The value to use for the master username of the database. This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id. A value here overrides the value in db_config_secrets_manager_id.</td>
    </tr><tr>
        <td>name</td>
        <td>The name used to namespace all the Aurora resources created by these templates, including the cluster and cluster instances (e.g. drupaldb). Must be unique in this region. Must be a lowercase string.</td>
    </tr><tr>
        <td>port</td>
        <td>The port the DB will listen on (e.g. 3306). This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id. A value here overrides the value in db_config_secrets_manager_id.</td>
    </tr><tr>
        <td>publicly_accessible</td>
        <td>If you wish to make your database accessible from the public Internet, set this flag to true (WARNING: NOT RECOMMENDED FOR REGULAR USAGE!!). The default is false, which means the database is only accessible from within the VPC, which is much more secure. This flag MUST be false for serverless mode.</td>
    </tr><tr>
        <td>scaling_configuration_auto_pause</td>
        <td>Whether to enable automatic pause. A DB cluster can be paused only when it's idle (it has no connections). If a DB cluster is paused for more than seven days, the DB cluster might be backed up with a snapshot. In this case, the DB cluster is restored when there is a request to connect to it. Only used when var.engine_mode is set to serverless.</td>
    </tr><tr>
        <td>scaling_configuration_max_capacity</td>
        <td>The maximum capacity. The maximum capacity must be greater than or equal to the minimum capacity. Valid capacity values are 2, 4, 8, 16, 32, 64, 128, and 256. Only used when var.engine_mode is set to serverless.</td>
    </tr><tr>
        <td>scaling_configuration_min_capacity</td>
        <td>The minimum capacity. The minimum capacity must be lesser than or equal to the maximum capacity. Valid capacity values are 2, 4, 8, 16, 32, 64, 128, and 256. Only used when var.engine_mode is set to serverless.</td>
    </tr><tr>
        <td>scaling_configuration_seconds_until_auto_pause</td>
        <td>The time, in seconds, before an Aurora DB cluster in serverless mode is paused. Valid values are 300 through 86400. Only used when var.engine_mode is set to serverless.</td>
    </tr><tr>
        <td>share_snapshot_max_snapshots</td>
        <td>The maximum number of snapshots to keep around for the purpose of cross account sharing. Once this number is exceeded, a lambda function will delete the oldest snapshots. Only used if var.share_snapshot_with_another_account is true.</td>
    </tr><tr>
        <td>share_snapshot_schedule_expression</td>
        <td>An expression that defines how often to run the lambda function to take snapshots for the purpose of cross account sharing. For example, cron(0 20 * * ? *) or rate(5 minutes). Required if var.share_snapshot_with_another_account is true</td>
    </tr><tr>
        <td>share_snapshot_with_account_id</td>
        <td>The ID of the AWS Account that the snapshot should be shared with. Required if var.share_snapshot_with_another_account is true.</td>
    </tr><tr>
        <td>share_snapshot_with_another_account</td>
        <td>If set to true, take periodic snapshots of the Aurora DB that should be shared with another account.</td>
    </tr><tr>
        <td>skip_final_snapshot</td>
        <td>Determines whether a final DB snapshot is created before the DB instance is deleted. Be very careful setting this to true; if you do, and you delete this DB instance, you will not have any backups of the data! You almost never want to set this to true, unless you are doing automated or manual testing.</td>
    </tr><tr>
        <td>snapshot_identifier</td>
        <td>If non-null, the RDS Instance will be restored from the given Snapshot ID. This is the Snapshot ID you'd find in the RDS console, e.g: rds:production-2015-06-26-06-05.</td>
    </tr><tr>
        <td>storage_encrypted</td>
        <td>Specifies whether the DB cluster uses encryption for data at rest in the underlying storage for the DB, its automated backups, Read Replicas, and snapshots. Uses the default aws/rds key in KMS.</td>
    </tr><tr>
        <td>too_many_db_connections_threshold</td>
        <td>Trigger an alarm if the number of connections to the DB instance goes above this threshold.</td>
    </tr><tr>
        <td>vpc_id</td>
        <td>The ID of the VPC in which to deploy Aurora.</td>
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
        <td>all_metric_widgets</td>
        <td>A list of all the CloudWatch Dashboard metric widgets available in this module.</td>
    </tr><tr>
        <td>cleanup_snapshots_lambda_arn</td>
        <td>The ARN of the AWS Lambda Function used for cleaning up manual snapshots taken for sharing with secondary accounts.</td>
    </tr><tr>
        <td>cluster_arn</td>
        <td>The ARN of the RDS Aurora cluster.</td>
    </tr><tr>
        <td>cluster_id</td>
        <td>The ID of the RDS Aurora cluster (e.g TODO).</td>
    </tr><tr>
        <td>cluster_resource_id</td>
        <td>The unique resource ID assigned to the cluster e.g. cluster-POBCBQUFQC56EBAAWXGFJ77GRU. This is useful for allowing database authentication via IAM.</td>
    </tr><tr>
        <td>create_snapshot_lambda_arn</td>
        <td>The ARN of the AWS Lambda Function used for periodically taking snapshots to share with secondary accounts.</td>
    </tr><tr>
        <td>instance_endpoints</td>
        <td>A list of endpoints of the RDS instances that you can use to make requests to.</td>
    </tr><tr>
        <td>metric_widget_aurora_cpu_usage</td>
        <td>A CloudWatch Dashboard widget that graphs CPU usage (percentage) of the Aurora cluster.</td>
    </tr><tr>
        <td>metric_widget_aurora_db_connections</td>
        <td>A CloudWatch Dashboard widget that graphs the number of active database connections of the Aurora cluster.</td>
    </tr><tr>
        <td>metric_widget_aurora_disk_space</td>
        <td>A CloudWatch Dashboard widget that graphs available disk space (in bytes) on the Aurora cluster.</td>
    </tr><tr>
        <td>metric_widget_aurora_memory</td>
        <td>A CloudWatch Dashboard widget that graphs available memory (in bytes) on the Aurora cluster.</td>
    </tr><tr>
        <td>metric_widget_aurora_read_latency</td>
        <td>A CloudWatch Dashboard widget that graphs the average amount of time taken per disk I/O operation on reads.</td>
    </tr><tr>
        <td>metric_widget_aurora_write_latency</td>
        <td>A CloudWatch Dashboard widget that graphs the average amount of time taken per disk I/O operation on writes.</td>
    </tr><tr>
        <td>port</td>
        <td>The port used by the RDS Aurora cluster for handling database connections.</td>
    </tr><tr>
        <td>primary_endpoint</td>
        <td>The primary endpoint of the RDS Aurora cluster that you can use to make requests to.</td>
    </tr><tr>
        <td>primary_host</td>
        <td>The host portion of the Aurora endpoint. primary_endpoint is in the form '&lt;host>:&lt;port>', and this output returns just the host part.</td>
    </tr><tr>
        <td>share_snapshot_lambda_arn</td>
        <td>The ARN of the AWS Lambda Function used for sharing manual snapshots with secondary accounts.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"3144d5b86f00ac36d1e43463c2a162d1"}
##DOCS-SOURCER-END -->
