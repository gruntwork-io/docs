---
title: "API Gateway Account Settings Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-lambda/tree/main/modules/api-gateway-account-settings" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-lambda/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# API Gateway Account Settings Module

This module allows you set the regional settings required to allow API Gateway to write to CloudWatch logs.

## Overview

Each Region in AWS must be configured with an IAM Role that gives API Gateway permissions to create and write to CloudWatch
logs. Without this configuration, API Gateway will not be able to write logs. This configuration is done regionally
(only once per region) irrespective of the number of API Gateways deployed in that region.

This module creates an IAM role, assigns it the appropriate permissions and sets it as the "CloudWatch log role ARN" in
the API Gateway configuration.

The corresponding screen from the AWS Console is shown below:

![image](/img/reference/modules/terraform-aws-lambda/api-gateway-account-settings/account-settings.png)

## Quick start

Check out the [examples](https://github.com/gruntwork-io/terraform-aws-lambda/tree/main/examples) for sample code that demonstrates how to use this module.




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Optional

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to have this module create no resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if the API Gateway account settings should be created or not.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the IAM role that will be created to grant API Gateway rights to cloudwatch

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;api_gateway_cloudwatch_global&quot;"/>
</HclListItem>

<HclListItem name="managed_policy_waiting_time" requirement="optional" type="string">
<HclListItemDescription>

Time to wait after creating managed policy, to avoid eventual consistency races. Default: 60s.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;60s&quot;"/>
</HclListItem>

<HclListItem name="use_managed_iam_policies" requirement="optional" type="bool">
<HclListItemDescription>

When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="iam_role_arn">
</HclListItem>

<HclListItem name="iam_role_name">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/modules/api-gateway-account-settings/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/modules/api-gateway-account-settings/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-lambda/tree/modules/api-gateway-account-settings/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "f3c292958fec8e2b491c7ea97aa04c00"
}
##DOCS-SOURCER-END -->
