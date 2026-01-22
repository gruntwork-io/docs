---
title: "AWS Organizations"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="1.3.0" lastModifiedVersion="1.3.0"/>

# AWS Organizations

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules/aws-organizations" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v1.3.0" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module allows you to create and manage your [AWS Organization](https://aws.amazon.com/organizations/) and all child [AWS accounts](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts.html) as code.

![AWS Organizations Architecture](/img/reference/modules/terraform-aws-security/aws-organizations/aws-organizations-architecture.png)

## Features

*   Create a new AWS Organization

*   Provision new AWS accounts under your organization

*   Create account access IAM role in each child account.

*   Add tags to each child account

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://docs.gruntwork.io/library/overview/)!

### Core concepts

*   [What is AWS Organizations?](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules/aws-organizations/core-concepts.md#what-is-aws-organizations)

*   [What is a Root account?](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules/aws-organizations/core-concepts.md#what-is-a-root-account)

*   [What are Organization Accounts?](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules/aws-organizations/core-concepts.md#what-are-organization-accounts)

*   [What resources does this module create?](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules/aws-organizations/core-concepts.md#what-resources-does-this-module-create)

*   [How to configure a production-grade AWS account structure](https://docs.gruntwork.io/guides/build-it-yourself/landing-zone)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.

*   [examples](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/examples): This folder contains working examples of how to use the submodules.

*   [test](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/aws-organizations](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/examples/aws-organizations): The `examples/aws-organizations` folder contains sample code optimized for learning, experimenting, and testing (but not production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   ***Coming soon***. We have not yet added this module to the [Acme example Reference Architecture](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme).

*   [How to configure a production-grade AWS account structure](https://docs.gruntwork.io/guides/build-it-yourself/landing-zone)

## Manage

### Day-to-day operations

*   [How do I provision new accounts?](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules/aws-organizations/core-concepts.md#how-do-i-provision-new-accounts)

*   [How do I remove accounts?](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules/aws-organizations/core-concepts.md#how-do-i-remove-accounts)

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S AWS-ORGANIZATIONS MODULE
# ------------------------------------------------------------------------------------------------------

module "aws_organizations" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/aws-organizations?ref=v1.3.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Map of child accounts to create. The map key is the name of the account and
  # the value is an object containing account configuration variables.
  child_accounts = <map(object(
    email                      = string
    parent_id                  = optional(string)
    role_name                  = optional(string)
    iam_user_access_to_billing = optional(string)
    close_on_deletion          = optional(bool)
    tags                       = optional(map(string), )
  ))>

  # Flag indicating whether the organization should be created.
  create_organization = <bool>

  # If set to ALLOW, the new account enables IAM users to access account billing
  # information if they have the required permissions. If set to DENY, then only
  # the root user of the new account can access account billing information.
  default_iam_user_access_to_billing = <string>

  # The name of an IAM role that Organizations automatically preconfigures in
  # the new member account. This role trusts the mgmt account, allowing users in
  # the mgmt account to assume the role, as permitted by the mgmt account
  # administrator.
  default_role_name = <string>

  # List of AWS service principal names for which you want to enable integration
  # with your organization. Must have `organizations_feature_set` set to ALL.
  # See
  # https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services.html
  organizations_aws_service_access_principals = <list(string)>

  # List of Organizations policy types to enable in the Organization Root. See
  # https://docs.aws.amazon.com/organizations/latest/APIReference/API_EnablePolicyType.html
  organizations_enabled_policy_types = <list(string)>

  # Specify `ALL` or `CONSOLIDATED_BILLING`.
  organizations_feature_set = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Default tags to add to accounts. Will be appended to ´child_account.*.tags´
  default_tags = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S AWS-ORGANIZATIONS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/aws-organizations?ref=v1.3.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Map of child accounts to create. The map key is the name of the account and
  # the value is an object containing account configuration variables.
  child_accounts = <map(object(
    email                      = string
    parent_id                  = optional(string)
    role_name                  = optional(string)
    iam_user_access_to_billing = optional(string)
    close_on_deletion          = optional(bool)
    tags                       = optional(map(string), )
  ))>

  # Flag indicating whether the organization should be created.
  create_organization = <bool>

  # If set to ALLOW, the new account enables IAM users to access account billing
  # information if they have the required permissions. If set to DENY, then only
  # the root user of the new account can access account billing information.
  default_iam_user_access_to_billing = <string>

  # The name of an IAM role that Organizations automatically preconfigures in
  # the new member account. This role trusts the mgmt account, allowing users in
  # the mgmt account to assume the role, as permitted by the mgmt account
  # administrator.
  default_role_name = <string>

  # List of AWS service principal names for which you want to enable integration
  # with your organization. Must have `organizations_feature_set` set to ALL.
  # See
  # https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services.html
  organizations_aws_service_access_principals = <list(string)>

  # List of Organizations policy types to enable in the Organization Root. See
  # https://docs.aws.amazon.com/organizations/latest/APIReference/API_EnablePolicyType.html
  organizations_enabled_policy_types = <list(string)>

  # Specify `ALL` or `CONSOLIDATED_BILLING`.
  organizations_feature_set = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Default tags to add to accounts. Will be appended to ´child_account.*.tags´
  default_tags = {}

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="child_accounts" requirement="required" type="map(object(…))">
<HclListItemDescription>

Map of child accounts to create. The map key is the name of the account and the value is an object containing account configuration variables.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    email                      = string
    parent_id                  = optional(string)
    role_name                  = optional(string)
    iam_user_access_to_billing = optional(string)
    close_on_deletion          = optional(bool)
    tags                       = optional(map(string), {})
  }))
```

</HclListItemTypeDetails>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Expected value for the `child_accounts` is a map of child accounts. The map key is the name of the account and
   the value is another map with one required key (email) and several optional keys:
  
   - email (required):
     Email address for the account.
  
   - parent_id:
     Parent Organizational Unit ID or Root ID for the account
     Defaults to the Organization default Root ID.
  
   - role_name:
     The name of an IAM role that Organizations automatically preconfigures in the new member account. This role trusts
     the mgmt account, allowing users in the mgmt account to assume the role, as permitted by the mgmt account
     administrator. The role has administrator permissions in the new member account. Note that the Organizations API
     provides no method for reading this information after account creation.
     If no value is present and no ´default_role_name´ is provided, AWS automatically assigns a value.
  
   - iam_user_access_to_billing:
     If set to ´ALLOW´, the new account enables IAM users to access account billing information if they have the required
     permissions. If set to ´DENY´, then only the root user of the new account can access account billing information.
     Defaults to ´default_iam_user_access_to_billing´.
  
   - close_on_deletion:
     Boolean flag to indicate whether the account should be closed when the resource is deleted, otherwise it will be
     removed from the organization. Note there are AWS limitations on how many accounts can be closed this way.
  
   - tags:
     Key-value mapping of resource tags.
  
  
   Example:
  
   child_accounts = {
     security = {
       email                       = "security-mgmt@acme.com",
       parent_id                   = "my-org-unit-id",
       role_name                   = "test-role",
       iam_user_access_to_billing  = "DENY",
       close_on_deletion           = true,
       tags = {
         Tag-Key = "tag-value"
       }
     },
     sandbox = {
       email                       = "sandbox@acme.com"
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="create_organization" requirement="required" type="bool">
<HclListItemDescription>

Flag indicating whether the organization should be created.

</HclListItemDescription>
</HclListItem>

<HclListItem name="default_iam_user_access_to_billing" requirement="required" type="string">
<HclListItemDescription>

If set to ALLOW, the new account enables IAM users to access account billing information if they have the required permissions. If set to DENY, then only the root user of the new account can access account billing information.

</HclListItemDescription>
</HclListItem>

<HclListItem name="default_role_name" requirement="required" type="string">
<HclListItemDescription>

The name of an IAM role that Organizations automatically preconfigures in the new member account. This role trusts the mgmt account, allowing users in the mgmt account to assume the role, as permitted by the mgmt account administrator.

</HclListItemDescription>
</HclListItem>

<HclListItem name="organizations_aws_service_access_principals" requirement="required" type="list(string)">
<HclListItemDescription>

List of AWS service principal names for which you want to enable integration with your organization. Must have `organizations_feature_set` set to ALL. See https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services.html

</HclListItemDescription>
</HclListItem>

<HclListItem name="organizations_enabled_policy_types" requirement="required" type="list(string)">
<HclListItemDescription>

List of Organizations policy types to enable in the Organization Root. See https://docs.aws.amazon.com/organizations/latest/APIReference/API_EnablePolicyType.html

</HclListItemDescription>
</HclListItem>

<HclListItem name="organizations_feature_set" requirement="required" type="string">
<HclListItemDescription>

Specify `ALL` or `CONSOLIDATED_BILLING`.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="default_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Default tags to add to accounts. Will be appended to ´child_account.*.tags´

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="child_accounts">
<HclListItemDescription>

A map of all accounts created by this module (NOT including the root account). The keys are the names of the accounts and the values are the attributes for the account as defined in the aws_organizations_account resource.

</HclListItemDescription>
</HclListItem>

<HclListItem name="master_account_arn">
<HclListItemDescription>

ARN of the master account.

</HclListItemDescription>
</HclListItem>

<HclListItem name="master_account_email">
<HclListItemDescription>

Email address of the master account.

</HclListItemDescription>
</HclListItem>

<HclListItem name="master_account_id">
<HclListItemDescription>

Identifier of the master account.

</HclListItemDescription>
</HclListItem>

<HclListItem name="organization_arn">
<HclListItemDescription>

ARN of the organization.

</HclListItemDescription>
</HclListItem>

<HclListItem name="organization_id">
<HclListItemDescription>

Identifier of the organization.

</HclListItemDescription>
</HclListItem>

<HclListItem name="organization_root_id">
<HclListItemDescription>

Identifier of the root of this organization.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules/aws-organizations/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules/aws-organizations/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules/aws-organizations/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "2b195424e51c8a4b068021e101778ac4"
}
##DOCS-SOURCER-END -->
