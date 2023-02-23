---
title: "AWS KMS Grants"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem} from '../../../../../src/components/HclListItem.tsx';

<a href="https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules%2Fkms-grant-multi-region" className="link-button" title="View the source code for this module in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-security/releases?q=" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

# AWS KMS Grants

This repo contains a Module for creating and managing [KMS grants](https://docs.aws.amazon.com/kms/latest/developerguide/grants.html) for managing permissions to use CMKs.

## Features

*   Create KMS Grants for different regions in one module

## Learn

Note

This repo is a part of [the Gruntwork Infrastructure as Code Library](https://gruntwork.io/infrastructure-as-code-library/), a collection of reusable, battle-tested, production ready infrastructure code. If you’ve never used the Infrastructure as Code Library before, make sure to read [How to use the Gruntwork Infrastructure as Code Library](https://gruntwork.io/guides/foundations/how-to-use-gruntwork-infrastructure-as-code-library/)!

### Core concepts

*   [What is KMS?](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/kms-master-key/README.md#what-is-kms)

*   [What is a Customer Master Key?](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/kms-master-key/README.md#what-is-a-customer-master-key)

*   [KMS documentation](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html): Amazon’s docs for KMS that cover core concepts such as various key types, how to encrypt and decrypt, deletion of keys, and automatic key rotation.

*   [How to use a multi-region module](https://github.com/gruntwork-io/terraform-aws-security/tree/main/codegen/core-concepts.md#how-to-use-a-multi-region-module)

### Repo organization

*   [modules](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules): the main implementation code for this repo, broken down into multiple standalone, orthogonal submodules.

*   [examples](https://github.com/gruntwork-io/terraform-aws-security/tree/main/examples): This folder contains working examples of how to use the submodules.

*   [test](https://github.com/gruntwork-io/terraform-aws-security/tree/main/test): Automated tests for the modules and examples.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this out for experimenting and learning, check out the following resources:

*   [examples folder](https://github.com/gruntwork-io/terraform-aws-security/tree/main/examples): The `examples` folder contains sample code optimized for learning, experimenting, and testing (but not production usage).

## Manage

*   [What is the difference between KMS Grants and Key Policies?](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/kms-grant-multi-region/core-concepts.md#what-is-the-difference-between-kms-grants-and-key-policies)

*   [How do I use KMS Grants to share encrypted AMIs across accounts?](https://github.com/gruntwork-io/terraform-aws-security/tree/main/modules/kms-grant-multi-region/core-concepts.md#how-do-i-use-kms-grants-to-share-encrypted-amis-across-accounts)




## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="aws_account_id" requirement="required" type="string">
<HclListItemDescription>

The AWS Account ID the template should be operated on. This avoids misconfiguration errors caused by environment variables.

</HclListItemDescription>
</HclListItem>

<HclListItem name="kms_grant_regions" requirement="required" type="map(string)">
<HclListItemDescription>

The map of names of KMS grants to the region where the key resides in. There should be a one to one mapping between entries in this map and the entries of the kms_grants map. This is used to workaround a terraform limitation where the for_each value can not depend on resources.

</HclListItemDescription>
</HclListItem>

<HclListItem name="kms_grants" requirement="required" type="map(object(…))">
<HclListItemDescription>

Create the specified KMS grants to allow entities to use the KMS key without modifying the KMS policy or IAM. This is necessary to allow AWS services (e.g. ASG) to use CMKs encrypt and decrypt resources. The input is a map of grant name to grant properties. The name must be unique per account.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
map(object({
    # ARN of the KMS CMK that the grant applies to. Note that the region is introspected based on the ARN.
    kms_cmk_arn = string

    # The principal that is given permission to perform the operations that the grant permits. This must be in ARN
    # format. For example, the grantee principal for ASG is:
    # arn:aws:iam::111122223333:role/aws-service-role/autoscaling.amazonaws.com/AWSServiceRoleForAutoScaling
    grantee_principal = string

    # A list of operations that the grant permits. The permitted values are:
    # Decrypt, Encrypt, GenerateDataKey, GenerateDataKeyWithoutPlaintext, ReEncryptFrom, ReEncryptTo, CreateGrant,
    # RetireGrant, DescribeKey
    granted_operations = list(string)
  }))
```

</HclListItemTypeDetails>
<HclGeneralListItem title="More details">
<details>


```hcl

     The principal that is given permission to perform the operations that the grant permits. This must be in ARN
     format. For example, the grantee principal for ASG is:
     arn:aws:iam::111122223333:role/aws-service-role/autoscaling.amazonaws.com/AWSServiceRoleForAutoScaling

```
</details>

<details>


```hcl

     A list of operations that the grant permits. The permitted values are:
     Decrypt, Encrypt, GenerateDataKey, GenerateDataKeyWithoutPlaintext, ReEncryptFrom, ReEncryptTo, CreateGrant,
     RetireGrant, DescribeKey

```
</details>

</HclGeneralListItem>
</HclListItem>

### Optional

<HclListItem name="dependencies" requirement="optional" type="list(string)">
<HclListItemDescription>

Create a dependency between the resources in this module to the interpolated values in this list (and thus the source resources). In other words, the resources in this module will now depend on the resources backing the values in this list such that those resources need to be created before the resources in this module, and the resources in this module need to be destroyed before the resources in the list.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">



</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-security/tree/modules%2Fkms-grant-multi-region%2Freadme.adoc",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/modules%2Fkms-grant-multi-region%2Fvariables.tf",
    "https://github.com/gruntwork-io/terraform-aws-security/tree/modules%2Fkms-grant-multi-region%2Foutputs.tf"
  ],
  "sourcePlugin": "module-catalog-api",
  "hash": "2afc243d001b5daebfdc42594885d6ce"
}
##DOCS-SOURCER-END -->
