---
title: "Amazon Managed Streaming for Apache Kafka (Amazon MSK) Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Messaging" version="0.10.2" lastModifiedVersion="0.10.1"/>

# Amazon Managed Streaming for Apache Kafka (Amazon MSK) Module

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/tree/v0.10.2/modules/msk" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.10.1" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform module configures and launches an [Amazon MSK](https://aws.amazon.com/msk/) cluster.

Amazon Managed Streaming for Apache Kafka (Amazon MSK) is a fully managed service that enables you to build and run applications that use Apache
Kafka to process streaming data. Amazon MSK provides the control-plane operations, such as those for creating, updating,
and deleting clusters. Managing all the data-plane operations, such running producers and consumers, is up to you.

It runs open-source versions of [Apache Kafka](https://github.com/apache/kafka), meaning existing applications, tooling,
and plugins from partners and the Apache Kafka community are supported without requiring changes to application code.
You can read more about supported Apache Kafka versions in [the official documentation](https://docs.aws.amazon.com/msk/latest/developerguide/supported-kafka-versions.html).

Note that this module does not support [Amazon MSK Serverless](https://docs.aws.amazon.com/msk/latest/developerguide/serverless.html),
which is still in preview.

## Cluster Configuration

Amazon MSK provides a [default configuration](https://docs.aws.amazon.com/msk/latest/developerguide/msk-default-configuration.html)
for brokers, topics, and Apache ZooKeeper nodes. You can also create [custom configurations](https://docs.aws.amazon.com/msk/latest/developerguide/msk-configuration-properties.html)
with `var.server_properties` and use them to create new MSK clusters or to update existing clusters.

### Capacity Planning

When planning the capacity for your cluster, there are multiple factors that need to be taken into consideration, including:

*   Performance and throughput
*   Fault tolerance
*   Storage capacity

To ensure high availability for production workloads, it is recommended to have a topic replication factor > 1. This means that
your topics are partitioned and replicated across multiple brokers in the cluster, leading to better fault tolerance and
parallelism for your consumers. As a rule of thumb, the optimal number of partitions for a topic should be equal to, or a
multiple of, the number of brokers in your cluster. Note that the number of partitions can only be increased, not decreased.

See https://docs.aws.amazon.com/msk/latest/developerguide/bestpractices.html for further details on planning the capacity
and configuration of your cluster.

### Storage Auto Scaling

Amount of required EBS storage depends on multiple factors, for example number of topics, amount
and size of your data, data retention and replication factor. As such it is not possible to give an exact recommendation, instead
the storage requirements should be calculated based on your use case. It is important to monitor disk usage and increase disk
size when needed.

The module will set the initial EBS volume size with input variable `initial_ebs_volume_size` and automatically scale the broker
volumes up until `broker_storage_autoscaling_max_capacity` is reached. You can optionally disable scale in with input
variable `disable_broker_storage_scale_in`. You can use `broker_storage_autoscaling_target_percentage` to control the scaling threshold.

## Monitoring

### Monitoring With CloudWatch

Amazon MSK integrates with Amazon CloudWatch so that you can collect, view, and analyze metrics for your MSK serverless cluster.
You can set the monitoring level for an MSK cluster to one of the following: `DEFAULT`, `PER_BROKER`, `PER_TOPIC_PER_BROKER`, or `PER_TOPIC_PER_PARTITION`.
You can read more about metrics and monitoring here: https://docs.aws.amazon.com/msk/latest/developerguide/metrics-details.html

### Open Monitoring with Prometheus

You can also monitor your MSK cluster with [Prometheus](https://prometheus.io/), an open-source monitoring system for
time-series metric data. You can also use tools that are compatible with Prometheus-formatted metrics or tools that integrate
with Amazon MSK Open Monitoring, like Datadog, Lenses, New Relic, and Sumo logic. You can read more about Open Monitoring
with Prometheus here: https://docs.aws.amazon.com/msk/latest/developerguide/open-monitoring.html

All metrics emitted by Apache Kafka to JMX are accessible using open monitoring with Prometheus. For information about Apache Kafka
metrics, see [Monitoring](https://kafka.apache.org/documentation/#monitoring) in the Apache Kafka documentation.

## Encryption

Amazon MSK allows you to enable encryption at rest and in transit.
The certificates that Amazon MSK uses for encryption must be renewed every 13 months. Amazon MSK automatically renews these
certificates for all clusters.

### Encryption at Rest

Amazon MSK integrates with AWS Key Management Service (KMS) to offer transparent server-side encryption. Amazon MSK always
encrypts your data at rest. When you create an MSK cluster, you can specify the AWS KMS customer master key (CMK) with
`var.encryption_at_rest_kms_key_arn` that you want Amazon MSK to use to encrypt your data at rest. If no key is specified,
an AWS managed KMS (`aws/msk` managed service) key will be used for encrypting the data at rest.

### Encryption in Transit

Amazon MSK uses TLS 1.2. By default, it encrypts data in transit between the brokers of your MSK cluster. You can override
this default using `var.encryption_in_transit_in_cluster` input variable at the time you create the cluster. You can also control client-to-broker encryption using `var.encryption_in_transit_client_broker` input variable.

## Logging

Broker logs enable you to troubleshoot your Apache Kafka applications and to analyze their communications with your MSK cluster.
You can deliver Apache Kafka broker logs to one or more of the following destination types:

*   Amazon CloudWatch Logs
*   Amazon S3
*   Amazon Kinesis Data Firehose.

You can read more about MSK logging here: https://docs.aws.amazon.com/msk/latest/developerguide/msk-logging.html

## Authentication and Authorization

You can use [IAM](https://docs.aws.amazon.com/msk/latest/developerguide/iam-access-control.html) to authenticate clients and to
allow or deny Apache Kafka actions. Alternatively, you can use [TLS](https://docs.aws.amazon.com/msk/latest/developerguide/msk-authentication.html)
or [SASL/SCRAM](https://docs.aws.amazon.com/msk/latest/developerguide/msk-password.html) to authenticate clients, and
[Apache Kafka ACLs](https://docs.aws.amazon.com/msk/latest/developerguide/msk-acls.html) to allow or deny actions.
You can read more about available authentication and authorization options here: https://docs.aws.amazon.com/msk/latest/developerguide/kafka_apis_iam.html

## Connecting to Kafka brokers

Once you've used this module to deploy the Kafka brokers, you'll want to connect to them from Kafka clients (e.g.,
Kafka consumers and producers in your apps) to read and write data. To do this, you typically need to configure the
`bootstrap.servers` property for your Kafka client with the IP addresses of a few of your Kafka brokers (you don't
need all the IPs, as the rest will be discovered automatically via ZooKeeper):

```bash
--bootstrap.servers=10.0.0.4:9092,10.0.0.5:9092,10.0.0.6:9092
```

Depending on which client authentication method you configured, there are a number of output variables (`bootstrap_brokers_*`) that
provide you with a list of bootstrap servers. You can also get the list of bootstrap servers using the AWS Cli:

```bash
$ aws kafka get-bootstrap-brokers --cluster-arn ClusterArn

{
    "BootstrapBrokerStringSaslIam": "b-1.myTestCluster.123z8u.c2.kafka.us-west-1.amazonaws.com:9098,b-2.myTestCluster.123z8u.c2.kafka.us-west-1.amazonaws.com:9098"
}
```

### MSK Connect

[MSK Connect](https://docs.aws.amazon.com/msk/latest/developerguide/msk-connect.html) is a feature of Amazon MSK that makes
it easy for developers to stream data to and from their Apache Kafka clusters. With MSK Connect, you can deploy fully managed
connectors built for Kafka Connect that move data into or pull data from popular data stores like Amazon S3 and Amazon
OpenSearch Service. You can deploy connectors developed by 3rd parties like Debezium for streaming change logs from databases
into an Apache Kafka cluster, or deploy an existing connector with no code changes. Connectors automatically scale to adjust
for changes in load and you pay only for the resources that you use.

## Kafka Cluster Migration

You can mirror or migrate your cluster using MirrorMaker, which is part of Apache Kafka. Kafka MirrorMaker is a utility
that helps to replicate the data between two Apache Kafka clusters within or across regions.

For further information about migrating Kafka clusters, see: https://docs.aws.amazon.com/msk/latest/developerguide/migration.html

## ZooKeeper

Kafka depends on [ZooKeeper](https://zookeeper.apache.org/) to work. Amazon MSK manages the Apache ZooKeeper nodes for you.
Each Amazon MSK cluster includes the appropriate number of Apache ZooKeeper nodes for your Apache Kafka cluster at no additional cost.

### Controlling Access to Apache ZooKeeper

For security reasons you may want to limit access to the Apache ZooKeeper nodes that are part of your Amazon MSK cluster.
To limit access to the nodes, you can assign a separate security group to them. You can then decide who gets access to that security group.

As ZooKeeper security group configuration requires manual actions, this module does not include support for that. To change
the security group for ZooKeeper, follow these instructions: https://docs.aws.amazon.com/msk/latest/developerguide/zookeeper-security.html

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S MSK MODULE
# ------------------------------------------------------------------------------------------------------

module "msk" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/msk?ref=v0.10.2"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the Kafka cluster (e.g. kafka-stage). This variable is used to
  # namespace all resources created by this module.
  cluster_name = <string>

  # The number of brokers to have in the cluster.
  cluster_size = <number>

  # Specify the instance type to use for the kafka brokers (e.g. `kafka.m5.large`).
  # See
  # https://docs.aws.amazon.com/msk/latest/developerguide/msk-create-cluster.html#br
  # ker-instance-types for available instance types.
  instance_type = <string>

  # Kafka version to install. See
  # https://docs.aws.amazon.com/msk/latest/developerguide/supported-kafka-versions.h
  # ml for a list of supported versions.
  kafka_version = <string>

  # The subnet IDs into which the broker instances should be deployed. You should
  # typically pass in one subnet ID per node in the cluster_size variable. The
  # number of broker nodes must be a multiple of subnets. We strongly recommend that
  # you run Kafka in private subnets.
  subnet_ids = <list(string)>

  # The ID of the VPC in which to deploy the cluster.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of Security Group IDs that should be added to the MSK cluster broker
  # instances.
  additional_security_group_ids = []

  # A list of CIDR-formatted IP address ranges that will be allowed to connect to
  # the Kafka brokers.
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

  # Custom tags to apply to the Kafka broker nodes and all related resources.
  custom_tags = {}

  # A map of custom tags to apply to the Security Group for this MSK Cluster. The
  # key is the tag name and the value is the tag value.
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

  # Indicates whether you want to enable or disable streaming broker logs to Kinesis
  # Data Firehose.
  enable_firehose_logs = false

  # Indicates whether you want to enable or disable streaming broker logs to S3.
  enable_s3_logs = false

  # You may specify a KMS key short ID or ARN (it will always output an ARN) to use
  # for encrypting your data at rest. If no key is specified, an AWS managed KMS
  # ('aws/msk' managed service) key will be used for encrypting the data at rest.
  encryption_at_rest_kms_key_arn = null

  # Encryption setting for data in transit between clients and brokers. Valid
  # values: TLS, TLS_PLAINTEXT, and PLAINTEXT. Default value is `TLS`.
  encryption_in_transit_client_broker = "TLS"

  # Whether data communication among broker nodes is encrypted. Default value: true.
  encryption_in_transit_in_cluster = true

  # Specify the desired enhanced MSK CloudWatch monitoring level. See
  # https://docs.aws.amazon.com/msk/latest/developerguide/metrics-details.html for
  # valid values.
  enhanced_monitoring = "DEFAULT"

  # Name of the Kinesis Data Firehose delivery stream to deliver logs to.
  firehose_delivery_stream = null

  # The initial size of the EBS volume (in GiB) for the data drive on each broker
  # node. 
  initial_ebs_volume_size = 50

  # Indicates whether you want to enable or disable the Prometheus JMX Exporter.
  open_monitoring_enable_jmx_exporter = false

  # Indicates whether you want to enable or disable the Prometheus Node Exporter.
  open_monitoring_enable_node_exporter = false

  # Override automatically created Service-linked role for storage autoscaling. If
  # not provided, Application Auto Scaling creates the appropriate service-linked
  # role for you.
  override_broker_storage_autoscaling_role_arn = null

  # Name of the S3 bucket to deliver logs to.
  s3_logs_bucket = null

  # Prefix to append to the folder name.
  s3_logs_prefix = null

  # Contents of the server.properties file. Supported properties are documented in
  # the MSK Developer Guide
  # (https://docs.aws.amazon.com/msk/latest/developerguide/msk-configuration-propert
  # es.html).
  server_properties = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S MSK MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/msk?ref=v0.10.2"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the Kafka cluster (e.g. kafka-stage). This variable is used to
  # namespace all resources created by this module.
  cluster_name = <string>

  # The number of brokers to have in the cluster.
  cluster_size = <number>

  # Specify the instance type to use for the kafka brokers (e.g. `kafka.m5.large`).
  # See
  # https://docs.aws.amazon.com/msk/latest/developerguide/msk-create-cluster.html#br
  # ker-instance-types for available instance types.
  instance_type = <string>

  # Kafka version to install. See
  # https://docs.aws.amazon.com/msk/latest/developerguide/supported-kafka-versions.h
  # ml for a list of supported versions.
  kafka_version = <string>

  # The subnet IDs into which the broker instances should be deployed. You should
  # typically pass in one subnet ID per node in the cluster_size variable. The
  # number of broker nodes must be a multiple of subnets. We strongly recommend that
  # you run Kafka in private subnets.
  subnet_ids = <list(string)>

  # The ID of the VPC in which to deploy the cluster.
  vpc_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of Security Group IDs that should be added to the MSK cluster broker
  # instances.
  additional_security_group_ids = []

  # A list of CIDR-formatted IP address ranges that will be allowed to connect to
  # the Kafka brokers.
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

  # Custom tags to apply to the Kafka broker nodes and all related resources.
  custom_tags = {}

  # A map of custom tags to apply to the Security Group for this MSK Cluster. The
  # key is the tag name and the value is the tag value.
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

  # Indicates whether you want to enable or disable streaming broker logs to Kinesis
  # Data Firehose.
  enable_firehose_logs = false

  # Indicates whether you want to enable or disable streaming broker logs to S3.
  enable_s3_logs = false

  # You may specify a KMS key short ID or ARN (it will always output an ARN) to use
  # for encrypting your data at rest. If no key is specified, an AWS managed KMS
  # ('aws/msk' managed service) key will be used for encrypting the data at rest.
  encryption_at_rest_kms_key_arn = null

  # Encryption setting for data in transit between clients and brokers. Valid
  # values: TLS, TLS_PLAINTEXT, and PLAINTEXT. Default value is `TLS`.
  encryption_in_transit_client_broker = "TLS"

  # Whether data communication among broker nodes is encrypted. Default value: true.
  encryption_in_transit_in_cluster = true

  # Specify the desired enhanced MSK CloudWatch monitoring level. See
  # https://docs.aws.amazon.com/msk/latest/developerguide/metrics-details.html for
  # valid values.
  enhanced_monitoring = "DEFAULT"

  # Name of the Kinesis Data Firehose delivery stream to deliver logs to.
  firehose_delivery_stream = null

  # The initial size of the EBS volume (in GiB) for the data drive on each broker
  # node. 
  initial_ebs_volume_size = 50

  # Indicates whether you want to enable or disable the Prometheus JMX Exporter.
  open_monitoring_enable_jmx_exporter = false

  # Indicates whether you want to enable or disable the Prometheus Node Exporter.
  open_monitoring_enable_node_exporter = false

  # Override automatically created Service-linked role for storage autoscaling. If
  # not provided, Application Auto Scaling creates the appropriate service-linked
  # role for you.
  override_broker_storage_autoscaling_role_arn = null

  # Name of the S3 bucket to deliver logs to.
  s3_logs_bucket = null

  # Prefix to append to the folder name.
  s3_logs_prefix = null

  # Contents of the server.properties file. Supported properties are documented in
  # the MSK Developer Guide
  # (https://docs.aws.amazon.com/msk/latest/developerguide/msk-configuration-propert
  # es.html).
  server_properties = {}

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

<HclListItem name="cluster_size" requirement="required" type="number">
<HclListItemDescription>

The number of brokers to have in the cluster.

</HclListItemDescription>
</HclListItem>

<HclListItem name="instance_type" requirement="required" type="string">
<HclListItemDescription>

Specify the instance type to use for the kafka brokers (e.g. `kafka.m5.large`). See https://docs.aws.amazon.com/msk/latest/developerguide/msk-create-cluster.html#broker-instance-types for available instance types.

</HclListItemDescription>
</HclListItem>

<HclListItem name="kafka_version" requirement="required" type="string">
<HclListItemDescription>

Kafka version to install. See https://docs.aws.amazon.com/msk/latest/developerguide/supported-kafka-versions.html for a list of supported versions.

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
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v0.10.2/modules/msk/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v0.10.2/modules/msk/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v0.10.2/modules/msk/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "1ba60853d34b3e11e7a2ae1efb43d61e"
}
##DOCS-SOURCER-END -->
