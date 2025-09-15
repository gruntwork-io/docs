---
title: "AWS KMS Grants"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../../src/components/HclListItem.tsx';
import { ModuleUsage } from "../../../../../src/components/ModuleUsage";

<VersionBadge repoTitle="Security Modules" version="1.0.4" lastModifiedVersion="0.75.7"/>

# AWS KMS Grants

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.4/modules/kms-grant-multi-region" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases/tag/v0.75.7" className="link-button" title="Release notes for only versions which impacted this module.">Release Notes</a>

This repo contains a Module for creating and managing [KMS grants](https://docs.aws.amazon.com/kms/latest/developerguide/grants.html) for managing permissions to use CMKs.

## Features

*   Create KMS Grants for different regions in one module

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://docs.gruntwork.io/library/overview/)!

### Core concepts

*   [What is KMS?](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.4/modules/kms-master-key/README.md#what-is-kms)

*   [What is a Customer Master Key?](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.4/modules/kms-master-key/README.md#what-is-a-customer-master-key)

*   [KMS documentation](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html): Amazon’s docs for KMS that cover core concepts such as various key types, how to encrypt and decrypt, deletion of keys, and automatic key rotation.

*   [How to use a multi-region module](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.4/codegen/core-concepts.md#how-to-use-a-multi-region-module)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.4/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.

*   [examples](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.4/examples): This folder contains working examples of how to use the submodules.

*   [test](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.4/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this out for experimenting and learning, check out the following resources:

*   [examples folder](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.4/examples): The `examples` folder contains sample code optimized for learning, experimenting, and testing (but not production usage).

## Manage

*   [What is the difference between KMS Grants and Key Policies?](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.4/modules/kms-grant-multi-region/core-concepts.md#what-is-the-difference-between-kms-grants-and-key-policies)

*   [How do I use KMS Grants to share encrypted AMIs across accounts?](https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.4/modules/kms-grant-multi-region/core-concepts.md#how-do-i-use-kms-grants-to-share-encrypted-amis-across-accounts)

## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S KMS-GRANT-MULTI-REGION MODULE
# ------------------------------------------------------------------------------------------------------

module "kms_grant_multi_region" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/kms-grant-multi-region?ref=v1.0.4"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS Account ID the template should be operated on. This avoids
  # misconfiguration errors caused by environment variables.
  aws_account_id = <string>

  # The map of names of KMS grants to the region where the key resides in. There
  # should be a one to one mapping between entries in this map and the entries
  # of the kms_grants map. This is used to workaround a terraform limitation
  # where the for_each value can not depend on resources.
  kms_grant_regions = <map(string)>

  # Create the specified KMS grants to allow entities to use the KMS key without
  # modifying the KMS policy or IAM. This is necessary to allow AWS services
  # (e.g. ASG) to use CMKs encrypt and decrypt resources. The input is a map of
  # grant name to grant properties. The name must be unique per account.
  kms_grants = <map(object(
    kms_cmk_arn = string
    grantee_principal = string
    granted_operations = list(string)
  ))>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S KMS-GRANT-MULTI-REGION MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-security.git//modules/kms-grant-multi-region?ref=v1.0.4"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The AWS Account ID the template should be operated on. This avoids
  # misconfiguration errors caused by environment variables.
  aws_account_id = <string>

  # The map of names of KMS grants to the region where the key resides in. There
  # should be a one to one mapping between entries in this map and the entries
  # of the kms_grants map. This is used to workaround a terraform limitation
  # where the for_each value can not depend on resources.
  kms_grant_regions = <map(string)>

  # Create the specified KMS grants to allow entities to use the KMS key without
  # modifying the KMS policy or IAM. This is necessary to allow AWS services
  # (e.g. ASG) to use CMKs encrypt and decrypt resources. The input is a map of
  # grant name to grant properties. The name must be unique per account.
  kms_grants = <map(object(
    kms_cmk_arn = string
    grantee_principal = string
    granted_operations = list(string)
  ))>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Create a dependency between the resources in this module to the interpolated
  # values in this list (and thus the source resources). In other words, the
  # resources in this module will now depend on the resources backing the values
  # in this list such that those resources need to be created before the
  # resources in this module, and the resources in this module need to be
  # destroyed before the resources in the list.
  dependencies = []

}


```

</TabItem>
</Tabs>

<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.4/modules/kms-grant-multi-region/readme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.4/modules/kms-grant-multi-region/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/v1.0.4/modules/kms-grant-multi-region/outputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "993f318dab6ec865b91f3e8464dd96cd"
}
##DOCS-SOURCER-END -->
