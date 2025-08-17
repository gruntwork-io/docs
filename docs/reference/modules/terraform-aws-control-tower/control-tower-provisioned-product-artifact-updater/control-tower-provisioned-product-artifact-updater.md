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

This Terraform/OpenTofu module automates the detection and update of AWS Service Catalog provisioned products in response to [UpdateProvisioningArtifact](https://docs.aws.amazon.com/servicecatalog/latest/dg/API_UpdateProvisioningArtifact.html) or [UpdateProvisionedProduct](https://docs.aws.amazon.com/servicecatalog/latest/dg/API_UpgradeProduct.html) API calls. It uses AWS EventBridge, Lambda, and DynamoDB to create a scalable, async update mechanism that safely propagates new artifact versions to affected accounts.

## Use Cases

When a new Provisioning Artifact is published in AWS Service Catalog, any accounts using an outdated artifact are automatically queued for an update. This module:

*   Detects UpdateProvisioningArtifact or UpgradeProduct events via EventBridge.
*   Finds impacted provisioned products across your organization.
*   Queues update jobs in DynamoDB (with deduplication).
*   Applies the new provisioning artifact via a worker Lambda (with concurrency controls).
*   Verifies the result and tracks retries/errors.

## Components

### Lambda Functions

*   ingest_lambda: Triggered by Service Catalog update events. It finds provisioned products that need an update and queues them in DynamoDB.
*   worker_lambda: Triggered by DynamoDB stream on INSERT events with status PENDING. Applies the update using UpdateProvisionedProduct and verifies success.

### DynamoDB Table

*   Used as a work queue.
*   Includes GSIs for:
    *   ProvisionedProductIndex (deduplication)
    *   StatusIndex (querying PENDING items)
*   TTL enabled (default: 1 day).
*   Streams enabled (used to trigger worker_lambda).

### EventBridge

*   Captures UpdateProvisioningArtifact and UpgradeProduct API calls.
*   Filters out self-executed calls to avoid feedback loops.

### IAM Roles & Policies

*   Lambda role with access to:
    *   DynamoDB (read/write)
    *   Service Catalog (update/query)
    *   CloudWatch Logs
*   Associated with AWS Control Tower Account Factory Portfolio for SC access.

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

  # Sets the memory_size in MB for the worker lambda function used for async
  # provisioning_artifact_id updates.
  lambda_worker_memory_size = 256

  # Sets the timeout in seconds for the worker lambda function used for async
  # provisioning_artifact_id updates.
  lambda_worker_timeout = 900

  # The name of your AWS Control Tower Account Factory Portfolio
  portfolio_name = "AWS Control Tower Account Factory Portfolio"

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

  # Sets the memory_size in MB for the worker lambda function used for async
  # provisioning_artifact_id updates.
  lambda_worker_memory_size = 256

  # Sets the timeout in seconds for the worker lambda function used for async
  # provisioning_artifact_id updates.
  lambda_worker_timeout = 900

  # The name of your AWS Control Tower Account Factory Portfolio
  portfolio_name = "AWS Control Tower Account Factory Portfolio"

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
  "hash": "bfb30b7e7af84e87aefbade1a3c434f9"
}
##DOCS-SOURCER-END -->
