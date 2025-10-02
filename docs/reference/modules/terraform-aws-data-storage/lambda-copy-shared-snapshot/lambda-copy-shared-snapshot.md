---
title: "Copy Snapshot Lambda Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Data Storage Modules" version="0.41.1" lastModifiedVersion="0.38.1"/>

# Copy Snapshot Lambda Module

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.41.1/modules/lambda-copy-shared-snapshot" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-data-storage/releases/tag/v0.38.1" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module creates an [AWS Lambda](https://aws.amazon.com/lambda/) function that runs periodically and makes local
copies of snapshots of an [Amazon Relational Database (RDS)](https://aws.amazon.com/rds/) database that were shared
from some external AWS account. This allows you to make backups of your RDS snapshots in a totally separate AWS
account.

Note that to use this module, you must have access to the Gruntwork [Continuous Delivery Infrastructure Package
(terraform-aws-ci)](https://github.com/gruntwork-io/terraform-aws-ci). If you need access, email support@gruntwork.io.

## How do you copy an encrypted snapshot?

Let's say you created an RDS  snapshot in account 111111111111 encrypted with a KMS key and shared that snapshot with
account 222222222222. To be able to make a copy of that snapshot in account 222222222222 using this module, you must:

1.  Give account 222222222222 access to the KMS key in account 111111111111, including the `kms:CreateGrant` permission.
    If you're using the [kms-master-key module](https://github.com/gruntwork-io/terraform-aws-security/blob/main/modules/kms-master-key)
    to manage your KMS keys, then in account 111111111111, you add the ARN of account 222222222222 to the
    `cmk_user_iam_arns` variable:

    ```hcl
    # In account 111111111111

    module "kms_master_key" {
      source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/kms-master-key?ref=<VERSION>"

      cmk_user_iam_arns = ["`arn:aws:iam::222222222222:root`"]

      # (Other params omitted)
    }
    ```

2.  In account 222222222222, you create another KMS key which can be used to re-encrypt the copied snapshot. You need
    to give the Lambda function in this module permissions to use that key as follows:

    ```hcl
    # In account 222222222222

    module "kms_master_key" {
      source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/kms-master-key?ref=<VERSION>"

      # (Other params omitted)
    }

    module "copy_snapshot" {
      source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/lambda-copy-shared-snapshot?ref=<VERSION>"

      # Tell this copy snapshot module to use this key to encrypt the copied snapshot
      kms_key_id = "${module.kms_master_key.key_arn}"

      # (Other params omitted)
    }

    # Giver the copy snapshot module permissions to use the KMS key
    resource "aws_iam_role_policy" "access_kms_master_key" {
      name   = "access-kms-master-key"
      role   = "${module.copy_snapshot.lambda_iam_role_id}"
      policy = "${data.aws_iam_policy_document.access_kms_master_key.json}"
    }

    data "aws_iam_policy_document" "access_kms_master_key" {
      statement {
        effect = "Allow"
        actions = [
          "kms:Encrypt",
          "kms:Decrypt",
          "kms:ReEncrypt*",
          "kms:GenerateDataKey*",
          "kms:DescribeKey"
        ]
        resources = ["${module.kms_master_key.key_arn}"]
      }

      statement {
        effect = "Allow"
        resources = ["*"]
        actions = [
          "kms:CreateGrant",
          "kms:ListGrants",
          "kms:RevokeGrant"
        ]
        condition {
          test = "Bool"
          variable = "kms:GrantIsForAWSResource"
          values = ["true"]
        }
      }
    }
    ```

## Background info

For more info on how to backup RDS snapshots to a separate AWS account, check out the [lambda-create-snapshot module
documentation](https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.41.1/modules/lambda-create-snapshot).

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S LAMBDA-COPY-SHARED-SNAPSHOT MODULE
# ------------------------------------------------------------------------------------------------------

module "lambda_copy_shared_snapshot" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/lambda-copy-shared-snapshot?ref=v0.41.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the external AWS account that shared the DB snapshots with this
  # account
  external_account_id = <string>

  # The identifier of the RDS database
  rds_db_identifier = <string>

  # If set to true, this RDS database is an Amazon Aurora cluster. If set to
  # false, it's running some other database, such as MySQL, Postgres, Oracle,
  # etc.
  rds_db_is_aurora_cluster = <bool>

  # An expression that defines how often to run the lambda function to copy
  # snapshots. For example, cron(0 20 * * ? *) or rate(5 minutes).
  schedule_expression = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Set to false to have this module skip creating resources. This weird
  # parameter exists solely because Terraform does not support conditional
  # modules. Therefore, this is a hack to allow you to conditionally decide if
  # this module should create anything or not.
  create_resources = true

  # The ARN, key ID, or alias of a KMS key to use to encrypt the copied
  # snapshot.
  kms_key_id = null

  # Namespace all Lambda resources created by this module with this name. If not
  # specified, the default is var.rds_db_identifier with '-copy-snapshot' as a
  # suffix.
  lambda_namespace = null

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

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S LAMBDA-COPY-SHARED-SNAPSHOT MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-data-storage.git//modules/lambda-copy-shared-snapshot?ref=v0.41.1"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the external AWS account that shared the DB snapshots with this
  # account
  external_account_id = <string>

  # The identifier of the RDS database
  rds_db_identifier = <string>

  # If set to true, this RDS database is an Amazon Aurora cluster. If set to
  # false, it's running some other database, such as MySQL, Postgres, Oracle,
  # etc.
  rds_db_is_aurora_cluster = <bool>

  # An expression that defines how often to run the lambda function to copy
  # snapshots. For example, cron(0 20 * * ? *) or rate(5 minutes).
  schedule_expression = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Set to false to have this module skip creating resources. This weird
  # parameter exists solely because Terraform does not support conditional
  # modules. Therefore, this is a hack to allow you to conditionally decide if
  # this module should create anything or not.
  create_resources = true

  # The ARN, key ID, or alias of a KMS key to use to encrypt the copied
  # snapshot.
  kms_key_id = null

  # Namespace all Lambda resources created by this module with this name. If not
  # specified, the default is var.rds_db_identifier with '-copy-snapshot' as a
  # suffix.
  lambda_namespace = null

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

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="external_account_id" requirement="required" type="string">
<HclListItemDescription>

The ID of the external AWS account that shared the DB snapshots with this account

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

An expression that defines how often to run the lambda function to copy snapshots. For example, cron(0 20 * * ? *) or rate(5 minutes).

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to have this module skip creating resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if this module should create anything or not.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

The ARN, key ID, or alias of a KMS key to use to encrypt the copied snapshot.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="lambda_namespace" requirement="optional" type="string">
<HclListItemDescription>

Namespace all Lambda resources created by this module with this name. If not specified, the default is <a href="#rds_db_identifier"><code>rds_db_identifier</code></a> with '-copy-snapshot' as a suffix.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.41.1/modules/lambda-copy-shared-snapshot/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.41.1/modules/lambda-copy-shared-snapshot/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-data-storage/tree/v0.41.1/modules/lambda-copy-shared-snapshot/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "1aa6d76f83d2d0836b07a9e9ab8866bb"
}
##DOCS-SOURCER-END -->
