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

<VersionBadge version="0.104.14" lastModifiedVersion="0.96.1"/>

# Amazon Simple Notification Service

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/networking/sns-topics" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

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
*   [How do SNS topics work?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/networking/sns-topics/core-concepts.md#how-do-sns-topics-work)
*   [How do I get notified when a message is published to an SNS Topic?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/networking/sns-topics/core-concepts.md#how-do-i-get-notified)

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-production): The `examples/for-production` folder contains sample code
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

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/sns-topics?ref=v0.104.14"

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

  # Set to false to have this module create no resources. This weird parameter
  # exists solely because Terraform does not support conditional modules.
  # Therefore, this is a hack to allow you to conditionally decide if the
  # resources should be created or not.
  create_resources = true

  # The display name of the SNS topic
  display_name = ""

  # The ID of an AWS-managed customer master key (CMK) for Amazon SNS or a
  # custom CMK
  kms_master_key_id = "alias/aws/sns"

  # The ARN of a Secrets Manager entry that contains the Slack Webhook URL
  # (e.g., https://hooks.slack.com/services/FOO/BAR/BAZ) that SNS messages are
  # sent to.
  slack_webhook_url_secrets_manager_arn = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S SNS-TOPICS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/sns-topics?ref=v0.104.14"
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

  # Set to false to have this module create no resources. This weird parameter
  # exists solely because Terraform does not support conditional modules.
  # Therefore, this is a hack to allow you to conditionally decide if the
  # resources should be created or not.
  create_resources = true

  # The display name of the SNS topic
  display_name = ""

  # The ID of an AWS-managed customer master key (CMK) for Amazon SNS or a
  # custom CMK
  kms_master_key_id = "alias/aws/sns"

  # The ARN of a Secrets Manager entry that contains the Slack Webhook URL
  # (e.g., https://hooks.slack.com/services/FOO/BAR/BAZ) that SNS messages are
  # sent to.
  slack_webhook_url_secrets_manager_arn = null

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

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to have this module create no resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if the resources should be created or not.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="display_name" requirement="optional" type="string">
<HclListItemDescription>

The display name of the SNS topic

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="kms_master_key_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of an AWS-managed customer master key (CMK) for Amazon SNS or a custom CMK

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;alias/aws/sns&quot;"/>
</HclListItem>

<HclListItem name="slack_webhook_url_secrets_manager_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of a Secrets Manager entry that contains the Slack Webhook URL (e.g., https://hooks.slack.com/services/FOO/BAR/BAZ) that SNS messages are sent to.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/networking/sns-topics/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/networking/sns-topics/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/networking/sns-topics/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "461fdc5911819ea4d6529d5454f4995f"
}
##DOCS-SOURCER-END -->
