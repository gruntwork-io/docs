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

This is a Terraform module that will trigger the creation of multiple new AWS accounts by using Control Tower. Under
the hood, this module uses the [control-tower-account-factory](https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.8.7/modules/control-tower-account-factory) module.

Special note: This module is designed to not directly apply changes when the `provisioned_product_id` changes for an
account. Instead, it will trigger a Lambda function that will perform the update outside of Terraform. This is done
to avoid time-consuming Terraform apply runs.

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

  # If set to true, this module will use a Bash script to try to find the
  # Control Tower provisioning artifact ID automatically. Due to a Terraform bug
  # (https://github.com/hashicorp/terraform-provider-aws/issues/24362), the
  # aws_servicecatalog_provisioned_product resource doesn't always find the AWS
  # Service Catalog provisioning artifact ID correctly, so using this Bash
  # script is our temporary workaround. This way, you don't have to set
  # provisioning_artifact_id manually—and update it every time it changes! Note
  # that this script requires the AWS CLI to be installed and on the PATH.
  find_provisioning_artifact_id_using_script = true

  # Sets the batch size for the lambda function used for async
  # provisioning_artifact_id updates.
  lambda_batch_size = 5

  # KMS key for encrypting Lambda log group
  lambda_kms_key_id = null

  # Number of days to retain logs for Lambda functions
  lambda_log_retention_in_days = 30

  # Sets the memory_size in MB for the lambda function used for async
  # provisioning_artifact_id updates.
  lambda_memory_size = 256

  # Sets the timeout in seconds for the lambda function used for async
  # provisioning_artifact_id updates.
  lambda_timeout = 900

  # The name of your AWS Control Tower Account Factory Portfolio
  portfolio_name = "AWS Control Tower Account Factory Portfolio"

  # The ID of the AWS Control Tower Account Factory provisioning artifact in AWS
  # Service Catalog to use. If find_provisioning_artifact_id_using_script is set
  # to true, we will look up the ID automatically, and you don't need to set
  # this parameter. However, if find_provisioning_artifact_id_using_script is
  # false, you should set this parameter, as, due to a Terraform bug
  # (https://github.com/hashicorp/terraform-provider-aws/issues/24362), the
  # aws_servicecatalog_provisioned_product resource fails to look this up
  # automatically. You can find the ID manually by going to the Product List in
  # the AWS Service Catalog console
  # (https://console.aws.amazon.com/servicecatalog/home#admin-products),
  # clicking the 'AWS Control Tower Account Factory' product, and grabbing the
  # ID of the latest product version from the Product Versions table at the
  # bottom.
  provisioning_artifact_id = null

  # The amount of time allowed for the read operation to take before being
  # considered to have failed.
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts
  read_operation_timeout = "20m"

  # Sets the visibility_timeout_seconds for the SQS queue used for async
  # provisioning_artifact_id updates.
  sqs_queue_visibility_timeout_seconds = 910

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

  # If set to true, this module will use a Bash script to try to find the
  # Control Tower provisioning artifact ID automatically. Due to a Terraform bug
  # (https://github.com/hashicorp/terraform-provider-aws/issues/24362), the
  # aws_servicecatalog_provisioned_product resource doesn't always find the AWS
  # Service Catalog provisioning artifact ID correctly, so using this Bash
  # script is our temporary workaround. This way, you don't have to set
  # provisioning_artifact_id manually—and update it every time it changes! Note
  # that this script requires the AWS CLI to be installed and on the PATH.
  find_provisioning_artifact_id_using_script = true

  # Sets the batch size for the lambda function used for async
  # provisioning_artifact_id updates.
  lambda_batch_size = 5

  # KMS key for encrypting Lambda log group
  lambda_kms_key_id = null

  # Number of days to retain logs for Lambda functions
  lambda_log_retention_in_days = 30

  # Sets the memory_size in MB for the lambda function used for async
  # provisioning_artifact_id updates.
  lambda_memory_size = 256

  # Sets the timeout in seconds for the lambda function used for async
  # provisioning_artifact_id updates.
  lambda_timeout = 900

  # The name of your AWS Control Tower Account Factory Portfolio
  portfolio_name = "AWS Control Tower Account Factory Portfolio"

  # The ID of the AWS Control Tower Account Factory provisioning artifact in AWS
  # Service Catalog to use. If find_provisioning_artifact_id_using_script is set
  # to true, we will look up the ID automatically, and you don't need to set
  # this parameter. However, if find_provisioning_artifact_id_using_script is
  # false, you should set this parameter, as, due to a Terraform bug
  # (https://github.com/hashicorp/terraform-provider-aws/issues/24362), the
  # aws_servicecatalog_provisioned_product resource fails to look this up
  # automatically. You can find the ID manually by going to the Product List in
  # the AWS Service Catalog console
  # (https://console.aws.amazon.com/servicecatalog/home#admin-products),
  # clicking the 'AWS Control Tower Account Factory' product, and grabbing the
  # ID of the latest product version from the Product Versions table at the
  # bottom.
  provisioning_artifact_id = null

  # The amount of time allowed for the read operation to take before being
  # considered to have failed.
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts
  read_operation_timeout = "20m"

  # Sets the visibility_timeout_seconds for the SQS queue used for async
  # provisioning_artifact_id updates.
  sqs_queue_visibility_timeout_seconds = 910

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

<HclListItem name="find_provisioning_artifact_id_using_script" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, this module will use a Bash script to try to find the Control Tower provisioning artifact ID automatically. Due to a Terraform bug (https://github.com/hashicorp/terraform-provider-aws/issues/24362), the aws_servicecatalog_provisioned_product resource doesn't always find the AWS Service Catalog provisioning artifact ID correctly, so using this Bash script is our temporary workaround. This way, you don't have to set provisioning_artifact_id manually—and update it every time it changes! Note that this script requires the AWS CLI to be installed and on the PATH.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="lambda_batch_size" requirement="optional" type="number">
<HclListItemDescription>

Sets the batch size for the lambda function used for async provisioning_artifact_id updates.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="5"/>
</HclListItem>

<HclListItem name="lambda_kms_key_id" requirement="optional" type="string">
<HclListItemDescription>

KMS key for encrypting Lambda log group

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="lambda_log_retention_in_days" requirement="optional" type="number">
<HclListItemDescription>

Number of days to retain logs for Lambda functions

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="lambda_memory_size" requirement="optional" type="number">
<HclListItemDescription>

Sets the memory_size in MB for the lambda function used for async provisioning_artifact_id updates.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="256"/>
</HclListItem>

<HclListItem name="lambda_timeout" requirement="optional" type="number">
<HclListItemDescription>

Sets the timeout in seconds for the lambda function used for async provisioning_artifact_id updates.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="900"/>
</HclListItem>

<HclListItem name="portfolio_name" requirement="optional" type="string">
<HclListItemDescription>

The name of your AWS Control Tower Account Factory Portfolio

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;AWS Control Tower Account Factory Portfolio&quot;"/>
</HclListItem>

<HclListItem name="provisioning_artifact_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the AWS Control Tower Account Factory provisioning artifact in AWS Service Catalog to use. If find_provisioning_artifact_id_using_script is set to true, we will look up the ID automatically, and you don't need to set this parameter. However, if find_provisioning_artifact_id_using_script is false, you should set this parameter, as, due to a Terraform bug (https://github.com/hashicorp/terraform-provider-aws/issues/24362), the aws_servicecatalog_provisioned_product resource fails to look this up automatically. You can find the ID manually by going to the Product List in the AWS Service Catalog console (https://console.aws.amazon.com/servicecatalog/home#admin-products), clicking the 'AWS Control Tower Account Factory' product, and grabbing the ID of the latest product version from the Product Versions table at the bottom.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="read_operation_timeout" requirement="optional" type="string">
<HclListItemDescription>

The amount of time allowed for the read operation to take before being considered to have failed. https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;20m&quot;"/>
</HclListItem>

<HclListItem name="sqs_queue_visibility_timeout_seconds" requirement="optional" type="number">
<HclListItemDescription>

Sets the visibility_timeout_seconds for the SQS queue used for async provisioning_artifact_id updates.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="910"/>
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
  "hash": "e1f45e5bfb822db26db6febffcd5844f"
}
##DOCS-SOURCER-END -->
