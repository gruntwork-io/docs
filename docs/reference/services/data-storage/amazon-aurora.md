import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon Aurora

Deploy and manage Amazon Aurora using Amazon's Relational Database Service (RDS)

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/data-stores/aurora" className="link-button">View on GitHub</a>

### Reference

<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <ul>
      
    <li>
      <p>
        <a name="alarms_sns_topic_arns" href="#alarms_sns_topic_arns" className="snap-top">
          <code>alarms_sns_topic_arns</code>
        </a> - The ARNs of SNS topics where CloudWatch alarms (e.g., for CPU, memory, and disk space usage) should send notifications. Also used for the alarms if the share snapshot backup job fails.
      </p>
    </li>
    <li>
      <p>
        <a name="allow_connections_from_cidr_blocks" href="#allow_connections_from_cidr_blocks" className="snap-top">
          <code>allow_connections_from_cidr_blocks</code>
        </a> - The list of network CIDR blocks to allow network access to Aurora from. One of var.allow_connections_from_cidr_blocks or var.allow_connections_from_security_groups must be specified for the database to be reachable.
      </p>
    </li>
    <li>
      <p>
        <a name="allow_connections_from_security_groups" href="#allow_connections_from_security_groups" className="snap-top">
          <code>allow_connections_from_security_groups</code>
        </a> - The list of IDs or Security Groups to allow network access to Aurora from. All security groups must either be in the VPC specified by var.vpc_id, or a peered VPC with the VPC specified by var.vpc_id. One of var.allow_connections_from_cidr_blocks or var.allow_connections_from_security_groups must be specified for the database to be reachable.
      </p>
    </li>
    <li>
      <p>
        <a name="allow_major_version_upgrade" href="#allow_major_version_upgrade" className="snap-top">
          <code>allow_major_version_upgrade</code>
        </a> - Enable to allow major engine version upgrades when changing engine versions.
      </p>
    </li>
    <li>
      <p>
        <a name="apply_immediately" href="#apply_immediately" className="snap-top">
          <code>apply_immediately</code>
        </a> - Specifies whether any cluster modifications are applied immediately, or during the next maintenance window. Note that cluster modifications may cause degraded performance or downtime.
      </p>
    </li>
    <li>
      <p>
        <a name="aurora_subnet_ids" href="#aurora_subnet_ids" className="snap-top">
          <code>aurora_subnet_ids</code>
        </a> - The list of IDs of the subnets in which to deploy Aurora. The list must only contain subnets in var.vpc_id.
      </p>
    </li>
    <li>
      <p>
        <a name="backup_job_alarm_period" href="#backup_job_alarm_period" className="snap-top">
          <code>backup_job_alarm_period</code>
        </a> - How often, in seconds, the backup job is expected to run. This is the same as var.schedule_expression, but unfortunately, Terraform offers no way to convert rate expressions to seconds. We add a CloudWatch alarm that triggers if the metric in var.create_snapshot_cloudwatch_metric_namespace isn't updated within this time period, as that indicates the backup failed to run.
      </p>
    </li>
    <li>
      <p>
        <a name="backup_retention_period" href="#backup_retention_period" className="snap-top">
          <code>backup_retention_period</code>
        </a> - How many days to keep backup snapshots around before cleaning them up. Max: 35
      </p>
    </li>
    <li>
      <p>
        <a name="create_snapshot_cloudwatch_metric_namespace" href="#create_snapshot_cloudwatch_metric_namespace" className="snap-top">
          <code>create_snapshot_cloudwatch_metric_namespace</code>
        </a> - The namespace to use for the CloudWatch metric we report every time a new RDS snapshot is created. We add a CloudWatch alarm on this metric to notify us if the backup job fails to run for any reason. Defaults to the cluster name.
      </p>
    </li>
    <li>
      <p>
        <a name="custom_tags" href="#custom_tags" className="snap-top">
          <code>custom_tags</code>
        </a> - A map of custom tags to apply to the RDS cluster and all associated resources created for it. The key is the tag name and the value is the tag value.
      </p>
    </li>
    <li>
      <p>
        <a name="dashboard_cpu_usage_widget_parameters" href="#dashboard_cpu_usage_widget_parameters" className="snap-top">
          <code>dashboard_cpu_usage_widget_parameters</code>
        </a> - Parameters for the cpu usage widget to output for use in a CloudWatch dashboard.
      </p>
    </li>
    <li>
      <p>
        <a name="dashboard_db_connections_widget_parameters" href="#dashboard_db_connections_widget_parameters" className="snap-top">
          <code>dashboard_db_connections_widget_parameters</code>
        </a> - Parameters for the database connections widget to output for use in a CloudWatch dashboard.
      </p>
    </li>
    <li>
      <p>
        <a name="dashboard_disk_space_widget_parameters" href="#dashboard_disk_space_widget_parameters" className="snap-top">
          <code>dashboard_disk_space_widget_parameters</code>
        </a> - Parameters for the available disk space widget to output for use in a CloudWatch dashboard.
      </p>
    </li>
    <li>
      <p>
        <a name="dashboard_memory_widget_parameters" href="#dashboard_memory_widget_parameters" className="snap-top">
          <code>dashboard_memory_widget_parameters</code>
        </a> - Parameters for the available memory widget to output for use in a CloudWatch dashboard.
      </p>
    </li>
    <li>
      <p>
        <a name="dashboard_read_latency_widget_parameters" href="#dashboard_read_latency_widget_parameters" className="snap-top">
          <code>dashboard_read_latency_widget_parameters</code>
        </a> - Parameters for the read latency widget to output for use in a CloudWatch dashboard.
      </p>
    </li>
    <li>
      <p>
        <a name="dashboard_write_latency_widget_parameters" href="#dashboard_write_latency_widget_parameters" className="snap-top">
          <code>dashboard_write_latency_widget_parameters</code>
        </a> - Parameters for the read latency widget to output for use in a CloudWatch dashboard.
      </p>
    </li>
    <li>
      <p>
        <a name="db_cluster_custom_parameter_group" href="#db_cluster_custom_parameter_group" className="snap-top">
          <code>db_cluster_custom_parameter_group</code>
        </a> - Configure a custom parameter group for the RDS DB cluster. This will create a new parameter group with the given parameters. When null, the database will be launched with the default parameter group.
      </p>
    </li>
    <li>
      <p>
        <a name="db_config_secrets_manager_id" href="#db_config_secrets_manager_id" className="snap-top">
          <code>db_config_secrets_manager_id</code>
        </a> - The friendly name or ARN of an AWS Secrets Manager secret that contains database configuration information in the format outlined by this document: https://docs.aws.amazon.com/secretsmanager/latest/userguide/best-practices.html. The engine, username, password, dbname, and port fields must be included in the JSON. Note that even with this precaution, this information will be stored in plaintext in the Terraform state file! See the following blog post for more details: https://blog.gruntwork.io/a-comprehensive-guide-to-managing-secrets-in-your-terraform-code-1d586955ace1. If you do not wish to use Secrets Manager, leave this as null, and use the master_username, master_password, db_name, engine, and port variables.
      </p>
    </li>
    <li>
      <p>
        <a name="db_instance_custom_parameter_group" href="#db_instance_custom_parameter_group" className="snap-top">
          <code>db_instance_custom_parameter_group</code>
        </a> - Configure a custom parameter group for the RDS DB Instance. This will create a new parameter group with the given parameters. When null, the database will be launched with the default parameter group.
      </p>
    </li>
    <li>
      <p>
        <a name="db_name" href="#db_name" className="snap-top">
          <code>db_name</code>
        </a> - The name for your database of up to 8 alpha-numeric characters. If you do not provide a name, Amazon RDS will not create a database in the DB cluster you are creating. This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id. A value here overrides the value in db_config_secrets_manager_id.
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
        <a name="enable_cloudwatch_metrics" href="#enable_cloudwatch_metrics" className="snap-top">
          <code>enable_cloudwatch_metrics</code>
        </a> - When true, enable CloudWatch metrics for the manual snapshots created for the purpose of sharing with another account.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_deletion_protection" href="#enable_deletion_protection" className="snap-top">
          <code>enable_deletion_protection</code>
        </a> - Enable deletion protection on the database instance. If this is enabled, the database cannot be deleted.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_perf_alarms" href="#enable_perf_alarms" className="snap-top">
          <code>enable_perf_alarms</code>
        </a> - Set to true to enable alarms related to performance, such as read and write latency alarms. Set to false to disable those alarms if you aren't sure what would be reasonable perf numbers for your RDS set up or if those numbers are too unpredictable.
      </p>
    </li>
    <li>
      <p>
        <a name="enable_share_snapshot_cloudwatch_alarms" href="#enable_share_snapshot_cloudwatch_alarms" className="snap-top">
          <code>enable_share_snapshot_cloudwatch_alarms</code>
        </a> - When true, enable CloudWatch alarms for the manual snapshots created for the purpose of sharing with another account. Only used if var.share_snapshot_with_another_account is true.
      </p>
    </li>
    <li>
      <p>
        <a name="enabled_cloudwatch_logs_exports" href="#enabled_cloudwatch_logs_exports" className="snap-top">
          <code>enabled_cloudwatch_logs_exports</code>
        </a> - If non-empty, the Aurora cluster will export the specified logs to Cloudwatch. Must be zero or more of: audit, error, general and slowquery
      </p>
    </li>
    <li>
      <p>
        <a name="engine" href="#engine" className="snap-top">
          <code>engine</code>
        </a> - The name of the database engine to be used for this DB cluster. Valid Values: aurora (for MySQL 5.6-compatible Aurora), aurora-mysql (for MySQL 5.7-compatible Aurora), and aurora-postgresql. This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id. A value here overrides the value in db_config_secrets_manager_id.
      </p>
    </li>
    <li>
      <p>
        <a name="engine_mode" href="#engine_mode" className="snap-top">
          <code>engine_mode</code>
        </a> - The version of aurora to run - provisioned or serverless.
      </p>
    </li>
    <li>
      <p>
        <a name="engine_version" href="#engine_version" className="snap-top">
          <code>engine_version</code>
        </a> - The Amazon Aurora DB engine version for the selected engine and engine_mode. Note: Starting with Aurora MySQL 2.03.2, Aurora engine versions have the following syntax &lt;mysql-major-version>.mysql_aurora.&lt;aurora-mysql-version>. e.g. 5.7.mysql_aurora.2.08.1.
      </p>
    </li>
    <li>
      <p>
        <a name="high_cpu_utilization_period" href="#high_cpu_utilization_period" className="snap-top">
          <code>high_cpu_utilization_period</code>
        </a> - The period, in seconds, over which to measure the CPU utilization percentage.
      </p>
    </li>
    <li>
      <p>
        <a name="high_cpu_utilization_threshold" href="#high_cpu_utilization_threshold" className="snap-top">
          <code>high_cpu_utilization_threshold</code>
        </a> - Trigger an alarm if the DB instance has a CPU utilization percentage above this threshold.
      </p>
    </li>
    <li>
      <p>
        <a name="high_read_latency_period" href="#high_read_latency_period" className="snap-top">
          <code>high_read_latency_period</code>
        </a> - The period, in seconds, over which to measure the read latency.
      </p>
    </li>
    <li>
      <p>
        <a name="high_read_latency_threshold" href="#high_read_latency_threshold" className="snap-top">
          <code>high_read_latency_threshold</code>
        </a> - Trigger an alarm if the DB instance read latency (average amount of time taken per disk I/O operation), in seconds, is above this threshold.
      </p>
    </li>
    <li>
      <p>
        <a name="high_write_latency_period" href="#high_write_latency_period" className="snap-top">
          <code>high_write_latency_period</code>
        </a> - The period, in seconds, over which to measure the write latency.
      </p>
    </li>
    <li>
      <p>
        <a name="high_write_latency_threshold" href="#high_write_latency_threshold" className="snap-top">
          <code>high_write_latency_threshold</code>
        </a> - Trigger an alarm if the DB instance write latency (average amount of time taken per disk I/O operation), in seconds, is above this threshold.
      </p>
    </li>
    <li>
      <p>
        <a name="iam_database_authentication_enabled" href="#iam_database_authentication_enabled" className="snap-top">
          <code>iam_database_authentication_enabled</code>
        </a> - Specifies whether mappings of AWS Identity and Access Management (IAM) accounts to database accounts is enabled. Disabled by default.
      </p>
    </li>
    <li>
      <p>
        <a name="instance_count" href="#instance_count" className="snap-top">
          <code>instance_count</code>
        </a> - The number of DB instances, including the primary, to run in the RDS cluster. Only used when var.engine_mode is set to provisioned.
      </p>
    </li>
    <li>
      <p>
        <a name="instance_type" href="#instance_type" className="snap-top">
          <code>instance_type</code>
        </a> - The instance type to use for the db (e.g. db.r3.large). Only used when var.engine_mode is set to provisioned.
      </p>
    </li>
    <li>
      <p>
        <a name="kms_key_arn" href="#kms_key_arn" className="snap-top">
          <code>kms_key_arn</code>
        </a> - The ARN of a KMS key that should be used to encrypt data on disk. Only used if var.storage_encrypted is true. If you leave this null, the default RDS KMS key for the account will be used.
      </p>
    </li>
    <li>
      <p>
        <a name="low_disk_space_available_period" href="#low_disk_space_available_period" className="snap-top">
          <code>low_disk_space_available_period</code>
        </a> - The period, in seconds, over which to measure the available free disk space.
      </p>
    </li>
    <li>
      <p>
        <a name="low_disk_space_available_threshold" href="#low_disk_space_available_threshold" className="snap-top">
          <code>low_disk_space_available_threshold</code>
        </a> - Trigger an alarm if the amount of disk space, in Bytes, on the DB instance drops below this threshold.
      </p>
    </li>
    <li>
      <p>
        <a name="low_memory_available_period" href="#low_memory_available_period" className="snap-top">
          <code>low_memory_available_period</code>
        </a> - The period, in seconds, over which to measure the available free memory.
      </p>
    </li>
    <li>
      <p>
        <a name="low_memory_available_threshold" href="#low_memory_available_threshold" className="snap-top">
          <code>low_memory_available_threshold</code>
        </a> - Trigger an alarm if the amount of free memory, in Bytes, on the DB instance drops below this threshold.
      </p>
    </li>
    <li>
      <p>
        <a name="master_password" href="#master_password" className="snap-top">
          <code>master_password</code>
        </a> - The value to use for the master password of the database. This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id. A value here overrides the value in db_config_secrets_manager_id.
      </p>
    </li>
    <li>
      <p>
        <a name="master_username" href="#master_username" className="snap-top">
          <code>master_username</code>
        </a> - The value to use for the master username of the database. This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id. A value here overrides the value in db_config_secrets_manager_id.
      </p>
    </li>
    <li>
      <p>
        <a name="name" href="#name" className="snap-top">
          <code>name</code>
        </a> - The name used to namespace all the Aurora resources created by these templates, including the cluster and cluster instances (e.g. drupaldb). Must be unique in this region. Must be a lowercase string.
      </p>
    </li>
    <li>
      <p>
        <a name="port" href="#port" className="snap-top">
          <code>port</code>
        </a> - The port the DB will listen on (e.g. 3306). This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id. A value here overrides the value in db_config_secrets_manager_id.
      </p>
    </li>
    <li>
      <p>
        <a name="publicly_accessible" href="#publicly_accessible" className="snap-top">
          <code>publicly_accessible</code>
        </a> - If you wish to make your database accessible from the public Internet, set this flag to true (WARNING: NOT RECOMMENDED FOR REGULAR USAGE!!). The default is false, which means the database is only accessible from within the VPC, which is much more secure. This flag MUST be false for serverless mode.
      </p>
    </li>
    <li>
      <p>
        <a name="scaling_configuration_auto_pause" href="#scaling_configuration_auto_pause" className="snap-top">
          <code>scaling_configuration_auto_pause</code>
        </a> - Whether to enable automatic pause. A DB cluster can be paused only when it's idle (it has no connections). If a DB cluster is paused for more than seven days, the DB cluster might be backed up with a snapshot. In this case, the DB cluster is restored when there is a request to connect to it. Only used when var.engine_mode is set to serverless.
      </p>
    </li>
    <li>
      <p>
        <a name="scaling_configuration_max_capacity" href="#scaling_configuration_max_capacity" className="snap-top">
          <code>scaling_configuration_max_capacity</code>
        </a> - The maximum capacity. The maximum capacity must be greater than or equal to the minimum capacity. Valid capacity values are 2, 4, 8, 16, 32, 64, 128, and 256. Only used when var.engine_mode is set to serverless.
      </p>
    </li>
    <li>
      <p>
        <a name="scaling_configuration_min_capacity" href="#scaling_configuration_min_capacity" className="snap-top">
          <code>scaling_configuration_min_capacity</code>
        </a> - The minimum capacity. The minimum capacity must be lesser than or equal to the maximum capacity. Valid capacity values are 2, 4, 8, 16, 32, 64, 128, and 256. Only used when var.engine_mode is set to serverless.
      </p>
    </li>
    <li>
      <p>
        <a name="scaling_configuration_seconds_until_auto_pause" href="#scaling_configuration_seconds_until_auto_pause" className="snap-top">
          <code>scaling_configuration_seconds_until_auto_pause</code>
        </a> - The time, in seconds, before an Aurora DB cluster in serverless mode is paused. Valid values are 300 through 86400. Only used when var.engine_mode is set to serverless.
      </p>
    </li>
    <li>
      <p>
        <a name="share_snapshot_max_snapshots" href="#share_snapshot_max_snapshots" className="snap-top">
          <code>share_snapshot_max_snapshots</code>
        </a> - The maximum number of snapshots to keep around for the purpose of cross account sharing. Once this number is exceeded, a lambda function will delete the oldest snapshots. Only used if var.share_snapshot_with_another_account is true.
      </p>
    </li>
    <li>
      <p>
        <a name="share_snapshot_schedule_expression" href="#share_snapshot_schedule_expression" className="snap-top">
          <code>share_snapshot_schedule_expression</code>
        </a> - An expression that defines how often to run the lambda function to take snapshots for the purpose of cross account sharing. For example, cron(0 20 * * ? *) or rate(5 minutes). Required if var.share_snapshot_with_another_account is true
      </p>
    </li>
    <li>
      <p>
        <a name="share_snapshot_with_account_id" href="#share_snapshot_with_account_id" className="snap-top">
          <code>share_snapshot_with_account_id</code>
        </a> - The ID of the AWS Account that the snapshot should be shared with. Required if var.share_snapshot_with_another_account is true.
      </p>
    </li>
    <li>
      <p>
        <a name="share_snapshot_with_another_account" href="#share_snapshot_with_another_account" className="snap-top">
          <code>share_snapshot_with_another_account</code>
        </a> - If set to true, take periodic snapshots of the Aurora DB that should be shared with another account.
      </p>
    </li>
    <li>
      <p>
        <a name="skip_final_snapshot" href="#skip_final_snapshot" className="snap-top">
          <code>skip_final_snapshot</code>
        </a> - Determines whether a final DB snapshot is created before the DB instance is deleted. Be very careful setting this to true; if you do, and you delete this DB instance, you will not have any backups of the data! You almost never want to set this to true, unless you are doing automated or manual testing.
      </p>
    </li>
    <li>
      <p>
        <a name="snapshot_identifier" href="#snapshot_identifier" className="snap-top">
          <code>snapshot_identifier</code>
        </a> - If non-null, the RDS Instance will be restored from the given Snapshot ID. This is the Snapshot ID you'd find in the RDS console, e.g: rds:production-2015-06-26-06-05.
      </p>
    </li>
    <li>
      <p>
        <a name="storage_encrypted" href="#storage_encrypted" className="snap-top">
          <code>storage_encrypted</code>
        </a> - Specifies whether the DB cluster uses encryption for data at rest in the underlying storage for the DB, its automated backups, Read Replicas, and snapshots. Uses the default aws/rds key in KMS.
      </p>
    </li>
    <li>
      <p>
        <a name="too_many_db_connections_threshold" href="#too_many_db_connections_threshold" className="snap-top">
          <code>too_many_db_connections_threshold</code>
        </a> - Trigger an alarm if the number of connections to the DB instance goes above this threshold.
      </p>
    </li>
    <li>
      <p>
        <a name="vpc_id" href="#vpc_id" className="snap-top">
          <code>vpc_id</code>
        </a> - The ID of the VPC in which to deploy Aurora.
      </p>
    </li>
    </ul>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <ul>
      
    <li>
      <p>
        <a name="all_metric_widgets" href="#all_metric_widgets" className="snap-top">
          <code>all_metric_widgets</code>
        </a> - A list of all the CloudWatch Dashboard metric widgets available in this module.
      </p>
    </li>
    <li>
      <p>
        <a name="cleanup_snapshots_lambda_arn" href="#cleanup_snapshots_lambda_arn" className="snap-top">
          <code>cleanup_snapshots_lambda_arn</code>
        </a> - The ARN of the AWS Lambda Function used for cleaning up manual snapshots taken for sharing with secondary accounts.
      </p>
    </li>
    <li>
      <p>
        <a name="cluster_arn" href="#cluster_arn" className="snap-top">
          <code>cluster_arn</code>
        </a> - The ARN of the RDS Aurora cluster.
      </p>
    </li>
    <li>
      <p>
        <a name="cluster_id" href="#cluster_id" className="snap-top">
          <code>cluster_id</code>
        </a> - The ID of the RDS Aurora cluster (e.g TODO).
      </p>
    </li>
    <li>
      <p>
        <a name="cluster_resource_id" href="#cluster_resource_id" className="snap-top">
          <code>cluster_resource_id</code>
        </a> - The unique resource ID assigned to the cluster e.g. cluster-POBCBQUFQC56EBAAWXGFJ77GRU. This is useful for allowing database authentication via IAM.
      </p>
    </li>
    <li>
      <p>
        <a name="create_snapshot_lambda_arn" href="#create_snapshot_lambda_arn" className="snap-top">
          <code>create_snapshot_lambda_arn</code>
        </a> - The ARN of the AWS Lambda Function used for periodically taking snapshots to share with secondary accounts.
      </p>
    </li>
    <li>
      <p>
        <a name="instance_endpoints" href="#instance_endpoints" className="snap-top">
          <code>instance_endpoints</code>
        </a> - A list of endpoints of the RDS instances that you can use to make requests to.
      </p>
    </li>
    <li>
      <p>
        <a name="metric_widget_aurora_cpu_usage" href="#metric_widget_aurora_cpu_usage" className="snap-top">
          <code>metric_widget_aurora_cpu_usage</code>
        </a> - A CloudWatch Dashboard widget that graphs CPU usage (percentage) of the Aurora cluster.
      </p>
    </li>
    <li>
      <p>
        <a name="metric_widget_aurora_db_connections" href="#metric_widget_aurora_db_connections" className="snap-top">
          <code>metric_widget_aurora_db_connections</code>
        </a> - A CloudWatch Dashboard widget that graphs the number of active database connections of the Aurora cluster.
      </p>
    </li>
    <li>
      <p>
        <a name="metric_widget_aurora_disk_space" href="#metric_widget_aurora_disk_space" className="snap-top">
          <code>metric_widget_aurora_disk_space</code>
        </a> - A CloudWatch Dashboard widget that graphs available disk space (in bytes) on the Aurora cluster.
      </p>
    </li>
    <li>
      <p>
        <a name="metric_widget_aurora_memory" href="#metric_widget_aurora_memory" className="snap-top">
          <code>metric_widget_aurora_memory</code>
        </a> - A CloudWatch Dashboard widget that graphs available memory (in bytes) on the Aurora cluster.
      </p>
    </li>
    <li>
      <p>
        <a name="metric_widget_aurora_read_latency" href="#metric_widget_aurora_read_latency" className="snap-top">
          <code>metric_widget_aurora_read_latency</code>
        </a> - A CloudWatch Dashboard widget that graphs the average amount of time taken per disk I/O operation on reads.
      </p>
    </li>
    <li>
      <p>
        <a name="metric_widget_aurora_write_latency" href="#metric_widget_aurora_write_latency" className="snap-top">
          <code>metric_widget_aurora_write_latency</code>
        </a> - A CloudWatch Dashboard widget that graphs the average amount of time taken per disk I/O operation on writes.
      </p>
    </li>
    <li>
      <p>
        <a name="port" href="#port" className="snap-top">
          <code>port</code>
        </a> - The port used by the RDS Aurora cluster for handling database connections.
      </p>
    </li>
    <li>
      <p>
        <a name="primary_endpoint" href="#primary_endpoint" className="snap-top">
          <code>primary_endpoint</code>
        </a> - The primary endpoint of the RDS Aurora cluster that you can use to make requests to.
      </p>
    </li>
    <li>
      <p>
        <a name="primary_host" href="#primary_host" className="snap-top">
          <code>primary_host</code>
        </a> - The host portion of the Aurora endpoint. primary_endpoint is in the form '&lt;host>:&lt;port>', and this output returns just the host part.
      </p>
    </li>
    <li>
      <p>
        <a name="share_snapshot_lambda_arn" href="#share_snapshot_lambda_arn" className="snap-top">
          <code>share_snapshot_lambda_arn</code>
        </a> - The ARN of the AWS Lambda Function used for sharing manual snapshots with secondary accounts.
      </p>
    </li>
    </ul>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"fd3c07dd292757b25471ebadbd997c50"}
##DOCS-SOURCER-END -->
