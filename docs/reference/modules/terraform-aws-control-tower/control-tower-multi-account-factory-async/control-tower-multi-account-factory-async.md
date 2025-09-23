---
title: "Control Tower Multi-Account Factory Async"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Control Tower" version="1.0.2" lastModifiedVersion="1.0.2"/>

# Control Tower Multi-Account Factory Async

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.0.2/modules/landingzone/control-tower-multi-account-factory-async" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v1.0.2" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This OpenTofu/Terraform module provisions multiple AWS accounts using AWS Control Tower Account Factory. Under the hood, it leverages the [control-tower-account-factory-async](https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.0.2/modules/control-tower-account-factory-async) module for account creation. It also includes a separate mechanism to detect and remediate drifted or outdated AWS Service Catalog products asynchronously, outside of OpenTofu/Terraform, using an EventBridge rule, SQS, Lambda, and AWS Step Functions.

## Background and Justification

The standard synchronous approach to provisioning or updating AWS accounts via Control Tower can lead to lengthy OpenTofu/Terraform runs, especially when Control Tower APIs are slow or when updating a large number of accounts. More importantly, certain types of "drift" caused by Control Tower changes are difficult to reconcile using OpenTofu/Terraform alone.

This module takes an asynchronous approach by deploying infrastructure (EventBridge, SQS, Lambda, and AWS Step Functions) that monitors for certain API calls. When relevant API calls are made (`UpdateProvisioningArtifact` and `UpgradeProduct`), the Lambda is triggered to complete the update process independently of OpenTofu/Terraform.

This leads to:

*   Faster OpenTofu/Terraform applies
*   More scalable update workflows
*   Improved handling of state drift

## Why remediate provisioned_product_id drift?

In AWS Control Tower, certain changes made via the AWS Console or APIs result in drift from the OpenTofu/Terraform state. For example:

*   Moving an account to a new Organizational Unit (OU)
*   Updating the Account Factory product version
*   Modifying Service Catalog configurations

These actions change the `provisioned_product_id`, which causes OpenTofu/Terraform to report drift. Left unresolved, this will make your infrastructure state inconsistent. Since the AWS Provider drives all changes to your Service Catalog provisioned products via updates to the `provisioned_product_id`, the value needs to be up to date to continue making changes to it.

By queuing and applying these updates asynchronously:

*   The drift is remediated safely and automatically
*   The Control Tower changes are reflected in your environment
*   You avoid the overhead and risk of long-running OpenTofu/Terraform changes

## How It Works

*   EventBridge Rule: Listens via CloudTrail for UpdateProvisioningArtifact or UpgradeProduct API calls.
*   Ingest Lambda: Triggered by the EventBridge rule, it finds all provisioned products that need an update and queues them in an SQS FIFO queue. This ensures order and prevents race conditions.
*   SQS Queue: Serves as a reliable, asynchronous work queue. It is configured as a FIFO queue with content-based deduplication and a Dead-Letter Queue (DLQ).
*   Worker Lambda: Triggered by messages from the SQS queue, it applies the necessary provisioned_product_id updates by calling UpdateProvisionedProduct. It then initiates an AWS Step Functions state machine to track the update.
*   AWS Step Functions state machine: Periodically checks the status of the Service Catalog update record to verify that it has succeeded or failed, ensuring the update is fully completed.

### Controlling Concurrency

AWS Service Catalog currently enforces a [hard limit of 5 account-related operations concurrently](https://docs.aws.amazon.com/controltower/latest/userguide/provision-and-manage-accounts.html#:~:text=You%20can%20perform%20up%20to%20five%20\(5\)%20account%2Drelated%20operations%20concurrently%2C%20including%20provisioning%2C%20updating%2C%20and%20enrolling.) that includes provisioning, updating, and enrolling. Exceeding this limit may result in throttling errors or failed updates.

To respect this limitation and offer flexibility, this module provides a configurable variable `lambda_worker_max_concurrent_operations` that governs how many updates will be performed in parallel. While the upper limit is 5 (per AWS constraints), setting it lower may be preferred in environments where other Service Catalog actions must occur concurrently (such as provisioning new accounts). This ensures that background remediation work does not block critical operations or trigger rate limiting.

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CONTROL-TOWER-MULTI-ACCOUNT-FACTORY-ASYNC MODULE
# ------------------------------------------------------------------------------------------------------

module "control_tower_multi_account_factory_async" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-multi-account-factory-async?ref=v1.0.2"

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

  # Sets the timeout in seconds for the worker lambda function used for async
  # provisioning_artifact_id updates.
  lambda_worker_timeout = 900

  # The name of your AWS Control Tower Account Factory Portfolio
  portfolio_name = "AWS Control Tower Account Factory Portfolio"

  # The region where the portfolio exists. This is passed to the
  # lookup-portfolio-id.sh script. Can be overriden by the env var AWS_REGION.
  portfolio_region = "us-east-1"

  # The amount of time allowed for the read operation to take before being
  # considered to have failed.
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts
  read_operation_timeout = "20m"

  # The number of seconds for the Step Function 'Wait' state.
  sfn_wait_time_seconds = 30

  # Sets the number of times a consumer (worker lambda) can receive a message
  # from SQS before it is moved to a dead-letter queue
  sqs_max_receive_count = 5

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
  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-multi-account-factory-async?ref=v1.0.2"
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

  # Sets the timeout in seconds for the worker lambda function used for async
  # provisioning_artifact_id updates.
  lambda_worker_timeout = 900

  # The name of your AWS Control Tower Account Factory Portfolio
  portfolio_name = "AWS Control Tower Account Factory Portfolio"

  # The region where the portfolio exists. This is passed to the
  # lookup-portfolio-id.sh script. Can be overriden by the env var AWS_REGION.
  portfolio_region = "us-east-1"

  # The amount of time allowed for the read operation to take before being
  # considered to have failed.
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts
  read_operation_timeout = "20m"

  # The number of seconds for the Step Function 'Wait' state.
  sfn_wait_time_seconds = 30

  # Sets the number of times a consumer (worker lambda) can receive a message
  # from SQS before it is moved to a dead-letter queue
  sqs_max_receive_count = 5

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

<HclListItem name="lambda_worker_max_concurrent_operations" requirement="optional" type="number">
<HclListItemDescription>

Service Catalog supports a maximum of 5 account updates currently. This variable controls the maximum concurrent operations that the worker lambda can initiate. It should not exceed 5 due to AWS Service Catalog limits, but some users may want to set it lower than 5 to provide enough overhead for other actions such as new account creation. Default value is 4.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="4"/>
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

<HclListItem name="portfolio_region" requirement="optional" type="string">
<HclListItemDescription>

The region where the portfolio exists. This is passed to the lookup-portfolio-id.sh script. Can be overriden by the env var AWS_REGION.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;us-east-1&quot;"/>
</HclListItem>

<HclListItem name="read_operation_timeout" requirement="optional" type="string">
<HclListItemDescription>

The amount of time allowed for the read operation to take before being considered to have failed. https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;20m&quot;"/>
</HclListItem>

<HclListItem name="sfn_wait_time_seconds" requirement="optional" type="number">
<HclListItemDescription>

The number of seconds for the Step Function 'Wait' state.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="sqs_max_receive_count" requirement="optional" type="number">
<HclListItemDescription>

Sets the number of times a consumer (worker lambda) can receive a message from SQS before it is moved to a dead-letter queue

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="5"/>
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
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.0.2/modules/control-tower-multi-account-factory-async/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.0.2/modules/control-tower-multi-account-factory-async/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v1.0.2/modules/control-tower-multi-account-factory-async/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "b59ddb8574af81f1c8e7dc4c1a127bf5"
}
##DOCS-SOURCER-END -->
