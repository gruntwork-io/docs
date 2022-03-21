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
import { HclListItem, HclListItemTypeDetails, HclListItemDefaultValue } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.85.0" lastModifiedVersion="0.85.0"/>

# Amazon Simple Notification Service


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/networking/sns-topics" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=networking%2Fsns-topics" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

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
*   [How do SNS topics work?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/networking/sns-topics/core-concepts.md#how-do-sns-topics-work)
*   [How do I get notified when a message is published to an SNS Topic?](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/networking/sns-topics/core-concepts.md#how-do-i-get-notified)

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<br/>

### Required

<HclListItem name="name" description="The name of the SNS topic" requirement="required" type="string">
</HclListItem>

### Optional

<HclListItem name="allow_publish_accounts" description="A list of IAM ARNs that will be given the rights to publish to the SNS topic." requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_publish_services" description="A list of AWS services that will be given the rights to publish to the SNS topic." requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_subscribe_accounts" description="A list of IAM ARNs that will be given the rights to subscribe to the SNS topic." requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="allow_subscribe_protocols" description="A list of protocols that can be used to subscribe to the SNS topic." requirement="optional" type="list">
<HclListItemTypeDetails>

```hcl
list(string)
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
['http','https','email','email-json','sms','sqs','application','lambda']
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="create_resources" description="Set to false to have this module create no resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if the resources should be created or not." requirement="optional" type="bool">
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="display_name" description="The display name of the SNS topic" requirement="optional" type="string">
<HclListItemDefaultValue defaultValue=""/>
</HclListItem>

<HclListItem name="kms_master_key_id" description="The ID of an AWS-managed customer master key (CMK) for Amazon SNS or a custom CMK" requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="alias/aws/sns"/>
</HclListItem>

<HclListItem name="slack_webhook_url" description="Send topic notifications to this Slack Webhook URL (e.g., https://hooks.slack.com/services/FOO/BAR/BAZ)." requirement="optional" type="string">
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<br/>

<HclListItem name="topic_arn" description="The ARN of the SNS topic.">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"6f7944147842a937f41789aec6e78f2b"}
##DOCS-SOURCER-END -->
