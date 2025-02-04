---
title: "Kinesis Data Stream Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Messaging" version="0.13.0" lastModifiedVersion="0.13.0"/>

# Kinesis Data Stream Module

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/tree/v0.13.0/modules/kinesis" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.13.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module creates a [Kinesis Data Stream](https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html).

## About Kinesis Data Stream

A Kinesis data stream is a set of shards. Each shard has a sequence of data records. Each data record has a sequence
number that is assigned by Kinesis Data Streams.

*   **data record**: A data record is the unit of data stored in a Kinesis data stream. Data records are composed of a
    sequence number, a partition key, and a data blob, which is an immutable sequence of bytes.
*   **shard**: A shard is a uniquely identified sequence of data records in a stream. A stream is composed of one or more
    shards, each of which provides a fixed unit of capacity.
*   **sequence number**: Each data record has a sequence number that is unique per partition-key within its shard. Kinesis
    Data Streams assigns the sequence number after you write to the stream with client.putRecords or client.putRecord.
    Sequence numbers for the same partition key generally increase over time. The longer the time period between write
    requests, the larger the sequence numbers become.

### Sharding / Partitioning in Kinesis Data Stream

Kinesis Data Stream achieves scalability by using [shards](https://en.wikipedia.org/wiki/Shard_\(database_architecture\)).
The data capacity of your stream is a function of the number of shards that you specify for the stream. The total
capacity of the stream is the sum of the capacities of its shards.

#### How to Set Shard Size

You can configure the initial number of shards in two ways:

*   **direct specification**: specify `number_of_shards` directly
*   **indirect specification**: specify the `average_data_size_in_kb`, `records_per_second` and `number_of_consumers`
    variables and let the module calculate the initial number of shards.

**Note**: the module calculates the initial number of shards by:

1.  Calculate the incoming write bandwidth in KB (incoming_write_bandwidth_in_KB), which is equal to the
    average_data_size_in_KB multiplied by the number_of_records_per_second.
2.  Calculate the outgoing read bandwidth in KB (outgoing_read_bandwidth_in_KB), which is equal to the
    incoming_write_bandwidth_in_KB multiplied by the number_of_consumers.
3.  You can then calculate the initial number of shards (number_of_shards) your data stream needs using the following
    formula: number_of_shards = max (incoming_write_bandwidth_in_KB/1000, outgoing_read_bandwidth_in_KB/2000)

Refer
to [the suggestion of calculating the initial number of shards FAQ](https://aws.amazon.com/kinesis/data-streams/faqs/?nc=sn\&loc=6)
for more information.

### How does Data Partition Work

A partition key is used to group data by shard within a stream. Kinesis Data Streams segregates the data records
belonging to a stream into multiple shards. It uses the partition key that is associated with each data record to
determine which shard a given data record belongs to. When an application puts data into a stream, it must specify a
partition key.

With a single shard, all data goes into the same shard. There's no other way to use a custom partitioning logic.

### How to Re-Shard a Stream

Re-configuring the shard size will result destroying the old Kinesis data stream and re-creating it with a new one. In
order to prevent this, consider
using [the UpdateShardCount API](https://docs.aws.amazon.com/kinesis/latest/APIReference/API_UpdateShardCount.html).
Updating the shard count is an asynchronous operation. To update the shard count, Kinesis Data Streams performs splits
or merges on individual shards. This can cause short-lived shards to be created, in addition to the final shards. These
short-lived shards count towards your total shard limit for your account in the Region.
You can find more information in the following pages:

*   [Resharding a Stream](https://docs.aws.amazon.com/streams/latest/dev/kinesis-using-sdk-java-resharding.html)
*   https://github.com/hashicorp/terraform/issues/11816

### Limitation

Here are some limitation of the Kinesis Data stream you might be interested in :

*   **Data Payload Size**: The maximum size of the data payload of a record before base64-encoding is up to 1 MB.
*   **Retention Period**: The maximum value of a stream's retention period is 8760 hours (365 days).
*   **Shard Throughput**: Each shard can support up to 1 MB/sec or 1,000 records/sec write throughput or up to 2 MB/sec or
    2,000 records/sec read throughput.

You can find the latest and full list of limitation/quotas in this page:
[Quotas and Limits](https://docs.aws.amazon.com/streams/latest/dev/service-sizes-and-limits.html).

### Encryption

Amazon Kinesis Data Streams can automatically encrypt sensitive data as it enters into a stream. Kinesis Data
Streams uses AWS KMS master keys for encryption. With server-side encryption, your Kinesis stream producers and
consumers don't need to manage master keys or cryptographic operations. Your data is automatically encrypted as it
enters and leaves the Kinesis Data Streams service, so your data at rest is encrypted. For more information,
see [Data Protection in Amazon Kinesis Data
Streams](https://docs.aws.amazon.com/streams/latest/dev/server-side-encryption.html).

#### How to Enable Encryption

You can enable encryption in two ways:

*   **default encryption**: set `encryption_type = "KMS"`. This will use the default AWS service key for
    Kinesis, `aws/kinesis`.
*   **custom key encryption**: If you need to use a Customer Managed Key (CMK), see the
    [master key module](https://github.com/gruntwork-io/module-security-public/tree/master/modules/kms-master-key) as well
    as
    [documentation on user-generated KMS master keys](https://docs.aws.amazon.com/streams/latest/dev/creating-using-sse-master-keys.html)
    for further information on how to create them. You can specify one using `kms_key_id = "alias/<my_cmk_alias>"`

#### How to Change KMS Key

You can change the KMS key by reconfiguring the encryption with the `kms_key_id` and `encryption_type` variables.

Please note that changing the KMS key for a Kinesis Data Stream does not retroactively re-encrypt previously encrypted
data in the stream with the new KMS key. Any data that was previously encrypted with the old KMS key will remain
encrypted with that key. However, any new data added to the stream after the KMS key change will be encrypted with the
new KMS key.

If you need to re-encrypt the previously encrypted data in the stream with the new KMS key, you will need to manually
copy the data to a new stream that is configured to use the new KMS key for encryption. Alternatively, you can use AWS
Lambda or other AWS services to read the data from the original stream, decrypt it using the old KMS key, and then
re-encrypt it with the new KMS key before writing it to a new stream or another data store.

### Replication

Amazon Kinesis Data Stream does not support replication out of the box. One way to implement replication is to use
Lambda. You can find more information from this AWS
article: [Build highly available streams with Amazon Kinesis Data Streams
](https://aws.amazon.com/blogs/big-data/build-highly-available-streams-with-amazon-kinesis-data-streams/)

There is also a sample prototype from AWS that demonstrates continuous data capture (CDC) to replicate data across
regions: https://github.com/aws-samples/aws-kinesis-data-streams-replicator

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S KINESIS MODULE
# ------------------------------------------------------------------------------------------------------

module "kinesis" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/kinesis?ref=v0.13.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the Kinesis stream.
  name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The average size of the data record written to the stream in kilobytes (KB),
  # rounded up to the nearest 1 KB
  average_data_size_in_kb = 0

  # The type of encryption to use (can be KMS or NONE). Default to use KMS key
  # for encryption at rest.
  encryption_type = "KMS"

  # A boolean that indicates all registered consumers should be deregistered
  # from the stream so that the stream can be destroyed without error.
  enforce_consumer_deletion = false

  # ID of the key to use for KMS
  kms_key_id = "alias/aws/kinesis"

  # The number of Amazon Kinesis Streams applications that consume data
  # concurrently and independently from the stream, that is, the consumers
  number_of_consumers = 0

  # A shard is a group of data records in a stream. When you create a stream,
  # you specify the number of shards for the stream.
  number_of_shards = null

  # The number of data records written to and read from the stream per second
  records_per_second = 0

  # Length of time data records are accessible after they are added to the
  # stream. The maximum value of a stream's retention period is 168 hours.
  # Minimum value is 24.
  retention_period = 24

  # The additional shard-level CloudWatch metrics to enable
  shard_level_metrics = []

  # Specifies the capacity mode of the stream. Must be either PROVISIONED or
  # ON_DEMAND. When you are using PROVISIONED mode, you must set either the
  # shard_count directly or set the average_data_size_in_kb, records_per_second,
  # and number_of_consumers
  stream_mode = null

  # A map of key value pairs to apply as tags to the Kinesis stream.
  tags = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S KINESIS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/kinesis?ref=v0.13.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the Kinesis stream.
  name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The average size of the data record written to the stream in kilobytes (KB),
  # rounded up to the nearest 1 KB
  average_data_size_in_kb = 0

  # The type of encryption to use (can be KMS or NONE). Default to use KMS key
  # for encryption at rest.
  encryption_type = "KMS"

  # A boolean that indicates all registered consumers should be deregistered
  # from the stream so that the stream can be destroyed without error.
  enforce_consumer_deletion = false

  # ID of the key to use for KMS
  kms_key_id = "alias/aws/kinesis"

  # The number of Amazon Kinesis Streams applications that consume data
  # concurrently and independently from the stream, that is, the consumers
  number_of_consumers = 0

  # A shard is a group of data records in a stream. When you create a stream,
  # you specify the number of shards for the stream.
  number_of_shards = null

  # The number of data records written to and read from the stream per second
  records_per_second = 0

  # Length of time data records are accessible after they are added to the
  # stream. The maximum value of a stream's retention period is 168 hours.
  # Minimum value is 24.
  retention_period = 24

  # The additional shard-level CloudWatch metrics to enable
  shard_level_metrics = []

  # Specifies the capacity mode of the stream. Must be either PROVISIONED or
  # ON_DEMAND. When you are using PROVISIONED mode, you must set either the
  # shard_count directly or set the average_data_size_in_kb, records_per_second,
  # and number_of_consumers
  stream_mode = null

  # A map of key value pairs to apply as tags to the Kinesis stream.
  tags = {}

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name of the Kinesis stream.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="average_data_size_in_kb" requirement="optional" type="number">
<HclListItemDescription>

The average size of the data record written to the stream in kilobytes (KB), rounded up to the nearest 1 KB

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="encryption_type" requirement="optional" type="string">
<HclListItemDescription>

The type of encryption to use (can be KMS or NONE). Default to use KMS key for encryption at rest.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;KMS&quot;"/>
</HclListItem>

<HclListItem name="enforce_consumer_deletion" requirement="optional" type="bool">
<HclListItemDescription>

A boolean that indicates all registered consumers should be deregistered from the stream so that the stream can be destroyed without error.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

ID of the key to use for KMS

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;alias/aws/kinesis&quot;"/>
</HclListItem>

<HclListItem name="number_of_consumers" requirement="optional" type="number">
<HclListItemDescription>

The number of Amazon Kinesis Streams applications that consume data concurrently and independently from the stream, that is, the consumers

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="number_of_shards" requirement="optional" type="number">
<HclListItemDescription>

A shard is a group of data records in a stream. When you create a stream, you specify the number of shards for the stream.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="records_per_second" requirement="optional" type="number">
<HclListItemDescription>

The number of data records written to and read from the stream per second

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="retention_period" requirement="optional" type="number">
<HclListItemDescription>

Length of time data records are accessible after they are added to the stream. The maximum value of a stream's retention period is 168 hours. Minimum value is 24.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="24"/>
</HclListItem>

<HclListItem name="shard_level_metrics" requirement="optional" type="list(string)">
<HclListItemDescription>

The additional shard-level CloudWatch metrics to enable

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Possible Values:
  
   shard_level_metrics = [
     "IncomingBytes",
     "IncomingRecords",
     "IteratorAgeMilliseconds",
     "OutgoingBytes",
     "OutgoingRecords",
     "ReadProvisionedThroughputExceeded",
     "WriteProvisionedThroughputExceeded"
   ]

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="stream_mode" requirement="optional" type="string">
<HclListItemDescription>

Specifies the capacity mode of the stream. Must be either PROVISIONED or ON_DEMAND. When you are using PROVISIONED mode, you must set either the shard_count directly or set the average_data_size_in_kb, records_per_second, and number_of_consumers

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of key value pairs to apply as tags to the Kinesis stream.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="encryption_type">
</HclListItem>

<HclListItem name="enforce_consumer_deletion">
</HclListItem>

<HclListItem name="retention_period">
</HclListItem>

<HclListItem name="shard_count">
</HclListItem>

<HclListItem name="stream_arn">
</HclListItem>

<HclListItem name="stream_name">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v0.13.0/modules/kinesis/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v0.13.0/modules/kinesis/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v0.13.0/modules/kinesis/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "fd42a369f17559fec82c870588347715"
}
##DOCS-SOURCER-END -->
