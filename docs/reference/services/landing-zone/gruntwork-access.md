---
type: "service"
name: "Gruntwork Access"
description: "Grant the Gruntwork team access to one of your AWS accounts so we can deploy a Reference Architecture for you or help with troubleshooting!"
category: "remote-access"
cloud: "aws"
tags: ["reference-architecture","troubleshooting"]
license: "gruntwork"
built-with: "terraform"
title: "Gruntwork Access"
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VersionBadge from '../../../../src/components/VersionBadge.tsx';
import { HclListItem, HclListItemDescription, HclListItemTypeDetails, HclListItemDefaultValue, HclGeneralListItem } from '../../../../src/components/HclListItem.tsx';

<VersionBadge version="0.104.14" lastModifiedVersion="0.20.0"/>

# Gruntwork Access

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/landingzone/gruntwork-access" className="link-button" title="View the source code for this service in GitHub.">View Source</a>

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/releases?q=landingzone%2Fgruntwork-access" className="link-button" title="Release notes for only versions which impacted this service.">Release Notes</a>

## Overview

You can use this service to grant the Gruntwork team access to your AWS account to either:

*   Deploying a [Reference Architecture](https://gruntwork.io/reference-architecture/)
*   Helping your team with troubleshooting.

Under the hood, this service creates an [IAM Role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html) in
your AWS account that the Gruntwork team can assume. This allows the Gruntwork team to securely access your AWS accounts
without having to create, share, or manage credentials.

## Features

*   Create an IAM role that grants Gruntwork access to your AWS accounts
*   Choose the Managed IAM Policy to grant
*   Require MFA for assuming the IAM role
*   Grant access to your own security account (required for Reference Architecture deployments)

## Learn

:::note

This repo is a part of the [Gruntwork Service Catalog](https://github.com/gruntwork-io/terraform-aws-service-catalog/),
a collection of reusable, battle-tested, production ready infrastructure code.
If you’ve never used the Service Catalog before, make sure to read
[How to use the Gruntwork Service Catalog](https://docs.gruntwork.io/reference/services/intro/overview)!

:::

### Core concepts

*   [What is the Gruntwork Reference Architecture?](https://gruntwork.io/reference-architecture/)

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
    end-to-end, integrated tech stack on top of the Gruntwork Service Catalog, configure CI / CD for your apps and
    infrastructure.


## Sample Usage

<Tabs>
<TabItem value="terraform" label="Terraform" default>

```hcl title="main.tf"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S GRUNTWORK-ACCESS MODULE
# ------------------------------------------------------------------------------------------------------

module "gruntwork_access" {

  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/gruntwork-access?ref=v0.104.14"

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Set to true to grant your security account, with the account ID specified in
  # var.security_account_id, access to the IAM role. This is required for
  # deploying a Reference Architecture.
  grant_security_account_access = <bool>

  # The ID of your security account (where IAM users are defined). Required for
  # deploying a Reference Architecture, as the Gruntwork team deploys an EC2
  # instance in the security account, and that instance assumes this IAM role to
  # get access to all the other child accounts and bootstrap the deployment
  # process.
  security_account_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the AWS account that will be allowed to assume the IAM role.
  gruntwork_aws_account_id = "583800379690"

  # The name to use for the IAM role
  iam_role_name = "GruntworkAccountAccessRole"

  # The name of the AWS Managed Policy to attach to the IAM role. To deploy a
  # Reference Architecture, the Gruntwork team needs AdministratorAccess, so
  # this is the default.
  managed_policy_name = "AdministratorAccess"

  # If set to true, require MFA to assume the IAM role from the Gruntwork
  # account.
  require_mfa = true

  # Tags to apply to all resources created by this module
  tags = {}

}


```

</TabItem>
<TabItem value="terragrunt" label="Terragrunt" default>

```hcl title="terragrunt.hcl"

# ------------------------------------------------------------------------------------------------------
# DEPLOY GRUNTWORK'S GRUNTWORK-ACCESS MODULE
# ------------------------------------------------------------------------------------------------------

terraform {
  source = "git::git@github.com:gruntwork-io/terraform-aws-service-catalog.git//modules/gruntwork-access?ref=v0.104.14"
}

inputs = {

  # ----------------------------------------------------------------------------------------------------
  # REQUIRED VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # Set to true to grant your security account, with the account ID specified in
  # var.security_account_id, access to the IAM role. This is required for
  # deploying a Reference Architecture.
  grant_security_account_access = <bool>

  # The ID of your security account (where IAM users are defined). Required for
  # deploying a Reference Architecture, as the Gruntwork team deploys an EC2
  # instance in the security account, and that instance assumes this IAM role to
  # get access to all the other child accounts and bootstrap the deployment
  # process.
  security_account_id = <string>

  # ----------------------------------------------------------------------------------------------------
  # OPTIONAL VARIABLES
  # ----------------------------------------------------------------------------------------------------

  # The ID of the AWS account that will be allowed to assume the IAM role.
  gruntwork_aws_account_id = "583800379690"

  # The name to use for the IAM role
  iam_role_name = "GruntworkAccountAccessRole"

  # The name of the AWS Managed Policy to attach to the IAM role. To deploy a
  # Reference Architecture, the Gruntwork team needs AdministratorAccess, so
  # this is the default.
  managed_policy_name = "AdministratorAccess"

  # If set to true, require MFA to assume the IAM role from the Gruntwork
  # account.
  require_mfa = true

  # Tags to apply to all resources created by this module
  tags = {}

}


```

</TabItem>
</Tabs>



## Reference


<Tabs>
<TabItem value="inputs" label="Inputs" default>

### Required

<HclListItem name="grant_security_account_access" requirement="required" type="bool">
<HclListItemDescription>

Set to true to grant your security account, with the account ID specified in <a href="#security_account_id"><code>security_account_id</code></a>, access to the IAM role. This is required for deploying a Reference Architecture.

</HclListItemDescription>
</HclListItem>

<HclListItem name="security_account_id" requirement="required" type="string">
<HclListItemDescription>

The ID of your security account (where IAM users are defined). Required for deploying a Reference Architecture, as the Gruntwork team deploys an EC2 instance in the security account, and that instance assumes this IAM role to get access to all the other child accounts and bootstrap the deployment process.

</HclListItemDescription>
</HclListItem>

### Optional

<HclListItem name="gruntwork_aws_account_id" requirement="optional" type="string">
<HclListItemDescription>

The ID of the AWS account that will be allowed to assume the IAM role.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;583800379690&quot;"/>
</HclListItem>

<HclListItem name="iam_role_name" requirement="optional" type="string">
<HclListItemDescription>

The name to use for the IAM role

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;GruntworkAccountAccessRole&quot;"/>
</HclListItem>

<HclListItem name="managed_policy_name" requirement="optional" type="string">
<HclListItemDescription>

The name of the AWS Managed Policy to attach to the IAM role. To deploy a Reference Architecture, the Gruntwork team needs AdministratorAccess, so this is the default.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="&quot;AdministratorAccess&quot;"/>
</HclListItem>

<HclListItem name="require_mfa" requirement="optional" type="bool">
<HclListItemDescription>

If set to true, require MFA to assume the IAM role from the Gruntwork account.

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="true"/>
</HclListItem>

<HclListItem name="tags" requirement="optional" type="map(string)">
<HclListItemDescription>

Tags to apply to all resources created by this module

</HclListItemDescription>
<HclListItemDefaultValue defaultValue="{}"/>
</HclListItem>

</TabItem>
<TabItem value="outputs" label="Outputs">

<HclListItem name="iam_role_arn">
<HclListItemDescription>

The ARN of the IAM role

</HclListItemDescription>
</HclListItem>

<HclListItem name="iam_role_name">
<HclListItemDescription>

The name of the IAM role

</HclListItemDescription>
</HclListItem>

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{
  "originalSources": [
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/landingzone/gruntwork-access/README.md",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/landingzone/gruntwork-access/variables.tf",
    "https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/v0.104.14/modules/landingzone/gruntwork-access/outputs.tf"
  ],
  "sourcePlugin": "service-catalog-api",
  "hash": "416848e47c025eb52d9af2282ae7e6ed"
}
##DOCS-SOURCER-END -->
