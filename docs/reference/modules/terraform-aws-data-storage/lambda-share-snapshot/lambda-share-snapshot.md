---
title: "Share Snapshot Lambda Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/tree/main/modules/lambda-share-snapshot" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Share Snapshot Lambda Module

This module creates an [AWS Lambda](https://aws.amazon.com/lambda/) function that can share snapshots of an [Amazon
Relational Database (RDS)](https://aws.amazon.com/rds/) database with another AWS account. Typically, the snapshots
are created by the [lambda-create-snapshot module](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/main/modules/lambda-create-snapshot), which can be configured to
automatically trigger this lambda function after each run.

## Background info

For more info on how to backup RDS snapshots to a separate AWS account, check out the [lambda-create-snapshot module
documentation](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/main/modules/lambda-create-snapshot).




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="rds_db_arn" requirement="required" type="string">
<HclListItemDescription>

The ARN of the RDS database

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to have this module skip creating resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if this module should create anything or not.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="max_retries" requirement="optional" type="number">
<HclListItemDescription>

The maximum number of retries the lambda function will make while waiting for the snapshot to be available

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="name" requirement="optional" type="string">
<HclListItemDescription>

The name for the lambda function and other resources created by these Terraform configurations

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;share-rds-snapshot&quot;"/>
</HclListItem>

<HclListItem name="sleep_between_retries_sec" requirement="optional" type="number">
<HclListItemDescription>

The amount of time, in seconds, between retries.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="lambda_function_arn">
</HclListItem>

<HclListItem name="lambda_iam_role_id">
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/modules/lambda-share-snapshot/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/modules/lambda-share-snapshot/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/modules/lambda-share-snapshot/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "3ecb95bea826b112d5af17f5b44a4685"
}
##DOCS-SOURCER-END -->
