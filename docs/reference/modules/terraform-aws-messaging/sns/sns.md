---
title: "Simple Notification Service (SNS) Topic Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/tree/main/modules/sns" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-messaging/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Simple Notification Service (SNS) Topic Module

This module makes it easy to deploy a SNS topic along with the publisher and subscriber policies for the topic.

## How do I access the SNS topic?

This module includes several [Terraform outputs](https://www.terraform.io/intro/getting-started/outputs.html),
including:

1.  `topic_name`: The Name of the created topic
2.  `topic_display_name`: The Display Name of the created topic
3.  `topic_arn`: The ARN of the created topic
4.  `topic_policy`: The Access policy of the created topic




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

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Enable or disable creation of the resources of this module.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="display_name" requirement="optional" type="string">
<HclListItemDescription>

The display name of the SNS topic. NOTE: Maximum length is 100 characters.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
</HclListItem>

<HclListItem name="kms_master_key_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of an AWS-managed customer master key (CMK) for Amazon SNS or a custom CMK

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
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/modules/sns/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/modules/sns/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-messaging/tree/modules/sns/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "7b966ba8cab505f1dc5e3bb1fbf5422b"
}
##DOCS-SOURCER-END -->
