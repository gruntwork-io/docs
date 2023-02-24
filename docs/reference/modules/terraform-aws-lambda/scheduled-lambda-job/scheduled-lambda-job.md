---
title: "Scheduled Lambda Job Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-lambda/tree/main/modules%2Fscheduled-lambda-job" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Scheduled Lambda Job Module

This module makes it easy to run an [AWS Lambda](https://aws.amazon.com/lambda/) function (such as one created with the
[lambda module](https://github.com/gruntwork-io/terraform-aws-lambda/tree/main/modules/lambda)) on a scheduled basis. This is useful for periodic background jobs, such as taking a
daily snapshot of your servers.

## Background info

For more information on AWS Lambda, how it works, and how to configure your functions, check out the [lambda module
documentation](https://github.com/gruntwork-io/terraform-aws-lambda/tree/main/modules/lambda).




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="lambda_function_arn" requirement="required" type="string">
<HclListItemDescription>

The ARN of the lambda function.

</HclListItemDescription>
</HclListItem>

<HclListItem name="lambda_function_name" requirement="required" type="string">
<HclListItemDescription>

The name of the lambda function.

</HclListItemDescription>
</HclListItem>

<HclListItem name="schedule_expression" requirement="required" type="string">
<HclListItemDescription>

An expression that defines the schedule for this lambda job. For example, cron(0 20 * * ? *) or rate(5 minutes).

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to have this module skip creating resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if this module should create anything or not.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="lambda_function_input" requirement="optional" type="string">
<HclListItemDescription>

JSON text that will be passed to the lambda function on each invoke.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="namespace" requirement="optional" type="string">
<HclListItemDescription>

The namespace to use for all resources created by this module. If not set, <a href="#lambda_function_name"><code>lambda_function_name</code></a>, with '-scheduled' as a suffix, is used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags to apply to the event rule.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="event_rule_arn">
<HclListItemDescription>

Cloudwatch Event Rule Arn

</HclListItemDescription>
</HclListItem>

<HclListItem name="event_rule_schedule">
<HclListItemDescription>

Cloudwatch Event Rule schedule expression

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "f1cfa112d6c81f8a306641b62c285e05"
}
##DOCS-SOURCER-END -->
