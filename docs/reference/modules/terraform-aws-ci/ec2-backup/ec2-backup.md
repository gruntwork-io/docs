---
title: "EC2 Backup Lambda Function Module"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="CI Modules" version="0.60.0" lastModifiedVersion="0.58.0"/>

# EC2 Backup Lambda Function Module

<a href="https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.60.0/modules/ec2-backup" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-ci/releases/tag/v0.58.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

**NOTE: This module is deprecated and will be removed in the future. Use [the Data Lifecycle
Manager](https://github.com/gruntwork-io/terraform-aws-server/tree/main/modules/ec2-backup) based backup system instead.**

This module can be used to make scheduled backups of an EC2 Instance and its EBS Volumes. Under the hood, this module
uses [terraform-aws-lambda](https://github.com/gruntwork-io/terraform-aws-lambda) to deploy a Lambda function that is triggered on
a scheduled basis by [Amazon CloudWatch
Events](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/WhatIsCloudWatchEvents.html)
and runs [ec2-snapper](https://github.com/josh-padnick/ec2-snapper) to take a snapshot of the EC2 Instance.

## Difference with Data Lifecycle Manager

As an alternative to lambda functions using `ec2-snapper`, we also have the [ec2-backup
module](https://github.com/gruntwork-io/terraform-aws-server/tree/main/modules/ec2-backup) in the repo `terraform-aws-server` which
uses [AWS Data Lifecycle Managers (DLM)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/snapshot-lifecycle.html) to
manage the EBS snapshots. Unlike with lambda functions, this is an AWS native solution that does not have any
infrastructure to manage.

Additionally, Data Lifecycle Managers work through the use of tags on volumes, unlike the lambda function (which selects
volumes by EC2 instance). This means that the backup function is able to group all the snapshots together across
deployments. For example, if you wanted to support blue green deployments for your jenkins server and you rotated
instances, the snapshots for the previous instance would still be managed using the same DLM policy.

However, there are a few features that the lambda based backup functions support which are currently not available with
DLM:

*   Support backup schedules with frequencies longer than 1 day (e.g., weekly). DLM does not support any frequency longer
    than 1 day.
    *   NOTE: There is [an open PR](https://github.com/terraform-providers/terraform-provider-aws/pull/13889) in the AWS
        provider to add support for this.
*   Minimum backup counts. The lambda based backup mechanism supports specifying to keep a minimum number of backups
    around.

## Example code

*   Check out the [jenkins example](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.60.0/examples/jenkins) for working sample code.
*   See [vars.tf](https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.60.0/modules/ec2-backup/vars.tf) for all parameters you can configure on this module.

## Specifying an instance

To specify the instance to backup, you simply provide the instance's name via the `instance_name` parameter. This
should correspond to a [tag](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html) on your EC2 Instance
with the name `Name`.

## Configuring the schedule

You can specify how often this lambda function runs using the `backup_job_schedule_expression` parameter. This can
be either a rate expression such as `rate(1 day)` or a cron expression such as `cron(0 20 * * ? *)`. See [Schedule
Expressions](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html) for more information and
examples.

## Triggering alarms if backup fails

Every time the function runs successfully, it will increment a [CloudWatch
Metric](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html). We've configured a
[CloudWatch alarm](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html) to go off
if the metric is not updated on the expected schedule, as that implies the backup has failed to run!

You can specify the metric namespace and name using the `cloudwatch_metric_namespace` and `cloudwatch_metric_name`
parameters, respectively. You can specify the SNS topic to notify when the alarm goes off using the
`alarm_sns_topic_arns` parameter.

## Cleaning up old snapshots

To prevent the number of snapshots from growing infinitely and costing you a lot of money, `ec2-snapper` will
automatically delete older snapshots. You can specify two parameters to control how many snapshots are kept around:

*   `delete_older_than`: Delete all snapshots older than this duration. For example, if you set this parameter to `30d`,
    then snapshots that are more than 30 days old will be deleted. See [Delete AMIs older
    than](https://github.com/josh-padnick/ec2-snapper#delete-amis-older-than-x-days--y-hours--z-minutes) for more info.

*   `require_at_least`: Always keep around at least this many snapshots. This helps avoid deleting too much if you have,
    for example, a misconfiguration of the `delete_older_than` parameter.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EC2-BACKUP MODULE
# ------------------------------------------------------------------------------------------------------

module "ec_2_backup" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-ci.git//modules/ec2-backup?ref=v0.60.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ARN of SNS topics to notify if the CloudWatch alarm goes off because the
  # backup job failed.
  alarm_sns_topic_arns = <list(string)>

  # How often, in seconds, the backup lambda function is expected to run. This
  # is the same as var.backup_job_schedule_expression, but unfortunately,
  # Terraform offers no way to convert rate expressions to seconds. We add a
  # CloudWatch alarm that triggers if the value of var.cloudwatch_metric_name
  # and var.cloudwatch_metric_namespace isn't updated within this time period,
  # as that indicates the backup failed to run.
  backup_job_alarm_period = <number>

  # An expression that defines the schedule for how often to run the backup
  # lambda function. For example, cron(0 20 * * ? *) or rate(1 day).
  backup_job_schedule_expression = <string>

  # The name for the CloudWatch Metric the AWS lambda backup function will
  # increment every time the job completes successfully.
  cloudwatch_metric_name = <string>

  # The namespace for the CloudWatch Metric the AWS lambda backup function will
  # increment every time the job completes successfully.
  cloudwatch_metric_namespace = <string>

  # Delete all snapshots older than this value (e.g., 30d, 5h, or 15m). For
  # example, setting this to 30d means all snapshots more than 30 days old will
  # be deleted.
  delete_older_than = <string>

  # The name of the EC2 Instance to backup. This must be the value of the tag
  # 'Name' on that Instance.
  instance_name = <string>

  # The minimum number of snapshots to keep around. This ensures some number of
  # snapshots are never deleted, regardless of the value of
  # var.delete_older_than.
  require_at_least = <number>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S EC2-BACKUP MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-ci.git//modules/ec2-backup?ref=v0.60.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ARN of SNS topics to notify if the CloudWatch alarm goes off because the
  # backup job failed.
  alarm_sns_topic_arns = <list(string)>

  # How often, in seconds, the backup lambda function is expected to run. This
  # is the same as var.backup_job_schedule_expression, but unfortunately,
  # Terraform offers no way to convert rate expressions to seconds. We add a
  # CloudWatch alarm that triggers if the value of var.cloudwatch_metric_name
  # and var.cloudwatch_metric_namespace isn't updated within this time period,
  # as that indicates the backup failed to run.
  backup_job_alarm_period = <number>

  # An expression that defines the schedule for how often to run the backup
  # lambda function. For example, cron(0 20 * * ? *) or rate(1 day).
  backup_job_schedule_expression = <string>

  # The name for the CloudWatch Metric the AWS lambda backup function will
  # increment every time the job completes successfully.
  cloudwatch_metric_name = <string>

  # The namespace for the CloudWatch Metric the AWS lambda backup function will
  # increment every time the job completes successfully.
  cloudwatch_metric_namespace = <string>

  # Delete all snapshots older than this value (e.g., 30d, 5h, or 15m). For
  # example, setting this to 30d means all snapshots more than 30 days old will
  # be deleted.
  delete_older_than = <string>

  # The name of the EC2 Instance to backup. This must be the value of the tag
  # 'Name' on that Instance.
  instance_name = <string>

  # The minimum number of snapshots to keep around. This ensures some number of
  # snapshots are never deleted, regardless of the value of
  # var.delete_older_than.
  require_at_least = <number>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # When true, all IAM policies will be managed as dedicated policies rather
  # than inline policies attached to the IAM roles. Dedicated managed policies
  # are friendlier to automated policy checkers, which may scan a single
  # resource for findings. As such, it is important to avoid inline policies
  # when targeting compliance with various security standards.
  use_managed_iam_policies = true

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="alarm_sns_topic_arns" requirement="required" type="list(string)">
<HclListItemDescription>

The ARN of SNS topics to notify if the CloudWatch alarm goes off because the backup job failed.

</HclListItemDescription>
</HclListItem>

<HclListItem name="backup_job_alarm_period" requirement="required" type="number">
<HclListItemDescription>

How often, in seconds, the backup lambda function is expected to run. This is the same as <a href="#backup_job_schedule_expression"><code>backup_job_schedule_expression</code></a>, but unfortunately, Terraform offers no way to convert rate expressions to seconds. We add a CloudWatch alarm that triggers if the value of <a href="#cloudwatch_metric_name"><code>cloudwatch_metric_name</code></a> and <a href="#cloudwatch_metric_namespace"><code>cloudwatch_metric_namespace</code></a> isn't updated within this time period, as that indicates the backup failed to run.

</HclListItemDescription>
</HclListItem>

<HclListItem name="backup_job_schedule_expression" requirement="required" type="string">
<HclListItemDescription>

An expression that defines the schedule for how often to run the backup lambda function. For example, cron(0 20 * * ? *) or rate(1 day).

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloudwatch_metric_name" requirement="required" type="string">
<HclListItemDescription>

The name for the CloudWatch Metric the AWS lambda backup function will increment every time the job completes successfully.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloudwatch_metric_namespace" requirement="required" type="string">
<HclListItemDescription>

The namespace for the CloudWatch Metric the AWS lambda backup function will increment every time the job completes successfully.

</HclListItemDescription>
</HclListItem>

<HclListItem name="delete_older_than" requirement="required" type="string">
<HclListItemDescription>

Delete all snapshots older than this value (e.g., 30d, 5h, or 15m). For example, setting this to 30d means all snapshots more than 30 days old will be deleted.

</HclListItemDescription>
</HclListItem>

<HclListItem name="instance_name" requirement="required" type="string">
<HclListItemDescription>

The name of the EC2 Instance to backup. This must be the value of the tag 'Name' on that Instance.

</HclListItemDescription>
</HclListItem>

<HclListItem name="require_at_least" requirement="required" type="number">
<HclListItemDescription>

The minimum number of snapshots to keep around. This ensures some number of snapshots are never deleted, regardless of the value of <a href="#delete_older_than"><code>delete_older_than</code></a>.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="use_managed_iam_policies" requirement="optional" type="bool">
<HclListItemDescription>

When true, all IAM policies will be managed as dedicated policies rather than inline policies attached to the IAM roles. Dedicated managed policies are friendlier to automated policy checkers, which may scan a single resource for findings. As such, it is important to avoid inline policies when targeting compliance with various security standards.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="backup_lambda_function_arn">
</HclListItem>

<HclListItem name="backup_lambda_function_name">
</HclListItem>

<HclListItem name="backup_lambda_iam_role_arn">
</HclListItem>

<HclListItem name="backup_lambda_iam_role_id">
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.60.0/modules/ec2-backup/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.60.0/modules/ec2-backup/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-ci/tree/v0.60.0/modules/ec2-backup/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "10ed0fe9d8e2d8012f22ab1c5eb9f5b5"
}
##DOCS-SOURCER-END -->
