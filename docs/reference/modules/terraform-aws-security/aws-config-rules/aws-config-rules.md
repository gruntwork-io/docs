---
title: "AWS Organizations Config Rules"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="1.1.0" lastModifiedVersion="0.75.7"/>

# AWS Organizations Config Rules

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v1.1.0/modules/aws-config-rules" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.7" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This module allows you to configure [AWS Config Managed Rules](https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_use-managed-rules.html) for your AWS accounts.

![AWS Organizations Architecture](/img/reference/modules/terraform-aws-security/aws-config-rules/aws-config-rules-architecture.png)

## Features

*   Configure a best-practices set of Managed Config Rules for your AWS accounts

*   Configure either organization-level rules which apply to the root and all child accounts or account-level rules which apply just to the current account

*   Enforce governance by ensuring that the underlying AWS Config rules are not modifiable by the child accounts

*   Configure additional rules on top of the default set of rules

*   Exclude specific accounts

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://docs.gruntwork.io/library/overview/)!

### Core concepts

*   [What is AWS Organizations?](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.1.0/modules/aws-organizations/core-concepts.md#what-is-aws-organizations)

*   [What is AWS Config?](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.1.0/modules/aws-config/core-concepts.md#what-is-aws-config)

*   [What are Config Rules?](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.1.0/modules/aws-config/core-concepts.md#what-are-config-rules)

*   [What are Managed Config Rules?](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.1.0/modules/aws-config-rules/core-concepts.md#what-are-managed-config-rules)

*   [How do Organization-Level Config Rules Compare to Account-Level Config Rules?](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.1.0/modules/aws-config-rules/core-concepts.md#how-do-organization-level-config-rules-compare-to-account-level-config-rules)

*   [What resources does this module create?](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.1.0/modules/aws-config-rules/core-concepts.md#what-resources-does-this-module-create)

*   [How to configure a production-grade AWS account structure](https://docs.gruntwork.io/guides/build-it-yourself/landing-zone)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.1.0/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.

*   [examples](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.1.0/examples): This folder contains working examples of how to use the submodules.

*   [test](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.1.0/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/aws-config-rules](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.1.0/examples/aws-config-rules): The `examples/aws-organizations-config-rules` folder contains sample code optimized for learning, experimenting, and testing (but not production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   ***Coming soon***. We have not yet added this module to the [Acme example Reference Architecture](https://github.com/gruntwork-io/infrastructure-modules-multi-account-acme).

*   [How to configure a production-grade AWS account structure](https://docs.gruntwork.io/guides/build-it-yourself/landing-zone)

## Manage

### Day-to-day operations

*   [How do I configure the rules?](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.1.0/modules/aws-config-rules/core-concepts.md#how-do-i-configure-the-rules)

*   [How do I add additional rules?](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.1.0/modules/aws-config-rules/core-concepts.md#how-do-i-add-additional-rules)

*   [How do I exclude specific accounts?](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.1.0/modules/aws-config-rules/core-concepts.md#how-do-i-exclude-specific-accounts)

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S AWS-CONFIG-RULES MODULE
# ------------------------------------------------------------------------------------------------------

module "aws_config_rules" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/aws-config-rules?ref=v1.1.0"

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Map of additional managed rules to add. The key is the name of the rule
  # (e.g. ´acm-certificate-expiration-check´) and the value is an object
  # specifying the rule details
  additional_rules = {}

  # Set to true to create these rules at the account level or false to create
  # them at the organization level. When you create rules at the organization
  # level, you must run this module in the root account, and the rules will
  # apply to EVERY account in the organization. This allows you to manage the
  # rules centrally, which is convenient, but also has a dependency / ordering
  # issue, as org level config rules require every child account to have an AWS
  # Config Recorder already set up, which is very inconvenient (when adding a
  # new account, you first have to leave the rules disabled for it, then create
  # the account, apply a baseline to it that creates a Config Recorder, and then
  # go back to the root and enable the rules). When creating rules at the
  # account level, you have to create and manage the rules in each account
  # separately, which is inconvenient (but only slightly, since it's all managed
  # as code), but there are no dependency or ordering issues.
  create_account_rules = false

  # Set to false to have this module skip creating resources. This weird
  # parameter exists solely because Terraform does not support conditional
  # modules. Therefore, this is a hack to allow you to conditionally decide if
  # the resources should be created or not.
  create_resources = true

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # Checks whether the EBS volumes that are in an attached state are encrypted.
  enable_encrypted_volumes = true

  # Set to true to enable all default config rules that apply to global
  # (non-regional) resources, like IAM roles. This will also control rules
  # included with var.additional_rules depending on the attribute,
  # applies_to_global_resources.
  enable_global_resource_rules = true

  # Checks whether the account password policy for IAM users meets the specified
  # requirements.
  enable_iam_password_policy = true

  # Checks whether your IAM users have passwords or active access keys that have
  # not been used within the specified number of days.
  enable_iam_user_unused_credentials_check = true

  # Checks whether the security group with 0.0.0.0/0 of any Amazon Virtual
  # Private Cloud (Amazon VPC) allows only specific inbound TCP or UDP traffic.
  enable_insecure_sg_rules = true

  # Checks whether storage encryption is enabled for your RDS DB instances.
  enable_rds_storage_encrypted = true

  # Checks whether users of your AWS account require a multi-factor
  # authentication (MFA) device to sign in with root credentials.
  enable_root_account_mfa = true

  # Checks that your Amazon S3 buckets do not allow public read access.
  enable_s3_bucket_public_read_prohibited = true

  # Checks that your Amazon S3 buckets do not allow public write access.
  enable_s3_bucket_public_write_prohibited = true

  # ID or ARN of the KMS key that is used to encrypt the volume.
  encrypted_volumes_kms_id = null

  # List of AWS account identifiers to exclude from the rules.
  excluded_accounts = []

  # Number of days before password expiration.
  iam_password_policy_max_password_age = 30

  # Password minimum length.
  iam_password_policy_minimum_password_length = 16

  # Number of passwords before allowing reuse.
  iam_password_policy_password_reuse_prevention = 5

  # Require at least one lowercase character in password.
  iam_password_policy_require_lowercase_characters = true

  # Require at least one number in password.
  iam_password_policy_require_numbers = true

  # Require at least one symbol in password.
  iam_password_policy_require_symbols = true

  # Require at least one uppercase character in password.
  iam_password_policy_require_uppercase_characters = true

  # Maximum number of days a credential can be not used.
  iam_user_max_credential_usage_age = 90

  # Comma-separated list of TCP ports authorized to be open to 0.0.0.0/0. Ranges
  # are defined by a dash; for example, '443,1020-1025'.
  insecure_sg_rules_authorized_tcp_ports = null

  # Comma-separated list of UDP ports authorized to be open to 0.0.0.0/0. Ranges
  # are defined by a dash; for example, '500,1020-1025'.
  insecure_sg_rules_authorized_udp_ports = null

  # The maximum frequency with which AWS Config runs evaluations for the
  # ´PERIODIC´ rules. See
  # https://www.terraform.io/docs/providers/aws/r/config_organization_managed_rule.html#maximum_execution_frequency
  maximum_execution_frequency = "TwentyFour_Hours"

  # KMS key ID or ARN used to encrypt the storage.
  rds_storage_encrypted_kms_id = null

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S AWS-CONFIG-RULES MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/aws-config-rules?ref=v1.1.0"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Map of additional managed rules to add. The key is the name of the rule
  # (e.g. ´acm-certificate-expiration-check´) and the value is an object
  # specifying the rule details
  additional_rules = {}

  # Set to true to create these rules at the account level or false to create
  # them at the organization level. When you create rules at the organization
  # level, you must run this module in the root account, and the rules will
  # apply to EVERY account in the organization. This allows you to manage the
  # rules centrally, which is convenient, but also has a dependency / ordering
  # issue, as org level config rules require every child account to have an AWS
  # Config Recorder already set up, which is very inconvenient (when adding a
  # new account, you first have to leave the rules disabled for it, then create
  # the account, apply a baseline to it that creates a Config Recorder, and then
  # go back to the root and enable the rules). When creating rules at the
  # account level, you have to create and manage the rules in each account
  # separately, which is inconvenient (but only slightly, since it's all managed
  # as code), but there are no dependency or ordering issues.
  create_account_rules = false

  # Set to false to have this module skip creating resources. This weird
  # parameter exists solely because Terraform does not support conditional
  # modules. Therefore, this is a hack to allow you to conditionally decide if
  # the resources should be created or not.
  create_resources = true

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

  # Checks whether the EBS volumes that are in an attached state are encrypted.
  enable_encrypted_volumes = true

  # Set to true to enable all default config rules that apply to global
  # (non-regional) resources, like IAM roles. This will also control rules
  # included with var.additional_rules depending on the attribute,
  # applies_to_global_resources.
  enable_global_resource_rules = true

  # Checks whether the account password policy for IAM users meets the specified
  # requirements.
  enable_iam_password_policy = true

  # Checks whether your IAM users have passwords or active access keys that have
  # not been used within the specified number of days.
  enable_iam_user_unused_credentials_check = true

  # Checks whether the security group with 0.0.0.0/0 of any Amazon Virtual
  # Private Cloud (Amazon VPC) allows only specific inbound TCP or UDP traffic.
  enable_insecure_sg_rules = true

  # Checks whether storage encryption is enabled for your RDS DB instances.
  enable_rds_storage_encrypted = true

  # Checks whether users of your AWS account require a multi-factor
  # authentication (MFA) device to sign in with root credentials.
  enable_root_account_mfa = true

  # Checks that your Amazon S3 buckets do not allow public read access.
  enable_s3_bucket_public_read_prohibited = true

  # Checks that your Amazon S3 buckets do not allow public write access.
  enable_s3_bucket_public_write_prohibited = true

  # ID or ARN of the KMS key that is used to encrypt the volume.
  encrypted_volumes_kms_id = null

  # List of AWS account identifiers to exclude from the rules.
  excluded_accounts = []

  # Number of days before password expiration.
  iam_password_policy_max_password_age = 30

  # Password minimum length.
  iam_password_policy_minimum_password_length = 16

  # Number of passwords before allowing reuse.
  iam_password_policy_password_reuse_prevention = 5

  # Require at least one lowercase character in password.
  iam_password_policy_require_lowercase_characters = true

  # Require at least one number in password.
  iam_password_policy_require_numbers = true

  # Require at least one symbol in password.
  iam_password_policy_require_symbols = true

  # Require at least one uppercase character in password.
  iam_password_policy_require_uppercase_characters = true

  # Maximum number of days a credential can be not used.
  iam_user_max_credential_usage_age = 90

  # Comma-separated list of TCP ports authorized to be open to 0.0.0.0/0. Ranges
  # are defined by a dash; for example, '443,1020-1025'.
  insecure_sg_rules_authorized_tcp_ports = null

  # Comma-separated list of UDP ports authorized to be open to 0.0.0.0/0. Ranges
  # are defined by a dash; for example, '500,1020-1025'.
  insecure_sg_rules_authorized_udp_ports = null

  # The maximum frequency with which AWS Config runs evaluations for the
  # ´PERIODIC´ rules. See
  # https://www.terraform.io/docs/providers/aws/r/config_organization_managed_rule.html#maximum_execution_frequency
  maximum_execution_frequency = "TwentyFour_Hours"

  # KMS key ID or ARN used to encrypt the storage.
  rds_storage_encrypted_kms_id = null

}


```

</TabItem>
</Tabs>




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Optional

<HclListItem name="additional_rules" requirement="optional" type="map(object(…))">
<HclListItemDescription>

Map of additional managed rules to add. The key is the name of the rule (e.g. ´acm-certificate-expiration-check´) and the value is an object specifying the rule details

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    # Description of the rule
    description = string
    # Identifier of an available AWS Config Managed Rule to call.
    identifier = string
    # Trigger type of the rule, must be one of ´CONFIG_CHANGE´ or ´PERIODIC´.
    trigger_type = string
    # A map of input parameters for the rule. If you don't have parameters, pass in an empty map ´{}´.
    input_parameters = map(string)
    # Whether or not this applies to global (non-regional) resources like IAM roles. When true, these rules are disabled
    # if var.enable_global_resource_rules is false.
    applies_to_global_resources = bool
  }))
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="{}"/>
<HclGeneralListItem title="Examples">
<details>
  <summary>Example</summary>


```hcl
   additional_rules = {
     acm-certificate-expiration-check = {
       description                 = "Checks whether ACM Certificates in your account are marked for expiration within the specified number of days.",
       identifier                  = "ACM_CERTIFICATE_EXPIRATION_CHECK",
       trigger_type                = "PERIODIC",
       input_parameters            = { "daysToExpiration": "14"},
       applies_to_global_resources = false
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

<HclListItem name="create_account_rules" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to create these rules at the account level or false to create them at the organization level. When you create rules at the organization level, you must run this module in the root account, and the rules will apply to EVERY account in the organization. This allows you to manage the rules centrally, which is convenient, but also has a dependency / ordering issue, as org level config rules require every child account to have an AWS Config Recorder already set up, which is very inconvenient (when adding a new account, you first have to leave the rules disabled for it, then create the account, apply a baseline to it that creates a Config Recorder, and then go back to the root and enable the rules). When creating rules at the account level, you have to create and manage the rules in each account separately, which is inconvenient (but only slightly, since it's all managed as code), but there are no dependency or ordering issues.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="false"/>
</HclListItem>

<HclListItem name="create_resources" requirement="optional" type="bool">
<HclListItemDescription>

Set to false to have this module skip creating resources. This weird parameter exists solely because Terraform does not support conditional modules. Therefore, this is a hack to allow you to conditionally decide if the resources should be created or not.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="dependencies" requirement="optional" type="list(string)">
<HclListItemDescription>

Create a dependency between the resources in this module to the interpolated values in this list (and thus the source resources). In other words, the resources in this module will now depend on the resources backing the values in this list such that those resources need to be created before the resources in this module, and the resources in this module need to be destroyed before the resources in the list.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="enable_encrypted_volumes" requirement="optional" type="bool">
<HclListItemDescription>

Checks whether the EBS volumes that are in an attached state are encrypted.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_global_resource_rules" requirement="optional" type="bool">
<HclListItemDescription>

Set to true to enable all default config rules that apply to global (non-regional) resources, like IAM roles. This will also control rules included with <a href="#additional_rules"><code>additional_rules</code></a> depending on the attribute, applies_to_global_resources.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_iam_password_policy" requirement="optional" type="bool">
<HclListItemDescription>

Checks whether the account password policy for IAM users meets the specified requirements.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_iam_user_unused_credentials_check" requirement="optional" type="bool">
<HclListItemDescription>

Checks whether your IAM users have passwords or active access keys that have not been used within the specified number of days.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_insecure_sg_rules" requirement="optional" type="bool">
<HclListItemDescription>

Checks whether the security group with 0.0.0.0/0 of any Amazon Virtual Private Cloud (Amazon VPC) allows only specific inbound TCP or UDP traffic.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_rds_storage_encrypted" requirement="optional" type="bool">
<HclListItemDescription>

Checks whether storage encryption is enabled for your RDS DB instances.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_root_account_mfa" requirement="optional" type="bool">
<HclListItemDescription>

Checks whether users of your AWS account require a multi-factor authentication (MFA) device to sign in with root credentials.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_s3_bucket_public_read_prohibited" requirement="optional" type="bool">
<HclListItemDescription>

Checks that your Amazon S3 buckets do not allow public read access.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="enable_s3_bucket_public_write_prohibited" requirement="optional" type="bool">
<HclListItemDescription>

Checks that your Amazon S3 buckets do not allow public write access.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="encrypted_volumes_kms_id" requirement="optional" type="string">
<HclListItemDescription>

ID or ARN of the KMS key that is used to encrypt the volume.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="excluded_accounts" requirement="optional" type="list(string)">
<HclListItemDescription>

List of AWS account identifiers to exclude from the rules.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="iam_password_policy_max_password_age" requirement="optional" type="number">
<HclListItemDescription>

Number of days before password expiration.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="30"/>
</HclListItem>

<HclListItem name="iam_password_policy_minimum_password_length" requirement="optional" type="number">
<HclListItemDescription>

Password minimum length.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="16"/>
</HclListItem>

<HclListItem name="iam_password_policy_password_reuse_prevention" requirement="optional" type="number">
<HclListItemDescription>

Number of passwords before allowing reuse.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="5"/>
</HclListItem>

<HclListItem name="iam_password_policy_require_lowercase_characters" requirement="optional" type="bool">
<HclListItemDescription>

Require at least one lowercase character in password.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="iam_password_policy_require_numbers" requirement="optional" type="bool">
<HclListItemDescription>

Require at least one number in password.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="iam_password_policy_require_symbols" requirement="optional" type="bool">
<HclListItemDescription>

Require at least one symbol in password.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="iam_password_policy_require_uppercase_characters" requirement="optional" type="bool">
<HclListItemDescription>

Require at least one uppercase character in password.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="iam_user_max_credential_usage_age" requirement="optional" type="number">
<HclListItemDescription>

Maximum number of days a credential can be not used.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="90"/>
</HclListItem>

<HclListItem name="insecure_sg_rules_authorized_tcp_ports" requirement="optional" type="string">
<HclListItemDescription>

Comma-separated list of TCP ports authorized to be open to 0.0.0.0/0. Ranges are defined by a dash; for example, '443,1020-1025'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="insecure_sg_rules_authorized_udp_ports" requirement="optional" type="string">
<HclListItemDescription>

Comma-separated list of UDP ports authorized to be open to 0.0.0.0/0. Ranges are defined by a dash; for example, '500,1020-1025'.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

<HclListItem name="maximum_execution_frequency" requirement="optional" type="string">
<HclListItemDescription>

The maximum frequency with which AWS Config runs evaluations for the ´PERIODIC´ rules. See https://www.terraform.io/docs/providers/aws/r/config_organization_managed_rule.html#maximum_execution_frequency

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;TwentyFour_Hours&quot;"/>
</HclListItem>

<HclListItem name="rds_storage_encrypted_kms_id" requirement="optional" type="string">
<HclListItemDescription>

KMS key ID or ARN used to encrypt the storage.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="null"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="config_rule_arns">
<HclListItemDescription>

Map of config rule ARNs. Key is rule ID, value is rule ARN

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.1.0/modules/aws-config-rules/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.1.0/modules/aws-config-rules/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.1.0/modules/aws-config-rules/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "ebb57212181f664fefa022fa4ce1a957"
}
##DOCS-SOURCER-END -->
