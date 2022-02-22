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

<VersionBadge version="0.77.1"/>

# Amazon Simple Notification Service


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/networking/sns-topics" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=networking/sns-topics" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Filtered Release Notes</a>

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

<a name="allow_publish_accounts" className="snap-top"></a>

* [**`allow_publish_accounts`**](#allow_publish_accounts) &mdash; A list of IAM ARNs that will be given the rights to publish to the SNS topic.

<a name="allow_publish_services" className="snap-top"></a>

* [**`allow_publish_services`**](#allow_publish_services) &mdash; A list of AWS services that will be given the rights to publish to the SNS topic.

<a name="allow_subscribe_accounts" className="snap-top"></a>

* [**`allow_subscribe_accounts`**](#allow_subscribe_accounts) &mdash; A list of IAM ARNs that will be given the rights to subscribe to the SNS topic.

<a name="allow_subscribe_protocols" className="snap-top"></a>

* [**`allow_subscribe_protocols`**](#allow_subscribe_protocols) &mdash; A list of protocols that can be used to subscribe to the SNS topic.

<a name="create_resources" className="snap-top"></a>

* [**`create_resources`**](#create_resources) &mdash; Set to false to have this module create no resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if the resources should be created or not.

<a name="display_name" className="snap-top"></a>

* [**`display_name`**](#display_name) &mdash; The display name of the SNS topic

<a name="kms_master_key_id" className="snap-top"></a>

* [**`kms_master_key_id`**](#kms_master_key_id) &mdash; The ID of an AWS-managed customer master key (CMK) for Amazon SNS or a custom CMK

<a name="name" className="snap-top"></a>

* [**`name`**](#name) &mdash; The name of the SNS topic

<a name="slack_webhook_url" className="snap-top"></a>

* [**`slack_webhook_url`**](#slack_webhook_url) &mdash; Send topic notifications to this Slack Webhook URL (e.g., https://hooks.slack.com/services/FOO/BAR/BAZ).

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="topic_arn" className="snap-top"></a>

* [**`topic_arn`**](#topic_arn) &mdash; The ARN of the SNS topic.

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"4eb5f05060ac0ba7acaf83f4db64958c"}
##DOCS-SOURCER-END -->
