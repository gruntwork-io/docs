---
title: SNS Topics
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from "../../../../src/components/VersionBadge.tsx"

<VersionBadge version="0.74.0"/>

# SNS Topics

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/networking/sns-topics" className="link-button">View Source</a>
<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=networking/sns-topics" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Filtered Release Notes</a>

Create Amazon Simple Notification Service topics

### Reference

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
{"sourcePlugin":"service-catalog-api","hash":"b1f67a76a625c0586dab9833cb9c9412"}
##DOCS-SOURCER-END -->
