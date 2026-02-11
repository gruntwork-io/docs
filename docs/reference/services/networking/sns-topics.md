---
type: "service"
name: "SNS Topics"
description: "Create Amazon Simple Notification Service topics."
category: "networking"
cloud: "aws"
tags: ["sns","messaging","networking"]
license: "gruntwork"
built-with: "terraform"
title: "Amazon Simple Notification Service"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="1.2.0" lastModifiedVersion="0.148.0"/>

# Amazon Simple Notification Service

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v1.2.0/modules/networking/sns-topics" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=networking%2Fsns-topics" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>

## Overview

This service contains code to create [Amazon SNS topics](https://aws.amazon.com/sns/).

![SNS architecture](/img/reference/services/networking/sns-architecture.png)

## Features

*   Creates an SNS topic
*   Attaches topic policies allowing publishing, subscribing, or both from given AWS accounts
*   Optionally publishes notifications to Slack

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

*   [SNS Documentation](https://docs.aws.amazon.com/sns/): Amazon’s docs for SNS that cover core concepts and configuration
*   [How do SNS topics work?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v1.2.0/modules/networking/sns-topics/core-concepts.md#how-do-sns-topics-work)
*   [How do I get notified when a message is published to an SNS Topic?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v1.2.0/modules/networking/sns-topics/core-concepts.md#how-do-i-get-notified)

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v1.2.0/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v1.2.0/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.


## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S SNS-TOPICS MODULE
# ------------------------------------------------------------------------------------------------------

module "sns_topics" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/networking/sns-topics?ref=v1.2.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the SNS topic
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

  # A list of protocols that can be used to subscribe to the SNS topic.
  allow_subscribe_protocols = ["http","https","email","email-json","sms","sqs","application","lambda"]

  # **Requires `enable_fifo = true`.** Flag to enable content-based
  # deduplication for the SNS topic. If set to true, messages with identical
  # content will be treated as duplicates and only delivered once. For more see
  # the [Amazon
  # Docs](https://docs.aws.amazon.com/sns/latest/dg/fifo-message-dedup.html)
  content_based_deduplication = null

  # Set to false to have this module create no resources. This weird parameter
  # exists solely because Terraform does not support conditional modules.
  # Therefore, this is a hack to allow you to conditionally decide if the
  # resources should be created or not.
  create_resources = true

  # Delivery policy for sns topic.
  delivery_policy = null

  # The display name of the SNS topic
  display_name = ""

  # Set to true to enable advanced formatting for CloudWatch alarms in Slack.
  # This will use the CloudWatchNotification class for richer messages.
  enable_advanced_formatting = false

  # Flag to indicate if the SNS topic is FIFO. This will append `.fifo` to the
  # name of the topic.
  enable_fifo = false

  # ARN of the http failure feedback role - when using delivery policy for sns
  # topic.
  http_failure_feedback_role_arn = null

  # ARN of the http success feedback role - when using delivery policy for sns
  # topic.
  http_success_feedback_role_arn = null

  # The ID of an AWS-managed customer master key (CMK) for Amazon SNS or a
  # custom CMK
  kms_master_key_id = "alias/aws/sns"

  # **Requires `enable_fifo = true`.** The number of days (up to 365) for Amazon
  # SNS to retain messages. This will be used to create the archive policy for
  # the SNS topic. For more see the [Amazon
  # Docs](https://docs.aws.amazon.com/sns/latest/dg/message-archiving-and-replay-topic-owner.html)
  message_retention_period = null

  # The ARN of a Secrets Manager entry that contains the Slack Webhook URL
  # (e.g., https://hooks.slack.com/services/FOO/BAR/BAZ) that SNS messages are
  # sent to.
  slack_webhook_url_secrets_manager_arn = null

  # A map of key value pairs to apply as tags to the SNS topic.
  tags = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S SNS-TOPICS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/networking/sns-topics?ref=v1.2.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The name of the SNS topic
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

  # A list of protocols that can be used to subscribe to the SNS topic.
  allow_subscribe_protocols = ["http","https","email","email-json","sms","sqs","application","lambda"]

  # **Requires `enable_fifo = true`.** Flag to enable content-based
  # deduplication for the SNS topic. If set to true, messages with identical
  # content will be treated as duplicates and only delivered once. For more see
  # the [Amazon
  # Docs](https://docs.aws.amazon.com/sns/latest/dg/fifo-message-dedup.html)
  content_based_deduplication = null

  # Set to false to have this module create no resources. This weird parameter
  # exists solely because Terraform does not support conditional modules.
  # Therefore, this is a hack to allow you to conditionally decide if the
  # resources should be created or not.
  create_resources = true

  # Delivery policy for sns topic.
  delivery_policy = null

  # The display name of the SNS topic
  display_name = ""

  # Set to true to enable advanced formatting for CloudWatch alarms in Slack.
  # This will use the CloudWatchNotification class for richer messages.
  enable_advanced_formatting = false

  # Flag to indicate if the SNS topic is FIFO. This will append `.fifo` to the
  # name of the topic.
  enable_fifo = false

  # ARN of the http failure feedback role - when using delivery policy for sns
  # topic.
  http_failure_feedback_role_arn = null

  # ARN of the http success feedback role - when using delivery policy for sns
  # topic.
  http_success_feedback_role_arn = null

  # The ID of an AWS-managed customer master key (CMK) for Amazon SNS or a
  # custom CMK
  kms_master_key_id = "alias/aws/sns"

  # **Requires `enable_fifo = true`.** The number of days (up to 365) for Amazon
  # SNS to retain messages. This will be used to create the archive policy for
  # the SNS topic. For more see the [Amazon
  # Docs](https://docs.aws.amazon.com/sns/latest/dg/message-archiving-and-replay-topic-owner.html)
  message_retention_period = null

  # The ARN of a Secrets Manager entry that contains the Slack Webhook URL
  # (e.g., https://hooks.slack.com/services/FOO/BAR/BAZ) that SNS messages are
  # sent to.
  slack_webhook_url_secrets_manager_arn = null

  # A map of key value pairs to apply as tags to the SNS topic.
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

The name of the SNS topic

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

A list of protocols that can be used to subscribe to the SNS topic.

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

Set to false to have this module create no resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if the resources should be created or not.

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

The display name of the SNS topic

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="enable_advanced_formatting" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable advanced formatting for CloudWatch alarms in Slack. This will use the CloudWatchNotification class for richer messages.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_fifo" requirement="optional" type="bool">
<HclListItemDescription>

Flag to indicate if the SNS topic is FIFO. This will append `.fifo` to the name of the topic.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
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
<HclListItemDefaultValue defaultValue="&quot;alias/aws/sns&quot;"/>
</HclListItem>

<HclListItem name="message_retention_period" requirement="optional" type="number">
<HclListItemDescription>

**Requires `enable_fifo = true`.** The number of days (up to 365) for Amazon SNS to retain messages. This will be used to create the archive policy for the SNS topic. For more see the [Amazon Docs](https://docs.aws.amazon.com/sns/latest/dg/message-archiving-and-replay-topic-owner.html)

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="slack_webhook_url_secrets_manager_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of a Secrets Manager entry that contains the Slack Webhook URL (e.g., https://hooks.slack.com/services/FOO/BAR/BAZ) that SNS messages are sent to.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of key value pairs to apply as tags to the SNS topic.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="topic_arn">
<HclListItemDescription>

The ARN of the SNS topic.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v1.2.0/modules/networking/sns-topics/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v1.2.0/modules/networking/sns-topics/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v1.2.0/modules/networking/sns-topics/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "aa8f1ff5d6249738bedb1b90f94dd59d"
}
##DOCS-SOURCER-END -->
