---
title: "Control Tower Multi-Account Factory Async"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Control Tower" version="0.8.7" />

# Control Tower Multi-Account Factory Async

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.8.7/modules/landingzone/control-tower-multi-account-factory-async" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases?q=control-tower-multi-account-factory-async" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform/OpenTofu module provisions multiple AWS accounts using AWS Control Tower Account Factory, but does so asynchronously to avoid slow or blocking Terraform/OpenTofu apply steps. It also includes a mechanism to detect and remediate drifted or outdated AWS Service Catalog products outside of Terraform, using an EventBridge rule and a Lambda function. Under the hood, it leverages the [control-tower-account-factory-async](https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.8.7/modules/control-tower-account-factory-async) module for account creation.

## Background and Justification

The standard synchronous approach to provisioning or updating AWS accounts via Control Tower can lead to lengthy Terraform/OpenTofu runs, especially when Control Tower APIs are slow or when updating a large number of accounts. More importantly, certain types of "drift" caused by Control Tower changes are difficult to reconcile using Terraform/OpenTofu alone.

This module takes an asynchronous approach by deploying infrastructure (EventBridge rule + Lambda functions) that monitors for certain API calls. When relevant API actions are observed, the Lambda is triggerd to complete the update process independently of Terraform/OpenTofu.

This leads to:

*   Faster Terraform/OpenTofu applies
*   More scalable update workflows
*   Improved handling of state drift

## Why remediate provisioned_product_id drift?

In AWS Control Tower, certain changes made via the AWS Console or APIs result in drift from the Terraform/OpenTofu state. For example:

*   Moving an account to a new Organizational Unit (OU)
*   Updating the Account Factory product version
*   Modifying Service Catalog configurations

These actions change the `provisioned_product_id`, which causes Terraform/OpenTofu to report drift. Left unresolved, this will make your infrastructure state inconsistent.

By queuing and applying these updates asynchronously:

*   The drift is remediated safely and automatically
*   The Control Tower changes are reflected in your environment
*   You avoid the overhead and risk of long-running Terraform/OpenTofu changes

## How It Works

*   Terraform/OpenTofu creates an EventBridge rule and Lambda functions
    *   EventBridge rule listens via CloudTrail for API calls to [UpdateProvisioningArtifact](https://docs.aws.amazon.com/servicecatalog/latest/dg/API_UpdateProvisioningArtifact.html) or [UpdateProvisionedProduct](https://docs.aws.amazon.com/servicecatalog/latest/dg/API_UpgradeProduct.html)
*   When one of these API calls is detected, EventBridge triggers the Lambda ingest function
*   Ingest Lambda will indentify all provisioned products that require an update and queue them in DynamoDB
*   DynamoDB stream will trigger Worker Lambda on INSERT events
*   Worker Lambda will apply the necessary `provisioned_product_id` updates and verify success

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CONTROL-TOWER-MULTI-ACCOUNT-FACTORY-ASYNC MODULE
# ------------------------------------------------------------------------------------------------------

module "control_tower_multi_account_factory_async" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-multi-account-factory-async?ref=v0.8.7"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The absolute path to the folder to look for new account request files. Each
  # file should be named account-<NAME>.yml, where NAME is the name of an
  # account to create. Within the YAML file, you must define the following
  # fields: account_email (Account email, must be globally unique across all AWS
  # Accounts), sso_user_first_name (The first name of the user who will be
  # granted admin access to this new account through AWS SSO),
  # sso_user_last_name (The last name of the user who will be granted admin
  # access to this new account through AWS SSO), sso_user_email (The email
  # address of the user who will be granted admin access to this new account
  # through AWS SSO), organizational_unit_name (The name of the organizational
  # unit or OU in which this account should be created—must be one of the OUs
  # enrolled in Control Tower).
  account_requests_folder = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # If specified, this is assumed to be the absolute file path of a YAML file
  # where the details of the new accounts created by this module will be written
  # (if the file already exists, the module will merge its data into the file).
  # The expected format of this YAML file is that the keys are the account names
  # and the values are objects with the following keys: id (the account ID),
  # email (the root user email address for the account).
  accounts_yaml_path = null

  # The amount of time allowed for the create operation to take before being
  # considered to have failed.
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts
  create_operation_timeout = "60m"

  # The amount of time allowed for the delete operation to take before being
  # considered to have failed.
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts
  delete_operation_timeout = "60m"

  # If set to true, this module will look for the specified organizational unit
  # (OU) recursively under the root of the organization. If set to false, it
  # will only look for the OU directly under the root. This is useful if you
  # have nested OUs and want to create accounts in a child OU.
  discover_ous_recursively = false

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

  # The amount of time allowed for the read operation to take before being
  # considered to have failed.
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts
  read_operation_timeout = "20m"

  # The amount of time allowed for the update operation to take before being
  # considered to have failed.
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts
  update_operation_timeout = "60m"

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CONTROL-TOWER-MULTI-ACCOUNT-FACTORY-ASYNC MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-multi-account-factory-async?ref=v0.8.7"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The absolute path to the folder to look for new account request files. Each
  # file should be named account-<NAME>.yml, where NAME is the name of an
  # account to create. Within the YAML file, you must define the following
  # fields: account_email (Account email, must be globally unique across all AWS
  # Accounts), sso_user_first_name (The first name of the user who will be
  # granted admin access to this new account through AWS SSO),
  # sso_user_last_name (The last name of the user who will be granted admin
  # access to this new account through AWS SSO), sso_user_email (The email
  # address of the user who will be granted admin access to this new account
  # through AWS SSO), organizational_unit_name (The name of the organizational
  # unit or OU in which this account should be created—must be one of the OUs
  # enrolled in Control Tower).
  account_requests_folder = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # If specified, this is assumed to be the absolute file path of a YAML file
  # where the details of the new accounts created by this module will be written
  # (if the file already exists, the module will merge its data into the file).
  # The expected format of this YAML file is that the keys are the account names
  # and the values are objects with the following keys: id (the account ID),
  # email (the root user email address for the account).
  accounts_yaml_path = null

  # The amount of time allowed for the create operation to take before being
  # considered to have failed.
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts
  create_operation_timeout = "60m"

  # The amount of time allowed for the delete operation to take before being
  # considered to have failed.
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts
  delete_operation_timeout = "60m"

  # If set to true, this module will look for the specified organizational unit
  # (OU) recursively under the root of the organization. If set to false, it
  # will only look for the OU directly under the root. This is useful if you
  # have nested OUs and want to create accounts in a child OU.
  discover_ous_recursively = false

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

  # The amount of time allowed for the read operation to take before being
  # considered to have failed.
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts
  read_operation_timeout = "20m"

  # The amount of time allowed for the update operation to take before being
  # considered to have failed.
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts
  update_operation_timeout = "60m"

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="account_requests_folder" requirement="required" type="string">
<HclListItemDescription>

The absolute path to the folder to look for new account request files. Each file should be named account-&lt;NAME>.yml, where NAME is the name of an account to create. Within the YAML file, you must define the following fields: account_email (Account email, must be globally unique across all AWS Accounts), sso_user_first_name (The first name of the user who will be granted admin access to this new account through AWS SSO), sso_user_last_name (The last name of the user who will be granted admin access to this new account through AWS SSO), sso_user_email (The email address of the user who will be granted admin access to this new account through AWS SSO), organizational_unit_name (The name of the organizational unit or OU in which this account should be created—must be one of the OUs enrolled in Control Tower).

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="accounts_yaml_path" requirement="optional" type="string">
<HclListItemDescription>

If specified, this is assumed to be the absolute file path of a YAML file where the details of the new accounts created by this module will be written (if the file already exists, the module will merge its data into the file). The expected format of this YAML file is that the keys are the account names and the values are objects with the following keys: id (the account ID), email (the root user email address for the account).

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="create_operation_timeout" requirement="optional" type="string">
<HclListItemDescription>

The amount of time allowed for the create operation to take before being considered to have failed. https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;60m&quot;"/>
</HclListItem>

<HclListItem name="delete_operation_timeout" requirement="optional" type="string">
<HclListItemDescription>

The amount of time allowed for the delete operation to take before being considered to have failed. https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;60m&quot;"/>
</HclListItem>

<HclListItem name="discover_ous_recursively" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, this module will look for the specified organizational unit (OU) recursively under the root of the organization. If set to false, it will only look for the OU directly under the root. This is useful if you have nested OUs and want to create accounts in a child OU.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="lambda_ingest_kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

KMS key for encrypting ingest lambda log group

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="lambda_ingest_log_retention_in_days" requirement="optional" type="number">
<HclListItemDescription>

Number of days to retain logs for ingest lambda functions

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="lambda_ingest_memory_size" requirement="optional" type="number">
<HclListItemDescription>

Sets the memory_size in MB for the ingest lambda function used for async provisioning_artifact_id updates.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="256"/>
</HclListItem>

<HclListItem name="lambda_ingest_timeout" requirement="optional" type="number">
<HclListItemDescription>

Sets the timeout in seconds for the ingest lambda function used for async provisioning_artifact_id updates.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="900"/>
</HclListItem>

<HclListItem name="lambda_worker_batch_size" requirement="optional" type="number">
<HclListItemDescription>

Sets the batch size for the worker lambda function used for async provisioning_artifact_id updates.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="5"/>
</HclListItem>

<HclListItem name="lambda_worker_kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

KMS key for encrypting worker lambda log group

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="lambda_worker_log_retention_in_days" requirement="optional" type="number">
<HclListItemDescription>

Number of days to retain logs for worker lambda functions

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="lambda_worker_memory_size" requirement="optional" type="number">
<HclListItemDescription>

Sets the memory_size in MB for the worker lambda function used for async provisioning_artifact_id updates.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="256"/>
</HclListItem>

<HclListItem name="lambda_worker_timeout" requirement="optional" type="number">
<HclListItemDescription>

Sets the timeout in seconds for the worker lambda function used for async provisioning_artifact_id updates.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="900"/>
</HclListItem>

<HclListItem name="portfolio_name" requirement="optional" type="string">
<HclListItemDescription>

The name of your AWS Control Tower Account Factory Portfolio

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;AWS Control Tower Account Factory Portfolio&quot;"/>
</HclListItem>

<HclListItem name="read_operation_timeout" requirement="optional" type="string">
<HclListItemDescription>

The amount of time allowed for the read operation to take before being considered to have failed. https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;20m&quot;"/>
</HclListItem>

<HclListItem name="update_operation_timeout" requirement="optional" type="string">
<HclListItemDescription>

The amount of time allowed for the update operation to take before being considered to have failed. https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;60m&quot;"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="accounts">
<HclListItemDescription>

The data from all the AWS accounts created.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.8.7/modules/control-tower-multi-account-factory-async/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.8.7/modules/control-tower-multi-account-factory-async/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.8.7/modules/control-tower-multi-account-factory-async/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "57973487934c043a1556da41513b0dfa"
}
##DOCS-SOURCER-END -->
