---
title: "Control Tower Provisioned Product Artifact Updater"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Control Tower" version="0.8.7" />

# Control Tower Provisioned Product Artifact Updater

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.8.7/modules/landingzone/control-tower-provisioned-product-artifact-updater" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases?q=control-tower-provisioned-product-artifact-updater" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This OpenTofu/Terraform module automates the detection and update of AWS Service Catalog provisioned products in response to [UpdateProvisioningArtifact](https://docs.aws.amazon.com/servicecatalog/latest/dg/API_UpdateProvisioningArtifact.html) or [UpdateProvisionedProduct](https://docs.aws.amazon.com/servicecatalog/latest/dg/API_UpgradeProduct.html) API calls. AWS EventBridge, SQS, Lambda, and Step Functions to create a scalable, asynchronous update mechanism that safely propagates new artifact versions to affected accounts.

## Use Cases

When a new Provisioning Artifact is published in AWS Service Catalog, any accounts using an outdated artifact are automatically queued for an update. This module:

*   Detects UpdateProvisioningArtifact or UpgradeProduct events via EventBridge.
*   Finds impacted provisioned products across your organization.
*   Queues update jobs in SQS with deduplication and a dead-letter queue.
*   Applies the new provisioning artifact via a worker Lambda.
*   Verifies and tracks the update status using a Step Function state machine.

## Components

### Lambda Functions

*   ingest_lambda: Triggered by Service Catalog update events from EventBridge. It finds provisioned products that need an update and queues them in an SQS FIFO queue.
*   worker_lambda: Triggered by messages from the SQS queue. It applies the update using UpdateProvisionedProduct and then initiates a Step Function execution to track the update's progress.

### SQS Queue

*   Used as a work queue.
*   Configured as a FIFO queue to ensure ordered processing and prevent race conditions for a single provisioned product.
*   Content-based deduplication is enabled.
*   A Dead-Letter Queue (DLQ) is configured for failed messages.

### Step Function

*   A state machine that tracks the status of the Service Catalog update record.
*   It uses a Wait state and a loop to periodically check the status of the update until it is SUCCEEDED or FAILED.

### EventBridge

*   Captures UpdateProvisioningArtifact and UpgradeProduct API calls.
*   Filters out self-executed calls (originating from the ingest_lambda role) to avoid feedback loops.

### IAM Roles & Policies

*   Lambda roles with policies allowing access to:
    *   SQS (send messages for ingest_lambda, receive/delete messages for worker_lambda)
    *   Service Catalog (search/describe provisioned products, update products, describe records)
    *   Identity Store (list/describe users)
    *   Organizations (list parents/describe OUs)
    *   Step Functions (start execution)
    *   CloudWatch Logs
*   Associated with the AWS Control Tower Account Factory Portfolio for Service Catalog access.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CONTROL-TOWER-PROVISIONED-PRODUCT-ARTIFACT-UPDATER MODULE
# ------------------------------------------------------------------------------------------------------

module "control_tower_provisioned_product_artifact_updater" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-provisioned-product-artifact-updater?ref=v0.8.7"

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # KMS key for encrypting ingest lambda log group
  lambda_ingest_kms_key_id = null

  # Number of days to retain logs for ingest lambda functions
  lambda_ingest_log_retention_in_days = 30

  # Sets the memory_size in MB for the ingest lambda function used for async
  # provisioning_artifact_id updates.
  lambda_ingest_memory_size = 256

  # The runtime for the lambda ingest function
  lambda_ingest_runtime = "python3.13"

  # Sets the timeout in seconds for the ingest lambda function used for async
  # provisioning_artifact_id updates.
  lambda_ingest_timeout = 900

  # Sets the batch size for the worker lambda function used for async
  # provisioning_artifact_id updates.
  lambda_worker_batch_size = 5

  # KMS key for encrypting worker lambda log group
  lambda_worker_kms_key_id = null

  # Number of days to retain logs for worker lambda functions
  lambda_worker_log_retention_in_days = 30

  # Service Catalog supports a maximum of 5 account updates currently. This
  # variable controls the maximum concurrent operations that the worker lambda
  # can initiate. It should not exceed 5 due to AWS Service Catalog limits, but
  # some users may want to set it lower than 5 to provide enough overhead for
  # other actions such as new account creation. Default value is 4.
  lambda_worker_max_concurrent_operations = 4

  # Sets the memory_size in MB for the worker lambda function used for async
  # provisioning_artifact_id updates.
  lambda_worker_memory_size = 256

  # The runtime for the lambda worker function
  lambda_worker_runtime = "python3.13"

  # Sets the timeout in seconds for the worker lambda function used for async
  # provisioning_artifact_id updates.
  lambda_worker_timeout = 900

  # The name of your AWS Control Tower Account Factory Portfolio
  portfolio_name = "AWS Control Tower Account Factory Portfolio"

  # The number of seconds for the Step Function 'Wait' state.
  sfn_wait_time_seconds = 30

  # Sets the number of times a consumer (worker lambda) can receive a message
  # from SQS before it is moved to a dead-letter queue
  sqs_max_receive_count = 5

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CONTROL-TOWER-PROVISIONED-PRODUCT-ARTIFACT-UPDATER MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-provisioned-product-artifact-updater?ref=v0.8.7"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # KMS key for encrypting ingest lambda log group
  lambda_ingest_kms_key_id = null

  # Number of days to retain logs for ingest lambda functions
  lambda_ingest_log_retention_in_days = 30

  # Sets the memory_size in MB for the ingest lambda function used for async
  # provisioning_artifact_id updates.
  lambda_ingest_memory_size = 256

  # The runtime for the lambda ingest function
  lambda_ingest_runtime = "python3.13"

  # Sets the timeout in seconds for the ingest lambda function used for async
  # provisioning_artifact_id updates.
  lambda_ingest_timeout = 900

  # Sets the batch size for the worker lambda function used for async
  # provisioning_artifact_id updates.
  lambda_worker_batch_size = 5

  # KMS key for encrypting worker lambda log group
  lambda_worker_kms_key_id = null

  # Number of days to retain logs for worker lambda functions
  lambda_worker_log_retention_in_days = 30

  # Service Catalog supports a maximum of 5 account updates currently. This
  # variable controls the maximum concurrent operations that the worker lambda
  # can initiate. It should not exceed 5 due to AWS Service Catalog limits, but
  # some users may want to set it lower than 5 to provide enough overhead for
  # other actions such as new account creation. Default value is 4.
  lambda_worker_max_concurrent_operations = 4

  # Sets the memory_size in MB for the worker lambda function used for async
  # provisioning_artifact_id updates.
  lambda_worker_memory_size = 256

  # The runtime for the lambda worker function
  lambda_worker_runtime = "python3.13"

  # Sets the timeout in seconds for the worker lambda function used for async
  # provisioning_artifact_id updates.
  lambda_worker_timeout = 900

  # The name of your AWS Control Tower Account Factory Portfolio
  portfolio_name = "AWS Control Tower Account Factory Portfolio"

  # The number of seconds for the Step Function 'Wait' state.
  sfn_wait_time_seconds = 30

  # Sets the number of times a consumer (worker lambda) can receive a message
  # from SQS before it is moved to a dead-letter queue
  sqs_max_receive_count = 5

}


```

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.8.7/modules/control-tower-provisioned-product-artifact-updater/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.8.7/modules/control-tower-provisioned-product-artifact-updater/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.8.7/modules/control-tower-provisioned-product-artifact-updater/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "a135c23a8a9747a5ba914afe72d05d62"
}
##DOCS-SOURCER-END -->
