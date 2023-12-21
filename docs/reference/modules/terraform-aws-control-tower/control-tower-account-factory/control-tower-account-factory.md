---
title: "Control Tower Account Factory"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Control Tower" version="0.3.0" lastModifiedVersion="0.1.1"/>

# Control Tower Account Factory

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.3.0/modules/landingzone/control-tower-account-factory" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-control-tower/releases/tag/v0.1.1" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This is a Terraform module that will trigger the creation of a new AWS account by using Control Tower.

Under the hood, this module uses AWS Service Catalog to trigger Control Tower, as Control Tower does not currently
expose any APIs to trigger it directly.

## Control Tower Service Catalog YAML

The below YAML is copied from the Control Tower product in AWS Service Catalog. It is useful in knowing what
parameters to pass to this Service Catalog product:

*Note: some of the data below (e.g., the `AllowedValues` for `ManagedOrganizationalUnit`) is auto-generated for each
AWS organization, so it will vary from org to org.*

```yaml
AWSTemplateFormatVersion: 2010-09-09
Description: AWS Control Tower Account Factory Template (DO NOT DELETE)
Parameters:
  AccountName:
    Description: "Account name, the new managed Account will be created with this name."
    Type: String
    AllowedPattern : ".+"
  AccountEmail:
    Description: "Account email, must be unique for each AWS Account."
    Type: String
    AllowedPattern : "[^\\s@]+@[^\\s@]+\\.[^\\s@]+"
  SSOUserFirstName:
    Description:  "SSO user first name."
    Type: String
    AllowedPattern : ".+"
  SSOUserLastName:
    Description:  "SSO user last name."
    Type: String
    AllowedPattern : ".+"
  SSOUserEmail:
    Description: "SSO user email. A new SSO user will be created for this email, if it does not exist. This SSO user will be associated with the new managed Account."
    Type: String
    AllowedPattern : "[^\\s@]+@[^\\s@]+\\.[^\\s@]+"
  ManagedOrganizationalUnit:
    Description: "Your account will be added to this registered organizational unit. The list includes top-level and nested OUs registered with AWS Control Tower. You can search for an OU by name or ID. To manage these OUs, go to AWS Control Tower."
    Type: String
    AllowedValues:
      - XXX (ou-abcd-12345678)
      - YYY (ou-abcd-91011121)
      - ZZZ (ou-abcd-34151617)
Resources:
  WaitCondition:
    Type: AWS::CloudFormation::WaitCondition
    Properties:
      Handle: WaitHandle
      Timeout: 1
  WaitHandle:
    Type: AWS::CloudFormation::WaitConditionHandle
```

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S CONTROL-TOWER-ACCOUNT-FACTORY MODULE
# ------------------------------------------------------------------------------------------------------

module "control_tower_account_factory" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-account-factory?ref=v0.3.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Account email, must be globally unique across all AWS Accounts.
  account_email = <string>

  # The name to use for the new AWS account
  account_name = <string>

  # The name of the organizational unit (OU) in which this account should be
  # created. Must be one of the OUs in your Control Tower dashboard.
  organizational_unit_name = <string>

  # The email address of the user who will be granted admin access to this new
  # account through AWS SSO.
  sso_user_email = <string>

  # The first name of the user who will be granted admin access to this new
  # account through AWS SSO.
  sso_user_first_name = <string>

  # The last name of the user who will be granted admin access to this new
  # account through AWS SSO.
  sso_user_last_name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # If specified, this is assumed to be the file path of a YAML file where the
  # details of the new account created by this module will be written (if the
  # file already exists, the module will merge its data into the file). The
  # expected format of this YAML file is that the keys are the account names and
  # the values are objects with the following keys: id (the account ID), email
  # (the root user email address for the account).
  accounts_yaml_path = null

  # The amount of time allowed for the create operation to take before being
  # considered to have failed.
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts
  create_operation_timeout = "60m"

  # The amount of time allowed for the delete operation to take before being
  # considered to have failed.
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts
  delete_operation_timeout = "60m"

  # If set to true, this module will use a Bash script to try to find the
  # Control Tower provisioning artifact ID automatically. Due to a Terraform bug
  # (https://github.com/hashicorp/terraform-provider-aws/issues/24362), the
  # aws_servicecatalog_provisioned_product resource doesn't always find the AWS
  # Service Catalog provisioning artifact ID correctly, so using this Bash
  # script is our temporary workaround. This way, you don't have to set
  # provisioning_artifact_id manually—and update it every time it changes! Note
  # that this script requires the AWS CLI to be installed and on the PATH.
  find_provisioning_artifact_id_using_script = true

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
  # ID of the latest 'active' product version from the Product Versions table at
  # the bottom.
  provisioning_artifact_id = null

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
# DEPLOY GRUNTWORK'S CONTROL-TOWER-ACCOUNT-FACTORY MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-control-tower.git//modules/landingzone/control-tower-account-factory?ref=v0.3.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Account email, must be globally unique across all AWS Accounts.
  account_email = <string>

  # The name to use for the new AWS account
  account_name = <string>

  # The name of the organizational unit (OU) in which this account should be
  # created. Must be one of the OUs in your Control Tower dashboard.
  organizational_unit_name = <string>

  # The email address of the user who will be granted admin access to this new
  # account through AWS SSO.
  sso_user_email = <string>

  # The first name of the user who will be granted admin access to this new
  # account through AWS SSO.
  sso_user_first_name = <string>

  # The last name of the user who will be granted admin access to this new
  # account through AWS SSO.
  sso_user_last_name = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # If specified, this is assumed to be the file path of a YAML file where the
  # details of the new account created by this module will be written (if the
  # file already exists, the module will merge its data into the file). The
  # expected format of this YAML file is that the keys are the account names and
  # the values are objects with the following keys: id (the account ID), email
  # (the root user email address for the account).
  accounts_yaml_path = null

  # The amount of time allowed for the create operation to take before being
  # considered to have failed.
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts
  create_operation_timeout = "60m"

  # The amount of time allowed for the delete operation to take before being
  # considered to have failed.
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product#timeouts
  delete_operation_timeout = "60m"

  # If set to true, this module will use a Bash script to try to find the
  # Control Tower provisioning artifact ID automatically. Due to a Terraform bug
  # (https://github.com/hashicorp/terraform-provider-aws/issues/24362), the
  # aws_servicecatalog_provisioned_product resource doesn't always find the AWS
  # Service Catalog provisioning artifact ID correctly, so using this Bash
  # script is our temporary workaround. This way, you don't have to set
  # provisioning_artifact_id manually—and update it every time it changes! Note
  # that this script requires the AWS CLI to be installed and on the PATH.
  find_provisioning_artifact_id_using_script = true

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
  # ID of the latest 'active' product version from the Product Versions table at
  # the bottom.
  provisioning_artifact_id = null

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

<HclListItem name="account_email" requirement="required" type="string">
<HclListItemDescription>

Account email, must be globally unique across all AWS Accounts.

</HclListItemDescription>
</HclListItem>

<HclListItem name="account_name" requirement="required" type="string">
<HclListItemDescription>

The name to use for the new AWS account

</HclListItemDescription>
<HclGeneralListItem title="More Details">
<details>


```hcl

   AWS requires the account name to be at most 50 characters: https://docs.aws.amazon.com/organizations/latest/APIReference/API_Account.htmlorganizations-Type-Account-Name
   However, we use the account name as part of an S3 bucket name, along with a -<REGION>-tf-state suffix, which adds up to ~25 characters.
   S3 bucket names are limited to 63 characters: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html
   So, 63 - 25 = 38, so to be on the safe side, that's the limit we enforce here.

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="organizational_unit_name" requirement="required" type="string">
<HclListItemDescription>

The name of the organizational unit (OU) in which this account should be created. Must be one of the OUs in your Control Tower dashboard.

</HclListItemDescription>
</HclListItem>

<HclListItem name="sso_user_email" requirement="required" type="string">
<HclListItemDescription>

The email address of the user who will be granted admin access to this new account through AWS SSO.

</HclListItemDescription>
</HclListItem>

<HclListItem name="sso_user_first_name" requirement="required" type="string">
<HclListItemDescription>

The first name of the user who will be granted admin access to this new account through AWS SSO.

</HclListItemDescription>
</HclListItem>

<HclListItem name="sso_user_last_name" requirement="required" type="string">
<HclListItemDescription>

The last name of the user who will be granted admin access to this new account through AWS SSO.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="accounts_yaml_path" requirement="optional" type="string">
<HclListItemDescription>

If specified, this is assumed to be the file path of a YAML file where the details of the new account created by this module will be written (if the file already exists, the module will merge its data into the file). The expected format of this YAML file is that the keys are the account names and the values are objects with the following keys: id (the account ID), email (the root user email address for the account).

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

<HclListItem name="find_provisioning_artifact_id_using_script" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, this module will use a Bash script to try to find the Control Tower provisioning artifact ID automatically. Due to a Terraform bug (https://github.com/hashicorp/terraform-provider-aws/issues/24362), the aws_servicecatalog_provisioned_product resource doesn't always find the AWS Service Catalog provisioning artifact ID correctly, so using this Bash script is our temporary workaround. This way, you don't have to set provisioning_artifact_id manually—and update it every time it changes! Note that this script requires the AWS CLI to be installed and on the PATH.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="provisioning_artifact_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the AWS Control Tower Account Factory provisioning artifact in AWS Service Catalog to use. If find_provisioning_artifact_id_using_script is set to true, we will look up the ID automatically, and you don't need to set this parameter. However, if find_provisioning_artifact_id_using_script is false, you should set this parameter, as, due to a Terraform bug (https://github.com/hashicorp/terraform-provider-aws/issues/24362), the aws_servicecatalog_provisioned_product resource fails to look this up automatically. You can find the ID manually by going to the Product List in the AWS Service Catalog console (https://console.aws.amazon.com/servicecatalog/home#admin-products), clicking the 'AWS Control Tower Account Factory' product, and grabbing the ID of the latest 'active' product version from the Product Versions table at the bottom.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
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

<HclListItem name="account_email">
<HclListItemDescription>

The email address of the newly created account

</HclListItemDescription>
</HclListItem>

<HclListItem name="account_id">
<HclListItemDescription>

The ID of the newly created account

</HclListItemDescription>
</HclListItem>

<HclListItem name="organizational_unit_id">
<HclListItemDescription>

The ID of the Organizational Unit (OU) this account was created in.

</HclListItemDescription>
</HclListItem>

<HclListItem name="service_catalog_provisioned_product_arn">
<HclListItemDescription>

The ARN of the Service Catalog product that was provisioned to trigger Control Tower

</HclListItemDescription>
</HclListItem>

<HclListItem name="service_catalog_provisioned_product_id">
<HclListItemDescription>

The ID of the Service Catalog product that was provisioned to trigger Control Tower

</HclListItemDescription>
</HclListItem>

<HclListItem name="service_catalog_provisioned_product_outputs">
<HclListItemDescription>

The outputs of the Service Catalog product that was provisioned to trigger Control Tower

</HclListItemDescription>
</HclListItem>

<HclListItem name="sso_admin_user_email">
<HclListItemDescription>

The email address of the user that has been granted admin access via AWS SSO in this account

</HclListItemDescription>
</HclListItem>

<HclListItem name="sso_user_portal_url">
<HclListItemDescription>

The URL of the AWS SSO login page for this account

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.3.0/modules/control-tower-account-factory/readme.md",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.3.0/modules/control-tower-account-factory/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-control-tower/tree/v0.3.0/modules/control-tower-account-factory/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "c1d0c009410b9ff0ec196dd1db0d4389"
}
##DOCS-SOURCER-END -->
