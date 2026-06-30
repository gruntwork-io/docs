---
type: "service"
name: "Cost Management"
description: "Deploy AWS Budgets, Cost Anomaly Detection, SNS notification fan-out, and an optional scheduled cloud-nuke task for unified cost control and cleanup."
category: "cost"
cloud: "aws"
tags: ["cost","budgets","cost-anomaly-detection","cloud-nuke","fargate","slack"]
license: "gruntwork"
built-with: "terraform, python, ecs-fargate"
title: "Cost Management"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="2.11.1" lastModifiedVersion="2.9.0"/>

# Cost Management

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v2.11.1/modules/mgmt/cost-management" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=mgmt%2Fcost-management" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>

## Overview

This service deploys a unified AWS cost-control stack:

*   **AWS Budgets** — one or more threshold-based budgets (daily, monthly, etc.).
*   **AWS Cost Anomaly Detection (CAD)** — ML-based anomaly monitoring with subscriber notifications.
*   **Notification fan-out** — a single SNS topic receives both Budgets and CAD events, with optional Slack delivery via a Lambda notifier (webhook URL read from Secrets Manager at runtime) and optional direct email subscriptions.
*   **Scheduled cloud-nuke (optional)** — an ECS Fargate task that runs [cloud-nuke](https://github.com/gruntwork-io/cloud-nuke) on a configurable schedule, defaulting to `--dry-run`. Useful for ephemeral, sandbox, or developer accounts.

## Learn

Under the hood, this service composes Gruntwork modules from
[terraform-aws-messaging](https://github.com/gruntwork-io/terraform-aws-messaging) (for the SNS topic) and
[terraform-aws-lambda](https://github.com/gruntwork-io/terraform-aws-lambda) (for the Slack notifier). If you are a
subscriber and don't have access to those repos, email [support@gruntwork.io](mailto:support@gruntwork.io).

### Core concepts

*   **AWS Budgets**: cost thresholds evaluated on a daily, monthly, quarterly, or annual cadence. Each budget publishes to an SNS topic when its threshold is crossed. See the [AWS Budgets documentation](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html) for the data model and the available `notification_type` and `time_unit` values.
*   **AWS Cost Anomaly Detection**: an ML-based monitor that observes spend patterns and emits an event when an anomaly is detected. See the [Cost Anomaly Detection documentation](https://docs.aws.amazon.com/cost-management/latest/userguide/getting-started-ad.html).
*   **cloud-nuke**: a Gruntwork tool that deletes resources in an AWS account, intended for cleanup of ephemeral or sandbox accounts. See the [cloud-nuke README](https://github.com/gruntwork-io/cloud-nuke) for the resource matrix and the `--config` file format.

### Important caveats

#### AWS Cost Anomaly Detection is global, but pinned to `us-east-1`

`aws_ce_anomaly_monitor` and `aws_ce_anomaly_subscription` are global resources that must be created via the `us-east-1`
endpoint. This module requires an aliased provider named `aws.us_east_1` configured for `us-east-1`. If your default
provider is already `us-east-1`, you can still alias it. See the example for the canonical configuration.

#### Only one `DIMENSIONAL` anomaly monitor per dimension per account

AWS allows at most one `DIMENSIONAL` `aws_ce_anomaly_monitor` per dimension (e.g., `SERVICE`) per account. If your account
already has one (created by another tool, a prior deployment, or the AWS console), this module's apply will fail with
`ValidationException: Limit exceeded on dimensional spend monitor creation`. Set `enable_anomaly_detection = false` and
attach an `aws_ce_anomaly_subscription` to the pre-existing monitor out-of-band, or destroy the existing monitor first.

#### cloud-nuke is destructive

When `enable_scheduled_cloud_nuke = true`:

*   The module defaults to `cloud_nuke_dry_run = true`. Dry-run mode logs what would be deleted without deleting.
*   To enable real deletions, you must set **both** `cloud_nuke_dry_run = false` **and** `acknowledge_destructive_cloud_nuke = true`. The module enforces this via a plan-time precondition.
*   The module does **not** ship an IAM policy granting cloud-nuke permissions to delete resources. You are expected to attach a separate policy to `output.cloud_nuke_task_role_arn`. A reference policy snippet is published at the [cloud-nuke README](https://github.com/gruntwork-io/cloud-nuke#permissions). Your security team should review and trim it before attaching.

## Deploy

See [examples/for-learning-and-testing/mgmt/cost-management](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v2.11.1/examples/for-learning-and-testing/mgmt/cost-management)
for a runnable example.


## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S COST-MANAGEMENT MODULE
# ------------------------------------------------------------------------------------------------------

module "cost_management" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/mgmt/cost-management?ref=v2.11.1"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Human-readable AWS account name (e.g., 'sandbox', 'prod-payments'). Included
  # as a label in Slack notifications so a single channel can disambiguate
  # alerts from multiple accounts.
  account_name = <string>

  # Name prefix applied to all resources created by this module (SNS topic,
  # Budgets, CAD, Slack Lambda, cloud-nuke task).
  name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Explicit acknowledgement that you intend to run cloud-nuke in destructive
  # (non-dry-run) mode. To enable real deletions, this must be true AND
  # var.cloud_nuke_dry_run must be false. Enforced by a plan-time precondition.
  acknowledge_destructive_cloud_nuke = false

  # Dimension to monitor for anomalies. One of SERVICE or LINKED_ACCOUNT.
  anomaly_monitor_dimension = "SERVICE"

  # Notification frequency for the anomaly subscription. AWS only allows
  # IMMEDIATE for SNS subscribers; DAILY and WEEKLY require EMAIL subscribers
  # and are rejected at apply time.
  anomaly_subscription_frequency = "IMMEDIATE"

  # Minimum total impact, in USD, above which a detected anomaly triggers a
  # subscription notification.
  anomaly_threshold_amount = 100

  # AWS Budgets to create. Each entry produces one aws_budgets_budget that
  # publishes to the module's SNS topic when the threshold is crossed. Fields:
  # 'name' is appended to var.name; 'time_unit' must be DAILY, MONTHLY,
  # QUARTERLY, or ANNUALLY; 'limit_amount' is the cap in USD;
  # 'threshold_percent' is the percentage of limit_amount at which to alert;
  # 'notification_type' must be ACTUAL or FORECASTED.
  budgets = [{"limit_amount":75,"name":"daily","notification_type":"ACTUAL","threshold_percent":100,"time_unit":"DAILY"},{"limit_amount":800,"name":"monthly-actual","notification_type":"ACTUAL","threshold_percent":100,"time_unit":"MONTHLY"}]

  # Whether to assign a public IP to the cloud-nuke Fargate task ENI. Set to
  # true when running in public subnets without a NAT gateway (typical for AWS
  # default VPCs) so the task can reach AWS API endpoints and the image
  # registry.
  cloud_nuke_assign_public_ip = false

  # Optional inline cloud-nuke config YAML. When non-null, the module writes the
  # YAML to an S3 object and points cloud-nuke at it via --config. When null, no
  # config file is passed and cloud-nuke uses its defaults. See
  # https://github.com/gruntwork-io/cloud-nuke#config-file for the schema.
  cloud_nuke_config_yaml = null

  # Whether to run cloud-nuke in --dry-run mode, which logs what cloud-nuke
  # would delete without actually deleting anything. See
  # var.acknowledge_destructive_cloud_nuke for how to enable real deletions.
  cloud_nuke_dry_run = true

  # Container image reference for cloud-nuke (e.g. an ECR repository URI or a
  # public image). Gruntwork does not currently publish a cloud-nuke OCI image,
  # so operators must build and host their own — see the module README for a
  # reference Dockerfile. Required when var.enable_scheduled_cloud_nuke is true.
  cloud_nuke_image = null

  # EventBridge Scheduler schedule expression for cloud-nuke runs. Accepts a
  # cron(...) or rate(...) expression. The default is 07:00 UTC daily.
  cloud_nuke_schedule_expression = "cron(0 7 * * ? *)"

  # Security groups to attach to the cloud-nuke Fargate task ENI. Each must
  # permit outbound HTTPS so the task can reach AWS API endpoints, S3 (for
  # config), and ECR/GHCR (for the image pull). When empty, ECS attaches the VPC
  # default security group, whose outbound rules may not permit these calls.
  cloud_nuke_security_group_ids = []

  # AWS regions cloud-nuke should operate against, passed as repeated --region
  # flags. An empty list defers to cloud-nuke's default behavior, which is to
  # operate on all regions enabled in the account.
  cloud_nuke_target_regions = []

  # Fargate task CPU units allocated to the cloud-nuke task. See
  # https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-cpu-memory-error.html
  # for valid CPU/memory combinations.
  cloud_nuke_task_cpu = 512

  # Memory, in MB, allocated to the cloud-nuke Fargate task. See
  # https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-cpu-memory-error.html
  # for valid CPU/memory combinations.
  cloud_nuke_task_memory = 1024

  # ARN of an existing ECS cluster to run the cloud-nuke task on. When null,
  # this module creates a dedicated cluster named '<var.name>-cloud-nuke'. Only
  # used when var.enable_scheduled_cloud_nuke is true.
  ecs_cluster_arn = null

  # Email addresses to subscribe to the cost alerts SNS topic. Each address
  # receives an AWS confirmation email that must be acknowledged before delivery
  # begins.
  email_endpoints = []

  # Whether to provision AWS Cost Anomaly Detection. Requires the aws.us_east_1
  # aliased provider since CAD resources are global but only callable via
  # us-east-1.
  enable_anomaly_detection = true

  # Whether to provision AWS Budgets alerts. When true, each entry in
  # var.budgets becomes one aws_budgets_budget that publishes to the module's
  # SNS topic.
  enable_budget_alerts = true

  # Whether to provision an EventBridge-scheduled Fargate task that runs
  # cloud-nuke on var.cloud_nuke_schedule_expression. Off by default because
  # cloud-nuke is destructive. When true, var.vpc_id and var.subnet_ids must
  # also be set.
  enable_scheduled_cloud_nuke = false

  # Whether to deploy the Slack notifier Lambda and subscribe it to the cost
  # alerts SNS topic. When true, var.slack_webhook_url_secrets_manager_arn must
  # also be set.
  enable_slack_notifications = false

  # Memory, in MB, allocated to the Slack notifier Lambda.
  lambda_memory_size = 128

  # Maximum runtime, in seconds, of the Slack notifier Lambda before
  # termination.
  lambda_timeout = 30

  # Retention, in days, for CloudWatch logs of the Slack notifier Lambda and the
  # cloud-nuke Fargate task.
  log_retention_days = 30

  # ARN of a Secrets Manager secret whose SecretString is the Slack incoming
  # webhook URL. Required when var.enable_slack_notifications is true. The
  # Lambda reads this secret at runtime so the URL never appears in plan output
  # or Terraform state.
  slack_webhook_url_secrets_manager_arn = null

  # Private subnet IDs the cloud-nuke Fargate task launches into. Subnets must
  # have outbound internet access (e.g., via a NAT gateway) so the task can
  # reach AWS API endpoints. Required when var.enable_scheduled_cloud_nuke is
  # true.
  subnet_ids = []

  # VPC the cloud-nuke Fargate task runs in. Required when
  # var.enable_scheduled_cloud_nuke is true.
  vpc_id = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S COST-MANAGEMENT MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/mgmt/cost-management?ref=v2.11.1"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Human-readable AWS account name (e.g., 'sandbox', 'prod-payments'). Included
  # as a label in Slack notifications so a single channel can disambiguate
  # alerts from multiple accounts.
  account_name = <string>

  # Name prefix applied to all resources created by this module (SNS topic,
  # Budgets, CAD, Slack Lambda, cloud-nuke task).
  name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Explicit acknowledgement that you intend to run cloud-nuke in destructive
  # (non-dry-run) mode. To enable real deletions, this must be true AND
  # var.cloud_nuke_dry_run must be false. Enforced by a plan-time precondition.
  acknowledge_destructive_cloud_nuke = false

  # Dimension to monitor for anomalies. One of SERVICE or LINKED_ACCOUNT.
  anomaly_monitor_dimension = "SERVICE"

  # Notification frequency for the anomaly subscription. AWS only allows
  # IMMEDIATE for SNS subscribers; DAILY and WEEKLY require EMAIL subscribers
  # and are rejected at apply time.
  anomaly_subscription_frequency = "IMMEDIATE"

  # Minimum total impact, in USD, above which a detected anomaly triggers a
  # subscription notification.
  anomaly_threshold_amount = 100

  # AWS Budgets to create. Each entry produces one aws_budgets_budget that
  # publishes to the module's SNS topic when the threshold is crossed. Fields:
  # 'name' is appended to var.name; 'time_unit' must be DAILY, MONTHLY,
  # QUARTERLY, or ANNUALLY; 'limit_amount' is the cap in USD;
  # 'threshold_percent' is the percentage of limit_amount at which to alert;
  # 'notification_type' must be ACTUAL or FORECASTED.
  budgets = [{"limit_amount":75,"name":"daily","notification_type":"ACTUAL","threshold_percent":100,"time_unit":"DAILY"},{"limit_amount":800,"name":"monthly-actual","notification_type":"ACTUAL","threshold_percent":100,"time_unit":"MONTHLY"}]

  # Whether to assign a public IP to the cloud-nuke Fargate task ENI. Set to
  # true when running in public subnets without a NAT gateway (typical for AWS
  # default VPCs) so the task can reach AWS API endpoints and the image
  # registry.
  cloud_nuke_assign_public_ip = false

  # Optional inline cloud-nuke config YAML. When non-null, the module writes the
  # YAML to an S3 object and points cloud-nuke at it via --config. When null, no
  # config file is passed and cloud-nuke uses its defaults. See
  # https://github.com/gruntwork-io/cloud-nuke#config-file for the schema.
  cloud_nuke_config_yaml = null

  # Whether to run cloud-nuke in --dry-run mode, which logs what cloud-nuke
  # would delete without actually deleting anything. See
  # var.acknowledge_destructive_cloud_nuke for how to enable real deletions.
  cloud_nuke_dry_run = true

  # Container image reference for cloud-nuke (e.g. an ECR repository URI or a
  # public image). Gruntwork does not currently publish a cloud-nuke OCI image,
  # so operators must build and host their own — see the module README for a
  # reference Dockerfile. Required when var.enable_scheduled_cloud_nuke is true.
  cloud_nuke_image = null

  # EventBridge Scheduler schedule expression for cloud-nuke runs. Accepts a
  # cron(...) or rate(...) expression. The default is 07:00 UTC daily.
  cloud_nuke_schedule_expression = "cron(0 7 * * ? *)"

  # Security groups to attach to the cloud-nuke Fargate task ENI. Each must
  # permit outbound HTTPS so the task can reach AWS API endpoints, S3 (for
  # config), and ECR/GHCR (for the image pull). When empty, ECS attaches the VPC
  # default security group, whose outbound rules may not permit these calls.
  cloud_nuke_security_group_ids = []

  # AWS regions cloud-nuke should operate against, passed as repeated --region
  # flags. An empty list defers to cloud-nuke's default behavior, which is to
  # operate on all regions enabled in the account.
  cloud_nuke_target_regions = []

  # Fargate task CPU units allocated to the cloud-nuke task. See
  # https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-cpu-memory-error.html
  # for valid CPU/memory combinations.
  cloud_nuke_task_cpu = 512

  # Memory, in MB, allocated to the cloud-nuke Fargate task. See
  # https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-cpu-memory-error.html
  # for valid CPU/memory combinations.
  cloud_nuke_task_memory = 1024

  # ARN of an existing ECS cluster to run the cloud-nuke task on. When null,
  # this module creates a dedicated cluster named '<var.name>-cloud-nuke'. Only
  # used when var.enable_scheduled_cloud_nuke is true.
  ecs_cluster_arn = null

  # Email addresses to subscribe to the cost alerts SNS topic. Each address
  # receives an AWS confirmation email that must be acknowledged before delivery
  # begins.
  email_endpoints = []

  # Whether to provision AWS Cost Anomaly Detection. Requires the aws.us_east_1
  # aliased provider since CAD resources are global but only callable via
  # us-east-1.
  enable_anomaly_detection = true

  # Whether to provision AWS Budgets alerts. When true, each entry in
  # var.budgets becomes one aws_budgets_budget that publishes to the module's
  # SNS topic.
  enable_budget_alerts = true

  # Whether to provision an EventBridge-scheduled Fargate task that runs
  # cloud-nuke on var.cloud_nuke_schedule_expression. Off by default because
  # cloud-nuke is destructive. When true, var.vpc_id and var.subnet_ids must
  # also be set.
  enable_scheduled_cloud_nuke = false

  # Whether to deploy the Slack notifier Lambda and subscribe it to the cost
  # alerts SNS topic. When true, var.slack_webhook_url_secrets_manager_arn must
  # also be set.
  enable_slack_notifications = false

  # Memory, in MB, allocated to the Slack notifier Lambda.
  lambda_memory_size = 128

  # Maximum runtime, in seconds, of the Slack notifier Lambda before
  # termination.
  lambda_timeout = 30

  # Retention, in days, for CloudWatch logs of the Slack notifier Lambda and the
  # cloud-nuke Fargate task.
  log_retention_days = 30

  # ARN of a Secrets Manager secret whose SecretString is the Slack incoming
  # webhook URL. Required when var.enable_slack_notifications is true. The
  # Lambda reads this secret at runtime so the URL never appears in plan output
  # or Terraform state.
  slack_webhook_url_secrets_manager_arn = null

  # Private subnet IDs the cloud-nuke Fargate task launches into. Subnets must
  # have outbound internet access (e.g., via a NAT gateway) so the task can
  # reach AWS API endpoints. Required when var.enable_scheduled_cloud_nuke is
  # true.
  subnet_ids = []

  # VPC the cloud-nuke Fargate task runs in. Required when
  # var.enable_scheduled_cloud_nuke is true.
  vpc_id = null

}


```

</TabItem>
</Tabs>



## Reference


<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="account_name" requirement="required" type="string">
<HclListItemDescription>

Human-readable AWS account name (e.g., 'sandbox', 'prod-payments'). Included as a label in Slack notifications so a single channel can disambiguate alerts from multiple accounts.

</HclListItemDescription>
</HclListItem>

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

Name prefix applied to all resources created by this module (SNS topic, Budgets, CAD, Slack Lambda, cloud-nuke task).

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="acknowledge_destructive_cloud_nuke" requirement="optional" type="bool">
<HclListItemDescription>

Explicit acknowledgement that you intend to run cloud-nuke in destructive (non-dry-run) mode. To enable real deletions, this must be true AND <a href="#cloud_nuke_dry_run"><code>cloud_nuke_dry_run</code></a> must be false. Enforced by a plan-time precondition.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="anomaly_monitor_dimension" requirement="optional" type="string">
<HclListItemDescription>

Dimension to monitor for anomalies. One of SERVICE or LINKED_ACCOUNT.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;SERVICE&quot;"/>
</HclListItem>

<HclListItem name="anomaly_subscription_frequency" requirement="optional" type="string">
<HclListItemDescription>

Notification frequency for the anomaly subscription. AWS only allows IMMEDIATE for SNS subscribers; DAILY and WEEKLY require EMAIL subscribers and are rejected at apply time.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;IMMEDIATE&quot;"/>
</HclListItem>

<HclListItem name="anomaly_threshold_amount" requirement="optional" type="number">
<HclListItemDescription>

Minimum total impact, in USD, above which a detected anomaly triggers a subscription notification.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="100"/>
</HclListItem>

<HclListItem name="budgets" requirement="optional" type="list(object(…))">
<HclListItemDescription>

AWS Budgets to create. Each entry produces one aws_budgets_budget that publishes to the module's SNS topic when the threshold is crossed. Fields: 'name' is appended to <a href="#name"><code>name</code></a>; 'time_unit' must be DAILY, MONTHLY, QUARTERLY, or ANNUALLY; 'limit_amount' is the cap in USD; 'threshold_percent' is the percentage of limit_amount at which to alert; 'notification_type' must be ACTUAL or FORECASTED.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
list(object({
    name              = string
    time_unit         = string # DAILY | MONTHLY | QUARTERLY | ANNUALLY
    limit_amount      = number # USD
    threshold_percent = number
    notification_type = string # ACTUAL | FORECASTED
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
[
  {
    limit_amount = 75,
    name = "daily",
    notification_type = "ACTUAL",
    threshold_percent = 100,
    time_unit = "DAILY"
  },
  {
    limit_amount = 800,
    name = "monthly-actual",
    notification_type = "ACTUAL",
    threshold_percent = 100,
    time_unit = "MONTHLY"
  }
]
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="cloud_nuke_assign_public_ip" requirement="optional" type="bool">
<HclListItemDescription>

Whether to assign a public IP to the cloud-nuke Fargate task ENI. Set to true when running in public subnets without a NAT gateway (typical for AWS default VPCs) so the task can reach AWS API endpoints and the image registry.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="cloud_nuke_config_yaml" requirement="optional" type="string">
<HclListItemDescription>

Optional inline cloud-nuke config YAML. When non-null, the module writes the YAML to an S3 object and points cloud-nuke at it via --config. When null, no config file is passed and cloud-nuke uses its defaults. See https://github.com/gruntwork-io/cloud-nuke#config-file for the schema.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloud_nuke_dry_run" requirement="optional" type="bool">
<HclListItemDescription>

Whether to run cloud-nuke in --dry-run mode, which logs what cloud-nuke would delete without actually deleting anything. See <a href="#acknowledge_destructive_cloud_nuke"><code>acknowledge_destructive_cloud_nuke</code></a> for how to enable real deletions.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="cloud_nuke_image" requirement="optional" type="string">
<HclListItemDescription>

Container image reference for cloud-nuke (e.g. an ECR repository URI or a public image). Gruntwork does not currently publish a cloud-nuke OCI image, so operators must build and host their own — see the module README for a reference Dockerfile. Required when <a href="#enable_scheduled_cloud_nuke"><code>enable_scheduled_cloud_nuke</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="cloud_nuke_schedule_expression" requirement="optional" type="string">
<HclListItemDescription>

EventBridge Scheduler schedule expression for cloud-nuke runs. Accepts a cron(...) or rate(...) expression. The default is 07:00 UTC daily.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;cron(0 7 * * ? *)&quot;"/>
</HclListItem>

<HclListItem name="cloud_nuke_security_group_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

Security groups to attach to the cloud-nuke Fargate task ENI. Each must permit outbound HTTPS so the task can reach AWS API endpoints, S3 (for config), and ECR/GHCR (for the image pull). When empty, ECS attaches the VPC default security group, whose outbound rules may not permit these calls.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cloud_nuke_target_regions" requirement="optional" type="list(string)">
<HclListItemDescription>

AWS regions cloud-nuke should operate against, passed as repeated --region flags. An empty list defers to cloud-nuke's default behavior, which is to operate on all regions enabled in the account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="cloud_nuke_task_cpu" requirement="optional" type="number">
<HclListItemDescription>

Fargate task CPU units allocated to the cloud-nuke task. See https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-cpu-memory-error.html for valid CPU/memory combinations.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="512"/>
</HclListItem>

<HclListItem name="cloud_nuke_task_memory" requirement="optional" type="number">
<HclListItemDescription>

Memory, in MB, allocated to the cloud-nuke Fargate task. See https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-cpu-memory-error.html for valid CPU/memory combinations.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="1024"/>
</HclListItem>

<HclListItem name="ecs_cluster_arn" requirement="optional" type="string">
<HclListItemDescription>

ARN of an existing ECS cluster to run the cloud-nuke task on. When null, this module creates a dedicated cluster named '&lt;<a href="#name"><code>name</code></a>>-cloud-nuke'. Only used when <a href="#enable_scheduled_cloud_nuke"><code>enable_scheduled_cloud_nuke</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="email_endpoints" requirement="optional" type="list(string)">
<HclListItemDescription>

Email addresses to subscribe to the cost alerts SNS topic. Each address receives an AWS confirmation email that must be acknowledged before delivery begins.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="enable_anomaly_detection" requirement="optional" type="bool">
<HclListItemDescription>

Whether to provision AWS Cost Anomaly Detection. Requires the aws.us_east_1 aliased provider since CAD resources are global but only callable via us-east-1.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_budget_alerts" requirement="optional" type="bool">
<HclListItemDescription>

Whether to provision AWS Budgets alerts. When true, each entry in <a href="#budgets"><code>budgets</code></a> becomes one aws_budgets_budget that publishes to the module's SNS topic.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_scheduled_cloud_nuke" requirement="optional" type="bool">
<HclListItemDescription>

Whether to provision an EventBridge-scheduled Fargate task that runs cloud-nuke on <a href="#cloud_nuke_schedule_expression"><code>cloud_nuke_schedule_expression</code></a>. Off by default because cloud-nuke is destructive. When true, <a href="#vpc_id"><code>vpc_id</code></a> and <a href="#subnet_ids"><code>subnet_ids</code></a> must also be set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="enable_slack_notifications" requirement="optional" type="bool">
<HclListItemDescription>

Whether to deploy the Slack notifier Lambda and subscribe it to the cost alerts SNS topic. When true, <a href="#slack_webhook_url_secrets_manager_arn"><code>slack_webhook_url_secrets_manager_arn</code></a> must also be set.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="lambda_memory_size" requirement="optional" type="number">
<HclListItemDescription>

Memory, in MB, allocated to the Slack notifier Lambda.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="128"/>
</HclListItem>

<HclListItem name="lambda_timeout" requirement="optional" type="number">
<HclListItemDescription>

Maximum runtime, in seconds, of the Slack notifier Lambda before termination.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="log_retention_days" requirement="optional" type="number">
<HclListItemDescription>

Retention, in days, for CloudWatch logs of the Slack notifier Lambda and the cloud-nuke Fargate task.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="slack_webhook_url_secrets_manager_arn" requirement="optional" type="string">
<HclListItemDescription>

ARN of a Secrets Manager secret whose SecretString is the Slack incoming webhook URL. Required when <a href="#enable_slack_notifications"><code>enable_slack_notifications</code></a> is true. The Lambda reads this secret at runtime so the URL never appears in plan output or Terraform state.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="subnet_ids" requirement="optional" type="list(string)">
<HclListItemDescription>

Private subnet IDs the cloud-nuke Fargate task launches into. Subnets must have outbound internet access (e.g., via a NAT gateway) so the task can reach AWS API endpoints. Required when <a href="#enable_scheduled_cloud_nuke"><code>enable_scheduled_cloud_nuke</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="vpc_id" requirement="optional" type="string">
<HclListItemDescription>

VPC the cloud-nuke Fargate task runs in. Required when <a href="#enable_scheduled_cloud_nuke"><code>enable_scheduled_cloud_nuke</code></a> is true.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="anomaly_monitor_arn">
<HclListItemDescription>

ARN of the Cost Anomaly Detection monitor, or null when disabled.

</HclListItemDescription>
</HclListItem>

<HclListItem name="anomaly_subscription_arn">
<HclListItemDescription>

ARN of the Cost Anomaly Detection subscription, or null when disabled.

</HclListItemDescription>
</HclListItem>

<HclListItem name="budget_arns">
<HclListItemDescription>

ARNs of the AWS Budgets created by this module, keyed by budget name.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloud_nuke_schedule_name">
<HclListItemDescription>

Name of the EventBridge schedule that triggers cloud-nuke runs, or null when disabled.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloud_nuke_task_definition_arn">
<HclListItemDescription>

ARN of the cloud-nuke ECS task definition, or null when disabled.

</HclListItemDescription>
</HclListItem>

<HclListItem name="cloud_nuke_task_role_arn">
<HclListItemDescription>

ARN of the IAM role assumed by the cloud-nuke Fargate task — attach deletion permissions here. Null when scheduled cloud-nuke is disabled.

</HclListItemDescription>
</HclListItem>

<HclListItem name="slack_lambda_function_arn">
<HclListItemDescription>

ARN of the Slack notifier Lambda, or null when disabled.

</HclListItemDescription>
</HclListItem>

<HclListItem name="sns_topic_arn">
<HclListItemDescription>

ARN of the SNS topic that fans out Budgets and Cost Anomaly Detection notifications.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v2.11.1/modules/mgmt/cost-management/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v2.11.1/modules/mgmt/cost-management/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v2.11.1/modules/mgmt/cost-management/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "e2188d6c1a48638d36ec2a5f95dabc1e"
}
##DOCS-SOURCER-END -->
