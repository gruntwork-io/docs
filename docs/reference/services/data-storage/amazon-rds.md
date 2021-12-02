import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon RDS

Deploy and manage Amazon Relational Database Service (RDS)

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/data-stores/rds" class="link-button">View on GitHub</a>

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
        <td>allocated_storage</td>
        <td>The amount of storage space the DB should use, in GB.</td>
    </tr><tr>
        <td>allow_connections_from_cidr_blocks</td>
        <td>The list of network CIDR blocks to allow network access to RDS from. One of var.allow_connections_from_cidr_blocks or var.allow_connections_from_security_groups must be specified for the database to be reachable.</td>
    </tr><tr>
        <td>allow_connections_from_security_groups</td>
        <td>The list of IDs or Security Groups to allow network access to RDS from. All security groups must either be in the VPC specified by var.vpc_id, or a peered VPC with the VPC specified by var.vpc_id. One of var.allow_connections_from_cidr_blocks or var.allow_connections_from_security_groups must be specified for the database to be reachable.</td>
    </tr><tr>
        <td>allow_manage_key_permissions_with_iam</td>
        <td>If true, both the CMK's Key Policy and IAM Policies (permissions) can be used to grant permissions on the CMK. If false, only the CMK's Key Policy can be used to grant permissions on the CMK. False is more secure (and generally preferred), but true is more flexible and convenient.</td>
    </tr><tr>
        <td>apply_immediately</td>
        <td>Specifies whether any cluster modifications are applied immediately, or during the next maintenance window. Note that cluster modifications may cause degraded performance or downtime.</td>
    </tr><tr>
        <td>backup_job_alarm_period</td>
        <td>How often, in seconds, the backup job is expected to run. This is the same as var.schedule_expression, but unfortunately, Terraform offers no way to convert rate expressions to seconds. We add a CloudWatch alarm that triggers if the metric in var.create_snapshot_cloudwatch_metric_namespace isn't updated within this time period, as that indicates the backup failed to run.</td>
    </tr><tr>
        <td>backup_retention_period</td>
        <td>How many days to keep backup snapshots around before cleaning them up. Must be 1 or greater to support read replicas.</td>
    </tr><tr>
        <td>backup_window</td>
        <td>The daily time range during which automated backups are created (e.g. 04:00-09:00). Time zone is UTC. Performance may be degraded while a backup runs.</td>
    </tr><tr>
        <td>cmk_administrator_iam_arns</td>
        <td>A list of IAM ARNs for users who should be given administrator access to this CMK (e.g. arn:aws:iam::&lt;aws-account-id>:user/&lt;iam-user-arn>). If this list is empty, and var.kms_key_arn is null, the ARN of the current user will be used.</td>
    </tr><tr>
        <td>cmk_external_user_iam_arns</td>
        <td>A list of IAM ARNs for users from external AWS accounts who should be given permissions to use this CMK (e.g. arn:aws:iam::&lt;aws-account-id>:root).</td>
    </tr><tr>
        <td>cmk_user_iam_arns</td>
        <td>A list of IAM ARNs for users who should be given permissions to use this CMK (e.g.  arn:aws:iam::&lt;aws-account-id>:user/&lt;iam-user-arn>). If this list is empty, and var.kms_key_arn is null, the ARN of the current user will be used.</td>
    </tr><tr>
        <td>create_custom_kms_key</td>
        <td>If set to true, create a KMS CMK and use it to encrypt data on disk in the database. The permissions for this CMK will be assigned by the following variables: cmk_administrator_iam_arns, cmk_user_iam_arns, cmk_external_user_iam_arns, allow_manage_key_permissions.</td>
    </tr><tr>
        <td>create_snapshot_cloudwatch_metric_namespace</td>
        <td>The namespace to use for the CloudWatch metric we report every time a new RDS snapshot is created. We add a CloudWatch alarm on this metric to notify us if the backup job fails to run for any reason. Defaults to the cluster name.</td>
    </tr><tr>
        <td>custom_parameter_group</td>
        <td>Configure a custom parameter group for the RDS DB. This will create a new parameter group with the given parameters. When null, the database will be launched with the default parameter group.</td>
    </tr><tr>
        <td>custom_tags</td>
        <td>A map of custom tags to apply to the RDS Instance and the Security Group created for it. The key is the tag name and the value is the tag value.</td>
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
        <td>db_config_secrets_manager_id</td>
        <td>The friendly name or ARN of an AWS Secrets Manager secret that contains database configuration information in the format outlined by this document: https://docs.aws.amazon.com/secretsmanager/latest/userguide/best-practices.html. The engine, username, password, dbname, and port fields must be included in the JSON. Note that even with this precaution, this information will be stored in plaintext in the Terraform state file! See the following blog post for more details: https://blog.gruntwork.io/a-comprehensive-guide-to-managing-secrets-in-your-terraform-code-1d586955ace1. If you do not wish to use Secrets Manager, leave this as null, and use the master_username, master_password, db_name, engine, and port variables.</td>
    </tr><tr>
        <td>db_name</td>
        <td>The name for your database of up to 8 alpha-numeric characters. If you do not provide a name, Amazon RDS will not create an empty database on the RDS instance. This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id.</td>
    </tr><tr>
        <td>delete_automated_backups</td>
        <td>Specifies whether to remove automated backups immediately after the DB instance is deleted</td>
    </tr><tr>
        <td>enable_cloudwatch_alarms</td>
        <td>Set to true to enable several basic CloudWatch alarms around CPU usage, memory usage, and disk space usage. If set to true, make sure to specify SNS topics to send notifications to using var.alarms_sns_topic_arn.</td>
    </tr><tr>
        <td>enable_cloudwatch_metrics</td>
        <td>When true, enable CloudWatch metrics for the manual snapshots created for the purpose of sharing with another account.</td>
    </tr><tr>
        <td>enable_deletion_protection</td>
        <td>Enable deletion protection on the RDS instance. If this is enabled, the database cannot be deleted prior to disabling</td>
    </tr><tr>
        <td>enable_perf_alarms</td>
        <td>Set to true to enable alarms related to performance, such as read and write latency alarms. Set to false to disable those alarms if you aren't sure what would be reasonable perf numbers for your RDS set up or if those numbers are too unpredictable.</td>
    </tr><tr>
        <td>enable_share_snapshot_cloudwatch_alarms</td>
        <td>When true, enable CloudWatch alarms for the manual snapshots created for the purpose of sharing with another account. Only used if var.share_snapshot_with_another_account is true.</td>
    </tr><tr>
        <td>enabled_cloudwatch_logs_exports</td>
        <td>List of log types to enable for exporting to CloudWatch logs. If omitted, no logs will be exported. Valid values (depending on engine): alert, audit, error, general, listener, slowquery, trace, postgresql (PostgreSQL) and upgrade (PostgreSQL).</td>
    </tr><tr>
        <td>engine</td>
        <td>The DB engine to use (e.g. mysql). This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id.</td>
    </tr><tr>
        <td>engine_version</td>
        <td>The version of var.engine to use (e.g. 8.0.17 for mysql).</td>
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
        <td>instance_type</td>
        <td>The instance type to use for the db (e.g. db.t3.micro)</td>
    </tr><tr>
        <td>kms_key_arn</td>
        <td>The Amazon Resource Name (ARN) of an existing KMS customer master key (CMK) that will be used to encrypt/decrypt backup files. If you leave this blank, the default RDS KMS key for the account will be used. If you set var.create_custom_kms_key to true, this value will be ignored and a custom key will be created and used instead.</td>
    </tr><tr>
        <td>license_model</td>
        <td>The license model to use for this DB. Check the docs for your RDS DB for available license models. Set to an empty string to use the default.</td>
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
        <td>The value to use for the master password of the database. This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id.</td>
    </tr><tr>
        <td>master_username</td>
        <td>The value to use for the master username of the database. This can also be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id.</td>
    </tr><tr>
        <td>max_allocated_storage</td>
        <td>When configured, the upper limit to which Amazon RDS can automatically scale the storage of the DB instance. Configuring this will automatically ignore differences to allocated_storage. Must be greater than or equal to allocated_storage or 0 to disable Storage Autoscaling.</td>
    </tr><tr>
        <td>multi_az</td>
        <td>Specifies if a standby instance should be deployed in another availability zone. If the primary fails, this instance will automatically take over.</td>
    </tr><tr>
        <td>name</td>
        <td>The name used to namespace all the RDS resources created by these templates, including the cluster and cluster instances (e.g. mysql-stage). Must be unique in this region. Must be a lowercase string.</td>
    </tr><tr>
        <td>num_read_replicas</td>
        <td>The number of read replicas to deploy</td>
    </tr><tr>
        <td>port</td>
        <td>The port the DB will listen on (e.g. 3306). Alternatively, this can be provided via AWS Secrets Manager. See the description of db_config_secrets_manager_id.</td>
    </tr><tr>
        <td>publicly_accessible</td>
        <td>If you wish to make your database accessible from the public Internet, set this flag to true (WARNING: NOT RECOMMENDED FOR REGULAR USAGE!!). The default is false, which means the database is only accessible from within the VPC, which is much more secure. This flag MUST be false for serverless mode.</td>
    </tr><tr>
        <td>replica_backup_retention_period</td>
        <td>How many days to keep backup snapshots around before cleaning them up on the read replicas. Must be 1 or greater to support read replicas. 0 means disable automated backups.</td>
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
        <td>If set to true, take periodic snapshots of the RDS DB that should be shared with another account.</td>
    </tr><tr>
        <td>skip_final_snapshot</td>
        <td>Determines whether a final DB snapshot is created before the DB instance is deleted. Be very careful setting this to true; if you do, and you delete this DB instance, you will not have any backups of the data! You almost never want to set this to true, unless you are doing automated or manual testing.</td>
    </tr><tr>
        <td>snapshot_identifier</td>
        <td>If non-null, the RDS Instance will be restored from the given Snapshot ID. This is the Snapshot ID you'd find in the RDS console, e.g: rds:production-2015-06-26-06-05.</td>
    </tr><tr>
        <td>storage_encrypted</td>
        <td>Specifies whether the DB instance is encrypted.</td>
    </tr><tr>
        <td>subnet_ids</td>
        <td>The list of IDs of the subnets in which to deploy RDS. The list must only contain subnets in var.vpc_id.</td>
    </tr><tr>
        <td>too_many_db_connections_threshold</td>
        <td>Trigger an alarm if the number of connections to the DB instance goes above this threshold.</td>
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
        <td>all_metric_widgets</td>
        <td>A list of all the CloudWatch Dashboard metric widgets available in this module.</td>
    </tr><tr>
        <td>db_name</td>
        <td>The name of the empty database created on this RDS DB instance.</td>
    </tr><tr>
        <td>metric_widget_rds_cpu_usage</td>
        <td>A CloudWatch Dashboard widget that graphs CPU usage (percentage) on the RDS DB instance.</td>
    </tr><tr>
        <td>metric_widget_rds_db_connections</td>
        <td>A CloudWatch Dashboard widget that graphs the number of active database connections on the RDS DB Instance.</td>
    </tr><tr>
        <td>metric_widget_rds_disk_space</td>
        <td>A CloudWatch Dashboard widget that graphs available disk space (in bytes) on the RDS DB instance.</td>
    </tr><tr>
        <td>metric_widget_rds_memory</td>
        <td>A CloudWatch Dashboard widget that graphs available memory (in bytes) on the RDS DB instance.</td>
    </tr><tr>
        <td>metric_widget_rds_read_latency</td>
        <td>A CloudWatch Dashboard widget that graphs the average amount of time taken per disk I/O operation on reads.</td>
    </tr><tr>
        <td>metric_widget_rds_write_latency</td>
        <td>A CloudWatch Dashboard widget that graphs the average amount of time taken per disk I/O operation on writes.</td>
    </tr><tr>
        <td>name</td>
        <td>The name of the RDS DB instance.</td>
    </tr><tr>
        <td>num_read_replicas</td>
        <td>The number of read replicas for the RDS DB instance.</td>
    </tr><tr>
        <td>port</td>
        <td>The port of the RDS DB instance.</td>
    </tr><tr>
        <td>primary_arn</td>
        <td>The ARN of the RDS DB instance.</td>
    </tr><tr>
        <td>primary_endpoint</td>
        <td>The endpoint of the RDS DB instance that you can make requests to.</td>
    </tr><tr>
        <td>primary_host</td>
        <td>The host portion of the RDS DB instance endpoint. primary_endpoint is in the form '&lt;host>:&lt;port>', and this output returns just the host part.</td>
    </tr><tr>
        <td>primary_id</td>
        <td>The ID of the RDS DB instance.</td>
    </tr><tr>
        <td>read_replica_arns</td>
        <td>A list of ARNs of the RDS DB instance's read replicas.</td>
    </tr><tr>
        <td>read_replica_endpoints</td>
        <td>A list of endpoints of the RDS DB instance's read replicas.</td>
    </tr><tr>
        <td>read_replica_ids</td>
        <td>A list of IDs of the RDS DB instance's read replicas.</td>
    </tr><tr>
        <td>security_group_id</td>
        <td>The ID of the Security Group that controls access to the RDS DB instance.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"11bf92abb6dcb23f36a0ca10bfb48dea"}
##DOCS-SOURCER-END -->
