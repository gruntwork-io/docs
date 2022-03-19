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
import HclListItem from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.85.0" lastModifiedVersion="0.68.3"/>

# Amazon ECR Repositories


<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/data-stores/ecr-repos" className="link-button">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=data-stores%2Fecr-repos" className="link-button" title="Release notes for only the service catalog versions which impacted this service.">Release Notes</a>

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

*   [examples/for-learning-and-testing folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-learning-and-testing): The
    `examples/for-learning-and-testing` folder contains standalone sample code optimized for learning, experimenting, and
    testing (but not direct production usage).

### Production deployment

If you want to deploy this repo in production, check out the following resources:

*   [examples/for-production folder](https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/examples/for-production): The `examples/for-production` folder contains sample code
    optimized for direct usage in production. This is code from the
    [Gruntwork Reference Architecture](https://gruntwork.io/reference-architecture/), and it shows you how we build an
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog.

## Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<br/>

### Required

<HclListItem name="repositories" requirement="required" description="A map of repo names to configurations for that repository." type="any"/>


<br/>


### Optional

<HclListItem name="default_automatic_image_scanning" requirement="optional" description="Whether or not to enable image scanning on all the repos. Can be overridden on a per repo basis by the <a href=#enable_automatic_image_scanning><code>enable_automatic_image_scanning</code></a> property in the repositories map." type="bool" defaultValue="true"/>

<HclListItem name="default_encryption_config" requirement="optional" description="The default encryption configuration to apply to the created ECR repository. When null, the images in the ECR repo will not be encrypted at rest. Can be overridden on a per repo basis by the <a href=#encryption_config><code>encryption_config</code></a> property in the repositories map." type="object" typeDetails="object({
    # The encryption type to use for the repository. Must be AES256 or KMS.
    encryption_type = string
    # The KMS key to use for encrypting the images. Only used when encryption_type is KMS. If not specified, defaults to
    # the default AWS managed key for ECR.
    kms_key = string
  })" defaultValue="{'encryption_type':'AES256','kms_key':null}"/>

<HclListItem name="default_external_account_ids_with_read_access" requirement="optional" description="The default list of AWS account IDs for external AWS accounts that should be able to pull images from these ECR repos. Can be overridden on a per repo basis by the <a href=#external_account_ids_with_read_access><code>external_account_ids_with_read_access</code></a> property in the repositories map." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="default_external_account_ids_with_write_access" requirement="optional" description="The default list of AWS account IDs for external AWS accounts that should be able to pull and push images to these ECR repos. Can be overridden on a per repo basis by the <a href=#external_account_ids_with_write_access><code>external_account_ids_with_write_access</code></a> property in the repositories map." type="list" typeDetails="list(string)" defaultValue="[]"/>

<HclListItem name="default_image_tag_mutability" requirement="optional" description="The tag mutability setting for all the repos. Must be one of: MUTABLE or IMMUTABLE. Can be overridden on a per repo basis by the <a href=#image_tag_mutability><code>image_tag_mutability</code></a> property in the repositories map." type="string" defaultValue="MUTABLE"/>

<HclListItem name="default_lifecycle_policy_rules" requirement="optional" description="Add lifecycle policy to ECR repo." type="any" defaultValue="[]"/>

<HclListItem name="global_tags" requirement="optional" description="A map of tags (where the key and value correspond to tag keys and values) that should be assigned to all ECR repositories." type="map" typeDetails="map(string)" defaultValue="{}"/>

<HclListItem name="replication_regions" requirement="optional" description="List of regions (e.g., us-east-1) to replicate the ECR repository to." type="list" typeDetails="list(string)" defaultValue="[]"/>

</TabItem>
<TabItem value="outputs" label="Outputs">

<br/>

<HclListItem name="ecr_read_policy_actions" requirement="required" description="A list of IAM policy actions necessary for ECR read access."/>

<HclListItem name="ecr_repo_arns" requirement="required" description="A map of repository name to its ECR ARN."/>

<HclListItem name="ecr_repo_urls" requirement="required" description="A map of repository name to its URL."/>

<HclListItem name="ecr_write_policy_actions" requirement="required" description="A list of IAM policy actions necessary for ECR write access."/>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"33106ee2185766c58fbc9c290b7404f0"}
##DOCS-SOURCER-END -->
