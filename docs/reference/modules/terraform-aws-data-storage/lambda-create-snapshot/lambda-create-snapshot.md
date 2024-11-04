---
title: "Database backup"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Data Storage Modules" version="0.38.1" lastModifiedVersion="0.38.1"/>

# Database backup

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.38.1/modules/lambda-create-snapshot" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.38.1" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module, along with the [lambda-share-snapshot](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.38.1/modules/lambda-share-snapshot) and [lambda-copy-shared-snapshot](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.38.1/modules/lambda-copy-shared-snapshot) modules, can be used to backup your RDS database to another AWS account (e.g., for disaster recovery) on a configurable schedule. Under the hood, each module runs a Lambda function that instructs your database to take a snapshot (this module), share the snapshot with another account (the `lambda-share-snapshot` module), and make a copy of the snapshot (`lambda-copy-shared-snapshot`).

![RDS architecture](/img/reference/modules/terraform-aws-data-storage/lambda-create-snapshot/data-backup-architecture.png)

## Features

*   Standalone functions for taking snapshots, sharing snapshots, and copying snapshots that can be combined in many different ways

*   You can combine them to copy snapshots across AWS accounts and regions

*   Configurable backup schedule (e.g., using cron expressions)

*   Clean up old snapshots automatically using the [lambda-cleanup-snapshots](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.38.1/modules/lambda-cleanup-snapshots) module.

*   Add tags to snapshots by passing in `additional_environment_variables`

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/)!

### Core concepts

*   [What is Amazon RDS?](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.38.1/modules/rds/core-concepts.md#what-is-amazon-rds)

*   [How does this differ from RDS automatic snapshots?](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.38.1/modules/lambda-create-snapshot/core-concepts.md#how-does-this-differ-from-rds-automatic-snapshots)

*   [RDS documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html): Amazon’s docs for RDS that cover core concepts such as the types of databases supported, security, backup & restore, and monitoring.

*   *[Designing Data Intensive Applications](https://dataintensive.net)*: the best book we’ve found for understanding data systems, including relational databases, NoSQL, replication, sharding, consistency, and so on.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples folder](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.38.1/examples): The `examples` folder contains sample code optimized for learning, experimenting, and testing (but not production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [rds module in the Acme example Reference Architecture](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme/tree/5fcefff/data-stores/rds): Production-ready sample code from the Acme Reference Architecture examples.

## Manage

### Day-to-day operations

*   [How to backup RDS snapshots to a separate AWS account](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.38.1/modules/lambda-create-snapshot/core-concepts.md#how-do-you-backup-your-rds-snapshots-to-a-separate-aws-account)

### Major changes

*   [Restoring from a DB snapshot](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_RestoreFromSnapshot.html)

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S LAMBDA-CREATE-SNAPSHOT MODULE
# ------------------------------------------------------------------------------------------------------

module "lambda_create_snapshot" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/lambda-create-snapshot?ref=v0.38.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ARN of the RDS database
  rds_db_arn = <string>

  # The identifier of the RDS database
  rds_db_identifier = <string>

  # If set to true, this RDS database is an Amazon Aurora cluster. If set to
  # false, it's running some other database, such as MySQL, Postgres, Oracle,
  # etc.
  rds_db_is_aurora_cluster = <bool>

  # An expression that defines how often to run the lambda function to take
  # snapshots. For example, cron(0 20 * * ? *) or rate(5 minutes).
  schedule_expression = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A map of additional environment variables to pass to the Lambda function.
  # Any additional environment variables prefixed with TAG_ will be added as
  # tags to the RDS snapshot.
  additional_environment_variables = {}

  # Set to false to have this module skip creating resources. This weird
  # parameter exists solely because Terraform does not support conditional
  # modules. Therefore, this is a hack to allow you to conditionally decide if
  # this module should create anything or not.
  create_resources = true

  # Namespace all Lambda resources created by this module with this name. If not
  # specified, the default is var.rds_db_identifier with '-create-snapshot' as a
  # suffix.
  lambda_namespace = null

  # If the DB is not in available state when this function runs, it will retry
  # up to max_retries times.
  max_retries = 60

  # If set true, just before the lambda function finishes running, it will
  # report a custom metric to CloudWatch, as specified by
  # var.report_cloudwatch_metric_namespace and
  # var.report_cloudwatch_metric_name. You can set an alarm on this metric to
  # detect if the backup job failed to run to completion.
  report_cloudwatch_metric = false

  # The name to use for the the custom CloudWatch metric. Only used if
  # var.report_cloudwatch_metric is set to true.
  report_cloudwatch_metric_name = null

  # The namespace to use for the the custom CloudWatch metric. Only used if
  # var.report_cloudwatch_metric is set to true.
  report_cloudwatch_metric_namespace = null

  # Namespace all Lambda scheduling resources created by this module with this
  # name. If not specified, the default is var.lambda_namespace with
  # '-scheduled' as a suffix.
  schedule_namespace = null

  # The ARN of a lambda job to trigger to share the DB snapshot with another AWS
  # account. Only used if var.share_snapshot_with_another_account is set to
  # true.
  share_snapshot_lambda_arn = null

  # The ID of an AWS account with which to share the RDS snapshot. Only used if
  # var.share_snapshot_with_another_account is set to true.
  share_snapshot_with_account_id = null

  # If set to true, after this lambda function takes a snapshot of the RDS DB,
  # it will trigger the lambda function specified in
  # var.share_snapshot_lambda_arn to share the snapshot with another AWS
  # account.
  share_snapshot_with_another_account = false

  # The amount of time, in seconds, between retries.
  sleep_between_retries_sec = 60

  # Namespace all snapshots created by this module's jobs with this suffix. If
  # not specified, only the database identifier and timestamp are used.
  snapshot_namespace = ""

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S LAMBDA-CREATE-SNAPSHOT MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/lambda-create-snapshot?ref=v0.38.1"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ARN of the RDS database
  rds_db_arn = <string>

  # The identifier of the RDS database
  rds_db_identifier = <string>

  # If set to true, this RDS database is an Amazon Aurora cluster. If set to
  # false, it's running some other database, such as MySQL, Postgres, Oracle,
  # etc.
  rds_db_is_aurora_cluster = <bool>

  # An expression that defines how often to run the lambda function to take
  # snapshots. For example, cron(0 20 * * ? *) or rate(5 minutes).
  schedule_expression = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A map of additional environment variables to pass to the Lambda function.
  # Any additional environment variables prefixed with TAG_ will be added as
  # tags to the RDS snapshot.
  additional_environment_variables = {}

  # Set to false to have this module skip creating resources. This weird
  # parameter exists solely because Terraform does not support conditional
  # modules. Therefore, this is a hack to allow you to conditionally decide if
  # this module should create anything or not.
  create_resources = true

  # Namespace all Lambda resources created by this module with this name. If not
  # specified, the default is var.rds_db_identifier with '-create-snapshot' as a
  # suffix.
  lambda_namespace = null

  # If the DB is not in available state when this function runs, it will retry
  # up to max_retries times.
  max_retries = 60

  # If set true, just before the lambda function finishes running, it will
  # report a custom metric to CloudWatch, as specified by
  # var.report_cloudwatch_metric_namespace and
  # var.report_cloudwatch_metric_name. You can set an alarm on this metric to
  # detect if the backup job failed to run to completion.
  report_cloudwatch_metric = false

  # The name to use for the the custom CloudWatch metric. Only used if
  # var.report_cloudwatch_metric is set to true.
  report_cloudwatch_metric_name = null

  # The namespace to use for the the custom CloudWatch metric. Only used if
  # var.report_cloudwatch_metric is set to true.
  report_cloudwatch_metric_namespace = null

  # Namespace all Lambda scheduling resources created by this module with this
  # name. If not specified, the default is var.lambda_namespace with
  # '-scheduled' as a suffix.
  schedule_namespace = null

  # The ARN of a lambda job to trigger to share the DB snapshot with another AWS
  # account. Only used if var.share_snapshot_with_another_account is set to
  # true.
  share_snapshot_lambda_arn = null

  # The ID of an AWS account with which to share the RDS snapshot. Only used if
  # var.share_snapshot_with_another_account is set to true.
  share_snapshot_with_account_id = null

  # If set to true, after this lambda function takes a snapshot of the RDS DB,
  # it will trigger the lambda function specified in
  # var.share_snapshot_lambda_arn to share the snapshot with another AWS
  # account.
  share_snapshot_with_another_account = false

  # The amount of time, in seconds, between retries.
  sleep_between_retries_sec = 60

  # Namespace all snapshots created by this module's jobs with this suffix. If
  # not specified, only the database identifier and timestamp are used.
  snapshot_namespace = ""

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

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

An expression that defines how often to run the lambda function to take snapshots. For example, cron(0 20 * * ? *) or rate(5 minutes).

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="additional_environment_variables" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of additional environment variables to pass to the Lambda function. Any additional environment variables prefixed with TAG_ will be added as tags to the RDS snapshot.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to have this module skip creating resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if this module should create anything or not.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="lambda_namespace" requirement="optional" type="string">
<HclListItemDescription>

Namespace all Lambda resources created by this module with this name. If not specified, the default is <a href="#rds_db_identifier"><code>rds_db_identifier</code></a> with '-create-snapshot' as a suffix.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="max_retries" requirement="optional" type="number">
<HclListItemDescription>

If the DB is not in available state when this function runs, it will retry up to max_retries times.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="report_cloudwatch_metric" requirement="optional" type="bool">
<HclListItemDescription>

If set true, just before the lambda function finishes running, it will report a custom metric to CloudWatch, as specified by <a href="#report_cloudwatch_metric_namespace"><code>report_cloudwatch_metric_namespace</code></a> and <a href="#report_cloudwatch_metric_name"><code>report_cloudwatch_metric_name</code></a>. You can set an alarm on this metric to detect if the backup job failed to run to completion.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="report_cloudwatch_metric_name" requirement="optional" type="string">
<HclListItemDescription>

The name to use for the the custom CloudWatch metric. Only used if <a href="#report_cloudwatch_metric"><code>report_cloudwatch_metric</code></a> is set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="report_cloudwatch_metric_namespace" requirement="optional" type="string">
<HclListItemDescription>

The namespace to use for the the custom CloudWatch metric. Only used if <a href="#report_cloudwatch_metric"><code>report_cloudwatch_metric</code></a> is set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="schedule_namespace" requirement="optional" type="string">
<HclListItemDescription>

Namespace all Lambda scheduling resources created by this module with this name. If not specified, the default is <a href="#lambda_namespace"><code>lambda_namespace</code></a> with '-scheduled' as a suffix.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="share_snapshot_lambda_arn" requirement="optional" type="string">
<HclListItemDescription>

The ARN of a lambda job to trigger to share the DB snapshot with another AWS account. Only used if <a href="#share_snapshot_with_another_account"><code>share_snapshot_with_another_account</code></a> is set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="share_snapshot_with_account_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of an AWS account with which to share the RDS snapshot. Only used if <a href="#share_snapshot_with_another_account"><code>share_snapshot_with_another_account</code></a> is set to true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="share_snapshot_with_another_account" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, after this lambda function takes a snapshot of the RDS DB, it will trigger the lambda function specified in <a href="#share_snapshot_lambda_arn"><code>share_snapshot_lambda_arn</code></a> to share the snapshot with another AWS account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="sleep_between_retries_sec" requirement="optional" type="number">
<HclListItemDescription>

The amount of time, in seconds, between retries.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="60"/>
</HclListItem>

<HclListItem name="snapshot_namespace" requirement="optional" type="string">
<HclListItemDescription>

Namespace all snapshots created by this module's jobs with this suffix. If not specified, only the database identifier and timestamp are used.

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
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.38.1/modules/lambda-create-snapshot/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.38.1/modules/lambda-create-snapshot/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.38.1/modules/lambda-create-snapshot/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "4a96faa947b71ed0e1eb88afa13fbe4b"
}
##DOCS-SOURCER-END -->
