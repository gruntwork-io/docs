---
title: "Delete Snapshots Lambda Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/tree/main/modules/lambda-cleanup-snapshots" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# Delete Snapshots Lambda Module

This module creates an [AWS Lambda](https://aws.amazon.com/lambda/) function that runs periodically and deletes old
snapshots of an [Amazon Relational Database (RDS)](https://aws.amazon.com/rds/) database. The module allows you to
specify the maximum number of snapshots you want to keep and any time that number of snapshots is exceeded, it will
delete the oldest snapshots.

Note that to use this module, you must have access to the Gruntwork [Continuous Delivery Infrastructure Package
(terraform-aws-ci)](https://github.com/gruntwork-io/terraform-aws-ci). If you need access, email support@gruntwork.io.

## How do you configure this module?

This module allows you to configure a number of parameters, such as which database to backup, how often to run the
backups, what account to share the backups with, and more. For a list of all available variables and their
descriptions, see [variables.tf](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/main/modules/lambda-cleanup-snapshots/variables.tf).




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="max_snapshots" requirement="required" type="number">
<HclListItemDescription>

The maximum number of snapshots to keep around of the given DB. Once this number is exceeded, this lambda function will delete the oldest snapshots.

</HclListItemDescription>
</HclListItem>

<HclListItem name="rds_db_arn" requirement="required" type="string">
<HclListItemDescription>

The ARN of the RDS database

</HclListItemDescription>
</HclListItem>

<HclListItem name="rds_db_identifier" requirement="required" type="string">
<HclListItemDescription>

The identifier of the RDS database

</HclListItemDescription>
</HclListItem>

<HclListItem name="rds_db_is_aurora_cluster" requirement="required" type="bool">
<HclListItemDescription>

If set to true, this RDS database is an Amazon Aurora cluster. If set to false, it's running some other database, such as MySQL, Postgres, Oracle, etc.

</HclListItemDescription>
</HclListItem>

<HclListItem name="schedule_expression" requirement="required" type="string">
<HclListItemDescription>

An expression that defines how often to run the lambda function to clean up snapshots. For example, cron(0 20 * * ? *) or rate(5 minutes).

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="allow_delete_all" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, you will be able to set max_snasphots to zero, and the cleanup lambda job will be allowed to delete ALL snapshots. In production usage, you will NEVER want to set this to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to have this module skip creating resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if this module should create anything or not.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="lambda_namespace" requirement="optional" type="string">
<HclListItemDescription>

Namespace all Lambda resources created by this module with this name. If not specified, the default is <a href="#rds_db_identifier"><code>rds_db_identifier</code></a> with '-delete-snapshots' as a suffix.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="schedule_namespace" requirement="optional" type="string">
<HclListItemDescription>

Namespace all Lambda scheduling resources created by this module with this name. If not specified, the default is <a href="#lambda_namespace"><code>lambda_namespace</code></a> with '-scheduled' as a suffix.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="snapshot_namespace" requirement="optional" type="string">
<HclListItemDescription>

Namespace of snapshots that will be cleaned up by this module. If specified then it will match snapshots with this value as a hyphenated suffix. If this value is empty then all manual snapshots will be evaluated for cleanup.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;&quot;"/>
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
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/modules/lambda-cleanup-snapshots/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/modules/lambda-cleanup-snapshots/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/modules/lambda-cleanup-snapshots/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "9d8d6f60d2fe3c26414a4999d8ba5bf4"
}
##DOCS-SOURCER-END -->
