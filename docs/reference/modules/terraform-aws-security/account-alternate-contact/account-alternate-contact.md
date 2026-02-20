---
title: "Account Alternate Contact"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="1.3.0" />

# Account Alternate Contact

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules/account-alternate-contact" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases?q=account-alternate-contact" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This Terraform Module configures an [AWS Account Alternate Contact](https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-update-contact-alternate.html). This is useful for ensuring that AWS can reach the appropriate person in your organization for security-related notifications, satisfying [CIS AWS Foundations Benchmark v3.0.0 Account.1](https://docs.aws.amazon.com/securityhub/latest/userguide/account-controls.html#account-1).

## Features

*   Set an alternate security, billing, or operations contact for your AWS account

*   Defaults to the `SECURITY` contact type

*   Supports conditional resource creation via the `create_resources` variable

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://docs.gruntwork.io/library/overview/)!

### Core concepts

*   [What is an AWS Account Alternate Contact?](https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-update-contact-alternate.html)

*   [CIS AWS Foundations Benchmark v3.0.0 - Account.1](https://docs.aws.amazon.com/securityhub/latest/userguide/account-controls.html#account-1)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.

*   [examples](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/examples): This folder contains working examples of how to use the submodules.

*   [test](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this module out, check out the following resources:

*   [examples/account-alternate-contact](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/examples/account-alternate-contact): A sample configuration optimized for learning, experimenting, and testing (but not production usage).

### Production deployment

If you want to deploy this module in production, check out the following resources:

*   [How to configure a production-grade AWS account structure](https://docs.gruntwork.io/guides/build-it-yourself/landing-zone)

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ACCOUNT-ALTERNATE-CONTACT MODULE
# ------------------------------------------------------------------------------------------------------

module "account_alternate_contact" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/account-alternate-contact?ref=v1.3.0"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The email address for the alternate contact.
  email_address = <string>

  # The name of the alternate contact.
  name = <string>

  # The phone number for the alternate contact.
  phone_number = <string>

  # The title for the alternate contact.
  title = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The type of alternate contact. Allowed values are: BILLING, OPERATIONS,
  # SECURITY.
  alternate_contact_type = "SECURITY"

  # Set to false to have this module skip creating resources. This weird
  # parameter exists solely because Terraform does not support conditional
  # modules. Therefore, this is a hack to allow you to conditionally decide if
  # the resources in this module should be created or not.
  create_resources = true

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ACCOUNT-ALTERNATE-CONTACT MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/account-alternate-contact?ref=v1.3.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The email address for the alternate contact.
  email_address = <string>

  # The name of the alternate contact.
  name = <string>

  # The phone number for the alternate contact.
  phone_number = <string>

  # The title for the alternate contact.
  title = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The type of alternate contact. Allowed values are: BILLING, OPERATIONS,
  # SECURITY.
  alternate_contact_type = "SECURITY"

  # Set to false to have this module skip creating resources. This weird
  # parameter exists solely because Terraform does not support conditional
  # modules. Therefore, this is a hack to allow you to conditionally decide if
  # the resources in this module should be created or not.
  create_resources = true

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="email_address" requirement="required" type="string">
<HclListItemDescription>

The email address for the alternate contact.

</HclListItemDescription>
</HclListItem>

<HclListItem name="name" requirement="required" type="string">
<HclListItemDescription>

The name of the alternate contact.

</HclListItemDescription>
</HclListItem>

<HclListItem name="phone_number" requirement="required" type="string">
<HclListItemDescription>

The phone number for the alternate contact.

</HclListItemDescription>
</HclListItem>

<HclListItem name="title" requirement="required" type="string">
<HclListItemDescription>

The title for the alternate contact.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="alternate_contact_type" requirement="optional" type="string">
<HclListItemDescription>

The type of alternate contact. Allowed values are: BILLING, OPERATIONS, SECURITY.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;SECURITY&quot;"/>
</HclListItem>

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to have this module skip creating resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if the resources in this module should be created or not.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="alternate_contact_type">
<HclListItemDescription>

The type of the alternate contact.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules/account-alternate-contact/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules/account-alternate-contact/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.3.0/modules/account-alternate-contact/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "a5b582cd9a852e32883dc0886d197894"
}
##DOCS-SOURCER-END -->
