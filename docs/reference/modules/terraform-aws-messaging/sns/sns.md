---
title: "Simple Notification Service (SNS) Topic Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="AWS Messaging" version="1.0.3" lastModifiedVersion="1.0.3"/>

# Simple Notification Service (SNS) Topic Module

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/tree/v1.0.3/modules/sns" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases/tag/v1.0.3" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module makes it easy to deploy a SNS topic along with the publisher and subscriber policies for the topic.

## How do I access the SNS topic?

This module includes several [Terraform outputs](https://www.terraform.io/intro/getting-started/outputs.html),
including:

1.  `topic_name`: The Name of the created topic
2.  `topic_display_name`: The Display Name of the created topic
3.  `topic_arn`: The ARN of the created topic
4.  `topic_policy`: The Access policy of the created topic

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S SNS MODULE
# ------------------------------------------------------------------------------------------------------

module "sns" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/sns?ref=v1.0.3"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the SNS topic.
  name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of IAM ARNs that will be given the rights to publish to the SNS
  # topic.
  allow_publish_accounts = []

  # A list of AWS services that will be given the rights to publish to the SNS
  # topic.
  allow_publish_services = []

  # A list of IAM ARNs that will be given the rights to subscribe to the SNS
  # topic.
  allow_subscribe_accounts = []

  # A list of protocols that are allowed for subscription.
  allow_subscribe_protocols = ["http","https","email","email-json","sms","sqs","application","lambda"]

  # **Requires `enable_fifo = true`.** Flag to enable content-based
  # deduplication for the SNS topic. If set to true, messages with identical
  # content will be treated as duplicates and only delivered once. For more see
  # the [Amazon
  # Docs](https://docs.aws.amazon.com/sns/latest/dg/fifo-message-dedup.html)
  content_based_deduplication = null

  # Enable or disable creation of the resources of this module.
  create_resources = true

  # Delivery policy for sns topic.
  delivery_policy = null

  # The display name of the SNS topic. NOTE: Maximum length is 100 characters.
  display_name = ""

  # Flag to indicate if the SNS topic is FIFO. This will append `.fifo` to the
  # name of the topic.
  enable_fifo = false

  # **Requires `enable_fifo = true`.** Specifies whether the FIFO topic
  # throughput quota applies to the entire topic or per message group. Valid
  # values are `Topic` and `MessageGroup`. Only used if `enable_fifo` is set to
  # true.
  fifo_throughput_scope = null

  # ARN of the http failure feedback role - when using delivery policy for sns
  # topic.
  http_failure_feedback_role_arn = null

  # ARN of the http success feedback role - when using delivery policy for sns
  # topic.
  http_success_feedback_role_arn = null

  # The ID of an AWS-managed customer master key (CMK) for Amazon SNS or a
  # custom CMK
  kms_master_key_id = null

  # **Requires `enable_fifo = true`.** The number of days (up to 365) for Amazon
  # SNS to retain messages. This will be used to create the archive policy for
  # the SNS topic. For more see the [Amazon
  # Docs](https://docs.aws.amazon.com/sns/latest/dg/message-archiving-and-replay-topic-owner.html)
  message_retention_period = null

  # The signature version corresponds to the hashing algorithm used while
  # creating the signature of the notifications, subscription confirmations, or
  # unsubscribe confirmation messages sent by Amazon SNS. Valid values: `1`
  # (SHA1, default), `2` (SHA256).
  signature_version = null

  # A map of key value pairs to apply as tags to the SNS topic.
  tags = {}

  # Tracing mode of an Amazon SNS topic. Valid values: `PassThrough`, `Active`.
  tracing_config = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S SNS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-messaging.git//modules/sns?ref=v1.0.3"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the SNS topic.
  name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A list of IAM ARNs that will be given the rights to publish to the SNS
  # topic.
  allow_publish_accounts = []

  # A list of AWS services that will be given the rights to publish to the SNS
  # topic.
  allow_publish_services = []

  # A list of IAM ARNs that will be given the rights to subscribe to the SNS
  # topic.
  allow_subscribe_accounts = []

  # A list of protocols that are allowed for subscription.
  allow_subscribe_protocols = ["http","https","email","email-json","sms","sqs","application","lambda"]

  # **Requires `enable_fifo = true`.** Flag to enable content-based
  # deduplication for the SNS topic. If set to true, messages with identical
  # content will be treated as duplicates and only delivered once. For more see
  # the [Amazon
  # Docs](https://docs.aws.amazon.com/sns/latest/dg/fifo-message-dedup.html)
  content_based_deduplication = null

  # Enable or disable creation of the resources of this module.
  create_resources = true

  # Delivery policy for sns topic.
  delivery_policy = null

  # The display name of the SNS topic. NOTE: Maximum length is 100 characters.
  display_name = ""

  # Flag to indicate if the SNS topic is FIFO. This will append `.fifo` to the
  # name of the topic.
  enable_fifo = false

  # **Requires `enable_fifo = true`.** Specifies whether the FIFO topic
  # throughput quota applies to the entire topic or per message group. Valid
  # values are `Topic` and `MessageGroup`. Only used if `enable_fifo` is set to
  # true.
  fifo_throughput_scope = null

  # ARN of the http failure feedback role - when using delivery policy for sns
  # topic.
  http_failure_feedback_role_arn = null

  # ARN of the http success feedback role - when using delivery policy for sns
  # topic.
  http_success_feedback_role_arn = null

  # The ID of an AWS-managed customer master key (CMK) for Amazon SNS or a
  # custom CMK
  kms_master_key_id = null

  # **Requires `enable_fifo = true`.** The number of days (up to 365) for Amazon
  # SNS to retain messages. This will be used to create the archive policy for
  # the SNS topic. For more see the [Amazon
  # Docs](https://docs.aws.amazon.com/sns/latest/dg/message-archiving-and-replay-topic-owner.html)
  message_retention_period = null

  # The signature version corresponds to the hashing algorithm used while
  # creating the signature of the notifications, subscription confirmations, or
  # unsubscribe confirmation messages sent by Amazon SNS. Valid values: `1`
  # (SHA1, default), `2` (SHA256).
  signature_version = null

  # A map of key value pairs to apply as tags to the SNS topic.
  tags = {}

  # Tracing mode of an Amazon SNS topic. Valid values: `PassThrough`, `Active`.
  tracing_config = null

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

The name of the SNS topic.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="allow_publish_accounts" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs that will be given the rights to publish to the SNS topic.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_publish_services" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of AWS services that will be given the rights to publish to the SNS topic.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_subscribe_accounts" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of IAM ARNs that will be given the rights to subscribe to the SNS topic.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_subscribe_protocols" requirement="optional" type="list(string)">
<HclListItemDescription>

A list of protocols that are allowed for subscription.

</HclListItemDescription>
<HclListItemDefaultValue>

```hcl
[
  "http",
  "https",
  "email",
  "email-json",
  "sms",
  "sqs",
  "application",
  "lambda"
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="content_based_deduplication" requirement="optional" type="bool">
<HclListItemDescription>

**Requires `enable_fifo = true`.** Flag to enable content-based deduplication for the SNS topic. If set to true, messages with identical content will be treated as duplicates and only delivered once. For more see the [Amazon Docs](https://docs.aws.amazon.com/sns/latest/dg/fifo-message-dedup.html)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Enable or disable creation of the resources of this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="delivery_policy" requirement="optional" type="string">
<HclListItemDescription>

Delivery policy for sns topic.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="display_name" requirement="optional" type="string">
<HclListItemDescription>

The display name of the SNS topic. NOTE: Maximum length is 100 characters.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="enable_fifo" requirement="optional" type="bool">
<HclListItemDescription>

Flag to indicate if the SNS topic is FIFO. This will append `.fifo` to the name of the topic.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="fifo_throughput_scope" requirement="optional" type="string">
<HclListItemDescription>

**Requires `enable_fifo = true`.** Specifies whether the FIFO topic throughput quota applies to the entire topic or per message group. Valid values are `Topic` and `MessageGroup`. Only used if `enable_fifo` is set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="http_failure_feedback_role_arn" requirement="optional" type="string">
<HclListItemDescription>

ARN of the http failure feedback role - when using delivery policy for sns topic.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="http_success_feedback_role_arn" requirement="optional" type="string">
<HclListItemDescription>

ARN of the http success feedback role - when using delivery policy for sns topic.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="kms_master_key_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of an AWS-managed customer master key (CMK) for Amazon SNS or a custom CMK

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="message_retention_period" requirement="optional" type="number">
<HclListItemDescription>

**Requires `enable_fifo = true`.** The number of days (up to 365) for Amazon SNS to retain messages. This will be used to create the archive policy for the SNS topic. For more see the [Amazon Docs](https://docs.aws.amazon.com/sns/latest/dg/message-archiving-and-replay-topic-owner.html)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="signature_version" requirement="optional" type="number">
<HclListItemDescription>

The signature version corresponds to the hashing algorithm used while creating the signature of the notifications, subscription confirmations, or unsubscribe confirmation messages sent by Amazon SNS. Valid values: `1` (SHA1, default), `2` (SHA256).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of key value pairs to apply as tags to the SNS topic.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="tracing_config" requirement="optional" type="string">
<HclListItemDescription>

Tracing mode of an Amazon SNS topic. Valid values: `PassThrough`, `Active`.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="topic_arn">
</HclListItem>

<HclListItem name="topic_display_name">
</HclListItem>

<HclListItem name="topic_name">
</HclListItem>

<HclListItem name="topic_policy">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v1.0.3/modules/sns/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v1.0.3/modules/sns/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/v1.0.3/modules/sns/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "9b531ad092ff1b57e9f4f094b2cd2737"
}
##DOCS-SOURCER-END -->
