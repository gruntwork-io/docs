---
title: "Kinesis Stream Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/tree/main/modules%2Fkinesis" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Kinesis Stream Module

This module makes it easy to deploy a Kinesis stream

## Shard Sizing

Kinesis streams achieve scalability by using [shards](https://en.wikipedia.org/wiki/Shard_\(database_architecture\)). This module allows you to either
specify `number_of_shards` directly or to specify the `average_data_size_in_kb`, `records_per_second` and
`number_of_consumers` variables and the module will calculate the proper number of shards that should be used
based on [AWS best practices](https://docs.aws.amazon.com/streams/latest/dev/amazon-kinesis-streams.html).

`incoming_write_bandwidth_in_kb = average_data_size_in_kb * records_per_second`

`outgoing_read_bandwidth_in_kb = incoming_write_bandwidth_in_kb * number_of_consumers`

`number_of_shards = max(incoming_write_bandwidth_in_kb/1000, outgoing_read_bandwidth_in_kb/2000)`

## Encryption

Kinesis streams support server-side encryption as described in the
[Kinesis SSE documentation](https://docs.aws.amazon.com/streams/latest/dev/what-is-sse.html). It can be switched
on retrospectively for existing streams with no interruptions (although only new data will be encrypted).

To enable encryption, set the following parameter

`encryption_type = "SSE"`

This will use the default AWS service key for Kinesis, `aws/kinesis`.

If you need to use a custom key, see the
[master key module](https://github.com/gruntwork-io/module-security-public/tree/master/modules/kms-master-key) as well as
[documentation on user-generated KMS master keys](https://docs.aws.amazon.com/streams/latest/dev/creating-using-sse-master-keys.html)
for further information on how to create them. You can specify one using

`kms_key_id = "alias/<my_cmk_alias>"`

## Examples

Here are some examples of how you might deploy a Kinesis stream with this module:

```hcl-terraform
module "kinesis" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/kinesis?ref=v0.0.1"

  name = "my-stream"
  retention_period = 48

  number_of_shards = 1
  shard_level_metrics = [
    "IncomingBytes",
    "IncomingRecords",
    "IteratorAgeMilliseconds",
    "OutgoingBytes",
    "OutgoingRecords",
    "ReadProvisionedThroughputExceeded",
    "WriteProvisionedThroughputExceeded"
  ]
 
}
```

```hcl-terraform
module "kinesis" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/kinesis?ref=v0.0.1"
  name = "my-stream"
  retention_period = 48
  
  average_data_size_in_kb = 20
  records_per_second = 10
  number_of_consumers = 10
  
  shard_level_metrics = [
      "ReadProvisionedThroughputExceeded",
      "WriteProvisionedThroughputExceeded"
    ]
}
```




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

The type of encryption to use (can be KMS or NONE)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;NONE&quot;"/>
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
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/modules%2Fkinesis%2Freadme.md",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/modules%2Fkinesis%2Fvariables.tf",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/modules%2Fkinesis%2Foutputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "1a6d900b06b06ca0d1dd48065fda80f4"
}
##DOCS-SOURCER-END -->
