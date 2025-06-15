---
title: "Amazon Managed Streaming for Apache Kafka (Amazon MSK) Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Messaging" version="0.13.1" lastModifiedVersion="0.13.1"/>

# Amazon Managed Streaming for Apache Kafka (Amazon MSK) Module

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/tree/v0.13.1/modules/msk" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.13.1" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform module configures and launches an [Amazon MSK](https://aws.amazon.com/msk/) cluster.

## Cluster Configuration

Amazon Managed Streaming for Apache Kafka provides a default configuration for brokers, topics, and Apache ZooKeeper
nodes. You can also create custom configurations and use them to create new MSK clusters or to update existing clusters.
An MSK configuration consists of a set of properties and their corresponding values:

*   **default configuration**: when you create an MSK cluster and don't specify a custom MSK configuration, Amazon MSK
    creates and uses a default configuration with the values shown
    in [this page](https://docs.aws.amazon.com/msk/latest/developerguide/msk-default-configuration.html). For properties
    that aren't in this table, Amazon MSK uses the defaults associated with your version of Apache Kafka.
*   **custom configuration**: you can create custom configuration using `var.server_properties`. Refer to
    the [Custom MSK configurations](https://docs.aws.amazon.com/msk/latest/developerguide/msk-configuration-properties.html)
    for more information.

### Configuration Update

You can use the `var.server_properties` to update the cluster configuration. When updating the configuration of an
Amazon Managed Streaming for Apache Kafka (MSK) cluster, the update happens in place. MSK applies the configuration
update to the running brokers in a rolling update fashion, meaning that each broker is updated one at a time while the
others remain operational.

This approach ensures that the Kafka cluster remains available during the configuration update process. The update
process does not require destroying and recreating the cluster, which would cause significant downtime and disruption to
the running applications.

### Capacity Planning

Capacity planning involves ensuring that your cluster has enough resources to meet the current and future demands of
your use case. There are many aspects and requirements to consider, including data volume, performance, availability,
workload, future growth, cost, etc. Refer to the following references for best practices, recommendations, and further
details on planning capacity:

*   [MSK Best practices](https://docs.aws.amazon.com/msk/latest/developerguide/bestpractices.html)
*   [Best practices for right-sizing your Apache Kafka clusters to optimize performance and cost](https://aws.amazon.com/blogs/big-data/best-practices-for-right-sizing-your-apache-kafka-clusters-to-optimize-performance-and-cost/)
*   [Apache Kafka Supports 200K Partitions Per Cluster](https://blogs.apache.org/kafka/entry/apache-kafka-supports-more-partitions)
*   [Provisioning storage throughput](https://docs.aws.amazon.com/msk/latest/developerguide/msk-provision-throughput.html)
*   [MSK Sizing and Pricing spreadsheet](https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fdy7oqpxkwhskb.cloudfront.net%2FMSK_Sizing_Pricing.xlsx\&wdOrigin=BROWSELINK)

Based on the result of the capacity planning, you will be tweaking the following configuration to provision your
cluster:

*   **number of partitions per broker**: the number of partitions per broker in Apache Kafka is determined by the total
    number of partitions across all topics and the number of brokers in the cluster. By default, Kafka evenly distributes
    the partitions across all available brokers, so the number of partitions per broker will depend on the number of
    brokers and the total number of partitions.
*   **number of brokers per cluster**: can be configured to any value between 1 and 15.
*   **replication factor**: controls the # of other brokers to replicate the data for fault tolerance. It is recommended
    to have a topic replication factor &gt; 1.
*   **broker_type**: depending on the broker type, recommended number of partitions per broker and maximum storage
    throughput changes.

## Broker Storage Scaling

Amount of required EBS storage depends on multiple factors, for example number of topics, amount and size of your data,
data retention, and replication factor. As such it is not possible to give an exact recommendation, instead the storage
requirements should be calculated based on your use case. It is important to monitor disk usage and increase disk
size when needed.

You can specify the initial EBS volume size with the input variable `var.initial_ebs_volume_size` and use the following
variables to configure auto-scaling broker storage:

*   `var.broker_storage_autoscaling_max_capacity`: the max capacity of broker node EBS storage
*   `var.broker_storage_autoscaling_target_percentage`: triggering point of the auto-scaling
*   `var.disable_broker_storage_scale_in`: flag to disable scaling-in broker storage after auto-scale.

**Note**: if you do not want to use the auto-scaling feature for whatever reason, you can set
the `var.broker_storage_autoscaling_max_capacity` the same as the `var.initial_ebs_volume_size`.

## Monitoring

Amazon Managed Streaming for Apache Kafka gathers Apache Kafka metrics and sends them to Amazon CloudWatch where you can
view them. For more information about Apache Kafka metrics, including the ones that Amazon MSK surfaces,
see [Monitoring](https://kafka.apache.org/documentation/#monitoring) in the Apache Kafka documentation.

You can also monitor your MSK cluster with Prometheus, an open-source monitoring application. For information about
Prometheus, see [Overview in the Prometheus documentation](https://prometheus.io/docs/introduction/overview/). To learn
how to monitor your cluster with Prometheus,
see [Open monitoring with Prometheus](https://docs.aws.amazon.com/msk/latest/developerguide/open-monitoring.html).

### Monitoring With CloudWatch

Amazon MSK integrates with Amazon CloudWatch so that you can collect, view, and analyze CloudWatch metrics for your
Amazon MSK cluster. The metrics that you configure for your MSK cluster are automatically collected and pushed to
CloudWatch. You can set the monitoring level for an MSK cluster to one of the following: `DEFAULT`, `PER_BROKER`,
`PER_TOPIC_PER_BROKER`, or `PER_TOPIC_PER_PARTITION`. Only the DEFAULT-level metrics are free.

**Note**: currently, we do not support setting different monitoring level for CloudWatch Monitoring. You would have to
do this via the Amazon console. You can read more about metrics and monitoring
here: https://docs.aws.amazon.com/msk/latest/developerguide/metrics-details.html

### Monitoring with Prometheus

You can monitor your MSK cluster with Prometheus, an open-source monitoring system for time-series metric data. You can
publish this data to Amazon Managed Service for Prometheus using Prometheus's remote write feature. Please use the
following variables to setup monitoring;

*   `var.open_monitoring_enable_jmx_exporter`
*   `var.open_monitoring_enable_node_exporter`

## Security

### Data Protection w/ Encryption

Amazon MSK provides data encryption options that you can use to meet strict data management requirements. Refer to
the [Amazon MSK encryption](https://docs.aws.amazon.com/msk/latest/developerguide/msk-encryption.html) page for more
information.

#### Encryption at Rest

Amazon MSK integrates with AWS Key Management Service (KMS) to offer transparent server-side encryption. Amazon MSK
always encrypts your data at rest. When you create an MSK cluster, you can specify the AWS KMS customer master key (CMK)
with `var.encryption_at_rest_kms_key_arn` that you want Amazon MSK to use to encrypt your data at rest. If no key is
specified, an AWS managed KMS (`aws/msk` managed service) key will be used for encrypting the data at rest.

#### Encryption in Transit

Amazon MSK uses TLS 1.2. By default, it encrypts data in transit between the brokers of your MSK cluster. You can
override this default using `var.encryption_in_transit_in_cluster` input variable at the time you create the cluster.
You can also control client-to-broker encryption using `var.encryption_in_transit_client_broker` input variable.

### Authentication and Authorization

The MSK module supports the following authentication and authorization methods:

*   [IAM access control](https://docs.aws.amazon.com/msk/latest/developerguide/iam-access-control.html)
    using `var.enable_client_sasl_iam`. You can refer
    to the [msk-with-iam-auth example module](https://github.com/gruntwork-io/terraform-aws-messaging/tree/v0.13.1/examples/msk-with-iam-auth).
*   [TLS](https://docs.aws.amazon.com/msk/latest/developerguide/msk-authentication.html) using `var.enable_client_tls`
    and `var.client_tls_certificate_authority_arns`
*   [Apache Kafka ACLs](https://docs.aws.amazon.com/msk/latest/developerguide/msk-acls.html)
    using `var.server_properties`.

You can read more about available authentication and authorization options from
the [Authentication and authorization for Apache Kafka APIs page](https://docs.aws.amazon.com/msk/latest/developerguide/kafka_apis_iam.html)

## Logging

Broker logs enable you to troubleshoot your Apache Kafka applications and to analyze their communications with your MSK
cluster. You can deliver Apache Kafka broker logs to one or more of the following destination types with variables:

*   Amazon CloudWatch Logs: `var.enable_cloudwatch_logs`, `var.cloudwatch_log_group`
*   Amazon S3: `var.enable_s3_logs`, `var.s3_logs_bucket`, `var.s3_logs_prefix`
*   Amazon Kinesis Data Firehose: `var.enable_firehose_logs`, `var.firehose_delivery_stream`).

You can read more about MSK logging here: https://docs.aws.amazon.com/msk/latest/developerguide/msk-logging.html

## Connecting to Kafka brokers

Once you've used this module to deploy the Kafka brokers, you'll want to connect to them from Kafka clients (e.g.,
Kafka consumers and producers in your apps) to read and write data. To do this, you typically need to configure the
`bootstrap.servers` property for your Kafka client with the IP addresses of a few of your Kafka brokers (you don't
need all the IPs, as the rest will be discovered automatically via ZooKeeper):

```bash
--bootstrap.servers=10.0.0.4:9092,10.0.0.5:9092,10.0.0.6:9092
```

Depending on which client authentication method you configured, there are a number of output
variables (`bootstrap_brokers_*`) that provide you with a list of bootstrap servers. You can also get the list of
bootstrap servers using the AWS Cli:

```bash
$ aws kafka get-bootstrap-brokers --cluster-arn ClusterArn

{
    "BootstrapBrokerStringSaslIam": "b-1.myTestCluster.123z8u.c2.kafka.us-west-1.amazonaws.com:9098,b-2.myTestCluster.123z8u.c2.kafka.us-west-1.amazonaws.com:9098"
}
```

## Other Resources for MSK

*   [MSK Connect](https://docs.aws.amazon.com/msk/latest/developerguide/msk-connect.html): a feature of Amazon MSK that
    makes it easy for developers to stream data to and from their Apache Kafka clusters.
*   [Kafka Cluster Migration](https://docs.aws.amazon.com/msk/latest/developerguide/migration.html): You can mirror or
    migrate your cluster using MirrorMaker, which is part of Apache Kafka.
*   [ZooKeeper](https://zookeeper.apache.org/)
*   [ZooKeeper Security](https://docs.aws.amazon.com/msk/latest/developerguide/zookeeper-security.html)

## MSK Serverless

MSK Serverless is a cluster type for Amazon MSK that makes it possible for you to run Apache Kafka without having to
manage and scale cluster capacity. Refer to
the [MSK Serverless](https://docs.aws.amazon.com/msk/latest/developerguide/serverless.html) page for more information.
You can enable it by setting `var.enable_serverless = true`.

MSK Serverless provides limited configuration options. Only the following list of variables would work with serverless:

*   `var.enable_client_sasl_iam`: only allows SASL IAM based authentication.
*   `var.allow_connections_from_cidr_blocks` and `var.allow_connections_from_security_groups`: controls the traffic that
    is allowed to reach and leave the mks cluster.
*   `var.custom_tags` and `var.custom_tags_security_group`: specify custom tags on msk cluster & security group.

Other variables are only applicable to non-serverless MSK deployment.

### Connecting to MSK Serverless

It's not possible to output endpoint for serverless cluster type deployment -
related [issue](https://github.com/hashicorp/terraform-provider-aws/issues/28005). You would have to use the Amazon
console UI or use the following command to retrieve the endpoint:

```shell
aws kafka  get-bootstrap-brokers --cluster-arn "<CLUSTER_ARN>"
```

## Tiered Storage

Tiered storage is a low-cost storage tier for Amazon MSK that scales to virtually unlimited storage, making it
cost-effective to build streaming data applications. Refer to
the [Tiered storage](https://docs.aws.amazon.com/msk/latest/developerguide/msk-tiered-storage.html) for requirements, constraints, limitations, and more information.

You can enable the tiered storage by setting the following variables:

*   `var.storage_info = "TIERED"`
*   `var.kafka_version = "2.8.2.tiered"` (Note: this is the only supported kafka version for tiered storage)
*   `var.instance_type`: set to other than `kafka.t3.small`.

It's only supported for the provisioned cluster type (non-serverless mode).

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S MSK MODULE
# ------------------------------------------------------------------------------------------------------

module "msk" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/msk?ref=v0.13.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the Kafka cluster (e.g. kafka-stage). This variable is used to
  # namespace all resources created by this module.
  cluster_name = <string>

  # The subnet IDs into which the broker instances should be deployed. You
  # should typically pass in one subnet ID per node in the cluster_size
  # variable. The number of broker nodes must be a multiple of subnets. We
  # strongly recommend that you run Kafka in private subnets.
  subnet_ids = <list(string)>

  # The ID of the VPC in which to deploy the cluster.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of Security Group IDs that should be added to the MSK cluster broker
  # instances.
  additional_security_group_ids = []

  # A list of CIDR-formatted IP address ranges that will be allowed to connect
  # to the Kafka brokers.
  allow_connections_from_cidr_blocks = []

  # A list of security group IDs that will be allowed to connect to the Kafka
  # brokers.
  allow_connections_from_security_groups = []

  # Max capacity of broker node EBS storage (in GiB)
  broker_storage_autoscaling_max_capacity = 100

  # Broker storage utilization percentage at which scaling is triggered.
  broker_storage_autoscaling_target_percentage = 70

  # List of ARNs for SCRAM secrets stored in the Secrets Manager service.
  client_sasl_scram_secret_arns = []

  # Optional list of ACM Certificate Authority Amazon Resource Names (ARNs).
  client_tls_certificate_authority_arns = []

  # Name of the Cloudwatch Log Group to deliver logs to.
  cloudwatch_log_group = null

  # The number of brokers to have in the cluster. This field is required for
  # non-serverless cluster type.
  cluster_size = null

  # Custom tags to apply to the Kafka broker nodes and all related resources.
  custom_tags = {}

  # A map of custom tags to apply to the Security Group for this MSK Cluster.
  # The key is the tag name and the value is the tag value.
  custom_tags_security_group = {}

  # Flag indicating whether broker storage should never be scaled in.
  disable_broker_storage_scale_in = false

  # Whether SASL IAM client authentication is enabled.
  enable_client_sasl_iam = false

  # Whether SASL SCRAM client authentication is enabled.
  enable_client_sasl_scram = false

  # Whether TLS client authentication is enabled.
  enable_client_tls = false

  # Indicates whether you want to enable or disable streaming broker logs to
  # Cloudwatch Logs.
  enable_cloudwatch_logs = false

  # Indicates whether you want to enable or disable streaming broker logs to
  # Kinesis Data Firehose.
  enable_firehose_logs = false

  # Indicates whether you want to enable or disable streaming broker logs to S3.
  enable_s3_logs = false

  # Indicates whether you want to enable msk serverless or not
  enable_serverless = false

  # You may specify a KMS key short ID or ARN (it will always output an ARN) to
  # use for encrypting your data at rest. If no key is specified, an AWS managed
  # KMS ('aws/msk' managed service) key will be used for encrypting the data at
  # rest.
  encryption_at_rest_kms_key_arn = null

  # Encryption setting for data in transit between clients and brokers. Valid
  # values: TLS, TLS_PLAINTEXT, and PLAINTEXT. Default value is `TLS`.
  encryption_in_transit_client_broker = "TLS"

  # Whether data communication among broker nodes is encrypted. Default value:
  # true.
  encryption_in_transit_in_cluster = true

  # Specify the desired enhanced MSK CloudWatch monitoring level. See
  # https://docs.aws.amazon.com/msk/latest/developerguide/metrics-details.html
  # for valid values.
  enhanced_monitoring = "DEFAULT"

  # Name of the Kinesis Data Firehose delivery stream to deliver logs to.
  firehose_delivery_stream = null

  # The initial size of the EBS volume (in GiB) for the data drive on each
  # broker node. 
  initial_ebs_volume_size = 50

  # Specify the instance type to use for the kafka brokers (e.g.
  # `kafka.m5.large`). See
  # https://docs.aws.amazon.com/msk/latest/developerguide/msk-create-cluster.html#broker-instance-types
  # for available instance types. This field is required for non-serverless
  # cluster type.
  instance_type = null

  # Kafka version to install. See
  # https://docs.aws.amazon.com/msk/latest/developerguide/supported-kafka-versions.html
  # for a list of supported versions. This field is required for non-serverless
  # cluster type.
  kafka_version = null

  # Indicates whether you want to enable or disable the Prometheus JMX Exporter.
  open_monitoring_enable_jmx_exporter = false

  # Indicates whether you want to enable or disable the Prometheus Node
  # Exporter.
  open_monitoring_enable_node_exporter = false

  # Override automatically created Service-linked role for storage autoscaling.
  # If not provided, Application Auto Scaling creates the appropriate
  # service-linked role for you.
  override_broker_storage_autoscaling_role_arn = null

  # Name of the S3 bucket to deliver logs to.
  s3_logs_bucket = null

  # Prefix to append to the folder name.
  s3_logs_prefix = null

  # The name of the Security Group to create for the MSK Cluster.
  security_group_name = null

  # Contents of the server.properties file. Supported properties are documented
  # in the MSK Developer Guide
  # (https://docs.aws.amazon.com/msk/latest/developerguide/msk-configuration-properties.html).
  server_properties = {}

  # Controls storage mode for supported storage tiers. Valid values are: LOCAL
  # or TIERED.
  storage_mode = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S MSK MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/msk?ref=v0.13.1"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the Kafka cluster (e.g. kafka-stage). This variable is used to
  # namespace all resources created by this module.
  cluster_name = <string>

  # The subnet IDs into which the broker instances should be deployed. You
  # should typically pass in one subnet ID per node in the cluster_size
  # variable. The number of broker nodes must be a multiple of subnets. We
  # strongly recommend that you run Kafka in private subnets.
  subnet_ids = <list(string)>

  # The ID of the VPC in which to deploy the cluster.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of Security Group IDs that should be added to the MSK cluster broker
  # instances.
  additional_security_group_ids = []

  # A list of CIDR-formatted IP address ranges that will be allowed to connect
  # to the Kafka brokers.
  allow_connections_from_cidr_blocks = []

  # A list of security group IDs that will be allowed to connect to the Kafka
  # brokers.
  allow_connections_from_security_groups = []

  # Max capacity of broker node EBS storage (in GiB)
  broker_storage_autoscaling_max_capacity = 100

  # Broker storage utilization percentage at which scaling is triggered.
  broker_storage_autoscaling_target_percentage = 70

  # List of ARNs for SCRAM secrets stored in the Secrets Manager service.
  client_sasl_scram_secret_arns = []

  # Optional list of ACM Certificate Authority Amazon Resource Names (ARNs).
  client_tls_certificate_authority_arns = []

  # Name of the Cloudwatch Log Group to deliver logs to.
  cloudwatch_log_group = null

  # The number of brokers to have in the cluster. This field is required for
  # non-serverless cluster type.
  cluster_size = null

  # Custom tags to apply to the Kafka broker nodes and all related resources.
  custom_tags = {}

  # A map of custom tags to apply to the Security Group for this MSK Cluster.
  # The key is the tag name and the value is the tag value.
  custom_tags_security_group = {}

  # Flag indicating whether broker storage should never be scaled in.
  disable_broker_storage_scale_in = false

  # Whether SASL IAM client authentication is enabled.
  enable_client_sasl_iam = false

  # Whether SASL SCRAM client authentication is enabled.
  enable_client_sasl_scram = false

  # Whether TLS client authentication is enabled.
  enable_client_tls = false

  # Indicates whether you want to enable or disable streaming broker logs to
  # Cloudwatch Logs.
  enable_cloudwatch_logs = false

  # Indicates whether you want to enable or disable streaming broker logs to
  # Kinesis Data Firehose.
  enable_firehose_logs = false

  # Indicates whether you want to enable or disable streaming broker logs to S3.
  enable_s3_logs = false

  # Indicates whether you want to enable msk serverless or not
  enable_serverless = false

  # You may specify a KMS key short ID or ARN (it will always output an ARN) to
  # use for encrypting your data at rest. If no key is specified, an AWS managed
  # KMS ('aws/msk' managed service) key will be used for encrypting the data at
  # rest.
  encryption_at_rest_kms_key_arn = null

  # Encryption setting for data in transit between clients and brokers. Valid
  # values: TLS, TLS_PLAINTEXT, and PLAINTEXT. Default value is `TLS`.
  encryption_in_transit_client_broker = "TLS"

  # Whether data communication among broker nodes is encrypted. Default value:
  # true.
  encryption_in_transit_in_cluster = true

  # Specify the desired enhanced MSK CloudWatch monitoring level. See
  # https://docs.aws.amazon.com/msk/latest/developerguide/metrics-details.html
  # for valid values.
  enhanced_monitoring = "DEFAULT"

  # Name of the Kinesis Data Firehose delivery stream to deliver logs to.
  firehose_delivery_stream = null

  # The initial size of the EBS volume (in GiB) for the data drive on each
  # broker node. 
  initial_ebs_volume_size = 50

  # Specify the instance type to use for the kafka brokers (e.g.
  # `kafka.m5.large`). See
  # https://docs.aws.amazon.com/msk/latest/developerguide/msk-create-cluster.html#broker-instance-types
  # for available instance types. This field is required for non-serverless
  # cluster type.
  instance_type = null

  # Kafka version to install. See
  # https://docs.aws.amazon.com/msk/latest/developerguide/supported-kafka-versions.html
  # for a list of supported versions. This field is required for non-serverless
  # cluster type.
  kafka_version = null

  # Indicates whether you want to enable or disable the Prometheus JMX Exporter.
  open_monitoring_enable_jmx_exporter = false

  # Indicates whether you want to enable or disable the Prometheus Node
  # Exporter.
  open_monitoring_enable_node_exporter = false

  # Override automatically created Service-linked role for storage autoscaling.
  # If not provided, Application Auto Scaling creates the appropriate
  # service-linked role for you.
  override_broker_storage_autoscaling_role_arn = null

  # Name of the S3 bucket to deliver logs to.
  s3_logs_bucket = null

  # Prefix to append to the folder name.
  s3_logs_prefix = null

  # The name of the Security Group to create for the MSK Cluster.
  security_group_name = null

  # Contents of the server.properties file. Supported properties are documented
  # in the MSK Developer Guide
  # (https://docs.aws.amazon.com/msk/latest/developerguide/msk-configuration-properties.html).
  server_properties = {}

  # Controls storage mode for supported storage tiers. Valid values are: LOCAL
  # or TIERED.
  storage_mode = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="cluster_name" requirement="required" type="string">
<HclListItemDescription>

The name of the Kafka cluster (e.g. kafka-stage). This variable is used to namespace all resources created by this module.

</HclListItemDescription>
</HclListItem>

<HclListItem name="subnet_ids" requirement="required" type="list(string)">
<HclListItemDescription>

The subnet IDs into which the broker instances should be deployed. You should typically pass in one subnet ID per node in the cluster_size variable. The number of broker nodes must be a multiple of subnets. We strongly recommend that you run Kafka in private subnets.

</HclListItemDescription>
</HclListItem>

<HclListItem name="vpc_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the VPC in which to deploy the cluster.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="additional_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of Security Group IDs that should be added to the MSK cluster broker instances.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of CIDR-formatted IP address ranges that will be allowed to connect to the Kafka brokers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_connections_from_security_groups" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of security group IDs that will be allowed to connect to the Kafka brokers.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="broker_storage_autoscaling_max_capacity" requirement="optional" type="number">
<HclListItemDescription>

Max capacity of broker node EBS storage (in GiB)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="100"/>
</HclListItem>

<HclListItem name="broker_storage_autoscaling_target_percentage" requirement="optional" type="number">
<HclListItemDescription>

Broker storage utilization percentage at which scaling is triggered.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="70"/>
</HclListItem>

<HclListItem name="client_sasl_scram_secret_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

List of ARNs for SCRAM secrets stored in the Secrets Manager service.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="client_tls_certificate_authority_arns" requirement="optional" type="list(string)">
<HclListItemDescription>

Optional list of ACM Certificate Authority Amazon Resource Names (ARNs).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cloudwatch_log_group" requirement="optional" type="string">
<HclListItemDescription>

Name of the Cloudwatch Log Group to deliver logs to.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cluster_size" requirement="optional" type="number">
<HclListItemDescription>

The number of brokers to have in the cluster. This field is required for non-serverless cluster type.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Custom tags to apply to the Kafka broker nodes and all related resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
     {
       key1 = "value1"
       key2 = "value2"
     }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="custom_tags_security_group" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the Security Group for this MSK Cluster. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
     {
       key1 = "value1"
       key2 = "value2"
     }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="disable_broker_storage_scale_in" requirement="optional" type="bool">
<HclListItemDescription>

Flag indicating whether broker storage should never be scaled in.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_client_sasl_iam" requirement="optional" type="bool">
<HclListItemDescription>

Whether SASL IAM client authentication is enabled.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_client_sasl_scram" requirement="optional" type="bool">
<HclListItemDescription>

Whether SASL SCRAM client authentication is enabled.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_client_tls" requirement="optional" type="bool">
<HclListItemDescription>

Whether TLS client authentication is enabled.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_cloudwatch_logs" requirement="optional" type="bool">
<HclListItemDescription>

Indicates whether you want to enable or disable streaming broker logs to Cloudwatch Logs.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_firehose_logs" requirement="optional" type="bool">
<HclListItemDescription>

Indicates whether you want to enable or disable streaming broker logs to Kinesis Data Firehose.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_s3_logs" requirement="optional" type="bool">
<HclListItemDescription>

Indicates whether you want to enable or disable streaming broker logs to S3.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_serverless" requirement="optional" type="bool">
<HclListItemDescription>

Indicates whether you want to enable msk serverless or not

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="encryption_at_rest_kms_key_arn" requirement="optional" type="string">
<HclListItemDescription>

You may specify a KMS key short ID or ARN (it will always output an ARN) to use for encrypting your data at rest. If no key is specified, an AWS managed KMS ('aws/msk' managed service) key will be used for encrypting the data at rest.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="encryption_in_transit_client_broker" requirement="optional" type="string">
<HclListItemDescription>

Encryption setting for data in transit between clients and brokers. Valid values: TLS, TLS_PLAINTEXT, and PLAINTEXT. Default value is `TLS`.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;TLS&quot;"/>
</HclListItem>

<HclListItem name="encryption_in_transit_in_cluster" requirement="optional" type="bool">
<HclListItemDescription>

Whether data communication among broker nodes is encrypted. Default value: true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enhanced_monitoring" requirement="optional" type="string">
<HclListItemDescription>

Specify the desired enhanced MSK CloudWatch monitoring level. See https://docs.aws.amazon.com/msk/latest/developerguide/metrics-details.html for valid values.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;DEFAULT&quot;"/>
</HclListItem>

<HclListItem name="firehose_delivery_stream" requirement="optional" type="string">
<HclListItemDescription>

Name of the Kinesis Data Firehose delivery stream to deliver logs to.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="initial_ebs_volume_size" requirement="optional" type="number">
<HclListItemDescription>

The initial size of the EBS volume (in GiB) for the data drive on each broker node. 

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="50"/>
</HclListItem>

<HclListItem name="instance_type" requirement="optional" type="string">
<HclListItemDescription>

Specify the instance type to use for the kafka brokers (e.g. `kafka.m5.large`). See https://docs.aws.amazon.com/msk/latest/developerguide/msk-create-cluster.html#broker-instance-types for available instance types. This field is required for non-serverless cluster type.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="kafka_version" requirement="optional" type="string">
<HclListItemDescription>

Kafka version to install. See https://docs.aws.amazon.com/msk/latest/developerguide/supported-kafka-versions.html for a list of supported versions. This field is required for non-serverless cluster type.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="open_monitoring_enable_jmx_exporter" requirement="optional" type="bool">
<HclListItemDescription>

Indicates whether you want to enable or disable the Prometheus JMX Exporter.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="open_monitoring_enable_node_exporter" requirement="optional" type="bool">
<HclListItemDescription>

Indicates whether you want to enable or disable the Prometheus Node Exporter.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="override_broker_storage_autoscaling_role_arn" requirement="optional" type="string">
<HclListItemDescription>

Override automatically created Service-linked role for storage autoscaling. If not provided, Application Auto Scaling creates the appropriate service-linked role for you.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="s3_logs_bucket" requirement="optional" type="string">
<HclListItemDescription>

Name of the S3 bucket to deliver logs to.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="s3_logs_prefix" requirement="optional" type="string">
<HclListItemDescription>

Prefix to append to the folder name.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="security_group_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the Security Group to create for the MSK Cluster.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="server_properties" requirement="optional" type="map(string)">
<HclListItemDescription>

Contents of the server.properties file. Supported properties are documented in the MSK Developer Guide (https://docs.aws.amazon.com/msk/latest/developerguide/msk-configuration-properties.html).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
     {
       "auto.create.topics.enable" = "true"
       "default.replication.factor" = "2"
     }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="storage_mode" requirement="optional" type="string">
<HclListItemDescription>

Controls storage mode for supported storage tiers. Valid values are: LOCAL or TIERED.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="bootstrap_brokers">
<HclListItemDescription>

A comma separated list of one or more hostname:port pairs of kafka brokers suitable to boostrap connectivity to the kafka cluster

</HclListItemDescription>
</HclListItem>

<HclListItem name="bootstrap_brokers_iam">
<HclListItemDescription>

A comma separated list of one or more DNS names (or IPs) and TLS port pairs kafka brokers suitable to boostrap connectivity using SASL/IAM to the kafka cluster.

</HclListItemDescription>
</HclListItem>

<HclListItem name="bootstrap_brokers_scram">
<HclListItemDescription>

A comma separated list of one or more DNS names (or IPs) and TLS port pairs kafka brokers suitable to boostrap connectivity using SASL/SCRAM to the kafka cluster.

</HclListItemDescription>
</HclListItem>

<HclListItem name="bootstrap_brokers_tls">
<HclListItemDescription>

A comma separated list of one or more DNS names (or IPs) and TLS port pairs kafka brokers suitable to boostrap connectivity to the kafka cluster

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_arn">
<HclListItemDescription>

ARN of the MSK cluster.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_current_version">
<HclListItemDescription>

Current version of the MSK Cluster used for updates

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_group_arn_prefix">
<HclListItemDescription>

Group ARN prefix (without trailing '/') to help creating IAM policies, e.g. 'arn:aws:kafka:us-east-1:0123456789012:group/MyTestCluster'

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_name">
<HclListItemDescription>

Name of the MSK cluster.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cluster_topic_arn_prefix">
<HclListItemDescription>

Topic ARN prefix (without trailing '/') to help creating IAM policies, e.g. 'arn:aws:kafka:us-east-1:0123456789012:topic/MyTestCluster'

</HclListItemDescription>
</HclListItem>

<HclListItem name="msk_config_arn">
<HclListItemDescription>

ARN of the MSK configuration.

</HclListItemDescription>
</HclListItem>

<HclListItem name="msk_config_latest_revision">
<HclListItemDescription>

Latest revision of the MSK configuration.

</HclListItemDescription>
</HclListItem>

<HclListItem name="security_group_id">
<HclListItemDescription>

The ID of the cluster security group.

</HclListItemDescription>
</HclListItem>

<HclListItem name="security_group_name">
<HclListItemDescription>

The name of the cluster security group.

</HclListItemDescription>
</HclListItem>

<HclListItem name="storage_mode">
<HclListItemDescription>

Storage mode of the MSK cluster

</HclListItemDescription>
</HclListItem>

<HclListItem name="zookeeper_connect_string">
<HclListItemDescription>

A comma separated list of one or more hostname:port pairs to use to connect to the Apache Zookeeper cluster

</HclListItemDescription>
</HclListItem>

<HclListItem name="zookeeper_connect_string_tls">
<HclListItemDescription>

A comma separated list of one or more hostname:port pairs to use to connect to the Apache Zookeeper cluster

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v0.13.1/modules/msk/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v0.13.1/modules/msk/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v0.13.1/modules/msk/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "34406f2f24b646c27a66bb6ff68328c1"
}
##DOCS-SOURCER-END -->
