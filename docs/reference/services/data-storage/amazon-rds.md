import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon RDS

Deploy and manage Amazon Relational Database Service (RDS)

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/data-stores/rds" className="link-button">View on GitHub</a>

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
        <a name="allocated_storage" href="#allocated_storage" className="snap-top">
          <code>allocated_storage</code>
        </a> - The amount of storage space the DB should use, in GB.
      </p>
    </li>
    <li>
      <p>
        <a name="allow_connections_from_cidr_blocks" href="#allow_connections_from_cidr_blocks" className="snap-top">
          <code>allow_connections_from_cidr_blocks</code>
        </a> - The list of network CIDR blocks to allow network access to RDS from. One of var.allow_connections_from_cidr_blocks or var.allow_connections_from_security_groups must be specified for the database to be reachable.
      </p>
    </li>
    <li>
      <p>
        <a name="allow_connections_from_security_groups" href="#allow_connections_from_security_groups" className="snap-top">
          <code>allow_connections_from_security_groups</code>
        </a> - The list of IDs or Security Groups to allow network access to RDS from. All security groups must either be in the VPC specified by var.vpc_id, or a peered VPC with the VPC specified by var.vpc_id. One of var.allow_connections_from_cidr_blocks or var.allow_connections_from_security_groups must be specified for the database to be reachable.
      </p>
    </li>
    <li>
      <p>
        <a name="allow_manage_key_permissions_with_iam" href="#allow_manage_key_permissions_with_iam" className="snap-top">
          <code>allow_manage_key_permissions_with_iam</code>
        </a> - If true, both the CMK's Key Policy and IAM Policies (permissions) can be used to grant permissions on the CMK. If false, only the CMK's Key Policy can be used to grant permissions on the CMK. False is more secure (and generally preferred), but true is more flexible and convenient.
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
        <a name="backup_job_alarm_period" href="#backup_job_alarm_period" className="snap-top">
          <code>backup_job_alarm_period</code>
        </a> - How often, in seconds, the backup job is expected to run. This is the same as var.schedule_expression, but unfortunately, Terraform offers no way to convert rate expressions to seconds. We add a CloudWatch alarm that triggers if the metric in var.create_snapshot_cloudwatch_metric_namespace isn't updated within this time period, as that indicates the backup failed to run.
      </p>
    </li>
    <li>
      <p>
        <a name="backup_retention_period" href="#backup_retention_period" className="snap-top">
          <code>backup_retention_period</code>
        </a> - How many days to keep backup snapshots around before cleaning them up. Must be 1 or greater to support read replicas.
      </p>
    </li>
    <li>
      <p>
        <a name="backup_window" href="#backup_window" className="snap-top">
          <code>backup_window</code>
        </a> - The daily time range during which automated backups are created (e.g. 04:00-09:00). Time zone is UTC. Performance may be degraded while a backup runs.
      </p>
    </li>
    <li>
      <p>
        <a name="cmk_administrator_iam_arns" href="#cmk_administrator_iam_arns" className="snap-top">
          <code>cmk_administrator_iam_arns</code>
        </a> - A list of IAM ARNs for users who should be given administrator access to this CMK (e.g. arn:aws:iam::&lt;aws-account-id>:user/&lt;iam-user-arn>). If this list is empty, and var.kms_key_arn is null, the ARN of the current user will be used.
      </p>
    </li>
    <li>
      <p>
        <a name="cmk_external_user_iam_arns" href="#cmk_external_user_iam_arns" className="snap-top">
          <code>cmk_external_user_iam_arns</code>
        </a> - A list of IAM ARNs for users from external AWS accounts who should be given permissions to use this CMK (e.g. arn:aws:iam::&lt;aws-account-id>:root).
      </p>
    </li>
    <li>
      <p>
        <a name="cmk_user_iam_arns" href="#cmk_user_iam_arns" className="snap-top">
          <code>cmk_user_iam_arns</code>
        </a> - A list of IAM ARNs for users who should be given permissions to use this CMK (e.g.  arn:aws:iam::&lt;aws-account-id>:user/&lt;iam-user-arn>). If this list is empty, and var.kms_key_arn is null, the ARN of the current user will be used.
      </p>
    </li>
    <li>
      <p>
        <a name="create_custom_kms_key" href="#create_custom_kms_key" className="snap-top">
          <code>create_custom_kms_key</code>
        </a> - If set to true, create a KMS CMK and use it to encrypt data on disk in the database. The permissions for this CMK will be assigned by the following variables: cmk_administrator_iam_arns, cmk_user_iam_arns, cmk_external_user_iam_arns, allow_manage_key_permissions.
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
        <a name="custom_parameter_group" href="#custom_parameter_group" className="snap-top">
          <code>custom_parameter_group</code>
        </a> - Configure a custom parameter group for the RDS DB. This will create a new parameter group with the given parameters. When null, the database will be launched with the default parameter group.
      </p>
    </li>
    <li>
      <p>
        <a name="custom_tags" href="#custom_tags" className="snap-top">
          <code>custom_tags</code>
        </a> - A map of custom tags to apply to the RDS Instance and the Security Group created for it. The key is the tag name and the value is the tag value.
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
        <a name="db_config_secrets_manager_id" href="#db_config_secrets_manager_id" className="snap-top">
          <code>db_config_secrets_manager_id</code>
        </a> - The friendly name or ARN of an AWS Secrets Manager secret that contains database configuration information in the format outlined by this document: https://docs.aws.amazon.com/secretsmanager/latest/userguide/best-practices.html. The engine, username, password, dbname, and port fields must be included in the JSON. Note that even with this precaution, this information will be stored in plaintext in the Terraform state file! See the following blog post for more details: https://blog.gruntwork.io/a-comprehensive-guide-to-managing-secrets-in-your-terraform-code-1d586955ace1. If you do not wish to use Secrets Manager, leave this as null, and use the master_username, master_password, db_name, engine, and port variables.
      </p>
    </li>
    <li>
      <p>
        <a name="db_name" href="#db_name" className="snap-top">
          <code>db_name</code>
        </a> - The name for your database of up to 8 alpha-numeric characters. If you do not provide a name, Amazon RDS will not create an empty database on the RDS instance. This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id.
      </p>
    </li>
    <li>
      <p>
        <a name="delete_automated_backups" href="#delete_automated_backups" className="snap-top">
          <code>delete_automated_backups</code>
        </a> - Specifies whether to remove automated backups immediately after the DB instance is deleted
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
        </a> - Enable deletion protection on the RDS instance. If this is enabled, the database cannot be deleted prior to disabling
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
        </a> - List of log types to enable for exporting to CloudWatch logs. If omitted, no logs will be exported. Valid values (depending on engine): alert, audit, error, general, listener, slowquery, trace, postgresql (PostgreSQL) and upgrade (PostgreSQL).
      </p>
    </li>
    <li>
      <p>
        <a name="engine" href="#engine" className="snap-top">
          <code>engine</code>
        </a> - The DB engine to use (e.g. mysql). This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id.
      </p>
    </li>
    <li>
      <p>
        <a name="engine_version" href="#engine_version" className="snap-top">
          <code>engine_version</code>
        </a> - The version of var.engine to use (e.g. 8.0.17 for mysql).
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
        <a name="instance_type" href="#instance_type" className="snap-top">
          <code>instance_type</code>
        </a> - The instance type to use for the db (e.g. db.t3.micro)
      </p>
    </li>
    <li>
      <p>
        <a name="kms_key_arn" href="#kms_key_arn" className="snap-top">
          <code>kms_key_arn</code>
        </a> - The Amazon Resource Name (ARN) of an existing KMS customer master key (CMK) that will be used to encrypt/decrypt backup files. If you leave this blank, the default RDS KMS key for the account will be used. If you set var.create_custom_kms_key to true, this value will be ignored and a custom key will be created and used instead.
      </p>
    </li>
    <li>
      <p>
        <a name="license_model" href="#license_model" className="snap-top">
          <code>license_model</code>
        </a> - The license model to use for this DB. Check the docs for your RDS DB for available license models. Set to an empty string to use the default.
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
        </a> - The value to use for the master password of the database. This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id.
      </p>
    </li>
    <li>
      <p>
        <a name="master_username" href="#master_username" className="snap-top">
          <code>master_username</code>
        </a> - The value to use for the master username of the database. This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id.
      </p>
    </li>
    <li>
      <p>
        <a name="max_allocated_storage" href="#max_allocated_storage" className="snap-top">
          <code>max_allocated_storage</code>
        </a> - When configured, the upper limit to which Amazon RDS can automatically scale the storage of the DB instance. Configuring this will automatically ignore differences to allocated_storage. Must be greater than or equal to allocated_storage or 0 to disable Storage Autoscaling.
      </p>
    </li>
    <li>
      <p>
        <a name="multi_az" href="#multi_az" className="snap-top">
          <code>multi_az</code>
        </a> - Specifies if a standby instance should be deployed in another availability zone. If the primary fails, this instance will automatically take over.
      </p>
    </li>
    <li>
      <p>
        <a name="name" href="#name" className="snap-top">
          <code>name</code>
        </a> - The name used to namespace all the RDS resources created by these templates, including the cluster and cluster instances (e.g. mysql-stage). Must be unique in this region. Must be a lowercase string.
      </p>
    </li>
    <li>
      <p>
        <a name="num_read_replicas" href="#num_read_replicas" className="snap-top">
          <code>num_read_replicas</code>
        </a> - The number of read replicas to deploy
      </p>
    </li>
    <li>
      <p>
        <a name="port" href="#port" className="snap-top">
          <code>port</code>
        </a> - The port the DB will listen on (e.g. 3306). Alternatively, this can be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id.
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
        <a name="replica_backup_retention_period" href="#replica_backup_retention_period" className="snap-top">
          <code>replica_backup_retention_period</code>
        </a> - How many days to keep backup snapshots around before cleaning them up on the read replicas. Must be 1 or greater to support read replicas. 0 means disable automated backups.
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
        </a> - If set to true, take periodic snapshots of the RDS DB that should be shared with another account.
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
        </a> - Specifies whether the DB instance is encrypted.
      </p>
    </li>
    <li>
      <p>
        <a name="subnet_ids" href="#subnet_ids" className="snap-top">
          <code>subnet_ids</code>
        </a> - The list of IDs of the subnets in which to deploy RDS. The list must only contain subnets in var.vpc_id.
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
        </a> - The ID of the VPC in which to deploy RDS.
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
        <a name="db_name" href="#db_name" className="snap-top">
          <code>db_name</code>
        </a> - The name of the empty database created on this RDS DB instance.
      </p>
    </li>
    <li>
      <p>
        <a name="metric_widget_rds_cpu_usage" href="#metric_widget_rds_cpu_usage" className="snap-top">
          <code>metric_widget_rds_cpu_usage</code>
        </a> - A CloudWatch Dashboard widget that graphs CPU usage (percentage) on the RDS DB instance.
      </p>
    </li>
    <li>
      <p>
        <a name="metric_widget_rds_db_connections" href="#metric_widget_rds_db_connections" className="snap-top">
          <code>metric_widget_rds_db_connections</code>
        </a> - A CloudWatch Dashboard widget that graphs the number of active database connections on the RDS DB Instance.
      </p>
    </li>
    <li>
      <p>
        <a name="metric_widget_rds_disk_space" href="#metric_widget_rds_disk_space" className="snap-top">
          <code>metric_widget_rds_disk_space</code>
        </a> - A CloudWatch Dashboard widget that graphs available disk space (in bytes) on the RDS DB instance.
      </p>
    </li>
    <li>
      <p>
        <a name="metric_widget_rds_memory" href="#metric_widget_rds_memory" className="snap-top">
          <code>metric_widget_rds_memory</code>
        </a> - A CloudWatch Dashboard widget that graphs available memory (in bytes) on the RDS DB instance.
      </p>
    </li>
    <li>
      <p>
        <a name="metric_widget_rds_read_latency" href="#metric_widget_rds_read_latency" className="snap-top">
          <code>metric_widget_rds_read_latency</code>
        </a> - A CloudWatch Dashboard widget that graphs the average amount of time taken per disk I/O operation on reads.
      </p>
    </li>
    <li>
      <p>
        <a name="metric_widget_rds_write_latency" href="#metric_widget_rds_write_latency" className="snap-top">
          <code>metric_widget_rds_write_latency</code>
        </a> - A CloudWatch Dashboard widget that graphs the average amount of time taken per disk I/O operation on writes.
      </p>
    </li>
    <li>
      <p>
        <a name="name" href="#name" className="snap-top">
          <code>name</code>
        </a> - The name of the RDS DB instance.
      </p>
    </li>
    <li>
      <p>
        <a name="num_read_replicas" href="#num_read_replicas" className="snap-top">
          <code>num_read_replicas</code>
        </a> - The number of read replicas for the RDS DB instance.
      </p>
    </li>
    <li>
      <p>
        <a name="port" href="#port" className="snap-top">
          <code>port</code>
        </a> - The port of the RDS DB instance.
      </p>
    </li>
    <li>
      <p>
        <a name="primary_arn" href="#primary_arn" className="snap-top">
          <code>primary_arn</code>
        </a> - The ARN of the RDS DB instance.
      </p>
    </li>
    <li>
      <p>
        <a name="primary_endpoint" href="#primary_endpoint" className="snap-top">
          <code>primary_endpoint</code>
        </a> - The endpoint of the RDS DB instance that you can make requests to.
      </p>
    </li>
    <li>
      <p>
        <a name="primary_host" href="#primary_host" className="snap-top">
          <code>primary_host</code>
        </a> - The host portion of the RDS DB instance endpoint. primary_endpoint is in the form '&lt;host>:&lt;port>', and this output returns just the host part.
      </p>
    </li>
    <li>
      <p>
        <a name="primary_id" href="#primary_id" className="snap-top">
          <code>primary_id</code>
        </a> - The ID of the RDS DB instance.
      </p>
    </li>
    <li>
      <p>
        <a name="read_replica_arns" href="#read_replica_arns" className="snap-top">
          <code>read_replica_arns</code>
        </a> - A list of ARNs of the RDS DB instance's read replicas.
      </p>
    </li>
    <li>
      <p>
        <a name="read_replica_endpoints" href="#read_replica_endpoints" className="snap-top">
          <code>read_replica_endpoints</code>
        </a> - A list of endpoints of the RDS DB instance's read replicas.
      </p>
    </li>
    <li>
      <p>
        <a name="read_replica_ids" href="#read_replica_ids" className="snap-top">
          <code>read_replica_ids</code>
        </a> - A list of IDs of the RDS DB instance's read replicas.
      </p>
    </li>
    <li>
      <p>
        <a name="security_group_id" href="#security_group_id" className="snap-top">
          <code>security_group_id</code>
        </a> - The ID of the Security Group that controls access to the RDS DB instance.
      </p>
    </li>
    </ul>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"bfa1ffbdb7a7c8615bc116040c95de1e"}
##DOCS-SOURCER-END -->
