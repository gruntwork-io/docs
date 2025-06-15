---
title: "Simple Queuing Service (SQS) Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Messaging" version="0.13.1" lastModifiedVersion="0.13.0"/>

# Simple Queuing Service (SQS) Module

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/tree/v0.13.1/modules/sqs" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v0.13.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module makes it easy to deploy an SQS queue along with policies for the topic.

## Deployment Examples

### Restrict Access Only By IP

An example with NO IAM AUTHENTICATION required, ONLY IP based restrictions are used. Allowed IPs based on the value of `var.allowed_cidr_blocks`

```hcl-terraform
module "sqs" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/sqs?ref=v0.1.4"

  name = "my-queue"

  apply_ip_queue_policy = true

  # Allow unauthenticated access from a CIDR block
  allowed_cidr_blocks = [
    "10.10.1.0/22"
  ]
  
  visibility_timeout_seconds = 60
  message_retention_seconds = 86400   #1 day
  max_message_size = 131072           #128kb
  delay_seconds = 10
  receive_wait_time_seconds = 20
  fifo_queue = true
}
```

### Require IAM Permissions for Queue Access

An example of a queue policy is not used and permissions to the queue are handled outside of this module in IAM policies attached to roles or users.

```hcl-terraform
module "sqs" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/sqs?ref=v0.1.4"

  name = "my-queue"
  
  visibility_timeout_seconds = 60
  message_retention_seconds = 86400   #1 day
  max_message_size = 131072           #128kb
  delay_seconds = 10
  receive_wait_time_seconds = 20
  fifo_queue = true
}
```

### Include a Dead Letter Queue

An example of how to use this module to create a queue with a dead-letter queue.

```hcl-terraform
module "sqs" {
  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/sqs?ref=v0.1.4"

  name = "my-queue-with-dead-letter"
  dead_letter_queue = true
  max_receive_count = 10
}
```

## How do I access the SQS queue?

This module includes several [Terraform outputs](https://www.terraform.io/intro/getting-started/outputs.html),
including:

1.  `queue_arn`: The ARN of the created queue
2.  `dead_letter_queue_arn` The ARN of the dead letter queue

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S SQS MODULE
# ------------------------------------------------------------------------------------------------------

module "sqs" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/sqs?ref=v0.13.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the queue. Note that this module may append '.fifo' to this name
  # depending on the value of var.fifo_queue.
  name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of CIDR-formatted IP address ranges that are allowed to access this
  # queue. Required when var.apply_ip_queue_policy = true.
  allowed_cidr_blocks = []

  # Should the ip access policy be attached to the queue (using
  # var.allowed_cidr_blocks)?
  apply_ip_queue_policy = false

  # Set to true to enable content-based deduplication for FIFO queues.
  content_based_deduplication = false

  # If you set this variable to false, this module will not create any
  # resources. This is used as a workaround because Terraform does not allow you
  # to use the 'count' parameter on modules. By using this parameter, you can
  # optionally create or not create the resources within this module.
  create_resources = true

  # A map of tags to apply to the dead letter queue, on top of the custom_tags.
  # The key is the tag name and the value is the tag value. Note that tags
  # defined here will override tags defined as custom_tags in case of conflict.
  custom_dlq_tags = {}

  # A map of custom tags to apply to the sqs queue. The key is the tag name and
  # the value is the tag value.
  custom_tags = {}

  # Set to true to enable a dead letter queue. Messages that cannot be
  # processed/consumed successfully will be sent to a second queue so you can
  # set aside these messages and analyze what went wrong.
  dead_letter_queue = false

  # Specifies whether message deduplication occurs at the message group or queue
  # level. Valid values are messageGroup and queue (default). Only used if
  # fifo_queue is set to true.
  deduplication_scope = "queue"

  # The time in seconds that the delivery of all messages in the queue will be
  # delayed. An integer from 0 to 900 (15 minutes).
  delay_seconds = 0

  # The time in seconds that the delivery of all messages in the dead letter
  # queue will be delayed. An integer from 0 to 900 (15 minutes). The default
  # value is set to the same value as `delay_seconds`
  dlq_delay_seconds = null

  # The number of seconds Amazon dead letter SQS retains a message. Integer
  # representing seconds, from 60 (1 minute) to 1209600 (14 days). The default
  # value is set to the same value as `message_retention_seconds`.
  dlq_message_retention_seconds = null

  # The JSON policy for the dead letter queue
  dlq_policy = null

  # The time for which a ReceiveMessage call will wait for a dead letter queue
  # message to arrive (long polling) before returning. An integer from 0 to 20
  # (seconds). Setting this to 0 means the call will return immediately. The
  # default value is set to the same value as `receive_wait_time_seconds`
  dlq_receive_wait_time_seconds = null

  # The visibility timeout for the dead letter queue. An integer from 0 to 43200
  # (12 hours). The default value is set to the same value as
  # `visibility_timeout_seconds`
  dlq_visibility_timeout_seconds = null

  # Set to true to make this a FIFO queue.
  fifo_queue = false

  # Specifies whether the FIFO queue throughput quota applies to the entire
  # queue or per message group. Valid values are perQueue (default) and
  # perMessageGroupId. Only used if fifo_queue is set to true.
  fifo_throughput_limit = "perQueue"

  # The length of time, in seconds, for which Amazon SQS can reuse a data key to
  # encrypt or decrypt messages before calling AWS KMS again. An integer
  # representing seconds, between 60 seconds (1 minute) and 86,400 seconds (24
  # hours)
  kms_data_key_reuse_period_seconds = 300

  # The ID of an AWS-managed customer master key (such as 'alias/aws/sqs') for
  # Amazon SQS or a custom CMK. Make sure `sqs_managed_sse_enabled` is set to
  # false (by default) when using your custom master key for encryption.
  kms_master_key_id = null

  # The limit of how many bytes a message can contain before Amazon SQS rejects
  # it. An integer from 1024 bytes (1 KiB) up to 262144 bytes (256 KiB).
  max_message_size = 262144

  # The maximum number of times that a message can be received by consumers.
  # When this value is exceeded for a message the message will be automatically
  # sent to the Dead Letter Queue. Only used if var.dead_letter_queue is true.
  max_receive_count = 3

  # The number of seconds Amazon SQS retains a message. Integer representing
  # seconds, from 60 (1 minute) to 1209600 (14 days).
  message_retention_seconds = 345600

  # The JSON policy for the SQS queue
  queue_policy = null

  # The time for which a ReceiveMessage call will wait for a message to arrive
  # (long polling) before returning. An integer from 0 to 20 (seconds). Setting
  # this to 0 means the call will return immediately.
  receive_wait_time_seconds = 0

  # (Optional) Boolean to enable server-side encryption (SSE) of message content
  # with SQS-owned encryption keys. See Encryption at rest. Terraform will only
  # perform drift detection of its value when present in a configuration. You
  # cannot use this with `kms_master_key_id`.
  sqs_managed_sse_enabled = null

  # The visibility timeout for the queue. An integer from 0 to 43200 (12 hours).
  visibility_timeout_seconds = 30

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S SQS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/sqs?ref=v0.13.1"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the queue. Note that this module may append '.fifo' to this name
  # depending on the value of var.fifo_queue.
  name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of CIDR-formatted IP address ranges that are allowed to access this
  # queue. Required when var.apply_ip_queue_policy = true.
  allowed_cidr_blocks = []

  # Should the ip access policy be attached to the queue (using
  # var.allowed_cidr_blocks)?
  apply_ip_queue_policy = false

  # Set to true to enable content-based deduplication for FIFO queues.
  content_based_deduplication = false

  # If you set this variable to false, this module will not create any
  # resources. This is used as a workaround because Terraform does not allow you
  # to use the 'count' parameter on modules. By using this parameter, you can
  # optionally create or not create the resources within this module.
  create_resources = true

  # A map of tags to apply to the dead letter queue, on top of the custom_tags.
  # The key is the tag name and the value is the tag value. Note that tags
  # defined here will override tags defined as custom_tags in case of conflict.
  custom_dlq_tags = {}

  # A map of custom tags to apply to the sqs queue. The key is the tag name and
  # the value is the tag value.
  custom_tags = {}

  # Set to true to enable a dead letter queue. Messages that cannot be
  # processed/consumed successfully will be sent to a second queue so you can
  # set aside these messages and analyze what went wrong.
  dead_letter_queue = false

  # Specifies whether message deduplication occurs at the message group or queue
  # level. Valid values are messageGroup and queue (default). Only used if
  # fifo_queue is set to true.
  deduplication_scope = "queue"

  # The time in seconds that the delivery of all messages in the queue will be
  # delayed. An integer from 0 to 900 (15 minutes).
  delay_seconds = 0

  # The time in seconds that the delivery of all messages in the dead letter
  # queue will be delayed. An integer from 0 to 900 (15 minutes). The default
  # value is set to the same value as `delay_seconds`
  dlq_delay_seconds = null

  # The number of seconds Amazon dead letter SQS retains a message. Integer
  # representing seconds, from 60 (1 minute) to 1209600 (14 days). The default
  # value is set to the same value as `message_retention_seconds`.
  dlq_message_retention_seconds = null

  # The JSON policy for the dead letter queue
  dlq_policy = null

  # The time for which a ReceiveMessage call will wait for a dead letter queue
  # message to arrive (long polling) before returning. An integer from 0 to 20
  # (seconds). Setting this to 0 means the call will return immediately. The
  # default value is set to the same value as `receive_wait_time_seconds`
  dlq_receive_wait_time_seconds = null

  # The visibility timeout for the dead letter queue. An integer from 0 to 43200
  # (12 hours). The default value is set to the same value as
  # `visibility_timeout_seconds`
  dlq_visibility_timeout_seconds = null

  # Set to true to make this a FIFO queue.
  fifo_queue = false

  # Specifies whether the FIFO queue throughput quota applies to the entire
  # queue or per message group. Valid values are perQueue (default) and
  # perMessageGroupId. Only used if fifo_queue is set to true.
  fifo_throughput_limit = "perQueue"

  # The length of time, in seconds, for which Amazon SQS can reuse a data key to
  # encrypt or decrypt messages before calling AWS KMS again. An integer
  # representing seconds, between 60 seconds (1 minute) and 86,400 seconds (24
  # hours)
  kms_data_key_reuse_period_seconds = 300

  # The ID of an AWS-managed customer master key (such as 'alias/aws/sqs') for
  # Amazon SQS or a custom CMK. Make sure `sqs_managed_sse_enabled` is set to
  # false (by default) when using your custom master key for encryption.
  kms_master_key_id = null

  # The limit of how many bytes a message can contain before Amazon SQS rejects
  # it. An integer from 1024 bytes (1 KiB) up to 262144 bytes (256 KiB).
  max_message_size = 262144

  # The maximum number of times that a message can be received by consumers.
  # When this value is exceeded for a message the message will be automatically
  # sent to the Dead Letter Queue. Only used if var.dead_letter_queue is true.
  max_receive_count = 3

  # The number of seconds Amazon SQS retains a message. Integer representing
  # seconds, from 60 (1 minute) to 1209600 (14 days).
  message_retention_seconds = 345600

  # The JSON policy for the SQS queue
  queue_policy = null

  # The time for which a ReceiveMessage call will wait for a message to arrive
  # (long polling) before returning. An integer from 0 to 20 (seconds). Setting
  # this to 0 means the call will return immediately.
  receive_wait_time_seconds = 0

  # (Optional) Boolean to enable server-side encryption (SSE) of message content
  # with SQS-owned encryption keys. See Encryption at rest. Terraform will only
  # perform drift detection of its value when present in a configuration. You
  # cannot use this with `kms_master_key_id`.
  sqs_managed_sse_enabled = null

  # The visibility timeout for the queue. An integer from 0 to 43200 (12 hours).
  visibility_timeout_seconds = 30

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

The name of the queue. Note that this module may append '.fifo' to this name depending on the value of <a href="#fifo_queue"><code>fifo_queue</code></a>.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="allowed_cidr_blocks" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of CIDR-formatted IP address ranges that are allowed to access this queue. Required when <a href="#apply_ip_queue_policy"><code>apply_ip_queue_policy</code></a> = true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
<HclGeneralListItem title="More Details">
<details>


```hcl

   If var.apply_ip_queue_policy = true, a VALID CDIR block must be provided (e.g. "0.0.0.0/0")

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="apply_ip_queue_policy" requirement="optional" type="bool">
<HclListItemDescription>

Should the ip access policy be attached to the queue (using <a href="#allowed_cidr_blocks"><code>allowed_cidr_blocks</code></a>)?

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="content_based_deduplication" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable content-based deduplication for FIFO queues.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

If you set this variable to false, this module will not create any resources. This is used as a workaround because Terraform does not allow you to use the 'count' parameter on modules. By using this parameter, you can optionally create or not create the resources within this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="custom_dlq_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the dead letter queue, on top of the custom_tags. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="custom_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of custom tags to apply to the sqs queue. The key is the tag name and the value is the tag value.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="dead_letter_queue" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable a dead letter queue. Messages that cannot be processed/consumed successfully will be sent to a second queue so you can set aside these messages and analyze what went wrong.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="deduplication_scope" requirement="optional" type="string">
<HclListItemDescription>

Specifies whether message deduplication occurs at the message group or queue level. Valid values are messageGroup and queue (default). Only used if fifo_queue is set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;queue&quot;"/>
</HclListItem>

<HclListItem name="delay_seconds" requirement="optional" type="number">
<HclListItemDescription>

The time in seconds that the delivery of all messages in the queue will be delayed. An integer from 0 to 900 (15 minutes).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="dlq_delay_seconds" requirement="optional" type="number">
<HclListItemDescription>

The time in seconds that the delivery of all messages in the dead letter queue will be delayed. An integer from 0 to 900 (15 minutes). The default value is set to the same value as `delay_seconds`

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="dlq_message_retention_seconds" requirement="optional" type="number">
<HclListItemDescription>

The number of seconds Amazon dead letter SQS retains a message. Integer representing seconds, from 60 (1 minute) to 1209600 (14 days). The default value is set to the same value as `message_retention_seconds`.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="dlq_policy" requirement="optional" type="string">
<HclListItemDescription>

The JSON policy for the dead letter queue

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="dlq_receive_wait_time_seconds" requirement="optional" type="number">
<HclListItemDescription>

The time for which a ReceiveMessage call will wait for a dead letter queue message to arrive (long polling) before returning. An integer from 0 to 20 (seconds). Setting this to 0 means the call will return immediately. The default value is set to the same value as `receive_wait_time_seconds`

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="dlq_visibility_timeout_seconds" requirement="optional" type="number">
<HclListItemDescription>

The visibility timeout for the dead letter queue. An integer from 0 to 43200 (12 hours). The default value is set to the same value as `visibility_timeout_seconds`

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="fifo_queue" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to make this a FIFO queue.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="fifo_throughput_limit" requirement="optional" type="string">
<HclListItemDescription>

Specifies whether the FIFO queue throughput quota applies to the entire queue or per message group. Valid values are perQueue (default) and perMessageGroupId. Only used if fifo_queue is set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;perQueue&quot;"/>
</HclListItem>

<HclListItem name="kms_data_key_reuse_period_seconds" requirement="optional" type="number">
<HclListItemDescription>

The length of time, in seconds, for which Amazon SQS can reuse a data key to encrypt or decrypt messages before calling AWS KMS again. An integer representing seconds, between 60 seconds (1 minute) and 86,400 seconds (24 hours)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="300"/>
</HclListItem>

<HclListItem name="kms_master_key_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of an AWS-managed customer master key (such as 'alias/aws/sqs') for Amazon SQS or a custom CMK. Make sure `sqs_managed_sse_enabled` is set to false (by default) when using your custom master key for encryption.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="max_message_size" requirement="optional" type="number">
<HclListItemDescription>

The limit of how many bytes a message can contain before Amazon SQS rejects it. An integer from 1024 bytes (1 KiB) up to 262144 bytes (256 KiB).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="262144"/>
</HclListItem>

<HclListItem name="max_receive_count" requirement="optional" type="number">
<HclListItemDescription>

The maximum number of times that a message can be received by consumers. When this value is exceeded for a message the message will be automatically sent to the Dead Letter Queue. Only used if <a href="#dead_letter_queue"><code>dead_letter_queue</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="3"/>
</HclListItem>

<HclListItem name="message_retention_seconds" requirement="optional" type="number">
<HclListItemDescription>

The number of seconds Amazon SQS retains a message. Integer representing seconds, from 60 (1 minute) to 1209600 (14 days).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="345600"/>
</HclListItem>

<HclListItem name="queue_policy" requirement="optional" type="string">
<HclListItemDescription>

The JSON policy for the SQS queue

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="receive_wait_time_seconds" requirement="optional" type="number">
<HclListItemDescription>

The time for which a ReceiveMessage call will wait for a message to arrive (long polling) before returning. An integer from 0 to 20 (seconds). Setting this to 0 means the call will return immediately.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="0"/>
</HclListItem>

<HclListItem name="sqs_managed_sse_enabled" requirement="optional" type="bool">
<HclListItemDescription>

(Optional) Boolean to enable server-side encryption (SSE) of message content with SQS-owned encryption keys. See Encryption at rest. Terraform will only perform drift detection of its value when present in a configuration. You cannot use this with `kms_master_key_id`.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="visibility_timeout_seconds" requirement="optional" type="number">
<HclListItemDescription>

The visibility timeout for the queue. An integer from 0 to 43200 (12 hours).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="dead_letter_queue_arn">
</HclListItem>

<HclListItem name="dead_letter_queue_name">
</HclListItem>

<HclListItem name="dead_letter_queue_url">
</HclListItem>

<HclListItem name="queue_arn">
</HclListItem>

<HclListItem name="queue_name">
</HclListItem>

<HclListItem name="queue_url">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v0.13.1/modules/sqs/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v0.13.1/modules/sqs/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v0.13.1/modules/sqs/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "b1319c69625a6f617c2a205244458fea"
}
##DOCS-SOURCER-END -->
