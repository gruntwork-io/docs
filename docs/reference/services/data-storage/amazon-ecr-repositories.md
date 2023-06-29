---
type: "service"
name: "Amazon ECR Repositories"
description: "Create and manage multiple Amazon Elastic Container Repository (ECR) Repositories that can be used to store your Docker images."
category: "docker-orchestration"
cloud: "aws"
tags: ["data","database","container"]
license: "gruntwork"
built-with: "terraform"
title: "Amazon ECR Repositories"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.104.14" lastModifiedVersion="0.95.1"/>

# Amazon ECR Repositories

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/data-stores/ecr-repos" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=data-stores%2Fecr-repos" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>

## Overview

This service contains code to create and manage multiple [Amazon Elastic Container Repository (ECR)](https://aws.amazon.com/ecr/)
Repositories that can be used for storing and distributing container images.

![ECR architecture](/img/reference/services/data-storage/ecr-architecture.png)

## Features

*   Create and manage multiple ECR repositories
*   Store private Docker images for use in any Docker Orchestration system (e.g., Kubernetes, ECS, etc)
*   Share repositories across accounts
*   Fine grained access control
*   Automatically scan Docker images for security vulnerabilities

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

*   [ECR documentation](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html): Amazon’s docs for ECR
    that cover core concepts such as repository URLs, image scanning, and access control.

## Deploy

### Non-production deployment (quick start for learning)

If you just want to try this repo out for experimenting and learning, check out the following resources:

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.


## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ECR-REPOS MODULE
# ------------------------------------------------------------------------------------------------------

module "ecr_repos" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/ecr-repos?ref=v0.104.14"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A map of repo names to configurations for that repository.
  repositories = <any>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Whether or not to enable image scanning on all the repos. Can be overridden
  # on a per repo basis by the enable_automatic_image_scanning property in the
  # repositories map.
  default_automatic_image_scanning = true

  # The default encryption configuration to apply to the created ECR repository.
  # When null, the images in the ECR repo will not be encrypted at rest. Can be
  # overridden on a per repo basis by the encryption_config property in the
  # repositories map.
  default_encryption_config = {"encryption_type":"AES256","kms_key":null}

  # The default list of AWS account IDs for external AWS accounts that should be
  # able to create Lambda functions based on container images in these ECR
  # repos. Can be overridden on a per repo basis by the
  # external_account_ids_with_lambda_access property in the repositories map.
  default_external_account_ids_with_lambda_access = []

  # The default list of AWS account IDs for external AWS accounts that should be
  # able to pull images from these ECR repos. Can be overridden on a per repo
  # basis by the external_account_ids_with_read_access property in the
  # repositories map.
  default_external_account_ids_with_read_access = []

  # The default list of AWS account IDs for external AWS accounts that should be
  # able to pull and push images to these ECR repos. Can be overridden on a per
  # repo basis by the external_account_ids_with_write_access property in the
  # repositories map.
  default_external_account_ids_with_write_access = []

  # The tag mutability setting for all the repos. Must be one of: MUTABLE or
  # IMMUTABLE. Can be overridden on a per repo basis by the image_tag_mutability
  # property in the repositories map.
  default_image_tag_mutability = "MUTABLE"

  # Add lifecycle policy to ECR repo.
  default_lifecycle_policy_rules = []

  # A map of tags (where the key and value correspond to tag keys and values)
  # that should be assigned to all ECR repositories.
  global_tags = {}

  # List of regions (e.g., us-east-1) to replicate the ECR repository to.
  replication_regions = []

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S ECR-REPOS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/ecr-repos?ref=v0.104.14"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # A map of repo names to configurations for that repository.
  repositories = <any>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Whether or not to enable image scanning on all the repos. Can be overridden
  # on a per repo basis by the enable_automatic_image_scanning property in the
  # repositories map.
  default_automatic_image_scanning = true

  # The default encryption configuration to apply to the created ECR repository.
  # When null, the images in the ECR repo will not be encrypted at rest. Can be
  # overridden on a per repo basis by the encryption_config property in the
  # repositories map.
  default_encryption_config = {"encryption_type":"AES256","kms_key":null}

  # The default list of AWS account IDs for external AWS accounts that should be
  # able to create Lambda functions based on container images in these ECR
  # repos. Can be overridden on a per repo basis by the
  # external_account_ids_with_lambda_access property in the repositories map.
  default_external_account_ids_with_lambda_access = []

  # The default list of AWS account IDs for external AWS accounts that should be
  # able to pull images from these ECR repos. Can be overridden on a per repo
  # basis by the external_account_ids_with_read_access property in the
  # repositories map.
  default_external_account_ids_with_read_access = []

  # The default list of AWS account IDs for external AWS accounts that should be
  # able to pull and push images to these ECR repos. Can be overridden on a per
  # repo basis by the external_account_ids_with_write_access property in the
  # repositories map.
  default_external_account_ids_with_write_access = []

  # The tag mutability setting for all the repos. Must be one of: MUTABLE or
  # IMMUTABLE. Can be overridden on a per repo basis by the image_tag_mutability
  # property in the repositories map.
  default_image_tag_mutability = "MUTABLE"

  # Add lifecycle policy to ECR repo.
  default_lifecycle_policy_rules = []

  # A map of tags (where the key and value correspond to tag keys and values)
  # that should be assigned to all ECR repositories.
  global_tags = {}

  # List of regions (e.g., us-east-1) to replicate the ECR repository to.
  replication_regions = []

}


```

</TabItem>
</Tabs>



## Reference


<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="repositories" requirement="required" type="any">
<HclListItemDescription>

A map of repo names to configurations for that repository.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclGeneralListItem title="More Details">
<details>


```hcl

   Each entry in the map supports the following attributes:
  
   OPTIONAL (defaults to value of corresponding module input):
   - external_account_ids_with_read_access   list(string)             : List of account IDs that should have read
                                                                        access on the repo. If omitted, use
                                                                        var.default_external_account_ids_with_read_access.
   - external_account_ids_with_write_access  list(string)             : List of account IDs that should have write
                                                                        access on the repo. If omitted, use
                                                                        var.default_external_account_ids_with_write_access.
   - external_account_ids_with_lambda_access list(string)             : List of account IDs that should have
                                                                        access to create lambda functions with
                                                                        container images in the repo. If omitted, use
                                                                        var.default_external_account_ids_with_lambda_access.
   - enable_automatic_image_scanning         bool                     : Whether or not to enable image scanning. If
                                                                        omitted use var.default_automatic_image_scanning.
   - encryption_config                       object[EncryptionConfig] : Whether or not to enable encryption at rest for
                                                                        the container images, and how to encrypt. If
                                                                        omitted, use var.default_encryption_config. See
                                                                        below for the type schema.
   - image_tag_mutability                    string                   : The tag mutability setting for the repo. If
                                                                        omitted use var.default_image_tag_mutability.
   - tags                                    map(string)              : Map of tags (where the key and value correspond
                                                                        to tag keys and values) that should be assigned
                                                                        to the ECR repository. Merged with
                                                                        var.global_tags.
   - lifecycle_policy_rules                  list(object[LifecycleRule]) : List of lifecycle rules to apply to the ECR
                                                                           repository. See below for the schema of the
                                                                           lifecycle rule.
  
   Structure of EncryptionConfig object:
   - encryption_type  string  : The encryption type to use for the repository. Must be AES256 or KMS.
   - kms_key          string  : The KMS key to use for encrypting the images. Only used when encryption_type is KMS. If
                                not specified, defaults to the default AWS managed key for ECR.
  
  
   Structure of LifecycleRule object:
     Refer to the AWS documentation on supported policy parameters:
     https://docs.aws.amazon.com/AmazonECR/latest/userguide/LifecyclePolicies.htmllifecycle_policy_parameters
  
   Example:
  
   repositories = {
     myapp1 = {
       external_account_ids_with_read_access = ["11111111"]
     }
   }

```
</details>

</HclGeneralListItem>
</HclListItem>

### Optional

<HclListItem name="default_automatic_image_scanning" requirement="optional" type="bool">
<HclListItemDescription>

Whether or not to enable image scanning on all the repos. Can be overridden on a per repo basis by the enable_automatic_image_scanning property in the repositories map.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="default_encryption_config" requirement="optional" type="object(…)">
<HclListItemDescription>

The default encryption configuration to apply to the created ECR repository. When null, the images in the ECR repo will not be encrypted at rest. Can be overridden on a per repo basis by the encryption_config property in the repositories map.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
object({
    # The encryption type to use for the repository. Must be AES256 or KMS.
    encryption_type = string
    # The KMS key to use for encrypting the images. Only used when encryption_type is KMS. If not specified, defaults to
    # the default AWS managed key for ECR.
    kms_key = string
  })
```

</HclListItemTypeDetails>
<HclListItemDefaultValue>

```hcl
{
  encryption_type = "AES256",
  kms_key = null
}
```

</HclListItemDefaultValue>
</HclListItem>

<HclListItem name="default_external_account_ids_with_lambda_access" requirement="optional" type="list(string)">
<HclListItemDescription>

The default list of AWS account IDs for external AWS accounts that should be able to create Lambda functions based on container images in these ECR repos. Can be overridden on a per repo basis by the external_account_ids_with_lambda_access property in the repositories map.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="default_external_account_ids_with_read_access" requirement="optional" type="list(string)">
<HclListItemDescription>

The default list of AWS account IDs for external AWS accounts that should be able to pull images from these ECR repos. Can be overridden on a per repo basis by the external_account_ids_with_read_access property in the repositories map.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="default_external_account_ids_with_write_access" requirement="optional" type="list(string)">
<HclListItemDescription>

The default list of AWS account IDs for external AWS accounts that should be able to pull and push images to these ECR repos. Can be overridden on a per repo basis by the external_account_ids_with_write_access property in the repositories map.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="default_image_tag_mutability" requirement="optional" type="string">
<HclListItemDescription>

The tag mutability setting for all the repos. Must be one of: MUTABLE or IMMUTABLE. Can be overridden on a per repo basis by the image_tag_mutability property in the repositories map.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;MUTABLE&quot;"/>
</HclListItem>

<HclListItem name="default_lifecycle_policy_rules" requirement="optional" type="any">
<HclListItemDescription>

Add lifecycle policy to ECR repo.

</HclListItemDescription>
<HclListItemTypeDetails>

```hcl
Any types represent complex values of variable type. For details, please consult `variables.tf` in the source repo.
```

</HclListItemTypeDetails>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

<HclListItem name="global_tags" requirement="optional" type="map(string)">
<HclListItemDescription>

A map of tags (where the key and value correspond to tag keys and values) that should be assigned to all ECR repositories.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

<HclListItem name="replication_regions" requirement="optional" type="list(string)">
<HclListItemDescription>

List of regions (e.g., us-east-1) to replicate the ECR repository to.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="[]"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="ecr_read_policy_actions">
<HclListItemDescription>

A list of IAM policy actions necessary for ECR read access.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecr_repo_arns">
<HclListItemDescription>

A map of repository name to its ECR ARN.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecr_repo_urls">
<HclListItemDescription>

A map of repository name to its URL.

</HclListItemDescription>
</HclListItem>

<HclListItem name="ecr_write_policy_actions">
<HclListItemDescription>

A list of IAM policy actions necessary for ECR write access.

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/data-stores/ecr-repos/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/data-stores/ecr-repos/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/data-stores/ecr-repos/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "af94ae6178b9fec1d202b6cc2a8c9538"
}
##DOCS-SOURCER-END -->
